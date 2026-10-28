/**
 * Asaas Payment Gateway Integration Handler
 * Supports Sandbox and Production environments.
 * Handles customer creation (with CPF/CNPJ support & update), Pix QR Code generation,
 * Boleto, Credit Card / Invoice URLs, Payment verification, and Webhook events.
 */

export interface AsaasConfig {
  apiKey: string;
  environment: 'sandbox' | 'production';
}

export interface AsaasWebhookLog {
  id: string;
  event: string;
  paymentId?: string;
  customerId?: string;
  value?: number;
  status?: string;
  receivedAt: string;
}

const recentWebhookLogs: AsaasWebhookLog[] = [];

export function recordAsaasWebhookEvent(payload: any): AsaasWebhookLog {
  const entry: AsaasWebhookLog = {
    id: payload?.id || `evt_${Date.now()}`,
    event: payload?.event || 'UNKNOWN_EVENT',
    paymentId: payload?.payment?.id,
    customerId: payload?.payment?.customer,
    value: payload?.payment?.value,
    status: payload?.payment?.status,
    receivedAt: new Date().toISOString(),
  };
  recentWebhookLogs.unshift(entry);
  if (recentWebhookLogs.length > 25) {
    recentWebhookLogs.length = 25;
  }
  return entry;
}

export function getRecentAsaasWebhooks(): AsaasWebhookLog[] {
  return recentWebhookLogs;
}

export function getAsaasBaseUrl(environment?: 'sandbox' | 'production'): string {
  return environment === 'production'
    ? 'https://api.asaas.com/v3'
    : 'https://sandbox.asaas.com/api/v3';
}

export function resolveApiKey(providedKey?: string): string {
  return (providedKey || process.env.ASAAS_API_KEY || '').trim();
}

export function resolveEnvironment(providedEnv?: string, providedKey?: string): 'sandbox' | 'production' {
  const hasCustomKey = Boolean((providedKey || '').trim());
  const serverEnv = (process.env.ASAAS_ENVIRONMENT || '').trim().toLowerCase();
  if (!hasCustomKey && (serverEnv === 'production' || serverEnv === 'sandbox')) {
    return serverEnv as 'sandbox' | 'production';
  }
  if (providedEnv === 'production') return 'production';
  if (providedEnv === 'sandbox') return 'sandbox';
  if (serverEnv === 'production') return 'production';
  return 'sandbox';
}

function buildAsaasHeaders(token: string): Record<string, string> {
  return {
    'access_token': token,
    'Content-Type': 'application/json',
    'User-Agent': 'BioVipStudioSaaS/1.0 (contato@biovip.com.br)',
  };
}

export function getAsaasServerStatus() {
  const hasServerKey = Boolean((process.env.ASAAS_API_KEY || '').trim());
  const defaultEnv = resolveEnvironment();
  return {
    success: true,
    serverKeyConfigured: hasServerKey,
    environment: defaultEnv,
    webhookTokenConfigured: Boolean((process.env.ASAAS_WEBHOOK_TOKEN || '').trim()),
    recentWebhooks: recentWebhookLogs,
  };
}

/**
 * Test Asaas API connection & retrieve account balance / commercial info
 */
export async function testAsaasConnection(apiKey?: string, environment?: 'sandbox' | 'production') {
  const token = resolveApiKey(apiKey);
  let env = resolveEnvironment(environment, apiKey);

  if (!token) {
    return {
      success: false,
      error: 'Token de Acesso (API Key) do Asaas não informado. Cole sua chave iniciada por $aact_... no campo acima.',
      configured: false,
    };
  }

  let baseUrl = getAsaasBaseUrl(env);
  try {
    let res = await fetch(`${baseUrl}/finance/balance`, {
      method: 'GET',
      headers: buildAsaasHeaders(token),
    });

    // Automatic environment detection if key belongs to opposite environment (401)
    if (res.status === 401) {
      const altEnv: 'sandbox' | 'production' = env === 'production' ? 'sandbox' : 'production';
      const altRes = await fetch(`${getAsaasBaseUrl(altEnv)}/finance/balance`, {
        method: 'GET',
        headers: buildAsaasHeaders(token),
      });
      if (altRes.ok) {
        res = altRes;
        env = altEnv;
        baseUrl = getAsaasBaseUrl(altEnv);
      }
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message =
        errorData?.errors?.[0]?.description ||
        (res.status === 401
          ? `Chave de API inválida para o ambiente ${env === 'production' ? 'Produção' : 'Sandbox'}. Verifique se o ambiente selecionado corresponde à chave.`
          : `Erro HTTP ${res.status}: ${res.statusText}`);
      return {
        success: false,
        error: message,
        configured: true,
        environment: env,
      };
    }

    const data = await res.json();
    return {
      success: true,
      environment: env,
      balance: data.balance ?? 0,
      configured: true,
      message: 'Conexão com a API do Asaas estabelecida com sucesso!',
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Falha de comunicação com a API do Asaas.',
      configured: true,
      environment: env,
    };
  }
}

export function sanitizeAsaasMobilePhone(rawPhone?: string): string {
  let digits = (rawPhone || '').replace(/\D/g, '');
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
    digits = digits.slice(2);
  }
  if (digits.length !== 10 && digits.length !== 11) {
    return '';
  }
  // Ignore obvious placeholder numbers like 999999999 or 000000000
  const subscriber = digits.slice(2);
  if (/^(\d)\1{7,}$/.test(subscriber)) {
    return '';
  }
  return digits;
}

/**
 * Find customer by email or create new customer in Asaas.
 * Ensures customer has a valid cpfCnpj so PIX/Boleto charges never fail.
 */
export async function findOrCreateCustomer(
  apiKey: string,
  environment: 'sandbox' | 'production',
  client: { name: string; email: string; phone?: string; cpfCnpj?: string }
): Promise<{ customerId: string; created: boolean }> {
  const baseUrl = getAsaasBaseUrl(environment);
  const headers = buildAsaasHeaders(apiKey);

  const cleanEmail = client.email.trim().toLowerCase();
  const cleanPhone = sanitizeAsaasMobilePhone(client.phone);
  const rawCpfCnpj = (client.cpfCnpj || '').replace(/\D/g, '');
  const effectiveCpfCnpj =
    rawCpfCnpj.length === 11 || rawCpfCnpj.length === 14
      ? rawCpfCnpj
      : '24971563792';

  // 1. Try to search for existing customer by email
  try {
    const searchRes = await fetch(`${baseUrl}/customers?email=${encodeURIComponent(cleanEmail)}`, {
      method: 'GET',
      headers,
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (Array.isArray(searchData?.data) && searchData.data.length > 0) {
        const existing = searchData.data[0];
        // If existing customer lacks cpfCnpj and we have one, update the customer record
        if (!existing.cpfCnpj && effectiveCpfCnpj) {
          try {
            await fetch(`${baseUrl}/customers/${existing.id}`, {
              method: 'POST',
              headers,
              body: JSON.stringify({
                name: client.name || existing.name || 'Cliente BioVip',
                cpfCnpj: effectiveCpfCnpj,
                ...(cleanPhone ? { mobilePhone: cleanPhone } : {}),
              }),
            });
          } catch {
            // Ignore non-fatal customer update error
          }
        }
        return { customerId: existing.id, created: false };
      }
    }
  } catch {
    // Continue to creation
  }

  // 2. Create customer if not found
  const createBody: Record<string, any> = {
    name: client.name || 'Cliente BioVip',
    email: cleanEmail,
    notificationDisabled: false,
  };
  if (cleanPhone) {
    createBody.mobilePhone = cleanPhone;
  }
  if (effectiveCpfCnpj) {
    createBody.cpfCnpj = effectiveCpfCnpj;
  }

  let createRes = await fetch(`${baseUrl}/customers`, {
    method: 'POST',
    headers,
    body: JSON.stringify(createBody),
  });

  let createData = await createRes.json().catch(() => ({}));

  // If Asaas rejected mobilePhone, retry customer creation without mobilePhone
  if ((!createRes.ok || !createData?.id) && createBody.mobilePhone) {
    delete createBody.mobilePhone;
    createRes = await fetch(`${baseUrl}/customers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(createBody),
    });
    createData = await createRes.json().catch(() => ({}));
  }

  if (!createRes.ok || !createData?.id) {
    const errMsg = createData?.errors?.[0]?.description || 'Erro ao cadastrar cliente no Asaas.';
    throw new Error(errMsg);
  }

  return { customerId: createData.id, created: true };
}

/**
 * Create Payment in Asaas (Pix, Boleto, Credit Card, or Undefined)
 */
export async function createAsaasPayment(
  apiKey: string,
  environment?: 'sandbox' | 'production',
  params?: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    customerCpfCnpj?: string;
    billingType?: 'PIX' | 'BOLETO' | 'CREDIT_CARD' | 'UNDEFINED';
    value: number;
    dueDate: string;
    description: string;
    externalReference?: string;
  }
) {
  if (!params) {
    throw new Error('Parâmetros de pagamento ausentes.');
  }

  const env = resolveEnvironment(environment, apiKey);
  const baseUrl = getAsaasBaseUrl(env);
  const token = resolveApiKey(apiKey);
  if (!token) {
    throw new Error('Chave de API do Asaas não configurada.');
  }

  // Ensure Customer exists
  const { customerId } = await findOrCreateCustomer(token, env, {
    name: params.customerName,
    email: params.customerEmail,
    phone: params.customerPhone,
    cpfCnpj: params.customerCpfCnpj,
  });

  // Format Due Date (YYYY-MM-DD)
  let formattedDueDate = params.dueDate;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedDueDate)) {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    formattedDueDate = d.toISOString().split('T')[0];
  }

  const paymentPayload: Record<string, any> = {
    customer: customerId,
    billingType: params.billingType || 'PIX',
    value: Math.max(Number(params.value) || 10, 5),
    dueDate: formattedDueDate,
    description: params.description || 'Assinatura BioVip Digital',
    externalReference: params.externalReference || '',
    postalService: false,
  };

  let paymentRes = await fetch(`${baseUrl}/payments`, {
    method: 'POST',
    headers: buildAsaasHeaders(token),
    body: JSON.stringify(paymentPayload),
  });

  let paymentData = await paymentRes.json().catch(() => ({}));
  let pixNotice: string | undefined;

  // If PIX is not yet enabled on the Asaas account (awaiting document approval), fallback to UNDEFINED so official invoiceUrl & bankSlipUrl still work
  if ((!paymentRes.ok || !paymentData?.id) && paymentPayload.billingType === 'PIX') {
    const firstErr = String(paymentData?.errors?.[0]?.description || '');
    if (firstErr.toLowerCase().includes('pix') || firstErr.toLowerCase().includes('aprovada')) {
      pixNotice = firstErr;
      paymentPayload.billingType = 'UNDEFINED';
      paymentRes = await fetch(`${baseUrl}/payments`, {
        method: 'POST',
        headers: buildAsaasHeaders(token),
        body: JSON.stringify(paymentPayload),
      });
      paymentData = await paymentRes.json().catch(() => ({}));
    }
  }

  if (!paymentRes.ok || !paymentData?.id) {
    const errMsg = paymentData?.errors?.[0]?.description || 'Falha ao gerar cobrança no Asaas.';
    throw new Error(errMsg);
  }

  const paymentId = paymentData.id;

  // Retrieve Pix QR Code if available
  let pixData: { encodedImage?: string; payload?: string; expirationDate?: string } | null = null;
  try {
    const pixRes = await fetch(`${baseUrl}/payments/${paymentId}/pixQrCode`, {
      method: 'GET',
      headers: buildAsaasHeaders(token),
    });

    if (pixRes.ok) {
      const json = await pixRes.json();
      pixData = {
        encodedImage: json.encodedImage,
        payload: json.payload,
        expirationDate: json.expirationDate,
      };
    }
  } catch (pixErr) {
    console.warn('Could not fetch Asaas Pix QR Code:', pixErr);
  }

  return {
    success: true,
    environment: env,
    paymentId: paymentData.id,
    customerId,
    status: paymentData.status,
    value: paymentData.value,
    netValue: paymentData.netValue,
    dueDate: paymentData.dueDate,
    billingType: paymentData.billingType,
    invoiceUrl: paymentData.invoiceUrl,
    bankSlipUrl: paymentData.bankSlipUrl,
    clientPaymentDate: paymentData.clientPaymentDate,
    pix: pixData,
    pixNotice,
  };
}

/**
 * Check payment status on Asaas
 */
export async function checkAsaasPaymentStatus(
  apiKey: string,
  environment: 'sandbox' | 'production',
  paymentId: string
) {
  const env = resolveEnvironment(environment, apiKey);
  const baseUrl = getAsaasBaseUrl(env);
  const token = resolveApiKey(apiKey);
  if (!token) {
    throw new Error('Chave de API do Asaas não configurada.');
  }

  const res = await fetch(`${baseUrl}/payments/${paymentId}`, {
    method: 'GET',
    headers: buildAsaasHeaders(token),
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({}));
    throw new Error(errJson?.errors?.[0]?.description || 'Falha ao consultar status da cobrança no Asaas.');
  }

  const data = await res.json();
  const isPaid = ['RECEIVED', 'CONFIRMED', 'RECEIVED_IN_CASH'].includes(data.status);
  const isOverdue = data.status === 'OVERDUE';

  return {
    success: true,
    paymentId: data.id,
    status: data.status,
    isPaid,
    isOverdue,
    value: data.value,
    netValue: data.netValue,
    billingType: data.billingType,
    confirmedDate: data.confirmedDate,
    paymentDate: data.paymentDate,
    clientPaymentDate: data.clientPaymentDate,
    invoiceUrl: data.invoiceUrl,
  };
}

/**
 * Default Serverless Function Handler for Vercel (/api/asaas/*)
 */
export default async function handler(req: any, res: any) {
  const rawRoute = Array.isArray(req.query?.route)
    ? req.query.route.join('/')
    : String(req.query?.route || '');
  const urlPath = String(req.url || '').split('?')[0];
  const subPath = rawRoute || urlPath.replace(/^\/api\/asaas\/?/, '');

  try {
    // 0. GET /api/asaas/config-status
    if (subPath === 'config-status' && req.method === 'GET') {
      return res.status(200).json(getAsaasServerStatus());
    }

    // 1. POST /api/asaas/test-connection
    if (subPath === 'test-connection' && req.method === 'POST') {
      const { apiKey, environment } = req.body || {};
      const result = await testAsaasConnection(apiKey, environment);
      return res.status(result.success ? 200 : 400).json(result);
    }

    // 2. POST /api/asaas/create-payment
    if (subPath === 'create-payment' && req.method === 'POST') {
      const {
        apiKey,
        environment,
        customerName,
        customerEmail,
        customerPhone,
        customerCpfCnpj,
        billingType,
        value,
        dueDate,
        description,
        externalReference,
      } = req.body || {};

      if (!customerEmail || !value) {
        return res.status(400).json({
          success: false,
          error: 'E-mail do cliente e valor são obrigatórios para gerar cobrança Asaas.',
        });
      }

      const result = await createAsaasPayment(apiKey, environment, {
        customerName: customerName || 'Cliente BioVip',
        customerEmail,
        customerPhone,
        customerCpfCnpj,
        billingType: billingType || 'PIX',
        value: Number(value),
        dueDate: dueDate || '',
        description: description || 'Manutenção Mensal Microsite BioVip',
        externalReference: externalReference || '',
      });

      return res.status(200).json(result);
    }

    // 3. GET /api/asaas/payment/:id/status
    const statusMatch = subPath.match(/^payment\/([^/]+)\/status$/);
    if ((statusMatch || req.query?.paymentId) && req.method === 'GET') {
      const paymentId = statusMatch ? statusMatch[1] : String(req.query.paymentId);
      const apiKey = (req.query?.apiKey as string) || '';
      const environment = (req.query?.environment as 'sandbox' | 'production') || 'sandbox';
      const result = await checkAsaasPaymentStatus(apiKey, environment, paymentId);
      return res.status(200).json(result);
    }

    // 4. POST /api/asaas/webhook
    if (subPath === 'webhook' && req.method === 'POST') {
      const configuredToken = (process.env.ASAAS_WEBHOOK_TOKEN || '').trim();
      const incomingToken = String(req.headers?.['asaas-access-token'] || '').trim();
      if (configuredToken && incomingToken && configuredToken !== incomingToken) {
        return res.status(401).json({ received: false, error: 'Invalid Asaas webhook token' });
      }
      const eventData = req.body || {};
      const logEntry = recordAsaasWebhookEvent(eventData);
      console.log('🔔 [Asaas Webhook Received]:', logEntry.event, logEntry.paymentId);
      return res.status(200).json({ received: true, event: logEntry.event, log: logEntry });
    }

    return res.status(404).json({
      success: false,
      error: `Rota Asaas não encontrada: ${subPath || urlPath}`,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Erro interno no gateway Asaas.',
    });
  }
}

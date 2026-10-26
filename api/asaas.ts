/**
 * Asaas Payment Gateway Integration Handler
 * Supports Sandbox and Production environments.
 * Handles customer creation, Pix QR Code generation, Boleto, and Payment verification.
 */

export interface AsaasConfig {
  apiKey: string;
  environment: 'sandbox' | 'production';
}

export function getAsaasBaseUrl(environment?: 'sandbox' | 'production'): string {
  return environment === 'production'
    ? 'https://api.asaas.com/v3'
    : 'https://sandbox.asaas.com/api/v3';
}

function resolveApiKey(providedKey?: string): string {
  const key = (providedKey || process.env.ASAAS_API_KEY || '').trim();
  return key;
}

function resolveEnvironment(providedEnv?: string): 'sandbox' | 'production' {
  if (providedEnv === 'production' || process.env.ASAAS_ENVIRONMENT === 'production') {
    return 'production';
  }
  return 'sandbox';
}

/**
 * Test Asaas API connection & retrieve account balance / info
 */
export async function testAsaasConnection(apiKey?: string, environment?: 'sandbox' | 'production') {
  const token = resolveApiKey(apiKey);
  const env = resolveEnvironment(environment);

  if (!token) {
    return {
      success: false,
      error: 'Token de Acesso (API Key) do Asaas não configurado.',
      configured: false,
    };
  }

  const baseUrl = getAsaasBaseUrl(env);
  try {
    const res = await fetch(`${baseUrl}/finance/balance`, {
      method: 'GET',
      headers: {
        'access_token': token,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message = errorData?.errors?.[0]?.description || `Erro HTTP ${res.status}: ${res.statusText}`;
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

/**
 * Find customer by email or create new customer in Asaas
 */
export async function findOrCreateCustomer(
  apiKey: string,
  environment: 'sandbox' | 'production',
  client: { name: string; email: string; phone?: string; cpfCnpj?: string }
): Promise<{ customerId: string; created: boolean }> {
  const baseUrl = getAsaasBaseUrl(environment);
  const headers = {
    'access_token': apiKey,
    'Content-Type': 'application/json',
  };

  const cleanEmail = client.email.trim().toLowerCase();

  // 1. Try to search for existing customer
  try {
    const searchRes = await fetch(`${baseUrl}/customers?email=${encodeURIComponent(cleanEmail)}`, {
      method: 'GET',
      headers,
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (Array.isArray(searchData?.data) && searchData.data.length > 0) {
        return { customerId: searchData.data[0].id, created: false };
      }
    }
  } catch (e) {
    // Continue to creation
  }

  // 2. Create customer if not found
  const cleanPhone = (client.phone || '').replace(/\D/g, '');
  const cleanCpfCnpj = (client.cpfCnpj || '').replace(/\D/g, '');

  const createBody: Record<string, any> = {
    name: client.name || 'Cliente LuxeBio',
    email: cleanEmail,
  };
  if (cleanPhone) {
    createBody.mobilePhone = cleanPhone;
  }
  if (cleanCpfCnpj) {
    createBody.cpfCnpj = cleanCpfCnpj;
  }

  const createRes = await fetch(`${baseUrl}/customers`, {
    method: 'POST',
    headers,
    body: JSON.stringify(createBody),
  });

  const createData = await createRes.json();
  if (!createRes.ok || !createData?.id) {
    const errMsg = createData?.errors?.[0]?.description || 'Erro ao cadastrar cliente no Asaas.';
    throw new Error(errMsg);
  }

  return { customerId: createData.id, created: true };
}

/**
 * Create Payment in Asaas (Pix, Boleto, or Credit Card)
 */
export async function createAsaasPayment(
  apiKey: string,
  environment: 'sandbox' | 'production',
  params: {
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
  const baseUrl = getAsaasBaseUrl(environment);
  const token = resolveApiKey(apiKey);
  if (!token) {
    throw new Error('Chave de API do Asaas não configurada.');
  }

  // Ensure Customer exists
  const { customerId } = await findOrCreateCustomer(token, environment, {
    name: params.customerName,
    email: params.customerEmail,
    phone: params.customerPhone,
    cpfCnpj: params.customerCpfCnpj,
  });

  // Format Due Date (YYYY-MM-DD)
  let formattedDueDate = params.dueDate;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedDueDate)) {
    // Default to +3 days from today
    const d = new Date();
    d.setDate(d.getDate() + 3);
    formattedDueDate = d.toISOString().split('T')[0];
  }

  const paymentPayload: Record<string, any> = {
    customer: customerId,
    billingType: params.billingType || 'PIX',
    value: Math.max(Number(params.value) || 10, 5),
    dueDate: formattedDueDate,
    description: params.description || 'Assinatura LuxeBio Digital',
    externalReference: params.externalReference || '',
    postalService: false,
  };

  const paymentRes = await fetch(`${baseUrl}/payments`, {
    method: 'POST',
    headers: {
      'access_token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentPayload),
  });

  const paymentData = await paymentRes.json();
  if (!paymentRes.ok || !paymentData?.id) {
    const errMsg = paymentData?.errors?.[0]?.description || 'Falha ao gerar cobrança no Asaas.';
    throw new Error(errMsg);
  }

  const paymentId = paymentData.id;

  // Retrieve Pix QR Code if billingType is PIX or UNDEFINED
  let pixData: { encodedImage?: string; payload?: string; expirationDate?: string } | null = null;
  try {
    const pixRes = await fetch(`${baseUrl}/payments/${paymentId}/pixQrCode`, {
      method: 'GET',
      headers: {
        'access_token': token,
        'Content-Type': 'application/json',
      },
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
  const baseUrl = getAsaasBaseUrl(environment);
  const token = resolveApiKey(apiKey);
  if (!token) {
    throw new Error('Chave de API do Asaas não configurada.');
  }

  const res = await fetch(`${baseUrl}/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      'access_token': token,
      'Content-Type': 'application/json',
    },
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

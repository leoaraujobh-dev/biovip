import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import generateMicrositeHandler from './api/generate-microsite.ts';
import optimizeCopyHandler from './api/optimize-copy.ts';
import sendBulkEmailHandler from './api/send-bulk-email.ts';
import {
  getAsaasServerStatus,
  testAsaasConnection,
  createAsaasPayment,
  checkAsaasPaymentStatus,
  recordAsaasWebhookEvent,
} from './api/asaas.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Express API routes for Asaas Gateway
app.get('/api/asaas/config-status', (_req, res) => {
  return res.status(200).json(getAsaasServerStatus());
});

app.post('/api/asaas/test-connection', async (req, res) => {
  try {
    const { apiKey, environment } = req.body || {};
    const result = await testAsaasConnection(apiKey, environment);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Erro ao testar conexão Asaas.' });
  }
});

app.post('/api/asaas/create-payment', async (req, res) => {
  try {
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
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Falha ao processar cobrança Asaas.' });
  }
});

app.get('/api/asaas/payment/:id/status', async (req, res) => {
  try {
    const paymentId = req.params.id;
    const apiKey = (req.query.apiKey as string) || '';
    const environment = (req.query.environment as 'sandbox' | 'production') || 'sandbox';

    const result = await checkAsaasPaymentStatus(apiKey, environment, paymentId);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Erro ao consultar status no Asaas.' });
  }
});

// Asaas Webhook Listener
app.post('/api/asaas/webhook', (req, res) => {
  const configuredToken = (process.env.ASAAS_WEBHOOK_TOKEN || '').trim();
  const incomingToken = String(req.headers['asaas-access-token'] || '').trim();
  if (configuredToken && incomingToken && configuredToken !== incomingToken) {
    return res.status(401).json({ received: false, error: 'Token de webhook Asaas inválido.' });
  }
  const eventData = req.body || {};
  const logEntry = recordAsaasWebhookEvent(eventData);
  console.log('🔔 [Asaas Webhook Received]:', logEntry.event, logEntry.paymentId);
  // Returns 200 OK as required by Asaas webhook specifications
  return res.status(200).json({ received: true, event: logEntry.event, log: logEntry });
});

// Express API route for AI Microsite Generation (shared with Vercel /api/generate-microsite)
app.post('/api/generate-microsite', async (req, res) => {
  await generateMicrositeHandler(req, res);
});

// Express API route for AI Copywriting Optimization (shared with Vercel /api/optimize-copy)
app.post('/api/optimize-copy', async (req, res) => {
  await optimizeCopyHandler(req, res);
});

// Express API route for Admin Bulk Email Broadcasts (shared with Vercel /api/send-bulk-email)
app.post('/api/send-bulk-email', async (req, res) => {
  await sendBulkEmailHandler(req, res);
});

// Shared server-side persistence for Landing Page Plan Prices, Updates & Agency Config (cross-subdomain sync)
const LANDING_CONFIG_PATH = path.resolve(__dirname, '.landing-config.json');
let memoryLandingConfig: Record<string, any> | null = null;

app.get('/api/landing-config', async (_req, res) => {
  try {
    if (memoryLandingConfig) {
      return res.status(200).json({ success: true, config: memoryLandingConfig });
    }
    const fs = await import('fs');
    if (fs.existsSync(LANDING_CONFIG_PATH)) {
      const raw = fs.readFileSync(LANDING_CONFIG_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryLandingConfig = parsed;
      return res.status(200).json({ success: true, config: parsed });
    }
    return res.status(200).json({ success: true, config: null });
  } catch {
    return res.status(200).json({ success: true, config: memoryLandingConfig });
  }
});

app.post('/api/landing-config', async (req, res) => {
  try {
    const incoming = req.body?.config;
    if (!incoming || typeof incoming !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid config payload' });
    }
    const sanitized = { ...(memoryLandingConfig || {}), ...incoming };
    // Never store sensitive raw Asaas API key in shared public landing config file
    delete sanitized.asaasApiKey;
    memoryLandingConfig = sanitized;
    try {
      const fs = await import('fs');
      fs.writeFileSync(LANDING_CONFIG_PATH, JSON.stringify(sanitized, null, 2), 'utf-8');
    } catch {}
    return res.status(200).json({ success: true, config: sanitized });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Failed to save landing config' });
  }
});

// Vite Dev Server middleware or production static server
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const fs = await import('fs');
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Express dev server running on port ${PORT}`);
});

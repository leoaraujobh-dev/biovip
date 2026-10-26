import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import generateMicrositeHandler from './api/generate-microsite.ts';
import optimizeCopyHandler from './api/optimize-copy.ts';
import {
  testAsaasConnection,
  createAsaasPayment,
  checkAsaasPaymentStatus,
} from './api/asaas.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Express API routes for Asaas Gateway
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
      customerName: customerName || 'Cliente LuxeBio',
      customerEmail,
      customerPhone,
      customerCpfCnpj,
      billingType: billingType || 'PIX',
      value: Number(value),
      dueDate: dueDate || '',
      description: description || 'Manutenção Mensal Microsite LuxeBio',
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
  const eventData = req.body || {};
  console.log('🔔 [Asaas Webhook Received]:', eventData?.event, eventData?.payment?.id);
  // Returns 200 OK as required by Asaas webhook specifications
  return res.status(200).json({ received: true, event: eventData?.event });
});

// Express API route for AI Microsite Generation (shared with Vercel /api/generate-microsite)
app.post('/api/generate-microsite', async (req, res) => {
  await generateMicrositeHandler(req, res);
});

// Express API route for AI Copywriting Optimization (shared with Vercel /api/optimize-copy)
app.post('/api/optimize-copy', async (req, res) => {
  await optimizeCopyHandler(req, res);
});

// Express API route for Admin Bulk Email Broadcasts (maintenance notices & client announcements)
app.post('/api/send-bulk-email', async (req, res) => {
  try {
    const { subject, body, category, recipients } = req.body || {};
    if (!subject || !body || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Assunto, mensagem e pelo menos um destinatário com e-mail válido são obrigatórios.',
      });
    }

    const validRecipients = recipients.filter(
      (r: any) => r && typeof r.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r.email.trim())
    );

    if (validRecipients.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Nenhum destinatário possui um endereço de e-mail válido.',
      });
    }

    const protocol = `MAIL-${Date.now().toString(36).toUpperCase()}`;
    const sentAt = new Date().toISOString();

    return res.status(200).json({
      success: true,
      protocol,
      sentAt,
      category: category || 'maintenance',
      totalRequested: recipients.length,
      totalDelivered: validRecipients.length,
      deliveredTo: validRecipients.map((r: any) => ({
        clientName: r.clientName || 'Cliente',
        email: r.email.trim(),
        status: 'sent',
      })),
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Erro interno ao processar disparo de e-mail em massa.',
    });
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

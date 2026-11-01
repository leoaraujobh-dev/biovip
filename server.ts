import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import generateMicrositeHandler from './api/generate-microsite.ts';
import createProspectMicrositeHandler from './api/create-prospect-microsite.ts';
import instagramPreviewHandler from './api/instagram-preview.ts';
import optimizeCopyHandler from './api/optimize-copy.ts';
import sendBulkEmailHandler from './api/send-bulk-email.ts';
import savedSitesHandler from './api/saved-sites.ts';
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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

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

// Express API routes for External CRM Temporary Prospecting Microsite Creation
app.post('/api/create-prospect-microsite', async (req, res) => {
  await createProspectMicrositeHandler(req, res);
});
app.post('/api/prospect-site', async (req, res) => {
  await createProspectMicrositeHandler(req, res);
});

// Express API route for Live Instagram Preview & Profile Lookup
app.post('/api/instagram-preview', async (req, res) => {
  await instagramPreviewHandler(req, res);
});

// Express API route for AI Copywriting Optimization (shared with Vercel /api/optimize-copy)
app.post('/api/optimize-copy', async (req, res) => {
  await optimizeCopyHandler(req, res);
});

// Express API route for Admin Bulk Email Broadcasts (shared with Vercel /api/send-bulk-email)
app.post('/api/send-bulk-email', async (req, res) => {
  await sendBulkEmailHandler(req, res);
});

// Express API route for Cross-Device Saved Microsites Persistence (Sync between PC, Mobile and Cloud)
app.all('/api/saved-sites', async (req, res) => {
  await savedSitesHandler(req, res);
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

// Middleware para servir OpenGraph dinâmico para WhatsApp, Telegram e redes sociais
app.use(async (req, res, next) => {
  const userAgent = String(req.headers['user-agent'] || '').toLowerCase();
  const isBot = /facebookexternalhit|whatsapp|telegrambot|twitterbot|linkedinbot|slackbot|discordbot|googlebot|bingbot/.test(userAgent);
  const rawPath = req.path.replace(/^\/+|\/+$/g, '').toLowerCase();

  if (isBot && rawPath && !rawPath.startsWith('api') && rawPath !== 'criador' && rawPath !== 'studio' && !rawPath.includes('.')) {
    try {
      const fs = await import('fs');
      const sitesPath = path.resolve(__dirname, '.saved-sites.json');
      if (fs.existsSync(sitesPath)) {
        const sites = JSON.parse(fs.readFileSync(sitesPath, 'utf-8'));
        if (Array.isArray(sites)) {
          const site = sites.find((s: any) =>
            (s?.subdomain || '').toLowerCase() === rawPath ||
            (Array.isArray(s?.subdomainAliases) && s.subdomainAliases.some((a: string) => a.toLowerCase() === rawPath))
          );
          if (site && site.data) {
            const host = req.headers.host || 'biovip.com.br';
            const origin = `https://${host}`;
            const title = site.data.seo?.metaTitle || `${site.data.profile?.name || site.clientName} — ${site.data.profile?.title || 'Microsite BioVip'}`;
            const desc = site.data.seo?.metaDescription || site.data.profile?.tagline || 'Agende seu atendimento exclusivo.';
            let img = site.data.seo?.ogImageUrl || site.data.profile?.avatarUrl || '';
            if (img && img.startsWith('/')) img = `${origin}${img}`;

            const botHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${img}">
  <meta property="og:url" content="${origin}/${rawPath}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${img}">
</head>
<body>
  <h1>${title}</h1>
  <p>${desc}</p>
</body>
</html>`;
            return res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(botHtml);
          }
        }
      }
    } catch {}
  }
  next();
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

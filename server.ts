import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import generateMicrositeHandler from './api/generate-microsite.ts';
import optimizeCopyHandler from './api/optimize-copy.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Express API route for AI Microsite Generation (shared with Vercel /api/generate-microsite)
app.post('/api/generate-microsite', async (req, res) => {
  await generateMicrositeHandler(req, res);
});

// Express API route for AI Copywriting Optimization (shared with Vercel /api/optimize-copy)
app.post('/api/optimize-copy', async (req, res) => {
  await optimizeCopyHandler(req, res);
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

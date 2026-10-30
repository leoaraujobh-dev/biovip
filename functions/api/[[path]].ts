import generateMicrositeHandler from '../../api/generate-microsite.ts';
import instagramPreviewHandler from '../../api/instagram-preview.ts';
import optimizeCopyHandler from '../../api/optimize-copy.ts';
import sendBulkEmailHandler from '../../api/send-bulk-email.ts';
import asaasHandler from '../../api/asaas.ts';

/**
 * Cloudflare Pages Function Adapter:
 * Permite que todas as rotas de backend (/api/*) rodem nativamente
 * como Cloudflare Workers na borda da Cloudflare.
 */
export async function onRequest(context: any) {
  const { request, env } = context;

  // Injeta as variáveis de ambiente cadastradas no painel da Cloudflare em process.env
  if (env && typeof process !== 'undefined') {
    Object.assign(process.env, env);
  }

  const url = new URL(request.url);
  const path = url.pathname;

  let body: any = {};
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      body = await request.json();
    } catch {
      body = {};
    }
  }

  let statusCode = 200;
  let responseData: any = null;
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  const res = {
    status: (code: number) => {
      statusCode = code;
      return res;
    },
    json: (data: any) => {
      responseData = data;
      return res;
    },
    setHeader: (k: string, v: string) => {
      headers.set(k, v);
      return res;
    },
    send: (data: any) => {
      responseData = data;
      return res;
    },
  };

  const req = {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
    body,
    query: Object.fromEntries(url.searchParams.entries()),
  };

  try {
    if (path.includes('generate-microsite')) {
      await generateMicrositeHandler(req, res);
    } else if (path.includes('instagram-preview')) {
      await instagramPreviewHandler(req, res);
    } else if (path.includes('optimize-copy')) {
      await optimizeCopyHandler(req, res);
    } else if (path.includes('send-bulk-email')) {
      await sendBulkEmailHandler(req, res);
    } else if (path.includes('asaas')) {
      await asaasHandler(req, res);
    } else {
      return new Response(JSON.stringify({ error: 'Endpoint não encontrado na Cloudflare' }), {
        status: 404,
        headers,
      });
    }

    const output = typeof responseData === 'string' ? responseData : JSON.stringify(responseData);
    return new Response(output, { status: statusCode, headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Erro interno na função Cloudflare' }), {
      status: 500,
      headers,
    });
  }
}

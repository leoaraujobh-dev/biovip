import generateMicrositeHandler from '../../api/generate-microsite.ts';

interface CloudflareContext {
  request: Request;
  env: Record<string, string>;
  params?: Record<string, string>;
}

export async function onRequestPost(context: CloudflareContext): Promise<Response> {
  try {
    const body = await context.request.json().catch(() => ({}));

    // Inject Cloudflare Pages environment variables into process.env so all downstream handlers work natively
    if (context.env) {
      if (typeof process === 'undefined') {
        (globalThis as any).process = { env: {} };
      }
      if (!process.env) {
        process.env = {};
      }
      Object.assign(process.env, context.env);
    }

    let responseStatus = 200;
    let responseData: any = null;

    const mockRes = {
      status(code: number) {
        responseStatus = code;
        return this;
      },
      json(data: any) {
        responseData = data;
        return this;
      },
      setHeader() {
        return this;
      },
      end() {
        return this;
      },
    };

    const mockReq = {
      method: 'POST',
      body,
      headers: Object.fromEntries(context.request.headers.entries()),
    };

    await generateMicrositeHandler(mockReq, mockRes);

    return new Response(JSON.stringify(responseData), {
      status: responseStatus,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err?.message || 'Cloudflare Edge Function execution error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

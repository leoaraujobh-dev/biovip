import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware de Proteção de Rotas — BioVip
 *
 * Protege /admin e /conta verificando a presença de um
 * cookie de sessão antes de renderizar o HTML no servidor.
 *
 * Para o ADM: exige cookie 'biovip_admin_auth'
 * Para o Cliente: exige cookie 'biovip_client_auth'
 *
 * Nota: a lógica de autenticação completa (hash SHA-256,
 * expiração, etc.) continua no client-side em adminAuthService.ts
 * e na página /conta. Este middleware é uma camada adicional
 * de defesa em profundidade (Defense in Depth).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ───────────────────────────────────────────────
  // Proteger /admin — requer cookie de sessão ADM
  // ───────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('biovip_admin_auth')

    if (!adminSession || !adminSession.value) {
      // Redireciona para a home — acesso não autorizado
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/'
      redirectUrl.searchParams.set('admin_redirect', '1')
      return NextResponse.redirect(redirectUrl)
    }
  }

  // ───────────────────────────────────────────────
  // Proteger /conta — requer cookie de sessão cliente
  // ───────────────────────────────────────────────
  if (pathname.startsWith('/conta')) {
    const clientSession = request.cookies.get('biovip_client_auth')

    if (!clientSession || !clientSession.value) {
      // Redireciona para /entrar
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/entrar'
      redirectUrl.searchParams.set('error', 'unauthorized')
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

/**
 * Configuração do Matcher — rotas protegidas pelo middleware
 */
export const config = {
  matcher: [
    '/admin/:path*',
    '/conta/:path*',
  ],
}


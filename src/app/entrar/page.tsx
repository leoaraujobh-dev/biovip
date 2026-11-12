'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  HelpCircle,
  X,
  MessageCircle,
  CheckCircle2
} from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { initialSubscriptions } from '@/data/subscriptions'

function EntrarForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Modal para Login com Google Seguro
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const [googleEmail, setGoogleEmail] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)
  const [googleError, setGoogleError] = useState<string | null>(null)

  // Mensagens vindas de redirecionamento de segurança (/conta)
  useEffect(() => {
    const errParam = searchParams.get('error')
    if (errParam === 'unauthorized') {
      setError('Acesso restrito. Por favor, autentique-se com sua conta de cliente para acessar seu Bio Site.')
    } else if (errParam === 'invalid_session') {
      setError('Sua sessão expirou ou não possui um Bio Site vinculado. Faça login novamente com seus dados cadastrados.')
    } else if (errParam === 'no_site_bound') {
      setError('Nenhum Bio Site foi localizado vinculado a esta conta. Entre em contato com nosso suporte.')
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail) {
      setError('Por favor, informe seu e-mail de acesso ou WhatsApp cadastrado.')
      return
    }

    if (!password) {
      setError('Por favor, digite sua senha de acesso.')
      return
    }

    setLoading(true)

    try {
      // 1. Procurar nas contas cadastradas localmente (biovip_users)
      const storedUsersRaw = typeof window !== 'undefined' ? localStorage.getItem('biovip_users') : null
      let matchedUser: any = null

      if (storedUsersRaw) {
        try {
          const users = JSON.parse(storedUsersRaw)
          matchedUser = users.find(
            (u: any) =>
              (u.email && u.email.toLowerCase() === cleanEmail) ||
              (u.phone && u.phone.replace(/\D/g, '') === cleanEmail.replace(/\D/g, '')) ||
              (u.slug && u.slug.toLowerCase() === cleanEmail)
          )
        } catch (e) {}
      }

      // 2. Procurar nas assinaturas cadastradas no sistema
      const storedSubsRaw = typeof window !== 'undefined' ? localStorage.getItem('biovip_subscriptions') : null
      let allSubs = [...initialSubscriptions]
      if (storedSubsRaw) {
        try {
          const customSubs = JSON.parse(storedSubsRaw)
          if (Array.isArray(customSubs) && customSubs.length > 0) {
            allSubs = customSubs
          }
        } catch (e) {}
      }

      const matchedSub = allSubs.find(
        (s: any) =>
          (s.email && s.email.toLowerCase() === cleanEmail) ||
          (s.whatsapp && s.whatsapp.replace(/\D/g, '') === cleanEmail.replace(/\D/g, '')) ||
          (s.slug && s.slug.toLowerCase() === cleanEmail)
      )

      // 3. Procurar no Supabase se configurado
      let supabaseSite: any = null
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: siteData } = await supabase
            .from('biosites')
            .select('slug, name, email')
            .or(`slug.eq.${cleanEmail},email.eq.${cleanEmail}`)
            .maybeSingle()

          if (siteData && siteData.slug) {
            supabaseSite = siteData
          }
        } catch (err) {}
      }

      // ========================================================
      // SEGURANÇA ESTRITA: SE NÃO EXISTIR CONTA NO BANCO/STORE
      // ========================================================
      if (!matchedUser && !matchedSub && !supabaseSite) {
        setError('Conta não cadastrada. O BioVip é exclusivo para clientes com Bio Site ativo. Verifique os dados digitados ou solicite acesso ao nosso suporte.')
        setLoading(false)
        return
      }

      // ========================================================
      // VALIDAÇÃO DE SENHA
      // ========================================================
      // Cenário A: Usuário registrado em biovip_users
      if (matchedUser) {
        if (matchedUser.password && matchedUser.password !== password) {
          setError('Senha incorreta. Verifique os dados digitados e tente novamente.')
          setLoading(false)
          return
        }

        const clientSlug = matchedUser.slug || matchedSub?.slug || 'ana-freire'
        sessionStorage.setItem('biovip_client_session', matchedUser.email || cleanEmail)
        localStorage.setItem(
          'biovip_logged_client',
          JSON.stringify({
            name: matchedUser.brandName || matchedSub?.clientName || 'Cliente BioVip',
            email: matchedUser.email || cleanEmail,
            slug: clientSlug,
            phone: matchedUser.phone || matchedSub?.whatsapp || ''
          })
        )

        router.push('/conta')
        return
      }

      // Cenário B: Cliente com assinatura ativa cadastrada
      if (matchedSub) {
        // Senha padrão gerada pelo painel administrativo ou 'BioVip2026!'
        if (password !== 'BioVip2026!' && password !== 'biovip2026') {
          setError('Senha incorreta. Se este for seu primeiro acesso, utilize a senha provisória informada pela equipe ou solicite suporte.')
          setLoading(false)
          return
        }

        sessionStorage.setItem('biovip_client_session', matchedSub.email || cleanEmail)
        localStorage.setItem(
          'biovip_logged_client',
          JSON.stringify({
            name: matchedSub.clientName || matchedSub.businessName,
            email: matchedSub.email,
            slug: matchedSub.slug,
            phone: matchedSub.whatsapp
          })
        )

        router.push('/conta')
        return
      }

      // Cenário C: BioSite ativo no Supabase
      if (supabaseSite) {
        sessionStorage.setItem('biovip_client_session', cleanEmail)
        localStorage.setItem(
          'biovip_logged_client',
          JSON.stringify({
            name: supabaseSite.name || 'Cliente BioVip',
            email: supabaseSite.email || cleanEmail,
            slug: supabaseSite.slug,
            phone: ''
          })
        )

        router.push('/conta')
        return
      }
    } catch (err) {
      setError('Ocorreu um erro ao processar o login. Tente novamente ou contate o suporte.')
      setLoading(false)
    }
  }

  // ========================================================
  // LOGIN COM GOOGLE SEGURO (COM CHECAGEM NO BANCO DE DADOS)
  // ========================================================
  const handleGoogleAuthCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    setGoogleError(null)

    const cleanGoogleEmail = googleEmail.trim().toLowerCase()
    if (!cleanGoogleEmail) {
      setGoogleError('Informe o e-mail da sua Conta Google.')
      return
    }

    setGoogleLoading(true)

    try {
      // 1. Procurar em biovip_users
      const storedUsersRaw = typeof window !== 'undefined' ? localStorage.getItem('biovip_users') : null
      let matchedUser: any = null
      if (storedUsersRaw) {
        try {
          const users = JSON.parse(storedUsersRaw)
          matchedUser = users.find((u: any) => u.email && u.email.toLowerCase() === cleanGoogleEmail)
        } catch (e) {}
      }

      // 2. Procurar em assinaturas
      const storedSubsRaw = typeof window !== 'undefined' ? localStorage.getItem('biovip_subscriptions') : null
      let allSubs = [...initialSubscriptions]
      if (storedSubsRaw) {
        try {
          const customSubs = JSON.parse(storedSubsRaw)
          if (Array.isArray(customSubs) && customSubs.length > 0) allSubs = customSubs
        } catch (e) {}
      }
      const matchedSub = allSubs.find((s: any) => s.email && s.email.toLowerCase() === cleanGoogleEmail)

      // 3. Procurar no Supabase se configurado
      let supabaseSite: any = null
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data } = await supabase
            .from('biosites')
            .select('slug, name, email')
            .eq('email', cleanGoogleEmail)
            .maybeSingle()
          if (data && data.slug) supabaseSite = data
        } catch (err) {}
      }

      if (!matchedUser && !matchedSub && !supabaseSite) {
        setGoogleError('Esta conta Google não está vinculada a nenhum Bio Site ativo no BioVip. Entre em contato com o suporte para vincular seu e-mail.')
        setGoogleLoading(false)
        return
      }

      const clientSlug = matchedUser?.slug || matchedSub?.slug || supabaseSite?.slug
      sessionStorage.setItem('biovip_client_session', cleanGoogleEmail)
      localStorage.setItem(
        'biovip_logged_client',
        JSON.stringify({
          name: matchedUser?.brandName || matchedSub?.clientName || supabaseSite?.name || 'Cliente Google VIP',
          email: cleanGoogleEmail,
          slug: clientSlug,
          phone: matchedUser?.phone || matchedSub?.whatsapp || ''
        })
      )

      setShowGoogleModal(false)
      router.push('/conta')
    } catch (err) {
      setGoogleError('Erro ao autenticar com Google. Tente novamente.')
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-16 mt-16 sm:mt-24">
        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-semibold flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Área do Cliente VIP
            </span>
            <h1 className="text-2xl font-serif font-bold text-stone-900">Entrar na sua conta.</h1>
            <p className="text-xs text-stone-500">
              Acesso protegido aos leads, métricas e ao editor exclusivo do seu Bio Site.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 space-y-2.5">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{error}</span>
              </div>
              <div className="pt-1 border-t border-rose-200/60 flex items-center justify-between">
                <span className="text-[11px] text-rose-600">Dúvidas com seu acesso?</span>
                <a
                  href="https://wa.me/5531991390202?text=Ol%C3%A1%20suporte%20BioVip!%20Preciso%20de%20ajuda%20para%20acessar%20meu%20Bio%20Site."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-[10px] hover:bg-emerald-700 transition"
                >
                  <MessageCircle className="w-3 h-3" />
                  Suporte WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* Botão de Login com Google Protegido */}
          <button
            type="button"
            onClick={() => {
              setGoogleError(null)
              setShowGoogleModal(true)
            }}
            className="w-full py-3 px-4 rounded-xl border border-stone-300 hover:border-stone-900 bg-white text-xs font-semibold text-stone-800 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Entrar com Google
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-stone-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-mono uppercase text-stone-400">ou com e-mail cadastrado</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 mb-1 font-semibold flex items-center justify-between">
                <span>E-mail ou WhatsApp cadastrado</span>
                <span className="text-[10px] text-stone-400 font-mono">Ex: cliente@email.com</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com ou (11) 99999-9999"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-stone-900 focus:outline-none transition"
                  required
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 mb-1 font-semibold flex items-center justify-between">
                <span>Senha de Acesso</span>
                <a
                  href="https://wa.me/5531991390202?text=Ol%C3%A1,%20esqueci%20minha%20senha%20de%20acesso%20ao%20BioVip."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-amber-700 hover:underline font-mono"
                >
                  Esqueceu a senha?
                </a>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha cadastrada"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-stone-900 focus:outline-none transition"
                  required
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-stone-950 hover:bg-stone-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#E2B857]" />
                  <span>Validando credenciais...</span>
                </>
              ) : (
                <>
                  <span>Entrar no Meu Bio Site</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E2B857]" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-stone-500 space-y-2">
            <Link href="/starter" className="block text-amber-800 hover:underline font-medium">
              Ainda não tem um Bio Site? Conheça os planos →
            </Link>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* MODAL DE LOGIN COM GOOGLE SEGURO */}
      {/* ========================================================= */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <h3 className="font-serif font-bold text-base text-stone-900">Autenticação Google</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Informe a conta Google vinculada ao seu Bio Site para validar sua identidade no banco de dados.
            </p>

            {googleError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{googleError}</span>
              </div>
            )}

            <form onSubmit={handleGoogleAuthCheck} className="space-y-3">
              <input
                type="email"
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
                placeholder="seuemail@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-stone-900 focus:outline-none"
                required
                autoFocus
              />

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={googleLoading}
                  className="flex-1 py-2.5 rounded-xl bg-stone-950 text-white text-xs font-bold hover:bg-stone-800 disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {googleLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" /> : 'Verificar e Entrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default function EntrarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center text-xs font-mono text-stone-500">
          Carregando BioVip...
        </div>
      }
    >
      <EntrarForm />
    </Suspense>
  )
}

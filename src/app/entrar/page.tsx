'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

export default function EntrarPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Armazena sessão do cliente
    sessionStorage.setItem('biovip_client_session', email || 'cliente@biovip.com.br')
    router.push('/conta')
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-16 mt-16 sm:mt-24">
        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
              Área do Cliente
            </span>
            <h1 className="text-2xl font-serif font-bold text-stone-900">Entrar na sua conta.</h1>
            <p className="text-xs text-stone-500">
              Bem-vindo de volta. Seus números e seu Bio Site estão aqui dentro.
            </p>
          </div>

          {/* Botão de Login com Google */}
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem('biovip_client_session', 'cliente@google.com')
              router.push('/conta')
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
            <span className="bg-white px-3 text-[11px] font-mono uppercase text-stone-400">ou</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-600 mb-1 font-medium">E-mail ou WhatsApp</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-stone-900 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-stone-600 mb-1 font-medium">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-stone-900 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-950 hover:bg-stone-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              Entrar <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-stone-500 space-y-2">
            <Link href="/starter" className="block text-amber-700 hover:underline font-medium">
              Ainda não tem um Bio Site? Criar agora em 3 minutos →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


'use client'

import React from 'react'
import Link from 'next/link'
import {
  ShieldAlert,
  Lock,
  ShieldCheck,
  Timer,
  Eye,
  EyeOff,
  AlertTriangle,
  RefreshCw,
  Unlock,
  CheckCircle2
} from 'lucide-react'

interface AdminAuthGateProps {
  isLocked: boolean
  lockoutRemaining: number
  attemptsLeft: number | null
  pinInput: string
  setPinInput: (val: string) => void
  showSecret: boolean
  setShowSecret: (val: boolean) => void
  pinError: string | null
  isAuthenticating: boolean
  handlePinSubmit: (e: React.FormEvent) => void
}

export default function AdminAuthGate({
  isLocked,
  lockoutRemaining,
  attemptsLeft,
  pinInput,
  setPinInput,
  showSecret,
  setShowSecret,
  pinError,
  isAuthenticating,
  handlePinSubmit
}: AdminAuthGateProps) {
  const lockMins = Math.floor(lockoutRemaining / 60)
  const lockSecs = lockoutRemaining % 60

  return (
    <div className="min-h-screen bg-[#07090E] text-stone-100 flex items-center justify-center p-4 selection:bg-amber-400 selection:text-black">
      <div className="max-w-md w-full bg-[#0F141F]/90 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        {/* Luz de Fundo Decorativa */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header de Segurança */}
        <div className="flex flex-col items-center text-center mb-8 relative">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-stone-950 shadow-xl transition-all duration-500 mb-4 ${
            isLocked
              ? 'bg-gradient-to-tr from-rose-500 to-red-400 shadow-rose-500/20 text-white animate-pulse'
              : 'bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-500 shadow-amber-500/20'
          }`}>
            {isLocked ? <ShieldAlert className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[10px] font-mono uppercase tracking-widest font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Ambiente Protegido · BioVip Master</span>
          </div>

          <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
            Gestão de Assinaturas
          </h1>
          <p className="text-xs text-stone-400 mt-1.5 max-w-xs leading-relaxed">
            Autenticação restrita com assinatura criptográfica SHA-256 e proteção ativa contra ataques de força bruta.
          </p>
        </div>

        {/* Banner de Bloqueio se houver excesso de tentativas */}
        {isLocked ? (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs space-y-2 mb-6 text-center animate-shake">
            <div className="flex items-center justify-center gap-2 font-bold text-rose-300 text-sm">
              <Timer className="w-4 h-4" />
              <span>Painel Temporariamente Bloqueado</span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-300">
              Limite de 5 tentativas consecutivas atingido. Por segurança, o sistema bloqueou novas tentativas.
            </p>
            <div className="text-lg font-mono font-bold text-rose-400 pt-1">
              Tempo restante: {lockMins.toString().padStart(2, '0')}:{lockSecs.toString().padStart(2, '0')}
            </div>
          </div>
        ) : (
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-stone-300 uppercase tracking-wider font-mono">
                  Senha / PIN Master
                </label>
                {attemptsLeft !== null && attemptsLeft > 0 && (
                  <span className="text-[10px] font-mono text-amber-400">
                    {attemptsLeft} tentativa(s) restante(s)
                  </span>
                )}
              </div>

              <div className="relative">
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={pinInput}
                  disabled={isAuthenticating || isLocked}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Digite a Senha ou PIN Master"
                  className="w-full px-4 py-3.5 bg-stone-900/90 border border-stone-700/80 rounded-2xl text-center text-lg sm:text-xl font-mono tracking-widest text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition disabled:opacity-50 pr-12"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition p-1"
                  title={showSecret ? 'Ocultar código' : 'Exibir código'}
                >
                  {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {pinError && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-center gap-1.5 text-center">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                  <span>{pinError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isAuthenticating || !pinInput.trim() || isLocked}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 active:scale-[0.99] text-stone-950 font-bold rounded-2xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAuthenticating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Validando Criptografia...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Acessar Painel ADM</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Dicas e Rodapé de Segurança */}
        <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-stone-400">
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <CheckCircle2 className="w-3 h-3" /> Rate Limit Ativo
            </span>
            <span className="font-mono text-stone-500">Auto-lock: 30min</span>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400 pt-2">
            <Link href="/" className="hover:text-amber-400 transition flex items-center gap-1 text-[11px]">
              ← Voltar ao site público
            </Link>
            <a
              href="https://wa.me/5531991390202?text=Ol%C3%A1!%20Sou%20gestor%20do%20BioVip%20e%20preciso%20de%20ajuda%20com%20o%20acesso%20ADM."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-stone-500 hover:text-amber-400 transition"
            >
              Suporte do Gestor
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

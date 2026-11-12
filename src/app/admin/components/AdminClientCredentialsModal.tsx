'use client'

import React from 'react'
import Link from 'next/link'
import {
  X,
  Key,
  Copy,
  Sparkles,
  Eye,
  EyeOff,
  ExternalLink,
  MessageCircle
} from 'lucide-react'

interface AdminClientCredentialsModalProps {
  client: any | null
  onClose: () => void
  setClient: (val: any) => void
  credentialsCopiedToast: boolean
  setCredentialsCopiedToast: (val: boolean) => void
  generateRandomPasswordValue: () => string
  handleUpdateModalClientPassword: (pass: string) => void
  showPassword: boolean
  setShowPassword: (val: boolean) => void
}

export default function AdminClientCredentialsModal({
  client,
  onClose,
  setClient,
  credentialsCopiedToast,
  setCredentialsCopiedToast,
  generateRandomPasswordValue,
  handleUpdateModalClientPassword,
  showPassword,
  setShowPassword
}: AdminClientCredentialsModalProps) {
  if (!client) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#12151c] border border-stone-800 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative my-auto animate-fade-in text-stone-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase font-bold flex items-center gap-1.5">
            <Key className="w-3 h-3" /> Credenciais do Cliente
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-white mb-1">
          Acesso de {client.name}
        </h3>
        <p className="text-xs text-stone-400 mb-6">
          Dados para o cliente fazer login em <span className="text-amber-400 font-mono">biovip.com.br/entrar</span> e gerenciar seu BioSite.
        </p>

        {/* Card de Informações */}
        <div className="space-y-4 p-4 rounded-2xl bg-[#090b0e] border border-stone-800/80 mb-6">
          <div>
            <label className="block text-[11px] font-mono text-stone-400 uppercase mb-1">
              E-mail de Login
            </label>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs font-mono text-white">
              <span>{client.email}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(client.email)
                  setCredentialsCopiedToast(true)
                  setTimeout(() => setCredentialsCopiedToast(false), 2000)
                }}
                className="text-stone-400 hover:text-amber-400 transition"
                title="Copiar e-mail"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-mono text-stone-400 uppercase">
                Senha de Acesso
              </label>
              <button
                type="button"
                onClick={() => {
                  const newPass = generateRandomPasswordValue()
                  handleUpdateModalClientPassword(newPass)
                }}
                className="text-[11px] font-mono text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" /> Gerar Nova Senha
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={client.password || 'BioVip2026!'}
                onChange={(e) => {
                  setClient({
                    ...client,
                    password: e.target.value
                  })
                }}
                className="w-full px-3 py-2.5 pr-20 rounded-xl bg-stone-900/90 border border-stone-800 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-stone-500 hover:text-stone-300 transition"
                  title={showPassword ? 'Ocultar' : 'Exibir'}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(client.password || 'BioVip2026!')
                    setCredentialsCopiedToast(true)
                    setTimeout(() => setCredentialsCopiedToast(false), 2000)
                  }}
                  className="text-stone-500 hover:text-amber-400 transition"
                  title="Copiar senha"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-stone-400 uppercase mb-1">
              Link Público do BioSite
            </label>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs font-mono text-emerald-400">
              <span>biovip.com.br/{client.slug}</span>
              <Link
                href={`/${client.slug}`}
                target="_blank"
                className="text-stone-400 hover:text-white transition"
                title="Abrir BioSite"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Ações de Envio e Cópia */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => {
              const msg = `🎉 Olá, ${client.name}! Seguem os seus dados de acesso ao BioSite:\n\n🌐 Seu Link na Bio:\nhttps://biovip.com.br/${client.slug}\n\n🔑 Painel de Edição:\nhttps://biovip.com.br/entrar\n• Login: ${client.email}\n• Senha: ${client.password || 'BioVip2026!'}\n\nQualquer dúvida, conte com a nossa equipe!`
              navigator.clipboard.writeText(msg)
              setCredentialsCopiedToast(true)
              setTimeout(() => setCredentialsCopiedToast(false), 2500)
            }}
            className="w-full py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition border border-stone-700"
          >
            <Copy className="w-4 h-4 text-amber-400" />
            <span>{credentialsCopiedToast ? 'Mensagem Copiada com Sucesso!' : 'Copiar Mensagem Pronta de Acesso'}</span>
          </button>

          <a
            href={`https://wa.me/${client.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
              `🎉 Olá, ${client.name}! Seguem os seus dados de acesso ao BioSite:\n\n🌐 Seu Link na Bio:\nhttps://biovip.com.br/${client.slug}\n\n🔑 Painel de Edição:\nhttps://biovip.com.br/entrar\n• Login: ${client.email}\n• Senha: ${client.password || 'BioVip2026!'}\n\nQualquer dúvida, conte com a nossa equipe!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar Credenciais no WhatsApp do Cliente</span>
          </a>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                handleUpdateModalClientPassword(client.password || 'BioVip2026!')
                onClose()
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-stone-400 hover:text-white transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

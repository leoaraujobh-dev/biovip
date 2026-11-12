'use client'

import React from 'react'
import { QrCode, Copy, MessageCircle } from 'lucide-react'
import { Subscription } from '@/data/subscriptions'

interface AdminPixModalProps {
  sub: Subscription | null
  pixKey: string
  pixCopied: boolean
  onCopyPix: () => void
  onClose: () => void
  getWhatsAppMessage: (sub: Subscription) => string
}

export default function AdminPixModal({
  sub,
  pixKey,
  pixCopied,
  onCopyPix,
  onClose,
  getWhatsAppMessage
}: AdminPixModalProps) {
  if (!sub) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-md w-full p-6 shadow-2xl text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <QrCode className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-base font-bold text-white">Cobrança Pix Rápida</h3>
          <p className="text-xs text-stone-400 mt-0.5">
            {sub.businessName} · R$ {sub.amount},00 ({sub.cycle})
          </p>
        </div>

        <div className="p-4 bg-[#0d0f12] border border-stone-800 rounded-2xl space-y-3">
          <div className="text-xs text-stone-400">Chave Pix Copia e Cola:</div>
          <div className="font-mono text-xs text-amber-300 break-all p-2 bg-stone-900 rounded-lg select-all">
            {pixKey}
          </div>
          <button
            onClick={onCopyPix}
            className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" /> {pixCopied ? 'Copiado com Sucesso!' : 'Copiar Chave Pix'}
          </button>
        </div>

        <div className="space-y-2 pt-2">
          <a
            href={`https://wa.me/${sub.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage(sub))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <MessageCircle className="w-4 h-4" /> Enviar Cobrança no WhatsApp
          </a>
          <button
            onClick={onClose}
            className="w-full py-2 text-stone-400 hover:text-white text-xs transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function FloatingWhatsAppSupport() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Exibe o balão após 2.5 segundos de navegação
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const whatsappUrl =
    'https://wa.me/5531991390202?text=' +
    encodeURIComponent('Olá! Estou no site da BioVip e gostaria de falar com um especialista sobre a criação do meu BioSite.')

  return (
    <aside aria-label="Suporte WhatsApp" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 selection:bg-none">
      {/* Balão de Mensagem de Boas-vindas */}
      {showTooltip && !dismissed && (
        <div className="relative max-w-[280px] sm:max-w-[320px] bg-[#0E131F] border border-amber-400/30 text-stone-100 p-3.5 rounded-2xl shadow-2xl animate-fade-in text-xs font-sans">
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 p-1 text-stone-400 hover:text-white transition rounded-full"
            title="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
              Especialista Online
            </span>
          </div>

          <p className="text-stone-300 leading-relaxed text-[11.5px] pr-4">
            Dúvidas sobre como ter seu BioSite pronto em <strong>até 24 horas</strong>? Fale conosco direto no WhatsApp.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-[11px] hover:brightness-110 transition shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Falar com Atendente VIP</span>
          </a>
        </div>
      )}

      {/* Botão Flutuante Principal */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-[0_8px_30px_rgba(16,185,129,0.45)] hover:shadow-[0_10px_35px_rgba(16,185,129,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-emerald-300/40"
        title="Falar no WhatsApp oficial BioVip"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-[#07090E] text-[9px] font-bold text-black items-center justify-center">
            1
          </span>
        </span>
        <MessageCircle className="w-7 h-7 transition-transform group-hover:rotate-6" />
      </a>
    </aside>
  )
}

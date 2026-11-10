'use client'

import React from 'react'
import { X, Crown, Sparkles, Check, ArrowRight, MessageCircle } from 'lucide-react'
import { PlanTier } from '@/config/permissions'

export interface UpgradeVipModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    isAllowed: boolean
    targetPlan: PlanTier
    moduleName: string
    upgradeHook: string
    priceDifference: string
  }
}

export const UpgradeVipModal: React.FC<UpgradeVipModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  if (!isOpen) return null

  const targetPlanName = data.targetPlan === 'vip' ? 'Plano VIP' : 'Plano Pro'
  const isVip = data.targetPlan === 'vip'

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de fazer o upgrade da minha conta para o ${targetPlanName} para liberar o módulo "${data.moduleName}".`
  )
  const whatsappUrl = `https://wa.me/5531991390202?text=${whatsappMessage}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl overflow-hidden border"
        style={{
          background: 'linear-gradient(160deg, #18181e 0%, #0d0d12 100%)',
          borderColor: isVip ? 'rgba(226, 184, 87, 0.4)' : 'rgba(34, 197, 94, 0.4)'
        }}
      >
        {/* Glow de fundo */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: isVip ? '#E2B857' : '#22C55E' }}
        />

        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition"
          aria-label="Fechar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Ícone de Coroa / Selo */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
          style={{
            backgroundColor: isVip ? 'rgba(226, 184, 87, 0.15)' : 'rgba(34, 197, 94, 0.15)',
            border: `1px solid ${isVip ? 'rgba(226, 184, 87, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
            color: isVip ? '#E2B857' : '#22C55E'
          }}
        >
          <Crown className="w-7 h-7" />
        </div>

        {/* Conteúdo Principal */}
        <div className="space-y-2">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border"
            style={{
              backgroundColor: isVip ? 'rgba(226, 184, 87, 0.1)' : 'rgba(34, 197, 94, 0.1)',
              borderColor: isVip ? 'rgba(226, 184, 87, 0.3)' : 'rgba(34, 197, 94, 0.3)',
              color: isVip ? '#E2B857' : '#22C55E'
            }}
          >
            <Sparkles className="w-3 h-3" />
            Recurso Exclusivo do {targetPlanName}
          </span>

          <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
            {data.moduleName}
          </h3>

          <p className="text-stone-300 text-sm leading-relaxed max-w-sm mx-auto">
            {data.upgradeHook}
          </p>
        </div>

        {/* Card de Preço & Diferencial */}
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1.5">
          <div className="text-[11px] text-stone-400 font-sans">
            Disponível com upgrade imediato:
          </div>
          <div className="text-xl font-bold text-white font-mono flex items-center justify-center gap-1.5">
            <span
              className="text-2xl font-black"
              style={{ color: isVip ? '#E2B857' : '#22C55E' }}
            >
              {data.priceDifference}
            </span>
          </div>
          <p className="text-[10px] text-stone-500 font-sans">
            Sem fidelidade • Cancele ou altere a qualquer momento
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-2.5 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{
              backgroundColor: isVip ? '#E2B857' : '#22C55E',
              color: '#09090B'
            }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Fazer Upgrade para {targetPlanName}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs text-stone-400 hover:text-white transition font-medium"
          >
            Continuar no meu plano atual
          </button>
        </div>
      </div>
    </div>
  )
}


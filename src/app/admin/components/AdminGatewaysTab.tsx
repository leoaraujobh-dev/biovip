'use client'

import React from 'react'
import {
  Settings,
  QrCode,
  CreditCard,
  MessageCircle
} from 'lucide-react'

interface AdminGatewaysTabProps {
  pixKey: string
  setPixKey: (val: string) => void
  gatewayProvider: 'asaas' | 'stripe' | 'mercadopago'
  setGatewayProvider: (val: 'asaas' | 'stripe' | 'mercadopago') => void
  apiKey: string
  setApiKey: (val: string) => void
  msgCobrancaTemplate: string
  setMsgCobrancaTemplate: (val: string) => void
  msgBoasVindasTemplate: string
  setMsgBoasVindasTemplate: (val: string) => void
}

export default function AdminGatewaysTab({
  pixKey,
  setPixKey,
  gatewayProvider,
  setGatewayProvider,
  apiKey,
  setApiKey,
  msgCobrancaTemplate,
  setMsgCobrancaTemplate,
  msgBoasVindasTemplate,
  setMsgBoasVindasTemplate
}: AdminGatewaysTabProps) {
  return (
    <section className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-amber-400" /> Configuração de Pagamentos & Automação
        </h2>
        <p className="text-xs text-stone-400 mt-1">
          Configure sua chave Pix e conecte o gateway de cobrança automática recorrente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800">
        {/* Chave Pix Principal */}
        <div className="space-y-4 p-5 bg-[#0d0f12] rounded-2xl border border-stone-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <QrCode className="w-4 h-4" /> Chave Pix do Estúdio
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
              ATIVO
            </span>
          </div>
          <div>
            <label className="block text-xs text-stone-400 mb-1">Chave Pix (CNPJ, E-mail ou Telefone)</label>
            <input
              type="text"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
            />
            <p className="text-[11px] text-stone-500 mt-1">
              Esta chave é incluída automaticamente nos links de cobrança gerados para o WhatsApp.
            </p>
          </div>
        </div>

        {/* Gateway de Recorrência Automática (Asaas / Stripe) */}
        <div className="space-y-4 p-5 bg-[#0d0f12] rounded-2xl border border-stone-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-amber-400" /> Gateway de Assinatura
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
              WEBHOOK ATIVO
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-stone-400 mb-1">Provedor Integrado</label>
              <select
                value={gatewayProvider}
                onChange={(e) => setGatewayProvider(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                <option value="asaas">Asaas (Recomendado para Pix Recorrente & Boletos no Brasil)</option>
                <option value="stripe">Stripe (Cartão de Crédito Internacional)</option>
                <option value="mercadopago">Mercado Pago</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-stone-400 mb-1">API Key / Token de Acesso</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Templates de Mensagens WhatsApp Automatizadas */}
      <div className="p-5 bg-[#0d0f12] rounded-2xl border border-stone-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-stone-800 gap-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-emerald-400" /> Templates de Notificação WhatsApp
          </span>
          <span className="text-[10px] text-stone-500 font-mono">Variáveis dinâmicas para preenchimento automático</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-stone-400 mb-1">Mensagem de Cobrança / Inadimplência</label>
            <textarea
              rows={3}
              value={msgCobrancaTemplate}
              onChange={(e) => setMsgCobrancaTemplate(e.target.value)}
              className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-400 mb-1">Mensagem de Boas-Vindas / Entrega do Bio Site</label>
            <textarea
              rows={3}
              value={msgBoasVindasTemplate}
              onChange={(e) => setMsgBoasVindasTemplate(e.target.value)}
              className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

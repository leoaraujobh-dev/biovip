'use client'

import React from 'react'
import {
  Clock,
  ShieldAlert,
  MessageCircle
} from 'lucide-react'

interface AdminDueDatesTabProps {
  proximosVencimentos: any[]
  subscriptions: any[]
  metrics: { valorAtrasado: number }
  handleConfirmPayment: (id: string) => void
  getWhatsAppMessage: (sub: any) => string
  msgCobrancaTemplate: string
  setMsgCobrancaTemplate: (val: string) => void
  msgBoasVindasTemplate: string
  setMsgBoasVindasTemplate: (val: string) => void
}

export default function AdminDueDatesTab({
  proximosVencimentos,
  subscriptions,
  metrics,
  handleConfirmPayment,
  getWhatsAppMessage,
  msgCobrancaTemplate,
  setMsgCobrancaTemplate,
  msgBoasVindasTemplate,
  setMsgBoasVindasTemplate
}: AdminDueDatesTabProps) {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clientes a Vencer nos Próximos Dias */}
        <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-white text-base">Próximos Vencimentos (15 dias)</h2>
            </div>
            <span className="text-xs font-mono text-stone-400">{proximosVencimentos.length} pendentes</span>
          </div>

          <div className="space-y-3">
            {proximosVencimentos.length === 0 ? (
              <p className="text-stone-500 text-xs py-8 text-center">Nenhum vencimento nos próximos 15 dias.</p>
            ) : (
              proximosVencimentos.map((sub) => (
                <div key={sub.id} className="p-3.5 rounded-xl bg-[#0f1217] border border-stone-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white text-xs">{sub.businessName}</div>
                    <div className="text-[11px] text-stone-400">
                      Vencimento: <span className="font-mono text-amber-300">{sub.nextBillingDate}</span>
                      {sub.diffDays === 0 ? ' (Hoje!)' : sub.diffDays < 0 ? ` (${Math.abs(sub.diffDays)} dias atrasado)` : ` (em ${sub.diffDays} dias)`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-white">R$ {sub.amount}</span>
                    <button
                      onClick={() => handleConfirmPayment(sub.id)}
                      className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold transition cursor-pointer"
                      title="Confirmar Pagamento Pix Recebido"
                    >
                      ✓ Pago
                    </button>
                    <a
                      href={`https://wa.me/${sub.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage(sub))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <MessageCircle className="w-3 h-3" /> Lembrar
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Inadimplentes e Cobrança Rápida */}
        <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <h2 className="font-bold text-white text-base">Inadimplentes para Cobrar</h2>
            </div>
            <span className="text-xs font-mono text-rose-400 font-bold">
              R$ {metrics.valorAtrasado},00 acumulado
            </span>
          </div>

          <div className="space-y-3">
            {subscriptions.filter((s: any) => s.status === 'atrasada').length === 0 ? (
              <div className="py-12 text-center text-stone-500 text-xs">
                🎉 Parabéns! Nenhuma assinatura com atraso no momento.
              </div>
            ) : (
              subscriptions.filter((s: any) => s.status === 'atrasada').map((sub: any) => (
                <div key={sub.id} className="p-3.5 rounded-xl bg-rose-950/10 border border-rose-900/30 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-rose-200 text-xs">{sub.businessName}</div>
                    <div className="text-[11px] text-stone-400">
                      Venceu em <span className="font-mono text-rose-300">{sub.nextBillingDate}</span> · {sub.whatsapp}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleConfirmPayment(sub.id)}
                      className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold transition cursor-pointer"
                      title="Confirmar Pagamento Pix Recebido (Dar Baixa)"
                    >
                      ✓ Pago (Pix)
                    </button>
                    <a
                      href={`https://wa.me/${sub.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage(sub))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <MessageCircle className="w-3 h-3" /> Cobrar Pix
                    </a>
                  </div>
                </div>
              ))
            )}
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

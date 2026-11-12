'use client'

import React from 'react'
import Link from 'next/link'
import {
  Edit2,
  X,
  Sparkles,
  Wand2
} from 'lucide-react'
import { Subscription } from '@/data/subscriptions'

interface AdminSubscriptionModalProps {
  isOpen: boolean
  editingSub: Subscription | null
  onClose: () => void
  onSave: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function AdminSubscriptionModal({
  isOpen,
  editingSub,
  onClose,
  onSave
}: AdminSubscriptionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-amber-400" />
            {editingSub ? `Editar Assinatura: ${editingSub.businessName}` : 'Nova Assinatura de Bio Site'}
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {editingSub && (
          <div className="mt-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-amber-300">Quer editar o design deste Bio Site?</div>
                <div className="text-[11px] text-stone-300">
                  Abra as cores, 16 fontes, 10 botões e foto de <strong>/{editingSub.slug}</strong> no Construtor Visual.
                </div>
              </div>
            </div>
            <Link
              href={`/conta?edit=${editingSub.slug}`}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0 shadow-md"
            >
              <Wand2 className="w-3.5 h-3.5" /> Abrir no Construtor Visual
            </Link>
          </div>
        )}

        <form onSubmit={onSave} className="mt-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-400 mb-1">Nome do Cliente Responsável *</label>
              <input
                type="text"
                name="clientName"
                defaultValue={editingSub?.clientName || ''}
                required
                placeholder="Ex: Dra. Ana Freire"
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Nome do Negócio / Marca *</label>
              <input
                type="text"
                name="businessName"
                defaultValue={editingSub?.businessName || ''}
                required
                placeholder="Ex: Odontologia Estética Freire"
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-400 mb-1">WhatsApp (com DDD) *</label>
              <input
                type="text"
                name="whatsapp"
                defaultValue={editingSub?.whatsapp || ''}
                required
                placeholder="Ex: 5581987654321"
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">E-mail *</label>
              <input
                type="email"
                name="email"
                defaultValue={editingSub?.email || ''}
                required
                placeholder="cliente@email.com"
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-stone-400 mb-1">Nicho / Área</label>
              <input
                type="text"
                name="niche"
                defaultValue={editingSub?.niche || 'Saúde'}
                placeholder="Ex: Medicina"
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Slug do Link (/seunome) *</label>
              <input
                type="text"
                name="slug"
                defaultValue={editingSub?.slug || ''}
                required
                placeholder="ex: ana-freire"
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Domínio Próprio (Opcional)</label>
              <input
                type="text"
                name="customDomain"
                defaultValue={editingSub?.customDomain || ''}
                placeholder="ex: seudominio.com.br"
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-stone-400 mb-1">Plano</label>
              <select
                name="planId"
                defaultValue={editingSub?.planId || 'pro'}
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                <option value="starter">Iniciante (R$ 29)</option>
                <option value="pro">Profissional (R$ 79)</option>
                <option value="agency">Agência (R$ 199)</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Ciclo</label>
              <select
                name="cycle"
                defaultValue={editingSub?.cycle || 'mensal'}
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                <option value="mensal">Mensal</option>
                <option value="anual">Anual</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Valor da Cobrança (R$)</label>
              <input
                type="number"
                name="amount"
                defaultValue={editingSub?.amount || 79}
                required
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Método</label>
              <select
                name="paymentMethod"
                defaultValue={editingSub?.paymentMethod || 'pix'}
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                <option value="pix">Pix</option>
                <option value="cartao">Cartão de Crédito</option>
                <option value="boleto">Boleto Bancário</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-stone-400 mb-1">Status da Assinatura</label>
              <select
                name="status"
                defaultValue={editingSub?.status || 'ativa'}
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                <option value="ativa">Ativa</option>
                <option value="pendente">Pendente (Aguardando)</option>
                <option value="atrasada">Em Atraso</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Data Início</label>
              <input
                type="date"
                name="startDate"
                defaultValue={editingSub?.startDate || new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Próximo Vencimento</label>
              <input
                type="date"
                name="nextBillingDate"
                defaultValue={editingSub?.nextBillingDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]}
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-400 mb-1">Observações Internas (Opcional)</label>
            <textarea
              name="notes"
              defaultValue={editingSub?.notes || ''}
              rows={2}
              placeholder="Anotações sobre preferências, histórico de contatos..."
              className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-400 hover:text-white transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl transition cursor-pointer"
            >
              {editingSub ? 'Salvar Alterações' : 'Criar Assinatura'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

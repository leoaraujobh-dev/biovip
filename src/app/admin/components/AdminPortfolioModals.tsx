'use client'

import React from 'react'
import {
  Plus,
  X,
  Zap,
  Printer,
  Copy,
  Check,
  Download,
  Database,
  UploadCloud
} from 'lucide-react'
import { Subscription } from '@/data/subscriptions'
import { Project } from '@/data/projects'

interface AdminPortfolioModalsProps {
  // Add Client Modal
  isAddClientModalOpen: boolean
  setIsAddClientModalOpen: (open: boolean) => void
  subscriptions: Subscription[]
  portfolioList: Project[]
  handleConvertClientToPortfolio: (sub: Subscription) => void

  // Clone Modal
  isCloneModalOpen: boolean
  setIsCloneModalOpen: (open: boolean) => void
  cloneSourceSlug: string
  setCloneSourceSlug: (slug: string) => void
  defaultProjects: Project[]
  handleCloneModel: (e: React.FormEvent<HTMLFormElement>) => void

  // QR Modal
  qrModalSite: { name: string; slug: string; url: string; category?: string } | null
  setQrModalSite: (site: { name: string; slug: string; url: string; category?: string } | null) => void
  qrCopied: boolean
  setQrCopied: (copied: boolean) => void

  // Backup Modal
  isBackupModalOpen: boolean
  setIsBackupModalOpen: (open: boolean) => void
  handleExportFullBackup: () => void
  handleImportBackup: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AdminPortfolioModals({
  isAddClientModalOpen,
  setIsAddClientModalOpen,
  subscriptions,
  portfolioList,
  handleConvertClientToPortfolio,
  isCloneModalOpen,
  setIsCloneModalOpen,
  cloneSourceSlug,
  setCloneSourceSlug,
  defaultProjects,
  handleCloneModel,
  qrModalSite,
  setQrModalSite,
  qrCopied,
  setQrCopied,
  isBackupModalOpen,
  setIsBackupModalOpen,
  handleExportFullBackup,
  handleImportBackup
}: AdminPortfolioModalsProps) {
  return (
    <>
      {/* MODAL: SELECIONAR CLIENTE REAL PARA O PORTFÓLIO */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  Transformar Cliente Real em Modelo de Portfólio
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Escolha um cliente da sua base de assinantes para expor na vitrine pública /portfolio com case completo.
                </p>
              </div>
              <button
                onClick={() => setIsAddClientModalOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 pt-2">
              {subscriptions.map((sub) => {
                const alreadyInPortfolio = portfolioList.some((p) => p.slug === sub.slug)
                return (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-2xl bg-[#0d0f12] border border-stone-800 flex items-center justify-between hover:border-stone-700 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-xs flex items-center gap-2">
                        {sub.clientName}
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-stone-800 text-stone-300 font-mono">
                          /{sub.slug}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        {sub.businessName} · <span className="text-amber-400/90">{sub.niche}</span>
                      </div>
                    </div>

                    <div>
                      {alreadyInPortfolio ? (
                        <span className="text-[10px] px-3 py-1.5 rounded-xl bg-stone-800 text-stone-500 font-mono">
                          Já na Vitrine
                        </span>
                      ) : (
                        <button
                          onClick={() => handleConvertClientToPortfolio(sub)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" /> Adicionar à Vitrine
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CLONAR MODELO PARA NOVO CLIENTE (1-CLICK GENERATOR) */}
      {isCloneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-amber-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  1-CLICK CLIENT GENERATOR
                </span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Clonar Modelo para Novo Cliente
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Replica instantaneamente o design completo (retrato, paleta, 16 fontes, 10 botões e subpáginas) de um modelo existente para um novo assinante.
                </p>
              </div>
              <button
                onClick={() => setIsCloneModalOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCloneModel} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-semibold">
                  Modelo Base (Template de Referência) *
                </label>
                <select
                  name="sourceSlug"
                  value={cloneSourceSlug}
                  onChange={(e) => setCloneSourceSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  {defaultProjects.map((proj) => (
                    <option key={proj.slug} value={proj.slug}>
                      {proj.name} — {proj.category} (/{proj.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Nome do Cliente Responsável *</label>
                  <input
                    type="text"
                    name="clientName"
                    required
                    placeholder="Ex: Dra. Mariana Costa"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Nome da Empresa / Consultório *</label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    placeholder="Ex: Mariana Costa Dermatologia"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Slug da URL (biovip.com.br/slug) *</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="Ex: mariana-costa"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">WhatsApp com DDD *</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    placeholder="Ex: 5581999998888"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue="cliente@biovip.com.br"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Plano</label>
                  <select
                    name="planId"
                    defaultValue="pro"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="starter">Iniciante (R$ 29/mês)</option>
                    <option value="pro">Profissional (R$ 79/mês ou R$ 790/ano)</option>
                    <option value="agency">Agência VIP (R$ 149/mês)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Ciclo & Valor (R$)</label>
                  <div className="flex gap-2">
                    <select
                      name="cycle"
                      defaultValue="anual"
                      className="w-1/2 px-2 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer text-[11px]"
                    >
                      <option value="mensal">Mensal</option>
                      <option value="anual">Anual</option>
                    </select>
                    <input
                      type="number"
                      name="amount"
                      defaultValue={790}
                      className="w-1/2 px-2 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono text-center focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCloneModalOpen(false)}
                  className="px-4 py-2.5 text-stone-400 hover:text-white transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Zap className="w-4 h-4" /> Clonar & Ativar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: QR CODE DE DIVULGAÇÃO & DISPLAY DE BALCÃO */}
      {qrModalSite && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setQrModalSite(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                DIVULGAÇÃO & DISPLAY DE BALCÃO
              </span>
              <h3 className="text-xl font-bold text-white">
                {qrModalSite.name}
              </h3>
              <p className="text-xs text-stone-400 font-mono mt-1">
                biovip.com.br/{qrModalSite.slug}
              </p>
            </div>

            {/* Imagem do QR Code em Alta Resolução */}
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-3xl border-4 border-stone-900 shadow-2xl">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(`https://biovip.com.br/${qrModalSite.slug}`)}`}
                  alt={`QR Code ${qrModalSite.name}`}
                  className="w-48 h-48 rounded-2xl"
                />
              </div>
            </div>

            {/* Mockup do Display de Balcão */}
            <div className="p-3.5 bg-[#0d0f12] rounded-2xl border border-stone-800 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-200">Pronto para Impressão de Balcão</div>
                <div className="text-[11px] text-stone-400 leading-tight mt-0.5">
                  Envie este QR Code para imprimir no display de acrílico da recepção ou balcão de atendimento.
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`https://biovip.com.br/${qrModalSite.slug}`)
                  setQrCopied(true)
                  setTimeout(() => setQrCopied(false), 2000)
                }}
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                {qrCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {qrCopied ? 'Link Copiado com Sucesso!' : 'Copiar Link Oficial do Bio Site'}
              </button>

              <a
                href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(`https://biovip.com.br/${qrModalSite.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" /> Baixar Imagem do QR Code (PNG)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BACKUP & RESTAURAÇÃO COMPLETA */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsBackupModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                SEGURANÇA DE DADOS
              </span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                Backup & Restauração Completa
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Exporte todos os clientes, modelos customizados, paletas e configurações do painel em um único arquivo JSON.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Exportar */}
              <div className="p-4 rounded-2xl bg-[#0d0f12] border border-stone-800 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-amber-400" />
                  Exportar Backup Completo (JSON)
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Gera uma cópia de segurança com todas as {subscriptions.length} assinaturas e {portfolioList.length} modelos de portfólio.
                </p>
                <button
                  type="button"
                  onClick={handleExportFullBackup}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl transition cursor-pointer"
                >
                  Baixar Arquivo de Backup (.json)
                </button>
              </div>

              {/* Importar */}
              <div className="p-4 rounded-2xl bg-[#0d0f12] border border-stone-800 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-emerald-400" />
                  Restaurar Backup Anterior
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Carregue um arquivo JSON gerado anteriormente para restaurar todas as assinaturas e dados no navegador.
                </p>
                <label className="block w-full py-2.5 text-center bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl transition cursor-pointer border border-stone-700">
                  <span>Selecionar Arquivo JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

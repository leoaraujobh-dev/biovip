'use client'

import React from 'react'
import Link from 'next/link'
import {
  Search,
  Wand2,
  Sliders,
  Mail,
  Printer,
  ShieldAlert,
  Users,
  Sparkles,
  Lock,
  Unlock,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  XCircle,
  ExternalLink,
  MessageCircle,
  Copy,
  Plus,
  Eye,
  Zap,
  QrCode,
  ShieldCheck,
  Key,
  DollarSign
} from 'lucide-react'
import { Subscription } from '@/data/subscriptions'
import { Project } from '@/data/projects'

interface AdminSubscriptionsTabProps {
  searchTerm: string
  setSearchTerm: (s: string) => void
  statusFilter: string
  setStatusFilter: (s: string) => void
  planFilter: string
  setPlanFilter: (s: string) => void
  cycleFilter: string
  setCycleFilter: (s: string) => void
  sortBy: string
  setSortBy: (s: any) => void
  bioSiteTypeFilter: 'todos' | 'modelos' | 'clientes'
  setBioSiteTypeFilter: (f: 'todos' | 'modelos' | 'clientes') => void
  filteredPortfolioList: Project[]
  filteredSubscriptions: Subscription[]
  sortedSubscriptions: Subscription[]
  portfolioList: Project[]
  getWhatsAppMessage: (sub: Subscription) => string
  handleTogglePortfolioVisibility: (slug: string) => void
  setCloneSourceSlug: (slug: string) => void
  setIsCloneModalOpen: (open: boolean) => void
  setQrModalSite: (site: { name: string; slug: string; url: string; category?: string } | null) => void
  handleOpenPermissionsModal: (targetSlug: string, targetTitle: string) => void
  setEditingProject: (p: Project | null) => void
  setIsProjectModalOpen: (open: boolean) => void
  handleDeleteProject: (slug: string) => void
  handleConvertClientToPortfolio: (sub: Subscription) => void
  setPixModalSub: (sub: Subscription | null) => void
  handleConfirmPayment: (subId: string) => void
  handleCopyBillingWA: (sub: Subscription) => void
  handleCopyProposalWA: (sub: Subscription) => void
  handleToggleMaintenance: (slug: string) => void
  handleOpenClientCredentials: (sub: Subscription) => void
  setEditingSub: (sub: Subscription | null) => void
  setIsModalOpen: (open: boolean) => void
  handleDeleteSubscription: (id: string) => void
}

export default function AdminSubscriptionsTab({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  planFilter,
  setPlanFilter,
  cycleFilter,
  setCycleFilter,
  sortBy,
  setSortBy,
  bioSiteTypeFilter,
  setBioSiteTypeFilter,
  filteredPortfolioList,
  filteredSubscriptions,
  sortedSubscriptions,
  portfolioList,
  getWhatsAppMessage,
  handleTogglePortfolioVisibility,
  setCloneSourceSlug,
  setIsCloneModalOpen,
  setQrModalSite,
  handleOpenPermissionsModal,
  setEditingProject,
  setIsProjectModalOpen,
  handleDeleteProject,
  handleConvertClientToPortfolio,
  setPixModalSub,
  handleConfirmPayment,
  handleCopyBillingWA,
  handleCopyProposalWA,
  handleToggleMaintenance,
  handleOpenClientCredentials,
  setEditingSub,
  setIsModalOpen,
  handleDeleteSubscription
}: AdminSubscriptionsTabProps) {
  return (
          <section className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-6">
            {/* Barra de Filtros e Busca */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por cliente, empresa, slug ou WhatsApp..."
                  className="w-full pl-10 pr-4 py-2 bg-[#0d0f12] border border-stone-700/80 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Filtro Status */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0d0f12] border border-stone-700/80 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="todos">Status: Todos</option>
                  <option value="ativa">Ativas</option>
                  <option value="atrasada">Em Atraso</option>
                  <option value="pendente">Aguardando Pagamento</option>
                  <option value="cancelada">Canceladas</option>
                </select>

                {/* Filtro Plano */}
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0d0f12] border border-stone-700/80 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="todos">Plano: Todos</option>
                  <option value="starter">Iniciante</option>
                  <option value="pro">Profissional</option>
                  <option value="agency">Agência</option>
                </select>

                {/* Filtro Ciclo */}
                <select
                  value={cycleFilter}
                  onChange={(e) => setCycleFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0d0f12] border border-stone-700/80 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="todos">Ciclo: Todos</option>
                  <option value="mensal">Mensal</option>
                  <option value="anual">Anual</option>
                </select>

                {/* Ordenação */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-[#0d0f12] border border-stone-700/80 rounded-xl text-xs text-amber-300 font-medium focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="recentes">Ordenar: Mais Recentes</option>
                  <option value="vencimento">Ordenar: Próx. Vencimento</option>
                  <option value="valor">Ordenar: Maior Valor (R$)</option>
                  <option value="views">Ordenar: Mais Acessos</option>
                  <option value="nome">Ordenar: Nome (A-Z)</option>
                </select>

                {(searchTerm || statusFilter !== 'todos' || planFilter !== 'todos' || cycleFilter !== 'todos') && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setStatusFilter('todos')
                      setPlanFilter('todos')
                      setCycleFilter('todos')
                    }}
                    className="text-xs text-amber-400 hover:underline px-2 py-1"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>

            {/* SUB-ABAS DE FILTRO RÁPIDO: TODOS OS BIO SITES / MODELOS / CLIENTES */}
            <div className="flex flex-wrap items-center gap-2 border-b border-stone-800 pb-4">
              <button
                type="button"
                onClick={() => setBioSiteTypeFilter('todos')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  bioSiteTypeFilter === 'todos'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                Todos os Bio Sites ({filteredSubscriptions.length + filteredPortfolioList.length})
              </button>
              <button
                type="button"
                onClick={() => setBioSiteTypeFilter('modelos')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  bioSiteTypeFilter === 'modelos'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Modelos de Portfólio ({filteredPortfolioList.length})
              </button>
              <button
                type="button"
                onClick={() => setBioSiteTypeFilter('clientes')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  bioSiteTypeFilter === 'clientes'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Clientes Reais ({filteredSubscriptions.length})
              </button>
            </div>

            {/* TABELA DE ASSINATURAS & BIO SITES */}
            <div className="w-full overflow-x-auto rounded-2xl border border-stone-800 bg-[#0d0f12] shadow-inner scrollbar-thin scrollbar-thumb-stone-700">
              <table className="w-full text-left border-collapse min-w-[1400px]">
                <thead>
                  <tr className="bg-[#0f1217] text-[11px] font-mono uppercase tracking-wider text-stone-400 border-b border-stone-800">
                    <th className="py-3.5 px-4 min-w-[260px]">Bio Site / Profissional</th>
                    <th className="py-3.5 px-4 min-w-[180px]">Nicho & Registro</th>
                    <th className="py-3.5 px-4 min-w-[130px]">Tipo / Plano</th>
                    <th className="py-3.5 px-4 min-w-[110px]">Valor</th>
                    <th className="py-3.5 px-4 min-w-[120px]">Próx. Cobrança</th>
                    <th className="py-3.5 px-4 min-w-[140px]">Status</th>
                    <th className="py-3.5 pr-8 pl-4 text-right sticky right-0 bg-[#0f1217] z-20 shadow-[-16px_0_24px_-4px_rgba(0,0,0,0.7)] border-l border-stone-800/80 min-w-[460px] w-[460px]">
                      Ações Rápidas
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 text-xs">
                  {/* SEÇÃO: MODELOS DE PORTFÓLIO (DEMONSTRATIVOS) */}
                  {(bioSiteTypeFilter === 'todos' || bioSiteTypeFilter === 'modelos') &&
                    filteredPortfolioList.map((proj) => {
                      const isVisible = proj.inPortfolio !== false
                      return (
                        <tr
                          key={`proj-${proj.slug}`}
                          className="hover:bg-stone-800/30 transition group bg-stone-900/25"
                        >
                          {/* Imagem + Nome + Slug */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-stone-700/80 bg-stone-900">
                                <img
                                  src={proj.photo}
                                  alt={proj.name}
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-amber-300 transition flex items-center gap-1.5">
                                  {proj.name}
                                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono font-bold flex items-center gap-1">
                                    <Sparkles className="w-2.5 h-2.5" /> MODELO
                                  </span>
                                </div>
                                <div className="text-[11px] text-stone-400 flex items-center gap-1.5 mt-0.5">
                                  <a
                                    href={`/${proj.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-amber-400/90 hover:underline flex items-center gap-0.5 font-mono"
                                  >
                                    /{proj.slug} <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                  <span>·</span>
                                  <Link
                                    href={`/portfolio/${proj.slug}`}
                                    target="_blank"
                                    className="text-stone-400 hover:text-white inline-flex items-center gap-0.5 font-mono"
                                  >
                                    Case <ExternalLink className="w-2.5 h-2.5" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Nicho & Registro */}
                          <td className="py-3.5 px-4">
                            <div className="text-stone-300 font-medium">{proj.role}</div>
                            <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                              {proj.registrationCode}
                            </div>
                          </td>

                          {/* Tipo / Plano */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-blue-500/15 text-blue-300 border border-blue-500/30 font-mono">
                                Vitrine (Pro)
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono">
                                {proj.subpages ? `${proj.subpages.length} pgs` : '3 pgs'}
                              </span>
                            </div>
                          </td>

                          {/* Valor (R$ 0,00 - Demonstrativo) */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="text-stone-300 font-medium">
                              R$ 0,00
                            </div>
                            <div className="text-[9.5px] text-stone-500 uppercase">
                              Demonstrativo
                            </div>
                          </td>

                          {/* Próx. Cobrança */}
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <div className="text-stone-400">
                              Isento
                            </div>
                            <span className="text-[9.5px] text-emerald-400/80">PERM. ATIVO</span>
                          </td>

                          {/* Status no Portfólio (com Toggle Direto!) */}
                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              onClick={() => handleTogglePortfolioVisibility(proj.slug)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer border ${
                                isVisible
                                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                                  : 'bg-stone-800 text-stone-500 border-stone-700 hover:bg-stone-700 hover:text-stone-300'
                              }`}
                              title="Clique para alternar exibição no /portfolio"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isVisible ? 'bg-emerald-400' : 'bg-stone-500'}`} />
                              {isVisible ? 'EXIBINDO NO PORTFÓLIO' : 'OCULTO DO PORTFÓLIO'}
                            </button>
                          </td>

                          {/* Ações Rápidas */}
                          <td className="py-3.5 pr-8 pl-4 text-right sticky right-0 bg-[#12151c] group-hover:bg-[#1a202c] transition-colors z-20 shadow-[-16px_0_24px_-4px_rgba(0,0,0,0.7)] border-l border-stone-800/80 min-w-[460px] w-[460px]">
                            <div className="flex items-center justify-end gap-1.5 flex-nowrap shrink-0 pr-1">
                              <Link
                                href={`/conta?edit=${proj.slug}`}
                                title="Editar no Construtor Visual (Cores, Fontes, Botões, Foto, Páginas)"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 font-semibold text-[11px] transition border border-amber-500/30 shrink-0"
                              >
                                <Wand2 className="w-3.5 h-3.5" />
                                <span>Editar Visual</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  setCloneSourceSlug(proj.slug)
                                  setIsCloneModalOpen(true)
                                }}
                                title="Clonar este Modelo para um Novo Cliente"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <Zap className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setQrModalSite({ name: proj.name, slug: proj.slug, url: `https://biovip.com.br/${proj.slug}`, category: proj.category })}
                                title="Visualizar QR Code de Divulgação"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                              </button>
                              <Link
                                href={`/${proj.slug}`}
                                target="_blank"
                                title="Abrir Bio Site ao Vivo"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition shrink-0"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleOpenPermissionsModal(proj.slug, proj.name)}
                                title="Configurar o que pode ser alterado (/conta) e Ativar/Desativar Módulos"
                                className="p-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 transition cursor-pointer shrink-0"
                              >
                                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProject(proj)
                                  setIsProjectModalOpen(true)
                                }}
                                title="Editar Modelo & Case"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProject(proj.slug)}
                                title="Remover Modelo"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/30 hover:text-rose-400 text-stone-400 transition cursor-pointer shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}

                  {/* SEÇÃO: CLIENTES REAIS */}
                  {(bioSiteTypeFilter === 'todos' || bioSiteTypeFilter === 'clientes') &&
                    sortedSubscriptions.map((sub) => {
                      const isOverdue = sub.status === 'atrasada'
                      const isPending = sub.status === 'pendente'
                      const isAlreadyInPortfolio = portfolioList.some(p => p.slug === sub.slug)

                      return (
                        <tr
                          key={sub.id}
                          className="hover:bg-stone-800/30 transition group"
                        >
                          {/* Cliente / Marca */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center font-bold text-stone-300 shrink-0">
                                {sub.clientName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-amber-300 transition flex items-center gap-1.5">
                                  {sub.businessName}
                                  {sub.customDomain && (
                                    <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/10 text-blue-300 rounded font-mono" title={sub.customDomain}>
                                      DOMÍNIO
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                                  <span>{sub.clientName}</span>
                                  <span>·</span>
                                  <a
                                    href={sub.bioSiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-amber-400/90 hover:underline flex items-center gap-0.5 font-mono"
                                  >
                                    /{sub.slug} <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Contato (WhatsApp & Email) */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/${sub.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage(sub))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition"
                                title="Falar no WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`mailto:${sub.email}`}
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
                                title={`Enviar e-mail para ${sub.email}`}
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                              <span className="font-mono text-stone-400 text-[11px]">
                                {sub.whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')}
                              </span>
                            </div>
                          </td>

                          {/* Plano & Ciclo */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                                  sub.planId === 'agency'
                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                    : sub.planId === 'pro'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-stone-700/50 text-stone-300 border border-stone-600'
                                }`}
                              >
                                {sub.planName}
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono uppercase">
                                ({sub.cycle})
                              </span>
                            </div>
                          </td>

                          {/* Valor & Método */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="text-white font-semibold">
                              R$ {sub.amount},00
                            </div>
                            <div className="text-[10px] text-stone-400 uppercase">
                              via {sub.paymentMethod}
                            </div>
                          </td>

                          {/* Próxima Cobrança */}
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <div className={isOverdue ? 'text-rose-400 font-bold flex items-center gap-1' : 'text-stone-300'}>
                              {isOverdue && <AlertTriangle className="w-3 h-3" />}
                              {sub.nextBillingDate}
                            </div>
                            {isOverdue && (
                              <span className="text-[10px] text-rose-400/80">VENCIDA</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            <div className="space-y-1">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  sub.status === 'ativa'
                                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                    : sub.status === 'atrasada'
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                                    : sub.status === 'pendente'
                                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                    : 'bg-stone-800 text-stone-500 border border-stone-700'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  sub.status === 'ativa' ? 'bg-emerald-400' :
                                  sub.status === 'atrasada' ? 'bg-rose-400' :
                                  sub.status === 'pendente' ? 'bg-amber-400' : 'bg-stone-500'
                                }`} />
                                {sub.status.toUpperCase()}
                              </span>

                              {/* Selo se já está no portfólio */}
                              {isAlreadyInPortfolio ? (
                                <span className="block text-[9px] font-mono text-emerald-400 font-semibold">
                                  ✓ No Portfólio
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleConvertClientToPortfolio(sub)}
                                  className="block text-[9px] font-mono text-amber-400 hover:text-amber-300 hover:underline cursor-pointer"
                                  title="Promover este cliente para a vitrine pública /portfolio"
                                >
                                  + Add à Vitrine
                                </button>
                              )}
                            </div>
                          </td>

                          {/* Ações */}
                          <td className="py-3.5 pr-8 pl-4 text-right sticky right-0 bg-[#12151c] group-hover:bg-[#1a202c] transition-colors z-20 shadow-[-16px_0_24px_-4px_rgba(0,0,0,0.7)] border-l border-stone-800/80 min-w-[460px] w-[460px]">
                            <div className="flex items-center justify-end gap-1.5 flex-nowrap shrink-0 pr-1">
                              {/* Editar Visual do Bio Site */}
                              <Link
                                href={`/conta?edit=${sub.slug}`}
                                title="Editar Bio Site no Construtor Visual (Cores, Fontes, Botões, Foto, Páginas)"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 font-semibold text-[11px] transition border border-amber-500/30 shrink-0"
                              >
                                <Wand2 className="w-3.5 h-3.5" />
                                <span>Editar Visual</span>
                              </Link>

                              {/* Abrir Link do Bio Site */}
                              <a
                                href={sub.bioSiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Abrir Bio Site do Cliente"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition shrink-0"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>

                              {/* Botão Pix Cobrança */}
                              <button
                                type="button"
                                onClick={() => setPixModalSub(sub)}
                                title="Gerar Cobrança Pix / QR Code"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                              </button>

                              {/* Dar Baixa / Confirmar Pagamento Pix */}
                              {(isOverdue || isPending) && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleConfirmPayment(sub.id)}
                                    title="Confirmar Pagamento Pix Recebido (Dar Baixa)"
                                    className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition cursor-pointer shrink-0"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyBillingWA(sub)}
                                    title="Copiar Mensagem Amigável de Cobrança Pix para WhatsApp"
                                    className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition cursor-pointer shrink-0"
                                  >
                                    <DollarSign className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}

                              {/* QR Code de Divulgação & Balcão */}
                              <button
                                type="button"
                                onClick={() => setQrModalSite({ name: sub.businessName, slug: sub.slug, url: sub.bioSiteUrl, category: sub.niche })}
                                title="Visualizar QR Code de Divulgação (Display de Balcão / Cartão)"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>

                              {/* Copiar Proposta Comercial WhatsApp */}
                              <button
                                type="button"
                                onClick={() => handleCopyProposalWA(sub)}
                                title="Copiar Proposta Comercial Persuasiva para WhatsApp"
                                className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 transition cursor-pointer shrink-0"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                              </button>

                              {/* Alternar Modo Manutenção (Inadimplência D+7 / Reforma) */}
                              <button
                                type="button"
                                onClick={() => handleToggleMaintenance(sub.id)}
                                title="Alternar Modo Manutenção (Tela neutra elegante sem quebrar reputação)"
                                className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 transition cursor-pointer shrink-0"
                              >
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                              </button>

                              {/* Controle de Permissões do Cliente & Módulos */}
                              <button
                                type="button"
                                onClick={() => handleOpenPermissionsModal(sub.slug, sub.businessName)}
                                title="Configurar o que o cliente pode alterar (/conta) e Ativar/Desativar Módulos"
                                className="p-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 transition cursor-pointer shrink-0"
                              >
                                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                              </button>

                              {/* Ver / Resetar Credenciais de Acesso do Cliente (/entrar) */}
                              <button
                                type="button"
                                onClick={() => handleOpenClientCredentials(sub)}
                                title="Ver / Resetar Credenciais de Acesso do Cliente (/entrar)"
                                className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition cursor-pointer shrink-0"
                              >
                                <Key className="w-3.5 h-3.5 text-amber-400" />
                              </button>

                              {/* Editar */}
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingSub(sub)
                                  setIsModalOpen(true)
                                }}
                                title="Editar Assinatura"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Excluir */}
                              <button
                                type="button"
                                onClick={() => handleDeleteSubscription(sub.id)}
                                title="Excluir"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/30 hover:text-rose-400 text-stone-400 transition cursor-pointer shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}

                  {filteredSubscriptions.length === 0 && filteredPortfolioList.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-stone-500">
                        Nenhum Bio Site encontrado com os filtros selecionados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        
  )
}

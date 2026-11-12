'use client'

import React from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Wand2,
  Sliders,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Zap,
  QrCode,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  XCircle
} from 'lucide-react'
import { Project } from '@/data/projects'

interface AdminPortfolioTabProps {
  portfolioList: Project[]
  handleOpenPermissionsModal: (targetSlug: string, targetTitle: string) => void
  setIsAddClientModalOpen: (open: boolean) => void
  handleTogglePortfolioVisibility: (slug: string) => void
  setCloneSourceSlug: (slug: string) => void
  setIsCloneModalOpen: (open: boolean) => void
  setQrModalSite: (site: { name: string; slug: string; url: string; category?: string } | null) => void
  setEditingProject: (p: Project | null) => void
  setIsProjectModalOpen: (open: boolean) => void
  handleDeleteProject: (slug: string) => void
}

export default function AdminPortfolioTab({
  portfolioList,
  handleOpenPermissionsModal,
  setIsAddClientModalOpen,
  handleTogglePortfolioVisibility,
  setCloneSourceSlug,
  setIsCloneModalOpen,
  setQrModalSite,
  setEditingProject,
  setIsProjectModalOpen,
  handleDeleteProject
}: AdminPortfolioTabProps) {
  return (
          <section className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> Vitrine & Modelos de Portfólio
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Gerencie os Bio Sites exibidos na página pública <code className="text-amber-300">/portfolio</code>. Modelos demonstrativos não geram impacto financeiro no painel.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddClientModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Cliente Real ao Portfólio
                </button>
                <Link
                  href="/portfolio"
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition border border-stone-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Ver /portfolio
                </Link>
              </div>
            </div>

            {/* Tabela de Modelos de Portfólio */}
            <div className="w-full overflow-x-auto rounded-2xl border border-stone-800 bg-[#0d0f12] shadow-inner">
              <table className="w-full text-left text-xs min-w-[1000px]">
                <thead className="bg-[#14181f] text-stone-400 font-mono text-[11px] uppercase border-b border-stone-800">
                  <tr>
                    <th className="py-3 px-4">Modelo / Profissional</th>
                    <th className="py-3 px-4">Nicho & Registro</th>
                    <th className="py-3 px-4">Tipo</th>
                    <th className="py-3 px-4">Métricas do Case</th>
                    <th className="py-3 px-4 text-center">Status no Portfólio</th>
                    <th className="py-3.5 pr-8 pl-4 text-right sticky right-0 bg-[#14181f] z-20 shadow-[-16px_0_24px_-4px_rgba(0,0,0,0.7)] border-l border-stone-800/80 min-w-[340px] w-[340px]">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {portfolioList.map((proj) => {
                    const isVisible = proj.inPortfolio !== false
                    return (
                      <tr key={proj.slug} className="hover:bg-stone-800/30 transition group">
                        {/* Imagem + Nome + Link */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-stone-700/80 bg-stone-900">
                              <img
                                src={proj.photo}
                                alt={proj.name}
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                                {proj.name}
                              </div>
                              <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
                                <span>/{proj.slug}</span>
                                <Link
                                  href={`/portfolio/${proj.slug}`}
                                  target="_blank"
                                  className="text-amber-400/90 hover:underline inline-flex items-center gap-0.5 ml-1"
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
                          <div className="text-[10px] text-amber-400/80 font-mono">{proj.registrationCode}</div>
                        </td>

                        {/* Tipo */}
                        <td className="py-3.5 px-4">
                          {proj.isPortfolioModel ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                              Demonstrativo (R$ 0)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              Cliente Real
                            </span>
                          )}
                        </td>

                        {/* Métricas do Case */}
                        <td className="py-3.5 px-4 font-mono text-[11px]">
                          <div className="text-stone-300">
                            <span className="text-amber-400 font-bold">{proj.stats.conversion}</span> conv.
                          </div>
                          <div className="text-[10px] text-stone-500">
                            {proj.stats.views} views · {proj.stats.clicks} cliques
                          </div>
                        </td>

                        {/* Status Toggle no Portfólio */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleTogglePortfolioVisibility(proj.slug)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer border ${
                              isVisible
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                                : 'bg-stone-800 text-stone-500 border-stone-700 hover:bg-stone-700 hover:text-stone-300'
                            }`}
                            title="Clique para alternar exibição no /portfolio"
                          >
                            <span className={`w-2 h-2 rounded-full ${isVisible ? 'bg-emerald-400' : 'bg-stone-500'}`} />
                            {isVisible ? 'Exibindo no Portfólio' : 'Oculto do Portfólio'}
                          </button>
                        </td>

                        {/* Ações */}
                        <td className="py-3.5 pr-8 pl-4 text-right sticky right-0 bg-[#12151c] group-hover:bg-[#1a202c] transition-colors z-20 shadow-[-16px_0_24px_-4px_rgba(0,0,0,0.7)] border-l border-stone-800/80 min-w-[340px] w-[340px]">
                          <div className="flex items-center justify-end gap-1.5 flex-nowrap shrink-0 pr-1">
                            <Link
                              href={`/conta?edit=${proj.slug}`}
                              title="Editar no Construtor Visual (Cores, Fontes, Botões, Foto, Páginas)"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 font-semibold text-[11px] transition border border-amber-500/30 shrink-0"
                            >
                              <Wand2 className="w-3.5 h-3.5" />
                              <span>Editar Visual</span>
                            </Link>

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
                              title="Permissões do Painel e Ativar/Desativar Módulos deste Modelo"
                              className="p-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 transition cursor-pointer shrink-0"
                            >
                              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                            </button>

                            <button
                              onClick={() => {
                                setEditingProject(proj)
                                setIsProjectModalOpen(true)
                              }}
                              title="Editar Case de Estudo"
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer shrink-0"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
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
                </tbody>
              </table>
            </div>
          </section>
        
  )
}

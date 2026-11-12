'use client'

import React from 'react'
import Link from 'next/link'
import {
  BarChart3,
  Download,
  Database,
  PieChart,
  Layers,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Wand2
} from 'lucide-react'

export interface NicheMetricItem {
  niche: string
  count: number
  percentage: number
}

export interface PlanDistributionData {
  pro: { count: number; mrr: number }
  starter: { count: number; mrr: number }
  agency: { count: number; mrr: number }
}

export interface TopSiteItem {
  slug: string
  name: string
  conversion: string
  views: number
  clicks: number
}

interface AdminMetricsTabProps {
  exportCSV: () => void
  handleExportFullBackup: () => void
  nicheMetrics: NicheMetricItem[]
  planDistribution: PlanDistributionData
  topSites: TopSiteItem[]
}

export default function AdminMetricsTab({
  exportCSV,
  handleExportFullBackup,
  nicheMetrics,
  planDistribution,
  topSites
}: AdminMetricsTabProps) {
  return (
    <section className="space-y-6">
      {/* Header da Aba */}
      <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
            BUSINESS INTELLIGENCE & ANALYTICS
          </span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            Métricas Executivas & Desempenho
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Visão consolidada de receita recorrente, distribuição por nichos, planos ativos e taxa de conversão dos Bio Sites.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-stone-700/80"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" /> Exportar CSV
          </button>
          <button
            onClick={handleExportFullBackup}
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-amber-500/30"
          >
            <Database className="w-3.5 h-3.5" /> Backup JSON
          </button>
        </div>
      </div>

      {/* Grid 1: Nichos e Planos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Distribuição por Nicho (Col 7) */}
        <div className="lg:col-span-7 bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-white text-sm">Distribuição por Nicho de Mercado</h3>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              {nicheMetrics.length} nichos cadastrados
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {nicheMetrics.map((item) => (
              <div key={item.niche} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-200">{item.niche}</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-stone-400">{item.count} site{item.count > 1 ? 's' : ''}</span>
                    <span className="text-amber-400 font-bold">({item.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(item.percentage, 8)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mix de Planos & Funil de Conversão (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mix de Planos */}
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
              <Layers className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-white text-sm">Mix de Assinaturas por Plano</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#0d0f12] border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-white flex items-center gap-2">
                    Plano Profissional
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                      MAIS VENDIDO
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    R$ 79/mês ou R$ 790/ano
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-amber-400 font-bold text-sm">{planDistribution.pro.count} clientes</div>
                  <div className="text-[10px] text-stone-500">R$ {planDistribution.pro.mrr.toLocaleString('pt-BR')}/mês</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0d0f12] border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-white">Plano Iniciante (Starter)</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">R$ 29/mês</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-white font-bold text-sm">{planDistribution.starter.count} clientes</div>
                  <div className="text-[10px] text-stone-500">R$ {planDistribution.starter.mrr.toLocaleString('pt-BR')}/mês</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0d0f12] border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-purple-300">Plano Agência VIP</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">R$ 149/mês</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-purple-400 font-bold text-sm">{planDistribution.agency.count} clientes</div>
                  <div className="text-[10px] text-stone-500">R$ {planDistribution.agency.mrr.toLocaleString('pt-BR')}/mês</div>
                </div>
              </div>
            </div>
          </div>

          {/* Funil de Conversão */}
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">Taxa de Conversão dos Bio Sites</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-300">
                <span>1. Visualizações Gerais</span>
                <span className="font-mono font-bold text-white">100%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-full" />
              </div>

              <div className="flex items-center justify-between text-stone-300 pt-1">
                <span>2. Cliques em Botões & Links</span>
                <span className="font-mono font-bold text-amber-400">42.8%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-[42.8%]" />
              </div>

              <div className="flex items-center justify-between text-stone-300 pt-1">
                <span>3. Conversão para WhatsApp / Agendamento</span>
                <span className="font-mono font-bold text-emerald-400">31.4%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[31.4%]" />
              </div>
            </div>

            <p className="text-[11px] text-stone-400 pt-2 leading-relaxed">
              ✨ Taxa média <strong>3.4x superior</strong> a links tradicionais devido à tecnologia de dissolução orgânica de retratos e botões nobres de alto contraste.
            </p>
          </div>
        </div>
      </div>

      {/* Grid 2: Top Bio Sites Mais Visitados */}
      <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Top Bio Sites com Maior Tráfego & Conversão</h3>
          </div>
          <span className="text-xs text-stone-400 font-mono">Base ativa auditada</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topSites.map((site, idx) => (
            <div
              key={site.slug}
              className="p-4 rounded-2xl bg-[#0d0f12] border border-stone-800/80 hover:border-amber-500/40 transition flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-base">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {site.conversion} conv.
                  </span>
                </div>
                <div className="font-bold text-white text-xs truncate" title={site.name}>
                  {site.name}
                </div>
                <div className="text-[10px] text-stone-400 truncate mt-0.5 font-mono">
                  /{site.slug}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-300">
                  <span>Acessos:</span>
                  <span className="font-bold text-white">{site.views.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mt-1">
                  <span>Cliques:</span>
                  <span className="text-amber-400 font-bold">{site.clicks.toLocaleString('pt-BR')}</span>
                </div>

                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-stone-800">
                  <Link
                    href={`/${site.slug}`}
                    target="_blank"
                    className="flex-1 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-semibold text-center transition flex items-center justify-center gap-1"
                  >
                    <ExternalLink className="w-2.5 h-2.5" /> Ver
                  </Link>
                  <Link
                    href={`/conta?edit=${site.slug}`}
                    className="flex-1 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 text-[10px] font-bold text-center transition flex items-center justify-center gap-1 border border-amber-500/30"
                  >
                    <Wand2 className="w-2.5 h-2.5" /> Editar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

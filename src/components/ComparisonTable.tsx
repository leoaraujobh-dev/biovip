'use client'

import { Check, X, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ComparisonRow {
  feature: string
  biovip: string | boolean
  linktree: string | boolean
  wordpress: string | boolean
  highlight?: boolean
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Fotografia com Fusão Orgânica de Estúdio',
    biovip: 'Dissolvida com elegância no fundo',
    linktree: 'Apenas avatar redondo minúsculo',
    wordpress: 'Exige designer e edição CSS',
    highlight: true,
  },
  {
    feature: '3 Páginas Adicionais Pro (Antes & Depois, Procedimentos, Agenda)',
    biovip: 'Inclusas e integradas na bio',
    linktree: 'Não possui (apenas links externos)',
    wordpress: 'Exige plugins pagos e complexos',
    highlight: true,
  },
  {
    feature: 'Rastreamento Automático de Lead no WhatsApp (Meta & TikTok Pixel)',
    biovip: 'Nativo em 1 clique',
    linktree: 'Somente em planos caros',
    wordpress: 'Requer GTM e programação',
    highlight: true,
  },
  {
    feature: 'Display de Balcão & Cartão com QR Code HD para Impressão',
    biovip: 'Gerador em PNG 600x600 incluso',
    linktree: 'Não disponível',
    wordpress: 'Não incluso',
  },
  {
    feature: 'Velocidade de Abertura no Instagram',
    biovip: 'Ultra-rápido (< 0.4s)',
    linktree: '1.5s - 2.8s (com scripts pesados)',
    wordpress: '2.0s - 4.5s (pesado em mobile)',
    highlight: true,
  },
  {
    feature: 'Percepção de Valor para Serviços de Alto Ticket',
    biovip: 'Autoridade e estética editorial de luxo',
    linktree: 'Aparência genérica de link grátis',
    wordpress: 'Institucional tradicional',
  },
  {
    feature: 'Facilidade de Atualização pelo Celular',
    biovip: 'Painel simplificado em segundos',
    linktree: 'Fácil, porém limitado',
    wordpress: 'Painel complexo e burocrático',
  },
]

export default function ComparisonTable() {
  return (
    <section id="comparativo" className="py-20 lg:py-32 bg-stone-950 text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-main relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs sm:text-sm font-semibold mb-4 border border-amber-500/20 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            COMPARATIVO REAL
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.2]" style={{ lineHeight: '1.2' }}>
            A diferença brutal entre perder tempo com curiosos e receber clientes prontos para agendar.
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
            Compare o impacto de um link comum feito por conta própria contra um Microsite BioVip desenhado para vender seus procedimentos e serviços todos os dias.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[760px] bg-[#0f1217] border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-800 bg-[#161a22]">
                  <th className="py-5 px-6 text-sm font-semibold text-stone-300 w-2/5">
                    Recursos & Posicionamento
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-amber-300 w-1/5 bg-amber-500/10 border-x border-amber-500/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                      BioVip Pro
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-stone-400 w-1/5">
                    Links Genéricos (ex: Linktree)
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-stone-400 w-1/5">
                    Site Tradicional (WordPress)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80 text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={`transition-colors hover:bg-stone-900/40 ${
                      row.highlight ? 'bg-amber-500/[0.02]' : ''
                    }`}
                  >
                    <td className="py-4.5 px-6 font-medium text-stone-200">
                      {row.feature}
                    </td>
                    <td className="py-4.5 px-6 font-semibold text-amber-200 bg-amber-500/10 border-x border-amber-500/20">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{row.biovip}</span>
                      </div>
                    </td>
                    <td className="py-4.5 px-6 text-stone-400">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500/80 flex-shrink-0" />
                        <span>{row.linktree}</span>
                      </div>
                    </td>
                    <td className="py-4.5 px-6 text-stone-400">
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500 text-xs font-mono">⚠️</span>
                        <span>{row.wordpress}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA for table */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/starter"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold hover:from-amber-400 hover:to-amber-500 transition shadow-lg shadow-amber-500/20"
          >
            Migrar para o BioVip Hoje
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-stone-700 text-stone-300 font-semibold hover:border-amber-400 hover:text-white transition"
          >
            Ver Modelos em Funcionamento
          </Link>
        </div>
      </div>
    </section>
  )
}


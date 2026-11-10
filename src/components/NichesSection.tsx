'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  Sparkles,
  Stethoscope,
  Smile,
  Scissors,
  Scale,
  Building2,
  Compass,
  ArrowRight,
  CheckCircle2,
  Eye
} from 'lucide-react'

interface NicheItem {
  id: string
  name: string
  badge: string
  icon: any
  tagline: string
  description: string
  sampleName: string
  sampleSlug: string
  samplePhoto: string
  samplePalette: string
  subpagesList: string[]
  conversionBenefit: string
}

const niches: NicheItem[] = [
  {
    id: 'medicina',
    name: 'Médicos & Clínicas',
    badge: 'CRM Integrado',
    icon: Stethoscope,
    tagline: 'Autoridade médica ética e agendamento direto com a secretária.',
    description: 'Projetado conforme as normas éticas do CFM. Apresenta títulos de especialista, corpo clínico, convênios atendidos e triagem inteligente para consultas particulares.',
    sampleName: 'Dr. Renato Andrade',
    sampleSlug: 'dr-renato-andrade',
    samplePhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=900&auto=format&fit=crop',
    samplePalette: 'Azul Marinho & Prata',
    subpagesList: ['Procedimentos Cirúrgicos', 'Corpo Clínico & Títulos', 'Agenda de Consultas'],
    conversionBenefit: '+62% de agendamentos diretos de consultas particulares sem fricção.',
  },
  {
    id: 'odonto',
    name: 'Odontologia & Harmonização',
    badge: 'CRO Integrado',
    icon: Smile,
    tagline: 'Lentes de contato dental, implantes e harmonização com Antes & Depois.',
    description: 'Destaque seus casos clínicos com o slider interativo de Antes & Depois. O paciente arrasta a divisória na tela e se apaixona pelo resultado antes mesmo da consulta.',
    sampleName: 'Dra. Ana Freire',
    sampleSlug: 'dra-ana-freire',
    samplePhoto: 'https://images.unsplash.com/photo-1594824813589-a9a7d32e92c2?q=80&w=900&auto=format&fit=crop',
    samplePalette: 'Nude Nobre & Ouro',
    subpagesList: ['Tabela de Procedimentos', 'Transformações Antes/Depois', 'Agenda VIP'],
    conversionBenefit: 'Slider interativo que quadruplica o desejo pelo tratamento estético.',
  },
  {
    id: 'beleza',
    name: 'Lash, Nails & Estética',
    badge: 'Alta Conversão',
    icon: Scissors,
    tagline: 'Design de olhar, alongamento em fibra e estética de luxo.',
    description: 'Elimine o "qual o valor?" no direct do Instagram. Apresente seu menu de serviços com fotos reais, cuidados pós-procedimento e link direto para a agenda.',
    sampleName: 'Studio Íris',
    sampleSlug: 'studio-iris',
    samplePhoto: 'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?q=80&w=900&auto=format&fit=crop',
    samplePalette: 'Rosa Champagne & Dourado',
    subpagesList: ['Menu de Técnicas', 'Galeria de Olhares', 'Reserva de Horário'],
    conversionBenefit: 'Fim das dúvidas no WhatsApp com cardápio visual e política de agendamento.',
  },
  {
    id: 'direito',
    name: 'Advocacia & Consultoria',
    badge: 'OAB em Destaque',
    icon: Scale,
    tagline: 'Elegância sóbria para escritórios de alta complexidade.',
    description: 'Estrutura refinada com paleta Noir e tipografia serifada. Triagem rápida para atendimento de urgência ou análise de caso empresarial diretamente com o sócio.',
    sampleName: 'Dra. Carolina Freitas',
    sampleSlug: 'carolina-freitas',
    samplePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop',
    samplePalette: 'Bordeaux Imperial & Dourado',
    subpagesList: ['Áreas de Atuação', 'Artigos & Pareceres', 'Consulta Jurídica'],
    conversionBenefit: 'Posicionamento premium que justifica honorários de alto padrão.',
  },
  {
    id: 'imoveis',
    name: 'Imóveis & Corretores de Luxo',
    badge: 'CRECI Oficial',
    icon: Building2,
    tagline: 'Portfólio imobiliário selecionado para clientes de alto padrão.',
    description: 'Catálogo de mansões, coberturas e lançamentos com ficha técnica, fotos de alta resolução e botão de agendamento de visita VIP com tour guiado.',
    sampleName: 'Mansões & Coberturas Jardins',
    sampleSlug: 'portfolio/portfolio-imoveis-luxo',
    samplePhoto: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=900&auto=format&fit=crop',
    samplePalette: 'Esmeralda & Ouro Champanhe',
    subpagesList: ['Catálogo de Imóveis', 'Lançamentos Exclusivos', 'Agendar Visita VIP'],
    conversionBenefit: 'Qualificação prévia do comprador antes da visita presencial.',
  },
  {
    id: 'arquitetura',
    name: 'Arquitetura & Interiores',
    badge: 'CAU Registrado',
    icon: Compass,
    tagline: 'Galeria editorial de projetos residenciais e comerciais.',
    description: 'Apresentação nobre do seu conceito arquitetônico, publicações na Casa Cor e revista, com questionário de briefing rápido para novos orçamentos.',
    sampleName: 'Studio Arq & Interiores',
    sampleSlug: 'portfolio/portfolio-arquitetura-design',
    samplePhoto: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop',
    samplePalette: 'Terracota Warm & Marfim',
    subpagesList: ['Portfólio de Obras', 'Etapas do Projeto', 'Briefing & Orçamento'],
    conversionBenefit: 'Clientes chegam preparados para investir em projetos autorais.',
  },
]

export default function NichesSection() {
  const [activeNiche, setActiveNiche] = useState<NicheItem>(niches[0])

  return (
    <section id="nichos" className="py-20 lg:py-32 bg-stone-900 text-white relative overflow-hidden">
      <div className="container-main relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs sm:text-sm font-semibold mb-4 border border-amber-500/20">
            <Sparkles className="w-4 h-4 text-amber-400" />
            NICHOS DE ALTA PERFORMANCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Projetado sob medida para a sua especialidade
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-sans">
            Cada profissão possui dinâmicas de conversão únicas. O BioVip entrega estruturas validadas para gerar autoridade no primeiro contato.
          </p>
        </div>

        {/* Niche Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none justify-start lg:justify-center">
          {niches.map((niche) => {
            const Icon = niche.icon
            const isActive = activeNiche.id === niche.id
            return (
              <button
                key={niche.id}
                onClick={() => setActiveNiche(niche)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-medium transition-all whitespace-nowrap border cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-[#151921] text-stone-400 hover:text-white border-stone-800 hover:border-stone-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
                {niche.name}
              </button>
            )
          })}
        </div>

        {/* Active Niche Detailed Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#151921] border border-stone-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {activeNiche.badge}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {activeNiche.tagline}
            </h3>

            <p className="text-stone-300 text-base leading-relaxed font-sans">
              {activeNiche.description}
            </p>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Páginas Adicionais Pro Inclusas:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeNiche.subpagesList.map((page) => (
                  <div
                    key={page}
                    className="flex items-center gap-2 p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{page}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span><strong>Impacto comercial:</strong> {activeNiche.conversionBenefit}</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/starter"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 transition"
              >
                Criar BioVip para {activeNiche.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${activeNiche.sampleSlug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-stone-700 text-stone-300 font-semibold hover:border-amber-400 hover:text-white transition"
              >
                <Eye className="w-4 h-4" />
                Ver Demonstração ao Vivo
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs aspect-[9/16] rounded-3xl overflow-hidden border-4 border-stone-700 shadow-2xl bg-stone-950 group">
              <Image
                src={activeNiche.samplePhoto}
                alt={activeNiche.sampleName}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-mono font-bold border border-white/10">
                  {activeNiche.badge}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-left space-y-2">
                <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  Exemplo de Modelo
                </div>
                <div className="font-serif text-xl font-bold text-white">
                  {activeNiche.sampleName}
                </div>
                <div className="text-xs text-stone-300">
                  Paleta: {activeNiche.samplePalette}
                </div>
                <Link
                  href={`/${activeNiche.sampleSlug}`}
                  className="mt-3 block text-center py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-bold border border-amber-500/30 transition"
                >
                  Abrir Modelo no Celular →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


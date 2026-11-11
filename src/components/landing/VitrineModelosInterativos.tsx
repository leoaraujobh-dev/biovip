'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Scissors, Stethoscope, ArrowUpRight, CheckCircle2, Star, ShieldCheck, Clock, ExternalLink } from 'lucide-react'

interface ModelNiche {
  id: 'lash' | 'barbearia' | 'clinica'
  tabLabel: string
  icon: any
  name: string
  role: string
  badge: string
  rating: string
  reviews: string
  slug: string
  avatar: string
  coverImage: string
  accentColor: string
  services: {
    title: string
    time: string
    price: string
    popular?: boolean
    image: string
  }[]
  features: string[]
  conversionRate: string
  avgTimeOnPage: string
}

const NICHES: ModelNiche[] = [
  {
    id: 'lash',
    tabLabel: 'Lash & Nail Studio',
    icon: Sparkles,
    name: 'Studio Larrayne Ramos',
    role: 'Especialista em Extensão de Cílios & Nail Design',
    badge: 'BELEZA & ESTÉTICA VIP',
    rating: '5.0',
    reviews: '428 avaliações',
    slug: 'studio-larrayne-ramos',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    accentColor: '#E2B857',
    services: [
      {
        title: 'Extensão de Cílios Fio a Fio',
        time: '1h 45m',
        price: 'R$ 160',
        popular: true,
        image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Volume Russo Imperial',
        time: '2h 00m',
        price: 'R$ 190',
        popular: true,
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Alongamento em Gel Moldado',
        time: '2h 15m',
        price: 'R$ 180',
        image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Lash Lifting & Nutrição VIP',
        time: '1h 10m',
        price: 'R$ 130',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&auto=format&fit=crop&q=80',
      },
    ],
    features: [
      'Catálogo visual com tempo e valor por procedimento',
      'Triagem anti-curiosos: cliente chega pronto para pagar',
      'Galeria de transformações Antes & Depois com zoom',
      'Botão de agendamento prioritário direto no WhatsApp',
    ],
    conversionRate: '38.4%',
    avgTimeOnPage: '2m 45s',
  },
  {
    id: 'barbearia',
    tabLabel: 'Barbearia VIP',
    icon: Scissors,
    name: 'Dom Pedro Barbearia',
    role: 'Cortes Clássicos, Barboterapia & Visagismo Masculino',
    badge: 'BARBER CLUB DE LUXO',
    rating: '4.9',
    reviews: '562 avaliações',
    slug: 'dom-pedro-barbearia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
    accentColor: '#E2B857',
    services: [
      {
        title: 'Combo Corte Degradê + Barba Terapia',
        time: '1h 15m',
        price: 'R$ 95',
        popular: true,
        image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Corte Visagista & Finalização Premium',
        time: '45m',
        price: 'R$ 65',
        image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Barboterapia com Toalha Quente & Ozônio',
        time: '40m',
        price: 'R$ 55',
        image: 'https://images.unsplash.com/photo-1517832606589-715757962eb8?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Camuflagem de Barba & Fios Brancos',
        time: '30m',
        price: 'R$ 60',
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&auto=format&fit=crop&q=80',
      },
    ],
    features: [
      'Agendamento rápido sem cadastro chato ou senhas',
      'Rotas automáticas no Waze, Google Maps e Uber',
      'Cardápio de bebidas e cortes VIP integrados',
      'Apresentação impecável para elevar o ticket médio',
    ],
    conversionRate: '42.1%',
    avgTimeOnPage: '1m 58s',
  },
  {
    id: 'clinica',
    tabLabel: 'Clínica & Estética',
    icon: Stethoscope,
    name: 'Dra. Ana Freire',
    role: 'Odontologia Estética & Harmonização Facial Avançada',
    badge: 'CLÍNICA DE ALTO PADRÃO',
    rating: '5.0',
    reviews: '310 pacientes',
    slug: 'dra-ana-freire',
    avatar: 'https://images.unsplash.com/photo-1594824813583-39d73cb292a8?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
    accentColor: '#E2B857',
    services: [
      {
        title: 'Preenchimento Labial Russo & Contorno',
        time: '1h 00m',
        price: 'R$ 1.200',
        popular: true,
        image: 'https://images.unsplash.com/photo-1512290900672-1f4967347a46?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Toxina Botulínica (Botox Full Face)',
        time: '45m',
        price: 'R$ 950',
        popular: true,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Bioestimulador de Colágeno Sculptra',
        time: '1h 15m',
        price: 'R$ 1.650',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&auto=format&fit=crop&q=80',
      },
      {
        title: 'Lentes de Contato em Resina Composta',
        time: '2h 30m',
        price: 'R$ 2.400',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=200&auto=format&fit=crop&q=80',
      },
    ],
    features: [
      '3 Telas completas: Tratamentos, Antes/Depois e Agenda',
      'Autoridade médica com registro profissional e CRM/CRO',
      'Filtro de pacientes qualificados de alto poder aquisitivo',
      'Transmissão de extrema sofisticação e segurança clínica',
    ],
    conversionRate: '36.7%',
    avgTimeOnPage: '3m 12s',
  },
]

export default function VitrineModelosInterativos() {
  const [activeTab, setActiveTab] = useState<'lash' | 'barbearia' | 'clinica'>('lash')
  const currentNiche = NICHES.find((n) => n.id === activeTab) || NICHES[0]

  return (
    <section id="modelos" className="relative py-20 lg:py-28 bg-[#09090B] overflow-hidden border-t border-zinc-800/80">
      <div id="exemplos" className="absolute -top-20" />
      {/* Luz ambiente dourada de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E2B857]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Demonstração ao Vivo
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-zinc-100 font-normal tracking-tight leading-tight mb-4">
            Escolha o Estilo Ideal para o <span className="text-[#E2B857] italic">Seu Negócio</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
            Toque para navegar no modelo real exatamente como sua cliente verá no celular.
          </p>

          {/* Abas comutáveis com 1 toque */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-8">
            {NICHES.map((niche) => {
              const Icon = niche.icon
              const isActive = activeTab === niche.id
              return (
                <button
                  key={niche.id}
                  onClick={() => setActiveTab(niche.id)}
                  className={`px-4 sm:px-6 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#E2B857] text-stone-950 font-bold shadow-[0_0_25px_rgba(226,184,87,0.35)] scale-105'
                      : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-[#E2B857]'}`} />
                  <span>{niche.tabLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Grade: Smartphone Interativo (Centro) + Painel de Benefícios */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LADO ESQUERDO / INFO (5 colunas) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center reveal-on-scroll delay-100">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2B857] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E2B857]" />
              {currentNiche.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal mb-3">
              {currentNiche.name}
            </h3>

            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              {currentNiche.role}
            </p>

            {/* Checklist de Recursos do Nicho */}
            <div className="space-y-3 mb-8">
              {currentNiche.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#E2B857] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-300 leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            {/* Métricas Reais do Modelo */}
            <div className="grid grid-cols-2 gap-3 mb-8 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">Taxa de Conversão</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">{currentNiche.conversionRate}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">Tempo Médio na Bio</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#E2B857]">{currentNiche.avgTimeOnPage}</span>
              </div>
            </div>

            {/* Botões de Ação para o Nicho */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/5531991390202?text=${encodeURIComponent(`Olá! Gostei muito do modelo ${currentNiche.name} (${currentNiche.tabLabel}) e quero meu BioVip pronto em 24h.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#22C55E] hover:bg-[#1eb054] text-white transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Quero Este Modelo Pronto em 24h</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <Link
                href={`/${currentNiche.slug}`}
                target="_blank"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#E2B857]/50 bg-white/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                <span>Testar ao Vivo</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E2B857]" />
              </Link>
            </div>
          </div>

          {/* LADO DIREITO / SMARTPHONE INTERATIVO (7 colunas) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center reveal-scale delay-200">
            {/* Mockup iPhone Dark Titanium com Borda Dourada */}
            <div className="relative w-[300px] sm:w-[340px] md:w-[360px] aspect-[9/19] rounded-[48px] p-3 bg-[#18181D] border-2 border-[#E2B857]/40 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(226,184,87,0.18)] overflow-hidden">
              
              {/* Tela do Celular */}
              <div className="w-full h-full rounded-[38px] bg-[#09090B] overflow-y-auto scrollbar-none flex flex-col text-zinc-100 p-4 relative">
                
                {/* Dynamic Island */}
                <div className="w-24 h-4 bg-zinc-900 rounded-full mx-auto mb-3 shrink-0 flex items-center justify-end px-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>

                {/* Topo do BioSite: Foto + Nome + Tag */}
                <div className="text-center mb-4 shrink-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full p-0.5 bg-gradient-to-tr from-[#E2B857] to-[#f3d489] mb-2.5 shadow-md">
                    <img
                      src={currentNiche.avatar}
                      alt={currentNiche.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#09090B] flex items-center justify-center text-[9px] text-white font-bold">
                      ✓
                    </div>
                  </div>

                  <h4 className="font-serif font-bold text-sm sm:text-base text-zinc-100 leading-tight">
                    {currentNiche.name}
                  </h4>
                  <p className="text-[10px] text-[#E2B857] font-sans mt-0.5 font-medium">
                    {currentNiche.role}
                  </p>

                  <div className="flex items-center justify-center gap-1 text-[9px] text-zinc-400 mt-1">
                    <Star className="w-3 h-3 fill-[#E2B857] text-[#E2B857]" />
                    <span className="font-bold text-zinc-200">{currentNiche.rating}</span>
                    <span>• {currentNiche.reviews}</span>
                  </div>
                </div>

                {/* Catálogo de Procedimentos com Preço Visível */}
                <div className="space-y-2 mb-4">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 flex items-center justify-between px-1">
                    <span>Catálogo de Procedimentos</span>
                    <span className="text-[#E2B857] font-bold">Tabela VIP</span>
                  </div>

                  {currentNiche.services.map((srv, i) => (
                    <div
                      key={i}
                      className="p-2 sm:p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-[#E2B857]/40 transition flex items-center gap-2.5"
                    >
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-zinc-800"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <p className="text-[11px] font-medium text-zinc-200 truncate">{srv.title}</p>
                          {srv.popular && (
                            <span className="text-[7.5px] px-1 py-0.2 rounded bg-[#E2B857]/20 text-[#E2B857] font-bold font-mono shrink-0">
                              TOP
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] text-zinc-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-2.5 h-2.5" /> {srv.time}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold font-mono text-[#E2B857] block">{srv.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão de Agendamento Verde no Fundo do Celular */}
                <div className="mt-auto pt-2 shrink-0">
                  <a
                    href={`https://wa.me/5531991390202?text=${encodeURIComponent(`Olá! Quero agendar um horário no modelo ${currentNiche.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#22C55E] hover:bg-[#1eb054] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(34,197,94,0.4)] transition"
                  >
                    <span>Agendar Horário no WhatsApp</span>
                  </a>
                  <p className="text-[8px] text-center text-zinc-500 mt-1.5">
                    ✦ Resposta rápida em minutos pelo WhatsApp
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}


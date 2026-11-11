'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Eye,
  Pause,
  Play
} from 'lucide-react'

export interface HeroRealBioSite {
  id: string
  slug: string
  name: string
  label: string
  niche: string
  badge: string
}

const heroPreviews: HeroRealBioSite[] = [
  {
    id: 'ana',
    slug: 'dra-ana-freire',
    name: 'Dra. Ana Freire',
    label: 'Odonto VIP',
    niche: 'Odontologia Estética & Reabilitação Oral',
    badge: 'CRO-PE 22.675'
  },
  {
    id: 'dompedro',
    slug: 'dom-pedro-barbearia',
    name: 'Dom Pedro',
    label: 'Barbearia Nobre',
    niche: 'Barbearia Tradicional & Visagismo',
    badge: 'MEMBRO VIP ABRAM'
  },
  {
    id: 'helena',
    slug: 'studio-helena-beaute',
    name: 'Helena Beauté',
    label: 'Lash & Estética',
    niche: 'Lash Designer & Alta Estética Facial',
    badge: 'MASTER INTERNACIONAL'
  },
  {
    id: 'camila',
    slug: 'dra-camila-vasconcelos',
    name: 'Dra. Camila',
    label: 'Dermatologia',
    niche: 'Dermatologia & Alta Estética Facial',
    badge: 'CRM 142.890-SP'
  }
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)

  const selectedPreview = heroPreviews[currentIndex]

  // Rotação Automática a cada 3 segundos
  useEffect(() => {
    if (isHovered || isManuallyPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroPreviews.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isHovered, isManuallyPaused])

  const handleSelectPreview = (idx: number) => {
    setCurrentIndex(idx)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 lg:pt-32 pb-20 overflow-hidden bg-white">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 -z-10" />

      <div className="container-main relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Social Proof */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs sm:text-sm font-semibold border border-primary-200/60 shadow-xs mb-2">
              <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
              <span>MICROSITES DE LUXO PRONTOS EM 24H</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-900 leading-[1.2] tracking-tight mb-5" style={{ lineHeight: '1.2' }}>
              O Fim do Link Amador: Microsites de Alta Conversão que Filtram Curiosos e Lotam sua Agenda.
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-dark-600 max-w-2xl font-sans leading-relaxed mb-4">
              Substitua árvores de links genéricas por uma vitrine de luxo com catálogo de serviços, preços, portfólio de antes e depois e agendamento direto.
            </p>

            {/* Destaque de Comodidade & Autonomia */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-left max-w-2xl space-y-2">
              <p className="text-xs sm:text-sm text-amber-950 font-semibold leading-relaxed">
                ✨ <strong>Zero trabalho para você:</strong> Você só envia suas fotos e serviços pelo WhatsApp. Nós entregamos seu microsite 100% pronto e configurado em até 24 horas.
              </p>
              <p className="text-[11px] sm:text-xs text-amber-900/80 leading-relaxed font-sans">
                🔒 <strong>Autonomia total pós-entrega:</strong> você recebe acesso ao nosso editor exclusivo para alterar preços, horários ou fotos sempre que quiser, sem depender de ninguém.
              </p>
            </div>

            {/* Micro Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-dark-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Retrato com fusão de estúdio orgânica</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-dark-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>3 Páginas Pro (Antes & Depois, Agenda e Tabela)</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-dark-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Meta Pixel & TikTok Pixel nativos no WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-dark-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Display de Balcão em Alta Resolução incluso</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="https://wa.me/5531991390202?text=Ol%C3%A1!%20Quero%20meu%20BioSite%20pronto%20em%2024h."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 text-base px-8 py-4 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 w-full sm:w-auto font-bold cursor-pointer"
              >
                Quero Meu Microsite Pronto em 24h
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="#planos"
                className="btn-secondary text-base px-7 py-4 w-full sm:w-auto border-stone-300 hover:border-dark-900 font-semibold text-center cursor-pointer"
              >
                Ver Planos &amp; Valores
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=200&auto=format&fit=crop"
                  alt="Dra Ana"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=200&auto=format&fit=crop"
                  alt="Dom Pedro"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?q=80&w=200&auto=format&fit=crop"
                  alt="Studio Helena"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                  alt="Dra Camila"
                />
              </div>
              <div className="text-left text-xs sm:text-sm text-dark-600">
                <div className="flex items-center text-amber-500 font-bold">
                  ★★★★★ <span className="text-dark-900 font-semibold ml-1.5">4.9 / 5</span>
                </div>
                <div>Mais de 1.400 marcas e profissionais ativos</div>
              </div>
            </div>
          </div>

          {/* Right Column: Demonstrador de BioSite Real com Troca a cada 3 Segundos */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Interactive Theme Switcher Pills com Barra de Progresso de 3s */}
            <div className="flex items-center gap-1.5 p-1.5 bg-stone-100/90 backdrop-blur-md rounded-2xl border border-stone-200/80 mb-4 max-w-full overflow-x-auto shadow-xs">
              {heroPreviews.map((preview, idx) => {
                const isActive = idx === currentIndex
                return (
                  <button
                    key={preview.id}
                    onClick={() => handleSelectPreview(idx)}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap overflow-hidden ${
                      isActive
                        ? 'bg-white text-dark-900 shadow-md border border-stone-200/90 font-bold scale-[1.02]'
                        : 'text-stone-500 hover:text-stone-900 hover:bg-white/50'
                    }`}
                  >
                    <span>{preview.label}</span>
                    {/* Barra de progresso animada de 3 segundos no botão ativo */}
                    {isActive && (
                      <div
                        key={`bar-${currentIndex}-${isHovered || isManuallyPaused ? 'paused' : 'running'}`}
                        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                        style={{
                          width: isHovered || isManuallyPaused ? '100%' : '100%',
                          animation: isHovered || isManuallyPaused ? 'none' : 'heroProgress 3000ms linear forwards'
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Container 3D com Perspectiva e Iluminação Suave de Fundo */}
            <div className="perspective-1000 perspective-container relative w-full flex items-center justify-center py-6">
              {/* Iluminação suave e respiração na iluminação de fundo */}
              <div className="absolute w-[340px] sm:w-[440px] h-[580px] rounded-full blur-3xl pointer-events-none bg-radial-luxury animate-[pulseGlow_6s_ease-in-out_infinite]" />

              {/* iPhone 16 Pro Frame com Animação 3D de Flutuação Suave */}
              <div
                className="relative w-[300px] sm:w-[325px] aspect-[9/19] rounded-[48px] p-2.5 bg-stone-900 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(226,184,87,0.18)] ring-1 ring-white/20 border-4 border-stone-800 transition-all duration-500 group phone-float-center animate-float-center hover:[animation-play-state:paused] z-20"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
              {/* Dynamic Island com indicador LIVE */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3 shadow-md pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[8.5px] font-mono font-bold text-amber-300 tracking-wider">
                  BIOVIP LIVE
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>

              {/* Floating Badge Left */}
              <div className="absolute -left-6 top-24 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-emerald-100 flex items-center gap-2 z-30 animate-bounce duration-1000 hidden sm:flex pointer-events-none">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  ⚡
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-emerald-800">Meta Pixel Ativo</div>
                  <div className="text-[9px] text-stone-500">Lead disparado</div>
                </div>
              </div>

              {/* Floating Badge Right */}
              <div className="absolute -right-6 bottom-28 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-amber-100 flex items-center gap-2 z-30 hidden sm:flex pointer-events-none">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                  📈
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-amber-800">+142% Cliques</div>
                  <div className="text-[9px] text-stone-500">WhatsApp direto</div>
                </div>
              </div>

              {/* Home Indicator Bar no rodapé */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-40 pointer-events-none" />

              {/* Tela Interna do iPhone com os BioSites Reais Pré-carregados */}
              <div className="w-full h-full rounded-[38px] overflow-hidden relative bg-[#07090E] shadow-inner">
                {heroPreviews.map((preview, idx) => {
                  const isActive = idx === currentIndex
                  return (
                    <div
                      key={preview.id}
                      className={`absolute inset-0 w-full h-full bg-[#07090E] transition-opacity duration-400 ease-out ${
                        isActive
                          ? 'opacity-100 pointer-events-auto z-20 visible'
                          : 'opacity-0 pointer-events-none z-0 invisible'
                      }`}
                      style={{
                        transitionProperty: 'opacity, visibility',
                        transitionDuration: '400ms'
                      }}
                    >
                      <iframe
                        src={`/${preview.slug}?preview=true`}
                        title={`BioSite Real de ${preview.name}`}
                        className="w-full h-full border-0 bg-[#07090E]"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        style={{
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          backgroundColor: '#07090E',
                          overflowY: 'auto',
                          WebkitOverflowScrolling: 'touch'
                        }}
                      />
                    </div>
                  )
                })}

                {/* Botão flutuante para abrir o BioSite em tela cheia */}
                <div className="absolute bottom-5 left-0 right-0 z-30 flex justify-center px-4 pointer-events-auto">
                  <Link
                    href={`/${selectedPreview.slug}`}
                    target="_blank"
                    className="px-3.5 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-mono font-bold flex items-center gap-1.5 shadow-xl hover:bg-stone-800 hover:scale-105 active:scale-95 transition"
                  >
                    <span>Ver {selectedPreview.name} em tela cheia</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </Link>
                </div>
              </div>
            </div>
            </div>

            {/* Legenda e Controles sob o iPhone */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-medium text-stone-700">
                  Exibindo biosite real no ar
                </span>
                <span className="text-stone-400">·</span>
                <span className="font-mono text-[11px] text-amber-600 font-semibold">
                  Trocando a cada 3s
                </span>
              </div>

              {/* Botão de Pausar / Continuar rotação */}
              <button
                type="button"
                onClick={() => setIsManuallyPaused(!isManuallyPaused)}
                className="px-2.5 py-1 rounded-lg border border-stone-200 hover:border-stone-300 text-[10.5px] font-mono text-stone-600 hover:text-dark-900 flex items-center gap-1 bg-stone-50 hover:bg-stone-100 transition cursor-pointer"
                title={isManuallyPaused ? 'Retomar rotação automática' : 'Pausar rotação para visualizar'}
              >
                {isManuallyPaused ? (
                  <>
                    <Play className="w-3 h-3 text-emerald-600" />
                    <span>Continuar</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3 text-stone-400" />
                    <span>Pausar</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Keyframe Animation para a barra de progresso de 3 segundos */}
      <style jsx global>{`
        @keyframes heroProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}

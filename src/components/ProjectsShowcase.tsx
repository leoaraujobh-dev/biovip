'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Smartphone,
  MousePointer2,
  TrendingUp,
  CheckCircle2
} from 'lucide-react'
import { projects } from '@/data/projects'

// Seleção curada dos melhores projetos para a vitrine interativa em iPhones
const SHOWCASE_SLUGS = [
  'dra-ana-freire',
  'studio-helena-beaute',
  'dom-pedro-barbearia',
  'valeria-nails-couture',
  'dra-camila-vasconcelos',
  'isabela-lash-studio',
  'bistro-le-noir',
  'aurea-joias'
]

type CategoryFilter = 'TODOS' | 'BELEZA' | 'BARBEARIA' | 'SAUDE' | 'LUXO'

interface FilterOption {
  id: CategoryFilter
  label: string
}

const FILTER_OPTIONS: FilterOption[] = [
  { id: 'TODOS', label: 'Todos os Modelos' },
  { id: 'BELEZA', label: 'Estética & Cílios' },
  { id: 'BARBEARIA', label: 'Barbearias' },
  { id: 'SAUDE', label: 'Saúde & Odonto' },
  { id: 'LUXO', label: 'Luxo & Gastronomia' }
]

export default function ProjectsShowcase() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('TODOS')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [activeScrollHintIndex, setActiveScrollHintIndex] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Lista dos projetos selecionados para a vitrine
  const showcaseProjects = useMemo(() => {
    return SHOWCASE_SLUGS.map(slug => projects.find(p => p.slug === slug)).filter(Boolean) as typeof projects
  }, [])

  // Filtragem por nicho
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'TODOS') return showcaseProjects

    return showcaseProjects.filter(project => {
      const cat = (project.category || '').toLowerCase()
      const role = (project.role || '').toLowerCase()

      if (activeFilter === 'BELEZA') {
        return cat.includes('salão') || cat.includes('nail') || cat.includes('lash') || role.includes('beleza')
      }
      if (activeFilter === 'BARBEARIA') {
        return cat.includes('barbearia') || role.includes('barbearia') || role.includes('masculino')
      }
      if (activeFilter === 'SAUDE') {
        return cat.includes('odonto') || cat.includes('dermato') || role.includes('oral') || role.includes('facial')
      }
      if (activeFilter === 'LUXO') {
        return cat.includes('joalheria') || cat.includes('gastronomia') || role.includes('luxo')
      }
      return true
    })
  }, [showcaseProjects, activeFilter])

  // Checagem de limites de scroll para habilitar/desabilitar setas
  const updateScrollButtons = () => {
    if (!carouselRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    updateScrollButtons()
    const current = carouselRef.current
    if (current) {
      current.addEventListener('scroll', updateScrollButtons, { passive: true })
      window.addEventListener('resize', updateScrollButtons)
      return () => {
        current.removeEventListener('scroll', updateScrollButtons)
        window.removeEventListener('resize', updateScrollButtons)
      }
    }
  }, [filteredProjects])

  // Auto-rotação contínua do carrossel (pausa automaticamente ao passar o mouse sobre qualquer modelo)
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      if (!carouselRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      const scrollAmount = window.innerWidth < 640 ? 310 : 360

      // Se alcançou o final do carrossel, volta suavemente para o início
      if (scrollLeft >= scrollWidth - clientWidth - 25) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }, 3800)

    return () => clearInterval(timer)
  }, [isPaused, filteredProjects])

  const scrollByDirection = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const scrollAmount = window.innerWidth < 640 ? 310 : 360
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  // Desativa links e botões internos do iframe para evitar navegações acidentais durante a rolagem
  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    try {
      const doc = e.currentTarget.contentDocument
      if (doc) {
        doc.addEventListener(
          'click',
          (ev) => {
            ev.preventDefault()
            ev.stopPropagation()
          },
          true
        )

        const style = doc.createElement('style')
        style.textContent = `
          * { -webkit-tap-highlight-color: transparent !important; }
          a, button, [role="button"], input, select, textarea {
            pointer-events: none !important;
            cursor: grab !important;
          }
          body {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            cursor: grab !important;
          }
          body:active {
            cursor: grabbing !important;
          }
          ::-webkit-scrollbar {
            display: none !important;
          }
        `
        doc.head.appendChild(style)
      }
    } catch {
      // Ignora erro em caso de bloqueio cross-origin
    }
  }

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-[#09090D] text-white border-t border-b border-stone-800/80 overflow-hidden relative">
      {/* Luz ambiente dourada de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#E2B857]/10 to-transparent blur-[120px] pointer-events-none -z-0" />

      <div className="container-main relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E2B857]/10 text-[#E2B857] text-xs font-semibold mb-4 border border-[#E2B857]/20 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              VITRINE DE INSPIRAÇÃO
            </span>
            <h2 className="section-title mb-4 font-serif text-white leading-[1.2] tracking-tight" style={{ lineHeight: '1.2' }}>
              Veja como nossos clientes elevaram o nível da presença digital no Instagram.
            </h2>
            <p className="section-subtitle max-w-2xl text-stone-400 font-sans leading-relaxed text-sm sm:text-base">
              De estúdios de cílios e barbearias modernas a clínicas médicas: cada BioVip carrega a identidade única de quem está por trás da marca.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 self-start lg:self-auto shrink-0">
            {/* Status do Giro Automático + Controles de Navegação do Carrossel */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 border border-stone-800 text-[11px] font-mono text-stone-300">
                <span className={`w-2 h-2 rounded-full transition-colors ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
                <span>{isPaused ? 'Pausado no modelo' : 'Giro automático ativo'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollByDirection('left')}
                  disabled={!canScrollLeft}
                  aria-label="Projeto anterior"
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition ${
                    canScrollLeft
                      ? 'border-stone-700 bg-stone-900/90 text-stone-200 hover:border-[#E2B857] hover:text-[#E2B857] hover:scale-105 active:scale-95'
                      : 'border-stone-800 bg-stone-900/40 text-stone-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByDirection('right')}
                  disabled={!canScrollRight}
                  aria-label="Próximo projeto"
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition ${
                    canScrollRight
                      ? 'border-stone-700 bg-stone-900/90 text-stone-200 hover:border-[#E2B857] hover:text-[#E2B857] hover:scale-105 active:scale-95'
                      : 'border-stone-800 bg-stone-900/40 text-stone-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#E2B857] hover:text-amber-300 transition-colors py-2 px-3 rounded-lg hover:bg-stone-900/60"
            >
              Ver todos os projetos
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Barra de Filtros por Nicho */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-[#E2B857] text-stone-950 shadow-lg shadow-[#E2B857]/20 font-bold scale-[1.02]'
                  : 'bg-stone-900/80 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* CARROSSEL HORIZONTAL DE IPHONES COM EXIBIÇÃO REAL */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsPaused(false), 2500)
          }}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((project, index) => (
            <article
              key={project.slug}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="snap-center shrink-0 w-[295px] sm:w-[325px] flex flex-col items-center group"
            >
              {/* MOCKUP IPHONE COM TELA REAL E ROLAGEM */}
              <div className="relative mx-auto w-[290px] sm:w-[315px] h-[580px] sm:h-[620px] rounded-[46px] p-[8px] sm:p-[9px] bg-gradient-to-b from-[#2a2a2e] via-[#121215] to-[#202024] border border-stone-700/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] ring-1 ring-black/80 transition-transform duration-300 group-hover:-translate-y-1">
                {/* Botões Físicos Laterais do iPhone (Volume e Power) */}
                <span className="absolute -left-[5px] top-24 w-[3px] h-8 bg-stone-600 rounded-l" aria-hidden="true" />
                <span className="absolute -left-[5px] top-36 w-[3px] h-11 bg-stone-600 rounded-l" aria-hidden="true" />
                <span className="absolute -right-[5px] top-28 w-[3px] h-12 bg-stone-600 rounded-r" aria-hidden="true" />

                {/* Ilha Dinâmica (Dynamic Island) no Topo */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 pointer-events-none flex items-center justify-between px-2.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#111] ring-1 ring-stone-800" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                </div>

                {/* Barra Inferior de Home do iPhone */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-30 pointer-events-none" />

                {/* Tela do iPhone com o BioSite Real em Iframe */}
                <div
                  className="relative w-full h-full rounded-[38px] overflow-hidden bg-black flex flex-col"
                  onMouseEnter={() => setActiveScrollHintIndex(index)}
                  onMouseLeave={() => setActiveScrollHintIndex(null)}
                >
                  <iframe
                    src={`/${project.slug}?preview=true`}
                    title={`BioVip de ${project.name}`}
                    className="w-full h-full border-0 bg-transparent"
                    loading="lazy"
                    onLoad={handleIframeLoad}
                    style={{
                      overflowY: 'auto',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  />

                  {/* Indicador Flutuante Sutil: Rolagem Ativa e Cliques Desativados */}
                  <div
                    className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-stone-800 text-[10px] font-mono text-stone-300 flex items-center gap-1.5 pointer-events-none shadow-lg transition-opacity duration-300 z-20 ${
                      activeScrollHintIndex === index ? 'opacity-90' : 'opacity-60'
                    }`}
                  >
                    <MousePointer2 className="w-3 h-3 text-[#E2B857]" />
                    <span>Role para navegar · Cliques inativos</span>
                  </div>
                </div>
              </div>

              {/* Informações do Cliente & Ação Direta Abaixo do iPhone */}
              <div className="mt-5 w-full text-center px-2 flex flex-col items-center">
                <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-[#E2B857] font-semibold mb-1">
                  {project.category}
                </span>

                <h3 className="font-serif text-lg font-bold text-white tracking-tight leading-snug line-clamp-1">
                  {project.name}
                </h3>

                <p className="text-xs text-stone-400 font-sans line-clamp-1 mb-3">
                  {project.role}
                </p>

                {/* Tags de Funcionalidades */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-4 max-w-[280px]">
                  {project.features.slice(0, 2).map((feat) => (
                    <span
                      key={feat}
                      className="px-2 py-0.5 text-[10px] rounded-full bg-stone-900 border border-stone-800 text-stone-300"
                    >
                      {feat}
                    </span>
                  ))}
                  {project.features.length > 2 && (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-stone-900 border border-stone-800 text-[#E2B857]">
                      +{project.features.length - 2} recursos
                    </span>
                  )}
                </div>

                {/* Link para Testar Modelo ao Vivo em Tela Cheia */}
                <a
                  href={`/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full max-w-[240px] py-2 px-3 rounded-xl bg-stone-900 hover:bg-[#E2B857] text-stone-300 hover:text-stone-950 border border-stone-800 hover:border-[#E2B857] text-xs font-semibold transition-all duration-200 group/btn"
                >
                  <span>Abrir Modelo ao Vivo</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* ESTATÍSTICAS DA VITRINE */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
          <div className="p-6 bg-stone-900/60 rounded-2xl border border-stone-800/80 shadow-md">
            <div className="text-3xl sm:text-4xl font-bold text-[#E2B857] font-serif mb-1.5">+13</div>
            <div className="text-stone-300 text-sm font-medium">Nichos Especializados Prontos</div>
            <p className="text-stone-500 text-xs mt-1">Estúdios de beleza, barbearias, clínicas e luxo</p>
          </div>
          <div className="p-6 bg-stone-900/60 rounded-2xl border border-stone-800/80 shadow-md">
            <div className="text-3xl sm:text-4xl font-bold text-emerald-400 font-serif mb-1.5">34.8%</div>
            <div className="text-stone-300 text-sm font-medium">Média de Conversão no WhatsApp</div>
            <p className="text-stone-500 text-xs mt-1">Com funil inteligente de triagem anti-curiosos</p>
          </div>
          <div className="p-6 bg-stone-900/60 rounded-2xl border border-stone-800/80 shadow-md">
            <div className="text-3xl sm:text-4xl font-bold text-white font-serif mb-1.5">100%</div>
            <div className="text-stone-300 text-sm font-medium">Meta Pixel &amp; Domínio Próprio</div>
            <p className="text-stone-500 text-xs mt-1">Compatível com campanhas de tráfego pago</p>
          </div>
        </div>
      </div>
    </section>
  )
}

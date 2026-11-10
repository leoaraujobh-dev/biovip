'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PhoneMockup from '@/components/PhoneMockup'
import { Project } from '@/data/projects'

interface PortfolioPageClientProps {
  projects: Project[]
  categories: string[]
}

export default function PortfolioPageClient({ projects: initialProjects, categories: initialCategories }: PortfolioPageClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('biovip_portfolio_projects')
      if (stored) {
        const parsed: Project[] = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  // Filtrar apenas projetos com inPortfolio !== false
  const activeProjects = projects.filter(p => p.inPortfolio !== false)
  const categories = [...new Set(activeProjects.map(p => p.category))].sort()

  const filteredProjects = selectedCategory === 'all'
    ? activeProjects
    : activeProjects.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans selection:bg-stone-200">
      <Header />

      <main id="main-content" className="pt-24 lg:pt-32 pb-24">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 lg:mb-20">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-stone-400 block mb-3">
              PORTFÓLIO EXCLUSIVO · VITRINE BIOVIP
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.1]">
              BioVip: Presença digital que eleva o valor percebido da sua marca.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-stone-600 font-serif leading-relaxed max-w-2xl">
              Cada projeto é desenhado sob medida — paleta, tipografia editorial e hierarquia pensadas para transformar seguidores em clientes no WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/starter"
                className="px-7 py-3.5 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                Criar Meu BioVip <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/planos"
                className="px-6 py-3.5 rounded-full border border-stone-300 text-stone-700 hover:text-stone-900 hover:border-stone-900 text-xs font-medium uppercase tracking-wider transition-colors"
              >
                Ver Planos & Valores
              </Link>
            </div>
          </div>

          {/* FILTROS POR CATEGORIA MINIMALISTAS */}
          <div className="mt-14 pt-8 border-t border-stone-200/80 flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-200/60 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              Todos ({projects.length})
            </button>
            {categories.map((cat) => {
              const count = projects.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-200/60 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {cat} ({count})
                </button>
              )
            })}
          </div>
        </section>

        {/* GRADE DE CASES EM IPHONE MOCKUP (4 COLUNAS EXATAS) */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 sm:gap-x-8 lg:gap-x-10 lg:gap-y-20">
            {filteredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group block"
              >
                {/* CONTAINER DO IPHONE COM HOVER FLOAT E BRIGHTNESS */}
                <div className="flex justify-center transition-transform duration-[450ms] ease-[cubic-bezier(.22,.7,.25,1)] group-hover:-translate-y-2">
                  <div className="w-full max-w-[240px] transition-[filter] duration-[450ms] group-hover:brightness-105">
                    <PhoneMockup
                      project={project}
                      image={project.image}
                      alt={`${project.name} - ${project.role}`}
                      size="sm"
                    />
                  </div>
                </div>

                {/* INFORMAÇÕES DE DESIGN DO CASE */}
                <div className="mt-6 text-center sm:text-left">
                  <p className="text-[14px] font-semibold text-stone-900 group-hover:text-stone-950 transition-colors">
                    {project.name}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-stone-500 font-mono">
                    {project.role}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-stone-400 group-hover:text-stone-900 transition-colors duration-300 font-mono">
                    Ver o case <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-stone-100/60 rounded-3xl border border-stone-200">
              <p className="text-stone-500 font-serif text-lg">Nenhum projeto encontrado nesta categoria.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-5 py-2 rounded-full bg-stone-900 text-white text-xs font-medium cursor-pointer"
              >
                Ver todos os projetos
              </button>
            </div>
          )}
        </section>

        {/* BANNER CTA INFERIOR EDITORIAL */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-28">
          <div className="p-8 sm:p-14 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300/80 block mb-2">
                TRANSFORME SUA BIO
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal tracking-tight">
                Gostou do padrão visual? Monte a versão do seu nicho agora mesmo.
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Você pode simular e personalizar tipografia, cores, botões e imagens no nosso construtor interativo em menos de 3 minutos.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/starter"
                className="px-7 py-4 rounded-full bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Montar Meu Bio Site
              </Link>
              <Link
                href="/planos"
                className="px-6 py-4 rounded-full border border-stone-700 text-stone-300 hover:text-white hover:border-white text-xs font-medium uppercase tracking-wider text-center transition-colors"
              >
                Comparar Planos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

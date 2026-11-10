'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle, Star, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PhoneMockup from '@/components/PhoneMockup'
import { Project, projects } from '@/data/projects'

interface ProjectDetailClientProps {
  project: Project
}

export default function ProjectDetailClient({ project: initialProject }: ProjectDetailClientProps) {
  const [project, setProject] = useState<Project>(initialProject)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('biovip_portfolio_projects')
      if (stored) {
        const parsed: Project[] = JSON.parse(stored)
        const found = parsed.find(p => p.slug === initialProject.slug)
        if (found) {
          setProject(found)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [initialProject.slug])

  // Encontrar o próximo projeto para navegação contínua
  const currentIndex = projects.findIndex(p => p.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans selection:bg-stone-200">
      <Header />

      <main id="main-content" className="pt-24 lg:pt-32 pb-24">
        {/* CASE HERO */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 lg:mb-24">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors mb-10 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            NOSSOS PROJETOS
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* TEXTO EDITORIAL DO CASE (ESQUERDA) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-stone-400 block">
                {project.category} · {project.role}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.1]">
                {project.name}
              </h1>

              <p className="text-xl sm:text-2xl text-stone-700 font-serif leading-relaxed">
                {project.description}
              </p>

              {/* FEATURES E DIFERENCIAIS */}
              <div className="pt-4 flex flex-wrap gap-2.5">
                {project.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3.5 py-1.5 rounded-full bg-stone-200/60 border border-stone-300/60 text-xs font-medium text-stone-700 flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-stone-600" />
                    {feature}
                  </span>
                ))}
              </div>

              {/* AÇÕES DE CONVERSÃO */}
              <div className="pt-6 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${project.slug}`}
                  target="_blank"
                  className="px-7 py-3.5 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Abrir Bio Site ao Vivo
                </Link>
                <Link
                  href="/starter"
                  className="px-6 py-3.5 rounded-full border border-stone-300 text-stone-800 hover:border-stone-900 text-xs font-medium uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Quero um Bio Site Assim
                </Link>
              </div>

              <p className="text-xs text-stone-400 font-mono tracking-wide pt-2">
                Projeto com design desenhado do zero — padrão entregue nos planos Pro e Premium.
              </p>
            </div>

            {/* MOCKUP DO IPHONE PRO (DIREITA) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="hover:scale-[1.02] transition-transform duration-500 ease-out">
                <PhoneMockup
                  project={project}
                  image={project.image}
                  alt={`${project.name} - ${project.role}`}
                  size="md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO "COMO RESOLVEMOS" */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 border-t border-stone-200/80">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-400 block mb-2">
              ESTRATÉGIA & DIREÇÃO DE ARTE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-6">
              Como resolvemos a presença digital de {project.name}
            </h2>
            <div className="space-y-4 text-stone-600 font-serif text-base sm:text-lg leading-relaxed">
              <p>
                A capa abre com o retrato profissional em fusão orgânica com o fundo — transmitindo sofisticação imediata sem ruído visual.
              </p>
              <p>
                O selo de credibilidade profissional fica no topo, gerando autoridade instantânea nos primeiros 3 segundos. Abaixo, organizamos caminhos claros e objetivos: agendamento prioritário no WhatsApp, visualização do catálogo e geolocalização com 1 clique para Google Maps e Waze.
              </p>
            </div>
          </div>
        </section>

        {/* PRÓXIMO PROJETO */}
        {nextProject && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 border-t border-stone-200">
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="group flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block mb-1">
                  PRÓXIMO CASE
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {nextProject.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-stone-500 font-mono mt-0.5">
                  {nextProject.role}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-stone-900 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

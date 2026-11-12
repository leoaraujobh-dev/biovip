'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Sparkles, Scissors, Stethoscope, ArrowUpRight, CheckCircle2, Star, ShieldCheck, Clock, ExternalLink, Radio, Eye } from 'lucide-react'
import { useLivePortfolio } from '@/utils/portfolioSync'
import { projects as defaultProjects, Project } from '@/data/projects'
import LiveBioSitePhone from './LiveBioSitePhone'

export default function VitrineModelosInterativos() {
  const { activeProjects } = useLivePortfolio()

  // Lista de projetos ativos no portfólio do admin
  const portfolioList = useMemo(() => {
    return activeProjects.length > 0 ? activeProjects : defaultProjects.filter(p => p.inPortfolio !== false)
  }, [activeProjects])

  // Slug ativo selecionado nas abas
  const [selectedSlug, setSelectedSlug] = useState<string>('')

  // Projeto atualmente selecionado (ou o primeiro da lista)
  const currentProject: Project = useMemo(() => {
    const found = portfolioList.find(p => p.slug === selectedSlug)
    return found || portfolioList[0] || defaultProjects[0]
  }, [portfolioList, selectedSlug])

  return (
    <section id="modelos" className="relative py-20 lg:py-28 bg-[#09090B] overflow-hidden border-t border-zinc-800/80">
      <div id="exemplos" className="absolute -top-20" />
      
      {/* Luz ambiente dourada de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E2B857]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] text-xs font-semibold tracking-wider uppercase mb-4">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>BioSites ao Vivo em Tempo Real</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-zinc-100 font-normal tracking-tight leading-tight mb-4">
            Escolha o Estilo Ideal para o <span className="text-[#E2B857] italic">Seu Negócio</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
            Toque nas abas abaixo para carregar e navegar no BioSite real exatamente como sua cliente verá no celular.
          </p>

          {/* Abas Dinâmicas sincronizadas com o Portfólio do Admin */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-8 max-w-4xl mx-auto">
            {portfolioList.slice(0, 6).map((proj) => {
              const isActive = currentProject.slug === proj.slug
              return (
                <button
                  key={proj.slug}
                  onClick={() => setSelectedSlug(proj.slug)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#E2B857] text-stone-950 font-bold shadow-[0_0_25px_rgba(226,184,87,0.35)] scale-105'
                      : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-stone-950' : 'bg-emerald-400'}`} />
                  <span className="truncate max-w-[150px] sm:max-w-[190px]">{proj.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Grade: Painel de Informações (Esquerda) + Celular com BioSite em Tempo Real (Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LADO ESQUERDO / INFO DO MODELO ATIVO (5 colunas) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center reveal-on-scroll delay-100">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2B857] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentProject.registrationCode || currentProject.category}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal mb-2">
              {currentProject.name}
            </h3>

            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              {currentProject.role}
            </p>

            {/* Diferenciais e Recursos do BioSite */}
            <div className="space-y-2.5 mb-8">
              {currentProject.features && currentProject.features.slice(0, 4).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#E2B857] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-300 leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            {/* Métricas Reais do Case */}
            <div className="grid grid-cols-2 gap-3 mb-8 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">Taxa de Conversão</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  {currentProject.stats?.conversion || '36.8%'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-mono block">Visualizações / Mês</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#E2B857]">
                  {currentProject.stats?.views || '14.2K'}
                </span>
              </div>
            </div>

            {/* Botões de Ação para o Modelo */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/5531991390202?text=${encodeURIComponent(`Olá! Gostei muito do BioSite de ${currentProject.name} e quero o meu pronto em 24h.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#22C55E] hover:bg-[#1eb054] text-white transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Quero Este Modelo Pronto em 24h</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <Link
                href={`/${currentProject.slug}`}
                target="_blank"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#E2B857]/50 bg-white/5 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                <span>Abrir em Tela Cheia</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E2B857]" />
              </Link>
            </div>
          </div>

          {/* LADO DIREITO / SMARTPHONE INTERATIVO EM TEMPO REAL (7 colunas) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center reveal-scale delay-200">
            <div className="w-[300px] sm:w-[340px] md:w-[360px]">
              <LiveBioSitePhone
                project={currentProject}
                isPrimary={true}
                showBadge={true}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

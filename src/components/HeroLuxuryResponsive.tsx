'use client'

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Sparkles, Radio } from 'lucide-react';
import { useLivePortfolio } from '@/utils/portfolioSync';
import { projects as defaultProjects } from '@/data/projects';
import LiveBioSitePhone from './landing/LiveBioSitePhone';

export const HeroLuxuryResponsive = () => {
  const { activeProjects, isClientReady } = useLivePortfolio();

  // Seleciona os projetos ativos no portfólio do admin para os 3 celulares
  const { leftProject, centerProject, rightProject } = useMemo(() => {
    const list = activeProjects.length > 0 ? activeProjects : defaultProjects.filter(p => p.inPortfolio !== false);
    
    // Procura Lash / Cílios para o celular esquerdo
    const left = list.find(p => p.slug.includes('lash') || p.slug.includes('nails') || p.category.includes('Olhar')) || list[0] || defaultProjects[4];
    
    // Procura Barbearia para o celular central (ou segundo ativo)
    const center = list.find(p => p.slug.includes('barbearia') || p.slug.includes('barber') || p.role.includes('Barbearia')) || list[1] || defaultProjects[10];
    
    // Procura Clínica / Odonto / Saúde para o celular direito
    const right = list.find(p => (p.slug.includes('freire') || p.slug.includes('vasconcelos') || p.slug.includes('clinica')) && p.slug !== center.slug && p.slug !== left.slug) || list[2] || defaultProjects[0];

    return {
      leftProject: left,
      centerProject: center,
      rightProject: right,
    };
  }, [activeProjects]);

  return (
    <section className="relative min-h-[92vh] bg-[#09090B] bg-radial-luxury overflow-hidden flex items-center pt-20 pb-16 px-5 sm:px-8 lg:px-12">
      {/* Luz ambiente de fundo (Glow Dourado) */}
      <div className="absolute top-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2B857]/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none pulse-glow" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* ========================================================= */}
        {/* LADO TEXTO / CALL TO ACTION (Full width mobile, 5 cols lg) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 z-10 flex flex-col items-center lg:items-start text-center lg:text-left pt-4 lg:pt-0">
          
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] text-xs font-semibold tracking-wider uppercase mb-5">
            <span className="w-2 h-2 rounded-full bg-[#E2B857] animate-pulse" />
            Microsites de Luxo em 24h
          </div>

          {/* Título Principal H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif text-zinc-100 font-normal tracking-tight leading-[1.18] mb-5">
            Seu Link na Bio <br className="hidden sm:inline" />
            <span className="italic font-light text-[#E2B857]">Não Precisa</span> Ser Comum.
          </h1>

          {/* Subtítulo Curto e Direto */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-sans leading-relaxed mb-7 max-w-lg">
            Crie um microsite de alto padrão para o seu negócio de beleza em minutos, com catálogo visual e agendamento direto no WhatsApp. Nós entregamos pronto para você.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <a
              href="https://wa.me/5531991390202?text=Ol%C3%A1!%20Quero%20meu%20BioVip%20pronto%20em%2024h."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#22C55E] hover:bg-[#1eb054] text-white transition-all shadow-[0_0_25px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Criar Meu BioVip Pronto
            </a>

            <a
              href="#modelos"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#E2B857]/40 bg-white/5 backdrop-blur-sm transition-all text-center cursor-pointer"
            >
              Ver Modelos ao Vivo ➔
            </a>
          </div>

          {/* Prova Social Integrada com Badge de Tempo Real */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-8 pt-6 border-t border-zinc-800/80 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#09090B] object-cover" src={leftProject.photo || leftProject.image} alt={leftProject.name} />
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#09090B] object-cover" src={centerProject.photo || centerProject.image} alt={centerProject.name} />
                <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#09090B] object-cover" src={rightProject.photo || rightProject.image} alt={rightProject.name} />
              </div>
              <p className="text-xs text-zinc-400">
                <span className="text-[#E2B857] font-bold">★ 4.9</span> • {activeProjects.length} modelos ativos no portfólio
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 self-start sm:self-auto sm:ml-auto">
              <Radio className="w-2.5 h-2.5 animate-pulse" />
              <span>BioSites ao vivo em tempo real</span>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* LADO VISUAL 3D COM BIOSITES REAIS EM TEMPO REAL */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 relative h-[480px] sm:h-[540px] lg:h-[620px] w-full flex items-center justify-center perspective-1000 mt-2 lg:mt-0">
          
          {/* MOCKUP 1: BioSite Real 1 (Lash / Beleza) */}
          <div className="hidden lg:block absolute left-[3%] xl:left-[6%] top-[10%] w-[235px] xl:w-[250px] z-10">
            <LiveBioSitePhone
              project={leftProject}
              animationClass="phone-float-left"
              isPrimary={false}
            />
          </div>

          {/* MOCKUP 2 (CENTRAL): BioSite Real Central de Destaque */}
          <div className="relative lg:absolute lg:left-[31%] xl:left-[34%] lg:top-[2%] w-[240px] sm:w-[275px] xl:w-[290px] z-20">
            <LiveBioSitePhone
              project={centerProject}
              animationClass="phone-float-center"
              isPrimary={true}
            />
          </div>

          {/* MOCKUP 3: BioSite Real 3 (Clínica / Odonto) */}
          <div className="hidden lg:block absolute right-[3%] xl:right-[5%] top-[12%] w-[230px] xl:w-[245px] z-10">
            <LiveBioSitePhone
              project={rightProject}
              animationClass="phone-float-right"
              isPrimary={false}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroLuxuryResponsive;

'use client'

import React from 'react'
import { Sparkles, MessageSquare, Palette, Rocket, KeyRound, ArrowUpRight } from 'lucide-react'

export default function ComoFuncionaLuxury() {
  const steps = [
    {
      num: '01',
      icon: MessageSquare,
      title: 'Envie suas fotos e serviços pelo WhatsApp',
      desc: 'Nada de formulários chatos ou termos técnicos. Você envia suas fotos, valores e horários diretamente no WhatsApp para a nossa equipe.',
      tag: 'Sem Complicação',
    },
    {
      num: '02',
      icon: Palette,
      title: 'Nossa equipe estrutura seu design de luxo sob medida',
      desc: 'Nossos designers tratam suas imagens, organizam seu catálogo com valores fechados e criam um microsite editorial de alto padrão.',
      tag: 'Design Editorial',
    },
    {
      num: '03',
      icon: Rocket,
      title: 'Seu BioVip no ar e pronto para faturar em até 24 horas',
      desc: 'Entregamos seu link oficial pronto para colocar na bio do Instagram e começar a receber agendamentos qualificados no mesmo dia.',
      tag: 'Entrega Express',
    },
  ]

  const whatsappUrl =
    'https://wa.me/5531991390202?text=' +
    encodeURIComponent('Olá! Quero meu BioVip pronto em 24h.')

  return (
    <section id="como-funciona" className="relative py-20 lg:py-28 bg-[#09090B] overflow-hidden border-t border-zinc-800/80">
      {/* Luz ambiente dourada de fundo */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-[#E2B857]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-main relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Zero Esforço Técnico
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-zinc-100 font-normal tracking-tight leading-tight mb-4">
            Você Cuida das Suas Clientes. <br className="hidden sm:inline" />
            <span className="text-[#E2B857] italic">Nós Cuidamos</span> do Seu Site.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
            Esqueça plataformas difíceis, plugins ou configurações lentas. Nós entregamos 100% pronto para você.
          </p>
        </div>

        {/* 3 Passos Diretos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {steps.map((st, idx) => {
            const Icon = st.icon
            return (
              <div
                key={idx}
                className="relative rounded-3xl p-7 lg:p-8 bg-[#121217] border border-zinc-800 hover:border-[#E2B857]/50 transition-all duration-300 shadow-xl group flex flex-col justify-between"
              >
                {/* Linha decorativa no topo do card */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#E2B857]/30 to-transparent group-hover:via-[#E2B857] transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl lg:text-5xl font-serif font-light text-[#E2B857]/40 group-hover:text-[#E2B857] transition-colors">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#E2B857]/10 border border-[#E2B857]/30 flex items-center justify-center text-[#E2B857]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#E2B857] px-2.5 py-0.5 rounded bg-[#E2B857]/10 mb-3 inline-block">
                    {st.tag}
                  </span>

                  <h3 className="text-lg lg:text-xl font-serif text-white mb-3 leading-snug">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Passo {idx + 1} de 3</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Banner de Autonomia: Acesso Total ao Editor */}
        <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#14141c] via-[#161622] to-[#14141c] border border-[#E2B857]/30 shadow-[0_0_35px_rgba(226,184,87,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-xl bg-[#E2B857]/15 border border-[#E2B857]/40 flex items-center justify-center text-[#E2B857] shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-serif font-bold text-zinc-100 flex items-center gap-2 justify-center sm:justify-start">
                <span>Aviso de Autonomia Total Incluso</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                  Livre de Reféns
                </span>
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Você recebe login de acesso ao editor para alterar preços, fotos e horários quando quiser com 1 toque no celular, ou pode pedir para nossa equipe.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wide bg-[#22C55E] hover:bg-[#1eb054] text-white transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Pedir Meu BioVip</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  )
}


'use client'

import React, { useState } from 'react'
import { ChevronDown, Sparkles, MessageCircle, ArrowUpRight, HelpCircle } from 'lucide-react'

export default function FaqLuxury() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Preciso saber mexer em computador para ter meu BioVip?',
      answer:
        'Não! Nós entregamos tudo 100% configurado, testado e publicado para você. Você não precisa instalar programas nem mexer em códigos. Basta enviar suas fotos, dados e lista de serviços pelo WhatsApp que nossa equipe cuida de toda a criação.',
    },
    {
      question: 'Qual o prazo de entrega?',
      answer:
        'Em até 24 horas úteis após o envio dos seus materiais, seu BioVip já estará no ar com link ativo para você colocar na bio do seu Instagram e começar a receber agendamentos.',
    },
    {
      question: 'Consigo mudar preços depois?',
      answer:
        'Sim! Você tem total liberdade. Você recebe acesso exclusivo ao construtor visual para editar textos, valores e fotos a qualquer momento direto pelo seu celular. Além disso, se preferir, pode solicitar alterações diretamente para o nosso suporte.',
    },
    {
      question: 'Tem contrato de fidelidade?',
      answer:
        'Zero fidelidade. A mensalidade cobre sua hospedagem em nuvem ultra-rápida, certificado de segurança SSL e manutenção contínua. Você pode pausar ou cancelar quando quiser com 1 clique, sem multas ou burocracia.',
    },
  ]

  const whatsappUrl =
    'https://wa.me/5531991390202?text=' +
    encodeURIComponent('Olá! Quero meu BioVip pronto em 24h.')

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-[#09090B] overflow-hidden border-t border-zinc-800/80">
      {/* Luz ambiente de fundo */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#E2B857]/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="container-main relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] text-xs font-semibold tracking-wider uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Tire Suas Dúvidas
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-zinc-100 font-normal tracking-tight leading-tight mb-4">
            Perguntas Frequentes & <span className="text-[#E2B857] italic">Transparência</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
            Tudo o que você precisa saber antes de transformar seu link na bio em uma máquina de agendamentos.
          </p>
        </div>

        {/* Acordeão Escuro com 4 Perguntas */}
        <div className="max-w-3xl mx-auto space-y-3.5 mb-20">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-[#141418] border-[#E2B857]/50 shadow-[0_0_25px_rgba(226,184,87,0.1)]'
                    : 'bg-[#101014] border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-serif font-medium ${
                    isOpen ? 'text-[#E2B857]' : 'text-zinc-200'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#E2B857] text-stone-950 rotate-180' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ========================================================= */}
        {/* BANNER DE FECHAMENTO (CTA FINAL DARK LUXURY) */}
        {/* ========================================================= */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-[#14141a] via-[#101015] to-[#0d0d11] border border-[#E2B857]/40 shadow-[0_0_60px_rgba(226,184,87,0.15)] text-center overflow-hidden max-w-5xl mx-auto">
          
          {/* Luz interna no banner */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#E2B857]/15 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] text-xs font-semibold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Microsite de Luxo em 24h
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-normal leading-tight mb-4">
              Pare de Perder Clientes para <br className="hidden sm:inline" />
              <span className="text-[#E2B857] italic">Links Amadores</span> Hoje Mesmo.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed mb-8 max-w-lg mx-auto">
              Coloque um microsite digno da sua reputação na bio do Instagram. Entregamos pronto para você em menos de 24 horas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-9 py-4 rounded-xl font-semibold text-sm sm:text-base bg-[#22C55E] hover:bg-[#1eb054] text-white transition-all shadow-[0_0_30px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Quero Meu BioVip Pronto em 24h</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#modelos"
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-medium text-sm text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#E2B857]/40 bg-white/5 backdrop-blur-sm transition-all text-center cursor-pointer"
              >
                Ver Modelos ao Vivo ➔
              </a>
            </div>

            <p className="text-[11px] text-zinc-500 mt-5 font-mono">
              ✦ Atendimento direto pelo WhatsApp • Suporte humanizado • Sem complicação
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}


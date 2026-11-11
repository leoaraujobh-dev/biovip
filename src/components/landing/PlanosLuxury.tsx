'use client'

import React from 'react'
import { Check, Sparkles, ArrowUpRight, ShieldCheck, Zap, Crown } from 'lucide-react'

export default function PlanosLuxury() {
  const plans = [
    {
      name: 'Plano Básico',
      subtitle: 'Para profissionais que buscam presença profissional imediata',
      setupPrice: 'R$ 79,90',
      monthlyPrice: 'R$ 29,90',
      popular: false,
      badge: 'ENTRADA RÁPIDA',
      whatsappMessage: 'Olá! Gostaria de contratar o Plano Básico do BioVip (R$ 79,90 de entrada + R$ 29,90/mês).',
      buttonText: 'Contratar Plano Básico',
      features: [
        'Microsite BioVip de luxo com alta velocidade',
        '1 Página principal com catálogo de serviços',
        'Valores visíveis para filtrar curiosos',
        'Botão de agendamento direto no WhatsApp',
        'Hospedagem em nuvem de alta performance',
        'Suporte técnico via WhatsApp',
      ],
    },
    {
      name: 'Plano Pro',
      subtitle: 'O formato mais escolhido por salões de beleza, lash designers e clínicas',
      setupPrice: 'R$ 129,90',
      monthlyPrice: 'R$ 49,90',
      popular: true,
      badge: '✦ MAIS ESCOLHIDO',
      whatsappMessage: 'Olá! Quero garantir o Plano Pro do BioVip (R$ 129,90 de entrada + R$ 49,90/mês).',
      buttonText: 'Garantir Plano Pro no WhatsApp',
      features: [
        'Até 3 Páginas exclusivas (Início, Galeria Antes/Depois, Agenda VIP)',
        'Catálogo de procedimentos com fotos, tempos e valores',
        'Triagem anti-curiosos avançada (cliente chega pronto para pagar)',
        'Galeria de fotos em alta resolução com carrossel dinâmico',
        'Botões de rota com 1 clique (Waze, Google Maps e Uber)',
        'Acesso total ao Editor Visual para alterar preços no celular',
        'Selo Dourado de Profissional Verificado BioVip',
      ],
    },
    {
      name: 'Plano VIP',
      subtitle: 'Para clínicas consolidadas e marcas que exigem autoridade máxima',
      setupPrice: 'R$ 197,00',
      monthlyPrice: 'R$ 79,90',
      popular: false,
      badge: 'EXCLUSIVIDADE VIP',
      whatsappMessage: 'Olá! Desejo contratar o Plano VIP do BioVip com domínio próprio (R$ 197,00 de entrada + R$ 79,90/mês).',
      buttonText: 'Contratar Plano VIP',
      features: [
        'Tudo incluso no Plano Pro sem limites',
        'Domínio próprio personalizado configurado (ex: suamarca.com.br)',
        'Pixel do Meta (Instagram/Facebook) & Google Ads integrado',
        'Alterações ilimitadas prioritárias feitas pela nossa equipe',
        'Suporte concierge VIP dedicado diretamente no WhatsApp',
        'Otimização de SEO para busca no Google na sua cidade',
      ],
    },
  ]

  return (
    <section id="planos" className="relative py-20 lg:py-28 bg-[#09090B] overflow-hidden border-t border-zinc-800/80">
      {/* Luz ambiente suave */}
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#E2B857]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="container-main relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Investimento Transparente
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-zinc-100 font-normal tracking-tight leading-tight mb-4">
            Planos Sob Medida para o Seu <span className="text-[#E2B857] italic">Padrão de Qualidade</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
            Taxa única de criação e entrega em 24h + mensalidade acessível de hospedagem sem fidelidade.
          </p>
        </div>

        {/* Grade com os 3 Cards de Planos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => {
            const isPro = plan.popular
            const delayClass = idx === 0 ? 'delay-100' : idx === 1 ? 'delay-200' : 'delay-300'
            const whatsappUrl = `https://wa.me/5531991390202?text=${encodeURIComponent(plan.whatsappMessage)}`

            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 reveal-scale ${delayClass} ${
                  isPro
                    ? 'bg-[#141418] border-2 border-[#E2B857] shadow-[0_0_45px_rgba(226,184,87,0.22)] lg:-translate-y-3 z-10'
                    : 'bg-[#101015] border border-zinc-800/90 hover:border-zinc-700 shadow-xl'
                }`}
              >
                {/* Badge Destaque */}
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E2B857] text-stone-950 text-xs font-bold font-mono tracking-wider shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {!isPro && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 inline-block mb-3">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="text-2xl font-serif text-white font-normal mb-1.5 flex items-center gap-2">
                    {plan.name}
                    {isPro && <Crown className="w-5 h-5 text-[#E2B857]" />}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6 min-h-[36px]">
                    {plan.subtitle}
                  </p>

                  {/* Bloco de Preço */}
                  <div className="p-4 rounded-2xl bg-[#09090B] border border-zinc-800/80 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-zinc-400">Entrada única:</span>
                      <span className="text-xl font-bold font-mono text-[#E2B857] ml-1">{plan.setupPrice}</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1 pt-1.5 border-t border-zinc-800/60">
                      <span className="text-xs text-zinc-400">Hospedagem:</span>
                      <span className="text-2xl font-bold font-mono text-white ml-1">{plan.monthlyPrice}</span>
                      <span className="text-[11px] text-zinc-500">/mês</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 block mt-1.5 font-mono">
                      ✦ Cancele quando quiser • Zero fidelidade
                    </span>
                  </div>

                  {/* Lista de Recursos */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] uppercase font-mono tracking-wider text-zinc-400 font-semibold block">
                      O que está incluso:
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isPro ? 'bg-[#E2B857]/20 text-[#E2B857]' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className={`text-xs leading-snug ${isPro ? 'text-zinc-200 font-medium' : 'text-zinc-400'}`}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botão de Contratação Direta no WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 px-5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isPro
                      ? 'bg-[#22C55E] hover:bg-[#1eb054] text-white shadow-[0_0_25px_rgba(34,197,94,0.35)]'
                      : 'bg-white/10 hover:bg-white/15 text-zinc-200 hover:text-white border border-zinc-700'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )
          })}
        </div>

        {/* Rodapé da Seção com Garantia */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-[#E2B857]" />
          <span>Entrega garantida em até 24 horas úteis • Pagamento via Pix ou Cartão</span>
        </div>

      </div>
    </section>
  )
}


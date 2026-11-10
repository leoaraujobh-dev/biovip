'use client'

import { Check, X, Sparkles, ShieldCheck, Clock, RefreshCw, MessageCircle } from 'lucide-react'

export interface PricingPlan {
  id: string
  badge: string
  badgeStyle?: 'gold' | 'default' | 'vip'
  name: string
  subtitle: string
  originalSetupPrice?: string
  setupPrice: string
  setupNote: string
  monthlyText: string
  isFeatured?: boolean
  features: { text: string; included: boolean }[]
  ctaText: string
  ctaHref: string
  ctaVariant: 'basic' | 'pro' | 'vip'
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basico',
    badge: 'ENTRADA RÁPIDA',
    badgeStyle: 'default',
    name: 'Plano Básico',
    subtitle: 'Ideal para profissionais autônomos que querem sair do link amador',
    originalSetupPrice: 'R$ 197,00',
    setupPrice: 'R$ 79,90',
    setupNote: 'taxa única de montagem em 24h',
    monthlyText: '1º mês grátis • Depois R$ 29,90/mês',
    isFeatured: false,
    features: [
      { text: 'Microsite entregue pronto pela nossa equipe em até 24h', included: true },
      { text: 'Layout clássico otimizado para abertura rápida', included: true },
      { text: 'Botões essenciais de WhatsApp, Instagram e Localização', included: true },
      { text: 'Acesso total ao editor para você atualizar quando quiser', included: true },
      { text: 'Hospedagem segura e certificado SSL inclusos', included: true },
      { text: '1 alteração mensal feita pela nossa equipe', included: true },
      { text: 'Catálogo visual de procedimentos com fotos', included: false },
      { text: 'Galeria de portfólio antes e depois', included: false },
      { text: 'Filtro anti-curiosos com regras de atendimento', included: false },
    ],
    ctaText: 'Quero Meu BioVip Pronto em 24h',
    ctaHref: 'https://wa.me/5531991390202?text=Ol%C3%A1!%20Quero%20garantir%20meu%20BioSite%20Plano%20B%C3%A1sico%20pronto%20em%2024h.',
    ctaVariant: 'basic'
  },
  {
    id: 'pro',
    badge: 'MAIS ESCOLHIDO POR ESTÚDIOS & BARBEARIAS',
    badgeStyle: 'gold',
    name: 'Plano Pro',
    subtitle: 'Para estúdios de beleza, barbearias e clínicas que querem filtrar curiosos',
    originalSetupPrice: 'R$ 347,00',
    setupPrice: 'R$ 129,90',
    setupNote: 'taxa única de criação sob medida',
    monthlyText: '1º mês grátis • Depois R$ 49,90/mês',
    isFeatured: true,
    features: [
      { text: 'Tudo do Plano Básico', included: true },
      { text: 'Montagem completa do seu Catálogo de Serviços com fotos e preços', included: true },
      { text: 'Galeria de Portfólio de Alta Resolução (Antes & Depois)', included: true },
      { text: 'Funil anti-curiosos: mensagens personalizadas para cada procedimento no WhatsApp', included: true },
      { text: 'Seção de regras de agendamento (política de atraso e pagamento)', included: true },
      { text: 'Acesso liberado aos 12 Módulos Inteligentes no painel', included: true },
      { text: '4 alterações mensais realizadas pela nossa equipe', included: true },
      { text: 'Métricas de acessos e cliques no painel', included: true },
    ],
    ctaText: 'Garantir Plano Pro no WhatsApp',
    ctaHref: 'https://wa.me/5531991390202?text=Ol%C3%A1!%20Quero%20o%20Plano%20Pro%20com%20Cat%C3%A1logo%20e%20Funil%20pronto%20em%2024h.',
    ctaVariant: 'pro'
  },
  {
    id: 'vip',
    badge: 'EXPERIÊNCIA EXCLUSIVA',
    badgeStyle: 'vip',
    name: 'Plano VIP',
    subtitle: 'Para clínicas, salões e negócios de alta demanda',
    setupPrice: 'R$ 197,00',
    setupNote: 'taxa única de criação personalizada',
    monthlyText: '1º mês grátis • Depois R$ 79,90/mês',
    isFeatured: false,
    features: [
      { text: 'Tudo do Plano Pro', included: true },
      { text: 'Design 100% exclusivo alinhado à identidade visual da sua marca', included: true },
      { text: 'Configuração gratuita de domínio próprio (ex: seunome.com.br)', included: true },
      { text: 'Alterações mensais ILIMITADAS feitas pelo nosso suporte', included: true },
      { text: 'Suporte prioritário VIP direto no WhatsApp pessoal', included: true },
      { text: 'Relatório mensal de cliques e conversões', included: true },
    ],
    ctaText: 'Contratar Plano VIP no WhatsApp',
    ctaHref: 'https://wa.me/5531991390202?text=Ol%C3%A1!%20Quero%20o%20Plano%20VIP%20com%20design%20exclusivo%20e%20dom%C3%ADnio%20configurado.',
    ctaVariant: 'vip'
  }
]

export default function PricingPlans() {
  return (
    <section id="planos" className="py-20 lg:py-32 bg-[#0C0C10] text-stone-100 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container-main relative">
        {/* Cabeçalho da Seção com Posicionamento "Feito para Você" */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs sm:text-sm font-semibold border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="uppercase tracking-widest font-mono text-[11px] font-bold">
              SERVIÇO FEITO PARA VOCÊ EM 24H
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-5 leading-[1.2]"
            style={{ lineHeight: '1.2' }}
          >
            Nós Criamos Tudo. Você Só Envia as Fotos no WhatsApp.
          </h2>

          <div className="space-y-3 text-stone-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            <p className="bg-stone-900/60 p-3.5 rounded-2xl border border-stone-800 text-stone-200 text-sm sm:text-base">
              ✨ <strong>Você só envia suas fotos e serviços pelo WhatsApp.</strong> Nós entregamos seu microsite 100% pronto e configurado em até 24 horas.
            </p>
            <p className="text-xs sm:text-sm text-stone-400">
              🔒 <strong>Autonomia total pós-entrega:</strong> você recebe acesso ao nosso editor exclusivo para alterar preços, horários ou fotos sempre que quiser, sem depender de ninguém.
            </p>
          </div>
        </div>

        {/* Grade dos 3 Cards de Planos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {PRICING_PLANS.map((plan) => {
            const isPro = plan.isFeatured

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                  isPro
                    ? 'bg-[#141418] border-2 border-[#E2B857] shadow-[0_20px_50px_rgba(226,184,87,0.18)] lg:-translate-y-3 z-10'
                    : 'bg-[#101014] border border-stone-800 hover:border-stone-700 shadow-lg'
                } p-6 sm:p-8`}
              >
                {/* Badge Superior */}
                <div className="mb-5">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${
                      isPro
                        ? 'bg-gradient-to-r from-amber-400 via-[#E2B857] to-amber-300 text-stone-950 shadow-md shadow-amber-500/20 animate-pulse'
                        : plan.badgeStyle === 'vip'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-stone-800 text-stone-300 border border-stone-700'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                {/* Título & Subtítulo */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed min-h-[40px]">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Preço de Entrada (Taxa Única) & Mensalidade */}
                <div className="p-4 rounded-2xl bg-black/40 border border-stone-800/80 mb-6 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
                    Taxa única de montagem:
                  </div>

                  <div className="flex items-baseline gap-2">
                    {plan.originalSetupPrice && (
                      <span className="text-stone-500 line-through text-xs font-mono">
                        {plan.originalSetupPrice}
                      </span>
                    )}
                    <span className={`text-2xl sm:text-3xl font-serif font-bold ${isPro ? 'text-[#E2B857]' : 'text-white'}`}>
                      {plan.setupPrice}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      ({plan.setupNote})
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-semibold">{plan.monthlyText}</span>
                  </div>
                </div>

                {/* Lista de Entregáveis */}
                <div className="space-y-3 mb-8 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mb-1">
                    O que você recebe:
                  </div>

                  {plan.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed ${
                        feat.included ? 'text-stone-200' : 'text-stone-600 line-through'
                      }`}
                    >
                      {feat.included ? (
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPro ? 'text-[#E2B857]' : 'text-emerald-400'}`} />
                      ) : (
                        <X className="w-4 h-4 shrink-0 mt-0.5 text-stone-700" />
                      )}
                      <span>{feat.text}</span>
                    </div>
                  ))}
                </div>

                {/* Botão CTA Principal */}
                <div>
                  <a
                    href={plan.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                      plan.ctaVariant === 'pro'
                        ? 'bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02]'
                        : plan.ctaVariant === 'vip'
                        ? 'bg-gradient-to-r from-amber-400 to-[#E2B857] hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-amber-500/20'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700 hover:border-amber-400'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{plan.ctaText}</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* BLOCO DE SUPORTE E SEGURANÇA ABAIXO DOS PLANOS (HORIZONTAL)  */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-[#121218] border border-stone-800 rounded-2xl p-6 lg:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-800">
            {/* Garantia 1 */}
            <div className="flex items-start gap-4 pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#E2B857] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-mono uppercase">
                  Zero Conhecimento Técnico
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Zero conhecimento técnico exigido: nós fazemos todo o trabalho pesado para você.
                </p>
              </div>
            </div>

            {/* Garantia 2 */}
            <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-6 lg:pl-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-mono uppercase">
                  Entrega em 24 Horas
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Entrega garantida em até 24 horas úteis após o envio dos materiais.
                </p>
              </div>
            </div>

            {/* Garantia 3 */}
            <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-6 lg:pl-8">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-mono uppercase">
                  Sem Fidelidade
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Sem fidelidade: cancele sua manutenção mensal quando quiser com 1 clique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


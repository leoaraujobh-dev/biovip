'use client'

import { Palette, Layers, Rocket, CheckCircle, ArrowRight, MessageCircle, Clock, ShieldCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Você Envia seus Dados pelo WhatsApp',
    description: 'Basta enviar suas fotos, logotipo e lista de procedimentos com valores diretamente para nosso time no WhatsApp. Sem formulários complexos nem perda de tempo.',
    highlight: 'Zero trabalho técnico ou de design para você.',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Nossa Equipe Cria Tudo em até 24h',
    description: 'Nossos designers estilizam seu microsite com fotos em fusão de estúdio, catálogo interativo, regras de atendimento e botões de alta conversão 100% configurados.',
    highlight: 'Entrega garantida em até 24 horas úteis.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'No Ar com Acesso Total ao Editor',
    description: 'Cole seu link na bio do Instagram e receba acesso exclusivo ao nosso painel para alterar preços, horários e fotos sempre que quiser com total autonomia.',
    highlight: 'Liberdade total pós-entrega sem depender de ninguém.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 lg:py-32 bg-white relative">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs sm:text-sm font-semibold mb-4 border border-primary-100 uppercase tracking-wider">
            ZERO TRABALHO PARA VOCÊ
          </span>
          <h2 className="section-title mb-5 font-serif leading-[1.2] tracking-tight" style={{ lineHeight: '1.2' }}>
            Você cuida dos seus clientes. Nós entregamos seu Microsite pronto em 3 passos:
          </h2>
          <p className="section-subtitle mx-auto text-dark-500 font-sans text-base sm:text-lg leading-relaxed">
            Sem precisar aprender design, mexer em ferramentas complicadas ou perder horas na frente do computador.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 -z-0" />

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-3xl p-8 border border-dark-100 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-primary-600/40 group-hover:text-primary-600 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-dark-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-dark-600 text-sm leading-relaxed mb-6 font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-dark-100/60 flex items-center gap-2 text-xs text-primary-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20meu%20BioSite%20pronto%20em%2024h."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-base px-9 py-4 shadow-lg shadow-primary-500/25"
          >
            Quero Meu Microsite Pronto em 24h
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

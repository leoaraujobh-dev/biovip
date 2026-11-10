'use client'

import { Palette, Layers, Rocket, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    icon: Palette,
    title: 'Personalize com Estética de Alto Padrão',
    description: 'Selecione entre paletas nobres de luxo (Esmeralda, Bordeaux, Ouro), tipografias editoriais serifadas ou contemporâneas e envie sua foto de estúdio com efeito de fusão suave.',
    highlight: 'Sem precisar entender de design ou código.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Ative suas 3 Páginas Pro Adicionais',
    description: 'Configure seu slider interativo de Antes & Depois, organize sua tabela clara de procedimentos com valores de referência e ative sua agenda de horários VIP.',
    highlight: 'Estrutura que filtra curiosos e atrai clientes qualificados.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Publique na Bio & Rastreie Conversões',
    description: 'Cole seu link exclusivo no perfil do Instagram e TikTok. O Meta Pixel e TikTok Pixel registram automaticamente cada lead que entra em contato pelo seu WhatsApp.',
    highlight: 'Pronto em menos de 10 minutos para receber agendamentos.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 lg:py-32 bg-white relative">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs sm:text-sm font-semibold mb-4 border border-primary-100">
            Passo a Passo Descomplicado
          </span>
          <h2 className="section-title mb-4 font-serif">
            Como ter o seu BioVip no ar hoje mesmo
          </h2>
          <p className="section-subtitle mx-auto text-dark-500 font-sans text-base sm:text-lg">
            Um fluxo fluido e intuitivo para transformar sua presença digital sem dor de cabeça técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 -z-0" />

          {steps.map((step, idx) => {
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
          <Link
            href="/starter"
            className="btn-primary inline-flex items-center gap-2 text-base px-9 py-4 shadow-lg shadow-primary-500/25"
          >
            Começar Agora Mesmo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}


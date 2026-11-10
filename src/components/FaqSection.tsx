'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { faqs, FaqItem } from '@/data/faqs'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-20 lg:py-32 bg-dark-50/60 relative">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs sm:text-sm font-semibold mb-4 border border-primary-100 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-primary-600" />
            TIRE SUAS DÚVIDAS
          </span>
          <h2 className="section-title mb-4 font-serif leading-[1.2] tracking-tight" style={{ lineHeight: '1.2' }}>
            Perguntas Frequentes antes de garantir seu BioVip.
          </h2>
          <p className="section-subtitle mx-auto text-dark-500 font-sans text-base sm:text-lg leading-relaxed">
            Tudo o que você precisa saber para transformar o link da sua bio em um portal de autoridade.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-dark-100 overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 font-medium text-dark-900 hover:text-primary-600 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-bold sm:text-xl">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-dark-50 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-primary-50 text-primary-600' : 'text-dark-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-dark-600 text-sm sm:text-base leading-relaxed border-t border-dark-50/80 animate-fade-in font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-14 text-center bg-white border border-dark-100 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-sm">
          <p className="font-serif text-lg font-bold text-dark-900 mb-2">
            Ainda tem alguma dúvida específica para o seu negócio?
          </p>
          <p className="text-sm text-dark-500 mb-6">
            Nossa equipe de consultores de posicionamento está disponível no WhatsApp para te orientar.
          </p>
          <a
            href="https://wa.me/5531991390202?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20BioVip."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-50 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition"
          >
            <Sparkles className="w-4 h-4 text-primary-600" />
            Falar com Consultor no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}


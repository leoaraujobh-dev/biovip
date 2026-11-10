'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { OFFICIAL_PLANS, FAQ_LIST } from '@/data/plans'
import { Check, ChevronDown, ChevronUp, Sparkles, ArrowRight } from 'lucide-react'

export default function PlansPageClient() {
  const [billingCycle, setBillingCycle] = useState<'anual' | 'mensal'>('anual')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans selection:bg-stone-200">
      <Header />

      <main id="main-content" className="pt-24 lg:pt-32 pb-24">
        {/* CABEÇALHO */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-stone-400 block mb-2">
              PLANOS & VALORES
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.1]">
              Planos transparentes para quem quer vender pelo celular.
            </h1>
            <p className="mt-4 text-stone-600 font-serif text-base sm:text-lg leading-relaxed max-w-2xl">
              Hospedagem inclusa, sem taxas escondidas. Você cria e testa o seu Bio Site antes de pagar.
            </p>
          </div>

          {/* TOGGLE MENSAL / ANUAL (EXATAMENTE COMO NA IMAGEM ENVIADA) */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="p-1 rounded-full bg-white border border-stone-200 inline-flex items-center shadow-2xs">
              <button
                type="button"
                onClick={() => setBillingCycle('mensal')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  billingCycle === 'mensal'
                    ? 'bg-black text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                MENSAL
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('anual')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  billingCycle === 'anual'
                    ? 'bg-black text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                ANUAL
              </button>
            </div>

            <p className="text-xs text-stone-500 font-mono">
              Pix ou cartão nos dois. No anual, <strong className="text-stone-900">30% de desconto</strong>. Você escolhe o ciclo na hora de pagar.
            </p>
          </div>
        </section>

        {/* CONTAINER DOS 4 PLANOS (GRADE EXATA COM O PRO DESTACADO EM PRETO) */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {OFFICIAL_PLANS.map((plan) => {
              const isPro = plan.id === 'pro'
              const priceDisplay = billingCycle === 'anual' ? plan.annualMonthlyPrice : plan.monthlyPrice

              return (
                <div
                  key={plan.id}
                  className={`p-6 sm:p-8 flex flex-col justify-between relative transition-colors ${
                    isPro ? 'bg-black text-white' : 'bg-white text-stone-900'
                  }`}
                >
                  {/* TOPO DO CARD */}
                  <div className="space-y-6">
                    {/* TAG DO PLANO E SELO "MAIS ESCOLHIDO" */}
                    <div className="flex items-center justify-between min-h-[28px]">
                      <span className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${
                        isPro ? 'text-stone-300' : 'text-stone-900'
                      }`}>
                        {plan.tag}
                      </span>

                      {plan.isPopular && (
                        <span className="px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase font-bold border border-white/20 bg-white/10 text-white">
                          MAIS ESCOLHIDO
                        </span>
                      )}
                    </div>

                    {/* VALORES E PREÇO */}
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-3xl sm:text-4xl font-serif font-bold tracking-tight ${
                          isPro ? 'text-white' : 'text-stone-900'
                        }`}>
                          {priceDisplay}
                        </span>
                        {!plan.isCustomPrice && (
                          <span className={`text-xs font-mono ${isPro ? 'text-stone-400' : 'text-stone-500'}`}>
                            /mês
                          </span>
                        )}
                      </div>

                      <div className={`text-[10px] font-mono uppercase tracking-wider mt-1.5 font-bold ${
                        isPro ? 'text-stone-400' : 'text-stone-500'
                      }`}>
                        {billingCycle === 'anual' ? 'NO PLANO ANUAL · HOSPEDAGEM INCLUSA' : 'NO PLANO MENSAL · HOSPEDAGEM INCLUSA'}
                      </div>

                      {!plan.isCustomPrice && billingCycle === 'anual' && plan.annualTotal && (
                        <div className={`text-[10.5px] font-mono mt-0.5 ${
                          isPro ? 'text-stone-400' : 'text-stone-400'
                        }`}>
                          {plan.annualTotal} · {plan.annualEconomy}
                        </div>
                      )}

                      {plan.isCustomPrice && (
                        <div className="text-[10px] font-mono uppercase tracking-wider mt-1.5 text-stone-400 font-bold">
                          SOB MEDIDA · MENSAL
                        </div>
                      )}
                    </div>

                    {/* DESCRIÇÃO DO PLANO */}
                    <p className={`text-xs leading-relaxed ${
                      isPro ? 'text-stone-300' : 'text-stone-600'
                    }`}>
                      {plan.description}
                    </p>

                    {/* LISTA DE FUNCIONALIDADES COM CHECKS E TRAÇADOS */}
                    <ul className="space-y-3 pt-3 border-t border-stone-200/40 text-xs">
                      {plan.features.map((feat, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2.5 ${
                            feat.included
                              ? isPro ? 'text-stone-200' : 'text-stone-800'
                              : isPro ? 'text-stone-600 line-through opacity-60' : 'text-stone-400 line-through opacity-70'
                          }`}
                        >
                          <span className={`shrink-0 mt-0.5 font-bold ${
                            feat.included
                              ? isPro ? 'text-white' : 'text-stone-900'
                              : 'text-stone-300'
                          }`}>
                            ✓
                          </span>
                          <span className="leading-tight">{feat.name}</span>
                        </li>
                      ))}
                    </ul>

                    {/* BOX EXTRA DO PLANO PREMIUM (SE EXISTIR) */}
                    {plan.extraNote && (
                      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-600 text-[11px] leading-relaxed font-serif mt-6">
                        {plan.extraNote}
                      </div>
                    )}
                  </div>

                  {/* BOTÃO DO RODAPÉ */}
                  <div className="pt-8">
                    <Link
                      href={plan.id === 'premium' ? 'https://wa.me/5581985087520?text=Ol%C3%A1,%20gostaria%20de%20um%20or%C3%A7amento%20para%20o%20Plano%20Premium' : `/starter?plano=${plan.id}&ciclo=${billingCycle}`}
                      className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all text-center block cursor-pointer shadow-xs ${
                        isPro
                          ? 'bg-white hover:bg-stone-100 text-black shadow-md hover:shadow-lg'
                          : 'border border-stone-300 hover:border-stone-900 text-stone-900 bg-white hover:bg-stone-50'
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SEÇÃO DE PERGUNTAS FREQUENTES (FAQ) */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 border-t border-stone-200/80 pt-16">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-400 block mb-2">
              DÚVIDAS FREQUENTES
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Tudo o que você precisa saber antes de começar.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_LIST.map((item, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-stone-200/80 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-base text-stone-900 hover:text-amber-800 transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <span className="text-stone-400 text-lg">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed font-serif border-t border-stone-100">
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

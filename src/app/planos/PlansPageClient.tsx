'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingPlans from '@/components/PricingPlans'
import { FAQ_LIST } from '@/data/plans'

export default function PlansPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-stone-100 font-sans selection:bg-stone-800">
      <Header />

      <main id="main-content" className="pt-20 lg:pt-28 pb-20">
        {/* TABELA DE PLANOS & GARANTIAS */}
        <PricingPlans />

        {/* SEÇÃO DE PERGUNTAS FREQUENTES (FAQ) */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 border-t border-stone-800/80 pt-16">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block mb-2 font-bold">
              DÚVIDAS FREQUENTES SOBRE A ENTREGA
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">
              Tudo o que você precisa saber antes de contratar.
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Como funciona a entrega em 24 horas?',
                a: 'Após a contratação pelo WhatsApp, você envia suas fotos, logotipo e lista de serviços com valores. Nossa equipe de especialistas configura seu microsite por completo, aplicando design de luxo, catálogo interativo e botões de agendamento em até 24 horas úteis.'
              },
              {
                q: 'Eu preciso saber mexer em programação ou ferramentas de design?',
                a: 'Zero! Nós fazemos 100% do trabalho técnico e visual para você. Você só precisa nos mandar as informações pelo WhatsApp como conversa com um cliente.'
              },
              {
                q: 'Como funciona o acesso ao editor após a entrega?',
                a: 'Você recebe um login e senha exclusivos para acessar o Painel BioVip no seu celular ou computador. Lá você tem autonomia total para mudar preços, adicionar novos procedimentos, trocar fotos ou horários sem depender de ninguém.'
              },
              {
                q: 'Existe contrato de fidelidade?',
                a: 'Não. Você tem o 1º mês grátis de hospedagem e manutenção, e pode cancelar a qualquer momento diretamente pelo painel com apenas 1 clique.'
              },
              {
                q: 'Posso usar meu próprio domínio (ex: meunome.com.br)?',
                a: 'Sim! No Plano VIP, nossa equipe realiza toda a configuração técnica do seu domínio próprio gratuitamente. Nos demais planos você utiliza seu link exclusivo biovip.com.br/seunome com abertura ultra-rápida no Instagram.'
              }
            ].map((item, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-stone-900/80 border border-stone-800 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-base text-stone-200 hover:text-[#E2B857] transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <span className="text-stone-400 text-lg">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-stone-400 leading-relaxed font-sans border-t border-stone-800/60">
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

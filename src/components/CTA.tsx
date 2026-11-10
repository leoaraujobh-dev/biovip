'use client'

import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-primary-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" aria-hidden="true" />
      
      <div className="container-main relative text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs sm:text-sm font-semibold mb-6 uppercase tracking-wider">
          ENTREGA GARANTIDA EM ATÉ 24 HORAS
        </span>
        <h2 className="section-title text-white mb-6 font-serif leading-[1.2] tracking-tight" style={{ lineHeight: '1.2' }}>
          Seu próximo cliente está prestes a clicar no link da sua bio. O que ele vai encontrar lá?
        </h2>
        <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Você só envia suas fotos e lista de serviços pelo WhatsApp. Nossa equipe entrega seu microsite completo, luxuoso e pronto para vender em até 24h.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20meu%20BioSite%20pronto%20em%2024h."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-white text-primary-600 hover:bg-primary-50 inline-flex items-center justify-center gap-2 text-base px-8 py-4 shadow-xl shadow-black/10 font-bold w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Quero Meu BioSite Pronto em 24h</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20especialista%20sobre%20meu%20BioSite."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-white/10 border-2 border-white/30 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-200 backdrop-blur-sm w-full sm:w-auto"
          >
            <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
            <span>Falar com Especialista no WhatsApp</span>
          </a>
        </div>
        <p className="mt-8 text-primary-200 text-sm">
          Zero conhecimento técnico • Entrega garantida em 24h • Autonomia total com editor pós-entrega
        </p>
      </div>
    </section>
  )
}

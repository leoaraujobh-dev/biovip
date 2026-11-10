'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  Calendar,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  AlertCircle,
  Star,
  Heart,
  Share2
} from 'lucide-react'

export default function DemoBelezaPage() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const toggleAccordion = (id: string) => {
    setActiveAccordion(prev => prev === id ? null : id)
  }

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setToastMessage('Link do BioVip copiado!')
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  const whatsappBaseUrl = 'https://wa.me/5511999999999'

  return (
    <div className="min-h-screen bg-[#070709] text-stone-100 flex flex-col items-center justify-start sm:py-8 sm:px-4 font-sans selection:bg-[#E2B857]/30 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 z-50 bg-[#E2B857] text-stone-950 px-4 py-2 rounded-full font-bold text-xs shadow-xl animate-fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner de Demonstração (desktop) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md mb-3 px-3 text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono uppercase tracking-wider text-[11px] text-stone-300 font-semibold">
            Modelo: Vitrine Elegance
          </span>
        </div>
        <Link
          href="/starter"
          className="hover:text-amber-300 transition font-mono text-[11px] font-semibold text-amber-400 flex items-center gap-1"
        >
          Criar este modelo →
        </Link>
      </div>

      {/* CONTAINER PRINCIPAL DO SMARTPHONE */}
      <main className="w-full max-w-md min-h-screen sm:min-h-[844px] bg-[#0D0D11] sm:rounded-[36px] sm:border sm:border-stone-800/80 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden relative flex flex-col">
        {/* Glow de ambientação no topo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[220px] bg-gradient-to-b from-[#E8A598]/20 via-[#E2B857]/15 to-transparent blur-3xl pointer-events-none -z-0" />

        {/* 1. HEADER VIP */}
        <header className="relative pt-6 pb-6 px-6 text-center z-10 flex flex-col items-center">
          {/* Botão de Compartilhar no canto */}
          <button
            onClick={handleShare}
            aria-label="Compartilhar BioVip"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 transition cursor-pointer backdrop-blur-md"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Banner de Capa Blur ao fundo */}
          <div className="absolute top-0 left-0 right-0 h-36 overflow-hidden -z-10 opacity-30">
            <Image
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop"
              alt="Capa Studio Rafaela Martins"
              fill
              className="object-cover blur-[2px]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D11]/70 to-[#0D0D11]" />
          </div>

          {/* Foto de Perfil Circular com Selo Dourado */}
          <div className="relative mt-8 mb-4">
            <div className="w-24 h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-[#E2B857] via-[#E8A598] to-[#E2B857] shadow-lg shadow-[#E2B857]/20">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-900">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
                  alt="Rafaela Martins"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div
              className="absolute -bottom-1 -right-1 bg-[#E2B857] text-stone-950 p-1.5 rounded-full shadow-md border-2 border-[#0D0D11]"
              title="Profissional Verificada BioVip"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Nome e Especialidades */}
          <h1
            className="font-serif text-2xl font-bold tracking-tight text-white mb-1.5"
            style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif' }}
          >
            Studio Rafaela Martins
          </h1>

          <p className="text-xs text-stone-300 font-medium max-w-xs leading-relaxed mb-2.5">
            Lash Designer &amp; Nail Artist | Especialista em Olhar e Unhas em Gel
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-stone-400">
            <MapPin className="w-3 h-3 text-[#E2B857]" />
            <span>São Paulo - SP • Jardins</span>
          </div>
        </header>

        {/* 2. BOTÃO DE AÇÃO IMEDIATA (WHATSAPP VIP COM EFEITO DE BRILHO) */}
        <section className="px-5 mb-7 relative z-10">
          <a
            href={`${whatsappBaseUrl}?text=Olá,%20vi%20seu%20BioVip%20e%20gostaria%20de%20consultar%20horários!`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E2B857] via-[#F3D78A] to-[#E2B857] text-stone-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-[#E2B857]/25 hover:shadow-[#E2B857]/40 hover:scale-[1.01] active:scale-[0.99] transition-all overflow-hidden"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-[-25deg] transform -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            <MessageCircle className="w-5 h-5 text-stone-950 shrink-0" />
            <span>Agendar Horário VIP no WhatsApp</span>
          </a>
        </section>

        {/* 3. CATÁLOGO VISUAL DE PROCEDIMENTOS */}
        <section className="px-5 mb-8 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-serif font-bold text-white flex items-center gap-2"
              style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif' }}
            >
              <Sparkles className="w-4 h-4 text-[#E2B857]" />
              Serviços &amp; Procedimentos
            </h2>
            <span className="text-[10px] font-mono text-[#E2B857] uppercase tracking-wider font-semibold">
              Valores 2026
            </span>
          </div>

          <div className="space-y-3.5">
            {/* Card 1: Cílios Volume Brasileiro */}
            <div className="p-3.5 rounded-2xl bg-[#141419] border border-stone-800/80 hover:border-[#E2B857]/50 transition-all flex gap-3.5 items-center">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-stone-800">
                <Image
                  src="https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=400&auto=format&fit=crop"
                  alt="Extensão de Cílios Volume Brasileiro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-sm text-stone-100 leading-tight mb-1">
                  Extensão de Cílios Volume Brasileiro
                </h3>
                <p className="text-[11px] text-stone-400 line-clamp-2 leading-snug mb-2">
                  Aplicação fio a fio formato Y com acabamento natural e alta durabilidade.
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#E2B857]">
                    R$ 190,00 <span className="text-[10px] font-normal text-stone-400">• 2h</span>
                  </span>
                  <a
                    href={`${whatsappBaseUrl}?text=Olá!%20Gostaria%20de%20agendar%20Extensão%20de%20Cílios%20Volume%20Brasileiro.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-[#E2B857] hover:text-stone-950 text-stone-200 text-[11px] font-bold transition flex items-center gap-1"
                  >
                    <span>Agendar este</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Alongamento em Fibra de Vidro */}
            <div className="p-3.5 rounded-2xl bg-[#141419] border border-stone-800/80 hover:border-[#E2B857]/50 transition-all flex gap-3.5 items-center">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-stone-800">
                <Image
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop"
                  alt="Alongamento em Fibra de Vidro"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-sm text-stone-100 leading-tight mb-1">
                  Alongamento em Fibra de Vidro
                </h3>
                <p className="text-[11px] text-stone-400 line-clamp-2 leading-snug mb-2">
                  Acabamento slim com estrutura reforçada e esmaltação em gel inclusa.
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#E2B857]">
                    R$ 210,00 <span className="text-[10px] font-normal text-stone-400">• 2h30</span>
                  </span>
                  <a
                    href={`${whatsappBaseUrl}?text=Olá!%20Gostaria%20de%20agendar%20Alongamento%20em%20Fibra%20de%20Vidro.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-[#E2B857] hover:text-stone-950 text-stone-200 text-[11px] font-bold transition flex items-center gap-1"
                  >
                    <span>Agendar este</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Design com Henna */}
            <div className="p-3.5 rounded-2xl bg-[#141419] border border-stone-800/80 hover:border-[#E2B857]/50 transition-all flex gap-3.5 items-center">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-stone-800">
                <Image
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop"
                  alt="Design Estratégico com Henna"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-sm text-stone-100 leading-tight mb-1">
                  Design Estratégico com Henna
                </h3>
                <p className="text-[11px] text-stone-400 line-clamp-2 leading-snug mb-2">
                  Mapeamento facial personalizado para harmonizar e valorizar o seu olhar.
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#E2B857]">
                    R$ 75,00 <span className="text-[10px] font-normal text-stone-400">• 45min</span>
                  </span>
                  <a
                    href={`${whatsappBaseUrl}?text=Olá!%20Gostaria%20de%20agendar%20Design%20Estratégico%20com%20Henna.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-[#E2B857] hover:text-stone-950 text-stone-200 text-[11px] font-bold transition flex items-center gap-1"
                  >
                    <span>Agendar este</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. GALERIA / PORTFÓLIO DE RESULTADOS (GRADE 2X2) */}
        <section className="px-5 mb-8 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-serif font-bold text-white flex items-center gap-2"
              style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif' }}
            >
              <Heart className="w-4 h-4 text-[#E8A598]" />
              Resultados Reais (Antes &amp; Depois)
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 group">
              <Image
                src="https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?q=80&w=500&auto=format&fit=crop"
                alt="Volume Russo Impecável"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[10px] font-semibold text-stone-200">Volume Luxo</span>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 group">
              <Image
                src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=500&auto=format&fit=crop"
                alt="Nail Art Francesa Fina"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[10px] font-semibold text-stone-200">Alongamento Slim</span>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 group">
              <Image
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=500&auto=format&fit=crop"
                alt="Design de Olhar"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[10px] font-semibold text-stone-200">Olhar Natural</span>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 group">
              <Image
                src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=500&auto=format&fit=crop"
                alt="Harmonização Sobrancelhas"
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[10px] font-semibold text-stone-200">Design com Henna</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. REGRAS DE AGENDAMENTO (FILTRO ANTI-CURIOSOS EM ACCORDION) */}
        <section className="px-5 mb-8 relative z-10">
          <div className="p-4 rounded-2xl bg-[#141419] border border-stone-800/90 space-y-3">
            <h3
              className="font-serif font-bold text-sm text-stone-200 flex items-center gap-2 mb-2"
              style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif' }}
            >
              <AlertCircle className="w-4 h-4 text-[#E2B857]" />
              Informações Importantes para Agendamento
            </h3>

            {/* Item 1 */}
            <div className="border-b border-stone-800 pb-2">
              <button
                type="button"
                onClick={() => toggleAccordion('tolerancia')}
                className="w-full flex items-center justify-between text-left text-xs font-semibold text-stone-300 py-1 cursor-pointer hover:text-[#E2B857] transition"
              >
                <span>⏰ Tolerância de atraso: 15 minutos</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeAccordion === 'tolerancia' ? 'rotate-180 text-[#E2B857]' : ''}`} />
              </button>
              {activeAccordion === 'tolerancia' && (
                <p className="text-[11px] text-stone-400 mt-1 leading-relaxed animate-fade-in pl-1">
                  Para garantir o padrão de excelência de cada atendimento, atrasos superiores a 15 minutos demandam reagendamento de horário.
                </p>
              )}
            </div>

            {/* Item 2 */}
            <div className="border-b border-stone-800 pb-2">
              <button
                type="button"
                onClick={() => toggleAccordion('pagamento')}
                className="w-full flex items-center justify-between text-left text-xs font-semibold text-stone-300 py-1 cursor-pointer hover:text-[#E2B857] transition"
              >
                <span>💳 Formas de pagamento: Pix e Cartões</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeAccordion === 'pagamento' ? 'rotate-180 text-[#E2B857]' : ''}`} />
              </button>
              {activeAccordion === 'pagamento' && (
                <p className="text-[11px] text-stone-400 mt-1 leading-relaxed animate-fade-in pl-1">
                  Aceitamos Pix imediato, cartões de débito e crédito (parcelamento em até 3x sem juros para pacotes).
                </p>
              )}
            </div>

            {/* Item 3 */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('cancelamento')}
                className="w-full flex items-center justify-between text-left text-xs font-semibold text-stone-300 py-1 cursor-pointer hover:text-[#E2B857] transition"
              >
                <span>🗓️ Política de cancelamento (24h de antecedência)</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeAccordion === 'cancelamento' ? 'rotate-180 text-[#E2B857]' : ''}`} />
              </button>
              {activeAccordion === 'cancelamento' && (
                <p className="text-[11px] text-stone-400 mt-1 leading-relaxed animate-fade-in pl-1">
                  Cancelamentos ou remarcações devem ser comunicados com no mínimo 24h de antecedência para liberação da agenda.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 6. LOCALIZAÇÃO E CONTATO */}
        <section className="px-5 mb-8 relative z-10">
          <div className="p-4 rounded-2xl bg-[#141419] border border-stone-800/90 text-center space-y-3">
            <div className="w-9 h-9 rounded-full bg-[#E2B857]/10 text-[#E2B857] flex items-center justify-center mx-auto">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-stone-100 mb-0.5">
                Localização do Espaço VIP
              </h3>
              <p className="text-xs text-stone-400">
                Rua Oscar Freire, 1420 • Jardins • São Paulo - SP
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Rua+Oscar+Freire+1420+Sao+Paulo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 text-xs font-semibold transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#E2B857]" />
              <span>Abrir no Google Maps / Waze</span>
            </a>
          </div>
        </section>

        {/* 7. FOOTER */}
        <footer className="mt-auto pt-6 pb-8 px-6 text-center border-t border-stone-800/60 bg-[#09090C]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-stone-400 hover:text-[#E2B857] transition"
          >
            <span>Criado por</span>
            <span className="font-bold text-white tracking-wider">BioVip</span>
            <span>• Garanta seu microsite em biovip.com.br</span>
          </Link>
        </footer>
      </main>
    </div>
  )
}


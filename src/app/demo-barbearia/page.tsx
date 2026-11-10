'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Scissors,
  CheckCircle2,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  Wifi,
  Beer,
  Instagram,
  Star,
  Shield,
  Crown,
  ChevronRight,
  Sparkles,
  Navigation
} from 'lucide-react'

export default function DemoBarbeariaPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showBeerModal, setShowBeerModal] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const inIframe =
        window.self !== window.top ||
        window.location.search.includes('preview=true') ||
        window.location.search.includes('readonly=true')

      if (inIframe) {
        setIsPreview(true)
        const stopClicks = (e: MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
        }
        window.addEventListener('click', stopClicks, true)

        const style = document.createElement('style')
        style.id = 'biovip-preview-style'
        style.textContent = `
          * { -webkit-tap-highlight-color: transparent !important; }
          a, button, [role="button"], input, select, textarea {
            pointer-events: none !important;
            cursor: grab !important;
          }
          body {
            user-select: none !important;
            -webkit-user-select: none !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            cursor: grab !important;
          }
          ::-webkit-scrollbar {
            display: none !important;
          }
        `
        document.head.appendChild(style)

        return () => {
          window.removeEventListener('click', stopClicks, true)
          const el = document.getElementById('biovip-preview-style')
          if (el) el.remove()
        }
      }
    }
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleCopyWifi = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('DonCaponeVIP2026')
      showToast('Senha do Wi-Fi copiada: DonCaponeVIP2026')
    } else {
      showToast('Wi-Fi: DonCaponeVIP2026')
    }
  }

  const whatsappBaseUrl = 'https://wa.me/5531991390202'

  return (
    <div className={`min-h-screen bg-[#050507] text-stone-100 flex flex-col items-center justify-start font-sans selection:bg-[#E2B857]/30 selection:text-white ${
      isPreview ? 'p-0 w-full' : 'sm:py-8 sm:px-4'
    }`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 z-50 bg-[#22C55E] text-stone-950 px-4 py-2 rounded-full font-bold text-xs shadow-xl animate-fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-stone-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Carta de Bebidas */}
      {showBeerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141418] border border-[#E2B857]/40 rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#E2B857]/10 text-[#E2B857] flex items-center justify-center mx-auto">
              <Beer className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-black text-base uppercase tracking-wider text-white">
              Bebidas &amp; Cortesias da Casa
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              1 Chopp Artesanal IPA/Pilsen gelado ou Café Expresso Grão Moído é cortesia em qualquer atendimento.
            </p>
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-left text-xs space-y-1.5 text-stone-300">
              <p>🍺 Chopp Heineken / Stella — Cortesia</p>
              <p>☕ Café Expresso Crema — Cortesia</p>
              <p>🥃 Whisky Single Malt — Dose R$ 25</p>
            </div>
            <button
              onClick={() => setShowBeerModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#E2B857] text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Top Banner de Demonstração (desktop) */}
      {!isPreview && (
        <div className="hidden sm:flex items-center justify-between w-full max-w-md mb-3 px-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono uppercase tracking-wider text-[11px] text-stone-300 font-semibold">
              Modelo: Barber Club VIP
            </span>
          </div>
          <Link
            href="/starter"
            className="hover:text-amber-300 transition font-mono text-[11px] font-semibold text-amber-400 flex items-center gap-1"
          >
            Criar este modelo →
          </Link>
        </div>
      )}

      {/* CONTAINER PRINCIPAL DO SMARTPHONE */}
      <main className={`w-full max-w-md min-h-screen bg-[#09090B] overflow-hidden relative flex flex-col ${
        isPreview ? 'border-0 rounded-none shadow-none' : 'sm:min-h-[844px] sm:rounded-[36px] sm:border sm:border-stone-800/80 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
      }`}>
        {/* Ambient Glow no topo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[200px] bg-gradient-to-b from-[#E2B857]/15 via-amber-600/10 to-transparent blur-3xl pointer-events-none -z-0" />

        {/* 1. HEADER BARBER */}
        <header className="relative pt-6 pb-6 px-6 text-center z-10 flex flex-col items-center">
          {/* Banner de Capa Vintage/Industrial */}
          <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden -z-10 opacity-35">
            <Image
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop"
              alt="Capa Don Capone Barber Club"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090B]/60 to-[#09090B]" />
          </div>

          {/* Logo Circular Brasão */}
          <div className="relative mt-8 mb-4">
            <div className="w-24 h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-[#E2B857] via-stone-700 to-[#E2B857] shadow-xl shadow-black/80">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#141418] border-2 border-black flex flex-col items-center justify-center text-center p-2">
                <Crown className="w-5 h-5 text-[#E2B857] mb-0.5" />
                <span className="font-sans font-black text-[9px] uppercase tracking-widest text-amber-200 leading-none">
                  DON CAPONE
                </span>
                <span className="font-mono text-[7px] text-stone-400 tracking-tighter">
                  EST. 2018
                </span>
              </div>
            </div>
            <div
              className="absolute -bottom-1 -right-1 bg-emerald-500 text-stone-950 p-1.5 rounded-full shadow-md border-2 border-[#09090B]"
              title="Barbearia Verificada BioVip"
            >
              <Scissors className="w-3.5 h-3.5 text-stone-950" />
            </div>
          </div>

          {/* Nome e Slogan */}
          <h1 className="font-sans font-black text-xl uppercase tracking-wider text-white mb-1">
            DON CAPONE BARBER CLUB
          </h1>

          <p className="text-xs text-stone-400 font-medium max-w-xs leading-relaxed mb-3">
            Cortes Clássicos, Barba Terapia &amp; Clube de Assinatura
          </p>

          {/* Status Aberto Agora */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Aberto agora até às 20h</span>
          </div>
        </header>

        {/* 2. DESTAQUE DO CLUBE / COMBO PRINCIPAL */}
        <section className="px-5 mb-7 relative z-10">
          <div className="relative p-5 rounded-3xl bg-gradient-to-b from-[#18181F] to-[#121216] border-2 border-[#E2B857] shadow-xl shadow-black/60 overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-[#E2B857] to-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
              MAIS PEDIDO
            </div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E2B857] font-bold block mb-1">
              EXPERIÊNCIA COMPLETA
            </span>

            <h3 className="font-sans font-black text-base uppercase text-white tracking-wide mb-1">
              COMBO VIP (Corte + Barboterapia com Toalha Quente)
            </h3>

            <p className="text-xs text-stone-400 leading-relaxed mb-3.5">
              Corte navalhado ou fade, lavagem refrescante com massagem capilar, alinhamento de barba com vapor de ozônio e toalha quente aromática.
            </p>

            <div className="flex items-center justify-between gap-3 pt-1 border-t border-stone-800">
              <div>
                <span className="text-[10px] text-stone-500 line-through block">De R$ 115,00</span>
                <span className="font-mono text-xl font-black text-[#E2B857]">R$ 95,00</span>
              </div>

              <a
                href={`${whatsappBaseUrl}?text=Olá,%20gostaria%20de%20agendar%20o%20Combo%20VIP%20(Corte%20+%20Barboterapia)!`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl bg-[#22C55E] hover:bg-[#1ea850] text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition"
              >
                <MessageCircle className="w-4 h-4 fill-stone-950" />
                <span>Agendar Combo VIP</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3. TABELA RÁPIDA DE SERVIÇOS */}
        <section className="px-5 mb-8 relative z-10">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-sm font-sans font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#E2B857]" />
              Menu de Serviços
            </h2>
            <span className="text-[10px] font-mono text-stone-400 uppercase">Preços Fixos</span>
          </div>

          <div className="space-y-2.5">
            {/* Item 1 */}
            <div className="p-3.5 rounded-2xl bg-[#141418] border border-stone-800/80 hover:border-stone-700 transition flex items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wide">
                  Corte Tradicional / Fade Degradê
                </h4>
                <p className="text-[11px] text-stone-400">Tesoura ou máquina + finalização com pomada matte</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-xs text-stone-200 block mb-1">R$ 55,00</span>
                <a
                  href={`${whatsappBaseUrl}?text=Olá!%20Gostaria%20de%20agendar%20Corte%20Tradicional.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-[#E2B857] hover:text-stone-950 text-stone-200 text-[10px] font-bold uppercase transition"
                >
                  Agendar
                </a>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-3.5 rounded-2xl bg-[#141418] border border-stone-800/80 hover:border-stone-700 transition flex items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wide">
                  Barba Terapia com Óleos Essenciais
                </h4>
                <p className="text-[11px] text-stone-400">Desenho da barba, toalha quente e pós-barba mentolado</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-xs text-stone-200 block mb-1">R$ 45,00</span>
                <a
                  href={`${whatsappBaseUrl}?text=Olá!%20Gostaria%20de%20agendar%20Barba%20Terapia.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-[#E2B857] hover:text-stone-950 text-stone-200 text-[10px] font-bold uppercase transition"
                >
                  Agendar
                </a>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-3.5 rounded-2xl bg-[#141418] border border-stone-800/80 hover:border-stone-700 transition flex items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wide">
                  Acabamento de Barba &amp; Sobrancelha
                </h4>
                <p className="text-[11px] text-stone-400">Pezinho na navalha e limpeza de sobrancelha na pinça</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-xs text-stone-200 block mb-1">R$ 30,00</span>
                <a
                  href={`${whatsappBaseUrl}?text=Olá!%20Gostaria%20de%20agendar%20Acabamento%20de%20Barba.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-[#E2B857] hover:text-stone-950 text-stone-200 text-[10px] font-bold uppercase transition"
                >
                  Agendar
                </a>
              </div>
            </div>

            {/* Item 4 */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/20 to-[#141418] border border-[#E2B857]/40 hover:border-[#E2B857] transition flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3 h-3 text-[#E2B857]" />
                  <h4 className="font-bold text-xs text-[#E2B857] uppercase tracking-wide">
                    Plano Mensal (Cortes Ilimitados)
                  </h4>
                </div>
                <p className="text-[11px] text-stone-400">Venha toda semana e mantenha o visual sempre na régua</p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-xs text-emerald-400 block mb-1">R$ 139,90/mês</span>
                <a
                  href={`${whatsappBaseUrl}?text=Olá!%20Tenho%20interesse%20no%20Plano%20Mensal%20de%20Cortes%20Ilimitados.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-[#E2B857] text-stone-950 text-[10px] font-black uppercase transition shadow-xs"
                >
                  Assinar
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FACILIDADES PARA O CLIENTE */}
        <section className="px-5 mb-8 relative z-10">
          <h2 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-3">
            Facilidades &amp; Conforto
          </h2>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleCopyWifi}
              className="p-3.5 rounded-2xl bg-[#141418] border border-stone-800 hover:border-[#E2B857]/50 text-left transition cursor-pointer group"
            >
              <Wifi className="w-4 h-4 text-[#E2B857] mb-1.5 group-hover:scale-110 transition" />
              <p className="font-bold text-xs text-white">Wi-Fi da Barbearia</p>
              <p className="text-[10px] text-stone-400">Toque para copiar senha</p>
            </button>

            <a
              href="https://waze.com/ul?q=Avenida+Paulista+1000+Sao+Paulo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-[#141418] border border-stone-800 hover:border-[#E2B857]/50 text-left transition group"
            >
              <Navigation className="w-4 h-4 text-emerald-400 mb-1.5 group-hover:scale-110 transition" />
              <p className="font-bold text-xs text-white">Como Chegar</p>
              <p className="text-[10px] text-stone-400">Abrir no Waze / Uber</p>
            </a>

            <button
              onClick={() => setShowBeerModal(true)}
              className="p-3.5 rounded-2xl bg-[#141418] border border-stone-800 hover:border-[#E2B857]/50 text-left transition cursor-pointer group"
            >
              <Beer className="w-4 h-4 text-amber-400 mb-1.5 group-hover:scale-110 transition" />
              <p className="font-bold text-xs text-white">Cervejas da Casa</p>
              <p className="text-[10px] text-stone-400">Chopp e bebidas cortesia</p>
            </button>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-[#141418] border border-stone-800 hover:border-[#E2B857]/50 text-left transition group"
            >
              <Instagram className="w-4 h-4 text-pink-400 mb-1.5 group-hover:scale-110 transition" />
              <p className="font-bold text-xs text-white">Instagram Oficial</p>
              <p className="text-[10px] text-stone-400">Fotos de cortes do dia</p>
            </a>
          </div>
        </section>

        {/* 5. DEPOIMENTO DE CLIENTE */}
        <section className="px-5 mb-8 relative z-10">
          <div className="p-4 rounded-2xl bg-[#141418] border border-stone-800/90 space-y-2">
            <div className="flex items-center gap-1 text-[#E2B857]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#E2B857]" />
              ))}
            </div>
            <p className="text-xs text-stone-300 italic leading-relaxed">
              &quot;Melhor atendimento da região. Ambiente top e pontualidade britânica.&quot;
            </p>
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wide">
              — André S. <span className="text-[10px] text-stone-500 font-normal">• Cliente do Clube VIP</span>
            </p>
          </div>
        </section>

        {/* 6. FOOTER */}
        <footer className="mt-auto pt-6 pb-8 px-6 text-center border-t border-stone-800/60 bg-[#070709]">
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


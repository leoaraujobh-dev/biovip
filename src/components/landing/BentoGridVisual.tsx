'use client'

import React, { useState, useEffect } from 'react'
import {
  Sparkles,
  Clock,
  CheckCircle2,
  Navigation,
  Star,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Heart,
  Car,
  X,
  Phone,
  Video,
  CheckCheck,
  Smile,
  Paperclip,
  Mic,
  MessageCircle
} from 'lucide-react'

export default function BentoGridVisual() {
  // Estado para o slider Antes/Depois do Card 2
  const [sliderPos, setSliderPos] = useState(50)

  // Estado para o Popup Fictício de Demonstração do WhatsApp
  const [isWhatsAppDemoOpen, setIsWhatsAppDemoOpen] = useState(false)

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsWhatsAppDemoOpen(false)
      }
    }
    if (isWhatsAppDemoOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isWhatsAppDemoOpen])

  return (
    <section id="recursos" className="relative py-20 lg:py-28 bg-[#09090B] overflow-hidden border-t border-zinc-800/80">
      {/* Luz ambiente suave */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#E2B857]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-main relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Engenharia de Conversão
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-zinc-100 font-normal tracking-tight leading-tight mb-4">
            Desenhado para <span className="text-[#E2B857] italic">Vender Mais</span> sem Esforço
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
            Elimine as dúvidas que travam o agendamento e transforme visitantes em clientes pagantes com demonstrações visuais.
          </p>
        </div>

        {/* BENTO GRID (4 CARDS VISUAIS DE ALTO PADRÃO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ========================================================= */}
          {/* CARD 1 (DESTAQUE GRANDE - 2 COLUNAS LG) */}
          {/* ========================================================= */}
          <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-[#121217] border border-zinc-800 hover:border-[#E2B857]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group reveal-scale delay-100">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E2B857] px-3 py-1 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/20 font-bold">
                  ✦ Filtro Anti-Curiosos
                </span>
                <span className="text-xs text-zinc-500 font-mono">Conversão Qualificada</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-2">
                Catálogo com Preços & Filtro de Curiosos
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed max-w-lg mb-6">
                Sua cliente já chega sabendo o tempo e o valor de cada procedimento. Você para de perder horas respondendo <span className="text-zinc-200 font-semibold">&quot;qual o preço?&quot;</span> para quem só quer especular.
              </p>
            </div>

            {/* Simulação Visual de Procedimento */}
            <div 
              onClick={() => setIsWhatsAppDemoOpen(true)}
              className="rounded-2xl p-4 sm:p-5 bg-[#09090B]/90 border border-zinc-800/90 hover:border-[#E2B857]/40 shadow-2xl transition-all cursor-pointer group/card"
              title="Clique para ver a demonstração da mensagem que chega no WhatsApp"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-700">
                    <img
                      src="https://images.unsplash.com/photo-1639629509821-c54cdd984227?w=400&auto=format&fit=crop&q=80"
                      alt="Volume Russo Imperial"
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[8px] font-mono text-[#E2B857] font-bold">
                      TOP
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-zinc-100 group-hover/card:text-[#E2B857] transition-colors">
                        Volume Russo Imperial
                      </h4>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                        Alta Procura
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1 text-zinc-300">
                        <Clock className="w-3.5 h-3.5 text-[#E2B857]" /> Duração: 2h00
                      </span>
                      <span>•</span>
                      <span>Manutenção a cada 21 dias</span>
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono block">Valor Fechado</span>
                    <span className="text-xl sm:text-2xl font-bold font-mono text-[#E2B857]">R$ 180,00</span>
                  </div>

                  {/* Botão de Demonstração Interativo */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsWhatsAppDemoOpen(true)
                    }}
                    className="mt-2 px-4 py-2 rounded-xl bg-[#22C55E] hover:bg-[#1eb054] text-white text-xs font-bold transition shadow-[0_0_18px_rgba(34,197,94,0.4)] flex items-center gap-1.5 cursor-pointer active:scale-95 group/btn"
                    title="Clique para ver a demonstração da mensagem que chega no WhatsApp"
                  >
                    <span>Agendar</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> 85% menos mensagens de curiosos no WhatsApp
                </span>
                <span className="text-[#E2B857] flex items-center gap-1 font-mono text-[9.5px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
                  Toque para testar o WhatsApp
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 2: ANTES E DEPOIS INTERATIVO */}
          {/* ========================================================= */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#121217] border border-zinc-800 hover:border-[#E2B857]/40 transition-all duration-300 shadow-xl flex flex-col justify-between reveal-scale delay-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E2B857] px-3 py-1 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/20 font-bold">
                  ✦ Slider Interativo
                </span>
                <span className="text-xs text-zinc-500 font-mono">Arraste ⬌</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">
                Antes e Depois Interativo
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                Prove o valor do seu trabalho em segundos. A cliente arrasta e vê a transformação com os próprios olhos.
              </p>
            </div>

            {/* Slider Funcional Antes e Depois */}
            <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden select-none border border-zinc-800">
              {/* Imagem DEPOIS (Fundo Total) */}
              <img
                src="https://images.unsplash.com/photo-1639629509821-c54cdd984227?w=600&auto=format&fit=crop&q=80"
                alt="Depois da Transformação - Volume Russo"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#09090B]/80 text-[#E2B857] text-[10px] font-mono font-bold border border-[#E2B857]/30 backdrop-blur-sm z-10">
                DEPOIS
              </span>

              {/* Imagem ANTES (Recortada pela posição do slider) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1701285857712-48cacba95a8f?w=600&auto=format&fit=crop&q=80"
                  alt="Antes da Transformação - Natural"
                  className="absolute inset-y-0 left-0 h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '320px' }}
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#09090B]/80 text-zinc-300 text-[10px] font-mono font-bold border border-zinc-700 backdrop-blur-sm z-10">
                  ANTES
                </span>
              </div>

              {/* Linha Divisória com Botão Central de Arraste */}
              <div
                className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#E2B857] text-stone-950 font-bold flex items-center justify-center text-xs shadow-xl cursor-ew-resize">
                  ⬌
                </div>
              </div>

              {/* Input Invisível para Arrastar em Mobile e Desktop */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
                aria-label="Controle de Antes e Depois"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 3: LOCALIZAÇÃO A 1 TOQUE (WAZE, GOOGLE MAPS, UBER) */}
          {/* ========================================================= */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#121217] border border-zinc-800 hover:border-[#E2B857]/40 transition-all duration-300 shadow-xl flex flex-col justify-between reveal-scale delay-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E2B857] px-3 py-1 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/20 font-bold">
                  ✦ Rotas com 1 Toque
                </span>
                
                {/* Indicador Aberto Agora */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Aberto Agora</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">
                Localização & Rotas Instantâneas
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                Acabe com clientes perdidas ou atrasadas. Rotas diretas no GPS favorito em um único toque.
              </p>
            </div>

            {/* Simulação Visual do Card de Endereço */}
            <div className="rounded-2xl p-4 bg-[#09090B] border border-zinc-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E2B857]/15 border border-[#E2B857]/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#E2B857]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-zinc-200 truncate">Edifício Trade Center • Sala 918</p>
                  <span className="text-[10px] text-zinc-500 truncate block">Bairro Nobre • Estacionamento com manobrista</span>
                </div>
              </div>

              {/* Botões de Navegação Direta */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800/80">
                <div className="py-2 px-1 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-center text-zinc-300 hover:text-white hover:border-[#E2B857]/40 transition flex items-center justify-center gap-1">
                  <Navigation className="w-3 h-3 text-[#E2B857]" /> Waze
                </div>
                <div className="py-2 px-1 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-center text-zinc-300 hover:text-white hover:border-[#E2B857]/40 transition flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" /> Maps
                </div>
                <div className="py-2 px-1 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-center text-zinc-300 hover:text-white hover:border-[#E2B857]/40 transition flex items-center justify-center gap-1">
                  <Car className="w-3 h-3 text-sky-400" /> Uber
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 4: AUTORIDADE & PROVA SOCIAL (2 COLUNAS LG) */}
          {/* ========================================================= */}
          <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-[#121217] border border-zinc-800 hover:border-[#E2B857]/40 transition-all duration-300 shadow-xl flex flex-col justify-between reveal-scale delay-400">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E2B857] px-3 py-1 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/20 font-bold inline-block mb-2">
                  ✦ Prova Social Imbatível
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">
                  Autoridade Instantânea
                </h3>
              </div>

              {/* Selo Dourado Verificado */}
              <div className="px-3.5 py-1.5 rounded-full bg-[#E2B857]/15 border border-[#E2B857]/40 flex items-center gap-1.5 text-xs font-mono text-[#E2B857] font-bold shrink-0">
                <ShieldCheck className="w-4 h-4" />
                <span>Profissional Verificado BioVip</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 max-w-xl">
              Transmita o mesmo peso e segurança das marcas de luxo globais. Sua cliente percebe o valor do seu atendimento logo nos primeiros segundos.
            </p>

            {/* Contadores e Avaliações */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#09090B] border border-zinc-800">
              <div className="text-center sm:text-left border-b sm:border-b-0 sm:border-r border-zinc-800 pb-3 sm:pb-0 sm:pr-4">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white block">+2.400</span>
                <span className="text-[11px] text-zinc-400">Atendimentos Realizados</span>
              </div>

              <div className="text-center sm:text-left border-b sm:border-b-0 sm:border-r border-zinc-800 py-3 sm:py-0 sm:px-4">
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E2B857] text-[#E2B857]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-zinc-200 block">Nota 5.0 Estrelas</span>
                <span className="text-[10px] text-zinc-500">Google & Clientes VIP</span>
              </div>

              <div className="text-center sm:text-left pt-3 sm:pt-0 sm:pl-4">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 block">100%</span>
                <span className="text-[11px] text-zinc-400">Entregue Pronto em 24h</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* MODAL FICTÍCIO DE DEMONSTRAÇÃO: MENSAGEM NO WHATSAPP       */}
      {/* ========================================================= */}
      {isWhatsAppDemoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
          onClick={() => setIsWhatsAppDemoOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-[#0B141A] border border-zinc-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden font-sans text-zinc-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho Oficial do WhatsApp (Dark Mode) */}
            <div className="bg-[#202C33] px-4 py-3 flex items-center justify-between border-b border-zinc-700/50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-emerald-500/50 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                    alt="Isabela Fontes"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#202C33]" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="font-semibold text-sm text-zinc-100 truncate">
                      Isabela Fontes • Lash Studio
                    </h4>
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] text-white font-bold shrink-0">
                      ✓
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    online • responde rápido
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <button
                  type="button"
                  onClick={() => setIsWhatsAppDemoOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                  title="Fechar demonstração"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Banner de Contexto da Demonstração */}
            <div className="bg-gradient-to-r from-amber-500/15 via-[#E2B857]/20 to-amber-500/15 border-b border-[#E2B857]/30 px-3.5 py-2 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E2B857] font-bold block">
                ✦ Simulação do Filtro Anti-Curiosos
              </span>
              <p className="text-[11px] text-zinc-300 leading-snug mt-0.5">
                Veja como a cliente chega pronta no seu WhatsApp: sem perguntar &quot;qual o preço?&quot;, decidida a fechar!
              </p>
            </div>

            {/* Área de Conversa do WhatsApp (Fundo Escuro) */}
            <div className="p-4 space-y-3 bg-[#0B141A] max-h-[380px] overflow-y-auto text-xs">
              
              {/* Badge de Data Centralizada */}
              <div className="flex justify-center">
                <span className="px-2.5 py-0.5 rounded-md bg-[#182229] text-[10px] text-zinc-400 font-mono uppercase">
                  HOJE
                </span>
              </div>

              {/* Mensagem de Criptografia */}
              <div className="p-2 rounded-lg bg-[#182229]/70 text-[9.5px] text-amber-200/80 text-center leading-relaxed border border-amber-500/10">
                🔒 As mensagens desta simulação ilustram o fluxo real de agendamento gerado pelo BioVip.
              </div>

              {/* Balão 1: Mensagem enviada pela cliente (Lado Direito - Verde WhatsApp #005C4B) */}
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-none p-3 bg-[#005C4B] text-[#E9EDEF] shadow-md space-y-1.5 border border-emerald-600/30">
                  <p className="text-[11px] sm:text-xs leading-relaxed">
                    Olá Isabela! Vi seu catálogo de procedimentos no <strong>BioVip</strong> ✨
                  </p>
                  
                  <div className="p-2 rounded-xl bg-black/25 text-[10.5px] space-y-1 border border-white/5">
                    <div className="flex items-center justify-between text-[#E2B857] font-semibold">
                      <span>Volume Russo Imperial</span>
                      <span>R$ 180,00</span>
                    </div>
                    <p className="text-[9.5px] text-zinc-300 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> Duração: 2h00 • Manutenção 21 dias
                    </p>
                  </div>

                  <p className="text-[11px] sm:text-xs leading-relaxed">
                    Você tem disponibilidade nesta <strong>quinta-feira ou sexta-feira à tarde</strong>? Já quero deixar marcado! 📅
                  </p>

                  <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200/80 pt-0.5">
                    <span>14:32</span>
                    <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                </div>
              </div>

              {/* Balão 2: Resposta Automática do Studio (Lado Esquerdo - Cinza WhatsApp #202C33) */}
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-none p-3 bg-[#202C33] text-[#E9EDEF] shadow-md space-y-1.5 border border-zinc-700/40">
                  <p className="text-[11px] sm:text-xs leading-relaxed">
                    Olá! Que maravilha falar com você! 😍 O Volume Russo fica espetacular!
                  </p>
                  <p className="text-[11px] sm:text-xs leading-relaxed">
                    Tenho sim! Seguem os horários livres para esta semana:
                  </p>
                  <div className="text-[10.5px] font-mono text-[#E2B857] bg-black/30 p-2 rounded-lg space-y-0.5">
                    <div>• Quinta-feira às 14:00</div>
                    <div>• Sexta-feira às 15:30</div>
                  </div>
                  <p className="text-[11px] sm:text-xs leading-relaxed">
                    Qual desses fica melhor para você? Já confirmo na agenda agora mesmo! ✨
                  </p>
                  <div className="flex items-center justify-end text-[9px] text-zinc-400 pt-0.5">
                    <span>14:33</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Barra de Digitação Fictícia do WhatsApp */}
            <div className="px-3 py-2 bg-[#202C33] flex items-center gap-2 border-t border-zinc-700/50">
              <Smile className="w-5 h-5 text-zinc-400 shrink-0" />
              <Paperclip className="w-5 h-5 text-zinc-400 shrink-0" />
              <div className="flex-1 py-1.5 px-3 rounded-xl bg-[#2A3942] text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Quinta-feira às 14:00 por favor!</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-white shrink-0 shadow">
                <Mic className="w-4 h-4" />
              </div>
            </div>

            {/* Rodapé de Conversão do Modal */}
            <div className="p-4 bg-[#111B21] border-t border-zinc-800 space-y-2.5">
              <a
                href="https://wa.me/5531991390202?text=Ol%C3%A1!%20Gostei%20do%20filtro%20anti-curiosos%20do%20BioVip%20e%20quero%20o%20meu%20pronto%20em%2024h."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#22C55E] hover:bg-[#1eb054] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)] transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quero Meu BioVip com Esse Filtro de Vendas</span>
              </a>

              <button
                type="button"
                onClick={() => setIsWhatsAppDemoOpen(false)}
                className="w-full py-2 text-center text-xs text-zinc-400 hover:text-white transition cursor-pointer"
              >
                Voltar à página
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}

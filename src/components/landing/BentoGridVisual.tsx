'use client'

import React, { useState } from 'react'
import { Sparkles, Clock, CheckCircle2, Navigation, Star, MapPin, ArrowUpRight, ShieldCheck, Heart, Car } from 'lucide-react'

export default function BentoGridVisual() {
  // Estado para o slider Antes/Depois do Card 2
  const [sliderPos, setSliderPos] = useState(50)

  return (
    <section id="recursos" className="relative py-20 lg:py-28 bg-[#09090B] overflow-hidden border-t border-zinc-800/80">
      {/* Luz ambiente suave */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#E2B857]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-main relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
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
          <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-[#121217] border border-zinc-800 hover:border-[#E2B857]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group">
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
            <div className="rounded-2xl p-4 sm:p-5 bg-[#09090B]/90 border border-zinc-800/90 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-700">
                    <img
                      src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&auto=format&fit=crop&q=80"
                      alt="Volume Russo Imperial"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[8px] font-mono text-[#E2B857] font-bold">
                      TOP
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-zinc-100">
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
                  <a
                    href="https://wa.me/5531991390202?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20o%20Volume%20Russo%20Imperial."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-4 py-2 rounded-xl bg-[#22C55E] hover:bg-[#1eb054] text-white text-xs font-bold transition shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center gap-1.5"
                  >
                    <span>Agendar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3 h-3" /> 85% menos mensagens de curiosos no WhatsApp
                </span>
                <span className="text-zinc-500 hidden sm:inline">Cliente já clica decidida a fazer</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 2: ANTES E DEPOIS INTERATIVO */}
          {/* ========================================================= */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#121217] border border-zinc-800 hover:border-[#E2B857]/40 transition-all duration-300 shadow-xl flex flex-col justify-between">
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
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80"
                alt="Depois"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] font-mono text-[#E2B857] font-bold z-10">
                DEPOIS (VIP)
              </span>

              {/* Imagem ANTES (Cortada pelo Slider) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80"
                  alt="Antes"
                  className="absolute inset-y-0 left-0 max-w-none h-full object-cover"
                  style={{ width: '100%', minWidth: '320px' }}
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] font-mono text-zinc-300 font-bold z-10">
                  ANTES
                </span>
              </div>

              {/* Linha Divisória com Controle Central */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#E2B857] shadow-[0_0_10px_#E2B857]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#E2B857] border-2 border-black flex items-center justify-center text-black font-bold text-[10px] shadow-lg cursor-ew-resize">
                  ⬌
                </div>
              </div>

              {/* Input Range Invisível para Drag Suave */}
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label="Controle deslizante antes e depois"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 3: LOCALIZAÇÃO COM 1 TOQUE (WAZE, MAPS, UBER) */}
          {/* ========================================================= */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[#121217] border border-zinc-800 hover:border-[#E2B857]/40 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#E2B857] px-3 py-1 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/20 font-bold">
                  ✦ Rota Automática
                </span>
                {/* Indicador Aberto Agora */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Aberto Agora
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">
                Localização com 1 Toque
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
                Sem mandar texto ou print de mapa. A cliente clica e o GPS abre traçando a rota direto para a porta do seu espaço.
              </p>
            </div>

            {/* Botoes Waze, Google Maps e Uber */}
            <div className="p-3.5 rounded-2xl bg-[#09090B] border border-zinc-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#E2B857] shrink-0" />
                <span className="truncate">Savassi • Belo Horizonte, MG</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center hover:border-cyan-400/40 transition">
                  <span className="text-[10px] font-bold text-cyan-400 block">Waze</span>
                  <span className="text-[8px] text-zinc-500">Traçar</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center hover:border-blue-400/40 transition">
                  <span className="text-[10px] font-bold text-blue-400 block">Maps</span>
                  <span className="text-[8px] text-zinc-500">Google</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center hover:border-zinc-300/40 transition">
                  <span className="text-[10px] font-bold text-zinc-200 block">Uber</span>
                  <span className="text-[8px] text-zinc-500">Pedir Carro</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 4: AUTORIDADE INSTANTÂNEA */}
          {/* ========================================================= */}
          <div className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-[#121217] border border-zinc-800 hover:border-[#E2B857]/40 transition-all duration-300 shadow-xl flex flex-col justify-between">
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
    </section>
  )
}


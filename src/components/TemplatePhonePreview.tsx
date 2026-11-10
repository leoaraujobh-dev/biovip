'use client'

import React from 'react'
import { PageTemplate } from '@/data/pageTemplates'

interface TemplatePhonePreviewProps {
  template: PageTemplate
  clientName?: string
}

export default function TemplatePhonePreview({ template, clientName = 'Seu Bio Site' }: TemplatePhonePreviewProps) {
  // Proporções exatas do iPhone das imagens do concorrente
  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: '210px',
        height: '445px'
      }}
      aria-hidden="true"
    >
      {/* Carcaça Externa do iPhone */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: '32px',
          background: 'linear-gradient(145deg, #2b2b2b 0%, #151515 50%, #262626 100%)',
          boxShadow: '0 20px 40px -12px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.15)',
          padding: '7px'
        }}
      >
        {/* Tela Interna */}
        <div
          className="relative h-full w-full overflow-hidden bg-[#faf8f5] text-stone-900 flex flex-col"
          style={{
            borderRadius: '25px',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute left-1/2 z-30 -translate-x-1/2 pointer-events-none"
            style={{
              top: '6px',
              width: '60px',
              height: '16px',
              borderRadius: '999px',
              background: '#000'
            }}
          />

          {/* CONTEÚDO ESPECÍFICO DE CADA MODELO */}
          <div className="flex-1 overflow-y-auto px-3.5 pt-7 pb-4 text-[9px] font-sans">
            {/* 1. SERVIÇOS E PREÇOS */}
            {template.previewType === 'services' && (
              <div className="space-y-2.5">
                <div className="text-center pt-1 pb-1">
                  <h4 className="font-serif font-bold text-[12px] text-stone-900 leading-tight">Serviços & Preços</h4>
                  <p className="text-[7.5px] text-stone-500 font-mono">Tabela com agendamento</p>
                </div>
                <div className="flex gap-1 justify-center pb-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#2d5043] text-white text-[7px] font-bold">Todos</span>
                  <span className="px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-700 text-[7px]">Principais</span>
                </div>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-xl bg-white border border-stone-200 shadow-2xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[8.5px] text-stone-900">Limpeza & Avaliação</div>
                      <div className="text-[7px] text-stone-500">45 minutos · Completa</div>
                    </div>
                    <div className="font-mono font-bold text-[8.5px] text-stone-900">R$ 180</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-stone-200 shadow-2xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[8.5px] text-stone-900">Harmonização Facial</div>
                      <div className="text-[7px] text-stone-500">60 minutos · Protocolo VIP</div>
                    </div>
                    <div className="font-mono font-bold text-[8.5px] text-stone-900">R$ 950</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-stone-200 shadow-2xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[8.5px] text-stone-900">Clareamento a Laser</div>
                      <div className="text-[7px] text-stone-500">2 sessões inclusas</div>
                    </div>
                    <div className="font-mono font-bold text-[8.5px] text-stone-900">R$ 650</div>
                  </div>
                </div>
                <button type="button" className="w-full py-1.5 rounded-xl bg-[#2d5043] text-white font-bold text-[8px] text-center shadow-xs">
                  Agendar no WhatsApp
                </button>
              </div>
            )}

            {/* 2. ANTES E DEPOIS */}
            {template.previewType === 'before_after' && (
              <div className="space-y-2 text-center pt-1">
                <h4 className="font-serif font-bold text-[12px] text-stone-900">Antes e Depois</h4>
                <p className="text-[7.5px] text-stone-500 font-mono">Arraste para comparar</p>
                <div className="relative w-full h-36 rounded-2xl bg-gradient-to-r from-stone-300 via-stone-400 to-stone-500 overflow-hidden border border-stone-300 shadow-xs flex items-center justify-center">
                  <span className="absolute left-2 top-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[7px] font-mono">Antes</span>
                  <span className="absolute right-2 top-2 px-1.5 py-0.5 rounded bg-[#2d5043] text-white text-[7px] font-mono font-bold">Depois</span>
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white shadow-md flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white shadow-md border border-stone-300 flex items-center justify-center text-[7px] text-stone-700 font-bold">
                      ↔
                    </div>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-white border border-stone-200 text-left">
                  <div className="font-bold text-[8px] text-stone-900">Caso #04 · Lentes em Resina</div>
                  <div className="text-[7px] text-stone-500 leading-tight">Alinhamento, cor natural e fechamento de diastemas em sessão única.</div>
                </div>
                <button type="button" className="w-full py-1.5 rounded-xl bg-[#2d5043] text-white font-bold text-[8px] shadow-xs">
                  Quero Esse Resultado
                </button>
              </div>
            )}

            {/* 3. AGENDA */}
            {template.previewType === 'booking' && (
              <div className="space-y-2 pt-1">
                <div className="text-center">
                  <h4 className="font-serif font-bold text-[12px] text-stone-900">Agende sua sessão</h4>
                  <p className="text-[7.5px] text-stone-500 font-mono">Horários livres em tempo real</p>
                </div>
                <div className="p-2 rounded-xl bg-white border border-stone-200 space-y-1.5">
                  <span className="text-[7.5px] font-bold text-stone-700">Selecione o Dia:</span>
                  <div className="grid grid-cols-4 gap-1 text-center font-mono">
                    <div className="p-1 rounded bg-[#2d5043] text-white font-bold text-[7px]">Seg 10</div>
                    <div className="p-1 rounded bg-stone-100 text-stone-700 text-[7px]">Ter 11</div>
                    <div className="p-1 rounded bg-stone-100 text-stone-700 text-[7px]">Qua 12</div>
                    <div className="p-1 rounded bg-stone-100 text-stone-700 text-[7px]">Qui 13</div>
                  </div>
                  <span className="text-[7.5px] font-bold text-stone-700 block pt-1">Horário Disponível:</span>
                  <div className="grid grid-cols-3 gap-1 text-center font-mono">
                    <div className="py-1 rounded border border-stone-300 text-[7.5px]">09:30</div>
                    <div className="py-1 rounded bg-stone-900 text-white font-bold text-[7.5px]">14:00</div>
                    <div className="py-1 rounded border border-stone-300 text-[7.5px]">16:30</div>
                  </div>
                </div>
                <button type="button" className="w-full py-1.5 rounded-xl bg-[#2d5043] text-white font-bold text-[8px] shadow-xs">
                  Confirmar Horário
                </button>
              </div>
            )}

            {/* 4. AVALIAÇÕES */}
            {template.previewType === 'reviews' && (
              <div className="space-y-2 pt-1">
                <div className="text-center">
                  <h4 className="font-serif font-bold text-[12px] text-stone-900">Avaliações</h4>
                  <div className="text-amber-500 text-[9px] pt-0.5">★★★★★ <span className="text-stone-800 font-bold font-mono">4.9 / 5.0</span></div>
                  <p className="text-[7px] text-stone-500 font-mono">Google Reviews Verificado</p>
                </div>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-xl bg-white border border-stone-200">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-bold text-[8px] text-stone-900">Mariana Ribeiro</span>
                      <span className="text-amber-500 text-[7px]">★★★★★</span>
                    </div>
                    <p className="text-[7px] text-stone-600 leading-tight">"Atendimento impecável! O consultório é lindo e o resultado superou todas as expectativas."</p>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-stone-200">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-bold text-[8px] text-stone-900">Carlos Eduardo</span>
                      <span className="text-amber-500 text-[7px]">★★★★★</span>
                    </div>
                    <p className="text-[7px] text-stone-600 leading-tight">"Pontualidade nota 10 e equipe muito atenciosa. Recomendo de olhos fechados."</p>
                  </div>
                </div>
                <button type="button" className="w-full py-1.5 rounded-xl border border-stone-300 text-stone-800 font-bold text-[7.5px]">
                  Deixar Minha Avaliação
                </button>
              </div>
            )}

            {/* 5. GALERIA EDITORIAL */}
            {template.previewType === 'editorial_gallery' && (
              <div className="space-y-2 pt-1">
                <div className="text-center">
                  <h4 className="font-serif font-bold text-[12px] text-stone-900">Galeria Editorial</h4>
                  <p className="text-[7.5px] text-stone-500 font-mono">Portfólio em alta definição</p>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="h-20 rounded-xl bg-stone-300 overflow-hidden relative border border-stone-200">
                    <span className="absolute bottom-1 left-1 px-1 rounded bg-black/60 text-white text-[6px]">Editorial 01</span>
                  </div>
                  <div className="h-20 rounded-xl bg-stone-400 overflow-hidden relative border border-stone-200">
                    <span className="absolute bottom-1 left-1 px-1 rounded bg-black/60 text-white text-[6px]">Ensaio VIP</span>
                  </div>
                  <div className="col-span-2 h-16 rounded-xl bg-stone-500 overflow-hidden relative border border-stone-200">
                    <span className="absolute bottom-1 left-1 px-1 rounded bg-black/60 text-white text-[6px]">Destaque Coleção</span>
                  </div>
                </div>
              </div>
            )}

            {/* 6. ÁLBUM FOTOGRÁFICO */}
            {template.previewType === 'photo_album' && (
              <div className="space-y-2 pt-1">
                <div className="text-center">
                  <h4 className="font-serif font-bold text-[12px] text-stone-900">Álbum Fotográfico</h4>
                  <p className="text-[7.5px] text-stone-500 font-mono">Categorias organizadas</p>
                </div>
                <div className="flex gap-1 justify-center pb-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-stone-900 text-white text-[6.5px]">Casamentos</span>
                  <span className="px-1.5 py-0.5 rounded bg-stone-200 text-stone-700 text-[6.5px]">Ensaios</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="h-16 rounded-lg bg-stone-300 border border-stone-200" />
                  <div className="h-16 rounded-lg bg-stone-400 border border-stone-200" />
                  <div className="h-16 rounded-lg bg-stone-300 border border-stone-200" />
                  <div className="h-16 rounded-lg bg-stone-400 border border-stone-200" />
                </div>
              </div>
            )}

            {/* 7. CINEMA / OUTROS */}
            {['cinema_gallery', 'video_showcase', 'video_gallery', 'video_featured'].includes(template.previewType) && (
              <div className="space-y-2 pt-1">
                <div className="text-center">
                  <h4 className="font-serif font-bold text-[12px] text-stone-900">{template.title}</h4>
                  <p className="text-[7.5px] text-stone-500 font-mono">Player otimizado para mobile</p>
                </div>
                <div className="w-full h-28 rounded-2xl bg-stone-800 text-white flex items-center justify-center relative shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs">
                    ▶
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-white border border-stone-200">
                  <div className="font-bold text-[8px] text-stone-900">Apresentação Exclusiva</div>
                  <div className="text-[7px] text-stone-500">Toque para assistir com som</div>
                </div>
              </div>
            )}

            {/* 8. CARDÁPIO / DELIVERY */}
            {['menu_digital', 'delivery'].includes(template.previewType) && (
              <div className="space-y-2 pt-1">
                <div className="text-center">
                  <h4 className="font-serif font-bold text-[12px] text-stone-900">{template.title}</h4>
                  <p className="text-[7.5px] text-stone-500 font-mono">Monte e envie no WhatsApp</p>
                </div>
                <div className="space-y-1.5">
                  <div className="p-1.5 rounded-xl bg-white border border-stone-200 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[8px] text-stone-900">Prato Principal Especial</div>
                      <div className="text-[7px] text-stone-500">R$ 42,90</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[7px]">+ Adicionar</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-white border border-stone-200 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[8px] text-stone-900">Sobremesa Artesanal</div>
                      <div className="text-[7px] text-stone-500">R$ 18,00</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[7px]">+ Adicionar</span>
                  </div>
                </div>
                <button type="button" className="w-full py-1.5 rounded-xl bg-[#2d5043] text-white font-bold text-[8px]">
                  Finalizar Pedido WhatsApp
                </button>
              </div>
            )}

            {/* 9. CATÁLOGO / PLANOS */}
            {['catalog_products', 'plans_packages'].includes(template.previewType) && (
              <div className="space-y-2 pt-1">
                <div className="text-center">
                  <h4 className="font-serif font-bold text-[12px] text-stone-900">{template.title}</h4>
                  <p className="text-[7.5px] text-stone-500 font-mono">Destaques com preço e pedido</p>
                </div>
                <div className="p-2 rounded-xl bg-white border border-stone-200 space-y-1">
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[6.5px] font-bold">Mais Escolhido</span>
                  <div className="font-bold text-[8.5px] text-stone-900">Plano Premium Anual</div>
                  <div className="font-mono font-bold text-[10px] text-stone-900">R$ 290 <span className="text-[7px] font-normal text-stone-500">/ano</span></div>
                  <div className="text-[7px] text-stone-500">Incluso 3 páginas adicionais + domínio</div>
                </div>
                <button type="button" className="w-full py-1.5 rounded-xl bg-[#2d5043] text-white font-bold text-[8px]">
                  Contratar Agora
                </button>
              </div>
            )}
          </div>

          {/* Home Bar do Celular */}
          <div
            className="absolute left-1/2 z-30 -translate-x-1/2 pointer-events-none"
            style={{
              bottom: '5px',
              width: '65px',
              height: '2.5px',
              borderRadius: '999px',
              background: 'rgba(0,0,0,0.3)'
            }}
          />
        </div>
      </div>
    </div>
  )
}


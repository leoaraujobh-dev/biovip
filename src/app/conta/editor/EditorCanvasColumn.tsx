'use client'

import React from 'react'
import {
  MessageCircle,
  Flame,
  Sparkles,
  CreditCard,
  Zap,
  Car,
  ShieldCheck,
  MapPin,
  Navigation,
  Copy,
  ChevronUp,
  ChevronDown,
  Download,
  Share2
} from 'lucide-react'
import { BioSiteEditorProps, SectionTabId } from '../BioSiteEditor3Col'
import { DEMO_PHOTOS } from '@/data/bioSiteDesign'

interface EditorCanvasColumnProps {
  props: BioSiteEditorProps
  mobileMode: 'editor' | 'preview'
  previewViewport: 'mobile' | 'desktop'
  previewFaqOpenIndex: number | null
  setPreviewFaqOpenIndex: React.Dispatch<React.SetStateAction<number | null>>
  previewCatalogCategory: string
  setPreviewCatalogCategory: React.Dispatch<React.SetStateAction<string>>
  effectiveGalleryConfig: any
  previewLightboxIndex: number | null
  setPreviewLightboxIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export default function EditorCanvasColumn({
  props,
  mobileMode,
  previewViewport,
  previewFaqOpenIndex,
  setPreviewFaqOpenIndex,
  previewCatalogCategory,
  setPreviewCatalogCategory,
  effectiveGalleryConfig,
  previewLightboxIndex,
  setPreviewLightboxIndex
}: EditorCanvasColumnProps) {
  return (
        <section
          className={`flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-[#070709] relative overflow-hidden ${
            mobileMode === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Fundo com iluminação sutil de estúdio */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 35%, ${props.selectedPalette.accent}33 0%, transparent 65%)`
            }}
          />

          {/* Smartphone Frame Mockup */}
          <div
            className={`relative transition-all duration-300 flex flex-col items-center justify-center max-w-full ${
              previewViewport === 'desktop' && 'lg:max-w-xl lg:w-full'
            }`}
            style={{
              width: previewViewport === 'desktop' ? undefined : '290px',
              height: previewViewport === 'desktop' ? '92%' : '600px',
              maxHeight: '94vh'
            }}
          >
            {/* Moldura do Aparelho */}
            <div
              className="relative h-full w-full rounded-[42px] p-[9px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-stone-700/60 overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(145deg, #2d2d30 0%, #121214 45%, #252528 100%)'
              }}
            >
              {/* Tela do BioSite com Paleta Ativa */}
              <div
                className="relative h-full w-full rounded-[34px] overflow-y-auto flex flex-col text-center scrollbar-none transition-colors duration-300"
                style={{
                  backgroundColor: props.selectedPalette.bg,
                  color: props.selectedPalette.text
                }}
              >
                {/* 1. Barra de Anúncio Superior (se ativada) */}
                {props.announcementData?.enabled && (
                  <div
                    className="py-1.5 px-3 text-[8px] font-mono font-bold flex items-center justify-center gap-1.5 border-b"
                    style={{
                      backgroundColor: `${props.selectedPalette.accent}20`,
                      borderColor: `${props.selectedPalette.accent}40`,
                      color: props.selectedPalette.text
                    }}
                  >
                    <span
                      className="px-1.5 py-0.2 rounded-full uppercase text-[7px]"
                      style={{
                        backgroundColor: props.selectedPalette.accent,
                        color: props.selectedPalette.buttonText || '#000'
                      }}
                    >
                      ● {props.announcementData.badge}
                    </span>
                    <span className="truncate">{props.announcementData.text}</span>
                  </div>
                )}

                {/* Ilha Dinâmica e Registro no Topo */}
                <div className="relative z-20 pt-2 px-4 flex items-center justify-between text-[7px] font-mono tracking-widest text-stone-400 uppercase">
                  <div className="w-14 h-3 bg-black rounded-full mx-auto" />
                  <span className="font-bold opacity-80 absolute right-4 top-2 text-[8px]">
                    {props.registrationCode}
                  </span>
                </div>

                {/* Foto do Perfil com Efeito de Fusão de Estúdio */}
                <div className="relative w-full h-40 overflow-hidden -mt-2 select-none shrink-0">
                  <img
                    src={props.customPhotoSrc || (props.demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)}
                    alt={props.businessTitle || props.brandName}
                    className="w-full h-full object-cover"
                  />
                  {props.photoTreatment !== 'original' && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(to bottom, transparent 35%, ${props.selectedPalette.bg} 98%)`
                      }}
                    />
                  )}
                </div>

                {/* Bloco de Informações Principais */}
                <div className="px-3.5 pt-1 pb-6 flex-1 flex flex-col items-center">
                  <span
                    className="text-[8px] font-mono uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-full border mb-1"
                    style={{
                      backgroundColor: `${props.selectedPalette.card}cc`,
                      color: props.selectedPalette.accent,
                      borderColor: `${props.selectedPalette.accent}33`
                    }}
                  >
                    {props.niche.toUpperCase()}
                  </span>

                  <h3
                    className="font-bold text-lg leading-tight text-balance"
                    style={{ fontFamily: props.selectedTypography.cssFont }}
                  >
                    {props.businessTitle || props.brandName}
                  </h3>

                  {/* Avaliações Google */}
                  <div className="mt-1 text-amber-400 text-[9px] flex items-center gap-1 font-mono">
                    <span>â˜…â˜…â˜…â˜…★</span>
                    <span className="opacity-80">{props.rating} ({props.reviewsCount})</span>
                  </div>

                  {/* Barra Rápida (WhatsApp & Agendar) */}
                  <div className="w-full grid grid-cols-2 gap-1.5 mt-2">
                    <div
                      className="py-1 px-2 rounded-lg border text-[8px] font-mono font-bold flex items-center justify-center gap-1"
                      style={{
                        backgroundColor: `${props.selectedPalette.card}cc`,
                        borderColor: `${props.selectedPalette.accent}33`,
                        color: props.selectedPalette.text
                      }}
                    >
                      <MessageCircle className="w-2.5 h-2.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </div>
                    <div
                      className="py-1 px-2 rounded-lg border text-[8px] font-mono font-bold flex items-center justify-center gap-1"
                      style={{
                        backgroundColor: props.selectedPalette.accent,
                        borderColor: 'transparent',
                        color: props.selectedPalette.buttonText || '#000'
                      }}
                    >
                      <span>Agendar VIP</span>
                    </div>
                  </div>

                  {/* Banner de Urgência & Cronômetro */}
                  {props.urgencyData?.enabled && (
                    <div
                      className="w-full mt-2 p-2 rounded-xl border flex items-center justify-between text-left"
                      style={{
                        backgroundColor: `${props.selectedPalette.card}ee`,
                        borderColor: `${props.selectedPalette.accent}40`
                      }}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Flame className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />
                        <div className="min-w-0">
                          <p className="text-[8px] font-bold text-amber-300 font-mono truncate">
                            {props.urgencyData.headline}
                          </p>
                          <p className="text-[7px] text-stone-400 truncate">
                            {props.urgencyData.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/50 text-amber-300 shrink-0">
                        14:52
                      </span>
                    </div>
                  )}

                  {/* Botões Principais de Ação (Configurações BioVip Oficial) */}
                  <div className="w-full space-y-1.5 mt-2">
                    {props.buttons.map((btn: any, btnIdx: number) => {
                      const isHigh = !!btn.isHighlighted || btn.variant === 'accent' || btnIdx === 0
                      const badgeText = btn.badgeText || btn.highlightBadge || (isHigh ? '⭐ MAIS ESCOLHIDO' : '')
                      const titleText = btn.label || btn.title
                      const subtitleText = btn.subtitle || ''
                      const cardImg = btn.cardImage || btn.image
                      const imgPos = btn.imagePosition || (cardImg ? 'right' : 'none')
                      const imgFit = btn.imageFitStyle || 'popout'
                      const ctaAction = btn.ctaActionText
                      const anim = btn.animation || (isHigh ? 'pulse-glow' : 'none')
                      const animClass = anim === 'pulse-glow' ? 'btn-anim-pulse' : anim === 'bounce' ? 'btn-anim-bounce' : anim === 'shimmer' ? 'relative overflow-hidden' : ''

                      let cardBg = props.selectedPalette.card || '#14161c'
                      let cardBorder = isHigh ? props.selectedPalette.accent : `${props.selectedPalette.accent}33`
                      let textColor = props.selectedPalette.text

                      if (btn.customBg) {
                        cardBg = btn.customBg
                      } else if (btn.variant === 'accent' || props.buttonStyle === 'solido_glam' || props.buttonStyle === 'solido') {
                        cardBg = props.selectedPalette.accent
                        textColor = props.selectedPalette.buttonText || '#000000'
                        cardBorder = 'rgba(255,255,255,0.45)'
                      } else if (props.buttonStyle === 'vidro_glamour' || props.buttonStyle === 'vidro') {
                        cardBg = 'rgba(255, 255, 255, 0.08)'
                        cardBorder = 'rgba(255, 255, 255, 0.22)'
                      }

                      if (btn.customText) textColor = btn.customText

                      return (
                        <div
                          key={btn.id}
                          className={`w-full p-2 rounded-xl border text-left flex items-center justify-between gap-1.5 shadow-sm transition relative overflow-hidden ${animClass}`}
                          style={{
                            backgroundColor: cardBg,
                            borderColor: cardBorder,
                            color: textColor
                          }}
                        >
                          {/* Efeito Shimmer */}
                          {(anim === 'shimmer' || props.buttonStyle === 'shimmer_ouro') && (
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              <div
                                className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                                style={{ animation: 'btn-shimmer-sweep 2.8s infinite' }}
                              />
                            </div>
                          )}

                          {badgeText && (
                            <div
                              className="absolute -top-1 right-2 px-1.5 py-0.2 rounded-full text-[6.5px] font-mono font-bold uppercase z-10 border shadow"
                              style={{
                                backgroundColor: props.selectedPalette.accent,
                                color: props.selectedPalette.buttonText || '#000',
                                borderColor: 'rgba(255,255,255,0.4)'
                              }}
                            >
                              {badgeText}
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            {cardImg && imgPos === 'left' && (
                              <div className={`shrink-0 overflow-hidden border border-white/20 ${imgFit === 'popout' ? 'w-6 h-6 rounded-full ring-1 ring-amber-400' : 'w-6 h-6 rounded-md'}`}>
                                <img src={cardImg} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <span className="font-bold text-[9.5px] block leading-tight truncate">
                                {titleText}
                              </span>
                              {subtitleText && (
                                <span className="text-[7.5px] opacity-70 block truncate">
                                  {subtitleText}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {cardImg && imgPos === 'right' && (
                              <div className={`shrink-0 overflow-hidden border border-white/20 ${imgFit === 'popout' ? 'w-6 h-6 rounded-full ring-1 ring-amber-400' : 'w-6 h-6 rounded-md'}`}>
                                <img src={cardImg} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}

                            {ctaAction && (
                              <span
                                className="px-1.5 py-0.5 rounded text-[7px] font-mono font-bold uppercase border"
                                style={{
                                  backgroundColor: `${props.selectedPalette.accent}20`,
                                  borderColor: `${props.selectedPalette.accent}40`,
                                  color: textColor
                                }}
                              >
                                {ctaAction}
                              </span>
                            )}

                            <span
                              className="text-[10px] font-bold"
                              style={{ color: props.selectedPalette.accent }}
                            >
                              →
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Botão de Quiz Anti-curiosos */}
                  {props.quizData?.enabled && (
                    <div
                      className="w-full mt-2 p-2 rounded-xl border flex items-center justify-between text-left cursor-pointer"
                      style={{
                        backgroundColor: `${props.selectedPalette.card}ff`,
                        borderColor: props.selectedPalette.accent,
                        color: props.selectedPalette.text
                      }}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="text-[8px] font-bold font-mono uppercase truncate">
                          {props.quizData.buttonLabel}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold" style={{ color: props.selectedPalette.accent }}>
                        →
                      </span>
                    </div>
                  )}

                  {/* Métricas de Autoridade */}
                  {props.metricsData && props.metricsData.length > 0 && (
                    <div
                      className="w-full grid grid-cols-3 gap-1 p-2 rounded-xl border mt-2 text-center"
                      style={{
                        backgroundColor: `${props.selectedPalette.card}80`,
                        borderColor: `${props.selectedPalette.accent}20`
                      }}
                    >
                      {props.metricsData.map((m: any, idx: number) => (
                        <div key={idx}>
                          <div className="font-serif text-[10px] font-bold" style={{ color: props.selectedPalette.accent }}>
                            {m.value}
                          </div>
                          <div className="text-[6px] font-mono uppercase opacity-70 truncate">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 10. Como Funciona Atendimento */}
                  {props.howItWorksData && props.howItWorksData.length > 0 && (
                    <div className="w-full mt-3 space-y-1.5 text-left">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: props.selectedPalette.accent }} />
                        <span className="text-[8px] font-mono uppercase tracking-widest font-bold opacity-80">
                          Como Funciona o Atendimento
                        </span>
                      </div>
                      <div className="space-y-1">
                        {props.howItWorksData.map((step: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl border flex items-start gap-2"
                            style={{
                              backgroundColor: `${props.selectedPalette.card}80`,
                              borderColor: `${props.selectedPalette.accent}20`
                            }}
                          >
                            <span
                              className="font-serif text-[11px] font-bold opacity-60 shrink-0"
                              style={{ color: props.selectedPalette.accent }}
                            >
                              {step.number}
                            </span>
                            <div className="min-w-0">
                              <div className="text-[8.5px] font-bold text-white leading-tight">
                                {step.title}
                              </div>
                              <div className="text-[7.5px] text-stone-400 leading-snug font-sans line-clamp-2">
                                {step.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 11. Catálogo Completo de Procedimentos & Preços */}
                  {props.servicesCatalogData?.enabled && props.servicesCatalogData.items && props.servicesCatalogData.items.length > 0 && (
                    <div className="w-full mt-3 space-y-2 text-left">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[7.5px] font-mono uppercase tracking-widest font-bold"
                          style={{ color: props.selectedPalette.accent }}
                        >
                          CATÁLOGO VIP
                        </span>
                        <span className="text-[7px] font-mono opacity-70">
                          {props.servicesCatalogData.items.length} procedimentos
                        </span>
                      </div>
                      <h4 className="text-[11px] font-serif font-bold text-white leading-tight">
                        {props.servicesCatalogData.headline}
                      </h4>

                      {/* Abas de Categorias */}
                      {props.servicesCatalogData.categories && props.servicesCatalogData.categories.length > 1 && (
                        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                          {props.servicesCatalogData.categories.map((cat: string) => {
                            const isActive = previewCatalogCategory === cat
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => setPreviewCatalogCategory(cat)}
                                className={`px-2 py-0.5 rounded-lg text-[7px] font-mono uppercase tracking-wider font-semibold transition whitespace-nowrap border ${
                                  isActive
                                    ? 'border-transparent text-stone-950 font-bold'
                                    : 'border-white/10 text-stone-400 hover:text-white bg-white/5'
                                }`}
                                style={{
                                  backgroundColor: isActive ? props.selectedPalette.accent : undefined
                                }}
                              >
                                {cat}
                              </button>
                            )
                          })}
                        </div>
                      )}

                      {/* Lista de Itens do Catálogo */}
                      <div className="space-y-2">
                        {props.servicesCatalogData.items
                          .filter((item: any) => previewCatalogCategory === 'TODOS' || item.category === previewCatalogCategory)
                          .slice(0, 4)
                          .map((srv: any) => {
                            const hasImage = Boolean(srv.image)
                            const isCoverLayout = hasImage && srv.imageLayout === 'cover'

                            if (isCoverLayout) {
                              return (
                                <div
                                  key={srv.id}
                                  className="p-2 rounded-xl border space-y-1.5 text-left transition overflow-hidden"
                                  style={{
                                    backgroundColor: `${props.selectedPalette.card}cc`,
                                    borderColor: `${props.selectedPalette.accent}25`
                                  }}
                                >
                                  {/* Imagem Maior de Destaque no Preview */}
                                  <div className="w-full h-20 rounded-lg overflow-hidden relative border border-white/10">
                                    <img
                                      src={srv.image}
                                      alt={srv.name}
                                      className="w-full h-full object-cover"
                                    />
                                    {srv.badge && (
                                      <span
                                        className="absolute top-1 left-1 px-1.5 py-0.2 rounded text-[6px] font-mono font-bold uppercase shadow border backdrop-blur-md"
                                        style={{
                                          backgroundColor: `${props.selectedPalette.card}e6`,
                                          borderColor: props.selectedPalette.accent,
                                          color: props.selectedPalette.accent
                                        }}
                                      >
                                        {srv.badge}
                                      </span>
                                    )}
                                    {srv.duration && (
                                      <span className="absolute top-1 right-1 bg-black/70 px-1.5 py-0.2 rounded text-[6.5px] font-mono text-stone-200">
                                        {srv.duration}
                                      </span>
                                    )}
                                  </div>

                                  <div>
                                    <h5 className="text-[9.5px] font-bold text-white leading-tight">
                                      {srv.name}
                                    </h5>
                                    {srv.description && (
                                      <p className="text-[7.5px] text-stone-300 font-sans leading-snug line-clamp-1 mt-0.5">
                                        {srv.description}
                                      </p>
                                    )}
                                  </div>

                                  <div className="pt-1 flex items-center justify-between border-t border-white/5">
                                    <span className="text-[9px] font-serif font-bold" style={{ color: props.selectedPalette.accent }}>
                                      {srv.price}
                                    </span>
                                    <span
                                      className="py-0.5 px-2 rounded text-[7px] font-bold font-mono tracking-wider uppercase transition flex items-center gap-0.5 shadow-sm"
                                      style={{
                                        backgroundColor: props.selectedPalette.accent,
                                        color: props.selectedPalette.buttonText || '#000'
                                      }}
                                    >
                                      <span>Reservar</span>
                                      <span>→</span>
                                    </span>
                                  </div>
                                </div>
                              )
                            }

                            return (
                              <div
                                key={srv.id}
                                className="p-2 rounded-xl border space-y-1 text-left transition"
                                style={{
                                  backgroundColor: `${props.selectedPalette.card}cc`,
                                  borderColor: `${props.selectedPalette.accent}25`
                                }}
                              >
                                <div className="flex items-start gap-1.5">
                                  {hasImage && (
                                    <img
                                      src={srv.image}
                                      alt={srv.name}
                                      className="w-9 h-9 rounded-lg object-cover shrink-0 border border-white/10"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-1">
                                      <div>
                                        {srv.badge && (
                                          <span
                                            className="inline-block px-1.5 py-0.2 rounded text-[6.5px] font-mono font-bold uppercase mb-0.5 border"
                                            style={{
                                              backgroundColor: `${props.selectedPalette.accent}20`,
                                              borderColor: `${props.selectedPalette.accent}40`,
                                              color: props.selectedPalette.accent
                                            }}
                                          >
                                            {srv.badge}
                                          </span>
                                        )}
                                        <h5 className="text-[9px] font-bold text-white leading-tight">
                                          {srv.name}
                                        </h5>
                                      </div>
                                      {srv.duration && (
                                        <span className="text-[7px] font-mono text-stone-400 shrink-0">
                                          {srv.duration}
                                        </span>
                                      )}
                                    </div>

                                    <p className="text-[7.5px] text-stone-400 font-sans leading-snug line-clamp-1 mt-0.5">
                                      {srv.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="pt-1 flex items-center justify-between border-t border-white/5">
                                  <span className="text-[9px] font-serif font-bold" style={{ color: props.selectedPalette.accent }}>
                                    {srv.price}
                                  </span>
                                  <span
                                    className="py-0.5 px-2 rounded text-[7px] font-bold font-mono tracking-wider uppercase transition flex items-center gap-0.5 shadow-sm"
                                    style={{
                                      backgroundColor: props.selectedPalette.accent,
                                      color: props.selectedPalette.buttonText || '#000'
                                    }}
                                  >
                                    <span>Reservar</span>
                                    <span>→</span>
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                      </div>

                      {/* Tarja de 4 Diferenciais */}
                      <div
                        className="p-1.5 rounded-lg border grid grid-cols-2 gap-1 text-[7.5px]"
                        style={{
                          backgroundColor: `${props.selectedPalette.card}66`,
                          borderColor: `${props.selectedPalette.accent}20`
                        }}
                      >
                        <div className="flex items-center gap-1 text-stone-300">
                          <CreditCard className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                          <span className="truncate">Cartão até 12x</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-300">
                          <Zap className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                          <span className="truncate">Pix Instantâneo</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-300">
                          <Car className="w-2.5 h-2.5 text-sky-400 shrink-0" />
                          <span className="truncate">Fácil Acesso</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-300">
                          <ShieldCheck className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                          <span className="truncate">Espaço VIP</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 12. Galeria de Fotos / Portfólio (Configurações Oficiais BioVip) */}
                  {effectiveGalleryConfig.enabled && effectiveGalleryConfig.photos && effectiveGalleryConfig.photos.length > 0 && (
                    <div className="w-full mt-3 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[7.5px] font-mono uppercase tracking-widest font-bold opacity-80 text-amber-300">
                          {effectiveGalleryConfig.badge || 'PORTFÓLIO & ESTRUTURA VIP'}
                        </span>
                        <span className="text-[7px] font-mono text-stone-400">
                          {effectiveGalleryConfig.photos.length} fotos
                        </span>
                      </div>

                      {effectiveGalleryConfig.headline && (
                        <p className="text-[9px] font-bold text-stone-200 leading-tight">
                          {effectiveGalleryConfig.headline}
                        </p>
                      )}

                      {/* Layout 1: Carrossel Touch Deslizante */}
                      {effectiveGalleryConfig.layout === 'carousel-snap' && (
                        <div className="flex gap-1.5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-0.5">
                          {effectiveGalleryConfig.photos.map((imgUrl: string, i: number) => (
                            <div
                              key={i}
                              onClick={() => {
                                if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(i)
                              }}
                              className={`snap-center shrink-0 w-[70%] rounded-lg overflow-hidden border border-white/10 relative group bg-stone-900 cursor-pointer shadow-sm ${
                                effectiveGalleryConfig.aspectRatio === 'portrait'
                                  ? 'aspect-[4/5]'
                                  : effectiveGalleryConfig.aspectRatio === 'landscape'
                                  ? 'aspect-[4/3]'
                                  : 'aspect-square'
                              }`}
                            >
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1.5">
                                {effectiveGalleryConfig.captions?.[i] && (
                                  <span className="text-[7px] text-stone-200 line-clamp-1 font-medium">
                                    {effectiveGalleryConfig.captions[i]}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Layout 2: Grade 2 Colunas */}
                      {effectiveGalleryConfig.layout === 'grid-2col' && (
                        <div className="grid grid-cols-2 gap-1">
                          {effectiveGalleryConfig.photos.slice(0, 6).map((imgUrl: string, i: number) => (
                            <div
                              key={i}
                              onClick={() => {
                                if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(i)
                              }}
                              className={`rounded-lg overflow-hidden border border-white/10 relative group bg-stone-900 cursor-pointer ${
                                effectiveGalleryConfig.aspectRatio === 'portrait'
                                  ? 'aspect-[4/5]'
                                  : effectiveGalleryConfig.aspectRatio === 'landscape'
                                  ? 'aspect-[4/3]'
                                  : 'aspect-square'
                              }`}
                            >
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                              {effectiveGalleryConfig.captions?.[i] && (
                                <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1 text-[6.5px] text-white line-clamp-1">
                                  {effectiveGalleryConfig.captions[i]}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Layout 3: Mosaico Dinâmico Bento (1ª Foto Grande + Grade) */}
                      {effectiveGalleryConfig.layout === 'mosaic' && (
                        <div className="grid grid-cols-2 gap-1">
                          <div
                            onClick={() => {
                              if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(0)
                            }}
                            className="col-span-2 aspect-[16/10] rounded-xl overflow-hidden border border-amber-400/30 relative group bg-stone-900 cursor-pointer shadow-md"
                          >
                            <img src={effectiveGalleryConfig.photos[0]} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-2">
                              <span className="self-start px-1.5 py-0.2 rounded text-[6.5px] font-mono font-bold bg-amber-400 text-stone-950 uppercase">
                                ⭐ Destaque
                              </span>
                              {effectiveGalleryConfig.captions?.[0] && (
                                <span className="text-[7.5px] text-white line-clamp-1 font-medium">
                                  {effectiveGalleryConfig.captions[0]}
                                </span>
                              )}
                            </div>
                          </div>
                          {effectiveGalleryConfig.photos.slice(1, 5).map((imgUrl: string, i: number) => (
                            <div
                              key={i + 1}
                              onClick={() => {
                                if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(i + 1)
                              }}
                              className="aspect-square rounded-lg overflow-hidden border border-white/10 relative group bg-stone-900 cursor-pointer"
                            >
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Layout 4: Cards Expandidos */}
                      {effectiveGalleryConfig.layout === 'scroll-cards' && (
                        <div className="space-y-1.5">
                          {effectiveGalleryConfig.photos.slice(0, 3).map((imgUrl: string, i: number) => (
                            <div
                              key={i}
                              onClick={() => {
                                if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(i)
                              }}
                              className="rounded-xl overflow-hidden border border-white/10 bg-stone-900/60 p-1 space-y-1 cursor-pointer"
                            >
                              <div className="w-full aspect-[16/10] rounded-lg overflow-hidden">
                                <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                              </div>
                              {effectiveGalleryConfig.captions?.[i] && (
                                <p className="text-[7.5px] text-stone-300 px-1 line-clamp-1">
                                  {effectiveGalleryConfig.captions[i]}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Layout 5: Grade 3 Colunas (smart_masonry / grid3) */}
                      {(effectiveGalleryConfig.layout === 'grid3' || effectiveGalleryConfig.layout === 'smart_masonry') && (
                        <div className="grid grid-cols-3 gap-1">
                          {effectiveGalleryConfig.photos.slice(0, 6).map((imgUrl: string, i: number) => (
                            <div
                              key={i}
                              onClick={() => {
                                if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(i)
                              }}
                              className={`rounded-lg overflow-hidden border border-white/10 relative group bg-stone-900 cursor-pointer ${
                                effectiveGalleryConfig.aspectRatio === 'portrait'
                                  ? 'aspect-[4/5]'
                                  : effectiveGalleryConfig.aspectRatio === 'landscape'
                                  ? 'aspect-[4/3]'
                                  : 'aspect-square'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={`Portfólio ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Sparkles className="w-2.5 h-2.5 text-white" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 13. Localização & Rotas GPS */}
                  {props.locationData?.enabled && (
                    <div className="w-full mt-3 space-y-1.5 text-left">
                      <div
                        className="p-2.5 rounded-xl border space-y-2"
                        style={{
                          backgroundColor: `${props.selectedPalette.card}cc`,
                          borderColor: `${props.selectedPalette.accent}25`
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[7px] font-mono uppercase tracking-widest font-bold opacity-75">
                            NOSSA LOCALIZAÇÃO
                          </span>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[7px] font-mono">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            {props.locationData.openStatus || 'Aberto Agora'}
                          </span>
                        </div>

                        <div className="space-y-0.5">
                          <div className="text-[9px] font-bold text-white flex items-start gap-1">
                            <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2 leading-tight">{props.locationData.address}</span>
                          </div>
                          <div className="text-[7.5px] text-stone-400 font-mono pl-3.5">
                            {props.locationData.hours}
                          </div>
                        </div>

                        {/* 4 Botões de Rota */}
                        <div className="grid grid-cols-4 gap-1 pt-1">
                          <div className="py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-[7px] font-mono font-bold flex flex-col items-center justify-center gap-0.5">
                            <Navigation className="w-2 h-2 text-sky-400" />
                            <span>Maps</span>
                          </div>
                          <div className="py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-[7px] font-mono font-bold flex flex-col items-center justify-center gap-0.5">
                            <Navigation className="w-2 h-2 text-cyan-400" />
                            <span>Waze</span>
                          </div>
                          <div className="py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-[7px] font-mono font-bold flex flex-col items-center justify-center gap-0.5">
                            <Car className="w-2 h-2 text-white" />
                            <span>Uber</span>
                          </div>
                          <div className="py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-[7px] font-mono font-bold flex flex-col items-center justify-center gap-0.5">
                            <Copy className="w-2 h-2 text-amber-400" />
                            <span>Copiar</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 14. Depoimentos de Clientes (Google Reviews) */}
                  {props.testimonialsData && props.testimonialsData.length > 0 && (
                    <div className="w-full mt-3 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[7.5px] font-mono uppercase tracking-widest font-bold opacity-80">
                          AVALIAÇÕES NO GOOGLE
                        </span>
                        <span className="text-[7.5px] font-mono text-amber-400 font-bold flex items-center gap-0.5">
                          <span>5.0</span>
                          <span>â˜…â˜…â˜…â˜…★</span>
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {props.testimonialsData.slice(0, 3).map((t: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl border space-y-1"
                            style={{
                              backgroundColor: `${props.selectedPalette.card}80`,
                              borderColor: `${props.selectedPalette.accent}20`
                            }}
                          >
                            <div className="flex items-center justify-between text-amber-400 text-[8px]">
                              <span>â˜…â˜…â˜…â˜…★</span>
                              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20">
                                ✓ Verificado
                              </span>
                            </div>
                            <p className="text-[8px] text-stone-300 font-sans italic leading-snug line-clamp-2">
                              &ldquo;{t.text}&rdquo;
                            </p>
                            <div className="text-[7px] font-mono text-stone-400">
                              {t.clientName || t.name} · {t.city || t.role}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 15. Sobre a Especialista */}
                  {props.aboutMeData?.enabled && (
                    <div className="w-full mt-3 space-y-1 text-left">
                      <div
                        className="p-2.5 rounded-xl border space-y-1"
                        style={{
                          backgroundColor: `${props.selectedPalette.card}80`,
                          borderColor: `${props.selectedPalette.accent}20`
                        }}
                      >
                        <h5 className="text-[9px] font-serif font-bold text-white">
                          {props.aboutMeData.headline}
                        </h5>
                        <p className="text-[7.5px] text-stone-300 font-sans leading-snug line-clamp-3">
                          {props.aboutMeData.paragraph || props.aboutMeData.bio}
                        </p>
                        {(props.aboutMeData.closingPhrase || props.aboutMeData.quote) && (
                          <div className="text-[7px] italic font-serif pt-0.5" style={{ color: props.selectedPalette.accent }}>
                            &ldquo;{props.aboutMeData.closingPhrase || props.aboutMeData.quote}&rdquo;
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 16. Dúvidas Frequentes (FAQ Sanfonado) */}
                  {props.faqData && props.faqData.length > 0 && (
                    <div className="w-full mt-3 space-y-1 text-left">
                      <span className="text-[7.5px] font-mono uppercase tracking-widest font-bold opacity-80 block mb-0.5">
                        DÚVIDAS FREQUENTES
                      </span>
                      <div className="space-y-1">
                        {props.faqData.slice(0, 4).map((item: any, i: number) => {
                          const isOpen = previewFaqOpenIndex === i
                          return (
                            <div
                              key={i}
                              className="rounded-lg border overflow-hidden transition"
                              style={{
                                backgroundColor: `${props.selectedPalette.card}80`,
                                borderColor: `${props.selectedPalette.accent}20`
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => setPreviewFaqOpenIndex(isOpen ? null : i)}
                                className="w-full p-2 text-left flex items-center justify-between text-[8px] font-semibold text-stone-200 hover:text-white transition cursor-pointer"
                              >
                                <span className="pr-1 leading-snug">{item.question}</span>
                                {isOpen ? <ChevronUp className="w-2.5 h-2.5 shrink-0" /> : <ChevronDown className="w-2.5 h-2.5 shrink-0" />}
                              </button>
                              {isOpen && (
                                <div className="px-2 pb-2 pt-0 text-[7.5px] text-stone-400 font-sans leading-snug border-t border-white/5 animate-fade-in">
                                  {item.answer}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* 17. Salvar Contato (.vcf) & Compartilhar */}
                  <div className="w-full grid grid-cols-2 gap-1.5 mt-3">
                    <div className="py-1.5 px-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-[7.5px] font-mono font-bold flex items-center justify-center gap-1 shadow-sm">
                      <Download className="w-2.5 h-2.5 text-amber-400" />
                      <span>Salvar Contato</span>
                    </div>
                    <div className="py-1.5 px-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-[7.5px] font-mono font-bold flex items-center justify-center gap-1 shadow-sm">
                      <Share2 className="w-2.5 h-2.5 text-sky-400" />
                      <span>Compartilhar</span>
                    </div>
                  </div>

                  {/* 18. Monograma e Assinatura Editorial de Rodapé */}
                  <div className="mt-4 pb-4 w-full flex flex-col items-center text-center">
                    <div
                      className="w-10 h-px mb-1.5 opacity-40"
                      style={{ backgroundColor: props.selectedPalette.accent }}
                    />
                    <span
                      className="font-serif italic text-sm tracking-wider select-none"
                      style={{ color: props.selectedPalette.accent }}
                    >
                      {props.monogram || 'AF'}
                    </span>
                    <div className="text-[6.5px] font-mono text-stone-500 mt-1">
                      © {new Date().getFullYear()} {props.businessTitle || props.brandName}. Todos os direitos reservados.
                    </div>
                    <div className="text-[6px] font-mono text-stone-500 hover:text-amber-400 transition mt-0.5">
                      ✨ Desenvolvido com padrão BioVip
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

  )
}

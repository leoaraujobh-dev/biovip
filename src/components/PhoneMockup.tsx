import React from 'react'
import { Project } from '@/data/projects'
import { PALETTES, TYPOGRAPHIES } from '@/data/bioSiteDesign'
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react'

interface PhoneMockupProps {
  image?: string
  project?: Project
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  priority?: boolean
  interactive?: boolean
}

export default function PhoneMockup({
  image,
  project,
  alt = 'Bio Site Preview',
  size = 'sm',
  className = '',
  interactive = false
}: PhoneMockupProps) {
  // Escalas e dimensões exatas de acordo com o design system do biovip.com.br
  const dimensions = {
    sm: {
      width: 240,
      height: 520,
      radiusOuter: 32.4,
      radiusInner: 26.6,
      padding: 7.68,
      islandTop: 8.4,
      islandW: 72,
      islandH: 20.4,
      homeBottom: 6.72,
      homeW: 76.8,
      homeH: 2.64,
      btnMuteTop: 98.8,
      btnMuteH: 18.2,
      btnVolTop: 127.4,
      btnVolH: 28.6,
      btnPowerTop: 124.8,
      btnPowerH: 41.6
    },
    md: {
      width: 320,
      height: 693,
      radiusOuter: 43.2,
      radiusInner: 35.5,
      padding: 10.24,
      islandTop: 11.2,
      islandW: 96,
      islandH: 27.2,
      homeBottom: 8.96,
      homeW: 102.4,
      homeH: 3.52,
      btnMuteTop: 131.7,
      btnMuteH: 24.3,
      btnVolTop: 169.9,
      btnVolH: 38.1,
      btnPowerTop: 166.4,
      btnPowerH: 55.5
    },
    lg: {
      width: 360,
      height: 780,
      radiusOuter: 48,
      radiusInner: 40,
      padding: 11.5,
      islandTop: 12.6,
      islandW: 108,
      islandH: 30,
      homeBottom: 10,
      homeW: 115,
      homeH: 4,
      btnMuteTop: 148,
      btnMuteH: 27,
      btnVolTop: 191,
      btnVolH: 43,
      btnPowerTop: 187,
      btnPowerH: 62
    }
  }[size]

  const palette = project ? (PALETTES.find(p => p.id === project.paletteId) || PALETTES[0]) : null
  const typography = project ? (TYPOGRAPHIES.find(t => t.id === project.typographyId) || TYPOGRAPHIES[0]) : null

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`
      }}
      aria-hidden="true"
    >
      {/* Moldura Externa de Titânio Metalizado com Bisel Chanfrado */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          borderRadius: `${dimensions.radiusOuter}px`,
          background: 'linear-gradient(145deg, #4a4a4c 0%, #1b1b1d 18%, #303032 45%, #131314 72%, #434345 100%)',
          boxShadow: size === 'sm'
            ? '0 14px 38px -12px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.22)'
            : '0 42px 96px -20px rgba(0,0,0,0.65), 0 10px 26px rgba(0,0,0,0.35)',
          padding: `${dimensions.padding}px`
        }}
      >
        {/* Tela Interna com Borda de Vidro e Luz Interna */}
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            borderRadius: `${dimensions.radiusInner}px`,
            backgroundColor: palette ? palette.bg : '#09090b',
            color: palette ? palette.text : '#ffffff',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)'
          }}
        >
          {/* Se tiver objeto project, renderiza a arquitetura nobre completa nativamente */}
          {project && palette && typography ? (
            <div className="relative h-full w-full flex flex-col overflow-hidden">
              {/* Barra Superior / Ilha Dinâmica */}
              <div className="relative z-20 pt-2 px-3 flex items-center justify-between text-[6.5px] font-mono tracking-widest text-stone-400 uppercase">
                <div className="w-11 h-2.5 bg-black rounded-full" />
                <span className="font-bold opacity-80">{project.registrationCode}</span>
              </div>

              {/* Foto de Estúdio com Dissolução Orgânica */}
              <div className="relative w-full h-[49%] overflow-hidden -mt-2 shrink-0 select-none">
                <img
                  src={project.photo}
                  alt={project.name}
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, transparent 35%, ${palette.bg}cc 75%, ${palette.bg} 98%)`
                  }}
                />

                {/* Nome e Tipografia Editorial sobreposta à base da foto */}
                <div className="absolute bottom-1 left-0 right-0 px-3 text-center">
                  <h3
                    className="font-bold text-sm tracking-tight leading-tight"
                    style={{
                      fontFamily: typography.cssFont,
                      color: palette.text
                    }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-[6.5px] font-mono uppercase tracking-[0.18em] mt-0.5 line-clamp-1"
                    style={{ color: palette.accent }}
                  >
                    {project.role}
                  </p>
                </div>
              </div>

              {/* Cartões Nobres de Conversão & Páginas Adicionais (Sem espaço vazio) */}
              <div className="px-2.5 pt-1.5 pb-2.5 space-y-1.5 flex-1 flex flex-col justify-start relative z-10">
                {/* As 3 Páginas Adicionais Pro */}
                {project.subpages && project.subpages.length > 0 && (
                  <div className="flex items-center justify-center gap-1 pb-0.5">
                    {project.subpages.slice(0, 3).map((sp) => (
                      <span
                        key={sp.slug}
                        className="px-1.5 py-0.5 rounded-full text-[5px] font-mono tracking-wider uppercase border border-white/10 bg-white/5 opacity-85 truncate"
                        style={{ color: palette.accent }}
                      >
                        {sp.title.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                )}

                {project.buttons.slice(0, 3).map((btn) => {
                  const isHigh = !!btn.isHighlighted
                  const buttonStyle = project.buttonStyle || 'cartao_nobre'

                  let cardBg: string = palette.card
                  let cardBorder: string = isHigh ? palette.accent : `${palette.accent}33`
                  let cardRadius: string = '12px'
                  let cardShadow: string = '0 3px 8px rgba(0,0,0,0.35)'
                  let textColor: string = palette.text
                  let iconBg: string = `${palette.accent}15`
                  let iconBorder: string = `${palette.accent}35`
                  let iconColor: string = palette.accent
                  let iconRadius: string = '6px'
                  let arrowColor: string = palette.accent

                  if (buttonStyle === 'vidro_glamour' || buttonStyle === 'vidro') {
                    cardBg = 'rgba(255, 255, 255, 0.08)'
                    cardBorder = 'rgba(255, 255, 255, 0.2)'
                    cardShadow = '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2)'
                  } else if (buttonStyle === 'aurora_glow') {
                    cardBorder = palette.accent
                    cardShadow = `0 0 12px ${palette.accent}55, inset 0 0 6px ${palette.accent}20`
                  } else if (buttonStyle === 'neomorfico_dark') {
                    cardBg = 'linear-gradient(145deg, #1c1e24, #101216)'
                    cardBorder = 'rgba(255,255,255,0.05)'
                    cardShadow = '4px 4px 8px rgba(0,0,0,0.65)'
                  } else if (buttonStyle === 'shimmer_ouro') {
                    cardBorder = palette.accent
                    cardShadow = `0 4px 12px rgba(0,0,0,0.4), 0 0 8px ${palette.accent}33`
                  } else if (buttonStyle === 'bicolor_luxo') {
                    cardBg = `linear-gradient(135deg, ${palette.card} 0%, ${palette.bg} 100%)`
                    cardBorder = `${palette.accent}55`
                  } else if (buttonStyle === 'flutuante_elevado' || buttonStyle === 'sombra') {
                    cardBorder = 'rgba(255,255,255,0.1)'
                    cardShadow = '0 10px 18px -2px rgba(0,0,0,0.8)'
                  } else if (buttonStyle === 'solido_glam' || buttonStyle === 'solido') {
                    cardBg = palette.accent
                    textColor = palette.buttonText || '#000000'
                    cardBorder = 'rgba(255,255,255,0.35)'
                    iconBg = 'rgba(0,0,0,0.12)'
                    iconBorder = 'rgba(0,0,0,0.2)'
                    iconColor = palette.buttonText || '#000000'
                    arrowColor = palette.buttonText || '#000000'
                  } else if (buttonStyle === 'pill_couture' || buttonStyle === 'pill') {
                    cardRadius = '9999px'
                    iconRadius = '9999px'
                  } else if (buttonStyle === 'moldura_fina' || buttonStyle === 'moldura') {
                    cardBg = 'transparent'
                    cardBorder = `${palette.accent}77`
                    cardShadow = 'none'
                  }

                  return (
                    <div
                      key={btn.id}
                      className="w-full p-1.5 flex items-center justify-between text-left relative overflow-hidden"
                      style={{
                        background: cardBg,
                        borderColor: cardBorder,
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderRadius: cardRadius,
                        boxShadow: cardShadow,
                        color: textColor
                      }}
                    >
                      {btn.isHighlighted && (
                        <div
                          className="absolute -top-1.5 right-2 px-1 py-0.2 rounded-full text-[5.5px] font-mono font-bold uppercase z-10 border shadow-xs"
                          style={{
                            backgroundColor: palette.accent,
                            color: palette.buttonText || '#000',
                            borderColor: 'rgba(255,255,255,0.4)'
                          }}
                        >
                          {btn.highlightBadge || '⭐ MAIS ESCOLHIDO'}
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <div
                          className="w-4 h-4 flex items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: iconBg,
                            borderColor: iconBorder,
                            borderRadius: iconRadius,
                            color: iconColor
                          }}
                        >
                          {btn.icon === 'calendar' ? (
                            <Calendar className="w-2 h-2" />
                          ) : btn.icon === 'map' ? (
                            <MapPin className="w-2 h-2" />
                          ) : (
                            <Sparkles className="w-2 h-2" />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <div
                            className="text-[7.5px] font-bold font-mono uppercase tracking-wider truncate"
                            style={{ color: textColor }}
                          >
                            {btn.label}
                          </div>
                          <div className="text-[6px] truncate leading-tight opacity-70" style={{ color: textColor }}>
                            {btn.subtitle}
                          </div>
                        </div>
                      </div>
                      <ArrowRight
                        className="w-2 h-2 shrink-0 ml-1"
                        style={{ color: arrowColor }}
                      />
                    </div>
                  )
                })}

                {/* Monograma de Rodapé */}
                <div className="pt-1 text-center flex flex-col items-center">
                  <div
                    className="w-6 h-px mb-0.5 opacity-40"
                    style={{ backgroundColor: palette.accent }}
                  />
                  <span
                    className="font-serif italic text-[8px]"
                    style={{ color: palette.accent }}
                  >
                    {project.monogram}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Imagem de Fundo Estática caso não haja project */
            <div
              className="relative h-full w-full overflow-hidden transition-all duration-700"
              style={{
                backgroundImage: image ? `url(${image})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          )}

          {/* Dynamic Island (Ilha Dinâmica do iPhone) */}
          <div
            className="absolute left-1/2 z-20 -translate-x-1/2 pointer-events-none"
            style={{
              top: `${dimensions.islandTop}px`,
              width: `${dimensions.islandW}px`,
              height: `${dimensions.islandH}px`,
              borderRadius: '999px',
              background: '#000',
              boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {/* Câmera e Sensor Micro */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0d1424]/80 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#1e2a4a]/90" />
            </div>
          </div>

          {/* Barra Home do iPhone no Rodapé */}
          <div
            className="absolute left-1/2 z-20 -translate-x-1/2 pointer-events-none"
            style={{
              bottom: `${dimensions.homeBottom}px`,
              width: `${dimensions.homeW}px`,
              height: `${dimensions.homeH}px`,
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.65)'
            }}
          />

          {/* Reflexo de Vidro Diagonal Hiper-Realista */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(118deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 18%, transparent 38%, transparent 72%, rgba(255,255,255,0.07) 100%)'
            }}
          />
        </div>
      </div>

      {/* Botões Metálicos Laterais (Físicos do iPhone) */}
      <span
        className="absolute"
        style={{
          left: '-1.5px',
          top: `${dimensions.btnMuteTop}px`,
          width: '2.2px',
          height: `${dimensions.btnMuteH}px`,
          borderRadius: '2px',
          background: 'linear-gradient(90deg, #5b5b5d, #2a2a2c)'
        }}
      />
      <span
        className="absolute"
        style={{
          left: '-1.5px',
          top: `${dimensions.btnVolTop}px`,
          width: '2.2px',
          height: `${dimensions.btnVolH}px`,
          borderRadius: '2px',
          background: 'linear-gradient(90deg, #5b5b5d, #2a2a2c)'
        }}
      />
      <span
        className="absolute"
        style={{
          right: '-1.5px',
          top: `${dimensions.btnPowerTop}px`,
          width: '2.2px',
          height: `${dimensions.btnPowerH}px`,
          borderRadius: '2px',
          background: 'linear-gradient(270deg, #5b5b5d, #2a2a2c)'
        }}
      />
    </div>
  )
}

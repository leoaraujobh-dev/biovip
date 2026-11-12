'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink, Radio } from 'lucide-react'
import { Project } from '@/data/projects'

interface LiveBioSitePhoneProps {
  project: Project
  className?: string
  animationClass?: string
  isPrimary?: boolean
  showBadge?: boolean
}

export default function LiveBioSitePhone({
  project,
  className = '',
  animationClass = '',
  isPrimary = false,
  showBadge = true,
}: LiveBioSitePhoneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.68)
  const [iframeHeight, setIframeHeight] = useState(780)
  const [isLoaded, setIsLoaded] = useState(false)

  // Ajusta a escala do iframe para a largura interna exata da tela do smartphone (base de 375px)
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        if (clientWidth > 0 && clientHeight > 0) {
          const newScale = clientWidth / 375
          setScale(newScale)
          setIframeHeight(clientHeight / newScale)
        }
      }
    }

    updateSize()
    const timer = setTimeout(updateSize, 100)
    const observer = new ResizeObserver(updateSize)
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  // Reseta estado de carregamento e garante exibição após 400ms mesmo se o onLoad do browser não disparar
  useEffect(() => {
    setIsLoaded(false)
    const timeout = setTimeout(() => {
      setIsLoaded(true)
    }, 450)
    return () => clearTimeout(timeout)
  }, [project.slug])

  return (
    <div
      className={`group/phone relative aspect-[9/19] rounded-[42px] sm:rounded-[46px] p-2 sm:p-2.5 bg-[#15151A] border transition-all duration-500 overflow-hidden hover:[animation-play-state:paused] ${
        isPrimary
          ? 'border-2 border-[#E2B857]/70 shadow-[0_25px_65px_rgba(226,184,87,0.22),0_0_35px_rgba(226,184,87,0.15)] z-20'
          : 'border border-zinc-700/70 hover:border-[#E2B857]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-10'
      } ${animationClass} ${className}`}
    >
      {/* Moldura Interna da Tela do iPhone */}
      <div className="w-full h-full rounded-[34px] sm:rounded-[38px] overflow-hidden bg-[#09090B] flex flex-col relative border border-white/5">
        
        {/* Barra de Status do iOS */}
        <div className="shrink-0 h-7 sm:h-8 px-3 flex items-center justify-between text-[8px] sm:text-[9px] text-zinc-400 font-mono z-30 bg-[#09090B] border-b border-white/5">
          <span className="font-semibold text-zinc-300">9:41</span>
          
          {/* Dynamic Island com Câmera */}
          <div className="w-18 sm:w-22 h-3.5 bg-black rounded-full flex items-center justify-end px-1.5 border border-zinc-800 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>

          <div className="flex items-center gap-1 text-[7.5px] sm:text-[8px] text-zinc-300">
            <span>5G</span>
            <span className="text-emerald-400 font-bold">100%</span>
          </div>
        </div>

        {/* Faixa Superior com Identificação e Link em Tempo Real */}
        {showBadge && (
          <div className="shrink-0 px-2 py-1 bg-gradient-to-r from-zinc-900 via-[#18181D] to-zinc-900 border-b border-[#E2B857]/20 flex items-center justify-between z-30">
            <div className="flex items-center gap-1 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[7.5px] sm:text-[8px] text-[#E2B857] font-mono truncate font-semibold">
                /{project.slug}
              </span>
            </div>

            <Link
              href={`/${project.slug}`}
              target="_blank"
              title="Abrir BioSite em tela cheia em nova aba"
              className="text-[7px] sm:text-[7.5px] text-zinc-300 hover:text-white px-1.5 py-0.5 rounded bg-white/5 hover:bg-[#E2B857]/20 border border-white/10 flex items-center gap-0.5 transition shrink-0 cursor-pointer"
            >
              <span>Abrir</span>
              <ExternalLink className="w-2 h-2 text-[#E2B857]" />
            </Link>
          </div>
        )}

        {/* Área Central: Iframe com o BioSite Renderizado ao Vivo */}
        <div ref={containerRef} className="relative flex-1 w-full overflow-hidden bg-[#09090B]">
          
          {/* Esqueleto Elegante de Carregamento Dark Luxury */}
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 bg-[#09090B] text-center">
              <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#E2B857] to-[#f3d489] mb-3 animate-pulse">
                <img
                  src={project.photo || project.image}
                  alt={project.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h5 className="font-serif text-xs font-bold text-zinc-200">{project.name}</h5>
              <p className="text-[9px] text-[#E2B857] font-sans mt-0.5">{project.role}</p>
              <div className="mt-3 flex items-center gap-1.5 text-[8px] text-zinc-500 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Carregando BioSite ao vivo...</span>
              </div>
            </div>
          )}

          {/* O BioSite Real Renderizado em Tempo Real dentro do Celular */}
          <iframe
            src={`/${project.slug}`}
            title={`BioSite ao Vivo: ${project.name}`}
            tabIndex={-1}
            onLoad={() => setIsLoaded(true)}
            className="border-0 select-none bg-[#09090B]"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '375px',
              height: `${Math.max(600, Math.round(iframeHeight))}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              opacity: isLoaded ? 1 : 0.8,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        </div>

        {/* Barra de Navegação Inferior (Home Indicator do iOS) */}
        <div className="shrink-0 h-3.5 bg-[#09090B] flex items-center justify-center z-30 pointer-events-none">
          <div className="w-20 h-1 bg-zinc-600/60 rounded-full" />
        </div>

      </div>
    </div>
  )
}

'use client'

import React, { useEffect, useRef, useState } from 'react'

export interface BioSiteScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  threshold?: number
}

/**
 * Componente de animação moderna orientada a scroll para módulos de BioSite.
 * Utiliza curva de desaceleração estilo Apple (cubic-bezier) e foco progressivo.
 */
export function BioSiteScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.12
}: BioSiteScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Verificação de suporte a IntersectionObserver e prefers-reduced-motion
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -30px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    // Fallback de segurança para garantir exibição garantida
    const safetyTimer = setTimeout(() => setIsVisible(true), 1200)

    return () => {
      observer.disconnect()
      clearTimeout(safetyTimer)
    }
  }, [threshold])

  const getTransitionClasses = () => {
    if (isVisible) {
      return 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0'
    }

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-7 scale-[0.985] blur-[2px]'
      case 'down':
        return 'opacity-0 -translate-y-7 scale-[0.985] blur-[2px]'
      case 'left':
        return 'opacity-0 translate-x-7 scale-[0.985] blur-[2px]'
      case 'right':
        return 'opacity-0 -translate-x-7 scale-[0.985] blur-[2px]'
      case 'scale':
        return 'opacity-0 scale-95 blur-[3px]'
      case 'fade':
      default:
        return 'opacity-0 scale-[0.99] blur-[2px]'
    }
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '750ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`transition-all transform-gpu will-change-transform ${getTransitionClasses()} ${className}`}
    >
      {children}
    </div>
  )
}

export default BioSiteScrollReveal

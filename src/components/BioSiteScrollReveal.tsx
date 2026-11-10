'use client'

import React, { useEffect, useRef, useState } from 'react'

export interface BioSiteScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  threshold?: number
  rootMargin?: string
  stagger?: boolean
}

/**
 * Componente de animação moderna orientada a scroll para módulos de BioSite.
 * Utiliza curva de desaceleração estilo Apple (cubic-bezier) e foco progressivo (blur removal).
 */
export default function BioSiteScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.04,
  rootMargin = '0px 0px 30px 0px',
  stagger = false
}: BioSiteScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Verificação de ambiente e preferência do usuário (acessibilidade)
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element) return

    // Se o elemento já estiver na viewport inicial (topo da página), revela imediatamente
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    if (rect.top <= windowHeight && rect.bottom >= 0) {
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
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  const getTransitionClasses = () => {
    if (isVisible) {
      return 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0 pointer-events-auto'
    }

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-8 scale-[0.985] blur-[3px] pointer-events-none'
      case 'down':
        return 'opacity-0 -translate-y-8 scale-[0.985] blur-[3px] pointer-events-none'
      case 'left':
        return 'opacity-0 translate-x-8 scale-[0.985] blur-[3px] pointer-events-none'
      case 'right':
        return 'opacity-0 -translate-x-8 scale-[0.985] blur-[3px] pointer-events-none'
      case 'scale':
        return 'opacity-0 scale-[0.94] blur-[4px] pointer-events-none'
      case 'fade':
      default:
        return 'opacity-0 scale-[0.99] blur-[3px] pointer-events-none'
    }
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '720ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`transition-all transform-gpu will-change-[transform,opacity,filter] ${getTransitionClasses()} ${
        stagger ? 'stagger-container' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

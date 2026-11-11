'use client'

import { useEffect } from 'react'

/**
 * Observador global de rolagem para ativar as classes:
 * - .reveal-on-scroll -> .reveal-on-scroll.is-visible
 * - .reveal-scale -> .reveal-scale.is-visible
 */
export default function ScrollRevealInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll, .reveal-scale').forEach((el) => {
        el.classList.add('is-visible')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.05,
        rootMargin: '120px 0px 60px 0px',
      }
    )

    const attach = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible), .reveal-scale:not(.is-visible)')
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight || document.documentElement.clientHeight
        if (rect.top <= vh + 100 && rect.bottom >= -100) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        } else {
          observer.observe(el)
        }
      })
    }

    attach()
    const timer = setTimeout(attach, 150)
    window.addEventListener('scroll', attach, { passive: true })

    // Observa mutações caso o conteúdo seja renderizado dinamicamente
    const mutationObserver = new MutationObserver(() => {
      attach()
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', attach)
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}


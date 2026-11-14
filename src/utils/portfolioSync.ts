'use client'

import { useState, useEffect, useCallback } from 'react'
import { projects as defaultProjects, Project } from '@/data/projects'
import { healMojibake } from '@/utils/textSanitizer'

export const PORTFOLIO_STORAGE_KEY = 'biovip_portfolio_projects'
export const PORTFOLIO_EVENT_NAME = 'biovip_portfolio_updated'

/**
 * Retorna os projetos que estão ativos no portfólio (inPortfolio !== false),
 * lendo do localStorage se disponível, com fallback nos projetos padrão.
 */
export function getActivePortfolioProjects(): Project[] {
  if (typeof window === 'undefined') {
    return defaultProjects.filter(p => p.inPortfolio !== false)
  }

  try {
    const raw = localStorage.getItem(PORTFOLIO_STORAGE_KEY)
    if (raw) {
      const parsed: Project[] = healMojibake(JSON.parse(raw))
      const active = parsed.filter(p => p.inPortfolio !== false)
      if (active.length > 0) {
        return active
      }
    }
  } catch (err) {
    console.warn('Erro ao ler biovip_portfolio_projects do localStorage:', err)
  }

  return defaultProjects.filter(p => p.inPortfolio !== false)
}

/**
 * Hook reativo para escutar em tempo real alterações nos status do portfólio no Admin
 */
export function useLivePortfolio() {
  const [activeProjects, setActiveProjects] = useState<Project[]>(() => {
    return defaultProjects.filter(p => p.inPortfolio !== false)
  })
  const [isClientReady, setIsClientReady] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now())

  const refreshPortfolio = useCallback(() => {
    const updated = getActivePortfolioProjects()
    setActiveProjects(updated)
    setLastUpdated(Date.now())
  }, [])

  useEffect(() => {
    setIsClientReady(true)
    refreshPortfolio()

    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key || e.key === PORTFOLIO_STORAGE_KEY) {
        refreshPortfolio()
      }
    }

    const handleCustomEvent = () => {
      refreshPortfolio()
    }

    const handleFocus = () => {
      refreshPortfolio()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener(PORTFOLIO_EVENT_NAME, handleCustomEvent)
    window.addEventListener('focus', handleFocus)

    // Intervalo de verificação para capturar alterações na mesma aba sem evento explícito
    const intervalId = setInterval(refreshPortfolio, 2000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener(PORTFOLIO_EVENT_NAME, handleCustomEvent)
      window.removeEventListener('focus', handleFocus)
      clearInterval(intervalId)
    }
  }, [refreshPortfolio])

  return {
    activeProjects,
    isClientReady,
    lastUpdated,
    refreshPortfolio
  }
}


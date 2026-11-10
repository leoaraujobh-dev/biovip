'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BioSiteClient from './[slug]/BioSiteClient'
import { getBioSite } from '@/services/biositeService'

/**
 * Página 404 inteligente com suporte a roteamento de BioSites dinâmicos
 * criados em tempo de execução via IA Gemini, importador ou cadastro de clientes.
 */
export default function NotFound() {
  const [loading, setLoading] = useState(true)
  const [dynamicSite, setDynamicSite] = useState<any>(null)
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Obter o slug da rota atual na barra de navegação
    const path = window.location.pathname.replace(/^\/|\/$/g, '')
    if (!path || path.includes('/')) {
      setLoading(false)
      return
    }

    setSlug(path)

    // 1. Tenta carregar do localStorage específico do biosite
    const savedSite = localStorage.getItem('biovip_site_' + path)
    if (savedSite) {
      try {
        const parsed = JSON.parse(savedSite)
        setDynamicSite(parsed)
        setLoading(false)
        return
      } catch (e) {}
    }

    // 2. Tenta carregar dos projetos de portfólio salvos
    const savedProjects = localStorage.getItem('biovip_portfolio_projects')
    if (savedProjects) {
      try {
        const list = JSON.parse(savedProjects)
        const found = list.find((p: any) => p.slug === path)
        if (found) {
          setDynamicSite(found)
          setLoading(false)
          return
        }
      } catch (e) {}
    }

    // 3. Tenta carregar do Supabase (nuvem)
    getBioSite(path)
      .then((cloudSite) => {
        if (cloudSite) {
          setDynamicSite(cloudSite)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070709] text-stone-200 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#E2B857] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-stone-400">Carregando BioSite...</span>
        </div>
      </div>
    )
  }

  // Se o biosite existe dinamicamente, renderiza o BioSiteClient completo no ar!
  if (dynamicSite && slug) {
    return (
      <BioSiteClient
        slug={slug}
        name={dynamicSite.name || slug}
        role={dynamicSite.role || dynamicSite.category || 'Atendimento Especializado'}
        category={dynamicSite.category || 'Serviços de Alto Padrão'}
        whatsapp={dynamicSite.whatsapp || '5531991390202'}
        projectImage={dynamicSite.photo}
        projectDescription={dynamicSite.bio}
      />
    )
  }

  // Se realmente não existir, exibe a tela 404 premium do BioVip
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#E2B857] flex items-center justify-center text-2xl font-serif mb-4">
        BV
      </div>
      <h1 className="text-4xl font-serif font-bold text-white mb-2">404</h1>
      <h2 className="text-lg font-medium text-stone-300 mb-2">BioSite Não Encontrado</h2>
      <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
        O endereço solicitado não foi localizado ou ainda está em processo de ativação.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#E2B857] text-xs font-bold text-stone-200 transition"
        >
          Página Inicial
        </Link>
        <Link
          href="/portfolio"
          className="px-5 py-2.5 rounded-xl bg-[#E2B857] text-stone-950 text-xs font-bold hover:bg-amber-400 transition"
        >
          Ver Vitrine
        </Link>
      </div>
    </div>
  )
}


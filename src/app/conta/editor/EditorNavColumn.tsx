'use client'

import React from 'react'
import { ChevronRight, Lock } from 'lucide-react'
import { SectionItem, SectionTabId } from '../BioSiteEditor3Col'

interface EditorNavColumnProps {
  sectionItems: SectionItem[]
  activeSection: SectionTabId
  setActiveSection: (sec: SectionTabId) => void
  isAdminMode?: boolean
  canEditServices: boolean
  canEditPhotos: boolean
  canEditButtons: boolean
  canEditModules: boolean
  canEditTheme: boolean
  canEditTypography: boolean
  canEditBio: boolean
}

export default function EditorNavColumn({
  sectionItems,
  activeSection,
  setActiveSection,
  isAdminMode,
  canEditServices,
  canEditPhotos,
  canEditButtons,
  canEditModules,
  canEditTheme,
  canEditTypography,
  canEditBio
}: EditorNavColumnProps) {
  return (
    <aside className="hidden lg:flex w-72 border-r border-stone-800/80 bg-[#0D0D11] flex-col shrink-0 select-none">
      <div className="p-4 border-b border-stone-800/60 flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-bold">
          Estrutura da Página
        </span>
        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
          {sectionItems.length} BLOCOS
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-stone-800">
        {sectionItems.map((sec) => {
          const Icon = sec.icon
          const isActive = activeSection === sec.id
          const isSectionLocked = !isAdminMode && (
            (sec.id === 'catalogo' && !canEditServices) ||
            (sec.id === 'portfolio' && !canEditPhotos) ||
            (sec.id === 'botoes' && !canEditButtons) ||
            (sec.id === 'modulos' && !canEditModules) ||
            (sec.id === 'paleta' && (!canEditTheme || !canEditTypography)) ||
            (sec.id === 'cabecalho' && (!canEditBio || !canEditPhotos)) ||
            (sec.id === 'vip' && !canEditModules)
          )
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                isActive
                  ? 'bg-amber-500/15 border border-amber-400/50 shadow-md shadow-amber-950/30 text-amber-200'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-stone-950 font-bold'
                      : 'bg-stone-900/90 border border-stone-800 text-stone-400 group-hover:text-stone-200 group-hover:border-stone-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold truncate block ${isActive ? 'text-amber-300' : 'text-stone-200'}`}>
                      {sec.title}
                    </span>
                    {isSectionLocked && (
                      <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-0.5" title="Bloqueado pelo Administrador">
                        <Lock className="w-2.5 h-2.5" />
                      </span>
                    )}
                    {sec.badge && (
                      <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {sec.badge}
                      </span>
                    )}
                    {sec.isVip && (
                      <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-amber-500 text-stone-950">
                        VIP
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-stone-500 truncate mt-0.5 group-hover:text-stone-400">
                    {sec.subtitle}
                  </p>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-amber-400 translate-x-0.5' : 'text-stone-600 group-hover:text-stone-400'
                }`}
              />
            </button>
          )
        })}
      </nav>

      {/* Rodapé da Coluna 1: Status do BioSite */}
      <div className="p-4 border-t border-stone-800/60 bg-[#09090C] text-[11px] space-y-2">
        <div className="flex items-center justify-between text-stone-400">
          <span>Status do BioSite:</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% NO AR
          </span>
        </div>
        <div className="flex items-center justify-between text-stone-500 font-mono text-[10px]">
          <span>Plano Atual:</span>
          <span className="text-amber-400 font-bold">BioVip Pro</span>
        </div>
      </div>
    </aside>
  )
}

'use client'

import React from 'react'
import {
  Sliders,
  X,
  Lock,
  Layers,
  Check,
  CheckCircle2
} from 'lucide-react'
import { ClientPermissions, ModuleToggles } from '@/data/clientPermissions'

interface AdminPermissionsModalProps {
  slug: string | null
  title: string
  onClose: () => void
  activeTab: 'permissoes' | 'modulos'
  setActiveTab: (val: 'permissoes' | 'modulos') => void
  currentClientPermissions: ClientPermissions
  setCurrentClientPermissions: React.Dispatch<React.SetStateAction<ClientPermissions>>
  currentModuleToggles: ModuleToggles
  setCurrentModuleToggles: React.Dispatch<React.SetStateAction<ModuleToggles>>
  handleSavePermissions: () => void
  permissionDescriptions: Record<string, { label: string; description: string }>
  moduleDescriptions: Record<string, { label: string; description: string }>
}

export default function AdminPermissionsModal({
  slug,
  title,
  onClose,
  activeTab,
  setActiveTab,
  currentClientPermissions,
  setCurrentClientPermissions,
  currentModuleToggles,
  setCurrentModuleToggles,
  handleSavePermissions,
  permissionDescriptions,
  moduleDescriptions
}: AdminPermissionsModalProps) {
  if (!slug) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Permissões & Módulos: {title}</span>
                </h3>
                <p className="text-xs text-stone-400 font-mono mt-0.5">
                  /{slug} • Controle granular de edição e seções ativas
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Seletor de Abas no Topo do Modal */}
          <div className="flex items-center gap-2 mt-5 p-1 bg-[#0d0f12] rounded-xl border border-stone-800">
            <button
              type="button"
              onClick={() => setActiveTab('permissoes')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'permissoes'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>O que o Cliente Pode Alterar (/conta)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('modulos')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'modulos'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Ativação de Módulos & Blocos</span>
            </button>
          </div>

          {/* ABA 1: O QUE O CLIENTE PODE OU NÃO ALTERAR */}
          {activeTab === 'permissoes' && (
            <div className="mt-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-stone-900/60 p-3 rounded-2xl border border-stone-800 gap-2">
                <span className="text-xs text-stone-300">
                  Defina as travas de segurança do painel do cliente:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const allTrue = (Object.keys(currentClientPermissions) as Array<keyof ClientPermissions>).reduce((acc, k) => {
                        acc[k] = true
                        return acc
                      }, {} as ClientPermissions)
                      setCurrentClientPermissions(allTrue)
                    }}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition cursor-pointer"
                  >
                    Permitir Tudo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const allFalse = (Object.keys(currentClientPermissions) as Array<keyof ClientPermissions>).reduce((acc, k) => {
                        acc[k] = false
                        return acc
                      }, {} as ClientPermissions)
                      setCurrentClientPermissions(allFalse)
                    }}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition cursor-pointer"
                  >
                    Bloquear Tudo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {(Object.keys(currentClientPermissions) as Array<keyof ClientPermissions>).map((key) => {
                  const isAllowed = currentClientPermissions[key]
                  const info = permissionDescriptions[key as string]
                  return (
                    <div
                      key={String(key)}
                      onClick={() => {
                        setCurrentClientPermissions((prev: ClientPermissions) => ({ ...prev, [key]: !prev[key] }))
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isAllowed
                          ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                          : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 opacity-75'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                        isAllowed
                          ? 'bg-emerald-500 text-stone-950 border-emerald-400 font-bold'
                          : 'bg-stone-800 text-stone-500 border-stone-700'
                      }`}>
                        {isAllowed ? <Check className="w-3.5 h-3.5" /> : <Lock className="w-3 h-3" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          <span className="truncate">{info?.label || String(key)}</span>
                          <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded ${
                            isAllowed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {isAllowed ? 'Liberado' : 'Bloqueado'}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-stone-400 mt-1 leading-snug">
                          {info?.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ABA 2: ATIVAÇÃO DE MÓDULOS E BLOCOS DO BIOSITE */}
          {activeTab === 'modulos' && (
            <div className="mt-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-stone-900/60 p-3 rounded-2xl border border-stone-800 gap-2">
                <span className="text-xs text-stone-300">
                  Selecione quais módulos serão renderizados no BioSite:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const allTrue = (Object.keys(currentModuleToggles) as Array<keyof ModuleToggles>).reduce((acc, k) => {
                        acc[k] = true
                        return acc
                      }, {} as ModuleToggles)
                      setCurrentModuleToggles(allTrue)
                    }}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition cursor-pointer"
                  >
                    Ativar Todos
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const allFalse = (Object.keys(currentModuleToggles) as Array<keyof ModuleToggles>).reduce((acc, k) => {
                        acc[k] = false
                        return acc
                      }, {} as ModuleToggles)
                      setCurrentModuleToggles(allFalse)
                    }}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition cursor-pointer"
                  >
                    Desativar Todos
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {(Object.keys(currentModuleToggles) as Array<keyof ModuleToggles>).map((key) => {
                  const isEnabled = currentModuleToggles[key]
                  const info = moduleDescriptions[key as string]
                  return (
                    <div
                      key={String(key)}
                      onClick={() => {
                        setCurrentModuleToggles((prev: ModuleToggles) => ({ ...prev, [key]: !prev[key] }))
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isEnabled
                          ? 'bg-amber-500/10 border-amber-500/40 hover:border-amber-400'
                          : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 opacity-60'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                        isEnabled
                          ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                          : 'bg-stone-800 text-stone-500 border-stone-700'
                      }`}>
                        {isEnabled ? <Check className="w-3.5 h-3.5" /> : <X className="w-3 h-3" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white flex items-center justify-between">
                          <span className="truncate">{info?.label || String(key)}</span>
                          <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded ${
                            isEnabled ? 'bg-amber-500/20 text-amber-300' : 'bg-stone-800 text-stone-400'
                          }`}>
                            {isEnabled ? 'Ativo' : 'Desativado'}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-stone-400 mt-1 leading-snug">
                          {info?.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="pt-5 mt-5 border-t border-stone-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-stone-400 hover:text-white transition text-xs cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSavePermissions}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Salvar Configurações em Tempo Real</span>
          </button>
        </div>
      </div>
    </div>
  )
}

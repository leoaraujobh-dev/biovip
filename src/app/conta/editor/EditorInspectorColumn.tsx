'use client'

import React from 'react'
import {
  Lock,
  X,
  Check,
  Plus,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  MessageCircle,
  ImageIcon,
  Upload,
  Camera,
  Sparkles,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Sliders,
  ExternalLink,
  Save,
  CreditCard,
  Zap,
  Car,
  ShieldCheck
} from 'lucide-react'
import {
  PALETTES,
  TYPOGRAPHIES,
  BUTTON_STYLES,
  BUTTON_ANIMATIONS,
  BACKGROUND_STYLES,
  HIGHLIGHT_BADGES,
  NICHES_LIST,
  DEMO_PHOTOS,
  SHADOW_PRESETS,
  getShadowStyle
} from '@/data/bioSiteDesign'
import { ModuleToggles, MODULE_DESCRIPTIONS } from '@/data/clientPermissions'
import { applyCanvasOrganicFade, applySilhouetteCutout, readImageAsDataUrl, compressImageFile } from '@/utils/imageProcessors'
import { BioSiteEditorProps, SectionTabId, SectionItem } from '../BioSiteEditor3Col'

interface EditorInspectorColumnProps {
  props: BioSiteEditorProps
  activeSection: SectionTabId
  setActiveSection: (sec: SectionTabId) => void
  mobileMode: 'editor' | 'preview'
  currentSectionMeta: SectionItem
  canEditTheme: boolean
  canEditTypography: boolean
  canEditBio: boolean
  canEditPhotos: boolean
  canEditButtons: boolean
  canEditServices: boolean
  canEditModules: boolean
  modules: any
  handleToggleModuleClient: (modKey: any) => void
  handleBatchModulesClient: (allActive: boolean) => void
  effectiveGalleryConfig: any
  updateGalleryConfig: (updater: any) => void
  newGalleryUrl: string
  setNewGalleryUrl: (u: string) => void
  newGalleryCaption: string
  setNewGalleryCaption: (c: string) => void
  handleButtonImageUpload: (btnIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void
  moveButton: (fromIdx: number, toIdx: number) => void
  duplicateButton: (btn: any) => void
  handleGalleryUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleReplaceGalleryPhoto: (idx: number, e: React.ChangeEvent<HTMLInputElement>) => void
  moveGalleryPhoto: (fromIdx: number, toIdx: number) => void
  removeGalleryPhoto: (idx: number) => void
  updateGalleryCaption: (idx: number, caption: string) => void
  loadGalleryPreset: (presetKey: any) => void
  copiedPix: boolean
  handleCopyPix: () => void
  setPreviewLightboxIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export default function EditorInspectorColumn({
  props,
  activeSection,
  setActiveSection,
  mobileMode,
  currentSectionMeta,
  canEditTheme,
  canEditTypography,
  canEditBio,
  canEditPhotos,
  canEditButtons,
  canEditServices,
  canEditModules,
  modules,
  handleToggleModuleClient,
  handleBatchModulesClient,
  effectiveGalleryConfig,
  updateGalleryConfig,
  newGalleryUrl,
  setNewGalleryUrl,
  newGalleryCaption,
  setNewGalleryCaption,
  handleButtonImageUpload,
  moveButton,
  duplicateButton,
  handleGalleryUpload,
  handleReplaceGalleryPhoto,
  moveGalleryPhoto,
  removeGalleryPhoto,
  updateGalleryCaption,
  loadGalleryPreset,
  copiedPix,
  handleCopyPix,
  setPreviewLightboxIndex
}: EditorInspectorColumnProps) {
  return (
        <section
          className={`w-full lg:w-96 border-l border-stone-800/80 bg-[#121216] flex flex-col shrink-0 select-none ${
            mobileMode === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Cabeçalho do Bloco Ativo na Coluna 3 */}
          <div className="p-4 border-b border-stone-800/80 flex items-center justify-between shrink-0 bg-[#0E0E12]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                {currentSectionMeta.icon && <currentSectionMeta.icon className="w-4 h-4" />}
              </div>
              <div>
                <h2 className="text-xs font-mono uppercase font-bold text-white tracking-wide">
                  {currentSectionMeta.title}
                </h2>
                <p className="text-[10px] text-stone-400">
                  {currentSectionMeta.subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={props.handleSavePage}
              className="px-3 py-1 rounded-lg bg-[#E2B857] hover:bg-amber-400 text-stone-950 text-[10px] font-mono font-bold uppercase transition cursor-pointer"
            >
              Salvar
            </button>
          </div>

          {/* Área de Formulário com Rolagem Independente */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-stone-800">
            {/* ======================================================= */}
            {/* 1. SEÇÃO: PALETA & TIPOGRAFIA */}
            {/* ======================================================= */}
            {activeSection === 'paleta' && (
              <div className="space-y-5 animate-fade-in">
                {/* Paletas de Cores */}
                <div id="block-palette">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-mono uppercase text-stone-400 font-bold flex items-center gap-1.5">
                      Paleta de Cores ({PALETTES.length} opções luxo)
                      {!canEditTheme && <Lock className="w-3 h-3 text-amber-400" />}
                    </label>
                  </div>

                  {!canEditTheme && (
                    <div className="p-3 mb-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                      <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold block uppercase tracking-wider">Cores Bloqueadas pelo Administrador</span>
                        <p className="text-[10px] text-stone-400 leading-snug mt-0.5">A paleta de cores deste BioSite foi bloqueada para alterações pelo cliente.</p>
                      </div>
                    </div>
                  )}

                  <fieldset disabled={!canEditTheme} className={!canEditTheme ? 'opacity-50 pointer-events-none' : ''}>
                    <div className="grid grid-cols-2 gap-2">
                      {PALETTES.map((pal) => {
                        const isSel = props.selectedPalette.id === pal.id
                        return (
                          <button
                            key={pal.id}
                            type="button"
                            onClick={() => {
                              props.setSelectedPalette(pal)
                              props.setHasUnsavedChanges(true)
                            }}
                            className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                              isSel
                                ? 'border-amber-400 bg-amber-500/10 shadow-sm'
                                : 'border-stone-800 bg-stone-900/60 hover:border-stone-700'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: pal.bg }} />
                              <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: pal.card }} />
                              <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: pal.accent }} />
                            </div>
                            <span className={`text-[11px] font-bold font-sans antialiased tracking-tight block truncate ${isSel ? 'text-amber-300' : 'text-stone-300'}`}>
                              {pal.name}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Área de Personalização de Cores quando 'Minha paleta' estiver selecionada */}
                    {(props.selectedPalette.id === 'minha_paleta' || props.selectedPalette.id === 'personalizada' || props.selectedPalette.id === 'custom' || (props.selectedPalette.name || '').toLowerCase().includes('personaliz')) && (
                      <div className="mt-3 p-3.5 rounded-xl border border-amber-500/30 bg-amber-950/10 space-y-3 animate-fade-in">
                        <div className="flex items-center justify-between pb-2 border-b border-white/5">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                              Personalizar Cores
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-stone-400">Tempo real</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          {/* 1. Fundo da Página */}
                          <div>
                            <label className="text-[10px] font-mono text-stone-300 block mb-1">
                              Fundo da Página
                            </label>
                            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5 focus-within:border-amber-400 transition">
                              <input
                                type="color"
                                value={props.selectedPalette.bg || '#12151b'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    bg: newColor,
                                    swatches: [newColor, props.selectedPalette.card, props.selectedPalette.accent]
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.selectedPalette.bg || '#12151b'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    bg: newColor,
                                    swatches: [newColor, props.selectedPalette.card, props.selectedPalette.accent]
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[11px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>

                          {/* 2. Cartões & Blocos */}
                          <div>
                            <label className="text-[10px] font-mono text-stone-300 block mb-1">
                              Cartões & Blocos
                            </label>
                            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5 focus-within:border-amber-400 transition">
                              <input
                                type="color"
                                value={props.selectedPalette.card || '#1e222b'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    card: newColor,
                                    swatches: [props.selectedPalette.bg, newColor, props.selectedPalette.accent]
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.selectedPalette.card || '#1e222b'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    card: newColor,
                                    swatches: [props.selectedPalette.bg, newColor, props.selectedPalette.accent]
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[11px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>

                          {/* 3. Cor dos Botões */}
                          <div>
                            <label className="text-[10px] font-mono text-stone-300 block mb-1">
                              Cor dos Botões
                            </label>
                            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5 focus-within:border-amber-400 transition">
                              <input
                                type="color"
                                value={props.selectedPalette.button || '#3b82f6'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    button: newColor
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.selectedPalette.button || '#3b82f6'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    button: newColor
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[11px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>

                          {/* 4. Texto dos Botões */}
                          <div>
                            <label className="text-[10px] font-mono text-stone-300 block mb-1">
                              Texto dos Botões
                            </label>
                            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5 focus-within:border-amber-400 transition">
                              <input
                                type="color"
                                value={props.selectedPalette.buttonText || '#ffffff'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    buttonText: newColor
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.selectedPalette.buttonText || '#ffffff'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    buttonText: newColor
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[11px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>

                          {/* 5. Cor do Texto */}
                          <div>
                            <label className="text-[10px] font-mono text-stone-300 block mb-1">
                              Cor do Texto
                            </label>
                            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5 focus-within:border-amber-400 transition">
                              <input
                                type="color"
                                value={props.selectedPalette.text || '#ffffff'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    text: newColor
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.selectedPalette.text || '#ffffff'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    text: newColor
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[11px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>

                          {/* 6. Destaque / Acento */}
                          <div>
                            <label className="text-[10px] font-mono text-stone-300 block mb-1">
                              Destaque / Acento
                            </label>
                            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5 focus-within:border-amber-400 transition">
                              <input
                                type="color"
                                value={props.selectedPalette.accent || '#3b82f6'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    accent: newColor,
                                    swatches: [props.selectedPalette.bg, props.selectedPalette.card, newColor]
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.selectedPalette.accent || '#3b82f6'}
                                onChange={(e) => {
                                  const newColor = e.target.value
                                  const updated = {
                                    ...props.selectedPalette,
                                    accent: newColor,
                                    swatches: [props.selectedPalette.bg, props.selectedPalette.card, newColor]
                                  }
                                  props.setSelectedPalette(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[11px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </fieldset>

                  {/* Efeito de Sombra & Profundidade 3D Global de Todos os Módulos */}
                  <div className="mt-3 p-3.5 rounded-2xl bg-stone-900/90 border border-amber-500/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-sans uppercase text-amber-300 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Sombra & Profundidade 3D (Todos os Módulos)
                      </label>
                      <span className="text-[9px] font-sans text-stone-400">Global</span>
                    </div>
                    <p className="text-[10.5px] text-stone-300 leading-snug">
                      Aplica o efeito de relevo e profundidade a todos os blocos, botões, catálogo e módulos VIP do BioSite.
                    </p>
                    <select
                      value={props.selectedPalette.moduleShadow || 'profunda_3d'}
                      onChange={(e) => {
                        const newShadow = e.target.value
                        props.setSelectedPalette({
                          ...props.selectedPalette,
                          moduleShadow: newShadow
                        })
                        // Sincroniza em cascata para todos os blocos
                        const updatedButtons = (props.buttons || []).map((b: any) => ({
                          ...b,
                          shadowDepth: newShadow,
                          customShadow: newShadow === 'plana' ? 'none' : ''
                        }))
                        props.setButtons(updatedButtons)
                        if (props.urgencyData) {
                          props.setUrgencyData({ ...props.urgencyData, shadowDepth: newShadow })
                        }
                        if (props.announcementData) {
                          props.setAnnouncementData({ ...props.announcementData, shadowDepth: newShadow })
                        }
                        if (props.quizData) {
                          props.setQuizData({ ...props.quizData, shadowDepth: newShadow })
                        }
                        if (props.locationData) {
                          props.setLocationData({ ...props.locationData, shadowDepth: newShadow })
                        }
                        if (props.servicesCatalogData) {
                          props.setServicesCatalogData({ ...props.servicesCatalogData, shadowDepth: newShadow })
                        }
                        if (props.aboutMeData) {
                          props.setAboutMeData({ ...props.aboutMeData, shadowDepth: newShadow })
                        }
                        if (props.setGalleryConfig && effectiveGalleryConfig) {
                          props.setGalleryConfig({ ...effectiveGalleryConfig, shadowDepth: newShadow })
                        }
                        if (props.testimonialsData) {
                          props.setTestimonialsData((props.testimonialsData || []).map((t: any) => ({ ...t, shadowDepth: newShadow })))
                        }
                        if (props.faqData) {
                          props.setFaqData((props.faqData || []).map((f: any) => ({ ...f, shadowDepth: newShadow })))
                        }
                        if (props.metricsData) {
                          props.setMetricsData((props.metricsData || []).map((m: any) => ({ ...m, shadowDepth: newShadow })))
                        }
                        props.setHasUnsavedChanges(true)
                      }}
                      className="w-full p-2 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                    >
                      <option value="profunda_3d">💎 Luxo 3D Profundo (Recomendado)</option>
                      <option value="elevada_luxo">👑 Relevo Alto & Super Profundo (Efeito Flutuante)</option>
                      <option value="neon_glow">✨ Brilho Neon & Glow (Aura Dourada / Acento)</option>
                      <option value="suave">🔘 Relevo Suave (Elegante e Discreto)</option>
                      <option value="plana">⚪ Plana (Sem Sombra / Flat)</option>
                    </select>
                  </div>
                </div>

                {/* Tipografia Editorial */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-mono uppercase text-stone-400 font-bold flex items-center gap-1.5">
                      Tipografia Editorial
                      {!canEditTypography && <Lock className="w-3 h-3 text-amber-400" />}
                    </label>
                  </div>

                  {!canEditTypography && (
                    <div className="p-3 mb-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                      <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold block uppercase tracking-wider">Fontes Bloqueadas pelo Administrador</span>
                        <p className="text-[10px] text-stone-400 leading-snug mt-0.5">A tipografia deste modelo foi selecionada pelo administrador e está protegida.</p>
                      </div>
                    </div>
                  )}

                  <fieldset disabled={!canEditTypography} className={!canEditTypography ? 'opacity-50 pointer-events-none' : ''}>
                    <div className="space-y-1.5">
                      {TYPOGRAPHIES.map((typo) => {
                        const isSel = props.selectedTypography.id === typo.id
                        return (
                          <button
                            key={typo.id}
                            type="button"
                            onClick={() => {
                              props.setSelectedTypography(typo)
                              props.setHasUnsavedChanges(true)
                            }}
                            className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                              isSel
                                ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                                : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700'
                            }`}
                          >
                            <div>
                              <span className="text-xs block" style={{ fontFamily: typo.cssFont }}>
                                {typo.name}
                              </span>
                              <span className="text-[9px] font-mono text-stone-500">
                                {typo.desc || typo.category}
                              </span>
                            </div>
                            {isSel && <Check className="w-4 h-4 text-amber-400" />}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>
                </div>

                {/* Estilos e Efeitos de Botão */}
                <fieldset disabled={!canEditButtons} className={!canEditButtons ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                        Estilo do Botão
                      </label>
                      <select
                        value={props.buttonStyle}
                        onChange={(e) => {
                          props.setButtonStyle(e.target.value)
                          props.setHasUnsavedChanges(true)
                        }}
                        className="w-full p-2 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs font-mono"
                      >
                        {BUTTON_STYLES.map((bs) => (
                          <option key={bs.id} value={bs.id}>
                            {bs.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                        Animação do Botão
                      </label>
                      <select
                        value={props.buttonAnimation}
                        onChange={(e) => {
                          props.setButtonAnimation(e.target.value)
                          props.setHasUnsavedChanges(true)
                        }}
                        className="w-full p-2 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs font-mono"
                      >
                        {BUTTON_ANIMATIONS.map((ba) => (
                          <option key={ba.id} value={ba.id}>
                            {ba.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* Tratamento da Foto */}
                <fieldset disabled={!canEditPhotos} className={!canEditPhotos ? 'opacity-50 pointer-events-none' : ''}>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-stone-400 font-bold mb-2">
                      Efeito de Retrato
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'organico', label: 'Fusão Orgânica' },
                        { id: 'original', label: 'Foto Pura' },
                        { id: 'silhueta', label: 'Silhueta VIP' }
                      ].map((treat) => (
                        <button
                          key={treat.id}
                          type="button"
                          onClick={() => {
                            props.setPhotoTreatment(treat.id as any)
                            props.setHasUnsavedChanges(true)
                          }}
                          className={`p-2 rounded-xl border text-center text-xs font-mono transition cursor-pointer ${
                            props.photoTreatment === treat.id
                              ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                              : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          {treat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </fieldset>
              </div>
            )}

            {/* ======================================================= */}
            {/* 2. SEÇÃO: CABEÇALHO & PERFIL */}
            {/* ======================================================= */}
            {activeSection === 'cabecalho' && (
              <div className="space-y-4 animate-fade-in">
                {/* Banner de IA para Preenchimento Automático */}
                <fieldset disabled={!canEditBio} className={!canEditBio ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-300 font-black block">
                        ✨ Inteligência Artificial BioVip
                      </span>
                      <p className="text-[11px] text-stone-300 leading-tight mt-0.5">
                        Gere bio, especialidade e textos de alta conversão para o seu nicho.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={props.handleAiAutoFill}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs font-mono shrink-0 shadow-sm cursor-pointer"
                    >
                      Gerar
                    </button>
                  </div>
                </fieldset>

                {/* Foto de Perfil */}
                <div id="block-profile">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono uppercase text-stone-400 font-bold flex items-center gap-1.5">
                      Foto do Perfil / Retrato de Estúdio
                      {!canEditPhotos && <Lock className="w-3 h-3 text-amber-400" />}
                    </label>
                  </div>

                  {!canEditPhotos && (
                    <div className="p-3 mb-2 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                      <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold block uppercase tracking-wider">Foto do Perfil Bloqueada</span>
                        <p className="text-[10px] text-stone-400 leading-snug mt-0.5">A foto principal de estúdio foi definida pela agência e está travada.</p>
                      </div>
                    </div>
                  )}

                  <fieldset disabled={!canEditPhotos} className={!canEditPhotos ? 'opacity-50 pointer-events-none' : ''}>
                    <div className="flex items-center gap-3">
                      {/* Avatar preview com opção de clique para upload do computador */}
                      <label
                        className="w-14 h-14 rounded-2xl overflow-hidden border border-stone-700 bg-stone-900 shrink-0 relative group cursor-pointer shadow-md"
                        title="Clique para escolher foto do seu computador"
                      >
                        <img
                          src={props.customPhotoSrc || (props.demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)}
                          alt="Preview"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-amber-300">
                          <Camera className="w-4 h-4" />
                          <span className="text-[8px] font-mono font-bold mt-0.5 uppercase">Trocar</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const compressed = await compressImageFile(file, 1000, 0.85)
                              if (compressed) {
                                props.setCustomPhotoSrc(compressed)
                                props.setHasUnsavedChanges(true)
                              }
                            }
                            e.target.value = ''
                          }}
                        />
                      </label>

                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          {props.customPhotoSrc?.startsWith('data:') ? (
                            <div className="flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs min-w-0">
                              <span className="flex items-center gap-1.5 font-medium truncate text-[11px]">
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span className="truncate">Foto do computador</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  props.setCustomPhotoSrc(null)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="text-stone-400 hover:text-rose-400 text-[10px] ml-1.5 shrink-0 underline cursor-pointer"
                                title="Remover e usar padrão"
                              >
                                Remover
                              </button>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={props.customPhotoSrc || ''}
                              onChange={(e) => {
                                props.setCustomPhotoSrc(e.target.value || null)
                                props.setHasUnsavedChanges(true)
                              }}
                              placeholder="URL da Foto (https://...)"
                              className="flex-1 p-2 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono focus:border-amber-500/50 focus:outline-none"
                            />
                          )}

                          <label
                            className="px-2.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs font-semibold cursor-pointer flex items-center gap-1.5 shrink-0 transition"
                            title="Carregar foto do seu computador"
                          >
                            <Upload className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-[11px]">Subir Foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const compressed = await compressImageFile(file, 1000, 0.85)
                                  if (compressed) {
                                    props.setCustomPhotoSrc(compressed)
                                    props.setHasUnsavedChanges(true)
                                  }
                                }
                                e.target.value = ''
                              }}
                            />
                          </label>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              props.setDemoGender('mulher')
                              props.setCustomPhotoSrc(null)
                              props.setHasUnsavedChanges(true)
                            }}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border transition ${
                              props.demoGender === 'mulher' && !props.customPhotoSrc
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'border-stone-800 text-stone-400 hover:text-stone-300'
                            }`}
                          >
                            Feminino
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              props.setDemoGender('homem')
                              props.setCustomPhotoSrc(null)
                              props.setHasUnsavedChanges(true)
                            }}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border transition ${
                              props.demoGender === 'homem' && !props.customPhotoSrc
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'border-stone-800 text-stone-400 hover:text-stone-300'
                            }`}
                          >
                            Masculino
                          </button>
                          {props.customPhotoSrc && (
                            <button
                              type="button"
                              onClick={() => {
                                props.setCustomPhotoSrc(null)
                                props.setHasUnsavedChanges(true)
                              }}
                              className="text-[10px] font-mono px-2 py-0.5 rounded border border-rose-900/50 text-rose-400 hover:bg-rose-950/40 transition flex items-center gap-1 cursor-pointer"
                              title="Restaurar modelo original"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                              Restaurar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                {!canEditBio && (
                  <div className="p-3 mb-2 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">Bio & Identidade Bloqueadas</span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">As informações editoriais e registros oficiais foram configurados pelo administrador.</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={!canEditBio} className={!canEditBio ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="space-y-4">
                    {/* Nome e Título */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                          Nome da Marca
                        </label>
                        <input
                          type="text"
                          value={props.brandName}
                          onChange={(e) => {
                            props.setBrandName(e.target.value)
                            props.setHasUnsavedChanges(true)
                          }}
                          className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                          Título de Exibição
                        </label>
                        <input
                          type="text"
                          value={props.businessTitle}
                          onChange={(e) => {
                            props.setBusinessTitle(e.target.value)
                            props.setHasUnsavedChanges(true)
                          }}
                          className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-bold"
                        />
                      </div>
                    </div>

                    {/* Nicho e Especialidade */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                        Nicho / Categoria
                      </label>
                      <select
                        value={props.niche}
                        onChange={(e) => {
                          props.setNiche(e.target.value)
                          props.setHasUnsavedChanges(true)
                        }}
                        className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs mb-1.5"
                      >
                        {NICHES_LIST.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bio / Frase de Autoridade */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                        Bio / Frase de Autoridade
                      </label>
                      <textarea
                        rows={3}
                        value={props.tagline}
                        onChange={(e) => {
                          props.setTagline(e.target.value)
                          props.setHasUnsavedChanges(true)
                        }}
                        className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs leading-relaxed"
                      />
                    </div>

                    {/* WhatsApp e Registro Oficial */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                          WhatsApp Comercial
                        </label>
                        <input
                          type="text"
                          value={props.userPhone}
                          onChange={(e) => {
                            props.setUserPhone(e.target.value)
                            props.setHasUnsavedChanges(true)
                          }}
                          placeholder="5531991390202"
                          className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                          Registro Oficial
                        </label>
                        <input
                          type="text"
                          value={props.registrationCode}
                          onChange={(e) => {
                            props.setRegistrationCode(e.target.value)
                            props.setHasUnsavedChanges(true)
                          }}
                          placeholder="CRO-PE 22.675"
                          className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            )}

            {/* ======================================================= */}
            {/* 3. SEÇÃO: BOTÕES & LINKS PRINCIPAIS (BIOVIP ORIGINAL) */}
            {/* ======================================================= */}
            {activeSection === 'botoes' && (
              <div className="space-y-4 animate-fade-in">
                <div id="block-quick-actions" className="flex items-center justify-between pb-1 border-b border-stone-800/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase text-stone-200 font-bold">
                        Botões VIP de Alta Conversão
                      </span>
                      {!canEditButtons && <Lock className="w-3.5 h-3.5 text-amber-400" />}
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                        {props.buttons.length} BOTÕES
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      Suporte a fotos pop-out, pills de ação, badges e mensagens automáticas de WhatsApp.
                    </p>
                  </div>
                  {canEditButtons && (
                    <button
                      type="button"
                      onClick={() => {
                        const newBtn = {
                          id: `cta-${Date.now()}`,
                          label: 'AGENDAR HORÁRIO VIP',
                          subtitle: 'Toque para atendimento prioritário e sem fila',
                          icon: 'calendar',
                          url: '#booking',
                          linkType: 'booking' as const,
                          whatsappMessage: `Olá! Gostaria de consultar horários disponíveis no ${props.businessTitle || 'studio'}.`,
                          animation: 'pulse-glow' as const,
                          variant: 'accent' as const,
                          badgeText: 'MAIS PROCURADO',
                          ctaActionText: 'RESERVAR HORÁRIO',
                          imagePosition: 'none' as const,
                          imageFitStyle: 'popout' as const,
                          isHighlighted: true
                        }
                        props.setButtons([...props.buttons, newBtn])
                        props.setHasUnsavedChanges(true)
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-[#E2B857] hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Botão VIP
                    </button>
                  )}
                </div>

                {!canEditButtons && (
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">Edição de Botões Bloqueada</span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">Os botões e links de conversão deste BioSite estão bloqueados para alteração.</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={!canEditButtons} className={!canEditButtons ? 'opacity-50 pointer-events-none' : ''}>
                  <div id="block-buttons" className="space-y-3.5">
                  {props.buttons.map((btn: any, idx: number) => (
                    <div
                      key={btn.id || `btn-${idx}`}
                      className="p-3.5 sm:p-4 rounded-2xl bg-stone-900 border border-stone-800/90 hover:border-stone-700 transition space-y-3 shadow-md"
                    >
                      {/* Top Bar do Card de Botão */}
                      <div className="flex items-center justify-between pb-2 border-b border-stone-800/70">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-stone-200 truncate max-w-[180px]">
                            {btn.label || btn.title || 'Botão sem título'}
                          </span>
                          {btn.badgeText && (
                            <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-amber-400 text-stone-950">
                              {btn.badgeText}
                            </span>
                          )}
                          {btn.cardImage && (
                            <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded-full">
                              📷 COM FOTO
                            </span>
                          )}
                        </div>

                        {/* Ações: Mover, Duplicar, Excluir */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveButton(idx, idx - 1)}
                            className="p-1 rounded bg-stone-800 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                            title="Mover para cima"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === props.buttons.length - 1}
                            onClick={() => moveButton(idx, idx + 1)}
                            className="p-1 rounded bg-stone-800 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
                            title="Mover para baixo"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => duplicateButton(idx)}
                            className="p-1 rounded bg-stone-800 text-stone-300 hover:text-amber-400 cursor-pointer transition"
                            title="Duplicar botão"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          {props.buttons.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                props.setButtons(props.buttons.filter((b: any) => b.id !== btn.id))
                                props.setHasUnsavedChanges(true)
                              }}
                              className="p-1 rounded bg-stone-800 text-stone-400 hover:text-red-400 cursor-pointer transition"
                              title="Remover botão"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Textos: Título Principal e Subtítulo */}
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Título Principal do Botão
                          </label>
                          <input
                            type="text"
                            value={btn.label || btn.title || ''}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].label = e.target.value
                              updated[idx].title = e.target.value
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Ex: AGENDAR HORÁRIO VIP"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 text-xs font-bold focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Subtítulo / Descrição Curta
                          </label>
                          <input
                            type="text"
                            value={btn.subtitle || ''}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].subtitle = e.target.value
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Ex: Toque para atendimento prioritário e sem fila"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-300 border border-stone-800 text-[11px] focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Tipo de Destino e Ação */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Tipo de Ação / Link
                          </label>
                          <select
                            value={btn.linkType || (btn.url?.includes('wa.me') ? 'whatsapp' : btn.url?.startsWith('#') ? btn.url.replace('#', '') : 'custom')}
                            onChange={(e) => {
                              const nextType = e.target.value as any
                              const updated = [...props.buttons]
                              updated[idx].linkType = nextType
                              if (nextType === 'booking') updated[idx].url = '#booking'
                              else if (nextType === 'catalogo') updated[idx].url = '#catalogo'
                              else if (nextType === 'quiz') updated[idx].url = '#quiz'
                              else if (nextType === 'maps') updated[idx].url = 'https://maps.google.com'
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs font-medium focus:border-amber-400 focus:outline-none"
                          >
                            <option value="whatsapp">💬 WhatsApp (Conversa Direta)</option>
                            <option value="booking">📅 Agendamento Online (#booking)</option>
                            <option value="catalogo">✨ Catálogo de Serviços (#catalogo)</option>
                            <option value="quiz">🎯 Triagem / Quiz VIP (#quiz)</option>
                            <option value="maps">📍 Localização / Google Maps</option>
                            <option value="custom">🔗 Link Personalizado / Externo</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Ícone do Botão
                          </label>
                          <select
                            value={btn.icon || 'whatsapp'}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].icon = e.target.value
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs focus:border-amber-400 focus:outline-none"
                          >
                            <option value="whatsapp">WhatsApp</option>
                            <option value="calendar">Agenda / Calendário</option>
                            <option value="sparkles">Brilho / VIP / Estrela</option>
                            <option value="map">Localização / Mapa</option>
                            <option value="scissors">Tesoura / Barbearia / Salão</option>
                            <option value="star">Estrela Destaque</option>
                            <option value="message">Mensagem / Bate-papo</option>
                          </select>
                        </div>
                      </div>

                      {/* Se for WhatsApp: Mensagem Automática */}
                      {(btn.linkType === 'whatsapp' || btn.url?.includes('wa.me')) ? (
                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-emerald-400 mb-1 flex items-center gap-1 font-bold">
                            <MessageCircle className="w-3 h-3 text-emerald-400" /> Mensagem Pré-formatada de WhatsApp
                          </label>
                          <input
                            type="text"
                            value={btn.whatsappMessage || ''}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].whatsappMessage = e.target.value
                              const phone = props.userPhone || '5531991390202'
                              updated[idx].url = `https://wa.me/${phone}?text=${encodeURIComponent(e.target.value)}`
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Ex: Olá! Vim pelo site e gostaria de agendar uma consulta."
                            className="w-full p-2 rounded-xl bg-stone-950 text-emerald-200 border border-emerald-500/30 text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Link de Destino (URL)
                          </label>
                          <input
                            type="text"
                            value={btn.url || ''}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].url = e.target.value
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="https://... ou #booking ou #catalogo"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-300 border border-stone-800 text-[10px] font-mono focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      )}

                      {/* Badges, Pills de Ação e Efeitos VIP */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Badge Superior (Pill Superior)
                          </label>
                          <input
                            type="text"
                            value={btn.badgeText || btn.highlightBadge || ''}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].badgeText = e.target.value
                              updated[idx].highlightBadge = e.target.value
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Ex: MAIS PROCURADO, AGENDA ABERTA"
                            className="w-full p-2 rounded-xl bg-stone-950 text-amber-300 border border-stone-800 text-xs font-mono font-bold uppercase focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Texto de Ação Direta (Pill Direita)
                          </label>
                          <input
                            type="text"
                            value={btn.ctaActionText || ''}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].ctaActionText = e.target.value
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Ex: RESERVAR HORÁRIO, VER VALORES"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs font-bold uppercase focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Animação & Estilo Visual */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Animação VIP do Botão
                          </label>
                          <select
                            value={btn.animation || (btn.isHighlighted ? 'pulse-glow' : 'none')}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].animation = e.target.value as any
                              if (e.target.value === 'pulse-glow') updated[idx].isHighlighted = true
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs focus:border-amber-400 focus:outline-none"
                          >
                            <option value="pulse-glow">✨ Pulso Luminoso (Glow VIP)</option>
                            <option value="shimmer">💫 Reflexo Metálico (Shimmer Sweep)</option>
                            <option value="bounce">⚡ Saltinho Suave (Bounce)</option>
                            <option value="none">Sem Animação</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Variante de Cor / Destaque
                          </label>
                          <select
                            value={btn.variant || (btn.isHighlighted ? 'accent' : 'default')}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].variant = e.target.value as any
                              updated[idx].isHighlighted = e.target.value === 'accent'
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs focus:border-amber-400 focus:outline-none"
                          >
                            <option value="accent">⭐ Dourado / Accent (Foco Total)</option>
                            <option value="default">Elegante Escuro (Borda Fina)</option>
                          </select>
                        </div>
                      </div>

                      {/* Foto no Botão (BioVip Original: Pop-out ou Framed) */}
                      <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                            Foto Integrada ao Botão
                          </label>
                          {btn.cardImage && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...props.buttons]
                                updated[idx].cardImage = ''
                                updated[idx].imagePosition = 'none'
                                props.setButtons(updated)
                                props.setHasUnsavedChanges(true)
                              }}
                              className="text-[9px] font-mono text-red-400 hover:underline cursor-pointer"
                            >
                              Remover Foto
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">
                              Posição da Foto
                            </label>
                            <select
                              value={btn.imagePosition || (btn.cardImage ? 'right' : 'none')}
                              onChange={(e) => {
                                const updated = [...props.buttons]
                                updated[idx].imagePosition = e.target.value as any
                                props.setButtons(updated)
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-full p-1.5 rounded-lg bg-stone-900 text-stone-200 border border-stone-800 text-[11px]"
                            >
                              <option value="none">Sem Imagem</option>
                              <option value="right">Direita (Ao lado do texto/seta)</option>
                              <option value="left">Esquerda (Miniatura inicial)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">
                              Estilo da Foto
                            </label>
                            <select
                              value={btn.imageFitStyle || 'popout'}
                              onChange={(e) => {
                                const updated = [...props.buttons]
                                updated[idx].imageFitStyle = e.target.value as any
                                props.setButtons(updated)
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-full p-1.5 rounded-lg bg-stone-900 text-stone-200 border border-stone-800 text-[11px]"
                            >
                              <option value="popout">Avatar Pop-Out (Salta do botão com aro)</option>
                              <option value="framed">Moldura Retangular Elegante</option>
                            </select>
                          </div>
                        </div>

                        {btn.imagePosition !== 'none' && (
                          <div className="flex items-center gap-2 pt-1">
                            {btn.cardImage && (
                              <img
                                src={btn.cardImage}
                                alt="Foto do botão"
                                className={`w-8 h-8 object-cover border border-amber-400/50 shrink-0 ${
                                  btn.imageFitStyle === 'framed' ? 'rounded-md' : 'rounded-full'
                                }`}
                              />
                            )}
                            <input
                              type="text"
                              value={btn.cardImage || ''}
                              onChange={(e) => {
                                const updated = [...props.buttons]
                                updated[idx].cardImage = e.target.value
                                props.setButtons(updated)
                                props.setHasUnsavedChanges(true)
                              }}
                              placeholder="URL da imagem (https://...)"
                              className="flex-1 p-1.5 rounded-lg bg-stone-900 text-stone-300 border border-stone-800 text-[10px] font-mono focus:border-amber-400 focus:outline-none"
                            />
                            <label
                              className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-[10px] font-mono cursor-pointer flex items-center gap-1 shrink-0 transition"
                              title="Subir foto do seu computador"
                            >
                              <Upload className="w-3 h-3 text-amber-400" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleButtonImageUpload(idx, e)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>

                      {/* Personalização Visual deste Botão (Cores, Borda e Profundidade 3D) */}
                      <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-2.5">
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                          <label className="text-[10px] font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            Cores, Borda & Profundidade 3D
                          </label>
                          <span className="text-[9px] font-mono text-stone-400">Personalizado</span>
                        </div>

                        {/* Profundidade / Sombra 3D */}
                        <div>
                          <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">
                            Efeito de Sombra & Profundidade 3D
                          </label>
                          <select
                            value={btn.shadowDepth || 'profunda_3d'}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].shadowDepth = e.target.value as any
                              if (e.target.value === 'plana') {
                                updated[idx].customShadow = 'none'
                              } else {
                                updated[idx].customShadow = ''
                              }
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="w-full p-1.5 rounded-lg bg-stone-900 text-stone-200 border border-stone-800 text-[11px] focus:border-amber-400 focus:outline-none"
                          >
                            <option value="profunda_3d">💎 Luxo 3D Profundo (Recomendado)</option>
                            <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                            <option value="neon_glow">✨ Brilho Neon & Glow</option>
                            <option value="suave">🔘 Relevo Suave</option>
                            <option value="plana">⚪ Plana (Sem Sombra)</option>
                          </select>
                        </div>

                        {/* Cores Específicas do Botão: Fundo, Texto, Borda */}
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          {/* Cor de Fundo */}
                          <div>
                            <label className="block text-[8.5px] font-mono uppercase text-stone-400 mb-1">
                              Fundo
                            </label>
                            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={btn.customBg || props.selectedPalette.card || '#14161c'}
                                onChange={(e) => {
                                  const updated = [...props.buttons]
                                  updated[idx].customBg = e.target.value
                                  props.setButtons(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={btn.customBg || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  const updated = [...props.buttons]
                                  updated[idx].customBg = e.target.value
                                  props.setButtons(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9.5px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>

                          {/* Cor do Texto */}
                          <div>
                            <label className="block text-[8.5px] font-mono uppercase text-stone-400 mb-1">
                              Texto
                            </label>
                            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={btn.customText || props.selectedPalette.text || '#ffffff'}
                                onChange={(e) => {
                                  const updated = [...props.buttons]
                                  updated[idx].customText = e.target.value
                                  props.setButtons(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={btn.customText || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  const updated = [...props.buttons]
                                  updated[idx].customText = e.target.value
                                  props.setButtons(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9.5px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>

                          {/* Cor da Borda */}
                          <div>
                            <label className="block text-[8.5px] font-mono uppercase text-stone-400 mb-1">
                              Borda
                            </label>
                            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={btn.customBorder || props.selectedPalette.accent || '#e2b857'}
                                onChange={(e) => {
                                  const updated = [...props.buttons]
                                  updated[idx].customBorder = e.target.value
                                  props.setButtons(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={btn.customBorder || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  const updated = [...props.buttons]
                                  updated[idx].customBorder = e.target.value
                                  props.setButtons(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9.5px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Atalhos Rápidos de Paleta para o Botão */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[8.5px] font-mono text-stone-400">Predefinições rápidas:</span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...props.buttons]
                                updated[idx].customBg = props.selectedPalette.accent
                                updated[idx].customText = props.selectedPalette.buttonText || '#000000'
                                updated[idx].customBorder = 'rgba(255,255,255,0.45)'
                                props.setButtons(updated)
                                props.setHasUnsavedChanges(true)
                              }}
                              className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold border border-white/20 text-stone-950"
                              style={{ backgroundColor: props.selectedPalette.accent }}
                            >
                              Destaque
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...props.buttons]
                                updated[idx].customBg = '#ffffff'
                                updated[idx].customText = '#000000'
                                updated[idx].customBorder = 'rgba(0,0,0,0.1)'
                                props.setButtons(updated)
                                props.setHasUnsavedChanges(true)
                              }}
                              className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-white text-black border border-stone-300"
                            >
                              Branco
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...props.buttons]
                                updated[idx].customBg = '#000000'
                                updated[idx].customText = '#ffffff'
                                updated[idx].customBorder = 'rgba(255,255,255,0.2)'
                                props.setButtons(updated)
                                props.setHasUnsavedChanges(true)
                              }}
                              className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-black text-white border border-stone-800"
                            >
                              Preto
                            </button>
                            {(btn.customBg || btn.customText || btn.customBorder || btn.shadowDepth) && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...props.buttons]
                                  delete updated[idx].customBg
                                  delete updated[idx].customText
                                  delete updated[idx].customBorder
                                  delete updated[idx].customShadow
                                  delete updated[idx].shadowDepth
                                  props.setButtons(updated)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="text-[8px] font-mono text-stone-400 hover:text-amber-400 underline ml-1 cursor-pointer"
                              >
                                Redefinir
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Efeito de Sombra & Profundidade 3D dos Cards do Catálogo */}
                        <div className="col-span-2 pt-2 border-t border-white/5">
                          <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-300 mb-1">
                            Sombra & Profundidade 3D dos Cards de Serviço
                          </label>
                          <select
                            value={props.servicesCatalogData.shadowDepth || 'profunda_3d'}
                            onChange={(e) => {
                              props.setServicesCatalogData({
                                ...props.servicesCatalogData,
                                shadowDepth: e.target.value
                              })
                              props.setHasUnsavedChanges(true)
                            }}
                            className="w-full p-2 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                          >
                            <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                            <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                            <option value="neon_glow">✨ Brilho Neon & Glow</option>
                            <option value="suave">🔘 Relevo Suave</option>
                            <option value="plana">⚪ Plana (Sem Sombra)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </fieldset>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. SEÇÃO: CATÁLOGO DE SERVIÇOS */}
            {/* ======================================================= */}
            {activeSection === 'catalogo' && (
              <div className="space-y-4 animate-fade-in">
                {!canEditServices && (
                  <div className="p-3 mb-2 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">Catálogo Bloqueado pelo Administrador</span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">Os procedimentos, durações e preços foram fixados pelo administrador e estão em modo somente-leitura.</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={!canEditServices} className={!canEditServices ? 'opacity-50 pointer-events-none' : ''}>
                {/* Switch Liga/Desliga */}
                <div id="block-services-catalog" className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
                      Catálogo Interativo VIP
                      {!canEditServices && <Lock className="w-3 h-3 text-amber-400" />}
                    </h3>
                    <p className="text-[10px] text-stone-400">
                      Tabela visual com preços, durações e agendamento instantâneo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      props.setServicesCatalogData({
                        ...props.servicesCatalogData,
                        enabled: !props.servicesCatalogData?.enabled
                      })
                      props.setHasUnsavedChanges(true)
                    }}
                    className={`p-1.5 rounded-xl border text-xs font-mono font-bold transition cursor-pointer ${
                      props.servicesCatalogData?.enabled
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-stone-800 text-stone-400 border-stone-700'
                    }`}
                  >
                    {props.servicesCatalogData?.enabled ? 'LIGADO' : 'DESLIGADO'}
                  </button>
                </div>

                {props.servicesCatalogData?.enabled && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                        Título do Catálogo
                      </label>
                      <input
                        type="text"
                        value={props.servicesCatalogData.headline || ''}
                        onChange={(e) => {
                          props.setServicesCatalogData({
                            ...props.servicesCatalogData,
                            headline: e.target.value
                          })
                          props.setHasUnsavedChanges(true)
                        }}
                        className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-bold"
                      />
                    </div>

                    {/* Personalização Visual do Catálogo (Cores dos Cards e Botões) */}
                    <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-3">
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                        <label className="text-[10.5px] font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          Cores dos Cards & Botões do Catálogo
                        </label>
                        <span className="text-[9px] font-mono text-stone-400">Tempo real</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {/* 1. Fundo dos Cards de Procedimento */}
                        <div>
                          <label className="text-[9px] font-mono text-stone-300 block mb-1">
                            Fundo dos Cards
                          </label>
                          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5">
                            <input
                              type="color"
                              value={props.servicesCatalogData.customCardBg || props.selectedPalette.card || '#14161c'}
                              onChange={(e) => {
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  customCardBg: e.target.value
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <input
                              type="text"
                              value={props.servicesCatalogData.customCardBg || ''}
                              placeholder="Auto (Paleta)"
                              onChange={(e) => {
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  customCardBg: e.target.value
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-full bg-transparent text-[10px] font-mono text-stone-200 outline-none uppercase"
                            />
                          </div>
                        </div>

                        {/* 2. Cor do Título/Texto */}
                        <div>
                          <label className="text-[9px] font-mono text-stone-300 block mb-1">
                            Texto dos Cards
                          </label>
                          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5">
                            <input
                              type="color"
                              value={props.servicesCatalogData.customTextColor || '#ffffff'}
                              onChange={(e) => {
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  customTextColor: e.target.value
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <input
                              type="text"
                              value={props.servicesCatalogData.customTextColor || ''}
                              placeholder="#ffffff"
                              onChange={(e) => {
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  customTextColor: e.target.value
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-full bg-transparent text-[10px] font-mono text-stone-200 outline-none uppercase"
                            />
                          </div>
                        </div>

                        {/* 3. Cor da Borda do Card */}
                        <div>
                          <label className="text-[9px] font-mono text-stone-300 block mb-1">
                            Borda dos Cards
                          </label>
                          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5">
                            <input
                              type="color"
                              value={props.servicesCatalogData.customBorderColor || props.selectedPalette.accent || '#e2b857'}
                              onChange={(e) => {
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  customBorderColor: e.target.value
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <input
                              type="text"
                              value={props.servicesCatalogData.customBorderColor || ''}
                              placeholder="Auto (Accent)"
                              onChange={(e) => {
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  customBorderColor: e.target.value
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-full bg-transparent text-[10px] font-mono text-stone-200 outline-none uppercase"
                            />
                          </div>
                        </div>

                        {/* 4. Cor do Botão de Agendamento */}
                        <div>
                          <label className="text-[9px] font-mono text-stone-300 block mb-1">
                            Botão Agendar (Fundo)
                          </label>
                          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5">
                            <input
                              type="color"
                              value={props.servicesCatalogData.customBtnBg || props.selectedPalette.accent || '#e2b857'}
                              onChange={(e) => {
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  customBtnBg: e.target.value
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <input
                              type="text"
                              value={props.servicesCatalogData.customBtnBg || ''}
                              placeholder="Auto (Accent)"
                              onChange={(e) => {
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  customBtnBg: e.target.value
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-full bg-transparent text-[10px] font-mono text-stone-200 outline-none uppercase"
                            />
                          </div>
                        </div>

                        {/* 5. Cor do Texto do Botão */}
                        <div className="col-span-2">
                          <label className="text-[9px] font-mono text-stone-300 block mb-1">
                            Texto do Botão Agendar
                          </label>
                          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg p-1.5">
                            <input
                              type="color"
                              value={props.servicesCatalogData.customBtnText || props.selectedPalette.buttonText || '#000000'}
                              onChange={(e) => {
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  customBtnText: e.target.value
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                            <input
                              type="text"
                              value={props.servicesCatalogData.customBtnText || ''}
                              placeholder="Auto"
                              onChange={(e) => {
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  customBtnText: e.target.value
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="w-full bg-transparent text-[10px] font-mono text-stone-200 outline-none uppercase"
                            />
                            {(props.servicesCatalogData.customCardBg || props.servicesCatalogData.customTextColor || props.servicesCatalogData.customBorderColor || props.servicesCatalogData.customBtnBg || props.servicesCatalogData.customBtnText) && (
                              <button
                                type="button"
                                onClick={() => {
                                  const reset = { ...props.servicesCatalogData }
                                  delete reset.customCardBg
                                  delete reset.customTextColor
                                  delete reset.customBorderColor
                                  delete reset.customBtnBg
                                  delete reset.customBtnText
                                  props.setServicesCatalogData(reset)
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="px-2 py-1 rounded bg-stone-800 text-stone-400 hover:text-amber-400 text-[9px] font-mono shrink-0 cursor-pointer"
                              >
                                Redefinir
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Efeito de Sombra & Profundidade 3D dos Cards do Catálogo */}
                        <div className="col-span-2 pt-2 border-t border-white/5">
                          <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-300 mb-1">
                            Sombra & Profundidade 3D dos Cards de Serviço
                          </label>
                          <select
                            value={props.servicesCatalogData.shadowDepth || 'profunda_3d'}
                            onChange={(e) => {
                              props.setServicesCatalogData({
                                ...props.servicesCatalogData,
                                shadowDepth: e.target.value
                              })
                              props.setHasUnsavedChanges(true)
                            }}
                            className="w-full p-2 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                          >
                            <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                            <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                            <option value="neon_glow">✨ Brilho Neon & Glow</option>
                            <option value="suave">🔘 Relevo Suave</option>
                            <option value="plana">⚪ Plana (Sem Sombra)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono uppercase text-stone-300 font-bold">
                        Procedimentos ({props.servicesCatalogData.items?.length || 0})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const newItem = {
                            id: `srv-${Date.now()}`,
                            category: 'PRINCIPAL',
                            name: 'Novo Procedimento Exclusivo',
                            description: 'Descrição dos benefícios e resultados para o cliente.',
                            price: 'R$ 220',
                            duration: '⏱ 1h',
                            badge: 'EXCLUSIVO'
                          }
                          const updated = {
                            ...props.servicesCatalogData,
                            items: [...(props.servicesCatalogData.items || []), newItem]
                          }
                          props.setServicesCatalogData(updated)
                          props.setHasUnsavedChanges(true)
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#E2B857] text-stone-950 font-bold text-[10px] uppercase flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Adicionar
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {(props.servicesCatalogData.items || []).map((srv: any, idx: number) => (
                        <div
                          key={srv.id || idx}
                          className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono text-amber-400 font-bold">
                              #{idx + 1} - {srv.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const filtered = props.servicesCatalogData.items.filter((_: any, i: number) => i !== idx)
                                props.setServicesCatalogData({
                                  ...props.servicesCatalogData,
                                  items: filtered
                                })
                                props.setHasUnsavedChanges(true)
                              }}
                              className="text-stone-500 hover:text-red-400 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <input
                            type="text"
                            value={srv.name}
                            onChange={(e) => {
                              const updatedItems = [...props.servicesCatalogData.items]
                              updatedItems[idx].name = e.target.value
                              props.setServicesCatalogData({ ...props.servicesCatalogData, items: updatedItems })
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Nome do Procedimento"
                            className="w-full p-2 rounded-lg bg-stone-950 text-stone-100 border border-stone-800 text-xs font-bold"
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={srv.price}
                              onChange={(e) => {
                                const updatedItems = [...props.servicesCatalogData.items]
                                updatedItems[idx].price = e.target.value
                                props.setServicesCatalogData({ ...props.servicesCatalogData, items: updatedItems })
                                props.setHasUnsavedChanges(true)
                              }}
                              placeholder="Preço (ex: R$ 250)"
                              className="w-full p-1.5 rounded-lg bg-stone-950 text-amber-300 border border-stone-800 text-xs font-mono font-bold"
                            />
                            <input
                              type="text"
                              value={srv.duration || ''}
                              onChange={(e) => {
                                const updatedItems = [...props.servicesCatalogData.items]
                                updatedItems[idx].duration = e.target.value
                                props.setServicesCatalogData({ ...props.servicesCatalogData, items: updatedItems })
                                props.setHasUnsavedChanges(true)
                              }}
                              placeholder="Duração (ex: ⏱ 1h)"
                              className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-300 border border-stone-800 text-xs font-mono"
                            />
                          </div>

                          <textarea
                            rows={2}
                            value={srv.description || ''}
                            onChange={(e) => {
                              const updatedItems = [...props.servicesCatalogData.items]
                              updatedItems[idx].description = e.target.value
                              props.setServicesCatalogData({ ...props.servicesCatalogData, items: updatedItems })
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Descrição dos benefícios..."
                            className="w-full p-2 rounded-lg bg-stone-950 text-stone-400 border border-stone-800 text-[11px]"
                          />

                          {/* Foto do Serviço / Procedimento e Modo de Exibição */}
                          <div className="pt-2 border-t border-stone-800/80 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-mono text-stone-300 flex items-center gap-1 font-semibold">
                                <ImageIcon className="w-3 h-3 text-amber-400" />
                                <span>Foto do Procedimento:</span>
                              </label>

                              {/* Alternador de Layout da Imagem */}
                              <div className="flex items-center gap-1 bg-stone-950 p-0.5 rounded-lg border border-stone-800">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...props.servicesCatalogData.items]
                                    updated[idx].imageLayout = 'thumb'
                                    props.setServicesCatalogData({ ...props.servicesCatalogData, items: updated })
                                    props.setHasUnsavedChanges(true)
                                  }}
                                  className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-bold transition cursor-pointer ${
                                    (srv.imageLayout || 'thumb') === 'thumb'
                                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                                      : 'text-stone-400 hover:text-white'
                                  }`}
                                  title="Foto em miniatura integrada dentro do botão ao lado do nome"
                                >
                                  Miniatura
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...props.servicesCatalogData.items]
                                    updated[idx].imageLayout = 'cover'
                                    props.setServicesCatalogData({ ...props.servicesCatalogData, items: updated })
                                    props.setHasUnsavedChanges(true)
                                  }}
                                  className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-bold transition cursor-pointer ${
                                    srv.imageLayout === 'cover'
                                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                                      : 'text-stone-400 hover:text-white'
                                  }`}
                                  title="Imagem maior de destaque com botão de agendamento e valor abaixo dela"
                                >
                                  Imagem Maior
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {srv.image?.startsWith('data:') ? (
                                <div className="flex-1 flex items-center justify-between px-2 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-[10px] min-w-0">
                                  <span className="flex items-center gap-1 font-medium truncate">
                                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                                    <span className="truncate">Foto do computador</span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...props.servicesCatalogData.items]
                                      delete updated[idx].image
                                      delete updated[idx].imageLayout
                                      props.setServicesCatalogData({ ...props.servicesCatalogData, items: updated })
                                      props.setHasUnsavedChanges(true)
                                    }}
                                    className="text-stone-400 hover:text-rose-400 text-[9px] ml-1 shrink-0 underline cursor-pointer"
                                  >
                                    Limpar
                                  </button>
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={srv.image || ''}
                                  onChange={(e) => {
                                    const updated = [...props.servicesCatalogData.items]
                                    updated[idx].image = e.target.value
                                    if (!updated[idx].imageLayout) updated[idx].imageLayout = 'thumb'
                                    props.setServicesCatalogData({ ...props.servicesCatalogData, items: updated })
                                    props.setHasUnsavedChanges(true)
                                  }}
                                  placeholder="URL da foto (ex: https://images.unsplash.com/...)"
                                  className="flex-1 p-1.5 rounded-lg bg-stone-950 text-stone-200 border border-stone-800 text-[10.5px] focus:border-amber-400 focus:outline-none"
                                />
                              )}
                              <label
                                className="px-2 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-[10px] font-mono cursor-pointer flex items-center gap-1 shrink-0 transition"
                                title="Enviar foto do computador para este serviço"
                              >
                                <Upload className="w-3 h-3 text-amber-400" />
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                      const compressed = await compressImageFile(file, 800, 0.85)
                                      if (compressed) {
                                        const updated = [...props.servicesCatalogData.items]
                                        updated[idx].image = compressed
                                        if (!updated[idx].imageLayout) updated[idx].imageLayout = 'thumb'
                                        props.setServicesCatalogData({ ...props.servicesCatalogData, items: updated })
                                        props.setHasUnsavedChanges(true)
                                      }
                                    }
                                    e.target.value = ''
                                  }}
                                />
                              </label>
                              {srv.image && (
                                <div className="relative group shrink-0">
                                  <img
                                    src={srv.image}
                                    alt="Thumb"
                                    className="w-8 h-8 rounded-lg object-cover border border-amber-500/40"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...props.servicesCatalogData.items]
                                      delete updated[idx].image
                                      delete updated[idx].imageLayout
                                      props.setServicesCatalogData({ ...props.servicesCatalogData, items: updated })
                                      props.setHasUnsavedChanges(true)
                                    }}
                                    className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-500 text-white rounded-full p-0.5 text-[8px] opacity-0 group-hover:opacity-100 transition shadow"
                                    title="Remover foto"
                                  >
                                    <X className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <p className="text-[9.5px] text-stone-500 leading-snug">
                              {(srv.imageLayout || 'thumb') === 'cover'
                                ? '✨ Exibindo como Card Editorial: Imagem grande com valor e agendamento logo abaixo.'
                                : '✨ Exibindo como Botão com Miniatura: Foto quadrada de 60px ao lado do nome do serviço.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tarja de Diferenciais & Selos de Pagamento / Facilidades */}
                <div id="block-amenities" className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-stone-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
                        💳 Selos de Pagamento &amp; Facilidades (4 Diferenciais)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        props.setServicesCatalogData({
                          ...props.servicesCatalogData,
                          showAmenities: props.servicesCatalogData?.showAmenities === false ? true : false
                        })
                        props.setHasUnsavedChanges(true)
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        props.servicesCatalogData?.showAmenities !== false
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {props.servicesCatalogData?.showAmenities !== false ? 'LIGADO' : 'DESLIGADO'}
                    </button>
                  </div>

                  {props.servicesCatalogData?.showAmenities !== false && (
                    <div className="space-y-3 pt-1">
                      <p className="text-[10px] text-stone-400 leading-relaxed">
                        Personalize os 4 selos de confiança exibidos abaixo do catálogo de serviços (formas de pagamento, estacionamento, facilidades de acesso e conforto VIP).
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] font-mono text-stone-300 block mb-1">
                            💳 Item 1 (Pagamento)
                          </label>
                          <input
                            type="text"
                            value={props.servicesCatalogData?.amenitiesItem1 ?? 'Cartão até 12x'}
                            onChange={(e) => {
                              props.setServicesCatalogData({
                                ...props.servicesCatalogData,
                                amenitiesItem1: e.target.value
                              })
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Cartão até 12x"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-mono text-stone-300 block mb-1">
                            ⚡ Item 2 (Instantâneo)
                          </label>
                          <input
                            type="text"
                            value={props.servicesCatalogData?.amenitiesItem2 ?? 'Pix Instantâneo'}
                            onChange={(e) => {
                              props.setServicesCatalogData({
                                ...props.servicesCatalogData,
                                amenitiesItem2: e.target.value
                              })
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Pix Instantâneo"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-mono text-stone-300 block mb-1">
                            🚗 Item 3 (Acesso / Local)
                          </label>
                          <input
                            type="text"
                            value={props.servicesCatalogData?.amenitiesItem3 ?? 'Fácil Acesso'}
                            onChange={(e) => {
                              props.setServicesCatalogData({
                                ...props.servicesCatalogData,
                                amenitiesItem3: e.target.value
                              })
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Fácil Acesso"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-mono text-stone-300 block mb-1">
                            🛡️ Item 4 (Conforto / VIP)
                          </label>
                          <input
                            type="text"
                            value={props.servicesCatalogData?.amenitiesItem4 ?? 'Espaço VIP'}
                            onChange={(e) => {
                              props.setServicesCatalogData({
                                ...props.servicesCatalogData,
                                amenitiesItem4: e.target.value
                              })
                              props.setHasUnsavedChanges(true)
                            }}
                            placeholder="Espaço VIP"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 text-xs"
                          />
                        </div>
                      </div>

                      {/* Cores Personalizadas dos Diferenciais */}
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <label className="text-[9.5px] font-mono uppercase text-amber-300 font-bold block">
                          Cores dos Selos / Diferenciais
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Fundo</label>
                            <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.servicesCatalogData?.amenitiesBg || props.selectedPalette.card || '#14161c'}
                                onChange={(e) => {
                                  props.setServicesCatalogData({ ...props.servicesCatalogData, amenitiesBg: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.servicesCatalogData?.amenitiesBg || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setServicesCatalogData({ ...props.servicesCatalogData, amenitiesBg: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Texto</label>
                            <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.servicesCatalogData?.amenitiesText || props.selectedPalette.text || '#ffffff'}
                                onChange={(e) => {
                                  props.setServicesCatalogData({ ...props.servicesCatalogData, amenitiesText: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.servicesCatalogData?.amenitiesText || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setServicesCatalogData({ ...props.servicesCatalogData, amenitiesText: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Borda</label>
                            <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.servicesCatalogData?.amenitiesBorder || props.selectedPalette.accent || '#f59e0b'}
                                onChange={(e) => {
                                  props.setServicesCatalogData({ ...props.servicesCatalogData, amenitiesBorder: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.servicesCatalogData?.amenitiesBorder || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setServicesCatalogData({ ...props.servicesCatalogData, amenitiesBorder: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sombra 3D dos Diferenciais */}
                      <div className="pt-2 border-t border-white/5">
                        <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-300 mb-1">
                          Sombra &amp; Profundidade 3D dos Selos
                        </label>
                        <select
                          value={props.servicesCatalogData?.amenitiesShadowDepth || 'profunda_3d'}
                          onChange={(e) => {
                            props.setServicesCatalogData({ ...props.servicesCatalogData, amenitiesShadowDepth: e.target.value })
                            props.setHasUnsavedChanges(true)
                          }}
                          className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                        >
                          <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                          <option value="elevada_luxo">👑 Relevo Alto &amp; Super Profundo</option>
                          <option value="neon_glow">✨ Brilho Neon &amp; Glow</option>
                          <option value="suave">🔘 Relevo Suave</option>
                          <option value="plana">⚪ Plana (Sem Sombra)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                </fieldset>
              </div>
            )}

            {/* ======================================================= */}
            {/* 5. SEÇÃO: PORTFÓLIO & GALERIA */}
            {/* ======================================================= */}
            {activeSection === 'portfolio' && (
              <div className="space-y-4 animate-fade-in">
                {!canEditPhotos && (
                  <div className="p-3 mb-2 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">Galeria de Fotos Bloqueada</span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">As fotos do portfólio foram curadas pelo administrador e estão em modo somente-leitura.</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={!canEditPhotos} className={!canEditPhotos ? 'opacity-50 pointer-events-none' : ''}>
                {/* Galeria Oficial de Fotos & Portfólio (studentGrid / BioVip Oficial) */}
                <div id="block-gallery" className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                  {/* Header do Módulo com Switch */}
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-200">
                            Galeria de Fotos &amp; Portfólio
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            {effectiveGalleryConfig.photos?.length || 0} FOTOS
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-400">
                          Layouts responsivos, carrossel touch, mosaico e zoom lightbox
                        </p>
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <span className="text-[10px] font-mono font-bold uppercase text-stone-400">
                        {effectiveGalleryConfig.enabled ? 'ATIVADA' : 'DESATIVADA'}
                      </span>
                      <input
                        type="checkbox"
                        checked={effectiveGalleryConfig.enabled}
                        onChange={(e) => updateGalleryConfig((prev: any) => ({ ...prev, enabled: e.target.checked }))}
                        className="accent-amber-500 w-4 h-4 cursor-pointer"
                      />
                    </label>
                  </div>

                  {effectiveGalleryConfig.enabled && (
                    <div className="space-y-4 pt-1">
                      {/* Textos: Badge, Headline e Subtitle */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div>
                          <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                            Badge Superior
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: PORTFÓLIO VIP"
                            value={effectiveGalleryConfig.badge || ''}
                            onChange={(e) => updateGalleryConfig((prev: any) => ({ ...prev, badge: e.target.value }))}
                            className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-amber-300 font-bold uppercase focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                            Título da Galeria
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Resultados Reais & Portfólio"
                            value={effectiveGalleryConfig.headline || ''}
                            onChange={(e) => updateGalleryConfig((prev: any) => ({ ...prev, headline: e.target.value }))}
                            className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-stone-100 font-semibold focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                          Subtítulo Explicativo
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Transformações reais geradas pelo método e registros de alto padrão"
                          value={effectiveGalleryConfig.subtitle || ''}
                          onChange={(e) => updateGalleryConfig((prev: any) => ({ ...prev, subtitle: e.target.value }))}
                          className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-stone-300 focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      {/* 4 Formatos de Exibição no Celular (BioVip Original) */}
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-mono uppercase font-bold text-stone-300 block">
                          Formato de Exibição no Celular
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'carousel-snap', label: '🎠 Carrossel Touch', desc: 'Deslize horizontal fluido' },
                            { id: 'grid-2col', label: '📱 Grade 2 Colunas', desc: 'Fotos lado a lado' },
                            { id: 'mosaic', label: '🎨 Mosaico Dinâmico', desc: 'Destaque 1ª grande + grid' },
                            { id: 'scroll-cards', label: '🃏 Cards Expandidos', desc: '1 por vez com foco total' }
                          ].map((t) => {
                            const isSelected = (effectiveGalleryConfig.layout || 'carousel-snap') === t.id
                            return (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => updateGalleryConfig((prev: any) => ({ ...prev, layout: t.id as any }))}
                                className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                                  isSelected
                                    ? 'border-amber-400 bg-amber-500/15 text-amber-200 shadow-sm'
                                    : 'border-stone-800 bg-stone-950/70 text-stone-400 hover:text-stone-200'
                                }`}
                              >
                                <div className="text-[11px] font-bold">{t.label}</div>
                                <div className="text-[9px] opacity-75 mt-0.5 leading-snug">{t.desc}</div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Proporção das Imagens & Lightbox */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase font-semibold text-stone-300 block">
                            Formato das Imagens (Proporção)
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {[
                              { id: 'auto', label: '🤖 Auto' },
                              { id: 'square', label: '1:1 Quadrado' },
                              { id: 'portrait', label: '4:5 Retrato' },
                              { id: 'landscape', label: '4:3 Paisagem' }
                            ].map((t) => {
                              const isSelected = (effectiveGalleryConfig.aspectRatio || 'auto') === t.id
                              return (
                                <button
                                  key={t.id}
                                  type="button"
                                  onClick={() => updateGalleryConfig((prev: any) => ({ ...prev, aspectRatio: t.id as any }))}
                                  className={`py-1.5 px-2 rounded-lg border text-center text-[10px] font-medium transition cursor-pointer ${
                                    isSelected
                                      ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold'
                                      : 'border-stone-800 bg-stone-950/70 text-stone-400 hover:text-stone-200'
                                  }`}
                                >
                                  {t.label}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold text-stone-200 block">
                              Zoom Lightbox
                            </span>
                            <span className="text-[9.5px] text-stone-400 block">
                              Toque na foto para ampliar em tela cheia com legendas
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            checked={effectiveGalleryConfig.enableLightbox !== false}
                            onChange={(e) => updateGalleryConfig((prev: any) => ({ ...prev, enableLightbox: e.target.checked }))}
                            className="accent-amber-500 w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Efeito de Sombra & Profundidade 3D da Galeria */}
                      <div className="pt-2 border-t border-stone-800/80">
                        <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-300 mb-1">
                          Sombra & Profundidade 3D das Fotos / Mosaico
                        </label>
                        <select
                          value={effectiveGalleryConfig.shadowDepth || 'profunda_3d'}
                          onChange={(e) => updateGalleryConfig((prev: any) => ({ ...prev, shadowDepth: e.target.value }))}
                          className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                        >
                          <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                          <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                          <option value="neon_glow">✨ Brilho Neon & Glow</option>
                          <option value="suave">🔘 Relevo Suave</option>
                          <option value="plana">⚪ Plana (Sem Sombra)</option>
                        </select>
                      </div>

                      {/* Presets de Fotos por Nicho (BioVip Original) */}
                      <div className="space-y-1.5 pt-2 border-t border-stone-800/80">
                        <label className="text-[10px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          Preencher Fotos com Exemplos de Alto Padrão por Nicho:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <button
                            type="button"
                            onClick={() => loadGalleryPreset('beauty')}
                            className="px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-[11px] text-stone-300 font-medium transition cursor-pointer text-center"
                          >
                            💅 Beleza &amp; Lash
                          </button>
                          <button
                            type="button"
                            onClick={() => loadGalleryPreset('barber')}
                            className="px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-[11px] text-stone-300 font-medium transition cursor-pointer text-center"
                          >
                            ✂️ Barbearia
                          </button>
                          <button
                            type="button"
                            onClick={() => loadGalleryPreset('health')}
                            className="px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-[11px] text-stone-300 font-medium transition cursor-pointer text-center"
                          >
                            🩺 Saúde &amp; Clínica
                          </button>
                          <button
                            type="button"
                            onClick={() => loadGalleryPreset('exec')}
                            className="px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-[11px] text-stone-300 font-medium transition cursor-pointer text-center"
                          >
                            💼 Executivo &amp; Cursos
                          </button>
                        </div>
                      </div>

                      {/* Gerenciamento das Fotos: Upload e Lista */}
                      <div className="space-y-2 pt-2 border-t border-stone-800/80">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-stone-200">
                            Fotos na Galeria ({effectiveGalleryConfig.photos?.length || 0})
                          </label>
                          <label className="text-[10.5px] font-mono text-amber-400 hover:text-amber-300 hover:underline cursor-pointer flex items-center gap-1.5 font-bold">
                            <Upload className="w-3.5 h-3.5" />
                            + Upload Direto do Computador
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleGalleryUpload}
                            />
                          </label>
                        </div>

                        {/* Grid de Cards de Fotos */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[460px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-stone-800">
                          {effectiveGalleryConfig.photos?.map((photoUrl: string, i: number) => {
                            const caption = (effectiveGalleryConfig.captions || [])[i] || ''
                            return (
                              <div
                                key={i}
                                className="p-2 rounded-xl bg-stone-950 border border-stone-800 space-y-2 relative group"
                              >
                                <div className="relative aspect-square rounded-lg overflow-hidden border border-stone-800/80 bg-black">
                                  <img
                                    src={photoUrl}
                                    alt={caption || `Foto ${i + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[8px] font-mono font-bold text-white">
                                    #{i + 1}
                                  </span>

                                  {/* Botão Zoom Lightbox */}
                                  <button
                                    type="button"
                                    onClick={() => setPreviewLightboxIndex(i)}
                                    className="absolute bottom-1 right-1 p-1 rounded-md bg-black/70 text-white hover:bg-black/90 cursor-pointer transition shadow"
                                    title="Visualizar no Lightbox"
                                  >
                                    <ZoomIn className="w-3 h-3 text-amber-400" />
                                  </button>
                                </div>

                                {/* Legenda opcional da foto */}
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Legenda da foto..."
                                    value={caption}
                                    onChange={(e) => updateGalleryCaption(i, e.target.value)}
                                    className="w-full px-2 py-1 text-[10px] rounded-lg bg-stone-900 border border-stone-800 text-stone-200 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                                  />
                                </div>

                                {/* Controles: Mover, Substituir, Excluir */}
                                <div className="flex items-center justify-between gap-1 pt-0.5">
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={i === 0}
                                      onClick={() => moveGalleryPhoto(i, i - 1)}
                                      className="p-1 rounded bg-stone-900 text-stone-300 hover:bg-stone-800 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                      title="Mover para esquerda"
                                    >
                                      <ChevronLeft className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={i === (effectiveGalleryConfig.photos?.length || 0) - 1}
                                      onClick={() => moveGalleryPhoto(i, i + 1)}
                                      className="p-1 rounded bg-stone-900 text-stone-300 hover:bg-stone-800 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                      title="Mover para direita"
                                    >
                                      <ChevronRight className="w-3 h-3" />
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-1">
                                    <label
                                      className="p-1 rounded bg-stone-900 hover:bg-amber-500/20 text-stone-300 hover:text-amber-400 transition cursor-pointer"
                                      title="Substituir foto por arquivo local"
                                    >
                                      <Upload className="w-3 h-3" />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleReplaceGalleryPhoto(i, e)}
                                      />
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => removeGalleryPhoto(i)}
                                      className="p-1 rounded bg-stone-900 hover:bg-red-500/20 text-stone-400 hover:text-red-400 transition cursor-pointer"
                                      title="Excluir foto"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Adicionar por URL */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="Cole a URL da imagem aqui (https://...)"
                            value={newGalleryUrl}
                            onChange={(e) => setNewGalleryUrl(e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-stone-200 focus:border-amber-400 focus:outline-none font-mono"
                          />
                          <input
                            type="text"
                            placeholder="Legenda da imagem (opcional)"
                            value={newGalleryCaption}
                            onChange={(e) => setNewGalleryCaption(e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-stone-200 focus:border-amber-400 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newGalleryUrl.trim()) {
                                updateGalleryConfig((prev: any) => ({
                                  ...prev,
                                  photos: [...prev.photos, newGalleryUrl.trim()],
                                  captions: [...(prev.captions || []), newGalleryCaption.trim()]
                                }))
                                setNewGalleryUrl('')
                                setNewGalleryCaption('')
                              }
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs font-mono uppercase flex items-center justify-center gap-1 cursor-pointer transition shadow"
                          >
                            <Plus className="w-3.5 h-3.5" /> Adicionar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                </fieldset>
              </div>
            )}

            {/* ======================================================= */}
            {/* 5.5. SEÇÃO: MÓDULOS & BLOCOS DO BIOSITE (15 BLOCOS) */}
            {/* ======================================================= */}
            {activeSection === 'modulos' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-mono uppercase text-amber-300 font-black">
                        Ligar & Desligar Blocos do BioSite
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed mt-1">
                      Ative ou desative qualquer um dos 15 módulos do seu BioSite com apenas 1 clique. As alterações são sincronizadas instantaneamente no seu link.
                    </p>
                  </div>

                  {canEditModules && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleBatchModulesClient(true)}
                        className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition cursor-pointer"
                      >
                        Ativar Todos
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBatchModulesClient(false)}
                        className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 transition cursor-pointer"
                      >
                        Desativar Todos
                      </button>
                    </div>
                  )}
                </div>

                {!canEditModules && (
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">
                        Controle de Módulos Bloqueado pelo Administrador
                      </span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">
                        Os módulos deste BioSite são administrados diretamente pela agência. Abaixo você pode visualizar quais blocos estão ativos.
                      </p>
                    </div>
                  </div>
                )}

                {/* Lista com os 15 Módulos */}
                <div className="space-y-2.5">
                  {(Object.keys(modules) as Array<keyof ModuleToggles>).map((key) => {
                    const isEnabled = modules[key]
                    const info = MODULE_DESCRIPTIONS[key]
                    return (
                      <div
                        key={key}
                        onClick={() => {
                          if (canEditModules) {
                            handleToggleModuleClient(key)
                          }
                        }}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          canEditModules ? 'cursor-pointer hover:border-amber-400/50' : 'cursor-default opacity-85'
                        } ${
                          isEnabled
                            ? 'bg-amber-950/20 border-amber-500/40 shadow-sm'
                            : 'bg-stone-900/40 border-stone-800 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${
                              isEnabled
                                ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                                : 'bg-stone-800 text-stone-500 border-stone-700'
                            }`}
                          >
                            {isEnabled ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white truncate block">
                                {info?.label || key}
                              </span>
                              <span
                                className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                                  isEnabled
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-stone-800 text-stone-500 border border-stone-700'
                                }`}
                              >
                                {isEnabled ? 'Visível' : 'Oculto'}
                              </span>
                            </div>
                            <p className="text-[10.5px] text-stone-400 leading-snug mt-0.5">
                              {info?.description}
                            </p>
                          </div>
                        </div>

                        {canEditModules && (
                          <div
                            className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                              isEnabled ? 'bg-amber-400' : 'bg-stone-800'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full bg-stone-950 transition-transform ${
                                isEnabled ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 6. SEÇÃO: PROVA SOCIAL & DEPOIMENTOS */}
            {/* ======================================================= */}
            {activeSection === 'social' && (
              <div className="space-y-4 animate-fade-in">
                {/* Nota do Google */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    Avaliações do Google Meu Negócio
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">
                        Nota Geral (1.0 a 5.0)
                      </label>
                      <input
                        type="text"
                        value={props.rating}
                        onChange={(e) => {
                          props.setRating(e.target.value)
                          props.setHasUnsavedChanges(true)
                        }}
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 text-xs font-mono font-bold text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono uppercase text-stone-400 mb-1">
                        Número de Reviews
                      </label>
                      <input
                        type="text"
                        value={props.reviewsCount}
                        onChange={(e) => {
                          props.setReviewsCount(e.target.value)
                          props.setHasUnsavedChanges(true)
                        }}
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 text-xs font-mono font-bold text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Métricas de Autoridade */}
                <div id="block-metrics" className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-300 font-bold block">
                    Métricas de Autoridade (3 Destaques)
                  </span>
                  <div className="space-y-2">
                    {(props.metricsData || []).map((m: any, idx: number) => (
                      <div key={idx} className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={m.value}
                          onChange={(e) => {
                            const updated = [...props.metricsData]
                            updated[idx].value = e.target.value
                            props.setMetricsData(updated)
                            props.setHasUnsavedChanges(true)
                          }}
                          placeholder="Valor (ex: +1.000)"
                          className="p-2 rounded-xl bg-stone-950 text-amber-300 border border-stone-800 text-xs font-mono font-bold text-center"
                        />
                        <input
                          type="text"
                          value={m.label}
                          onChange={(e) => {
                            const updated = [...props.metricsData]
                            updated[idx].label = e.target.value
                            props.setMetricsData(updated)
                            props.setHasUnsavedChanges(true)
                          }}
                          placeholder="Rótulo (ex: CLIENTES)"
                          className="p-2 rounded-xl bg-stone-950 text-stone-300 border border-stone-800 text-xs font-mono uppercase"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Sombra 3D das Métricas */}
                  <div className="pt-2 border-t border-white/5">
                    <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-400 mb-1">
                      Sombra & Profundidade 3D das Métricas
                    </label>
                    <select
                      value={props.metricsData?.[0]?.shadowDepth || 'profunda_3d'}
                      onChange={(e) => {
                        const updated = (props.metricsData || []).map((m: any) => ({ ...m, shadowDepth: e.target.value }))
                        props.setMetricsData(updated)
                        props.setHasUnsavedChanges(true)
                      }}
                      className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                    >
                      <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                      <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                      <option value="neon_glow">✨ Brilho Neon & Glow</option>
                      <option value="suave">🔘 Relevo Suave</option>
                      <option value="plana">⚪ Plana (Sem Sombra)</option>
                    </select>
                  </div>
                </div>

                {/* Como Funciona o Atendimento (Jornada em 3 Passos) */}
                <div id="block-how-it-works" className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      👣 Como Funciona o Atendimento (Passos)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newStep = {
                          number: `0${(props.howItWorksData || []).length + 1}`,
                          title: 'Novo Passo',
                          description: 'Descreva a etapa com clareza e autoridade.'
                        }
                        props.setHowItWorksData([...(props.howItWorksData || []), newStep])
                        props.setHasUnsavedChanges(true)
                      }}
                      className="px-2 py-0.5 rounded-md bg-[#E2B857] text-stone-950 font-bold text-[9px] uppercase flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Passo
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(props.howItWorksData || []).map((step: any, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={step.number || `0${idx + 1}`}
                            onChange={(e) => {
                              const updated = [...props.howItWorksData]
                              updated[idx].number = e.target.value
                              props.setHowItWorksData(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="w-12 p-1 rounded-lg bg-stone-900 text-amber-300 font-mono font-bold text-xs text-center border border-stone-800"
                            placeholder="01"
                          />
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => {
                              const updated = [...props.howItWorksData]
                              updated[idx].title = e.target.value
                              props.setHowItWorksData(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="flex-1 ml-2 p-1 rounded-lg bg-stone-900 text-stone-100 font-bold text-xs border border-stone-800"
                            placeholder="Título do Passo..."
                          />
                          {(props.howItWorksData || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const filtered = props.howItWorksData.filter((_: any, i: number) => i !== idx)
                                props.setHowItWorksData(filtered)
                                props.setHasUnsavedChanges(true)
                              }}
                              className="ml-2 text-stone-500 hover:text-red-400 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <textarea
                          rows={2}
                          value={step.description}
                          onChange={(e) => {
                            const updated = [...props.howItWorksData]
                            updated[idx].description = e.target.value
                            props.setHowItWorksData(updated)
                            props.setHasUnsavedChanges(true)
                          }}
                          className="w-full p-1.5 rounded-lg bg-stone-900 text-stone-300 text-[11px] border border-stone-800 resize-none font-sans"
                          placeholder="Descrição explicativa do passo..."
                        />
                      </div>
                    ))}
                  </div>

                  {/* Sombra 3D dos Passos */}
                  <div className="pt-2 border-t border-white/5">
                    <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-400 mb-1">
                      Sombra & Profundidade 3D dos Passos
                    </label>
                    <select
                      value={props.howItWorksData?.[0]?.shadowDepth || 'profunda_3d'}
                      onChange={(e) => {
                        const updated = (props.howItWorksData || []).map((s: any) => ({ ...s, shadowDepth: e.target.value }))
                        props.setHowItWorksData(updated)
                        props.setHasUnsavedChanges(true)
                      }}
                      className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                    >
                      <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                      <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                      <option value="neon_glow">✨ Brilho Neon & Glow</option>
                      <option value="suave">🔘 Relevo Suave</option>
                      <option value="plana">⚪ Plana (Sem Sombra)</option>
                    </select>
                  </div>
                </div>

                {/* Depoimentos de Clientes */}
                <div id="block-testimonials" className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans uppercase text-stone-300 font-bold">
                      Depoimentos ({props.testimonialsData?.length || 0})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newTestimonial = {
                          clientName: 'Cliente VIP',
                          city: 'São Paulo - SP',
                          text: 'Experiência maravilhosa, atendimento impecável e resultado incrível!',
                          rating: 5
                        }
                        props.setTestimonialsData([...(props.testimonialsData || []), newTestimonial])
                        props.setHasUnsavedChanges(true)
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#E2B857] text-stone-950 font-bold text-[10px] uppercase flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar
                    </button>
                  </div>

                  {/* Sombra 3D dos Depoimentos */}
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                    <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-400">
                      Sombra & Profundidade 3D dos Cards de Depoimento
                    </label>
                    <select
                      value={props.testimonialsData?.[0]?.shadowDepth || 'profunda_3d'}
                      onChange={(e) => {
                        const updated = (props.testimonialsData || []).map((t: any) => ({ ...t, shadowDepth: e.target.value }))
                        props.setTestimonialsData(updated)
                        props.setHasUnsavedChanges(true)
                      }}
                      className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                    >
                      <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                      <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                      <option value="neon_glow">✨ Brilho Neon & Glow</option>
                      <option value="suave">🔘 Relevo Suave</option>
                      <option value="plana">⚪ Plana (Sem Sombra)</option>
                    </select>
                  </div>

                  {(props.testimonialsData || []).map((t: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-400 font-bold">
                          DEPOIMENTO #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const filtered = props.testimonialsData.filter((_: any, i: number) => i !== idx)
                            props.setTestimonialsData(filtered)
                            props.setHasUnsavedChanges(true)
                          }}
                          className="text-stone-500 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={t.clientName}
                          onChange={(e) => {
                            const updated = [...props.testimonialsData]
                            updated[idx].clientName = e.target.value
                            props.setTestimonialsData(updated)
                            props.setHasUnsavedChanges(true)
                          }}
                          placeholder="Nome da Cliente"
                          className="p-1.5 rounded-lg bg-stone-950 text-stone-100 border border-stone-800 text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={t.city}
                          onChange={(e) => {
                            const updated = [...props.testimonialsData]
                            updated[idx].city = e.target.value
                            props.setTestimonialsData(updated)
                            props.setHasUnsavedChanges(true)
                          }}
                          placeholder="Cidade / Cargo"
                          className="p-1.5 rounded-lg bg-stone-950 text-stone-400 border border-stone-800 text-xs"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={t.text}
                        onChange={(e) => {
                          const updated = [...props.testimonialsData]
                          updated[idx].text = e.target.value
                          props.setTestimonialsData(updated)
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Texto da avaliação..."
                        className="w-full p-2 rounded-lg bg-stone-950 text-stone-300 border border-stone-800 text-[11px] leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 7. SEÇÃO: MÓDULOS VIP DE CONVERSÃO (8 MÓDULOS) */}
            {/* ======================================================= */}
            {activeSection === 'vip' && (
              <div className="space-y-3.5 animate-fade-in">
                {!canEditModules && (
                  <div className="p-3 mb-2 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">Módulos VIP Bloqueados</span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">A ativação dos módulos VIP é configurada pelo administrador.</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={!canEditModules} className={!canEditModules ? 'opacity-50 pointer-events-none' : ''}>
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40">
                  <span className="text-[10px] font-mono text-amber-300 font-black uppercase tracking-wider block mb-1">
                    👑 8 MÓDULOS VIP DE ALTA CONVERSÃO
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Personalize gatilhos de escassez, cronômetro de urgência, quiz qualificador, GPS e FAQ sanfonado.
                  </p>
                </div>

                {/* 1. Barra de Aviso Superior */}
                <div id="block-announcement" className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      📢 Barra de Aviso Superior
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        props.setAnnouncementData({
                          ...props.announcementData,
                          enabled: !props.announcementData?.enabled
                        })
                        props.setHasUnsavedChanges(true)
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        props.announcementData?.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {props.announcementData?.enabled ? 'LIGADO' : 'DESLIGADO'}
                    </button>
                  </div>
                  {props.announcementData?.enabled && (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={props.announcementData.badge}
                        onChange={(e) => {
                          props.setAnnouncementData({ ...props.announcementData, badge: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Badge (ex: AGENDA VIP ABERTA)"
                        className="w-full p-2 rounded-xl bg-stone-950 text-amber-300 border border-stone-800 text-xs font-mono font-bold"
                      />
                      <input
                        type="text"
                        value={props.announcementData.text}
                        onChange={(e) => {
                          props.setAnnouncementData({ ...props.announcementData, text: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Texto da barra de aviso..."
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs"
                      />

                      {/* Sombra 3D da Barra de Aviso */}
                      <div className="pt-2 border-t border-white/5">
                        <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-300 mb-1">
                          Sombra & Profundidade 3D da Barra
                        </label>
                        <select
                          value={props.announcementData.shadowDepth || 'profunda_3d'}
                          onChange={(e) => {
                            props.setAnnouncementData({ ...props.announcementData, shadowDepth: e.target.value })
                            props.setHasUnsavedChanges(true)
                          }}
                          className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                        >
                          <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                          <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                          <option value="neon_glow">✨ Brilho Neon & Glow</option>
                          <option value="suave">🔘 Relevo Suave</option>
                          <option value="plana">⚪ Plana (Sem Sombra)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Gatilho de Urgência & Cronômetro */}
                <div id="block-urgency" className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      🔥 Gatilho de Urgência &amp; Cronômetro
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        props.setUrgencyData({
                          ...props.urgencyData,
                          enabled: !props.urgencyData?.enabled
                        })
                        props.setHasUnsavedChanges(true)
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        props.urgencyData?.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {props.urgencyData?.enabled ? 'LIGADO' : 'DESLIGADO'}
                    </button>
                  </div>
                  {props.urgencyData?.enabled && (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={props.urgencyData.headline}
                        onChange={(e) => {
                          props.setUrgencyData({ ...props.urgencyData, headline: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Título de Urgência (ex: 🔥 CONDIÇÃO ESPECIAL DE HOJE)"
                        className="w-full p-2 rounded-xl bg-stone-950 text-amber-300 border border-stone-800 text-xs font-mono font-bold"
                      />
                      <input
                        type="text"
                        value={props.urgencyData.subtitle}
                        onChange={(e) => {
                          props.setUrgencyData({ ...props.urgencyData, subtitle: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Subtítulo..."
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-300 border border-stone-800 text-xs"
                      />

                      {/* Cores do Módulo de Urgência */}
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <label className="text-[9.5px] font-mono uppercase text-amber-300 font-bold block">
                          Cores do Banner de Urgência
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Fundo</label>
                            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.urgencyData.customBg || props.selectedPalette.card || '#14161c'}
                                onChange={(e) => {
                                  props.setUrgencyData({ ...props.urgencyData, customBg: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.urgencyData.customBg || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setUrgencyData({ ...props.urgencyData, customBg: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9.5px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Texto</label>
                            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.urgencyData.customTextColor || '#fcd34d'}
                                onChange={(e) => {
                                  props.setUrgencyData({ ...props.urgencyData, customTextColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.urgencyData.customTextColor || ''}
                                placeholder="#fcd34d"
                                onChange={(e) => {
                                  props.setUrgencyData({ ...props.urgencyData, customTextColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9.5px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Borda</label>
                            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.urgencyData.customBorderColor || props.selectedPalette.accent || '#f59e0b'}
                                onChange={(e) => {
                                  props.setUrgencyData({ ...props.urgencyData, customBorderColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.urgencyData.customBorderColor || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setUrgencyData({ ...props.urgencyData, customBorderColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9.5px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Cronômetro</label>
                            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.urgencyData.customAccentColor || '#fcd34d'}
                                onChange={(e) => {
                                  props.setUrgencyData({ ...props.urgencyData, customAccentColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.urgencyData.customAccentColor || ''}
                                placeholder="#fcd34d"
                                onChange={(e) => {
                                  props.setUrgencyData({ ...props.urgencyData, customAccentColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9.5px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Sombra 3D do Banner de Urgência */}
                        <div className="pt-2 border-t border-white/5">
                          <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-300 mb-1">
                            Sombra & Profundidade 3D do Banner de Urgência
                          </label>
                          <select
                            value={props.urgencyData.shadowDepth || 'profunda_3d'}
                            onChange={(e) => {
                              props.setUrgencyData({ ...props.urgencyData, shadowDepth: e.target.value })
                              props.setHasUnsavedChanges(true)
                            }}
                            className="w-full p-1.5 rounded-lg bg-stone-900 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                          >
                            <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                            <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                            <option value="neon_glow">✨ Brilho Neon & Glow</option>
                            <option value="suave">🔘 Relevo Suave</option>
                            <option value="plana">⚪ Plana (Sem Sombra)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Triagem Anti-Curiosos (Quiz VIP) */}
                <div id="block-quiz" className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      🎯 Triagem Anti-Curiosos (Quiz VIP)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        props.setQuizData({
                          ...props.quizData,
                          enabled: !props.quizData?.enabled
                        })
                        props.setHasUnsavedChanges(true)
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        props.quizData?.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {props.quizData?.enabled ? 'LIGADO' : 'DESLIGADO'}
                    </button>
                  </div>
                  {props.quizData?.enabled && (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={props.quizData.buttonLabel}
                        onChange={(e) => {
                          props.setQuizData({ ...props.quizData, buttonLabel: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Texto do botão do Quiz"
                        className="w-full p-2 rounded-xl bg-stone-950 text-amber-300 border border-stone-800 text-xs font-bold"
                      />

                      {/* Cores Personalizadas do Quiz */}
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <label className="text-[9.5px] font-mono uppercase text-amber-300 font-bold block">
                          Cores do Botão de Quiz
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Fundo</label>
                            <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.quizData.customBg || props.selectedPalette.card || '#14161c'}
                                onChange={(e) => {
                                  props.setQuizData({ ...props.quizData, customBg: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.quizData.customBg || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setQuizData({ ...props.quizData, customBg: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Texto</label>
                            <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.quizData.customTextColor || props.selectedPalette.text || '#ffffff'}
                                onChange={(e) => {
                                  props.setQuizData({ ...props.quizData, customTextColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.quizData.customTextColor || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setQuizData({ ...props.quizData, customTextColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Borda</label>
                            <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.quizData.customBorderColor || props.selectedPalette.accent || '#f59e0b'}
                                onChange={(e) => {
                                  props.setQuizData({ ...props.quizData, customBorderColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.quizData.customBorderColor || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setQuizData({ ...props.quizData, customBorderColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sombra 3D do Quiz */}
                      <div className="pt-2 border-t border-white/5">
                        <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-300 mb-1">
                          Sombra & Profundidade 3D do Botão de Quiz
                        </label>
                        <select
                          value={props.quizData.shadowDepth || 'profunda_3d'}
                          onChange={(e) => {
                            props.setQuizData({ ...props.quizData, shadowDepth: e.target.value })
                            props.setHasUnsavedChanges(true)
                          }}
                          className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                        >
                          <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                          <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                          <option value="neon_glow">✨ Brilho Neon & Glow</option>
                          <option value="suave">🔘 Relevo Suave</option>
                          <option value="plana">⚪ Plana (Sem Sombra)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Localização com GPS & Aberto Agora */}
                <div id="block-location" className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      📍 Localização com GPS &amp; Aberto Agora
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        props.setLocationData({
                          ...props.locationData,
                          enabled: !props.locationData?.enabled
                        })
                        props.setHasUnsavedChanges(true)
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        props.locationData?.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {props.locationData?.enabled ? 'LIGADO' : 'DESLIGADO'}
                    </button>
                  </div>
                  {props.locationData?.enabled && (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={props.locationData.address}
                        onChange={(e) => {
                          props.setLocationData({ ...props.locationData, address: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Endereço físico..."
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs"
                      />
                      <input
                        type="text"
                        value={props.locationData.hours}
                        onChange={(e) => {
                          props.setLocationData({ ...props.locationData, hours: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Horários (ex: Seg a Sex · 09h às 19h)"
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-400 border border-stone-800 text-xs font-mono"
                      />

                      {/* Cores Personalizadas da Localização */}
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <label className="text-[9.5px] font-mono uppercase text-amber-300 font-bold block">
                          Cores do Card de Localização
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Fundo</label>
                            <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.locationData.customBg || props.selectedPalette.card || '#14161c'}
                                onChange={(e) => {
                                  props.setLocationData({ ...props.locationData, customBg: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.locationData.customBg || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setLocationData({ ...props.locationData, customBg: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Borda</label>
                            <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.locationData.customBorderColor || props.selectedPalette.accent || '#f59e0b'}
                                onChange={(e) => {
                                  props.setLocationData({ ...props.locationData, customBorderColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.locationData.customBorderColor || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setLocationData({ ...props.locationData, customBorderColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sombra 3D da Localização */}
                      <div className="pt-2 border-t border-white/5">
                        <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-300 mb-1">
                          Sombra & Profundidade 3D da Localização
                        </label>
                        <select
                          value={props.locationData.shadowDepth || 'profunda_3d'}
                          onChange={(e) => {
                            props.setLocationData({ ...props.locationData, shadowDepth: e.target.value })
                            props.setHasUnsavedChanges(true)
                          }}
                          className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                        >
                          <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                          <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                          <option value="neon_glow">✨ Brilho Neon & Glow</option>
                          <option value="suave">🔘 Relevo Suave</option>
                          <option value="plana">⚪ Plana (Sem Sombra)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Sobre o Especialista */}
                <div id="block-about-me" className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      👩‍⚕️ Sobre o Especialista
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        props.setAboutMeData({
                          ...props.aboutMeData,
                          enabled: !props.aboutMeData?.enabled
                        })
                        props.setHasUnsavedChanges(true)
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        props.aboutMeData?.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {props.aboutMeData?.enabled ? 'LIGADO' : 'DESLIGADO'}
                    </button>
                  </div>
                  {props.aboutMeData?.enabled && (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={props.aboutMeData.headline}
                        onChange={(e) => {
                          props.setAboutMeData({ ...props.aboutMeData, headline: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Título (ex: Sobre Nosso Atendimento)"
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs font-bold"
                      />
                      <textarea
                        rows={3}
                        value={props.aboutMeData.paragraph}
                        onChange={(e) => {
                          props.setAboutMeData({ ...props.aboutMeData, paragraph: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Texto institucional de autoridade..."
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-300 border border-stone-800 text-xs leading-relaxed"
                      />

                      {/* Cores Personalizadas do Sobre Mim */}
                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <label className="text-[9.5px] font-mono uppercase text-amber-300 font-bold block">
                          Cores do Bloco Sobre Mim
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Fundo</label>
                            <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.aboutMeData.customBg || props.selectedPalette.card || '#14161c'}
                                onChange={(e) => {
                                  props.setAboutMeData({ ...props.aboutMeData, customBg: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.aboutMeData.customBg || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setAboutMeData({ ...props.aboutMeData, customBg: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[8.5px] font-mono text-stone-400 block mb-0.5">Borda</label>
                            <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-lg p-1">
                              <input
                                type="color"
                                value={props.aboutMeData.customBorderColor || props.selectedPalette.accent || '#f59e0b'}
                                onChange={(e) => {
                                  props.setAboutMeData({ ...props.aboutMeData, customBorderColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded cursor-pointer bg-transparent border-0 p-0"
                              />
                              <input
                                type="text"
                                value={props.aboutMeData.customBorderColor || ''}
                                placeholder="Auto"
                                onChange={(e) => {
                                  props.setAboutMeData({ ...props.aboutMeData, customBorderColor: e.target.value })
                                  props.setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-transparent text-[9px] font-mono text-stone-200 outline-none uppercase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sombra 3D do Sobre Mim */}
                      <div className="pt-2 border-t border-white/5">
                        <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-300 mb-1">
                          Sombra & Profundidade 3D do Bloco Sobre Mim
                        </label>
                        <select
                          value={props.aboutMeData.shadowDepth || 'profunda_3d'}
                          onChange={(e) => {
                            props.setAboutMeData({ ...props.aboutMeData, shadowDepth: e.target.value })
                            props.setHasUnsavedChanges(true)
                          }}
                          className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                        >
                          <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                          <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                          <option value="neon_glow">✨ Brilho Neon & Glow</option>
                          <option value="suave">🔘 Relevo Suave</option>
                          <option value="plana">⚪ Plana (Sem Sombra)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Dúvidas Frequentes (FAQ) */}
                <div id="block-faq" className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      ❓ Dúvidas Frequentes ({props.faqData?.length || 0})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newFaq = {
                          question: 'Como agendar um horário?',
                          answer: 'Basta tocar no botão de WhatsApp e escolher o procedimento.'
                        }
                        props.setFaqData([...(props.faqData || []), newFaq])
                        props.setHasUnsavedChanges(true)
                      }}
                      className="px-2 py-0.5 rounded bg-[#E2B857] text-stone-950 text-[10px] font-mono font-bold uppercase"
                    >
                      + Pergunta
                    </button>
                  </div>

                  {/* Sombra 3D do FAQ */}
                  <div className="pt-1">
                    <label className="block text-[8.5px] font-sans font-bold uppercase text-stone-400 mb-1">
                      Sombra & Profundidade 3D das Sanfonas FAQ
                    </label>
                    <select
                      value={props.faqData?.[0]?.shadowDepth || 'profunda_3d'}
                      onChange={(e) => {
                        const updated = (props.faqData || []).map((faq: any) => ({ ...faq, shadowDepth: e.target.value }))
                        props.setFaqData(updated)
                        props.setHasUnsavedChanges(true)
                      }}
                      className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-200 border border-stone-800 text-[11px] font-sans focus:border-amber-400 focus:outline-none"
                    >
                      <option value="profunda_3d">💎 Luxo 3D Profundo</option>
                      <option value="elevada_luxo">👑 Relevo Alto & Super Profundo</option>
                      <option value="neon_glow">✨ Brilho Neon & Glow</option>
                      <option value="suave">🔘 Relevo Suave</option>
                      <option value="plana">⚪ Plana (Sem Sombra)</option>
                    </select>
                  </div>
                  <div className="space-y-2 pt-1">
                    {(props.faqData || []).map((faq: any, i: number) => (
                      <div key={i} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                        <div className="flex items-center justify-between gap-1">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const updated = [...props.faqData]
                              updated[i].question = e.target.value
                              props.setFaqData(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="flex-1 p-1.5 rounded-lg bg-stone-900 text-stone-200 border border-stone-800 text-xs font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              props.setFaqData(props.faqData.filter((_: any, idx: number) => idx !== i))
                              props.setHasUnsavedChanges(true)
                            }}
                            className="text-stone-500 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...props.faqData]
                            updated[i].answer = e.target.value
                            props.setFaqData(updated)
                            props.setHasUnsavedChanges(true)
                          }}
                          className="w-full p-1.5 rounded-lg bg-stone-900 text-stone-400 border border-stone-800 text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                </fieldset>
              </div>
            )}

            {/* ======================================================= */}
            {/* 8. SEÇÃO: PÍXEL, ANÚNCIOS & SEO */}
            {/* ======================================================= */}
            {activeSection === 'pixel' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 font-bold mb-1">
                    Meta Pixel ID (Facebook / Instagram Ads)
                  </label>
                  <input
                    type="text"
                    value={props.metaPixelId}
                    onChange={(e) => {
                      props.setMetaPixelId(e.target.value)
                      props.setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: 123456789012345"
                    className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 font-bold mb-1">
                    Google Analytics ID (GA4)
                  </label>
                  <input
                    type="text"
                    value={props.googleAnalyticsId}
                    onChange={(e) => {
                      props.setGoogleAnalyticsId(e.target.value)
                      props.setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: G-XXXXXXXXXX"
                    className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 font-bold mb-1">
                    TikTok Pixel ID
                  </label>
                  <input
                    type="text"
                    value={props.tiktokPixelId}
                    onChange={(e) => {
                      props.setTiktokPixelId(e.target.value)
                      props.setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: CXXXXXXXXXXXXXX"
                    className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    Rastreamento Automático de Conversões
                  </span>
                  <label className="flex items-center gap-2.5 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={props.trackWhatsappLead}
                      onChange={(e) => {
                        props.setTrackWhatsappLead(e.target.checked)
                        props.setHasUnsavedChanges(true)
                      }}
                      className="accent-amber-400 rounded"
                    />
                    <span>Disparar evento &quot;Lead&quot; ao clicar em qualquer botão do WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={props.trackPageView}
                      onChange={(e) => {
                        props.setTrackPageView(e.target.checked)
                        props.setHasUnsavedChanges(true)
                      }}
                      className="accent-amber-400 rounded"
                    />
                    <span>Disparar evento &quot;PageView&quot; ao carregar o BioSite</span>
                  </label>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 9. SEÇÃO: ASSINATURA & DOMÍNIO */}
            {/* ======================================================= */}
            {activeSection === 'assinatura' && (
              <div className="space-y-4 animate-fade-in">
                {/* Status 48h */}
                <div
                  className={`p-3.5 rounded-2xl border ${
                    props.paymentStatus === 'pendente'
                      ? 'bg-amber-500/10 border-amber-500/40'
                      : 'bg-emerald-500/10 border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase font-black tracking-wider text-amber-300">
                      STATUS DA ASSINATURA
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                        props.paymentStatus === 'pendente'
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {props.paymentStatus === 'pendente' ? 'PAGAMENTO PENDENTE (48H)' : 'ATIVA & 100% NO AR'}
                    </span>
                  </div>

                  {props.paymentStatus === 'pendente' ? (
                    <div className="space-y-2 mt-2">
                      <p className="text-xs text-stone-200 leading-relaxed">
                        Seu BioSite foi gerado e se encontra no ar em período de cortesia. Se após{' '}
                        <strong className="text-amber-400 font-mono">
                          {props.remainingHours}h restantes
                        </strong>{' '}
                        o pagamento não for confirmado, a página será suspensa.
                      </p>

                      <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-400">Plano Anual BioVip:</span>
                          <span className="font-bold text-amber-300 font-mono">R$ 49,90 /mês</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyPix}
                          className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs font-mono uppercase flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedPix ? 'Chave PIX Copiada!' : 'Copiar Chave PIX'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={props.handleConfirmPayment}
                          className="w-full py-2 rounded-lg border border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-400 font-bold text-xs font-mono uppercase transition cursor-pointer"
                        >
                          {props.isProcessingPayment ? 'Validando...' : '✓ Já Efetuei o Pagamento'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Sua assinatura anual está confirmada e seu BioSite está com alta prioridade nos servidores CDN.
                    </p>
                  )}
                </div>

                {/* Domínio & Endereço */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                    Endereço Oficial na Web
                  </span>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                    <code className="text-xs text-amber-300 font-mono">
                      biovip.com.br/{props.slug}
                    </code>
                    <a
                      href={`/${props.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-white transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rodapé Fixo da Coluna 3: Salvar Alterações */}
          <div className="p-4 border-t border-stone-800 bg-[#0E0E12] shrink-0">
            <button
              type="button"
              onClick={props.handleSavePage}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-[#E2B857] to-amber-400 hover:from-amber-300 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider font-mono shadow-lg shadow-amber-500/10 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </section>
  )
}

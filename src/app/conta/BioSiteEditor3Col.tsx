'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Palette,
  User,
  ShoppingBag,
  Image as ImageIcon,
  Star,
  Crown,
  Zap,
  CreditCard,
  Smartphone,
  Monitor,
  ExternalLink,
  Save,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Plus,
  Trash2,
  Lock,
  QrCode,
  Copy,
  Clock,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Layers,
  Wand2,
  Upload,
  Activity,
  Sliders,
  Check,
  Menu,
  X
} from 'lucide-react'

import {
  PALETTES,
  TYPOGRAPHIES,
  BUTTON_STYLES,
  BUTTON_ANIMATIONS,
  DEMO_PHOTOS,
  NICHES_LIST
} from '@/data/bioSiteDesign'

export interface BioSiteEditorProps {
  slug: string
  brandName: string
  setBrandName: (v: string) => void
  businessTitle: string
  setBusinessTitle: (v: string) => void
  niche: string
  setNiche: (v: string) => void
  tagline: string
  setTagline: (v: string) => void
  registrationCode: string
  setRegistrationCode: (v: string) => void
  monogram: string
  setMonogram: (v: string) => void
  customPhotoSrc: string | null
  setCustomPhotoSrc: (v: string | null) => void
  photoTreatment: 'original' | 'organico' | 'silhueta'
  setPhotoTreatment: (v: 'original' | 'organico' | 'silhueta') => void
  demoGender: 'mulher' | 'homem'
  setDemoGender: (v: 'mulher' | 'homem') => void
  selectedPalette: any
  setSelectedPalette: (v: any) => void
  selectedTypography: any
  setSelectedTypography: (v: any) => void
  buttonStyle: string
  setButtonStyle: (v: string) => void
  buttonAnimation: string
  setButtonAnimation: (v: string) => void
  backgroundStyle: string
  setBackgroundStyle: (v: string) => void
  buttons: any[]
  setButtons: (v: any[]) => void
  additionalPages: any[]
  setAdditionalPages: (v: any[]) => void
  rating: string
  setRating: (v: string) => void
  reviewsCount: string
  setReviewsCount: (v: string) => void
  userPhone: string
  setUserPhone: (v: string) => void
  userEmail: string
  setUserEmail: (v: string) => void
  announcementData: any
  setAnnouncementData: (v: any) => void
  urgencyData: any
  setUrgencyData: (v: any) => void
  servicesCatalogData: any
  setServicesCatalogData: (v: any) => void
  locationData: any
  setLocationData: (v: any) => void
  quizData: any
  setQuizData: (v: any) => void
  metricsData: any
  setMetricsData: (v: any) => void
  howItWorksData: any
  setHowItWorksData: (v: any) => void
  testimonialsData: any
  setTestimonialsData: (v: any) => void
  aboutMeData: any
  setAboutMeData: (v: any) => void
  faqData: any
  setFaqData: (v: any) => void
  metaPixelId: string
  setMetaPixelId: (v: string) => void
  tiktokPixelId: string
  setTiktokPixelId: (v: string) => void
  googleAnalyticsId: string
  setGoogleAnalyticsId: (v: string) => void
  trackWhatsappLead: boolean
  setTrackWhatsappLead: (v: boolean) => void
  trackPageView: boolean
  setTrackPageView: (v: boolean) => void
  paymentStatus: 'ativa' | 'pendente' | 'suspensa'
  deadline48h: string | null
  remainingHours: number
  handleConfirmPayment: () => void
  handleSavePage: () => void
  savedSuccess: boolean
  setSavedSuccess: (v: boolean) => void
  onBackToDashboard: () => void
  isAdminMode: boolean
  handleAiAutoFill: () => void
  aiFillSuccess: boolean
  setHasUnsavedChanges: (v: boolean) => void
  isProcessingPayment: boolean
}

type SectionTabId =
  | 'paleta'
  | 'cabecalho'
  | 'catalogo'
  | 'portfolio'
  | 'social'
  | 'vip'
  | 'pixel'
  | 'assinatura'

interface SectionItem {
  id: SectionTabId
  title: string
  subtitle: string
  icon: any
  isVip?: boolean
}

const SECTIONS: SectionItem[] = [
  { id: 'paleta', title: 'Paleta & Tipografia', subtitle: 'Cores, fontes e estilos de botão', icon: Palette },
  { id: 'cabecalho', title: 'Cabeçalho & Perfil', subtitle: 'Foto, nome, bio e IA', icon: User },
  { id: 'catalogo', title: 'Catálogo de Serviços', subtitle: 'Procedimentos, preços e links', icon: ShoppingBag },
  { id: 'portfolio', title: 'Portfólio & Páginas', subtitle: 'Antes & Depois e subpáginas', icon: ImageIcon },
  { id: 'social', title: 'Prova Social & Avaliações', subtitle: 'Google reviews e depoimentos', icon: Star },
  { id: 'vip', title: 'Módulos VIP', subtitle: '12 seções VIP de conversão', icon: Crown, isVip: true },
  { id: 'pixel', title: 'Píxel, Anúncios & SEO', subtitle: 'Meta, TikTok e Google Analytics', icon: Zap },
  { id: 'assinatura', title: 'Assinatura & Domínio', subtitle: 'Status 48h, PIX e endereço', icon: CreditCard }
]

export default function BioSiteEditor3Col(props: BioSiteEditorProps) {
  const [activeSection, setActiveSection] = useState<SectionTabId>('paleta')
  const [previewViewport, setPreviewViewport] = useState<'mobile' | 'desktop'>('mobile')
  const [mobileMode, setMobileMode] = useState<'editor' | 'preview'>('editor')
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [copiedPix, setCopiedPix] = useState(false)

  const handleCopyPix = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('00020126360014BR.GOV.BCB.PIX011412345678000199520400005303986540549.905802BR5915BIOVIP PRO6009SAO PAULO62070503***6304E2B8')
      setCopiedPix(true)
      setTimeout(() => setCopiedPix(false), 3000)
    }
  }

  const activeSectionObj = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0]

  return (
    <div className="h-screen w-full flex flex-col bg-[#0A0A0E] text-stone-100 overflow-hidden font-sans selection:bg-[#E2B857]/30 selection:text-white">
      {/* ========================================================= */}
      {/* BARRA SUPERIOR (NAVBAR FIXA GLOBAL) */}
      {/* ========================================================= */}
      <header className="h-14 sm:h-16 bg-[#0D0D11] border-b border-stone-800/80 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 z-30">
        {/* Esquerda: Logo, Voltar e Slug */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={props.onBackToDashboard}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-mono font-semibold transition flex items-center gap-1.5 cursor-pointer"
            title="Voltar para Minha Área"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Minha Área</span>
          </button>

          <div className="h-4 w-px bg-stone-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold hidden md:inline">
              EDITANDO:
            </span>
            <code className="text-xs font-mono font-bold text-amber-300 bg-stone-900/90 px-2.5 py-1 rounded-lg border border-amber-500/20">
              /{props.slug}
            </code>
            <span className="hidden lg:inline text-xs font-serif text-stone-400 truncate max-w-[140px]">
              ({props.businessTitle || props.brandName})
            </span>
          </div>
        </div>

        {/* Centro (Desktop): Alternador Mobile/Desktop & Ver ao Vivo */}
        <div className="hidden lg:flex items-center gap-2 bg-[#141418] p-1 rounded-xl border border-stone-800">
          <button
            type="button"
            onClick={() => setPreviewViewport('mobile')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              previewViewport === 'mobile'
                ? 'bg-[#E2B857] text-stone-950 font-bold shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewViewport('desktop')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              previewViewport === 'desktop'
                ? 'bg-[#E2B857] text-stone-950 font-bold shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
        </div>

        {/* Direita: Ações Rápidas & Salvar */}
        <div className="flex items-center gap-2.5">
          <a
            href={`/${props.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-semibold transition"
            title="Abrir BioSite no ar em nova aba"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver no ar</span>
          </a>

          {/* Botão de Preenchimento Rápido com IA */}
          <button
            type="button"
            onClick={props.handleAiAutoFill}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
              props.aiFillSuccess
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}
            title="Preencher com Inteligência Artificial baseado no nicho"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{props.aiFillSuccess ? 'Preenchido com IA!' : 'Preencher com IA'}</span>
          </button>

          {/* Botão Salvar Global */}
          <button
            type="button"
            onClick={() => {
              props.handleSavePage()
              props.setSavedSuccess(true)
              setTimeout(() => props.setSavedSuccess(false), 3000)
            }}
            className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl bg-gradient-to-r from-[#E2B857] via-[#F3D78A] to-[#E2B857] hover:brightness-105 active:scale-95 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#E2B857]/20 transition cursor-pointer"
          >
            {props.savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-stone-950" />
                <span>Salvo!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-stone-950" />
                <span>Salvar</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* BANNER DE AVISO: PAGAMENTO PENDENTE NO TOPO */}
      {props.paymentStatus === 'pendente' && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span>
              <strong>Pagamento Pendente:</strong> Confirme sua ativação em até <strong>48h</strong> para evitar suspensão.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveSection('assinatura')
              setMobileMode('editor')
            }}
            className="px-2.5 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] uppercase tracking-wide shrink-0 transition"
          >
            Ativar Agora
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* CORPO PRINCIPAL (DESKTOP: 3 COLUNAS | MOBILE: ADAPTADO) */}
      {/* ========================================================= */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* --------------------------------------------------------- */}
        {/* COLUNA 1 — Menu de Navegação / Seções (w-64 a w-72) */}
        {/* --------------------------------------------------------- */}
        <aside className="hidden lg:flex w-64 xl:w-72 bg-[#0D0D11] border-r border-stone-800/80 flex-col shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-stone-800/60 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 font-bold">
              ESTRUTURA DA PÁGINA
            </span>
            <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              8 BLOCOS
            </span>
          </div>

          <nav className="p-3 space-y-1.5 flex-1">
            {SECTIONS.map((sec, idx) => {
              const Icon = sec.icon
              const isActive = activeSection === sec.id
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-center gap-3 cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E2B857]/20 via-[#E2B857]/10 to-transparent text-[#E2B857] border-l-4 border-[#E2B857] shadow-sm font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-stone-900/80 border-l-4 border-transparent'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                      isActive
                        ? 'bg-[#E2B857] text-stone-950 font-bold shadow-xs'
                        : 'bg-stone-900 text-stone-400 group-hover:text-[#E2B857] border border-stone-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold truncate block">
                        {sec.title}
                      </span>
                      {sec.isVip && (
                        <span className="text-[8px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-950 font-black">
                          VIP
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-stone-500 block truncate">
                      {sec.subtitle}
                    </span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition ${isActive ? 'text-[#E2B857] translate-x-0.5' : 'text-stone-600'}`} />
                </button>
              )
            })}
          </nav>

          {/* Rodapé da Coluna 1 com dados rápidos */}
          <div className="p-4 border-t border-stone-800/60 bg-[#09090C] text-[11px] text-stone-400 space-y-2">
            <div className="flex items-center justify-between">
              <span>Status do BioSite:</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded-full text-[10px] ${
                props.paymentStatus === 'ativa'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {props.paymentStatus === 'ativa' ? '100% NO AR' : 'PENDENTE (48H)'}
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-500 text-[10px]">
              <span>Plano Atual:</span>
              <span className="text-stone-300 font-semibold">BioVip Pro</span>
            </div>
          </div>
        </aside>

        {/* --------------------------------------------------------- */}
        {/* COLUNA 2 — Palco Central / Canvas de Visualização (flex-1) */}
        {/* --------------------------------------------------------- */}
        <section
          className={`flex-1 bg-[#060608] flex flex-col items-center justify-center p-3 lg:p-6 overflow-hidden relative ${
            mobileMode === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Ambient Glow sutil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[580px] bg-gradient-to-b from-amber-500/5 via-stone-800/10 to-transparent blur-3xl pointer-events-none -z-0" />

          {/* IPHONE MOCKUP FIXO E CENTRALIZADO (ATUALIZAÇÃO EM TEMPO REAL) */}
          <div
            className={`relative select-none transition-all duration-300 ${
              previewViewport === 'desktop' && 'lg:max-w-xl lg:w-full'
            }`}
            style={{
              width: previewViewport === 'desktop' ? undefined : '290px',
              height: previewViewport === 'desktop' ? '92%' : '600px',
              maxHeight: '94vh'
            }}
          >
            {/* Moldura do Aparelho */}
            <div
              className="relative h-full w-full rounded-[42px] p-[9px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-stone-700/60 overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(145deg, #2d2d30 0%, #121214 45%, #252528 100%)'
              }}
            >
              {/* Tela do BioSite com Paleta Ativa */}
              <div
                className="relative h-full w-full rounded-[34px] overflow-y-auto flex flex-col text-center scrollbar-none transition-colors duration-300"
                style={{
                  backgroundColor: props.selectedPalette.bg,
                  color: props.selectedPalette.text
                }}
              >
                {/* Ilha Dinâmica e Registro no Topo */}
                <div className="relative z-20 pt-2.5 px-4 flex items-center justify-between text-[7px] font-mono tracking-widest text-stone-400 uppercase">
                  <div className="w-14 h-3.5 bg-black rounded-full mx-auto" />
                  <span className="font-bold opacity-80 absolute right-4 top-3 text-[8px]">
                    {props.registrationCode}
                  </span>
                </div>

                {/* Foto do Perfil com Efeito de Fusão de Estúdio */}
                <div className="relative w-full h-44 overflow-hidden -mt-3 select-none shrink-0">
                  <img
                    src={props.customPhotoSrc || (props.demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)}
                    alt={props.businessTitle || props.brandName}
                    className="w-full h-full object-cover"
                  />
                  {props.photoTreatment !== 'original' && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(to bottom, transparent 35%, ${props.selectedPalette.bg} 98%)`
                      }}
                    />
                  )}
                </div>

                {/* Bloco de Informações Principais */}
                <div className="px-4 pt-1 pb-6 flex-1 flex flex-col items-center">
                  <h3
                    className="font-bold text-xl leading-tight text-balance"
                    style={{ fontFamily: props.selectedTypography.cssFont }}
                  >
                    {props.businessTitle || props.brandName}
                  </h3>

                  <p className="text-[9px] uppercase tracking-[0.2em] font-mono mt-0.5 opacity-70">
                    {props.niche}
                  </p>

                  {/* Avaliações Google */}
                  <div className="mt-1 text-amber-400 text-[10px]">
                    ★★★★★ <span className="font-mono text-[9px] opacity-80">{props.rating} ({props.reviewsCount})</span>
                  </div>

                  {/* Subpáginas Pro */}
                  {props.additionalPages.length > 0 && (
                    <div className="flex items-center justify-center gap-1 mt-2 mb-1 flex-wrap">
                      {props.additionalPages.slice(0, 3).map((p: any) => (
                        <span
                          key={p.id}
                          className="px-2 py-0.5 rounded-full text-[7px] font-mono tracking-wider uppercase border border-white/10 bg-white/5 opacity-80"
                          style={{ color: props.selectedPalette.accent }}
                        >
                          {p.title.split(' ')[0]}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Botões do Mockup */}
                  <div className="w-full space-y-2 mt-2">
                    {props.buttons.map((btn: any) => {
                      const isHigh = !!btn.isHighlighted
                      return (
                        <div
                          key={btn.id}
                          className="w-full p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 shadow-sm transition"
                          style={{
                            backgroundColor: props.selectedPalette.card || '#14161c',
                            borderColor: isHigh ? props.selectedPalette.accent : `${props.selectedPalette.accent}33`,
                            color: props.selectedPalette.text
                          }}
                        >
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-[11px] block leading-tight truncate">
                              {btn.label}
                            </span>
                            {btn.subtitle && (
                              <span className="text-[9px] opacity-70 block truncate">
                                {btn.subtitle}
                              </span>
                            )}
                          </div>
                          <span
                            className="text-xs font-bold shrink-0"
                            style={{ color: props.selectedPalette.accent }}
                          >
                            →
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Tagline / Bio no Rodapé do Celular */}
                  {props.tagline && (
                    <p className="text-[10px] mt-4 opacity-75 font-serif italic max-w-xs leading-relaxed">
                      &quot;{props.tagline}&quot;
                    </p>
                  )}

                  {/* Selo BioVip Discreto */}
                  <div className="mt-auto pt-6 text-[8px] font-mono opacity-50 tracking-widest uppercase">
                    biovip.com.br/{props.slug}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- */}
        {/* COLUNA 3 — Painel de Edição do Bloco Ativo (w-80 a w-96) */}
        {/* --------------------------------------------------------- */}
        <section
          className={`w-full lg:w-80 xl:w-96 bg-[#141418] border-l border-stone-800/80 flex flex-col shrink-0 h-full overflow-hidden ${
            mobileMode === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Topo da Coluna 3: Título da Seção Ativa */}
          <div className="p-4 border-b border-stone-800/80 bg-[#101014] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E2B857]/15 text-[#E2B857] flex items-center justify-center font-bold">
                <activeSectionObj.icon className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                  {activeSectionObj.title}
                </h2>
                <p className="text-[10px] text-stone-400">
                  {activeSectionObj.subtitle}
                </p>
              </div>
            </div>

            {/* No mobile: Botão para abrir gaveta de seções */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-stone-900 text-stone-300 hover:text-white border border-stone-800"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Área de Formulário com Scroll Vertical Independente */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* 1. SEÇÃO: PALETA & TIPOGRAFIA */}
            {activeSection === 'paleta' && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-300 mb-2">
                    Paleta de Cores ({PALETTES.length} opções)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PALETTES.map((pal: any) => {
                      const isSelected = props.selectedPalette.id === pal.id
                      return (
                        <button
                          key={pal.id}
                          type="button"
                          onClick={() => {
                            props.setSelectedPalette(pal)
                            props.setHasUnsavedChanges(true)
                          }}
                          className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#E2B857] bg-[#E2B857]/10 ring-1 ring-[#E2B857]'
                              : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-stone-200 truncate">
                              {pal.name}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#E2B857]" />}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-4 h-4 rounded-full border border-black/40" style={{ backgroundColor: pal.bg }} />
                            <span className="w-4 h-4 rounded-full border border-black/40" style={{ backgroundColor: pal.accent }} />
                            <span className="w-4 h-4 rounded-full border border-black/40" style={{ backgroundColor: pal.card || '#222' }} />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t border-stone-800 pt-4">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-300 mb-2">
                    Tipografia Editorial
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TYPOGRAPHIES.map((typo: any) => {
                      const isSelected = props.selectedTypography.id === typo.id
                      return (
                        <button
                          key={typo.id}
                          type="button"
                          onClick={() => {
                            props.setSelectedTypography(typo)
                            props.setHasUnsavedChanges(true)
                          }}
                          className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                            isSelected
                              ? 'border-[#E2B857] bg-[#E2B857]/10 ring-1 ring-[#E2B857]'
                              : 'border-stone-800 bg-stone-900/80 hover:border-stone-700'
                          }`}
                        >
                          <span className="text-xs font-bold block" style={{ fontFamily: typo.cssFont }}>
                            {typo.name}
                          </span>
                          <span className="text-[10px] text-stone-400 block truncate">
                            {typo.category}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="border-t border-stone-800 pt-4">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-300 mb-2">
                    Estilo dos Botões (10 Modelos)
                  </label>
                  <select
                    value={props.buttonStyle}
                    onChange={(e) => {
                      props.setButtonStyle(e.target.value)
                      props.setHasUnsavedChanges(true)
                    }}
                    className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs font-semibold focus:border-[#E2B857] focus:outline-none"
                  >
                    {BUTTON_STYLES.map((bs: any) => (
                      <option key={bs.id} value={bs.id}>
                        {bs.name} — {bs.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* 2. SEÇÃO: CABEÇALHO & PERFIL */}
            {activeSection === 'cabecalho' && (
              <div className="space-y-4 animate-fade-in">
                {/* Preenchimento com IA em Destaque */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Assistente de IA BioVip
                    </span>
                    <button
                      type="button"
                      onClick={props.handleAiAutoFill}
                      className="px-3 py-1 rounded-lg bg-amber-500 text-stone-950 font-black text-[11px] uppercase tracking-wide hover:bg-amber-400 transition cursor-pointer"
                    >
                      {props.aiFillSuccess ? 'Preenchido!' : 'Gerar Tudo com IA'}
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Clique para preencher títulos, bio e botões automaticamente de acordo com o nicho selecionado.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 font-bold mb-1">
                    Nome / Marca
                  </label>
                  <input
                    type="text"
                    value={props.businessTitle}
                    onChange={(e) => {
                      props.setBusinessTitle(e.target.value)
                      props.setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: Dra. Rafaela Martins"
                    className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs focus:border-[#E2B857] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 font-bold mb-1">
                    Especialidade / Nicho
                  </label>
                  <input
                    type="text"
                    value={props.niche}
                    onChange={(e) => {
                      props.setNiche(e.target.value)
                      props.setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: Lash Designer & Estética VIP"
                    className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs focus:border-[#E2B857] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 font-bold mb-1">
                    Slogan / Bio de Apresentação
                  </label>
                  <textarea
                    rows={2}
                    value={props.tagline}
                    onChange={(e) => {
                      props.setTagline(e.target.value)
                      props.setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: Transformando olhares com naturalidade e elegância."
                    className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs focus:border-[#E2B857] focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                      Registro (CRM/CRO/OAB)
                    </label>
                    <input
                      type="text"
                      value={props.registrationCode}
                      onChange={(e) => {
                        props.setRegistrationCode(e.target.value)
                        props.setHasUnsavedChanges(true)
                      }}
                      placeholder="Ex: CRO 45.291-SP"
                      className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs focus:border-[#E2B857] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                      WhatsApp Principal
                    </label>
                    <input
                      type="text"
                      value={props.userPhone}
                      onChange={(e) => {
                        props.setUserPhone(e.target.value)
                        props.setHasUnsavedChanges(true)
                      }}
                      placeholder="Ex: 5511999999999"
                      className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs focus:border-[#E2B857] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. SEÇÃO: CATÁLOGO DE SERVIÇOS */}
            {activeSection === 'catalogo' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-stone-300 font-bold">
                    Botões de Ação ({props.buttons.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newBtn = {
                        id: `btn-${Date.now()}`,
                        label: 'NOVO SERVIÇO VIP',
                        subtitle: 'Toque para agendar no WhatsApp',
                        icon: 'calendar',
                        url: `https://wa.me/${props.userPhone || '5511999999999'}`
                      }
                      props.setButtons([...props.buttons, newBtn])
                      props.setHasUnsavedChanges(true)
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#E2B857] text-stone-950 font-bold text-[11px] uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar
                  </button>
                </div>

                <div className="space-y-2.5">
                  {props.buttons.map((btn: any, idx: number) => (
                    <div
                      key={btn.id}
                      className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-amber-400 font-bold">
                          BOTÃO #{idx + 1}
                        </span>
                        {props.buttons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              props.setButtons(props.buttons.filter((b: any) => b.id !== btn.id))
                              props.setHasUnsavedChanges(true)
                            }}
                            className="text-stone-500 hover:text-red-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={btn.label}
                        onChange={(e) => {
                          const updated = [...props.buttons]
                          updated[idx].label = e.target.value
                          props.setButtons(updated)
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Texto do Botão"
                        className="w-full p-2 rounded-lg bg-stone-950 text-stone-100 border border-stone-800 text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={btn.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...props.buttons]
                          updated[idx].subtitle = e.target.value
                          props.setButtons(updated)
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Subtítulo ou preço (opcional)"
                        className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-300 border border-stone-800 text-[11px]"
                      />
                      <input
                        type="text"
                        value={btn.url || ''}
                        onChange={(e) => {
                          const updated = [...props.buttons]
                          updated[idx].url = e.target.value
                          props.setButtons(updated)
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="Link (WhatsApp ou URL)"
                        className="w-full p-1.5 rounded-lg bg-stone-950 text-stone-400 border border-stone-800 text-[10px] font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SEÇÃO: PORTFÓLIO & PÁGINAS */}
            {activeSection === 'portfolio' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800">
                  <h3 className="font-bold text-xs text-white uppercase tracking-wider mb-1">
                    Páginas Pro Integradas ({props.additionalPages.length}/3)
                  </h3>
                  <p className="text-[11px] text-stone-400 leading-relaxed mb-3">
                    Cada página Pro inclui slider de Antes &amp; Depois, tabela completa de procedimentos e agenda VIP.
                  </p>

                  <div className="space-y-2">
                    {props.additionalPages.map((pg: any, idx: number) => (
                      <div
                        key={pg.id}
                        className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-2"
                      >
                        <div>
                          <p className="font-bold text-xs text-stone-200">{pg.title}</p>
                          <p className="text-[10px] font-mono text-stone-500">/{pg.slug}</p>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          ATIVA
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. SEÇÃO: PROVA SOCIAL & AVALIAÇÕES */}
            {activeSection === 'social' && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                      Nota Google (1.0 a 5.0)
                    </label>
                    <input
                      type="text"
                      value={props.rating}
                      onChange={(e) => {
                        props.setRating(e.target.value)
                        props.setHasUnsavedChanges(true)
                      }}
                      className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                      Número de Avaliações
                    </label>
                    <input
                      type="text"
                      value={props.reviewsCount}
                      onChange={(e) => {
                        props.setReviewsCount(e.target.value)
                        props.setHasUnsavedChanges(true)
                      }}
                      className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono font-bold text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 6. SEÇÃO: MÓDULOS VIP (12 SEÇÕES DE CONVERSÃO) */}
            {activeSection === 'vip' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40">
                  <span className="text-[10px] font-mono text-amber-300 font-black uppercase tracking-wider block mb-1">
                    👑 12 MÓDULOS VIP DISPONÍVEIS
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Personalize módulos de gatilhos de escassez, cronômetro de urgência, quiz qualificador e catálogo completo.
                  </p>
                </div>
              </div>
            )}

            {/* 7. SEÇÃO: PÍXEL, ANÚNCIOS & SEO */}
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
                    TikTok Pixel ID
                  </label>
                  <input
                    type="text"
                    value={props.tiktokPixelId}
                    onChange={(e) => {
                      props.setTiktokPixelId(e.target.value)
                      props.setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: C12345678901234"
                    className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                  />
                </div>
              </div>
            )}

            {/* 8. SEÇÃO: ASSINATURA & DOMÍNIO */}
            {activeSection === 'assinatura' && (
              <div className="space-y-4 animate-fade-in">
                <div className={`p-4 rounded-2xl border ${
                  props.paymentStatus === 'ativa'
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Status: {props.paymentStatus === 'ativa' ? 'BioSite Ativo' : 'Pagamento Pendente'}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/40">
                      {props.remainingHours}h restantes
                    </span>
                  </div>
                  <p className="text-[11px] opacity-80 leading-relaxed mb-3">
                    {props.paymentStatus === 'ativa'
                      ? 'Sua assinatura mensal está em dia e o BioSite permanece publicado com certificado SSL.'
                      : 'Seu BioSite foi criado e possui 48 horas de tolerância para confirmação do pagamento.'}
                  </p>

                  {props.paymentStatus === 'pendente' && (
                    <button
                      type="button"
                      disabled={props.isProcessingPayment}
                      onClick={props.handleConfirmPayment}
                      className="w-full py-2.5 rounded-xl bg-[#E2B857] hover:bg-[#d4a946] text-stone-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                    >
                      {props.isProcessingPayment ? 'Confirmando...' : 'Confirmar Pagamento e Ativar'}
                    </button>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800">
                  <span className="text-xs font-bold text-white block mb-1">
                    Endereço na Bio do Instagram
                  </span>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-amber-300">
                    <span className="truncate flex-1">biovip.com.br/{props.slug}</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof window !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(`https://biovip.com.br/${props.slug}`)
                        }
                      }}
                      className="p-1 text-stone-400 hover:text-white"
                      title="Copiar Link"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rodapé Fixo da Coluna 3: Botão de Salvar Alterações */}
          <div className="p-4 border-t border-stone-800 bg-[#101014] shrink-0">
            <button
              type="button"
              onClick={() => {
                props.handleSavePage()
                props.setSavedSuccess(true)
                setTimeout(() => props.setSavedSuccess(false), 3000)
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#E2B857] hover:bg-[#d6aa47] text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
            >
              {props.savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-stone-950" />
                  <span>ALTERAÇÕES SALVAS COM SUCESSO!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-stone-950" />
                  <span>SALVAR ALTERAÇÕES</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>

      {/* ========================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR (telas < 1024px / lg:hidden) */}
      {/* ========================================================= */}
      <nav className="lg:hidden h-16 bg-[#0D0D11] border-t border-stone-800 px-3 flex items-center justify-around shrink-0 z-30">
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition ${
            isMobileDrawerOpen ? 'text-[#E2B857]' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Seções</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSection('paleta')
            setMobileMode('editor')
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition ${
            activeSection === 'paleta' && mobileMode === 'editor'
              ? 'text-[#E2B857]'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Paletas</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileMode(mobileMode === 'preview' ? 'editor' : 'preview')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition ${
            mobileMode === 'preview' ? 'text-[#E2B857]' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>{mobileMode === 'preview' ? 'Editar' : 'Ver Prévia'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            props.handleSavePage()
            props.setSavedSuccess(true)
            setTimeout(() => props.setSavedSuccess(false), 3000)
          }}
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-[#E2B857]"
        >
          <Save className="w-4 h-4" />
          <span>{props.savedSuccess ? 'Salvo!' : 'Salvar'}</span>
        </button>
      </nav>

      {/* ========================================================= */}
      {/* GAVETA INFERIOR (BOTTOM SHEET) PARA TROCA DE SEÇÕES NO MOBILE */}
      {/* ========================================================= */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-[#141418] border-t border-stone-800 rounded-t-3xl max-h-[80vh] flex flex-col animate-slide-up">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-stone-300 font-bold">
                SELECIONE A SEÇÃO PARA EDITAR
              </span>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 space-y-1 overflow-y-auto flex-1">
              {SECTIONS.map((sec) => {
                const Icon = sec.icon
                const isSelected = activeSection === sec.id
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(sec.id)
                      setMobileMode('editor')
                      setIsMobileDrawerOpen(false)
                    }}
                    className={`w-full p-3 rounded-2xl text-left flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#E2B857]/15 text-[#E2B857] border border-[#E2B857]/40 font-bold'
                        : 'text-stone-300 hover:bg-stone-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-[#E2B857] text-stone-950' : 'bg-stone-900 text-stone-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">{sec.title}</p>
                        <p className="text-[10px] text-stone-500">{sec.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-600" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


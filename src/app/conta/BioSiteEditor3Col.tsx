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
  ChevronUp,
  Layers,
  Wand2,
  Upload,
  Activity,
  Sliders,
  Check,
  Menu,
  X,
  Link as LinkIcon,
  MessageCircle,
  MapPin,
  Flame,
  HelpCircle,
  Navigation,
  Award,
  Users,
  Info,
  Car,
  ToggleLeft,
  ToggleRight,
  Download,
  Share2
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
  galleryPhotos?: string[]
  setGalleryPhotos?: (v: string[]) => void
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

export type SectionTabId =
  | 'paleta'
  | 'cabecalho'
  | 'botoes'
  | 'catalogo'
  | 'portfolio'
  | 'social'
  | 'vip'
  | 'pixel'
  | 'assinatura'

export interface SectionItem {
  id: SectionTabId
  title: string
  subtitle: string
  icon: any
  badge?: string
  isVip?: boolean
}

export const SECTION_ITEMS: SectionItem[] = [
  { id: 'paleta', title: 'Paleta & Tipografia', subtitle: 'Cores, fontes e estilos de botão', icon: Palette },
  { id: 'cabecalho', title: 'Cabeçalho & Perfil', subtitle: 'Foto, nome, bio e IA', icon: User },
  { id: 'botoes', title: 'Botões & Links Principais', subtitle: 'WhatsApp, agendamento e destaques', icon: LinkIcon },
  { id: 'catalogo', title: 'Catálogo de Serviços', subtitle: 'Procedimentos, preços e durações', icon: ShoppingBag, badge: 'PRO' },
  { id: 'portfolio', title: 'Portfólio & Galeria', subtitle: 'Fotos de resultados e subpáginas', icon: ImageIcon },
  { id: 'social', title: 'Prova Social & Depoimentos', subtitle: 'Google reviews e métricas', icon: Star },
  { id: 'vip', title: 'Módulos VIP de Conversão', subtitle: '8 ferramentas de fechamento', icon: Crown, isVip: true },
  { id: 'pixel', title: 'Píxel, Anúncios & SEO', subtitle: 'Meta, TikTok e Google Analytics', icon: Zap },
  { id: 'assinatura', title: 'Assinatura & Domínio', subtitle: 'Status 48h, PIX e endereço', icon: CreditCard }
]

export default function BioSiteEditor3Col(props: BioSiteEditorProps) {
  const [activeSection, setActiveSection] = useState<SectionTabId>('paleta')
  const [previewViewport, setPreviewViewport] = useState<'mobile' | 'desktop'>('mobile')
  const [mobileMode, setMobileMode] = useState<'editor' | 'preview'>('editor')
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [copiedPix, setCopiedPix] = useState(false)
  const [openVipAccordion, setOpenVipAccordion] = useState<string | null>('announcement')
  const [newGalleryUrl, setNewGalleryUrl] = useState('')
  const [previewFaqOpenIndex, setPreviewFaqOpenIndex] = useState<number | null>(null)
  const [previewCatalogCategory, setPreviewCatalogCategory] = useState<string>('TODOS')
  const [previewCopiedAddress, setPreviewCopiedAddress] = useState(false)

  const handleCopyPix = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('00020126360014BR.GOV.BCB.PIX011412345678000199520400005303986540549.905802BR5915BIOVIP PRO6009SAO PAULO62070503***6304E2B8')
      setCopiedPix(true)
      setTimeout(() => setCopiedPix(false), 3000)
    }
  }

  const currentSectionMeta = SECTION_ITEMS.find(s => s.id === activeSection) || SECTION_ITEMS[0]

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0A0A0C] text-stone-200 flex flex-col font-sans select-none">
      {/* ========================================================= */}
      {/* BARRA SUPERIOR UNIFICADA (DESKTOP E MOBILE) */}
      {/* ========================================================= */}
      <header className="h-14 border-b border-stone-800/80 bg-[#0D0D11]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={props.onBackToDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-700/80 hover:border-amber-400 bg-stone-900/80 text-xs font-mono uppercase tracking-wider text-stone-300 hover:text-white transition cursor-pointer"
            title="Voltar para Minha Área"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Minha Área</span>
          </button>

          <div className="h-4 w-px bg-stone-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-stone-400 uppercase hidden md:inline">
              Editando:
            </span>
            <code className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
              /{props.slug}
            </code>
            {props.businessTitle && (
              <span className="text-xs text-stone-400 truncate max-w-[120px] sm:max-w-xs hidden lg:inline">
                ({props.businessTitle})
              </span>
            )}
          </div>
        </div>

        {/* Centro (Desktop): Alternador Mobile/Desktop & Ver ao Vivo */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center bg-stone-900/90 border border-stone-800 rounded-full p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setPreviewViewport('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition cursor-pointer ${
                previewViewport === 'mobile'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewViewport('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition cursor-pointer ${
                previewViewport === 'desktop'
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
          </div>

          <a
            href={`/${props.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-800 hover:border-stone-700 bg-stone-900/50 text-xs text-stone-400 hover:text-white transition font-mono"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver no ar</span>
          </a>

          <button
            type="button"
            onClick={props.handleAiAutoFill}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/40 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-mono text-amber-300 font-bold transition shadow-sm cursor-pointer"
            title="Preencher textos, bio e serviços com IA"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Preencher com IA</span>
          </button>
        </div>

        {/* Lado Direito: Notificação de Salvo & Botão Salvar Principal */}
        <div className="flex items-center gap-2">
          {props.savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salvo com sucesso!</span>
            </span>
          )}

          <button
            type="button"
            onClick={props.handleSavePage}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-[#E2B857] hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider font-mono shadow-md hover:shadow-amber-500/20 active:scale-95 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Salvar</span>
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* BARRA MOBILE: MODO EDITOR vs PRÉVIA */}
      {/* ========================================================= */}
      <div className="lg:hidden h-11 border-b border-stone-800 bg-[#121216] px-4 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            {currentSectionMeta.icon && <currentSectionMeta.icon className="w-3.5 h-3.5" />}
          </div>
          <div>
            <h2 className="text-xs font-bold text-white leading-tight uppercase font-mono">
              {currentSectionMeta.title}
            </h2>
            <p className="text-[9px] text-stone-400 line-clamp-1">
              {currentSectionMeta.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="p-1.5 rounded-lg border border-stone-800 text-stone-300 hover:text-white bg-stone-900 text-xs flex items-center gap-1 font-mono"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* CORPO PRINCIPAL (DESKTOP: 3 COLUNAS | MOBILE: ADAPTADO) */}
      {/* ========================================================= */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* --------------------------------------------------------- */}
        {/* COLUNA 1 — Menu de Navegação / Seções (Desktop: w-72) */}
        {/* --------------------------------------------------------- */}
        <aside className="hidden lg:flex w-72 border-r border-stone-800/80 bg-[#0D0D11] flex-col shrink-0 select-none">
          <div className="p-4 border-b border-stone-800/60 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-bold">
              Estrutura da Página
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
              {SECTION_ITEMS.length} BLOCOS
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-stone-800">
            {SECTION_ITEMS.map((sec) => {
              const Icon = sec.icon
              const isActive = activeSection === sec.id
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

        {/* --------------------------------------------------------- */}
        {/* COLUNA 2 — Palco Central / Canvas de Visualização (flex-1) */}
        {/* --------------------------------------------------------- */}
        <section
          className={`flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-[#070709] relative overflow-hidden ${
            mobileMode === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Fundo com iluminação sutil de estúdio */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 35%, ${props.selectedPalette.accent}33 0%, transparent 65%)`
            }}
          />

          {/* Smartphone Frame Mockup */}
          <div
            className={`relative transition-all duration-300 flex flex-col items-center justify-center max-w-full ${
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
                {/* 1. Barra de Anúncio Superior (se ativada) */}
                {props.announcementData?.enabled && (
                  <div
                    className="py-1.5 px-3 text-[8px] font-mono font-bold flex items-center justify-center gap-1.5 border-b"
                    style={{
                      backgroundColor: `${props.selectedPalette.accent}20`,
                      borderColor: `${props.selectedPalette.accent}40`,
                      color: props.selectedPalette.text
                    }}
                  >
                    <span
                      className="px-1.5 py-0.2 rounded-full uppercase text-[7px]"
                      style={{
                        backgroundColor: props.selectedPalette.accent,
                        color: props.selectedPalette.buttonText || '#000'
                      }}
                    >
                      ● {props.announcementData.badge}
                    </span>
                    <span className="truncate">{props.announcementData.text}</span>
                  </div>
                )}

                {/* Ilha Dinâmica e Registro no Topo */}
                <div className="relative z-20 pt-2 px-4 flex items-center justify-between text-[7px] font-mono tracking-widest text-stone-400 uppercase">
                  <div className="w-14 h-3 bg-black rounded-full mx-auto" />
                  <span className="font-bold opacity-80 absolute right-4 top-2 text-[8px]">
                    {props.registrationCode}
                  </span>
                </div>

                {/* Foto do Perfil com Efeito de Fusão de Estúdio */}
                <div className="relative w-full h-40 overflow-hidden -mt-2 select-none shrink-0">
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
                <div className="px-3.5 pt-1 pb-6 flex-1 flex flex-col items-center">
                  <span
                    className="text-[8px] font-mono uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-full border mb-1"
                    style={{
                      backgroundColor: `${props.selectedPalette.card}cc`,
                      color: props.selectedPalette.accent,
                      borderColor: `${props.selectedPalette.accent}33`
                    }}
                  >
                    {props.niche.toUpperCase()}
                  </span>

                  <h3
                    className="font-bold text-lg leading-tight text-balance"
                    style={{ fontFamily: props.selectedTypography.cssFont }}
                  >
                    {props.businessTitle || props.brandName}
                  </h3>

                  {/* Avaliações Google */}
                  <div className="mt-1 text-amber-400 text-[9px] flex items-center gap-1 font-mono">
                    <span>★★★★★</span>
                    <span className="opacity-80">{props.rating} ({props.reviewsCount})</span>
                  </div>

                  {/* Barra Rápida (WhatsApp & Agendar) */}
                  <div className="w-full grid grid-cols-2 gap-1.5 mt-2">
                    <div
                      className="py-1 px-2 rounded-lg border text-[8px] font-mono font-bold flex items-center justify-center gap-1"
                      style={{
                        backgroundColor: `${props.selectedPalette.card}cc`,
                        borderColor: `${props.selectedPalette.accent}33`,
                        color: props.selectedPalette.text
                      }}
                    >
                      <MessageCircle className="w-2.5 h-2.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </div>
                    <div
                      className="py-1 px-2 rounded-lg border text-[8px] font-mono font-bold flex items-center justify-center gap-1"
                      style={{
                        backgroundColor: props.selectedPalette.accent,
                        borderColor: 'transparent',
                        color: props.selectedPalette.buttonText || '#000'
                      }}
                    >
                      <span>Agendar VIP</span>
                    </div>
                  </div>

                  {/* Banner de Urgência & Cronômetro */}
                  {props.urgencyData?.enabled && (
                    <div
                      className="w-full mt-2 p-2 rounded-xl border flex items-center justify-between text-left"
                      style={{
                        backgroundColor: `${props.selectedPalette.card}ee`,
                        borderColor: `${props.selectedPalette.accent}40`
                      }}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Flame className="w-3 h-3 text-amber-400 shrink-0 animate-pulse" />
                        <div className="min-w-0">
                          <p className="text-[8px] font-bold text-amber-300 font-mono truncate">
                            {props.urgencyData.headline}
                          </p>
                          <p className="text-[7px] text-stone-400 truncate">
                            {props.urgencyData.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/50 text-amber-300 shrink-0">
                        14:52
                      </span>
                    </div>
                  )}

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

                  {/* Botões Principais de Ação */}
                  <div className="w-full space-y-1.5 mt-2">
                    {props.buttons.map((btn: any) => {
                      const isHigh = !!btn.isHighlighted
                      return (
                        <div
                          key={btn.id}
                          className="w-full p-2 rounded-xl border text-left flex items-center justify-between gap-1.5 shadow-sm transition"
                          style={{
                            backgroundColor: props.selectedPalette.card || '#14161c',
                            borderColor: isHigh ? props.selectedPalette.accent : `${props.selectedPalette.accent}33`,
                            color: props.selectedPalette.text
                          }}
                        >
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-[10px] block leading-tight truncate">
                              {btn.label}
                            </span>
                            {btn.subtitle && (
                              <span className="text-[8px] opacity-70 block truncate">
                                {btn.subtitle}
                              </span>
                            )}
                          </div>
                          <span
                            className="text-[11px] font-bold shrink-0"
                            style={{ color: props.selectedPalette.accent }}
                          >
                            →
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Botão de Quiz Anti-curiosos */}
                  {props.quizData?.enabled && (
                    <div
                      className="w-full mt-2 p-2 rounded-xl border flex items-center justify-between text-left cursor-pointer"
                      style={{
                        backgroundColor: `${props.selectedPalette.card}ff`,
                        borderColor: props.selectedPalette.accent,
                        color: props.selectedPalette.text
                      }}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="text-[8px] font-bold font-mono uppercase truncate">
                          {props.quizData.buttonLabel}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold" style={{ color: props.selectedPalette.accent }}>
                        →
                      </span>
                    </div>
                  )}

                  {/* Métricas de Autoridade */}
                  {props.metricsData && props.metricsData.length > 0 && (
                    <div
                      className="w-full grid grid-cols-3 gap-1 p-2 rounded-xl border mt-2 text-center"
                      style={{
                        backgroundColor: `${props.selectedPalette.card}80`,
                        borderColor: `${props.selectedPalette.accent}20`
                      }}
                    >
                      {props.metricsData.map((m: any, idx: number) => (
                        <div key={idx}>
                          <div className="font-serif text-[10px] font-bold" style={{ color: props.selectedPalette.accent }}>
                            {m.value}
                          </div>
                          <div className="text-[6px] font-mono uppercase opacity-70 truncate">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 10. Como Funciona Atendimento */}
                  {props.howItWorksData && props.howItWorksData.length > 0 && (
                    <div className="w-full mt-3 space-y-1.5 text-left">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: props.selectedPalette.accent }} />
                        <span className="text-[8px] font-mono uppercase tracking-widest font-bold opacity-80">
                          Como Funciona o Atendimento
                        </span>
                      </div>
                      <div className="space-y-1">
                        {props.howItWorksData.map((step: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl border flex items-start gap-2"
                            style={{
                              backgroundColor: `${props.selectedPalette.card}80`,
                              borderColor: `${props.selectedPalette.accent}20`
                            }}
                          >
                            <span
                              className="font-serif text-[11px] font-bold opacity-60 shrink-0"
                              style={{ color: props.selectedPalette.accent }}
                            >
                              {step.number}
                            </span>
                            <div className="min-w-0">
                              <div className="text-[8.5px] font-bold text-white leading-tight">
                                {step.title}
                              </div>
                              <div className="text-[7.5px] text-stone-400 leading-snug font-sans line-clamp-2">
                                {step.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 11. Catálogo Completo de Procedimentos & Preços */}
                  {props.servicesCatalogData?.enabled && props.servicesCatalogData.items && props.servicesCatalogData.items.length > 0 && (
                    <div className="w-full mt-3 space-y-2 text-left">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[7.5px] font-mono uppercase tracking-widest font-bold"
                          style={{ color: props.selectedPalette.accent }}
                        >
                          CATÁLOGO VIP
                        </span>
                        <span className="text-[7px] font-mono opacity-70">
                          {props.servicesCatalogData.items.length} procedimentos
                        </span>
                      </div>
                      <h4 className="text-[11px] font-serif font-bold text-white leading-tight">
                        {props.servicesCatalogData.headline}
                      </h4>

                      {/* Abas de Categorias */}
                      {props.servicesCatalogData.categories && props.servicesCatalogData.categories.length > 1 && (
                        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                          {props.servicesCatalogData.categories.map((cat: string) => {
                            const isActive = previewCatalogCategory === cat
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => setPreviewCatalogCategory(cat)}
                                className={`px-2 py-0.5 rounded-lg text-[7px] font-mono uppercase tracking-wider font-semibold transition whitespace-nowrap border ${
                                  isActive
                                    ? 'border-transparent text-stone-950 font-bold'
                                    : 'border-white/10 text-stone-400 hover:text-white bg-white/5'
                                }`}
                                style={{
                                  backgroundColor: isActive ? props.selectedPalette.accent : undefined
                                }}
                              >
                                {cat}
                              </button>
                            )
                          })}
                        </div>
                      )}

                      {/* Lista de Itens do Catálogo */}
                      <div className="space-y-1.5">
                        {props.servicesCatalogData.items
                          .filter((item: any) => previewCatalogCategory === 'TODOS' || item.category === previewCatalogCategory)
                          .slice(0, 4)
                          .map((srv: any) => (
                            <div
                              key={srv.id}
                              className="p-2 rounded-xl border space-y-1 text-left transition"
                              style={{
                                backgroundColor: `${props.selectedPalette.card}cc`,
                                borderColor: `${props.selectedPalette.accent}25`
                              }}
                            >
                              <div className="flex items-start justify-between gap-1">
                                <div>
                                  {srv.badge && (
                                    <span
                                      className="inline-block px-1.5 py-0.2 rounded text-[6.5px] font-mono font-bold uppercase mb-0.5 border"
                                      style={{
                                        backgroundColor: `${props.selectedPalette.accent}20`,
                                        borderColor: `${props.selectedPalette.accent}40`,
                                        color: props.selectedPalette.accent
                                      }}
                                    >
                                      {srv.badge}
                                    </span>
                                  )}
                                  <h5 className="text-[9px] font-bold text-white leading-tight">
                                    {srv.name}
                                  </h5>
                                </div>
                                {srv.duration && (
                                  <span className="text-[7px] font-mono text-stone-400 shrink-0">
                                    {srv.duration}
                                  </span>
                                )}
                              </div>

                              <p className="text-[7.5px] text-stone-400 font-sans leading-snug line-clamp-2">
                                {srv.description}
                              </p>

                              <div className="pt-1 flex items-center justify-between border-t border-white/5">
                                <span className="text-[9px] font-serif font-bold" style={{ color: props.selectedPalette.accent }}>
                                  {srv.price}
                                </span>
                                <span
                                  className="py-0.5 px-2 rounded text-[7px] font-bold font-mono tracking-wider uppercase transition flex items-center gap-0.5 shadow-sm"
                                  style={{
                                    backgroundColor: props.selectedPalette.accent,
                                    color: props.selectedPalette.buttonText || '#000'
                                  }}
                                >
                                  <span>Reservar</span>
                                  <span>→</span>
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Tarja de 4 Diferenciais */}
                      <div
                        className="p-1.5 rounded-lg border grid grid-cols-2 gap-1 text-[7.5px]"
                        style={{
                          backgroundColor: `${props.selectedPalette.card}66`,
                          borderColor: `${props.selectedPalette.accent}20`
                        }}
                      >
                        <div className="flex items-center gap-1 text-stone-300">
                          <CreditCard className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                          <span className="truncate">Cartão até 12x</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-300">
                          <Zap className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                          <span className="truncate">Pix Instantâneo</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-300">
                          <Car className="w-2.5 h-2.5 text-sky-400 shrink-0" />
                          <span className="truncate">Fácil Acesso</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-300">
                          <ShieldCheck className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                          <span className="truncate">Espaço VIP</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 12. Galeria de Fotos / Portfólio (Smart Masonry) */}
                  {((props.galleryPhotos && props.galleryPhotos.length > 0) || props.additionalPages?.some((p: any) => p.templateId === 'before_after')) && (
                    <div className="w-full mt-3 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[7.5px] font-mono uppercase tracking-widest font-bold opacity-80">
                          PORTFÓLIO & ESTRUTURA VIP
                        </span>
                        <span className="text-[7px] font-mono text-stone-400">
                          {(props.galleryPhotos || []).length} fotos
                        </span>
                      </div>

                      {/* Grade de Fotos Reais do Portfólio */}
                      <div className="grid grid-cols-3 gap-1">
                        {(props.galleryPhotos && props.galleryPhotos.length > 0 ? props.galleryPhotos : [
                          'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&q=80',
                          'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=400&q=80',
                          'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80'
                        ]).slice(0, 6).map((imgUrl: string, i: number) => (
                          <div
                            key={i}
                            className="aspect-square rounded-lg overflow-hidden border border-white/10 relative group bg-stone-900"
                          >
                            <img
                              src={imgUrl}
                              alt={`Portfólio ${i + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Sparkles className="w-2.5 h-2.5 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 13. Localização & Rotas GPS */}
                  {props.locationData?.enabled && (
                    <div className="w-full mt-3 space-y-1.5 text-left">
                      <div
                        className="p-2.5 rounded-xl border space-y-2"
                        style={{
                          backgroundColor: `${props.selectedPalette.card}cc`,
                          borderColor: `${props.selectedPalette.accent}25`
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[7px] font-mono uppercase tracking-widest font-bold opacity-75">
                            NOSSA LOCALIZAÇÃO
                          </span>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[7px] font-mono">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            {props.locationData.openStatus || 'Aberto Agora'}
                          </span>
                        </div>

                        <div className="space-y-0.5">
                          <div className="text-[9px] font-bold text-white flex items-start gap-1">
                            <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-2 leading-tight">{props.locationData.address}</span>
                          </div>
                          <div className="text-[7.5px] text-stone-400 font-mono pl-3.5">
                            {props.locationData.hours}
                          </div>
                        </div>

                        {/* 4 Botões de Rota */}
                        <div className="grid grid-cols-4 gap-1 pt-1">
                          <div className="py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-[7px] font-mono font-bold flex flex-col items-center justify-center gap-0.5">
                            <Navigation className="w-2 h-2 text-sky-400" />
                            <span>Maps</span>
                          </div>
                          <div className="py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-[7px] font-mono font-bold flex flex-col items-center justify-center gap-0.5">
                            <Navigation className="w-2 h-2 text-cyan-400" />
                            <span>Waze</span>
                          </div>
                          <div className="py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-[7px] font-mono font-bold flex flex-col items-center justify-center gap-0.5">
                            <Car className="w-2 h-2 text-white" />
                            <span>Uber</span>
                          </div>
                          <div className="py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-[7px] font-mono font-bold flex flex-col items-center justify-center gap-0.5">
                            <Copy className="w-2 h-2 text-amber-400" />
                            <span>Copiar</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 14. Depoimentos de Clientes (Google Reviews) */}
                  {props.testimonialsData && props.testimonialsData.length > 0 && (
                    <div className="w-full mt-3 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[7.5px] font-mono uppercase tracking-widest font-bold opacity-80">
                          AVALIAÇÕES NO GOOGLE
                        </span>
                        <span className="text-[7.5px] font-mono text-amber-400 font-bold flex items-center gap-0.5">
                          <span>5.0</span>
                          <span>★★★★★</span>
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {props.testimonialsData.slice(0, 3).map((t: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl border space-y-1"
                            style={{
                              backgroundColor: `${props.selectedPalette.card}80`,
                              borderColor: `${props.selectedPalette.accent}20`
                            }}
                          >
                            <div className="flex items-center justify-between text-amber-400 text-[8px]">
                              <span>★★★★★</span>
                              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20">
                                ✓ Verificado
                              </span>
                            </div>
                            <p className="text-[8px] text-stone-300 font-sans italic leading-snug line-clamp-2">
                              "{t.text}"
                            </p>
                            <div className="text-[7px] font-mono text-stone-400">
                              {t.clientName || t.name} · {t.city || t.role}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 15. Sobre a Especialista */}
                  {props.aboutMeData?.enabled && (
                    <div className="w-full mt-3 space-y-1 text-left">
                      <div
                        className="p-2.5 rounded-xl border space-y-1"
                        style={{
                          backgroundColor: `${props.selectedPalette.card}80`,
                          borderColor: `${props.selectedPalette.accent}20`
                        }}
                      >
                        <h5 className="text-[9px] font-serif font-bold text-white">
                          {props.aboutMeData.headline}
                        </h5>
                        <p className="text-[7.5px] text-stone-300 font-sans leading-snug line-clamp-3">
                          {props.aboutMeData.paragraph || props.aboutMeData.bio}
                        </p>
                        {(props.aboutMeData.closingPhrase || props.aboutMeData.quote) && (
                          <div className="text-[7px] italic font-serif pt-0.5" style={{ color: props.selectedPalette.accent }}>
                            "{props.aboutMeData.closingPhrase || props.aboutMeData.quote}"
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 16. Dúvidas Frequentes (FAQ Sanfonado) */}
                  {props.faqData && props.faqData.length > 0 && (
                    <div className="w-full mt-3 space-y-1 text-left">
                      <span className="text-[7.5px] font-mono uppercase tracking-widest font-bold opacity-80 block mb-0.5">
                        DÚVIDAS FREQUENTES
                      </span>
                      <div className="space-y-1">
                        {props.faqData.slice(0, 4).map((item: any, i: number) => {
                          const isOpen = previewFaqOpenIndex === i
                          return (
                            <div
                              key={i}
                              className="rounded-lg border overflow-hidden transition"
                              style={{
                                backgroundColor: `${props.selectedPalette.card}80`,
                                borderColor: `${props.selectedPalette.accent}20`
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => setPreviewFaqOpenIndex(isOpen ? null : i)}
                                className="w-full p-2 text-left flex items-center justify-between text-[8px] font-semibold text-stone-200 hover:text-white transition cursor-pointer"
                              >
                                <span className="pr-1 leading-snug">{item.question}</span>
                                {isOpen ? <ChevronUp className="w-2.5 h-2.5 shrink-0" /> : <ChevronDown className="w-2.5 h-2.5 shrink-0" />}
                              </button>
                              {isOpen && (
                                <div className="px-2 pb-2 pt-0 text-[7.5px] text-stone-400 font-sans leading-snug border-t border-white/5 animate-fade-in">
                                  {item.answer}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* 17. Salvar Contato (.vcf) & Compartilhar */}
                  <div className="w-full grid grid-cols-2 gap-1.5 mt-3">
                    <div className="py-1.5 px-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-[7.5px] font-mono font-bold flex items-center justify-center gap-1 shadow-sm">
                      <Download className="w-2.5 h-2.5 text-amber-400" />
                      <span>Salvar Contato</span>
                    </div>
                    <div className="py-1.5 px-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-[7.5px] font-mono font-bold flex items-center justify-center gap-1 shadow-sm">
                      <Share2 className="w-2.5 h-2.5 text-sky-400" />
                      <span>Compartilhar</span>
                    </div>
                  </div>

                  {/* 18. Monograma e Assinatura Editorial de Rodapé */}
                  <div className="mt-4 pb-4 w-full flex flex-col items-center text-center">
                    <div
                      className="w-10 h-px mb-1.5 opacity-40"
                      style={{ backgroundColor: props.selectedPalette.accent }}
                    />
                    <span
                      className="font-serif italic text-sm tracking-wider select-none"
                      style={{ color: props.selectedPalette.accent }}
                    >
                      {props.monogram || 'AF'}
                    </span>
                    <div className="text-[6.5px] font-mono text-stone-500 mt-1">
                      © {new Date().getFullYear()} {props.businessTitle || props.brandName}. Todos os direitos reservados.
                    </div>
                    <div className="text-[6px] font-mono text-stone-500 hover:text-amber-400 transition mt-0.5">
                      ✨ Desenvolvido com padrão BioVip
                    </div>
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
                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 font-bold mb-2">
                    Paleta de Cores ({PALETTES.length} opções luxo)
                  </label>
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
                          <span className={`text-[11px] font-bold block truncate ${isSel ? 'text-amber-300' : 'text-stone-300'}`}>
                            {pal.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Tipografia Editorial */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 font-bold mb-2">
                    Tipografia Editorial
                  </label>
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
                </div>

                {/* Estilos e Efeitos de Botão */}
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

                {/* Tratamento da Foto */}
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
              </div>
            )}

            {/* ======================================================= */}
            {/* 2. SEÇÃO: CABEÇALHO & PERFIL */}
            {/* ======================================================= */}
            {activeSection === 'cabecalho' && (
              <div className="space-y-4 animate-fade-in">
                {/* Banner de IA para Preenchimento Automático */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-between gap-3">
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

                {/* Foto de Perfil */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-400 font-bold mb-1">
                    Foto do Perfil / Retrato de Estúdio
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-stone-700 bg-stone-900 shrink-0">
                      <img
                        src={props.customPhotoSrc || (props.demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="text"
                        value={props.customPhotoSrc || ''}
                        onChange={(e) => {
                          props.setCustomPhotoSrc(e.target.value || null)
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="URL da Foto (https://...)"
                        className="w-full p-2 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => props.setDemoGender('mulher')}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            props.demoGender === 'mulher' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'border-stone-800 text-stone-400'
                          }`}
                        >
                          Feminino
                        </button>
                        <button
                          type="button"
                          onClick={() => props.setDemoGender('homem')}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            props.demoGender === 'homem' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'border-stone-800 text-stone-400'
                          }`}
                        >
                          Masculino
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

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
                      placeholder="5511999999999"
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
            )}

            {/* ======================================================= */}
            {/* 3. SEÇÃO: BOTÕES & LINKS PRINCIPAIS */}
            {/* ======================================================= */}
            {activeSection === 'botoes' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-stone-300 font-bold">
                    Botões Principais ({props.buttons.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newBtn = {
                        id: `btn-${Date.now()}`,
                        label: 'NOVO BOTÃO DE AÇÃO',
                        subtitle: 'Toque para conversar no WhatsApp',
                        icon: 'whatsapp',
                        url: `https://wa.me/${props.userPhone || '5511999999999'}`,
                        isHighlighted: false
                      }
                      props.setButtons([...props.buttons, newBtn])
                      props.setHasUnsavedChanges(true)
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#E2B857] text-stone-950 font-bold text-[11px] uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar
                  </button>
                </div>

                <div className="space-y-3">
                  {props.buttons.map((btn: any, idx: number) => (
                    <div
                      key={btn.id}
                      className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5"
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
                            title="Remover botão"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">
                          Título Principal
                        </label>
                        <input
                          type="text"
                          value={btn.label}
                          onChange={(e) => {
                            const updated = [...props.buttons]
                            updated[idx].label = e.target.value
                            props.setButtons(updated)
                            props.setHasUnsavedChanges(true)
                          }}
                          className="w-full p-2 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 text-xs font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">
                            Subtítulo
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
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-300 border border-stone-800 text-[11px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">
                            Ícone
                          </label>
                          <select
                            value={btn.icon || 'whatsapp'}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].icon = e.target.value
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-300 border border-stone-800 text-xs"
                          >
                            <option value="whatsapp">WhatsApp</option>
                            <option value="calendar">Agenda / Calendário</option>
                            <option value="map">Localização / Mapa</option>
                            <option value="sparkles">Estrela / VIP</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono uppercase text-stone-400 mb-0.5">
                          Link de Destino
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
                          className="w-full p-2 rounded-xl bg-stone-950 text-stone-400 border border-stone-800 text-[10px] font-mono"
                        />
                      </div>

                      {/* Destaque ⭐ */}
                      <div className="pt-1 flex items-center justify-between border-t border-stone-800/80">
                        <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!btn.isHighlighted}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].isHighlighted = e.target.checked
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="accent-amber-400 rounded"
                          />
                          <span>⭐ Destacar este botão</span>
                        </label>

                        {btn.isHighlighted && (
                          <input
                            type="text"
                            value={btn.highlightBadge || '⭐ MAIS ESCOLHIDO'}
                            onChange={(e) => {
                              const updated = [...props.buttons]
                              updated[idx].highlightBadge = e.target.value
                              props.setButtons(updated)
                              props.setHasUnsavedChanges(true)
                            }}
                            className="p-1 rounded-lg bg-stone-950 text-amber-300 border border-amber-500/30 text-[9px] font-mono font-bold"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. SEÇÃO: CATÁLOGO DE SERVIÇOS */}
            {/* ======================================================= */}
            {activeSection === 'catalogo' && (
              <div className="space-y-4 animate-fade-in">
                {/* Switch Liga/Desliga */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase font-mono">
                      Catálogo Interativo VIP
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
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ======================================================= */}
            {/* 5. SEÇÃO: PORTFÓLIO & GALERIA */}
            {/* ======================================================= */}
            {activeSection === 'portfolio' && (
              <div className="space-y-4 animate-fade-in">
                {/* Subpáginas Pro Integradas */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800">
                  <h3 className="font-bold text-xs text-white uppercase tracking-wider mb-1">
                    Páginas Pro Integradas ({props.additionalPages.length}/3)
                  </h3>
                  <p className="text-[11px] text-stone-400 leading-relaxed mb-3">
                    Cada página Pro inclui slider de Antes &amp; Depois, tabela completa de procedimentos e agenda VIP.
                  </p>

                  <div className="space-y-2">
                    {props.additionalPages.map((pg: any) => (
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

                {/* Galeria de Fotos de Portfólio / Resultados */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-stone-300 font-bold">
                      Galeria de Resultados &amp; Espaço
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">
                      {props.galleryPhotos?.length || 4} FOTOS
                    </span>
                  </div>

                  {/* Grid de fotos atuais */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {(props.galleryPhotos || [
                      'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop'
                    ]).map((url: string, i: number) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden border border-stone-800 relative group">
                        <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                        {props.setGalleryPhotos && (
                          <button
                            type="button"
                            onClick={() => {
                              const cur = props.galleryPhotos || []
                              props.setGalleryPhotos!(cur.filter((_, idx) => idx !== i))
                              props.setHasUnsavedChanges(true)
                            }}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600/90 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition cursor-pointer"
                            title="Remover foto"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Adicionar nova foto */}
                  {props.setGalleryPhotos && (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={newGalleryUrl}
                        onChange={(e) => setNewGalleryUrl(e.target.value)}
                        placeholder="URL de nova foto (https://...)"
                        className="flex-1 p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newGalleryUrl.trim()) {
                            const cur = props.galleryPhotos || []
                            props.setGalleryPhotos!([...cur, newGalleryUrl.trim()])
                            setNewGalleryUrl('')
                            props.setHasUnsavedChanges(true)
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-amber-400 text-stone-950 text-xs font-mono font-bold uppercase cursor-pointer"
                      >
                        + Foto
                      </button>
                    </div>
                  )}
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
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
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
                </div>

                {/* Depoimentos de Clientes */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-stone-300 font-bold">
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
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40">
                  <span className="text-[10px] font-mono text-amber-300 font-black uppercase tracking-wider block mb-1">
                    👑 8 MÓDULOS VIP DE ALTA CONVERSÃO
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Personalize gatilhos de escassez, cronômetro de urgência, quiz qualificador, GPS e FAQ sanfonado.
                  </p>
                </div>

                {/* 1. Barra de Aviso Superior */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
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
                    </div>
                  )}
                </div>

                {/* 2. Gatilho de Urgência & Cronômetro */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
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
                    </div>
                  )}
                </div>

                {/* 3. Triagem Anti-Curiosos (Quiz VIP) */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
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
                    </div>
                  )}
                </div>

                {/* 4. Localização com GPS & Aberto Agora */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
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
                    </div>
                  )}
                </div>

                {/* 5. Sobre o Especialista */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
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
                    </div>
                  )}
                </div>

                {/* 6. Dúvidas Frequentes (FAQ) */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
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
      </div>

      {/* ========================================================= */}
      {/* BARRA DE NAVEGAÇÃO INFERIOR FIXA (SMARTPHONES < 1024px) */}
      {/* ========================================================= */}
      <footer className="lg:hidden h-14 border-t border-stone-800 bg-[#0D0D11] grid grid-cols-4 items-center px-2 z-30 shrink-0">
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] font-semibold transition text-stone-400 hover:text-stone-200"
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
            activeSection === 'paleta' && mobileMode === 'editor' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Paletas</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileMode(mobileMode === 'editor' ? 'preview' : 'editor')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition ${
            mobileMode === 'preview' ? 'text-amber-400 font-bold' : 'text-stone-400'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>{mobileMode === 'editor' ? 'Ver Prévia' : 'Editar'}</span>
        </button>

        <button
          type="button"
          onClick={props.handleSavePage}
          className="flex flex-col items-center gap-1 text-[10px] font-semibold transition text-amber-400"
        >
          <Save className="w-4 h-4" />
          <span>Salvar</span>
        </button>
      </footer>

      {/* ========================================================= */}
      {/* BOTTOM SHEET DRAWER (SMARTPHONES < 1024px) */}
      {/* ========================================================= */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          <div className="relative bg-[#141418] border-t border-stone-800 rounded-t-3xl max-h-[85vh] flex flex-col overflow-hidden animate-slide-up shadow-2xl">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold">
                Selecione a Seção para Editar
              </span>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {SECTION_ITEMS.map((sec) => {
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
                    className={`w-full p-3.5 rounded-2xl text-left transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border border-amber-400/50 text-amber-300'
                        : 'bg-stone-900/60 border border-stone-800/80 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold block">{sec.title}</span>
                          {sec.isVip && (
                            <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-amber-500 text-stone-950">
                              VIP
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-500 block">{sec.subtitle}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-500" />
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

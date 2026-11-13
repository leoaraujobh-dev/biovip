'use client'

import { useState, useEffect } from 'react'
import EditorNavColumn from './editor/EditorNavColumn'
import EditorCanvasColumn from './editor/EditorCanvasColumn'
import EditorInspectorColumn from './editor/EditorInspectorColumn'
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
  Share2,
  Scissors,
  GraduationCap,
  ChevronLeft,
  ZoomIn,
  ArrowUp,
  ArrowDown,
  Eye
} from 'lucide-react'

import {
  PALETTES,
  TYPOGRAPHIES,
  BUTTON_STYLES,
  BUTTON_ANIMATIONS,
  DEMO_PHOTOS,
  NICHES_LIST
} from '@/data/bioSiteDesign'
import { StudentGridConfig } from '@/data/projects'
import {
  ClientPermissions,
  ModuleToggles,
  DEFAULT_CLIENT_PERMISSIONS,
  DEFAULT_MODULE_TOGGLES,
  PERMISSION_DESCRIPTIONS,
  MODULE_DESCRIPTIONS,
  getClientConfig,
  saveClientConfig
} from '@/data/clientPermissions'

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
  galleryConfig?: StudentGridConfig
  setGalleryConfig?: (v: StudentGridConfig) => void
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
  | 'modulos'
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
  { id: 'modulos', title: 'Módulos & Blocos', subtitle: 'Ligar ou desligar blocos do BioSite', icon: Sliders },
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
  const [previewLightboxIndex, setPreviewLightboxIndex] = useState<number | null>(null)

  // Permissões e Módulos configurados pelo Administrador
  const [clientConfig, setClientConfig] = useState(() => getClientConfig(props.slug))

  useEffect(() => {
    const handleUpdate = () => {
      setClientConfig(getClientConfig(props.slug))
    }
    handleUpdate()

    const handleCustom = (e: any) => {
      if (e.detail?.slug === props.slug) {
        setClientConfig(getClientConfig(props.slug))
      }
    }
    window.addEventListener('biovip_permissions_updated', handleCustom)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('biovip_permissions_updated', handleCustom)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [props.slug])

  const permissions = clientConfig.permissions
  const modules = clientConfig.modules
  const canEditTheme = props.isAdminMode || permissions.allowEditTheme
  const canEditTypography = props.isAdminMode || permissions.allowEditTypography
  const canEditBio = props.isAdminMode || permissions.allowEditBio
  const canEditPhotos = props.isAdminMode || permissions.allowEditPhotos
  const canEditButtons = props.isAdminMode || permissions.allowEditButtons
  const canEditServices = props.isAdminMode || permissions.allowEditServices
  const canEditLocation = props.isAdminMode || permissions.allowEditLocation
  const canEditModules = props.isAdminMode || permissions.allowEditModules

  const handleToggleModuleClient = (key: keyof ModuleToggles) => {
    if (!canEditModules) return
    const updatedModules = { ...modules, [key]: !modules[key] }
    saveClientConfig(props.slug, { modules: updatedModules })
    setClientConfig(prev => ({ ...prev, modules: updatedModules }))
    props.setHasUnsavedChanges(true)
  }

  const handleBatchModulesClient = (allActive: boolean) => {
    if (!canEditModules) return
    const updated: any = {}
    ;(Object.keys(modules) as Array<keyof ModuleToggles>).forEach(k => {
      updated[k] = allActive
    })
    saveClientConfig(props.slug, { modules: updated })
    setClientConfig(prev => ({ ...prev, modules: updated }))
    props.setHasUnsavedChanges(true)
  }

  // Configurações Oficiais de Galeria & Portfólio (BioVip Original)
  const defaultGalleryPhotos = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=700',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=700'
  ]

  const effectiveGalleryConfig: StudentGridConfig = props.galleryConfig || {
    enabled: true,
    badge: 'PORTFÃ“LIO & ESTRUTURA VIP',
    headline: 'Resultados Reais & Portfólio em Destaque',
    subtitle: 'Registros reais do nosso padrão de entrega e procedimentos',
    layout: 'mosaic',
    aspectRatio: 'square',
    enableLightbox: true,
    photos: (props.galleryPhotos && props.galleryPhotos.length > 0) ? props.galleryPhotos : defaultGalleryPhotos,
    captions: []
  }

  const updateGalleryConfig = (updater: (prev: StudentGridConfig) => StudentGridConfig) => {
    const updated = updater(effectiveGalleryConfig)
    if (props.setGalleryConfig) {
      props.setGalleryConfig(updated)
    }
    if (props.setGalleryPhotos) {
      props.setGalleryPhotos(updated.photos)
    }
    props.setHasUnsavedChanges(true)
  }

  const [newGalleryCaption, setNewGalleryCaption] = useState('')

  const GALLERY_PRESETS = {
    beauty: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=700'
    ],
    barber: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&q=80&w=700'
    ],
    health: [
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=700'
    ],
    exec: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=700'
    ]
  }

  const compressImage = (file: File, maxWidth = 800, quality = 0.82): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const src = e.target?.result as string
        if (!src) return resolve('')
        const img = new (window as any).Image()
        img.onload = () => {
          try {
            let { width, height } = img
            if (width > maxWidth || height > maxWidth) {
              if (width > height) {
                height = Math.round((height * maxWidth) / width)
                width = maxWidth
              } else {
                width = Math.round((width * maxWidth) / height)
                height = maxWidth
              }
            }
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height)
              resolve(canvas.toDataURL('image/jpeg', quality))
              return
            }
          } catch (err) {}
          resolve(src)
        }
        img.onerror = () => resolve(src)
        img.src = src
      }
      reader.onerror = () => resolve('')
      reader.readAsDataURL(file)
    })
  }

  const handleButtonImageUpload = async (btnIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await compressImage(file, 600, 0.85)
    if (dataUrl) {
      const updated = [...props.buttons]
      updated[btnIndex] = {
        ...updated[btnIndex],
        cardImage: dataUrl,
        imagePosition: updated[btnIndex].imagePosition === 'none' ? 'right' : (updated[btnIndex].imagePosition || 'right'),
        imageFitStyle: updated[btnIndex].imageFitStyle || 'popout'
      }
      props.setButtons(updated)
      props.setHasUnsavedChanges(true)
    }
    e.target.value = ''
  }

  const moveButton = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= props.buttons.length) return
    const updated = [...props.buttons]
    const [moved] = updated.splice(fromIdx, 1)
    updated.splice(toIdx, 0, moved)
    props.setButtons(updated)
    props.setHasUnsavedChanges(true)
  }

  const duplicateButton = (btnIndex: number) => {
    const target = props.buttons[btnIndex]
    const cloned = {
      ...target,
      id: `btn-${Date.now()}`,
      label: `${target.label || 'Botão'} (Cópia)`
    }
    const updated = [...props.buttons]
    updated.splice(btnIndex + 1, 0, cloned)
    props.setButtons(updated)
    props.setHasUnsavedChanges(true)
  }

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const newPhotos: string[] = []
    for (let i = 0; i < files.length; i++) {
      const url = await compressImage(files[i], 800, 0.82)
      if (url) newPhotos.push(url)
    }
    if (newPhotos.length > 0) {
      updateGalleryConfig(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }))
    }
    e.target.value = ''
  }

  const handleReplaceGalleryPhoto = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await compressImage(file, 800, 0.82)
    if (dataUrl) {
      updateGalleryConfig(prev => {
        const nextPhotos = [...prev.photos]
        nextPhotos[index] = dataUrl
        return { ...prev, photos: nextPhotos }
      })
    }
    e.target.value = ''
  }

  const moveGalleryPhoto = (fromIdx: number, toIdx: number) => {
    updateGalleryConfig(prev => {
      if (toIdx < 0 || toIdx >= prev.photos.length) return prev
      const nextPhotos = [...prev.photos]
      const nextCaptions = [...(prev.captions || [])]
      const [movedPhoto] = nextPhotos.splice(fromIdx, 1)
      const movedCaption = nextCaptions[fromIdx] || ''
      nextCaptions.splice(fromIdx, 1)
      nextPhotos.splice(toIdx, 0, movedPhoto)
      nextCaptions.splice(toIdx, 0, movedCaption)
      return { ...prev, photos: nextPhotos, captions: nextCaptions }
    })
  }

  const removeGalleryPhoto = (idx: number) => {
    updateGalleryConfig(prev => {
      const nextPhotos = prev.photos.filter((_, i) => i !== idx)
      const nextCaptions = (prev.captions || []).filter((_, i) => i !== idx)
      return { ...prev, photos: nextPhotos, captions: nextCaptions }
    })
  }

  const updateGalleryCaption = (idx: number, caption: string) => {
    updateGalleryConfig(prev => {
      const nextCaptions = [...(prev.captions || [])]
      while (nextCaptions.length <= idx) nextCaptions.push('')
      nextCaptions[idx] = caption
      return { ...prev, captions: nextCaptions }
    })
  }

  const loadGalleryPreset = (presetKey: 'beauty' | 'barber' | 'health' | 'exec') => {
    const photos = GALLERY_PRESETS[presetKey]
    if (photos) {
      updateGalleryConfig(prev => ({
        ...prev,
        photos
      }))
    }
  }

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
      {/* BARRA MOBILE: MODO EDITOR vs PRÃ‰VIA */}
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
        {/* COLUNA 1 — Menu de Navegação / Seções */}
        <EditorNavColumn
          sectionItems={SECTION_ITEMS}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isAdminMode={props.isAdminMode}
          canEditServices={canEditServices}
          canEditPhotos={canEditPhotos}
          canEditButtons={canEditButtons}
          canEditModules={canEditModules}
          canEditTheme={canEditTheme}
          canEditTypography={canEditTypography}
          canEditBio={canEditBio}
        />

        {/* COLUNA 2 — Palco Central / Canvas de Visualização */}
        <EditorCanvasColumn
          props={props}
          mobileMode={mobileMode}
          previewViewport={previewViewport}
          previewFaqOpenIndex={previewFaqOpenIndex}
          setPreviewFaqOpenIndex={setPreviewFaqOpenIndex}
          previewCatalogCategory={previewCatalogCategory}
          setPreviewCatalogCategory={setPreviewCatalogCategory}
          effectiveGalleryConfig={effectiveGalleryConfig}
          previewLightboxIndex={previewLightboxIndex}
          setPreviewLightboxIndex={setPreviewLightboxIndex}
        />

        {/* COLUNA 3 — Painel de Edição do Bloco Ativo */}
        <EditorInspectorColumn
          props={props}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          mobileMode={mobileMode}
          currentSectionMeta={currentSectionMeta}
          canEditTheme={canEditTheme}
          canEditTypography={canEditTypography}
          canEditBio={canEditBio}
          canEditPhotos={canEditPhotos}
          canEditButtons={canEditButtons}
          canEditServices={canEditServices}
          canEditModules={canEditModules}
          modules={modules}
          handleToggleModuleClient={handleToggleModuleClient}
          handleBatchModulesClient={handleBatchModulesClient}
          effectiveGalleryConfig={effectiveGalleryConfig}
          updateGalleryConfig={updateGalleryConfig}
          newGalleryUrl={newGalleryUrl}
          setNewGalleryUrl={setNewGalleryUrl}
          newGalleryCaption={newGalleryCaption}
          setNewGalleryCaption={setNewGalleryCaption}
          handleButtonImageUpload={handleButtonImageUpload}
          moveButton={moveButton}
          duplicateButton={duplicateButton}
          handleGalleryUpload={handleGalleryUpload}
          handleReplaceGalleryPhoto={handleReplaceGalleryPhoto}
          moveGalleryPhoto={moveGalleryPhoto}
          removeGalleryPhoto={removeGalleryPhoto}
          updateGalleryCaption={updateGalleryCaption}
          loadGalleryPreset={loadGalleryPreset}
          copiedPix={copiedPix}
          handleCopyPix={handleCopyPix}
          setPreviewLightboxIndex={setPreviewLightboxIndex}
        />
      </div>

      {/* ========================================================= */}
      {/* BARRA DE NAVEGAÃ‡ÃƒO INFERIOR FIXA (SMARTPHONES < 1024px) */}
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
                const isSectionLocked = !props.isAdminMode && (
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
                          {isSectionLocked && (
                            <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" />
                            </span>
                          )}
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

      {/* Lightbox Modal Interativo Oficial BioVip */}
      {previewLightboxIndex !== null && effectiveGalleryConfig.photos[previewLightboxIndex] && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col justify-between items-center p-3 sm:p-6 select-none animate-fade-in"
          onClick={() => setPreviewLightboxIndex(null)}
        >
          {/* Barra Superior */}
          <div
            className="w-full max-w-4xl flex items-center justify-between text-white py-2 px-3 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {effectiveGalleryConfig.badge || 'PORTFÃ“LIO OFICIAL'}
              </span>
              <span className="text-xs font-bold text-stone-200 hidden sm:inline">
                {effectiveGalleryConfig.headline || 'Galeria de Procedimentos & Resultados'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-stone-400">
                Foto {previewLightboxIndex + 1} de {effectiveGalleryConfig.photos.length}
              </span>
              <button
                type="button"
                onClick={() => setPreviewLightboxIndex(null)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition cursor-pointer"
                title="Fechar (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Imagem Central com Setas de Navegação */}
          <div
            className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-3 px-2"
            onClick={(e) => e.stopPropagation()}
          >
            {effectiveGalleryConfig.photos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPreviewLightboxIndex((previewLightboxIndex - 1 + effectiveGalleryConfig.photos.length) % effectiveGalleryConfig.photos.length)
                }}
                className="absolute left-2 sm:left-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div className="relative max-h-[72vh] max-w-full flex items-center justify-center">
              <img
                src={effectiveGalleryConfig.photos[previewLightboxIndex]}
                alt={`Portfólio ampliado ${previewLightboxIndex + 1}`}
                className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </div>

            {effectiveGalleryConfig.photos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPreviewLightboxIndex((previewLightboxIndex + 1) % effectiveGalleryConfig.photos.length)
                }}
                className="absolute right-2 sm:right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Legenda e Miniaturas Inferiores */}
          <div
            className="w-full max-w-4xl flex flex-col items-center gap-2 px-3 py-2 border-t border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {effectiveGalleryConfig.captions?.[previewLightboxIndex] && (
              <p className="text-xs sm:text-sm text-stone-300 font-medium text-center italic max-w-xl">
                &ldquo;{effectiveGalleryConfig.captions[previewLightboxIndex]}&rdquo;
              </p>
            )}

            {effectiveGalleryConfig.photos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-2">
                {effectiveGalleryConfig.photos.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPreviewLightboxIndex(idx)}
                    className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                      idx === previewLightboxIndex ? 'border-amber-400 scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={p} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

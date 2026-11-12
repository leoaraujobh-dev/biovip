'use client'

import { useState, useEffect } from 'react'
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
  { id: 'paleta', title: 'Paleta & Tipografia', subtitle: 'Cores, fontes e estilos de botÃ£o', icon: Palette },
  { id: 'cabecalho', title: 'CabeÃ§alho & Perfil', subtitle: 'Foto, nome, bio e IA', icon: User },
  { id: 'botoes', title: 'BotÃµes & Links Principais', subtitle: 'WhatsApp, agendamento e destaques', icon: LinkIcon },
  { id: 'catalogo', title: 'CatÃ¡logo de ServiÃ§os', subtitle: 'Procedimentos, preÃ§os e duraÃ§Ãµes', icon: ShoppingBag, badge: 'PRO' },
  { id: 'portfolio', title: 'PortfÃ³lio & Galeria', subtitle: 'Fotos de resultados e subpÃ¡ginas', icon: ImageIcon },
  { id: 'modulos', title: 'MÃ³dulos & Blocos', subtitle: 'Ligar ou desligar blocos do BioSite', icon: Sliders },
  { id: 'social', title: 'Prova Social & Depoimentos', subtitle: 'Google reviews e mÃ©tricas', icon: Star },
  { id: 'vip', title: 'MÃ³dulos VIP de ConversÃ£o', subtitle: '8 ferramentas de fechamento', icon: Crown, isVip: true },
  { id: 'pixel', title: 'PÃ­xel, AnÃºncios & SEO', subtitle: 'Meta, TikTok e Google Analytics', icon: Zap },
  { id: 'assinatura', title: 'Assinatura & DomÃ­nio', subtitle: 'Status 48h, PIX e endereÃ§o', icon: CreditCard }
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

  // PermissÃµes e MÃ³dulos configurados pelo Administrador
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

  // ConfiguraÃ§Ãµes Oficiais de Galeria & PortfÃ³lio (BioVip Original)
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
    headline: 'Resultados Reais & PortfÃ³lio em Destaque',
    subtitle: 'Registros reais do nosso padrÃ£o de entrega e procedimentos',
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
      label: `${target.label || 'BotÃ£o'} (CÃ³pia)`
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
            title="Voltar para Minha Ãrea"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Minha Ãrea</span>
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
            title="Preencher textos, bio e serviÃ§os com IA"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Preencher com IA</span>
          </button>
        </div>

        {/* Lado Direito: NotificaÃ§Ã£o de Salvo & BotÃ£o Salvar Principal */}
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
        {/* COLUNA 1 â€” Menu de NavegaÃ§Ã£o / SeÃ§Ãµes (Desktop: w-72) */}
        {/* --------------------------------------------------------- */}
        <aside className="hidden lg:flex w-72 border-r border-stone-800/80 bg-[#0D0D11] flex-col shrink-0 select-none">
          <div className="p-4 border-b border-stone-800/60 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-bold">
              Estrutura da PÃ¡gina
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
              {SECTION_ITEMS.length} BLOCOS
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-stone-800">
            {SECTION_ITEMS.map((sec) => {
              const Icon = sec.icon
              const isActive = activeSection === sec.id
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

          {/* RodapÃ© da Coluna 1: Status do BioSite */}
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
        {/* COLUNA 2 â€” Palco Central / Canvas de VisualizaÃ§Ã£o (flex-1) */}
        {/* --------------------------------------------------------- */}
        <section
          className={`flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-[#070709] relative overflow-hidden ${
            mobileMode === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Fundo com iluminaÃ§Ã£o sutil de estÃºdio */}
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
                {/* 1. Barra de AnÃºncio Superior (se ativada) */}
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
                      â— {props.announcementData.badge}
                    </span>
                    <span className="truncate">{props.announcementData.text}</span>
                  </div>
                )}

                {/* Ilha DinÃ¢mica e Registro no Topo */}
                <div className="relative z-20 pt-2 px-4 flex items-center justify-between text-[7px] font-mono tracking-widest text-stone-400 uppercase">
                  <div className="w-14 h-3 bg-black rounded-full mx-auto" />
                  <span className="font-bold opacity-80 absolute right-4 top-2 text-[8px]">
                    {props.registrationCode}
                  </span>
                </div>

                {/* Foto do Perfil com Efeito de FusÃ£o de EstÃºdio */}
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

                {/* Bloco de InformaÃ§Ãµes Principais */}
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

                  {/* AvaliaÃ§Ãµes Google */}
                  <div className="mt-1 text-amber-400 text-[9px] flex items-center gap-1 font-mono">
                    <span>â˜…â˜…â˜…â˜…â˜…</span>
                    <span className="opacity-80">{props.rating} ({props.reviewsCount})</span>
                  </div>

                  {/* Barra RÃ¡pida (WhatsApp & Agendar) */}
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

                  {/* Banner de UrgÃªncia & CronÃ´metro */}
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

                  {/* SubpÃ¡ginas Pro */}
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

                  {/* BotÃµes Principais de AÃ§Ã£o (ConfiguraÃ§Ãµes BioVip Oficial) */}
                  <div className="w-full space-y-1.5 mt-2">
                    {props.buttons.map((btn: any, btnIdx: number) => {
                      const isHigh = !!btn.isHighlighted || btn.variant === 'accent' || btnIdx === 0
                      const badgeText = btn.badgeText || btn.highlightBadge || (isHigh ? 'â­ MAIS ESCOLHIDO' : '')
                      const titleText = btn.label || btn.title
                      const subtitleText = btn.subtitle || ''
                      const cardImg = btn.cardImage || btn.image
                      const imgPos = btn.imagePosition || (cardImg ? 'right' : 'none')
                      const imgFit = btn.imageFitStyle || 'popout'
                      const ctaAction = btn.ctaActionText
                      const anim = btn.animation || (isHigh ? 'pulse-glow' : 'none')
                      const animClass = anim === 'pulse-glow' ? 'btn-anim-pulse' : anim === 'bounce' ? 'btn-anim-bounce' : anim === 'shimmer' ? 'relative overflow-hidden' : ''

                      let cardBg = props.selectedPalette.card || '#14161c'
                      let cardBorder = isHigh ? props.selectedPalette.accent : `${props.selectedPalette.accent}33`
                      let textColor = props.selectedPalette.text

                      if (btn.customBg) {
                        cardBg = btn.customBg
                      } else if (btn.variant === 'accent' || props.buttonStyle === 'solido_glam' || props.buttonStyle === 'solido') {
                        cardBg = props.selectedPalette.accent
                        textColor = props.selectedPalette.buttonText || '#000000'
                        cardBorder = 'rgba(255,255,255,0.45)'
                      } else if (props.buttonStyle === 'vidro_glamour' || props.buttonStyle === 'vidro') {
                        cardBg = 'rgba(255, 255, 255, 0.08)'
                        cardBorder = 'rgba(255, 255, 255, 0.22)'
                      }

                      if (btn.customText) textColor = btn.customText

                      return (
                        <div
                          key={btn.id}
                          className={`w-full p-2 rounded-xl border text-left flex items-center justify-between gap-1.5 shadow-sm transition relative overflow-hidden ${animClass}`}
                          style={{
                            backgroundColor: cardBg,
                            borderColor: cardBorder,
                            color: textColor
                          }}
                        >
                          {/* Efeito Shimmer */}
                          {(anim === 'shimmer' || props.buttonStyle === 'shimmer_ouro') && (
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                              <div
                                className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                                style={{ animation: 'btn-shimmer-sweep 2.8s infinite' }}
                              />
                            </div>
                          )}

                          {badgeText && (
                            <div
                              className="absolute -top-1 right-2 px-1.5 py-0.2 rounded-full text-[6.5px] font-mono font-bold uppercase z-10 border shadow"
                              style={{
                                backgroundColor: props.selectedPalette.accent,
                                color: props.selectedPalette.buttonText || '#000',
                                borderColor: 'rgba(255,255,255,0.4)'
                              }}
                            >
                              {badgeText}
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            {cardImg && imgPos === 'left' && (
                              <div className={`shrink-0 overflow-hidden border border-white/20 ${imgFit === 'popout' ? 'w-6 h-6 rounded-full ring-1 ring-amber-400' : 'w-6 h-6 rounded-md'}`}>
                                <img src={cardImg} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <span className="font-bold text-[9.5px] block leading-tight truncate">
                                {titleText}
                              </span>
                              {subtitleText && (
                                <span className="text-[7.5px] opacity-70 block truncate">
                                  {subtitleText}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {cardImg && imgPos === 'right' && (
                              <div className={`shrink-0 overflow-hidden border border-white/20 ${imgFit === 'popout' ? 'w-6 h-6 rounded-full ring-1 ring-amber-400' : 'w-6 h-6 rounded-md'}`}>
                                <img src={cardImg} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}

                            {ctaAction && (
                              <span
                                className="px-1.5 py-0.5 rounded text-[7px] font-mono font-bold uppercase border"
                                style={{
                                  backgroundColor: `${props.selectedPalette.accent}20`,
                                  borderColor: `${props.selectedPalette.accent}40`,
                                  color: textColor
                                }}
                              >
                                {ctaAction}
                              </span>
                            )}

                            <span
                              className="text-[10px] font-bold"
                              style={{ color: props.selectedPalette.accent }}
                            >
                              â†’
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* BotÃ£o de Quiz Anti-curiosos */}
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
                        â†’
                      </span>
                    </div>
                  )}

                  {/* MÃ©tricas de Autoridade */}
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

                  {/* 11. CatÃ¡logo Completo de Procedimentos & PreÃ§os */}
                  {props.servicesCatalogData?.enabled && props.servicesCatalogData.items && props.servicesCatalogData.items.length > 0 && (
                    <div className="w-full mt-3 space-y-2 text-left">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[7.5px] font-mono uppercase tracking-widest font-bold"
                          style={{ color: props.selectedPalette.accent }}
                        >
                          CATÃLOGO VIP
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

                      {/* Lista de Itens do CatÃ¡logo */}
                      <div className="space-y-2">
                        {props.servicesCatalogData.items
                          .filter((item: any) => previewCatalogCategory === 'TODOS' || item.category === previewCatalogCategory)
                          .slice(0, 4)
                          .map((srv: any) => {
                            const hasImage = Boolean(srv.image)
                            const isCoverLayout = hasImage && srv.imageLayout === 'cover'

                            if (isCoverLayout) {
                              return (
                                <div
                                  key={srv.id}
                                  className="p-2 rounded-xl border space-y-1.5 text-left transition overflow-hidden"
                                  style={{
                                    backgroundColor: `${props.selectedPalette.card}cc`,
                                    borderColor: `${props.selectedPalette.accent}25`
                                  }}
                                >
                                  {/* Imagem Maior de Destaque no Preview */}
                                  <div className="w-full h-20 rounded-lg overflow-hidden relative border border-white/10">
                                    <img
                                      src={srv.image}
                                      alt={srv.name}
                                      className="w-full h-full object-cover"
                                    />
                                    {srv.badge && (
                                      <span
                                        className="absolute top-1 left-1 px-1.5 py-0.2 rounded text-[6px] font-mono font-bold uppercase shadow border backdrop-blur-md"
                                        style={{
                                          backgroundColor: `${props.selectedPalette.card}e6`,
                                          borderColor: props.selectedPalette.accent,
                                          color: props.selectedPalette.accent
                                        }}
                                      >
                                        {srv.badge}
                                      </span>
                                    )}
                                    {srv.duration && (
                                      <span className="absolute top-1 right-1 bg-black/70 px-1.5 py-0.2 rounded text-[6.5px] font-mono text-stone-200">
                                        {srv.duration}
                                      </span>
                                    )}
                                  </div>

                                  <div>
                                    <h5 className="text-[9.5px] font-bold text-white leading-tight">
                                      {srv.name}
                                    </h5>
                                    {srv.description && (
                                      <p className="text-[7.5px] text-stone-300 font-sans leading-snug line-clamp-1 mt-0.5">
                                        {srv.description}
                                      </p>
                                    )}
                                  </div>

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
                                      <span>â†’</span>
                                    </span>
                                  </div>
                                </div>
                              )
                            }

                            return (
                              <div
                                key={srv.id}
                                className="p-2 rounded-xl border space-y-1 text-left transition"
                                style={{
                                  backgroundColor: `${props.selectedPalette.card}cc`,
                                  borderColor: `${props.selectedPalette.accent}25`
                                }}
                              >
                                <div className="flex items-start gap-1.5">
                                  {hasImage && (
                                    <img
                                      src={srv.image}
                                      alt={srv.name}
                                      className="w-9 h-9 rounded-lg object-cover shrink-0 border border-white/10"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
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

                                    <p className="text-[7.5px] text-stone-400 font-sans leading-snug line-clamp-1 mt-0.5">
                                      {srv.description}
                                    </p>
                                  </div>
                                </div>

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
                                    <span>â†’</span>
                                  </span>
                                </div>
                              </div>
                            )
                          })}
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
                          <span className="truncate">CartÃ£o atÃ© 12x</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-300">
                          <Zap className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                          <span className="truncate">Pix InstantÃ¢neo</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-300">
                          <Car className="w-2.5 h-2.5 text-sky-400 shrink-0" />
                          <span className="truncate">FÃ¡cil Acesso</span>
                        </div>
                        <div className="flex items-center gap-1 text-stone-300">
                          <ShieldCheck className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                          <span className="truncate">EspaÃ§o VIP</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 12. Galeria de Fotos / PortfÃ³lio (ConfiguraÃ§Ãµes Oficiais BioVip) */}
                  {effectiveGalleryConfig.enabled && effectiveGalleryConfig.photos && effectiveGalleryConfig.photos.length > 0 && (
                    <div className="w-full mt-3 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[7.5px] font-mono uppercase tracking-widest font-bold opacity-80 text-amber-300">
                          {effectiveGalleryConfig.badge || 'PORTFÃ“LIO & ESTRUTURA VIP'}
                        </span>
                        <span className="text-[7px] font-mono text-stone-400">
                          {effectiveGalleryConfig.photos.length} fotos
                        </span>
                      </div>

                      {effectiveGalleryConfig.headline && (
                        <p className="text-[9px] font-bold text-stone-200 leading-tight">
                          {effectiveGalleryConfig.headline}
                        </p>
                      )}

                      {/* Layout 1: Carrossel Touch Deslizante */}
                      {effectiveGalleryConfig.layout === 'carousel-snap' && (
                        <div className="flex gap-1.5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-0.5">
                          {effectiveGalleryConfig.photos.map((imgUrl: string, i: number) => (
                            <div
                              key={i}
                              onClick={() => {
                                if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(i)
                              }}
                              className={`snap-center shrink-0 w-[70%] rounded-lg overflow-hidden border border-white/10 relative group bg-stone-900 cursor-pointer shadow-sm ${
                                effectiveGalleryConfig.aspectRatio === 'portrait'
                                  ? 'aspect-[4/5]'
                                  : effectiveGalleryConfig.aspectRatio === 'landscape'
                                  ? 'aspect-[4/3]'
                                  : 'aspect-square'
                              }`}
                            >
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1.5">
                                {effectiveGalleryConfig.captions?.[i] && (
                                  <span className="text-[7px] text-stone-200 line-clamp-1 font-medium">
                                    {effectiveGalleryConfig.captions[i]}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Layout 2: Grade 2 Colunas */}
                      {effectiveGalleryConfig.layout === 'grid-2col' && (
                        <div className="grid grid-cols-2 gap-1">
                          {effectiveGalleryConfig.photos.slice(0, 6).map((imgUrl: string, i: number) => (
                            <div
                              key={i}
                              onClick={() => {
                                if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(i)
                              }}
                              className={`rounded-lg overflow-hidden border border-white/10 relative group bg-stone-900 cursor-pointer ${
                                effectiveGalleryConfig.aspectRatio === 'portrait'
                                  ? 'aspect-[4/5]'
                                  : effectiveGalleryConfig.aspectRatio === 'landscape'
                                  ? 'aspect-[4/3]'
                                  : 'aspect-square'
                              }`}
                            >
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                              {effectiveGalleryConfig.captions?.[i] && (
                                <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1 text-[6.5px] text-white line-clamp-1">
                                  {effectiveGalleryConfig.captions[i]}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Layout 3: Mosaico DinÃ¢mico Bento (1Âª Foto Grande + Grade) */}
                      {effectiveGalleryConfig.layout === 'mosaic' && (
                        <div className="grid grid-cols-2 gap-1">
                          <div
                            onClick={() => {
                              if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(0)
                            }}
                            className="col-span-2 aspect-[16/10] rounded-xl overflow-hidden border border-amber-400/30 relative group bg-stone-900 cursor-pointer shadow-md"
                          >
                            <img src={effectiveGalleryConfig.photos[0]} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-2">
                              <span className="self-start px-1.5 py-0.2 rounded text-[6.5px] font-mono font-bold bg-amber-400 text-stone-950 uppercase">
                                â­ Destaque
                              </span>
                              {effectiveGalleryConfig.captions?.[0] && (
                                <span className="text-[7.5px] text-white line-clamp-1 font-medium">
                                  {effectiveGalleryConfig.captions[0]}
                                </span>
                              )}
                            </div>
                          </div>
                          {effectiveGalleryConfig.photos.slice(1, 5).map((imgUrl: string, i: number) => (
                            <div
                              key={i + 1}
                              onClick={() => {
                                if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(i + 1)
                              }}
                              className="aspect-square rounded-lg overflow-hidden border border-white/10 relative group bg-stone-900 cursor-pointer"
                            >
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Layout 4: Cards Expandidos */}
                      {effectiveGalleryConfig.layout === 'scroll-cards' && (
                        <div className="space-y-1.5">
                          {effectiveGalleryConfig.photos.slice(0, 3).map((imgUrl: string, i: number) => (
                            <div
                              key={i}
                              onClick={() => {
                                if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(i)
                              }}
                              className="rounded-xl overflow-hidden border border-white/10 bg-stone-900/60 p-1 space-y-1 cursor-pointer"
                            >
                              <div className="w-full aspect-[16/10] rounded-lg overflow-hidden">
                                <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                              </div>
                              {effectiveGalleryConfig.captions?.[i] && (
                                <p className="text-[7.5px] text-stone-300 px-1 line-clamp-1">
                                  {effectiveGalleryConfig.captions[i]}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Layout 5: Grade 3 Colunas (smart_masonry / grid3) */}
                      {(effectiveGalleryConfig.layout === 'grid3' || effectiveGalleryConfig.layout === 'smart_masonry') && (
                        <div className="grid grid-cols-3 gap-1">
                          {effectiveGalleryConfig.photos.slice(0, 6).map((imgUrl: string, i: number) => (
                            <div
                              key={i}
                              onClick={() => {
                                if (effectiveGalleryConfig.enableLightbox) setPreviewLightboxIndex(i)
                              }}
                              className={`rounded-lg overflow-hidden border border-white/10 relative group bg-stone-900 cursor-pointer ${
                                effectiveGalleryConfig.aspectRatio === 'portrait'
                                  ? 'aspect-[4/5]'
                                  : effectiveGalleryConfig.aspectRatio === 'landscape'
                                  ? 'aspect-[4/3]'
                                  : 'aspect-square'
                              }`}
                            >
                              <img
                                src={imgUrl}
                                alt={`PortfÃ³lio ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Sparkles className="w-2.5 h-2.5 text-white" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 13. LocalizaÃ§Ã£o & Rotas GPS */}
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
                            NOSSA LOCALIZAÃ‡ÃƒO
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

                        {/* 4 BotÃµes de Rota */}
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
                          AVALIAÃ‡Ã•ES NO GOOGLE
                        </span>
                        <span className="text-[7.5px] font-mono text-amber-400 font-bold flex items-center gap-0.5">
                          <span>5.0</span>
                          <span>â˜…â˜…â˜…â˜…â˜…</span>
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
                              <span>â˜…â˜…â˜…â˜…â˜…</span>
                              <span className="text-[6.5px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20">
                                âœ“ Verificado
                              </span>
                            </div>
                            <p className="text-[8px] text-stone-300 font-sans italic leading-snug line-clamp-2">
                              &ldquo;{t.text}&rdquo;
                            </p>
                            <div className="text-[7px] font-mono text-stone-400">
                              {t.clientName || t.name} Â· {t.city || t.role}
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
                            &ldquo;{props.aboutMeData.closingPhrase || props.aboutMeData.quote}&rdquo;
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 16. DÃºvidas Frequentes (FAQ Sanfonado) */}
                  {props.faqData && props.faqData.length > 0 && (
                    <div className="w-full mt-3 space-y-1 text-left">
                      <span className="text-[7.5px] font-mono uppercase tracking-widest font-bold opacity-80 block mb-0.5">
                        DÃšVIDAS FREQUENTES
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

                  {/* 18. Monograma e Assinatura Editorial de RodapÃ© */}
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
                      Â© {new Date().getFullYear()} {props.businessTitle || props.brandName}. Todos os direitos reservados.
                    </div>
                    <div className="text-[6px] font-mono text-stone-500 hover:text-amber-400 transition mt-0.5">
                      âœ¨ Desenvolvido com padrÃ£o BioVip
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- */}
        {/* COLUNA 3 â€” Painel de EdiÃ§Ã£o do Bloco Ativo (w-80 a w-96) */}
        {/* --------------------------------------------------------- */}
        <section
          className={`w-full lg:w-96 border-l border-stone-800/80 bg-[#121216] flex flex-col shrink-0 select-none ${
            mobileMode === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* CabeÃ§alho do Bloco Ativo na Coluna 3 */}
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

          {/* Ãrea de FormulÃ¡rio com Rolagem Independente */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-stone-800">
            {/* ======================================================= */}
            {/* 1. SEÃ‡ÃƒO: PALETA & TIPOGRAFIA */}
            {/* ======================================================= */}
            {activeSection === 'paleta' && (
              <div className="space-y-5 animate-fade-in">
                {/* Paletas de Cores */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-mono uppercase text-stone-400 font-bold flex items-center gap-1.5">
                      Paleta de Cores ({PALETTES.length} opÃ§Ãµes luxo)
                      {!canEditTheme && <Lock className="w-3 h-3 text-amber-400" />}
                    </label>
                  </div>

                  {!canEditTheme && (
                    <div className="p-3 mb-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                      <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold block uppercase tracking-wider">Cores Bloqueadas pelo Administrador</span>
                        <p className="text-[10px] text-stone-400 leading-snug mt-0.5">A paleta de cores deste BioSite foi bloqueada para alteraÃ§Ãµes pelo cliente.</p>
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
                            <span className={`text-[11px] font-bold block truncate ${isSel ? 'text-amber-300' : 'text-stone-300'}`}>
                              {pal.name}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>
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
                        <p className="text-[10px] text-stone-400 leading-snug mt-0.5">A tipografia deste modelo foi selecionada pelo administrador e estÃ¡ protegida.</p>
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

                {/* Estilos e Efeitos de BotÃ£o */}
                <fieldset disabled={!canEditButtons} className={!canEditButtons ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 font-bold mb-1">
                        Estilo do BotÃ£o
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
                        AnimaÃ§Ã£o do BotÃ£o
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
                        { id: 'organico', label: 'FusÃ£o OrgÃ¢nica' },
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
            {/* 2. SEÃ‡ÃƒO: CABEÃ‡ALHO & PERFIL */}
            {/* ======================================================= */}
            {activeSection === 'cabecalho' && (
              <div className="space-y-4 animate-fade-in">
                {/* Banner de IA para Preenchimento AutomÃ¡tico */}
                <fieldset disabled={!canEditBio} className={!canEditBio ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 flex items-center justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-300 font-black block">
                        âœ¨ InteligÃªncia Artificial BioVip
                      </span>
                      <p className="text-[11px] text-stone-300 leading-tight mt-0.5">
                        Gere bio, especialidade e textos de alta conversÃ£o para o seu nicho.
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
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono uppercase text-stone-400 font-bold flex items-center gap-1.5">
                      Foto do Perfil / Retrato de EstÃºdio
                      {!canEditPhotos && <Lock className="w-3 h-3 text-amber-400" />}
                    </label>
                  </div>

                  {!canEditPhotos && (
                    <div className="p-3 mb-2 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                      <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold block uppercase tracking-wider">Foto do Perfil Bloqueada</span>
                        <p className="text-[10px] text-stone-400 leading-snug mt-0.5">A foto principal de estÃºdio foi definida pela agÃªncia e estÃ¡ travada.</p>
                      </div>
                    </div>
                  )}

                  <fieldset disabled={!canEditPhotos} className={!canEditPhotos ? 'opacity-50 pointer-events-none' : ''}>
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
                  </fieldset>
                </div>

                {!canEditBio && (
                  <div className="p-3 mb-2 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">Bio & Identidade Bloqueadas</span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">As informaÃ§Ãµes editoriais e registros oficiais foram configurados pelo administrador.</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={!canEditBio} className={!canEditBio ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="space-y-4">
                    {/* Nome e TÃ­tulo */}
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
                          TÃ­tulo de ExibiÃ§Ã£o
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
            {/* 3. SEÃ‡ÃƒO: BOTÃ•ES & LINKS PRINCIPAIS (BIOVIP ORIGINAL) */}
            {/* ======================================================= */}
            {activeSection === 'botoes' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-1 border-b border-stone-800/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase text-stone-200 font-bold">
                        BotÃµes VIP de Alta ConversÃ£o
                      </span>
                      {!canEditButtons && <Lock className="w-3.5 h-3.5 text-amber-400" />}
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                        {props.buttons.length} BOTÃ•ES
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      Suporte a fotos pop-out, pills de aÃ§Ã£o, badges e mensagens automÃ¡ticas de WhatsApp.
                    </p>
                  </div>
                  {canEditButtons && (
                    <button
                      type="button"
                      onClick={() => {
                        const newBtn = {
                          id: `cta-${Date.now()}`,
                          label: 'AGENDAR HORÃRIO VIP',
                          subtitle: 'Toque para atendimento prioritÃ¡rio e sem fila',
                          icon: 'calendar',
                          url: '#booking',
                          linkType: 'booking' as const,
                          whatsappMessage: `OlÃ¡! Gostaria de consultar horÃ¡rios disponÃ­veis no ${props.businessTitle || 'studio'}.`,
                          animation: 'pulse-glow' as const,
                          variant: 'accent' as const,
                          badgeText: 'MAIS PROCURADO',
                          ctaActionText: 'RESERVAR HORÃRIO',
                          imagePosition: 'none' as const,
                          imageFitStyle: 'popout' as const,
                          isHighlighted: true
                        }
                        props.setButtons([...props.buttons, newBtn])
                        props.setHasUnsavedChanges(true)
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-[#E2B857] hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar BotÃ£o VIP
                    </button>
                  )}
                </div>

                {!canEditButtons && (
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">EdiÃ§Ã£o de BotÃµes Bloqueada</span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">Os botÃµes e links de conversÃ£o deste BioSite estÃ£o bloqueados para alteraÃ§Ã£o.</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={!canEditButtons} className={!canEditButtons ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="space-y-3.5">
                  {props.buttons.map((btn: any, idx: number) => (
                    <div
                      key={btn.id || `btn-${idx}`}
                      className="p-3.5 sm:p-4 rounded-2xl bg-stone-900 border border-stone-800/90 hover:border-stone-700 transition space-y-3 shadow-md"
                    >
                      {/* Top Bar do Card de BotÃ£o */}
                      <div className="flex items-center justify-between pb-2 border-b border-stone-800/70">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-stone-200 truncate max-w-[180px]">
                            {btn.label || btn.title || 'BotÃ£o sem tÃ­tulo'}
                          </span>
                          {btn.badgeText && (
                            <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-amber-400 text-stone-950">
                              {btn.badgeText}
                            </span>
                          )}
                          {btn.cardImage && (
                            <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded-full">
                              ðŸ“· COM FOTO
                            </span>
                          )}
                        </div>

                        {/* AÃ§Ãµes: Mover, Duplicar, Excluir */}
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
                            title="Duplicar botÃ£o"
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
                              title="Remover botÃ£o"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Textos: TÃ­tulo Principal e SubtÃ­tulo */}
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            TÃ­tulo Principal do BotÃ£o
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
                            placeholder="Ex: AGENDAR HORÃRIO VIP"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 text-xs font-bold focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            SubtÃ­tulo / DescriÃ§Ã£o Curta
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
                            placeholder="Ex: Toque para atendimento prioritÃ¡rio e sem fila"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-300 border border-stone-800 text-[11px] focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Tipo de Destino e AÃ§Ã£o */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Tipo de AÃ§Ã£o / Link
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
                            <option value="whatsapp">ðŸ’¬ WhatsApp (Conversa Direta)</option>
                            <option value="booking">ðŸ“… Agendamento Online (#booking)</option>
                            <option value="catalogo">âœ¨ CatÃ¡logo de ServiÃ§os (#catalogo)</option>
                            <option value="quiz">ðŸŽ¯ Triagem / Quiz VIP (#quiz)</option>
                            <option value="maps">ðŸ“ LocalizaÃ§Ã£o / Google Maps</option>
                            <option value="custom">ðŸ”— Link Personalizado / Externo</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            Ãcone do BotÃ£o
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
                            <option value="calendar">Agenda / CalendÃ¡rio</option>
                            <option value="sparkles">Brilho / VIP / Estrela</option>
                            <option value="map">LocalizaÃ§Ã£o / Mapa</option>
                            <option value="scissors">Tesoura / Barbearia / SalÃ£o</option>
                            <option value="star">Estrela Destaque</option>
                            <option value="message">Mensagem / Bate-papo</option>
                          </select>
                        </div>
                      </div>

                      {/* Se for WhatsApp: Mensagem AutomÃ¡tica */}
                      {(btn.linkType === 'whatsapp' || btn.url?.includes('wa.me')) ? (
                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-emerald-400 mb-1 flex items-center gap-1 font-bold">
                            <MessageCircle className="w-3 h-3 text-emerald-400" /> Mensagem PrÃ©-formatada de WhatsApp
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
                            placeholder="Ex: OlÃ¡! Vim pelo site e gostaria de agendar uma consulta."
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

                      {/* Badges, Pills de AÃ§Ã£o e Efeitos VIP */}
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
                            Texto de AÃ§Ã£o Direta (Pill Direita)
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
                            placeholder="Ex: RESERVAR HORÃRIO, VER VALORES"
                            className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs font-bold uppercase focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* AnimaÃ§Ã£o & Estilo Visual */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="block text-[9.5px] font-mono uppercase text-stone-400 mb-1">
                            AnimaÃ§Ã£o VIP do BotÃ£o
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
                            <option value="pulse-glow">âœ¨ Pulso Luminoso (Glow VIP)</option>
                            <option value="shimmer">ðŸ’« Reflexo MetÃ¡lico (Shimmer Sweep)</option>
                            <option value="bounce">âš¡ Saltinho Suave (Bounce)</option>
                            <option value="none">Sem AnimaÃ§Ã£o</option>
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
                            <option value="accent">â­ Dourado / Accent (Foco Total)</option>
                            <option value="default">Elegante Escuro (Borda Fina)</option>
                          </select>
                        </div>
                      </div>

                      {/* Foto no BotÃ£o (BioVip Original: Pop-out ou Framed) */}
                      <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-mono uppercase text-amber-300 font-bold flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                            Foto Integrada ao BotÃ£o
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
                              PosiÃ§Ã£o da Foto
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
                              <option value="popout">Avatar Pop-Out (Salta do botÃ£o com aro)</option>
                              <option value="framed">Moldura Retangular Elegante</option>
                            </select>
                          </div>
                        </div>

                        {btn.imagePosition !== 'none' && (
                          <div className="flex items-center gap-2 pt-1">
                            {btn.cardImage && (
                              <img
                                src={btn.cardImage}
                                alt="Foto do botÃ£o"
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
                    </div>
                  ))}
                  </div>
                </fieldset>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. SEÃ‡ÃƒO: CATÃLOGO DE SERVIÃ‡OS */}
            {/* ======================================================= */}
            {activeSection === 'catalogo' && (
              <div className="space-y-4 animate-fade-in">
                {!canEditServices && (
                  <div className="p-3 mb-2 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">CatÃ¡logo Bloqueado pelo Administrador</span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">Os procedimentos, duraÃ§Ãµes e preÃ§os foram fixados pelo administrador e estÃ£o em modo somente-leitura.</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={!canEditServices} className={!canEditServices ? 'opacity-50 pointer-events-none' : ''}>
                {/* Switch Liga/Desliga */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
                      CatÃ¡logo Interativo VIP
                      {!canEditServices && <Lock className="w-3 h-3 text-amber-400" />}
                    </h3>
                    <p className="text-[10px] text-stone-400">
                      Tabela visual com preÃ§os, duraÃ§Ãµes e agendamento instantÃ¢neo.
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
                        TÃ­tulo do CatÃ¡logo
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
                            description: 'DescriÃ§Ã£o dos benefÃ­cios e resultados para o cliente.',
                            price: 'R$ 220',
                            duration: 'â± 1h',
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
                              placeholder="PreÃ§o (ex: R$ 250)"
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
                              placeholder="DuraÃ§Ã£o (ex: â± 1h)"
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
                            placeholder="DescriÃ§Ã£o dos benefÃ­cios..."
                            className="w-full p-2 rounded-lg bg-stone-950 text-stone-400 border border-stone-800 text-[11px]"
                          />

                          {/* Foto do ServiÃ§o / Procedimento e Modo de ExibiÃ§Ã£o */}
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
                                  title="Foto em miniatura integrada dentro do botÃ£o ao lado do nome"
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
                                  title="Imagem maior de destaque com botÃ£o de agendamento e valor abaixo dela"
                                >
                                  Imagem Maior
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
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
                                ? 'âœ¨ Exibindo como Card Editorial: Imagem grande com valor e agendamento logo abaixo.'
                                : 'âœ¨ Exibindo como BotÃ£o com Miniatura: Foto quadrada de 60px ao lado do nome do serviÃ§o.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                </fieldset>
              </div>
            )}

            {/* ======================================================= */}
            {/* 5. SEÃ‡ÃƒO: PORTFÃ“LIO & GALERIA */}
            {/* ======================================================= */}
            {activeSection === 'portfolio' && (
              <div className="space-y-4 animate-fade-in">
                {!canEditPhotos && (
                  <div className="p-3 mb-2 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">Galeria de Fotos Bloqueada</span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">As fotos do portfÃ³lio foram curadas pelo administrador e estÃ£o em modo somente-leitura.</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={!canEditPhotos} className={!canEditPhotos ? 'opacity-50 pointer-events-none' : ''}>
                {/* SubpÃ¡ginas Pro Integradas */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800">
                  <h3 className="font-bold text-xs text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    PÃ¡ginas Pro Integradas ({props.additionalPages.length}/3)
                    {!canEditPhotos && <Lock className="w-3 h-3 text-amber-400" />}
                  </h3>
                  <p className="text-[11px] text-stone-400 leading-relaxed mb-3">
                    Cada pÃ¡gina Pro inclui slider de Antes &amp; Depois, tabela completa de procedimentos e agenda VIP.
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

                {/* Galeria Oficial de Fotos & PortfÃ³lio (studentGrid / BioVip Oficial) */}
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                  {/* Header do MÃ³dulo com Switch */}
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-200">
                            Galeria de Fotos &amp; PortfÃ³lio
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
                        onChange={(e) => updateGalleryConfig(prev => ({ ...prev, enabled: e.target.checked }))}
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
                            placeholder="Ex: PORTFÃ“LIO VIP"
                            value={effectiveGalleryConfig.badge || ''}
                            onChange={(e) => updateGalleryConfig(prev => ({ ...prev, badge: e.target.value }))}
                            className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-amber-300 font-bold uppercase focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                            TÃ­tulo da Galeria
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Resultados Reais & PortfÃ³lio"
                            value={effectiveGalleryConfig.headline || ''}
                            onChange={(e) => updateGalleryConfig(prev => ({ ...prev, headline: e.target.value }))}
                            className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-stone-100 font-semibold focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1">
                          SubtÃ­tulo Explicativo
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: TransformaÃ§Ãµes reais geradas pelo mÃ©todo e registros de alto padrÃ£o"
                          value={effectiveGalleryConfig.subtitle || ''}
                          onChange={(e) => updateGalleryConfig(prev => ({ ...prev, subtitle: e.target.value }))}
                          className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-stone-950 border border-stone-800 text-stone-300 focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      {/* 4 Formatos de ExibiÃ§Ã£o no Celular (BioVip Original) */}
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-mono uppercase font-bold text-stone-300 block">
                          Formato de ExibiÃ§Ã£o no Celular
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'carousel-snap', label: 'ðŸŽ  Carrossel Touch', desc: 'Deslize horizontal fluido' },
                            { id: 'grid-2col', label: 'ðŸ“± Grade 2 Colunas', desc: 'Fotos lado a lado' },
                            { id: 'mosaic', label: 'ðŸŽ¨ Mosaico DinÃ¢mico', desc: 'Destaque 1Âª grande + grid' },
                            { id: 'scroll-cards', label: 'ðŸƒ Cards Expandidos', desc: '1 por vez com foco total' }
                          ].map((t) => {
                            const isSelected = (effectiveGalleryConfig.layout || 'carousel-snap') === t.id
                            return (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => updateGalleryConfig(prev => ({ ...prev, layout: t.id as any }))}
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

                      {/* ProporÃ§Ã£o das Imagens & Lightbox */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono uppercase font-semibold text-stone-300 block">
                            Formato das Imagens (ProporÃ§Ã£o)
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {[
                              { id: 'auto', label: 'ðŸ¤– Auto' },
                              { id: 'square', label: '1:1 Quadrado' },
                              { id: 'portrait', label: '4:5 Retrato' },
                              { id: 'landscape', label: '4:3 Paisagem' }
                            ].map((t) => {
                              const isSelected = (effectiveGalleryConfig.aspectRatio || 'auto') === t.id
                              return (
                                <button
                                  key={t.id}
                                  type="button"
                                  onClick={() => updateGalleryConfig(prev => ({ ...prev, aspectRatio: t.id as any }))}
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
                            onChange={(e) => updateGalleryConfig(prev => ({ ...prev, enableLightbox: e.target.checked }))}
                            className="accent-amber-500 w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Presets de Fotos por Nicho (BioVip Original) */}
                      <div className="space-y-1.5 pt-2 border-t border-stone-800/80">
                        <label className="text-[10px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          Preencher Fotos com Exemplos de Alto PadrÃ£o por Nicho:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <button
                            type="button"
                            onClick={() => loadGalleryPreset('beauty')}
                            className="px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-[11px] text-stone-300 font-medium transition cursor-pointer text-center"
                          >
                            ðŸ’… Beleza &amp; Lash
                          </button>
                          <button
                            type="button"
                            onClick={() => loadGalleryPreset('barber')}
                            className="px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-[11px] text-stone-300 font-medium transition cursor-pointer text-center"
                          >
                            âœ‚ï¸ Barbearia
                          </button>
                          <button
                            type="button"
                            onClick={() => loadGalleryPreset('health')}
                            className="px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-[11px] text-stone-300 font-medium transition cursor-pointer text-center"
                          >
                            ðŸ©º SaÃºde &amp; ClÃ­nica
                          </button>
                          <button
                            type="button"
                            onClick={() => loadGalleryPreset('exec')}
                            className="px-2.5 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-[11px] text-stone-300 font-medium transition cursor-pointer text-center"
                          >
                            ðŸ’¼ Executivo &amp; Cursos
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

                                  {/* BotÃ£o Zoom Lightbox */}
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
                                updateGalleryConfig(prev => ({
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
            {/* 5.5. SEÃ‡ÃƒO: MÃ“DULOS & BLOCOS DO BIOSITE (15 BLOCOS) */}
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
                      Ative ou desative qualquer um dos 15 mÃ³dulos do seu BioSite com apenas 1 clique. As alteraÃ§Ãµes sÃ£o sincronizadas instantaneamente no seu link.
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
                        Controle de MÃ³dulos Bloqueado pelo Administrador
                      </span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">
                        Os mÃ³dulos deste BioSite sÃ£o administrados diretamente pela agÃªncia. Abaixo vocÃª pode visualizar quais blocos estÃ£o ativos.
                      </p>
                    </div>
                  </div>
                )}

                {/* Lista com os 15 MÃ³dulos */}
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
                                {isEnabled ? 'VisÃ­vel' : 'Oculto'}
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
            {/* 6. SEÃ‡ÃƒO: PROVA SOCIAL & DEPOIMENTOS */}
            {/* ======================================================= */}
            {activeSection === 'social' && (
              <div className="space-y-4 animate-fade-in">
                {/* Nota do Google */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    AvaliaÃ§Ãµes do Google Meu NegÃ³cio
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
                        NÃºmero de Reviews
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

                {/* MÃ©tricas de Autoridade */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-300 font-bold block">
                    MÃ©tricas de Autoridade (3 Destaques)
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
                          placeholder="RÃ³tulo (ex: CLIENTES)"
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
                          city: 'SÃ£o Paulo - SP',
                          text: 'ExperiÃªncia maravilhosa, atendimento impecÃ¡vel e resultado incrÃ­vel!',
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
                        placeholder="Texto da avaliaÃ§Ã£o..."
                        className="w-full p-2 rounded-lg bg-stone-950 text-stone-300 border border-stone-800 text-[11px] leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 7. SEÃ‡ÃƒO: MÃ“DULOS VIP DE CONVERSÃƒO (8 MÃ“DULOS) */}
            {/* ======================================================= */}
            {activeSection === 'vip' && (
              <div className="space-y-3.5 animate-fade-in">
                {!canEditModules && (
                  <div className="p-3 mb-2 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                    <Lock className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold block uppercase tracking-wider">MÃ³dulos VIP Bloqueados</span>
                      <p className="text-[10px] text-stone-400 leading-snug mt-0.5">A ativaÃ§Ã£o dos mÃ³dulos VIP Ã© configurada pelo administrador.</p>
                    </div>
                  </div>
                )}

                <fieldset disabled={!canEditModules} className={!canEditModules ? 'opacity-50 pointer-events-none' : ''}>
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40">
                  <span className="text-[10px] font-mono text-amber-300 font-black uppercase tracking-wider block mb-1">
                    ðŸ‘‘ 8 MÃ“DULOS VIP DE ALTA CONVERSÃƒO
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Personalize gatilhos de escassez, cronÃ´metro de urgÃªncia, quiz qualificador, GPS e FAQ sanfonado.
                  </p>
                </div>

                {/* 1. Barra de Aviso Superior */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      ðŸ“¢ Barra de Aviso Superior
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

                {/* 2. Gatilho de UrgÃªncia & CronÃ´metro */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      ðŸ”¥ Gatilho de UrgÃªncia &amp; CronÃ´metro
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
                        placeholder="TÃ­tulo de UrgÃªncia (ex: ðŸ”¥ CONDIÃ‡ÃƒO ESPECIAL DE HOJE)"
                        className="w-full p-2 rounded-xl bg-stone-950 text-amber-300 border border-stone-800 text-xs font-mono font-bold"
                      />
                      <input
                        type="text"
                        value={props.urgencyData.subtitle}
                        onChange={(e) => {
                          props.setUrgencyData({ ...props.urgencyData, subtitle: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="SubtÃ­tulo..."
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-300 border border-stone-800 text-xs"
                      />
                    </div>
                  )}
                </div>

                {/* 3. Triagem Anti-Curiosos (Quiz VIP) */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      ðŸŽ¯ Triagem Anti-Curiosos (Quiz VIP)
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
                        placeholder="Texto do botÃ£o do Quiz"
                        className="w-full p-2 rounded-xl bg-stone-950 text-amber-300 border border-stone-800 text-xs font-bold"
                      />
                    </div>
                  )}
                </div>

                {/* 4. LocalizaÃ§Ã£o com GPS & Aberto Agora */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      ðŸ“ LocalizaÃ§Ã£o com GPS &amp; Aberto Agora
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
                        placeholder="EndereÃ§o fÃ­sico..."
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-200 border border-stone-800 text-xs"
                      />
                      <input
                        type="text"
                        value={props.locationData.hours}
                        onChange={(e) => {
                          props.setLocationData({ ...props.locationData, hours: e.target.value })
                          props.setHasUnsavedChanges(true)
                        }}
                        placeholder="HorÃ¡rios (ex: Seg a Sex Â· 09h Ã s 19h)"
                        className="w-full p-2 rounded-xl bg-stone-950 text-stone-400 border border-stone-800 text-xs font-mono"
                      />
                    </div>
                  )}
                </div>

                {/* 5. Sobre o Especialista */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      ðŸ‘©â€âš•ï¸ Sobre o Especialista
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
                        placeholder="TÃ­tulo (ex: Sobre Nosso Atendimento)"
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

                {/* 6. DÃºvidas Frequentes (FAQ) */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      â“ DÃºvidas Frequentes ({props.faqData?.length || 0})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newFaq = {
                          question: 'Como agendar um horÃ¡rio?',
                          answer: 'Basta tocar no botÃ£o de WhatsApp e escolher o procedimento.'
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
                </fieldset>
              </div>
            )}

            {/* ======================================================= */}
            {/* 8. SEÃ‡ÃƒO: PÃXEL, ANÃšNCIOS & SEO */}
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
                    Rastreamento AutomÃ¡tico de ConversÃµes
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
                    <span>Disparar evento &quot;Lead&quot; ao clicar em qualquer botÃ£o do WhatsApp</span>
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
            {/* 9. SEÃ‡ÃƒO: ASSINATURA & DOMÃNIO */}
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
                        Seu BioSite foi gerado e se encontra no ar em perÃ­odo de cortesia. Se apÃ³s{' '}
                        <strong className="text-amber-400 font-mono">
                          {props.remainingHours}h restantes
                        </strong>{' '}
                        o pagamento nÃ£o for confirmado, a pÃ¡gina serÃ¡ suspensa.
                      </p>

                      <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-400">Plano Anual BioVip:</span>
                          <span className="font-bold text-amber-300 font-mono">R$ 49,90 /mÃªs</span>
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
                          {props.isProcessingPayment ? 'Validando...' : 'âœ“ JÃ¡ Efetuei o Pagamento'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Sua assinatura anual estÃ¡ confirmada e seu BioSite estÃ¡ com alta prioridade nos servidores CDN.
                    </p>
                  )}
                </div>

                {/* DomÃ­nio & EndereÃ§o */}
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                    EndereÃ§o Oficial na Web
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

          {/* RodapÃ© Fixo da Coluna 3: Salvar AlteraÃ§Ãµes */}
          <div className="p-4 border-t border-stone-800 bg-[#0E0E12] shrink-0">
            <button
              type="button"
              onClick={props.handleSavePage}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-[#E2B857] to-amber-400 hover:from-amber-300 hover:to-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider font-mono shadow-lg shadow-amber-500/10 active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar AlteraÃ§Ãµes</span>
            </button>
          </div>
        </section>
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
          <span>SeÃ§Ãµes</span>
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
          <span>{mobileMode === 'editor' ? 'Ver PrÃ©via' : 'Editar'}</span>
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
                Selecione a SeÃ§Ã£o para Editar
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

          {/* Imagem Central com Setas de NavegaÃ§Ã£o */}
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
                alt={`PortfÃ³lio ampliado ${previewLightboxIndex + 1}`}
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

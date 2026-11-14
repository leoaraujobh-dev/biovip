'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import TemplatePhonePreview from '@/components/TemplatePhonePreview'
import BioSiteEditor3Col from './BioSiteEditor3Col'
import ClientVipModulesTab from './components/ClientVipModulesTab'
import ClientPixelsTab from './components/ClientPixelsTab'
import ClientPaymentTab from './components/ClientPaymentTab'
import ClientServicesTab from './components/ClientServicesTab'
import ClientGalleryTab from './components/ClientGalleryTab'
import ClientLeadsTab from './components/ClientLeadsTab'
import ClientAccountTab from './components/ClientAccountTab'
import ClientModals from './components/ClientModals'
import { CATEGORY_TABS, PAGE_TEMPLATES, PageTemplate } from '@/data/pageTemplates'
import {
  DEMO_PHOTOS,
  PHOTO_LAYOUTS,
  PALETTES,
  BACKGROUND_STYLES,
  TYPOGRAPHIES,
  BUTTON_STYLES,
  BUTTON_ANIMATIONS,
  HIGHLIGHT_BADGES,
  NICHES_LIST
} from '@/data/bioSiteDesign'
import { Project, StudentGridConfig, projects as defaultProjects } from '@/data/projects'
import { Subscription } from '@/data/subscriptions'
import { generateNicheContent } from '@/utils/aiNicheGenerator'
import { applyCanvasOrganicFade, applySilhouetteCutout, readImageAsDataUrl } from '@/utils/imageProcessors'
import { saveBioSite, getLeads, LeadSubmission } from '@/services/biositeService'
import { healMojibake } from '@/utils/textSanitizer'
import { getClientConfig, DEFAULT_CLIENT_PERMISSIONS } from '@/data/clientPermissions'
import {
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  MessageCircle,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  QrCode,
  Sparkles,
  Save,
  Clock,
  Instagram,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Eye,
  FileText,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  Smartphone,
  LogOut,
  Calendar,
  MapPin,
  ShoppingBag,
  HelpCircle,
  Lock,
  Wallet,
  Activity,
  Target,
  Radio,
  Upload,
  Wand2,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Flame,
  Download,
  Camera,
  Image as ImageIcon
} from 'lucide-react'

interface AdditionalPage {
  id: string
  templateId: string
  title: string
  slug: string
  createdAt: string
  views: number
  status: 'ativa' | 'rascunho'
}

export default function ContaClient() {
  // Controle de Visualização: 'dashboard' | 'editar_pagina' | 'adicionar_pagina'
  const [currentView, setCurrentView] = useState<'dashboard' | 'editar_pagina' | 'adicionar_pagina'>('dashboard')
  const [activeSidebarTab, setActiveSidebarTab] = useState<'pagina' | 'servicos' | 'galeria' | 'vendas' | 'leads' | 'agenda' | 'estatisticas' | 'pagamento' | 'planos' | 'conta' | 'pixel' | 'modulos_vip'>('pagina')
  const [leadsList, setLeadsList] = useState<LeadSubmission[]>([])
  const [leadFilter, setLeadFilter] = useState<'TODOS' | 'WHATSAPP' | 'QUIZ' | 'CATALOGO'>('TODOS')
  const [loadingLeads, setLoadingLeads] = useState(false)

  // Estado de Pagamento, Prazo de 48h & Tolerância
  const [paymentStatus, setPaymentStatus] = useState<'pendente' | 'ativa' | 'suspensa'>('pendente')
  const [deadline48h, setDeadline48h] = useState<string>('')
  const [remainingHours, setRemainingHours] = useState<number>(48)
  const [showPendingPaymentModal, setShowPendingPaymentModal] = useState<boolean>(false)
  const [activePaymentMethod, setActivePaymentMethod] = useState<'pix' | 'cartao'>('pix')
  const [cardHolder, setCardHolder] = useState<string>('')
  const [cardNumber, setCardNumber] = useState<string>('')
  const [cardExpiry, setCardExpiry] = useState<string>('')
  const [cardCvv, setCardCvv] = useState<string>('')
  const [cardInstallments, setCardInstallments] = useState<string>('12')
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false)
  const [paymentSuccessFeedback, setPaymentSuccessFeedback] = useState<boolean>(false)

  // Seletor de Modelo (Páginas Adicionais)
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('para_voce')
  const [previewModalTemplate, setPreviewModalTemplate] = useState<PageTemplate | null>(null)

  // Mensagens e feedbacks
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [pixModalOpen, setPixModalOpen] = useState(false)
  const [pixCopied, setPixCopied] = useState(false)

  // Accordion da Edição de Página (qual aba está aberta)
  const [openAccordion, setOpenAccordion] = useState<string | null>('paleta')

  // Dados do Bio Site
  const [brandName, setBrandName] = useState('Marcos')
  const [businessTitle, setBusinessTitle] = useState('Teste')
  const [niche, setNiche] = useState('Manicure e pedicure')
  const [tagline, setTagline] = useState('Estou testando')
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[2]) // Clínico sereno
  const [backgroundStyle, setBackgroundStyle] = useState('aura')
  const [selectedTypography, setSelectedTypography] = useState(TYPOGRAPHIES[3]) // DM Serif Display
  const [buttonStyle, setButtonStyle] = useState('cartao_nobre')
  const [buttonAnimation, setButtonAnimation] = useState('none')
  const [customColors, setCustomColors] = useState({
    bg: '#0f172a',
    card: '#1e293b',
    button: '#38bdf8',
    buttonText: '#0f172a',
    text: '#ffffff',
    accent: '#38bdf8'
  })
  const [photoLayout, setPhotoLayout] = useState('foto_inteira')
  const [demoGender, setDemoGender] = useState<'mulher' | 'homem'>('mulher')
  const [slug, setSlug] = useState('tusujb')
  const [rating, setRating] = useState('5.0')
  const [reviewsCount, setReviewsCount] = useState('0')
  const [registrationCode, setRegistrationCode] = useState('CRO-PE 22.675')
  const [monogram, setMonogram] = useState('AF')
  const [userEmail, setUserEmail] = useState('leoaraujobh@gmail.com')
  const [userPhone, setUserPhone] = useState('')

  // Estratégia Híbrida de Foto & IA
  const [storyModalOpen, setStoryModalOpen] = useState(false)
  const [isGeneratingStoryPng, setIsGeneratingStoryPng] = useState(false)
  const [customPhotoSrc, setCustomPhotoSrc] = useState<string | null>(null)
  const [photoTreatment, setPhotoTreatment] = useState<'organico' | 'silhueta' | 'original'>('organico')
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false)
  const [aiFillSuccess, setAiFillSuccess] = useState(false)
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop'
  ])

  // Configuração Oficial de Galeria e Portfólio (BioVip Original)
  const [galleryConfig, setGalleryConfig] = useState<StudentGridConfig>({
    enabled: true,
    badge: 'PORTFÓLIO & ESTRUTURA VIP',
    headline: 'Resultados Reais & Portfólio em Destaque',
    subtitle: 'Registros reais do nosso padrão de entrega e procedimentos',
    layout: 'mosaic',
    aspectRatio: 'square',
    enableLightbox: true,
    photos: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop'
    ],
    captions: []
  })

  // Pixel & Tráfego Pago (Diferencial Competitivo Exclusivo)
  const [metaPixelId, setMetaPixelId] = useState('')
  const [tiktokPixelId, setTiktokPixelId] = useState('')
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('')
  const [trackWhatsappLead, setTrackWhatsappLead] = useState(true)
  const [trackPageView, setTrackPageView] = useState(true)
  const [pixelSavedSuccess, setPixelSavedSuccess] = useState(false)

  // Módulos VIP de Alta Conversão (12 Módulos Inteligentes)
  const [announcementData, setAnnouncementData] = useState<{ enabled: boolean; badge: string; text: string }>({
    enabled: true,
    badge: 'AGENDA VIP ABERTA',
    text: 'Últimos horários disponíveis para esta semana.'
  })
  const [urgencyData, setUrgencyData] = useState<{ enabled: boolean; headline: string; subtitle: string; minutes: number }>({
    enabled: true,
    headline: '🔥 CONDIÇÃO ESPECIAL DE HOJE',
    subtitle: 'Garanta sua vaga com atendimento prioritário antes que expire:',
    minutes: 15
  })
  const [servicesCatalogData, setServicesCatalogData] = useState<{
    enabled: boolean
    headline: string
    subtitle?: string
    categories: string[]
    items: any[]
  }>({
    enabled: true,
    headline: 'Procedimentos & Soluções Exclusivas',
    subtitle: 'Protocolos de alto padrão sob medida',
    categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
    items: [
      {
        id: 'srv-1',
        category: 'MAIS PROCURADO',
        name: 'Procedimento de Destaque VIP',
        description: 'Técnica exclusiva com materiais importados de alta pureza e conforto absoluto.',
        price: 'R$ 250',
        duration: '⏱ 1h30',
        badge: 'MAIS PROCURADO',
        featured: true,
        whatsappMessage: 'Olá! Gostaria de agendar o procedimento de destaque.'
      }
    ]
  })
  const [locationData, setLocationData] = useState<{ enabled: boolean; address: string; hours: string; openStatus: string; mapsUrl: string }>({
    enabled: true,
    address: 'Av. Boa Viagem, 2190 - Sala 918 · Boa Viagem - Recife, PE',
    hours: 'Seg a Sex · 08:30 às 19:30 | Sáb · 08:30 às 13:00',
    openStatus: 'Aberto Agora · Agendamento VIP',
    mapsUrl: 'https://maps.google.com'
  })
  const [quizData, setQuizData] = useState<{
    enabled: boolean
    buttonLabel: string
    headline: string
    subtitle: string
    questions: Array<{ id: string; question: string; options: string[] }>
  }>({
    enabled: true,
    buttonLabel: '✨ Descobrir Procedimento Ideal (Triagem VIP)',
    headline: 'Atendimento Personalizado',
    subtitle: 'Responda 3 perguntas rápidas para agilizar seu atendimento:',
    questions: [
      {
        id: 'q-1',
        question: 'Qual procedimento você mais deseja realizar?',
        options: ['Tratamento Principal', 'Manutenção Periódica', 'Avaliação Inicial']
      },
      {
        id: 'q-2',
        question: 'Qual o melhor período para seu atendimento?',
        options: ['Manhã (08h às 12h)', 'Tarde (13h às 18h)', 'Sábado']
      }
    ]
  })

  // Módulos VIP Expandidos (Métricas, Passos, Depoimentos, Sobre Mim, FAQ)
  const [metricsData, setMetricsData] = useState<Array<{ value: string; label: string }>>([
    { value: '+1.000', label: 'CLIENTES ATENDIDOS' },
    { value: '8 ANOS', label: 'DE EXPERIÊNCIA' },
    { value: '5.0★', label: 'AVALIAÇÃO NO GOOGLE' }
  ])
  const [howItWorksData, setHowItWorksData] = useState<Array<{ number: string; title: string; description: string }>>([
    { number: '01', title: 'Primeiro Contato & Triagem', description: 'Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade.' },
    { number: '02', title: 'Avaliação Estratégica', description: 'Diagnóstico detalhado do seu objetivo com plano de ação sob medida.' },
    { number: '03', title: 'Execução & Acompanhamento', description: 'Atendimento de alta excelência e suporte contínuo em todas as etapas.' }
  ])
  const [testimonialsData, setTestimonialsData] = useState<Array<{ clientName: string; city: string; text: string; rating: number }>>([
    { clientName: 'Juliana Mendes', city: 'São Paulo - SP', text: 'Atendimento impecável! O ambiente é lindo, super higienizado e o resultado superou todas as expectativas.', rating: 5 },
    { clientName: 'Carlos Eduardo Silveira', city: 'Belo Horizonte - MG', text: 'Profissionalismo de altíssimo nível. Pontualidade britânica e muita atenção a cada detalhe.', rating: 5 }
  ])
  const [aboutMeData, setAboutMeData] = useState<{ enabled: boolean; headline: string; paragraph: string; closingPhrase: string }>({
    enabled: true,
    headline: 'Sobre Nosso Atendimento',
    paragraph: 'Com vasta trajetória no segmento de alto padrão, nosso propósito é entregar resultados de autoridade com ética, pontualidade e sofisticação em cada atendimento.',
    closingPhrase: 'Excelência e cuidado em cada detalhe.'
  })
  const [faqData, setFaqData] = useState<Array<{ question: string; answer: string }>>([
    { question: 'Como funciona o agendamento de horários?', answer: 'Basta escolher o procedimento no catálogo ou clicar no botão de WhatsApp para falar diretamente com nossa equipe executiva.' },
    { question: 'Onde o espaço está localizado?', answer: 'Estamos localizados em ponto nobre, com estacionamento privativo e ambiente climatizado.' },
    { question: 'Quais são as formas de pagamento aceitas?', answer: 'Aceitamos Pix com confirmação imediata e cartões de crédito em até 12 parcelas.' }
  ])

  // Gateways Conectados na aba VENDAS
  const [connectedGateways, setConnectedGateways] = useState<Record<string, boolean>>({
    mercadopago: false,
    asaas: false,
    pagbank: false,
    infinitepay: false
  })

  // Botões de Alto Padrão do Bio Site (Padrão Dra. Ana Freire)
  const [buttons, setButtons] = useState<Array<{
    id: string
    label: string
    subtitle: string
    icon: string
    url: string
    isHighlighted?: boolean
    highlightBadge?: string
  }>>([
    {
      id: 'btn-1',
      label: 'AGENDAMENTO',
      subtitle: 'Escolha o melhor horário para sua consulta.',
      icon: 'calendar',
      url: 'https://wa.me/5581987654321',
      isHighlighted: true,
      highlightBadge: '⭐ MAIS ESCOLHIDO'
    },
    {
      id: 'btn-2',
      label: 'LOCALIZAÇÃO',
      subtitle: 'Veja a rota até o consultório / Trade Center',
      icon: 'map',
      url: 'https://maps.google.com'
    },
    {
      id: 'btn-3',
      label: 'CASOS CLÍNICOS',
      subtitle: 'Sorrisos transformados: veja os resultados reais.',
      icon: 'sparkles',
      url: 'https://wa.me/5581987654321'
    }
  ])

  // 3 Páginas Adicionais do Plano Pro
  const [additionalPages, setAdditionalPages] = useState<AdditionalPage[]>([])

  // Modo Administrador Master (Permite editar qualquer Bio Site)
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false)
  const [allAvailableBiosites, setAllAvailableBiosites] = useState<{ slug: string; name: string; type: 'modelo' | 'cliente' }[]>([])

  // Função para carregar qualquer Bio Site no editor visual
  const loadBioSiteData = (targetSlug: string) => {
    setSlug(targetSlug)

    // 1. Verificar se já existe versão editada salva no localStorage
    const savedSiteRaw = localStorage.getItem('biovip_site_' + targetSlug)
    if (savedSiteRaw) {
      try {
        const parsedRaw = JSON.parse(savedSiteRaw)
        const parsed = healMojibake(parsedRaw)
        try {
          localStorage.setItem('biovip_site_' + targetSlug, JSON.stringify(parsed))
        } catch {}

        if (parsed.name) {
          setBrandName(parsed.name)
          setBusinessTitle(parsed.name)
        }
        if (parsed.role || parsed.category) setNiche(parsed.role || parsed.category)
        if (parsed.description || parsed.tagline) setTagline(parsed.description || parsed.tagline)
        if (parsed.registrationCode) setRegistrationCode(parsed.registrationCode)
        if (parsed.monogram) setMonogram(parsed.monogram)
        if (parsed.photo) setCustomPhotoSrc(parsed.photo)
        if (parsed.paletteId === 'minha_paleta' && parsed.customPalette) {
          const basePal = PALETTES.find(p => p.id === 'minha_paleta') || PALETTES[0]
          setSelectedPalette({ ...basePal, ...parsed.customPalette })
        } else if (parsed.paletteId) {
          const pal = PALETTES.find(p => p.id === parsed.paletteId)
          if (pal) setSelectedPalette(pal)
        }
        if (parsed.typographyId) {
          const typo = TYPOGRAPHIES.find(t => t.id === parsed.typographyId)
          if (typo) setSelectedTypography(typo)
        }
        if (parsed.buttonStyle) setButtonStyle(parsed.buttonStyle)
        if (parsed.buttonAnimation) setButtonAnimation(parsed.buttonAnimation)
        if (parsed.buttons && parsed.buttons.length > 0) setButtons(parsed.buttons)
        if (parsed.whatsapp) setUserPhone(parsed.whatsapp)
        if (parsed.announcement) setAnnouncementData(parsed.announcement)
        if (parsed.urgency) setUrgencyData(parsed.urgency)
        if (parsed.servicesCatalog) setServicesCatalogData(parsed.servicesCatalog)
        if (parsed.locationInfo) setLocationData(parsed.locationInfo)
        if (parsed.qualifierQuiz) setQuizData(parsed.qualifierQuiz)
        if (parsed.metricsList) setMetricsData(parsed.metricsList)
        if (parsed.howItWorksSteps) setHowItWorksData(parsed.howItWorksSteps)
        if (parsed.testimonialsList) setTestimonialsData(parsed.testimonialsList)
        if (parsed.aboutMeSection) setAboutMeData(parsed.aboutMeSection)
        if (parsed.faqList) setFaqData(parsed.faqList)
        const gConfig = parsed.galleryConfig || parsed.pixels?.galleryConfig
        const gPhotos = parsed.galleryPhotosList || parsed.pixels?.galleryPhotosList || gConfig?.photos
        if (gConfig) {
          setGalleryConfig(gConfig)
          if (gConfig.photos && Array.isArray(gConfig.photos)) {
            setGalleryPhotos(gConfig.photos)
          } else if (gPhotos && Array.isArray(gPhotos)) {
            setGalleryPhotos(gPhotos)
            setGalleryConfig((prev: any) => ({ ...prev, photos: gPhotos }))
          }
        } else if (gPhotos && Array.isArray(gPhotos)) {
          setGalleryPhotos(gPhotos)
          setGalleryConfig((prev: any) => ({ ...prev, photos: gPhotos }))
        }
        if (parsed.subpages && parsed.subpages.length > 0) {
          setAdditionalPages(parsed.subpages.map((sp: any, idx: number) => ({
            id: `page-${idx + 1}`,
            templateId: sp.previewType || 'services',
            title: sp.title,
            slug: sp.slug,
            createdAt: '2026-03-01',
            views: 140,
            status: 'ativa'
          })))
        }
        return
      } catch (e) {
        console.error(e)
      }
    }

    // 2. Fallback: Procurar nos modelos de portfólio
    let foundProj: Project | undefined
    const savedProjectsRaw = localStorage.getItem('biovip_portfolio_projects')
    if (savedProjectsRaw) {
      try {
        const list: Project[] = JSON.parse(savedProjectsRaw)
        foundProj = list.find(p => p.slug === targetSlug)
      } catch (e) {}
    }
    if (!foundProj) {
      foundProj = defaultProjects.find(p => p.slug === targetSlug)
    }

    if (foundProj) {
      setBrandName(foundProj.name)
      setBusinessTitle(foundProj.name)
      setNiche(foundProj.role || foundProj.category)
      setTagline(foundProj.description)
      setRegistrationCode(foundProj.registrationCode || 'REGISTRO PROFISSIONAL')
      setMonogram(foundProj.monogram || 'BV')
      setCustomPhotoSrc(foundProj.photo || foundProj.image)
      if (foundProj.paletteId) {
        const pal = PALETTES.find(p => p.id === foundProj?.paletteId)
        if (pal) setSelectedPalette(pal)
      }
      if (foundProj.typographyId) {
        const typo = TYPOGRAPHIES.find(t => t.id === foundProj?.typographyId)
        if (typo) setSelectedTypography(typo)
      }
      if (foundProj.buttonStyle) setButtonStyle(foundProj.buttonStyle)
      if (foundProj.buttonAnimation) setButtonAnimation(foundProj.buttonAnimation)
      if (foundProj.buttons && foundProj.buttons.length > 0) {
        setButtons(foundProj.buttons)
      }
      if (foundProj.announcement) setAnnouncementData(foundProj.announcement as any)
      if (foundProj.urgency) setUrgencyData(foundProj.urgency as any)
      if (foundProj.servicesCatalog) setServicesCatalogData(foundProj.servicesCatalog as any)
      if (foundProj.locationInfo) setLocationData(foundProj.locationInfo as any)
      if (foundProj.qualifierQuiz) setQuizData(foundProj.qualifierQuiz as any)
      if (foundProj.metricsList) setMetricsData(foundProj.metricsList as any)
      if (foundProj.howItWorksSteps) setHowItWorksData(foundProj.howItWorksSteps as any)
      if (foundProj.testimonialsList) setTestimonialsData(foundProj.testimonialsList as any)
      if (foundProj.aboutMeSection) setAboutMeData(foundProj.aboutMeSection as any)
      if (foundProj.faqList) setFaqData(foundProj.faqList as any)
      if (foundProj.galleryConfig) {
        setGalleryConfig(foundProj.galleryConfig)
        if (foundProj.galleryConfig.photos && Array.isArray(foundProj.galleryConfig.photos)) {
          setGalleryPhotos(foundProj.galleryConfig.photos)
        }
      } else if ((foundProj as any).galleryPhotosList && Array.isArray((foundProj as any).galleryPhotosList)) {
        setGalleryPhotos((foundProj as any).galleryPhotosList)
        setGalleryConfig(prev => ({ ...prev, photos: (foundProj as any).galleryPhotosList }))
      }
      if (foundProj.subpages && foundProj.subpages.length > 0) {
        setAdditionalPages(foundProj.subpages.map((sp, idx) => ({
          id: `page-${idx + 1}`,
          templateId: sp.previewType || 'services',
          title: sp.title,
          slug: sp.slug,
          createdAt: '2026-03-01',
          views: 180,
          status: 'ativa'
        })))
      }
      return
    }

    // 3. Fallback: Procurar nas assinaturas de clientes
    const storedSubs = localStorage.getItem('biovip_subscriptions')
    if (storedSubs) {
      try {
        const subs: Subscription[] = JSON.parse(storedSubs)
        const foundSub = subs.find(s => s.slug === targetSlug)
        if (foundSub) {
          setBrandName(foundSub.clientName)
          setBusinessTitle(foundSub.businessName)
          setNiche(foundSub.niche)
          setUserPhone(foundSub.whatsapp)
          setUserEmail(foundSub.email)
        }
      } catch (e) {}
    }
  }

  // Carregar dados salvos no localStorage
  // eslint-disable-next-line react-hooks/rules-of-hooks -- early returns dentro do useEffect são válidos (não são Hooks condicionais)
  useEffect(() => {
    try {
      // Coletar lista de todos os Bio Sites disponíveis no sistema (para switcher do admin)
      const sites: { slug: string; name: string; type: 'modelo' | 'cliente' }[] = []
      const savedProjectsRaw = localStorage.getItem('biovip_portfolio_projects')
      const pList: Project[] = savedProjectsRaw ? JSON.parse(savedProjectsRaw) : defaultProjects
      pList.forEach(p => {
        sites.push({ slug: p.slug, name: `${p.name} · ${p.category}`, type: 'modelo' })
      })

      const storedSubs = localStorage.getItem('biovip_subscriptions')
      if (storedSubs) {
        try {
          const subs: Subscription[] = JSON.parse(storedSubs)
          subs.forEach(s => {
            if (!sites.some(x => x.slug === s.slug)) {
              sites.push({ slug: s.slug, name: `${s.clientName} (${s.businessName})`, type: 'cliente' })
            }
          })
        } catch (e) {}
      }
      setAllAvailableBiosites(sites)

      // 1. Identificar se é Administrador Master autenticado exclusivamente com PIN no /admin
      const isAdminAuth = typeof window !== 'undefined' && (
        sessionStorage.getItem('biovip_admin_auth') === 'true' ||
        sessionStorage.getItem('biovip_admin_sec_session') !== null
      )

      // 2. Identificar conta do cliente conectado
      let loggedClient: { name?: string; email?: string; slug?: string; phone?: string } | null = null
      const rawLogged = typeof window !== 'undefined' ? localStorage.getItem('biovip_logged_client') : null
      if (rawLogged) {
        try {
          loggedClient = JSON.parse(rawLogged)
        } catch (e) {}
      }
      const clientSessionEmail = typeof window !== 'undefined' ? sessionStorage.getItem('biovip_client_session') : null

      // Parâmetros na URL: ?edit=<slug> ou ?slug=<slug> ou ?novo=true
      const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
      const editSlug = urlParams?.get('edit') || urlParams?.get('slug')
      const isNovo = urlParams?.get('novo') === 'true'

      let parsedSubs: Subscription[] = []
      if (storedSubs) {
        try {
          parsedSubs = JSON.parse(storedSubs)
        } catch (e) {}
      }

      let activeSlug = slug

      if (isAdminAuth) {
        // MODO ADMINISTRADOR AUTENTICADO: acesso completo liberado pelo /admin
        setIsAdminMode(true)
        if (editSlug) {
          activeSlug = editSlug
          setCurrentView('editar_pagina')
        }
      } else {
        // =========================================================
        // MODO CLIENTE: SEGURANÇA ESTRITA E ISOLAMENTO DE DADOS
        // =========================================================
        setIsAdminMode(false)

        // 1. Verificar se existe uma sessão válida de cliente autenticado
        if (!clientSessionEmail && !loggedClient) {
          console.warn('[SEGURANÇA] Tentativa de acesso não autenticado ao painel /conta. Redirecionando para login.')
          window.location.replace('/entrar?error=unauthorized')
          return
        }

        const cleanSessionEmail = (clientSessionEmail || loggedClient?.email || '').trim().toLowerCase()

        // 2. Localizar a conta do cliente nas fontes de dados cadastradas
        let storedUsersList: any[] = []
        const rawUsers = typeof window !== 'undefined' ? localStorage.getItem('biovip_users') : null
        if (rawUsers) {
          try {
            storedUsersList = JSON.parse(rawUsers)
          } catch (e) {}
        }

        const matchedUser = storedUsersList.find(
          (u: any) =>
            (u.email && u.email.toLowerCase() === cleanSessionEmail) ||
            (u.phone && u.phone.replace(/\D/g, '') === cleanSessionEmail.replace(/\D/g, '')) ||
            (u.slug && u.slug.toLowerCase() === cleanSessionEmail)
        )

        const matchedSub = parsedSubs.find(
          (s: any) =>
            (s.email && s.email.toLowerCase() === cleanSessionEmail) ||
            (s.whatsapp && s.whatsapp.replace(/\D/g, '') === cleanSessionEmail.replace(/\D/g, '')) ||
            (s.slug && s.slug.toLowerCase() === cleanSessionEmail)
        )

        const authorizedSlug = loggedClient?.slug || matchedUser?.slug || matchedSub?.slug

        // 3. Se a sessão não corresponder a nenhum Bio Site existente, revogar sessão
        if (!authorizedSlug) {
          console.warn(`[SEGURANÇA] Sessão inválida para o e-mail ${cleanSessionEmail}. Redirecionando para /entrar.`)
          sessionStorage.removeItem('biovip_client_session')
          localStorage.removeItem('biovip_logged_client')
          window.location.replace('/entrar?error=invalid_session')
          return
        }

        // 4. ANTI-IDOR / ISOLAMENTO MULTI-TENANT: Travar estritamente no Bio Site desta conta
        // Se o cliente tentar passar ?edit=outro-slug na URL, impedimos e forçamos o seu slug legítimo
        if (editSlug && editSlug !== authorizedSlug) {
          console.warn(`[SEGURANÇA] Tentativa de adulteração de slug (${editSlug}) bloqueada para ${cleanSessionEmail}. Forçando ${authorizedSlug}.`)
          if (typeof window !== 'undefined' && window.history.replaceState) {
            window.history.replaceState(null, '', `/conta?edit=${authorizedSlug}`)
          }
        }

        activeSlug = authorizedSlug

        // REGRA DE OURO: Clientes operam exclusivamente na página do cliente ('dashboard').
        // A página de edição do estúdio (3 colunas) é exclusiva do ADM.
        setCurrentView('dashboard')

        if (urlParams?.get('tab') === 'galeria' || urlParams?.get('secao') === 'fotos') {
          setActiveSidebarTab('galeria')
        } else if (urlParams?.get('tab') === 'servicos' || urlParams?.get('secao') === 'servicos') {
          setActiveSidebarTab('servicos')
        }
      }

      setSlug(activeSlug)
      loadBioSiteData(activeSlug)

      // Atualizar dados cadastrais da conta
      const matchedClientSub = parsedSubs.find((s: any) => s.slug === activeSlug)
      if (matchedClientSub) {
        if (matchedClientSub.clientName) setBrandName(matchedClientSub.clientName)
        if (matchedClientSub.businessName) setBusinessTitle(matchedClientSub.businessName)
        if (matchedClientSub.email) setUserEmail(matchedClientSub.email)
        if (matchedClientSub.whatsapp) setUserPhone(matchedClientSub.whatsapp)
        if (matchedClientSub.niche) setNiche(matchedClientSub.niche)
      } else if (loggedClient) {
        if (loggedClient.name) setBrandName(loggedClient.name)
        if (loggedClient.email) setUserEmail(loggedClient.email)
        if (loggedClient.phone) setUserPhone(loggedClient.phone)
      }

      // Carregar configurações visuais salvas do BioVip (Paleta, Tipografia, Botões, Foto, etc.)
      const savedSiteRaw = localStorage.getItem('biovip_site_' + activeSlug) || localStorage.getItem('biovip_user_site')
      if (savedSiteRaw) {
        try {
          const parsed = JSON.parse(savedSiteRaw)
          if (parsed.paletteId) {
            const pal = PALETTES.find(p => p.id === parsed.paletteId)
            if (pal) setSelectedPalette(pal)
          }
          if (parsed.typographyId) {
            const typo = TYPOGRAPHIES.find(t => t.id === parsed.typographyId)
            if (typo) setSelectedTypography(typo)
          }
          if (parsed.buttonStyle) setButtonStyle(parsed.buttonStyle)
          if (parsed.buttonAnimation) setButtonAnimation(parsed.buttonAnimation)
          if (parsed.photo) setCustomPhotoSrc(parsed.photo)
          if (parsed.registrationCode) setRegistrationCode(parsed.registrationCode)
          if (parsed.monogram) setMonogram(parsed.monogram)
          if (parsed.buttons && parsed.buttons.length > 0) setButtons(parsed.buttons)
          if (parsed.name) setBusinessTitle(parsed.name)
          if (parsed.role) setNiche(parsed.role)
          if (parsed.whatsapp) setUserPhone(parsed.whatsapp)
        } catch (e) {}
      }

      const storedPages = localStorage.getItem('biovip_site_' + activeSlug + '_pages') || localStorage.getItem('biovip_client_pages')
      if (storedPages) {
        try {
          setAdditionalPages(JSON.parse(storedPages))
        } catch (e) {}
      }

      const storedPixels = localStorage.getItem('biovip_pixels')
      if (storedPixels) {
        const p = JSON.parse(storedPixels)
        if (p.metaPixelId) setMetaPixelId(p.metaPixelId)
        if (p.tiktokPixelId) setTiktokPixelId(p.tiktokPixelId)
        if (p.googleAnalyticsId) setGoogleAnalyticsId(p.googleAnalyticsId)
        if (p.trackWhatsappLead !== undefined) setTrackWhatsappLead(p.trackWhatsappLead)
        if (p.trackPageView !== undefined) setTrackPageView(p.trackPageView)
      }

      // 4. Carregar status da assinatura, verificação de pendência e prazo de 48 horas
      if (storedSubs) {
        try {
          const subs = JSON.parse(storedSubs)
          const matchedSub = subs.find((s: any) => s.slug === activeSlug)
          if (matchedSub) {
            const currentSubStatus = matchedSub.status || matchedSub.paymentStatus || 'ativa'
            setPaymentStatus(currentSubStatus)
            if (matchedSub.deadline48h) {
              setDeadline48h(matchedSub.deadline48h)
              const diffMs = new Date(matchedSub.deadline48h).getTime() - Date.now()
              const hoursLeft = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)))
              setRemainingHours(hoursLeft)
            }
            if (isNovo || currentSubStatus === 'pendente') {
              setShowPendingPaymentModal(true)
            }
          } else if (isNovo) {
            setPaymentStatus('pendente')
            setShowPendingPaymentModal(true)
          }
        } catch (e) {}
      } else if (isNovo) {
        setPaymentStatus('pendente')
        setShowPendingPaymentModal(true)
      }
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ação de Confirmação e Regularização de Pagamento
  const handleConfirmPayment = () => {
    setIsProcessingPayment(true)
    setTimeout(() => {
      setPaymentStatus('ativa')
      try {
        const storedSubs = localStorage.getItem('biovip_subscriptions')
        if (storedSubs) {
          const subs = JSON.parse(storedSubs)
          const updatedSubs = subs.map((s: any) => {
            if (s.slug === slug) {
              return {
                ...s,
                status: 'ativa',
                paymentStatus: 'ativa',
                notes: 'Pagamento confirmado e assinatura regularizada.'
              }
            }
            return s
          })
          localStorage.setItem('biovip_subscriptions', JSON.stringify(updatedSubs))
        }
      } catch (e) {}
      setIsProcessingPayment(false)
      setPaymentSuccessFeedback(true)
      setShowPendingPaymentModal(false)
      setTimeout(() => setPaymentSuccessFeedback(false), 5000)
    }, 1200)
  }

  const fullUrl = `biovip.com.br/${slug}`

  // Carregar lista de leads em tempo real
  useEffect(() => {
    let isMounted = true
    async function fetchLeads() {
      setLoadingLeads(true)
      try {
        const data = await getLeads(slug)
        if (isMounted) setLeadsList(data || [])
      } catch (err) {
        console.error('Erro ao buscar leads:', err)
      } finally {
        if (isMounted) setLoadingLeads(false)
      }
    }
    fetchLeads()
    return () => { isMounted = false }
  }, [slug, activeSidebarTab])

  const handleExportLeadsCsv = () => {
    if (leadsList.length === 0) return
    const headers = ['Data', 'BioSite', 'Acao', 'Nome', 'WhatsApp', 'Detalhes']
    const rows = leadsList.map(l => [
      l.created_at ? new Date(l.created_at).toLocaleString('pt-BR') : '',
      l.slug,
      l.action_type,
      l.client_name || 'Visitante',
      l.whatsapp || '',
      JSON.stringify(l.details || {}).replace(/"/g, '""')
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `leads-${slug}-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Salvar alterações de qualquer Bio Site
  const handleSavePage = () => {
    let existingData: any = {}
    try {
      const existingRaw = localStorage.getItem('biovip_site_' + slug)
      if (existingRaw) existingData = JSON.parse(existingRaw)
    } catch (e) {}

    const siteData = healMojibake({
      ...existingData,
      slug,
      name: businessTitle || brandName,
      role: niche,
      category: niche,
      registrationCode,
      monogram,
      photo: customPhotoSrc || (demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem),
      paletteId: selectedPalette.id,
      customPalette: selectedPalette.id === 'minha_paleta' ? selectedPalette : undefined,
      typographyId: selectedTypography.id,
      buttonStyle,
      buttonAnimation,
      buttons,
      whatsapp: userPhone || '5531991390202',
      announcement: announcementData,
      urgency: urgencyData,
      servicesCatalog: servicesCatalogData,
      locationInfo: locationData,
      qualifierQuiz: quizData,
      metricsList: metricsData,
      howItWorksSteps: howItWorksData,
      testimonialsList: testimonialsData,
      aboutMeSection: aboutMeData,
      faqList: faqData,
      galleryConfig,
      galleryPhotosList: galleryConfig.photos || galleryPhotos,
      subpages: additionalPages.map(ap => ({
        slug: ap.slug,
        title: ap.title,
        description: `Página ${ap.title} de ${businessTitle || brandName}`,
        previewType: (ap.templateId as any) || 'services'
      }))
    })

    try {
      // 1. Salva chave individual do biosite para ser lida por /[slug]
      localStorage.setItem('biovip_site_' + slug, JSON.stringify(siteData))
      localStorage.setItem('biovip_site_' + slug + '_pages', JSON.stringify(additionalPages))

      // 2. Se não estiver no modo admin (ou se for o site do próprio usuário)
      if (!isAdminMode) {
        localStorage.setItem('biovip_user_site', JSON.stringify(siteData))
        localStorage.setItem('biovip_client_pages', JSON.stringify(additionalPages))
      }

      // 3. Se for modelo de portfólio, sincroniza no biovip_portfolio_projects
      const storedProjects = localStorage.getItem('biovip_portfolio_projects')
      if (storedProjects) {
        try {
          const projectsList: Project[] = JSON.parse(storedProjects)
          const pIdx = projectsList.findIndex(p => p.slug === slug)
          if (pIdx !== -1) {
            projectsList[pIdx] = {
              ...projectsList[pIdx],
              name: siteData.name,
              role: siteData.role,
              category: siteData.category,
              registrationCode: siteData.registrationCode,
              monogram: siteData.monogram,
              photo: siteData.photo,
              image: siteData.photo,
              paletteId: siteData.paletteId,
              typographyId: siteData.typographyId,
              buttonStyle: siteData.buttonStyle,
              buttonAnimation: siteData.buttonAnimation,
              buttons: siteData.buttons,
              subpages: siteData.subpages
            }
            localStorage.setItem('biovip_portfolio_projects', JSON.stringify(projectsList))
          }
        } catch (e) {}
      }

      // 4. Se for assinatura de cliente, sincroniza no biovip_subscriptions
      const storedSubs = localStorage.getItem('biovip_subscriptions')
      if (storedSubs) {
        try {
          const subsList: Subscription[] = JSON.parse(storedSubs)
          const sIdx = subsList.findIndex(s => s.slug === slug)
          if (sIdx !== -1) {
            subsList[sIdx] = {
              ...subsList[sIdx],
              clientName: brandName,
              businessName: businessTitle,
              niche: niche,
              whatsapp: userPhone || subsList[sIdx].whatsapp,
              email: userEmail || subsList[sIdx].email
            }
            localStorage.setItem('biovip_subscriptions', JSON.stringify(subsList))
          }
        } catch (e) {}
      }
      // 5. Sincronização em Nuvem (Supabase se configurado)
      saveBioSite(slug, siteData).then((res) => {
        if (res.cloudSynced) {
          console.log(`[BioVip Nuvem] Site /${slug} sincronizado com sucesso no Supabase!`)
        }
      }).catch(err => console.warn('[BioVip Nuvem] Aviso ao sincronizar com nuvem:', err))
    } catch (e) {
      console.error(e)
    }

    setHasUnsavedChanges(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3500)
  }

  // Salvar Pixels de Rastreamento (Meta Ads, TikTok Ads, Google)
  const handleSavePixels = () => {
    const config = {
      metaPixelId,
      tiktokPixelId,
      googleAnalyticsId,
      trackWhatsappLead,
      trackPageView
    }
    localStorage.setItem('biovip_pixels', JSON.stringify(config))
    setPixelSavedSuccess(true)
    setTimeout(() => setPixelSavedSuccess(false), 3000)
  }

  // Preenchimento Automático com IA baseado no nicho
  const handleAiAutoFill = () => {
    const aiData = generateNicheContent(niche)
    setBusinessTitle(aiData.brandName)
    setTagline(aiData.tagline)
    const pal = PALETTES.find(p => p.id === aiData.paletteId) || PALETTES[0]
    setSelectedPalette(pal)
    const typo = TYPOGRAPHIES.find(t => t.id === aiData.typographyId) || TYPOGRAPHIES[0]
    setSelectedTypography(typo)
    setBackgroundStyle(aiData.backgroundStyle)
    setButtonStyle('cartao_nobre')
    setRating(aiData.rating)
    setReviewsCount(aiData.reviewsCount)
    setButtons(aiData.buttons.map(b => ({
      id: b.id,
      label: b.label.toUpperCase(),
      subtitle: b.label.toLowerCase().includes('agend') ? 'Escolha o melhor horário para sua consulta.' : b.label.toLowerCase().includes('catálogo') || b.label.toLowerCase().includes('proced') ? 'Conheça nossos protocolos e valores exclusivos.' : 'Veja a rota até o consultório / espaço',
      icon: b.icon || 'calendar',
      url: b.targetType === 'whatsapp' ? `https://wa.me/${b.value}` : b.value
    })))
    if (aiData.announcement) setAnnouncementData(aiData.announcement as any)
    if (aiData.urgency) setUrgencyData(aiData.urgency as any)
    if (aiData.servicesCatalog) setServicesCatalogData(aiData.servicesCatalog as any)
    if (aiData.locationInfo) setLocationData(aiData.locationInfo as any)
    if (aiData.qualifierQuiz) setQuizData(aiData.qualifierQuiz as any)
    if (aiData.metricsList) setMetricsData(aiData.metricsList as any)
    if (aiData.howItWorksSteps) setHowItWorksData(aiData.howItWorksSteps as any)
    if (aiData.faqList) setFaqData(aiData.faqList as any)
    setHasUnsavedChanges(true)
    setAiFillSuccess(true)
    setTimeout(() => setAiFillSuccess(false), 3000)
  }

  const handleAddButton = () => {
    if (buttons.length >= 20) {
      alert('Você atingiu o limite de 20 botões.')
      return
    }
    const newBtn = {
      id: `btn-${Date.now()}`,
      label: 'NOVO BOTÃO VIP',
      subtitle: 'Toque para abrir atendimento prioritário.',
      icon: 'sparkles',
      url: 'https://wa.me/5531999999999'
    }
    setButtons([...buttons, newBtn])
    setHasUnsavedChanges(true)
  }

  const handleRemoveButton = (btnId: string) => {
    if (buttons.length <= 1) {
      alert('Seu Bio Site precisa ter pelo menos um botão.')
      return
    }
    setButtons(buttons.filter(b => b.id !== btnId))
    setHasUnsavedChanges(true)
  }

  // Upload e Tratamento Híbrido da Foto (Canvas Fade / Silhueta)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsProcessingPhoto(true)
    try {
      const dataUrl = await readImageAsDataUrl(file)
      if (photoTreatment === 'organico') {
        const faded = await applyCanvasOrganicFade(dataUrl, selectedPalette.bg)
        setCustomPhotoSrc(faded)
      } else if (photoTreatment === 'silhueta') {
        const silhouette = await applySilhouetteCutout(dataUrl)
        setCustomPhotoSrc(silhouette)
      } else {
        setCustomPhotoSrc(dataUrl)
      }
      setHasUnsavedChanges(true)
    } catch (err) {
      console.error(err)
    } finally {
      setIsProcessingPhoto(false)
    }
  }

  // Alternar Modo de Tratamento da Foto
  const handleApplyTreatment = async (type: 'organico' | 'silhueta' | 'original') => {
    setPhotoTreatment(type)
    const currentBase = customPhotoSrc || (demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)
    setIsProcessingPhoto(true)
    try {
      if (type === 'organico') {
        const faded = await applyCanvasOrganicFade(currentBase, selectedPalette.bg)
        setCustomPhotoSrc(faded)
      } else if (type === 'silhueta') {
        const silhouette = await applySilhouetteCutout(currentBase)
        setCustomPhotoSrc(silhouette)
      }
      setHasUnsavedChanges(true)
    } catch (err) {
      console.error(err)
    } finally {
      setIsProcessingPhoto(false)
    }
  }

  // Copiar link público
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${fullUrl}`)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  // Adicionar Página Adicional
  const handleSelectTemplate = (tpl: PageTemplate) => {
    if (additionalPages.length >= 3) {
      alert('Você atingiu o limite de 3 páginas adicionais inclusas no seu Plano Pro. Para criar páginas ilimitadas, faça upgrade para o Plano Agência.')
      return
    }

    const newPage: AdditionalPage = {
      id: `page-${Date.now().toString().slice(-4)}`,
      templateId: tpl.id,
      title: tpl.title,
      slug: `${tpl.defaultSlug}`,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      views: 0,
      status: 'ativa'
    }

    const updated = [...additionalPages, newPage]
    setAdditionalPages(updated)
    try {
      localStorage.setItem('biovip_client_pages', JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }

    setCurrentView('dashboard')
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  // Excluir Página Adicional
  const handleDeletePage = (pageId: string) => {
    if (confirm('Tem certeza que deseja remover esta página adicional?')) {
      const updated = additionalPages.filter(p => p.id !== pageId)
      setAdditionalPages(updated)
      try {
        localStorage.setItem('biovip_client_pages', JSON.stringify(updated))
      } catch (e) {
        console.error(e)
      }
    }
  }

  // Alternar conexão de gateway
  const toggleGateway = (gatewayId: string) => {
    setConnectedGateways(prev => ({
      ...prev,
      [gatewayId]: !prev[gatewayId]
    }))
  }

  // Filtrar templates da categoria
  const activeTabObj = CATEGORY_TABS.find(t => t.id === selectedCategoryTab) || CATEGORY_TABS[0]
  const filteredTemplates = PAGE_TEMPLATES.filter(tpl => {
    if (selectedCategoryTab === 'para_voce') return tpl.categories.includes('para_voce')
    if (selectedCategoryTab === 'fotos') return tpl.categories.includes('fotos')
    if (selectedCategoryTab === 'videos') return tpl.categories.includes('videos')
    if (selectedCategoryTab === 'cardapio') return tpl.categories.includes('cardapio')
    if (selectedCategoryTab === 'catalogo') return tpl.categories.includes('catalogo')
    if (selectedCategoryTab === 'vender') return tpl.categories.includes('vender')
    if (selectedCategoryTab === 'sobre') return tpl.categories.includes('sobre')
    return true
  })

  // =========================================================
  // ARQUITETURA MODERNA DE 3 COLUNAS: EDITOR DO BIOSITE (EXCLUSIVO DO ADM)
  // =========================================================
  if (currentView === 'editar_pagina') {
    // SEGURANÇA E REGRA DE NEGÓCIO: Esta página de edição é 100% exclusiva do ADM
    if (!isAdminMode) {
      if (typeof window !== 'undefined') {
        window.location.replace('/conta')
      }
      return null
    }

    return (
      <BioSiteEditor3Col
        slug={slug}
        brandName={brandName}
        setBrandName={setBrandName}
        businessTitle={businessTitle}
        setBusinessTitle={setBusinessTitle}
        niche={niche}
        setNiche={setNiche}
        tagline={tagline}
        setTagline={setTagline}
        registrationCode={registrationCode}
        setRegistrationCode={setRegistrationCode}
        monogram={monogram}
        setMonogram={setMonogram}
        customPhotoSrc={customPhotoSrc}
        setCustomPhotoSrc={setCustomPhotoSrc}
        photoTreatment={photoTreatment}
        setPhotoTreatment={setPhotoTreatment}
        demoGender={demoGender}
        setDemoGender={setDemoGender}
        selectedPalette={selectedPalette}
        setSelectedPalette={setSelectedPalette}
        selectedTypography={selectedTypography}
        setSelectedTypography={setSelectedTypography}
        buttonStyle={buttonStyle}
        setButtonStyle={setButtonStyle}
        buttonAnimation={buttonAnimation}
        setButtonAnimation={setButtonAnimation}
        backgroundStyle={backgroundStyle}
        setBackgroundStyle={setBackgroundStyle}
        buttons={buttons}
        setButtons={setButtons}
        additionalPages={additionalPages}
        setAdditionalPages={setAdditionalPages}
        rating={rating}
        setRating={setRating}
        reviewsCount={reviewsCount}
        setReviewsCount={setReviewsCount}
        userPhone={userPhone}
        setUserPhone={setUserPhone}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        announcementData={announcementData}
        setAnnouncementData={setAnnouncementData}
        urgencyData={urgencyData}
        setUrgencyData={setUrgencyData}
        servicesCatalogData={servicesCatalogData}
        setServicesCatalogData={setServicesCatalogData}
        locationData={locationData}
        setLocationData={setLocationData}
        quizData={quizData}
        setQuizData={setQuizData}
        metricsData={metricsData}
        setMetricsData={setMetricsData}
        howItWorksData={howItWorksData}
        setHowItWorksData={setHowItWorksData}
        testimonialsData={testimonialsData}
        setTestimonialsData={setTestimonialsData}
        aboutMeData={aboutMeData}
        setAboutMeData={setAboutMeData}
        faqData={faqData}
        setFaqData={setFaqData}
        galleryPhotos={galleryConfig.photos || galleryPhotos}
        setGalleryPhotos={(v: string[]) => {
          setGalleryPhotos(v)
          setGalleryConfig(prev => ({ ...prev, photos: v }))
        }}
        galleryConfig={galleryConfig}
        setGalleryConfig={setGalleryConfig}
        metaPixelId={metaPixelId}
        setMetaPixelId={setMetaPixelId}
        tiktokPixelId={tiktokPixelId}
        setTiktokPixelId={setTiktokPixelId}
        googleAnalyticsId={googleAnalyticsId}
        setGoogleAnalyticsId={setGoogleAnalyticsId}
        trackWhatsappLead={trackWhatsappLead}
        setTrackWhatsappLead={setTrackWhatsappLead}
        trackPageView={trackPageView}
        setTrackPageView={setTrackPageView}
        paymentStatus={paymentStatus}
        deadline48h={deadline48h}
        remainingHours={remainingHours}
        handleConfirmPayment={handleConfirmPayment}
        handleSavePage={handleSavePage}
        savedSuccess={savedSuccess}
        setSavedSuccess={setSavedSuccess}
        onBackToDashboard={() => setCurrentView('dashboard')}
        isAdminMode={isAdminMode}
        handleAiAutoFill={handleAiAutoFill}
        aiFillSuccess={aiFillSuccess}
        setHasUnsavedChanges={setHasUnsavedChanges}
        isProcessingPayment={isProcessingPayment}
      />
    )
  }

  // Geração e Download Direto da Arte do Story em PNG HD (1080x1920)
  const handleDownloadStoryPng = async () => {
    setIsGeneratingStoryPng(true)
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1920
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // 1. Fundo com Degradê Cinematográfico
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920)
      bgGrad.addColorStop(0, '#0f1118')
      bgGrad.addColorStop(0.5, '#090a0f')
      bgGrad.addColorStop(1, '#050608')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, 1080, 1920)

      // 2. Aura e Glow Dourado Central
      const auraGrad = ctx.createRadialGradient(540, 780, 50, 540, 780, 480)
      auraGrad.addColorStop(0, 'rgba(251, 191, 36, 0.16)')
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = auraGrad
      ctx.fillRect(0, 300, 1080, 960)

      // 3. Topo do Story: Monograma & Badge
      ctx.fillStyle = '#f59e0b'
      ctx.font = 'italic bold 56px "Playfair Display", Georgia, serif'
      ctx.textAlign = 'left'
      ctx.fillText(monogram || 'VIP', 90, 140)

      // Badge "NO AR NO INSTAGRAM"
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)'
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.roundRect(690, 95, 300, 56, 28)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#34d399'
      ctx.font = 'bold 24px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('● NO AR NO INSTAGRAM', 840, 133)

      // 4. Foto de Estúdio Circular do Profissional
      const photoSrc = customPhotoSrc || (demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = photoSrc

      await new Promise((resolve) => {
        img.onload = resolve
        img.onerror = resolve
      })

      const cx = 540
      const cy = 680
      const r = 240

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      try {
        ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2)
      } catch {
        ctx.fillStyle = '#1e293b'
        ctx.fill()
      }
      ctx.restore()

      // Borda Dourada Externa
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.lineWidth = 14
      ctx.strokeStyle = '#f59e0b'
      ctx.stroke()

      // 5. Nome do Profissional e Nicho
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 64px "Playfair Display", Georgia, serif'
      ctx.textAlign = 'center'
      ctx.fillText(brandName || 'Dra. Ana Freire', 540, 1020)

      ctx.fillStyle = '#fbbf24'
      ctx.font = 'bold 28px monospace'
      ctx.fillText((businessTitle || niche || 'ODONTOLOGIA ESTÉTICA').toUpperCase(), 540, 1080)

      // 6. Selo de Avaliações 5.0
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(310, 1140, 460, 64, 32)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = '#fde68a'
      ctx.font = '26px sans-serif'
      ctx.fillText('★ 5.0 · Avaliações 5 Estrelas no Google', 540, 1182)

      // 7. Figurinha de Link do Instagram (Sticker 3D)
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = 'rgba(0,0,0,0.5)'
      ctx.shadowBlur = 30
      ctx.beginPath()
      ctx.roundRect(140, 1480, 800, 140, 36)
      ctx.fill()

      ctx.shadowColor = 'transparent'
      ctx.fillStyle = '#0f172a'
      ctx.font = 'bold 36px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(`biovip.com.br/${slug}`.toUpperCase(), 540, 1565)

      ctx.fillStyle = '#94a3b8'
      ctx.font = 'bold 24px monospace'
      ctx.fillText('TOQUE NA FIGURINHA PARA AGENDAR', 540, 1680)

      // 8. Disparar Download
      const dataUrl = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `story-biovip-${slug}.png`
      a.click()
    } catch (e) {
      console.error('Erro ao gerar PNG do story:', e)
    } finally {
      setIsGeneratingStoryPng(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-stone-200">
      {/* ========================================================= */}
      {/* BANNER DO MODO ADMINISTRADOR (EDITANDO QUALQUER BIOSITE) */}
      {/* ========================================================= */}
      {isAdminMode && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 px-4 py-2 shadow-md border-b border-amber-600/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded-md bg-stone-950 text-amber-300 font-mono text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-xs">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                MODO ADM
              </span>
              <div className="text-xs font-semibold text-stone-950 flex items-center gap-1.5 flex-wrap">
                <span>Editando Bio Site:</span>
                <code className="bg-stone-950/15 px-2 py-0.5 rounded font-mono font-bold text-stone-950 border border-stone-950/20">
                  /{slug}
                </code>
                <span className="text-stone-900 font-serif font-bold">({businessTitle || brandName})</span>
              </div>
            </div>

            {/* Seletor Rápido de Qualquer Outro Bio Site & Links de Ação */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-stone-950/10 px-2.5 py-1 rounded-lg border border-stone-950/15">
                <Sliders className="w-3 h-3 text-stone-900" />
                <span className="text-[10px] font-mono font-semibold text-stone-900">Trocar Site:</span>
                <select
                  value={slug}
                  onChange={(e) => {
                    const newSlug = e.target.value
                    if (newSlug) {
                      window.history.pushState({}, '', `/conta?edit=${newSlug}`)
                      loadBioSiteData(newSlug)
                    }
                  }}
                  className="bg-stone-900 text-amber-300 font-medium text-xs px-2 py-0.5 rounded border border-stone-700 focus:outline-none cursor-pointer"
                >
                  <optgroup label="Modelos do Portfólio (13 Nichos)">
                    {allAvailableBiosites.filter(s => s.type === 'modelo').map(s => (
                      <option key={s.slug} value={s.slug}>
                        {s.name} (/{s.slug})
                      </option>
                    ))}
                  </optgroup>
                  {allAvailableBiosites.some(s => s.type === 'cliente') && (
                    <optgroup label="Clientes com Assinatura">
                      {allAvailableBiosites.filter(s => s.type === 'cliente').map(s => (
                        <option key={s.slug} value={s.slug}>
                          {s.name} (/{s.slug})
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              <a
                href={`/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-stone-950/15 hover:bg-stone-950/25 text-stone-950 text-xs font-bold flex items-center gap-1 transition"
                title="Abrir página ao vivo em nova aba"
              >
                <ExternalLink className="w-3 h-3" /> Ver ao vivo
              </a>

              <Link
                href="/admin"
                className="px-2.5 py-1 rounded-lg bg-stone-950 text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1 transition shadow-sm"
              >
                <ArrowLeft className="w-3 h-3" /> Painel ADM
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* BARRA SUPERIOR EXCLUSIVA DO ESPAÇO DE TRABALHO BIOVIP */}
      {/* ========================================================= */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Logo & Identificação */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center font-serif font-black text-sm group-hover:bg-amber-500 group-hover:text-black transition">
                B
              </div>
              <span className="font-serif font-bold text-lg text-stone-900 tracking-tight">
                BioVip
              </span>
            </Link>
            <div className="h-4 w-px bg-stone-300 hidden sm:block" />
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-mono font-bold uppercase tracking-wider">
              ÁREA DO CLIENTE
            </span>
            <span className="hidden md:inline-flex text-xs font-mono font-semibold text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
              /{slug}
            </span>
          </div>

          {/* Navegação Rápida entre Visões & Ações */}
          <div className="flex items-center gap-2">
            {isAdminMode && (
              <button
                type="button"
                onClick={() => setCurrentView('editar_pagina')}
                className="px-3 py-1.5 rounded-lg border border-amber-400 bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-mono uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer font-bold shadow-xs"
                title="Acesso Exclusivo do Administrador Master"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Studio ADM (3 Colunas)</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveSidebarTab('servicos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSidebarTab === 'servicos'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'border border-stone-300 hover:border-stone-900 bg-white text-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Serviços & Preços</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSidebarTab('galeria')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSidebarTab === 'galeria'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'border border-stone-300 hover:border-stone-900 bg-white text-stone-800'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-stone-700" />
              <span className="hidden sm:inline">Fotos da Galeria</span>
            </button>

            {/* No Dashboard: Botões de Acesso Direto para Módulos VIP e Pixel */}
            {currentView === 'dashboard' && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveSidebarTab('modulos_vip')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeSidebarTab === 'modulos_vip'
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Módulos VIP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSidebarTab('pixel')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeSidebarTab === 'pixel'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden sm:inline">Pixels</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSidebarTab('pagamento')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeSidebarTab === 'pagamento'
                      ? 'bg-black text-white shadow-xs'
                      : paymentStatus === 'pendente'
                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 animate-pulse'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}
                >
                  <CreditCard className={`w-3.5 h-3.5 ${paymentStatus === 'pendente' ? 'text-amber-700' : 'text-emerald-700'}`} />
                  <span className="hidden sm:inline">Pagamento</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    paymentStatus === 'pendente' ? 'bg-amber-500 text-stone-950' : 'bg-emerald-600 text-white'
                  }`}>
                    {paymentStatus === 'pendente' ? '48H' : 'ATIVO'}
                  </span>
                </button>
              </>
            )}

            <a
              href={`/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition"
              title="Abrir página ao vivo em nova aba"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver no ar</span>
            </a>

            <button
              type="button"
              onClick={() => {
                handleSavePage()
                setSavedSuccess(true)
                setTimeout(() => setSavedSuccess(false), 3500)
              }}
              className="px-3.5 py-1.5 rounded-lg bg-black hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Salvo!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-amber-400" />
                  <span>Salvar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* BANNER STICKY DE AVISO: PAGAMENTO PENDENTE & TOLERÂNCIA DE 48 HORAS */}
      {paymentStatus === 'pendente' && (
        <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-b border-amber-500/40 px-4 py-3 sticky top-12 z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-950 font-medium">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold shrink-0 animate-pulse">
                <Clock className="w-4 h-4" />
              </span>
              <div>
                <strong className="font-bold text-amber-900 uppercase tracking-wide mr-1.5">
                  ⚠️ Pagamento Pendente:
                </strong>
                Seu Bio Site foi criado e se encontra com pagamento pendente. <strong>Se após 48 horas o pagamento não for confirmado, o Bio Site será suspenso.</strong>
                <span className="ml-2 font-mono font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-full border border-amber-400">
                  {remainingHours > 0 ? `${remainingHours}h restantes` : 'Prazo limite'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (currentView === 'dashboard') {
                  setActiveSidebarTab('pagamento')
                } else {
                  setOpenAccordion('pagamento')
                }
              }}
              className="shrink-0 px-4 py-1.5 rounded-full bg-stone-950 hover:bg-stone-800 text-amber-300 hover:text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-400" />
              <span>Regularizar Pagamento →</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. TELA PRINCIPAL DA ÁREA DO CLIENTE (IMAGEM 1) */}
      {/* ========================================================= */}
      {currentView === 'dashboard' && (
        <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          {savedSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fade-in shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Alterações salvas com sucesso! Sua página no ar foi atualizada.
            </div>
          )}

          {/* CABEÇALHO COM SAUDAÇÃO E SAIR */}
          <div className="flex items-start justify-between border-b border-stone-100 pb-8 mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-stone-400 block mb-1">
                SUA ÁREA
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
                Oi, {brandName}.
              </h1>
            </div>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  sessionStorage.removeItem('biovip_client_session')
                  localStorage.removeItem('biovip_logged_client')
                  window.location.href = '/entrar'
                }
              }}
              className="text-xs font-mono uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors pt-2 cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>SAIR</span>
            </button>
          </div>

          {/* GRID COM MENU LATERAL E CONTEÚDO PRINCIPAL (EXATAMENTE COMO NA IMAGEM 1) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* SIDEBAR DE NAVEGAÇÃO ESQUERDA */}
            <aside className="lg:col-span-3 space-y-1.5">
              <button
                type="button"
                onClick={() => setActiveSidebarTab('pagina')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeSidebarTab === 'pagina'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                SUA PÁGINA
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('servicos')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-between ${
                  activeSidebarTab === 'servicos'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  SERVIÇOS & PREÇOS
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-800 font-bold border border-amber-400/30">
                  EDITAR
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('galeria')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-between ${
                  activeSidebarTab === 'galeria'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-stone-600" />
                  FOTOS DA GALERIA
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-800 font-bold border border-amber-400/30">
                  EDITAR
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('vendas')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeSidebarTab === 'vendas'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                VENDAS
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('leads')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-between ${
                  activeSidebarTab === 'leads'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  LEADS & CONTATOS
                </span>
                {leadsList.length > 0 && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {leadsList.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('agenda')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeSidebarTab === 'agenda'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                AGENDA
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('estatisticas')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeSidebarTab === 'estatisticas'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                ESTATÍSTICAS
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('pagamento')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-between ${
                  activeSidebarTab === 'pagamento'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-amber-500" />
                  PAGAMENTO
                </span>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                  paymentStatus === 'pendente'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {paymentStatus === 'pendente' ? 'PENDENTE (48H)' : 'ATIVO'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('planos')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeSidebarTab === 'planos'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                PLANOS
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('conta')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeSidebarTab === 'conta'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                MINHA CONTA
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('pixel')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-between ${
                  activeSidebarTab === 'pixel'
                    ? 'bg-black text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span>PIXEL & TRÁFEGO</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-amber-400 text-stone-950 font-bold">
                  PRO
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSidebarTab('modulos_vip')}
                className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-between ${
                  activeSidebarTab === 'modulos_vip'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-black shadow-md'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-amber-50 border border-amber-500/20'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Módulos VIP
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-stone-900 text-amber-300 font-bold">
                  12 SEÇÕES
                </span>
              </button>
            </aside>

            {/* CONTEÚDO PRINCIPAL DA ABA SELECIONADA */}
            <div className="lg:col-span-9 space-y-12">
              {/* ABA SUA PÁGINA */}
              {activeSidebarTab === 'pagina' && (
                <>
                  {/* SEÇÃO 1: NO AR */}
                  <div className="border-b border-stone-100 pb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold">
                        NO AR
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                        {businessTitle || brandName}
                      </h2>
                      <div className="pt-1">
                        <a
                          href={`/${slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-stone-500 hover:text-stone-900 underline underline-offset-4 transition-colors"
                        >
                          {fullUrl}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setActiveSidebarTab('servicos')}
                        className="px-6 py-3 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Editar Serviços</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveSidebarTab('galeria')}
                        className="px-6 py-3 rounded-full border border-stone-300 hover:border-stone-900 bg-white text-stone-800 text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-xs flex items-center gap-2"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-stone-600" />
                        <span>Editar Fotos</span>
                      </button>

                      {isAdminMode && (
                        <button
                          type="button"
                          onClick={() => setCurrentView('editar_pagina')}
                          className="px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm flex items-center gap-1.5"
                          title="Exclusivo Master Admin"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Studio ADM (3 Colunas)</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ATALHOS RÁPIDOS DE EDIÇÃO PERMITIDA DO CLIENTE (SERVIÇOS & FOTOS) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                    <div
                      onClick={() => setActiveSidebarTab('servicos')}
                      className="p-6 rounded-3xl bg-white border border-stone-200/90 hover:border-amber-400 hover:shadow-md transition cursor-pointer group space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                          <Sparkles className="w-5 h-5 text-amber-500" />
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          {servicesCatalogData.items.length} PROCEDIMENTOS
                        </span>
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-800 transition">
                          Catálogo de Procedimentos & Preços
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Altere nomes, valores, durações e mensagens prontas do WhatsApp. Clientes chegam decididas.
                        </p>
                      </div>
                      <div className="pt-2 text-xs font-bold text-stone-800 flex items-center gap-1 group-hover:text-amber-700">
                        <span>Gerenciar Serviços</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveSidebarTab('galeria')}
                      className="p-6 rounded-3xl bg-white border border-stone-200/90 hover:border-amber-400 hover:shadow-md transition cursor-pointer group space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold">
                          <ImageIcon className="w-5 h-5 text-stone-700" />
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 font-bold border border-stone-200">
                          {(galleryConfig.photos || galleryPhotos).length} FOTOS ATIVAS
                        </span>
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-800 transition">
                          Galeria & Portfólio de Trabalhos
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Adicione ou atualize fotos de procedimentos reais com legendas explicativas e zoom interativo.
                        </p>
                      </div>
                      <div className="pt-2 text-xs font-bold text-stone-800 flex items-center gap-1 group-hover:text-amber-700">
                        <span>Gerenciar Fotos</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* SEÇÃO 3: TUTORIAL INSTAGRAM, DISPLAY DE BALCÃO & CARD PARA STORY */}
                  <div className="pt-8 border-t border-stone-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* CARD 1: TUTORIAL PASSO A PASSO INSTAGRAM */}
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 border border-amber-200/80 space-y-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Instagram className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block">
                            DIVULGAÇÃO & CONVERSÃO
                          </span>
                          <h4 className="text-sm font-bold text-stone-900">
                            Como colocar na Bio do Instagram
                          </h4>
                        </div>
                      </div>

                      <div className="space-y-2.5 text-xs text-stone-700 leading-relaxed font-sans">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-200/80 text-amber-950 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                          <p>Abra o <strong>Instagram</strong> no celular e clique em <strong>Editar Perfil</strong>.</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-200/80 text-amber-950 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                          <p>Toque em <strong>Links</strong> &gt; <strong>Adicionar link externo</strong>.</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-200/80 text-amber-950 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                          <p>Cole a URL do seu BioSite e salve:</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          readOnly
                          value={fullUrl}
                          className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white font-mono text-[11px] text-stone-800 select-all"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(fullUrl)
                            setCopiedLink(true)
                            setTimeout(() => setCopiedLink(false), 2000)
                          }}
                          className="shrink-0 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedLink ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>

                    {/* CARD 2: DISPLAY DE BALCÃO COM QR CODE */}
                    <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shrink-0">
                            <QrCode className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold block">
                              EXPERIÊNCIA FÍSICA VIP
                            </span>
                            <h4 className="text-sm font-bold text-stone-900">
                              Display de Balcão & Cartão de Visitas
                            </h4>
                          </div>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Imprima este QR Code em acrílico para o balcão da sua recepção ou no verso do seu cartão. O cliente aponta a câmera e acessa seu catálogo completo!
                        </p>
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <div className="p-2 bg-white rounded-xl border border-stone-200 shadow-2xs shrink-0">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(fullUrl)}`}
                            alt="QR Code do BioSite"
                            className="w-16 h-16 rounded-lg"
                          />
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <a
                            href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(fullUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={`qrcode-${slug}.png`}
                            className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Download className="w-3 h-3 text-amber-400" />
                            <span>Baixar QR Code HD (500px)</span>
                          </a>
                          <span className="text-[10px] text-stone-400 block text-center font-mono">
                            Pronto para gráfica ou impressão
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CARD 3: GERADOR DE CARD PARA STORY DO INSTAGRAM (9:16) */}
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-black text-white space-y-4 flex flex-col justify-between shadow-xl border border-stone-800">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center shrink-0 shadow-md">
                            <Smartphone className="w-4 h-4 font-bold" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                              STORIES & ENGAJAMENTO (9:16)
                            </span>
                            <h4 className="text-sm font-bold text-white">
                              Card Oficial para Story
                            </h4>
                          </div>
                        </div>
                        <p className="text-xs text-stone-300 leading-relaxed">
                          Divulgue seu novo BioSite nos Stories do Instagram com design cinematográfico de alta conversão.
                        </p>
                      </div>

                      <div className="pt-2 space-y-2">
                        <button
                          type="button"
                          onClick={() => setStoryModalOpen(true)}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Visualizar & Baixar Story HD</span>
                        </button>
                        <span className="text-[10px] text-stone-400 block text-center font-mono">
                          Formato 1080x1920 · Pronto para postar
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ========================================================= */}
              {/* ABA EDIÇÃO DE SERVIÇOS & PREÇOS (EXCLUSIVA DO CLIENTE) */}
              {/* ========================================================= */}
              {activeSidebarTab === 'servicos' && (
              <ClientServicesTab
                slug={slug}
                servicesCatalogData={servicesCatalogData}
                setServicesCatalogData={setServicesCatalogData}
                setHasUnsavedChanges={setHasUnsavedChanges}
                handleSavePage={handleSavePage}
              />
            )}

            {activeSidebarTab === 'galeria' && (
              <ClientGalleryTab
                slug={slug}
                galleryConfig={galleryConfig}
                setGalleryConfig={setGalleryConfig}
                galleryPhotos={galleryPhotos}
                setGalleryPhotos={setGalleryPhotos}
                setHasUnsavedChanges={setHasUnsavedChanges}
                handleSavePage={handleSavePage}
              />
            )}

            <ClientLeadsTab
              activeSidebarTab={activeSidebarTab}
              businessTitle={businessTitle}
              slug={slug}
              leadsList={leadsList}
              loadingLeads={loadingLeads}
              leadFilter={leadFilter}
              setLeadFilter={setLeadFilter}
              handleExportLeadsCsv={handleExportLeadsCsv}
              connectedGateways={connectedGateways}
              toggleGateway={toggleGateway}
            />

            {activeSidebarTab === 'agenda' && (
                <div className="space-y-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                    AGENDA & ATENDIMENTOS
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-stone-900">Horários Marcados</h2>
                  <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
                    <p className="text-xs text-stone-600">
                      Nenhuma das suas páginas tem agenda ligada.
                    </p>
                    <p className="text-xs text-stone-500">
                      Crie uma página adicional do modelo <strong>Serviços e Preços</strong> e ligue o agendamento nela. Os horários marcados aparecem aqui.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setCurrentView('adicionar_pagina')}
                        className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider"
                      >
                        CRIAR PÁGINA DE AGENDAMENTO
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA ESTATÍSTICAS (OBSERVADA DIRETAMENTE NO MODELO REAL) */}
              {activeSidebarTab === 'estatisticas' && (
                <div className="space-y-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                    ESTATÍSTICAS DO SEU BIO SITE
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block mb-2 font-bold">VISITAS</span>
                      <div className="text-4xl font-bold font-mono text-stone-900">2</div>
                      <div className="text-[10px] text-stone-400 font-mono mt-1">Registradas em tempo real</div>
                    </div>

                    <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block mb-2 font-bold">CLIQUES</span>
                      <div className="text-4xl font-bold font-mono text-stone-900">0</div>
                      <div className="text-[10px] text-stone-400 font-mono mt-1">Nos botões principais</div>
                    </div>

                    <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-[10px] font-mono uppercase text-stone-400 block mb-2 font-bold">ÚLTIMOS 7 DIAS</span>
                      <div className="text-4xl font-bold font-mono text-stone-400">—</div>
                      <div className="text-[10px] text-stone-400 font-mono mt-1">Aguardando mais dados</div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-stone-400 font-mono">
                      CLIQUES POR BOTÃO
                    </h3>
                    <p className="text-xs text-stone-500">
                      Ninguém clicou ainda. Assim que alguém tocar em um dos seus botões, ele aparece aqui.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-stone-100">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-stone-400 font-mono">
                      DE ONDE VÊM AS VISITAS
                    </h3>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono">
                      <span className="text-stone-700">Direto / Instagram</span>
                      <span className="font-bold text-stone-900">2 visitas</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA PAGAMENTO & REGULARIZAÇÃO */}
              {activeSidebarTab === 'pagamento' && (
              <ClientPaymentTab
                paymentStatus={paymentStatus}
                slug={slug}
                brandName={brandName}
                activePaymentMethod={activePaymentMethod}
                setActivePaymentMethod={setActivePaymentMethod}
                pixCopied={pixCopied}
                setPixCopied={setPixCopied}
                cardHolder={cardHolder}
                setCardHolder={setCardHolder}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cardExpiry={cardExpiry}
                setCardExpiry={setCardExpiry}
                cardCvv={cardCvv}
                setCardCvv={setCardCvv}
                cardInstallments={cardInstallments}
                setCardInstallments={setCardInstallments}
                isProcessingPayment={isProcessingPayment}
                paymentSuccessFeedback={paymentSuccessFeedback}
                remainingHours={remainingHours}
                handleConfirmPayment={handleConfirmPayment}
              />
            )}

              {/* ABA PLANOS */}
              {activeSidebarTab === 'planos' && (
                <div className="space-y-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                    SEU PLANO DE ASSINATURA
                  </span>
                  <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-black text-white text-[10px] font-mono font-bold uppercase">
                          PLANO PRO ANUAL
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-stone-900 mt-2">Bio Site Pro + 3 Páginas Inclusas</h3>
                        <p className="text-xs text-stone-500 mt-1">Hospedagem inclusa, domínio próprio, sem comissão em vendas.</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-mono text-stone-900">R$ 55,92</div>
                        <span className="text-xs text-stone-400 font-mono">/mês no anual</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                      <span className="text-xs text-stone-500">Próxima renovação: 15/02/2027</span>
                      <button
                        type="button"
                        onClick={() => setPixModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider"
                      >
                        <QrCode className="w-3.5 h-3.5 inline mr-1.5" /> Gerar Pix de Renovação
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ABA MINHA CONTA (OBSERVADA DIRETAMENTE NO MODELO REAL) */}
              {activeSidebarTab === 'conta' && (
              <ClientAccountTab
                userEmail={userEmail}
                slug={slug}
                brandName={brandName}
                setBrandName={setBrandName}
                userPhone={userPhone}
                setUserPhone={setUserPhone}
                savedSuccess={savedSuccess}
                setSavedSuccess={setSavedSuccess}
                setHasUnsavedChanges={setHasUnsavedChanges}
                handleSavePage={handleSavePage}
              />
            )}

            {activeSidebarTab === 'pixel' && (
              <ClientPixelsTab
                metaPixelId={metaPixelId}
                setMetaPixelId={setMetaPixelId}
                googleAnalyticsId={googleAnalyticsId}
                setGoogleAnalyticsId={setGoogleAnalyticsId}
                tiktokPixelId={tiktokPixelId}
                setTiktokPixelId={setTiktokPixelId}
                trackWhatsappLead={trackWhatsappLead}
                setTrackWhatsappLead={setTrackWhatsappLead}
                trackPageView={trackPageView}
                setTrackPageView={setTrackPageView}
                pixelSavedSuccess={pixelSavedSuccess}
                handleSavePixels={handleSavePixels}
              />
            )}

              {/* ABA: MÓDULOS VIP DE ALTA CONVERSÃO */}
              {activeSidebarTab === 'modulos_vip' && (
              <ClientVipModulesTab
                announcementData={announcementData}
                setAnnouncementData={setAnnouncementData}
                urgencyData={urgencyData}
                setUrgencyData={setUrgencyData}
                servicesCatalogData={servicesCatalogData}
                setServicesCatalogData={setServicesCatalogData}
                locationData={locationData}
                setLocationData={setLocationData}
                quizData={quizData}
                setQuizData={setQuizData}
                metricsData={metricsData}
                setMetricsData={setMetricsData}
                howItWorksData={howItWorksData}
                setHowItWorksData={setHowItWorksData}
                testimonialsData={testimonialsData}
                setTestimonialsData={setTestimonialsData}
                aboutMeData={aboutMeData}
                setAboutMeData={setAboutMeData}
                faqData={faqData}
                setFaqData={setFaqData}
                setHasUnsavedChanges={setHasUnsavedChanges}
                setSavedSuccess={setSavedSuccess}
                handleSavePage={handleSavePage}
                bioSiteSlug={slug}
              />
            )}

              {/* RODAPÉ DE SUPORTE PRESENTE EM TODAS AS ABAS */}
              <div className="pt-12 border-t border-stone-100">
                <p className="text-xs text-stone-400">
                  Precisa trocar o endereço do seu link ou tem qualquer dúvida?{' '}
                  <a
                    href="https://wa.me/5531991390202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-900 underline underline-offset-2 hover:text-amber-800 transition-colors"
                  >
                    Falar com o suporte
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================= */}
      {/* 3. TELA DE ADICIONAR PÁGINAS ADICIONAIS */}
      {/* ========================================================= */}
      {currentView === 'adicionar_pagina' && (
        <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-8">
          <div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-300 hover:border-stone-900 bg-white text-xs font-mono uppercase tracking-wider text-stone-700 hover:text-stone-900 transition cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> MINHA ÁREA
            </button>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-stone-400 block mb-1">
              PÁGINA ADICIONAL · PLANO PRO ({additionalPages.length} de 3 utilizadas)
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Escolha o modelo.
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm font-serif mt-2 max-w-3xl leading-relaxed">
              O modelo define a estrutura da página. As cores, a fonte e o formato dos botões vêm do seu Bio Site — cada prévia abaixo já está na sua identidade.
            </p>
          </div>

          {/* ABAS */}
          <div className="border-b border-stone-200/80 pb-3">
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none text-xs font-medium">
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedCategoryTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategoryTab(tab.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full transition cursor-pointer text-xs flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-stone-900 text-white font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-500'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <p className="text-xs text-stone-500 font-serif italic">
            {activeTabObj.note}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:border-stone-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="pt-2 pb-6 flex justify-center">
                  <TemplatePhonePreview template={tpl} clientName={businessTitle || brandName} />
                </div>

                <div className="space-y-3 flex-1 flex flex-col justify-between border-t border-stone-100 pt-5">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-stone-900">
                      {tpl.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                      IDEAL PARA:
                    </span>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      {tpl.idealFor}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setPreviewModalTemplate(tpl)}
                      className="w-full py-2.5 rounded-xl border border-stone-300 hover:border-stone-900 text-stone-800 text-xs font-bold uppercase tracking-wider transition cursor-pointer text-center"
                    >
                      VISUALIZAR
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectTemplate(tpl)}
                      className="w-full py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer text-center shadow-xs flex items-center justify-center gap-1.5"
                    >
                      USAR ESTE →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      <ClientModals
        pixModalOpen={pixModalOpen}
        setPixModalOpen={setPixModalOpen}
        pixCopied={pixCopied}
        setPixCopied={setPixCopied}
        slug={slug}
        brandName={brandName}
        remainingHours={remainingHours}
        showPendingPaymentModal={showPendingPaymentModal}
        setShowPendingPaymentModal={setShowPendingPaymentModal}
        setActiveSidebarTab={setActiveSidebarTab}
        setOpenAccordion={setOpenAccordion}
        storyModalOpen={storyModalOpen}
        setStoryModalOpen={setStoryModalOpen}
        currentView={currentView}
        handleDownloadStoryPng={handleDownloadStoryPng}
        copiedLink={copiedLink}
        setCopiedLink={setCopiedLink}
        monogram={monogram}
        customPhotoSrc={customPhotoSrc}
        demoGender={demoGender}
        businessTitle={businessTitle}
        niche={niche}
        rating={rating}
        isGeneratingStoryPng={isGeneratingStoryPng}
        fullUrl={fullUrl}
      />

      <Footer />
    </div>
  )
}

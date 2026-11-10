'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import TemplatePhonePreview from '@/components/TemplatePhonePreview'
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
import { Project, projects as defaultProjects } from '@/data/projects'
import { Subscription } from '@/data/subscriptions'
import { generateNicheContent } from '@/utils/aiNicheGenerator'
import { applyCanvasOrganicFade, applySilhouetteCutout, readImageAsDataUrl } from '@/utils/imageProcessors'
import { saveBioSite, getLeads, LeadSubmission } from '@/services/biositeService'
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
  Sliders,
  Flame,
  Download
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
  const [activeSidebarTab, setActiveSidebarTab] = useState<'pagina' | 'vendas' | 'leads' | 'agenda' | 'estatisticas' | 'planos' | 'conta' | 'pixel' | 'modulos_vip'>('pagina')
  const [leadsList, setLeadsList] = useState<LeadSubmission[]>([])
  const [leadFilter, setLeadFilter] = useState<'TODOS' | 'WHATSAPP' | 'QUIZ' | 'CATALOGO'>('TODOS')
  const [loadingLeads, setLoadingLeads] = useState(false)

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
  const [customPhotoSrc, setCustomPhotoSrc] = useState<string | null>(null)
  const [photoTreatment, setPhotoTreatment] = useState<'organico' | 'silhueta' | 'original'>('organico')
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false)
  const [aiFillSuccess, setAiFillSuccess] = useState(false)

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
        const parsed = JSON.parse(savedSiteRaw)
        if (parsed.name) {
          setBrandName(parsed.name)
          setBusinessTitle(parsed.name)
        }
        if (parsed.role || parsed.category) setNiche(parsed.role || parsed.category)
        if (parsed.description || parsed.tagline) setTagline(parsed.description || parsed.tagline)
        if (parsed.registrationCode) setRegistrationCode(parsed.registrationCode)
        if (parsed.monogram) setMonogram(parsed.monogram)
        if (parsed.photo) setCustomPhotoSrc(parsed.photo)
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

      // Verificar parâmetro na URL: ?edit=<slug> ou ?slug=<slug>
      const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
      const editSlug = urlParams?.get('edit') || urlParams?.get('slug')

      if (editSlug) {
        setIsAdminMode(true)
        setCurrentView('editar_pagina')
        loadBioSiteData(editSlug)
      } else {
        // Fluxo padrão do usuário regular
        let activeSlug = slug
        if (storedSubs) {
          const subs = JSON.parse(storedSubs)
          if (subs.length > 0) {
            const first = subs[0]
            if (first.clientName) setBrandName(first.clientName)
            if (first.businessName) setBusinessTitle(first.businessName)
            if (first.slug) {
              setSlug(first.slug)
              activeSlug = first.slug
            }
            if (first.email) setUserEmail(first.email)
            if (first.whatsapp) setUserPhone(first.whatsapp)
            if (first.niche) setNiche(first.niche)
          }
        }

        // Carregar configurações visuais salvas do BioVip (Paleta, Tipografia, Botões, Foto, etc.)
        const savedSiteRaw = localStorage.getItem('biovip_site_' + activeSlug) || localStorage.getItem('biovip_user_site')
        if (savedSiteRaw) {
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
        }

        const storedPages = localStorage.getItem('biovip_client_pages')
        if (storedPages) {
          setAdditionalPages(JSON.parse(storedPages))
        }
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
    } catch (e) {
      console.error(e)
    }
  }, [])

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

    const siteData = {
      ...existingData,
      slug,
      name: businessTitle || brandName,
      role: niche,
      category: niche,
      registrationCode,
      monogram,
      photo: customPhotoSrc || (demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem),
      paletteId: selectedPalette.id,
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
      subpages: additionalPages.map(ap => ({
        slug: ap.slug,
        title: ap.title,
        description: `Página ${ap.title} de ${businessTitle || brandName}`,
        previewType: (ap.templateId as any) || 'services'
      }))
    }

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

  // Renderizador Reutilizável: Módulos VIP de Alta Conversão (12 Seções)
  const renderModulosVipEditor = () => (
    <div className="space-y-6 animate-fade-in pt-2">
      {/* 1. BARRA DE ALERTA & ESCASSEZ */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-sm text-stone-900">Barra de Alerta & Escassez</h3>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={announcementData.enabled}
              onChange={(e) => {
                setAnnouncementData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Ativar Alerta</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Badge do Alerta
            </label>
            <input
              type="text"
              value={announcementData.badge}
              onChange={(e) => {
                setAnnouncementData(prev => ({ ...prev, badge: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              placeholder="Ex: AGENDA VIP ABERTA"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Texto do Comunicado
            </label>
            <input
              type="text"
              value={announcementData.text}
              onChange={(e) => {
                setAnnouncementData(prev => ({ ...prev, text: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              placeholder="Ex: Últimos horários disponíveis para esta semana."
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={urgencyData.enabled}
              onChange={(e) => {
                setUrgencyData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Cronômetro Regressivo</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Tempo:</span>
            <input
              type="number"
              min={5}
              max={60}
              value={urgencyData.minutes}
              onChange={(e) => {
                setUrgencyData(prev => ({ ...prev, minutes: Number(e.target.value) || 15 }))
                setHasUnsavedChanges(true)
              }}
              className="w-16 px-2 py-1 rounded-lg border border-stone-300 text-xs font-mono text-center"
            />
            <span className="text-xs text-stone-500">min</span>
          </div>
        </div>
      </div>

      {/* 2. CATÁLOGO DE SERVIÇOS VIP */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Catálogo de Procedimentos VIP</h3>
              <p className="text-[11px] text-stone-500">Apresente seus serviços com preço, duração e WhatsApp individual.</p>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={servicesCatalogData.enabled}
              onChange={(e) => {
                setServicesCatalogData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Exibir Catálogo</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Título da Seção
            </label>
            <input
              type="text"
              value={servicesCatalogData.headline}
              onChange={(e) => {
                setServicesCatalogData(prev => ({ ...prev, headline: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Subtítulo
            </label>
            <input
              type="text"
              value={servicesCatalogData.subtitle || ''}
              onChange={(e) => {
                setServicesCatalogData(prev => ({ ...prev, subtitle: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Lista de Itens do Catálogo */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800">Procedimentos ({servicesCatalogData.items.length})</span>
            <button
              type="button"
              onClick={() => {
                const newItem = {
                  id: `srv-${Date.now().toString().slice(-4)}`,
                  category: 'MAIS PROCURADO',
                  name: 'Novo Procedimento VIP',
                  description: 'Descrição do procedimento exclusivo com atendimento personalizado.',
                  price: 'R$ 250',
                  duration: '⏱ 1h30',
                  badge: 'MAIS PROCURADO',
                  featured: true,
                  whatsappMessage: 'Olá! Gostaria de agendar este procedimento.'
                }
                setServicesCatalogData(prev => ({
                  ...prev,
                  items: [...prev.items, newItem]
                }))
                setHasUnsavedChanges(true)
              }}
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-black text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition shadow-2xs"
            >
              <Plus className="w-3 h-3" /> Adicionar Procedimento
            </button>
          </div>

          {servicesCatalogData.items.map((item, idx) => (
            <div key={item.id || idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-600">Procedimento #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    setServicesCatalogData(prev => ({
                      ...prev,
                      items: prev.items.filter((_, i) => i !== idx)
                    }))
                    setHasUnsavedChanges(true)
                  }}
                  className="text-stone-400 hover:text-rose-600 text-xs font-semibold cursor-pointer"
                >
                  Excluir
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-stone-500 mb-0.5">Nome do Procedimento</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...servicesCatalogData.items]
                      updated[idx].name = e.target.value
                      setServicesCatalogData(prev => ({ ...prev, items: updated }))
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-stone-500 mb-0.5">Categoria / Aba</label>
                  <select
                    value={item.category || 'MAIS PROCURADO'}
                    onChange={(e) => {
                      const updated = [...servicesCatalogData.items]
                      updated[idx].category = e.target.value
                      setServicesCatalogData(prev => ({ ...prev, items: updated }))
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-2 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900 cursor-pointer"
                  >
                    <option value="TODOS">TODOS</option>
                    <option value="MAIS PROCURADO">MAIS PROCURADO</option>
                    <option value="EXCLUSIVO">EXCLUSIVO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-stone-500 mb-0.5">Preço / Investimento</label>
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => {
                      const updated = [...servicesCatalogData.items]
                      updated[idx].price = e.target.value
                      setServicesCatalogData(prev => ({ ...prev, items: updated }))
                      setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: R$ 250 ou Sob Consulta"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-stone-500 mb-0.5">Duração Estimada</label>
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => {
                      const updated = [...servicesCatalogData.items]
                      updated[idx].duration = e.target.value
                      setServicesCatalogData(prev => ({ ...prev, items: updated }))
                      setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: ⏱ 1h30"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-stone-500 mb-0.5">Descrição Curta</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...servicesCatalogData.items]
                    updated[idx].description = e.target.value
                    setServicesCatalogData(prev => ({ ...prev, items: updated }))
                    setHasUnsavedChanges(true)
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. LOCALIZAÇÃO & ROTAS (GPS WAZE / UBER / MAPS) */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Localização & Rotas com GPS</h3>
              <p className="text-[11px] text-stone-500">Botões de rota direta no Waze, Google Maps e Uber.</p>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={locationData.enabled}
              onChange={(e) => {
                setLocationData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Exibir Localização</span>
          </label>
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Endereço Completo
            </label>
            <input
              type="text"
              value={locationData.address}
              onChange={(e) => {
                setLocationData(prev => ({ ...prev, address: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              placeholder="Ex: Av. Boa Viagem, 2190 - Sala 918 · Recife, PE"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                Horários de Atendimento
              </label>
              <input
                type="text"
                value={locationData.hours}
                onChange={(e) => {
                  setLocationData(prev => ({ ...prev, hours: e.target.value }))
                  setHasUnsavedChanges(true)
                }}
                placeholder="Ex: Seg a Sex · 08:30 às 19:30"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                Status Atual de Funcionamento
              </label>
              <input
                type="text"
                value={locationData.openStatus}
                onChange={(e) => {
                  setLocationData(prev => ({ ...prev, openStatus: e.target.value }))
                  setHasUnsavedChanges(true)
                }}
                placeholder="Ex: Aberto Agora · Agendamento VIP"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. TRIAGEM ANTI-CURIOSOS (QUIZ / FUNIL) */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Triagem Anti-Curiosos (Funil de Perguntas)</h3>
              <p className="text-[11px] text-stone-500">Qualifica o visitante antes de levar a conversa pronta para o WhatsApp.</p>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={quizData.enabled}
              onChange={(e) => {
                setQuizData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Ativar Triagem</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Texto do Botão de Abertura
            </label>
            <input
              type="text"
              value={quizData.buttonLabel}
              onChange={(e) => {
                setQuizData(prev => ({ ...prev, buttonLabel: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Título do Modal
            </label>
            <input
              type="text"
              value={quizData.headline}
              onChange={(e) => {
                setQuizData(prev => ({ ...prev, headline: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 5. INDICADORES DE AUTORIDADE / MÉTRICAS */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Indicadores de Autoridade & Prova Social</h3>
              <p className="text-[11px] text-stone-500">Números que geram autoridade imediata no topo do perfil.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setMetricsData(prev => [...prev, { value: '+500', label: 'CASOS ATENDIDOS' }])
              setHasUnsavedChanges(true)
            }}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <Plus className="w-3 h-3" /> Adicionar Métrica
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {metricsData.map((m, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-2 relative">
              <button
                type="button"
                onClick={() => {
                  setMetricsData(prev => prev.filter((_, i) => i !== idx))
                  setHasUnsavedChanges(true)
                }}
                className="absolute top-2 right-2 text-stone-400 hover:text-rose-600 text-[11px] font-bold cursor-pointer"
              >
                ✕
              </button>
              <div>
                <label className="block text-[9px] font-mono uppercase text-stone-400 font-bold mb-0.5">
                  NÚMERO / VALOR
                </label>
                <input
                  type="text"
                  value={m.value}
                  onChange={(e) => {
                    const up = [...metricsData]
                    up[idx].value = e.target.value
                    setMetricsData(up)
                    setHasUnsavedChanges(true)
                  }}
                  className="w-full px-2.5 py-1 rounded-lg border border-stone-300 text-xs font-mono font-bold bg-white text-stone-900"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono uppercase text-stone-400 font-bold mb-0.5">
                  RÓTULO
                </label>
                <input
                  type="text"
                  value={m.label}
                  onChange={(e) => {
                    const up = [...metricsData]
                    up[idx].label = e.target.value
                    setMetricsData(up)
                    setHasUnsavedChanges(true)
                  }}
                  className="w-full px-2.5 py-1 rounded-lg border border-stone-300 text-[11px] bg-white text-stone-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. COMO FUNCIONA (PASSO A PASSO) */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Como Funciona (3 Etapas)</h3>
              <p className="text-[11px] text-stone-500">Explica a jornada do cliente desde o primeiro clique até a entrega.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setHowItWorksData(prev => [
                ...prev,
                { number: `0${prev.length + 1}`, title: 'Nova Etapa VIP', description: 'Explicação clara deste passo.' }
              ])
              setHasUnsavedChanges(true)
            }}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <Plus className="w-3 h-3" /> Adicionar Passo
          </button>
        </div>

        <div className="space-y-2.5">
          {howItWorksData.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3">
              <input
                type="text"
                value={step.number}
                onChange={(e) => {
                  const up = [...howItWorksData]
                  up[idx].number = e.target.value
                  setHowItWorksData(up)
                  setHasUnsavedChanges(true)
                }}
                className="w-12 px-2 py-1.5 rounded-lg border border-stone-300 text-xs font-mono font-bold text-center bg-white"
              />
              <div className="flex-1 space-y-1.5">
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => {
                    const up = [...howItWorksData]
                    up[idx].title = e.target.value
                    setHowItWorksData(up)
                    setHasUnsavedChanges(true)
                  }}
                  placeholder="Título da Etapa"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-bold bg-white text-stone-900"
                />
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) => {
                    const up = [...howItWorksData]
                    up[idx].description = e.target.value
                    setHowItWorksData(up)
                    setHasUnsavedChanges(true)
                  }}
                  placeholder="Descrição da etapa"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-[11px] bg-white text-stone-700"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setHowItWorksData(prev => prev.filter((_, i) => i !== idx))
                  setHasUnsavedChanges(true)
                }}
                className="text-stone-400 hover:text-rose-600 text-xs font-bold pt-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 7. DEPOIMENTOS & AVALIAÇÕES VIP */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Depoimentos & Avaliações VIP</h3>
              <p className="text-[11px] text-stone-500">Relatos reais de clientes com estrelas e procedência.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setTestimonialsData(prev => [
                ...prev,
                { clientName: 'Novo Cliente', city: 'Sua Cidade - UF', text: 'Atendimento espetacular, superou todas as expectativas!', rating: 5 }
              ])
              setHasUnsavedChanges(true)
            }}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <Plus className="w-3 h-3" /> Adicionar Depoimento
          </button>
        </div>

        <div className="space-y-3">
          {testimonialsData.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-600">Depoimento #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    setTestimonialsData(prev => prev.filter((_, i) => i !== idx))
                    setHasUnsavedChanges(true)
                  }}
                  className="text-stone-400 hover:text-rose-600 text-xs font-semibold cursor-pointer"
                >
                  Excluir
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-stone-500 mb-0.5">Nome do Cliente</label>
                  <input
                    type="text"
                    value={item.clientName}
                    onChange={(e) => {
                      const up = [...testimonialsData]
                      up[idx].clientName = e.target.value
                      setTestimonialsData(up)
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-stone-500 mb-0.5">Cidade / Estado</label>
                  <input
                    type="text"
                    value={item.city}
                    onChange={(e) => {
                      const up = [...testimonialsData]
                      up[idx].city = e.target.value
                      setTestimonialsData(up)
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-stone-500 mb-0.5">Depoimento / Texto</label>
                <textarea
                  rows={2}
                  value={item.text}
                  onChange={(e) => {
                    const up = [...testimonialsData]
                    up[idx].text = e.target.value
                    setTestimonialsData(up)
                    setHasUnsavedChanges(true)
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900 resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. SOBRE MIM ESTENDIDO */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-stone-700" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Sobre Mim & Posicionamento VIP</h3>
              <p className="text-[11px] text-stone-500">Histórico profissional e diferenciais para reforçar credibilidade.</p>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={aboutMeData.enabled}
              onChange={(e) => {
                setAboutMeData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Exibir Seção</span>
          </label>
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Título da Seção
            </label>
            <input
              type="text"
              value={aboutMeData.headline}
              onChange={(e) => {
                setAboutMeData(prev => ({ ...prev, headline: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Texto de Apresentação & Autoridade
            </label>
            <textarea
              rows={3}
              value={aboutMeData.paragraph}
              onChange={(e) => {
                setAboutMeData(prev => ({ ...prev, paragraph: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Frase de Assinatura / Fechamento
            </label>
            <input
              type="text"
              value={aboutMeData.closingPhrase}
              onChange={(e) => {
                setAboutMeData(prev => ({ ...prev, closingPhrase: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 9. PERGUNTAS FREQUENTES (FAQ) */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Perguntas Frequentes (FAQ)</h3>
              <p className="text-[11px] text-stone-500">Elimine objeções comuns antes do primeiro contato.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setFaqData(prev => [
                ...prev,
                { question: 'Nova Pergunta?', answer: 'Resposta explicativa sobre este assunto.' }
              ])
              setHasUnsavedChanges(true)
            }}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <Plus className="w-3 h-3" /> Adicionar Pergunta
          </button>
        </div>

        <div className="space-y-3">
          {faqData.map((faqItem, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-600">Pergunta #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    setFaqData(prev => prev.filter((_, i) => i !== idx))
                    setHasUnsavedChanges(true)
                  }}
                  className="text-stone-400 hover:text-rose-600 text-xs font-semibold cursor-pointer"
                >
                  Excluir
                </button>
              </div>

              <div>
                <input
                  type="text"
                  value={faqItem.question}
                  onChange={(e) => {
                    const up = [...faqData]
                    up[idx].question = e.target.value
                    setFaqData(up)
                    setHasUnsavedChanges(true)
                  }}
                  placeholder="Qual é a pergunta?"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-bold bg-white text-stone-900"
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  value={faqItem.answer}
                  onChange={(e) => {
                    const up = [...faqData]
                    up[idx].answer = e.target.value
                    setFaqData(up)
                    setHasUnsavedChanges(true)
                  }}
                  placeholder="Resposta explicativa clara..."
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900 resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTÃO FIXO DE SALVAMENTO DE MÓDULOS */}
      <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            handleSavePage()
            setSavedSuccess(true)
            setTimeout(() => setSavedSuccess(false), 3500)
          }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          SALVAR MÓDULOS VIP NO AR
        </button>

        <a
          href={`/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1 transition"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Abrir BioSite para testar
        </a>
      </div>
    </div>
  )

  // Renderizador Reutilizável: Pixels & Anúncios (Meta, GA4, TikTok)
  const renderPixelEditor = () => (
    <div className="space-y-6 animate-fade-in pt-2">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-600 block font-bold">
            RASTREAMENTO & CONVERSÕES
          </span>
          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-mono font-bold">
            PRO & AGÊNCIA
          </span>
        </div>
        <h3 className="text-lg font-serif font-bold text-stone-900">
          Pixels de Tráfego Pago & Anúncios
        </h3>
        <p className="text-xs text-stone-500 mt-0.5">
          Rastreie cliques no WhatsApp, visualizações de catálogo e conversões de Meta Ads, Google Ads e TikTok.
        </p>
      </div>

      {pixelSavedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Pixels salvos com sucesso! Os eventos serão disparados no seu BioSite.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* META ADS */}
        <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-stone-900">Meta Pixel (Facebook)</span>
            {metaPixelId ? (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">ATIVO</span>
            ) : (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 font-bold">PENDENTE</span>
            )}
          </div>
          <div>
            <label className="text-[9px] font-mono uppercase text-stone-400 block font-bold mb-1">PIXEL ID</label>
            <input
              type="text"
              value={metaPixelId}
              onChange={(e) => setMetaPixelId(e.target.value)}
              placeholder="Ex: 123456789012345"
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-mono bg-stone-50 text-stone-900"
            />
          </div>
        </div>

        {/* GA4 */}
        <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-stone-900">Google GA4</span>
            {googleAnalyticsId ? (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">ATIVO</span>
            ) : (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 font-bold">PENDENTE</span>
            )}
          </div>
          <div>
            <label className="text-[9px] font-mono uppercase text-stone-400 block font-bold mb-1">ID MEDIÇÃO GA4</label>
            <input
              type="text"
              value={googleAnalyticsId}
              onChange={(e) => setGoogleAnalyticsId(e.target.value)}
              placeholder="Ex: G-ABC123XYZ"
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-mono bg-stone-50 text-stone-900"
            />
          </div>
        </div>

        {/* TIKTOK */}
        <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-stone-900">TikTok Pixel</span>
            {tiktokPixelId ? (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">ATIVO</span>
            ) : (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 font-bold">PENDENTE</span>
            )}
          </div>
          <div>
            <label className="text-[9px] font-mono uppercase text-stone-400 block font-bold mb-1">PIXEL ID TIKTOK</label>
            <input
              type="text"
              value={tiktokPixelId}
              onChange={(e) => setTiktokPixelId(e.target.value)}
              placeholder="Ex: C1234567890"
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-mono bg-stone-50 text-stone-900"
            />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={trackWhatsappLead}
            onChange={(e) => setTrackWhatsappLead(e.target.checked)}
            className="mt-0.5 accent-black w-4 h-4 rounded cursor-pointer"
          />
          <div>
            <span className="text-xs font-bold text-stone-900">Disparar evento 'Lead' ao tocar no WhatsApp</span>
            <p className="text-[11px] text-stone-500">Mede conversão real de campanhas de tráfego pago.</p>
          </div>
        </label>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={trackPageView}
            onChange={(e) => setTrackPageView(e.target.checked)}
            className="mt-0.5 accent-black w-4 h-4 rounded cursor-pointer"
          />
          <div>
            <span className="text-xs font-bold text-stone-900">Disparar 'PageView' e 'ViewContent' ao abrir o BioSite</span>
            <p className="text-[11px] text-stone-500">Permite criar públicos de remarketing para quem visitou seu link.</p>
          </div>
        </label>
      </div>

      <button
        type="button"
        onClick={handleSavePixels}
        className="px-6 py-2.5 rounded-xl bg-black hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm"
      >
        SALVAR CONFIGURAÇÃO DE PIXELS
      </button>
    </div>
  )

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
              {currentView === 'editar_pagina' ? 'EDITOR DA PÁGINA' : 'ÁREA DO CLIENTE'}
            </span>
            <span className="hidden md:inline-flex text-xs font-mono font-semibold text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
              /{slug}
            </span>
          </div>

          {/* Navegação Rápida entre Visões & Ações */}
          <div className="flex items-center gap-2">
            {currentView === 'editar_pagina' ? (
              <button
                type="button"
                onClick={() => {
                  if (isAdminMode) {
                    window.location.href = '/admin'
                  } else {
                    setCurrentView('dashboard')
                  }
                }}
                className="px-3 py-1.5 rounded-lg border border-stone-200 hover:border-stone-900 bg-white text-stone-700 hover:text-stone-900 text-xs font-mono uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isAdminMode ? 'Painel ADM' : 'Minha Área'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentView('editar_pagina')}
                className="px-3 py-1.5 rounded-lg border border-stone-200 hover:border-stone-900 bg-white text-stone-700 hover:text-stone-900 text-xs font-mono uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Editar Página</span>
              </button>
            )}

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

            <Link
              href="/entrar"
              className="text-xs font-mono uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors pt-2"
            >
              SAIR
            </Link>
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

                    <button
                      type="button"
                      onClick={() => setCurrentView('editar_pagina')}
                      className="px-8 py-3 rounded-full bg-black hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm hover:shadow-md"
                    >
                      EDITAR PÁGINA
                    </button>
                  </div>

                  {/* SEÇÃO 2: PÁGINAS ADICIONAIS */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold">
                        PÁGINAS ADICIONAIS
                      </span>
                      <span className="text-xs font-mono text-stone-400">
                        {additionalPages.length} de 3
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed max-w-2xl">
                      Seu plano inclui 3 páginas adicionais — cardápio, álbum, resultados e outros modelos prontos, já na identidade do seu Bio Site. A loja é à parte e não ocupa essa vaga.
                    </p>

                    {/* LISTA DAS PÁGINAS ATIVAS */}
                    {additionalPages.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        {additionalPages.map((page, i) => (
                          <div key={page.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between space-y-3">
                            <div>
                              <span className="text-[9px] font-mono uppercase text-stone-400 block">PÁGINA {i + 1}</span>
                              <div className="font-serif font-bold text-stone-900 text-sm mt-0.5">{page.title}</div>
                              <div className="text-[10px] font-mono text-stone-500 mt-1">/{slug}/{page.slug}</div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
                              <a
                                href={`/${slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-mono uppercase tracking-wider text-stone-700 hover:text-black font-bold flex items-center gap-1"
                              >
                                Ver ao vivo <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeletePage(page.id)}
                                className="text-stone-400 hover:text-rose-600 transition p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* BOTÃO CRIAR PÁGINA ADICIONAL */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setCurrentView('adicionar_pagina')}
                        className="px-7 py-3 rounded-full border border-stone-300 hover:border-stone-900 text-stone-800 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                      >
                        CRIAR PÁGINA ADICIONAL
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* ABA VENDAS (OBSERVADA DIRETAMENTE NO MODELO REAL) */}
              {activeSidebarTab === 'vendas' && (
                <div className="space-y-10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                      CONFIGURAR CONTA DE RECEBIMENTO
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-stone-900">
                      Recebimentos & Gateways
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Conecte a sua conta e a loja passa a receber Pix, cartão e boleto na própria página.
                    </p>
                  </div>

                  {/* 4 GATEWAYS BRASILEIROS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-stone-900">Mercado Pago</h3>
                          {connectedGateways.mercadopago && <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">CONECTADO</span>}
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Pix, cartão e boleto. O que o comprador brasileiro conhece.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleGateway('mercadopago')}
                        className={`text-xs font-mono uppercase font-bold tracking-wider text-left transition ${
                          connectedGateways.mercadopago ? 'text-rose-600 hover:underline' : 'text-stone-900 hover:underline'
                        }`}
                      >
                        {connectedGateways.mercadopago ? 'DESCONECTAR ✕' : 'CONECTAR →'}
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-stone-900">Asaas</h3>
                          {connectedGateways.asaas && <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">CONECTADO</span>}
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Pix, boleto e assinatura recorrente.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleGateway('asaas')}
                        className={`text-xs font-mono uppercase font-bold tracking-wider text-left transition ${
                          connectedGateways.asaas ? 'text-rose-600 hover:underline' : 'text-stone-900 hover:underline'
                        }`}
                      >
                        {connectedGateways.asaas ? 'DESCONECTAR ✕' : 'CONECTAR →'}
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-stone-900">PagBank</h3>
                          {connectedGateways.pagbank && <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">CONECTADO</span>}
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Pix e cartão, com a maquininha que a loja já usa.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleGateway('pagbank')}
                        className={`text-xs font-mono uppercase font-bold tracking-wider text-left transition ${
                          connectedGateways.pagbank ? 'text-rose-600 hover:underline' : 'text-stone-900 hover:underline'
                        }`}
                      >
                        {connectedGateways.pagbank ? 'DESCONECTAR ✕' : 'CONECTAR →'}
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-stone-900">InfinitePay</h3>
                          {connectedGateways.infinitepay && <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">CONECTADO</span>}
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Pix e cartão, com taxa baixa para quem vende pouco.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleGateway('infinitepay')}
                        className={`text-xs font-mono uppercase font-bold tracking-wider text-left transition ${
                          connectedGateways.infinitepay ? 'text-rose-600 hover:underline' : 'text-stone-900 hover:underline'
                        }`}
                      >
                        {connectedGateways.infinitepay ? 'DESCONECTAR ✕' : 'CONECTAR →'}
                      </button>
                    </div>
                  </div>

                  {/* VENDAS DA LOJA */}
                  <div className="pt-6 border-t border-stone-100">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                      VENDAS · {businessTitle || 'TESTE'}
                    </span>
                    <div className="text-2xl font-bold font-mono text-stone-900 mb-2">0 vendas</div>
                    <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
                      Nenhuma venda ainda. Assim que alguém fechar uma sacola na sua loja, ela aparece aqui — paga pela página ou combinada no WhatsApp.
                    </p>
                  </div>
                </div>
              )}

              {/* ABA LEADS & CONTATOS (CRM EM TEMPO REAL COM SUPABASE) */}
              {activeSidebarTab === 'leads' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                        CRM & CONVERSÃO EM TEMPO REAL
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                        Leads & Triagens
                      </h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Visitantes que clicaram no WhatsApp, preencheram triagens ou solicitaram serviços na sua página.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleExportLeadsCsv}
                        disabled={leadsList.length === 0}
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Exportar CSV
                      </button>
                    </div>
                  </div>

                  {/* CARDS DE MÉTRICAS */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block mb-1">TOTAL DE LEADS</span>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-stone-900">{leadsList.length}</div>
                      <span className="text-[10px] text-stone-500">Capturados</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                      <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold block mb-1">WHATSAPP</span>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-900">
                        {leadsList.filter(l => l.action_type === 'whatsapp_click').length}
                      </div>
                      <span className="text-[10px] text-emerald-600">Cliques diretos</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                      <span className="text-[10px] font-mono uppercase text-amber-700 font-bold block mb-1">TRIAGENS / QUIZ</span>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-900">
                        {leadsList.filter(l => l.action_type === 'quiz_completed').length}
                      </div>
                      <span className="text-[10px] text-amber-600">Funil respondido</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200">
                      <span className="text-[10px] font-mono uppercase text-purple-700 font-bold block mb-1">CATÁLOGO</span>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-purple-900">
                        {leadsList.filter(l => l.action_type === 'catalog_inquiry').length}
                      </div>
                      <span className="text-[10px] text-purple-600">Interesses em serviços</span>
                    </div>
                  </div>

                  {/* FILTROS */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {(['TODOS', 'WHATSAPP', 'QUIZ', 'CATALOGO'] as const).map(tab => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setLeadFilter(tab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition cursor-pointer ${
                          leadFilter === tab
                            ? 'bg-black text-white shadow-xs'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                        }`}
                      >
                        {tab === 'TODOS' ? 'Todos os Leads' : tab === 'WHATSAPP' ? 'WhatsApp' : tab === 'QUIZ' ? 'Triagens' : 'Catálogo'}
                      </button>
                    ))}
                  </div>

                  {/* LISTA DE LEADS */}
                  {loadingLeads ? (
                    <div className="p-12 text-center text-xs font-mono text-stone-400">
                      Carregando leads do Supabase...
                    </div>
                  ) : leadsList.length === 0 ? (
                    <div className="p-10 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mx-auto text-stone-500">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-stone-900 text-sm">Nenhum lead registrado ainda</h3>
                      <p className="text-xs text-stone-500 max-w-md mx-auto">
                        Quando um visitante abrir sua página <strong>/{slug}</strong> e clicar em qualquer botão de WhatsApp ou preencher a Triagem Anti-Curiosos, o lead aparecerá aqui instantaneamente sincronizado com o Supabase.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leadsList
                        .filter(lead => {
                          if (leadFilter === 'WHATSAPP') return lead.action_type === 'whatsapp_click'
                          if (leadFilter === 'QUIZ') return lead.action_type === 'quiz_completed'
                          if (leadFilter === 'CATALOGO') return lead.action_type === 'catalog_inquiry'
                          return true
                        })
                        .map((lead, idx) => {
                          const dateStr = lead.created_at ? new Date(lead.created_at).toLocaleString('pt-BR') : 'Agora há pouco'
                          const isQuiz = lead.action_type === 'quiz_completed'
                          const phone = lead.whatsapp || lead.details?.whatsapp
                          return (
                            <div
                              key={lead.id || idx}
                              className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-stone-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                              <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                                    isQuiz
                                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  }`}>
                                    {isQuiz ? 'TRIAGEM CONCLUÍDA' : 'WHATSAPP LEAD'}
                                  </span>
                                  <span className="text-[10px] font-mono text-stone-400">
                                    {dateStr}
                                  </span>
                                  <span className="text-[10px] font-mono text-stone-500 font-bold">
                                    /{lead.slug}
                                  </span>
                                </div>

                                <div className="text-sm font-bold text-stone-900">
                                  {lead.details?.buttonLabel || lead.client_name || 'Interesse em Atendimento'}
                                </div>

                                {lead.details?.role && (
                                  <div className="text-xs text-stone-500">
                                    Segmento: <span className="text-stone-700 font-medium">{lead.details.role}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {phone && (
                                  <a
                                    href={`https://wa.me/${phone.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    WhatsApp
                                  </a>
                                )}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  )}
                </div>
              )}

              {/* ABA AGENDA */}
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
                <div className="space-y-10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                      SEUS DADOS DE ACESSO
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-stone-900">
                      Minha Conta
                    </h2>
                  </div>

                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        E-MAIL
                      </label>
                      <input
                        type="text"
                        disabled
                        value={userEmail}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-100 text-xs font-mono text-stone-600"
                      />
                      <p className="text-[10px] text-stone-400 mt-1 font-mono">
                        É com ele que você entra na sua área, em qualquer aparelho. Para trocar o e-mail, fale com a gente.
                      </p>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        SEU NOME
                      </label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        SEU WHATSAPP
                      </label>
                      <input
                        type="text"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono text-stone-900 bg-white"
                        placeholder="(31) 99999-9999"
                      />
                      <p className="text-[10px] text-stone-400 mt-1 font-mono">
                        É por onde a gente fala com você sobre a sua página. Não aparece para quem visita o seu Bio Site.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSavedSuccess(true)
                        setTimeout(() => setSavedSuccess(false), 2500)
                      }}
                      className="px-6 py-2.5 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider"
                    >
                      SALVAR DADOS
                    </button>
                  </div>

                  {/* TROCAR SENHA */}
                  <div className="pt-8 border-t border-stone-100 max-w-md space-y-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        SENHA
                      </span>
                      <h3 className="font-bold text-sm text-stone-900">Trocar a senha</h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Depois de salvar, é a nova senha que vale para entrar. Esta sessão continua aberta.
                      </p>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        SENHA ATUAL
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        NOVA SENHA
                      </label>
                      <input
                        type="password"
                        placeholder="Pelo menos 8 caracteres"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white"
                      />
                      <p className="text-[10px] text-stone-400 mt-1 font-mono">
                        Pelo menos 8 caracteres, misturando letras e números.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSavedSuccess(true)
                        setTimeout(() => setSavedSuccess(false), 2500)
                      }}
                      className="px-6 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs font-bold uppercase tracking-wider"
                    >
                      SALVAR NOVA SENHA
                    </button>
                  </div>
                </div>
              )}

              {/* ABA PIXEL & TRÁFEGO PAGO (DIFERENCIAL DE MERCADO) */}
              {activeSidebarTab === 'pixel' && renderPixelEditor()}

              {/* ABA: MÓDULOS VIP DE ALTA CONVERSÃO */}
              {activeSidebarTab === 'modulos_vip' && renderModulosVipEditor()}

              {/* RODAPÉ DE SUPORTE PRESENTE EM TODAS AS ABAS */}
              <div className="pt-12 border-t border-stone-100">
                <p className="text-xs text-stone-400">
                  Precisa trocar o endereço do seu link ou tem qualquer dúvida?{' '}
                  <a
                    href="https://wa.me/5581985087520"
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
      {/* 2. TELA DE EDIÇÃO DA PÁGINA (IMAGEM 2) */}
      {/* ========================================================= */}
      {currentView === 'editar_pagina' && (
        <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          {/* Botão Superior Voltar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => isAdminMode ? (window.location.href = '/admin') : setCurrentView('dashboard')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-300 hover:border-stone-900 bg-white text-xs font-mono uppercase tracking-wider text-stone-700 hover:text-stone-900 transition cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {isAdminMode ? 'VOLTAR AO PAINEL ADM' : 'MINHA ÁREA'}
            </button>
            {isAdminMode && (
              <span className="text-[11px] font-mono text-amber-800 bg-amber-50 border border-amber-200/80 px-3.5 py-1 rounded-full font-semibold flex items-center gap-1.5 shadow-2xs">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                Modo Administrador: Alterações em <strong>/{slug}</strong> entram no ar imediatamente ao salvar.
              </span>
            )}
          </div>

          {/* Cabeçalho */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Editar sua página
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm font-serif mt-2 max-w-3xl leading-relaxed">
              Mude o que quiser e toque em salvar. A página no ar só muda depois disso — enquanto você mexe aqui, quem abrir seu link continua vendo a versão anterior.
            </p>
          </div>

          {/* ATALHOS RÁPIDOS ENTRE TODAS AS SEÇÕES */}
          <div className="mb-8 p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between flex-wrap gap-2 shadow-2xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold mr-1">
                SEÇÕES:
              </span>
              <button
                type="button"
                onClick={() => setOpenAccordion('paleta')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                  openAccordion === 'paleta' || openAccordion === 'fundo' || openAccordion === 'tipografia'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                🎨 Paleta & Fontes
              </button>
              <button
                type="button"
                onClick={() => setOpenAccordion('seus_botoes')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                  openAccordion === 'seus_botoes' || openAccordion === 'botoes'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                🔘 Botões & Links
              </button>
              <button
                type="button"
                onClick={() => setOpenAccordion('modulos_vip')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  openAccordion === 'modulos_vip'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-black shadow-sm ring-2 ring-amber-400/50'
                    : 'bg-amber-100/90 hover:bg-amber-200 text-amber-950 border border-amber-300 font-bold'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Módulos VIP (12 Seções)</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-stone-900 text-amber-300 font-mono font-bold">
                  NOVO
                </span>
              </button>
              <button
                type="button"
                onClick={() => setOpenAccordion('pixel')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  openAccordion === 'pixel'
                    ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-400/50'
                    : 'bg-purple-100/90 hover:bg-purple-200 text-purple-950 border border-purple-300 font-bold'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-purple-700" />
                <span>Pixel & Anúncios</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  handleSavePage()
                  setSavedSuccess(true)
                  setTimeout(() => setSavedSuccess(false), 3500)
                }}
                className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-amber-400" />
                <span>Salvar Tudo</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* COLUNA ESQUERDA: ACCORDION DAS 9 ETAPAS */}
            <div className="lg:col-span-7 space-y-3">
              {/* 1. PALETA */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'paleta' ? null : 'paleta')}
                  className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
                >
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-stone-600">
                    1. PALETA <span className="font-normal text-stone-400 ml-2">· {selectedPalette.name}</span>
                  </span>
                  {openAccordion === 'paleta' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {openAccordion === 'paleta' && (
                  <div className="pt-3 pb-4 space-y-3 animate-fade-in">
                    <p className="text-[11px] text-stone-500">
                      Define fundo, texto e botões de uma vez. Ou monte a sua.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {PALETTES.map((pal) => (
                        <button
                          key={pal.id}
                          type="button"
                          onClick={() => {
                            setSelectedPalette(pal)
                            setHasUnsavedChanges(true)
                          }}
                          className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                            selectedPalette.id === pal.id
                              ? 'border-stone-900 ring-2 ring-stone-900/10 bg-white'
                              : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                          }`}
                        >
                          <div className="flex gap-1 h-6 rounded-lg overflow-hidden mb-2 border border-stone-200/50">
                            {pal.swatches.map((color, idx) => (
                              <div key={idx} className="flex-1 h-full" style={{ backgroundColor: color }} />
                            ))}
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-stone-900">{pal.name}</div>
                            <div className="text-[9px] text-stone-500 line-clamp-1">{pal.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* SELEÇÃO DE CORES PERSONALIZADAS (MINHA PALETA) */}
                    {selectedPalette.id === 'minha_paleta' && (
                      <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 mt-3 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-stone-700 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            PERSONALIZAR CORES EXATAS
                          </span>
                          <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Tempo Real
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                          {/* 1. Fundo da Página */}
                          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200">
                            <div>
                              <span className="font-bold block text-[11px] text-stone-900">Fundo da Página</span>
                              <span className="text-[9px] font-mono text-stone-400">{customColors.bg}</span>
                            </div>
                            <input
                              type="color"
                              value={customColors.bg}
                              onChange={(e) => {
                                const next = { ...customColors, bg: e.target.value }
                                setCustomColors(next)
                                setSelectedPalette(prev => ({
                                  ...prev,
                                  bg: next.bg,
                                  swatches: [next.bg, next.button, next.accent]
                                }))
                                setHasUnsavedChanges(true)
                              }}
                              className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                            />
                          </div>

                          {/* 2. Fundo dos Cartões */}
                          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200">
                            <div>
                              <span className="font-bold block text-[11px] text-stone-900">Fundo dos Cartões</span>
                              <span className="text-[9px] font-mono text-stone-400">{customColors.card}</span>
                            </div>
                            <input
                              type="color"
                              value={customColors.card}
                              onChange={(e) => {
                                const next = { ...customColors, card: e.target.value }
                                setCustomColors(next)
                                setSelectedPalette(prev => ({
                                  ...prev,
                                  card: next.card
                                }))
                                setHasUnsavedChanges(true)
                              }}
                              className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                            />
                          </div>

                          {/* 3. Cor dos Botões / Destaques */}
                          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200">
                            <div>
                              <span className="font-bold block text-[11px] text-stone-900">Botões Principais</span>
                              <span className="text-[9px] font-mono text-stone-400">{customColors.button}</span>
                            </div>
                            <input
                              type="color"
                              value={customColors.button}
                              onChange={(e) => {
                                const next = { ...customColors, button: e.target.value }
                                setCustomColors(next)
                                setSelectedPalette(prev => ({
                                  ...prev,
                                  button: next.button,
                                  swatches: [next.bg, next.button, next.accent]
                                }))
                                setHasUnsavedChanges(true)
                              }}
                              className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                            />
                          </div>

                          {/* 4. Cor do Texto */}
                          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200">
                            <div>
                              <span className="font-bold block text-[11px] text-stone-900">Cor do Texto</span>
                              <span className="text-[9px] font-mono text-stone-400">{customColors.text}</span>
                            </div>
                            <input
                              type="color"
                              value={customColors.text}
                              onChange={(e) => {
                                const next = { ...customColors, text: e.target.value }
                                setCustomColors(next)
                                setSelectedPalette(prev => ({
                                  ...prev,
                                  text: next.text
                                }))
                                setHasUnsavedChanges(true)
                              }}
                              className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                            />
                          </div>

                          {/* 5. Acento e Brilho */}
                          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 sm:col-span-2">
                            <div>
                              <span className="font-bold block text-[11px] text-stone-900">Acento Nobre / Halo</span>
                              <span className="text-[9px] font-mono text-stone-400">{customColors.accent}</span>
                            </div>
                            <input
                              type="color"
                              value={customColors.accent}
                              onChange={(e) => {
                                const next = { ...customColors, accent: e.target.value }
                                setCustomColors(next)
                                setSelectedPalette(prev => ({
                                  ...prev,
                                  accent: next.accent,
                                  swatches: [next.bg, next.button, next.accent]
                                }))
                                setHasUnsavedChanges(true)
                              }}
                              className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 2. FUNDO */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'fundo' ? null : 'fundo')}
                  className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
                >
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-stone-600">
                    2. FUNDO <span className="font-normal text-stone-400 ml-2">· {BACKGROUND_STYLES.find(b => b.id === backgroundStyle)?.name}</span>
                  </span>
                  {openAccordion === 'fundo' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {openAccordion === 'fundo' && (
                  <div className="pt-3 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-2 animate-fade-in">
                    {BACKGROUND_STYLES.map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => {
                          setBackgroundStyle(bg.id)
                          setHasUnsavedChanges(true)
                        }}
                        className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                          backgroundStyle === bg.id ? 'border-stone-900 bg-stone-100 font-bold' : 'border-stone-200 bg-white text-stone-700'
                        }`}
                      >
                        <div className="text-xs">{bg.name}</div>
                        <div className="text-[9px] text-stone-400 mt-0.5 line-clamp-1">{bg.desc}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. TIPOGRAFIA */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'tipografia' ? null : 'tipografia')}
                  className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
                >
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-stone-600">
                    3. TIPOGRAFIA <span className="font-normal text-stone-400 ml-2">· {selectedTypography.name}</span>
                  </span>
                  {openAccordion === 'tipografia' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {openAccordion === 'tipografia' && (
                  <div className="pt-3 pb-4 space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                      <span>16 FONTES EDITORIAIS EXCLUSIVAS (ALTA TIPOGRAFIA)</span>
                      <span className="text-amber-600 font-bold">{selectedTypography.name}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto pr-1">
                      {TYPOGRAPHIES.map((tipo) => {
                        const isSelected = selectedTypography.id === tipo.id
                        return (
                          <button
                            key={tipo.id}
                            type="button"
                            onClick={() => {
                              setSelectedTypography(tipo)
                              setHasUnsavedChanges(true)
                            }}
                            className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/40 shadow-sm font-semibold'
                                : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/60'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-stone-900 truncate">
                                  {tipo.name}
                                </span>
                                <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-500 uppercase">
                                  {tipo.category}
                                </span>
                              </div>
                              {/* Prévia com o texto real renderizado na fonte */}
                              <div
                                className={`text-base font-bold py-1 my-0.5 truncate ${tipo.uppercase ? 'uppercase' : ''}`}
                                style={{
                                  fontFamily: tipo.cssFont,
                                  color: isSelected ? '#78350f' : '#1c1917'
                                }}
                              >
                                {businessTitle || brandName || 'BioVip'}
                              </div>
                            </div>
                            <div className="text-[9px] text-stone-500 mt-1 line-clamp-2 leading-tight">
                              {tipo.desc}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. BOTÕES */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'botoes' ? null : 'botoes')}
                  className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
                >
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-stone-600">
                    4. BOTÕES <span className="font-normal text-stone-400 ml-2">· {BUTTON_STYLES.find(b => b.id === buttonStyle)?.name}</span>
                  </span>
                  {openAccordion === 'botoes' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {openAccordion === 'botoes' && (
                  <div className="pt-3 pb-4 space-y-4 animate-fade-in">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-stone-700">
                          MODELOS DE BOTÕES DE ALTA CONVERSÃO (10 MODELOS VIP)
                        </span>
                        <span className="text-[9px] font-mono text-amber-600 font-bold">
                          {BUTTON_STYLES.find(b => b.id === buttonStyle)?.name}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
                        {BUTTON_STYLES.filter(b => !['moldura', 'solido', 'vidro', 'sombra', 'pill'].includes(b.id)).map((btn) => {
                          const isSelected = buttonStyle === btn.id || (btn.id === 'cartao_nobre' && buttonStyle === 'cartao_nobre')
                          return (
                            <button
                              key={btn.id}
                              type="button"
                              onClick={() => {
                                setButtonStyle(btn.id)
                                setHasUnsavedChanges(true)
                              }}
                              className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/40 shadow-sm'
                                  : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/60'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <div className="text-xs font-bold text-stone-900 truncate">{btn.name}</div>
                                  {btn.badge && (
                                    <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold shrink-0">
                                      {btn.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[9px] text-stone-500 leading-snug">{btn.desc}</div>
                              </div>
                              <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[9px] font-mono text-stone-400">
                                <span>{isSelected ? '✓ Ativo no Mockup' : 'Clique para testar'}</span>
                                <span className="text-amber-600 font-bold">BioVip</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* SELETOR DE ANIMAÇÃO DE CONVERSÃO */}
                    <div className="pt-3 border-t border-stone-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-stone-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          ANIMAÇÃO DE CONVERSÃO DOS BOTÕES
                        </span>
                        <span className="text-[9px] font-mono text-stone-400">
                          {BUTTON_ANIMATIONS.find(a => a.id === buttonAnimation)?.name}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {BUTTON_ANIMATIONS.map((anim) => (
                          <button
                            key={anim.id}
                            type="button"
                            onClick={() => {
                              setButtonAnimation(anim.id)
                              setHasUnsavedChanges(true)
                            }}
                            className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                              buttonAnimation === anim.id
                                ? 'border-amber-600 bg-amber-50/70 ring-1 ring-amber-500 font-bold text-amber-950'
                                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                            }`}
                          >
                            <div className="text-xs">{anim.name}</div>
                            <div className="text-[9px] text-stone-400 mt-0.5">{anim.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. FOTO OU LOGO */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'foto' ? null : 'foto')}
                  className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
                >
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-stone-600">
                    5. FOTO OU LOGO <span className="font-normal text-stone-400 ml-2">· {photoTreatment === 'organico' ? 'Dissolução Orgânica' : photoTreatment === 'silhueta' ? 'Silhueta Local' : 'Foto Inteira'}</span>
                  </span>
                  {openAccordion === 'foto' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {openAccordion === 'foto' && (
                  <div className="pt-3 pb-4 space-y-4 animate-fade-in">
                    {/* UPLOAD DE FOTO */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                          SUA FOTO OU RETRATO
                        </span>
                        {customPhotoSrc && (
                          <button
                            type="button"
                            onClick={() => {
                              setCustomPhotoSrc(null)
                              setHasUnsavedChanges(true)
                            }}
                            className="text-[10px] font-mono text-rose-600 hover:underline cursor-pointer"
                          >
                            Remover foto
                          </button>
                        )}
                      </div>

                      <label className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-stone-300 hover:border-stone-900 bg-white transition cursor-pointer text-center group">
                        <Upload className="w-5 h-5 text-stone-400 group-hover:text-stone-900 mb-1 transition" />
                        <span className="text-xs font-bold text-stone-900">
                          {customPhotoSrc ? 'Trocar foto enviada' : 'Clique para selecionar sua foto'}
                        </span>
                        <span className="text-[10px] text-stone-400 mt-0.5 font-mono">
                          JPG, PNG ou WEBP (Processamento 100% privado no navegador)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* TRATAMENTO HÍBRIDO (ZERO CUSTO DE API) */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block mb-2">
                        TRATAMENTO DE ESTÚDIO & FUSÃO DE FUNDO
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => handleApplyTreatment('organico')}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            photoTreatment === 'organico'
                              ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                              : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            <Sparkles className={`w-3.5 h-3.5 ${photoTreatment === 'organico' ? 'text-amber-400' : 'text-stone-500'}`} />
                            <span>Dissolução Orgânica</span>
                          </div>
                          <p className={`text-[10px] mt-1 leading-snug ${photoTreatment === 'organico' ? 'text-stone-300' : 'text-stone-500'}`}>
                            Funde suavemente a base na cor {selectedPalette.name}.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApplyTreatment('silhueta')}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            photoTreatment === 'silhueta'
                              ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                              : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            <Wand2 className={`w-3.5 h-3.5 ${photoTreatment === 'silhueta' ? 'text-amber-400' : 'text-stone-500'}`} />
                            <span>Silhueta Local</span>
                          </div>
                          <p className={`text-[10px] mt-1 leading-snug ${photoTreatment === 'silhueta' ? 'text-stone-300' : 'text-stone-500'}`}>
                            Realce nobre de contraste com bordas suaves.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApplyTreatment('original')}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            photoTreatment === 'original'
                              ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                              : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                          }`}
                        >
                          <div className="text-xs font-bold">Foto Original</div>
                          <p className={`text-[10px] mt-1 leading-snug ${photoTreatment === 'original' ? 'text-stone-300' : 'text-stone-500'}`}>
                            Sem gradiente ou corte adicional.
                          </p>
                        </button>
                      </div>
                    </div>

                    {isProcessingPhoto && (
                      <div className="text-[11px] font-mono text-amber-700 flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 animate-spin" />
                        <span>Processando no Canvas do navegador...</span>
                      </div>
                    )}

                    {/* MODELO DEMO CASO NÃO TENHA ENVIADO FOTO */}
                    {!customPhotoSrc && (
                      <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                        <span className="text-xs text-stone-500">Modelo demo:</span>
                        <button
                          type="button"
                          onClick={() => setDemoGender('mulher')}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                            demoGender === 'mulher' ? 'bg-black text-white' : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          Mulher
                        </button>
                        <button
                          type="button"
                          onClick={() => setDemoGender('homem')}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                            demoGender === 'homem' ? 'bg-black text-white' : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          Homem
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 6. SEUS BOTÕES */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'seus_botoes' ? null : 'seus_botoes')}
                  className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
                >
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-stone-600">
                    6. SEUS BOTÕES <span className="font-normal text-stone-400 ml-2">· {buttons.length} botões</span>
                  </span>
                  {openAccordion === 'seus_botoes' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {openAccordion === 'seus_botoes' && (
                  <div className="pt-3 pb-4 space-y-3.5 animate-fade-in">
                    <p className="text-[11px] text-stone-500">
                      Configure os botões de conversão. O modelo <strong>Cartão Nobre VIP</strong> exibe o título em destaque com subtítulo explicativo e seta para guiar o clique do paciente.
                    </p>

                    <div className="space-y-3">
                      {buttons.map((btn, idx) => (
                        <div key={btn.id} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono uppercase font-bold text-stone-400">
                              BOTÃO #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveButton(btn.id)}
                              className="text-stone-400 hover:text-rose-600 transition p-1 cursor-pointer"
                              title="Remover botão"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-mono uppercase text-stone-400 block font-bold mb-0.5">
                                TÍTULO EM CAIXA ALTA
                              </label>
                              <input
                                type="text"
                                value={btn.label}
                                onChange={(e) => {
                                  const up = [...buttons]
                                  up[idx].label = e.target.value.toUpperCase()
                                  setButtons(up)
                                  setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 font-bold font-mono text-xs uppercase"
                                placeholder="AGENDAMENTO"
                              />
                            </div>

                            <div>
                              <label className="text-[9px] font-mono uppercase text-stone-400 block font-bold mb-0.5">
                                ÍCONE DO CARTÃO
                              </label>
                              <select
                                value={btn.icon || 'calendar'}
                                onChange={(e) => {
                                  const up = [...buttons]
                                  up[idx].icon = e.target.value
                                  setButtons(up)
                                  setHasUnsavedChanges(true)
                                }}
                                className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1.5 text-xs cursor-pointer"
                              >
                                <option value="calendar">📅 Agendamento / Agenda</option>
                                <option value="map">📍 Localização / Como Chegar</option>
                                <option value="sparkles">✨ Casos Clínicos / Destaque</option>
                                <option value="whatsapp">💬 WhatsApp Direto</option>
                                <option value="instagram">📸 Instagram / Redes</option>
                                <option value="cardapio">📄 Catálogo / Cardápio</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-[9px] font-mono uppercase text-stone-400 block font-bold mb-0.5">
                              SUBTÍTULO EXPLICATIVO (EX: "ESCOLHA O MELHOR HORÁRIO PARA SUA CONSULTA.")
                            </label>
                            <input
                              type="text"
                              value={btn.subtitle || ''}
                              onChange={(e) => {
                                const up = [...buttons]
                                up[idx].subtitle = e.target.value
                                setButtons(up)
                                setHasUnsavedChanges(true)
                              }}
                              className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-600"
                              placeholder="Explique o que acontece ao tocar neste botão"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-mono uppercase text-stone-400 block font-bold mb-0.5">
                              LINK DE DESTINO OU NÚMERO DO WHATSAPP
                            </label>
                            <input
                              type="text"
                              value={btn.url}
                              onChange={(e) => {
                                const up = [...buttons]
                                up[idx].url = e.target.value
                                setButtons(up)
                                setHasUnsavedChanges(true)
                              }}
                              className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 font-mono text-[11px] text-stone-800"
                              placeholder="https://wa.me/5581987654321 ou link externo"
                            />
                          </div>

                          {/* DESTAQUE & SELO DO BOTÃO */}
                          <div className="pt-2 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!btn.isHighlighted}
                                onChange={(e) => {
                                  const up = [...buttons]
                                  up[idx].isHighlighted = e.target.checked
                                  if (e.target.checked && !up[idx].highlightBadge) {
                                    up[idx].highlightBadge = '⭐ MAIS ESCOLHIDO'
                                  }
                                  setButtons(up)
                                  setHasUnsavedChanges(true)
                                }}
                                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                              />
                              <span className="text-xs font-bold text-stone-800 flex items-center gap-1">
                                ⭐ Colocar este botão em destaque
                              </span>
                            </label>

                            {btn.isHighlighted && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-mono text-stone-400 uppercase">Selo:</span>
                                <select
                                  value={btn.highlightBadge || '⭐ MAIS ESCOLHIDO'}
                                  onChange={(e) => {
                                    const up = [...buttons]
                                    up[idx].highlightBadge = e.target.value
                                    setButtons(up)
                                    setHasUnsavedChanges(true)
                                  }}
                                  className="bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-bold text-amber-900 cursor-pointer"
                                >
                                  {HIGHLIGHT_BADGES.map((badge) => (
                                    <option key={badge} value={badge}>{badge}</option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleAddButton}
                      className="w-full py-2.5 rounded-xl border border-dashed border-stone-300 hover:border-stone-900 bg-white text-stone-800 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Novo Botão ({buttons.length}/20)
                    </button>
                  </div>
                )}
              </div>

              {/* 7. BOTÕES DO RODAPÉ */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'rodape' ? null : 'rodape')}
                  className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
                >
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-stone-600">
                    7. BOTÕES DO RODAPÉ <span className="font-normal text-stone-400 ml-2">· Automático</span>
                  </span>
                  {openAccordion === 'rodape' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {openAccordion === 'rodape' && (
                  <div className="pt-2 pb-3 text-xs text-stone-500 animate-fade-in">
                    As bolinhas de ícone no pé da página. Hoje o rodapé está no automático: ele pega os seus botões principais e gera os atalhos.
                  </div>
                )}
              </div>

              {/* 8. PROVA SOCIAL */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'prova_social' ? null : 'prova_social')}
                  className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
                >
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-stone-600">
                    8. PROVA SOCIAL <span className="font-normal text-stone-400 ml-2">· {rating} estrelas</span>
                  </span>
                  {openAccordion === 'prova_social' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>
              </div>

              {/* 9. SEU ENDEREÇO */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'endereco' ? null : 'endereco')}
                  className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
                >
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-stone-600">
                    9. SEU ENDEREÇO <span className="font-normal text-stone-400 ml-2">· /{slug}</span>
                  </span>
                  {openAccordion === 'endereco' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {openAccordion === 'endereco' && (
                  <div className="pt-2 pb-3 text-xs text-stone-500 font-mono animate-fade-in">
                    Este é o link que você divulga: <strong>{fullUrl}</strong>. Ele não muda por aqui para evitar quebrar links já divulgados.
                  </div>
                )}
              </div>

              {/* 10. MÓDULOS VIP DE CONVERSÃO (12 SEÇÕES INTELIGENTES) */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'modulos_vip' ? null : 'modulos_vip')}
                  className="w-full flex items-center justify-between py-2.5 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-amber-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      10. MÓDULOS VIP
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                      12 SEÇÕES INTELIGENTES
                    </span>
                  </div>
                  {openAccordion === 'modulos_vip' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {openAccordion === 'modulos_vip' && (
                  <div className="pt-2 pb-4">
                    {renderModulosVipEditor()}
                  </div>
                )}
              </div>

              {/* 11. PIXELS & RASTREAMENTO (META ADS, GA4, TIKTOK) */}
              <div className="border-b border-stone-200 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'pixel' ? null : 'pixel')}
                  className="w-full flex items-center justify-between py-2.5 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-900 group-hover:text-purple-800 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-purple-600" />
                      11. PIXELS & ANÚNCIOS
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold border border-purple-300">
                      META · GA4 · TIKTOK
                    </span>
                  </div>
                  {openAccordion === 'pixel' ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                </button>

                {openAccordion === 'pixel' && (
                  <div className="pt-2 pb-4">
                    {renderPixelEditor()}
                  </div>
                )}
              </div>
            </div>

            {/* COLUNA DIREITA: MOCKUP DO CELULAR "COMO VAI FICAR" E FORMULÁRIO RÁPIDO */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-stone-400 block mb-3 font-bold">
                COMO VAI FICAR
              </span>

              {/* IPHONE MOCKUP ATUALIZADO EM TEMPO REAL */}
              <div
                className="relative select-none mb-8"
                style={{ width: '280px', height: '580px' }}
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    borderRadius: '40px',
                    background: 'linear-gradient(145deg, #38383a 0%, #151516 35%, #2a2a2b 100%)',
                    boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)',
                    padding: '8.5px'
                  }}
                >
                  <div
                    className="relative h-full w-full overflow-hidden flex flex-col text-center"
                    style={{
                      borderRadius: '32px',
                      backgroundColor: selectedPalette.bg,
                      color: selectedPalette.text
                    }}
                  >
                    {/* Barra Superior com Ilha Dinâmica e Registro Profissional */}
                    <div className="relative z-20 pt-2 px-3 flex items-center justify-between text-[7px] font-mono tracking-widest text-stone-400 uppercase">
                      <div className="w-12 h-3 bg-black rounded-full" />
                      <span className="font-bold opacity-80">{registrationCode}</span>
                    </div>

                    {/* Foto da Pessoa com dissolução híbrida */}
                    <div className="relative w-full h-44 overflow-hidden -mt-3 select-none shrink-0">
                      <img
                        src={customPhotoSrc || (demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {photoTreatment !== 'original' && (
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: `linear-gradient(to bottom, transparent 35%, ${selectedPalette.bg} 98%)`
                          }}
                        />
                      )}
                    </div>

                    {/* Conteúdo Central */}
                    <div className="px-4 pt-0.5 flex-1 flex flex-col items-center">
                      <h3
                        className="font-bold text-lg leading-tight"
                        style={{ fontFamily: selectedTypography.cssFont }}
                      >
                        {businessTitle || brandName}
                      </h3>
                      <p className="text-[8px] uppercase tracking-[0.2em] font-mono mt-0.5 opacity-70">
                        {niche}
                      </p>

                      {/* Selo Google */}
                      <div className="mt-0.5 text-amber-400 text-[9px]">
                        ★★★★★ <span className="font-mono text-[8px] opacity-80">{rating} ({reviewsCount})</span>
                      </div>

                      {/* Pílulas das Páginas Adicionais Pro */}
                      {additionalPages.length > 0 && (
                        <div className="flex items-center justify-center gap-1 mt-1 mb-0.5 flex-wrap">
                          {additionalPages.slice(0, 3).map((p) => (
                            <span
                              key={p.id}
                              className="px-2 py-0.5 rounded-full text-[6px] font-mono tracking-wider uppercase border border-white/10 bg-white/5 opacity-80"
                              style={{ color: selectedPalette.accent }}
                            >
                              {p.title.split(' ')[0]}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Botões do Mockup */}
                      <div className="w-full space-y-1.5 mt-1.5">
                        {buttons.map((btn) => {
                          const isHigh = !!btn.isHighlighted
                          const animClass = buttonAnimation === 'pulse' || (isHigh && buttonAnimation === 'none')
                            ? 'btn-anim-pulse'
                            : buttonAnimation === 'bounce'
                            ? 'btn-anim-bounce'
                            : buttonAnimation === 'glow' || isHigh
                            ? 'btn-anim-glow'
                            : ''

                          const isShimmer = buttonAnimation === 'shimmer' || buttonStyle === 'shimmer_ouro' || isHigh

                          // Estilização dinâmica com suporte total aos 10 modelos VIP de botões
                          let cardBg: string = selectedPalette.card || '#14161c'
                          let cardBorder: string = isHigh ? selectedPalette.accent : `${selectedPalette.accent}33`
                          let cardRadius: string = '12px'
                          let cardShadow: string = '0 4px 12px rgba(0,0,0,0.35)'
                          let cardBackdrop: string | undefined = undefined
                          let textColor: string = selectedPalette.text
                          let iconBg: string = `${selectedPalette.accent}18`
                          let iconBorder: string = `${selectedPalette.accent}40`
                          let iconColor: string = selectedPalette.accent
                          let iconRadius: string = '8px'
                          let arrowColor: string = selectedPalette.accent

                          if (buttonStyle === 'vidro_glamour' || buttonStyle === 'vidro') {
                            cardBg = 'rgba(255, 255, 255, 0.08)'
                            cardBorder = 'rgba(255, 255, 255, 0.2)'
                            cardShadow = '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.2)'
                            cardBackdrop = 'blur(12px)'
                            iconBg = 'rgba(255, 255, 255, 0.12)'
                            iconBorder = 'rgba(255, 255, 255, 0.25)'
                          } else if (buttonStyle === 'aurora_glow') {
                            cardBorder = selectedPalette.accent
                            cardShadow = `0 0 16px ${selectedPalette.accent}66, inset 0 0 8px ${selectedPalette.accent}20`
                            iconBg = `${selectedPalette.accent}25`
                            iconBorder = selectedPalette.accent
                          } else if (buttonStyle === 'neomorfico_dark') {
                            cardBg = 'linear-gradient(145deg, #1c1e24, #101216)'
                            cardBorder = 'rgba(255,255,255,0.06)'
                            cardShadow = '5px 5px 12px rgba(0,0,0,0.7), -3px -3px 8px rgba(255,255,255,0.03)'
                            iconBg = 'rgba(0,0,0,0.35)'
                            iconBorder = 'rgba(255,255,255,0.06)'
                          } else if (buttonStyle === 'shimmer_ouro') {
                            cardBorder = selectedPalette.accent
                            cardShadow = `0 6px 18px rgba(0,0,0,0.45), 0 0 10px ${selectedPalette.accent}33`
                            iconBg = `${selectedPalette.accent}22`
                            iconBorder = `${selectedPalette.accent}60`
                          } else if (buttonStyle === 'bicolor_luxo') {
                            cardBg = `linear-gradient(135deg, ${selectedPalette.card} 0%, ${selectedPalette.bg} 100%)`
                            cardBorder = `${selectedPalette.accent}55`
                            cardShadow = '0 6px 16px rgba(0,0,0,0.35)'
                            iconBg = `${selectedPalette.accent}20`
                            iconBorder = `${selectedPalette.accent}44`
                          } else if (buttonStyle === 'flutuante_elevado' || buttonStyle === 'sombra') {
                            cardBorder = 'rgba(255,255,255,0.1)'
                            cardShadow = '0 14px 26px -4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.4)'
                            iconBg = `${selectedPalette.accent}18`
                            iconBorder = `${selectedPalette.accent}33`
                          } else if (buttonStyle === 'solido_glam' || buttonStyle === 'solido') {
                            cardBg = selectedPalette.accent
                            textColor = selectedPalette.buttonText || '#000000'
                            cardBorder = 'rgba(255,255,255,0.4)'
                            cardShadow = `0 8px 20px -3px ${selectedPalette.accent}66`
                            iconBg = 'rgba(0,0,0,0.14)'
                            iconBorder = 'rgba(0,0,0,0.2)'
                            iconColor = selectedPalette.buttonText || '#000000'
                            arrowColor = selectedPalette.buttonText || '#000000'
                          } else if (buttonStyle === 'pill_couture' || buttonStyle === 'pill') {
                            cardRadius = '9999px'
                            cardBorder = `${selectedPalette.accent}44`
                            iconRadius = '9999px'
                            cardShadow = '0 6px 16px rgba(0,0,0,0.3)'
                          } else if (buttonStyle === 'moldura_fina' || buttonStyle === 'moldura') {
                            cardBg = 'transparent'
                            cardBorder = `${selectedPalette.accent}88`
                            cardShadow = 'none'
                            cardRadius = '10px'
                            iconBg = `${selectedPalette.accent}12`
                            iconBorder = `${selectedPalette.accent}33`
                          }

                          return (
                            <div
                              key={btn.id}
                              className={`w-full p-2 transition flex items-center justify-between text-left relative overflow-hidden ${animClass}`}
                              style={{
                                background: cardBg,
                                borderColor: cardBorder,
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                borderRadius: cardRadius,
                                boxShadow: cardShadow,
                                backdropFilter: cardBackdrop,
                                WebkitBackdropFilter: cardBackdrop,
                                color: textColor
                              }}
                            >
                              {/* Efeito Sweep / Shimmer se selecionado ou se destacado */}
                              {isShimmer && (
                                <div
                                  className="absolute inset-0 overflow-hidden pointer-events-none"
                                  style={{ borderRadius: cardRadius }}
                                >
                                  <div
                                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                                    style={{ animation: 'btn-shimmer-sweep 2.8s infinite' }}
                                  />
                                </div>
                              )}

                              {/* Selo Flutuante de Destaque */}
                              {isHigh && (
                                <div
                                  className="absolute -top-1.5 right-2 px-1.5 py-0.2 rounded-full text-[6.5px] font-mono font-bold uppercase shadow-sm flex items-center gap-0.5 z-10 border"
                                  style={{
                                    backgroundColor: selectedPalette.accent,
                                    color: selectedPalette.buttonText || '#000',
                                    borderColor: 'rgba(255,255,255,0.4)'
                                  }}
                                >
                                  {btn.highlightBadge || '⭐ MAIS ESCOLHIDO'}
                                </div>
                              )}

                              <div className="flex items-center gap-2 overflow-hidden relative z-10">
                                <div
                                  className="w-5 h-5 flex items-center justify-center shrink-0 border"
                                  style={{
                                    backgroundColor: iconBg,
                                    borderColor: iconBorder,
                                    borderRadius: iconRadius,
                                    color: iconColor
                                  }}
                                >
                                  {btn.icon === 'calendar' ? <Calendar className="w-2.5 h-2.5" /> : btn.icon === 'map' ? <MapPin className="w-2.5 h-2.5" /> : <Sparkles className="w-2.5 h-2.5" />}
                                </div>
                                <div className="overflow-hidden">
                                  <div
                                    className="text-[9px] font-bold font-mono uppercase tracking-wider truncate"
                                    style={{ color: textColor }}
                                  >
                                    {btn.label}
                                  </div>
                                  <div className="text-[7.5px] truncate leading-tight opacity-70" style={{ color: textColor }}>
                                    {btn.subtitle || 'Toque para abrir'}
                                  </div>
                                </div>
                              </div>
                              <ArrowRight
                                className="w-2.5 h-2.5 shrink-0 ml-1 relative z-10"
                                style={{ color: arrowColor }}
                              />
                            </div>
                          )
                        })}
                      </div>

                      {/* Monograma de rodapé */}
                      <div className="pt-2 pb-1 text-center flex flex-col items-center">
                        <div className="w-8 h-px bg-amber-400/30 mb-0.5" />
                        <span className="font-serif italic text-amber-300/80 text-[10px]">
                          {monogram}
                        </span>
                      </div>
                    </div>

                    {/* Barra Home */}
                    <div
                      className="absolute left-1/2 bottom-2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/40 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* CAMPOS DE EDIÇÃO RÁPIDA ABAIXO DO IPHONE (EXATAMENTE COMO NA IMAGEM 2) */}
              <div className="w-full max-w-[320px] space-y-4">
                {aiFillSuccess && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-1.5 animate-fade-in">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Bio Site preenchido com IA de alta conversão!
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block mb-1">
                    NOME NA TELA
                  </label>
                  <input
                    type="text"
                    value={businessTitle}
                    onChange={(e) => {
                      setBusinessTitle(e.target.value)
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 bg-white font-medium focus:outline-hidden focus:border-stone-900"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block">
                      PROFISSÃO OU SEGMENTO
                    </label>
                    <button
                      type="button"
                      onClick={handleAiAutoFill}
                      title="Preenche paleta, fonte, botões e copy persuasiva deste nicho"
                      className="text-[10px] font-mono uppercase font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer bg-amber-100/80 hover:bg-amber-200/90 border border-amber-300 px-2 py-0.5 rounded-md transition"
                    >
                      <Sparkles className="w-3 h-3 text-amber-700" /> Preencher com IA
                    </button>
                  </div>
                  <select
                    value={niche}
                    onChange={(e) => {
                      setNiche(e.target.value)
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 bg-white font-medium focus:outline-hidden focus:border-stone-900"
                  >
                    {NICHES_LIST.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                      FRASE (OPCIONAL)
                    </label>
                    <span className="text-[10px] font-mono text-stone-400">
                      {tagline.length}/140
                    </span>
                  </div>
                  <input
                    type="text"
                    value={tagline}
                    maxLength={140}
                    onChange={(e) => {
                      setTagline(e.target.value)
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 bg-white font-medium focus:outline-hidden focus:border-stone-900"
                  />
                </div>

                {/* BOTÃO SALVAR ALTERAÇÕES */}
                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={handleSavePage}
                    className="w-full py-3.5 rounded-full bg-black hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-md"
                  >
                    SALVAR ALTERAÇÕES
                  </button>

                  {hasUnsavedChanges && (
                    <p className="text-[11px] text-amber-700 text-center font-mono">
                      Você tem alterações que ainda não estão no ar.
                    </p>
                  )}

                  <a
                    href={`/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full border border-stone-300 hover:border-stone-900 text-stone-800 text-xs font-bold uppercase tracking-wider transition cursor-pointer text-center block"
                  >
                    ABRIR MINHA PÁGINA
                  </a>
                </div>
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

      {/* MODAL PIX */}
      {pixModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setPixModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-900 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block mb-1">
                RENOVAÇÃO DE ANUIDADE
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Plano Pro · R$ 290,00
              </h3>
            </div>

            <div className="flex justify-center">
              <div className="p-3 bg-white rounded-2xl border-2 border-stone-900 shadow-md">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=00020126580014br.gov.bcb.pix0136pix%40biovip.com.br5204000053039865406290.005802BR5916BIOVIP%20BRASIL6009SAO%20PAULO62070503***6304E1D2"
                  alt="QR Code Pix"
                  className="w-44 h-44 rounded-xl"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136pix@biovip.com.br5204000053039865406290.005802BR5916BIOVIP BRASIL6009SAO PAULO62070503***6304E1D2')
                setPixCopied(true)
                setTimeout(() => setPixCopied(false), 2000)
              }}
              className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              {pixCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {pixCopied ? 'Chave Copiada com Sucesso!' : 'Copiar Chave Pix'}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

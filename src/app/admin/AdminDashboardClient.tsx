'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Subscription,
  SubscriptionStatus,
  BillingCycle,
  PaymentMethod,
  PaymentRecord,
  initialSubscriptions
} from '@/data/subscriptions'
import { Project, projects as defaultProjects } from '@/data/projects'
import { PALETTES, TYPOGRAPHIES, DEMO_PHOTOS, BUTTON_STYLES } from '@/data/bioSiteDesign'
import {
  BarChart3,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  ExternalLink,
  MessageCircle,
  Mail,
  Copy,
  QrCode,
  DollarSign,
  Calendar,
  Lock,
  Unlock,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  Download,
  Settings,
  CreditCard,
  Edit2,
  Trash2,
  X,
  Wand2,
  Zap,
  Database,
  Key,
  Check,
  CopyCheck,
  ArrowUpDown,
  Layers,
  PieChart,
  FileText,
  Printer,
  UploadCloud,
  Bot
} from 'lucide-react'
import Link from 'next/link'
import { getLeads, LeadSubmission, saveBioSite } from '@/services/biositeService'

const MASTER_PIN = '2026'

export default function AdminDashboardClient() {
  // Autenticação simples por PIN
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [pinInput, setPinInput] = useState<string>('')
  const [pinError, setPinError] = useState<string | null>(null)

  // Dados das assinaturas
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('todos')
  const [planFilter, setPlanFilter] = useState<string>('todos')
  const [cycleFilter, setCycleFilter] = useState<string>('todos')
  const [bioSiteTypeFilter, setBioSiteTypeFilter] = useState<'todos' | 'modelos' | 'clientes'>('todos')

  // Abas do painel
  const [activeTab, setActiveTab] = useState<'assinaturas' | 'vencimentos' | 'gateways' | 'metricas' | 'portfolio' | 'leads'>('assinaturas')
  const [allLeads, setAllLeads] = useState<LeadSubmission[]>([])
  const [leadClientFilter, setLeadClientFilter] = useState<string>('todos')
  const [leadActionFilter, setLeadActionFilter] = useState<string>('todos')
  const [loadingAllLeads, setLoadingAllLeads] = useState<boolean>(false)

  // Portfólio & Vitrine de Modelos
  const [portfolioList, setPortfolioList] = useState<Project[]>(defaultProjects)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false)
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState<boolean>(false)
  const [portfolioSuccessToast, setPortfolioSuccessToast] = useState<string | null>(null)

  // Ordenação das assinaturas
  const [sortBy, setSortBy] = useState<'recentes' | 'vencimento' | 'valor' | 'views' | 'nome'>('recentes')

  // Clonar modelo para novo cliente (1-Click Generator)
  const [isCloneModalOpen, setIsCloneModalOpen] = useState<boolean>(false)
  const [cloneSourceSlug, setCloneSourceSlug] = useState<string>('dra-ana-freire')

  // QR Code do Bio Site (Display de Balcão / Cartão)
  const [qrModalSite, setQrModalSite] = useState<{ name: string; slug: string; url: string; category?: string } | null>(null)
  const [qrCopied, setQrCopied] = useState<boolean>(false)

  // Backup & Restauração
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false)

  // Importação com IA Gemini (Script Oficial BioVip)
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState<boolean>(false)
  const [geminiJsonInput, setGeminiJsonInput] = useState<string>('')
  const [geminiError, setGeminiError] = useState<string | null>(null)

  // Alteração de PIN
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false)
  const [newPinInput, setNewPinInput] = useState<string>('')
  const [pinSuccessToast, setPinSuccessToast] = useState<string | null>(null)

  // Toast de Confirmação de Pagamento
  const [paymentSuccessToast, setPaymentSuccessToast] = useState<string | null>(null)

  // Templates de Mensagens WhatsApp
  const [msgCobrancaTemplate, setMsgCobrancaTemplate] = useState<string>(
    'Olá {cliente}! A anuidade do seu Bio Site ({empresa}) venceu em {vencimento}. Para manter sua página e domínio no ar, segue a Chave Pix: {pix} no valor de R$ {valor},00.'
  )
  const [msgBoasVindasTemplate, setMsgBoasVindasTemplate] = useState<string>(
    'Olá {cliente}! Seu Bio Site exclusivo ({empresa}) está publicado e no ar com sucesso! Acesse aqui: {url}. Estamos à disposição!'
  )

  // Modais
  const [editingSub, setEditingSub] = useState<Subscription | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [pixModalSub, setPixModalSub] = useState<Subscription | null>(null)
  const [pixCopied, setPixCopied] = useState<boolean>(false)

  // Configurações do Gateway
  const [pixKey, setPixKey] = useState<string>('12.345.678/0001-90')
  const [gatewayProvider, setGatewayProvider] = useState<'asaas' | 'stripe' | 'mercadopago'>('asaas')
  const [apiKey, setApiKey] = useState<string>('live_sk_849204820194820194820')
  const [webhookStatus, setWebhookStatus] = useState<boolean>(true)

  // Carregar do localStorage se existir (com merge para garantir clientes reais no estúdio)
  useEffect(() => {
    const savedPinAuth = sessionStorage.getItem('biovip_admin_auth')
    if (savedPinAuth === 'true') {
      setIsAuthenticated(true)
    }

    const savedSubs = localStorage.getItem('biovip_subscriptions')
    if (savedSubs) {
      try {
        const parsed: Subscription[] = JSON.parse(savedSubs)
        const existingSlugs = new Set(parsed.map((s: any) => s.slug))
        const missing = initialSubscriptions.filter(s => !existingSlugs.has(s.slug))
        const merged = [...parsed, ...missing]
        setSubscriptions(merged)
        localStorage.setItem('biovip_subscriptions', JSON.stringify(merged))
      } catch (e) {
        console.error(e)
        setSubscriptions(initialSubscriptions)
        localStorage.setItem('biovip_subscriptions', JSON.stringify(initialSubscriptions))
      }
    } else {
      setSubscriptions(initialSubscriptions)
      localStorage.setItem('biovip_subscriptions', JSON.stringify(initialSubscriptions))
    }

    const savedProjects = localStorage.getItem('biovip_portfolio_projects')
    if (savedProjects) {
      try {
        const parsed: Project[] = JSON.parse(savedProjects)
        const existingSlugs = new Set(parsed.map((p: any) => p.slug))
        const missing = defaultProjects.filter(p => !existingSlugs.has(p.slug))
        const merged = [...parsed, ...missing]
        setPortfolioList(merged)
        localStorage.setItem('biovip_portfolio_projects', JSON.stringify(merged))
      } catch (e) {
        console.error(e)
        setPortfolioList(defaultProjects)
      }
    } else {
      setPortfolioList(defaultProjects)
      localStorage.setItem('biovip_portfolio_projects', JSON.stringify(defaultProjects))
    }
  }, [])

  // Salvar no localStorage sempre que mudar
  const saveSubscriptions = (newSubs: Subscription[]) => {
    setSubscriptions(newSubs)
    localStorage.setItem('biovip_subscriptions', JSON.stringify(newSubs))
  }

  const savePortfolioList = (newList: Project[]) => {
    setPortfolioList(newList)
    localStorage.setItem('biovip_portfolio_projects', JSON.stringify(newList))
  }

  // Handler de login com PIN
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const storedPin = typeof window !== 'undefined' ? (localStorage.getItem('biovip_admin_pin') || MASTER_PIN) : MASTER_PIN
    if (pinInput === storedPin || pinInput === MASTER_PIN) {
      setIsAuthenticated(true)
      sessionStorage.setItem('biovip_admin_auth', 'true')
      setPinError(null)
    } else {
      setPinError('PIN incorreto. Digite o código de 4 a 6 dígitos cadastrado.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('biovip_admin_auth')
    setPinInput('')
  }

  // Cálculos de Métricas Financeiras (Modelos de portfólio e demos NÃO geram receita/MRR)
  const metrics = useMemo(() => {
    const realSubs = subscriptions.filter(s => !s.isDemo && !s.isPortfolioModel)
    const ativas = realSubs.filter(s => s.status === 'ativa')
    const atrasadas = realSubs.filter(s => s.status === 'atrasada')
    const pendentes = realSubs.filter(s => s.status === 'pendente')
    const canceladas = realSubs.filter(s => s.status === 'cancelada')

    // MRR = assinaturas ativas mensais + (anuais / 12)
    const mrr = ativas.reduce((acc, sub) => {
      if (sub.cycle === 'mensal') {
        return acc + sub.amount
      } else {
        return acc + Math.round(sub.amount / 12)
      }
    }, 0)

    const arr = mrr * 12

    // Total inadimplente a recuperar
    const valorAtrasado = atrasadas.reduce((acc, sub) => acc + sub.amount, 0)
    const valorPendente = pendentes.reduce((acc, sub) => acc + sub.amount, 0)

    // Total de acessos gerenciados
    const totalViews = realSubs.reduce((acc, sub) => acc + sub.viewsCount, 0)

    return {
      total: realSubs.length,
      ativasCount: ativas.length,
      atrasadasCount: atrasadas.length,
      pendentesCount: pendentes.length,
      canceladasCount: canceladas.length,
      mrr,
      arr,
      valorAtrasado,
      valorPendente,
      totalViews,
      taxaRetencao: realSubs.length > 0
        ? Math.round((ativas.length / realSubs.length) * 100)
        : 100
    }
  }, [subscriptions])

  // Filtragem
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter(sub => {
      const matchesSearch =
        sub.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.whatsapp.includes(searchTerm)

      const matchesStatus = statusFilter === 'todos' || sub.status === statusFilter
      const matchesPlan = planFilter === 'todos' || sub.planId === planFilter
      const matchesCycle = cycleFilter === 'todos' || sub.cycle === cycleFilter

      return matchesSearch && matchesStatus && matchesPlan && matchesCycle
    })
  }, [subscriptions, searchTerm, statusFilter, planFilter, cycleFilter])

  // Ordenação das Assinaturas
  const sortedSubscriptions = useMemo(() => {
    const list = [...filteredSubscriptions]
    if (sortBy === 'vencimento') {
      return list.sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())
    }
    if (sortBy === 'valor') {
      return list.sort((a, b) => b.amount - a.amount)
    }
    if (sortBy === 'views') {
      return list.sort((a, b) => b.viewsCount - a.viewsCount)
    }
    if (sortBy === 'nome') {
      return list.sort((a, b) => a.clientName.localeCompare(b.clientName))
    }
    // padrão: 'recentes'
    return list.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
  }, [filteredSubscriptions, sortBy])

  // Métricas de Nichos e Categorias para aba Métricas
  const nicheMetrics = useMemo(() => {
    const counts: Record<string, { count: number; totalViews: number; totalClicks: number }> = {}
    const allSites = [...portfolioList, ...subscriptions]
    allSites.forEach(site => {
      const niche = (site as any).category || (site as any).role || (site as any).niche || 'Outros'
      const views = (site as any).viewsCount || parseInt(String((site as any).stats?.views || '0').replace(/\D/g, '')) * 1000 || 1200
      const clicks = (site as any).clicksCount || parseInt(String((site as any).stats?.clicks || '0').replace(/\D/g, '')) * 1000 || 450
      if (!counts[niche]) {
        counts[niche] = { count: 0, totalViews: 0, totalClicks: 0 }
      }
      counts[niche].count += 1
      counts[niche].totalViews += views
      counts[niche].totalClicks += clicks
    })
    const total = allSites.length || 1
    return Object.entries(counts)
      .map(([niche, data]) => ({
        niche,
        count: data.count,
        totalViews: data.totalViews,
        totalClicks: data.totalClicks,
        percentage: Math.round((data.count / total) * 100),
        conversionRate: data.totalViews > 0 ? ((data.totalClicks / data.totalViews) * 100).toFixed(1) + '%' : '32.5%'
      }))
      .sort((a, b) => b.count - a.count)
  }, [portfolioList, subscriptions])

  // Mix de Planos
  const planDistribution = useMemo(() => {
    const starter = subscriptions.filter(s => s.planId === 'starter')
    const pro = subscriptions.filter(s => s.planId === 'pro')
    const agency = subscriptions.filter(s => s.planId === 'agency')
    const total = subscriptions.length || 1

    return {
      starter: { count: starter.length, percent: Math.round((starter.length / total) * 100), mrr: starter.reduce((a, b) => a + b.amount, 0) },
      pro: { count: pro.length, percent: Math.round((pro.length / total) * 100), mrr: pro.reduce((a, b) => a + (b.cycle === 'anual' ? Math.round(b.amount / 12) : b.amount), 0) },
      agency: { count: agency.length, percent: Math.round((agency.length / total) * 100), mrr: agency.reduce((a, b) => a + b.amount, 0) }
    }
  }, [subscriptions])

  // Ranking Top Sites
  const topSites = useMemo(() => {
    const list = subscriptions.map(s => ({
      name: s.businessName || s.clientName,
      niche: s.niche,
      slug: s.slug,
      views: s.viewsCount || 1840,
      clicks: s.clicksCount || 620,
      conversion: s.viewsCount > 0 ? ((s.clicksCount / s.viewsCount) * 100).toFixed(1) + '%' : '33.7%',
      status: s.status
    }))
    return list.sort((a, b) => b.views - a.views).slice(0, 5)
  }, [subscriptions])

  // Confirmar Pagamento Pix com 1 Clique (Quitar / Renovar)
  const handleConfirmPayment = (subId: string) => {
    const today = new Date().toISOString().split('T')[0]
    let paidAmount = 0
    let clientName = ''
    const updated = subscriptions.map(sub => {
      if (sub.id === subId) {
        paidAmount = sub.amount
        clientName = sub.businessName || sub.clientName
        const currentNext = new Date(sub.nextBillingDate)
        const validDate = isNaN(currentNext.getTime()) ? new Date() : currentNext
        const addDays = sub.cycle === 'anual' ? 365 : 30
        validDate.setDate(validDate.getDate() + addDays)
        const newBillingDate = validDate.toISOString().split('T')[0]

        const newPayment: PaymentRecord = {
          id: `pay-${Date.now().toString().slice(-4)}`,
          date: today,
          amount: sub.amount,
          method: 'pix',
          status: 'pago'
        }

        return {
          ...sub,
          status: 'ativa' as SubscriptionStatus,
          lastPaymentDate: today,
          nextBillingDate: newBillingDate,
          payments: [newPayment, ...(sub.payments || [])]
        }
      }
      return sub
    })

    saveSubscriptions(updated)
    setPaymentSuccessToast(`Pagamento Pix de R$ ${paidAmount},00 (${clientName}) confirmado com sucesso! Vencimento renovado.`)
    setTimeout(() => setPaymentSuccessToast(null), 4000)
  }

  // Clonar Modelo para Novo Cliente
  const handleCloneModel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const sourceSlug = formData.get('sourceSlug') as string
    const clientName = formData.get('clientName') as string
    const businessName = formData.get('businessName') as string
    const whatsapp = (formData.get('whatsapp') as string).replace(/\D/g, '')
    const email = formData.get('email') as string
    const newSlug = (formData.get('slug') as string).toLowerCase().trim().replace(/[^a-z0-9-]/g, '-')
    const planId = formData.get('planId') as 'starter' | 'pro' | 'agency'
    const cycle = formData.get('cycle') as BillingCycle
    const amount = Number(formData.get('amount'))

    if (subscriptions.some(s => s.slug === newSlug)) {
      alert(`O slug "${newSlug}" já está em uso por outro cliente. Por favor, escolha outro.`)
      return
    }

    const sourceProject = portfolioList.find(p => p.slug === sourceSlug) || defaultProjects.find(p => p.slug === sourceSlug)

    const newSub: Subscription = {
      id: `sub-${Date.now().toString().slice(-4)}`,
      clientName,
      businessName,
      email,
      whatsapp,
      niche: sourceProject?.role || sourceProject?.category || 'Profissional',
      slug: newSlug,
      planId,
      planName: planId === 'starter' ? 'Iniciante' : planId === 'pro' ? 'Profissional' : 'Agência',
      cycle,
      amount,
      status: 'ativa',
      paymentMethod: 'pix',
      startDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + (cycle === 'anual' ? 365 : 30) * 86400000).toISOString().split('T')[0],
      bioSiteUrl: `https://biovip.com.br/${newSlug}`,
      viewsCount: 0,
      clicksCount: 0,
      notes: `Bio Site clonado a partir do template "${sourceProject?.name || sourceSlug}".`,
      payments: [
        {
          id: `pay-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString().split('T')[0],
          amount,
          method: 'pix',
          status: 'pago'
        }
      ]
    }

    // Clonar configuração visual em biovip_site_<newSlug>
    const sourceSiteRaw = localStorage.getItem('biovip_site_' + sourceSlug)
    const sourceSite = sourceSiteRaw ? JSON.parse(sourceSiteRaw) : null

    const newSiteData = {
      slug: newSlug,
      name: businessName || clientName,
      role: sourceProject?.role || sourceSite?.role || 'Profissional',
      category: sourceProject?.category || sourceSite?.category || 'Saúde & Estética',
      registrationCode: sourceProject?.registrationCode || sourceSite?.registrationCode || 'REGISTRO ATIVO',
      monogram: clientName.split(' ').map(n => n[0]).slice(0, 2).join(''),
      photo: sourceProject?.photo || sourceSite?.photo || DEMO_PHOTOS.mulher,
      paletteId: sourceProject?.paletteId || sourceSite?.paletteId || 'luxo_nude',
      typographyId: sourceProject?.typographyId || sourceSite?.typographyId || 'instrument',
      buttonStyle: sourceProject?.buttonStyle || sourceSite?.buttonStyle || 'cartao_nobre',
      buttonAnimation: sourceProject?.buttonAnimation || sourceSite?.buttonAnimation || 'none',
      buttons: sourceProject?.buttons || sourceSite?.buttons || [],
      whatsapp,
      subpages: sourceProject?.subpages || sourceSite?.subpages || []
    }

    try {
      localStorage.setItem('biovip_site_' + newSlug, JSON.stringify(newSiteData))
      if (sourceProject?.subpages) {
        localStorage.setItem('biovip_site_' + newSlug + '_pages', JSON.stringify(sourceProject.subpages))
      }
    } catch (e) {
      console.error(e)
    }

    saveSubscriptions([newSub, ...subscriptions])
    setIsCloneModalOpen(false)
    setPortfolioSuccessToast(`Bio Site de "${businessName}" clonado e ativado com sucesso!`)
    setTimeout(() => setPortfolioSuccessToast(null), 4000)
  }

  // Importar Microsite via JSON do Gemini (Script Oficial BioVip)
  const handleImportGemini = () => {
    if (!geminiJsonInput.trim()) return
    try {
      let cleanJson = geminiJsonInput.trim()
      if (cleanJson.startsWith('```json')) {
        cleanJson = cleanJson.replace(/^```json/, '').replace(/```$/, '').trim()
      } else if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```/, '').replace(/```$/, '').trim()
      }
      const data = JSON.parse(cleanJson)
      const admin = data.adminClient || data.admin || {}
      const micro = data.microsite || data.site || {}
      const profile = micro.profile || {}
      const newSlug = (admin.subdomain || profile.instagram || 'cliente-' + Date.now().toString().slice(-4))
        .toLowerCase().trim().replace(/[^a-z0-9-]/g, '-')

      if (subscriptions.some(s => s.slug === newSlug)) {
        setGeminiError(`O slug "${newSlug}" já está em uso por outro cliente. Altere o subdomain no JSON.`)
        return
      }

      const clientName = admin.clientName || profile.name || 'Novo Cliente VIP'
      const businessName = profile.name || admin.clientName || 'Empresa VIP'
      const phone = (admin.clientPhone || profile.whatsapp || '').replace(/\D/g, '')

      // Resolução inteligente de paleta
      const THEME_MAP: Record<string, string> = {
        roseGoldQuartz: 'rose_quartz',
        rose_gold: 'rose_quartz',
        rosegold: 'rose_quartz',
        goldVip: 'dourado_vip',
        gold: 'dourado_vip',
        ouro: 'dourado_vip',
        dourado: 'dourado_vip',
        emerald: 'esmeralda_ouro',
        esmeralda: 'esmeralda_ouro',
        black: 'black_ultra',
        blackTitanium: 'black_ultra',
        dark: 'black_ultra',
        safira: 'safira_ouro',
        sapphire: 'safira_ouro',
        nude: 'luxo_nude',
        champagne: 'luxo_nude'
      }
      const resolvedPaletteId = THEME_MAP[micro.theme || micro.paletteId] || micro.theme || micro.paletteId || 'luxo_nude'

      // Fotos temáticas em alta resolução de fallback no Unsplash
      const FALLBACK_GALLERY_BY_NICHE: Record<string, string[]> = {
        beleza: [
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80'
        ],
        barbearia: [
          'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80'
        ],
        saude: [
          'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
        ]
      }

      const nicheLower = (admin.nicheCategory || profile.title || '').toLowerCase()
      const fallbackGallery = nicheLower.includes('barb')
        ? FALLBACK_GALLERY_BY_NICHE.barbearia
        : nicheLower.includes('odonto') || nicheLower.includes('medic') || nicheLower.includes('saud')
        ? FALLBACK_GALLERY_BY_NICHE.saude
        : FALLBACK_GALLERY_BY_NICHE.beleza

      const galleryPhotosList = micro.galleryPhotos || micro.portfolioGallery?.items || micro.galleryPhotosList || fallbackGallery

      const newSub: Subscription = {
        id: `sub-${Date.now().toString().slice(-4)}`,
        clientName,
        businessName,
        email: admin.clientEmail || 'contato@cliente.com.br',
        whatsapp: phone,
        niche: admin.nicheCategory || profile.title || 'Serviços de Luxo',
        slug: newSlug,
        planId: 'pro',
        planName: 'Profissional',
        cycle: 'mensal',
        amount: admin.monthlyFee || 49.90,
        status: 'ativa',
        paymentMethod: 'pix',
        startDate: new Date().toISOString().split('T')[0],
        nextBillingDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        bioSiteUrl: `https://biovip.com.br/${newSlug}`,
        viewsCount: 0,
        clicksCount: 0,
        notes: 'Gerado via IA / Script Gemini Oficial BioVip.',
        payments: [
          {
            id: `pay-${Date.now().toString().slice(-4)}`,
            date: new Date().toISOString().split('T')[0],
            amount: admin.creationFee || 79.90,
            method: 'pix',
            status: 'pago'
          }
        ]
      }

      // Normalização completa dos botões nobres de ação
      const rawActionCards = micro.actionCards || micro.buttons || []
      const defaultButtons = [
        {
          id: 'btn-1',
          label: 'AGENDAMENTO VIP',
          subtitle: 'Atendimento exclusivo com reserva prioritária.',
          icon: 'calendar',
          url: `https://wa.me/${phone}?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário com ${businessName}.`)}`,
          isHighlighted: true,
          highlightBadge: '⭐ MAIS PROCURADO'
        },
        {
          id: 'btn-2',
          label: 'CATÁLOGO DE SERVIÇOS',
          subtitle: 'Conheça nossos procedimentos e valores.',
          icon: 'sparkles',
          url: '#catalogo'
        },
        {
          id: 'btn-3',
          label: 'COMO CHEGAR (LOCALIZAÇÃO)',
          subtitle: 'Rotas pelo Google Maps e Waze.',
          icon: 'map',
          url: micro.locationCard?.mapsUrl || '#localizacao'
        }
      ]

      const formattedButtons = rawActionCards.length > 0
        ? rawActionCards.map((c: any, i: number) => ({
            id: c.id || `btn-${i + 1}`,
            label: c.label || c.title || 'Ação VIP',
            subtitle: c.subtitle || '',
            icon: c.icon === 'Calendar' || c.icon === 'calendar' ? 'calendar' : c.icon === 'MapPin' || c.icon === 'map' ? 'map' : 'sparkles',
            url: c.linkType === 'whatsapp' || c.url?.includes('wa.me')
              ? (c.url || `https://wa.me/${phone}?text=${encodeURIComponent(c.whatsappMessage || 'Olá!')}`)
              : c.url || '#',
            isHighlighted: c.isHighlighted ?? (c.variant === 'accent' || i === 0),
            highlightBadge: c.highlightBadge || c.badgeText || (i === 0 ? '⭐ MAIS PROCURADO' : undefined)
          }))
        : defaultButtons

      // Normalização do Funil de Triagem Anti-Curiosos
      const rawQuiz = micro.qualifierFunnel || micro.qualifierQuiz
      const formattedQuiz = rawQuiz ? {
        enabled: rawQuiz.enabled !== false,
        buttonLabel: rawQuiz.buttonLabel || '✨ Descobrir Tratamento Ideal (Triagem VIP)',
        headline: rawQuiz.headline || 'Atendimento Personalizado',
        subtitle: rawQuiz.subtitle || 'Responda 3 perguntas rápidas para agilizar seu atendimento:',
        questions: (rawQuiz.questions || []).map((q: any, qIdx: number) => ({
          id: q.id || `q-${qIdx + 1}`,
          question: q.question || q.title || 'Qual a sua preferência?',
          options: (q.options || []).map((opt: any) => typeof opt === 'string' ? opt : opt.label || opt.text || String(opt))
        }))
      } : {
        enabled: true,
        buttonLabel: '✨ Descobrir Tratamento Ideal (Triagem VIP)',
        headline: 'Atendimento Personalizado',
        subtitle: 'Responda 3 perguntas rápidas para agilizar seu atendimento no WhatsApp:',
        questions: [
          { id: 'q-1', question: 'Qual é o seu objetivo principal hoje?', options: ['Primeira Consulta / Avaliação', 'Procedimento Específico', 'Dúvidas e Valores'] },
          { id: 'q-2', question: 'Qual o melhor período para o seu atendimento?', options: ['Manhã (08h às 12h)', 'Tarde (13h às 18h)', 'Sábado'] }
        ]
      }

      // Normalização do Catálogo de Procedimentos
      const rawServices = micro.services || micro.servicesCatalog
      const formattedServices = rawServices ? {
        enabled: rawServices.enabled !== false,
        headline: rawServices.headline || 'Procedimentos & Soluções Exclusivas',
        subtitle: rawServices.subtitle || 'Soluções de alto padrão sob medida',
        categories: rawServices.categories || ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
        items: (rawServices.items || []).map((s: any, idx: number) => ({
          id: s.id || `srv-${idx + 1}`,
          category: s.category || (idx === 0 ? 'MAIS PROCURADO' : 'EXCLUSIVO'),
          name: s.name || 'Procedimento VIP',
          description: s.description || 'Protocolo personalizado com diagnóstico detalhado.',
          price: s.priceFormatted || s.price || 'Sob Consulta',
          duration: s.duration || s.time || '1h00',
          badge: s.badge || (idx === 0 ? 'MAIS PROCURADO' : undefined),
          featured: s.featured ?? (idx === 0),
          whatsappMessage: s.whatsappMessage || `Olá! Gostaria de saber mais sobre o procedimento de ${s.name}.`
        }))
      } : {
        enabled: true,
        headline: 'Procedimentos & Soluções Exclusivas',
        subtitle: 'Soluções personalizadas baseadas no mais alto padrão de entrega',
        categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
        items: [
          { id: 'srv-1', category: 'MAIS PROCURADO', name: 'Atendimento Principal VIP', description: 'Diagnóstico detalhado e protocolo exclusivo.', price: 'Sob Consulta', duration: '1h30', badge: 'MAIS PROCURADO', featured: true, whatsappMessage: `Olá! Gostaria de agendar o Atendimento Principal.` },
          { id: 'srv-2', category: 'EXCLUSIVO', name: 'Consultoria Personalizada', description: 'Acompanhamento completo e plano individualizado.', price: 'Sob Consulta', duration: '2h00', badge: 'EXCLUSIVO', featured: false, whatsappMessage: `Olá! Gostaria de informações sobre a Consultoria Personalizada.` }
        ]
      }

      // Normalização de Depoimentos Google
      const rawTestimonials = micro.testimonials?.items || micro.testimonialsList || micro.testimonials
      const formattedTestimonials = Array.isArray(rawTestimonials) && rawTestimonials.length > 0
        ? rawTestimonials.map((t: any, idx: number) => ({
            id: t.id || `rev-${idx + 1}`,
            clientName: t.clientName || t.name || 'Cliente Verificado',
            city: t.city || t.role || 'Cliente VIP',
            text: t.text || t.comment || 'Atendimento impecável! O ambiente é lindo e o resultado superou todas as expectativas.',
            rating: t.rating || 5,
            verified: true
          }))
        : [
            { clientName: 'Juliana Mendes', city: 'São Paulo - SP', text: 'Atendimento impecável! O ambiente é lindo, super higienizado e o resultado superou todas as expectativas.', rating: 5, verified: true },
            { clientName: 'Camila Rodrigues', city: 'Belo Horizonte - MG', text: 'Profissionalismo do mais alto nível. Me senti muito segura e o atendimento foi nota 10!', rating: 5, verified: true }
          ]

      // Normalização de Dúvidas Frequentes (FAQ)
      const rawFaq = micro.faq?.items || micro.faqList || micro.faq
      const formattedFaq = Array.isArray(rawFaq) && rawFaq.length > 0
        ? rawFaq.map((f: any) => ({
            question: f.question || f.q || 'Como funciona o agendamento?',
            answer: f.answer || f.a || 'O agendamento é feito diretamente com nossa equipe pelo WhatsApp para selecionar o melhor horário.'
          }))
        : [
            { question: 'Como funciona o agendamento de consultas ou serviços?', answer: 'O agendamento é realizado diretamente pelo WhatsApp com atendimento exclusivo da nossa equipe para selecionar o melhor dia e horário.' },
            { question: 'Quais são as formas de pagamento aceitas?', answer: 'Aceitamos Pix instantâneo, transferência bancária e cartões de crédito em até 12x.' },
            { question: 'Onde está localizado o espaço de atendimento?', answer: 'Estamos situados em endereço nobre com fácil acesso, estacionamento com manobrista e total discrição para seu conforto.' }
          ]

      // Normalização da Jornada em 3 Passos (Como Funciona)
      const rawHowItWorks = micro.howItWorks?.items || micro.howItWorksSteps || micro.howItWorks
      const formattedHowItWorks = Array.isArray(rawHowItWorks) && rawHowItWorks.length > 0
        ? rawHowItWorks.map((h: any, idx: number) => ({
            number: h.number || `0${idx + 1}`,
            title: h.title || 'Etapa de Atendimento',
            description: h.description || 'Alinhamento completo da sua necessidade com foco total em excelência.'
          }))
        : [
            { number: '01', title: 'Primeiro Contato & Triagem', description: 'Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade.' },
            { number: '02', title: 'Avaliação Estratégica', description: 'Diagnóstico detalhado do seu objetivo com plano de ação sob medida.' },
            { number: '03', title: 'Execução & Acompanhamento', description: 'Atendimento de alta excelência e suporte contínuo em todas as etapas.' }
          ]

      // Normalização de Subpáginas Pro
      const rawSubpages = micro.subpages
      const formattedSubpages = Array.isArray(rawSubpages) && rawSubpages.length > 0
        ? rawSubpages.map((sp: any) => ({
            slug: sp.slug,
            title: sp.title,
            description: sp.description,
            previewType: sp.previewType || 'services'
          }))
        : [
            { slug: 'procedimentos', title: 'Procedimentos & Preços', description: 'Tabela de tratamentos e protocolos exclusivos.', previewType: 'services' },
            { slug: 'transformacoes', title: 'Antes e Depois Resultados', description: 'Comparativo interativo de transformações e casos reais.', previewType: 'before_after' },
            { slug: 'agenda-vip', title: 'Agendamento com a Equipe', description: 'Consulte os dias e horários livres com confirmação imediata.', previewType: 'booking' }
          ]

      const siteData = {
        slug: newSlug,
        name: businessName,
        role: profile.title || admin.nicheCategory || 'Especialista VIP',
        category: admin.nicheCategory || 'Serviços de Alto Padrão',
        registrationCode: profile.registrationCode || 'REGISTRO OFICIAL',
        monogram: profile.monogram || businessName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase(),
        photo: profile.avatarUrl || profile.photo || DEMO_PHOTOS.mulher,
        paletteId: resolvedPaletteId,
        typographyId: micro.typographyId || 'instrument',
        buttonStyle: micro.buttonStyle || 'cartao_nobre',
        buttonAnimation: micro.buttonAnimation || 'shimmer',
        bio: profile.cursivePhrase || profile.tagline || profile.bio || 'Excelência e sofisticação em cada detalhe.',
        whatsapp: phone,
        buttons: formattedButtons,
        announcement: micro.announcement || { enabled: true, badge: 'AGENDA VIP ABERTA', text: 'Últimos horários disponíveis para esta semana.' },
        urgency: micro.urgency || { enabled: true, headline: '🔥 CONDIÇÃO ESPECIAL DE HOJE', subtitle: 'Garanta sua vaga com atendimento prioritário antes que expire:', minutes: 15 },
        qualifierQuiz: formattedQuiz,
        metricsList: micro.metrics?.items || micro.metricsList || [
          { value: '+1.000', label: 'CLIENTES ATENDIDOS' },
          { value: '8 anos', label: 'DE EXPERIÊNCIA' },
          { value: '5.0★', label: 'AVALIAÇÃO NO GOOGLE' }
        ],
        howItWorksSteps: formattedHowItWorks,
        servicesCatalog: formattedServices,
        galleryPhotosList: galleryPhotosList,
        locationInfo: micro.locationCard ? {
          enabled: micro.locationCard.enabled !== false,
          address: micro.locationCard.address || 'Endereço Comercial',
          hours: micro.locationCard.hours || 'Seg a Sáb · 08:30 às 19:30',
          openStatus: micro.locationCard.openStatus || 'Aberto Agora · Hora Marcada',
          mapsUrl: micro.locationCard.mapsUrl || 'https://maps.google.com'
        } : {
          enabled: true,
          address: 'Av. Principal, 1000 - Edifício Business Center',
          hours: 'Seg a Sáb · 08:30 às 19:30',
          openStatus: 'Aberto Agora · Hora Marcada',
          mapsUrl: 'https://maps.google.com'
        },
        testimonialsList: formattedTestimonials,
        aboutMeSection: micro.aboutMe || {
          enabled: true,
          headline: `Sobre ${businessName}`,
          paragraph: profile.tagline || 'Dedicamo-nos a proporcionar experiências exclusivas e transformadoras, combinando técnicas avançadas com um padrão rigoroso de excelência.',
          closingPhrase: profile.cursivePhrase || 'Sua melhor versão com sofisticação e segurança.'
        },
        faqList: formattedFaq,
        subpages: formattedSubpages
      }

      // 1. Salvar no localStorage específico do site
      localStorage.setItem('biovip_site_' + newSlug, JSON.stringify(siteData))

      // 2. Salvar na lista de projetos de portfólio (para permitir edição em /conta?edit=slug)
      try {
        const savedProjectsRaw = localStorage.getItem('biovip_portfolio_projects')
        let portfolioList = savedProjectsRaw ? JSON.parse(savedProjectsRaw) : []
        portfolioList = portfolioList.filter((p: any) => p.slug !== newSlug)
        portfolioList.unshift({
          ...siteData,
          inPortfolio: true,
          isPortfolioModel: true,
          stats: { views: '1.2K', clicks: '420', conversion: '35.0%' }
        })
        localStorage.setItem('biovip_portfolio_projects', JSON.stringify(portfolioList))
      } catch (e) {
        console.warn('Erro ao atualizar lista de portfólio:', e)
      }

      // 3. Persistência em nuvem Supabase (se configurado)
      saveBioSite(newSlug, siteData).catch(e => console.warn('Sync Supabase:', e))

      // 4. Registrar nova assinatura ativa
      const updatedSubs = [newSub, ...subscriptions.filter(s => s.slug !== newSlug)]
      setSubscriptions(updatedSubs)
      localStorage.setItem('biovip_subscriptions', JSON.stringify(updatedSubs))

      setPaymentSuccessToast(`BioSite de "${newSub.clientName}" importado com sucesso! Todos os 18 módulos preenchidos e ativos.`)
      setIsGeminiModalOpen(false)
      setGeminiJsonInput('')
      setGeminiError(null)
    } catch (err: any) {
      setGeminiError('Erro ao processar JSON: ' + (err.message || 'Formato inválido'))
    }
  }

  // Alternar Modo Manutenção (Inadimplência D+7 / Suspensão)
  const handleToggleMaintenance = (subId: string) => {
    const sub = subscriptions.find(s => s.id === subId)
    if (!sub) return
    const siteKey = 'biovip_site_' + sub.slug
    const siteRaw = localStorage.getItem(siteKey)
    let site = siteRaw ? JSON.parse(siteRaw) : { slug: sub.slug, name: sub.businessName }
    site.isMaintenanceMode = !site.isMaintenanceMode
    localStorage.setItem(siteKey, JSON.stringify(site))

    setPaymentSuccessToast(
      site.isMaintenanceMode
        ? `Modo Manutenção ATIVADO para "${sub.businessName}". O público verá uma tela neutra elegante.`
        : `Modo Manutenção DESATIVADO para "${sub.businessName}". BioSite reativado!`
    )
    setTimeout(() => setPaymentSuccessToast(null), 4000)
  }

  // Copiar Proposta Comercial Persuasiva para WhatsApp
  const handleCopyProposalWA = (sub: Subscription) => {
    const text = `Olá ${sub.clientName}! 🌟\n\nPreparamos uma demonstração exclusiva de um **BioSite de Alto Padrão** desenhado especialmente para o seu negócio em ${sub.niche}:\n\n🔗 Acesse aqui: ${sub.bioSiteUrl}\n\nDiferenciais inclusos no seu projeto:\n✓ Retrato profissional com fusão de estúdio orgânica\n✓ Botão de agendamento prioritário direto no seu WhatsApp\n✓ Catálogo VIP de serviços e localização GPS com rota Waze/Uber\n✓ Triagem anti-curiosos que filtra clientes qualificados\n✓ QR Code de balcão em alta definição pronto para impressão gráfica\n\nPodemos colocar no ar com seus dados oficiais ainda hoje?`

    navigator.clipboard.writeText(text)
    setPaymentSuccessToast(`Proposta comercial de "${sub.clientName}" copiada para o WhatsApp!`)
    setTimeout(() => setPaymentSuccessToast(null), 4000)
  }

  // Copiar Mensagem de Cobrança Pix Amigável
  const handleCopyBillingWA = (sub: Subscription) => {
    const text = `Olá ${sub.clientName}! 🌟\n\nLembrete de renovação da hospedagem e manutenção do seu BioSite oficial:\n\n📌 BioSite: ${sub.bioSiteUrl}\n💰 Valor da mensalidade: R$ ${sub.amount.toFixed(2).replace('.', ',')}\n🔑 Chave Pix: ${pixKey}\n\nApós o pagamento, basta enviar o comprovante por aqui para mantermos todos os recursos ativos sem interrupção. Agradecemos pela parceria!`

    navigator.clipboard.writeText(text)
    setPaymentSuccessToast(`Mensagem de cobrança amigável de "${sub.clientName}" copiada para o WhatsApp!`)
    setTimeout(() => setPaymentSuccessToast(null), 4000)
  }

  // Backup Completo JSON
  const handleExportFullBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      version: '2.0',
      subscriptions,
      portfolioList,
      pixKey,
      gatewayProvider,
      customSites: {} as Record<string, any>
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('biovip_site_')) {
        try {
          backupData.customSites[key] = JSON.parse(localStorage.getItem(key) || '{}')
        } catch (e) {}
      }
    }

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `backup-biovip-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Restaurar Backup JSON
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        if (json.subscriptions) {
          saveSubscriptions(json.subscriptions)
        }
        if (json.portfolioList) {
          savePortfolioList(json.portfolioList)
        }
        if (json.pixKey) {
          setPixKey(json.pixKey)
        }
        if (json.customSites) {
          Object.entries(json.customSites).forEach(([k, v]) => {
            localStorage.setItem(k, JSON.stringify(v))
          })
        }
        alert('Backup completo restaurado com sucesso!')
        window.location.reload()
      } catch (err) {
        alert('Erro ao importar backup: arquivo JSON inválido.')
      }
    }
    reader.readAsText(file)
  }

  // Alterar PIN de Segurança
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPinInput.length < 4) {
      alert('O PIN deve conter no mínimo 4 dígitos.')
      return
    }
    localStorage.setItem('biovip_admin_pin', newPinInput)
    setIsPinModalOpen(false)
    setNewPinInput('')
    setPinSuccessToast(`Novo PIN master cadastrado com sucesso!`)
    setTimeout(() => setPinSuccessToast(null), 4000)
  }

  // Filtragem dos Modelos de Portfólio na Gestão
  const filteredPortfolioList = useMemo(() => {
    return portfolioList.filter(proj => {
      const matchesSearch =
        proj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.slug.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === 'todos' ||
        (statusFilter === 'ativa' && proj.inPortfolio !== false) ||
        (statusFilter === 'cancelada' && proj.inPortfolio === false)

      return matchesSearch && matchesStatus
    })
  }, [portfolioList, searchTerm, statusFilter])

  // Próximos vencimentos (próximos 7 dias)
  const proximosVencimentos = useMemo(() => {
    const today = new Date('2026-11-08') // base local
    return subscriptions
      .filter(s => s.status === 'ativa' || s.status === 'pendente')
      .map(sub => {
        const nextDate = new Date(sub.nextBillingDate)
        const diffTime = nextDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return { ...sub, diffDays }
      })
      .filter(s => s.diffDays <= 15)
      .sort((a, b) => a.diffDays - b.diffDays)
  }, [subscriptions])

  // Ações de Assinatura
  const handleUpdateStatus = (id: string, newStatus: SubscriptionStatus) => {
    const updated = subscriptions.map(s => {
      if (s.id === id) {
        return { ...s, status: newStatus }
      }
      return s
    })
    saveSubscriptions(updated)
  }

  const handleDeleteSubscription = (id: string) => {
    if (confirm('Tem certeza que deseja remover esta assinatura do sistema?')) {
      const updated = subscriptions.filter(s => s.id !== id)
      saveSubscriptions(updated)
    }
  }

  const handleSaveModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const updatedData: Subscription = {
      id: editingSub ? editingSub.id : `sub-${Date.now().toString().slice(-4)}`,
      clientName: formData.get('clientName') as string,
      businessName: formData.get('businessName') as string,
      email: formData.get('email') as string,
      whatsapp: (formData.get('whatsapp') as string).replace(/\D/g, ''),
      cpfCnpj: (formData.get('cpfCnpj') as string) || undefined,
      niche: formData.get('niche') as string,
      slug: (formData.get('slug') as string).toLowerCase().trim(),
      customDomain: (formData.get('customDomain') as string) || undefined,
      planId: formData.get('planId') as 'starter' | 'pro' | 'agency',
      planName: formData.get('planId') === 'starter' ? 'Iniciante' : formData.get('planId') === 'pro' ? 'Profissional' : 'Agência',
      cycle: formData.get('cycle') as BillingCycle,
      amount: Number(formData.get('amount')),
      status: formData.get('status') as SubscriptionStatus,
      paymentMethod: formData.get('paymentMethod') as PaymentMethod,
      startDate: (formData.get('startDate') as string) || new Date().toISOString().split('T')[0],
      nextBillingDate: (formData.get('nextBillingDate') as string) || new Date().toISOString().split('T')[0],
      bioSiteUrl: `https://biovip.com.br/${formData.get('slug')}`,
      viewsCount: editingSub ? editingSub.viewsCount : 0,
      clicksCount: editingSub ? editingSub.clicksCount : 0,
      notes: (formData.get('notes') as string) || '',
      payments: editingSub ? editingSub.payments : []
    }

    if (editingSub) {
      saveSubscriptions(subscriptions.map(s => s.id === editingSub.id ? updatedData : s))
    } else {
      saveSubscriptions([updatedData, ...subscriptions])
    }

    setIsModalOpen(false)
    setEditingSub(null)
  }

  // --- GERENCIAMENTO DE VITRINE & PORTFÓLIO ---
  const handleTogglePortfolioVisibility = (slug: string) => {
    const updated = portfolioList.map(p => {
      if (p.slug === slug) {
        const nextState = p.inPortfolio === false ? true : false
        return { ...p, inPortfolio: nextState }
      }
      return p
    })
    savePortfolioList(updated)
    setPortfolioSuccessToast('Visibilidade no portfólio atualizada!')
    setTimeout(() => setPortfolioSuccessToast(null), 3000)
  }

  const handleDeleteProject = (slug: string) => {
    if (confirm('Tem certeza que deseja remover este modelo do portfólio?')) {
      const updated = portfolioList.filter(p => p.slug !== slug)
      savePortfolioList(updated)
      setPortfolioSuccessToast('Modelo removido com sucesso!')
      setTimeout(() => setPortfolioSuccessToast(null), 3000)
    }
  }

  const handleSaveProjectModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingProject) return
    const formData = new FormData(e.currentTarget)

    const featuresStr = formData.get('features') as string
    const features = featuresStr
      ? featuresStr.split(',').map(s => s.trim()).filter(Boolean)
      : editingProject.features

    const updated: Project = {
      ...editingProject,
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      category: formData.get('category') as string,
      registrationCode: formData.get('registrationCode') as string,
      photo: formData.get('photo') as string,
      image: formData.get('photo') as string,
      description: formData.get('description') as string,
      paletteId: formData.get('paletteId') as string,
      typographyId: formData.get('typographyId') as string,
      buttonStyle: (formData.get('buttonStyle') as string) || editingProject.buttonStyle || 'cartao_nobre',
      monogram: formData.get('monogram') as string,
      features,
      stats: {
        views: (formData.get('views') as string) || editingProject.stats.views,
        clicks: (formData.get('clicks') as string) || editingProject.stats.clicks,
        conversion: (formData.get('conversion') as string) || editingProject.stats.conversion
      }
    }

    const updatedList = portfolioList.map(p => p.slug === editingProject.slug ? updated : p)
    savePortfolioList(updatedList)

    // Sincronizar chave individual biovip_site_<slug> para atualizar /[slug] instantaneamente
    try {
      const existingRaw = localStorage.getItem('biovip_site_' + updated.slug)
      const existing = existingRaw ? JSON.parse(existingRaw) : {}
      const siteData = {
        ...existing,
        slug: updated.slug,
        name: updated.name,
        role: updated.role,
        category: updated.category,
        registrationCode: updated.registrationCode,
        monogram: updated.monogram,
        photo: updated.photo,
        paletteId: updated.paletteId,
        typographyId: updated.typographyId,
        buttonStyle: updated.buttonStyle,
        buttons: updated.buttons || existing.buttons || [],
        subpages: updated.subpages || existing.subpages || []
      }
      localStorage.setItem('biovip_site_' + updated.slug, JSON.stringify(siteData))
    } catch (e) {
      console.error(e)
    }

    setIsProjectModalOpen(false)
    setEditingProject(null)
    setPortfolioSuccessToast(`Case de estudo "${updated.name}" atualizado!`)
    setTimeout(() => setPortfolioSuccessToast(null), 3000)
  }

  const handleConvertClientToPortfolio = (sub: Subscription) => {
    if (portfolioList.some(p => p.slug === sub.slug)) {
      alert('Este cliente já está presente na lista de modelos do portfólio!')
      return
    }

    const newProject: Project = {
      slug: sub.slug,
      name: sub.clientName,
      role: sub.niche,
      category: sub.niche,
      registrationCode: 'REGISTRO PROFISSIONAL',
      image: DEMO_PHOTOS.mulher,
      photo: DEMO_PHOTOS.mulher,
      description: `Bio Site desenvolvido para ${sub.businessName}, integrando atendimento personalizado e conversão direta via WhatsApp.`,
      features: ['Atendimento VIP', 'Agendamento WhatsApp', 'Localização Georreferenciada', 'Rastreamento com Pixel'],
      link: `https://biovip.com.br/${sub.slug}`,
      paletteId: 'luxo_nude',
      typographyId: 'instrument',
      monogram: sub.clientName.split(' ').map(n => n[0]).slice(0, 2).join(''),
      stats: {
        views: `${(sub.viewsCount / 1000).toFixed(1)}K`,
        clicks: `${(sub.clicksCount / 1000).toFixed(1)}K`,
        conversion: sub.viewsCount > 0 ? `${((sub.clicksCount / sub.viewsCount) * 100).toFixed(1)}%` : '32.4%'
      },
      buttons: [
        {
          id: 'btn-1',
          label: 'AGENDAMENTO PRIORITÁRIO',
          subtitle: 'Reserve sua data ou consulta pelo WhatsApp.',
          icon: 'calendar',
          url: `https://wa.me/${sub.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de falar com ${sub.clientName}.`)}`,
          isHighlighted: true,
          highlightBadge: '⭐ MAIS PROCURADO'
        },
        {
          id: 'btn-2',
          label: 'LOCALIZAÇÃO & ATENDIMENTO',
          subtitle: 'Veja como chegar ao nosso endereço.',
          icon: 'map',
          url: 'https://maps.google.com'
        },
        {
          id: 'btn-3',
          label: 'CATÁLOGO & SERVIÇOS',
          subtitle: 'Conheça nossos diferenciais e procedimentos.',
          icon: 'sparkles',
          url: `https://wa.me/${sub.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de consultar os serviços.')}`
        }
      ],
      isPortfolioModel: false,
      inPortfolio: true
    }

    const updatedList = [newProject, ...portfolioList]
    savePortfolioList(updatedList)

    const updatedSubs = subscriptions.map(s => s.id === sub.id ? { ...s, inPortfolio: true } : s)
    saveSubscriptions(updatedSubs)

    setIsAddClientModalOpen(false)
    setPortfolioSuccessToast(`Cliente "${sub.clientName}" adicionado ao portfólio!`)
    setTimeout(() => setPortfolioSuccessToast(null), 3000)
  }

  // Gerador de mensagem WhatsApp de Cobrança / Suporte
  const getWhatsAppMessage = (sub: Subscription) => {
    if (sub.status === 'atrasada') {
      return `Olá ${sub.clientName}! Tudo bem? Notamos que a assinatura do seu Bio Site (${sub.businessName}) venceu no dia ${sub.nextBillingDate}. Para manter sua página e domínio no ar sem interrupções, segue a Chave Pix da renovação: ${pixKey} no valor de R$ ${sub.amount},00. Qualquer dúvida estamos à disposição!`
    }
    if (sub.status === 'pendente') {
      return `Olá ${sub.clientName}! Tudo bem? Seu Bio Site (${sub.businessName}) está pronto para ativação! Segue a Chave Pix para liberação imediata: ${pixKey} no valor de R$ ${sub.amount},00.`
    }
    return `Olá ${sub.clientName}! Passando para saber como estão os resultados e contatos do seu Bio Site (${sub.slug}). Precisa de algum ajuste em links ou horários? Estamos à disposição!`
  }

  const exportCSV = () => {
    const headers = 'ID,Nome,Empresa,Email,WhatsApp,Plano,Ciclo,Valor,Status,ProximoVencimento\n'
    const rows = subscriptions.map(s =>
      `"${s.id}","${s.clientName}","${s.businessName}","${s.email}","${s.whatsapp}","${s.planName}","${s.cycle}","R$ ${s.amount}","${s.status}","${s.nextBillingDate}"`
    ).join('\n')

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `assinaturas-biovip-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // TELA DE LOGIN COM PIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-stone-800/80 border border-stone-700/60 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/20 mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
              Painel de Gestão Master
            </span>
            <h1 className="text-2xl font-serif font-bold text-white mt-1">BioVip · Assinaturas</h1>
            <p className="text-sm text-stone-400 mt-2">
              Acesso exclusivo para administradores e gestores do estúdio.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
                PIN de Segurança
              </label>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Digite o PIN (ex: 2026)"
                className="w-full px-4 py-3 bg-stone-900/90 border border-stone-700 rounded-xl text-center text-2xl tracking-widest font-mono text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-2 text-center flex items-center justify-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" /> Acessar Painel ADM
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-700/50 flex items-center justify-between text-xs text-stone-400">
            <Link href="/" className="hover:text-amber-400 transition flex items-center gap-1">
              ← Voltar ao site público
            </Link>
            <span className="font-mono text-stone-500">v2.4 Pro</span>
          </div>
        </div>
      </div>
    )
  }

  // TELA PRINCIPAL DO PAINEL DE GESTÃO
  return (
    <div className="min-h-screen bg-[#0d0f12] text-stone-200">
      {/* Topo do Painel */}
      <header className="sticky top-0 z-30 bg-[#12151a]/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center text-stone-950 font-bold text-base shadow-md">
                B
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                  BIOVIP ADMIN <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">ASSINATURAS</span>
                </div>
                <div className="text-[10px] text-stone-400">Gestão Recorrente & Clientes</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 ml-6 pl-6 border-l border-stone-800 text-xs">
              <button
                onClick={() => setActiveTab('assinaturas')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium ${
                  activeTab === 'assinaturas'
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
                }`}
              >
                Bio Sites & Assinaturas ({subscriptions.length + portfolioList.length})
              </button>
              <button
                onClick={() => setActiveTab('vencimentos')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium flex items-center gap-1.5 ${
                  activeTab === 'vencimentos'
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
                }`}
              >
                Vencimentos
                {metrics.atrasadasCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {metrics.atrasadasCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('metricas')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium flex items-center gap-1.5 ${
                  activeTab === 'metricas'
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                Métricas & Analytics
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium flex items-center gap-1.5 ${
                  activeTab === 'portfolio'
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Vitrine & Portfólio ({portfolioList.filter(p => p.inPortfolio !== false).length})
              </button>
              <button
                onClick={() => setActiveTab('gateways')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-medium ${
                  activeTab === 'gateways'
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
                }`}
              >
                Gateways & Pix
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => {
                setGeminiError(null)
                setIsGeminiModalOpen(true)
              }}
              className="px-3 py-1.5 bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition border border-purple-500/30 cursor-pointer shadow-2xs"
              title="Importar JSON gerado pela IA Gemini (Script BioVip Oficial)"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Importar IA Gemini</span>
            </button>
            <button
              onClick={() => setIsCloneModalOpen(true)}
              className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition border border-amber-500/30 cursor-pointer shadow-2xs"
              title="Clonar template de modelo para novo cliente com 1 clique"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Clonar Modelo</span>
            </button>
            <button
              onClick={() => {
                setEditingSub(null)
                setIsModalOpen(true)
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nova Assinatura</span>
            </button>
            <button
              onClick={() => setIsBackupModalOpen(true)}
              title="Backup & Restauração Completa"
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-xl transition cursor-pointer border border-stone-800"
            >
              <Database className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPinModalOpen(true)}
              title="Alterar PIN de Segurança"
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-xl transition cursor-pointer border border-stone-800"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={exportCSV}
              title="Exportar CSV"
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-xl transition cursor-pointer border border-stone-800 hidden sm:block"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="text-xs text-stone-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-stone-800 hover:border-rose-900/50 transition cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: MRR */}
          <div className="bg-[#14181f] border border-stone-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">MRR (Recorrência Mensal)</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-white">
              R$ {metrics.mrr.toLocaleString('pt-BR')},00
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>ARR Projetado: R$ {metrics.arr.toLocaleString('pt-BR')},00/ano</span>
            </div>
          </div>

          {/* Card 2: Assinaturas Ativas */}
          <div className="bg-[#14181f] border border-stone-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Assinaturas Ativas</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-white flex items-baseline gap-2">
              {metrics.ativasCount}
              <span className="text-xs font-normal text-stone-400">/ {metrics.total} clientes</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-2">
              <span className="text-amber-400 font-semibold">{metrics.taxaRetencao}%</span> de retenção da base
            </div>
          </div>

          {/* Card 3: Inadimplência / Atrasadas */}
          <div className="bg-[#14181f] border border-stone-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-rose-500/40 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Atrasadas / Cobrança</span>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-rose-400">
              {metrics.atrasadasCount} clientes
            </div>
            <div className="flex items-center gap-1 text-xs text-rose-300/80 mt-2">
              <span>R$ {metrics.valorAtrasado.toLocaleString('pt-BR')},00 a recuperar</span>
            </div>
          </div>

          {/* Card 4: Acessos Gerados */}
          <div className="bg-[#14181f] border border-stone-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Tráfego dos Bio Sites</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-white">
              {metrics.totalViews.toLocaleString('pt-BR')}
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-400 mt-2">
              <span>Visualizações acumuladas nos clientes</span>
            </div>
          </div>
        </section>

        {/* ABA: ASSINATURAS */}
        {activeTab === 'assinaturas' && (
          <section className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-6">
            {/* Barra de Filtros e Busca */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por cliente, empresa, slug ou WhatsApp..."
                  className="w-full pl-10 pr-4 py-2 bg-[#0d0f12] border border-stone-700/80 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Filtro Status */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0d0f12] border border-stone-700/80 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="todos">Status: Todos</option>
                  <option value="ativa">Ativas</option>
                  <option value="atrasada">Em Atraso</option>
                  <option value="pendente">Aguardando Pagamento</option>
                  <option value="cancelada">Canceladas</option>
                </select>

                {/* Filtro Plano */}
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0d0f12] border border-stone-700/80 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="todos">Plano: Todos</option>
                  <option value="starter">Iniciante</option>
                  <option value="pro">Profissional</option>
                  <option value="agency">Agência</option>
                </select>

                {/* Filtro Ciclo */}
                <select
                  value={cycleFilter}
                  onChange={(e) => setCycleFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0d0f12] border border-stone-700/80 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="todos">Ciclo: Todos</option>
                  <option value="mensal">Mensal</option>
                  <option value="anual">Anual</option>
                </select>

                {/* Ordenação */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-[#0d0f12] border border-stone-700/80 rounded-xl text-xs text-amber-300 font-medium focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="recentes">Ordenar: Mais Recentes</option>
                  <option value="vencimento">Ordenar: Próx. Vencimento</option>
                  <option value="valor">Ordenar: Maior Valor (R$)</option>
                  <option value="views">Ordenar: Mais Acessos</option>
                  <option value="nome">Ordenar: Nome (A-Z)</option>
                </select>

                {(searchTerm || statusFilter !== 'todos' || planFilter !== 'todos' || cycleFilter !== 'todos') && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setStatusFilter('todos')
                      setPlanFilter('todos')
                      setCycleFilter('todos')
                    }}
                    className="text-xs text-amber-400 hover:underline px-2 py-1"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>

            {/* SUB-ABAS DE FILTRO RÁPIDO: TODOS OS BIO SITES / MODELOS / CLIENTES */}
            <div className="flex flex-wrap items-center gap-2 border-b border-stone-800 pb-4">
              <button
                type="button"
                onClick={() => setBioSiteTypeFilter('todos')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  bioSiteTypeFilter === 'todos'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                Todos os Bio Sites ({filteredSubscriptions.length + filteredPortfolioList.length})
              </button>
              <button
                type="button"
                onClick={() => setBioSiteTypeFilter('modelos')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  bioSiteTypeFilter === 'modelos'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Modelos de Portfólio ({filteredPortfolioList.length})
              </button>
              <button
                type="button"
                onClick={() => setBioSiteTypeFilter('clientes')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  bioSiteTypeFilter === 'clientes'
                    ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Clientes Reais ({filteredSubscriptions.length})
              </button>
            </div>

            {/* TABELA DE ASSINATURAS & BIO SITES */}
            <div className="overflow-x-auto rounded-2xl border border-stone-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0f1217] text-[11px] font-mono uppercase tracking-wider text-stone-400 border-b border-stone-800">
                    <th className="py-3 px-4">Bio Site / Profissional</th>
                    <th className="py-3 px-4">Nicho & Registro</th>
                    <th className="py-3 px-4">Tipo / Plano</th>
                    <th className="py-3 px-4">Valor</th>
                    <th className="py-3 px-4">Próx. Cobrança</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 text-xs">
                  {/* SEÇÃO: MODELOS DE PORTFÓLIO (DEMONSTRATIVOS) */}
                  {(bioSiteTypeFilter === 'todos' || bioSiteTypeFilter === 'modelos') &&
                    filteredPortfolioList.map((proj) => {
                      const isVisible = proj.inPortfolio !== false
                      return (
                        <tr
                          key={`proj-${proj.slug}`}
                          className="hover:bg-stone-800/30 transition group bg-stone-900/25"
                        >
                          {/* Imagem + Nome + Slug */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-stone-700/80 bg-stone-900">
                                <img
                                  src={proj.photo}
                                  alt={proj.name}
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-amber-300 transition flex items-center gap-1.5">
                                  {proj.name}
                                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono font-bold flex items-center gap-1">
                                    <Sparkles className="w-2.5 h-2.5" /> MODELO
                                  </span>
                                </div>
                                <div className="text-[11px] text-stone-400 flex items-center gap-1.5 mt-0.5">
                                  <a
                                    href={`/${proj.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-amber-400/90 hover:underline flex items-center gap-0.5 font-mono"
                                  >
                                    /{proj.slug} <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                  <span>·</span>
                                  <Link
                                    href={`/portfolio/${proj.slug}`}
                                    target="_blank"
                                    className="text-stone-400 hover:text-white inline-flex items-center gap-0.5 font-mono"
                                  >
                                    Case <ExternalLink className="w-2.5 h-2.5" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Nicho & Registro */}
                          <td className="py-3.5 px-4">
                            <div className="text-stone-300 font-medium">{proj.role}</div>
                            <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                              {proj.registrationCode}
                            </div>
                          </td>

                          {/* Tipo / Plano */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-blue-500/15 text-blue-300 border border-blue-500/30 font-mono">
                                Vitrine (Pro)
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono">
                                {proj.subpages ? `${proj.subpages.length} pgs` : '3 pgs'}
                              </span>
                            </div>
                          </td>

                          {/* Valor (R$ 0,00 - Demonstrativo) */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="text-stone-300 font-medium">
                              R$ 0,00
                            </div>
                            <div className="text-[9.5px] text-stone-500 uppercase">
                              Demonstrativo
                            </div>
                          </td>

                          {/* Próx. Cobrança */}
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <div className="text-stone-400">
                              Isento
                            </div>
                            <span className="text-[9.5px] text-emerald-400/80">PERM. ATIVO</span>
                          </td>

                          {/* Status no Portfólio (com Toggle Direto!) */}
                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              onClick={() => handleTogglePortfolioVisibility(proj.slug)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition cursor-pointer border ${
                                isVisible
                                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                                  : 'bg-stone-800 text-stone-500 border-stone-700 hover:bg-stone-700 hover:text-stone-300'
                              }`}
                              title="Clique para alternar exibição no /portfolio"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isVisible ? 'bg-emerald-400' : 'bg-stone-500'}`} />
                              {isVisible ? 'EXIBINDO NO PORTFÓLIO' : 'OCULTO DO PORTFÓLIO'}
                            </button>
                          </td>

                          {/* Ações Rápidas */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/conta?edit=${proj.slug}`}
                                title="Editar no Construtor Visual (Cores, Fontes, Botões, Foto, Páginas)"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 font-semibold text-[11px] transition border border-amber-500/30"
                              >
                                <Wand2 className="w-3.5 h-3.5" />
                                <span>Editar Visual</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  setCloneSourceSlug(proj.slug)
                                  setIsCloneModalOpen(true)
                                }}
                                title="Clonar este Modelo para um Novo Cliente"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer"
                              >
                                <Zap className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setQrModalSite({ name: proj.name, slug: proj.slug, url: `https://biovip.com.br/${proj.slug}`, category: proj.category })}
                                title="Visualizar QR Code de Divulgação"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                              </button>
                              <Link
                                href={`/${proj.slug}`}
                                target="_blank"
                                title="Abrir Bio Site ao Vivo"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProject(proj)
                                  setIsProjectModalOpen(true)
                                }}
                                title="Editar Modelo & Case"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProject(proj.slug)}
                                title="Remover Modelo"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/30 hover:text-rose-400 text-stone-400 transition cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}

                  {/* SEÇÃO: CLIENTES REAIS */}
                  {(bioSiteTypeFilter === 'todos' || bioSiteTypeFilter === 'clientes') &&
                    sortedSubscriptions.map((sub) => {
                      const isOverdue = sub.status === 'atrasada'
                      const isPending = sub.status === 'pendente'
                      const isAlreadyInPortfolio = portfolioList.some(p => p.slug === sub.slug)

                      return (
                        <tr
                          key={sub.id}
                          className="hover:bg-stone-800/30 transition group"
                        >
                          {/* Cliente / Marca */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center font-bold text-stone-300 shrink-0">
                                {sub.clientName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-amber-300 transition flex items-center gap-1.5">
                                  {sub.businessName}
                                  {sub.customDomain && (
                                    <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/10 text-blue-300 rounded font-mono" title={sub.customDomain}>
                                      DOMÍNIO
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                                  <span>{sub.clientName}</span>
                                  <span>·</span>
                                  <a
                                    href={sub.bioSiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-amber-400/90 hover:underline flex items-center gap-0.5 font-mono"
                                  >
                                    /{sub.slug} <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Contato (WhatsApp & Email) */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/${sub.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage(sub))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition"
                                title="Falar no WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`mailto:${sub.email}`}
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
                                title={`Enviar e-mail para ${sub.email}`}
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                              <span className="font-mono text-stone-400 text-[11px]">
                                {sub.whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')}
                              </span>
                            </div>
                          </td>

                          {/* Plano & Ciclo */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                                  sub.planId === 'agency'
                                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                    : sub.planId === 'pro'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-stone-700/50 text-stone-300 border border-stone-600'
                                }`}
                              >
                                {sub.planName}
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono uppercase">
                                ({sub.cycle})
                              </span>
                            </div>
                          </td>

                          {/* Valor & Método */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="text-white font-semibold">
                              R$ {sub.amount},00
                            </div>
                            <div className="text-[10px] text-stone-400 uppercase">
                              via {sub.paymentMethod}
                            </div>
                          </td>

                          {/* Próxima Cobrança */}
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <div className={isOverdue ? 'text-rose-400 font-bold flex items-center gap-1' : 'text-stone-300'}>
                              {isOverdue && <AlertTriangle className="w-3 h-3" />}
                              {sub.nextBillingDate}
                            </div>
                            {isOverdue && (
                              <span className="text-[10px] text-rose-400/80">VENCIDA</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            <div className="space-y-1">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  sub.status === 'ativa'
                                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                    : sub.status === 'atrasada'
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                                    : sub.status === 'pendente'
                                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                    : 'bg-stone-800 text-stone-500 border border-stone-700'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  sub.status === 'ativa' ? 'bg-emerald-400' :
                                  sub.status === 'atrasada' ? 'bg-rose-400' :
                                  sub.status === 'pendente' ? 'bg-amber-400' : 'bg-stone-500'
                                }`} />
                                {sub.status.toUpperCase()}
                              </span>

                              {/* Selo se já está no portfólio */}
                              {isAlreadyInPortfolio ? (
                                <span className="block text-[9px] font-mono text-emerald-400 font-semibold">
                                  ✓ No Portfólio
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleConvertClientToPortfolio(sub)}
                                  className="block text-[9px] font-mono text-amber-400 hover:text-amber-300 hover:underline cursor-pointer"
                                  title="Promover este cliente para a vitrine pública /portfolio"
                                >
                                  + Add à Vitrine
                                </button>
                              )}
                            </div>
                          </td>

                          {/* Ações */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Editar Visual do Bio Site */}
                              <Link
                                href={`/conta?edit=${sub.slug}`}
                                title="Editar Bio Site no Construtor Visual (Cores, Fontes, Botões, Foto, Páginas)"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 font-semibold text-[11px] transition border border-amber-500/30"
                              >
                                <Wand2 className="w-3.5 h-3.5" />
                                <span>Editar Visual</span>
                              </Link>

                              {/* Botão Pix Cobrança */}
                              <button
                                type="button"
                                onClick={() => setPixModalSub(sub)}
                                title="Gerar Cobrança Pix / QR Code"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                              </button>

                              {/* Dar Baixa / Confirmar Pagamento Pix */}
                              {(isOverdue || isPending) && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleConfirmPayment(sub.id)}
                                    title="Confirmar Pagamento Pix Recebido (Dar Baixa)"
                                    className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition cursor-pointer"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyBillingWA(sub)}
                                    title="Copiar Mensagem Amigável de Cobrança Pix para WhatsApp"
                                    className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition cursor-pointer"
                                  >
                                    <DollarSign className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}

                              {/* QR Code de Divulgação & Balcão */}
                              <button
                                type="button"
                                onClick={() => setQrModalSite({ name: sub.businessName, slug: sub.slug, url: sub.bioSiteUrl, category: sub.niche })}
                                title="Visualizar QR Code de Divulgação (Display de Balcão / Cartão)"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>

                              {/* Copiar Proposta Comercial WhatsApp */}
                              <button
                                type="button"
                                onClick={() => handleCopyProposalWA(sub)}
                                title="Copiar Proposta Comercial Persuasiva para WhatsApp"
                                className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 transition cursor-pointer"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                              </button>

                              {/* Alternar Modo Manutenção (Inadimplência D+7 / Reforma) */}
                              <button
                                type="button"
                                onClick={() => handleToggleMaintenance(sub.id)}
                                title="Alternar Modo Manutenção (Tela neutra elegante sem quebrar reputação)"
                                className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 transition cursor-pointer"
                              >
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                              </button>

                              {/* Editar */}
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingSub(sub)
                                  setIsModalOpen(true)
                                }}
                                title="Editar Assinatura"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Excluir */}
                              <button
                                type="button"
                                onClick={() => handleDeleteSubscription(sub.id)}
                                title="Excluir"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/30 hover:text-rose-400 text-stone-400 transition cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}

                  {filteredSubscriptions.length === 0 && filteredPortfolioList.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-stone-500">
                        Nenhum Bio Site encontrado com os filtros selecionados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ABA: VENCIMENTOS & INADIMPLÊNCIA */}
        {activeTab === 'vencimentos' && (
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Clientes a Vencer nos Próximos Dias */}
              <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <h2 className="font-bold text-white text-base">Próximos Vencimentos (15 dias)</h2>
                  </div>
                  <span className="text-xs font-mono text-stone-400">{proximosVencimentos.length} pendentes</span>
                </div>

                <div className="space-y-3">
                  {proximosVencimentos.length === 0 ? (
                    <p className="text-stone-500 text-xs py-8 text-center">Nenhum vencimento nos próximos 15 dias.</p>
                  ) : (
                    proximosVencimentos.map((sub) => (
                      <div key={sub.id} className="p-3.5 rounded-xl bg-[#0f1217] border border-stone-800/80 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white text-xs">{sub.businessName}</div>
                          <div className="text-[11px] text-stone-400">
                            Vencimento: <span className="font-mono text-amber-300">{sub.nextBillingDate}</span>
                            {sub.diffDays === 0 ? ' (Hoje!)' : sub.diffDays < 0 ? ` (${Math.abs(sub.diffDays)} dias atrasado)` : ` (em ${sub.diffDays} dias)`}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-white">R$ {sub.amount}</span>
                          <button
                            onClick={() => handleConfirmPayment(sub.id)}
                            className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold transition cursor-pointer"
                            title="Confirmar Pagamento Pix Recebido"
                          >
                            ✓ Pago
                          </button>
                          <a
                            href={`https://wa.me/${sub.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage(sub))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                          >
                            <MessageCircle className="w-3 h-3" /> Lembrar
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Inadimplentes e Cobrança Rápida */}
              <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    <h2 className="font-bold text-white text-base">Inadimplentes para Cobrar</h2>
                  </div>
                  <span className="text-xs font-mono text-rose-400 font-bold">
                    R$ {metrics.valorAtrasado},00 acumulado
                  </span>
                </div>

                <div className="space-y-3">
                  {subscriptions.filter(s => s.status === 'atrasada').length === 0 ? (
                    <div className="py-12 text-center text-stone-500 text-xs">
                      🎉 Parabéns! Nenhuma assinatura com atraso no momento.
                    </div>
                  ) : (
                    subscriptions.filter(s => s.status === 'atrasada').map((sub) => (
                      <div key={sub.id} className="p-3.5 rounded-xl bg-rose-950/10 border border-rose-900/30 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-rose-200 text-xs">{sub.businessName}</div>
                          <div className="text-[11px] text-stone-400">
                            Venceu em <span className="font-mono text-rose-300">{sub.nextBillingDate}</span> · {sub.whatsapp}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleConfirmPayment(sub.id)}
                            className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold transition cursor-pointer"
                            title="Confirmar Pagamento Pix Recebido (Dar Baixa)"
                          >
                            ✓ Pago (Pix)
                          </button>
                          <a
                            href={`https://wa.me/${sub.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage(sub))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                          >
                            <MessageCircle className="w-3 h-3" /> Cobrar Pix
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Templates de Mensagens WhatsApp Automatizadas */}
            <div className="p-5 bg-[#0d0f12] rounded-2xl border border-stone-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-stone-800 gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400" /> Templates de Notificação WhatsApp
                </span>
                <span className="text-[10px] text-stone-500 font-mono">Variáveis dinâmicas para preenchimento automático</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-400 mb-1">Mensagem de Cobrança / Inadimplência</label>
                  <textarea
                    rows={3}
                    value={msgCobrancaTemplate}
                    onChange={(e) => setMsgCobrancaTemplate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-400 mb-1">Mensagem de Boas-Vindas / Entrega do Bio Site</label>
                  <textarea
                    rows={3}
                    value={msgBoasVindasTemplate}
                    onChange={(e) => setMsgBoasVindasTemplate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABA: MÉTRICAS & RELATÓRIOS ESTRATÉGICOS */}
        {activeTab === 'metricas' && (
          <section className="space-y-6">
            {/* Header da Aba */}
            <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  BUSINESS INTELLIGENCE & ANALYTICS
                </span>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                  Métricas Executivas & Desempenho
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Visão consolidada de receita recorrente, distribuição por nichos, planos ativos e taxa de conversão dos Bio Sites.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={exportCSV}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-stone-700/80"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" /> Exportar CSV
                </button>
                <button
                  onClick={handleExportFullBackup}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-amber-500/30"
                >
                  <Database className="w-3.5 h-3.5" /> Backup JSON
                </button>
              </div>
            </div>

            {/* Grid 1: Nichos e Planos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Distribuição por Nicho (Col 7) */}
              <div className="lg:col-span-7 bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-white text-sm">Distribuição por Nicho de Mercado</h3>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">
                    {nicheMetrics.length} nichos cadastrados
                  </span>
                </div>

                <div className="space-y-3.5 pt-1">
                  {nicheMetrics.map((item) => (
                    <div key={item.niche} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-stone-200">{item.niche}</span>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-stone-400">{item.count} site{item.count > 1 ? 's' : ''}</span>
                          <span className="text-amber-400 font-bold">({item.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(item.percentage, 8)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mix de Planos & Funil de Conversão (Col 5) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Mix de Planos */}
                <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-white text-sm">Mix de Assinaturas por Plano</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-[#0d0f12] border border-stone-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs text-white flex items-center gap-2">
                          Plano Profissional
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                            MAIS VENDIDO
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-400 mt-0.5">
                          R$ 79/mês ou R$ 790/ano
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-amber-400 font-bold text-sm">{planDistribution.pro.count} clientes</div>
                        <div className="text-[10px] text-stone-500">R$ {planDistribution.pro.mrr.toLocaleString('pt-BR')}/mês</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#0d0f12] border border-stone-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs text-white">Plano Iniciante (Starter)</div>
                        <div className="text-[11px] text-stone-400 mt-0.5">R$ 29/mês</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-white font-bold text-sm">{planDistribution.starter.count} clientes</div>
                        <div className="text-[10px] text-stone-500">R$ {planDistribution.starter.mrr.toLocaleString('pt-BR')}/mês</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#0d0f12] border border-stone-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs text-purple-300">Plano Agência VIP</div>
                        <div className="text-[11px] text-stone-400 mt-0.5">R$ 149/mês</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-purple-400 font-bold text-sm">{planDistribution.agency.count} clientes</div>
                        <div className="text-[10px] text-stone-500">R$ {planDistribution.agency.mrr.toLocaleString('pt-BR')}/mês</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Funil de Conversão */}
                <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-800">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-white text-sm">Taxa de Conversão dos Bio Sites</h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>1. Visualizações Gerais</span>
                      <span className="font-mono font-bold text-white">100%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-full" />
                    </div>

                    <div className="flex items-center justify-between text-stone-300 pt-1">
                      <span>2. Cliques em Botões & Links</span>
                      <span className="font-mono font-bold text-amber-400">42.8%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-[42.8%]" />
                    </div>

                    <div className="flex items-center justify-between text-stone-300 pt-1">
                      <span>3. Conversão para WhatsApp / Agendamento</span>
                      <span className="font-mono font-bold text-emerald-400">31.4%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[31.4%]" />
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-400 pt-2 leading-relaxed">
                    ✨ Taxa média <strong>3.4x superior</strong> a links tradicionais devido à tecnologia de dissolução orgânica de retratos e botões nobres de alto contraste.
                  </p>
                </div>
              </div>
            </div>

            {/* Grid 2: Top Bio Sites Mais Visitados */}
            <div className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white text-base">Top Bio Sites com Maior Tráfego & Conversão</h3>
                </div>
                <span className="text-xs text-stone-400 font-mono">Base ativa auditada</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {topSites.map((site, idx) => (
                  <div
                    key={site.slug}
                    className="p-4 rounded-2xl bg-[#0d0f12] border border-stone-800/80 hover:border-amber-500/40 transition flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-base">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          {site.conversion} conv.
                        </span>
                      </div>
                      <div className="font-bold text-white text-xs truncate" title={site.name}>
                        {site.name}
                      </div>
                      <div className="text-[10px] text-stone-400 truncate mt-0.5 font-mono">
                        /{site.slug}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-800/80">
                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-300">
                        <span>Acessos:</span>
                        <span className="font-bold text-white">{site.views.toLocaleString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mt-1">
                        <span>Cliques:</span>
                        <span className="text-amber-400 font-bold">{site.clicks.toLocaleString('pt-BR')}</span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-stone-800">
                        <Link
                          href={`/${site.slug}`}
                          target="_blank"
                          className="flex-1 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-semibold text-center transition flex items-center justify-center gap-1"
                        >
                          <ExternalLink className="w-2.5 h-2.5" /> Ver
                        </Link>
                        <Link
                          href={`/conta?edit=${site.slug}`}
                          className="flex-1 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 text-[10px] font-bold text-center transition flex items-center justify-center gap-1 border border-amber-500/30"
                        >
                          <Wand2 className="w-2.5 h-2.5" /> Editar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ABA: GATEWAYS & PIX */}
        {activeTab === 'gateways' && (
          <section className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" /> Configuração de Pagamentos & Automação
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Configure sua chave Pix e conecte o gateway de cobrança automática recorrente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800">
              {/* Chave Pix Principal */}
              <div className="space-y-4 p-5 bg-[#0d0f12] rounded-2xl border border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <QrCode className="w-4 h-4" /> Chave Pix do Estúdio
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    ATIVO
                  </span>
                </div>
                <div>
                  <label className="block text-xs text-stone-400 mb-1">Chave Pix (CNPJ, E-mail ou Telefone)</label>
                  <input
                    type="text"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Esta chave é incluída automaticamente nos links de cobrança gerados para o WhatsApp.
                  </p>
                </div>
              </div>

              {/* Gateway de Recorrência Automática (Asaas / Stripe) */}
              <div className="space-y-4 p-5 bg-[#0d0f12] rounded-2xl border border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-400" /> Gateway de Assinatura
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    WEBHOOK ATIVO
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Provedor Integrado</label>
                    <select
                      value={gatewayProvider}
                      onChange={(e) => setGatewayProvider(e.target.value as any)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                    >
                      <option value="asaas">Asaas (Recomendado para Pix Recorrente & Boletos no Brasil)</option>
                      <option value="stripe">Stripe (Cartão de Crédito Internacional)</option>
                      <option value="mercadopago">Mercado Pago</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">API Key / Token de Acesso</label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Templates de Mensagens WhatsApp Automatizadas */}
            <div className="p-5 bg-[#0d0f12] rounded-2xl border border-stone-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-stone-800 gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400" /> Templates de Notificação WhatsApp
                </span>
                <span className="text-[10px] text-stone-500 font-mono">Variáveis dinâmicas para preenchimento automático</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-400 mb-1">Mensagem de Cobrança / Inadimplência</label>
                  <textarea
                    rows={3}
                    value={msgCobrancaTemplate}
                    onChange={(e) => setMsgCobrancaTemplate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-400 mb-1">Mensagem de Boas-Vindas / Entrega do Bio Site</label>
                  <textarea
                    rows={3}
                    value={msgBoasVindasTemplate}
                    onChange={(e) => setMsgBoasVindasTemplate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABA: VITRINE & MODELOS DE PORTFÓLIO */}
        {activeTab === 'portfolio' && (
          <section className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> Vitrine & Modelos de Portfólio
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Gerencie os Bio Sites exibidos na página pública <code className="text-amber-300">/portfolio</code>. Modelos demonstrativos não geram impacto financeiro no painel.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddClientModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Cliente Real ao Portfólio
                </button>
                <Link
                  href="/portfolio"
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition border border-stone-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Ver /portfolio
                </Link>
              </div>
            </div>

            {/* Tabela de Modelos de Portfólio */}
            <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-[#0d0f12]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#14181f] text-stone-400 font-mono text-[11px] uppercase border-b border-stone-800">
                  <tr>
                    <th className="py-3 px-4">Modelo / Profissional</th>
                    <th className="py-3 px-4">Nicho & Registro</th>
                    <th className="py-3 px-4">Tipo</th>
                    <th className="py-3 px-4">Métricas do Case</th>
                    <th className="py-3 px-4 text-center">Status no Portfólio</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {portfolioList.map((proj) => {
                    const isVisible = proj.inPortfolio !== false
                    return (
                      <tr key={proj.slug} className="hover:bg-stone-800/30 transition">
                        {/* Imagem + Nome + Link */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-stone-700/80 bg-stone-900">
                              <img
                                src={proj.photo}
                                alt={proj.name}
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                                {proj.name}
                              </div>
                              <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
                                <span>/{proj.slug}</span>
                                <Link
                                  href={`/portfolio/${proj.slug}`}
                                  target="_blank"
                                  className="text-amber-400/90 hover:underline inline-flex items-center gap-0.5 ml-1"
                                >
                                  Case <ExternalLink className="w-2.5 h-2.5" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Nicho & Registro */}
                        <td className="py-3.5 px-4">
                          <div className="text-stone-300 font-medium">{proj.role}</div>
                          <div className="text-[10px] text-amber-400/80 font-mono">{proj.registrationCode}</div>
                        </td>

                        {/* Tipo */}
                        <td className="py-3.5 px-4">
                          {proj.isPortfolioModel ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                              Demonstrativo (R$ 0)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              Cliente Real
                            </span>
                          )}
                        </td>

                        {/* Métricas do Case */}
                        <td className="py-3.5 px-4 font-mono text-[11px]">
                          <div className="text-stone-300">
                            <span className="text-amber-400 font-bold">{proj.stats.conversion}</span> conv.
                          </div>
                          <div className="text-[10px] text-stone-500">
                            {proj.stats.views} views · {proj.stats.clicks} cliques
                          </div>
                        </td>

                        {/* Status Toggle no Portfólio */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleTogglePortfolioVisibility(proj.slug)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer border ${
                              isVisible
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                                : 'bg-stone-800 text-stone-500 border-stone-700 hover:bg-stone-700 hover:text-stone-300'
                            }`}
                            title="Clique para alternar exibição no /portfolio"
                          >
                            <span className={`w-2 h-2 rounded-full ${isVisible ? 'bg-emerald-400' : 'bg-stone-500'}`} />
                            {isVisible ? 'Exibindo no Portfólio' : 'Oculto do Portfólio'}
                          </button>
                        </td>

                        {/* Ações */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/conta?edit=${proj.slug}`}
                              title="Editar no Construtor Visual (Cores, Fontes, Botões, Foto, Páginas)"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 font-semibold text-[11px] transition border border-amber-500/30"
                            >
                              <Wand2 className="w-3.5 h-3.5" />
                              <span>Editar Visual</span>
                            </Link>

                            <Link
                              href={`/${proj.slug}`}
                              target="_blank"
                              title="Abrir Bio Site ao Vivo"
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              onClick={() => {
                                setEditingProject(proj)
                                setIsProjectModalOpen(true)
                              }}
                              title="Editar Case de Estudo"
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteProject(proj.slug)}
                              title="Remover Modelo"
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/30 hover:text-rose-400 text-stone-400 transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {/* MODAL: CRIAR OU EDITAR ASSINATURA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-amber-400" />
                {editingSub ? `Editar Assinatura: ${editingSub.businessName}` : 'Nova Assinatura de Bio Site'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setEditingSub(null)
                }}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editingSub && (
              <div className="mt-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-amber-300">Quer editar o design deste Bio Site?</div>
                    <div className="text-[11px] text-stone-300">
                      Abra as cores, 16 fontes, 10 botões e foto de <strong>/{editingSub.slug}</strong> no Construtor Visual.
                    </div>
                  </div>
                </div>
                <Link
                  href={`/conta?edit=${editingSub.slug}`}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0 shadow-md"
                >
                  <Wand2 className="w-3.5 h-3.5" /> Abrir no Construtor Visual
                </Link>
              </div>
            )}

            <form onSubmit={handleSaveModal} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1">Nome do Cliente Responsável *</label>
                  <input
                    type="text"
                    name="clientName"
                    defaultValue={editingSub?.clientName || ''}
                    required
                    placeholder="Ex: Dra. Ana Freire"
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Nome do Negócio / Marca *</label>
                  <input
                    type="text"
                    name="businessName"
                    defaultValue={editingSub?.businessName || ''}
                    required
                    placeholder="Ex: Odontologia Estética Freire"
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1">WhatsApp (com DDD) *</label>
                  <input
                    type="text"
                    name="whatsapp"
                    defaultValue={editingSub?.whatsapp || ''}
                    required
                    placeholder="Ex: 5581987654321"
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingSub?.email || ''}
                    required
                    placeholder="cliente@email.com"
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1">Nicho / Área</label>
                  <input
                    type="text"
                    name="niche"
                    defaultValue={editingSub?.niche || 'Saúde'}
                    placeholder="Ex: Medicina"
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Slug do Link (/seunome) *</label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingSub?.slug || ''}
                    required
                    placeholder="ex: ana-freire"
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Domínio Próprio (Opcional)</label>
                  <input
                    type="text"
                    name="customDomain"
                    defaultValue={editingSub?.customDomain || ''}
                    placeholder="ex: seudominio.com.br"
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-stone-400 mb-1">Plano</label>
                  <select
                    name="planId"
                    defaultValue={editingSub?.planId || 'pro'}
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="starter">Iniciante (R$ 29)</option>
                    <option value="pro">Profissional (R$ 79)</option>
                    <option value="agency">Agência (R$ 199)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Ciclo</label>
                  <select
                    name="cycle"
                    defaultValue={editingSub?.cycle || 'mensal'}
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="mensal">Mensal</option>
                    <option value="anual">Anual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Valor da Cobrança (R$)</label>
                  <input
                    type="number"
                    name="amount"
                    defaultValue={editingSub?.amount || 79}
                    required
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Método</label>
                  <select
                    name="paymentMethod"
                    defaultValue={editingSub?.paymentMethod || 'pix'}
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="pix">Pix</option>
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="boleto">Boleto Bancário</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1">Status da Assinatura</label>
                  <select
                    name="status"
                    defaultValue={editingSub?.status || 'ativa'}
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="ativa">Ativa</option>
                    <option value="pendente">Pendente (Aguardando)</option>
                    <option value="atrasada">Em Atraso</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Data Início</label>
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={editingSub?.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Próximo Vencimento</label>
                  <input
                    type="date"
                    name="nextBillingDate"
                    defaultValue={editingSub?.nextBillingDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]}
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Observações Internas (Opcional)</label>
                <textarea
                  name="notes"
                  defaultValue={editingSub?.notes || ''}
                  rows={2}
                  placeholder="Anotações sobre preferências, histórico de contatos..."
                  className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingSub(null)
                  }}
                  className="px-4 py-2 text-stone-400 hover:text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl transition cursor-pointer"
                >
                  {editingSub ? 'Salvar Alterações' : 'Criar Assinatura'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: COBRANÇA PIX INSTANTÂNEA */}
      {pixModalSub && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-md w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <QrCode className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Cobrança Pix Rápida</h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {pixModalSub.businessName} · R$ {pixModalSub.amount},00 ({pixModalSub.cycle})
              </p>
            </div>

            <div className="p-4 bg-[#0d0f12] border border-stone-800 rounded-2xl space-y-3">
              <div className="text-xs text-stone-400">Chave Pix Copia e Cola:</div>
              <div className="font-mono text-xs text-amber-300 break-all p-2 bg-stone-900 rounded-lg select-all">
                {pixKey}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(pixKey)
                  setPixCopied(true)
                  setTimeout(() => setPixCopied(false), 2000)
                }}
                className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> {pixCopied ? 'Copiado com Sucesso!' : 'Copiar Chave Pix'}
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/${pixModalSub.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage(pixModalSub))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" /> Enviar Cobrança no WhatsApp
              </a>
              <button
                onClick={() => setPixModalSub(null)}
                className="w-full py-2 text-stone-400 hover:text-white text-xs transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR CASE DE ESTUDO DO PORTFÓLIO */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-amber-400" />
                Editar Case de Estudo: {editingProject.name}
              </h3>
              <button
                onClick={() => {
                  setIsProjectModalOpen(false)
                  setEditingProject(null)
                }}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-amber-300">Prefere editar no Construtor Visual?</div>
                  <div className="text-[11px] text-stone-300">
                    Ajuste fotos, 16 fontes, 10 estilos de botões e páginas com <strong>iPhone Mockup ao vivo</strong>.
                  </div>
                </div>
              </div>
              <Link
                href={`/conta?edit=${editingProject.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0 shadow-md"
              >
                <Wand2 className="w-3.5 h-3.5" /> Abrir no Construtor Visual
              </Link>
            </div>

            <form onSubmit={handleSaveProjectModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1">Nome do Profissional / Empresa</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingProject.name}
                    required
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Especialidade / Título do Case</label>
                  <input
                    type="text"
                    name="role"
                    defaultValue={editingProject.role}
                    required
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1">Categoria</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingProject.category}
                    required
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Registro Oficial (CRO, CRM, OAB...)</label>
                  <input
                    type="text"
                    name="registrationCode"
                    defaultValue={editingProject.registrationCode}
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Monograma (Assinatura)</label>
                  <input
                    type="text"
                    name="monogram"
                    defaultValue={editingProject.monogram}
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">URL da Foto de Retrato (Estúdio)</label>
                <input
                  type="url"
                  name="photo"
                  defaultValue={editingProject.photo}
                  required
                  className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono text-[11px] focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Descrição / História do Case</label>
                <textarea
                  name="description"
                  defaultValue={editingProject.description}
                  rows={3}
                  required
                  className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white leading-relaxed focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1">Paleta de Cores</label>
                  <select
                    name="paletteId"
                    defaultValue={editingProject.paletteId}
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    {PALETTES.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Tipografia Editorial</label>
                  <select
                    name="typographyId"
                    defaultValue={editingProject.typographyId}
                    className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    {TYPOGRAPHIES.map((t) => (
                      <option key={t.id} value={t.id}>{t.name} ({t.desc})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Modelo de Botão VIP (Alta Conversão)</label>
                <select
                  name="buttonStyle"
                  defaultValue={editingProject.buttonStyle || 'cartao_nobre'}
                  className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  {BUTTON_STYLES.filter(b => !['moldura', 'solido', 'vidro', 'sombra', 'pill'].includes(b.id)).map((b) => (
                    <option key={b.id} value={b.id}>{b.name} — {b.desc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Diferenciais do Case (separados por vírgula)</label>
                <input
                  type="text"
                  name="features"
                  defaultValue={editingProject.features.join(', ')}
                  className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="p-4 bg-[#0d0f12] rounded-2xl border border-stone-800 space-y-3">
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Métricas de Conversão do Case
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1">Visualizações</label>
                    <input
                      type="text"
                      name="views"
                      defaultValue={editingProject.stats.views}
                      className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1">Cliques no WhatsApp</label>
                    <input
                      type="text"
                      name="clicks"
                      defaultValue={editingProject.stats.clicks}
                      className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1">Taxa de Conversão</label>
                    <input
                      type="text"
                      name="conversion"
                      defaultValue={editingProject.stats.conversion}
                      className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsProjectModalOpen(false)
                    setEditingProject(null)
                  }}
                  className="px-4 py-2 text-stone-400 hover:text-white transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl transition cursor-pointer"
                >
                  Salvar Case de Estudo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SELECIONAR CLIENTE REAL PARA O PORTFÓLIO */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  Transformar Cliente Real em Modelo de Portfólio
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Escolha um cliente da sua base de assinantes para expor na vitrine pública /portfolio com case completo.
                </p>
              </div>
              <button
                onClick={() => setIsAddClientModalOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 pt-2">
              {subscriptions.map((sub) => {
                const alreadyInPortfolio = portfolioList.some(p => p.slug === sub.slug)
                return (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-2xl bg-[#0d0f12] border border-stone-800 flex items-center justify-between hover:border-stone-700 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-xs flex items-center gap-2">
                        {sub.clientName}
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-stone-800 text-stone-300 font-mono">
                          /{sub.slug}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        {sub.businessName} · <span className="text-amber-400/90">{sub.niche}</span>
                      </div>
                    </div>

                    <div>
                      {alreadyInPortfolio ? (
                        <span className="text-[10px] px-3 py-1.5 rounded-xl bg-stone-800 text-stone-500 font-mono">
                          Já na Vitrine
                        </span>
                      ) : (
                        <button
                          onClick={() => handleConvertClientToPortfolio(sub)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" /> Adicionar à Vitrine
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CLONAR MODELO PARA NOVO CLIENTE (1-CLICK GENERATOR) */}
      {isCloneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-amber-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                  1-CLICK CLIENT GENERATOR
                </span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Clonar Modelo para Novo Cliente
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Replica instantaneamente o design completo (retrato, paleta, 16 fontes, 10 botões e subpáginas) de um modelo existente para um novo assinante.
                </p>
              </div>
              <button
                onClick={() => setIsCloneModalOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCloneModel} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-semibold">
                  Modelo Base (Template de Referência) *
                </label>
                <select
                  name="sourceSlug"
                  value={cloneSourceSlug}
                  onChange={(e) => setCloneSourceSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  {defaultProjects.map((proj) => (
                    <option key={proj.slug} value={proj.slug}>
                      {proj.name} — {proj.category} (/{proj.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Nome do Cliente Responsável *</label>
                  <input
                    type="text"
                    name="clientName"
                    required
                    placeholder="Ex: Dra. Mariana Costa"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Nome da Empresa / Consultório *</label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    placeholder="Ex: Mariana Costa Dermatologia"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Slug da URL (biovip.com.br/slug) *</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="Ex: mariana-costa"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">WhatsApp com DDD *</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    placeholder="Ex: 5581999998888"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue="cliente@biovip.com.br"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Plano</label>
                  <select
                    name="planId"
                    defaultValue="pro"
                    className="w-full px-3.5 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="starter">Iniciante (R$ 29/mês)</option>
                    <option value="pro">Profissional (R$ 79/mês ou R$ 790/ano)</option>
                    <option value="agency">Agência VIP (R$ 149/mês)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-semibold">Ciclo & Valor (R$)</label>
                  <div className="flex gap-2">
                    <select
                      name="cycle"
                      defaultValue="anual"
                      className="w-1/2 px-2 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer text-[11px]"
                    >
                      <option value="mensal">Mensal</option>
                      <option value="anual">Anual</option>
                    </select>
                    <input
                      type="number"
                      name="amount"
                      defaultValue={790}
                      className="w-1/2 px-2 py-2.5 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono text-center focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCloneModalOpen(false)}
                  className="px-4 py-2.5 text-stone-400 hover:text-white transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Zap className="w-4 h-4" /> Clonar & Ativar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: QR CODE DE DIVULGAÇÃO & DISPLAY DE BALCÃO */}
      {qrModalSite && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setQrModalSite(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                DIVULGAÇÃO & DISPLAY DE BALCÃO
              </span>
              <h3 className="text-xl font-bold text-white">
                {qrModalSite.name}
              </h3>
              <p className="text-xs text-stone-400 font-mono mt-1">
                biovip.com.br/{qrModalSite.slug}
              </p>
            </div>

            {/* Imagem do QR Code em Alta Resolução */}
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-3xl border-4 border-stone-900 shadow-2xl">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(`https://biovip.com.br/${qrModalSite.slug}`)}`}
                  alt={`QR Code ${qrModalSite.name}`}
                  className="w-48 h-48 rounded-2xl"
                />
              </div>
            </div>

            {/* Mockup do Display de Balcão */}
            <div className="p-3.5 bg-[#0d0f12] rounded-2xl border border-stone-800 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-200">Pronto para Impressão de Balcão</div>
                <div className="text-[11px] text-stone-400 leading-tight mt-0.5">
                  Envie este QR Code para imprimir no display de acrílico da recepção ou balcão de atendimento.
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`https://biovip.com.br/${qrModalSite.slug}`)
                  setQrCopied(true)
                  setTimeout(() => setQrCopied(false), 2000)
                }}
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                {qrCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {qrCopied ? 'Link Copiado com Sucesso!' : 'Copiar Link Oficial do Bio Site'}
              </button>

              <a
                href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(`https://biovip.com.br/${qrModalSite.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" /> Baixar Imagem do QR Code (PNG)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BACKUP & RESTAURAÇÃO COMPLETA */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsBackupModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                SEGURANÇA DE DADOS
              </span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                Backup & Restauração Completa
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Exporte todos os clientes, modelos customizados, paletas e configurações do painel em um único arquivo JSON.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Exportar */}
              <div className="p-4 rounded-2xl bg-[#0d0f12] border border-stone-800 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-amber-400" />
                  Exportar Backup Completo (JSON)
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Gera uma cópia de segurança com todas as {subscriptions.length} assinaturas e {portfolioList.length} modelos de portfólio.
                </p>
                <button
                  type="button"
                  onClick={handleExportFullBackup}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl transition cursor-pointer"
                >
                  Baixar Arquivo de Backup (.json)
                </button>
              </div>

              {/* Importar */}
              <div className="p-4 rounded-2xl bg-[#0d0f12] border border-stone-800 space-y-3">
                <div className="font-bold text-white flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-emerald-400" />
                  Restaurar Backup Anterior
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Carregue um arquivo JSON gerado anteriormente para restaurar todas as assinaturas e dados no navegador.
                </p>
                <label className="block w-full py-2.5 text-center bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl transition cursor-pointer border border-stone-700">
                  <span>Selecionar Arquivo JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: IMPORTAR JSON GEMINI AI (GERADOR OFICIAL BIOVIP) */}
      {isGeminiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-purple-500/30 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => {
                setIsGeminiModalOpen(false)
                setGeminiError(null)
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 border-b border-stone-800">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block mb-1">
                AUTOMAÇÃO DE MICROSITES BIOVIP · PROMPT GEMINI OFICIAL
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                Importar Microsite Gerado por IA
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Cole o JSON gerado no Gemini com os dados de <code className="text-purple-300">adminClient</code> e <code className="text-purple-300">microsite</code>. Nosso motor irá instanciar automaticamente todas as 12 seções modulares (triagem, catálogo de serviços, rota GPS com Waze/Uber, métricas, escassez e vCard).
              </p>
            </div>

            {/* Banner de cópia do Prompt Oficial */}
            <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-800/40 flex items-start justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-purple-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Como gerar o JSON no Gemini?
                </p>
                <p className="text-stone-400 text-[11px] mt-0.5">
                  Copie nosso prompt oficial mestre, envie ao Gemini junto com o @ e link do Google Maps do cliente e cole a resposta JSON aqui.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const prompt = `Você é o Arquiteto de IA Oficial do BioVip (ecossistema de microsites de luxo e alta conversão para profissionais liberais, clínicas médicas, odontologia, estúdios de beleza e barbearias).

Sua missão: Gerar a estrutura JSON COMPLETA, RICA e PERSUASIVA para instanciar um novo BioSite com todos os 18 módulos preenchidos automaticamente.

DADOS DE ENTRADA DO CLIENTE:
- Nome/Negócio: [Nome do Estabelecimento ou Especialista]
- Nicho: [Ex: Odontologia Estética, Dermatologia, Lash Designer, Barbearia Premium, Advocacia]
- Instagram: @[usuario]
- WhatsApp: [DDD + Telefone]
- Endereço Google Maps: [Endereço Completo com Bairro e Cidade]
- Especialidades / Procedimentos Principais: [Lista de serviços se houver, ou invente coerentes com alto padrão]

DIRETRIZES DE GERAÇÃO:
1. "theme": Escolha uma das paletas oficiais:
   - "luxo_nude" (Nude Champagne, editorial para clínicas e estética)
   - "dourado_vip" (Ouro Imperial, alta autoridade para barbearias e holdings)
   - "esmeralda_ouro" (Verde Esmeralda Nobre, medicina integrativa e bem-estar)
   - "rose_quartz" (Rosé Quartz Glamour, lash, nails e estética facial)
   - "black_ultra" (Preto Titânio Minimalista, barbearias e arquitetura)
   - "safira_ouro" (Azul Safira & Ouro, advocacia e negócios executivos)
2. "typographyId": "instrument" | "cormorant" | "playfair" | "outfit"
3. "buttonStyle": "cartao_nobre" | "vidro_glamour" | "solido_glam" | "shimmer_ouro"
4. "buttonAnimation": "shimmer" | "pulse" | "glow"
5. Todos os textos devem ser em Português do Brasil com copywriting magnético de alto padrão (sem clichês amadores).
6. "galleryPhotos": Array com 4 a 6 URLs de fotos reais e funcionais do Unsplash que combinem com o nicho.
7. "actionCards": Mínimo 3 botões estratégicos (Agendamento VIP, Catálogo de Procedimentos, Localização & Rotas).
8. Responda ESTRITAMENTE com o JSON puro, sem blocos de texto antes ou depois.

FORMATO OBRIGATÓRIO:
{
  "adminClient": {
    "clientName": "Nome do Cliente Responsável",
    "clientPhone": "5531999999999",
    "clientEmail": "contato@cliente.com.br",
    "subdomain": "slug-do-cliente",
    "nicheCategory": "Odontologia Estética",
    "creationFee": 79.90,
    "monthlyFee": 49.90
  },
  "microsite": {
    "theme": "luxo_nude",
    "typographyId": "instrument",
    "buttonStyle": "cartao_nobre",
    "buttonAnimation": "shimmer",
    "profile": {
      "name": "Dra. Ana Freire",
      "title": "Odontologia Estética & Reabilitação Oral",
      "registrationCode": "CRO-PE 22.675",
      "tagline": "Criando sorrisos harmônicos e transformadores com o mais alto rigor técnico e artístico.",
      "cursivePhrase": "A arte de desenhar sorrisos exclusivos e naturais.",
      "bio": "Especialista em lentes de contato dental e facetas com atendimento exclusivo sob medida.",
      "avatarUrl": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=85"
    },
    "actionCards": [
      {
        "id": "btn-1",
        "title": "AGENDAMENTO VIP",
        "subtitle": "Escolha o melhor horário com confirmação prioritária.",
        "variant": "accent",
        "badgeText": "⭐ MAIS ESCOLHIDO",
        "linkType": "whatsapp",
        "whatsappMessage": "Olá! Gostaria de agendar uma consulta de avaliação."
      },
      {
        "id": "btn-2",
        "title": "CATÁLOGO DE PROCEDIMENTOS",
        "subtitle": "Conheça nossas técnicas exclusivas e protocolos.",
        "variant": "default",
        "url": "#catalogo"
      },
      {
        "id": "btn-3",
        "title": "LOCALIZAÇÃO & ROTAS GPS",
        "subtitle": "Rotas diretas pelo Google Maps e Waze.",
        "variant": "default",
        "url": "#localizacao"
      }
    ],
    "announcement": {
      "enabled": true,
      "badge": "CONSULTORIA VIP",
      "text": "Agenda de avaliações estéticas aberta para este mês."
    },
    "urgency": {
      "enabled": true,
      "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
      "subtitle": "Garanta seu horário com avaliação prioritária antes que expire:",
      "minutes": 15
    },
    "metrics": {
      "items": [
        { "value": "+1.400", "label": "SORRISOS TRANSFORMADOS" },
        { "value": "9 anos", "label": "DE EXPERIÊNCIA CLÍNICA" },
        { "value": "5.0★", "label": "AVALIAÇÃO NO GOOGLE" }
      ]
    },
    "howItWorks": {
      "items": [
        { "number": "01", "title": "Triagem & Consulta Inicial", "description": "Você relata seu objetivo pelo WhatsApp e alinhamos o melhor horário para seu atendimento reservado." },
        { "number": "02", "title": "Planejamento Digital 3D", "description": "Diagnóstico fotográfico e simulação estética personalizada antes de iniciar o procedimento." },
        { "number": "03", "title": "Execução & Suporte VIP", "description": "Aplicação com técnicas minimamente invasivas e acompanhamento exclusivo da equipe." }
      ]
    },
    "services": {
      "enabled": true,
      "headline": "Procedimentos & Soluções Exclusivas",
      "subtitle": "Protocolos baseados no mais alto padrão de entrega",
      "categories": ["TODOS", "MAIS PROCURADO", "EXCLUSIVO"],
      "items": [
        {
          "id": "srv-1",
          "name": "Lentes de Contato Dental em Porcelana",
          "category": "MAIS PROCURADO",
          "duration": "2h00",
          "priceFormatted": "Sob Consulta",
          "description": "Lâminas ultrafinas de alta resistência desenhadas para harmonia facial e naturalidade.",
          "badge": "MAIS PROCURADO",
          "featured": true
        },
        {
          "id": "srv-2",
          "name": "Facetas em Resina Composta Premium",
          "category": "MAIS PROCURADO",
          "duration": "1h30",
          "priceFormatted": "Sob Consulta",
          "description": "Reabilitação estética rápida com estratificação de cores para efeito perolado impecável.",
          "badge": "RESULTADO IMEDIATO",
          "featured": false
        },
        {
          "id": "srv-3",
          "name": "Clareamento Dental a Laser VIP",
          "category": "EXCLUSIVO",
          "duration": "1h00",
          "priceFormatted": "Sob Consulta",
          "description": "Protocolo fototérmico com barreira gengival para brilho radiante sem sensibilidade.",
          "badge": "EXCLUSIVO",
          "featured": false
        }
      ]
    },
    "galleryPhotos": [
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
    ],
    "locationCard": {
      "enabled": true,
      "address": "Av. Boa Viagem, 2000 - Sala 801, Recife - PE",
      "hours": "Seg a Sex · 08:30 às 19:30 | Sáb · 09h às 14h",
      "openStatus": "Aberto Agora · Atendimento com Hora Marcada",
      "mapsUrl": "https://maps.google.com"
    },
    "testimonials": {
      "items": [
        { "clientName": "Mariana Albuquerque", "city": "Recife - PE", "text": "A melhor experiência clínica que já tive! O resultado das lentes ficou tão natural que ninguém diz que não são meus dentes de nascença.", "rating": 5 },
        { "clientName": "Lucas Vasconcelos", "city": "Olinda - PE", "text": "Ambiente espetacular, pontualidade britânica e um atendimento que transmite muita segurança. Recomendo de olhos fechados!", "rating": 5 }
      ]
    },
    "aboutMe": {
      "headline": "Excelência e Arte em Odontologia Estética",
      "paragraph": "Com quase uma década dedicada à odontologia estética e reabilitação oral, unimos tecnologia digital de ponta ao toque artesanal para elevar a autoestima e a presença de nossos pacientes.",
      "closingPhrase": "O seu sorriso é o seu cartão de visitas mais valioso."
    },
    "faq": {
      "items": [
        { "question": "Como funciona a primeira consulta de avaliação?", "answer": "Realizamos um escaneamento intraoral e diagnóstico fotográfico completo para apresentar uma simulação do seu resultado antes de qualquer intervenção." },
        { "question": "Quanto tempo dura o procedimento com lentes ou facetas?", "answer": "Dependendo da técnica selecionada, o tratamento pode ser concluído em apenas 1 a 3 sessões com conforto absoluto." },
        { "question": "Quais são as opções de pagamento?", "answer": "Aceitamos Pix instantâneo, transferência bancária e parcelamento em até 12x no cartão de crédito." }
      ]
    },
    "qualifierFunnel": {
      "enabled": true,
      "buttonLabel": "✨ Descobrir Tratamento Ideal (Triagem VIP)",
      "headline": "Atendimento Personalizado",
      "subtitle": "Responda 2 perguntas rápidas para agilizar seu horário no WhatsApp:",
      "questions": [
        {
          "id": "q1",
          "title": "Qual transformação você mais deseja hoje?",
          "options": [
            "Lentes de Contato / Facetas",
            "Clareamento Dental Profissional",
            "Harmonização do Sorriso & Gengiva"
          ]
        },
        {
          "id": "q2",
          "title": "Qual período você prefere para sua consulta?",
          "options": [
            "Manhã (08h às 12h)",
            "Tarde (13h às 18h)",
            "Sábado pela manhã"
          ]
        }
      ]
    },
    "subpages": [
      { "slug": "procedimentos", "title": "Procedimentos & Valores", "description": "Tabela de procedimentos estéticos com detalhes e durações.", "previewType": "services" },
      { "slug": "transformacoes", "title": "Antes e Depois Sorrisos", "description": "Galeria comparativa interativa de transformações reais.", "previewType": "before_after" }
    ]
  }
}`
                  navigator.clipboard.writeText(prompt)
                  setPortfolioSuccessToast('Prompt Oficial Gemini copiado com sucesso! Envie ao Gemini e cole o JSON gerado abaixo.')
                  setTimeout(() => setPortfolioSuccessToast(null), 4000)
                }}
                className="shrink-0 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-purple-900/30"
              >
                <Copy className="w-3.5 h-3.5" />
                Copiar Prompt Mestre
              </button>
            </div>

            {/* Textarea do JSON */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center justify-between">
                <span>Cole o JSON do Gemini abaixo:</span>
                <span className="text-[10px] text-stone-500 font-mono">Formato JSON válido</span>
              </label>
              <textarea
                rows={12}
                value={geminiJsonInput}
                onChange={(e) => {
                  setGeminiJsonInput(e.target.value)
                  setGeminiError(null)
                }}
                placeholder={`{\n  "adminClient": { ... },\n  "microsite": { ... }\n}`}
                className="w-full p-4 bg-[#0a0c0e] border border-stone-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 rounded-2xl text-xs font-mono text-stone-200 placeholder-stone-600 focus:outline-none resize-none leading-relaxed"
              />
              {geminiError && (
                <div className="mt-2 p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{geminiError}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                type="button"
                onClick={() => {
                  setIsGeminiModalOpen(false)
                  setGeminiError(null)
                }}
                className="px-4 py-2.5 text-xs font-semibold text-stone-400 hover:text-white transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleImportGemini}
                disabled={!geminiJsonInput.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-purple-900/30 flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                Importar e Criar BioSite Instantaneamente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ALTERAR PIN DE SEGURANÇA */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-sm w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsPinModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Alterar PIN Master</h3>
              <p className="text-xs text-stone-400 mt-1">
                Defina um novo código numérico de 4 a 6 dígitos para acessar o painel ADM.
              </p>
            </div>

            <form onSubmit={handleChangePin} className="space-y-4">
              <div>
                <label className="block text-xs text-stone-400 mb-1 font-semibold text-center">Novo PIN Numérico</label>
                <input
                  type="password"
                  maxLength={6}
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Ex: 8492"
                  required
                  className="w-full px-4 py-3 bg-[#0d0f12] border border-stone-700 rounded-xl text-center text-xl font-mono tracking-widest text-white focus:border-amber-400 focus:outline-none"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Salvar Novo PIN
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TOAST: CONFIRMAÇÃO DE PAGAMENTO PIX */}
      {paymentSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-emerald-500 text-stone-950 font-sans text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-stone-950" />
          <span>{paymentSuccessToast}</span>
        </div>
      )}

      {/* TOAST: NOVO PIN */}
      {pinSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-amber-500 text-stone-950 font-sans text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-fade-in">
          <Key className="w-5 h-5 text-stone-950" />
          <span>{pinSuccessToast}</span>
        </div>
      )}

      {/* TOAST DE FEEDBACK DO PORTFÓLIO */}
      {portfolioSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-amber-500 text-stone-950 font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{portfolioSuccessToast}</span>
        </div>
      )}
    </div>
  )
}


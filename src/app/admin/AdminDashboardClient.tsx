'use client'

import AdminAuthGate from './components/AdminAuthGate'
import AdminGatewaysTab from './components/AdminGatewaysTab'
import AdminMetricsTab from './components/AdminMetricsTab'
import AdminDueDatesTab from './components/AdminDueDatesTab'
import AdminSecurityModal from './components/AdminSecurityModal'
import AdminClientCredentialsModal from './components/AdminClientCredentialsModal'
import AdminPermissionsModal from './components/AdminPermissionsModal'
import AdminProjectModal from './components/AdminProjectModal'
import AdminSubscriptionModal from './components/AdminSubscriptionModal'
import AdminPixModal from './components/AdminPixModal'
import AdminPortfolioModals from './components/AdminPortfolioModals'
import AdminGeminiModal from './components/AdminGeminiModal'
import AdminCreateBioSiteModal from './components/AdminCreateBioSiteModal'
import AdminSubscriptionsTab from './components/AdminSubscriptionsTab'
import AdminPortfolioTab from './components/AdminPortfolioTab'
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
import { PALETTES, TYPOGRAPHIES, DEMO_PHOTOS, BUTTON_STYLES, BUTTON_ANIMATIONS, NICHES_LIST } from '@/data/bioSiteDesign'
import { generateNicheContent } from '@/utils/aiNicheGenerator'
import { healMojibake } from '@/utils/textSanitizer'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
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
  ShieldCheck,
  Eye,
  EyeOff,
  History,
  Timer,
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
  Bot,
  Camera,
  Upload,
  Sliders,
  Dices,
  ChevronLeft,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
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
import { getLeads, LeadSubmission, saveBioSite } from '@/services/biositeService'
import {
  authenticateAdmin,
  validateCurrentSession,
  destroySession,
  checkLockoutStatus,
  updateAdminSecret,
  getAccessLogs,
  getSecurityConfig,
  saveSecurityConfig,
  AccessLogEntry,
  SecurityConfig
} from '@/services/adminAuthService'

export default function AdminDashboardClient() {
  // Autenticação Criptográfica de Alta Segurança (SHA-256 + Salt & Anti-Brute-Force)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [pinInput, setPinInput] = useState<string>('')
  const [pinError, setPinError] = useState<string | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false)
  const [showSecret, setShowSecret] = useState<boolean>(false)
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0)
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null)

  // Central de Segurança & Auditoria
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState<boolean>(false)
  const [securityTab, setSecurityTab] = useState<'senha' | 'auditoria' | 'politicas'>('senha')
  const [securityLogs, setSecurityLogs] = useState<AccessLogEntry[]>([])
  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>(getSecurityConfig())
  const [oldSecretInput, setOldSecretInput] = useState<string>('')
  const [confirmNewSecretInput, setConfirmNewSecretInput] = useState<string>('')
  const [securityFeedback, setSecurityFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

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
  const [customAvatarPreview, setCustomAvatarPreview] = useState<string | null>(null)

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

  // Controle de Permissões do Cliente & Módulos do BioSite
  const [permissionsModalSlug, setPermissionsModalSlug] = useState<string | null>(null)
  const [permissionsModalTitle, setPermissionsModalTitle] = useState<string>('')
  const [permissionsActiveTab, setPermissionsActiveTab] = useState<'permissoes' | 'modulos'>('permissoes')
  const [currentClientPermissions, setCurrentClientPermissions] = useState<ClientPermissions>(DEFAULT_CLIENT_PERMISSIONS)
  const [currentModuleToggles, setCurrentModuleToggles] = useState<ModuleToggles>(DEFAULT_MODULE_TOGGLES)
  const [permissionsSuccessToast, setPermissionsSuccessToast] = useState<string | null>(null)

  const handleOpenPermissionsModal = (targetSlug: string, targetTitle: string) => {
    const config = getClientConfig(targetSlug)
    setCurrentClientPermissions(config.permissions)
    setCurrentModuleToggles(config.modules)
    setPermissionsModalSlug(targetSlug)
    setPermissionsModalTitle(targetTitle)
    setPermissionsActiveTab('permissoes')
  }

  const handleSavePermissions = () => {
    if (!permissionsModalSlug) return
    saveClientConfig(permissionsModalSlug, {
      permissions: currentClientPermissions,
      modules: currentModuleToggles
    })
    setPermissionsSuccessToast(`Permissões e módulos de /${permissionsModalSlug} atualizados em tempo real!`)
    setTimeout(() => setPermissionsSuccessToast(null), 3500)
    setPermissionsModalSlug(null)
  }

  // =========================================================
  // MODAL CRIAR BIOSITE (IA GEMINI OU 9 PASSOS MANUAIS)
  // =========================================================
  const [isCreateBioSiteModalOpen, setIsCreateBioSiteModalOpen] = useState<boolean>(false)
  const generateRandomPasswordValue = () => {
    const prefixes = ['BioVip', 'VipLuxo', 'Studio', 'Elite', 'Ouro', 'Master', 'TopVip']
    const symbols = ['@', '#', '$', '!', '&', '*']
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
    const randomNum = Math.floor(100 + Math.random() * 900)
    const letters = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ'
    let tail = ''
    for (let i = 0; i < 2; i++) {
      tail += letters[Math.floor(Math.random() * letters.length)]
    }
    return `${randomPrefix}${randomSymbol}${randomNum}${tail}!`
  }

  // Modal para Visualizar / Resetar Credenciais do Cliente
  const [credentialsModalClient, setCredentialsModalClient] = useState<{
    slug: string
    name: string
    email: string
    password?: string
    phone: string
  } | null>(null)
  const [showCredentialsModalPassword, setShowCredentialsModalPassword] = useState<boolean>(false)
  const [credentialsCopiedToast, setCredentialsCopiedToast] = useState<boolean>(false)

  const handleOpenClientCredentials = (sub: Subscription) => {
    let email = sub.email || `${sub.slug}@biovip.com.br`
    let password = 'BioVip2026!'
    let phone = sub.whatsapp || '5531991390202'

    try {
      const raw = localStorage.getItem('biovip_users')
      if (raw) {
        const users = JSON.parse(raw)
        const found = users.find((u: any) => u.slug === sub.slug || (u.email && u.email.toLowerCase() === sub.email?.toLowerCase()))
        if (found) {
          if (found.email) email = found.email
          if (found.password) password = found.password
          if (found.phone) phone = found.phone
        }
      }
    } catch (e) {
      console.warn(e)
    }

    setCredentialsModalClient({
      slug: sub.slug,
      name: sub.clientName || sub.businessName,
      email,
      password,
      phone
    })
    setShowCredentialsModalPassword(false)
  }

  const handleUpdateModalClientPassword = (newPass: string) => {
    if (!credentialsModalClient) return
    try {
      const raw = localStorage.getItem('biovip_users')
      let users = raw ? JSON.parse(raw) : []
      users = users.filter((u: any) => u.slug !== credentialsModalClient.slug && u.email !== credentialsModalClient.email)
      users.unshift({
        email: credentialsModalClient.email,
        password: newPass,
        slug: credentialsModalClient.slug,
        brandName: credentialsModalClient.name,
        phone: credentialsModalClient.phone,
        updatedAt: new Date().toISOString()
      })
      localStorage.setItem('biovip_users', JSON.stringify(users))
      setCredentialsModalClient({
        ...credentialsModalClient,
        password: newPass
      })
      setPermissionsSuccessToast(`Nova senha salva para ${credentialsModalClient.name}!`)
      setTimeout(() => setPermissionsSuccessToast(null), 3000)
    } catch (e) {
      console.error(e)
    }
  }

  const slugifyText = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
  }

  const handleOpenCreateBioSiteModal = () => {
    setIsCreateBioSiteModalOpen(true)
  }

  // Configurações do Gateway
  const [pixKey, setPixKey] = useState<string>('12.345.678/0001-90')
  const [gatewayProvider, setGatewayProvider] = useState<'asaas' | 'stripe' | 'mercadopago'>('asaas')
  const [apiKey, setApiKey] = useState<string>('live_sk_849204820194820194820')
  const [webhookStatus, setWebhookStatus] = useState<boolean>(true)

  // Cronômetro para o bloqueio de segurança (Lockout)
  useEffect(() => {
    const lock = checkLockoutStatus()
    if (lock.isLocked) {
      setLockoutRemaining(lock.remainingSeconds)
    }

    const interval = setInterval(() => {
      const currentLock = checkLockoutStatus()
      if (currentLock.isLocked) {
        setLockoutRemaining(currentLock.remainingSeconds)
      } else {
        setLockoutRemaining(0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Monitoramento de Sessão Ativa & Auto-Lock por Inatividade
  useEffect(() => {
    const sessionCheck = validateCurrentSession()
    if (sessionCheck.isValid) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }

    // Monitora atividade do usuário para evitar bloqueio indevido enquanto trabalha
    const handleUserActivity = () => {
      if (isAuthenticated) {
        validateCurrentSession()
      }
    }

    window.addEventListener('mousemove', handleUserActivity, { passive: true })
    window.addEventListener('keydown', handleUserActivity, { passive: true })
    window.addEventListener('touchstart', handleUserActivity, { passive: true })

    // Verificação periódica a cada 30 segundos
    const sessionInterval = setInterval(() => {
      const activeCheck = validateCurrentSession()
      if (!activeCheck.isValid && isAuthenticated) {
        setIsAuthenticated(false)
        setPinError('Sessão encerrada por inatividade de 30 minutos.')
      }
    }, 30000)

    return () => {
      window.removeEventListener('mousemove', handleUserActivity)
      window.removeEventListener('keydown', handleUserActivity)
      window.removeEventListener('touchstart', handleUserActivity)
      clearInterval(sessionInterval)
    }
  }, [isAuthenticated])

  // Carregar dados de assinaturas e projetos
  useEffect(() => {

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
        const parsed: Project[] = healMojibake(JSON.parse(savedProjects))
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

    // Sincronização em tempo real de biosites criados na nuvem (Supabase)
    async function syncCloudBiosites() {
      if (!isSupabaseConfigured() || !supabase) return
      try {
        const { data: cloudBiosites, error } = await supabase.from('biosites').select('*')
        if (!error && Array.isArray(cloudBiosites) && cloudBiosites.length > 0) {
          // Atualiza lista de assinaturas para conter todos os biosites criados
          setSubscriptions((prevSubs) => {
            const subsSlugs = new Set(prevSubs.map(s => s.slug))
            const newCloudSubs: Subscription[] = cloudBiosites
              .filter(cb => !subsSlugs.has(cb.slug))
              .map(cb => ({
                id: `sub-cloud-${cb.slug}`,
                clientName: cb.name || cb.slug,
                businessName: cb.name || cb.slug,
                email: `${cb.slug}@biovip.com.br`,
                whatsapp: cb.whatsapp || '5531991390202',
                niche: cb.category || cb.role || 'Saúde & Estética',
                slug: cb.slug,
                planId: 'pro',
                planName: 'Profissional',
                cycle: 'mensal',
                amount: 49.90,
                status: 'ativa',
                paymentMethod: 'pix',
                startDate: cb.created_at ? cb.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
                nextBillingDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
                bioSiteUrl: `https://biovip.com.br/${cb.slug}`,
                viewsCount: 15,
                clicksCount: 5,
                notes: 'BioSite sincronizado via nuvem Supabase.',
                isPortfolioModel: false,
                inPortfolio: true,
                payments: [
                  {
                    id: `pay-${cb.slug}`,
                    date: new Date().toISOString().split('T')[0],
                    amount: 49.90,
                    method: 'pix',
                    status: 'pago'
                  }
                ]
              }))

            if (newCloudSubs.length > 0) {
              const updated = [...newCloudSubs, ...prevSubs]
              localStorage.setItem('biovip_subscriptions', JSON.stringify(updated))
              return updated
            }
            return prevSubs
          })

          // Atualiza lista de portfólio
          setPortfolioList((prevProjects) => {
            const projSlugs = new Set(prevProjects.map(p => p.slug))
            const newCloudProjects: Project[] = cloudBiosites
              .filter(cb => !projSlugs.has(cb.slug))
              .map(cb => ({
                slug: cb.slug,
                name: cb.name || cb.slug,
                role: cb.role || cb.category || 'Atendimento VIP',
                category: cb.category || 'Beleza & Estética',
                registrationCode: cb.registration_code || '',
                image: cb.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
                photo: cb.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
                description: cb.about_me_section?.bio || `BioSite oficial de ${cb.name}.`,
                features: ['Atendimento VIP', 'Agendamento Direto'],
                link: `https://biovip.com.br/${cb.slug}`,
                paletteId: cb.palette_id || 'luxo_nude',
                typographyId: cb.typography_id || 'instrument',
                buttonStyle: cb.button_style || 'cartao_nobre',
                buttonAnimation: cb.button_animation || 'none',
                monogram: cb.monogram || 'BV',
                stats: { views: '1', clicks: '0', conversion: '0%' },
                buttons: cb.buttons || [],
                inPortfolio: true,
                isPortfolioModel: false
              }))

            if (newCloudProjects.length > 0) {
              const updated = [...newCloudProjects, ...prevProjects]
              localStorage.setItem('biovip_portfolio_projects', JSON.stringify(updated))
              return updated
            }
            return prevProjects
          })
        }
      } catch (err) {
        console.warn('Erro ao sincronizar biosites do Supabase no Admin:', err)
      }
    }

    syncCloudBiosites()
  }, [])

  // Salvar no localStorage sempre que mudar
  const saveSubscriptions = (newSubs: Subscription[]) => {
    setSubscriptions(newSubs)
    localStorage.setItem('biovip_subscriptions', JSON.stringify(newSubs))
  }

  const savePortfolioList = (newList: Project[]) => {
    setPortfolioList(newList)
    localStorage.setItem('biovip_portfolio_projects', JSON.stringify(newList))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('biovip_portfolio_updated', { detail: newList }))
      window.dispatchEvent(new StorageEvent('storage', { key: 'biovip_portfolio_projects' }))
    }
  }

  // Handler de Login Blindado com Web Crypto SHA-256 e Anti-Brute-Force
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pinInput.trim()) return

    setIsAuthenticating(true)
    setPinError(null)

    try {
      const result = await authenticateAdmin(pinInput.trim())
      if (result.success) {
        setIsAuthenticated(true)
        setPinInput('')
        setPinError(null)
        setAttemptsLeft(null)
      } else {
        setPinError(result.error || 'Falha na autenticação.')
        if (result.remainingSeconds) {
          setLockoutRemaining(result.remainingSeconds)
        }
        if (result.attemptsLeft !== undefined) {
          setAttemptsLeft(result.attemptsLeft)
        }
      }
    } catch (err: any) {
      setPinError('Erro de segurança no processamento da credencial.')
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleLogout = () => {
    destroySession()
    setIsAuthenticated(false)
    setPinInput('')
    setPinError(null)
  }

  // Abertura da Central de Segurança & Auditoria
  const openSecurityModal = () => {
    setSecurityConfig(getSecurityConfig())
    setSecurityLogs(getAccessLogs())
    setOldSecretInput('')
    setNewPinInput('')
    setConfirmNewSecretInput('')
    setSecurityFeedback(null)
    setIsSecurityModalOpen(true)
  }

  // Atualização de Senha/PIN Master Criptografado
  const handleUpdateSecret = async (e: React.FormEvent) => {
    e.preventDefault()
    setSecurityFeedback(null)

    if (newPinInput !== confirmNewSecretInput) {
      setSecurityFeedback({ type: 'error', msg: 'A nova senha e a confirmação não coincidem.' })
      return
    }

    if (newPinInput.length < 4) {
      setSecurityFeedback({ type: 'error', msg: 'A nova senha deve ter no mínimo 4 caracteres.' })
      return
    }

    const res = await updateAdminSecret(oldSecretInput, newPinInput)
    if (res.success) {
      setSecurityFeedback({ type: 'success', msg: 'Credencial master atualizada com sucesso!' })
      setOldSecretInput('')
      setNewPinInput('')
      setConfirmNewSecretInput('')
      setSecurityLogs(getAccessLogs())
      setPinSuccessToast('Senha master atualizada e protegida com SHA-256.')
      setTimeout(() => setPinSuccessToast(null), 4000)
    } else {
      setSecurityFeedback({ type: 'error', msg: res.error || 'Erro ao alterar credencial.' })
    }
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
    const sourceSite = sourceSiteRaw ? healMojibake(JSON.parse(sourceSiteRaw)) : null

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

      // Resolução inteligente de paleta (compatibilidade total com antigo e novo BioVip)
      const THEME_MAP: Record<string, string> = {
        roseGoldQuartz: 'rose_quartz',
        obsidianGold: 'dourado_vip',
        barberVintage: 'dourado_vip',
        clinicalClean: 'esmeralda_ouro',
        velvetGlamour: 'rose_quartz',
        navyLaw: 'safira_ouro',
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

      // Validação rigorosa e sanitização de URLs de imagem contra placeholders e bloqueios
      const isValidImageUrl = (url?: any): boolean => {
        if (!url || typeof url !== 'string') return false
        const trimmed = url.trim()
        if (trimmed.startsWith('[') || trimmed.includes('[URL') || trimmed.includes('exemplo.com')) return false
        if (trimmed.startsWith('https://instagram.com') || trimmed.startsWith('https://www.instagram.com') || trimmed.includes('/p/')) return false
        return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/') || trimmed.startsWith('/')
      }

      const resolveAvatarUrl = (rawUrl?: any, nicheCategory: string = '') => {
        if (customAvatarPreview && isValidImageUrl(customAvatarPreview)) return customAvatarPreview
        if (isValidImageUrl(rawUrl)) return rawUrl.trim()
        const n = nicheCategory.toLowerCase()
        if (n.includes('barb') || n.includes('homem') || n.includes('masculin')) return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85'
        if (n.includes('odonto') || n.includes('dent')) return 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=85'
        if (n.includes('lash') || n.includes('unha') || n.includes('sobrancelha') || n.includes('make') || n.includes('cabelo')) return 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85'
        if (n.includes('advoc') || n.includes('direito') || n.includes('jurid') || n.includes('executiv')) return 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=85'
        return DEMO_PHOTOS.mulher
      }

      const nicheLower = (admin.nicheCategory || profile.title || '').toLowerCase()
      const fallbackGallery = nicheLower.includes('barb')
        ? FALLBACK_GALLERY_BY_NICHE.barbearia
        : nicheLower.includes('odonto') || nicheLower.includes('medic') || nicheLower.includes('saud')
        ? FALLBACK_GALLERY_BY_NICHE.saude
        : FALLBACK_GALLERY_BY_NICHE.beleza

      let galleryPhotosList: string[] = []
      const candidateList = micro.galleryPhotos || micro.portfolioGallery?.items || micro.galleryPhotosList || micro.studentGrid?.photos || micro.studentGrid?.items
      if (Array.isArray(candidateList)) {
        galleryPhotosList = candidateList
          .map((it: any) => typeof it === 'string' ? it : it?.url)
          .filter(isValidImageUrl)
      }
      if (galleryPhotosList.length < 3) {
        galleryPhotosList = fallbackGallery
      }

      const cleanPhoto = resolveAvatarUrl(profile.avatarUrl || profile.photo, admin.nicheCategory || profile.title || '')

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
            highlightBadge: c.highlightBadge || c.badgeText || (i === 0 ? '⭐ MAIS PROCURADO' : undefined),
            cardImage: isValidImageUrl(c.cardImage || c.imageUrl || c.image) ? (c.cardImage || c.imageUrl || c.image).trim() : undefined,
            imagePosition: c.imagePosition || 'right',
            imageFitStyle: c.imageFitStyle || 'popout',
            ctaActionText: c.ctaActionText || c.ctaLabel || undefined
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
        layout: rawServices.layout || 'list',
        aspectRatio: rawServices.aspectRatio || 'square',
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
          ctaLabel: s.ctaLabel || 'Agendar',
          actionType: s.actionType || 'booking',
          image: isValidImageUrl(s.image || s.imageUrl || s.cardImage || s.photo) ? (s.image || s.imageUrl || s.cardImage || s.photo).trim() : undefined,
          imageLayout: s.imageLayout || (s.image || s.imageUrl || s.cardImage ? (s.featured ? 'cover' : 'thumb') : undefined),
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
        photo: cleanPhoto,
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
        galleryCaptions: Array.isArray(micro.studentGrid?.captions) ? micro.studentGrid.captions : undefined,
        aboutMeSection: micro.aboutMe ? {
          enabled: micro.aboutMe.enabled !== false,
          headline: micro.aboutMe.headline || `Sobre ${businessName}`,
          photoUrl: micro.aboutMe.photoUrl || profile.aboutPhotoUrl,
          paragraph: micro.aboutMe.paragraph || profile.tagline || 'Dedicamo-nos a proporcionar experiências exclusivas e transformadoras, combinando técnicas avançadas com um padrão rigoroso de excelência.',
          closingPhrase: micro.aboutMe.closingPhrase || profile.cursivePhrase || 'Sua melhor versão com sofisticação e segurança.'
        } : {
          enabled: true,
          headline: `Sobre ${businessName}`,
          photoUrl: profile.aboutPhotoUrl,
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
      setCustomAvatarPreview(null)
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

  // TELA DE LOGIN BLINDADA (PADRÃO BANCÁRIO / CRIPTOGRAFIA SHA-256)
  if (!isAuthenticated) {
    return (
      <AdminAuthGate
        isLocked={lockoutRemaining > 0}
        lockoutRemaining={lockoutRemaining}
        attemptsLeft={attemptsLeft}
        pinInput={pinInput}
        setPinInput={setPinInput}
        showSecret={showSecret}
        setShowSecret={setShowSecret}
        pinError={pinError}
        isAuthenticating={isAuthenticating}
        handlePinSubmit={handlePinSubmit}
      />
    )
  }

  // TELA PRINCIPAL DO PAINEL DE GESTÃO
  return (
    <div className="min-h-screen bg-[#0d0f12] text-stone-200">
      {/* Topo do Painel */}
      <header className="sticky top-0 z-30 bg-[#12151a]/95 backdrop-blur-md border-b border-stone-800 shadow-md">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center text-stone-950 font-bold text-base shadow-md">
                B
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                  BIOVIP ADMIN <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">ASSINATURAS</span>
                </div>
                <div className="text-[10px] text-stone-400">Gestão Recorrente & Clientes</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-stone-800 text-xs overflow-x-auto scrollbar-none py-1">
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
              <button
                type="button"
                onClick={handleOpenCreateBioSiteModal}
                className="px-3 py-1.5 rounded-lg transition cursor-pointer font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 flex items-center gap-1.5 font-bold"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Criar BioSite
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* NOVO BOTÃO: CRIAR BIOSITE (IA GEMINI OU 9 PASSOS) */}
            <button
              type="button"
              onClick={handleOpenCreateBioSiteModal}
              className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-[#E2B857] hover:brightness-110 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg cursor-pointer shrink-0"
              title="Criar novo BioSite com IA Gemini ou em 9 Passos Manuais"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-stone-950" />
              <span>Criar BioSite</span>
            </button>
            <button
              onClick={() => {
                setGeminiError(null)
                setIsGeminiModalOpen(true)
              }}
              className="px-2.5 sm:px-3 py-1.5 bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition border border-purple-500/30 cursor-pointer shadow-2xs shrink-0"
              title="Importar JSON gerado pela IA Gemini (Script BioVip Oficial)"
            >
              <Bot className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="hidden xl:inline">Importar IA Gemini</span>
              <span className="hidden sm:inline xl:hidden">Importar IA</span>
            </button>
            <button
              onClick={() => setIsCloneModalOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition border border-amber-500/30 cursor-pointer shadow-2xs shrink-0"
              title="Clonar template de modelo para novo cliente com 1 clique"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden xl:inline">Clonar Modelo</span>
              <span className="hidden sm:inline xl:hidden">Clonar</span>
            </button>
            <button
              onClick={() => {
                setEditingSub(null)
                setIsModalOpen(true)
              }}
              className="px-3 sm:px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Nova Assinatura</span>
            </button>
            <button
              onClick={() => setIsBackupModalOpen(true)}
              title="Backup & Restauração Completa"
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-xl transition cursor-pointer border border-stone-800 shrink-0"
            >
              <Database className="w-4 h-4" />
            </button>
            <button
              onClick={openSecurityModal}
              title="Central de Segurança & Auditoria de Acesso"
              className="px-2.5 sm:px-3 py-1.5 text-xs text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden xl:inline font-mono">Segurança & Logs</span>
              <span className="hidden sm:inline xl:hidden font-mono">Segurança</span>
            </button>
            <button
              onClick={exportCSV}
              title="Exportar CSV"
              className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-xl transition cursor-pointer border border-stone-800 hidden sm:block shrink-0"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="text-xs text-stone-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-stone-800 hover:border-rose-900/50 transition cursor-pointer shrink-0 ml-1"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Barra de Navegação de Abas no Mobile/Tablet (lg:hidden) */}
        <div className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#0e1116] border-t border-stone-800/80 overflow-x-auto scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('assinaturas')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
              activeTab === 'assinaturas'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Bio Sites ({subscriptions.length + portfolioList.length})
          </button>
          <button
            onClick={() => setActiveTab('vencimentos')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium flex items-center gap-1.5 ${
              activeTab === 'vencimentos'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-stone-400 hover:text-white'
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
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium flex items-center gap-1 ${
              activeTab === 'metricas'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            Métricas
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium flex items-center gap-1 ${
              activeTab === 'portfolio'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Vitrine ({portfolioList.filter(p => p.inPortfolio !== false).length})
          </button>
          <button
            onClick={() => setActiveTab('gateways')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
              activeTab === 'gateways'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Gateways
          </button>
          <button
            type="button"
            onClick={handleOpenCreateBioSiteModal}
            className="px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-[#E2B857] flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-stone-950" />
            Criar
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
          <AdminSubscriptionsTab
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            planFilter={planFilter}
            setPlanFilter={setPlanFilter}
            cycleFilter={cycleFilter}
            setCycleFilter={setCycleFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            bioSiteTypeFilter={bioSiteTypeFilter}
            setBioSiteTypeFilter={setBioSiteTypeFilter}
            filteredPortfolioList={filteredPortfolioList}
            filteredSubscriptions={filteredSubscriptions}
            sortedSubscriptions={sortedSubscriptions}
            portfolioList={portfolioList}
            getWhatsAppMessage={getWhatsAppMessage}
            handleTogglePortfolioVisibility={handleTogglePortfolioVisibility}
            setCloneSourceSlug={setCloneSourceSlug}
            setIsCloneModalOpen={setIsCloneModalOpen}
            setQrModalSite={setQrModalSite}
            handleOpenPermissionsModal={handleOpenPermissionsModal}
            setEditingProject={setEditingProject}
            setIsProjectModalOpen={setIsProjectModalOpen}
            handleDeleteProject={handleDeleteProject}
            handleConvertClientToPortfolio={handleConvertClientToPortfolio}
            setPixModalSub={setPixModalSub}
            handleConfirmPayment={handleConfirmPayment}
            handleCopyBillingWA={handleCopyBillingWA}
            handleCopyProposalWA={handleCopyProposalWA}
            handleToggleMaintenance={handleToggleMaintenance}
            handleOpenClientCredentials={handleOpenClientCredentials}
            setEditingSub={setEditingSub}
            setIsModalOpen={setIsModalOpen}
            handleDeleteSubscription={handleDeleteSubscription}
          />
        )}

        {activeTab === 'vencimentos' && (
          <AdminDueDatesTab
            proximosVencimentos={proximosVencimentos}
            subscriptions={subscriptions}
            metrics={metrics}
            handleConfirmPayment={handleConfirmPayment}
            getWhatsAppMessage={getWhatsAppMessage}
            msgCobrancaTemplate={msgCobrancaTemplate}
            setMsgCobrancaTemplate={setMsgCobrancaTemplate}
            msgBoasVindasTemplate={msgBoasVindasTemplate}
            setMsgBoasVindasTemplate={setMsgBoasVindasTemplate}
          />
        )}

        {/* ABA: MÉTRICAS & RELATÓRIOS ESTRATÉGICOS */}
        {activeTab === 'metricas' && (
          <AdminMetricsTab
            exportCSV={exportCSV}
            handleExportFullBackup={handleExportFullBackup}
            nicheMetrics={nicheMetrics}
            planDistribution={planDistribution}
            topSites={topSites}
          />
        )}

        {/* ABA: GATEWAYS & PIX */}
        {activeTab === 'gateways' && (
          <AdminGatewaysTab
            pixKey={pixKey}
            setPixKey={setPixKey}
            gatewayProvider={gatewayProvider}
            setGatewayProvider={setGatewayProvider}
            apiKey={apiKey}
            setApiKey={setApiKey}
            msgCobrancaTemplate={msgCobrancaTemplate}
            setMsgCobrancaTemplate={setMsgCobrancaTemplate}
            msgBoasVindasTemplate={msgBoasVindasTemplate}
            setMsgBoasVindasTemplate={setMsgBoasVindasTemplate}
          />
        )}

        {/* ABA: VITRINE & MODELOS DE PORTFÓLIO */}
        {activeTab === 'portfolio' && (
          <AdminPortfolioTab
            portfolioList={portfolioList}
            handleOpenPermissionsModal={handleOpenPermissionsModal}
            setIsAddClientModalOpen={setIsAddClientModalOpen}
            handleTogglePortfolioVisibility={handleTogglePortfolioVisibility}
            setCloneSourceSlug={setCloneSourceSlug}
            setIsCloneModalOpen={setIsCloneModalOpen}
            setQrModalSite={setQrModalSite}
            setEditingProject={setEditingProject}
            setIsProjectModalOpen={setIsProjectModalOpen}
            handleDeleteProject={handleDeleteProject}
          />
        )}
      </main>

      {/* MODAL: CRIAR OU EDITAR ASSINATURA */}
      <AdminSubscriptionModal
        isOpen={isModalOpen}
        editingSub={editingSub}
        onClose={() => {
          setIsModalOpen(false)
          setEditingSub(null)
        }}
        onSave={handleSaveModal}
      />

      {/* MODAL: COBRANÇA PIX INSTANTÂNEA */}
      <AdminPixModal
        sub={pixModalSub}
        pixKey={pixKey}
        pixCopied={pixCopied}
        onCopyPix={() => {
          navigator.clipboard.writeText(pixKey)
          setPixCopied(true)
          setTimeout(() => setPixCopied(false), 2000)
        }}
        onClose={() => setPixModalSub(null)}
        getWhatsAppMessage={getWhatsAppMessage}
      />

      {/* MODAL: EDITAR CASE DE ESTUDO DO PORTFÓLIO */}
      <AdminProjectModal
        isOpen={isProjectModalOpen}
        project={editingProject}
        onClose={() => {
          setIsProjectModalOpen(false)
          setEditingProject(null)
        }}
        onSave={handleSaveProjectModal}
      />

      <AdminPortfolioModals
        isAddClientModalOpen={isAddClientModalOpen}
        setIsAddClientModalOpen={setIsAddClientModalOpen}
        subscriptions={subscriptions}
        portfolioList={portfolioList}
        handleConvertClientToPortfolio={handleConvertClientToPortfolio}
        isCloneModalOpen={isCloneModalOpen}
        setIsCloneModalOpen={setIsCloneModalOpen}
        cloneSourceSlug={cloneSourceSlug}
        setCloneSourceSlug={setCloneSourceSlug}
        defaultProjects={defaultProjects}
        handleCloneModel={handleCloneModel}
        qrModalSite={qrModalSite}
        setQrModalSite={setQrModalSite}
        qrCopied={qrCopied}
        setQrCopied={setQrCopied}
        isBackupModalOpen={isBackupModalOpen}
        setIsBackupModalOpen={setIsBackupModalOpen}
        handleExportFullBackup={handleExportFullBackup}
        handleImportBackup={handleImportBackup}
      />

      {/* MODAL: IMPORTAR JSON GEMINI AI (GERADOR OFICIAL BIOVIP) */}
      <AdminGeminiModal
        isOpen={isGeminiModalOpen}
        onClose={() => {
          setIsGeminiModalOpen(false)
          setGeminiError(null)
        }}
        customAvatarPreview={customAvatarPreview}
        setCustomAvatarPreview={setCustomAvatarPreview}
        geminiJsonInput={geminiJsonInput}
        setGeminiJsonInput={setGeminiJsonInput}
        geminiError={geminiError}
        setGeminiError={setGeminiError}
        onCopyPromptSuccess={(msg) => {
          setPortfolioSuccessToast(msg)
          setTimeout(() => setPortfolioSuccessToast(null), 5000)
        }}
        handleImportGemini={handleImportGemini}
      />

      {/* MODAL OFICIAL: CRIAR BIOSITE (IA GEMINI OU 9 PASSOS) */}
      <AdminCreateBioSiteModal
        isOpen={isCreateBioSiteModalOpen}
        onClose={() => setIsCreateBioSiteModalOpen(false)}
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
        onBioSiteCreated={(name) => {
          setPaymentSuccessToast(`BioSite "${name}" criado e publicado com sucesso!`)
          setTimeout(() => setPaymentSuccessToast(null), 5000)
        }}
        generateRandomPasswordValue={generateRandomPasswordValue}
      />

      {/* MODAL: CREDENCIAIS DE ACESSO DO CLIENTE (/entrar) */}
      <AdminClientCredentialsModal
        client={credentialsModalClient}
        onClose={() => setCredentialsModalClient(null)}
        setClient={setCredentialsModalClient}
        credentialsCopiedToast={credentialsCopiedToast}
        setCredentialsCopiedToast={setCredentialsCopiedToast}
        generateRandomPasswordValue={generateRandomPasswordValue}
        handleUpdateModalClientPassword={handleUpdateModalClientPassword}
        showPassword={showCredentialsModalPassword}
        setShowPassword={setShowCredentialsModalPassword}
      />

      {/* MODAL: PERMISSÕES DO CLIENTE E ATIVAÇÃO DE MÓDULOS */}
      <AdminPermissionsModal
        slug={permissionsModalSlug}
        title={permissionsModalTitle}
        onClose={() => setPermissionsModalSlug(null)}
        activeTab={permissionsActiveTab}
        setActiveTab={setPermissionsActiveTab}
        currentClientPermissions={currentClientPermissions}
        setCurrentClientPermissions={setCurrentClientPermissions}
        currentModuleToggles={currentModuleToggles}
        setCurrentModuleToggles={setCurrentModuleToggles}
        handleSavePermissions={handleSavePermissions}
        permissionDescriptions={PERMISSION_DESCRIPTIONS}
        moduleDescriptions={MODULE_DESCRIPTIONS}
      />

      {/* TOAST DE FEEDBACK DE PERMISSÕES */}
      {permissionsSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-indigo-600 text-white font-sans text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-bounce">
          <ShieldCheck className="w-5 h-5 text-white" />
          <span>{permissionsSuccessToast}</span>
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


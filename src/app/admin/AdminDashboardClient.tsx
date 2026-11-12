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
import { PALETTES, TYPOGRAPHIES, DEMO_PHOTOS, BUTTON_STYLES, BUTTON_ANIMATIONS, NICHES_LIST } from '@/data/bioSiteDesign'
import { generateNicheContent } from '@/utils/aiNicheGenerator'
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
  const [createBioSiteStep, setCreateBioSiteStep] = useState<'method' | 'gemini' | 'manual' | 'credentials' | 'success'>('method')
  const [manualCurrentStep, setManualCurrentStep] = useState<number>(1)

  // IA Gemini State
  const [geminiBioPrompt, setGeminiBioPrompt] = useState<string>('')
  const [geminiIsThinking, setGeminiIsThinking] = useState<boolean>(false)
  const [geminiGeneratedData, setGeminiGeneratedData] = useState<any | null>(null)

  // Manual 9 Passos State
  const [manualBrandName, setManualBrandName] = useState<string>('')
  const [manualBusinessTitle, setManualBusinessTitle] = useState<string>('')
  const [manualNiche, setManualNiche] = useState<string>('Extensão de Cílios & Lash')
  const [manualBio, setManualBio] = useState<string>('Atendimento de alto padrão com hora marcada.')
  const [manualPhotoUrl, setManualPhotoUrl] = useState<string>('')
  const [manualGender, setManualGender] = useState<'mulher' | 'homem'>('mulher')
  const [manualTreatment, setManualTreatment] = useState<'organico' | 'original' | 'silhueta'>('organico')
  const [manualPalette, setManualPalette] = useState<any>(PALETTES[0])
  const [manualBackgroundStyle, setManualBackgroundStyle] = useState<string>('aura')
  const [manualTypography, setManualTypography] = useState<any>(TYPOGRAPHIES[0])
  const [manualButtonStyle, setManualButtonStyle] = useState<string>('cartao_nobre')
  const [manualButtonAnimation, setManualButtonAnimation] = useState<string>('pulse-glow')
  const [manualWhatsapp, setManualWhatsapp] = useState<string>('5531991390202')
  const [manualInstagram, setManualInstagram] = useState<string>('')
  const [manualBookingLabel, setManualBookingLabel] = useState<string>('AGENDAR HORÁRIO VIP')
  const [manualRating, setManualRating] = useState<string>('5.0')
  const [manualReviewsCount, setManualReviewsCount] = useState<string>('184 avaliações')
  const [manualClientsServed, setManualClientsServed] = useState<string>('2.800+')
  const [manualSlug, setManualSlug] = useState<string>('')

  // Janela de Credenciais do Cliente
  const [clientAccessEmail, setClientAccessEmail] = useState<string>('')
  const [clientAccessPassword, setClientAccessPassword] = useState<string>('')
  const [clientAccessPhone, setClientAccessPhone] = useState<string>('')
  const [showClientAccessPassword, setShowClientAccessPassword] = useState<boolean>(false)
  const [passwordCopiedToast, setPasswordCopiedToast] = useState<boolean>(false)
  const [credentialsCopiedToast, setCredentialsCopiedToast] = useState<boolean>(false)

  // Resultado de Sucesso
  const [createdBioSiteInfo, setCreatedBioSiteInfo] = useState<{
    slug: string
    name: string
    email: string
    password: string
    phone: string
  } | null>(null)

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

  const handleGenerateRandomPassword = () => {
    const pass = generateRandomPasswordValue()
    setClientAccessPassword(pass)
    setPasswordCopiedToast(true)
    setTimeout(() => setPasswordCopiedToast(false), 2500)
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
    setCreateBioSiteStep('method')
    setManualCurrentStep(1)
    setGeminiBioPrompt('')
    setGeminiGeneratedData(null)
    setManualBrandName('')
    setManualBusinessTitle('')
    setManualNiche('Extensão de Cílios & Lash')
    setManualBio('Atendimento de alto padrão com hora marcada.')
    setManualPhotoUrl('')
    setManualGender('mulher')
    setManualTreatment('organico')
    setManualPalette(PALETTES[0])
    setManualBackgroundStyle('aura')
    setManualTypography(TYPOGRAPHIES[0])
    setManualButtonStyle('cartao_nobre')
    setManualButtonAnimation('pulse-glow')
    setManualWhatsapp('5531991390202')
    setManualInstagram('')
    setManualBookingLabel('AGENDAR HORÁRIO VIP')
    setManualRating('5.0')
    setManualReviewsCount('184 avaliações')
    setManualClientsServed('2.800+')
    setManualSlug('')
    setClientAccessEmail('')
    setClientAccessPhone('5531991390202')
    setClientAccessPassword(generateRandomPasswordValue())
    setCreatedBioSiteInfo(null)
    setIsCreateBioSiteModalOpen(true)
  }

  const handleGenerateWithGemini = async () => {
    if (!geminiBioPrompt.trim()) return
    setGeminiIsThinking(true)
    try {
      await new Promise(r => setTimeout(r, 600))
      const aiContent = generateNicheContent(geminiBioPrompt)
      setGeminiGeneratedData(aiContent)
      
      const suggestedSlug = slugifyText(aiContent.brandName || geminiBioPrompt.split(' ')[0] || 'meu-biosite')
      setManualSlug(suggestedSlug)
      setManualBrandName(aiContent.brandName || 'Studio VIP')
      setManualBusinessTitle(aiContent.niche || 'Especialista VIP')
      setManualNiche(aiContent.niche || 'Beleza & Estética')
      setManualBio(aiContent.tagline || 'Atendimento de alto padrão com hora marcada.')
      if (aiContent.paletteId) {
        const foundPal = PALETTES.find(p => p.id === aiContent.paletteId)
        if (foundPal) setManualPalette(foundPal)
      }
      if (aiContent.typographyId) {
        const foundTypo = TYPOGRAPHIES.find(t => t.id === aiContent.typographyId)
        if (foundTypo) setManualTypography(foundTypo)
      }
      if (aiContent.buttons && aiContent.buttons[0]?.value) {
        setManualWhatsapp(aiContent.buttons[0].value)
        setClientAccessPhone(aiContent.buttons[0].value)
      }
      setClientAccessEmail(`${suggestedSlug}@biovip.com.br`)
      setCreateBioSiteStep('credentials')
    } catch (err) {
      console.error('Erro na geração Gemini:', err)
    } finally {
      setGeminiIsThinking(false)
    }
  }

  const handleFinalizeBioSite = async () => {
    const finalSlug = slugifyText(manualSlug.trim() || manualBrandName.trim() || `cliente-${Date.now()}`)
    const finalEmail = clientAccessEmail.trim().toLowerCase() || `${finalSlug}@biovip.com.br`
    const finalPassword = clientAccessPassword.trim() || 'BioVip2026!'
    const finalPhone = clientAccessPhone.trim() || manualWhatsapp.trim() || '5531991390202'
    const finalName = manualBrandName.trim() || 'Cliente BioVip'

    let baseSiteData: any = {}
    if (geminiGeneratedData) {
      baseSiteData = {
        ...geminiGeneratedData,
        slug: finalSlug,
        name: finalName,
        businessTitle: manualBusinessTitle || geminiGeneratedData.niche,
        role: manualBusinessTitle || geminiGeneratedData.niche,
        category: manualNiche || geminiGeneratedData.niche,
        bio: manualBio || geminiGeneratedData.tagline,
        photo: manualPhotoUrl || (manualGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem),
        paletteId: manualPalette.id,
        typographyId: manualTypography.id,
        buttonStyle: manualButtonStyle,
        buttonAnimation: manualButtonAnimation,
        whatsapp: finalPhone.replace(/\D/g, ''),
        rating: manualRating,
        reviewsCount: manualReviewsCount,
        buttons: geminiGeneratedData.buttons || [
          {
            id: 'btn-1',
            label: manualBookingLabel,
            subtitle: 'Atendimento prioritário e exclusivo',
            icon: 'calendar',
            url: `https://wa.me/${finalPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário com ${finalName}.`)}`,
            targetType: 'whatsapp',
            isHighlighted: true,
            highlightBadge: 'VIP'
          }
        ]
      }
    } else {
      const generatedTemplate = generateNicheContent(manualNiche || finalName)
      baseSiteData = {
        ...generatedTemplate,
        slug: finalSlug,
        name: finalName,
        businessTitle: manualBusinessTitle || manualNiche,
        role: manualBusinessTitle || manualNiche,
        category: manualNiche,
        bio: manualBio,
        photo: manualPhotoUrl || (manualGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem),
        paletteId: manualPalette.id,
        typographyId: manualTypography.id,
        buttonStyle: manualButtonStyle,
        buttonAnimation: manualButtonAnimation,
        backgroundStyle: manualBackgroundStyle,
        whatsapp: finalPhone.replace(/\D/g, ''),
        rating: manualRating,
        reviewsCount: manualReviewsCount,
        buttons: [
          {
            id: 'btn-1',
            label: manualBookingLabel,
            subtitle: 'Atendimento prioritário e exclusivo',
            icon: 'calendar',
            url: `https://wa.me/${finalPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário com ${finalName}.`)}`,
            targetType: 'whatsapp',
            isHighlighted: true,
            highlightBadge: 'VIP'
          },
          ...(manualInstagram ? [{
            id: 'btn-2',
            label: 'Acompanhe no Instagram',
            subtitle: manualInstagram.startsWith('@') ? manualInstagram : `@${manualInstagram}`,
            icon: 'instagram',
            url: `https://instagram.com/${manualInstagram.replace('@', '')}`,
            targetType: 'link'
          }] : [])
        ]
      }
    }

    // 1. Salvar biosite localmente
    localStorage.setItem('biovip_site_' + finalSlug, JSON.stringify(baseSiteData))

    // 2. Cadastrar usuário em biovip_users para login funcional em /entrar
    try {
      const rawUsers = localStorage.getItem('biovip_users')
      let userList = rawUsers ? JSON.parse(rawUsers) : []
      userList = userList.filter((u: any) => u.email?.toLowerCase() !== finalEmail && u.slug !== finalSlug)
      userList.unshift({
        email: finalEmail,
        password: finalPassword,
        slug: finalSlug,
        brandName: finalName,
        phone: finalPhone,
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('biovip_users', JSON.stringify(userList))
    } catch (e) {
      console.warn('Erro ao salvar biovip_users:', e)
    }

    // 3. Salvar na lista de assinaturas do ADM
    const newSubscription: Subscription = {
      id: `sub-${Date.now()}`,
      clientName: finalName,
      businessName: finalName,
      email: finalEmail,
      whatsapp: finalPhone,
      niche: manualNiche || 'Beleza & Estética',
      slug: finalSlug,
      planId: 'pro',
      planName: 'Profissional',
      cycle: 'mensal',
      amount: 49.90,
      status: 'ativa',
      paymentMethod: 'pix',
      startDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      bioSiteUrl: `https://biovip.com.br/${finalSlug}`,
      viewsCount: 0,
      clicksCount: 0,
      notes: `Bio Site criado pelo Administrador via ${createBioSiteStep === 'gemini' ? 'IA Gemini' : 'Wizard 9 Passos'}.`,
      payments: [
        {
          id: `pay-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString().split('T')[0],
          amount: 49.90,
          method: 'pix',
          status: 'pago'
        }
      ]
    }
    const updatedSubs = [newSubscription, ...subscriptions.filter(s => s.slug !== finalSlug)]
    setSubscriptions(updatedSubs)
    localStorage.setItem('biovip_subscriptions', JSON.stringify(updatedSubs))

    // 4. Adicionar ao portfólio
    try {
      const savedProjectsRaw = localStorage.getItem('biovip_portfolio_projects')
      let pList = savedProjectsRaw ? JSON.parse(savedProjectsRaw) : []
      pList = pList.filter((p: any) => p.slug !== finalSlug)
      pList.unshift({
        ...baseSiteData,
        inPortfolio: true,
        isPortfolioModel: false,
        stats: { views: '1', clicks: '0', conversion: '0%' }
      })
      localStorage.setItem('biovip_portfolio_projects', JSON.stringify(pList))
    } catch (e) {
      console.warn('Erro ao atualizar portfolio_projects:', e)
    }

    // 5. Configurar permissões padrão ativas
    saveClientConfig(finalSlug, {
      permissions: DEFAULT_CLIENT_PERMISSIONS,
      modules: DEFAULT_MODULE_TOGGLES
    })

    // 6. Sincronizar com Supabase se configurado
    saveBioSite(finalSlug, baseSiteData).catch(e => console.warn('Supabase sync:', e))

    // 7. Definir dados de sucesso
    setCreatedBioSiteInfo({
      slug: finalSlug,
      name: finalName,
      email: finalEmail,
      password: finalPassword,
      phone: finalPhone
    })
    setCreateBioSiteStep('success')
    setPaymentSuccessToast(`BioSite "${finalName}" criado e publicado com sucesso!`)
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
    const isLocked = lockoutRemaining > 0
    const lockMins = Math.floor(lockoutRemaining / 60)
    const lockSecs = lockoutRemaining % 60

    return (
      <div className="min-h-screen bg-[#07090E] text-stone-100 flex items-center justify-center p-4 selection:bg-amber-400 selection:text-black">
        <div className="max-w-md w-full bg-[#0F141F]/90 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          {/* Luz de Fundo Decorativa */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header de Segurança */}
          <div className="flex flex-col items-center text-center mb-8 relative">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-stone-950 shadow-xl transition-all duration-500 mb-4 ${
              isLocked
                ? 'bg-gradient-to-tr from-rose-500 to-red-400 shadow-rose-500/20 text-white animate-pulse'
                : 'bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-500 shadow-amber-500/20'
            }`}>
              {isLocked ? <ShieldAlert className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[10px] font-mono uppercase tracking-widest font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Ambiente Protegido · BioVip Master</span>
            </div>

            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
              Gestão de Assinaturas
            </h1>
            <p className="text-xs text-stone-400 mt-1.5 max-w-xs leading-relaxed">
              Autenticação restrita com assinatura criptográfica SHA-256 e proteção ativa contra ataques de força bruta.
            </p>
          </div>

          {/* Banner de Bloqueio se houver excesso de tentativas */}
          {isLocked ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs space-y-2 mb-6 text-center animate-shake">
              <div className="flex items-center justify-center gap-2 font-bold text-rose-300 text-sm">
                <Timer className="w-4 h-4" />
                <span>Painel Temporariamente Bloqueado</span>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-300">
                Limite de 5 tentativas consecutivas atingido. Por segurança, o sistema bloqueou novas tentativas.
              </p>
              <div className="text-lg font-mono font-bold text-rose-400 pt-1">
                Tempo restante: {lockMins.toString().padStart(2, '0')}:{lockSecs.toString().padStart(2, '0')}
              </div>
            </div>
          ) : (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-stone-300 uppercase tracking-wider font-mono">
                    Senha / PIN Master
                  </label>
                  {attemptsLeft !== null && attemptsLeft > 0 && (
                    <span className="text-[10px] font-mono text-amber-400">
                      {attemptsLeft} tentativa(s) restante(s)
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showSecret ? 'text' : 'password'}
                    value={pinInput}
                    disabled={isAuthenticating || isLocked}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Digite a Senha ou PIN Master"
                    className="w-full px-4 py-3.5 bg-stone-900/90 border border-stone-700/80 rounded-2xl text-center text-lg sm:text-xl font-mono tracking-widest text-white placeholder-stone-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition disabled:opacity-50 pr-12"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition p-1"
                    title={showSecret ? 'Ocultar código' : 'Exibir código'}
                  >
                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {pinError && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-center gap-1.5 text-center">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                    <span>{pinError}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isAuthenticating || !pinInput.trim() || isLocked}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 active:scale-[0.99] text-stone-950 font-bold rounded-2xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Validando Criptografia...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Acessar Painel ADM</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Dicas e Rodapé de Segurança */}
          <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-stone-400">
              <span className="flex items-center gap-1 text-emerald-400 font-mono">
                <CheckCircle2 className="w-3 h-3" /> Rate Limit Ativo
              </span>
              <span className="font-mono text-stone-500">Auto-lock: 30min</span>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 pt-2">
              <Link href="/" className="hover:text-amber-400 transition flex items-center gap-1 text-[11px]">
                ← Voltar ao site público
              </Link>
              <a
                href="https://wa.me/5531991390202?text=Ol%C3%A1!%20Sou%20gestor%20do%20BioVip%20e%20preciso%20de%20ajuda%20com%20o%20acesso%20ADM."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-stone-500 hover:text-amber-400 transition"
              >
                Suporte do Gestor
              </a>
            </div>
          </div>
        </div>
      </div>
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
          <section className="bg-[#14181f] border border-stone-800 rounded-3xl p-6 shadow-xl space-y-6">
            {/* Barra de Filtros e Busca */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
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
            <div className="w-full overflow-x-auto rounded-2xl border border-stone-800 bg-[#0d0f12] shadow-inner scrollbar-thin scrollbar-thumb-stone-700">
              <table className="w-full text-left border-collapse min-w-[1400px]">
                <thead>
                  <tr className="bg-[#0f1217] text-[11px] font-mono uppercase tracking-wider text-stone-400 border-b border-stone-800">
                    <th className="py-3.5 px-4 min-w-[260px]">Bio Site / Profissional</th>
                    <th className="py-3.5 px-4 min-w-[180px]">Nicho & Registro</th>
                    <th className="py-3.5 px-4 min-w-[130px]">Tipo / Plano</th>
                    <th className="py-3.5 px-4 min-w-[110px]">Valor</th>
                    <th className="py-3.5 px-4 min-w-[120px]">Próx. Cobrança</th>
                    <th className="py-3.5 px-4 min-w-[140px]">Status</th>
                    <th className="py-3.5 pr-8 pl-4 text-right sticky right-0 bg-[#0f1217] z-20 shadow-[-16px_0_24px_-4px_rgba(0,0,0,0.7)] border-l border-stone-800/80 min-w-[460px] w-[460px]">
                      Ações Rápidas
                    </th>
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
                          <td className="py-3.5 pr-8 pl-4 text-right sticky right-0 bg-[#12151c] group-hover:bg-[#1a202c] transition-colors z-20 shadow-[-16px_0_24px_-4px_rgba(0,0,0,0.7)] border-l border-stone-800/80 min-w-[460px] w-[460px]">
                            <div className="flex items-center justify-end gap-1.5 flex-nowrap shrink-0 pr-1">
                              <Link
                                href={`/conta?edit=${proj.slug}`}
                                title="Editar no Construtor Visual (Cores, Fontes, Botões, Foto, Páginas)"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 font-semibold text-[11px] transition border border-amber-500/30 shrink-0"
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
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <Zap className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setQrModalSite({ name: proj.name, slug: proj.slug, url: `https://biovip.com.br/${proj.slug}`, category: proj.category })}
                                title="Visualizar QR Code de Divulgação"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                              </button>
                              <Link
                                href={`/${proj.slug}`}
                                target="_blank"
                                title="Abrir Bio Site ao Vivo"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition shrink-0"
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
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProject(proj.slug)}
                                title="Remover Modelo"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/30 hover:text-rose-400 text-stone-400 transition cursor-pointer shrink-0"
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
                          <td className="py-3.5 pr-8 pl-4 text-right sticky right-0 bg-[#12151c] group-hover:bg-[#1a202c] transition-colors z-20 shadow-[-16px_0_24px_-4px_rgba(0,0,0,0.7)] border-l border-stone-800/80 min-w-[460px] w-[460px]">
                            <div className="flex items-center justify-end gap-1.5 flex-nowrap shrink-0 pr-1">
                              {/* Editar Visual do Bio Site */}
                              <Link
                                href={`/conta?edit=${sub.slug}`}
                                title="Editar Bio Site no Construtor Visual (Cores, Fontes, Botões, Foto, Páginas)"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 font-semibold text-[11px] transition border border-amber-500/30 shrink-0"
                              >
                                <Wand2 className="w-3.5 h-3.5" />
                                <span>Editar Visual</span>
                              </Link>

                              {/* Abrir Link do Bio Site */}
                              <a
                                href={sub.bioSiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Abrir Bio Site do Cliente"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition shrink-0"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>

                              {/* Botão Pix Cobrança */}
                              <button
                                type="button"
                                onClick={() => setPixModalSub(sub)}
                                title="Gerar Cobrança Pix / QR Code"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer shrink-0"
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
                                    className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition cursor-pointer shrink-0"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyBillingWA(sub)}
                                    title="Copiar Mensagem Amigável de Cobrança Pix para WhatsApp"
                                    className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition cursor-pointer shrink-0"
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
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>

                              {/* Copiar Proposta Comercial WhatsApp */}
                              <button
                                type="button"
                                onClick={() => handleCopyProposalWA(sub)}
                                title="Copiar Proposta Comercial Persuasiva para WhatsApp"
                                className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 transition cursor-pointer shrink-0"
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                              </button>

                              {/* Alternar Modo Manutenção (Inadimplência D+7 / Reforma) */}
                              <button
                                type="button"
                                onClick={() => handleToggleMaintenance(sub.id)}
                                title="Alternar Modo Manutenção (Tela neutra elegante sem quebrar reputação)"
                                className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 transition cursor-pointer shrink-0"
                              >
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                              </button>

                              {/* Controle de Permissões do Cliente & Módulos */}
                              <button
                                type="button"
                                onClick={() => handleOpenPermissionsModal(sub.slug, sub.businessName)}
                                title="Configurar o que o cliente pode alterar (/conta) e Ativar/Desativar Módulos"
                                className="p-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 transition cursor-pointer shrink-0"
                              >
                                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                              </button>

                              {/* Editar */}
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingSub(sub)
                                  setIsModalOpen(true)
                                }}
                                title="Editar Assinatura"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer shrink-0"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Excluir */}
                              <button
                                type="button"
                                onClick={() => handleDeleteSubscription(sub.id)}
                                title="Excluir"
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/30 hover:text-rose-400 text-stone-400 transition cursor-pointer shrink-0"
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
            <div className="w-full overflow-x-auto rounded-2xl border border-stone-800 bg-[#0d0f12] shadow-inner">
              <table className="w-full text-left text-xs min-w-[1000px]">
                <thead className="bg-[#14181f] text-stone-400 font-mono text-[11px] uppercase border-b border-stone-800">
                  <tr>
                    <th className="py-3 px-4">Modelo / Profissional</th>
                    <th className="py-3 px-4">Nicho & Registro</th>
                    <th className="py-3 px-4">Tipo</th>
                    <th className="py-3 px-4">Métricas do Case</th>
                    <th className="py-3 px-4 text-center">Status no Portfólio</th>
                    <th className="py-3.5 pr-8 pl-4 text-right sticky right-0 bg-[#14181f] z-20 shadow-[-16px_0_24px_-4px_rgba(0,0,0,0.7)] border-l border-stone-800/80 min-w-[340px] w-[340px]">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {portfolioList.map((proj) => {
                    const isVisible = proj.inPortfolio !== false
                    return (
                      <tr key={proj.slug} className="hover:bg-stone-800/30 transition group">
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
                        <td className="py-3.5 pr-8 pl-4 text-right sticky right-0 bg-[#12151c] group-hover:bg-[#1a202c] transition-colors z-20 shadow-[-16px_0_24px_-4px_rgba(0,0,0,0.7)] border-l border-stone-800/80 min-w-[340px] w-[340px]">
                          <div className="flex items-center justify-end gap-1.5 flex-nowrap shrink-0 pr-1">
                            <Link
                              href={`/conta?edit=${proj.slug}`}
                              title="Editar no Construtor Visual (Cores, Fontes, Botões, Foto, Páginas)"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 font-semibold text-[11px] transition border border-amber-500/30 shrink-0"
                            >
                              <Wand2 className="w-3.5 h-3.5" />
                              <span>Editar Visual</span>
                            </Link>

                            <Link
                              href={`/${proj.slug}`}
                              target="_blank"
                              title="Abrir Bio Site ao Vivo"
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition shrink-0"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleOpenPermissionsModal(proj.slug, proj.name)}
                              title="Permissões do Painel e Ativar/Desativar Módulos deste Modelo"
                              className="p-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 transition cursor-pointer shrink-0"
                            >
                              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                            </button>

                            <button
                              onClick={() => {
                                setEditingProject(proj)
                                setIsProjectModalOpen(true)
                              }}
                              title="Editar Case de Estudo"
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-500/20 hover:text-amber-300 text-stone-300 transition cursor-pointer shrink-0"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteProject(proj.slug)}
                              title="Remover Modelo"
                              className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/30 hover:text-rose-400 text-stone-400 transition cursor-pointer shrink-0"
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

            {/* Banner de cópia do Prompt Oficial Interativo */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#161226] to-indigo-950/30 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <p className="font-bold text-purple-200 flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Fluxo Inteligente em 2 Etapas (Zero Páginas Genéricas)
                </p>
                <p className="text-stone-300 text-xs leading-relaxed max-w-xl">
                  Ao colar este prompt no Gemini, ele <strong>não criará uma página genérica</strong>. Ele irá te pedir o <strong>Instagram</strong>, o <strong>Google Maps</strong> e o <strong>nicho</strong> do seu cliente. Ao enviar, o Gemini investigará a internet, extrairá depoimentos reais do Maps, fotos e serviços do Instagram, validará os dados e devolverá o JSON 100% autêntico.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const prompt = `Você agora é o **Arquiteto Oficial de Microsites do BioVip Studio Pro**.
Sua missão é coletar os dados de um cliente, pesquisar profundamente na internet (Instagram, Google Maps / Google Meu Negócio e buscas do Google) todas as informações reais desse negócio e entregar um **ÚNICO BLOCO DE CÓDIGO JSON** pronto para ser colado na aba de criação do BioVip Studio Pro (que montará automaticamente a página completa + a Área de Administração do cliente).

### PASSO 1: ENTREVISTA SEQUENCIAL (FAÇA UMA PERGUNTA POR VEZ)
Cumprimente-me de forma rápida e faça as seguintes solicitações **SEQUENCIALMENTE (uma pergunta por vez, aguardando minha resposta antes de fazer a próxima)**. *Observação: se eu já enviar vários dados de uma só vez, avance diretamente para o que faltar ou para a geração do código.*

1️⃣ **Solicitação 1 (Nome, Nicho e WhatsApp):**
"Para começarmos, qual é o **Nome do Cliente / Empresa**, o **Nicho de Atuação** (ex: Extensão de Cílios, Nail Designer, Barbearia, Clínica de Estética, Advocacia, Odontologia, etc.) e o **WhatsApp** de atendimento?"

2️⃣ **Solicitação 2 (Instagram do Cliente):**
"Qual é o **@usuario ou link do Instagram** desse cliente? (Se desejar, você também pode colar aqui o texto da Bio ou os principais serviços que ele posta)."

3️⃣ **Solicitação 3 (Endereço e Google Maps):**
"Qual é o **Link do Google Maps / Google Meu Negócio** ou o **Endereço completo (Rua, Bairro, Cidade/UF)** do cliente?"

4️⃣ **Solicitação 4 (Estilo Visual e Plano de Manutenção):**
"Qual **Tema Visual** combina mais com esse cliente?
- \`roseGoldQuartz\` (Rosé Gold, Nude & Quartzo — Beleza, Cílios, Unhas, Estética)
- \`obsidianGold\` (Dark Luxury & Ouro Imperial — Studios VIP, Clínicas, Advocacia, Mentorias)
- \`barberVintage\` (Dark Barbearia & Âmbar — Barbearias e Grooming)
- \`clinicalClean\` (Clean Minimalista & Pérola — Saúde, Odonto, Psicologia, Medicina)
- \`velvetGlamour\` (Glamour Vibrante & Orquídea — Moda, Salões, Maquiagem)
- \`navyLaw\` (Azul Marinho & Dourado — Jurídico, Contabilidade, Consultoria)
E há algum serviço, pacote ou preço específico que deseja destacar?"

---

### PASSO 2: PESQUISA PROFUNDA NA INTERNET (QUANDO EU RESPONDER)
Assim que tiver os dados do cliente, pesquise na internet e no Google Maps tudo sobre esse negócio:
- Nome comercial exato, especialidade principal e posicionamento de autoridade.
- Biografia real do Instagram, número de seguidores, telefone/WhatsApp e links da bio.
- Os **4 a 6 serviços/procedimentos reais** trabalhados pelo cliente (baseados nas informações coletadas do perfil, legendas e nicho), criando descrições persuasivas e elegantes.
- Seção **Sobre a Especialista & Nosso Espaço (aboutMe)**: Redija uma apresentação profunda, acolhedora e comovente sobre a trajetória, anos de experiência, especialização técnica, padrão de atendimento e amor pelo ofício para preencher \`paragraph\` e a frase marcante \`closingPhrase\`.
- Endereço completo, bairro, cidade/UF, horário de atendimento, nota no Google Meu Negócio (ex: 5.0★) e 3 depoimentos baseados nos elogios reais do negócio no Google Maps.
- 6 legendas curtas e impactantes baseadas nos posts de procedimentos, resultados de antes/depois e serviços reais do Instagram para a galeria (priorizando afinidade técnica com o catálogo de serviços ao invés de meras curtidas).
- **ATENÇÃO CRÍTICA PARA IMAGENS:** Todas as chaves de imagem (avatarUrl, aboutPhotoUrl, photoUrl, cardImage, imageUrl, photos) DEVEM ser SEMPRE STRINGS com URLs VÁLIDAS e diretas da web (ex: https://images.unsplash.com/photo-...). NUNCA envie objetos nem chaves aninhadas para as imagens.

---

### PASSO 3: ENTREGA DO CÓDIGO FINAL (FORMATO JSON OBRIGATÓRIO)
Entregue **EXATAMENTE UM BLOCO DE CÓDIGO JSON** (\`\`\`json ... \`\`\`) seguindo rigorosamente esta estrutura abaixo, sem omitir nenhuma chave, para que eu copie e cole direto no espaço de importação do BioVip Studio Pro:

\`\`\`json
{
  "adminClient": {
    "clientName": "Nome do Cliente ou Empresa",
    "clientPhone": "5531999999999",
    "clientEmail": "contato@cliente.com.br",
    "subdomain": "slug-do-cliente-sem-espacos",
    "nicheCategory": "Beleza & Estética",
    "maintenancePlan": "pro_4",
    "monthlyFee": 49.90,
    "creationFee": 79.90,
    "isLandingModel": false
  },
  "microsite": {
    "theme": "roseGoldQuartz",
    "styling": {
      "fontFamily": "Playfair Display",
      "borderRadius": 20,
      "glassmorphism": true,
      "metallicBorders": true,
      "spotlightGlow": true
    },
    "announcement": {
      "enabled": true,
      "badge": "AGENDA VIP ABERTA",
      "text": "Últimos horários disponíveis nesta semana. Reserve seu atendimento exclusivo!",
      "link": "#booking"
    },
    "profile": {
      "name": "NOME DO NEGÓCIO EM MAIÚSCULO",
      "title": "ESPECIALIDADE PRINCIPAL DE ALTO PADRÃO",
      "tagline": "Bio persuasiva baseada nas informações reais do Instagram e diferenciais do cliente.",
      "cursivePhrase": "Excelência, sofisticação e cuidado em cada detalhe.",
      "avatarUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900",
      "aboutPhotoUrl": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=700",
      "instagram": "usuario_sem_arroba",
      "whatsapp": "5531999999999",
      "mapsUrl": "https://maps.google.com/?q=Endereco+do+Cliente"
    },
    "metrics": {
      "enabled": true,
      "items": [
        { "value": "5.0★", "label": "Avaliação no Google" },
        { "value": "+1.000", "label": "Clientes Atendidas" },
        { "value": "100%", "label": "Atendimento VIP" }
      ]
    },
    "actionCards": [
      {
        "id": "cta-1",
        "title": "AGENDAR MEU HORÁRIO NO WHATSAPP",
        "subtitle": "Atendimento rápido e personalizado com hora marcada",
        "icon": "Calendar",
        "linkType": "whatsapp",
        "url": "#whatsapp",
        "whatsappMessage": "Olá! Vi seu microsite e gostaria de agendar um horário.",
        "variant": "accent",
        "animation": "pulse-glow",
        "badgeText": "MAIS PROCURADO",
        "ctaActionText": "AGENDAR AGORA",
        "cardImage": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400",
        "imagePosition": "right",
        "imageFitStyle": "popout"
      },
      {
        "id": "cta-2",
        "title": "CONHECER CATÁLOGO DE SERVIÇOS",
        "subtitle": "Confira todos os procedimentos e protocolos exclusivos",
        "icon": "Sparkles",
        "linkType": "catalogo",
        "url": "#catalogo",
        "variant": "default",
        "animation": "none",
        "badgeText": "PROCEDIMENTOS",
        "ctaActionText": "VER SERVIÇOS"
      },
      {
        "id": "cta-3",
        "title": "COMO CHEGAR · LOCALIZAÇÃO NO MAPS",
        "subtitle": "Endereço completo do cliente extraído do Google Maps",
        "icon": "MapPin",
        "linkType": "maps",
        "url": "https://maps.google.com",
        "variant": "default",
        "animation": "none",
        "badgeText": "ROTAS GPS",
        "ctaActionText": "ABRIR MAPA"
      }
    ],
    "studentGrid": {
      "enabled": true,
      "headline": "Resultados Reais & Portfólio em Destaque",
      "subtitle": "Registros mais curtidos no nosso Instagram oficial",
      "badgeText": "PORTFÓLIO OFICIAL",
      "layout": "smart_masonry",
      "captions": [
        "Legenda curta do destaque 1 baseada no serviço principal",
        "Legenda curta do destaque 2 baseada na técnica exclusiva",
        "Legenda curta do destaque 3 com foco em acabamento natural",
        "Legenda curta do destaque 4 de resultado real",
        "Legenda curta do destaque 5 de atendimento personalizado",
        "Legenda curta do destaque 6 do espaço e biossegurança"
      ]
    },
    "locationCard": {
      "enabled": true,
      "title": "Localização & Espaço Exclusivo",
      "address": "Rua Exemplo, 123 - Bairro, Cidade - UF",
      "hours": "Seg a Sáb · 08:30 às 19:30",
      "openStatus": "Atendimento com Hora Marcada",
      "mapsUrl": "https://maps.google.com",
      "buttonLabel": "Traçar Rota no Google Maps",
      "showHours": true
    },
    "services": {
      "enabled": true,
      "headline": "Procedimentos & Serviços Exclusivos",
      "subtitle": "Protocolos personalizados baseados nas técnicas do nosso espaço",
      "layout": "list",
      "items": [
        {
          "id": "srv-1",
          "name": "Nome Real do Serviço 1",
          "description": "Descrição detalhada e persuasiva do serviço oferecido pelo cliente.",
          "price": "Sob Consulta",
          "duration": "1h30",
          "badge": "DESTAQUE VIP",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": true,
          "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600",
          "imageLayout": "cover"
        },
        {
          "id": "srv-2",
          "name": "Nome Real do Serviço 2",
          "description": "Descrição detalhada do segundo procedimento mais procurado.",
          "price": "Sob Consulta",
          "duration": "1h30",
          "badge": "MUITO PROCURADO",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": true,
          "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400",
          "imageLayout": "thumb"
        },
        {
          "id": "srv-3",
          "name": "Nome Real do Serviço 3",
          "description": "Descrição detalhada do terceiro procedimento do cliente.",
          "price": "Sob Consulta",
          "duration": "1h00",
          "badge": "",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": false
        },
        {
          "id": "srv-4",
          "name": "Manutenção / Atendimento Personalizado",
          "description": "Acompanhamento completo para manter seu resultado impecável por mais tempo.",
          "price": "Sob Consulta",
          "duration": "1h00",
          "badge": "",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": false
        }
      ]
    },
    "testimonials": {
      "enabled": true,
      "headline": "O Que Dizem No Google Meu Negócio",
      "items": [
        {
          "id": "t-1",
          "clientName": "Nome da Cliente 1",
          "city": "Cidade - UF",
          "text": "Avaliação 5 estrelas baseada nos elogios reais do negócio.",
          "rating": 5
        },
        {
          "id": "t-2",
          "clientName": "Nome da Cliente 2",
          "city": "Cidade - UF",
          "text": "Segunda avaliação destacando o atendimento impecável e o ambiente.",
          "rating": 5
        },
        {
          "id": "t-3",
          "clientName": "Nome da Cliente 3",
          "city": "Cidade - UF",
          "text": "Terceira avaliação elogiando a durabilidade e o profissionalismo.",
          "rating": 5
        }
      ]
    },
    "qualifierFunnel": {
      "enabled": true,
      "buttonLabel": "✨ Descobrir Procedimento Ideal (Triagem VIP)",
      "headline": "Atendimento Personalizado",
      "subtitle": "Responda 3 perguntas rápidas para agilizar seu atendimento no WhatsApp:",
      "questions": [
        {
          "id": "q-1",
          "question": "Qual procedimento você tem mais interesse hoje?",
          "options": ["Serviço 1", "Serviço 2", "Serviço 3", "Avaliação Personalizada"]
        },
        {
          "id": "q-2",
          "question": "Qual o melhor período para o seu horário?",
          "options": ["Manhã", "Tarde", "Final do dia / Sábado", "Qualquer horário disponível"]
        },
        {
          "id": "q-3",
          "question": "Qual o seu objetivo principal?",
          "options": ["Primeiro atendimento", "Manutenção", "Ocasião especial", "Quero tirar dúvidas"]
        }
      ]
    },
    "aboutMe": {
      "enabled": true,
      "headline": "SOBRE A ESPECIALISTA & NOSSO ESPAÇO",
      "photoUrl": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=700",
      "paragraph": "Texto persuasivo e acolhedor (2 a 3 parágrafos) apresentando a trajetória da especialista ou fundadora, anos de experiência, propósito de atendimento humanizado, excelência técnica e diferenciais que tornam o espaço e os procedimentos únicos.",
      "closingPhrase": "Sua beleza e bem-estar, nosso maior compromisso."
    },
    "faq": {
      "enabled": true,
      "headline": "Dúvidas Frequentes",
      "items": [
        {
          "id": "faq-1",
          "question": "Como faço para agendar meu horário?",
          "answer": "Basta clicar no botão de WhatsApp ou no catálogo de serviços para escolher seu melhor dia e horário."
        },
        {
          "id": "faq-2",
          "question": "Onde o espaço está localizado?",
          "answer": "Estamos localizados no endereço indicado no mapa acima, com fácil acesso e ambiente climatizado."
        },
        {
          "id": "faq-3",
          "question": "Quais são as formas de pagamento aceitas?",
          "answer": "Aceitamos Pix, cartões de crédito e débito."
        }
      ]
    }
  }
}
\`\`\`

Inicie agora fazendo a **Solicitação 1**!\``
                  navigator.clipboard.writeText(prompt)
                  setPortfolioSuccessToast('Prompt Mestre Interativo copiado! Cole no Gemini: ele pedirá o Instagram e Maps do cliente antes de gerar.')
                  setTimeout(() => setPortfolioSuccessToast(null), 5000)
                }}
                className="shrink-0 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-purple-900/40"
              >
                <Copy className="w-4 h-4" />
                Copiar Prompt Mestre Interativo
              </button>
            </div>

            {/* Assistente de Fotos Reais do Instagram & Upload Direto */}
            <div className="p-4 rounded-2xl bg-[#0f131c] border border-stone-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-purple-400" />
                  Foto Oficial do Cliente (Avatar)
                </span>
                <label className="text-[11px] font-semibold text-purple-300 hover:text-white cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 transition shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  Carregar Foto do Cliente (PC / WhatsApp)
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (ev) => {
                          const base64 = ev.target?.result as string
                          if (base64) {
                            setCustomAvatarPreview(base64)
                          }
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                </label>
              </div>

              {customAvatarPreview ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-600/50">
                  <img
                    src={customAvatarPreview}
                    alt="Foto Carregada"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Foto Real Carregada com Sucesso
                    </p>
                    <p className="text-[10px] text-stone-400 truncate">
                      Esta foto substituirá qualquer link e será usada no perfil oficial do BioSite.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCustomAvatarPreview(null)}
                    className="text-stone-400 hover:text-rose-400 text-xs px-2 py-1 transition cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-[11px] text-stone-300 leading-relaxed space-y-1">
                  <p className="font-semibold text-amber-300 flex items-center gap-1">
                    <span>💡</span> Por que o Instagram não entrega fotos automáticas e como resolver:
                  </p>
                  <p className="text-stone-400">
                    A Meta/Instagram bloqueia robôs de busca com tela de login obrigatória. Para ter a foto real do cliente no BioSite:
                  </p>
                  <ul className="list-disc list-inside text-stone-300 space-y-0.5 ml-1">
                    <li><strong>No Gemini:</strong> Tire 1 print do Instagram do cliente e cole com <kbd className="px-1 py-0.5 bg-stone-800 rounded text-purple-300 font-mono text-[10px]">Ctrl+V</kbd> no chat do Gemini (ele lê a imagem com IA).</li>
                    <li><strong>Upload Direto:</strong> Ou clique em <em>&quot;Carregar Foto do Cliente&quot;</em> acima e anexe a foto ou logo que você recebeu no WhatsApp.</li>
                  </ul>
                </div>
              )}
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

      {/* MODAL: CENTRAL DE SEGURANÇA & AUDITORIA DE ACESSOS */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F141F] border border-stone-700/80 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSecurityModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho do Modal */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Central de Segurança Master
                </h3>
                <p className="text-xs text-stone-400">
                  Proteção de credenciais, logs de auditoria e políticas de acesso ao painel ADM.
                </p>
              </div>
            </div>

            {/* Navegação entre Abas do Modal */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <button
                type="button"
                onClick={() => setSecurityTab('senha')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 ${
                  securityTab === 'senha'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Alterar Senha / PIN</span>
              </button>

              <button
                type="button"
                onClick={() => setSecurityTab('auditoria')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 ${
                  securityTab === 'auditoria'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Logs de Acesso ({securityLogs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setSecurityTab('politicas')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 ${
                  securityTab === 'politicas'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Políticas de Sessão</span>
              </button>
            </div>

            {/* ABA 1: ALTERAR SENHA / PIN MASTER */}
            {securityTab === 'senha' && (
              <form onSubmit={handleUpdateSecret} className="space-y-4">
                <div className="p-3 rounded-xl bg-amber-400/5 border border-amber-400/20 text-[11px] text-stone-300 leading-relaxed">
                  A nova credencial será criptografada imediatamente com <strong>SHA-256 + Salt dinâmico</strong>. Você pode cadastrar um PIN numérico (ex: 6 dígitos) ou uma Senha Mestra alfanumérica.
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Senha ou PIN Atual
                    </label>
                    <input
                      type="password"
                      value={oldSecretInput}
                      onChange={(e) => setOldSecretInput(e.target.value)}
                      placeholder="Digite a credencial atual (padrão: 2026)"
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Nova Senha ou Novo PIN
                    </label>
                    <input
                      type="password"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      placeholder="Mínimo 4 caracteres ou dígitos"
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Confirmar Nova Senha ou PIN
                    </label>
                    <input
                      type="password"
                      value={confirmNewSecretInput}
                      onChange={(e) => setConfirmNewSecretInput(e.target.value)}
                      placeholder="Repita exatamente a nova credencial"
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {securityFeedback && (
                  <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    securityFeedback.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                  }`}>
                    {securityFeedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                    <span>{securityFeedback.msg}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSecurityModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-white transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs hover:brightness-110 transition shadow-md flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Salvar e Criptografar</span>
                  </button>
                </div>
              </form>
            )}

            {/* ABA 2: LOGS DE AUDITORIA DE ACESSO */}
            {securityTab === 'auditoria' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>Últimos registros de autenticação (armazenados localmente):</span>
                  <span className="font-mono text-[10px] text-amber-400">{securityLogs.length} eventos</span>
                </div>

                {securityLogs.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-500 bg-stone-900/50 rounded-2xl border border-stone-800">
                    Nenhum registro de acesso gravado até o momento.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {securityLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 ${
                          log.success
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-stone-200'
                            : 'bg-rose-500/5 border-rose-500/20 text-stone-200'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            log.success ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            {log.success ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="font-semibold flex items-center gap-2">
                              <span>{log.success ? 'Acesso Permitido' : 'Tentativa Bloqueada'}</span>
                              {log.reason && (
                                <span className="text-[10px] font-mono text-stone-400">· {log.reason}</span>
                              )}
                            </div>
                            <p className="text-[10px] text-stone-500 truncate max-w-sm font-mono mt-0.5">
                              {log.userAgent}
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-stone-400 shrink-0">
                          {new Date(log.timestamp).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ABA 3: POLÍTICAS DE SESSÃO & SEGURANÇA */}
            {securityTab === 'politicas' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <Timer className="w-4 h-4 text-amber-400" />
                    Auto-Lock por Inatividade
                  </h4>
                  <p className="text-stone-400 leading-relaxed text-[11.5px]">
                    Caso o painel fique aberto sem movimentação do mouse ou teclas, a sessão é automaticamente bloqueada para evitar acesso indevido em máquinas compartilhadas.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    {[15, 30, 60].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => {
                          const updated = { ...securityConfig, inactivityTimeoutMinutes: mins }
                          setSecurityConfig(updated)
                          saveSecurityConfig(updated)
                        }}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition ${
                          securityConfig.inactivityTimeoutMinutes === mins
                            ? 'bg-amber-400 text-black border-amber-400 font-bold'
                            : 'bg-stone-800 border-stone-700 text-stone-300 hover:border-amber-400/50'
                        }`}
                      >
                        {mins} minutos {mins === 30 && '(Padrão)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Regra Anti-Brute-Force
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-stone-400 text-[11px] leading-relaxed">
                    <li>Máximo de <strong>5 tentativas incorretas</strong> consecutivas.</li>
                    <li>Bloqueio obrigatório de <strong>15 minutos</strong> ao atingir o limite.</li>
                    <li>Delay anti-timing attack de <strong>500ms</strong> aplicado a cada verificação.</li>
                    <li>Sessão com assinatura criptográfica vinculada à credencial do administrador.</li>
                  </ul>
                </div>
              </div>
            )}
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

      {/* MODAL: CONTROLE DE PERMISSÕES DO CLIENTE & MÓDULOS ATIVOS */}
      {permissionsModalSlug && (
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
                      <span>Permissões & Módulos: {permissionsModalTitle}</span>
                    </h3>
                    <p className="text-xs text-stone-400 font-mono mt-0.5">
                      /{permissionsModalSlug} • Controle granular de edição e seções ativas
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPermissionsModalSlug(null)}
                  className="text-stone-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Seletor de Abas no Topo do Modal */}
              <div className="flex items-center gap-2 mt-5 p-1 bg-[#0d0f12] rounded-xl border border-stone-800">
                <button
                  type="button"
                  onClick={() => setPermissionsActiveTab('permissoes')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                    permissionsActiveTab === 'permissoes'
                      ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>O que o Cliente Pode Alterar (/conta)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPermissionsActiveTab('modulos')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                    permissionsActiveTab === 'modulos'
                      ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Ativação de Módulos & Blocos</span>
                </button>
              </div>

              {/* ABA 1: O QUE O CLIENTE PODE OU NÃO ALTERAR */}
              {permissionsActiveTab === 'permissoes' && (
                <div className="mt-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-stone-900/60 p-3 rounded-2xl border border-stone-800 gap-2">
                    <span className="text-xs text-stone-300">
                      Defina as travas de segurança do painel do cliente:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const allTrue = Object.keys(currentClientPermissions).reduce((acc, k) => {
                            acc[k as keyof ClientPermissions] = true
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
                          const allFalse = Object.keys(currentClientPermissions).reduce((acc, k) => {
                            acc[k as keyof ClientPermissions] = false
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
                      const info = PERMISSION_DESCRIPTIONS[key]
                      return (
                        <div
                          key={key}
                          onClick={() => {
                            setCurrentClientPermissions(prev => ({ ...prev, [key]: !prev[key] }))
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
                              <span className="truncate">{info?.label || key}</span>
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
              {permissionsActiveTab === 'modulos' && (
                <div className="mt-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-stone-900/60 p-3 rounded-2xl border border-stone-800 gap-2">
                    <span className="text-xs text-stone-300">
                      Selecione quais módulos serão renderizados no BioSite:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const allTrue = Object.keys(currentModuleToggles).reduce((acc, k) => {
                            acc[k as keyof ModuleToggles] = true
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
                          const essentials: ModuleToggles = {
                            ...DEFAULT_MODULE_TOGGLES,
                            announcement: false,
                            urgency: false,
                            quiz: false,
                            reviews: false,
                            faq: false,
                            howItWorks: false,
                          }
                          setCurrentModuleToggles(essentials)
                        }}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition cursor-pointer"
                      >
                        Apenas Essenciais
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                    {(Object.keys(currentModuleToggles) as Array<keyof ModuleToggles>).map((key) => {
                      const isEnabled = currentModuleToggles[key]
                      const info = MODULE_DESCRIPTIONS[key]
                      return (
                        <div
                          key={key}
                          onClick={() => {
                            setCurrentModuleToggles(prev => ({ ...prev, [key]: !prev[key] }))
                          }}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                            isEnabled
                              ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400'
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
                              <span className="truncate">{info?.label || key}</span>
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
                onClick={() => setPermissionsModalSlug(null)}
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
      )}

      {/* ========================================================= */}
      {/* MODAL OFICIAL: CRIAR BIOSITE (IA GEMINI OU 9 PASSOS) */}
      {/* ========================================================= */}
      {isCreateBioSiteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-[#12151c] border border-stone-800 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl flex flex-col justify-between my-auto relative animate-fade-in">
            {/* Botão Fechar */}
            <button
              type="button"
              onClick={() => setIsCreateBioSiteModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ETAPA 1: ESCOLHA DO MÉTODO (IA GEMINI OU 9 PASSOS MANUAIS) */}
            {createBioSiteStep === 'method' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    Novo BioSite BioVip
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-normal">
                    Como Deseja Criar o BioSite?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1">
                    Escolha entre a velocidade instantânea da IA Gemini ou o controle artesanal passo a passo.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Opção 1: IA Gemini */}
                  <div
                    onClick={() => setCreateBioSiteStep('gemini')}
                    className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/30 via-stone-900/80 to-stone-900 border border-purple-500/30 hover:border-purple-400 transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-purple-950/20"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center">
                          <Bot className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          ⚡ Instantâneo
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                          Gerar com IA Gemini
                        </h4>
                        <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                          A inteligência artificial cria os procedimentos com preços reais do nicho, bio de autoridade, paleta de luxo e botões em 3 segundos.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-bold text-purple-300 group-hover:translate-x-1 transition-transform">
                      <span>Iniciar com IA Gemini</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Opção 2: Criação Manual 9 Passos */}
                  <div
                    onClick={() => {
                      setManualCurrentStep(1)
                      setCreateBioSiteStep('manual')
                    }}
                    className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-400/50 transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-amber-950/20"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center">
                          <Sliders className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          🛠️ 9 Passos
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                          Criação Manual (9 Passos)
                        </h4>
                        <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                          Personalização artesanal: 1. Você, 2. Foto, 3. Paleta, 4. Fundo, 5. Tipografia, 6. Botões, 7. Links, 8. Prova Social e 9. Endereço.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                      <span>Iniciar Passo a Passo</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 2: PROMPT DA IA GEMINI */}
            {createBioSiteStep === 'gemini' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <button
                    type="button"
                    onClick={() => setCreateBioSiteStep('method')}
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </button>
                  <span className="text-[11px] font-mono text-purple-300 font-bold uppercase">
                    Modo IA Gemini
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-serif text-white font-normal">
                    Descreva o Negócio ou Profissional
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Informe o nome, nicho, cidade ou diferenciais. A IA formulará o BioSite completo pronto para conversão.
                  </p>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={4}
                    value={geminiBioPrompt}
                    onChange={(e) => setGeminiBioPrompt(e.target.value)}
                    placeholder="Ex: Studio de Lash e Sobrancelhas de luxo da Helena em Moema - SP. Atendimento exclusivo com hora marcada, fotos sofisticadas e agendamento direto no WhatsApp."
                    className="w-full p-3.5 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 focus:border-purple-400 text-xs leading-relaxed focus:outline-none"
                  />

                  {/* Sugestões Rápidas de Nicho */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase text-stone-500 py-1 mr-1">
                      Inspirações rápidas:
                    </span>
                    {[
                      '💅 Nails & Manicure Russa',
                      '👁️ Extensão de Cílios & Lash',
                      '✂️ Barbearia VIP & Grooming',
                      '🩺 Odontologia & Lentes',
                      '💉 Harmonização Facial & Botox',
                      '🎂 Confeitaria Artesanal Fina',
                      '💇 Salão de Beleza & Mechas'
                    ].map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => setGeminiBioPrompt(`Studio de ${sug.slice(3)} de alto padrão com atendimento VIP e hora marcada.`)}
                        className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-purple-950/40 text-stone-300 hover:text-purple-300 text-[10.5px] border border-stone-800 hover:border-purple-500/40 transition cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateBioSiteStep('method')}
                    className="px-4 py-2 text-stone-400 hover:text-white transition text-xs cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    disabled={!geminiBioPrompt.trim() || geminiIsThinking}
                    onClick={handleGenerateWithGemini}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-amber-400 hover:brightness-110 disabled:opacity-50 text-stone-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    {geminiIsThinking ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Gerando BioSite com IA Gemini...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Gerar BioSite e Avançar para Credenciais ➔</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3: CRIAÇÃO MANUAL EM 9 PASSOS */}
            {createBioSiteStep === 'manual' && (
              <div className="space-y-5">
                {/* Header de Navegação dos Passos */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <button
                    type="button"
                    onClick={() => {
                      if (manualCurrentStep > 1) {
                        setManualCurrentStep(prev => prev - 1)
                      } else {
                        setCreateBioSiteStep('method')
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {manualCurrentStep > 1 ? 'Passo Anterior' : 'Voltar ao Início'}
                  </button>

                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-mono font-bold text-amber-300 uppercase">
                      Passo {manualCurrentStep} de 9
                    </span>
                  </div>
                </div>

                {/* Stepper Visual (9 Bolinhas / Indicadores) */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    '1. Você',
                    '2. Foto',
                    '3. Paleta',
                    '4. Fundo',
                    '5. Tipografia',
                    '6. Botões',
                    '7. Links',
                    '8. Prova',
                    '9. Endereço'
                  ].map((label, idx) => {
                    const stepNum = idx + 1
                    const isDone = stepNum < manualCurrentStep
                    const isCurrent = stepNum === manualCurrentStep
                    return (
                      <button
                        key={stepNum}
                        type="button"
                        onClick={() => setManualCurrentStep(stepNum)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-mono uppercase whitespace-nowrap transition cursor-pointer border ${
                          isCurrent
                            ? 'bg-amber-400 text-stone-950 font-bold border-amber-300'
                            : isDone
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-stone-900 text-stone-500 border-stone-800'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>

                {/* Conteúdo Dinâmico de Cada Passo (1 a 9) */}
                <div className="min-h-[280px]">
                  {/* Passo 1: Você */}
                  {manualCurrentStep === 1 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 1: Identidade da Marca</h4>
                        <p className="text-xs text-stone-400">Nome do profissional, título e bio de autoridade.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Nome da Marca / Especialista</label>
                          <input
                            type="text"
                            value={manualBrandName}
                            onChange={(e) => {
                              setManualBrandName(e.target.value)
                              if (!manualSlug) setManualSlug(slugifyText(e.target.value))
                            }}
                            placeholder="Ex: Dra. Helena Vasconcelos"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Título de Exibição / Cargo</label>
                          <input
                            type="text"
                            value={manualBusinessTitle}
                            onChange={(e) => setManualBusinessTitle(e.target.value)}
                            placeholder="Ex: Lash Designer & Visagista"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Nicho / Categoria Principal</label>
                        <select
                          value={manualNiche}
                          onChange={(e) => setManualNiche(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs"
                        >
                          {NICHES_LIST.map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Frase de Assinatura / Bio</label>
                        <textarea
                          rows={2}
                          value={manualBio}
                          onChange={(e) => setManualBio(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  )}

                  {/* Passo 2: Foto */}
                  {manualCurrentStep === 2 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 2: Foto de Estúdio</h4>
                        <p className="text-xs text-stone-400">Retrato principal com fusão orgânica ou recorte.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-stone-700 bg-stone-900 shrink-0">
                          <img
                            src={manualPhotoUrl || (manualGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)}
                            alt="Foto"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={manualPhotoUrl}
                            onChange={(e) => setManualPhotoUrl(e.target.value)}
                            placeholder="URL da Foto do Cliente (https://...)"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setManualGender('mulher')
                                setManualPhotoUrl('')
                              }}
                              className={`px-3 py-1 text-xs rounded-lg border font-mono ${
                                manualGender === 'mulher' && !manualPhotoUrl ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-stone-900 text-stone-400 border-stone-800'
                              }`}
                            >
                              Modelo Feminino
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setManualGender('homem')
                                setManualPhotoUrl('')
                              }}
                              className={`px-3 py-1 text-xs rounded-lg border font-mono ${
                                manualGender === 'homem' && !manualPhotoUrl ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-stone-900 text-stone-400 border-stone-800'
                              }`}
                            >
                              Modelo Masculino
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1.5">Efeito de Fusão</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'organico', label: 'Fusão Orgânica' },
                            { id: 'original', label: 'Foto Pura' },
                            { id: 'silhueta', label: 'Silhueta VIP' }
                          ].map(t => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setManualTreatment(t.id as any)}
                              className={`p-2 rounded-xl text-center text-xs font-mono border transition ${
                                manualTreatment === t.id ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 font-bold' : 'bg-stone-900 text-stone-400 border-stone-800'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Passo 3: Paleta */}
                  {manualCurrentStep === 3 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 3: Paleta de Cores de Luxo</h4>
                        <p className="text-xs text-stone-400">Escolha a atmosfera cromática editorial do BioSite.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                        {PALETTES.map(p => {
                          const isSel = manualPalette.id === p.id
                          return (
                            <div
                              key={p.id}
                              onClick={() => setManualPalette(p)}
                              className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                                isSel ? 'border-amber-400 bg-amber-500/15' : 'border-stone-800 bg-stone-900 hover:border-stone-700'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: p.bg }} />
                                <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: p.card }} />
                                <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: p.accent }} />
                              </div>
                              <span className={`text-[11px] font-bold block truncate ${isSel ? 'text-amber-300' : 'text-stone-300'}`}>
                                {p.name}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Passo 4: Fundo */}
                  {manualCurrentStep === 4 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 4: Estilo de Fundo</h4>
                        <p className="text-xs text-stone-400">Iluminação ambiente e gradientes de profundidade.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { id: 'aura', name: 'Aura Dourada Suave', desc: 'Luz difusa no centro simulando estúdio fotográfico.' },
                          { id: 'radial', name: 'Radial Obsidiana', desc: 'Preto profundo com glow suave champagne.' },
                          { id: 'minimal', name: 'Minimalista Neutro', desc: 'Sem distrações, foco total no catálogo.' },
                          { id: 'solid', name: 'Preto Absoluto (#09090B)', desc: 'Máximo contraste para telas OLED.' }
                        ].map(bg => (
                          <div
                            key={bg.id}
                            onClick={() => setManualBackgroundStyle(bg.id)}
                            className={`p-3 rounded-xl border cursor-pointer transition ${
                              manualBackgroundStyle === bg.id ? 'border-amber-400 bg-amber-500/15 text-amber-200' : 'border-stone-800 bg-stone-900 text-stone-300'
                            }`}
                          >
                            <span className="text-xs font-bold block mb-1">{bg.name}</span>
                            <span className="text-[10px] text-stone-400 leading-snug block">{bg.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Passo 5: Tipografia */}
                  {manualCurrentStep === 5 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 5: Tipografia Editorial</h4>
                        <p className="text-xs text-stone-400">Selecione a fonte que expressa autoridade e elegância.</p>
                      </div>
                      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                        {TYPOGRAPHIES.map(t => {
                          const isSel = manualTypography.id === t.id
                          return (
                            <div
                              key={t.id}
                              onClick={() => setManualTypography(t)}
                              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                                isSel ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold' : 'border-stone-800 bg-stone-900 text-stone-300 hover:border-stone-700'
                              }`}
                            >
                              <div>
                                <span className="text-sm block" style={{ fontFamily: t.cssFont }}>{t.name}</span>
                                <span className="text-[9px] font-mono text-stone-500">{t.desc || t.category}</span>
                              </div>
                              {isSel && <Check className="w-4 h-4 text-amber-400" />}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Passo 6: Botões */}
                  {manualCurrentStep === 6 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 6: Formato & Estilo dos Botões</h4>
                        <p className="text-xs text-stone-400">Design dos cartões de ação e animações de conversão.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Estilo do Botão</label>
                          <select
                            value={manualButtonStyle}
                            onChange={(e) => setManualButtonStyle(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs font-mono"
                          >
                            {BUTTON_STYLES.map(bs => (
                              <option key={bs.id} value={bs.id}>{bs.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Efeito / Animação</label>
                          <select
                            value={manualButtonAnimation}
                            onChange={(e) => setManualButtonAnimation(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs font-mono"
                          >
                            {BUTTON_ANIMATIONS.map(ba => (
                              <option key={ba.id} value={ba.id}>{ba.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Passo 7: Links */}
                  {manualCurrentStep === 7 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 7: Seus Links Principais</h4>
                        <p className="text-xs text-stone-400">Canais de contato direto para agendamento.</p>
                      </div>
                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">WhatsApp Comercial (com DDD)</label>
                          <input
                            type="text"
                            value={manualWhatsapp}
                            onChange={(e) => setManualWhatsapp(e.target.value)}
                            placeholder="5531991390202"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Instagram (@usuario)</label>
                          <input
                            type="text"
                            value={manualInstagram}
                            onChange={(e) => setManualInstagram(e.target.value)}
                            placeholder="@studiohelena"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Texto do Botão de Agendamento</label>
                          <input
                            type="text"
                            value={manualBookingLabel}
                            onChange={(e) => setManualBookingLabel(e.target.value)}
                            placeholder="AGENDAR HORÁRIO VIP"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Passo 8: Prova Social */}
                  {manualCurrentStep === 8 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 8: Prova Social & Google</h4>
                        <p className="text-xs text-stone-400">Métricas de autoridade para gerar confiança imediata.</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2.5">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Nota Google</label>
                          <input
                            type="text"
                            value={manualRating}
                            onChange={(e) => setManualRating(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-bold font-mono text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Reviews</label>
                          <input
                            type="text"
                            value={manualReviewsCount}
                            onChange={(e) => setManualReviewsCount(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Atendimentos</label>
                          <input
                            type="text"
                            value={manualClientsServed}
                            onChange={(e) => setManualClientsServed(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-bold font-mono text-center text-amber-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Passo 9: Endereço / Slug */}
                  {manualCurrentStep === 9 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 9: Link & Endereço Único</h4>
                        <p className="text-xs text-stone-400">O link exclusivo que o cliente colocará na bio do Instagram.</p>
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Endereço do BioSite</label>
                        <div className="flex items-center rounded-xl bg-stone-900 border border-stone-800 overflow-hidden focus-within:border-amber-400">
                          <span className="px-3 text-xs font-mono text-stone-500 bg-stone-950/60 border-r border-stone-800 py-2.5">
                            biovip.com.br/
                          </span>
                          <input
                            type="text"
                            value={manualSlug}
                            onChange={(e) => setManualSlug(slugifyText(e.target.value))}
                            placeholder="helena-lash"
                            className="flex-1 p-2.5 bg-transparent text-amber-300 font-mono text-xs focus:outline-none"
                          />
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1 font-mono">
                          ✓ Link limpo e indexável no Google
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Rodapé do Stepper Manual */}
                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (manualCurrentStep > 1) {
                        setManualCurrentStep(prev => prev - 1)
                      } else {
                        setCreateBioSiteStep('method')
                      }
                    }}
                    className="px-4 py-2 text-stone-400 hover:text-white transition text-xs cursor-pointer"
                  >
                    {manualCurrentStep > 1 ? '← Anterior' : 'Cancelar'}
                  </button>

                  {manualCurrentStep < 9 ? (
                    <button
                      type="button"
                      onClick={() => setManualCurrentStep(prev => prev + 1)}
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                      <span>Próximo Passo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setClientAccessEmail(clientAccessEmail || `${manualSlug || 'cliente'}@biovip.com.br`)
                        setClientAccessPhone(manualWhatsapp)
                        setCreateBioSiteStep('credentials')
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-lg"
                    >
                      <span>Avançar para Credenciais do Cliente</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ETAPA 4: CADASTRO DE CREDENCIAIS DO CLIENTE (E-MAIL E SENHA) */}
            {createBioSiteStep === 'credentials' && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <button
                    type="button"
                    onClick={() => {
                      if (geminiGeneratedData) {
                        setCreateBioSiteStep('gemini')
                      } else {
                        setCreateBioSiteStep('manual')
                        setManualCurrentStep(9)
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar aos Dados
                  </button>
                  <span className="text-[11px] font-mono text-amber-300 font-bold uppercase flex items-center gap-1">
                    <Key className="w-3.5 h-3.5" /> Acesso do Cliente
                  </span>
                </div>

                {/* Resumo do BioSite */}
                <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/40 bg-stone-950 shrink-0">
                      <img
                        src={manualPhotoUrl || (manualGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{manualBrandName || 'Cliente BioVip'}</h4>
                      <p className="text-[10px] text-amber-400 font-mono">biovip.com.br/{manualSlug || 'slug'}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Pronto para Criação
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    Cadastrar Login do Cliente no Painel
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    O cliente usará este e-mail e senha para acessar <code className="text-amber-300">biovip.com.br/entrar</code> e gerenciar o BioSite no <code className="text-amber-300">/conta</code>.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">E-mail do Cliente (Login)</label>
                    <input
                      type="email"
                      value={clientAccessEmail}
                      onChange={(e) => setClientAccessEmail(e.target.value)}
                      placeholder="cliente@email.com"
                      className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10.5px] font-mono uppercase text-stone-400">Senha de Acesso</label>
                      <button
                        type="button"
                        onClick={handleGenerateRandomPassword}
                        className="text-[10px] font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition"
                      >
                        <Dices className="w-3.5 h-3.5" />
                        <span>Gerar Senha Aleatória</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type={showClientAccessPassword ? 'text' : 'password'}
                          value={clientAccessPassword}
                          onChange={(e) => setClientAccessPassword(e.target.value)}
                          placeholder="Digite ou gere uma senha segura"
                          className="w-full p-2.5 pr-9 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setShowClientAccessPassword(prev => !prev)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 cursor-pointer"
                        >
                          {showClientAccessPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(clientAccessPassword)
                          setPasswordCopiedToast(true)
                          setTimeout(() => setPasswordCopiedToast(false), 2000)
                        }}
                        className="px-3 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-mono flex items-center gap-1 cursor-pointer shrink-0"
                        title="Copiar senha"
                      >
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>{passwordCopiedToast ? 'Copiada!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">WhatsApp de Contato do Cliente</label>
                    <input
                      type="text"
                      value={clientAccessPhone}
                      onChange={(e) => setClientAccessPhone(e.target.value)}
                      placeholder="5531991390202"
                      className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (geminiGeneratedData) setCreateBioSiteStep('gemini')
                      else setCreateBioSiteStep('manual')
                    }}
                    className="px-4 py-2 text-stone-400 hover:text-white transition text-xs cursor-pointer"
                  >
                    Voltar
                  </button>

                  <button
                    type="button"
                    onClick={handleFinalizeBioSite}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-[#E2B857] hover:brightness-110 text-stone-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Concluir e Publicar BioSite</span>
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 5: SUCESSO E ENTREGA DO BIOSITE */}
            {createBioSiteStep === 'success' && createdBioSiteInfo && (
              <div className="space-y-5 animate-fade-in text-center py-2">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white">
                    BioSite Criado e Publicado com Sucesso!
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    O microsite já está ativo na web e o cliente já pode acessar o painel de edição.
                  </p>
                </div>

                {/* Cartão de Credenciais do Cliente */}
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-left space-y-2.5 max-w-lg mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
                    <span className="text-xs font-bold text-white">{createdBioSiteInfo.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      ✓ No Ar
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Link Público:</span>
                      <a
                        href={`/${createdBioSiteInfo.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1"
                      >
                        biovip.com.br/{createdBioSiteInfo.slug}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Página de Login:</span>
                      <span className="text-stone-200">biovip.com.br/entrar</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">E-mail:</span>
                      <span className="text-stone-200">{createdBioSiteInfo.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Senha:</span>
                      <span className="text-amber-300 font-bold bg-black/60 px-2 py-0.5 rounded border border-white/10">
                        {createdBioSiteInfo.password}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const msg = `🎉 Olá, ${createdBioSiteInfo.name}! O seu BioSite exclusivo já está 100% no ar:\n\n🌐 Link Público:\nhttps://biovip.com.br/${createdBioSiteInfo.slug}\n\n🔑 Acesso ao Painel de Edição:\nhttps://biovip.com.br/entrar\n• Login: ${createdBioSiteInfo.email}\n• Senha: ${createdBioSiteInfo.password}\n\nQualquer dúvida, estamos à disposição!`
                      navigator.clipboard.writeText(msg)
                      setCredentialsCopiedToast(true)
                      setTimeout(() => setCredentialsCopiedToast(false), 3000)
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{credentialsCopiedToast ? 'Mensagem Copiada!' : 'Copiar Acesso para WhatsApp'}</span>
                  </button>

                  <a
                    href={`https://wa.me/${createdBioSiteInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `🎉 Olá, ${createdBioSiteInfo.name}! O seu BioSite exclusivo já está 100% no ar:\n\n🌐 Link Público:\nhttps://biovip.com.br/${createdBioSiteInfo.slug}\n\n🔑 Acesso ao Painel de Edição:\nhttps://biovip.com.br/entrar\n• Login: ${createdBioSiteInfo.email}\n• Senha: ${createdBioSiteInfo.password}\n\nQualquer dúvida, estamos à disposição!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enviar no WhatsApp</span>
                  </a>

                  <Link
                    href={`/${createdBioSiteInfo.slug}`}
                    target="_blank"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver ao Vivo</span>
                  </Link>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateBioSiteModalOpen(false)}
                    className="text-xs text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    Fechar Janela
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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


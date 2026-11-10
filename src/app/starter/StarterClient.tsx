'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { generateNicheContent } from '@/utils/aiNicheGenerator'
import { applyPhotoEnhancement } from '@/utils/imageProcessors'
import {
  DEMO_PHOTOS,
  PHOTO_LAYOUTS,
  PALETTES,
  BACKGROUND_STYLES,
  TYPOGRAPHIES,
  BUTTON_STYLES,
  BUTTON_ANIMATIONS,
  HIGHLIGHT_BADGES
} from '@/data/bioSiteDesign'
import { projects as defaultProjects } from '@/data/projects'
import { saveBioSite } from '@/services/biositeService'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Smartphone,
  Upload,
  Palette,
  Type,
  Link as LinkIcon,
  MessageCircle,
  Instagram,
  MapPin,
  Star,
  CheckCircle2,
  Copy,
  Calendar,
  Utensils,
  User,
  Mail,
  Phone,
  Plus,
  Trash2,
  ChevronDown,
  Globe,
  HelpCircle,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ShieldCheck
} from 'lucide-react'

// SLUGS RESERVADOS DO SISTEMA
const RESERVED_SLUGS = [
  'admin', 'conta', 'entrar', 'planos', 'portfolio', 'privacidade', 
  'starter', 'api', 'login', 'register', 'bio', 'biovip', 'suporte', 
  'ajuda', 'termos', 'checkout', 'dashboard', 'painel'
]

// ÍCONES DISPONÍVEIS PARA OS BOTÕES
const BUTTON_ICONS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle },
  { id: 'agendamento', name: 'Agendamento', icon: Calendar },
  { id: 'cardapio', name: 'Cardápio', icon: Utensils },
  { id: 'quem_sou_eu', name: 'Quem sou eu', icon: User },
  { id: 'email', name: 'E-mail', icon: Mail },
  { id: 'telefone', name: 'Telefone', icon: Phone },
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'maps', name: 'Localização', icon: MapPin },
  { id: 'sem_icone', name: 'Sem Ícone', icon: null }
]

interface CustomButton {
  id: string
  label: string
  subtitle?: string
  icon: string
  targetType: 'whatsapp' | 'link'
  value: string
  isHighlighted?: boolean
  highlightBadge?: string
}

export default function StarterClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planoParam = searchParams.get('plano') || 'pro'
  const planoPreco = planoParam === 'starter' ? '29' : planoParam === 'agency' ? '199' : '79'
  const planoNome = planoParam === 'starter' ? 'Iniciante' : planoParam === 'agency' ? 'Agência' : 'Profissional'

  // Proteção da rota: criação de BioSites reservada a administradores / equipe interna
  const isAdminParam = searchParams.get('admin') === 'true'
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [pinPrompt, setPinPrompt] = useState(false)
  const [enteredPin, setEnteredPin] = useState('')
  const [pinError, setPinError] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminPin = sessionStorage.getItem('biovip_admin_auth') === 'true'
      if (isAdminParam || adminPin) {
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    }
  }, [isAdminParam])

  const handleAdminPinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (enteredPin === '1234' || enteredPin === '2026') {
      sessionStorage.setItem('biovip_admin_auth', 'true')
      setIsAuthorized(true)
      setPinPrompt(false)
    } else {
      setPinError(true)
    }
  }

  // Etapa atual (1 a 9)
  const [step, setStep] = useState<number>(1)

  // 1. Você
  const [brandName, setBrandName] = useState<string>('TESTE')
  const [niche, setNiche] = useState<string>('SALÃO DE BELEZA')
  const [tagline, setTagline] = useState<string>('')

  // 2. Foto
  const [photoLayout, setPhotoLayout] = useState<string>('foto_inteira')
  const [demoGender, setDemoGender] = useState<'mulher' | 'homem'>('mulher')
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null)

  // 3. Paleta
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[1]) // Editorial claro
  const [customColors, setCustomColors] = useState({
    bg: '#0f172a',
    card: '#1e293b',
    button: '#38bdf8',
    buttonText: '#0f172a',
    text: '#ffffff',
    accent: '#38bdf8'
  })

  // 4. Fundo
  const [backgroundStyle, setBackgroundStyle] = useState<string>('aura')

  // 5. Tipografia
  const [selectedTypography, setSelectedTypography] = useState(TYPOGRAPHIES[14]) // Bebas Neue como no print

  // 6. Botões (Formato e Animação)
  const [buttonShape, setButtonShape] = useState<'pill' | 'soft' | 'square'>('soft')
  const [buttonStyle, setButtonStyle] = useState<string>('cartao_nobre')
  const [buttonAnimation, setButtonAnimation] = useState<string>('none')

  // 7. Seus Botões / Links
  const [buttons, setButtons] = useState<CustomButton[]>([
    { id: 'btn-1', label: 'WhatsApp', icon: 'whatsapp', targetType: 'whatsapp', value: '31999999999', isHighlighted: true, highlightBadge: '⭐ MAIS ESCOLHIDO' },
    { id: 'btn-2', label: 'Localização', icon: 'maps', targetType: 'link', value: 'https://maps.google.com' },
    { id: 'btn-3', label: 'Agendamento Online', icon: 'agendamento', targetType: 'link', value: 'https://wa.me' }
  ])
  const [activeIconDropdown, setActiveIconDropdown] = useState<string | null>(null)

  // 8. Prova Social
  const [rating, setRating] = useState<string>('5')
  const [reviewsCount, setReviewsCount] = useState<string>('300')
  const [reviewsSource, setReviewsSource] = useState<string>('Google')
  const [reviewsUrl, setReviewsUrl] = useState<string>('https://')
  const [clientQuotes, setClientQuotes] = useState<string[]>([])
  const [newQuote, setNewQuote] = useState<string>('')

  // 9. Endereço & Validação de Slug Único
  const [slug, setSlug] = useState<string>('teste')
  const [isSlugChecking, setIsSlugChecking] = useState<boolean>(false)
  const [slugStatus, setSlugStatus] = useState<{ available: boolean; message: string }>({
    available: true,
    message: 'Disponível: biovip.com.br/teste'
  })

  // 10. Criação de Conta (E-mail e Senha)
  const [accountName, setAccountName] = useState<string>('')
  const [accountEmail, setAccountEmail] = useState<string>('')
  const [accountPhone, setAccountPhone] = useState<string>('')
  const [accountPassword, setAccountPassword] = useState<string>('')
  const [accountConfirmPassword, setAccountConfirmPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [accountError, setAccountError] = useState<string | null>(null)
  const [isSubmittingAccount, setIsSubmittingAccount] = useState<boolean>(false)

  // Validação em tempo real do endereço (slug)
  useEffect(() => {
    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '')
    if (!cleanSlug) {
      setSlugStatus({ available: false, message: 'Digite o endereço desejado para o seu Bio Site.' })
      return
    }
    if (cleanSlug.length < 3) {
      setSlugStatus({ available: false, message: 'O endereço deve ter no mínimo 3 caracteres.' })
      return
    }
    if (RESERVED_SLUGS.includes(cleanSlug)) {
      setSlugStatus({
        available: false,
        message: `O endereço "${cleanSlug}" é reservado pelo sistema. Por favor, escolha outro.`
      })
      return
    }
    // 1. Verificar se já existe nos modelos de portfólio
    const isModelUsed = defaultProjects.some(p => p.slug === cleanSlug)
    if (isModelUsed) {
      setSlugStatus({
        available: false,
        message: `O endereço "biovip.com.br/${cleanSlug}" já está em uso por outro profissional.`
      })
      return
    }
    // 2. Verificar se já existe no localStorage (assinaturas ou sites locais)
    try {
      const storedSubs = localStorage.getItem('biovip_subscriptions')
      if (storedSubs) {
        const subs = JSON.parse(storedSubs)
        if (subs.some((s: any) => s.slug === cleanSlug)) {
          setSlugStatus({
            available: false,
            message: `O endereço "biovip.com.br/${cleanSlug}" já foi registrado por outro cliente.`
          })
          return
        }
      }
      const existingSite = localStorage.getItem('biovip_site_' + cleanSlug)
      if (existingSite) {
        setSlugStatus({
          available: false,
          message: `O endereço "biovip.com.br/${cleanSlug}" já está cadastrado neste navegador.`
        })
        return
      }
    } catch (e) {}

    // 3. Verificação assíncrona no Supabase (se configurado) com debounce
    let active = true
    setIsSlugChecking(true)
    const timer = setTimeout(async () => {
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data } = await supabase.from('biosites').select('slug').eq('slug', cleanSlug).maybeSingle()
          if (!active) return
          if (data && data.slug) {
            setSlugStatus({
              available: false,
              message: `O endereço "biovip.com.br/${cleanSlug}" já está cadastrado no sistema.`
            })
            setIsSlugChecking(false)
            return
          }
        } catch (err) {
          console.warn('Erro ao verificar slug no Supabase:', err)
        }
      }
      if (active) {
        setSlugStatus({
          available: true,
          message: `Disponível: biovip.com.br/${cleanSlug}`
        })
        setIsSlugChecking(false)
      }
    }, 250)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [slug])

  const [pixCopied, setPixCopied] = useState<boolean>(false)
  const [isPixActive, setIsPixActive] = useState<boolean>(false)
  const pixStudioKey = '12.345.678/0001-90'

  // Estados de IA e Tratamento Híbrido de Foto
  const [aiPrompt, setAiPrompt] = useState<string>('')
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false)
  const [isEnhancingPhoto, setIsEnhancingPhoto] = useState<boolean>(false)
  const [photoFilterMode, setPhotoFilterMode] = useState<'normal' | 'fade' | 'silhueta'>('normal')

  const handleGenerateWithAi = () => {
    if (!aiPrompt.trim()) return
    setIsGeneratingAi(true)
    setTimeout(() => {
      const generated = generateNicheContent(aiPrompt)
      setBrandName(generated.brandName)
      setNiche(generated.niche)
      setTagline(generated.tagline)
      const matchedPalette = PALETTES.find(p => p.id === generated.paletteId) || PALETTES[0]
      setSelectedPalette(matchedPalette)
      setBackgroundStyle(generated.backgroundStyle)
      const matchedTipo = TYPOGRAPHIES.find(t => t.id === generated.typographyId) || TYPOGRAPHIES[0]
      setSelectedTypography(matchedTipo)
      setButtons(generated.buttons)
      setRating(generated.rating)
      setReviewsCount(generated.reviewsCount)
      setSlug(generated.brandName.toLowerCase().replace(/[^a-z0-9]/g, ''))
      setIsGeneratingAi(false)
    }, 400)
  }

  const handleEnhancePhoto = async (mode: 'fade' | 'silhueta') => {
    if (!activePhoto) return
    setIsEnhancingPhoto(true)
    try {
      const enhanced = await applyPhotoEnhancement(activePhoto)
      setCustomPhotoUrl(enhanced)
      setPhotoFilterMode(mode)
    } catch (e) {
      console.error(e)
    }
    setIsEnhancingPhoto(false)
  }

  // Foto efetiva exibida
  const activePhoto = customPhotoUrl || DEMO_PHOTOS[demoGender]

  // Handlers para botões
  const updateButton = (id: string, updates: Partial<CustomButton>) => {
    setButtons(buttons.map(b => b.id === id ? { ...b, ...updates } : b))
  }

  const removeButton = (id: string) => {
    setButtons(buttons.filter(b => b.id !== id))
  }

  const addButton = () => {
    if (buttons.length >= 6) return
    const newId = `btn-${Date.now()}`
    setButtons([...buttons, { id: newId, label: 'Novo Botão', icon: 'sem_icone', targetType: 'link', value: '' }])
  }

  const addQuote = () => {
    if (newQuote.trim() && clientQuotes.length < 5) {
      setClientQuotes([...clientQuotes, newQuote.trim().slice(0, 90)])
      setNewQuote('')
    }
  }

  // Finalização do Cadastro com E-mail e Senha e Redirecionamento para a Área de Edição
  const handleCreateAccountAndGoToEditor = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setAccountError(null)

    // Validações
    const effName = (accountName || brandName).trim()
    if (!effName) {
      setAccountError('Por favor, informe seu nome completo.')
      return
    }

    const effEmail = accountEmail.trim().toLowerCase()
    if (!effEmail || !effEmail.includes('@') || !effEmail.includes('.')) {
      setAccountError('Por favor, informe um endereço de e-mail válido.')
      return
    }

    if (!accountPassword || accountPassword.length < 6) {
      setAccountError('A senha de acesso deve ter pelo menos 6 dígitos.')
      return
    }

    if (accountPassword !== accountConfirmPassword) {
      setAccountError('A confirmação da senha não coincide com a senha digitada.')
      return
    }

    // Se o slug não estiver disponível, aborta
    if (!slugStatus.available) {
      setAccountError('O endereço escolhido não está disponível. Por favor, volte ao passo 9 e altere.')
      return
    }

    setIsSubmittingAccount(true)

    try {
      const effPhone = (accountPhone || buttons[0]?.value || '5531991390202').replace(/\D/g, '')

      // 1. Armazenar sessão do cliente
      sessionStorage.setItem('biovip_client_session', effEmail)
      localStorage.setItem('biovip_logged_client', JSON.stringify({
        email: effEmail,
        name: effName,
        phone: effPhone,
        slug
      }))

      // 2. Salvar na lista de contas cadastradas
      const existingUsersRaw = localStorage.getItem('biovip_users')
      const currentUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : []
      const updatedUsers = [
        ...currentUsers.filter((u: any) => u.email !== effEmail),
        {
          name: effName,
          email: effEmail,
          phone: effPhone,
          password: accountPassword,
          slug,
          createdAt: new Date().toISOString()
        }
      ]
      localStorage.setItem('biovip_users', JSON.stringify(updatedUsers))

      // 3. Montar dados completos do Bio Site (12 Módulos VIP inclusos)
      const nicheContent = generateNicheContent(niche)
      const siteData = {
        slug,
        name: effName,
        businessTitle: effName,
        role: niche,
        category: niche,
        registrationCode: 'REGISTRO OFICIAL',
        monogram: effName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'BV',
        photo: customPhotoUrl || (demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem),
        paletteId: selectedPalette.id,
        typographyId: selectedTypography.id,
        buttonStyle: buttonStyle || 'cartao_nobre',
        buttonAnimation: buttonAnimation,
        buttons: buttons.map((b, i) => ({
          id: `btn-${i + 1}`,
          label: b.label,
          subtitle: b.subtitle || (b.targetType === 'whatsapp' ? 'Conversar diretamente' : 'Toque para abrir'),
          icon: b.icon || 'sparkles',
          url: b.targetType === 'whatsapp' ? `https://wa.me/55${b.value.replace(/\D/g, '')}` : b.value,
          isHighlighted: !!b.isHighlighted,
          highlightBadge: b.highlightBadge
        })),
        whatsapp: effPhone || '5531991390202',
        announcement: nicheContent.announcement,
        urgency: nicheContent.urgency,
        qualifierQuiz: nicheContent.qualifierQuiz,
        metricsList: nicheContent.metricsList,
        howItWorksSteps: nicheContent.howItWorksSteps,
        galleryPhotosList: [
          'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
        ],
        servicesCatalog: nicheContent.servicesCatalog,
        locationInfo: nicheContent.locationInfo,
        testimonialsList: [
          {
            id: 't-1',
            clientName: 'Cliente VIP',
            name: 'Cliente VIP',
            city: 'Sua Cidade - UF',
            role: 'Cliente Satisfeito',
            text: 'Excelente atendimento, superou todas as expectativas com pontualidade e alto padrão.',
            rating: 5,
            date: 'recentemente',
            verified: true
          }
        ],
        aboutMeSection: {
          headline: `Sobre ${effName}`,
          bio: `Atendimento exclusivo em ${niche} com foco em alto padrão e dedicação total aos clientes.`,
          closingPhrase: 'Excelência em cada detalhe.'
        },
        faqList: nicheContent.faqList,
        subpages: [
          { slug: 'servicos', title: 'Serviços & Procedimentos', description: 'Tabela de tratamentos e investimentos.', previewType: 'services' },
          { slug: 'agendamento', title: 'Agendamento Direto', description: 'Consulte os dias livres com confirmação prioritária.', previewType: 'booking' }
        ]
      }

      // Salva no localStorage e sincroniza com o Supabase
      localStorage.setItem('biovip_site_' + slug, JSON.stringify(siteData))
      localStorage.setItem('biovip_user_site', JSON.stringify(siteData))
      await saveBioSite(slug, siteData)

      // 4. Salvar assinatura no sistema com status 'pendente' e prazo de 48h
      const createdAtIso = new Date().toISOString()
      const deadline48hIso = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
      const newSub = {
        id: `sub-${Date.now().toString().slice(-4)}`,
        clientName: effName,
        businessName: `${effName} (${niche})`,
        email: effEmail,
        whatsapp: effPhone,
        niche: niche,
        slug: slug,
        planId: planoParam,
        planName: planoParam === 'starter' ? 'Iniciante' : planoParam === 'agency' ? 'Agência' : 'Profissional',
        cycle: 'mensal',
        amount: planoParam === 'starter' ? 29 : planoParam === 'agency' ? 199 : 79,
        status: 'pendente',
        paymentStatus: 'pendente',
        createdAt: createdAtIso,
        deadline48h: deadline48hIso,
        paymentMethod: 'pix',
        startDate: new Date().toISOString().split('T')[0],
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        bioSiteUrl: `https://biovip.com.br/${slug}`,
        viewsCount: 1,
        clicksCount: 0,
        notes: 'Bio Site criado com pagamento pendente. Tolerância de 48h para regularização.',
        payments: []
      }
      const existingSubsRaw = localStorage.getItem('biovip_subscriptions')
      const currentSubs = existingSubsRaw ? JSON.parse(existingSubsRaw) : []
      localStorage.setItem('biovip_subscriptions', JSON.stringify([newSub, ...currentSubs]))

      // 5. Redirecionar para a ÁREA DE EDIÇÃO DO BIOSITE com aviso de pagamento pendente
      router.push(`/conta?edit=${slug}&novo=true`)
    } catch (err: any) {
      console.error(err)
      setAccountError(err?.message || 'Erro ao criar conta. Tente novamente.')
      setIsSubmittingAccount(false)
    }
  }

  // TELA DE PROTEÇÃO VIP PARA VISITANTES ANÔNIMOS
  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-[#0C0C10] text-stone-100 flex flex-col font-sans">
        <Header />

        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-16 flex flex-col items-center justify-center text-center mt-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#141418] border border-[#E2B857]/40 shadow-2xl relative overflow-hidden max-w-xl w-full">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[#E2B857] flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-mono font-bold tracking-widest uppercase mb-4 border border-amber-500/30">
              SERVIÇO FEITO PARA VOCÊ EM 24H
            </span>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4 leading-snug">
              Criação 100% Feita por Especialistas
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              No BioVip, você <strong>não precisa perder tempo montando sites sozinho</strong>. Nossa equipe recebe suas fotos e serviços pelo WhatsApp e entrega seu microsite pronto e configurado em até 24 horas.
            </p>

            <div className="p-4 rounded-2xl bg-black/50 border border-stone-800 text-left text-xs space-y-2 mb-8 text-stone-300 font-sans">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Entrega completa em até 24h úteis</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Autonomia total pós-entrega com editor exclusivo</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20contratar%20meu%20BioSite%20pronto%20em%2024h."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-sm font-mono uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir Meu BioSite no WhatsApp</span>
              </a>

              <Link
                href="/entrar"
                className="w-full py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 text-xs font-mono font-bold uppercase transition"
              >
                Já Sou Cliente (Acessar Editor)
              </Link>
            </div>

            {/* Acesso Restrito da Equipe / ADM */}
            <div className="mt-8 pt-6 border-t border-stone-800/80">
              {!pinPrompt ? (
                <button
                  type="button"
                  onClick={() => setPinPrompt(true)}
                  className="text-[11px] font-mono text-stone-500 hover:text-stone-300 transition cursor-pointer"
                >
                  🔒 Acesso de Administrador / Equipe
                </button>
              ) : (
                <form onSubmit={handleAdminPinSubmit} className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                  <input
                    type="password"
                    value={enteredPin}
                    onChange={(e) => {
                      setEnteredPin(e.target.value)
                      setPinError(false)
                    }}
                    placeholder="PIN do Administrador"
                    className="p-2 rounded-xl bg-black border border-stone-700 text-xs text-white font-mono text-center w-40"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs font-mono uppercase cursor-pointer"
                  >
                    Entrar
                  </button>
                  {pinError && <span className="text-[10px] text-red-400">PIN incorreto</span>}
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 mt-16 lg:mt-20">
        {/* Barra de Progresso Superior Exata (Linha Fina com 10 divisões) */}
        <div className="mb-8">
          <div className="text-[11px] font-mono tracking-widest text-stone-400 uppercase mb-3">
            PASSO {step} DE 10 · {
              step === 1 ? 'VOCÊ' :
              step === 2 ? 'FOTO' :
              step === 3 ? 'PALETA' :
              step === 4 ? 'FUNDO' :
              step === 5 ? 'TIPOGRAFIA' :
              step === 6 ? 'BOTÕES' :
              step === 7 ? 'SEUS LINKS' :
              step === 8 ? 'PROVA SOCIAL' :
              step === 9 ? 'ENDEREÇO' : 'CRIAR CONTA'
            }
          </div>
          <div className="grid grid-cols-10 gap-1.5 h-1 w-full bg-stone-200 rounded-full overflow-hidden">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className={`h-full transition-colors duration-200 ${
                  idx + 1 <= step ? 'bg-stone-900' : 'bg-stone-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Layout Grid: 60% Form à Esquerda / 40% Smartphone à Direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* PAINEL DE CONFIGURAÇÃO (ESQUERDA) */}
          <div className="lg:col-span-7 space-y-8">
            {/* ==================== PASSO 1: VOCÊ ==================== */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">1. QUEM É VOCÊ</span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Quem é você</h1>
                  <p className="text-xs text-stone-500 mt-1">
                    Esses dados serão o cartão de visitas da sua bio. O celular ao lado vai mudando com você.
                  </p>
                </div>

                {/* CAIXA DE PREENCHIMENTO MÁGICO COM IA */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-stone-100 border border-amber-200/90 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-950 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Montar tudo com IA (Preenchimento Mágico):
                    </span>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900 font-bold">
                      EXCLUSIVO
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleGenerateWithAi()
                        }
                      }}
                      placeholder="Ex: Dermatologista em SP, Barbearia clássica em BH, Advogado tributário..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-900"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateWithAi}
                      disabled={isGeneratingAi || !aiPrompt.trim()}
                      className="px-4 py-2 rounded-xl bg-stone-950 hover:bg-black disabled:bg-stone-300 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                    >
                      {isGeneratingAi ? 'Gerando...' : 'Gerar com IA'}
                    </button>
                  </div>
                </div>

                {/* BOTÕES DE PREENCHIMENTO RÁPIDO (EXEMPLOS) */}
                <div className="p-3.5 rounded-2xl bg-stone-100/80 border border-stone-200 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Preencher com exemplo pronto em 1 clique:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setBrandName('Dra. Carolina Mendes')
                        setNiche('MÉDICA NUTRÓLOGA')
                        setTagline('Atendimento humanizado, saúde metabólica e emagrecimento com base científica.')
                        setSelectedPalette(PALETTES[1]) // Editorial claro
                        setBackgroundStyle('aura')
                        setSelectedTypography(TYPOGRAPHIES[0]) // Instrument Serif
                        setDemoGender('mulher')
                        setPhotoLayout('foto_inteira')
                        setSlug('dracarolinamendes')
                        setButtons([
                          { id: 'btn-1', label: 'Agendar Consulta WhatsApp', icon: 'whatsapp', targetType: 'whatsapp', value: '11999998888' },
                          { id: 'btn-2', label: 'Localização & Consultório', icon: 'maps', targetType: 'link', value: 'https://maps.google.com' },
                          { id: 'btn-3', label: 'Artigos & Dicas de Saúde', icon: 'quem_sou_eu', targetType: 'link', value: 'https://instagram.com' }
                        ])
                        setRating('5.0')
                        setReviewsCount('180')
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 hover:border-stone-900 text-stone-800 font-medium transition cursor-pointer"
                    >
                      Médica / Saúde
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setBrandName('Studio Íris')
                        setNiche('ESTÉTICA & BEAUTY')
                        setTagline('Harmonização facial e estética avançada para realçar sua versão mais elegante.')
                        setSelectedPalette(PALETTES[0]) // Luxo nude
                        setBackgroundStyle('vinheta')
                        setSelectedTypography(TYPOGRAPHIES[1]) // Playfair
                        setDemoGender('mulher')
                        setPhotoLayout('foto_inteira')
                        setSlug('studioiris')
                        setButtons([
                          { id: 'btn-1', label: 'Reservar Horário WhatsApp', icon: 'whatsapp', targetType: 'whatsapp', value: '81999997777' },
                          { id: 'btn-2', label: 'Catálogo de Procedimentos', icon: 'cardapio', targetType: 'link', value: 'https://instagram.com' }
                        ])
                        setRating('4.9')
                        setReviewsCount('320')
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 hover:border-stone-900 text-stone-800 font-medium transition cursor-pointer"
                    >
                      Estética & Beleza
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setBrandName('Dr. Renato Andrade')
                        setNiche('ADVOCACIA ESTRATÉGICA')
                        setTagline('Consultoria e defesa jurídica com rigor técnico e absoluto sigilo.')
                        setSelectedPalette(PALETTES[1])
                        setBackgroundStyle('listras')
                        setSelectedTypography(TYPOGRAPHIES[7]) // Marcellus
                        setDemoGender('homem')
                        setPhotoLayout('foto_inteira')
                        setSlug('renatoandrade')
                        setButtons([
                          { id: 'btn-1', label: 'Plantão Jurídico WhatsApp', icon: 'whatsapp', targetType: 'whatsapp', value: '31999996666' },
                          { id: 'btn-2', label: 'Áreas de Atuação', icon: 'quem_sou_eu', targetType: 'link', value: 'https://andradeadvogados.com.br' }
                        ])
                        setRating('5.0')
                        setReviewsCount('140')
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 hover:border-stone-900 text-stone-800 font-medium transition cursor-pointer"
                    >
                      Advocacia
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setBrandName('Don Corleone Barber')
                        setNiche('BARBEARIA CLÁSSICA')
                        setTagline('Corte tradicional, toalha quente e atendimento com cerveja cortesia.')
                        setSelectedPalette(PALETTES[5]) // Alto contraste
                        setBackgroundStyle('solido')
                        setSelectedTypography(TYPOGRAPHIES[14]) // Bebas Neue
                        setDemoGender('homem')
                        setPhotoLayout('foto_inteira')
                        setSlug('doncorleone')
                        setButtons([
                          { id: 'btn-1', label: 'Agendar Horário no WhatsApp', icon: 'whatsapp', targetType: 'whatsapp', value: '11988885555' },
                          { id: 'btn-2', label: 'Clube de Assinatura Mensal', icon: 'agendamento', targetType: 'link', value: 'https://' }
                        ])
                        setRating('4.9')
                        setReviewsCount('410')
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 hover:border-stone-900 text-stone-800 font-medium transition cursor-pointer"
                    >
                      Barbearia
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Seu nome ou o da sua marca *
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => {
                        setBrandName(e.target.value)
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))
                      }}
                      placeholder="Nome"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-stone-900 focus:outline-none transition"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Sua área ou profissão
                    </label>
                    <input
                      type="text"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value.toUpperCase())}
                      placeholder="Ex: SALÃO DE BELEZA, ADVOCACIA, MÉDICA..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-stone-900 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                      <span>Frase (opcional)</span>
                      <span className="font-mono text-stone-400">{tagline.length}/140</span>
                    </div>
                    <textarea
                      maxLength={140}
                      rows={2}
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="Frase de acolhimento ou destaque dos seus atendimentos..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:border-stone-900 focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ==================== PASSO 2: FOTO OU LOGO ==================== */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">2. FOTO OU LOGO</span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Foto ou logo</h1>
                  <p className="text-xs text-stone-500 mt-1">
                    Como a sua imagem deve aparecer na página.
                  </p>
                </div>

                {/* Grid dos 7 Modos de Exibição */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PHOTO_LAYOUTS.map((layout) => {
                    const isSelected = photoLayout === layout.id
                    return (
                      <button
                        key={layout.id}
                        type="button"
                        onClick={() => setPhotoLayout(layout.id)}
                        className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-stone-900 bg-white shadow-md ring-1 ring-stone-900'
                            : 'border-stone-200 bg-white/60 hover:border-stone-300'
                        }`}
                      >
                        <div className="w-full h-20 rounded-xl bg-stone-100 mb-2 flex items-center justify-center overflow-hidden border border-stone-200/60">
                          {layout.id === 'retrato_redondo' && (
                            <div className="w-12 h-12 rounded-full border-2 border-stone-400 overflow-hidden">
                              <img src={activePhoto} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                          {layout.id === 'retrato_quadrado' && (
                            <div className="w-12 h-12 rounded-xl border-2 border-stone-400 overflow-hidden">
                              <img src={activePhoto} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                          {layout.id === 'faixa' && (
                            <div className="w-full h-10 border-y border-stone-400 overflow-hidden">
                              <img src={activePhoto} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                          {layout.id === 'foto_inteira' && (
                            <div className="w-full h-full relative">
                              <img src={activePhoto} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-stone-200 to-transparent" />
                            </div>
                          )}
                          {layout.id === 'logo_transparente' && (
                            <span className="font-serif font-bold text-lg text-stone-800">B.</span>
                          )}
                          {layout.id === 'logo_circulo' && (
                            <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm">B</div>
                          )}
                          {layout.id === 'so_tipografia' && (
                            <span className="text-[11px] font-mono uppercase text-stone-500">Sem Foto</span>
                          )}
                        </div>

                        <div>
                          <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                            <span>{layout.name}</span>
                            {isSelected && <span className="text-[10px] text-stone-900 font-bold">✓</span>}
                          </div>
                          <p className="text-[10px] text-stone-500 mt-1 leading-snug line-clamp-2">
                            {layout.desc}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Box: SUA FOTO & Toggle Mulher/Homem */}
                <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-stone-400 font-semibold">SUA FOTO</span>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Melhor com PNG de fundo removido — a foto se dissolve no fundo da página.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <label className="px-4 py-2.5 rounded-xl border border-stone-300 hover:border-stone-900 text-xs font-bold text-stone-800 transition cursor-pointer flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5" /> ESCOLHER FOTO
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const url = URL.createObjectURL(file)
                            setCustomPhotoUrl(url)
                          }
                        }}
                      />
                    </label>

                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span>Enquanto isso, veja com:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomPhotoUrl(null)
                          setDemoGender('mulher')
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                          demoGender === 'mulher' && !customPhotoUrl
                            ? 'bg-stone-950 text-white'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        MULHER
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomPhotoUrl(null)
                          setDemoGender('homem')
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                          demoGender === 'homem' && !customPhotoUrl
                            ? 'bg-stone-950 text-white'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        HOMEM
                      </button>
                    </div>

                    {/* ESTRATÉGIA HÍBRIDA DE TRATAMENTO DE FOTO (SEM CUSTO DE API) */}
                    <div className="w-full pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-stone-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" /> Tratamento Híbrido:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleEnhancePhoto('fade')}
                        disabled={isEnhancingPhoto}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          photoFilterMode === 'fade'
                            ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                            : 'border-stone-200 bg-stone-50 hover:border-stone-900 text-stone-800'
                        }`}
                      >
                        {isEnhancingPhoto ? 'Aplicando...' : '✨ Dissolução Orgânica (Efeito Estúdio)'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEnhancePhoto('silhueta')}
                        disabled={isEnhancingPhoto}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          photoFilterMode === 'silhueta'
                            ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                            : 'border-stone-200 bg-stone-50 hover:border-stone-900 text-stone-800'
                        }`}
                      >
                        Recortar Silhueta (Local)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== PASSO 3: PALETA ==================== */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">3. PALETA</span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Paleta</h1>
                  <p className="text-xs text-stone-500 mt-1">
                    Define fundo, texto e botões de uma vez. Ou monte a sua.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {PALETTES.map((palette) => {
                    const isSelected = selectedPalette.id === palette.id
                    return (
                      <button
                        key={palette.id}
                        type="button"
                        onClick={() => setSelectedPalette(palette)}
                        className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-stone-900 bg-white shadow-md ring-1 ring-stone-900'
                            : 'border-stone-200 bg-white/70 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-3">
                          {palette.swatches.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-lg border border-stone-200/80 shadow-xs"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>

                        <div>
                          <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                            <span>{palette.name}</span>
                            {isSelected && <span className="text-[10px] text-stone-900 font-bold">✓</span>}
                          </div>
                          <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                            {palette.desc}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* SELEÇÃO DE CORES PERSONALIZADAS (MINHA PALETA) */}
                {selectedPalette.id === 'minha_paleta' && (
                  <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3.5 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider font-bold text-stone-800 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        ESCOLHA SUAS CORES EXATAS
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Visualização Imediata
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Fundo da Página */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                        <div>
                          <span className="font-bold block text-xs text-stone-900">Fundo da Página</span>
                          <span className="text-[10px] font-mono text-stone-400">{customColors.bg}</span>
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
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                        />
                      </div>

                      {/* Cor dos Botões */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                        <div>
                          <span className="font-bold block text-xs text-stone-900">Cor dos Botões</span>
                          <span className="text-[10px] font-mono text-stone-400">{customColors.button}</span>
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
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                        />
                      </div>

                      {/* Cor do Texto */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                        <div>
                          <span className="font-bold block text-xs text-stone-900">Cor do Texto</span>
                          <span className="text-[10px] font-mono text-stone-400">{customColors.text}</span>
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
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                        />
                      </div>

                      {/* Acento e Destaque */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                        <div>
                          <span className="font-bold block text-xs text-stone-900">Cor de Destaque</span>
                          <span className="text-[10px] font-mono text-stone-400">{customColors.accent}</span>
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
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==================== PASSO 4: FUNDO ==================== */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">4. FUNDO</span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Fundo</h1>
                  <p className="text-xs text-stone-500 mt-1">
                    O mesmo estilo muda de cor conforme a paleta — o que você vê aqui já está na sua.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {BACKGROUND_STYLES.map((bgStyle) => {
                    const isSelected = backgroundStyle === bgStyle.id
                    return (
                      <button
                        key={bgStyle.id}
                        type="button"
                        onClick={() => setBackgroundStyle(bgStyle.id)}
                        className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-stone-900 bg-white shadow-md ring-1 ring-stone-900'
                            : 'border-stone-200 bg-white/60 hover:border-stone-300'
                        }`}
                      >
                        {/* Preview miniatura com as cores da paleta selecionada */}
                        <div
                          className="w-full h-16 rounded-xl border border-stone-200 mb-2 relative overflow-hidden flex items-center justify-center"
                          style={{ backgroundColor: selectedPalette.bg }}
                        >
                          {bgStyle.id === 'degrade' && (
                            <div className="w-full h-full bg-gradient-to-b from-white/30 to-black/20" />
                          )}
                          {bgStyle.id === 'aura' && (
                            <div
                              className="w-12 h-12 rounded-full blur-md opacity-80"
                              style={{ backgroundColor: selectedPalette.accent }}
                            />
                          )}
                          {bgStyle.id === 'vinheta' && (
                            <div className="w-full h-full shadow-[inset_0_0_16px_rgba(0,0,0,0.4)]" />
                          )}
                          {bgStyle.id === 'listras' && (
                            <div className="w-full h-full opacity-20 bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_8px)]" />
                          )}
                          {bgStyle.id === 'malha' && (
                            <div className="w-full h-full opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />
                          )}
                        </div>

                        <div>
                          <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                            <span>{bgStyle.name}</span>
                            {isSelected && <span className="text-[10px] text-stone-900 font-bold">✓</span>}
                          </div>
                          <p className="text-[10px] text-stone-500 mt-1 leading-snug line-clamp-2">
                            {bgStyle.desc}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ==================== PASSO 5: TIPOGRAFIA ==================== */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">5. TIPOGRAFIA</span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Tipografia</h1>
                  <p className="text-xs text-stone-500 mt-1">
                    Seu nome aparece em cada uma. Escolha pelo que combina com você.
                  </p>
                </div>

                {/* Grid das 16 Fontes Curadas */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[520px] overflow-y-auto pr-1">
                  {TYPOGRAPHIES.map((typo) => {
                    const isSelected = selectedTypography.id === typo.id
                    return (
                      <button
                        key={typo.id}
                        type="button"
                        onClick={() => setSelectedTypography(typo)}
                        className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-stone-900 bg-white shadow-md ring-1 ring-stone-900'
                            : 'border-stone-200 bg-white/70 hover:border-stone-300'
                        }`}
                      >
                        {/* Nome do Usuário Renderizado com a Fonte Real */}
                        <div className="h-14 flex items-center justify-center text-center px-1">
                          <span
                            className={`text-lg sm:text-xl font-bold text-stone-900 truncate ${typo.uppercase ? 'uppercase' : ''}`}
                            style={{ fontFamily: typo.cssFont }}
                          >
                            {brandName || 'TESTE'}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-stone-100">
                          <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                            <span>{typo.name}</span>
                            {isSelected && <span className="text-[10px] text-stone-900 font-bold">✓</span>}
                          </div>
                          <p className="text-[10px] text-stone-500 mt-0.5 leading-snug line-clamp-2">
                            {typo.desc}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ==================== PASSO 6: FORMATO DOS BOTÕES ==================== */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">6. BOTÕES</span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Estilo dos botões</h1>
                  <p className="text-xs text-stone-500 mt-1">
                    Escolha entre os 10 modelos VIP de alta conversão para o seu BioVip.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {BUTTON_STYLES.filter(b => !['moldura', 'solido', 'vidro', 'sombra', 'pill'].includes(b.id)).map((b) => {
                    const isSelected = buttonStyle === b.id
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setButtonStyle(b.id)
                          if (b.id === 'pill_couture') setButtonShape('pill')
                          else if (b.id === 'moldura_fina') setButtonShape('square')
                          else setButtonShape('soft')
                        }}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/40 shadow-sm font-semibold'
                            : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-stone-900 truncate">{b.name}</span>
                            {b.badge && (
                              <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold shrink-0">
                                {b.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[9.5px] text-stone-500 leading-snug">{b.desc}</p>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[8.5px] font-mono text-stone-400">
                          <span>{isSelected ? '✓ Selecionado' : 'Clique para testar'}</span>
                          <span className="text-amber-600 font-bold">BioVip</span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* ANIMAÇÃO DE CONVERSÃO DOS BOTÕES */}
                <div className="pt-5 border-t border-stone-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase font-bold text-stone-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      ANIMAÇÃO DE CONVERSÃO DOS BOTÕES
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      {BUTTON_ANIMATIONS.find(a => a.id === buttonAnimation)?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BUTTON_ANIMATIONS.map((anim) => (
                      <button
                        key={anim.id}
                        type="button"
                        onClick={() => setButtonAnimation(anim.id)}
                        className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                          buttonAnimation === anim.id
                            ? 'border-amber-600 bg-amber-50/70 ring-1 ring-amber-500 font-bold text-amber-950'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <div className="text-xs">{anim.name}</div>
                        <div className="text-[10px] text-stone-400 mt-0.5">{anim.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== PASSO 7: SEUS LINKS ==================== */}
            {step === 7 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">7. SEUS BOTÕES</span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Seus botões</h1>
                  <p className="text-xs text-stone-500 mt-1">
                    O texto do botão e para onde ele leva: link, WhatsApp ou @ do Instagram.
                  </p>
                </div>

                <div className="space-y-4">
                  {buttons.map((btn, idx) => (
                    <div
                      key={btn.id}
                      className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-3 relative"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-stone-800 uppercase tracking-wider">
                          BOTÃO {idx + 1}
                        </span>
                        {buttons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeButton(btn.id)}
                            className="text-[11px] text-stone-400 hover:text-rose-600 transition cursor-pointer"
                          >
                            Remover
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        {/* Texto do Botão */}
                        <div className="sm:col-span-4">
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Nome no Botão</label>
                          <input
                            type="text"
                            value={btn.label}
                            onChange={(e) => updateButton(btn.id, { label: e.target.value })}
                            placeholder="Ex: WhatsApp"
                            className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-stone-900 focus:outline-none"
                          />
                        </div>

                        {/* Seletor de Ícone com Dropdown */}
                        <div className="sm:col-span-4 relative">
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">ESCOLHER ÍCONE</label>
                          <button
                            type="button"
                            onClick={() => setActiveIconDropdown(activeIconDropdown === btn.id ? null : btn.id)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs flex items-center justify-between bg-white cursor-pointer"
                          >
                            <span className="flex items-center gap-1.5 capitalize">
                              {BUTTON_ICONS.find(i => i.id === btn.icon)?.name || 'Sem Ícone'}
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                          </button>

                          {/* Menu Dropdown Aberto (igual ao print) */}
                          {activeIconDropdown === btn.id && (
                            <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white border border-stone-200 rounded-xl shadow-xl py-1 text-xs max-h-48 overflow-y-auto">
                              {BUTTON_ICONS.map((ico) => {
                                const IconComp = ico.icon
                                return (
                                  <button
                                    key={ico.id}
                                    type="button"
                                    onClick={() => {
                                      updateButton(btn.id, {
                                        icon: ico.id,
                                        targetType: ico.id === 'whatsapp' ? 'whatsapp' : 'link'
                                      })
                                      setActiveIconDropdown(null)
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                                  >
                                    {IconComp && <IconComp className="w-3.5 h-3.5 text-stone-500" />}
                                    <span>{ico.name}</span>
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>

                        {/* Campo de Destino (Número WhatsApp ou Link) */}
                        <div className="sm:col-span-4">
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">
                            {btn.targetType === 'whatsapp' ? 'NÚMERO' : 'LINK'}
                          </label>
                          <input
                            type="text"
                            value={btn.value}
                            onChange={(e) => updateButton(btn.id, { value: e.target.value })}
                            placeholder={btn.targetType === 'whatsapp' ? '31999999999' : 'https://'}
                            className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono focus:border-stone-900 focus:outline-none"
                          />
                        </div>
                      </div>

                      {btn.targetType === 'whatsapp' && btn.value && (
                        <div className="text-[10px] text-stone-400 font-mono">
                          Vai abrir: wa.me/55{btn.value.replace(/\D/g, '')}
                        </div>
                      )}

                      {/* DESTAQUE & SELO DO BOTÃO */}
                      <div className="pt-2 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!btn.isHighlighted}
                            onChange={(e) => {
                              updateButton(btn.id, {
                                isHighlighted: e.target.checked,
                                highlightBadge: e.target.checked ? (btn.highlightBadge || '⭐ MAIS ESCOLHIDO') : undefined
                              })
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
                              onChange={(e) => updateButton(btn.id, { highlightBadge: e.target.value })}
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

                  <div className="flex items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={addButton}
                      className="px-4 py-2.5 rounded-full border border-stone-300 hover:border-stone-900 text-xs font-bold text-stone-800 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> ADICIONAR BOTÃO
                    </button>
                    <span className="text-[11px] text-stone-400">
                      Botão sem destino não aparece na página. Mais de seis costuma diluir a atenção — mas a escolha é sua.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== PASSO 8: PROVA SOCIAL ==================== */}
            {step === 8 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">8. PROVA SOCIAL</span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Prova social</h1>
                  <p className="text-xs text-stone-500 mt-1">
                    Sua nota e o que os clientes dizem, entre a sua frase e os botões.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">SUA NOTA</label>
                      <input
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="5"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">QUANTAS</label>
                      <input
                        type="text"
                        value={reviewsCount}
                        onChange={(e) => setReviewsCount(e.target.value)}
                        placeholder="300"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">DE ONDE</label>
                      <select
                        value={reviewsSource}
                        onChange={(e) => setReviewsSource(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white cursor-pointer"
                      >
                        <option value="Google">Google</option>
                        <option value="Doctoralia">Doctoralia</option>
                        <option value="Instagram">Instagram</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">LINK DO SEU PERFIL LÁ</label>
                    <input
                      type="text"
                      value={reviewsUrl}
                      onChange={(e) => setReviewsUrl(e.target.value)}
                      placeholder="https://g.page/sua-empresa"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono"
                    />
                    <p className="text-[11px] text-stone-500 mt-1.5 leading-snug">
                      O selo vira um link para cá. É o que deixa qualquer pessoa conferir a sua nota num toque — e por isso ele é obrigatório.
                    </p>
                  </div>
                </div>

                {/* Seção Frases de Clientes */}
                <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-stone-400 font-semibold">FRASES DE CLIENTES</span>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Até 5. Elas se revezam sozinhas, uma a cada cinco segundos. Curtas — o campo corta em 90 letras, que é o que cabe em duas linhas.
                    </p>
                  </div>

                  {clientQuotes.map((q, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
                      <span className="italic truncate">&ldquo;{q}&rdquo;</span>
                      <button
                        type="button"
                        onClick={() => setClientQuotes(clientQuotes.filter((_, i) => i !== idx))}
                        className="text-stone-400 hover:text-rose-600 text-[11px] ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {clientQuotes.length < 5 && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={90}
                        value={newQuote}
                        onChange={(e) => setNewQuote(e.target.value)}
                        placeholder="Ex: Atendimento impecável, me senti segura desde o primeiro instante."
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs"
                      />
                      <button
                        type="button"
                        onClick={addQuote}
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition cursor-pointer"
                      >
                        ADICIONAR FRASE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ==================== PASSO 9: SEU ENDEREÇO ==================== */}
            {step === 9 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">9. SEU ENDEREÇO</span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Seu endereço</h1>
                  <p className="text-xs text-stone-500 mt-1">
                    É o link que você vai colar na bio do Instagram. Só letras, números e hífen.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className={`flex items-center text-sm font-mono border-b-2 pb-2 transition-colors ${
                      slugStatus.available ? 'border-stone-900' : 'border-rose-500'
                    }`}>
                      <span className="text-stone-400">biovip.com.br/</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        className={`font-bold focus:outline-none flex-1 ml-1 ${
                          slugStatus.available ? 'text-stone-900' : 'text-rose-600'
                        }`}
                        placeholder="seu-nome"
                      />
                      {isSlugChecking && (
                        <Loader2 className="w-4 h-4 text-stone-400 animate-spin ml-2" />
                      )}
                    </div>

                    {isSlugChecking ? (
                      <div className="text-xs text-stone-500 font-mono mt-2 flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-stone-400" />
                        <span>Verificando disponibilidade no BioVip...</span>
                      </div>
                    ) : slugStatus.available ? (
                      <div className="text-xs text-emerald-700 font-mono mt-2 flex items-center gap-1.5 font-medium animate-fade-in">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{slugStatus.message}</span>
                      </div>
                    ) : (
                      <div className="text-xs text-rose-600 font-mono mt-2 flex items-center gap-1.5 font-bold animate-fade-in bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{slugStatus.message}</span>
                      </div>
                    )}
                  </div>

                  <div className="pl-4 border-l-2 border-stone-300 py-1 text-xs text-stone-500 leading-relaxed">
                    Escolha com calma: tudo o mais você edita depois na sua área, mas o endereço fica.
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Próxima Etapa: Conta de Acesso
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 font-bold">
                        PASSO FINAL
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Ao avançar, você criará sua conta de acesso (e-mail e senha) para entrar imediatamente na <strong>Área de Edição do BioSite</strong> com os 12 Módulos VIP, catálogo e estatísticas.
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/5531991390202?text=${encodeURIComponent(`Olá! Estou montando o Bio Site (${slug}) e prefiro falar com vocês antes de criar a conta.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-stone-500 hover:text-stone-900 transition font-medium"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> Prefiro falar antes via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== PASSO 10: CRIAR CONTA COM E-MAIL E SENHA ==================== */}
            {step === 10 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <span className="text-xs font-mono uppercase text-stone-400 tracking-wider">10. CONTA & ACESSO</span>
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Crie sua conta</h1>
                  <p className="text-xs text-stone-500 mt-1">
                    Crie seu e-mail e senha para ter acesso exclusivo à área de edição do seu Bio Site em <strong className="font-mono text-stone-900">biovip.com.br/{slug}</strong>.
                  </p>
                </div>

                {accountError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium flex items-center gap-2 animate-fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{accountError}</span>
                  </div>
                )}

                <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-stone-500 font-bold mb-1">
                      NOME COMPLETO OU NOME DA MARCA *
                    </label>
                    <input
                      type="text"
                      value={accountName || brandName}
                      onChange={(e) => setAccountName(e.target.value)}
                      placeholder="Ex: Dra. Ana Freire"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-stone-500 font-bold mb-1">
                        WHATSAPP DE ATENDIMENTO *
                      </label>
                      <input
                        type="tel"
                        value={accountPhone || buttons[0]?.value || ''}
                        onChange={(e) => setAccountPhone(e.target.value)}
                        placeholder="Ex: (81) 98765-4321"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-stone-500 font-bold mb-1">
                        E-MAIL DE ACESSO (LOGIN) *
                      </label>
                      <input
                        type="email"
                        value={accountEmail}
                        onChange={(e) => setAccountEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-stone-500 font-bold mb-1">
                        SENHA (MÍNIMO 6 DÍGITOS) *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={accountPassword}
                          onChange={(e) => setAccountPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900 pr-9"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-stone-500 font-bold mb-1">
                        CONFIRMAR SENHA *
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={accountConfirmPassword}
                        onChange={(e) => setAccountConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2 leading-relaxed">
                    <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Seu endereço reservado:</strong> <code className="font-mono font-bold text-amber-950">biovip.com.br/{slug}</code>.
                      Ao clicar abaixo, sua conta é ativada e você é direcionado diretamente para a tela de edição do BioSite.
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isSubmittingAccount}
                    onClick={handleCreateAccountAndGoToEditor}
                    className="w-full py-4 rounded-2xl bg-stone-950 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-xl cursor-pointer"
                  >
                    {isSubmittingAccount ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Criando sua conta & preparando editor...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>CRIAR CONTA & ENTRAR NA ÁREA DE EDIÇÃO →</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* BOTÕES DE NAVEGAÇÃO INFERIORES */}
            <div className="pt-6 border-t border-stone-200/80 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 rounded-full border border-stone-300 hover:border-stone-900 text-xs font-bold text-stone-800 transition cursor-pointer flex items-center gap-1.5"
                >
                  ← VOLTAR
                </button>
              ) : (
                <Link
                  href="/planos"
                  className="px-6 py-3 rounded-full border border-stone-300 hover:border-stone-900 text-xs font-bold text-stone-800 transition"
                >
                  ← VOLTAR
                </Link>
              )}

              {step < 9 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-8 py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold transition shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  CONTINUAR →
                </button>
              ) : step === 9 ? (
                <button
                  type="button"
                  disabled={!slugStatus.available || isSlugChecking}
                  onClick={() => {
                    if (slugStatus.available && !isSlugChecking) {
                      setStep(10)
                    }
                  }}
                  className={`px-8 py-3.5 rounded-full text-xs font-bold tracking-wide transition shadow-xl flex items-center gap-2 ${
                    slugStatus.available && !isSlugChecking
                      ? 'bg-stone-950 hover:bg-stone-800 text-white cursor-pointer'
                      : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  {isSlugChecking ? 'VERIFICANDO...' : 'AVANÇAR PARA CRIAR CONTA →'}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmittingAccount}
                  onClick={handleCreateAccountAndGoToEditor}
                  className="px-8 py-3.5 rounded-full bg-stone-950 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-bold tracking-wide transition shadow-xl cursor-pointer flex items-center gap-2"
                >
                  {isSubmittingAccount ? 'CRIANDO CONTA...' : 'ENTRAR NA ÁREA DE EDIÇÃO →'}
                </button>
              )}
            </div>
          </div>

          {/* SMARTPHONE AO VIVO (DIREITA) */}
          <div className="lg:col-span-5 flex flex-col items-center sticky top-24">
            <div className="text-[10px] font-mono uppercase text-stone-400 tracking-widest mb-3">
              SUA TELA AGORA
            </div>

            {/* CARCAÇA DO IPHONE */}
            <div className="w-[300px] sm:w-[325px] rounded-[50px] p-3.5 bg-black border-[5px] border-stone-900 shadow-2xl relative overflow-hidden">
              {/* Ilha Dinâmica / Notch */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 relative z-30" />

              {/* TELA DINÂMICA DO SMARTPHONE */}
              <div
                className="w-full rounded-[38px] overflow-hidden min-h-[570px] flex flex-col justify-between p-4 relative transition-all duration-300"
                style={{
                  backgroundColor: selectedPalette.bg,
                  color: selectedPalette.text
                }}
              >
                {/* Efeito de Fundo: Aura, Vinheta, Malha, etc. */}
                {backgroundStyle === 'aura' && (
                  <div
                    className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-2xl opacity-40 pointer-events-none"
                    style={{ backgroundColor: selectedPalette.accent }}
                  />
                )}
                {backgroundStyle === 'vinheta' && (
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none" />
                )}
                {backgroundStyle === 'degrade' && (
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/20 pointer-events-none" />
                )}

                {/* CONTEÚDO SUPERIOR DO BIO SITE */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Foto de Perfil Conforme o Layout Selecionado */}
                  {photoLayout === 'foto_inteira' && (
                    <div className="w-full h-56 -mx-4 -mt-4 relative mb-2 overflow-hidden">
                      <img
                        src={activePhoto}
                        alt="Foto"
                        className="w-full h-full object-cover object-top"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[inherit] via-transparent to-transparent"
                        style={{
                          background: `linear-gradient(to top, ${selectedPalette.bg} 15%, transparent 80%)`
                        }}
                      />
                    </div>
                  )}

                  {photoLayout === 'retrato_redondo' && (
                    <div className="w-20 h-20 rounded-full border-2 border-white/20 overflow-hidden shadow-lg mb-3 mt-2">
                      <img src={activePhoto} alt="Foto" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {photoLayout === 'retrato_quadrado' && (
                    <div className="w-20 h-20 rounded-2xl border-2 border-white/20 overflow-hidden shadow-lg mb-3 mt-2">
                      <img src={activePhoto} alt="Foto" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {photoLayout === 'faixa' && (
                    <div className="w-full h-24 -mx-4 -mt-4 overflow-hidden mb-3">
                      <img src={activePhoto} alt="Foto" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {photoLayout === 'logo_circulo' && (
                    <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xl mb-3 shadow-md">
                      {brandName.charAt(0) || 'B'}
                    </div>
                  )}

                  {/* Nome da Marca com a Fonte Escolhida */}
                  <h3
                    className={`text-xl font-bold tracking-tight mt-1 ${selectedTypography.uppercase ? 'uppercase' : ''}`}
                    style={{ fontFamily: selectedTypography.cssFont }}
                  >
                    {brandName || 'TESTE'}
                  </h3>

                  {/* Área / Profissão em Caixa Alta Espaçada */}
                  <span className="text-[9px] font-mono uppercase tracking-widest opacity-60 mt-0.5">
                    {niche || 'SALÃO DE BELEZA'}
                  </span>

                  {tagline && (
                    <p className="text-[11px] opacity-75 mt-1.5 px-3 line-clamp-2 leading-tight">
                      {tagline}
                    </p>
                  )}

                  {/* Prova Social no Celular */}
                  {step >= 8 && rating && (
                    <div className="flex items-center gap-1.5 text-[10px] opacity-80 mt-2 font-mono">
                      <span className="text-amber-400">★★★★★</span>
                      <span className="font-bold">{rating}</span>
                      <span>({reviewsCount} avaliações no {reviewsSource})</span>
                    </div>
                  )}

                  {/* Botões do Celular */}
                  <div className="w-full mt-4 space-y-2">
                    {buttons.map((btn) => {
                      const IconComponent = BUTTON_ICONS.find(i => i.id === btn.icon)?.icon
                      const isHigh = !!btn.isHighlighted
                      const animClass = buttonAnimation === 'pulse' || (isHigh && buttonAnimation === 'none')
                        ? 'btn-anim-pulse'
                        : buttonAnimation === 'bounce'
                        ? 'btn-anim-bounce'
                        : buttonAnimation === 'glow' || isHigh
                        ? 'btn-anim-glow'
                        : ''

                      const isShimmer = buttonAnimation === 'shimmer' || buttonStyle === 'shimmer_ouro' || isHigh

                      let cardBg: string = selectedPalette.card || '#14161c'
                      let cardBorder: string = isHigh ? selectedPalette.accent : `${selectedPalette.accent}33`
                      let cardRadius: string = '12px'
                      let cardShadow: string = '0 4px 12px rgba(0,0,0,0.35)'
                      let textColor: string = selectedPalette.text
                      let iconBg: string = `${selectedPalette.accent}18`
                      let iconBorder: string = `${selectedPalette.accent}40`
                      let iconColor: string = selectedPalette.accent
                      let iconRadius: string = '8px'
                      let arrowColor: string = selectedPalette.accent

                      if (buttonStyle === 'vidro_glamour' || buttonStyle === 'vidro') {
                        cardBg = 'rgba(255, 255, 255, 0.08)'
                        cardBorder = 'rgba(255, 255, 255, 0.2)'
                        cardShadow = '0 6px 16px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2)'
                        iconBg = 'rgba(255, 255, 255, 0.12)'
                        iconBorder = 'rgba(255, 255, 255, 0.25)'
                      } else if (buttonStyle === 'aurora_glow') {
                        cardBorder = selectedPalette.accent
                        cardShadow = `0 0 14px ${selectedPalette.accent}66, inset 0 0 6px ${selectedPalette.accent}20`
                        iconBg = `${selectedPalette.accent}25`
                        iconBorder = selectedPalette.accent
                      } else if (buttonStyle === 'neomorfico_dark') {
                        cardBg = 'linear-gradient(145deg, #1c1e24, #101216)'
                        cardBorder = 'rgba(255,255,255,0.06)'
                        cardShadow = '4px 4px 10px rgba(0,0,0,0.65)'
                      } else if (buttonStyle === 'shimmer_ouro') {
                        cardBorder = selectedPalette.accent
                        cardShadow = `0 6px 16px rgba(0,0,0,0.4), 0 0 8px ${selectedPalette.accent}33`
                        iconBg = `${selectedPalette.accent}22`
                        iconBorder = `${selectedPalette.accent}60`
                      } else if (buttonStyle === 'bicolor_luxo') {
                        cardBg = `linear-gradient(135deg, ${selectedPalette.card} 0%, ${selectedPalette.bg} 100%)`
                        cardBorder = `${selectedPalette.accent}55`
                      } else if (buttonStyle === 'flutuante_elevado' || buttonStyle === 'sombra') {
                        cardBorder = 'rgba(255,255,255,0.1)'
                        cardShadow = '0 12px 22px -3px rgba(0,0,0,0.8)'
                      } else if (buttonStyle === 'solido_glam' || buttonStyle === 'solido') {
                        cardBg = selectedPalette.accent
                        textColor = selectedPalette.buttonText || '#000000'
                        cardBorder = 'rgba(255,255,255,0.4)'
                        cardShadow = `0 6px 16px -2px ${selectedPalette.accent}66`
                        iconBg = 'rgba(0,0,0,0.14)'
                        iconBorder = 'rgba(0,0,0,0.2)'
                        iconColor = selectedPalette.buttonText || '#000000'
                        arrowColor = selectedPalette.buttonText || '#000000'
                      } else if (buttonStyle === 'pill_couture' || buttonStyle === 'pill') {
                        cardRadius = '9999px'
                        iconRadius = '9999px'
                      } else if (buttonStyle === 'moldura_fina' || buttonStyle === 'moldura') {
                        cardBg = 'transparent'
                        cardBorder = `${selectedPalette.accent}88`
                        cardShadow = 'none'
                        cardRadius = '10px'
                      }

                      return (
                        <div
                          key={btn.id}
                          className={`w-full py-2 px-3 text-xs font-semibold flex items-center justify-between shadow-xs transition relative overflow-hidden ${animClass}`}
                          style={{
                            background: cardBg,
                            borderColor: cardBorder,
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            borderRadius: cardRadius,
                            boxShadow: cardShadow,
                            color: textColor
                          }}
                        >
                          {/* Efeito Sweep / Shimmer */}
                          {isShimmer && (
                            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ borderRadius: cardRadius }}>
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
                              {IconComponent && <IconComponent className="w-2.5 h-2.5" />}
                            </div>
                            <span className="uppercase tracking-wider text-[9.5px] font-mono font-bold truncate" style={{ color: textColor }}>
                              {btn.label || 'WHATSAPP'}
                            </span>
                          </div>

                          <ArrowRight className="w-2.5 h-2.5 shrink-0 ml-1 relative z-10" style={{ color: arrowColor }} />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Rodapé Interno do Celular */}
                <div className="relative z-10 pt-4 text-center">
                  <div className="w-5 h-5 rounded-full border border-current opacity-30 mx-auto mb-1 flex items-center justify-center text-[8px] font-serif">
                    b
                  </div>
                  <div className="text-[8px] opacity-40 font-mono">
                    © 2026 {brandName || 'teste'} · Todos os direitos reservados
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

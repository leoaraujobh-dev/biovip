'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Share2,
  Instagram,
  Clock,
  ShieldCheck,
  CreditCard,
  Zap,
  Car,
  ChevronDown,
  ChevronUp,
  Download,
  Smartphone,
  Navigation,
  Copy,
  Check,
  Flame,
  Award,
  Users,
  Star,
  X,
  HelpCircle
} from 'lucide-react'
import { DEMO_PHOTOS, PALETTES, TYPOGRAPHIES } from '@/data/bioSiteDesign'
import { projects } from '@/data/projects'
import { getBioSite, trackLead } from '@/services/biositeService'

interface BioSiteProps {
  slug: string
  name: string
  role: string
  category: string
  whatsapp: string
  address?: string
  bio?: string
  projectImage?: string
  projectDescription?: string
}

interface PixelConfig {
  metaPixelId?: string
  tiktokPixelId?: string
  googleAnalyticsId?: string
  trackWhatsappLead?: boolean
  trackPageView?: boolean
}

export default function BioSiteClient({
  slug,
  name,
  role,
  category,
  whatsapp,
  address = 'Edifício Trade Center - Sala 918, Boa Viagem - Recife, PE',
  bio = 'Atendimento exclusivo com foco em excelência técnica, personalização e conforto absoluto.',
  projectImage,
  projectDescription
}: BioSiteProps) {
  const [pixelConfig, setPixelConfig] = useState<PixelConfig | null>(null)
  const [leadTrackedToast, setLeadTrackedToast] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)

  // Quiz / Funil Anti-Curiosos State
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})

  // Catálogo de Serviços Active Category Filter
  const [activeCatalogCategory, setActiveCatalogCategory] = useState<string>('TODOS')

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  // Galeria de Fotos Modal
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)

  // Urgency Countdown Timer (14:52)
  const [timerSeconds, setTimerSeconds] = useState(14 * 60 + 52)

  // Floating WhatsApp Notification Dismissal
  const [isFloatingWhatsappVisible, setIsFloatingWhatsappVisible] = useState(true)

  // Modo Preview / Vitrine / Iframe (Cliques Inativos e Rolagem Suave)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const inIframe =
        window.self !== window.top ||
        window.location.search.includes('preview=true') ||
        window.location.search.includes('readonly=true')

      if (inIframe) {
        setIsPreview(true)
        setIsFloatingWhatsappVisible(false)

        // Intercepta e neutraliza qualquer clique na fase de captura
        const stopClicks = (e: MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
        }
        window.addEventListener('click', stopClicks, true)

        // Estilos para desativar cliques e manter a rolagem fluida
        const style = document.createElement('style')
        style.id = 'biovip-preview-style'
        style.textContent = `
          * { -webkit-tap-highlight-color: transparent !important; }
          a, button, [role="button"], input, select, textarea {
            pointer-events: none !important;
            cursor: grab !important;
          }
          body {
            user-select: none !important;
            -webkit-user-select: none !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            cursor: grab !important;
          }
          ::-webkit-scrollbar {
            display: none !important;
          }
        `
        document.head.appendChild(style)

        return () => {
          window.removeEventListener('click', stopClicks, true)
          const el = document.getElementById('biovip-preview-style')
          if (el) el.remove()
        }
      }
    }
  }, [])

  // Carregar modelo com dados salvos no localStorage (se houver customizações)
  const [modelData, setModelData] = useState<any>(() => {
    return projects.find(p => p.slug === slug)
  })

  useEffect(() => {
    let isMounted = true
    async function loadData() {
      try {
        const savedUserSite = localStorage.getItem('biovip_site_' + slug) || (slug === 'minha-marca' ? localStorage.getItem('biovip_user_site') : null)
        if (savedUserSite) {
          const parsed = JSON.parse(savedUserSite)
          if (isMounted) {
            setModelData((prev: any) => ({
              ...(prev || {}),
              ...parsed
            }))
          }
        } else {
          const stored = localStorage.getItem('biovip_portfolio_projects')
          if (stored) {
            const parsed = JSON.parse(stored)
            const found = parsed.find((p: any) => p.slug === slug)
            if (found && isMounted) {
              setModelData(found)
            }
          }
        }

        // Tentar obter dados mais recentes sincronizados no Supabase
        const cloudData = await getBioSite(slug)
        if (cloudData && isMounted) {
          setModelData((prev: any) => ({
            ...(prev || {}),
            ...cloudData
          }))
        }
      } catch (e) {
        console.error('Erro ao carregar dados do biosite:', e)
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [slug])

  // Timer Tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 14 * 60 + 50))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTimer = useMemo(() => {
    const mins = Math.floor(timerSeconds / 60)
    const secs = timerSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [timerSeconds])

  const cleanWhatsapp = (modelData?.whatsapp || whatsapp).replace(/\D/g, '')

  // Inicialização Automática de Pixel (Meta Ads, TikTok Ads, GA4)
  useEffect(() => {
    try {
      let config: PixelConfig = {}
      const stored = localStorage.getItem('biovip_pixels')
      if (stored) {
        config = JSON.parse(stored)
      }

      // Mesclar com configurações específicas deste biosite se existirem
      if (modelData?.metaPixelId) config.metaPixelId = modelData.metaPixelId
      if (modelData?.googleAnalyticsId) config.googleAnalyticsId = modelData.googleAnalyticsId
      if (modelData?.tiktokPixelId) config.tiktokPixelId = modelData.tiktokPixelId
      if (modelData?.pixels) config = { ...config, ...modelData.pixels }

      setPixelConfig(config)

      if (typeof window !== 'undefined') {
        const w = window as any

        // 1. Meta Pixel (Facebook Ads)
        if (config.metaPixelId) {
          if (!w.fbq) {
            ;(function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
              if (f.fbq) return
              n = f.fbq = function() {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
              }
              if (!f._fbq) f._fbq = n
              n.push = n
              n.loaded = !0
              n.version = '2.0'
              n.queue = []
              t = b.createElement(e)
              t.async = !0
              t.src = v
              s = b.getElementsByTagName(e)[0]
              s.parentNode.insertBefore(t, s)
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
            w.fbq('init', config.metaPixelId)
          }

          if (config.trackPageView !== false && w.fbq) {
            w.fbq('track', 'PageView')
            w.fbq('track', 'ViewContent', {
              content_name: modelData?.name || name,
              content_category: category || role
            })
          }
        }

        // 2. Google Analytics 4 (gtag.js)
        if (config.googleAnalyticsId && !w.gtag) {
          const gaScript = document.createElement('script')
          gaScript.async = true
          gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`
          document.head.appendChild(gaScript)

          w.dataLayer = w.dataLayer || []
          w.gtag = function() {
            w.dataLayer.push(arguments)
          }
          w.gtag('js', new Date())
          w.gtag('config', config.googleAnalyticsId, {
            page_title: modelData?.name || name,
            page_path: window.location.pathname
          })
        }

        // 3. TikTok Pixel
        if (config.tiktokPixelId && !w.ttq) {
          ;(function(w: any, d: any, t: any) {
            w.TiktokAnalyticsObject = t
            var ttq = (w[t] = w[t] || [])
            ttq.methods = [
              'page',
              'track',
              'identify',
              'instances',
              'debug',
              'on',
              'off',
              'once',
              'ready',
              'alias',
              'group',
              'enableCookie',
              'disableCookie'
            ]
            ttq.setAndDefer = function(t: any, e: any) {
              t[e] = function() {
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
              }
            }
            for (var i = 0; i < ttq.methods.length; i++) {
              ttq.setAndDefer(ttq, ttq.methods[i])
            }
            ttq.load = function(e: any, n: any) {
              var r = 'https://analytics.tiktok.com/i18n/pixel/events.js'
              ttq._i = ttq._i || {}
              ttq._i[e] = []
              ttq._i[e]._u = r
              ttq._t = ttq._t || {}
              ttq._t[e] = +new Date()
              ttq._o = ttq._o || {}
              ttq._o[e] = n || {}
              var o = document.createElement('script')
              o.type = 'text/javascript'
              o.async = !0
              o.src = r + '?sdkid=' + e + '&lib=' + t
              var a = document.getElementsByTagName('script')[0]
              a.parentNode?.insertBefore(o, a)
            }
            ttq.load(config.tiktokPixelId)
            ttq.page()
          })(window, document, 'ttq')
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [name, category, role, modelData])

  const handleTrackLead = (buttonLabel: string) => {
    if (typeof window !== 'undefined') {
      const w = window as any
      // Meta Pixel
      if (w.fbq && pixelConfig?.trackWhatsappLead !== false) {
        w.fbq('track', 'Lead', {
          content_name: buttonLabel,
          content_category: role,
          value: 0.0,
          currency: 'BRL'
        })
      }
      // Google Analytics 4
      if (w.gtag) {
        w.gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: buttonLabel,
          value: 1
        })
      }
      // TikTok Pixel
      if (w.ttq) {
        w.ttq.track('Contact', {
          content_name: buttonLabel
        })
      }
    }

    // Persistir lead no Supabase + localStorage
    trackLead({
      slug,
      client_name: 'Visitante BioVip',
      whatsapp: cleanWhatsapp,
      action_type: buttonLabel.toLowerCase().includes('triagem') ? 'quiz_completed' : 'whatsapp_click',
      details: {
        buttonLabel,
        category,
        role: modelData?.role || role,
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        timestamp: new Date().toISOString()
      }
    }).catch(err => console.warn('Erro ao salvar lead:', err))

    setLeadTrackedToast(buttonLabel)
    setTimeout(() => setLeadTrackedToast(null), 3000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: modelData?.name || name,
        text: `Conheça o Bio Site oficial de ${modelData?.name || name}`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  // Download do arquivo vCard (.vcf) direto para a agenda do celular
  const handleSaveContactVcf = () => {
    const effName = modelData?.name || name
    const effPhone = cleanWhatsapp || '5581985087520'
    const effAddress = modelData?.locationInfo?.address || address

    const vcfData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${effName}`,
      `ORG:${effName}`,
      `TITLE:${modelData?.role || role}`,
      `TEL;TYPE=CELL,VOICE:+${effPhone}`,
      `ADR;TYPE=WORK:;;${effAddress};;;;`,
      `URL:${window.location.href}`,
      'NOTE:Contato oficial salvo via BioVip',
      'END:VCARD'
    ].join('\n')

    const blob = new Blob([vcfData], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${effName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.vcf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    handleTrackLead('Salvar Contato Agenda (VCF)')
  }

  const effectiveName = modelData?.name || name
  const effectiveRole = modelData?.role || role
  const effectivePhoto = modelData?.photo || DEMO_PHOTOS.mulher
  const registrationCode = modelData?.registrationCode || (slug === 'ana-freire' ? 'CRO-PE 22.675' : 'REGISTRO OFICIAL')
  const palette = PALETTES.find(p => p.id === (modelData?.paletteId || 'luxo_nude')) || PALETTES[0]
  const typography = TYPOGRAPHIES.find(t => t.id === (modelData?.typographyId || 'instrument')) || TYPOGRAPHIES[0]
  const buttonStyle = modelData?.buttonStyle || 'cartao_nobre'
  const buttonAnimation = modelData?.buttonAnimation || 'none'
  const monogram = modelData?.monogram || effectiveName.split(' ').map((n: string) => n[0]).slice(0, 2).join('')

  // 1. Verificação de Modo Manutenção (Inadimplência D+7 / Suspensão)
  if (modelData?.isMaintenanceMode) {
    return (
      <div
        className="min-h-screen text-stone-200 flex flex-col items-center justify-center p-4 font-sans selection:bg-amber-500/20"
        style={{ backgroundColor: palette.bg }}
      >
        <div className="max-w-md w-full bg-[#14161d] border border-stone-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto text-2xl font-serif">
            {monogram}
          </div>
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-stone-800/80 text-stone-400 text-[10px] font-mono tracking-widest uppercase border border-stone-700">
              Manutenção Programada
            </span>
            <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
              {effectiveName}
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-sans">
              Estamos realizando melhorias programadas em nossa plataforma digital para melhor atendê-lo. Nosso canal direto continua disponível.
            </p>
          </div>
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Olá! Gostaria de falar com ${effectiveName}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition"
          >
            <MessageCircle className="w-4 h-4" />
            Atendimento Direto no WhatsApp
          </a>
        </div>
      </div>
    )
  }

  // Botões Padrão de Ação
  const defaultButtons = [
    {
      id: 'btn-1',
      label: 'AGENDAMENTO VIP',
      subtitle: 'Atendimento presencial ou digital com prioridade absoluta.',
      icon: 'calendar',
      url: `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Olá! Gostaria de agendar uma consulta com ${effectiveName}.`)}`,
      isHighlighted: true,
      highlightBadge: '⭐ MAIS PROCURADO'
    },
    {
      id: 'btn-2',
      label: 'CATÁLOGO DE SERVIÇOS',
      subtitle: 'Conheça todos os procedimentos e protocolos exclusivos.',
      icon: 'sparkles',
      url: '#catalogo'
    },
    {
      id: 'btn-3',
      label: 'COMO CHEGAR · LOCALIZAÇÃO',
      subtitle: modelData?.locationInfo?.address || address,
      icon: 'map',
      url: `https://maps.google.com/?q=${encodeURIComponent(modelData?.locationInfo?.address || address)}`
    }
  ]

  const buttonsToRender = modelData?.buttons && modelData.buttons.length > 0
    ? modelData.buttons
    : defaultButtons

  // Módulos
  const announcement = modelData?.announcement || {
    enabled: true,
    badge: 'AGENDA VIP ABERTA',
    text: 'Últimos horários disponíveis para esta semana.'
  }

  const urgency = modelData?.urgency || {
    enabled: true,
    headline: '🔥 CONDIÇÃO ESPECIAL DE HOJE',
    subtitle: 'Garanta sua vaga com atendimento prioritário antes que expire:',
    minutes: 15
  }

  const quiz = modelData?.qualifierQuiz || {
    enabled: true,
    buttonLabel: '✨ Descobrir Tratamento Ideal (Triagem VIP)',
    headline: 'Atendimento Personalizado',
    subtitle: 'Responda 3 perguntas rápidas para agilizar seu atendimento no WhatsApp:',
    questions: [
      {
        id: 'q-1',
        question: 'Qual procedimento você tem mais interesse?',
        options: ['Procedimento Principal', 'Avaliação VIP', 'Manutenção Periódica', 'Tirar dúvidas de valores']
      },
      {
        id: 'q-2',
        question: 'Qual o melhor período para o seu horário?',
        options: ['Manhã (08h às 12h)', 'Tarde (13h às 18h)', 'Final do dia / Sábado', 'Qualquer horário disponível']
      },
      {
        id: 'q-3',
        question: 'Qual o seu objetivo principal hoje?',
        options: ['Primeira consulta', 'Acompanhamento', 'Ocasião especial', 'Urgência']
      }
    ]
  }

  const metrics = modelData?.metricsList || [
    { value: '+1.000', label: 'CLIENTES ATENDIDOS' },
    { value: '8 anos', label: 'DE EXPERIÊNCIA' },
    { value: '5.0★', label: 'AVALIAÇÃO NO GOOGLE' }
  ]

  const howItWorks = modelData?.howItWorksSteps || [
    { number: '01', title: 'Primeiro Contato & Triagem', description: 'Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade.' },
    { number: '02', title: 'Avaliação Estratégica', description: 'Diagnóstico detalhado do seu objetivo com plano de ação sob medida.' },
    { number: '03', title: 'Execução & Acompanhamento', description: 'Atendimento de alta excelência e suporte contínuo em todas as etapas.' }
  ]

  const servicesCatalog = modelData?.servicesCatalog || {
    enabled: true,
    headline: 'Procedimentos & Soluções Exclusivas',
    subtitle: 'Soluções personalizadas baseadas no mais alto padrão de entrega',
    categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
    items: [
      {
        id: 'srv-1',
        category: 'MAIS PROCURADO',
        name: 'Protocolo Principal de Alto Padrão',
        description: 'Técnica personalizada com diagnóstico detalhado e resultado impecável.',
        price: 'Sob Consulta',
        duration: '⏱ 1h30',
        badge: 'MAIS PROCURADO',
        featured: true,
        whatsappMessage: `Olá! Gostaria de agendar o Protocolo Principal com ${effectiveName}.`
      },
      {
        id: 'srv-2',
        category: 'EXCLUSIVO',
        name: 'Consultoria & Acompanhamento VIP',
        description: 'Atendimento sob medida com hora marcada e foco total nos seus objetivos.',
        price: 'Sob Consulta',
        duration: '⏱ 2h00',
        badge: 'EXCLUSIVO',
        featured: true,
        whatsappMessage: `Olá! Gostaria de saber mais sobre a Consultoria VIP com ${effectiveName}.`
      }
    ]
  }

  const locationInfo = modelData?.locationInfo || {
    enabled: true,
    address: address,
    hours: 'Seg a Sáb · 08:30 às 19:30',
    openStatus: 'Aberto Agora · Hora Marcada',
    mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(address)}`
  }

  const testimonials = modelData?.testimonialsList || [
    {
      clientName: 'Juliana Mendes',
      city: 'São Paulo - SP',
      text: 'Atendimento impecável! O ambiente é lindo, super higienizado e o resultado superou todas as expectativas. Recomendo de olhos fechados!',
      rating: 5
    },
    {
      clientName: 'Carlos Eduardo Silveira',
      city: 'Belo Horizonte - MG',
      text: 'Profissionalismo de altíssimo nível. Pontualidade britânica, produtos de primeira linha e muita atenção a cada detalhe.',
      rating: 5
    }
  ]

  const aboutMe = modelData?.aboutMeSection || {
    enabled: true,
    headline: `Sobre ${effectiveName}`,
    paragraph: 'Com vasta trajetória no segmento de alto padrão, nosso propósito é entregar resultados de autoridade com ética, pontualidade e sofisticação em cada atendimento.',
    closingPhrase: 'Excelência e cuidado em cada detalhe.'
  }

  const faq = modelData?.faqList || [
    {
      question: 'Como funciona o agendamento de horários?',
      answer: 'Basta escolher o procedimento no catálogo ou clicar no botão de WhatsApp para falar diretamente com nossa equipe executiva.'
    },
    {
      question: 'Onde o espaço está localizado?',
      answer: 'Estamos localizados em ponto nobre, com estacionamento privativo e ambiente climatizado.'
    },
    {
      question: 'Quais são as formas de pagamento aceitas?',
      answer: 'Aceitamos Pix com confirmação imediata e cartões de crédito em até 12 parcelas.'
    }
  ]

  // Enviar Triagem Quiz para o WhatsApp
  const handleFinishQuiz = () => {
    const lines = [
      `Olá! Fiz a Triagem VIP no BioSite de ${effectiveName}:`,
      ...quiz.questions.map((q: any, i: number) => `• *${q.question}*: ${quizAnswers[i] || 'Não informado'}`),
      `Gostaria de verificar a disponibilidade de horário!`
    ]
    const text = encodeURIComponent(lines.join('\n'))
    setIsQuizOpen(false)
    handleTrackLead('Triagem Anti-Curiosos Concluída')
    window.open(`https://wa.me/${cleanWhatsapp}?text=${text}`, '_blank')
  }

  return (
    <div
      className={`min-h-screen text-stone-200 flex flex-col items-center justify-center font-sans selection:bg-amber-500/20 ${
        isPreview ? 'p-0 w-full' : 'p-0 sm:p-6'
      }`}
      style={{ backgroundColor: palette.bg }}
    >
      <div
        className={`relative w-full max-w-[420px] shadow-2xl overflow-hidden flex flex-col ${
          isPreview
            ? 'border-0 rounded-none shadow-none min-h-screen'
            : 'border sm:border-stone-800/80 sm:rounded-[48px]'
        }`}
        style={{
          backgroundColor: palette.bg,
          color: palette.text
        }}
      >
        {/* 1. Barra de Alerta Superior (Announcement) */}
        {announcement?.enabled && (
          <div
            className="py-2 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2 border-b cursor-pointer transition relative z-30"
            style={{
              backgroundColor: `${palette.accent}18`,
              borderColor: `${palette.accent}33`,
              color: palette.text
            }}
            onClick={() => {
              const el = document.getElementById('catalogo') || document.getElementById('botoes')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider animate-pulse border"
              style={{
                backgroundColor: palette.accent,
                color: palette.buttonText || '#000',
                borderColor: 'rgba(255,255,255,0.4)'
              }}
            >
              ● {announcement.badge}
            </span>
            <span className="text-[11px] truncate">{announcement.text}</span>
          </div>
        )}

        {/* 2. Topo / Ilha Dinâmica & Registro Oficial */}
        <div className="relative z-20 pt-3 px-6 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
          <div className="w-16 h-4 bg-black rounded-full" />
          <span className="font-semibold text-stone-400">{registrationCode}</span>
        </div>

        {/* 3. Retrato de Estúdio com Dissolução Orgânica */}
        <div className="relative w-full h-[375px] sm:h-[420px] overflow-hidden -mt-7 select-none shrink-0">
          <img
            src={effectivePhoto}
            alt={effectiveName}
            className="w-full h-full object-cover object-top"
          />
          {/* Fusão Orgânica nos 40% Inferiores */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 35%, ${palette.bg}cc 75%, ${palette.bg} 98%)`
            }}
          />

          {/* Nome e Tipografia Editorial sobreposta à dissolução */}
          <div className="absolute bottom-2 left-0 right-0 px-6 text-center">
            <span
              className="inline-block text-[9px] font-mono tracking-[0.25em] uppercase font-bold px-3 py-1 rounded-full mb-1 border"
              style={{
                backgroundColor: `${palette.card}cc`,
                color: palette.accent,
                borderColor: `${palette.accent}33`
              }}
            >
              {category.toUpperCase()}
            </span>
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
              style={{
                fontFamily: typography.cssFont,
                color: palette.text
              }}
            >
              {effectiveName}
            </h1>
            <p
              className="text-[10px] font-mono tracking-[0.18em] uppercase mt-1 opacity-80"
              style={{ color: palette.accent }}
            >
              {effectiveRole}
            </p>
          </div>
        </div>

        {/* 4. Quick Action Bar (WhatsApp, Instagram, Agenda) */}
        <div className="px-5 pt-3 pb-2 flex items-center justify-center gap-2">
          <a
            href={`https://wa.me/${cleanWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleTrackLead('Barra Rápida WhatsApp')}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition cursor-pointer"
            style={{
              backgroundColor: `${palette.card}cc`,
              borderColor: `${palette.accent}33`,
              color: palette.text
            }}
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition cursor-pointer"
            style={{
              backgroundColor: `${palette.card}cc`,
              borderColor: `${palette.accent}33`,
              color: palette.text
            }}
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>Instagram</span>
          </a>
          <button
            type="button"
            onClick={() => setIsQuizOpen(true)}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition cursor-pointer"
            style={{
              backgroundColor: palette.accent,
              borderColor: 'rgba(255,255,255,0.4)',
              color: palette.buttonText || '#000'
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar</span>
          </button>
        </div>

        {/* 5. Gatilho de Escassez & Urgência com Cronômetro Dinâmico */}
        {urgency?.enabled && (
          <div className="px-5 pt-2 pb-2">
            <div
              className="p-3 rounded-2xl border flex items-center justify-between text-xs"
              style={{
                backgroundColor: `${palette.card}ee`,
                borderColor: `${palette.accent}40`
              }}
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
                <div>
                  <div className="text-[10px] font-bold text-amber-300 font-mono tracking-wider">
                    {urgency.headline}
                  </div>
                  <div className="text-[9px] text-stone-400 line-clamp-1">
                    {urgency.subtitle}
                  </div>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-amber-500/30 text-amber-300 font-mono font-bold text-[11px] whitespace-nowrap shadow-inner">
                {formattedTimer}
              </div>
            </div>
          </div>
        )}

        {/* 6. Frase de Fechamento / Assinatura Cursiva */}
        <div className="px-6 py-2 text-center text-xs italic opacity-75 font-serif">
          "{bio}"
        </div>

        {/* 7. Botões Nobres de Ação */}
        <div id="botoes" className="px-5 pt-2 pb-4 space-y-2.5 relative z-10 flex flex-col justify-start">
          {/* Subpáginas do Plano Pro */}
          {modelData?.subpages && modelData.subpages.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 pb-1 flex-wrap">
              {modelData.subpages.map((sp: any) => (
                <Link
                  key={sp.slug}
                  href={`/${slug}/${sp.slug}`}
                  className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition flex items-center gap-1 active:scale-95 shadow-sm"
                  style={{ color: palette.accent }}
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  {sp.title.split(' ')[0]}
                </Link>
              ))}
            </div>
          )}

          {buttonsToRender.map((btn: any) => {
            const isHigh = !!btn.isHighlighted
            const animClass = buttonAnimation === 'pulse' || (isHigh && buttonAnimation === 'none')
              ? 'btn-anim-pulse'
              : buttonAnimation === 'bounce'
              ? 'btn-anim-bounce'
              : buttonAnimation === 'glow' || isHigh
              ? 'btn-anim-glow'
              : ''

            const isShimmer = buttonAnimation === 'shimmer' || buttonStyle === 'shimmer_ouro' || isHigh

            let cardBg: string = palette.card || '#14161c'
            let cardBorder: string = isHigh ? palette.accent : `${palette.accent}33`
            let cardRadius: string = '16px'
            let cardShadow: string = '0 10px 25px -5px rgba(0,0,0,0.5)'
            let textColor: string = palette.text
            let iconBg: string = `${palette.accent}18`
            let iconBorder: string = `${palette.accent}40`
            let iconColor: string = palette.accent
            let arrowColor: string = palette.accent

            if (buttonStyle === 'vidro_glamour' || buttonStyle === 'vidro') {
              cardBg = 'rgba(255, 255, 255, 0.08)'
              cardBorder = 'rgba(255, 255, 255, 0.22)'
              cardShadow = '0 12px 32px 0 rgba(0,0,0,0.4), inset 0 1px 1px 0 rgba(255,255,255,0.25)'
            } else if (buttonStyle === 'solido_glam' || buttonStyle === 'solido') {
              cardBg = palette.accent
              textColor = palette.buttonText || '#000000'
              cardBorder = 'rgba(255,255,255,0.45)'
              iconBg = 'rgba(0,0,0,0.14)'
              iconBorder = 'rgba(0,0,0,0.22)'
              iconColor = palette.buttonText || '#000000'
              arrowColor = palette.buttonText || '#000000'
            }

            return (
              <a
                key={btn.id}
                href={btn.url}
                target={btn.url.startsWith('#') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                onClick={() => handleTrackLead(btn.label)}
                className={`group p-4 transition-all duration-300 flex items-center justify-between cursor-pointer active:scale-[0.98] relative overflow-hidden ${animClass}`}
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

                {isHigh && (
                  <div
                    className="absolute -top-1.5 right-4 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase shadow-lg flex items-center gap-1 z-10 border"
                    style={{
                      backgroundColor: palette.accent,
                      color: palette.buttonText || '#000',
                      borderColor: 'rgba(255,255,255,0.4)'
                    }}
                  >
                    {btn.highlightBadge || '⭐ MAIS ESCOLHIDO'}
                  </div>
                )}

                <div className="flex items-center gap-3.5 relative z-10 overflow-hidden">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0 border rounded-xl"
                    style={{
                      backgroundColor: iconBg,
                      borderColor: iconBorder,
                      color: iconColor
                    }}
                  >
                    {btn.icon === 'calendar' ? (
                      <Calendar className="w-4 h-4" />
                    ) : btn.icon === 'map' ? (
                      <MapPin className="w-4 h-4" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-left overflow-hidden">
                    <div className="text-[11px] font-bold uppercase tracking-wider font-mono truncate">
                      {btn.label}
                    </div>
                    <div className="text-[10px] mt-0.5 line-clamp-1 font-sans opacity-70">
                      {btn.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-all shrink-0 ml-2 relative z-10"
                  style={{ color: arrowColor }}
                />
              </a>
            )
          })}
        </div>

        {/* 8. Botão Chamativo de Triagem Anti-Curiosos (Quiz VIP) */}
        {quiz?.enabled && (
          <div className="px-5 py-2">
            <button
              type="button"
              onClick={() => setIsQuizOpen(true)}
              className="w-full py-3.5 px-4 rounded-2xl border flex items-center justify-between text-xs font-bold transition shadow-lg relative overflow-hidden group cursor-pointer active:scale-98"
              style={{
                backgroundColor: `${palette.card}ff`,
                borderColor: palette.accent,
                color: palette.text
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center border"
                  style={{
                    backgroundColor: `${palette.accent}20`,
                    borderColor: `${palette.accent}40`,
                    color: palette.accent
                  }}
                >
                  <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <span className="text-[11px] tracking-wide font-mono uppercase">
                  {quiz.buttonLabel}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{ color: palette.accent }} />
            </button>
          </div>
        )}

        {/* 9. Métricas & Prova Social */}
        {metrics && metrics.length > 0 && (
          <div className="px-5 py-3">
            <div
              className="p-4 rounded-2xl border grid grid-cols-3 gap-2 text-center"
              style={{
                backgroundColor: `${palette.card}99`,
                borderColor: `${palette.accent}20`
              }}
            >
              {metrics.map((m: any, idx: number) => (
                <div key={idx} className="space-y-0.5">
                  <div
                    className="font-serif text-lg sm:text-xl font-bold tracking-tight"
                    style={{ color: palette.accent }}
                  >
                    {m.value}
                  </div>
                  <div className="text-[8px] font-mono uppercase tracking-wider opacity-70">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. Como Funciona (Jornada em 3 Passos) */}
        {howItWorks && howItWorks.length > 0 && (
          <div className="px-5 py-3 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.accent }} />
              <h3 className="text-[11px] font-mono uppercase tracking-widest font-bold opacity-80">
                Como Funciona o Atendimento
              </h3>
            </div>
            <div className="space-y-2">
              {howItWorks.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border flex items-start gap-3"
                  style={{
                    backgroundColor: `${palette.card}80`,
                    borderColor: `${palette.accent}20`
                  }}
                >
                  <span
                    className="font-serif text-base font-bold opacity-50 shrink-0"
                    style={{ color: palette.accent }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <div className="text-[11px] font-bold text-white mb-0.5">
                      {step.title}
                    </div>
                    <div className="text-[10px] text-stone-400 leading-relaxed font-sans">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 11. Catálogo de Serviços Interativo */}
        {servicesCatalog?.enabled && servicesCatalog.items && servicesCatalog.items.length > 0 && (
          <div id="catalogo" className="px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-[9px] font-mono uppercase tracking-widest font-bold"
                  style={{ color: palette.accent }}
                >
                  CATÁLOGO VIP
                </span>
                <h3 className="text-base font-serif font-bold text-white">
                  {servicesCatalog.headline}
                </h3>
              </div>
            </div>

            {/* Abas de Categorias */}
            {servicesCatalog.categories && servicesCatalog.categories.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {servicesCatalog.categories.map((cat: string) => {
                  const isActive = activeCatalogCategory === cat
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCatalogCategory(cat)}
                      className={`px-3 py-1 rounded-xl text-[10px] font-mono tracking-wider uppercase font-semibold transition cursor-pointer whitespace-nowrap border ${
                        isActive
                          ? 'border-transparent text-stone-950 font-bold'
                          : 'border-white/10 text-stone-400 hover:text-white bg-white/5'
                      }`}
                      style={{
                        backgroundColor: isActive ? palette.accent : undefined
                      }}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Lista de Itens do Catálogo */}
            <div className="space-y-2.5">
              {servicesCatalog.items
                .filter((item: any) => activeCatalogCategory === 'TODOS' || item.category === activeCatalogCategory)
                .map((srv: any) => (
                  <div
                    key={srv.id}
                    className="p-3.5 rounded-2xl border space-y-2 transition hover:border-white/30"
                    style={{
                      backgroundColor: `${palette.card}cc`,
                      borderColor: `${palette.accent}25`
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {srv.badge && (
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase mb-1 border"
                            style={{
                              backgroundColor: `${palette.accent}20`,
                              borderColor: `${palette.accent}40`,
                              color: palette.accent
                            }}
                          >
                            {srv.badge}
                          </span>
                        )}
                        <h4 className="text-xs font-bold text-white leading-tight">
                          {srv.name}
                        </h4>
                      </div>
                      {srv.duration && (
                        <span className="text-[9px] font-mono text-stone-400 flex items-center gap-1 shrink-0">
                          {srv.duration}
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] text-stone-400 font-sans leading-relaxed line-clamp-2">
                      {srv.description}
                    </p>

                    <div className="pt-1 flex items-center justify-between border-t border-white/5">
                      <span className="text-xs font-serif font-bold" style={{ color: palette.accent }}>
                        {srv.price}
                      </span>
                      <a
                        href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                          srv.whatsappMessage || `Olá! Gostaria de agendar o procedimento de ${srv.name}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleTrackLead(`Agendar Catálogo (${srv.name})`)}
                        className="py-1 px-3 rounded-lg text-[10px] font-bold font-mono tracking-wider uppercase transition flex items-center gap-1 shadow-sm active:scale-95"
                        style={{
                          backgroundColor: palette.accent,
                          color: palette.buttonText || '#000'
                        }}
                      >
                        <span>Reservar</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
            </div>

            {/* Tarja de 4 Diferenciais */}
            <div
              className="p-3 rounded-xl border grid grid-cols-2 gap-2 text-[10px]"
              style={{
                backgroundColor: `${palette.card}66`,
                borderColor: `${palette.accent}20`
              }}
            >
              <div className="flex items-center gap-1.5 text-stone-300">
                <CreditCard className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Cartão até 12x</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <Zap className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Pix Instantâneo</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <Car className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span>Fácil Acesso</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <span>Espaço VIP & Café</span>
              </div>
            </div>
          </div>
        )}

        {/* 12. Galeria de Fotos / Portfólio (Smart Masonry) */}
        {modelData?.galleryPhotosList && modelData.galleryPhotosList.length > 0 && (
          <div className="px-5 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold opacity-80">
                PORTFÓLIO & ESTRUTURA VIP
              </span>
              <span className="text-[9px] font-mono text-stone-400">
                {modelData.galleryPhotosList.length} registros
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {modelData.galleryPhotosList.slice(0, 6).map((imgUrl: string, i: number) => (
                <div
                  key={i}
                  onClick={() => setPreviewPhoto(imgUrl)}
                  className="aspect-square rounded-xl overflow-hidden border border-white/10 relative cursor-pointer group"
                >
                  <img
                    src={imgUrl}
                    alt={`Portfólio ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 13. Localização & GPS com "Aberto Agora" */}
        {locationInfo?.enabled && (
          <div className="px-5 py-3 space-y-2">
            <div
              className="p-4 rounded-2xl border space-y-3"
              style={{
                backgroundColor: `${palette.card}cc`,
                borderColor: `${palette.accent}25`
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest font-bold opacity-75">
                  NOSSA LOCALIZAÇÃO
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {locationInfo.openStatus || 'Aberto Agora'}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-white flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{locationInfo.address}</span>
                </div>
                <div className="text-[10px] text-stone-400 font-mono pl-5">
                  {locationInfo.hours}
                </div>
              </div>

              {/* Botões de Ação de Rota: Maps, Waze, Uber, Copiar */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                <a
                  href={locationInfo.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(locationInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-[10px] font-mono font-bold flex flex-col items-center justify-center gap-1 transition"
                >
                  <Navigation className="w-3 h-3 text-sky-400" />
                  <span>Maps</span>
                </a>
                <a
                  href={`https://waze.com/ul?q=${encodeURIComponent(locationInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-[10px] font-mono font-bold flex flex-col items-center justify-center gap-1 transition"
                >
                  <Navigation className="w-3 h-3 text-cyan-400" />
                  <span>Waze</span>
                </a>
                <a
                  href={`https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${encodeURIComponent(locationInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-[10px] font-mono font-bold flex flex-col items-center justify-center gap-1 transition"
                >
                  <Car className="w-3 h-3 text-white" />
                  <span>Uber</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(locationInfo.address)
                    setCopiedAddress(true)
                    setTimeout(() => setCopiedAddress(false), 2000)
                  }}
                  className="py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-[10px] font-mono font-bold flex flex-col items-center justify-center gap-1 transition cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                  <span>{copiedAddress ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 14. Depoimentos de Clientes (Google Meu Negócio) */}
        {testimonials && testimonials.length > 0 && (
          <div className="px-5 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold opacity-80">
                AVALIAÇÕES NO GOOGLE
              </span>
              <span className="text-[9px] font-mono text-amber-400 font-bold flex items-center gap-1">
                <span>5.0</span>
                <span>★★★★★</span>
              </span>
            </div>
            <div className="space-y-2">
              {testimonials.map((t: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border space-y-1.5"
                  style={{
                    backgroundColor: `${palette.card}80`,
                    borderColor: `${palette.accent}20`
                  }}
                >
                  <div className="flex items-center justify-between text-amber-400 text-xs">
                    <span>★★★★★</span>
                    <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      ✓ Verificado
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 font-sans italic leading-relaxed">
                    "{t.text}"
                  </p>
                  <div className="text-[9px] font-mono text-stone-400">
                    {t.clientName || t.name} · {t.city || t.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 15. Sobre a Especialista & Nosso Espaço */}
        {aboutMe?.enabled && (
          <div className="px-5 py-3 space-y-2">
            <div
              className="p-4 rounded-2xl border space-y-2"
              style={{
                backgroundColor: `${palette.card}80`,
                borderColor: `${palette.accent}20`
              }}
            >
              <h4 className="text-xs font-serif font-bold text-white">
                {aboutMe.headline}
              </h4>
              <p className="text-[10.5px] text-stone-300 font-sans leading-relaxed">
                {aboutMe.paragraph || aboutMe.bio}
              </p>
              {(aboutMe.closingPhrase || aboutMe.quote) && (
                <div className="text-[10px] italic font-serif pt-1" style={{ color: palette.accent }}>
                  "{aboutMe.closingPhrase || aboutMe.quote}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* 16. Dúvidas Frequentes (FAQ Sanfonado) */}
        {faq && faq.length > 0 && (
          <div className="px-5 py-3 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold opacity-80 block mb-1">
              DÚVIDAS FREQUENTES
            </span>
            <div className="space-y-1.5">
              {faq.map((item: any, i: number) => {
                const isOpen = openFaqIndex === i
                return (
                  <div
                    key={i}
                    className="rounded-xl border overflow-hidden transition"
                    style={{
                      backgroundColor: `${palette.card}80`,
                      borderColor: `${palette.accent}20`
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="w-full p-3 text-left flex items-center justify-between text-xs font-semibold text-stone-200 hover:text-white transition cursor-pointer"
                    >
                      <span className="pr-2">{item.question}</span>
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 pt-0 text-[10px] text-stone-400 font-sans leading-relaxed border-t border-white/5">
                        {item.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 17. Ações Mobile de Rodapé: Salvar Contato (.vcf) e Atalho */}
        <div className="px-5 pt-3 pb-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleSaveContactVcf}
              className="py-2.5 px-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95 shadow-sm"
            >
              <Download className="w-3 h-3 text-amber-400" />
              <span>Salvar Contato</span>
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="py-2.5 px-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95 shadow-sm"
            >
              <Share2 className="w-3 h-3 text-sky-400" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>

        {/* 18. Assinatura e Monograma de Rodapé */}
        <div className="pt-2 pb-6 text-center flex flex-col items-center">
          <div
            className="w-16 h-px mb-2 opacity-40"
            style={{ backgroundColor: palette.accent }}
          />
          <span
            className="font-serif italic text-xl tracking-wider select-none"
            style={{ color: palette.accent }}
          >
            {monogram}
          </span>
          <div className="text-[9px] font-mono text-stone-500 mt-2">
            © {new Date().getFullYear()} {effectiveName}. Todos os direitos reservados.
          </div>
          <Link
            href="/"
            className="text-[8px] font-mono text-stone-500 hover:text-amber-400 transition mt-1"
          >
            ✨ Desenvolvido com padrão BioVip
          </Link>
        </div>

        {/* Barra Flutuante de Compartilhamento no Topo */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={handleShare}
            title="Compartilhar Bio Site"
            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {copiedLink && (
          <div className="absolute top-14 right-4 z-30 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white animate-fade-in">
            Link copiado!
          </div>
        )}

        {/* 19. Widget Flutuante de WhatsApp (Pills no Rodapé) */}
        {!isPreview && isFloatingWhatsappVisible && (
          <div
            className="fixed right-4 z-40 max-w-[280px] animate-slide-up flex flex-col items-end gap-1.5"
            style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
          >
            <div className="bg-[#14161f] border border-stone-800 rounded-2xl p-2.5 shadow-2xl flex items-center gap-2 relative text-left">
              <button
                type="button"
                onClick={() => setIsFloatingWhatsappVisible(false)}
                className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center text-[10px] hover:text-white"
              >
                ×
              </button>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <div className="text-[10px] text-stone-300 font-sans leading-tight">
                <span className="font-bold text-white block">Online agora</span>
                Dúvidas? Fale com nossa equipe
              </div>
            </div>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Olá! Estou visitando o site de ${effectiveName} e gostaria de mais informações.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleTrackLead('Widget Flutuante WhatsApp')}
              className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition relative cursor-pointer"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center font-mono border-2 border-white">
                1
              </span>
            </a>
          </div>
        )}

        {/* Modal de Triagem Anti-Curiosos (Quiz VIP) */}
        {isQuizOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#14161f] border border-stone-800 rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl relative">
              <button
                onClick={() => setIsQuizOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 text-center">
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border"
                  style={{
                    backgroundColor: `${palette.accent}20`,
                    borderColor: `${palette.accent}40`,
                    color: palette.accent
                  }}
                >
                  Passo {quizStep + 1} de {quiz.questions.length}
                </span>
                <h3 className="font-serif text-lg font-bold text-white">
                  {quiz.headline}
                </h3>
                <p className="text-[11px] text-stone-400 font-sans">
                  {quiz.subtitle}
                </p>
              </div>

              {/* Pergunta Atual */}
              <div className="space-y-3 pt-1">
                <p className="text-xs font-bold text-white">
                  {quiz.questions[quizStep]?.question}
                </p>
                <div className="space-y-2">
                  {quiz.questions[quizStep]?.options.map((opt: string, idx: number) => {
                    const isSelected = quizAnswers[quizStep] === opt
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setQuizAnswers({ ...quizAnswers, [quizStep]: opt })}
                        className={`w-full p-2.5 rounded-xl border text-xs text-left transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-amber-400 bg-amber-500/20 text-white font-semibold'
                            : 'border-stone-800 bg-[#0d0f14] text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Botões do Quiz */}
              <div className="flex items-center gap-2 pt-2">
                {quizStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setQuizStep(prev => prev - 1)}
                    className="py-2.5 px-4 rounded-xl border border-stone-800 text-stone-400 hover:text-white text-xs font-semibold"
                  >
                    Voltar
                  </button>
                )}
                {quizStep < quiz.questions.length - 1 ? (
                  <button
                    type="button"
                    disabled={!quizAnswers[quizStep]}
                    onClick={() => setQuizStep(prev => prev + 1)}
                    className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                    style={{
                      backgroundColor: palette.accent,
                      color: palette.buttonText || '#000'
                    }}
                  >
                    Próximo →
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!quizAnswers[quizStep]}
                    onClick={handleFinishQuiz}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-stone-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 disabled:opacity-40"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Concluir no WhatsApp</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal de Zoom de Foto do Portfólio */}
        {previewPhoto && (
          <div
            onClick={() => setPreviewPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-sm w-full aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <img src={previewPhoto} alt="Visualização" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Notificação Visual de Disparo de Pixel */}
        {leadTrackedToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-500 text-stone-950 font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>Lead registrado no Pixel ({leadTrackedToast})</span>
          </div>
        )}
      </div>
    </div>
  )
}

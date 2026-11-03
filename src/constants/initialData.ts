import { SavedMicrosite, TrustBadgeItem } from '../types/microsite';

export const INITIAL_DATA = {
  theme: 'navyLaw',
  customColors: {
    enabled: false,
    bg: '#0f172a',
    textMain: '#ffffff',
    textMuted: '#94a3b8',
    accent: '#e2b857',
    cardBg: '#ffffff',
    cardText: '#0f172a',
    cardBorder: '#e2b857',
    socialBg: '#1e293b',
    glowColor: '#e2b857'
  },
  moduleColors: {} as Record<
    string,
    {
      headlineColor?: string;
      titleColor?: string;
      textColor?: string;
      accentColor?: string;
      bgColor?: string;
    }
  >,
  styling: {
    fontFamily: 'Cinzel',
    borderRadius: 20,
    glassmorphism: true,
    metallicBorders: true,
    spotlightGlow: true,
    photoHeight: 390,
    photoScale: 100,
    photoPosY: 25,
    photoPosX: 50,
    vignetteIntensity: 85,
    photoFilter: 'none',
    wrapperAlignment: 'flex-start',
  },
  announcement: {
    enabled: true,
    badge: 'CONSULTORIA VIP',
    text: 'Agenda de consultorias e atendimentos aberta.',
    link: '#agendar'
  },
  profile: {
    name: 'DRA. MARINA ALMEIDA',
    title: 'ADVOCACIA ESTRATÉGICA',
    tagline: 'Defesa de direitos com atendimento personalizado e humanizado.',
    cursivePhrase: 'Compromisso, ética e segurança para você.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900',
    aboutPhotoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700',
    whatsapp: '5511999999999',
    instagram: 'dramarinaalmeida',
    location: 'Av. Paulista, 1200 - Bela Vista, São Paulo - SP',
    mapsUrl: 'https://maps.google.com',
    bio: '',
    editorialSignature: '',
  },
  metrics: {
    enabled: true,
    stat1Value: '+500',
    stat1Label: 'CLIENTES',
    stat2Value: '8 anos',
    stat2Label: 'DE EXPERIÊNCIA',
    stat3Value: '95%',
    stat3Label: 'DE SATISFAÇÃO'
  },
  actionCards: [
    {
      id: 'cta-1',
      title: 'MENTORIA & CONSULTORIA VIP',
      subtitle: 'Atendimento presencial ou online com acompanhamento estratégico.',
      icon: 'Calendar',
      linkType: 'booking',
      url: '#booking',
      whatsappMessage: 'Olá! Gostaria de agendar uma consulta.',
      openInNewTab: true,
      animation: 'pulse-glow',
      variant: 'default',
      badgeText: 'AGENDA ABERTA',
      customBg: '#e2b857',
      customText: '#0f172a',
      bgImage: '',
      imagePosition: 'right',
      cardImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500',
      imageFitStyle: 'popout',
      imageSize: 96,
      ctaActionText: 'AGENDAR AGORA'
    },
    {
      id: 'cta-2',
      title: 'GUIA ESTRATÉGICO & PLANEJAMENTO',
      subtitle: 'Soluções completas e materiais exclusivos passo a passo.',
      icon: 'Scale',
      linkType: 'catalogo',
      url: '#catalogo',
      whatsappMessage: 'Olá! Gostaria de informações sobre o Guia Estratégico.',
      openInNewTab: false,
      animation: 'none',
      variant: 'default',
      badgeText: '',
      customBg: '#ffffff',
      customText: '#0f172a',
      bgImage: '',
      imagePosition: 'left',
      cardImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=500',
      imageFitStyle: 'framed',
      imageSize: 84,
      ctaActionText: 'BAIXE AGORA'
    },
    {
      id: 'cta-3',
      title: 'DIREITO PREVIDENCIÁRIO',
      subtitle: 'Aposentadorias, benefícios e planejamento previdenciário.',
      icon: 'Briefcase',
      linkType: 'custom',
      url: 'https://',
      whatsappMessage: 'Olá! Gostaria de informações sobre Direito Previdenciário.',
      openInNewTab: true,
      animation: 'none',
      variant: 'default',
      badgeText: '',
      customBg: '#ffffff',
      customText: '#0f172a',
      bgImage: '',
      imagePosition: 'none',
      cardImage: '',
      imageFitStyle: 'framed',
      imageSize: 84,
      ctaActionText: ''
    },
    {
      id: 'cta-4',
      title: 'FALE COMIGO NO WHATSAPP',
      subtitle: 'Tire dúvidas e receba atendimento personalizado.',
      icon: 'MessageCircle',
      linkType: 'whatsapp',
      url: 'https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20atendimento.',
      whatsappMessage: 'Olá! Vi seu link na bio e gostaria de atendimento personalizado.',
      openInNewTab: true,
      animation: 'shimmer',
      variant: 'default',
      badgeText: 'ONLINE',
      customBg: '#25D366',
      customText: '#000000',
      bgImage: '',
      imagePosition: 'none',
      cardImage: '',
      imageFitStyle: 'framed',
      imageSize: 84,
      ctaActionText: 'CLIQUE AQUI'
    }
  ] as Array<{
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    linkType: string;
    url: string;
    whatsappMessage: string;
    openInNewTab: boolean;
    animation: string;
    variant: string;
    badgeText: string;
    customBg: string;
    customText: string;
    customTitleColor?: string;
    customSubtitleColor?: string;
    bgImage: string;
    imagePosition: string;
    cardImage: string;
    imageFitStyle: string;
    imageSize: number;
    ctaActionText: string;
  }>,
  processSteps: {
    enabled: true,
    headline: 'Como funciona o processo?',
    subtitle: 'Simples, seguro e totalmente transparente em 3 etapas',
    steps: [
      {
        id: 'step-1',
        number: '01',
        title: 'Primeiro Contato & Triagem',
        description: 'Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade.'
      },
      {
        id: 'step-2',
        number: '02',
        title: 'Consulta Estratégica',
        description: 'Análise aprofundada da sua situação com plano de ação sob medida.'
      },
      {
        id: 'step-3',
        number: '03',
        title: 'Execução & Acompanhamento',
        description: 'Defesa contínua e comunicação clara em todas as etapas.'
      }
    ]
  },
  studentGrid: {
    enabled: true,
    headline: 'Portfólio & Estrutura de Atendimento',
    subtitle: 'Registros reais do nosso padrão de entrega e excelência jurídica',
    badge: 'ESTRUTURA VIP',
    layout: 'smart_masonry' as 'grid3' | 'grid2' | 'mosaic' | 'carousel' | 'smart_masonry' | 'masonry',
    aspectRatio: 'auto' as 'auto' | 'square' | 'portrait' | 'landscape',
    enableLightbox: true,
    photos: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=700',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=700',
    ],
    captions: [] as string[],
  },
  locationCard: {
    enabled: true,
    headline: 'Nossa Localização',
    address: 'Av. Paulista, 1200 - Bela Vista, São Paulo - SP',
    buttonLabel: 'Abrir no Google Maps',
    mapsUrl: 'https://maps.google.com',
    hours: 'Seg a Sáb · 08:30 às 19:30',
    openStatus: 'ABERTO AGORA · HORA MARCADA',
    showHours: true,
  },
  services: {
    enabled: true,
    headline: 'Como posso te ajudar',
    subtitle: 'Procedimentos, consultorias e soluções sob medida para o seu objetivo',
    badge: 'CATÁLOGO VIP',
    layout: 'list' as 'list' | 'featured' | 'grid2',
    items: [
      {
        id: 'srv-1',
        name: 'Consultoria Estratégica Individual',
        description: 'Análise completa do seu cenário com orientações práticas imediatas.',
        price: 'R$ 350',
        oldPrice: 'R$ 490',
        duration: '1h30',
        badge: 'MAIS PROCURADO',
        ctaLabel: 'Reservar',
        actionType: 'booking',
        customUrl: '',
        featured: true,
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500'
      },
      {
        id: 'srv-2',
        name: 'Planejamento e Parecer Técnico',
        description: 'Documento fundamentado com plano de ação preventivo ou contencioso.',
        price: 'R$ 780',
        oldPrice: '',
        duration: '3 dias',
        badge: 'EXCLUSIVO',
        ctaLabel: 'Reservar',
        actionType: 'booking',
        customUrl: '',
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=500'
      }
    ] as Array<{
      id: string;
      name: string;
      description: string;
      price: string;
      duration: string;
      imageUrl: string;
      oldPrice?: string;
      badge?: string;
      ctaLabel?: string;
      actionType?: 'booking' | 'whatsapp' | 'link';
      customUrl?: string;
      whatsappMessage?: string;
      category?: string;
      featured?: boolean;
    }>
  },
  trustBadges: {
    enabled: true,
    items: [
      { id: 'tb-1', icon: 'credit-card', title: 'Cartão até 12x', subtitle: 'Crédito e Débito', color: 'emerald' },
      { id: 'tb-2', icon: 'zap', title: 'Pix Instantâneo', subtitle: 'Confirmação na hora', color: 'amber' },
      { id: 'tb-3', icon: 'car', title: 'Fácil Acesso', subtitle: 'Local seguro', color: 'sky' },
      { id: 'tb-4', icon: 'shield', title: 'Espaço VIP', subtitle: 'Climatizado & Café', color: 'purple' },
    ] as TrustBadgeItem[],
  },
  beforeAfter: {
    enabled: false,
    headline: 'Transformação Real',
    subtitle: 'Arraste para comparar o antes e o depois',
    beforeUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500',
    afterUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500',
  },
  testimonials: {
    enabled: true,
    headline: 'Depoimentos de Clientes',
    items: [
      {
        id: 't-1',
        clientName: 'Dra. Vanessa Mendes',
        city: 'São Paulo - SP',
        text: 'A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.',
        rating: 5
      },
      {
        id: 't-2',
        clientName: 'Renato Silveira',
        city: 'Campinas - SP',
        text: 'Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!',
        rating: 5
      }
    ]
  },
  qualifierFunnel: {
    enabled: false,
    animation: 'shimmer',
    triggerButtonLabel: 'AVALIAÇÃO DE CASO / TRIAGEM VIP',
    triggerButtonSubtitle: 'Descubra a melhor solução para você em 3 perguntas rápidas.',
    headline: 'Triagem Estratégica & Agendamento',
    subtitle: 'Responda para receber um atendimento sob medida e prioritário.',
    questions: [
      {
        id: 'q1',
        title: 'Qual é o seu objetivo principal hoje?',
        options: [
          'Agendar Consulta / Atendimento Individual',
          'Consultoria Estratégica ou Parecer',
          'Mentoria ou Cursos Profissionais',
          'Outra dúvida específica'
        ]
      },
      {
        id: 'q2',
        title: 'Você já realizou este tipo de procedimento ou consultoria antes?',
        options: [
          'Sim, busco um atendimento de padrão superior',
          'Não, é a minha primeira experiência',
          'Ainda estou em fase de pesquisa e planejamento'
        ]
      },
      {
        id: 'q3',
        title: 'Qual é a sua urgência e melhor turno para retorno?',
        options: [
          'Urgente (esta semana) - Período da Manhã',
          'Urgente (esta semana) - Período da Tarde',
          'Próximas semanas com flexibilidade'
        ]
      }
    ]
  },
  aboutMe: {
    enabled: true,
    headline: 'Sobre mim',
    photoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700',
    photoHeight: 170,
    photoPosY: 50,
    photoPosX: 50,
    paragraph: 'Com mais de 8 anos de atuação, acredito que a prestação de serviços deve unir excelência técnica e acolhimento humano. Cada pessoa traz uma história única que merece atenção dedicada e soluções assertivas.',
    closingPhrase: 'Sua segurança jurídica, meu compromisso.',
  },
  faq: {
    enabled: true,
    headline: 'Dúvidas Frequentes',
    items: [
      {
        id: 'faq-1',
        question: 'Como funciona a primeira consulta?',
        answer: 'Realizamos um atendimento inicial para entender seu caso a fundo e traçar a melhor estratégia.'
      },
      {
        id: 'faq-2',
        question: 'O atendimento pode ser 100% online?',
        answer: 'Sim, atendemos clientes do Brasil e do exterior por videoconferência com total sigilo e comodidade.'
      },
      {
        id: 'faq-3',
        question: 'Quais áreas você atende?',
        answer: 'Atuação especializada em consultoria jurídica, contratos, planejamento familiar e previdenciário.'
      }
    ]
  },
  conversion: {
    metaPixelId: '',
    googleAnalyticsId: '',
    defaultWhatsappMsg: 'Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}.',
  },
  seo: {
    metaTitle: 'DRA. MARINA ALMEIDA — Advocacia Estratégica & Consultoria VIP',
    metaDescription: 'Atendimento jurídico humanizado e focado em resultados. Agende sua consultoria presencial ou online.',
    ogImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    keywords: 'advogada, consultoria, direito, atendimento vip, advocacia'
  },
  highConversion: {
    enabled: true, // Master Toggle for Option 2 (Can be deactivated!)
    socialProof: {
      enabled: true,
      notifications: [
        { id: 'sp-1', clientName: 'Juliana M.', action: 'agendou Atendimento VIP', timeAgo: 'há 4 min' },
        { id: 'sp-2', clientName: 'Roberto S.', action: 'solicitou orçamento no WhatsApp', timeAgo: 'há 12 min' },
        { id: 'sp-3', clientName: 'Camila K.', action: 'garantiu uma vaga da semana', timeAgo: 'há 28 min' }
      ]
    },
    urgencyTimer: {
      enabled: true,
      headline: '🔥 CONDIÇÃO ESPECIAL DE HOJE',
      subheadline: 'Garanta sua vaga com atendimento prioritário antes que expire:',
      minutes: 14,
      seconds: 52
    },
    embeddedBooking: {
      enabled: false,
      title: '📅 Agendamento Direto na Agenda',
      type: 'cal',
      iframeUrl: 'https://cal.com/demo'
    }
  },
  saasSettings: {
    pixKey: 'contato@biovip.com.br',
    pixName: 'BioVip Studio SaaS',
    pixCity: 'São Paulo - SP',
    autoReminderMsg: 'Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}',
    defaultMonthlyFee: 149.90,
    asaas: {
      apiKey: '',
      environment: 'sandbox' as 'sandbox' | 'production',
      preferredMethod: 'PIX' as 'PIX' | 'BOLETO' | 'CREDIT_CARD',
      enabled: false,
    }
  },
  customCode: {
    enabled: false,
    customCss: '',
    customHtmlBanner: '',
    customJs: '',
    isolatedIframePreview: false
  }
};

export type MicrositeData = typeof INITIAL_DATA;

export const NICHE_DEMO_MODULE_COLORS: Record<string, typeof INITIAL_DATA.moduleColors> = {
  'Jurídico & Executivo': {
    announcement: { bgColor: '#e2b857', textColor: '#0f172a', titleColor: '#0f172a' },
    hero: { headlineColor: '#e2b857', titleColor: '#ffffff', textColor: '#cbd5e1', accentColor: '#e2b857' },
    urgencyTimer: { bgColor: 'rgba(226, 184, 87, 0.12)', headlineColor: '#e2b857', titleColor: '#e2b857', textColor: '#cbd5e1', accentColor: '#e2b857' },
    qualifierFunnel: { bgColor: 'linear-gradient(135deg, #e2b857 0%, #c99c3a 100%)', titleColor: '#0f172a', textColor: '#1e293b' },
    actionCards: { bgColor: '#ffffff', titleColor: '#0f172a', textColor: '#475569', accentColor: '#e2b857' },
    metrics: { bgColor: 'rgba(226, 184, 87, 0.12)', titleColor: '#e2b857', textColor: '#cbd5e1', accentColor: '#e2b857' },
    processSteps: { bgColor: 'rgba(226, 184, 87, 0.12)', headlineColor: '#e2b857', titleColor: '#ffffff', textColor: '#cbd5e1', accentColor: '#e2b857' },
    services: { bgColor: 'rgba(255, 255, 255, 0.05)', headlineColor: '#e2b857', titleColor: '#ffffff', textColor: '#cbd5e1', accentColor: '#e2b857' },
    studentGrid: { headlineColor: '#e2b857', titleColor: '#e2b857', textColor: '#cbd5e1', accentColor: '#e2b857' },
    locationCard: { bgColor: 'rgba(226, 184, 87, 0.12)', headlineColor: '#e2b857', titleColor: '#ffffff', textColor: '#cbd5e1', accentColor: '#e2b857' },
    aboutMe: { headlineColor: '#e2b857', titleColor: '#e2b857', textColor: '#e2e8f0' },
    testimonials: { bgColor: 'rgba(226, 184, 87, 0.12)', headlineColor: '#e2b857', titleColor: '#ffffff', textColor: '#cbd5e1', accentColor: '#fbbf24' },
    faq: { bgColor: 'rgba(226, 184, 87, 0.1)', headlineColor: '#e2b857', titleColor: '#ffffff', textColor: '#cbd5e1' },
    footer: { textColor: '#94a3b8', accentColor: '#e2b857' },
  },
  'Beleza & Unhas': {
    announcement: { bgColor: '#d4af37', textColor: '#0c0b0b', titleColor: '#0c0b0b' },
    hero: { headlineColor: '#d4af37', titleColor: '#ffffff', textColor: '#dfd3c3', accentColor: '#d4af37' },
    urgencyTimer: { bgColor: 'rgba(212, 175, 55, 0.12)', headlineColor: '#d4af37', titleColor: '#d4af37', textColor: '#dfd3c3', accentColor: '#d4af37' },
    qualifierFunnel: { bgColor: 'linear-gradient(135deg, #d4af37 0%, #b89726 100%)', titleColor: '#0c0b0b', textColor: '#26221c' },
    actionCards: { bgColor: 'linear-gradient(145deg, #f5ede4 0%, #dfd3c3 100%)', titleColor: '#2a241e', textColor: '#574c40', accentColor: '#d4af37' },
    metrics: { bgColor: 'rgba(212, 175, 55, 0.12)', titleColor: '#d4af37', textColor: '#dfd3c3', accentColor: '#d4af37' },
    processSteps: { bgColor: 'rgba(212, 175, 55, 0.12)', headlineColor: '#d4af37', titleColor: '#ffffff', textColor: '#dfd3c3', accentColor: '#d4af37' },
    services: { bgColor: 'rgba(255, 255, 255, 0.05)', headlineColor: '#d4af37', titleColor: '#ffffff', textColor: '#dfd3c3', accentColor: '#d4af37' },
    studentGrid: { headlineColor: '#d4af37', titleColor: '#d4af37', textColor: '#dfd3c3', accentColor: '#d4af37' },
    locationCard: { bgColor: 'rgba(212, 175, 55, 0.12)', headlineColor: '#d4af37', titleColor: '#ffffff', textColor: '#dfd3c3', accentColor: '#d4af37' },
    aboutMe: { headlineColor: '#d4af37', titleColor: '#d4af37', textColor: '#f5ede4' },
    testimonials: { bgColor: 'rgba(212, 175, 55, 0.12)', headlineColor: '#d4af37', titleColor: '#ffffff', textColor: '#dfd3c3', accentColor: '#fbbf24' },
    faq: { bgColor: 'rgba(212, 175, 55, 0.1)', headlineColor: '#d4af37', titleColor: '#ffffff', textColor: '#dfd3c3' },
    footer: { textColor: '#c5b49f', accentColor: '#d4af37' },
  },
  'Beleza & Alta Conversão': {
    announcement: { bgColor: '#e11d48', textColor: '#ffffff', titleColor: '#ffffff' },
    hero: { headlineColor: '#fda4af', titleColor: '#ffffff', textColor: '#fecdd3', accentColor: '#fb7185' },
    urgencyTimer: { bgColor: 'rgba(225, 29, 72, 0.18)', headlineColor: '#fb7185', titleColor: '#fb7185', textColor: '#fecdd3', accentColor: '#fb7185' },
    qualifierFunnel: { bgColor: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)', titleColor: '#ffffff', textColor: '#ffe4e6' },
    actionCards: { bgColor: 'linear-gradient(135deg, #881337 0%, #4c0519 100%)', titleColor: '#ffffff', textColor: '#fecdd3', accentColor: '#e11d48' },
    metrics: { bgColor: 'rgba(225, 29, 72, 0.18)', titleColor: '#fb7185', textColor: '#fecdd3', accentColor: '#fb7185' },
    processSteps: { bgColor: 'rgba(225, 29, 72, 0.18)', headlineColor: '#fb7185', titleColor: '#ffffff', textColor: '#fecdd3', accentColor: '#fb7185' },
    services: { bgColor: 'rgba(136, 19, 55, 0.25)', headlineColor: '#fb7185', titleColor: '#ffffff', textColor: '#fecdd3', accentColor: '#e11d48' },
    studentGrid: { headlineColor: '#fb7185', titleColor: '#fb7185', textColor: '#fecdd3', accentColor: '#fb7185' },
    locationCard: { bgColor: 'rgba(225, 29, 72, 0.18)', headlineColor: '#fb7185', titleColor: '#ffffff', textColor: '#fecdd3', accentColor: '#fb7185' },
    aboutMe: { headlineColor: '#fb7185', titleColor: '#fb7185', textColor: '#ffe4e6' },
    testimonials: { bgColor: 'rgba(225, 29, 72, 0.18)', headlineColor: '#fb7185', titleColor: '#ffffff', textColor: '#fecdd3', accentColor: '#fbbf24' },
    faq: { bgColor: 'rgba(225, 29, 72, 0.18)', headlineColor: '#fb7185', titleColor: '#ffffff', textColor: '#fecdd3' },
    footer: { textColor: '#fda4af', accentColor: '#fb7185' },
  },
  'Consultoria & Estética': {
    announcement: { bgColor: '#786045', textColor: '#ffffff', titleColor: '#ffffff' },
    hero: { headlineColor: '#786045', titleColor: '#1c1917', textColor: '#44403c', accentColor: '#786045' },
    urgencyTimer: { bgColor: '#ffffff', headlineColor: '#786045', titleColor: '#786045', textColor: '#57534e', accentColor: '#786045' },
    qualifierFunnel: { bgColor: 'linear-gradient(135deg, #786045 0%, #634f37 100%)', titleColor: '#ffffff', textColor: '#f5ede4' },
    actionCards: { bgColor: '#ffffff', titleColor: '#1c1917', textColor: '#57534e', accentColor: '#786045' },
    metrics: { bgColor: '#ffffff', titleColor: '#786045', textColor: '#57534e', accentColor: '#786045' },
    processSteps: { bgColor: '#ffffff', headlineColor: '#786045', titleColor: '#1c1917', textColor: '#57534e', accentColor: '#786045' },
    services: { bgColor: '#ffffff', headlineColor: '#786045', titleColor: '#1c1917', textColor: '#57534e', accentColor: '#786045' },
    studentGrid: { headlineColor: '#786045', titleColor: '#786045', textColor: '#57534e', accentColor: '#786045' },
    locationCard: { bgColor: '#ffffff', headlineColor: '#786045', titleColor: '#1c1917', textColor: '#57534e', accentColor: '#786045' },
    aboutMe: { headlineColor: '#786045', titleColor: '#786045', textColor: '#292524' },
    testimonials: { bgColor: '#ffffff', headlineColor: '#786045', titleColor: '#1c1917', textColor: '#57534e', accentColor: '#b45309' },
    faq: { bgColor: '#ffffff', headlineColor: '#786045', titleColor: '#1c1917', textColor: '#57534e' },
    footer: { textColor: '#78716c', accentColor: '#786045' },
  },
  'Mentoria & Cursos': {
    announcement: { bgColor: '#d99f69', textColor: '#1c1613', titleColor: '#1c1613' },
    hero: { headlineColor: '#d99f69', titleColor: '#faf6f0', textColor: '#d6c4b8', accentColor: '#d99f69' },
    urgencyTimer: { bgColor: 'rgba(217, 159, 105, 0.14)', headlineColor: '#d99f69', titleColor: '#d99f69', textColor: '#d6c4b8', accentColor: '#d99f69' },
    qualifierFunnel: { bgColor: 'linear-gradient(135deg, #d99f69 0%, #b87f4c 100%)', titleColor: '#1c1613', textColor: '#2c1e15' },
    actionCards: { bgColor: 'linear-gradient(135deg, #f7efe6 0%, #e8d7c3 100%)', titleColor: '#261b14', textColor: '#574438', accentColor: '#d99f69' },
    metrics: { bgColor: 'rgba(217, 159, 105, 0.14)', titleColor: '#d99f69', textColor: '#d6c4b8', accentColor: '#d99f69' },
    processSteps: { bgColor: 'rgba(217, 159, 105, 0.14)', headlineColor: '#d99f69', titleColor: '#faf6f0', textColor: '#d6c4b8', accentColor: '#d99f69' },
    services: { bgColor: 'rgba(255, 255, 255, 0.05)', headlineColor: '#d99f69', titleColor: '#faf6f0', textColor: '#d6c4b8', accentColor: '#d99f69' },
    studentGrid: { headlineColor: '#d99f69', titleColor: '#d99f69', textColor: '#d6c4b8', accentColor: '#d99f69' },
    locationCard: { bgColor: 'rgba(217, 159, 105, 0.14)', headlineColor: '#d99f69', titleColor: '#faf6f0', textColor: '#d6c4b8', accentColor: '#d99f69' },
    aboutMe: { headlineColor: '#d99f69', titleColor: '#d99f69', textColor: '#faf6f0' },
    testimonials: { bgColor: 'rgba(217, 159, 105, 0.14)', headlineColor: '#d99f69', titleColor: '#faf6f0', textColor: '#d6c4b8', accentColor: '#fbbf24' },
    faq: { bgColor: 'rgba(217, 159, 105, 0.12)', headlineColor: '#d99f69', titleColor: '#faf6f0', textColor: '#d6c4b8' },
    footer: { textColor: '#bda89b', accentColor: '#d99f69' },
  },
  'Barbearia & Grooming': {
    announcement: { bgColor: '#d97706', textColor: '#0c0a09', titleColor: '#0c0a09' },
    hero: { headlineColor: '#fbbf24', titleColor: '#f5efe6', textColor: '#c4b5a2', accentColor: '#d97706' },
    urgencyTimer: { bgColor: 'rgba(217, 119, 6, 0.14)', headlineColor: '#fbbf24', titleColor: '#fbbf24', textColor: '#c4b5a2', accentColor: '#d97706' },
    qualifierFunnel: { bgColor: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', titleColor: '#0c0a09', textColor: '#261b14' },
    actionCards: { bgColor: 'linear-gradient(145deg, #211c18 0%, #161310 100%)', titleColor: '#f5efe6', textColor: '#b8a996', accentColor: '#d97706' },
    metrics: { bgColor: 'rgba(217, 119, 6, 0.14)', titleColor: '#fbbf24', textColor: '#c4b5a2', accentColor: '#d97706' },
    processSteps: { bgColor: 'rgba(217, 119, 6, 0.14)', headlineColor: '#fbbf24', titleColor: '#f5efe6', textColor: '#c4b5a2', accentColor: '#d97706' },
    services: { bgColor: 'rgba(33, 28, 24, 0.7)', headlineColor: '#fbbf24', titleColor: '#f5efe6', textColor: '#c4b5a2', accentColor: '#d97706' },
    studentGrid: { headlineColor: '#fbbf24', titleColor: '#fbbf24', textColor: '#c4b5a2', accentColor: '#d97706' },
    locationCard: { bgColor: 'rgba(217, 119, 6, 0.14)', headlineColor: '#fbbf24', titleColor: '#f5efe6', textColor: '#c4b5a2', accentColor: '#fbbf24' },
    aboutMe: { headlineColor: '#fbbf24', titleColor: '#fbbf24', textColor: '#f5efe6' },
    testimonials: { bgColor: 'rgba(217, 119, 6, 0.14)', headlineColor: '#fbbf24', titleColor: '#f5efe6', textColor: '#c4b5a2', accentColor: '#fbbf24' },
    faq: { bgColor: 'rgba(217, 119, 6, 0.12)', headlineColor: '#fbbf24', titleColor: '#f5efe6', textColor: '#c4b5a2' },
    footer: { textColor: '#a89984', accentColor: '#fbbf24' },
  },
  'Saúde & Psicologia': {
    announcement: { bgColor: '#7a3b22', textColor: '#ffffff', titleColor: '#ffffff' },
    hero: { headlineColor: '#7a3b22', titleColor: '#1c1511', textColor: '#4a3b34', accentColor: '#7a3b22' },
    urgencyTimer: { bgColor: '#ffffff', headlineColor: '#7a3b22', titleColor: '#7a3b22', textColor: '#5c4b42', accentColor: '#7a3b22' },
    qualifierFunnel: { bgColor: 'linear-gradient(135deg, #7a3b22 0%, #632d18 100%)', titleColor: '#ffffff', textColor: '#f5ded4' },
    actionCards: { bgColor: '#ffffff', titleColor: '#1c1511', textColor: '#5c4b42', accentColor: '#7a3b22' },
    metrics: { bgColor: '#ffffff', titleColor: '#7a3b22', textColor: '#5c4b42', accentColor: '#7a3b22' },
    processSteps: { bgColor: '#ffffff', headlineColor: '#7a3b22', titleColor: '#1c1511', textColor: '#5c4b42', accentColor: '#7a3b22' },
    services: { bgColor: '#ffffff', headlineColor: '#7a3b22', titleColor: '#1c1511', textColor: '#5c4b42', accentColor: '#7a3b22' },
    studentGrid: { headlineColor: '#7a3b22', titleColor: '#7a3b22', textColor: '#5c4b42', accentColor: '#7a3b22' },
    locationCard: { bgColor: '#ffffff', headlineColor: '#7a3b22', titleColor: '#1c1511', textColor: '#5c4b42', accentColor: '#7a3b22' },
    aboutMe: { headlineColor: '#7a3b22', titleColor: '#7a3b22', textColor: '#291d17' },
    testimonials: { bgColor: '#ffffff', headlineColor: '#7a3b22', titleColor: '#1c1511', textColor: '#5c4b42', accentColor: '#b45309' },
    faq: { bgColor: '#ffffff', headlineColor: '#7a3b22', titleColor: '#1c1511', textColor: '#5c4b42' },
    footer: { textColor: '#78645a', accentColor: '#7a3b22' },
  },
  'Moda & Juventude': {
    announcement: { bgColor: '#9d174d', textColor: '#ffffff', titleColor: '#ffffff' },
    hero: { headlineColor: '#9d174d', titleColor: '#2b0914', textColor: '#4a1d29', accentColor: '#be185d' },
    urgencyTimer: { bgColor: '#ffffff', headlineColor: '#be185d', titleColor: '#be185d', textColor: '#5c2d3a', accentColor: '#be185d' },
    qualifierFunnel: { bgColor: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)', titleColor: '#ffffff', textColor: '#fce7ee' },
    actionCards: { bgColor: '#ffffff', titleColor: '#2b0914', textColor: '#5c2d3a', accentColor: '#be185d' },
    metrics: { bgColor: '#ffffff', titleColor: '#be185d', textColor: '#5c2d3a', accentColor: '#be185d' },
    processSteps: { bgColor: '#ffffff', headlineColor: '#be185d', titleColor: '#2b0914', textColor: '#5c2d3a', accentColor: '#be185d' },
    services: { bgColor: '#ffffff', headlineColor: '#be185d', titleColor: '#2b0914', textColor: '#5c2d3a', accentColor: '#be185d' },
    studentGrid: { headlineColor: '#be185d', titleColor: '#be185d', textColor: '#5c2d3a', accentColor: '#be185d' },
    locationCard: { bgColor: '#ffffff', headlineColor: '#be185d', titleColor: '#2b0914', textColor: '#5c2d3a', accentColor: '#be185d' },
    aboutMe: { headlineColor: '#be185d', titleColor: '#be185d', textColor: '#3f111d' },
    testimonials: { bgColor: '#ffffff', headlineColor: '#be185d', titleColor: '#2b0914', textColor: '#5c2d3a', accentColor: '#b45309' },
    faq: { bgColor: '#ffffff', headlineColor: '#be185d', titleColor: '#2b0914', textColor: '#5c2d3a' },
    footer: { textColor: '#8b4b5a', accentColor: '#be185d' },
  },
};

/**
 * Mescla qualquer objeto de dados de microsite com os valores e módulos padrão de INITIAL_DATA,
 * garantindo que nenhuma propriedade aninhada seja undefined e prevenindo telas brancas.
 */
export function mergeWithInitialData(incoming: any): typeof INITIAL_DATA {
  if (!incoming || typeof incoming !== 'object') {
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }
  const clonedInitial = JSON.parse(JSON.stringify(INITIAL_DATA));
  const result: any = {
    ...clonedInitial,
    ...incoming,
  };

  for (const key of Object.keys(clonedInitial)) {
    const defaultVal = clonedInitial[key];
    const incomingVal = incoming[key];

    if (defaultVal && typeof defaultVal === 'object' && !Array.isArray(defaultVal)) {
      result[key] = {
        ...defaultVal,
        ...(incomingVal && typeof incomingVal === 'object' && !Array.isArray(incomingVal) ? incomingVal : {}),
      };
    } else if (Array.isArray(defaultVal)) {
      result[key] = Array.isArray(incomingVal) ? incomingVal : defaultVal;
    } else if (incomingVal !== undefined) {
      result[key] = incomingVal;
    } else {
      result[key] = defaultVal;
    }
  }

  return result as typeof INITIAL_DATA;
}

export { INITIAL_SAVED_SITES } from './initialSavedSites';

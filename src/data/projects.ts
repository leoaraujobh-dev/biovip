export interface ProjectButton {
  id: string
  label: string
  title?: string
  subtitle: string
  icon: string
  url: string
  linkType?: 'booking' | 'catalogo' | 'whatsapp' | 'maps' | 'custom' | 'quiz' | 'location'
  whatsappMessage?: string
  openInNewTab?: boolean
  isHighlighted?: boolean
  highlightBadge?: string
  badgeText?: string
  animation?: 'pulse-glow' | 'shimmer' | 'shimmer-sweep' | 'bounce' | 'none'
  variant?: 'accent' | 'default' | 'card' | 'gold' | 'glass'
  customBg?: string
  customText?: string
  bgImage?: string
  imagePosition?: 'none' | 'left' | 'right' | 'cover'
  cardImage?: string
  imageFitStyle?: 'popout' | 'framed' | 'cover'
  imageSize?: number
  ctaActionText?: string
}

export type ActionCard = ProjectButton

export interface StudentGridConfig {
  enabled?: boolean
  headline?: string
  subtitle?: string
  badge?: string
  badgeText?: string
  layout?: 'carousel-snap' | 'grid-2col' | 'mosaic' | 'scroll-cards' | 'smart_masonry' | 'grid3'
  aspectRatio?: 'auto' | 'square' | 'portrait' | 'landscape'
  enableLightbox?: boolean
  photos: string[]
  captions?: string[]
}

export interface ProjectSubPage {
  slug: string
  title: string
  description: string
  previewType: 'services' | 'before_after' | 'booking' | 'reviews' | 'menu_digital' | 'catalog_products' | 'editorial_gallery'
}

export interface ServiceItem {
  id: string
  category: string
  name: string
  description: string
  price: string
  duration?: string
  badge?: string
  featured?: boolean
  image?: string
  imageLayout?: 'thumb' | 'cover'
  whatsappMessage?: string
}

export interface QualifierQuestion {
  id: string
  question: string
  options: string[]
}

export interface Project {
  slug: string
  name: string
  role: string
  category: string
  registrationCode: string
  image: string
  photo: string
  description: string
  features: string[]
  link: string
  paletteId: string
  typographyId: string
  buttonStyle?: string
  buttonAnimation?: string
  monogram: string
  stats: {
    views: string
    clicks: string
    conversion: string
  }
  buttons: ProjectButton[]
  subpages?: ProjectSubPage[]
  isPortfolioModel?: boolean
  inPortfolio?: boolean

  // 12 Módulos Oficiais BioVip
  announcement?: {
    enabled: boolean
    badge: string
    text: string
    link?: string
  }
  urgency?: {
    enabled: boolean
    headline: string
    subtitle: string
    minutes: number
  }
  qualifierQuiz?: {
    enabled: boolean
    buttonLabel: string
    headline: string
    subtitle: string
    questions: QualifierQuestion[]
  }
  metricsList?: {
    value: string
    label: string
  }[]
  howItWorksSteps?: {
    number: string
    title: string
    description: string
  }[]
  galleryPhotosList?: string[]
  galleryConfig?: StudentGridConfig
  servicesCatalog?: {
    enabled: boolean
    headline: string
    subtitle?: string
    categories: string[]
    items: ServiceItem[]
  }
  locationInfo?: {
    enabled: boolean
    address: string
    hours: string
    openStatus?: string
    mapsUrl?: string
    phone?: string
  }
  testimonialsList?: {
    id?: string
    clientName?: string
    name?: string
    city?: string
    role?: string
    text: string
    rating: number
    date?: string
    verified?: boolean
  }[]
  aboutMeSection?: {
    enabled?: boolean
    headline: string
    paragraph?: string
    bio?: string
    quote?: string
    photoUrl?: string
    closingPhrase?: string
  }
  faqList?: {
    question: string
    answer: string
  }[]
  isMaintenanceMode?: boolean
}

export const projects: Project[] = [
  {
    slug: 'dra-ana-freire',
    name: 'Dra. Ana Freire',
    role: 'Odontologia Estética & Reabilitação Oral',
    category: 'Saúde & Odonto',
    registrationCode: 'CRO-PE 22.675',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site elegante para clínica de odontologia estética, focado em conversão de pacientes particulares para WhatsApp e agendamento de lentes e facetas.',
    features: ['Agendamento Online', 'WhatsApp Direto VIP', 'Galeria de Lentes', 'Registro CRO-PE', 'Localização Privilegiada'],
    link: 'https://biovip.com.br/dra-ana-freire',
    paletteId: 'luxo_nude',
    typographyId: 'instrument',
    monogram: 'AF',
    stats: { views: '14.2K', clicks: '4.8K', conversion: '33.8%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'procedimentos', title: 'Procedimentos & Preços', description: 'Tabela de tratamentos estéticos, lentes de resina, porcelana e clareamento.', previewType: 'services' },
      { slug: 'transformacoes', title: 'Antes e Depois Sorrisos', description: 'Comparativo interativo arrastável de transformações com facetas e lentes.', previewType: 'before_after' },
      { slug: 'agenda-vip', title: 'Agendamento com a Equipe', description: 'Consulte os dias e horários livres com confirmação imediata.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'AGENDAMENTO VIP',
        subtitle: 'Consulta de avaliação estética & planejamento digital do sorriso.',
        icon: 'calendar',
        url: 'https://wa.me/5531991390202?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20VIP%20com%20a%20Dra.%20Ana%20Freire.',
        isHighlighted: true,
        highlightBadge: '⭐ MAIS ESCOLHIDO',
        badgeText: 'MAIS PROCURADO',
        ctaActionText: 'RESERVAR HORÁRIO',
        cardImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
        imagePosition: 'right',
        imageFitStyle: 'popout',
        animation: 'pulse-glow',
        variant: 'gold'
      },
      {
        id: 'btn-2',
        label: 'CATÁLOGO DE PROCEDIMENTOS',
        subtitle: 'Lentes em resina e porcelana, clareamento a laser e facetas.',
        icon: 'sparkles',
        url: 'https://wa.me/5531991390202?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20os%20procedimentos%20e%20valores%20da%20Dra.%20Ana%20Freire.',
        badgeText: 'TABELA VIP',
        ctaActionText: 'VER PROCEDIMENTOS',
        cardImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&q=80',
        imagePosition: 'left',
        imageFitStyle: 'framed',
        variant: 'default'
      },
      {
        id: 'btn-3',
        label: 'LOCALIZAÇÃO DO CONSULTÓRIO',
        subtitle: 'Edifício Trade Center - Sala 918, Boa Viagem - Recife, PE',
        icon: 'map',
        url: 'https://maps.google.com/?q=Trade+Center+Recife',
        badgeText: 'MAPS & WAZE',
        ctaActionText: 'ABRIR ROTA',
        imagePosition: 'none',
        variant: 'glass'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'CONSULTORIA VIP',
      text: 'Agenda de atendimentos e avaliações estéticas aberta.'
    },
    urgency: {
      enabled: true,
      headline: '🔥 CONDIÇÃO ESPECIAL DE HOJE',
      subtitle: 'Garanta seu horário com avaliação prioritária antes que expire:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '✨ Descobrir Tratamento Ideal (Triagem VIP)',
      headline: 'Atendimento Personalizado',
      subtitle: 'Responda 3 perguntas rápidas para agilizar seu atendimento no WhatsApp:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual procedimento você tem mais interesse?',
          options: ['Lentes de Resina / Facetas', 'Harmonização Facial & Botox', 'Clareamento Dental a Laser', 'Reabilitação Oral Completa']
        },
        {
          id: 'q-2',
          question: 'Qual o melhor período para sua consulta?',
          options: ['Manhã (08h às 12h)', 'Tarde (13h às 18h)', 'Final do dia / Sábado']
        },
        {
          id: 'q-3',
          question: 'Qual o seu objetivo principal hoje?',
          options: ['Primeira consulta de avaliação', 'Manutenção periódica', 'Dúvidas sobre investimento e prazos']
        }
      ]
    },
    metricsList: [
      { value: '+1.200', label: 'SORRISOS TRANSFORMADOS' },
      { value: '11 anos', label: 'DE EXPERIÊNCIA CLÍNICA' },
      { value: '5.0★', label: 'AVALIAÇÃO NO GOOGLE' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Primeiro Contato & Triagem', description: 'Você escolhe o procedimento pelo WhatsApp e enviamos os horários prioritários disponíveis.' },
      { number: '02', title: 'Avaliação Clínica Digital', description: 'Mapeamento do seu sorriso com fotografias e planejamento estético individual.' },
      { number: '03', title: 'Execução de Excelência', description: 'Tratamento com tecnologia de ponta, conforto absoluto e acompanhamento pós-procedimento.' }
    ],
    galleryConfig: {
      enabled: true,
      badge: 'PORTFÓLIO & ESTRUTURA VIP',
      headline: 'Resultados Reais & Portfólio em Destaque',
      subtitle: 'Registros reais do nosso padrão de entrega e procedimentos odontológicos',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Transformação de Sorriso com Lentes de Porcelana',
        'Avaliação Estética Digital e Mapeamento 3D',
        'Consultório VIP Dra. Ana Freire',
        'Acabamento e Polimento de Alta Performance',
        'Clareamento Dental Laser Premium',
        'Equipamentos de Última Geração'
      ]
    },
    galleryPhotosList: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
    ],
    servicesCatalog: {
      enabled: true,
      headline: 'Procedimentos & Soluções Estéticas',
      subtitle: 'Protocolos personalizados para transformar a harmonia do seu sorriso',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Lentes de Resina Composta e Facetas',
          description: 'Correção de cor, formato e proporção dental com desgaste mínimo e resultado imediato.',
          price: 'Sob Consulta',
          duration: '⏱ 2h00',
          badge: 'MAIS PROCURADO',
          featured: true,
          image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
          imageLayout: 'thumb',
          whatsappMessage: 'Olá Dra. Ana! Gostaria de agendar uma avaliação para Lentes de Resina / Facetas.'
        },
        {
          id: 'srv-2',
          category: 'EXCLUSIVO',
          name: 'Harmonização Orofacial & Toxina Botulínica',
          description: 'Alinhamento da musculatura facial, sorriso gengival e rejuvenescimento harmônico com produtos de alta pureza.',
          price: 'A partir de R$ 1.200',
          duration: '⏱ 1h00',
          badge: 'DESTAQUE VIP',
          featured: true,
          image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
          imageLayout: 'cover',
          whatsappMessage: 'Olá Dra. Ana! Gostaria de saber mais sobre Harmonização Orofacial.'
        },
        {
          id: 'srv-3',
          category: 'TODOS',
          name: 'Clareamento Dental a Laser em Consultório',
          description: 'Remoção profunda de manchas e clareamento do esmalte com tecnologia anti-sensibilidade.',
          price: 'A partir de R$ 650',
          duration: '⏱ 1h30',
          featured: false,
          whatsappMessage: 'Olá Dra. Ana! Gostaria de agendar meu Clareamento Dental a Laser.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Edifício Trade Center - Sala 918, Boa Viagem - Recife, PE',
      hours: 'Seg a Sex · 08:30 às 18:30 | Sáb · 08:30 às 13:00',
      openStatus: 'Aberto Agora · Hora Marcada',
      mapsUrl: 'https://maps.google.com/?q=Trade+Center+Recife',
      phone: '5581987654321'
    },
    testimonialsList: [
      {
        clientName: 'Juliana Mendes de Castro',
        city: 'Recife - PE',
        text: 'O resultado das minhas lentes ficou absurdamente natural! A Dra. Ana e a equipe são atenciosas e o consultório é lindo e muito confortável.',
        rating: 5
      },
      {
        clientName: 'Carlos Eduardo Silveira',
        city: 'Olinda - PE',
        text: 'Pontualidade impecável e atendimento de primeiríssima linha. Sentir segurança no dentista faz toda a diferença.',
        rating: 5
      }
    ],
    aboutMeSection: {
      enabled: true,
      headline: 'Sobre a Dra. Ana Freire & Nosso Espaço',
      paragraph: 'Especialista em Odontologia Estética e Reabilitação Oral com mais de 11 anos de experiência clínica. Nosso consultório no Edifício Trade Center foi projetado para oferecer biossegurança rigorosa, tecnologia de ponta e acolhimento humanizado em cada consulta.',
      closingPhrase: 'Excelência, naturalidade e cuidado em cada detalhe do seu sorriso.'
    },
    faqList: [
      {
        question: 'Como funciona a primeira consulta de avaliação?',
        answer: 'Realizamos fotografias digitais em alta definição, análise do perfil facial e alinhamento das suas expectativas com planejamento prévio em mockup digital.'
      },
      {
        question: 'O procedimento de lentes de resina desgasta os dentes?',
        answer: 'Trabalhamos com a técnica de desgaste minimamente invasivo, preservando ao máximo a estrutura biológica natural do dente.'
      },
      {
        question: 'Quais são as formas de pagamento aceitas?',
        answer: 'Aceitamos Pix com condição especial à vista e cartões de crédito em até 12 vezes.'
      }
    ]
  },
  {
    slug: 'dra-camila-vasconcelos',
    name: 'Dra. Camila Vasconcelos',
    role: 'Dermatologia & Harmonização Facial Avançada',
    category: 'Estética & Saúde',
    registrationCode: 'CRM-SP 184.220',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=85',
    description: 'Presença digital impecável para dermatologia de alto padrão, valorizando naturalidade, rejuvenescimento e tratamentos com bioestimuladores e lasers.',
    features: ['Consulta Dermatológica', 'Protocolos Injetáveis', 'Clínica Itaim Bibi', 'Conformidade CFM', 'Avaliação Facial 3D'],
    link: 'https://biovip.com.br/dra-camila-vasconcelos',
    paletteId: 'bordeaux_imperial',
    typographyId: 'bodoni',
    monogram: 'CV',
    stats: { views: '18.9K', clicks: '6.1K', conversion: '32.2%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'protocolos', title: 'Protocolos & Injetáveis', description: 'Tabela de bioestimuladores de colágeno, botox e tecnologias a laser.', previewType: 'services' },
      { slug: 'resultados', title: 'Resultados Reais & Harmonia', description: 'Comparativo de antes e depois com naturalidade e elegância.', previewType: 'before_after' },
      { slug: 'agenda', title: 'Agendar Avaliação Facial', description: 'Escolha o melhor dia para sua consulta dermatológica no Itaim Bibi.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'CONSULTA DERMATOLÓGICA',
        subtitle: 'Agende seu mapeamento facial e corporal com tecnologia de ponta.',
        icon: 'calendar',
        url: 'https://wa.me/5511998887766?text=Ol%C3%A1!%20Desejo%20agendar%20uma%20consulta%20com%20a%20Dra.%20Camila%20Vasconcelos.',
        isHighlighted: true,
        highlightBadge: '⭐ MAIS ESCOLHIDO'
      },
      {
        id: 'btn-2',
        label: 'PROTOCOLOS EXCLUSIVOS',
        subtitle: 'Bioestimuladores de colágeno, lasers e harmonização sutil.',
        icon: 'sparkles',
        url: 'https://wa.me/5511998887766?text=Gostaria%20de%20conhecer%20os%20protocolos%20exclusivos'
      },
      {
        id: 'btn-3',
        label: 'LOCALIZAÇÃO CLÍNICA',
        subtitle: 'Av. Brigadeiro Faria Lima, 2800 - Itaim Bibi, São Paulo - SP',
        icon: 'map',
        url: 'https://maps.google.com/?q=Faria+Lima+2800+Itaim+Bibi'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'CONSULTORIA DERMATOLÓGICA',
      text: 'Agenda aberta para Protocolos de Injetáveis e Rejuvenescimento Facial.'
    },
    urgency: {
      enabled: true,
      headline: '🔥 VAGAS PARA O MÊS NO ITAIM BIBI',
      subtitle: 'Garanta sua consulta com mapeamento digital tridimensional:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '✨ Descobrir Protocolo Facial Ideal (Triagem Médica)',
      headline: 'Atendimento Personalizado',
      subtitle: 'Responda 3 perguntas rápidas para orientar sua avaliação:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual queixa você mais gostaria de tratar?',
          options: ['Flacidez & Estímulo de Colágeno (Sculptra/Radiesse)', 'Linhas de Expressão & Rugas (Botox)', 'Harmonização de Lábios & Malar (Ácido Hialurônico)', 'Manchas de Pele, Melasma & Textura (Lasers)']
        },
        {
          id: 'q-2',
          question: 'Já realizou procedimentos injetáveis anteriormente?',
          options: ['Sim, faço manutenção anual periódica', 'Já fiz há mais de 2 anos', 'Nunca realizei nenhum procedimento injetável']
        },
        {
          id: 'q-3',
          question: 'Qual o melhor período para seu atendimento?',
          options: ['Manhã (09h às 12h)', 'Tarde (13h às 17h)', 'Final do dia (17h às 19h30)']
        }
      ]
    },
    metricsList: [
      { value: '+4.800', label: 'PACIENTES ATENDIDOS' },
      { value: '10 anos', label: 'EXPERIÊNCIA CLÍNICA' },
      { value: '5.0★', label: 'AVALIAÇÃO NO GOOGLE' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Mapeamento Facial 3D', description: 'Análise minuciosa de proporções, camadas dérmicas e dinâmica muscular.' },
      { number: '02', title: 'Plano de Tratamento Personalizado', description: 'Definição das substâncias biocompatíveis de grau médico para resultados naturais.' },
      { number: '03', title: 'Aplicação Médica com Conforto', description: 'Procedimentos com anestesia local tópica e retorno imediato às atividades diárias.' }
    ],
        galleryPhotosList: [
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    ],
    galleryConfig: {
      enabled: true,
      badge: 'CLÍNICA MÉDICA ITAIM BIBI',
      headline: 'Estrutura Tecnológica & Procedimentos Médicos',
      subtitle: 'Ambiente planejado com tecnologia dermatológica de padrão internacional',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Consultório e Maca Clínica VIP Dra. Camila Vasconcelos',
        'Mapeamento Facial 3D e Avaliação Dérmica',
        'Bioestimuladores de Colágeno e Ácido Hialurônico de Grau Médico',
        'Tecnologia a Laser de Alta Precisão',
        'Sala Privativa de Injetáveis com Biossegurança Hospitalar',
        'Harmonização Facial Sutil e Elegante'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Protocolos & Tecnologias Médicas',
      subtitle: 'Elegância, naturalidade e segurança em dermatologia estética avançada',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Bioestimulador de Colágeno (Sculptra & Radiesse)',
          description: 'Tratamento de alto padrão que estimula a produção natural de colágeno pelo organismo por até 25 meses.',
          price: 'Sob Consulta',
          duration: '⏱ 1h00',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Dra. Camila! Gostaria de agendar avaliação para Bioestimulador de Colágeno.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Toxina Botulínica Preventiva e Reparadora (Botox)',
          description: 'Suavização natural das linhas de expressão na testa, glabela e pés de galinha, preservando sua mímica facial.',
          price: 'Sob Consulta',
          duration: '⏱ 45 min',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Dra. Camila! Gostaria de agendar aplicação de Toxina Botulínica.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Preenchimento Labial & Contorno Mandibular com Ácido Hialurônico',
          description: 'Hidratação profunda, definição de arco do cupido e volumização sutil com cânulas atraumáticas.',
          price: 'Sob Consulta',
          duration: '⏱ 1h00',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá Dra. Camila! Gostaria de saber mais sobre Preenchimento com Ácido Hialurônico.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Av. Brigadeiro Faria Lima, 2800 · Itaim Bibi, São Paulo - SP',
      hours: 'Seg a Sex · 08:30 às 19:30',
      openStatus: 'Aberto Agora · Atendimento com Hora Marcada',
      mapsUrl: 'https://maps.google.com/?q=Faria+Lima+2800+Sao+Paulo'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Ana Luiza Ferraz',
        role: 'Executiva Financeira',
        text: 'A Dra. Camila tem uma mão leve e um senso de proporção inacreditável. O resultado do bioestimulador ficou incrivelmente natural, todo mundo elogia minha pele!',
        rating: 5,
        date: 'há 1 semana',
        verified: true
      },
      {
        id: 't-2',
        name: 'Renata Albuquerque',
        role: 'Empresária',
        text: 'Consultório impecável na Faria Lima, equipe atenciosa e pontualidade exemplar. Confio de olhos fechados.',
        rating: 5,
        date: 'há 1 mês',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'A Medicina a Serviço da Sua Melhor Versão',
      bio: 'Médica dermatologista graduada pela USP com pós-graduação e títulos de especialista pelas principais sociedades do país, Dra. Camila Vasconcelos é defensora de uma estética sem exageros, priorizando o rejuvenescimento elegante.',
      quote: '"A verdadeira beleza não chama a atenção pelo excesso, mas pela harmonia e bem-estar que transmite."'
    },
    faqList: [
      {
        question: 'Os procedimentos injetáveis causam inchaço ou hematomas?',
        answer: 'Utilizamos microcânulas de ponta romba que minimizam o risco de hematomas. A maioria dos pacientes retorna ao trabalho imediatamente no mesmo dia.'
      },
      {
        question: 'Com que frequência devo realizar o bioestimulador?',
        answer: 'Geralmente recomendamos um ciclo de 1 a 2 sessões com intervalo de 45 dias, seguido por uma manutenção anual para manter a firmeza da pele.'
      }
    ]
  },
  {
    slug: 'studio-helena-beaute',
    name: 'Studio Helena Duarte',
    role: 'Salão de Beleza & Visagismo Feminino',
    category: 'Beleza & Cabelos',
    registrationCode: 'HAIR & COLOR MASTER',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site exclusivo para estúdio de beleza e visagismo feminino, destacando mechas criativas, cronograma capilar de luxo e agendamento de cadeiras VIP.',
    features: ['Menu de Mechas & Cores', 'Terapia Capilar & Spa', 'Agendamento com a Equipe', 'Localização Privilegiada', 'Antes e Depois Iluminadas'],
    link: 'https://biovip.com.br/studio-helena-beaute',
    paletteId: 'champagne_gold',
    typographyId: 'cormorant',
    monogram: 'HD',
    stats: { views: '17.4K', clicks: '5.9K', conversion: '33.9%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'menu-mechas', title: 'Menu de Mechas & Cores', description: 'Tabela de Morena Iluminada, Loiras de Luxo e Correção de Cor.', previewType: 'services' },
      { slug: 'transformacoes', title: 'Antes e Depois Iluminadas', description: 'Arraste para comparar o cabelo antes e a iluminação final impecável.', previewType: 'before_after' },
      { slug: 'reserva-cadeira', title: 'Agendamento com a Equipe', description: 'Escolha a profissional, data e reserve seu horário sem fila.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'RESERVA DE CADEIRA VIP',
        subtitle: 'Garanta seu horário exclusivo para mechas, corte e tratamento.',
        icon: 'calendar',
        url: 'https://wa.me/5511997112233?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio%20no%20Studio%20Helena.',
        isHighlighted: true,
        highlightBadge: '✨ MAIS DESEJADO'
      },
      {
        id: 'btn-2',
        label: 'MENU DE MECHAS & SPA CAPILAR',
        subtitle: 'Morena Iluminada, Loiro Saudável e Terapia com Ozônio.',
        icon: 'sparkles',
        url: 'https://wa.me/5511997112233?text=Gostaria%20de%20conhecer%20o%20menu%20de%20mechas'
      },
      {
        id: 'btn-3',
        label: 'LOCALIZAÇÃO DO STUDIO',
        subtitle: 'Rua Bela Cintra, 1820 - Jardins, São Paulo - SP',
        icon: 'map',
        url: 'https://maps.google.com/?q=Bela+Cintra+1820'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'CADEIRAS VIP ABERTAS',
      text: 'Agendamento para Mechas de Luxo, Morena Iluminada e Spa Capilar.'
    },
    urgency: {
      enabled: true,
      headline: '🔥 VAGAS DESTA SEMANA COM HELENA',
      subtitle: 'Garanta sua cadeira com teste de mecha e tratamento inclusos:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '💇‍♀️ Descobrir Tom Ideal (Triagem Capilar VIP)',
      headline: 'Consultoria de Cor & Visagismo',
      subtitle: 'Responda 3 perguntas rápidas para personalizar seu atendimento:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual transformação você sonha em realizar?',
          options: ['Morena Iluminada (Tons Quentes / Caramelo)', 'Loiro de Luxo / Blond Saudável', 'Correção de Cor / Neutralização', 'Corte com Visagismo & Tratamento Fusio-Dose']
        },
        {
          id: 'q-2',
          question: 'Seu cabelo possui alguma química recente?',
          options: ['Cabelo natural sem química', 'Apenas coloração / tonalizante', 'Progressiva / Botox recente', 'Já tenho mechas antigas']
        },
        {
          id: 'q-3',
          question: 'Qual o melhor dia para seu atendimento VIP?',
          options: ['Terça ou Quarta (mais tranquilo)', 'Quinta ou Sexta', 'Sábado dia todo']
        }
      ]
    },
    metricsList: [
      { value: '+3.500', label: 'CABELOS TRANSFORMADOS' },
      { value: '12 anos', label: 'COLORISTA SÊNIOR' },
      { value: '5.0★', label: 'AVALIAÇÃO NO GOOGLE' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Consultoria & Teste de Mecha', description: 'Avaliamos a saúde da fibra capilar e alinhamos o tom ideal para seu subtom de pele.' },
      { number: '02', title: 'Iluminação & Proteção Plex', description: 'Técnica de mechas com descolorante de baixo impacto e protetores de ligações peptídicas.' },
      { number: '03', title: 'Nutrição & Finalização Editorial', description: 'Banho de brilho, escova modelada e fotos profissionais do seu novo visual.' }
    ],
        galleryPhotosList: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80'
    ],
    galleryConfig: {
      enabled: true,
      badge: 'SALÃO VIP JARDINS',
      headline: 'Transformações de Cabelo & Espaço Helena Duarte',
      subtitle: 'Visual e resultados reais das nossas clientes nos Jardins',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Bancadas e Poltronas Exclusivas nos Jardins',
        'Morena Iluminada em Tom Avelã e Mel com Raiz Esfumada',
        'Loiro Pérola de Alta Luminosidade com Tratamento Fusio-Dose',
        'Corte Visagista em Camadas Leves e Movimento Natural',
        'Finalização com Escova Modelada e Brilho Espelhado',
        'Atendimento Personalizado e Consultoria Visagista'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Menu de Transformações & Spa Capilar',
      subtitle: 'Protocolos de mechas assinados com produtos Kérastase e L’Oréal Professionnel',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Morena Iluminada Signature (Mel, Caramelo ou Avelã)',
          description: 'Clareamento sutil e sofisticado que preserva a raiz natural e proporciona luminosidade tridimensional.',
          price: 'A partir de R$ 680',
          duration: '⏱ 3h30',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Helena! Gostaria de agendar a Morena Iluminada Signature.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Loiro de Luxo (Pearl, Vanilla & Champagne)',
          description: 'Loiro uniforme, sem marcações, com neutralização fria e reconstrução intensiva de queratina.',
          price: 'A partir de R$ 850',
          duration: '⏱ 4h00',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Helena! Gostaria de agendar o Loiro de Luxo.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Spa Capilar com Vapor de Ozônio & Fusio-Dose',
          description: 'Desintoxicação do couro cabeludo, estimulação folicular com ozonioterapia e ampola personalizada.',
          price: 'R$ 290',
          duration: '⏱ 1h15',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá Helena! Gostaria de agendar o Spa Capilar com Ozônio.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Rua Bela Cintra, 1820 · Jardins, São Paulo - SP',
      hours: 'Ter a Sáb · 09:00 às 20:00',
      openStatus: 'Aberto Agora · Agendamento com a Equipe',
      mapsUrl: 'https://maps.google.com/?q=Bela+Cintra+1820+Sao+Paulo'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Patrícia Prado',
        role: 'Diretora Criativa',
        text: 'A Helena é uma maga das mechas. Meu cabelo nunca quebrou, o tom de avelã ficou elegante e dura meses sem precisar de retoque de raiz. O salão nos Jardins é impecável!',
        rating: 5,
        date: 'há 1 semana',
        verified: true
      },
      {
        id: 't-2',
        name: 'Juliana Costa',
        role: 'Médica Dermatologista',
        text: 'Atendimento pontual, espumante gelado e profissionais de primeira linha. Saio de lá com a autoestima nas alturas sempre.',
        rating: 5,
        date: 'há 2 semanas',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'Realçando a Sofisticação da Mulher Brasileira',
      bio: 'Com mais de uma década dedicada ao visagismo feminino e colorimetria avançada nos Jardins, Helena Duarte é referência em cabelos iluminados naturais com integridade e saúde da fibra.',
      quote: '"Um cabelo bem cuidado é o cartão de visita mais potente de uma mulher segura."'
    },
    faqList: [
      {
        question: 'É necessário fazer teste de mecha antes?',
        answer: 'Sim! Priorizamos a saúde do seu fio. O teste de mecha garante que seu cabelo atinja o tom desejado com 100% de segurança.'
      },
      {
        question: 'Com que frequência preciso retocar a Morena Iluminada?',
        answer: 'Nossa técnica de raiz esfumada permite espaçar os retoques entre 5 e 8 meses sem nenhuma linha de demarcação evidente.'
      }
    ]
  },
  {
    slug: 'valeria-nails-couture',
    name: 'Valéria Siqueira',
    role: 'Nail Designer & Blindagem em Gel',
    category: 'Estética & Nails',
    registrationCode: 'MASTER NAIL DESIGNER',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site de alto padrão para nail designer especialista em alongamento em fibra de vidro, banho em gel e nail art minimalista de luxo.',
    features: ['Tabela de Alongamentos', 'Blindagem Diamante', 'Galeria de Formatos Europeus', 'Reserva de Vagas Mensais', 'Cuidados Pós-Aplicação'],
    link: 'https://biovip.com.br/valeria-nails-couture',
    paletteId: 'luxo_nude',
    typographyId: 'playfair',
    monogram: 'VS',
    stats: { views: '12.8K', clicks: '4.3K', conversion: '33.5%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'alongamentos', title: 'Alongamento em Fibra & Gel', description: 'Formatos Almond, Stiletto, Square e técnicas estruturais duradouras.', previewType: 'services' },
      { slug: 'galeria-nail-art', title: 'Galeria de Blindagens & Arte', description: 'Antes e depois de unhas roídas recuperadas com blindagem em gel.', previewType: 'before_after' },
      { slug: 'agenda-nails', title: 'Agendamento de Manutenção', description: 'Reserve sua vaga para aplicação inicial ou manutenção quinzenal.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'AGENDAMENTO DE APLICAÇÃO OU RETOQUE',
        subtitle: 'Horários exclusivos para alongamento em fibra ou blindagem em gel.',
        icon: 'calendar',
        url: 'https://wa.me/5511998223344?text=Ol%C3%A1%20Val%C3%A9ria!%20Gostaria%20de%20agendar%20minhas%20unhas.',
        isHighlighted: true,
        highlightBadge: '💎 VAGAS LIMITADAS'
      },
      {
        id: 'btn-2',
        label: 'CATÁLOGO DE FORMATOS & ARTES',
        subtitle: 'Unhas amendoadas, baby boomer e francesinha reversa de luxo.',
        icon: 'sparkles',
        url: 'https://wa.me/5511998223344?text=Quero%20ver%20o%20cat%C3%A1logo%20de%20formatos'
      },
      {
        id: 'btn-3',
        label: 'ESPAÇO ATELIER',
        subtitle: 'Av. Ibirapuera, 2035 - Sala 42 - Moema, São Paulo - SP',
        icon: 'map',
        url: 'https://maps.google.com/?q=Ibirapuera+2035'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'AGENDA NAILS ABERTA',
      text: 'Vagas para novas aplicações de Fibra de Vidro e Manutenção Russa.'
    },
    urgency: {
      enabled: true,
      headline: '🔥 VAGAS LIMITADAS PARA ESTA SEMANA',
      subtitle: 'Garanta seu horário com blindagem diamante inclusa:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '💅 Descobrir Procedimento Ideal (Triagem Nails)',
      headline: 'Atendimento Personalizado',
      subtitle: 'Responda 3 perguntas rápidas para agilizar seu agendamento:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual procedimento você deseja realizar?',
          options: ['Alongamento em Fibra de Vidro (Aplicação)', 'Manutenção de Alongamento', 'Blindagem em Gel / Banho de Diamante', 'Manicure Russa Combinada']
        },
        {
          id: 'q-2',
          question: 'Você já possui alongamento atualmente?',
          options: ['Sim, feito por outra profissional (remoção)', 'Sim, feito com a Valéria (manutenção)', 'Não, minhas unhas estão naturais']
        },
        {
          id: 'q-3',
          question: 'Qual o formato de unha que você prefere?',
          options: ['Almond (Amendoada)', 'Square (Quadrada Natural)', 'Bailarina / Coffin', 'Stiletto']
        }
      ]
    },
    metricsList: [
      { value: '+1.800', label: 'ALONGAMENTOS FEITOS' },
      { value: '6 anos', label: 'ESPECIALISTA EM FIBRAS' },
      { value: '5.0★', label: 'GOOGLE MEU NEGÓCIO' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Triagem & Escolha do Formato', description: 'Definimos o comprimento e curvatura perfeitos para a anatomia dos seus dedos.' },
      { number: '02', title: 'Preparação & Aplicação Estrutural', description: 'Cuticulagem russa sem corte e polimerização com géis hipoalergênicos importados.' },
      { number: '03', title: 'Finalização & Durabilidade', description: 'Top coat ultra brilho com garantia de resistência e brilho espelhado por até 30 dias.' }
    ],
        galleryPhotosList: [
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80'
    ],
    galleryConfig: {
      enabled: true,
      badge: 'NAIL ATELIER MOEMA',
      headline: 'Alongamentos em Fibra & Nail Art Minimalista',
      subtitle: 'Registros reais de cutilagem russa e acabamento ultrafino em gel',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Alongamento em Fibra de Vidro Silk com Formato Almond',
        'Esmaltação em Gel Nude com Brilho Diamante',
        'Nail Art Minimalista com Folhas de Ouro 24k',
        'Manicure Russa com Cuticulagem Profunda e Sem Cortes',
        'Bancada Esterilizada e Instrumentais em Autoclave',
        'Blindagem Diamante com Retenção de até 28 Dias'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Menu de Procedimentos & Alongamentos',
      subtitle: 'Técnicas estruturais finas com curvatura C natural e zero descolamento',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Alongamento em Fibra de Vidro Silk',
          description: 'Estruturação fina com espessura de unha natural, curvatura acentuada e acabamento imperceptível.',
          price: 'R$ 220',
          duration: '⏱ 2h00',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Valéria! Gostaria de agendar o Alongamento em Fibra de Vidro.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Blindagem em Gel Diamante (Banho de Gel)',
          description: 'Capa protetora sobre as unhas naturais, promovendo crescimento saudável sem quebras ou lascas.',
          price: 'R$ 130',
          duration: '⏱ 1h15',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Valéria! Gostaria de agendar a Blindagem Diamante em Gel.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Manicure Russa Combinada + Esmaltação em Gel',
          description: 'Limpeza profunda da cutícula com brocas alemãs, contorno perfeito e esmaltação que dura até 4 semanas.',
          price: 'R$ 150',
          duration: '⏱ 1h30',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá Valéria! Gostaria de agendar a Manicure Russa Combinada.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Av. Ibirapuera, 2035 - Sala 42 · Moema, São Paulo - SP',
      hours: 'Ter a Sáb · 09:00 às 19:30',
      openStatus: 'Aberto Agora · Agendamento VIP',
      mapsUrl: 'https://maps.google.com/?q=Ibirapuera+2035+Sao+Paulo'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Camila Albuquerque',
        role: 'Arquiteta',
        text: 'A Valéria é a melhor nail designer de Moema. As unhas duram quase um mês intactas e o acabamento é finíssimo, ninguém acredita que é alongamento.',
        rating: 5,
        date: 'há 2 semanas',
        verified: true
      },
      {
        id: 't-2',
        name: 'Beatriz Farias',
        role: 'Publicitária',
        text: 'A manicure russa transformou minhas cutículas. Espaço super aconchegante com café e atendimento nota mil.',
        rating: 5,
        date: 'há 1 mês',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'Precisão e Elegância nas Suas Mãos',
      bio: 'Especialista certificada pelas maiores academias da Europa em cuticulagem de precisão e fibra de vidro estruturada, Valéria Siqueira une saúde ungueal e estética minimalista.',
      quote: '"Unhas perfeitas não são um luxo eventual, são a moldura diária da sua elegância."'
    },
    faqList: [
      {
        question: 'Quanto tempo dura o alongamento em fibra de vidro?',
        answer: 'A manutenção deve ser realizada a cada 20 a 25 dias para acompanhar o crescimento da unha natural e manter o ponto de tensão seguro.'
      },
      {
        question: 'O procedimento danifica a unha natural?',
        answer: 'Não! Quando aplicado e removido por uma profissional capacitada com materiais dermatologicamente testados, a unha natural permanece saudável.'
      }
    ]
  },
  {
    slug: 'isabela-lash-studio',
    name: 'Isabela Fontes',
    role: 'Lash Designer & Micropigmentação Labial',
    category: 'Extensão de Cílios & Olhar',
    registrationCode: 'ACADEMIA LASH BRASIL',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site sofisticado para lash designer e micropigmentadora labial, com foco em efeito natural, retenção estendida e biossegurança.',
    features: ['Mapeamento do Olhar', 'Volume Russo & Fox Eyes', 'Lash Lifting com Queratina', 'Hidragloss Labial', 'Agendamento Direto'],
    link: 'https://biovip.com.br/isabela-lash-studio',
    paletteId: 'terracota_mediterraneo',
    typographyId: 'instrument',
    monogram: 'IF',
    stats: { views: '15.6K', clicks: '5.1K', conversion: '32.6%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'tecnicas-cilios', title: 'Técnicas de Cílios & Lábios', description: 'Fio a Fio clássico, Volume Híbrido, Efeito Molhado e Revitalização Labial.', previewType: 'services' },
      { slug: 'olhar-transformado', title: 'Antes e Depois do Olhar', description: 'Veja a diferença no olhar e na harmonia facial com extensões leves.', previewType: 'before_after' },
      { slug: 'reserva-lash', title: 'Agendamento & Manutenções', description: 'Garanta seu horário com isolamento acústico e poltrona reclinável.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'RESERVA DE HORÁRIO EXCLUSIVO',
        subtitle: 'Aplicação personalizada com isolamento de fios e retenção de até 30 dias.',
        icon: 'calendar',
        url: 'https://wa.me/5511999334455?text=Ol%C3%A1%20Isabela!%20Gostaria%20de%20agendar%20extens%C3%A3o%20de%20c%C3%ADlios.',
        isHighlighted: true,
        highlightBadge: '⭐ MAIS PEDIDO'
      },
      {
        id: 'btn-2',
        label: 'MAPEAMENTO DO OLHAR & TÉCNICAS',
        subtitle: 'Volume Russo, Efeito Fox Eyes, Wispy e Lash Lifting.',
        icon: 'sparkles',
        url: 'https://wa.me/5511999334455?text=Gostaria%20de%20conhecer%20as%20t%C3%A9cnicas'
      },
      {
        id: 'btn-3',
        label: 'STUDIO PRIVATIVO',
        subtitle: 'Rua Amauri, 314 - Itaim Bibi, São Paulo - SP',
        icon: 'map',
        url: 'https://maps.google.com/?q=Rua+Amauri+314'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'AGENDA CÍLIOS ABERTA',
      text: 'Novos horários para Extensão de Cílios e Micropigmentação Labial.'
    },
    urgency: {
      enabled: true,
      headline: '🔥 VAGAS DE HOJE NA POLTRONA VIP',
      subtitle: 'Agende seu horário com higienização prévia de cortesia:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '👁️ Descobrir Mapping Ideal para seu Olhar',
      headline: 'Mapeamento Personalizado',
      subtitle: 'Responda 3 perguntas rápidas para indicar a técnica ideal:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual efeito de cílios você prefere?',
          options: ['Efeito Natural / Fio a Fio Clássico', 'Efeito Molhado / Wet Lash', 'Volume Híbrido / Wispy', 'Lash Lifting (Curvatura nos próprios cílios)']
        },
        {
          id: 'q-2',
          question: 'Você já usa extensão de cílios?',
          options: ['Sim, preciso de manutenção / retoque', 'Sim, mas preciso remover o de outra profissional', 'Não, é minha primeira aplicação']
        },
        {
          id: 'q-3',
          question: 'Qual o melhor dia para sua aplicação?',
          options: ['Dias de semana pela manhã', 'Dias de semana à tarde', 'Sábado durante o dia']
        }
      ]
    },
    metricsList: [
      { value: '+2.100', label: 'OLHARES TRANSFORMADOS' },
      { value: '5 anos', label: 'EXPERIÊNCIA EXCLUSIVA' },
      { value: '5.0★', label: 'AVALIAÇÃO NO GOOGLE' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Visagismo & Mapping do Olhar', description: 'Avaliamos a curvatura ocular para definir fios que valorizam seu formato de olhos.' },
      { number: '02', title: 'Aplicação Relaxante', description: 'Poltrona reclinável ultra confortável, isolamento térmico e cola sem ardor.' },
      { number: '03', title: 'Retenção Prolongada', description: 'Fórmula de alta retenção que garante cílios preenchidos e leves por até 30 dias.' }
    ],
        galleryPhotosList: [
      'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1701285857712-48cacba95a8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1728432757040-1579d710f607?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1735151225764-eac694642dbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1674049406467-824ea37c7184?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
    ],
    galleryConfig: {
      enabled: true,
      badge: 'STUDIO PRIVATIVO ITAIM BIBI',
      headline: 'Técnicas de Cílios & Espaço Isabela Fontes',
      subtitle: 'Registros reais dos nossos atendimentos com fios de seda premium',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1701285857712-48cacba95a8f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1728432757040-1579d710f607?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1735151225764-eac694642dbf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1674049406467-824ea37c7184?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Volume Russo Imperial com Densidade e Retenção de 30 Dias',
        'Efeito Molhado (Wet Lash) com Visual Moderno e Marcante',
        'Aplicação Meticulosa com Isolamento Fio a Fio sem Ardor',
        'Técnica Fox Eyes com Alongamento dos Cantos Externos',
        'Lash Lifting com Botox Nutritivo de Queratina',
        'Poltrona Reclinável de Conforto Máximo e Isolamento Acústico'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Menu de Técnicas & Extensões',
      subtitle: 'Procedimentos executados com biossegurança e fios de seda premium',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Efeito Molhado (Wet Lash & Kim K)',
          description: 'Tendência internacional com aspecto de rímel fresco, fios unidos e visual marcante sem pesar no olhar.',
          price: 'R$ 210',
          duration: '⏱ 1h45',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Isabela! Gostaria de agendar a técnica Efeito Molhado.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Volume Híbrido & Efeito Fox Eyes',
          description: 'Combinação de fios clássicos e leques leves com alongamento nos cantos externos para efeito delineado.',
          price: 'R$ 230',
          duration: '⏱ 2h00',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Isabela! Gostaria de agendar o Volume Híbrido / Fox Eyes.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Lash Lifting com Botox de Queratina',
          description: 'Tratamento nutritivo que curva e escurece os próprios fios naturais sem necessidade de extensões.',
          price: 'R$ 160',
          duration: '⏱ 1h15',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá Isabela! Gostaria de agendar o Lash Lifting.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Rua Amauri, 314 - Itaim Bibi, São Paulo - SP',
      hours: 'Seg a Sáb · 08:30 às 19:30',
      openStatus: 'Aberto Agora · Agendamento Privativo',
      mapsUrl: 'https://maps.google.com/?q=Rua+Amauri+314+Sao+Paulo'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Mariana Duarte',
        role: 'Cirurgiã-Dentista',
        text: 'Não vivo mais sem os cílios da Isabela! A retenção é inacreditável, chego no 25º dia ainda com os cílios lindos. A poltrona é tão confortável que eu sempre durmo.',
        rating: 5,
        date: 'há 1 semana',
        verified: true
      },
      {
        id: 't-2',
        name: 'Camila Rossi',
        role: 'Influenciadora',
        text: 'O efeito molhado dela é impecável. Parece que acabei de passar a máscara mais cara do mundo. Super recomendo!',
        rating: 5,
        date: 'há 3 semanas',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'A Arte de Revelar a Beleza do Seu Olhar',
      bio: 'Com formação pelas melhores academias internacionais de extensão de cílios, Isabela Fontes é referência em técnicas leves, não invasivas e com durabilidade comprovada.',
      quote: '"O olhar é a primeira impressão da sua autoconfiança. Cuidar dele é um ritual de bem-estar."'
    },
    faqList: [
      {
        question: 'A extensão de cílios faz os fios naturais caírem?',
        answer: 'Não! Respeitamos rigorosamente o ciclo biológico de cada fio, aplicando fios de gramatura ultra leve apenas nos cílios adultos.'
      },
      {
        question: 'Posso molhar ou lavar os cílios após a aplicação?',
        answer: 'Sim! Com o nosso processo de polimerização com nanonebulizador, os cílios já saem prontos para a rotina diária sem necessidade de esperar 24 horas.'
      }
    ]
  },
  {
    slug: 'dr-rodrigo-mendonca',
    name: 'Dr. Rodrigo Mendonça',
    role: 'Direito Tributário & Planejamento Sucessório',
    category: 'Jurídico',
    registrationCode: 'OAB-SP 312.445',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site corporativo de máxima autoridade para advocacia tributária e holding familiar, focado em atendimento a empresários e famílias de alta renda.',
    features: ['Consultoria Estratégica', 'Blindagem Patrimonial', 'Defesas Fiscais', 'OAB Verificada', 'Sede na Paulista'],
    link: 'https://biovip.com.br/dr-rodrigo-mendonca',
    paletteId: 'esmeralda_nobre',
    typographyId: 'cinzel',
    monogram: 'RM',
    stats: { views: '11.5K', clicks: '3.9K', conversion: '34.0%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'atuacao', title: 'Áreas de Prática Jurídica', description: 'Planejamento sucessório, holding familiar e defesas fiscais empresariais.', previewType: 'services' },
      { slug: 'autoridade', title: 'Casos de Sucesso & Avaliações', description: 'Depoimentos de empresários e grupos familiares assessorados.', previewType: 'reviews' },
      { slug: 'reuniao-executiva', title: 'Agendar Reunião Inicial', description: 'Horários disponíveis para consulta estratégica presencial ou online.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'CONSULTORIA ESTRATÉGICA',
        subtitle: 'Reunião executiva para planejamento tributário e holdings.',
        icon: 'calendar',
        url: 'https://wa.me/5511991223344?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20reuni%C3%A3o%20com%20o%20Dr.%20Rodrigo.',
        isHighlighted: true,
        highlightBadge: '💎 EXCLUSIVO'
      },
      {
        id: 'btn-2',
        label: 'DEFESAS & RECUPERAÇÃO TRIBUTÁRIA',
        subtitle: 'Análise de passivos e recuperação de créditos de PIS/COFINS.',
        icon: 'sparkles',
        url: 'https://wa.me/5511991223344?text=Tenho%20interesse%20em%20defesas%20tribut%C3%A1rias'
      },
      {
        id: 'btn-3',
        label: 'SEDE INSTITUCIONAL',
        subtitle: 'Av. Paulista, 1000 - 15º Andar - Bela Vista, São Paulo - SP',
        icon: 'map',
        url: 'https://maps.google.com/?q=Av+Paulista+1000'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'HOLDINGS & FISCAL',
      text: 'Agenda aberta para consultoria tributária e proteção patrimonial de 2026.'
    },
    urgency: {
      enabled: true,
      headline: '⚖️ ANÁLISE FISCAL PRIORITÁRIA',
      subtitle: 'Agende uma reunião inicial de diagnóstico tributário com nossa equipe sênior:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '📋 Diagnóstico Jurídico (Triagem Empresarial)',
      headline: 'Atendimento Executivo Estratégico',
      subtitle: 'Responda 3 perguntas para direcionar o atendimento do Dr. Rodrigo Mendonça:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual o principal foco da sua demanda jurídica?',
          options: ['Planejamento Sucessório & Holding Familiar', 'Defesas em Autuações Fiscais (CARF/Judicial)', 'Recuperação de Créditos Tributários', 'Consultoria Tributária Contínua']
        },
        {
          id: 'q-2',
          question: 'Qual o porte ou faturamento anual da sua empresa / grupo?',
          options: ['Acima de R$ 50 milhões/ano', 'Entre R$ 10 e 50 milhões/ano', 'Até R$ 10 milhões/ano', 'Pessoa Física / Patrimônio Familiar']
        },
        {
          id: 'q-3',
          question: 'Qual formato de reunião é de sua preferência?',
          options: ['Presencial na Av. Paulista', 'Videoconferência sigilosa (Teams/Meet)']
        }
      ]
    },
    metricsList: [
      { value: '+R$ 180M', label: 'EM PASSIVOS REDUZIDOS' },
      { value: '16 anos', label: 'DE ATUAÇÃO TRIBUTÁRIA' },
      { value: '100%', label: 'SIGILO & ÉTICA' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Triagem & Diagnóstico Preliminar', description: 'Compreensão do cenário fiscal e patrimonial da empresa ou família com estrito sigilo profissional.' },
      { number: '02', title: 'Parecer Estratégico & Desenho', description: 'Apresentação de soluções jurídicas sólidas, amparadas na jurisprudência do STJ, STF e CARF.' },
      { number: '03', title: 'Implementação Segura & Defesa', description: 'Execução do planejamento ou condução processual combativa com relatórios executivos periódicos.' }
    ],
    galleryPhotosList: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80'
    ],
        galleryConfig: {
      enabled: true,
      badge: 'ADVOCACIA EMPRESARIAL FARIA LIMA',
      headline: 'Banca Tributária & Infraestrutura Corporativa',
      subtitle: 'Ambiente institucional projetado para negociações de alta complexidade',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Sede Institucional na Av. Brigadeiro Faria Lima - São Paulo',
        'Salas de Reunião Climatizadas para Deliberações Societárias',
        'Biblioteca Jurídica Especializada e Acervo Tributário',
        'Equipe Estratégica em Planejamento Sucessório & Holdings',
        'Acordos Fiscais Estruturados e Compliance Tributário',
        'Dr. Rodrigo Mendonça em Despacho Executivo'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Práticas Jurídicas & Soluções Tributárias',
      subtitle: 'Segurança jurídica e eficiência patrimonial para empresários e famílias',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Planejamento Sucessório & Holding Familiar',
          description: 'Estruturação societária preventiva com redução substancial de ITCMD e proteção do legado familiar.',
          price: 'Sob Consulta',
          duration: '⏱ Projeto Dedicado',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Dr. Rodrigo! Gostaria de agendar uma reunião sobre Planejamento Sucessório e Holding Familiar.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Recuperação Administrativa de Créditos Fiscais',
          description: 'Levantamento minucioso dos últimos 5 anos de tributos federais e estaduais recolhidos a maior.',
          price: 'Sob Consulta',
          duration: '⏱ Diagnóstico 15 dias',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Dr. Rodrigo! Gostaria de solicitar um diagnóstico de Recuperação de Créditos Fiscais.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Defesas Estratégicas em Autos de Infração (CARF/Judicial)',
          description: 'Representação técnica de alta complexidade em autuações milionárias perante a Receita Federal e tribunais superiores.',
          price: 'Sob Consulta',
          duration: '⏱ Acompanhamento Integral',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá Dr. Rodrigo! Preciso de atendimento urgente para defesa em Auto de Infração.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Av. Paulista, 1000 - 15º Andar · Bela Vista, São Paulo - SP',
      hours: 'Seg a Sex · 08:30 às 19:00',
      openStatus: 'Aberto Agora · Atendimento sob Agendamento',
      mapsUrl: 'https://maps.google.com/?q=Av+Paulista+1000+Sao+Paulo'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Carlos Eduardo Nogueira',
        role: 'Diretor Presidente - Grupo Logístico',
        text: 'A condução do Dr. Rodrigo no planejamento sucessório da nossa família foi impecável. Clareza técnica, agilidade e uma economia tributária decisiva para o grupo.',
        rating: 5,
        date: 'há 1 mês',
        verified: true
      },
      {
        id: 't-2',
        name: 'Mariana Junqueira',
        role: 'CFO de Indústria Farmacêutica',
        text: 'Profissional com profundo conhecimento dos tribunais superiores e postura extremamente transparente. Anulou uma autuação fiscal de R$ 8 milhões com maestria.',
        rating: 5,
        date: 'há 2 meses',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'Solidez Técnica e Visão Estratégica nos Negócios',
      bio: 'Mestre em Direito Tributário pela USP com mais de 16 anos dedicados à advocacia empresarial consultiva e contenciosa. O escritório Rodrigo Mendonça Advogados atende empresas e famílias de alta renda com foco estrito em segurança jurídica, conformidade e redução legítima de carga tributária.',
      quote: '"A segurança jurídica é o alicerce fundamental para a preservação e a expansão do patrimônio construído."'
    },
    faqList: [
      {
        question: 'Como funciona o processo de criação de uma Holding Familiar?',
        answer: 'Iniciamos com um diagnóstico detalhado da composição patrimonial e da estrutura familiar. Desenvolvemos o contrato social com cláusulas protetivas (incomunicabilidade, impenhorabilidade e usufruto) e efetuamos a integralização segura dos bens.'
      },
      {
        question: 'O escritório atende demandas fora de São Paulo?',
        answer: 'Sim. Atendemos clientes em todo o território nacional e no exterior por meio de reuniões virtuais seguras e representação direta perante tribunais estaduais e federais.'
      },
      {
        question: 'Como é garantido o sigilo das informações compartilhadas?',
        answer: 'Todo atendimento é amparado pelo Estatuto da Advocacia (Lei 8.906/94) e por acordos prévios de confidencialidade (NDA), assegurando sigilo absoluto de dados societários e fiscais.'
      }
    ]
  },
  {
    slug: 'studio-aral-arquitetura',
    name: 'Studio Aral Arquitetura',
    role: 'Projetos Residenciais & Interiores de Luxo',
    category: 'Arquitetura',
    registrationCode: 'CAU-RJ 88.420-9',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site minimalista e sofisticado para escritório de arquitetura contemporânea premiado, focado em casas em condomínios e coberturas.',
    features: ['Projetos Autorais', 'Casas em Condomínio', 'Reformas de Coberturas', 'Portfólio Leblon', 'Acompanhamento de Obras'],
    link: 'https://biovip.com.br/studio-aral-arquitetura',
    paletteId: 'monocromo_grafite',
    typographyId: 'marcellus',
    monogram: 'SA',
    stats: { views: '16.7K', clicks: '5.2K', conversion: '31.1%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'etapas-projeto', title: 'Metodologia & Etapas', description: 'Do estudo preliminar ao projeto executivo e gestão de interiores.', previewType: 'services' },
      { slug: 'obras-construidas', title: 'Antes & Depois de Reformas', description: 'Transformações completas de coberturas e casas de veraneio.', previewType: 'before_after' },
      { slug: 'briefing', title: 'Agendar Briefing de Projeto', description: 'Reserve seu horário com os sócios-arquitetos no escritório do Leblon.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'SOLICITAR PROJETO AUTORAL',
        subtitle: 'Briefing e agenda para novas residências unifamiliares.',
        icon: 'calendar',
        url: 'https://wa.me/5521998765432?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20proposta%20de%20projeto%20com%20o%20Studio%20Aral.',
        isHighlighted: true,
        highlightBadge: '⭐ MAIS ESCOLHIDO'
      },
      {
        id: 'btn-2',
        label: 'PORTFÓLIO DE OBRAS RECENTES',
        subtitle: 'Conheça nossas residências construídas em Angra e Barra.',
        icon: 'sparkles',
        url: 'https://wa.me/5521998765432?text=Gostaria%20de%20ver%20o%20portf%C3%B3lio%20completo'
      },
      {
        id: 'btn-3',
        label: 'ESCRITÓRIO LEBLON',
        subtitle: 'Av. Ataulfo de Paiva, 650 - Leblon, Rio de Janeiro - RJ',
        icon: 'map',
        url: 'https://maps.google.com/?q=Ataulfo+de+Paiva+650'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'PROJETOS 2026',
      text: 'Agenda aberta para novos projetos residenciais e reformas de alto padrão.'
    },
    urgency: {
      enabled: true,
      headline: '🏛️ VAGAS LIMITADAS DE PROJETO',
      subtitle: 'Atendimento exclusivo com os sócios-arquitetos para início imediato:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '📐 Briefing Rápido de Projeto (Triagem VIP)',
      headline: 'Arquitetura Autoral Exclusiva',
      subtitle: 'Responda 3 perguntas para alinharmos o briefing do seu projeto:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual o tipo de projeto que você planeja?',
          options: ['Construção de Casa em Condomínio', 'Reforma de Cobertura / Apartamento', 'Arquitetura de Interiores Completa', 'Projeto Comercial / Corporativo']
        },
        {
          id: 'q-2',
          question: 'Em qual região o imóvel está localizado?',
          options: ['Zona Sul do Rio (Leblon, Ipanema, Gávea)', 'Barra da Tijuca / Recreio', 'Angra dos Reis / Região Serrana', 'Outra cidade / estado']
        },
        {
          id: 'q-3',
          question: 'Qual a previsão desejada para início da obra?',
          options: ['Imediato (próximos 30 dias)', 'Próximos 3 a 6 meses', 'Fase inicial de planejamento']
        }
      ]
    },
    metricsList: [
      { value: '+65', label: 'CASAS CONSTRUÍDAS' },
      { value: '12 anos', label: 'DE DESIGN AUTORAL' },
      { value: '8 Prêmios', label: 'DE ARQUITETURA' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Imersão no Terreno & Briefing', description: 'Reunião no Leblon para mapear a rotina da família, insolação, ventilação e estilo de vida.' },
      { number: '02', title: 'Conceito 3D & Realidade Virtual', description: 'Apresentação volumétrica realista com escolha de materiais nobres, iluminação e texturas.' },
      { number: '03', title: 'Detalhamento Executivo & Gestão', description: 'Projetos complementares, compatibilização BIM e acompanhamento rigoroso no canteiro de obras.' }
    ],
    galleryPhotosList: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
    ],
        galleryConfig: {
      enabled: true,
      badge: 'PORTFÓLIO RESIDENCIAL DE ALTO PADRÃO',
      headline: 'Obras Construídas & Interiores de Luxo',
      subtitle: 'Registros fotográficos dos projetos entregues pelo Studio Aral',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Living Integrado com Pé-Direito Duplo e Iluminação Cênica',
        'Fachada Contemporânea em Concreto Aparente e Madeira Cumaru',
        'Área Gourmet com Ilha em Mármore Michelangelo e Churrasqueira',
        'Suíte Master com Marcenaria Autoral e Vista Panorâmica',
        'Piscina com Borda Infinita e Paisagismo Tropical Integrado',
        'Residência Alphaville: 750m² de Arquitetura de Vanguarda'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Escopos de Projeto & Gestão de Obra',
      subtitle: 'Arquitetura contemporânea que une estética tropical, conforto e sustentabilidade',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Projeto Arquitetônico Residencial Completo',
          description: 'Desenvolvimento integral da casa: volumetria, layout, aprovação legal e detalhamento de execução.',
          price: 'Sob Consulta',
          duration: '⏱ 3 a 5 meses',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de solicitar uma proposta para Projeto Arquitetônico Residencial com o Studio Aral.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Design de Interiores & Marcenaria Autoral',
          description: 'Seleção minuciosa de mobiliário assinado, curadoria de arte, luminotécnica e marcenaria sob medida.',
          price: 'Sob Consulta',
          duration: '⏱ 2 a 3 meses',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de informações sobre Design de Interiores com o Studio Aral.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Acompanhamento & Gestão Técnica da Obra',
          description: 'Visitas técnicas semanais, alinhamento com construtores e garantia da fidelidade ao projeto original.',
          price: 'Sob Consulta',
          duration: '⏱ Durante toda a obra',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de saber mais sobre a Gestão de Obras com o Studio Aral.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Av. Ataulfo de Paiva, 650 · Leblon, Rio de Janeiro - RJ',
      hours: 'Seg a Sex · 09:00 às 18:30',
      openStatus: 'Aberto Agora · Agendamento Privativo',
      mapsUrl: 'https://maps.google.com/?q=Ataulfo+de+Paiva+650+Leblon'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Roberto & Fernanda Albuquerque',
        role: 'Proprietários de Residência em Angra',
        text: 'O Studio Aral capturou perfeitamente nossa visão. A casa em Angra tem uma iluminação natural espetacular e a integração da varanda com o mar ficou perfeita.',
        rating: 5,
        date: 'há 1 mês',
        verified: true
      },
      {
        id: 't-2',
        name: 'Beatriz Vasconcelos',
        role: 'Proprietária de Cobertura no Leblon',
        text: 'Nossa reforma foi entregue exatamente dentro do prazo e com acabamento de altíssimo nível. A marcenaria autoral fez toda a diferença.',
        rating: 5,
        date: 'há 3 meses',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'Arquitetura que Conecta Pessoas e Natureza',
      bio: 'Fundado pelos arquitetos Arthur Prado e Rafael Alencar, formados pela FAU-UFRJ com especializações em Milão, o Studio Aral alia o modernismo carioca à eficiência contemporânea, criando espaços atemporais com luz, ventilação cruzada e materiais naturais.',
      quote: '"Uma boa arquitetura não impõe sua forma à paisagem; ela a acolhe e transforma o morar em um ato de prazer diário."'
    },
    faqList: [
      {
        question: 'O escritório atende projetos fora do Rio de Janeiro?',
        answer: 'Sim, desenvolvemos residências no interior de São Paulo, Região Serrana, litoral norte e exterior, utilizando vistorias pontuais e acompanhamento digital integrado.'
      },
      {
        question: 'O Studio Aral também indica construtoras e fornecedores?',
        answer: 'Sim. Possuímos uma rede consolidada de construtoras parceiras, marmorarias, marceneiros e fornecedores de alto padrão testados e aprovados ao longo de anos.'
      },
      {
        question: 'Como é feita a apresentação visual do projeto?',
        answer: 'Utilizamos maquetes eletrônicas em 3D fotorrealistas e passeios imersivos em realidade virtual para que você visualize cada ambiente antes de assentar o primeiro tijolo.'
      }
    ]
  },
  {
    slug: 'dr-lucas-bicalho',
    name: 'Dr. Lucas Bicalho',
    role: 'Nutrólogo & Performance Humana',
    category: 'Saúde & Performance',
    registrationCode: 'CRM-MG 78.910',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site de alto impacto para médico nutrólogo especialista em longevidade saudável, reposição hormonal, atletas e emagrecimento definitivo.',
    features: ['Bioimpedância InBody', 'Reposição Hormonal', 'Protocolos Esportivos', 'Acompanhamento VIP', 'Clínica Lourdes BH'],
    link: 'https://biovip.com.br/dr-lucas-bicalho',
    paletteId: 'noturno_vibrante',
    typographyId: 'dm_serif',
    monogram: 'LB',
    stats: { views: '21.3K', clicks: '7.8K', conversion: '36.6%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'programas', title: 'Programas de Performance', description: 'Check-up metabólico, protocolo de hipertrofia e emagrecimento saudável.', previewType: 'services' },
      { slug: 'transformacoes', title: 'Evolução de Pacientes', description: 'Composição corporal e antes/depois de exames de bioimpedância.', previewType: 'before_after' },
      { slug: 'consulta', title: 'Agendamento Nutrológico', description: 'Escolha data e horário para consulta presencial em Lourdes BH.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'AVALIAÇÃO METABÓLICA VIP',
        subtitle: 'Exames detalhados de precisão, plano alimentar e modulação.',
        icon: 'calendar',
        url: 'https://wa.me/5531991390202?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20com%20o%20Dr.%20Lucas%20Bicalho.',
        isHighlighted: true,
        highlightBadge: '🔥 MAIS POPULAR'
      },
      {
        id: 'btn-2',
        label: 'PROGRAMAS DE EMAGRECIMENTO & PERFORMANCE',
        subtitle: 'Acompanhamento multidisciplinar para resultados duradouros.',
        icon: 'sparkles',
        url: 'https://wa.me/5531991390202?text=Quero%20conhecer%20os%20programas%20de%20emagrecimento'
      },
      {
        id: 'btn-3',
        label: 'CONSULTÓRIO LOURDES',
        subtitle: 'Rua Marília de Dirceu, 220 - Lourdes, Belo Horizonte - MG',
        icon: 'map',
        url: 'https://maps.google.com/?q=Marilia+de+Dirceu+220+Lourdes'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'AGENDA MÉDICA',
      text: 'Consultas abertas para Avaliação Metabólica e Performance Humana.'
    },
    urgency: {
      enabled: true,
      headline: '⚡ VAGAS DA SEMANA COM DR. LUCAS',
      subtitle: 'Agende sua consulta com bioimpedância InBody incluída:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '🎯 Mapeamento de Metas (Triagem Nutrológica)',
      headline: 'Medicina de Precisão & Performance',
      subtitle: 'Responda 3 perguntas rápidas para personalizarmos seu atendimento:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual é o seu objetivo prioritário hoje?',
          options: ['Emagrecimento Definitivo & Composição Corporal', 'Hipertrofia Muscular & Performance Atlética', 'Longevidade & Reposição Hormonal', 'Tratamento de Fadiga Crônica & Disbiose']
        },
        {
          id: 'q-2',
          question: 'Você já realizou exames de sangue ou bioimpedância recentemente?',
          options: ['Sim, nos últimos 3 meses', 'Sim, há mais de 6 meses', 'Não, gostaria de realizar no consultório']
        },
        {
          id: 'q-3',
          question: 'Como deseja realizar sua consulta médica?',
          options: ['Presencial no Consultório Lourdes (BH)', 'Telemedicina VIP com envio de guia de exames']
        }
      ]
    },
    metricsList: [
      { value: '+3.500', label: 'PACIENTES TRANSFORMADOS' },
      { value: '10 anos', label: 'DE MEDICINA DE PRECISÃO' },
      { value: '5.0★', label: 'AVALIAÇÃO NO GOOGLE' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Bioimpedância InBody & Anamnese', description: 'Mapeamento minucioso de massa magra, gordura visceral, taxa metabólica e hábitos de vida.' },
      { number: '02', title: 'Painel Hormonal & Suplementação', description: 'Investigação laboratorial de mais de 60 marcadores biológicos com prescrição individualizada.' },
      { number: '03', title: 'Acompanhamento Contínuo', description: 'Consultas periódicas de retorno, ajustes no plano alimentar e suporte próximo via WhatsApp da clínica.' }
    ],
    galleryPhotosList: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80'
    ],
        galleryConfig: {
      enabled: true,
      badge: 'CONSULTÓRIO MÉDICO & PERFORMANCE',
      headline: 'Estrutura Clínica & Avaliação Metabólica',
      subtitle: 'Tecnologia avançada em medicina integrativa e nutrologia desportiva',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Consultório de Nutrologia e Performance no Vila da Serra',
        'Balança de Bioimpedância Segmentar InBody de Grau Médico',
        'Análise de Biomarcadores Metabólicos e Otimização Hormonal',
        'Dr. Lucas Bicalho em Avaliação Antropométrica Detalhada',
        'Protocolo de Emagrecimento Saudável e Preservação de Massa Magra',
        'Ambiente Clínico com Acolhimento Humanizado e Conforto'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Protocolos Médicos & Avaliações de Precisão',
      subtitle: 'Nutrologia funcional voltada para resultados reais, energia e saúde preventiva',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Consulta Nutrológica + Bioimpedância InBody',
          description: 'Diagnóstico metabólico completo com aferição corporal e prescrição de suplementação manipulada.',
          price: 'Sob Consulta',
          duration: '⏱ 1h30',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de agendar a Consulta Nutrológica com o Dr. Lucas Bicalho.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Protocolo de Emagrecimento Metabólico',
          description: 'Combinação de modulação de saciedade, controle glicêmico e preservação de massa muscular magra.',
          price: 'Sob Consulta',
          duration: '⏱ Ciclo 90 dias',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de informações sobre o Protocolo de Emagrecimento do Dr. Lucas.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Otimização Hormonal & Performance Atlética',
          description: 'Ajuste de eixo hormonal, melhora de sono, disposição e recuperação muscular para treinos intensos.',
          price: 'Sob Consulta',
          duration: '⏱ Acompanhamento VIP',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de agendar avaliação para Performance e Modulação Hormonal.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Rua Marília de Dirceu, 220 · Lourdes, Belo Horizonte - MG',
      hours: 'Seg a Sex · 08:00 às 20:00',
      openStatus: 'Aberto Agora · Atendimento com Hora Marcada',
      mapsUrl: 'https://maps.google.com/?q=Marilia+de+Dirceu+220+Lourdes+Belo+Horizonte'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Guilherme Rezende',
        role: 'Atleta Amador de Triathlon',
        text: 'O acompanhamento com o Dr. Lucas mudou meu rendimento no esporte. Baixei meu percentual de gordura de 19% para 11% sem perder massa muscular e com muito mais energia nos treinos.',
        rating: 5,
        date: 'há 3 semanas',
        verified: true
      },
      {
        id: 't-2',
        name: 'Fabiana Castelo Branco',
        role: 'Empresária',
        text: 'Melhor médico nutrólogo de BH. Minha disposição diária voltou após o ajuste hormonal e dos nutrientes. Clínica maravilhosa em Lourdes.',
        rating: 5,
        date: 'há 1 mês',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'A Ciência da Nutrologia a Favor da Sua Vitalidade',
      bio: 'Médico nutrólogo membro da ABRAN (Associação Brasileira de Nutrologia), Dr. Lucas Bicalho atua na intersecção entre medicina preventiva, fisiologia do exercício e regulação metabólica para proporcionar saúde e alta performance aos seus pacientes.',
      quote: '"Não tratamos apenas números de exames: otimizamos a bioquímica do seu corpo para que você viva no seu ápice de rendimento e disposição."'
    },
    faqList: [
      {
        question: 'O exame de bioimpedância InBody está incluso na consulta?',
        answer: 'Sim! A avaliação detalhada na balança tetrapolar InBody de alta precisão é realizada durante a própria consulta médica no consultório.'
      },
      {
        question: 'O Dr. Lucas atende por planos de saúde?',
        answer: 'O atendimento é estritamente particular para assegurar consultas longas e individualizadas de até 1h30, fornecemos recibo detalhado para solicitação de reembolso junto ao seu convênio.'
      },
      {
        question: 'Como funciona o acompanhamento após a primeira consulta?',
        answer: 'O paciente conta com canal direto de suporte da equipe de enfermagem e nutrição no WhatsApp para tirar dúvidas sobre exames, receitas e manipulação.'
      }
    ]
  },
  {
    slug: 'carolina-mendes-psi',
    name: 'Carolina Mendes',
    role: 'Psicanalista & Saúde Mental',
    category: 'Psicologia & Terapia',
    registrationCode: 'CRP-05 44.890',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site acolhedor e sereno para psicanalista com foco em ansiedade, burnout, luto e desenvolvimento pessoal. Atendimento sigiloso no Jardins.',
    features: ['Sessão Presencial / Online', 'Atendimento Sigiloso', 'Abordagem Freudiana & Lacaniana', 'Espaço Jardins', 'CRP Regular'],
    link: 'https://biovip.com.br/carolina-mendes-psi',
    paletteId: 'champagne_gold',
    typographyId: 'cormorant',
    monogram: 'CM',
    stats: { views: '9.8K', clicks: '3.4K', conversion: '34.7%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'modalidades', title: 'Modalidades & Abordagem', description: 'Psicanálise individual, acolhimento de ansiedade e desenvolvimento pessoal.', previewType: 'services' },
      { slug: 'depoimentos', title: 'Avaliações & Experiências', description: 'Depoimentos autorizados sobre a jornada terapêutica.', previewType: 'reviews' },
      { slug: 'primeira-sessao', title: 'Agendar Sessão Inicial', description: 'Horários sigilosos para atendimento presencial nos Jardins ou online.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'SESSÃO DE ACOLHIMENTO',
        subtitle: 'Agende uma primeira entrevista terapêutica com privacidade.',
        icon: 'calendar',
        url: 'https://wa.me/5511993445566?text=Ol%C3%A1%20Carolina!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20sess%C3%B5es%20de%20an%C3%A1lise.',
        isHighlighted: true,
        highlightBadge: '⭐ MAIS ESCOLHIDO'
      },
      {
        id: 'btn-2',
        label: 'SOBRE A METODOLOGIA TERAPÊUTICA',
        subtitle: 'Saiba como a psicanálise transforma padrões de ansiedade e repetição.',
        icon: 'sparkles',
        url: 'https://wa.me/5511993445566?text=Gostaria%20de%20saber%20mais%20sobre%20o%20tratamento'
      },
      {
        id: 'btn-3',
        label: 'ESPAÇO TERAPÊUTICO JARDINS',
        subtitle: 'Rua Oscar Freire, 379 - Jardins, São Paulo - SP',
        icon: 'map',
        url: 'https://maps.google.com/?q=Oscar+Freire+379'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'SESSÕES ACOLHIMENTO',
      text: 'Vagas para atendimento psicanalítico presencial nos Jardins ou online.'
    },
    urgency: {
      enabled: true,
      headline: '🌱 INICIE SUA JORNADA DE AUTOCONHECIMENTO',
      subtitle: 'Horários para primeiras sessões com sigilo absoluto:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '💬 Triagem de Acolhimento Sigiloso',
      headline: 'Espaço de Escuta & Autocuidado',
      subtitle: 'Responda 3 perguntas breves para direcionarmos sua primeira sessão:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual o principal motivo que o leva a buscar análise hoje?',
          options: ['Ansiedade intensa ou crises de pânico', 'Burnout profissional e exaustão', 'Dificuldades nos relacionamentos afetivos', 'Luto, separação ou transição de vida']
        },
        {
          id: 'q-2',
          question: 'Você já realizou processo psicoterápico ou psicanálise anteriormente?',
          options: ['Sim, por mais de 1 ano', 'Sim, por curto período', 'Não, será minha primeira experiência']
        },
        {
          id: 'q-3',
          question: 'Qual a modalidade de atendimento de sua preferência?',
          options: ['Presencial no Consultório Jardins (SP)', 'Online por videochamada criptografada']
        }
      ]
    },
    metricsList: [
      { value: '+800', label: 'HORAS DE ANÁLISE CLÍNICA' },
      { value: '9 anos', label: 'DE FORMAÇÃO CONTÍNUA' },
      { value: '100%', label: 'SIGILO ÉTICO' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Primeira Entrevista de Acolhimento', description: 'Encontro inicial para escuta da sua demanda, entendimento do momento e alinhamento do enquadre.' },
      { number: '02', title: 'Frequência Regular & Espaço Seguro', description: 'Sessões semanais em ambiente protegido, livre de julgamentos, permitindo a livre associação.' },
      { number: '03', title: 'Ressignificação & Autonomia', description: 'Compreensão profunda das causas do sofrimento e fortalecimento da sua capacidade de escolha.' }
    ],
    galleryPhotosList: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
    ],
        galleryConfig: {
      enabled: true,
      badge: 'ESPAÇO TERAPÊUTICO ACOLHEDOR',
      headline: 'Consultório de Psicanálise & Saúde Mental',
      subtitle: 'Ambiente calmo, privativo e seguro para escuta clínica humanizada',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Consultório com Poltrona e Divã em Iluminação Suave',
        'Acervo de Psicanálise Freudiana e Lacaniana',
        'Espaço de Conforto e Café para Espera Tranquila',
        'Carolina Mendes em Atendimento Presencial e Online',
        'Ambiente Livre de Ruídos com Isolamento Acústico',
        'Espaço Verde Integrado para Descompressão e Bem-Estar'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Modalidades de Atendimento Clínico',
      subtitle: 'Espaço humanizado para elaboração psíquica e desenvolvimento pessoal',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Psicanálise Individual (Presencial / Online)',
          description: 'Sessões voltadas para aprofundamento do inconsciente, manejo de angústias e padrões repetitivos.',
          price: 'Sob Consulta',
          duration: '⏱ 50 min',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Carolina! Gostaria de agendar uma sessão inicial de Psicanálise Individual.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Acolhimento Crítico para Burnout e Estresse Executivo',
          description: 'Intervenção clínica focada no esgotamento mental e reconfiguração de limites entre vida e trabalho.',
          price: 'Sob Consulta',
          duration: '⏱ 50 min',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá Carolina! Gostaria de agendar uma consulta focada em Burnout e estresse.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Terapia para Crises de Vida & Transições',
          description: 'Suporte estruturado para processos de divórcio, luto, mudanças de carreira e maturidade emocional.',
          price: 'Sob Consulta',
          duration: '⏱ 50 min',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá Carolina! Gostaria de saber mais sobre as sessões de transição e elaboração de crises.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Rua Oscar Freire, 379 · Jardins, São Paulo - SP',
      hours: 'Seg a Sex · 08:00 às 20:30',
      openStatus: 'Aberto Agora · Atendimento com Sigilo Absoluto',
      mapsUrl: 'https://maps.google.com/?q=Oscar+Freire+379+Sao+Paulo'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Paciente em Análise (Depoimento Autorizado)',
        role: 'Executiva de Tecnologia',
        text: 'A escuta da Carolina é atenta, firme e profundamente acolhedora. Encontrei no consultório um espaço de respiro genuíno no meio do caos profissional.',
        rating: 5,
        date: 'há 1 mês',
        verified: true
      },
      {
        id: 't-2',
        name: 'Paciente em Análise (Depoimento Autorizado)',
        role: 'Arquiteto',
        text: 'O processo psicanalítico me ajudou a sair de um quadro crônico de ansiedade que me travava há anos. Sou muito grato pela conduta ética e sensibilidade da Carolina.',
        rating: 5,
        date: 'há 2 meses',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'A Escuta que Transforma o Sofrimento em Sentido',
      bio: 'Psicanalista clínica formada pela PUC-SP com especialização em Psicopatologia e Estudos Lacanianos pelo Instituto Sedes Sapientiae. Carolina Mendes dedica sua prática clínica à escuta singular das dores contemporâneas, oferecendo um refúgio acolhedor nos Jardins.',
      quote: '"Olhar para dentro não é fraqueza: é a decisão mais corajosa que uma pessoa pode tomar pela própria liberdade."'
    },
    faqList: [
      {
        question: 'O atendimento online tem a mesma eficácia que o presencial?',
        answer: 'Sim! A clínica psicanalítica online consolidou-se mundialmente como uma via plenamente eficaz, desde que o paciente esteja em um ambiente privado e com boa conexão.'
      },
      {
        question: 'Qual a periodicidade das sessões?',
        answer: 'Para que o processo analítico tenha sustentação e continuidade, as sessões ocorrem com frequência mínima de uma vez por semana.'
      },
      {
        question: 'O sigilo terapêutico é garantido?',
        answer: 'Rigorasamente garantido pelo Código de Ética Profissional do Psicólogo e pelos preceitos éticos fundamentais da Psicanálise.'
      }
    ]
  },
  {
    slug: 'vittae-fisioterapia',
    name: 'Instituto Vittae',
    role: 'Fisioterapia Especializada & Recovery',
    category: 'Saúde & Reabilitação',
    registrationCode: 'CREFITO-3 19.800',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site tecnológico para centro de reabilitação ortopédica, fisioterapia da coluna e recovery de atletas profissionais em Moema.',
    features: ['Tratamento de Coluna', 'Recovery Esportivo', 'Liberação Miofascial', 'Pilates Clínico', 'Unidade Moema'],
    link: 'https://biovip.com.br/vittae-fisioterapia',
    paletteId: 'safira_noir',
    typographyId: 'playfair',
    monogram: 'IV',
    stats: { views: '13.4K', clicks: '4.5K', conversion: '33.5%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'tratamentos', title: 'Tratamentos de Coluna & Dor', description: 'Fisioterapia traumato-ortopédica, liberação miofascial e recovery esportivo.', previewType: 'services' },
      { slug: 'reabilitacao', title: 'Casos Clínicos & Recuperação', description: 'Evolução de mobilidade e postura de atletas e pacientes ortopédicos.', previewType: 'before_after' },
      { slug: 'avaliacao', title: 'Agendar Avaliação Biomecânica', description: 'Reserve seu horário com a equipe de fisioterapeutas em Moema.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'AGENDAR AVALIAÇÃO DE COLUNA',
        subtitle: 'Diagnóstico computadorizado de dor e alívio imediato.',
        icon: 'calendar',
        url: 'https://wa.me/5511994556677?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20no%20Instituto%20Vittae.',
        isHighlighted: true,
        highlightBadge: '⭐ MAIS ESCOLHIDO'
      },
      {
        id: 'btn-2',
        label: 'RECOVERY ESPORTIVO & ATLETAS',
        subtitle: 'Botas de compressão, crioterapia e eletroestimulação.',
        icon: 'sparkles',
        url: 'https://wa.me/5511994556677?text=Quero%20conhecer%20o%20recovery%20esportivo'
      },
      {
        id: 'btn-3',
        label: 'UNIDADE MOEMA',
        subtitle: 'Alameda dos Maracatins, 1200 - Moema, São Paulo - SP',
        icon: 'map',
        url: 'https://maps.google.com/?q=Maracatins+1200'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'RECOVERY & COLUNA',
      text: 'Horários abertos para avaliação biomecânica e alívio de dores crônicas.'
    },
    urgency: {
      enabled: true,
      headline: '⚡ ALÍVIO DA DOR IMEDIATO',
      subtitle: 'Agende sua avaliação com termografia e liberação miofascial:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '🩺 Mapeamento da Sua Dor (Triagem de Coluna)',
      headline: 'Reabilitação & Fisioterapia Avançada',
      subtitle: 'Responda 3 perguntas para triagem com nossos fisioterapeutas especialistas:',
      questions: [
        {
          id: 'q-1',
          question: 'Onde está localizada sua principal queixa ou dor?',
          options: ['Coluna Lombar / Ciático / Hérnia de Disco', 'Cervical / Pescoço / Ombros travados', 'Joelho / Tornozelo / Lesão Esportiva', 'Recovery muscular pós-treino intenso']
        },
        {
          id: 'q-2',
          question: 'Há quanto tempo você convive com esse incômodo?',
          options: ['Dor aguda recente (menos de 15 dias)', 'Dor moderada (1 a 6 meses)', 'Dor crônica persistente (mais de 6 meses)']
        },
        {
          id: 'q-3',
          question: 'Qual o seu objetivo principal no Instituto Vittae?',
          options: ['Alívio rápido da crise de dor', 'Reabilitação com Pilates Clínico e fortalecimento', 'Recovery esportivo e recuperação muscular rápida']
        }
      ]
    },
    metricsList: [
      { value: '+5.000', label: 'SESSÕES DE FISIOTERAPIA' },
      { value: '12 anos', label: 'ESPECIALISTAS EM COLUNA' },
      { value: '4.9★', label: 'AVALIAÇÕES REAIS' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Avaliação Biomecânica & Termografia', description: 'Diagnóstico por imagem térmica e testes posturais para identificar a causa raiz da sua dor.' },
      { number: '02', title: 'Terapia Manual & Alívio Imediato', description: 'Descompressão vertebral, liberação miofascial instrumental e dry needling em ambiente clínico estéril.' },
      { number: '03', title: 'Estabilização & Prevenção de Recidivas', description: 'Exercícios específicos de CORE e mobilidade com Pilates Clínico para blindar sua coluna.' }
    ],
    galleryPhotosList: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80'
    ],
        galleryConfig: {
      enabled: true,
      badge: 'INSTITUTO VITTAE RECOVERY',
      headline: 'Reabilitação Fisioterapêutica & Recovery',
      subtitle: 'Estrutura completa para tratamento de coluna, dor e performance esportiva',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Sala de Avaliação Biomecânica e Termografia Computadorizada',
        'Maca de Tração e Descompressão para Hérnia de Disco',
        'Circuito de Recovery com Botas Pneumáticas de Compressão',
        'Estúdio de Pilates Clínico com Equipamentos Reformer e Cadillac',
        'Área de Fisioterapia Manual e Liberação Miofascial',
        'Equipe Multidisciplinar Especializada em Coluna e Reabilitação'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Tratamentos Especializados & Recovery',
      subtitle: 'Tecnologia de ponta em fisioterapia ortopédica e performance esportiva',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Protocolo Não-Cirúrgico de Coluna & Hérnia de Disco',
          description: 'Descompressão espinhal com tração computadorizada, terapia manual e alívio da dor ciática.',
          price: 'Sob Consulta',
          duration: '⏱ 1h00',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de agendar uma Avaliação de Coluna no Instituto Vittae.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Circuito Recovery Esportivo para Atletas',
          description: 'Botas de compressão pneumática NormaTec, banheira de imersão no gelo e liberação miofascial.',
          price: 'Sob Consulta',
          duration: '⏱ 1h15',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de agendar uma sessão de Recovery Esportivo no Instituto Vittae.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Pilates Clínico Individual com Fisioterapeuta',
          description: 'Aulas exclusivas 1 para 1 nos aparelhos originais focadas em reabilitação postural e fortalecimento.',
          price: 'Sob Consulta',
          duration: '⏱ 50 min',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de informações sobre o Pilates Clínico no Instituto Vittae.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Alameda dos Maracatins, 1200 · Moema, São Paulo - SP',
      hours: 'Seg a Sex · 07:00 às 21:00 | Sáb · 08:00 às 13:00',
      openStatus: 'Aberto Agora · Agendamento VIP',
      mapsUrl: 'https://maps.google.com/?q=Maracatins+1200+Moema+Sao+Paulo'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Alexandre Bonfim',
        role: 'Triatleta Amador',
        text: 'O recovery do Instituto Vittae me salvou no ciclo de treinos para o Ironman. As pernas se recuperam em metade do tempo com as botas de compressão e a liberação manual.',
        rating: 5,
        date: 'há 2 semanas',
        verified: true
      },
      {
        id: 't-2',
        name: 'Patrícia Guimarães',
        role: 'Advogada',
        text: 'Cheguei travada com uma crise severa de hérnia lombar. Após a primeira sessão com descompressão já saí andando sem dor. Equipe fantástica em Moema.',
        rating: 5,
        date: 'há 1 mês',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'Movimento Livre de Dor: Nossa Missão',
      bio: 'O Instituto Vittae é um centro integrado de fisioterapia ortopédica, desportiva e recuperação musculoesquelética. Sob direção clínica de fisioterapeutas com pós-graduação na Santa Casa de São Paulo, aliamos equipamentos de alta tecnologia a um atendimento humano e individualizado.',
      quote: '"O corpo humano foi feito para o movimento pleno. Nosso compromisso é devolver sua autonomia e qualidade de vida."'
    },
    faqList: [
      {
        question: 'O atendimento de fisioterapia é individualizado?',
        answer: 'Sim! No Instituto Vittae você é atendido exclusivamente por um fisioterapeuta dedicado durante toda a sessão, sem divisão de horários com outros pacientes.'
      },
      {
        question: 'Vocês emitem recibo para reembolso do plano de saúde?',
        answer: 'Sim, fornecemos laudo fisioterapêutico completo e recibo com número de CREFITO para que você solicite o reembolso das sessões junto ao seu convênio.'
      },
      {
        question: 'Preciso levar exames de ressonância ou raio-X na primeira consulta?',
        answer: 'Se possuir exames recentes de imagem, recomendamos trazê-los para complementar a avaliação clínica biomecânica realizada na clínica.'
      }
    ]
  },
  {
    slug: 'dom-pedro-barbearia',
    name: 'Dom Pedro Barbearia',
    role: 'Barbearia Nobre & Visagismo Masculino',
    category: 'Beleza & Estilo',
    registrationCode: 'MEMBRO VIP ABRAM',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site vintage e de luxo para barbearia tradicional de alto padrão, combinando corte navalhado, toalha quente, whisky bar e charutaria.',
    features: ['Visagismo Masculino', 'Barba Terapia com Ozônio', 'Whisky & Café Bar', 'Agendamento Direto', 'Cerqueira César'],
    link: 'https://biovip.com.br/dom-pedro-barbearia',
    paletteId: 'terroso_artesanal',
    typographyId: 'bebas',
    monogram: 'DP',
    stats: { views: '24.8K', clicks: '9.2K', conversion: '37.1%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'servicos', title: 'Tabela de Cortes & Barba', description: 'Cortes com visagismo, barboterapia tradicional e hidratação com ozônio.', previewType: 'services' },
      { slug: 'transformacoes', title: 'Visagismo Antes e Depois', description: 'Alinhamento de barba, transição de corte e contorno capilar.', previewType: 'before_after' },
      { slug: 'agenda-barbeiro', title: 'Escolha Barbeiro & Horário', description: 'Agendamento rápido sem espera com cerveja ou café de cortesia.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'CORTE & BARBA COM VISAGISMO',
        subtitle: 'Harmonização de corte e barba com toalha quente e massagem.',
        icon: 'calendar',
        url: 'https://wa.me/5531991390202?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio%20na%20Dom%20Pedro.',
        isHighlighted: true,
        highlightBadge: '🔥 MAIS POPULAR',
        badgeText: 'MAIS PEDIDO',
        ctaActionText: 'AGENDAR CADEIRA',
        cardImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80',
        imagePosition: 'right',
        imageFitStyle: 'popout',
        animation: 'pulse-glow',
        variant: 'gold'
      },
      {
        id: 'btn-2',
        label: 'CLUBE DE ASSINATURA VIP',
        subtitle: 'Cortes ilimitados no mês com benefícios na charutaria.',
        icon: 'sparkles',
        url: 'https://wa.me/5531991390202?text=Tenho%20interesse%20no%20clube%20de%20assinatura%20da%20Dom%20Pedro.',
        badgeText: 'CLUBE EXCLUSIVO',
        ctaActionText: 'CONHECER PLANOS',
        cardImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=80',
        imagePosition: 'left',
        imageFitStyle: 'framed',
        variant: 'default'
      },
      {
        id: 'btn-3',
        label: 'UNIDADE JARDINS / CONSOLAÇÃO',
        subtitle: 'Rua da Consolação, 2400 - Cerqueira César, São Paulo - SP',
        icon: 'map',
        url: 'https://maps.google.com/?q=Consolacao+2400',
        badgeText: 'MAPS & WAZE',
        ctaActionText: 'ABRIR ROTA',
        imagePosition: 'none',
        variant: 'glass'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'CADEIRAS ABERTAS',
      text: 'Atendimento tradicional com toalha quente, navalha e chopp cortesia.'
    },
    urgency: {
      enabled: true,
      headline: '🔥 VAGAS DE HOJE NA CADEIRA',
      subtitle: 'Garanta seu horário com barboterapia inclusa:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '✂️ Descobrir Visagismo Ideal (Triagem Rápida)',
      headline: 'Atendimento Personalizado',
      subtitle: 'Responda 3 perguntas rápidas para reservar sua cadeira:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual serviço você deseja realizar hoje?',
          options: ['Corte Masculino + Barboterapia', 'Corte Degrade Navalhado', 'Alinhamento & Terapia de Barba', 'Dia do Noivo Completo']
        },
        {
          id: 'q-2',
          question: 'Qual o melhor horário para você?',
          options: ['Manhã (09h às 12h)', 'Horário de Almoço (12h às 14h)', 'Final de Tarde (17h às 21h)']
        },
        {
          id: 'q-3',
          question: 'Tem preferência por profissional?',
          options: ['Qualquer barbeiro sênior disponível', 'Quero recomendação do mestre visagista']
        }
      ]
    },
    metricsList: [
      { value: '+4.200', label: 'CLIENTES ATENDIDOS' },
      { value: '14 anos', label: 'DE TRADIÇÃO & NAVALHA' },
      { value: '4.9★', label: 'GOOGLE REVIEWS' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Agendamento Direto', description: 'Escolha o serviço e confirme o horário via WhatsApp sem fila de espera.' },
      { number: '02', title: 'Experiência & Toalha Quente', description: 'Deguste nosso chopp artesanal ou café expresso enquanto cuidamos do seu visual.' },
      { number: '03', title: 'Finalização Impecável', description: 'Pós-barba com óleos essenciais nobres, pomada modeladora e alinhamento milimétrico.' }
    ],
    servicesCatalog: {
      enabled: true,
      headline: 'Tabela de Serviços & Experiências',
      subtitle: 'Tradição, visagismo e cuidados masculinos de alto padrão',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Corte Tradicional com Visagismo & Lavagem',
          description: 'Corte personalizado respeitando o formato do rosto e crânio, finalizado com lavagem refrescante e pomada.',
          price: 'R$ 95',
          duration: '⏱ 45 min',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de agendar o Corte com Visagismo na Dom Pedro.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Barboterapia Tradicional com Toalha Quente',
          description: 'Abertura de poros com vapor de ozônio, toalha quente aromática, navalhado clássico e massagem facial.',
          price: 'R$ 80',
          duration: '⏱ 40 min',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de agendar a Barboterapia Tradicional na Dom Pedro.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Combo Dom Pedro (Corte + Barba + Chopp)',
          description: 'A experiência completa: corte com visagismo, barboterapia relaxante e chopp artesanal cortesia.',
          price: 'R$ 160',
          duration: '⏱ 1h15',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de agendar o Combo Dom Pedro completo.'
        },
        {
          id: 'srv-4',
          category: 'EXCLUSIVO',
          name: 'Dia do Noivo & Padrinhos VIP',
          description: 'Salão reservado com charutos, uísque importado, corte, barba, hidratação facial e fotos exclusivas.',
          price: 'Sob Consulta',
          duration: '⏱ 3h00',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de informações sobre o pacote Dia do Noivo na Dom Pedro.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Rua da Consolação, 2400 · Cerqueira César - Jardins, São Paulo - SP',
      hours: 'Ter a Sáb · 09:00 às 21:00 | Dom · 10:00 às 17:00',
      openStatus: 'Aberto Agora · Atendimento VIP',
      mapsUrl: 'https://maps.google.com/?q=Consolacao+2400+Sao+Paulo'
    },
    galleryConfig: {
      enabled: true,
      badge: 'AMBIENTE & VISAGISMO VIP',
      headline: 'Galeria & Instalações Dom Pedro',
      subtitle: 'Estrutura britânica clássica, toalha quente, navalha e ambiente exclusivo',
      layout: 'carousel-snap',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Cadeira Clássica e Ritual de Toalha Quente',
        'Visagismo e Finalização com Pomada Nobre',
        'Bancada Tradicional de Navalhados',
        'Bar e Espaço de Convivência Exclusivo',
        'Detalhes e Acabamentos em Madeira e Couro',
        'Linha Profissional de Tratamento e Pomadas'
      ]
    },
    galleryPhotosList: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?auto=format&fit=crop&w=800&q=80'
    ],
    testimonialsList: [
      {
        id: 't-1',
        name: 'Rodrigo Sampaio',
        role: 'Empresário',
        text: 'A melhor barbearia de São Paulo. A toalha quente com óleo de eucalipto e a precisão do corte navalhado são incomparáveis. Atendimento 10/10.',
        rating: 5,
        date: 'há 1 semana',
        verified: true
      },
      {
        id: 't-2',
        name: 'Guilherme Mendes',
        role: 'Advogado',
        text: 'Ambiente sensacional, chopp gelado e pontualidade britânica no agendamento. Sou cliente assíduo do clube mensal.',
        rating: 5,
        date: 'há 3 semanas',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'Tradição e Estilo para o Homem Contemporâneo',
      bio: 'Fundada com o propósito de resgatar o ritual clássico das antigas barbearias inglesas, a Dom Pedro alia técnica milimétrica de visagismo a um ambiente acolhedor e privativo.',
      quote: '"Cuidar da aparência não é vaidade: é respeito por si mesmo e pela sua trajetória."'
    },
    faqList: [
      {
        question: 'Preciso agendar com antecedência ou posso chegar direto?',
        answer: 'Recomendamos o agendamento prévio pelo WhatsApp para garantir seu horário sem espera, mas temos cadeiras rotativas para encaixes conforme disponibilidade.'
      },
      {
        question: 'O chopp artesanal e o café estão inclusos?',
        answer: 'Sim! Todos os nossos clientes têm cortesia de café expresso gourmet ou chopp artesanal gelado durante o atendimento.'
      },
      {
        question: 'A barbearia possui estacionamento ou manobrista?',
        answer: 'Sim, dispomos de convênio com estacionamento com manobrista no próprio edifício.'
      }
    ]
  },
  {
    slug: 'aurea-joias',
    name: 'Áurea Alta Joalheria',
    role: 'Joalheria Autoral & Diamantes Certificados',
    category: 'Luxo & Joias',
    registrationCode: 'GIA CERTIFIED LAB',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site com requinte de revista para joalheria autoral em ouro 18k e diamantes certificados GIA. Encomendas sob medida e solitários.',
    features: ['Ouro 18k Autoral', 'Diamantes GIA', 'Alianças Sob Medida', 'Showroom Cidade Jardim', 'Design Exclusivo'],
    link: 'https://biovip.com.br/aurea-joias',
    paletteId: 'alto_contraste',
    typographyId: 'italiana',
    monogram: 'AJ',
    stats: { views: '15.1K', clicks: '4.7K', conversion: '31.1%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'colecoes', title: 'Catálogo de Diamantes & Joias', description: 'Solitários em ouro 18k, alianças de casamento e gemas certificadas GIA.', previewType: 'catalog_products' },
      { slug: 'sob-medida', title: 'Processo Criativo & Modelagem 3D', description: 'Desenvolvimento exclusivo de joias de família e peças comemorativas.', previewType: 'services' },
      { slug: 'visita-showroom', title: 'Agendar Visita no Atelier', description: 'Atendimento privativo com espumante no Shopping Cidade Jardim.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'ENCOMENDA DE JOIA SOB MEDIDA',
        subtitle: 'Desenvolvimento 3D de alianças, solitários e colares exclusivos.',
        icon: 'calendar',
        url: 'https://wa.me/5511996778899?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20joia%20sob%20medida%20com%20a%20%C3%81urea.',
        isHighlighted: true,
        highlightBadge: '💎 EXCLUSIVO'
      },
      {
        id: 'btn-2',
        label: 'CATÁLOGO DE DIAMANTES & SOLITÁRIOS',
        subtitle: 'Pedras lapidadas com certificado de autenticidade internacional.',
        icon: 'sparkles',
        url: 'https://wa.me/5511996778899?text=Quero%20conhecer%20o%20cat%C3%A1logo%20de%20diamantes'
      },
      {
        id: 'btn-3',
        label: 'SHOWROOM PRIVATIVO',
        subtitle: 'Shopping Cidade Jardim - Piso 2 - Morumbi, São Paulo - SP',
        icon: 'map',
        url: 'https://maps.google.com/?q=Shopping+Cidade+Jardim'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'ALTA JOALHERIA',
      text: 'Atendimento privativo no showroom com espumante e consultoria de diamantes.'
    },
    urgency: {
      enabled: true,
      headline: '💎 ATENDIMENTO EXCLUSIVO NO SHOWROOM',
      subtitle: 'Garanta sua visita privativa para confecção de solitários e alianças:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '✨ Descobrir Sua Joia Ideal (Consultoria 3D)',
      headline: 'Consultoria de Alta Joalheria',
      subtitle: 'Responda 3 perguntas para direcionar o atendimento do nosso gemólogo:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual peça você deseja adquirir ou confeccionar?',
          options: ['Anel Solitário de Noivado / Diamante GIA', 'Par de Alianças de Casamento em Ouro 18k', 'Colar / Brincos com Gemas Preciosas (Esmeralda/Rubi)', 'Remodelagem de Joia de Família / Herança']
        },
        {
          id: 'q-2',
          question: 'Qual a tonalidade de ouro de sua preferência?',
          options: ['Ouro Amarelo 18k Clássico', 'Ouro Branco 18k com Ródio', 'Ouro Rosé 18k Champagne', 'Platina Nobre']
        },
        {
          id: 'q-3',
          question: 'Como deseja ser atendido(a)?',
          options: ['Visita privativa com hora marcada no Cidade Jardim', 'Atendimento concierge via WhatsApp com envio de catálogo e vídeos']
        }
      ]
    },
    metricsList: [
      { value: '+2.400', label: 'JOIAS AUTORAIS FORJADAS' },
      { value: '18k', label: 'OURO CERTIFICADO & GIA' },
      { value: '25 anos', label: 'DE TRADIÇÃO OURIVES' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Consultoria & Seleção de Gemas', description: 'Degustação de espumante no showroom com apresentação de diamantes certificados pelo GIA.' },
      { number: '02', title: 'Modelagem 3D & Aprovação', description: 'Render fotorrealista da joia com as proporções exatas antes da fundição manual em bancada.' },
      { number: '03', title: 'Cravação Manual & Entrega Nobre', description: 'Forjamento em ouro 18k maciço, gravação a laser personalizada e estojo de veludo assinado.' }
    ],
    galleryPhotosList: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591475837-975c6d3dfeb3?auto=format&fit=crop&w=800&q=80'
    ],
        galleryConfig: {
      enabled: true,
      badge: 'ALTA JOALHERIA & DIAMANTES GIA',
      headline: 'Coleções Autorais & Peças Sob Medida',
      subtitle: 'Registros reais do forjamento em ouro 18k e gemas com certificação internacional',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611591475837-975c6d3dfeb3?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Colar Riviera em Ouro Branco com Diamantes Lapidação Brilhante',
        'Anel Solitário de Noivado com Diamante GIA 1.5ct',
        'Alta Joalheria em Ouro 18k com Esmeraldas Colombianas',
        'Modelagem Técnica 3D e Forjamento Artesanal no Atelier',
        'Par de Alianças Matrimoniais Anatômicas em Ouro Amarelo 18k',
        'Estojo Assinado em Veludo com Certificado de Autenticidade'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Coleções Autorais & Criação Sob Medida',
      subtitle: 'Ouro 18k maciço e gemas preciosas certificadas de origem responsável',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Anel Solitário de Noivado com Diamante GIA',
          description: 'Design clássico de 6 garras em ouro 18k com diamante central lapidação brilhante e certificado GIA.',
          price: 'Sob Consulta',
          duration: '⏱ Pronta Entrega ou 15 dias',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de agendar atendimento para Solitário de Noivado na Áurea Joalheria.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Par de Alianças Matrimoniais Anatômicas em Ouro 18k',
          description: 'Conforto anatômico absoluto, acabamento acetinado ou polido com gravação interna personalizada.',
          price: 'Sob Consulta',
          duration: '⏱ Confecção 10 dias',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de consultar modelos de Alianças Matrimoniais na Áurea Joalheria.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Alta Joalheria Sob Medida com Modelagem 3D',
          description: 'Desenvolvimento do zero de colares riviera, brincos de esmeralda colombiana ou joias comemorativas.',
          price: 'Sob Consulta',
          duration: '⏱ Projeto Exclusivo',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de solicitar um projeto de Joia Sob Medida com a Áurea.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Shopping Cidade Jardim - Piso 2 · Morumbi, São Paulo - SP',
      hours: 'Seg a Sáb · 10:00 às 22:00 | Dom · 14:00 às 20:00',
      openStatus: 'Aberto Agora · Atendimento Privativo no Showroom',
      mapsUrl: 'https://maps.google.com/?q=Shopping+Cidade+Jardim+Sao+Paulo'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Henrique Prado Salles',
        role: 'Empresário',
        text: 'A experiência de escolher o anel de noivado na Áurea foi insuperável. A transparência na explicação das 4Cs do diamante e o atendimento no showroom do Cidade Jardim foram perfeitos.',
        rating: 5,
        date: 'há 3 semanas',
        verified: true
      },
      {
        id: 't-2',
        name: 'Juliana Montenegro',
        role: 'Advogada',
        text: 'Mandei remodelar o anel de formatura da minha avó em uma joia moderna. O trabalho de ourivesaria ficou de uma delicadeza indescritível.',
        rating: 5,
        date: 'há 1 mês',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'A Nobreza do Ouro e a Eternidade dos Diamantes',
      bio: 'Fundada por mestres ourives e gemólogos certificados pelo Gemological Institute of America (GIA), a Áurea Joalheria combina técnicas tradicionais de bancada florentina à tecnologia de impressão 3D de alta precisão, criando peças que atravessam gerações.',
      quote: '"Uma verdadeira joia não mede apenas o valor de seus metais; ela guarda memórias e sentimentos eternos."'
    },
    faqList: [
      {
        question: 'Os diamantes acompanham certificado internacional?',
        answer: 'Sim! Todos os diamantes a partir de 0.30ct possuem certificado oficial emitido pelo GIA (Gemological Institute of America) com numeração gravada a laser na cinta da gema.'
      },
      {
        question: 'Vocês realizam ajuste de medida no anel caso não sirva?',
        answer: 'Sim, a primeira regulagem de aro de anéis e solitários é gratuita e realizada com rapidez pela nossa equipe de oficina própria.'
      },
      {
        question: 'É necessário agendar horário para visitar o showroom?',
        answer: 'Recomendamos o agendamento prévio para que possamos recebê-lo em nossa sala privativa com espumante e seleção prévia de gemas alinhadas ao seu perfil.'
      }
    ]
  },
  {
    slug: 'bistro-le-noir',
    name: 'Le Noir Bistrô',
    role: 'Gastronomia Francesa Contemporânea',
    category: 'Gastronomia & Restaurante',
    registrationCode: 'GUIA MICHELIN 2026',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85',
    photo: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85',
    description: 'Bio Site atmosférico e sofisticado para bistrô francês contemporâneo com menu degustação autoral do Chef Executivo e carta de vinhos finos.',
    features: ['Menu Degustação 7 Etapas', 'Reserva Online de Mesas', 'Carta de Vinhos Raros', 'Guia Michelin 2026', 'Leblon Rio de Janeiro'],
    link: 'https://biovip.com.br/bistro-le-noir',
    paletteId: 'bordeaux_imperial',
    typographyId: 'instrument',
    monogram: 'LN',
    stats: { views: '28.4K', clicks: '11.8K', conversion: '41.5%' },
    isPortfolioModel: true,
    inPortfolio: true,
    subpages: [
      { slug: 'menu-degustacao', title: 'Menu Degustação & Entradas', description: '7 etapas do Chef Executivo harmonizadas com vinhos franceses.', previewType: 'menu_digital' },
      { slug: 'avaliacoes', title: 'Críticas & Guia Michelin', description: 'Depoimentos de sommeliers e publicações gastronômicas renomadas.', previewType: 'reviews' },
      { slug: 'reservas', title: 'Reserva de Mesa Online', description: 'Garanta sua mesa no salão principal ou no bistrô jardim.', previewType: 'booking' }
    ],
    buttons: [
      {
        id: 'btn-1',
        label: 'RESERVAR MESA ONLINE',
        subtitle: 'Garantia de mesa para jantar intimista e comemorações especiais.',
        icon: 'calendar',
        url: 'https://wa.me/5521997889900?text=Ol%C3%A1!%20Gostaria%20de%20reservar%20uma%20mesa%20no%20Le%20Noir%20Bistr%C3%B4.',
        isHighlighted: true,
        highlightBadge: '⚡ ÚLTIMAS VAGAS'
      },
      {
        id: 'btn-2',
        label: 'MENU DEGUSTAÇÃO DO CHEF',
        subtitle: 'Experiência gastronômica sensorial harmonizada com grands crus.',
        icon: 'sparkles',
        url: 'https://wa.me/5521997889900?text=Gostaria%20de%20ver%20o%20menu%20degusta%C3%A7%C3%A3o'
      },
      {
        id: 'btn-3',
        label: 'COMO CHEGAR AO BISTRÔ',
        subtitle: 'Rua Dias Ferreira, 420 - Leblon, Rio de Janeiro - RJ',
        icon: 'map',
        url: 'https://maps.google.com/?q=Dias+Ferreira+420+Leblon'
      }
    ],
    announcement: {
      enabled: true,
      badge: 'GUIA MICHELIN 2026',
      text: 'Novo Menu Degustação sensorial de 7 etapas harmonizado pelo sommelier.'
    },
    urgency: {
      enabled: true,
      headline: '🍷 MESAS CONCORRIDAS PARA ESTA NOITE',
      subtitle: 'Reserve sua mesa com taça de boas-vindas cortesia do chef:',
      minutes: 15
    },
    qualifierQuiz: {
      enabled: true,
      buttonLabel: '🍾 Reserva Personalizada (Salão ou Jardim)',
      headline: 'Experiência Gastronômica Le Noir',
      subtitle: 'Responda 3 perguntas rápidas para alinharmos os detalhes da sua mesa:',
      questions: [
        {
          id: 'q-1',
          question: 'Qual ambiente você prefere para sua experiência?',
          options: ['Salão Principal Clássico à meia-luz', 'Bistrô Jardim / Espaço Romântico ao ar livre', 'Balcão do Chef com vista para a cozinha']
        },
        {
          id: 'q-2',
          question: 'A reserva é para comemoração especial?',
          options: ['Aniversário / Ocasião especial', 'Jantar Romântico / Pedido de Casamento', 'Jantar Corporativo / Reunião de Negócios', 'Apenas apreciar a alta gastronomia']
        },
        {
          id: 'q-3',
          question: 'Possui alguma restrição alimentar ou preferência?',
          options: ['Sem restrições', 'Opção Vegetariana / Frutos do Mar', 'Intolerância a glúten ou lactose']
        }
      ]
    },
    metricsList: [
      { value: 'Michelin', label: 'SELEÇÃO OFICIAL 2026' },
      { value: '7 Etapas', label: 'MENU AUTORAL DO CHEF' },
      { value: '400+ Rótulos', label: 'NA ADEGA CLIMATIZADA' }
    ],
    howItWorksSteps: [
      { number: '01', title: 'Boas-Vindas com Champagne', description: 'Recepção intimista no Leblon com amuse-bouche exclusivo e taça de boas-vindas.' },
      { number: '02', title: 'A Jornada das 7 Etapas', description: 'Sequência harmônica de pratos que mesclam técnica francesa clássica e ingredientes orgânicos locais.' },
      { number: '03', title: 'Harmonização & Sobremesa Autoral', description: 'Vinhos raros selecionados pelo sommelier da casa e finalização com pâtisserie artesanal.' }
    ],
    galleryPhotosList: [
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
    ],
        galleryConfig: {
      enabled: true,
      badge: 'LE NOIR BISTRÔ · LEBLON',
      headline: 'Experiência Gastronômica & Salão Intimista',
      subtitle: 'A atmosfera e os pratos do nosso menu degustação em 7 etapas',
      layout: 'mosaic',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
      ],
      captions: [
        'Chef Executivo na Finalização das 7 Etapas do Menu Degustação',
        'Salão Principal à Meia-Luz com Mesas Bistrô Clássicas',
        'Entrada Autoral: Tartare de Vieira com Azeite Trufado e Brotos',
        'Prato Principal: Magret de Canard com Mousseline de Baroa e Redução',
        'Adega Climatizada com Mais de 400 Rótulos de Grands Crus Franceses',
        'Harmonização com Vinhos Finos Orientada pelo Sommelier da Casa'
      ]
    },
    servicesCatalog: {
      enabled: true,
      headline: 'Menus & Experiências Gastronômicas',
      subtitle: 'A mais refinada gastronomia francesa contemporânea no coração do Leblon',
      categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
      items: [
        {
          id: 'srv-1',
          category: 'MAIS PROCURADO',
          name: 'Menu Degustação Autoral em 7 Etapas',
          description: 'Experiência sensorial completa com criações sazonais do Chef Executivo e harmonização opcional.',
          price: 'R$ 380 / pessoa',
          duration: '⏱ 2h30 de experiência',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de reservar o Menu Degustação 7 Etapas no Le Noir Bistrô.'
        },
        {
          id: 'srv-2',
          category: 'MAIS PROCURADO',
          name: 'Reserva para Jantar Romântico à la Carte',
          description: 'Mesa decorada com flores naturais, menu à la carte de clássicos franceses e carta de grands crus.',
          price: 'Sob Consulta',
          duration: '⏱ Noite livre',
          badge: 'MAIS PROCURADO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de reservar uma mesa romântica no Le Noir Bistrô.'
        },
        {
          id: 'srv-3',
          category: 'EXCLUSIVO',
          name: 'Jantar Privativo na Adega para Grupos (até 12 pessoas)',
          description: 'Espaço climatizado reservado com serviço exclusivo de garçom e sommelier dedicado.',
          price: 'Sob Consulta',
          duration: '⏱ Evento Fechado',
          badge: 'EXCLUSIVO',
          featured: true,
          whatsappMessage: 'Olá! Gostaria de informações sobre o Jantar Privativo na Adega do Le Noir.'
        }
      ]
    },
    locationInfo: {
      enabled: true,
      address: 'Rua Dias Ferreira, 420 · Leblon, Rio de Janeiro - RJ',
      hours: 'Ter a Sáb · 19:00 às 00:30 | Dom · 12:30 às 17:00',
      openStatus: 'Aberto Hoje · Reservas Recomendadas',
      mapsUrl: 'https://maps.google.com/?q=Dias+Ferreira+420+Leblon+Rio+de+Janeiro'
    },
    testimonialsList: [
      {
        id: 't-1',
        name: 'Marcelo Brandão',
        role: 'Crítico de Gastronomia & Sommelier',
        text: 'O Le Noir é uma ode à elegância gastronômica francesa com frescor tropical. O magret de pato com redução de amoras e o mil-folhas são memoráveis.',
        rating: 5,
        date: 'há 2 semanas',
        verified: true
      },
      {
        id: 't-2',
        name: 'Clara Figueiredo',
        role: 'Empresária',
        text: 'Comemorei meu aniversário de casamento no bistrô jardim. Iluminação perfeita, atendimento impecável e a harmonização dos vinhos elevou a noite a outro patamar.',
        rating: 5,
        date: 'há 1 mês',
        verified: true
      }
    ],
    aboutMeSection: {
      headline: 'A Paixão pela Cozinha Clássica e a Alma Carioca',
      bio: 'Sob o comando do Chef Executivo Jean-Luc Moreau, formado pelo Institut Paul Bocuse em Lyon e radicado no Brasil há mais de 15 anos, o Le Noir Bistrô une a precisão das técnicas francesas aos ingredientes orgânicos mais nobres dos produtores locais.',
      quote: '"Cozinhar é a arte de criar memórias afetivas através dos sabores, aromas e da companhia à mesa."'
    },
    faqList: [
      {
        question: 'É indispensável fazer reserva com antecedência?',
        answer: 'Para o jantar de quinta a sábado, o agendamento prévio pelo WhatsApp é fortemente recomendado devido à capacidade intimista do bistrô.'
      },
      {
        question: 'O bistrô possui opções para vegetarianos?',
        answer: 'Sim! Nosso menu degustação conta com versão vegetariana refinada elaborada com cogumelos nobres, trufas e vegetais orgânicos grelhados na brasa.'
      },
      {
        question: 'Existe taxa de rolha caso eu leve meu próprio vinho?',
        answer: 'Sim, permitimos uma garrafa por casal com taxa de rolha de R$ 90, ou isenção caso consuma um rótulo de valor equivalente de nossa adega.'
      }
    ]
  }
]

export const categories = [...new Set(projects.map(p => p.category))].sort()

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category)
}

export function getFeaturedProjects(count: number = 6): Project[] {
  return projects.slice(0, count)
}

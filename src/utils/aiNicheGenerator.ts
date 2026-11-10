import { PALETTES, TYPOGRAPHIES } from '@/data/bioSiteDesign'

export interface GeneratedServiceItem {
  id: string
  name: string
  category: string
  duration: string
  price: string
  description: string
  badge?: string
  featured?: boolean
  whatsappMessage?: string
}

export interface GeneratedQuizQuestion {
  id: string
  question: string
  options: string[]
}

export interface GeneratedBioSiteContent {
  brandName: string
  niche: string
  tagline: string
  paletteId: string
  typographyId: string
  backgroundStyle: string
  buttonStyle: string
  buttons: Array<{
    id: string
    label: string
    icon: string
    targetType: 'whatsapp' | 'link'
    value: string
  }>
  rating: string
  reviewsCount: string
  announcement?: {
    enabled: boolean
    badge: string
    text: string
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
    questions: GeneratedQuizQuestion[]
  }
  metricsList?: Array<{
    value: string
    label: string
  }>
  howItWorksSteps?: Array<{
    number: string
    title: string
    description: string
  }>
  servicesCatalog?: {
    enabled: boolean
    headline: string
    subtitle: string
    categories: string[]
    items: GeneratedServiceItem[]
  }
  locationInfo?: {
    enabled: boolean
    address: string
    hours: string
    openStatus: string
    mapsUrl: string
  }
  faqList?: Array<{
    question: string
    answer: string
  }>
}

// Dicionário inteligente com regras de alta conversão para os principais nichos brasileiros
export function generateNicheContent(prompt: string): GeneratedBioSiteContent {
  const p = prompt.toLowerCase()

  // 1. NAILS / UNHAS / MANICURE RUSSA / FIBRA DE VIDRO
  if (p.includes('nail') || p.includes('unha') || p.includes('alongamento') || p.includes('manicure') || p.includes('fibra')) {
    return {
      brandName: prompt.split(' ')[0].length > 2 ? prompt.split('—')[0].split('-')[0].trim() : 'Valéria Siqueira',
      niche: 'NAIL DESIGNER & BLINDAGEM EM GEL',
      tagline: 'Unhas estruturadas com acabamento fino, curvatura C natural e durabilidade impecável.',
      paletteId: 'luxo_nude',
      typographyId: 'playfair',
      backgroundStyle: 'aura',
      buttonStyle: 'moldura',
      buttons: [
        { id: 'btn-1', label: 'Agendamento de Aplicação ou Manutenção', icon: 'whatsapp', targetType: 'whatsapp', value: '5511998223344' },
        { id: 'btn-2', label: 'Catálogo de Formatos & Fibras', icon: 'cardapio', targetType: 'link', value: '#catalogo' },
        { id: 'btn-3', label: 'Conheça o Studio & Localização', icon: 'maps', targetType: 'link', value: 'https://maps.google.com' }
      ],
      rating: '5.0',
      reviewsCount: '215',
      announcement: {
        enabled: true,
        badge: 'VAGAS ABERTAS',
        text: 'Agendamentos para Aplicação em Fibra e Manutenção Russa.'
      },
      urgency: {
        enabled: true,
        headline: '🔥 VAGAS LIMITADAS PARA ESTA SEMANA',
        subtitle: 'Reserve sua vaga com blindagem diamante inclusa:',
        minutes: 15
      },
      qualifierQuiz: {
        enabled: true,
        buttonLabel: '💅 Descobrir Formato Ideal (Triagem Nails)',
        headline: 'Atendimento Personalizado',
        subtitle: 'Responda 3 perguntas rápidas para agilizar seu horário:',
        questions: [
          {
            id: 'q-1',
            question: 'Qual procedimento você deseja realizar?',
            options: ['Alongamento em Fibra de Vidro (Aplicação)', 'Manutenção de Alongamento', 'Blindagem em Gel / Banho de Diamante', 'Manicure Russa Combinada']
          },
          {
            id: 'q-2',
            question: 'Você já possui alongamento atualmente?',
            options: ['Não, unhas naturais', 'Sim, feito por outra profissional (remoção)', 'Sim, feito aqui (manutenção periódica)']
          },
          {
            id: 'q-3',
            question: 'Qual o formato que mais combina com seu estilo?',
            options: ['Almond (Amendoada Elegante)', 'Square (Quadrada Natural)', 'Bailarina / Coffin', 'Stiletto']
          }
        ]
      },
      metricsList: [
        { value: '+1.800', label: 'ALONGAMENTOS FEITOS' },
        { value: '6 anos', label: 'EXPERIÊNCIA NAILS' },
        { value: '5.0★', label: 'GOOGLE REVIEWS' }
      ],
      servicesCatalog: {
        enabled: true,
        headline: 'Procedimentos & Alongamentos de Alto Padrão',
        subtitle: 'Estruturação fina com aspecto natural e zero descolamento',
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
            whatsappMessage: 'Olá! Gostaria de agendar o Alongamento em Fibra de Vidro Silk.'
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
            whatsappMessage: 'Olá! Gostaria de agendar a Blindagem em Gel Diamante.'
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
            whatsappMessage: 'Olá! Gostaria de agendar a Manicure Russa Combinada.'
          }
        ]
      },
      locationInfo: {
        enabled: true,
        address: 'Av. Ibirapuera, 2035 - Sala 42 · Moema, São Paulo - SP',
        hours: 'Ter a Sáb · 09:00 às 19:30',
        openStatus: 'Aberto Agora · Atendimento VIP',
        mapsUrl: 'https://maps.google.com'
      }
    }
  }

  // 2. LASH DESIGNER / CÍLIOS / LASH LIFTING
  if (p.includes('lash') || p.includes('cilios') || p.includes('cílios') || p.includes('olhar') || p.includes('micropigmenta')) {
    return {
      brandName: prompt.split(' ')[0].length > 2 ? prompt.split('—')[0].split('-')[0].trim() : 'Isabela Fontes',
      niche: 'LASH DESIGNER & VISAGISMO DO OLHAR',
      tagline: 'Extensão de cílios de alto padrão com isolamento impecável, leveza e retenção prolongada.',
      paletteId: 'terracota_mediterraneo',
      typographyId: 'instrument',
      backgroundStyle: 'aura',
      buttonStyle: 'moldura',
      buttons: [
        { id: 'btn-1', label: 'Agendar Extensão de Cílios', icon: 'whatsapp', targetType: 'whatsapp', value: '5511999334455' },
        { id: 'btn-2', label: 'Menu de Técnicas & Efeitos', icon: 'cardapio', targetType: 'link', value: '#catalogo' },
        { id: 'btn-3', label: 'Studio Privativo & Localização', icon: 'maps', targetType: 'link', value: 'https://maps.google.com' }
      ],
      rating: '5.0',
      reviewsCount: '280',
      announcement: {
        enabled: true,
        badge: 'AGENDA CÍLIOS ABERTA',
        text: 'Vagas exclusivas para Extensão de Cílios e Lash Lifting.'
      },
      urgency: {
        enabled: true,
        headline: '🔥 VAGAS DE HOJE NA POLTRONA VIP',
        subtitle: 'Garanta seu horário com higienização prévia inclusa:',
        minutes: 15
      },
      qualifierQuiz: {
        enabled: true,
        buttonLabel: '👁️ Descobrir Mapping Ideal (Triagem do Olhar)',
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
            options: ['Não, é minha primeira aplicação', 'Sim, preciso de manutenção periódica', 'Sim, mas preciso remover o de outra profissional']
          },
          {
            id: 'q-3',
            question: 'Qual o melhor dia para seu atendimento?',
            options: ['Dias de semana pela manhã', 'Dias de semana à tarde', 'Sábado durante o dia']
          }
        ]
      },
      metricsList: [
        { value: '+2.100', label: 'OLHARES TRANSFORMADOS' },
        { value: '5 anos', label: 'EXPERIÊNCIA EXCLUSIVA' },
        { value: '5.0★', label: 'AVALIAÇÃO NO GOOGLE' }
      ],
      servicesCatalog: {
        enabled: true,
        headline: 'Menu de Técnicas & Extensões',
        subtitle: 'Procedimentos executados com biossegurança e fios de seda premium',
        categories: ['TODOS', 'MAIS PROCURADO', 'EXCLUSIVO'],
        items: [
          {
            id: 'srv-1',
            category: 'MAIS PROCURADO',
            name: 'Efeito Molhado (Wet Lash)',
            description: 'Tendência internacional com aspecto de rímel fresco, fios unidos e visual marcante sem pesar no olhar.',
            price: 'R$ 210',
            duration: '⏱ 1h45',
            badge: 'MAIS PROCURADO',
            featured: true,
            whatsappMessage: 'Olá! Gostaria de agendar a técnica Efeito Molhado.'
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
            whatsappMessage: 'Olá! Gostaria de agendar o Volume Híbrido / Fox Eyes.'
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
            whatsappMessage: 'Olá! Gostaria de agendar o Lash Lifting.'
          }
        ]
      },
      locationInfo: {
        enabled: true,
        address: 'Rua Amauri, 314 - Itaim Bibi, São Paulo - SP',
        hours: 'Seg a Sáb · 08:30 às 19:30',
        openStatus: 'Aberto Agora · Agendamento Privativo',
        mapsUrl: 'https://maps.google.com'
      }
    }
  }

  // 3. SALÃO DE BELEZA / CABELOS / MECHAS
  if (p.includes('salão') || p.includes('salao') || p.includes('cabelo') || p.includes('mecha') || p.includes('loira') || p.includes('morena iluminada')) {
    return {
      brandName: prompt.split(' ')[0].length > 2 ? prompt.split('—')[0].split('-')[0].trim() : 'Studio Helena Duarte',
      niche: 'SALÃO DE BELEZA & VISAGISMO FEMININO',
      tagline: 'Mechas criativas, morena iluminada de luxo e tratamentos de alta performance para a mulher sofisticada.',
      paletteId: 'champagne_gold',
      typographyId: 'cormorant',
      backgroundStyle: 'aura',
      buttonStyle: 'moldura',
      buttons: [
        { id: 'btn-1', label: 'Reserva de Cadeira VIP WhatsApp', icon: 'whatsapp', targetType: 'whatsapp', value: '5511997112233' },
        { id: 'btn-2', label: 'Menu de Mechas & Spa Capilar', icon: 'cardapio', targetType: 'link', value: '#catalogo' },
        { id: 'btn-3', label: 'Studio & Localização nos Jardins', icon: 'maps', targetType: 'link', value: 'https://maps.google.com' }
      ],
      rating: '5.0',
      reviewsCount: '342',
      announcement: {
        enabled: true,
        badge: 'CADEIRAS ABERTAS',
        text: 'Agendamento de Mechas de Luxo, Morena Iluminada e Spa Capilar.'
      },
      urgency: {
        enabled: true,
        headline: '🔥 VAGAS DESTA SEMANA COM A EQUIPE',
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
            whatsappMessage: 'Olá! Gostaria de agendar a Morena Iluminada Signature.'
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
            whatsappMessage: 'Olá! Gostaria de agendar o Loiro de Luxo.'
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
            whatsappMessage: 'Olá! Gostaria de agendar o Spa Capilar com Ozônio.'
          }
        ]
      },
      locationInfo: {
        enabled: true,
        address: 'Rua Bela Cintra, 1820 · Jardins, São Paulo - SP',
        hours: 'Ter a Sáb · 09:00 às 20:00',
        openStatus: 'Aberto Agora · Agendamento com a Equipe',
        mapsUrl: 'https://maps.google.com'
      }
    }
  }

  // 4. ESTÉTICA / DERMATO / HARMONIZAÇÃO
  if (p.includes('estétic') || p.includes('dermato') || p.includes('botox') || p.includes('harmoniza') || p.includes('laser') || p.includes('biomedic')) {
    return {
      brandName: prompt.split(' ')[0].length > 2 ? prompt.split('—')[0].split('-')[0].trim() : 'Dra. Camila Vasconcelos',
      niche: 'ESTÉTICA AVANÇADA & HARMONIZAÇÃO',
      tagline: 'Realçando sua beleza natural com protocolos exclusivos, segurança médica e elegância.',
      paletteId: 'bordeaux_imperial',
      typographyId: 'bodoni',
      backgroundStyle: 'aura',
      buttonStyle: 'moldura',
      buttons: [
        { id: 'btn-1', label: 'Agendar Avaliação Personalizada', icon: 'whatsapp', targetType: 'whatsapp', value: '5511999998888' },
        { id: 'btn-2', label: 'Catálogo de Protocolos & Valores', icon: 'cardapio', targetType: 'link', value: '#catalogo' },
        { id: 'btn-3', label: 'Conheça o Consultório & Localização', icon: 'maps', targetType: 'link', value: 'https://maps.google.com' }
      ],
      rating: '5.0',
      reviewsCount: '247',
      announcement: {
        enabled: true,
        badge: 'AGENDA ABERTA',
        text: 'Consultas e procedimentos estéticos com hora marcada.'
      },
      urgency: {
        enabled: true,
        headline: '🔥 CONDIÇÃO ESPECIAL DE HOJE',
        subtitle: 'Garanta sua avaliação prioritária antes que encerrem as vagas:',
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
            whatsappMessage: 'Olá! Gostaria de agendar avaliação para Bioestimulador de Colágeno.'
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
            whatsappMessage: 'Olá! Gostaria de agendar aplicação de Toxina Botulínica.'
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
            whatsappMessage: 'Olá! Gostaria de saber mais sobre Preenchimento com Ácido Hialurônico.'
          }
        ]
      },
      locationInfo: {
        enabled: true,
        address: 'Av. Brigadeiro Faria Lima, 2800 · Itaim Bibi, São Paulo - SP',
        hours: 'Seg a Sex · 08:30 às 19:30',
        openStatus: 'Aberto Agora · Atendimento com Hora Marcada',
        mapsUrl: 'https://maps.google.com'
      }
    }
  }

  // 5. ODONTOLOGIA / DENTISTA
  if (p.includes('odonto') || p.includes('dentista') || p.includes('lente') || p.includes('clareamento') || p.includes('orto')) {
    return {
      brandName: prompt.split(' ')[0].length > 2 ? prompt.split('—')[0].split('-')[0].trim() : 'Dra. Ana Freire',
      niche: 'ODONTOLOGIA ESTÉTICA · CRO-PE 14.281',
      tagline: 'Transformando sorrisos com odontologia estética minimamente invasiva e conforto absoluto.',
      paletteId: 'clinico_sereno',
      typographyId: 'dm_serif',
      backgroundStyle: 'aura',
      buttonStyle: 'moldura',
      buttons: [
        { id: 'btn-1', label: 'Agendar Consulta no WhatsApp', icon: 'whatsapp', targetType: 'whatsapp', value: '5581987654321' },
        { id: 'btn-2', label: 'Lentes em Resina & Clareamento', icon: 'agendamento', targetType: 'link', value: '#catalogo' },
        { id: 'btn-3', label: 'Localização do Consultório', icon: 'maps', targetType: 'link', value: 'https://maps.google.com' }
      ],
      rating: '5.0',
      reviewsCount: '238',
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
        { value: '11 anos', label: 'EXPERIÊNCIA CLÍNICA' },
        { value: '5.0★', label: 'AVALIAÇÃO NO GOOGLE' }
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
            whatsappMessage: 'Olá! Gostaria de agendar avaliação para Lentes de Resina.'
          },
          {
            id: 'srv-2',
            category: 'MAIS PROCURADO',
            name: 'Harmonização Orofacial & Toxina Botulínica',
            description: 'Alinhamento da musculatura facial, sorriso gengival e rejuvenescimento harmônico.',
            price: 'Sob Consulta',
            duration: '⏱ 1h00',
            badge: 'MAIS PROCURADO',
            featured: true,
            whatsappMessage: 'Olá! Gostaria de saber mais sobre Harmonização Orofacial.'
          },
          {
            id: 'srv-3',
            category: 'EXCLUSIVO',
            name: 'Clareamento Dental a Laser em Consultório',
            description: 'Remoção profunda de manchas e clareamento do esmalte com tecnologia anti-sensibilidade.',
            price: 'A partir de R$ 650',
            duration: '⏱ 1h00',
            badge: 'EXCLUSIVO',
            featured: true,
            whatsappMessage: 'Olá! Gostaria de agendar Clareamento Dental a Laser.'
          }
        ]
      },
      locationInfo: {
        enabled: true,
        address: 'Av. Boa Viagem, 2190 - Sala 918 · Boa Viagem - Recife, PE',
        hours: 'Seg a Sex · 08:30 às 19:30 | Sáb · 08:30 às 13:00',
        openStatus: 'Aberto Agora · Agendamento VIP',
        mapsUrl: 'https://maps.google.com'
      }
    }
  }

  // 6. BARBEARIA / MASCULINO
  if (p.includes('barber') || p.includes('barbearia') || p.includes('corte') || p.includes('cabelo masculino')) {
    return {
      brandName: prompt.split(' ')[0].length > 2 ? prompt.split('—')[0].split('-')[0].trim() : 'Dom Pedro Barbearia',
      niche: 'BARBEARIA CLÁSSICA & NAVALHADO',
      tagline: 'Corte tradicional, barba com toalha quente, cerveja cortesia e ambiente exclusivo.',
      paletteId: 'terroso_artesanal',
      typographyId: 'bebas',
      backgroundStyle: 'solido',
      buttonStyle: 'solido',
      buttons: [
        { id: 'btn-1', label: 'Agendar Horário na Cadeira', icon: 'whatsapp', targetType: 'whatsapp', value: '5511995667788' },
        { id: 'btn-2', label: 'Tabela de Serviços & Cortes', icon: 'cardapio', targetType: 'link', value: '#catalogo' },
        { id: 'btn-3', label: 'Unidade Jardins & Localização', icon: 'maps', targetType: 'link', value: 'https://maps.google.com' }
      ],
      rating: '4.9',
      reviewsCount: '412',
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
            whatsappMessage: 'Olá! Gostaria de agendar o Corte com Visagismo.'
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
            whatsappMessage: 'Olá! Gostaria de agendar a Barboterapia Tradicional.'
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
          }
        ]
      },
      locationInfo: {
        enabled: true,
        address: 'Rua da Consolação, 2400 · Cerqueira César - Jardins, São Paulo - SP',
        hours: 'Ter a Sáb · 09:00 às 21:00 | Dom · 10:00 às 17:00',
        openStatus: 'Aberto Agora · Atendimento VIP',
        mapsUrl: 'https://maps.google.com'
      }
    }
  }

  // PADRÃO / OUTROS NICHOS
  return {
    brandName: prompt.trim() || 'Dra. Carolina Freitas',
    niche: 'CONSULTORIA & ATENDIMENTO VIP',
    tagline: 'Elevando sua experiência com soluções sob medida, atendimento ágil e resultados comprovados.',
    paletteId: 'editorial_claro',
    typographyId: 'instrument',
    backgroundStyle: 'aura',
    buttonStyle: 'moldura',
    buttons: [
      { id: 'btn-1', label: 'Falar Diretamente no WhatsApp', icon: 'whatsapp', targetType: 'whatsapp', value: '5511999998888' },
      { id: 'btn-2', label: 'Conheça Meus Serviços & Valores', icon: 'cardapio', targetType: 'link', value: '#catalogo' },
      { id: 'btn-3', label: 'Localização & Agendamentos', icon: 'maps', targetType: 'link', value: 'https://maps.google.com' }
    ],
    rating: '5.0',
    reviewsCount: '190',
    announcement: {
      enabled: true,
      badge: 'AGENDA ABERTA',
      text: 'Atendimento exclusivo com hora marcada.'
    },
    urgency: {
      enabled: true,
      headline: '🔥 CONDIÇÃO ESPECIAL DE HOJE',
      subtitle: 'Garanta seu atendimento prioritário antes que expire:',
      minutes: 15
    },
    metricsList: [
      { value: '+1.500', label: 'CLIENTES ATENDIDOS' },
      { value: '8 anos', label: 'DE ATUAÇÃO' },
      { value: '5.0★', label: 'AVALIAÇÕES' }
    ],
    locationInfo: {
      enabled: true,
      address: 'Edifício Trade Center - Sala 918, Boa Viagem - Recife, PE',
      hours: 'Seg a Sex · 09:00 às 19:00',
      openStatus: 'Aberto Agora · Agendamento',
      mapsUrl: 'https://maps.google.com'
    }
  }
}

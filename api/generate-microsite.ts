import { GoogleGenAI } from '@google/genai';

const GEMINI_MODELS = ['gemini-3-flash-preview', 'gemini-3.8-flash', 'gemini-flash-latest'];

function buildSmartFallbackMicrosite(params: {
  instagram?: string;
  googleMaps?: string;
  businessName?: string;
  businessNiche?: string;
  additionalInfo?: string;
}) {
  const cleanInsta = (params.instagram || '').replace('@', '').trim() || 'studiovip';
  const rawName = (params.businessName || '').trim() || cleanInsta.replace(/[._-]+/g, ' ').toUpperCase() || 'STUDIO VIP';
  const nameUpper = rawName.toUpperCase();
  const nicheRaw = `${params.businessNiche || ''} ${params.additionalInfo || ''} ${rawName}`.toLowerCase();
  const mapsUrl = (params.googleMaps || '').trim() || 'https://maps.google.com';

  const isBeautyLashNail = /c[ií]lio|lash|unha|nail|manicure|fibra|gel|sobrancelha|beleza|studio|est[eé]tica|make|maquiagem|sal[aã]o|cabelo|hair/.test(nicheRaw);
  const isBarber = /barbearia|barber|barba|fade|degrad[eê]|corte masculino|grooming/.test(nicheRaw);
  const isLaw = /advogad|advocacia|jur[ií]dic|direito|oab|escrit[oó]rio|lei/.test(nicheRaw);
  const isHealth = /psic[oó]log|terapia|sa[uú]de|m[eé]dic|odonto|dentista|nutri|fisio|cl[ií]nica/.test(nicheRaw);
  const isMentor = /mentor|curso|treinamento|consultoria|infoproduto|palestrante|coach/.test(nicheRaw);
  const isFashion = /moda|loja|boutique|roupa|look|acess[oó]rio|joia|semijoia/.test(nicheRaw);

  if (isBeautyLashNail) {
    const hasLash = /c[ií]lio|lash/.test(nicheRaw);
    const hasNail = /unha|nail|fibra|gel|manicure/.test(nicheRaw);
    const specialtyTitle =
      hasLash && hasNail
        ? 'EXTENSÃO DE CÍLIOS & NAIL DESIGNER DE ALTO PADRÃO'
        : hasLash
        ? 'ESPECIALISTA EM EXTENSÃO DE CÍLIOS & LASH DESIGN'
        : hasNail
        ? 'NAIL DESIGNER & ALONGAMENTO DE LUXO'
        : (params.businessNiche || 'BELEZA, ESTÉTICA & AUTOESTIMA').toUpperCase();

    return {
      theme: 'roseGoldQuartz',
      styling: {
        fontFamily: 'Playfair Display',
        borderRadius: 20,
        glassmorphism: true,
        metallicBorders: true,
        spotlightGlow: true,
        photoHeight: 390,
        photoScale: 100,
        photoPosY: 22,
        vignetteIntensity: 85,
        photoFilter: 'none',
      },
      announcement: {
        enabled: true,
        badge: 'AGENDA VIP ABERTA',
        text: 'Últimos horários da semana para cílios e unhas. Reserve agora!',
        link: '#booking',
      },
      profile: {
        name: nameUpper,
        title: specialtyTitle,
        tagline:
          params.additionalInfo?.trim() ||
          'Realçando sua beleza natural com técnicas exclusivas, durabilidade impecável e atendimento personalizado.',
        cursivePhrase: 'Sua autoestima e olhar radiante em cada detalhe.',
        avatarUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
        whatsapp: '5511999999999',
        instagram: cleanInsta,
        location: 'Espaço Exclusivo & Climatizado · Atendimento com Hora Marcada',
        mapsUrl,
      },
      metrics: {
        enabled: true,
        stat1Value: '+1.200',
        stat1Label: 'CLIENTES ATENDIDAS',
        stat2Value: '100%',
        stat2Label: 'BIOSSEGURANÇA',
        stat3Value: '4.9★',
        stat3Label: 'AVALIAÇÃO VIP',
      },
      actionCards: [
        {
          id: 'cta-1',
          title: 'AGENDAR MEU HORÁRIO NO WHATSAPP',
          subtitle: 'Garanta seu procedimento de Cílios ou Unhas com atendimento exclusivo.',
          icon: 'Calendar',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: `Olá! Vim pelo link da bio do ${rawName} e gostaria de agendar um horário.`,
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'MAIS PROCURADO',
          customBg: '#e11d74',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'RESERVAR HORÁRIO',
        },
        {
          id: 'cta-2',
          title: 'CATÁLOGO DE PROCEDIMENTOS & VALORES',
          subtitle: 'Confira nossas técnicas de Extensão de Cílios, Nail Design e Combos.',
          icon: 'Sparkles',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: `Olá! Gostaria de ver a tabela de procedimentos do ${rawName}.`,
          openInNewTab: false,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'TABELA VIP',
          customBg: '#ffffff',
          customText: '#3b1d28',
          bgImage: '',
          imagePosition: 'left',
          cardImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'VER PROCEDIMENTOS',
        },
        {
          id: 'cta-3',
          title: 'COMO CHEGAR AO STUDIO (LOCALIZAÇÃO)',
          subtitle: 'Clique para abrir a rota direta no Google Maps.',
          icon: 'MapPin',
          linkType: 'custom',
          url: mapsUrl,
          whatsappMessage: 'Olá! Gostaria de confirmar o endereço do Studio.',
          openInNewTab: true,
          animation: 'none',
          variant: 'default',
          badgeText: 'MAPS',
          customBg: '#ffffff',
          customText: '#3b1d28',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'ABRIR ROTA',
        },
      ],
      processSteps: {
        enabled: true,
        headline: 'Como funciona sua experiência VIP?',
        subtitle: 'Cuidado, precisão e conforto em 3 passos simples',
        steps: [
          {
            id: 'step-1',
            number: '01',
            title: 'Escolha do Procedimento & Horário',
            description: 'Você escolhe a técnica ideal pelo nosso catálogo ou triagem rápida no WhatsApp.',
          },
          {
            id: 'step-2',
            number: '02',
            title: 'Visagismo & Aplicação Personalizada',
            description: 'Analisamos o formato do seu olhar e das suas mãos para um resultado harmônico e sofisticado.',
          },
          {
            id: 'step-3',
            number: '03',
            title: 'Acabamento Premium & Alta Durabilidade',
            description: 'Você sai pronta, confiante e com orientações completas para máxima retenção e brilho.',
          },
        ],
      },
      studentGrid: {
        enabled: true,
        headline: 'Portfólio & Transformações Reais',
        subtitle: 'Confira resultados impecáveis de nossas clientes no studio',
        badge: 'RESULTADOS REAIS',
        layout: 'grid3',
        aspectRatio: 'square',
        enableLightbox: true,
        photos: [
          'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
        ],
      },
      locationCard: {
        enabled: true,
        headline: `Localização — ${rawName}`,
        address: 'Clique para abrir a rota no Google Maps e vir até o nosso espaço',
        buttonLabel: 'Abrir no Google Maps',
        mapsUrl,
      },
      services: {
        enabled: true,
        headline: 'Menu de Procedimentos Exclusivos',
        subtitle: 'Materiais hipoalergênicos de primeira linha com retenção e acabamento de luxo',
        badge: 'CATÁLOGO VIP',
        layout: 'list',
        items: [
          {
            id: 'srv-1',
            name: 'Extensão de Cílios (Volume Brasileiro / Fox Eyes / Fio a Fio)',
            description: 'Mapeamento personalizado para destacar seu olhar com leveza, conforto e alta retenção.',
            price: 'R$ 180',
            oldPrice: 'R$ 220',
            duration: '1h45',
            badge: 'MAIS PEDIDO',
            ctaLabel: 'Agendar',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-2',
            name: 'Alongamento em Fibra de Vidro / Banho de Gel Slim',
            description: 'Unhas resistentes, curvatura natural impecável e acabamento espelhado de longa duração.',
            price: 'R$ 190',
            oldPrice: 'R$ 230',
            duration: '2h00',
            badge: 'NAIL LUXURY',
            ctaLabel: 'Agendar',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-3',
            name: 'Combo VIP: Extensão de Cílios + Nail Design Completo',
            description: 'Transformação completa em uma sessão especial com condição exclusiva.',
            price: 'R$ 330',
            oldPrice: 'R$ 410',
            duration: '3h15',
            badge: 'COMBO ESPECIAL',
            ctaLabel: 'Reservar Combo',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=300',
          },
        ],
      },
      testimonials: {
        enabled: true,
        headline: 'O que nossas clientes dizem',
        items: [
          {
            id: 't-1',
            clientName: 'Mariana Costa',
            city: 'Cliente Verificada',
            text: `Simplesmente apaixonada! Meus cílios e minhas unhas ficaram perfeitos, durabilidade incrível e ambiente super acolhedor.`,
            rating: 5,
          },
          {
            id: 't-2',
            clientName: 'Bianca Fernandes',
            city: 'Cliente Verificada',
            text: `Melhor atendimento da região! Delicadeza, pontualidade e resultado impecável. Não troco por nada!`,
            rating: 5,
          },
        ],
      },
      qualifierFunnel: {
        enabled: true,
        animation: 'shimmer',
        triggerButtonLabel: 'DESCOBRIR PROCEDIMENTO IDEAL / AGENDA VIP',
        triggerButtonSubtitle: 'Responda 3 perguntas rápidas para atendimento prioritário no WhatsApp',
        headline: `Atendimento Personalizado — ${rawName}`,
        subtitle: 'Selecione abaixo para agilizarmos seu horário no WhatsApp',
        questions: [
          {
            id: 'q1',
            title: 'Qual procedimento você deseja realizar?',
            options: [
              'Extensão de Cílios (Aplicação ou Manutenção)',
              'Nail Design / Alongamento ou Esmaltação em Gel',
              'Combo Completo (Cílios + Unhas)',
            ],
          },
          {
            id: 'q2',
            title: 'Para quando você gostaria de agendar?',
            options: [
              'Ainda esta semana (Prioridade)',
              'Para o final de semana / evento especial',
              'Próxima semana com flexibilidade',
            ],
          },
          {
            id: 'q3',
            title: 'Qual turno fica melhor para você?',
            options: ['Manhã', 'Tarde', 'Final do dia / Horário flexível'],
          },
        ],
      },
      aboutMe: {
        enabled: true,
        headline: `Sobre ${rawName}`,
        paragraph: `Referência em ${params.businessNiche || 'Extensão de Cílios e Nail Design'}, nosso studio nasceu com a missão de entregar um atendimento acolhedor, técnico e altamente personalizado. Utilizamos apenas materiais de excelência para garantir saúde, durabilidade e um acabamento sofisticado que valoriza sua beleza única.`,
        closingPhrase: 'Beleza, autocuidado e excelência em cada atendimento.',
      },
      faq: {
        enabled: true,
        headline: 'Dúvidas Frequentes',
        items: [
          {
            id: 'faq-1',
            question: 'Qual é a durabilidade da extensão de cílios e do alongamento de unhas?',
            answer: 'Trabalhamos com produtos premium de alta retenção. Recomendamos manutenção entre 15 e 25 dias para manter o resultado sempre impecável.',
          },
          {
            id: 'faq-2',
            question: 'Como faço para garantir meu horário na agenda?',
            answer: 'Basta clicar no botão de agendamento ou enviar a triagem rápida no WhatsApp. Nossa equipe retornará imediatamente com os horários disponíveis.',
          },
        ],
      },
      conversion: {
        metaPixelId: '',
        googleAnalyticsId: '',
        defaultWhatsappMsg: `Olá! Vi o microsite do ${rawName} e gostaria de agendar {servico} para {data}.`,
      },
    };
  }

  const chosenTheme = isBarber
    ? 'barberVintage'
    : isLaw
    ? 'navyLaw'
    : isHealth
    ? 'terracottaWarm'
    : isMentor
    ? 'warmMentorship'
    : isFashion
    ? 'pinkGlam'
    : 'darkGold';

  const chosenFont = isLaw || isBarber ? 'Cinzel' : 'Playfair Display';

  return {
    theme: chosenTheme,
    styling: {
      fontFamily: chosenFont,
      borderRadius: 20,
      glassmorphism: true,
      metallicBorders: true,
      spotlightGlow: true,
      photoHeight: 390,
      photoScale: 100,
      photoPosY: 25,
      vignetteIntensity: 85,
      photoFilter: 'none',
    },
    announcement: {
      enabled: true,
      badge: 'ATENDIMENTO VIP',
      text: `Agenda aberta em ${rawName}. Garanta seu horário exclusivo!`,
      link: '#booking',
    },
    profile: {
      name: nameUpper,
      title: (params.businessNiche || 'ESPECIALISTA & ATENDIMENTO PREMIUM').toUpperCase(),
      tagline:
        params.additionalInfo?.trim() ||
        `Excelência, atendimento personalizado e resultados de alto padrão em ${params.businessNiche || 'nossa área de atuação'}.`,
      cursivePhrase: 'Compromisso com a sua melhor experiência.',
      avatarUrl: isBarber
        ? 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600'
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      aboutPhotoUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=600',
      whatsapp: '5511999999999',
      instagram: cleanInsta,
      location: 'Atendimento Presencial & Online com Hora Marcada',
      mapsUrl,
    },
    metrics: {
      enabled: true,
      stat1Value: '+800',
      stat1Label: 'CLIENTES',
      stat2Value: '100%',
      stat2Label: 'DEDICAÇÃO',
      stat3Value: '5.0★',
      stat3Label: 'AVALIAÇÃO',
    },
    actionCards: [
      {
        id: 'cta-1',
        title: 'AGENDAR ATENDIMENTO VIP AGORA',
        subtitle: 'Reserve seu horário com prioridade pelo nosso WhatsApp.',
        icon: 'Calendar',
        linkType: 'booking',
        url: '#booking',
        whatsappMessage: `Olá! Vi o microsite de ${rawName} e gostaria de agendar um horário.`,
        openInNewTab: true,
        animation: 'pulse-glow',
        variant: 'accent',
        badgeText: 'AGENDA ABERTA',
        customBg: '#e2b857',
        customText: '#0f172a',
        bgImage: '',
        imagePosition: 'right',
        cardImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        imageFitStyle: 'popout',
        imageSize: 92,
        ctaActionText: 'AGENDAR AGORA',
      },
      {
        id: 'cta-2',
        title: 'CONHEÇA NOSSOS SERVIÇOS & SOLUÇÕES',
        subtitle: 'Veja os detalhes dos pacotes e modalidades de atendimento.',
        icon: 'Sparkles',
        linkType: 'catalogo',
        url: '#catalogo',
        whatsappMessage: `Olá! Gostaria de conhecer os serviços de ${rawName}.`,
        openInNewTab: false,
        animation: 'shimmer',
        variant: 'default',
        badgeText: '',
        customBg: '#ffffff',
        customText: '#0f172a',
        bgImage: '',
        imagePosition: 'none',
        cardImage: '',
        imageFitStyle: 'framed',
        imageSize: 84,
        ctaActionText: 'VER CATÁLOGO',
      },
      {
        id: 'cta-3',
        title: 'LOCALIZAÇÃO & COMO CHEGAR',
        subtitle: 'Abra a rota direta no Google Maps.',
        icon: 'MapPin',
        linkType: 'custom',
        url: mapsUrl,
        whatsappMessage: 'Olá! Gostaria de confirmar a localização.',
        openInNewTab: true,
        animation: 'none',
        variant: 'default',
        badgeText: 'MAPS',
        customBg: '#ffffff',
        customText: '#0f172a',
        bgImage: '',
        imagePosition: 'none',
        cardImage: '',
        imageFitStyle: 'framed',
        imageSize: 84,
        ctaActionText: 'ABRIR MAPA',
      },
    ],
    processSteps: {
      enabled: true,
      headline: 'Como funciona o atendimento?',
      subtitle: 'Rápido, personalizado e focado no seu resultado',
      steps: [
        {
          id: 'step-1',
          number: '01',
          title: 'Contato & Triagem Inicial',
          description: 'Você escolhe o serviço desejado e alinhamos sua necessidade pelo WhatsApp.',
        },
        {
          id: 'step-2',
          number: '02',
          title: 'Atendimento Personalizado',
          description: 'Cuidado exclusivo com hora marcada e foco total nos seus objetivos.',
        },
        {
          id: 'step-3',
          number: '03',
          title: 'Resultado & Acompanhamento',
          description: 'Entrega de alto padrão com suporte dedicado para sua total satisfação.',
        },
      ],
    },
    studentGrid: {
      enabled: true,
      headline: 'Portfólio & Estrutura',
      subtitle: 'Confira registros do nosso trabalho e espaço',
      badge: 'DESTAQUES',
      layout: 'grid3',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
      ],
    },
    locationCard: {
      enabled: true,
      headline: `Localização — ${rawName}`,
      address: 'Confira nossa localização oficial pelo Google Maps',
      buttonLabel: 'Abrir no Google Maps',
      mapsUrl,
    },
    services: {
      enabled: true,
      headline: 'Principais Serviços & Pacotes',
      subtitle: 'Soluções pensadas para oferecer a melhor experiência',
      badge: 'CATÁLOGO VIP',
      layout: 'list',
      items: [
        {
          id: 'srv-1',
          name: `Atendimento Principal — ${params.businessNiche || 'Especialidade VIP'}`,
          description: 'Serviço completo realizado com materiais e técnicas de alto padrão.',
          price: 'Sob Consulta',
          oldPrice: '',
          duration: '1h00',
          badge: 'DESTAQUE',
          ctaLabel: 'Reservar',
          actionType: 'booking',
          featured: true,
          imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=300',
        },
        {
          id: 'srv-2',
          name: 'Pacote Premium Personalizado',
          description: 'Experiência completa com acompanhamento exclusivo e prioridade na agenda.',
          price: 'Condição Especial',
          oldPrice: '',
          duration: '1h30',
          badge: 'VIP',
          ctaLabel: 'Consultar',
          actionType: 'booking',
          featured: false,
          imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=300',
        },
      ],
    },
    testimonials: {
      enabled: true,
      headline: 'Depoimentos de Clientes',
      items: [
        {
          id: 't-1',
          clientName: 'Camila Oliveira',
          city: 'Cliente Verificada',
          text: 'Atendimento impecável do início ao fim! Superou todas as minhas expectativas.',
          rating: 5,
        },
        {
          id: 't-2',
          clientName: 'Rodrigo Santos',
          city: 'Cliente Verificado',
          text: 'Profissionalismo nota mil, ambiente excelente e resultado extraordinário.',
          rating: 5,
        },
      ],
    },
    qualifierFunnel: {
      enabled: true,
      animation: 'shimmer',
      triggerButtonLabel: 'TRIAGEM VIP / AGENDAMENTO RÁPIDO',
      triggerButtonSubtitle: 'Responda 3 perguntas rápidas para atendimento prioritário',
      headline: `Triagem de Atendimento — ${rawName}`,
      subtitle: 'Responda para direcionarmos seu atendimento no WhatsApp',
      questions: [
        {
          id: 'q1',
          title: 'Qual é o seu objetivo principal hoje?',
          options: [
            'Agendar um horário / procedimento',
            'Solicitar orçamento personalizado',
            'Tirar dúvidas sobre serviços',
          ],
        },
        {
          id: 'q2',
          title: 'Qual é a sua preferência de data?',
          options: ['Ainda esta semana', 'Próxima semana', 'Apenas consultando valores'],
        },
        {
          id: 'q3',
          title: 'Qual turno é melhor para você?',
          options: ['Manhã', 'Tarde', 'Horário flexível'],
        },
      ],
    },
    aboutMe: {
      enabled: true,
      headline: `Sobre ${rawName}`,
      paragraph: `Com foco em excelência e atendimento humanizado em ${params.businessNiche || 'nosso segmento'}, cuidamos de cada detalhe para proporcionar uma experiência única, segura e de altíssimo nível.`,
      closingPhrase: 'Sua satisfação é a nossa maior prioridade.',
    },
    faq: {
      enabled: true,
      headline: 'Dúvidas Frequentes',
      items: [
        {
          id: 'faq-1',
          question: 'Como funciona o agendamento?',
          answer: 'Basta clicar em qualquer botão de agendamento ou responder a triagem rápida para falar diretamente conosco no WhatsApp.',
        },
        {
          id: 'faq-2',
          question: 'Quais são as formas de pagamento aceitas?',
          answer: 'Aceitamos PIX, cartões de crédito e débito com total comodidade.',
        },
      ],
    },
    conversion: {
      metaPixelId: '',
      googleAnalyticsId: '',
      defaultWhatsappMsg: `Olá! Vi a página de ${rawName} e gostaria de informações sobre os serviços.`,
    },
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { instagram, googleMaps, businessName, businessNiche, additionalInfo } = req.body || {};

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback inteligente caso a chave não esteja configurada na Vercel
      const fallbackData = buildSmartFallbackMicrosite({
        instagram,
        googleMaps,
        businessName,
        businessNiche,
        additionalInfo,
      });
      return res.status(200).json({
        success: true,
        data: fallbackData,
        source: 'smart-fallback',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `
Você é um especialista mundial em Copywriting, UX/UI Design e Estratégia de Vendas para Microsites de Alta Conversão em dispositivos móveis (Instagram Bio, WhatsApp e Google Meu Negócio).

DADOS FORNECIDOS PELO CLIENTE:
- Instagram: @${instagram ? String(instagram).replace('@', '').trim() : 'Não informado'}
- Link Google Meu Negócio / Maps: ${googleMaps || 'Não informado'}
- Nome da Empresa / Profissional: ${businessName || 'Não informado'}
- Nicho de Atuação: ${businessNiche || 'Identificar pelo Instagram/Negócio'}
- Informações Adicionais / Serviços / Diferenciais: ${additionalInfo || 'Nenhuma informação adicional'}

OBJETIVO:
Gere a estrutura completa do microsite de alta conversão para este cliente em Português do Brasil. Escolha o melhor tema visual dentre os disponíveis (ex: para extensão de cílios / nail designer / estética feminina prefira roseGoldQuartz, pinkGlam, pearlChampagne, darkGold ou orchidGlow; para barbearia prefira barberVintage ou barberRoyal; para advocacia prefira navyLaw ou bordeauxExecutive) e redija copys persuasivas com gatilhos mentais (autoridade, escassez, prova social) específicas para o nicho informado.

RETORNE ESTRITAMENTE UM OBJETO JSON VÁLIDO (sem markdown no início ou no fim, sem explicações em texto) com a estrutura abaixo:

{
  "theme": "roseGoldQuartz",
  "styling": {
    "fontFamily": "Playfair Display",
    "borderRadius": 20,
    "glassmorphism": true,
    "metallicBorders": true,
    "spotlightGlow": true,
    "photoHeight": 390,
    "photoScale": 100,
    "photoPosY": 25,
    "vignetteIntensity": 85,
    "photoFilter": "none"
  },
  "announcement": {
    "enabled": true,
    "badge": "AGENDA VIP ABERTA",
    "text": "Últimos horários disponíveis para esta semana.",
    "link": "#booking"
  },
  "profile": {
    "name": "NOME DO CLIENTE EM MAIÚSCULAS",
    "title": "ESPECIALIDADE PRINCIPAL EM MAIÚSCULAS",
    "tagline": "Frase persuasiva focada no desejo e transformação do cliente",
    "cursivePhrase": "Frase em caligrafia com elegância e tom humano",
    "avatarUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    "aboutPhotoUrl": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600",
    "whatsapp": "5511999999999",
    "instagram": "${instagram ? String(instagram).replace('@', '').trim() : 'instagram'}",
    "location": "Atendimento com Hora Marcada · Espaço Exclusivo",
    "mapsUrl": "${googleMaps || 'https://maps.google.com'}"
  },
  "metrics": {
    "enabled": true,
    "stat1Value": "+1.000",
    "stat1Label": "CLIENTES",
    "stat2Value": "100%",
    "stat2Label": "QUALIDADE VIP",
    "stat3Value": "4.9★",
    "stat3Label": "SATISFAÇÃO"
  },
  "actionCards": [
    {
      "id": "cta-1",
      "title": "TÍTULO EM MAIÚSCULAS DA AÇÃO PRINCIPAL VIP",
      "subtitle": "Subtítulo explicativo e convincente.",
      "icon": "Calendar",
      "linkType": "booking",
      "url": "#booking",
      "whatsappMessage": "Olá! Gostaria de agendar um horário.",
      "openInNewTab": true,
      "animation": "pulse-glow",
      "variant": "accent",
      "badgeText": "MAIS PROCURADO",
      "customBg": "#e2b857",
      "customText": "#0f172a",
      "bgImage": "",
      "imagePosition": "right",
      "cardImage": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400",
      "imageFitStyle": "popout",
      "imageSize": 92,
      "ctaActionText": "AGENDAR AGORA"
    },
    {
      "id": "cta-2",
      "title": "CONFIRA NOSSOS SERVIÇOS & PACOTES",
      "subtitle": "Conheça o catálogo completo com valores e detalhes.",
      "icon": "Sparkles",
      "linkType": "catalogo",
      "url": "#catalogo",
      "whatsappMessage": "Olá! Gostaria de consultar a tabela de serviços.",
      "openInNewTab": false,
      "animation": "shimmer",
      "variant": "default",
      "badgeText": "",
      "customBg": "#ffffff",
      "customText": "#0f172a",
      "bgImage": "",
      "imagePosition": "left",
      "cardImage": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400",
      "imageFitStyle": "framed",
      "imageSize": 84,
      "ctaActionText": "VER MAIS"
    },
    {
      "id": "cta-3",
      "title": "FALE DIRETAMENTE NO WHATSAPP",
      "subtitle": "Tire suas dúvidas imediatamente com nossa equipe.",
      "icon": "MessageCircle",
      "linkType": "whatsapp",
      "url": "https://wa.me/5511999999999",
      "whatsappMessage": "Olá! Vi o link e gostaria de atendimento personalizado.",
      "openInNewTab": true,
      "animation": "pulse-glow",
      "variant": "default",
      "badgeText": "ONLINE",
      "customBg": "#25D366",
      "customText": "#000000",
      "bgImage": "",
      "imagePosition": "none",
      "cardImage": "",
      "imageFitStyle": "framed",
      "imageSize": 84,
      "ctaActionText": "CONVERSAR AGORA"
    }
  ],
  "processSteps": {
    "enabled": true,
    "headline": "Como funciona o atendimento?",
    "subtitle": "Simples, rápido e transparente em 3 passos",
    "steps": [
      {
        "id": "step-1",
        "number": "01",
        "title": "Primeiro Contato",
        "description": "Você nos envia uma mensagem ou faz a triagem inicial."
      },
      {
        "id": "step-2",
        "number": "02",
        "title": "Avaliação & Procedimento",
        "description": "Entendemos seu objetivo e aplicamos a melhor técnica."
      },
      {
        "id": "step-3",
        "number": "03",
        "title": "Resultado Impecável",
        "description": "Realização do serviço com máxima qualidade e durabilidade."
      }
    ]
  },
  "studentGrid": {
    "enabled": true,
    "headline": "Resultados & Galeria do Trabalho",
    "subtitle": "Confira transformações reais das nossas clientes",
    "photos": [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "locationCard": {
    "enabled": true,
    "headline": "Nossa Localização",
    "address": "Confira a rota para o nosso espaço no Google Maps",
    "buttonLabel": "Abrir no Google Maps",
    "mapsUrl": "${googleMaps || 'https://maps.google.com'}"
  },
  "services": {
    "enabled": true,
    "headline": "Principais Serviços & Tabela",
    "items": [
      {
        "id": "srv-1",
        "name": "Serviço Principal 1",
        "description": "Descrição persuasiva do serviço.",
        "price": "R$ 180",
        "duration": "1h30",
        "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300"
      },
      {
        "id": "srv-2",
        "name": "Serviço Principal 2",
        "description": "Descrição persuasiva do segundo serviço.",
        "price": "R$ 220",
        "duration": "2h00",
        "imageUrl": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300"
      }
    ]
  },
  "testimonials": {
    "enabled": true,
    "headline": "Depoimentos de Clientes",
    "items": [
      {
        "id": "t-1",
        "clientName": "Camila Oliveira",
        "city": "Cliente VIP",
        "text": "Atendimento sensacional! Superou todas as minhas expectativas.",
        "rating": 5
      },
      {
        "id": "t-2",
        "clientName": "Juliana Mendes",
        "city": "Cliente VIP",
        "text": "Excelente profissionalismo, ambiente impecável e resultado perfeito!",
        "rating": 5
      }
    ]
  },
  "qualifierFunnel": {
    "enabled": true,
    "animation": "shimmer",
    "triggerButtonLabel": "TRIAGEM VIP / AVALIAÇÃO RÁPIDA",
    "triggerButtonSubtitle": "Descubra a melhor opção em 3 perguntas rápidas",
    "headline": "Triagem de Atendimento VIP",
    "subtitle": "Responda para receber atendimento prioritário no WhatsApp",
    "questions": [
      {
        "id": "q1",
        "title": "Qual procedimento você procura hoje?",
        "options": [
          "Opção 1 do nicho",
          "Opção 2 do nicho",
          "Combo ou avaliação personalizada"
        ]
      },
      {
        "id": "q2",
        "title": "Qual é a sua urgência de horário?",
        "options": [
          "Ainda esta semana",
          "Próxima semana",
          "Apenas consultando valores"
        ]
      },
      {
        "id": "q3",
        "title": "Qual é o seu melhor turno?",
        "options": [
          "Manhã",
          "Tarde",
          "Horário flexível"
        ]
      }
    ]
  },
  "aboutMe": {
    "enabled": true,
    "headline": "Sobre Nós",
    "paragraph": "Texto persuasivo destacando os diferenciais do negócio e o compromisso com a satisfação de cada cliente.",
    "closingPhrase": "Sua confiança, nosso maior compromisso."
  },
  "faq": {
    "enabled": true,
    "headline": "Dúvidas Frequentes",
    "items": [
      {
        "id": "faq-1",
        "question": "Como funciona o agendamento?",
        "answer": "Basta clicar nos botões do WhatsApp ou preencher a triagem VIP para escolher o melhor horário."
      },
      {
        "id": "faq-2",
        "question": "Quais formas de pagamento são aceitas?",
        "answer": "Aceitamos PIX e cartões de crédito ou débito com total comodidade."
      }
    ]
  },
  "conversion": {
    "metaPixelId": "",
    "googleAnalyticsId": "",
    "defaultWhatsappMsg": "Olá! Gostaria de informações sobre os serviços."
  }
}
`;

    let parsedData: any = null;
    for (const modelName of GEMINI_MODELS) {
      try {
        const response = await Promise.race([
          ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout calling ${modelName}`)), 16000)
          ),
        ]);

        const rawText = response.text || '';
        try {
          parsedData = JSON.parse(rawText);
        } catch {
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
          }
        }
        if (parsedData && typeof parsedData === 'object') {
          break;
        }
      } catch (modelErr: any) {
        console.warn(`Modelo ${modelName} indisponível, tentando próximo:`, modelErr?.message);
      }
    }

    if (!parsedData) {
      parsedData = buildSmartFallbackMicrosite({
        instagram,
        googleMaps,
        businessName,
        businessNiche,
        additionalInfo,
      });
    }

    return res.status(200).json({
      success: true,
      data: parsedData,
    });
  } catch (err: any) {
    console.error('Erro na rota /api/generate-microsite, ativando fallback inteligente:', err);
    const fallbackData = buildSmartFallbackMicrosite({
      instagram,
      googleMaps,
      businessName,
      businessNiche,
      additionalInfo,
    });
    return res.status(200).json({
      success: true,
      data: fallbackData,
      source: 'smart-fallback',
    });
  }
}

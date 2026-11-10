export interface PlanFeature {
  name: string
  included: boolean
}

export interface Plan {
  id: string
  tag: string
  name: string
  isPopular?: boolean
  monthlyPrice: string
  annualMonthlyPrice: string
  annualTotal: string
  annualEconomy: string
  description: string
  features: PlanFeature[]
  ctaText: string
  isCustomPrice?: boolean
  extraNote?: string
}

export const OFFICIAL_PLANS: Plan[] = [
  // 1. STARTER
  {
    id: 'starter',
    tag: 'STARTER',
    name: 'Starter',
    isPopular: false,
    monthlyPrice: 'R$ 30',
    annualMonthlyPrice: 'R$ 21',
    annualTotal: 'R$ 252 à vista',
    annualEconomy: 'economia de R$ 108',
    description: 'O jeito mais rápido de sair do link sem graça, sem investir de uma vez.',
    features: [
      { name: 'BioVip de página única', included: true },
      { name: 'Até 20 botões', included: true },
      { name: 'Cliques e visitas no painel', included: true },
      { name: '10 tipografias e 6 paletas', included: true },
      { name: 'Você edita quando quiser', included: true },
      { name: 'Venda de produtos com 9% por venda', included: true },
      { name: 'Formulário de contato', included: false },
      { name: 'Página interna de portfólio', included: false },
      { name: 'Venda de produtos sem comissão', included: false }
    ],
    ctaText: 'SELECIONAR →'
  },

  // 2. ESSENCIAL
  {
    id: 'essencial',
    tag: 'ESSENCIAL',
    name: 'Essencial',
    isPopular: false,
    monthlyPrice: 'R$ 45',
    annualMonthlyPrice: 'R$ 31,50',
    annualTotal: 'R$ 378 à vista',
    annualEconomy: 'economia de R$ 162',
    description: 'Para quem precisa de presença profissional imediata.',
    features: [
      { name: 'Tudo do Starter', included: true },
      { name: 'BioVip + 1 página interna', included: true },
      { name: 'Formulário de contato', included: true },
      { name: 'Provas sociais (depoimentos, avaliações)', included: true },
      { name: 'Venda de produtos com 6% por venda', included: true },
      { name: 'Agendamento online', included: false },
      { name: 'Venda de produtos sem comissão', included: false }
    ],
    ctaText: 'SELECIONAR →'
  },

  // 3. PRO (MAIS ESCOLHIDO)
  {
    id: 'pro',
    tag: 'PRO',
    name: 'Pro',
    isPopular: true,
    monthlyPrice: 'R$ 79,90',
    annualMonthlyPrice: 'R$ 55,92',
    annualTotal: 'R$ 671 à vista',
    annualEconomy: 'economia de R$ 287,00',
    description: 'O equilíbrio entre identidade, conteúdo e conversão.',
    features: [
      { name: 'Tudo do Essencial', included: true },
      { name: 'BioVip + 3 páginas internas', included: true },
      { name: '16 tipografias — 6 exclusivas do Pro', included: true },
      { name: 'Venda de produtos sem comissão nenhuma', included: true },
      { name: 'Mensagens automáticas no Instagram', included: true },
      { name: 'Agendamento online (o cliente marca sozinho)', included: true },
      { name: 'Página de portfólio ou catálogo', included: true },
      { name: 'Origem das visitas e etiquetas', included: true },
      { name: 'SEO básico para Google', included: true },
      { name: 'Domínio próprio', included: false }
    ],
    ctaText: 'SELECIONAR →'
  },

  // 4. PREMIUM
  {
    id: 'premium',
    tag: 'PREMIUM',
    name: 'Premium',
    isPopular: false,
    isCustomPrice: true,
    monthlyPrice: 'A combinar',
    annualMonthlyPrice: 'A combinar',
    annualTotal: '',
    annualEconomy: '',
    description: 'Experiência completa, sob medida, com acompanhamento.',
    features: [
      { name: 'Tudo do Pro', included: true },
      { name: 'Layout 100% único', included: true },
      { name: 'Páginas internas sob medida', included: true },
      { name: 'Direção de arte exclusiva', included: true },
      { name: 'Vídeos e conteúdos', included: true },
      { name: 'Domínio próprio · 1º ano grátis', included: true },
      { name: 'Entrega em até 3 dias úteis', included: true },
      { name: '90 dias de ajustes inclusos', included: true },
      { name: 'Acompanhamento contínuo', included: true }
    ],
    extraNote: 'Já tem site ou domínio? A gente publica no seu — não precisa comprar outro nem trocar o endereço que seus clientes já conhecem.',
    ctaText: 'PERSONALIZE DO SEU JEITO →'
  }
]

export const FAQ_LIST = [
  {
    q: 'O que é um Bio Site?',
    a: 'É um site profissional adaptado para smartphones, ideal para usar no link da bio do Instagram. Ele carrega na hora, tem a sua identidade visual e direciona seu seguidor para o agendamento, catálogo ou WhatsApp.'
  },
  {
    q: 'Preciso pagar domínio ou hospedagem por fora?',
    a: 'Não. Todos os planos anuais já incluem hospedagem ultrarrápida com certificado de segurança SSL e subdomínio exclusivo.'
  },
  {
    q: 'Como funcionam as páginas adicionais do Plano Pro?',
    a: 'No Plano Pro você tem direito a até 3 páginas internas (como catálogo de serviços, antes e depois, agenda ou cardápio) com a mesma identidade do seu Bio Site.'
  },
  {
    q: 'Como posso receber pagamentos ou agendamentos?',
    a: 'Você pode conectar seu WhatsApp diretamente, ou usar nosso sistema integrado de pedidos e confirmação automática de horários.'
  }
]

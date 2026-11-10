export type SubscriptionStatus = 'ativa' | 'pendente' | 'atrasada' | 'cancelada' | 'trial'
export type BillingCycle = 'mensal' | 'anual'
export type PaymentMethod = 'pix' | 'cartao' | 'boleto'

export interface PaymentRecord {
  id: string
  date: string
  amount: number
  method: PaymentMethod
  status: 'pago' | 'pendente' | 'falho'
  receiptUrl?: string
}

export interface Subscription {
  id: string
  clientName: string
  businessName: string
  email: string
  whatsapp: string
  cpfCnpj?: string
  niche: string
  slug: string
  customDomain?: string
  planId: 'starter' | 'pro' | 'agency'
  planName: string
  cycle: BillingCycle
  amount: number
  status: SubscriptionStatus
  paymentMethod: PaymentMethod
  startDate: string
  nextBillingDate: string
  lastPaymentDate?: string
  bioSiteUrl: string
  viewsCount: number
  clicksCount: number
  notes?: string
  isPortfolioModel?: boolean
  isDemo?: boolean
  inPortfolio?: boolean
  payments: PaymentRecord[]
}

export const initialSubscriptions: Subscription[] = [
  {
    id: 'sub-001',
    clientName: 'Dra. Ana Freire',
    businessName: 'Dra. Ana Freire Odontologia Estética',
    email: 'ana.freire@clinicafreire.com.br',
    whatsapp: '5581987654321',
    cpfCnpj: '12.345.678/0001-90',
    niche: 'Odontologia Estética',
    slug: 'ana-freire',
    customDomain: 'draanafreire.com.br',
    planId: 'pro',
    planName: 'Profissional',
    cycle: 'anual',
    amount: 790,
    status: 'ativa',
    paymentMethod: 'pix',
    startDate: '2026-01-15',
    nextBillingDate: '2027-01-15',
    lastPaymentDate: '2026-01-15',
    bioSiteUrl: 'https://biovip.com.br/ana-freire',
    viewsCount: 4820,
    clicksCount: 1640,
    notes: 'Cliente VIP desde Jan/2026. Fez upgrade para domínio próprio.',
    payments: [
      { id: 'pay-001', date: '2026-01-15', amount: 790, method: 'pix', status: 'pago' }
    ]
  },
  {
    id: 'sub-002',
    clientName: 'Dra. Carolina Freitas',
    businessName: 'Dra. Carolina Freitas Nutrologia',
    email: 'contato@carolinafreitas.med.br',
    whatsapp: '5511998887766',
    cpfCnpj: '23.456.789/0001-01',
    niche: 'Médica Nutróloga',
    slug: 'carolina-freitas',
    planId: 'pro',
    planName: 'Profissional',
    cycle: 'mensal',
    amount: 79,
    status: 'ativa',
    paymentMethod: 'cartao',
    startDate: '2026-03-10',
    nextBillingDate: '2026-11-10',
    lastPaymentDate: '2026-10-10',
    bioSiteUrl: 'https://biovip.com.br/carolina-freitas',
    viewsCount: 6310,
    clicksCount: 2190,
    notes: 'Cobrança automática no cartão de crédito recorrente.',
    payments: [
      { id: 'pay-002', date: '2026-10-10', amount: 79, method: 'cartao', status: 'pago' },
      { id: 'pay-003', date: '2026-09-10', amount: 79, method: 'cartao', status: 'pago' }
    ]
  },
  {
    id: 'sub-003',
    clientName: 'Íris Albuquerque',
    businessName: 'Studio Íris Makeup & Beauty',
    email: 'iris.makeup@gmail.com',
    whatsapp: '5581991223344',
    cpfCnpj: '45.678.901/0001-23',
    niche: 'Maquiagem & Estética',
    slug: 'studio-iris',
    planId: 'starter',
    planName: 'Iniciante',
    cycle: 'mensal',
    amount: 29,
    status: 'atrasada',
    paymentMethod: 'pix',
    startDate: '2026-08-01',
    nextBillingDate: '2026-11-01',
    lastPaymentDate: '2026-10-01',
    bioSiteUrl: 'https://biovip.com.br/studio-iris',
    viewsCount: 1420,
    clicksCount: 520,
    notes: 'Venceu dia 01/11. Chave Pix enviada no WhatsApp dia 03/11.',
    payments: [
      { id: 'pay-004', date: '2026-10-01', amount: 29, method: 'pix', status: 'pago' }
    ]
  },
  {
    id: 'sub-004',
    clientName: 'Dr. Renato Andrade',
    businessName: 'Renato Andrade Advocacia Estratégica',
    email: 'renato@andradeadvogados.com.br',
    whatsapp: '5531987776655',
    cpfCnpj: '34.567.890/0001-12',
    niche: 'Advocacia & Consultoria',
    slug: 'renato-andrade',
    customDomain: 'andradeadvogados.com.br',
    planId: 'pro',
    planName: 'Profissional',
    cycle: 'anual',
    amount: 790,
    status: 'ativa',
    paymentMethod: 'pix',
    startDate: '2026-02-20',
    nextBillingDate: '2027-02-20',
    lastPaymentDate: '2026-02-20',
    bioSiteUrl: 'https://biovip.com.br/renato-andrade',
    viewsCount: 3890,
    clicksCount: 1450,
    payments: [
      { id: 'pay-005', date: '2026-02-20', amount: 790, method: 'pix', status: 'pago' }
    ]
  },
  {
    id: 'sub-005',
    clientName: 'Yngrid Santos',
    businessName: 'Yngrid Santos Clínica Esteta',
    email: 'yngrid.esteta@outlook.com',
    whatsapp: '5581977665544',
    cpfCnpj: '56.789.012/0001-34',
    niche: 'Farmacêutica Esteta',
    slug: 'yngrid-esteta',
    planId: 'pro',
    planName: 'Profissional',
    cycle: 'mensal',
    amount: 79,
    status: 'ativa',
    paymentMethod: 'cartao',
    startDate: '2026-05-12',
    nextBillingDate: '2026-11-12',
    lastPaymentDate: '2026-10-12',
    bioSiteUrl: 'https://biovip.com.br/yngrid-esteta',
    viewsCount: 8900,
    clicksCount: 3200,
    payments: [
      { id: 'pay-006', date: '2026-10-12', amount: 79, method: 'cartao', status: 'pago' }
    ]
  },
  {
    id: 'sub-006',
    clientName: 'Daniela Mendes',
    businessName: 'Daniela Mendes Consultoria & Mentoria',
    email: 'daniela@danielamendes.com.br',
    whatsapp: '5511981112233',
    cpfCnpj: '67.890.123/0001-45',
    niche: 'Consultoria & Mentoria',
    slug: 'daniela-mendes',
    planId: 'agency',
    planName: 'Agência',
    cycle: 'mensal',
    amount: 199,
    status: 'ativa',
    paymentMethod: 'pix',
    startDate: '2026-07-01',
    nextBillingDate: '2026-12-01',
    lastPaymentDate: '2026-11-01',
    bioSiteUrl: 'https://biovip.com.br/daniela-mendes',
    viewsCount: 12400,
    clicksCount: 4100,
    notes: 'Gerencia 3 bio sites na mesma conta.',
    payments: [
      { id: 'pay-007', date: '2026-11-01', amount: 199, method: 'pix', status: 'pago' }
    ]
  },
  {
    id: 'sub-007',
    clientName: 'Sarah Oliveira',
    businessName: 'Sarah Cakes Confeitaria Fina',
    email: 'sarahcakes@hotmail.com',
    whatsapp: '5581995554433',
    niche: 'Confeitaria & Doces',
    slug: 'sarah-cakes',
    planId: 'starter',
    planName: 'Iniciante',
    cycle: 'mensal',
    amount: 29,
    status: 'pendente',
    paymentMethod: 'pix',
    startDate: '2026-11-05',
    nextBillingDate: '2026-11-09',
    bioSiteUrl: 'https://biovip.com.br/sarah-cakes',
    viewsCount: 310,
    clicksCount: 95,
    notes: 'Aguardando confirmação do primeiro Pix de ativação.',
    payments: []
  },
  {
    id: 'sub-008',
    clientName: 'Marcos Vinicius',
    businessName: 'X5 Veículos Premium',
    email: 'vendas@x5veiculos.com.br',
    whatsapp: '5511993332211',
    cpfCnpj: '78.901.234/0001-56',
    niche: 'Concessionária & Veículos',
    slug: 'x5-veiculos',
    customDomain: 'x5veiculos.com.br',
    planId: 'agency',
    planName: 'Agência',
    cycle: 'anual',
    amount: 1990,
    status: 'ativa',
    paymentMethod: 'pix',
    startDate: '2026-04-18',
    nextBillingDate: '2027-04-18',
    lastPaymentDate: '2026-04-18',
    bioSiteUrl: 'https://biovip.com.br/x5-veiculos',
    viewsCount: 15300,
    clicksCount: 5600,
    payments: [
      { id: 'pay-008', date: '2026-04-18', amount: 1990, method: 'pix', status: 'pago' }
    ]
  },
  {
    id: 'sub-009',
    clientName: 'Eduardo Vieira',
    businessName: 'EVS Minis Miniaturas',
    email: 'eduardo@evsminis.com.br',
    whatsapp: '5541988889900',
    niche: 'Colecionáveis & E-commerce',
    slug: 'evs-minis',
    planId: 'starter',
    planName: 'Iniciante',
    cycle: 'mensal',
    amount: 29,
    status: 'cancelada',
    paymentMethod: 'cartao',
    startDate: '2026-02-01',
    nextBillingDate: '2026-09-01',
    lastPaymentDate: '2026-08-01',
    bioSiteUrl: 'https://biovip.com.br/evs-minis',
    viewsCount: 2200,
    clicksCount: 680,
    notes: 'Cancelou por mudança de segmento em Set/2026.',
    payments: [
      { id: 'pay-009', date: '2026-08-01', amount: 29, method: 'cartao', status: 'pago' }
    ]
  }
]


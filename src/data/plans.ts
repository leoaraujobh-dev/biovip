export interface PlanFeature {
  name: string
  included: boolean
}

export interface Plan {
  id: string
  tag: string
  name: string
  isPopular?: boolean
  setupPrice: string
  originalSetupPrice?: string
  setupNote: string
  monthlyText: string
  description: string
  features: PlanFeature[]
  ctaText: string
  ctaHref: string
}

export const OFFICIAL_PLANS: Plan[] = [
  // 1. PLANO BÁSICO
  {
    id: 'basico',
    tag: 'ENTRADA RÁPIDA',
    name: 'Plano Básico',
    isPopular: false,
    originalSetupPrice: 'R$ 197,00',
    setupPrice: 'R$ 79,90',
    setupNote: 'taxa única de montagem em 24h',
    monthlyText: '1º mês grátis • Depois R$ 29,90/mês',
    description: 'Ideal para profissionais autônomos que querem sair do link amador.',
    features: [
      { name: 'Microsite entregue pronto pela nossa equipe em até 24h', included: true },
      { name: 'Layout clássico otimizado para abertura rápida', included: true },
      { name: 'Botões essenciais de WhatsApp, Instagram e Localização', included: true },
      { name: 'Acesso total ao editor para você atualizar quando quiser', included: true },
      { name: 'Hospedagem segura e certificado SSL inclusos', included: true },
      { name: '1 alteração mensal feita pela nossa equipe', included: true },
      { name: 'Catálogo visual de procedimentos com fotos', included: false },
      { name: 'Galeria de portfólio antes e depois', included: false },
      { name: 'Filtro anti-curiosos com regras de atendimento', included: false }
    ],
    ctaText: 'Quero Meu BioVip Pronto em 24h',
    ctaHref: 'https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20garantir%20meu%20BioSite%20Plano%20B%C3%A1sico%20pronto%20em%2024h.'
  },

  // 2. PLANO PRO (MAIS ESCOLHIDO)
  {
    id: 'pro',
    tag: 'MAIS ESCOLHIDO POR ESTÚDIOS & BARBEARIAS',
    name: 'Plano Pro',
    isPopular: true,
    originalSetupPrice: 'R$ 347,00',
    setupPrice: 'R$ 129,90',
    setupNote: 'taxa única de criação sob medida',
    monthlyText: '1º mês grátis • Depois R$ 49,90/mês',
    description: 'Para estúdios de beleza, barbearias e clínicas que querem filtrar curiosos.',
    features: [
      { name: 'Tudo do Plano Básico', included: true },
      { name: 'Montagem completa do seu Catálogo de Serviços com fotos e preços', included: true },
      { name: 'Galeria de Portfólio de Alta Resolução (Antes & Depois)', included: true },
      { name: 'Funil anti-curiosos: mensagens personalizadas para cada procedimento no WhatsApp', included: true },
      { name: 'Seção de regras de agendamento (política de atraso e pagamento)', included: true },
      { name: 'Acesso liberado aos 12 Módulos Inteligentes no painel', included: true },
      { name: '4 alterações mensais realizadas pela nossa equipe', included: true },
      { name: 'Métricas de acessos e cliques no painel', included: true }
    ],
    ctaText: 'Garantir Plano Pro no WhatsApp',
    ctaHref: 'https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20o%20Plano%20Pro%20com%20Cat%C3%A1logo%20e%20Funil%20pronto%20em%2024h.'
  },

  // 3. PLANO VIP ILIMITADO
  {
    id: 'vip',
    tag: 'EXPERIÊNCIA EXCLUSIVA',
    name: 'Plano VIP',
    isPopular: false,
    setupPrice: 'R$ 197,00',
    setupNote: 'taxa única de criação personalizada',
    monthlyText: '1º mês grátis • Depois R$ 79,90/mês',
    description: 'Para clínicas, salões e negócios de alta demanda.',
    features: [
      { name: 'Tudo do Plano Pro', included: true },
      { name: 'Design 100% exclusivo alinhado à identidade visual da sua marca', included: true },
      { name: 'Configuração gratuita de domínio próprio (ex: seunome.com.br)', included: true },
      { name: 'Alterações mensais ILIMITADAS feitas pelo nosso suporte', included: true },
      { name: 'Suporte prioritário VIP direto no WhatsApp pessoal', included: true },
      { name: 'Relatório mensal de cliques e conversões', included: true }
    ],
    ctaText: 'Contratar Plano VIP no WhatsApp',
    ctaHref: 'https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20o%20Plano%20VIP%20com%20design%20exclusivo%20e%20dom%C3%ADnio%20configurado.'
  }
]

export const FAQ_LIST = [
  {
    q: 'Como funciona a entrega em 24 horas?',
    a: 'Após a contratação pelo WhatsApp, você envia suas fotos, logotipo e lista de serviços com valores. Nossa equipe de especialistas configura seu microsite por completo, aplicando design de luxo, catálogo interativo e botões de agendamento em até 24 horas úteis.'
  },
  {
    q: 'Eu preciso saber mexer em programação ou ferramentas de design?',
    a: 'Zero! Nós fazemos 100% do trabalho técnico e visual para você. Você só precisa nos mandar as informações pelo WhatsApp como conversa com um cliente.'
  },
  {
    q: 'Como funciona o acesso ao editor após a entrega?',
    a: 'Você recebe um login e senha exclusivos para acessar o Painel BioVip no seu celular ou computador. Lá você tem autonomia total para mudar preços, adicionar novos procedimentos, trocar fotos ou horários sem depender de ninguém.'
  },
  {
    q: 'Existe contrato de fidelidade?',
    a: 'Não. Você tem o 1º mês grátis de hospedagem e manutenção, e pode cancelar a qualquer momento diretamente pelo painel com apenas 1 clique.'
  },
  {
    q: 'Posso usar meu próprio domínio (ex: meunome.com.br)?',
    a: 'Sim! No Plano VIP, nossa equipe realiza toda a configuração técnica do seu domínio próprio gratuitamente. Nos demais planos você utiliza seu link exclusivo biovip.com.br/seunome com abertura ultra-rápida no Instagram.'
  }
]

// Tipagem dos planos disponíveis
export type PlanTier = 'basico' | 'pro' | 'vip';

// Chaves únicas para cada módulo do ecossistema BioVip
export type ModuleKey =
  // 1. Identidade & Design
  | 'dynamic_island'
  | 'verified_badge'
  | 'custom_fonts'
  // 2. Ações & Contato
  | 'quick_action_bar'
  | 'vip_action_button'
  | 'vcf_card'
  // 3. Conversão & Funil
  | 'announcement_bar'
  | 'urgency_timer'
  | 'anti_curious_quiz'
  | 'floating_whatsapp_widget'
  // 4. Catálogo & Serviços
  | 'service_catalog'
  | 'before_after_slider'
  | 'smart_masonry_gallery'
  | 'step_journey'
  // 5. Autoridade & Prova Social
  | 'client_reviews'
  | 'authority_counters'
  | 'bio_signature'
  // 6. Localização & FAQ
  | 'realtime_business_status'
  | 'gps_routes'
  | 'accordion_faq'
  // 7. Tráfego & Domínio
  | 'meta_pixel'
  | 'tiktok_ga4_analytics'
  | 'custom_domain';

// Metadados do módulo para exibição visual e gatilhos de upgrade
export interface ModuleMetadata {
  id: ModuleKey;
  name: string;
  category: 'design' | 'actions' | 'conversion' | 'catalog' | 'authority' | 'location' | 'traffic';
  minPlanRequired: PlanTier;
  upgradeHook: string; // Frase persuasiva para o modal de upgrade
}

// Configuração completa de cada módulo
export const BIOVIP_MODULES: Record<ModuleKey, ModuleMetadata> = {
  // Básico
  quick_action_bar: {
    id: 'quick_action_bar',
    name: 'Quick Action Bar',
    category: 'actions',
    minPlanRequired: 'basico',
    upgradeHook: 'Atalhos de 1 toque para WhatsApp e Instagram.'
  },
  vip_action_button: {
    id: 'vip_action_button',
    name: 'Botão VIP Principal',
    category: 'actions',
    minPlanRequired: 'basico',
    upgradeHook: 'Botão com mensagem personalizada para o WhatsApp.'
  },
  vcf_card: {
    id: 'vcf_card',
    name: 'Cartão Digital (.VCF)',
    category: 'actions',
    minPlanRequired: 'basico',
    upgradeHook: 'Permite ao cliente salvar seu contato com 1 clique.'
  },
  gps_routes: {
    id: 'gps_routes',
    name: 'Rotas GPS (Maps & Waze)',
    category: 'location',
    minPlanRequired: 'basico',
    upgradeHook: 'Guia clientes direto para o seu endereço.'
  },
  accordion_faq: {
    id: 'accordion_faq',
    name: 'Dúvidas Frequentes (FAQ)',
    category: 'location',
    minPlanRequired: 'basico',
    upgradeHook: 'Esclareça formas de pagamento e políticas de atendimento.'
  },
  verified_badge: {
    id: 'verified_badge',
    name: 'Selo de Verificado',
    category: 'design',
    minPlanRequired: 'basico',
    upgradeHook: 'Transmita autoridade imediata na foto de perfil.'
  },

  // Pro
  service_catalog: {
    id: 'service_catalog',
    name: 'Catálogo de Serviços com Preços',
    category: 'catalog',
    minPlanRequired: 'pro',
    upgradeHook: 'Elimine curiosos mostrando seus valores e agendamento direto.'
  },
  smart_masonry_gallery: {
    id: 'smart_masonry_gallery',
    name: 'Galeria Smart Masonry',
    category: 'catalog',
    minPlanRequired: 'pro',
    upgradeHook: 'Exiba seu portfólio de alta resolução com zoom em tela cheia.'
  },
  anti_curious_quiz: {
    id: 'anti_curious_quiz',
    name: 'Triagem Anti-Curiosos (Quiz)',
    category: 'conversion',
    minPlanRequired: 'pro',
    upgradeHook: 'Qualifique a cliente antes de ela chamar no WhatsApp.'
  },
  announcement_bar: {
    id: 'announcement_bar',
    name: 'Barra de Alerta Superior',
    category: 'conversion',
    minPlanRequired: 'pro',
    upgradeHook: 'Destaque vagas abertas ou avisos urgentes no topo da tela.'
  },
  floating_whatsapp_widget: {
    id: 'floating_whatsapp_widget',
    name: 'WhatsApp Flutuante (Online Agora)',
    category: 'conversion',
    minPlanRequired: 'pro',
    upgradeHook: 'Aumente as chamadas com status online em tempo real.'
  },
  client_reviews: {
    id: 'client_reviews',
    name: 'Depoimentos Verificados',
    category: 'authority',
    minPlanRequired: 'pro',
    upgradeHook: 'Passe confiança com avaliações 5 estrelas de clientes reais.'
  },
  authority_counters: {
    id: 'authority_counters',
    name: 'Contadores de Impacto',
    category: 'authority',
    minPlanRequired: 'pro',
    upgradeHook: 'Destaque números expressivos de clientes atendidos.'
  },
  realtime_business_status: {
    id: 'realtime_business_status',
    name: 'Status Aberto/Fechado em Tempo Real',
    category: 'location',
    minPlanRequired: 'pro',
    upgradeHook: 'Informa automaticamente se seu estúdio está em horário de atendimento.'
  },
  step_journey: {
    id: 'step_journey',
    name: 'Como Funciona em 3 Passos',
    category: 'catalog',
    minPlanRequired: 'pro',
    upgradeHook: 'Explique a experiência do atendimento passo a passo.'
  },
  bio_signature: {
    id: 'bio_signature',
    name: 'Biografia com Assinatura Cursiva',
    category: 'authority',
    minPlanRequired: 'pro',
    upgradeHook: 'Apresentação refinada da fundadora ou equipe.'
  },

  // VIP
  dynamic_island: {
    id: 'dynamic_island',
    name: 'Dynamic Island com Código VIP',
    category: 'design',
    minPlanRequired: 'vip',
    upgradeHook: 'Topo de smartphone de luxo com identificador exclusivo.'
  },
  before_after_slider: {
    id: 'before_after_slider',
    name: 'Comparador Antes e Depois Interativo',
    category: 'catalog',
    minPlanRequired: 'vip',
    upgradeHook: 'Barra deslizante para exibir a transformação visual do cliente.'
  },
  urgency_timer: {
    id: 'urgency_timer',
    name: 'Cronômetro Dinâmico de Escassez',
    category: 'conversion',
    minPlanRequired: 'vip',
    upgradeHook: 'Gatilho de urgência para fechar vagas limitadas da semana.'
  },
  meta_pixel: {
    id: 'meta_pixel',
    name: 'Integração Meta Pixel (Facebook Ads)',
    category: 'traffic',
    minPlanRequired: 'vip',
    upgradeHook: 'Dispare eventos automáticos para baratear seus anúncios pagos.'
  },
  tiktok_ga4_analytics: {
    id: 'tiktok_ga4_analytics',
    name: 'Google Analytics 4 & TikTok Pixel',
    category: 'traffic',
    minPlanRequired: 'vip',
    upgradeHook: 'Métricas completas de origem de cliques e conversões.'
  },
  custom_domain: {
    id: 'custom_domain',
    name: 'Apontamento de Domínio Próprio (.com.br)',
    category: 'traffic',
    minPlanRequired: 'vip',
    upgradeHook: 'Tenha seu site no endereço oficial do seu negócio sem "biovip".'
  },
  custom_fonts: {
    id: 'custom_fonts',
    name: 'Tipografia Exclusiva Sob Medida',
    category: 'design',
    minPlanRequired: 'vip',
    upgradeHook: 'Acesso irrestrito a fontes raras e direção de arte completa.'
  }
};

// Hierarquia de planos para verificação de permissões
export const PLAN_RANKS: Record<PlanTier, number> = {
  basico: 1,
  pro: 2,
  vip: 3
};

/**
 * Verifica se um plano possui acesso a determinado módulo
 */
export function canAccessModule(moduleKey: ModuleKey, userPlan: PlanTier): boolean {
  const moduleMeta = BIOVIP_MODULES[moduleKey];
  if (!moduleMeta) return false;
  return PLAN_RANKS[userPlan] >= PLAN_RANKS[moduleMeta.minPlanRequired];
}

/**
 * Retorna todos os módulos agrupados pela categoria
 */
export function getModulesByCategory(category: ModuleMetadata['category']): ModuleMetadata[] {
  return Object.values(BIOVIP_MODULES).filter(m => m.category === category);
}

/**
 * Retorna todos os módulos liberados para um determinado plano
 */
export function getAvailableModulesForPlan(plan: PlanTier): ModuleMetadata[] {
  return Object.values(BIOVIP_MODULES).filter(m => canAccessModule(m.id, plan));
}

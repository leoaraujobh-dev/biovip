'use client'

export interface ClientPermissions {
  allowEditServices: boolean   // Catálogo & Procedimentos
  allowEditPhotos: boolean     // Fotos de Perfil & Galeria
  allowEditTheme: boolean      // Cores & Paletas
  allowEditTypography: boolean // Fontes & Tipografia
  allowEditButtons: boolean    // Botões & Links
  allowEditBio: boolean        // Nome, Cargo & Bio
  allowEditLocation: boolean   // Endereço, Maps, Waze
  allowEditModules: boolean    // Ligar / Desligar Módulos
}

export interface ModuleToggles {
  announcement: boolean   // Barra de Alerta Superior
  urgency: boolean        // Cronômetro de Urgência
  profile: boolean        // Retrato & Nome de Topo
  quickActions: boolean   // Botões Rápidos (WhatsApp, Insta, Agenda)
  buttons: boolean        // Botões Customizados
  quiz: boolean           // Triagem Anti-Curiosos
  services: boolean       // Catálogo de Serviços VIP com Preços
  gallery: boolean        // Galeria de Fotos / Trabalhos
  beforeAfter: boolean    // Antes e Depois Interativo
  location: boolean       // Localização & Rotas (Maps/Waze/Uber)
  reviews: boolean        // Depoimentos / Avaliações
  about: boolean          // Sobre o Especialista
  faq: boolean            // Perguntas Frequentes (FAQ)
  stats: boolean          // Métricas de Conversão
  howItWorks: boolean     // Como Funciona em 3 Passos
}

export const DEFAULT_CLIENT_PERMISSIONS: ClientPermissions = {
  allowEditServices: true,
  allowEditPhotos: true,
  allowEditTheme: true,
  allowEditTypography: true,
  allowEditButtons: true,
  allowEditBio: true,
  allowEditLocation: true,
  allowEditModules: true,
}

export const DEFAULT_MODULE_TOGGLES: ModuleToggles = {
  announcement: true,
  urgency: true,
  profile: true,
  quickActions: true,
  buttons: true,
  quiz: true,
  services: true,
  gallery: true,
  beforeAfter: true,
  location: true,
  reviews: true,
  about: true,
  faq: true,
  stats: true,
  howItWorks: true,
}

export const MODULE_DESCRIPTIONS: Record<keyof ModuleToggles, { label: string; description: string; icon: string }> = {
  announcement: {
    label: 'Barra de Alerta & Escassez',
    description: 'Faixa superior comunicando agenda aberta ou plantão VIP.',
    icon: 'Flame',
  },
  urgency: {
    label: 'Cronômetro de Urgência',
    description: 'Contador regressivo para condições e horários especiais.',
    icon: 'Clock',
  },
  profile: {
    label: 'Retrato de Estúdio & Nome',
    description: 'Foto principal com dissolução orgânica, nome e registro.',
    icon: 'User',
  },
  quickActions: {
    label: 'Ações Rápidas (WhatsApp / Insta / Agenda)',
    description: 'Três botões principais com atalhos diretos.',
    icon: 'Zap',
  },
  buttons: {
    label: 'Botões Customizados & Links Nobres',
    description: 'Links principais com animações, imagens e destaques.',
    icon: 'Layers',
  },
  quiz: {
    label: 'Triagem Anti-Curiosos (Quiz VIP)',
    description: 'Formulário rápido para qualificar a intenção do cliente.',
    icon: 'HelpCircle',
  },
  services: {
    label: 'Catálogo de Serviços & Procedimentos',
    description: 'Tabela de serviços com valores, tempos e agendamento.',
    icon: 'Sparkles',
  },
  gallery: {
    label: 'Galeria de Fotos / Portfólio',
    description: 'Fotos reais com carrossel, mosaico e zoom em lightbox.',
    icon: 'Image',
  },
  beforeAfter: {
    label: 'Antes & Depois Interativo',
    description: 'Comparador com controle deslizante de transformações.',
    icon: 'Sliders',
  },
  location: {
    label: 'Localização & Rotas (Maps / Waze / Uber)',
    description: 'Endereço e botões de GPS com status "Aberto Agora".',
    icon: 'MapPin',
  },
  reviews: {
    label: 'Depoimentos & Avaliações',
    description: 'Notas de 5 estrelas e comentários reais de clientes.',
    icon: 'Star',
  },
  about: {
    label: 'Sobre o Especialista / Espaço',
    description: 'Texto de apresentação, missão e autoridade.',
    icon: 'Award',
  },
  faq: {
    label: 'Dúvidas Frequentes (FAQ)',
    description: 'Perguntas e respostas sanfonadas para quebrar objeções.',
    icon: 'MessageCircle',
  },
  stats: {
    label: 'Métricas de Conversão & Prova Social',
    description: 'Contadores de atendimentos, views e taxa de aprovação.',
    icon: 'TrendingUp',
  },
  howItWorks: {
    label: 'Como Funciona (3 Passos)',
    description: 'Guia simples explicando como agendar e ser atendido.',
    icon: 'CheckCircle2',
  },
}

export const PERMISSION_DESCRIPTIONS: Record<keyof ClientPermissions, { label: string; description: string }> = {
  allowEditServices: {
    label: 'Editar Catálogo de Serviços & Preços',
    description: 'Permite alterar procedimentos, valores, duração e fotos de serviços.',
  },
  allowEditPhotos: {
    label: 'Editar Fotos de Perfil & Galeria',
    description: 'Permite trocar o retrato principal e fazer upload de fotos na galeria.',
  },
  allowEditTheme: {
    label: 'Editar Cores & Paleta Visual',
    description: 'Permite alternar entre as paletas de cores e estilo de fundo.',
  },
  allowEditTypography: {
    label: 'Editar Fontes & Tipografia',
    description: 'Permite escolher entre as 16 fontes editoriais do BioVip.',
  },
  allowEditButtons: {
    label: 'Editar Botões Customizados & Links',
    description: 'Permite adicionar, remover e reordenar links e botões de ação.',
  },
  allowEditBio: {
    label: 'Editar Dados Pessoais & Bio',
    description: 'Permite alterar nome de exibição, cargo, bio e registro profissional.',
  },
  allowEditLocation: {
    label: 'Editar Localização & Mapa',
    description: 'Permite alterar o endereço físico e links de rotas GPS.',
  },
  allowEditModules: {
    label: 'Ativar / Desativar Módulos do BioSite',
    description: 'Permite ao cliente ligar ou desligar blocos em seu painel.',
  },
}

/**
 * Obtém a configuração de permissões e módulos de um cliente pelo slug
 */
export function getClientConfig(slug: string): { permissions: ClientPermissions; modules: ModuleToggles } {
  if (typeof window === 'undefined') {
    return {
      permissions: { ...DEFAULT_CLIENT_PERMISSIONS },
      modules: { ...DEFAULT_MODULE_TOGGLES },
    }
  }

  try {
    const raw = localStorage.getItem(`biovip_client_config_${slug}`)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        permissions: { ...DEFAULT_CLIENT_PERMISSIONS, ...(parsed.permissions || {}) },
        modules: { ...DEFAULT_MODULE_TOGGLES, ...(parsed.modules || {}) },
      }
    }
  } catch (err) {
    console.warn(`Erro ao ler biovip_client_config_${slug}:`, err)
  }

  return {
    permissions: { ...DEFAULT_CLIENT_PERMISSIONS },
    modules: { ...DEFAULT_MODULE_TOGGLES },
  }
}

/**
 * Salva a configuração de permissões e módulos de um cliente pelo slug
 */
export function saveClientConfig(
  slug: string,
  config: { permissions?: Partial<ClientPermissions>; modules?: Partial<ModuleToggles> }
) {
  if (typeof window === 'undefined') return

  try {
    const current = getClientConfig(slug)
    const updated = {
      permissions: { ...current.permissions, ...(config.permissions || {}) },
      modules: { ...current.modules, ...(config.modules || {}) },
    }

    localStorage.setItem(`biovip_client_config_${slug}`, JSON.stringify(updated))

    // Dispara evento para atualização em tempo real
    window.dispatchEvent(new CustomEvent('biovip_permissions_updated', { detail: { slug, ...updated } }))
    window.dispatchEvent(new StorageEvent('storage', { key: `biovip_client_config_${slug}` }))
  } catch (err) {
    console.warn(`Erro ao salvar biovip_client_config_${slug}:`, err)
  }
}


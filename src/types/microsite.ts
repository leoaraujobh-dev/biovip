export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  };
}

export type MaintenancePlanId = 'basic_1' | 'pro_4' | 'vip_unlimited';

export type CustomerDelinquencyStatus =
  | 'pago'
  | 'pendente'
  | 'atrasado_d3'
  | 'suspenso_d7'
  | 'active'
  | 'overdue'
  | 'disabled';

export type CrmStage =
  | 'demonstracao'
  | 'proposta_enviada'
  | 'negociacao'
  | 'aceito_ativo'
  | 'recusado'
  | 'expirado';

export interface SaveFormState {
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  maintenancePlan: MaintenancePlanId;
  monthlyFee: string | number;
  creationFee: string | number;
  isFirstMonth?: boolean;
  subdomain: string;
  customDomain: string;
  isLandingModel?: boolean;
  isTemporaryDemo?: boolean;
  demoDurationDays?: number;
  proposalValue?: string;
  crmStage?: CrmStage;
  prospectNotes?: string;
}

export interface ActionCardItem {
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
}

export interface SavedMicrosite {
  id: string;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  nicheCategory: string;
  createdAt: string;
  dueDate: string; // YYYY-MM-DD
  monthlyFee: number; // Valor da taxa de manutenção mensal (29.90, 49.90 ou 79.90)
  maintenancePlan?: MaintenancePlanId;
  creationFee?: number; // Taxa de criação cobrada exclusivamente no 1º mês
  isFirstMonth?: boolean; // No 1º mês cobra apenas a taxa de criação e NÃO há mensalidade
  status: CustomerDelinquencyStatus;
  daysOverdue?: number; // Número de dias em atraso (0 se em dia)
  edicoesBloqueadas?: boolean; // True quando atrasado >= 3 dias (ou bloqueado por inadimplência)
  linkStatus?: 'ativo' | 'manutencao'; // Estado público do link ('ativo' | 'manutencao')
  autoDisabledByOverdue?: boolean; // True quando desativado automaticamente a partir do 7º dia de atraso
  manualOverrideUntil?: string; // Permite exceção manual temporária pelo admin
  updatesThisMonth: number;
  lastUpdated: string;
  domainType: 'subdomain' | 'custom';
  subdomain: string;
  customDomain: string;
  dnsConfigured: boolean;
  sslActive: boolean;
  whatsappClicks?: number;
  pageViews?: number;
  trafficSources?: {
    instagram: number;
    tiktok: number;
    googleMaps: number;
    paidAds: number;
    direct: number;
  };
  isLandingModel?: boolean;
  isCustomized?: boolean; // True quando o site foi editado e salvo pelo usuário, protegendo de sobrescritas por modelos predefinidos
  isUnderConstruction?: boolean; // True quando o site foi pago mas ainda está em fase de construção
  underConstruction?: boolean; // Alias compatível
  briefingStatus?: 'pending' | 'submitted'; // Status de envio das informações pelo cliente
  briefingData?: {
    instagramOrMaps?: string;
    selectedModel?: string;
    commercialName?: string;
    bioText?: string;
    whatsappNumber?: string;
    mainServices?: string;
    notes?: string;
    submittedAt?: string;
  };
  // Módulo CRM de Prospecção & Criação Temporária
  isTemporaryDemo?: boolean; // True para criação temporária de degustação comercial CRM
  demoExpiresAt?: string; // ISO date string da expiração do link de demonstração
  demoDurationDays?: number; // Duração original em dias (ex: 3, 7, 14)
  crmStage?: CrmStage; // Estágio do lead no funil CRM
  proposalValue?: number; // Valor proposto para fechamento do microsite (ex: R$ 197,00)
  prospectNotes?: string; // Anotações do consultor/vendedor sobre a negociação
  activationDate?: string; // Data em que o cliente aceitou e o microsite foi ativado definitivamente
  data: any; // Type of INITIAL_DATA
}

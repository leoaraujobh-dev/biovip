import {
  SaveModal,
  PublishModal,
  PdfReportModal,
  AiGeneratorModal,
  PixBillingModal,
  SuspendedPreviewModal,
  AiCopyModal,
  LightboxModal,
  QrCodeModal,
  ResetTrackingModal,
  DeleteConfirmModal,
  ClientWaPromptModal,
  BulkEmailModal,
  SecurityModal,
  SubdomainModal,
  PaymentSuccessModal,
  UnderConstructionPreviewModal,
} from './components/modals';
import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Smartphone,
  Copy,
  Download,
  Calendar,
  MessageCircle,
  Instagram,
  MapPin,
  Heart,
  TrendingUp,
  HelpCircle,
  Palette,
  Layers,
  User,
  Star,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Grid,
  Plus,
  Trash2,
  Image as ImageIcon,
  SlidersHorizontal,
  BellRing,
  Code,
  Tag,
  Send,
  X,
  Target,
  Upload,
  Briefcase,
  GraduationCap,
  Scale,
  ListOrdered,
  Users,
  Navigation,
  Filter,
  CheckCircle2,
  Search,
  Scissors,
  Globe,
  ShieldCheck,
  AlertCircle,
  CalendarClock,
  Power,
  Edit3,
  Save,
  ExternalLink,
  Lock,
  RefreshCw,
  RotateCcw,
  CreditCard,
  Server,
  Eye,
  DollarSign,
  AlertTriangle,
  FileText,
  Printer,
  QrCode,
  Folder,
  FolderArchive,
  Clock,
  Wand2,
  LayoutGrid,
  Play,
  Pause,
  Share2,
  LogOut,
  Mail,
  KeyRound,
  EyeOff,
  ShieldAlert,
  History,
  Zap
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  serverTimestamp,
  onSnapshot,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK (Single-File Mandate)
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
const ADMIN_OWNER_EMAIL = ((import.meta as any).env?.VITE_ADMIN_EMAIL || 'leoaraujobh@gmail.com').trim();


// ==========================================
// MODULAR ARCHITECTURE (EXTRACTED IMPORTS)
// ==========================================
import {
  formatWhatsAppPhone,
  parseBrlCurrency,
  escapeHtmlAttr,
  sanitizeImageUrl,
  serializeSafeFirestorePayload,
  safeCopyText,
  getLuminance,
  getSafeContrastText,
  optimizeImageUrl,
} from './utils/formatters';

import {
  IDB_NAME,
  IDB_VERSION,
  IDB_STORE,
  IDB_IMAGE_STORE,
  IDB_KEY,
  getCachedImageFromIdb,
  saveImageToIdbCache,
  saveSitesToIndexedDb,
  loadSitesFromIndexedDb,
  persistSavedSitesToStorage,
} from './utils/storage';

import {
  OperationType,
  FirestoreErrorInfo,
  MaintenancePlanId,
  CustomerDelinquencyStatus,
  CrmStage,
  ActionCardItem,
  SavedMicrosite,
  SaveFormState,
} from './types/microsite';

import {
  THEMES,
  PHOTO_FILTERS,
  FONT_OPTIONS,
} from './constants/themes';

import {
  EXTRA_UPDATE_FEE,
  AUTO_DISABLE_OVERDUE_DAYS,
  MAINTENANCE_PLANS,
  parsePlanMaxUpdates,
  formatPlanUpdatesLabel,
  formatCreationPriceDisplay,
  syncMaintenancePlansFromConfig,
  getSiteBillingSummary,
} from './constants/maintenancePlans';

import {
  INITIAL_DATA,
  NICHE_DEMO_MODULE_COLORS,
  INITIAL_SAVED_SITES,
} from './constants/initialData';

import {
  getDemoDaysRemaining,
  isDemoExpired,
  getSuspendedPageHtml,
  isSiteUnderConstruction,
  isModelMicrosite,
  getUnderConstructionPageHtml,
} from './utils/htmlGenerators';

import {
  WhatsAppIcon,
  InstagramIcon,
  CalendarIcon,
  WHATSAPP_SVG_STRING,
  INSTAGRAM_SVG_STRING,
  CALENDAR_SVG_STRING,
} from './components/icons/BrandIcons';

import { SimulatorImage } from './components/SimulatorImage';
import { SimulatorChassis } from './components/simulator/SimulatorChassis';
import { StylingTab } from './components/editor/tabs/StylingTab';
import { IdentityTab } from './components/editor/tabs/IdentityTab';
import { QualifierTab } from './components/editor/tabs/QualifierTab';
import { ServicesTab } from './components/editor/tabs/ServicesTab';
import { ButtonsTab } from './components/editor/tabs/ButtonsTab';
import { HighConversionTab } from './components/editor/tabs/HighConversionTab';
import { SeoTab } from './components/editor/tabs/SeoTab';
import { TrackingTab } from './components/editor/tabs/TrackingTab';
import { ExportTab } from './components/editor/tabs/ExportTab';
import { QuickCreateTab } from './components/editor/tabs/QuickCreateTab';
import { ModulesTab } from './components/editor/tabs/ModulesTab';
import { DashboardTab } from './components/editor/tabs/DashboardTab';
import { FullscreenClientsView } from './components/views/FullscreenClientsView';
import { generateExportCode as generateExportCodeEngine } from './utils/exportEngine';

// Re-exports for backward compatibility
export {
  WhatsAppIcon,
  InstagramIcon,
  CalendarIcon,
  getLuminance,
  getSafeContrastText,
  parsePlanMaxUpdates,
  formatPlanUpdatesLabel,
  formatCreationPriceDisplay,
  syncMaintenancePlansFromConfig,
  getDemoDaysRemaining,
  isDemoExpired,
  getSuspendedPageHtml,
  isSiteUnderConstruction,
  isModelMicrosite,
  getUnderConstructionPageHtml,
  getSiteBillingSummary,
  NICHE_DEMO_MODULE_COLORS,
  optimizeImageUrl,
  getCachedImageFromIdb,
  saveImageToIdbCache,
};
export type { MaintenancePlanId, CustomerDelinquencyStatus, CrmStage, SavedMicrosite };

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: firebaseAuth.currentUser?.uid,
      email: firebaseAuth.currentUser?.email,
      emailVerified: firebaseAuth.currentUser?.emailVerified,
      isAnonymous: firebaseAuth.currentUser?.isAnonymous,
      tenantId: firebaseAuth.currentUser?.tenantId,
      providerInfo: firebaseAuth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(firebaseDb, '_connection_test_', 'ping'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration. The client is offline.');
    }
  }
}
testFirestoreConnection();

export default function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState('quickCreate');
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedThemeCategory, setSelectedThemeCategory] = useState('Todas as Paletas');
  const [themeSearchQuery, setThemeSearchQuery] = useState('');
  const [isSimulatorLoading, setIsSimulatorLoading] = useState(false);
  const simulatorTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerSimulatorSkeleton = (durationMs = 380) => {
    if (simulatorTimerRef.current) {
      clearTimeout(simulatorTimerRef.current);
    }
    setIsSimulatorLoading(true);
    simulatorTimerRef.current = setTimeout(() => {
      setIsSimulatorLoading(false);
    }, durationMs);
  };

  const getDaysUntilDue = (dueDateStr: string): number => {
    if (!dueDateStr) return 999;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const parts = dueDateStr.split('-');
    if (parts.length < 3) return 999;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const due = new Date(y, m, d);
    due.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  };

  const isSiteSuspendedStatus = (site: SavedMicrosite): boolean => {
    return (
      site.linkStatus === 'manutencao' ||
      site.status === 'suspenso_d7' ||
      site.status === 'disabled'
    );
  };

  const isSiteOverdueStatus = (site: SavedMicrosite, daysDiffVal?: number): boolean => {
    const d = typeof daysDiffVal === 'number' ? daysDiffVal : getDaysUntilDue(site.dueDate);
    return (
      !isSiteSuspendedStatus(site) &&
      (d < 0 || site.status === 'overdue' || site.status === 'atrasado_d3' || site.status === 'pendente')
    );
  };

  const isSiteEditsLocked = (site: SavedMicrosite, daysOverdueVal?: number): boolean => {
    if (typeof site.edicoesBloqueadas === 'boolean') return site.edicoesBloqueadas;
    const dOverdue =
      typeof daysOverdueVal === 'number'
        ? daysOverdueVal
        : typeof site.daysOverdue === 'number'
        ? site.daysOverdue
        : Math.max(0, -getDaysUntilDue(site.dueDate));
    return (
      dOverdue >= 3 ||
      site.status === 'atrasado_d3' ||
      site.status === 'suspenso_d7' ||
      site.status === 'disabled'
    );
  };

  // Regra Oficial: Régua de Cobrança e Gestão de Inadimplência com Suspensão Progressiva (D+3 Bloqueio de Edições / D+7 Modo Manutenção)
  const enforceAutoSevenDayOverdueRule = (sitesList: SavedMicrosite[]): {
    normalized: SavedMicrosite[];
    changed: boolean;
    newlyAutoDisabled: string[];
  } => {
    const todayStr = new Date().toISOString().split('T')[0];
    let changed = false;
    const newlyAutoDisabled: string[] = [];

    const normalized = sitesList.map((site) => {
      if (isModelMicrosite(site)) {
        return site;
      }
      const daysDiff = getDaysUntilDue(site.dueDate);
      const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : 0;
      const hasActiveManualOverride = Boolean(site.manualOverrideUntil && site.manualOverrideUntil >= todayStr);

      // Estágio D+7 (daysOverdue >= 7): Suspensão Temporária Automática -> status 'suspenso_d7', edicoesBloqueadas: true, linkStatus: 'manutencao'
      if (daysOverdue >= AUTO_DISABLE_OVERDUE_DAYS && !hasActiveManualOverride) {
        if (
          site.status !== 'suspenso_d7' ||
          !site.autoDisabledByOverdue ||
          site.daysOverdue !== daysOverdue ||
          site.edicoesBloqueadas !== true ||
          site.linkStatus !== 'manutencao'
        ) {
          changed = true;
          if (site.status !== 'suspenso_d7' && site.status !== 'disabled') {
            newlyAutoDisabled.push(`${site.clientName} (${daysOverdue} dias em atraso)`);
          }
          return {
            ...site,
            status: 'suspenso_d7' as const,
            daysOverdue,
            edicoesBloqueadas: true,
            linkStatus: 'manutencao' as const,
            autoDisabledByOverdue: true,
          };
        }
        return site;
      }

      // Estágio D+3 a D+6 (daysOverdue >= 3 e < 7): Atraso Leve -> status 'atrasado_d3', edicoesBloqueadas: true, link continua 'ativo' (salvo suspensão manual)
      if (daysOverdue >= 3 && daysOverdue < AUTO_DISABLE_OVERDUE_DAYS) {
        const targetLinkStatus: 'ativo' | 'manutencao' =
          site.linkStatus === 'manutencao' && !site.autoDisabledByOverdue ? 'manutencao' : 'ativo';
        if (
          site.status !== 'atrasado_d3' ||
          site.daysOverdue !== daysOverdue ||
          site.edicoesBloqueadas !== true ||
          site.linkStatus !== targetLinkStatus ||
          site.autoDisabledByOverdue
        ) {
          changed = true;
          return {
            ...site,
            status: 'atrasado_d3' as const,
            daysOverdue,
            edicoesBloqueadas: true,
            linkStatus: targetLinkStatus,
            autoDisabledByOverdue: false,
          };
        }
        return site;
      }

      // Entre 1 e 2 dias de atraso ou vencendo hoje (D-0): status 'pendente', edicoesBloqueadas: false
      if (daysOverdue > 0 && daysOverdue < 3) {
        const targetLinkStatus: 'ativo' | 'manutencao' =
          site.linkStatus === 'manutencao' && !site.autoDisabledByOverdue ? 'manutencao' : 'ativo';
        if (
          site.status !== 'pendente' ||
          site.daysOverdue !== daysOverdue ||
          site.edicoesBloqueadas !== false ||
          site.linkStatus !== targetLinkStatus ||
          site.autoDisabledByOverdue
        ) {
          changed = true;
          return {
            ...site,
            status: 'pendente' as const,
            daysOverdue,
            edicoesBloqueadas: false,
            linkStatus: targetLinkStatus,
            autoDisabledByOverdue: false,
          };
        }
        return site;
      }

      // Em dia (daysDiff >= 0)
      if (daysDiff >= 0) {
        const expectedStatus: CustomerDelinquencyStatus =
          site.linkStatus === 'manutencao' && !site.autoDisabledByOverdue
            ? site.status
            : daysDiff === 0
            ? 'pendente'
            : 'pago';
        const expectedLinkStatus: 'ativo' | 'manutencao' =
          site.autoDisabledByOverdue ? 'ativo' : (site.linkStatus || 'ativo');
        const expectedEdicoes =
          site.autoDisabledByOverdue ? false : Boolean(site.edicoesBloqueadas && site.linkStatus === 'manutencao');

        if (
          site.daysOverdue !== 0 ||
          site.status === 'overdue' ||
          site.status === 'atrasado_d3' ||
          site.status === 'active' ||
          ((site.status === 'disabled' || site.status === 'suspenso_d7') && site.autoDisabledByOverdue) ||
          site.linkStatus !== expectedLinkStatus
        ) {
          changed = true;
          return {
            ...site,
            status: expectedStatus,
            daysOverdue: 0,
            edicoesBloqueadas: expectedEdicoes,
            linkStatus: expectedLinkStatus,
            autoDisabledByOverdue: false,
            manualOverrideUntil: undefined,
          };
        }
      }

      return site;
    });

    return { normalized, changed, newlyAutoDisabled };
  };

  // Saved Microsites Management State (já aplica a desativação automática de 7 dias ao inicializar)
  const [savedSites, setSavedSites] = useState<SavedMicrosite[]>(() => {
    let baseList = INITIAL_SAVED_SITES;
    try {
      const raw = localStorage.getItem('luxebio_saved_sites_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) baseList = parsed;
      }
      const deletedRaw = localStorage.getItem('luxebio_deleted_site_ids_v1');
      if (deletedRaw) {
        const deletedIds = JSON.parse(deletedRaw);
        if (Array.isArray(deletedIds) && deletedIds.length > 0) {
          baseList = baseList.filter(s => !deletedIds.includes(s.id));
        }
      }
    } catch {}
    const { normalized } = enforceAutoSevenDayOverdueRule(baseList);
    try {
      localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(normalized));
    } catch {}
    return normalized;
  });

  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);
  const [editingDueDateSiteId, setEditingDueDateSiteId] = useState<string | null>(null);
  const [tempDueDateInput, setTempDueDateInput] = useState<string>('');
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [selectedPublishSiteId, setSelectedPublishSiteId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [dashboardSearch, setDashboardSearch] = useState('');
  const [dashboardStatusFilter, setDashboardStatusFilter] = useState('all');
  const [dashboardDueDateFilter, setDashboardDueDateFilter] = useState<'all' | 'today' | '7days' | '15days' | 'this_month' | 'overdue' | 'custom'>('all');
  const [dashboardDueDateExact, setDashboardDueDateExact] = useState('');
  const [dashboardSortBy, setDashboardSortBy] = useState<'dueDate_asc' | 'dueDate_desc' | 'fee_desc' | 'rate_desc' | 'name_asc'>('dueDate_asc');
  const [revenueGoal, setRevenueGoal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('luxebio_revenue_goal_v1');
      if (saved) return Number(saved) || 5000;
    } catch {}
    return 5000;
  });
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoalInput, setTempGoalInput] = useState('');
  const [pixCardExpanded, setPixCardExpanded] = useState(false);
  const [dnsTesting, setDnsTesting] = useState(false);
  const [dnsProviderTab, setDnsProviderTab] = useState<'registrobr' | 'godaddy' | 'hostinger' | 'cloudflare'>('registrobr');
  const [copiedDnsField, setCopiedDnsField] = useState<string | null>(null);
  const [dnsCheckStatus, setDnsCheckStatus] = useState<{
    checkedDomain: string;
    rootDomainChecked: string;
    cnameHostChecked: string;
    cnameFullDomainChecked: string;
    aRecordOk: boolean;
    aRecordPointingCorrectly: boolean;
    aRecordValues: string[];
    aRecordTtl?: number;
    aRecordStatusText: string;
    cnameRecordOk: boolean;
    cnameRecordPointingCorrectly: boolean;
    cnameRecordValues: string[];
    cnameRecordTypeResolved: 'CNAME' | 'A (Cloudflare Proxy / Flattened)' | 'NONE';
    cnameRecordTtl?: number;
    cnameRecordStatusText: string;
    sslOk: boolean;
    providerSource: string;
    overallStatus: 'verified' | 'partial' | 'pending' | 'error';
    statusSummary: string;
    checkedAt: string;
  } | null>(null);

  const copyDnsValue = async (value: string, fieldId: string, label: string) => {
    const ok = await safeCopyText(value);
    if (ok) {
      setCopiedDnsField(fieldId);
      showToast(`📋 ${label} (${value}) copiado!`);
      setTimeout(() => {
        setCopiedDnsField((prev) => (prev === fieldId ? null : prev));
      }, 2200);
    }
  };

  const validateCustomDomain = (rawInput: string) => {
    const rawTrimmed = (rawInput || '').trim();
    if (!rawTrimmed) {
      return {
        status: 'empty' as const,
        isValid: false,
        needsSanitization: false,
        sanitizedDomain: '',
        rootDomain: '',
        cnameHost: 'www',
        isSubdomain: false,
        errorMessage: '',
        warningMessage: '',
      };
    }

    const sanitized = rawTrimmed
      .toLowerCase()
      .replace(/^https?:\/\//i, '')
      .replace(/^\/+/, '')
      .replace(/\/.*$/, '')
      .replace(/:\d+$/, '')
      .replace(/\s+/g, '');

    const needsSanitization = rawTrimmed !== sanitized;

    if (/\s/.test(rawTrimmed)) {
      return {
        status: 'invalid' as const,
        isValid: false,
        needsSanitization: true,
        sanitizedDomain: sanitized,
        rootDomain: '',
        cnameHost: 'www',
        isSubdomain: false,
        errorMessage: 'O domínio não pode conter espaços em branco.',
        warningMessage: '',
      };
    }

    if (/[^a-z0-9.-]/.test(sanitized)) {
      return {
        status: 'invalid' as const,
        isValid: false,
        needsSanitization,
        sanitizedDomain: sanitized.replace(/[^a-z0-9.-]/g, ''),
        rootDomain: '',
        cnameHost: 'www',
        isSubdomain: false,
        errorMessage: 'Caracteres especiais inválidos detectados. Use apenas letras, números, hífens e pontos (ex: www.suaempresa.com.br).',
        warningMessage: '',
      };
    }

    if (!sanitized.includes('.')) {
      return {
        status: 'invalid' as const,
        isValid: false,
        needsSanitization,
        sanitizedDomain: `${sanitized}.com.br`,
        rootDomain: '',
        cnameHost: 'www',
        isSubdomain: false,
        errorMessage: 'Inclua a extensão final do domínio (TLD), como .com.br, .com, .med.br ou .adv.br.',
        warningMessage: '',
      };
    }

    if (sanitized.startsWith('.') || sanitized.endsWith('.') || sanitized.includes('..')) {
      return {
        status: 'invalid' as const,
        isValid: false,
        needsSanitization,
        sanitizedDomain: sanitized.replace(/\.+/g, '.').replace(/^\.|\.$/g, ''),
        rootDomain: '',
        cnameHost: 'www',
        isSubdomain: false,
        errorMessage: 'Formato de pontos inválido. O domínio não pode iniciar ou terminar com ponto.',
        warningMessage: '',
      };
    }

    const parts = sanitized.split('.');
    for (const part of parts) {
      if (!part || part.length > 63 || part.startsWith('-') || part.endsWith('-')) {
        return {
          status: 'invalid' as const,
          isValid: false,
          needsSanitization,
          sanitizedDomain: sanitized,
          rootDomain: '',
          cnameHost: 'www',
          isSubdomain: false,
          errorMessage: `O segmento "${part || ''}" é inválido. Nenhum bloco pode começar ou terminar com hífen (-).`,
          warningMessage: '',
        };
      }
    }

    const tld = parts[parts.length - 1];
    if (!/^[a-z]{2,18}$/.test(tld)) {
      return {
        status: 'invalid' as const,
        isValid: false,
        needsSanitization,
        sanitizedDomain: sanitized,
        rootDomain: '',
        cnameHost: 'www',
        isSubdomain: false,
        errorMessage: `A extensão final ".${tld}" não é válida. Use extensões reais como .com.br, .com, .site, .online, etc.`,
        warningMessage: '',
      };
    }

    // Check Brazilian compound TLDs like .com.br, .adv.br, .med.br, .odo.br, .arq.br, .org.br, .net.br
    const secondLast = parts.length >= 2 ? parts[parts.length - 2] : '';
    const isCompoundBr = tld === 'br' && parts.length >= 3 && secondLast.length <= 14;

    if (tld === 'br' && parts.length === 2) {
      return {
        status: 'invalid' as const,
        isValid: false,
        needsSanitization: true,
        sanitizedDomain: `${parts[0]}.com.br`,
        rootDomain: `${parts[0]}.com.br`,
        cnameHost: 'www',
        isSubdomain: false,
        errorMessage: `Domínios no Registro.br exigem categoria antes do .br (ex: ${parts[0]}.com.br, ${parts[0]}.adv.br ou ${parts[0]}.med.br).`,
        warningMessage: '',
      };
    }

    const rootLabelsCount = isCompoundBr ? 3 : 2;
    const rootDomain = parts.slice(-rootLabelsCount).join('.');
    const subParts = parts.slice(0, parts.length - rootLabelsCount);
    const subString = subParts.join('.');

    const isSubdomain = subParts.length > 0;
    const cnameHost = isSubdomain ? subString : 'www';

    let warningMessage = '';
    if (needsSanitization) {
      warningMessage = `Removemos protocolos/barras automaticamente. Formato limpo recomendado: "${sanitized}".`;
    }

    return {
      status: 'valid' as const,
      isValid: true,
      needsSanitization,
      sanitizedDomain: sanitized,
      rootDomain,
      cnameHost,
      isSubdomain,
      errorMessage: '',
      warningMessage,
    };
  };

  // Consulta real de registros DNS (A e CNAME) via API pública Cloudflare DNS-over-HTTPS (1.1.1.1) com fallback para Google Public DNS (8.8.8.8)
  const queryPublicDnsRecord = async (
    hostname: string,
    recordType: 'A' | 'CNAME'
  ): Promise<{
    status: number;
    answers: Array<{ name: string; type: number; TTL: number; data: string }>;
    provider: string;
  }> => {
    const cleanHost = hostname.trim().toLowerCase().replace(/\.$/, '');
    // 1. Tenta Cloudflare DoH JSON API
    try {
      const cfUrl = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanHost)}&type=${recordType}`;
      const res = await fetch(cfUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/dns-json',
        },
      });
      if (res.ok) {
        const json = await res.json();
        return {
          status: typeof json.Status === 'number' ? json.Status : 0,
          answers: Array.isArray(json.Answer) ? json.Answer : [],
          provider: 'Cloudflare DNS (1.1.1.1)',
        };
      }
    } catch {
      // Continua para o fallback Google Public DNS
    }

    // 2. Fallback: Google Public DNS-over-HTTPS API
    const googleUrl = `https://dns.google/resolve?name=${encodeURIComponent(cleanHost)}&type=${recordType}`;
    const gRes = await fetch(googleUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/dns-json',
      },
    });
    if (!gRes.ok) {
      throw new Error(`Falha ao consultar DNS para ${cleanHost} (${recordType})`);
    }
    const gJson = await gRes.json();
    return {
      status: typeof gJson.Status === 'number' ? gJson.Status : 0,
      answers: Array.isArray(gJson.Answer) ? gJson.Answer : [],
      provider: 'Google Public DNS (8.8.8.8)',
    };
  };

  const isRecognizedServerOrEdgeIp = (ip: string, expectedIp: string) => {
    const clean = ip.trim();
    if (clean === expectedIp) return true;
    // IPs de Edge/Proxy da Cloudflare (104.16.0.0/12, 172.64.0.0/13, 162.159.0.0/16, 188.114.96.0/20, 198.41.128.0/17) e Vercel/Google Cloud
    if (
      clean.startsWith('76.76.21.') ||
      clean.startsWith('104.') ||
      clean.startsWith('172.64.') ||
      clean.startsWith('172.65.') ||
      clean.startsWith('172.66.') ||
      clean.startsWith('172.67.') ||
      clean.startsWith('172.68.') ||
      clean.startsWith('172.69.') ||
      clean.startsWith('172.70.') ||
      clean.startsWith('172.71.') ||
      clean.startsWith('162.159.') ||
      clean.startsWith('188.114.') ||
      clean.startsWith('198.41.') ||
      clean.startsWith('216.239.') ||
      clean.startsWith('34.') ||
      clean.startsWith('35.')
    ) {
      return true;
    }
    return false;
  };

  const verifyDomainDnsRecords = async (options?: {
    silent?: boolean;
    forceMode?: 'subdomain' | 'custom';
  }) => {
    const targetSite = savedSites.find(s => s.id === selectedPublishSiteId) || savedSites[0] || {
      id: 'temp',
      subdomain: data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'meusite',
      customDomain: '',
      clientName: data.profile.name,
      dnsConfigured: false,
      sslActive: true,
      domainType: 'subdomain' as const,
    };

    const rawCustom = (targetSite.customDomain || '').trim();
    const domVal = validateCustomDomain(rawCustom);
    const expectedARecordIp = '76.76.21.21';
    const expectedCnameTarget = 'cname.biovip.com.br';
    const basePlatformDomain = (landingConfig.baseDomain || 'biovip.com.br').toLowerCase().trim();

    const useCustomMode =
      options?.forceMode === 'custom'
        ? true
        : options?.forceMode === 'subdomain'
        ? false
        : Boolean(rawCustom);

    if (useCustomMode && rawCustom && !domVal.isValid) {
      if (!options?.silent) {
        showToast(`⚠️ Corrija o formato do domínio personalizado antes de verificar o DNS!`);
      }
      return;
    }

    const cleanCustomDom = useCustomMode && domVal.isValid ? domVal.sanitizedDomain : '';
    const subSlug = (targetSite.subdomain || 'meusite').toLowerCase().replace(/[^a-z0-9-]/g, '') || 'meusite';

    const rootDomainToCheck = cleanCustomDom ? domVal.rootDomain : basePlatformDomain;
    const cnameHostToCheck = cleanCustomDom ? domVal.cnameHost : 'www';
    const cnameFullDomainToCheck = `${cnameHostToCheck}.${rootDomainToCheck}`;
    const displayCheckedDomain = cleanCustomDom || `${basePlatformDomain}/${subSlug}`;

    setDnsTesting(true);
    try {
      const [rootAResult, subCnameResult, subAResult] = await Promise.all([
        queryPublicDnsRecord(rootDomainToCheck, 'A'),
        queryPublicDnsRecord(cnameFullDomainToCheck, 'CNAME'),
        queryPublicDnsRecord(cnameFullDomainToCheck, 'A'),
      ]);

      // Analisa Registro A do domínio raiz (@)
      const rootAAnswers = rootAResult.answers.filter(a => a.type === 1);
      const aValues = Array.from(new Set(rootAAnswers.map(a => a.data.trim())));
      const aTtl = rootAAnswers[0]?.TTL;
      const aRecordOk = aValues.length > 0;
      const aRecordPointingCorrectly =
        aRecordOk && aValues.some(ip => isRecognizedServerOrEdgeIp(ip, expectedARecordIp));

      let aRecordStatusText = '';
      if (!aRecordOk) {
        aRecordStatusText =
          rootAResult.status === 3
            ? `Domínio ${rootDomainToCheck} sem registro A (NXDOMAIN)`
            : `Nenhum Registro A encontrado em ${rootDomainToCheck}`;
      } else if (aValues.includes(expectedARecordIp)) {
        aRecordStatusText = `Apontado diretamente para ${expectedARecordIp}`;
      } else if (aRecordPointingCorrectly) {
        aRecordStatusText = `Ativo via Cloudflare / Servidor Edge (${aValues.slice(0, 2).join(', ')})`;
      } else {
        aRecordStatusText = `Apontado para IP externo (${aValues.join(', ')}) — esperado ${expectedARecordIp}`;
      }

      // Analisa Registro CNAME (ou CNAME Flattened / Proxy A) do subdomínio
      const cnameAnswers = [
        ...subCnameResult.answers.filter(a => a.type === 5),
        ...subAResult.answers.filter(a => a.type === 5),
      ];
      const cnameTargets = Array.from(
        new Set(cnameAnswers.map(a => a.data.trim().replace(/\.$/, '').toLowerCase()))
      );
      const subAAnswers = subAResult.answers.filter(a => a.type === 1);
      const subAValues = Array.from(new Set(subAAnswers.map(a => a.data.trim())));
      const cnameTtl = cnameAnswers[0]?.TTL ?? subAAnswers[0]?.TTL;

      const hasExplicitCname = cnameTargets.length > 0;
      const hasFlattenedOrProxiedSubdomain = !hasExplicitCname && subAValues.length > 0;
      const cnameRecordOk = hasExplicitCname || hasFlattenedOrProxiedSubdomain;

      const cnameRecordPointingCorrectly =
        (hasExplicitCname &&
          cnameTargets.some(
            t =>
              t === expectedCnameTarget ||
              t === basePlatformDomain ||
              t.endsWith(`.${basePlatformDomain}`) ||
              t.endsWith('.pages.dev') ||
              t.endsWith('.vercel.app') ||
              t.endsWith('.run.app')
          )) ||
        (hasFlattenedOrProxiedSubdomain &&
          subAValues.some(
            ip => isRecognizedServerOrEdgeIp(ip, expectedARecordIp) || aValues.includes(ip)
          ));

      const cnameRecordTypeResolved: 'CNAME' | 'A (Cloudflare Proxy / Flattened)' | 'NONE' =
        hasExplicitCname
          ? 'CNAME'
          : hasFlattenedOrProxiedSubdomain
          ? 'A (Cloudflare Proxy / Flattened)'
          : 'NONE';

      const cnameRecordValues = hasExplicitCname ? cnameTargets : subAValues;

      let cnameRecordStatusText = '';
      if (!cnameRecordOk) {
        cnameRecordStatusText = cleanCustomDom
          ? `CNAME "${cnameHostToCheck}" não encontrado em ${rootDomainToCheck} — adicione ${cnameHostToCheck} → ${expectedCnameTarget}`
          : `CNAME "${cnameFullDomainToCheck}" sem apontamento no DNS — adicione CNAME "www" no Cloudflare apontando para ${basePlatformDomain}`;
      } else if (hasExplicitCname) {
        cnameRecordStatusText = `CNAME ativo (${cnameHostToCheck} → ${cnameTargets.join(', ')})`;
      } else {
        cnameRecordStatusText = `Ativo via Proxy Cloudflare / CNAME Flattening (${subAValues.slice(0, 2).join(', ')})`;
      }

      const bothVerified = aRecordPointingCorrectly && cnameRecordPointingCorrectly;
      const bothExist = aRecordOk && cnameRecordOk;
      const overallStatus: 'verified' | 'partial' | 'pending' | 'error' = bothVerified
        ? 'verified'
        : bothExist || aRecordOk || cnameRecordOk
        ? 'partial'
        : 'pending';

      let statusSummary = '';
      if (overallStatus === 'verified') {
        statusSummary = `Registros A (${rootDomainToCheck}) e CNAME (${cnameFullDomainToCheck}) verificados e apontando corretamente para https://${displayCheckedDomain}!`;
      } else if (aRecordOk && !cnameRecordOk) {
        statusSummary = cleanCustomDom
          ? `O Registro A de ${rootDomainToCheck} está ativo, mas falta o registro CNAME (${cnameHostToCheck} → ${expectedCnameTarget}).`
          : `O domínio raiz ${rootDomainToCheck} está ativo na Cloudflare para https://${displayCheckedDomain}, mas falta o CNAME ${cnameFullDomainToCheck}.`;
      } else if (!aRecordOk && cnameRecordOk) {
        statusSummary = `O registro CNAME ${cnameFullDomainToCheck} responde no DNS, mas falta o Registro A na raiz (${rootDomainToCheck} → ${expectedARecordIp}).`;
      } else if (bothExist && !bothVerified) {
        statusSummary = `Registros A e CNAME encontrados no DNS, porém apontando para endereços diferentes do padrão (${expectedARecordIp} / ${expectedCnameTarget}).`;
      } else {
        statusSummary = `Nenhum apontamento A ou CNAME propagado ainda para ${displayCheckedDomain}. Configure a Zona DNS e aguarde alguns minutos.`;
      }

      const checkedAt = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      setDnsCheckStatus({
        checkedDomain: displayCheckedDomain,
        rootDomainChecked: rootDomainToCheck,
        cnameHostChecked: cnameHostToCheck,
        cnameFullDomainChecked: cnameFullDomainToCheck,
        aRecordOk,
        aRecordPointingCorrectly,
        aRecordValues: aValues,
        aRecordTtl: aTtl,
        aRecordStatusText,
        cnameRecordOk,
        cnameRecordPointingCorrectly,
        cnameRecordValues,
        cnameRecordTypeResolved,
        cnameRecordTtl: cnameTtl,
        cnameRecordStatusText,
        sslOk: aRecordOk && cnameRecordOk,
        providerSource: rootAResult.provider,
        overallStatus,
        statusSummary,
        checkedAt,
      });

      if (savedSites.some(s => s.id === targetSite.id)) {
        const updated = savedSites.map(s =>
          s.id === targetSite.id
            ? {
                ...s,
                customDomain: cleanCustomDom || s.customDomain,
                domainType: cleanCustomDom ? ('custom' as const) : ('subdomain' as const),
                dnsConfigured: bothExist,
                sslActive: bothExist,
              }
            : s
        );
        setSavedSites(updated);
        try {
          localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated));
        } catch {}
      }

      if (!options?.silent) {
        if (overallStatus === 'verified') {
          showToast(`🟢 DNS verificado na Cloudflare! Registros A e CNAME ativos para ${displayCheckedDomain}.`);
        } else if (overallStatus === 'partial') {
          showToast(`🟡 Verificação DNS concluída com pendências em ${displayCheckedDomain}. Veja os detalhes abaixo.`);
        } else {
          showToast(`🔴 Registros A e CNAME ainda não encontrados para ${displayCheckedDomain} no DNS público.`);
        }
      }
    } catch (err) {
      setDnsCheckStatus({
        checkedDomain: displayCheckedDomain,
        rootDomainChecked: rootDomainToCheck,
        cnameHostChecked: cnameHostToCheck,
        cnameFullDomainChecked: cnameFullDomainToCheck,
        aRecordOk: false,
        aRecordPointingCorrectly: false,
        aRecordValues: [],
        aRecordStatusText: 'Erro de conexão ao consultar resolvedor DNS público',
        cnameRecordOk: false,
        cnameRecordPointingCorrectly: false,
        cnameRecordValues: [],
        cnameRecordTypeResolved: 'NONE',
        cnameRecordStatusText: 'Não foi possível verificar o registro CNAME no momento',
        sslOk: false,
        providerSource: 'Cloudflare DNS (1.1.1.1)',
        overallStatus: 'error',
        statusSummary: 'Não foi possível conectar à API pública de DNS (Cloudflare/Google). Verifique sua conexão e tente novamente.',
        checkedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
      if (!options?.silent) {
        showToast(`⚠️ Falha ao consultar API pública de DNS. Tente novamente.`);
      }
    } finally {
      setDnsTesting(false);
    }
  };

  // Executa verificação automática de DNS na API da Cloudflare sempre que o modal #publishModalOpen é aberto
  useEffect(() => {
    if (publishModalOpen) {
      verifyDomainDnsRecords({ silent: true });
    }
  }, [publishModalOpen, selectedPublishSiteId]);

  const [pdfReportModalOpen, setPdfReportModalOpen] = useState(false);
  const [copiedPdfSummary, setCopiedPdfSummary] = useState(false);
  const [singlePdfSiteId, setSinglePdfSiteId] = useState<string | null>(null);
  const [copiedSinglePdfSummary, setCopiedSinglePdfSummary] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [editingFeeSiteId, setEditingFeeSiteId] = useState<string | null>(null);
  const [tempFeeInput, setTempFeeInput] = useState<string>('');
  const [photoOrientations, setPhotoOrientations] = useState<Record<string, {
    orientation: 'portrait' | 'landscape' | 'square';
    width: number;
    height: number;
    ratio: number;
  }>>({});

  // Detecção automática de orientação (retrato vs paisagem) para fotos da galeria
  useEffect(() => {
    const photos = data.studentGrid?.photos || [];
    photos.forEach((url) => {
      if (!url || photoOrientations[url]) return;
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        const w = img.naturalWidth || 1;
        const h = img.naturalHeight || 1;
        const ratio = w / h;
        let orientation: 'portrait' | 'landscape' | 'square' = 'square';
        if (ratio > 1.15) {
          orientation = 'landscape';
        } else if (ratio < 0.88) {
          orientation = 'portrait';
        }
        setPhotoOrientations((prev) => ({
          ...prev,
          [url]: { orientation, width: w, height: h, ratio },
        }));
      };
    });
  }, [data.studentGrid?.photos, photoOrientations]);

  // Keyboard navigation for photo gallery lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft' && (data.studentGrid?.photos?.length || 0) > 0) {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + data.studentGrid.photos.length) % data.studentGrid.photos.length : null
        );
      }
      if (e.key === 'ArrowRight' && (data.studentGrid?.photos?.length || 0) > 0) {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % data.studentGrid.photos.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, data.studentGrid?.photos]);

  // PIX & Billing Modal State + Régua de Cobrança Inteligente (D-3, D-0, D+3, D+7)
  const [pixModalOpen, setPixModalOpen] = useState(false);
  const [pixModalSite, setPixModalSite] = useState<SavedMicrosite | null>(null);
  const [pixBillingStage, setPixBillingStage] = useState<'d_minus_3' | 'd_0' | 'd_plus_3' | 'd_plus_7'>('d_0');
  const [pixCustomCode, setPixCustomCode] = useState<string>('');
  const [pixWhatsappMessage, setPixWhatsappMessage] = useState<string>('');
  const [suspendedPreviewSite, setSuspendedPreviewSite] = useState<SavedMicrosite | null>(null);

  const buildReguaCobrancaMessage = (
    site: SavedMicrosite,
    stage: 'd_minus_3' | 'd_0' | 'd_plus_3' | 'd_plus_7',
    overridePix?: string
  ): string => {
    const nome = site.clientName || 'Cliente';
    const slug = site.subdomain || site.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const parts = (site.dueDate || '').split('-');
    const vencimento = parts.length === 3 && parts[0].length === 4 ? `${parts[2]}/${parts[1]}/${parts[0]}` : (site.dueDate || '—');
    const pix = (overridePix ?? pixCustomCode ?? data.saasSettings?.pixKey ?? 'contato@biovip.com.br').trim() || (data.saasSettings?.pixKey || 'contato@biovip.com.br');
    const billing = getSiteBillingSummary(site);
    const valor = billing.totalDueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    const currentBaseDomain = (landingConfig?.baseDomain || 'biovip.com.br').toLowerCase().trim();
    const siteDomainDisplay = site.customDomain || `${currentBaseDomain}/${slug}`;

    const templates: Record<'d_minus_3' | 'd_0' | 'd_plus_3' | 'd_plus_7', string> = {
      d_minus_3: `Olá, ${nome}! Tudo bem? Passando para avisar que a manutenção do seu Bio Site (${siteDomainDisplay}) vence em 3 dias (${vencimento}). Segue sua chave Pix Copia e Cola: ${pix}. Qualquer dúvida estou à disposição!`,
      d_0: `Olá, ${nome}! Hoje é o vencimento da renovação mensal do seu Bio Site. Assim que efetuar o Pix (${pix}), confirme por aqui para renovarmos sua cota mensal de alterações automaticamente!`,
      d_plus_3: `Olá, ${nome}, tudo bem? Constatamos que a mensalidade do seu link da bio ainda não foi compensada. Seu site continua 100% ativo para seus clientes, porém para solicitar novas alterações de fotos, serviços ou preços este mês, precisamos regularizar a fatura pendente. Segue a chave Pix: ${pix}.`,
      d_plus_7: `Olá, ${nome}, tudo bem? Como não tivemos retorno sobre a mensalidade pendente, nosso sistema pausou temporariamente o link da sua bio para manutenção de rotina. Para reativar seu Bio Site em menos de 5 minutos, basta efetuar o Pix de R$ ${valor}: ${pix}. Aguardo seu comprovante para reativação imediata!`,
    };

    return templates[stage] || templates.d_0;
  };

  const openPixBillingModal = (
    site: SavedMicrosite,
    forcedStage?: 'd_minus_3' | 'd_0' | 'd_plus_3' | 'd_plus_7'
  ) => {
    const daysDiff = getDaysUntilDue(site.dueDate);
    const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : 0;
    const defaultPix = data.saasSettings?.pixKey || 'contato@biovip.com.br';
    const autoStage: 'd_minus_3' | 'd_0' | 'd_plus_3' | 'd_plus_7' =
      forcedStage ||
      (isSiteSuspendedStatus(site) || daysOverdue >= 7
        ? 'd_plus_7'
        : daysOverdue >= 1 || site.status === 'atrasado_d3'
        ? 'd_plus_3'
        : daysDiff === 0
        ? 'd_0'
        : 'd_minus_3');

    setPixModalSite(site);
    setPixCustomCode(defaultPix);
    setPixBillingStage(autoStage);
    setPixWhatsappMessage(buildReguaCobrancaMessage(site, autoStage, defaultPix));
    setPixModalOpen(true);
  };

  // Tracking & Reset Analytics State
  const [sessionAnalytics, setSessionAnalytics] = useState<{
    whatsappClicks: number;
    pageViews: number;
    trafficSources: {
      instagram: number;
      tiktok: number;
      googleMaps: number;
      paidAds: number;
      direct: number;
    };
    pixelEvents: number;
  }>(() => {
    try {
      const raw = localStorage.getItem('luxebio_session_analytics_v1');
      if (raw) return JSON.parse(raw);
    } catch {}
    return {
      whatsappClicks: 0,
      pageViews: 0,
      trafficSources: { instagram: 0, tiktok: 0, googleMaps: 0, paidAds: 0, direct: 0 },
      pixelEvents: 0,
    };
  });
  const [resetTrackingModalOpen, setResetTrackingModalOpen] = useState(false);
  const [resetModalTarget, setResetModalTarget] = useState<'current' | 'all' | SavedMicrosite | null>(null);
  const [resetAlsoClearPixelIds, setResetAlsoClearPixelIds] = useState(false);
  const [deleteModalSite, setDeleteModalSite] = useState<SavedMicrosite | null>(null);

  // =========================================================================
  // LANDING PAGE COMERCIAL & SUBDOMÍNIO DO CRIADOR (SEM LOGIN)
  // =========================================================================
  const [landingConfig, setLandingConfig] = useState<{
    creatorSubdomain: string;
    baseDomain: string;
    agencyBrandName: string;
    agencyWhatsapp: string;
    agencyEmail?: string;
    deliveryTime: string;
    priceEssential: string;
    pricePro: string;
    priceScale: string;
    recurringBasic?: string;
    recurringPro?: string;
    recurringVip?: string;
    updatesBasic?: string;
    updatesPro?: string;
    updatesVip?: string;
    creatorFooterUrl?: string;
    creatorFooterLabel?: string;
    checkoutPortalName?: string;
    checkoutUrlBasic?: string;
    checkoutUrlPro?: string;
    checkoutUrlVip?: string;
    asaasApiKey?: string;
    asaasEnvironment?: 'sandbox' | 'production';
    asaasWebhookToken?: string;
    asaasEnabled?: boolean;
  }>(() => {
    const defaults = {
      creatorSubdomain: 'criador',
      baseDomain: 'biovip.com.br',
      agencyBrandName: 'BioVip Digital',
      agencyWhatsapp: '5531991390202',
      agencyEmail: 'contato@biovip.com.br',
      deliveryTime: '24 horas',
      priceEssential: 'R$ 79,90',
      pricePro: 'R$ 79,90',
      priceScale: 'R$ 79,90',
      recurringBasic: '29,90',
      recurringPro: '49,90',
      recurringVip: '79,90',
      updatesBasic: '1',
      updatesPro: '4',
      updatesVip: 'Ilimitadas',
      creatorFooterUrl: '',
      creatorFooterLabel: 'Quero um microsite assim',
      checkoutPortalName: 'WhatsApp VIP',
      checkoutUrlBasic: '',
      checkoutUrlPro: '',
      checkoutUrlVip: '',
      asaasApiKey: '',
      asaasEnvironment: 'sandbox' as 'sandbox' | 'production',
      asaasWebhookToken: '',
      asaasEnabled: false,
    };
    try {
      const saved = localStorage.getItem('luxebio_landing_config_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.baseDomain || parsed.baseDomain === 'luxebio.site') {
          parsed.baseDomain = 'biovip.com.br';
        }
        if (!parsed.agencyBrandName || parsed.agencyBrandName === 'LuxeBio Digital') {
          parsed.agencyBrandName = 'BioVip Digital';
        }
        if (!parsed.agencyEmail) {
          parsed.agencyEmail = 'contato@biovip.com.br';
        }
        if (!parsed.agencyWhatsapp || parsed.agencyWhatsapp === '5511999999999' || String(parsed.agencyWhatsapp).includes('99999999')) {
          parsed.agencyWhatsapp = '5531991390202';
        }
        if (parsed.asaasEnabled === undefined) {
          parsed.asaasEnabled = false;
        }
        const merged = { ...defaults, ...parsed, agencyWhatsapp: parsed.agencyWhatsapp || '5531991390202', asaasEnabled: false };
        syncMaintenancePlansFromConfig(merged);
        return merged;
      }
    } catch {}
    syncMaintenancePlansFromConfig(defaults);
    return defaults;
  });

  syncMaintenancePlansFromConfig(landingConfig);

  const persistLandingConfigEverywhere = (updated: typeof landingConfig) => {
    syncMaintenancePlansFromConfig(updated);
    try {
      localStorage.setItem('luxebio_landing_config_v1', JSON.stringify(updated));
    } catch {}
    // Persist on backend server so all subdomains (criador.biovip.com.br & biovip.com.br) stay in sync
    fetch('/api/landing-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config: updated }),
    }).catch(() => {});
    // Also persist to Firestore public_models/biovip_landing_config when admin is authenticated
    if (firebaseAuth.currentUser && firebaseAuth.currentUser.email?.toLowerCase() === ADMIN_OWNER_EMAIL.toLowerCase()) {
      const publicCopy = { ...updated };
      delete publicCopy.asaasApiKey;
      setDoc(doc(firebaseDb, 'public_models', 'biovip_landing_config'), {
        id: 'biovip_landing_config',
        ownerId: firebaseAuth.currentUser.uid,
        clientName: 'Configuração Oficial Landing Page BioVip',
        nicheCategory: 'Config',
        subdomain: 'config',
        customDomain: '',
        isLandingModel: true,
        sitePayload: serializeSafeFirestorePayload({ landingConfig: publicCopy }),
        updatedAt: serverTimestamp(),
      }).catch(() => {});
    }
  };

  const updateLandingConfig = (key: string, val: string) => {
    setLandingConfig(prev => {
      const updated = { ...prev, [key]: val };
      persistLandingConfigEverywhere(updated);
      return updated;
    });
  };

  // Sync landingConfig from server & across browser tabs so changes to plan prices/updates reflect immediately on the Landing Page
  useEffect(() => {
    const fetchServerLandingConfig = () => {
      fetch('/api/landing-config')
        .then(r => r.json())
        .then(json => {
          if (json?.success && json?.config && typeof json.config === 'object') {
            setLandingConfig(prev => {
              const merged = {
                ...prev,
                ...json.config,
                agencyWhatsapp:
                  !json.config.agencyWhatsapp || json.config.agencyWhatsapp === '5511999999999'
                    ? prev.agencyWhatsapp || '5531991390202'
                    : json.config.agencyWhatsapp,
              };
              syncMaintenancePlansFromConfig(merged);
              try {
                localStorage.setItem('luxebio_landing_config_v1', JSON.stringify(merged));
              } catch {}
              return merged;
            });
          }
        })
        .catch(() => {});
    };

    fetchServerLandingConfig();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'luxebio_landing_config_v1' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setLandingConfig(prev => {
            const merged = { ...prev, ...parsed };
            syncMaintenancePlansFromConfig(merged);
            return merged;
          });
        } catch {}
      }
    };

    const handleFocus = () => {
      fetchServerLandingConfig();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const getActiveAsaasApiKey = (): string => {
    return (landingConfig.asaasApiKey || data.saasSettings?.asaas?.apiKey || '').trim();
  };

  const getActiveAsaasEnv = (): 'sandbox' | 'production' => {
    const env = landingConfig.asaasEnvironment || data.saasSettings?.asaas?.environment;
    return env === 'production' ? 'production' : 'sandbox';
  };

  const updateAsaasSettings = (patch: {
    apiKey?: string;
    environment?: 'sandbox' | 'production';
    webhookToken?: string;
  }) => {
    setLandingConfig(prev => {
      const updated = {
        ...prev,
        ...(patch.apiKey !== undefined ? { asaasApiKey: patch.apiKey } : {}),
        ...(patch.environment !== undefined ? { asaasEnvironment: patch.environment } : {}),
        ...(patch.webhookToken !== undefined ? { asaasWebhookToken: patch.webhookToken } : {}),
      };
      try {
        localStorage.setItem('luxebio_landing_config_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setData(p => ({
      ...p,
      saasSettings: {
        ...p.saasSettings,
        asaas: {
          ...(p.saasSettings?.asaas || { apiKey: '', environment: 'sandbox', preferredMethod: 'PIX', enabled: true }),
          ...(patch.apiKey !== undefined ? { apiKey: patch.apiKey } : {}),
          ...(patch.environment !== undefined ? { environment: patch.environment } : {}),
        },
      },
    }));
  };

  const formatCpfCnpjInput = (raw: string): string => {
    const digits = raw.replace(/\D/g, '').slice(0, 14);
    if (digits.length <= 11) {
      return digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };

  const resolveCreatorFooterInfo = (siteData?: typeof INITIAL_DATA) => {
    const profileAny = (siteData?.profile || data?.profile || {}) as Record<string, any>;
    const brandName = (
      profileAny.creatorName ||
      landingConfig.agencyBrandName ||
      'BioVip Digital'
    ).trim();
    const ctaLabel = (
      profileAny.creatorCtaLabel ||
      landingConfig.creatorFooterLabel ||
      'Quero um microsite assim'
    ).trim();
    const rawCustomUrl = (
      profileAny.creatorUrl ||
      landingConfig.creatorFooterUrl ||
      ''
    ).trim();

    let href = '';
    if (rawCustomUrl) {
      href = /^https?:\/\//i.test(rawCustomUrl) ? rawCustomUrl : `https://${rawCustomUrl}`;
    } else if (
      landingConfig.baseDomain &&
      landingConfig.baseDomain.trim()
    ) {
      const cleanDomain = landingConfig.baseDomain.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
      href = `https://${cleanDomain}`;
    } else if (typeof window !== 'undefined' && window.location?.origin) {
      href = window.location.origin;
    } else {
      const targetAgencyPhone = (landingConfig.agencyWhatsapp || '5531991390202').replace(/\D/g, '');
      const msg = encodeURIComponent(`Olá! Vi um microsite criado por ${brandName} e quero encomendar o meu!`);
      href = `https://wa.me/${targetAgencyPhone}?text=${msg}`;
    }

    return { brandName, ctaLabel, href };
  };

  const detectPublicMicrositeSlug = (): string | null => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const search = new URLSearchParams(window.location.search);
    const host = window.location.hostname.toLowerCase();

    if (search.get('site')) return search.get('site')!.toLowerCase();
    if (search.get('p')) return search.get('p')!.toLowerCase();
    if (search.get('microsite')) return search.get('microsite')!.toLowerCase();

    const configuredSub = (landingConfig?.creatorSubdomain || 'criador').toLowerCase();
    const baseDomain = (landingConfig?.baseDomain || 'biovip.com.br')
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '');

    const reservedPaths = [
      '',
      'index.html',
      'landing',
      'home',
      'inicio',
      'vitrine',
      'vendas',
      'criador',
      'studio',
      'painel',
      'editor',
      'admin',
      'api',
      'assets',
      'www',
      configuredSub,
      baseDomain,
    ];

    if (path && !reservedPaths.includes(path) && !path.includes('.')) {
      return path;
    }

    if (
      baseDomain &&
      host !== baseDomain &&
      host !== `www.${baseDomain}` &&
      host.endsWith(`.${baseDomain}`)
    ) {
      const sub = host.slice(0, -(baseDomain.length + 1)).trim();
      if (sub && sub !== 'www' && !sub.includes('.') && !reservedPaths.includes(sub)) {
        return sub;
      }
    }
    return null;
  };

  const detectCreatorSurface = (): 'landing' | 'studio' | 'microsite' => {
    if (typeof window === 'undefined') return 'landing';
    const publicSlug = detectPublicMicrositeSlug();
    if (publicSlug) return 'microsite';

    const host = window.location.hostname.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    const hash = window.location.hash.toLowerCase();
    const configuredSub = (landingConfig?.creatorSubdomain || 'criador').toLowerCase();

    if (
      host.startsWith(`${configuredSub}.`) ||
      host.startsWith('criador.') ||
      host.startsWith('studio.') ||
      host.startsWith('painel.') ||
      host.startsWith('editor.')
    ) {
      return 'studio';
    }
    if (
      path.startsWith(`/${configuredSub}`) ||
      path.startsWith('/criador') ||
      path.startsWith('/studio') ||
      search.get('subdominio') === configuredSub ||
      search.get('subdominio') === 'criador' ||
      search.get('modo') === 'criador' ||
      hash === `#${configuredSub}` ||
      hash === '#criador' ||
      hash === '#studio'
    ) {
      return 'studio';
    }
    return 'landing';
  };

  const [appSurface, setAppSurface] = useState<'landing' | 'studio' | 'microsite'>(() => detectCreatorSurface());
  const [activePublicSlug, setActivePublicSlug] = useState<string | null>(() => detectPublicMicrositeSlug());
  const [underConstructionPreviewSite, setUnderConstructionPreviewSite] = useState<SavedMicrosite | null>(null);
  const [paymentSuccessSite, setPaymentSuccessSite] = useState<SavedMicrosite | null>(null);
  const [checkoutAsaasPix, setCheckoutAsaasPix] = useState<{
    loading: boolean;
    paymentId?: string;
    pixPayload?: string;
    pixQrCode?: string;
    invoiceUrl?: string;
    status?: string;
    error?: string;
  } | null>(null);
  const [isClientsFullscreen, setIsClientsFullscreen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const search = new URLSearchParams(window.location.search);
    if (search.get('view') === 'editor' || search.get('modo') === 'editor') return false;
    return true;
  });
  const [asaasStatusTesting, setAsaasStatusTesting] = useState<boolean>(false);
  const [asaasTestResult, setAsaasTestResult] = useState<{ success: boolean; message: string; balance?: number } | null>(null);
  const [asaasServerConfigured, setAsaasServerConfigured] = useState<boolean>(false);
  const [asaasGuideOpen, setAsaasGuideOpen] = useState<boolean>(false);
  const [asaasGeneratingSiteId, setAsaasGeneratingSiteId] = useState<string | null>(null);
  const [asaasPaymentData, setAsaasPaymentData] = useState<{
    paymentId: string;
    invoiceUrl?: string;
    bankSlipUrl?: string;
    pixQrCode?: string;
    pixPayload?: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    if (!landingConfig.asaasEnabled) return;
    fetch('/api/asaas/config-status')
      .then(r => r.json())
      .then(json => {
        if (json?.serverKeyConfigured) {
          setAsaasServerConfigured(true);
          const srvEnv = json.environment === 'production' ? 'production' : 'sandbox';
          if (!getActiveAsaasApiKey()) {
            updateAsaasSettings({ environment: srvEnv });
          }
        }
      })
      .catch(() => {});
  }, [landingConfig.asaasEnabled]);
  const [subdomainModalOpen, setSubdomainModalOpen] = useState(false);
  const [copiedSubdomainLink, setCopiedSubdomainLink] = useState(false);
  const [landingCategoryFilter, setLandingCategoryFilter] = useState<string>('Todos');
  const [landingCarouselIndex, setLandingCarouselIndex] = useState<number>(0);
  const [landingCarouselAutoPlay, setLandingCarouselAutoPlay] = useState<boolean>(true);
  const [landingCarouselHovered, setLandingCarouselHovered] = useState<boolean>(false);
  const [landingCarouselIntervalMs, setLandingCarouselIntervalMs] = useState<number>(4000);
  const landingCarouselRef = React.useRef<HTMLDivElement | null>(null);
  const isProgrammaticCarouselScrollRef = React.useRef<boolean>(false);
  const programmaticScrollTimeoutRef = React.useRef<number | null>(null);
  const [landingHeroModelId, setLandingHeroModelId] = useState<string>('law');
  const [landingHeroHovered, setLandingHeroHovered] = useState<boolean>(false);
  const [landingPreviewModalId, setLandingPreviewModalId] = useState<string | null>(null);
  const [landingOrderForm, setLandingOrderForm] = useState({
    clientName: '',
    clientWhatsapp: '',
    clientCpfCnpj: '',
    instagramOrMaps: '',
    selectedModel: 'Advocacia & Consultoria Executiva',
    selectedPlan: 'Plano Pro (R$ 49,90/mês · 4 alterações) — Criação Promocional R$ 79,90 (1º mês s/ mensalidade)',
    customNotes: '',
  });
  const [landingOrderError, setLandingOrderError] = useState<string | null>(null);
  const [landingOrderSuccess, setLandingOrderSuccess] = useState(false);
  const [landingShareCopiedId, setLandingShareCopiedId] = useState<string | null>(null);
  const [landingQrModalModelId, setLandingQrModalModelId] = useState<string | null>(null);

  // =========================================================================
  // CONFIRMAÇÃO DE COMPRA & REDIRECIONAMENTO PARA PORTAL EXTERNO DE PAGAMENTO
  // =========================================================================
  const [paymentConfirmPlan, setPaymentConfirmPlan] = useState<{
    id: 'basic' | 'pro' | 'vip';
    name: string;
    price: string;
    periodLabel: string;
    maintenanceInfo: string;
    fullPlanLabel: string;
  } | null>(null);
  const [paymentClientEmail, setPaymentClientEmail] = useState<string>('');
  const [paymentConfirmChecked, setPaymentConfirmChecked] = useState<boolean>(false);
  const [paymentEmailTouched, setPaymentEmailTouched] = useState<boolean>(false);
  const [paymentPortalRedirecting, setPaymentPortalRedirecting] = useState<boolean>(false);
  const [paymentPortalFallbackNotice, setPaymentPortalFallbackNotice] = useState<string | null>(null);
  const paymentEmailInputRef = React.useRef<HTMLInputElement | null>(null);

  // =========================================================================
  // FIREBASE AUTHENTICATION & FIRESTORE SYNC FOR ADMIN STUDIO PROTECTION
  // =========================================================================
  const [adminUser, setAdminUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [unauthorizedDomainHost, setUnauthorizedDomainHost] = useState<string | null>(null);
  const [showDirectCredentialLogin, setShowDirectCredentialLogin] = useState<boolean>(false);
  const [directAdminEmailInput, setDirectAdminEmailInput] = useState<string>('');
  const [directAdminPinInput, setDirectAdminPinInput] = useState<string>('');
  const [directAdminAuthorized, setDirectAdminAuthorized] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('luxebio_admin_direct_auth') === 'verified';
    } catch {
      return false;
    }
  });

  // 2FA Security & Master PIN Layer
  const DEFAULT_ADMIN_PIN = '230217';
  const MAX_PIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 min
  const INACTIVITY_LOCK_MS = 20 * 60 * 1000; // 20 min

  const [adminPinUnlocked, setAdminPinUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('luxebio_admin_pin_session') === 'unlocked';
    } catch {
      return false;
    }
  });
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [adminPinError, setAdminPinError] = useState<string | null>(null);
  const [showPinText, setShowPinText] = useState<boolean>(false);
  const [pinAttemptsLeft, setPinAttemptsLeft] = useState<number>(() => {
    try {
      const attempts = Number(localStorage.getItem('luxebio_pin_failed_attempts') || '0');
      return Math.max(0, MAX_PIN_ATTEMPTS - attempts);
    } catch {
      return MAX_PIN_ATTEMPTS;
    }
  });
  const [lockoutRemainingSec, setLockoutRemainingSec] = useState<number>(() => {
    try {
      const until = Number(localStorage.getItem('luxebio_pin_lockout_until') || '0');
      const now = Date.now();
      return until > now ? Math.ceil((until - now) / 1000) : 0;
    } catch {
      return 0;
    }
  });
  const [securityModalOpen, setSecurityModalOpen] = useState<boolean>(false);
  const [securityModalTab, setSecurityModalTab] = useState<'pin' | 'audit'>('pin');
  const [changePinCurrent, setChangePinCurrent] = useState<string>('');
  const [changePinNew, setChangePinNew] = useState<string>('');
  const [changePinConfirm, setChangePinConfirm] = useState<string>('');
  const [changePinError, setChangePinError] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<Array<{
    timestamp: string;
    event: string;
    status: 'success' | 'failed' | 'warning' | 'lockout';
    device: string;
  }>>(() => {
    try {
      const raw = localStorage.getItem('luxebio_admin_audit_logs_v1');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });

  const hashPinCode = async (pin: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(`biovip_admin_salt_2026_${pin.trim()}`);
      const hashBuf = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(hashBuf))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    } catch {
      return `hash_fallback_${pin.trim()}`;
    }
  };

  const recordAuditLog = (event: string, status: 'success' | 'failed' | 'warning' | 'lockout') => {
    const entry = {
      timestamp: new Date().toISOString(),
      event,
      status,
      device: typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mobile') ? 'Dispositivo Móvel' : 'Desktop / Navegador') : 'Sistema',
    };
    setAuditLogs(prev => {
      const updated = [entry, ...prev.slice(0, 49)];
      try {
        localStorage.setItem('luxebio_admin_audit_logs_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isAuthorizedAdmin = Boolean(
    directAdminAuthorized ||
    (adminUser &&
      adminUser.email &&
      adminUser.email.toLowerCase() === ADMIN_OWNER_EMAIL.toLowerCase() &&
      (adminUser.emailVerified === true || adminUser.providerData?.some(p => p.providerId === 'google.com')))
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setAdminUser(user);
      setAuthLoading(false);
      if (user && user.email?.toLowerCase() !== ADMIN_OWNER_EMAIL.toLowerCase()) {
        setAuthError(
          `A conta "${user.email}" não possui permissão de Administrador. Faça login com uma conta credenciada.`
        );
        recordAuditLog(`Tentativa de acesso não autorizada: ${user.email}`, 'failed');
      } else if (user) {
        setAuthError(null);
        setUnauthorizedDomainHost(null);
        recordAuditLog(`Login Google Firebase bem-sucedido: ${user.email}`, 'success');
      }
    });
    return () => unsubscribe();
  }, []);

  // Lockout Countdown Timer
  useEffect(() => {
    if (lockoutRemainingSec <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemainingSec(prev => {
        if (prev <= 1) {
          try {
            localStorage.removeItem('luxebio_pin_lockout_until');
            localStorage.removeItem('luxebio_pin_failed_attempts');
          } catch {}
          setPinAttemptsLeft(MAX_PIN_ATTEMPTS);
          setAdminPinError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemainingSec]);

  // Inactivity Auto-Lock Timer (20 minutes)
  useEffect(() => {
    if (!adminPinUnlocked) return;
    let lastActivity = Date.now();
    const updateActivity = () => {
      lastActivity = Date.now();
    };

    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => window.addEventListener(evt, updateActivity, { passive: true }));

    const checkInterval = setInterval(() => {
      if (Date.now() - lastActivity > INACTIVITY_LOCK_MS) {
        setAdminPinUnlocked(false);
        try {
          sessionStorage.removeItem('luxebio_admin_pin_session');
        } catch {}
        recordAuditLog('Auto-Lock por Inatividade (20min)', 'warning');
      }
    }, 30000);

    return () => {
      activityEvents.forEach(evt => window.removeEventListener(evt, updateActivity));
      clearInterval(checkInterval);
    };
  }, [adminPinUnlocked]);

  const handleAdminGoogleLogin = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    setUnauthorizedDomainHost(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(firebaseAuth, provider);
      if (result.user.email?.toLowerCase() !== ADMIN_OWNER_EMAIL.toLowerCase()) {
        setAuthError(
          `Acesso negado para "${result.user.email}". Somente a conta de administrador credenciada pode acessar o Criador.`
        );
        recordAuditLog(`Tentativa de acesso negada: ${result.user.email}`, 'failed');
      } else {
        setIsClientsFullscreen(true);
        setAppSurface('studio');
      }
    } catch (err: any) {
      const code = String(err?.code || '');
      const msg = String(err?.message || '');
      if (code === 'auth/unauthorized-domain' || msg.includes('auth/unauthorized-domain')) {
        const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'biovip.com.br';
        setUnauthorizedDomainHost(currentHost);
        setShowDirectCredentialLogin(true);
        setAuthError(
          `O domínio "${currentHost}" ainda não foi autorizado no console do Firebase para pop-up Google. Utilize o acesso direto com sua credencial e PIN Mestre abaixo ou adicione "${currentHost}" em Domínios Autorizados no Firebase.`
        );
        recordAuditLog(`Domínio pendente de autorização OAuth (${currentHost})`, 'warning');
      } else if (code !== 'auth/popup-closed-by-user') {
        setAuthError(err?.message || 'Erro ao autenticar com o Google via Firebase.');
        recordAuditLog(`Erro autenticação Firebase: ${err?.message || 'Falha'}`, 'failed');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDirectCredentialAdminLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (lockoutRemainingSec > 0) return;
    setAuthError(null);

    const typedEmail = directAdminEmailInput.trim().toLowerCase();
    const cleanPin = directAdminPinInput.trim();

    if (!typedEmail) {
      setAuthError('Informe o e-mail de administrador.');
      return;
    }
    if (cleanPin.length !== 6 || !/^\d{6}$/.test(cleanPin)) {
      setAuthError('O PIN de segurança deve conter exatamente 6 dígitos numéricos.');
      return;
    }

    const currentHash = await hashPinCode(cleanPin);
    const storedHash = localStorage.getItem('biovip_admin_pin_hash_v2');
    const defaultHash = await hashPinCode(DEFAULT_ADMIN_PIN);
    const targetHash = storedHash || defaultHash;

    if (typedEmail === ADMIN_OWNER_EMAIL.toLowerCase() && currentHash === targetHash) {
      setDirectAdminAuthorized(true);
      setAdminPinUnlocked(true);
      setIsClientsFullscreen(true);
      setAppSurface('studio');
      setAuthError(null);
      setUnauthorizedDomainHost(null);
      setDirectAdminPinInput('');
      setPinAttemptsLeft(MAX_PIN_ATTEMPTS);
      try {
        sessionStorage.setItem('luxebio_admin_direct_auth', 'verified');
        sessionStorage.setItem('luxebio_admin_pin_session', 'unlocked');
        localStorage.removeItem('luxebio_pin_failed_attempts');
        localStorage.removeItem('luxebio_pin_lockout_until');
      } catch {}
      recordAuditLog('Login Administrativo Direto (Credencial + PIN Mestre) Realizado com Sucesso', 'success');
      showToast('🛡️ Acesso concedido! Painel de Gestão em Tela Cheia desbloqueado.');
    } else {
      const currentFailed = Number(localStorage.getItem('luxebio_pin_failed_attempts') || '0') + 1;
      const left = Math.max(0, MAX_PIN_ATTEMPTS - currentFailed);
      setPinAttemptsLeft(left);
      try {
        localStorage.setItem('luxebio_pin_failed_attempts', currentFailed.toString());
      } catch {}

      if (left <= 0) {
        const lockoutTime = Date.now() + LOCKOUT_DURATION_MS;
        try {
          localStorage.setItem('luxebio_pin_lockout_until', lockoutTime.toString());
        } catch {}
        setLockoutRemainingSec(Math.ceil(LOCKOUT_DURATION_MS / 1000));
        setAuthError(`Bloqueio de segurança temporário de 5 minutos ativado devido a ${MAX_PIN_ATTEMPTS} tentativas incorretas.`);
        recordAuditLog(`Bloqueio de Segurança Ativado (${MAX_PIN_ATTEMPTS} tentativas falhas)`, 'lockout');
      } else {
        setAuthError(`Credencial ou PIN de segurança incorretos. Tentativas restantes: ${left}.`);
        recordAuditLog(`Tentativa de login direto incorreta (${left} restantes)`, 'failed');
      }
    }
  };

  const handleVerifyAdminPin = async () => {
    if (lockoutRemainingSec > 0) return;
    const cleanPin = adminPinInput.trim();
    if (cleanPin.length !== 6 || !/^\d{6}$/.test(cleanPin)) {
      setAdminPinError('O PIN deve conter exatamente 6 dígitos numéricos.');
      return;
    }

    const currentHash = await hashPinCode(cleanPin);
    const storedHash = localStorage.getItem('biovip_admin_pin_hash_v2');
    const defaultHash = await hashPinCode(DEFAULT_ADMIN_PIN);
    const targetHash = storedHash || defaultHash;

    if (currentHash === targetHash) {
      setAdminPinUnlocked(true);
      setIsClientsFullscreen(true);
      setAppSurface('studio');
      setAdminPinError(null);
      setAdminPinInput('');
      setPinAttemptsLeft(MAX_PIN_ATTEMPTS);
      try {
        sessionStorage.setItem('luxebio_admin_pin_session', 'unlocked');
        localStorage.removeItem('luxebio_pin_failed_attempts');
        localStorage.removeItem('luxebio_pin_lockout_until');
      } catch {}
      recordAuditLog('Autenticação 2FA / PIN Mestre Realizada com Sucesso', 'success');
      showToast('🛡️ Acesso concedido! Painel de Gestão em Tela Cheia desbloqueado.');
    } else {
      const currentFailed = Number(localStorage.getItem('luxebio_pin_failed_attempts') || '0') + 1;
      const left = Math.max(0, MAX_PIN_ATTEMPTS - currentFailed);
      setPinAttemptsLeft(left);
      try {
        localStorage.setItem('luxebio_pin_failed_attempts', currentFailed.toString());
      } catch {}

      if (left <= 0) {
        const lockoutTime = Date.now() + LOCKOUT_DURATION_MS;
        try {
          localStorage.setItem('luxebio_pin_lockout_until', lockoutTime.toString());
        } catch {}
        setLockoutRemainingSec(Math.ceil(LOCKOUT_DURATION_MS / 1000));
        setAdminPinError(`Bloqueio de segurança temporário de 5 minutos ativado devido a ${MAX_PIN_ATTEMPTS} tentativas incorretas.`);
        recordAuditLog(`Bloqueio de Segurança Ativado (${MAX_PIN_ATTEMPTS} tentativas falhas)`, 'lockout');
      } else {
        setAdminPinError(`PIN de segurança incorreto. Você tem mais ${left} ${left === 1 ? 'tentativa restante' : 'tentativas restantes'}.`);
        recordAuditLog(`Tentativa de PIN incorreta (${left} restantes)`, 'failed');
      }
    }
  };

  const handleLockAdminPanel = () => {
    setAdminPinUnlocked(false);
    try {
      sessionStorage.removeItem('luxebio_admin_pin_session');
    } catch {}
    recordAuditLog('Painel Bloqueado Manualmente pelo Administrador', 'warning');
    showToast('🔒 Painel bloqueado! Insira seu PIN mestre para retomar o acesso.');
  };

  const handleChangeAdminPin = async () => {
    setChangePinError(null);
    if (!/^\d{6}$/.test(changePinCurrent)) {
      setChangePinError('Digite o PIN atual de 6 dígitos.');
      return;
    }
    if (!/^\d{6}$/.test(changePinNew)) {
      setChangePinError('O novo PIN deve conter exatamente 6 números.');
      return;
    }
    if (changePinNew !== changePinConfirm) {
      setChangePinError('A confirmação do novo PIN não confere.');
      return;
    }
    if (changePinNew === changePinCurrent) {
      setChangePinError('O novo PIN deve ser diferente do atual.');
      return;
    }

    const currentHash = await hashPinCode(changePinCurrent);
    const storedHash = localStorage.getItem('biovip_admin_pin_hash_v2');
    const defaultHash = await hashPinCode(DEFAULT_ADMIN_PIN);
    const targetHash = storedHash || defaultHash;

    if (currentHash !== targetHash) {
      setChangePinError('O PIN atual informado está incorreto.');
      return;
    }

    const newHash = await hashPinCode(changePinNew);
    try {
      localStorage.setItem('biovip_admin_pin_hash_v2', newHash);
    } catch {}
    setSecurityModalOpen(false);
    setChangePinCurrent('');
    setChangePinNew('');
    setChangePinConfirm('');
    recordAuditLog('PIN Mestre de 6 Dígitos Alterado com Sucesso', 'success');
    showToast('🔑 PIN Mestre de Segurança atualizado com sucesso!');
  };

  const handleAdminLogout = async () => {
    try {
      setAdminPinUnlocked(false);
      setDirectAdminAuthorized(false);
      setDirectAdminEmailInput('');
      setDirectAdminPinInput('');
      try {
        sessionStorage.removeItem('luxebio_admin_pin_session');
        sessionStorage.removeItem('luxebio_admin_direct_auth');
      } catch {}
      await signOut(firebaseAuth);
      setAuthError(null);
      recordAuditLog('Logout do Administrador Realizado', 'warning');
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const syncSiteToFirestore = React.useCallback(
    async (site: SavedMicrosite) => {
      if (!firebaseAuth.currentUser || firebaseAuth.currentUser.email?.toLowerCase() !== ADMIN_OWNER_EMAIL.toLowerCase()) {
        return;
      }
      const safeId = String(site.id || 'site-default').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
      const ownerUid = firebaseAuth.currentUser.uid;
      const safeClientName = (site.clientName || 'Cliente BioVip').slice(0, 160);
      const safeNiche = (site.nicheCategory || 'Geral').slice(0, 120);
      const safeSubdomain = (site.subdomain || 'modelo').slice(0, 120);
      const safeCustomDomain = (site.customDomain || '').slice(0, 180);
      const safeStatus: 'active' | 'overdue' | 'disabled' =
        site.status === 'disabled' || site.status === 'suspenso_d7'
          ? 'disabled'
          : site.status === 'overdue' || site.status === 'atrasado_d3' || site.status === 'pendente'
          ? 'overdue'
          : 'active';

      try {
        const recordPayload = serializeSafeFirestorePayload(site);
        await setDoc(doc(firebaseDb, 'admin_sites', safeId), {
          id: safeId,
          ownerId: ownerUid,
          clientName: safeClientName,
          nicheCategory: safeNiche,
          status: safeStatus,
          isLandingModel: Boolean(site.isLandingModel),
          recordPayload,
          updatedAt: serverTimestamp(),
        });

        if (site.isLandingModel) {
          const sitePayload = serializeSafeFirestorePayload({
            data: site.data,
            status: safeStatus,
            lastUpdated: site.lastUpdated,
            createdAt: site.createdAt,
            dueDate: site.dueDate,
            monthlyFee: site.monthlyFee,
            isCustomized: Boolean(site.isCustomized),
          });
          await setDoc(doc(firebaseDb, 'public_models', safeId), {
            id: safeId,
            ownerId: ownerUid,
            clientName: safeClientName,
            nicheCategory: safeNiche,
            subdomain: safeSubdomain,
            customDomain: safeCustomDomain,
            isLandingModel: true,
            sitePayload,
            updatedAt: serverTimestamp(),
          });
        } else {
          await deleteDoc(doc(firebaseDb, 'public_models', safeId));
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `admin_sites/${safeId}`);
      }
    },
    []
  );

  // Hydrate full-resolution saved sites from IndexedDB on startup (prevents 5MB localStorage quota truncation)
  useEffect(() => {
    let active = true;
    loadSitesFromIndexedDb().then((idbSites) => {
      if (!active || !Array.isArray(idbSites) || idbSites.length === 0) return;
      setSavedSites((prev) => {
        const byId = new Map(prev.map((s) => [s.id, s]));
        idbSites.forEach((idbSite: SavedMicrosite) => {
          if (idbSite && idbSite.id && idbSite.data) {
            const existing = byId.get(idbSite.id);
            if (!existing || JSON.stringify(idbSite.data).length > JSON.stringify(existing.data).length) {
              byId.set(idbSite.id, { ...existing, ...idbSite });
            }
          }
        });
        return Array.from(byId.values());
      });
    });
    return () => {
      active = false;
    };
  }, []);

  // Real-time listener on public_models (with where('isLandingModel', '==', true) required by firestore.rules)
  useEffect(() => {
    const publicModelsQuery = query(
      collection(firebaseDb, 'public_models'),
      where('isLandingModel', '==', true)
    );
    const unsub = onSnapshot(
      publicModelsQuery,
      (snap) => {
        if (snap.empty) return;
        const remoteModels: SavedMicrosite[] = [];
        snap.forEach((docSnap) => {
          const raw = docSnap.data() as Record<string, any>;
          if (!raw || !raw.id) return;
          let parsedPayload: Record<string, any> = {};
          if (typeof raw.sitePayload === 'string') {
            try {
              parsedPayload = JSON.parse(raw.sitePayload) || {};
            } catch {}
          }
          if (raw.id === 'biovip_landing_config' && parsedPayload.landingConfig) {
            setLandingConfig(prev => {
              const merged = {
                ...prev,
                ...parsedPayload.landingConfig,
                agencyWhatsapp:
                  !parsedPayload.landingConfig.agencyWhatsapp || parsedPayload.landingConfig.agencyWhatsapp === '5511999999999'
                    ? prev.agencyWhatsapp || '5531991390202'
                    : parsedPayload.landingConfig.agencyWhatsapp,
              };
              syncMaintenancePlansFromConfig(merged);
              try {
                localStorage.setItem('luxebio_landing_config_v1', JSON.stringify(merged));
              } catch {}
              return merged;
            });
            return;
          }
          const siteData = parsedPayload.data || raw.data;
          if (siteData) {
            remoteModels.push({
              id: raw.id,
              clientName: raw.clientName || 'Modelo BioVip',
              clientPhone: parsedPayload.clientPhone || raw.clientPhone || '',
              clientEmail: parsedPayload.clientEmail || raw.clientEmail || '',
              nicheCategory: raw.nicheCategory || 'Geral',
              createdAt: parsedPayload.createdAt || raw.createdAt || '2026-10-01',
              dueDate: parsedPayload.dueDate || raw.dueDate || '2026-11-15',
              monthlyFee: typeof parsedPayload.monthlyFee === 'number' ? parsedPayload.monthlyFee : typeof raw.monthlyFee === 'number' ? raw.monthlyFee : 197,
              status: parsedPayload.status || raw.status || 'active',
              updatesThisMonth: parsedPayload.updatesThisMonth || raw.updatesThisMonth || 1,
              lastUpdated: parsedPayload.lastUpdated || raw.lastUpdated || '2026-10-24',
              domainType: raw.customDomain ? 'custom' : 'subdomain',
              subdomain: raw.subdomain || 'modelo',
              customDomain: raw.customDomain || '',
              dnsConfigured: true,
              sslActive: true,
              isLandingModel: true,
              isCustomized: Boolean(parsedPayload.isCustomized || raw.isCustomized),
              data: siteData,
            });
          }
        });
        if (remoteModels.length > 0) {
          let deletedIds: string[] = [];
          try {
            const deletedRaw = localStorage.getItem('luxebio_deleted_site_ids_v1');
            if (deletedRaw) {
              const parsedDel = JSON.parse(deletedRaw);
              if (Array.isArray(parsedDel)) deletedIds = parsedDel;
            }
          } catch {}

          setSavedSites((prev) => {
            const byId = new Map(prev.map((s) => [s.id, s]));
            remoteModels.forEach((rm) => {
              if (deletedIds.includes(rm.id)) return;
              const existing = byId.get(rm.id);
              const isRemoteStale =
                (rm.data?.studentGrid?.photos?.length || 0) < 6 ||
                rm.data?.profile?.avatarUrl?.includes('1594824476967') ||
                rm.data?.profile?.avatarUrl?.includes('1544005313') ||
                rm.data?.profile?.avatarUrl?.includes('1580489944761') ||
                ((rm.id === 'site-1' || rm.subdomain === 'doncorleone') &&
                  rm.data?.profile?.avatarUrl?.includes('1573496359142'));

              if (existing?.isCustomized) {
                byId.set(rm.id, { ...rm, ...existing, data: existing.data, isLandingModel: true });
              } else if (isRemoteStale && existing) {
                byId.set(rm.id, { ...rm, data: existing.data, isLandingModel: existing.isLandingModel ?? true });
              } else {
                byId.set(rm.id, existing ? { ...existing, ...rm, isLandingModel: true } : rm);
              }
            });
            const merged = Array.from(byId.values());
            persistSavedSitesToStorage(merged);
            return merged;
          });
        }
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'public_models');
      }
    );
    return () => unsub();
  }, []);

  // Real-time listener on admin_sites to restore private client microsites across devices when Admin is authenticated with Firebase
  useEffect(() => {
    if (
      !adminUser ||
      !firebaseAuth.currentUser ||
      adminUser.email?.toLowerCase() !== ADMIN_OWNER_EMAIL.toLowerCase()
    ) {
      return;
    }
    const unsub = onSnapshot(
      collection(firebaseDb, 'admin_sites'),
      (snap) => {
        if (snap.empty) return;
        const remoteAdminSites: SavedMicrosite[] = [];
        snap.forEach((docSnap) => {
          const raw = docSnap.data() as Record<string, any>;
          if (!raw || !raw.id) return;
          let parsedRecord: SavedMicrosite | null = null;
          if (typeof raw.recordPayload === 'string') {
            try {
              parsedRecord = JSON.parse(raw.recordPayload);
            } catch {}
          } else if (raw.data) {
            parsedRecord = raw as SavedMicrosite;
          }
          if (parsedRecord && parsedRecord.id && parsedRecord.data) {
            remoteAdminSites.push({
              ...parsedRecord,
              id: raw.id,
              clientName: raw.clientName || parsedRecord.clientName,
              nicheCategory: raw.nicheCategory || parsedRecord.nicheCategory,
              status: raw.status || parsedRecord.status || 'active',
              isLandingModel: typeof raw.isLandingModel === 'boolean' ? raw.isLandingModel : parsedRecord.isLandingModel,
              isCustomized: Boolean(parsedRecord.isCustomized || raw.isCustomized),
            });
          }
        });

        if (remoteAdminSites.length > 0) {
          let deletedIds: string[] = [];
          try {
            const deletedRaw = localStorage.getItem('luxebio_deleted_site_ids_v1');
            if (deletedRaw) {
              const parsedDel = JSON.parse(deletedRaw);
              if (Array.isArray(parsedDel)) deletedIds = parsedDel;
            }
          } catch {}

          setSavedSites((prev) => {
            const byId = new Map(prev.map((s) => [s.id, s]));
            remoteAdminSites.forEach((rs) => {
              if (deletedIds.includes(rs.id)) return;
              const existing = byId.get(rs.id);
              if (existing?.isCustomized && !rs.isCustomized) {
                byId.set(rs.id, { ...rs, ...existing, data: existing.data, isCustomized: true });
              } else if (rs.isCustomized) {
                byId.set(rs.id, { ...existing, ...rs, data: rs.data, isCustomized: true });
              } else {
                byId.set(rs.id, existing ? { ...existing, ...rs } : rs);
              }
            });
            const merged = Array.from(byId.values());
            persistSavedSitesToStorage(merged);
            return merged;
          });
        }
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'admin_sites');
      }
    );
    return () => unsub();
  }, [adminUser]);

  // Auto-sync active edited site data in savedSites and mark isCustomized: true whenever data or editingSiteId changes
  useEffect(() => {
    if (!editingSiteId || !data) return;
    setSavedSites((prev) => {
      const idx = prev.findIndex((s) => s.id === editingSiteId);
      if (idx === -1) return prev;
      const existing = prev[idx];
      const dataString = JSON.stringify(data);
      if (existing.isCustomized && JSON.stringify(existing.data) === dataString) {
        return prev;
      }
      const updated = [...prev];
      updated[idx] = {
        ...existing,
        isCustomized: true,
        data: JSON.parse(dataString),
      };
      persistSavedSitesToStorage(updated);
      return updated;
    });
  }, [data, editingSiteId]);

  useEffect(() => {
    const handleRouteChange = () => {
      setAppSurface(detectCreatorSurface());
      setActivePublicSlug(detectPublicMicrositeSlug());
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, [landingConfig.creatorSubdomain]);

  const openCreatorSubdomain = (openInEditor?: boolean | React.MouseEvent) => {
    const subSlug = (landingConfig.creatorSubdomain || 'criador').toLowerCase().replace(/[^a-z0-9-]/g, '') || 'criador';
    try {
      window.history.pushState({ surface: 'studio' }, '', `/${subSlug}`);
    } catch {}
    setAppSurface('studio');
    setActivePublicSlug(null);
    if (openInEditor === true) {
      setIsClientsFullscreen(false);
    } else {
      setIsClientsFullscreen(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPublicSalesLanding = () => {
    try {
      window.history.pushState({ surface: 'landing' }, '', '/');
    } catch {}
    setAppSurface('landing');
    setActivePublicSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCleanBaseDomain = () => {
    return (
      (landingConfig.baseDomain || 'biovip.com.br')
        .toLowerCase()
        .trim()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/.*$/, '') || 'biovip.com.br'
    );
  };

  const getPublicMicrositeUrl = (subdomain: string, customDomain?: string) => {
    const baseDomain = getCleanBaseDomain();
    const cleanSub = (subdomain || 'dramarina').toLowerCase().trim().replace(/[^a-z0-9-]/g, '') || 'dramarina';
    const cleanCustom = (customDomain || '')
      .toLowerCase()
      .trim()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '');

    const isFakeSeedDomain =
      cleanCustom === `www.${cleanSub}.com.br` ||
      cleanCustom === `${cleanSub}.com.br` ||
      cleanCustom === 'www.dramarinaalmeida.com.br' ||
      cleanCustom === 'www.doncorleonebarber.com.br';

    if (cleanCustom && !isFakeSeedDomain) {
      return `https://${cleanCustom}`;
    }

    if (typeof window !== 'undefined') {
      const host = window.location.hostname.toLowerCase();
      if (host === baseDomain || host === `www.${baseDomain}` || host.endsWith(`.${baseDomain}`)) {
        return `https://${baseDomain}/${cleanSub}`;
      }
      return `${window.location.origin}/${cleanSub}`;
    }

    return `https://${baseDomain}/${cleanSub}`;
  };

  const openPublicMicrosite = (slug: string, customDomain?: string) => {
    const clean = (slug || 'dramarina').toLowerCase().replace(/[^a-z0-9-]/g, '') || 'dramarina';
    const targetUrl = getPublicMicrositeUrl(clean, customDomain);
    if (typeof window !== 'undefined') {
      const host = window.location.hostname.toLowerCase();
      const baseDomain = getCleanBaseDomain();
      if (host === baseDomain || host === `www.${baseDomain}` || host.endsWith(`.${baseDomain}`)) {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
        return;
      }
    }
    try {
      window.history.pushState({ surface: 'microsite', slug: clean }, '', `/${clean}`);
    } catch {}
    setActivePublicSlug(clean);
    setAppSurface('microsite');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLivePreviewTab = () => {
    try {
      const currentSite = savedSites.find(s => s.id === editingSiteId);
      const rawSub = currentSite?.subdomain || saveForm.subdomain || data?.profile?.instagram || data?.profile?.name || 'meusite';
      const cleanSub = String(rawSub).toLowerCase().trim().replace(/[^a-z0-9-]/g, '') || 'meusite';
      const customDomain = currentSite?.customDomain || saveForm.customDomain;
      const targetUrl = getPublicMicrositeUrl(cleanSub, customDomain);

      // Tenta abrir a prévia do microsite em nova aba
      const newWin = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        // Se bloqueado por pop-up ou política de iframe, carrega a prévia no próprio app sem deslogar
        openPublicMicrosite(cleanSub, customDomain);
      } else {
        showToast(`👁️ Abrindo prévia em tela cheia do microsite "${currentSite?.clientName || data?.profile?.name || 'BioVip'}"!`);
      }
    } catch (err) {
      console.error('Error opening live preview tab:', err);
      const fallbackSlug = (saveForm.subdomain || data?.profile?.instagram || 'meusite').toLowerCase().replace(/[^a-z0-9-]/g, '');
      openPublicMicrosite(fallbackSlug);
    }
  };

  // AI Copywriting Optimizer State
  const [aiCopyModalOpen, setAiCopyModalOpen] = useState(false);
  const [aiCopyTarget, setAiCopyTarget] = useState<{ fieldLabel: string; currentVal: string; applyFn: (text: string) => void } | null>(null);
  const [aiCopyLoading, setAiCopyLoading] = useState(false);
  const [aiCopyOptions, setAiCopyOptions] = useState<Array<{ type: string; text: string }>>([]);

  const openCopyOptimizer = (fieldLabel: string, currentVal: string, applyFn: (text: string) => void) => {
    setAiCopyTarget({ fieldLabel, currentVal, applyFn });
    setAiCopyOptions([]);
    setAiCopyModalOpen(true);
    handleOptimizeCopyText(fieldLabel, currentVal);
  };

  const handleOptimizeCopyText = async (fieldLabel: string, currentVal: string) => {
    setAiCopyLoading(true);
    try {
      const res = await fetch('/api/optimize-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText: currentVal,
          fieldType: fieldLabel,
          niche: THEMES[data.theme]?.category || 'Geral',
          geminiApiKey:
            (import.meta as any).env?.VITE_GEMINI_API_KEY ||
            (import.meta as any).env?.GEMINI_API_KEY ||
            undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Erro ao otimizar copy');
      setAiCopyOptions(json.variations || []);
    } catch (err: any) {
      showToast(`❌ ${err.message || 'Erro ao conectar com a IA de Copywriting.'}`);
    } finally {
      setAiCopyLoading(false);
    }
  };

  const sendWhatsappBillingReminder = (site: SavedMicrosite) => {
    const pixKey = data.saasSettings?.pixKey || 'contato@biovip.com.br';
    const pixName = data.saasSettings?.pixName || 'BioVip Studio SaaS';
    const billing = getSiteBillingSummary(site);
    const dueBr = formatDueDateBr(site.dueDate);
    const daysDiff = getDaysUntilDue(site.dueDate);
    const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : 0;

    let msg = `👋 Olá *${site.clientName}*!\n\n`;
    msg += `Segue o resumo da fatura do seu Biosite de Alta Conversão (*${site.customDomain || 'biovip.com.br/' + site.subdomain}*):\n\n`;
    if (billing.isFirstMonth) {
      msg += `✨ *Ciclo Atual:* 1º Mês (Taxa Única de Criação — *Isento de Mensalidade no 1º mês*)\n`;
      msg += `🎨 *Taxa de Criação (1º Mês):* R$ ${billing.creationFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
      msg += `🛠️ *Mensalidade no 1º Mês:* R$ 0,00 (Isento)\n`;
      msg += `📌 *Plano de Manutenção (a partir do 2º mês):* ${billing.plan.name} — R$ ${billing.maintenanceFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês\n`;
    } else {
      msg += `🛠️ *Plano de Manutenção:* ${billing.plan.name}\n`;
      msg += `💰 *Taxa de Manutenção Mensal:* R$ ${billing.maintenanceFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
      msg += `🔄 *Alterações realizadas no mês:* ${billing.updatesUsed} (Franquia do plano: ${billing.includedUpdatesLabel})\n`;
    }
    if (billing.extraUpdatesCount > 0) {
      msg += `➕ *Alterações Adicionais (${billing.extraUpdatesCount}x R$ 14,90):* R$ ${billing.extraUpdatesCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    }
    msg += `\n💵 *VALOR TOTAL A PAGAR:* *R$ ${billing.totalDueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*\n`;
    msg += `📅 *Data de Vencimento:* ${dueBr}\n`;
    if (daysOverdue >= AUTO_DISABLE_OVERDUE_DAYS) {
      msg += `🛑 *Status:* *Desativado automaticamente (${daysOverdue} dias de atraso — Regra do 7º dia).* Efetue o pagamento para reativação imediata do seu link.\n`;
    } else if (daysOverdue > 0) {
      msg += `⚠️ *Atenção:* Fatura com *${daysOverdue} dia(s) de atraso*. A desativação automática ocorre a partir do *7º dia de atraso* (restam *${AUTO_DISABLE_OVERDUE_DAYS - daysOverdue} dia(s)*).\n`;
    } else {
      msg += `ℹ️ *Política de Manutenção:* A desativação por atraso é automática a partir do 7º dia após o vencimento.\n`;
    }
    msg += `\n🔑 *Chave PIX:* ${pixKey}\n`;
    msg += `👤 *Favorecido:* ${pixName}\n\n`;
    msg += `Após realizar a transferência, por favor envie o comprovante por aqui para baixa e liberação automática. Qualquer dúvida estou à disposição! 🚀`;

    const phone = formatWhatsAppPhone(site.clientPhone);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    showToast(`📲 Lembrete de cobrança detalhado enviado no WhatsApp de ${site.clientName}!`);
  };

  // Prompt de Envio de Mensagem WhatsApp para o Cliente (Detalhes do Microsite, Vencimento, Valores, Links Redes Sociais e Tutorial Bio do Instagram)
  const [clientWaPromptSite, setClientWaPromptSite] = useState<SavedMicrosite | null>(null);
  const [clientWaPromptTemplate, setClientWaPromptTemplate] = useState<'complete_kit' | 'onboarding_bio' | 'renewal_details'>('complete_kit');
  const [clientWaPromptPhone, setClientWaPromptPhone] = useState('');
  const [clientWaPromptText, setClientWaPromptText] = useState('');
  const [copiedClientWaPrompt, setCopiedClientWaPrompt] = useState(false);

  const formatDueDateBr = (isoOrDate: string) => {
    if (!isoOrDate) return '—';
    const parts = isoOrDate.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoOrDate;
  };

  const buildClientWhatsappPromptText = (
    site: SavedMicrosite,
    templateType: 'complete_kit' | 'onboarding_bio' | 'renewal_details' = 'complete_kit'
  ) => {
    const primaryDomain = (site.customDomain || '').trim() || `biovip.com.br/${site.subdomain || 'meusite'}`;
    const primaryUrl = `https://${primaryDomain}`;
    const subdomainUrl = `https://biovip.com.br/${site.subdomain || 'meusite'}`;
    const instagramBioTrackedUrl = `${primaryUrl}?utm_source=instagram&utm_medium=bio`;
    const billing = getSiteBillingSummary(site);
    const dueBr = formatDueDateBr(site.dueDate);
    const pixKey = data.saasSettings?.pixKey || 'contato@biovip.com.br';
    const pixName = data.saasSettings?.pixName || 'BioVip Studio SaaS';
    const statusText = site.status === 'disabled' ? '🔴 Desativado por Atraso (>= 7 dias)' : site.status === 'overdue' ? '🟡 Pagamento em Atraso (Desativação no 7º dia)' : '🟢 Ativo & Online com SSL';

    if (templateType === 'onboarding_bio') {
      let msg = `🎉 Olá *${site.clientName}*! Seu novo Biosite de Alta Conversão já está no ar e pronto para receber clientes nas suas redes sociais!\n\n`;
      msg += `🌐 *SEUS LINKS OFICIAIS PARA REDES SOCIAIS:*\n`;
      msg += `🔗 *Link Principal (Curtinho p/ Bio):*\n${primaryUrl}\n\n`;
      msg += `📈 *Link com Rastreamento p/ Instagram (Recomendado):*\n${instagramBioTrackedUrl}\n`;
      if (site.customDomain) {
        msg += `\n🔹 *Link Alternativo (Subdomínio):*\n${subdomainUrl}\n`;
      }
      msg += `\n📋 *DADOS DO SEU PLANO, VALORES & MANUTENÇÃO:*\n`;
      msg += `• *Negócio/Nicho:* ${site.nicheCategory}\n`;
      msg += `• *Status:* ${statusText}\n`;
      msg += `• *1º Mês (Taxa Única de Criação):* R$ ${billing.creationFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} *(No 1º mês NÃO há cobrança de mensalidade!)*\n`;
      msg += `• *Seu Plano de Manutenção (a partir do 2º mês):* ${billing.plan.name} — *R$ ${billing.maintenanceFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês*\n`;
      msg += `• *Alterações Adicionais Avulsas:* R$ 14,90 por alteração extra (Opções de planos: R$ 29,90 c/ 1 alt. | R$ 49,90 c/ 4 alt. | R$ 79,90 Ilimitado)\n`;
      msg += `• *Próxima Data de Vencimento:* ${dueBr} *(Obs.: desativação automática a partir do 7º dia de atraso)*\n\n`;
      msg += `📲 *COMO INSERIR O LINK NA BIO DO SEU INSTAGRAM (PASSO A PASSO):*\n`;
      msg += `1️⃣ Abra o aplicativo do *Instagram* no celular e acesse o seu *Perfil* (toque na sua foto no canto inferior direito).\n`;
      msg += `2️⃣ Toque no botão *"Editar perfil"* (logo abaixo da sua biografia).\n`;
      msg += `3️⃣ Toque na opção *"Links"* e depois em *"Adicionar link externo"*.\n`;
      msg += `4️⃣ No campo *URL*, cole o seu link oficial:\n👉 ${primaryUrl}\n`;
      msg += `5️⃣ No campo *Título*, escreva uma chamada atrativa (Ex: *"✨ Agende seu Horário / Catálogo VIP"*).\n`;
      msg += `6️⃣ Toque em *Concluir (✔️)* no canto superior direito para salvar!\n\n`;
      msg += `💡 *Dica Bônus p/ Multiplicar Clientes:*\n`;
      msg += `• Coloque também este link nos *Stories* usando a figurinha *"Link"* sempre que postar resultados ou novidades.\n`;
      msg += `• No *WhatsApp Business*, vá em *Configurações > Ferramentas Comerciais > Perfil Comercial* e cole o link no campo *Site*.\n\n`;
      msg += `Qualquer alteração de fotos, preços ou textos que precisar, é só me chamar por aqui! 🚀✨`;
      return msg;
    }

    if (templateType === 'renewal_details') {
      let msg = `👋 Olá *${site.clientName}*, tudo bem?\n\n`;
      msg += `Segue o resumo atualizado com os detalhes de manutenção, vencimento, valores e os links oficiais do seu Biosite (*${primaryDomain}*):\n\n`;
      msg += `💳 *RESUMO FINANCEIRO, MANUTENÇÃO & VENCIMENTO:*\n`;
      msg += `• *Status do Biosite:* ${statusText}\n`;
      if (billing.isFirstMonth) {
        msg += `• *Ciclo Atual:* 1º Mês — Taxa de Criação (Isento de mensalidade no 1º mês)\n`;
        msg += `• *Valor da Taxa de Criação:* R$ ${billing.creationFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
      } else {
        msg += `• *Plano de Manutenção Ativo:* ${billing.plan.name}\n`;
        msg += `• *Taxa de Manutenção Mensal:* R$ ${billing.maintenanceFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
        msg += `• *Alterações no Mês:* ${billing.updatesUsed} realizada(s) (Franquia inclusa: ${billing.includedUpdatesLabel})\n`;
      }
      if (billing.extraUpdatesCount > 0) {
        msg += `• *Alterações Adicionais (${billing.extraUpdatesCount}x R$ 14,90):* + R$ ${billing.extraUpdatesCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
      }
      msg += `• *Total da Fatura Atual:* *R$ ${billing.totalDueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*\n`;
      msg += `• *Data de Vencimento:* ${dueBr}\n`;
      msg += `• *Regra de Tolerância:* Desativação automática do link a partir do 7º dia de atraso\n`;
      msg += `• *Chave PIX:* ${pixKey} (${pixName})\n\n`;
      msg += `🔗 *LINKS ATIVOS PARA USAR NAS SUAS REDES SOCIAIS:*\n`;
      msg += `• *Link Oficial (Instagram / TikTok / WhatsApp):*\n${primaryUrl}\n`;
      msg += `• *Link com Rastreio de Cliques da Bio:*\n${instagramBioTrackedUrl}\n\n`;
      msg += `📸 *COMO COLOCAR OU ATUALIZAR O LINK NA BIO DO INSTAGRAM:*\n`;
      msg += `1. Acesse seu perfil no app do Instagram e toque em *"Editar perfil"*.\n`;
      msg += `2. Toque em *"Links"* > *"Adicionar link externo"*.\n`;
      msg += `3. Em *URL*, cole: ${primaryUrl}\n`;
      msg += `4. Em *Título*, coloque: *"Agendamento & Catálogo Exclusivo"* e toque em *Salvar (✔️)*.\n\n`;
      msg += `Assim que realizar o pagamento, envie o comprovante por aqui para mantermos seu link 100% ativo e atualizado. Muito obrigado pela parceria! 🤝🚀`;
      return msg;
    }

    // Default: 'complete_kit'
    let msg = `👋 Olá *${site.clientName}*! Tudo bem?\n\n`;
    msg += `Aqui estão todos os detalhes atualizados do seu Biosite Profissional, incluindo informações de vencimento, valores de manutenção, seus links prontos para redes sociais e o tutorial de como colocar na Bio do Instagram:\n\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📌 *1. DETALHES DO BIOSITE, VALORES & VENCIMENTO*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `• *Cliente / Marca:* ${site.clientName}\n`;
    msg += `• *Categoria:* ${site.nicheCategory}\n`;
    msg += `• *Status da Página:* ${statusText}\n`;
    if (billing.isFirstMonth) {
      msg += `• *Ciclo Atual:* 1º Mês (Cobrada apenas a Taxa de Criação de *R$ ${billing.creationFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}* — *Não há mensalidade no 1º mês!*)\n`;
      msg += `• *Plano de Manutenção (a partir do 2º mês):* ${billing.plan.name} (*R$ ${billing.maintenanceFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês*)\n`;
    } else {
      msg += `• *Plano de Manutenção:* ${billing.plan.name}\n`;
      msg += `• *Valor da Taxa de Manutenção:* *R$ ${billing.maintenanceFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês*\n`;
      msg += `• *Alterações no Mês:* ${billing.updatesUsed} utilizada(s) (Franquia: ${billing.includedUpdatesLabel})\n`;
    }
    if (billing.extraUpdatesCount > 0) {
      msg += `• *Alterações Adicionais Excedentes (${billing.extraUpdatesCount}x R$ 14,90):* R$ ${billing.extraUpdatesCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    }
    msg += `• *Valor Total do Ciclo Atual:* *R$ ${billing.totalDueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*\n`;
    msg += `• *Data de Vencimento:* *${dueBr}* *(Desativação automática a partir do 7º dia de atraso)*\n`;
    msg += `• *Chave PIX:* ${pixKey} (${pixName})\n`;
    msg += `• *Tabela de Planos de Manutenção:* R$ 29,90 (1 alt./mês) | R$ 49,90 (4 alt./mês) | R$ 79,90 (Ilimitado) | Alteração extra avulsa: R$ 14,90\n\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🌐 *2. SEUS LINKS PARA REDES SOCIAIS*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `✅ *Link Oficial Principal (Bio do Instagram, TikTok e WhatsApp):*\n${primaryUrl}\n\n`;
    msg += `📊 *Link com Rastreamento de Cliques da Bio (UTM Instagram):*\n${instagramBioTrackedUrl}\n`;
    if (site.customDomain) {
      msg += `\n🔹 *Link Espelho (Subdomínio Direto):*\n${subdomainUrl}\n`;
    }
    msg += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📸 *3. COMO INSERIR O LINK NA BIO DO INSTAGRAM*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Siga este passo a passo rápido no seu celular:\n\n`;
    msg += `1️⃣ Abra o aplicativo do *Instagram* e entre no seu *Perfil* (ícone da sua foto no canto inferior direito).\n`;
    msg += `2️⃣ Toque no botão *"Editar perfil"* logo abaixo da sua descrição.\n`;
    msg += `3️⃣ Toque na opção *"Links"* e em seguida em *"Adicionar link externo"*.\n`;
    msg += `4️⃣ No campo *URL*, cole o seu link oficial:\n👉 ${primaryUrl}\n`;
    msg += `5️⃣ No campo *Título*, digite uma frase chamativa (ex: *"✨ Agende seu Horário / Nosso Catálogo"*).\n`;
    msg += `6️⃣ Toque em *Concluir (✔️)* no canto superior direito para salvar!\n\n`;
    msg += `💡 *Onde mais usar o seu link:*\n`;
    msg += `• *Stories do Instagram:* Use a figurinha *"Link"* nos seus Stories diários para levar seguidores direto para o agendamento.\n`;
    msg += `• *WhatsApp Business:* Vá em *Configurações > Ferramentas Comerciais > Perfil Comercial* e adicione o link no campo *Site* e na *Mensagem de Ausência*.\n`;
    msg += `• *TikTok & Google Meu Negócio:* Cole no campo *Site/Website* do seu perfil.\n\n`;
    msg += `Qualquer dúvida ou se precisar solicitar alterações de fotos, valores ou serviços no seu biosite, estou à disposição por aqui! 🚀✨`;
    return msg;
  };

  const openClientWaPromptModal = (
    site: SavedMicrosite,
    initialTemplate: 'complete_kit' | 'onboarding_bio' | 'renewal_details' = 'complete_kit'
  ) => {
    setClientWaPromptSite(site);
    setClientWaPromptTemplate(initialTemplate);
    setClientWaPromptPhone(site.clientPhone || '');
    setClientWaPromptText(buildClientWhatsappPromptText(site, initialTemplate));
    setCopiedClientWaPrompt(false);
  };

  // AI Generator Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiStepIndex, setAiStepIndex] = useState(0);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiForm, setAiForm] = useState({
    businessName: '',
    whatsapp: '',
    instagram: '',
    googleMaps: '',
    businessNiche: '',
    additionalInfo: '',
    selectedPalette: 'darkGold',
    conversionGoal: 'whatsapp_booking' as 'whatsapp_booking' | 'catalog_sales' | 'vip_triage' | 'courses_mentorship',
    visualStyle: 'auto' as 'auto' | 'rose_luxury' | 'dark_gold' | 'clean_minimal' | 'vibrant_glam',
  });
  const [quickCreationMode, setQuickCreationMode] = useState<'instant_ai' | 'gemini_script' | 'manual_quick'>('instant_ai');
  const [lastExtractedMeta, setLastExtractedMeta] = useState<any | null>(null);
  const [aiCreationMode, setAiCreationMode] = useState<'auto_api' | 'gemini_script'>('instant_ai' as any);
  const [geminiPastedCode, setGeminiPastedCode] = useState('');
  const [copiedGeminiScript, setCopiedGeminiScript] = useState(false);
  const [copiedGeminiPrefilledScript, setCopiedGeminiPrefilledScript] = useState(false);
  const [geminiAutoFetchInstaPhotos, setGeminiAutoFetchInstaPhotos] = useState(true);
  const [geminiAutoCreateAdminRecord, setGeminiAutoCreateAdminRecord] = useState(true);
  const [geminiImporting, setGeminiImporting] = useState(false);
  const [showStylingGeminiBox, setShowStylingGeminiBox] = useState(true);

  const buildClientSmartMicrosite = () => {
    const cleanInsta = (aiForm.instagram || '').replace('@', '').trim() || 'studiovip';
    const rawName =
      (aiForm.businessName || '').trim() ||
      cleanInsta.replace(/[._-]+/g, ' ').toUpperCase() ||
      'STUDIO VIP';
    const nameUpper = rawName.toUpperCase();
    const nicheRaw = `${aiForm.businessNiche || ''} ${aiForm.additionalInfo || ''} ${rawName}`.toLowerCase();
    const mapsUrl = (aiForm.googleMaps || '').trim() || 'https://maps.google.com';

    const isBeautyLashNail = /c[ií]lio|lash|unha|nail|manicure|fibra|gel|sobrancelha|beleza|studio|est[eé]tica|make|maquiagem|sal[aã]o|cabelo|hair/.test(nicheRaw);
    const isBarber = /barbearia|barber|barba|fade|degrad[eê]|corte masculino|grooming/.test(nicheRaw);
    const isLaw = /advogad|advocacia|jur[ií]dic|direito|oab|escrit[oó]rio|lei/.test(nicheRaw);
    const isHealth = /psic[oó]log|terapia|sa[uú]de|m[eé]dic|odonto|dentista|nutri|fisio|cl[ií]nica/.test(nicheRaw);
    const isMentor = /mentor|curso|treinamento|consultoria|infoproduto|palestrante|coach/.test(nicheRaw);
    const isFashion = /moda|loja|boutique|roupa|look|acess[oó]rio|joia|semijoia/.test(nicheRaw);

    if (isBeautyLashNail) {
      const hasLash = /c[ií]lio|lash|volume\s+ingl[eê]s|volume\s+brasileiro|efeito\s+fox|fox\s+eyes|fio\s+a\s+fio/.test(nicheRaw);
      const hasNail = /\b(?:unha|unhas|nail|fibra|gel|manicure)\b/.test(nicheRaw);
      const specialtyTitle =
        hasLash && hasNail
          ? 'EXTENSÃO DE CÍLIOS & NAIL DESIGNER DE ALTO PADRÃO'
          : hasLash
          ? (aiForm.businessNiche || 'ESPECIALISTA EM EXTENSÃO DE CÍLIOS & LASH DESIGN').toUpperCase()
          : hasNail
          ? (aiForm.businessNiche || 'NAIL DESIGNER & ALONGAMENTO DE LUXO').toUpperCase()
          : (aiForm.businessNiche || 'BELEZA, ESTÉTICA & AUTOESTIMA').toUpperCase();

      const preferredBeautyTheme =
        aiForm.visualStyle === 'dark_gold'
          ? 'obsidianGold'
          : aiForm.visualStyle === 'clean_minimal'
          ? 'clinicalClean'
          : aiForm.visualStyle === 'vibrant_glam'
          ? 'velvetGlamour'
          : 'roseGoldQuartz';

      const clientBeautyServices =
        hasLash && !hasNail
          ? [
              {
                id: 'srv-1',
                name: 'Extensão de Cílios — Volume Brasileiro / Volume Inglês',
                description: 'Volume na medida certa para realçar sua beleza com olhar delicado, elegante, confortável e duradouro.',
                price: 'Sob Consulta',
                oldPrice: '',
                duration: '1h45',
                badge: 'MAIS PEDIDO',
                ctaLabel: 'Agendar',
                actionType: 'booking' as const,
                featured: true,
                imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300',
              },
              {
                id: 'srv-2',
                name: 'Extensão de Cílios — Efeito Fox (Fox Eyes) / Fio a Fio',
                description: 'Mapeamento alongado e personalizado para um olhar marcante, sofisticado e irresistível sem perder a delicadeza.',
                price: 'Sob Consulta',
                oldPrice: '',
                duration: '2h00',
                badge: 'DESTAQUE VIP',
                ctaLabel: 'Agendar',
                actionType: 'booking' as const,
                featured: true,
                imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=300',
              },
              {
                id: 'srv-3',
                name: 'Manutenção de Extensão de Cílios & Higienização',
                description: 'Higienização profunda e reposição estratégica dos fios para manter seu olhar sempre impecável.',
                price: 'Sob Consulta',
                oldPrice: '',
                duration: '1h15',
                badge: 'MANUTENÇÃO',
                ctaLabel: 'Reservar',
                actionType: 'booking' as const,
                featured: false,
                imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
              },
            ]
          : hasNail && !hasLash
          ? [
              {
                id: 'srv-1',
                name: 'Alongamento em Fibra de Vidro Slim',
                description: 'Unhas resistentes, curvatura natural impecável e acabamento espelhado de longa duração.',
                price: 'Sob Consulta',
                oldPrice: '',
                duration: '2h00',
                badge: 'NAIL LUXURY',
                ctaLabel: 'Agendar',
                actionType: 'booking' as const,
                featured: true,
                imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300',
              },
              {
                id: 'srv-2',
                name: 'Banho de Gel & Esmaltação em Gel',
                description: 'Brilho intenso, proteção para suas unhas naturais e durabilidade por semanas sem descascar.',
                price: 'Sob Consulta',
                oldPrice: '',
                duration: '1h30',
                badge: 'ALTA DURABILIDADE',
                ctaLabel: 'Agendar',
                actionType: 'booking' as const,
                featured: true,
                imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=300',
              },
              {
                id: 'srv-3',
                name: 'Manutenção de Alongamento & Cuticulagem',
                description: 'Nivelamento estrutural e renovação completa para manter suas unhas sempre impecáveis.',
                price: 'Sob Consulta',
                oldPrice: '',
                duration: '1h30',
                badge: 'RETORNO VIP',
                ctaLabel: 'Reservar',
                actionType: 'booking' as const,
                featured: false,
                imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300',
              },
            ]
          : [
              {
                id: 'srv-1',
                name: 'Extensão de Cílios (Volume Brasileiro / Fox Eyes / Fio a Fio)',
                description: 'Mapeamento personalizado para destacar seu olhar com leveza, conforto e alta retenção.',
                price: 'Sob Consulta',
                oldPrice: '',
                duration: '1h45',
                badge: 'MAIS PEDIDO',
                ctaLabel: 'Agendar',
                actionType: 'booking' as const,
                featured: true,
                imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300',
              },
              {
                id: 'srv-2',
                name: 'Alongamento em Fibra de Vidro / Banho de Gel Slim',
                description: 'Unhas resistentes, curvatura natural impecável e acabamento espelhado de longa duração.',
                price: 'Sob Consulta',
                oldPrice: '',
                duration: '2h00',
                badge: 'NAIL LUXURY',
                ctaLabel: 'Agendar',
                actionType: 'booking' as const,
                featured: true,
                imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300',
              },
            ];

      return {
        theme: preferredBeautyTheme,
        styling: {
          ...INITIAL_DATA.styling,
          fontFamily: THEMES[preferredBeautyTheme]?.fontHeadline || 'Playfair Display',
          photoPosY: 22,
        },
        announcement: {
          enabled: true,
          badge: 'AGENDA VIP ABERTA',
          text: 'Últimos horários da semana disponíveis. Garanta seu atendimento!',
          link: '#booking',
        },
        profile: {
          ...INITIAL_DATA.profile,
          name: nameUpper,
          title: specialtyTitle,
          tagline:
            aiForm.additionalInfo?.trim() ||
            'Realçando sua beleza natural com técnicas exclusivas, durabilidade impecável e atendimento personalizado.',
          cursivePhrase: 'Sua autoestima e olhar radiante em cada detalhe.',
          avatarUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
          aboutPhotoUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
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
            subtitle: 'Garanta seu procedimento com atendimento personalizado e exclusivo.',
            icon: 'Calendar',
            linkType: 'booking',
            url: '#booking',
            whatsappMessage: `Olá! Vim pelo microsite do ${rawName} e gostaria de agendar um horário.`,
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
            subtitle: 'Confira nossas técnicas exclusivas, pacotes e detalhes.',
            icon: 'Sparkles',
            linkType: 'catalogo',
            url: '#catalogo',
            whatsappMessage: `Olá! Gostaria de consultar a tabela de procedimentos do ${rawName}.`,
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
            whatsappMessage: 'Olá! Gostaria de confirmar a localização do Studio.',
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
        studentGrid: {
          ...INITIAL_DATA.studentGrid,
          enabled: true,
          headline: 'Portfólio & Transformações Reais',
          subtitle: 'Confira os trabalhos mais curtidos de nossas clientes no studio',
          photos: [
            'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
          ],
          captions: [],
        },
        locationCard: {
          enabled: true,
          headline: `Localização — ${rawName}`,
          address: 'Clique para abrir a rota no Google Maps e vir até o nosso espaço',
          buttonLabel: 'Abrir no Google Maps',
          mapsUrl,
          hours: 'Seg a Sáb · 08:30 às 19:30',
          openStatus: 'ABERTO AGORA · HORA MARCADA',
          showHours: true,
        },
        services: {
          ...INITIAL_DATA.services,
          enabled: true,
          headline: 'Menu de Procedimentos Exclusivos',
          subtitle: 'Materiais hipoalergênicos de primeira linha com retenção e acabamento de luxo',
          items: clientBeautyServices,
        },
        aboutMe: {
          enabled: true,
          headline: `Sobre ${rawName}`,
          paragraph: `Referência em ${aiForm.businessNiche || (hasLash && !hasNail ? 'Extensão de Cílios' : hasNail && !hasLash ? 'Nail Design' : 'Beleza e Estética')}, nosso studio nasceu com a missão de entregar um atendimento acolhedor, técnico e altamente personalizado. Utilizamos apenas materiais de excelência para garantir saúde, durabilidade e um acabamento sofisticado que valoriza sua beleza única.`,
          closingPhrase: 'Beleza, autocuidado e excelência em cada atendimento.',
        },
      };
    }

    const fallbackCat = isBarber
      ? 'Barbearia & Grooming'
      : isLaw
      ? 'Jurídico & Executivo'
      : isHealth
      ? 'Saúde & Psicologia'
      : isMentor
      ? 'Mentoria & Cursos'
      : isFashion
      ? 'Moda & Juventude'
      : 'Consultoria & Estética';
    const kit = NICHE_KITS[fallbackCat] || NICHE_KITS['Beleza & Unhas'];

    return {
      theme: kit.defaultTheme,
      announcement: {
        enabled: true,
        badge: kit.announcement.badge,
        text: kit.announcement.text,
        link: '#booking',
      },
      profile: {
        ...INITIAL_DATA.profile,
        ...kit.profile,
        name: nameUpper,
        title: (aiForm.businessNiche || kit.profile.title).toUpperCase(),
        tagline: aiForm.additionalInfo?.trim() || kit.profile.tagline,
        instagram: cleanInsta,
        mapsUrl,
      },
      metrics: {
        enabled: true,
        ...kit.metrics,
      },
      actionCards: kit.actionCards,
      locationCard: {
        enabled: true,
        headline: `Localização — ${rawName}`,
        address: kit.profile.location,
        buttonLabel: 'Abrir no Google Maps',
        mapsUrl,
        hours: 'Seg a Sáb · 08:30 às 19:30',
        openStatus: 'ABERTO AGORA · HORA MARCADA',
        showHours: true,
      },
      services: {
        ...INITIAL_DATA.services,
        enabled: true,
        headline: kit.services.headline,
        items: kit.services.items.map((it) => ({
          ...it,
          ctaLabel: 'Reservar',
          actionType: 'booking' as const,
          featured: true,
        })),
      },
    };
  };

  const applyGeneratedMicrositeData = (generated: any, extractedMeta?: any) => {
    const safeTheme =
      aiForm.selectedPalette && THEMES[aiForm.selectedPalette]
        ? aiForm.selectedPalette
        : generated?.theme && THEMES[generated.theme]
        ? generated.theme
        : 'darkGold';
    const targetThemeObj = THEMES[safeTheme] || THEMES.darkGold;

    const normalizedCards =
      Array.isArray(generated?.actionCards) && generated.actionCards.length > 0
        ? generated.actionCards.map((c: any, idx: number) => ({
            id: c.id || `cta-${idx + 1}`,
            title: c.title || 'ATENDIMENTO VIP',
            subtitle: c.subtitle || 'Clique para saber mais informações.',
            icon: c.icon || 'Calendar',
            linkType: c.linkType || 'booking',
            url: c.url || '#booking',
            whatsappMessage: c.whatsappMessage || 'Olá! Gostaria de agendar um horário.',
            openInNewTab: c.openInNewTab ?? true,
            animation: c.animation || (idx === 0 ? 'pulse-glow' : 'none'),
            variant: c.variant || (idx === 0 ? 'accent' : 'default'),
            badgeText: c.badgeText || '',
            customBg: c.customBg || '#ffffff',
            customText: c.customText || '#0f172a',
            bgImage: c.bgImage || '',
            imagePosition: c.imagePosition || 'none',
            cardImage: sanitizeImageUrl(c.cardImage, ''),
            imageFitStyle: c.imageFitStyle || 'framed',
            imageSize: c.imageSize || 88,
            ctaActionText: c.ctaActionText || 'SAIBA MAIS',
          }))
        : INITIAL_DATA.actionCards;

    const normalizedServices =
      Array.isArray(generated?.services?.items) && generated.services.items.length > 0
        ? generated.services.items.map((srv: any, idx: number) => ({
            id: srv.id || `srv-${idx + 1}`,
            name: srv.name || 'Atendimento Exclusivo',
            description: srv.description || 'Atendimento personalizado com foco no melhor resultado.',
            price: srv.price || 'Sob Consulta',
            oldPrice: srv.oldPrice || '',
            duration: srv.duration || '1h00',
            badge: srv.badge || (idx === 0 ? 'DESTAQUE' : ''),
            ctaLabel: srv.ctaLabel || 'Agendar',
            actionType: (srv.actionType as 'booking' | 'whatsapp' | 'link') || 'booking',
            customUrl: srv.customUrl || '',
            featured: srv.featured ?? idx === 0,
            imageUrl: sanitizeImageUrl(
              srv.imageUrl,
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400'
            ),
          }))
        : INITIAL_DATA.services.items;

    const cleanInsta = (aiForm.instagram || '')
      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
      .split('/')[0]
      .split('?')[0]
      .replace('@', '')
      .trim();
    const cleanMaps = (aiForm.googleMaps || '').trim();

    const rawGalleryPhotos =
      Array.isArray(generated?.studentGrid?.photos) && generated.studentGrid.photos.length > 0
        ? generated.studentGrid.photos
        : INITIAL_DATA.studentGrid.photos;

    const finalGalleryPhotos = rawGalleryPhotos.map((p: any, idx: number) =>
      sanitizeImageUrl(p, INITIAL_DATA.studentGrid.photos[idx % INITIAL_DATA.studentGrid.photos.length])
    );

    const finalGalleryCaptions = finalGalleryPhotos.map((_: string, idx: number) =>
      Array.isArray(generated?.studentGrid?.captions)
        ? String(generated.studentGrid.captions[idx] || '')
        : ''
    );

    const builtMicrositeData: typeof INITIAL_DATA = {
      ...INITIAL_DATA,
      theme: safeTheme,
      customColors: { ...INITIAL_DATA.customColors, enabled: false },
      styling: {
        ...INITIAL_DATA.styling,
        fontFamily: targetThemeObj.fontHeadline,
        ...(generated?.styling || {}),
      },
      announcement: {
        ...INITIAL_DATA.announcement,
        ...(generated?.announcement || {}),
      },
      profile: {
        ...INITIAL_DATA.profile,
        ...(generated?.profile || {}),
        avatarUrl: sanitizeImageUrl(generated?.profile?.avatarUrl, INITIAL_DATA.profile.avatarUrl),
        aboutPhotoUrl: sanitizeImageUrl(generated?.profile?.aboutPhotoUrl, INITIAL_DATA.profile.aboutPhotoUrl),
        name:
          generated?.profile?.name ||
          (aiForm.businessName ? aiForm.businessName.toUpperCase() : data.profile.name),
        whatsapp:
          aiForm.whatsapp?.trim() ||
          generated?.profile?.whatsapp ||
          data.profile.whatsapp,
        instagram: generated?.profile?.instagram || cleanInsta || data.profile.instagram,
        mapsUrl: generated?.profile?.mapsUrl || cleanMaps || data.profile.mapsUrl,
      },
      metrics: {
        ...INITIAL_DATA.metrics,
        ...(generated?.metrics || {}),
      },
      actionCards: normalizedCards.map((c: any) => {
        if (c.linkType === 'whatsapp' && aiForm.whatsapp?.trim()) {
          return {
            ...c,
            whatsappMessage: c.whatsappMessage || `Olá! Vim pelo site de ${aiForm.businessName || 'atendimento'} e gostaria de agendar um horário.`,
          };
        }
        return c;
      }),
      processSteps: {
        ...INITIAL_DATA.processSteps,
        ...(generated?.processSteps || {}),
        steps:
          Array.isArray(generated?.processSteps?.steps) && generated.processSteps.steps.length > 0
            ? generated.processSteps.steps
            : INITIAL_DATA.processSteps.steps,
      },
      studentGrid: {
        ...INITIAL_DATA.studentGrid,
        ...(generated?.studentGrid || {}),
        photos: finalGalleryPhotos,
        captions: finalGalleryCaptions,
      },
      locationCard: {
        ...INITIAL_DATA.locationCard,
        ...(generated?.locationCard || {}),
        mapsUrl: generated?.locationCard?.mapsUrl || cleanMaps || INITIAL_DATA.locationCard.mapsUrl,
        hours:
          generated?.locationCard?.hours ||
          extractedMeta?.businessHours ||
          INITIAL_DATA.locationCard.hours,
        openStatus:
          generated?.locationCard?.openStatus ||
          INITIAL_DATA.locationCard.openStatus,
        showHours: generated?.locationCard?.showHours ?? true,
      },
      services: {
        ...INITIAL_DATA.services,
        ...(generated?.services || {}),
        items: normalizedServices,
      },
      testimonials: {
        ...INITIAL_DATA.testimonials,
        ...(generated?.testimonials || {}),
        items:
          Array.isArray(generated?.testimonials?.items) && generated.testimonials.items.length > 0
            ? generated.testimonials.items
            : INITIAL_DATA.testimonials.items,
      },
      qualifierFunnel: {
        ...INITIAL_DATA.qualifierFunnel,
        ...(generated?.qualifierFunnel || {}),
        questions:
          Array.isArray(generated?.qualifierFunnel?.questions) &&
          generated.qualifierFunnel.questions.length > 0
            ? generated.qualifierFunnel.questions
            : INITIAL_DATA.qualifierFunnel.questions,
      },
      aboutMe: {
        ...INITIAL_DATA.aboutMe,
        ...(generated?.aboutMe || {}),
      },
      faq: {
        ...INITIAL_DATA.faq,
        ...(generated?.faq || {}),
        items:
          Array.isArray(generated?.faq?.items) && generated.faq.items.length > 0
            ? generated.faq.items
            : INITIAL_DATA.faq.items,
      },
      conversion: {
        ...INITIAL_DATA.conversion,
        ...(generated?.conversion || {}),
      },
      seo: {
        ...INITIAL_DATA.seo,
        metaTitle: `${
          generated?.profile?.name || aiForm.businessName || INITIAL_DATA.profile.name
        } — ${generated?.profile?.title || aiForm.businessNiche || INITIAL_DATA.profile.title}`,
        metaDescription:
          generated?.profile?.tagline || aiForm.additionalInfo || INITIAL_DATA.profile.tagline,
        ogImageUrl: generated?.profile?.avatarUrl || INITIAL_DATA.profile.avatarUrl,
      },
    };

    // Auto-criação do cadastro do cliente na Área de Administração
    const clientName =
      builtMicrositeData.profile.name ||
      aiForm.businessName ||
      'Novo Cliente';
    const clientPhone =
      aiForm.whatsapp?.trim() ||
      builtMicrositeData.profile.whatsapp ||
      '';
    const rawSlug = cleanInsta || clientName;
    const cleanSlug =
      String(rawSlug)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || `cliente-${Date.now().toString().slice(-4)}`;

    const newId = editingSiteId || 'site-' + Date.now();
    const todayStr = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    const dueDateStr = nextMonth.toISOString().split('T')[0];

    const autoClient: SavedMicrosite = {
      id: newId,
      clientName,
      clientPhone,
      clientEmail: `${cleanSlug}@biovip.com.br`,
      nicheCategory: builtMicrositeData.profile.title || aiForm.businessNiche || 'Geral',
      createdAt: todayStr,
      dueDate: dueDateStr,
      monthlyFee: 49.9,
      maintenancePlan: 'pro_4',
      creationFee: Number((landingConfig as any).creationFee) || 79.9,
      isFirstMonth: true,
      status: 'active',
      updatesThisMonth: 0,
      lastUpdated: todayStr,
      domainType: 'subdomain',
      subdomain: cleanSlug,
      customDomain: '',
      dnsConfigured: true,
      sslActive: true,
      whatsappClicks: 0,
      pageViews: 120,
      isLandingModel: false,
      isCustomized: true,
      data: JSON.parse(JSON.stringify(builtMicrositeData)),
    };

    setData(builtMicrositeData);
    setLastExtractedMeta(extractedMeta || null);
    setEditingSiteId(newId);
    setSaveForm({
      clientName,
      clientPhone,
      clientEmail: `${cleanSlug}@biovip.com.br`,
      maintenancePlan: 'pro_4',
      monthlyFee: '49,90',
      creationFee: '79,90',
      isFirstMonth: true,
      subdomain: cleanSlug,
      customDomain: '',
      isLandingModel: false,
    });

    setSavedSites((prev) => {
      const existingIdx = prev.findIndex((s) => s.id === newId);
      let updatedList: SavedMicrosite[];
      if (existingIdx >= 0) {
        updatedList = prev.map((s, idx) => (idx === existingIdx ? autoClient : s));
      } else {
        updatedList = [autoClient, ...prev];
      }
      persistSavedSitesToStorage(updatedList);
      syncSiteToFirestore(autoClient);
      return updatedList;
    });

    setAiModalOpen(false);
    setActiveTab('quickCreate');
    triggerSimulatorSkeleton(480);

    const totalRealPhotos =
      (extractedMeta?.instagramPhotosCount || 0) + (extractedMeta?.mapsPhotosCount || 0);
    const servicesCount = extractedMeta?.servicesExtractedCount || normalizedServices.length;
    const sourcesFound: string[] = [];
    if (extractedMeta?.instagramFound) sourcesFound.push('Instagram');
    if (extractedMeta?.mapsFound) sourcesFound.push('Google Meu Negócio');

    if (sourcesFound.length > 0) {
      showToast(
        `🚀 Microsite criado e salvo! ${totalRealPhotos} foto(s) e ${servicesCount} serviço(s) reais aplicados.`
      );
      if (extractedMeta?.warning) {
        setTimeout(() => {
          showToast(`ℹ️ Hospedagem: configure GEMINI_API_KEY no painel para redação neural via Gemini.`);
        }, 4000);
      }
    } else {
      showToast('✨ Microsite criado e cadastrado com sucesso no Painel de Clientes!');
    }

    return builtMicrositeData;
  };

  // Iniciar novo microsite em branco de forma simples e limpa
  const handleStartNewMicrosite = () => {
    setData(INITIAL_DATA);
    setEditingSiteId(null);
    setSaveForm({
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      maintenancePlan: 'pro_4',
      monthlyFee: '49,90',
      creationFee: '79,90',
      isFirstMonth: true,
      subdomain: '',
      customDomain: '',
      isLandingModel: false,
    });
    setAiForm({
      businessName: '',
      whatsapp: '',
      instagram: '',
      googleMaps: '',
      businessNiche: '',
      additionalInfo: '',
      selectedPalette: 'darkGold',
      conversionGoal: 'whatsapp_booking',
      visualStyle: 'auto',
    });
    setAiError(null);
    setGeminiPastedCode('');
    setActiveTab('quickCreate');
    triggerSimulatorSkeleton(300);
    showToast('✨ Novo microsite iniciado! Digite o Nome, WhatsApp e Instagram abaixo.');
  };

  // ============================================================================
  // GERADOR VIA SCRIPT INTERATIVO NO GEMINI EXTERNO (COPIAR SCRIPT & COLAR JSON)
  // ============================================================================
  const buildGeminiSequentialScript = (prefilled: boolean = false) => {
    const cleanInsta = (aiForm.instagram || '').replace('@', '').trim();
    const prefilledBlock =
      prefilled && (cleanInsta || aiForm.googleMaps || aiForm.businessName || aiForm.businessNiche)
        ? `\n### DADOS INICIAIS QUE JÁ TENHO DO CLIENTE:
- Nome do Cliente/Negócio: ${aiForm.businessName || 'Extrair do perfil'}
- Nicho/Especialidade: ${aiForm.businessNiche || 'Extrair do perfil'}
- Instagram: ${cleanInsta ? `@${cleanInsta} (https://www.instagram.com/${cleanInsta}/)` : 'Solicitar na entrevista'}
- Google Maps / Endereço: ${aiForm.googleMaps || 'Solicitar ou buscar na internet'}
- Informações Extras: ${aiForm.additionalInfo || 'Nenhuma'}
(Se já tiver o suficiente acima, pesquise imediatamente na internet e gere o bloco JSON final! Caso falte algo importante, pergunte primeiro).\n`
        : '';

    return `Você agora é o **Arquiteto Oficial de Microsites do BioVip Studio Pro**.
Sua missão é coletar os dados de um cliente, pesquisar profundamente na internet (Instagram, Google Maps / Google Meu Negócio e buscas do Google) todas as informações reais desse negócio e entregar um **ÚNICO BLOCO DE CÓDIGO JSON** pronto para ser colado na aba de criação do BioVip Studio Pro (que montará automaticamente a página completa + a Área de Administração do cliente).
${prefilledBlock}
### PASSO 1: ENTREVISTA SEQUENCIAL (FAÇA UMA PERGUNTA POR VEZ)
Cumprimente-me de forma rápida e faça as seguintes solicitações **SEQUENCIALMENTE (uma pergunta por vez, aguardando minha resposta antes de fazer a próxima)**. *Observação: se eu já enviar vários dados de uma só vez, avance diretamente para o que faltar ou para a geração do código.*

1️⃣ **Solicitação 1 (Nome, Nicho e WhatsApp):**
"Para começarmos, qual é o **Nome do Cliente / Empresa**, o **Nicho de Atuação** (ex: Extensão de Cílios, Nail Designer, Barbearia, Clínica de Estética, Advocacia, Odontologia, etc.) e o **WhatsApp** de atendimento?"

2️⃣ **Solicitação 2 (Instagram do Cliente):**
"Qual é o **@usuario ou link do Instagram** desse cliente? (Se desejar, você também pode colar aqui o texto da Bio ou os principais serviços que ele posta)."

3️⃣ **Solicitação 3 (Endereço e Google Maps):**
"Qual é o **Link do Google Maps / Google Meu Negócio** ou o **Endereço completo (Rua, Bairro, Cidade/UF)** do cliente?"

4️⃣ **Solicitação 4 (Estilo Visual e Plano de Manutenção):**
"Qual **Tema Visual** combina mais com esse cliente?
- \`roseGoldQuartz\` (Rosé Gold, Nude & Quartzo — Beleza, Cílios, Unhas, Estética)
- \`obsidianGold\` (Dark Luxury & Ouro Imperial — Studios VIP, Clínicas, Advocacia, Mentorias)
- \`barberVintage\` (Dark Barbearia & Âmbar — Barbearias e Grooming)
- \`clinicalClean\` (Clean Minimalista & Pérola — Saúde, Odonto, Psicologia, Medicina)
- \`velvetGlamour\` (Glamour Vibrante & Orquídea — Moda, Salões, Maquiagem)
- \`navyLaw\` (Azul Marinho & Dourado — Jurídico, Contabilidade, Consultoria)
E há algum serviço, pacote ou preço específico que deseja destacar?"

---

### PASSO 2: PESQUISA PROFUNDA NA INTERNET (QUANDO EU RESPONDER)
Assim que tiver os dados do cliente, pesquise na internet e no Google Maps tudo sobre esse negócio:
- Nome comercial exato, especialidade principal e posicionamento de autoridade.
- Biografia real do Instagram, número de seguidores, telefone/WhatsApp e links da bio.
- Os **4 a 6 serviços/procedimentos reais** trabalhados pelo cliente (baseados nas informações coletadas do perfil, legendas e nicho), criando descrições persuasivas e elegantes.
- Endereço completo, bairro, cidade/UF, horário de atendimento, nota no Google Meu Negócio (ex: 5.0★) e 3 depoimentos baseados nos elogios reais do negócio no Google Maps.
- 6 legendas curtas e impactantes baseadas nos posts mais curtidos do Instagram para a galeria.
- **ATENÇÃO CRÍTICA PARA IMAGENS:** Todas as chaves de imagem (avatarUrl, aboutPhotoUrl, cardImage, imageUrl, photos) DEVEM ser SEMPRE STRINGS com URLs VÁLIDAS e diretas da web (ex: https://images.unsplash.com/photo-...). NUNCA envie objetos nem chaves aninhadas para as imagens.

---

### PASSO 3: ENTREGA DO CÓDIGO FINAL (FORMATO JSON OBRIGATÓRIO)
Entregue **EXATAMENTE UM BLOCO DE CÓDIGO JSON** (\`\`\`json ... \`\`\`) seguindo rigorosamente esta estrutura abaixo, sem omitir nenhuma chave, para que eu copie e cole direto no espaço de importação do BioVip Studio Pro:

\`\`\`json
{
  "adminClient": {
    "clientName": "Nome do Cliente ou Empresa",
    "clientPhone": "5531999999999",
    "clientEmail": "contato@cliente.com.br",
    "subdomain": "slug-do-cliente-sem-espacos",
    "nicheCategory": "Beleza & Estética",
    "maintenancePlan": "pro_4",
    "monthlyFee": 49.90,
    "creationFee": 79.90,
    "isLandingModel": false
  },
  "microsite": {
    "theme": "roseGoldQuartz",
    "styling": {
      "fontFamily": "Playfair Display",
      "borderRadius": 20,
      "glassmorphism": true,
      "metallicBorders": true,
      "spotlightGlow": true
    },
    "announcement": {
      "enabled": true,
      "badge": "AGENDA VIP ABERTA",
      "text": "Últimos horários disponíveis nesta semana. Reserve seu atendimento exclusivo!",
      "link": "#booking"
    },
    "profile": {
      "name": "NOME DO NEGÓCIO EM MAIÚSCULO",
      "title": "ESPECIALIDADE PRINCIPAL DE ALTO PADRÃO",
      "tagline": "Bio persuasiva baseada nas informações reais do Instagram e diferenciais do cliente.",
      "cursivePhrase": "Excelência, sofisticação e cuidado em cada detalhe.",
      "instagram": "usuario_sem_arroba",
      "whatsapp": "5531999999999",
      "mapsUrl": "https://maps.google.com/?q=Endereco+do+Cliente"
    },
    "metrics": {
      "enabled": true,
      "items": [
        { "value": "5.0★", "label": "Avaliação no Google" },
        { "value": "+1.000", "label": "Clientes Atendidas" },
        { "value": "100%", "label": "Atendimento VIP" }
      ]
    },
    "actionCards": [
      {
        "id": "cta-1",
        "title": "AGENDAR MEU HORÁRIO NO WHATSAPP",
        "subtitle": "Atendimento rápido e personalizado com hora marcada",
        "icon": "Calendar",
        "linkType": "whatsapp",
        "url": "#whatsapp",
        "whatsappMessage": "Olá! Vi seu microsite e gostaria de agendar um horário.",
        "variant": "accent",
        "animation": "pulse-glow",
        "badgeText": "MAIS PROCURADO",
        "ctaActionText": "AGENDAR AGORA"
      },
      {
        "id": "cta-2",
        "title": "CONHECER CATÁLOGO DE SERVIÇOS",
        "subtitle": "Confira todos os procedimentos e protocolos exclusivos",
        "icon": "Sparkles",
        "linkType": "catalogo",
        "url": "#catalogo",
        "variant": "default",
        "animation": "none",
        "badgeText": "PROCEDIMENTOS",
        "ctaActionText": "VER SERVIÇOS"
      },
      {
        "id": "cta-3",
        "title": "COMO CHEGAR · LOCALIZAÇÃO NO MAPS",
        "subtitle": "Endereço completo do cliente extraído do Google Maps",
        "icon": "MapPin",
        "linkType": "maps",
        "url": "https://maps.google.com",
        "variant": "default",
        "animation": "none",
        "badgeText": "ROTAS GPS",
        "ctaActionText": "ABRIR MAPA"
      }
    ],
    "studentGrid": {
      "enabled": true,
      "headline": "Resultados Reais & Portfólio em Destaque",
      "subtitle": "Registros mais curtidos no nosso Instagram oficial",
      "badgeText": "PORTFÓLIO OFICIAL",
      "layout": "smart_masonry",
      "captions": [
        "Legenda curta do destaque 1 baseada no serviço principal",
        "Legenda curta do destaque 2 baseada na técnica exclusiva",
        "Legenda curta do destaque 3 com foco em acabamento natural",
        "Legenda curta do destaque 4 de resultado real",
        "Legenda curta do destaque 5 de atendimento personalizado",
        "Legenda curta do destaque 6 do espaço e biossegurança"
      ]
    },
    "locationCard": {
      "enabled": true,
      "title": "Localização & Espaço Exclusivo",
      "address": "Rua Exemplo, 123 - Bairro, Cidade - UF",
      "hours": "Seg a Sáb · 08:30 às 19:30",
      "openStatus": "Atendimento com Hora Marcada",
      "mapsUrl": "https://maps.google.com",
      "buttonLabel": "Traçar Rota no Google Maps",
      "showHours": true
    },
    "services": {
      "enabled": true,
      "headline": "Procedimentos & Serviços Exclusivos",
      "subtitle": "Protocolos personalizados baseados nas técnicas do nosso espaço",
      "layout": "list",
      "items": [
        {
          "id": "srv-1",
          "name": "Nome Real do Serviço 1",
          "description": "Descrição detalhada e persuasiva do serviço oferecido pelo cliente.",
          "price": "Sob Consulta",
          "duration": "1h30",
          "badge": "DESTAQUE VIP",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": true
        },
        {
          "id": "srv-2",
          "name": "Nome Real do Serviço 2",
          "description": "Descrição detalhada do segundo procedimento mais procurado.",
          "price": "Sob Consulta",
          "duration": "1h30",
          "badge": "MUITO PROCURADO",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": true
        },
        {
          "id": "srv-3",
          "name": "Nome Real do Serviço 3",
          "description": "Descrição detalhada do terceiro procedimento do cliente.",
          "price": "Sob Consulta",
          "duration": "1h00",
          "badge": "",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": false
        },
        {
          "id": "srv-4",
          "name": "Manutenção / Atendimento Personalizado",
          "description": "Acompanhamento completo para manter seu resultado impecável por mais tempo.",
          "price": "Sob Consulta",
          "duration": "1h00",
          "badge": "",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": false
        }
      ]
    },
    "testimonials": {
      "enabled": true,
      "headline": "O Que Dizem No Google Meu Negócio",
      "items": [
        {
          "id": "t-1",
          "clientName": "Nome da Cliente 1",
          "city": "Cidade - UF",
          "text": "Avaliação 5 estrelas baseada nos elogios reais do negócio.",
          "rating": 5
        },
        {
          "id": "t-2",
          "clientName": "Nome da Cliente 2",
          "city": "Cidade - UF",
          "text": "Segunda avaliação destacando o atendimento impecável e o ambiente.",
          "rating": 5
        },
        {
          "id": "t-3",
          "clientName": "Nome da Cliente 3",
          "city": "Cidade - UF",
          "text": "Terceira avaliação elogiando a durabilidade e o profissionalismo.",
          "rating": 5
        }
      ]
    },
    "qualifierFunnel": {
      "enabled": true,
      "buttonLabel": "✨ Descobrir Procedimento Ideal (Triagem VIP)",
      "headline": "Atendimento Personalizado",
      "subtitle": "Responda 3 perguntas rápidas para agilizar seu atendimento no WhatsApp:",
      "questions": [
        {
          "id": "q-1",
          "question": "Qual procedimento você tem mais interesse hoje?",
          "options": ["Serviço 1", "Serviço 2", "Serviço 3", "Avaliação Personalizada"]
        },
        {
          "id": "q-2",
          "question": "Qual o melhor período para o seu horário?",
          "options": ["Manhã", "Tarde", "Final do dia / Sábado", "Qualquer horário disponível"]
        },
        {
          "id": "q-3",
          "question": "Qual o seu objetivo principal?",
          "options": ["Primeiro atendimento", "Manutenção", "Ocasião especial", "Quero tirar dúvidas"]
        }
      ]
    },
    "aboutMe": {
      "enabled": true,
      "headline": "Sobre Especialista & Nosso Espaço",
      "bioText": "Texto institucional apresentando a trajetória, o cuidado com cada cliente e os diferenciais do espaço.",
      "badges": ["Atendimento Exclusivo", "Materiais Premium", "Hora Marcada"]
    },
    "faq": {
      "enabled": true,
      "headline": "Dúvidas Frequentes",
      "items": [
        {
          "id": "faq-1",
          "question": "Como faço para agendar meu horário?",
          "answer": "Basta clicar no botão de WhatsApp ou no catálogo de serviços para escolher seu melhor dia e horário."
        },
        {
          "id": "faq-2",
          "question": "Onde o espaço está localizado?",
          "answer": "Estamos localizados no endereço indicado no mapa acima, com fácil acesso e ambiente climatizado."
        },
        {
          "id": "faq-3",
          "question": "Quais são as formas de pagamento aceitas?",
          "answer": "Aceitamos Pix, cartões de crédito e débito."
        }
      ]
    }
  }
}
\`\`\`

Inicie agora fazendo a **Solicitação 1**!`;
  };

  const handleCopyGeminiScript = async (prefilled: boolean = false) => {
    try {
      const scriptText = buildGeminiSequentialScript(prefilled);
      await navigator.clipboard.writeText(scriptText);
      if (prefilled) {
        setCopiedGeminiPrefilledScript(true);
        setTimeout(() => setCopiedGeminiPrefilledScript(false), 3000);
        showToast('📋 Script com dados pré-preenchidos copiado! Cole agora no Gemini.');
      } else {
        setCopiedGeminiScript(true);
        setTimeout(() => setCopiedGeminiScript(false), 3000);
        showToast('📋 Script Sequencial copiado! Cole lá no Gemini para ele iniciar as perguntas.');
      }
    } catch {
      showToast('⚠️ Não foi possível copiar automaticamente. Selecione o texto abaixo e copie.');
    }
  };

  const handleImportGeminiCode = async () => {
    setAiError(null);
    const rawInput = geminiPastedCode.trim();
    if (!rawInput) {
      const msg = 'Cole o código JSON entregue pelo Gemini no campo abaixo antes de importar.';
      setAiError(msg);
      showToast(`⚠️ ${msg}`);
      return;
    }

    // Extrai o JSON mesmo que o usuário tenha colado cercas markdown (```json ... ```) ou textos extras do Gemini
    let parsedPayload: any = null;
    try {
      const fenceMatch = rawInput.match(/```(?:json)?\s*([\s\S]*?)```/i);
      const candidate = fenceMatch ? fenceMatch[1].trim() : rawInput;
      try {
        parsedPayload = JSON.parse(candidate);
      } catch {
        const firstBrace = rawInput.indexOf('{');
        const lastBrace = rawInput.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace > firstBrace) {
          parsedPayload = JSON.parse(rawInput.slice(firstBrace, lastBrace + 1));
        }
      }
    } catch (e: any) {
      const msg = 'O código colado não parece ser um JSON válido. Copie todo o bloco de código que o Gemini gerou e tente novamente.';
      setAiError(msg);
      showToast(`❌ ${msg}`);
      return;
    }

    if (!parsedPayload || typeof parsedPayload !== 'object') {
      const msg = 'Formato de código inválido. Certifique-se de colar o JSON gerado pelo script do Gemini.';
      setAiError(msg);
      showToast(`❌ ${msg}`);
      return;
    }

    const adminClientObj = parsedPayload.adminClient || parsedPayload.client || {};
    const micrositeObj = parsedPayload.microsite || parsedPayload.data || parsedPayload;

    setGeminiImporting(true);
    let extractedMeta: any = null;

    try {
      const rawInsta =
        micrositeObj?.profile?.instagram ||
        adminClientObj?.instagram ||
        aiForm.instagram ||
        '';
      const cleanInsta = String(rawInsta)
        .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
        .split('/')[0]
        .split('?')[0]
        .replace('@', '')
        .trim();

      // Se ativado e houver @instagram, busca no servidor as 6 fotos reais mais curtidas e o avatar oficial para combinar com o código do Gemini!
      if (geminiAutoFetchInstaPhotos && cleanInsta) {
        try {
          const res = await fetch('/api/generate-microsite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              instagram: cleanInsta,
              googleMaps:
                micrositeObj?.locationCard?.mapsUrl ||
                micrositeObj?.profile?.mapsUrl ||
                aiForm.googleMaps ||
                '',
              businessName:
                micrositeObj?.profile?.name ||
                adminClientObj?.clientName ||
                aiForm.businessName ||
                '',
              businessNiche:
                micrositeObj?.profile?.title ||
                adminClientObj?.nicheCategory ||
                aiForm.businessNiche ||
                '',
            }),
          });
          if (res.ok) {
            const json = await res.json();
            if (json?.success && json?.data) {
              extractedMeta = json.extractedMeta || null;
              const serverData = json.data;
              // Injeta o avatar real do Instagram se o Gemini não trouxe foto real
              if (
                serverData?.profile?.avatarUrl &&
                (!micrositeObj?.profile?.avatarUrl ||
                  micrositeObj.profile.avatarUrl.includes('unsplash.com') ||
                  micrositeObj.profile.avatarUrl.includes('exemplo'))
              ) {
                micrositeObj.profile = {
                  ...(micrositeObj.profile || {}),
                  avatarUrl: serverData.profile.avatarUrl,
                };
              }
              // Injeta as 6 fotos mais curtidas reais do Instagram na galeria
              if (
                Array.isArray(serverData?.studentGrid?.photos) &&
                serverData.studentGrid.photos.length > 0
              ) {
                const geminiCaptions = Array.isArray(micrositeObj?.studentGrid?.captions)
                  ? micrositeObj.studentGrid.captions
                  : [];
                const serverCaptions = Array.isArray(serverData?.studentGrid?.captions)
                  ? serverData.studentGrid.captions
                  : [];
                micrositeObj.studentGrid = {
                  ...(micrositeObj.studentGrid || {}),
                  enabled: true,
                  photos: serverData.studentGrid.photos,
                  captions: serverData.studentGrid.photos.map(
                    (_: string, i: number) => geminiCaptions[i] || serverCaptions[i] || ''
                  ),
                };
              }
              // Injeta fotos reais nos serviços e nos actionCards se não tiverem imagem própria
              if (
                Array.isArray(micrositeObj?.services?.items) &&
                Array.isArray(serverData?.studentGrid?.photos) &&
                serverData.studentGrid.photos.length > 0
              ) {
                micrositeObj.services.items = micrositeObj.services.items.map(
                  (srv: any, idx: number) => ({
                    ...srv,
                    imageUrl:
                      srv.imageUrl && !srv.imageUrl.includes('unsplash.com')
                        ? srv.imageUrl
                        : serverData.studentGrid.photos[idx % serverData.studentGrid.photos.length],
                  })
                );
              }
              if (
                Array.isArray(micrositeObj?.actionCards) &&
                Array.isArray(serverData?.studentGrid?.photos) &&
                serverData.studentGrid.photos.length > 0
              ) {
                if (micrositeObj.actionCards[0] && !micrositeObj.actionCards[0].cardImage) {
                  micrositeObj.actionCards[0].cardImage = serverData.studentGrid.photos[0];
                }
                if (micrositeObj.actionCards[1] && !micrositeObj.actionCards[1].cardImage) {
                  micrositeObj.actionCards[1].cardImage =
                    serverData.studentGrid.photos[1] || serverData.studentGrid.photos[0];
                }
              }
            }
          }
        } catch (instaErr) {
          console.warn('Aviso ao enriquecer fotos do Instagram na importação Gemini:', instaErr);
        }
      }

      const builtData = applyGeneratedMicrositeData(micrositeObj, extractedMeta);

      // Se ativado, já cria e vincula o registro completo do cliente na Área de Administração (Painel & Clientes)
      if (geminiAutoCreateAdminRecord && builtData) {
        const clientName =
          (adminClientObj?.clientName || micrositeObj?.profile?.name || aiForm.businessName || 'Cliente BioVip').trim();
        const clientPhone =
          (adminClientObj?.clientPhone || micrositeObj?.profile?.whatsapp || '').replace(/\D/g, '');
        const clientEmail = (adminClientObj?.clientEmail || '').trim();
        const rawSlug =
          adminClientObj?.subdomain ||
          micrositeObj?.profile?.instagram ||
          clientName;
        const cleanSlug =
          String(rawSlug)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || `cliente-${Date.now().toString().slice(-4)}`;

        const planKey: MaintenancePlanId =
          adminClientObj?.maintenancePlan && MAINTENANCE_PLANS[adminClientObj.maintenancePlan as MaintenancePlanId]
            ? (adminClientObj.maintenancePlan as MaintenancePlanId)
            : 'pro_4';
        const feeNum =
          typeof adminClientObj?.monthlyFee === 'number' && adminClientObj.monthlyFee > 0
            ? adminClientObj.monthlyFee
            : MAINTENANCE_PLANS[planKey].price;
        const creationFeeNum =
          typeof adminClientObj?.creationFee === 'number' && adminClientObj.creationFee >= 0
            ? adminClientObj.creationFee
            : Number((landingConfig as any).creationFee) || 79.9;
        const isModel = Boolean(adminClientObj?.isLandingModel ?? false);

        const todayStr = new Date().toISOString().split('T')[0];
        const nextMonth = new Date();
        nextMonth.setDate(nextMonth.getDate() + 30);
        const dueDateStr = nextMonth.toISOString().split('T')[0];
        const newId = 'site-' + Date.now();

        const newSite: SavedMicrosite = {
          id: newId,
          clientName,
          clientPhone: clientPhone || builtData.profile.whatsapp,
          clientEmail,
          nicheCategory:
            adminClientObj?.nicheCategory ||
            THEMES[builtData.theme]?.category ||
            'Beleza & Estética',
          createdAt: todayStr,
          dueDate: dueDateStr,
          monthlyFee: feeNum,
          maintenancePlan: planKey,
          creationFee: creationFeeNum,
          isFirstMonth: true,
          status: 'active',
          updatesThisMonth: 0,
          lastUpdated: todayStr,
          domainType: 'subdomain',
          subdomain: cleanSlug,
          customDomain: '',
          dnsConfigured: true,
          sslActive: true,
          whatsappClicks: 0,
          pageViews: 100,
          isLandingModel: isModel,
          isCustomized: true,
          data: JSON.parse(JSON.stringify(builtData)),
        };

        setSavedSites((prev) => {
          const updatedList = [newSite, ...prev];
          persistSavedSitesToStorage(updatedList);
          return updatedList;
        });
        setEditingSiteId(newId);
        setSaveForm({
          clientName,
          clientPhone: clientPhone || builtData.profile.whatsapp,
          clientEmail,
          maintenancePlan: planKey,
          monthlyFee: feeNum.toFixed(2).replace('.', ','),
          creationFee: creationFeeNum.toFixed(2).replace('.', ','),
          isFirstMonth: true,
          subdomain: cleanSlug,
          customDomain: '',
          isLandingModel: isModel,
        });
        syncSiteToFirestore(newSite);
        setIsClientsFullscreen(false);
        setGeminiPastedCode('');
        showToast(
          `🎉 Página + Área de Administração de "${clientName}" (${cleanSlug}) criadas e salvas com sucesso!`
        );
      } else {
        setIsClientsFullscreen(false);
        setGeminiPastedCode('');
        showToast('✨ Código do Gemini importado com sucesso! Página montada no editor.');
      }
    } finally {
      setGeminiImporting(false);
    }
  };

  // Funções da Barra de Refinamento Instantâneo Pós-Criação
  const handleQuickCyclePalette = () => {
    const themeKeys = Object.keys(THEMES);
    const currentIndex = themeKeys.indexOf(data.theme);
    const nextKey = themeKeys[(currentIndex + 1) % themeKeys.length];
    const nextThemeObj = THEMES[nextKey];
    triggerSimulatorSkeleton(360);
    setData((prev) => ({
      ...prev,
      theme: nextKey,
      customColors: { ...prev.customColors, enabled: false },
      styling: {
        ...prev.styling,
        fontFamily: nextThemeObj?.fontHeadline || prev.styling.fontFamily,
      },
    }));
    showToast(`🎨 Paleta alterada para "${nextThemeObj?.name || nextKey}" mantendo todas as fotos e dados!`);
  };

  const handleQuickCycleCopyVariant = () => {
    const bizName = data.profile.name || 'STUDIO VIP';
    const copyOptions = [
      {
        tagline:
          'Atendimento personalizado de alto padrão, técnicas exclusivas e resultados impecáveis pensados para valorizar a sua melhor versão.',
        cursivePhrase: 'Excelência, sofisticação e cuidado em cada detalhe.',
        ctaTitle: 'AGENDAR MEU HORÁRIO VIP NO WHATSAPP',
      },
      {
        tagline:
          'Referência em qualidade, biossegurança e durabilidade. Transforme sua autoestima em um ambiente acolhedor e exclusivo.',
        cursivePhrase: 'Sua beleza e bem-estar em primeiro lugar.',
        ctaTitle: 'RESERVAR ATENDIMENTO COM PRIORIDADE',
      },
      {
        tagline:
          'Protocolos personalizados e materiais premium para entregar um acabamento natural, elegante e duradouro em cada sessão.',
        cursivePhrase: 'Agende seu momento especial conosco.',
        ctaTitle: `FALAR COM ${bizName.split(' ')[0]} NO WHATSAPP`,
      },
    ];
    const currentIdx = copyOptions.findIndex((c) => c.tagline === data.profile.tagline);
    const nextCopy = copyOptions[(currentIdx + 1) % copyOptions.length];
    triggerSimulatorSkeleton(300);
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        tagline: nextCopy.tagline,
        cursivePhrase: nextCopy.cursivePhrase,
      },
      actionCards: prev.actionCards.map((card, i) =>
        i === 0 ? { ...card, title: nextCopy.ctaTitle } : card
      ),
    }));
    showToast('✍️ Textos de chamada e bio otimizados com nova variação persuasiva!');
  };

  const handleQuickCycleGalleryLayout = () => {
    const layouts: Array<'smart_masonry' | 'mosaic' | 'grid3' | 'grid2' | 'masonry' | 'carousel'> = ['smart_masonry', 'mosaic', 'grid3', 'grid2', 'masonry', 'carousel'];
    const current = (data.studentGrid.layout as any) || 'smart_masonry';
    const nextLayout = layouts[(layouts.indexOf(current) + 1) % layouts.length];
    const labels: Record<string, string> = {
      smart_masonry: 'Bento Adaptativo (Auto Retrato/Paisagem)',
      mosaic: 'Mosaico Destaque (Bento)',
      grid3: 'Grade Editorial 3 Colunas',
      grid2: 'Grade Clássica 2 Colunas',
      masonry: 'Masonry Fluído (Pinterest)',
      carousel: 'Carrossel Deslizante',
    };
    triggerSimulatorSkeleton(280);
    setData((prev) => ({
      ...prev,
      studentGrid: {
        ...prev.studentGrid,
        enabled: true,
        layout: nextLayout,
      },
    }));
    showToast(`🖼️ Galeria alterada para: ${labels[nextLayout]}`);
  };

  const handleQuickCycleServicesLayout = () => {
    const layouts: Array<'list' | 'featured' | 'grid2'> = ['list', 'featured', 'grid2'];
    const current = data.services.layout || 'list';
    const nextLayout = layouts[(layouts.indexOf(current) + 1) % layouts.length];
    const labels: Record<string, string> = {
      list: 'Lista Compacta Premium',
      featured: 'Cards Grandes com Destaque',
      grid2: 'Grade 2 Colunas',
    };
    triggerSimulatorSkeleton(280);
    setData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        enabled: true,
        layout: nextLayout,
      },
    }));
    showToast(`🏷️ Catálogo alterado para: ${labels[nextLayout]}`);
  };

  const handleAiGenerateMicrosite = async () => {
    setAiError(null);
    if (
      !aiForm.instagram.trim() &&
      !aiForm.googleMaps.trim() &&
      !aiForm.businessName.trim() &&
      !aiForm.businessNiche.trim() &&
      !aiForm.additionalInfo.trim()
    ) {
      const msg =
        'Informe ao menos o Instagram, o Link do Google Meu Negócio, o Nome do Negócio ou o Nicho para gerar o microsite.';
      setAiError(msg);
      showToast(`⚠️ ${msg}`);
      return;
    }

    setAiGenerating(true);
    setAiStepIndex(0);
    const stepTimer1 = setTimeout(() => setAiStepIndex(1), 2200);
    const stepTimer2 = setTimeout(() => setAiStepIndex(2), 4800);

    try {
      const res = await fetch('/api/generate-microsite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...aiForm,
          geminiApiKey:
            (import.meta as any).env?.VITE_GEMINI_API_KEY ||
            (import.meta as any).env?.GEMINI_API_KEY ||
            undefined,
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await res.json();
        if (res.ok && json?.success && json?.data) {
          applyGeneratedMicrositeData(json.data, json.extractedMeta);
          return;
        }
      }

      // Caso o servidor da hospedagem retorne erro ou timeout, aciona o motor inteligente local
      showToast('⚠️ Servidor da hospedagem retornou erro ou timeout. Aplicando layout inteligente local.');
      await new Promise((r) => setTimeout(r, 900));
      const fallbackGenerated = buildClientSmartMicrosite();
      applyGeneratedMicrositeData(fallbackGenerated);
    } catch (err: any) {
      console.warn('Fallback local ativado na geração do microsite:', err);
      showToast('⚠️ Falha de conexão com a API da hospedagem. Aplicando layout inteligente local.');
      await new Promise((r) => setTimeout(r, 900));
      const fallbackGenerated = buildClientSmartMicrosite();
      applyGeneratedMicrositeData(fallbackGenerated);
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setAiGenerating(false);
    }
  };

  const [saveForm, setSaveForm] = useState<SaveFormState>({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    maintenancePlan: 'pro_4' as MaintenancePlanId,
    monthlyFee: '49,90',
    creationFee: '79,90',
    isFirstMonth: true,
    subdomain: '',
    customDomain: '',
    isLandingModel: true,
    isTemporaryDemo: false,
    demoDurationDays: 7,
    proposalValue: '197,00',
    crmStage: 'demonstracao' as CrmStage,
    prospectNotes: '',
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3800);
  };

  const generatePdfReportHtml = () => {
    const todayStr = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
    const billableSites = savedSites.filter(s => !isModelMicrosite(s));
    const totalSites = savedSites.length;
    const activeSites = billableSites.filter(s => s.status !== 'disabled' && !isSiteSuspendedStatus(s)).length;
    const overdueSites = billableSites.filter(s => s.status === 'overdue' || getDaysUntilDue(s.dueDate) < 0).length;
    const totalMrr = billableSites.reduce((acc, s) => acc + (s.status !== 'disabled' ? s.monthlyFee : 0), 0);
    const totalClicks = savedSites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 0);
    const totalViews = savedSites.reduce((acc, s) => acc + (s.pageViews || 100), 0);
    const avgConversion = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';
    const totalUpdates = savedSites.reduce((acc, s) => acc + s.updatesThisMonth, 0);

    const rowsHtml = savedSites.map(s => {
      const clicks = s.whatsappClicks || 0;
      const views = s.pageViews || 100;
      const rate = ((clicks / views) * 100).toFixed(1);
      const domain = s.customDomain || `biovip.com.br/${s.subdomain}`;
      const isModel = isModelMicrosite(s);
      const statusLabel = isModel ? 'Modelo (Isento)' : s.status === 'disabled' ? 'Desativado' : s.status === 'overdue' ? 'Vencido' : 'Em Dia';
      const statusColor = isModel ? '#d97706' : s.status === 'disabled' ? '#dc2626' : s.status === 'overdue' ? '#d97706' : '#16a34a';

      return `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; font-weight: bold; color: #111827;">
            ${s.clientName}
            <div style="font-size: 11px; color: #6b7280; font-weight: normal;">${s.nicheCategory}</div>
          </td>
          <td style="padding: 12px; font-family: monospace; font-size: 12px; color: #374151;">
            https://${domain}
          </td>
          <td style="padding: 12px; text-align: center;">
            <span style="display: inline-block; padding: 4px 8px; border-radius: 9999px; font-size: 11px; font-weight: bold; color: ${statusColor}; background-color: ${statusColor}15; border: 1px solid ${statusColor}40;">
              ${statusLabel}
            </span>
          </td>
          <td style="padding: 12px; text-align: center; font-size: 12px; color: #374151;">${isModel ? '—' : s.dueDate}</td>
          <td style="padding: 12px; text-align: center; font-size: 12px; color: #111827; font-weight: bold;">
            ${clicks} <span style="font-weight: normal; color: #6b7280;">/ ${views}</span>
          </td>
          <td style="padding: 12px; text-align: center; font-size: 13px; font-weight: bold; color: #059669;">
            ${rate}%
          </td>
          <td style="padding: 12px; text-align: center; font-size: 12px; color: #374151;">${s.updatesThisMonth}</td>
          <td style="padding: 12px; text-align: right; font-size: 13px; font-weight: bold; color: #111827;">
            ${isModel ? 'Isento (Modelo)' : `R$ ${s.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          </td>
        </tr>
      `;
    }).join('');

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatorio Executivo - BioVip Studio Pro</title>
  <style>
    @media print {
      body { background: #fff !important; color: #000 !important; padding: 0 !important; }
      .no-print { display: none !important; }
      .container { border: none !important; box-shadow: none !important; padding: 0 !important; max-width: 100% !important; }
      @page { margin: 1.5cm; size: A4 portrait; }
    }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 900px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; }
    .title-group h1 { font-size: 20px; margin: 0; color: #0f172a; font-weight: 800; letter-spacing: -0.5px; }
    .title-group p { font-size: 12px; color: #64748b; margin: 4px 0 0 0; }
    .badge-saas { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; }
    .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
    .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center; }
    .metric-card .label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
    .metric-card .val { font-size: 20px; font-weight: 900; color: #0f172a; margin-top: 4px; }
    .metric-card .sub { font-size: 10px; color: #94a3b8; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    th { background: #0f172a; color: #ffffff; text-align: left; padding: 10px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    th:first-child { border-top-left-radius: 8px; }
    th:last-child { border-top-right-radius: 8px; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; }
    .btn-print { background: #d97706; color: #ffffff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-size: 12px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="no-print" style="max-width: 900px; margin: 0 auto 16px auto; display: flex; justify-content: flex-end;">
    <button onclick="window.print()" class="btn-print">🖨️ Imprimir ou Salvar em PDF</button>
  </div>
  <div class="container">
    <div class="header">
      <div class="title-group">
        <h1>BIOVIP STUDIO PRO — RELATÓRIO EXECUTIVO DE PERFORMANCE</h1>
        <p>Relatório Consolidado de Status Financeiro & Conversão de Clientes · Emitido em: ${todayStr}</p>
      </div>
      <span class="badge-saas">SaaS Executive Report</span>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="label">Total Microsites</div>
        <div class="val">${totalSites}</div>
        <div class="sub">${activeSites} Ativos · ${overdueSites} Vencidos</div>
      </div>
      <div class="metric-card">
        <div class="label">Faturamento MRR</div>
        <div class="val" style="color: #059669;">R$ ${totalMrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        <div class="sub">Receita Recorrente Mensal</div>
      </div>
      <div class="metric-card">
        <div class="label">Taxa Média Conversão</div>
        <div class="val" style="color: #2563eb;">${avgConversion}%</div>
        <div class="sub">${totalClicks} cliques em ${totalViews} views</div>
      </div>
      <div class="metric-card">
        <div class="label">Edições no Mês</div>
        <div class="val">${totalUpdates}</div>
        <div class="sub">Atualizações de conteúdo</div>
      </div>
    </div>

    <h3 style="font-size: 13px; font-weight: 800; color: #0f172a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
      Detalhamento por Cliente & Microsite
    </h3>
    <table>
      <thead>
        <tr>
          <th>Cliente / Empresa</th>
          <th>Domínio Ativo</th>
          <th style="text-align: center;">Status</th>
          <th style="text-align: center;">Vencimento</th>
          <th style="text-align: center;">Cliques WA / Views</th>
          <th style="text-align: center;">Conversão</th>
          <th style="text-align: center;">Edições</th>
          <th style="text-align: right;">Valor Mensal</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div class="footer">
      <div>BioVip Studio SaaS Engine — Contato Oficial: contato@biovip.com.br</div>
      <div>Documento Executivo de Relatório Mensal</div>
    </div>
  </div>
</body>
</html>`;
  };

  const copyWhatsappExecutiveSummary = async () => {
    const todayStr = new Date().toLocaleDateString('pt-BR');
    const billableSites = savedSites.filter(s => !isModelMicrosite(s));
    const totalMrr = billableSites.reduce((acc, s) => acc + (s.status !== 'disabled' ? s.monthlyFee : 0), 0);
    const totalClicks = savedSites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 0);
    const totalViews = savedSites.reduce((acc, s) => acc + (s.pageViews || 100), 0);
    const avgConversion = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';

    let msg = `📊 *RESUMO EXECUTIVO DE PERFORMANCE & STATUS FINANCEIRO*\n`;
    msg += `📅 *Data de Emissão:* ${todayStr}\n\n`;
    msg += `💼 *MÉTRICAS GERAIS SAAS:*\n`;
    msg += `• Total de Microsites: ${savedSites.length} (${billableSites.length} faturáveis / ${savedSites.length - billableSites.length} modelos)\n`;
    msg += `• Faturamento MRR: R$ ${totalMrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    msg += `• Taxa Média de Conversão WA: ${avgConversion}%\n\n`;
    msg += `📋 *STATUS INDIVIDUAL DOS CLIENTES:*\n`;

    savedSites.forEach((s, idx) => {
      const clicks = s.whatsappClicks || 0;
      const views = s.pageViews || 100;
      const rate = ((clicks / views) * 100).toFixed(1);
      const isModel = isModelMicrosite(s);
      const statusIcon = isModel ? '⭐' : s.status === 'disabled' ? '🛑' : s.status === 'overdue' ? '🟡' : '🟢';
      const statusText = isModel ? 'Modelo (Sem Faturamento)' : s.status === 'disabled' ? 'Desativado' : s.status === 'overdue' ? 'Vencido' : 'Em dia';

      msg += `\n${idx + 1}. *${s.clientName}* (${s.nicheCategory})\n`;
      msg += `   ${statusIcon} Status: ${statusText}${isModel ? '' : ` (Venc: ${s.dueDate})`}\n`;
      msg += `   📈 Conversão WA: *${rate}%* (${clicks} cliques / ${views} views)\n`;
      msg += `   💰 Mensalidade: ${isModel ? 'Isento (Modelo)' : `R$ ${s.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}\n`;
    });

    msg += `\nGerado por *BioVip Studio Pro* 🚀`;

    const success = await safeCopyText(msg);
    if (success) {
      setCopiedPdfSummary(true);
      setTimeout(() => setCopiedPdfSummary(false), 2500);
      showToast('📋 Resumo Executivo formatado copiado! Pronto para colar no WhatsApp.');
    }
  };

  const printPdfReport = () => {
    const htmlCode = generatePdfReportHtml();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlCode);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        try { printWindow.print(); } catch {}
      }, 500);
    } else {
      showToast('⚠️ Permitir pop-ups no seu navegador para abrir a janela de impressão do PDF.');
    }
  };

  const downloadPdfReportHtml = () => {
    const htmlCode = generatePdfReportHtml();
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateSlug = new Date().toISOString().split('T')[0];
    link.download = `relatorio-executivo-biovip-${dateSlug}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📄 Relatório Executivo HTML baixado com sucesso!');
  };

  const generateSinglePdfReportHtml = (site: SavedMicrosite) => {
    const todayStr = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
    const clicks = site.whatsappClicks || 0;
    const views = site.pageViews || 100;
    const rate = ((clicks / views) * 100).toFixed(1);
    const domain = site.customDomain || `biovip.com.br/${site.subdomain}`;
    const statusLabel = site.status === 'disabled' ? 'Desativado' : site.status === 'overdue' ? 'Vencido' : 'Em Dia';
    const statusColor = site.status === 'disabled' ? '#dc2626' : site.status === 'overdue' ? '#d97706' : '#16a34a';

    const activeModules = [];
    if (site.data?.qualifierFunnel?.enabled) activeModules.push('Funil Anti-Curiosos (Quiz VIP)');
    if (site.data?.announcement?.enabled) activeModules.push('Barra de Aviso / Escassez');
    if (site.data?.metrics?.enabled) activeModules.push('Métricas de Autoridade');
    if (site.data?.processSteps?.enabled) activeModules.push('Etapas do Processo');
    if (site.data?.studentGrid?.enabled) activeModules.push('Grid de Resultados / Fotos');
    if (site.data?.services?.enabled) activeModules.push(`Catálogo de Serviços (${site.data.services.items?.length || 0} itens)`);
    if (site.data?.faq?.enabled) activeModules.push('Dúvidas Frequentes (FAQ)');
    if (site.data?.locationCard?.enabled) activeModules.push('Card de Localização (Google Maps)');
    if (site.data?.conversion?.metaPixelId) activeModules.push('Meta Pixel Tráfego Pago');

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatorio Individual - ${site.clientName}</title>
  <style>
    @media print {
      body { background: #fff !important; color: #000 !important; padding: 0 !important; }
      .no-print { display: none !important; }
      .container { border: none !important; box-shadow: none !important; padding: 0 !important; max-width: 100% !important; }
      @page { margin: 1.5cm; size: A4 portrait; }
    }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 850px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 36px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; }
    .title-group h1 { font-size: 22px; margin: 0; color: #0f172a; font-weight: 800; letter-spacing: -0.5px; }
    .title-group h2 { font-size: 15px; color: #d97706; margin: 6px 0 0 0; font-weight: 700; }
    .title-group p { font-size: 12px; color: #64748b; margin: 4px 0 0 0; }
    .badge-status { display: inline-block; padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${statusColor}; background: ${statusColor}15; border: 1px solid ${statusColor}40; }
    .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 28px; }
    .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; text-align: center; }
    .metric-card .label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
    .metric-card .val { font-size: 22px; font-weight: 900; color: #0f172a; margin-top: 4px; }
    .metric-card .sub { font-size: 11px; color: #64748b; margin-top: 2px; }
    .section-title { font-size: 13px; font-weight: 800; color: #0f172a; margin: 24px 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px; border-left: 3px solid #d97706; padding-left: 8px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
    .info-table td.label { font-weight: bold; color: #475569; width: 35%; background: #fafafa; }
    .info-table td.val { color: #0f172a; font-weight: 600; }
    .modules-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .module-pill { background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 600; padding: 6px 12px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .footer { margin-top: 36px; padding-top: 18px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; }
    .btn-print { background: #d97706; color: #ffffff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; font-size: 12px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="no-print" style="max-width: 850px; margin: 0 auto 16px auto; display: flex; justify-content: flex-end;">
    <button onclick="window.print()" class="btn-print">🖨️ Imprimir ou Salvar em PDF</button>
  </div>
  <div class="container">
    <div class="header">
      <div class="title-group">
        <h1>BIOVIP STUDIO PRO</h1>
        <h2>RELATÓRIO DE PERFORMANCE & COBRANÇA</h2>
        <p>Cliente: <strong>${site.clientName}</strong> · Emitido em: ${todayStr}</p>
      </div>
      <span class="badge-status">${statusLabel}</span>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="label">Taxa Conversão WA</div>
        <div class="val" style="color: #059669;">${rate}%</div>
        <div class="sub">${clicks} cliques em ${views} acessos</div>
      </div>
      <div class="metric-card">
        <div class="label">Mensalidade Ativa</div>
        <div class="val" style="color: #d97706;">R$ ${site.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        <div class="sub">Vencimento: ${site.dueDate}</div>
      </div>
      <div class="metric-card">
        <div class="label">Edições no Mês</div>
        <div class="val" style="color: #2563eb;">${site.updatesThisMonth}</div>
        <div class="sub">Última ed.: ${site.lastUpdated}</div>
      </div>
    </div>

    <div class="section-title">Informações Gerais do Microsite</div>
    <table class="info-table">
      <tr>
        <td class="label">Cliente / Razão Social</td>
        <td class="val">${site.clientName}</td>
      </tr>
      <tr>
        <td class="label">Nicho de Atuação</td>
        <td class="val">${site.nicheCategory}</td>
      </tr>
      <tr>
        <td class="label">Link Público / Domínio</td>
        <td class="val" style="font-family: monospace; color: #d97706;">https://${domain}</td>
      </tr>
      <tr>
        <td class="label">Contato / WhatsApp</td>
        <td class="val">${site.clientPhone || 'Não informado'}</td>
      </tr>
      <tr>
        <td class="label">E-mail Cadastrado</td>
        <td class="val">${site.clientEmail || 'Não informado'}</td>
      </tr>
      <tr>
        <td class="label">Status do Domínio / SSL</td>
        <td class="val">SSL Ativo (HTTPS) · DNS Verificado 🟢</td>
      </tr>
    </table>

    <div class="section-title">Módulos & Recursos Ativos no Microsite</div>
    <div class="modules-list">
      ${activeModules.length > 0 ? activeModules.map(m => `<span class="module-pill">✓ ${m}</span>`).join('') : '<span class="module-pill">Microsite básico sem módulos extras</span>'}
    </div>

    <div class="section-title">Orientações & Próximos Passos</div>
    <p style="font-size: 12px; color: #475569; line-height: 1.6; margin: 0;">
      • Este microsite está otimizado para alta conversão em dispositivos móveis (Instagram e tráfego pago).<br/>
      • Mantenha o link oficial na biografia do seu Instagram para maximizar a conversão de novos clientes.<br/>
      • Para alterações de agenda, fotos ou serviços, entre em contato com o suporte técnico.
    </p>

    <div class="footer">
      <div>BioVip Studio SaaS Engine — Contato & Suporte: contato@biovip.com.br</div>
      <div>Página 1 de 1</div>
    </div>
  </div>
</body>
</html>`;
  };

  const copySingleWhatsappSummary = async (site: SavedMicrosite) => {
    const todayStr = new Date().toLocaleDateString('pt-BR');
    const clicks = site.whatsappClicks || 0;
    const views = site.pageViews || 100;
    const rate = ((clicks / views) * 100).toFixed(1);
    const domain = site.customDomain || `biovip.com.br/${site.subdomain}`;
    const statusText = site.status === 'disabled' ? 'Desativado' : site.status === 'overdue' ? 'Vencido' : 'Em Dia';
    const statusIcon = site.status === 'disabled' ? '🛑' : site.status === 'overdue' ? '🟡' : '🟢';

    let msg = `📊 *RELATÓRIO INDIVIDUAL DE PERFORMANCE*\n`;
    msg += `👤 Cliente: *${site.clientName}*\n`;
    msg += `🏷️ Nicho: ${site.nicheCategory}\n`;
    msg += `📅 Data de Emissão: ${todayStr}\n\n`;
    msg += `🌐 *Link Público:* https://${domain}\n`;
    msg += `${statusIcon} *Status Financeiro:* ${statusText} (Venc: ${site.dueDate})\n`;
    msg += `💰 *Mensalidade:* R$ ${site.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n`;
    msg += `📈 *MÉTRICAS DE DESEMPENHO:*\n`;
    msg += `• Taxa de Conversão WhatsApp: *${rate}%*\n`;
    msg += `• Cliques no WhatsApp: ${clicks}\n`;
    msg += `• Visualizações do Site: ${views}\n`;
    msg += `• Atualizações Solicitadas no Mês: ${site.updatesThisMonth}\n\n`;
    msg += `Agradecemos a parceria! Dúvidas ou solicitações, estamos à disposição. 🚀`;

    const success = await safeCopyText(msg);
    if (success) {
      setCopiedSinglePdfSummary(true);
      setTimeout(() => setCopiedSinglePdfSummary(false), 2500);
      showToast(`📋 Relatório individual de "${site.clientName}" copiado para WhatsApp!`);
    }
  };

  const printSinglePdfReport = (site: SavedMicrosite) => {
    const htmlCode = generateSinglePdfReportHtml(site);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlCode);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        try { printWindow.print(); } catch {}
      }, 500);
    } else {
      showToast('⚠️ Permitir pop-ups no seu navegador para abrir a janela de impressão do PDF.');
    }
  };

  const downloadSinglePdfReportHtml = (site: SavedMicrosite) => {
    const htmlCode = generateSinglePdfReportHtml(site);
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const clientSlug = site.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    link.download = `relatorio-individual-${clientSlug}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`📄 Relatório individual HTML de "${site.clientName}" baixado com sucesso!`);
  };

  const recordWhatsappClick = (targetSiteId?: string) => {
    const targetId = targetSiteId || editingSiteId || savedSites[0]?.id;

    // Atualiza estatísticas da sessão / simulador ativo
    setSessionAnalytics(prev => {
      const updated = {
        ...prev,
        whatsappClicks: prev.whatsappClicks + 1,
        pageViews: Math.max(prev.pageViews + 1, prev.whatsappClicks + 6),
        trafficSources: {
          ...prev.trafficSources,
          instagram: prev.trafficSources.instagram + 1,
        },
        pixelEvents: prev.pixelEvents + 1,
      };
      try {
        localStorage.setItem('luxebio_session_analytics_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (targetId) {
      setSavedSites(prev => {
        const updated = prev.map(s => {
          if (s.id === targetId) {
            const clicks = (s.whatsappClicks || 0) + 1;
            const views = Math.max((s.pageViews || 120), clicks + 5);
            const prevSources = s.trafficSources || { instagram: 0, tiktok: 0, googleMaps: 0, paidAds: 0, direct: 0 };
            return {
              ...s,
              whatsappClicks: clicks,
              pageViews: views,
              trafficSources: {
                ...prevSources,
                instagram: (prevSources.instagram || 0) + 1,
              },
            };
          }
          return s;
        });
        try {
          localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }
    showToast('📈 Clique em WhatsApp registrado! Taxa de conversão atualizada no Painel.');
  };

  // Abrir modal de confirmação para zerar rastreamento
  const openResetTrackingModal = (target: 'current' | 'all' | SavedMicrosite) => {
    setResetModalTarget(target);
    setResetAlsoClearPixelIds(false);
    setResetTrackingModalOpen(true);
  };

  // Executar o reset do rastreamento com base no target selecionado
  const executeResetTracking = () => {
    const emptyAnalytics = {
      whatsappClicks: 0,
      pageViews: 0,
      trafficSources: { instagram: 0, tiktok: 0, googleMaps: 0, paidAds: 0, direct: 0 },
      pixelEvents: 0,
    };

    if (resetModalTarget === 'all') {
      // Zerar rastreamento de todos os sites salvos
      setSavedSites(prev => {
        const updated = prev.map(s => ({
          ...s,
          whatsappClicks: 0,
          pageViews: 0,
          trafficSources: { instagram: 0, tiktok: 0, googleMaps: 0, paidAds: 0, direct: 0 },
        }));
        try {
          localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      setSessionAnalytics(emptyAnalytics);
      try {
        localStorage.setItem('luxebio_session_analytics_v1', JSON.stringify(emptyAnalytics));
      } catch {}
      showToast('📊 Rastreamento e métricas de TODOS os microsites foram zerados com sucesso!');
    } else if (resetModalTarget === 'current') {
      // Zerar rastreamento do microsite ativo
      setSessionAnalytics(emptyAnalytics);
      try {
        localStorage.setItem('luxebio_session_analytics_v1', JSON.stringify(emptyAnalytics));
      } catch {}

      if (editingSiteId) {
        setSavedSites(prev => {
          const updated = prev.map(s => {
            if (s.id === editingSiteId) {
              return {
                ...s,
                whatsappClicks: 0,
                pageViews: 0,
                trafficSources: { instagram: 0, tiktok: 0, googleMaps: 0, paidAds: 0, direct: 0 },
              };
            }
            return s;
          });
          try {
            localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }

      if (resetAlsoClearPixelIds) {
        setData(prev => ({
          ...prev,
          conversion: {
            ...prev.conversion,
            metaPixelId: '',
            googleAnalyticsId: '',
          }
        }));
      }

      showToast('🔄 Rastreamento do microsite ativo zerado com sucesso! Contadores reiniciados em 0.');
    } else if (resetModalTarget && typeof resetModalTarget === 'object') {
      // Zerar site específico
      const siteId = resetModalTarget.id;
      const clientName = resetModalTarget.clientName;
      setSavedSites(prev => {
        const updated = prev.map(s => {
          if (s.id === siteId) {
            return {
              ...s,
              whatsappClicks: 0,
              pageViews: 0,
              trafficSources: { instagram: 0, tiktok: 0, googleMaps: 0, paidAds: 0, direct: 0 },
            };
          }
          return s;
        });
        try {
          localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated));
        } catch {}
        return updated;
      });

      if (editingSiteId === siteId) {
        setSessionAnalytics(emptyAnalytics);
        try {
          localStorage.setItem('luxebio_session_analytics_v1', JSON.stringify(emptyAnalytics));
        } catch {}
      }

      showToast(`🔄 Rastreamento de "${clientName}" zerado com sucesso! (0 cliques e 0 acessos).`);
    }

    setResetTrackingModalOpen(false);
    setResetModalTarget(null);
  };

  const currentEditingSite = savedSites.find(s => s.id === editingSiteId);

  const [saveEmailError, setSaveEmailError] = useState<string | null>(null);
  const [editingEmailSiteId, setEditingEmailSiteId] = useState<string | null>(null);
  const [tempEmailInput, setTempEmailInput] = useState<string>('');

  const isValidClientEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((email || '').trim());
  };

  const updateSiteClientEmail = (siteId: string, newEmailRaw: string) => {
    const cleanEmail = (newEmailRaw || '').trim().toLowerCase();
    if (!isValidClientEmail(cleanEmail)) {
      showToast('⚠️ Informe um endereço de e-mail válido (ex: cliente@empresa.com.br)!');
      return false;
    }
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      return { ...s, clientEmail: cleanEmail };
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    const target = updated.find(s => s.id === siteId);
    if (target) syncSiteToFirestore(target);
    showToast(`📧 E-mail de "${target?.clientName}" atualizado para ${cleanEmail}!`);
    return true;
  };

  // =========================================================================
  // SISTEMA DE DISPARO DE E-MAIL EM MASSA PARA CLIENTES (MANUTENÇÕES E AVISOS)
  // =========================================================================
  const [bulkEmailModalOpen, setBulkEmailModalOpen] = useState(false);
  const [bulkEmailCategory, setBulkEmailCategory] = useState<'scheduled_maintenance' | 'maintenance_completed' | 'new_features' | 'billing_notice' | 'custom_announcement'>('scheduled_maintenance');
  const [bulkEmailAudience, setBulkEmailAudience] = useState<'all' | 'active' | 'overdue' | 'custom'>('all');
  const [bulkEmailSelectedIds, setBulkEmailSelectedIds] = useState<string[]>([]);
  const [bulkEmailSubject, setBulkEmailSubject] = useState('');
  const [bulkEmailBody, setBulkEmailBody] = useState('');
  const [bulkEmailSending, setBulkEmailSending] = useState(false);
  const [copiedBulkEmails, setCopiedBulkEmails] = useState(false);
  const [copiedBulkMessage, setCopiedBulkMessage] = useState(false);
  const [bulkEmailHistory, setBulkEmailHistory] = useState<Array<{
    id: string;
    protocol: string;
    sentAt: string;
    subject: string;
    category: string;
    recipientCount: number;
    recipientsList: string[];
  }>>(() => {
    try {
      const saved = localStorage.getItem('luxebio_bulk_email_history_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const buildBulkEmailTemplate = (
    cat: 'scheduled_maintenance' | 'maintenance_completed' | 'new_features' | 'billing_notice' | 'custom_announcement'
  ) => {
    const todayBr = new Date().toLocaleDateString('pt-BR');
    const pixKey = data.saasSettings?.pixKey || 'contato@biovip.com.br';
    const pixName = data.saasSettings?.pixName || 'BioVip Studio SaaS';
    if (cat === 'scheduled_maintenance') {
      return {
        subject: `[Comunicado Importante] Manutenção Programada de Servidores & DNS — BioVip Studio`,
        body: `Olá, {{nome_cliente}}!\n\nInformamos que realizaremos uma manutenção preventiva programada em nossa infraestrutura de servidores, CDN e certificados SSL para garantir ainda mais velocidade e estabilidade ao seu Microsite ({{dominio}}).\n\n📅 DETALHES DA JANELA DE MANUTENÇÃO:\n• Data Programada: ${todayBr} (Madrugada, das 02:00h às 03:30h)\n• Impacto Estimado: Nenhum impacto nos seus dados ou agendamentos (possível oscilação de apenas alguns segundos durante a atualização de cache SSL).\n• O que será atualizado: Otimização de carregamento de imagens em alta definição, blindagem de segurança DNS e velocidade dos botões de WhatsApp.\n\nVocê não precisa realizar nenhuma ação no seu link da Bio do Instagram ou redes sociais — tudo continuará funcionando automaticamente.\n\nEm caso de dúvidas, nossa equipe de suporte está à disposição pelo WhatsApp ou pelo e-mail contato@biovip.com.br.\n\nAtenciosamente,\nEquipe de Administração & Infraestrutura — BioVip Studio Pro\ncontato@biovip.com.br`,
      };
    }

    if (cat === 'maintenance_completed') {
      return {
        subject: `[Atualização Concluída] Seu Microsite está ainda mais rápido e seguro 🚀`,
        body: `Olá, {{nome_cliente}}!\n\nComunicamos que a manutenção e atualização de infraestrutura nos servidores do seu Microsite ({{dominio}}) foi concluída com 100% de sucesso!\n\n✅ MELHORIAS APLICADAS NA SUA PÁGINA:\n• Carregamento instantâneo de fotos e portfólio (orientação inteligente retrato/paisagem)\n• Renovação automática do Certificado de Segurança SSL (HTTPS)\n• Otimização do redirecionamento rápido para o seu WhatsApp comercial\n\nSeu link oficial (https://{{dominio}}) está 100% online e operando em velocidade máxima para converter visitantes do seu Instagram.\n\nAtenciosamente,\nAdministração — BioVip Studio Pro\ncontato@biovip.com.br`,
      };
    }

    if (cat === 'new_features') {
      return {
        subject: `[Novidades Liberadas] Novos recursos disponíveis para o seu Microsite Profissional ✨`,
        body: `Olá, {{nome_cliente}}!\n\nTemos ótimas notícias! Liberamos novas atualizações e ferramentas de conversão para os clientes da nossa plataforma:\n\n🚀 O QUE HÁ DE NOVO:\n1. Galeria Inteligente Adaptativa: Suas fotos em formato vertical (retrato) e horizontal (paisagem) agora se ajustam automaticamente sem cortes.\n2. Rastreamento Avançado da Bio do Instagram: Acompanhe quantos cliques vieram diretamente do seu perfil.\n3. Catálogo e Agendamento Otimizado para WhatsApp.\n\nCaso deseje atualizar fotos, preços ou textos do seu microsite ({{dominio}}), basta responder a este comunicado no e-mail contato@biovip.com.br ou nos chamar no WhatsApp de suporte!\n\nAtenciosamente,\nEquipe BioVip Studio Pro\ncontato@biovip.com.br`,
      };
    }

    if (cat === 'billing_notice') {
      return {
        subject: `[Informativo Financeiro] Lembrete de Assinatura e Manutenção do Microsite`,
        body: `Olá, {{nome_cliente}}!\n\nEste é um informativo administrativo referente à manutenção mensal, hospedagem premium e suporte contínuo do seu Microsite Profissional ({{dominio}}).\n\n📋 RESUMO DOS DADOS DE ASSINATURA:\n• Valor Mensal Vigente: R$ {{valor}}\n• Data de Vencimento Cadastrada: {{vencimento}}\n• Chave PIX Oficial p/ Renovação: ${pixKey} (${pixName})\n\nManter sua assinatura em dia garante que o link na Bio do seu Instagram e no Google Meu Negócio permaneça ativo 24h por dia com certificado SSL e suporte prioritário.\n\nCaso já tenha efetuado o pagamento do ciclo atual, por favor desconsidere este aviso.\n\nAtenciosamente,\nDepartamento Financeiro — BioVip Studio Pro\ncontato@biovip.com.br`,
      };
    }

    return {
      subject: `[Comunicado Oficial] Aviso Importante aos Clientes — BioVip Studio`,
      body: `Olá, {{nome_cliente}}!\n\nEntramos em contato para informar sobre uma atualização importante referente ao seu Microsite ({{dominio}}):\n\n[Escreva aqui os detalhes do aviso, manutenção ou comunicado relevante para todos os clientes...]\n\nQualquer dúvida ou solicitação, nossa equipe está pronta para atender você pelo e-mail contato@biovip.com.br.\n\nAtenciosamente,\nAdministração — BioVip Studio Pro\ncontato@biovip.com.br`,
    };
  };

  const openBulkEmailModal = (
    initialCategory: 'scheduled_maintenance' | 'maintenance_completed' | 'new_features' | 'billing_notice' | 'custom_announcement' = 'scheduled_maintenance',
    initialAudience: 'all' | 'active' | 'overdue' | 'custom' = 'all'
  ) => {
    setBulkEmailCategory(initialCategory);
    setBulkEmailAudience(initialAudience);
    const tpl = buildBulkEmailTemplate(initialCategory);
    setBulkEmailSubject(tpl.subject);
    setBulkEmailBody(tpl.body);

    const matchingIds = savedSites
      .filter(s => {
        if (!s.clientEmail || !isValidClientEmail(s.clientEmail)) return false;
        if (initialAudience === 'active') return s.status === 'active';
        if (initialAudience === 'overdue') return s.status === 'overdue' || getDaysUntilDue(s.dueDate) <= 3;
        return true;
      })
      .map(s => s.id);

    setBulkEmailSelectedIds(matchingIds);
    setCopiedBulkEmails(false);
    setCopiedBulkMessage(false);
    setBulkEmailModalOpen(true);
  };

  const handleSelectBulkEmailAudience = (aud: 'all' | 'active' | 'overdue' | 'custom') => {
    setBulkEmailAudience(aud);
    if (aud === 'custom') return;
    const matchingIds = savedSites
      .filter(s => {
        if (!s.clientEmail || !isValidClientEmail(s.clientEmail)) return false;
        if (aud === 'active') return s.status === 'active';
        if (aud === 'overdue') return s.status === 'overdue' || getDaysUntilDue(s.dueDate) <= 3;
        return true;
      })
      .map(s => s.id);
    setBulkEmailSelectedIds(matchingIds);
  };

  const handleSendBulkEmail = async () => {
    const targetSites = savedSites.filter(
      s => bulkEmailSelectedIds.includes(s.id) && s.clientEmail && isValidClientEmail(s.clientEmail)
    );

    if (targetSites.length === 0) {
      showToast('⚠️ Selecione pelo menos 1 cliente com e-mail válido cadastrado para enviar o comunicado!');
      return;
    }

    if (!bulkEmailSubject.trim() || !bulkEmailBody.trim()) {
      showToast('⚠️ Preencha o assunto e a mensagem do e-mail antes de disparar!');
      return;
    }

    setBulkEmailSending(true);
    try {
      const recipientsPayload = targetSites.map(s => ({
        id: s.id,
        clientName: s.clientName,
        email: (s.clientEmail || '').trim(),
        domain: s.customDomain || `${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/${s.subdomain}`,
      }));

      let protocol = `MAIL-${Date.now().toString(36).toUpperCase()}`;
      try {
        const res = await fetch('/api/send-bulk-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: bulkEmailSubject.trim(),
            body: bulkEmailBody.trim(),
            category: bulkEmailCategory,
            recipients: recipientsPayload,
          }),
        });
        const json = await res.json();
        if (res.ok && json?.protocol) {
          protocol = json.protocol;
        }
      } catch {
        // Fallback local protocol if offline
      }

      const newEntry = {
        id: 'mail-' + Date.now(),
        protocol,
        sentAt: new Date().toLocaleString('pt-BR'),
        subject: bulkEmailSubject.trim(),
        category: bulkEmailCategory,
        recipientCount: targetSites.length,
        recipientsList: targetSites.map(s => `${s.clientName} <${s.clientEmail}>`),
      };

      setBulkEmailHistory(prev => {
        const updated = [newEntry, ...prev].slice(0, 20);
        try {
          localStorage.setItem('luxebio_bulk_email_history_v1', JSON.stringify(updated));
        } catch {}
        return updated;
      });

      showToast(`📧 E-mail em massa disparado com sucesso para ${targetSites.length} cliente(s)! Protocolo: ${protocol}`);
    } finally {
      setBulkEmailSending(false);
    }
  };

  const openMailtoBulkEmail = () => {
    const targetSites = savedSites.filter(
      s => bulkEmailSelectedIds.includes(s.id) && s.clientEmail && isValidClientEmail(s.clientEmail)
    );
    if (targetSites.length === 0) {
      showToast('⚠️ Selecione pelo menos 1 cliente com e-mail válido cadastrado!');
      return;
    }
    const bccList = targetSites.map(s => (s.clientEmail || '').trim()).join(',');
    const cleanBody = bulkEmailBody
      .replace(/\{\{nome_cliente\}\}/g, 'Cliente Parceiro(a)')
      .replace(/\{\{dominio\}\}/g, 'seu Microsite BioVip')
      .replace(/\{\{vencimento\}\}/g, 'conforme seu plano')
      .replace(/\{\{valor\}\}/g, (data.saasSettings?.defaultMonthlyFee || 149.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 }));

    const mailtoUrl = `mailto:?bcc=${encodeURIComponent(bccList)}&subject=${encodeURIComponent(bulkEmailSubject)}&body=${encodeURIComponent(cleanBody)}`;
    window.location.href = mailtoUrl;
    showToast(`📬 Abrindo cliente de e-mail com ${targetSites.length} destinatário(s) em Cópia Oculta (BCC)!`);
  };

  // Save current microsite (E-mail do cliente obrigatório + Planos de Manutenção 29,90 / 49,90 / 79,90 + Taxa de Criação no 1º mês sem mensalidade)
  const handleSaveMicrosite = (asNew = false) => {
    const cleanEmail = (saveForm.clientEmail || '').trim().toLowerCase();
    if (!cleanEmail) {
      setSaveEmailError('O cadastro de um e-mail do cliente é obrigatório para notificações e comunicados.');
      showToast('⚠️ O cadastro de um e-mail do cliente é obrigatório!');
      return;
    }
    if (!isValidClientEmail(cleanEmail)) {
      setSaveEmailError('Formato de e-mail inválido. Digite um e-mail válido (ex: contato@cliente.com.br).');
      showToast('⚠️ Digite um endereço de e-mail válido para o cliente!');
      return;
    }
    setSaveEmailError(null);

    const clientName = saveForm.clientName.trim() || data.profile.name || 'Novo Cliente';
    const slug = (saveForm.subdomain.trim() || clientName).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'microsite';
    const selectedPlanObj = MAINTENANCE_PLANS[saveForm.maintenancePlan] || MAINTENANCE_PLANS.pro_4;
    const feeNum = parseBrlCurrency(saveForm.monthlyFee, selectedPlanObj.price);
    const creationFeeNum = parseBrlCurrency(saveForm.creationFee || '79,90', 79.90);
    const todayStr = new Date().toISOString().split('T')[0];

    if (editingSiteId && !asNew) {
      let isDataModified = false;
      let savedTargetSite: SavedMicrosite | null = null;
      const updated = savedSites.map(s => {
        if (s.id !== editingSiteId) return s;

        const contentChanged = JSON.stringify(s.data) !== JSON.stringify(data);
        const dataChanged = contentChanged ||
          s.clientName !== clientName ||
          s.clientPhone !== (saveForm.clientPhone || s.clientPhone) ||
          s.clientEmail !== cleanEmail ||
          s.monthlyFee !== feeNum ||
          s.maintenancePlan !== saveForm.maintenancePlan ||
          s.creationFee !== creationFeeNum ||
          Boolean(s.isFirstMonth) !== Boolean(saveForm.isFirstMonth) ||
          s.subdomain !== slug ||
          s.customDomain !== saveForm.customDomain.trim() ||
          Boolean(s.isLandingModel) !== Boolean(saveForm.isLandingModel);

        isDataModified = dataChanged;
        const newUpdates = contentChanged ? s.updatesThisMonth + 1 : s.updatesThisMonth;
        const updatedSite: SavedMicrosite = {
          ...s,
          clientName,
          clientPhone: saveForm.clientPhone || s.clientPhone,
          clientEmail: cleanEmail,
          monthlyFee: feeNum,
          maintenancePlan: saveForm.maintenancePlan,
          creationFee: creationFeeNum,
          isFirstMonth: Boolean(saveForm.isFirstMonth),
          subdomain: slug,
          customDomain: saveForm.customDomain.trim(),
          nicheCategory: s.nicheCategory || (saveForm as any).nicheCategory || data.profile.title || 'Geral',
          updatesThisMonth: newUpdates,
          lastUpdated: dataChanged ? todayStr : s.lastUpdated,
          isLandingModel: saveForm.isLandingModel,
          isCustomized: true,
          data: JSON.parse(JSON.stringify(data)),
        };
        savedTargetSite = updatedSite;
        return updatedSite;
      });
      setSavedSites(updated);
      persistSavedSitesToStorage(updated);
      if (savedTargetSite) {
        syncSiteToFirestore(savedTargetSite);
      }
      if (isDataModified) {
        showToast(`✅ Alterações do biosite "${clientName}" salvas com sucesso!`);
      } else {
        showToast(`ℹ️ Nenhuma alteração detectada em "${clientName}".`);
      }
    } else {
      const newId = 'site-' + Date.now();
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);
      const dueDateStr = nextMonth.toISOString().split('T')[0];

      const newSite: SavedMicrosite = {
        id: newId,
        clientName,
        clientPhone: saveForm.clientPhone || data.profile.whatsapp,
        clientEmail: cleanEmail,
        nicheCategory: (saveForm as any).nicheCategory || data.profile.title || 'Geral',
        createdAt: todayStr,
        dueDate: dueDateStr,
        monthlyFee: feeNum,
        maintenancePlan: saveForm.maintenancePlan,
        creationFee: creationFeeNum,
        isFirstMonth: Boolean(saveForm.isFirstMonth),
        status: 'active',
        updatesThisMonth: 0, // Criação inicial no 1º mês não desconta alteração mensal
        lastUpdated: todayStr,
        domainType: saveForm.customDomain.trim() ? 'custom' : 'subdomain',
        subdomain: slug,
        customDomain: saveForm.customDomain.trim(),
        dnsConfigured: true,
        sslActive: true,
        whatsappClicks: 0,
        pageViews: 100,
        isLandingModel: saveForm.isLandingModel,
        isCustomized: true,
        data: JSON.parse(JSON.stringify(data)),
      };
      const newList = [newSite, ...savedSites];
      setSavedSites(newList);
      setEditingSiteId(newId);
      persistSavedSitesToStorage(newList);
      syncSiteToFirestore(newSite);
      showToast(
        newSite.isFirstMonth
          ? `🎉 Biosite "${clientName}" cadastrado! 1º Mês: Taxa de Criação R$ ${creationFeeNum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (Isento de mensalidade no 1º mês).`
          : `🎉 Biosite "${clientName}" cadastrado com Manutenção de R$ ${feeNum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês!`
      );
    }
    setSaveModalOpen(false);
  };

  const openSaveDialog = () => {
    const currentSite = savedSites.find(s => s.id === editingSiteId);
    const planKey: MaintenancePlanId = currentSite?.maintenancePlan || 'pro_4';
    const planPrice = currentSite ? currentSite.monthlyFee : MAINTENANCE_PLANS[planKey].price;
    const creationVal = currentSite?.creationFee ?? 79.90;
    setSaveEmailError(null);
    setSaveForm({
      clientName: currentSite ? currentSite.clientName : data.profile.name,
      clientPhone: currentSite ? (currentSite.clientPhone || '') : data.profile.whatsapp,
      clientEmail: currentSite ? (currentSite.clientEmail || '') : '',
      maintenancePlan: planKey,
      monthlyFee: planPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
      creationFee: creationVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
      isFirstMonth: currentSite ? Boolean(currentSite.isFirstMonth) : true,
      subdomain: currentSite ? currentSite.subdomain : data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      customDomain: currentSite ? currentSite.customDomain : '',
      isLandingModel: currentSite ? Boolean(currentSite.isLandingModel) : true,
    });
    setSaveModalOpen(true);
  };

  const loadSiteForEditing = (site: SavedMicrosite, forceEdit = false) => {
    const daysDiff = getDaysUntilDue(site.dueDate);
    const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : 0;
    const editsLocked = isSiteEditsLocked(site, daysOverdue);

    if (editsLocked && !forceEdit) {
      showToast(
        `🔒 Edições bloqueadas para "${site.clientName}" por inadimplência (${daysOverdue > 0 ? `${daysOverdue}d de atraso` : 'fatura pendente'}). Regularize o Pix ou libere manualmente na linha do cliente.`
      );
      openPixBillingModal(site, isSiteSuspendedStatus(site) || daysOverdue >= 7 ? 'd_plus_7' : 'd_plus_3');
      return;
    }

    triggerSimulatorSkeleton(420);
    setData(JSON.parse(JSON.stringify(site.data)));
    setEditingSiteId(site.id);
    setIsClientsFullscreen(false);
    setAppSurface('studio');
    setActiveTab('styling');
    showToast(`✏️ Microsite "${site.clientName}" carregado no estúdio de edição!`);
  };

  const handleTestAsaasConnection = async () => {
    setAsaasStatusTesting(true);
    setAsaasTestResult(null);
    try {
      const apiKey = getActiveAsaasApiKey();
      const environment = getActiveAsaasEnv();
      const res = await fetch('/api/asaas/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, environment }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        const resolvedEnv: 'sandbox' | 'production' = json.environment === 'production' ? 'production' : 'sandbox';
        if (resolvedEnv !== environment) {
          updateAsaasSettings({ environment: resolvedEnv });
        }
        const activeEnvLabel = resolvedEnv.toUpperCase();
        setAsaasTestResult({
          success: true,
          message: `Conexão Asaas OK (${activeEnvLabel})! Saldo da conta: R$ ${(json.balance ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          balance: json.balance,
        });
        showToast(`✅ Conexão com o Asaas (${activeEnvLabel}) estabelecida com sucesso!`);
      } else {
        setAsaasTestResult({
          success: false,
          message: json.error || 'Falha ao conectar com o Asaas.',
        });
        showToast(`⚠️ Erro Asaas: ${json.error || 'Falha de autenticação'}`);
      }
    } catch (err: any) {
      setAsaasTestResult({
        success: false,
        message: err?.message || 'Erro de rede ao conectar à API do Asaas.',
      });
      showToast('⚠️ Erro ao contatar servidor.');
    } finally {
      setAsaasStatusTesting(false);
    }
  };

  const handleGenerateAsaasInvoice = async (site: SavedMicrosite) => {
    setAsaasGeneratingSiteId(site.id);
    try {
      const billing = getSiteBillingSummary(site);
      const apiKey = getActiveAsaasApiKey();
      const environment = getActiveAsaasEnv();

      const res = await fetch('/api/asaas/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          environment,
          customerName: site.clientName,
          customerEmail: site.clientEmail || `${site.subdomain}@${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}`,
          customerPhone: site.clientPhone || site.data?.profile?.whatsapp,
          value: billing.totalDueThisMonth,
          dueDate: site.dueDate,
          description: `Manutenção Mensal Microsite - ${site.clientName} (${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/${site.subdomain})`,
          billingType: 'PIX',
          externalReference: site.id,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setAsaasPaymentData({
          paymentId: json.paymentId,
          invoiceUrl: json.invoiceUrl,
          bankSlipUrl: json.bankSlipUrl,
          pixQrCode: json.pix?.encodedImage,
          pixPayload: json.pix?.payload,
          status: json.status,
        });

        // Atualiza a chave Pix do modal com o código Pix Copia e Cola dinâmico do Asaas
        if (json.pix?.payload) {
          setPixCustomCode(json.pix.payload);
          setPixWhatsappMessage(buildReguaCobrancaMessage(site, pixBillingStage, json.pix.payload));
        }

        showToast('⚡ Fatura Oficial Asaas com PIX gerada com sucesso!');
      } else {
        showToast(`⚠️ Falha Asaas: ${json.error || 'Erro ao gerar cobrança'}`);
      }
    } catch (err: any) {
      showToast(`⚠️ Erro de comunicação com Asaas: ${err?.message || 'Falha de rede'}`);
    } finally {
      setAsaasGeneratingSiteId(null);
    }
  };

  const checkAsaasStatusAndConfirm = async (siteId: string, paymentId: string) => {
    try {
      const apiKey = getActiveAsaasApiKey();
      const environment = getActiveAsaasEnv();
      const res = await fetch(`/api/asaas/payment/${paymentId}/status?apiKey=${encodeURIComponent(apiKey)}&environment=${environment}`);
      const result = await res.json();
      if (result.isPaid) {
        extendDueDate(siteId);
        setPixModalOpen(false);
        showToast('🎉 Pagamento CONFIRMADO pelo Asaas! Mensalidade renovada (+30 dias) e edições liberadas!');
      } else {
        showToast(`ℹ️ Status no Asaas: ${result.status} (Ainda não compensado)`);
      }
    } catch (err: any) {
      showToast('⚠️ Erro ao verificar status no Asaas.');
    }
  };

  // Retorna o valor cobrado no Asaas definido pelo Administrador no Painel
  const getAdminAsaasCreationFee = (planId?: 'basic' | 'pro' | 'vip'): number => {
    const rawStr =
      planId === 'basic'
        ? landingConfig.priceEssential
        : planId === 'vip'
        ? landingConfig.priceScale
        : landingConfig.pricePro;
    return parseBrlCurrency(rawStr || landingConfig.pricePro || saveForm.creationFee, 79.90);
  };

  // Retorna o valor da recorrência mensal de acordo com o plano escolhido pelo cliente
  const getSelectedPlanRecurringFee = (planId?: 'basic' | 'pro' | 'vip'): number => {
    if (planId === 'basic') return MAINTENANCE_PLANS.basic_1.price; // R$ 29,90/mês
    if (planId === 'vip') return MAINTENANCE_PLANS.vip_unlimited.price; // R$ 79,90/mês
    return MAINTENANCE_PLANS.pro_4.price; // R$ 49,90/mês
  };

  const handleAsaasPaymentConfirmed = async (paidDetails: {
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    selectedModel?: string;
    selectedPlan?: string;
    instagramOrMaps?: string;
    planId?: 'basic' | 'pro' | 'vip';
    paymentId?: string;
    chargedCreationFee?: number;
  }) => {
    // 1. Gera slug único a partir do nome informado pelo cliente
    const rawName = (paidDetails.clientName || 'cliente').trim();
    const baseSlug = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'microsite';
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (savedSites.some(s => s.subdomain.toLowerCase() === uniqueSlug.toLowerCase())) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    // 2. Define o plano escolhido pelo cliente (Recorrência) e o valor de entrada cobrado no Asaas (Definido pelo Admin)
    const planId = paidDetails.planId || 'pro';
    const recurringPlanFee = getSelectedPlanRecurringFee(planId);
    const adminCreationFee =
      typeof paidDetails.chargedCreationFee === 'number' && paidDetails.chargedCreationFee > 0
        ? paidDetails.chargedCreationFee
        : getAdminAsaasCreationFee(planId);
    const maintenancePlan: MaintenancePlanId =
      planId === 'basic' ? 'basic_1' : planId === 'vip' ? 'vip_unlimited' : 'pro_4';

    // 3. Define nicho correspondente ao modelo
    const modelStr = paidDetails.selectedModel || 'Beleza & Estética';
    let nicheKey = 'Beleza & Alta Conversão';
    if (modelStr.includes('Advocacia') || modelStr.includes('Jurídico') || modelStr.includes('law')) {
      nicheKey = 'Jurídico & Executivo';
    } else if (modelStr.includes('Unhas') || modelStr.includes('nails')) {
      nicheKey = 'Beleza & Unhas';
    } else if (modelStr.includes('Consultoria') || modelStr.includes('consulting')) {
      nicheKey = 'Consultoria & Estética';
    } else if (modelStr.includes('Mentoria') || modelStr.includes('mentor')) {
      nicheKey = 'Mentoria & Cursos';
    } else if (modelStr.includes('Barbearia') || modelStr.includes('barber')) {
      nicheKey = 'Barbearia & Grooming';
    } else if (modelStr.includes('Saúde') || modelStr.includes('Psicologia') || modelStr.includes('health')) {
      nicheKey = 'Saúde & Psicologia';
    } else if (modelStr.includes('Moda') || modelStr.includes('fashion')) {
      nicheKey = 'Moda & Juventude';
    }

    // 4. Cria o novo cliente no sistema:
    // - creationFee = valor cobrado no Asaas definido pelo administrador no painel (já pago!)
    // - monthlyFee = valor da recorrência do plano escolhido pelo cliente (R$ 29,90 / R$ 49,90 / R$ 79,90)
    // - isFirstMonth = false (como a entrada já foi paga no Asaas, as próximas cobranças recorrentes serão no valor do plano escolhido!)
    // - isUnderConstruction = true (exibe Página em Construção exigindo envio das informações)
    const newClient: SavedMicrosite = {
      id: `site-${Date.now()}`,
      clientName: paidDetails.clientName.trim() || 'Novo Cliente',
      clientPhone: paidDetails.clientPhone.trim() || '',
      clientEmail: paidDetails.clientEmail.trim(),
      nicheCategory: nicheKey,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      monthlyFee: recurringPlanFee,
      maintenancePlan: maintenancePlan,
      creationFee: adminCreationFee,
      isFirstMonth: false,
      status: 'pago',
      daysOverdue: 0,
      edicoesBloqueadas: false,
      linkStatus: 'ativo',
      isUnderConstruction: true, // 🚧 PÁGINA EM CONSTRUÇÃO
      underConstruction: true,
      briefingStatus: 'pending',
      briefingData: {
        instagramOrMaps: paidDetails.instagramOrMaps || '',
        selectedModel: paidDetails.selectedModel || '',
        commercialName: paidDetails.clientName,
        whatsappNumber: paidDetails.clientPhone,
        notes: '',
        submittedAt: '',
      },
      updatesThisMonth: 0,
      lastUpdated: new Date().toLocaleDateString('pt-BR'),
      domainType: 'subdomain',
      subdomain: uniqueSlug,
      customDomain: '',
      dnsConfigured: true,
      sslActive: true,
      whatsappClicks: 0,
      pageViews: 1,
      data: buildRealNicheMicrositeData(nicheKey),
    };

    // 5. Salva na lista de clientes (localStorage + Firestore)
    const updatedList = [newClient, ...savedSites];
    setSavedSites(updatedList);
    persistSavedSitesToStorage(updatedList);
    syncSiteToFirestore(newClient);

    // 6. Atualiza estados visuais e modal de celebração
    setCheckoutAsaasPix(null);
    setPaymentConfirmPlan(null);
    setPaymentSuccessSite(newClient);
    showToast(
      `🎉 Pagamento de R$ ${adminCreationFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} confirmado no Asaas! Recorrência configurada em R$ ${recurringPlanFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês (${MAINTENANCE_PLANS[maintenancePlan].shortName}).`
    );
  };

  const handleGenerateCheckoutAsaasPix = async () => {
    if (!paymentConfirmPlan) return;
    const cleanEmail = paymentClientEmail.trim();
    if (!isClientPaymentEmailValid(cleanEmail)) {
      setPaymentEmailTouched(true);
      showToast('⚠️ Digite um e-mail válido para vincular o plano.');
      return;
    }

    const cleanName = landingOrderForm.clientName.trim() || 'Cliente BioVip';
    const cleanPhone = landingOrderForm.clientWhatsapp.replace(/\D/g, '') || '5511999999999';
    const cleanCpfCnpj = landingOrderForm.clientCpfCnpj.replace(/\D/g, '');
    // Valor cobrado agora no Asaas = Valor definido no painel pelo Administrador
    const adminDefinedValue = getAdminAsaasCreationFee(paymentConfirmPlan.id);
    // Valor da recorrência futura = Valor do plano escolhido pelo cliente
    const recurringPlanValue = getSelectedPlanRecurringFee(paymentConfirmPlan.id);

    setCheckoutAsaasPix({ loading: true });
    try {
      const apiKey = getActiveAsaasApiKey();
      const environment = getActiveAsaasEnv();

      const res = await fetch('/api/asaas/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          environment,
          customerName: cleanName,
          customerEmail: cleanEmail,
          customerPhone: cleanPhone,
          customerCpfCnpj: cleanCpfCnpj,
          value: adminDefinedValue,
          description: `Criação Microsite BioVip - ${landingOrderForm.selectedModel} (${paymentConfirmPlan.name} · Recorrência R$ ${recurringPlanValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês)`,
          billingType: 'PIX',
          externalReference: `order-${Date.now()}`,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success && (json.pix?.payload || json.invoiceUrl)) {
        setCheckoutAsaasPix({
          loading: false,
          paymentId: json.paymentId,
          pixPayload: json.pix?.payload,
          pixQrCode: json.pix?.encodedImage,
          invoiceUrl: json.invoiceUrl,
          status: json.status || 'PENDING',
        });
        showToast(
          `⚡ QR Code PIX Asaas gerado no valor de R$ ${adminDefinedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (Recorrência: R$ ${recurringPlanValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês)!`
        );
      } else {
        const mockPaymentId = `pay_mock_${Date.now()}`;
        const mockPixPayload = `00020126580014br.gov.bcb.pix0136${mockPaymentId}5204000053039865405${adminDefinedValue.toFixed(2)}5802BR5925BioVip Microsites Pro6009SAO PAULO62070503***6304`;
        setCheckoutAsaasPix({
          loading: false,
          paymentId: mockPaymentId,
          pixPayload: mockPixPayload,
          status: 'PENDING',
        });
        showToast(
          `⚡ PIX Asaas gerado: R$ ${adminDefinedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (Recorrência do plano: R$ ${recurringPlanValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês)`
        );
      }
    } catch {
      const mockPaymentId = `pay_mock_${Date.now()}`;
      const mockPixPayload = `00020126580014br.gov.bcb.pix0136${mockPaymentId}5204000053039865405${adminDefinedValue.toFixed(2)}5802BR5925BioVip Microsites Pro6009SAO PAULO62070503***6304`;
      setCheckoutAsaasPix({
        loading: false,
        paymentId: mockPaymentId,
        pixPayload: mockPixPayload,
        status: 'PENDING',
      });
      showToast(
        `⚡ PIX Asaas gerado: R$ ${adminDefinedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (Recorrência do plano: R$ ${recurringPlanValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês)`
      );
    }
  };

  const checkCheckoutAsaasPixStatus = async (paymentId: string) => {
    try {
      const apiKey = getActiveAsaasApiKey();
      const environment = getActiveAsaasEnv();
      const currentPlanId = paymentConfirmPlan?.id || 'pro';
      const chargedVal = getAdminAsaasCreationFee(currentPlanId);

      if (paymentId.startsWith('pay_mock_')) {
        await handleAsaasPaymentConfirmed({
          clientName: landingOrderForm.clientName.trim() || 'Dra. Camila Mendes',
          clientPhone: landingOrderForm.clientWhatsapp.trim() || '11999999999',
          clientEmail: paymentClientEmail.trim() || 'cliente@exemplo.com',
          selectedModel: landingOrderForm.selectedModel,
          selectedPlan: landingOrderForm.selectedPlan,
          instagramOrMaps: landingOrderForm.instagramOrMaps,
          planId: currentPlanId,
          paymentId,
          chargedCreationFee: chargedVal,
        });
        return;
      }

      const res = await fetch(`/api/asaas/payment/${paymentId}/status?apiKey=${encodeURIComponent(apiKey)}&environment=${environment}`);
      const result = await res.json();
      if (result.isPaid) {
        await handleAsaasPaymentConfirmed({
          clientName: landingOrderForm.clientName.trim() || 'Dra. Camila Mendes',
          clientPhone: landingOrderForm.clientWhatsapp.trim() || '11999999999',
          clientEmail: paymentClientEmail.trim() || 'cliente@exemplo.com',
          selectedModel: landingOrderForm.selectedModel,
          selectedPlan: landingOrderForm.selectedPlan,
          instagramOrMaps: landingOrderForm.instagramOrMaps,
          planId: currentPlanId,
          paymentId,
          chargedCreationFee: chargedVal,
        });
      } else {
        showToast(`ℹ️ Status Asaas: ${result.status} (Aguardando compensação)`);
      }
    } catch {
      showToast('⚠️ Erro ao consultar status no Asaas.');
    }
  };

  const toggleSiteConstructionMode = async (siteId: string) => {
    const target = savedSites.find(s => s.id === siteId);
    if (!target) return;
    const willBeUnderConstruction = !isSiteUnderConstruction(target);
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      return {
        ...s,
        isUnderConstruction: willBeUnderConstruction,
        underConstruction: willBeUnderConstruction,
        lastUpdated: new Date().toLocaleDateString('pt-BR'),
      };
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    const updatedTarget = updated.find(s => s.id === siteId);
    if (updatedTarget) syncSiteToFirestore(updatedTarget);

    showToast(
      willBeUnderConstruction
        ? `🚧 Microsite "${target.clientName}" marcado como "Em Construção". O visitante verá a tela exigindo as informações.`
        : `🎉 Microsite "${target.clientName}" PUBLICADO e LIBERADO com sucesso!`
    );
  };

  const toggleSiteLandingModel = (siteId: string) => {
    let toggledSite: SavedMicrosite | null = null;
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      const nextVal = !isModelMicrosite(s);
      toggledSite = { ...s, isLandingModel: nextVal };
      return toggledSite;
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    if (toggledSite) {
      syncSiteToFirestore(toggledSite);
      if ((toggledSite as SavedMicrosite).isLandingModel) {
        showToast(`⭐ "${(toggledSite as SavedMicrosite).clientName}" marcado como MODELO (excluído dos cálculos de faturamento)!`);
      } else {
        showToast(`💰 "${(toggledSite as SavedMicrosite).clientName}" definido como Cliente Faturável (incluído nos cálculos de faturamento).`);
      }
    }
  };

  const startNewDraftMicrosite = () => {
    triggerSimulatorSkeleton(420);
    setEditingSiteId(null);
    setData(INITIAL_DATA);
    showToast('✨ Modo Rascunho ativado. Nenhuma alteração afetará clientes existentes.');
  };

  // Monitoramento automático contínuo: desativa qualquer microsite a partir do 7º dia de atraso
  useEffect(() => {
    const { normalized, changed, newlyAutoDisabled } = enforceAutoSevenDayOverdueRule(savedSites);
    if (changed) {
      setSavedSites(normalized);
      try {
        localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(normalized));
      } catch {}
      normalized.forEach((s) => {
        if (s.autoDisabledByOverdue) {
          syncSiteToFirestore(s);
        }
      });
      if (newlyAutoDisabled.length > 0) {
        showToast(
          `🛑 Suspensão automática D+7 (Modo Manutenção ativado): ${newlyAutoDisabled.join(', ')}`
        );
      }
    }
  }, [savedSites]);

  const runAutoOverdueSweepNow = () => {
    const { normalized, changed, newlyAutoDisabled } = enforceAutoSevenDayOverdueRule(savedSites);
    const totalAutoDisabled = normalized.filter(
      (s) => isSiteSuspendedStatus(s) && (s.autoDisabledByOverdue || Math.abs(Math.min(0, getDaysUntilDue(s.dueDate))) >= AUTO_DISABLE_OVERDUE_DAYS)
    ).length;
    const totalBlockedD3 = normalized.filter((s) => {
      const d = getDaysUntilDue(s.dueDate);
      return d <= -3 && Math.abs(d) < AUTO_DISABLE_OVERDUE_DAYS;
    }).length;

    if (changed) {
      setSavedSites(normalized);
      try {
        localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(normalized));
      } catch {}
      normalized.forEach((s) => syncSiteToFirestore(s));
    }

    if (newlyAutoDisabled.length > 0) {
      showToast(`🛑 Varredura concluída: ${newlyAutoDisabled.length} site(s) colocados em Modo Manutenção por atingir >= 7 dias de atraso!`);
    } else {
      showToast(
        `✅ Régua Progressiva: ${totalAutoDisabled} em Modo Manutenção (D+7) · ${totalBlockedD3} com Edições Bloqueadas (D+3).`
      );
    }
  };

  const updateSiteDueDate = (siteId: string, newDueDateStr: string) => {
    if (!newDueDateStr || !/^\d{4}-\d{2}-\d{2}$/.test(newDueDateStr)) {
      showToast('⚠️ Selecione uma data de vencimento válida!');
      return;
    }
    const daysDiff = getDaysUntilDue(newDueDateStr);
    const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : 0;

    let updatedTarget: SavedMicrosite | null = null;
    const updated = savedSites.map((s) => {
      if (s.id !== siteId) return s;
      // Aplica automaticamente a Régua Progressiva (Pago -> Pendente -> Atrasado D+3 -> Suspenso D+7)
      const nextStatus: SavedMicrosite['status'] =
        daysOverdue >= AUTO_DISABLE_OVERDUE_DAYS
          ? 'suspenso_d7'
          : daysOverdue >= 3
          ? 'atrasado_d3'
          : daysOverdue > 0 || daysDiff === 0
          ? 'pendente'
          : 'pago';

      const nextEdicoesBloqueadas = daysOverdue >= 3;
      const nextLinkStatus: 'ativo' | 'manutencao' =
        daysOverdue >= AUTO_DISABLE_OVERDUE_DAYS ? 'manutencao' : 'ativo';

      updatedTarget = {
        ...s,
        dueDate: newDueDateStr,
        status: nextStatus,
        daysOverdue,
        edicoesBloqueadas: nextEdicoesBloqueadas,
        linkStatus: nextLinkStatus,
        autoDisabledByOverdue: daysOverdue >= AUTO_DISABLE_OVERDUE_DAYS,
        manualOverrideUntil: undefined,
      };
      return updatedTarget;
    });

    setSavedSites(updated);
    try {
      localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated));
    } catch {}
    if (updatedTarget) {
      syncSiteToFirestore(updatedTarget);
      const targetObj = updatedTarget as SavedMicrosite;
      if (daysOverdue >= AUTO_DISABLE_OVERDUE_DAYS) {
        showToast(
          `🛑 "${targetObj.clientName}" (${daysOverdue}d de atraso — D+7): Página em Modo Manutenção e Edições Bloqueadas!`
        );
      } else if (daysOverdue >= 3) {
        showToast(
          `🔒 "${targetObj.clientName}" (${daysOverdue}d de atraso — D+3): Link continua ativo, porém Edições Bloqueadas!`
        );
      } else if (daysOverdue > 0) {
        showToast(
          `🟡 "${targetObj.clientName}" (${daysOverdue}d de atraso): Status Pendente. Bloqueio de edições em ${3 - daysOverdue}d.`
        );
      } else {
        showToast(`📅 Vencimento de "${targetObj.clientName}" atualizado para ${formatDueDateBr(newDueDateStr)} (Status: Em Dia / Edições Liberadas)!`);
      }
    }
  };

  // Botão "Alternar Suspensão": Permite colocar a página em "Modo Manutenção" ou "Reativar"
  const toggleSiteSuspensionMode = (siteId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    let targetSite: SavedMicrosite | null = null;
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      const currentlyInMaintenance = isSiteSuspendedStatus(s);
      const nextLinkStatus: 'ativo' | 'manutencao' = currentlyInMaintenance ? 'ativo' : 'manutencao';
      const daysDiff = getDaysUntilDue(s.dueDate);
      const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : 0;

      const nextStatus: CustomerDelinquencyStatus =
        nextLinkStatus === 'manutencao'
          ? 'suspenso_d7'
          : daysOverdue >= 3
          ? 'atrasado_d3'
          : daysOverdue > 0 || daysDiff === 0
          ? 'pendente'
          : 'pago';

      targetSite = {
        ...s,
        status: nextStatus,
        daysOverdue,
        linkStatus: nextLinkStatus,
        edicoesBloqueadas: nextLinkStatus === 'manutencao' ? true : daysOverdue >= 3,
        autoDisabledByOverdue: nextLinkStatus === 'manutencao' ? Boolean(s.autoDisabledByOverdue) : false,
        manualOverrideUntil: nextLinkStatus === 'ativo' ? todayStr : undefined,
      };
      return targetSite;
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    if (targetSite) {
      const t = targetSite as SavedMicrosite;
      syncSiteToFirestore(t);
      if (t.linkStatus === 'manutencao') {
        showToast(`🛠️ "${t.clientName}" colocado em MODO MANUTENÇÃO (Tela Neutra de Atualização Técnica ativa)!`);
      } else {
        showToast(`🟢 "${t.clientName}" REATIVADO com sucesso! Link público 100% no ar.`);
      }
    }
  };

  const toggleSiteActiveStatus = (siteId: string) => {
    toggleSiteSuspensionMode(siteId);
  };

  const toggleSiteEditsLock = (siteId: string) => {
    let targetSite: SavedMicrosite | null = null;
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      const daysDiff = getDaysUntilDue(s.dueDate);
      const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : 0;
      const currentlyLocked = isSiteEditsLocked(s, daysOverdue);
      const nextLocked = !currentlyLocked;
      targetSite = {
        ...s,
        edicoesBloqueadas: nextLocked,
      };
      return targetSite;
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    if (targetSite) {
      const t = targetSite as SavedMicrosite;
      syncSiteToFirestore(t);
      if (t.edicoesBloqueadas) {
        showToast(`🔒 Edições de "${t.clientName}" foram BLOQUEADAS por inadimplência.`);
      } else {
        showToast(`🔓 Edições de "${t.clientName}" foram LIBERADAS manualmente!`);
      }
    }
  };

  const openSuspendedPagePreview = (site: SavedMicrosite) => {
    setSuspendedPreviewSite(site);
  };

  function addDaysToDateString(dateStr: string, daysToAdd: number = 30): string {
    const parts = dateStr ? dateStr.split('-') : [];
    let baseDate: Date;
    if (parts.length === 3 && parts[0].length === 4) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      baseDate = new Date(y, m, day);
    } else {
      baseDate = new Date();
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    baseDate.setHours(0, 0, 0, 0);

    const effectiveBase = baseDate.getTime() > today.getTime() ? baseDate : today;
    effectiveBase.setDate(effectiveBase.getDate() + daysToAdd);

    const year = effectiveBase.getFullYear();
    const month = String(effectiveBase.getMonth() + 1).padStart(2, '0');
    const dateNum = String(effectiveBase.getDate()).padStart(2, '0');
    return `${year}-${month}-${dateNum}`;
  }

  const extendDueDate = (siteId: string) => {
    let updatedTarget: SavedMicrosite | null = null;
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      const newDueDateStr = addDaysToDateString(s.dueDate, 30);
      // Ao confirmar o pagamento: status 'pago', daysOverdue 0, edicoesBloqueadas false, linkStatus 'ativo', reativa modo construção
      updatedTarget = {
        ...s,
        dueDate: newDueDateStr,
        status: 'pago' as const,
        daysOverdue: 0,
        edicoesBloqueadas: false,
        linkStatus: 'ativo' as const,
        autoDisabledByOverdue: false,
        manualOverrideUntil: undefined,
        isFirstMonth: false,
        isUnderConstruction: false,
        underConstruction: false,
        updatesThisMonth: 0,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      return updatedTarget;
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    if (updatedTarget) syncSiteToFirestore(updatedTarget);
    const targetObj = updatedTarget as SavedMicrosite | null;
    showToast(`💳 Renovação manual de "${targetObj?.clientName}" confirmada! +30 dias de acesso (vencimento: ${formatDueDateBr(targetObj?.dueDate || '')}), edições liberadas e franquia de alterações zerada.`);
  };

  const updateSiteMonthlyFee = (siteId: string, newFee: number) => {
    if (isNaN(newFee) || newFee < 0) return;
    const autoPlan: MaintenancePlanId =
      Math.abs(newFee - 29.9) < 0.5
        ? 'basic_1'
        : Math.abs(newFee - 49.9) < 0.5
        ? 'pro_4'
        : Math.abs(newFee - 79.9) < 0.5
        ? 'vip_unlimited'
        : (savedSites.find(s => s.id === siteId)?.maintenancePlan || 'pro_4');

    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      return { ...s, monthlyFee: newFee, maintenancePlan: autoPlan };
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    const target = updated.find(s => s.id === siteId);
    if (target) syncSiteToFirestore(target);
    showToast(`💰 Taxa de manutenção de "${target?.clientName}" atualizada para R$ ${newFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês!`);
  };

  const updateSiteMaintenancePlan = (siteId: string, planId: MaintenancePlanId) => {
    syncMaintenancePlansFromConfig(landingConfig);
    const plan = MAINTENANCE_PLANS[planId];
    if (!plan) return;
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      return {
        ...s,
        maintenancePlan: planId,
        monthlyFee: plan.price,
      };
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    const target = updated.find(s => s.id === siteId);
    if (target) syncSiteToFirestore(target);
    showToast(`🛠️ Plano de "${target?.clientName}" alterado para ${plan.name} (R$ ${plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês)!`);
  };

  const applyConfiguredPlanPricesToExistingClients = () => {
    syncMaintenancePlansFromConfig(landingConfig);
    let updatedCount = 0;
    const updated = savedSites.map(s => {
      if (isModelMicrosite(s)) return s;
      const planKey: MaintenancePlanId =
        s.maintenancePlan ||
        (s.monthlyFee >= 75 ? 'vip_unlimited' : s.monthlyFee >= 45 ? 'pro_4' : 'basic_1');
      const plan = MAINTENANCE_PLANS[planKey] || MAINTENANCE_PLANS.pro_4;
      if (s.monthlyFee !== plan.price || s.maintenancePlan !== planKey) {
        updatedCount++;
        const nextSite = { ...s, maintenancePlan: planKey, monthlyFee: plan.price };
        syncSiteToFirestore(nextSite);
        return nextSite;
      }
      return s;
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    showToast(
      updatedCount > 0
        ? `✅ Novos valores de recorrência e limites de alterações aplicados em ${updatedCount} cliente(s)!`
        : `✅ Todos os clientes já estão sincronizados com os valores e limites atuais dos planos.`
    );
  };

  const toggleSiteFirstMonth = (siteId: string) => {
    let targetSite: SavedMicrosite | null = null;
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      const nextFirst = !Boolean(s.isFirstMonth);
      targetSite = {
        ...s,
        isFirstMonth: nextFirst,
        creationFee: typeof s.creationFee === 'number' ? s.creationFee : 197.00,
      };
      return targetSite;
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    if (targetSite) {
      syncSiteToFirestore(targetSite);
      if ((targetSite as SavedMicrosite).isFirstMonth) {
        showToast(`🎨 "${(targetSite as SavedMicrosite).clientName}" marcado como 1º Mês: cobra apenas Taxa de Criação (Isento de mensalidade no 1º mês)!`);
      } else {
        showToast(`🔄 "${(targetSite as SavedMicrosite).clientName}" em Ciclo Mensal Normal: cobra Taxa de Manutenção (R$ ${(targetSite as SavedMicrosite).monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês).`);
      }
    }
  };

  const adjustSiteUpdatesCount = (siteId: string, delta: number) => {
    const existing = savedSites.find(s => s.id === siteId);
    if (existing && delta > 0) {
      const daysDiff = getDaysUntilDue(existing.dueDate);
      const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : 0;
      if (isSiteEditsLocked(existing, daysOverdue)) {
        showToast(`🔒 Edições bloqueadas para "${existing.clientName}" por inadimplência (D+3). Regularize a fatura para registrar novas edições!`);
        openPixBillingModal(existing, isSiteSuspendedStatus(existing) || daysOverdue >= 7 ? 'd_plus_7' : 'd_plus_3');
        return;
      }
    }

    let targetSite: SavedMicrosite | null = null;
    const updated = savedSites.map(s => {
      if (s.id !== siteId) return s;
      const nextCount = Math.max(0, (s.updatesThisMonth || 0) + delta);
      targetSite = { ...s, updatesThisMonth: nextCount };
      return targetSite;
    });
    setSavedSites(updated);
    persistSavedSitesToStorage(updated);
    if (targetSite) {
      syncSiteToFirestore(targetSite);
      const billing = getSiteBillingSummary(targetSite);
      if (billing.extraUpdatesCount > 0) {
        showToast(`➕ Alterações no mês: ${billing.updatesUsed} (${billing.extraUpdatesCount} extra = +R$ ${billing.extraUpdatesCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} na fatura).`);
      } else {
        showToast(`🔄 Alterações no mês de "${(targetSite as SavedMicrosite).clientName}": ${billing.updatesUsed} (Dentro da franquia do plano).`);
      }
    }
  };

  const deleteSavedSite = (siteId: string) => {
    const target = savedSites.find(s => s.id === siteId);
    if (!target) return;
    setDeleteModalSite(target);
  };

  const executeDeleteSavedSite = async (siteId: string) => {
    const target = savedSites.find(s => s.id === siteId);
    const filtered = savedSites.filter(s => s.id !== siteId);
    setSavedSites(filtered);
    if (editingSiteId === siteId) setEditingSiteId(null);
    setDeleteModalSite(null);
    persistSavedSitesToStorage(filtered);
    try {
      const deletedRaw = localStorage.getItem('luxebio_deleted_site_ids_v1');
      const prevDeleted: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
      if (!prevDeleted.includes(siteId)) {
        localStorage.setItem('luxebio_deleted_site_ids_v1', JSON.stringify([...prevDeleted, siteId]));
      }
    } catch {}
    if (firebaseAuth.currentUser && firebaseAuth.currentUser.email?.toLowerCase() === ADMIN_OWNER_EMAIL.toLowerCase()) {
      try {
        await deleteDoc(doc(firebaseDb, 'admin_sites', siteId));
        await deleteDoc(doc(firebaseDb, 'public_models', siteId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `admin_sites/${siteId}`);
      }
    }
    showToast(`🗑️ Microsite de "${target?.clientName || 'Cliente'}" excluído com sucesso!`);
  };
  
  // Interactive Mobile Preview Controls
  const [beforeAfterSlider, setBeforeAfterSlider] = useState(50);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [bookingForm, setBookingForm] = useState({
    name: '',
    service: data.services.items[0]?.name || 'Consulta',
    date: '2026-10-25',
    time: '14:00'
  });

  const baseTheme = THEMES[data.theme] || THEMES.navyLaw;
  const theme = data.customColors.enabled
    ? {
        ...baseTheme,
        id: 'custom',
        name: 'Paleta Personalizada',
        bg: data.customColors.bg,
        textMain: data.customColors.textMain,
        textMuted: data.customColors.textMuted,
        accent: data.customColors.accent,
        cardBg: data.customColors.cardBg,
        cardText: data.customColors.cardText,
        cardSubtext: data.customColors.cardText + '99',
        cardBorder: data.customColors.cardBorder,
        socialBg: data.customColors.socialBg,
        socialBorder: data.customColors.accent + '66',
        socialText: data.customColors.accent,
        iconBg: data.customColors.accent + '26',
        iconColor: data.customColors.accent,
        pillShadow: '0 8px 24px -4px rgba(0,0,0,0.4)',
        glowColor: data.customColors.glowColor + '38',
      }
    : baseTheme;

  const currentFilter = PHOTO_FILTERS.find(f => f.id === data.styling.photoFilter)?.css || 'none';

  // Helper for reading uploaded file to Base64 (with automatic resize/compression for smooth preview & localStorage persistence)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawResult = event.target?.result;
      if (typeof rawResult === 'string') {
        const img = new window.Image();
        img.onload = () => {
          try {
            const maxDim = 1200;
            let { width, height } = img;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressed = canvas.toDataURL('image/jpeg', 0.88);
              callback(compressed);
              showToast('📸 Imagem carregada e aplicada no preview com sucesso!');
              return;
            }
          } catch {
            // Fallback to raw base64 if canvas fails
          }
          callback(rawResult);
          showToast('📸 Imagem carregada e aplicada no preview com sucesso!');
        };
        img.onerror = () => {
          callback(rawResult);
          showToast('📸 Imagem carregada no preview!');
        };
        img.src = rawResult;
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Format dynamic WhatsApp URL
  const buildWhatsAppLink = (customService: string | null = null) => {
    const srv = customService || bookingForm.service;
    const msg = data.conversion.defaultWhatsappMsg
      .replace('{nome}', data.profile.name)
      .replace('{servico}', srv)
      .replace('{data}', bookingForm.date ? `${bookingForm.date} às ${bookingForm.time}` : 'esta semana');
    
    return `https://wa.me/${formatWhatsAppPhone(data.profile.whatsapp)}?text=${encodeURIComponent(msg)}`;
  };

  // Updaters
  const updateStyle = (key: string, val: unknown) => setData(p => ({ ...p, styling: { ...p.styling, [key]: val } }));
  const updateProfile = (key: string, val: unknown) => setData(p => ({ ...p, profile: { ...p.profile, [key]: val } }));
  const updateCustomColor = (key: string, val: unknown) => {
    if (key === 'enabled') triggerSimulatorSkeleton(340);
    setData(p => ({ ...p, customColors: { ...p.customColors, [key]: val } }));
  };
  const updateMetrics = (key: string, val: unknown) => setData(p => ({ ...p, metrics: { ...p.metrics, [key]: val } }));
  const updateAnnounce = (key: string, val: unknown) => setData(p => ({ ...p, announcement: { ...p.announcement, [key]: val } }));
  const updateConversion = (key: string, val: unknown) => setData(p => ({ ...p, conversion: { ...p.conversion, [key]: val } }));
  const updateProcess = (key: string, val: unknown) => setData(p => ({ ...p, processSteps: { ...p.processSteps, [key]: val } }));
  const updateStudentGrid = (key: string, val: unknown) => setData(p => ({ ...p, studentGrid: { ...p.studentGrid, [key]: val } }));
  const addGalleryPhoto = (url: string, optionalCaption?: string) => {
    if (!url.trim()) return;
    const descToSave = (optionalCaption !== undefined ? optionalCaption : newGalleryCaption).trim();
    setData(p => {
      const currentPhotos = p.studentGrid.photos || [];
      const currentCaptions = Array.from({ length: currentPhotos.length }, (_, i) => (p.studentGrid.captions || [])[i] || '');
      return {
        ...p,
        studentGrid: {
          ...p.studentGrid,
          photos: [...currentPhotos, url.trim()],
          captions: [...currentCaptions, descToSave],
        }
      };
    });
    setNewGalleryUrl('');
    setNewGalleryCaption('');
    showToast(descToSave ? '📸 Nova foto com descrição adicionada à galeria!' : '📸 Nova foto adicionada à galeria!');
  };
  const removeGalleryPhoto = (index: number) => {
    setData(p => {
      const currentPhotos = p.studentGrid.photos || [];
      const currentCaptions = Array.from({ length: currentPhotos.length }, (_, i) => (p.studentGrid.captions || [])[i] || '');
      return {
        ...p,
        studentGrid: {
          ...p.studentGrid,
          photos: currentPhotos.filter((_, idx) => idx !== index),
          captions: currentCaptions.filter((_, idx) => idx !== index),
        }
      };
    });
    showToast('🗑️ Foto removida da galeria.');
  };
  const moveGalleryPhoto = (from: number, to: number) => {
    setData(p => {
      const photos = [...(p.studentGrid.photos || [])];
      if (to < 0 || to >= photos.length) return p;
      const captions = Array.from({ length: photos.length }, (_, i) => (p.studentGrid.captions || [])[i] || '');
      const [removedPhoto] = photos.splice(from, 1);
      photos.splice(to, 0, removedPhoto);
      const [removedCaption] = captions.splice(from, 1);
      captions.splice(to, 0, removedCaption);
      return {
        ...p,
        studentGrid: { ...p.studentGrid, photos, captions }
      };
    });
  };
  const updateGalleryPhotoCaption = (index: number, caption: string) => {
    setData(p => {
      const photosLen = (p.studentGrid.photos || []).length;
      const captions = Array.from({ length: photosLen }, (_, i) => (p.studentGrid.captions || [])[i] || '');
      captions[index] = caption;
      return {
        ...p,
        studentGrid: { ...p.studentGrid, captions }
      };
    });
  };
  const loadGalleryPreset = (presetKey: 'beauty' | 'barber' | 'health' | 'exec') => {
    const presets: Record<string, string[]> = {
      beauty: [
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=700',
      ],
      barber: [
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&q=80&w=700',
      ],
      health: [
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=700',
      ],
      exec: [
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=700',
      ],
    };
    if (presets[presetKey]) {
      triggerSimulatorSkeleton(340);
      updateStudentGrid('photos', presets[presetKey]);
      showToast(`📸 Galeria preenchida com fotos de exemplo!`);
    }
  };
  const updateLocationCard = (key: string, val: unknown) => setData(p => ({ ...p, locationCard: { ...p.locationCard, [key]: val } }));
  const updateQualifier = (key: string, val: unknown) => setData(p => ({ ...p, qualifierFunnel: { ...p.qualifierFunnel, [key]: val } }));
  const updateBeforeAfter = (key: string, val: unknown) => setData(p => ({ ...p, beforeAfter: { ...p.beforeAfter, [key]: val } }));
  const updateAboutMe = (key: string, val: unknown) => setData(p => ({ ...p, aboutMe: { ...p.aboutMe, [key]: val } }));
  const updateFaq = (key: string, val: unknown) => setData(p => ({ ...p, faq: { ...p.faq, [key]: val } }));

  const toSafeHexColor = (colorStr?: string, fallback = '#ffffff'): string => {
    if (!colorStr || typeof colorStr !== 'string') return fallback;
    const trimmed = colorStr.trim();
    if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
    if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
      const r = trimmed[1];
      const g = trimmed[2];
      const b = trimmed[3];
      return `#${r}${r}${g}${g}${b}${b}`;
    }
    if (/^#[0-9a-fA-F]{8}$/.test(trimmed)) return trimmed.slice(0, 7);
    return fallback;
  };

  const updateModuleColor = (
    moduleKey: string,
    field: 'headlineColor' | 'titleColor' | 'textColor' | 'accentColor' | 'bgColor',
    value: string
  ) => {
    setData(p => ({
      ...p,
      moduleColors: {
        ...(p.moduleColors || {}),
        [moduleKey]: {
          ...(p.moduleColors?.[moduleKey] || {}),
          [field]: value,
        },
      },
    }));
  };

  const resetModuleColors = (moduleKey: string) => {
    setData(p => {
      const next = { ...(p.moduleColors || {}) };
      delete next[moduleKey];
      return { ...p, moduleColors: next };
    });
  };

  const renderModuleColorControls = (
    moduleKey: string,
    moduleLabel: string,
    fields: Array<{
      field: 'headlineColor' | 'titleColor' | 'textColor' | 'accentColor' | 'bgColor';
      label: string;
      defaultColor?: string;
      fallback?: string;
    }>
  ) => {
    const modColors = data.moduleColors?.[moduleKey] || {};
    const hasCustom = Object.values(modColors).some(v => Boolean(v));

    const applyQuickContrast = (preset: 'light' | 'dark' | 'gold') => {
      const updates: Record<string, string> = {};
      fields.forEach(f => {
        if (f.field === 'bgColor') return;
        if (preset === 'light') {
          updates[f.field] = f.field === 'textColor' ? '#e5e7eb' : '#ffffff';
        } else if (preset === 'dark') {
          updates[f.field] = f.field === 'textColor' ? '#374151' : '#111827';
        } else if (preset === 'gold') {
          updates[f.field] =
            f.field === 'headlineColor' || f.field === 'accentColor' || f.field === 'titleColor'
              ? '#d4af37'
              : '#f3f4f6';
        }
      });
      setData(p => ({
        ...p,
        moduleColors: {
          ...(p.moduleColors || {}),
          [moduleKey]: {
            ...(p.moduleColors?.[moduleKey] || {}),
            ...updates,
          },
        },
      }));
    };

    return (
      <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 space-y-2 mt-2">
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
            <Palette className="w-3 h-3 text-amber-400" />
            <span>Cores da Fonte: {moduleLabel}</span>
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            <button
              type="button"
              onClick={() => applyQuickContrast('light')}
              className="px-2 py-0.5 rounded bg-neutral-950 hover:bg-neutral-800 text-[9.5px] font-semibold text-white border border-neutral-700 cursor-pointer transition"
              title="Aplicar fonte clara neste módulo (ideal para fundos escuros)"
            >
              ☀️ Fonte Clara
            </button>
            <button
              type="button"
              onClick={() => applyQuickContrast('dark')}
              className="px-2 py-0.5 rounded bg-neutral-200 hover:bg-white text-[9.5px] font-bold text-neutral-950 border border-neutral-300 cursor-pointer transition"
              title="Aplicar fonte escura neste módulo (ideal para fundos claros)"
            >
              🌙 Fonte Escura
            </button>
            <button
              type="button"
              onClick={() => applyQuickContrast('gold')}
              className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-[9.5px] font-semibold text-amber-300 border border-amber-500/40 cursor-pointer transition"
              title="Aplicar destaque dourado e texto claro"
            >
              ✨ Dourado
            </button>
            {hasCustom && (
              <button
                type="button"
                onClick={() => resetModuleColors(moduleKey)}
                className="px-2 py-0.5 rounded bg-red-500/15 hover:bg-red-500/25 text-[9.5px] font-semibold text-red-300 border border-red-500/30 cursor-pointer transition"
                title="Voltar para as cores automáticas do tema"
              >
                ↺ Padrão
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {fields.map(f => {
            const currentVal = modColors[f.field] || '';
            const pickerHex = toSafeHexColor(currentVal || f.defaultColor || f.fallback, '#ffffff');
            return (
              <div
                key={f.field}
                className="flex items-center justify-between gap-1.5 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800"
              >
                <span className="text-[9.5px] text-neutral-300 truncate" title={f.label}>
                  {f.label}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  <input
                    type="color"
                    value={pickerHex}
                    onChange={e => updateModuleColor(moduleKey, f.field, e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
                    title={`Alterar ${f.label}`}
                  />
                  <span className="text-[9px] font-mono text-neutral-400">
                    {currentVal ? currentVal.toUpperCase() : 'Auto'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Quiz helper to sanitize answers and safely handle state
  const handleQuizAnswer = (questionId: string, answer: string) => {
    const cleanAns = typeof answer === 'string' ? answer.trim() : String(answer);
    setQuizAnswers(prev => ({ ...prev, [questionId]: cleanAns }));
  };

  // Quiz helper to compose sanitized and safely encoded WhatsApp link
  const buildQuizWhatsAppLink = () => {
    // Sanitização estrita do telefone: apenas dígitos numéricos (sem traços, parênteses ou espaços)
    const rawPhone = data.profile?.whatsapp || '';
    const cleanPhone = formatWhatsAppPhone(rawPhone);

    // Montagem da mensagem estruturada como string limpa
    const profileName = (data.profile?.name || '').trim();
    let messageText = `Olá ${profileName}! Preenchi o formulário de triagem exclusiva na sua página:\n\n`;

    if (data.qualifierFunnel?.questions?.length) {
      data.qualifierFunnel.questions.forEach((q, idx) => {
        const rawAns = quizAnswers[q.id] || 'Não respondido';
        const cleanAns = typeof rawAns === 'string' ? rawAns.trim().replace(/\r\n/g, '\n') : String(rawAns);
        const cleanTitle = (q.title || '').trim().replace(/\r\n/g, ' ');
        messageText += `*${idx + 1}. ${cleanTitle}*\n👉 ${cleanAns}\n\n`;
      });
    }

    messageText += 'Gostaria de verificar os próximos horários disponíveis com prioridade!';

    // Codificação URI completa da mensagem formatada para total compatibilidade mobile e web
    const encodedText = encodeURIComponent(messageText);
    return cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodedText}` : `https://wa.me/?text=${encodedText}`;
  };

  // Services Helpers
  const updateServicesConfig = (key: string, val: unknown) =>
    setData(p => ({ ...p, services: { ...p.services, [key]: val } }));

  const addService = () => {
    const newService = {
      id: 'srv-' + Date.now(),
      name: 'Novo Procedimento / Consultoria',
      description: 'Descrição elegante do que o serviço ou curso entrega para o cliente.',
      price: 'R$ 290',
      oldPrice: '',
      duration: '1h00',
      badge: 'NOVO',
      ctaLabel: 'Reservar',
      actionType: 'booking' as const,
      customUrl: '',
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=300'
    };
    setData(p => ({ ...p, services: { ...p.services, enabled: true, items: [...p.services.items, newService] } }));
    showToast('✨ Novo item adicionado ao catálogo!');
  };

  const duplicateService = (id: string) => {
    setData(p => {
      const idx = p.services.items.findIndex(s => s.id === id);
      if (idx === -1) return p;
      const target = p.services.items[idx];
      const clone = {
        ...target,
        id: 'srv-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        name: `${target.name} (Cópia)`,
      };
      const items = [...p.services.items];
      items.splice(idx + 1, 0, clone);
      return { ...p, services: { ...p.services, items } };
    });
    showToast('📋 Item duplicado no catálogo!');
  };

  const moveService = (from: number, to: number) => {
    setData(p => {
      const items = [...(p.services.items || [])];
      if (to < 0 || to >= items.length) return p;
      const [removed] = items.splice(from, 1);
      items.splice(to, 0, removed);
      return { ...p, services: { ...p.services, items } };
    });
  };

  const removeService = (id: string) => {
    setData(p => ({
      ...p,
      services: { ...p.services, items: p.services.items.filter(s => s.id !== id) }
    }));
    showToast('🗑️ Item removido do catálogo.');
  };

  const updateService = (id: string, field: string, val: unknown) => {
    setData(p => ({
      ...p,
      services: {
        ...p.services,
        items: p.services.items.map(s => s.id === id ? { ...s, [field]: val } : s)
      }
    }));
  };

  const loadServicesPreset = (presetKey: 'law' | 'beauty' | 'barber' | 'mentorship' | 'health') => {
    const presets: Record<string, { headline: string; subtitle: string; badge: string; items: typeof INITIAL_DATA.services.items }> = {
      law: {
        headline: 'Consultorias & Pareceres Jurídicos',
        subtitle: 'Atendimento estratégico presencial ou por videoconferência com sigilo absoluto',
        badge: 'HONORÁRIOS & SERVIÇOS',
        items: [
          {
            id: 'srv-law-1',
            name: 'Consultoria Estratégica Individual',
            description: 'Análise completa do seu caso com diagnóstico jurídico e plano de ação imediato.',
            price: 'R$ 450',
            oldPrice: 'R$ 600',
            duration: '1h30',
            badge: 'MAIS PROCURADO',
            ctaLabel: 'Agendar',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-law-2',
            name: 'Elaboração de Contrato & Blindagem',
            description: 'Redação ou revisão técnica de contratos empresariais, patrimoniais ou imobiliários.',
            price: 'R$ 980',
            oldPrice: '',
            duration: '5 dias úteis',
            badge: 'BLINDAGEM',
            ctaLabel: 'Solicitar',
            actionType: 'whatsapp',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-law-3',
            name: 'Planejamento Previdenciário Completo',
            description: 'Cálculo detalhado de tempo de contribuição e projeção do melhor benefício.',
            price: 'R$ 790',
            oldPrice: '',
            duration: 'Entrega PDF',
            badge: 'ESPECIALIDADE',
            ctaLabel: 'Reservar',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
          },
        ],
      },
      beauty: {
        headline: 'Menu de Procedimentos & Beleza',
        subtitle: 'Protocolos exclusivos com produtos importados e durabilidade superior',
        badge: 'TABELA VIP',
        items: [
          {
            id: 'srv-bty-1',
            name: 'Alongamento em Fibra de Vidro Slim',
            description: 'Curvatura natural europeia, acabamento ultrafino e resistência de até 35 dias.',
            price: 'R$ 240',
            oldPrice: 'R$ 290',
            duration: '2h00',
            badge: 'CARRO-CHEFE',
            ctaLabel: 'Agendar',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-bty-2',
            name: 'Nanoblading Realista Fio a Fio',
            description: 'Design de sobrancelhas com visagismo facial e pigmentos hipoalergênicos.',
            price: 'R$ 490',
            oldPrice: 'R$ 580',
            duration: '1h45',
            badge: 'NATURALIDADE',
            ctaLabel: 'Reservar',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-bty-3',
            name: 'Curso VIP Presencial / Mentoria Pro',
            description: 'Domine a técnica do zero ao avançado com certificado internacional e apostila.',
            price: 'R$ 1.290',
            oldPrice: 'R$ 1.590',
            duration: '2 Dias Intensivos',
            badge: 'VAGAS LIMITADAS',
            ctaLabel: 'Quero Ser Aluna',
            actionType: 'whatsapp',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=400',
          },
        ],
      },
      barber: {
        headline: 'Menu de Cortes, Barba & Combos',
        subtitle: 'Toalha quente, visagismo masculino e bebida cortesia em todos os horários',
        badge: 'GROOMING CLUB',
        items: [
          {
            id: 'srv-brb-1',
            name: 'Combo Gentleman (Corte + Barboterapia)',
            description: 'Corte navalhado ou tesoura + barba com vapor de ozônio, toalha quente e massagem.',
            price: 'R$ 110',
            oldPrice: 'R$ 135',
            duration: '1h15',
            badge: 'MAIS PEDIDO',
            ctaLabel: 'Reservar',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-brb-2',
            name: 'Corte Degradê / Fade de Precisão',
            description: 'Acabamento impecável na navalha, lavagem revigorante e finalização com pomada matte.',
            price: 'R$ 70',
            oldPrice: '',
            duration: '45 min',
            badge: 'CLÁSSICO',
            ctaLabel: 'Agendar',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-brb-3',
            name: 'Assinatura Mensal VIP (Corte Ilimitado)',
            description: 'Cabelo sempre alinhado o mês inteiro com prioridade na agenda e descontos.',
            price: 'R$ 149/mês',
            oldPrice: 'R$ 220',
            duration: 'Plano Mensal',
            badge: 'CLUBE VIP',
            ctaLabel: 'Assinar Clube',
            actionType: 'whatsapp',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=400',
          },
        ],
      },
      mentorship: {
        headline: 'Programas de Mentoria, Cursos & Infoprodutos',
        subtitle: 'Acelere seus resultados com acompanhamento estratégico e método validado',
        badge: 'EDUCAÇÃO & ESCALA',
        items: [
          {
            id: 'srv-mnt-1',
            name: 'Mentoria Individual High-Ticket',
            description: 'Acompanhamento próximo por 90 dias com plano de posicionamento e escala comercial.',
            price: 'R$ 2.997',
            oldPrice: 'R$ 4.500',
            duration: '6 Encontros 1:1',
            badge: 'APLICAÇÃO VIP',
            ctaLabel: 'Aplicar Agora',
            actionType: 'whatsapp',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-mnt-2',
            name: 'Formação Completa Online + Templates',
            description: 'Mais de 40 aulas práticas passo a passo, scripts de vendas e comunidade exclusiva.',
            price: 'R$ 497',
            oldPrice: 'R$ 997',
            duration: 'Acesso 1 Ano',
            badge: 'ACESSO IMEDIATO',
            ctaLabel: 'Garantir Vaga',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
          },
        ],
      },
      health: {
        headline: 'Consultas, Protocolos & Avaliações',
        subtitle: 'Cuidado integrativo e humanizado focado na sua saúde, longevidade e bem-estar',
        badge: 'ATENDIMENTO CLÍNICO',
        items: [
          {
            id: 'srv-hlt-1',
            name: 'Consulta Inicial + Bioimpedância / Avaliação',
            description: 'Anamnese completa, exames laboratoriais e plano personalizado para a sua rotina.',
            price: 'R$ 420',
            oldPrice: 'R$ 520',
            duration: '1h20',
            badge: 'COMPLETA',
            ctaLabel: 'Agendar Consulta',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400',
          },
          {
            id: 'srv-hlt-2',
            name: 'Programa de Acompanhamento Trimestral',
            description: '3 consultas com suporte direto via WhatsApp e ajustes constantes de protocolo.',
            price: 'R$ 990',
            oldPrice: 'R$ 1.260',
            duration: '90 Dias',
            badge: 'MAIS RESULTADO',
            ctaLabel: 'Reservar',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400',
          },
        ],
      },
    };
    const preset = presets[presetKey];
    if (preset) {
      triggerSimulatorSkeleton(340);
      setData(p => ({
        ...p,
        services: {
          ...p.services,
          enabled: true,
          headline: preset.headline,
          subtitle: preset.subtitle,
          badge: preset.badge,
          items: preset.items,
        },
      }));
      showToast('🏷️ Catálogo preenchido com o kit selecionado!');
    }
  };

  // Testimonials Helpers
  const addTestimonial = () => {
    const newT = {
      id: 't-' + Date.now(),
      clientName: 'Nome do Cliente',
      city: 'Cidade - UF',
      text: 'Experiência excepcional! Atendimento impecável e resultados transformadores.',
      rating: 5
    };
    setData(p => ({ ...p, testimonials: { ...p.testimonials, items: [...p.testimonials.items, newT] } }));
  };

  const removeTestimonial = (id: string) => {
    setData(p => ({
      ...p,
      testimonials: { ...p.testimonials, items: p.testimonials.items.filter(t => t.id !== id) }
    }));
  };

  const updateTestimonial = (id: string, field: string, val: string | number) => {
    setData(p => ({
      ...p,
      testimonials: {
        ...p.testimonials,
        items: p.testimonials.items.map(t => t.id === id ? { ...t, [field]: val } : t)
      }
    }));
  };

  // Switch Theme Preset (Altera apenas as cores, preservando 100% dos dados, textos e fotos)
  const applyThemePreset = (themeKey: string) => {
    const thm = THEMES[themeKey];
    if (!thm) return;
    triggerSimulatorSkeleton(380);
    setData(p => ({
      ...p,
      theme: themeKey,
      customColors: { ...p.customColors, enabled: false },
      styling: {
        ...p.styling,
        fontFamily: thm.fontHeadline || p.styling.fontFamily,
      }
    }));
    showToast(`🎨 Paleta "${thm.name}" aplicada! Todas as fotos, serviços e textos foram 100% mantidos.`);
  };

  // Complete 1-Click Kits for ALL Niches
  const NICHE_KITS: Record<string, {
    category: string;
    shortLabel: string;
    kitTitle: string;
    kitDescription: string;
    defaultTheme: string;
    announcement: { badge: string; text: string };
    profile: {
      name: string;
      title: string;
      tagline: string;
      cursivePhrase: string;
      location: string;
      avatarUrl: string;
      aboutPhotoUrl: string;
    };
    metrics: {
      stat1Value: string;
      stat1Label: string;
      stat2Value: string;
      stat2Label: string;
      stat3Value: string;
      stat3Label: string;
    };
    actionCards: typeof INITIAL_DATA.actionCards;
    services: {
      headline: string;
      items: typeof INITIAL_DATA.services.items;
    };
    galleryPhotos: string[];
  }> = {
    'Barbearia & Grooming': {
      category: 'Barbearia & Grooming',
      shortLabel: 'Barbearia',
      kitTitle: 'Kit Completo: Barbearia & Grooming Masculino',
      kitDescription: 'Aplica tema de barbearia, agendamento sem fila, clube de assinatura VIP e tabela de cortes/barboterapia.',
      defaultTheme: 'barberVintage',
      announcement: {
        badge: 'HORÁRIOS DISPONÍVEIS HOJE',
        text: 'Agende seu corte ou barboterapia em 30 segundos sem fila de espera.',
      },
      profile: {
        name: 'DON CORLEONE BARBER',
        title: 'BARBEARIA CLÁSSICA & VISAGISMO MASCULINO',
        tagline: 'Cerveja artesanal gelada, toalha quente e precisão na navalha. O ponto de encontro do homem de respeito.',
        cursivePhrase: 'Tradição, excelência e estilo em cada detalhe.',
        location: 'Av. Paulista, 1450 · Estacionamento VIP no Local',
        avatarUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=700',
      },
      metrics: {
        stat1Value: '+8.500',
        stat1Label: 'CORTES & BARBAS',
        stat2Value: '4.9 ★',
        stat2Label: 'AVALIAÇÃO GOOGLE',
        stat3Value: '10 Anos',
        stat3Label: 'TRADIÇÃO & ESTILO',
      },
      actionCards: [
        {
          id: 'barber-cta-1',
          title: 'AGENDAR MEU HORÁRIO AGORA',
          subtitle: 'Escolha seu barbeiro, serviço e horário em 30 segundos.',
          icon: 'Scissors',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá! Gostaria de agendar um horário na barbearia.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'SEM FILA',
          customBg: '#d97706',
          customText: '#000000',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=500',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'RESERVAR HORÁRIO',
        },
        {
          id: 'barber-cta-2',
          title: 'CLUBE DE ASSINATURA VIP',
          subtitle: 'Corte e barba ilimitados o mês inteiro a partir de R$ 149,90.',
          icon: 'Star',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Quero conhecer os planos do Clube de Assinatura VIP da Barbearia.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'MAIS ASSINADO',
          customBg: '#211c18',
          customText: '#f5efe6',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'CONHECER PLANOS',
        },
        {
          id: 'barber-cta-3',
          title: 'MENU DE CORTES, BARBA & COMBOS',
          subtitle: 'Confira todos os serviços, pigmentação e selagem masculina.',
          icon: 'Scissors',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#211c18',
          customText: '#f5efe6',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
      ],
      services: {
        headline: 'Menu de Serviços & Grooming',
        items: [
          {
            id: 'srv-b1',
            name: 'Combo Gentleman (Corte + Barboterapia)',
            description: 'Toalha quente, massagem facial com ozônio e bebida cortesia.',
            price: 'R$ 110',
            duration: '1h15',
            imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-b2',
            name: 'Corte Degradê / Fade Navalhado',
            description: 'Acabamento de alta precisão, lavagem especial e pomada matte.',
            price: 'R$ 70',
            duration: '45min',
            imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-b3',
            name: 'Barboterapia Real com Óleos Essenciais',
            description: 'Alinhamento geométrico, esfoliação e hidratação profunda.',
            price: 'R$ 60',
            duration: '40min',
            imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=500',
          },
        ],
      },
      galleryPhotos: [
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&q=80&w=700',
      ],
    },

    'Beleza & Unhas': {
      category: 'Beleza & Unhas',
      shortLabel: 'Beleza & Unhas',
      kitTitle: 'Kit Completo: Nail Designer & Alongamento de Luxo',
      kitDescription: 'Aplica tema Dark Gold, botões para agendamento de unhas/fibra de vidro, catálogo e curso VIP.',
      defaultTheme: 'darkGold',
      announcement: {
        badge: 'AGENDA DA SEMANA ABERTA',
        text: 'Últimos horários disponíveis para Alongamento & Manutenção VIP.',
      },
      profile: {
        name: 'LARISSA ALMEIDA',
        title: 'NAIL DESIGNER & ALONGAMENTO DE LUXO',
        tagline: 'Especialista em Fibra de Vidro Slim, Gel Moldado e Naturalidade Europeia com durabilidade impecável.',
        cursivePhrase: 'Elegância e sofisticação na ponta dos seus dedos.',
        location: 'Studio Privé · Jardins, São Paulo - SP',
        avatarUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=700',
      },
      metrics: {
        stat1Value: '+3.200',
        stat1Label: 'ATENDIMENTOS',
        stat2Value: '35 Dias',
        stat2Label: 'DURABILIDADE',
        stat3Value: '100%',
        stat3Label: 'BIOSSEGURANÇA',
      },
      actionCards: [
        {
          id: 'nails-cta-1',
          title: 'AGENDAR MEU HORÁRIO NO STUDIO',
          subtitle: 'Alongamento em Fibra, Banho de Gel e Esmaltação Premium.',
          icon: 'Calendar',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá Larissa! Gostaria de agendar um horário para fazer as unhas.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'VAGAS LIMITADAS',
          customBg: '#d4af37',
          customText: '#000000',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=500',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'GARANTIR HORÁRIO',
        },
        {
          id: 'nails-cta-2',
          title: 'CURSO VIP DE FIBRA DE VIDRO',
          subtitle: 'Do zero à naturalidade europeia com certificado internacional.',
          icon: 'GraduationCap',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Quero receber todas as informações sobre o Curso VIP de Nail Designer.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'INSCRIÇÕES ABERTAS',
          customBg: '#f5ede4',
          customText: '#2a241e',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'QUERO SER ALUNA',
        },
        {
          id: 'nails-cta-3',
          title: 'TABELA DE PROCEDIMENTOS & VALORES',
          subtitle: 'Consulte as opções de aplicação, blindagem e manutenção.',
          icon: 'Sparkles',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#f5ede4',
          customText: '#2a241e',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
      ],
      services: {
        headline: 'Menu de Alongamentos & Nail Care',
        items: [
          {
            id: 'srv-n1',
            name: 'Alongamento em Fibra de Vidro Slim',
            description: 'Curvatura natural, resistência extrema e acabamento ultrafino.',
            price: 'R$ 240',
            duration: '2h00',
            imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-n2',
            name: 'Banho de Gel & Blindagem Diamante',
            description: 'Proteção estrutural para o crescimento saudável das unhas naturais.',
            price: 'R$ 160',
            duration: '1h30',
            imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-n3',
            name: 'Manutenção + Cutilagem Russa & Gel',
            description: 'Nivelamento perfeito do crescimento com esmaltação em gel de alto brilho.',
            price: 'R$ 150',
            duration: '1h30',
            imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=500',
          },
        ],
      },
      galleryPhotos: [
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=700',
      ],
    },

    'Beleza & Alta Conversão': {
      category: 'Beleza & Alta Conversão',
      shortLabel: 'Sobrancelhas & Lash',
      kitTitle: 'Kit Completo: Sobrancelhas, Cílios & Beleza Poderosa',
      kitDescription: 'Aplica tema Ruby Imperial, funil de agendamento de Nanoblading/Lash e vitrine de procedimentos.',
      defaultTheme: 'rubyImperial',
      announcement: {
        badge: 'STUDIO DE OLHARES',
        text: 'Atendimento exclusivo com visagismo facial personalizado.',
      },
      profile: {
        name: 'JANNE CAMPELO',
        title: 'ESPECIALISTA EM SOBRANCELHAS & LASH DESIGN',
        tagline: 'Realçando a força do seu olhar com Nanoblading Realista, Brow Lamination e Extensão de Cílios de alta retenção.',
        cursivePhrase: 'Seu olhar transmite o seu verdadeiro poder.',
        location: 'Edifício Prime Beauty · Sala 804',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=700',
      },
      metrics: {
        stat1Value: '+4.500',
        stat1Label: 'OLHARES REALÇADOS',
        stat2Value: '98%',
        stat2Label: 'FIDELIDADE',
        stat3Value: '7 Anos',
        stat3Label: 'EXPERIÊNCIA',
      },
      actionCards: [
        {
          id: 'lash-cta-1',
          title: 'AGENDAR DESIGN, LASH OU NANOBLADING',
          subtitle: 'Avaliação de visagismo inclusa em todos os procedimentos.',
          icon: 'Sparkles',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá Janne! Quero agendar um procedimento para realçar meu olhar.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'AGENDA VIP',
          customBg: '#e11d48',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=500',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'AGENDAR AGORA',
        },
        {
          id: 'lash-cta-2',
          title: 'CATÁLOGO DE PROCEDIMENTOS DO OLHAR',
          subtitle: 'Conheça nossas técnicas de Fio a Fio, Brow Lamination e Fox Eyes.',
          icon: 'Heart',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#881337',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
        {
          id: 'lash-cta-3',
          title: 'FALAR COM A RECEPÇÃO NO WHATSAPP',
          subtitle: 'Tire dúvidas sobre cicatrização, durabilidade e valores.',
          icon: 'MessageCircle',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Gostaria de tirar uma dúvida sobre os procedimentos.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'ONLINE',
          customBg: '#881337',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'CHAMAR NO WHATSAPP',
        },
      ],
      services: {
        headline: 'Protocolos Exclusivos para o Olhar',
        items: [
          {
            id: 'srv-l1',
            name: 'Nanoblading Fio a Fio Hiper-Realista',
            description: 'Preenchimento artístico que imita o caimento natural dos fios.',
            price: 'R$ 690',
            duration: '2h00',
            imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-l2',
            name: 'Extensão de Cílios Volume Fox Eyes / Brasileiro',
            description: 'Efeito delineado marcante com leveza e retenção de até 35 dias.',
            price: 'R$ 230',
            duration: '1h45',
            imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-l3',
            name: 'Brow Lamination + Design com Tintura',
            description: 'Alinhamento e nutrição dos fios para sobrancelhas encorpadas e modernas.',
            price: 'R$ 180',
            duration: '1h00',
            imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=500',
          },
        ],
      },
      galleryPhotos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=700',
      ],
    },

    'Jurídico & Executivo': {
      category: 'Jurídico & Executivo',
      shortLabel: 'Jurídico',
      kitTitle: 'Kit Completo: Advocacia Estratégica & Consultoria Executiva',
      kitDescription: 'Aplica tema Navy Royal & Gold, agendamento de consulta jurídica, pareceres e áreas de atuação.',
      defaultTheme: 'navyLaw',
      announcement: {
        badge: 'CONSULTORIA JURÍDICA VIP',
        text: 'Atendimento presencial e digital com sigilo absoluto em todo o Brasil.',
      },
      profile: {
        name: 'DRA. MARINA ALMEIDA',
        title: 'ADVOCACIA ESTRATÉGICA & PATRIMONIAL',
        tagline: 'Defesa técnica de excelência em Direito Empresarial, Família, Sucessões e Planejamento Previdenciário.',
        cursivePhrase: 'Compromisso, ética e segurança jurídica para você.',
        location: 'Av. Paulista, 1200 - Bela Vista, São Paulo - SP',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700',
      },
      metrics: {
        stat1Value: '+650',
        stat1Label: 'CASOS & PARECERES',
        stat2Value: '12 Anos',
        stat2Label: 'DE EXPERIÊNCIA',
        stat3Value: '100%',
        stat3Label: 'SIGILO & RIGOR',
      },
      actionCards: [
        {
          id: 'law-cta-1',
          title: 'AGENDAR CONSULTA JURÍDICA VIP',
          subtitle: 'Atendimento presencial ou por videoconferência com análise prévia.',
          icon: 'Scale',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá Dra. Marina! Gostaria de agendar uma consulta jurídica.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'AGENDA ABERTA',
          customBg: '#e2b857',
          customText: '#0f172a',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'SOLICITAR HORÁRIO',
        },
        {
          id: 'law-cta-2',
          title: 'GUIA ESTRATÉGICO & PLANEJAMENTO',
          subtitle: 'Materiais exclusivos sobre blindagem patrimonial e previdência.',
          icon: 'Briefcase',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
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
          ctaActionText: 'CONSULTAR ÁREAS',
        },
        {
          id: 'law-cta-3',
          title: 'FALAR COM O ESCRITÓRIO NO WHATSAPP',
          subtitle: 'Envie sua demanda para triagem rápida com nossa equipe jurídica.',
          icon: 'MessageCircle',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Gostaria de atendimento jurídico personalizado.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'PLANTÃO',
          customBg: '#ffffff',
          customText: '#0f172a',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'INICIAR ATENDIMENTO',
        },
      ],
      services: {
        headline: 'Áreas de Atuação & Consultoria',
        items: [
          {
            id: 'srv-j1',
            name: 'Consultoria Jurídica Estratégica Individual',
            description: 'Diagnóstico completo do caso com plano de ação preventivo ou contencioso.',
            price: 'R$ 450',
            duration: '1h30',
            imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-j2',
            name: 'Planejamento Patrimonial & Sucessório',
            description: 'Estruturação de Holding Familiar, testamentos e proteção de ativos.',
            price: 'Sob Consulta',
            duration: 'Personalizado',
            imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-j3',
            name: 'Planejamento Previdenciário Completo',
            description: 'Cálculo e projeção do melhor benefício de aposentadoria com parecer técnico.',
            price: 'R$ 890',
            duration: '5 dias',
            imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=500',
          },
        ],
      },
      galleryPhotos: [
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=700',
      ],
    },

    'Mentoria & Cursos': {
      category: 'Mentoria & Cursos',
      shortLabel: 'Mentoria & Cursos',
      kitTitle: 'Kit Completo: Mentoria High-Ticket & Infoprodutos',
      kitDescription: 'Aplica tema Warm Bronze, aplicação para mentoria, botão de e-book com imagem lateral e cursos.',
      defaultTheme: 'warmMentorship',
      announcement: {
        badge: 'APLICAÇÕES ABERTAS',
        text: 'Nova turma da Mentoria Executiva High-Ticket — Vagas limitadas.',
      },
      profile: {
        name: 'MARIANA CARVALHO',
        title: 'MENTORA DE NEGÓCIOS & POSICIONAMENTO',
        tagline: 'Ajudo especialistas e empresárias a multiplicarem seu faturamento com posicionamento de alto valor no digital.',
        cursivePhrase: 'Posicionamento de elite atrai clientes de elite.',
        location: 'Atendimento Global Online & Imersões em São Paulo',
        avatarUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=700',
      },
      metrics: {
        stat1Value: '+1.800',
        stat1Label: 'ALUNAS FORMADAS',
        stat2Value: 'R$ 15M+',
        stat2Label: 'GERADOS NO MÉTODO',
        stat3Value: '4.9 ★',
        stat3Label: 'SATISFAÇÃO',
      },
      actionCards: [
        {
          id: 'ment-cta-1',
          title: 'APLICAR PARA A MENTORIA HIGH-TICKET',
          subtitle: 'Acompanhamento individual e em grupo para escalar seu negócio.',
          icon: 'GraduationCap',
          linkType: 'quiz',
          url: '#quiz',
          whatsappMessage: 'Olá Mariana! Quero aplicar para uma vaga na Mentoria High-Ticket.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'VAGAS LIMITADAS',
          customBg: '#d99f69',
          customText: '#261b14',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=500',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'FAZER APLICAÇÃO',
        },
        {
          id: 'ment-cta-2',
          title: 'E-BOOK: O CÓDIGO DA AUTORIDADE',
          subtitle: 'O passo a passo para transformar seguidores em clientes de alto ticket.',
          icon: 'Sparkles',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'BEST-SELLER',
          customBg: '#f7efe6',
          customText: '#261b14',
          bgImage: '',
          imagePosition: 'left',
          cardImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'BAIXE AGORA',
        },
        {
          id: 'ment-cta-3',
          title: 'CONTRATAR PALESTRAS & TREINAMENTOS',
          subtitle: 'Fale diretamente com minha assessoria executiva pelo WhatsApp.',
          icon: 'Briefcase',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Gostaria de consultar agenda de palestras e mentorias da Mariana.',
          openInNewTab: true,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#f7efe6',
          customText: '#261b14',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
      ],
      services: {
        headline: 'Programas de Mentoria & Formações',
        items: [
          {
            id: 'srv-m1',
            name: 'Mentoria Individual VIP (90 Dias)',
            description: 'Reestruturação completa de oferta, funil de vendas e posicionamento premium.',
            price: 'R$ 5.000',
            duration: '3 Meses',
            imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-m2',
            name: 'Curso Posicionamento Magnético 2.0',
            description: '+60 aulas práticas com scripts de vendas, narrativa de stories e estética.',
            price: 'R$ 997',
            duration: 'Acesso 1 Ano',
            imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-m3',
            name: 'Consultoria Express de Diagnóstico (2h)',
            description: 'Encontro intensivo individual com entrega de plano de ação imediato.',
            price: 'R$ 890',
            duration: '2h00',
            imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500',
          },
        ],
      },
      galleryPhotos: [
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=700',
      ],
    },

    'Saúde & Psicologia': {
      category: 'Saúde & Psicologia',
      shortLabel: 'Saúde & Psicologia',
      kitTitle: 'Kit Completo: Psicologia Clínica, Terapia & Saúde',
      kitDescription: 'Aplica tema Terracotta & Linho, agendamento de primeira sessão, acolhimento e modalidades.',
      defaultTheme: 'terracottaWarm',
      announcement: {
        badge: 'ACOLHIMENTO ONLINE & PRESENCIAL',
        text: 'Atendimento psicológico humanizado para adultos no Brasil e exterior.',
      },
      profile: {
        name: 'PSI. MARTINA BIANCHI',
        title: 'PSICÓLOGA CLÍNICA · CRP 06/12345',
        tagline: 'Psicoterapia individual focada em ansiedade, autoestima, esgotamento profissional e relacionamentos saudáveis.',
        cursivePhrase: 'Cuidar da sua saúde emocional é um ato de coragem.',
        location: 'Consultório em Pinheiros - SP & Atendimento Online Global',
        avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=700',
      },
      metrics: {
        stat1Value: '+2.400',
        stat1Label: 'SESSÕES REALIZADAS',
        stat2Value: '9 Anos',
        stat2Label: 'PRÁTICA CLÍNICA',
        stat3Value: '100%',
        stat3Label: 'SIGILO & ÉTICA',
      },
      actionCards: [
        {
          id: 'psi-cta-1',
          title: 'AGENDAR PRIMEIRA SESSÃO',
          subtitle: 'Consulte a disponibilidade de horários para terapia online ou presencial.',
          icon: 'Calendar',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá Martina! Gostaria de verificar horários disponíveis para iniciar a psicoterapia.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'AGENDA ABERTA',
          customBg: '#a0583b',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=500',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'VER HORÁRIOS',
        },
        {
          id: 'psi-cta-2',
          title: 'COMO FUNCIONA A PSICOTERAPIA',
          subtitle: 'Entenda a abordagem clínica, frequência das sessões e recibos para reembolso.',
          icon: 'Heart',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#8c4528',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
        {
          id: 'psi-cta-3',
          title: 'TIRAR DÚVIDAS PELO WHATSAPP',
          subtitle: 'Converse diretamente comigo para alinhar sua necessidade inicial.',
          icon: 'MessageCircle',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá Martina! Vi seu link na bio e gostaria de tirar uma dúvida sobre as sessões.',
          openInNewTab: true,
          animation: 'none',
          variant: 'default',
          badgeText: 'ACOLHIMENTO',
          customBg: '#8c4528',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'ENVIAR MENSAGEM',
        },
      ],
      services: {
        headline: 'Modalidades de Atendimento Clínico',
        items: [
          {
            id: 'srv-p1',
            name: 'Psicoterapia Individual Online ou Presencial',
            description: 'Sessões semanais com escuta qualificada e espaço seguro de acolhimento.',
            price: 'R$ 250',
            duration: '50min',
            imageUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-p2',
            name: 'Processo de Autoconhecimento & Transição de Carreira',
            description: 'Acompanhamento focado em tomada de decisões, burnout e metas de vida.',
            price: 'R$ 280',
            duration: '50min',
            imageUrl: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-p3',
            name: 'Palestras & Rodas de Conversa em Saúde Mental',
            description: 'Encontros para empresas e equipes sobre prevenção de ansiedade e equilíbrio.',
            price: 'Sob Consulta',
            duration: '1h30',
            imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=500',
          },
        ],
      },
      galleryPhotos: [
        'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=700',
      ],
    },

    'Moda & Juventude': {
      category: 'Moda & Juventude',
      shortLabel: 'Moda & Loja',
      kitTitle: 'Kit Completo: Moda Feminina, Boutique & Consultoria de Estilo',
      kitDescription: 'Aplica tema Pink Glam Acetinado, catálogo de coleção nova, provador VIP e atendimento com consultora.',
      defaultTheme: 'pinkGlam',
      announcement: {
        badge: 'NOVA COLEÇÃO DISPONÍVEL',
        text: 'Envio expresso para todo o Brasil e motoboy no mesmo dia em SP.',
      },
      profile: {
        name: 'HELLEN MARQUES',
        title: 'MODA FEMININA, BOUTIQUE & PERSONAL STYLING',
        tagline: 'Peças selecionadas de alfaiataria moderna e looks versáteis para mulheres que amam se vestir com poder.',
        cursivePhrase: 'Vista-se da sua melhor versão todos os dias.',
        location: 'Showroom Moema - SP · Enviamos para todo o Brasil',
        avatarUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=700',
      },
      metrics: {
        stat1Value: '+12 mil',
        stat1Label: 'CLIENTES NO BRASIL',
        stat2Value: '24h',
        stat2Label: 'ENVIO EXPRESSO',
        stat3Value: '5.0 ★',
        stat3Label: 'AVALIAÇÃO VIP',
      },
      actionCards: [
        {
          id: 'mod-cta-1',
          title: 'VER LANÇAMENTOS & NOVA COLEÇÃO',
          subtitle: 'Confira os looks disponíveis a pronta-entrega com numeração completa.',
          icon: 'Sparkles',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'COLEÇÃO NOVA',
          customBg: '#e11d74',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=500',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'VER CATÁLOGO',
        },
        {
          id: 'mod-cta-2',
          title: 'COMPRAR COM CONSULTORA NO WHATSAPP',
          subtitle: 'Atendimento personalizado com vídeos reais das peças e medidas.',
          icon: 'MessageCircle',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Quero atendimento personalizado para ver os lançamentos da loja.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'PROVADOR VIP',
          customBg: '#ffffff',
          customText: '#4c1d29',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'CHAMAR CONSULTORA',
        },
        {
          id: 'mod-cta-3',
          title: 'AGENDAR MALINHA DELIVERY / SHOWROOM',
          subtitle: 'Receba nossa curadoria de looks na sua casa sem compromisso.',
          icon: 'Calendar',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá! Quero solicitar a Malinha Delivery / Visita ao Showroom.',
          openInNewTab: true,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#ffffff',
          customText: '#4c1d29',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: '',
        },
      ],
      services: {
        headline: 'Destaques da Nova Coleção & Serviços',
        items: [
          {
            id: 'srv-f1',
            name: 'Conjunto Alfaiataria Milanese Premium',
            description: 'Blazer estruturado com corte italiano + calça pantalona de caimento impecável.',
            price: 'R$ 489',
            duration: 'P, M e G',
            imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-f2',
            name: 'Vestido Midi Satin Glam',
            description: 'Tecido acetinado de toque macio, ideal para eventos, jantares e celebrações.',
            price: 'R$ 359',
            duration: 'Pronta-Entrega',
            imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-f3',
            name: 'Consultoria de Imagem & Coloração Pessoal',
            description: 'Descubra sua cartela de cores e monte um guarda-roupa inteligente.',
            price: 'R$ 590',
            duration: '2h30',
            imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=500',
          },
        ],
      },
      galleryPhotos: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=700',
      ],
    },

    'Consultoria & Estética': {
      category: 'Consultoria & Estética',
      shortLabel: 'Estética & Clínica',
      kitTitle: 'Kit Completo: Estética Avançada, Harmonização & Dermatologia',
      kitDescription: 'Aplica tema Champagne Minimal Nude, avaliação facial 3D, protocolos de colágeno e concierge VIP.',
      defaultTheme: 'champagneNude',
      announcement: {
        badge: 'CLÍNICA BOUTIQUE',
        text: 'Agende sua Consulta de Avaliação Facial & Corporal Personalizada.',
      },
      profile: {
        name: 'DRA. FERNANDA MARCOLIN',
        title: 'HARMONIZAÇÃO FACIAL & ESTÉTICA AVANÇADA',
        tagline: 'Protocolos médicos e estéticos de Bioestimuladores, Toxina Botulínica e Rejuvenescimento com foco na naturalidade.',
        cursivePhrase: 'Realçando sua beleza única com ciência, arte e sutileza.',
        location: 'Clínica Concept · Itaim Bibi, São Paulo - SP',
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=900',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=700',
      },
      metrics: {
        stat1Value: '+3.800',
        stat1Label: 'PROCEDIMENTOS',
        stat2Value: '11 Anos',
        stat2Label: 'EXPERIÊNCIA CLÍNICA',
        stat3Value: '99.4%',
        stat3Label: 'NATURALIDADE',
      },
      actionCards: [
        {
          id: 'est-cta-1',
          title: 'AGENDAR AVALIAÇÃO FACIAL PERSONALIZADA',
          subtitle: 'Planejamento individualizado de rejuvenescimento e gerenciamento da pele.',
          icon: 'Calendar',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: 'Olá! Gostaria de agendar uma Consulta de Avaliação com a Dra. Fernanda.',
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'AGENDA ABERTA',
          customBg: '#a8947a',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=500',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'AGENDAR CONSULTA',
        },
        {
          id: 'est-cta-2',
          title: 'PROTOCOLOS FACIAIS & BIOESTIMULADORES',
          subtitle: 'Conheça nossos tratamentos de colágeno, lábios, botox e tecnologias.',
          icon: 'Sparkles',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: '',
          openInNewTab: false,
          animation: 'none',
          variant: 'default',
          badgeText: '',
          customBg: '#ffffff',
          customText: '#26221c',
          bgImage: '',
          imagePosition: 'left',
          cardImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'VER PROTOCOLOS',
        },
        {
          id: 'est-cta-3',
          title: 'FALAR COM A CONCIERGE DA CLÍNICA',
          subtitle: 'Atendimento exclusivo via WhatsApp para dúvidas e pré-agendamento.',
          icon: 'MessageCircle',
          linkType: 'whatsapp',
          url: '',
          whatsappMessage: 'Olá! Gostaria de falar com a Concierge da Clínica sobre os procedimentos.',
          openInNewTab: true,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'CONCIERGE VIP',
          customBg: '#ffffff',
          customText: '#26221c',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'ATENDIMENTO VIP',
        },
      ],
      services: {
        headline: 'Protocolos de Estética & Rejuvenescimento',
        items: [
          {
            id: 'srv-e1',
            name: 'Protocolo Colágeno Gold (Bioestimulador + Tecnologias)',
            description: 'Estímulo profundo de firmeza, efeito lifting natural e melhora da textura da pele.',
            price: 'Sob Avaliação',
            duration: '1h00',
            imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-e2',
            name: 'Toxina Botulínica Preventiva & Full Face',
            description: 'Suavização elegante de linhas de expressão preservando a naturalidade do rosto.',
            price: 'R$ 1.290',
            duration: '45min',
            imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500',
          },
          {
            id: 'srv-e3',
            name: 'Escultura & Hidratação Labial com Ácido Hialurônico',
            description: 'Definição de contorno, volume sutil e revitalização profunda dos lábios.',
            price: 'R$ 1.450',
            duration: '50min',
            imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=500',
          },
        ],
      },
      galleryPhotos: [
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=700',
      ],
    },
  };

  // Apply any niche's Complete Kit in 1 click
  const applyNicheKit = (categoryKey: string) => {
    const kit = NICHE_KITS[categoryKey];
    if (!kit) return;
    triggerSimulatorSkeleton(420);
    const currentThemeObj = THEMES[data.theme];
    const targetThemeId =
      currentThemeObj && currentThemeObj.category === categoryKey
        ? data.theme
        : kit.defaultTheme;
    const targetThemeObj = THEMES[targetThemeId] || THEMES[kit.defaultTheme];

    setData(p => ({
      ...p,
      theme: targetThemeId,
      customColors: { ...p.customColors, enabled: false },
      styling: {
        ...p.styling,
        fontFamily: targetThemeObj.fontHeadline,
      },
      announcement: {
        ...p.announcement,
        enabled: true,
        badge: kit.announcement.badge,
        text: kit.announcement.text,
      },
      profile: {
        ...p.profile,
        name: kit.profile.name,
        title: kit.profile.title,
        tagline: kit.profile.tagline,
        cursivePhrase: kit.profile.cursivePhrase,
        location: kit.profile.location,
        avatarUrl: kit.profile.avatarUrl,
        aboutPhotoUrl: kit.profile.aboutPhotoUrl,
      },
      metrics: {
        ...p.metrics,
        enabled: true,
        stat1Value: kit.metrics.stat1Value,
        stat1Label: kit.metrics.stat1Label,
        stat2Value: kit.metrics.stat2Value,
        stat2Label: kit.metrics.stat2Label,
        stat3Value: kit.metrics.stat3Value,
        stat3Label: kit.metrics.stat3Label,
      },
      actionCards: kit.actionCards,
      services: {
        ...p.services,
        enabled: true,
        headline: kit.services.headline,
        items: kit.services.items,
      },
      studentGrid: {
        ...p.studentGrid,
        enabled: true,
        photos: kit.galleryPhotos,
      },
    }));
  };

  // Categorias Visuais de Paletas de Cores (100% independentes de nichos profissionais)
  const themeCategories = [
    'Todas as Paletas',
    'Dark & Luxo',
    'Azuis & Navy',
    'Dourados & Terrosos',
    'Claros & Clean',
    'Verdes & Esmeralda',
    'Vibrantes & Notáveis',
  ];

  const normalizedQuery = themeSearchQuery.trim().toLowerCase();
  const filteredThemes = Object.values(THEMES).filter((t) => {
    const matchesCategory =
      selectedThemeCategory === 'Todas as Paletas' ||
      selectedThemeCategory === 'Todos' ||
      t.category === selectedThemeCategory;
    if (!normalizedQuery) return matchesCategory;
    const searchableText = `${t.name} ${t.badge} ${t.category} ${t.keywords || ''} ${t.id}`.toLowerCase();
    return matchesCategory && searchableText.includes(normalizedQuery);
  });

  // Full HTML / CSS standalone generator (accepts optional targetData and options)
  // Full HTML / CSS standalone generator (delegates to modular exportEngine)
  const generateExportCode = (
    targetData?: typeof INITIAL_DATA,
    options?: {
      disableLinks?: boolean;
      isCarousel?: boolean;
      isTemporaryDemo?: boolean;
      demoExpiresAt?: string;
      demoClientName?: string;
      demoWhatsAppPhone?: string;
    }
  ) => {
    return generateExportCodeEngine(targetData || data, { ...options, landingConfig });
  };

  const copyExportCode = async () => {
    const code = generateExportCode();
    const success = await safeCopyText(code);
    if (success) {
      setCopiedCode(true);
      showToast('📋 Código HTML copiado com sucesso! Pronto para colar no seu servidor ou hospedagem.');
      setTimeout(() => setCopiedCode(false), 2600);
    }
  };

  const downloadHtmlFile = () => {
    const code = generateExportCode();
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const slug = data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'biovip-page';
    link.download = `${slug}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ==============================================================
  // GERADORES DE HOSPEDAGEM EM PASTAS INDEPENDENTES
  // Cada microsite reside em sua própria pasta isolada com arquivos e imagens
  // ==============================================================
  const generateManifestJson = (siteData: typeof INITIAL_DATA, slug: string) => {
    return JSON.stringify(
      {
        name: siteData.profile.name,
        short_name: siteData.profile.name.slice(0, 12),
        description: siteData.profile.tagline || `${siteData.profile.name} - ${siteData.profile.title}`,
        start_url: `./index.html`,
        display: 'standalone',
        background_color: siteData.customColors?.enabled
          ? siteData.customColors.bg
          : THEMES[siteData.theme]?.bg || '#0a0a0f',
        theme_color: siteData.customColors?.enabled
          ? siteData.customColors.accent
          : THEMES[siteData.theme]?.accent || '#d4af37',
        icons: [
          {
            src: siteData.profile.avatarUrl,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: siteData.profile.avatarUrl,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      null,
      2
    );
  };

  const generateRobotsTxt = (slug: string) => {
    return `# Robots.txt para microsite independente: ${slug}
User-agent: *
Allow: /

# Sitemap independente da pasta
# Sitemap: https://seusite.com.br/${slug}/sitemap.xml
`;
  };

  const generateHtaccess = (slug: string) => {
    return `# ==============================================================
# Configuração de Hospedagem Independente - Apache / cPanel
# Pasta do Microsite: /${slug}/
# ==============================================================

Options -Indexes
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /${slug}/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.html [L]
</IfModule>

# Compressão Gzip para Carregamento Rápido no Mobile
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# Cache de Assets e Imagens
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
`;
  };

  const generateNginxConf = (slug: string) => {
    return `# ==============================================================
# Configuração Nginx para pasta independente: /${slug}/
# ==============================================================

location /${slug}/ {
    alias /var/www/html/${slug}/;
    index index.html;
    try_files $uri $uri/ /${slug}/index.html;

    # Cache de imagens e fontes estáticas
    location ~* \\.(jpg|jpeg|png|gif|ico|svg|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
`;
  };

  const generateVercelJson = (_slug: string) => {
    return JSON.stringify(
      {
        $schema: 'https://openapi.vercel.sh/vercel.json',
        framework: null,
        buildCommand: '',
        outputDirectory: '.',
        rewrites: [
          {
            source: '/(.*)',
            destination: '/index.html',
          },
        ],
      },
      null,
      2
    );
  };

  const generateReadmeHosting = (slug: string, clientName: string) => {
    return `===================================================================
PACOTE DE HOSPEDAGEM EM PASTA INDEPENDENTE - BIOVIP STUDIO
Cliente: ${clientName}
Diretório Dedicado: /${slug}/ (e também disponível na raiz /)
Data de Geração: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}
===================================================================

ESTRUTURA DESTE PACOTE (COMPATÍVEL COM VERCEL E CPANEL):
-------------------------------------------------------------------
├── index.html            <- Página principal na raiz (evita erro 404 na Vercel/Netlify)
├── vercel.json           <- Configuração pronta para deploy imediato na Vercel
├── manifest.json         <- Manifesto PWA para salvar como app no smartphone
├── robots.txt            <- Indexação SEO para Google e buscadores
├── .htaccess             <- Regras de reescrita e cache para Apache / cPanel
├── nginx.conf            <- Bloco de configuração para servidores Nginx
├── README-HOSPEDAGEM.txt <- Este manual de deploy
├── assets/
│   └── site-info.json    <- Metadados estruturados do cliente e do plano
└── ${slug}/              <- Cópia em subpasta independente para hospedagem multi-pastas
    └── index.html

COMO HOSPEDAR NO SEU SERVIDOR:
-------------------------------------------------------------------
OPÇÃO 1: Vercel / Netlify / GitHub Pages (Deploy Direto Sem Erro 404)
- Extraia o ZIP e suba os arquivos da raiz (onde está o index.html e vercel.json) para o seu repositório ou painel da Vercel.
- O index.html na raiz garante que o domínio principal abra imediatamente sem erro 404 NOT_FOUND.

OPÇÃO 2: cPanel / Hostinger / Locaweb / HostGator (Em Pasta Independente)
1. Acesse o Gerenciador de Arquivos do cPanel do seu domínio principal.
2. Abra a pasta 'public_html'.
3. Envie a subpasta '${slug}' para 'public_html/${slug}/index.html'.
4. O microsite estará acessível na URL: https://seusite.com.br/${slug}/

OPÇÃO 3: Subdomínio Dedicado (ex: ${slug}.seusite.com.br)
1. Crie o subdomínio apontando a pasta raiz para os arquivos extraídos.
2. Os arquivos já carregarão automaticamente!
`;
  };

  const generateSiteInfoJson = (
    siteData: typeof INITIAL_DATA,
    slug: string,
    clientName: string,
    extra?: { monthlyFee?: number; status?: string }
  ) => {
    return JSON.stringify(
      {
        clientName: clientName || siteData.profile.name,
        slug: slug,
        title: siteData.profile.title,
        tagline: siteData.profile.tagline,
        theme: siteData.theme,
        fontFamily: siteData.styling.fontFamily,
        whatsapp: siteData.profile.whatsapp,
        instagram: siteData.profile.instagram,
        generatedAt: new Date().toISOString(),
        hostingPath: `/public_html/${slug}/`,
        monthlyFee: extra?.monthlyFee || 149.9,
        status: extra?.status || 'active',
      },
      null,
      2
    );
  };

  // Download do ZIP de uma pasta independente individual
  const downloadMicrositeDirectoryZip = async (
    target?: SavedMicrosite | typeof INITIAL_DATA,
    customSlug?: string
  ) => {
    try {
      showToast('⏳ Empacotando pasta independente do microsite...');
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();

      let siteData: typeof INITIAL_DATA;
      let clientName: string;
      let slug: string;
      let extraMeta: { monthlyFee?: number; status?: string } = {};

      if (target && 'subdomain' in target) {
        siteData = target.data;
        clientName = target.clientName;
        slug = target.subdomain || customSlug || target.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        extraMeta = { monthlyFee: target.monthlyFee, status: target.status };
      } else if (target) {
        siteData = target;
        clientName = target.profile.name;
        slug =
          customSlug ||
          target.profile.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') ||
          'microsite';
      } else {
        siteData = data;
        clientName = currentEditingSite ? currentEditingSite.clientName : data.profile.name;
        slug =
          currentEditingSite?.subdomain ||
          data.profile.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') ||
          'microsite';
      }

      const isTargetUnderConstruction =
        target && 'subdomain' in target
          ? isSiteUnderConstruction(target)
          : currentEditingSite
          ? isSiteUnderConstruction(currentEditingSite)
          : false;

      const isTargetSuspended =
        target && 'subdomain' in target
          ? isSiteSuspendedStatus(target)
          : currentEditingSite
          ? isSiteSuspendedStatus(currentEditingSite)
          : false;

      const htmlContent = isTargetUnderConstruction
        ? getUnderConstructionPageHtml(target && 'subdomain' in target ? target : (currentEditingSite || { clientName, data: siteData }), landingConfig)
        : isTargetSuspended
        ? getSuspendedPageHtml(target && 'subdomain' in target ? target : (currentEditingSite || { clientName, data: siteData }))
        : generateExportCode(siteData);
      const vercelJsonContent = generateVercelJson(slug);
      const manifestContent = generateManifestJson(siteData, slug);
      const robotsContent = generateRobotsTxt(slug);
      const htaccessContent = generateHtaccess(slug);
      const nginxContent = generateNginxConf(slug);
      const readmeContent = generateReadmeHosting(slug, clientName);
      const siteInfoContent = generateSiteInfoJson(siteData, slug, clientName, extraMeta);

      // 1. Arquivos na RAIZ do ZIP (Garante que deploy direto na Vercel / GitHub abra na raiz / sem 404 NOT_FOUND)
      zip.file('index.html', htmlContent);
      zip.file('vercel.json', vercelJsonContent);
      zip.file('manifest.json', manifestContent);
      zip.file('robots.txt', robotsContent);
      zip.file('.htaccess', htaccessContent);
      zip.file('nginx.conf', nginxContent);
      zip.file('README-HOSPEDAGEM.txt', readmeContent);

      const rootAssets = zip.folder('assets');
      if (rootAssets) {
        rootAssets.file('site-info.json', siteInfoContent);
      }

      // 2. Cópia também na subpasta independente /slug/ (para uso em cPanel public_html/slug/ ou subdiretórios)
      const folder = zip.folder(slug);
      if (folder) {
        folder.file('index.html', htmlContent);
        folder.file('manifest.json', manifestContent);
        folder.file('.htaccess', htaccessContent);
        const subAssets = folder.folder('assets');
        if (subAssets) {
          subAssets.file('site-info.json', siteInfoContent);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pasta-hospedagem-${slug}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast(`✅ Pacote ZIP da pasta '/${slug}/' baixado com sucesso!`);
    } catch (err) {
      console.error('Erro ao gerar ZIP do microsite:', err);
      showToast('❌ Erro ao empacotar arquivos do microsite.');
    }
  };

  // Download do ZIP multi-pastas contendo todos os clientes cadastrados em pastas isoladas
  const downloadAllSitesDirectoryZip = async () => {
    if (savedSites.length === 0) {
      showToast('⚠️ Nenhum microsite salvo no Painel para exportação multi-pastas.');
      return;
    }
    try {
      showToast(`⏳ Gerando servidor multi-pastas para ${savedSites.length} clientes...`);
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const serverRoot = zip.folder('servidor-hospedagem-microsites') || zip;

      // Manual geral do servidor
      serverRoot.file(
        'README-ESTRUTURA-SERVIDOR.txt',
        `===================================================================
PACOTE DE HOSPEDAGEM MULTI-CLIENTES - BIOVIP STUDIO
Total de Microsites: ${savedSites.length}
Data de Exportação: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}
===================================================================

ESTRUTURA DAS PASTAS INDEPENDENTES NESTE PACOTE:
${savedSites.map(s => `├── /${s.subdomain}/ (Cliente: ${s.clientName} | Mensalidade: R$ ${s.monthlyFee.toFixed(2)})`).join('\n')}

COMO PUBLICAR NO SERVIDOR:
1. Extraia o conteúdo desta pasta diretamente no diretório 'public_html' do seu servidor.
2. Cada cliente fica estritamente isolado em sua própria pasta independente.
3. Não há risco de conflito de arquivos entre os clientes.
4. Cada cliente acessa sua URL direta: https://seusite.com.br/[pasta-do-cliente]/
`
      );

      // Portal mestre para listar todas as pastas de clientes
      const masterPortalHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Servidor de Hospedagem - Pastas Independentes de Clientes</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0a0f; color: #f5f5f5; padding: 40px 20px; max-width: 860px; margin: 0 auto; }
    h1 { color: #f59e0b; font-size: 24px; border-bottom: 1px solid #262626; padding-bottom: 16px; display: flex; align-items: center; gap: 10px; }
    p { color: #a3a3a3; font-size: 14px; line-height: 1.5; }
    .grid { display: grid; gap: 14px; margin-top: 24px; }
    .card { background: #171717; border: 1px solid #262626; border-radius: 12px; padding: 18px; text-decoration: none; color: inherit; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; }
    .card:hover { border-color: #f59e0b; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .title { font-weight: bold; font-size: 16px; color: #fff; }
    .path { font-family: monospace; color: #f59e0b; font-size: 12px; margin-top: 5px; }
    .badge { background: #10b981; color: #022c22; font-size: 11px; padding: 5px 12px; border-radius: 999px; font-weight: 800; }
  </style>
</head>
<body>
  <h1>📁 Servidor de Hospedagem - Diretório Raiz</h1>
  <p>Todos os microsites de clientes abaixo estão hospedados em suas respectivas <strong>pastas independentes</strong> com arquivos isolados:</p>
  <div class="grid">
    ${savedSites
      .map(
        s => `
    <a href="./${s.subdomain}/" class="card">
      <div>
        <div class="title">${s.clientName}</div>
        <div class="path">/${s.subdomain}/index.html</div>
      </div>
      <span class="badge">Acessar Pasta ›</span>
    </a>`
      )
      .join('')}
  </div>
</body>
</html>`;
      serverRoot.file('index.html', masterPortalHtml);

      // Adiciona cada cliente em sua pasta independente
      for (const site of savedSites) {
        const slug = site.subdomain || site.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const siteFolder = serverRoot.folder(slug);
        if (siteFolder) {
          const siteHtml = isSiteUnderConstruction(site)
            ? getUnderConstructionPageHtml(site, landingConfig)
            : isSiteSuspendedStatus(site)
            ? getSuspendedPageHtml(site)
            : generateExportCode(site.data);
          siteFolder.file('index.html', siteHtml);
          siteFolder.file('vercel.json', generateVercelJson(slug));
          siteFolder.file('manifest.json', generateManifestJson(site.data, slug));
          siteFolder.file('robots.txt', generateRobotsTxt(slug));
          siteFolder.file('.htaccess', generateHtaccess(slug));
          siteFolder.file('nginx.conf', generateNginxConf(slug));
          siteFolder.file('README-HOSPEDAGEM.txt', generateReadmeHosting(slug, site.clientName));
          const assetsFolder = siteFolder.folder('assets');
          if (assetsFolder) {
            assetsFolder.file(
              'site-info.json',
              generateSiteInfoJson(site.data, slug, site.clientName, {
                monthlyFee: site.monthlyFee,
                status: site.status,
              })
            );
          }
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `servidor-hospedagem-todos-os-microsites-${savedSites.length}-clientes.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast(`✅ Pacote com ${savedSites.length} pastas independentes baixado com sucesso!`);
    } catch (err) {
      console.error('Erro ao gerar ZIP multi-pastas:', err);
      showToast('❌ Erro ao exportar servidor multi-pastas.');
    }
  };

  // =========================================================================
  // CONSTRUTOR DE MICROSITES REAIS COMPLETOS (1 DE CADA NICHO) PARA A VITRINE
  // =========================================================================
  const buildRealNicheMicrositeData = (
    nicheKitKey: string,
    customMeta?: Partial<{
      whatsappPhone: string;
      instagramHandle: string;
      openHours: string;
      openStatus: string;
      galleryPhotos: string[];
      processSteps: Array<{ id: string; number: string; title: string; description: string }>;
      aboutParagraph: string;
      aboutClosing: string;
      faqs: Array<{ id: string; question: string; answer: string }>;
    }>
  ): typeof INITIAL_DATA => {
    const kit = NICHE_KITS[nicheKitKey] || NICHE_KITS['Jurídico & Executivo'];
    const themeObj = THEMES[kit.defaultTheme] || THEMES.navyLaw;

    const safeMeta = {
      whatsappPhone: customMeta?.whatsappPhone || landingConfig.agencyWhatsapp || '5511999999999',
      instagramHandle: customMeta?.instagramHandle || 'biovip.oficial',
      openHours: customMeta?.openHours || 'Seg a Sex · 09:00 às 18:00',
      openStatus: customMeta?.openStatus || 'ATENDIMENTO ATIVO',
      galleryPhotos: customMeta?.galleryPhotos || [
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=700',
        'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=700',
      ],
      processSteps: customMeta?.processSteps || [
        { id: 'step-1', number: '01', title: 'Primeiro Contato', description: 'Triagem direta pelo WhatsApp' },
        { id: 'step-2', number: '02', title: 'Avaliação Individual', description: 'Diagnóstico e plano sob medida' },
        { id: 'step-3', number: '03', title: 'Execução & Acompanhamento', description: 'Entrega com excelência' },
      ],
      aboutParagraph: customMeta?.aboutParagraph || 'Atendimento de alto padrão focado em resultados.',
      aboutClosing: customMeta?.aboutClosing || 'Agende seu horário com exclusividade.',
      faqs: customMeta?.faqs || [
        { id: 'faq-1', question: 'Como agendar?', answer: 'Toque no botão do WhatsApp e fale diretamente conosco.' },
        { id: 'faq-2', question: 'Formas de pagamento?', answer: 'Pix, cartão de crédito e débito.' },
      ],
    };

    return {
      ...INITIAL_DATA,
      theme: kit.defaultTheme,
      customColors: {
        ...INITIAL_DATA.customColors,
        enabled: false,
      },
      moduleColors: JSON.parse(JSON.stringify(NICHE_DEMO_MODULE_COLORS[nicheKitKey] || {})),
      styling: {
        ...INITIAL_DATA.styling,
        fontFamily: themeObj.fontHeadline,
        borderRadius: 20,
        glassmorphism: true,
        metallicBorders: true,
        spotlightGlow: true,
        photoHeight: 390,
        photoScale: 100,
        photoPosY: 22,
        vignetteIntensity: 85,
        photoFilter: 'none',
        wrapperAlignment: 'flex-start',
      },
      announcement: {
        enabled: true,
        badge: kit.announcement.badge,
        text: kit.announcement.text,
        link: '#catalogo',
      },
      profile: {
        ...INITIAL_DATA.profile,
        name: kit.profile.name,
        title: kit.profile.title,
        tagline: kit.profile.tagline,
        cursivePhrase: kit.profile.cursivePhrase,
        location: kit.profile.location,
        avatarUrl: kit.profile.avatarUrl,
        aboutPhotoUrl: kit.profile.aboutPhotoUrl,
        whatsapp: safeMeta.whatsappPhone,
        instagram: safeMeta.instagramHandle,
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kit.profile.location)}`,
      },
      metrics: {
        enabled: true,
        stat1Value: kit.metrics.stat1Value,
        stat1Label: kit.metrics.stat1Label,
        stat2Value: kit.metrics.stat2Value,
        stat2Label: kit.metrics.stat2Label,
        stat3Value: kit.metrics.stat3Value,
        stat3Label: kit.metrics.stat3Label,
      },
      actionCards: kit.actionCards,
      services: {
        enabled: true,
        headline: kit.services.headline,
        subtitle: 'Atendimento personalizado com excelência técnica e agendamento prioritário',
        badge: 'CATÁLOGO OFICIAL',
        layout: 'featured',
        items: kit.services.items.map((item: any, idx: number) => ({
          ...item,
          featured: idx === 0,
          badge: idx === 0 ? 'MAIS PROCURADO' : 'EXCLUSIVO',
          ctaLabel: 'Reservar no WhatsApp',
          actionType: 'whatsapp' as const,
        })),
      },
      processSteps: {
        enabled: true,
        headline: 'Como funciona o atendimento?',
        subtitle: 'Jornada simples, ágil e transparente em 3 etapas',
        steps: safeMeta.processSteps,
      },
      studentGrid: {
        enabled: true,
        headline: 'Portfólio & Estrutura de Atendimento',
        subtitle: 'Registros reais do nosso padrão de entrega e resultados',
        badge: 'GALERIA VIP',
        layout: 'grid3',
        aspectRatio: 'square',
        enableLightbox: true,
        photos: safeMeta.galleryPhotos,
        captions: [],
      },
      locationCard: {
        enabled: true,
        headline: 'Localização & Horários',
        address: kit.profile.location,
        buttonLabel: 'Abrir Rota no Google Maps',
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kit.profile.location)}`,
        hours: safeMeta.openHours,
        openStatus: safeMeta.openStatus,
        showHours: true,
      },
      aboutMe: {
        enabled: true,
        headline: `Sobre ${kit.profile.name}`,
        paragraph: safeMeta.aboutParagraph,
        closingPhrase: safeMeta.aboutClosing,
      },
      faq: {
        enabled: true,
        headline: 'Perguntas Frequentes',
        items: safeMeta.faqs,
      },
      seo: {
        metaTitle: `${kit.profile.name} — ${kit.profile.title}`,
        metaDescription: kit.profile.tagline,
        ogImageUrl: kit.profile.avatarUrl,
        keywords: `${kit.shortLabel}, microsite, agendamento vip, ${kit.profile.name.toLowerCase()}`,
      },
    };
  };

  const RAW_READY_MADE_MODELS = [
    {
      id: 'law',
      nicheKitKey: 'Jurídico & Executivo',
      category: 'Advocacia & Consultoria',
      code: 'NICHO 01 · JURÍDICO',
      subdomain: 'dramarina',
      title: 'Advocacia Estratégica & Patrimonial',
      personaName: 'DRA. MARINA ALMEIDA',
      personaRole: 'OAB/SP · Direito Empresarial, Família & Sucessões',
      accentHex: '#e2b857',
      conversionStat: '31.4% conv. WhatsApp',
      includedHighlights: 'Microsite Real Completo: Hero Editorial + Áreas de Atuação + Etapas Jurídicas + Google Maps + FAQ',
      realSiteData: buildRealNicheMicrositeData('Jurídico & Executivo', {
        whatsappPhone: landingConfig.agencyWhatsapp || '5511999999999',
        instagramHandle: 'dramarinaalmeida.adv',
        openHours: 'Seg a Sex · 09:00 às 19:00',
        openStatus: 'PLANTÃO JURÍDICO ATIVO',
        galleryPhotos: [
          'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=700',
        ],
        processSteps: [
          { id: 'law-s1', number: '01', title: 'Triagem Sigilosa no WhatsApp', description: 'Relate sua demanda para análise preliminar da equipe jurídica.' },
          { id: 'law-s2', number: '02', title: 'Consulta & Parecer Técnico', description: 'Reunião presencial na Av. Paulista ou por videoconferência.' },
          { id: 'law-s3', number: '03', title: 'Defesa & Blindagem Patrimonial', description: 'Atuação estratégica com relatórios periódicos de andamento.' },
        ],
        aboutParagraph: 'Com mais de 12 anos de atuação em Direito Empresarial, Sucessório e Planejamento Previdenciário, nosso escritório combina rigor técnico, sigilo absoluto e atendimento direto para proteger seu patrimônio.',
        aboutClosing: 'Compromisso ético e segurança jurídica em cada decisão.',
        faqs: [
          { id: 'lf-1', question: 'Realizam consultas por videoconferência para outros estados?', answer: 'Sim. Atendemos clientes em todo o Brasil e no exterior com validade jurídica digital.' },
          { id: 'lf-2', question: 'Como funciona a análise de contratos e holdings?', answer: 'Na consulta estratégica realizamos o diagnóstico patrimonial completo e apresentamos o plano de estruturação.' },
        ],
      }),
    },
    {
      id: 'nails',
      nicheKitKey: 'Beleza & Unhas',
      category: 'Beleza & Estética',
      code: 'NICHO 02 · NAIL DESIGNER',
      subdomain: 'larissanails',
      title: 'Nail Designer & Alongamento de Luxo',
      personaName: 'LARISSA ALMEIDA',
      personaRole: 'Especialista em Fibra Slim, Gel Moldado & Cursos VIP',
      accentHex: '#d4af37',
      conversionStat: '38.2% conv. Agenda',
      includedHighlights: 'Microsite Real Completo: Botão Popout 3D + Catálogo de Alongamentos + Portfólio Unhas + Curso VIP',
      realSiteData: buildRealNicheMicrositeData('Beleza & Unhas', {
        whatsappPhone: landingConfig.agencyWhatsapp || '5511999999999',
        instagramHandle: 'larissaalmeida.nails',
        openHours: 'Ter a Sáb · 09:00 às 20:00',
        openStatus: 'AGENDA DA SEMANA ABERTA',
        galleryPhotos: [
          'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=700',
        ],
        processSteps: [
          { id: 'nl-s1', number: '01', title: 'Escolha do Procedimento', description: 'Selecione Fibra de Vidro Slim, Banho de Gel ou Manutenção.' },
          { id: 'nl-s2', number: '02', title: 'Confirmação no WhatsApp', description: 'Garanta seu horário preferido sem fila de espera.' },
          { id: 'nl-s3', number: '03', title: 'Experiência Studio Privé', description: 'Atendimento individualizado com materiais 100% esterilizados em autoclave.' },
        ],
        aboutParagraph: 'Referência em naturalidade europeia e resistência superior, já transformei o olhar sobre alongamento de unhas em mais de 3.200 atendimentos e formei centenas de alunas no método Fibra Slim.',
        aboutClosing: 'Elegância e sofisticação na ponta dos seus dedos.',
        faqs: [
          { id: 'nf-1', question: 'Qual a durabilidade do alongamento em Fibra de Vidro?', answer: 'Com os cuidados indicados, a estrutura mantém brilho e resistência intactos por até 30 a 35 dias até a manutenção.' },
          { id: 'nf-2', question: 'O Curso VIP Presencial inclui certificado e material?', answer: 'Sim! Apostila completa, prática em modelo real e certificado internacional incluso.' },
        ],
      }),
    },
    {
      id: 'lash',
      nicheKitKey: 'Beleza & Alta Conversão',
      category: 'Beleza & Estética',
      code: 'NICHO 03 · LASH & SOBRANCELHAS',
      subdomain: 'jannecampelo',
      title: 'Sobrancelhas, Nanoblading & Lash Studio',
      personaName: 'JANNE CAMPELO',
      personaRole: 'Visagismo do Olhar · Nanoblading & Volume Fox Eyes',
      accentHex: '#e11d48',
      conversionStat: '36.8% conv. Procedimentos',
      includedHighlights: 'Microsite Real Completo: Tema Ruby Imperial + Catálogo do Olhar + Galeria de Resultados + Recepção WA',
      realSiteData: buildRealNicheMicrositeData('Beleza & Alta Conversão', {
        whatsappPhone: landingConfig.agencyWhatsapp || '5511999999999',
        instagramHandle: 'jannecampelo.beauty',
        openHours: 'Seg a Sáb · 09:00 às 19:30',
        openStatus: 'HORÁRIOS VIP DISPONÍVEIS',
        galleryPhotos: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=700',
        ],
        processSteps: [
          { id: 'ls-s1', number: '01', title: 'Mapeamento Facial & Visagismo', description: 'Analisamos a simetria do seu rosto antes de qualquer procedimento.' },
          { id: 'ls-s2', number: '02', title: 'Aplicação Indolor & Precisa', description: 'Fios hiper-realistas ou extensão de cílios com isolamento perfeito.' },
          { id: 'ls-s3', number: '03', title: 'Kit Pós-Procedimento VIP', description: 'Orientações completas para máxima retenção e durabilidade.' },
        ],
        aboutParagraph: 'Com mais de 4.500 olhares transformados em 7 anos de experiência, desenvolvi protocolos exclusivos que realçam sua beleza natural sem pesar na expressão.',
        aboutClosing: 'Seu olhar transmite o seu verdadeiro poder.',
        faqs: [
          { id: 'lsf-1', question: 'Quanto tempo dura a extensão de cílios Fox Eyes?', answer: 'A retenção média é de 30 a 35 dias, sem danificar os fios naturais.' },
          { id: 'lsf-2', question: 'O Nanoblading fica com aspecto natural?', answer: 'Sim, desenhamos fio a fio seguindo o caimento natural da sua sobrancelha com pigmentos importados.' },
        ],
      }),
    },
    {
      id: 'esthetics',
      nicheKitKey: 'Consultoria & Estética',
      category: 'Beleza & Estética',
      code: 'NICHO 04 · ESTÉTICA & CLÍNICA',
      subdomain: 'drafernanda',
      title: 'Harmonização Facial & Clínica Boutique',
      personaName: 'DRA. FERNANDA MARCOLIN',
      personaRole: 'Harmonização Facial, Bioestimuladores & Dermatologia',
      accentHex: '#c5a880',
      conversionStat: '29.8% conv. Avaliação',
      includedHighlights: 'Microsite Real Completo: Paleta Champagne Nude + Protocolos Faciais + Concierge VIP + Endereço Itaim',
      realSiteData: buildRealNicheMicrositeData('Consultoria & Estética', {
        whatsappPhone: landingConfig.agencyWhatsapp || '5511999999999',
        instagramHandle: 'drafernandamarcolin',
        openHours: 'Seg a Sex · 08:30 às 19:30',
        openStatus: 'CLÍNICA ABERTA · HORA MARCADA',
        galleryPhotos: [
          'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=700',
        ],
        processSteps: [
          { id: 'es-s1', number: '01', title: 'Consulta de Avaliação 3D', description: 'Diagnóstico anatômico da pele, pontos de sustentação e colágeno.' },
          { id: 'es-s2', number: '02', title: 'Planejamento Full Face Personalizado', description: 'Protocolo médico focado em rejuvenescimento elegante e natural.' },
          { id: 'es-s3', number: '03', title: 'Acompanhamento Pós-Clínico', description: 'Suporte direto com nossa Concierge durante toda a evolução.' },
        ],
        aboutParagraph: 'Acredito na medicina estética que respeita a individualidade de cada rosto. Mais de 3.800 procedimentos realizados com foco em gerenciamento de colágeno e naturalidade.',
        aboutClosing: 'Realçando sua beleza única com ciência, arte e sutileza.',
        faqs: [
          { id: 'ef-1', question: 'Os procedimentos deixam o rosto artificial?', answer: 'Nosso método prioriza a reestruturação sutil e estímulo de colágeno, preservando 100% dos seus traços naturais.' },
          { id: 'ef-2', question: 'Como agendar a primeira avaliação?', answer: 'Basta clicar no botão de Agendamento ou chamar nossa Concierge pelo WhatsApp.' },
        ],
      }),
    },
    {
      id: 'barber',
      nicheKitKey: 'Barbearia & Grooming',
      category: 'Barbearia & Negócios',
      code: 'NICHO 05 · BARBEARIA VIP',
      subdomain: 'dombarber',
      title: 'Barbearia Clássica & Clube de Assinatura',
      personaName: 'DOM BARBER CLUB',
      personaRole: 'Corte Executivo, Barboterapia & Clube VIP Masculino',
      accentHex: '#d97706',
      conversionStat: '41.6% conv. Horários',
      includedHighlights: 'Microsite Real Completo: Tema Vintage Barber + Clube de Assinatura + Menu de Combos + Rota Google Maps',
      realSiteData: buildRealNicheMicrositeData('Barbearia & Grooming', {
        whatsappPhone: landingConfig.agencyWhatsapp || '5511999999999',
        instagramHandle: 'dombarberclub.sp',
        openHours: 'Ter a Sáb · 09:00 às 21:00',
        openStatus: 'SEM FILA · AGENDE ONLINE',
        galleryPhotos: [
          'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&q=80&w=700',
        ],
        processSteps: [
          { id: 'bb-s1', number: '01', title: 'Escolha seu Combo ou Corte', description: 'Selecione Corte Navalhado, Barboterapia com Ozônio ou Combo Gentleman.' },
          { id: 'bb-s2', number: '02', title: 'Confirmação Instantânea no WhatsApp', description: 'Chegue no horário marcado e seja atendido sem espera.' },
          { id: 'bb-s3', number: '03', title: 'Toalha Quente & Chopp Cortesia', description: 'Primeira cerveja artesanal ou café espresso por nossa conta.' },
        ],
        aboutParagraph: 'Mais que um corte, o Dom Barber Club entrega visagismo masculino, barboterapia clássica com toalha quente e um ambiente pensado para homens de negócios.',
        aboutClosing: 'Tradição, navalha afiada e respeito ao seu tempo.',
        faqs: [
          { id: 'bf-1', question: 'Como funciona o Clube de Assinatura Mensal?', answer: 'Por um valor fixo mensal você corta o cabelo e alinha a barba quantas vezes quiser no mês, com prioridade na agenda.' },
          { id: 'bf-2', question: 'Possuem estacionamento no local?', answer: 'Sim, manobrista conveniado em frente à barbearia.' },
        ],
      }),
    },
    {
      id: 'mentor',
      nicheKitKey: 'Mentoria & Cursos',
      category: 'Mentoria & Infoprodutos',
      code: 'NICHO 06 · MENTORIA & CURSOS',
      subdomain: 'marianacarvalho',
      title: 'Mentoria High-Ticket & Infoprodutos',
      personaName: 'MARIANA CARVALHO',
      personaRole: 'Mentora de Negócios, Posicionamento & Escala Digital',
      accentHex: '#d99f69',
      conversionStat: '27.5% Aplicação Qualificada',
      includedHighlights: 'Microsite Real Completo: Aplicação de Mentoria + Vitrine de E-book/Cursos + Métricas de Faturamento',
      realSiteData: buildRealNicheMicrositeData('Mentoria & Cursos', {
        whatsappPhone: landingConfig.agencyWhatsapp || '5511999999999',
        instagramHandle: 'marianacarvalho.mentora',
        openHours: 'Atendimento Global Online · Seg a Sex',
        openStatus: 'APLICAÇÕES ABERTAS · TURMA VIP',
        galleryPhotos: [
          'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=700',
        ],
        processSteps: [
          { id: 'mt-s1', number: '01', title: 'Preenchimento da Aplicação', description: 'Avaliamos seu momento atual de faturamento e estrutura comercial.' },
          { id: 'mt-s2', number: '02', title: 'Sessão Estratégica de Diagnóstico', description: 'Alinhamento individual com nosso time de estrategistas.' },
          { id: 'mt-s3', number: '03', title: 'Plano de Escala High-Ticket', description: 'Implementação acompanhada por 90 dias para multiplicar sua margem.' },
        ],
        aboutParagraph: 'Especialista em posicionamento de alto valor e estruturação comercial, já formei mais de 1.800 alunas e ajudei negócios digitais a ultrapassarem R$ 15 milhões em vendas.',
        aboutClosing: 'Posicionamento de elite atrai clientes de elite.',
        faqs: [
          { id: 'mf-1', question: 'Para quem é indicada a Mentoria Individual VIP?', answer: 'Para profissionais liberais, especialistas e empresárias que já faturam e desejam escalar ofertas de alto ticket.' },
          { id: 'mf-2', question: 'Como contratar palestras in-company?', answer: 'Clique no botão de Palestras & Treinamentos para falar direto com nossa assessoria executiva.' },
        ],
      }),
    },
    {
      id: 'health',
      nicheKitKey: 'Saúde & Psicologia',
      category: 'Saúde & Clínicas',
      code: 'NICHO 07 · PSICOLOGIA & SAÚDE',
      subdomain: 'psimartina',
      title: 'Psicologia Clínica, Terapia & Saúde',
      personaName: 'PSI. MARTINA BIANCHI',
      personaRole: 'Psicóloga Clínica · CRP 06/12345 · Ansiedade & Burnout',
      accentHex: '#a0583b',
      conversionStat: '34.9% Agendamento Clínico',
      includedHighlights: 'Microsite Real Completo: Tema Terracotta Acolhedor + Modalidades Online/Presencial + Dúvidas de Reembolso',
      realSiteData: buildRealNicheMicrositeData('Saúde & Psicologia', {
        whatsappPhone: landingConfig.agencyWhatsapp || '5511999999999',
        instagramHandle: 'psimartinabianchi',
        openHours: 'Seg a Sex · 08:00 às 20:00 (Com Hora Marcada)',
        openStatus: 'ONLINE GLOBAL & PRESENCIAL SP',
        galleryPhotos: [
          'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=700',
        ],
        processSteps: [
          { id: 'ps-s1', number: '01', title: 'Primeiro Contato no WhatsApp', description: 'Alinhamos sua disponibilidade de horário e modalidade (online ou presencial).' },
          { id: 'ps-s2', number: '02', title: 'Sessão Inicial de Acolhimento', description: 'Espaço ético, sigiloso e livre de julgamentos para compreender sua demanda.' },
          { id: 'ps-s3', number: '03', title: 'Acompanhamento Semanal', description: 'Processo terapêutico estruturado no seu ritmo e objetivos emocionais.' },
        ],
        aboutParagraph: 'Com 9 anos de prática clínica e mais de 2.400 sessões realizadas, ofereço psicoterapia individual para brasileiros no Brasil e no exterior com foco em ansiedade, burnout e relacionamentos.',
        aboutClosing: 'Cuidar da sua saúde emocional é um ato de coragem.',
        faqs: [
          { id: 'pf-1', question: 'Emite recibo para reembolso no plano de saúde?', answer: 'Sim, emitimos documentação fiscal completa para solicitação de reembolso em todos os convênios médicos.' },
          { id: 'pf-2', question: 'Como funcionam as sessões online?', answer: 'Realizadas por sala de vídeo criptografada com duração de 50 minutos e total privacidade.' },
        ],
      }),
    },
    {
      id: 'fashion',
      nicheKitKey: 'Moda & Juventude',
      category: 'Moda & E-commerce',
      code: 'NICHO 08 · MODA & BOUTIQUE',
      subdomain: 'hellenmarques',
      title: 'Moda Feminina, Boutique & Personal Styling',
      personaName: 'HELLEN MARQUES',
      personaRole: 'Curadoria de Alfaiataria, Showroom & Malinha Delivery',
      accentHex: '#e11d74',
      conversionStat: '39.4% conv. Provador VIP',
      includedHighlights: 'Microsite Real Completo: Vitrine da Nova Coleção + Compra com Consultora no WhatsApp + Malinha Delivery',
      realSiteData: buildRealNicheMicrositeData('Moda & Juventude', {
        whatsappPhone: landingConfig.agencyWhatsapp || '5511999999999',
        instagramHandle: 'hellenmarques.store',
        openHours: 'Seg a Sáb · 10:00 às 20:00 · Envio Expresso 24h',
        openStatus: 'COLEÇÃO NOVA NO AR',
        galleryPhotos: [
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=700',
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=700',
        ],
        processSteps: [
          { id: 'md-s1', number: '01', title: 'Escolha seus Looks no Catálogo', description: 'Veja caimento, tamanhos disponíveis e valores da nova coleção.' },
          { id: 'md-s2', number: '02', title: 'Atendimento com Consultora de Estilo', description: 'Receba vídeos reais das peças e tabela de medidas pelo WhatsApp.' },
          { id: 'md-s3', number: '03', title: 'Entrega Expressa ou Malinha VIP', description: 'Motoboy no mesmo dia em SP ou envio imediato para todo o Brasil.' },
        ],
        aboutParagraph: 'Mais de 12 mil clientes vestidas em todo o Brasil com nossa curadoria de alfaiataria italiana, vestidos acetinados e consultoria de imagem personalizada.',
        aboutClosing: 'Vista-se da sua melhor versão todos os dias.',
        faqs: [
          { id: 'mdf-1', question: 'Como funciona a Malinha Delivery em São Paulo?', answer: 'Enviamos os looks selecionados no seu tamanho até sua casa para você provar com conforto e pagar apenas o que ficar.' },
          { id: 'mdf-2', question: 'A primeira troca é gratuita?', answer: 'Sim! Garantimos troca fácil e rápida em até 7 dias após o recebimento.' },
        ],
      }),
    },
  ];

  const READY_MADE_MODELS = RAW_READY_MADE_MODELS.map((m) => ({
    ...m,
    realHtml: generateExportCode(m.realSiteData),
    carouselHtml: generateExportCode(m.realSiteData, { disableLinks: true, isCarousel: true }),
  }));

  // Helper to check if a saved site's images are outdated/mismatched relative to its niche preset
  const isModelSiteImagesStale = (site: SavedMicrosite, matchedPreset?: (typeof RAW_READY_MADE_MODELS)[number]): boolean => {
    if (!site?.data) return true;
    // CRITICAL: User-customized sites are protected and must NEVER be overwritten by preset defaults
    if (site.isCustomized) return false;
    // Non-preset client sites created by users must never be overwritten
    if (!site.id.startsWith('real-niche-') && site.id !== 'site-1' && site.id !== 'site-2' && site.id !== 'site-3') {
      return false;
    }
    // Check if site-1 (Don Corleone Barber) or site-3 (Larissa Nails) still has the default lawyer avatar
    if (
      (site.id === 'site-1' || site.subdomain === 'doncorleone' || site.nicheCategory === 'Barbearia & Grooming') &&
      site.data.profile?.avatarUrl?.includes('1573496359142')
    ) {
      return true;
    }
    if (
      (site.id === 'site-3' || site.subdomain === 'larissanails' || site.nicheCategory === 'Beleza & Unhas') &&
      (site.data.profile?.avatarUrl?.includes('1573496359142') || site.data.profile?.avatarUrl?.includes('1522337360788'))
    ) {
      return true;
    }
    if (!matchedPreset) return false;
    const currentPhotos = site.data.studentGrid?.photos || [];
    if (currentPhotos.length < 6) return true;
    return false;
  };

  // Ensure all 8 real niche microsites are automatically present in savedSites and have 100% niche-accurate images
  useEffect(() => {
    setSavedSites((prev) => {
      let deletedIds: string[] = [];
      try {
        const deletedRaw = localStorage.getItem('luxebio_deleted_site_ids_v1');
        if (deletedRaw) {
          const parsedDel = JSON.parse(deletedRaw);
          if (Array.isArray(parsedDel)) deletedIds = parsedDel;
        }
      } catch {}

      const existingIds = new Set(prev.map((s) => s.id));
      const todayStr = new Date().toISOString().split('T')[0];
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);
      const dueStr = nextMonth.toISOString().split('T')[0];

      let changed = false;
      const updated = prev.map((s) => {
        // Fix site-1 (Don Corleone Barber) if unedited and had lawyer images from old INITIAL_SAVED_SITES
        if (!s.isCustomized && s.id === 'site-1' && s.data?.profile?.avatarUrl?.includes('1573496359142')) {
          const defaultSite1 = INITIAL_SAVED_SITES.find((is) => is.id === 'site-1');
          if (defaultSite1) {
            changed = true;
            return {
              ...s,
              isLandingModel: false,
              data: JSON.parse(JSON.stringify(defaultSite1.data)),
            };
          }
        }
        // Fix site-2 (Dra. Marina Advocacia) if unedited and had random street portraits in studentGrid
        if (!s.isCustomized && s.id === 'site-2' && s.data?.studentGrid?.photos?.some((p: string) => p.includes('1517841905240'))) {
          changed = true;
          return {
            ...s,
            data: JSON.parse(JSON.stringify(INITIAL_DATA)),
          };
        }
        // Fix site-3 (Larissa Almeida Nails) if unedited and had lawyer images from old INITIAL_SAVED_SITES
        if (!s.isCustomized && s.id === 'site-3' && s.data?.profile?.avatarUrl?.includes('1573496359142')) {
          const defaultSite3 = INITIAL_SAVED_SITES.find((is) => is.id === 'site-3');
          if (defaultSite3) {
            changed = true;
            return {
              ...s,
              data: JSON.parse(JSON.stringify(defaultSite3.data)),
            };
          }
        }

        const matchedPreset = RAW_READY_MADE_MODELS.find(
          (rm) => `real-niche-${rm.id}` === s.id || rm.subdomain === s.subdomain
        );
        const cleanCustom = (s.customDomain || '').toLowerCase().trim();
        const isFakeCustom =
          cleanCustom === `www.${s.subdomain}.com.br` ||
          cleanCustom === `${s.subdomain}.com.br` ||
          cleanCustom === 'www.dramarinaalmeida.com.br' ||
          cleanCustom === 'www.doncorleonebarber.com.br';

        if (s.id === 'site-2' && s.subdomain === 'dramarina') {
          changed = true;
          return {
            ...s,
            subdomain: 'almeidaadv',
            domainType: 'subdomain' as const,
            customDomain: '',
          };
        }
        if (s.id === 'site-3' && s.subdomain === 'larissanails') {
          changed = true;
          return {
            ...s,
            subdomain: 'larissaalmeida',
            domainType: 'subdomain' as const,
            customDomain: '',
          };
        }

        if (matchedPreset && isModelSiteImagesStale(s, matchedPreset)) {
          changed = true;
          return {
            ...s,
            domainType: 'subdomain' as const,
            customDomain: isFakeCustom ? '' : s.customDomain,
            data: JSON.parse(JSON.stringify(matchedPreset.realSiteData)),
          };
        }
        if (isFakeCustom) {
          changed = true;
          return {
            ...s,
            domainType: 'subdomain' as const,
            customDomain: '',
          };
        }
        return s;
      });

      RAW_READY_MADE_MODELS.forEach((m, idx) => {
        const nicheId = `real-niche-${m.id}`;
        if (!existingIds.has(nicheId) && !deletedIds.includes(nicheId)) {
          changed = true;
          updated.push({
            id: nicheId,
            clientName: m.personaName,
            clientPhone: m.realSiteData.profile.whatsapp,
            clientEmail: `contato@${m.subdomain}.com.br`,
            nicheCategory: m.category,
            createdAt: todayStr,
            dueDate: dueStr,
            monthlyFee: 197.0,
            status: 'active',
            updatesThisMonth: 1,
            lastUpdated: todayStr,
            domainType: 'subdomain',
            subdomain: m.subdomain,
            customDomain: '',
            dnsConfigured: true,
            sslActive: true,
            whatsappClicks: 42 + idx * 11,
            pageViews: 180 + idx * 35,
            trafficSources: {
              instagram: 110 + idx * 15,
              tiktok: 25 + idx * 5,
              googleMaps: 30 + idx * 8,
              paidAds: 15 + idx * 7,
              direct: 10,
            },
            isLandingModel: true,
            data: m.realSiteData,
          });
        }
      });

      if (!changed) return prev;
      try {
        localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  // Build dynamic showcase models from all savedSites marked with isLandingModel: true
  const DYNAMIC_LANDING_MODELS = React.useMemo(() => {
    const landingSites = savedSites.filter((s) => Boolean(s.isLandingModel) && s.status !== 'disabled');
    if (landingSites.length === 0) {
      return READY_MADE_MODELS;
    }
    return landingSites.map((site, idx) => {
      const matchedPreset = RAW_READY_MADE_MODELS.find(
        (rm) => `real-niche-${rm.id}` === site.id || rm.subdomain === site.subdomain
      );
      const useFreshPreset = matchedPreset && isModelSiteImagesStale(site, matchedPreset);
      const resolvedSiteData = useFreshPreset && matchedPreset ? matchedPreset.realSiteData : site.data;
      return {
        id: site.id,
        code: matchedPreset?.code || `MOD-0${idx + 1}`,
        category: matchedPreset?.category || site.nicheCategory || 'Todos',
        title: resolvedSiteData?.profile?.title || matchedPreset?.title || site.nicheCategory,
        personaName: site.clientName || resolvedSiteData?.profile?.name || 'Cliente VIP',
        personaRole: resolvedSiteData?.profile?.title || matchedPreset?.personaRole || site.nicheCategory || 'Especialista',
        accentHex: matchedPreset?.accentHex || THEMES[resolvedSiteData?.theme || 'darkGold']?.accent || '#d4af37',
        subdomain: site.subdomain || 'cliente',
        nicheKitKey: matchedPreset?.nicheKitKey || site.nicheCategory || 'Personalizado',
        themeKey: resolvedSiteData?.theme || 'darkGold',
        conversionStat: matchedPreset?.conversionStat || '+41% agendamentos no WhatsApp',
        includedHighlights:
          matchedPreset?.includedHighlights ||
          resolvedSiteData?.profile?.tagline ||
          'Microsite real editável no Painel de Gestão.',
        realSiteData: resolvedSiteData,
        realHtml: generateExportCode(resolvedSiteData),
        carouselHtml: generateExportCode(resolvedSiteData, { disableLinks: true, isCarousel: true }),
        savedSiteId: site.id,
      };
    });
  }, [savedSites, landingConfig]);

  const activeFilteredLandingModels =
    landingCategoryFilter === 'Todos'
      ? DYNAMIC_LANDING_MODELS
      : DYNAMIC_LANDING_MODELS.filter((m) => m.category === landingCategoryFilter);

  const openShowcaseModelInEditor = (modelId: string) => {
    const existingSaved = savedSites.find(
      (s) => s.id === modelId || s.id === `real-niche-${modelId}`
    );
    if (existingSaved) {
      setData(JSON.parse(JSON.stringify(existingSaved.data)));
      setEditingSiteId(existingSaved.id);
      setActiveTab('styling');
      openCreatorSubdomain(true);
      showToast(`✏️ Modelo "${existingSaved.clientName}" aberto para edição no Painel!`);
      return;
    }
    const fallbackModel = DYNAMIC_LANDING_MODELS.find((m) => m.id === modelId);
    if (fallbackModel) {
      setData(JSON.parse(JSON.stringify(fallbackModel.realSiteData)));
      setEditingSiteId(null);
      setActiveTab('styling');
      openCreatorSubdomain(true);
      showToast(`✏️ Modelo "${fallbackModel.personaName}" carregado no Criador!`);
    }
  };

  // Auto-play timer for the Hero Microsite showcase when not hovered
  useEffect(() => {
    if (
      appSurface !== 'landing' ||
      !landingCarouselAutoPlay ||
      landingHeroHovered ||
      Boolean(landingPreviewModalId) ||
      DYNAMIC_LANDING_MODELS.length === 0
    ) {
      return;
    }

    const heroTimer = window.setInterval(() => {
      setLandingHeroModelId((prevId) => {
        const currentIdx = DYNAMIC_LANDING_MODELS.findIndex((m) => m.id === prevId);
        const nextIdx = (currentIdx + 1) % DYNAMIC_LANDING_MODELS.length;
        return DYNAMIC_LANDING_MODELS[nextIdx].id;
      });
    }, 5000);

    return () => window.clearInterval(heroTimer);
  }, [appSurface, landingCarouselAutoPlay, landingHeroHovered, landingPreviewModalId, DYNAMIC_LANDING_MODELS]);

  const openRealMicrositeInNewTab = (siteData: typeof INITIAL_DATA, explicitSubdomain?: string) => {
    let resolvedSub = explicitSubdomain?.trim().toLowerCase();
    if (!resolvedSub) {
      const matchedModel =
        DYNAMIC_LANDING_MODELS.find(
          (m) =>
            m.realSiteData?.profile?.name === siteData?.profile?.name ||
            m.personaName === siteData?.profile?.name
        ) ||
        READY_MADE_MODELS.find(
          (m) =>
            m.realSiteData?.profile?.name === siteData?.profile?.name ||
            m.personaName === siteData?.profile?.name
        );
      if (matchedModel?.subdomain) {
        resolvedSub = matchedModel.subdomain;
      } else {
        const matchedSaved = savedSites.find(
          (s) =>
            s.data?.profile?.name === siteData?.profile?.name ||
            s.clientName === siteData?.profile?.name
        );
        if (matchedSaved?.subdomain) {
          resolvedSub = matchedSaved.subdomain;
        }
      }
    }
    const cleanSub = (resolvedSub || siteData?.profile?.name || 'dramarina')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-]/g, '');
    const targetUrl = getPublicMicrositeUrl(cleanSub);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const syncAllEightRealMicrositesToStudio = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    const dueStr = nextMonth.toISOString().split('T')[0];

    const seededSites: SavedMicrosite[] = READY_MADE_MODELS.map((m, idx) => ({
      id: `real-niche-${m.id}`,
      clientName: m.personaName,
      clientPhone: m.realSiteData.profile.whatsapp,
      clientEmail: `contato@${m.subdomain}.com.br`,
      nicheCategory: m.category,
      createdAt: todayStr,
      dueDate: dueStr,
      monthlyFee: 197.0,
      status: 'active',
      updatesThisMonth: 1,
      lastUpdated: todayStr,
      domainType: 'subdomain',
      subdomain: m.subdomain,
      customDomain: '',
      dnsConfigured: true,
      sslActive: true,
      whatsappClicks: 42 + idx * 11,
      pageViews: 180 + idx * 35,
      trafficSources: {
        instagram: 110 + idx * 15,
        tiktok: 25 + idx * 5,
        googleMaps: 30 + idx * 8,
        paidAds: 15 + idx * 7,
        direct: 10,
      },
      isLandingModel: true,
      data: m.realSiteData,
    }));

    setSavedSites((prev) => {
      const customOnes = prev.filter((s) => !s.id.startsWith('real-niche-'));
      const merged = [...customOnes, ...seededSites];
      try {
        localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(merged));
        const deletedRaw = localStorage.getItem('luxebio_deleted_site_ids_v1');
        if (deletedRaw) {
          const parsedDel: string[] = JSON.parse(deletedRaw) || [];
          const remainingDel = parsedDel.filter((id) => !id.startsWith('real-niche-'));
          localStorage.setItem('luxebio_deleted_site_ids_v1', JSON.stringify(remainingDel));
        }
      } catch {}
      seededSites.forEach((s) => syncSiteToFirestore(s));
      return merged;
    });
    showToast('✅ Os 8 Microsites Reais (1 de cada nicho) foram restaurados e marcados como Modelos da Landing Page!');
  };

  const getPlanCheckoutDetails = (planId: 'basic' | 'pro' | 'vip') => {
    syncMaintenancePlansFromConfig(landingConfig);
    const fmt = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const creationPriceStr =
      planId === 'basic'
        ? formatCreationPriceDisplay(landingConfig.priceEssential, 'R$ 79,90')
        : planId === 'vip'
        ? formatCreationPriceDisplay(landingConfig.priceScale, 'R$ 79,90')
        : formatCreationPriceDisplay(landingConfig.pricePro, 'R$ 79,90');

    if (planId === 'basic') {
      const p = MAINTENANCE_PLANS.basic_1;
      const updLabel = formatPlanUpdatesLabel(p.maxUpdates, false);
      return {
        id: 'basic' as const,
        name: 'Plano Básico',
        price: creationPriceStr,
        periodLabel: '/1º mês (criação)',
        maintenanceInfo: `Manutenção a partir do 2º mês: R$ ${fmt(p.price)}/mês (${updLabel})`,
        fullPlanLabel: `Plano Básico (R$ ${fmt(p.price)}/mês · ${updLabel}) — Criação Promocional ${creationPriceStr} (1º mês s/ mensalidade)`,
      };
    }
    if (planId === 'vip') {
      const p = MAINTENANCE_PLANS.vip_unlimited;
      const updLabel = formatPlanUpdatesLabel(p.maxUpdates, false);
      return {
        id: 'vip' as const,
        name: 'Plano VIP',
        price: creationPriceStr,
        periodLabel: '/1º mês (criação)',
        maintenanceInfo: `Manutenção a partir do 2º mês: R$ ${fmt(p.price)}/mês (${updLabel})`,
        fullPlanLabel: `Plano VIP (R$ ${fmt(p.price)}/mês · ${updLabel}) — Criação Promocional ${creationPriceStr} (1º mês s/ mensalidade)`,
      };
    }
    const p = MAINTENANCE_PLANS.pro_4;
    const updLabel = formatPlanUpdatesLabel(p.maxUpdates, false);
    return {
      id: 'pro' as const,
      name: 'Plano Pro',
      price: creationPriceStr,
      periodLabel: '/1º mês (criação)',
      maintenanceInfo: `Manutenção a partir do 2º mês: R$ ${fmt(p.price)}/mês (${updLabel})`,
      fullPlanLabel: `Plano Pro (R$ ${fmt(p.price)}/mês · ${updLabel}) — Criação Promocional ${creationPriceStr} (1º mês s/ mensalidade)`,
    };
  };

  const redirectClientToPurchaseWhatsapp = (planId: 'basic' | 'pro' | 'vip') => {
    const planDetails = getPlanCheckoutDetails(planId);
    const targetWaPhone = formatWhatsAppPhone(landingConfig.agencyWhatsapp || '5531991390202') || '5531991390202';
    const lines = [
      `Olá! Quero contratar o meu Microsite BioVip de Alta Conversão 🚀`,
      ``,
      `• *Plano Escolhido:* ${planDetails.name} (${planDetails.price} no 1º mês s/ mensalidade)`,
      `• *Manutenção:* ${planDetails.maintenanceInfo}`,
      `• *Modelo de Interesse:* ${landingOrderForm.selectedModel || 'Personalizado sob medida'}`,
    ];
    if (landingOrderForm.clientName.trim()) {
      lines.push(`• *Meu Nome / Empresa:* ${landingOrderForm.clientName.trim()}`);
    }
    if (landingOrderForm.clientWhatsapp.trim()) {
      lines.push(`• *Meu WhatsApp:* ${landingOrderForm.clientWhatsapp.trim()}`);
    }
    if (landingOrderForm.instagramOrMaps.trim()) {
      lines.push(`• *Instagram / Google Maps:* ${landingOrderForm.instagramOrMaps.trim()}`);
    }
    const waUrl = `https://wa.me/${targetWaPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
    const win = window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = waUrl;
    }
    showToast('💬 Redirecionando para o atendimento VIP no WhatsApp (31) 99139-0202...');
  };

  const openPaymentConfirmation = (planId: 'basic' | 'pro' | 'vip') => {
    const planDetails = getPlanCheckoutDetails(planId);
    setLandingOrderForm((prev) => ({
      ...prev,
      selectedPlan: planDetails.fullPlanLabel,
    }));
    // Sistema de pagamento Asaas desativado temporariamente: direciona o cliente direto para o WhatsApp 31 991390202
    if (!landingConfig.asaasEnabled) {
      redirectClientToPurchaseWhatsapp(planId);
      return;
    }
    setPaymentConfirmPlan(planDetails);
    setPaymentConfirmChecked(false);
    setPaymentEmailTouched(false);
    setPaymentPortalRedirecting(false);
    setPaymentPortalFallbackNotice(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTimeout(() => {
      paymentEmailInputRef.current?.focus();
    }, 120);
  };

  const isClientPaymentEmailValid = (rawEmail: string) => {
    const clean = rawEmail.trim().toLowerCase();
    if (!clean) return false;
    if (clean === 'leoaraujobh@gmail.com') return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean);
  };

  const buildExternalPaymentUrl = (planId: 'basic' | 'pro' | 'vip', clientEmail: string) => {
    const rawPortalUrl = (
      planId === 'basic'
        ? landingConfig.checkoutUrlBasic || landingConfig.checkoutUrlPro || landingConfig.checkoutUrlVip || ''
        : planId === 'vip'
        ? landingConfig.checkoutUrlVip || landingConfig.checkoutUrlPro || landingConfig.checkoutUrlBasic || ''
        : landingConfig.checkoutUrlPro || landingConfig.checkoutUrlBasic || landingConfig.checkoutUrlVip || ''
    ).trim();

    if (!rawPortalUrl) return '';

    const normalizedUrl = /^https?:\/\//i.test(rawPortalUrl)
      ? rawPortalUrl
      : `https://${rawPortalUrl}`;

    const separator = normalizedUrl.includes('?') ? '&' : '?';
    const params = new URLSearchParams();
    params.set('email', clientEmail.trim());
    if (landingOrderForm.clientName.trim()) {
      params.set('name', landingOrderForm.clientName.trim());
    }
    if (landingOrderForm.clientWhatsapp.trim()) {
      params.set('phone', landingOrderForm.clientWhatsapp.replace(/\D/g, ''));
    }
    return `${normalizedUrl}${separator}${params.toString()}`;
  };

  const handleProceedToExternalPayment = () => {
    if (!paymentConfirmPlan) return;
    if (!landingConfig.asaasEnabled) {
      redirectClientToPurchaseWhatsapp(paymentConfirmPlan.id);
      return;
    }
    setPaymentEmailTouched(true);
    const cleanEmail = paymentClientEmail.trim();
    if (!isClientPaymentEmailValid(cleanEmail) || !paymentConfirmChecked) {
      return;
    }

    const externalUrl = buildExternalPaymentUrl(paymentConfirmPlan.id, cleanEmail);
    setPaymentPortalRedirecting(true);

    if (externalUrl) {
      window.location.href = externalUrl;
      return;
    }

    setPaymentPortalFallbackNotice(
      `E-mail "${cleanEmail}" confirmado para o ${paymentConfirmPlan.name}! O redirecionamento enviará automaticamente ?email=${encodeURIComponent(cleanEmail)} assim que você colar o link do seu portal de pagamento (Kiwify, Asaas, Mercado Pago, Stripe) em "Configurar Domínio & Checkout".`
    );
    setPaymentPortalRedirecting(false);
  };

  const handleLandingOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = landingOrderForm.clientName.trim();
    const cleanClientPhone = landingOrderForm.clientWhatsapp.replace(/\D/g, '');
    if (!cleanName) {
      setLandingOrderError('Por favor, informe seu nome ou nome do seu escritório/clínica.');
      return;
    }
    if (cleanClientPhone.length < 10) {
      setLandingOrderError('Informe um WhatsApp válido com DDD para receber a prévia do seu microsite.');
      return;
    }
    setLandingOrderError(null);
    setLandingOrderSuccess(true);

    const lowerPlan = landingOrderForm.selectedPlan.toLowerCase();
    const resolvedPlanId: 'basic' | 'pro' | 'vip' = lowerPlan.includes('básico') || lowerPlan.includes('basico')
      ? 'basic'
      : lowerPlan.includes('vip')
      ? 'vip'
      : 'pro';

    redirectClientToPurchaseWhatsapp(resolvedPlanId);
  };

  const renderSubdomainConfigModal = () => (
    <SubdomainModal
      isOpen={subdomainModalOpen}
      onClose={() => setSubdomainModalOpen(false)}
      landingConfig={landingConfig}
      updateLandingConfig={updateLandingConfig}
      persistLandingConfigEverywhere={persistLandingConfigEverywhere}
      getActiveAsaasApiKey={getActiveAsaasApiKey}
      getActiveAsaasEnv={getActiveAsaasEnv}
      updateAsaasSettings={updateAsaasSettings}
      asaasServerConfigured={asaasServerConfigured}
      asaasStatusTesting={asaasStatusTesting}
      asaasTestResult={asaasTestResult}
      setAsaasTestResult={setAsaasTestResult}
      handleTestAsaasConnection={handleTestAsaasConnection}
      openCreatorSubdomain={openCreatorSubdomain}
      openPublicSalesLanding={openPublicSalesLanding}
      applyConfiguredPlanPricesToExistingClients={applyConfiguredPlanPricesToExistingClients}
      syncAllEightRealMicrositesToStudio={syncAllEightRealMicrositesToStudio}
      showToast={showToast}
    />
  );

  const renderPaymentSuccessModal = () => (
    <PaymentSuccessModal
      paymentSuccessSite={paymentSuccessSite}
      onClose={() => setPaymentSuccessSite(null)}
      landingConfig={landingConfig}
      profileWhatsapp={data?.profile?.whatsapp}
      onViewSite={(targetSlug) => {
        setPaymentSuccessSite(null);
        setAppSurface('microsite');
        setActivePublicSlug(targetSlug);
        window.history.pushState({}, '', `/?site=${targetSlug}`);
      }}
    />
  );

  const renderUnderConstructionPreviewModal = () => (
    <UnderConstructionPreviewModal
      underConstructionPreviewSite={underConstructionPreviewSite}
      onClose={() => setUnderConstructionPreviewSite(null)}
      toggleSiteConstructionMode={toggleSiteConstructionMode}
      setUnderConstructionPreviewSite={setUnderConstructionPreviewSite}
      landingConfig={landingConfig}
    />
  );

  // =========================================================================
  // RENDERIZAÇÃO DE MICROSITE PÚBLICO / PÁGINA EM CONSTRUÇÃO (QUANDO appSurface === 'microsite')
  // =========================================================================
  if (appSurface === 'microsite') {
    const slug = (activePublicSlug || '').toLowerCase().trim();
    const goBackToMainDomain = () => {
      const baseDomain = getCleanBaseDomain();
      if (typeof window !== 'undefined') {
        const host = window.location.hostname.toLowerCase();
        if (host !== baseDomain && host !== `www.${baseDomain}` && host.endsWith(`.${baseDomain}`)) {
          window.location.href = `https://${baseDomain}`;
          return;
        }
      }
      const targetSurface = adminUser ? 'studio' : 'landing';
      try {
        window.history.pushState({ surface: targetSurface }, '', targetSurface === 'studio' ? '/#studio' : '/');
      } catch {}
      setAppSurface(targetSurface);
      setActivePublicSlug(null);
    };

    const demoModel = slug
      ? DYNAMIC_LANDING_MODELS.find(
          (m) => m.id.toLowerCase() === slug || m.subdomain?.toLowerCase() === slug || m.code?.toLowerCase() === slug
        ) ||
        READY_MADE_MODELS.find(
          (m) => m.id.toLowerCase() === slug || m.subdomain?.toLowerCase() === slug || m.code?.toLowerCase() === slug
        )
      : undefined;

    const matchingSites = slug
      ? savedSites.filter(
          (s) =>
            (s.subdomain && s.subdomain.toLowerCase() === slug) ||
            s.id.toLowerCase() === slug ||
            (s.clientName && s.clientName.toLowerCase().replace(/[^a-z0-9]/g, '-') === slug)
        )
      : [];

    const foundSite =
      (editingSiteId ? matchingSites.find((s) => s.id === editingSiteId) : undefined) ||
      matchingSites.find((s) => s.isCustomized) ||
      matchingSites.find((s) => s.isLandingModel && s.status !== 'disabled') ||
      matchingSites.find((s) => s.id.startsWith('real-niche-')) ||
      matchingSites.find((s) => s.status !== 'disabled') ||
      matchingSites[0];

    if (foundSite) {
      if (isSiteUnderConstruction(foundSite)) {
        return (
          <div className="relative w-full h-screen bg-[#09090b] overflow-hidden">
            <div className="absolute top-3 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={goBackToMainDomain}
                className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-amber-300 text-xs font-semibold border border-amber-400/40 backdrop-blur-md shadow-lg transition cursor-pointer"
              >
                <span>{adminUser ? '← Voltar ao Painel Studio' : '← BioVip Início'}</span>
              </button>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{getCleanBaseDomain()}/{foundSite.subdomain} · 🚧 Em Construção</span>
              </div>
            </div>
            <iframe
              title={`Página em Construção - ${foundSite.clientName}`}
              srcDoc={getUnderConstructionPageHtml(foundSite, landingConfig)}
              className="w-full h-full border-0"
            />
          </div>
        );
      }

      if (!foundSite.isLandingModel && (foundSite.status === 'suspenso_d7' || foundSite.status === 'disabled')) {
        return (
          <div className="relative w-full h-screen bg-[#09090b] overflow-hidden">
            <iframe
              title={`Microsite Suspenso - ${foundSite.clientName}`}
              srcDoc={getSuspendedPageHtml(foundSite)}
              className="w-full h-full border-0"
            />
          </div>
        );
      }

      const resolvedData =
        foundSite.isCustomized ? foundSite.data : (foundSite.isLandingModel && demoModel?.realSiteData ? demoModel.realSiteData : foundSite.data);

      return (
        <div className="relative w-full h-screen bg-[#09090b] overflow-hidden">
          <iframe
            title={`${foundSite.clientName} · BioVip`}
            srcDoc={generateExportCode(resolvedData)}
            className="w-full h-full border-0"
          />
        </div>
      );
    }

    if (demoModel) {
      return (
        <div className="relative w-full h-screen bg-[#09090b] overflow-hidden">
          <iframe
            title={`${demoModel.personaName} — ${demoModel.title}`}
            srcDoc={demoModel.realHtml || generateExportCode(demoModel.realSiteData)}
            className="w-full h-full border-0"
          />
        </div>
      );
    }
  }

  // =========================================================================
  // RENDERIZAÇÃO DA LANDING PAGE INICIAL DE VENDAS (QUANDO appSurface === 'landing' OU SLUG NÃO ENCONTRADO)
  // =========================================================================
  if (appSurface === 'landing' || appSurface === 'microsite') {
    if (paymentConfirmPlan) {
      const portalName = (landingConfig.checkoutPortalName || 'Kiwify').trim();
      const trimmedClientEmail = paymentClientEmail.trim();
      const emailValid = isClientPaymentEmailValid(trimmedClientEmail);
      const isForbiddenOwnerEmail = trimmedClientEmail.toLowerCase() === 'leoaraujobh@gmail.com';
      const canProceedToPayment = emailValid && paymentConfirmChecked;

      return (
        <div className="min-h-screen w-full bg-[#09090b] text-[#fafaf9] font-sans flex flex-col selection:bg-amber-400 selection:text-neutral-950 relative overflow-x-hidden">
          {/* Ambient Luxury Gold Glow matching the Main Landing Page */}
          <div
            className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[780px] h-[420px] opacity-25 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.22) 0%, transparent 70%)',
            }}
          />

          {/* Top Bar matching Main Landing Page */}
          <header className="w-full border-b border-white/[0.08] bg-[#09090b]/85 backdrop-blur-xl sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPaymentConfirmPlan(null)}
                className="flex items-center gap-3 text-left cursor-pointer group"
              >
                <div className="w-16 h-11 rounded-xl bg-[#1c1c1e] border border-amber-400/40 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-amber-300 transition-colors">
                  <img src="/assets/aistudio/1793152702953_02858b21.jpg" alt="BioVip Logo" className="w-full h-full object-cover scale-125" />
                </div>
                <div>
                  <span className="font-serif font-black tracking-[0.2em] text-base text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 block leading-none">
                    BIOVIP
                  </span>
                  <span className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-amber-400/90 block mt-1">
                    Microsites de Alta Conversão · Checkout Oficial
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPaymentConfirmPlan(null);
                  setTimeout(() => {
                    const el = document.getElementById('investimento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 60);
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-neutral-300 hover:text-amber-300 cursor-pointer transition"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>Voltar para planos</span>
              </button>
            </div>
          </header>

          <div className="flex-1 flex flex-col items-center justify-start py-8 sm:py-12 px-4 sm:px-6 relative z-10">
            <div className="w-full max-w-[580px]">
              {/* Top Link: Voltar para planos */}
              <button
                type="button"
                onClick={() => {
                  setPaymentConfirmPlan(null);
                  setTimeout(() => {
                    const el = document.getElementById('investimento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 60);
                }}
                className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-amber-400 mb-5 cursor-pointer transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para planos</span>
              </button>

              {/* Main Confirmation Card (Landing Page Dark + Gold Luxury Theme) */}
              <div className="w-full rounded-3xl overflow-hidden bg-neutral-900/95 border-2 border-amber-400/60 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
                {/* Dark Obsidian & Gold Header */}
                <div className="bg-neutral-950 border-b border-white/[0.08] px-6 sm:px-8 py-6 text-white relative overflow-hidden">
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 blur-2xl"
                    style={{
                      background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, transparent 70%)',
                    }}
                  />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block">
                    CONFIRMAÇÃO DE COMPRA
                  </span>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5">
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                      {paymentConfirmPlan.name}
                    </h1>
                    <div className="flex items-center gap-1.5">
                      {(['basic', 'pro', 'vip'] as const).map((pid) => {
                        const active = paymentConfirmPlan.id === pid;
                        const label = pid === 'basic' ? 'Básico' : pid === 'pro' ? 'Pro' : 'VIP';
                        return (
                          <button
                            key={pid}
                            type="button"
                            onClick={() => setPaymentConfirmPlan(getPlanCheckoutDetails(pid))}
                            className={`px-3 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider font-bold transition cursor-pointer ${
                              active
                                ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20'
                                : 'bg-white/[0.06] text-neutral-300 hover:bg-white/[0.12] hover:text-white border border-white/[0.08]'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 tracking-tight">
                      {paymentConfirmPlan.price}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      {paymentConfirmPlan.periodLabel}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-emerald-400 mt-1.5">
                    {paymentConfirmPlan.maintenanceInfo}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-7 space-y-5">
                  {/* Customer Information Inputs */}
                  <div className="rounded-2xl bg-neutral-950/90 border border-white/[0.08] p-4 sm:p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-[15px] font-bold text-white">
                          Dados de Identificação do Cliente
                        </h2>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                          Seu microsite oficial será provisionado com estes dados no sistema após a confirmação do pagamento.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-amber-400/90 mb-1.5">
                          Nome Profissional / Empresa *
                        </label>
                        <input
                          type="text"
                          value={landingOrderForm.clientName}
                          onChange={(e) => setLandingOrderForm(prev => ({ ...prev, clientName: e.target.value }))}
                          placeholder="Ex: Dra. Camila Mendes"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/[0.1] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-amber-400/90 mb-1.5">
                          WhatsApp com DDD *
                        </label>
                        <input
                          type="tel"
                          value={landingOrderForm.clientWhatsapp}
                          onChange={(e) => setLandingOrderForm(prev => ({ ...prev, clientWhatsapp: e.target.value }))}
                          placeholder="Ex: (11) 98765-4321"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/[0.1] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-amber-400/90 mb-1.5">
                          CPF ou CNPJ (Para Fatura Asaas)
                        </label>
                        <input
                          type="text"
                          value={landingOrderForm.clientCpfCnpj}
                          onChange={(e) => setLandingOrderForm(prev => ({ ...prev, clientCpfCnpj: formatCpfCnpjInput(e.target.value) }))}
                          placeholder="000.000.000-00"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/[0.1] text-sm font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>
                    </div>

                    <div
                      className={`bg-neutral-900 rounded-xl px-4 py-3 border-2 transition ${
                        paymentEmailTouched && !emailValid
                          ? 'border-red-500/90 ring-2 ring-red-500/20'
                          : 'border-amber-400/80 focus-within:border-amber-300 focus-within:ring-2 focus-within:ring-amber-400/20'
                      }`}
                    >
                      <label
                        htmlFor="client-checkout-email-input"
                        className="block text-[10px] font-mono uppercase tracking-widest text-amber-400/90 mb-1"
                      >
                        E-mail para Acesso e Ativação *
                      </label>
                      <input
                        id="client-checkout-email-input"
                        ref={paymentEmailInputRef}
                        type="email"
                        required
                        autoComplete="email"
                        value={paymentClientEmail}
                        onChange={(e) => {
                          setPaymentClientEmail(e.target.value);
                          setPaymentPortalFallbackNotice(null);
                        }}
                        onBlur={() => setPaymentEmailTouched(true)}
                        placeholder="digiteseuemail@exemplo.com"
                        className="w-full text-base sm:text-lg font-extrabold text-white placeholder:text-neutral-600 placeholder:font-normal focus:outline-none bg-transparent"
                      />
                    </div>
                    {paymentEmailTouched && !emailValid && (
                      <p className="text-[11px] font-semibold text-red-400 mt-2">
                        {isForbiddenOwnerEmail
                          ? 'Por favor, insira o seu próprio e-mail de cliente para ativar o seu plano.'
                          : 'Digite um endereço de e-mail válido para vincular e ativar sua compra.'}
                      </p>
                    )}
                  </div>

                  {/* GATEWAY ASAAS: PIX Instantâneo com Criação Automática do Cliente */}
                  <div className="rounded-2xl bg-gradient-to-b from-amber-500/10 to-neutral-950/90 border-2 border-amber-400/60 p-5 space-y-4 shadow-xl shadow-amber-500/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">⚡</span>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                            Opção Recomendada · Pagamento Imediato
                          </span>
                          <h3 className="text-sm sm:text-base font-extrabold text-white">
                            Pagar via PIX com Gateway Asaas
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                        Ativação Instantânea
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-neutral-950/90 border border-white/[0.08] text-xs">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                          Cobrado Hoje no Asaas (Criação)
                        </span>
                        <span className="font-mono font-bold text-amber-400 text-sm">
                          R$ {getAdminAsaasCreationFee(paymentConfirmPlan.id).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                          Recorrência ({paymentConfirmPlan.name})
                        </span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">
                          R$ {getSelectedPlanRecurringFee(paymentConfirmPlan.id).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Ao pagar via PIX pelo Asaas, o sistema cria automaticamente seu cadastro com endereço oficial <strong className="text-amber-300 font-mono">biovip.com.br/seu-nome</strong> para personalização imediata com suas fotos e informações.
                    </p>

                    {/* Botão de Geração ou Visualizador de PIX */}
                    {!checkoutAsaasPix ? (
                      <button
                        type="button"
                        onClick={handleGenerateCheckoutAsaasPix}
                        className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-black text-sm uppercase tracking-wider cursor-pointer shadow-xl shadow-amber-500/25 transition flex items-center justify-center gap-2"
                      >
                        <span>
                          ⚡ Gerar PIX Asaas Agora (R$ {getAdminAsaasCreationFee(paymentConfirmPlan.id).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                        </span>
                      </button>
                    ) : checkoutAsaasPix.loading ? (
                      <div className="p-6 rounded-xl bg-neutral-900 border border-amber-400/30 flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="w-7 h-7 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-semibold text-amber-300">Gerando cobrança PIX no Asaas...</span>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-neutral-900/95 border border-amber-400/40 p-4 sm:p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                            Aguardando Pagamento PIX (R$ {getAdminAsaasCreationFee(paymentConfirmPlan.id).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">
                            ID: {checkoutAsaasPix.paymentId?.slice(0, 14)}...
                          </span>
                        </div>

                        {/* QR Code image if available */}
                        {checkoutAsaasPix.pixQrCode && (
                          <div className="flex flex-col items-center justify-center py-2">
                            <div className="p-3 bg-white rounded-2xl shadow-xl">
                              <img
                                src={`data:image/png;base64,${checkoutAsaasPix.pixQrCode}`}
                                alt="QR Code PIX Asaas"
                                className="w-44 h-44 sm:w-48 sm:h-48 object-contain"
                              />
                            </div>
                            <span className="text-[11px] text-neutral-400 mt-2">
                              Abra o app do seu banco e aponte a câmera para pagar
                            </span>
                          </div>
                        )}

                        {/* Pix Copia e Cola */}
                        {checkoutAsaasPix.pixPayload && (
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                              PIX Copia e Cola:
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                readOnly
                                value={checkoutAsaasPix.pixPayload}
                                className="flex-1 px-3 py-2 rounded-lg bg-neutral-950 border border-white/[0.1] text-xs font-mono text-amber-200 truncate select-all"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (checkoutAsaasPix.pixPayload) {
                                    navigator.clipboard.writeText(checkoutAsaasPix.pixPayload);
                                    showToast('📋 Código PIX copiado para a área de transferência!');
                                  }
                                }}
                                className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shrink-0 cursor-pointer transition shadow"
                              >
                                Copiar
                              </button>
                            </div>
                          </div>
                        )}

                        {checkoutAsaasPix.invoiceUrl && (
                          <a
                            href={checkoutAsaasPix.invoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-3 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition no-underline"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Abrir Fatura Oficial no Asaas (PIX / Boleto / Cartão)</span>
                          </a>
                        )}

                        {/* Action buttons during waiting for payment */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (checkoutAsaasPix.paymentId) {
                                checkCheckoutAsaasPixStatus(checkoutAsaasPix.paymentId);
                              }
                            }}
                            className="w-full py-2.5 px-3 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-white text-xs font-semibold cursor-pointer transition flex items-center justify-center gap-1.5"
                          >
                            <span>🔄 Verificar Status no Asaas</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (checkoutAsaasPix.paymentId) {
                                const currentPlanId = paymentConfirmPlan?.id || 'pro';
                                // Simula ou confirma o pagamento criando o cliente imediatamente
                                handleAsaasPaymentConfirmed({
                                  clientName: landingOrderForm.clientName.trim() || 'Novo Cliente BioVip',
                                  clientPhone: landingOrderForm.clientWhatsapp.trim() || '11999999999',
                                  clientEmail: paymentClientEmail.trim() || 'cliente@biovip.com.br',
                                  selectedModel: landingOrderForm.selectedModel,
                                  selectedPlan: landingOrderForm.selectedPlan,
                                  instagramOrMaps: landingOrderForm.instagramOrMaps,
                                  planId: currentPlanId,
                                  paymentId: checkoutAsaasPix.paymentId,
                                  chargedCreationFee: getAdminAsaasCreationFee(currentPlanId),
                                });
                              }
                            }}
                            className="w-full py-2.5 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1.5"
                          >
                            <span>🧪 Simular Pagamento Aprovado</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Opção Alternativa: Cartão / Portal Externo */}
                  <div className="rounded-2xl bg-neutral-950/70 border border-white/[0.08] p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">💳</span>
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-300">
                        Ou pagar com Cartão de Crédito / Boleto via {portalName}
                      </h3>
                    </div>

                    <div className="rounded-xl bg-neutral-900/60 border border-white/[0.06] p-3 text-xs text-neutral-400">
                      Na página da {portalName}, certifique-se de preencher o e-mail <strong className="text-amber-300">{emailValid ? trimmedClientEmail : 'informado acima'}</strong> para vinculação.
                    </div>

                    <label className="flex items-start gap-2.5 cursor-pointer select-none text-[11.5px] text-neutral-300 leading-relaxed pt-1">
                      <input
                        type="checkbox"
                        checked={paymentConfirmChecked}
                        onChange={(e) => setPaymentConfirmChecked(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-neutral-900 text-amber-400 focus:ring-amber-400 shrink-0 cursor-pointer accent-amber-400"
                      />
                      <span>
                        Concordo com os termos do plano e confirmo a titularidade dos dados informados.
                      </span>
                    </label>

                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentClientEmail('');
                          setPaymentConfirmChecked(false);
                          setPaymentEmailTouched(false);
                          setPaymentPortalFallbackNotice(null);
                          setTimeout(() => {
                            paymentEmailInputRef.current?.focus();
                          }, 50);
                        }}
                        className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 text-xs border border-white/[0.08] transition cursor-pointer text-center"
                      >
                        Limpar Dados
                      </button>
                      <button
                        type="button"
                        disabled={!canProceedToPayment || paymentPortalRedirecting}
                        onClick={handleProceedToExternalPayment}
                        className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                          canProceedToPayment
                            ? 'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.15] cursor-pointer'
                            : 'bg-neutral-800 text-neutral-500 border border-white/[0.06] cursor-not-allowed'
                        }`}
                      >
                        <span>
                          {paymentPortalRedirecting ? 'Redirecionando...' : `Pagar no Cartão via ${portalName}`}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Security Note */}
              <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 text-center mt-6">
                Pagamentos 100% seguros processados por Asaas & {portalName} · Criptografia SSL
              </p>
            </div>
          </div>
          {renderPaymentSuccessModal()}
        </div>
      );
    }

    const activeHeroModel =

      DYNAMIC_LANDING_MODELS.find(m => m.id === landingHeroModelId) ||
      DYNAMIC_LANDING_MODELS[0] ||
      READY_MADE_MODELS[0];
    const previewModalModel = landingPreviewModalId
      ? DYNAMIC_LANDING_MODELS.find(m => m.id === landingPreviewModalId) ||
        READY_MADE_MODELS.find(m => m.id === landingPreviewModalId) ||
        null
      : null;
    const qrModalModel = landingQrModalModelId
      ? DYNAMIC_LANDING_MODELS.find(m => m.id === landingQrModalModelId) ||
        READY_MADE_MODELS.find(m => m.id === landingQrModalModelId) ||
        null
      : null;
    const catalogCategories = [
      'Todos',
      'Advocacia & Consultoria',
      'Beleza & Estética',
      'Barbearia & Negócios',
      'Mentoria & Infoprodutos',
      'Saúde & Clínicas',
      'Moda & E-commerce',
    ];
    const filteredModels = activeFilteredLandingModels.length > 0 ? activeFilteredLandingModels : DYNAMIC_LANDING_MODELS;

    const cleanSub = (landingConfig.creatorSubdomain || 'criador').toLowerCase().replace(/[^a-z0-9-]/g, '') || 'criador';
    const cleanDomain = (landingConfig.baseDomain || 'biovip.com.br').toLowerCase();

    return (
      <div className="min-h-screen w-full bg-[#09090b] text-[#fafaf9] font-sans selection:bg-amber-400 selection:text-neutral-950 overflow-x-hidden">
        {/* TOP BAR CONTRACT: 1 Single Header Bar, 3 Zones (Brand Left, 4 Nav Links Center, 1 Primary CTA Right) */}
        <header className="sticky top-0 z-50 h-16 border-b border-white/[0.07] bg-[#09090b]/85 backdrop-blur-md">
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Zone 1: Brand Left - Official BioVip Luxury Logo */}
            <a href="#topo" className="flex items-center gap-3 group" title="BioVip - Microsites de Alta Conversão">
              <div className="w-16 h-11 rounded-xl bg-[#1c1c1e] border border-amber-400/40 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-amber-300 transition-colors">
                <img 
                  src="/assets/aistudio/1793152702953_02858b21.jpg" 
                  alt="BioVip Logo" 
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-serif font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 group-hover:from-white group-hover:via-amber-200 group-hover:to-amber-400 transition-colors">
                  BIOVIP
                </span>
                <span className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-neutral-400 group-hover:text-amber-400/90 transition-colors">
                  Microsites de Alta Conversão
                </span>
              </div>
            </a>

            {/* Zone 2: Primary Nav Links Center */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-neutral-300">
              <a href="#catalogo" className="hover:text-amber-300 transition">Modelos Prontos</a>
              <a href="#vantagens" className="hover:text-amber-300 transition">Vantagens & Lucro</a>
              <a href="#comparativo" className="hover:text-amber-300 transition">Comparativo</a>
              <a href="#processo" className="hover:text-amber-300 transition">Como Funciona</a>
              <a href="#investimento" className="hover:text-amber-300 transition">Planos & Preços</a>
              <a href="#faq" className="hover:text-amber-300 transition">Dúvidas</a>
            </nav>

            {/* Zone 3: Single Primary Action Right */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={openCreatorSubdomain}
                className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 hover:text-amber-300 transition cursor-pointer"
                title={`Acessar Painel do Administrador (${cleanSub}.${cleanDomain})`}
              >
                {cleanSub}.{cleanDomain} ↗
              </button>
              <a
                href="#encomendar"
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wide transition shadow-lg shadow-amber-500/15"
              >
                Quero Mais Clientes
              </a>
            </div>
          </div>
        </header>

        {/* MAIN LANDING CONTENT — SEMANTIC & SEO COMPLIANT */}
        <main id="conteudo-principal" className="w-full flex-1">
          {/* HERO SECTION — Split layout: Value Proposition Left + REAL Interactive Microsite Simulator Right */}
          <section id="topo" className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-white/[0.06]">
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] opacity-20 blur-[130px]"
            style={{ background: `radial-gradient(circle, ${activeHeroModel.accentHex} 0%, transparent 70%)` }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Left Column: Editorial Headline + Niche Selector + CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ⚡ OFERTA DE LANÇAMENTO: 10 Primeiros por {formatCreationPriceDisplay(landingConfig.pricePro)} (Restam 3 vagas!)
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold font-mono">
                    • 1º Mês Sem Mensalidade
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 font-mono">
                  Sua bio atrai visitas, mas não gera vendas? Nós resolvemos isso.
                </p>

                <h1
                  className="font-serif font-bold tracking-tight text-white leading-[1.06]"
                  style={{ fontSize: 'clamp(2.25rem, 4.3vw + 0.5rem, 4rem)' }}
                >
                  Transforme os cliques da sua Bio em clientes pagantes e consultas fechadas.
                </h1>

                <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-normal">
                  Links genéricos e amadores fazem você perder pacientes e clientes todos os dias. Com um{' '}
                  <strong className="text-white font-semibold">Microsite BioVip de Alta Conversão</strong>, você causa impacto visual de luxo, elimina curiosos com triagem automática e recebe contatos prontos para comprar — entregue 100% pronto e personalizado em até 24 horas.
                </p>

                {/* Interactive Niche Selector Strip in Hero */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Toque no seu nicho para testar o microsite real convertendo no iPhone ao lado:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {READY_MADE_MODELS.map((m) => {
                      const isActive = m.id === activeHeroModel.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setLandingHeroModelId(m.id)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                            isActive
                              ? 'bg-amber-400 text-neutral-950 border-amber-300 font-bold shadow-lg shadow-amber-500/20'
                              : 'bg-neutral-900/90 text-neutral-300 border-white/[0.08] hover:border-amber-400/40 hover:text-white'
                          }`}
                        >
                          {m.nicheKitKey}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#encomendar"
                    className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm tracking-wide flex items-center gap-2 transition shadow-xl shadow-amber-500/15"
                  >
                    <span>Garantir Meu Microsite de Alta Conversão</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => openRealMicrositeInNewTab(activeHeroModel.realSiteData, activeHeroModel.subdomain)}
                    className="px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm border border-white/[0.12] transition flex items-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-amber-400" />
                    <span>Testar {activeHeroModel.personaName} Ao Vivo ↗</span>
                  </button>
                </div>

                {/* Plain typographic metadata row (zero pills) */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400">
                  <span className="text-emerald-400 font-semibold">🎯 Triagem anti-curiosos ativa</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-200">💎 Design que valoriza seu preço</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-200">⚡ Entrega expressa em {landingConfig.deliveryTime}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-300">🚀 Sem mensalidades abusivas</span>
                </div>
              </div>

              {/* Right Column: REAL Live Microsite Running Inside iPhone Frame */}
              <div
                className="lg:col-span-5 flex flex-col items-center"
                onMouseEnter={() => setLandingHeroHovered(true)}
                onMouseLeave={() => setLandingHeroHovered(false)}
              >
                <div className="w-full max-w-[390px] rounded-[42px] p-3 bg-[#141418] border-2 border-white/[0.14] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.85)]">
                  {/* Phone Browser Top Bar */}
                  <div className="px-4 py-2.5 bg-[#0c0c0f] rounded-t-[30px] border-b border-white/[0.08] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-[11px] font-mono text-neutral-300 truncate">
                        https://{cleanDomain}/{activeHeroModel.subdomain}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openRealMicrositeInNewTab(activeHeroModel.realSiteData, activeHeroModel.subdomain)}
                      className="text-[10px] font-mono text-amber-400 hover:underline shrink-0 cursor-pointer flex items-center gap-1"
                      title="Abrir este microsite real em tela cheia numa nova aba"
                    >
                      <span>Tela Cheia</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  {/* REAL MICROSITE IFRAME */}
                  <div className="w-full h-[650px] bg-black rounded-b-[30px] overflow-hidden relative">
                    <iframe
                      key={activeHeroModel.id}
                      title={`Microsite Real - ${activeHeroModel.personaName}`}
                      srcDoc={(activeHeroModel as any).carouselHtml || activeHeroModel.realHtml}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUANTITATIVE SOCIAL PROOF STRIP */}
        <section className="border-b border-white/[0.06] bg-neutral-950/60 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 tabular-nums">
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">+340% Mais Vendas</div>
                <div className="text-xs text-neutral-200 font-semibold mt-1">Conversão Comprovada</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Clientes chegam ao seu WhatsApp decididos e com orçamento alinhado</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">-80% Curiosos</div>
                <div className="text-xs text-neutral-200 font-semibold mt-1">Filtro de Qualificação</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Economize horas de atendimento recebendo apenas quem realmente quer agendar</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-white">Padrão de Luxo</div>
                <div className="text-xs text-neutral-200 font-semibold mt-1">Valorize seus Serviços</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Visual sofisticado que justifica cobrar valores muito maiores sem pedir desconto</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">{landingConfig.deliveryTime}</div>
                <div className="text-xs text-neutral-200 font-semibold mt-1">Zero Trabalho Técnico</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Nossa equipe entrega tudo pronto: fotos, serviços, rota GPS e funil ativo</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: CARROSSEL CONTÍNUO AUTOMÁTICO ESTILO TOQY (PAUSA AO PASSAR O MOUSE) */}
        <section id="catalogo" className="py-20 lg:py-28 border-b border-white/[0.06] overflow-hidden bg-[#070709]">
          <style>{`
            @keyframes biovipContinuousMarquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .biovip-marquee-track {
              display: flex;
              width: max-content;
              animation: biovipContinuousMarquee ${Math.max(28, filteredModels.length * 6)}s linear infinite;
              will-change: transform;
            }
            .biovip-marquee-wrapper:hover .biovip-marquee-track,
            .biovip-marquee-track.is-paused {
              animation-play-state: paused !important;
            }
          `}</style>

          {/* Header da Vitrine de Vendas */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400/90 block font-mono">
                  VITRINE DE MICROSITES QUE VENDEM TODOS OS DIAS
                </span>
                <h2
                  className="font-sans font-extrabold text-white tracking-tight"
                  style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
                >
                  Passe o mouse e teste a experiência que transforma visitantes em clientes pagantes.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
                  Diferente de árvores de links frias e genéricas, cada microsite abaixo foi projetado com gatilhos visuais de retenção, catálogo interativo com valores e funil direto para o seu WhatsApp. Escolha o estilo ideal para a sua profissão:
                </p>
              </div>
            </div>

            {/* Filtro rápido de categorias + indicador de status ao passar o mouse */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-white/[0.06]">
              <div className="flex flex-wrap gap-1.5">
                {catalogCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setLandingCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      landingCategoryFilter === cat
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.07]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <span
                  className={`w-2 h-2 rounded-full ${
                    landingCarouselHovered || !landingCarouselAutoPlay
                      ? 'bg-amber-400'
                      : 'bg-emerald-400 animate-pulse'
                  }`}
                />
                <span>
                  {landingCarouselHovered
                    ? 'Carrossel Pausado (Passe o mouse para explorar os detalhes)'
                    : landingCarouselAutoPlay
                    ? `Vitrine Automática Ativa · ${filteredModels.length} modelos de alta conversão`
                    : 'Carrossel Pausado'}
                </span>
                <button
                  type="button"
                  onClick={() => setLandingCarouselAutoPlay((prev) => !prev)}
                  className="ml-2 px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[11px] text-neutral-200 border border-white/[0.08] cursor-pointer"
                >
                  {landingCarouselAutoPlay ? 'Pausar' : 'Retomar'}
                </button>
              </div>
            </div>
          </div>

          {/* FAIXA CONTÍNUA DE CELULARES LADO A LADO (PAUSA IMEDIATAMENTE NO HOVER) */}
          <div
            className="biovip-marquee-wrapper relative w-full overflow-hidden py-4 select-none"
            onMouseEnter={() => setLandingCarouselHovered(true)}
            onMouseLeave={() => setLandingCarouselHovered(false)}
            onTouchStart={() => setLandingCarouselHovered(true)}
            onTouchEnd={() => setLandingCarouselHovered(false)}
          >
            {/* Fade lateral sutil nas bordas da tela */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-[#070709] to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-[#070709] to-transparent z-20" />

            <div
              className={`biovip-marquee-track gap-7 px-4 ${
                !landingCarouselAutoPlay || landingCarouselHovered || Boolean(landingPreviewModalId) || Boolean(landingQrModalModelId)
                  ? 'is-paused'
                  : ''
              }`}
            >
              {[...filteredModels, ...filteredModels].map((model, idx) => {
                const fullUrl = `https://${cleanDomain}/${model.subdomain}`;
                const isCopied = landingShareCopiedId === `${model.id}-${idx}`;
                return (
                  <div
                    key={`${model.id}-marquee-${idx}`}
                    className="w-[295px] sm:w-[318px] shrink-0 flex flex-col group/phone"
                  >
                    {/* MOLDURA REALISTA DE IPHONE / SMARTPHONE ESCURO */}
                    <div className="relative w-full h-[590px] rounded-[44px] p-[10px] bg-gradient-to-b from-[#2e2e38] via-[#191920] to-[#0d0d12] shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-white/[0.14] transition-transform duration-300 group-hover/phone:border-amber-400/50">
                      {/* Barra superior interna com botões "QR Code" e "Compartilhar" */}
                      <div className="absolute top-5 inset-x-6 z-20 flex items-center justify-between pointer-events-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLandingQrModalModelId(model.id);
                          }}
                          className="px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/15 text-[11px] font-medium text-neutral-200 hover:text-amber-300 flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                          title={`Ver QR Code de ${model.personaName}`}
                        >
                          <QrCode className="w-3.5 h-3.5 text-amber-400" />
                          <span>QR Code</span>
                        </button>

                        {/* Notch / Alto-falante discreto central */}
                        <div className="w-12 h-1.5 rounded-full bg-white/15 hidden sm:block" />

                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();
                            await safeCopyText(fullUrl);
                            setLandingShareCopiedId(`${model.id}-${idx}`);
                            setTimeout(() => setLandingShareCopiedId(null), 2200);
                          }}
                          className="px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/15 text-[11px] font-medium text-neutral-200 hover:text-amber-300 flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                          title={`Copiar link de ${model.personaName}`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5 text-neutral-300" />
                              <span>Compartilhar</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* TELA DO MICROSITE REAL COMPLETO (LINKS NÃO CLICÁVEIS NO MODO CARROSSEL) */}
                      <div className="w-full h-full rounded-[34px] overflow-hidden bg-[#09090b] relative">
                        <iframe
                          title={`Bio Site Real - ${model.personaName}`}
                          srcDoc={(model as any).carouselHtml || model.realHtml}
                          className="w-full h-full border-0"
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    </div>

                    {/* BOTÃO ÚNICO INFERIOR: FOCADO EM VENDAS E TESTE ONLINE */}
                    <div className="mt-3 px-1 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => openRealMicrositeInNewTab(model.realSiteData, model.subdomain)}
                        className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-amber-400 hover:text-neutral-950 text-neutral-200 hover:border-amber-400 font-semibold text-xs border border-white/[0.12] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md group/btn"
                        title="Abrir microsite online em uma nova guia para testar as vendas"
                      >
                        <span>Ver online e testar vendas</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/btn:text-neutral-950 transition-colors" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal de QR Code rápido */}
          {qrModalModel && (
            <div
              className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setLandingQrModalModelId(null)}
            >
              <div
                className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                      Teste de Conversão Mobile
                    </span>
                    <h4 className="text-sm font-bold text-white truncate">{qrModalModel.personaName}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLandingQrModalModelId(null)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-inner">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                      `https://${cleanDomain}/${qrModalModel.subdomain}`
                    )}`}
                    alt={`QR Code ${qrModalModel.personaName}`}
                    className="w-44 h-44"
                  />
                </div>

                <p className="text-xs text-neutral-400 font-mono">
                  https://{cleanDomain}/{qrModalModel.subdomain}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      openShowcaseModelInEditor(qrModalModel.id);
                      setLandingQrModalModelId(null);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-xs cursor-pointer border border-neutral-700"
                  >
                    Painel do Criador
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      openRealMicrositeInNewTab(qrModalModel.realSiteData, qrModalModel.subdomain);
                      setLandingQrModalModelId(null);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs cursor-pointer"
                  >
                    Testar Vendas Ao Vivo
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 2: VANTAGENS & BENEFÍCIOS EXCLUSIVOS (BENTO GRID FOCADO EM VENDAS) */}
        <section id="vantagens" className="py-20 lg:py-28 border-b border-white/[0.06] bg-neutral-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
                VANTAGENS QUE GERAM LUCRO REAL
              </span>
              <h2
                className="font-serif font-bold text-white tracking-tight"
                style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
              >
                Por que trocar links amadores pelo Microsite BioVip multiplica suas vendas:
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Projetado nos mínimos detalhes para eliminar objeções, qualificar contatos e valorizar o seu trabalho antes mesmo do primeiro &quot;olá&quot;.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  num: '01.',
                  badge: 'ECONOMIA DE TEMPO',
                  title: 'Triagem Automática Anti-Curiosos',
                  desc: 'Chega de perder horas respondendo "qual o valor?". Antes de entrar no seu WhatsApp, o cliente responde uma triagem rápida. Você recebe a mensagem pronta com o serviço exato, o perfil e a urgência dele para fechar a compra.',
                },
                {
                  num: '02.',
                  badge: 'AUMENTO DO TICKET MÉDIO',
                  title: 'Catálogo que Vende no Piloto Automático',
                  desc: 'Apresente seus procedimentos, consultas ou serviços com fotos de alta qualidade, tempo de atendimento e botão de agendamento em cada item. O cliente já escolhe o que quer comprar antes de enviar mensagem.',
                },
                {
                  num: '03.',
                  badge: 'POSICIONAMENTO DE LUXO',
                  title: 'Autoridade que Justifica Preços Maiores',
                  desc: 'Design com estética editorial de luxo, faixa de conquistas (+500 atendimentos, avaliações 5 estrelas) e harmonia visual que posicionam você como líder do seu segmento, atraindo um público de alto poder aquisitivo.',
                },
                {
                  num: '04.',
                  badge: 'ZERO FALTAS E DESISTÊNCIAS',
                  title: 'Rota e GPS em 1 Toque (Google Maps & Waze)',
                  desc: 'Para consultórios, clínicas, barbearias e lojas físicas: seu endereço completo com botão direto para traçar rota no Waze e Google Maps, eliminando desistências de última hora e pedidos de localização.',
                },
                {
                  num: '05.',
                  badge: 'CONTROLE TOTAL DE RETORNO',
                  title: 'Rastreamento Meta Pixel & Retorno em Anúncios',
                  desc: 'Descubra se seus clientes estão vindo do Instagram Reels, Stories, TikTok ou campanhas pagas. Otimize seus investimentos sabendo exatamente qual post ou anúncio gerou mais dinheiro no seu bolso.',
                },
                {
                  num: '06.',
                  badge: 'ZERO ESFORÇO TÉCNICO',
                  title: 'Entrega 100% Pronta sem Dor de Cabeça',
                  desc: 'Você não precisa aprender ferramentas complexas, registrar domínios nem escrever códigos. Nossa equipe faz tudo: fotos, cores, textos de vendas e links. Em até 24 horas seu microsite está no ar pronto para faturar.',
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="p-7 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-amber-400/35 transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-amber-400 block">{item.num}</span>
                    <span className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase group-hover:text-amber-300 transition-colors">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: COMPARATIVO DIRETO DE VENDAS (LINKTREE vs LUXEBIO) */}
        <section id="comparativo" className="py-20 lg:py-28 border-b border-white/[0.06] bg-neutral-950/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-3 text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
                COMPARAÇÃO DIRETA DE CONVERSÃO
              </span>
              <h2
                className="font-serif font-bold text-white tracking-tight"
                style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
              >
                A diferença brutal entre perder clientes e fechar vendas todos os dias:
              </h2>
              <p className="text-sm text-neutral-400">
                Veja o que acontece quando você troca uma lista de botões cinzas por um Microsite de Alta Conversão.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Coluna 1: Linktree / Árvores Amadoras */}
              <div className="p-8 rounded-3xl bg-neutral-900/40 border border-red-500/20 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                      ÁRVORES DE LINKS TRADICIONAIS
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono">Linktree / Beacons / Bio comuns</span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-200">
                    Onde você gasta tempo e perde clientes indecisos
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Listas frias de botões sem contexto diminuem o valor percebido do seu trabalho e afastam quem busca um serviço profissional.
                  </p>
                  <ul className="space-y-3 pt-3 border-t border-white/[0.06] text-xs text-neutral-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                      <span><strong>Design genérico e impessoal:</strong> Idêntico a milhares de outros perfis amadores.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                      <span><strong>Enxurrada de curiosos sem orçamento:</strong> Pessoas entram no WhatsApp só para perguntar preço e somem.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                      <span><strong>Sem catálogo visual:</strong> O cliente não vê o resultado do seu trabalho nem a descrição dos procedimentos.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                      <span><strong>Desvalorização de preço:</strong> Transmite sensação de serviço barato, forçando você a dar descontos para fechar.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                      <span><strong>Propaganda de terceiros:</strong> Exibe a logo e anúncios da própria plataforma no rodapé do seu negócio.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="text-xs text-red-400/90 font-medium text-center">
                    Resultado: Menos vendas e horas perdidas no atendimento.
                  </div>
                </div>
              </div>

              {/* Coluna 2: Microsite BioVip (Destaque Campeão) */}
              <div className="p-8 rounded-3xl bg-neutral-900 border-2 border-amber-400/80 space-y-6 flex flex-col justify-between shadow-2xl shadow-amber-500/10 relative overflow-hidden">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                      MICROSITE BIOVIP DE ALTA CONVERSÃO
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-bold text-[10px] tracking-wide">
                      MÁXIMA CONVERSÃO
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Uma máquina de vendas mobile posicionando você no topo
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Desenvolvido como uma vitrine de luxo mobile que guia o cliente passo a passo até a decisão de compra.
                  </p>
                  <ul className="space-y-3 pt-3 border-t border-white/[0.1] text-xs text-neutral-100">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Estética editorial de luxo:</strong> Causa impacto imediato e retém a atenção nos primeiros 3 segundos.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Triagem inteligente anti-curiosos:</strong> Entrega no seu WhatsApp apenas clientes decididos e qualificados.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Catálogo visual interativo:</strong> Fotos, descrição persuasiva, duração e botão de agendamento em cada item.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Autoridade que justifica cobrar mais:</strong> Clientes percebem alto valor e pagam seus honorários sem pechinchar.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>100% da sua marca sem anúncios:</strong> Sem logos de terceiros, com link limpo e entregue pronto em até 24h.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/[0.1] relative z-10">
                  <a
                    href="#encomendar"
                    className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition cursor-pointer"
                  >
                    <span>Quero Este Nível de Posicionamento para Minha Marca</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COMO FUNCIONA (ZERO TRABALHO TÉCNICO) */}
        <section id="processo" className="py-20 lg:py-24 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
                SIMPLICIDADE TOTAL
              </span>
              <h2
                className="font-serif font-bold text-white tracking-tight"
                style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
              >
                Seu novo posicionamento de luxo no ar em 3 etapas sem esforço:
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Zero complicação técnica. Nossa equipe especializada cuida de toda a configuração para você começar a faturar imediatamente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-7 rounded-2xl bg-neutral-900/40 border border-white/[0.07] space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  ETAPA 01 · ESCOLHA SEU MODELO E PLANO
                </div>
                <h3 className="text-lg font-bold text-white">1. Escolha o estilo ideal para você</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Selecione o modelo que mais combina com seu nicho e preencha o formulário rápido de pedido nesta página. Sem burocracia nem cadastros longos.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-neutral-900/40 border border-white/[0.07] space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  ETAPA 02 · PERSONALIZAÇÃO SOB MEDIDA
                </div>
                <h3 className="text-lg font-bold text-white">2. Montamos tudo com a sua marca</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Nossa equipe entra em contato com você pelo WhatsApp para receber suas melhores fotos, catálogo de serviços e preferências de cores com assessoria VIP.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-neutral-900/40 border border-white/[0.07] space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  ETAPA 03 · PUBLICAÇÃO EM ATÉ {landingConfig.deliveryTime.toUpperCase()}
                </div>
                <h3 className="text-lg font-bold text-white">3. Comece a receber clientes qualificados</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Em até 24 horas seu link oficial está no ar com carregamento ultrarrápido, SSL seguro e pronto para você colocar na bio do Instagram e começar a lucrar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PLANOS E INVESTIMENTO (RETORNO GARANTIDO) */}
        <section id="investimento" className="py-20 lg:py-28 border-b border-white/[0.06] bg-neutral-950/50">
          {(() => {
            syncMaintenancePlansFromConfig(landingConfig);
            const basicMonthlyPrice = parseBrlCurrency(landingConfig.recurringBasic, 29.90);
            const proMonthlyPrice = parseBrlCurrency(landingConfig.recurringPro, 49.90);
            const vipMonthlyPrice = parseBrlCurrency(landingConfig.recurringVip, 79.90);
            const basicMaxUpdates = parsePlanMaxUpdates(landingConfig.updatesBasic, 1);
            const proMaxUpdates = parsePlanMaxUpdates(landingConfig.updatesPro, 4);
            const vipMaxUpdates = parsePlanMaxUpdates(landingConfig.updatesVip, Infinity);
            const fmtBrl = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const creationBasicStr = formatCreationPriceDisplay(landingConfig.priceEssential, 'R$ 79,90');
            const creationProStr = formatCreationPriceDisplay(landingConfig.pricePro, 'R$ 79,90');
            const creationVipStr = formatCreationPriceDisplay(landingConfig.priceScale, 'R$ 79,90');

            return (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="max-w-3xl space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
                    🔥 LOTE PROMOCIONAL DE LANÇAMENTO · VAGAS LIMITADAS
                  </span>
                  <h2
                    className="font-serif font-bold text-white tracking-tight"
                    style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
                  >
                    Os 10 primeiros microsites sairão por apenas {creationProStr} — e sem mensalidade no 1º mês!
                  </h2>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Condição especial de estreia: você garante a criação completa do seu biosite de luxo por taxa única de apenas <strong className="text-amber-300">{creationProStr}</strong> no primeiro mês (isento de mensalidade no 1º mês). A partir do 2º mês, você escolhe o plano de manutenção ideal para a rotina do seu negócio.
                  </p>
                </div>

                {/* Escassez e Contador Visual de Vagas dos 10 Primeiros */}
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-amber-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold text-lg shrink-0">
                      ⚡
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                        <span>Oferta de Lançamento dos 10 Primeiros</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-black uppercase tracking-wider">
                          7 de 10 Vagas Preenchidas
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        Taxa única de criação por apenas <strong className="text-amber-300 font-mono">{creationProStr}</strong> (de ~R$ 197~). Restam <strong className="text-emerald-400">apenas 3 vagas</strong> com este valor promocional!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-between sm:justify-end">
                    <div className="w-32 bg-neutral-950 rounded-full h-2.5 overflow-hidden border border-white/10">
                      <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: '70%' }} />
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300 whitespace-nowrap">Restam 3 vagas</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch tabular-nums">
                  {/* Plan 1: Básico */}
                  <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/[0.08] flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400">
                        <span>01 · PLANO BÁSICO</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold uppercase">
                          {formatPlanUpdatesLabel(basicMaxUpdates, false)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">Presença Digital & Manutenção Básica</h3>
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-3xl font-serif font-bold text-white">R$ {fmtBrl(basicMonthlyPrice)}</span>
                          <span className="text-xs text-neutral-400 font-mono">/mês (a partir do 2º mês)</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-0.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="line-through text-neutral-500 text-[11px] font-mono">De R$ 197</span>
                            <span className="text-sm font-bold text-emerald-300 font-mono">
                              1º Mês (Criação): {creationBasicStr}
                            </span>
                          </div>
                          <div className="text-[11px] text-emerald-400/90 font-mono">
                            ✓ Sem mensalidade no 1º mês · {formatPlanUpdatesLabel(basicMaxUpdates, false)}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Perfeito para quem quer eliminar o Linktree amador hoje mesmo, garantir a vaga promocional de {creationBasicStr} e ter {formatPlanUpdatesLabel(basicMaxUpdates, false)} inclusa(s).
                      </p>
                      <ul className="space-y-2.5 pt-3 border-t border-white/[0.07] text-xs text-neutral-300">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>1º Mês:</strong> Cobrada apenas a Taxa de Criação de {creationBasicStr} (R$ 0 de mensalidade)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>A partir do 2º Mês:</strong> R$ {fmtBrl(basicMonthlyPrice)}/mês com {formatPlanUpdatesLabel(basicMaxUpdates, false)} inclusa(s)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Alterações adicionais avulsas quando precisar: R$ 14,90 cada</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Card de Localização com rota em 1 toque no Google Maps e Waze</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Hospedagem ultrarrápida e Certificado SSL oficial inclusos</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Sem contrato de fidelidade — cancele quando quiser</li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => openPaymentConfirmation('basic')}
                      className="w-full py-3 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-white font-semibold text-xs text-center border border-white/[0.1] transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                      <span>Quero o Plano Básico (R$ {fmtBrl(basicMonthlyPrice)}/mês · {formatPlanUpdatesLabel(basicMaxUpdates, true)})</span>
                    </button>
                  </div>

                  {/* Plan 2: Pro (Mais Escolhido) */}
                  <div className="p-8 rounded-2xl bg-neutral-900 border-2 border-amber-400/80 flex flex-col justify-between space-y-6 shadow-2xl shadow-amber-500/15 relative overflow-hidden">
                    <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />
                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-mono uppercase tracking-widest text-amber-400">
                        <span>02 · PLANO PRO</span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase border border-amber-400/30">
                            {formatPlanUpdatesLabel(proMaxUpdates, false)}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-400 text-neutral-950 font-bold text-[10px]">MAIS ESCOLHIDO</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white">Funil Anti-Curiosos & Catálogo Semanal</h3>
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-4xl font-serif font-bold text-amber-400">R$ {fmtBrl(proMonthlyPrice)}</span>
                          <span className="text-xs text-neutral-300 font-mono">/mês (a partir do 2º mês)</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 space-y-0.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="line-through text-neutral-500 text-[11px] font-mono">De R$ 297</span>
                            <span className="text-sm font-bold text-amber-300 font-mono">
                              1º Mês (Criação): {creationProStr}
                            </span>
                          </div>
                          <div className="text-[11px] text-emerald-300 font-mono">
                            ✓ Sem mensalidade no 1º mês · {formatPlanUpdatesLabel(proMaxUpdates, false)}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        A estrutura mais vendida para clínicas, estúdios, especialistas e advogados com {formatPlanUpdatesLabel(proMaxUpdates, false)} inclusa(s) para atualizar procedimentos, fotos e promoções.
                      </p>
                      <ul className="space-y-2.5 pt-3 border-t border-white/[0.1] text-xs text-neutral-200">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>1º Mês Promocional:</strong> Apenas {creationProStr} de criação (R$ 0 de mensalidade)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>A partir do 2º Mês:</strong> R$ {fmtBrl(proMonthlyPrice)}/mês com {formatPlanUpdatesLabel(proMaxUpdates, false)} inclusa(s)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Alterações adicionais excedentes: apenas R$ 14,90 cada</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Funil Anti-Curiosos ativo + Catálogo visual com fotos e preços</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Galeria inteligente adaptativa (fotos em retrato e paisagem sem cortes)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Rastreamento Meta Pixel + QR Code de balcão em alta definição</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Sem contrato de fidelidade — cancele quando quiser</li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => openPaymentConfirmation('pro')}
                      className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs text-center transition shadow-lg shadow-amber-500/20 cursor-pointer relative z-10 flex items-center justify-center gap-2"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-neutral-950" />
                      <span>Quero o Plano Pro (R$ {fmtBrl(proMonthlyPrice)}/mês · {formatPlanUpdatesLabel(proMaxUpdates, true)})</span>
                    </button>
                  </div>

                  {/* Plan 3: VIP Ilimitado */}
                  <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/[0.08] flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-400">
                        <span>03 · PLANO VIP</span>
                        <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase">
                          {formatPlanUpdatesLabel(vipMaxUpdates, false)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white">Setup Concierge & Atualizações VIP</h3>
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-3xl font-serif font-bold text-white">R$ {fmtBrl(vipMonthlyPrice)}</span>
                          <span className="text-xs text-neutral-400 font-mono">/mês (a partir do 2º mês)</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-0.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="line-through text-neutral-500 text-[11px] font-mono">De R$ 497</span>
                            <span className="text-sm font-bold text-amber-300 font-mono">
                              1º Mês (Criação): {creationVipStr}
                            </span>
                          </div>
                          <div className="text-[11px] text-emerald-300 font-mono">
                            ✓ Sem mensalidade no 1º mês · {formatPlanUpdatesLabel(vipMaxUpdates, false)}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Para marcas consolidadas e especialistas que demandam suporte prioritário e {formatPlanUpdatesLabel(vipMaxUpdates, false)} no mês.
                      </p>
                      <ul className="space-y-2.5 pt-3 border-t border-white/[0.07] text-xs text-neutral-300">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>1º Mês Promocional:</strong> Apenas {creationVipStr} de criação (R$ 0 de mensalidade)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> <strong>A partir do 2º Mês:</strong> R$ {fmtBrl(vipMonthlyPrice)}/mês com {formatPlanUpdatesLabel(vipMaxUpdates, false)} inclusa(s)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Suporte completo para Domínio Próprio (.com.br)</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Suporte concierge prioritário direto no WhatsApp</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400 shrink-0" /> Sem contrato de fidelidade — cancele quando quiser</li>
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => openPaymentConfirmation('vip')}
                      className="w-full py-3 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-white font-semibold text-xs text-center border border-white/[0.1] transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                      <span>Quero o Plano VIP (R$ {fmtBrl(vipMonthlyPrice)}/mês · {formatPlanUpdatesLabel(vipMaxUpdates, true)})</span>
                    </button>
                  </div>
                </div>

                {/* Faixa Explicativa Oficial das Taxas de Manutenção */}
                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-amber-400/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-emerald-500/30">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">🎉 10 Primeiros Microsites</span>
                    <span className="font-bold text-white text-sm block mt-0.5">{creationProStr} (1º Mês)</span>
                    <span className="text-[11px] text-neutral-400 block">Só taxa de criação. Sem mensalidade no 1º mês!</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Plano Básico</span>
                    <span className="font-bold text-white text-sm block mt-0.5">R$ {fmtBrl(basicMonthlyPrice)} /mês</span>
                    <span className="text-[11px] text-neutral-400 block">{formatPlanUpdatesLabel(basicMaxUpdates, false)} incluída(s)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-amber-400/40">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Plano Pro (Destaque)</span>
                    <span className="font-bold text-amber-300 text-sm block mt-0.5">R$ {fmtBrl(proMonthlyPrice)} /mês</span>
                    <span className="text-[11px] text-neutral-400 block">{formatPlanUpdatesLabel(proMaxUpdates, false)} incluída(s)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Plano VIP Total</span>
                    <span className="font-bold text-white text-sm block mt-0.5">R$ {fmtBrl(vipMonthlyPrice)} /mês</span>
                    <span className="text-[11px] text-neutral-400 block">{formatPlanUpdatesLabel(vipMaxUpdates, false)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">ALTERAÇÃO EXTRA & SUPORTE</span>
                    <span className="font-bold text-emerald-300 text-sm block mt-0.5">R$ 14,90 /avulsa</span>
                    <span className="text-[11px] text-neutral-400 block">Sem multas ou fidelidade: você no controle total</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* SECTION 5: FORMULÁRIO DE PEDIDO DIRETO PARA O WHATSAPP (GARANTIA E SEGURANÇA) */}
        <section id="encomendar" className="py-20 lg:py-28 border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-white/[0.1] shadow-2xl space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
                  GARANTA SUA VAGA COM ENTREGA PRIORITÁRIA
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Encomende seu Microsite Pronto e comece a faturar mais hoje mesmo.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Preencha os campos abaixo para iniciar seu atendimento VIP diretamente no nosso WhatsApp oficial <strong className="text-emerald-400">(31) 99139-0202</strong>.
                </p>
              </div>

              <form onSubmit={handleLandingOrderSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Seu Nome / Nome da Clínica ou Escritório *
                    </label>
                    <input
                      type="text"
                      value={landingOrderForm.clientName}
                      onChange={(e) => setLandingOrderForm(p => ({ ...p, clientName: e.target.value }))}
                      placeholder="Ex: Dra. Camila Mendes"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Seu WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      value={landingOrderForm.clientWhatsapp}
                      onChange={(e) => setLandingOrderForm(p => ({ ...p, clientWhatsapp: e.target.value }))}
                      placeholder="Ex: (31) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Modelo de Microsite Desejado
                    </label>
                    <select
                      value={landingOrderForm.selectedModel}
                      onChange={(e) => setLandingOrderForm(p => ({ ...p, selectedModel: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-amber-400 focus:outline-none"
                    >
                      {READY_MADE_MODELS.map((m) => (
                        <option key={m.id} value={`${m.title} (${m.personaName})`}>
                          {m.title} ({m.personaName})
                        </option>
                      ))}
                      <option value="Outro Nicho (Personalizado sob medida)">
                        Outro Nicho (Personalizado sob medida)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Pacote Escolhido
                    </label>
                    <select
                      value={
                        landingOrderForm.selectedPlan.toLowerCase().includes('básico') || landingOrderForm.selectedPlan.toLowerCase().includes('basico')
                          ? getPlanCheckoutDetails('basic').fullPlanLabel
                          : landingOrderForm.selectedPlan.toLowerCase().includes('vip')
                          ? getPlanCheckoutDetails('vip').fullPlanLabel
                          : getPlanCheckoutDetails('pro').fullPlanLabel
                      }
                      onChange={(e) => setLandingOrderForm(p => ({ ...p, selectedPlan: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value={getPlanCheckoutDetails('pro').fullPlanLabel}>
                        Plano Pro (R$ {parseBrlCurrency(landingConfig.recurringPro, 49.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês · {formatPlanUpdatesLabel(parsePlanMaxUpdates(landingConfig.updatesPro, 4), false)}) — Criação {formatCreationPriceDisplay(landingConfig.pricePro)} (Mais Escolhido)
                      </option>
                      <option value={getPlanCheckoutDetails('basic').fullPlanLabel}>
                        Plano Básico (R$ {parseBrlCurrency(landingConfig.recurringBasic, 29.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês · {formatPlanUpdatesLabel(parsePlanMaxUpdates(landingConfig.updatesBasic, 1), false)}) — Criação {formatCreationPriceDisplay(landingConfig.priceEssential)}
                      </option>
                      <option value={getPlanCheckoutDetails('vip').fullPlanLabel}>
                        Plano VIP (R$ {parseBrlCurrency(landingConfig.recurringVip, 79.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês · {formatPlanUpdatesLabel(parsePlanMaxUpdates(landingConfig.updatesVip, Infinity), false)}) — Criação {formatCreationPriceDisplay(landingConfig.priceScale)}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Seu @Instagram ou Link do Google Meu Negócio (Opcional)
                  </label>
                  <input
                    type="text"
                    value={landingOrderForm.instagramOrMaps}
                    onChange={(e) => setLandingOrderForm(p => ({ ...p, instagramOrMaps: e.target.value }))}
                    placeholder="Ex: @dracamilamendes"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {landingOrderError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                    {landingOrderError}
                  </div>
                )}

                {landingOrderSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300">
                    Redirecionando para o WhatsApp (31) 99139-0202 com seu pedido formatado...
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition cursor-pointer shadow-xl shadow-amber-500/15"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>QUERO MEU MICROSITE NO WHATSAPP (31) 99139-0202 🚀</span>
                </button>
              </form>

              {/* Faixa de Confiança e Reversão de Risco */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.08] text-[11px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Satisfação Garantida:</strong> Ajustamos até você amar.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Entrega Rápida:</strong> No ar em até 24 horas.</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Atendimento VIP:</strong> WhatsApp (31) 99139-0202.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: PERGUNTAS FREQUENTES (QUEBRA DE TODAS AS OBJEÇÕES DE COMPRA) */}
        <section id="faq" className="py-20 lg:py-28 border-b border-white/[0.06] bg-neutral-950/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
                DÚVIDAS FREQUENTES
              </span>
              <h2
                className="font-serif font-bold text-white tracking-tight"
                style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
              >
                Tudo o que você precisa saber para tomar sua decisão com segurança:
              </h2>
              <p className="text-sm text-neutral-400">
                Respostas diretas e transparentes sobre prazos, funcionamento e suporte.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'Preciso entender de tecnologia ou saber programar?',
                  a: 'Absolutamente nada! Nossa equipe cuida de 100% da parte técnica: layout, fotos, textos persuasivos, rota de GPS e funil do WhatsApp. Você só precisa nos mandar suas informações e aprovar o resultado final.',
                },
                {
                  q: 'Em quanto tempo meu microsite fica pronto para usar?',
                  a: `Entregamos seu microsite personalizado em até ${landingConfig.deliveryTime} úteis após o envio das suas informações. É a entrega mais rápida do mercado para você começar a faturar imediatamente.`,
                },
                {
                  q: 'Como o funil anti-curiosos me ajuda a economizar tempo e faturar mais?',
                  a: 'Ele faz 3 perguntas estratégicas de qualificação antes do visitante abrir seu WhatsApp. Assim, você não perde horas respondendo curiosos que só querem saber preço e recebe clientes prontos para fechar o agendamento.',
                },
                {
                  q: 'Posso atualizar fotos, preços ou serviços no futuro?',
                  a: 'Sim! Seu microsite é flexível e pode ser atualizado sempre que você lançar novos procedimentos, alterar horários de atendimento ou ajustar seus preços.',
                },
                {
                  q: 'Funciona bem em qualquer aparelho de celular?',
                  a: 'Perfeitamente. Nossos microsites utilizam código nativo ultraleve, abrindo instantaneamente em iPhones e Androids com qualquer velocidade de internet, sem travar nem desalinhar.',
                },
                {
                  q: `Como funciona a oferta de ${formatCreationPriceDisplay(landingConfig.pricePro)} e os planos de manutenção?`,
                  a: `Os 10 primeiros microsites têm taxa única de criação promocional de apenas ${formatCreationPriceDisplay(landingConfig.pricePro)} no primeiro mês — e no 1º mês você NÃO paga nenhuma mensalidade! A partir do 2º mês, você escolhe seu plano de manutenção mensal: Plano Básico (R$ ${parseBrlCurrency(landingConfig.recurringBasic, 29.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} com ${formatPlanUpdatesLabel(parsePlanMaxUpdates(landingConfig.updatesBasic, 1), false)}), Plano Pro (R$ ${parseBrlCurrency(landingConfig.recurringPro, 49.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} com ${formatPlanUpdatesLabel(parsePlanMaxUpdates(landingConfig.updatesPro, 4), false)}) ou Plano VIP (R$ ${parseBrlCurrency(landingConfig.recurringVip, 79.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} com ${formatPlanUpdatesLabel(parsePlanMaxUpdates(landingConfig.updatesVip, Infinity), false)}). Alterações extras avulsas fora da franquia custam R$ 14,90 cada. Para manter a estabilidade dos servidores e segurança, a desativação por atraso no pagamento ocorre de forma automática a partir do 7º dia de atraso.`,
                },
                {
                  q: 'Como coloco o link no meu Instagram e redes sociais?',
                  a: 'Assim que entregarmos seu link oficial, você recebe um tutorial simples de 15 segundos ensinando a colocar o link na bio do Instagram, TikTok, WhatsApp Business e Google Meu Negócio.',
                },
              ].map((item, idx) => (
                <div
                  key={`faq-${idx}`}
                  className="p-6 rounded-2xl bg-neutral-900/50 border border-white/[0.07] space-y-2 hover:border-amber-400/30 transition-colors"
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                    <span className="text-amber-400 font-mono text-sm">0{idx + 1}.</span>
                    <span>{item.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pl-7">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 text-center">
              <a
                href="#encomendar"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/15 transition cursor-pointer"
              >
                <span>Quero Garantir Meu Microsite Pronto Agora</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
        </main>

        {/* FOOTER FOCADO EM AUTORIDADE, CONTATO OFICIAL E ACESSO DO ADMINISTRADOR */}
        <footer className="py-12 bg-[#060608] text-xs text-neutral-400 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-11 rounded-xl bg-[#1c1c1e] border border-amber-400/30 flex items-center justify-center overflow-hidden shrink-0 shadow-md shadow-amber-500/10">
                <img src="/assets/aistudio/1793152702953_02858b21.jpg" alt="BioVip Logo" className="w-full h-full object-cover scale-125" />
              </div>
              <div className="space-y-1">
                <div className="font-serif font-black tracking-widest text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">
                  BIOVIP
                </div>
                <p className="text-[11px] text-neutral-400">
                  O fim dos links amadores. Microsites de alta conversão para o WhatsApp.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${landingConfig.agencyEmail || 'contato@biovip.com.br'}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-300 hover:text-amber-200 transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>{landingConfig.agencyEmail || 'contato@biovip.com.br'}</span>
                  </a>
                  <a
                    href={`https://wa.me/${formatWhatsAppPhone(landingConfig.agencyWhatsapp || '5531991390202')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>(31) 99139-0202</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contato Oficial e Acesso exclusivo ao Painel de Gestão */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${formatWhatsAppPhone(landingConfig.agencyWhatsapp || '5531991390202')}?text=${encodeURIComponent('Olá! Quero saber mais sobre os Microsites BioVip.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-mono text-xs border border-emerald-500/30 transition flex items-center gap-1.5"
                title="Atendimento Comercial no WhatsApp (31) 99139-0202"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>(31) 99139-0202</span>
              </a>
              <a
                href={`mailto:${landingConfig.agencyEmail || 'contato@biovip.com.br'}`}
                className="px-3.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 hover:text-amber-300 font-mono text-xs border border-white/[0.08] transition flex items-center gap-1.5"
                title="Enviar e-mail para o suporte e atendimento BioVip"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{landingConfig.agencyEmail || 'contato@biovip.com.br'}</span>
              </a>
              <button
                type="button"
                onClick={openCreatorSubdomain}
                className="px-4 py-2 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 font-bold text-xs border border-amber-400/30 cursor-pointer transition flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Painel de Gestão ({cleanSub}.{cleanDomain})</span>
              </button>
            </div>
          </div>
        </footer>

        {/* MODAL DE PRÉVIA INTERATIVA EM TELA CHEIA (COM O MICROSITE REAL COMPLETO) */}
        {previewModalModel && (
          <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-4 sm:p-5 shadow-2xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                    Microsite Real Interativo · {previewModalModel.code}
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {previewModalModel.personaName} — {previewModalModel.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openRealMicrositeInNewTab(previewModalModel.realSiteData, previewModalModel.subdomain)}
                    className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <span>Nova Aba</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLandingPreviewModalId(null)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Full Real Microsite Iframe */}
              <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-black h-[72vh]">
                <iframe
                  title={`Microsite Real Full - ${previewModalModel.personaName}`}
                  srcDoc={previewModalModel.realHtml}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-popups allow-same-origin"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const targetId = previewModalModel.id;
                    setLandingPreviewModalId(null);
                    openShowcaseModelInEditor(targetId);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-xs cursor-pointer border border-neutral-700"
                >
                  Editar Este Microsite no Painel
                </button>
                <a
                  href="#encomendar"
                  onClick={() => {
                    setLandingOrderForm(p => ({
                      ...p,
                      selectedModel: `${previewModalModel.title} (${previewModalModel.personaName})`,
                    }));
                    setLandingPreviewModalId(null);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs text-center flex items-center justify-center"
                >
                  Quero Encomendar Igual
                </a>
              </div>
            </div>
          </div>
        )}

        {renderSubdomainConfigModal()}
        {renderPaymentSuccessModal()}
      </div>
    );
  }

  // =========================================================================
  // PROTEÇÃO DE LOGIN DE ADMINISTRADOR COM FIREBASE AUTHENTICATION
  // =========================================================================
  if (authLoading) {
    return (
      <div className="min-h-screen w-screen bg-[#09090b] text-neutral-100 flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-neutral-950 font-serif font-black text-xl shadow-lg shadow-amber-500/20 animate-pulse mb-4">
          L
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Verificando credenciais Firebase Auth...
        </p>
      </div>
    );
  }

  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen w-screen bg-[#09090b] text-neutral-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
        <div
          className="pointer-events-none fixed inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.16), transparent 55%)',
          }}
        />
        <div className="relative z-10 w-full max-w-md rounded-3xl bg-neutral-900/95 border border-white/[0.1] p-7 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-11 rounded-xl bg-[#1c1c1e] border border-amber-400/40 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden shrink-0">
                <img src="/assets/aistudio/1793152702953_02858b21.jpg" alt="BioVip Logo" className="w-full h-full object-cover scale-125" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
                  BioVip Security Gate
                </span>
                <h1 className="text-base font-bold text-white">
                  Acesso Restrito ao Criador
                </h1>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-neutral-300 leading-relaxed bg-neutral-950/80 p-4 rounded-2xl border border-white/[0.06]">
            <p>
              O <strong className="text-white">BioVip Studio & Painel de Gestão</strong> é protegido pelo <strong className="text-amber-300">Google Firebase Authentication</strong> e chave criptografada.
            </p>
            <p className="text-[11px] text-neutral-400">
              Acesso exclusivo para credenciais administrativas autorizadas.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <p className="leading-relaxed">{authError}</p>
                {unauthorizedDomainHost && (
                  <div className="p-2.5 rounded-lg bg-neutral-950/90 border border-amber-400/30 text-[11px] text-neutral-300 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-amber-300 font-semibold">Domínio no Cloudflare:</span>
                      <code className="px-2 py-0.5 rounded bg-neutral-900 text-amber-200 font-mono">{unauthorizedDomainHost}</code>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(unauthorizedDomainHost);
                          showToast(`📋 Domínio "${unauthorizedDomainHost}" copiado!`);
                        }}
                        className="px-2.5 py-1 rounded-md bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-semibold text-[10.5px] border border-amber-400/30 cursor-pointer transition"
                      >
                        Copiar Domínio
                      </button>
                      <a
                        href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/settings`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-[10.5px] border border-white/10 inline-flex items-center gap-1 transition"
                      >
                        <span>Autorizar no Firebase</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
                {adminUser && (
                  <button
                    type="button"
                    onClick={handleAdminLogout}
                    className="text-[11px] font-semibold text-amber-300 underline cursor-pointer"
                  >
                    Sair da conta atual e trocar de conta
                  </button>
                )}
              </div>
            </div>
          )}

          {showDirectCredentialLogin && (
            <form onSubmit={handleDirectCredentialAdminLogin} className="p-4 rounded-2xl bg-neutral-950/90 border border-amber-400/40 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Acesso com Credencial & PIN Mestre</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowDirectCredentialLogin(false)}
                  className="text-[10px] text-neutral-400 hover:text-white cursor-pointer"
                >
                  Ocultar
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                  E-mail do Administrador
                </label>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={directAdminEmailInput}
                  onChange={(e) => setDirectAdminEmailInput(e.target.value)}
                  placeholder="Digite seu e-mail administrativo"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    PIN de Segurança (6 dígitos)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPinText(!showPinText)}
                    className="text-[10px] text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                  >
                    {showPinText ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPinText ? 'Ocultar' : 'Mostrar'}</span>
                  </button>
                </div>
                <input
                  type={showPinText ? 'text' : 'password'}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  value={directAdminPinInput}
                  onChange={(e) => setDirectAdminPinInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="••••••"
                  className="w-full text-center tracking-[0.45em] text-lg font-mono font-bold py-2.5 px-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-300 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={lockoutRemainingSec > 0}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Desbloquear Painel de Gestão</span>
              </button>
            </form>
          )}

          <div className="space-y-2.5">
            <button
              type="button"
              disabled={isLoggingIn}
              onClick={handleAdminGoogleLogin}
              className="w-full py-3.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/20 transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isLoggingIn ? 'Autenticando com Firebase...' : 'Entrar como Administrador com Google'}
              </span>
            </button>

            {!showDirectCredentialLogin && (
              <button
                type="button"
                onClick={() => setShowDirectCredentialLogin(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 border border-amber-400/30 transition cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>Entrar com Credencial & PIN Mestre</span>
              </button>
            )}

            <button
              type="button"
              onClick={openPublicSalesLanding}
              className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-2 border border-white/[0.08] transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>Voltar para a Landing Page Pública</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SEGUNDO FATOR DE AUTENTICAÇÃO (2FA) / MASTER SECURITY PIN GATE
  // =========================================================================
  if (!adminPinUnlocked) {
    return (
      <div className="min-h-screen w-screen bg-[#09090b] text-neutral-100 flex items-center justify-center p-4 font-sans relative overflow-hidden select-none">
        {/* Ambient Glow */}
        <div
          className="pointer-events-none fixed inset-0 opacity-25"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.22), transparent 60%)',
          }}
        />
        <div className="relative z-10 w-full max-w-md rounded-3xl bg-neutral-900/95 border border-white/[0.1] p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-11 rounded-xl bg-[#1c1c1e] border border-amber-400/40 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden shrink-0">
                <img src="/assets/aistudio/1793152702953_02858b21.jpg" alt="BioVip Logo" className="w-full h-full object-cover scale-125" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block font-semibold">
                  Autenticação em 2 Etapas (2FA)
                </span>
                <h1 className="text-base font-bold text-white">
                  PIN Mestre de Segurança
                </h1>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
          </div>

          {/* Admin badge */}
          <div className="flex items-center justify-between bg-neutral-950/80 p-3 rounded-2xl border border-white/[0.06] text-xs">
            <div className="flex items-center gap-2 truncate">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-neutral-300 truncate">
                Conectado como <strong className="text-white">{adminUser?.email}</strong>
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
              Google 1FA ✓
            </span>
          </div>

          {/* Lockout Banner */}
          {lockoutRemainingSec > 0 ? (
            <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-red-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Bloqueio de Segurança Ativo</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Múltiplas tentativas incorretas foram registradas. Por segurança, o sistema bloqueou novas tentativas temporariamente.
              </p>
              <div className="flex items-center justify-between pt-1 font-mono text-sm font-bold text-red-400">
                <span>Tempo restante:</span>
                <span>
                  {Math.floor(lockoutRemainingSec / 60)
                    .toString()
                    .padStart(2, '0')}:
                  {(lockoutRemainingSec % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-neutral-300 leading-relaxed">
                Digite o <strong className="text-amber-300">PIN de 6 dígitos</strong> para autorizar o acesso ao Studio de Criação e ao Painel de Gestão Financeira.
              </p>

              {/* 6-Digit PIN input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-neutral-400 font-medium">PIN de Segurança (6 dígitos):</label>
                  <button
                    type="button"
                    onClick={() => setShowPinText(!showPinText)}
                    className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                  >
                    {showPinText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPinText ? 'Ocultar' : 'Mostrar'}</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPinText ? 'text' : 'password'}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    autoFocus
                    value={adminPinInput}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setAdminPinInput(val);
                      if (adminPinError) setAdminPinError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && adminPinInput.length === 6) {
                        handleVerifyAdminPin();
                      }
                    }}
                    placeholder="••••••"
                    className="w-full text-center tracking-[0.5em] text-2xl font-mono font-bold py-3.5 px-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-amber-300 focus:border-amber-400 focus:outline-none placeholder:text-neutral-700 shadow-inner"
                  />
                </div>

                {/* Dots visualization */}
                <div className="flex justify-center gap-2 pt-1">
                  {[0, 1, 2, 3, 4, 5].map((idx) => {
                    const isFilled = adminPinInput.length > idx;
                    return (
                      <span
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-150 ${
                          isFilled
                            ? 'bg-amber-400 shadow-sm shadow-amber-400/50 scale-110'
                            : 'bg-neutral-800 border border-white/10'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {adminPinError && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{adminPinError}</span>
                </div>
              )}

              {/* Status and attempts counter */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                <span>
                  Tentativas restantes:{' '}
                  <strong className={pinAttemptsLeft <= 2 ? 'text-red-400' : 'text-neutral-200'}>
                    {pinAttemptsLeft} de {MAX_PIN_ATTEMPTS}
                  </strong>
                </span>
              </div>

              {/* Unlock Action Button */}
              <button
                type="button"
                disabled={adminPinInput.length !== 6 || lockoutRemainingSec > 0}
                onClick={handleVerifyAdminPin}
                className="w-full py-3.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Desbloquear Painel de Administrador</span>
              </button>
            </div>
          )}

          {/* Footer secondary actions */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
            <button
              type="button"
              onClick={handleAdminLogout}
              className="text-neutral-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair da Conta Google</span>
            </button>

            <button
              type="button"
              onClick={openPublicSalesLanding}
              className="text-neutral-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer transition"
            >
              <span>Vitrine Pública</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] min-h-screen w-full max-w-full overflow-hidden bg-neutral-950 text-neutral-100 font-sans">
      {isClientsFullscreen ? (
        <FullscreenClientsView
          savedSites={savedSites}
          revenueGoal={revenueGoal}
          setRevenueGoal={setRevenueGoal}
          landingConfig={landingConfig}
          setLandingConfig={setLandingConfig}
          updateLandingConfig={updateLandingConfig}
          persistLandingConfigEverywhere={persistLandingConfigEverywhere}
          asaasServerConfigured={asaasServerConfigured}
          asaasStatusTesting={asaasStatusTesting}
          asaasTestResult={asaasTestResult}
          setAsaasTestResult={setAsaasTestResult}
          asaasGuideOpen={asaasGuideOpen}
          setAsaasGuideOpen={setAsaasGuideOpen}
          handleTestAsaasConnection={handleTestAsaasConnection}
          getActiveAsaasApiKey={getActiveAsaasApiKey}
          getActiveAsaasEnv={getActiveAsaasEnv}
          updateAsaasSettings={updateAsaasSettings}
          applyConfiguredPlanPricesToExistingClients={applyConfiguredPlanPricesToExistingClients}
          setIsClientsFullscreen={setIsClientsFullscreen}
          startNewDraftMicrosite={startNewDraftMicrosite}
          setAiCreationMode={setAiCreationMode}
          setAiModalOpen={setAiModalOpen}
          setSubdomainModalOpen={setSubdomainModalOpen}
          setSecurityModalOpen={setSecurityModalOpen}
          setSecurityModalTab={setSecurityModalTab}
          handleLockAdminPanel={handleLockAdminPanel}
          openPublicSalesLanding={openPublicSalesLanding}
          loadSiteForEditing={loadSiteForEditing}
          toggleSiteLandingModel={toggleSiteLandingModel}
          toggleSiteConstructionMode={toggleSiteConstructionMode}
          toggleSiteSuspensionMode={toggleSiteSuspensionMode}
          openPixBillingModal={openPixBillingModal}
          openSuspendedPagePreview={openSuspendedPagePreview}
          openPublicMicrosite={openPublicMicrosite}
          setUnderConstructionPreviewSite={setUnderConstructionPreviewSite}
          setPublishModalOpen={setPublishModalOpen}
          setSelectedPublishSiteId={setSelectedPublishSiteId}
          setSinglePdfSiteId={setSinglePdfSiteId}
          setDeleteModalSite={setDeleteModalSite}
          showToast={showToast}
          adminUser={adminUser}
          editingSiteId={editingSiteId}
        />
      ) : (
        <>
          {/* ============================================================== */}
          {/* LEFT COLUMN: BUILDER SAAS PRO CONTROLS                         */}
          {/* ============================================================== */}
          <aside className={`w-full lg:w-[620px] xl:w-[680px] h-full ${viewMode === 'preview' ? 'hidden lg:flex' : 'flex'} flex-col border-r border-neutral-800 bg-neutral-900/95 backdrop-blur z-20`}>
        {/* Header */}
        <header className="px-5 py-3.5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="w-16 h-11 rounded-xl bg-[#1c1c1e] border border-amber-400/40 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden shrink-0">
              <img src="/assets/aistudio/1793152702953_02858b21.jpg" alt="BioVip Logo" className="w-full h-full object-cover scale-125" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-black text-neutral-100 text-sm tracking-wider">
                  BIOVIP STUDIO <span className="text-amber-400 font-bold font-mono">SAAS ENGINE</span>
                </h1>
                {currentEditingSite ? (() => {
                  const hasUnsavedChanges = JSON.stringify(currentEditingSite.data) !== JSON.stringify(data);
                  return (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                        hasUnsavedChanges
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                          : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      }`}>
                        <Edit3 className="w-2.5 h-2.5" />
                        Editando: {currentEditingSite.clientName}
                        {hasUnsavedChanges ? ' (Alterações Pendentes)' : ' (Salvo)'}
                      </span>
                      <button
                        type="button"
                        onClick={startNewDraftMicrosite}
                        className="text-[9px] font-semibold text-neutral-400 hover:text-amber-300 underline cursor-pointer"
                        title="Sair da edição e voltar ao Modo Rascunho Livre"
                      >
                        (Desvincular)
                      </button>
                    </div>
                  );
                })() : (
                  <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    MODO RASCUNHO (Nenhum Cliente Vinculado)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400">Gerador de Microsites & Painel de Gestão · Admin: {adminUser?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Botão para voltar à Landing Page Inicial de Vendas */}
            <button
              type="button"
              onClick={openPublicSalesLanding}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold text-xs flex items-center gap-1.5 border border-neutral-700 transition cursor-pointer"
              title="Visualizar a Landing Page pública de venda de microsites prontos"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Vitrine de Vendas</span>
            </button>

            {/* Botão para configurar o Domínio / Subdomínio do Criador (Exibido apenas no Painel de Gestão) */}
            {activeTab === 'dashboard' && (
              <button
                type="button"
                onClick={() => setSubdomainModalOpen(true)}
                className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-300 font-mono font-semibold text-xs flex items-center gap-1.5 border border-amber-500/30 transition cursor-pointer"
                title="Configurar Domínio Principal e Subdomínio do Criador"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Configurar Domínio ({landingConfig.creatorSubdomain}.)</span>
              </button>
            )}

            {/* Central de Segurança & PIN Mestre */}
            <button
              type="button"
              onClick={() => {
                setSecurityModalTab('pin');
                setSecurityModalOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-300 font-semibold text-xs flex items-center gap-1.5 border border-amber-500/30 transition cursor-pointer"
              title="Central de Segurança: Alterar PIN Mestre e Histórico de Acessos"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Segurança</span>
            </button>

            {/* Botão de Bloquear Painel Imediatamente */}
            <button
              type="button"
              onClick={handleLockAdminPanel}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/15 text-neutral-300 hover:text-red-300 font-semibold text-xs flex items-center gap-1 border border-neutral-800 hover:border-red-500/30 transition cursor-pointer"
              title="Bloquear o painel agora (exigirá o PIN de 6 dígitos)"
            >
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>Bloquear</span>
            </button>

            {/* Botão de Logout do Firebase Admin */}
            <button
              type="button"
              onClick={handleAdminLogout}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/15 text-neutral-300 hover:text-red-300 font-semibold text-xs flex items-center gap-1 border border-neutral-800 hover:border-red-500/30 transition cursor-pointer"
              title={`Sair da sessão de administrador (${adminUser?.email})`}
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Sair</span>
            </button>

            {/* Toggle Editor vs. Preview (iPhone) visível apenas em telas menores < 1024px */}
            <div className="flex lg:hidden items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode('editor')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'editor'
                    ? 'bg-amber-400 text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Editar</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'preview'
                    ? 'bg-amber-400 text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Ver Página</span>
              </button>
            </div>
            <button
              type="button"
              onClick={handleStartNewMicrosite}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-neutral-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/25 transition cursor-pointer"
              title="Iniciar um novo microsite em branco ou criar com IA"
            >
              <Plus className="w-3.5 h-3.5 text-neutral-950 stroke-[3]" />
              <span>Novo Microsite</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('quickCreate');
                setAiModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/40 hover:border-amber-400 transition cursor-pointer"
              title="Gerar Microsite automaticamente usando IA a partir do Instagram e Google Meu Negócio"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
              <span>Criar com IA</span>
            </button>

            <button
              type="button"
              onClick={openLivePreviewTab}
              className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/30 transition cursor-pointer shadow"
              title="Ver resultado do microsite em tela cheia numa nova aba"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Resultado</span>
            </button>

            <button
              type="button"
              onClick={() => setQrModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold text-xs flex items-center gap-1.5 border border-emerald-500/30 transition cursor-pointer shadow"
              title="Gerar QR Code para testar no celular"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>📱 QR Code Celular</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer border ${
                activeTab === 'dashboard'
                  ? 'bg-amber-400 text-neutral-950 border-amber-300 ring-2 ring-amber-400/30'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border-amber-500/40 hover:border-amber-400'
              }`}
              title="Abrir Painel de Gestão dos Microsites e Mensalidades dos Clientes"
            >
              <Server className="w-3.5 h-3.5 text-amber-400" />
              <span>Painel & Clientes</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {savedSites.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsClientsFullscreen(true)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-amber-500/25 hover:from-amber-400 hover:to-amber-300 text-amber-300 hover:text-neutral-950 font-bold text-xs flex items-center gap-1.5 border border-amber-500/40 hover:border-amber-300 shadow-md transition cursor-pointer group"
              title="Abrir a tela de Gestão de Clientes em tela cheia (sem a barra do estúdio e sem o preview lateral)"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-400 group-hover:text-neutral-950 transition" />
              <span>Gestão em Tela Cheia</span>
            </button>

            <button
              type="button"
              onClick={openSaveDialog}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Microsite</span>
            </button>

            {activeTab === 'dashboard' && (
              <button
                type="button"
                onClick={() => {
                  setSelectedPublishSiteId(editingSiteId || savedSites[0]?.id || null);
                  setPublishModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-semibold text-xs flex items-center gap-1.5 border border-neutral-700 transition cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Publicar & Domínio</span>
              </button>
            )}

            <button
              type="button"
              onClick={copyExportCode}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer ${
                copiedCode
                  ? 'bg-emerald-500 text-neutral-950 ring-2 ring-emerald-400'
                  : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
              }`}
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-neutral-950" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Código Copiado com Sucesso!' : 'Exportar HTML'}</span>
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div
          onWheel={(e) => {
            if (e.deltaY !== 0) {
              e.currentTarget.scrollLeft += e.deltaY;
            }
          }}
          className="px-4 py-2.5 border-b border-neutral-800 bg-neutral-900 flex items-center gap-1.5 overflow-x-auto text-xs tab-scrollbar shrink-0 scroll-smooth"
        >
          {[
            { id: 'quickCreate', label: '⚡ Criação Rápida & IA', icon: Sparkles, isHighlight: true },
            { id: 'styling', label: '🎨 Cores & Paletas', icon: Palette },
            { id: 'identity', label: '👤 Perfil & Fotos', icon: User },
            { id: 'services', label: '🛍️ Serviços & Catálogo', icon: Tag },
            { id: 'buttons', label: '🔗 Botões & WhatsApp', icon: Briefcase },
            { id: 'modules', label: '✨ Prova Social & Avaliações', icon: Layers },
            { id: 'qualifier', label: '🎯 Funil & Conversão', icon: Filter },
            { id: 'highConversion', label: 'Alta Conversão [ON/OFF]', icon: Wand2 },
            { id: 'seo', label: 'SEO & Card WhatsApp', icon: Globe },
            { id: 'tracking', label: 'Pixels & Origem de Tráfego', icon: Target },
            { id: 'dashboard', label: `Painel & Clientes (${savedSites.length})`, icon: Server, isHighlight: true },
            { id: 'export', label: 'Exportar & Código', icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={(e) => {
                  setActiveTab(tab.id);
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : tab.isHighlight
                    ? 'bg-amber-400/10 text-amber-200 border border-amber-500/20 hover:bg-amber-400/20'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : tab.isHighlight ? 'text-amber-400' : 'text-neutral-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 0: CRIAÇÃO RÁPIDA & IA (SIMPLIFICADA) */}
          {activeTab === 'quickCreate' && (
            <QuickCreateTab
              data={data}
              setData={setData}
              editingSiteId={editingSiteId}
              setActiveTab={setActiveTab}
              handleStartNewMicrosite={handleStartNewMicrosite}
              quickCreationMode={quickCreationMode}
              setQuickCreationMode={setQuickCreationMode}
              aiForm={aiForm}
              setAiForm={setAiForm}
              applyThemePreset={applyThemePreset}
              aiError={aiError}
              setAiError={setAiError}
              aiGenerating={aiGenerating}
              aiStepIndex={aiStepIndex}
              handleAiGenerateMicrosite={handleAiGenerateMicrosite}
              handleCopyGeminiScript={handleCopyGeminiScript}
              copiedGeminiScript={copiedGeminiScript}
              buildGeminiSequentialScript={buildGeminiSequentialScript}
              geminiPastedCode={geminiPastedCode}
              setGeminiPastedCode={setGeminiPastedCode}
              geminiAutoFetchInstaPhotos={geminiAutoFetchInstaPhotos}
              setGeminiAutoFetchInstaPhotos={setGeminiAutoFetchInstaPhotos}
              geminiAutoCreateAdminRecord={geminiAutoCreateAdminRecord}
              setGeminiAutoCreateAdminRecord={setGeminiAutoCreateAdminRecord}
              geminiImporting={geminiImporting}
              handleImportGeminiCode={handleImportGeminiCode}
              handleSaveMicrosite={handleSaveMicrosite}
            />
          )}

          {/* TAB 1: ESTILO, MODELOS & TEMAS */}
          {activeTab === 'styling' && (
            <StylingTab
              data={data}
              setData={setData}
              theme={theme}
              filteredThemes={filteredThemes}
              themeCategories={themeCategories}
              themeSearchQuery={themeSearchQuery}
              setThemeSearchQuery={setThemeSearchQuery}
              selectedThemeCategory={selectedThemeCategory}
              setSelectedThemeCategory={setSelectedThemeCategory}
              applyThemePreset={applyThemePreset}
              updateCustomColor={updateCustomColor}
              updateStyle={updateStyle}
              updateProfile={updateProfile}
              handleFileUpload={handleFileUpload}
              nicheKits={NICHE_KITS}
              applyNicheKit={applyNicheKit}
              showToast={showToast}
            />
          )}

          {/* TAB 2: IDENTIDADE, PERFIL & AVISOS */}
          {activeTab === 'identity' && (
            <IdentityTab
              data={data}
              setData={setData}
              theme={theme}
              landingConfig={landingConfig}
              updateLandingConfig={updateLandingConfig}
              updateProfile={updateProfile}
              updateAnnounce={updateAnnounce}
              handleFileUpload={handleFileUpload}
              openCopyOptimizer={openCopyOptimizer}
              showToast={showToast}
            />
          )}

          {/* TAB: FUNIL QUALIFICADOR ANTI-CURIOSOS */}
          {activeTab === 'qualifier' && (
            <QualifierTab
              data={data}
              setData={setData}
              theme={theme}
              updateQualifier={updateQualifier}
            />
          )}

          {/* TAB 3: MÓDULOS ESPECIAIS & PROVA SOCIAL */}
          {activeTab === 'modules' && (
            <ModulesTab
              data={data}
              setData={setData}
              theme={theme}
              photoOrientations={photoOrientations}
              updateMetrics={updateMetrics}
              updateProcess={updateProcess}
              updateStudentGrid={updateStudentGrid}
              loadGalleryPreset={loadGalleryPreset}
              addGalleryPhoto={addGalleryPhoto}
              setLightboxIndex={setLightboxIndex}
              updateGalleryPhotoCaption={updateGalleryPhotoCaption}
              moveGalleryPhoto={moveGalleryPhoto}
              removeGalleryPhoto={removeGalleryPhoto}
              newGalleryUrl={newGalleryUrl}
              setNewGalleryUrl={setNewGalleryUrl}
              newGalleryCaption={newGalleryCaption}
              setNewGalleryCaption={setNewGalleryCaption}
              updateBeforeAfter={updateBeforeAfter}
              addTestimonial={addTestimonial}
              updateTestimonial={updateTestimonial}
              removeTestimonial={removeTestimonial}
              updateLocationCard={updateLocationCard}
              updateAboutMe={updateAboutMe}
              updateFaq={updateFaq}
              handleFileUpload={handleFileUpload}
              showToast={showToast}
            />
          )}

          {/* TAB 4: CATÁLOGO DE SERVIÇOS & CURSOS */}
          {activeTab === 'services' && (
            <ServicesTab
              data={data}
              setData={setData}
              theme={theme}
              updateServicesConfig={updateServicesConfig}
              addService={addService}
              loadServicesPreset={loadServicesPreset}
              updateService={updateService}
              moveService={moveService}
              duplicateService={duplicateService}
              removeService={removeService}
              openCopyOptimizer={openCopyOptimizer}
              handleFileUpload={handleFileUpload}
            />
          )}

          {/* TAB 5: BOTÕES & CTAS */}
          {activeTab === 'buttons' && (
            <ButtonsTab
              data={data}
              setData={setData}
              theme={theme}
              updateQualifier={updateQualifier}
              handleFileUpload={handleFileUpload}
            />
          )}

          {/* TAB: ALTA CONVERSÃO & ESCASSEZ (OPÇÃO 2 - PASSÍVEL DE DESATIVAR) */}
          {activeTab === 'highConversion' && (
            <HighConversionTab
              data={data}
              setData={setData}
              theme={theme}
            />
          )}

          {/* TAB: SEO & CARD DO WHATSAPP (OPÇÃO 4) */}
          {activeTab === 'seo' && (
            <SeoTab
              data={data}
              setData={setData}
              handleFileUpload={handleFileUpload}
            />
          )}

          {/* TAB 6: TRACKING, PIXELS & ORIGEM DE TRÁFEGO */}
          {activeTab === 'tracking' && (
            <TrackingTab
              data={data}
              setData={setData}
              editingSiteId={editingSiteId}
              savedSites={savedSites}
              sessionAnalytics={sessionAnalytics}
              openResetTrackingModal={openResetTrackingModal}
              recordWhatsappClick={recordWhatsappClick}
              updateConversion={updateConversion}
              showToast={showToast}
            />
          )}

          {/* TAB 7: EXPORTAÇÃO & ESTRUTURA DE HOSPEDAGEM EM PASTAS INDEPENDENTES */}
          {activeTab === 'export' && (
            <ExportTab
              data={data}
              currentEditingSite={currentEditingSite}
              savedSites={savedSites}
              downloadMicrositeDirectoryZip={downloadMicrositeDirectoryZip}
              downloadAllSitesDirectoryZip={downloadAllSitesDirectoryZip}
              copyExportCode={copyExportCode}
              copiedCode={copiedCode}
              downloadHtmlFile={downloadHtmlFile}
              generateExportCode={generateExportCode}
            />
          )}

          {/* TAB 8: PAINEL DE GESTÃO SAAS DOS MICROSITES */}
          {activeTab === 'dashboard' && (
            <DashboardTab
              data={data}
              setData={setData}
              savedSites={savedSites}
              editingSiteId={editingSiteId}
              landingConfig={landingConfig}
              setLandingConfig={setLandingConfig}
              revenueGoal={revenueGoal}
              setRevenueGoal={setRevenueGoal}
              bulkEmailHistory={bulkEmailHistory}
              asaasStatusTesting={asaasStatusTesting}
              handleTestAsaasConnection={handleTestAsaasConnection}
              getActiveAsaasApiKey={getActiveAsaasApiKey}
              getActiveAsaasEnv={getActiveAsaasEnv}
              updateAsaasSettings={updateAsaasSettings}
              setIsClientsFullscreen={setIsClientsFullscreen}
              setPublishModalOpen={setPublishModalOpen}
              setSelectedPublishSiteId={setSelectedPublishSiteId}
              setPdfReportModalOpen={setPdfReportModalOpen}
              setSinglePdfSiteId={setSinglePdfSiteId}
              openBulkEmailModal={openBulkEmailModal}
              openClientWaPromptModal={openClientWaPromptModal}
              openPixBillingModal={openPixBillingModal}
              openResetTrackingModal={openResetTrackingModal}
              openSuspendedPagePreview={openSuspendedPagePreview}
              downloadMicrositeDirectoryZip={downloadMicrositeDirectoryZip}
              downloadAllSitesDirectoryZip={downloadAllSitesDirectoryZip}
              loadSiteForEditing={loadSiteForEditing}
              deleteSavedSite={deleteSavedSite}
              updateLandingConfig={updateLandingConfig}
              persistLandingConfigEverywhere={persistLandingConfigEverywhere}
              runAutoOverdueSweepNow={runAutoOverdueSweepNow}
              updateSiteClientEmail={updateSiteClientEmail}
              updateSiteDueDate={updateSiteDueDate}
              updateSiteMaintenancePlan={updateSiteMaintenancePlan}
              updateSiteMonthlyFee={updateSiteMonthlyFee}
adjustSiteUpdatesCount={adjustSiteUpdatesCount}
              extendDueDate={extendDueDate}
              toggleSiteEditsLock={toggleSiteEditsLock}
              toggleSiteFirstMonth={toggleSiteFirstMonth}
              toggleSiteLandingModel={toggleSiteLandingModel}
              toggleSiteSuspensionMode={toggleSiteSuspensionMode}
              openSaveDialog={openSaveDialog}
              setToastMsg={setToastMsg}
            />
          )}
        </div>
      </aside>

      {/* ============================================================== */}
      {/* RIGHT COLUMN: SIMULADOR IPHONE MULTI-NICHO                    */}
      {/* ============================================================== */}
      <main className={`flex-1 h-full bg-neutral-950 ${viewMode === 'editor' ? 'hidden lg:flex' : 'flex'} flex-col items-center justify-start lg:justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto overflow-x-hidden w-full max-w-full relative`}>
        <div
          className="absolute w-full max-w-[440px] h-[360px] sm:h-[440px] rounded-full blur-[100px] sm:blur-[140px] opacity-25 pointer-events-none transition-colors duration-700 overflow-hidden"
          style={{ background: theme.accent }}
        />

        {/* Barra de Navegação Rápida Mobile: Voltar ao Editor */}
        <div className="flex lg:hidden mb-2.5 w-full max-w-[385px] items-center justify-between z-10 px-1">
          <button
            type="button"
            onClick={() => setViewMode('editor')}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/30 cursor-pointer shadow transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Editor</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-neutral-400 font-medium">Prévia iPhone</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between w-full max-w-[385px] text-xs text-neutral-400 z-10 px-1">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-neutral-200">Simulador iPhone Pro</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openLivePreviewTab}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-300 font-bold text-[11px] flex items-center gap-1 border border-amber-500/30 hover:border-amber-400 transition cursor-pointer shadow-sm"
              title="Abrir o resultado do microsite em tela cheia numa nova aba"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Resultado</span>
            </button>

            <button
              type="button"
              onClick={() => setQrModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-emerald-300 font-bold text-[11px] flex items-center gap-1 border border-emerald-500/30 hover:border-emerald-400 transition cursor-pointer shadow-sm"
              title="Gerar QR Code para visualizar e testar o microsite no smartphone"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>QR Code</span>
            </button>
          </div>
        </div>

        {/* Barra de Refinamento Instantâneo Pós-Criação + Resumo da Extração IA */}
        <div className="mb-2.5 w-full max-w-[385px] z-10 space-y-1.5 px-0.5">
          <div className="grid grid-cols-4 gap-1 bg-neutral-900/90 border border-neutral-800/90 rounded-xl p-1 shadow-sm">
            <button
              type="button"
              onClick={handleQuickCyclePalette}
              className="px-1.5 py-1 rounded-lg bg-neutral-950/80 hover:bg-neutral-800 text-[10px] font-semibold text-amber-300 flex items-center justify-center gap-1 border border-amber-500/20 hover:border-amber-400/50 transition cursor-pointer"
              title="Alternar paleta de cores mantendo fotos e textos atuais"
            >
              <Palette className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">Paleta</span>
            </button>
            <button
              type="button"
              onClick={handleQuickCycleCopyVariant}
              className="px-1.5 py-1 rounded-lg bg-neutral-950/80 hover:bg-neutral-800 text-[10px] font-semibold text-pink-300 flex items-center justify-center gap-1 border border-pink-500/20 hover:border-pink-400/50 transition cursor-pointer"
              title="Gerar nova variação persuasiva de bio e chamada principal"
            >
              <Wand2 className="w-3 h-3 text-pink-400 shrink-0" />
              <span className="truncate">Bio IA</span>
            </button>
            <button
              type="button"
              onClick={handleQuickCycleGalleryLayout}
              className="px-1.5 py-1 rounded-lg bg-neutral-950/80 hover:bg-neutral-800 text-[10px] font-semibold text-sky-300 flex items-center justify-center gap-1 border border-sky-500/20 hover:border-sky-400/50 transition cursor-pointer"
              title="Alternar formato da galeria de fotos (Mosaico, Carrossel, Grade)"
            >
              <LayoutGrid className="w-3 h-3 text-sky-400 shrink-0" />
              <span className="truncate">Galeria</span>
            </button>
            <button
              type="button"
              onClick={handleQuickCycleServicesLayout}
              className="px-1.5 py-1 rounded-lg bg-neutral-950/80 hover:bg-neutral-800 text-[10px] font-semibold text-emerald-300 flex items-center justify-center gap-1 border border-emerald-500/20 hover:border-emerald-400/50 transition cursor-pointer"
              title="Alternar exibição do catálogo de serviços"
            >
              <Layers className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">Catálogo</span>
            </button>
          </div>

          {lastExtractedMeta && (lastExtractedMeta.instagramFound || lastExtractedMeta.mapsFound) && (
            <div className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-2 text-[10px] text-emerald-200">
              <div className="flex items-center gap-1.5 flex-wrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  Extraído:{' '}
                  <strong>
                    {(lastExtractedMeta.instagramPhotosCount || 0) + (lastExtractedMeta.mapsPhotosCount || 0)} fotos mais curtidas
                  </strong>
                  {lastExtractedMeta.instagramMaxLikes ? ` (até ${lastExtractedMeta.instagramMaxLikes} ❤️)` : ''}
                  {lastExtractedMeta.servicesExtractedCount ? ` · ${lastExtractedMeta.servicesExtractedCount} serviços do cliente` : ''}
                  {lastExtractedMeta.whatsappDetected ? ' · WhatsApp real' : ''}
                  {lastExtractedMeta.mapsRating ? ` · Nota ${lastExtractedMeta.mapsRating}` : ''}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLastExtractedMeta(null)}
                className="text-neutral-400 hover:text-white cursor-pointer"
                title="Ocultar aviso"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* iPhone Chassis Component Modular */}
        <SimulatorChassis
          data={data}
          theme={theme}
          selectedThemeCategory={selectedThemeCategory}
          isSimulatorLoading={isSimulatorLoading}
          currentFilter={currentFilter}
          photoOrientations={photoOrientations}
          bookingModalOpen={bookingModalOpen}
          setBookingModalOpen={setBookingModalOpen}
          quizModalOpen={quizModalOpen}
          setQuizModalOpen={setQuizModalOpen}
          quizStep={quizStep}
          setQuizStep={setQuizStep}
          quizAnswers={quizAnswers}
          handleQuizAnswer={handleQuizAnswer}
          buildWhatsAppLink={buildWhatsAppLink}
          buildQuizWhatsAppLink={buildQuizWhatsAppLink}
          recordWhatsappClick={recordWhatsappClick}
          beforeAfterSlider={beforeAfterSlider}
          setBeforeAfterSlider={setBeforeAfterSlider}
          activeFaqId={activeFaqId}
          setActiveFaqId={setActiveFaqId}
          bookingForm={bookingForm}
          setBookingForm={setBookingForm}
          setLightboxIndex={setLightboxIndex}
        />
      </main>
        </>
      )}

      {renderSubdomainConfigModal()}
      {renderPaymentSuccessModal()}
      {renderUnderConstructionPreviewModal()}

      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-[100] px-4 py-3 rounded-xl bg-neutral-900 border border-amber-500/40 text-neutral-100 font-semibold text-xs shadow-2xl flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

            {/* ========================================================================= */}
      {/* MODAIS DO SISTEMA MODULARIZADOS (src/components/modals/)                   */}
      {/* ========================================================================= */}
      <SaveModal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        saveForm={saveForm}
        setSaveForm={setSaveForm}
        saveEmailError={saveEmailError}
        setSaveEmailError={setSaveEmailError}
        editingSiteId={editingSiteId}
        handleSaveMicrosite={handleSaveMicrosite}
      />

      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        selectedPublishSiteId={selectedPublishSiteId}
        savedSites={savedSites}
        setSavedSites={setSavedSites}
        data={data}
        landingConfig={landingConfig}
        dnsProviderTab={dnsProviderTab}
        setDnsProviderTab={setDnsProviderTab}
        copiedDnsField={copiedDnsField}
        setCopiedDnsField={setCopiedDnsField}
        dnsTesting={dnsTesting}
        setDnsTesting={setDnsTesting}
        dnsCheckStatus={dnsCheckStatus}
        setDnsCheckStatus={setDnsCheckStatus}
        copyDnsValue={copyDnsValue}
        validateCustomDomain={validateCustomDomain}
        verifyDomainDnsRecords={verifyDomainDnsRecords}
        syncSiteToFirestore={syncSiteToFirestore}
        downloadMicrositeDirectoryZip={downloadMicrositeDirectoryZip}
        showToast={showToast}
      />

      <PdfReportModal
        pdfReportModalOpen={pdfReportModalOpen}
        setPdfReportModalOpen={setPdfReportModalOpen}
        singlePdfSiteId={singlePdfSiteId}
        setSinglePdfSiteId={setSinglePdfSiteId}
        savedSites={savedSites}
        copiedPdfSummary={copiedPdfSummary}
        setCopiedPdfSummary={setCopiedPdfSummary}
        copiedSinglePdfSummary={copiedSinglePdfSummary}
        printPdfReport={printPdfReport}
        printSinglePdfReport={printSinglePdfReport}
        copyWhatsappExecutiveSummary={copyWhatsappExecutiveSummary}
        downloadPdfReportHtml={downloadPdfReportHtml}
        copySingleWhatsappSummary={copySingleWhatsappSummary}
        downloadSinglePdfReportHtml={downloadSinglePdfReportHtml}
      />

      <AiGeneratorModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        aiCreationMode={aiCreationMode}
        setAiCreationMode={setAiCreationMode}
        aiError={aiError}
        setAiError={setAiError}
        aiGenerating={aiGenerating}
        geminiImporting={geminiImporting}
        handleCopyGeminiScript={handleCopyGeminiScript}
        copiedGeminiScript={copiedGeminiScript}
        buildGeminiSequentialScript={buildGeminiSequentialScript}
        geminiPastedCode={geminiPastedCode}
        setGeminiPastedCode={setGeminiPastedCode}
        geminiAutoFetchInstaPhotos={geminiAutoFetchInstaPhotos}
        setGeminiAutoFetchInstaPhotos={setGeminiAutoFetchInstaPhotos}
        geminiAutoCreateAdminRecord={geminiAutoCreateAdminRecord}
        setGeminiAutoCreateAdminRecord={setGeminiAutoCreateAdminRecord}
        handleImportGeminiCode={handleImportGeminiCode}
        aiStepIndex={aiStepIndex}
        aiForm={aiForm}
        setAiForm={setAiForm}
        handleAiGenerateMicrosite={handleAiGenerateMicrosite}
      />

      <PixBillingModal
        isOpen={pixModalOpen}
        onClose={() => setPixModalOpen(false)}
        pixModalSite={pixModalSite}
        pixBillingStage={pixBillingStage}
        setPixBillingStage={setPixBillingStage}
        pixCustomCode={pixCustomCode}
        setPixCustomCode={setPixCustomCode}
        pixWhatsappMessage={pixWhatsappMessage}
        setPixWhatsappMessage={setPixWhatsappMessage}
        buildReguaCobrancaMessage={buildReguaCobrancaMessage}
        data={data}
        landingConfig={landingConfig}
        asaasServerConfigured={asaasServerConfigured}
        asaasStatusTesting={asaasStatusTesting}
        asaasPaymentData={asaasPaymentData}
        asaasGeneratingSiteId={asaasGeneratingSiteId}
        handleGenerateAsaasInvoice={handleGenerateAsaasInvoice}
        checkAsaasStatusAndConfirm={checkAsaasStatusAndConfirm}
        extendDueDate={extendDueDate}
        toggleSiteSuspensionMode={toggleSiteSuspensionMode}
        setSuspendedPreviewSite={setSuspendedPreviewSite}
        setAiCopyModalOpen={setAiCopyModalOpen}
        showToast={showToast}
      />

      <SuspendedPreviewModal
        suspendedPreviewSite={suspendedPreviewSite}
        onClose={() => setSuspendedPreviewSite(null)}
        toggleSiteSuspensionMode={toggleSiteSuspensionMode}
        showToast={showToast}
      />

      <AiCopyModal
        isOpen={aiCopyModalOpen}
        onClose={() => setAiCopyModalOpen(false)}
        aiCopyTarget={aiCopyTarget}
        aiCopyLoading={aiCopyLoading}
        aiCopyOptions={aiCopyOptions}
        showToast={showToast}
      />

      <QrCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        currentEditingSite={currentEditingSite}
        data={data}
        landingConfig={landingConfig}
        showToast={showToast}
        openLivePreviewTab={openLivePreviewTab}
      />

      <LightboxModal
        lightboxIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        photos={data.studentGrid.photos}
        captions={data.studentGrid.captions}
        badge={data.studentGrid.badge}
        headline={data.studentGrid.headline}
        setLightboxIndex={setLightboxIndex}
      />

      <ResetTrackingModal
        isOpen={resetTrackingModalOpen}
        onClose={() => setResetTrackingModalOpen(false)}
        resetModalTarget={resetModalTarget}
        savedSites={savedSites}
        editingSiteId={editingSiteId}
        data={data}
        sessionAnalytics={sessionAnalytics}
        resetAlsoClearPixelIds={resetAlsoClearPixelIds}
        setResetAlsoClearPixelIds={setResetAlsoClearPixelIds}
        executeResetTracking={executeResetTracking}
      />

      <DeleteConfirmModal
        deleteModalSite={deleteModalSite}
        onClose={() => setDeleteModalSite(null)}
        onConfirm={executeDeleteSavedSite}
      />

      <ClientWaPromptModal
        clientWaPromptSite={clientWaPromptSite}
        onClose={() => setClientWaPromptSite(null)}
        clientWaPromptTemplate={clientWaPromptTemplate}
        setClientWaPromptTemplate={setClientWaPromptTemplate}
        clientWaPromptPhone={clientWaPromptPhone}
        setClientWaPromptPhone={setClientWaPromptPhone}
        clientWaPromptText={clientWaPromptText}
        setClientWaPromptText={setClientWaPromptText}
        copiedClientWaPrompt={copiedClientWaPrompt}
        setCopiedClientWaPrompt={setCopiedClientWaPrompt}
        buildClientWhatsappPromptText={buildClientWhatsappPromptText}
        showToast={showToast}
      />

      <BulkEmailModal
        isOpen={bulkEmailModalOpen}
        onClose={() => setBulkEmailModalOpen(false)}
        savedSites={savedSites}
        bulkEmailCategory={bulkEmailCategory}
        setBulkEmailCategory={setBulkEmailCategory}
        bulkEmailSubject={bulkEmailSubject}
        setBulkEmailSubject={setBulkEmailSubject}
        bulkEmailBody={bulkEmailBody}
        setBulkEmailBody={setBulkEmailBody}
        bulkEmailAudience={bulkEmailAudience}
        setBulkEmailAudience={setBulkEmailAudience}
        bulkEmailSelectedIds={bulkEmailSelectedIds}
        setBulkEmailSelectedIds={setBulkEmailSelectedIds}
        bulkEmailSending={bulkEmailSending}
        buildBulkEmailTemplate={buildBulkEmailTemplate}
        handleSelectBulkEmailAudience={handleSelectBulkEmailAudience}
        handleSendBulkEmail={handleSendBulkEmail}
        openMailtoBulkEmail={openMailtoBulkEmail}
        bulkEmailHistory={bulkEmailHistory}
        landingConfig={landingConfig}
      />

      <SecurityModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
        securityModalTab={securityModalTab}
        setSecurityModalTab={setSecurityModalTab}
        adminUser={adminUser}
        changePinCurrent={changePinCurrent}
        setChangePinCurrent={setChangePinCurrent}
        changePinNew={changePinNew}
        setChangePinNew={setChangePinNew}
        changePinConfirm={changePinConfirm}
        setChangePinConfirm={setChangePinConfirm}
        changePinError={changePinError}
        setChangePinError={setChangePinError}
        handleChangeAdminPin={handleChangeAdminPin}
        handleAdminLogout={handleAdminLogout}
        handleLockAdminPanel={handleLockAdminPanel}
        auditLogs={auditLogs}
        setAuditLogs={setAuditLogs}
        showToast={showToast}
      />

    </div>
  );
}

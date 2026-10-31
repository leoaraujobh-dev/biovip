import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  CreditCard,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  KeyRound,
  Lock,
  Maximize2,
  MessageCircle,
  Plus,
  Power,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Star,
  Target,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';
import {
  getDaysUntilDue,
  isSiteSuspendedStatus,
  isSiteEditsLocked,
  getSiteBillingSummary,
  formatPlanUpdatesLabel,
  MAINTENANCE_PLANS,
} from '../../constants/maintenancePlans';
import { isModelMicrosite, isSiteUnderConstruction } from '../../utils/htmlGenerators';
import { formatDueDateBr, formatWhatsAppPhone, safeCopyText, parseBrlCurrency } from '../../utils/formatters';

export interface FullscreenClientsViewProps {
  savedSites: SavedMicrosite[];
  revenueGoal: number;
  setRevenueGoal: (updater: number | ((prev: number) => number)) => void;
  landingConfig: any;
  setLandingConfig: React.Dispatch<React.SetStateAction<any>>;
  updateLandingConfig: (key: string, val: any) => void;
  persistLandingConfigEverywhere: (cfg: any) => void;
  asaasServerConfigured: boolean;
  asaasStatusTesting: boolean;
  asaasTestResult: any;
  setAsaasTestResult: (res: any) => void;
  asaasGuideOpen: boolean;
  setAsaasGuideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleTestAsaasConnection: () => Promise<void> | void;
  getActiveAsaasApiKey: () => string;
  getActiveAsaasEnv: () => 'sandbox' | 'production';
  updateAsaasSettings: (patch: { apiKey?: string; environment?: 'sandbox' | 'production' }) => void;
  applyConfiguredPlanPricesToExistingClients: () => void;
  setIsClientsFullscreen: (val: boolean) => void;
  startNewDraftMicrosite: () => void;
  setAiCreationMode: (mode: any) => void;
  setAiModalOpen: (val: boolean) => void;
  setSubdomainModalOpen: (val: boolean) => void;
  setSecurityModalOpen: (val: boolean) => void;
  setSecurityModalTab: (tab: 'audit' | 'pin' | any) => void;
  handleLockAdminPanel: () => void;
  openPublicSalesLanding: () => void;
  loadSiteForEditing: (site: SavedMicrosite, forceEdit?: boolean) => void;
  toggleSiteLandingModel: (siteId: string) => void;
  toggleSiteConstructionMode: (siteId: string) => void;
  toggleSiteSuspensionMode: (siteId: string) => void;
  openPixBillingModal: (site: SavedMicrosite) => void;
  openSuspendedPagePreview: (site: SavedMicrosite) => void;
  openPublicMicrosite: (slug: string, customDomain?: string) => void;
  setUnderConstructionPreviewSite: (site: SavedMicrosite | null) => void;
  setPublishModalOpen: (val: boolean) => void;
  setSelectedPublishSiteId: (id: string | null) => void;
  setSinglePdfSiteId: (id: string | null) => void;
  setDeleteModalSite: (site: SavedMicrosite) => void;
  showToast: (msg: string) => void;
  adminUser?: any;
  editingSiteId?: string | null;
}

export const FullscreenClientsView: React.FC<FullscreenClientsViewProps> = ({
  savedSites,
  revenueGoal,
  setRevenueGoal,
  landingConfig,
  setLandingConfig,
  updateLandingConfig,
  persistLandingConfigEverywhere,
  asaasServerConfigured,
  asaasStatusTesting,
  asaasTestResult,
  setAsaasTestResult,
  asaasGuideOpen,
  setAsaasGuideOpen,
  handleTestAsaasConnection,
  getActiveAsaasApiKey,
  getActiveAsaasEnv,
  updateAsaasSettings,
  applyConfiguredPlanPricesToExistingClients,
  setIsClientsFullscreen,
  startNewDraftMicrosite,
  setAiCreationMode,
  setAiModalOpen,
  setSubdomainModalOpen,
  setSecurityModalOpen,
  setSecurityModalTab,
  handleLockAdminPanel,
  openPublicSalesLanding,
  loadSiteForEditing,
  toggleSiteLandingModel,
  toggleSiteConstructionMode,
  toggleSiteSuspensionMode,
  openPixBillingModal,
  openSuspendedPagePreview,
  openPublicMicrosite,
  setUnderConstructionPreviewSite,
  setPublishModalOpen,
  setSelectedPublishSiteId,
  setSinglePdfSiteId,
  setDeleteModalSite,
  showToast,
  adminUser,
  editingSiteId,
}) => {
  const [clientsFilterTerm, setClientsFilterTerm] = useState<string>('');
  const [clientsStatusFilter, setClientsStatusFilter] = useState<'all' | 'leads' | 'active' | 'overdue' | 'suspended' | 'disabled' | 'construction' | 'model'>('all');

    // Microsites marcados como Modelo (isModelMicrosite) NÃO entram nos cálculos de faturamento
    const billableSites = savedSites.filter(s => !isModelMicrosite(s));
    const modelSitesCount = savedSites.filter(s => isModelMicrosite(s)).length;
    const leadsProspectCount = savedSites.filter(s => Boolean(s.isTemporaryDemo || s.crmStage)).length;

    const totalContractedRevenue = billableSites.reduce((acc, s) => acc + (s.status !== 'disabled' ? (s.monthlyFee || 0) : 0), 0);
    const activeRevenue = billableSites.reduce((acc, s) => {
      const days = getDaysUntilDue(s.dueDate);
      return acc + (s.status !== 'disabled' && !isSiteSuspendedStatus(s) && days >= 0 ? (s.monthlyFee || 0) : 0);
    }, 0);
    const goal = revenueGoal > 0 ? revenueGoal : 5000;
    const progressPercent = Math.min(100, Math.round((activeRevenue / goal) * 100));

    const constructionCount = savedSites.filter(s => isSiteUnderConstruction(s)).length;
    const inDayCount = billableSites.filter(s => {
      const days = getDaysUntilDue(s.dueDate);
      return !isSiteUnderConstruction(s) && s.status !== 'disabled' && !isSiteSuspendedStatus(s) && days >= 0;
    }).length;
    const overdueCount = billableSites.filter(s => {
      const days = getDaysUntilDue(s.dueDate);
      return !isSiteUnderConstruction(s) && s.status !== 'disabled' && !isSiteSuspendedStatus(s) && days < 0;
    }).length;
    const suspendedCount = billableSites.filter(s => isSiteSuspendedStatus(s)).length;
    const disabledCount = billableSites.filter(s => s.status === 'disabled').length;

    const filteredSites = savedSites.filter(s => {
      if (clientsFilterTerm.trim()) {
        const query = clientsFilterTerm.trim().toLowerCase();
        const matchName = (s.clientName || '').toLowerCase().includes(query);
        const matchSubdomain = (s.subdomain || '').toLowerCase().includes(query);
        const matchDomain = (s.customDomain || '').toLowerCase().includes(query);
        const matchCategory = (s.nicheCategory || '').toLowerCase().includes(query);
        const matchEmail = (s.clientEmail || '').toLowerCase().includes(query);
        const matchPhone = (s.clientPhone || '').replace(/\D/g, '').includes(query.replace(/\D/g, ''));
        if (!matchName && !matchSubdomain && !matchDomain && !matchCategory && !matchEmail && !matchPhone) {
          return false;
        }
      }

      if (clientsStatusFilter === 'leads') {
        return Boolean(s.isTemporaryDemo || s.crmStage);
      }
      if (clientsStatusFilter === 'model') {
        return isModelMicrosite(s);
      }
      if (clientsStatusFilter === 'construction') {
        return isSiteUnderConstruction(s);
      }
      if (clientsStatusFilter === 'active') {
        const days = getDaysUntilDue(s.dueDate);
        return !isModelMicrosite(s) && !isSiteUnderConstruction(s) && s.status !== 'disabled' && !isSiteSuspendedStatus(s) && days >= 0;
      }
      if (clientsStatusFilter === 'overdue') {
        const days = getDaysUntilDue(s.dueDate);
        return !isModelMicrosite(s) && !isSiteUnderConstruction(s) && s.status !== 'disabled' && !isSiteSuspendedStatus(s) && days < 0;
      }
      if (clientsStatusFilter === 'suspended') {
        return !isModelMicrosite(s) && isSiteSuspendedStatus(s);
      }
      if (clientsStatusFilter === 'disabled') {
        return !isModelMicrosite(s) && s.status === 'disabled';
      }
      return true;
    });

    const isAsaasConfigured = Boolean(getActiveAsaasApiKey()) || asaasServerConfigured;
    const asaasEnv = getActiveAsaasEnv();

    return (
      <div className="flex-1 h-full w-full overflow-y-auto bg-[#09090b] text-[#fafaf9] flex flex-col relative selection:bg-amber-400 selection:text-neutral-950">
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%)',
          }}
        />

        {/* 1. DEDICATED FULLSCREEN TOP BAR (SEM A BARRA DO STUDIO E SEM OS MÓDULOS) */}
        <header className="w-full border-b border-white/[0.08] bg-[#09090b]/90 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-16 h-11 rounded-xl bg-[#1c1c1e] border border-amber-400/40 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden shrink-0">
              <img src="/assets/aistudio/1793152702953_02858b21.jpg" alt="BioVip Logo" className="w-full h-full object-cover scale-125" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif font-bold text-base sm:text-lg text-white tracking-tight">
                  Gestão de Clientes & Assinaturas SaaS
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-amber-400" /> TELA CHEIA (SEM PREVIEW)
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Painel Executivo BioVip · {savedSites.length} microsites cadastrados · {adminUser?.email || 'Admin'}
              </p>
            </div>
          </div>

          {/* Action Buttons: Voltar ao Editor com Destaque Máximo */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setIsClientsFullscreen(false)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition"
              title="Sair da tela cheia e voltar para o editor do microsite"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-950" />
              <span>← Voltar ao Studio / Editor</span>
            </button>

            <button
              type="button"
              onClick={() => {
                startNewDraftMicrosite();
                setIsClientsFullscreen(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-emerald-300 font-bold text-xs flex items-center gap-1.5 border border-emerald-500/30 cursor-pointer transition shadow-sm"
              title="Iniciar criação de um novo microsite no modo rascunho"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>+ Novo Microsite</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAiCreationMode('gemini_script');
                setAiModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-400/15 hover:from-amber-400 hover:to-amber-300 text-amber-300 hover:text-neutral-950 font-bold text-xs flex items-center gap-1.5 border border-amber-400/40 cursor-pointer transition shadow-sm"
              title="Copiar Script Sequencial para o Gemini ou Colar Código do Cliente"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>🤖 Script Gemini & Colar Código</span>
            </button>

            <button
              type="button"
              onClick={() => setSubdomainModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-300 font-semibold text-xs flex items-center gap-1.5 border border-amber-500/30 transition cursor-pointer"
              title="Configurar Domínio Principal, Subdomínio do Criador, Preços e Checkout"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Configurar Domínio</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedPublishSiteId(editingSiteId || savedSites[0]?.id || null);
                setPublishModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-xs flex items-center gap-1.5 border border-neutral-800 transition cursor-pointer"
              title="Configurar Domínio & Apontamento DNS de Clientes"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Domínio & DNS</span>
            </button>

            <button
              type="button"
              onClick={openPublicSalesLanding}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-xs flex items-center gap-1.5 border border-neutral-800 transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Vitrine de Vendas</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const url = `${window.location.origin}${window.location.pathname}?view=clients`;
                  window.open(url, '_blank');
                }
              }}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-300 border border-neutral-800 transition cursor-pointer"
              title="Abrir esta tela de gestão em uma nova aba independente"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Central de Segurança & PIN Mestre */}
            <button
              type="button"
              onClick={() => {
                setSecurityModalTab('pin');
                setSecurityModalOpen(true);
              }}
              className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-300 font-semibold text-xs flex items-center gap-1.5 border border-amber-500/30 transition cursor-pointer"
              title="Central de Segurança: Alterar PIN Mestre e Histórico de Acessos"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Segurança & PIN</span>
            </button>

            {/* Bloqueio Imediato do Painel */}
            <button
              type="button"
              onClick={handleLockAdminPanel}
              className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-red-500/15 text-neutral-300 hover:text-red-300 font-semibold text-xs flex items-center gap-1.5 border border-neutral-800 hover:border-red-500/30 transition cursor-pointer"
              title="Bloquear o painel agora (exigirá o PIN mestre de 6 dígitos para reabrir)"
            >
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>Bloquear</span>
            </button>
          </div>
        </header>

        {/* 2. BODY CONTENT (FULL VIEWPORT WIDTH) */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
          {/* BARRA DE PROGRESSO & MRR */}
          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-emerald-500/30 shadow-xl relative overflow-hidden space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Faturamento Mensal Recorrente (MRR)</span>
                    {activeRevenue >= goal && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-neutral-950 flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" /> Meta Batida!
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Acompanhamento em tempo real das mensalidades de microsites ativas e da régua de cobrança.
                  </p>
                </div>
              </div>

              {/* Goal edit button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const promptVal = window.prompt('Defina a nova meta mensal de faturamento (R$):', goal.toString());
                    if (promptVal) {
                      const num = parseFloat(promptVal.replace(',', '.'));
                      if (!isNaN(num) && num > 0) {
                        setRevenueGoal(num);
                        try { localStorage.setItem('luxebio_revenue_goal_v1', num.toString()); } catch {}
                        showToast(`Meta mensal atualizada para R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}!`);
                      }
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-amber-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span>Meta: R$ {goal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  <Edit3 className="w-3 h-3 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">MRR em Dia</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">
                  R$ {activeRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-emerald-400/80 font-medium mt-0.5">
                  {progressPercent}% da meta mensal
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Total Contratado</div>
                <div className="text-lg sm:text-2xl font-black text-neutral-100 font-mono mt-0.5">
                  R$ {totalContractedRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  {billableSites.filter(s => s.status !== 'disabled').length} pagantes · {modelSitesCount} modelos isentos
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Clientes Em Dia</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-300 font-mono mt-0.5">
                  {inDayCount}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  Edições liberadas
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Atrasados (D+3)</div>
                <div className="text-lg sm:text-2xl font-black text-orange-400 font-mono mt-0.5">
                  {overdueCount}
                </div>
                <div className="text-[10px] text-orange-400/80 font-medium mt-0.5">
                  Edições bloqueadas
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Suspensos (D+7)</div>
                <div className="text-lg sm:text-2xl font-black text-red-400 font-mono mt-0.5">
                  {suspendedCount}
                </div>
                <div className="text-[10px] text-red-400/80 font-medium mt-0.5">
                  Tela Manutenção Ativa
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="w-full h-2.5 rounded-full bg-neutral-950 overflow-hidden border border-neutral-800 flex">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono">
                <span>R$ {activeRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                <span>Meta: R$ {goal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* ASAAS PAYMENT GATEWAY INTEGRATION BANNER */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-amber-500/30 space-y-3.5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
                      Gateway de Pagamentos Asaas (Cobranças Pix, Boletos & Baixa Automática)
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                        isAsaasConfigured
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {isAsaasConfigured
                        ? `🟢 Conectado (${asaasEnv.toUpperCase()})`
                        : '🟡 Token Asaas não configurado'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Gere cobranças com QR Code Pix oficial do Asaas e receba confirmações instantâneas de pagamento com renovação automática de faturas.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
                <button
                  type="button"
                  onClick={() => setAsaasGuideOpen(p => !p)}
                  className="px-3 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 font-semibold text-xs border border-neutral-800 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>📘 {asaasGuideOpen ? 'Ocultar Passo a Passo' : 'Como Configurar no Asaas'}</span>
                </button>
                <button
                  type="button"
                  disabled={asaasStatusTesting}
                  onClick={handleTestAsaasConnection}
                  className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-amber-300 font-semibold text-xs border border-amber-500/40 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${asaasStatusTesting ? 'animate-spin text-amber-400' : ''}`} />
                  <span>{asaasStatusTesting ? 'Testando Conexão...' : 'Testar Conexão Asaas'}</span>
                </button>
              </div>
            </div>

            {asaasGuideOpen && (
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-2 text-xs text-neutral-300">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  Passo a Passo para Ativar sua Conta Asaas no BioVip:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-[11.5px] text-neutral-300">
                  <li>
                    Acesse seu painel do <strong>Asaas</strong> (ou <em>sandbox.asaas.com</em> para testes) e vá em{' '}
                    <code className="text-amber-300 font-mono">Minha Conta &gt; Integração &gt; Chave de API</code>.
                  </li>
                  <li>
                    Clique em <strong>Gerar nova chave de API</strong>, copie o código iniciado por <code className="text-amber-300 font-mono">$aact_...</code> e cole no campo <strong>Token de Acesso da API Asaas</strong> abaixo.
                  </li>
                  <li>
                    Selecione o ambiente correspondente (<strong>Produção</strong> para conta real ou <strong>Sandbox</strong> para testes) e clique em <strong>Testar Conexão Asaas</strong>.
                  </li>
                  <li>
                    Para baixa automática de pagamentos, vá em <code className="text-amber-300 font-mono">Minha Conta &gt; Integração &gt; Webhooks</code> no Asaas, adicione a URL{' '}
                    <code className="text-emerald-300 font-mono">https://{(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/api/asaas/webhook</code> e marque os eventos{' '}
                    <code className="text-amber-200 font-mono">PAYMENT_RECEIVED</code> e <code className="text-amber-200 font-mono">PAYMENT_CONFIRMED</code>.
                  </li>
                </ol>
              </div>
            )}

            {/* Asaas Config Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1 text-xs">
              <div className="sm:col-span-6">
                <label className="text-[10px] text-neutral-400 font-mono uppercase block mb-1">
                  Token de Acesso da API Asaas (access_token)
                </label>
                <input
                  type="password"
                  value={getActiveAsaasApiKey()}
                  onChange={(e) => updateAsaasSettings({ apiKey: e.target.value })}
                  placeholder={asaasServerConfigured ? '🟢 Configurado via Variável de Ambiente (ASAAS_API_KEY)' : '$aact_YTU5YTE0M2M6N2I4...'}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-[10px] text-neutral-400 font-mono uppercase block mb-1">
                  Ambiente Asaas
                </label>
                <select
                  value={asaasEnv}
                  onChange={(e) => updateAsaasSettings({ environment: e.target.value as 'sandbox' | 'production' })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs font-semibold focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="sandbox">🧪 Sandbox (Ambiente de Testes)</option>
                  <option value="production">🚀 Produção (Conta Real Asaas)</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="text-[10px] text-neutral-400 font-mono uppercase block mb-1">
                  URL do Webhook de Baixa
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    readOnly
                    value={`https://${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/api/asaas/webhook`}
                    className="w-full px-2.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 font-mono text-[11px] select-all"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      const url = `https://${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/api/asaas/webhook`;
                      await safeCopyText(url);
                      showToast('📋 URL do Webhook do Asaas copiada!');
                    }}
                    className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-amber-300 border border-neutral-800 cursor-pointer"
                    title="Copiar URL do Webhook para colar no painel Asaas"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Configuração do Valor Cobrado no Asaas vs Recorrência e Quantidade de Alterações do Plano Escolhido */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-2.5 border-t border-neutral-800/80 text-xs">
              <div className="lg:col-span-4 flex flex-col justify-between bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                <div>
                  <label className="text-[10px] text-amber-400 font-mono uppercase font-bold block mb-1.5">
                    Valor da Taxa de Criação / Entrada (1º Mês R$)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={landingConfig.pricePro || 'R$ 79,90'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLandingConfig((prev: any) => {
                          const updated = {
                            ...prev,
                            priceEssential: val,
                            pricePro: val,
                            priceScale: val,
                          };
                          persistLandingConfigEverywhere(updated);
                          return updated;
                        });
                      }}
                      placeholder="R$ 79,90"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-amber-400/50 text-amber-300 font-mono font-bold text-xs focus:outline-none focus:border-amber-300"
                    />
                  </div>
                  <span className="text-[10px] text-emerald-400 block mt-1.5 font-medium">
                    💬 Asaas pausado: compras na Landing Page direcionam para o WhatsApp (31) 99139-0202.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={applyConfiguredPlanPricesToExistingClients}
                  className="mt-3 w-full py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition"
                  title="Atualizar a mensalidade dos clientes atuais de acordo com o novo valor de recorrência do plano de cada um"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Aplicar Novos Preços aos Clientes Atuais</span>
                </button>
              </div>

              <div className="lg:col-span-8 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <label className="text-[10px] text-emerald-400 font-mono uppercase font-bold block">
                    Editar Planos: Valor da Recorrência Mensal (R$) & Quantidade de Alterações Oferecidas
                  </label>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    Reflete na Landing Page, Checkout Asaas e Painel
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Plano Básico */}
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold text-emerald-300">🛠️ Plano Básico</span>
                      <span className="text-[9.5px] font-mono text-neutral-400">
                        {formatPlanUpdatesLabel(MAINTENANCE_PLANS.basic_1.maxUpdates, true)}
                      </span>
                    </div>
                    <div>
                      <label className="text-[9.5px] text-neutral-400 block mb-0.5">Valor da Recorrência (R$/mês)</label>
                      <div className="flex items-center gap-1 bg-neutral-900 rounded-lg border border-neutral-800 px-2 py-1 focus-within:border-emerald-400">
                        <span className="text-[10px] text-neutral-500 font-mono">R$</span>
                        <input
                          type="text"
                          value={landingConfig.recurringBasic ?? '29,90'}
                          onChange={(e) => updateLandingConfig('recurringBasic', e.target.value)}
                          placeholder="29,90"
                          className="w-full bg-transparent text-emerald-400 font-mono font-bold text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9.5px] text-neutral-400 block mb-0.5">Qtd. de Alterações no Plano</label>
                      <input
                        type="text"
                        value={landingConfig.updatesBasic ?? '1'}
                        onChange={(e) => updateLandingConfig('updatesBasic', e.target.value)}
                        placeholder="Ex: 1 ou Ilimitadas"
                        className="w-full px-2 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-mono text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Plano Pro */}
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-amber-400/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold text-amber-300">⚡ Plano Pro</span>
                      <span className="text-[9.5px] font-mono text-amber-300/80">
                        {formatPlanUpdatesLabel(MAINTENANCE_PLANS.pro_4.maxUpdates, true)}
                      </span>
                    </div>
                    <div>
                      <label className="text-[9.5px] text-neutral-400 block mb-0.5">Valor da Recorrência (R$/mês)</label>
                      <div className="flex items-center gap-1 bg-neutral-900 rounded-lg border border-neutral-800 px-2 py-1 focus-within:border-emerald-400">
                        <span className="text-[10px] text-neutral-500 font-mono">R$</span>
                        <input
                          type="text"
                          value={landingConfig.recurringPro ?? '49,90'}
                          onChange={(e) => updateLandingConfig('recurringPro', e.target.value)}
                          placeholder="49,90"
                          className="w-full bg-transparent text-emerald-400 font-mono font-bold text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9.5px] text-neutral-400 block mb-0.5">Qtd. de Alterações no Plano</label>
                      <input
                        type="text"
                        value={landingConfig.updatesPro ?? '4'}
                        onChange={(e) => updateLandingConfig('updatesPro', e.target.value)}
                        placeholder="Ex: 4 ou Ilimitadas"
                        className="w-full px-2 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-mono text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Plano VIP */}
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-bold text-amber-400">👑 Plano VIP</span>
                      <span className="text-[9.5px] font-mono text-neutral-400">
                        {formatPlanUpdatesLabel(MAINTENANCE_PLANS.vip_unlimited.maxUpdates, true)}
                      </span>
                    </div>
                    <div>
                      <label className="text-[9.5px] text-neutral-400 block mb-0.5">Valor da Recorrência (R$/mês)</label>
                      <div className="flex items-center gap-1 bg-neutral-900 rounded-lg border border-neutral-800 px-2 py-1 focus-within:border-emerald-400">
                        <span className="text-[10px] text-neutral-500 font-mono">R$</span>
                        <input
                          type="text"
                          value={landingConfig.recurringVip ?? '79,90'}
                          onChange={(e) => updateLandingConfig('recurringVip', e.target.value)}
                          placeholder="79,90"
                          className="w-full bg-transparent text-emerald-400 font-mono font-bold text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9.5px] text-neutral-400 block mb-0.5">Qtd. de Alterações no Plano</label>
                      <input
                        type="text"
                        value={landingConfig.updatesVip ?? 'Ilimitadas'}
                        onChange={(e) => updateLandingConfig('updatesVip', e.target.value)}
                        placeholder="Ilimitadas ou nº"
                        className="w-full px-2 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-mono text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {asaasTestResult && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                  asaasTestResult.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                }`}
              >
                <span>{asaasTestResult.message}</span>
                <button
                  type="button"
                  onClick={() => setAsaasTestResult(null)}
                  className="text-neutral-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* 3. SEARCH & STATUS FILTERS BAR */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/80 p-3.5 rounded-2xl border border-neutral-800">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={clientsFilterTerm}
                onChange={(e) => setClientsFilterTerm(e.target.value)}
                placeholder="Pesquisar por cliente, nicho, subdomínio ou e-mail..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
              />
              {clientsFilterTerm && (
                <button
                  type="button"
                  onClick={() => setClientsFilterTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: 'all' as const, label: `Todos (${savedSites.length})` },
                { id: 'leads' as const, label: `🎯 Leads & CRM (${leadsProspectCount})` },
                { id: 'model' as const, label: `⭐ Modelos (${modelSitesCount})` },
                { id: 'construction' as const, label: `🚧 Em Construção (${constructionCount})` },
                { id: 'active' as const, label: `🟢 Em Dia (${inDayCount})` },
                { id: 'overdue' as const, label: `🔒 Atrasados D+3 (${overdueCount})` },
                { id: 'suspended' as const, label: `🛑 Suspensos D+7 (${suspendedCount})` },
                { id: 'disabled' as const, label: `⚪ Desativados (${disabledCount})` },
              ].map((f) => {
                const active = clientsStatusFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setClientsStatusFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition border ${
                      active
                        ? 'bg-amber-400 text-neutral-950 border-amber-300 shadow-md shadow-amber-500/20'
                        : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border-neutral-800'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. CLIENTS CARDS / GRID (FULL WIDTH) */}
          {filteredSites.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
              <Users className="w-10 h-10 text-neutral-600 mx-auto" />
              <h3 className="text-base font-bold text-neutral-300">Nenhum microsite encontrado com este filtro.</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Tente alterar o termo de pesquisa ou selecionar a aba "Todos" para visualizar todos os clientes.
              </p>
              <button
                type="button"
                onClick={() => {
                  setClientsFilterTerm('');
                  setClientsStatusFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-bold cursor-pointer transition"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
              {filteredSites.map((site) => {
                const billing = getSiteBillingSummary(site);
                const daysDiff = getDaysUntilDue(site.dueDate);
                const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : (site.daysOverdue || 0);
                const isModel = isModelMicrosite(site);
                const isUnderConst = isSiteUnderConstruction(site);
                const isEditsBlocked = !isModel && isSiteEditsLocked(site, daysOverdue);
                const isSuspended = !isModel && isSiteSuspendedStatus(site);
                const clicks = site.whatsappClicks || 0;
                const views = site.pageViews || 100;
                const rate = ((clicks / views) * 100).toFixed(1);
                const domain = site.customDomain || `${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/${site.subdomain}`;

                return (
                  <div
                    key={site.id}
                    className={`rounded-2xl p-5 bg-neutral-900/90 border transition-all duration-200 shadow-xl flex flex-col justify-between space-y-4 ${
                      isModel
                        ? 'border-amber-400/40 hover:border-amber-400 bg-neutral-900/95'
                        : isUnderConst
                        ? 'border-amber-400/60 hover:border-amber-400 bg-amber-950/10'
                        : isSuspended
                        ? 'border-red-500/50 hover:border-red-400 bg-red-950/10'
                        : isEditsBlocked
                        ? 'border-orange-500/50 hover:border-orange-400 bg-orange-950/10'
                        : 'border-neutral-800 hover:border-amber-500/40 hover:bg-neutral-900'
                    }`}
                  >
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-serif font-bold text-base text-white tracking-tight">
                              {site.clientName}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                              {site.nicheCategory}
                            </span>
                            {isModel && (
                              <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                <span>Modelo (Sem Faturamento)</span>
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => openPublicMicrosite(site.subdomain, site.customDomain)}
                            className="text-xs font-mono text-amber-400/90 hover:text-amber-300 flex items-center gap-1 mt-1 group cursor-pointer text-left"
                            title="Acessar o link do cliente"
                          >
                            <span>https://{domain}</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                          </button>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0">
                          {isModel ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>Modelo Vitrine (Isento)</span>
                            </span>
                          ) : isUnderConst ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 animate-pulse">
                              <span className="w-2 h-2 rounded-full bg-amber-400" />
                              <span>Em Construção {site.briefingStatus === 'submitted' ? '(Briefing Enviado)' : '(Aguardando Dados)'}</span>
                            </span>
                          ) : isSuspended ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-red-400" />
                              <span>Suspenso D+7 ({daysOverdue}d)</span>
                            </span>
                          ) : isEditsBlocked ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-orange-400" />
                              <span>Atrasado D+3 ({daysOverdue}d)</span>
                            </span>
                          ) : site.status === 'disabled' ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-neutral-800 text-neutral-400 border border-neutral-700">
                              Desativado
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Em Dia (0d)</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Under Construction Notice Banner */}
                      {isUnderConst && (
                        <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">🚧</span>
                            <div className="min-w-0">
                              <div className="text-[11px] font-bold text-amber-200 truncate">
                                {site.briefingStatus === 'submitted' ? '✅ Cliente já enviou dados do briefing!' : '⏳ Aguardando cliente enviar informações'}
                              </div>
                              <div className="text-[10px] text-amber-400/80 truncate">
                                Link público exibe página em construção com solicitação de envio.
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleSiteConstructionMode(site.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-[11px] shrink-0 flex items-center gap-1 shadow transition cursor-pointer"
                            title="Concluir a construção e colocar o microsite oficial no ar"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Publicar Site</span>
                          </button>
                        </div>
                      )}

                      {/* Client Details Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                        <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                          <span className="text-[10px] text-neutral-400 block font-medium">Vencimento</span>
                          <span className="font-mono font-bold text-neutral-200 block mt-0.5">
                            {isModel ? 'Isento' : formatDueDateBr(site.dueDate)}
                          </span>
                          <span className={`text-[9.5px] block font-semibold ${isModel ? 'text-amber-400' : daysOverdue > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {isModel ? 'Site Modelo' : daysOverdue > 0 ? `${daysOverdue}d de atraso` : 'Em dia'}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                          <span className="text-[10px] text-neutral-400 block font-medium">Fatura Atual</span>
                          {isModel ? (
                            <>
                              <span className="font-mono font-bold text-amber-300 block mt-0.5">
                                R$ 0,00 (Modelo)
                              </span>
                              <span className="text-[9.5px] text-neutral-400 block truncate">
                                Fora do faturamento
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="font-mono font-bold text-emerald-400 block mt-0.5">
                                R$ {billing.totalDueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                              <span className="text-[9.5px] text-neutral-400 block truncate">
                                {billing.isFirstMonth ? '1º Mês Criação' : `Manut. R$ ${site.monthlyFee.toFixed(2)}`}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                          <span className="text-[10px] text-neutral-400 block font-medium">Edições Mês</span>
                          <span className="font-mono font-bold text-neutral-200 block mt-0.5">
                            {billing.updatesUsed} usadas
                          </span>
                          <span className={`text-[9.5px] block font-semibold ${isEditsBlocked ? 'text-red-400' : 'text-emerald-400'}`}>
                            {isEditsBlocked ? '🔒 Bloqueadas' : '🔓 Liberadas'}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                          <span className="text-[10px] text-neutral-400 block font-medium">Conversão WA</span>
                          <span className="font-mono font-bold text-amber-300 block mt-0.5">
                            {rate}%
                          </span>
                          <span className="text-[9.5px] text-neutral-400 block">
                            {clicks} cliques
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS (MUITO CLARAS E FÁCEIS DE CLICAR) */}
                    <div className="pt-2 border-t border-neutral-800/80 space-y-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* 1. BOTÃO EDITAR MICROSITE (VOLTA AO EDITOR COM O MICROSITE CARREGADO) */}
                        <button
                          type="button"
                          onClick={() => loadSiteForEditing(site, true)}
                          className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer transition"
                          title="Voltar para a tela de edição carregando este microsite"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-neutral-950" />
                          <span>Editar Microsite</span>
                        </button>

                        {/* 2. BOTÃO PARA DEFINIR / REMOVER COMO MODELO (SEM FATURAMENTO) */}
                        <button
                          type="button"
                          onClick={() => toggleSiteLandingModel(site.id)}
                          className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 border cursor-pointer transition ${
                            isModel
                              ? 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border-amber-400/60 shadow-sm'
                              : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-amber-300 border-neutral-700'
                          }`}
                          title={
                            isModel
                              ? 'Este microsite está marcado como MODELO e NÃO entra no cálculo de faturamento. Clique para tornar cliente faturável.'
                              : 'Marcar este microsite como MODELO (não será considerado nos cálculos de faturamento)'
                          }
                        >
                          <Star className={`w-3.5 h-3.5 ${isModel ? 'fill-amber-400 text-amber-400' : 'text-amber-400'}`} />
                          <span>{isModel ? '⭐ É Modelo (Sem Faturamento)' : 'Marcar como Modelo'}</span>
                        </button>

                        {/* 3. RÉGUA DE COBRANÇA WHATSAPP */}
                        {!isModel && (
                          <button
                            type="button"
                            onClick={() => openPixBillingModal(site)}
                            className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition"
                            title="Abrir Régua de Cobrança WhatsApp (D-3, D-0, D+3, D+7) com wa.me"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-neutral-950" />
                            <span>Régua WhatsApp</span>
                          </button>
                        )}

                        {/* 4. GERAR COBRANÇA ASAAS / PIX */}
                        {!isModel && (
                          <button
                            type="button"
                            onClick={() => openPixBillingModal(site)}
                            className="py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/40 cursor-pointer transition"
                            title="Gerar Cobrança Oficial no Asaas / PIX e confirmar baixa"
                          >
                            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                            <span>Fatura Asaas & PIX</span>
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        {/* Ações Especiais de Página em Construção */}
                        {isUnderConst && (
                          <>
                            <button
                              type="button"
                              onClick={() => setUnderConstructionPreviewSite(site)}
                              className="px-2.5 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-[11px] font-bold flex items-center gap-1 border border-amber-400/30 transition cursor-pointer"
                              title="Ver a página em construção exatamente como o cliente vê"
                            >
                              <Eye className="w-3 h-3 text-amber-400" />
                              <span>Ver Em Construção</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const targetPhone = formatWhatsAppPhone(site.clientPhone || '');
                                const domainUrl = site.customDomain || `${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/${site.subdomain}`;
                                const msg = encodeURIComponent(
                                  `Olá ${site.clientName}! Vimos que seu pagamento no Asaas foi confirmado com sucesso e seu link https://${domainUrl} já foi reservado! 🚀\n\n` +
                                  `Para colocarmos seu microsite no ar em tempo recorde, precisamos que nos envie:\n` +
                                  `1) Foto de perfil / Logotipo em alta resolução\n` +
                                  `2) Nome comercial e slogan\n` +
                                  `3) Breve bio e diferenciais\n` +
                                  `4) WhatsApp de atendimento\n` +
                                  `5) Principais serviços e valores\n\n` +
                                  `Nossa equipe de criação já está pronta para montar sua página!`
                                );
                                window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 border border-emerald-500/30 transition cursor-pointer"
                              title="Solicitar envio de informações no WhatsApp para montagem do site"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-400" />
                              <span>Cobrar Dados WA</span>
                            </button>
                          </>
                        )}
                        {/* Alternar Suspensão */}
                        <button
                          type="button"
                          onClick={() => toggleSiteSuspensionMode(site.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 border transition cursor-pointer ${
                            isSuspended
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-red-500/10 text-red-300 border-red-500/30 hover:bg-red-500/20'
                          }`}
                          title="Alternar entre site ativo e Tela Neutra de Manutenção"
                        >
                          <Power className="w-3 h-3" />
                          <span>{isSuspended ? 'Reativar Site' : 'Modo Manutenção'}</span>
                        </button>

                        {/* Tela Manutenção Preview */}
                        <button
                          type="button"
                          onClick={() => openSuspendedPagePreview(site)}
                          className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-medium flex items-center gap-1 border border-neutral-700 transition cursor-pointer"
                          title="Ver como o público vê o site em modo de manutenção neutra"
                        >
                          <Eye className="w-3 h-3 text-amber-400" />
                          <span>Ver Manutenção</span>
                        </button>

                        {/* Domínio & DNS */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPublishSiteId(site.id);
                            setPublishModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-medium flex items-center gap-1 border border-neutral-700 transition cursor-pointer"
                        >
                          <Globe className="w-3 h-3 text-amber-400" />
                          <span>Domínio</span>
                        </button>

                        {/* Relatório PDF */}
                        <button
                          type="button"
                          onClick={() => setSinglePdfSiteId(site.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-medium flex items-center gap-1 border border-neutral-700 transition cursor-pointer"
                        >
                          <FileText className="w-3 h-3 text-amber-400" />
                          <span>PDF</span>
                        </button>

                        {/* Excluir */}
                        <button
                          type="button"
                          onClick={() => setDeleteModalSite(site)}
                          className="px-2 py-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-300 text-[11px] font-medium flex items-center gap-1 border border-neutral-700 hover:border-red-500/30 transition cursor-pointer ml-auto"
                          title="Excluir microsite"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
};

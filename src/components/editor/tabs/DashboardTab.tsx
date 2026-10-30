import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  DollarSign,
  Edit3,
  Eye,
  FileText,
  Folder,
  FolderArchive,
  Globe,
  Lock,
  Mail,
  Maximize2,
  MessageCircle,
  Plus,
  Power,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import type { SavedMicrosite, MaintenancePlanId } from '../../../types/microsite';
import {
  MAINTENANCE_PLANS,
  EXTRA_UPDATE_FEE,
  AUTO_DISABLE_OVERDUE_DAYS,
  getDaysUntilDue,
  isSiteSuspendedStatus,
  isSiteOverdueStatus,
  isSiteEditsLocked,
  getSiteBillingSummary,
  formatPlanUpdatesLabel,
} from '../../../constants/maintenancePlans';
import { isModelMicrosite } from '../../../utils/htmlGenerators';
import { INITIAL_DATA } from '../../../constants/initialData';

const isValidClientEmail = (email: string) => {
  return /^[^s@]+@[^s@]+.[^s@]{2,}$/.test((email || '').trim());
};

export interface DashboardTabProps {
  data: typeof INITIAL_DATA | any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  savedSites: SavedMicrosite[];
  editingSiteId?: string | null;
  landingConfig: any;
  setLandingConfig: React.Dispatch<React.SetStateAction<any>>;
  revenueGoal: number;
  setRevenueGoal: (goal: number | ((prev: number) => number)) => void;
  bulkEmailHistory: any[];
  asaasStatusTesting: boolean;
  handleTestAsaasConnection: () => Promise<void> | void;
  getActiveAsaasApiKey: () => string;
  getActiveAsaasEnv: () => 'sandbox' | 'production';
  updateAsaasSettings: (patch: { apiKey?: string; environment?: 'sandbox' | 'production' }) => void;
  setIsClientsFullscreen: (val: boolean) => void;
  setPublishModalOpen: (val: boolean) => void;
  setSelectedPublishSiteId: (id: string | null) => void;
  setPdfReportModalOpen: (val: boolean) => void;
  setSinglePdfSiteId: (id: string | null) => void;
  openBulkEmailModal: (templateId?: any, target?: any) => void;
  openClientWaPromptModal: (site: SavedMicrosite, mode?: any) => void;
  openPixBillingModal: (site: SavedMicrosite) => void;
  openResetTrackingModal: (target: 'current' | 'all' | SavedMicrosite) => void;
  openSuspendedPagePreview: (site: SavedMicrosite) => void;
  downloadMicrositeDirectoryZip: (site: SavedMicrosite) => void;
  downloadAllSitesDirectoryZip: () => void;
  loadSiteForEditing: (site: SavedMicrosite, forceEdit?: boolean) => void;
  deleteSavedSite: (id: string) => void;
  updateLandingConfig: (key: string, val: any) => void;
  persistLandingConfigEverywhere: (cfg: any) => void;
  runAutoOverdueSweepNow: () => void;
  updateSiteClientEmail: (siteId: string, email: string) => boolean | void;
  updateSiteDueDate: (siteId: string, date: string) => void;
  updateSiteMaintenancePlan: (siteId: string, plan: MaintenancePlanId | any) => void;
  updateSiteMonthlyFee: (siteId: string, fee: number) => void;
  adjustSiteUpdatesCount: (siteId: string, delta: number) => void;
  extendDueDate: (siteId: string, days?: number) => void;
  toggleSiteEditsLock: (siteId: string) => void;
  toggleSiteFirstMonth: (siteId: string) => void;
  toggleSiteLandingModel: (siteId: string) => void;
  toggleSiteSuspensionMode: (siteId: string) => void;
  openSaveDialog?: () => void;
  setToastMsg?: (msg: string | null) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  data,
  setData,
  savedSites,
  editingSiteId,
  landingConfig,
  setLandingConfig,
  revenueGoal,
  setRevenueGoal,
  bulkEmailHistory,
  asaasStatusTesting,
  handleTestAsaasConnection,
  getActiveAsaasApiKey,
  getActiveAsaasEnv,
  updateAsaasSettings,
  setIsClientsFullscreen,
  setPublishModalOpen,
  setSelectedPublishSiteId,
  setPdfReportModalOpen,
  setSinglePdfSiteId,
  openBulkEmailModal,
  openClientWaPromptModal,
  openPixBillingModal,
  openResetTrackingModal,
  openSuspendedPagePreview,
  downloadMicrositeDirectoryZip,
  downloadAllSitesDirectoryZip,
  loadSiteForEditing,
  deleteSavedSite,
  updateLandingConfig,
  persistLandingConfigEverywhere,
  runAutoOverdueSweepNow,
  updateSiteClientEmail,
  updateSiteDueDate,
  updateSiteMaintenancePlan,
  updateSiteMonthlyFee,
  adjustSiteUpdatesCount,
  extendDueDate,
  toggleSiteEditsLock,
  toggleSiteFirstMonth,
  toggleSiteLandingModel,
  toggleSiteSuspensionMode,
  openSaveDialog,
  setToastMsg,
}) => {
  const [dashboardSearch, setDashboardSearch] = useState('');
  const [dashboardStatusFilter, setDashboardStatusFilter] = useState('all');
  const [dashboardDueDateFilter, setDashboardDueDateFilter] = useState<'all' | 'today' | '7days' | '15days' | 'this_month' | 'overdue' | 'custom'>('all');
  const [dashboardDueDateExact, setDashboardDueDateExact] = useState('');
  const [dashboardSortBy, setDashboardSortBy] = useState<'dueDate_asc' | 'dueDate_desc' | 'fee_desc' | 'rate_desc' | 'name_asc'>('dueDate_asc');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoalInput, setTempGoalInput] = useState('');
  const [pixCardExpanded, setPixCardExpanded] = useState(false);
  const [editingDueDateSiteId, setEditingDueDateSiteId] = useState<string | null>(null);
  const [tempDueDateInput, setTempDueDateInput] = useState('');
  const [editingEmailSiteId, setEditingEmailSiteId] = useState<string | null>(null);
  const [tempEmailInput, setTempEmailInput] = useState('');
  const [editingFeeSiteId, setEditingFeeSiteId] = useState<string | null>(null);
  const [tempFeeInput, setTempFeeInput] = useState('');

  return (
            <div className="space-y-6">
              {/* BANNER PARA EXPANDIR GESTÃO EM TELA CHEIA */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-amber-500/15 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Visualização Executiva em Tela Cheia
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Gerencie todos os clientes em tela cheia, sem a barra de ferramentas do estúdio e sem o preview lateral.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsClientsFullscreen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer transition shrink-0 self-start sm:self-center"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expandir para Tela Cheia ⛶</span>
                </button>
              </div>

              {/* ============================================================== */}
              {/* 1. BARRA DE PROGRESSO VISUAL DO FATURAMENTO MENSAL (MRR / META) */}
              {/* ============================================================== */}
              {(() => {
                // Microsites Modelo NÃO entram no cálculo de faturamento (MRR)
                const billableSites = savedSites.filter(s => !isModelMicrosite(s));
                const modelSitesCount = savedSites.filter(s => isModelMicrosite(s)).length;
                const totalContractedRevenue = billableSites.reduce((acc, s) => acc + (s.status !== 'disabled' ? (s.monthlyFee || 0) : 0), 0);
                const activeRevenue = billableSites.reduce((acc, s) => {
                  const days = getDaysUntilDue(s.dueDate);
                  return acc + (s.status !== 'disabled' && !isSiteSuspendedStatus(s) && days >= 0 ? (s.monthlyFee || 0) : 0);
                }, 0);
                const overdueRevenue = billableSites.reduce((acc, s) => {
                  const days = getDaysUntilDue(s.dueDate);
                  return acc + (s.status !== 'disabled' && (s.status === 'overdue' || days < 0) ? (s.monthlyFee || 0) : 0);
                }, 0);
                const goal = revenueGoal > 0 ? revenueGoal : 5000;
                const progressPercent = Math.min(100, Math.round((activeRevenue / goal) * 100));
                const totalProgressPercent = Math.min(100, Math.round((totalContractedRevenue / goal) * 100));
                const overduePercent = Math.min(Math.max(0, 100 - progressPercent), Math.round((overdueRevenue / goal) * 100));
                const remainingToGoal = Math.max(0, goal - activeRevenue);
                const isGoalBeaten = activeRevenue >= goal;

                return (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-900/90 to-neutral-950 border border-emerald-500/30 shadow-xl relative overflow-hidden space-y-4">
                    {/* Ambient Glow */}
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Header: Title + Goal Setter */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-neutral-100 flex items-center gap-2">
                              Faturamento Mensal Recorrente (MRR) & Meta
                              {isGoalBeaten && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-neutral-950 flex items-center gap-1 shadow-sm">
                                  <Sparkles className="w-3 h-3" /> Meta Batida!
                                </span>
                              )}
                            </h3>
                            <p className="text-[11px] text-neutral-400">
                              Acompanhamento em tempo real da meta financeira de mensalidades ativas e em dia.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Goal Edit Button / Input */}
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        {isEditingGoal ? (
                          <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-amber-500/50">
                            <span className="text-xs text-neutral-400 pl-2 font-mono">R$</span>
                            <input
                              type="number"
                              value={tempGoalInput}
                              onChange={(e) => setTempGoalInput(e.target.value)}
                              placeholder={goal.toString()}
                              className="w-24 px-2 py-1 text-xs bg-neutral-950 rounded border border-neutral-700 text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-400"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const num = parseFloat(tempGoalInput);
                                if (!isNaN(num) && num > 0) {
                                  setRevenueGoal(num);
                                  try {
                                    localStorage.setItem('luxebio_revenue_goal_v1', num.toString());
                                  } catch {}
                                  setToastMsg?.(`Meta mensal atualizada para R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}!`);
                                  setTimeout(() => setToastMsg?.(null), 3000);
                                }
                                setIsEditingGoal(false);
                              }}
                              className="px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs cursor-pointer transition"
                            >
                              Salvar
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsEditingGoal(false)}
                              className="px-2 py-1 rounded text-neutral-400 hover:text-neutral-200 text-xs cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setTempGoalInput(goal.toString());
                              setIsEditingGoal(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-amber-300 font-medium text-xs flex items-center gap-1.5 transition cursor-pointer"
                            title="Alterar o valor da meta mensal de faturamento"
                          >
                            <Target className="w-3.5 h-3.5 text-amber-400" />
                            <span>Meta: R$ {goal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            <Edit3 className="w-3 h-3 text-neutral-500" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Big Numbers Display */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10 pt-1">
                      <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
                        <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Faturamento Em Dia</div>
                        <div className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums">
                          R$ {activeRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[10px] text-emerald-400/80 font-medium mt-0.5">
                          {progressPercent}% da meta
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
                        <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Total Contratado</div>
                        <div className="text-xl sm:text-2xl font-black text-neutral-100 tabular-nums">
                          R$ {totalContractedRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">
                          {totalProgressPercent}% da meta · {modelSitesCount} modelo(s) isento(s)
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
                        <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider flex items-center gap-1">
                          Pendente / Atrasado
                          {overdueRevenue > 0 && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">
                          R$ {overdueRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[10px] text-amber-400/80 font-medium mt-0.5">
                          {billableSites.filter(s => s.status !== 'disabled' && (s.status === 'overdue' || getDaysUntilDue(s.dueDate) < 0)).length} cliente(s)
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
                        <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                          {isGoalBeaten ? 'Superávit da Meta' : 'Faltam para a Meta'}
                        </div>
                        <div className={`text-xl sm:text-2xl font-black tabular-nums ${isGoalBeaten ? 'text-emerald-300' : 'text-neutral-200'}`}>
                          {isGoalBeaten
                            ? `+ R$ ${(activeRevenue - goal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                            : `R$ ${remainingToGoal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">
                          Meta R$ {goal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}/mês
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="space-y-1.5 relative z-10 pt-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-neutral-300 flex items-center gap-1.5">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400" />
                          Progresso de Arrecadação: <span className="text-emerald-400 font-mono font-bold">{progressPercent}%</span>
                        </span>
                        <span className="text-neutral-400 font-mono text-[11px]">
                          R$ {activeRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })} / R$ {goal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                        </span>
                      </div>

                      {/* Main Bar */}
                      <div className="relative w-full h-4 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800 p-0.5 shadow-inner">
                        {/* Milestone Tick Marks (25%, 50%, 75%) */}
                        <div className="absolute inset-0 pointer-events-none z-20 flex justify-between px-[25%] opacity-30">
                          <div className="w-0.5 h-full bg-neutral-500" />
                          <div className="w-0.5 h-full bg-neutral-500" />
                        </div>
                        <div className="absolute inset-0 pointer-events-none z-20 flex justify-center opacity-40">
                          <div className="w-0.5 h-full bg-neutral-400" />
                        </div>

                        {/* Active Revenue Bar */}
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700 shadow-lg shadow-emerald-500/20 relative"
                          style={{ width: `${progressPercent}%` }}
                        >
                          {progressPercent > 12 && (
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-black text-neutral-950 font-mono">
                              {progressPercent}%
                            </span>
                          )}
                        </div>

                        {/* Overdue Revenue Segment (if any) */}
                        {overduePercent > 0 && progressPercent < 100 && (
                          <div
                            className="h-full rounded-r-full bg-gradient-to-r from-amber-500 to-amber-400 opacity-80 transition-all duration-700"
                            style={{
                              width: `${overduePercent}%`,
                              marginLeft: `${progressPercent}%`,
                              marginTop: '-12px'
                            }}
                          />
                        )}
                      </div>

                      {/* Milestone Labels */}
                      <div className="flex justify-between text-[10px] text-neutral-500 font-mono px-1 pt-0.5">
                        <span>R$ 0</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span className="text-amber-400/90 font-bold">100% (Meta R$ {goal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })})</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* ============================================================== */}
              {/* 2. RESUMO DE MÉTRICAS SAAS                                      */}
              {/* ============================================================== */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Total Microsites</div>
                  <div className="text-xl font-black text-amber-400 tabular-nums">{savedSites.length}</div>
                  <div className="text-[9px] text-neutral-500">Páginas cadastradas</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Ativos x Suspensos</div>
                  <div className="text-xl font-black text-emerald-400 tabular-nums">
                    {savedSites.filter(s => s.status === 'active').length} <span className="text-xs text-neutral-500 font-normal">/ {savedSites.filter(s => s.status === 'disabled').length} desativados</span>
                  </div>
                  <div className="text-[9px] text-neutral-500">Status em tempo real</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Taxa Média Conversão</div>
                  <div className="text-xl font-black text-emerald-300 tabular-nums flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    {(() => {
                      const totalClicks = savedSites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 0);
                      const totalViews = savedSites.reduce((acc, s) => acc + (s.pageViews || 100), 0);
                      return totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';
                    })()}%
                  </div>
                  <div className="text-[9px] text-neutral-500">Cliques WA / Acessos</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Total Leads WA</div>
                  <div className="text-xl font-black text-emerald-400 tabular-nums flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    {savedSites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 0)}
                  </div>
                  <div className="text-[9px] text-neutral-500">Contatos iniciados</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">Edições Este Mês</div>
                  <div className="text-xl font-black text-amber-300 tabular-nums">
                    {savedSites.reduce((acc, s) => acc + s.updatesThisMonth, 0)} <span className="text-xs text-neutral-500 font-normal">alterações</span>
                  </div>
                  <div className="text-[9px] text-neutral-500">Histórico de edições</div>
                </div>
              </div>

              {/* ============================================================== */}
              {/* 3. CARD DE CONFIGURAÇÃO PIX DO GESTOR SAAS (EXPANSÍVEL)       */}
              {/* ============================================================== */}
              <div className="rounded-xl bg-neutral-950 border border-emerald-500/30 overflow-hidden transition">
                <button
                  type="button"
                  onClick={() => setPixCardExpanded(p => !p)}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-900/50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                        Configuração do Gestor SaaS (Chave PIX & Tabela de Preços dos Microsites)
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {data.saasSettings?.pixKey
                          ? `PIX: ${data.saasSettings.pixKey} · Mensalidade Base: R$ ${(data.saasSettings?.defaultMonthlyFee || 149.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                          : `Mensalidade Base: R$ ${(data.saasSettings?.defaultMonthlyFee || 149.90).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} · Clique para configurar PIX e valores`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                      {pixCardExpanded ? 'Recolher' : 'Configurar'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${pixCardExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {pixCardExpanded && (
                  <div className="p-4 pt-1 border-t border-neutral-900 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Chave PIX (E-mail, CPF, CNPJ ou Aleatória)</label>
                        <input
                          type="text"
                          value={data.saasSettings?.pixKey || ''}
                          onChange={(e) => setData((p: any) => ({ ...p, saasSettings: { ...p.saasSettings, pixKey: e.target.value } }))}
                          placeholder="ex: contato@biovip.com.br"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Nome do Favorecido / Razão Social</label>
                        <input
                          type="text"
                          value={data.saasSettings?.pixName || ''}
                          onChange={(e) => setData((p: any) => ({ ...p, saasSettings: { ...p.saasSettings, pixName: e.target.value } }))}
                          placeholder="ex: Agência Digital BioVip"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Cidade do Banco</label>
                        <input
                          type="text"
                          value={data.saasSettings?.pixCity || ''}
                          onChange={(e) => setData((p: any) => ({ ...p, saasSettings: { ...p.saasSettings, pixCity: e.target.value } }))}
                          placeholder="ex: SAO PAULO"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Valor Padrão da Mensalidade (Novos Sites)</label>
                        <div className="relative">
                          <span className="text-xs text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 font-mono">R$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={data.saasSettings?.defaultMonthlyFee || 149.90}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              setData((p: any) => ({ ...p, saasSettings: { ...p.saasSettings, defaultMonthlyFee: isNaN(val) ? 149.90 : val } }));
                            }}
                            placeholder="149.90"
                            className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-emerald-300 font-mono font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Configuração Direta Asaas no Modo Editor */}
                    <div className="pt-3 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                      <div className="sm:col-span-6">
                        <label className="text-[10px] text-amber-400 font-mono uppercase font-bold block mb-1">
                          ⚡ Token de Acesso da API Asaas (access_token)
                        </label>
                        <input
                          type="password"
                          value={getActiveAsaasApiKey()}
                          onChange={(e) => updateAsaasSettings({ apiKey: e.target.value })}
                          placeholder="$aact_YTU5YTE0M2M6N2I4..."
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-amber-500/40 text-amber-300 font-mono"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[10px] text-neutral-400 font-mono uppercase block mb-1">
                          Ambiente Asaas
                        </label>
                        <select
                          value={getActiveAsaasEnv()}
                          onChange={(e) => updateAsaasSettings({ environment: e.target.value as 'sandbox' | 'production' })}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold cursor-pointer"
                        >
                          <option value="sandbox">🧪 Sandbox</option>
                          <option value="production">🚀 Produção</option>
                        </select>
                      </div>
                      <div className="sm:col-span-3">
                        <button
                          type="button"
                          disabled={asaasStatusTesting}
                          onClick={handleTestAsaasConnection}
                          className="w-full py-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${asaasStatusTesting ? 'animate-spin' : ''}`} />
                          <span>{asaasStatusTesting ? 'Testando...' : 'Testar Asaas'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ============================================================== */}
              {/* 3.5 CENTRAL DE COMUNICADOS & DISPARO DE E-MAIL EM MASSA (ADM)  */}
              {/* ============================================================== */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-neutral-950 via-neutral-900/90 to-neutral-950 border border-amber-500/30 space-y-3 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                          Central de E-mail em Massa (Manutenções & Comunicados Oficiais)
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {savedSites.filter(s => s.clientEmail && isValidClientEmail(s.clientEmail)).length} de {savedSites.length} clientes com e-mail ativo
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Envie comunicados em massa para todos os clientes informando sobre manutenções programadas nos servidores, atualizações de DNS/SSL ou avisos relevantes.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openBulkEmailModal('scheduled_maintenance', 'all')}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs flex items-center gap-2 shadow-md shadow-amber-500/10 cursor-pointer transition shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Disparar E-mail em Massa</span>
                  </button>
                </div>

                {/* Atalhos Rápidos de Modelos de Comunicado */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => openBulkEmailModal('scheduled_maintenance', 'all')}
                    className="p-2.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-left transition cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold text-amber-300 group-hover:text-amber-200 flex items-center gap-1">
                      🛠️ Manutenção Programada
                    </span>
                    <span className="text-[9.5px] text-neutral-400 block mt-0.5">
                      Avisar janela de atualização de servidor e SSL
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openBulkEmailModal('maintenance_completed', 'all')}
                    className="p-2.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-500/40 text-left transition cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold text-emerald-300 group-hover:text-emerald-200 flex items-center gap-1">
                      ✅ Manutenção Concluída
                    </span>
                    <span className="text-[9.5px] text-neutral-400 block mt-0.5">
                      Confirmar estabilidade e melhorias aplicadas
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openBulkEmailModal('new_features', 'all')}
                    className="p-2.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-left transition cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold text-amber-300 group-hover:text-amber-200 flex items-center gap-1">
                      ✨ Novidades & Recursos
                    </span>
                    <span className="text-[9.5px] text-neutral-400 block mt-0.5">
                      Divulgar novas funções liberadas nos microsites
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openBulkEmailModal('custom_announcement', 'all')}
                    className="p-2.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 text-left transition cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold text-neutral-200 group-hover:text-white flex items-center gap-1">
                      ✍️ Comunicado Livre
                    </span>
                    <span className="text-[9.5px] text-neutral-400 block mt-0.5">
                      Escrever aviso personalizado para os clientes
                    </span>
                  </button>
                </div>

                {bulkEmailHistory.length > 0 && (
                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10.5px] text-neutral-400 flex-wrap gap-2">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Último disparo em massa: <strong className="text-neutral-200">{bulkEmailHistory[0].subject}</strong> ({bulkEmailHistory[0].recipientCount} destinatários em {bulkEmailHistory[0].sentAt})
                    </span>
                    <button
                      type="button"
                      onClick={() => openBulkEmailModal('scheduled_maintenance', 'all')}
                      className="text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                    >
                      Ver histórico ({bulkEmailHistory.length})
                    </button>
                  </div>
                )}
              </div>

              {/* ============================================================== */}
              {/* 3.8 REGRAS DE MANUTENÇÃO, 1º MÊS & DESATIVAÇÃO AUTOMÁTICA (7º DIA) */}
              {/* ============================================================== */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-emerald-500/30 space-y-3 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                          Regras Automáticas de Manutenção, 1º Mês & Desativação no 7º Dia de Atraso
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1">
                          <Power className="w-2.5 h-2.5" /> Suspensão Automática Ativa (&ge; 7 dias)
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        A taxa de criação é cobrada exclusivamente no 1º mês (isento de mensalidade). A partir do 7º dia de atraso após o vencimento, o microsite é desativado automaticamente.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={runAutoOverdueSweepNow}
                    className="px-3.5 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-200 font-bold text-[11px] flex items-center gap-1.5 border border-red-500/40 cursor-pointer transition shrink-0"
                    title="Verificar todos os vencimentos agora e aplicar a regra de desativação automática a partir do 7º dia de atraso"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-red-400" />
                    <span>Verificar Atrasos (&ge; 7º Dia)</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[10.5px]">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                    <span className="font-bold text-amber-300 block">🎨 1º Mês (Criação)</span>
                    <input
                      type="text"
                      value={landingConfig.pricePro || 'R$ 79,90'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLandingConfig((prev: any) => {
                          const updated = { ...prev, priceEssential: val, pricePro: val, priceScale: val };
                          persistLandingConfigEverywhere(updated);
                          return updated;
                        });
                      }}
                      className="w-full px-1.5 py-0.5 rounded bg-neutral-950 border border-amber-500/40 text-amber-300 font-mono font-bold text-[10.5px] focus:border-amber-300 focus:outline-none"
                      title="Valor da taxa de criação no 1º mês"
                    />
                    <span className="text-[9.5px] text-neutral-400 block">Sem mensalidade no 1º mês</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5">
                    <span className="font-bold text-emerald-300 block">🛠️ Plano Básico</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[9.5px] text-neutral-400">R$</span>
                      <input
                        type="text"
                        value={landingConfig.recurringBasic ?? '29,90'}
                        onChange={(e) => updateLandingConfig('recurringBasic', e.target.value)}
                        className="w-full px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-emerald-300 font-mono font-bold text-[10.5px] focus:border-emerald-400 focus:outline-none"
                        title="Valor da recorrência mensal do Plano Básico"
                      />
                      <span className="text-[9px] text-neutral-500">/mês</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-neutral-400 shrink-0">Alt.:</span>
                      <input
                        type="text"
                        value={landingConfig.updatesBasic ?? '1'}
                        onChange={(e) => updateLandingConfig('updatesBasic', e.target.value)}
                        className="w-full px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono text-[10px] focus:border-amber-400 focus:outline-none"
                        title="Quantidade de alterações mensais oferecidas no Plano Básico"
                      />
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-amber-400/30 space-y-1.5">
                    <span className="font-bold text-amber-300 block">⚡ Plano Pro</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[9.5px] text-neutral-400">R$</span>
                      <input
                        type="text"
                        value={landingConfig.recurringPro ?? '49,90'}
                        onChange={(e) => updateLandingConfig('recurringPro', e.target.value)}
                        className="w-full px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-emerald-300 font-mono font-bold text-[10.5px] focus:border-emerald-400 focus:outline-none"
                        title="Valor da recorrência mensal do Plano Pro"
                      />
                      <span className="text-[9px] text-neutral-500">/mês</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-neutral-400 shrink-0">Alt.:</span>
                      <input
                        type="text"
                        value={landingConfig.updatesPro ?? '4'}
                        onChange={(e) => updateLandingConfig('updatesPro', e.target.value)}
                        className="w-full px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono text-[10px] focus:border-amber-400 focus:outline-none"
                        title="Quantidade de alterações mensais oferecidas no Plano Pro"
                      />
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5">
                    <span className="font-bold text-amber-300 block">👑 Plano VIP</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[9.5px] text-neutral-400">R$</span>
                      <input
                        type="text"
                        value={landingConfig.recurringVip ?? '79,90'}
                        onChange={(e) => updateLandingConfig('recurringVip', e.target.value)}
                        className="w-full px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-emerald-300 font-mono font-bold text-[10.5px] focus:border-emerald-400 focus:outline-none"
                        title="Valor da recorrência mensal do Plano VIP"
                      />
                      <span className="text-[9px] text-neutral-500">/mês</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-neutral-400 shrink-0">Alt.:</span>
                      <input
                        type="text"
                        value={landingConfig.updatesVip ?? 'Ilimitadas'}
                        onChange={(e) => updateLandingConfig('updatesVip', e.target.value)}
                        className="w-full px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono text-[10px] focus:border-amber-400 focus:outline-none"
                        title="Quantidade de alterações mensais oferecidas no Plano VIP"
                      />
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                    <span className="font-bold text-neutral-200 block">➕ Alteração Adicional</span>
                    <span className="text-amber-300 font-bold block mt-0.5">R$ 14,90 / extra</span>
                    <span className="text-[9.5px] text-neutral-400 block">Acima da franquia mensal</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30">
                    <span className="font-bold text-red-300 block">🛑 Atraso &ge; 7º Dia</span>
                    <span className="text-neutral-100 font-semibold block mt-0.5">Desativação Automática</span>
                    <span className="text-[9.5px] text-red-200/80 block">1º ao 6º dia: em tolerância</span>
                  </div>
                </div>
              </div>

              {/* ============================================================== */}
              {/* 4. CONTROLES PRINCIPAIS & SISTEMA DE BUSCA POR DATA DE VENCIMENTO */}
              {/* ============================================================== */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                {/* Header Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-900">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
                      <Server className="w-4 h-4 text-amber-400" /> Painel de Gestão dos Microsites Criados
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Controle de mensalidades, e-mails obrigatórios, envio de kit p/ WhatsApp com tutorial da Bio e desativação automática a partir do 7º dia de atraso.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => openBulkEmailModal('scheduled_maintenance', 'all')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/40 transition cursor-pointer shadow"
                      title="Enviar e-mail em massa para todos os clientes sobre manutenções ou comunicados"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-400" /> E-mail em Massa
                    </button>

                    <button
                      type="button"
                      onClick={downloadAllSitesDirectoryZip}
                      className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-emerald-300 font-bold text-xs flex items-center gap-1.5 border border-emerald-500/30 hover:border-emerald-400 transition cursor-pointer shadow"
                      title="Baixar pacote completo com todas as pastas independentes dos clientes organizadas para o servidor"
                    >
                      <FolderArchive className="w-3.5 h-3.5 text-emerald-400" /> ZIP Servidor Multi-Pastas
                    </button>

                    <button
                      type="button"
                      onClick={() => setPdfReportModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
                      title="Gerar e exportar relatório mensal de faturamento e performance em PDF"
                    >
                      <FileText className="w-3.5 h-3.5" /> Relatório PDF Executivo
                    </button>

                    <button
                      type="button"
                      onClick={() => openResetTrackingModal('all')}
                      className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/15 text-red-300 font-bold text-xs flex items-center gap-1.5 border border-red-500/30 hover:border-red-400 transition cursor-pointer shadow"
                      title="Zerar cliques e estatísticas de rastreamento de todos os microsites do painel"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-red-400" /> Zerar Rastreamento Geral
                    </button>

                    <button
                      type="button"
                      onClick={openSaveDialog}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Cadastrar Novo Cliente
                    </button>
                  </div>
                </div>

                {/* FILTROS AVANÇADOS: BUSCA TEXTUAL + BUSCA POR DATA EXATA + ORDENAÇÃO */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  {/* Busca Textual */}
                  <div className="sm:col-span-5 relative">
                    <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Buscar por cliente, e-mail, domínio ou nicho..."
                      value={dashboardSearch}
                      onChange={(e) => setDashboardSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                    {dashboardSearch && (
                      <button
                        type="button"
                        onClick={() => setDashboardSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Busca por Data de Vencimento Específica */}
                  <div className="sm:col-span-4 relative flex items-center">
                    <div className="w-full relative">
                      <CalendarClock className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        value={dashboardDueDateExact}
                        onChange={(e) => {
                          setDashboardDueDateExact(e.target.value);
                          if (e.target.value) {
                            setDashboardDueDateFilter('custom');
                          }
                        }}
                        className="w-full pl-8 pr-8 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono focus:outline-none focus:border-amber-400 cursor-pointer"
                        title="Buscar clientes com vencimento em uma data específica"
                      />
                      {dashboardDueDateExact && (
                        <button
                          type="button"
                          onClick={() => {
                            setDashboardDueDateExact('');
                            setDashboardDueDateFilter('all');
                          }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 text-xs cursor-pointer"
                          title="Limpar busca por data"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Ordenação */}
                  <div className="sm:col-span-3">
                    <select
                      value={dashboardSortBy}
                      onChange={(e) => setDashboardSortBy(e.target.value as any)}
                      className="w-full px-2.5 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-medium focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="dueDate_asc">⏳ Vencimento (Mais Próximos)</option>
                      <option value="dueDate_desc">📅 Vencimento (Mais Distantes)</option>
                      <option value="fee_desc">💰 Maior Mensalidade (MRR)</option>
                      <option value="rate_desc">📈 Maior Taxa de Conversão</option>
                      <option value="name_asc">🔤 Nome do Cliente (A-Z)</option>
                    </select>
                  </div>
                </div>

                {/* FILTROS RÁPIDOS DE VENCIMENTO (PERÍODOS) */}
                <div className="space-y-2 pt-1 border-t border-neutral-900">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-400" /> Filtrar por Período de Vencimento:
                    </span>
                    {(dashboardDueDateFilter !== 'all' || dashboardDueDateExact || dashboardStatusFilter !== 'all' || dashboardSearch) && (
                      <button
                        type="button"
                        onClick={() => {
                          setDashboardDueDateFilter('all');
                          setDashboardDueDateExact('');
                          setDashboardStatusFilter('all');
                          setDashboardSearch('');
                        }}
                        className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline"
                      >
                        Limpar todos os filtros
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(() => {
                      const overdueCount = savedSites.filter(s => !isSiteSuspendedStatus(s) && isSiteOverdueStatus(s)).length;
                      const todayCount = savedSites.filter(s => getDaysUntilDue(s.dueDate) === 0).length;
                      const next7DaysCount = savedSites.filter(s => {
                        const d = getDaysUntilDue(s.dueDate);
                        return d >= 0 && d <= 7;
                      }).length;
                      const next15DaysCount = savedSites.filter(s => {
                        const d = getDaysUntilDue(s.dueDate);
                        return d >= 0 && d <= 15;
                      }).length;
                      const currentMonthPrefix = new Date().toISOString().substring(0, 7);
                      const thisMonthCount = savedSites.filter(s => (s.dueDate || '').startsWith(currentMonthPrefix)).length;

                      const periods = [
                        { id: 'all', label: 'Todos os Vencimentos', count: savedSites.length, color: 'neutral' },
                        { id: 'overdue', label: '🚨 Vencidos / Atrasados', count: overdueCount, color: 'red' },
                        { id: 'today', label: '⚡ Vencem Hoje', count: todayCount, color: 'amber' },
                        { id: '7days', label: '🗓️ Próximos 7 Dias', count: next7DaysCount, color: 'amber' },
                        { id: '15days', label: '📅 Próximos 15 Dias', count: next15DaysCount, color: 'neutral' },
                        { id: 'this_month', label: '🗓️ Este Mês', count: thisMonthCount, color: 'neutral' },
                      ];

                      return periods.map(p => {
                        const isSelected = dashboardDueDateFilter === p.id && !dashboardDueDateExact;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setDashboardDueDateFilter(p.id as any);
                              setDashboardDueDateExact('');
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition cursor-pointer flex items-center gap-1.5 border ${
                              isSelected
                                ? p.color === 'red'
                                  ? 'bg-red-500 text-neutral-950 border-red-400 font-bold shadow'
                                  : p.color === 'amber'
                                  ? 'bg-amber-400 text-neutral-950 border-amber-300 font-bold shadow'
                                  : 'bg-emerald-400 text-neutral-950 border-emerald-300 font-bold shadow'
                                : p.color === 'red' && p.count > 0
                                ? 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                                : p.color === 'amber' && p.count > 0
                                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                            }`}
                          >
                            <span>{p.label}</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                              isSelected ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
                            }`}>
                              {p.count}
                            </span>
                          </button>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* FILTROS POR STATUS DE CLIENTE (RÉGUA PROGRESSIVA) */}
                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800 shrink-0 overflow-x-auto max-w-full">
                  <span className="text-[10px] text-neutral-500 font-semibold px-2">Status:</span>
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'landing', label: '⭐ Modelos (Sem Faturamento)' },
                    { id: 'active', label: '🟢 Pago / Em dia' },
                    { id: 'overdue', label: '🟡 Pendente / Atrasado D+3' },
                    { id: 'disabled', label: '🛑 Suspenso D+7 (Manutenção)' },
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setDashboardStatusFilter(f.id)}
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold transition cursor-pointer ${
                        dashboardStatusFilter === f.id
                          ? 'bg-amber-400 text-neutral-950 shadow'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* ============================================================== */}
                {/* 5. LISTA DE CLIENTES FILTRADOS & ORDENADOS                     */}
                {/* ============================================================== */}
                {(() => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const currentMonthPrefix = today.toISOString().substring(0, 7);

                  const filteredList = savedSites
                    .filter(site => {
                      // 1. Text Search (inclui busca por e-mail também)
                      const matchesSearch =
                        !dashboardSearch ||
                        site.clientName.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        (site.clientEmail || '').toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        site.subdomain.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        site.customDomain.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
                        site.nicheCategory.toLowerCase().includes(dashboardSearch.toLowerCase());

                      // 2. Status Filter (compatível com 'pago' | 'pendente' | 'atrasado_d3' | 'suspenso_d7' e legados)
                      const isModel = isModelMicrosite(site);
                      const suspended = !isModel && isSiteSuspendedStatus(site);
                      const overdue = !isModel && isSiteOverdueStatus(site);
                      const matchesStatus =
                        dashboardStatusFilter === 'all' ||
                        (dashboardStatusFilter === 'landing' && isModel) ||
                        (dashboardStatusFilter === 'active' && !isModel && !suspended && !overdue) ||
                        (dashboardStatusFilter === 'overdue' && !isModel && overdue) ||
                        (dashboardStatusFilter === 'disabled' && !isModel && suspended);

                      // 3. Exact Date Filter (if set)
                      const matchesExactDate = !dashboardDueDateExact || site.dueDate === dashboardDueDateExact;

                      // 4. Quick Period Due Date Filter
                      const days = getDaysUntilDue(site.dueDate);
                      let matchesDueDate = true;
                      if (dashboardDueDateExact) {
                        matchesDueDate = matchesExactDate;
                      } else if (dashboardDueDateFilter === 'today') {
                        matchesDueDate = !isModel && days === 0;
                      } else if (dashboardDueDateFilter === '7days') {
                        matchesDueDate = !isModel && days >= 0 && days <= 7;
                      } else if (dashboardDueDateFilter === '15days') {
                        matchesDueDate = !isModel && days >= 0 && days <= 15;
                      } else if (dashboardDueDateFilter === 'this_month') {
                        matchesDueDate = !isModel && (site.dueDate || '').startsWith(currentMonthPrefix);
                      } else if (dashboardDueDateFilter === 'overdue') {
                        matchesDueDate = !isModel && days < 0 && !suspended;
                      }

                      return matchesSearch && matchesStatus && matchesDueDate;
                    })
                    .sort((a, b) => {
                      if (dashboardSortBy === 'dueDate_asc') {
                        return (a.dueDate || '').localeCompare(b.dueDate || '');
                      }
                      if (dashboardSortBy === 'dueDate_desc') {
                        return (b.dueDate || '').localeCompare(a.dueDate || '');
                      }
                      if (dashboardSortBy === 'fee_desc') {
                        return (b.monthlyFee || 0) - (a.monthlyFee || 0);
                      }
                      if (dashboardSortBy === 'rate_desc') {
                        const rateA = (a.whatsappClicks || 0) / (a.pageViews || 1);
                        const rateB = (b.whatsappClicks || 0) / (b.pageViews || 1);
                        return rateB - rateA;
                      }
                      if (dashboardSortBy === 'name_asc') {
                        return a.clientName.localeCompare(b.clientName);
                      }
                      return 0;
                    });

                  const filteredTotalFee = filteredList.reduce(
                    (acc, s) => acc + (!isModelMicrosite(s) && !isSiteSuspendedStatus(s) ? (s.monthlyFee || 0) : 0),
                    0
                  );

                  return (
                    <div className="space-y-3">
                      {/* Sub-header with result count and filtered MRR */}
                      <div className="flex items-center justify-between text-xs text-neutral-400 px-1 pt-1">
                        <span>
                          Mostrando <strong className="text-neutral-100 font-mono">{filteredList.length}</strong> de{' '}
                          <strong className="text-neutral-100 font-mono">{savedSites.length}</strong> cliente(s)
                          {dashboardDueDateExact && (
                            <span className="text-amber-400 ml-1">com vencimento em {dashboardDueDateExact.split('-').reverse().join('/')}</span>
                          )}
                        </span>
                        <span className="text-[11px] font-mono">
                          MRR Selecionado: <strong className="text-emerald-400 font-bold">R$ {filteredTotalFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                        </span>
                      </div>

                      {filteredList.length === 0 ? (
                        <div className="p-8 text-center rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                          <CalendarClock className="w-8 h-8 text-neutral-600 mx-auto" />
                          <p className="text-sm font-semibold text-neutral-300">Nenhum cliente encontrado com os filtros selecionados.</p>
                          <p className="text-xs text-neutral-500">Tente buscar por outra data de vencimento ou limpar os termos da pesquisa.</p>
                          <button
                            type="button"
                            onClick={() => {
                              setDashboardDueDateFilter('all');
                              setDashboardDueDateExact('');
                              setDashboardStatusFilter('all');
                              setDashboardSearch('');
                            }}
                            className="mt-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-semibold cursor-pointer"
                          >
                            Redefinir Filtros
                          </button>
                        </div>
                      ) : (
                        filteredList.map(site => {
                          const daysDiff = getDaysUntilDue(site.dueDate);
                          const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : (site.daysOverdue || 0);
                          const isSuspended = isSiteSuspendedStatus(site);
                          const isOverdue = !isSuspended && (daysDiff < 0 || site.status === 'overdue' || site.status === 'atrasado_d3');
                          const isEditsBlocked = isSiteEditsLocked(site, daysOverdue);
                          const linkStatus: 'ativo' | 'manutencao' = isSuspended ? 'manutencao' : (site.linkStatus || 'ativo');
                          const isDueToday = daysDiff === 0;
                          const isDueSoon = daysDiff > 0 && daysDiff <= 7;
                          const currentFullDomain = site.customDomain || `biovip.com.br/${site.subdomain}`;
                          const clicks = site.whatsappClicks || 0;
                          const views = site.pageViews || 100;
                          const rate = Number(((clicks / views) * 100).toFixed(1));
                          const isHighRate = rate >= 15;
                          const isMedRate = rate >= 8;

                          // Format due date in DD/MM/AAAA
                          const dateParts = (site.dueDate || '').split('-');
                          const formattedDueDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : site.dueDate;

                          return (
                            <div
                              key={site.id}
                              className={`p-4 rounded-xl border transition space-y-3 relative ${
                                isSuspended
                                  ? 'bg-neutral-950/60 border-red-900/50 opacity-85'
                                  : isOverdue
                                  ? 'bg-red-500/5 border-red-500/40 shadow-sm shadow-red-500/10'
                                  : isDueToday
                                  ? 'bg-amber-500/10 border-amber-400 shadow-sm shadow-amber-500/20'
                                  : isDueSoon
                                  ? 'bg-amber-500/5 border-amber-500/30'
                                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-neutral-900">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-xs text-neutral-100">{site.clientName}</span>
                                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-neutral-900 text-neutral-400 border border-neutral-800">
                                      {site.nicheCategory}
                                    </span>
                                    {isModelMicrosite(site) && (
                                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                        Modelo (Fora do Faturamento)
                                      </span>
                                    )}
                                    {editingSiteId === site.id && (
                                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                        Em Edição
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 flex-wrap">
                                    <span className="flex items-center gap-1 text-amber-400/90 font-mono">
                                      <Globe className="w-3 h-3" />
                                      https://{currentFullDomain}
                                    </span>
                                    <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px] bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800" title="Diretório independente exclusivo deste microsite no servidor de hospedagem">
                                      <Folder className="w-3 h-3 text-amber-400" />
                                      /public_html/{site.subdomain}/
                                    </span>
                                    {site.clientPhone && (
                                      <span>· WA: {site.clientPhone}</span>
                                    )}
                                    {editingEmailSiteId === site.id ? (
                                      <span className="inline-flex items-center gap-1 bg-neutral-900 px-2 py-0.5 rounded border border-amber-500/50">
                                        <Mail className="w-3 h-3 text-amber-400" />
                                        <input
                                          type="email"
                                          value={tempEmailInput}
                                          onChange={(e) => setTempEmailInput(e.target.value)}
                                          placeholder="cliente@email.com"
                                          className="bg-transparent text-[11px] text-amber-200 font-mono focus:outline-none w-44"
                                          autoFocus
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (updateSiteClientEmail(site.id, tempEmailInput)) {
                                              setEditingEmailSiteId(null);
                                            }
                                          }}
                                          className="text-emerald-400 hover:text-emerald-300 font-bold text-[10px] px-1 cursor-pointer"
                                        >
                                          ✓
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setEditingEmailSiteId(null)}
                                          className="text-neutral-500 hover:text-neutral-300 text-[10px] px-1 cursor-pointer"
                                        >
                                          ✕
                                        </button>
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-neutral-300 font-mono text-[10.5px]">
                                        <Mail className="w-3 h-3 text-amber-400" />
                                        {site.clientEmail ? (
                                          <span>{site.clientEmail}</span>
                                        ) : (
                                          <span className="text-red-400 font-sans font-semibold">Sem e-mail cadastrado</span>
                                        )}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingEmailSiteId(site.id);
                                            setTempEmailInput(site.clientEmail || '');
                                          }}
                                          className="text-[9.5px] text-amber-400 hover:text-amber-300 underline ml-1 font-sans cursor-pointer"
                                          title="Editar e-mail do cliente"
                                        >
                                          (editar)
                                        </button>
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Status, Edit-Lock Badge & Due Urgency Badges */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  {(() => {
                                    const billingInfo = getSiteBillingSummary(site);
                                    const remainingDaysToAutoDisable = Math.max(0, AUTO_DISABLE_OVERDUE_DAYS - daysOverdue);

                                    return (
                                      <>
                                        {/* BADGE VISUAL DE EDIÇÕES LIBERADAS / BLOQUEADAS POR INADIMPLÊNCIA */}
                                        <button
                                          type="button"
                                          onClick={() => toggleSiteEditsLock(site.id)}
                                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border cursor-pointer transition ${
                                            isEditsBlocked
                                              ? 'bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30'
                                              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                                          }`}
                                          title={
                                            isEditsBlocked
                                              ? 'Edições bloqueadas por inadimplência (Atraso >= 3 dias). Clique para liberar manualmente se necessário.'
                                              : 'Edições liberadas para este assinante. Clique para bloquear manualmente.'
                                          }
                                        >
                                          <Lock className={`w-3 h-3 ${isEditsBlocked ? 'text-red-400' : 'text-emerald-400'}`} />
                                          <span>
                                            {isEditsBlocked
                                              ? '🔒 Edições Bloqueadas (Inadimplência)'
                                              : '🔓 Edições Liberadas'}
                                          </span>
                                        </button>

                                        {/* BADGE DE STATUS DO LINK PÚBLICO (ATIVO vs MODO MANUTENÇÃO) */}
                                        <span
                                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border ${
                                            linkStatus === 'manutencao'
                                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                              : 'bg-neutral-900 text-emerald-300 border-emerald-500/30'
                                          }`}
                                          title={`Status do link público: ${linkStatus === 'manutencao' ? 'Modo Manutenção (Tela Neutra)' : 'Ativo'}`}
                                        >
                                          <Globe className={`w-3 h-3 ${linkStatus === 'manutencao' ? 'text-amber-400' : 'text-emerald-400'}`} />
                                          <span>
                                            {linkStatus === 'manutencao' ? '🛠️ Link: Modo Manutenção' : '🟢 Link: Ativo'}
                                          </span>
                                        </span>

                                        {/* Ciclo 1º Mês Badge */}
                                        <button
                                          type="button"
                                          onClick={() => toggleSiteFirstMonth(site.id)}
                                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border cursor-pointer transition ${
                                            billingInfo.isFirstMonth
                                              ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                                              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                                          }`}
                                          title="Alternar entre 1º Mês (cobra apenas Taxa de Criação, sem mensalidade) e Ciclo Mensal Normal (cobra Taxa de Manutenção)"
                                        >
                                          <Sparkles className="w-3 h-3 text-amber-400" />
                                          <span>
                                            {billingInfo.isFirstMonth
                                              ? `1º Mês: Só Criação (R$ ${billingInfo.creationFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} • R$ 0 Mensalidade)`
                                              : `Ciclo Mensal (${billingInfo.plan.shortName})`}
                                          </span>
                                        </button>

                                        {/* Dynamic Progressive Delinquency Badge (Pago / Pendente / Atrasado D+3 / Suspenso D+7) */}
                                        {isSuspended ? (
                                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1">
                                            <Power className="w-3 h-3 text-red-400" />
                                            {daysOverdue >= AUTO_DISABLE_OVERDUE_DAYS || site.autoDisabledByOverdue
                                              ? `🛑 Suspenso D+7 (${daysOverdue}d de atraso)`
                                              : '🛠️ Suspenso (Modo Manutenção)'}
                                          </span>
                                        ) : daysOverdue >= 3 || site.status === 'atrasado_d3' ? (
                                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1 animate-pulse">
                                            <AlertTriangle className="w-3 h-3 text-red-400" />
                                            🚨 Atrasado D+3 ({daysOverdue}d) • Suspende em {remainingDaysToAutoDisable}d
                                          </span>
                                        ) : isOverdue ? (
                                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                                            🟡 Pendente ({daysOverdue}d atraso) • Bloqueia edições em {Math.max(0, 3 - daysOverdue)}d
                                          </span>
                                        ) : isDueToday ? (
                                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-400 text-neutral-950 border border-amber-300 flex items-center gap-1 shadow-sm">
                                            <AlertCircle className="w-3 h-3 text-neutral-950" />
                                            ⚡ VENCE HOJE (D-0)
                                          </span>
                                        ) : daysDiff <= 3 ? (
                                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-amber-400" />
                                            D-3 • Vence em {daysDiff} dia{daysDiff > 1 ? 's' : ''}
                                          </span>
                                        ) : daysDiff <= 7 ? (
                                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                                            <CalendarClock className="w-3 h-3 text-amber-400" />
                                            Vence em {daysDiff} dias
                                          </span>
                                        ) : (
                                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                            Pago / Em Dia (em {daysDiff} dias)
                                          </span>
                                        )}
                                      </>
                                    );
                                  })()}

                                  {/* Conversion Rate Badge */}
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border ${
                                      isHighRate
                                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                        : isMedRate
                                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                        : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                                    }`}
                                    title={`${clicks} cliques de WhatsApp em ${views} visualizações de página`}
                                  >
                                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                                    <span>{rate}% Conversão</span>
                                  </span>
                                </div>
                              </div>

                              {/* Data Row: Vencimento (com Regra 7º Dia) + Plano de Manutenção + Alterações no Mês (+R$ 14,90 extra) + Valor & Total do Ciclo */}
                              {(() => {
                                const billing = getSiteBillingSummary(site);

                                return (
                                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-neutral-900/60 p-3 rounded-lg border border-neutral-800/80">
                                    {/* 1. Data de Vencimento & Régua Progressiva D+3 / D+7 */}
                                    <div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-neutral-400 block font-medium">Data de Vencimento</span>
                                        {editingDueDateSiteId !== site.id && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setEditingDueDateSiteId(site.id);
                                              setTempDueDateInput(site.dueDate);
                                            }}
                                            className="text-[9.5px] text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                                            title="Alterar data de vencimento (aplica automaticamente a Régua D+3 e D+7)"
                                          >
                                            Alterar data
                                          </button>
                                        )}
                                      </div>

                                      {editingDueDateSiteId === site.id ? (
                                        <div className="flex items-center gap-1 mt-1">
                                          <input
                                            type="date"
                                            value={tempDueDateInput}
                                            onChange={(e) => setTempDueDateInput(e.target.value)}
                                            className="px-2 py-0.5 text-[11px] bg-neutral-950 rounded border border-amber-500 text-amber-200 font-mono focus:outline-none"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              updateSiteDueDate(site.id, tempDueDateInput);
                                              setEditingDueDateSiteId(null);
                                            }}
                                            className="px-2 py-0.5 rounded bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-[10px] font-bold cursor-pointer"
                                          >
                                            ✓
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setEditingDueDateSiteId(null)}
                                            className="px-1.5 py-0.5 rounded text-neutral-400 hover:text-neutral-200 text-[10px] cursor-pointer"
                                          >
                                            ✕
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-0.5 space-y-0.5">
                                          <div className="flex items-center gap-1.5">
                                            <CalendarClock className={`w-3.5 h-3.5 ${isSuspended || isOverdue ? 'text-red-400' : isDueToday ? 'text-amber-400' : 'text-emerald-400'}`} />
                                            <span className={`font-mono font-bold ${isSuspended || isOverdue ? 'text-red-400' : isDueToday ? 'text-amber-300' : 'text-neutral-200'}`}>
                                              {formattedDueDate}
                                            </span>
                                            <span className="text-[10px] text-neutral-500">
                                              ({daysDiff < 0 ? `há ${daysOverdue}d` : isDueToday ? 'hoje' : `em ${daysDiff}d`})
                                            </span>
                                          </div>
                                          <span className="text-[9.5px] text-neutral-400 block">
                                            {daysOverdue >= AUTO_DISABLE_OVERDUE_DAYS
                                              ? `🛑 D+7: Modo Manutenção ativo (${daysOverdue}d atraso)`
                                              : daysOverdue >= 3
                                              ? `🔒 D+3: Edições bloqueadas · Suspende em ${AUTO_DISABLE_OVERDUE_DAYS - daysOverdue}d`
                                              : daysOverdue > 0
                                              ? `⏳ Atraso leve (${daysOverdue}d) · Bloqueia edições no 3º dia`
                                              : '🛡️ Régua ativa: D+3 bloqueia edições · D+7 manutenção'}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    {/* 2. Plano de Taxa de Manutenção (29,90 / 49,90 / 79,90) */}
                                    <div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-neutral-400 block font-medium">Plano de Manutenção</span>
                                        <span className="text-[9.5px] text-emerald-400 font-mono font-bold">
                                          R$ {billing.maintenanceFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                                        </span>
                                      </div>
                                      <select
                                        value={billing.planKey}
                                        onChange={(e) => updateSiteMaintenancePlan(site.id, e.target.value as MaintenancePlanId)}
                                        className="mt-1 w-full px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-200 font-semibold focus:outline-none focus:border-amber-400 cursor-pointer"
                                      >
                                        <option value="basic_1">R$ {MAINTENANCE_PLANS.basic_1.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês — {formatPlanUpdatesLabel(MAINTENANCE_PLANS.basic_1.maxUpdates, false)}</option>
                                        <option value="pro_4">R$ {MAINTENANCE_PLANS.pro_4.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês — {formatPlanUpdatesLabel(MAINTENANCE_PLANS.pro_4.maxUpdates, false)}</option>
                                        <option value="vip_unlimited">R$ {MAINTENANCE_PLANS.vip_unlimited.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês — {formatPlanUpdatesLabel(MAINTENANCE_PLANS.vip_unlimited.maxUpdates, false)}</option>
                                      </select>
                                    </div>

                                    {/* 3. Alterações no Mês & Cálculo Automático de Extras (R$ 14,90) */}
                                    <div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-neutral-400 block font-medium">
                                          Alterações no Mês (Franquia: {billing.includedUpdatesLabel})
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between gap-2 mt-1">
                                        <div className="flex items-center gap-1.5">
                                          <button
                                            type="button"
                                            onClick={() => adjustSiteUpdatesCount(site.id, -1)}
                                            className="w-5 h-5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs flex items-center justify-center cursor-pointer border border-neutral-700"
                                            title="Diminuir contador de alterações do mês"
                                          >
                                            -
                                          </button>
                                          <span className="font-mono font-bold text-neutral-100 px-1">
                                            {billing.updatesUsed}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => adjustSiteUpdatesCount(site.id, 1)}
                                            className="w-5 h-5 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs flex items-center justify-center cursor-pointer border border-neutral-700"
                                            title="Registrar +1 alteração solicitada pelo cliente neste mês"
                                          >
                                            +
                                          </button>
                                        </div>

                                        {isEditsBlocked ? (
                                          <span className="px-1.5 py-0.5 rounded bg-red-500/15 border border-red-500/40 text-red-300 font-mono text-[10px] font-bold">
                                            🔒 Bloqueadas
                                          </span>
                                        ) : billing.extraUpdatesCount > 0 ? (
                                          <span className="px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                                            +{billing.extraUpdatesCount} extra (+R$ {billing.extraUpdatesCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                                          </span>
                                        ) : (
                                          <span className="text-[10px] text-emerald-400 font-medium">
                                            Dentro do plano
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* 4. Valor Cobrado no Ciclo (1º Mês Só Criação vs Mensalidade + Extras) */}
                                    <div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-neutral-400 block font-medium">
                                          {billing.isFirstMonth ? '1º Mês (Só Taxa de Criação)' : 'Total da Fatura no Mês'}
                                        </span>
                                        {editingFeeSiteId !== site.id && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setEditingFeeSiteId(site.id);
                                              setTempFeeInput(site.monthlyFee.toString());
                                            }}
                                            className="text-[9.5px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline flex items-center gap-0.5"
                                            title="Alterar valor personalizado da taxa de manutenção"
                                          >
                                            <Edit3 className="w-2.5 h-2.5" /> Editar valor
                                          </button>
                                        )}
                                      </div>
                                      {editingFeeSiteId === site.id ? (
                                        <div className="flex items-center gap-1 mt-1">
                                          <span className="text-[10px] text-neutral-400 font-mono">R$</span>
                                          <input
                                            type="number"
                                            step="0.01"
                                            value={tempFeeInput}
                                            onChange={(e) => setTempFeeInput(e.target.value)}
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                const num = parseFloat(tempFeeInput);
                                                if (!isNaN(num) && num >= 0) {
                                                  updateSiteMonthlyFee(site.id, num);
                                                }
                                                setEditingFeeSiteId(null);
                                              } else if (e.key === 'Escape') {
                                                setEditingFeeSiteId(null);
                                              }
                                            }}
                                            className="w-20 px-1.5 py-0.5 text-xs bg-neutral-950 rounded border border-amber-500 text-amber-300 font-bold font-mono focus:outline-none"
                                            autoFocus
                                          />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const num = parseFloat(tempFeeInput);
                                              if (!isNaN(num) && num >= 0) {
                                                updateSiteMonthlyFee(site.id, num);
                                              }
                                              setEditingFeeSiteId(null);
                                            }}
                                            className="px-2 py-0.5 rounded bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-[10px] font-bold cursor-pointer transition"
                                            title="Salvar novo valor"
                                          >
                                            ✓ Salvar
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setEditingFeeSiteId(null)}
                                            className="px-1.5 py-0.5 rounded text-neutral-400 hover:text-neutral-200 text-[10px] cursor-pointer"
                                            title="Cancelar"
                                          >
                                            ✕
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="mt-0.5">
                                          {isModelMicrosite(site) ? (
                                            <>
                                              <div className="flex items-center gap-1.5">
                                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                <span className="font-bold text-amber-300 font-mono">
                                                  R$ 0,00 (Modelo)
                                                </span>
                                              </div>
                                              <span className="text-[9.5px] text-neutral-400 block">
                                                Excluído do cálculo de faturamento (MRR)
                                              </span>
                                            </>
                                          ) : (
                                            <>
                                              <div className="flex items-center gap-1.5">
                                                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                                                <span className="font-bold text-emerald-300 font-mono">
                                                  R$ {billing.totalDueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>
                                              </div>
                                              <span className="text-[9.5px] text-neutral-400 block">
                                                {billing.isFirstMonth
                                                  ? `Criação R$ ${billing.creationFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} • Mensalidade R$ 0,00`
                                                  : billing.extraUpdatesCount > 0
                                                  ? `Manut. R$ ${billing.maintenanceFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} + R$ ${billing.extraUpdatesCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} extras`
                                                  : `Manut. R$ ${billing.maintenanceFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês`}
                                              </span>
                                            </>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })()}

                              {/* Action Buttons Row */}
                              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {/* BOTÃO PRINCIPAL DE RENOVAÇÃO MANUAL DE PAGAMENTO (+30 DIAS) */}
                                  <button
                                    type="button"
                                    onClick={() => extendDueDate(site.id)}
                                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-[11px] flex items-center gap-1.5 cursor-pointer border border-emerald-300 shadow-md shadow-emerald-500/20 transition"
                                    title="Confirmar renovação manual de pagamento: estende vencimento em +30 dias, libera edições bloqueadas, reativa o link e zera contador mensal de alterações"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5 text-neutral-950" />
                                    <span>Renovar (+30d)</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => loadSiteForEditing(site)}
                                    className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer border transition ${
                                      isEditsBlocked
                                        ? 'bg-red-500/10 hover:bg-red-500/20 text-red-300 border-red-500/30'
                                        : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border-neutral-700'
                                    }`}
                                    title={isEditsBlocked ? 'Edições bloqueadas por inadimplência (D+3). Clique para abrir a regularização Pix.' : 'Carregar microsite no estúdio de edição'}
                                  >
                                    {isEditsBlocked ? <Lock className="w-3 h-3 text-red-400" /> : <Edit3 className="w-3 h-3" />}
                                    <span>{isEditsBlocked ? 'Edição Bloqueada (D+3)' : 'Editar Microsite'}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingFeeSiteId(site.id);
                                      setTempFeeInput(site.monthlyFee.toString());
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-emerald-300 font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer border border-emerald-500/30 transition shadow-sm"
                                    title="Alterar o valor da mensalidade cobrada deste cliente"
                                  >
                                    <DollarSign className="w-3 h-3 text-emerald-400" />
                                    <span>Alterar Valor</span>
                                  </button>

                                  {/* BOTÃO PARA DEFINIR O MICROSITE COMO MODELO (EXCLUÍDO DO FATURAMENTO) */}
                                  <button
                                    type="button"
                                    onClick={() => toggleSiteLandingModel(site.id)}
                                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-1.5 cursor-pointer border transition ${
                                      isModelMicrosite(site)
                                        ? 'bg-amber-400 text-neutral-950 border-amber-300 shadow-md shadow-amber-500/20'
                                        : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border-amber-500/40'
                                    }`}
                                    title={
                                      isModelMicrosite(site)
                                        ? 'Este microsite é considerado um MODELO e NÃO entra nos cálculos de faturamento. Clique para tornar cliente faturável.'
                                        : 'Marcar este microsite como MODELO (não será usado nos cálculos de faturamento)'
                                    }
                                  >
                                    <Star className={`w-3 h-3 ${isModelMicrosite(site) ? 'fill-neutral-950 text-neutral-950' : 'text-amber-400'}`} />
                                    <span>
                                      {isModelMicrosite(site) ? '⭐ É Modelo (Sem Faturamento)' : 'Marcar como Modelo (Sem Faturamento)'}
                                    </span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedPublishSiteId(site.id);
                                      setPublishModalOpen(true);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-[11px] flex items-center gap-1.5 cursor-pointer border border-neutral-700"
                                  >
                                    <Globe className="w-3 h-3 text-amber-400" />
                                    Domínio & DNS
                                  </button>

                                  {/* NOVO BOTÃO: PROMPT DE ENVIO WHATSAPP COM DETALHES, VENCIMENTO, VALORES, LINKS REDES SOCIAIS E TUTORIAL BIO INSTAGRAM */}
                                  <button
                                    type="button"
                                    onClick={() => openClientWaPromptModal(site, 'complete_kit')}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-[11px] flex items-center gap-1.5 cursor-pointer border border-emerald-300 shadow-sm shadow-emerald-500/20 transition"
                                    title="Abrir prompt de mensagem WhatsApp com vencimento, valores, links p/ redes sociais e passo a passo de como colocar na Bio do Instagram"
                                  >
                                    <Send className="w-3 h-3 text-neutral-950" />
                                    <span>📲 Enviar Links, Valores & Tutorial Bio</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => openPixBillingModal(site)}
                                    className={`px-3 py-1.5 rounded-lg font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer border transition ${
                                      isSuspended || isOverdue
                                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/40 animate-pulse'
                                        : isDueToday
                                        ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
                                        : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/30'
                                    }`}
                                    title="Abrir Modal de Cobrança com Régua Inteligente (D-3, D-0, D+3, D+7) e Disparo WhatsApp"
                                  >
                                    <MessageCircle className="w-3 h-3 text-emerald-400" />
                                    <span>💬 Régua de Cobrança WhatsApp</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => openPixBillingModal(site)}
                                    className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer border border-amber-500/30 transition"
                                    title="Gerar Fatura PIX com Régua de Cobrança (D-3, D-0, D+3, D+7) e confirmar baixa automática"
                                  >
                                    <DollarSign className="w-3 h-3 text-amber-400" />
                                    <span>⚡ Fatura PIX & Baixa</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => openSuspendedPagePreview(site)}
                                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-200 font-medium text-[11px] flex items-center gap-1.5 cursor-pointer border border-amber-500/30 transition"
                                    title="Visualizar a Tela Neutra de Manutenção (Modo Suspenso D+7) gerada para este cliente"
                                  >
                                    <Eye className="w-3 h-3 text-amber-400" />
                                    <span>Tela Manutenção</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => setSinglePdfSiteId(site.id)}
                                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-[11px] flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                                    title="Gerar e visualizar relatório em PDF individual para este cliente"
                                  >
                                    <FileText className="w-3 h-3 text-amber-400" />
                                    <span>Relatório PDF</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => downloadMicrositeDirectoryZip(site)}
                                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-emerald-300 font-medium text-[11px] flex items-center gap-1.5 cursor-pointer border border-emerald-500/30 hover:border-emerald-400 transition"
                                    title={`Baixar pacote ZIP da pasta independente (/public_html/${site.subdomain}/) pronta para o servidor`}
                                  >
                                    <FolderArchive className="w-3 h-3 text-emerald-400" />
                                    <span>Baixar Pasta (ZIP)</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => openResetTrackingModal(site)}
                                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/15 text-red-300 hover:text-red-200 font-medium text-[11px] flex items-center gap-1.5 cursor-pointer border border-neutral-700 hover:border-red-500/40 transition"
                                    title="Zerar cliques de WhatsApp e acessos deste cliente"
                                  >
                                    <RotateCcw className="w-3 h-3 text-red-400" />
                                    <span>Zerar Rastreamento</span>
                                  </button>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  {/* Botão "Alternar Suspensão": Permite colocar a página em "Modo Manutenção" ou "Reativar" */}
                                  <button
                                    type="button"
                                    onClick={() => toggleSiteSuspensionMode(site.id)}
                                    title={
                                      isSuspended
                                        ? 'Reativar microsite (tirar do Modo Manutenção e liberar acesso normal)'
                                        : 'Alternar Suspensão: Colocar página em Modo Manutenção (Tela Neutra de Atualização Técnica)'
                                    }
                                    className={`px-3 py-1.5 rounded-lg font-bold text-[11px] flex items-center gap-1.5 cursor-pointer transition ${
                                      isSuspended
                                        ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-sm shadow-emerald-500/20'
                                        : 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40'
                                    }`}
                                  >
                                    <Power className="w-3 h-3" />
                                    <span>
                                      {isSuspended ? 'Alternar Suspensão: Reativar' : 'Alternar Suspensão: Modo Manutenção'}
                                    </span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => deleteSavedSite(site.id)}
                                    className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/20 text-neutral-400 hover:text-red-300 border border-neutral-800 hover:border-red-500/40 flex items-center gap-1 text-[11px] font-medium cursor-pointer transition"
                                    title="Excluir microsite permanentemente"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                    <span>Excluir</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
  );
};

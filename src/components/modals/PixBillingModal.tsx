import React from 'react';
import { CreditCard, X, RefreshCw, Sparkles, Copy, Send, ExternalLink, Power, Check, MessageCircle } from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';
import {
  getDaysUntilDue,
  isSiteSuspendedStatus,
  isSiteEditsLocked,
  getSiteBillingSummary,
  AUTO_DISABLE_OVERDUE_DAYS,
} from '../../constants/maintenancePlans';
import { formatDueDateBr, formatWhatsAppPhone, safeCopyText } from '../../utils/formatters';

export interface PixBillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixModalSite: SavedMicrosite | null;
  pixBillingStage: 'd_minus_3' | 'd_0' | 'd_plus_3' | 'd_plus_7' | string;
  setPixBillingStage: (stage: any) => void;
  pixCustomCode: string;
  setPixCustomCode: (code: string) => void;
  pixWhatsappMessage: string;
  setPixWhatsappMessage: (msg: string) => void;
  buildReguaCobrancaMessage: (site: SavedMicrosite, stage: any, pixCode: string) => string;
  data: any;
  landingConfig: any;
  asaasServerConfigured: boolean;
  asaasStatusTesting: boolean;
  asaasPaymentData: any;
  asaasGeneratingSiteId: string | null;
  handleGenerateAsaasInvoice: (site: SavedMicrosite) => Promise<void> | void;
  checkAsaasStatusAndConfirm: (siteId: string, paymentId: string) => Promise<void> | void;
  extendDueDate: (siteId: string, days?: number) => void;
  toggleSiteSuspensionMode: (siteId: string) => void;
  setSuspendedPreviewSite: (site: SavedMicrosite | null) => void;
  setAiCopyModalOpen: (val: boolean) => void;
  showToast: (msg: string) => void;
}

export const PixBillingModal: React.FC<PixBillingModalProps> = ({
  isOpen,
  onClose,
  pixModalSite,
  pixBillingStage,
  setPixBillingStage,
  pixCustomCode,
  setPixCustomCode,
  pixWhatsappMessage,
  setPixWhatsappMessage,
  buildReguaCobrancaMessage,
  data,
  landingConfig,
  asaasServerConfigured,
  asaasStatusTesting,
  asaasPaymentData,
  asaasGeneratingSiteId,
  handleGenerateAsaasInvoice,
  checkAsaasStatusAndConfirm,
  extendDueDate,
  toggleSiteSuspensionMode,
  setSuspendedPreviewSite,
  setAiCopyModalOpen,
  showToast,
}) => {
  if (!isOpen || !pixModalSite) return null;

        const billing = getSiteBillingSummary(pixModalSite);
        const daysDiff = getDaysUntilDue(pixModalSite.dueDate);
        const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : 0;
        const editsBlocked = isSiteEditsLocked(pixModalSite, daysOverdue);
        const isSuspended = isSiteSuspendedStatus(pixModalSite);
        const activePixKey = (pixCustomCode || data.saasSettings?.pixKey || 'contato@biovip.com.br').trim();
        const currentWaMessage =
          pixWhatsappMessage || buildReguaCobrancaMessage(pixModalSite, pixBillingStage, activePixKey);
        const cleanClientPhone = formatWhatsAppPhone(pixModalSite.clientPhone || pixModalSite.data?.profile?.whatsapp || '');
        const waDispatchHref = cleanClientPhone
          ? `https://wa.me/${cleanClientPhone}?text=${encodeURIComponent(currentWaMessage)}`
          : `https://wa.me/?text=${encodeURIComponent(currentWaMessage)}`;

        const stageOptions: Array<{
          id: 'd_minus_3' | 'd_0' | 'd_plus_3' | 'd_plus_7';
          shortLabel: string;
          fullLabel: string;
          badgeColor: string;
        }> = [
          {
            id: 'd_minus_3',
            shortLabel: 'D-3 · Preventivo',
            fullLabel: 'D-3 (Lembrete Preventivo - 3 dias antes)',
            badgeColor: 'border-sky-500/40 bg-sky-500/15 text-sky-300',
          },
          {
            id: 'd_0',
            shortLabel: 'D-0 · Vencimento',
            fullLabel: 'D-0 (Dia do Vencimento)',
            badgeColor: 'border-amber-500/40 bg-amber-500/15 text-amber-300',
          },
          {
            id: 'd_plus_3',
            shortLabel: 'D+3 · Bloqueio Edições',
            fullLabel: 'D+3 (Atraso Leve - Bloqueio de Edições)',
            badgeColor: 'border-orange-500/40 bg-orange-500/15 text-orange-300',
          },
          {
            id: 'd_plus_7',
            shortLabel: 'D+7 · Suspensão Rotina',
            fullLabel: 'D+7 (Suspensão Temporária de Rotina)',
            badgeColor: 'border-red-500/40 bg-red-500/15 text-red-300',
          },
        ];

        const handleSelectStage = (newStage: 'd_minus_3' | 'd_0' | 'd_plus_3' | 'd_plus_7') => {
          setPixBillingStage(newStage);
          setPixWhatsappMessage(buildReguaCobrancaMessage(pixModalSite, newStage, activePixKey));
        };

        const handlePixCodeChange = (newPixVal: string) => {
          setPixCustomCode(newPixVal);
          setPixWhatsappMessage(buildReguaCobrancaMessage(pixModalSite, pixBillingStage, newPixVal));
        };

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-neutral-900 border border-amber-500/40 rounded-2xl p-6 space-y-4 text-neutral-100 shadow-2xl my-auto">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-neutral-800 pb-3.5 gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-100 flex items-center gap-2 flex-wrap">
                      <span>Régua de Cobrança & Fatura PIX — {pixModalSite.clientName}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold border ${
                          isSuspended
                            ? 'bg-red-500/20 text-red-300 border-red-500/40'
                            : editsBlocked
                            ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {isSuspended
                          ? `🛑 Suspenso D+7 (${daysOverdue}d atraso)`
                          : editsBlocked
                          ? `🔒 Atrasado D+3 (${daysOverdue}d atraso)`
                          : daysOverdue > 0
                          ? `🟡 Pendente (${daysOverdue}d atraso)`
                          : '🟢 Em Dia'}
                      </span>
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Domínio: <strong className="text-amber-300 font-mono">{pixModalSite.customDomain || `${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/${pixModalSite.subdomain}`}</strong> · Vencimento:{' '}
                      <strong className="text-neutral-200">{formatDueDateBr(pixModalSite.dueDate)}</strong> · Valor:{' '}
                      <strong className="text-emerald-400">R$ {billing.totalDueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1. SELETOR DE ESTÁGIO DA COBRANÇA (WHATSAPP DISPATCHER) */}
              <div className="space-y-2 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Estágio da Cobrança (Régua Inteligente WhatsApp)</span>
                  </label>
                  <span className="text-[10px] text-neutral-400">
                    Atualiza a mensagem e o link wa.me instantaneamente
                  </span>
                </div>

                {/* Dropdown Selector */}
                <select
                  value={pixBillingStage}
                  onChange={(e) => handleSelectStage(e.target.value as 'd_minus_3' | 'd_0' | 'd_plus_3' | 'd_plus_7')}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-amber-500/40 text-xs font-bold text-amber-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {stageOptions.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.fullLabel}
                    </option>
                  ))}
                </select>

                {/* Quick Stage Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                  {stageOptions.map((st) => {
                    const active = pixBillingStage === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => handleSelectStage(st.id)}
                        className={`px-2.5 py-2 rounded-lg text-[10.5px] font-bold border transition cursor-pointer text-center ${
                          active
                            ? 'bg-amber-400 text-neutral-950 border-amber-300 shadow-md shadow-amber-500/20'
                            : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
                        }`}
                      >
                        {st.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. CHAVE PIX / COPIA E COLA + TEXTAREA DA MENSAGEM WHATSAPP */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <div className="sm:col-span-8 space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        Chave Pix / Código Pix Copia e Cola ({'{pix}'})
                      </label>
                      <button
                        type="button"
                        onClick={async () => {
                          await safeCopyText(activePixKey);
                          showToast('🔑 Chave PIX copiada para a área de transferência!');
                        }}
                        className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                      >
                        Copiar Pix
                      </button>
                    </div>
                    <input
                      type="text"
                      value={pixCustomCode}
                      onChange={(e) => handlePixCodeChange(e.target.value)}
                      placeholder="Chave Pix ou código Pix Copia e Cola..."
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        Mensagem Pré-Formatada para Disparo no WhatsApp
                      </label>
                      <button
                        type="button"
                        onClick={async () => {
                          await safeCopyText(currentWaMessage);
                          showToast('📋 Mensagem da régua de cobrança copiada!');
                        }}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> Copiar texto
                      </button>
                    </div>
                    <textarea
                      rows={5}
                      value={currentWaMessage}
                      onChange={(e) => setPixWhatsappMessage(e.target.value)}
                      className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 leading-relaxed focus:outline-none focus:border-emerald-400 resize-y"
                    />
                  </div>
                </div>

                {/* Coluna Lateral: Resumo & QR Code */}
                <div className="sm:col-span-4 flex flex-col justify-between bg-neutral-900/90 p-3.5 rounded-xl border border-neutral-800 space-y-3">
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Favorecido:</span>
                      <span className="font-semibold text-neutral-200 truncate max-w-[110px]">
                        {data.saasSettings?.pixName || 'BioVip Studio'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Fatura Atual:</span>
                      <span className="font-bold text-emerald-400 font-mono">
                        R$ {billing.totalDueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Edições:</span>
                      <span className={`font-bold text-[10px] ${editsBlocked ? 'text-red-400' : 'text-emerald-400'}`}>
                        {editsBlocked ? '🔒 Bloqueadas' : '🔓 Liberadas'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Status Link:</span>
                      <span className={`font-bold text-[10px] ${isSuspended ? 'text-amber-300' : 'text-emerald-400'}`}>
                        {isSuspended ? '🛠️ Manutenção' : '🟢 Ativo'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-2 py-1">
                    {asaasPaymentData?.pixQrCode ? (
                      <div className="p-2 bg-white rounded-xl shadow">
                        <img
                          src={`data:image/png;base64,${asaasPaymentData.pixQrCode}`}
                          alt="QR Code Asaas"
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="p-2.5 bg-white rounded-xl shadow">
                        <div className="w-24 h-24 bg-neutral-950 flex items-center justify-center text-white text-[9px] font-mono text-center p-2 rounded">
                          [QR CODE PIX R$ {billing.totalDueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}]
                        </div>
                      </div>
                    )}
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {asaasPaymentData?.pixQrCode ? '⚡ QR Code Asaas Ativo' : 'PIX Copia e Cola'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2.5 BARRA DE COBRANÇA OFICIAL ASAAS */}
              <div className="p-3 bg-neutral-950 rounded-xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-white block">
                      Gateway Asaas Automático
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {asaasPaymentData
                        ? `Cobrança Asaas ID: ${asaasPaymentData.paymentId} · Status: ${asaasPaymentData.status}`
                        : 'Gera QR Code Pix dinâmico no Asaas e verifica baixa automaticamente'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    disabled={Boolean(asaasGeneratingSiteId)}
                    onClick={() => handleGenerateAsaasInvoice(pixModalSite)}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
                  >
                    <CreditCard className={`w-3.5 h-3.5 ${asaasGeneratingSiteId ? 'animate-spin' : ''}`} />
                    <span>{asaasGeneratingSiteId ? 'Gerando no Asaas...' : '⚡ Gerar Fatura no Asaas'}</span>
                  </button>

                  {asaasPaymentData?.invoiceUrl && (
                    <a
                      href={asaasPaymentData.invoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold border border-neutral-700 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3 text-amber-400" />
                      <span>Fatura Asaas</span>
                    </a>
                  )}

                  {asaasPaymentData && (
                    <button
                      type="button"
                      onClick={() => checkAsaasStatusAndConfirm(pixModalSite.id, asaasPaymentData.paymentId)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/40 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3 text-emerald-400" />
                      <span>Verificar Baixa</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 3. BOTÕES DE DISPARO WHATSAPP (wa.me) E LIQUIDAÇÃO PIX */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <a
                  href={waDispatchHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    showToast(`📲 Abrindo WhatsApp de "${pixModalSite.clientName}" com a mensagem ${pixBillingStage.toUpperCase()}!`);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer no-underline"
                >
                  <Send className="w-4 h-4" />
                  <span>Disparar Cobrança no WhatsApp (wa.me)</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    extendDueDate(pixModalSite.id, 30);
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirmar Pagamento PIX (+30d & Liberar)</span>
                </button>
              </div>
            </div>
          </div>
  );
};

import React from 'react';
import { MessageCircle, X, Copy, ExternalLink, Check, Send } from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';
import { safeCopyText, formatDueDateBr, formatWhatsAppPhone } from '../../utils/formatters';
import { AUTO_DISABLE_OVERDUE_DAYS, getSiteBillingSummary, getDaysUntilDue } from '../../constants/maintenancePlans';

export interface ClientWaPromptModalProps {
  clientWaPromptSite: SavedMicrosite | null;
  onClose: () => void;
  clientWaPromptTemplate: string;
  setClientWaPromptTemplate: (tpl: any) => void;
  clientWaPromptPhone: string;
  setClientWaPromptPhone: (val: string) => void;
  clientWaPromptText: string;
  setClientWaPromptText: (val: string) => void;
  copiedClientWaPrompt: boolean;
  setCopiedClientWaPrompt: (val: boolean) => void;
  buildClientWhatsappPromptText: (site: SavedMicrosite, templateType?: any) => string;
  showToast: (msg: string) => void;
}

export const ClientWaPromptModal: React.FC<ClientWaPromptModalProps> = ({
  clientWaPromptSite,
  onClose,
  clientWaPromptTemplate,
  setClientWaPromptTemplate,
  clientWaPromptPhone,
  setClientWaPromptPhone,
  clientWaPromptText,
  setClientWaPromptText,
  copiedClientWaPrompt,
  setCopiedClientWaPrompt,
  buildClientWhatsappPromptText,
  showToast,
}) => {
  if (!clientWaPromptSite) return null;

  const primaryDomain = (clientWaPromptSite.customDomain || '').trim() || `biovip.com.br/${clientWaPromptSite.subdomain || 'meusite'}`;
  const primaryUrl = `https://${primaryDomain}`;
  const instagramBioTrackedUrl = `${primaryUrl}?utm_source=instagram&utm_medium=bio&utm_campaign=perfil_oficial`;
  const subdomainUrl = `https://biovip.com.br/${clientWaPromptSite.subdomain || 'meusite'}`;
  const billing = getSiteBillingSummary(clientWaPromptSite);
  const daysDiff = getDaysUntilDue(clientWaPromptSite.dueDate);
  const daysOverdue = daysDiff < 0 ? Math.abs(daysDiff) : 0;

        return (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-neutral-900 border border-emerald-500/40 rounded-2xl p-5 space-y-4 text-neutral-100 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-100">
                      Prompt WhatsApp: Detalhes do Microsite, Valores, Links & Tutorial Bio Instagram
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Cliente: <strong className="text-amber-300">{clientWaPromptSite.clientName}</strong> · Domínio: <span className="font-mono text-emerald-400">{primaryUrl}</span>
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

              {/* Resumo Rápido dos Dados do Microsite */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block">Data de Vencimento</span>
                  <span className="font-bold font-mono text-amber-300 text-sm">{formatDueDateBr(clientWaPromptSite.dueDate)}</span>
                  <span className="text-[9.5px] text-neutral-500 block">
                    {daysOverdue >= AUTO_DISABLE_OVERDUE_DAYS
                      ? `🛑 Desativado (${daysOverdue}d atraso)`
                      : daysOverdue > 0
                      ? `⚠️ ${daysOverdue}d atraso (Suspende no 7º)`
                      : '🛡️ Suspensão auto no 7º dia'}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block">Plano de Manutenção</span>
                  <span className="font-bold text-emerald-300 text-xs block">{billing.plan.shortName}</span>
                  <span className="text-[9.5px] text-neutral-500 block">Extra: R$ 14,90/alt.</span>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block">Ciclo Atual</span>
                  <span className="font-bold text-amber-300 text-xs block">
                    {billing.isFirstMonth ? '1º Mês (Só Criação)' : `${billing.updatesUsed} alt. no mês`}
                  </span>
                  <span className="text-[9.5px] text-neutral-500 block">
                    {billing.isFirstMonth ? 'Sem mensalidade no 1º mês' : `Franquia: ${billing.includedUpdatesLabel}`}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950 border border-emerald-500/30">
                  <span className="text-[10px] text-neutral-400 block">Valor Total no Ciclo</span>
                  <span className="font-black font-mono text-emerald-400 text-sm">
                    R$ {billing.totalDueThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[9.5px] text-neutral-500 block">
                    {billing.extraUpdatesCount > 0 ? `Inclui +${billing.extraUpdatesCount} extra` : 'Valor fechado'}
                  </span>
                </div>
              </div>

              {/* Links Prontos para Copiar Individualmente */}
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  Links Diretos para as Redes Sociais do Cliente:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                    <div className="truncate">
                      <span className="text-[9.5px] text-neutral-400 block">Link Principal (Bio Instagram / TikTok / WA):</span>
                      <span className="font-mono text-emerald-300 text-[11px] font-bold">{primaryUrl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        await safeCopyText(primaryUrl);
                        showToast('📋 Link principal copiado!');
                      }}
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-[10px] font-bold shrink-0 cursor-pointer"
                    >
                      Copiar
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                    <div className="truncate">
                      <span className="text-[9.5px] text-neutral-400 block">Link Rastreado UTM (Bio do Instagram):</span>
                      <span className="font-mono text-amber-300 text-[11px]">{instagramBioTrackedUrl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        await safeCopyText(instagramBioTrackedUrl);
                        showToast('📋 Link rastreado para Bio do Instagram copiado!');
                      }}
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-[10px] font-bold shrink-0 cursor-pointer"
                    >
                      Copiar
                    </button>
                  </div>
                </div>
              </div>

              {/* Seletor de Modelo de Prompt WhatsApp */}
              <div className="space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Escolha o Formato do Prompt de Mensagem:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      { id: 'complete_kit', label: '📦 Kit Completo (Vencimento + Valores + Links + Tutorial Bio)' },
                      { id: 'onboarding_bio', label: '🎉 Entrega Inicial + Tutorial Bio Instagram' },
                      { id: 'renewal_details', label: '💳 Resumo de Renovação + Links & Bio' },
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => {
                          const tId = tpl.id as 'complete_kit' | 'onboarding_bio' | 'renewal_details';
                          setClientWaPromptTemplate(tId);
                          setClientWaPromptText(buildClientWhatsappPromptText(clientWaPromptSite, tId));
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer border ${
                          clientWaPromptTemplate === tpl.id
                            ? 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Destinatário + Textarea Editável do Prompt */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-400 block mb-1">
                      WhatsApp do Cliente (com DDD, ex: 5511999999999)
                    </label>
                    <input
                      type="text"
                      value={clientWaPromptPhone}
                      onChange={(e) => setClientWaPromptPhone(e.target.value)}
                      placeholder="5511999999999"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 font-mono text-xs"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => {
                        setClientWaPromptText(buildClientWhatsappPromptText(clientWaPromptSite, clientWaPromptTemplate));
                        showToast('🔄 Texto do prompt restaurado com os dados atualizados do microsite!');
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs border border-neutral-700 cursor-pointer transition"
                    >
                      Restaurar Texto Padrão
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 flex items-center justify-between mb-1">
                    <span>Mensagem Pronta para Envio (Editável antes de enviar):</span>
                    <span className="text-emerald-400 font-semibold">Inclui passo a passo da Bio do Instagram + Links + Vencimento</span>
                  </label>
                  <textarea
                    rows={12}
                    value={clientWaPromptText}
                    onChange={(e) => setClientWaPromptText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Botões de Ação do Modal WhatsApp */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await safeCopyText(clientWaPromptText);
                    if (ok) {
                      setCopiedClientWaPrompt(true);
                      setTimeout(() => setCopiedClientWaPrompt(false), 2500);
                      showToast(`📋 Mensagem completa copiada para a área de transferência!`);
                    }
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-amber-500/30 cursor-pointer transition"
                >
                  <Check className="w-4 h-4" />
                  <span>{copiedClientWaPrompt ? '✓ Mensagem Copiada!' : 'Copiar Mensagem Completa'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const cleanPhone = formatWhatsAppPhone(clientWaPromptPhone || '');
                    const waUrl = cleanPhone
                      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(clientWaPromptText)}`
                      : `https://api.whatsapp.com/send?text=${encodeURIComponent(clientWaPromptText)}`;
                    window.open(waUrl, '_blank');
                    showToast(`📲 Abrindo WhatsApp para enviar detalhes e tutorial da Bio para ${clientWaPromptSite.clientName}!`);
                  }}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Agora via WhatsApp para {clientWaPromptSite.clientName}</span>
                </button>
              </div>
            </div>
          </div>
        );
};

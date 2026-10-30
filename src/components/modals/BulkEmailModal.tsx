import React from 'react';
import { Mail, X, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';

const isValidClientEmail = (email: string) => {
  return /^[^s@]+@[^s@]+.[^s@]{2,}$/.test((email || '').trim());
};

export interface BulkEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSites: SavedMicrosite[];
  bulkEmailCategory: string;
  setBulkEmailCategory: (cat: any) => void;
  bulkEmailSubject: string;
  setBulkEmailSubject: (subj: string) => void;
  bulkEmailBody: string;
  setBulkEmailBody: (body: string) => void;
  bulkEmailAudience: any;
  setBulkEmailAudience: (aud: any) => void;
  bulkEmailSelectedIds: string[];
  setBulkEmailSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  bulkEmailSending: boolean;
  buildBulkEmailTemplate: (cat: any) => { subject: string; body: string };
  handleSelectBulkEmailAudience: (aud: any) => void;
  handleSendBulkEmail: () => void;
  openMailtoBulkEmail: () => void;
  bulkEmailHistory: any[];
  landingConfig: any;
  BULK_EMAIL_TEMPLATES?: any;
}

export const BulkEmailModal: React.FC<BulkEmailModalProps> = ({
  isOpen,
  onClose,
  savedSites,
  bulkEmailCategory,
  setBulkEmailCategory,
  bulkEmailSubject,
  setBulkEmailSubject,
  bulkEmailBody,
  setBulkEmailBody,
  bulkEmailAudience,
  setBulkEmailAudience,
  bulkEmailSelectedIds,
  setBulkEmailSelectedIds,
  bulkEmailSending,
  buildBulkEmailTemplate,
  handleSelectBulkEmailAudience,
  handleSendBulkEmail,
  openMailtoBulkEmail,
  bulkEmailHistory,
  landingConfig,
}) => {
  if (!isOpen) return null;

  const sitesWithValidEmail = savedSites.filter((s) => s.clientEmail && isValidClientEmail(s.clientEmail));
  const sitesWithoutEmail = savedSites.filter((s) => !s.clientEmail || !isValidClientEmail(s.clientEmail));

        return (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-3xl bg-neutral-900 border border-amber-500/40 rounded-2xl p-5 space-y-4 text-neutral-100 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-100">
                      Central de Disparo de E-mail em Massa — Comunicados & Manutenções
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Envie avisos técnicos de manutenção programada, atualizações de servidor/SSL e comunicados para todos os clientes cadastrados.
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

              {/* Seletor de Categoria / Modelo de E-mail em Massa */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  1. Escolha o Assunto / Modelo de Comunicado:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'scheduled_maintenance', label: '🛠️ Manutenção Programada' },
                    { id: 'maintenance_completed', label: '✅ Manutenção Concluída' },
                    { id: 'new_features', label: '✨ Novidades & Recursos' },
                    { id: 'custom_announcement', label: '✍️ Comunicado Livre' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        const cId = cat.id as 'scheduled_maintenance' | 'maintenance_completed' | 'new_features' | 'custom_announcement';
                        setBulkEmailCategory(cId);
                        const tpl = buildBulkEmailTemplate(cId);
                        setBulkEmailSubject(tpl.subject);
                        setBulkEmailBody(tpl.body);
                      }}
                      className={`p-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        bulkEmailCategory === cat.id
                          ? 'bg-amber-400 text-neutral-950 border-amber-300 shadow'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seleção de Público-Alvo e Lista de Destinatários */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                    2. Destinatários Selecionados ({bulkEmailSelectedIds.length} de {sitesWithValidEmail.length} clientes com e-mail):
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      { id: 'all', label: `Todos (${sitesWithValidEmail.length})` },
                      { id: 'active', label: 'Somente Em Dia' },
                      { id: 'overdue', label: 'Somente Vencidos / Atrasados' },
                    ].map((aud) => (
                      <button
                        key={aud.id}
                        type="button"
                        onClick={() => handleSelectBulkEmailAudience(aud.id as 'all' | 'active' | 'overdue')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer border transition ${
                          bulkEmailAudience === aud.id
                            ? 'bg-emerald-500 text-neutral-950 border-emerald-400'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                        }`}
                      >
                        {aud.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="max-h-36 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {sitesWithValidEmail.map((s) => {
                    const isChecked = bulkEmailSelectedIds.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex items-center justify-between gap-2 p-2 rounded-lg border cursor-pointer transition ${
                          isChecked
                            ? 'bg-neutral-900 border-emerald-500/40 text-neutral-100'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-500'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setBulkEmailAudience('custom');
                              setBulkEmailSelectedIds((prev) =>
                                prev.includes(s.id) ? prev.filter((id) => id !== s.id) : [...prev, s.id]
                              );
                            }}
                            className="rounded border-neutral-700 text-emerald-500 focus:ring-0"
                          />
                          <div className="truncate">
                            <span className="font-bold text-[11px] block truncate">{s.clientName}</span>
                            <span className="font-mono text-[10px] text-amber-300 block truncate">{s.clientEmail}</span>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 shrink-0">
                          {s.status === 'active' ? '🟢 Ativo' : s.status === 'overdue' ? '🟡 Vencido' : '🛑 Suspenso'}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {sitesWithoutEmail.length > 0 && (
                  <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-[10.5px] text-red-300 flex items-center justify-between gap-2">
                    <span>
                      ⚠️ {sitesWithoutEmail.length} cliente(s) antigo(s) sem e-mail cadastrado ({sitesWithoutEmail.map(x => x.clientName).join(', ')}). Edite no card do cliente para incluí-lo.
                    </span>
                  </div>
                )}
              </div>

              {/* Campos de Assunto e Corpo do E-mail */}
              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1 font-semibold">
                    Assunto do E-mail em Massa:
                  </label>
                  <input
                    type="text"
                    value={bulkEmailSubject}
                    onChange={(e) => setBulkEmailSubject(e.target.value)}
                    placeholder="Ex: [Aviso Importante] Manutenção Programada e Atualização de Segurança"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 font-semibold text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] text-neutral-400 font-semibold">
                      Mensagem do Comunicado:
                    </label>
                    <span className="text-[9.5px] text-amber-300 font-mono">
                      Variáveis automáticas: {'{{nome_cliente}}'}, {'{{dominio}}'}, {'{{vencimento}}'}, {'{{valor}}'}
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={bulkEmailBody}
                    onChange={(e) => setBulkEmailBody(e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Botões de Disparo em Massa */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={openMailtoBulkEmail}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 cursor-pointer transition"
                  title="Abrir no seu aplicativo de e-mail padrão (Gmail / Outlook) com todos os clientes em Cópia Oculta (BCC)"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Abrir no Gmail/App (BCC)</span>
                </button>

                <button
                  type="button"
                  disabled={bulkEmailSending || bulkEmailSelectedIds.length === 0}
                  onClick={handleSendBulkEmail}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {bulkEmailSending
                      ? 'Disparando Comunicados em Massa...'
                      : `Disparar E-mail em Massa para ${bulkEmailSelectedIds.length} Cliente(s)`}
                  </span>
                </button>
              </div>

              {/* Histórico Recente de Disparos em Massa */}
              {bulkEmailHistory.length > 0 && (
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Histórico de Disparos Realizados ({bulkEmailHistory.length}):
                  </span>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {bulkEmailHistory.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-2 text-[10.5px]"
                      >
                        <div className="truncate">
                          <span className="font-bold text-neutral-200">{item.subject}</span>
                          <span className="text-neutral-400 block text-[9.5px]">
                            Enviado em {item.sentAt} · Destinatários: {item.recipientCount} ({item.recipientsList.slice(0, 3).join(', ')}{item.recipientsList.length > 3 ? '...' : ''})
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono text-[9.5px] shrink-0">
                          {item.protocol}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
};

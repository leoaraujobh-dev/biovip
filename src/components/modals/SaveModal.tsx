import React from 'react';
import { Save, Mail, AlertCircle, Power, Zap, X } from 'lucide-react';
import type { SaveFormState, MaintenancePlanId } from '../../types/microsite';
import { MAINTENANCE_PLANS } from '../../constants/maintenancePlans';

export interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  saveForm: SaveFormState;
  setSaveForm: React.Dispatch<React.SetStateAction<SaveFormState>>;
  saveEmailError: string | null;
  setSaveEmailError: React.Dispatch<React.SetStateAction<string | null>>;
  editingSiteId?: string | null;
  handleSaveMicrosite: (saveAsNew?: boolean) => void;
}

export const SaveModal: React.FC<SaveModalProps> = ({
  isOpen,
  onClose,
  saveForm,
  setSaveForm,
  saveEmailError,
  setSaveEmailError,
  editingSiteId,
  handleSaveMicrosite,
}) => {
  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4 text-neutral-100 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-neutral-100 flex items-center gap-2">
                  <Save className="w-4 h-4 text-emerald-400" />
                  {editingSiteId ? 'Salvar / Editar Cadastro do Cliente' : 'Cadastrar Novo Cliente & Microsite'}
                </h3>
                <p className="text-[10.5px] text-neutral-400 mt-0.5">
                  Cadastro com e-mail obrigatório, plano de manutenção e regra de 1º mês sem mensalidade.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onClose()}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Nome do Cliente / Empresa</label>
                <input
                  type="text"
                  placeholder="Ex: Don Corleone Barber Club"
                  value={saveForm.clientName}
                  onChange={(e) => setSaveForm(f => ({ ...f, clientName: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 font-semibold"
                />
              </div>

              {/* CAMPO DE E-MAIL OBRIGATÓRIO DO CLIENTE */}
              <div>
                <label className="text-[10px] font-bold text-amber-300 flex items-center justify-between mb-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-amber-400" /> E-mail do Cliente <span className="text-red-400">* (Obrigatório)</span>
                  </span>
                  <span className="text-[9.5px] font-normal text-neutral-400">Para comunicados de manutenção em massa</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="cliente@empresa.com.br"
                  value={saveForm.clientEmail}
                  onChange={(e) => {
                    setSaveForm(f => ({ ...f, clientEmail: e.target.value }));
                    if (saveEmailError) setSaveEmailError(null);
                  }}
                  className={`w-full px-3 py-2 rounded-xl bg-neutral-950 border font-mono text-xs ${
                    saveEmailError
                      ? 'border-red-500 text-red-200 focus:outline-none'
                      : 'border-amber-500/40 text-amber-200 focus:border-amber-400 focus:outline-none'
                  }`}
                />
                {saveEmailError && (
                  <p className="text-[10.5px] text-red-400 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{saveEmailError}</span>
                  </p>
                )}
              </div>

              {/* SELETOR DE PLANO DE TAXA DE MANUTENÇÃO (29,90 / 49,90 / 79,90 + 14,90 extra) */}
              <div className="p-3 rounded-xl bg-neutral-950 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    Plano de Taxa de Manutenção Mensal
                  </label>
                  <span className="text-[9.5px] text-amber-300 font-semibold">
                    Alteração extra avulsa: R$ 14,90
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['basic_1', 'pro_4', 'vip_unlimited'] as MaintenancePlanId[]).map((planKey) => {
                    const p = MAINTENANCE_PLANS[planKey];
                    const isSelected = saveForm.maintenancePlan === planKey;
                    return (
                      <button
                        key={planKey}
                        type="button"
                        onClick={() =>
                          setSaveForm((f) => ({
                            ...f,
                            maintenancePlan: planKey,
                            monthlyFee: p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
                          }))
                        }
                        className={`p-2 rounded-lg border text-left transition cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-sm'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="font-black text-xs text-emerald-300 font-mono">
                          R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[10px] font-bold text-neutral-100 mt-0.5">
                          {p.maxUpdates === Infinity ? 'Ilimitadas' : `${p.maxUpdates} alt./mês`}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">Taxa de Criação (1º Mês R$)</label>
                    <input
                      type="text"
                      placeholder="197,00"
                      value={saveForm.creationFee}
                      onChange={(e) => setSaveForm(f => ({ ...f, creationFee: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">Taxa de Manutenção (R$/mês)</label>
                    <input
                      type="text"
                      placeholder="49,90"
                      value={saveForm.monthlyFee}
                      onChange={(e) => setSaveForm(f => ({ ...f, monthlyFee: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-emerald-300 font-bold font-mono"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(saveForm.isFirstMonth)}
                    onChange={(e) => setSaveForm(f => ({ ...f, isFirstMonth: e.target.checked }))}
                    className="mt-0.5 rounded border-amber-400 text-amber-400 focus:ring-amber-400"
                  />
                  <span className="text-[10.5px] text-amber-200 leading-snug">
                    <strong>Cliente no 1º Mês (Taxa de Criação):</strong> A taxa de criação só é cobrada no primeiro mês e <strong>nele não há mensalidade</strong> (a manutenção mensal começa a partir do 2º mês).
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">WhatsApp do Cliente</label>
                  <input
                    type="text"
                    placeholder="5511999999999"
                    value={saveForm.clientPhone}
                    onChange={(e) => setSaveForm(f => ({ ...f, clientPhone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Endereço do Cliente (biovip.com.br/cliente)</label>
                  <div className="flex items-center rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden">
                    <span className="pl-2.5 text-[10px] text-neutral-500 font-mono select-none">biovip.com.br/</span>
                    <input
                      type="text"
                      placeholder="meucliente"
                      value={saveForm.subdomain}
                      onChange={(e) => setSaveForm(f => ({ ...f, subdomain: e.target.value }))}
                      className="flex-1 px-1.5 py-2 bg-transparent text-amber-300 font-mono text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Domínio Próprio (Opcional)</label>
                <input
                  type="text"
                  placeholder="www.meucliente.com.br"
                  value={saveForm.customDomain}
                  onChange={(e) => setSaveForm(f => ({ ...f, customDomain: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 font-mono"
                />
              </div>

              {/* SEÇÃO CRM - PROSPECÇÃO TEMPORÁRIA / DEMONSTRAÇÃO */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-400/40 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-400 text-neutral-950 font-bold">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-300 block">⚡ Prospecção Temporária (Link de Demonstração CRM)</span>
                      <span className="text-[10px] text-neutral-400 block">Crie um link temporário para degustação comercial. Se o cliente aprovar, você ativa em 1 clique!</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(saveForm.isTemporaryDemo)}
                    onChange={(e) => setSaveForm(f => ({ ...f, isTemporaryDemo: e.target.checked }))}
                    className="w-4 h-4 rounded border-amber-400 text-amber-400 focus:ring-amber-400 cursor-pointer"
                  />
                </label>

                {saveForm.isTemporaryDemo && (
                  <div className="space-y-2.5 pt-2 border-t border-amber-400/20 text-xs">
                    <div>
                      <label className="text-[10px] text-amber-300 font-medium block mb-1">Duração do Link de Demonstração</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { days: 3, label: '3 Dias (Express)' },
                          { days: 7, label: '7 Dias (Padrão)' },
                          { days: 14, label: '14 Dias (Degustação)' },
                        ].map((opt) => (
                          <button
                            key={opt.days}
                            type="button"
                            onClick={() => setSaveForm(f => ({ ...f, demoDurationDays: opt.days }))}
                            className={`p-2 rounded-lg border text-center transition cursor-pointer font-bold ${
                              (saveForm.demoDurationDays || 7) === opt.days
                                ? 'bg-amber-400/25 border-amber-400 text-amber-200 shadow-sm'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[10px] text-amber-300 font-medium block mb-1">Valor Proposto para Ativação (R$)</label>
                        <input
                          type="text"
                          value={saveForm.proposalValue || '197,00'}
                          onChange={(e) => setSaveForm(f => ({ ...f, proposalValue: e.target.value }))}
                          placeholder="197,00"
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-emerald-300 font-bold font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Estágio Inicial no Funil CRM</label>
                        <select
                          value={saveForm.crmStage || 'demonstracao'}
                          onChange={(e) => setSaveForm(f => ({ ...f, crmStage: e.target.value as any }))}
                          className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold"
                        >
                          <option value="demonstracao">⚡ Em Demonstração (Teste Grátis)</option>
                          <option value="proposta_enviada">📩 Proposta Enviada</option>
                          <option value="negociacao">🤝 Em Negociação</option>
                          <option value="aceito_ativo">✅ Aceito & Ativado</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 block mb-1">Anotações do Lead / Observações Comercial</label>
                      <input
                        type="text"
                        value={saveForm.prospectNotes || ''}
                        onChange={(e) => setSaveForm(f => ({ ...f, prospectNotes: e.target.value }))}
                        placeholder="Ex: Gostou do modelo de advocacia. Entrar em contato na quinta-feira."
                        className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-[10.5px] text-red-200 flex items-center gap-2">
                <Power className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>
                  <strong>Regra Automática de Inadimplência:</strong> O microsite é desativado automaticamente a partir do <strong>7º dia de atraso</strong> após o vencimento.
                </span>
              </div>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(saveForm.isLandingModel)}
                  onChange={(e) => setSaveForm(f => ({ ...f, isLandingModel: e.target.checked }))}
                  className="rounded border-amber-400 text-amber-400 focus:ring-amber-400"
                />
                <span className="text-[11px] font-semibold text-amber-200">
                  ⭐ Exibir este site no Carrossel de Modelos da Landing Page
                </span>
              </label>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => handleSaveMicrosite(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shadow cursor-pointer transition flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{editingSiteId ? 'Salvar Alterações no Microsite Atual' : 'Cadastrar Cliente & Salvar no Painel'}</span>
              </button>

              {editingSiteId && (
                <button
                  type="button"
                  onClick={() => handleSaveMicrosite(true)}
                  className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs cursor-pointer transition border border-neutral-700"
                >
                  Salvar como NOVO Microsite Independente
                </button>
              )}
            </div>
          </div>
        </div>
  );
};

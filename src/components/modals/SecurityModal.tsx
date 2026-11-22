import React from 'react';
import { KeyRound, X, Lock, History, ShieldAlert, LogOut, Check, AlertCircle, Save, Copy } from 'lucide-react';
import { safeCopyText } from '../../utils/formatters';
import { executeAndLog } from '../../utils/errorHandling';

export interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  securityModalTab: 'pin' | 'audit';
  setSecurityModalTab: (tab: 'pin' | 'audit') => void;
  adminUser: any;
  changePinCurrent: string;
  setChangePinCurrent: (val: string) => void;
  changePinNew: string;
  setChangePinNew: (val: string) => void;
  changePinConfirm: string;
  setChangePinConfirm: (val: string) => void;
  changePinError: string | null;
  setChangePinError: (val: string | null) => void;
  handleChangeAdminPin: () => void;
  handleAdminLogout: () => void;
  handleLockAdminPanel: () => void;
  auditLogs: any[];
  setAuditLogs: React.Dispatch<React.SetStateAction<any[]>>;
  showToast: (msg: string) => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({
  isOpen,
  onClose,
  securityModalTab,
  setSecurityModalTab,
  adminUser,
  changePinCurrent,
  setChangePinCurrent,
  changePinNew,
  setChangePinNew,
  changePinConfirm,
  setChangePinConfirm,
  changePinError,
  setChangePinError,
  handleChangeAdminPin,
  handleAdminLogout,
  handleLockAdminPanel,
  auditLogs,
  setAuditLogs,
  showToast,
}) => {
  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-5 my-auto text-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                    Central de Segurança & PIN Mestre
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Proteção 2FA · Administrador: <span className="text-amber-300 font-mono">{adminUser?.email}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onClose()}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-tabs: Alterar PIN vs Auditoria */}
            <div className="flex items-center gap-2 border-b border-neutral-800/80 pb-2">
              <button
                type="button"
                onClick={() => setSecurityModalTab('pin')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                  securityModalTab === 'pin'
                    ? 'bg-amber-400 text-neutral-950 border-amber-300'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border-neutral-800'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Alterar PIN de 6 Dígitos</span>
              </button>

              <button
                type="button"
                onClick={() => setSecurityModalTab('audit')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                  securityModalTab === 'audit'
                    ? 'bg-amber-400 text-neutral-950 border-amber-300'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border-neutral-800'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Logs de Auditoria ({auditLogs.length})</span>
              </button>
            </div>

            {/* TAB 1: ALTERAR PIN */}
            {securityModalTab === 'pin' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1.5">
                  <p className="leading-relaxed">
                    Defina um <strong className="text-white">código de 6 dígitos numéricos</strong> exclusivo. O PIN é armazenado em formato criptográfico <strong className="text-amber-300 font-mono">SHA-256</strong> com salt exclusivo.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-neutral-400 font-medium block mb-1">
                      PIN Atual (6 dígitos):
                    </label>
                    <input
                      type="password"
                      maxLength={6}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={changePinCurrent}
                      onChange={(e) => {
                        setChangePinCurrent(e.target.value.replace(/\D/g, '').slice(0, 6));
                        setChangePinError(null);
                      }}
                      placeholder="••••••"
                      className="w-full tracking-widest text-base font-mono py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-amber-300 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-neutral-400 font-medium block mb-1">
                        Novo PIN (6 dígitos):
                      </label>
                      <input
                        type="password"
                        maxLength={6}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={changePinNew}
                        onChange={(e) => {
                          setChangePinNew(e.target.value.replace(/\D/g, '').slice(0, 6));
                          setChangePinError(null);
                        }}
                        placeholder="••••••"
                        className="w-full tracking-widest text-base font-mono py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-neutral-400 font-medium block mb-1">
                        Confirmar Novo PIN:
                      </label>
                      <input
                        type="password"
                        maxLength={6}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={changePinConfirm}
                        onChange={(e) => {
                          setChangePinConfirm(e.target.value.replace(/\D/g, '').slice(0, 6));
                          setChangePinError(null);
                        }}
                        placeholder="••••••"
                        className="w-full tracking-widest text-base font-mono py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {changePinError && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{changePinError}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={handleChangeAdminPin}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Novo PIN Mestre</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      handleLockAdminPanel();
                    }}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-neutral-950 hover:bg-red-500/15 text-red-400 font-bold text-xs flex items-center justify-center gap-1.5 border border-neutral-800 hover:border-red-500/30 cursor-pointer transition"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Bloquear Painel Agora</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: AUDITORIA & LOGS */}
            {securityModalTab === 'audit' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Registro das últimas 50 atividades e tentativas de autenticação:</span>
                  {auditLogs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuditLogs([]);
                        executeAndLog(() => {
                          localStorage.removeItem('luxebio_admin_audit_logs_v1');
                        }, 'clearAuditLogs');
                        showToast('🧹 Histórico de auditoria limpo.');
                      }}
                      className="text-[11px] text-neutral-400 hover:text-red-400 cursor-pointer underline"
                    >
                      Limpar registros
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {auditLogs.length === 0 ? (
                    <div className="p-6 text-center text-xs text-neutral-500 bg-neutral-950 rounded-2xl border border-neutral-800">
                      Nenhum evento registrado ainda nesta sessão.
                    </div>
                  ) : (
                    auditLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                log.status === 'success'
                                  ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                                  : log.status === 'lockout'
                                  ? 'bg-red-500 animate-ping'
                                  : log.status === 'failed'
                                  ? 'bg-red-400'
                                  : 'bg-amber-400'
                              }`}
                            />
                            <span className="font-semibold text-white">{log.event}</span>
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono">
                            {new Date(log.timestamp).toLocaleString('pt-BR')} · {log.device}
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded text-[9.5px] font-bold font-mono uppercase shrink-0 border ${
                            log.status === 'success'
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                              : log.status === 'lockout'
                              ? 'bg-red-500/15 text-red-300 border-red-500/30'
                              : log.status === 'failed'
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          }`}
                        >
                          {log.status === 'success'
                            ? 'Sucesso'
                            : log.status === 'lockout'
                            ? 'Bloqueio'
                            : log.status === 'failed'
                            ? 'Falha'
                            : 'Alerta'}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-neutral-800 flex justify-end">
                  <button
                    type="button"
                    onClick={async () => {
                      const text = auditLogs.map(l => `[${l.timestamp}] (${l.status.toUpperCase()}) ${l.event} - ${l.device}`).join('\n');
                      await safeCopyText(text);
                      showToast('📋 Logs de auditoria copiados para a área de transferência!');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copiar Relatório de Auditoria</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
  );
};

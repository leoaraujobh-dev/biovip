'use client'

import React from 'react'
import {
  X,
  ShieldCheck,
  Key,
  History,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Check,
  Timer,
  ShieldAlert
} from 'lucide-react'
import { AccessLogEntry, SecurityConfig } from '@/services/adminAuthService'

interface AdminSecurityModalProps {
  isOpen: boolean
  onClose: () => void
  securityTab: 'senha' | 'auditoria' | 'politicas'
  setSecurityTab: (tab: 'senha' | 'auditoria' | 'politicas') => void
  handleUpdateSecret: (e: React.FormEvent) => void
  oldSecretInput: string
  setOldSecretInput: (val: string) => void
  newPinInput: string
  setNewPinInput: (val: string) => void
  confirmNewSecretInput: string
  setConfirmNewSecretInput: (val: string) => void
  securityFeedback: { type: 'success' | 'error'; msg: string } | null
  securityLogs: AccessLogEntry[]
  securityConfig: SecurityConfig
  setSecurityConfig: React.Dispatch<React.SetStateAction<SecurityConfig>>
  saveSecurityConfig: (cfg: SecurityConfig) => void
}

export default function AdminSecurityModal({
  isOpen,
  onClose,
  securityTab,
  setSecurityTab,
  handleUpdateSecret,
  oldSecretInput,
  setOldSecretInput,
  newPinInput,
  setNewPinInput,
  confirmNewSecretInput,
  setConfirmNewSecretInput,
  securityFeedback,
  securityLogs,
  securityConfig,
  setSecurityConfig,
  saveSecurityConfig
}: AdminSecurityModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F141F] border border-stone-700/80 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho do Modal */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Central de Segurança Master
            </h3>
            <p className="text-xs text-stone-400">
              Proteção de credenciais, logs de auditoria e políticas de acesso ao painel ADM.
            </p>
          </div>
        </div>

        {/* Navegação entre Abas do Modal */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <button
            type="button"
            onClick={() => setSecurityTab('senha')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 ${
              securityTab === 'senha'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Alterar Senha / PIN</span>
          </button>

          <button
            type="button"
            onClick={() => setSecurityTab('auditoria')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 ${
              securityTab === 'auditoria'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Logs de Acesso ({securityLogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSecurityTab('politicas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center gap-1.5 ${
              securityTab === 'politicas'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Políticas de Sessão</span>
          </button>
        </div>

        {/* ABA 1: ALTERAR SENHA / PIN MASTER */}
        {securityTab === 'senha' && (
          <form onSubmit={handleUpdateSecret} className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-400/5 border border-amber-400/20 text-[11px] text-stone-300 leading-relaxed">
              A nova credencial será criptografada imediatamente com <strong>SHA-256 + Salt dinâmico</strong>. Você pode cadastrar um PIN numérico (ex: 6 dígitos) ou uma Senha Mestra alfanumérica.
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Senha ou PIN Atual
                </label>
                <input
                  type="password"
                  value={oldSecretInput}
                  onChange={(e) => setOldSecretInput(e.target.value)}
                  placeholder="Digite a credencial atual (padrão: 230217)"
                  required
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Nova Senha ou Novo PIN
                </label>
                <input
                  type="password"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="Mínimo 4 caracteres ou dígitos"
                  required
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  Confirmar Nova Senha ou PIN
                </label>
                <input
                  type="password"
                  value={confirmNewSecretInput}
                  onChange={(e) => setConfirmNewSecretInput(e.target.value)}
                  placeholder="Repita exatamente a nova credencial"
                  required
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {securityFeedback && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                securityFeedback.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
              }`}>
                {securityFeedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                <span>{securityFeedback.msg}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-white transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs hover:brightness-110 transition shadow-md flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Salvar e Criptografar</span>
              </button>
            </div>
          </form>
        )}

        {/* ABA 2: LOGS DE AUDITORIA DE ACESSO */}
        {securityTab === 'auditoria' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Últimos registros de autenticação (armazenados localmente):</span>
              <span className="font-mono text-[10px] text-amber-400">{securityLogs.length} eventos</span>
            </div>

            {securityLogs.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-500 bg-stone-900/50 rounded-2xl border border-stone-800">
                Nenhum registro de acesso gravado até o momento.
              </div>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {securityLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 ${
                      log.success
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-stone-200'
                        : 'bg-rose-500/5 border-rose-500/20 text-stone-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        log.success ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {log.success ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          <span>{log.success ? 'Acesso Permitido' : 'Tentativa Bloqueada'}</span>
                          {log.reason && (
                            <span className="text-[10px] font-mono text-stone-400">· {log.reason}</span>
                          )}
                        </div>
                        <p className="text-[10px] text-stone-500 truncate max-w-sm font-mono mt-0.5">
                          {log.userAgent}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-stone-400 shrink-0">
                      {new Date(log.timestamp).toLocaleString('pt-BR')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABA 3: POLÍTICAS DE SESSÃO & SEGURANÇA */}
        {securityTab === 'politicas' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Timer className="w-4 h-4 text-amber-400" />
                Auto-Lock por Inatividade
              </h4>
              <p className="text-stone-400 leading-relaxed text-[11.5px]">
                Caso o painel fique aberto sem movimentação do mouse ou teclas, a sessão é automaticamente bloqueada para evitar acesso indevido em máquinas compartilhadas.
              </p>
              <div className="flex items-center gap-2 pt-1">
                {[15, 30, 60].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      const updated = { ...securityConfig, inactivityTimeoutMinutes: mins }
                      setSecurityConfig(updated)
                      saveSecurityConfig(updated)
                    }}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs border transition ${
                      securityConfig.inactivityTimeoutMinutes === mins
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : 'bg-stone-800 border-stone-700 text-stone-300 hover:border-amber-400/50'
                    }`}
                  >
                    {mins} minutos {mins === 30 && '(Padrão)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Regra Anti-Brute-Force
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-stone-400 text-[11px] leading-relaxed">
                <li>Máximo de <strong>5 tentativas incorretas</strong> consecutivas.</li>
                <li>Bloqueio obrigatório de <strong>15 minutos</strong> ao atingir o limite.</li>
                <li>Delay anti-timing attack de <strong>500ms</strong> aplicado a cada verificação.</li>
                <li>Sessão com assinatura criptográfica vinculada à credencial do administrador.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

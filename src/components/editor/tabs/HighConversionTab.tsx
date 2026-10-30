import React from 'react';
import { Sparkles, AlertCircle, CalendarClock, Users, Calendar } from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { ModuleColorControls } from '../ModuleColorControls';

export interface HighConversionTabProps {
  data: typeof INITIAL_DATA;
  setData: React.Dispatch<React.SetStateAction<typeof INITIAL_DATA>>;
  theme: any;
}

export function HighConversionTab({
  data,
  setData,
  theme,
}: HighConversionTabProps) {
  return (
    <div className="space-y-6">
      {/* MASTER TOGGLE FOR OPTION 2 */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-neutral-950 border border-amber-500/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-amber-300">
                Módulo de Recursos de Alta Conversão (Opção 2)
              </h3>
              <p className="text-[10px] text-neutral-300">
                Ative ou desative todos os recursos de Prova Social, Timer Regressivo e Embed neste microsite.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.highConversion?.enabled ?? true}
              onChange={(e) =>
                setData(p => ({
                  ...p,
                  highConversion: { ...p.highConversion, enabled: e.target.checked },
                }))
              }
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
          </label>
        </div>

        {!data.highConversion?.enabled && (
          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Recursos de Alta Conversão estão DESATIVADOS para este microsite. Nenhuma notificação de prova social ou timer aparecerá.</span>
          </div>
        )}
      </div>

      {data.highConversion?.enabled && (
        <div className="space-y-5">
          {/* RECURSO 1: TIMER REGRESSIVO DE ESCASSEZ */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-neutral-200">1. Timer Regressivo de Urgência & Escassez</span>
              </div>
              <input
                type="checkbox"
                checked={data.highConversion?.urgencyTimer?.enabled ?? true}
                onChange={(e) =>
                  setData(p => ({
                    ...p,
                    highConversion: {
                      ...p.highConversion,
                      urgencyTimer: { ...p.highConversion.urgencyTimer, enabled: e.target.checked },
                    },
                  }))
                }
                className="accent-amber-500 cursor-pointer"
              />
            </div>

            {data.highConversion?.urgencyTimer?.enabled && (
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Título do Banner de Urgência</label>
                  <input
                    type="text"
                    value={data.highConversion?.urgencyTimer?.headline || '🔥 CONDIÇÃO ESPECIAL DE HOJE'}
                    onChange={(e) =>
                      setData(p => ({
                        ...p,
                        highConversion: {
                          ...p.highConversion,
                          urgencyTimer: { ...p.highConversion.urgencyTimer, headline: e.target.value },
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Subtítulo Explicativo</label>
                  <input
                    type="text"
                    value={data.highConversion?.urgencyTimer?.subheadline || 'Garanta sua vaga com atendimento prioritário antes que expire:'}
                    onChange={(e) =>
                      setData(p => ({
                        ...p,
                        highConversion: {
                          ...p.highConversion,
                          urgencyTimer: { ...p.highConversion.urgencyTimer, subheadline: e.target.value },
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                  />
                </div>

                <div className="w-1/2">
                  <label className="text-[10px] text-neutral-400 block mb-1">Minutos de Contagem</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={data.highConversion?.urgencyTimer?.minutes || 15}
                    onChange={(e) =>
                      setData(p => ({
                        ...p,
                        highConversion: {
                          ...p.highConversion,
                          urgencyTimer: { ...p.highConversion.urgencyTimer, minutes: Number(e.target.value) },
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold font-mono"
                  />
                </div>
                <ModuleColorControls
                  moduleKey="urgencyTimer"
                  moduleLabel="Timer Regressivo de Urgência"
                  fields={[
                    { field: 'headlineColor', label: 'Cor do Título', fallback: theme.accent },
                    { field: 'textColor', label: 'Cor do Subtítulo', fallback: theme.textMuted },
                    { field: 'accentColor', label: 'Cor do Relógio (14:52)', fallback: theme.accent },
                    { field: 'bgColor', label: 'Fundo do Banner', fallback: theme.socialBg },
                  ]}
                  data={data}
                  setData={setData}
                />
              </div>
            )}
          </div>

          {/* RECURSO 2: NOTIFICAÇÃO FLUTUANTE DE PROVA SOCIAL */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-neutral-200">2. Notificações Flutuantes de Prova Social</span>
              </div>
              <input
                type="checkbox"
                checked={data.highConversion?.socialProof?.enabled ?? true}
                onChange={(e) =>
                  setData(p => ({
                    ...p,
                    highConversion: {
                      ...p.highConversion,
                      socialProof: { ...p.highConversion.socialProof, enabled: e.target.checked },
                    },
                  }))
                }
                className="accent-amber-500 cursor-pointer"
              />
            </div>

            {data.highConversion?.socialProof?.enabled && (
              <div className="space-y-2 pt-1">
                <span className="text-[10px] text-neutral-400 block">
                  Agendamentos e contatos fictícios para gerar prova social em tempo real:
                </span>
                {data.highConversion?.socialProof?.notifications.map((notif, idx) => (
                  <div key={notif.id} className="flex items-center gap-2 bg-neutral-900 p-2 rounded-lg border border-neutral-800">
                    <span className="text-amber-400 text-xs">●</span>
                    <input
                      type="text"
                      value={notif.clientName}
                      onChange={(e) => {
                        const newNotifs = [...data.highConversion.socialProof.notifications];
                        newNotifs[idx].clientName = e.target.value;
                        setData(p => ({ ...p, highConversion: { ...p.highConversion, socialProof: { ...p.highConversion.socialProof, notifications: newNotifs } } }));
                      }}
                      placeholder="Nome"
                      className="w-24 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-white font-bold"
                    />
                    <input
                      type="text"
                      value={notif.action}
                      onChange={(e) => {
                        const newNotifs = [...data.highConversion.socialProof.notifications];
                        newNotifs[idx].action = e.target.value;
                        setData(p => ({ ...p, highConversion: { ...p.highConversion, socialProof: { ...p.highConversion.socialProof, notifications: newNotifs } } }));
                      }}
                      placeholder="Ação"
                      className="flex-1 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-300"
                    />
                    <input
                      type="text"
                      value={notif.timeAgo}
                      onChange={(e) => {
                        const newNotifs = [...data.highConversion.socialProof.notifications];
                        newNotifs[idx].timeAgo = e.target.value;
                        setData(p => ({ ...p, highConversion: { ...p.highConversion, socialProof: { ...p.highConversion.socialProof, notifications: newNotifs } } }));
                      }}
                      placeholder="Tempo"
                      className="w-20 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-400 text-center"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECURSO 3: EMBED DE AGENDAMENTO INCORPORADO */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-neutral-200">3. Iframe de Agendamento Incorporado (Cal.com / Typebot)</span>
              </div>
              <input
                type="checkbox"
                checked={data.highConversion?.embeddedBooking?.enabled ?? false}
                onChange={(e) =>
                  setData(p => ({
                    ...p,
                    highConversion: {
                      ...p.highConversion,
                      embeddedBooking: { ...p.highConversion.embeddedBooking, enabled: e.target.checked },
                    },
                  }))
                }
                className="accent-amber-500 cursor-pointer"
              />
            </div>

            {data.highConversion?.embeddedBooking?.enabled && (
              <div className="space-y-2 pt-1">
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Título da Seção de Agendamento</label>
                  <input
                    type="text"
                    value={data.highConversion?.embeddedBooking?.title || '📅 Agendamento Direto na Agenda'}
                    onChange={(e) =>
                      setData(p => ({
                        ...p,
                        highConversion: {
                          ...p.highConversion,
                          embeddedBooking: { ...p.highConversion.embeddedBooking, title: e.target.value },
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">URL do Iframe (Cal.com / Typebot / Google Forms)</label>
                  <input
                    type="text"
                    placeholder="https://cal.com/seu-usuario"
                    value={data.highConversion?.embeddedBooking?.iframeUrl || ''}
                    onChange={(e) =>
                      setData(p => ({
                        ...p,
                        highConversion: {
                          ...p.highConversion,
                          embeddedBooking: { ...p.highConversion.embeddedBooking, iframeUrl: e.target.value },
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

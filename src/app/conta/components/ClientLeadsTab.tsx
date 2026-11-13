'use client'

import React from 'react'
import { Download, Users, MessageCircle } from 'lucide-react'
import { LeadSubmission } from '@/services/biositeService'

interface ClientLeadsTabProps {
  activeSidebarTab: string
  businessTitle?: string
  slug?: string
  leadsList: LeadSubmission[]
  loadingLeads: boolean
  leadFilter: 'TODOS' | 'WHATSAPP' | 'QUIZ' | 'CATALOGO'
  setLeadFilter: (filter: 'TODOS' | 'WHATSAPP' | 'QUIZ' | 'CATALOGO') => void
  handleExportLeadsCsv: () => void
  connectedGateways: Record<string, boolean>
  toggleGateway: (id: string) => void
}

export default function ClientLeadsTab({
  activeSidebarTab,
  businessTitle,
  slug,
  leadsList,
  loadingLeads,
  leadFilter,
  setLeadFilter,
  handleExportLeadsCsv,
  connectedGateways,
  toggleGateway
}: ClientLeadsTabProps) {
  return (
    <>
      {activeSidebarTab === 'vendas' && (
                <div className="space-y-10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                      CONFIGURAR CONTA DE RECEBIMENTO
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-stone-900">
                      Recebimentos & Gateways
                    </h2>
                    <p className="text-xs text-stone-500 mt-1">
                      Conecte a sua conta e a loja passa a receber Pix, cartão e boleto na própria página.
                    </p>
                  </div>

                  {/* 4 GATEWAYS BRASILEIROS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-stone-900">Mercado Pago</h3>
                          {connectedGateways.mercadopago && <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">CONECTADO</span>}
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Pix, cartão e boleto. O que o comprador brasileiro conhece.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleGateway('mercadopago')}
                        className={`text-xs font-mono uppercase font-bold tracking-wider text-left transition ${
                          connectedGateways.mercadopago ? 'text-rose-600 hover:underline' : 'text-stone-900 hover:underline'
                        }`}
                      >
                        {connectedGateways.mercadopago ? 'DESCONECTAR ✕' : 'CONECTAR →'}
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-stone-900">Asaas</h3>
                          {connectedGateways.asaas && <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">CONECTADO</span>}
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Pix, boleto e assinatura recorrente.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleGateway('asaas')}
                        className={`text-xs font-mono uppercase font-bold tracking-wider text-left transition ${
                          connectedGateways.asaas ? 'text-rose-600 hover:underline' : 'text-stone-900 hover:underline'
                        }`}
                      >
                        {connectedGateways.asaas ? 'DESCONECTAR ✕' : 'CONECTAR →'}
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-stone-900">PagBank</h3>
                          {connectedGateways.pagbank && <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">CONECTADO</span>}
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Pix e cartão, com a maquininha que a loja já usa.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleGateway('pagbank')}
                        className={`text-xs font-mono uppercase font-bold tracking-wider text-left transition ${
                          connectedGateways.pagbank ? 'text-rose-600 hover:underline' : 'text-stone-900 hover:underline'
                        }`}
                      >
                        {connectedGateways.pagbank ? 'DESCONECTAR ✕' : 'CONECTAR →'}
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-stone-900">InfinitePay</h3>
                          {connectedGateways.infinitepay && <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">CONECTADO</span>}
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          Pix e cartão, com taxa baixa para quem vende pouco.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleGateway('infinitepay')}
                        className={`text-xs font-mono uppercase font-bold tracking-wider text-left transition ${
                          connectedGateways.infinitepay ? 'text-rose-600 hover:underline' : 'text-stone-900 hover:underline'
                        }`}
                      >
                        {connectedGateways.infinitepay ? 'DESCONECTAR ✕' : 'CONECTAR →'}
                      </button>
                    </div>
                  </div>

                  {/* VENDAS DA LOJA */}
                  <div className="pt-6 border-t border-stone-100">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                      VENDAS · {businessTitle || 'TESTE'}
                    </span>
                    <div className="text-2xl font-bold font-mono text-stone-900 mb-2">0 vendas</div>
                    <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
                      Nenhuma venda ainda. Assim que alguém fechar uma sacola na sua loja, ela aparece aqui — paga pela página ou combinada no WhatsApp.
                    </p>
                  </div>
                </div>
              )}

              {/* ABA LEADS & CONTATOS (CRM EM TEMPO REAL COM SUPABASE) */}
              {activeSidebarTab === 'leads' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                        CRM & CONVERSÃO EM TEMPO REAL
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                        Leads & Triagens
                      </h2>
                      <p className="text-xs text-stone-500 mt-1">
                        Visitantes que clicaram no WhatsApp, preencheram triagens ou solicitaram serviços na sua página.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleExportLeadsCsv}
                        disabled={leadsList.length === 0}
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Exportar CSV
                      </button>
                    </div>
                  </div>

                  {/* CARDS DE MÉTRICAS */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block mb-1">TOTAL DE LEADS</span>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-stone-900">{leadsList.length}</div>
                      <span className="text-[10px] text-stone-500">Capturados</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                      <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold block mb-1">WHATSAPP</span>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-900">
                        {leadsList.filter((l: any) => l.action_type === 'whatsapp_click').length}
                      </div>
                      <span className="text-[10px] text-emerald-600">Cliques diretos</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                      <span className="text-[10px] font-mono uppercase text-amber-700 font-bold block mb-1">TRIAGENS / QUIZ</span>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-900">
                        {leadsList.filter((l: any) => l.action_type === 'quiz_completed').length}
                      </div>
                      <span className="text-[10px] text-amber-600">Funil respondido</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200">
                      <span className="text-[10px] font-mono uppercase text-purple-700 font-bold block mb-1">CATÁLOGO</span>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-purple-900">
                        {leadsList.filter((l: any) => l.action_type === 'catalog_inquiry').length}
                      </div>
                      <span className="text-[10px] text-purple-600">Interesses em serviços</span>
                    </div>
                  </div>

                  {/* FILTROS */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {(['TODOS', 'WHATSAPP', 'QUIZ', 'CATALOGO'] as const).map(tab => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setLeadFilter(tab)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition cursor-pointer ${
                          leadFilter === tab
                            ? 'bg-black text-white shadow-xs'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                        }`}
                      >
                        {tab === 'TODOS' ? 'Todos os Leads' : tab === 'WHATSAPP' ? 'WhatsApp' : tab === 'QUIZ' ? 'Triagens' : 'Catálogo'}
                      </button>
                    ))}
                  </div>

                  {/* LISTA DE LEADS */}
                  {loadingLeads ? (
                    <div className="p-12 text-center text-xs font-mono text-stone-400">
                      Carregando leads do Supabase...
                    </div>
                  ) : leadsList.length === 0 ? (
                    <div className="p-10 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mx-auto text-stone-500">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-stone-900 text-sm">Nenhum lead registrado ainda</h3>
                      <p className="text-xs text-stone-500 max-w-md mx-auto">
                        Quando um visitante abrir sua página <strong>/{slug}</strong> e clicar em qualquer botão de WhatsApp ou preencher a Triagem Anti-Curiosos, o lead aparecerá aqui instantaneamente sincronizado com o Supabase.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leadsList
                        .filter(lead => {
                          if (leadFilter === 'WHATSAPP') return lead.action_type === 'whatsapp_click'
                          if (leadFilter === 'QUIZ') return lead.action_type === 'quiz_completed'
                          if (leadFilter === 'CATALOGO') return lead.action_type === 'catalog_inquiry'
                          return true
                        })
                        .map((lead, idx) => {
                          const dateStr = lead.created_at ? new Date(lead.created_at).toLocaleString('pt-BR') : 'Agora há pouco'
                          const isQuiz = lead.action_type === 'quiz_completed'
                          const phone = lead.whatsapp || lead.details?.whatsapp
                          return (
                            <div
                              key={lead.id || idx}
                              className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-stone-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                              <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                                    isQuiz
                                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  }`}>
                                    {isQuiz ? 'TRIAGEM CONCLUÍDA' : 'WHATSAPP LEAD'}
                                  </span>
                                  <span className="text-[10px] font-mono text-stone-400">
                                    {dateStr}
                                  </span>
                                  <span className="text-[10px] font-mono text-stone-500 font-bold">
                                    /{lead.slug}
                                  </span>
                                </div>

                                <div className="text-sm font-bold text-stone-900">
                                  {lead.details?.buttonLabel || lead.client_name || 'Interesse em Atendimento'}
                                </div>

                                {lead.details?.role && (
                                  <div className="text-xs text-stone-500">
                                    Segmento: <span className="text-stone-700 font-medium">{lead.details.role}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                {phone && (
                                  <a
                                    href={`https://wa.me/${phone.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    WhatsApp
                                  </a>
                                )}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  )}
                </div>
              )}
    </>
  )
}

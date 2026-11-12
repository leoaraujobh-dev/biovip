'use client'

import React from 'react'
import { ExternalLink, Save, Sparkles, Plus, Trash2 } from 'lucide-react'

interface ClientServicesTabProps {
  slug: string
  servicesCatalogData: any
  setServicesCatalogData: React.Dispatch<React.SetStateAction<any>>
  setHasUnsavedChanges: (val: boolean) => void
  handleSavePage: () => void
}

export default function ClientServicesTab({
  slug,
  servicesCatalogData,
  setServicesCatalogData,
  setHasUnsavedChanges,
  handleSavePage
}: ClientServicesTabProps) {
  return (
                <div className="space-y-8 animate-fade-in">
                  {/* CabeÃ§alho da SeÃ§Ã£o */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          EDIÃ‡ÃƒO DO CLIENTE
                        </span>
                        <span className="text-xs text-stone-400 font-mono">/{slug}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                        CatÃ¡logo de Procedimentos & PreÃ§os
                      </h2>
                      <p className="text-xs text-stone-500 max-w-xl">
                        Altere os nomes, valores fechados, duraÃ§Ãµes e mensagens diretas do WhatsApp. Suas clientes jÃ¡ chegam sabendo o preÃ§o e prontas para fechar.
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <a
                        href={`/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl border border-stone-300 hover:border-stone-900 text-stone-700 text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver no Ar</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleSavePage}
                        className="px-6 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5 text-[#E2B857]" />
                        <span>Salvar AlteraÃ§Ãµes</span>
                      </button>
                    </div>
                  </div>

                  {/* ConfiguraÃ§Ãµes Globais do CatÃ¡logo */}
                  <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <h3 className="font-bold text-sm text-stone-900">Status do CatÃ¡logo na sua PÃ¡gina</h3>
                      </div>
                      <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={servicesCatalogData.enabled}
                          onChange={(e) => {
                            setServicesCatalogData((prev: any) => ({ ...prev, enabled: e.target.checked }))
                            setHasUnsavedChanges(true)
                          }}
                          className="w-4 h-4 accent-stone-950 rounded cursor-pointer"
                        />
                        <span>{servicesCatalogData.enabled ? 'CatÃ¡logo VisÃ­vel no Bio Site' : 'CatÃ¡logo Oculto'}</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-stone-600 font-semibold mb-1">
                          TÃ­tulo do CatÃ¡logo
                        </label>
                        <input
                          type="text"
                          value={servicesCatalogData.headline}
                          onChange={(e) => {
                            setServicesCatalogData((prev: any) => ({ ...prev, headline: e.target.value }))
                            setHasUnsavedChanges(true)
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-stone-600 font-semibold mb-1">
                          SubtÃ­tulo Explicativo
                        </label>
                        <input
                          type="text"
                          value={servicesCatalogData.subtitle || ''}
                          onChange={(e) => {
                            setServicesCatalogData((prev: any) => ({ ...prev, subtitle: e.target.value }))
                            setHasUnsavedChanges(true)
                          }}
                          placeholder="Ex: Valores fechados com atendimento exclusivo"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lista de Procedimentos */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-stone-900">Procedimentos Cadastrados</h3>
                        <p className="text-xs text-stone-500">
                          VocÃª tem <strong>{servicesCatalogData.items.length} procedimentos</strong> ativos. Clique em adicionar para criar mais.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const newItem = {
                            id: `srv-${Date.now().toString().slice(-4)}`,
                            category: 'MAIS PROCURADO',
                            name: 'Novo Procedimento Exclusivo',
                            description: 'Atendimento personalizado com protocolo VIP e acompanhamento individual.',
                            price: 'R$ 200,00',
                            duration: 'â± 1h30',
                            badge: 'MAIS PROCURADO',
                            featured: true,
                            whatsappMessage: 'OlÃ¡! Gostaria de agendar este procedimento no BioVip.'
                          }
                          setServicesCatalogData((prev: any) => ({
                            ...prev,
                            items: [...prev.items, newItem]
                          }))
                          setHasUnsavedChanges(true)
                        }}
                        className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-amber-400" />
                        <span>Adicionar Novo Procedimento</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {servicesCatalogData.items.map((item: any, idx: number) => (
                        <div
                          key={item.id || idx}
                          className="p-5 rounded-3xl bg-white border border-stone-200/90 hover:border-stone-400 transition shadow-xs space-y-4"
                        >
                          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-stone-100 font-mono text-[11px] font-bold text-stone-800 flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className="font-serif font-bold text-base text-stone-900">
                                {item.name || `Procedimento #${idx + 1}`}
                              </span>
                              {item.badge && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-200">
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setServicesCatalogData((prev: any) => ({
                                  ...prev,
                                  items: prev.items.filter((_: any, i: number) => i !== idx)
                                }))
                                setHasUnsavedChanges(true)
                              }}
                              className="text-stone-400 hover:text-rose-600 transition p-1 cursor-pointer"
                              title="Excluir este procedimento"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                            <div className="sm:col-span-6">
                              <label className="block text-[10px] font-mono uppercase text-stone-500 font-semibold mb-1">
                                Nome do Procedimento
                              </label>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => {
                                  const updated = [...servicesCatalogData.items]
                                  updated[idx] = { ...updated[idx], name: e.target.value }
                                  setServicesCatalogData((prev: any) => ({ ...prev, items: updated }))
                                  setHasUnsavedChanges(true)
                                }}
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:border-stone-900"
                              />
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-[10px] font-mono uppercase text-stone-500 font-semibold mb-1">
                                Valor Fechado
                              </label>
                              <input
                                type="text"
                                value={item.price}
                                onChange={(e) => {
                                  const updated = [...servicesCatalogData.items]
                                  updated[idx] = { ...updated[idx], price: e.target.value }
                                  setServicesCatalogData((prev: any) => ({ ...prev, items: updated }))
                                  setHasUnsavedChanges(true)
                                }}
                                placeholder="R$ 180,00"
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold text-amber-800 bg-stone-50 focus:bg-white focus:outline-none focus:border-stone-900"
                              />
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-[10px] font-mono uppercase text-stone-500 font-semibold mb-1">
                                DuraÃ§Ã£o Estimada
                              </label>
                              <input
                                type="text"
                                value={item.duration || ''}
                                onChange={(e) => {
                                  const updated = [...servicesCatalogData.items]
                                  updated[idx] = { ...updated[idx], duration: e.target.value }
                                  setServicesCatalogData((prev: any) => ({ ...prev, items: updated }))
                                  setHasUnsavedChanges(true)
                                }}
                                placeholder="â± 1h30"
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:border-stone-900"
                              />
                            </div>

                            <div className="sm:col-span-12">
                              <label className="block text-[10px] font-mono uppercase text-stone-500 font-semibold mb-1">
                                DescriÃ§Ã£o dos BenefÃ­cios
                              </label>
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => {
                                  const updated = [...servicesCatalogData.items]
                                  updated[idx] = { ...updated[idx], description: e.target.value }
                                  setServicesCatalogData((prev: any) => ({ ...prev, items: updated }))
                                  setHasUnsavedChanges(true)
                                }}
                                placeholder="Breve explicaÃ§Ã£o que elimina dÃºvidas e valoriza o atendimento"
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-700 bg-stone-50 focus:bg-white focus:outline-none focus:border-stone-900"
                              />
                            </div>

                            <div className="sm:col-span-8">
                              <label className="block text-[10px] font-mono uppercase text-stone-500 font-semibold mb-1">
                                Mensagem AutomÃ¡tica para o WhatsApp
                              </label>
                              <input
                                type="text"
                                value={item.whatsappMessage || ''}
                                onChange={(e) => {
                                  const updated = [...servicesCatalogData.items]
                                  updated[idx] = { ...updated[idx], whatsappMessage: e.target.value }
                                  setServicesCatalogData((prev: any) => ({ ...prev, items: updated }))
                                  setHasUnsavedChanges(true)
                                }}
                                placeholder="Texto que chega pronto para a cliente enviar ao clicar em Agendar"
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-700 bg-stone-50 focus:bg-white focus:outline-none focus:border-stone-900"
                              />
                            </div>

                            <div className="sm:col-span-4">
                              <label className="block text-[10px] font-mono uppercase text-stone-500 font-semibold mb-1">
                                Selo de Destaque
                              </label>
                              <input
                                type="text"
                                value={item.badge || ''}
                                onChange={(e) => {
                                  const updated = [...servicesCatalogData.items]
                                  updated[idx] = { ...updated[idx], badge: e.target.value }
                                  setServicesCatalogData((prev: any) => ({ ...prev, items: updated }))
                                  setHasUnsavedChanges(true)
                                }}
                                placeholder="Ex: MAIS PROCURADO / TOP"
                                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-700 bg-stone-50 focus:bg-white focus:outline-none focus:border-stone-900"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                      <span className="text-xs text-stone-500">
                        Lembre-se de clicar em salvar para publicar as alteraÃ§Ãµes no seu link oficial.
                      </span>
                      <button
                        type="button"
                        onClick={handleSavePage}
                        className="px-8 py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-[#E2B857]" />
                        <span>Salvar ServiÃ§os no Bio Site</span>
                      </button>
                    </div>
                  </div>
                </div>
              
  )
}

'use client'

import React from 'react'
import {
  Flame,
  Sparkles,
  Plus,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Clock,
  Users,
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react'

interface ClientVipModulesTabProps {
  announcementData: { enabled: boolean; badge: string; text: string }
  setAnnouncementData: React.Dispatch<React.SetStateAction<{ enabled: boolean; badge: string; text: string }>>
  urgencyData: { enabled: boolean; headline: string; subtitle: string; minutes: number }
  setUrgencyData: React.Dispatch<React.SetStateAction<{ enabled: boolean; headline: string; subtitle: string; minutes: number }>>
  servicesCatalogData: {
    enabled: boolean
    headline: string
    subtitle?: string
    categories: string[]
    items: any[]
  }
  setServicesCatalogData: React.Dispatch<React.SetStateAction<{
    enabled: boolean
    headline: string
    subtitle?: string
    categories: string[]
    items: any[]
  }>>
  locationData: { enabled: boolean; address: string; hours: string; openStatus: string; mapsUrl: string }
  setLocationData: React.Dispatch<React.SetStateAction<{ enabled: boolean; address: string; hours: string; openStatus: string; mapsUrl: string }>>
  quizData: {
    enabled: boolean
    buttonLabel: string
    headline: string
    subtitle: string
    questions: Array<{ id: string; question: string; options: string[] }>
  }
  setQuizData: React.Dispatch<React.SetStateAction<{
    enabled: boolean
    buttonLabel: string
    headline: string
    subtitle: string
    questions: Array<{ id: string; question: string; options: string[] }>
  }>>
  metricsData: Array<{ value: string; label: string }>
  setMetricsData: React.Dispatch<React.SetStateAction<Array<{ value: string; label: string }>>>
  howItWorksData: Array<{ number: string; title: string; description: string }>
  setHowItWorksData: React.Dispatch<React.SetStateAction<Array<{ number: string; title: string; description: string }>>>
  testimonialsData: Array<{ clientName: string; city: string; text: string; rating: number }>
  setTestimonialsData: React.Dispatch<React.SetStateAction<Array<{ clientName: string; city: string; text: string; rating: number }>>>
  aboutMeData: any
  setAboutMeData: React.Dispatch<React.SetStateAction<any>>
  faqData: Array<{ question: string; answer: string }>
  setFaqData: React.Dispatch<React.SetStateAction<Array<{ question: string; answer: string }>>>
  setHasUnsavedChanges: (val: boolean) => void
  setSavedSuccess: (val: boolean) => void
  handleSavePage: () => void
  bioSiteSlug?: string
}

export default function ClientVipModulesTab({
  announcementData,
  setAnnouncementData,
  urgencyData,
  setUrgencyData,
  servicesCatalogData,
  setServicesCatalogData,
  locationData,
  setLocationData,
  quizData,
  setQuizData,
  metricsData,
  setMetricsData,
  howItWorksData,
  setHowItWorksData,
  testimonialsData,
  setTestimonialsData,
  aboutMeData,
  setAboutMeData,
  faqData,
  setFaqData,
  setHasUnsavedChanges,
  setSavedSuccess,
  handleSavePage,
  bioSiteSlug
}: ClientVipModulesTabProps) {
  const slug = bioSiteSlug || ''
  return (
    <div className="space-y-6 animate-fade-in pt-2">
      {/* 1. BARRA DE ALERTA & ESCASSEZ */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-sm text-stone-900">Barra de Alerta & Escassez</h3>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={announcementData.enabled}
              onChange={(e) => {
                setAnnouncementData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Ativar Alerta</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Badge do Alerta
            </label>
            <input
              type="text"
              value={announcementData.badge}
              onChange={(e) => {
                setAnnouncementData(prev => ({ ...prev, badge: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              placeholder="Ex: AGENDA VIP ABERTA"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Texto do Comunicado
            </label>
            <input
              type="text"
              value={announcementData.text}
              onChange={(e) => {
                setAnnouncementData(prev => ({ ...prev, text: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              placeholder="Ex: Ãšltimos horÃ¡rios disponÃ­veis para esta semana."
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={urgencyData.enabled}
              onChange={(e) => {
                setUrgencyData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>CronÃ´metro Regressivo</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Tempo:</span>
            <input
              type="number"
              min={5}
              max={60}
              value={urgencyData.minutes}
              onChange={(e) => {
                setUrgencyData(prev => ({ ...prev, minutes: Number(e.target.value) || 15 }))
                setHasUnsavedChanges(true)
              }}
              className="w-16 px-2 py-1 rounded-lg border border-stone-300 text-xs font-mono text-center"
            />
            <span className="text-xs text-stone-500">min</span>
          </div>
        </div>
      </div>

      {/* 2. CATÃLOGO DE SERVIÃ‡OS VIP */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">CatÃ¡logo de Procedimentos VIP</h3>
              <p className="text-[11px] text-stone-500">Apresente seus serviÃ§os com preÃ§o, duraÃ§Ã£o e WhatsApp individual.</p>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={servicesCatalogData.enabled}
              onChange={(e) => {
                setServicesCatalogData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Exibir CatÃ¡logo</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              TÃ­tulo da SeÃ§Ã£o
            </label>
            <input
              type="text"
              value={servicesCatalogData.headline}
              onChange={(e) => {
                setServicesCatalogData(prev => ({ ...prev, headline: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              SubtÃ­tulo
            </label>
            <input
              type="text"
              value={servicesCatalogData.subtitle || ''}
              onChange={(e) => {
                setServicesCatalogData(prev => ({ ...prev, subtitle: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Lista de Itens do CatÃ¡logo */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800">Procedimentos ({servicesCatalogData.items.length})</span>
            <button
              type="button"
              onClick={() => {
                const newItem = {
                  id: `srv-${Date.now().toString().slice(-4)}`,
                  category: 'MAIS PROCURADO',
                  name: 'Novo Procedimento VIP',
                  description: 'DescriÃ§Ã£o do procedimento exclusivo com atendimento personalizado.',
                  price: 'R$ 250',
                  duration: 'â± 1h30',
                  badge: 'MAIS PROCURADO',
                  featured: true,
                  whatsappMessage: 'OlÃ¡! Gostaria de agendar este procedimento.'
                }
                setServicesCatalogData(prev => ({
                  ...prev,
                  items: [...prev.items, newItem]
                }))
                setHasUnsavedChanges(true)
              }}
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-black text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition shadow-2xs"
            >
              <Plus className="w-3 h-3" /> Adicionar Procedimento
            </button>
          </div>

          {servicesCatalogData.items.map((item, idx) => (
            <div key={item.id || idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-600">Procedimento #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    setServicesCatalogData(prev => ({
                      ...prev,
                      items: prev.items.filter((_, i) => i !== idx)
                    }))
                    setHasUnsavedChanges(true)
                  }}
                  className="text-stone-400 hover:text-rose-600 text-xs font-semibold cursor-pointer"
                >
                  Excluir
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-stone-500 mb-0.5">Nome do Procedimento</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...servicesCatalogData.items]
                      updated[idx].name = e.target.value
                      setServicesCatalogData(prev => ({ ...prev, items: updated }))
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-stone-500 mb-0.5">Categoria / Aba</label>
                  <select
                    value={item.category || 'MAIS PROCURADO'}
                    onChange={(e) => {
                      const updated = [...servicesCatalogData.items]
                      updated[idx].category = e.target.value
                      setServicesCatalogData(prev => ({ ...prev, items: updated }))
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-2 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900 cursor-pointer"
                  >
                    <option value="TODOS">TODOS</option>
                    <option value="MAIS PROCURADO">MAIS PROCURADO</option>
                    <option value="EXCLUSIVO">EXCLUSIVO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-stone-500 mb-0.5">PreÃ§o / Investimento</label>
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => {
                      const updated = [...servicesCatalogData.items]
                      updated[idx].price = e.target.value
                      setServicesCatalogData(prev => ({ ...prev, items: updated }))
                      setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: R$ 250 ou Sob Consulta"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-stone-500 mb-0.5">DuraÃ§Ã£o Estimada</label>
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => {
                      const updated = [...servicesCatalogData.items]
                      updated[idx].duration = e.target.value
                      setServicesCatalogData(prev => ({ ...prev, items: updated }))
                      setHasUnsavedChanges(true)
                    }}
                    placeholder="Ex: â± 1h30"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-stone-500 mb-0.5">DescriÃ§Ã£o Curta</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...servicesCatalogData.items]
                    updated[idx].description = e.target.value
                    setServicesCatalogData(prev => ({ ...prev, items: updated }))
                    setHasUnsavedChanges(true)
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                />
              </div>

              {/* Foto do ServiÃ§o / Procedimento e Modo de ExibiÃ§Ã£o */}
              <div className="pt-2 border-t border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-semibold text-stone-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Foto do Procedimento:</span>
                  </label>

                  {/* Alternador de Layout */}
                  <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-300">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...servicesCatalogData.items]
                        updated[idx].imageLayout = 'thumb'
                        setServicesCatalogData(prev => ({ ...prev, items: updated }))
                        setHasUnsavedChanges(true)
                      }}
                      className={`px-2 py-0.5 rounded text-[8.5px] font-bold font-mono transition cursor-pointer ${
                        (item.imageLayout || 'thumb') === 'thumb'
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Miniatura
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...servicesCatalogData.items]
                        updated[idx].imageLayout = 'cover'
                        setServicesCatalogData(prev => ({ ...prev, items: updated }))
                        setHasUnsavedChanges(true)
                      }}
                      className={`px-2 py-0.5 rounded text-[8.5px] font-bold font-mono transition cursor-pointer ${
                        item.imageLayout === 'cover'
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Imagem Maior
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.image || ''}
                    onChange={(e) => {
                      const updated = [...servicesCatalogData.items]
                      updated[idx].image = e.target.value
                      if (!updated[idx].imageLayout) updated[idx].imageLayout = 'thumb'
                      setServicesCatalogData(prev => ({ ...prev, items: updated }))
                      setHasUnsavedChanges(true)
                    }}
                    placeholder="URL da foto (ex: https://images.unsplash.com/...)"
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900 focus:border-amber-500 focus:outline-none"
                  />
                  {item.image && (
                    <img
                      src={item.image}
                      alt="Thumb"
                      className="w-7 h-7 rounded-lg object-cover border border-amber-500 shrink-0"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. LOCALIZAÃ‡ÃƒO & ROTAS (GPS WAZE / UBER / MAPS) */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">LocalizaÃ§Ã£o & Rotas com GPS</h3>
              <p className="text-[11px] text-stone-500">BotÃµes de rota direta no Waze, Google Maps e Uber.</p>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={locationData.enabled}
              onChange={(e) => {
                setLocationData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Exibir LocalizaÃ§Ã£o</span>
          </label>
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              EndereÃ§o Completo
            </label>
            <input
              type="text"
              value={locationData.address}
              onChange={(e) => {
                setLocationData(prev => ({ ...prev, address: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              placeholder="Ex: Av. Boa Viagem, 2190 - Sala 918 Â· Recife, PE"
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                HorÃ¡rios de Atendimento
              </label>
              <input
                type="text"
                value={locationData.hours}
                onChange={(e) => {
                  setLocationData(prev => ({ ...prev, hours: e.target.value }))
                  setHasUnsavedChanges(true)
                }}
                placeholder="Ex: Seg a Sex Â· 08:30 Ã s 19:30"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                Status Atual de Funcionamento
              </label>
              <input
                type="text"
                value={locationData.openStatus}
                onChange={(e) => {
                  setLocationData(prev => ({ ...prev, openStatus: e.target.value }))
                  setHasUnsavedChanges(true)
                }}
                placeholder="Ex: Aberto Agora Â· Agendamento VIP"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. TRIAGEM ANTI-CURIOSOS (QUIZ / FUNIL) */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Triagem Anti-Curiosos (Funil de Perguntas)</h3>
              <p className="text-[11px] text-stone-500">Qualifica o visitante antes de levar a conversa pronta para o WhatsApp.</p>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={quizData.enabled}
              onChange={(e) => {
                setQuizData(prev => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Ativar Triagem</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Texto do BotÃ£o de Abertura
            </label>
            <input
              type="text"
              value={quizData.buttonLabel}
              onChange={(e) => {
                setQuizData(prev => ({ ...prev, buttonLabel: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              TÃ­tulo do Modal
            </label>
            <input
              type="text"
              value={quizData.headline}
              onChange={(e) => {
                setQuizData(prev => ({ ...prev, headline: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 5. INDICADORES DE AUTORIDADE / MÃ‰TRICAS */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Indicadores de Autoridade & Prova Social</h3>
              <p className="text-[11px] text-stone-500">NÃºmeros que geram autoridade imediata no topo do perfil.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setMetricsData(prev => [...prev, { value: '+500', label: 'CASOS ATENDIDOS' }])
              setHasUnsavedChanges(true)
            }}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <Plus className="w-3 h-3" /> Adicionar MÃ©trica
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {metricsData.map((m, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-2 relative">
              <button
                type="button"
                onClick={() => {
                  setMetricsData(prev => prev.filter((_, i) => i !== idx))
                  setHasUnsavedChanges(true)
                }}
                className="absolute top-2 right-2 text-stone-400 hover:text-rose-600 text-[11px] font-bold cursor-pointer"
              >
                âœ•
              </button>
              <div>
                <label className="block text-[9px] font-mono uppercase text-stone-400 font-bold mb-0.5">
                  NÃšMERO / VALOR
                </label>
                <input
                  type="text"
                  value={m.value}
                  onChange={(e) => {
                    const up = [...metricsData]
                    up[idx].value = e.target.value
                    setMetricsData(up)
                    setHasUnsavedChanges(true)
                  }}
                  className="w-full px-2.5 py-1 rounded-lg border border-stone-300 text-xs font-mono font-bold bg-white text-stone-900"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono uppercase text-stone-400 font-bold mb-0.5">
                  RÃ“TULO
                </label>
                <input
                  type="text"
                  value={m.label}
                  onChange={(e) => {
                    const up = [...metricsData]
                    up[idx].label = e.target.value
                    setMetricsData(up)
                    setHasUnsavedChanges(true)
                  }}
                  className="w-full px-2.5 py-1 rounded-lg border border-stone-300 text-[11px] bg-white text-stone-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. COMO FUNCIONA (PASSO A PASSO) */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Como Funciona (3 Etapas)</h3>
              <p className="text-[11px] text-stone-500">Explica a jornada do cliente desde o primeiro clique atÃ© a entrega.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setHowItWorksData(prev => [
                ...prev,
                { number: `0${prev.length + 1}`, title: 'Nova Etapa VIP', description: 'ExplicaÃ§Ã£o clara deste passo.' }
              ])
              setHasUnsavedChanges(true)
            }}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <Plus className="w-3 h-3" /> Adicionar Passo
          </button>
        </div>

        <div className="space-y-2.5">
          {howItWorksData.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3">
              <input
                type="text"
                value={step.number}
                onChange={(e) => {
                  const up = [...howItWorksData]
                  up[idx].number = e.target.value
                  setHowItWorksData(up)
                  setHasUnsavedChanges(true)
                }}
                className="w-12 px-2 py-1.5 rounded-lg border border-stone-300 text-xs font-mono font-bold text-center bg-white"
              />
              <div className="flex-1 space-y-1.5">
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => {
                    const up = [...howItWorksData]
                    up[idx].title = e.target.value
                    setHowItWorksData(up)
                    setHasUnsavedChanges(true)
                  }}
                  placeholder="TÃ­tulo da Etapa"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-bold bg-white text-stone-900"
                />
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) => {
                    const up = [...howItWorksData]
                    up[idx].description = e.target.value
                    setHowItWorksData(up)
                    setHasUnsavedChanges(true)
                  }}
                  placeholder="DescriÃ§Ã£o da etapa"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-[11px] bg-white text-stone-700"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setHowItWorksData(prev => prev.filter((_, i) => i !== idx))
                  setHasUnsavedChanges(true)
                }}
                className="text-stone-400 hover:text-rose-600 text-xs font-bold pt-1 cursor-pointer"
              >
                âœ•
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 7. DEPOIMENTOS & AVALIAÃ‡Ã•ES VIP */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Depoimentos & AvaliaÃ§Ãµes VIP</h3>
              <p className="text-[11px] text-stone-500">Relatos reais de clientes com estrelas e procedÃªncia.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setTestimonialsData(prev => [
                ...prev,
                { clientName: 'Novo Cliente', city: 'Sua Cidade - UF', text: 'Atendimento espetacular, superou todas as expectativas!', rating: 5 }
              ])
              setHasUnsavedChanges(true)
            }}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <Plus className="w-3 h-3" /> Adicionar Depoimento
          </button>
        </div>

        <div className="space-y-3">
          {testimonialsData.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-600">Depoimento #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    setTestimonialsData(prev => prev.filter((_, i) => i !== idx))
                    setHasUnsavedChanges(true)
                  }}
                  className="text-stone-400 hover:text-rose-600 text-xs font-semibold cursor-pointer"
                >
                  Excluir
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-stone-500 mb-0.5">Nome do Cliente</label>
                  <input
                    type="text"
                    value={item.clientName}
                    onChange={(e) => {
                      const up = [...testimonialsData]
                      up[idx].clientName = e.target.value
                      setTestimonialsData(up)
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-stone-500 mb-0.5">Cidade / Estado</label>
                  <input
                    type="text"
                    value={item.city}
                    onChange={(e) => {
                      const up = [...testimonialsData]
                      up[idx].city = e.target.value
                      setTestimonialsData(up)
                      setHasUnsavedChanges(true)
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-stone-500 mb-0.5">Depoimento / Texto</label>
                <textarea
                  rows={2}
                  value={item.text}
                  onChange={(e) => {
                    const up = [...testimonialsData]
                    up[idx].text = e.target.value
                    setTestimonialsData(up)
                    setHasUnsavedChanges(true)
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900 resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. SOBRE MIM ESTENDIDO */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-stone-700" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Sobre Mim & Posicionamento VIP</h3>
              <p className="text-[11px] text-stone-500">HistÃ³rico profissional e diferenciais para reforÃ§ar credibilidade.</p>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={aboutMeData.enabled}
              onChange={(e) => {
                setAboutMeData((prev: any) => ({ ...prev, enabled: e.target.checked }))
                setHasUnsavedChanges(true)
              }}
              className="accent-black w-4 h-4 rounded"
            />
            <span>Exibir SeÃ§Ã£o</span>
          </label>
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              TÃ­tulo da SeÃ§Ã£o
            </label>
            <input
              type="text"
              value={aboutMeData.headline}
              onChange={(e) => {
                setAboutMeData((prev: any) => ({ ...prev, headline: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Texto de ApresentaÃ§Ã£o & Autoridade
            </label>
            <textarea
              rows={3}
              value={aboutMeData.paragraph}
              onChange={(e) => {
                setAboutMeData((prev: any) => ({ ...prev, paragraph: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Frase de Assinatura / Fechamento
            </label>
            <input
              type="text"
              value={aboutMeData.closingPhrase}
              onChange={(e) => {
                setAboutMeData((prev: any) => ({ ...prev, closingPhrase: e.target.value }))
                setHasUnsavedChanges(true)
              }}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 9. PERGUNTAS FREQUENTES (FAQ) */}
      <div className="p-5 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <div>
              <h3 className="font-bold text-sm text-stone-900">Perguntas Frequentes (FAQ)</h3>
              <p className="text-[11px] text-stone-500">Elimine objeÃ§Ãµes comuns antes do primeiro contato.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setFaqData(prev => [
                ...prev,
                { question: 'Nova Pergunta?', answer: 'Resposta explicativa sobre este assunto.' }
              ])
              setHasUnsavedChanges(true)
            }}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <Plus className="w-3 h-3" /> Adicionar Pergunta
          </button>
        </div>

        <div className="space-y-3">
          {faqData.map((faqItem, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-600">Pergunta #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    setFaqData(prev => prev.filter((_, i) => i !== idx))
                    setHasUnsavedChanges(true)
                  }}
                  className="text-stone-400 hover:text-rose-600 text-xs font-semibold cursor-pointer"
                >
                  Excluir
                </button>
              </div>

              <div>
                <input
                  type="text"
                  value={faqItem.question}
                  onChange={(e) => {
                    const up = [...faqData]
                    up[idx].question = e.target.value
                    setFaqData(up)
                    setHasUnsavedChanges(true)
                  }}
                  placeholder="Qual Ã© a pergunta?"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-bold bg-white text-stone-900"
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  value={faqItem.answer}
                  onChange={(e) => {
                    const up = [...faqData]
                    up[idx].answer = e.target.value
                    setFaqData(up)
                    setHasUnsavedChanges(true)
                  }}
                  placeholder="Resposta explicativa clara..."
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs bg-white text-stone-900 resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTÃƒO FIXO DE SALVAMENTO DE MÃ“DULOS */}
      <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            handleSavePage()
            setSavedSuccess(true)
            setTimeout(() => setSavedSuccess(false), 3500)
          }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          SALVAR MÃ“DULOS VIP NO AR
        </button>

        <a
          href={`/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1 transition"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Abrir BioSite para testar
        </a>
      </div>
    </div>
  )
}

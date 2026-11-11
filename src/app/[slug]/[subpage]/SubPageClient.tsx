'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  Share2,
  MessageCircle,
  Star,
  ChevronRight,
  ShieldCheck,
  Check,
  ShoppingBag,
  Utensils
} from 'lucide-react'
import { PageTemplate } from '@/data/pageTemplates'
import { projects } from '@/data/projects'
import { PALETTES, TYPOGRAPHIES } from '@/data/bioSiteDesign'

interface SubPageClientProps {
  slug: string
  subpage: string
  name: string
  role: string
  whatsapp: string
  template: PageTemplate
}

export default function SubPageClient({
  slug,
  subpage,
  name,
  role,
  whatsapp,
  template
}: SubPageClientProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [selectedDate, setSelectedDate] = useState('15/11')
  const [selectedTime, setSelectedTime] = useState('14:30')
  const [leadTrackedToast, setLeadTrackedToast] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Recupera dados salvos localmente e fallback do projeto
  const [modelData, setModelData] = useState<any>(() => {
    return projects.find(p => p.slug === slug)
  })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('biovip_site_' + slug)
      if (saved) {
        setModelData((prev: any) => ({ ...(prev || {}), ...JSON.parse(saved) }))
      }
    } catch (e) {}
  }, [slug])

  const effWhatsapp = modelData?.whatsapp || whatsapp
  const cleanWhatsapp = effWhatsapp.replace(/\D/g, '')

  const triggerHaptic = (ms: number = 14) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(ms)
      } catch {}
    }
  }

  // Recupera paleta e tipografia do projeto com suporte a edições
  const resolvedPaletteId = modelData?.paletteId || 'luxo_nude'
  const resolvedTypographyId = modelData?.typographyId || 'instrument'
  const palette = PALETTES.find(p => p.id === resolvedPaletteId) || PALETTES[0]
  const typography = TYPOGRAPHIES.find(t => t.id === resolvedTypographyId) || TYPOGRAPHIES[0]

  const handleTrackLead = (actionLabel: string) => {
    if (typeof window !== 'undefined') {
      const w = window as any
      if (w.fbq) {
        w.fbq('track', 'Lead', {
          content_name: `${template.title} - ${actionLabel}`,
          content_category: role,
          value: 0.0,
          currency: 'BRL'
        })
      }
    }
    setLeadTrackedToast(actionLabel)
    setTimeout(() => setLeadTrackedToast(null), 3000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${template.title} — ${name}`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  return (
    <div
      className="min-h-screen text-stone-200 flex flex-col items-center justify-start p-0 sm:py-8 font-sans selection:bg-amber-500/20"
      style={{ backgroundColor: palette.bg }}
    >
      <div
        className="relative w-full max-w-[420px] min-h-screen sm:min-h-[844px] sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col border sm:border-stone-800/80"
        style={{
          backgroundColor: palette.bg,
          color: palette.text
        }}
      >
        {/* BARRA SUPERIOR DE NAVEGAÇÃO */}
        <header
          className="sticky top-0 z-30 px-5 py-4 backdrop-blur-md border-b flex items-center justify-between"
          style={{
            backgroundColor: `${palette.bg}ee`,
            borderColor: `${palette.accent}22`
          }}
        >
          <Link
            href={`/${slug}`}
            onClick={() => triggerHaptic(12)}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-stone-300 hover:text-amber-400 transition font-bold"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" /> BioSite
          </Link>

          <span className="text-[11px] font-serif font-bold text-stone-300 truncate max-w-[180px]">
            {name}
          </span>

          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-stone-800/60 hover:bg-stone-700/80 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            title="Compartilhar"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </header>

        {copiedLink && (
          <div className="px-4 py-2 bg-black/90 text-center text-xs font-mono text-emerald-400 border-b border-emerald-500/20">
            Link copiado para a área de transferência!
          </div>
        )}

        {/* CONTEÚDO DA PÁGINA ADICIONAL */}
        <main className="flex-1 px-5 py-6 space-y-6">
          {/* Cabeçalho da Seção */}
          <div className="text-center space-y-1.5">
            <span
              className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold block"
              style={{ color: palette.accent }}
            >
              PÁGINA EXCLUSIVA · {role.toUpperCase()}
            </span>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{
                fontFamily: typography.cssFont,
                color: palette.text
              }}
            >
              {template.title}
            </h1>
            <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
              {template.description}
            </p>
          </div>

          {/* 1. MODELO ANTES E DEPOIS (INTERATIVO COM SLIDER DE ARRASTO) */}
          {(template.previewType === 'before_after' || subpage === 'resultados' || subpage === 'transformacoes') && (
            <div className="space-y-4">
              <div className="relative w-full h-72 rounded-3xl overflow-hidden border border-stone-800 shadow-xl select-none">
                {/* Imagem "Depois" (Fundo) */}
                <div
                  className="absolute inset-0 bg-cover bg-center flex items-end p-4"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop)'
                  }}
                >
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                    DEPOIS (RESULTADO FINAL)
                  </span>
                </div>

                {/* Imagem "Antes" (Cortada pelo Slider) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div
                    className="absolute inset-y-0 left-0 w-[420px] bg-cover bg-center flex items-end p-4"
                    style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop)'
                    }}
                  >
                    <span className="px-2.5 py-1 rounded-full bg-black/80 text-stone-300 font-mono text-[10px] font-bold border border-white/20">
                      ANTES
                    </span>
                  </div>
                </div>

                {/* Linha Divisória com Alça de Arrasto */}
                <div
                  className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-stone-950 flex items-center justify-center font-bold text-xs shadow-xl">
                    ⇄
                  </div>
                </div>

                {/* Input Invisível para Arrastar */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                  aria-label="Arrastar comparativo de antes e depois"
                />
              </div>

              <div
                className="p-4 rounded-2xl border text-xs space-y-1 text-center"
                style={{
                  backgroundColor: palette.card,
                  borderColor: `${palette.accent}33`
                }}
              >
                <span className="font-bold text-white block">Transformação & Resultados Reais</span>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Arraste a barra para o lado para verificar os detalhes de acabamento, simetria e naturalidade.
                </p>
              </div>
            </div>
          )}

          {/* 2. MODELO DE AGENDA (INTERATIVO COM ESCOLHA DE HORÁRIO) */}
          {(template.previewType === 'booking' || subpage === 'agenda' || subpage.includes('reserva') || subpage.includes('agenda')) && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-2">
                  1. SELECIONE A DATA DISPONÍVEL
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {['15/11', '16/11', '17/11', '18/11'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`py-3 rounded-2xl text-xs font-mono font-bold transition cursor-pointer border ${
                        selectedDate === d
                          ? 'shadow-md'
                          : 'hover:border-stone-700'
                      }`}
                      style={{
                        backgroundColor: selectedDate === d ? palette.accent : palette.card,
                        color: selectedDate === d ? (palette.buttonText || '#000') : palette.text,
                        borderColor: selectedDate === d ? palette.accent : `${palette.accent}22`
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-2">
                  2. SELECIONE O HORÁRIO LIVRE
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00', '10:30', '14:00', '15:30', '17:00', '18:30'].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setSelectedTime(h)}
                      className={`py-2.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer border ${
                        selectedTime === h
                          ? 'shadow-md'
                          : 'hover:border-stone-700'
                      }`}
                      style={{
                        backgroundColor: selectedTime === h ? palette.accent : palette.card,
                        color: selectedTime === h ? (palette.buttonText || '#000') : palette.text,
                        borderColor: selectedTime === h ? palette.accent : `${palette.accent}22`
                      }}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="p-3.5 rounded-2xl border text-xs flex items-center gap-2"
                style={{
                  backgroundColor: `${palette.accent}15`,
                  borderColor: `${palette.accent}35`,
                  color: palette.accent
                }}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Horário pré-selecionado: <strong>{selectedDate} às {selectedTime}</strong></span>
              </div>
            </div>
          )}

          {/* 3. MODELO DE SERVIÇOS E PREÇOS */}
          {(template.previewType === 'services' || subpage === 'servicos' || subpage.includes('menu') || subpage.includes('alongamentos') || subpage.includes('tecnicas') || subpage.includes('protocolos') || subpage.includes('procedimentos')) && (
            <div className="space-y-3">
              {[
                { title: `Procedimento VIP — ${role}`, duration: 'Sessão Individual', desc: 'Atendimento com diagnóstico personalizado e materiais de primeira linha.', tag: 'MAIS PROCURADO' },
                { title: 'Protocolo Exclusivo & Acompanhamento', duration: 'Personalizado', desc: 'Planejamento detalhado para os melhores resultados com técnica refinada.', tag: 'EXCLUSIVO' },
                { title: 'Manutenção / Retorno Periódico', duration: 'Conforme Avaliação', desc: 'Preservação de resultados e durabilidade estendida com suporte prioritário.' }
              ].map((svc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border space-y-2 transition"
                  style={{
                    backgroundColor: palette.card,
                    borderColor: `${palette.accent}33`
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {svc.tag && (
                        <span
                          className="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase border"
                          style={{
                            backgroundColor: `${palette.accent}15`,
                            color: palette.accent,
                            borderColor: `${palette.accent}35`
                          }}
                        >
                          {svc.tag}
                        </span>
                      )}
                      <h3 className="font-bold text-sm text-white mt-1">{svc.title}</h3>
                    </div>
                    <div className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-500" /> {svc.duration}
                    </div>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">{svc.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* 4. MODELO DE AVALIAÇÕES & PROVA SOCIAL */}
          {(template.previewType === 'reviews' || subpage === 'avaliacoes' || subpage === 'depoimentos') && (
            <div className="space-y-3">
              <div
                className="p-4 rounded-2xl border text-center space-y-1"
                style={{
                  backgroundColor: `${palette.accent}12`,
                  borderColor: `${palette.accent}30`
                }}
              >
                <div className="text-amber-400 text-sm">★★★★★</div>
                <div className="text-xl font-bold font-mono text-white">5.0 de 5.0</div>
                <span className="text-[10px] text-stone-400 font-mono">Mais de 180 avaliações de clientes verificadas</span>
              </div>

              {[
                { name: 'Mariana Silveira', text: 'Atendimento impecável! A atenção e a clareza técnica da equipe me deram total segurança. O resultado superou qualquer expectativa.', city: 'São Paulo · SP' },
                { name: 'Rodrigo Medeiros', text: 'Pontualidade britânica e clínica de primeiro mundo. Recomendo de olhos fechados para quem busca o melhor tratamento da região.', city: 'Rio de Janeiro · RJ' }
              ].map((rev, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border space-y-2"
                  style={{
                    backgroundColor: palette.card,
                    borderColor: `${palette.accent}22`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{rev.name}</span>
                    <span className="text-amber-400 text-xs">★★★★★</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed italic">"{rev.text}"</p>
                  <span className="text-[9px] font-mono text-stone-500 block">{rev.city}</span>
                </div>
              ))}
            </div>
          )}

          {/* 5. MODELO DE CARDÁPIO / MENU DIGITAL */}
          {(template.previewType === 'menu_digital' || subpage.includes('cardapio') || subpage.includes('degustacao')) && (
            <div className="space-y-3">
              {[
                { name: 'Menu Degustação em 7 Tempos', price: 'R$ 380', desc: 'Sequência sensorial autoral com entradas finas, pratos principais e sobremesa do Chef.' },
                { name: 'Harmonização de Vinhos Grandes Crus', price: 'R$ 240', desc: 'Seleção especial do Sommelier com rótulos franceses e italianos selecionados.' },
                { name: 'Sobremesa Signature — Texturas de Cacau', price: 'Inclusa', desc: 'Chocolate 70%, praliné de avelãs e sorbet de frutas vermelhas silvestres.' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border space-y-1"
                  style={{
                    backgroundColor: palette.card,
                    borderColor: `${palette.accent}30`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-white">{item.name}</h3>
                    <span className="font-mono text-xs font-bold" style={{ color: palette.accent }}>{item.price}</span>
                  </div>
                  <p className="text-[11px] text-stone-400">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* 6. MODELO DE CATÁLOGO DE PRODUTOS */}
          {(template.previewType === 'catalog_products' || subpage.includes('colecoes') || subpage.includes('catalogo')) && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Solitário Diamante 1ct', tag: 'OURO 18K', desc: 'Lapidação brilhante com certificado GIA.' },
                { name: 'Aliança Pavê Diamantes', tag: 'AUTORAL', desc: 'Design exclusivo trabalhado à mão.' },
                { name: 'Gargantilha Ponto de Luz', tag: 'CLÁSSICO', desc: 'Ouro branco e diamante lapidado.' },
                { name: 'Brinco Gota Esmeralda', tag: 'COLOMBIANA', desc: 'Esmeralda natural lapidação gota.' }
              ].map((prod, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border space-y-1.5 text-center flex flex-col justify-between"
                  style={{
                    backgroundColor: palette.card,
                    borderColor: `${palette.accent}30`
                  }}
                >
                  <div className="w-full h-24 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" style={{ color: palette.accent }} />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-wider block" style={{ color: palette.accent }}>
                      {prod.tag}
                    </span>
                    <h3 className="font-bold text-xs text-white mt-0.5">{prod.name}</h3>
                    <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-2">{prod.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BOTÃO PRINCIPAL DE CONVERSÃO NO WHATSAPP */}
          <div className="pt-4 space-y-3">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Olá! Estou na página "${template.title}" do seu Bio Site (${name}) e gostaria de agendar meu atendimento.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                triggerHaptic(14)
                handleTrackLead('Confirmar no WhatsApp')
              }}
              className="w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: palette.accent,
                color: palette.buttonText || '#000'
              }}
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Confirmar Atendimento no WhatsApp</span>
            </a>

            <div className="text-center pt-1">
              <Link
                href={`/${slug}`}
                onClick={() => triggerHaptic(12)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 text-stone-300 hover:text-white text-[11px] font-mono font-bold transition shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>Voltar ao Perfil Principal</span>
              </Link>
            </div>
          </div>
        </main>

        {/* RODAPÉ ELEGANTE */}
        <footer
          className="px-5 py-4 border-t text-center"
          style={{ borderColor: `${palette.accent}20` }}
        >
          <p className="text-[10px] text-stone-500 font-mono">
            © 2026 {name} · Página Adicional Pro
          </p>
        </footer>

        {/* TOAST DE FEEDBACK DO PIXEL */}
        {leadTrackedToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-500 text-stone-950 font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>Lead registrado no Pixel ({leadTrackedToast})</span>
          </div>
        )}
      </div>
    </div>
  )
}

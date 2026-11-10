'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Eye
} from 'lucide-react'

const heroPreviews = [
  {
    id: 'ana',
    name: 'Dra. Ana Freire',
    role: 'Odontologia Estética & Reabilitação',
    badge: 'CRO 45.291-SP',
    photo: 'https://images.unsplash.com/photo-1594824813589-a9a7d32e92c2?q=80&w=900&auto=format&fit=crop',
    bgColor: '#1c1917',
    textColor: '#f5f5f4',
    accentColor: '#d97706',
    slug: 'dra-ana-freire',
    primaryButton: 'Agendar Consulta VIP',
    secondaryButton: 'Ver Transformações Antes & Depois',
    thirdButton: 'Tabela de Procedimentos',
  },
  {
    id: 'iris',
    name: 'Studio Íris',
    role: 'Lash Designer & Master em Olhar',
    badge: 'Master Certificada',
    photo: 'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?q=80&w=900&auto=format&fit=crop',
    bgColor: '#181216',
    textColor: '#fdf2f8',
    accentColor: '#db2777',
    slug: 'studio-iris',
    primaryButton: 'Garantir meu Horário na Agenda',
    secondaryButton: 'Menu de Técnicas de Cílios',
    thirdButton: 'Galeria de Olhares Reais',
  },
  {
    id: 'renato',
    name: 'Dr. Renato Andrade',
    role: 'Cirurgia Plástica & Reconstrução',
    badge: 'CRM 128.490-SP · RQE',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=900&auto=format&fit=crop',
    bgColor: '#0f172a',
    textColor: '#f8fafc',
    accentColor: '#0ea5e9',
    slug: 'dr-renato-andrade',
    primaryButton: 'Falar com Secretária Executiva',
    secondaryButton: 'Procedimentos & Hospital',
    thirdButton: 'Corpo Clínico & Currículo',
  },
]

export default function Hero() {
  const [selectedPreview, setSelectedPreview] = useState(heroPreviews[0])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 lg:pt-32 pb-20 overflow-hidden bg-white">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 -z-10" />

      <div className="container-main relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Social Proof */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs sm:text-sm font-semibold border border-primary-200/60 shadow-xs">
              <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
              <span>BIOVIP · O PADRÃO OURO DE BIO SITES</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-900 leading-[1.12] tracking-tight">
              O Bio Site de alto padrão que transforma seguidores em{' '}
              <span className="relative inline-block text-primary-600">
                clientes de alto valor
                <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-primary-100 -z-10 rounded-sm" />
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-dark-600 max-w-2xl font-sans leading-relaxed">
              O fim dos links genéricos e avatares sem vida. O <strong>BioVip</strong> une fotografia com dissolução de estúdio, design editorial de revista, 3 páginas Pro completas e rastreamento nativo de leads no WhatsApp.
            </p>

            {/* Micro Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-dark-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Retrato com fusão de estúdio orgânica</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-dark-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>3 Páginas Pro (Antes & Depois, Agenda e Tabela)</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-dark-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Meta Pixel & TikTok Pixel nativos no WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-dark-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Display de Balcão em Alta Resolução incluso</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/starter"
                className="btn-primary inline-flex items-center justify-center gap-2 text-base px-8 py-4 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 w-full sm:w-auto font-bold"
              >
                Criar meu BioVip Agora
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="btn-secondary text-base px-7 py-4 w-full sm:w-auto border-stone-300 hover:border-dark-900 font-semibold"
              >
                Ver Casos Reais na Vitrine
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1594824813589-a9a7d32e92c2?q=80&w=200&auto=format&fit=crop"
                  alt="Dra Ana"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"
                  alt="Dr Renato"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?q=80&w=200&auto=format&fit=crop"
                  alt="Studio Iris"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                  alt="Dra Carolina"
                />
              </div>
              <div className="text-left text-xs sm:text-sm text-dark-600">
                <div className="flex items-center text-amber-500 font-bold">
                  ★★★★★ <span className="text-dark-900 font-semibold ml-1.5">4.9 / 5</span>
                </div>
                <div>Mais de 1.400 marcas e profissionais ativos</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Interactive Theme Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl border border-stone-200 mb-4 max-w-full overflow-x-auto">
              {heroPreviews.map((preview) => (
                <button
                  key={preview.id}
                  onClick={() => setSelectedPreview(preview)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    selectedPreview.id === preview.id
                      ? 'bg-white text-dark-900 shadow-sm border border-stone-200/80'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {preview.name.split(' ')[0]} ({preview.id === 'ana' ? 'Odonto' : preview.id === 'iris' ? 'Lash' : 'Médico'})
                </button>
              ))}
            </div>

            {/* iPhone 16 Pro Frame */}
            <div className="relative w-[300px] sm:w-[320px] aspect-[9/19] rounded-[48px] p-3 bg-stone-900 shadow-2xl ring-1 ring-white/20 border-4 border-stone-800">
              
              {/* Dynamic Island */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[9px] font-mono font-bold text-stone-300 tracking-wider">
                  BIOVIP LIVE
                </span>
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>

              {/* Floating Badge Left */}
              <div className="absolute -left-6 top-24 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-emerald-100 flex items-center gap-2 z-30 animate-bounce duration-1000 hidden sm:flex">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  ⚡
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-emerald-800">Meta Pixel Ativo</div>
                  <div className="text-[9px] text-stone-500">Lead disparado</div>
                </div>
              </div>

              {/* Floating Badge Right */}
              <div className="absolute -right-6 bottom-28 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-amber-100 flex items-center gap-2 z-30 hidden sm:flex">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                  📈
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-amber-800">+142% Cliques</div>
                  <div className="text-[9px] text-stone-500">WhatsApp direto</div>
                </div>
              </div>

              {/* Inside Screen Content */}
              <div
                className="w-full h-full rounded-[38px] overflow-hidden relative flex flex-col justify-between pt-10 pb-6 px-4 text-center transition-colors duration-500"
                style={{ backgroundColor: selectedPreview.bgColor, color: selectedPreview.textColor }}
              >
                {/* Organic Studio Fade Image */}
                <div className="relative w-full aspect-[4/4] rounded-2xl overflow-hidden mb-2 group">
                  <Image
                    src={selectedPreview.photo}
                    alt={selectedPreview.name}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to top, ${selectedPreview.bgColor} 0%, transparent 60%)`,
                    }}
                  />
                </div>

                {/* Professional Name & Title */}
                <div className="relative -mt-6 z-10 space-y-1">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono border border-white/10">
                    {selectedPreview.badge}
                  </div>
                  <div className="font-serif text-lg font-bold tracking-tight">
                    {selectedPreview.name}
                  </div>
                  <div className="text-[11px] opacity-80 line-clamp-1">
                    {selectedPreview.role}
                  </div>
                </div>

                {/* Simulated High-Converting Buttons */}
                <div className="space-y-2 mt-3">
                  <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center justify-between shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedPreview.primaryButton}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    {/* Shimmer sweep effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>

                  <div className="p-2 rounded-xl bg-white/10 border border-white/10 text-[11px] flex items-center justify-between opacity-90">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>{selectedPreview.secondaryButton}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </div>

                  <div className="p-2 rounded-xl bg-white/10 border border-white/10 text-[11px] flex items-center justify-between opacity-90">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-sky-300" />
                      <span>{selectedPreview.thirdButton}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </div>
                </div>

                {/* Bottom link to view live */}
                <div className="pt-2">
                  <Link
                    href={`/${selectedPreview.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[10px] underline opacity-70 hover:opacity-100"
                  >
                    <span>Ver biosite em tela cheia</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Caption under phone */}
            <p className="text-xs text-stone-400 mt-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Exibindo prévia real de cliente BioVip
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

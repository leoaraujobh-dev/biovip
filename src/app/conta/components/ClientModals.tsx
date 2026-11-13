'use client'

import React from 'react'
import {
  Check,
  Copy,
  MessageCircle,
  Clock,
  CreditCard,
  Sparkles,
  ArrowRight,
  Download,
  X
} from 'lucide-react'
import { DEMO_PHOTOS } from '@/data/bioSiteDesign'

interface ClientModalsProps {
  pixModalOpen: boolean
  setPixModalOpen: (val: boolean) => void
  pixCopied: boolean
  setPixCopied: (val: boolean) => void
  slug: string
  brandName: string
  remainingHours: number
  showPendingPaymentModal: boolean
  setShowPendingPaymentModal: (val: boolean) => void
  setActiveSidebarTab: (tab: any) => void
  setOpenAccordion: (val: any) => void
  storyModalOpen: boolean
  setStoryModalOpen: (val: boolean) => void
  handleDownloadStoryPng: () => void
  copiedLink: boolean
  setCopiedLink: (val: boolean) => void
  monogram: string
  customPhotoSrc?: string | null
  demoGender: 'mulher' | 'homem'
  businessTitle?: string | null
  currentView?: string
  niche: string
  rating: number | string
  isGeneratingStoryPng: boolean
  fullUrl: string
}

export default function ClientModals({
  pixModalOpen,
  setPixModalOpen,
  pixCopied,
  setPixCopied,
  slug,
  brandName,
  remainingHours,
  showPendingPaymentModal,
  setShowPendingPaymentModal,
  setActiveSidebarTab,
  setOpenAccordion,
  storyModalOpen,
  setStoryModalOpen,
  handleDownloadStoryPng,
  copiedLink,
  setCopiedLink,
  monogram,
  customPhotoSrc,
  demoGender,
  businessTitle,
  currentView,
  niche,
  rating,
  isGeneratingStoryPng,
  fullUrl
}: ClientModalsProps) {
  const pixCopyCode = `00020126580014br.gov.bcb.pix0136biovip-${slug}-2026520400005303986540555.925802BR5925BIOVIP TECNOLOGIA LTDA6009SAO PAULO62070503***6304ABCD`

  return (
    <>
      {/* MODAL PIX */}
      {pixModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setPixModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-900 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block mb-1">
                RENOVAÇÃO DE ANUIDADE
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Plano Pro · R$ 290,00
              </h3>
            </div>

            <div className="flex justify-center">
              <div className="p-3 bg-white rounded-2xl border-2 border-stone-900 shadow-md">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=31991390202"
                  alt="QR Code Pix"
                  className="w-44 h-44 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold block mb-1">
                  CHAVE PIX (TELEFONE CELULAR)
                </span>
                <span className="font-mono text-base font-bold text-stone-900">
                  (31) 99139-0202
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('31991390202')
                  setPixCopied(true)
                  setTimeout(() => setPixCopied(false), 2000)
                }}
                className="w-full py-3 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {pixCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {pixCopied ? 'Chave Celular Copiada com Sucesso!' : 'Copiar Chave Pix (31991390202)'}
              </button>

              <a
                href={`https://wa.me/5531991390202?text=${encodeURIComponent(`Olá! Realizei o pagamento via Pix de renovação do BioSite e gostaria de enviar o comprovante.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs block text-center"
              >
                <MessageCircle className="w-3.5 h-3.5 inline mr-1" />
                Enviar Comprovante pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CRIAÇÃO COM SUCESSO & PAGAMENTO PENDENTE (EXIGÊNCIA DO CLIENTE) */}
      {showPendingPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowPendingPaymentModal(false)}
              className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 shadow-xs">
                <Clock className="w-7 h-7 animate-pulse text-amber-600" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 font-bold inline-block">
                STATUS: PAGAMENTO PENDENTE
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Seu Bio Site foi criado com sucesso!
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed space-y-2">
              <p className="font-semibold text-amber-950">
                Seu Bio Site se encontra com <strong>pagamento pendente</strong>.
              </p>
              <p className="text-stone-800">
                Se após <strong>48 horas</strong> o pagamento não for confirmado, o Bio Site <code className="font-mono font-bold text-amber-950">biovip.com.br/{slug}</code> será suspenso.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-xs text-amber-900 font-bold">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Período de tolerância ativo: {remainingHours}h restantes</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 text-center leading-relaxed">
              Você já tem acesso livre para editar os textos, botões e catálogo do seu Bio Site, mas não esqueça de regularizar seu plano para manter seu link oficial permanentemente no ar.
            </p>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowPendingPaymentModal(false)
                  if (currentView === 'dashboard') {
                    setActiveSidebarTab('pagamento')
                  } else {
                    setOpenAccordion('pagamento')
                  }
                }}
                className="w-full py-3.5 rounded-2xl bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>IR PARA A ABA DE PAGAMENTO & REGULARIZAR →</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPendingPaymentModal(false)}
                className="w-full py-2.5 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-semibold transition cursor-pointer"
              >
                Continuar Editando por Enquanto ({remainingHours}h ativas)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PREVIEW DO CARD OFICIAL PARA STORY (9:16) */}
      {storyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="bg-[#12151c] border border-amber-400/30 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-white my-auto">
            <button
              onClick={() => setStoryModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                PRÉVIA OFICIAL · STORY 9:16
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                Card para Instagram Story
              </h3>
            </div>

            {/* O CARD 9:16 SIMULADO EM ALTA RESOLUÇÃO */}
            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-gradient-to-b from-stone-900 via-stone-950 to-black p-5 flex flex-col justify-between select-none">
              {/* Topo do Story: Logo/Monograma & Status */}
              <div className="flex items-center justify-between">
                <span className="font-serif italic text-lg font-bold text-amber-400">{monogram}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[8px] font-mono font-bold uppercase tracking-wider">
                  ● NO AR NO INSTAGRAM
                </span>
              </div>

              {/* Centro: Foto de Estúdio com Moldura Dourada & Nome */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.25)] relative p-1 bg-gradient-to-tr from-amber-400 to-amber-200">
                  <img
                    src={customPhotoSrc || (demoGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)}
                    alt={brandName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-white leading-tight">
                    {brandName}
                  </h4>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-amber-300/90 mt-0.5">
                    {businessTitle || niche}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[9px] font-mono text-stone-200">
                  ★ {rating} · Avaliações 5 Estrelas no Google
                </div>
              </div>

              {/* Rodapé do Story: Sticker Simulador do Link do Instagram */}
              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-white text-stone-950 font-bold flex items-center justify-between shadow-2xl border border-white/50">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-mono tracking-tight uppercase">biovip.com.br/{slug}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-900" />
                </div>
                <p className="text-[9px] font-mono text-center text-stone-400 uppercase tracking-wider">
                  Toque na figurinha para agendar
                </p>
              </div>
            </div>

            {/* Ações: Baixar Imagem HD, Copiar Link e Fechar */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={isGeneratingStoryPng}
                onClick={handleDownloadStoryPng}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-mono font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer disabled:opacity-60"
              >
                {isGeneratingStoryPng ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Gerando Imagem HD (1080x1920)...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Imagem PNG para o Story</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(fullUrl)
                  setCopiedLink(true)
                  setTimeout(() => setCopiedLink(false), 2000)
                }}
                className="w-full py-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-400/40 text-stone-200 font-mono font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link para a Figurinha'}</span>
              </button>
              <button
                type="button"
                onClick={() => setStoryModalOpen(false)}
                className="w-full py-2 rounded-xl text-stone-400 hover:text-white text-xs transition cursor-pointer"
              >
                Fechar Prévia
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

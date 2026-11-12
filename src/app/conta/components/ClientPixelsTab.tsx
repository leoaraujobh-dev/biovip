'use client'

import React from 'react'
import { CheckCircle2 } from 'lucide-react'

interface ClientPixelsTabProps {
  metaPixelId: string
  setMetaPixelId: (id: string) => void
  googleAnalyticsId: string
  setGoogleAnalyticsId: (id: string) => void
  tiktokPixelId: string
  setTiktokPixelId: (id: string) => void
  trackWhatsappLead: boolean
  setTrackWhatsappLead: React.Dispatch<React.SetStateAction<boolean>>
  trackPageView: boolean
  setTrackPageView: React.Dispatch<React.SetStateAction<boolean>>
  pixelSavedSuccess: boolean
  handleSavePixels: () => void
}

export default function ClientPixelsTab({
  metaPixelId,
  setMetaPixelId,
  googleAnalyticsId,
  setGoogleAnalyticsId,
  tiktokPixelId,
  setTiktokPixelId,
  trackWhatsappLead,
  setTrackWhatsappLead,
  trackPageView,
  setTrackPageView,
  pixelSavedSuccess,
  handleSavePixels
}: ClientPixelsTabProps) {
  return (
    <div className="space-y-6 animate-fade-in pt-2">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-600 block font-bold">
            RASTREAMENTO & CONVERSÃ•ES
          </span>
          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-mono font-bold">
            PRO & AGÃŠNCIA
          </span>
        </div>
        <h3 className="text-lg font-serif font-bold text-stone-900">
          Pixels de TrÃ¡fego Pago & AnÃºncios
        </h3>
        <p className="text-xs text-stone-500 mt-0.5">
          Rastreie cliques no WhatsApp, visualizaÃ§Ãµes de catÃ¡logo e conversÃµes de Meta Ads, Google Ads e TikTok.
        </p>
      </div>

      {pixelSavedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Pixels salvos com sucesso! Os eventos serÃ£o disparados no seu BioSite.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* META ADS */}
        <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-stone-900">Meta Pixel (Facebook)</span>
            {metaPixelId ? (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">ATIVO</span>
            ) : (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 font-bold">PENDENTE</span>
            )}
          </div>
          <div>
            <label className="text-[9px] font-mono uppercase text-stone-400 block font-bold mb-1">PIXEL ID</label>
            <input
              type="text"
              value={metaPixelId}
              onChange={(e) => setMetaPixelId(e.target.value)}
              placeholder="Ex: 123456789012345"
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-mono bg-stone-50 text-stone-900"
            />
          </div>
        </div>

        {/* GA4 */}
        <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-stone-900">Google GA4</span>
            {googleAnalyticsId ? (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">ATIVO</span>
            ) : (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 font-bold">PENDENTE</span>
            )}
          </div>
          <div>
            <label className="text-[9px] font-mono uppercase text-stone-400 block font-bold mb-1">ID MEDIÃ‡ÃƒO GA4</label>
            <input
              type="text"
              value={googleAnalyticsId}
              onChange={(e) => setGoogleAnalyticsId(e.target.value)}
              placeholder="Ex: G-ABC123XYZ"
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-mono bg-stone-50 text-stone-900"
            />
          </div>
        </div>

        {/* TIKTOK */}
        <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-stone-900">TikTok Pixel</span>
            {tiktokPixelId ? (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">ATIVO</span>
            ) : (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 font-bold">PENDENTE</span>
            )}
          </div>
          <div>
            <label className="text-[9px] font-mono uppercase text-stone-400 block font-bold mb-1">PIXEL ID TIKTOK</label>
            <input
              type="text"
              value={tiktokPixelId}
              onChange={(e) => setTiktokPixelId(e.target.value)}
              placeholder="Ex: C1234567890"
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs font-mono bg-stone-50 text-stone-900"
            />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={trackWhatsappLead}
            onChange={(e) => setTrackWhatsappLead(e.target.checked)}
            className="mt-0.5 accent-black w-4 h-4 rounded cursor-pointer"
          />
          <div>
            <span className="text-xs font-bold text-stone-900">Disparar evento &apos;Lead&apos; ao tocar no WhatsApp</span>
            <p className="text-[11px] text-stone-500">Mede conversÃ£o real de campanhas de trÃ¡fego pago.</p>
          </div>
        </label>

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={trackPageView}
            onChange={(e) => setTrackPageView(e.target.checked)}
            className="mt-0.5 accent-black w-4 h-4 rounded cursor-pointer"
          />
          <div>
            <span className="text-xs font-bold text-stone-900">Disparar &apos;PageView&apos; e &apos;ViewContent&apos; ao abrir o BioSite</span>
            <p className="text-[11px] text-stone-500">Permite criar pÃºblicos de remarketing para quem visitou seu link.</p>
          </div>
        </label>
      </div>

      <button
        type="button"
        onClick={handleSavePixels}
        className="px-6 py-2.5 rounded-xl bg-black hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm"
      >
        SALVAR CONFIGURAÃ‡ÃƒO DE PIXELS
      </button>
    </div>
  
  )
}

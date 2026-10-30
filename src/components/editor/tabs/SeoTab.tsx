import React from 'react';
import { Globe, Upload, MessageCircle } from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';

export interface SeoTabProps {
  data: typeof INITIAL_DATA;
  setData: React.Dispatch<React.SetStateAction<typeof INITIAL_DATA>>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
}

export function SeoTab({ data, setData, handleFileUpload }: SeoTabProps) {
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
          <Globe className="w-4 h-4" /> Configuração do Card de Compartilhamento no WhatsApp & Redes
        </span>

        <div className="space-y-2.5 pt-1">
          <div>
            <label className="text-[11px] text-neutral-300 block mb-1">Título de Pré-Visualização (Meta Title)</label>
            <input
              type="text"
              value={data.seo?.metaTitle || ''}
              onChange={(e) => setData(p => ({ ...p, seo: { ...p.seo, metaTitle: e.target.value } }))}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold"
            />
          </div>

          <div>
            <label className="text-[11px] text-neutral-300 block mb-1">Descrição Curta do Link (Meta Description)</label>
            <textarea
              rows={2}
              value={data.seo?.metaDescription || ''}
              onChange={(e) => setData(p => ({ ...p, seo: { ...p.seo, metaDescription: e.target.value } }))}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 resize-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] text-neutral-300">Foto do Card Social (OpenGraph Image)</label>
              <label className="text-[10px] text-amber-400 hover:underline cursor-pointer flex items-center gap-1">
                <Upload className="w-3 h-3" /> Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, (base64) => setData(p => ({ ...p, seo: { ...p.seo, ogImageUrl: base64 } })))}
                />
              </label>
            </div>
            <input
              type="text"
              value={data.seo?.ogImageUrl || ''}
              onChange={(e) => setData(p => ({ ...p, seo: { ...p.seo, ogImageUrl: e.target.value } }))}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
            />
          </div>
        </div>
      </div>

      {/* SIMULADOR REALISTA DO CARD DO WHATSAPP */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4" /> Pré-Visualização Real de como o Link aparece no WhatsApp
        </span>
        <div className="p-3 bg-[#0b141a] rounded-2xl border border-emerald-950 max-w-sm space-y-2 shadow-xl">
          <div className="rounded-xl overflow-hidden bg-[#1f2c34] border border-[#2a3942]">
            <img
              src={data.seo?.ogImageUrl || data.profile.avatarUrl}
              alt="OpenGraph Preview"
              className="w-full h-36 object-cover"
            />
            <div className="p-2.5 space-y-1">
              <div className="text-xs font-bold text-[#e9edef] line-clamp-1">
                {data.seo?.metaTitle || data.profile.name}
              </div>
              <div className="text-[11px] text-[#8696a0] line-clamp-2">
                {data.seo?.metaDescription || data.profile.tagline}
              </div>
              <div className="text-[9.5px] text-[#8696a0] font-mono uppercase tracking-wider">
                biovip.com.br/{data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}
              </div>
            </div>
          </div>
          <div className="text-[10px] text-[#8696a0] text-right font-mono">14:30 ✓✓</div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { RotateCcw, X, Check } from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';

export interface ResetTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  resetModalTarget: 'all' | 'current' | SavedMicrosite | null;
  savedSites: SavedMicrosite[];
  editingSiteId?: string | null;
  data: any;
  sessionAnalytics: { whatsappClicks: number; pageViews: number };
  resetAlsoClearPixelIds: boolean;
  setResetAlsoClearPixelIds: React.Dispatch<React.SetStateAction<boolean>>;
  executeResetTracking: () => void;
}

export const ResetTrackingModal: React.FC<ResetTrackingModalProps> = ({
  isOpen,
  onClose,
  resetModalTarget,
  savedSites,
  editingSiteId,
  data,
  sessionAnalytics,
  resetAlsoClearPixelIds,
  setResetAlsoClearPixelIds,
  executeResetTracking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-red-500/40 rounded-2xl p-6 space-y-4 text-neutral-100 shadow-2xl">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">
              <RotateCcw className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-100">
                Zerar Rastreamento & Métricas
              </h3>
              <p className="text-[10.5px] text-neutral-400">
                {resetModalTarget === 'all'
                  ? `Zerar dados de todos os ${savedSites.length} microsites`
                  : resetModalTarget === 'current'
                  ? `Microsite: ${editingSiteId ? (savedSites.find(s => s.id === editingSiteId)?.clientName || data.profile.name) : data.profile.name}`
                  : typeof resetModalTarget === 'object' && resetModalTarget
                  ? `Cliente: ${resetModalTarget.clientName}`
                  : 'Reiniciar telemetria de conversão'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* RESUMO DOS DADOS QUE SERÃO ZERADOS */}
        <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
            Métricas Atuais a Serem Reiniciadas:
          </span>

          {(() => {
            let targetClicks = 0;
            let targetViews = 0;
            if (resetModalTarget === 'all') {
              targetClicks = savedSites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 0);
              targetViews = savedSites.reduce((acc, s) => acc + (s.pageViews || 0), 0);
            } else if (resetModalTarget === 'current') {
              const s = editingSiteId ? savedSites.find(item => item.id === editingSiteId) : null;
              targetClicks = s ? (s.whatsappClicks || 0) : sessionAnalytics.whatsappClicks;
              targetViews = s ? (s.pageViews || 0) : sessionAnalytics.pageViews;
            } else if (resetModalTarget && typeof resetModalTarget === 'object') {
              targetClicks = resetModalTarget.whatsappClicks || 0;
              targetViews = resetModalTarget.pageViews || 0;
            }
            const rate = targetViews > 0 ? ((targetClicks / targetViews) * 100).toFixed(1) : '0.0';

            return (
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-[9.5px] text-neutral-400 block">Visualizações</span>
                  <span className="font-bold text-neutral-200 text-sm">{targetViews}</span>
                  <span className="text-[9px] text-neutral-500 block">Visitas</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-[9.5px] text-neutral-400 block">Cliques WA</span>
                  <span className="font-bold text-emerald-400 text-sm">{targetClicks}</span>
                  <span className="text-[9px] text-neutral-500 block">Conversões</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                  <span className="text-[9.5px] text-neutral-400 block">Taxa</span>
                  <span className="font-bold text-amber-300 text-sm">{rate}%</span>
                  <span className="text-[9px] text-neutral-500 block">Conversão</span>
                </div>
              </div>
            );
          })()}

          <div className="text-[11px] text-neutral-400 space-y-1.5 pt-1">
            <p className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Os cliques de WhatsApp e acessos serão resetados para <strong className="text-white">0</strong>.</span>
            </p>
            <p className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>As fontes de tráfego UTM (Instagram, Google Maps, Anúncios) serão limpas para iniciar novas campanhas.</span>
            </p>
            <p className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Todos os links, fotos, textos e configurações visuais do microsite permanecem intactos.</span>
            </p>
          </div>

          {resetModalTarget === 'current' && (
            <label className="flex items-center gap-2 pt-2 border-t border-neutral-850 cursor-pointer">
              <input
                type="checkbox"
                checked={resetAlsoClearPixelIds}
                onChange={(e) => setResetAlsoClearPixelIds(e.target.checked)}
                className="rounded bg-neutral-800 border-neutral-700 text-red-500 focus:ring-0"
              />
              <span className="text-[10.5px] text-neutral-300">
                Limpar também o Meta Pixel ID e Google Analytics configurados
              </span>
            </label>
          )}
        </div>

        {/* BOTÕES DE CONFIRMAÇÃO */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs cursor-pointer transition border border-neutral-700"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={executeResetTracking}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 cursor-pointer transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Sim, Zerar Rastreamento (0)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

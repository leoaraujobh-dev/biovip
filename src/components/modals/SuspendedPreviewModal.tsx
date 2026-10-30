import React from 'react';
import { Power, X, ExternalLink, Copy } from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';
import { getSuspendedPageHtml } from '../../utils/htmlGenerators';
import { isSiteSuspendedStatus } from '../../constants/maintenancePlans';
import { safeCopyText } from '../../utils/formatters';

export interface SuspendedPreviewModalProps {
  suspendedPreviewSite: SavedMicrosite | null;
  onClose: () => void;
  toggleSiteSuspensionMode: (siteId: string) => void;
  showToast: (msg: string) => void;
}

export const SuspendedPreviewModal: React.FC<SuspendedPreviewModalProps> = ({
  suspendedPreviewSite,
  onClose,
  toggleSiteSuspensionMode,
  showToast,
}) => {
  if (!suspendedPreviewSite) return null;

  return (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-neutral-900 border border-amber-500/40 rounded-2xl p-5 space-y-4 text-neutral-100 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                  Modo Manutenção (Suspensão Elegante D+7)
                </span>
                <h3 className="text-sm font-bold text-white">
                  Tela Neutra de Manutenção — {suspendedPreviewSite.clientName}
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Exibida automaticamente quando o link entra em manutenção no 7º dia de atraso, sem qualquer menção pejorativa a dívida.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onClose()}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#09090b] h-[440px]">
              <iframe
                title={`Modo Manutenção - ${suspendedPreviewSite.clientName}`}
                srcDoc={getSuspendedPageHtml(suspendedPreviewSite)}
                className="w-full h-full border-0"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={async () => {
                  await safeCopyText(getSuspendedPageHtml(suspendedPreviewSite));
                  showToast('📋 Código HTML da Tela Neutra de Manutenção copiado!');
                }}
                className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-neutral-700 cursor-pointer transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar HTML de Manutenção</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    toggleSiteSuspensionMode(suspendedPreviewSite.id);
                    onClose();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition ${
                    isSiteSuspendedStatus(suspendedPreviewSite)
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950'
                      : 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>
                    {isSiteSuspendedStatus(suspendedPreviewSite)
                      ? 'Reativar Link Público Agora'
                      : 'Ativar Modo Manutenção neste Cliente'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
  );
};

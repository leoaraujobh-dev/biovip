import React from 'react';
import { QrCode, X, Copy, ExternalLink } from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';
import { safeCopyText } from '../../utils/formatters';

export interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEditingSite?: SavedMicrosite | null;
  data: any;
  landingConfig: any;
  showToast: (msg: string) => void;
  openLivePreviewTab: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  currentEditingSite,
  data,
  landingConfig,
  showToast,
  openLivePreviewTab,
}) => {
  if (!isOpen) return null;

  const targetSite = currentEditingSite || {
    subdomain: data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'meusite',
    customDomain: '',
    clientName: data.profile.name || 'Rascunho',
  };
  const liveUrl = targetSite.customDomain
    ? `https://${targetSite.customDomain}`
    : `https://${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/${targetSite.subdomain || 'meusite'}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(liveUrl)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-emerald-500/40 rounded-2xl p-6 space-y-5 text-neutral-100 shadow-2xl relative">
        <div className="flex justify-between items-start border-b border-neutral-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shrink-0 shadow-lg shadow-emerald-500/10">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-100 flex items-center gap-2">
                Visualizar no Celular
              </h3>
              <p className="text-xs text-neutral-400">
                Aponte a câmera do seu smartphone para testar o microsite
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 py-1">
          {/* QR Code Frame */}
          <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-amber-400 flex flex-col items-center">
            <img
              src={qrApiUrl}
              alt="QR Code do Microsite"
              className="w-52 h-52 object-contain rounded-lg"
            />
            <div className="mt-2 text-center text-[10px] text-neutral-900 font-extrabold tracking-wider uppercase">
              {targetSite.clientName}
            </div>
          </div>

          <div className="w-full bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2 text-center">
            <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">
              Link Direto do Microsite:
            </span>
            <div className="font-mono text-xs text-amber-300 font-bold break-all px-2.5 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 select-all">
              {liveUrl}
            </div>
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={async () => {
                  await safeCopyText(liveUrl);
                  showToast('📋 Link do microsite copiado para a área de transferência!');
                }}
                className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>Copiar Link</span>
              </button>

              <button
                type="button"
                onClick={openLivePreviewTab}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir em Nova Aba</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-200 text-center leading-relaxed">
            💡 <strong>Dica de Vendas:</strong> Apresente o QR Code na tela para o seu cliente final escaneá-lo na hora do fechamento da reunião de vendas!
          </div>
        </div>
      </div>
    </div>
  );
};

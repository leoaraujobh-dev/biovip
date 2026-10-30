import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';
import { isSiteUnderConstruction, getUnderConstructionPageHtml } from '../../utils/htmlGenerators';
import { generateExportCode } from '../../utils/exportEngine';

export interface UnderConstructionPreviewModalProps {
  underConstructionPreviewSite: SavedMicrosite | null;
  onClose: () => void;
  toggleSiteConstructionMode: (siteId: string) => void;
  setUnderConstructionPreviewSite: React.Dispatch<React.SetStateAction<SavedMicrosite | null>>;
  landingConfig: any;
}

export const UnderConstructionPreviewModal: React.FC<UnderConstructionPreviewModalProps> = ({
  underConstructionPreviewSite,
  onClose,
  toggleSiteConstructionMode,
  setUnderConstructionPreviewSite,
  landingConfig,
}) => {
  if (!underConstructionPreviewSite) return null;

  const cleanSub = underConstructionPreviewSite.subdomain;
  const isUnderConst = isSiteUnderConstruction(underConstructionPreviewSite);

  return (
    <div className="fixed inset-0 z-[160] bg-black/95 flex flex-col">
      {/* Top Control Bar */}
      <header className="h-16 px-4 sm:px-6 bg-neutral-950 border-b border-amber-400/30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xl">🚧</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                Prévia: {underConstructionPreviewSite.clientName}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                  isUnderConst
                    ? 'bg-amber-400/20 border border-amber-400/40 text-amber-300'
                    : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                }`}
              >
                {isUnderConst ? '🚧 Modo Construção Ativo' : '✅ Publicado'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">
              biovip.com.br/{cleanSub}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              toggleSiteConstructionMode(underConstructionPreviewSite.id);
              setUnderConstructionPreviewSite((prev) =>
                prev ? { ...prev, isUnderConstruction: !prev.isUnderConstruction, underConstruction: !prev.underConstruction } : null
              );
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              isUnderConst
                ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-lg shadow-emerald-500/20'
                : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isUnderConst ? '🚀 Publicar Site Oficial (Desativar Construção)' : '🚧 Reativar Página em Construção'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const phone = (underConstructionPreviewSite.clientPhone || '').replace(/\D/g, '');
              const cleanPhone = phone.length === 10 || phone.length === 11 ? `55${phone}` : phone;
              const msg = encodeURIComponent(
                `Olá ${underConstructionPreviewSite.clientName}! 🌟\n\nSeu endereço oficial na BioVip já foi criado e está reservado: biovip.com.br/${cleanSub}\n\nNo momento ele exibe a nossa Página em Construção oficial aguardando o envio das suas informações.\n\nPor favor, nos envie fotos, logotipo e lista de serviços para colocarmos o seu site no ar!`
              );
              window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
            }}
            className="px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] text-white text-xs font-medium cursor-pointer transition flex items-center gap-1.5"
          >
            <span>📲 Cobrar Dados no WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/[0.08] cursor-pointer"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Full Iframe rendering */}
      <div className="flex-1 w-full bg-neutral-900 relative">
        <iframe
          title={`Prévia - ${underConstructionPreviewSite.clientName}`}
          srcDoc={
            isUnderConst
              ? getUnderConstructionPageHtml(underConstructionPreviewSite, landingConfig)
              : generateExportCode(underConstructionPreviewSite.data)
          }
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
};

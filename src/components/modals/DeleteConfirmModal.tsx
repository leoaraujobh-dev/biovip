import React from 'react';
import { Trash2, AlertCircle, X } from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';

export interface DeleteConfirmModalProps {
  deleteModalSite: SavedMicrosite | null;
  onClose: () => void;
  onConfirm: (siteId: string) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  deleteModalSite,
  onClose,
  onConfirm,
}) => {
  if (!deleteModalSite) return null;

  return (
    <div className="fixed inset-0 z-[160] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-red-500/50 rounded-2xl p-6 space-y-4 text-neutral-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold shrink-0">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-100">
                Excluir Microsite Permanentemente
              </h3>
              <p className="text-[11px] text-neutral-400">
                Cliente: <strong className="text-white">{deleteModalSite.clientName}</strong>
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

        <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2 text-xs text-neutral-300 leading-relaxed">
          <p>
            Tem certeza que deseja apagar o microsite de{' '}
            <strong className="text-amber-300">{deleteModalSite.clientName}</strong> (
            <span className="font-mono text-[11px] text-neutral-400">
              biovip.com.br/{deleteModalSite.subdomain}
            </span>
            )?
          </p>
          <p className="text-[11px] text-red-300/90 flex items-start gap-1.5 pt-1">
            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
            <span>Todos os arquivos, imagens em alta resolução e dados salvos deste microsite serão apagados permanentemente do painel e do armazenamento para poupar espaço.</span>
          </p>
        </div>

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
            onClick={() => {
              onConfirm(deleteModalSite.id);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 cursor-pointer transition active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            <span>Excluir e Liberar Espaço</span>
          </button>
        </div>
      </div>
    </div>
  );
};

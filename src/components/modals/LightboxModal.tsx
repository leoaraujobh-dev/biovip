import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxModalProps {
  lightboxIndex: number | null;
  onClose: () => void;
  photos: string[];
  captions?: string[];
  badge?: string;
  headline?: string;
  setLightboxIndex: any;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  lightboxIndex,
  onClose,
  photos,
  captions = [],
  badge,
  headline,
  setLightboxIndex,
}) => {
  if (lightboxIndex === null || !photos || !photos[lightboxIndex]) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 select-none"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="w-full flex items-center justify-between pb-3 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/20">
              Foto {lightboxIndex + 1} de {photos.length}
            </span>
            {badge && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {badge}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image with Navigation Buttons */}
        <div className="relative w-full flex items-center justify-center">
          {photos.length > 1 && (
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)
              }
              className="absolute left-2 sm:-left-12 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition cursor-pointer shadow-2xl hover:scale-105"
              title="Foto anterior (Seta esquerda)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <img
            src={photos[lightboxIndex]}
            alt={captions[lightboxIndex]?.trim() || `Foto ampliada ${lightboxIndex + 1}`}
            referrerPolicy="no-referrer"
            className="max-w-[85vw] max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-white/15"
          />

          {photos.length > 1 && (
            <button
              type="button"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % photos.length)}
              className="absolute right-2 sm:-right-12 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition cursor-pointer shadow-2xl hover:scale-105"
              title="Próxima foto (Seta direita)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Bottom Caption & Navigation Hint */}
        <div className="pt-3.5 text-center space-y-1.5 max-w-xl">
          {captions[lightboxIndex]?.trim() && (
            <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white font-medium shadow">
              {captions[lightboxIndex]?.trim()}
            </div>
          )}
          {headline && (
            <p className="text-xs text-neutral-300 font-medium">
              {headline}
            </p>
          )}
          <p className="text-[11px] text-neutral-500">
            Pressione as setas do teclado (← / →) para navegar ou Esc para fechar
          </p>
        </div>
      </div>
    </div>
  );
};

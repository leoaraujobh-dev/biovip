import React from 'react';
import { Sparkles, X, RefreshCw } from 'lucide-react';

export interface AiCopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiCopyTarget: { fieldLabel: string; currentVal: string; applyFn: (text: string) => void } | null;
  aiCopyLoading: boolean;
  aiCopyOptions: Array<{ text: string; [key: string]: any }>;
  handleApplyAiCopy?: (text: string) => void;
  handleGenerateAiCopy?: () => void;
  showToast: (msg: string) => void;
}

export const AiCopyModal: React.FC<AiCopyModalProps> = ({
  isOpen,
  onClose,
  aiCopyTarget,
  aiCopyLoading,
  aiCopyOptions,
  handleApplyAiCopy,
  handleGenerateAiCopy,
  showToast,
}) => {
  if (!isOpen || !aiCopyTarget) return null;

  return (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-amber-500/40 rounded-2xl p-6 space-y-4 text-neutral-100 shadow-2xl">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-100">
                    Otimizador de Copywriting com IA
                  </h3>
                  <p className="text-[10px] text-neutral-400">
                    Campo: <strong className="text-amber-300">{aiCopyTarget.fieldLabel}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onClose()}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Texto Atual:</span>
              <p className="text-xs text-neutral-300 italic">"{aiCopyTarget.currentVal || 'Não preenchido'}"</p>
            </div>

            {aiCopyLoading ? (
              <div className="py-8 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                <p className="text-xs text-amber-300 font-bold">Gerando 3 opções persuasivas com IA Gemini...</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Escolha uma das variações de alta conversão:
                </span>
                {aiCopyOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 transition space-y-2 group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {opt.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          aiCopyTarget.applyFn(opt.text);
                          onClose();
                          showToast(`✨ Texto do campo "${aiCopyTarget.fieldLabel}" atualizado pela IA!`);
                        }}
                        className="px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-[10px] transition cursor-pointer"
                      >
                        Usar Esta Variação
                      </button>
                    </div>
                    <p className="text-xs text-neutral-100 font-medium leading-relaxed">
                      {opt.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  );
};

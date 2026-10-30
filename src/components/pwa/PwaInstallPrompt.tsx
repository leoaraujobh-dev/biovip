import React, { useState, useEffect } from 'react';
import { Download, WifiOff, X, Sparkles, Smartphone, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if already in standalone/PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
    }

    // Online / Offline listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Chrome/Android/Edge beforeinstallprompt listener
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If iOS, open helper sheet
      const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
      if (isIos) {
        setShowIosGuide(true);
      }
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (err) {
      console.warn('[PWA] Prompt error:', err);
    }
  };

  return (
    <>
      {/* Offline Status Pill Notification */}
      {!isOnline && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[200] px-4 py-2 rounded-full bg-neutral-900/95 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 animate-pulse">
          <WifiOff className="w-4 h-4 text-amber-400" />
          <span>Modo Offline Ativo • Seus dados continuam salvos no navegador</span>
        </div>
      )}

      {/* Floating PWA Install Prompt Banner */}
      {isInstallable && !isInstalled && !isDismissed && (
        <aside
          aria-label="Instalar BioVip Studio"
          className="fixed bottom-20 left-4 sm:left-6 z-[140] max-w-sm bg-neutral-900/95 border border-amber-500/40 rounded-2xl p-4 text-neutral-100 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-300 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-neutral-950 font-bold shrink-0 shadow-lg shadow-amber-500/20">
              <Smartphone className="w-5 h-5 fill-neutral-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-white">Instalar BioVip Studio</span>
                <span className="px-1.5 py-0.2 rounded text-[8.5px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  App PWA
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                Acesse mais rápido, direto da tela inicial, com suporte offline.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-neutral-950 font-bold text-[11px] flex items-center gap-1 shadow-md shadow-amber-500/20 cursor-pointer transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Instalar</span>
            </button>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
              title="Dispensar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* iOS Safari Installation Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-[210] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-neutral-900 border border-amber-500/40 rounded-2xl p-5 space-y-4 text-neutral-100 shadow-2xl">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm text-white">Instalar no iPhone / iPad</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                  1
                </span>
                <p>
                  No Safari, toque no botão <strong>Compartilhar</strong> (ícone de quadrado com seta para cima ⎋ na barra inferior).
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                  2
                </span>
                <p>
                  Role a lista para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                  3
                </span>
                <p>
                  Toque em <strong>Adicionar</strong> no canto superior direito para finalizar.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs text-center cursor-pointer transition"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

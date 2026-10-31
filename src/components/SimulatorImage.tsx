import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { optimizeImageUrl } from '../utils/formatters';
import { getCachedImageFromIdb, saveImageToIdbCache } from '../utils/storage';

export function SimulatorImage({
  src,
  alt,
  className = '',
  style,
  skeletonClassName = '',
  accentColor = '#d4af37',
  referrerPolicy = 'no-referrer',
  fallbackUrl = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
  loading = 'lazy',
  decoding = 'async',
  targetWidth = 800,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  skeletonClassName?: string;
  accentColor?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  fallbackUrl?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  targetWidth?: number;
}) {
  const optimizedSrc = React.useMemo(() => optimizeImageUrl(src, targetWidth), [src, targetWidth]);
  const optimizedFallback = React.useMemo(() => optimizeImageUrl(fallbackUrl, targetWidth), [fallbackUrl, targetWidth]);

  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(optimizedSrc);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let isCancelled = false;
    setLoaded(false);
    setErrored(false);

    if (!optimizedSrc) {
      setCurrentSrc(optimizedFallback);
      setLoaded(true);
      return;
    }

    if (optimizedSrc.startsWith('data:') || optimizedSrc.startsWith('blob:')) {
      setCurrentSrc(optimizedSrc);
      setLoaded(true);
      return;
    }

    // Tenta carregar instantaneamente do cache persistente do IndexedDB / Map
    getCachedImageFromIdb(optimizedSrc).then((cached) => {
      if (isCancelled) return;
      if (cached) {
        setCurrentSrc(cached);
        setLoaded(true);
      } else {
        setCurrentSrc(optimizedSrc);
        const imgEl = imgRef.current;
        if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
          const timer = setTimeout(() => setLoaded(true), 100);
          return () => clearTimeout(timer);
        }
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [optimizedSrc, optimizedFallback]);

  const handleImageLoad = () => {
    setLoaded(true);
    const imgEl = imgRef.current;
    if (imgEl && optimizedSrc.startsWith('http')) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = imgEl.naturalWidth || imgEl.width || 400;
        canvas.height = imgEl.naturalHeight || imgEl.height || 400;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(imgEl, 0, 0);
          const dataUrl = canvas.toDataURL('image/webp', 0.92) || canvas.toDataURL('image/jpeg', 0.92);
          if (dataUrl && dataUrl.startsWith('data:image/')) {
            saveImageToIdbCache(optimizedSrc, dataUrl);
          }
        }
      } catch {
        // Fallback CORS ignore
      }
    }
  };

  return (
    <>
      {!loaded && !errored && (
        <div
          className={`absolute inset-0 z-10 skeleton-shimmer flex items-center justify-center transition-opacity duration-300 ${skeletonClassName}`}
          style={
            {
              backgroundColor: 'rgba(24, 24, 27, 0.85)',
              '--skel-shimmer': `${accentColor}30`,
            } as React.CSSProperties
          }
        >
          <div
            className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center animate-pulse"
            style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
          >
            <Sparkles className="w-3 h-3 opacity-70" />
          </div>
        </div>
      )}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        referrerPolicy={referrerPolicy}
        onLoad={handleImageLoad}
        onError={() => {
          if (currentSrc !== optimizedFallback) {
            setCurrentSrc(optimizedFallback);
          } else {
            setErrored(true);
          }
          setLoaded(true);
        }}
        className={`${className} transition-opacity duration-500 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={style}
      />
    </>
  );
}

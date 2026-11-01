import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { optimizeImageUrl } from '../utils/formatters';

export const SimulatorImage = React.memo(function SimulatorImage({
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
  const isImmediate = Boolean(
    src && (
      src.startsWith('data:') ||
      src.startsWith('blob:') ||
      src.startsWith('/assets/') ||
      src.startsWith('./assets/')
    )
  );

  const optimizedSrc = React.useMemo(() => {
    if (isImmediate) return src;
    return optimizeImageUrl(src, targetWidth);
  }, [src, targetWidth, isImmediate]);

  const optimizedFallback = React.useMemo(
    () => optimizeImageUrl(fallbackUrl, targetWidth),
    [fallbackUrl, targetWidth]
  );

  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(isImmediate);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isImmediate) {
      setLoaded(true);
      setHasError(false);
      return;
    }

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
      setHasError(false);
      return;
    }

    setLoaded(false);
    setHasError(false);

    // Failsafe timer: se por algum motivo a imagem demorar ou o evento onLoad for engolido pelo navegador, exibe a imagem
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [optimizedSrc, isImmediate]);

  const displaySrc = hasError || !optimizedSrc ? optimizedFallback : optimizedSrc;

  return (
    <>
      {!loaded && !isImmediate && (
        <div
          className={`absolute inset-0 z-10 skeleton-shimmer flex items-center justify-center transition-opacity duration-300 pointer-events-none ${skeletonClassName}`}
          style={
            {
              backgroundColor: 'rgba(24, 24, 27, 0.65)',
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
        src={displaySrc}
        alt={alt}
        loading={isImmediate ? 'eager' : loading}
        decoding={isImmediate ? 'sync' : decoding}
        referrerPolicy={referrerPolicy}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!hasError && optimizedSrc !== optimizedFallback) {
            setHasError(true);
          }
          setLoaded(true);
        }}
        className={`${className} transition-opacity duration-200 ease-out ${
          loaded || isImmediate ? 'opacity-100' : 'opacity-0'
        }`}
        style={style}
      />
    </>
  );
});

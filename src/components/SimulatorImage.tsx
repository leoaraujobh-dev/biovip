import React, { useState, useEffect } from 'react';
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
  const optimizedSrc = React.useMemo(() => optimizeImageUrl(src, targetWidth), [src, targetWidth]);
  const optimizedFallback = React.useMemo(() => optimizeImageUrl(fallbackUrl, targetWidth), [fallbackUrl, targetWidth]);

  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset loaded/error state when src changes
  useEffect(() => {
    setLoaded(false);
    setHasError(false);
  }, [optimizedSrc]);

  const displaySrc = hasError || !optimizedSrc ? optimizedFallback : optimizedSrc;

  return (
    <>
      {!loaded && (
        <div
          className={`absolute inset-0 z-10 skeleton-shimmer flex items-center justify-center transition-opacity duration-300 pointer-events-none ${skeletonClassName}`}
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
        src={displaySrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        referrerPolicy={referrerPolicy}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!hasError && optimizedSrc !== optimizedFallback) {
            setHasError(true);
          } else {
            setLoaded(true);
          }
        }}
        className={`${className} transition-opacity duration-300 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={style}
      />
    </>
  );
});

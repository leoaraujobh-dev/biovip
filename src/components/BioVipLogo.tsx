import React from 'react';

interface BioVipLogoProps {
  variant?: 'full' | 'emblem' | 'horizontal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  animated?: boolean;
  className?: string;
}

export const BioVipLogo: React.FC<BioVipLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showSubtitle = true,
  animated = true,
  className = '',
}) => {
  // Dimension presets
  const sizeMap = {
    xs: { emblemSize: 28, titleSize: 'text-xs', subSize: 'text-[7.5px]', gap: 'gap-2' },
    sm: { emblemSize: 36, titleSize: 'text-sm', subSize: 'text-[9px]', gap: 'gap-2.5' },
    md: { emblemSize: 44, titleSize: 'text-base', subSize: 'text-[10px]', gap: 'gap-3' },
    lg: { emblemSize: 64, titleSize: 'text-xl', subSize: 'text-xs', gap: 'gap-3.5' },
    xl: { emblemSize: 96, titleSize: 'text-3xl', subSize: 'text-sm', gap: 'gap-4' },
  };

  const { emblemSize, titleSize, subSize, gap } = sizeMap[size];

  // The Emblem SVG containing Phone + Monogram VB + Laurel + Crown + Chain Nodes
  const EmblemSvg = (
    <div 
      className="relative shrink-0 flex items-center justify-center select-none"
      style={{ width: emblemSize, height: emblemSize }}
    >
      {/* Ambient gold glow behind the emblem */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-full blur-md opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.45) 0%, rgba(212, 175, 55, 0.15) 60%, transparent 80%)',
        }}
      />

      <svg 
        viewBox="0 0 240 240" 
        width="100%" 
        height="100%" 
        className={`overflow-visible ${animated ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}
      >
        <defs>
          <linearGradient id="bvGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="30%" stopColor="#E5C17B" />
            <stop offset="60%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#A8771A" />
            <stop offset="100%" stopColor="#F9E8B2" />
          </linearGradient>

          <linearGradient id="bvShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#FFFDF7" stopOpacity="1">
              {animated && (
                <animate attributeName="offset" values="-0.3; 1.3" dur="2.8s" repeatCount="indefinite" />
              )}
            </stop>
            <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.85">
              {animated && (
                <animate attributeName="offset" values="0.0; 1.6" dur="2.8s" repeatCount="indefinite" />
              )}
            </stop>
            <stop offset="100%" stopColor="#9C6F19" stopOpacity="0.8" />
          </linearGradient>

          <filter id="bvGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform="translate(120, 120)">
          {/* 1. Laurel Wreath Branch (Left) */}
          <g stroke="url(#bvShimmer)" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M -10 52 C -35 44, -62 18, -60 -18 C -58 -40, -45 -58, -36 -70" />
            {/* Leaves */}
            <path d="M -18 44 Q -32 48 -38 38 Q -32 30 -20 36 Z" fill="url(#bvGoldGradient)" fillOpacity="0.3" />
            <path d="M -32 30 Q -50 34 -56 22 Q -46 16 -35 22 Z" fill="url(#bvGoldGradient)" fillOpacity="0.35" />
            <path d="M -46 12 Q -66 14 -72 0 Q -60 -6 -47 4 Z" fill="url(#bvGoldGradient)" fillOpacity="0.4" />
            <path d="M -54 -8 Q -76 -8 -78 -22 Q -65 -26 -54 -16 Z" fill="url(#bvGoldGradient)" fillOpacity="0.45" />
            <path d="M -56 -30 Q -76 -36 -73 -48 Q -62 -50 -52 -36 Z" fill="url(#bvGoldGradient)" fillOpacity="0.5" />
            <path d="M -50 -50 Q -66 -58 -60 -70 Q -48 -68 -42 -56 Z" fill="url(#bvGoldGradient)" fillOpacity="0.55" />
            <path d="M -37 -68 Q -46 -80 -40 -88 Q -30 -84 -28 -72 Z" fill="url(#bvGoldGradient)" fillOpacity="0.6" />
          </g>

          {/* 2. Smartphone Outline */}
          <rect 
            x="-34" 
            y="-72" 
            width="68" 
            height="124" 
            rx="15" 
            fill="#09090b" 
            stroke="url(#bvShimmer)" 
            strokeWidth="2.8" 
          />
          {/* Speaker Notch */}
          <rect x="-12" y="-64" width="24" height="3.5" rx="1.75" fill="url(#bvGoldGradient)" />
          {/* Home Indicator */}
          <line x1="-14" y1="42" x2="14" y2="42" stroke="url(#bvGoldGradient)" strokeWidth="2.2" strokeLinecap="round" />

          {/* 3. Monogram VB Inside Phone */}
          <g transform="translate(0, -6)">
            {/* V */}
            <path 
              d="M -18 -22 L -11 -22 L -2 9 L 1 9 L 10 -22 L 17 -22 L 5 16 L -7 16 Z" 
              fill="url(#bvShimmer)" 
              filter="url(#bvGlow)"
            />
            {/* B */}
            <path 
              d="M -6 -18 L 10 -18 C 16 -18, 20 -15, 20 -9 C 20 -5, 17 -2, 13 -1 C 18 0, 22 4, 22 10 C 22 17, 17 20, 9 20 L -6 20 Z
                 M -1 -13 L -1 -3 L 8 -3 C 12 -3, 14 -5, 14 -8 C 14 -11, 12 -13, 8 -13 Z
                 M -1 2 L -1 15 L 9 15 C 13 15, 16 13, 16 8 C 16 3, 13 2, 9 2 Z" 
              fill="url(#bvShimmer)"
            />
          </g>

          {/* 4. Luxury Crown (Top Right) */}
          <g transform="translate(32, -56) rotate(12)">
            <path 
              d="M -22 12 L -24 -2 L -12 5 L 0 -8 L 12 5 L 24 -2 L 22 12 Z" 
              fill="none" 
              stroke="url(#bvShimmer)" 
              strokeWidth="2.4" 
              strokeLinejoin="round" 
            />
            <path d="M -22 12 L 22 12 L 20 15 L -20 15 Z" fill="url(#bvGoldGradient)" />
            {/* Pearls */}
            <circle cx="-24" cy="-2" r="2" fill="#FFFBEB" />
            <circle cx="-12" cy="5" r="1.6" fill="#FFFBEB" />
            <circle cx="0" cy="-8" r="2.5" fill="#FFFBEB" />
            <circle cx="12" cy="5" r="1.6" fill="#FFFBEB" />
            <circle cx="24" cy="-2" r="2" fill="#FFFBEB" />
          </g>

          {/* 5. Conversion Chain & Digital Nodes (Right / Bottom Right) */}
          <g transform="translate(20, 20)">
            <line x1="6" y1="-24" x2="30" y2="-36" stroke="url(#bvGoldGradient)" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="30" cy="-36" r="3.5" fill="url(#bvGoldGradient)" />
            <circle cx="30" cy="-36" r="1.5" fill="#FFFFFF" />

            <line x1="-18" y1="-32" x2="-35" y2="-42" stroke="url(#bvGoldGradient)" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="-35" cy="-42" r="2.8" fill="url(#bvGoldGradient)" />

            {/* Chain links */}
            <g transform="translate(26, 14) rotate(-35)">
              <rect x="-11" y="-6.5" width="22" height="13" rx="6.5" fill="none" stroke="url(#bvShimmer)" strokeWidth="2.4" />
              <rect x="2" y="-6.5" width="22" height="13" rx="6.5" fill="none" stroke="url(#bvShimmer)" strokeWidth="2.4" />
              
              <line x1="22" y1="0" x2="34" y2="10" stroke="url(#bvGoldGradient)" strokeWidth="1.8" />
              <circle cx="34" cy="10" r="3.2" fill="url(#bvGoldGradient)" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );

  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {EmblemSvg}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${gap} ${className}`}>
        {EmblemSvg}
        <div className="flex flex-col items-center">
          <span 
            className={`font-serif font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 ${titleSize} drop-shadow-sm`}
          >
            BIOVIP
          </span>
          {showSubtitle && (
            <span 
              className={`font-mono uppercase font-bold tracking-[0.22em] text-amber-400/90 ${subSize} mt-1`}
            >
              MICROSITES DE ALTA CONVERSÃO
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal variant (Ideal for Top Bar / Header)
  return (
    <div className={`flex items-center ${gap} ${className} group`}>
      {EmblemSvg}
      <div className="flex flex-col leading-tight">
        <span 
          className={`font-serif font-black tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 ${titleSize} group-hover:from-white group-hover:via-amber-200 group-hover:to-amber-400 transition-colors duration-300`}
        >
          BIOVIP
        </span>
        {showSubtitle && (
          <span 
            className={`font-mono uppercase font-semibold tracking-[0.18em] text-neutral-400 group-hover:text-amber-400/90 transition-colors duration-300 ${subSize} mt-0.5`}
          >
            Microsites de Alta Conversão
          </span>
        )}
      </div>
    </div>
  );
};

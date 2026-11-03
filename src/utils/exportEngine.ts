import { INITIAL_DATA, MicrositeData } from '../constants/initialData';
import { THEMES, PHOTO_FILTERS } from '../constants/themes';
import { escapeHtmlAttr, formatWhatsAppPhone, optimizeImageUrl, getLuminance, getSafeContrastText } from './formatters';
import { getDemoDaysRemaining } from './htmlGenerators';
import { WHATSAPP_SVG_STRING, INSTAGRAM_SVG_STRING, CALENDAR_SVG_STRING } from '../components/icons/BrandIcons';

export interface ExportCodeOptions {
  disableLinks?: boolean;
  isCarousel?: boolean;
  isTemporaryDemo?: boolean;
  demoExpiresAt?: string;
  demoClientName?: string;
  demoWhatsAppPhone?: string;
  landingConfig?: any;
  customSlug?: string;
}

export function resolveCreatorFooterInfo(siteData?: any, landingConfig?: any) {
  const profileAny = (siteData?.profile || {}) as Record<string, any>;
  const brandName = (
    profileAny.creatorName ||
    landingConfig?.agencyBrandName ||
    'BioVip Digital'
  ).trim();
  const ctaLabel = (
    profileAny.creatorCtaLabel ||
    landingConfig?.creatorFooterLabel ||
    'Quero um microsite assim'
  ).trim();
  const rawCustomUrl = (
    profileAny.creatorUrl ||
    landingConfig?.creatorFooterUrl ||
    ''
  ).trim();

  let href = '';
  if (rawCustomUrl) {
    href = /^https?:\/\//i.test(rawCustomUrl) ? rawCustomUrl : `https://${rawCustomUrl}`;
  } else if (landingConfig?.baseDomain && landingConfig.baseDomain.trim()) {
    const cleanDomain = landingConfig.baseDomain.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
    href = `https://${cleanDomain}`;
  } else if (typeof window !== 'undefined' && window.location?.origin) {
    href = window.location.origin;
  } else {
    const targetAgencyPhone = (landingConfig?.agencyWhatsapp || '5531991390202').replace(/\D/g, '');
    const msg = encodeURIComponent(`Olá! Vi um microsite criado por ${brandName} e quero encomendar o meu!`);
    href = `https://wa.me/${targetAgencyPhone}?text=${msg}`;
  }

  return { brandName, ctaLabel, href };
}

export function getNicheFallbackImage(nicheCategory: string = '', index: number = 0): string {
  const n = String(nicheCategory).toLowerCase();

  if (n.includes('lash') || n.includes('cilio') || n.includes('cílio') || n.includes('olhar') || n.includes('sobrancelha') || n.includes('olhos')) {
    const lashImages = [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600',
    ];
    return lashImages[Math.abs(index) % lashImages.length];
  }

  if (n.includes('barber') || n.includes('barba') || n.includes('corte') || n.includes('masculino')) {
    const barberImages = [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&q=80&w=600',
    ];
    return barberImages[Math.abs(index) % barberImages.length];
  }

  if (n.includes('odonto') || n.includes('dent') || n.includes('sorriso')) {
    const dentalImages = [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
    ];
    return dentalImages[Math.abs(index) % dentalImages.length];
  }

  if (n.includes('advoc') || n.includes('juríd') || n.includes('jurid') || n.includes('direito') || n.includes('lei')) {
    const lawImages = [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    ];
    return lawImages[Math.abs(index) % lawImages.length];
  }

  if (n.includes('unha') || n.includes('nail') || n.includes('manicure') || n.includes('fibra')) {
    const nailImages = [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80&w=600',
    ];
    return nailImages[Math.abs(index) % nailImages.length];
  }

  const generalBeauty = [
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
  ];
  return generalBeauty[Math.abs(index) % generalBeauty.length];
}

  export function generateExportCode(
    targetData?: typeof INITIAL_DATA,
    options?: ExportCodeOptions
  ): string {
    const siteData: typeof INITIAL_DATA = {
      ...INITIAL_DATA,
      ...(targetData || {}),
      styling: { ...INITIAL_DATA.styling, ...(targetData?.styling || {}) },
      profile: { ...INITIAL_DATA.profile, ...(targetData?.profile || {}) },
      announcement: { ...INITIAL_DATA.announcement, ...(targetData?.announcement || {}) },
      highConversion: {
        ...INITIAL_DATA.highConversion,
        ...(targetData?.highConversion || {}),
        urgencyTimer: {
          ...INITIAL_DATA.highConversion.urgencyTimer,
          ...((targetData?.highConversion as any)?.urgencyTimer || {}),
        },
      },
      metrics: { ...INITIAL_DATA.metrics, ...(targetData?.metrics || {}) },
      processSteps: { ...INITIAL_DATA.processSteps, ...(targetData?.processSteps || {}) },
      studentGrid: { ...INITIAL_DATA.studentGrid, ...(targetData?.studentGrid || {}) },
      locationCard: { ...INITIAL_DATA.locationCard, ...(targetData?.locationCard || {}) },
      services: { ...INITIAL_DATA.services, ...(targetData?.services || {}) },
      trustBadges: { ...INITIAL_DATA.trustBadges, ...(targetData?.trustBadges || {}) },
      testimonials: { ...INITIAL_DATA.testimonials, ...(targetData?.testimonials || {}) },
      qualifierFunnel: { ...INITIAL_DATA.qualifierFunnel, ...(targetData?.qualifierFunnel || {}) },
      aboutMe: { ...INITIAL_DATA.aboutMe, ...(targetData?.aboutMe || {}) },
      faq: { ...INITIAL_DATA.faq, ...(targetData?.faq || {}) },
      seo: { ...INITIAL_DATA.seo, ...(targetData?.seo || {}) },
      conversion: { ...INITIAL_DATA.conversion, ...(targetData?.conversion || {}) },
    };
    const baseThemeObj = THEMES[siteData.theme] || THEMES.navyLaw;
    const siteTheme = siteData.customColors?.enabled
      ? {
          ...baseThemeObj,
          id: 'custom',
          name: 'Paleta Personalizada',
          bg: siteData.customColors.bg,
          textMain: siteData.customColors.textMain,
          textMuted: siteData.customColors.textMuted,
          accent: siteData.customColors.accent,
          cardBg: siteData.customColors.cardBg,
          cardText: siteData.customColors.cardText,
          cardSubtext: siteData.customColors.cardText + '99',
          cardBorder: siteData.customColors.cardBorder,
          socialBg: siteData.customColors.socialBg,
          socialBorder: siteData.customColors.accent + '66',
          socialText: siteData.customColors.accent,
          iconBg: siteData.customColors.accent + '26',
          iconColor: siteData.customColors.accent,
          pillShadow: '0 8px 24px -4px rgba(0,0,0,0.4)',
          glowColor: siteData.customColors.glowColor + '38',
        }
      : baseThemeObj;

    const filterCss = PHOTO_FILTERS.find(f => f.id === siteData.styling.photoFilter)?.css || 'none';

    return ((data: typeof INITIAL_DATA, theme: typeof siteTheme) => {
      const mc = data.moduleColors || {};
      const avatarOptimized = optimizeImageUrl(data.profile.avatarUrl, 1080);
      const aboutPhotoOptimized = optimizeImageUrl((data.aboutMe as any)?.photoUrl || data.profile.aboutPhotoUrl, 1080);
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
  <meta name="referrer" content="no-referrer">
  <title>${escapeHtmlAttr(siteData.seo?.metaTitle || `${siteData.profile.name} - ${siteData.profile.title}`)}</title>
  <meta name="description" content="${escapeHtmlAttr(siteData.seo?.metaDescription || siteData.profile.tagline || '')}">
  <meta name="keywords" content="${escapeHtmlAttr(siteData.seo?.keywords || '')}">
  <!-- OpenGraph Meta Tags para Card do WhatsApp & Redes Sociais -->
  <meta property="og:title" content="${escapeHtmlAttr(siteData.seo?.metaTitle || siteData.profile.name)}">
  <meta property="og:description" content="${escapeHtmlAttr(siteData.seo?.metaDescription || siteData.profile.tagline)}">
  <meta property="og:image" content="${escapeHtmlAttr(siteData.seo?.ogImageUrl || avatarOptimized)}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  ${siteData.conversion?.metaPixelId ? `
  <!-- Meta Pixel Code -->
  <script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${siteData.conversion.metaPixelId}');
  fbq('track', 'PageView');
  </script>
  ` : ''}
  <!-- Fast Edge Preconnects & High-Speed Asset Preloads -->
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="dns-prefetch" href="https://images.unsplash.com">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  ${avatarOptimized ? `<link rel="preload" as="image" href="${avatarOptimized}" fetchpriority="high">` : ''}
  <!-- Non-blocking asynchronous font loading (Eliminates render blocking delay) -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Italianno&family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Italianno&family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"></noscript>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      overflow-x: hidden;
      width: 100%;
      min-width: 100%;
      max-width: 100vw;
      margin: 0;
      padding: 0;
      overscroll-behavior-x: none;
      -webkit-overflow-scrolling: touch;
    }
    body {
      background-color: ${theme.bg};
      color: ${theme.textMain};
      font-family: '${data.styling.fontFamily}', serif, sans-serif;
      display: flex;
      justify-content: center;
      min-height: 100vh;
      min-height: 100dvh;
      -webkit-font-smoothing: antialiased;
      padding: 0;
      margin: 0;
    }
    .wrapper {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      position: relative;
      padding: 0 16px;
      box-sizing: border-box;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
      justify-content: ${data.styling.wrapperAlignment || 'flex-start'};
      background-color: ${theme.bg};
    }
    .hero, .announcement {
      width: calc(100% + 32px);
      margin-left: -16px;
      margin-right: -16px;
    }

    /* Em celulares e smartphones (telas até 768px): ocupa 100% da tela do aparelho de ponta a ponta sem bordas pretas ou margens */
    @media (max-width: 768px) {
      html, body {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background-color: ${theme.bg} !important;
      }
      body {
        padding: 0 !important;
        margin: 0 !important;
      }
      .wrapper {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        margin: 0 !important;
        padding-left: 16px;
        padding-right: 16px;
        border-radius: 0 !important;
        box-shadow: none !important;
      }
      .hero, .announcement {
        width: calc(100% + 32px) !important;
        margin-left: -16px !important;
        margin-right: -16px !important;
      }
    }
    @media (max-width: 400px) {
      .wrapper {
        padding-left: 12px;
        padding-right: 12px;
      }
      .hero, .announcement {
        width: calc(100% + 24px) !important;
        margin-left: -12px !important;
        margin-right: -12px !important;
      }
    }
    @media (max-width: 340px) {
      .wrapper {
        padding-left: 8px;
        padding-right: 8px;
      }
      .hero, .announcement {
        width: calc(100% + 16px) !important;
        margin-left: -8px !important;
        margin-right: -8px !important;
      }
    }

    /* Em telas maiores (Computador / iPad / Notebook): centralizado e estilizado como smartphone de luxo */
    @media (min-width: 769px) {
      body {
        padding: 24px 0 48px;
        background-color: #050507;
      }
      .wrapper {
        max-width: 440px;
        border-radius: 36px;
        background-color: ${theme.bg} !important;
        box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.92), 0 18px 36px -6px rgba(0, 0, 0, 0.75), 0 0 40px -5px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 2px 6px rgba(0, 0, 0, 0.65);
      }
    }
    ${data.styling.spotlightGlow ? `
    .spotlight {
      position: absolute;
      top: -80px;
      left: 50%;
      transform: translateX(-50%);
      width: 380px;
      height: 380px;
      border-radius: 50%;
      background: radial-gradient(circle, ${theme.glowColor} 0%, rgba(0,0,0,0) 70%);
      pointer-events: none;
      z-index: 1;
    }` : ''}
    .announcement {
      background: ${mc.announcement?.bgColor || theme.accent};
      color: ${mc.announcement?.textColor || getSafeContrastText(mc.announcement?.bgColor || theme.accent, '#0a0a0c', '#ffffff')};
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      padding: max(26px, env(safe-area-inset-top, 10px)) 12px 10px;
      border-radius: 0;
      width: calc(100% + 32px);
      margin: 0 -16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-decoration: none;
      position: relative;
      z-index: 3;
    }
    .hero {
      position: relative;
      border-radius: 0;
      overflow: hidden;
      width: calc(100% + 32px);
      margin-left: -16px;
      margin-right: -16px;
      height: ${data.styling.photoHeight || 380}px;
      min-height: ${data.styling.photoHeight || 380}px;
      flex-shrink: 0;
      background: #000;
      margin-bottom: 20px;
      z-index: 2;
    }
    .hero-img, .avatar-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      transform: scale(${(data.styling.photoScale || 100) / 100});
      object-position: ${(data.styling as any).photoPosX ?? 50}% ${data.styling.photoPosY ?? 20}%;
      filter: ${filterCss};
      -webkit-filter: ${filterCss};
    }
    .hero-fade {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 40%, ${theme.bg} ${data.styling.vignetteIntensity}%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 24px 20px;
    }
    .name {
      font-family: '${data.styling.fontFamily}', serif;
      font-size: 26px;
      letter-spacing: 1.5px;
      margin-top: 4px;
      text-transform: uppercase;
      color: ${mc.hero?.titleColor || theme.textMain};
      text-wrap: balance;
    }
    .badge-sub {
      font-size: 10px;
      letter-spacing: 2.5px;
      color: ${mc.hero?.accentColor || theme.accent};
      font-weight: 700;
      text-transform: uppercase;
      text-wrap: balance;
    }
    .tagline {
      font-size: 12px;
      color: ${mc.hero?.textColor || theme.textMuted};
      margin-top: 6px;
      line-height: 1.35;
      text-wrap: balance;
      max-width: 96%;
    }
    .social-bar {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin: 16px 0;
      z-index: 2;
      position: relative;
    }
    .social-btn {
      width: 44px;
      height: 44px;
      min-width: 44px;
      min-height: 44px;
      border-radius: 14px;
      background: ${theme.socialBg};
      border: 1px solid ${theme.socialBorder};
      color: ${theme.socialText};
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      padding: 0;
      box-sizing: border-box;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }
    .social-btn:hover {
      transform: scale(1.05);
    }
    .cursive-banner {
      font-family: '${theme.fontScript}', cursive, serif;
      font-size: 26px;
      color: ${mc.hero?.headlineColor || theme.textMuted};
      text-align: center;
      margin: 12px 0 20px;
      text-wrap: balance;
    }
    .cta-card {
      background: ${mc.actionCards?.bgColor || theme.cardBg};
      color: ${mc.actionCards?.titleColor || theme.cardText};
      border: none;
      border-radius: ${data.styling.borderRadius}px;
      padding: 16px 18px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      margin-bottom: 12px;
      box-shadow: ${theme.pillShadow}, 0 0 14px -3px color-mix(in srgb, ${theme.accent} 28%, transparent);
      position: relative;
      overflow: hidden;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
      will-change: transform, box-shadow;
      animation: ctaIdlePulse 3s ease-in-out infinite;
    }
    .cta-card::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg, color-mix(in srgb, ${theme.accent} 92%, #ffffff 8%) 0%, ${theme.accent} 30%, color-mix(in srgb, ${theme.accent} 48%, rgba(255, 255, 255, 0.32)) 62%, color-mix(in srgb, ${theme.accent} 88%, transparent) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      pointer-events: none;
      opacity: 0.96;
      filter: drop-shadow(0 0 5px color-mix(in srgb, ${theme.accent} 42%, transparent));
      transition: opacity 0.35s ease, filter 0.35s ease;
      z-index: 5;
    }
    .cta-card:hover::before {
      opacity: 1;
      filter: brightness(1.15) drop-shadow(0 0 8px color-mix(in srgb, ${theme.accent} 68%, transparent));
    }
    .cta-card:hover {
      animation-play-state: paused;
      transform: scale(1.035) translateY(-3px) !important;
      box-shadow: 0 18px 38px -6px rgba(0, 0, 0, 0.58), 0 8px 18px -4px rgba(0, 0, 0, 0.36), 0 0 26px 2px color-mix(in srgb, ${theme.accent} 32%, transparent), 0 0 0 1px color-mix(in srgb, ${theme.accent} 45%, rgba(255, 255, 255, 0.2));
    }
    .cta-card:active {
      animation-play-state: paused;
      transform: scale(0.98) translateY(0px) !important;
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.42);
      transition-duration: 0.1s;
    }
    .cta-badge {
      position: absolute;
      top: 6px;
      right: 12px;
      font-size: 8px;
      font-weight: 800;
      letter-spacing: 1px;
      padding: 2px 6px;
      border-radius: 999px;
      background: ${theme.accent};
      color: ${getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff')};
      text-transform: uppercase;
    }
    @keyframes ctaIdlePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.015); }
    }
    @keyframes ctaPulseGlow {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 ${theme.glowColor}, ${theme.pillShadow}; }
      50% { transform: scale(1.02); box-shadow: 0 0 22px 4px ${theme.glowColor}, ${theme.pillShadow}; }
    }
    @keyframes ctaFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
    @keyframes ctaShake {
      0%, 82%, 100% { transform: translateX(0) rotate(0deg); }
      85% { transform: translateX(-3px) rotate(-0.8deg); }
      88% { transform: translateX(3px) rotate(0.8deg); }
      91% { transform: translateX(-3px) rotate(-0.5deg); }
      94% { transform: translateX(2px) rotate(0.5deg); }
    }
    @keyframes ctaShimmerSweep {
      0% { transform: translateX(-120%) skewX(-20deg); }
      45%, 100% { transform: translateX(220%) skewX(-20deg); }
    }
    @keyframes modalSlideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .anim-pulse-glow { animation: ctaPulseGlow 2.4s infinite ease-in-out; }
    .anim-float { animation: ctaFloat 2.8s infinite ease-in-out; }
    .anim-shake { animation: ctaShake 3.5s infinite ease-in-out; }
    .anim-shimmer::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 45%;
      height: 100%;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0) 100%);
      animation: ctaShimmerSweep 3s infinite ease-in-out;
      pointer-events: none;
    }
    .cta-left { display: flex; align-items: center; gap: 14px; }
    .cta-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: ${theme.iconBg};
      color: ${theme.iconColor};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
    }
    .cta-title { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
    .cta-sub { font-size: 11px; color: ${mc.actionCards?.textColor || theme.cardSubtext}; margin-top: 3px; }
    .metrics-bar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 8px;
      border: 1px solid ${theme.socialBorder};
      background: ${mc.metrics?.bgColor || theme.socialBg};
      border-radius: ${data.styling.borderRadius}px;
      padding: 14px 8px;
      text-align: center;
      margin: 20px 0;
    }
    .metric-item {
      flex: 1;
      min-width: 0;
    }
    .metric-val {
      font-size: 18px;
      font-weight: 700;
      color: ${mc.metrics?.titleColor || theme.accent};
      font-family: '${data.styling.fontFamily}', serif;
    }
    .metric-lbl {
      font-size: 8.5px;
      color: ${mc.metrics?.textColor || theme.textMuted};
      letter-spacing: 1px;
      margin-top: 2px;
    }
    .process-card {
      border: 1px solid ${theme.socialBorder};
      background: ${mc.processSteps?.bgColor || theme.socialBg};
      border-radius: ${data.styling.borderRadius}px;
      padding: 14px 16px;
      margin-bottom: 10px;
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }
    .process-num {
      font-size: 26px;
      font-weight: bold;
      color: ${mc.processSteps?.headlineColor || theme.accent};
      font-family: '${data.styling.fontFamily}', serif;
      line-height: 1;
    }
    .gallery-container {
      margin: 24px 0;
    }
    .gallery-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 9999px;
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
      background: ${mc.studentGrid?.titleColor ? `${mc.studentGrid.titleColor}20` : `${theme.accent}20`};
      color: ${mc.studentGrid?.titleColor || theme.accent};
      border: 1px solid ${mc.studentGrid?.titleColor ? `${mc.studentGrid.titleColor}40` : `${theme.accent}40`};
    }
    .gallery-title {
      font-size: 14px;
      text-transform: uppercase;
      color: ${mc.studentGrid?.titleColor || theme.accent};
      margin-bottom: 3px;
      font-family: '${data.styling.fontFamily}', serif;
      letter-spacing: 1px;
    }
    .gallery-sub {
      font-size: 11px;
      color: ${mc.studentGrid?.textColor || theme.textMuted};
      margin-bottom: 12px;
      line-height: 1.4;
    }
    .gallery-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .gallery-grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .gallery-mosaic {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .gallery-mosaic-hero {
      grid-column: span 2;
      grid-row: span 2;
    }
    .gallery-carousel {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 8px;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .gallery-carousel::-webkit-scrollbar { display: none; }
    .gallery-carousel .gallery-item {
      flex-shrink: 0;
      scroll-snap-align: center;
      width: 160px;
    }
    .gallery-item {
      position: relative;
      border-radius: ${data.styling.borderRadius > 16 ? 16 : data.styling.borderRadius}px;
      overflow: hidden;
      border: 1px solid ${theme.socialBorder};
      cursor: pointer;
      background: #000;
      box-shadow: 0 4px 14px rgba(0,0,0,0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .gallery-item:hover {
      transform: scale(1.025);
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }
    .gallery-item:hover img {
      transform: scale(1.08);
    }
    .gallery-caption {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 18px 10px 8px;
      background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 60%, transparent 100%);
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 500;
      line-height: 1.3;
      z-index: 4;
      pointer-events: none;
      text-shadow: 0 1px 3px rgba(0,0,0,0.9);
    }
    .gallery-aspect-square { aspect-ratio: 1 / 1; }
    .gallery-aspect-portrait { aspect-ratio: 4 / 5; }
    .gallery-aspect-landscape { aspect-ratio: 4 / 3; }
    .gallery-smart-masonry {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .gallery-smart-masonry .gallery-item.is-landscape {
      grid-column: span 2;
      aspect-ratio: 16 / 10;
    }
    .gallery-smart-masonry .gallery-item.is-portrait {
      grid-column: span 1;
      aspect-ratio: 3 / 4;
    }
    .gallery-smart-masonry .gallery-item.is-square {
      grid-column: span 1;
      aspect-ratio: 1 / 1;
    }
    .gallery-masonry {
      column-count: 2;
      column-gap: 10px;
    }
    .gallery-masonry .gallery-item {
      break-inside: avoid;
      margin-bottom: 10px;
    }
    .gallery-masonry .gallery-item.is-landscape { aspect-ratio: 4 / 3; }
    .gallery-masonry .gallery-item.is-portrait { aspect-ratio: 3 / 4; }
    .gallery-masonry .gallery-item.is-square { aspect-ratio: 1 / 1; }
    .gallery-grid-2 .gallery-item.is-landscape {
      grid-column: span 2;
      aspect-ratio: 16 / 10;
    }
    .gallery-grid-2 .gallery-item.is-portrait {
      grid-column: span 1;
      aspect-ratio: 3 / 4;
    }
    .gallery-carousel .gallery-item.is-landscape {
      width: 210px;
      aspect-ratio: 16 / 10;
    }
    .gallery-carousel .gallery-item.is-portrait {
      width: 145px;
      aspect-ratio: 3 / 4;
    }
    .services-container { margin: 24px 0; }
    .services-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .service-card {
      position: relative;
      border-radius: ${Math.round(data.styling.borderRadius / 1.3)}px;
      border: 1px solid ${theme.socialBorder};
      background: ${mc.services?.bgColor || (getLuminance(theme.bg) > 0.6 ? '#ffffff' : (data.styling.glassmorphism ? 'rgba(255,255,255,0.03)' : theme.socialBg))};
      overflow: hidden;
      transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform;
    }
    .service-card:hover { transform: scale(1.03) translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.35); }
    .service-card:active { transform: scale(0.985); }
    .service-card.featured { border: 1.5px solid ${theme.accent}; box-shadow: 0 6px 20px ${theme.glowColor}; }
    .service-badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 999px;
      font-size: 8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      background: ${theme.accent};
      color: ${getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff')};
    }
    .service-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 800;
      text-decoration: none;
      background: ${theme.accent};
      color: ${getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff')};
      transition: transform 0.2s ease;
    }
    .service-cta:hover { transform: scale(1.05); }
    .footer {
      text-align: center;
      padding: 24px 12px 16px;
      font-size: 11px;
      color: ${mc.footer?.textColor || theme.textMuted};
      opacity: 0.92;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .footer-creator-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.4px;
      text-decoration: none;
      color: ${mc.footer?.accentColor || theme.accent};
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid ${theme.cardBorder};
      transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    }
    .footer-creator-link:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
    }
    .footer-vip-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      max-width: 320px;
      margin: 14px auto 16px;
    }
    .btn-save-pwa, .btn-save-vcard {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 10px 16px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.3px;
      cursor: pointer;
      transition: all 0.25s ease;
      font-family: inherit;
      border: 1px solid ${theme.cardBorder};
      backdrop-filter: blur(8px);
    }
    .btn-save-pwa {
      background: linear-gradient(135deg, ${theme.accent}15, ${theme.accent}30);
      color: ${theme.textMain};
      border-color: ${theme.accent}60;
    }
    .btn-save-pwa:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px ${theme.accent}30;
      background: linear-gradient(135deg, ${theme.accent}30, ${theme.accent}45);
    }
    .btn-save-vcard {
      background: rgba(255, 255, 255, 0.05);
      color: ${theme.textMuted};
    }
    .btn-save-vcard:hover {
      background: rgba(255, 255, 255, 0.1);
      color: ${theme.textMain};
    }
    .pwa-modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      z-index: 9999999;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .pwa-modal-box {
      background: #121214;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      max-width: 380px;
      width: 100%;
      padding: 24px;
      color: #ffffff;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
      animation: modalFadeIn 0.25s ease-out;
    }
    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .whatsapp-float {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 52px;
      height: 52px;
      background-color: #25d366;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
      z-index: 9999;
      transition: transform 0.3s ease;
      text-decoration: none;
    }
    .whatsapp-float:hover {
      transform: scale(1.1);
    }
    ${options?.disableLinks ? `
    /* Modo Carrossel: links externos desativados (clique desabilitado) */
    a, [role="link"], .cta-card, .social-btn, .whatsapp-float, .announcement, .service-cta {
      pointer-events: none !important;
      cursor: default !important;
      text-decoration: none !important;
      -webkit-user-select: none !important;
      user-select: none !important;
    }
    .cta-card:hover, .social-btn:hover, .service-cta:hover, .whatsapp-float:hover {
      transform: none !important;
      box-shadow: none !important;
    }
    ` : ''}
  </style>
</head>
<body>
  ${options?.isTemporaryDemo ? (() => {
    const daysLeft = options?.demoExpiresAt ? getDemoDaysRemaining(options.demoExpiresAt) : 7;
    const daysLeftText = daysLeft > 0 ? `Expira em ${daysLeft} dia${daysLeft > 1 ? 's' : ''}` : '🚨 Expira Hoje!';
    const waPhone = formatWhatsAppPhone(options?.demoWhatsAppPhone || siteData.profile.whatsapp || '5511999999999');
    const clientName = options?.demoClientName || siteData.profile.name || 'Cliente';
    const waText = encodeURIComponent(`Olá! Analisei a demonstração do meu microsite (${clientName}) e quero APROVAR & ATIVAR o meu plano definitivamente!`);
    return `
    <div id="biovip-demo-banner" style="position: sticky; top: 0; left: 0; right: 0; z-index: 999999; background: linear-gradient(90deg, #18181b 0%, #09090b 100%); border-bottom: 2px solid #f59e0b; padding: 10px 16px; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; color: #fef3c7; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
      <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 600;">
        <span style="background: rgba(245, 158, 11, 0.25); border: 1px solid rgba(245, 158, 11, 0.6); color: #fbbf24; font-size: 10px; font-weight: 900; padding: 3px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.08em; display: inline-flex; align-items: center; gap: 4px;">
          ⚡ DEMO TEMPORÁRIA CRM
        </span>
        <span>Demonstração exclusiva para <strong>${escapeHtmlAttr(clientName)}</strong> • ${daysLeftText}</span>
      </div>
      <a href="https://wa.me/${waPhone}?text=${waText}" target="_blank" style="background: #22c55e; color: #052e16; font-size: 11.5px; font-weight: 900; padding: 7px 16px; border-radius: 10px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(34,197,94,0.35); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        ✅ Aprovar & Ativar Microsite Definitivo
      </a>
    </div>`;
  })() : ''}
  ${options?.disableLinks ? `
  <div id="carousel-preview-link-toast" style="position:fixed; top:12px; left:50%; transform:translateX(-50%) translateY(-15px); background:rgba(18,18,24,0.95); border:1px solid rgba(251,191,36,0.4); color:#fef08a; padding:6px 14px; border-radius:999px; font-size:11px; font-weight:700; font-family:system-ui,-apple-system,sans-serif; z-index:999999; pointer-events:none; opacity:0; transition:all 0.25s ease; box-shadow:0 8px 24px rgba(0,0,0,0.8); text-align:center; white-space:nowrap; letter-spacing:0.02em;">
    🔒 Links ativos apenas ao abrir externamente
  </div>
  ` : ''}
  <div class="wrapper">
    ${data.styling.spotlightGlow ? '<div class="spotlight"></div>' : ''}
    
    ${(data.announcement?.enabled || (data as any).announcementBar?.enabled) ? `
    <a href="${options?.disableLinks ? 'javascript:void(0)' : ((data.announcement?.link || (data as any).announcementBar?.link || '').includes('booking') || (data.announcement?.link || (data as any).announcementBar?.link || '').includes('agendar') ? 'javascript:void(0)' : (data.announcement?.link || (data as any).announcementBar?.link || '#agendar'))}" class="announcement" ${options?.disableLinks ? 'tabindex="-1" aria-disabled="true"' : ((data.announcement?.link || (data as any).announcementBar?.link || '').includes('booking') || (data.announcement?.link || (data as any).announcementBar?.link || '').includes('agendar') ? 'onclick="openBookingModal(event); return false;"' : '')}>
      <span>● ${data.announcement?.badge || (data as any).announcementBar?.badge || 'AVISO'}:</span> ${data.announcement?.text || (data as any).announcementBar?.text || ''}
    </a>` : ''}

    <div class="hero">
      <img src="${avatarOptimized}" alt="${escapeHtmlAttr(data.profile.name)}" class="hero-img avatar-img" fetchpriority="high" loading="eager" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700';" />
      <div class="hero-fade">
        <span class="badge-sub">${data.profile.title}</span>
        <h1 class="name">${data.profile.name}</h1>
        <p class="tagline">${data.profile.tagline}</p>
      </div>
    </div>

    <div class="social-bar">
      ${data.profile.whatsapp ? `<a href="${options?.disableLinks ? 'javascript:void(0)' : `https://wa.me/${formatWhatsAppPhone(data.profile.whatsapp)}`}" class="social-btn" ${options?.disableLinks ? 'tabindex="-1" aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"'} title="WhatsApp">${WHATSAPP_SVG_STRING}</a>` : ''}
      ${data.profile.instagram ? `<a href="${options?.disableLinks ? 'javascript:void(0)' : `https://instagram.com/${data.profile.instagram}`}" class="social-btn" ${options?.disableLinks ? 'tabindex="-1" aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"'} title="Instagram">${INSTAGRAM_SVG_STRING}</a>` : ''}
      <button type="button" class="social-btn" ${options?.disableLinks ? 'tabindex="-1" aria-disabled="true"' : 'onclick="openBookingModal(event)"'} title="Abrir Agenda de Atendimentos">${CALENDAR_SVG_STRING}</button>
    </div>

    ${data.highConversion?.enabled && data.highConversion?.urgencyTimer?.enabled ? `
    <div class="urgency-timer" style="margin: 8px 0 14px; padding: 12px 14px; border-radius: ${data.styling.borderRadius}px; background: ${mc.urgencyTimer?.bgColor || theme.socialBg}; border: 1px solid ${theme.socialBorder}; text-align: center;">
      <div style="font-size: 10px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; color: ${mc.urgencyTimer?.titleColor || theme.accent};">
        ${data.highConversion.urgencyTimer.headline}
      </div>
      <div style="font-size: 10px; margin-top: 3px; color: ${mc.urgencyTimer?.textColor || theme.textMuted};">
        ${data.highConversion.urgencyTimer.subheadline}
      </div>
      <div style="font-size: 14px; font-weight: 900; font-family: monospace; margin-top: 4px; letter-spacing: 2px; color: ${mc.urgencyTimer?.titleColor || theme.accent};">
        ${String(data.highConversion.urgencyTimer.minutes || 14).padStart(2, '0')}:${String(data.highConversion.urgencyTimer.seconds || 52).padStart(2, '0')} <span style="font-size: 9px; font-family: sans-serif; font-weight: normal; color: ${mc.urgencyTimer?.textColor || theme.textMuted};">(Restante)</span>
      </div>
    </div>` : ''}

    ${data.profile.cursivePhrase ? `<div class="cursive-banner">${data.profile.cursivePhrase}</div>` : ''}

    <div class="actions">
      <a data-module="qualifierFunnel" href="${options?.disableLinks ? 'javascript:void(0)' : `https://wa.me/${formatWhatsAppPhone(data.profile.whatsapp)}?text=${encodeURIComponent(`Olá ${data.profile.name}! Quero realizar a Triagem Estratégica / Avaliação VIP.`)}`}" ${options?.disableLinks ? 'tabindex="-1" aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"'} class="cta-card anim-shimmer funnel-trigger-card ${data.qualifierFunnel?.animation && data.qualifierFunnel.animation !== 'none' ? `anim-${data.qualifierFunnel.animation}` : ''}" style="${data.qualifierFunnel?.enabled ? '' : 'display:none; '}background: ${mc.qualifierFunnel?.bgColor || `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`}; color: ${mc.qualifierFunnel?.titleColor || getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff')}; border-color: ${theme.accent};">
        <div class="cta-left">
          <div class="cta-icon" style="background: rgba(0,0,0,0.14); color: ${mc.qualifierFunnel?.titleColor || getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff')};">⚡</div>
          <div>
            <div class="cta-title" style="color: ${mc.qualifierFunnel?.titleColor || getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff')};">${data.qualifierFunnel?.triggerButtonLabel || 'AVALIAÇÃO DE CASO / TRIAGEM VIP'}</div>
            <div class="cta-sub" style="color: ${mc.qualifierFunnel?.textColor || (getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff') === '#ffffff' ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.78)')};">${data.qualifierFunnel?.triggerButtonSubtitle || 'Descubra a melhor solução para você em 3 perguntas rápidas.'}</div>
          </div>
        </div>
        <div style="color: ${mc.qualifierFunnel?.titleColor || getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff')}; font-size: 16px;">›</div>
      </a>
      ${data.actionCards.map(c => {
        const animClass = c.animation && c.animation !== 'none' ? `anim-${c.animation}` : '';
        const isBooking = c.linkType === 'booking' || c.url === '#booking' || c.url === '#agendar';
        const rawHref = isBooking
          ? 'javascript:void(0)'
          : c.linkType === 'whatsapp'
          ? `https://wa.me/${formatWhatsAppPhone(data.profile.whatsapp)}?text=${encodeURIComponent(c.whatsappMessage || 'Olá!')}`
          : (c.url || '#');
        const href = options?.disableLinks ? 'javascript:void(0)' : rawHref;
        const targetAttr = (options?.disableLinks || isBooking || !c.openInNewTab || href.startsWith('#') || href.startsWith('javascript:')) ? (options?.disableLinks ? 'tabindex="-1" aria-disabled="true"' : '') : 'target="_blank" rel="noopener noreferrer"';
        const cardOnclick = options?.disableLinks ? 'return false;' : isBooking ? "openBookingModal(event); return false;" : "if(window.fbq) fbq('track', 'Lead');";
        let inlineStyle = '';
        if (c.variant === 'accent') {
          const accentTextColor = c.customText || getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff');
          inlineStyle = `background: ${theme.accent}; color: ${accentTextColor}; border-color: ${theme.accent};`;
        } else if (c.variant === 'outline') {
          inlineStyle = `background: rgba(255,255,255,0.04); color: ${theme.textMain}; border: 1.5px solid ${theme.accent};`;
        } else if (c.variant === 'custom') {
          inlineStyle = `background: ${c.customBg || mc.actionCards?.bgColor || theme.cardBg}; color: ${c.customText || mc.actionCards?.titleColor || theme.cardText};`;
        } else if (mc.actionCards?.bgColor) {
          inlineStyle = `background: ${mc.actionCards.bgColor};`;
        }
        if (c.bgImage) {
          inlineStyle += `background-image: linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 100%), url('${c.bgImage}'); background-size: cover; background-position: center; color: #ffffff;`;
        }
        const resolvedTitleColor =
          c.customTitleColor ||
          (c.variant === 'custom' || c.variant === 'accent' ? c.customText : '') ||
          mc.actionCards?.titleColor ||
          (c.bgImage ? '#ffffff' : c.variant === 'accent' ? getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff') : c.variant === 'outline' ? theme.textMain : theme.cardText);
        const resolvedSubColor =
          c.customSubtitleColor ||
          mc.actionCards?.textColor ||
          (c.bgImage
            ? 'rgba(255,255,255,0.85)'
            : c.variant === 'accent'
            ? (getSafeContrastText(theme.accent, '#0a0a0c', '#ffffff') === '#ffffff' ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.78)')
            : c.variant === 'outline'
            ? theme.textMuted
            : c.variant === 'custom' && c.customText
            ? `${c.customText}cc`
            : theme.cardSubtext);

        const hasSideImg = c.imagePosition && c.imagePosition !== 'none' && c.cardImage;
        const isImgLeft = c.imagePosition === 'left';
        const imgSize = c.imageSize || 88;
        const iconHtml = c.icon === 'MessageCircle' || c.linkType === 'whatsapp'
          ? WHATSAPP_SVG_STRING
          : c.icon === 'Instagram'
          ? INSTAGRAM_SVG_STRING
          : c.icon === 'Calendar'
          ? CALENDAR_SVG_STRING
          : c.icon === 'Scissors'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.47" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`
          : c.icon === 'Scale'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>`
          : c.icon === 'Briefcase'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
          : c.icon === 'GraduationCap'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`
          : c.icon === 'Sparkles'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`
          : c.icon === 'Heart'
          ? `<svg style="width:20px;height:20px;display:inline-block;vertical-align:middle;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
          : CALENDAR_SVG_STRING;

        const ctaBtnBg = getLuminance(resolvedTitleColor) > 0.5 ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.82)';
        const ctaBtnBorder = getLuminance(resolvedTitleColor) > 0.5 ? 'border: 1px solid rgba(255,255,255,0.32);' : '';
        if (hasSideImg) {
          return `
      <a href="${href}" ${targetAttr} class="cta-card ${animClass}" style="${inlineStyle} ${c.imageFitStyle === 'popout' ? 'overflow: visible; margin-top: 18px;' : ''} flex-direction: ${isImgLeft ? 'row-reverse' : 'row'};" onclick="${cardOnclick}">
        ${c.badgeText ? `<span class="cta-badge">${c.badgeText}</span>` : ''}
        <div style="flex: 1; text-align: ${isImgLeft ? 'right' : 'left'}; padding-${isImgLeft ? 'left' : 'right'}: 12px;">
          <div class="cta-title" style="font-size: 13.5px; color: ${resolvedTitleColor};">${c.title}</div>
          <div class="cta-sub" style="margin-top: 4px; color: ${resolvedSubColor};">${c.subtitle}</div>
          ${c.ctaActionText ? `<div style="display: inline-flex; align-items: center; gap: 5px; margin-top: 8px; padding: 4px 10px; border-radius: 6px; background: ${ctaBtnBg}; ${ctaBtnBorder} color: #fff; font-size: 9.5px; font-weight: 800; letter-spacing: 1px; text-decoration: underline;">${c.ctaActionText} 👆</div>` : ''}
        </div>
        <img src="${optimizeImageUrl(c.cardImage, 720)}" alt="${escapeHtmlAttr(c.title)}" loading="lazy" decoding="async" style="width: ${imgSize}px; height: ${c.imageFitStyle === 'popout' ? imgSize + 18 : imgSize}px; object-fit: cover; border-radius: ${c.imageFitStyle === 'circle' ? '999px' : c.imageFitStyle === 'popout' ? '14px 14px 10px 10px' : '12px'}; ${c.imageFitStyle === 'popout' ? 'margin-top: -26px;' : ''} flex-shrink: 0; box-shadow: 0 8px 20px rgba(0,0,0,0.35);" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500';" />
      </a>`;
        }

        return `
      <a href="${href}" ${targetAttr} class="cta-card ${animClass}" style="${inlineStyle}" onclick="${cardOnclick}">
        ${c.badgeText ? `<span class="cta-badge">${c.badgeText}</span>` : ''}
        <div class="cta-left">
          <div class="cta-icon">${iconHtml}</div>
          <div>
            <div class="cta-title" style="color: ${resolvedTitleColor};">${c.title}</div>
            <div class="cta-sub" style="color: ${resolvedSubColor};">${c.subtitle}</div>
            ${c.ctaActionText ? `<div style="display: inline-flex; align-items: center; gap: 5px; margin-top: 6px; padding: 3px 8px; border-radius: 5px; background: ${ctaBtnBg}; ${ctaBtnBorder} color: #fff; font-size: 9px; font-weight: 800; text-decoration: underline;">${c.ctaActionText} 👆</div>` : ''}
          </div>
        </div>
        <div style="color: ${resolvedTitleColor}; opacity: 0.7; font-size: 16px;">›</div>
      </a>`;
      }).join('')}
    </div>

    ${data.metrics?.enabled ? `
    <div class="metrics-bar">
      <div class="metric-item">
        <div class="metric-val">${data.metrics.stat1Value || '+500'}</div>
        <div class="metric-lbl">${data.metrics.stat1Label || 'CLIENTES'}</div>
      </div>
      <div class="metric-item">
        <div class="metric-val">${data.metrics.stat2Value || '8 anos'}</div>
        <div class="metric-lbl">${data.metrics.stat2Label || 'DE EXPERIÊNCIA'}</div>
      </div>
      <div class="metric-item">
        <div class="metric-val">${data.metrics.stat3Value || '100%'}</div>
        <div class="metric-lbl">${data.metrics.stat3Label || 'SATISFAÇÃO'}</div>
      </div>
    </div>` : ''}

    ${data.processSteps.enabled ? `
    <div style="margin: 24px 0;">
      <h3 style="font-size: 14px; text-transform: uppercase; color: ${mc.processSteps?.headlineColor || theme.accent}; margin-bottom: 12px;">
        ${data.processSteps.headline}
      </h3>
      ${data.processSteps.steps.map(st => `
      <div class="process-card">
        <div class="process-num">${st.number}</div>
        <div>
          <div style="font-size: 12px; font-weight: bold; color: ${mc.processSteps?.titleColor || theme.textMain};">${st.title}</div>
          <div style="font-size: 11px; color: ${mc.processSteps?.textColor || theme.textMuted}; margin-top: 3px;">${st.description}</div>
        </div>
      </div>`).join('')}
    </div>` : ''}

    ${data.studentGrid?.enabled && data.studentGrid.photos?.length > 0 ? `
    <div class="gallery-container" id="galeria">
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:10px;">
        <div>
          ${data.studentGrid.badge ? `<span class="gallery-badge">${data.studentGrid.badge}</span>` : ''}
          <h3 class="gallery-title">${data.studentGrid.headline}</h3>
          ${data.studentGrid.subtitle ? `<p class="gallery-sub">${data.studentGrid.subtitle}</p>` : ''}
        </div>
        <span style="font-size:9px; color:${mc.studentGrid?.textColor || theme.textMuted}; font-family:monospace; background:${theme.socialBg}; padding:2px 8px; border-radius:6px; border:1px solid ${theme.socialBorder};">
          ${data.studentGrid.photos.length} fotos
        </span>
      </div>

      <div class="${
        data.studentGrid.layout === 'smart_masonry' ? 'gallery-smart-masonry' :
        data.studentGrid.layout === 'masonry' ? 'gallery-masonry' :
        data.studentGrid.layout === 'grid2' ? 'gallery-grid-2' :
        data.studentGrid.layout === 'mosaic' ? 'gallery-mosaic' :
        data.studentGrid.layout === 'carousel' ? 'gallery-carousel' : 'gallery-grid-3'
      }">
        ${data.studentGrid.photos.map((p, idx) => {
          const isHero = data.studentGrid.layout === 'mosaic' && idx === 0;
          const aspectClass = isHero ? 'gallery-aspect-square gallery-mosaic-hero' :
            data.studentGrid.aspectRatio === 'portrait' ? 'gallery-aspect-portrait' :
            data.studentGrid.aspectRatio === 'landscape' ? 'gallery-aspect-landscape' :
            data.studentGrid.aspectRatio === 'square' ? 'gallery-aspect-square' : '';
          const caption = ((data.studentGrid as any).captions?.[idx] || '').trim();
          return `
          <div class="gallery-item ${aspectClass}" data-photo-idx="${idx}" onclick="openGalleryLightbox(${idx})">
            <img src="${optimizeImageUrl(p, 900)}" alt="${escapeHtmlAttr(caption || `Foto ${idx + 1}`)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${getNicheFallbackImage(data.profile.title || data.profile.tagline || '', idx)}';" />
            ${caption ? `<div class="gallery-caption">${escapeHtmlAttr(caption)}</div>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>` : ''}

    ${data.beforeAfter?.enabled ? `
    <div style="margin: 24px 0;">
      <h3 style="font-size: 14px; text-transform: uppercase; color: ${mc.beforeAfter?.titleColor || theme.accent}; margin-bottom: 6px; font-family: '${data.styling.fontFamily}', serif;">
        ${data.beforeAfter.headline}
      </h3>
      ${data.beforeAfter.subtitle ? `<p style="font-size: 11px; color: ${mc.beforeAfter?.textColor || theme.textMuted}; margin-bottom: 10px;">${data.beforeAfter.subtitle}</p>` : ''}
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div style="position: relative; border-radius: 14px; overflow: hidden; border: 1px solid ${theme.socialBorder}; height: 170px;">
          <img src="${optimizeImageUrl(data.beforeAfter.beforeUrl, 840)}" alt="Antes" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover; display:block;" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${getNicheFallbackImage(data.profile.title || data.profile.tagline || '', 1)}';" />
          <span style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.75); color:#fff; font-size:9px; font-weight:700; padding:2px 8px; border-radius:6px; text-transform:uppercase;">Antes</span>
        </div>
        <div style="position: relative; border-radius: 14px; overflow: hidden; border: 1px solid ${theme.socialBorder}; height: 170px;">
          <img src="${optimizeImageUrl(data.beforeAfter.afterUrl, 840)}" alt="Depois" loading="lazy" decoding="async" style="width:100%; height:100%; object-fit:cover; display:block;" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${getNicheFallbackImage(data.profile.title || data.profile.tagline || '', 2)}';" />
          <span style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.75); color:#fff; font-size:9px; font-weight:700; padding:2px 8px; border-radius:6px; text-transform:uppercase;">Depois</span>
        </div>
      </div>
    </div>` : ''}

    ${data.locationCard.enabled ? `
    <div class="cta-card" style="margin-top: 16px; background: ${mc.locationCard?.bgColor || theme.socialBg}; border: 1px solid ${theme.socialBorder}; color: ${mc.locationCard?.titleColor || theme.textMain}; padding: 14px; border-radius: 18px; display: block;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="cta-icon" style="color: ${mc.locationCard?.accentColor || theme.iconColor}; font-size: 20px; flex-shrink: 0;">📍</div>
        <div style="flex: 1; min-width: 0;">
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <div class="cta-title" style="color: ${mc.locationCard?.titleColor || theme.textMain}; font-size: 13px; font-weight: 700;">${data.locationCard.headline}</div>
            ${data.locationCard.showHours !== false && data.locationCard.openStatus ? `<span style="font-size:8px; font-weight:800; padding:2px 6px; border-radius:999px; background:${getLuminance(theme.bg) > 0.6 ? 'rgba(5,150,105,0.12)' : 'rgba(16,185,129,0.18)'}; color:${getLuminance(theme.bg) > 0.6 ? '#047857' : '#10b981'}; border:1px solid ${getLuminance(theme.bg) > 0.6 ? 'rgba(5,150,105,0.3)' : 'rgba(16,185,129,0.35)'};">● ${data.locationCard.openStatus}</span>` : ''}
          </div>
          <div class="cta-sub" style="color: ${mc.locationCard?.textColor || theme.textMuted}; font-size: 11px; margin-top: 2px;">${data.locationCard.address}</div>
          ${data.locationCard.showHours !== false && data.locationCard.hours ? `<div style="font-size:10px; margin-top:4px; opacity:0.9; font-weight:600; color: ${mc.locationCard?.textColor || theme.textMain};">🕒 ${data.locationCard.hours}</div>` : ''}
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08);">
        <a href="${options?.disableLinks ? 'javascript:void(0)' : (data.locationCard.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(data.locationCard.address)}`)}" ${options?.disableLinks ? 'tabindex="-1"' : 'target="_blank" rel="noopener noreferrer"'} style="padding: 5px 2px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid ${theme.socialBorder}; color: ${theme.textMain}; font-size: 9.5px; font-weight: 700; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 3px;">🗺️ Maps</a>
        <a href="${options?.disableLinks ? 'javascript:void(0)' : `https://waze.com/ul?q=${encodeURIComponent(data.locationCard.address)}&navigate=yes`}" ${options?.disableLinks ? 'tabindex="-1"' : 'target="_blank" rel="noopener noreferrer"'} style="padding: 5px 2px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid ${theme.socialBorder}; color: ${theme.textMain}; font-size: 9.5px; font-weight: 700; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 3px;">🚗 Waze</a>
        <a href="${options?.disableLinks ? 'javascript:void(0)' : `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(data.locationCard.address)}`}" ${options?.disableLinks ? 'tabindex="-1"' : 'target="_blank" rel="noopener noreferrer"'} style="padding: 5px 2px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid ${theme.socialBorder}; color: #fff; font-size: 9px; font-weight: 900; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 3px;">UBER</a>
        <button type="button" onclick="copyAddress(this, '${escapeHtmlAttr(data.locationCard.address)}')" style="padding: 5px 2px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid ${theme.socialBorder}; color: ${theme.textMain}; font-size: 9.5px; font-weight: 700; text-align: center; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 3px;">📋 Copiar</button>
      </div>
    </div>` : ''}

    ${data.services?.enabled && data.services.items?.length > 0 ? `
    <div class="services-container" id="catalogo">
      <div style="margin-bottom: 12px;">
        ${data.services.badge ? `<span class="gallery-badge" style="color:${mc.services?.headlineColor || theme.accent}; border-color:${mc.services?.headlineColor ? `${mc.services.headlineColor}40` : `${theme.accent}40`}; background:${mc.services?.headlineColor ? `${mc.services.headlineColor}20` : `${theme.accent}20`};">${data.services.badge}</span>` : ''}
        <h3 class="gallery-title" style="color:${mc.services?.headlineColor || theme.accent};">${data.services.headline}</h3>
        ${data.services.subtitle ? `<p class="gallery-sub" style="color:${mc.services?.textColor || theme.textMuted};">${data.services.subtitle}</p>` : ''}
      </div>

      ${(() => {
        const cats = Array.from(new Set(data.services.items.map((s: any) => (s.category || s.badge || '').trim()).filter(Boolean)));
        if (cats.length < 2) return '';
        return `
        <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:8px; margin-bottom:10px; scrollbar-width:none;">
          <button type="button" class="srv-cat-btn active" onclick="filterServices(this, 'all')" style="padding:4px 10px; font-size:9.5px; font-weight:800; text-transform:uppercase; border-radius:999px; background:${mc.services?.headlineColor || theme.accent}; color:${getSafeContrastText(mc.services?.headlineColor || theme.accent, '#0a0a0c', '#ffffff')}; border:1px solid ${mc.services?.headlineColor || theme.accent}; cursor:pointer; flex-shrink:0;">Todos</button>
          ${cats.map(c => `
          <button type="button" class="srv-cat-btn" onclick="filterServices(this, '${escapeHtmlAttr(c)}')" style="padding:4px 10px; font-size:9.5px; font-weight:800; text-transform:uppercase; border-radius:999px; background:rgba(255,255,255,0.06); color:${theme.textMain}; border:1px solid ${theme.socialBorder}; cursor:pointer; flex-shrink:0;">${escapeHtmlAttr(c)}</button>
          `).join('')}
        </div>`;
      })()}

      <div class="${data.services.layout === 'grid2' ? 'services-grid-2' : ''}" style="${data.services.layout !== 'grid2' ? 'display:flex; flex-direction:column; gap:10px;' : ''}">
        ${data.services.items.map((srv: any, idx: number) => {
          const srvCat = escapeHtmlAttr((srv.category || srv.badge || '').trim());
          const isSrvBooking = srv.actionType === 'booking';
          const defaultSrvMsg = `Olá ${data.profile.name}! Tenho interesse em "${srv.name}" (${srv.price}). Gostaria de verificar a disponibilidade!`;
          const waMsg = encodeURIComponent(srv.whatsappMessage || defaultSrvMsg);
          const rawSrvHref = isSrvBooking
            ? 'javascript:void(0)'
            : srv.actionType === 'link' && srv.customUrl
            ? srv.customUrl
            : `https://wa.me/${formatWhatsAppPhone(data.profile.whatsapp)}?text=${waMsg}`;
          const srvHref = options?.disableLinks ? 'javascript:void(0)' : rawSrvHref;
          const srvTargetAttr = (isSrvBooking || options?.disableLinks) ? (options?.disableLinks ? 'tabindex="-1" aria-disabled="true"' : '') : 'target="_blank" rel="noopener noreferrer"';
          const srvOnclick = options?.disableLinks ? 'return false;' : isSrvBooking ? `openBookingModal(event, '${escapeHtmlAttr(srv.name)}'); return false;` : "if(window.fbq) fbq('track', 'Lead');";
          const btnText = srv.ctaLabel || 'Reservar';
          const srvTitleColor = mc.services?.titleColor || theme.textMain;
          const srvDescColor = mc.services?.textColor || theme.textMuted;
          const srvPriceColor = mc.services?.headlineColor || theme.accent;

          if (data.services.layout === 'featured') {
            return `
            <div class="service-card ${srv.featured ? 'featured' : ''}" data-category="${srvCat}">
              <div style="position:relative; height:145px; width:100%; overflow:hidden; background:#000;">
                <img src="${optimizeImageUrl(srv.imageUrl, 720)}" alt="${escapeHtmlAttr(srv.name)}" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${getNicheFallbackImage(data.profile.title || data.profile.tagline || '', idx)}';" />
                ${srv.badge ? `<span class="service-badge" style="position:absolute; top:10px; left:10px;">${srv.badge}</span>` : ''}
                ${srv.duration ? `<span style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.75); color:#fff; font-size:9px; font-weight:700; padding:3px 8px; border-radius:999px;">⏱ ${srv.duration}</span>` : ''}
              </div>
              <div style="padding:12px 14px;">
                <div class="service-title" style="font-size:13px; font-weight:700; color:${srvTitleColor};">${srv.name}</div>
                <div class="service-desc" style="font-size:11px; color:${srvDescColor}; margin-top:4px; line-height:1.4;">${srv.description}</div>
                <div style="display:flex; align-items:center; justify-content:space-between; margin-top:12px; padding-top:10px; border-top:1px solid ${theme.socialBorder};">
                  <div>
                    ${srv.oldPrice ? `<span class="service-old-price" style="font-size:10px; text-decoration:line-through; color:${srvDescColor}; opacity:0.7; display:block;">${srv.oldPrice}</span>` : ''}
                    <span class="service-price" style="font-size:14px; font-weight:800; color:${srvPriceColor};">${srv.price}</span>
                  </div>
                  <a href="${srvHref}" ${srvTargetAttr} class="service-cta" onclick="${srvOnclick}">${btnText} ›</a>
                </div>
              </div>
            </div>`;
          }

          if (data.services.layout === 'grid2') {
            return `
            <div class="service-card ${srv.featured ? 'featured' : ''}" data-category="${srvCat}" style="display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="position:relative; aspect-ratio:4/3; width:100%; overflow:hidden; background:#000;">
                  <img src="${optimizeImageUrl(srv.imageUrl, 720)}" alt="${escapeHtmlAttr(srv.name)}" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${getNicheFallbackImage(data.profile.title || data.profile.tagline || '', idx)}';" />
                  ${srv.badge ? `<span class="service-badge" style="position:absolute; top:6px; left:6px; font-size:7px;">${srv.badge}</span>` : ''}
                </div>
                <div style="padding:10px;">
                  <div class="service-title" style="font-size:11.5px; font-weight:700; line-height:1.25; color:${srvTitleColor};">${srv.name}</div>
                  ${srv.duration ? `<div style="font-size:9px; color:${srvDescColor}; margin-top:3px;">⏱ ${srv.duration}</div>` : ''}
                  <div class="service-desc" style="font-size:10px; color:${srvDescColor}; margin-top:4px; line-height:1.35;">${srv.description}</div>
                </div>
              </div>
              <div style="padding:0 10px 10px 10px;">
                <div style="margin-bottom:6px;">
                  ${srv.oldPrice ? `<span class="service-old-price" style="font-size:9px; text-decoration:line-through; color:${srvDescColor}; margin-right:4px;">${srv.oldPrice}</span>` : ''}
                  <span class="service-price" style="font-size:12.5px; font-weight:800; color:${srvPriceColor};">${srv.price}</span>
                </div>
                <a href="${srvHref}" ${srvTargetAttr} class="service-cta" style="width:100%;" onclick="${srvOnclick}">${btnText}</a>
              </div>
            </div>`;
          }

          return `
          <div class="service-card ${srv.featured ? 'featured' : ''}" data-category="${srvCat}" style="padding:12px; display:flex; gap:12px; align-items:center;">
            <div style="position:relative; width:68px; height:68px; border-radius:12px; overflow:hidden; flex-shrink:0; background:#000;">
              <img src="${optimizeImageUrl(srv.imageUrl, 720)}" alt="${escapeHtmlAttr(srv.name)}" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${getNicheFallbackImage(data.profile.title || data.profile.tagline || '', idx)}';" />
            </div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                ${srv.badge ? `<span class="service-badge">${srv.badge}</span>` : ''}
                ${srv.duration ? `<span style="font-size:9px; color:${srvDescColor};">⏱ ${srv.duration}</span>` : ''}
              </div>
              <div class="service-title" style="font-size:12.5px; font-weight:700; margin-top:2px; color:${srvTitleColor};">${srv.name}</div>
              <div class="service-desc" style="font-size:10.5px; color:${srvDescColor}; margin-top:2px; line-height:1.35;">${srv.description}</div>
              <div style="display:flex; align-items:center; justify-content:space-between; margin-top:8px;">
                <div>
                  ${srv.oldPrice ? `<span class="service-old-price" style="font-size:9.5px; text-decoration:line-through; color:${srvDescColor}; margin-right:5px;">${srv.oldPrice}</span>` : ''}
                  <span class="service-price" style="font-size:13px; font-weight:800; color:${srvPriceColor};">${srv.price}</span>
                </div>
                <a href="${srvHref}" ${srvTargetAttr} class="service-cta" onclick="${srvOnclick}">${btnText}</a>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>

      <!-- Trust Badges & Facilidades (Quebra de Objeções) -->
      ${(data.trustBadges?.enabled ?? true) ? (() => {
        const badgeItems = data.trustBadges?.items?.length
          ? data.trustBadges.items
          : [
              { id: 'tb-1', icon: 'credit-card', title: 'Cartão até 12x', subtitle: 'Crédito e Débito' },
              { id: 'tb-2', icon: 'zap', title: 'Pix Instantâneo', subtitle: 'Confirmação imediata' },
              { id: 'tb-3', icon: 'car', title: 'Fácil Acesso', subtitle: 'Local seguro' },
              { id: 'tb-4', icon: 'coffee', title: 'Espaço VIP', subtitle: 'Climatizado & Café' },
            ];

        const getBadgeEmoji = (iconName?: string) => {
          switch ((iconName || '').toLowerCase()) {
            case 'credit-card':
            case 'card':
              return '💳';
            case 'zap':
            case 'pix':
            case 'lightning':
              return '⚡';
            case 'car':
            case 'parking':
              return '🚗';
            case 'shield':
            case 'security':
            case 'vip':
              return '🛡️';
            case 'coffee':
            case 'cafe':
              return '☕';
            case 'clock':
            case 'time':
              return '⏰';
            case 'map-pin':
            case 'location':
              return '📍';
            case 'award':
            case 'trophy':
              return '🏆';
            case 'star':
              return '⭐';
            case 'heart':
              return '💖';
            case 'check':
              return '✅';
            case 'wifi':
              return '📶';
            case 'lock':
              return '🔒';
            default:
              return '✨';
          }
        };

        return `
        <div class="trust-badges-container" style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:14px; padding:12px; border-radius:16px; background:${getLuminance(theme.bg) > 0.6 ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'}; border:1px solid ${theme.socialBorder};">
          ${badgeItems.map(badge => `
            <div style="display:flex; align-items:center; gap:8px; min-width:0; overflow:hidden;">
              <span style="font-size:16px; line-height:1;">${getBadgeEmoji(badge.icon)}</span>
              <div style="min-width:0; overflow:hidden;">
                <div style="font-size:10px; font-weight:700; color:${theme.textMain}; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${badge.title}</div>
                <div style="font-size:8.5px; color:${theme.textMuted}; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">${badge.subtitle}</div>
              </div>
            </div>
          `).join('')}
        </div>`;
      })() : ''}
    </div>` : ''}

    ${data.testimonials?.enabled && data.testimonials.items?.length > 0 ? `
    <div class="testimonials-section" style="margin: 24px 0;">
      <h3 style="font-size: 14px; text-transform: uppercase; color: ${mc.testimonials?.headlineColor || theme.accent}; margin-bottom: 8px; font-family: '${data.styling.fontFamily}', serif;">
        ${data.testimonials.headline}
      </h3>
      <!-- Google Reviews Badge -->
      <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-radius:14px; background:${getLuminance(theme.bg) > 0.6 ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${theme.socialBorder}; margin-bottom:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:28px; height:28px; border-radius:8px; background:#ffffff; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <svg style="width:16px; height:16px;" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:5px;">
              <span style="font-size:11px; font-weight:800; color:${theme.textMain};">4.9</span>
              <span style="color:#fbbf24; font-size:10px;">★★★★★</span>
            </div>
            <div style="font-size:8.5px; color:${theme.textMuted};">Google Meu Negócio · Avaliações Reais</div>
          </div>
        </div>
        ${(data.profile.mapsUrl || data.locationCard.mapsUrl) ? `<a href="${options?.disableLinks ? 'javascript:void(0)' : (data.profile.mapsUrl || data.locationCard.mapsUrl)}" ${options?.disableLinks ? 'tabindex="-1"' : 'target="_blank" rel="noopener noreferrer"'} style="font-size:9px; font-weight:700; color:#38bdf8; text-decoration:none; padding:4px 8px; border-radius:6px; background:rgba(56,189,248,0.1);">Ver no Maps ↗</a>` : ''}
      </div>
      <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 6px; scrollbar-width: none;">
        ${data.testimonials.items.map(t => `
        <div style="flex-shrink: 0; width: 240px; padding: 14px; border-radius: 16px; background: ${mc.testimonials?.bgColor || theme.socialBg}; border: 1px solid ${theme.socialBorder}; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
              <div style="color: #fbbf24; font-size: 11px;">${'★'.repeat(t.rating || 5)}</div>
              <span style="font-size:8px; font-weight:700; color:#34d399; background:rgba(52,211,153,0.12); padding:2px 6px; border-radius:999px;">✓ Verificado</span>
            </div>
            <p style="font-size: 11px; line-height: 1.45; font-style: italic; color: ${mc.testimonials?.textColor || theme.textMuted};">"${t.text}"</p>
          </div>
          <div style="display:flex; align-items:center; gap:8px; margin-top:10px; padding-top:8px; border-top:1px solid rgba(255,255,255,0.06);">
            <div style="width:24px; height:24px; border-radius:50%; background:${theme.accent}30; color:${theme.accent}; font-size:9px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              ${t.clientName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
            </div>
            <div>
              <div style="font-size: 10.5px; font-weight: 700; color: ${mc.testimonials?.titleColor || theme.textMain};">${t.clientName}</div>
              <div style="font-size: 8.5px; opacity: 0.65; color: ${theme.textMuted};">${t.city}</div>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>` : ''}

    <div class="about-section" style="${data.aboutMe?.enabled ? '' : 'display:none; '}margin: 24px 0;">
      <h3 class="about-headline" style="font-size: 14px; text-transform: uppercase; color: ${mc.aboutMe?.titleColor || theme.accent}; margin-bottom: 10px; font-family: '${data.styling.fontFamily}', serif;">
        ${data.aboutMe?.headline || 'Sobre'}
      </h3>
      ${((data.aboutMe as any)?.photoUrl || data.profile.aboutPhotoUrl) ? `
      <div class="about-photo-wrapper" style="width: 100%; height: ${(data.aboutMe as any)?.photoHeight || 180}px; border-radius: 16px; overflow: hidden; margin-bottom: 10px; background: #000;">
        <img class="about-photo-img" src="${aboutPhotoOptimized}" alt="Sobre" style="width: 100%; height: 100%; object-fit: cover; object-position: ${(data.aboutMe as any)?.photoPosX ?? 50}% ${(data.aboutMe as any)?.photoPosY ?? 50}%;${(data.aboutMe as any)?.photoScale && (data.aboutMe as any).photoScale !== 100 ? ` transform: scale(${(data.aboutMe as any).photoScale / 100}); transform-origin: ${(data.aboutMe as any)?.photoPosX ?? 50}% ${(data.aboutMe as any)?.photoPosY ?? 50}%;` : ''} display: block;" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${getNicheFallbackImage(data.profile.title || data.profile.tagline || '', 3)}';" />
      </div>` : ''}
      <p class="about-paragraph about-bio" style="font-size: 12px; line-height: 1.55; text-align: justify; color: ${mc.aboutMe?.textColor || theme.textMuted};">
        ${data.aboutMe?.paragraph || ''}
      </p>
      ${data.aboutMe?.closingPhrase ? `
      <div class="about-closing" style="text-align: center; font-size: 22px; font-style: italic; margin-top: 8px; font-family: '${theme.fontScript}', cursive, serif; color: ${mc.aboutMe?.titleColor || theme.accent};">
        ${data.aboutMe.closingPhrase}
      </div>` : ''}
    </div>

    <div class="faq-section" style="${(data.faq?.enabled && data.faq.items?.length > 0) ? '' : 'display:none; '}margin: 24px 0;">
      <h3 class="faq-headline" style="font-size: 14px; text-transform: uppercase; color: ${mc.faq?.headlineColor || theme.accent}; margin-bottom: 10px; font-family: '${data.styling.fontFamily}', serif;">
        ${data.faq?.headline || 'Dúvidas Frequentes'}
      </h3>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${(data.faq?.items || []).map(item => `
        <details class="faq-item" style="border-radius: 14px; padding: 12px 14px; background: ${mc.faq?.bgColor || theme.socialBg}; border: 1px solid ${theme.socialBorder};">
          <summary class="faq-question" style="font-size: 12px; font-weight: 600; cursor: pointer; color: ${mc.faq?.titleColor || theme.textMain};">${item.question}</summary>
          <p class="faq-answer" style="font-size: 11px; line-height: 1.45; margin-top: 8px; color: ${mc.faq?.textColor || theme.textMuted};">${item.answer}</p>
        </details>`).join('')}
      </div>
    </div>

    <div class="footer">
      <div class="footer-vip-actions">
        <button type="button" class="btn-save-pwa" onclick="openSaveContactModal()">
          <span>📲 Salvar Cartão na Tela Inicial</span>
        </button>
        <button type="button" class="btn-save-vcard" onclick="downloadVCardContact()">
          <span>📇 Salvar Contato na Agenda</span>
        </button>
      </div>
      <div>© ${new Date().getFullYear()} ${data.profile.name}. Todos os direitos reservados.</div>
      ${(() => {
        const creatorInfo = resolveCreatorFooterInfo(data, options?.landingConfig);
        const creatorHref = options?.disableLinks ? 'javascript:void(0)' : creatorInfo.href;
        const creatorTarget = options?.disableLinks ? 'tabindex="-1" aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"';
        return `<a href="${creatorHref}" ${creatorTarget} class="footer-creator-link" title="Criado por ${creatorInfo.brandName}">
          <span>✨ Criado por <strong>${creatorInfo.brandName}</strong>${creatorInfo.ctaLabel ? ` · ${creatorInfo.ctaLabel}` : ''}</span>
          <span style="font-size:11px; line-height:1;">↗</span>
        </a>`;
      })()}
    </div>
  </div>

  ${data.profile.whatsapp ? (() => {
    const exportNiche = `${data.profile.title || ''} ${data.profile.name || ''} ${data.theme || ''}`.toLowerCase();
    let exportBubble = '💬 Olá! Posso te ajudar com alguma dúvida?';
    if (exportNiche.includes('barber') || exportNiche.includes('barbearia') || exportNiche.includes('navalha')) {
      exportBubble = '✂️ Quer garantir seu horário para hoje? Toque aqui!';
    } else if (exportNiche.includes('unha') || exportNiche.includes('nail') || exportNiche.includes('lash') || exportNiche.includes('cilio') || exportNiche.includes('estetic') || exportNiche.includes('beleza')) {
      exportBubble = '✨ Agende seu horário com exclusividade no WhatsApp';
    } else if (exportNiche.includes('odonto') || exportNiche.includes('dentist') || exportNiche.includes('saude') || exportNiche.includes('sorriso')) {
      exportBubble = '🦷 Agende sua avaliação presencial no WhatsApp';
    } else if (exportNiche.includes('advoc') || exportNiche.includes('direito') || exportNiche.includes('juridic')) {
      exportBubble = '⚖️ Dúvidas jurídicas? Fale com nossa equipe agora';
    } else if (exportNiche.includes('restaurante') || exportNiche.includes('burger') || exportNiche.includes('gastronom')) {
      exportBubble = '🍔 Faça seu pedido ou reserve mesa pelo WhatsApp';
    }
    return `
  <div id="wa-bubble-container" style="position:fixed; bottom:82px; right:20px; z-index:9999; max-width:210px; padding:10px 12px; border-radius:16px; background:rgba(15,23,42,0.96); border:1px solid rgba(34,197,94,0.4); box-shadow:0 12px 30px rgba(0,0,0,0.6); backdrop-filter:blur(8px); font-family:system-ui, sans-serif; display:flex; flex-direction:column; gap:4px; animation:bounce 2s infinite ease-in-out;">
    <div style="display:flex; align-items:center; justify-content:space-between; font-size:8.5px; font-weight:800; color:#34d399;">
      <span style="display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; border-radius:50%; background:#34d399; display:inline-block;"></span> Online agora</span>
      <button type="button" onclick="document.getElementById('wa-bubble-container').style.display='none'" style="background:none; border:none; color:#94a3b8; font-size:11px; cursor:pointer; padding:0 2px;">✕</button>
    </div>
    <a href="${options?.disableLinks ? 'javascript:void(0)' : `https://wa.me/${formatWhatsAppPhone(data.profile.whatsapp)}`}" ${options?.disableLinks ? 'tabindex="-1"' : 'target="_blank" rel="noopener noreferrer"'} style="color:#ffffff; font-size:10.5px; line-height:1.35; font-weight:600; text-decoration:none;">${exportBubble}</a>
  </div>
  <a href="${options?.disableLinks ? 'javascript:void(0)' : `https://wa.me/${formatWhatsAppPhone(data.profile.whatsapp)}`}" class="whatsapp-float" ${options?.disableLinks ? 'tabindex="-1" aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"'} title="Falar no WhatsApp" onclick="${options?.disableLinks ? 'return false;' : "if(window.fbq) fbq('track', 'Lead');"}">
    <span style="position:absolute; top:-3px; right:-3px; width:18px; height:18px; border-radius:50%; background:#ef4444; color:#fff; font-size:10px; font-weight:800; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.4);">1</span>
    <svg style="width:28px;height:28px;display:inline-block;vertical-align:middle;fill:#ffffff;" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/><path d="M12 1c-6.075 0-11 4.925-11 11 0 2.102.589 4.066 1.606 5.744l-1.606 5.256 5.438-1.57c1.613.918 3.479 1.442 5.562 1.442 6.075 0 11-4.925 11-11s-4.925-11-11-11zm0 19.825c-1.875 0-3.626-.543-5.111-1.479l-.366-.23-3.232.933.951-3.111-.252-.387c-1.047-1.606-1.615-3.501-1.615-5.551 0-5.132 4.173-9.305 9.305-9.305 5.132 0 9.305 4.173 9.305 9.305 0 5.132-4.173 9.305-9.305 9.305z"/></svg>
  </a>`;
  })() : ''}

  <!-- Modal Lightbox da Galeria de Fotos -->
  <div id="gallery-lightbox-modal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(0,0,0,0.92); backdrop-filter:blur(8px); align-items:center; justify-content:center; flex-direction:column; padding:16px;" onclick="closeGalleryLightbox()">
    <div style="position:absolute; top:20px; right:20px; display:flex; gap:12px; align-items:center; z-index:10;" onclick="event.stopPropagation()">
      <span id="lb-counter" style="color:#fff; font-size:12px; font-weight:700; background:rgba(255,255,255,0.15); padding:4px 10px; border-radius:999px;">1 / 1</span>
      <button onclick="closeGalleryLightbox()" style="background:rgba(255,255,255,0.2); color:#fff; border:none; width:36px; height:36px; border-radius:50%; font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
    </div>
    <div style="position:relative; max-width:92vw; max-height:82vh; display:flex; align-items:center; justify-content:center;" onclick="event.stopPropagation()">
      <button onclick="navGalleryLightbox(-1)" style="position:absolute; left:-20px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.65); color:#fff; border:1px solid rgba(255,255,255,0.2); width:40px; height:40px; border-radius:50%; font-size:22px; cursor:pointer; z-index:5;">‹</button>
      <img id="lb-img" src="" style="max-width:90vw; max-height:76vh; object-fit:contain; border-radius:14px; box-shadow:0 20px 50px rgba(0,0,0,0.8); border:1px solid rgba(255,255,255,0.15);" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='${getNicheFallbackImage(data.profile.title || data.profile.tagline || '', 0)}';" />
      <button onclick="navGalleryLightbox(1)" style="position:absolute; right:-20px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.65); color:#fff; border:1px solid rgba(255,255,255,0.2); width:40px; height:40px; border-radius:50%; font-size:22px; cursor:pointer; z-index:5;">›</button>
    </div>
    <div id="lb-caption" style="display:none; margin-top:12px; max-width:85vw; padding:8px 16px; border-radius:12px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); color:#fff; font-size:13px; font-weight:500; text-align:center;" onclick="event.stopPropagation()"></div>
  </div>

  <!-- Modal de Pré-Agendamento VIP -->
  <div id="booking-modal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); align-items:flex-end; justify-content:center; padding:16px;" onclick="closeBookingModal(event)">
    <div style="background:${theme.bg}; border:1px solid ${theme.cardBorder}; border-radius:24px; padding:22px; width:100%; max-width:420px; box-shadow:0 25px 60px rgba(0,0,0,0.8); animation:modalSlideUp 0.25s ease-out; margin-bottom:env(safe-area-inset-bottom, 12px);" onclick="event.stopPropagation()">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <div>
          <h4 style="font-size:13px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:${theme.accent}; margin:0;">Pré-Agendamento VIP</h4>
          <p style="font-size:11px; color:${theme.textMuted}; margin:3px 0 0 0;">Escolha seu procedimento e confirme pelo WhatsApp</p>
        </div>
        <button type="button" onclick="closeBookingModal(event)" style="background:none; border:none; color:${theme.textMuted}; font-size:22px; cursor:pointer; line-height:1; padding:4px;">✕</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:12px;">
        <div>
          <label style="font-size:10px; font-weight:700; text-transform:uppercase; color:${theme.textMuted}; display:block; margin-bottom:4px;">Seu Nome</label>
          <input type="text" id="bm-name" placeholder="Como podemos te chamar?" style="width:100%; padding:10px 14px; font-size:13px; border-radius:12px; background:rgba(0,0,0,0.4); border:1px solid ${theme.cardBorder}; color:${theme.textMain}; box-sizing:border-box; outline:none;" />
        </div>
        <div>
          <label style="font-size:10px; font-weight:700; text-transform:uppercase; color:${theme.textMuted}; display:block; margin-bottom:4px;">Procedimento / Serviço</label>
          <select id="bm-service" style="width:100%; padding:10px 14px; font-size:13px; border-radius:12px; background:rgba(0,0,0,0.4); border:1px solid ${theme.cardBorder}; color:${theme.textMain}; box-sizing:border-box; outline:none;">
            ${(data.services?.items || []).map((s: any) => `<option value="${escapeHtmlAttr(s.name)}" style="background:${theme.bg}; color:${theme.textMain};">${escapeHtmlAttr(s.name)}${s.price ? ` (${escapeHtmlAttr(s.price)})` : ''}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:10px; font-weight:700; text-transform:uppercase; color:${theme.textMuted}; display:block; margin-bottom:4px;">Melhor Período</label>
          <select id="bm-period" style="width:100%; padding:10px 14px; font-size:13px; border-radius:12px; background:rgba(0,0,0,0.4); border:1px solid ${theme.cardBorder}; color:${theme.textMain}; box-sizing:border-box; outline:none;">
            <option value="Qualquer horário disponível" style="background:${theme.bg}; color:${theme.textMain};">Qualquer horário disponível</option>
            <option value="Manhã (09h às 12h)" style="background:${theme.bg}; color:${theme.textMain};">Manhã (09h às 12h)</option>
            <option value="Tarde (13h às 17h)" style="background:${theme.bg}; color:${theme.textMain};">Tarde (13h às 17h)</option>
            <option value="Final do dia / Noite (após 17h)" style="background:${theme.bg}; color:${theme.textMain};">Final do dia / Noite (após 17h)</option>
          </select>
        </div>
        <button type="button" onclick="submitBookingToWhatsApp(event)" style="margin-top:6px; width:100%; padding:14px; border-radius:14px; font-weight:800; font-size:13px; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer; background:${theme.accent}; color:${getSafeContrastText(theme.accent, '#000000', '#ffffff')}; border:none; box-shadow:0 8px 24px rgba(0,0,0,0.3); transition:transform 0.2s;">
          ${WHATSAPP_SVG_STRING}
          <span>Confirmar via WhatsApp</span>
        </button>
      </div>
    </div>
  </div>
  <script>
    var galleryPhotos = ${JSON.stringify((data.studentGrid?.photos || []).map((p: string, idx: number) => optimizeImageUrl(p || getNicheFallbackImage(data.profile?.title || data.profile?.tagline || '', idx), 900)))};
    var galleryCaptions = ${JSON.stringify((data.studentGrid as any)?.captions || [])};
    var curLbIndex = 0;
    function syncLightboxCaption() {
      var capEl = document.getElementById('lb-caption');
      if (!capEl) return;
      var text = (galleryCaptions && galleryCaptions[curLbIndex] ? String(galleryCaptions[curLbIndex]).trim() : '');
      if (text) {
        capEl.innerText = text;
        capEl.style.display = 'block';
      } else {
        capEl.innerText = '';
        capEl.style.display = 'none';
      }
    }
    function openGalleryLightbox(idx) {
      curLbIndex = idx;
      var modal = document.getElementById('gallery-lightbox-modal');
      var img = document.getElementById('lb-img');
      var counter = document.getElementById('lb-counter');
      if (!modal || !img) return;
      img.src = galleryPhotos[curLbIndex];
      if (counter) counter.innerText = (curLbIndex + 1) + ' / ' + galleryPhotos.length;
      syncLightboxCaption();
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function closeGalleryLightbox() {
      var modal = document.getElementById('gallery-lightbox-modal');
      if (modal) modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    function navGalleryLightbox(delta) {
      if (!galleryPhotos || !galleryPhotos.length) return;
      curLbIndex = (curLbIndex + delta + galleryPhotos.length) % galleryPhotos.length;
      var img = document.getElementById('lb-img');
      var counter = document.getElementById('lb-counter');
      if (img) img.src = galleryPhotos[curLbIndex];
      if (counter) counter.innerText = (curLbIndex + 1) + ' / ' + galleryPhotos.length;
      syncLightboxCaption();
    }
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeGalleryLightbox();
        closeBookingModal();
      }
      if (e.key === 'ArrowLeft') navGalleryLightbox(-1);
      if (e.key === 'ArrowRight') navGalleryLightbox(1);
    });

    function openBookingModal(e, prefillService) {
      if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
      }
      var modal = document.getElementById('booking-modal');
      if (!modal) return false;
      if (prefillService) {
        var select = document.getElementById('bm-service');
        if (select) {
          for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value === prefillService) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      }
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      return false;
    }

    function closeBookingModal(e) {
      if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
      }
      var modal = document.getElementById('booking-modal');
      if (modal) modal.style.display = 'none';
      document.body.style.overflow = '';
      return false;
    }

    function submitBookingToWhatsApp(e) {
      if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
      }
      var nameEl = document.getElementById('bm-name');
      var srvEl = document.getElementById('bm-service');
      var perEl = document.getElementById('bm-period');
      var name = (nameEl && nameEl.value ? nameEl.value.trim() : '') || 'Cliente';
      var srv = (srvEl && srvEl.value ? srvEl.value.trim() : 'Atendimento VIP');
      var per = (perEl && perEl.value ? perEl.value.trim() : 'Qualquer horário');
      var phone = '${formatWhatsAppPhone(data.profile.whatsapp || '')}';
      if (!phone) {
        alert('Número de WhatsApp não configurado.');
        return false;
      }
      var msg = 'Olá! Meu nome é ' + name + ' e gostaria de agendar um horário para *' + srv + '* no período: ' + per + '.';
      var url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank');
      closeBookingModal();
      return false;
    }

    document.addEventListener('click', function(e) {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (a) {
        var href = a.getAttribute('href');
        if (href === '#booking' || href === '#agendar') {
          e.preventDefault();
          e.stopPropagation();
          openBookingModal(e);
          return false;
        }
      }
    });

    function copyAddress(btn, text) {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      }
      var orig = btn.innerText;
      btn.innerText = 'Copiado! ✓';
      btn.style.color = '#34d399';
      setTimeout(function() {
        btn.innerText = orig;
        btn.style.color = '';
      }, 2500);
    }
    function filterServices(btn, cat) {
      var allBtns = document.querySelectorAll('.srv-cat-btn');
      for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].style.background = 'rgba(255,255,255,0.06)';
        allBtns[i].style.color = '${theme.textMain}';
      }
      btn.style.background = '${mc.services?.headlineColor || theme.accent}';
      btn.style.color = '${getSafeContrastText(mc.services?.headlineColor || theme.accent, '#0a0a0c', '#ffffff')}';
      var cards = document.querySelectorAll('.service-card');
      for (var j = 0; j < cards.length; j++) {
        var cardCat = cards[j].getAttribute('data-category') || '';
        if (cat === 'all' || cardCat === cat) {
          cards[j].style.display = '';
        } else {
          cards[j].style.display = 'none';
        }
      }
    }

    // Detecção dinâmica de orientação (retrato vs paisagem) nas fotos da galeria
    (function detectGalleryOrientations() {
      var items = document.querySelectorAll('.gallery-item img');
      items.forEach(function(img) {
        function check() {
          var w = img.naturalWidth || img.width;
          var h = img.naturalHeight || img.height;
          if (!w || !h) return;
          var item = img.closest('.gallery-item');
          if (!item) return;
          var ratio = w / h;
          if (ratio > 1.15) {
            item.classList.add('is-landscape');
          } else if (ratio < 0.88) {
            item.classList.add('is-portrait');
          } else {
            item.classList.add('is-square');
          }
        }
        if (img.complete) {
          check();
        } else {
          img.addEventListener('load', check);
        }
      });
    })();
    ${options?.disableLinks ? `
    // Interceptar qualquer clique acidental em links dentro do carrossel demonstrativo
    document.addEventListener('click', function(e) {
      var el = e.target && e.target.closest ? e.target.closest('a, button, [role="link"], .cta-card, .social-btn, .whatsapp-float, .service-cta') : null;
      if (el) {
        var onclickAttr = el.getAttribute('onclick') || '';
        if (onclickAttr.indexOf('Lightbox') !== -1 || el.id === 'gallery-lightbox-modal') {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        var toast = document.getElementById('carousel-preview-link-toast');
        if (toast) {
          toast.style.opacity = '1';
          toast.style.transform = 'translateX(-50%) translateY(0)';
          clearTimeout(window.__previewToastTimer);
          window.__previewToastTimer = setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-15px)';
          }, 2000);
        }
        return false;
      }
    }, true);
    ` : ''}
    var deferredPwaPrompt = null;
    window.addEventListener('beforeinstallprompt', function(e) {
      e.preventDefault();
      deferredPwaPrompt = e;
    });

    function openSaveContactModal() {
      if (deferredPwaPrompt) {
        deferredPwaPrompt.prompt();
        deferredPwaPrompt.userChoice.then(function() {
          deferredPwaPrompt = null;
        });
        return;
      }
      var modal = document.getElementById('pwa-install-modal');
      if (modal) modal.style.display = 'flex';
    }

    function closeSaveContactModal() {
      var modal = document.getElementById('pwa-install-modal');
      if (modal) modal.style.display = 'none';
    }

    function downloadVCardContact() {
      var cleanPhone = '${(data.profile.whatsapp || '').replace(/\D/g, '')}';
      var cleanName = '${escapeHtmlAttr(data.profile.name)}';
      var cleanTitle = '${escapeHtmlAttr(data.profile.title)}';
      var cleanLoc = '${escapeHtmlAttr(data.profile.location || '')}';
      var vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:' + cleanName,
        'ORG:' + cleanName,
        'TITLE:' + cleanTitle,
        'TEL;TYPE=CELL,VOICE:+' + cleanPhone,
        'ADR;TYPE=WORK:;;' + cleanLoc,
        'NOTE:Agendamentos VIP',
        'END:VCARD'
      ].join('\\r\\n');

      var blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_contato.vcf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    // Live Client Sync Engine (Atualização Instantânea de Alterações Salvas no Criador)
    (function() {
      var currentSlug = '${escapeHtmlAttr(options?.customSlug || (targetData?.profile?.name || '').toLowerCase().replace(/[^a-z0-9]/g, ''))}';
      if (!currentSlug) return;
      var cleanSlug = currentSlug.replace(/[^a-z0-9]/g, '');

      function applyUpdates(freshData) {
        if (!freshData || typeof freshData !== 'object') return;
        var p = freshData.profile || {};
        
        // 1. Cabeçalho & Perfil
        if (p.avatarUrl) {
          var heroImg = document.querySelector('.hero-img, .avatar-img');
          if (heroImg && heroImg.getAttribute('src') !== p.avatarUrl) {
            heroImg.src = p.avatarUrl;
          }
        }
        if (p.name) {
          var nameEl = document.querySelector('.name, .hero-name') || document.querySelector('h1');
          if (nameEl) nameEl.textContent = p.name;
        }
        if (p.title) {
          var titleEl = document.querySelector('.badge-sub, .hero-title');
          if (titleEl) titleEl.textContent = p.title;
        }
        if (p.tagline) {
          var tagEl = document.querySelector('.tagline');
          if (tagEl) tagEl.textContent = p.tagline;
        }
        if (p.cursivePhrase) {
          var curEl = document.querySelector('.cursive-phrase, .cursive-banner');
          if (curEl) curEl.textContent = p.cursivePhrase;
        }
        if (p.whatsapp) {
          var cleanPhone = String(p.whatsapp).replace(/[^0-9]/g, '');
          var waLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]');
          waLinks.forEach(function(a) {
            var oldHref = a.getAttribute('href') || '';
            var qIdx = oldHref.indexOf('?');
            var query = qIdx !== -1 ? oldHref.substring(qIdx) : '';
            a.href = 'https://wa.me/' + cleanPhone + query;
          });
        }
        if (p.instagram) {
          var cleanInsta = String(p.instagram).replace(/[@\s]/g, '');
          var instaLinks = document.querySelectorAll('a[href*="instagram.com"]');
          instaLinks.forEach(function(a) {
            a.href = 'https://instagram.com/' + cleanInsta;
          });
        }

        // 2. Sobre Mim
        var ab = freshData.aboutMe || {};
        var aboutContainer = document.querySelector('.about-section');
        if (aboutContainer && ab.enabled === false) {
          aboutContainer.style.display = 'none';
        } else if (aboutContainer && ab.enabled !== false) {
          aboutContainer.style.display = '';
        }
        var aboutPhoto = p.aboutPhotoUrl || ab.photoUrl;
        if (aboutPhoto) {
          var aboutImg = document.querySelector('.about-photo-img') || document.querySelector('.about-section img') || document.querySelector('[alt="Sobre"]');
          if (aboutImg && aboutImg.getAttribute('src') !== aboutPhoto) {
            aboutImg.src = aboutPhoto;
          }
          if (aboutImg) {
            var posX = ab.photoPosX !== undefined ? ab.photoPosX : 50;
            var posY = ab.photoPosY !== undefined ? ab.photoPosY : 25;
            aboutImg.style.objectPosition = posX + '% ' + posY + '%';
            if (ab.photoHeight && aboutImg.parentElement) {
              aboutImg.parentElement.style.height = ab.photoHeight + 'px';
            }
          }
        }
        if (ab.headline) {
          var abHead = document.querySelector('.about-headline') || document.querySelector('.about-section h3');
          if (abHead) abHead.textContent = ab.headline;
        }
        if (ab.paragraph) {
          var bioEl = document.querySelector('.about-paragraph') || document.querySelector('.about-bio') || document.querySelector('.about-section p');
          if (bioEl) bioEl.textContent = ab.paragraph;
        }
        if (ab.closingPhrase) {
          var abClosing = document.querySelector('.about-closing');
          if (abClosing) abClosing.textContent = ab.closingPhrase;
        }

        // 3. Portfólio & Galeria (StudentGrid)
        if (freshData.studentGrid && Array.isArray(freshData.studentGrid.photos) && freshData.studentGrid.photos.length > 0) {
          var galleryImgs = document.querySelectorAll('#galeria img, .gallery-item img, [alt^="Foto "]');
          galleryImgs.forEach(function(gImg, idx) {
            if (freshData.studentGrid.photos[idx]) {
              gImg.src = freshData.studentGrid.photos[idx];
            }
          });
        }

        // 4. Triagem VIP / Funil de Qualificação
        var qfEl = document.querySelector('[data-module="qualifierFunnel"], .funnel-trigger-card, [href*="Triagem"], [href*="triagem"]');
        if (qfEl) {
          var isQfEnabled = freshData.qualifierFunnel ? freshData.qualifierFunnel.enabled !== false : false;
          qfEl.style.display = isQfEnabled ? '' : 'none';
          if (isQfEnabled && freshData.qualifierFunnel) {
            var qfTitle = qfEl.querySelector('.cta-title');
            if (qfTitle && freshData.qualifierFunnel.triggerButtonLabel) qfTitle.textContent = freshData.qualifierFunnel.triggerButtonLabel;
            var qfSub = qfEl.querySelector('.cta-sub');
            if (qfSub && freshData.qualifierFunnel.triggerButtonSubtitle) qfSub.textContent = freshData.qualifierFunnel.triggerButtonSubtitle;
          }
        }

        // 5. Botões de Ação (Action Cards / CTAs)
        if (Array.isArray(freshData.actionCards)) {
          var actionCardEls = document.querySelectorAll('.cta-card:not([data-module="qualifierFunnel"]):not(.funnel-trigger-card)');
          actionCardEls.forEach(function(cardEl, idx) {
            if (idx < freshData.actionCards.length) {
              cardEl.style.display = '';
              var ac = freshData.actionCards[idx];
              var acTitle = cardEl.querySelector('.cta-title');
              if (acTitle && ac.title) acTitle.textContent = ac.title;
              var acSub = cardEl.querySelector('.cta-sub');
              if (acSub && ac.subtitle) acSub.textContent = ac.subtitle;
              var acBadge = cardEl.querySelector('.cta-badge');
              if (acBadge) {
                if (ac.badgeText) {
                  acBadge.textContent = ac.badgeText;
                  acBadge.style.display = '';
                } else {
                  acBadge.style.display = 'none';
                }
              }
              var acBtn = cardEl.querySelector('.cta-btn-text');
              if (acBtn && ac.ctaActionText) acBtn.textContent = ac.ctaActionText;
              if (ac.whatsappMessage && p.whatsapp) {
                var cleanPhoneForAc = String(p.whatsapp).replace(/[^0-9]/g, '');
                cardEl.href = 'https://wa.me/' + cleanPhoneForAc + '?text=' + encodeURIComponent(ac.whatsappMessage);
              }
            } else {
              cardEl.style.display = 'none';
            }
          });
        }

        // 6. Catálogo de Serviços
        if (freshData.services) {
          var srvContainer = document.querySelector('.services-container');
          if (srvContainer && freshData.services.enabled === false) {
            srvContainer.style.display = 'none';
          } else if (srvContainer && freshData.services.enabled !== false) {
            srvContainer.style.display = '';
          }
        }
        if (freshData.services && Array.isArray(freshData.services.items)) {
          var serviceCards = document.querySelectorAll('.service-card');
          var newItems = freshData.services.items;
          serviceCards.forEach(function(card, idx) {
            if (idx < newItems.length) {
              card.style.display = '';
              var item = newItems[idx];
              var titleEl = card.querySelector('.service-title, h4');
              if (titleEl && item.name) titleEl.textContent = item.name;
              var priceEl = card.querySelector('.service-price');
              if (priceEl && item.price) priceEl.textContent = item.price;
              var oldPriceEl = card.querySelector('.service-old-price');
              if (oldPriceEl) {
                if (item.oldPrice) {
                  oldPriceEl.textContent = item.oldPrice;
                  oldPriceEl.style.display = '';
                } else {
                  oldPriceEl.style.display = 'none';
                }
              }
              var descEl = card.querySelector('.service-desc') || card.querySelector('p');
              if (descEl && item.description) descEl.textContent = item.description;
              var srvImg = card.querySelector('img');
              if (srvImg && item.imageUrl) srvImg.src = item.imageUrl;
            } else {
              // Se o serviço foi removido no criador, oculta o card imediatamente!
              card.style.display = 'none';
            }
          });
        }

        // 7. Dúvidas Frequentes (FAQ)
        var faqContainer = document.querySelector('.faq-section');
        if (faqContainer && freshData.faq && freshData.faq.enabled === false) {
          faqContainer.style.display = 'none';
        } else if (faqContainer && freshData.faq && freshData.faq.enabled !== false) {
          faqContainer.style.display = '';
        }
        if (freshData.faq && Array.isArray(freshData.faq.items) && freshData.faq.items.length > 0) {
          var faqDetails = document.querySelectorAll('.faq-item, details');
          faqDetails.forEach(function(dt, idx) {
            var item = freshData.faq.items[idx];
            if (!item) return;
            var sum = dt.querySelector('.faq-question, summary');
            if (sum && item.question) sum.textContent = item.question;
            var ans = dt.querySelector('.faq-answer, p');
            if (ans && item.answer) ans.textContent = item.answer;
          });
        }

        // 8. Barra de Aviso (Announcement) & Contador de Urgência
        if (freshData.announcement) {
          var annEl = document.querySelector('.announcement-bar, [href*="#booking"]');
          if (annEl) {
            annEl.style.display = freshData.announcement.enabled === false ? 'none' : '';
          }
        }
        if (freshData.highConversion && freshData.highConversion.urgencyTimer) {
          var utEl = document.querySelector('.urgency-timer, .countdown-box');
          if (utEl) {
            utEl.style.display = freshData.highConversion.urgencyTimer.enabled === false ? 'none' : '';
          }
        }

        // 9. Métricas, Depoimentos & Trust Badges
        if (freshData.metrics) {
          var metEl = document.querySelector('.metrics-container, .stats-row');
          if (metEl) metEl.style.display = freshData.metrics.enabled === false ? 'none' : '';
        }
        if (freshData.testimonials) {
          var testEl = document.querySelector('.testimonials-section');
          if (testEl) testEl.style.display = freshData.testimonials.enabled === false ? 'none' : '';
        }
        if (freshData.trustBadges) {
          var tbEl = document.querySelector('.trust-badges-container');
          if (tbEl) tbEl.style.display = freshData.trustBadges.enabled === false ? 'none' : '';
        }
      }

      window.__biovipApplyUpdates = applyUpdates;

      try {
        var rawLocal = localStorage.getItem('luxebio_live_preview_' + cleanSlug) ||
                       localStorage.getItem('luxebio_live_preview_' + currentSlug);
        if (rawLocal) {
          applyUpdates(JSON.parse(rawLocal));
        } else {
          var savedSitesRaw = localStorage.getItem('luxebio_saved_sites_v1');
          if (savedSitesRaw) {
            var all = JSON.parse(savedSitesRaw);
            var found = all.find(function(s) {
              return s.subdomain === currentSlug || (s.subdomain && s.subdomain.replace(/[^a-z0-9]/g, '') === cleanSlug);
            });
            if (found && found.data) applyUpdates(found.data);
          }
        }
      } catch(e) {}

      try {
        fetch('/api/saved-sites')
          .then(function(res) { return res.ok ? res.json() : null; })
          .then(function(json) {
            if (json && Array.isArray(json.sites)) {
              var found = json.sites.find(function(s) {
                return s.subdomain === currentSlug || (s.subdomain && s.subdomain.replace(/[^a-z0-9]/g, '') === cleanSlug);
              });
              if (found && found.data) {
                applyUpdates(found.data);
              }
            }
          })
          .catch(function() {});
      } catch(e) {}

      // Sincronização em tempo real via BroadcastChannel (multi-canal)
      try {
        if (window.BroadcastChannel) {
          ['biovip_preview_sync', 'luxebio_preview_sync'].forEach(function(chName) {
            try {
              var bc = new BroadcastChannel(chName);
              bc.onmessage = function(ev) {
                if (!ev || !ev.data) return;
                var payload = ev.data;
                var targetSlug = payload.slug ? String(payload.slug).toLowerCase().replace(/[^a-z0-9]/g, '') : '';
                if (targetSlug === cleanSlug || targetSlug === currentSlug.toLowerCase().replace(/[^a-z0-9]/g, '')) {
                  if (payload.data) applyUpdates(payload.data);
                }
              };
            } catch(chErr) {}
          });
        }
      } catch(e) {}

      // Sincronização via evento storage (detecta alterações salvas em outras abas do navegador)
      try {
        window.addEventListener('storage', function(e) {
          if (!e || !e.key) return;
          if (e.key === 'luxebio_live_preview_' + cleanSlug || e.key === 'luxebio_live_preview_' + currentSlug) {
            try { applyUpdates(JSON.parse(e.newValue)); } catch(err) {}
          } else if (e.key === 'luxebio_saved_sites_v1' && e.newValue) {
            try {
              var all = JSON.parse(e.newValue);
              var found = all.find(function(s) {
                return s.subdomain === currentSlug || (s.subdomain && s.subdomain.replace(/[^a-z0-9]/g, '') === cleanSlug);
              });
              if (found && found.data) applyUpdates(found.data);
            } catch(err) {}
          }
        });
      } catch(e) {}
    })();
  </script>

  <!-- Modal Instruções PWA / Adicionar à Tela Inicial -->
  <div id="pwa-install-modal" class="pwa-modal-overlay" onclick="closeSaveContactModal()">
    <div class="pwa-modal-box" onclick="event.stopPropagation()">
      <div style="font-size: 32px; margin-bottom: 8px;">📲</div>
      <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 6px; color: #fff;">Instalar Cartão na Tela Inicial</h3>
      <p style="font-size: 12px; color: #a1a1aa; line-height: 1.5; margin-bottom: 16px;">
        Acesse este microsite com 1 toque direto da tela inicial do seu celular, como um aplicativo VIP.
      </p>
      <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 12px; text-align: left; margin-bottom: 16px; font-size: 11.5px; line-height: 1.5; color: #e4e4e7;">
        <div style="margin-bottom: 8px;">
          <strong style="color: #fbbf24;">🍏 No iPhone (Safari):</strong><br/>
          Toque no botão Compartilhar (ícone <span style="font-size: 13px;">⬆️</span> na barra inferior) e selecione <strong>"Adicionar à Tela de Início"</strong>.
        </div>
        <div>
          <strong style="color: #60a5fa;">🤖 No Android (Chrome / Brave):</strong><br/>
          Toque nos três pontinhos (<span style="font-weight: 900;">⋮</span> no topo direito) e selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
        </div>
      </div>
      <button type="button" onclick="closeSaveContactModal()" style="width: 100%; padding: 10px; background: ${theme.accent}; color: #09090b; font-weight: 800; font-size: 12px; border: none; border-radius: 10px; cursor: pointer;">
        Entendido ✓
      </button>
    </div>
  </div>
</body>
</html>`;
    })(siteData, siteTheme);
  };

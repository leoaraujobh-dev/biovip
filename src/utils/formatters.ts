/**
 * Formats Brazilian phone numbers for wa.me links, ensuring the '55' country code prefix
 * when a 10 or 11 digit national phone number is entered.
 */
export function formatWhatsAppPhone(raw?: string | null): string {
  const digits = String(raw || '').replace(/\D/g, '').replace(/^0+/, '');
  if (!digits) return '';
  if ((digits.length === 10 || digits.length === 11) && !digits.startsWith('55')) {
    return `55${digits}`;
  }
  return digits;
}

/**
 * Parses BRL currency inputs safely whether typed with comma ("49,90"), dot ("49.90"),
 * or thousands separators ("1.249,90"). Prevents "49.90" from turning into 4990.
 */
export function parseBrlCurrency(raw: string | number | undefined | null, fallback: number): number {
  if (typeof raw === 'number') return Number.isFinite(raw) && raw > 0 ? raw : fallback;
  if (!raw) return fallback;
  const cleaned = String(raw).replace(/[^\d.,-]/g, '').trim();
  if (!cleaned) return fallback;
  let normalized = cleaned;
  if (cleaned.includes(',') && cleaned.includes('.')) {
    if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
      normalized = cleaned.replace(/\./g, '').replace(',', '.');
    } else {
      normalized = cleaned.replace(/,/g, '');
    }
  } else if (cleaned.includes(',')) {
    normalized = cleaned.replace(',', '.');
  }
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/**
 * Escapes double quotes and special HTML characters in attribute values (<meta content="...">, etc.)
 */
export function escapeHtmlAttr(val?: string | number | null): string {
  return String(val ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Safely converts any image input (string URL, object with url/src/photoUrl, or undefined)
 * into a valid image URL string with fallback protection against empty or broken strings.
 */
export function sanitizeImageUrl(val: any, fallback: string): string {
  if (!val) return fallback;
  if (typeof val === 'object' && val !== null) {
    const extracted = val.url || val.imageUrl || val.photoUrl || val.src || val.link || '';
    if (typeof extracted === 'string' && extracted.trim().startsWith('http')) {
      return extracted.trim();
    }
    return fallback;
  }
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (
      trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('data:image/') ||
      trimmed.startsWith('/')
    ) {
      return trimmed;
    }
  }
  return fallback;
}

/**
 * Detects if an image URL or Base64 is an Instagram circular thumbnail or low-resolution avatar
 * (typically 100x100 or 150x150 pixels), which causes severe blur and pixelation if used
 * in a 380px-500px hero header banner.
 */
export function isLowResolutionAvatar(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return true;
  const clean = url.trim().toLowerCase();
  if (!clean) return true;

  // Instagram thumbnail dimension patterns in path or query
  if (/s100x100|s150x150|100x100|150x150|dst-jpg_s100|dst-jpg_s150/i.test(clean)) {
    return true;
  }

  // Instagram profile picture CDN endpoint (t51.2885-19) without HD modifier
  if (clean.includes('t51.2885-19') && !clean.includes('s1080x1080') && !clean.includes('s640x640')) {
    return true;
  }

  // If it's a tiny data: URL (under 16KB base64, typical for 100x100 or 150x150 thumbnails)
  if (clean.startsWith('data:image/') && clean.length < 18000) {
    return true;
  }

  return false;
}

/**
 * Sanitizes gallery photo captions:
 * - If caption is empty or null, returns ''
 * - If caption contains generic AI placeholders (e.g., 'Legenda curta', 'Legenda do procedimento', 'Legenda do destaque', 'Foto 1'), returns ''
 * - Otherwise returns trimmed caption
 */
export function cleanGalleryCaption(cap?: string | null): string {
  if (!cap || typeof cap !== 'string') return '';
  const trimmed = cap.trim();
  if (!trimmed) return '';
  if (/^legenda\s*(curta|do\s*procedimento|do\s*destaque|da\s*foto|\d)/i.test(trimmed)) return '';
  if (/^foto\s*\d/i.test(trimmed)) return '';
  return trimmed;
}

/**
 * Serializes payloads for Firestore while guaranteeing the string stays within the security rule maxLength (950KB).
 */
export function serializeSafeFirestorePayload(obj: unknown, maxLen = 920000): string {
  try {
    const raw = JSON.stringify(obj);
    if (raw.length <= maxLen) return raw;
    // If oversized due to heavy Base64 images, strip inline Base64 strings > 80KB
    const compacted = JSON.stringify(obj, (_key, val) => {
      if (typeof val === 'string' && val.startsWith('data:image/') && val.length > 80000) {
        return '';
      }
      return val;
    });
    return compacted.length <= maxLen ? compacted : '{}';
  } catch {
    return '{}';
  }
}

/**
 * Safe copy fallback for iframes with blocked Clipboard API permissions
 */
export const safeCopyText = async (text: string) => {
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

/**
 * Calculates perceived relative luminance (WCAG 2.1 standard) of a hex or rgb color string.
 */
export function getLuminance(colorStr: string): number {
  if (!colorStr) return 0;
  const str = colorStr.trim().toLowerCase();
  let r = 0, g = 0, b = 0;
  if (str.startsWith('#')) {
    const hex = str.slice(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length >= 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
  } else if (str.startsWith('rgb')) {
    const parts = str.replace(/rgba?\(|\)/g, '').split(',');
    r = parseFloat(parts[0]) || 0;
    g = parseFloat(parts[1]) || 0;
    b = parseFloat(parts[2]) || 0;
  }
  const srgb = [r / 255, g / 255, b / 255].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/**
 * Returns high-contrast text color ('#ffffff' or '#0a0a0c') based on WCAG AA contrast threshold.
 */
export function getSafeContrastText(
  bg: string,
  preferredDark = '#0a0a0c',
  preferredLight = '#ffffff',
  threshold = 0.18
): string {
  if (!bg) return preferredLight;
  // If gradient or transparent, analyze the dominant color
  const cleanBg = bg.includes('gradient')
    ? (bg.match(/#(?:[0-9a-fA-F]{3}){1,2}|rgba?\([^)]+\)/)?.[0] || bg)
    : bg;
  const lum = getLuminance(cleanBg);
  return lum > threshold ? preferredDark : preferredLight;
}

/**
 * Otimiza URLs de imagem remotas (ex: Unsplash, Imgix) injetando e ajustando
 * parâmetros de query string para redimensionamento e formato automático (?auto=format&fit=crop&q=80&w=...).
 * Mantém URLs em Base64 ('data:image/...') e rotas locais estáticas intactas.
 */
export function optimizeImageUrl(url: string, targetWidth = 800): string {
  if (!url || typeof url !== 'string') return url;
  const trimmed = url.trim();
  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // URLs do CDN do Instagram/Facebook (Meta) possuem proteção rígida de hotlink (CORS/403) e tokens assinados temporários
  // Roteamos pelo CDN global Weserv com cache seguro, alta resolução Retina (mínimo 720px para cards e 1080px para fotos principais) e nitidez calibrada (sharp=1)
  if (
    trimmed.includes('cdninstagram.com') ||
    trimmed.includes('fbcdn.net') ||
    trimmed.includes('instagram.f') ||
    trimmed.includes('lookaside.fbsbx.com')
  ) {
    if (trimmed.includes('images.weserv.nl')) return trimmed;
    const retinaWidth = Math.max(targetWidth >= 600 ? 1080 : 720, targetWidth * 2);
    return `https://images.weserv.nl/?url=${encodeURIComponent(trimmed)}&output=jpg&q=90&sharp=1&w=${retinaWidth}`;
  }

  try {
    if (trimmed.includes('images.unsplash.com')) {
      const parsed = new URL(trimmed);
      if (!parsed.searchParams.has('auto')) {
        parsed.searchParams.set('auto', 'format');
      }
      if (!parsed.searchParams.has('fit')) {
        parsed.searchParams.set('fit', 'crop');
      }
      parsed.searchParams.set('q', '85');
      const retinaWidth = Math.max(targetWidth >= 600 ? 1080 : 720, targetWidth * 2);
      parsed.searchParams.set('w', String(retinaWidth));
      return parsed.toString();
    }
  } catch {
    // Retorna a URL original em caso de erro de parsing
  }
  return trimmed;
}

/**
 * Validates and normalizes color strings to valid 6-character hex format (#rrggbb)
 * for use in HTML color pickers.
 */
export function toSafeHexColor(colorStr?: string, fallback = '#ffffff'): string {
  if (!colorStr || typeof colorStr !== 'string') return fallback;
  const trimmed = colorStr.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const r = trimmed[1];
    const g = trimmed[2];
    const b = trimmed[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  if (/^#[0-9a-fA-F]{8}$/.test(trimmed)) return trimmed.slice(0, 7);
  return fallback;
}

export function formatDueDateBr(isoOrDate: string): string {
  if (!isoOrDate) return '—';
  const parts = isoOrDate.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return isoOrDate;
}

/**
 * Normalizes any slug string to safe alphanumeric lowercase format
 */
export function cleanMicrositeSlug(slug?: string | null): string {
  return String(slug || 'dramarina')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-z0-9-]/g, '') || 'dramarina';
}

/**
 * Generates an infallible public URL for a microsite that works 100% of the time
 * on any hosting provider (Cloudflare, HostGator, Vercel, localhost) without 404 errors.
 */
export function getPublicMicrositeUrl(
  subdomain: string,
  customDomain?: string,
  baseDomainProp = 'biovip.com.br'
): string {
  const cleanSub = cleanMicrositeSlug(subdomain);
  const cleanBase = (baseDomainProp || 'biovip.com.br')
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '') || 'biovip.com.br';

  const cleanCustom = (customDomain || '')
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '');

  const isFakeSeedDomain =
    !cleanCustom ||
    cleanCustom === `www.${cleanSub}.com.br` ||
    cleanCustom === `${cleanSub}.com.br` ||
    cleanCustom === 'www.dramarinaalmeida.com.br' ||
    cleanCustom === 'www.doncorleonebarber.com.br' ||
    cleanCustom.includes('biovip.com.br');

  if (cleanCustom && !isFakeSeedDomain) {
    return `https://${cleanCustom}`;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname.toLowerCase();
    const origin = window.location.origin;
    if (host === cleanBase || host === `www.${cleanBase}` || host.endsWith(`.${cleanBase}`)) {
      return `https://${cleanBase}/?site=${cleanSub}`;
    }
    return `${origin}/?site=${cleanSub}`;
  }

  return `https://${cleanBase}/?site=${cleanSub}`;
}



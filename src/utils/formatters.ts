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
  try {
    if (trimmed.includes('images.unsplash.com')) {
      const parsed = new URL(trimmed);
      if (!parsed.searchParams.has('auto')) {
        parsed.searchParams.set('auto', 'format');
      }
      if (!parsed.searchParams.has('fit')) {
        parsed.searchParams.set('fit', 'crop');
      }
      if (!parsed.searchParams.has('q')) {
        parsed.searchParams.set('q', '80');
      }
      if (!parsed.searchParams.has('w')) {
        parsed.searchParams.set('w', String(targetWidth));
      } else {
        const currentW = parseInt(parsed.searchParams.get('w') || '0', 10);
        if (currentW > 1200) {
          parsed.searchParams.set('w', String(targetWidth));
        }
      }
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


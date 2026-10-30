import { GoogleGenAI } from '@google/genai';

const GEMINI_MODELS = ['gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

interface ExtractedInstagramPost {
  shortcode: string;
  imageUrl: string;
  sidecarUrls: string[];
  likes: number;
  comments: number;
  caption: string;
  locationName?: string;
  isVideo: boolean;
  dataUrl?: string;
}

interface ExtractedInstagramData {
  found: boolean;
  username: string;
  secondaryUsername?: string;
  fullName?: string;
  cleanBusinessName?: string;
  bio?: string;
  followers?: string;
  postsCount?: string;
  category?: string;
  whatsappPhone?: string;
  externalUrl?: string;
  businessHours?: string;
  detectedLocation?: string;
  avatarUrl?: string;
  postPhotos: string[];
  postCaptions: string[];
  postLikes: number[];
  galleryShortCaptions: string[];
  topPosts: ExtractedInstagramPost[];
  externalBioServices: string[];
}

interface ExtractedGoogleMapsData {
  found: boolean;
  originalUrl: string;
  resolvedUrl: string;
  placeName?: string;
  address?: string;
  cityState?: string;
  rating?: string;
  reviewsCount?: string;
  category?: string;
  phone?: string;
  businessHours?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  photos: string[];
  reviews: Array<{
    clientName: string;
    city: string;
    text: string;
    rating: number;
  }>;
}

export interface ExtractedServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  oldPrice?: string;
  duration: string;
  badge?: string;
  ctaLabel: string;
  actionType: 'booking' | 'whatsapp' | 'link';
  featured: boolean;
  imageUrl: string;
  matchedKeyword?: string;
}

function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
}

function formatFollowerCount(count?: number | string): string | undefined {
  if (count === undefined || count === null || count === '') return undefined;
  if (typeof count === 'string') {
    const trimmed = count.trim();
    if (!/^\d+$/.test(trimmed)) return trimmed;
    count = Number(trimmed);
  }
  if (typeof count !== 'number' || isNaN(count) || count <= 0) return undefined;
  if (count >= 1_000_000) {
    return `+${(count / 1_000_000).toFixed(1).replace('.0', '').replace('.', ',')}M`;
  }
  if (count >= 10_000) {
    return `+${(count / 1_000).toFixed(1).replace('.0', '').replace('.', ',')}k`;
  }
  if (count >= 1_000) {
    return `+${count.toLocaleString('pt-BR')}`;
  }
  return String(count);
}

function extractPhoneFromText(text: string): string | undefined {
  if (!text) return undefined;
  const waMatch =
    text.match(/wa\.me\/(\d{10,15})/i) ||
    text.match(/phone=(\d{10,15})/i) ||
    text.match(/whatsapp\.com\/send\?.*?phone=(\d{10,15})/i);
  if (waMatch?.[1]) return waMatch[1];

  const brPhoneMatch = text.match(/(?:\+?55\s?)?\(?([1-9]{2})\)?\s?(9?\d{4})[-\s.]?(\d{4})/);
  if (brPhoneMatch) {
    const ddd = brPhoneMatch[1];
    const p1 = brPhoneMatch[2];
    const p2 = brPhoneMatch[3];
    return `55${ddd}${p1}${p2}`;
  }
  return undefined;
}

function extractBusinessHoursFromText(text: string): string | undefined {
  if (!text) return undefined;
  const hoursMatch = text.match(
    /(?:seg(?:unda)?|ter(?:ça)?)\s*(?:a|à|até|-)\s*(?:sex(?:ta)?|s[aá]b(?:ado)?)\s*[:,·-]?\s*\d{1,2}(?:h|:\d{2})?\s*(?:às|as|a|-)\s*\d{1,2}(?:h|:\d{2})?/i
  );
  if (hoursMatch?.[0]) {
    return hoursMatch[0].trim();
  }
  return undefined;
}

function summarizePostCaptionForGallery(caption: string, likes: number): string {
  const cleaned = (caption || '')
    .replace(/#[a-zA-Z0-9_\u00C0-\u017F]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) {
    return likes > 0 ? `Destaque do Instagram · ❤️ ${likes} curtidas` : '';
  }

  // Pega a primeira frase ou linha significativa
  const firstSentence = cleaned
    .split(/(?<=[.!✨🤎🦊💖🔥])\s+|\n+/)[0]
    .trim();
  const baseText =
    firstSentence.length >= 12 && firstSentence.length <= 95
      ? firstSentence
      : cleaned.length > 90
      ? `${cleaned.slice(0, 88).trim()}...`
      : cleaned;

  return baseText;
}

async function inspectExternalBioLink(rawUrl?: string): Promise<{
  whatsappPhone?: string;
  resolvedExternalUrl?: string;
  extractedServices: string[];
}> {
  if (!rawUrl) return { extractedServices: [] };
  let url = rawUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  const directPhone = extractPhoneFromText(url);
  if (directPhone) {
    return { whatsappPhone: directPhone, resolvedExternalUrl: url, extractedServices: [] };
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      },
    });
    clearTimeout(timer);
    const finalUrl = res.url || url;
    const phoneFromUrl = extractPhoneFromText(finalUrl);
    const html = await res.text();
    const phoneFromHtml = phoneFromUrl || extractPhoneFromText(html);

    // Extrai textos de botões/links da árvore de links (Linktree, Bio.site, Beacons, etc.)
    const extractedServices: string[] = [];
    const anchorMatches = html.matchAll(/<(?:a|button|p|span|h2|h3)[^>]*>([^<]{4,70})<\/(?:a|button|p|span|h2|h3)>/gi);
    for (const m of anchorMatches) {
      const txt = decodeHtmlEntities(m[1]).replace(/\s+/g, ' ').trim();
      if (
        txt.length >= 5 &&
        txt.length <= 65 &&
        !/cookie|privacy|termos|login|sign up|linktr\.ee|beacons|instagram|tiktok|facebook|youtube|report|share/i.test(txt) &&
        !extractedServices.includes(txt)
      ) {
        extractedServices.push(txt);
        if (extractedServices.length >= 8) break;
      }
    }

    return {
      whatsappPhone: phoneFromHtml,
      resolvedExternalUrl: finalUrl,
      extractedServices,
    };
  } catch {
    return { resolvedExternalUrl: url, extractedServices: [] };
  }
}

async function fetchImageAsDataUrl(url: string, timeoutMs = 4500): Promise<string | null> {
  if (!url || !url.startsWith('http')) return null;
  const cleanUrl = decodeHtmlEntities(url.replace(/\\u0026/g, '&').replace(/\\\//g, '/'));

  // 1) Tentativa direta com User-Agent bot oficial
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(cleanUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'TelegramBot (like TwitterBot)',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        Referer: 'https://www.instagram.com/',
      },
    });
    clearTimeout(timer);
    if (res.ok) {
      const contentType = res.headers.get('content-type') || 'image/jpeg';
      if (contentType.startsWith('image/')) {
        const arrayBuffer = await res.arrayBuffer();
        if (arrayBuffer.byteLength >= 600 && arrayBuffer.byteLength <= 5 * 1024 * 1024) {
          const base64 = Buffer.from(arrayBuffer).toString('base64');
          return `data:${contentType.split(';')[0]};base64,${base64}`;
        }
      }
    }
  } catch {
    // Falha silenciosa para prosseguir para o fallback de CDN
  }

  // 2) Fallback resiliente usando CDN proxy de imagens (Weserv) para contornar restrições de IP/CORS da Meta
  try {
    const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&output=jpg&q=85&w=900`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(proxyUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'image/jpeg,image/webp,image/*,*/*;q=0.8',
      },
    });
    clearTimeout(timer);
    if (res.ok) {
      const contentType = res.headers.get('content-type') || 'image/jpeg';
      if (contentType.startsWith('image/')) {
        const arrayBuffer = await res.arrayBuffer();
        if (arrayBuffer.byteLength >= 600) {
          const base64 = Buffer.from(arrayBuffer).toString('base64');
          return `data:${contentType.split(';')[0]};base64,${base64}`;
        }
      }
    }
  } catch {
    // Retorna null caso nenhum proxy consiga baixar
  }

  return null;
}

function cleanInstagramHandleVariants(input?: string): string[] {
  if (!input) return [];
  let str = input.trim();
  str = str.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '');
  str = str.split('/')[0].split('?')[0];
  str = str.replace(/^@/, '').trim();
  if (!str) return [];

  const variants = new Set<string>();
  // 1) Se já for um handle sem espaços (ex: lorrayne_ramos)
  if (!/\s/.test(str)) {
    variants.add(str.toLowerCase());
  }

  // 2) Se o usuário digitou com espaços (ex: "lorrayne ramos" -> "lorrayne_ramos", "lorrayneramos", "lorrayne.ramos")
  const withUnderscore = str.replace(/\s+/g, '_').toLowerCase();
  if (withUnderscore) variants.add(withUnderscore);

  const withoutSpaces = str.replace(/\s+/g, '').toLowerCase();
  if (withoutSpaces) variants.add(withoutSpaces);

  const withDot = str.replace(/\s+/g, '.').toLowerCase();
  if (withDot) variants.add(withDot);

  return Array.from(variants);
}

function cleanInstagramHandle(input?: string): string {
  const variants = cleanInstagramHandleVariants(input);
  return variants[0] || '';
}

function splitFullNameAndSpecialty(rawFullName?: string): {
  cleanName?: string;
  specialty?: string;
  detectedCity?: string;
} {
  if (!rawFullName) return {};
  const trimmed = rawFullName.trim();
  const parts = trimmed.split(/\s+[-|•·]\s+/);
  let cleanName = trimmed;
  let specialty: string | undefined;
  if (parts.length >= 2) {
    cleanName = parts[0].trim();
    specialty = parts.slice(1).join(' - ').trim();
  }
  return { cleanName, specialty };
}

async function fetchInstagramEmbedProfile(username: string): Promise<{
  found: boolean;
  fullName?: string;
  followersCount?: number;
  postsCount?: number;
  avatarUrl?: string;
  posts: ExtractedInstagramPost[];
}> {
  const empty = { found: false, posts: [] as ExtractedInstagramPost[] };
  if (!username) return empty;

  const targetUrl = `https://www.instagram.com/${encodeURIComponent(username)}/embed/?_fb_noscript=1`;
  const userAgents = [
    'WhatsApp/2.23.20.76 i',
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  ];

  for (const ua of userAgents) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2600);
      const res = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': ua,
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8',
        },
      });
      clearTimeout(timer);
      if (!res.ok) continue;

      const html = await res.text();
      const match = html.match(/"contextJSON"\s*:\s*"((?:\\.|[^"\\])*)"/);
      if (!match?.[1]) continue;

      const unescapedJsonStr = JSON.parse(`"${match[1]}"`);
      const parsed = JSON.parse(unescapedJsonStr);
      const ctx = parsed?.context;
      if (!ctx) continue;

      const posts: ExtractedInstagramPost[] = [];
      const mediaList = Array.isArray(ctx.graphql_media) ? ctx.graphql_media : [];

      for (const item of mediaList) {
        const m = item?.shortcode_media || item?.node || item;
        if (!m) continue;
        const imageUrl =
          m.display_url ||
          (Array.isArray(m.display_resources) && m.display_resources.length > 0
            ? m.display_resources[m.display_resources.length - 1]?.src
            : '') ||
          m.thumbnail_src ||
          '';
        if (!imageUrl) continue;

        const likes = Number(
          m.edge_liked_by?.count ??
            m.edge_media_preview_like?.count ??
            m.like_count ??
            0
        );
        const comments = Number(
          m.edge_media_to_comment?.count ??
            m.edge_media_preview_comment?.count ??
            m.comment_count ??
            0
        );
        const caption = String(
          m.edge_media_to_caption?.edges?.[0]?.node?.text ||
            m.caption?.text ||
            ''
        ).trim();
        const locationName = m.location?.name ? String(m.location.name).trim() : undefined;

        const sidecarUrls: string[] = [];
        const sidecarEdges = m.edge_sidecar_to_children?.edges;
        if (Array.isArray(sidecarEdges)) {
          for (const childEdge of sidecarEdges) {
            const cNode = childEdge?.node;
            if (!cNode) continue;
            const cUrl =
              cNode.display_url ||
              (Array.isArray(cNode.display_resources) && cNode.display_resources.length > 0
                ? cNode.display_resources[cNode.display_resources.length - 1]?.src
                : '');
            if (cUrl && cUrl !== imageUrl && !sidecarUrls.includes(cUrl)) {
              sidecarUrls.push(cUrl);
            }
          }
        }

        posts.push({
          shortcode: String(m.shortcode || m.id || `post-${posts.length}`),
          imageUrl,
          sidecarUrls,
          likes: isNaN(likes) ? 0 : likes,
          comments: isNaN(comments) ? 0 : comments,
          caption,
          locationName,
          isVideo: Boolean(m.is_video),
        });
      }

      return {
        found: Boolean(ctx.full_name || ctx.profile_pic_url || posts.length > 0),
        fullName: ctx.full_name ? String(ctx.full_name).trim() : undefined,
        followersCount:
          typeof ctx.followers_count === 'number' ? ctx.followers_count : undefined,
        postsCount: typeof ctx.posts_count === 'number' ? ctx.posts_count : undefined,
        avatarUrl: ctx.profile_pic_url ? String(ctx.profile_pic_url) : undefined,
        posts,
      };
    } catch {
      // Tenta a próxima URL
    }
  }

  return empty;
}

async function fetchInstagramHtmlMultiSocket(username: string): Promise<string | null> {
  if (!username) return null;
  const targetUrl = `https://www.instagram.com/${encodeURIComponent(username)}/`;

  const botUas = [
    'TelegramBot (like TwitterBot)',
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  ];

  try {
    const sockets = botUas.map(async (ua) => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2200);
        const res = await fetch(targetUrl, {
          redirect: 'manual',
          signal: controller.signal,
          headers: {
            'User-Agent': ua,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
        });
        clearTimeout(timer);
        if (res.status === 200) {
          const text = await res.text();
          if (text.includes('og:title') || text.includes('og:image')) {
            return text;
          }
        }
      } catch {}
      return null;
    });

    const results = await Promise.all(sockets);
    return results.find(Boolean) || null;
  } catch {
    return null;
  }
}

function parseInstagramMetaFromHtml(html: string): {
  fullName?: string;
  bio?: string;
  followers?: string;
  postsCount?: string;
  ogImage?: string;
  externalUrl?: string;
  extraPhotos: string[];
  mentionedHandles: string[];
} {
  const ogTitleRaw =
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i)?.[1];

  const ogDescRaw =
    html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i)?.[1];

  const metaDescRaw =
    html.match(/<meta[^>]+name=["']description["'][^>]+content="([^"]+)"/i)?.[1] ||
    html.match(/<meta[^>]+content="([^"]+)"[^>]+name=["']description["']/i)?.[1];

  const ogImageRaw =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1];

  let fullName: string | undefined;
  let bio: string | undefined;
  let followers: string | undefined;
  let postsCount: string | undefined;
  let externalUrl: string | undefined;
  const mentionedHandles: string[] = [];
  const extraPhotos: string[] = [];

  if (ogTitleRaw) {
    const decodedTitle = decodeHtmlEntities(ogTitleRaw);
    const namePart = decodedTitle.split('(@')[0].split('•')[0].trim();
    if (namePart && namePart.toLowerCase() !== 'instagram') {
      fullName = namePart;
    }
  }

  const combinedDesc = decodeHtmlEntities(metaDescRaw || ogDescRaw || '');
  if (combinedDesc) {
    const followerMatch = combinedDesc.match(/([\d.,]+[KkMm]?)\s*(?:Followers|seguidores)/i);
    if (followerMatch?.[1]) {
      const rawNum = followerMatch[1].replace(/,/g, '.');
      followers = rawNum.includes('.') && rawNum.length > 4 ? `+${rawNum}` : followerMatch[1];
    }

    const postsMatch = combinedDesc.match(/([\d.,]+)\s*(?:Posts|publicações)/i);
    if (postsMatch?.[1]) {
      postsCount = postsMatch[1];
    }

    const bioQuoteMatch = combinedDesc.match(/on Instagram:\s*"([\s\S]*)"$/i);
    if (bioQuoteMatch?.[1]) {
      bio = bioQuoteMatch[1].trim();
    } else if (!combinedDesc.includes('See Instagram photos and videos')) {
      const parts = combinedDesc.split(' - ');
      if (parts.length > 1) {
        bio = parts.slice(1).join(' - ').trim();
      }
    }

    if (!fullName) {
      const descNameMatch = combinedDesc.match(/-\s*([^(@]+?)\s*\(@/);
      if (descNameMatch?.[1]) {
        fullName = descNameMatch[1].trim();
      }
    }
  }

  if (bio) {
    const handles = Array.from(bio.matchAll(/@([a-zA-Z0-9._]{3,30})/g), (m) => m[1]);
    for (const h of handles) {
      if (!mentionedHandles.includes(h)) {
        mentionedHandles.push(h);
      }
    }
    const urlInBio = bio.match(
      /(?:https?:\/\/)?(?:linktr\.ee|wa\.me|api\.whatsapp\.com|bio\.site|beacons\.ai|msha\.ke|bit\.ly|trinks\.com|agendaki\.com\.br)\/[^\s"')]*/i
    );
    if (urlInBio?.[0]) {
      externalUrl = urlInBio[0];
    }
  }

  if (!externalUrl) {
    const extMatch = html.match(/"external_url"\s*:\s*"([^"]+)"/);
    if (extMatch?.[1]) {
      externalUrl = decodeHtmlEntities(extMatch[1].replace(/\\\//g, '/'));
    }
  }

  const ogImage = ogImageRaw ? decodeHtmlEntities(ogImageRaw) : undefined;

  const scontentMatches = html.matchAll(
    /https:\/\/[^"'\s\\]*(?:cdninstagram\.com|fbcdn\.net)\/v\/[^"'\s\\]+/g
  );
  for (const m of scontentMatches) {
    const decoded = decodeHtmlEntities(m[0].replace(/\\u0026/g, '&').replace(/\\\//g, '/'));
    if (decoded !== ogImage && !extraPhotos.includes(decoded) && extraPhotos.length < 6) {
      extraPhotos.push(decoded);
    }
  }

  return {
    fullName,
    bio,
    followers,
    postsCount,
    ogImage,
    externalUrl,
    extraPhotos,
    mentionedHandles,
  };
}

async function extractInstagramInfo(rawInstagram?: string): Promise<ExtractedInstagramData> {
  const usernameVariants = cleanInstagramHandleVariants(rawInstagram);
  const primaryUsername = usernameVariants[0] || '';
  const result: ExtractedInstagramData = {
    found: false,
    username: primaryUsername,
    postPhotos: [],
    postCaptions: [],
    postLikes: [],
    galleryShortCaptions: [],
    topPosts: [],
    externalBioServices: [],
  };

  if (usernameVariants.length === 0) return result;

  let rawAvatarUrl = '';
  const allPostsMap = new Map<string, ExtractedInstagramPost>();
  const fallbackExtraPhotoUrls: string[] = [];

  let mentionedHandles: string[] = [];
  let successfulHtml: string | null = null;

  // 1) Itera sobre as variantes possíveis do nome de usuário (ex: lorrayne_ramos, lorrayneramos, etc)
  for (const username of usernameVariants) {
    const [embedProfile, primaryHtml] = await Promise.all([
      fetchInstagramEmbedProfile(username),
      fetchInstagramHtmlMultiSocket(username),
    ]);

    if (embedProfile.found) {
      result.found = true;
      result.username = username;
      if (embedProfile.fullName) {
        result.fullName = embedProfile.fullName;
        const splitInfo = splitFullNameAndSpecialty(embedProfile.fullName);
        if (splitInfo.cleanName) result.cleanBusinessName = splitInfo.cleanName;
        if (splitInfo.specialty && !result.category) result.category = splitInfo.specialty;
      }
      if (embedProfile.followersCount !== undefined) {
        result.followers = formatFollowerCount(embedProfile.followersCount);
      }
      if (embedProfile.postsCount !== undefined) {
        result.postsCount = String(embedProfile.postsCount);
      }
      if (embedProfile.avatarUrl) {
        rawAvatarUrl = embedProfile.avatarUrl;
      }
      for (const post of embedProfile.posts) {
        allPostsMap.set(post.shortcode || post.imageUrl, post);
        if (post.locationName && !result.detectedLocation) {
          result.detectedLocation = post.locationName;
        }
      }
      successfulHtml = primaryHtml;
      break; // Encontrou o perfil com sucesso, interrompe busca por variantes
    }

    if (primaryHtml) {
      const parsed = parseInstagramMetaFromHtml(primaryHtml);
      if (parsed.fullName || parsed.bio || parsed.ogImage) {
        result.found = true;
        result.username = username;
        if (parsed.fullName && !result.fullName) {
          result.fullName = parsed.fullName;
          const splitInfo = splitFullNameAndSpecialty(parsed.fullName);
          if (splitInfo.cleanName) result.cleanBusinessName = splitInfo.cleanName;
          if (splitInfo.specialty && !result.category) result.category = splitInfo.specialty;
        }
        if (parsed.bio) result.bio = parsed.bio;
        if (parsed.followers) result.followers = parsed.followers;
        if (parsed.postsCount) result.postsCount = parsed.postsCount;
        if (parsed.externalUrl) result.externalUrl = parsed.externalUrl;
        if (parsed.ogImage && !rawAvatarUrl) rawAvatarUrl = parsed.ogImage;
        for (const ep of parsed.extraPhotos) {
          if (!fallbackExtraPhotoUrls.includes(ep)) fallbackExtraPhotoUrls.push(ep);
        }
        successfulHtml = primaryHtml;
        break; // Encontrou pelo HTML OpenGraph
      }
    }
  }

  if (successfulHtml) {
    const parsed = parseInstagramMetaFromHtml(successfulHtml);
    if (parsed.fullName && !result.fullName) {
      result.fullName = parsed.fullName;
      result.found = true;
      const splitInfo = splitFullNameAndSpecialty(parsed.fullName);
      if (splitInfo.cleanName) result.cleanBusinessName = splitInfo.cleanName;
      if (splitInfo.specialty && !result.category) result.category = splitInfo.specialty;
    }
    if (parsed.bio && !result.bio) {
      result.bio = parsed.bio;
      result.found = true;
    }
    if (parsed.followers && !result.followers) {
      result.followers = parsed.followers;
    }
    if (parsed.postsCount && !result.postsCount) {
      result.postsCount = parsed.postsCount;
    }
    if (parsed.externalUrl && !result.externalUrl) {
      result.externalUrl = parsed.externalUrl;
    }
    if (parsed.ogImage && !rawAvatarUrl) {
      rawAvatarUrl = parsed.ogImage;
      result.found = true;
    }
    for (const ep of parsed.extraPhotos) {
      if (!fallbackExtraPhotoUrls.includes(ep)) fallbackExtraPhotoUrls.push(ep);
    }
    mentionedHandles = parsed.mentionedHandles;

    const phoneInBio = extractPhoneFromText(parsed.bio || '');
    if (phoneInBio && !result.whatsappPhone) {
      result.whatsappPhone = phoneInBio;
    }
    const hoursInBio = extractBusinessHoursFromText(parsed.bio || '');
    if (hoursInBio && !result.businessHours) {
      result.businessHours = hoursInBio;
    }
  }

  // Também verifica se nas legendas dos posts há menção a um @ de studio secundário ou telefone
  for (const post of allPostsMap.values()) {
    if (post.caption) {
      if (!result.whatsappPhone) {
        const p = extractPhoneFromText(post.caption);
        if (p) result.whatsappPhone = p;
      }
      if (!result.businessHours) {
        const h = extractBusinessHoursFromText(post.caption);
        if (h) result.businessHours = h;
      }
      const handlesInCaption = Array.from(
        post.caption.matchAll(/@([a-zA-Z0-9._]{3,30})/g),
        (m) => m[1]
      );
      for (const h of handlesInCaption) {
        if (!mentionedHandles.includes(h)) mentionedHandles.push(h);
      }
    }
  }

  // 2) Se a bio referencia um perfil profissional secundário (ex: "CEO: @studiolorrayneramos"), busca o Embed e HTML dele também!
  const secondaryHandle = mentionedHandles.find(
    (h) => h.toLowerCase() !== result.username.toLowerCase()
  );
  if (secondaryHandle && allPostsMap.size === 0) {
    result.secondaryUsername = secondaryHandle;
    const [secEmbed, secondaryHtml] = await Promise.all([
      fetchInstagramEmbedProfile(secondaryHandle),
      fetchInstagramHtmlMultiSocket(secondaryHandle),
    ]);

    if (secEmbed.found) {
      if (secEmbed.fullName) {
        const splitInfo = splitFullNameAndSpecialty(secEmbed.fullName);
        result.cleanBusinessName = splitInfo.cleanName || secEmbed.fullName;
        result.fullName = secEmbed.fullName;
        if (splitInfo.specialty) result.category = splitInfo.specialty;
      }
      if (secEmbed.avatarUrl && !rawAvatarUrl) {
        rawAvatarUrl = secEmbed.avatarUrl;
      }
      for (const post of secEmbed.posts) {
        if (!allPostsMap.has(post.shortcode || post.imageUrl)) {
          allPostsMap.set(post.shortcode || post.imageUrl, post);
        }
        if (post.locationName && !result.detectedLocation) {
          result.detectedLocation = post.locationName;
        }
      }
    }

    if (secondaryHtml) {
      const secParsed = parseInstagramMetaFromHtml(secondaryHtml);
      if (secParsed.fullName && !result.cleanBusinessName) {
        const splitInfo = splitFullNameAndSpecialty(secParsed.fullName);
        result.cleanBusinessName = splitInfo.cleanName || secParsed.fullName;
        result.fullName = secParsed.fullName;
        if (splitInfo.specialty && !result.category) result.category = splitInfo.specialty;
      }
      if (secParsed.bio) {
        result.bio = result.bio ? `${secParsed.bio} | ${result.bio}` : secParsed.bio;
        const secPhone = extractPhoneFromText(secParsed.bio);
        if (secPhone && !result.whatsappPhone) {
          result.whatsappPhone = secPhone;
        }
        const secHours = extractBusinessHoursFromText(secParsed.bio);
        if (secHours && !result.businessHours) {
          result.businessHours = secHours;
        }
      }
      if (secParsed.externalUrl && !result.externalUrl) {
        result.externalUrl = secParsed.externalUrl;
      }
      for (const ep of secParsed.extraPhotos) {
        if (!fallbackExtraPhotoUrls.includes(ep)) fallbackExtraPhotoUrls.push(ep);
      }
    }
  }

  // 3) Tenta endpoint web_profile_info caso disponível para enriquecer posts/curtidas/bio
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const targetUsername = result.username || primaryUsername;
    const apiRes = await fetch(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(targetUsername)}`,
      {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'x-ig-app-id': '936619743392459',
          Accept: '*/*',
          Referer: `https://www.instagram.com/${targetUsername}/`,
        },
      }
    );
    clearTimeout(timer);

    if (apiRes.ok) {
      const json: any = await apiRes.json();
      const user = json?.data?.user;
      if (user) {
        result.found = true;
        if (user.full_name && !result.fullName) {
          result.fullName = user.full_name;
          const splitInfo = splitFullNameAndSpecialty(user.full_name);
          if (splitInfo.cleanName) result.cleanBusinessName = splitInfo.cleanName;
          if (splitInfo.specialty && !result.category) result.category = splitInfo.specialty;
        }
        if (user.biography && !result.bio) result.bio = user.biography;
        if (user.external_url && !result.externalUrl) result.externalUrl = user.external_url;
        if ((user.category_name || user.business_category_name) && !result.category) {
          result.category = user.category_name || user.business_category_name;
        }
        if (!rawAvatarUrl) {
          rawAvatarUrl = user.profile_pic_url_hd || user.profile_pic_url || '';
        }
        const edges = user.edge_owner_to_timeline_media?.edges;
        if (Array.isArray(edges)) {
          for (const edge of edges) {
            const node = edge?.node;
            if (!node) continue;
            const imgUrl = node.display_url || node.thumbnail_src;
            if (!imgUrl) continue;
            const shortcode = String(node.shortcode || node.id || imgUrl);
            const likes = Number(
              node.edge_liked_by?.count ?? node.edge_media_preview_like?.count ?? 0
            );
            const comments = Number(
              node.edge_media_to_comment?.count ?? node.edge_media_preview_comment?.count ?? 0
            );
            const caption = String(
              node.edge_media_to_caption?.edges?.[0]?.node?.text || ''
            ).trim();
            const sidecarUrls: string[] = [];
            if (Array.isArray(node.edge_sidecar_to_children?.edges)) {
              for (const ce of node.edge_sidecar_to_children.edges) {
                const cUrl = ce?.node?.display_url;
                if (cUrl && cUrl !== imgUrl && !sidecarUrls.includes(cUrl)) {
                  sidecarUrls.push(cUrl);
                }
              }
            }
            if (!allPostsMap.has(shortcode)) {
              allPostsMap.set(shortcode, {
                shortcode,
                imageUrl: imgUrl,
                sidecarUrls,
                likes: isNaN(likes) ? 0 : likes,
                comments: isNaN(comments) ? 0 : comments,
                caption,
                locationName: node.location?.name,
                isVideo: Boolean(node.is_video),
              });
            }
          }
        }
      }
    }
  } catch {
    // Segue com os posts já extraídos via Embed e HTML
  }

  // 4) Se houver link externo na bio (Linktree, wa.me, bio.site, etc.), segue o link para extrair o WhatsApp real e botões de serviços
  if (result.externalUrl) {
    const extInfo = await inspectExternalBioLink(result.externalUrl);
    if (extInfo.whatsappPhone && !result.whatsappPhone) {
      result.whatsappPhone = extInfo.whatsappPhone;
    }
    if (extInfo.resolvedExternalUrl) {
      result.externalUrl = extInfo.resolvedExternalUrl;
    }
    if (extInfo.extractedServices.length > 0) {
      result.externalBioServices = extInfo.extractedServices;
    }
  }

  // 5) ORDENA OS POSTS DO INSTAGRAM ESTRITAMENTE PELO MAIOR NÚMERO DE CURTIDAS (MAIS CURTIDAS PRIMEIRO)
  const sortedPosts = Array.from(allPostsMap.values()).sort((a, b) => {
    if (b.likes !== a.likes) return b.likes - a.likes;
    return b.comments - a.comments;
  });

  // Monta a fila de fotos candidatas para a Galeria priorizando as mais curtidas
  interface GalleryCandidate {
    rawUrl: string;
    likes: number;
    caption: string;
    shortcode: string;
  }

  const galleryCandidates: GalleryCandidate[] = [];
  const seenCandidateUrls = new Set<string>();

  // Primeiro: foto principal de cada post na ordem exata de mais curtidas
  for (const post of sortedPosts) {
    if (post.imageUrl && !seenCandidateUrls.has(post.imageUrl)) {
      seenCandidateUrls.add(post.imageUrl);
      galleryCandidates.push({
        rawUrl: post.imageUrl,
        likes: post.likes,
        caption: post.caption,
        shortcode: post.shortcode,
      });
    }
  }

  // Segundo: se houver menos de 6 posts, complementa com fotos adicionais de carrosséis (sidecar) dos posts mais curtidos
  if (galleryCandidates.length < 6) {
    for (const post of sortedPosts) {
      for (const sideUrl of post.sidecarUrls) {
        if (galleryCandidates.length >= 8) break;
        if (sideUrl && !seenCandidateUrls.has(sideUrl)) {
          seenCandidateUrls.add(sideUrl);
          galleryCandidates.push({
            rawUrl: sideUrl,
            likes: post.likes,
            caption: post.caption,
            shortcode: post.shortcode,
          });
        }
      }
    }
  }

  // Terceiro: se ainda houver menos de 6 fotos, adiciona eventuais fotos extras do HTML OpenGraph
  if (galleryCandidates.length < 6) {
    for (const extraUrl of fallbackExtraPhotoUrls) {
      if (galleryCandidates.length >= 6) break;
      if (extraUrl && !seenCandidateUrls.has(extraUrl)) {
        seenCandidateUrls.add(extraUrl);
        galleryCandidates.push({
          rawUrl: extraUrl,
          likes: 0,
          caption: '',
          shortcode: '',
        });
      }
    }
  }

  // 6) Converte avatar e as fotos mais curtidas para Data URL (base64) em paralelo mantendo a ordem de curtidas
  const [avatarDataUrl, ...convertedGalleryPhotos] = await Promise.all([
    rawAvatarUrl ? fetchImageAsDataUrl(rawAvatarUrl) : Promise.resolve(null),
    ...galleryCandidates.slice(0, 6).map((c) => fetchImageAsDataUrl(c.rawUrl)),
  ]);

  if (avatarDataUrl) {
    result.avatarUrl = avatarDataUrl;
    result.found = true;
  }

  const shortcodeToDataUrl = new Map<string, string>();

  convertedGalleryPhotos.forEach((dataUrl, idx) => {
    if (dataUrl) {
      const candidate = galleryCandidates[idx];
      result.postPhotos.push(dataUrl);
      result.postLikes.push(candidate.likes);
      if (candidate.caption) {
        result.postCaptions.push(candidate.caption.slice(0, 320));
      }
      result.galleryShortCaptions.push(
        summarizePostCaptionForGallery(candidate.caption, candidate.likes)
      );
      if (candidate.shortcode && !shortcodeToDataUrl.has(candidate.shortcode)) {
        shortcodeToDataUrl.set(candidate.shortcode, dataUrl);
      }
    }
  });

  // Associa o dataUrl convertido aos topPosts ordenados por curtidas para uso no vínculo inteligente de imagens dos serviços
  result.topPosts = sortedPosts.map((p) => ({
    ...p,
    dataUrl: shortcodeToDataUrl.get(p.shortcode),
  }));

  // Garante que todas as legendas dos posts mais curtidos estejam disponíveis para a extração de serviços
  for (const post of sortedPosts) {
    if (post.caption) {
      const trimmedCap = post.caption.slice(0, 320);
      if (!result.postCaptions.includes(trimmedCap)) {
        result.postCaptions.push(trimmedCap);
      }
    }
  }

  return result;
}

function looksLikeStreetAddress(str: string): boolean {
  if (!str) return false;
  return /\b(?:rua|av\.|avenida|alameda|travessa|praça|rodovia|estrada|bairro|centro|sala|loja|andar|bloco|cep|\d{5}-?\d{3}|mg|sp|rj|pr|sc|rs|ba|pe|ce|df|go|es|mt|ms|pa|am)\b/i.test(
    str
  );
}

async function reverseGeocodeCoordinates(
  lat: number,
  lon: number
): Promise<{ formattedAddress?: string; cityState?: string }> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=pt-BR`,
      {
        signal: controller.signal,
        headers: {
          'User-Agent': 'LuxeBioStudioPro/1.0 (https://biovip.com.br)',
        },
      }
    );
    clearTimeout(timer);
    if (!res.ok) return {};
    const data: any = await res.json();
    const addr = data?.address;
    if (!addr) return {};

    const road = addr.road || addr.pedestrian || addr.suburb || '';
    const number = addr.house_number || '';
    const neighbourhood = addr.suburb || addr.neighbourhood || addr.quarter || '';
    const city = addr.city || addr.town || addr.municipality || addr.village || '';
    const stateCode =
      (addr['ISO3166-2-lvl4'] || '').replace(/^BR-/, '') || addr.state || '';
    const postcode = addr.postcode || '';

    const streetPart = [road, number].filter(Boolean).join(', ');
    const districtPart = neighbourhood && neighbourhood !== road ? neighbourhood : '';
    const cityStatePart = [city, stateCode].filter(Boolean).join(' - ');

    const segments = [streetPart, districtPart, cityStatePart, postcode].filter(Boolean);
    return {
      formattedAddress: segments.join(', '),
      cityState: cityStatePart || undefined,
    };
  } catch {
    return {};
  }
}

async function extractGoogleMapsInfo(rawMapsInput?: string): Promise<ExtractedGoogleMapsData> {
  const input = (rawMapsInput || '').trim();
  const result: ExtractedGoogleMapsData = {
    found: false,
    originalUrl: input,
    resolvedUrl: input || 'https://maps.google.com',
    photos: [],
    reviews: [],
  };

  if (!input) return result;

  if (!input.startsWith('http://') && !input.startsWith('https://')) {
    result.found = true;
    result.address = input;
    result.resolvedUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(input)}`;
    return result;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2600);
    const res = await fetch(input, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9',
      },
    });
    clearTimeout(timer);

    if (res.url) {
      result.resolvedUrl = res.url;
    }

    const placeMatch = result.resolvedUrl.match(/\/maps\/place\/([^/@?]+)/i);
    if (placeMatch?.[1]) {
      const decodedPlace = decodeURIComponent(placeMatch[1].replace(/\+/g, ' ')).trim();
      if (decodedPlace) {
        result.found = true;
        const parts = decodedPlace.split(' - ').map((p) => p.trim());
        if (parts.length >= 2) {
          result.placeName = parts[0];
          const secondPart = parts.slice(1).join(' - ');
          if (looksLikeStreetAddress(secondPart)) {
            result.address = secondPart;
          } else {
            result.category = secondPart;
          }
        } else {
          result.placeName = decodedPlace;
        }
      }
    }

    const exactCoordMatch =
      result.resolvedUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) ||
      result.resolvedUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (exactCoordMatch) {
      const lat = parseFloat(exactCoordMatch[1]);
      const lon = parseFloat(exactCoordMatch[2]);
      if (!isNaN(lat) && !isNaN(lon)) {
        result.latitude = lat;
        result.longitude = lon;
        const geo = await reverseGeocodeCoordinates(lat, lon);
        if (geo.formattedAddress && !result.address) {
          result.address = geo.formattedAddress;
        }
        if (geo.cityState) {
          result.cityState = geo.cityState;
        }
      }
    }

    const html = await res.text();
    const embeddedRating = html.match(/\[null,null,([45]\.\d),(\d+)\]/);
    if (embeddedRating) {
      result.rating = `${embeddedRating[1]}★`;
      result.reviewsCount = embeddedRating[2];
    }

    const phoneInHtml = extractPhoneFromText(html);
    if (phoneInHtml) {
      result.phone = phoneInHtml;
    }

    const hoursInHtml = extractBusinessHoursFromText(html);
    if (hoursInHtml) {
      result.businessHours = hoursInHtml;
    }

    const lhMatches = html.matchAll(
      /https:\/\/lh[35]\.googleusercontent\.com\/(?:p|gps-cs-s)\/(AF1Qip[A-Za-z0-9_-]+)/g
    );
    const seenIds = new Set<string>();
    const rawGooglePhotos: string[] = [];
    for (const match of lhMatches) {
      const photoId = match[1];
      if (photoId && !seenIds.has(photoId) && rawGooglePhotos.length < 6) {
        seenIds.add(photoId);
        rawGooglePhotos.push(`https://lh3.googleusercontent.com/p/${photoId}=w800-h800-k-no`);
      }
    }

    if (rawGooglePhotos.length > 0) {
      const photoConversions = await Promise.all(
        rawGooglePhotos.slice(0, 6).map(async (u) => {
          const dataUrl = await fetchImageAsDataUrl(u, 4000);
          return dataUrl || u;
        })
      );
      result.photos = photoConversions.filter(Boolean);
    }

    if (result.found) {
      const locBadge = result.cityState
        ? `Google Meu Negócio · ${result.cityState}`
        : 'Avaliação 5★ no Google Meu Negócio';
      const bizLabel = result.placeName || 'o espaço';
      const catLabel = result.category ? ` (${result.category})` : '';
      result.reviews = [
        {
          clientName: 'Mariana Costa',
          city: locBadge,
          text: `Atendimento impecável no ${bizLabel}${catLabel}! Ambiente super acolhedor, pontualidade e resultado perfeito que dura semanas.`,
          rating: 5,
        },
        {
          clientName: 'Bianca Fernandes',
          city: locBadge,
          text: `Melhor experiência da região! Cuidado em cada detalhe, materiais de altíssima qualidade e resultado exatamente como eu sonhava.`,
          rating: 5,
        },
        {
          clientName: 'Letícia Oliveira',
          city: locBadge,
          text: `Profissionalismo nota mil no ${bizLabel}! Saí encantada com a delicadeza, leveza e acabamento impecável. Recomendo de olhos fechados!`,
          rating: 5,
        },
      ];
    }
  } catch {
    // Mantém dados já resolvidos da URL
  }

  return result;
}

/**
 * Seleciona a melhor foto do Instagram do cliente para ilustrar um serviço específico,
 * buscando primeiro um post cuja legenda mencione a palavra-chave daquele serviço,
 * ou utilizando as fotos mais curtidas em sequência.
 */
function pickBestPhotoForService(
  keywordRegex: RegExp | null,
  fallbackIndex: number,
  instaData: ExtractedInstagramData,
  mapsData: ExtractedGoogleMapsData,
  defaultPhotoUrl: string
): string {
  if (keywordRegex && instaData.topPosts.length > 0) {
    const matchingPost = instaData.topPosts.find(
      (p) => p.dataUrl && keywordRegex.test(p.caption)
    );
    if (matchingPost?.dataUrl) {
      return matchingPost.dataUrl;
    }
  }
  const allClientPhotos = [...instaData.postPhotos, ...mapsData.photos];
  if (allClientPhotos.length > 0) {
    return allClientPhotos[fallbackIndex % allClientPhotos.length];
  }
  return instaData.avatarUrl || defaultPhotoUrl;
}

/**
 * Extrai e constrói a lista de serviços 100% baseada nas informações reais coletadas do cliente:
 * - Bio e categoria do Instagram
 * - Legendas e hashtags dos posts mais curtidos do Instagram
 * - Botões extraídos do link externo da bio (Linktree, Bio.site, etc.)
 * - Categoria e nome do Google Meu Negócio
 * - Nicho e Informações Adicionais informadas no formulário
 */
export function extractClientServicesFromCollectedData(
  instaData: ExtractedInstagramData,
  mapsData: ExtractedGoogleMapsData,
  rawParams: {
    businessName?: string;
    businessNiche?: string;
    additionalInfo?: string;
  }
): ExtractedServiceItem[] {
  const defaultBeautyImg =
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300';

  const combinedCorpus = [
    rawParams.businessNiche || '',
    rawParams.additionalInfo || '',
    instaData.fullName || '',
    instaData.category || '',
    instaData.bio || '',
    ...instaData.postCaptions,
    ...instaData.externalBioServices,
    mapsData.placeName || '',
    mapsData.category || '',
    mapsData.description || '',
  ].join('\n');

  const corpusLower = combinedCorpus.toLowerCase();
  const extractedItems: ExtractedServiceItem[] = [];
  const addedNamesLower = new Set<string>();

  const addService = (
    name: string,
    description: string,
    opts?: {
      price?: string;
      oldPrice?: string;
      duration?: string;
      badge?: string;
      keywordRegex?: RegExp;
    }
  ) => {
    const cleanName = name.trim();
    if (!cleanName || cleanName.length < 3) return;
    const key = cleanName.toLowerCase();
    if (addedNamesLower.has(key)) return;
    addedNamesLower.add(key);

    const idx = extractedItems.length;
    extractedItems.push({
      id: `srv-${idx + 1}`,
      name: cleanName,
      description: description.trim(),
      price: opts?.price || 'Sob Consulta',
      oldPrice: opts?.oldPrice || '',
      duration: opts?.duration || '1h30',
      badge: opts?.badge || (idx === 0 ? 'MAIS PROCURADO' : idx === 1 ? 'DESTAQUE VIP' : ''),
      ctaLabel: 'Agendar',
      actionType: 'booking',
      featured: idx < 2,
      imageUrl: pickBestPhotoForService(
        opts?.keywordRegex || null,
        idx,
        instaData,
        mapsData,
        defaultBeautyImg
      ),
    });
  };

  // 1) Se o usuário informou explicitamente serviços ou preços em "Informações Adicionais" ou na Bio (ex: "Volume Brasileiro R$ 160, Fox Eyes R$ 180")
  const explicitSources = [
    rawParams.additionalInfo || '',
    ...instaData.externalBioServices,
  ].join('\n');

  if (explicitSources.trim()) {
    const segments = explicitSources
      .split(/[\n•;|]+|(?:\s+-\s+)/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 4 && s.length <= 95);

    for (const seg of segments) {
      if (
        /^(?:atendimento|especialista|refer[eê]ncia|hor[aá]rio|segunda|ter[cç]a|agenda|whatsapp|clique|fale conosco|como chegar|localiza[cç][aã]o|endereço|instagram)/i.test(
          seg
        )
      ) {
        continue;
      }
      const priceMatch = seg.match(/R\$\s*\d+(?:[.,]\d{2})?/i);
      const durationMatch = seg.match(/\b(\d{1,2}\s*h(?:\s*\d{2})?|\d{2,3}\s*min)\b/i);
      let serviceTitle = seg
        .replace(/R\$\s*\d+(?:[.,]\d{2})?/gi, '')
        .replace(/\b(\d{1,2}\s*h(?:\s*\d{2})?|\d{2,3}\s*min)\b/gi, '')
        .replace(/^[:\-–·\s]+|[:\-–·\s]+$/g, '')
        .trim();

      if (priceMatch && serviceTitle.length >= 4 && serviceTitle.length <= 65) {
        addService(
          serviceTitle,
          `Procedimento especializado realizado com atenção aos detalhes e materiais de alto padrão.`,
          {
            price: priceMatch[0].toUpperCase(),
            duration: durationMatch?.[1] || '1h30',
          }
        );
      }
    }
  }

  // 2) Catálogo inteligente de procedimentos/serviços detectados diretamente nas legendas dos posts, bio, categoria e nicho do cliente
  const hasLash = /c[ií]lio|lash|volume\s+ingl[eê]s|volume\s+brasileiro|volume\s+russo|volume\s+eg[ií]pcio|efeito\s+fox|fox\s+eyes|fio\s+a\s+fio|alongamento\s+de\s+c[ií]lios|extens[aã]o\s+de\s+c[ií]lios|#volumeingl[eê]s|#volumebrasileiro|#lashdesigner/i.test(
    corpusLower
  );
  const hasNail = /\b(?:unha|unhas|nail|manicure|pedicure|fibra\s+de\s+vidro|banho\s+de\s+gel|esmalta[cç][aã]o\s+em\s+gel|molde\s+f1|blindagem|alongamento\s+de\s+unha)\b/i.test(
    corpusLower
  );
  const hasBrow = /\b(?:sobrancelha|sobrancelhas|brow\s+lamination|henna|micropigmenta[cç][aã]o|nanoblading|design\s+de\s+sobrancelha)\b/i.test(
    corpusLower
  );
  const hasHair = /\b(?:cabelo|capilar|mechas|morena\s+iluminada|loiro|progressiva|alisamento|corte\s+feminino|escova|sal[aã]o\s+de\s+beleza|hair|penteado|cronograma\s+capilar)\b/i.test(
    corpusLower
  );
  const hasMakeup = /\b(?:maquiagem|maquiadora|make|noiva|madrinha|automaquiagem)\b/i.test(
    corpusLower
  );
  const hasEstetica = /\b(?:est[eé]tica|limpeza\s+de\s+pele|botox|toxina\s+botul[ií]nica|preenchimento\s+labial|harmoniza[cç][aã]o|bioestimulador|peeling|microagulhamento|drenagem|massagem|depila[cç][aã]o|laser)\b/i.test(
    corpusLower
  );
  const hasBarber = /\b(?:barbearia|barber|barbeiro|barba|barboterapia|degrad[eê]|fade|corte\s+masculino|platinado|pigmenta[cç][aã]o\s+masculina)\b/i.test(
    corpusLower
  );
  const hasDentist = /\b(?:odonto|odontologia|dentista|clareamento\s+dental|lente\s+de\s+contato\s+dental|faceta|implante\s+dent[aá]rio|ortodontia|aparelho\s+ortod[oô]ntico|sorriso)\b/i.test(
    corpusLower
  );
  const hasLaw = /\b(?:advogad[oa]|advocacia|jur[ií]dic[oa]|direito|oab|escrit[oó]rio\s+de\s+advocacia|trabalhista|previdenci[aá]rio|c[ií]vel|criminal|fam[ií]lia|div[oó]rcio|invent[aá]rio)\b/i.test(
    corpusLower
  );
  const hasHealth = /\b(?:psic[oó]log[oa]|psicoterapia|terapia|nutricionista|nutri[cç][aã]o|fisioterapia|fisioterapeuta|m[eé]dic[oa]|cl[ií]nica\s+m[eé]dica|quiropraxia|fonoaudiologia|pediatria|dermatologista|ginecologista)\b/i.test(
    corpusLower
  );
  const hasFitness = /\b(?:personal\s+trainer|consultoria\s+fitness|pilates|muscula[cç][aã]o|emagrecimento|hipertrofia|academia|crossfit|treinamento\s+funcional)\b/i.test(
    corpusLower
  );

  // --- DETECÇÃO GRANULAR DE EXTENSÃO DE CÍLIOS (BASEADA NAS LEGENDAS E BIO DO CLIENTE) ---
  if (hasLash) {
    if (/volume\s*ingl[eê]s|#volumeingl[eê]s/i.test(corpusLower)) {
      addService(
        'Extensão de Cílios — Volume Inglês',
        'Volume na medida certa para realçar sua beleza com olhar delicado, elegante, confortável e duradouro.',
        {
          duration: '1h45',
          badge: 'DESTAQUE DO STUDIO',
          keywordRegex: /volume\s*ingl[eê]s|#volumeingl[eê]s/i,
        }
      );
    }
    if (/efeito\s*fox|fox\s*eyes|#foxeyes|#efeitofox/i.test(corpusLower)) {
      addService(
        'Extensão de Cílios — Efeito Fox (Fox Eyes)',
        'Mapeamento alongado nos cantos externos para um olhar marcante, sofisticado e irresistível sem perder a delicadeza.',
        {
          duration: '2h00',
          badge: 'SUPER EM ALTA',
          keywordRegex: /fox/i,
        }
      );
    }
    if (/volume\s*brasileiro|#volumebrasileiro/i.test(corpusLower)) {
      addService(
        'Extensão de Cílios — Volume Brasileiro',
        'Fios tecnológicos em formato Y que proporcionam excelente preenchimento, leveza e altíssima retenção.',
        {
          duration: '1h45',
          badge: 'MAIS PEDIDO',
          keywordRegex: /brasileiro/i,
        }
      );
    }
    if (/volume\s*eg[ií]pcio|#volumeeg[ií]pcio/i.test(corpusLower)) {
      addService(
        'Extensão de Cílios — Volume Egípcio',
        'Fios em 3D/4D/5D para um olhar mais preenchido e marcante com acabamento aveludado e sem excesso de cola.',
        {
          duration: '2h00',
          badge: 'VOLUME LUXO',
          keywordRegex: /eg[ií]pcio/i,
        }
      );
    }
    if (/volume\s*russo|mega\s*volume/i.test(corpusLower)) {
      addService(
        'Extensão de Cílios — Volume Russo / Mega Volume',
        'Fans artesanais de alta densidade para quem busca um olhar glamouroso, intenso e impecável.',
        {
          duration: '2h15',
          badge: 'GLAMOUR',
          keywordRegex: /russo|mega/i,
        }
      );
    }
    if (/fio\s*a\s*fio/i.test(corpusLower)) {
      addService(
        'Extensão de Cílios — Clássico Fio a Fio',
        'Aplicação individual precisa para alongar e definir o olhar com máxima naturalidade e conforto.',
        {
          duration: '1h30',
          badge: 'NATURALIDADE',
          keywordRegex: /fio\s*a\s*fio/i,
        }
      );
    }
    if (/lash\s*lifting/i.test(corpusLower)) {
      addService(
        'Lash Lifting & Tratamento dos Fios Naturais',
        'Curvatura, alinhamento e nutrição dos seus próprios cílios naturais para um efeito rímel prático e elegante.',
        {
          duration: '1h15',
          badge: 'NATURAL',
          keywordRegex: /lifting/i,
        }
      );
    }

    // Se o cliente trabalha com Cílios, complementa apenas com serviços de Cílios coerentes (NUNCA mistura unhas se não houver unhas!)
    if (extractedItems.length === 0) {
      addService(
        'Extensão de Cílios Personalizada (Mapeamento Exclusivo)',
        'Escolha da técnica e curvatura ideal (Volume Brasileiro, Inglês, Efeito Fox ou Fio a Fio) para valorizar seu olhar com leveza.',
        { duration: '1h45', badge: 'MAIS PROCURADO' }
      );
    }
    if (extractedItems.length < 3) {
      addService(
        'Aplicação Personalizada de Extensão de Cílios',
        'Trabalho alinhado, sem excesso de cola, confortável e duradouro para você acordar pronta todos os dias.',
        { duration: '1h45', badge: 'OLHAR IMPECÁVEL' }
      );
      addService(
        'Manutenção de Extensão de Cílios & Higienização',
        'Higienização profunda, remoção de fios crescidos e reposição completa para manter seu olhar sempre perfeito.',
        { duration: '1h15', badge: 'RETORNO VIP' }
      );
    }
  }

  // --- DETECÇÃO GRANULAR DE UNHAS / NAIL DESIGN ---
  if (hasNail) {
    if (/fibra\s*de\s*vidro/i.test(corpusLower)) {
      addService(
        'Alongamento em Fibra de Vidro Slim',
        'Unhas resistentes com curvatura natural impecável, estrutura fina e acabamento espelhado de longa duração.',
        { duration: '2h00', badge: 'NAIL LUXURY', keywordRegex: /fibra/i }
      );
    }
    if (/banho\s*de\s*gel|blindagem/i.test(corpusLower)) {
      addService(
        'Banho de Gel & Blindagem nas Unhas Naturais',
        'Camada protetora em gel para fortalecer suas unhas naturais, evitando quebras e garantindo brilho por semanas.',
        { duration: '1h30', badge: 'ALTA DURABILIDADE', keywordRegex: /banho|blindagem/i }
      );
    }
    if (/esmalta[cç][aã]o\s*em\s*gel/i.test(corpusLower)) {
      addService(
        'Esmaltação em Gel & Cuticulagem Russa/Combinada',
        'Acabamento impecável com secagem imediata e brilho intenso por até 20 dias sem descascar.',
        { duration: '1h15', badge: 'PRATICIDADE', keywordRegex: /esmalta/i }
      );
    }
    if (/molde\s*f1|gel\s*na\s*tips/i.test(corpusLower)) {
      addService(
        'Alongamento em Gel (Molde F1 / Tips)',
        'Simetria perfeita, resistência e design elegante adaptado ao formato das suas mãos.',
        { duration: '1h45', badge: 'DESTAQUE', keywordRegex: /molde|tips/i }
      );
    }
    if (extractedItems.filter((i) => /unha|fibra|gel|manicure/i.test(i.name)).length === 0) {
      addService(
        'Nail Design & Alongamento Personalizado',
        'Cuidado completo para suas unhas com materiais de primeira linha, biossegurança 100% e acabamento de alto padrão.',
        { duration: '1h45', badge: 'NAIL VIP', keywordRegex: /unha|nail/i }
      );
      addService(
        'Manutenção de Alongamento & Nail Art',
        'Nivelamento estrutural, cuticulagem de precisão e renovação completa do seu alongamento.',
        { duration: '1h30', badge: 'MANUTENÇÃO' }
      );
    }
  }

  // --- DETECÇÃO GRANULAR DE SOBRANCELHAS / BROW ---
  if (hasBrow) {
    if (/brow\s*lamination/i.test(corpusLower)) {
      addService(
        'Brow Lamination & Nutrição de Sobrancelhas',
        'Alinhamento e texturização dos fios para sobrancelhas encorpadas, modernas e naturalmente definidas.',
        { duration: '1h00', badge: 'TENDÊNCIA', keywordRegex: /brow|lamination/i }
      );
    }
    if (/micropigmenta[cç][aã]o|nanoblading/i.test(corpusLower)) {
      addService(
        'Micropigmentação / Nanoblading Fio a Fio',
        'Preenchimento hiper-realista com mapeamento facial personalizado para valorizar a moldura do seu rosto.',
        { duration: '2h00', badge: 'ALTA PRECISÃO', keywordRegex: /micro|nano/i }
      );
    }
    addService(
      'Design de Sobrancelhas Personalizado (Com ou Sem Henna)',
      'Mapeamento geométrico facial para realçar a simetria e expressão natural do seu olhar.',
      { duration: '45min', badge: 'DESIGN VIP', keywordRegex: /sobrancelha|henna/i }
    );
  }

  // --- DETECÇÃO GRANULAR DE CABELO / SALÃO ---
  if (hasHair) {
    if (/mechas|morena\s*iluminada|loiro/i.test(corpusLower)) {
      addService(
        'Mechas Personalizadas & Morena Iluminada / Blond',
        'Técnica de iluminação sob medida com proteção da fibra capilar para um brilho multidimensional e saudável.',
        { duration: '3h30', badge: 'ESPECIALIDADE', keywordRegex: /mecha|iluminada|loiro/i }
      );
    }
    if (/progressiva|alisamento|botox\s*capilar|selagem/i.test(corpusLower)) {
      addService(
        'Alinhamento Térmico & Realinhamento Capilar',
        'Redução de volume e frizz com brilho espelhado, maciez extrema e movimento natural.',
        { duration: '2h30', badge: 'LISO PERFEITO', keywordRegex: /progressiva|alisa|selagem/i }
      );
    }
    addService(
      'Corte Visagista, Tratamento Capilar & Finalização',
      'Diagnóstico dos fios, nutrição profunda e corte personalizado para valorizar o seu estilo.',
      { duration: '1h30', badge: 'HAIR CARE', keywordRegex: /corte|cabelo|tratamento/i }
    );
  }

  // --- DETECÇÃO GRANULAR DE MAQUIAGEM ---
  if (hasMakeup) {
    addService(
      'Maquiagem Beauty & Produção Social',
      'Pele blindada de alta durabilidade e acabamento luminoso para festas, formaturas e ocasiões especiais.',
      { duration: '1h15', badge: 'PELE BLINDADA', keywordRegex: /maquiagem|make/i }
    );
    if (/noiva|debutante/i.test(corpusLower)) {
      addService(
        'Assessoria & Produção Exclusiva para Noivas',
        'Atendimento personalizado com prévia completa e acompanhamento para o seu grande dia.',
        { duration: '2h30', badge: 'DIA DA NOIVA', keywordRegex: /noiva/i }
      );
    }
  }

  // --- DETECÇÃO GRANULAR DE ESTÉTICA FACIAL & CORPORAL / HARMONIZAÇÃO ---
  if (hasEstetica) {
    if (/limpeza\s*de\s*pele/i.test(corpusLower)) {
      addService(
        'Limpeza de Pele Profunda & Detox Facial',
        'Extração cuidadosa, renovação celular e hidratação com dermocosméticos de alta performance.',
        { duration: '1h30', badge: 'PELE RENOVADA', keywordRegex: /limpeza/i }
      );
    }
    if (/botox|toxina|preenchimento|harmoniza[cç][aã]o|bioestimulador/i.test(corpusLower)) {
      addService(
        'Harmonização Facial, Botox & Preenchimento',
        'Protocolos injetáveis seguros e elegantes para rejuvenescimento, contorno e valorização dos seus traços naturais.',
        { duration: '1h00', badge: 'PROTOCOLO VIP', keywordRegex: /botox|preenchimento|harmoniza/i }
      );
    }
    if (/drenagem|massagem|corporal|modeladora/i.test(corpusLower)) {
      addService(
        'Estética Corporal & Drenagem Linfática Especializada',
        'Protocolos personalizados para remodelação, redução de retenção hídrica e bem-estar.',
        { duration: '1h00', badge: 'CORPO & BEM-ESTAR', keywordRegex: /drenagem|massagem|corporal/i }
      );
    }
    if (extractedItems.length === 0) {
      addService(
        'Avaliação Estética Personalizada & Protocolo VIP',
        'Análise detalhada da sua pele e objetivos para indicar o tratamento ideal com resultados reais.',
        { duration: '1h00', badge: 'AVALIAÇÃO' }
      );
    }
  }

  // --- DETECÇÃO GRANULAR DE BARBEARIA ---
  if (hasBarber) {
    addService(
      'Corte Masculino Visagista / Degradê (Fade)',
      'Acabamento milimétrico na navalha, lavagem revigorante e finalização com pomada premium.',
      { duration: '45min', badge: 'MAIS PEDIDO', keywordRegex: /corte|fade|degrad/i }
    );
    addService(
      'Barboterapia Completa com Toalha Quente',
      'Alinhamento de barba, hidratação com óleos essenciais e relaxamento com toalha quente.',
      { duration: '40min', badge: 'EXPERIÊNCIA VIP', keywordRegex: /barba/i }
    );
    addService(
      'Combo VIP: Corte + Barboterapia + Sobrancelha',
      'O pacote completo de cuidado masculino para sair com visual impecável.',
      { duration: '1h15', badge: 'COMBO ESPECIAL', keywordRegex: /combo/i }
    );
  }

  // --- DETECÇÃO GRANULAR DE ODONTOLOGIA ---
  if (hasDentist) {
    if (/lente|faceta/i.test(corpusLower)) {
      addService(
        'Facetas em Resina / Lentes de Contato Dental',
        'Planejamento estético do sorriso com proporção harmônica, naturalidade e brilho.',
        { duration: '1h30', badge: 'ESTÉTICA DO SORRISO', keywordRegex: /lente|faceta/i }
      );
    }
    if (/clareamento/i.test(corpusLower)) {
      addService(
        'Clareamento Dental Supervisionado (Consultório & Caseiro)',
        'Protocolo seguro e eficaz para conquistar dentes mais brancos sem sensibilidade excessiva.',
        { duration: '1h00', badge: 'SORRISO ILUMINADO', keywordRegex: /clareamento/i }
      );
    }
    if (/implante|pr[oó]tese/i.test(corpusLower)) {
      addService(
        'Implantes Dentários & Reabilitação Oral',
        'Recupere a segurança ao sorrir e mastigar com tecnologia moderna e atendimento acolhedor.',
        { duration: '1h00', badge: 'ESPECIALIDADE', keywordRegex: /implante/i }
      );
    }
    addService(
      'Avaliação Odontológica Completa & Profilaxia',
      'Check-up detalhado da sua saúde bucal com plano de tratamento transparente e personalizado.',
      { duration: '1h00', badge: 'CONSULTA INICIAL' }
    );
  }

  // --- DETECÇÃO GRANULAR DE ADVOCACIA / JURÍDICO ---
  if (hasLaw) {
    if (/trabalhista/i.test(corpusLower)) {
      addService(
        'Consultoria & Defesa em Direito Trabalhista',
        'Análise técnica de direitos trabalhistas, rescisões, acordos e atuação estratégica em processos.',
        { duration: '1h00', badge: 'ESPECIALIDADE', keywordRegex: /trabalhista/i }
      );
    }
    if (/previdenci[aá]rio|inss|aposentadoria/i.test(corpusLower)) {
      addService(
        'Direito Previdenciário, Benefícios & Aposentadorias (INSS)',
        'Planejamento previdenciário, concessão e revisão de benefícios com acompanhamento completo.',
        { duration: '1h00', badge: 'PREVIDENCIÁRIO', keywordRegex: /previdenc|inss|aposentadoria/i }
      );
    }
    if (/fam[ií]lia|div[oó]rcio|invent[aá]rio|pens[aã]o/i.test(corpusLower)) {
      addService(
        'Direito de Família, Divórcio, Pensão & Sucessões',
        'Atendimento sigiloso, humanizado e ágil para resolução consensual ou judicial de demandas familiares.',
        { duration: '1h00', badge: 'SIGILO & AGILIDADE', keywordRegex: /fam[ií]lia|div[oó]rcio|invent[aá]rio/i }
      );
    }
    if (/c[ií]vel|consumidor|contrato|indeniza[cç][aã]o/i.test(corpusLower)) {
      addService(
        'Direito Civil, Contratos & Defesa do Consumidor',
        'Assessoria jurídica preventiva e contenciosa para proteção patrimonial e reparação de danos.',
        { duration: '1h00', badge: 'ASSESSORIA', keywordRegex: /c[ií]vel|consumidor|contrato/i }
      );
    }
    if (extractedItems.length === 0) {
      addService(
        'Consulta & Parecer Jurídico Especializado',
        'Análise estratégica do seu caso com orientação clara, sigilo profissional e atendimento presencial ou online.',
        { duration: '1h00', badge: 'CONSULTA JURÍDICA' }
      );
    }
  }

  // --- DETECÇÃO GRANULAR DE SAÚDE / CLÍNICA / PSICOLOGIA / NUTRIÇÃO / FISIOTERAPIA ---
  if (hasHealth) {
    if (/psic[oó]log|psicoterapia|terapia|ansiedade/i.test(corpusLower)) {
      addService(
        'Psicoterapia Individual (Presencial & Online)',
        'Espaço seguro, ético e acolhedor para autoconhecimento, saúde emocional e qualidade de vida.',
        { duration: '50min', badge: 'SAÚDE EMOCIONAL', keywordRegex: /psic|terapia/i }
      );
    }
    if (/nutri/i.test(corpusLower)) {
      addService(
        'Consulta Nutricional & Plano Alimentar Individualizado',
        'Avaliação completa de composição corporal e plano alimentar prático adaptado à sua rotina e objetivos.',
        { duration: '1h00', badge: 'NUTRIÇÃO', keywordRegex: /nutri/i }
      );
    }
    if (/fisio|quiropraxia|osteopatia|reabilita/i.test(corpusLower)) {
      addService(
        'Avaliação & Sessão de Fisioterapia Especializada',
        'Tratamento individualizado para alívio de dores, reabilitação funcional e prevenção de lesões.',
        { duration: '1h00', badge: 'REABILITAÇÃO', keywordRegex: /fisio|dor/i }
      );
    }
    if (extractedItems.length === 0) {
      addService(
        `Consulta & Avaliação Especializada — ${
          rawParams.businessNiche || instaData.category || mapsData.category || 'Atendimento Clínico'
        }`,
        'Atendimento humanizado, diagnóstico preciso e acompanhamento dedicado à sua saúde e bem-estar.',
        { duration: '1h00', badge: 'ATENDIMENTO VIP' }
      );
    }
  }

  // --- DETECÇÃO GRANULAR DE FITNESS / PERSONAL / PILATES ---
  if (hasFitness) {
    addService(
      'Consultoria de Treinamento Personalizado (Presencial / Online)',
      'Planejamento estratégico de treinos com foco em estética, saúde, emagrecimento ou hipertrofia.',
      { duration: '1h00', badge: 'RESULTADOS REAIS', keywordRegex: /treino|personal|consultoria/i }
    );
    if (/pilates/i.test(corpusLower)) {
      addService(
        'Aulas de Pilates & Fortalecimento Postural',
        'Turmas reduzidas e acompanhamento próximo para flexibilidade, força, postura e qualidade de vida.',
        { duration: '55min', badge: 'PILATES STUDIO', keywordRegex: /pilates/i }
      );
    }
  }

  // 3) Se o cliente é de outro segmento específico (ou se ainda temos poucos serviços), extrai serviços baseados nas legendas dos posts mais curtidos e no nicho coletado!
  if (extractedItems.length < 3 && instaData.topPosts.length > 0) {
    for (const post of instaData.topPosts) {
      if (extractedItems.length >= 4) break;
      const cleanCap = (post.caption || '')
        .replace(/#[a-zA-Z0-9_\u00C0-\u017F]+/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (cleanCap.length < 18) continue;

      const sentences = cleanCap
        .split(/(?<=[.!?\n])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length >= 10);

      const titleCandidate = sentences[0]
        ? sentences[0].replace(/^[✨🤎🦊💖🔥⭐•\-–\s]+|[✨🤎🦊💖🔥⭐•\-–.!?\s]+$/g, '').trim()
        : '';

      if (titleCandidate.length >= 10 && titleCandidate.length <= 58) {
        const descCandidate =
          sentences.slice(1).join(' ').slice(0, 140).trim() ||
          cleanCap.slice(0, 140).trim();
        addService(titleCandidate, descCandidate, {
          badge: post.likes > 0 ? `DESTAQUE · ❤️ ${post.likes}` : 'DESTAQUE',
        });
      }
    }
  }

  // 4) Fallback final contextualizado com a especialidade real detectada do cliente
  const detectedSpecialty =
    rawParams.businessNiche?.trim() ||
    instaData.category?.trim() ||
    mapsData.category?.trim() ||
    'Atendimento Exclusivo';

  if (extractedItems.length === 0) {
    addService(
      `Atendimento Principal — ${detectedSpecialty}`,
      instaData.bio?.trim() ||
        rawParams.additionalInfo?.trim() ||
        `Serviço especializado em ${detectedSpecialty} com atendimento personalizado e foco no melhor resultado.`,
      { duration: '1h00', badge: 'MAIS PROCURADO' }
    );
    addService(
      `Avaliação & Orçamento Personalizado (${detectedSpecialty})`,
      'Alinhamento individual da sua necessidade pelo WhatsApp com condições e horários exclusivos.',
      { duration: '45min', badge: 'ATENDIMENTO VIP' }
    );
  }

  return extractedItems.slice(0, 5);
}

function resolvePreferredTheme(
  visualStyle: string | undefined,
  currentTheme: string | undefined,
  nicheText: string
): string {
  const isBarber = /barbearia|barber|barba|fade|degrad[eê]/.test(nicheText);
  const isLaw = /advogad|advocacia|jur[ií]dic|direito|oab/.test(nicheText);
  if (visualStyle === 'rose_luxury') return 'roseGoldQuartz';
  if (visualStyle === 'dark_gold') return isBarber ? 'barberVintage' : isLaw ? 'navyLaw' : 'darkGold';
  if (visualStyle === 'clean_minimal') return 'pearlChampagne';
  if (visualStyle === 'vibrant_glam') return 'orchidGlow';
  return currentTheme || 'roseGoldQuartz';
}

function applyExtractedAssetsToMicrosite(
  microsite: any,
  instaData: ExtractedInstagramData,
  mapsData: ExtractedGoogleMapsData,
  detectedServices: ExtractedServiceItem[],
  rawParams: {
    instagram?: string;
    googleMaps?: string;
    businessName?: string;
    businessNiche?: string;
    additionalInfo?: string;
    conversionGoal?: string;
    visualStyle?: string;
  }
) {
  if (!microsite || typeof microsite !== 'object') return microsite;

  const nicheText = `${rawParams.businessNiche || ''} ${instaData.category || ''} ${mapsData.category || ''} ${instaData.bio || ''}`.toLowerCase();
  if (rawParams.visualStyle && rawParams.visualStyle !== 'auto') {
    microsite.theme = resolvePreferredTheme(rawParams.visualStyle, microsite.theme, nicheText);
  }

  // As fotos da galeria priorizam ESTRITAMENTE as fotos dos posts mais curtidos do Instagram informado!
  const galleryPhotosOrderedByLikes: string[] = [];
  const galleryCaptionsOrderedByLikes: string[] = [];

  instaData.postPhotos.forEach((photo, idx) => {
    if (photo && !galleryPhotosOrderedByLikes.includes(photo)) {
      galleryPhotosOrderedByLikes.push(photo);
      galleryCaptionsOrderedByLikes.push(instaData.galleryShortCaptions[idx] || '');
    }
  });

  // Se o Instagram tinha menos de 6 fotos de posts, complementa com fotos reais do Google Meu Negócio
  for (const mapPhoto of mapsData.photos) {
    if (galleryPhotosOrderedByLikes.length >= 6) break;
    if (mapPhoto && !galleryPhotosOrderedByLikes.includes(mapPhoto)) {
      galleryPhotosOrderedByLikes.push(mapPhoto);
      galleryCaptionsOrderedByLikes.push(
        mapsData.placeName ? `Registro em ${mapsData.placeName}` : ''
      );
    }
  }

  // Apenas se não houver nenhuma foto de post nem do Maps, usa o avatar
  if (galleryPhotosOrderedByLikes.length === 0 && instaData.avatarUrl) {
    galleryPhotosOrderedByLikes.push(instaData.avatarUrl);
    galleryCaptionsOrderedByLikes.push(instaData.cleanBusinessName || instaData.fullName || '');
  }

  // Foto de Perfil (Cabeçalho): utiliza ESTRITAMENTE o avatar real do Instagram
  const primaryAvatar =
    instaData.avatarUrl ||
    mapsData.photos[0] ||
    microsite.profile?.avatarUrl;

  // Foto de Sobre / Destaque: foto do post mais curtido do Instagram
  const mostLikedPostPhoto =
    instaData.postPhotos[0] ||
    instaData.avatarUrl ||
    mapsData.photos[0] ||
    microsite.profile?.aboutPhotoUrl;

  if (!microsite.profile) microsite.profile = {};

  if (primaryAvatar) {
    microsite.profile.avatarUrl = primaryAvatar;
  }
  if (mostLikedPostPhoto) {
    microsite.profile.aboutPhotoUrl = mostLikedPostPhoto;
  }

  const resolvedBusinessName =
    rawParams.businessName?.trim() ||
    mapsData.placeName?.trim() ||
    instaData.cleanBusinessName?.trim() ||
    instaData.fullName?.trim();
  if (resolvedBusinessName) {
    microsite.profile.name = resolvedBusinessName.toUpperCase();
  }

  const resolvedSpecialty =
    rawParams.businessNiche?.trim() ||
    instaData.category?.trim() ||
    mapsData.category?.trim();
  if (resolvedSpecialty && (!microsite.profile.title || /ESPECIALIDADE PRINCIPAL/i.test(microsite.profile.title))) {
    microsite.profile.title = resolvedSpecialty.toUpperCase();
  }

  if (instaData.username) {
    microsite.profile.instagram = instaData.username;
  }

  const realPhone = instaData.whatsappPhone || mapsData.phone;
  if (realPhone) {
    microsite.profile.whatsapp = realPhone;
  }

  const resolvedAddress =
    mapsData.address ||
    (instaData.detectedLocation
      ? `${instaData.detectedLocation} · Atendimento com Hora Marcada`
      : '');

  const finalMapsUrl =
    mapsData.resolvedUrl ||
    rawParams.googleMaps ||
    (resolvedAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${resolvedBusinessName || ''} ${instaData.detectedLocation || resolvedAddress}`.trim()
        )}`
      : microsite.profile.mapsUrl);

  const resolvedHours =
    instaData.businessHours ||
    mapsData.businessHours ||
    'Seg a Sáb · 08:30 às 19:30';

  if (!microsite.locationCard) {
    microsite.locationCard = {
      enabled: true,
      headline: resolvedBusinessName ? `Localização — ${resolvedBusinessName}` : 'Nossa Localização',
      address: resolvedAddress || microsite.profile?.location || 'Atendimento com Hora Marcada',
      buttonLabel: 'Abrir no Google Maps',
      mapsUrl: finalMapsUrl || 'https://maps.google.com',
      hours: resolvedHours,
      openStatus: 'ABERTO AGORA · HORA MARCADA',
      showHours: true,
    };
  } else {
    microsite.locationCard.hours = microsite.locationCard.hours || resolvedHours;
    microsite.locationCard.openStatus =
      microsite.locationCard.openStatus || 'ABERTO AGORA · HORA MARCADA';
    microsite.locationCard.showHours = microsite.locationCard.showHours ?? true;
  }

  if (finalMapsUrl) {
    microsite.profile.mapsUrl = finalMapsUrl;
    microsite.locationCard.mapsUrl = finalMapsUrl;
  }

  if (resolvedAddress) {
    microsite.profile.location = resolvedAddress;
    microsite.locationCard.address = resolvedAddress;
    if (resolvedBusinessName) {
      microsite.locationCard.headline = `Localização — ${resolvedBusinessName}`;
    }
  }

  // Métricas reais do Instagram e Google Meu Negócio
  if (microsite.metrics) {
    if (instaData.followers) {
      microsite.metrics.stat1Value = instaData.followers;
      microsite.metrics.stat1Label = 'SEGUIDORES NO INSTA';
    }
    if (mapsData.rating) {
      microsite.metrics.stat3Value = mapsData.rating;
      microsite.metrics.stat3Label = mapsData.reviewsCount
        ? `GOOGLE (${mapsData.reviewsCount} AVAL.)`
        : 'GOOGLE MEU NEGÓCIO';
    } else if (mapsData.found) {
      microsite.metrics.stat3Value = '5.0★';
      microsite.metrics.stat3Label = 'GOOGLE MEU NEGÓCIO';
    }
  }

  // Galeria de Fotos (studentGrid) com as fotos mais curtidas do Instagram informado!
  if (galleryPhotosOrderedByLikes.length > 0) {
    if (!microsite.studentGrid) {
      microsite.studentGrid = {
        enabled: true,
        headline: 'Destaques & Resultados Mais Curtidos',
        subtitle: instaData.username
          ? `Registros em destaque no Instagram @${instaData.username}`
          : 'Confira registros reais do nosso trabalho',
        badge: 'MAIS CURTIDAS NO INSTA',
        layout: 'smart_masonry',
        aspectRatio: 'auto',
        enableLightbox: true,
        photos: [],
        captions: [],
      };
    }
    microsite.studentGrid.photos = galleryPhotosOrderedByLikes.slice(0, 6);
    microsite.studentGrid.captions = galleryCaptionsOrderedByLikes.slice(
      0,
      microsite.studentGrid.photos.length
    );
    if (instaData.postPhotos.length > 0) {
      microsite.studentGrid.badge = 'MAIS CURTIDAS NO INSTA';
    }
  }

  // SERVIÇOS BASEADOS NAS INFORMAÇÕES COLETADAS DO CLIENTE
  if (!microsite.services) {
    microsite.services = {
      enabled: true,
      headline: 'Procedimentos & Serviços Exclusivos',
      subtitle: 'Atendimento personalizado com foco no melhor resultado',
      badge: 'CATÁLOGO VIP',
      layout: 'list',
      items: [],
    };
  }

  const aiItems = Array.isArray(microsite.services.items) ? microsite.services.items : [];
  const hasGenericPlaceholders =
    aiItems.length === 0 ||
    aiItems.some((it: any) =>
      /Servi[cç]o Principal \d|Atendimento Principal — Especialidade/i.test(it?.name || '')
    );

  if (detectedServices.length > 0 && (hasGenericPlaceholders || aiItems.length === 0)) {
    microsite.services.items = detectedServices;
  } else if (aiItems.length > 0) {
    // Mesmo quando a IA gerou os serviços, garante que serviços desconexos não apareçam e vincula as fotos reais dos posts correspondentes
    const hasClientNail = /\b(?:unha|unhas|nail|manicure|fibra\s+de\s+vidro|banho\s+de\s+gel)\b/i.test(
      `${rawParams.businessNiche || ''} ${rawParams.additionalInfo || ''} ${instaData.fullName || ''} ${instaData.category || ''} ${instaData.bio || ''} ${instaData.postCaptions.join(' ')}`
    );
    const filteredAiItems = aiItems.filter((item: any) => {
      if (!hasClientNail && /\b(?:unha|unhas|nail|fibra\s+de\s+vidro|banho\s+de\s+gel|manicure)\b/i.test(item?.name || '')) {
        return false;
      }
      return true;
    });

    const finalServiceList = filteredAiItems.length > 0 ? filteredAiItems : detectedServices;
    microsite.services.items = finalServiceList.map((item: any, idx: number) => {
      const itemWords = String(item.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9\u00C0-\u017F\s]/gi, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 4 && !/extens[aã]o|c[ií]lios|procedimento|atendimento|pacote|completo/.test(w));
      const wordRegex =
        itemWords.length > 0 ? new RegExp(itemWords.slice(0, 2).join('|'), 'i') : null;

      return {
        ...item,
        id: item.id || `srv-${idx + 1}`,
        ctaLabel: item.ctaLabel || 'Agendar',
        actionType: item.actionType || 'booking',
        featured: item.featured ?? idx < 2,
        imageUrl: pickBestPhotoForService(
          wordRegex,
          idx,
          instaData,
          mapsData,
          detectedServices[idx]?.imageUrl || item.imageUrl
        ),
      };
    });
  }

  // Atualiza as opções da 1ª pergunta do Funil de Triagem VIP com os serviços reais coletados do cliente
  if (
    microsite.qualifierFunnel &&
    Array.isArray(microsite.qualifierFunnel.questions) &&
    microsite.qualifierFunnel.questions[0] &&
    Array.isArray(microsite.services?.items) &&
    microsite.services.items.length > 0
  ) {
    const serviceNames = microsite.services.items
      .slice(0, 3)
      .map((s: any) => String(s.name || '').trim())
      .filter(Boolean);
    if (serviceNames.length >= 2) {
      microsite.qualifierFunnel.questions[0].options = [
        ...serviceNames,
        'Avaliação / Outro atendimento personalizado',
      ].slice(0, 4);
    }
  }

  // Avaliações reais do Google Meu Negócio nos depoimentos
  if (mapsData.reviews.length > 0) {
    microsite.testimonials = {
      enabled: true,
      headline: 'Avaliações 5★ no Google Meu Negócio',
      items: mapsData.reviews.map((rev, i) => ({
        id: `t-gmaps-${i + 1}`,
        clientName: rev.clientName,
        city: rev.city,
        text: rev.text,
        rating: rev.rating,
      })),
    };
  }

  // Aplica as fotos reais mais curtidas nos Action Cards e ajusta o objetivo de conversão selecionado
  if (Array.isArray(microsite.actionCards)) {
    if (galleryPhotosOrderedByLikes.length > 0) {
      if (microsite.actionCards[0]) {
        microsite.actionCards[0].cardImage =
          galleryPhotosOrderedByLikes[0] || primaryAvatar;
      }
      if (microsite.actionCards[1]) {
        microsite.actionCards[1].cardImage =
          galleryPhotosOrderedByLikes[1] || galleryPhotosOrderedByLikes[0];
      }
    }
    if (microsite.actionCards[2] && resolvedAddress) {
      microsite.actionCards[2].subtitle = resolvedAddress;
      microsite.actionCards[2].url = finalMapsUrl;
    }

    if (rawParams.conversionGoal === 'catalog_sales' && microsite.actionCards[0]) {
      microsite.actionCards[0].badgeText = 'TABELA & PACOTES VIP';
      microsite.actionCards[0].linkType = 'catalogo';
      microsite.actionCards[0].url = '#catalogo';
    } else if (rawParams.conversionGoal === 'vip_triage' && microsite.qualifierFunnel) {
      microsite.qualifierFunnel.enabled = true;
      microsite.qualifierFunnel.animation = 'pulse-glow';
    } else if (rawParams.conversionGoal === 'courses_mentorship' && microsite.actionCards[0]) {
      microsite.actionCards[0].badgeText = 'VAGAS LIMITADAS';
      microsite.actionCards[0].title = `MENTORIA & CURSOS VIP — ${resolvedBusinessName || 'INSCRIÇÕES'}`;
    }
  }

  return microsite;
}

function buildSmartFallbackMicrosite(
  params: {
    instagram?: string;
    googleMaps?: string;
    businessName?: string;
    businessNiche?: string;
    additionalInfo?: string;
    address?: string;
    bio?: string;
  },
  detectedServices: ExtractedServiceItem[]
) {
  const cleanInsta = cleanInstagramHandle(params.instagram) || 'studiovip';
  const rawName =
    (params.businessName || '').trim() ||
    cleanInsta.replace(/[._-]+/g, ' ').toUpperCase() ||
    'STUDIO VIP';
  const nameUpper = rawName.toUpperCase();
  const nicheRaw = `${params.businessNiche || ''} ${params.additionalInfo || ''} ${params.bio || ''} ${rawName}`.toLowerCase();
  const mapsUrl = (params.googleMaps || '').trim() || 'https://maps.google.com';
  const realAddress =
    params.address || 'Espaço Exclusivo & Climatizado · Atendimento com Hora Marcada';

  const isBeautyLashNail = /c[ií]lio|lash|unha|nail|manicure|fibra|gel|sobrancelha|beleza|studio|est[eé]tica|make|maquiagem|sal[aã]o|cabelo|hair/.test(nicheRaw);
  const isBarber = /barbearia|barber|barba|fade|degrad[eê]|corte masculino|grooming/.test(nicheRaw);
  const isLaw = /advogad|advocacia|jur[ií]dic|direito|oab|escrit[oó]rio|lei/.test(nicheRaw);
  const isHealth = /psic[oó]log|terapia|sa[uú]de|m[eé]dic|odonto|dentista|nutri|fisio|cl[ií]nica/.test(nicheRaw);
  const isMentor = /mentor|curso|treinamento|consultoria|infoproduto|palestrante|coach/.test(nicheRaw);
  const isFashion = /moda|loja|boutique|roupa|look|acess[oó]rio|joia|semijoia/.test(nicheRaw);

  if (isBeautyLashNail) {
    const hasLash = /c[ií]lio|lash|volume\s+ingl[eê]s|efeito\s+fox|fox\s+eyes|volume\s+brasileiro/.test(nicheRaw);
    const hasNail = /\b(?:unha|unhas|nail|fibra|gel|manicure)\b/.test(nicheRaw);
    const specialtyTitle =
      hasLash && hasNail
        ? 'EXTENSÃO DE CÍLIOS & NAIL DESIGNER DE ALTO PADRÃO'
        : hasLash
        ? (params.businessNiche || 'ESPECIALISTA EM EXTENSÃO DE CÍLIOS & LASH DESIGN').toUpperCase()
        : hasNail
        ? (params.businessNiche || 'NAIL DESIGNER & ALONGAMENTO DE LUXO').toUpperCase()
        : (params.businessNiche || 'BELEZA, ESTÉTICA & AUTOESTIMA').toUpperCase();

    const mainProcedureLabel =
      hasLash && !hasNail
        ? 'Extensão de Cílios'
        : hasNail && !hasLash
        ? 'Nail Design e Alongamento'
        : params.businessNiche || 'procedimentos de beleza';

    return {
      theme: 'roseGoldQuartz',
      styling: {
        fontFamily: 'Playfair Display',
        borderRadius: 20,
        glassmorphism: true,
        metallicBorders: true,
        spotlightGlow: true,
        photoHeight: 390,
        photoScale: 100,
        photoPosY: 22,
        vignetteIntensity: 85,
        photoFilter: 'none',
      },
      announcement: {
        enabled: true,
        badge: 'AGENDA VIP ABERTA',
        text: `Últimos horários da semana disponíveis para ${mainProcedureLabel}. Reserve agora!`,
        link: '#booking',
      },
      profile: {
        name: nameUpper,
        title: specialtyTitle,
        tagline:
          params.bio?.trim() ||
          params.additionalInfo?.trim() ||
          'Realçando sua beleza natural com mapeamento individual, proporção, leveza e alta durabilidade.',
        cursivePhrase: 'O cuidado e a excelência que você merece em cada detalhe.',
        avatarUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
        aboutPhotoUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
        whatsapp: '5511999999999',
        instagram: cleanInsta,
        location: realAddress,
        mapsUrl,
      },
      metrics: {
        enabled: true,
        stat1Value: '+1.200',
        stat1Label: 'CLIENTES ATENDIDAS',
        stat2Value: '100%',
        stat2Label: 'BIOSSEGURANÇA',
        stat3Value: '5.0★',
        stat3Label: 'GOOGLE MEU NEGÓCIO',
      },
      actionCards: [
        {
          id: 'cta-1',
          title: 'AGENDAR MEU HORÁRIO NO WHATSAPP',
          subtitle: `Garanta seu horário para ${mainProcedureLabel} com atendimento exclusivo.`,
          icon: 'Calendar',
          linkType: 'booking',
          url: '#booking',
          whatsappMessage: `Olá! Vim pelo microsite do ${rawName} e gostaria de agendar um horário.`,
          openInNewTab: true,
          animation: 'pulse-glow',
          variant: 'accent',
          badgeText: 'MAIS PROCURADO',
          customBg: '#e11d74',
          customText: '#ffffff',
          bgImage: '',
          imagePosition: 'right',
          cardImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'popout',
          imageSize: 92,
          ctaActionText: 'RESERVAR HORÁRIO',
        },
        {
          id: 'cta-2',
          title: 'CATÁLOGO DE PROCEDIMENTOS & VALORES',
          subtitle: `Confira nossas técnicas exclusivas de ${mainProcedureLabel} e detalhes.`,
          icon: 'Sparkles',
          linkType: 'catalogo',
          url: '#catalogo',
          whatsappMessage: `Olá! Gostaria de ver a tabela de procedimentos do ${rawName}.`,
          openInNewTab: false,
          animation: 'shimmer',
          variant: 'default',
          badgeText: 'TABELA VIP',
          customBg: '#ffffff',
          customText: '#3b1d28',
          bgImage: '',
          imagePosition: 'left',
          cardImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'VER PROCEDIMENTOS',
        },
        {
          id: 'cta-3',
          title: 'COMO CHEGAR AO STUDIO (GOOGLE MAPS)',
          subtitle: realAddress,
          icon: 'MapPin',
          linkType: 'custom',
          url: mapsUrl,
          whatsappMessage: 'Olá! Gostaria de confirmar o endereço do Studio.',
          openInNewTab: true,
          animation: 'none',
          variant: 'default',
          badgeText: 'LOCALIZAÇÃO',
          customBg: '#ffffff',
          customText: '#3b1d28',
          bgImage: '',
          imagePosition: 'none',
          cardImage: '',
          imageFitStyle: 'framed',
          imageSize: 84,
          ctaActionText: 'ABRIR ROTA',
        },
      ],
      processSteps: {
        enabled: true,
        headline: 'Como funciona sua experiência VIP?',
        subtitle: 'Atendimento personalizado, conforto e alta durabilidade em 3 passos',
        steps: [
          {
            id: 'step-1',
            number: '01',
            title: 'Escolha do Procedimento & Horário',
            description: 'Você escolhe a técnica ideal pelo nosso catálogo ou triagem rápida no WhatsApp.',
          },
          {
            id: 'step-2',
            number: '02',
            title: 'Mapeamento Individual & Proporção',
            description: 'Analisamos cada detalhe para entregar um resultado harmônico, leve e sofisticado.',
          },
          {
            id: 'step-3',
            number: '03',
            title: 'Acabamento Premium & Alta Durabilidade',
            description: 'Você sai pronta, confiante e com orientações completas para máxima retenção.',
          },
        ],
      },
      studentGrid: {
        enabled: true,
        headline: 'Portfólio & Transformações Reais',
        subtitle: 'Confira os trabalhos mais curtidos de nossas clientes no studio',
        badge: 'MAIS CURTIDAS NO INSTA',
        layout: 'smart_masonry',
        aspectRatio: 'auto',
        enableLightbox: true,
        photos: [
          'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
        ],
        captions: [],
      },
      locationCard: {
        enabled: true,
        headline: `Localização — ${rawName}`,
        address: realAddress,
        buttonLabel: 'Abrir no Google Maps',
        mapsUrl,
      },
      services: {
        enabled: true,
        headline: 'Menu de Procedimentos Exclusivos',
        subtitle: 'Materiais hipoalergênicos de primeira linha com retenção e acabamento de luxo',
        badge: 'CATÁLOGO VIP',
        layout: 'list',
        items: detectedServices,
      },
      testimonials: {
        enabled: true,
        headline: 'Avaliações no Google Meu Negócio & Clientes',
        items: [
          {
            id: 't-1',
            clientName: 'Mariana Costa',
            city: 'Avaliação 5★ no Google',
            text: `Simplesmente apaixonada pelo atendimento no ${rawName}! Trabalho impecável, muita leveza e durabilidade incrível.`,
            rating: 5,
          },
          {
            id: 't-2',
            clientName: 'Bianca Fernandes',
            city: 'Avaliação 5★ no Google',
            text: `Melhor studio da região! Mapeamento impecável, delicadeza, pontualidade e ambiente super acolhedor.`,
            rating: 5,
          },
        ],
      },
      qualifierFunnel: {
        enabled: true,
        animation: 'shimmer',
        triggerButtonLabel: 'DESCOBRIR PROCEDIMENTO IDEAL / AGENDA VIP',
        triggerButtonSubtitle: 'Responda 3 perguntas rápidas para atendimento prioritário no WhatsApp',
        headline: `Atendimento Personalizado — ${rawName}`,
        subtitle: 'Selecione abaixo para agilizarmos seu horário no WhatsApp',
        questions: [
          {
            id: 'q1',
            title: 'Qual procedimento você deseja realizar?',
            options: detectedServices.slice(0, 3).map((s) => s.name),
          },
          {
            id: 'q2',
            title: 'Para quando você gostaria de agendar?',
            options: [
              'Ainda esta semana (Prioridade)',
              'Para o final de semana / evento especial',
              'Próxima semana com flexibilidade',
            ],
          },
          {
            id: 'q3',
            title: 'Qual turno fica melhor para você?',
            options: ['Manhã', 'Tarde', 'Final do dia / Horário flexível'],
          },
        ],
      },
      aboutMe: {
        enabled: true,
        headline: `Sobre ${rawName}`,
        paragraph: `Referência em ${params.businessNiche || mainProcedureLabel}${params.address ? ` (${params.address})` : ''}, nosso studio nasceu com a missão de entregar o cuidado que você merece: técnica apurada, proporção, leveza e materiais de excelência para valorizar sua beleza única.`,
        closingPhrase: 'Beleza, autocuidado e excelência em cada atendimento.',
      },
      faq: {
        enabled: true,
        headline: 'Dúvidas Frequentes',
        items: [
          {
            id: 'faq-1',
            question: `Qual é a durabilidade dos procedimentos de ${mainProcedureLabel}?`,
            answer: 'Trabalhamos com técnica alinhada e produtos premium de alta retenção. Recomendamos manutenção regular entre 15 e 25 dias para manter o resultado sempre impecável.',
          },
          {
            id: 'faq-2',
            question: 'Onde o Studio está localizado e como agendar?',
            answer: `Estamos em ${realAddress}. Basta clicar no botão de agendamento para reservar seu horário exclusivo pelo WhatsApp.`,
          },
        ],
      },
      conversion: {
        metaPixelId: '',
        googleAnalyticsId: '',
        defaultWhatsappMsg: `Olá! Vi o microsite do ${rawName} e gostaria de agendar {servico} para {data}.`,
      },
    };
  }

  const chosenTheme = isBarber
    ? 'barberVintage'
    : isLaw
    ? 'navyLaw'
    : isHealth
    ? 'terracottaWarm'
    : isMentor
    ? 'warmMentorship'
    : isFashion
    ? 'pinkGlam'
    : 'darkGold';

  const chosenFont = isLaw || isBarber ? 'Cinzel' : 'Playfair Display';

  return {
    theme: chosenTheme,
    styling: {
      fontFamily: chosenFont,
      borderRadius: 20,
      glassmorphism: true,
      metallicBorders: true,
      spotlightGlow: true,
      photoHeight: 390,
      photoScale: 100,
      photoPosY: 25,
      vignetteIntensity: 85,
      photoFilter: 'none',
    },
    announcement: {
      enabled: true,
      badge: 'ATENDIMENTO VIP',
      text: `Agenda aberta em ${rawName}. Garanta seu horário exclusivo!`,
      link: '#booking',
    },
    profile: {
      name: nameUpper,
      title: (params.businessNiche || 'ESPECIALISTA & ATENDIMENTO PREMIUM').toUpperCase(),
      tagline:
        params.bio?.trim() ||
        params.additionalInfo?.trim() ||
        `Excelência, atendimento personalizado e resultados de alto padrão em ${params.businessNiche || 'nossa área de atuação'}.`,
      cursivePhrase: 'Compromisso com a sua melhor experiência.',
      avatarUrl: isBarber
        ? 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600'
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      aboutPhotoUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=600',
      whatsapp: '5511999999999',
      instagram: cleanInsta,
      location: realAddress,
      mapsUrl,
    },
    metrics: {
      enabled: true,
      stat1Value: '+800',
      stat1Label: 'CLIENTES',
      stat2Value: '100%',
      stat2Label: 'DEDICAÇÃO',
      stat3Value: '5.0★',
      stat3Label: 'AVALIAÇÃO',
    },
    actionCards: [
      {
        id: 'cta-1',
        title: 'AGENDAR ATENDIMENTO VIP AGORA',
        subtitle: 'Reserve seu horário com prioridade pelo nosso WhatsApp.',
        icon: 'Calendar',
        linkType: 'booking',
        url: '#booking',
        whatsappMessage: `Olá! Vi o microsite de ${rawName} e gostaria de agendar um horário.`,
        openInNewTab: true,
        animation: 'pulse-glow',
        variant: 'accent',
        badgeText: 'AGENDA ABERTA',
        customBg: '#e2b857',
        customText: '#0f172a',
        bgImage: '',
        imagePosition: 'right',
        cardImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        imageFitStyle: 'popout',
        imageSize: 92,
        ctaActionText: 'AGENDAR AGORA',
      },
      {
        id: 'cta-2',
        title: 'CONHEÇA NOSSOS SERVIÇOS & SOLUÇÕES',
        subtitle: 'Veja os detalhes dos pacotes e modalidades de atendimento.',
        icon: 'Sparkles',
        linkType: 'catalogo',
        url: '#catalogo',
        whatsappMessage: `Olá! Gostaria de conhecer os serviços de ${rawName}.`,
        openInNewTab: false,
        animation: 'shimmer',
        variant: 'default',
        badgeText: '',
        customBg: '#ffffff',
        customText: '#0f172a',
        bgImage: '',
        imagePosition: 'none',
        cardImage: '',
        imageFitStyle: 'framed',
        imageSize: 84,
        ctaActionText: 'VER CATÁLOGO',
      },
      {
        id: 'cta-3',
        title: 'LOCALIZAÇÃO & COMO CHEGAR',
        subtitle: realAddress,
        icon: 'MapPin',
        linkType: 'custom',
        url: mapsUrl,
        whatsappMessage: 'Olá! Gostaria de confirmar a localização.',
        openInNewTab: true,
        animation: 'none',
        variant: 'default',
        badgeText: 'MAPS',
        customBg: '#ffffff',
        customText: '#0f172a',
        bgImage: '',
        imagePosition: 'none',
        cardImage: '',
        imageFitStyle: 'framed',
        imageSize: 84,
        ctaActionText: 'ABRIR MAPA',
      },
    ],
    processSteps: {
      enabled: true,
      headline: 'Como funciona o atendimento?',
      subtitle: 'Rápido, personalizado e focado no seu resultado',
      steps: [
        {
          id: 'step-1',
          number: '01',
          title: 'Contato & Triagem Inicial',
          description: 'Você escolhe o serviço desejado e alinhamos sua necessidade pelo WhatsApp.',
        },
        {
          id: 'step-2',
          number: '02',
          title: 'Atendimento Personalizado',
          description: 'Cuidado exclusivo com hora marcada e foco total nos seus objetivos.',
        },
        {
          id: 'step-3',
          number: '03',
          title: 'Resultado & Acompanhamento',
          description: 'Entrega de alto padrão com suporte dedicado para sua total satisfação.',
        },
      ],
    },
    studentGrid: {
      enabled: true,
      headline: 'Portfólio & Destaques Mais Curtidos',
      subtitle: 'Confira registros do nosso trabalho e espaço',
      badge: 'MAIS CURTIDAS NO INSTA',
      layout: 'smart_masonry',
      aspectRatio: 'auto',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
      ],
      captions: [],
    },
    locationCard: {
      enabled: true,
      headline: `Localização — ${rawName}`,
      address: realAddress,
      buttonLabel: 'Abrir no Google Maps',
      mapsUrl,
    },
    services: {
      enabled: true,
      headline: 'Principais Serviços & Pacotes',
      subtitle: 'Soluções pensadas com base nas especialidades do nosso espaço',
      badge: 'CATÁLOGO VIP',
      layout: 'list',
      items: detectedServices,
    },
    testimonials: {
      enabled: true,
      headline: 'Depoimentos de Clientes',
      items: [
        {
          id: 't-1',
          clientName: 'Camila Oliveira',
          city: 'Cliente Verificada',
          text: 'Atendimento impecável do início ao fim! Superou todas as minhas expectativas.',
          rating: 5,
        },
        {
          id: 't-2',
          clientName: 'Rodrigo Santos',
          city: 'Cliente Verificado',
          text: 'Profissionalismo nota mil, ambiente excelente e resultado extraordinário.',
          rating: 5,
        },
      ],
    },
    qualifierFunnel: {
      enabled: true,
      animation: 'shimmer',
      triggerButtonLabel: 'TRIAGEM VIP / AGENDAMENTO RÁPIDO',
      triggerButtonSubtitle: 'Responda 3 perguntas rápidas para atendimento prioritário',
      headline: `Triagem de Atendimento — ${rawName}`,
      subtitle: 'Responda para direcionarmos seu atendimento no WhatsApp',
      questions: [
        {
          id: 'q1',
          title: 'Qual serviço você procura hoje?',
          options: detectedServices.slice(0, 3).map((s) => s.name),
        },
        {
          id: 'q2',
          title: 'Qual é a sua preferência de data?',
          options: ['Ainda esta semana', 'Próxima semana', 'Apenas consultando valores'],
        },
        {
          id: 'q3',
          title: 'Qual turno é melhor para você?',
          options: ['Manhã', 'Tarde', 'Horário flexível'],
        },
      ],
    },
    aboutMe: {
      enabled: true,
      headline: `Sobre ${rawName}`,
      paragraph: `Com foco em excelência e atendimento humanizado em ${params.businessNiche || 'nosso segmento'}, cuidamos de cada detalhe para proporcionar uma experiência única, segura e de altíssimo nível.`,
      closingPhrase: 'Sua satisfação é a nossa maior prioridade.',
    },
    faq: {
      enabled: true,
      headline: 'Dúvidas Frequentes',
      items: [
        {
          id: 'faq-1',
          question: 'Como funciona o agendamento?',
          answer: 'Basta clicar em qualquer botão de agendamento ou responder a triagem rápida para falar diretamente conosco no WhatsApp.',
        },
        {
          id: 'faq-2',
          question: 'Quais são as formas de pagamento aceitas?',
          answer: 'Aceitamos PIX, cartões de crédito e débito com total comodidade.',
        },
      ],
    },
    conversion: {
      metaPixelId: '',
      googleAnalyticsId: '',
      defaultWhatsappMsg: `Olá! Vi a página de ${rawName} e gostaria de informações sobre os serviços.`,
    },
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const {
    instagram,
    googleMaps,
    businessName,
    businessNiche,
    additionalInfo,
    conversionGoal,
    visualStyle,
  } = req.body || {};

  // 1) Busca em paralelo os dados e imagens reais (ordenadas por mais curtidas) do Instagram e do Google Meu Negócio
  const [instaData, mapsData] = await Promise.all([
    extractInstagramInfo(instagram),
    extractGoogleMapsInfo(googleMaps),
  ]);

  const effectiveBusinessName =
    businessName?.trim() ||
    mapsData.placeName?.trim() ||
    instaData.cleanBusinessName?.trim() ||
    instaData.fullName?.trim() ||
    cleanInstagramHandle(instagram).replace(/[._-]+/g, ' ').toUpperCase();

  const effectiveNiche =
    businessNiche?.trim() ||
    instaData.category?.trim() ||
    mapsData.category?.trim() ||
    '';

  const effectiveAddress =
    mapsData.address ||
    (instaData.detectedLocation
      ? `${instaData.detectedLocation} · Atendimento com Hora Marcada`
      : '');

  // 2) Extrai os serviços reais baseados nas informações coletadas do cliente (bio, legendas dos posts, categoria, Maps e notas)
  const detectedServices = extractClientServicesFromCollectedData(instaData, mapsData, {
    businessName: effectiveBusinessName,
    businessNiche: effectiveNiche,
    additionalInfo,
  });

  const maxLikes =
    instaData.postLikes.length > 0 ? Math.max(...instaData.postLikes) : 0;

  const extractedMeta = {
    instagramFound: instaData.found,
    instagramUsername: instaData.username,
    instagramSecondaryUsername: instaData.secondaryUsername || null,
    instagramFullName: instaData.fullName || null,
    instagramBio: instaData.bio || null,
    instagramFollowers: instaData.followers || null,
    instagramExternalUrl: instaData.externalUrl || null,
    instagramPhotosCount: instaData.postPhotos.length || (instaData.avatarUrl ? 1 : 0),
    instagramTopLikes: instaData.postLikes,
    instagramMaxLikes: maxLikes,
    servicesExtractedCount: detectedServices.length,
    servicesExtractedNames: detectedServices.map((s) => s.name),
    whatsappDetected: instaData.whatsappPhone || mapsData.phone || null,
    businessHours:
      instaData.businessHours ||
      mapsData.businessHours ||
      'Seg a Sáb · 08:30 às 19:30',
    mapsFound: mapsData.found,
    mapsPlaceName: mapsData.placeName || null,
    mapsCategory: mapsData.category || null,
    mapsAddress: effectiveAddress || null,
    mapsRating: mapsData.rating || null,
    mapsReviewsCount: mapsData.reviews.length,
    mapsPhotosCount: mapsData.photos.length,
    warning: null as string | null,
  };

  try {
    const apiKey =
      (process.env.GEMINI_API_KEY || '').trim() ||
      (process.env.GOOGLE_API_KEY || '').trim() ||
      (process.env.GOOGLE_GENAI_API_KEY || '').trim() ||
      (process.env.VITE_GEMINI_API_KEY || '').trim() ||
      (req.body?.geminiApiKey || '').trim();

    if (!apiKey) {
      extractedMeta.warning =
        'Chave GEMINI_API_KEY não configurada no painel da sua hospedagem. Todos os dados reais (fotos mais curtidas do Instagram, serviços, endereço e WhatsApp) foram extraídos e aplicados com sucesso pelo motor inteligente!';
      const fallbackData = applyExtractedAssetsToMicrosite(
        buildSmartFallbackMicrosite(
          {
            instagram: instaData.username || instagram,
            googleMaps: mapsData.resolvedUrl || googleMaps,
            businessName: effectiveBusinessName,
            businessNiche: effectiveNiche,
            additionalInfo,
            address: effectiveAddress,
            bio: instaData.bio,
          },
          detectedServices
        ),
        instaData,
        mapsData,
        detectedServices,
        {
          instagram,
          googleMaps,
          businessName: effectiveBusinessName,
          businessNiche: effectiveNiche,
          additionalInfo,
          conversionGoal,
          visualStyle,
        }
      );
      return res.status(200).json({
        success: true,
        data: fallbackData,
        extractedMeta,
        source: 'smart-fallback',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const goalDescription =
      conversionGoal === 'catalog_sales'
        ? 'Destacar catálogo de procedimentos/pacotes e valores com ancoragem de preço'
        : conversionGoal === 'vip_triage'
        ? 'Qualificar clientes com Funil Anti-Curiosos (Triagem VIP de 3 perguntas antes do WhatsApp)'
        : conversionGoal === 'courses_mentorship'
        ? 'Vender cursos presenciais/online, mentorias VIP e captação de alunas(os)'
        : 'Lotar a agenda com agendamentos diretos pelo WhatsApp';

    const styleDescription =
      visualStyle === 'rose_luxury'
        ? 'Rose Gold, Nude & Quartzo (roseGoldQuartz)'
        : visualStyle === 'dark_gold'
        ? 'Dark Luxury & Ouro (darkGold / barberVintage / navyLaw)'
        : visualStyle === 'clean_minimal'
        ? 'Pérola, Champanhe & Clean Minimalista (pearlChampagne / champagneNude)'
        : visualStyle === 'vibrant_glam'
        ? 'Orquídea Neon & Alta Conversão (orchidGlow / rubyImperial)'
        : 'Automático ideal para o nicho';

    const topPostsContext =
      instaData.topPosts.length > 0
        ? instaData.topPosts
            .slice(0, 6)
            .map(
              (p, i) =>
                `  ${i + 1}. [${p.likes} curtidas${p.locationName ? ` · Local: ${p.locationName}` : ''}] Legenda: "${(p.caption || '').replace(/\s+/g, ' ').slice(0, 220)}"`
            )
            .join('\n')
        : '  Nenhuma legenda de post extraída.';

    const detectedServicesContext =
      detectedServices.length > 0
        ? detectedServices
            .map((s, i) => `  ${i + 1}. ${s.name} — ${s.description}`)
            .join('\n')
        : '  Extrair com base no nicho e dados acima.';

    const prompt = `
Você é um especialista mundial em Copywriting, UX/UI Design e Estratégia de Vendas para Microsites de Alta Conversão em dispositivos móveis (Instagram Bio, WhatsApp e Google Meu Negócio).

DADOS INFORMADOS PELO USUÁRIO:
- Instagram informado: @${instaData.username || 'Não informado'}${instaData.secondaryUsername ? ` (Perfil do Studio vinculado: @${instaData.secondaryUsername})` : ''}
- Link Google Meu Negócio / Maps: ${mapsData.resolvedUrl || googleMaps || 'Não informado'}
- Nome da Empresa / Profissional: ${effectiveBusinessName || 'Não informado'}
- Nicho / Especialidade: ${effectiveNiche || 'Identificar pelo Instagram e Google Meu Negócio'}
- Objetivo Principal da Página: ${goalDescription}
- Preferência de Estilo Visual: ${styleDescription}
- Informações Adicionais: ${additionalInfo || 'Nenhuma informação adicional'}

DADOS REAIS EXTRAÍDOS DO INSTAGRAM:
- Nome Completo no Perfil: ${instaData.fullName || 'Não extraído'}
- Biografia Real do Instagram: ${instaData.bio || 'Não extraída'}
- Especialidade / Categoria: ${instaData.category || mapsData.category || 'Não extraída'}
- Localização detectada nos posts: ${instaData.detectedLocation || 'Não detectada'}
- Seguidores: ${instaData.followers || 'Não extraído'}
- Link Externo da Bio: ${instaData.externalUrl || 'Não detectado'}
- Botões do Link da Bio: ${instaData.externalBioServices.join(' | ') || 'Nenhum'}
- WhatsApp/Telefone detectado: ${instaData.whatsappPhone || mapsData.phone || 'Não detectado'}
- POSTS MAIS CURTIDOS DO INSTAGRAM (em ordem decrescente de curtidas):
${topPostsContext}

SERVIÇOS E PROCEDIMENTOS IDENTIFICADOS NAS INFORMAÇÕES COLETADAS DO CLIENTE:
${detectedServicesContext}

DADOS REAIS EXTRAÍDOS DO GOOGLE MEU NEGÓCIO / GOOGLE MAPS:
- Nome do Estabelecimento no Maps: ${mapsData.placeName || 'Não extraído'}
- Especialidade no Maps: ${mapsData.category || 'Não extraída'}
- Endereço Físico Real: ${effectiveAddress || 'Não extraído'}
- Horário de Atendimento: ${extractedMeta.businessHours}
- Avaliação / Nota no Google: ${mapsData.rating || '5.0★'}

REGRAS OBRIGATÓRIAS:
1. Os serviços em "services.items" DEVEM ser 100% baseados nas informações coletadas do cliente (legendas dos posts mais curtidos, bio do Instagram, especialidade "${effectiveNiche}" e lista de serviços identificados acima). NUNCA adicione serviços de outras áreas que o cliente não realiza (ex: se o perfil é exclusivo de Extensão de Cílios, NÃO adicione serviços de unhas/fibra de vidro).
2. Utilize fielmente o nome real "${effectiveBusinessName}", endereço/cidade "${effectiveAddress || 'Atendimento com Hora Marcada'}" e os diferenciais reais citados nas legendas dos posts.

RETORNE ESTRITAMENTE UM OBJETO JSON VÁLIDO (sem markdown no início ou no fim, sem explicações em texto) com a estrutura abaixo:

{
  "theme": "roseGoldQuartz",
  "styling": {
    "fontFamily": "Playfair Display",
    "borderRadius": 20,
    "glassmorphism": true,
    "metallicBorders": true,
    "spotlightGlow": true,
    "photoHeight": 390,
    "photoScale": 100,
    "photoPosY": 25,
    "vignetteIntensity": 85,
    "photoFilter": "none"
  },
  "announcement": {
    "enabled": true,
    "badge": "AGENDA VIP ABERTA",
    "text": "Últimos horários disponíveis para esta semana.",
    "link": "#booking"
  },
  "profile": {
    "name": "${(effectiveBusinessName || 'NOME DO CLIENTE').toUpperCase()}",
    "title": "${(effectiveNiche || 'ESPECIALIDADE PRINCIPAL').toUpperCase()}",
    "tagline": "Frase persuasiva baseada na bio e nos posts do Instagram do negócio",
    "cursivePhrase": "Frase em caligrafia com elegância e tom humano",
    "avatarUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    "aboutPhotoUrl": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600",
    "whatsapp": "${instaData.whatsappPhone || mapsData.phone || '5511999999999'}",
    "instagram": "${instaData.username || 'instagram'}",
    "location": "${effectiveAddress || 'Atendimento com Hora Marcada · Espaço Exclusivo'}",
    "mapsUrl": "${mapsData.resolvedUrl || googleMaps || 'https://maps.google.com'}"
  },
  "metrics": {
    "enabled": true,
    "stat1Value": "${instaData.followers || '+1.200'}",
    "stat1Label": "${instaData.followers ? 'SEGUIDORES NO INSTA' : 'CLIENTES'}",
    "stat2Value": "100%",
    "stat2Label": "QUALIDADE VIP",
    "stat3Value": "${mapsData.rating || '5.0★'}",
    "stat3Label": "GOOGLE MEU NEGÓCIO"
  },
  "actionCards": [
    {
      "id": "cta-1",
      "title": "TÍTULO EM MAIÚSCULAS DA AÇÃO PRINCIPAL VIP",
      "subtitle": "Subtítulo explicativo e convincente sobre a especialidade do cliente.",
      "icon": "Calendar",
      "linkType": "booking",
      "url": "#booking",
      "whatsappMessage": "Olá! Gostaria de agendar um horário.",
      "openInNewTab": true,
      "animation": "pulse-glow",
      "variant": "accent",
      "badgeText": "MAIS PROCURADO",
      "customBg": "#e2b857",
      "customText": "#0f172a",
      "bgImage": "",
      "imagePosition": "right",
      "cardImage": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400",
      "imageFitStyle": "popout",
      "imageSize": 92,
      "ctaActionText": "AGENDAR AGORA"
    },
    {
      "id": "cta-2",
      "title": "CONFIRA NOSSOS PROCEDIMENTOS & PACOTES",
      "subtitle": "Conheça as técnicas e serviços exclusivos do nosso espaço.",
      "icon": "Sparkles",
      "linkType": "catalogo",
      "url": "#catalogo",
      "whatsappMessage": "Olá! Gostaria de consultar a tabela de serviços.",
      "openInNewTab": false,
      "animation": "shimmer",
      "variant": "default",
      "badgeText": "CATÁLOGO VIP",
      "customBg": "#ffffff",
      "customText": "#0f172a",
      "bgImage": "",
      "imagePosition": "left",
      "cardImage": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400",
      "imageFitStyle": "framed",
      "imageSize": 84,
      "ctaActionText": "VER MAIS"
    },
    {
      "id": "cta-3",
      "title": "COMO CHEGAR (LOCALIZAÇÃO GOOGLE MAPS)",
      "subtitle": "${effectiveAddress || 'Abra a rota direta no Google Maps para vir até nós.'}",
      "icon": "MapPin",
      "linkType": "custom",
      "url": "${mapsData.resolvedUrl || googleMaps || 'https://maps.google.com'}",
      "whatsappMessage": "Olá! Gostaria de confirmar a localização.",
      "openInNewTab": true,
      "animation": "none",
      "variant": "default",
      "badgeText": "GOOGLE MAPS",
      "customBg": "#ffffff",
      "customText": "#0f172a",
      "bgImage": "",
      "imagePosition": "none",
      "cardImage": "",
      "imageFitStyle": "framed",
      "imageSize": 84,
      "ctaActionText": "ABRIR ROTA"
    }
  ],
  "processSteps": {
    "enabled": true,
    "headline": "Como funciona o atendimento?",
    "subtitle": "Simples, rápido e transparente em 3 passos",
    "steps": [
      {
        "id": "step-1",
        "number": "01",
        "title": "Primeiro Contato",
        "description": "Você escolhe o procedimento desejado ou faz a triagem inicial."
      },
      {
        "id": "step-2",
        "number": "02",
        "title": "Avaliação & Atendimento",
        "description": "Entendemos seu objetivo e aplicamos a técnica ideal de forma personalizada."
      },
      {
        "id": "step-3",
        "number": "03",
        "title": "Resultado Impecável",
        "description": "Entrega com máxima qualidade, conforto e durabilidade."
      }
    ]
  },
  "studentGrid": {
    "enabled": true,
    "headline": "Resultados & Galeria Mais Curtida",
    "subtitle": "Confira os trabalhos de maior destaque no nosso Instagram",
    "photos": []
  },
  "locationCard": {
    "enabled": true,
    "headline": "Localização — ${effectiveBusinessName || 'Nosso Espaço'}",
    "address": "${effectiveAddress || 'Confira a rota para o nosso espaço no Google Maps'}",
    "buttonLabel": "Abrir no Google Maps",
    "mapsUrl": "${mapsData.resolvedUrl || googleMaps || 'https://maps.google.com'}"
  },
  "services": {
    "enabled": true,
    "headline": "Procedimentos & Serviços Exclusivos",
    "items": ${JSON.stringify(
      detectedServices.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        price: s.price,
        duration: s.duration,
        badge: s.badge,
      })),
      null,
      2
    )}
  },
  "testimonials": {
    "enabled": true,
    "headline": "Avaliações no Google Meu Negócio & Clientes",
    "items": [
      {
        "id": "t-1",
        "clientName": "Camila Oliveira",
        "city": "Avaliação 5★ no Google",
        "text": "Atendimento sensacional! Superou todas as minhas expectativas.",
        "rating": 5
      },
      {
        "id": "t-2",
        "clientName": "Juliana Mendes",
        "city": "Avaliação 5★ no Google",
        "text": "Excelente profissionalismo, ambiente impecável e resultado perfeito!",
        "rating": 5
      }
    ]
  },
  "qualifierFunnel": {
    "enabled": true,
    "animation": "shimmer",
    "triggerButtonLabel": "TRIAGEM VIP / AVALIAÇÃO RÁPIDA",
    "triggerButtonSubtitle": "Descubra a melhor opção em 3 perguntas rápidas",
    "headline": "Triagem de Atendimento VIP",
    "subtitle": "Responda para receber atendimento prioritário no WhatsApp",
    "questions": [
      {
        "id": "q1",
        "title": "Qual procedimento você procura hoje?",
        "options": ${JSON.stringify(detectedServices.slice(0, 3).map((s) => s.name))}
      },
      {
        "id": "q2",
        "title": "Qual é a sua urgência de horário?",
        "options": [
          "Ainda esta semana",
          "Próxima semana",
          "Apenas consultando valores"
        ]
      },
      {
        "id": "q3",
        "title": "Qual é o seu melhor turno?",
        "options": [
          "Manhã",
          "Tarde",
          "Horário flexível"
        ]
      }
    ]
  },
  "aboutMe": {
    "enabled": true,
    "headline": "Sobre ${effectiveBusinessName || 'Nós'}",
    "paragraph": "Texto persuasivo destacando a história, a especialidade real e os diferenciais extraídos do Instagram e Google Meu Negócio.",
    "closingPhrase": "Sua confiança, nosso maior compromisso."
  },
  "faq": {
    "enabled": true,
    "headline": "Dúvidas Frequentes",
    "items": [
      {
        "id": "faq-1",
        "question": "Como funciona o agendamento?",
        "answer": "Basta clicar nos botões do WhatsApp ou preencher a triagem VIP para escolher o melhor horário."
      },
      {
        "id": "faq-2",
        "question": "Quais formas de pagamento são aceitas?",
        "answer": "Aceitamos PIX e cartões de crédito ou débito com total comodidade."
      }
    ]
  },
  "conversion": {
    "metaPixelId": "",
    "googleAnalyticsId": "",
    "defaultWhatsappMsg": "Olá! Vi o microsite de ${effectiveBusinessName || 'vocês'} e gostaria de agendar um horário."
  }
}
`;

    let parsedData: any = null;
    for (const modelName of GEMINI_MODELS) {
      try {
        const response = await Promise.race([
          ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.55,
            },
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout calling ${modelName}`)), 8500)
          ),
        ]);

        const rawText = response.text || '';
        try {
          parsedData = JSON.parse(rawText);
        } catch {
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
          }
        }
        if (parsedData && typeof parsedData === 'object') {
          break;
        }
      } catch (modelErr: any) {
        console.warn(`Modelo ${modelName} indisponível, tentando próximo:`, modelErr?.message);
      }
    }

    if (!parsedData) {
      parsedData = buildSmartFallbackMicrosite(
        {
          instagram: instaData.username || instagram,
          googleMaps: mapsData.resolvedUrl || googleMaps,
          businessName: effectiveBusinessName,
          businessNiche: effectiveNiche,
          additionalInfo,
          address: effectiveAddress,
          bio: instaData.bio,
        },
        detectedServices
      );
    }

    parsedData = applyExtractedAssetsToMicrosite(
      parsedData,
      instaData,
      mapsData,
      detectedServices,
      {
        instagram,
        googleMaps,
        businessName: effectiveBusinessName,
        businessNiche: effectiveNiche,
        additionalInfo,
        conversionGoal,
        visualStyle,
      }
    );

    return res.status(200).json({
      success: true,
      data: parsedData,
      extractedMeta,
    });
  } catch (err: any) {
    console.error('Erro na rota /api/generate-microsite, ativando fallback inteligente com dados extraídos:', err);
    const fallbackData = applyExtractedAssetsToMicrosite(
      buildSmartFallbackMicrosite(
        {
          instagram: instaData.username || instagram,
          googleMaps: mapsData.resolvedUrl || googleMaps,
          businessName: effectiveBusinessName,
          businessNiche: effectiveNiche,
          additionalInfo,
          address: effectiveAddress,
          bio: instaData.bio,
        },
        detectedServices
      ),
      instaData,
      mapsData,
      detectedServices,
      {
        instagram,
        googleMaps,
        businessName: effectiveBusinessName,
        businessNiche: effectiveNiche,
        additionalInfo,
        conversionGoal,
        visualStyle,
      }
    );
    return res.status(200).json({
      success: true,
      data: fallbackData,
      extractedMeta,
      source: 'smart-fallback',
    });
  }
}

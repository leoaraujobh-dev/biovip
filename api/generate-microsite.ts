import { GoogleGenAI } from '@google/genai';

const GEMINI_MODELS = ['gemini-3-flash-preview', 'gemini-3.8-flash', 'gemini-flash-latest'];

interface ExtractedInstagramData {
  found: boolean;
  username: string;
  secondaryUsername?: string;
  fullName?: string;
  bio?: string;
  followers?: string;
  postsCount?: string;
  category?: string;
  whatsappPhone?: string;
  externalUrl?: string;
  avatarUrl?: string;
  postPhotos: string[];
  postCaptions: string[];
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
  description?: string;
  latitude?: number;
  longitude?: number;
  photos: string[];
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

function extractPhoneFromText(text: string): string | undefined {
  if (!text) return undefined;
  const waMatch = text.match(/wa\.me\/(\d{10,15})/i) || text.match(/phone=(\d{10,15})/i);
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

async function fetchImageAsDataUrl(url: string, timeoutMs = 4500): Promise<string | null> {
  if (!url || !url.startsWith('http')) return null;
  try {
    const cleanUrl = decodeHtmlEntities(url.replace(/\\u0026/g, '&').replace(/\\\//g, '/'));
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(cleanUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'TelegramBot (like TwitterBot)',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    if (!contentType.startsWith('image/')) return null;
    const arrayBuffer = await res.arrayBuffer();
    if (arrayBuffer.byteLength < 600 || arrayBuffer.byteLength > 4 * 1024 * 1024) return null;
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return `data:${contentType.split(';')[0]};base64,${base64}`;
  } catch {
    return null;
  }
}

function cleanInstagramHandle(input?: string): string {
  if (!input) return '';
  let str = input.trim();
  str = str.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '');
  str = str.split('/')[0].split('?')[0];
  str = str.replace(/^@/, '').trim();
  return str;
}

async function fetchInstagramHtmlMultiSocket(username: string): Promise<string | null> {
  if (!username) return null;
  const targetUrl = `https://www.instagram.com/${encodeURIComponent(username)}/`;

  // Dispara 6 conexões simultâneas para contornar IPs com rate-limit (302) e obter resposta 200 OK com OpenGraph completo
  for (let round = 0; round < 2; round++) {
    const sockets = Array.from({ length: 6 }, async () => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 3800);
        const res = await fetch(targetUrl, {
          redirect: 'manual',
          signal: controller.signal,
          headers: {
            'User-Agent': 'TelegramBot (like TwitterBot)',
          },
        });
        clearTimeout(timer);
        if (res.status === 200) {
          const text = await res.text();
          if (text.includes('og:title') || text.includes('og:image')) {
            return text;
          }
        }
      } catch {
        // Ignora falha individual do socket
      }
      return null;
    });

    const results = await Promise.all(sockets);
    const validHtml = results.find(Boolean);
    if (validHtml) return validHtml;
  }
  return null;
}

function parseInstagramMetaFromHtml(html: string): {
  fullName?: string;
  bio?: string;
  followers?: string;
  postsCount?: string;
  ogImage?: string;
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
  const mentionedHandles: string[] = [];

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

    // Extrai o texto exato da bio após 'on Instagram: "..."'
    const bioQuoteMatch = combinedDesc.match(/on Instagram:\s*"([\s\S]*)"$/i);
    if (bioQuoteMatch?.[1]) {
      bio = bioQuoteMatch[1].trim();
    } else if (!combinedDesc.includes('See Instagram photos and videos')) {
      const parts = combinedDesc.split(' - ');
      if (parts.length > 1) {
        bio = parts.slice(1).join(' - ').trim();
      }
    }

    // Extrai nome completo caso esteja antes de (@usuario) na meta description
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
  }

  const ogImage = ogImageRaw ? decodeHtmlEntities(ogImageRaw) : undefined;

  return {
    fullName,
    bio,
    followers,
    postsCount,
    ogImage,
    mentionedHandles,
  };
}

async function extractInstagramInfo(rawInstagram?: string): Promise<ExtractedInstagramData> {
  const username = cleanInstagramHandle(rawInstagram);
  const result: ExtractedInstagramData = {
    found: false,
    username,
    postPhotos: [],
    postCaptions: [],
  };

  if (!username) return result;

  const rawPhotoUrls: string[] = [];
  let rawAvatarUrl = '';

  // 1) Extrai HTML do perfil principal no Instagram usando múltiplos sockets simultâneos com TelegramBot UA
  const primaryHtml = await fetchInstagramHtmlMultiSocket(username);
  if (primaryHtml) {
    const parsed = parseInstagramMetaFromHtml(primaryHtml);
    if (parsed.fullName) {
      result.fullName = parsed.fullName;
      result.found = true;
    }
    if (parsed.bio) {
      result.bio = parsed.bio;
      result.found = true;
    }
    if (parsed.followers) {
      result.followers = parsed.followers;
    }
    if (parsed.postsCount) {
      result.postsCount = parsed.postsCount;
    }
    if (parsed.ogImage) {
      rawAvatarUrl = parsed.ogImage;
      result.found = true;
    }

    const phoneInBio = extractPhoneFromText(parsed.bio || '');
    if (phoneInBio) {
      result.whatsappPhone = phoneInBio;
    }

    // 2) Se a bio do perfil principal referencia um perfil profissional secundário (ex: "CEO: @studiolorrayneramos"), busca ele também!
    const secondaryHandle = parsed.mentionedHandles.find(
      (h) => h.toLowerCase() !== username.toLowerCase()
    );
    if (secondaryHandle) {
      result.secondaryUsername = secondaryHandle;
      const secondaryHtml = await fetchInstagramHtmlMultiSocket(secondaryHandle);
      if (secondaryHtml) {
        const secParsed = parseInstagramMetaFromHtml(secondaryHtml);
        if (secParsed.fullName) {
          // Ex: "STUDIO LORRAYNE RAMOS - EXTENSÃO DE CÍLIOS CONTAGEM"
          const titleParts = secParsed.fullName.split(' - ');
          if (titleParts.length >= 2) {
            result.fullName = titleParts[0].trim();
            result.category = titleParts.slice(1).join(' - ').trim();
          } else {
            result.fullName = secParsed.fullName;
          }
        }
        if (secParsed.bio) {
          result.bio = result.bio
            ? `${secParsed.bio} (${result.bio})`
            : secParsed.bio;
          const secPhone = extractPhoneFromText(secParsed.bio);
          if (secPhone && !result.whatsappPhone) {
            result.whatsappPhone = secPhone;
          }
        }
        if (secParsed.ogImage) {
          rawPhotoUrls.push(secParsed.ogImage);
        }
      }
    }
  }

  // 3) Tenta endpoint web_profile_info caso disponível para capturar fotos extras de posts
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const apiRes = await fetch(
      `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
      {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'x-ig-app-id': '936619743392459',
          Accept: '*/*',
          Referer: `https://www.instagram.com/${username}/`,
        },
      }
    );
    clearTimeout(timer);

    if (apiRes.ok) {
      const json: any = await apiRes.json();
      const user = json?.data?.user;
      if (user) {
        result.found = true;
        if (user.full_name && !result.fullName) result.fullName = user.full_name;
        if (user.biography && !result.bio) result.bio = user.biography;
        if ((user.category_name || user.business_category_name) && !result.category) {
          result.category = user.category_name || user.business_category_name;
        }
        if (!rawAvatarUrl) {
          rawAvatarUrl = user.profile_pic_url_hd || user.profile_pic_url || '';
        }
        const edges = user.edge_owner_to_timeline_media?.edges;
        if (Array.isArray(edges)) {
          for (const edge of edges.slice(0, 6)) {
            const node = edge?.node;
            const imgUrl = node?.display_url || node?.thumbnail_src;
            if (imgUrl && !rawPhotoUrls.includes(imgUrl)) rawPhotoUrls.push(imgUrl);
            const caption = node?.edge_media_to_caption?.edges?.[0]?.node?.text;
            if (caption) result.postCaptions.push(String(caption).slice(0, 240));
          }
        }
      }
    }
  } catch {
    // Segue com os dados já coletados
  }

  // 4) Converte avatar e fotos para Data URL (base64) para evitar bloqueio de CORS do CDN do Instagram no navegador
  if (rawAvatarUrl) {
    const avatarDataUrl = await fetchImageAsDataUrl(rawAvatarUrl);
    if (avatarDataUrl) {
      result.avatarUrl = avatarDataUrl;
      result.found = true;
    }
  }

  if (rawPhotoUrls.length > 0) {
    const converted = await Promise.all(
      rawPhotoUrls.slice(0, 6).map((u) => fetchImageAsDataUrl(u))
    );
    result.postPhotos = converted.filter((p): p is string => Boolean(p));
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
          'User-Agent': 'LuxeBioStudioPro/1.0 (https://luxebio.app)',
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
    const timer = setTimeout(() => controller.abort(), 5500);
    const res = await fetch(input, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-BR,pt;q=0.9',
      },
    });
    clearTimeout(timer);

    if (res.url) {
      result.resolvedUrl = res.url;
    }

    // 1) Extrai nome do estabelecimento e especialidade/endereço da URL resolvida (/maps/place/Nome/@lat,lng)
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

    // 2) Extrai coordenadas exatas do estabelecimento na URL do Google Maps (!3dLAT!4dLON ou @LAT,LON)
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

    // 3) Analisa HTML do Google Maps para fotos, nota e telefone
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
  } catch {
    // Mantém dados já resolvidos da URL
  }

  return result;
}

function applyExtractedAssetsToMicrosite(
  microsite: any,
  instaData: ExtractedInstagramData,
  mapsData: ExtractedGoogleMapsData,
  rawParams: {
    instagram?: string;
    googleMaps?: string;
    businessName?: string;
    businessNiche?: string;
  }
) {
  if (!microsite || typeof microsite !== 'object') return microsite;

  // Combina todas as fotos reais extraídas do Instagram (perfil + perfil secundário/posts) e Google Meu Negócio
  const allRealPhotos: string[] = [
    ...(instaData.avatarUrl ? [instaData.avatarUrl] : []),
    ...instaData.postPhotos,
    ...mapsData.photos,
  ].filter(Boolean);

  const primaryAvatar =
    instaData.avatarUrl ||
    instaData.postPhotos[0] ||
    mapsData.photos[0] ||
    microsite.profile?.avatarUrl;

  const secondaryPhoto =
    instaData.postPhotos[0] ||
    mapsData.photos[0] ||
    instaData.avatarUrl ||
    microsite.profile?.aboutPhotoUrl;

  if (!microsite.profile) microsite.profile = {};

  if (primaryAvatar) {
    microsite.profile.avatarUrl = primaryAvatar;
  }
  if (secondaryPhoto) {
    microsite.profile.aboutPhotoUrl = secondaryPhoto;
  }

  const resolvedBusinessName =
    rawParams.businessName?.trim() ||
    mapsData.placeName?.trim() ||
    instaData.fullName?.trim();
  if (resolvedBusinessName) {
    microsite.profile.name = resolvedBusinessName.toUpperCase();
  }

  if (instaData.username) {
    microsite.profile.instagram = instaData.username;
  }

  const realPhone = instaData.whatsappPhone || mapsData.phone;
  if (realPhone) {
    microsite.profile.whatsapp = realPhone;
  }

  const finalMapsUrl = mapsData.resolvedUrl || rawParams.googleMaps || microsite.profile.mapsUrl;
  if (finalMapsUrl) {
    microsite.profile.mapsUrl = finalMapsUrl;
    if (microsite.locationCard) {
      microsite.locationCard.mapsUrl = finalMapsUrl;
    }
  }

  if (mapsData.address) {
    microsite.profile.location = mapsData.address;
    if (microsite.locationCard) {
      microsite.locationCard.address = mapsData.address;
      if (resolvedBusinessName) {
        microsite.locationCard.headline = `Localização — ${resolvedBusinessName}`;
      }
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

  // Galeria de Fotos (studentGrid) com as fotos reais extraídas no topo
  if (allRealPhotos.length > 0) {
    if (!microsite.studentGrid) {
      microsite.studentGrid = {
        enabled: true,
        headline: 'Portfólio & Transformações Reais',
        subtitle: 'Confira registros do nosso Instagram e Google Meu Negócio',
        photos: [],
      };
    }
    const existingFallbacks = Array.isArray(microsite.studentGrid.photos)
      ? microsite.studentGrid.photos
      : [];
    const mergedPhotos: string[] = [...allRealPhotos];
    for (const fb of existingFallbacks) {
      if (mergedPhotos.length >= 6) break;
      if (!mergedPhotos.includes(fb)) mergedPhotos.push(fb);
    }
    microsite.studentGrid.photos = mergedPhotos.slice(0, 6);
  }

  // Aplica as fotos reais nos Action Cards e nos Serviços principais
  if (Array.isArray(microsite.actionCards) && allRealPhotos.length > 0) {
    if (microsite.actionCards[0]) {
      microsite.actionCards[0].cardImage = primaryAvatar || allRealPhotos[0];
    }
    if (microsite.actionCards[1]) {
      microsite.actionCards[1].cardImage = secondaryPhoto || allRealPhotos[0];
    }
    if (microsite.actionCards[2] && mapsData.address) {
      microsite.actionCards[2].subtitle = mapsData.address;
      microsite.actionCards[2].url = finalMapsUrl;
    }
  }

  if (Array.isArray(microsite.services?.items) && allRealPhotos.length > 0) {
    microsite.services.items = microsite.services.items.map((item: any, idx: number) => ({
      ...item,
      imageUrl: allRealPhotos[idx % allRealPhotos.length] || item.imageUrl,
    }));
  }

  return microsite;
}

function buildSmartFallbackMicrosite(params: {
  instagram?: string;
  googleMaps?: string;
  businessName?: string;
  businessNiche?: string;
  additionalInfo?: string;
  address?: string;
  bio?: string;
}) {
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
    const hasLash = /c[ií]lio|lash/.test(nicheRaw);
    const hasNail = /unha|nail|fibra|gel|manicure/.test(nicheRaw);
    const specialtyTitle =
      hasLash && hasNail
        ? 'EXTENSÃO DE CÍLIOS & NAIL DESIGNER DE ALTO PADRÃO'
        : hasLash
        ? 'ESPECIALISTA EM EXTENSÃO DE CÍLIOS & LASH DESIGN'
        : hasNail
        ? 'NAIL DESIGNER & ALONGAMENTO DE LUXO'
        : (params.businessNiche || 'BELEZA, ESTÉTICA & AUTOESTIMA').toUpperCase();

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
        text: 'Últimos horários da semana para cílios e unhas. Reserve agora!',
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
          subtitle: 'Garanta seu procedimento de Cílios ou Unhas com atendimento exclusivo.',
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
          subtitle: 'Confira nossas técnicas de Extensão de Cílios, Nail Design e Combos.',
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
        subtitle: 'Mapeamento individual, proporção e leveza em 3 passos',
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
            description: 'Analisamos o formato do seu olhar e das suas mãos para um resultado harmônico, leve e sofisticado.',
          },
          {
            id: 'step-3',
            number: '03',
            title: 'Acabamento Premium & Alta Durabilidade',
            description: 'Você sai pronta, confiante e com orientações completas para máxima retenção e brilho.',
          },
        ],
      },
      studentGrid: {
        enabled: true,
        headline: 'Portfólio & Transformações Reais',
        subtitle: 'Confira resultados impecáveis de nossas clientes no studio',
        badge: 'RESULTADOS REAIS',
        layout: 'grid3',
        aspectRatio: 'square',
        enableLightbox: true,
        photos: [
          'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
        ],
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
        items: [
          {
            id: 'srv-1',
            name: 'Extensão de Cílios (Mapeamento Individual / Volume Brasileiro / Fox Eyes)',
            description: 'Mapeamento personalizado para destacar seu olhar com proporção, leveza e alta retenção.',
            price: 'R$ 180',
            oldPrice: 'R$ 220',
            duration: '1h45',
            badge: 'MAIS PEDIDO',
            ctaLabel: 'Agendar',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-2',
            name: 'Alongamento em Fibra de Vidro / Banho de Gel Slim',
            description: 'Unhas resistentes, curvatura natural impecável e acabamento espelhado de longa duração.',
            price: 'R$ 190',
            oldPrice: 'R$ 230',
            duration: '2h00',
            badge: 'NAIL LUXURY',
            ctaLabel: 'Agendar',
            actionType: 'booking',
            featured: true,
            imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300',
          },
          {
            id: 'srv-3',
            name: 'Combo VIP: Extensão de Cílios + Nail Design Completo',
            description: 'Transformação completa em uma sessão especial com condição exclusiva.',
            price: 'R$ 330',
            oldPrice: 'R$ 410',
            duration: '3h15',
            badge: 'COMBO ESPECIAL',
            ctaLabel: 'Reservar Combo',
            actionType: 'booking',
            featured: false,
            imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=300',
          },
        ],
      },
      testimonials: {
        enabled: true,
        headline: 'Avaliações no Google Meu Negócio & Clientes',
        items: [
          {
            id: 't-1',
            clientName: 'Mariana Costa',
            city: 'Avaliação 5★ no Google',
            text: `Simplesmente apaixonada pelo atendimento no ${rawName}! Meus cílios e minhas unhas ficaram perfeitos, muita leveza e durabilidade incrível.`,
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
            options: [
              'Extensão de Cílios (Aplicação ou Manutenção)',
              'Nail Design / Alongamento ou Esmaltação em Gel',
              'Combo Completo (Cílios + Unhas)',
            ],
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
        paragraph: `Referência em ${params.businessNiche || 'Extensão de Cílios e Nail Design'}${params.address ? ` (${params.address})` : ''}, nosso studio nasceu com a missão de entregar o cuidado que você merece: mapeamento individual, proporção, leveza e materiais de excelência para valorizar sua beleza única.`,
        closingPhrase: 'Beleza, autocuidado e excelência em cada atendimento.',
      },
      faq: {
        enabled: true,
        headline: 'Dúvidas Frequentes',
        items: [
          {
            id: 'faq-1',
            question: 'Qual é a durabilidade da extensão de cílios e do alongamento de unhas?',
            answer: 'Trabalhamos com mapeamento individual e produtos premium de alta retenção. Recomendamos manutenção entre 15 e 25 dias para manter o resultado sempre impecável.',
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
      headline: 'Portfólio & Estrutura',
      subtitle: 'Confira registros do nosso trabalho e espaço',
      badge: 'DESTAQUES',
      layout: 'grid3',
      aspectRatio: 'square',
      enableLightbox: true,
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
      ],
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
      subtitle: 'Soluções pensadas para oferecer a melhor experiência',
      badge: 'CATÁLOGO VIP',
      layout: 'list',
      items: [
        {
          id: 'srv-1',
          name: `Atendimento Principal — ${params.businessNiche || 'Especialidade VIP'}`,
          description: 'Serviço completo realizado com materiais e técnicas de alto padrão.',
          price: 'Sob Consulta',
          oldPrice: '',
          duration: '1h00',
          badge: 'DESTAQUE',
          ctaLabel: 'Reservar',
          actionType: 'booking',
          featured: true,
          imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=300',
        },
        {
          id: 'srv-2',
          name: 'Pacote Premium Personalizado',
          description: 'Experiência completa com acompanhamento exclusivo e prioridade na agenda.',
          price: 'Condição Especial',
          oldPrice: '',
          duration: '1h30',
          badge: 'VIP',
          ctaLabel: 'Consultar',
          actionType: 'booking',
          featured: false,
          imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=300',
        },
      ],
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
          title: 'Qual é o seu objetivo principal hoje?',
          options: [
            'Agendar um horário / procedimento',
            'Solicitar orçamento personalizado',
            'Tirar dúvidas sobre serviços',
          ],
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

  const { instagram, googleMaps, businessName, businessNiche, additionalInfo } = req.body || {};

  // 1) Busca em paralelo os dados e imagens reais do Instagram e do Google Meu Negócio
  const [instaData, mapsData] = await Promise.all([
    extractInstagramInfo(instagram),
    extractGoogleMapsInfo(googleMaps),
  ]);

  const effectiveBusinessName =
    businessName?.trim() ||
    mapsData.placeName?.trim() ||
    instaData.fullName?.trim() ||
    cleanInstagramHandle(instagram).replace(/[._-]+/g, ' ').toUpperCase();

  const effectiveNiche =
    businessNiche?.trim() ||
    mapsData.category?.trim() ||
    instaData.category?.trim() ||
    '';

  const extractedMeta = {
    instagramFound: instaData.found,
    instagramUsername: instaData.username,
    instagramSecondaryUsername: instaData.secondaryUsername || null,
    instagramFullName: instaData.fullName || null,
    instagramBio: instaData.bio || null,
    instagramFollowers: instaData.followers || null,
    instagramPhotosCount: (instaData.avatarUrl ? 1 : 0) + instaData.postPhotos.length,
    mapsFound: mapsData.found,
    mapsPlaceName: mapsData.placeName || null,
    mapsCategory: mapsData.category || null,
    mapsAddress: mapsData.address || null,
    mapsRating: mapsData.rating || null,
    mapsPhotosCount: mapsData.photos.length,
  };

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallbackData = applyExtractedAssetsToMicrosite(
        buildSmartFallbackMicrosite({
          instagram: instaData.username || instagram,
          googleMaps: mapsData.resolvedUrl || googleMaps,
          businessName: effectiveBusinessName,
          businessNiche: effectiveNiche,
          additionalInfo,
          address: mapsData.address,
          bio: instaData.bio,
        }),
        instaData,
        mapsData,
        { instagram, googleMaps, businessName: effectiveBusinessName, businessNiche: effectiveNiche }
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

    const prompt = `
Você é um especialista mundial em Copywriting, UX/UI Design e Estratégia de Vendas para Microsites de Alta Conversão em dispositivos móveis (Instagram Bio, WhatsApp e Google Meu Negócio).

DADOS INFORMADOS PELO USUÁRIO:
- Instagram informado: @${instaData.username || 'Não informado'}${instaData.secondaryUsername ? ` (Perfil do Studio vinculado: @${instaData.secondaryUsername})` : ''}
- Link Google Meu Negócio / Maps: ${mapsData.resolvedUrl || googleMaps || 'Não informado'}
- Nome da Empresa / Profissional: ${effectiveBusinessName || 'Não informado'}
- Nicho / Especialidade: ${effectiveNiche || 'Identificar pelo Instagram e Google Meu Negócio'}
- Informações Adicionais: ${additionalInfo || 'Nenhuma informação adicional'}

DADOS REAIS EXTRAÍDOS DO INSTAGRAM:
- Nome no Perfil: ${instaData.fullName || 'Não extraído'}
- Biografia Real do Instagram: ${instaData.bio || 'Não extraída'}
- Especialidade / Categoria: ${instaData.category || mapsData.category || 'Não extraída'}
- Seguidores: ${instaData.followers || 'Não extraído'}
- WhatsApp/Telefone detectado: ${instaData.whatsappPhone || mapsData.phone || 'Não detectado'}

DADOS REAIS EXTRAÍDOS DO GOOGLE MEU NEGÓCIO / GOOGLE MAPS:
- Nome do Estabelecimento no Maps: ${mapsData.placeName || 'Não extraído'}
- Especialidade no Maps: ${mapsData.category || 'Não extraída'}
- Endereço Físico Real (Rua, Bairro, Cidade/UF, CEP): ${mapsData.address || 'Não extraído'}
- Avaliação / Nota no Google: ${mapsData.rating || '5.0★'}

OBJETIVO:
Gere a estrutura completa do microsite de alta conversão para este cliente em Português do Brasil, utilizando fielmente os DADOS REAIS extraídos do Instagram e do Google Meu Negócio (nome real "${effectiveBusinessName}", bio real "${instaData.bio || ''}", endereço real "${mapsData.address || ''}", serviços reais de ${effectiveNiche || 'sua área'}).
Escolha o melhor tema visual dentre os disponíveis (ex: para extensão de cílios / nail designer / estética feminina prefira roseGoldQuartz, pinkGlam, pearlChampagne, darkGold ou orchidGlow; para barbearia prefira barberVintage ou barberRoyal; para advocacia prefira navyLaw ou bordeauxExecutive).

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
    "tagline": "Frase persuasiva baseada na bio do Instagram e diferenciais do negócio",
    "cursivePhrase": "Frase em caligrafia com elegância e tom humano",
    "avatarUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    "aboutPhotoUrl": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600",
    "whatsapp": "${instaData.whatsappPhone || mapsData.phone || '5511999999999'}",
    "instagram": "${instaData.username || 'instagram'}",
    "location": "${mapsData.address || 'Atendimento com Hora Marcada · Espaço Exclusivo'}",
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
      "subtitle": "Subtítulo explicativo e convincente.",
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
      "title": "CONFIRA NOSSOS SERVIÇOS & PACOTES",
      "subtitle": "Conheça o catálogo completo com valores e detalhes.",
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
      "subtitle": "${mapsData.address || 'Abra a rota direta no Google Maps para vir até nós.'}",
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
        "description": "Você nos envia uma mensagem ou faz a triagem inicial."
      },
      {
        "id": "step-2",
        "number": "02",
        "title": "Avaliação & Procedimento",
        "description": "Entendemos seu objetivo e aplicamos a melhor técnica."
      },
      {
        "id": "step-3",
        "number": "03",
        "title": "Resultado Impecável",
        "description": "Realização do serviço com máxima qualidade e durabilidade."
      }
    ]
  },
  "studentGrid": {
    "enabled": true,
    "headline": "Resultados & Galeria do Trabalho",
    "subtitle": "Confira transformações reais das nossas clientes",
    "photos": [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "locationCard": {
    "enabled": true,
    "headline": "Localização — ${effectiveBusinessName || 'Nosso Espaço'}",
    "address": "${mapsData.address || 'Confira a rota para o nosso espaço no Google Maps'}",
    "buttonLabel": "Abrir no Google Maps",
    "mapsUrl": "${mapsData.resolvedUrl || googleMaps || 'https://maps.google.com'}"
  },
  "services": {
    "enabled": true,
    "headline": "Principais Serviços & Tabela",
    "items": [
      {
        "id": "srv-1",
        "name": "Serviço Principal 1",
        "description": "Descrição persuasiva do serviço.",
        "price": "R$ 180",
        "duration": "1h30",
        "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300"
      },
      {
        "id": "srv-2",
        "name": "Serviço Principal 2",
        "description": "Descrição persuasiva do segundo serviço.",
        "price": "R$ 220",
        "duration": "2h00",
        "imageUrl": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=300"
      }
    ]
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
        "options": [
          "Opção 1 do nicho",
          "Opção 2 do nicho",
          "Combo ou avaliação personalizada"
        ]
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
    "paragraph": "Texto persuasivo destacando a história, a bio real do Instagram e os diferenciais do negócio no Google Meu Negócio.",
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
              temperature: 0.65,
            },
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout calling ${modelName}`)), 14000)
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
      parsedData = buildSmartFallbackMicrosite({
        instagram: instaData.username || instagram,
        googleMaps: mapsData.resolvedUrl || googleMaps,
        businessName: effectiveBusinessName,
        businessNiche: effectiveNiche,
        additionalInfo,
        address: mapsData.address,
        bio: instaData.bio,
      });
    }

    parsedData = applyExtractedAssetsToMicrosite(parsedData, instaData, mapsData, {
      instagram,
      googleMaps,
      businessName: effectiveBusinessName,
      businessNiche: effectiveNiche,
    });

    return res.status(200).json({
      success: true,
      data: parsedData,
      extractedMeta,
    });
  } catch (err: any) {
    console.error('Erro na rota /api/generate-microsite, ativando fallback inteligente com dados extraídos:', err);
    const fallbackData = applyExtractedAssetsToMicrosite(
      buildSmartFallbackMicrosite({
        instagram: instaData.username || instagram,
        googleMaps: mapsData.resolvedUrl || googleMaps,
        businessName: effectiveBusinessName,
        businessNiche: effectiveNiche,
        additionalInfo,
        address: mapsData.address,
        bio: instaData.bio,
      }),
      instaData,
      mapsData,
      { instagram, googleMaps, businessName: effectiveBusinessName, businessNiche: effectiveNiche }
    );
    return res.status(200).json({
      success: true,
      data: fallbackData,
      extractedMeta,
      source: 'smart-fallback',
    });
  }
}

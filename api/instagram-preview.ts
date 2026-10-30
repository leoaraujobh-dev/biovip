import { extractInstagramInfo } from './generate-microsite.ts';

/**
 * Intelligent Palette Detector:
 * Infers the best visual theme based on the client's bio, niche, and specialty keywords.
 */
function detectHarmonicPalette(bio: string, category: string, fullName: string): {
  paletteId: string;
  paletteLabel: string;
  reason: string;
} {
  const text = `${bio} ${category} ${fullName}`.toLowerCase();

  if (/advogad|direito|jur[ií]dic|oab|escrit[oó]rio|compliance|tribut[aá]rio/.test(text)) {
    return { paletteId: 'navyLaw', paletteLabel: 'Navy Royal & Gold', reason: 'Sugerido para autoridade jurídica e consultoria' };
  }
  if (/barbe|barba|fade|degrad[eê]|masculin|corte/.test(text)) {
    return { paletteId: 'midnightObsidian', paletteLabel: 'Obsidiana Black & Prata', reason: 'Sugerido para estilo masculino e visagismo' };
  }
  if (/odonto|dentista|implante|clareamento|m[eé]dic|dermatolog|sa[uú]de|cl[ií]nica|biomedic/.test(text)) {
    return { paletteId: 'clinicalClean', paletteLabel: 'Clean Clínico & Minimal', reason: 'Sugerido para saúde e estética avançada' };
  }
  if (/bistr[oô]|restaurante|caf[eé]|confeitaria|pizza|hamb[uú]rguer|gastronomia|vinho/.test(text)) {
    return { paletteId: 'terracottaWarm', paletteLabel: 'Terracota & Ocre', reason: 'Sugerido para gastronomia e sensações aconchegantes' };
  }
  if (/lash|c[ií]lio|sobrancelha|micropigmenta|nail|unha|est[eé]tica|spa|make|maquiagem|beleza/.test(text)) {
    return { paletteId: 'roseGoldQuartz', paletteLabel: 'Rose Gold Quartzo', reason: 'Sugerido para beleza e visagismo feminino de luxo' };
  }
  return { paletteId: 'darkGold', paletteLabel: 'Dark Luxury Gold', reason: 'Sugerido para sofisticação e contraste no mobile' };
}

export default async function instagramPreviewHandler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { instagram } = req.body || {};
  if (!instagram || typeof instagram !== 'string' || !instagram.trim()) {
    return res.status(400).json({ success: false, error: 'Usuário do Instagram não informado.' });
  }

  try {
    const data = await extractInstagramInfo(instagram);
    if (!data.found && data.postPhotos.length === 0 && !data.avatarUrl) {
      return res.status(200).json({
        success: false,
        found: false,
        message: 'Nenhum perfil público localizado com este nome de usuário.',
      });
    }

    const suggestedPalette = detectHarmonicPalette(
      data.bio || '',
      data.category || '',
      data.fullName || data.cleanBusinessName || ''
    );

    return res.status(200).json({
      success: true,
      found: true,
      profile: {
        username: data.username,
        fullName: data.fullName || data.cleanBusinessName || data.username,
        cleanBusinessName: data.cleanBusinessName,
        category: data.category,
        bio: data.bio,
        followers: data.followers,
        postsCount: data.postsCount,
        avatarUrl: data.avatarUrl,
        whatsappPhone: data.whatsappPhone,
        externalUrl: data.externalUrl,
        detectedLocation: data.detectedLocation,
        businessHours: data.businessHours,
        photos: data.postPhotos.slice(0, 6),
        photoLikes: data.postLikes.slice(0, 6),
        externalServices: data.externalBioServices || [],
        suggestedPalette,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Falha ao buscar prévia do Instagram.' });
  }
}

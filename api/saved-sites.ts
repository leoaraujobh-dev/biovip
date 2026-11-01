import path from 'path';
import { fileURLToPath } from 'url';

let memorySavedSites: any[] = (globalThis as any).__biovipSavedSitesCache || [];

function getRootDir(): string {
  try {
    if (typeof process !== 'undefined' && process.cwd) {
      return process.cwd();
    }
    const filename = fileURLToPath(import.meta.url);
    return path.dirname(path.dirname(filename));
  } catch {
    return '.';
  }
}

function mergeSiteData(existingData: any, incomingData: any): any {
  if (!existingData) return incomingData;
  if (!incomingData) return existingData;

  const merged = { ...existingData, ...incomingData };

  // Profile images: preserve non-empty existing image if incoming is empty
  if (existingData.profile || incomingData.profile) {
    merged.profile = {
      ...(existingData.profile || {}),
      ...(incomingData.profile || {}),
      avatarUrl:
        incomingData.profile?.avatarUrl && String(incomingData.profile.avatarUrl).trim().length > 0
          ? incomingData.profile.avatarUrl
          : (existingData.profile?.avatarUrl || ''),
      aboutPhotoUrl:
        incomingData.profile?.aboutPhotoUrl && String(incomingData.profile.aboutPhotoUrl).trim().length > 0
          ? incomingData.profile.aboutPhotoUrl
          : (existingData.profile?.aboutPhotoUrl || ''),
    };
  }

  // StudentGrid gallery photos: preserve existing photos if incoming array only has empty strings or is empty
  if (existingData.studentGrid || incomingData.studentGrid) {
    const existingPhotos: string[] = Array.isArray(existingData.studentGrid?.photos) ? existingData.studentGrid.photos : [];
    const incomingPhotos: string[] = Array.isArray(incomingData.studentGrid?.photos) ? incomingData.studentGrid.photos : [];
    const incomingHasRealPhotos = incomingPhotos.some((p: any) => typeof p === 'string' && p.trim().length > 0);

    const mergedPhotos = incomingHasRealPhotos
      ? incomingPhotos.map((p, idx) => (typeof p === 'string' && p.trim().length > 0 ? p : (existingPhotos[idx] || '')))
      : (existingPhotos.length > 0 ? existingPhotos : incomingPhotos);

    merged.studentGrid = {
      ...(existingData.studentGrid || {}),
      ...(incomingData.studentGrid || {}),
      photos: mergedPhotos,
    };
  }

  // Before/After images
  if (existingData.beforeAfter || incomingData.beforeAfter) {
    merged.beforeAfter = {
      ...(existingData.beforeAfter || {}),
      ...(incomingData.beforeAfter || {}),
      beforeImage:
        incomingData.beforeAfter?.beforeImage && String(incomingData.beforeAfter.beforeImage).trim().length > 0
          ? incomingData.beforeAfter.beforeImage
          : (existingData.beforeAfter?.beforeImage || ''),
      afterImage:
        incomingData.beforeAfter?.afterImage && String(incomingData.beforeAfter.afterImage).trim().length > 0
          ? incomingData.beforeAfter.afterImage
          : (existingData.beforeAfter?.afterImage || ''),
    };
  }

  // Services items images
  if (Array.isArray(incomingData.services?.items) && Array.isArray(existingData.services?.items)) {
    const existingItems = existingData.services.items;
    merged.services = {
      ...(existingData.services || {}),
      ...(incomingData.services || {}),
      items: incomingData.services.items.map((incItem: any, idx: number) => {
        const existItem = existingItems[idx] || existingItems.find((e: any) => e.id === incItem.id);
        return {
          ...incItem,
          imageUrl:
            incItem.imageUrl && String(incItem.imageUrl).trim().length > 0
              ? incItem.imageUrl
              : (existItem?.imageUrl || ''),
        };
      }),
    };
  }

  return merged;
}

function mergeSites(existing: any, incoming: any): any {
  if (!existing) return incoming;
  if (!incoming) return existing;
  return {
    ...existing,
    ...incoming,
    data: mergeSiteData(existing.data, incoming.data),
  };
}

export default async function savedSitesHandler(req: any, res: any) {
  const method = (req.method || 'GET').toUpperCase();
  const rootDir = getRootDir();
  const storageFilePath = path.resolve(rootDir, '.saved-sites.json');

  if (res?.setHeader) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  if (method === 'OPTIONS') {
    return res.status ? res.status(204).end() : null;
  }

  if (method === 'GET') {
    try {
      if (memorySavedSites && memorySavedSites.length > 0) {
        return res.status(200).json({ success: true, sites: memorySavedSites });
      }
      const fs = await import('fs');
      const candidatePaths = [
        '/tmp/.saved-sites.json',
        storageFilePath,
        path.resolve(process.cwd(), '.saved-sites.json'),
        path.resolve(process.cwd(), 'public', '.saved-sites.json'),
        path.resolve(rootDir, '.saved-sites.json'),
        path.resolve(rootDir, 'public', '.saved-sites.json'),
        '/var/task/.saved-sites.json',
        '/var/task/public/.saved-sites.json',
      ];
      for (const p of candidatePaths) {
        try {
          if (fs.existsSync(p)) {
            const raw = fs.readFileSync(p, 'utf-8');
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
              memorySavedSites = parsed;
              (globalThis as any).__biovipSavedSitesCache = parsed;
              return res.status(200).json({ success: true, sites: parsed });
            }
          }
        } catch {}
      }

      // Fallback garantido para ambiente serverless Vercel (nunca retorna lista vazia)
      try {
        const { INITIAL_SAVED_SITES } = await import('../src/constants/initialSavedSites.ts');
        if (Array.isArray(INITIAL_SAVED_SITES) && INITIAL_SAVED_SITES.length > 0) {
          memorySavedSites = INITIAL_SAVED_SITES;
          (globalThis as any).__biovipSavedSitesCache = INITIAL_SAVED_SITES;
          return res.status(200).json({ success: true, sites: INITIAL_SAVED_SITES });
        }
      } catch {}

      return res.status(200).json({ success: true, sites: memorySavedSites || [] });
    } catch (err: any) {
      return res.status(200).json({ success: true, sites: memorySavedSites || [] });
    }
  }

  if (method === 'POST') {
    try {
      const payload = req.body || {};
      const { sites, site, deletedSiteId } = payload;

      let currentSites = [...(memorySavedSites || [])];

      // Tenta ler do disco se a memória estiver vazia
      if (currentSites.length === 0) {
        try {
          const fs = await import('fs');
          if (fs.existsSync(storageFilePath)) {
            const raw = fs.readFileSync(storageFilePath, 'utf-8');
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) currentSites = parsed;
          }
        } catch {}
      }

      if (deletedSiteId) {
        currentSites = currentSites.filter((s: any) => s.id !== deletedSiteId);
      }

      if (Array.isArray(sites) && sites.length > 0) {
        const byId = new Map(currentSites.map((s: any) => [s.id, s]));
        sites.forEach((incoming: any) => {
          if (!incoming || !incoming.id) return;
          const existing = byId.get(incoming.id);
          byId.set(incoming.id, existing ? mergeSites(existing, incoming) : incoming);
        });
        currentSites = Array.from(byId.values());
      } else if (site && site.id) {
        const existingIdx = currentSites.findIndex((s: any) => s.id === site.id);
        if (existingIdx >= 0) {
          currentSites[existingIdx] = mergeSites(currentSites[existingIdx], site);
        } else {
          currentSites.unshift(site);
        }
      }

      memorySavedSites = currentSites;
      (globalThis as any).__biovipSavedSitesCache = currentSites;

      // Persiste no arquivo .saved-sites.json no disco e em /tmp (para serverless Vercel)
      try {
        const fs = await import('fs');
        try { fs.writeFileSync(storageFilePath, JSON.stringify(currentSites, null, 2), 'utf-8'); } catch {}
        try { fs.writeFileSync(path.resolve(rootDir, 'public', '.saved-sites.json'), JSON.stringify(currentSites, null, 2), 'utf-8'); } catch {}
        try { fs.writeFileSync(path.resolve(rootDir, 'dist', '.saved-sites.json'), JSON.stringify(currentSites, null, 2), 'utf-8'); } catch {}
        try { fs.writeFileSync('/tmp/.saved-sites.json', JSON.stringify(currentSites, null, 2), 'utf-8'); } catch {}
      } catch (fsErr) {
        // Ambiente Edge/Serverless sem filesystem
      }

      return res.status(200).json({
        success: true,
        count: currentSites.length,
        sites: currentSites,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err?.message || 'Falha ao sincronizar microsites no servidor.',
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}

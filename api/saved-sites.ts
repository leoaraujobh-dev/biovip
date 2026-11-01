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
      if (fs.existsSync(storageFilePath)) {
        const raw = fs.readFileSync(storageFilePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          memorySavedSites = parsed;
          (globalThis as any).__biovipSavedSitesCache = parsed;
          return res.status(200).json({ success: true, sites: parsed });
        }
      }
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
          byId.set(incoming.id, existing ? { ...existing, ...incoming } : incoming);
        });
        currentSites = Array.from(byId.values());
      } else if (site && site.id) {
        const existingIdx = currentSites.findIndex((s: any) => s.id === site.id);
        if (existingIdx >= 0) {
          currentSites[existingIdx] = { ...currentSites[existingIdx], ...site };
        } else {
          currentSites.unshift(site);
        }
      }

      memorySavedSites = currentSites;
      (globalThis as any).__biovipSavedSitesCache = currentSites;

      // Persiste no arquivo .saved-sites.json no disco
      try {
        const fs = await import('fs');
        fs.writeFileSync(storageFilePath, JSON.stringify(currentSites, null, 2), 'utf-8');
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

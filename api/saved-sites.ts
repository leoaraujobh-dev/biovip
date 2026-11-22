import path from 'path';
import { fileURLToPath } from 'url';
import { logError, tryCatchSync, tryCatch } from '../src/utils/errorHandling.ts';

// In-memory cache with proper typing
let memorySavedSites: SavedSite[] = [];

// Import type from shared location
interface SavedSite {
  id: string;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  nicheCategory: string;
  createdAt: string;
  dueDate: string;
  monthlyFee: number;
  maintenancePlan?: string;
  creationFee?: number;
  isFirstMonth?: boolean;
  status: string;
  daysOverdue?: number;
  edicoesBloqueadas?: boolean;
  linkStatus?: 'ativo' | 'manutencao';
  autoDisabledByOverdue?: boolean;
  manualOverrideUntil?: string;
  updatesThisMonth: number;
  lastUpdated: string;
  domainType: 'subdomain' | 'custom';
  subdomain: string;
  customDomain: string;
  dnsConfigured: boolean;
  sslActive: boolean;
  whatsappClicks?: number;
  pageViews?: number;
  trafficSources?: Record<string, number>;
  isLandingModel?: boolean;
  isCustomized?: boolean;
  isUnderConstruction?: boolean;
  underConstruction?: boolean;
  briefingStatus?: 'pending' | 'submitted';
  briefingData?: Record<string, unknown>;
  isTemporaryDemo?: boolean;
  demoExpiresAt?: string;
  demoDurationDays?: number;
  crmStage?: string;
  proposalValue?: number;
  prospectNotes?: string;
  prospectInstagram?: string;
  prospectSituation?: string;
  activationDate?: string;
  data: Record<string, unknown>;
}

function getRootDir(): string {
  const [error, result] = tryCatchSync(() => {
    if (typeof process !== 'undefined' && process.cwd) {
      return process.cwd();
    }
    const filename = fileURLToPath(import.meta.url);
    return path.dirname(path.dirname(filename));
  }, 'getRootDir');

  if (error) {
    logError(error, 'getRootDir - fallback to current directory');
    return '.';
  }
  return result ?? '.';
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
        const [readError, parsed] = tryCatchSync(() => {
          if (fs.existsSync(p)) {
            const raw = fs.readFileSync(p, 'utf-8');
            return JSON.parse(raw);
          }
          return null;
        }, `readSavedSitesFromPath:${p}`);

        if (!readError && parsed && Array.isArray(parsed) && parsed.length > 0) {
          memorySavedSites = parsed;
          // Note: globalThis cache removed - using module-level memorySavedSites instead
          return res.status(200).json({ success: true, sites: parsed });
        }
      }

      // Fallback garantido para ambiente serverless Vercel (nunca retorna lista vazia)
      interface InitialSitesModule {
        INITIAL_SAVED_SITES: SavedSite[];
      }
      const [importError, initialModule] = await tryCatch<InitialSitesModule>(
        import('../src/constants/initialSavedSites.ts'),
        'importInitialSavedSites'
      );

      if (!importError && initialModule && initialModule.INITIAL_SAVED_SITES?.length > 0) {
        memorySavedSites = initialModule.INITIAL_SAVED_SITES;
        return res.status(200).json({ success: true, sites: initialModule.INITIAL_SAVED_SITES });
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
        const [readError, parsed] = await tryCatch(
          (async () => {
            const fs = await import('fs');
            if (fs.existsSync(storageFilePath)) {
              const raw = fs.readFileSync(storageFilePath, 'utf-8');
              return JSON.parse(raw);
            }
            return null;
          })(),
          'readSavedSitesFromDisk'
        );

        if (!readError && parsed && Array.isArray(parsed)) {
          currentSites = parsed;
        }
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
      // globalThis cache removed - using module-level memorySavedSites instead

      // Persiste no arquivo .saved-sites.json no disco e em /tmp (para serverless Vercel)
      const writePaths = [
        storageFilePath,
        path.resolve(rootDir, 'public', '.saved-sites.json'),
        path.resolve(rootDir, 'dist', '.saved-sites.json'),
        '/tmp/.saved-sites.json',
      ];

      const fs = await import('fs');
      for (const writePath of writePaths) {
        const [writeError] = tryCatchSync(() => {
          fs.writeFileSync(writePath, JSON.stringify(currentSites, null, 2), 'utf-8');
        }, `writeSavedSitesTo:${writePath}`);

        if (writeError) {
          logError(writeError, `Failed to write to ${writePath}`);
        }
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

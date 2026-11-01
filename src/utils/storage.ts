/**
 * IndexedDB + localStorage resilient persistence to prevent 5MB QuotaExceededError data loss.
 */
export const IDB_NAME = 'biovip_studio_db_v1';
export const IDB_VERSION = 2;
export const IDB_STORE = 'saved_sites_store';
export const IDB_IMAGE_STORE = 'image_cache_store';
export const IDB_KEY = 'luxebio_saved_sites_v1';

export const memoryImageCache = new Map<string, string>();

export function setupDbStores(db: IDBDatabase) {
  if (!db.objectStoreNames.contains(IDB_STORE)) {
    db.createObjectStore(IDB_STORE);
  }
  if (!db.objectStoreNames.contains(IDB_IMAGE_STORE)) {
    db.createObjectStore(IDB_IMAGE_STORE);
  }
}

export function saveSitesToIndexedDb(sites: unknown): void {
  if (typeof window === 'undefined' || !('indexedDB' in window)) return;
  try {
    const req = window.indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = () => setupDbStores(req.result);
    req.onsuccess = () => {
      try {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) return;
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put(sites, IDB_KEY);
      } catch {}
    };
  } catch {}
}

export function loadSitesFromIndexedDb(): Promise<any[] | null> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const req = window.indexedDB.open(IDB_NAME, IDB_VERSION);
      req.onupgradeneeded = () => setupDbStores(req.result);
      req.onsuccess = () => {
        try {
          const db = req.result;
          if (!db.objectStoreNames.contains(IDB_STORE)) {
            resolve(null);
            return;
          }
          const tx = db.transaction(IDB_STORE, 'readonly');
          const getReq = tx.objectStore(IDB_STORE).get(IDB_KEY);
          getReq.onsuccess = () => {
            resolve(Array.isArray(getReq.result) ? getReq.result : null);
          };
          getReq.onerror = () => resolve(null);
        } catch {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function getCachedImageFromIdb(url: string): Promise<string | null> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) return null;
  if (!url || url.startsWith('data:') || url.startsWith('blob:')) return url;
  if (memoryImageCache.has(url)) return memoryImageCache.get(url)!;

  return new Promise((resolve) => {
    try {
      const req = window.indexedDB.open(IDB_NAME, IDB_VERSION);
      req.onupgradeneeded = () => setupDbStores(req.result);
      req.onsuccess = () => {
        try {
          const db = req.result;
          if (!db.objectStoreNames.contains(IDB_IMAGE_STORE)) {
            resolve(null);
            return;
          }
          const tx = db.transaction(IDB_IMAGE_STORE, 'readonly');
          const store = tx.objectStore(IDB_IMAGE_STORE);
          const getReq = store.get(url);
          getReq.onsuccess = () => {
            const result = getReq.result;
            if (result && result.dataUrl) {
              memoryImageCache.set(url, result.dataUrl);
              resolve(result.dataUrl);
            } else {
              resolve(null);
            }
          };
          getReq.onerror = () => resolve(null);
        } catch {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function saveImageToIdbCache(url: string, dataUrl: string): Promise<void> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) return;
  if (!url || !dataUrl || url.startsWith('data:') || url.startsWith('blob:')) return;
  memoryImageCache.set(url, dataUrl);
  try {
    const req = window.indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = () => setupDbStores(req.result);
    req.onsuccess = () => {
      try {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_IMAGE_STORE)) return;
        const tx = db.transaction(IDB_IMAGE_STORE, 'readwrite');
        tx.objectStore(IDB_IMAGE_STORE).put({ url, dataUrl, timestamp: Date.now() }, url);
      } catch {}
    };
  } catch {}
}

export function purgeSiteFromStorage(siteId: string, siteData?: any): void {
  if (typeof window === 'undefined') return;

  const urlsToPurge: string[] = [];
  if (siteData) {
    if (siteData.profile?.avatarUrl) urlsToPurge.push(siteData.profile.avatarUrl);
    if (siteData.profile?.aboutPhotoUrl) urlsToPurge.push(siteData.profile.aboutPhotoUrl);
    if (Array.isArray(siteData.studentGrid?.photos)) {
      urlsToPurge.push(...siteData.studentGrid.photos);
    }
    if (Array.isArray(siteData.services?.items)) {
      siteData.services.items.forEach((item: any) => {
        if (item?.imageUrl) urlsToPurge.push(item.imageUrl);
      });
    }
    if (Array.isArray(siteData.actionCards)) {
      siteData.actionCards.forEach((card: any) => {
        if (card?.cardImage) urlsToPurge.push(card.cardImage);
      });
    }
    if (siteData.beforeAfter?.beforeImage) urlsToPurge.push(siteData.beforeAfter.beforeImage);
    if (siteData.beforeAfter?.afterImage) urlsToPurge.push(siteData.beforeAfter.afterImage);
    if (siteData.locationCard?.imageUrl) urlsToPurge.push(siteData.locationCard.imageUrl);
  }

  // Purge from memory cache
  urlsToPurge.forEach((u) => memoryImageCache.delete(u));

  // Purge image store records from IndexedDB to free disk/browser space
  if ('indexedDB' in window) {
    try {
      const req = window.indexedDB.open(IDB_NAME, IDB_VERSION);
      req.onupgradeneeded = () => setupDbStores(req.result);
      req.onsuccess = () => {
        try {
          const db = req.result;
          if (db.objectStoreNames.contains(IDB_IMAGE_STORE)) {
            const tx = db.transaction(IDB_IMAGE_STORE, 'readwrite');
            const store = tx.objectStore(IDB_IMAGE_STORE);
            urlsToPurge.forEach((u) => {
              try { store.delete(u); } catch {}
            });
          }
        } catch {}
      };
    } catch {}
  }
  // Notifica a API do servidor da exclusão para refletir em todos os dispositivos
  if (typeof window !== 'undefined' && siteId) {
    try {
      fetch('/api/saved-sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deletedSiteId: siteId }),
      }).catch(() => {});
    } catch {}
  }
}

export function persistSavedSitesToStorage(sites: any[]): void {
  saveSitesToIndexedDb(sites);
  try {
    localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(sites));
  } catch {
    // QuotaExceededError fallback: strip heavy Base64 images in localStorage while IndexedDB retains full images
    try {
      const lightweight = sites.map((s) => {
        try {
          const cloned = JSON.parse(JSON.stringify(s, (_k, v) => {
            if (typeof v === 'string' && v.startsWith('data:image/') && v.length > 35000) {
              return '';
            }
            return v;
          }));
          return cloned;
        } catch {
          return s;
        }
      });
      localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(lightweight));
    } catch {}
  }

  // Sincronização automática com a API do servidor (PC <-> Celular <-> Nuvem)
  if (typeof window !== 'undefined' && Array.isArray(sites) && sites.length > 0) {
    try {
      fetch('/api/saved-sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sites }),
      }).catch(() => {});
    } catch {}
  }
}

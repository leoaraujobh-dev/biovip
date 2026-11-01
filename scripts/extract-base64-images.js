import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const modelsAssetDir = path.resolve(publicDir, 'assets', 'models');

if (!fs.existsSync(modelsAssetDir)) {
  fs.mkdirSync(modelsAssetDir, { recursive: true });
}

function saveBase64ToFile(dataUri, targetFilePath) {
  const matches = dataUri.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return false;
  }
  const buffer = Buffer.from(matches[2], 'base64');
  fs.writeFileSync(targetFilePath, buffer);
  return true;
}

const savedSitesPath = path.resolve(rootDir, '.saved-sites.json');
const publicSavedSitesPath = path.resolve(publicDir, '.saved-sites.json');

const raw = fs.readFileSync(savedSitesPath, 'utf-8');
const sites = JSON.parse(raw);
let extractedCount = 0;

for (const site of sites) {
  if (!site || !site.subdomain || !site.data) continue;
  const slug = site.subdomain.trim().toLowerCase();
  const siteAssetDir = path.resolve(modelsAssetDir, slug);

  // 1. Profile avatar
  if (site.data.profile?.avatarUrl?.startsWith('data:image/')) {
    if (!fs.existsSync(siteAssetDir)) fs.mkdirSync(siteAssetDir, { recursive: true });
    const targetFile = path.resolve(siteAssetDir, 'avatar.jpg');
    if (saveBase64ToFile(site.data.profile.avatarUrl, targetFile)) {
      site.data.profile.avatarUrl = `/assets/models/${slug}/avatar.jpg`;
      extractedCount++;
    }
  }

  // 2. Profile about photo
  if (site.data.profile?.aboutPhotoUrl?.startsWith('data:image/')) {
    if (!fs.existsSync(siteAssetDir)) fs.mkdirSync(siteAssetDir, { recursive: true });
    const targetFile = path.resolve(siteAssetDir, 'about.jpg');
    if (saveBase64ToFile(site.data.profile.aboutPhotoUrl, targetFile)) {
      site.data.profile.aboutPhotoUrl = `/assets/models/${slug}/about.jpg`;
      extractedCount++;
    }
  }

  // 3. Portfolio photos (studentGrid)
  if (Array.isArray(site.data.studentGrid?.photos)) {
    site.data.studentGrid.photos = site.data.studentGrid.photos.map((photoUrl, idx) => {
      if (typeof photoUrl === 'string' && photoUrl.startsWith('data:image/')) {
        if (!fs.existsSync(siteAssetDir)) fs.mkdirSync(siteAssetDir, { recursive: true });
        const targetFile = path.resolve(siteAssetDir, `portfolio-${idx + 1}.jpg`);
        if (saveBase64ToFile(photoUrl, targetFile)) {
          extractedCount++;
          return `/assets/models/${slug}/portfolio-${idx + 1}.jpg`;
        }
      }
      return photoUrl;
    });
  }

  // 4. Services items
  if (Array.isArray(site.data.services?.items)) {
    site.data.services.items.forEach((item, idx) => {
      if (item?.imageUrl?.startsWith('data:image/')) {
        if (!fs.existsSync(siteAssetDir)) fs.mkdirSync(siteAssetDir, { recursive: true });
        const targetFile = path.resolve(siteAssetDir, `service-${idx + 1}.jpg`);
        if (saveBase64ToFile(item.imageUrl, targetFile)) {
          item.imageUrl = `/assets/models/${slug}/service-${idx + 1}.jpg`;
          extractedCount++;
        }
      }
    });
  }
}

fs.writeFileSync(savedSitesPath, JSON.stringify(sites, null, 2), 'utf-8');
fs.writeFileSync(publicSavedSitesPath, JSON.stringify(sites, null, 2), 'utf-8');

console.log(`[Image Optimizer] Extracted ${extractedCount} base64 images to static Web assets in public/assets/models/`);

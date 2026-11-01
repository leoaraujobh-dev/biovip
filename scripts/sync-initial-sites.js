import fs from 'fs';

const raw = fs.readFileSync('.saved-sites.json', 'utf-8');
const sites = JSON.parse(raw);

const code = `import type { SavedMicrosite } from '../types/microsite';\n\nexport const INITIAL_SAVED_SITES: SavedMicrosite[] = ${JSON.stringify(sites, null, 2)};\n`;

fs.writeFileSync('src/constants/initialSavedSites.ts', code, 'utf-8');
console.log(`Successfully generated src/constants/initialSavedSites.ts with ${sites.length} sites.`);

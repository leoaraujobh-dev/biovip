import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_DATA, INITIAL_SAVED_SITES } from '../src/constants/initialData';
import { NICHE_TEMPLATES } from '../src/constants/templates';
import { generateExportCode } from '../src/utils/exportEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

// Models to pre-render
const modelsToPrerender: Array<{ slug: string; data: typeof INITIAL_DATA; aliases?: string[] }> = [];

// 1. Dra. Marina Almeida (Law)
const lawSite = INITIAL_SAVED_SITES.find(s => s.subdomain === 'dramarina') || INITIAL_SAVED_SITES[1];
if (lawSite?.data) {
  modelsToPrerender.push({ slug: 'dramarina', data: lawSite.data });
}

// 2. Larissa Almeida (Nails)
const nailsSite = INITIAL_SAVED_SITES.find(s => s.subdomain === 'larissanails') || INITIAL_SAVED_SITES[2];
if (nailsSite?.data) {
  modelsToPrerender.push({ slug: 'larissanails', data: nailsSite.data });
}

// 3. Don Corleone Barber
const barberSite = INITIAL_SAVED_SITES.find(s => s.subdomain === 'doncorleone') || INITIAL_SAVED_SITES[0];
if (barberSite?.data) {
  modelsToPrerender.push({ slug: 'doncorleone', data: barberSite.data, aliases: ['dombarber'] });
}

// 4. Janne Campelo (Lash & Sobrancelhas)
const lashTemplate = NICHE_TEMPLATES.find(t => t.id === 'lash-luxury');
if (lashTemplate?.sampleData) {
  const lashData = JSON.parse(JSON.stringify(lashTemplate.sampleData));
  lashData.profile.name = 'JANNE CAMPELO';
  lashData.profile.title = 'ESPECIALISTA EM SOBRANCELHAS & LASH DESIGN';
  lashData.profile.tagline = 'Realçando a força do seu olhar com Nanoblading Realista, Brow Lamination e Extensão de Cílios de alta retenção.';
  lashData.profile.cursivePhrase = 'Seu olhar transmite o seu verdadeiro poder.';
  lashData.profile.avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900';
  lashData.profile.aboutPhotoUrl = 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=700';
  lashData.seo = {
    ...INITIAL_DATA.seo,
    metaTitle: 'JANNE CAMPELO — Especialista em Sobrancelhas & Lash Design',
    metaDescription: 'Nanoblading realista, Brow Lamination e Extensão de Cílios de alta retenção. Realce o seu olhar com exclusividade.',
  };
  modelsToPrerender.push({ slug: 'jannecampelo', data: lashData });
}

// 5. Dra. Fernanda Marcolin (Estética Avançada)
const estheticsTemplate = NICHE_TEMPLATES.find(t => t.id === 'dentist-clean') || NICHE_TEMPLATES[0];
if (estheticsTemplate?.sampleData) {
  const estheticsData = JSON.parse(JSON.stringify(estheticsTemplate.sampleData));
  estheticsData.theme = 'champagneNude';
  estheticsData.profile.name = 'DRA. FERNANDA MARCOLIN';
  estheticsData.profile.title = 'HARMONIZAÇÃO FACIAL & ESTÉTICA AVANÇADA';
  estheticsData.profile.tagline = 'Protocolos médicos e estéticos de Bioestimuladores, Toxina Botulínica e Rejuvenescimento com foco em naturalidade.';
  estheticsData.profile.cursivePhrase = 'Realçando sua beleza única com ciência, arte e sutileza.';
  estheticsData.profile.avatarUrl = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900';
  estheticsData.profile.aboutPhotoUrl = 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=700';
  estheticsData.seo = {
    ...INITIAL_DATA.seo,
    metaTitle: 'DRA. FERNANDA MARCOLIN — Harmonização Facial & Estética Avançada',
    metaDescription: 'Protocolos médicos de rejuvenescimento, toxina botulínica e bioestimuladores de colágeno com foco em elegância natural.',
  };
  modelsToPrerender.push({ slug: 'drafernanda', data: estheticsData });
}

console.log(`[Pre-render] Generating ultra-fast static HTML for ${modelsToPrerender.length} models...`);

for (const model of modelsToPrerender) {
  const html = generateExportCode(model.data, { demoWhatsAppPhone: '5531991390202' });
  const targets = [model.slug, ...(model.aliases || [])];

  for (const t of targets) {
    const targetDir = path.join(publicDir, t);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const filePath = path.join(targetDir, 'index.html');
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`✓ Pre-rendered: public/${t}/index.html (${(html.length / 1024).toFixed(1)} kB)`);
  }
}

console.log('[Pre-render] Complete! All models ready for instant static edge delivery.');

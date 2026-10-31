import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import generateMicrositeHandler from './generate-microsite.ts';
import { generateExportCode } from '../src/utils/exportEngine.ts';
import { generateProspectProposalMessage, type ProspectSituation } from '../src/utils/prospectProposal.ts';
import { formatWhatsAppPhone } from '../src/utils/formatters.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const SAVED_PROSPECTS_PATH = path.resolve(ROOT_DIR, '.saved-prospects.json');

export interface CreateProspectRequest {
  apiKey?: string;
  clientName: string;
  instagram?: string;
  clientPhone?: string;
  clientEmail?: string;
  nicheCategory?: string;
  googleMaps?: string;
  demoDurationDays?: number;
  proposalValue?: string | number;
  situation?: ProspectSituation;
  subdomain?: string;
  visualStyle?: 'auto' | 'rose_luxury' | 'dark_gold' | 'clean_minimal' | 'vibrant_glam';
  additionalInfo?: string;
  conversionGoal?: string;
}

export default async function createProspectMicrositeHandler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido. Use POST.' });
  }

  const {
    apiKey,
    clientName,
    instagram = '',
    clientPhone = '',
    clientEmail = '',
    nicheCategory = 'Beleza & Estética',
    googleMaps = '',
    demoDurationDays = 7,
    proposalValue = '197,00',
    situation = 'wa_direto',
    subdomain: requestedSubdomain,
    visualStyle = 'auto',
    additionalInfo = '',
    conversionGoal = 'whatsapp_booking',
  } = (req.body || {}) as CreateProspectRequest;

  // 1. Verificação de Chave de Acesso (opcional por variável de ambiente CRM_API_SECRET)
  const configuredSecret = (process.env.CRM_API_SECRET || process.env.VITE_ADMIN_API_KEY || '').trim();
  if (configuredSecret && apiKey && apiKey.trim() !== configuredSecret) {
    return res.status(401).json({ success: false, error: 'Chave de API (apiKey) inválida para criação externa.' });
  }

  // 2. Validação básica de campos
  if (!clientName && !instagram) {
    return res.status(400).json({
      success: false,
      error: 'É necessário informar ao menos o "clientName" ou o "@instagram" do lead.',
    });
  }

  const cleanInsta = String(instagram || '').replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/[@\/]/g, '').trim();
  const effectiveClientName = (clientName || cleanInsta || 'Cliente VIP').trim();

  // 3. Determinação do Subdomínio / Slug único
  let slug = (requestedSubdomain || cleanInsta || effectiveClientName)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `demo-${Date.now().toString(36)}`;

  // 4. Invoca o motor de geração de IA (que puxa Instagram, Maps e monta a estrutura completa)
  let generatedSiteData: any = null;
  let extractedMeta: any = null;

  try {
    let mockResult: any = null;
    const mockRes = {
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      statusCode: 200,
      json(data: any) {
        mockResult = data;
        return this;
      },
    };

    const genReq = {
      method: 'POST',
      body: {
        instagram: cleanInsta,
        googleMaps,
        businessName: effectiveClientName,
        businessNiche: nicheCategory,
        additionalInfo,
        conversionGoal,
        visualStyle,
      },
    };

    await generateMicrositeHandler(genReq, mockRes);
    if (mockResult && mockResult.success) {
      generatedSiteData = mockResult.data;
      extractedMeta = mockResult.extractedMeta;
    }
  } catch (err: any) {
    console.warn('⚠️ Falha ao gerar via AI, usando fallback de template:', err?.message);
  }

  if (!generatedSiteData) {
    return res.status(500).json({
      success: false,
      error: 'Não foi possível gerar a estrutura do microsite para o lead.',
    });
  }

  // 5. Configuração de Validade Temporária de Degustação (D+7)
  const durationDays = Number(demoDurationDays) > 0 ? Number(demoDurationDays) : 7;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiresDate = new Date(today);
  expiresDate.setDate(expiresDate.getDate() + durationDays);
  const demoExpiresAtStr = expiresDate.toISOString().split('T')[0];

  // Garante que o telefone do cliente esteja no microsite caso informado
  const cleanPhone = formatWhatsAppPhone(clientPhone || generatedSiteData.profile?.whatsapp || '');
  if (cleanPhone) {
    generatedSiteData.profile = generatedSiteData.profile || {};
    generatedSiteData.profile.whatsapp = cleanPhone;
  }

  // 6. Lê configuração de domínio base
  let baseDomain = 'biovip.com.br';
  try {
    const configPath = path.resolve(ROOT_DIR, '.landing-config.json');
    if (fs.existsSync(configPath)) {
      const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (cfg?.baseDomain) baseDomain = cfg.baseDomain.toLowerCase().trim();
    }
  } catch {}

  const demoUrl = `https://${baseDomain}/${slug}`;

  // 7. Renderiza o código HTML estático da Degustação Temporária
  const htmlContent = generateExportCode(generatedSiteData, {
    isTemporaryDemo: true,
    demoExpiresAt: demoExpiresAtStr,
    demoClientName: effectiveClientName,
    demoWhatsAppPhone: cleanPhone,
  });

  // 8. Publica o HTML diretamente na pasta estática public/{slug}/index.html
  try {
    const targetFolder = path.resolve(PUBLIC_DIR, slug);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }
    fs.writeFileSync(path.resolve(targetFolder, 'index.html'), htmlContent, 'utf8');
  } catch (diskErr: any) {
    console.error(`Erro ao salvar HTML do microsite na pasta public/${slug}:`, diskErr);
  }

  // 9. Gera o texto persuasivo de abordagem comercial para o WhatsApp
  const proposalMessage = generateProspectProposalMessage({
    clientName: effectiveClientName,
    niche: nicheCategory,
    instagram: cleanInsta,
    subdomain: slug,
    demoDurationDays: durationDays,
    proposalValue,
    situation,
    baseDomain,
  });

  const whatsappDispatchUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(proposalMessage)}`
    : `https://wa.me/?text=${encodeURIComponent(proposalMessage)}`;

  // 10. Persistência local no arquivo .saved-prospects.json para histórico do CRM
  const leadRecord = {
    id: `prospect-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    clientName: effectiveClientName,
    clientPhone: cleanPhone,
    clientEmail: clientEmail.trim(),
    nicheCategory,
    createdAt: today.toISOString().split('T')[0],
    dueDate: demoExpiresAtStr,
    monthlyFee: 49.90,
    creationFee: 79.90,
    status: 'active',
    isLandingModel: false,
    isTemporaryDemo: true,
    demoDurationDays: durationDays,
    demoExpiresAt: demoExpiresAtStr,
    crmStage: 'demonstracao',
    proposalValue: typeof proposalValue === 'number' ? proposalValue : parseFloat(String(proposalValue).replace(',', '.')) || 197.00,
    prospectInstagram: cleanInsta,
    prospectSituation: situation,
    domainType: 'subdomain',
    subdomain: slug,
    customDomain: '',
    data: generatedSiteData,
    lastUpdated: today.toISOString().split('T')[0],
  };

  try {
    let existingProspects: any[] = [];
    if (fs.existsSync(SAVED_PROSPECTS_PATH)) {
      const raw = fs.readFileSync(SAVED_PROSPECTS_PATH, 'utf8');
      if (raw) existingProspects = JSON.parse(raw);
    }
    // Remove se já existir com o mesmo slug para atualizar
    existingProspects = existingProspects.filter((p: any) => p.subdomain !== slug);
    existingProspects.unshift(leadRecord);
    fs.writeFileSync(SAVED_PROSPECTS_PATH, JSON.stringify(existingProspects, null, 2), 'utf8');
  } catch {}

  // 11. Resposta completa com todos os dados e links para o CRM Externo
  return res.status(200).json({
    success: true,
    message: 'Microsite de prospecção temporária gerado e publicado com sucesso!',
    lead: {
      id: leadRecord.id,
      clientName: effectiveClientName,
      subdomain: slug,
      nicheCategory,
      demoUrl,
      demoDurationDays: durationDays,
      demoExpiresAt: demoExpiresAtStr,
      proposalValue,
      clientPhone: cleanPhone,
      whatsappDispatchUrl,
      proposalMessage,
      instagram: cleanInsta ? `@${cleanInsta}` : '',
      situation,
    },
    extractedMeta: extractedMeta || null,
  });
}

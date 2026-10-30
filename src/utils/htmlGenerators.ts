import { SavedMicrosite } from '../types/microsite';
import { formatWhatsAppPhone } from './formatters';

/**
 * Auxiliar para cálculo de dias restantes em demonstrações temporárias CRM
 */
export const getDemoDaysRemaining = (expiresAt?: string): number => {
  if (!expiresAt) return 0;
  const exp = new Date(expiresAt).getTime();
  const now = new Date().getTime();
  const diff = exp - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const isDemoExpired = (site: Partial<SavedMicrosite>): boolean => {
  if (!site.isTemporaryDemo || !site.demoExpiresAt) return false;
  return getDemoDaysRemaining(site.demoExpiresAt) <= 0;
};

/**
 * Gerador da Tela Neutra de Manutenção (Modo Suspenso D+7 ou Alternar Suspensão)
 * Visual: Fundo escuro luxuoso, tipografia serifada, sem qualquer menção pejorativa a dívida ou atraso.
 */
export const getSuspendedPageHtml = (
  customer: Partial<SavedMicrosite> & {
    clientName?: string;
    clientPhone?: string;
    subdomain?: string;
    customDomain?: string;
    data?: any;
  }
): string => {
  const displayName =
    customer?.data?.profile?.name ||
    customer?.clientName ||
    'Atendimento Exclusivo';
  const rawPhone =
    customer?.clientPhone ||
    customer?.data?.profile?.whatsapp ||
    '';
  const cleanPhone = formatWhatsAppPhone(rawPhone);
  const whatsappHref = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Olá! Acesse o link da bio de ${displayName} e gostaria de falar com a equipe.`)}`
    : `https://wa.me/?text=${encodeURIComponent(`Olá! Gostaria de atendimento com a equipe de ${displayName}.`)}`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${displayName} — Perfil em Atualização Técnica</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background-color: #09090b;
      background-image:
        radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 60%),
        radial-gradient(circle at 50% 100%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
      color: #fafaf9;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      -webkit-font-smoothing: antialiased;
    }
    .luxury-card {
      width: 100%;
      max-width: 460px;
      background: rgba(18, 18, 22, 0.88);
      border: 1px solid rgba(212, 175, 55, 0.22);
      border-radius: 24px;
      padding: 48px 32px;
      text-align: center;
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(16px);
    }
    .brand-tag {
      display: inline-block;
      font-size: 10px;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #d4af37;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 999px;
      border: 1px solid rgba(212, 175, 55, 0.28);
      background: rgba(212, 175, 55, 0.07);
      margin-bottom: 24px;
    }
    .divider {
      width: 48px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #d4af37, transparent);
      margin: 0 auto 24px auto;
    }
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 32px;
      font-weight: 600;
      line-height: 1.2;
      color: #fafaf9;
      letter-spacing: 0.01em;
      margin-bottom: 14px;
    }
    .profile-subtitle {
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #a1a1aa;
      margin-bottom: 20px;
    }
    p.message {
      font-size: 14px;
      line-height: 1.7;
      color: #d4d4d8;
      margin-bottom: 34px;
      font-weight: 400;
    }
    .wa-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 15px 24px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(212, 175, 55, 0.35);
      color: #f4f4f5;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.03em;
      text-decoration: none;
      transition: all 0.25s ease;
    }
    .wa-btn:hover {
      background: rgba(212, 175, 55, 0.12);
      border-color: rgba(212, 175, 55, 0.65);
      color: #ffffff;
      transform: translateY(-1px);
    }
    .wa-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #d4af37;
      box-shadow: 0 0 10px #d4af37;
    }
  </style>
</head>
<body>
  <main class="luxury-card">
    <span class="brand-tag">${displayName}</span>
    <h1>Perfil em Atualização Técnica</h1>
    <div class="divider"></div>
    <p class="message">
      Estamos atualizando nossos serviços e catálogo para melhor atendê-lo. Em breve no ar.
    </p>
    <a href="${whatsappHref}" target="_blank" rel="noopener noreferrer" class="wa-btn">
      <span class="wa-dot"></span>
      <span>Falar com nossa equipe no WhatsApp</span>
    </a>
  </main>
</body>
</html>`;
};

/**
 * Verifica se um microsite é considerado Modelo (Vitrine/Demonstração) e portanto NÃO deve entrar no cálculo de faturamento (MRR)
 */
export const isModelMicrosite = (site?: Partial<SavedMicrosite> | null): boolean => {
  if (!site) return false;
  if (typeof site.isLandingModel === 'boolean') return site.isLandingModel;
  return Boolean(site.id && site.id.startsWith('real-niche-'));
};

/**
 * Verifica se um microsite está no estado de página em construção
 */
export const isSiteUnderConstruction = (site?: Partial<SavedMicrosite> | null): boolean => {
  if (!site) return false;
  if (isModelMicrosite(site)) return false;
  return Boolean(site.isUnderConstruction || site.underConstruction);
};

/**
 * Gerador da Página em Construção & Envio de Informações/Briefing
 */
export const getUnderConstructionPageHtml = (
  customer: Partial<SavedMicrosite> & {
    clientName?: string;
    clientPhone?: string;
    clientEmail?: string;
    subdomain?: string;
    customDomain?: string;
    data?: any;
    briefingStatus?: 'pending' | 'submitted';
    briefingData?: any;
  },
  agencyConfig?: {
    agencyBrandName?: string;
    agencyWhatsapp?: string;
    agencyEmail?: string;
    baseDomain?: string;
  }
): string => {
  const displayName =
    customer?.data?.profile?.name ||
    customer?.clientName ||
    'Cliente VIP';
  const brandName = agencyConfig?.agencyBrandName || 'BioVip';
  const rawAgencyPhone = agencyConfig?.agencyWhatsapp || '5531991390202';
  const cleanAgencyPhone = formatWhatsAppPhone(rawAgencyPhone);
  const baseDomain = (agencyConfig?.baseDomain || 'biovip.com.br').toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const subdomain = customer?.subdomain || 'meusite';
  const fullDomain = customer?.customDomain ? customer.customDomain : `${baseDomain}/${subdomain}`;
  const displayUrl = `https://${fullDomain}`;

  const defaultWhatsappMsg = encodeURIComponent(
    `Olá equipe ${brandName}!\nAcabei de efetuar o pagamento do meu microsite (*${displayName}*) pelo Asaas.\n\n` +
    `🔗 *Link Reservado:* ${displayUrl}\n\n` +
    `Aqui estão as informações para a criação da minha página:\n` +
    `1. Nome Comercial:\n` +
    `2. Slogan / Especialidade:\n` +
    `3. Breve Bio:\n` +
    `4. WhatsApp de Atendimento:\n` +
    `5. Instagram:\n` +
    `6. Principais Serviços:\n\n` +
    `*(Estou anexando também minha foto de perfil / logotipo nesta conversa)*`
  );

  const whatsappHref = cleanAgencyPhone
    ? `https://wa.me/${cleanAgencyPhone}?text=${defaultWhatsappMsg}`
    : `https://wa.me/?text=${defaultWhatsappMsg}`;

  const isBriefingSubmitted = customer?.briefingStatus === 'submitted';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${displayName} — Página em Construção | ${brandName}</title>
  <meta name="robots" content="noindex, nofollow" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background-color: #08080a;
      background-image:
        radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.16) 0%, transparent 60%),
        radial-gradient(circle at 100% 50%, rgba(212, 175, 55, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 0% 100%, rgba(212, 175, 55, 0.08) 0%, transparent 50%);
      color: #fafaf9;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px 18px;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      width: 100%;
      max-width: 580px;
      margin: 0 auto;
    }
    .luxury-card {
      background: rgba(16, 16, 20, 0.94);
      border: 1.5px solid rgba(212, 175, 55, 0.32);
      border-radius: 28px;
      padding: 40px 28px;
      text-align: center;
      box-shadow: 0 32px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(20px);
      position: relative;
      overflow: hidden;
    }
    .badge-bar {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #fbbf24;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 999px;
      border: 1px solid rgba(251, 191, 36, 0.35);
      background: rgba(251, 191, 36, 0.1);
      margin-bottom: 20px;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fbbf24;
      box-shadow: 0 0 12px #fbbf24;
      animation: pulse 2s infinite ease-in-out;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 34px;
      font-weight: 700;
      line-height: 1.18;
      color: #ffffff;
      margin-bottom: 10px;
    }
    .subdomain-pill {
      display: inline-block;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      font-weight: 700;
      color: #d4af37;
      background: rgba(212, 175, 55, 0.12);
      border: 1px solid rgba(212, 175, 55, 0.3);
      padding: 6px 16px;
      border-radius: 12px;
      margin: 12px 0 20px 0;
      word-break: break-all;
    }
    p.lead-text {
      font-size: 13.5px;
      line-height: 1.65;
      color: #d4d4d8;
      margin-bottom: 24px;
      font-weight: 400;
    }
    .wa-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 16px 24px;
      border-radius: 14px;
      background: linear-gradient(135deg, #25D366 0%, #1ea952 100%);
      color: #000000;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
      transition: all 0.25s ease;
    }
    .wa-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px rgba(37, 211, 102, 0.4);
    }
  </style>
</head>
<body>
  <div class="container">
    <main class="luxury-card">
      <div class="badge-bar">
        <span class="pulse-dot"></span>
        <span>${isBriefingSubmitted ? 'Informações Recebidas • Em Produção' : 'Site Reservado • Em Produção'}</span>
      </div>
      <h1>Página em Construção</h1>
      <div class="subdomain-pill">${displayUrl}</div>
      <p class="lead-text">
        O microsite exclusivo de <strong>${displayName}</strong> está sendo preparado pela equipe <strong>${brandName}</strong>.
      </p>
      <a href="${whatsappHref}" target="_blank" rel="noopener noreferrer" class="wa-btn">
        <span>Falar com o Suporte no WhatsApp</span>
      </a>
    </main>
  </div>
</body>
</html>`;
};

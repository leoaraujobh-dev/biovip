import { MaintenancePlanId, SavedMicrosite } from '../types/microsite';
import { parseBrlCurrency } from '../utils/formatters';

// Regras Oficiais de Taxa de Manutenção, Criação & Desativação Automática dos Biosites:
// - 1º Mês: Cobrada apenas a Taxa de Criação (NÃO há mensalidade no 1º mês).
// - R$ 29,90/mês: Direito a 1 alteração mensal.
// - R$ 49,90/mês: Direito a 4 alterações mensais.
// - R$ 79,90/mês: Alterações mensais ilimitadas.
// - Alterações adicionais excedentes: R$ 14,90 cada.
// - Desativação por atraso: Automática a partir do 7º dia de atraso (daysOverdue >= 7).

export const EXTRA_UPDATE_FEE = 14.90;
export const AUTO_DISABLE_OVERDUE_DAYS = 7;

export const MAINTENANCE_PLANS: Record<
  MaintenancePlanId,
  {
    id: MaintenancePlanId;
    name: string;
    shortName: string;
    price: number;
    maxUpdates: number; // Infinity for unlimited
    description: string;
  }
> = {
  basic_1: {
    id: 'basic_1',
    name: 'Manutenção Básica (1 alteração/mês)',
    shortName: '1 alt./mês (R$ 29,90)',
    price: 29.90,
    maxUpdates: 1,
    description: 'Inclui 1 alteração mensal + Hospedagem & SSL. Alterações extras: R$ 14,90 cada.',
  },
  pro_4: {
    id: 'pro_4',
    name: 'Manutenção Pro (4 alterações/mês)',
    shortName: '4 alt./mês (R$ 49,90)',
    price: 49.90,
    maxUpdates: 4,
    description: 'Inclui até 4 alterações mensais + Hospedagem & SSL. Alterações extras: R$ 14,90 cada.',
  },
  vip_unlimited: {
    id: 'vip_unlimited',
    name: 'Manutenção VIP (Alterações Ilimitadas)',
    shortName: 'Ilimitado (R$ 79,90)',
    price: 79.90,
    maxUpdates: Infinity,
    description: 'Alterações mensais ilimitadas sem custo extra + Suporte Prioritário & SSL.',
  },
};

export function parsePlanMaxUpdates(raw: string | number | undefined | null, fallback: number): number {
  if (typeof raw === 'number') return raw;
  if (raw === undefined || raw === null) return fallback;
  const str = String(raw).trim().toLowerCase();
  if (!str) return fallback;
  if (str.includes('ilimit') || str.includes('infinit') || str === '*') return Infinity;
  const digits = str.replace(/\D/g, '');
  if (!digits) return fallback;
  const num = parseInt(digits, 10);
  return Number.isFinite(num) && num >= 0 ? num : fallback;
}

export function formatPlanUpdatesLabel(maxUpdates: number, short = false): string {
  if (!Number.isFinite(maxUpdates) || maxUpdates === Infinity) {
    return short ? 'Ilimitadas' : 'Alterações ilimitadas';
  }
  if (short) {
    return `${maxUpdates} alt./mês`;
  }
  return `${maxUpdates} ${maxUpdates === 1 ? 'alteração mensal' : 'alterações mensais'}`;
}

export function formatCreationPriceDisplay(raw?: string | number | null, fallback = 'R$ 79,90'): string {
  if (raw === undefined || raw === null) return fallback;
  const trimmed = String(raw).trim();
  if (!trimmed) return fallback;
  if (/^R\$\s*/i.test(trimmed)) return trimmed.replace(/^r\$\s*/i, 'R$ ');
  const numeric = parseBrlCurrency(trimmed, -1);
  if (numeric > 0) {
    return `R$ ${numeric.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return trimmed;
}

export function syncMaintenancePlansFromConfig(cfg?: {
  recurringBasic?: string;
  recurringPro?: string;
  recurringVip?: string;
  updatesBasic?: string;
  updatesPro?: string;
  updatesVip?: string;
}) {
  if (!cfg) return;
  const priceBasic = parseBrlCurrency(cfg.recurringBasic, 29.90);
  const pricePro = parseBrlCurrency(cfg.recurringPro, 49.90);
  const priceVip = parseBrlCurrency(cfg.recurringVip, 79.90);

  const maxBasic = parsePlanMaxUpdates(cfg.updatesBasic, 1);
  const maxPro = parsePlanMaxUpdates(cfg.updatesPro, 4);
  const maxVip = parsePlanMaxUpdates(cfg.updatesVip, Infinity);

  const fmtPrice = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  MAINTENANCE_PLANS.basic_1.price = priceBasic;
  MAINTENANCE_PLANS.basic_1.maxUpdates = maxBasic;
  MAINTENANCE_PLANS.basic_1.name = `Manutenção Básica (${formatPlanUpdatesLabel(maxBasic, false)})`;
  MAINTENANCE_PLANS.basic_1.shortName = `${formatPlanUpdatesLabel(maxBasic, true)} (R$ ${fmtPrice(priceBasic)})`;
  MAINTENANCE_PLANS.basic_1.description =
    maxBasic === Infinity
      ? 'Alterações mensais ilimitadas sem custo extra + Hospedagem & SSL.'
      : `Inclui ${formatPlanUpdatesLabel(maxBasic, false)} + Hospedagem & SSL. Alterações extras: R$ 14,90 cada.`;

  MAINTENANCE_PLANS.pro_4.price = pricePro;
  MAINTENANCE_PLANS.pro_4.maxUpdates = maxPro;
  MAINTENANCE_PLANS.pro_4.name = `Manutenção Pro (${formatPlanUpdatesLabel(maxPro, false)})`;
  MAINTENANCE_PLANS.pro_4.shortName = `${formatPlanUpdatesLabel(maxPro, true)} (R$ ${fmtPrice(pricePro)})`;
  MAINTENANCE_PLANS.pro_4.description =
    maxPro === Infinity
      ? 'Alterações mensais ilimitadas sem custo extra + Hospedagem & SSL.'
      : `Inclui até ${formatPlanUpdatesLabel(maxPro, false)} + Hospedagem & SSL. Alterações extras: R$ 14,90 cada.`;

  MAINTENANCE_PLANS.vip_unlimited.price = priceVip;
  MAINTENANCE_PLANS.vip_unlimited.maxUpdates = maxVip;
  MAINTENANCE_PLANS.vip_unlimited.name = `Manutenção VIP (${formatPlanUpdatesLabel(maxVip, false)})`;
  MAINTENANCE_PLANS.vip_unlimited.shortName = `${formatPlanUpdatesLabel(maxVip, true)} (R$ ${fmtPrice(priceVip)})`;
  MAINTENANCE_PLANS.vip_unlimited.description =
    maxVip === Infinity
      ? 'Alterações mensais ilimitadas sem custo extra + Suporte Prioritário & SSL.'
      : `Inclui até ${formatPlanUpdatesLabel(maxVip, false)} + Suporte Prioritário & SSL.`;
}

export const getSiteBillingSummary = (site: SavedMicrosite) => {
  const planKey: MaintenancePlanId =
    site.maintenancePlan ||
    (site.monthlyFee >= 75 ? 'vip_unlimited' : site.monthlyFee >= 45 ? 'pro_4' : 'basic_1');
  const plan = MAINTENANCE_PLANS[planKey] || MAINTENANCE_PLANS.basic_1;
  const maintenanceFee = typeof site.monthlyFee === 'number' && site.monthlyFee > 0 ? site.monthlyFee : plan.price;
  const creationFee = typeof site.creationFee === 'number' ? site.creationFee : 197.00;
  const isFirstMonth = Boolean(site.isFirstMonth);
  const updatesUsed = site.updatesThisMonth || 0;
  const isUnlimited = plan.maxUpdates === Infinity;
  const extraUpdatesCount = isUnlimited ? 0 : Math.max(0, updatesUsed - plan.maxUpdates);
  const extraUpdatesCost = Number((extraUpdatesCount * EXTRA_UPDATE_FEE).toFixed(2));

  // Regra oficial: A taxa de criação só é cobrada no 1º mês e nele NÃO há mensalidade.
  const baseChargeThisMonth = isFirstMonth ? creationFee : maintenanceFee;
  const monthlyMaintenanceChargeThisMonth = isFirstMonth ? 0 : maintenanceFee;
  const totalDueThisMonth = Number((baseChargeThisMonth + extraUpdatesCost).toFixed(2));

  return {
    planKey,
    plan,
    maintenanceFee,
    creationFee,
    isFirstMonth,
    updatesUsed,
    isUnlimited,
    includedUpdatesLabel: isUnlimited ? 'Ilimitadas' : `${plan.maxUpdates}`,
    extraUpdatesCount,
    extraUpdatesCost,
    baseChargeThisMonth,
    monthlyMaintenanceChargeThisMonth,
    totalDueThisMonth,
  };
};

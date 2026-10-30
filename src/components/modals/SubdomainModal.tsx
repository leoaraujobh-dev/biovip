import React, { useState } from 'react';
import { Globe, X, Copy, Check, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { safeCopyText } from '../../utils/formatters';

export interface SubdomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  landingConfig: any;
  updateLandingConfig: (key: string, val: any) => void;
  persistLandingConfigEverywhere: (cfg: any) => void;
  getActiveAsaasApiKey: () => string;
  getActiveAsaasEnv: () => 'sandbox' | 'production';
  updateAsaasSettings: (patch: { apiKey?: string; environment?: 'sandbox' | 'production' }) => void;
  asaasServerConfigured: boolean;
  asaasStatusTesting: boolean;
  asaasTestResult: any;
  setAsaasTestResult: (res: any) => void;
  handleTestAsaasConnection: () => Promise<void> | void;
  openCreatorSubdomain: () => void;
  openPublicSalesLanding: () => void;
  applyConfiguredPlanPricesToExistingClients: () => void;
  syncAllEightRealMicrositesToStudio?: () => void;
  showToast: (msg: string) => void;
}

export const SubdomainModal: React.FC<SubdomainModalProps> = ({
  isOpen,
  onClose,
  landingConfig,
  updateLandingConfig,
  persistLandingConfigEverywhere,
  getActiveAsaasApiKey,
  getActiveAsaasEnv,
  updateAsaasSettings,
  asaasServerConfigured,
  asaasStatusTesting,
  asaasTestResult,
  setAsaasTestResult,
  handleTestAsaasConnection,
  openCreatorSubdomain,
  openPublicSalesLanding,
  applyConfiguredPlanPricesToExistingClients,
  syncAllEightRealMicrositesToStudio,
  showToast,
}) => {
  const [copiedSubdomainLink, setCopiedSubdomainLink] = useState(false);

  if (!isOpen) return null;

  const cleanSub = (landingConfig.creatorSubdomain || 'criador').toLowerCase().replace(/[^a-z0-9-]/g, '') || 'criador';
  const cleanDomain = (landingConfig.baseDomain || 'biovip.com.br').toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const fullSubdomainUrl = `https://${cleanSub}.${cleanDomain}`;
  const localCreatorUrl = typeof window !== 'undefined' ? `${window.location.origin}/${cleanSub}` : `/${cleanSub}`;

    return (
      <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8 text-neutral-100">
          <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-400 block">
                Acesso Exclusivo do Proprietário · Sem Login
              </span>
              <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" />
                Subdomínio, Vitrine & Portal de Pagamento Externo
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Configure seu domínio, dados da página de vendas e os links do portal externo de pagamento (Kiwify, Asaas, Mercado Pago, Stripe, etc.).
              </p>
            </div>
            <button
              type="button"
              onClick={() => onClose()}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Configuração de Subdomínio e Domínio Base */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 block mb-1.5">
                Prefixo do Subdomínio do Criador
              </label>
              <input
                type="text"
                value={landingConfig.creatorSubdomain}
                onChange={(e) => updateLandingConfig('creatorSubdomain', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="criador"
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 block mb-1.5">
                Seu Domínio Principal de Vendas
              </label>
              <input
                type="text"
                value={landingConfig.baseDomain}
                onChange={(e) => updateLandingConfig('baseDomain', e.target.value.toLowerCase().trim())}
                placeholder="seusite.com.br"
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 font-mono focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Box com as Rotas Ativas */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block">
                  1. Subdomínio Oficial do Criador (Produção DNS)
                </span>
                <code className="text-xs font-mono text-amber-300 font-bold">{fullSubdomainUrl}</code>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const ok = await safeCopyText(fullSubdomainUrl);
                  if (ok) {
                    setCopiedSubdomainLink(true);
                    setTimeout(() => setCopiedSubdomainLink(false), 2500);
                    showToast('🔗 Link do subdomínio copiado!');
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-neutral-700"
              >
                {copiedSubdomainLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copiedSubdomainLink ? 'Copiado!' : 'Copiar Subdomínio'}</span>
              </button>
            </div>

            <div className="pt-2.5 border-t border-neutral-800/80 flex items-center justify-between gap-2 flex-wrap">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block">
                  2. Rota Direta Imediata (Funciona neste navegador agora)
                </span>
                <code className="text-xs font-mono text-emerald-400 font-bold">{localCreatorUrl}</code>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openCreatorSubdomain();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Acessar Criador Agora</span>
              </button>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed pt-1">
              Para ativar na Vercel/Hostinger/Cloudflare, adicione um registro <strong className="text-neutral-200">CNAME</strong> com nome <code className="text-amber-300 font-mono">{cleanSub}</code> apontando para o mesmo destino do seu domínio principal. O sistema detecta automaticamente o hostname <code className="text-amber-300 font-mono">{cleanSub}.{cleanDomain}</code> e abre direto o Studio.
            </p>
          </div>

          {/* Configuração Oficial do Gateway Asaas (API + PIX + Cartão/Boleto) */}
          <div className="pt-3 border-t border-neutral-800 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-400 block">
                  ⚡ Gateway de Pagamentos Asaas (API PIX & Links de Planos)
                </span>
                <span className="text-[10.5px] text-neutral-400">
                  Configure sua chave <code className="text-amber-300">$aact_...</code> para gerar QR Code PIX oficial e links de assinatura.
                </span>
              </div>
              <button
                type="button"
                disabled={asaasStatusTesting}
                onClick={handleTestAsaasConnection}
                className="px-3 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/40 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${asaasStatusTesting ? 'animate-spin' : ''}`} />
                <span>{asaasStatusTesting ? 'Testando...' : 'Testar Conexão Asaas'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-neutral-950 p-3.5 rounded-xl border border-amber-500/30">
              <div className="sm:col-span-7">
                <label className="text-[10px] text-neutral-400 font-mono uppercase block mb-1">
                  Chave de API Asaas (access_token)
                </label>
                <input
                  type="password"
                  value={getActiveAsaasApiKey()}
                  onChange={(e) => updateAsaasSettings({ apiKey: e.target.value })}
                  placeholder="$aact_YTU5YTE0M2M6N2I4..."
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-5">
                <label className="text-[10px] text-neutral-400 font-mono uppercase block mb-1">
                  Ambiente da Conta Asaas
                </label>
                <select
                  value={getActiveAsaasEnv()}
                  onChange={(e) => updateAsaasSettings({ environment: e.target.value as 'sandbox' | 'production' })}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 font-semibold focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value="sandbox">🧪 Sandbox (Testes)</option>
                  <option value="production">🚀 Produção (Conta Real)</option>
                </select>
              </div>
              <div className="sm:col-span-12">
                <label className="text-[10px] text-neutral-400 font-mono uppercase block mb-1">
                  URL do Webhook Asaas (Cole em Minha Conta &gt; Integração &gt; Webhooks)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://${cleanDomain}/api/asaas/webhook`}
                    className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-emerald-300 font-mono select-all"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      await safeCopyText(`https://${cleanDomain}/api/asaas/webhook`);
                      showToast('📋 URL do Webhook do Asaas copiada!');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-semibold border border-neutral-700 cursor-pointer shrink-0"
                  >
                    Copiar Webhook
                  </button>
                </div>
              </div>
            </div>

            {asaasTestResult && (
              <div
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                  asaasTestResult.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                }`}
              >
                <span>{asaasTestResult.message}</span>
                <button
                  type="button"
                  onClick={() => setAsaasTestResult(null)}
                  className="text-neutral-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">
                  Nome do Portal Exibido na Confirmação
                </label>
                <input
                  type="text"
                  value={landingConfig.checkoutPortalName ?? 'Asaas'}
                  onChange={(e) => updateLandingConfig('checkoutPortalName', e.target.value)}
                  placeholder="Ex: Asaas, Kiwify, Mercado Pago, Stripe"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-emerald-300 font-semibold focus:border-emerald-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">
                  Link de Pagamento Asaas — Plano Básico
                </label>
                <input
                  type="text"
                  value={landingConfig.checkoutUrlBasic || ''}
                  onChange={(e) => updateLandingConfig('checkoutUrlBasic', e.target.value)}
                  placeholder="https://www.asaas.com/c/seu-link-basico"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 font-mono focus:border-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">
                  Link de Pagamento Asaas — Plano Pro (Mais Escolhido)
                </label>
                <input
                  type="text"
                  value={landingConfig.checkoutUrlPro || ''}
                  onChange={(e) => updateLandingConfig('checkoutUrlPro', e.target.value)}
                  placeholder="https://www.asaas.com/c/seu-link-pro"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 font-mono focus:border-emerald-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">
                  Link de Pagamento Asaas — Plano VIP
                </label>
                <input
                  type="text"
                  value={landingConfig.checkoutUrlVip || ''}
                  onChange={(e) => updateLandingConfig('checkoutUrlVip', e.target.value)}
                  placeholder="https://www.asaas.com/c/seu-link-vip"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 font-mono focus:border-emerald-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Configurações Comerciais da Landing Page */}
          <div className="pt-2 border-t border-neutral-800 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 block">
              Dados da Sua Landing Page de Vendas
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Nome da Sua Marca / Estúdio</label>
                <input
                  type="text"
                  value={landingConfig.agencyBrandName}
                  onChange={(e) => updateLandingConfig('agencyBrandName', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Seu WhatsApp Recebedor de Pedidos</label>
                <input
                  type="text"
                  value={landingConfig.agencyWhatsapp}
                  onChange={(e) => updateLandingConfig('agencyWhatsapp', e.target.value)}
                  placeholder="5511999999999"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">E-mail de Contato Oficial BioVip</label>
                <input
                  type="email"
                  value={landingConfig.agencyEmail || 'contato@biovip.com.br'}
                  onChange={(e) => updateLandingConfig('agencyEmail', e.target.value.trim())}
                  placeholder="contato@biovip.com.br"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">
                  Link do Criador no Rodapé dos Microsites
                </label>
                <input
                  type="text"
                  value={landingConfig.creatorFooterUrl || ''}
                  onChange={(e) => updateLandingConfig('creatorFooterUrl', e.target.value)}
                  placeholder={typeof window !== 'undefined' ? window.location.origin : 'https://biovip.com.br'}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">
                  Frase de Chamada no Rodapé do Microsite
                </label>
                <input
                  type="text"
                  value={landingConfig.creatorFooterLabel ?? 'Quero um microsite assim'}
                  onChange={(e) => updateLandingConfig('creatorFooterLabel', e.target.value)}
                  placeholder="Quero um microsite assim"
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Criação (10 Primeiros)</label>
                <input
                  type="text"
                  value={landingConfig.priceEssential}
                  onChange={(e) => updateLandingConfig('priceEssential', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Criação Pro / VIP</label>
                <input
                  type="text"
                  value={landingConfig.pricePro}
                  onChange={(e) => updateLandingConfig('pricePro', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Criação Tabela Cheia</label>
                <input
                  type="text"
                  value={landingConfig.priceScale}
                  onChange={(e) => updateLandingConfig('priceScale', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-100 font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Recorrência Mensal & Quantidade de Alterações por Plano */}
            <div className="pt-2 border-t border-neutral-800/80 space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-400 block">
                  Recorrência Mensal & Quantidade de Alterações nos Planos
                </span>
                <button
                  type="button"
                  onClick={applyConfiguredPlanPricesToExistingClients}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold cursor-pointer transition"
                >
                  Aplicar aos Clientes Atuais
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Plano Básico */}
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-emerald-300 block">01 · Plano Básico</span>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">Recorrência (R$/mês)</label>
                    <input
                      type="text"
                      value={landingConfig.recurringBasic ?? '29,90'}
                      onChange={(e) => updateLandingConfig('recurringBasic', e.target.value)}
                      placeholder="29,90"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-emerald-300 font-mono font-bold focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">Qtd. Alterações/mês</label>
                    <input
                      type="text"
                      value={landingConfig.updatesBasic ?? '1'}
                      onChange={(e) => updateLandingConfig('updatesBasic', e.target.value)}
                      placeholder="Ex: 1"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Plano Pro */}
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-amber-400/30 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-amber-300 block">02 · Plano Pro</span>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">Recorrência (R$/mês)</label>
                    <input
                      type="text"
                      value={landingConfig.recurringPro ?? '49,90'}
                      onChange={(e) => updateLandingConfig('recurringPro', e.target.value)}
                      placeholder="49,90"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-emerald-300 font-mono font-bold focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">Qtd. Alterações/mês</label>
                    <input
                      type="text"
                      value={landingConfig.updatesPro ?? '4'}
                      onChange={(e) => updateLandingConfig('updatesPro', e.target.value)}
                      placeholder="Ex: 4"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Plano VIP */}
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-amber-400 block">03 · Plano VIP</span>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">Recorrência (R$/mês)</label>
                    <input
                      type="text"
                      value={landingConfig.recurringVip ?? '79,90'}
                      onChange={(e) => updateLandingConfig('recurringVip', e.target.value)}
                      placeholder="79,90"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-emerald-300 font-mono font-bold focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">Qtd. Alterações/mês</label>
                    <input
                      type="text"
                      value={landingConfig.updatesVip ?? 'Ilimitadas'}
                      onChange={(e) => updateLandingConfig('updatesVip', e.target.value)}
                      placeholder="Ilimitadas ou nº"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 flex-wrap">
            <button
              type="button"
              onClick={syncAllEightRealMicrositesToStudio}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold cursor-pointer transition"
            >
              Salvar os 8 Microsites Reais no Painel
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openPublicSalesLanding();
                }}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold cursor-pointer transition"
              >
                Ver Landing Page
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  showToast('✅ Configurações de subdomínio e checkout salvas!');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold cursor-pointer transition"
              >
                Salvar & Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

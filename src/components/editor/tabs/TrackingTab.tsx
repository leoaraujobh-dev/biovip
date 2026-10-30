import React from 'react';
import {
  Target,
  RotateCcw,
  Plus,
  MessageCircle,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { SavedMicrosite } from '../../../types/microsite';
import { safeCopyText } from '../../../utils/formatters';

export interface TrackingTabProps {
  data: typeof INITIAL_DATA;
  setData: React.Dispatch<React.SetStateAction<typeof INITIAL_DATA>>;
  editingSiteId: string | null;
  savedSites: SavedMicrosite[];
  sessionAnalytics: {
    whatsappClicks: number;
    pageViews: number;
    trafficSources: {
      instagram: number;
      googleMaps: number;
      paidAds: number;
      tiktok: number;
      direct: number;
    };
  };
  openResetTrackingModal: (mode: 'current' | 'all') => void;
  recordWhatsappClick: () => void;
  updateConversion: (key: string, val: any) => void;
  showToast: (msg: string) => void;
}

export function TrackingTab({
  data,
  editingSiteId,
  savedSites,
  sessionAnalytics,
  openResetTrackingModal,
  recordWhatsappClick,
  updateConversion,
  showToast,
}: TrackingTabProps) {
  const activeSite = editingSiteId ? savedSites.find(s => s.id === editingSiteId) : null;
  const clicks = activeSite ? (activeSite.whatsappClicks || 0) : sessionAnalytics.whatsappClicks;
  const views = activeSite ? (activeSite.pageViews || 0) : sessionAnalytics.pageViews;
  const convRate = views > 0 ? ((clicks / views) * 100).toFixed(1) : '0.0';
  const sources = activeSite?.trafficSources || sessionAnalytics.trafficSources;
  const totalSourceHits =
    (sources.instagram || 0) +
    (sources.googleMaps || 0) +
    (sources.paidAds || 0) +
    (sources.tiktok || 0) +
    (sources.direct || 0);
  const calcPct = (count: number) => (totalSourceHits > 0 ? Math.round((count / totalSourceHits) * 100) : 0);
  const currentSubdomain =
    activeSite?.subdomain || data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'cliente';
  const fullDomain = activeSite?.customDomain || `biovip.com.br/${currentSubdomain}`;

  return (
    <div className="space-y-5">
      {/* CARD 1: PAINEL DE CONTROLE DE RASTREAMENTO & MÉTRICAS EM TEMPO REAL */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-850 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-100 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-400" />
                Rastreamento & Conversões em Tempo Real
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Monitorando Ativo
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Microsite: <strong className="text-amber-300">{activeSite ? activeSite.clientName : data.profile.name}</strong> · https://{fullDomain}
            </p>
          </div>

          {/* BOTÕES PRINCIPAIS DE AÇÃO DE RASTREAMENTO */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => openResetTrackingModal('current')}
              className="px-3.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-red-200 font-bold text-xs flex items-center gap-1.5 border border-red-500/40 cursor-pointer transition shadow"
              title="Zerar todas as métricas de conversão e visitas deste microsite"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>Zerar Rastreamento Deste Site</span>
            </button>

            <button
              type="button"
              onClick={() => recordWhatsappClick()}
              className="px-3 py-1.5 rounded-lg bg-neutral-850 hover:bg-neutral-800 text-emerald-300 font-semibold text-xs flex items-center gap-1.5 border border-neutral-750 cursor-pointer transition"
              title="Simular um clique no botão de WhatsApp para testar a telemetria"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simular Clique (+1)</span>
            </button>

            <button
              type="button"
              onClick={() => openResetTrackingModal('all')}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-neutral-200 text-xs flex items-center gap-1 cursor-pointer border border-neutral-800 transition"
              title="Zerar rastreamento de todos os clientes do painel de uma só vez"
            >
              <RotateCcw className="w-3 h-3 text-neutral-400" />
              <span>Zerar Todos</span>
            </button>
          </div>
        </div>

        {/* STATS COUNTERS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-400 block font-medium uppercase tracking-wider">Visualizações</span>
            <div className="text-xl font-black text-neutral-100 tabular-nums">
              {views}
            </div>
            <span className="text-[9px] text-neutral-500">Acessos à página</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-400 block font-medium uppercase tracking-wider">Cliques WhatsApp</span>
            <div className="text-xl font-black text-emerald-400 tabular-nums flex items-center justify-center gap-1">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              {clicks}
            </div>
            <span className="text-[9px] text-neutral-500">Leads que iniciaram conversa</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-400 block font-medium uppercase tracking-wider">Taxa de Conversão</span>
            <div className="text-xl font-black text-amber-300 tabular-nums flex items-center justify-center gap-1">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              {convRate}%
            </div>
            <span className="text-[9px] text-neutral-500">Cliques WA / Visitas</span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-400 block font-medium uppercase tracking-wider">Eventos de Pixel</span>
            <div className="text-xl font-black text-sky-400 tabular-nums">
              {data.conversion.metaPixelId ? (clicks + views) : 0}
            </div>
            <span className="text-[9px] text-neutral-500">{data.conversion.metaPixelId ? 'PageView + Leads' : 'Pixel inativo'}</span>
          </div>
        </div>

        {clicks === 0 && views === 0 && (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Rastreamento zerado! A página está 100% pronta para início de campanhas limpas ou entrega ao cliente.</span>
          </div>
        )}
      </div>

      {/* CARD 2: ORIGEM DOS ACESSOS & RASTREAMENTO POR UTMS DINÂMICO */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" /> Origem dos Acessos & Rastreamento por UTMs
          </span>
          <span className="text-[10px] text-neutral-400">Distribuição dinâmica</span>
        </div>

        <p className="text-[11px] text-neutral-400">
          Adicione tags UTMs aos seus links na Bio do Instagram, Google Meu Negócio ou Campanhas de Anúncios. O sistema segmenta automaticamente cada clique.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-center text-xs">
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-0.5">
            <span className="text-[10px] text-neutral-400 block font-bold">📸 Instagram</span>
            <span className="text-sm font-black text-amber-400">{calcPct(sources.instagram || 0)}%</span>
            <span className="text-[9px] text-neutral-500 block">({sources.instagram || 0} visitas)</span>
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-0.5">
            <span className="text-[10px] text-neutral-400 block font-bold">📍 Google Maps</span>
            <span className="text-sm font-black text-emerald-400">{calcPct(sources.googleMaps || 0)}%</span>
            <span className="text-[9px] text-neutral-500 block">({sources.googleMaps || 0} visitas)</span>
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-0.5">
            <span className="text-[10px] text-neutral-400 block font-bold">🎯 Tráfego Pago</span>
            <span className="text-sm font-black text-sky-400">{calcPct(sources.paidAds || 0)}%</span>
            <span className="text-[9px] text-neutral-500 block">({sources.paidAds || 0} visitas)</span>
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-0.5">
            <span className="text-[10px] text-neutral-400 block font-bold">🎵 TikTok</span>
            <span className="text-sm font-black text-purple-400">{calcPct(sources.tiktok || 0)}%</span>
            <span className="text-[9px] text-neutral-500 block">({sources.tiktok || 0} visitas)</span>
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-0.5">
            <span className="text-[10px] text-neutral-400 block font-bold">🌐 Direto / Outros</span>
            <span className="text-sm font-black text-neutral-300">{calcPct(sources.direct || 0)}%</span>
            <span className="text-[9px] text-neutral-500 block">({sources.direct || 0} visitas)</span>
          </div>
        </div>

        {/* GERADOR RÁPIDO DE LINKS RASTREADOS */}
        <div className="mt-3 p-3 rounded-lg bg-neutral-900/60 border border-neutral-850 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 block">
            🔗 Gerador de Links com Rastreamento (Copie e cole nos seus perfis):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded bg-neutral-950 border border-neutral-800">
              <div className="truncate pr-2">
                <span className="text-neutral-400 font-bold block text-[10px]">Link para Bio do Instagram:</span>
                <span className="font-mono text-amber-300 text-[10px]">https://{fullDomain}?utm_source=instagram&utm_medium=bio</span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  await safeCopyText(`https://${fullDomain}?utm_source=instagram&utm_medium=bio`);
                  showToast('📋 Link rastreado do Instagram copiado!');
                }}
                className="px-2 py-1 rounded bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-amber-300 font-bold text-[10px] transition cursor-pointer shrink-0"
              >
                Copiar
              </button>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-neutral-950 border border-neutral-800">
              <div className="truncate pr-2">
                <span className="text-neutral-400 font-bold block text-[10px]">Link para Google Meu Negócio:</span>
                <span className="font-mono text-emerald-300 text-[10px]">https://{fullDomain}?utm_source=google_maps&utm_medium=perfil</span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  await safeCopyText(`https://${fullDomain}?utm_source=google_maps&utm_medium=perfil`);
                  showToast('📋 Link rastreado do Google Maps copiado!');
                }}
                className="px-2 py-1 rounded bg-neutral-800 hover:bg-emerald-500 hover:text-neutral-950 text-emerald-300 font-bold text-[10px] transition cursor-pointer shrink-0"
              >
                Copiar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 3: CONFIGURAÇÃO DE PIXELS */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
          <Target className="w-4 h-4" /> Configuração de Pixels de Conversão (Tráfego Pago)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] text-neutral-300 block mb-1">Meta Pixel ID (Facebook / Instagram Ads)</label>
            <input
              type="text"
              placeholder="Ex: 987654321098765"
              value={data.conversion.metaPixelId}
              onChange={(e) => updateConversion('metaPixelId', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono"
            />
            <span className="text-[9.5px] text-neutral-500 mt-1 block">
              Dispara eventos automáticos: <code>PageView</code> e <code>Lead</code> (ao clicar no WhatsApp)
            </span>
          </div>

          <div>
            <label className="text-[11px] text-neutral-300 block mb-1">Google Analytics 4 (GA4 Measurement ID)</label>
            <input
              type="text"
              placeholder="Ex: G-XXXXXXXXXX"
              value={data.conversion.googleAnalyticsId}
              onChange={(e) => updateConversion('googleAnalyticsId', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono"
            />
            <span className="text-[9.5px] text-neutral-500 mt-1 block">
              Rastreia engajamento e cliques nos serviços e botões do microsite
            </span>
          </div>
        </div>
      </div>

      {/* CARD 4: MENSAGEM DO WHATSAPP */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
        <span className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4 text-emerald-400" /> Mensagem Inteligente do WhatsApp (com Tags de Conversão)
        </span>
        <textarea
          rows={3}
          value={data.conversion.defaultWhatsappMsg}
          onChange={(e) => updateConversion('defaultWhatsappMsg', e.target.value)}
          className="w-full px-3 py-2 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200 resize-none font-mono"
        />
        <p className="text-[10px] text-neutral-500">
          Variáveis dinâmicas disponíveis: <code className="text-amber-400">{'{nome}'}</code>, <code className="text-amber-400">{'{servico}'}</code>, <code className="text-amber-400">{'{data}'}</code>
        </p>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Plus,
  Server,
  Copy,
  Edit3,
  MessageCircle,
  Instagram,
  Palette,
  MapPin,
  AlertCircle,
  ShieldCheck,
  ExternalLink,
  Check,
  Save,
  User,
  Tag,
  Loader2,
  CheckCircle2,
  Send,
  Wand2,
} from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { NICHE_TEMPLATES, NicheTemplate } from '../../../constants/templates';

export interface QuickCreateTabProps {
  data: typeof INITIAL_DATA;
  setData: React.Dispatch<React.SetStateAction<typeof INITIAL_DATA>>;
  editingSiteId: string | null;
  setActiveTab: (tabId: string) => void;
  handleStartNewMicrosite: () => void;
  quickCreationMode: 'instant_ai' | 'gemini_script' | 'manual_quick' | 'niche_templates';
  setQuickCreationMode: React.Dispatch<React.SetStateAction<'instant_ai' | 'gemini_script' | 'manual_quick' | 'niche_templates'>>;
  aiForm: {
    businessName: string;
    whatsapp: string;
    instagram: string;
    googleMaps: string;
    businessNiche: string;
    selectedPalette: string;
  };
  setAiForm: React.Dispatch<React.SetStateAction<any>>;
  applyThemePreset: (themeId: string) => void;
  aiError: string | null;
  setAiError: React.Dispatch<React.SetStateAction<string | null>>;
  aiGenerating: boolean;
  aiStepIndex: number;
  handleAiGenerateMicrosite: () => void;
  handleCopyGeminiScript: (param: boolean) => void;
  copiedGeminiScript: boolean;
  buildGeminiSequentialScript: (param: boolean) => string;
  geminiPastedCode: string;
  setGeminiPastedCode: React.Dispatch<React.SetStateAction<string>>;
  geminiAutoFetchInstaPhotos: boolean;
  setGeminiAutoFetchInstaPhotos: React.Dispatch<React.SetStateAction<boolean>>;
  geminiAutoCreateAdminRecord: boolean;
  setGeminiAutoCreateAdminRecord: React.Dispatch<React.SetStateAction<boolean>>;
  geminiImporting: boolean;
  handleImportGeminiCode: () => void;
  handleSaveMicrosite: (param: boolean) => void;
}

export function QuickCreateTab({
  data,
  setData,
  editingSiteId,
  setActiveTab,
  handleStartNewMicrosite,
  quickCreationMode,
  setQuickCreationMode,
  aiForm,
  setAiForm,
  applyThemePreset,
  aiError,
  setAiError,
  aiGenerating,
  aiStepIndex,
  handleAiGenerateMicrosite,
  handleCopyGeminiScript,
  copiedGeminiScript,
  buildGeminiSequentialScript,
  geminiPastedCode,
  setGeminiPastedCode,
  geminiAutoFetchInstaPhotos,
  setGeminiAutoFetchInstaPhotos,
  geminiAutoCreateAdminRecord,
  setGeminiAutoCreateAdminRecord,
  geminiImporting,
  handleImportGeminiCode,
  handleSaveMicrosite,
}: QuickCreateTabProps) {
  const [livePreviewLoading, setLivePreviewLoading] = useState(false);
  const [livePreviewData, setLivePreviewData] = useState<any>(null);
  const [copiedProposal, setCopiedProposal] = useState(false);

  // Busca a prévia visual instantânea do Instagram com debounce de 600ms
  useEffect(() => {
    const rawInput = (aiForm.instagram || '').trim();
    if (!rawInput || rawInput.length < 3) {
      setLivePreviewData(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLivePreviewLoading(true);
        const res = await fetch('/api/instagram-preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ instagram: rawInput }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.profile) {
            setLivePreviewData(json.profile);
            // Salva perfil em cache para geração instantânea e preenche nome caso vazio
            setAiForm((p: any) => ({
              ...p,
              cachedProfile: json.profile,
              ...(p.businessName ? {} : { businessName: json.profile.fullName || json.profile.cleanBusinessName }),
            }));
            // Sugestão automática de paleta
            if (json.profile.suggestedPalette?.paletteId && !aiForm.selectedPalette) {
              setAiForm((p: any) => ({ ...p, selectedPalette: json.profile.suggestedPalette.paletteId }));
              applyThemePreset(json.profile.suggestedPalette.paletteId);
            }
          } else {
            setLivePreviewData(null);
          }
        }
      } catch {
        setLivePreviewData(null);
      } finally {
        setLivePreviewLoading(false);
      }
    }, 650);

    return () => clearTimeout(timer);
  }, [aiForm.instagram]);

  const generateWhatsappProposalText = () => {
    const clientName = aiForm.businessName || livePreviewData?.fullName || data.profile.name || 'Empresa';
    const cleanPhone = (aiForm.whatsapp || '').replace(/\D/g, '');
    const previewUrl = window.location.origin;

    return `Olá ${clientName}! Tudo bem?

Estava acompanhando o trabalho impecável de vocês no Instagram e vi o quanto o atendimento e procedimentos de vocês são diferenciados.

Percebi que o link atual da bio de vocês não valoriza a autoridade da marca no celular. Como desenvolvo microsites de alta conversão, preparei uma versão exclusiva com as fotos reais e serviços de vocês pronta para você ver:

👉 ${previewUrl}

A página conta com agendamento direto no seu WhatsApp, galeria de destaques e carregamento instantâneo. Dá uma olhadinha no seu celular e me conta o que achou! Não tem custo nenhum para visualizar.`;
  };

  const handleCopyProposal = () => {
    const text = generateWhatsappProposalText();
    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 3000);
  };
  return (
    <div className="space-y-6">
      {/* Card de Status do Microsite Ativo */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/30 border border-neutral-800 shadow-md flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">
                {editingSiteId ? `Editando: ${data.profile.name || 'Microsite do Cliente'}` : 'Novo Microsite'}
              </h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                editingSiteId ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-neutral-800 text-neutral-400'
              }`}>
                {editingSiteId ? 'SALVO NO PAINEL' : 'EM EDIÇÃO'}
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              {editingSiteId
                ? 'As alterações feitas aqui refletem instantaneamente no simulador ao lado.'
                : 'Preencha os dados abaixo para gerar e cadastrar o microsite do cliente em segundos.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleStartNewMicrosite}
            className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Iniciar Novo do Zero</span>
          </button>
          {editingSiteId && (
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold border border-neutral-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Server className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver no Painel</span>
            </button>
          )}
        </div>
      </div>

      {/* Seletor de Modo de Criação Simplificado */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-neutral-900/90 rounded-2xl border border-neutral-800">
        <button
          type="button"
          onClick={() => setQuickCreationMode('niche_templates')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
            quickCreationMode === 'niche_templates'
              ? 'bg-amber-400 text-neutral-950 shadow-md font-black'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>💎 Modelos Prontos</span>
        </button>
        <button
          type="button"
          onClick={() => setQuickCreationMode('instant_ai')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
            quickCreationMode === 'instant_ai'
              ? 'bg-amber-400 text-neutral-950 shadow-md font-black'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>⚡ Criar com IA</span>
        </button>
        <button
          type="button"
          onClick={() => setQuickCreationMode('gemini_script')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
            quickCreationMode === 'gemini_script'
              ? 'bg-amber-400 text-neutral-950 shadow-md font-black'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          <Copy className="w-3.5 h-3.5" />
          <span>📋 Script Gemini</span>
        </button>
        <button
          type="button"
          onClick={() => setQuickCreationMode('manual_quick')}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
            quickCreationMode === 'manual_quick'
              ? 'bg-amber-400 text-neutral-950 shadow-md font-black'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>✍️ Manual</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODO 0: CATÁLOGO DE MODELOS PRONTOS POR NICHO (1 CLIQUE)                 */}
      {/* ========================================================================= */}
      {quickCreationMode === 'niche_templates' && (
        <div className="space-y-4 p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Modelos Profissionais Prontos por Nicho</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Escolha um nicho abaixo para carregar imediatamente a paleta, copywriting, imagens e serviços validados para alta conversão.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {NICHE_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="group p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-400/60 transition-all flex flex-col justify-between gap-3 shadow-md hover:shadow-amber-500/10"
              >
                <div className="space-y-2">
                  <div className="relative h-28 w-full rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={tmpl.previewImage}
                      alt={tmpl.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-400 text-neutral-950 shadow">
                      {tmpl.badge}
                    </span>
                    <span className="absolute bottom-2 left-2 text-xs font-bold text-white drop-shadow">
                      {tmpl.nicheName}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white truncate">{tmpl.title}</h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-2 mt-0.5 leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setData(JSON.parse(JSON.stringify(tmpl.sampleData)));
                    applyThemePreset(tmpl.theme);
                    handleSaveMicrosite(false);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-400 hover:text-neutral-950 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-500/30 hover:border-amber-300 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Carregar este Modelo</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 1: CRIAÇÃO INSTANTÂNEA POR IA (3 CAMPOS ESSENCIAIS + BOTÃO) */}
      {/* ========================================================================= */}
      {quickCreationMode === 'instant_ai' && (
        <div className="space-y-5 p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Crie o Microsite em 3 Campos Rápidos</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              A inteligência artificial extrai as 6 fotos com mais curtidas do Instagram, mapeia os serviços e gera todo o design pronto.
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Campo 1: Nome do Negócio */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                1. Nome do Negócio ou Profissional <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Studio Mariana Lash, Dr. Carlos Eduardo, Barbearia Nobre"
                value={aiForm.businessName}
                onChange={(e) => setAiForm((p: any) => ({ ...p, businessName: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-sm text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            {/* Campo 2: WhatsApp de Atendimento */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>2. WhatsApp de Atendimento (com DDD)</span>
                <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: (11) 98765-4321 ou 11987654321"
                value={aiForm.whatsapp}
                onChange={(e) => setAiForm((p: any) => ({ ...p, whatsapp: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-sm text-emerald-300 placeholder-neutral-500 focus:outline-none font-mono"
              />
              <span className="text-[10px] text-neutral-500 block mt-1">
                Todos os botões de agendamento e CTA do microsite serão conectados diretamente a este WhatsApp.
              </span>
            </div>

            {/* Campo 3: Instagram do Cliente */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>3. Instagram do Cliente (@usuário ou link)</span>
                <span className="text-xs text-neutral-500 font-normal">(Recomendado)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-semibold">@</span>
                <input
                  type="text"
                  placeholder="perfil.do.cliente"
                  value={aiForm.instagram.replace(/^@/, '')}
                  onChange={(e) => setAiForm((p: any) => ({ ...p, instagram: e.target.value.trim() }))}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-sm text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>
              <span className="text-[10px] text-neutral-500 block mt-1">
                Puxa automaticamente a bio, o nicho e as <strong>6 fotos com mais curtidas</strong> para a galeria.
              </span>

              {/* Indicador de carregamento da prévia */}
              {livePreviewLoading && (
                <div className="mt-2.5 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-2.5 text-xs text-amber-300 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
                  <span>Buscando perfil e fotos no Instagram em tempo real...</span>
                </div>
              )}

              {/* Card de Prévia Visual Instantânea do Instagram */}
              {livePreviewData && !livePreviewLoading && (
                <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-br from-neutral-900/90 via-neutral-900 to-neutral-950 border border-amber-500/30 space-y-3 shadow-lg">
                  {/* Cabeçalho do Perfil Localizado */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative">
                        <img
                          src={livePreviewData.avatarUrl}
                          alt={livePreviewData.fullName || livePreviewData.username}
                          className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/80 shadow-md bg-neutral-900"
                          onError={(e: any) => { e.target.style.display = 'none'; }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center text-[10px] font-black border border-neutral-900">
                          ✓
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white truncate">
                            {livePreviewData.fullName || `@${livePreviewData.username}`}
                          </span>
                          <span className="text-[10px] text-pink-400 font-mono">@{livePreviewData.username}</span>
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate flex items-center gap-2">
                          {livePreviewData.followersCount > 0 && (
                            <span><strong>{livePreviewData.followersCount.toLocaleString('pt-BR')}</strong> seguidores</span>
                          )}
                          {livePreviewData.bio && (
                            <span className="text-[10px] text-neutral-500 truncate max-w-[200px]" title={livePreviewData.bio}>
                              • {livePreviewData.bio}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Localizado</span>
                    </span>
                  </div>

                  {/* Sugestão de Paleta Harmônica */}
                  {livePreviewData.suggestedPalette && (
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-neutral-950/70 border border-neutral-800 text-[11px]">
                      <div className="flex items-center gap-1.5 truncate">
                        <Wand2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-neutral-300">
                          Paleta Recomendada: <strong className="text-amber-300">{livePreviewData.suggestedPalette.paletteName}</strong>
                        </span>
                        <span className="text-[10px] text-neutral-500 truncate hidden sm:inline">({livePreviewData.suggestedPalette.reason})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAiForm((p: any) => ({ ...p, selectedPalette: livePreviewData.suggestedPalette.paletteId }));
                          applyThemePreset(livePreviewData.suggestedPalette.paletteId);
                        }}
                        className="shrink-0 px-2.5 py-1 rounded-md bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-[10px] font-bold cursor-pointer transition"
                      >
                        Aplicar Cores
                      </button>
                    </div>
                  )}

                  {/* 6 Fotos Mais Curtidas para a Galeria */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
                      <span className="font-semibold text-neutral-300">
                        📸 6 Fotos Mais Curtidas (Galeria do Microsite):
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">Foto de perfil no cabeçalho</span>
                    </div>
                    <div className="grid grid-cols-6 gap-1.5">
                      {(livePreviewData.posts || []).slice(0, 6).map((post: any, idx: number) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 group">
                          <img
                            src={post.displayUrl}
                            alt={`Foto ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-200"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[9px] text-white font-bold">
                            ❤️ {post.likesCount ? (post.likesCount >= 1000 ? `${(post.likesCount/1000).toFixed(1)}k` : post.likesCount) : idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Seleção rápida de Paleta de Cores em 1 Clique */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>4. Escolha a Paleta de Cores Inicial (1 Clique)</span>
                </span>
                <span className="text-[10px] text-neutral-500">
                  Pode ser trocada a qualquer momento sem perder dados
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'darkGold', name: 'Dark Luxury Gold', bg: '#0c0b0b', accent: '#d4af37', label: 'Dark & Ouro' },
                  { id: 'roseGoldQuartz', name: 'Rose Gold Quartzo', bg: '#1c1618', accent: '#dfa2aa', label: 'Rose Gold' },
                  { id: 'navyLaw', name: 'Navy Royal & Gold', bg: '#0f172a', accent: '#d4af37', label: 'Navy Royal' },
                  { id: 'emeraldPro', name: 'Esmeralda Nobre', bg: '#081c15', accent: '#52b788', label: 'Esmeralda' },
                  { id: 'clinicalClean', name: 'Clean & Minimal', bg: '#f8fafc', accent: '#0284c7', label: 'Clean Claro' },
                  { id: 'velvetGlamour', name: 'Velvet Glamour', bg: '#180e18', accent: '#ec4899', label: 'Velvet Pink' },
                  { id: 'terracottaWarm', name: 'Terracota & Ocre', bg: '#1f1614', accent: '#e07a5f', label: 'Terracota' },
                  { id: 'midnightObsidian', name: 'Obsidiana Black', bg: '#0a0a0c', accent: '#e2e8f0', label: 'Preto & Prata' },
                ].map((thm) => {
                  const isSelected = (aiForm.selectedPalette || data.theme) === thm.id;
                  return (
                    <button
                      key={thm.id}
                      type="button"
                      onClick={() => {
                        setAiForm((p: any) => ({ ...p, selectedPalette: thm.id }));
                        applyThemePreset(thm.id);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400/50'
                          : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full shrink-0 border border-white/20 shadow flex items-center justify-center text-[10px]"
                        style={{ backgroundColor: thm.bg }}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: thm.accent }} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-white truncate">{thm.label}</div>
                        <div className="text-[9px] text-neutral-400 truncate">{thm.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detalhes Opcionais (Accordion) */}
            <details className="pt-1 text-xs text-neutral-400 border-t border-neutral-800/80">
              <summary className="cursor-pointer hover:text-amber-300 font-semibold py-2 select-none flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Mais informações opcionais (Google Maps, Nicho ou Observações)</span>
              </summary>
              <div className="space-y-3 pt-2 pb-1">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-300 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>Link do Google Maps / Google Meu Negócio</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/?cid=..."
                    value={aiForm.googleMaps}
                    onChange={(e) => setAiForm((p: any) => ({ ...p, googleMaps: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-neutral-300 mb-1">
                    Nicho ou Observações Específicas
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Especialista em Mega Hair, Advogada Trabalhista, Barbeiro Visagista"
                    value={aiForm.businessNiche}
                    onChange={(e) => setAiForm((p: any) => ({ ...p, businessNiche: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
              </div>
            </details>
          </div>

          {aiError && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{aiError}</span>
            </div>
          )}

          {/* Botão de Criação em Segundos */}
          <div className="pt-2">
            <button
              type="button"
              disabled={aiGenerating}
              onClick={handleAiGenerateMicrosite}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 disabled:opacity-50 text-neutral-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer transition"
            >
              <Sparkles className="w-5 h-5 fill-neutral-950" />
              <span>
                {aiGenerating
                  ? aiStepIndex === 0
                    ? '🔍 Extraindo Fotos e Dados do Instagram...'
                    : aiStepIndex === 1
                    ? '✨ Formatando Layout, Serviços e WhatsApp...'
                    : '💾 Salvando e Cadastrando no Painel de Clientes...'
                  : '🚀 Criar Microsite Completo em Segundos'}
              </span>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400/90 mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cadastra automaticamente o cliente no Painel Administrativo com mensalidade e link pronto.</span>
            </div>

            {/* Gerador de Abordagem WhatsApp em 1 Clique */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-neutral-950 to-neutral-950 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    📲
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Proposta Pronta para o WhatsApp</h4>
                    <p className="text-[10px] text-neutral-400">Texto persuasivo de apresentação sem falar de preço</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyProposal}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow ${
                    copiedProposal
                      ? 'bg-emerald-500 text-neutral-950 font-black'
                      : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {copiedProposal ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{copiedProposal ? 'Copiado para o WhatsApp!' : 'Copiar Mensagem Pronta'}</span>
                </button>
              </div>
              <textarea
                readOnly
                rows={4}
                value={generateWhatsappProposalText()}
                className="w-full p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] font-sans text-neutral-300 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 2: SCRIPT SEQUENCIAL PARA O GEMINI */}
      {/* ========================================================================= */}
      {quickCreationMode === 'gemini_script' && (
        <div className="space-y-4 p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Copy className="w-4 h-4 text-amber-400" />
              <span>Criar com Script Sequencial no Gemini</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Copie o script para o Gemini te pedir sequencialmente o cliente, Instagram e Google Maps, e depois cole aqui o código JSON entregue.
            </p>
          </div>

          {/* PASSO 1: COPIAR SCRIPT */}
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-black flex items-center justify-center">1</span>
                Passo 1: Copie o Script e abra o Gemini
              </span>
              <a
                href="https://gemini.google.com/app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-amber-300 hover:text-amber-200 underline flex items-center gap-1"
              >
                <span>Abrir Gemini (gemini.google.com)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-neutral-400">
              O Gemini fará 3 perguntas sequenciais para você, buscará dados na web e gerará a página com o perfil e serviços do cliente.
            </p>
            <button
              type="button"
              onClick={() => handleCopyGeminiScript(false)}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow ${
                copiedGeminiScript
                  ? 'bg-emerald-500 text-neutral-950'
                  : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
              }`}
            >
              {copiedGeminiScript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>
                {copiedGeminiScript
                  ? 'Script Sequencial Copiado! Cole agora no Gemini'
                  : '📋 Copiar Script Sequencial para o Gemini'}
              </span>
            </button>
            <details className="text-[10px] text-neutral-400">
              <summary className="cursor-pointer hover:text-amber-300 font-semibold select-none">
                👁️ Visualizar texto completo do Script
              </summary>
              <textarea
                readOnly
                rows={5}
                value={buildGeminiSequentialScript(false)}
                className="w-full mt-2 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300 focus:outline-none"
              />
            </details>
          </div>

          {/* PASSO 2: COLAR CÓDIGO */}
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-400 text-neutral-950 text-[10px] font-black flex items-center justify-center">2</span>
                Passo 2: Cole o código que o Gemini te entregou
              </span>
              {geminiPastedCode.trim() && (
                <button
                  type="button"
                  onClick={() => setGeminiPastedCode('')}
                  className="text-[10px] text-neutral-400 hover:text-red-300 cursor-pointer"
                >
                  Limpar código
                </button>
              )}
            </div>

            <textarea
              rows={5}
              placeholder='Cole aqui o bloco de código JSON que o Gemini gerou (ex: { "adminClient": { ... }, "microsite": { ... } })...'
              value={geminiPastedCode}
              onChange={(e) => {
                setAiError(null);
                setGeminiPastedCode(e.target.value);
              }}
              className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400 text-xs font-mono text-emerald-200 placeholder-neutral-500 focus:outline-none resize-y"
            />

            <div className="space-y-1.5 pt-0.5">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={geminiAutoFetchInstaPhotos}
                  onChange={(e) => setGeminiAutoFetchInstaPhotos(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-900 text-amber-400 focus:ring-amber-500"
                />
                <span>
                  📸 Puxar automaticamente as <strong>6 fotos mais curtidas e avatar real do Instagram</strong>
                </span>
              </label>
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={geminiAutoCreateAdminRecord}
                  onChange={(e) => setGeminiAutoCreateAdminRecord(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-900 text-amber-400 focus:ring-amber-500"
                />
                <span>
                  🛡️ Já criar com a <strong>Área de Administração pronta</strong> (Cadastrar cliente, subdomínio e mensalidade no Painel)
                </span>
              </label>
            </div>

            {aiError && (
              <div className="p-2.5 rounded-lg bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            <button
              type="button"
              disabled={geminiImporting}
              onClick={handleImportGeminiCode}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 hover:brightness-110 disabled:opacity-50 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition"
            >
              <Sparkles className="w-4 h-4 fill-neutral-950" />
              <span>
                {geminiImporting
                  ? 'Montando Página + Puxando Fotos do Instagram + Criando Área Admin...'
                  : '✨ Importar Código & Criar Página + Área de Administração Pronta'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 3: CRIAÇÃO MANUAL RÁPIDA (DIRETA SEM IA) */}
      {/* ========================================================================= */}
      {quickCreationMode === 'manual_quick' && (
        <div className="space-y-4 p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-amber-400" />
              <span>Preenchimento Manual Direto</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Digite diretamente os dados essenciais e veja o microsite ser atualizado em tempo real na tela ao lado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Nome do Negócio / Profissional
              </label>
              <input
                type="text"
                value={data.profile.name}
                onChange={(e) => setData((p) => ({ ...p, profile: { ...p.profile, name: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Especialidade / Título Principal
              </label>
              <input
                type="text"
                value={data.profile.title}
                onChange={(e) => setData((p) => ({ ...p, profile: { ...p.profile, title: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp de Atendimento</span>
              </label>
              <input
                type="text"
                value={data.profile.whatsapp}
                onChange={(e) => setData((p) => ({ ...p, profile: { ...p.profile, whatsapp: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-emerald-300 font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram @</span>
              </label>
              <input
                type="text"
                value={data.profile.instagram}
                onChange={(e) => setData((p) => ({ ...p, profile: { ...p.profile, instagram: e.target.value.replace('@', '') } }))}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Endereço / Localização</span>
              </label>
              <input
                type="text"
                value={data.locationCard.address}
                onChange={(e) => setData((p) => ({ ...p, locationCard: { ...p.locationCard, address: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSaveMicrosite(false)}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
            >
              <Save className="w-4 h-4 text-neutral-950" />
              <span>Salvar Microsite e Atualizar no Painel de Clientes</span>
            </button>
          </div>
        </div>
      )}

      {/* Atalhos Rápidos para Outras Abas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        <button
          type="button"
          onClick={() => setActiveTab('styling')}
          className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-left transition cursor-pointer"
        >
          <Palette className="w-4 h-4 text-amber-400 mb-1" />
          <div className="text-xs font-bold text-white">Cores & Paletas</div>
          <div className="text-[10px] text-neutral-400">Ver todas as 25 paletas</div>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('identity')}
          className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-left transition cursor-pointer"
        >
          <User className="w-4 h-4 text-emerald-400 mb-1" />
          <div className="text-xs font-bold text-white">Perfil & Fotos</div>
          <div className="text-[10px] text-neutral-400">Foto, bio e galeria</div>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-left transition cursor-pointer"
        >
          <Tag className="w-4 h-4 text-blue-400 mb-1" />
          <div className="text-xs font-bold text-white">Serviços & Catálogo</div>
          <div className="text-[10px] text-neutral-400">Preços e agendamento</div>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-left transition cursor-pointer"
        >
          <Server className="w-4 h-4 text-purple-400 mb-1" />
          <div className="text-xs font-bold text-white">Painel & Clientes</div>
          <div className="text-[10px] text-neutral-400">Cobranças e domínios</div>
        </button>
      </div>
    </div>
  );
}

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
  Upload,
  Globe,
  Trash2,
} from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { NICHE_TEMPLATES, NicheTemplate } from '../../../constants/templates';

const POPULAR_PALETTES = [
  { id: 'sageMind', name: 'Sálvia Botânica & Linho', colors: ['#4b6043', '#f4ede2', '#c9a227'] },
  { id: 'emeraldLuxury', name: 'Esmeralda & Ouro Imperial', colors: ['#042f2e', '#14532d', '#d4af37'] },
  { id: 'darkGold', name: 'Dark Luxury Gold', colors: ['#0c0b0b', '#2a241e', '#d4af37'] },
  { id: 'roseGold', name: 'Rose Gold Atelier', colors: ['#23161c', '#f5e6e8', '#e8a598'] },
  { id: 'champagneGlow', name: 'Champagne Warm Glow', colors: ['#1c1917', '#fef3c7', '#f59e0b'] },
  { id: 'royalRuby', name: 'Royal Ruby & Rosé', colors: ['#3b0716', '#ffe4e6', '#fb7185'] },
  { id: 'deepNavy', name: 'Deep Navy Minimal', colors: ['#0b132b', '#1c2541', '#60a5fa'] },
  { id: 'terracottaWarm', name: 'Terracotta Warm', colors: ['#431407', '#ffedd5', '#ea580c'] },
];

const POPULAR_NICHES = [
  'Estética Avançada & Drenagem',
  'Harmonização Facial & Corporal',
  'Lash Design & Sobrancelhas',
  'Odontologia Estética & Implantes',
  'Barbearia & Grooming Premium',
  'Nutrição Clínica & Esportiva',
  'Psicologia, Terapia & Bem-Estar',
  'Salão de Beleza & Hair Stylist',
  'Personal Trainer & Performance',
  'Médicos & Consultórios Especializados',
  'Advocacia & Consultoria Jurídica',
  'Outro Nicho / Geral',
];

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
  saveForm?: any;
  setSaveForm?: React.Dispatch<React.SetStateAction<any>>;
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
  geminiPastedCode,
  setGeminiPastedCode,
  geminiAutoFetchInstaPhotos,
  setGeminiAutoFetchInstaPhotos,
  geminiAutoCreateAdminRecord,
  setGeminiAutoCreateAdminRecord,
  geminiImporting,
  handleImportGeminiCode,
  handleSaveMicrosite,
  saveForm,
  setSaveForm,
}: QuickCreateTabProps) {
  const [livePreviewLoading, setLivePreviewLoading] = useState(false);
  const [livePreviewData, setLivePreviewData] = useState<any>(null);
  const [copiedProposal, setCopiedProposal] = useState(false);
  const [templateNotice, setTemplateNotice] = useState<string | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Slug ativo ou calculado
  const currentSlug = (
    saveForm?.subdomain ||
    data.profile.name ||
    'novo-cliente'
  )
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'microsite';

  // Busca a prévia visual instantânea do Instagram com debounce
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
            setAiForm((p: any) => ({
              ...p,
              cachedProfile: json.profile,
              ...(p.businessName ? {} : { businessName: json.profile.fullName || json.profile.cleanBusinessName }),
            }));
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

  // Carrega modelo sem sobrescrever silenciosamente o cliente ativo
  const handleSelectTemplate = (tmpl: NicheTemplate) => {
    if (editingSiteId) {
      const ok = window.confirm(
        `Você está editando o microsite salvo "${data.profile.name}".\n\nDeseja carregar o modelo "${tmpl.title}" como um NOVO projeto sem alterar o cliente salvo atual?`
      );
      if (!ok) return;
      handleStartNewMicrosite();
    }
    const cloned = JSON.parse(JSON.stringify(tmpl.sampleData));
    setData(cloned);
    applyThemePreset(tmpl.theme);
    setTemplateNotice(`✨ Modelo "${tmpl.title}" carregado no simulador! Ajuste os dados e clique em Salvar quando quiser.`);
    setTimeout(() => setTemplateNotice(null), 5000);
  };

  // Upload e compressão leve de imagens para economizar memória do navegador
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'avatar' | 'about'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const raw = event.target?.result;
      if (typeof raw === 'string') {
        const img = new Image();
        img.onload = () => {
          try {
            const maxDim = 800;
            let { width, height } = img;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressed = canvas.toDataURL('image/jpeg', 0.85);
              if (target === 'avatar') {
                setData((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, avatarUrl: compressed },
                }));
              } else {
                setData((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, aboutPhotoUrl: compressed },
                  aboutMe: { ...prev.aboutMe, photoUrl: compressed },
                }));
              }
            }
          } catch {
            if (target === 'avatar') {
              setData((prev) => ({
                ...prev,
                profile: { ...prev.profile, avatarUrl: raw },
              }));
            } else {
              setData((prev) => ({
                ...prev,
                profile: { ...prev.profile, aboutPhotoUrl: raw },
                aboutMe: { ...prev.aboutMe, photoUrl: raw },
              }));
            }
          }
        };
        img.src = raw;
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleTriggerSave = (asNew = false) => {
    handleSaveMicrosite(asNew);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* BANNER DE STATUS DO MICROSITE & SALVAMENTO AUTOMÁTICO                     */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/30 border border-neutral-800 shadow-lg flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold text-white">
                {editingSiteId ? `Editando: ${data.profile.name || 'Microsite do Cliente'}` : 'Novo Microsite'}
              </h2>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  editingSiteId
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {editingSiteId ? 'SALVO NO PAINEL' : 'RASCUNHO ATIVO'}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                <span>Auto-salvo</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              {editingSiteId
                ? 'As alterações feitas aqui refletem em tempo real no simulador ao lado.'
                : 'Seus dados são preservados automaticamente na memória local para evitar perdas.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleStartNewMicrosite}
            className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            title="Limpar e iniciar um novo microsite do zero"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Novo do Zero</span>
          </button>

          <button
            type="button"
            onClick={() => handleTriggerSave(false)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-black flex items-center gap-1.5 shadow transition cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{editingSiteId ? 'Salvar Alterações' : 'Salvar no Painel'}</span>
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

      {/* Notificação Temporária de Carregamento de Modelo */}
      {templateNotice && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between gap-2 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{templateNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setTemplateNotice(null)}
            className="text-emerald-400 hover:text-white text-xs font-bold px-2 py-0.5 rounded cursor-pointer"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Notificação de Salvamento com Sucesso */}
      {saveSuccessNotice && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-100 text-xs flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">
            Microsite salvo com sucesso! Dados protegidos e atualizados no Painel de Clientes.
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SELETOR DE MODO DE CRIAÇÃO                                                */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-neutral-900/90 rounded-2xl border border-neutral-800">
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
          <span>✍️ Criação Manual</span>
        </button>

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
      </div>

      {/* ========================================================================= */}
      {/* MODO 0: CRIAÇÃO MANUAL DIRETA (NOVO, COMPLETO E RESILIENTE)              */}
      {/* ========================================================================= */}
      {quickCreationMode === 'manual_quick' && (
        <div className="space-y-5 p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-xl">
          <div className="flex items-center justify-between gap-2 flex-wrap border-b border-neutral-800/80 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>Criação & Edição Manual Direta</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Preencha os dados essenciais e veja as alterações refletidas no simulador ao lado em tempo real.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-neutral-400 font-mono">
                biovip.com.br/<strong className="text-amber-400">{currentSlug}</strong>
              </span>
            </div>
          </div>

          {/* SEÇÃO 1: IDENTIFICAÇÃO E SUBDOMÍNIO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Nome do Negócio ou Profissional <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Germana Zocrato, Dra. Camila Lash, Studio Nobre"
                value={data.profile.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setData((p) => ({ ...p, profile: { ...p.profile, name: val } }));
                  if (setSaveForm && !saveForm?.clientName) {
                    setSaveForm((prev: any) => ({ ...prev, clientName: val }));
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-sm text-white placeholder-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Especialidade / Título Principal <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Drenagem Linfática & Pós-Operatório"
                value={data.profile.title}
                onChange={(e) => setData((p) => ({ ...p, profile: { ...p.profile, title: e.target.value } }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-sm text-white placeholder-neutral-600 focus:outline-none"
              />
            </div>

            {/* Subdomínio Personalizado */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Link Oficial / Subdomínio</span>
              </label>
              <div className="flex items-center rounded-xl bg-neutral-950 border border-neutral-800 focus-within:border-amber-400 overflow-hidden">
                <span className="px-3 text-xs text-neutral-500 font-mono select-none">biovip.com.br/</span>
                <input
                  type="text"
                  placeholder="slug-do-cliente"
                  value={saveForm?.subdomain !== undefined ? saveForm.subdomain : currentSlug}
                  onChange={(e) => {
                    const clean = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                    if (setSaveForm) {
                      setSaveForm((prev: any) => ({ ...prev, subdomain: clean }));
                    }
                  }}
                  className="flex-1 px-2 py-2.5 bg-transparent text-sm text-amber-300 font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Nicho / Categoria */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nicho de Atuação</span>
              </label>
              <select
                value={saveForm?.nicheCategory || aiForm.businessNiche || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  if (setSaveForm) {
                    setSaveForm((prev: any) => ({ ...prev, nicheCategory: val }));
                  }
                  setAiForm((prev: any) => ({ ...prev, businessNiche: val }));
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white focus:outline-none"
              >
                <option value="">Selecione o nicho do cliente...</option>
                {POPULAR_NICHES.map((niche) => (
                  <option key={niche} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SEÇÃO 2: PALETA DE CORES RÁPIDA (AMOSTRAS VISUAIS) */}
          <div className="space-y-2 pt-1 border-t border-neutral-800/60">
            <label className="block text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Paleta de Cores do Microsite (1 Clique)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {POPULAR_PALETTES.map((pal) => (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => {
                    applyThemePreset(pal.id);
                    setAiForm((p: any) => ({ ...p, selectedPalette: pal.id }));
                  }}
                  className={`p-2 rounded-xl border text-left transition flex items-center gap-2 cursor-pointer ${
                    aiForm.selectedPalette === pal.id
                      ? 'border-amber-400 bg-amber-500/10 shadow-sm'
                      : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex -space-x-1.5 shrink-0">
                    {pal.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-xs"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-neutral-200 truncate">{pal.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SEÇÃO 3: CONTATOS DE CONVERSÃO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 border-t border-neutral-800/60">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp de Atendimento</span>
                <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                placeholder="(DDD) 99999-9999"
                value={data.profile.whatsapp}
                onChange={(e) => {
                  const val = e.target.value;
                  setData((p) => ({ ...p, profile: { ...p.profile, whatsapp: val } }));
                  setAiForm((p: any) => ({ ...p, whatsapp: val }));
                  if (setSaveForm) {
                    setSaveForm((prev: any) => ({ ...prev, clientPhone: val }));
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-sm text-emerald-300 font-mono focus:outline-none"
              />
              <span className="text-[10px] text-neutral-500 block mt-0.5">
                Conecta todos os botões de agendamento e CTA do microsite.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram do Cliente</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-semibold">@</span>
                <input
                  type="text"
                  placeholder="usuario.do.cliente"
                  value={data.profile.instagram.replace(/^@/, '')}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/^@/, '').trim();
                    setData((p) => ({ ...p, profile: { ...p.profile, instagram: clean } }));
                    setAiForm((p: any) => ({ ...p, instagram: clean }));
                  }}
                  className="w-full pl-7 pr-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Endereço / Localização do Espaço</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Av. Principal, 1000 - Sala 402, Centro - Cidade/UF"
                value={data.locationCard.address}
                onChange={(e) => setData((p) => ({ ...p, locationCard: { ...p.locationCard, address: e.target.value } }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          {/* SEÇÃO 4: FOTOS (AVATAR E SOBRE MIM COM UPLOAD E PREVIEW) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-neutral-800/60">
            {/* Foto de Perfil */}
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Foto de Perfil / Cabeçalho</span>
                </span>
                {data.profile.avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setData((p) => ({ ...p, profile: { ...p.profile, avatarUrl: '' } }))}
                    className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remover</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-900 border border-neutral-700 shrink-0 flex items-center justify-center">
                  {data.profile.avatarUrl ? (
                    <img src={data.profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-neutral-600" />
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold cursor-pointer transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Carregar Foto do Aparelho</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'avatar')}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Ou cole a URL direta (https://...)"
                    value={data.profile.avatarUrl?.startsWith('data:') ? '' : data.profile.avatarUrl}
                    onChange={(e) => setData((p) => ({ ...p, profile: { ...p.profile, avatarUrl: e.target.value } }))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Foto da Seção Sobre Mim */}
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Foto da Seção Sobre Mim</span>
                </span>
                {data.profile.aboutPhotoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setData((p) => ({
                        ...p,
                        profile: { ...p.profile, aboutPhotoUrl: '' },
                        aboutMe: { ...p.aboutMe, photoUrl: '' },
                      }));
                    }}
                    className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remover</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-700 shrink-0 flex items-center justify-center">
                  {data.profile.aboutPhotoUrl || data.aboutMe?.photoUrl ? (
                    <img
                      src={data.profile.aboutPhotoUrl || data.aboutMe?.photoUrl}
                      alt="Sobre Mim"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-neutral-600" />
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold cursor-pointer transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Carregar Foto do Aparelho</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'about')}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Ou cole a URL direta (https://...)"
                    value={data.profile.aboutPhotoUrl?.startsWith('data:') ? '' : data.profile.aboutPhotoUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      setData((p) => ({
                        ...p,
                        profile: { ...p.profile, aboutPhotoUrl: val },
                        aboutMe: { ...p.aboutMe, photoUrl: val },
                      }));
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 5: BIOGRAFIA E ASSINATURA EDITORIAL */}
          <div className="space-y-3 pt-1 border-t border-neutral-800/60">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Texto da Biografia / Apresentação Sobre Mim
              </label>
              <textarea
                rows={3}
                placeholder="Conte a história, formação e diferenciais do profissional ou clínica..."
                value={data.aboutMe?.paragraph || data.profile.bio || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setData((p) => ({
                    ...p,
                    profile: { ...p.profile, bio: val },
                    aboutMe: { ...p.aboutMe, paragraph: val },
                  }));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white placeholder-neutral-600 focus:outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Assinatura Cursiva (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ex: Realçando sua beleza única com ciência, arte e sutileza."
                value={data.profile.editorialSignature || ''}
                onChange={(e) => setData((p) => ({ ...p, profile: { ...p.profile, editorialSignature: e.target.value } }))}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none italic"
              />
            </div>
          </div>

          {/* BOTÃO PRINCIPAL DE SALVAMENTO */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleTriggerSave(false)}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer transition"
            >
              <Save className="w-4 h-4 fill-neutral-950" />
              <span>Salvar Microsite e Cadastrar no Painel de Clientes</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 1: CATÁLOGO DE MODELOS PRONTOS POR NICHO                            */}
      {/* ========================================================================= */}
      {quickCreationMode === 'niche_templates' && (
        <div className="space-y-4 p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Modelos Profissionais Prontos por Nicho</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Escolha um nicho abaixo para carregar imediatamente a paleta, copywriting, imagens e serviços validados para alta conversão no simulador.
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
                  onClick={() => handleSelectTemplate(tmpl)}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-400 hover:text-neutral-950 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-500/30 hover:border-amber-300 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Carregar no Simulador</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 2: CRIAÇÃO INSTANTÂNEA POR IA (3 CAMPOS ESSENCIAIS + BOTÃO)          */}
      {/* ========================================================================= */}
      {quickCreationMode === 'instant_ai' && (
        <div className="space-y-5 p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Crie o Microsite em 3 Campos Rápidos</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              A inteligência artificial seleciona as fotos de maior relevância para o portfólio e serviços, mapeia procedimentos e gera todo o design pronto.
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
                Puxa automaticamente a bio, o nicho e as <strong>fotos com maior afinidade para serviços e galeria</strong>.
              </span>

              {/* Indicador de carregamento da prévia */}
              {livePreviewLoading && (
                <div className="mt-2.5 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-2.5 text-xs text-amber-300 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Localizando perfil público e analisando fotos...</span>
                </div>
              )}

              {/* Prévia do Perfil Encontrado */}
              {livePreviewData && (
                <div className="mt-2.5 p-3 rounded-xl bg-neutral-950 border border-emerald-500/30 flex items-center gap-3">
                  {livePreviewData.avatarUrl && (
                    <img
                      src={livePreviewData.avatarUrl}
                      alt={livePreviewData.fullName || 'Perfil'}
                      className="w-12 h-12 rounded-full object-cover border border-emerald-500/40"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate">
                        {livePreviewData.fullName || livePreviewData.username}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                      {livePreviewData.biography || 'Perfil verificado com sucesso'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Campo Opcional: Link do Google Maps */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Link do Google Maps / Google Meu Negócio</span>
                <span className="text-xs text-neutral-500 font-normal">(Opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Cole o link do Google Maps para puxar avaliações e localização"
                value={aiForm.googleMaps}
                onChange={(e) => setAiForm((p: any) => ({ ...p, googleMaps: e.target.value.trim() }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            {aiError && (
              <div className="p-2.5 rounded-lg bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            {/* Botão Principal de Criação por IA */}
            <button
              type="button"
              disabled={aiGenerating}
              onClick={handleAiGenerateMicrosite}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 disabled:opacity-50 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition"
            >
              {aiGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                  <span>
                    {aiStepIndex === 0 && 'Conectando ao Instagram & mapeando procedimentos...'}
                    {aiStepIndex === 1 && 'Escrevendo textos de alta conversão & selecionando fotos...'}
                    {aiStepIndex >= 2 && 'Montando microsite e cadastrando no Painel...'}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-neutral-950" />
                  <span>✨ Gerar Microsite Pronto com IA em 1 Clique</span>
                </>
              )}
            </button>
          </div>

          {/* Gerador de Proposta Comercial Pronta para WhatsApp */}
          <div className="mt-4 p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mensagem Comercial de Apresentação (WhatsApp)</span>
              </span>
              <button
                type="button"
                onClick={handleCopyProposal}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              >
                {copiedProposal ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedProposal ? 'Copiada!' : 'Copiar Mensagem'}</span>
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Copie o texto pronto e envie para o WhatsApp do cliente para apresentar o microsite com autoridade.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODO 3: SCRIPT GEMINI                                                     */}
      {/* ========================================================================= */}
      {quickCreationMode === 'gemini_script' && (
        <div className="space-y-4 p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 shadow-xl">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Copy className="w-4 h-4 text-amber-400" />
              <span>Geração Via Gemini (Código Personalizado)</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Copie o prompt estruturado, cole no Google Gemini e em seguida cole o JSON gerado aqui para importar tudo pronto.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleCopyGeminiScript(false)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              {copiedGeminiScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedGeminiScript ? 'Prompt Copiado!' : '1. Copiar Prompt do Gemini'}</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-neutral-300">
              2. Cole o Código JSON retornado pelo Gemini:
            </label>
            <textarea
              rows={5}
              placeholder="Cole aqui o código JSON entregue pelo Gemini..."
              value={geminiPastedCode}
              onChange={(e) => setGeminiPastedCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-xs text-neutral-200 font-mono focus:outline-none"
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
                  📸 Puxar automaticamente as <strong>fotos reais de portfólio e avatar do Instagram</strong>
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
                  🛡️ Já criar com a <strong>Área de Administração pronta</strong> (Cadastrar no Painel)
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
                  ? 'Montando Página + Puxando Fotos do Instagram...'
                  : '✨ Importar Código & Montar Microsite'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ATALHOS RÁPIDOS PARA OUTRAS ABAS                                         */}
      {/* ========================================================================= */}
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

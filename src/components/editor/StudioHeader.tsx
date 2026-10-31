import React, { useState } from 'react';
import {
  Sparkles,
  Smartphone,
  Copy,
  Download,
  Share2,
  ExternalLink,
  Save,
  Check,
  Eye,
  Plus,
  Server,
  Globe,
  SlidersHorizontal,
  Palette,
  User,
  Tag,
  Briefcase,
  Layers,
  Filter,
  Wand2,
  Target,
  Code,
  Edit3,
  Maximize2,
  Lock,
  LogOut,
  KeyRound,
  Mail,
  MoreVertical,
  QrCode,
  ChevronDown,
  Columns3,
  Sidebar,
} from 'lucide-react';

export interface StudioHeaderProps {
  data: any;
  currentEditingSite: any;
  startNewDraftMicrosite: () => void;
  handleStartNewMicrosite: () => void;
  openPublicSalesLanding: () => void;
  openCreatorSubdomain: () => void;
  openLivePreviewTab: () => void;
  setQrModalOpen: (open: boolean) => void;
  setAiModalOpen: (open: boolean) => void;
  openSaveDialog: () => void;
  setPublishModalOpen: (open: boolean) => void;
  setSelectedPublishSiteId: (id: string | null) => void;
  savedSites: any[];
  editingSiteId: string | null;
  setIsClientsFullscreen: (fullscreen: boolean) => void;
  copyExportCode: () => void;
  copiedCode: boolean;
  openBulkEmailModal: () => void;
  setSecurityModalTab: (tab: 'pin' | 'audit') => void;
  setSecurityModalOpen: (open: boolean) => void;
  handleLockAdminPanel: () => void;
  handleAdminLogout: () => void;
  adminUser: any;
  viewMode: 'editor' | 'preview';
  setViewMode: (mode: 'editor' | 'preview') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  landingConfig: any;
  editorLayoutMode?: '3col' | '2col';
  setEditorLayoutMode?: (mode: '3col' | '2col') => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  data,
  currentEditingSite,
  startNewDraftMicrosite,
  handleStartNewMicrosite,
  openPublicSalesLanding,
  openCreatorSubdomain,
  openLivePreviewTab,
  setQrModalOpen,
  setAiModalOpen,
  openSaveDialog,
  setPublishModalOpen,
  setSelectedPublishSiteId,
  savedSites,
  editingSiteId,
  setIsClientsFullscreen,
  copyExportCode,
  copiedCode,
  openBulkEmailModal,
  setSecurityModalTab,
  setSecurityModalOpen,
  handleLockAdminPanel,
  handleAdminLogout,
  adminUser,
  viewMode,
  setViewMode,
  activeTab,
  setActiveTab,
  landingConfig,
  editorLayoutMode = '3col',
  setEditorLayoutMode,
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [tabCategoryFilter, setTabCategoryFilter] = useState<'all' | 'design' | 'conversion' | 'seo' | 'management'>('all');

  const hasUnsavedChanges = currentEditingSite
    ? JSON.stringify(currentEditingSite.data) !== JSON.stringify(data)
    : false;

  const allTabs = [
    { id: 'quickCreate', label: 'Criação Rápida & IA', icon: Sparkles, category: 'design', isHighlight: true },
    { id: 'styling', label: 'Cores & Temas', icon: Palette, category: 'design' },
    { id: 'identity', label: 'Perfil & Fotos', icon: User, category: 'design' },
    { id: 'services', label: 'Serviços & Catálogo', icon: Tag, category: 'design' },
    { id: 'buttons', label: 'Botões & WhatsApp', icon: Briefcase, category: 'design' },
    { id: 'modules', label: 'Depoimentos & Módulos', icon: Layers, category: 'conversion' },
    { id: 'qualifier', label: 'Funil Anti-Curiosos', icon: Filter, category: 'conversion' },
    { id: 'highConversion', label: 'Gatilhos de Alta Conversão', icon: Wand2, category: 'conversion' },
    { id: 'seo', label: 'SEO & Card WhatsApp', icon: Globe, category: 'seo' },
    { id: 'tracking', label: 'Pixels & Rastreamento', icon: Target, category: 'seo' },
    { id: 'dashboard', label: `CRM & Clientes (${savedSites.length})`, icon: Server, category: 'management', isHighlight: true },
    { id: 'export', label: 'Exportar Código HTML', icon: Code, category: 'management' },
  ];

  const visibleTabs = tabCategoryFilter === 'all'
    ? allTabs
    : allTabs.filter(t => t.category === tabCategoryFilter);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR DESPOLUÍDO & HIERARQUIZADO                              */}
      {/* ========================================================================= */}
      <header className="px-4 py-2.5 border-b border-neutral-800 bg-[#0c0c0e] flex items-center justify-between gap-3 flex-wrap shrink-0">
        {/* Zona Esquerda: Identidade e Contexto do Microsite Ativo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-9 rounded-xl bg-[#1c1c1e] border border-amber-400/40 shadow-lg shadow-amber-500/15 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="/assets/aistudio/1793152702953_02858b21.jpg"
              alt="BioVip Logo"
              className="w-full h-full object-cover scale-125"
            />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-neutral-100 text-xs tracking-wider">
                BIOVIP <span className="text-amber-400 font-mono">STUDIO</span>
              </span>

              {/* Status Badge Elegante */}
              {currentEditingSite ? (
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[9.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                      hasUnsavedChanges
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                        : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    <Edit3 className="w-2.5 h-2.5" />
                    <span>{currentEditingSite.clientName}</span>
                    <span className="text-[8px] opacity-80">
                      {hasUnsavedChanges ? '• Alterações Pendentes' : '• Salvo'}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={startNewDraftMicrosite}
                    className="text-[9px] font-semibold text-neutral-400 hover:text-amber-300 underline cursor-pointer"
                    title="Desvincular e iniciar novo rascunho em branco"
                  >
                    (Desvincular)
                  </button>
                </div>
              ) : (
                <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Modo Rascunho
                </span>
              )}
            </div>

            <p className="text-[10px] text-neutral-500 hidden sm:block">
              {adminUser?.email ? `Admin: ${adminUser.email}` : 'Painel de Criação e Edição de Microsites'}
            </p>
          </div>
        </div>

        {/* Zona Central: Controles de Visualização & Prévia Rápida */}
        <div className="flex items-center gap-2">
          {/* Toggle Mobile (Editor vs Prévia) visível apenas em telas menores < 1024px */}
          <div className="flex lg:hidden items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              type="button"
              onClick={() => setViewMode('editor')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'editor'
                  ? 'bg-amber-400 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-amber-400 text-neutral-950 shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Ver Página</span>
            </button>
          </div>

          {/* Alternador de Layout: 3 Colunas Studio vs 2 Colunas Clássico */}
          {setEditorLayoutMode && (
            <div className="hidden lg:flex items-center bg-neutral-900/90 p-0.5 rounded-xl border border-neutral-800 shadow-inner">
              <button
                type="button"
                onClick={() => setEditorLayoutMode('3col')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  editorLayoutMode === '3col'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Modo Studio 3 Colunas: Estrutura à esquerda, Mockup no centro e Editor à direita"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span>3 Colunas</span>
              </button>
              <button
                type="button"
                onClick={() => setEditorLayoutMode('2col')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  editorLayoutMode === '2col'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Modo Clássico 2 Colunas: Editor à esquerda e Mockup à direita"
              >
                <Sidebar className="w-3.5 h-3.5" />
                <span>2 Colunas</span>
              </button>
            </div>
          )}

          {/* Botão Prévia em Nova Aba */}
          <button
            type="button"
            onClick={openLivePreviewTab}
            className="px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            title="Abrir resultado do microsite em tela cheia numa nova aba"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Ver Resultado</span>
          </button>

          {/* Botão QR Code Celular */}
          <button
            type="button"
            onClick={() => setQrModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            title="Gerar QR Code para testar no celular"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">QR Code</span>
          </button>

          {/* Botão Criar com IA */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('quickCreate');
              setAiModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            title="Gerar Microsite com IA a partir do Instagram ou Google Maps"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span>Gerar com IA</span>
          </button>
        </div>

        {/* Zona Direita: Ações Principais com Hierarquia Perfeita */}
        <div className="flex items-center gap-2">
          {/* Botão CRM & Clientes */}
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-amber-400 text-neutral-950 border-amber-300 font-bold shadow'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-800'
            }`}
            title="Abrir CRM de Prospecção, Gestão de Leads e Clientes"
          >
            <Server className="w-3.5 h-3.5 text-amber-400" />
            <span>CRM & Clientes</span>
            <span className="px-1.5 py-0.2 text-[9.5px] rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {savedSites.length}
            </span>
          </button>

          {/* Botão Salvar */}
          <button
            type="button"
            onClick={openSaveDialog}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar</span>
          </button>

          {/* Botão Publicar */}
          <button
            type="button"
            onClick={() => {
              setSelectedPublishSiteId(editingSiteId || savedSites[0]?.id || null);
              setPublishModalOpen(true);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-neutral-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Publicar</span>
          </button>

          {/* Menu Dropdown de Mais Opções */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition cursor-pointer"
              title="Mais opções e ferramentas"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMoreMenu && (
              <div
                className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl py-2 z-50 text-xs text-neutral-200 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setShowMoreMenu(false)}
              >
                <button
                  type="button"
                  onClick={handleStartNewMicrosite}
                  className="w-full px-3.5 py-2 text-left hover:bg-neutral-800 flex items-center gap-2 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Novo Microsite em Branco</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsClientsFullscreen(true)}
                  className="w-full px-3.5 py-2 text-left hover:bg-neutral-800 flex items-center gap-2 transition cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span>Gestão de Clientes em Tela Cheia</span>
                </button>

                <button
                  type="button"
                  onClick={copyExportCode}
                  className="w-full px-3.5 py-2 text-left hover:bg-neutral-800 flex items-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>{copiedCode ? 'Código HTML Copiado!' : 'Copiar Código HTML'}</span>
                </button>

                <button
                  type="button"
                  onClick={openPublicSalesLanding}
                  className="w-full px-3.5 py-2 text-left hover:bg-neutral-800 flex items-center gap-2 transition cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                  <span>Ver Vitrine de Vendas Pública</span>
                </button>

                <button
                  type="button"
                  onClick={openBulkEmailModal}
                  className="w-full px-3.5 py-2 text-left hover:bg-neutral-800 flex items-center gap-2 transition cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>Disparo de E-mails em Massa</span>
                </button>

                <div className="my-1.5 border-t border-neutral-800" />

                <button
                  type="button"
                  onClick={() => {
                    setSecurityModalTab('pin');
                    setSecurityModalOpen(true);
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-neutral-800 flex items-center gap-2 transition cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Segurança & PIN Mestre</span>
                </button>

                <button
                  type="button"
                  onClick={handleLockAdminPanel}
                  className="w-full px-3.5 py-2 text-left hover:bg-red-500/10 text-neutral-300 hover:text-red-300 flex items-center gap-2 transition cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-red-400" />
                  <span>Bloquear Painel Agora</span>
                </button>

                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="w-full px-3.5 py-2 text-left hover:bg-red-500/10 text-neutral-300 hover:text-red-300 flex items-center gap-2 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Sair do Estúdio</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. BARRA DE NAVEGAÇÃO DE ABAS ORGANIZADA E SEM POLUIÇÃO                   */}
      {/* ========================================================================= */}
      <div className="border-b border-neutral-800 bg-neutral-950/90 shrink-0">
        {/* Filtro Rápido de Categorias de Abas */}
        <div className="px-4 py-1.5 border-b border-neutral-800/60 bg-neutral-950 flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
          <div className="flex items-center gap-1 shrink-0 font-medium">
            <span className="text-neutral-500 mr-1.5 uppercase tracking-wider text-[9px] font-mono">Filtrar:</span>
            {[
              { id: 'all', label: 'Todas as Abas' },
              { id: 'design', label: '🎨 Design & Conteúdo' },
              { id: 'conversion', label: '⚡ Conversão & Funil' },
              { id: 'seo', label: '📊 Tráfego & SEO' },
              { id: 'management', label: '👥 Gestão & Código' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setTabCategoryFilter(cat.id as any)}
                className={`px-2.5 py-0.5 rounded-full transition cursor-pointer whitespace-nowrap ${
                  tabCategoryFilter === cat.id
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-500/40 font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Linha das Abas Ativas */}
        <div
          onWheel={(e) => {
            if (e.deltaY !== 0) {
              e.currentTarget.scrollLeft += e.deltaY;
            }
          }}
          className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto text-xs tab-scrollbar shrink-0 scroll-smooth"
        >
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={(e) => {
                  setActiveTab(tab.id);
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                    : tab.isHighlight
                    ? 'bg-amber-400/10 text-amber-200 border border-amber-500/20 hover:bg-amber-400/20'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent hover:border-neutral-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neutral-950' : tab.isHighlight ? 'text-amber-400' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

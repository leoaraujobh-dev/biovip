import React, { useState } from 'react';
import {
  AlertCircle,
  User,
  Zap,
  HelpCircle,
  Award,
  ListOrdered,
  Sparkles,
  Image,
  MapPin,
  MessageSquare,
  BookOpen,
  Layers,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Palette,
  Globe,
  Target,
  Server,
  Code,
  Wand2,
  Filter,
} from 'lucide-react';

export interface StructureNavigatorColumnProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  savedSitesCount: number;
  showToast?: (msg: string) => void;
}

export const StructureNavigatorColumn: React.FC<StructureNavigatorColumnProps> = ({
  data,
  setData,
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  savedSitesCount,
  showToast,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('profile');

  // Toggle individual section visibility in microsite data
  const handleToggleSection = (e: React.MouseEvent, key: string, label: string) => {
    e.stopPropagation();
    setData((prev: any) => {
      const current = prev[key]?.enabled ?? true;
      const next = !current;
      if (showToast) {
        showToast(`${next ? '👁️' : '🙈'} ${label} ${next ? 'ativado' : 'ocultado'}.`);
      }
      return {
        ...prev,
        [key]: {
          ...(prev[key] || {}),
          enabled: next,
        },
      };
    });
  };

  // Section list representing the live structure of the microsite
  const sections = [
    {
      id: 'announcement',
      key: 'announcement',
      label: 'Barra de Alerta',
      sublabel: data.announcement?.badge || 'Agenda VIP',
      icon: AlertCircle,
      tab: 'identity',
      targetId: 'module-announcement',
      enabled: data.announcement?.enabled ?? true,
      canToggle: true,
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
    },
    {
      id: 'profile',
      key: 'profile',
      label: 'Perfil & Cabeçalho',
      sublabel: data.profile?.name || 'Identidade do Profissional',
      icon: User,
      tab: 'identity',
      targetId: 'module-profile',
      enabled: true,
      canToggle: false,
      color: 'text-rose-400',
      bgColor: 'bg-rose-400/10',
    },
    {
      id: 'actionCards',
      key: 'actionCards',
      label: 'Botões & WhatsApp',
      sublabel: '3 Ações de Agendamento',
      icon: Zap,
      tab: 'buttons',
      targetId: 'module-actionCards',
      enabled: true,
      canToggle: false,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
    },
    {
      id: 'quiz',
      key: 'quiz',
      label: 'Triagem Anti-Curiosos',
      sublabel: data.quiz?.badge || '3 Perguntas VIP',
      icon: Filter,
      tab: 'qualifier',
      targetId: 'module-quiz',
      enabled: data.quiz?.enabled ?? true,
      canToggle: true,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      id: 'metrics',
      key: 'metrics',
      label: 'Métricas & Prova Social',
      sublabel: 'Seguidores & Google',
      icon: Award,
      tab: 'modules',
      targetId: 'module-metrics',
      enabled: data.metrics?.enabled ?? true,
      canToggle: true,
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
    },
    {
      id: 'processSteps',
      key: 'processSteps',
      label: 'Como Funciona (3 Passos)',
      sublabel: 'Jornada do Cliente',
      icon: ListOrdered,
      tab: 'modules',
      targetId: 'module-processSteps',
      enabled: data.processSteps?.enabled ?? true,
      canToggle: true,
      color: 'text-sky-400',
      bgColor: 'bg-sky-400/10',
    },
    {
      id: 'studentGrid',
      key: 'studentGrid',
      label: 'Galeria & Portfólio',
      sublabel: `${data.studentGrid?.photos?.length || 6} fotos técnicas`,
      icon: Image,
      tab: 'modules',
      targetId: 'module-studentGrid',
      enabled: data.studentGrid?.enabled ?? true,
      canToggle: true,
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
    },
    {
      id: 'services',
      key: 'services',
      label: 'Catálogo de Serviços',
      sublabel: `${data.services?.items?.length || 0} procedimentos cadastrados`,
      icon: Sparkles,
      tab: 'services',
      targetId: 'module-services',
      enabled: data.services?.enabled ?? true,
      canToggle: true,
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
    },
    {
      id: 'locationCard',
      key: 'locationCard',
      label: 'Localização & GPS',
      sublabel: data.locationCard?.address ? 'Endereço Google Maps' : 'Hora Marcada',
      icon: MapPin,
      tab: 'modules',
      targetId: 'module-locationCard',
      enabled: data.locationCard?.enabled ?? true,
      canToggle: true,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
    {
      id: 'testimonials',
      key: 'testimonials',
      label: 'Depoimentos de Clientes',
      sublabel: `${data.testimonials?.items?.length || 3} avaliações`,
      icon: MessageSquare,
      tab: 'modules',
      targetId: 'module-testimonials',
      enabled: data.testimonials?.enabled ?? true,
      canToggle: true,
      color: 'text-teal-400',
      bgColor: 'bg-teal-400/10',
    },
    {
      id: 'aboutMe',
      key: 'aboutMe',
      label: 'Sobre a Especialista',
      sublabel: 'História e Biossegurança',
      icon: BookOpen,
      tab: 'modules',
      targetId: 'module-aboutMe',
      enabled: data.aboutMe?.enabled ?? true,
      canToggle: true,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10',
    },
    {
      id: 'faq',
      key: 'faq',
      label: 'Dúvidas Frequentes',
      sublabel: 'FAQ Sanfonado',
      icon: HelpCircle,
      tab: 'modules',
      targetId: 'module-faq',
      enabled: data.faq?.enabled ?? true,
      canToggle: true,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
    },
  ];

  const handleSelectSection = (sec: (typeof sections)[0]) => {
    setActiveSectionId(sec.id);
    setActiveTab(sec.tab);

    if (sec.targetId) {
      setTimeout(() => {
        const el = document.getElementById(sec.targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add('ring-2', 'ring-amber-400', 'ring-offset-2', 'ring-offset-neutral-900');
          setTimeout(() => {
            el.classList.remove('ring-2', 'ring-amber-400', 'ring-offset-2', 'ring-offset-neutral-900');
          }, 1800);
        }
      }, 120);
    }
  };

  const activeCount = sections.filter((s) => s.enabled).length;

  // General tools and configuration shortcuts
  const toolShortcuts = [
    { id: 'quickCreate', label: 'Criação Rápida & IA', icon: Wand2, color: 'text-amber-400' },
    { id: 'styling', label: 'Cores & Temas', icon: Palette, color: 'text-pink-400' },
    { id: 'highConversion', label: 'Gatilhos de Conversão', icon: Zap, color: 'text-yellow-400' },
    { id: 'seo', label: 'SEO & Google Search', icon: Globe, color: 'text-sky-400' },
    { id: 'tracking', label: 'Pixels & Meta Ads', icon: Target, color: 'text-purple-400' },
    { id: 'dashboard', label: `CRM & Clientes (${savedSitesCount})`, icon: Server, color: 'text-emerald-400' },
    { id: 'export', label: 'Exportar HTML', icon: Code, color: 'text-neutral-400' },
  ];

  if (isCollapsed) {
    return (
      <aside className="hidden lg:flex w-14 h-full bg-[#0c0c0e] border-r border-neutral-800 flex-col items-center py-3 shrink-0 select-none z-30 transition-all duration-200">
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition mb-3 cursor-pointer border border-neutral-800"
          title="Expandir Estrutura do Site (Coluna 1)"
        >
          <ChevronRight className="w-4 h-4 text-amber-400" />
        </button>

        <div className="w-full flex-1 overflow-y-auto space-y-1.5 px-1.5 scrollbar-thin scrollbar-thumb-neutral-800">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isSecActive = activeSectionId === sec.id && activeTab === sec.tab;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleSelectSection(sec)}
                className={`w-full aspect-square rounded-xl flex items-center justify-center relative transition cursor-pointer group ${
                  isSecActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : sec.enabled
                    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                    : 'text-neutral-600 hover:text-neutral-400 bg-neutral-950/40 opacity-50'
                }`}
                title={`${sec.label} (${sec.enabled ? 'Ativo' : 'Oculto'})`}
              >
                <Icon className={`w-4 h-4 ${sec.color}`} />
                {sec.enabled && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>

        <div className="w-full pt-2 border-t border-neutral-800/80 space-y-1 px-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('styling')}
            className="w-full aspect-square rounded-xl flex items-center justify-center text-pink-400 hover:bg-neutral-900 transition cursor-pointer"
            title="Cores & Temas"
          >
            <Palette className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="w-full aspect-square rounded-xl flex items-center justify-center text-emerald-400 hover:bg-neutral-900 transition cursor-pointer"
            title="CRM & Clientes"
          >
            <Server className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:flex w-64 xl:w-72 h-full bg-[#0c0c0e] border-r border-neutral-800 flex-col shrink-0 select-none z-30 transition-all duration-200">
      {/* Header da Coluna 1 */}
      <div className="p-3 border-b border-neutral-800/90 flex items-center justify-between gap-2 bg-neutral-950/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
              Estrutura do Site
            </h3>
            <span className="text-[10px] text-neutral-500 font-mono">
              {activeCount} de {sections.length} seções ativas
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80 transition cursor-pointer"
          title="Recolher para modo ícones"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Lista de Seções / Blocos da Página */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-neutral-800">
        <div className="px-2 pt-1 pb-1 text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center justify-between">
          <span>Seções & Módulos</span>
          <span className="text-[9px] text-emerald-400 font-normal">Ao vivo no mockup</span>
        </div>

        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          const isSecActive = activeSectionId === sec.id && activeTab === sec.tab;

          return (
            <div
              key={sec.id}
              onClick={() => handleSelectSection(sec)}
              className={`group flex items-center justify-between p-2 rounded-xl transition cursor-pointer border ${
                isSecActive
                  ? 'bg-neutral-900 border-amber-500/40 text-neutral-100 shadow-sm'
                  : sec.enabled
                  ? 'bg-neutral-950/40 border-neutral-800/60 hover:bg-neutral-900/60 hover:border-neutral-700 text-neutral-300'
                  : 'bg-neutral-950/20 border-transparent text-neutral-500 opacity-60 hover:opacity-90'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className="text-[10px] font-mono text-neutral-600 w-3 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className={`w-7 h-7 rounded-lg ${sec.bgColor} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${sec.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11.5px] font-semibold text-neutral-200 truncate">
                    {sec.label}
                  </div>
                  <div className="text-[9.5px] text-neutral-500 truncate">
                    {sec.sublabel}
                  </div>
                </div>
              </div>

              {/* Botão de Ligar / Desligar (Olho) */}
              {sec.canToggle && (
                <button
                  type="button"
                  onClick={(e) => handleToggleSection(e, sec.key, sec.label)}
                  className={`p-1.5 rounded-lg transition shrink-0 ml-1.5 cursor-pointer ${
                    sec.enabled
                      ? 'text-neutral-400 hover:text-amber-400 hover:bg-neutral-800'
                      : 'text-neutral-600 hover:text-neutral-300 hover:bg-neutral-800'
                  }`}
                  title={sec.enabled ? `Ocultar ${sec.label}` : `Ativar ${sec.label}`}
                >
                  {sec.enabled ? (
                    <Eye className="w-3.5 h-3.5 text-emerald-400/80" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                  )}
                </button>
              )}
            </div>
          );
        })}

        {/* Atalhos de Configurações Globais */}
        <div className="pt-3 px-2 pb-1 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
          Configurações Globais
        </div>

        <div className="space-y-1">
          {toolShortcuts.map((tool) => {
            const Icon = tool.icon;
            const isTabActive = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => {
                  setActiveSectionId(tool.id);
                  setActiveTab(tool.id);
                }}
                className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition text-left cursor-pointer border ${
                  isTabActive
                    ? 'bg-neutral-900 border-amber-500/40 text-neutral-100 font-bold'
                    : 'bg-transparent border-transparent hover:bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${tool.color} shrink-0`} />
                <span className="text-[11.5px] truncate">{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer da Coluna 1 com Versão e Status */}
      <div className="p-2.5 border-t border-neutral-800/80 bg-neutral-950/80 flex items-center justify-between text-[10px] text-neutral-500">
        <span>Studio Layout Pro</span>
        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px]">
          3 Colunas Ativas
        </span>
      </div>
    </aside>
  );
};

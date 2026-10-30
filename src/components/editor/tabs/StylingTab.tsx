import React from 'react';
import {
  Palette,
  ShieldCheck,
  Search,
  X,
  ImageIcon,
  Upload,
  SlidersHorizontal,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { FONT_OPTIONS, PHOTO_FILTERS } from '../../../constants/themes';

export interface StylingTabProps {
  data: typeof INITIAL_DATA;
  setData: React.Dispatch<React.SetStateAction<typeof INITIAL_DATA>>;
  theme: any;
  filteredThemes: any[];
  themeCategories: string[];
  themeSearchQuery: string;
  setThemeSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedThemeCategory: string;
  setSelectedThemeCategory: React.Dispatch<React.SetStateAction<string>>;
  applyThemePreset: (themeId: string) => void;
  updateCustomColor: (key: string, val: any) => void;
  updateStyle: (key: string, val: any) => void;
  updateProfile: (key: string, val: any) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
  nicheKits: Record<string, any>;
  applyNicheKit: (category: string) => void;
  showToast: (msg: string) => void;
}

export function StylingTab({
  data,
  filteredThemes,
  themeCategories,
  themeSearchQuery,
  setThemeSearchQuery,
  selectedThemeCategory,
  setSelectedThemeCategory,
  applyThemePreset,
  updateCustomColor,
  updateStyle,
  updateProfile,
  handleFileUpload,
  nicheKits,
  applyNicheKit,
  showToast,
}: StylingTabProps) {
  return (
    <div className="space-y-6">
      {/* Paleta de Cores e Estilo Visual (100% Livre para Qualquer Nicho) */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-200 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-amber-400" />
            <span>1. Paleta de Cores (Universal para Qualquer Nicho)</span>
          </label>
          <span className="text-[10px] font-medium text-neutral-400">
            {filteredThemes.length} {filteredThemes.length === 1 ? 'paleta encontrada' : 'paletas encontradas'}
          </span>
        </div>

        {/* Banner de Proteção dos Dados Preenchidos */}
        <div className="mb-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start sm:items-center gap-2.5 text-xs text-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="leading-relaxed">
            <strong className="text-white">Seus dados estão 100% protegidos:</strong> Selecionar qualquer paleta altera <em>apenas as cores e estética visual</em>. Todas as fotos, textos, contatos e serviços já cadastrados <strong>nunca são alterados nem apagados</strong>.
          </div>
        </div>

        {/* Barra de Pesquisa de Paletas */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={themeSearchQuery}
            onChange={(e) => {
              setThemeSearchQuery(e.target.value);
              if (e.target.value.trim() !== '' && selectedThemeCategory !== 'Todas as Paletas') {
                setSelectedThemeCategory('Todas as Paletas');
              }
            }}
            placeholder="Pesquisar paleta ou tom (ex: gold, navy, esmeralda, dark, bronze, rosé, clean, vinho)..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition"
          />
          {themeSearchQuery && (
            <button
              type="button"
              onClick={() => setThemeSearchQuery('')}
              title="Limpar pesquisa"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-200 p-0.5 rounded-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filtro por Estilo de Cor */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 tab-scrollbar">
          {themeCategories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedThemeCategory(cat)}
              className={`px-2.5 py-1 text-[11px] rounded-lg transition whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                selectedThemeCategory === cat
                  ? 'bg-amber-400 text-black font-bold shadow-sm'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredThemes.length === 0 ? (
          <div className="mt-3 p-6 rounded-xl border border-neutral-800 bg-neutral-950/60 text-center space-y-2">
            <div className="text-xs font-semibold text-neutral-300">
              Nenhuma paleta encontrada para &quot;{themeSearchQuery}&quot;
            </div>
            <p className="text-[11px] text-neutral-500">
              Tente buscar por tons como &quot;gold&quot;, &quot;navy&quot;, &quot;dark&quot;, &quot;esmeralda&quot;, &quot;bronze&quot;, &quot;vinho&quot; ou &quot;rosé&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setThemeSearchQuery('');
                setSelectedThemeCategory('Todas as Paletas');
              }}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-[11px] font-semibold transition cursor-pointer"
            >
              Mostrar Todas as Paletas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2.5">
            {filteredThemes.map((thm) => {
              const isCurrent = !data.customColors.enabled && data.theme === thm.id;
              return (
                <button
                  key={thm.id}
                  type="button"
                  onClick={() => applyThemePreset(thm.id)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between h-28 cursor-pointer relative group ${
                    isCurrent
                      ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/40 shadow-md shadow-amber-500/10'
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/60'
                  }`}
                  title={`Aplicar paleta ${thm.name} (seus dados continuam intactos)`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-neutral-100 line-clamp-1">{thm.name}</span>
                      {isCurrent && (
                        <span className="px-1.5 py-0.2 rounded text-[8.5px] bg-amber-400 text-neutral-950 font-bold shrink-0">
                          ✓ Ativa
                        </span>
                      )}
                    </div>
                    <div className="text-[9px] text-amber-400/90 line-clamp-1 mt-0.5">{thm.badge}</div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-neutral-800/60 mt-1.5">
                    {/* Color swatches */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-neutral-700 shrink-0 shadow-xs"
                        style={{ background: thm.bg }}
                        title="Fundo da página"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-neutral-700 shrink-0 shadow-xs"
                        style={{ background: thm.accent }}
                        title="Cor de destaque"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-neutral-700 shrink-0 shadow-xs"
                        style={{ background: thm.cardBg }}
                        title="Fundo dos cards"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-neutral-700 shrink-0 shadow-xs"
                        style={{ background: thm.textMain }}
                        title="Texto principal"
                      />
                    </div>
                    <span className="text-[8px] text-neutral-400 font-medium truncate max-w-[85px]">
                      {thm.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Cores Personalizadas */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Paleta Personalizada com Color Pickers</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.customColors.enabled}
              onChange={(e) => updateCustomColor('enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        {data.customColors.enabled && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 block">Fundo da Página</span>
              <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                <input
                  type="color"
                  value={data.customColors.bg}
                  onChange={(e) => updateCustomColor('bg', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-[10px] font-mono text-neutral-300">{data.customColors.bg}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 block">Cor de Destaque</span>
              <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                <input
                  type="color"
                  value={data.customColors.accent}
                  onChange={(e) => updateCustomColor('accent', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-[10px] font-mono text-neutral-300">{data.customColors.accent}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 block">Texto Principal</span>
              <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                <input
                  type="color"
                  value={data.customColors.textMain}
                  onChange={(e) => updateCustomColor('textMain', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-[10px] font-mono text-neutral-300">{data.customColors.textMain}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 block">Fundo dos Botões</span>
              <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                <input
                  type="color"
                  value={data.customColors.cardBg}
                  onChange={(e) => updateCustomColor('cardBg', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-[10px] font-mono text-neutral-300">{data.customColors.cardBg}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 block">Texto dos Botões</span>
              <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                <input
                  type="color"
                  value={data.customColors.cardText}
                  onChange={(e) => updateCustomColor('cardText', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-[10px] font-mono text-neutral-300">{data.customColors.cardText}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 block">Borda / Brilho</span>
              <div className="flex items-center gap-2 bg-neutral-900 p-1.5 rounded-lg border border-neutral-800">
                <input
                  type="color"
                  value={data.customColors.cardBorder}
                  onChange={(e) => updateCustomColor('cardBorder', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <span className="text-[10px] font-mono text-neutral-300">{data.customColors.cardBorder}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tipografia */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
          2. Tipografia Editorial
        </label>
        <select
          value={data.styling.fontFamily}
          onChange={(e) => updateStyle('fontFamily', e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 focus:border-amber-500 text-neutral-200"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* Tratamento da Foto de Capa */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4" /> 3. Foto de Capa (Cabeçalho) & Filtros de Estúdio
          </span>
          <label className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[11px] font-semibold cursor-pointer flex items-center gap-1.5 transition">
            <Upload className="w-3.5 h-3.5" />
            <span>Carregar Foto do Cabeçalho</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, (base64) => updateProfile('avatarUrl', base64))}
            />
          </label>
        </div>

        {/* Mini Preview + URL Input da Foto de Capa */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-black border border-neutral-700 shrink-0">
            {data.profile.avatarUrl ? (
              <img
                src={data.profile.avatarUrl}
                alt="Preview Cabeçalho"
                className="w-full h-full object-cover block"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-600 text-[9px]">
                Sem foto
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <div className="text-[10px] text-neutral-400 flex items-center justify-between">
              <span>Imagem Atual do Cabeçalho:</span>
              {data.profile.avatarUrl?.startsWith('data:') && (
                <span className="text-emerald-400 font-semibold">✓ Upload Local Ativo</span>
              )}
            </div>
            <input
              type="text"
              placeholder="Cole a URL da imagem ou use o botão Carregar..."
              value={data.profile.avatarUrl?.startsWith('data:') ? '' : data.profile.avatarUrl}
              onChange={(e) => updateProfile('avatarUrl', e.target.value)}
              className="w-full px-2.5 py-1 text-[11px] rounded bg-neutral-950 border border-neutral-800 text-neutral-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {PHOTO_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => updateStyle('photoFilter', filter.id)}
              className={`px-2 py-1 text-[11px] rounded-lg border text-center transition cursor-pointer ${
                data.styling.photoFilter === filter.id
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold'
                  : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 pt-1">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-300">Altura da Capa</span>
              <span className="text-amber-400 font-mono">{data.styling.photoHeight}px</span>
            </div>
            <input
              type="range"
              min="280"
              max="480"
              value={data.styling.photoHeight}
              onChange={(e) => updateStyle('photoHeight', Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-300">Zoom / Escala</span>
              <span className="text-amber-400 font-mono">{data.styling.photoScale}%</span>
            </div>
            <input
              type="range"
              min="100"
              max="150"
              value={data.styling.photoScale}
              onChange={(e) => updateStyle('photoScale', Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-300">Enquadramento Vertical</span>
              <span className="text-amber-400 font-mono">{data.styling.photoPosY}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={data.styling.photoPosY}
              onChange={(e) => updateStyle('photoPosY', Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-300">Arredondamento Cards</span>
              <span className="text-amber-400 font-mono">{data.styling.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="32"
              value={data.styling.borderRadius}
              onChange={(e) => updateStyle('borderRadius', Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-neutral-300">Intensidade da Vinheta / Fade de Fusão</span>
            <span className="text-amber-400 font-mono">{data.styling.vignetteIntensity}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={data.styling.vignetteIntensity}
            onChange={(e) => updateStyle('vignetteIntensity', Number(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/80">
          <label className="flex items-center gap-2 text-[11px] text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={data.styling.spotlightGlow}
              onChange={(e) => updateStyle('spotlightGlow', e.target.checked)}
              className="accent-amber-500"
            />
            <span>Spotlight Glow</span>
          </label>
          <label className="flex items-center gap-2 text-[11px] text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={data.styling.metallicBorders}
              onChange={(e) => updateStyle('metallicBorders', e.target.checked)}
              className="accent-amber-500"
            />
            <span>Bordas Metálicas</span>
          </label>
          <label className="flex items-center gap-2 text-[11px] text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={data.styling.glassmorphism}
              onChange={(e) => updateStyle('glassmorphism', e.target.checked)}
              className="accent-amber-500"
            />
            <span>Glassmorphism</span>
          </label>
        </div>

        {/* Vertical Alignment Options for .wrapper */}
        <div className="pt-3 border-t border-neutral-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4" /> Alinhamento Vertical do Conteúdo (.wrapper)
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">
              {data.styling.wrapperAlignment || 'flex-start'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'flex-start', label: 'Topo (flex-start)', desc: 'Alinhado ao topo' },
              { id: 'center', label: 'Centralizado (center)', desc: 'Centralizado verticalmente' },
              { id: 'flex-end', label: 'Rodapé (flex-end)', desc: 'Alinhado ao rodapé' },
            ].map((align) => (
              <button
                key={align.id}
                type="button"
                onClick={() => updateStyle('wrapperAlignment', align.id)}
                className={`p-2 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  (data.styling.wrapperAlignment || 'flex-start') === align.id
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold shadow'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span className="text-[11px]">{align.label}</span>
                <span className="text-[9px] font-normal opacity-70">{align.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Seção Opcional: Modelos de Demonstração (Substitui dados com confirmação) */}
        <div className="pt-4 border-t border-neutral-800/80">
          <details className="group rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-3.5">
            <summary className="cursor-pointer text-xs font-semibold text-neutral-400 hover:text-neutral-200 flex items-center justify-between select-none">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-neutral-500" />
                Carregar Conteúdo Demo Pré-pronto (Opcional · Substitui Textos/Fotos)
              </span>
              <ChevronDown className="w-4 h-4 text-neutral-500 transition group-open:rotate-180" />
            </summary>
            <div className="mt-3 text-[11px] text-neutral-400 space-y-2.5">
              <p className="text-amber-300/90 text-[10px] leading-relaxed">
                ⚠️ <strong>Aviso:</strong> Para quem está começando um microsite do zero e quer apenas carregar dados de demonstração fictícios (corte de cabelo, estética, advocacia, etc.). Se você já digitou ou importou dados do cliente, <strong>não clique aqui</strong>, pois isso substituirá as fotos e textos atuais.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {Object.values(nicheKits).map((kit: any) => (
                  <button
                    key={kit.category}
                    type="button"
                    onClick={() => {
                      if (window.confirm(`⚠️ Carregar o modelo demo "${kit.shortLabel}" irá substituir os textos, fotos e serviços atuais deste microsite por dados de exemplo. Deseja continuar?`)) {
                        applyNicheKit(kit.category);
                        showToast(`✨ Modelo demo "${kit.shortLabel}" carregado com sucesso.`);
                      }
                    }}
                    className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 text-[10px] text-neutral-300 hover:text-white text-left transition cursor-pointer"
                  >
                    <div className="font-bold text-amber-400">{kit.shortLabel}</div>
                    <div className="text-[9px] text-neutral-500 truncate">{kit.kitTitle}</div>
                  </button>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

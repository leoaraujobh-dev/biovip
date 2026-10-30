import React from 'react';
import { Palette } from 'lucide-react';
import { toSafeHexColor } from '../../utils/formatters';

export interface ModuleColorField {
  field: 'headlineColor' | 'titleColor' | 'textColor' | 'accentColor' | 'bgColor';
  label: string;
  defaultColor?: string;
  fallback?: string;
}

export interface ModuleColorControlsProps {
  moduleKey: string;
  moduleLabel: string;
  fields: ModuleColorField[];
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

export function ModuleColorControls({
  moduleKey,
  moduleLabel,
  fields,
  data,
  setData,
}: ModuleColorControlsProps) {
  const modColors = data.moduleColors?.[moduleKey] || {};
  const hasCustom = Object.values(modColors).some(v => Boolean(v));

  const applyQuickContrast = (preset: 'light' | 'dark' | 'gold') => {
    const updates: Record<string, string> = {};
    fields.forEach(f => {
      if (f.field === 'bgColor') return;
      if (preset === 'light') {
        updates[f.field] = f.field === 'textColor' ? '#e5e7eb' : '#ffffff';
      } else if (preset === 'dark') {
        updates[f.field] = f.field === 'textColor' ? '#374151' : '#111827';
      } else if (preset === 'gold') {
        updates[f.field] =
          f.field === 'headlineColor' || f.field === 'accentColor' || f.field === 'titleColor'
            ? '#d4af37'
            : '#f3f4f6';
      }
    });
    setData((p: any) => ({
      ...p,
      moduleColors: {
        ...(p.moduleColors || {}),
        [moduleKey]: {
          ...(p.moduleColors?.[moduleKey] || {}),
          ...updates,
        },
      },
    }));
  };

  const updateModuleColor = (
    field: 'headlineColor' | 'titleColor' | 'textColor' | 'accentColor' | 'bgColor',
    value: string
  ) => {
    setData((p: any) => ({
      ...p,
      moduleColors: {
        ...(p.moduleColors || {}),
        [moduleKey]: {
          ...(p.moduleColors?.[moduleKey] || {}),
          [field]: value,
        },
      },
    }));
  };

  const resetModuleColors = () => {
    setData((p: any) => {
      const next = { ...(p.moduleColors || {}) };
      delete next[moduleKey];
      return { ...p, moduleColors: next };
    });
  };

  return (
    <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800/90 space-y-2 mt-2">
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
          <Palette className="w-3 h-3 text-amber-400" />
          <span>Cores da Fonte: {moduleLabel}</span>
        </span>
        <div className="flex items-center gap-1 flex-wrap">
          <button
            type="button"
            onClick={() => applyQuickContrast('light')}
            className="px-2 py-0.5 rounded bg-neutral-950 hover:bg-neutral-800 text-[9.5px] font-semibold text-white border border-neutral-700 cursor-pointer transition"
            title="Aplicar fonte clara neste módulo (ideal para fundos escuros)"
          >
            ☀️ Fonte Clara
          </button>
          <button
            type="button"
            onClick={() => applyQuickContrast('dark')}
            className="px-2 py-0.5 rounded bg-neutral-200 hover:bg-white text-[9.5px] font-bold text-neutral-950 border border-neutral-300 cursor-pointer transition"
            title="Aplicar fonte escura neste módulo (ideal para fundos claros)"
          >
            🌙 Fonte Escura
          </button>
          <button
            type="button"
            onClick={() => applyQuickContrast('gold')}
            className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-[9.5px] font-semibold text-amber-300 border border-amber-500/40 cursor-pointer transition"
            title="Aplicar destaque dourado e texto claro"
          >
            ✨ Dourado
          </button>
          {hasCustom && (
            <button
              type="button"
              onClick={resetModuleColors}
              className="px-2 py-0.5 rounded bg-red-500/15 hover:bg-red-500/25 text-[9.5px] font-semibold text-red-300 border border-red-500/30 cursor-pointer transition"
              title="Voltar para as cores automáticas do tema"
            >
              ↺ Padrão
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {fields.map(f => {
          const currentVal = modColors[f.field] || '';
          const pickerHex = toSafeHexColor(currentVal || f.defaultColor || f.fallback, '#ffffff');
          return (
            <div
              key={f.field}
              className="flex items-center justify-between gap-1.5 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800"
            >
              <span className="text-[9.5px] text-neutral-300 truncate" title={f.label}>
                {f.label}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <input
                  type="color"
                  value={pickerHex}
                  onChange={e => updateModuleColor(f.field, e.target.value)}
                  className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
                  title={`Alterar ${f.label}`}
                />
                <span className="text-[9px] font-mono text-neutral-400">
                  {currentVal ? currentVal.toUpperCase() : 'Auto'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { Filter, Plus, Trash2, X } from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { ModuleColorControls } from '../ModuleColorControls';

export interface QualifierTabProps {
  data: typeof INITIAL_DATA;
  setData: React.Dispatch<React.SetStateAction<typeof INITIAL_DATA>>;
  theme: any;
  updateQualifier: (key: string, val: any) => void;
}

export function QualifierTab({
  data,
  setData,
  theme,
  updateQualifier,
}: QualifierTabProps) {
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Filtro de Qualificação de Clientes (Anti-Curiosos)
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.qualifierFunnel.enabled}
              onChange={(e) => updateQualifier('enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>
        <p className="text-[11px] text-neutral-300 leading-relaxed">
          Elimina curiosos que perguntam apenas &quot;qual o preço?&quot; e somem. O cliente responde a 3 perguntas estratégicas e o WhatsApp já abre com o relatório completo da necessidade dele formatado!
        </p>
      </div>

      {data.qualifierFunnel.enabled && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <span className="text-xs font-semibold text-neutral-200 block">Texto do Botão de Abertura</span>
            <div>
              <label className="text-[10px] text-neutral-400">Título do Botão</label>
              <input
                type="text"
                value={data.qualifierFunnel.triggerButtonLabel}
                onChange={(e) => updateQualifier('triggerButtonLabel', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-neutral-400">Subtítulo Explicativo</label>
              <input
                type="text"
                value={data.qualifierFunnel.triggerButtonSubtitle}
                onChange={(e) => updateQualifier('triggerButtonSubtitle', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
              />
            </div>
            <ModuleColorControls
              moduleKey="qualifierFunnel"
              moduleLabel="Botão do Funil Qualificador"
              fields={[
                { field: 'titleColor', label: 'Cor do Título', fallback: '#000000' },
                { field: 'textColor', label: 'Cor do Subtítulo', fallback: '#1f2937' },
                { field: 'bgColor', label: 'Fundo do Botão', fallback: theme.accent },
              ]}
              data={data}
              setData={setData}
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-neutral-200">Perguntas do Questionário</span>
              <button
                onClick={() => {
                  const newQ = {
                    id: 'q-' + Date.now(),
                    title: 'Nova Pergunta de Triagem',
                    options: ['Opção A', 'Opção B', 'Opção C'],
                  };
                  updateQualifier('questions', [...data.qualifierFunnel.questions, newQ]);
                }}
                className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Pergunta
              </button>
            </div>

            {data.qualifierFunnel.questions.map((q, qIndex) => (
              <div key={q.id} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    Etapa 0{qIndex + 1}
                  </span>
                  {data.qualifierFunnel.questions.length > 1 && (
                    <button
                      onClick={() => {
                        const filtered = data.qualifierFunnel.questions.filter(item => item.id !== q.id);
                        updateQualifier('questions', filtered);
                      }}
                      className="text-neutral-500 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400">Enunciado da Pergunta</label>
                  <input
                    type="text"
                    value={q.title}
                    onChange={(e) => {
                      const updated = data.qualifierFunnel.questions.map((item, idx) =>
                        idx === qIndex ? { ...item, title: e.target.value } : item
                      );
                      updateQualifier('questions', updated);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400">Opções de Resposta</label>
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex} className="flex gap-1.5">
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = data.qualifierFunnel.questions.map((item, idx) => {
                            if (idx !== qIndex) return item;
                            const newOpts = [...item.options];
                            newOpts[optIndex] = e.target.value;
                            return { ...item, options: newOpts };
                          });
                          updateQualifier('questions', updated);
                        }}
                        className="flex-1 px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                      />
                      {q.options.length > 2 && (
                        <button
                          onClick={() => {
                            const updated = data.qualifierFunnel.questions.map((item, idx) => {
                              if (idx !== qIndex) return item;
                              return { ...item, options: item.options.filter((_, i) => i !== optIndex) };
                            });
                            updateQualifier('questions', updated);
                          }}
                          className="text-neutral-500 hover:text-red-400 px-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const updated = data.qualifierFunnel.questions.map((item, idx) =>
                        idx === qIndex ? { ...item, options: [...item.options, 'Nova opção de escolha'] } : item
                      );
                      updateQualifier('questions', updated);
                    }}
                    className="text-[10px] text-amber-400 hover:underline pt-1 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar opção nesta pergunta
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

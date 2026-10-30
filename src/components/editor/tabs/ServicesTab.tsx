import React from 'react';
import {
  Tag,
  Plus,
  Star,
  ArrowLeft,
  ArrowRight,
  Copy,
  Trash2,
  Sparkles,
  Upload,
} from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { ModuleColorControls } from '../ModuleColorControls';

export interface ServicesTabProps {
  data: typeof INITIAL_DATA;
  setData: React.Dispatch<React.SetStateAction<typeof INITIAL_DATA>>;
  theme: any;
  updateServicesConfig: (key: string, val: any) => void;
  addService: () => void;
  loadServicesPreset: (presetId: 'law' | 'beauty' | 'barber' | 'mentorship' | 'health') => void;
  updateService: (id: string, key: string, val: any) => void;
  moveService: (fromIndex: number, toIndex: number) => void;
  duplicateService: (id: string) => void;
  removeService: (id: string) => void;
  openCopyOptimizer: (fieldLabel: string, currentText: string, onApply: (newText: string) => void) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
}

export function ServicesTab({
  data,
  setData,
  theme,
  updateServicesConfig,
  addService,
  loadServicesPreset,
  updateService,
  moveService,
  duplicateService,
  removeService,
  openCopyOptimizer,
  handleFileUpload,
}: ServicesTabProps) {
  return (
    <div className="space-y-5">
      {/* Header & Master Switch */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Procedimentos, Consultorias ou Cursos</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {data.services.items.length} {data.services.items.length === 1 ? 'item' : 'itens'}
              </span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Cards de alta conversão com foto, ancoragem de preço, duração, selo de destaque e ação customizável.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800">
              <input
                type="checkbox"
                checked={data.services.enabled}
                onChange={(e) => updateServicesConfig('enabled', e.target.checked)}
                className="accent-amber-500"
              />
              <span>Exibir no Site</span>
            </label>
            <button
              type="button"
              onClick={addService}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1 shadow transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Item
            </button>
          </div>
        </div>

        {/* Presets Rápidos por Nicho */}
        <div className="pt-3 border-t border-neutral-800/80 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
            Preencher Catálogo com Modelo Pronto (1-Clique):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'law', label: '⚖️ Jurídico & Consultoria' },
              { id: 'beauty', label: '💅 Estética & Beleza' },
              { id: 'barber', label: '💈 Barbearia & Combos' },
              { id: 'mentorship', label: '🎓 Mentoria & Cursos' },
              { id: 'health', label: '🩺 Saúde & Clínica' },
            ].map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => loadServicesPreset(preset.id as 'law' | 'beauty' | 'barber' | 'mentorship' | 'health')}
                className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-amber-500/15 text-neutral-300 hover:text-amber-300 border border-neutral-800 hover:border-amber-500/40 text-[10px] font-semibold transition cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Título, Subtítulo, Selo e Layout do Catálogo */}
        <div className="pt-3 border-t border-neutral-800/80 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">Selo Superior (Badge)</label>
              <input
                type="text"
                placeholder="Ex: CATÁLOGO VIP"
                value={data.services.badge || ''}
                onChange={(e) => updateServicesConfig('badge', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 font-bold uppercase"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] text-neutral-400 block mb-1">Título da Seção no Microsite</label>
              <input
                type="text"
                placeholder="Ex: Como posso te ajudar"
                value={data.services.headline}
                onChange={(e) => updateServicesConfig('headline', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-neutral-400 block mb-1">Subtítulo Explicativo da Seção (Opcional)</label>
            <input
              type="text"
              placeholder="Ex: Escolha o atendimento ideal e reserve seu horário pelo WhatsApp"
              value={data.services.subtitle || ''}
              onChange={(e) => updateServicesConfig('subtitle', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
            />
          </div>

          {/* Seletor de Estilo de Exibição */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
              Formato de Exibição no Celular:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'list', title: 'Lista Compacta', desc: 'Foto lateral + reserva rápida' },
                { id: 'featured', title: 'Vitrine Expandida', desc: 'Foto grande 16:9 em destaque' },
                { id: 'grid2', title: 'Grade 2 Colunas', desc: 'Cards lado a lado estilo loja' },
              ].map((lyt) => {
                const isSelected = (data.services.layout || 'list') === lyt.id;
                return (
                  <button
                    key={lyt.id}
                    type="button"
                    onClick={() => updateServicesConfig('layout', lyt.id)}
                    className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/15 text-amber-200 shadow'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-[11px] font-bold">{lyt.title}</div>
                    <div className="text-[9px] opacity-75 mt-0.5">{lyt.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <ModuleColorControls
            moduleKey="services"
            moduleLabel="Catálogo de Serviços"
            fields={[
              { field: 'headlineColor', label: 'Título da Seção', fallback: theme.accent },
              { field: 'titleColor', label: 'Nome do Serviço / Item', fallback: theme.textMain },
              { field: 'textColor', label: 'Descrição & Subtítulo', fallback: theme.textMuted },
              { field: 'accentColor', label: 'Cor do Preço & Destaque', fallback: theme.accent },
              { field: 'bgColor', label: 'Fundo dos Cards', fallback: theme.socialBg },
            ]}
            data={data}
            setData={setData}
          />
        </div>
      </div>

      {/* Lista de Cards de Procedimentos / Consultorias / Cursos */}
      <div className="space-y-3.5">
        {data.services.items.map((srv, idx) => (
          <div
            key={srv.id}
            className={`p-4 rounded-xl bg-neutral-950 border transition space-y-3 ${
              srv.featured
                ? 'border-amber-500/60 ring-1 ring-amber-500/20'
                : 'border-neutral-800'
            }`}
          >
            {/* Barra de Topo do Item */}
            <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-neutral-800/80">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-bold text-amber-400">
                  Item #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => updateService(srv.id, 'featured', !srv.featured)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition cursor-pointer border ${
                    srv.featured
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                  }`}
                  title="Destacar este card com borda luminosa no catálogo"
                >
                  <Star className={`w-3 h-3 ${srv.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span>{srv.featured ? 'Card Destacado' : 'Destacar Card'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveService(idx, idx - 1)}
                  className={`p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 transition ${
                    idx === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  title="Mover para cima"
                >
                  <ArrowLeft className="w-3.5 h-3.5 rotate-90" />
                </button>
                <button
                  type="button"
                  disabled={idx === data.services.items.length - 1}
                  onClick={() => moveService(idx, idx + 1)}
                  className={`p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 transition ${
                    idx === data.services.items.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  title="Mover para baixo"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() => duplicateService(srv.id)}
                  className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-300 hover:bg-neutral-800 transition cursor-pointer"
                  title="Duplicar este item"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeService(srv.id)}
                  className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                  title="Excluir este item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Linha 1: Nome & Selo (Badge) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="sm:col-span-2">
                <label className="text-[10px] text-neutral-400 block mb-1">Nome do Procedimento / Consultoria / Curso</label>
                <input
                  type="text"
                  value={srv.name}
                  onChange={(e) => updateService(srv.id, 'name', e.target.value)}
                  placeholder="Ex: Consultoria Estratégica Individual"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold"
                />
              </div>
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Selo / Etiqueta (Opcional)</label>
                <input
                  type="text"
                  value={srv.badge || ''}
                  onChange={(e) => updateService(srv.id, 'badge', e.target.value)}
                  placeholder="Ex: MAIS PROCURADO"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold uppercase"
                />
              </div>
            </div>

            {/* Linha 2: Preço De (Ancoragem), Valor Atual e Duração/Formato */}
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Preço Antigo (Riscado)</label>
                <input
                  type="text"
                  value={srv.oldPrice || ''}
                  onChange={(e) => updateService(srv.id, 'oldPrice', e.target.value)}
                  placeholder="Ex: R$ 490"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 line-through"
                />
              </div>
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Valor / Honorários</label>
                <input
                  type="text"
                  value={srv.price}
                  onChange={(e) => updateService(srv.id, 'price', e.target.value)}
                  placeholder="Ex: R$ 350 ou Sob Consulta"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Duração / Entrega</label>
                <input
                  type="text"
                  value={srv.duration || ''}
                  onChange={(e) => updateService(srv.id, 'duration', e.target.value)}
                  placeholder="Ex: 1h30, 45min, Online"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                />
              </div>
            </div>

            {/* Linha 3: Descrição Breve + Otimizador de Copy IA */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] text-neutral-400">Descrição Breve & Benefícios</label>
                <button
                  type="button"
                  onClick={() =>
                    openCopyOptimizer(
                      `Descrição do Serviço: ${srv.name}`,
                      srv.description,
                      (newText) => updateService(srv.id, 'description', newText)
                    )
                  }
                  className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 fill-amber-400" />
                  <span>Otimizar Copy com IA</span>
                </button>
              </div>
              <textarea
                rows={2}
                value={srv.description}
                onChange={(e) => updateService(srv.id, 'description', e.target.value)}
                placeholder="Descreva os principais benefícios e entregáveis deste procedimento ou consultoria..."
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 resize-none"
              />
            </div>

            {/* Linha 4: Ação do Botão & Texto do CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Texto do Botão</label>
                <input
                  type="text"
                  value={srv.ctaLabel || 'Reservar'}
                  onChange={(e) => updateService(srv.id, 'ctaLabel', e.target.value)}
                  placeholder="Ex: Reservar, Agendar, Comprar"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] text-neutral-400 block mb-1">Ação ao Clicar no Botão</label>
                <select
                  value={srv.actionType || 'booking'}
                  onChange={(e) => updateService(srv.id, 'actionType', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                >
                  <option value="booking">📅 Abrir Modal de Pré-Agendamento VIP</option>
                  <option value="whatsapp">💬 WhatsApp Direto (Com Nome & Valor do Item)</option>
                  <option value="link">🔗 Abrir Link Externo / Checkout (Hotmart, Kiwify, etc.)</option>
                </select>
              </div>
            </div>

            {srv.actionType === 'link' && (
              <div>
                <label className="text-[10px] text-amber-300 block mb-1">URL do Checkout / Página de Vendas Externa</label>
                <input
                  type="text"
                  value={srv.customUrl || ''}
                  onChange={(e) => updateService(srv.id, 'customUrl', e.target.value)}
                  placeholder="https://pay.kiwify.com.br/... ou https://..."
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-amber-500/40 text-amber-200 font-mono"
                />
              </div>
            )}

            {/* Linha 5: Foto com Preview em Miniatura & Upload */}
            <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-black border border-neutral-700 shrink-0">
                {srv.imageUrl ? (
                  <img
                    src={srv.imageUrl}
                    alt={srv.name}
                    referrerPolicy={srv.imageUrl.startsWith('http') ? 'no-referrer' : undefined}
                    className="w-full h-full object-cover block"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[9px] text-neutral-600">
                    Sem foto
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-neutral-400 font-medium flex items-center gap-1.5">
                    <span>Foto do Card</span>
                    {srv.imageUrl?.startsWith('data:') && (
                      <span className="text-emerald-400 font-semibold">✓ Upload Local Ativo</span>
                    )}
                  </label>
                  <label className="px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[10px] font-semibold cursor-pointer flex items-center gap-1 transition">
                    <Upload className="w-3 h-3" /> Upload Foto
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (base64) => updateService(srv.id, 'imageUrl', base64))}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Ou cole aqui a URL da imagem (https://...)"
                  value={srv.imageUrl?.startsWith('data:') ? '' : srv.imageUrl}
                  onChange={(e) => updateService(srv.id, 'imageUrl', e.target.value)}
                  className="w-full px-2.5 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

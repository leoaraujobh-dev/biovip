import React from 'react';
import {
  TrendingUp,
  ListOrdered,
  Grid,
  Sparkles,
  Upload,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Plus,
  Star,
  MapPin,
  Clock,
  User,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { ModuleColorControls } from '../ModuleColorControls';

export interface ModulesTabProps {
  data: typeof INITIAL_DATA;
  setData: React.Dispatch<React.SetStateAction<typeof INITIAL_DATA>>;
  theme: any;
  photoOrientations?: Record<string, { orientation: 'portrait' | 'landscape' | 'square'; ratio: number }>;
  updateMetrics: (key: string, val: any) => void;
  updateProcess: (key: string, val: any) => void;
  updateStudentGrid: (key: string, val: any) => void;
  loadGalleryPreset: (preset: 'beauty' | 'barber' | 'health' | 'exec') => void;
  addGalleryPhoto: (url: string, caption?: string) => void;
  setLightboxIndex: (idx: number) => void;
  updateGalleryPhotoCaption: (idx: number, caption: string) => void;
  moveGalleryPhoto: (fromIndex: number, toIndex: number) => void;
  removeGalleryPhoto: (idx: number) => void;
  newGalleryUrl: string;
  setNewGalleryUrl: React.Dispatch<React.SetStateAction<string>>;
  newGalleryCaption: string;
  setNewGalleryCaption: React.Dispatch<React.SetStateAction<string>>;
  updateBeforeAfter: (key: string, val: any) => void;
  addTestimonial: () => void;
  updateTestimonial: (id: string, key: string, val: any) => void;
  removeTestimonial: (id: string) => void;
  updateLocationCard: (key: string, val: any) => void;
  updateAboutMe: (key: string, val: any) => void;
  updateFaq: (key: string, val: any) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
  showToast: (msg: string) => void;
}

export function ModulesTab({
  data,
  setData,
  theme,
  photoOrientations = {},
  updateMetrics,
  updateProcess,
  updateStudentGrid,
  loadGalleryPreset,
  addGalleryPhoto,
  setLightboxIndex,
  updateGalleryPhotoCaption,
  moveGalleryPhoto,
  removeGalleryPhoto,
  newGalleryUrl,
  setNewGalleryUrl,
  newGalleryCaption,
  setNewGalleryCaption,
  updateBeforeAfter,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
  updateLocationCard,
  updateAboutMe,
  updateFaq,
  handleFileUpload,
  showToast,
}: ModulesTabProps) {
  return (
    <div className="space-y-6">
      {/* Módulo: Métricas de Autoridade */}
      <div id="module-metrics" className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 scroll-mt-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Métricas de Autoridade (+500 Clientes, 8 Anos...)</span>
          </div>
          <input
            type="checkbox"
            checked={data.metrics.enabled}
            onChange={(e) => updateMetrics('enabled', e.target.checked)}
            className="accent-amber-500"
          />
        </div>

        {data.metrics.enabled && (
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="space-y-1">
              <input
                type="text"
                value={data.metrics.stat1Value}
                onChange={(e) => updateMetrics('stat1Value', e.target.value)}
                className="w-full px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold"
              />
              <input
                type="text"
                value={data.metrics.stat1Label}
                onChange={(e) => updateMetrics('stat1Label', e.target.value)}
                className="w-full px-2 py-1 text-[10px] rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
              />
            </div>
            <div className="space-y-1">
              <input
                type="text"
                value={data.metrics.stat2Value}
                onChange={(e) => updateMetrics('stat2Value', e.target.value)}
                className="w-full px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold"
              />
              <input
                type="text"
                value={data.metrics.stat2Label}
                onChange={(e) => updateMetrics('stat2Label', e.target.value)}
                className="w-full px-2 py-1 text-[10px] rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
              />
            </div>
            <div className="space-y-1">
              <input
                type="text"
                value={data.metrics.stat3Value}
                onChange={(e) => updateMetrics('stat3Value', e.target.value)}
                className="w-full px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-amber-400 font-bold"
              />
              <input
                type="text"
                value={data.metrics.stat3Label}
                onChange={(e) => updateMetrics('stat3Label', e.target.value)}
                className="w-full px-2 py-1 text-[10px] rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
              />
            </div>
          </div>
        )}
        {data.metrics.enabled && (
          <ModuleColorControls
            moduleKey="metrics"
            moduleLabel="Métricas de Autoridade"
            fields={[
              { field: 'accentColor', label: 'Cor dos Números (+500, 8...)', fallback: theme.accent },
              { field: 'textColor', label: 'Cor das Legendas', fallback: theme.textMuted },
              { field: 'bgColor', label: 'Cor do Fundo do Bloco', fallback: theme.socialBg },
            ]}
            data={data}
            setData={setData}
          />
        )}
      </div>

      {/* Módulo: Como Funciona o Processo */}
      <div id="module-processSteps" className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 scroll-mt-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Etapas / &quot;Como funciona o processo (01, 02, 03)&quot;</span>
          </div>
          <input
            type="checkbox"
            checked={data.processSteps.enabled}
            onChange={(e) => updateProcess('enabled', e.target.checked)}
            className="accent-amber-500"
          />
        </div>

        {data.processSteps.enabled && (
          <div className="space-y-3 pt-2">
            <div>
              <label className="text-[10px] text-neutral-400">Título da Seção</label>
              <input
                type="text"
                value={data.processSteps.headline}
                onChange={(e) => updateProcess('headline', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
              />
            </div>
            {data.processSteps.steps.map((step, idx) => (
              <div key={step.id} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5">
                <div className="flex justify-between items-center text-[10px] text-amber-400 font-bold">
                  <span>ETAPA 0{idx + 1}</span>
                </div>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => {
                    const nextSteps = [...data.processSteps.steps];
                    nextSteps[idx].title = e.target.value;
                    updateProcess('steps', nextSteps);
                  }}
                  className="w-full px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-200 font-semibold"
                />
                <input
                  type="text"
                  value={step.description}
                  onChange={(e) => {
                    const nextSteps = [...data.processSteps.steps];
                    nextSteps[idx].description = e.target.value;
                    updateProcess('steps', nextSteps);
                  }}
                  className="w-full px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                />
              </div>
            ))}
            <ModuleColorControls
              moduleKey="processSteps"
              moduleLabel="Como Funciona o Processo"
              fields={[
                { field: 'headlineColor', label: 'Título da Seção', fallback: theme.accent },
                { field: 'titleColor', label: 'Título das Etapas', fallback: theme.textMain },
                { field: 'textColor', label: 'Texto Descritivo', fallback: theme.textMuted },
                { field: 'accentColor', label: 'Cor do Número (01, 02)', fallback: theme.accent },
                { field: 'bgColor', label: 'Fundo dos Cards', fallback: theme.socialBg },
              ]}
              data={data}
              setData={setData}
            />
          </div>
        )}
      </div>

      {/* Módulo: Galeria de Fotos & Portfólio de Resultados */}
      <div id="module-studentGrid" className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4 scroll-mt-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid className="w-4 h-4 text-amber-400" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-200">Galeria de Fotos & Portfólio</span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {data.studentGrid.photos?.length || 0} FOTOS
                </span>
              </div>
              <p className="text-[10px] text-neutral-400">Layouts responsivos, carrossel touch, mosaico e zoom lightbox</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={data.studentGrid.enabled}
            onChange={(e) => updateStudentGrid('enabled', e.target.checked)}
            className="accent-amber-500 w-4 h-4 cursor-pointer"
          />
        </div>

        {data.studentGrid.enabled && (
          <div className="space-y-4 pt-2 border-t border-neutral-800/80">
            {/* Linha 1: Título, Badge e Subtítulo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1">Badge Superior</label>
                <input
                  type="text"
                  placeholder="Ex: PORTFÓLIO REAL"
                  value={data.studentGrid.badge || ''}
                  onChange={(e) => updateStudentGrid('badge', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold uppercase"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] text-neutral-400 block mb-1">Título da Galeria</label>
                <input
                  type="text"
                  value={data.studentGrid.headline}
                  onChange={(e) => updateStudentGrid('headline', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">Subtítulo Explicativo</label>
              <input
                type="text"
                placeholder="Ex: Transformações reais geradas pelo método e registros de alto padrão"
                value={data.studentGrid.subtitle || ''}
                onChange={(e) => updateStudentGrid('subtitle', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
              />
            </div>

            {/* Linha 2: Seletor de Layout da Galeria */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-neutral-300 block">
                Formato de Exibição no Celular
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'carousel-snap', label: '🎠 Carrossel Touch', desc: 'Deslize horizontal fluido' },
                  { id: 'grid-2col', label: '📱 Grade 2 Colunas', desc: 'Fotos lado a lado' },
                  { id: 'mosaic', label: '🎨 Mosaico Dinâmico', desc: 'Destaque 1ª grande + grid' },
                  { id: 'scroll-cards', label: '🃏 Cards Expandidos', desc: '1 por vez com foco total' },
                ].map((lyt) => (
                  <button
                    key={lyt.id}
                    type="button"
                    onClick={() => updateStudentGrid('layout', lyt.id)}
                    className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                      (data.studentGrid.layout || 'carousel-snap') === lyt.id
                        ? 'border-amber-400 bg-amber-500/15 text-amber-200'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-[11px] font-bold">{lyt.label}</div>
                    <div className="text-[9px] opacity-75 mt-0.5">{lyt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Linha 3: Proporção das Imagens (Aspect Ratio) & Lightbox Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-neutral-300 block">
                  Formato das Imagens (Proporção)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: 'auto', label: '🤖 Auto (Detecta)' },
                    { id: 'square', label: '1:1 Quadrado' },
                    { id: 'portrait', label: '4:5 Retrato' },
                    { id: 'landscape', label: '4:3 Paisagem' },
                  ].map((ar) => (
                    <button
                      key={ar.id}
                      type="button"
                      onClick={() => updateStudentGrid('aspectRatio', ar.id)}
                      className={`py-1.5 px-2 rounded-lg border text-center text-[10px] font-medium transition cursor-pointer ${
                        (data.studentGrid.aspectRatio || 'auto') === ar.id
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {ar.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-neutral-200 block">Zoom Lightbox</span>
                  <span className="text-[9.5px] text-neutral-400 block">Toque na foto para ampliar em tela cheia</span>
                </div>
                <input
                  type="checkbox"
                  checked={data.studentGrid.enableLightbox !== false}
                  onChange={(e) => updateStudentGrid('enableLightbox', e.target.checked)}
                  className="accent-amber-500 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            {/* Presets Rápidos por Nicho */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Preencher Fotos com Exemplos de Alto Padrão por Nicho:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => loadGalleryPreset('beauty')}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10.5px] text-neutral-300 font-medium transition cursor-pointer text-center"
                >
                  💅 Beleza & Lash
                </button>
                <button
                  type="button"
                  onClick={() => loadGalleryPreset('barber')}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10.5px] text-neutral-300 font-medium transition cursor-pointer text-center"
                >
                  ✂️ Barbearia
                </button>
                <button
                  type="button"
                  onClick={() => loadGalleryPreset('health')}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10.5px] text-neutral-300 font-medium transition cursor-pointer text-center"
                >
                  🩺 Saúde & Clínica
                </button>
                <button
                  type="button"
                  onClick={() => loadGalleryPreset('exec')}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-[10.5px] text-neutral-300 font-medium transition cursor-pointer text-center"
                >
                  💼 Executivo & Cursos
                </button>
              </div>
            </div>

            {/* Gerenciador de Fotos Atuais */}
            <div className="space-y-2 pt-2 border-t border-neutral-800/80">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-neutral-200">
                  Fotos na Galeria ({data.studentGrid.photos?.length || 0})
                </label>
                <label className="text-[10px] text-amber-400 hover:underline cursor-pointer flex items-center gap-1 font-semibold">
                  <Upload className="w-3 h-3" /> + Upload Direto do Computador
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files || files.length === 0) return;
                      Array.from(files).forEach((file) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                          const rawResult = reader.result;
                          if (typeof rawResult === 'string') {
                            const img = new window.Image();
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
                                  addGalleryPhoto(canvas.toDataURL('image/jpeg', 0.8));
                                  return;
                                }
                              } catch {}
                              addGalleryPhoto(rawResult);
                            };
                            img.onerror = () => addGalleryPhoto(rawResult);
                            img.src = rawResult;
                          }
                        };
                        reader.readAsDataURL(file);
                      });
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>

              {/* Lista de Fotos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[420px] overflow-y-auto tab-scrollbar p-1">
                {data.studentGrid.photos?.map((photo, idx) => {
                  const info = photoOrientations[photo];
                  const orient = info?.orientation || 'square';
                  const currentCaption = ((data.studentGrid as any).captions || [])[idx] || '';
                  return (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 relative group"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden border border-neutral-800 bg-black">
                        <img
                          src={photo}
                          alt={currentCaption || `Foto ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[8px] font-mono font-bold text-white">
                          #{idx + 1}
                        </span>
                        <span className={`absolute top-1 right-1 px-1.5 py-0.5 rounded text-[7.5px] font-bold border backdrop-blur ${
                          orient === 'portrait'
                            ? 'bg-emerald-500/80 text-white border-emerald-400/50'
                            : orient === 'landscape'
                            ? 'bg-amber-500/80 text-black border-amber-300'
                            : 'bg-neutral-800/80 text-neutral-200 border-neutral-600'
                        }`}>
                          {orient === 'portrait' ? '↕ Retrato' : orient === 'landscape' ? '↔ Paisagem' : '⏹ 1:1'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setLightboxIndex(idx)}
                          className="absolute bottom-1 right-1 p-1 rounded bg-black/60 text-white hover:bg-black/90 cursor-pointer"
                          title="Visualizar zoom"
                        >
                          <Maximize2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Descrição opcional da imagem..."
                          value={currentCaption}
                          onChange={(e) => updateGalleryPhotoCaption(idx, e.target.value)}
                          className="w-full px-2 py-1 text-[10.5px] rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
                          title="Adicione uma legenda ou descrição opcional para esta imagem"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-1 pt-0.5">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveGalleryPhoto(idx, idx - 1)}
                            className={`p-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition ${
                              idx === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                            title="Mover para a esquerda"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === (data.studentGrid.photos?.length || 0) - 1}
                            onClick={() => moveGalleryPhoto(idx, idx + 1)}
                            className={`p-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition ${
                              idx === (data.studentGrid.photos?.length || 0) - 1
                                ? 'opacity-30 cursor-not-allowed'
                                : 'cursor-pointer'
                            }`}
                            title="Mover para a direita"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1">
                          <label
                            className="p-1 rounded bg-neutral-800 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 transition cursor-pointer"
                            title="Substituir foto por arquivo local"
                          >
                            <Upload className="w-3 h-3" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (base64) => {
                                  const newP = [...data.studentGrid.photos];
                                  newP[idx] = base64;
                                  updateStudentGrid('photos', newP);
                                  showToast(`📸 Foto #${idx + 1} substituída!`);
                                })
                              }
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => removeGalleryPhoto(idx)}
                            className="p-1 rounded bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition cursor-pointer"
                            title="Excluir foto"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input para adicionar nova foto por URL + Descrição opcional */}
              <div className="pt-2 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Cole a URL da imagem aqui para adicionar..."
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addGalleryPhoto(newGalleryUrl, newGalleryCaption);
                      }
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:border-amber-400 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Descrição opcional da imagem (legenda)..."
                      value={newGalleryCaption}
                      onChange={(e) => setNewGalleryCaption(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addGalleryPhoto(newGalleryUrl, newGalleryCaption);
                        }
                      }}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 focus:border-amber-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => addGalleryPhoto(newGalleryUrl, newGalleryCaption)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition shadow shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ModuleColorControls
              moduleKey="studentGrid"
              moduleLabel="Galeria de Fotos"
              fields={[
                { field: 'headlineColor', label: 'Título da Galeria', fallback: theme.accent },
                { field: 'textColor', label: 'Subtítulo', fallback: theme.textMuted },
                { field: 'bgColor', label: 'Fundo da Galeria', fallback: theme.socialBg },
              ]}
              data={data}
              setData={setData}
            />
          </div>
        )}
      </div>

      {/* Módulo: Antes e Depois Interativo */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Comparador Antes & Depois Interativo</span>
          </div>
          <input
            type="checkbox"
            checked={data.beforeAfter.enabled}
            onChange={(e) => updateBeforeAfter('enabled', e.target.checked)}
            className="accent-amber-500"
          />
        </div>

        {data.beforeAfter.enabled && (
          <div className="space-y-2.5 pt-1">
            <div>
              <label className="text-[10px] text-neutral-400">Título da Seção</label>
              <input
                type="text"
                value={data.beforeAfter.headline}
                onChange={(e) => updateBeforeAfter('headline', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] text-neutral-400">Foto Antes</label>
                  <label className="text-[10px] text-amber-400 cursor-pointer hover:underline">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (b64) => updateBeforeAfter('beforeUrl', b64))}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={data.beforeAfter.beforeUrl.startsWith('data:') ? 'Upload local' : data.beforeAfter.beforeUrl}
                  onChange={(e) => updateBeforeAfter('beforeUrl', e.target.value)}
                  className="w-full px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] text-neutral-400">Foto Depois</label>
                  <label className="text-[10px] text-amber-400 cursor-pointer hover:underline">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (b64) => updateBeforeAfter('afterUrl', b64))}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={data.beforeAfter.afterUrl.startsWith('data:') ? 'Upload local' : data.beforeAfter.afterUrl}
                  onChange={(e) => updateBeforeAfter('afterUrl', e.target.value)}
                  className="w-full px-2 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                />
              </div>
            </div>
            <ModuleColorControls
              moduleKey="beforeAfter"
              moduleLabel="Antes & Depois"
              fields={[
                { field: 'headlineColor', label: 'Cor do Título da Seção', fallback: theme.accent },
              ]}
              data={data}
              setData={setData}
            />
          </div>
        )}
      </div>

      {/* Módulo: Depoimentos de Clientes */}
      <div id="module-testimonials" className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 scroll-mt-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Carrossel de Depoimentos</span>
          </div>
          <div className="flex items-center gap-2">
            {data.testimonials.enabled && (
              <button
                onClick={addTestimonial}
                className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-medium flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Novo
              </button>
            )}
            <input
              type="checkbox"
              checked={data.testimonials.enabled}
              onChange={(e) => setData(p => ({ ...p, testimonials: { ...p.testimonials, enabled: e.target.checked } }))}
              className="accent-amber-500"
            />
          </div>
        </div>

        {data.testimonials.enabled && (
          <div className="space-y-2.5 pt-1">
            {data.testimonials.items.map((t) => (
              <div key={t.id} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5">
                <div className="flex justify-between gap-2">
                  <input
                    type="text"
                    value={t.clientName}
                    onChange={(e) => updateTestimonial(t.id, 'clientName', e.target.value)}
                    placeholder="Cliente"
                    className="flex-1 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-200"
                  />
                  <input
                    type="text"
                    value={t.city}
                    onChange={(e) => updateTestimonial(t.id, 'city', e.target.value)}
                    placeholder="Cidade"
                    className="w-28 px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                  />
                  <button
                    onClick={() => removeTestimonial(t.id)}
                    className="text-neutral-500 hover:text-red-400 px-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={t.text}
                  onChange={(e) => updateTestimonial(t.id, 'text', e.target.value)}
                  className="w-full px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-300 resize-none"
                />
              </div>
            ))}
            <ModuleColorControls
              moduleKey="testimonials"
              moduleLabel="Depoimentos"
              fields={[
                { field: 'headlineColor', label: 'Título da Seção', fallback: theme.accent },
                { field: 'textColor', label: 'Texto do Depoimento', fallback: theme.textMuted },
                { field: 'titleColor', label: 'Nome do Cliente', fallback: theme.textMain },
                { field: 'accentColor', label: 'Cor das Estrelas', fallback: '#fbbf24' },
                { field: 'bgColor', label: 'Fundo dos Cards', fallback: theme.socialBg },
              ]}
              data={data}
              setData={setData}
            />
          </div>
        )}
      </div>

      {/* Módulo: Card de Localização / Google Maps */}
      <div id="module-locationCard" className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 scroll-mt-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Card de Localização & Endereço</span>
          </div>
          <input
            type="checkbox"
            checked={data.locationCard.enabled}
            onChange={(e) => updateLocationCard('enabled', e.target.checked)}
            className="accent-amber-500"
          />
        </div>

        {data.locationCard.enabled && (
          <div className="space-y-2.5 pt-1">
            <div>
              <label className="text-[10px] text-neutral-400">Título do Card</label>
              <input
                type="text"
                value={data.locationCard.headline}
                onChange={(e) => updateLocationCard('headline', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-neutral-400">Endereço Exibido</label>
              <input
                type="text"
                value={data.locationCard.address}
                onChange={(e) => updateLocationCard('address', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-neutral-400">Link do Google Maps</label>
              <input
                type="text"
                value={data.locationCard.mapsUrl}
                onChange={(e) => updateLocationCard('mapsUrl', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
              />
            </div>
            <div className="pt-1 border-t border-neutral-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Horário de Funcionamento & Status Aberto
                </span>
                <input
                  type="checkbox"
                  checked={data.locationCard.showHours !== false}
                  onChange={(e) => updateLocationCard('showHours', e.target.checked)}
                  className="accent-emerald-500"
                />
              </div>
              {data.locationCard.showHours !== false && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-neutral-400">Horário de Atendimento</label>
                    <input
                      type="text"
                      placeholder="Seg a Sáb · 08:30 às 19:30"
                      value={data.locationCard.hours || ''}
                      onChange={(e) => updateLocationCard('hours', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400">Selo Status (Ex: ABERTO AGORA)</label>
                    <input
                      type="text"
                      placeholder="ABERTO AGORA · HORA MARCADA"
                      value={data.locationCard.openStatus || ''}
                      onChange={(e) => updateLocationCard('openStatus', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                    />
                  </div>
                </div>
              )}
            </div>
            <ModuleColorControls
              moduleKey="locationCard"
              moduleLabel="Card de Localização"
              fields={[
                { field: 'titleColor', label: 'Título (Ex: Onde Estamos)', fallback: theme.textMain },
                { field: 'textColor', label: 'Cor do Endereço', fallback: theme.textMuted },
                { field: 'accentColor', label: 'Cor do Horário / Ícone', fallback: theme.textMain },
                { field: 'bgColor', label: 'Fundo do Card', fallback: theme.socialBg },
              ]}
              data={data}
              setData={setData}
            />
          </div>
        )}
      </div>

      {/* Módulo: Sobre Mim & FAQ */}
      <div id="module-aboutMe" className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 scroll-mt-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Sobre Mim & Biografia Editorial</span>
          </div>
          <input
            type="checkbox"
            checked={data.aboutMe.enabled}
            onChange={(e) => updateAboutMe('enabled', e.target.checked)}
            className="accent-amber-500"
          />
        </div>

        {data.aboutMe.enabled && (
          <div className="space-y-2.5 pt-1">
            <div>
              <label className="text-[10px] text-neutral-400">Título da Seção</label>
              <input
                type="text"
                value={data.aboutMe.headline}
                onChange={(e) => updateAboutMe('headline', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200 font-semibold"
              />
            </div>

            {/* Imagem de Destaque / Foto da Seção Sobre */}
            {(() => {
              const currentAboutPhoto = (data.aboutMe as any)?.photoUrl || data.profile?.aboutPhotoUrl || '';
              const setAboutPhoto = (newUrl: string) => {
                setData((prev) => ({
                  ...prev,
                  profile: {
                    ...prev.profile,
                    aboutPhotoUrl: newUrl,
                  },
                  aboutMe: {
                    ...prev.aboutMe,
                    photoUrl: newUrl,
                  },
                }));
              };

              return (
                <div className="p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-amber-400" /> Foto em Destaque da Seção (Upload ou URL)
                    </label>
                    <div className="flex items-center gap-2">
                      {currentAboutPhoto && (
                        <button
                          type="button"
                          onClick={() => setAboutPhoto('')}
                          className="px-2 py-1 text-[10px] text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition flex items-center gap-1"
                          title="Remover foto da seção"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remover</span>
                        </button>
                      )}
                      <label className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[11px] font-medium cursor-pointer flex items-center gap-1.5 transition">
                        <Upload className="w-3 h-3" />
                        <span>Carregar Arquivo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (base64) => setAboutPhoto(base64))}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-0.5">
                    <div className="w-16 h-14 rounded-xl overflow-hidden bg-black border border-neutral-800 shrink-0 relative">
                      {currentAboutPhoto ? (
                        <img
                          src={currentAboutPhoto}
                          alt="Miniatura Sobre"
                          className="w-full h-full object-cover block"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-600 text-[10px] text-center p-1">
                          Sem foto
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        placeholder="Ou cole aqui a URL direta da imagem (https://...)"
                        value={currentAboutPhoto?.startsWith('data:') ? '' : currentAboutPhoto}
                        onChange={(e) => setAboutPhoto(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
                      />
                      {currentAboutPhoto?.startsWith('data:') && (
                        <p className="text-[10px] text-emerald-400 font-medium">
                          ✓ Imagem carregada do seu dispositivo e exibida na seção Sobre do simulador.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
            <div>
              <label className="text-[10px] text-neutral-400">Texto da Biografia</label>
              <textarea
                rows={3}
                value={data.aboutMe.paragraph || (data.aboutMe as any).text || ''}
                onChange={(e) => {
                  updateAboutMe('paragraph', e.target.value);
                  updateAboutMe('text', e.target.value);
                }}
                className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-300 resize-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-neutral-400">Assinatura Cursiva (Opcional)</label>
              <input
                type="text"
                value={data.aboutMe.closingPhrase || (data.aboutMe as any).signatureText || ''}
                onChange={(e) => {
                  updateAboutMe('closingPhrase', e.target.value);
                  updateAboutMe('signatureText', e.target.value);
                }}
                placeholder="Assinatura cursiva de fechamento"
                className="w-full px-2.5 py-1.5 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-300 italic"
              />
            </div>
            <ModuleColorControls
              moduleKey="aboutMe"
              moduleLabel="Sobre Mim & Biografia"
              fields={[
                { field: 'headlineColor', label: 'Título da Seção', fallback: theme.accent },
                { field: 'textColor', label: 'Cor do Parágrafo / Bio', fallback: theme.textMuted },
                { field: 'accentColor', label: 'Assinatura Cursiva', fallback: theme.accent },
              ]}
              data={data}
              setData={setData}
            />
          </div>
        )}
      </div>

      {/* Módulo: Dúvidas Frequentes (FAQ) */}
      <div id="module-faq" className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 scroll-mt-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Dúvidas Frequentes (FAQ)</span>
          </div>
          <input
            type="checkbox"
            checked={data.faq.enabled}
            onChange={(e) => updateFaq('enabled', e.target.checked)}
            className="accent-amber-500"
          />
        </div>

        {data.faq.enabled && (
          <div className="space-y-2 pt-1">
            {data.faq.items.map((item, idx) => (
              <div key={item.id} className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => {
                    const updated = data.faq.items.map((q, i) =>
                      i === idx ? { ...q, question: e.target.value } : q
                    );
                    updateFaq('items', updated);
                  }}
                  className="w-full px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-200 font-semibold"
                />
                <input
                  type="text"
                  value={item.answer}
                  onChange={(e) => {
                    const updated = data.faq.items.map((q, i) =>
                      i === idx ? { ...q, answer: e.target.value } : q
                    );
                    updateFaq('items', updated);
                  }}
                  className="w-full px-2 py-1 text-xs rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                />
              </div>
            ))}
            <ModuleColorControls
              moduleKey="faq"
              moduleLabel="Dúvidas Frequentes (FAQ)"
              fields={[
                { field: 'headlineColor', label: 'Título da Seção', fallback: theme.accent },
                { field: 'titleColor', label: 'Cor das Perguntas', fallback: theme.textMain },
                { field: 'textColor', label: 'Cor das Respostas', fallback: theme.textMuted },
                { field: 'bgColor', label: 'Fundo das Caixas', fallback: theme.socialBg },
              ]}
              data={data}
              setData={setData}
            />
          </div>
        )}
      </div>

      {/* Módulo: Facilidades & Quebra de Objeções */}
      <div id="module-trustbadges" className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 scroll-mt-6 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-neutral-200">Facilidades & Quebra de Objeções (Cartão, Pix, Local, VIP...)</span>
          </div>
          <input
            type="checkbox"
            checked={data.trustBadges?.enabled ?? true}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                trustBadges: {
                  items: prev.trustBadges?.items?.length
                    ? prev.trustBadges.items
                    : [
                        { id: 'tb-1', icon: 'credit-card', title: 'Cartão até 12x', subtitle: 'Crédito e Débito', color: 'emerald' },
                        { id: 'tb-2', icon: 'zap', title: 'Pix Instantâneo', subtitle: 'Confirmação na hora', color: 'amber' },
                        { id: 'tb-3', icon: 'car', title: 'Fácil Acesso', subtitle: 'Local seguro', color: 'sky' },
                        { id: 'tb-4', icon: 'shield', title: 'Espaço VIP', subtitle: 'Climatizado & Café', color: 'purple' },
                      ],
                  enabled: e.target.checked,
                },
              }));
            }}
            className="accent-amber-500"
          />
        </div>
        <p className="text-[11px] text-neutral-400">
          Exibe os 4 cards destacados logo abaixo dos serviços. Você pode editar todos os ícones, títulos e textos na aba <strong>Serviços</strong>.
        </p>
      </div>
    </div>
  );
}

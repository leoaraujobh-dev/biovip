import React from 'react';
import {
  ImageIcon,
  Plus,
  Copy,
  Trash2,
  Upload,
  X,
  Palette,
} from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { toSafeHexColor } from '../../../utils/formatters';
import { ModuleColorControls } from '../ModuleColorControls';

export interface ButtonsTabProps {
  data: typeof INITIAL_DATA;
  setData: React.Dispatch<React.SetStateAction<typeof INITIAL_DATA>>;
  theme: any;
  updateQualifier: (key: string, val: any) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
}

export function ButtonsTab({
  data,
  setData,
  theme,
  updateQualifier,
  handleFileUpload,
}: ButtonsTabProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div>
          <span className="text-xs font-semibold text-neutral-100 block">Personalização de Botões & Banners</span>
          <span className="text-[11px] text-neutral-400">Adicione botões com imagem à esquerda/direita, recorte 3D, links e animações</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newBanner = {
                id: 'cta-' + Date.now(),
                title: 'E-BOOK GRATUITO: CONTEÚDO INFINITO',
                subtitle: 'Estruture seu perfil e atraia clientes qualificados todos os dias.',
                icon: 'Sparkles',
                linkType: 'custom',
                url: 'https://',
                whatsappMessage: 'Olá! Quero saber mais sobre a Mentoria.',
                openInNewTab: true,
                animation: 'shimmer',
                variant: 'default',
                badgeText: 'DESTAQUE',
                customBg: '#e2b857',
                customText: '#0f172a',
                bgImage: '',
                imagePosition: 'right',
                cardImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
                imageFitStyle: 'popout',
                imageSize: 96,
                ctaActionText: 'BAIXE AGORA',
              };
              setData(p => ({ ...p, actionCards: [newBanner, ...p.actionCards] }));
            }}
            className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer transition"
          >
            <ImageIcon className="w-3.5 h-3.5" /> + Banner com Imagem
          </button>
          <button
            onClick={() => {
              const newCard = {
                id: 'cta-' + Date.now(),
                title: 'NOVO BOTÃO DE AÇÃO',
                subtitle: 'Clique para acessar o link exclusivo.',
                icon: 'Sparkles',
                linkType: 'custom',
                url: 'https://',
                whatsappMessage: 'Olá! Gostaria de mais informações.',
                openInNewTab: true,
                animation: 'none',
                variant: 'default',
                badgeText: '',
                customBg: '#e2b857',
                customText: '#0f172a',
                bgImage: '',
                imagePosition: 'none',
                cardImage: '',
                imageFitStyle: 'framed',
                imageSize: 88,
                ctaActionText: '',
              };
              setData(p => ({ ...p, actionCards: [...p.actionCards, newCard] }));
            }}
            className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1 border border-neutral-700 cursor-pointer transition"
          >
            <Plus className="w-3.5 h-3.5" /> + Botão Clássico
          </button>
        </div>
      </div>

      <ModuleColorControls
        moduleKey="actionCards"
        moduleLabel="Todos os Botões (Padrão do Módulo)"
        fields={[
          { field: 'titleColor', label: 'Cor dos Títulos dos Botões', fallback: theme.cardText },
          { field: 'textColor', label: 'Cor dos Subtítulos', fallback: theme.cardSubtext },
          { field: 'bgColor', label: 'Fundo dos Botões', fallback: theme.cardBg },
        ]}
        data={data}
        setData={setData}
      />

      {/* Destaque Rápido do Botão de Triagem VIP */}
      {data.qualifierFunnel.enabled && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
              Animação do Botão de Triagem VIP (Topo)
            </span>
            <span className="text-[10px] text-neutral-400">
              Escolha o efeito de movimento do botão dourado do Funil Anti-Curiosos
            </span>
          </div>
          <select
            value={data.qualifierFunnel.animation || 'none'}
            onChange={(e) => updateQualifier('animation', e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-amber-500/40 text-amber-300 font-semibold"
          >
            <option value="none">Sem Animação</option>
            <option value="shimmer">Brilho Deslizante (Shimmer)</option>
            <option value="pulse-glow">Pulso Luminoso VIP</option>
            <option value="float">Flutuação Suave</option>
            <option value="shake">Chamada de Atenção (Shake)</option>
          </select>
        </div>
      )}

      <div className="space-y-4">
        {data.actionCards.map((card, idx) => {
          const updateThisCard = (field: string, value: unknown) => {
            setData(p => ({
              ...p,
              actionCards: p.actionCards.map(c => c.id === card.id ? { ...c, [field]: value } : c),
            }));
          };

          const moveCard = (direction: -1 | 1) => {
            const targetIdx = idx + direction;
            if (targetIdx < 0 || targetIdx >= data.actionCards.length) return;
            setData(p => {
              const list = [...p.actionCards];
              const temp = list[idx];
              list[idx] = list[targetIdx];
              list[targetIdx] = temp;
              return { ...p, actionCards: list };
            });
          };

          const duplicateCard = () => {
            const clone = {
              ...card,
              id: 'cta-' + Date.now(),
              title: card.title + ' (CÓPIA)',
            };
            setData(p => {
              const list = [...p.actionCards];
              list.splice(idx + 1, 0, clone);
              return { ...p, actionCards: list };
            });
          };

          return (
            <div key={card.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3.5 hover:border-neutral-700 transition">
              {/* Top Header of Card Editor */}
              <div className="flex justify-between items-center border-b border-neutral-900 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-amber-400 font-bold">
                    Botão #{idx + 1}
                  </span>
                  {card.animation && card.animation !== 'none' && (
                    <span className="text-[10px] text-amber-300/90 font-medium">
                      · Animação Ativa
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveCard(-1)}
                    title="Mover para cima"
                    className="px-2 py-1 text-[10px] rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 cursor-pointer"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={idx === data.actionCards.length - 1}
                    onClick={() => moveCard(1)}
                    title="Mover para baixo"
                    className="px-2 py-1 text-[10px] rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 disabled:opacity-30 cursor-pointer"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={duplicateCard}
                    title="Duplicar botão"
                    className="px-2 py-1 text-[10px] rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" /> Duplicar
                  </button>
                  {data.actionCards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setData(p => ({ ...p, actionCards: p.actionCards.filter(c => c.id !== card.id) }))}
                      title="Excluir botão"
                      className="p-1.5 rounded bg-neutral-900 hover:bg-red-500/20 text-neutral-500 hover:text-red-400 cursor-pointer ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Row 1: Title & Icon */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="col-span-2">
                  <label className="text-[10px] text-neutral-400 block mb-1">Título do Botão</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => updateThisCard('title', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">Ícone</label>
                  <select
                    value={card.icon}
                    onChange={(e) => updateThisCard('icon', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                  >
                    <option value="Calendar">Calendário / Agenda</option>
                    <option value="Scissors">Tesoura (Barbearia)</option>
                    <option value="Scale">Balança (Jurídico)</option>
                    <option value="Briefcase">Pasta Executiva</option>
                    <option value="GraduationCap">Mentoria / Cursos</option>
                    <option value="Sparkles">Brilho (Destaque)</option>
                    <option value="Heart">Coração / Saúde</option>
                    <option value="MessageCircle">WhatsApp / Chat</option>
                    <option value="Star">Estrela VIP</option>
                    <option value="MapPin">Localização / Mapa</option>
                    <option value="Instagram">Instagram</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Subtitle & Optional Internal CTA Action Text */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-2">
                  <label className="text-[10px] text-neutral-400 block mb-1">Subtítulo Explicativo</label>
                  <input
                    type="text"
                    value={card.subtitle}
                    onChange={(e) => updateThisCard('subtitle', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-amber-400 font-semibold block mb-1">
                    Sub-botão (Ex: BAIXE AGORA)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: CLIQUE AQUI"
                    value={card.ctaActionText || ''}
                    onChange={(e) => updateThisCard('ctaActionText', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold uppercase"
                  />
                </div>
              </div>

              {/* Row 2.5: IMAGEM LATERAL (ESQUERDA / DIREITA) & BANNER */}
              <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-amber-500/25 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                    Imagem Lateral do Botão (Posicionar à Esquerda ou Direita)
                  </span>

                  {/* Segmented selector for None / Left / Right */}
                  <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                    {[
                      { id: 'none', label: 'Apenas Ícone' },
                      { id: 'left', label: '⬅️ Imagem à Esquerda' },
                      { id: 'right', label: 'Imagem à Direita ➡️' },
                    ].map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => {
                          updateThisCard('imagePosition', pos.id);
                          if (pos.id !== 'none' && !card.cardImage) {
                            updateThisCard(
                              'cardImage',
                              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
                            );
                          }
                        }}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition cursor-pointer ${
                          (card.imagePosition || 'none') === pos.id
                            ? 'bg-amber-400 text-neutral-950 shadow'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                {card.imagePosition && card.imagePosition !== 'none' && (
                  <div className="space-y-3 pt-1 border-t border-neutral-800/80">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
                      <div className="sm:col-span-2">
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] text-neutral-300 font-medium">
                            Foto / PNG Recortado / Mockup do Produto
                          </label>
                          <label className="text-[10px] text-amber-400 hover:underline cursor-pointer flex items-center gap-1 font-semibold">
                            <Upload className="w-3 h-3" /> Enviar Imagem do Computador
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (base64) => updateThisCard('cardImage', base64))
                              }
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          placeholder="Cole a URL da imagem ou faça upload acima..."
                          value={
                            card.cardImage?.startsWith('data:')
                              ? 'Imagem carregada via upload local'
                              : card.cardImage || ''
                          }
                          onChange={(e) => updateThisCard('cardImage', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 block mb-1">Estilo de Encaixe</label>
                        <select
                          value={card.imageFitStyle || 'popout'}
                          onChange={(e) => updateThisCard('imageFitStyle', e.target.value)}
                          className="w-full px-2 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-amber-300 font-semibold"
                        >
                          <option value="popout">Recorte 3D Sobreposto (Borda)</option>
                          <option value="framed">Capa / Card Enquadrado (E-book)</option>
                          <option value="circle">Redondo / Medalhão</option>
                        </select>
                      </div>
                    </div>

                    {/* Size slider + Quick presets + Optional background image */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-neutral-400">Tamanho da Imagem no Botão</span>
                          <span className="text-amber-400 font-mono font-bold">{card.imageSize || 92}px</span>
                        </div>
                        <input
                          type="range"
                          min="68"
                          max="130"
                          value={card.imageSize || 92}
                          onChange={(e) => updateThisCard('imageSize', Number(e.target.value))}
                          className="w-full accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] text-neutral-400">Fundo Texturizado do Card (Opcional)</span>
                          <div className="flex items-center gap-2">
                            <label className="text-[10px] text-amber-400 hover:underline cursor-pointer flex items-center gap-1">
                              <Upload className="w-3 h-3" /> Upload
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (base64) => updateThisCard('bgImage', base64))
                                }
                              />
                            </label>
                            {card.bgImage && (
                              <button
                                type="button"
                                onClick={() => updateThisCard('bgImage', '')}
                                className="text-[10px] text-red-400 hover:underline cursor-pointer"
                              >
                                Limpar
                              </button>
                            )}
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="URL de imagem de fundo (opcional)"
                          value={
                            card.bgImage?.startsWith('data:')
                              ? 'Fundo personalizado carregado'
                              : card.bgImage || ''
                          }
                          onChange={(e) => updateThisCard('bgImage', e.target.value)}
                          className="w-full px-2.5 py-1 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Row 3: Link Type & Custom URL / Action */}
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/90 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] font-semibold text-amber-400 block mb-1">
                      Ação ao Clicar / Tipo de Destino
                    </label>
                    <select
                      value={card.linkType || 'custom'}
                      onChange={(e) => {
                        const newType = e.target.value;
                        let nextUrl = card.url;
                        if (newType === 'booking') nextUrl = '#booking';
                        else if (newType === 'catalogo') nextUrl = '#catalogo';
                        else if (newType === 'quiz') nextUrl = '#quiz';
                        else if (newType === 'custom' && nextUrl.startsWith('#')) nextUrl = 'https://';
                        setData(p => ({
                          ...p,
                          actionCards: p.actionCards.map(c =>
                            c.id === card.id ? { ...c, linkType: newType, url: nextUrl } : c
                          ),
                        }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-700 text-neutral-100"
                    >
                      <option value="custom">🔗 Link Personalizado (Site, Checkout, etc.)</option>
                      <option value="whatsapp">💬 Mensagem Direta no WhatsApp</option>
                      <option value="booking">📅 Abrir Modal de Pré-Agendamento</option>
                      <option value="quiz">⚡ Abrir Funil Qualificador (Quiz VIP)</option>
                      <option value="catalogo">🛍️ Rolar até Catálogo de Serviços</option>
                    </select>
                  </div>

                  {/* Selo / Tag de Destaque */}
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">
                      Selo / Etiqueta no Topo do Botão (Opcional)
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        placeholder="Ex: MAIS PROCURADO, VIP..."
                        value={card.badgeText || ''}
                        onChange={(e) => updateThisCard('badgeText', e.target.value)}
                        className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-amber-300 font-semibold"
                      />
                      {card.badgeText && (
                        <button
                          type="button"
                          onClick={() => updateThisCard('badgeText', '')}
                          className="px-2 text-xs rounded-lg bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                          title="Remover selo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Conditional Link Input based on linkType */}
                {(!card.linkType || card.linkType === 'custom') && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] text-neutral-300 font-medium">
                        Insira seu Link Personalizado (URL Completa)
                      </label>
                      <label className="flex items-center gap-1.5 text-[10px] text-neutral-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={card.openInNewTab !== false}
                          onChange={(e) => updateThisCard('openInNewTab', e.target.checked)}
                          className="accent-amber-500"
                        />
                        <span>Abrir em nova guia</span>
                      </label>
                    </div>
                    <input
                      type="url"
                      placeholder="https://seu-link-aqui.com.br"
                      value={card.url}
                      onChange={(e) => updateThisCard('url', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-amber-500/40 focus:border-amber-400 text-amber-200 font-mono"
                    />
                  </div>
                )}

                {card.linkType === 'whatsapp' && (
                  <div className="space-y-1 pt-1">
                    <label className="text-[10px] text-emerald-400 font-medium block">
                      Mensagem Personalizada que o Cliente Enviará no WhatsApp ({data.profile.whatsapp})
                    </label>
                    <input
                      type="text"
                      placeholder="Olá! Gostaria de agendar um atendimento..."
                      value={card.whatsappMessage || ''}
                      onChange={(e) => updateThisCard('whatsappMessage', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-neutral-950 border border-emerald-500/30 text-neutral-200"
                    />
                  </div>
                )}
              </div>

              {/* Row 4: Animation & Visual Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div>
                  <label className="text-[10px] font-semibold text-amber-400 block mb-1">
                    ✨ Animação para Destacar o Botão
                  </label>
                  <select
                    value={card.animation || 'none'}
                    onChange={(e) => updateThisCard('animation', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100"
                  >
                    <option value="none">Nenhuma (Apenas Zoom ao Passar Mouse)</option>
                    <option value="pulse-glow">🔥 Pulso Luminoso VIP (Glow Pulsante)</option>
                    <option value="shimmer">✨ Brilho Deslizante (Efeito Shimmer)</option>
                    <option value="float">🎈 Flutuação Suave Contínua (Float)</option>
                    <option value="shake">🔔 Chamada de Atenção (Shake Sutil)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-neutral-300 block mb-1">
                    🎨 Estilo de Cores do Botão
                  </label>
                  <select
                    value={card.variant || 'default'}
                    onChange={(e) => updateThisCard('variant', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100"
                  >
                    <option value="default">Padrão da Paleta do Tema</option>
                    <option value="accent">Destaque Dourado / Cor de Acento</option>
                    <option value="outline">Glass Transparente com Borda Fina</option>
                    <option value="custom">Cores Exclusivas Personalizadas</option>
                  </select>
                </div>
              </div>

              {/* Always-available Font & Background Color Controls per Button */}
              <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Palette className="w-3 h-3" /> Cores da Fonte deste Botão
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setData(p => ({
                          ...p,
                          actionCards: p.actionCards.map(c =>
                            c.id === card.id
                              ? { ...c, customTitleColor: '#ffffff', customSubtitleColor: '#e5e7eb' }
                              : c
                          ),
                        }));
                      }}
                      className="px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-[9px] font-semibold text-white border border-neutral-700 cursor-pointer"
                    >
                      ☀️ Fonte Clara
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setData(p => ({
                          ...p,
                          actionCards: p.actionCards.map(c =>
                            c.id === card.id
                              ? { ...c, customTitleColor: '#0f172a', customSubtitleColor: '#334155' }
                              : c
                          ),
                        }));
                      }}
                      className="px-1.5 py-0.5 rounded bg-neutral-200 hover:bg-white text-[9px] font-semibold text-neutral-900 cursor-pointer"
                    >
                      🌙 Fonte Escura
                    </button>
                    {(card.customTitleColor || card.customSubtitleColor || card.variant === 'custom') && (
                      <button
                        type="button"
                        onClick={() => {
                          setData(p => ({
                            ...p,
                            actionCards: p.actionCards.map(c =>
                              c.id === card.id
                                ? { ...c, customTitleColor: '', customSubtitleColor: '' }
                                : c
                            ),
                          }));
                        }}
                        className="px-1.5 py-0.5 rounded bg-red-500/15 hover:bg-red-500/25 text-[9px] font-semibold text-red-300 border border-red-500/30 cursor-pointer"
                      >
                        ↺ Padrão
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="flex items-center justify-between gap-1.5 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
                    <span className="text-[10px] text-neutral-300 truncate">Cor do Título</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <input
                        type="color"
                        value={toSafeHexColor(card.customTitleColor || card.customText, toSafeHexColor(theme.cardText, '#ffffff'))}
                        onChange={(e) => updateThisCard('customTitleColor', e.target.value)}
                        className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                      />
                      <span className="text-[9px] font-mono text-neutral-400">
                        {card.customTitleColor || 'Auto'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-1.5 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800">
                    <span className="text-[10px] text-neutral-300 truncate">Cor Subtítulo</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <input
                        type="color"
                        value={toSafeHexColor(card.customSubtitleColor || card.customText, toSafeHexColor(theme.cardSubtext, '#cbd5e1'))}
                        onChange={(e) => updateThisCard('customSubtitleColor', e.target.value)}
                        className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                      />
                      <span className="text-[9px] font-mono text-neutral-400">
                        {card.customSubtitleColor || 'Auto'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-1.5 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-neutral-300 truncate">Cor de Fundo</span>
                    <div className="flex items-center gap-1 shrink-0">
                      <input
                        type="color"
                        value={toSafeHexColor(card.customBg, toSafeHexColor(theme.cardBg, '#1e293b'))}
                        onChange={(e) => {
                          setData(p => ({
                            ...p,
                            actionCards: p.actionCards.map(c =>
                              c.id === card.id ? { ...c, variant: 'custom', customBg: e.target.value } : c
                            ),
                          }));
                        }}
                        className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                      />
                      <span className="text-[9px] font-mono text-neutral-400">
                        {card.variant === 'custom' ? card.customBg : 'Tema'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

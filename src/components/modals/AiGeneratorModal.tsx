import React from 'react';
import {
  Sparkles,
  X,
  Instagram,
  MapPin,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Code,
} from 'lucide-react';

export interface AiGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiCreationMode: any;
  setAiCreationMode: (mode: any) => void;
  aiError: string | null;
  setAiError: (err: string | null) => void;
  aiGenerating: boolean;
  geminiImporting: boolean;
  handleCopyGeminiScript: (prefilled?: boolean) => void;
  copiedGeminiScript: boolean;
  buildGeminiSequentialScript: (prefilled?: boolean) => string;
  geminiPastedCode: string;
  setGeminiPastedCode: (code: string) => void;
  geminiAutoFetchInstaPhotos: boolean;
  setGeminiAutoFetchInstaPhotos: (val: boolean) => void;
  geminiAutoCreateAdminRecord: boolean;
  setGeminiAutoCreateAdminRecord: (val: boolean) => void;
  handleImportGeminiCode: () => void;
  aiStepIndex: number;
  aiForm: any;
  setAiForm: (val: any) => void;
  handleAiGenerateMicrosite: () => void;
}

export const AiGeneratorModal: React.FC<AiGeneratorModalProps> = ({
  isOpen,
  onClose,
  aiCreationMode,
  setAiCreationMode,
  aiError,
  setAiError,
  aiGenerating,
  geminiImporting,
  handleCopyGeminiScript,
  copiedGeminiScript,
  buildGeminiSequentialScript,
  geminiPastedCode,
  setGeminiPastedCode,
  geminiAutoFetchInstaPhotos,
  setGeminiAutoFetchInstaPhotos,
  geminiAutoCreateAdminRecord,
  setGeminiAutoCreateAdminRecord,
  handleImportGeminiCode,
  aiStepIndex,
  aiForm,
  setAiForm,
  handleAiGenerateMicrosite,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-neutral-900 border border-amber-500/40 rounded-2xl p-6 space-y-4 text-neutral-100 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-neutral-800 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-neutral-950 font-bold shrink-0 shadow-lg shadow-amber-500/20">
                  <Sparkles className="w-5 h-5 fill-neutral-950" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-100 flex items-center gap-2">
                    Gerador de Microsite com IA
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Use o Script Sequencial no Gemini Externo ou gere direto pela API
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={aiGenerating || geminiImporting}
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer disabled:opacity-40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Seletor de Modo: Script para Gemini Externo vs GeraÃ§Ã£o AutomÃ¡tica API */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-neutral-950 border border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setAiError(null);
                  setAiCreationMode('gemini_script');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  aiCreationMode === 'gemini_script'
                    ? 'bg-amber-400 text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>ðŸ¤– Script Gemini & Colar CÃ³digo</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiError(null);
                  setAiCreationMode('auto_api');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  aiCreationMode === 'auto_api'
                    ? 'bg-amber-400 text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>âš¡ GeraÃ§Ã£o Direta AutomÃ¡tica</span>
              </button>
            </div>

            {aiCreationMode === 'gemini_script' ? (
              <div className="space-y-3.5 text-xs">
                {/* PASSO 1: COPIAR SCRIPT SEQUENCIAL PARA O GEMINI */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-black flex items-center justify-center">1</span>
                      Passo 1: Copie o Script Sequencial e cole no Gemini
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
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Ao colar esse script lÃ¡ no Gemini, ele vai te solicitar <strong>sequencialmente</strong> os dados do cliente, o <strong>@Instagram</strong> e o <strong>endereÃ§o do Google Maps</strong>, puxar todas as informaÃ§Ãµes da internet e te entregar o cÃ³digo pronto.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopyGeminiScript(false)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg ${
                      copiedGeminiScript
                        ? 'bg-emerald-500 text-neutral-950'
                        : 'bg-amber-400 hover:bg-amber-300 text-neutral-950'
                    }`}
                  >
                    {copiedGeminiScript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>
                      {copiedGeminiScript
                        ? 'Script Sequencial Copiado! Agora cole lÃ¡ no Gemini'
                        : 'ðŸ“‹ Copiar Script Sequencial para o Gemini'}
                    </span>
                  </button>
                  <details className="text-[10px] text-neutral-400">
                    <summary className="cursor-pointer hover:text-amber-300 font-semibold select-none">
                      ðŸ‘ï¸ Ver ou copiar manualmente o texto do Script
                    </summary>
                    <textarea
                      readOnly
                      rows={5}
                      value={buildGeminiSequentialScript(false)}
                      className="w-full mt-2 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300 focus:outline-none"
                    />
                  </details>
                </div>

                {/* PASSO 2: COLAR O CÃ“DIGO ENTREGUE PELO GEMINI */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-400 text-neutral-950 text-[10px] font-black flex items-center justify-center">2</span>
                      Passo 2: Cole aqui o CÃ³digo que o Gemini te entregou
                    </span>
                    {geminiPastedCode.trim() && (
                      <button
                        type="button"
                        onClick={() => setGeminiPastedCode('')}
                        className="text-[10px] text-neutral-400 hover:text-red-300 cursor-pointer"
                      >
                        Limpar
                      </button>
                    )}
                  </div>

                  <textarea
                    rows={5}
                    placeholder='Cole aqui o cÃ³digo JSON gerado pelo Gemini...'
                    value={geminiPastedCode}
                    onChange={(e) => {
                      setAiError(null);
                      setGeminiPastedCode(e.target.value);
                    }}
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-emerald-400 text-xs font-mono text-emerald-200 placeholder-neutral-500 focus:outline-none resize-y"
                  />

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[11px] text-neutral-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={geminiAutoFetchInstaPhotos}
                        onChange={(e) => setGeminiAutoFetchInstaPhotos(e.target.checked)}
                        className="rounded border-neutral-700 bg-neutral-900 text-amber-400 focus:ring-amber-500"
                      />
                      <span>
                        ðŸ“¸ Puxar automaticamente as <strong>6 fotos mais curtidas e avatar real do Instagram</strong>
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-[11px] text-neutral-300 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={geminiAutoCreateAdminRecord}
                        onChange={(e) => setGeminiAutoCreateAdminRecord(e.target.checked)}
                        className="rounded border-neutral-700 bg-neutral-900 text-amber-400 focus:ring-amber-500"
                      />
                      <span>
                        ðŸ›¡ï¸ JÃ¡ criar com a <strong>Ãrea de AdministraÃ§Ã£o pronta</strong> (Cadastrar cliente no Painel)
                      </span>
                    </label>
                  </div>

                  {aiError && (
                    <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{aiError}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={geminiImporting}
                    onClick={handleImportGeminiCode}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 hover:brightness-110 disabled:opacity-50 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 cursor-pointer transition"
                  >
                    <Sparkles className="w-4 h-4 fill-neutral-950" />
                    <span>
                      {geminiImporting
                        ? 'Criando PÃ¡gina + Puxando Fotos + Montando Ãrea de AdministraÃ§Ã£o...'
                        : 'âœ¨ Criar PÃ¡gina + Ãrea de AdministraÃ§Ã£o Pronta'}
                    </span>
                  </button>
                </div>
              </div>
            ) : aiGenerating ? (
              <div className="py-8 text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
                  <Sparkles className="w-7 h-7 text-amber-400 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-neutral-100 animate-pulse">
                    {aiStepIndex === 0
                      ? '1/3 Â· Buscando perfil, bio e as fotos mais curtidas no Instagram...'
                      : aiStepIndex === 1
                      ? '2/3 Â· Extraindo serviÃ§os das legendas, endereÃ§o e dados do negÃ³cio...'
                      : '3/3 Â· Montando galeria mais curtida e catÃ¡logo personalizado com IA...'}
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    A IA seleciona automaticamente as fotos com mais curtidas do Instagram para a galeria e cria os serviÃ§os com base nas informaÃ§Ãµes reais coletadas do cliente.
                  </p>
                  <div className="max-w-xs mx-auto pt-2 space-y-1.5 text-left">
                    <div className={`flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg border ${aiStepIndex >= 0 ? 'bg-pink-500/10 border-pink-500/30 text-pink-300' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}>
                      <Instagram className="w-3.5 h-3.5 shrink-0" />
                      <span>Fotos Mais Curtidas & Bio (@{(aiForm.instagram || 'perfil').replace('@', '')})</span>
                    </div>
                    <div className={`flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg border ${aiStepIndex >= 1 ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}>
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>ExtraÃ§Ã£o de ServiÃ§os Reais & LocalizaÃ§Ã£o</span>
                    </div>
                    <div className={`flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg border ${aiStepIndex >= 2 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-neutral-900 border-neutral-800 text-neutral-500'}`}>
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>Galeria Ordenada por Curtidas & CatÃ¡logo VIP</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200/90 text-[11px] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    A IA seleciona as <strong>imagens com mais curtidas no Instagram</strong> para a galeria e monta o <strong>catÃ¡logo de serviÃ§os baseado nos dados reais coletados do cliente</strong>.
                  </span>
                </div>

                {aiError && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{aiError}</span>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-semibold text-neutral-300 block mb-1 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    Instagram do Cliente (@usuario)
                  </label>
                  <div className="flex items-center rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden focus-within:border-amber-500">
                    <span className="px-3 text-neutral-500 font-mono text-xs">@</span>
                    <input
                      type="text"
                      placeholder="ex: lorrayne_ramos ou barbeariadoncorleone"
                      value={aiForm.instagram}
                      onChange={(e) => {
                        setAiError(null);
                        setAiForm((f: any) => ({ ...f, instagram: e.target.value }));
                      }}
                      className="flex-1 py-2 pr-3 bg-transparent text-neutral-100 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-300 block mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Link do Google Meu NegÃ³cio / Maps (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://maps.app.goo.gl/... ou endereÃ§o do negÃ³cio"
                    value={aiForm.googleMaps}
                    onChange={(e) => setAiForm((f: any) => ({ ...f, googleMaps: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">Nome do NegÃ³cio / Profissional</label>
                    <input
                      type="text"
                      placeholder="Ex: Studio Lorrayne Ramos"
                      value={aiForm.businessName}
                      onChange={(e) => {
                        setAiError(null);
                        setAiForm((f: any) => ({ ...f, businessName: e.target.value }));
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">Nicho / Especialidade</label>
                    <input
                      type="text"
                      placeholder="Ex: ExtensÃ£o de cÃ­lios e nail designer"
                      value={aiForm.businessNiche}
                      onChange={(e) => {
                        setAiError(null);
                        setAiForm((f: any) => ({ ...f, businessNiche: e.target.value }));
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 block mb-1">
                    InformaÃ§Ãµes Adicionais / ServiÃ§os Principais / Diferenciais (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Especialista em volume brasileiro, fox eyes e alongamento em fibra de vidro. Atendimento com hora marcada..."
                    value={aiForm.additionalInfo}
                    onChange={(e) => setAiForm((f: any) => ({ ...f, additionalInfo: e.target.value }))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 resize-none"
                  />
                </div>

                {/* Seletor de Objetivo Principal de ConversÃ£o */}
                <div>
                  <label className="text-[10px] font-semibold text-neutral-300 block mb-1.5">
                    Objetivo Principal de ConversÃ£o da PÃ¡gina
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'whatsapp_booking', label: 'ðŸ“… Agendamento RÃ¡pido WA' },
                      { id: 'catalog_sales', label: 'ðŸ›ï¸ Venda de CatÃ¡logo / Tabela' },
                      { id: 'vip_triage', label: 'âœ¨ Triagem & OrÃ§amento VIP' },
                      { id: 'courses_mentorship', label: 'ðŸŽ“ CaptaÃ§Ã£o de Alunas / Cursos' },
                    ].map((goal) => (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() =>
                          setAiForm((f: any) => ({
                            ...f,
                            conversionGoal: goal.id as typeof aiForm.conversionGoal,
                          }))
                        }
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border text-left transition cursor-pointer ${
                          aiForm.conversionGoal === goal.id
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        {goal.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seletor de Estilo Visual Preferido */}
                <div>
                  <label className="text-[10px] font-semibold text-neutral-300 block mb-1.5">
                    Estilo Visual & Atmosfera de Cores
                  </label>
                  <div className="grid grid-cols-5 gap-1">
                    {[
                      { id: 'auto', label: 'âœ¨ Auto' },
                      { id: 'rose_luxury', label: 'ðŸŒ¸ RosÃ©' },
                      { id: 'dark_gold', label: 'ðŸ–¤ Gold' },
                      { id: 'clean_minimal', label: 'ðŸ¤ Clean' },
                      { id: 'vibrant_glam', label: 'ðŸ’– Glam' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() =>
                          setAiForm((f: any) => ({
                            ...f,
                            visualStyle: st.id as typeof aiForm.visualStyle,
                          }))
                        }
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold border text-center transition cursor-pointer ${
                          aiForm.visualStyle === st.id
                            ? 'bg-pink-500/20 border-pink-400 text-pink-200'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAiGenerateMicrosite}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer transition mt-2"
                >
                  <Sparkles className="w-4 h-4 fill-neutral-950" />
                  <span>Gerar Microsite Completo com IA</span>
                </button>
              </div>
            )}
          </div>
        </div>
  );
};

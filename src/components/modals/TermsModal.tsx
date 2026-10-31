import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terms' | 'privacy' | 'guarantee';
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'guarantee'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl bg-neutral-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header do Modal */}
        <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                Termos & Políticas Oficiais
              </h2>
              <span className="text-[11px] text-neutral-400 font-mono">
                BioVip Studio • Transparência, Segurança e Conformidade LGPD
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas de Navegação */}
        <div className="px-6 pt-3 pb-2 bg-neutral-950/60 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer border ${
              activeTab === 'terms'
                ? 'bg-amber-400 text-neutral-950 border-amber-300 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border-neutral-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Termos de Uso</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer border ${
              activeTab === 'privacy'
                ? 'bg-amber-400 text-neutral-950 border-amber-300 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border-neutral-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Política de Privacidade (LGPD)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guarantee')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer border ${
              activeTab === 'guarantee'
                ? 'bg-amber-400 text-neutral-950 border-amber-300 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Garantia de 7 Dias</span>
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-neutral-200 text-xs sm:text-sm leading-relaxed scrollbar-thin">
          
          {/* ABA 1: TERMOS DE USO */}
          {activeTab === 'terms' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-200 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Estes Termos regulam a contratação, criação, licenciamento e manutenção contínua de microsites digitais pelo <strong>BioVip Studio</strong>.
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center text-[11px] font-mono font-bold">1</span>
                  <span>Objeto da Prestação de Serviços</span>
                </h3>
                <p className="text-neutral-300 pl-7">
                  O BioVip Studio oferece o desenvolvimento sob medida, otimização técnica, hospedagem em servidores de alta velocidade, segurança SSL e manutenção continuada de microsites de alta conversão para profissionais liberais, clínicas, consultórios e empresas. A entrega inclui página pública acessível via subdomínio oficial (<code>biovip.com.br/seunome</code>) ou apontamento de domínio próprio do cliente.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center text-[11px] font-mono font-bold">2</span>
                  <span>Prazos de Entrega e Fornecimento de Dados</span>
                </h3>
                <p className="text-neutral-300 pl-7">
                  A equipe da BioVip compromete-se a entregar a primeira prévia do microsite finalizado no prazo de <strong>24 a 48 horas úteis</strong>, contadas a partir do momento em que o contratante fornecer as informações essenciais (fotos, serviços, WhatsApp e dados de contato).
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center text-[11px] font-mono font-bold">3</span>
                  <span>Planos de Manutenção, Atualizações e Mensalidade</span>
                </h3>
                <p className="text-neutral-300 pl-7">
                  A taxa inicial de criação refere-se à arquitetura visual, redação persuasiva e programação da página. No 1º mês promocional, não há cobrança de mensalidade. A partir do 2º mês, o contratante usufrui dos serviços de infraestrutura contínua conforme o plano contratado (Básico, Pro ou VIP):
                </p>
                <ul className="list-disc pl-12 space-y-1 text-neutral-300">
                  <li>Hospedagem em nuvem de alto tráfego com 99.9% de uptime garantido;</li>
                  <li>Certificado de Criptografia SSL 256-bit renovado automaticamente;</li>
                  <li>Suporte técnico prioritário via WhatsApp oficial;</li>
                  <li>Cota mensal de alterações (fotos, textos, preços e novos botões) de acordo com o plano ativo.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center text-[11px] font-mono font-bold">4</span>
                  <span>Regras de Inadimplência e Desativação Automática</span>
                </h3>
                <p className="text-neutral-300 pl-7">
                  A continuidade da hospedagem depende do pagamento em dia das faturas mensais. Faturas vencidas há mais de 3 dias implicam no bloqueio administrativo de edições. Faturas em atraso a partir de 7 dias sofrem suspensão automática da exibição pública da página até a confirmação de baixa pelo sistema financeiro.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center text-[11px] font-mono font-bold">5</span>
                  <span>Direitos Autorais e Responsabilidade sobre o Conteúdo</span>
                </h3>
                <p className="text-neutral-300 pl-7">
                  O contratante declara e garante possuir todos os direitos de uso sobre as imagens, marcas, logotipos e textos enviados para veiculação no seu microsite, isentando o BioVip Studio de qualquer responsabilidade perante terceiros ou órgãos reguladores da sua classe profissional.
                </p>
              </div>
            </div>
          )}

          {/* ABA 2: POLÍTICA DE PRIVACIDADE LGPD */}
          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  O BioVip Studio adota rígidos padrões de segurança e respeito à privacidade dos seus clientes em total conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Quais dados coletamos?</span>
                </h3>
                <p className="text-neutral-300 pl-6">
                  Coletamos apenas dados estritamente indispensáveis para a prestação dos serviços contratados: nome completo ou comercial, número de WhatsApp, e-mail de contato, endereço do estabelecimento e links das redes sociais. Não realizamos coleta de dados sensíveis desnecessários.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Finalidade do Tratamento dos Dados</span>
                </h3>
                <ul className="list-disc pl-10 space-y-1 text-neutral-300">
                  <li>Configuração, personalização e publicação do seu microsite na internet;</li>
                  <li>Atendimento e suporte técnico via WhatsApp e canais oficiais;</li>
                  <li>Emissão de ordens de serviço, faturas e controle de mensalidade;</li>
                  <li>Comunicação de atualizações de segurança e avisos operacionais.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Não Comercialização de Dados</span>
                </h3>
                <p className="text-neutral-300 pl-6">
                  O BioVip Studio <strong>nunca comercializa, aluga ou compartilha</strong> seus dados de contato com empresas de terceiros para publicidade ou disparo de spam. Seus dados permanecem armazenados em ambiente criptografado e seguro.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direitos do Titular (Art. 18 da LGPD)</span>
                </h3>
                <p className="text-neutral-300 pl-6">
                  Você possui o direito de solicitar a qualquer momento a confirmação de existência do tratamento, acesso aos seus dados, correção de dados incompletos ou a exclusão definitiva dos seus dados dos nossos registros mediante solicitação ao nosso suporte.
                </p>
              </div>
            </div>
          )}

          {/* ABA 3: GARANTIA DE 7 DIAS */}
          {activeTab === 'guarantee' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-amber-500/15 border border-amber-400/40 text-amber-200 text-xs flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm text-white block mb-0.5">
                    Garantia Incondicional de 7 Dias — Risco Zero
                  </span>
                  <span>
                    Conforme o Artigo 49 do Código de Defesa do Consumidor brasileiro, você tem 7 dias corridos após a entrega do seu microsite para testar e comprovar os resultados.
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-neutral-300">
                <p>
                  Nós temos tanta certeza da qualidade visual, do carregamento ultrarrápido e do aumento na taxa de conversão que o seu microsite BioVip trará para seu negócio, que assumimos todo o risco da contratação:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                    <span className="text-amber-400 font-bold block text-xs">✅ Teste Real no seu Instagram</span>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Coloque o link na sua bio, receba clientes reais e sinta a diferença na autoridade percebida pelo seu público.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
                    <span className="text-emerald-400 font-bold block text-xs">💬 Reembolso sem Perguntas</span>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Se por qualquer motivo você não ficar 100% satisfeito(a), basta nos mandar uma mensagem no WhatsApp que devolvemos 100% do seu investimento.
                    </p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Sem contratos de fidelidade com multa e sem burocracia. O cancelamento é imediato mediante simples contato.
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Rodapé do Modal */}
        <div className="px-6 py-3.5 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-neutral-500 font-mono">
            Última atualização: Outubro de 2026 • Versão 2.4 Oficial
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition cursor-pointer shadow-md shadow-amber-500/20"
          >
            Entendido e Concordo
          </button>
        </div>

      </div>
    </div>
  );
};

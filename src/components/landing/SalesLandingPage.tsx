import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Check,
  X,
  ShieldCheck,
  Clock,
  MessageCircle,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  Lock,
  Zap,
  TrendingUp,
  Star,
  Award,
  Smartphone,
  Eye,
  QrCode,
  Share2,
} from 'lucide-react';
import { formatCreationPriceDisplay, parsePlanMaxUpdates, formatPlanUpdatesLabel } from '../../constants/maintenancePlans';
import { parseBrlCurrency } from '../../utils/formatters';
import { TermsModal } from '../modals/TermsModal';

export interface SalesLandingPageProps {
  landingConfig: any;
  data: any;
  readyMadeModels: any[];
  dynamicLandingModels: any[];
  landingHeroModelId: string;
  setLandingHeroModelId: (id: string) => void;
  openRealMicrositeInNewTab: (siteData: any, slug: string) => void;
  openCreatorSubdomain: () => void;
  showToast: (msg: string) => void;
  onSelectPlanForPayment: (planId: 'basic' | 'pro' | 'vip') => void;
  getPlanCheckoutDetails: (planId: 'basic' | 'pro' | 'vip') => any;
  landingOrderForm: any;
  setLandingOrderForm: React.Dispatch<React.SetStateAction<any>>;
  handleLandingOrderSubmit: (e: React.FormEvent) => void;
  landingOrderSuccess: boolean;
  landingOrderError: string | null;
  cleanSub: string;
  cleanDomain: string;
  renderSubdomainConfigModal?: () => React.ReactNode;
  renderPaymentSuccessModal?: () => React.ReactNode;
}

export const SalesLandingPage: React.FC<SalesLandingPageProps> = ({
  landingConfig,
  data,
  readyMadeModels,
  dynamicLandingModels,
  landingHeroModelId,
  setLandingHeroModelId,
  openRealMicrositeInNewTab,
  openCreatorSubdomain,
  showToast,
  onSelectPlanForPayment,
  getPlanCheckoutDetails,
  landingOrderForm,
  setLandingOrderForm,
  handleLandingOrderSubmit,
  landingOrderSuccess,
  landingOrderError,
  cleanSub,
  cleanDomain,
  renderSubdomainConfigModal,
  renderPaymentSuccessModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [previewModalModelId, setPreviewModalModelId] = useState<string | null>(null);
  const [qrModalModelId, setQrModalModelId] = useState<string | null>(null);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [termsModalTab, setTermsModalTab] = useState<'terms' | 'privacy' | 'guarantee'>('terms');

  const openTermsTab = (tab: 'terms' | 'privacy' | 'guarantee') => {
    setTermsModalTab(tab);
    setTermsModalOpen(true);
  };

  // Monitor scroll for mobile sticky conversion bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeHeroModel =
    dynamicLandingModels.find((m: any) => m.id === landingHeroModelId) ||
    dynamicLandingModels[0] ||
    readyMadeModels[0] ||
    {};

  const previewModalModel = previewModalModelId
    ? dynamicLandingModels.find((m: any) => m.id === previewModalModelId) ||
      readyMadeModels.find((m: any) => m.id === previewModalModelId) ||
      null
    : null;

  const qrModalModel = qrModalModelId
    ? dynamicLandingModels.find((m: any) => m.id === qrModalModelId) ||
      readyMadeModels.find((m: any) => m.id === qrModalModelId) ||
      null
    : null;

  const catalogCategories = [
    'Todos',
    'Advocacia & Consultoria',
    'Beleza & Estética',
    'Barbearia & Studios',
    'Saúde & Clínicas',
    'Mentoria & Infoprodutos',
    'Moda & E-commerce',
  ];

  const filteredModels =
    selectedCategory === 'Todos'
      ? dynamicLandingModels
      : dynamicLandingModels.filter((m: any) => {
          const cat = m.category || '';
          if (selectedCategory === 'Advocacia & Consultoria') return /advocacia|direito|consultoria/i.test(cat);
          if (selectedCategory === 'Beleza & Estética') return /beleza|estética|sobrancelha|cilios|nail/i.test(cat);
          if (selectedCategory === 'Barbearia & Studios') return /barbearia|barber/i.test(cat);
          if (selectedCategory === 'Saúde & Clínicas') return /saúde|médic|nutri|fisiot|dent/i.test(cat);
          if (selectedCategory === 'Mentoria & Infoprodutos') return /mentoria|curso|coach/i.test(cat);
          if (selectedCategory === 'Moda & E-commerce') return /moda|loja|boutique/i.test(cat);
          return true;
        });

  const creationBasicStr = formatCreationPriceDisplay(landingConfig?.priceEssential, 'R$ 79,90');
  const creationProStr = formatCreationPriceDisplay(landingConfig?.pricePro, 'R$ 79,90');
  const creationVipStr = formatCreationPriceDisplay(landingConfig?.priceScale, 'R$ 79,90');

  const faqs = [
    {
      q: 'Preciso entender de tecnologia ou saber programar?',
      a: 'Absolutamente nada! Nossa equipe cuida de 100% da parte técnica: layout exclusivo de alto padrão, fotos dos seus procedimentos, textos persuasivos, rota de GPS/Waze e funil inteligente do WhatsApp. Você só precisa nos enviar suas fotos e informações básicas e nós entregamos tudo pronto.',
    },
    {
      q: 'Em quanto tempo meu microsite fica pronto para usar?',
      a: 'Entregamos seu microsite personalizado em até 24 horas úteis após o envio das suas informações. É a entrega mais ágil e profissional do mercado para você começar a faturar imediatamente.',
    },
    {
      q: 'Como o funil anti-curiosos me ajuda a economizar tempo e fechar mais vendas?',
      a: 'Ele faz 3 perguntas estratégicas de qualificação antes do visitante abrir seu WhatsApp. Assim, você não perde horas respondendo curiosos que só querem saber preço e recebe clientes prontos para fechar o agendamento.',
    },
    {
      q: 'Como funciona a oferta de R$ 79,90 e os planos de manutenção?',
      a: `Os 10 primeiros clientes garantem a taxa única de criação promocional por apenas ${creationProStr} e no 1º mês você NÃO paga nenhuma mensalidade! A partir do 2º mês, você escolhe seu plano de manutenção mensal (Básico R$ 29,90/mês com 1 alteração mensal; Pro R$ 49,90/mês com 4 alterações mensais; ou VIP R$ 79,90/mês com alterações ilimitadas).`,
    },
    {
      q: 'Posso usar meu próprio domínio (ex: meunome.com.br)?',
      a: 'Sim! Você pode usar um endereço exclusivo BioVip (ex: biovip.com.br/seunome) ou vincular seu próprio domínio registrado com certificado SSL gratuito e proteção HTTPS em nuvem.',
    },
    {
      q: 'Como coloco o link no meu Instagram e redes sociais?',
      a: 'Assim que entregarmos seu link oficial, você recebe um tutorial simples de 15 segundos ensinando a colocar o link na bio do Instagram, TikTok, WhatsApp Business e Google Meu Negócio.',
    },
    {
      q: 'E se eu não gostar do resultado do microsite?',
      a: 'Você conta com nossa Garantia Incondicional de 7 Dias. Se por qualquer motivo você não amar o resultado do seu microsite nos primeiros 7 dias, nós devolvemos 100% do seu dinheiro, sem burocracia.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-[#fafaf9] font-sans selection:bg-amber-400 selection:text-neutral-950 overflow-x-hidden relative">
      {/* Glow de ambientação no topo */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] opacity-20 blur-[140px] z-0"
        style={{
          background: `radial-gradient(circle, ${activeHeroModel.accentHex || '#f59e0b'} 0%, transparent 70%)`,
        }}
      />

      {/* ========================================================================= */}
      {/* 1. HEADER OFICIAL STICKY                                                 */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 h-16 border-b border-white/[0.08] bg-[#09090b]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo e Nome */}
          <a href="#topo" className="flex items-center gap-3 group" title="BioVip - Microsites de Alta Conversão">
            <div className="w-14 h-10 rounded-xl bg-[#1c1c1e] border border-amber-400/40 shadow-lg shadow-amber-500/20 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-amber-300 transition-colors">
              <img
                src="/assets/aistudio/1793152702953_02858b21.jpg"
                alt="BioVip Logo"
                className="w-full h-full object-cover scale-125"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-serif font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 group-hover:from-white group-hover:via-amber-200 group-hover:to-amber-400 transition-colors">
                BIOVIP
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-neutral-400 group-hover:text-amber-400/90 transition-colors">
                Microsites de Luxo
              </span>
            </div>
          </a>

          {/* Navegação Central */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-neutral-300">
            <a href="#catalogo" className="hover:text-amber-300 transition">Modelos Prontos</a>
            <a href="#vantagens" className="hover:text-amber-300 transition">Vantagens & Lucro</a>
            <a href="#comparativo" className="hover:text-amber-300 transition">Comparativo</a>
            <a href="#processo" className="hover:text-amber-300 transition">Como Funciona</a>
            <a href="#investimento" className="hover:text-amber-300 transition">Planos & Preços</a>
            <a href="#faq" className="hover:text-amber-300 transition">Dúvidas</a>
          </nav>

          {/* Ações no Topo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openCreatorSubdomain}
              className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 hover:text-amber-300 transition cursor-pointer"
              title={`Acessar Painel do Administrador (${cleanSub}.${cleanDomain})`}
            >
              {cleanSub}.{cleanDomain} ↗
            </button>
            <button
              type="button"
              onClick={() => onSelectPlanForPayment('pro')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-neutral-950 font-bold text-xs tracking-wide transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 fill-neutral-950" />
              <span>Garantir Vaga R$ 79,90</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION — ALTA CONVERSÃO & SIMULADOR REAL                         */}
      {/* ========================================================================= */}
      <section id="topo" className="relative pt-10 pb-20 lg:pt-16 lg:pb-24 border-b border-white/[0.06] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Coluna Esquerda: Proposta de Valor e Gatilhos */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge de Escassez e Urgência */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  🔥 OFERTA DE LANÇAMENTO: 10 Primeiros por {creationProStr} (Restam 3 vagas!)
                </span>
                <span className="text-xs text-emerald-400 font-semibold font-mono">
                  ✨ 1º Mês Sem Mensalidade
                </span>
              </div>

              {/* Título Principal de Alto Impacto */}
              <h1
                className="font-serif font-bold tracking-tight text-white leading-[1.08]"
                style={{ fontSize: 'clamp(2.1rem, 4vw + 0.5rem, 3.85rem)' }}
              >
                Transforme os visitantes da sua bio em clientes pagantes no WhatsApp.
              </h1>

              {/* Subtítulo Claro e Direto */}
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed font-normal">
                Links genéricos e amadores fazem você perder pacientes e clientes todos os dias. Com um{' '}
                <strong className="text-amber-300 font-semibold">Microsite BioVip de Luxo</strong>, você transmite autoridade máxima, elimina curiosos com triagem automática e recebe contatos qualificados no WhatsApp — entregue 100% pronto em até 24 horas.
              </p>

              {/* Seletor Interativo de Nichos com Visualização Imediata */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Selecione seu nicho para testar o microsite real convertendo no iPhone ao lado:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {readyMadeModels.map((m: any) => {
                    const isActive = m.id === activeHeroModel.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setLandingHeroModelId(m.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-amber-400 text-neutral-950 border-amber-300 font-bold shadow-lg shadow-amber-500/20'
                            : 'bg-neutral-900/90 text-neutral-300 border-white/[0.08] hover:border-amber-400/40 hover:text-white'
                        }`}
                      >
                        <span>{m.nicheKitKey}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTAs Primários e Secundários */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#investimento"
                  className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-neutral-950 font-black text-sm tracking-wide transition shadow-xl shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <span>Quero Meu Microsite Pronto em 24h</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => openRealMicrositeInNewTab(activeHeroModel.realSiteData, activeHeroModel.subdomain)}
                  className="px-5 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm border border-white/[0.12] transition flex items-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <span>Testar Modelo {activeHeroModel.personaName} Ao Vivo</span>
                </button>
              </div>

              {/* Linha de Benefícios e Confiança */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  Triagem anti-curiosos ativa
                </span>
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Design que valoriza seu preço
                </span>
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Entrega expressa em até 24h
                </span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Garantia blindada de 7 dias
                </span>
              </div>
            </div>

            {/* Coluna Direita: Simulador Real do iPhone */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[390px] rounded-[42px] p-3 bg-[#141418] border-2 border-amber-500/30 shadow-[0_25px_80px_-15px_rgba(251,191,36,0.15)] relative group">
                {/* Barra Superior do Navegador */}
                <div className="px-4 py-2.5 bg-[#0c0c0f] rounded-t-[30px] border-b border-white/[0.08] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="text-[11px] font-mono text-neutral-300 truncate">
                      https://{cleanDomain}/{activeHeroModel.subdomain}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openRealMicrositeInNewTab(activeHeroModel.realSiteData, activeHeroModel.subdomain)}
                    className="text-[10px] font-mono text-amber-400 hover:underline shrink-0 cursor-pointer flex items-center gap-1"
                    title="Abrir este microsite real em tela cheia"
                  >
                    <span>Tela Cheia</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Iframe do Microsite Real */}
                <div className="w-full h-[640px] bg-black rounded-b-[30px] overflow-hidden relative">
                  <iframe
                    key={activeHeroModel.id}
                    title={`Microsite Real - ${activeHeroModel.personaName}`}
                    srcDoc={(activeHeroModel as any).carouselHtml || activeHeroModel.realHtml}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>

                {/* Badge Flutuante de Indicação */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-neutral-900 border border-amber-500/40 text-[10px] font-mono text-amber-300 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Microsite Real em Funcionamento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FAIXA DE PROVA SOCIAL QUANTITATIVA                                     */}
      {/* ========================================================================= */}
      <section className="border-b border-white/[0.06] bg-neutral-950/70 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 tabular-nums">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-1 font-mono">
                <span>+580</span>
                <span className="text-amber-400 text-lg">★</span>
              </div>
              <p className="text-xs text-neutral-400">Microsites de Luxo Entregues e Ativos</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                4.9 / 5.0
              </div>
              <p className="text-xs text-neutral-400">Avaliação Média dos Nossos Clientes</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                98.4%
              </div>
              <p className="text-xs text-neutral-400">Taxa de Conversão e Retenção</p>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                24 Horas
              </div>
              <p className="text-xs text-neutral-400">Prazo Médio de Entrega do Site Pronto</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMPARATIVO DIRETO DE VENDAS (LINKTREE vs BIOVIP)                       */}
      {/* ========================================================================= */}
      <section id="comparativo" className="py-20 lg:py-28 border-b border-white/[0.06] bg-neutral-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3 text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
              COMPARAÇÃO DIRETA DE CONVERSÃO
            </span>
            <h2
              className="font-serif font-bold text-white tracking-tight"
              style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
            >
              A diferença brutal entre perder clientes e fechar vendas todos os dias:
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Veja o que acontece quando você troca uma lista de botões cinzas amadores por um Microsite de Alta Conversão projetado para valorizar seus serviços.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Coluna 1: Linktree / Árvores Amadoras */}
            <div className="p-8 rounded-3xl bg-neutral-900/40 border border-red-500/20 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                    ÁRVORES DE LINKS TRADICIONAIS
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">Linktree / Beacons / Bio comuns</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-200">
                  Onde você gasta tempo e perde clientes indecisos
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Listas frias de botões sem contexto diminuem o valor percebido do seu trabalho e afastam quem busca um serviço profissional.
                </p>
                <ul className="space-y-3 pt-3 border-t border-white/[0.06] text-xs text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Design genérico e impessoal:</strong> Idêntico a milhares de outros perfis amadores.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Enxurrada de curiosos sem orçamento:</strong> Pessoas entram no WhatsApp só para perguntar preço e somem.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Sem catálogo visual:</strong> O cliente não vê o resultado do seu trabalho nem a descrição dos procedimentos.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Desvalorização de preço:</strong> Transmite sensação de serviço barato, forçando você a dar descontos para fechar.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Propaganda de terceiros:</strong> Exibe a logo e anúncios da própria plataforma no rodapé do seu negócio.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Coluna 2: Microsite BioVip de Luxo */}
            <div className="p-8 rounded-3xl bg-neutral-900/90 border-2 border-amber-500/50 space-y-6 flex flex-col justify-between shadow-2xl shadow-amber-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-l from-amber-500 to-amber-400 text-neutral-950 font-black text-[10px] uppercase tracking-wider rounded-bl-xl shadow">
                PADRÃO LUXO DE ALTA CONVERSÃO
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    MICROSITE PROFISSIONAL BIOVIP
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">Conversão Garantida</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Onde seus visitantes viram clientes pagantes
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Experiência visual de alto padrão que posiciona você como referência no seu nicho e filtra os clientes antes de chegarem ao seu WhatsApp.
                </p>
                <ul className="space-y-3 pt-3 border-t border-white/[0.08] text-xs text-neutral-200">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✔</span>
                    <span><strong>Design exclusivo com a sua marca:</strong> Paleta personalizada, fotos reais e monograma de alto luxo.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✔</span>
                    <span><strong>Filtro anti-curiosos inteligente:</strong> Qualifica o visitante com 3 perguntas antes dele chamar no WhatsApp.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✔</span>
                    <span><strong>Catálogo interativo com fotos e valores:</strong> O cliente já chega sabendo o que quer comprar.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✔</span>
                    <span><strong>Autoridade imediata:</strong> Permite cobrar mais caro pelos seus atendimentos porque seu posicionamento é de luxo.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✔</span>
                    <span><strong>100% livre de marcas de terceiros:</strong> Seu site, sua marca e seu link oficial exclusivo.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/[0.08]">
                <a
                  href="#investimento"
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Quero Esse Padrão no Meu Negócio</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. VITRINE DE MODELOS PRONTOS (CARROSSEL INTERATIVO)                      */}
      {/* ========================================================================= */}
      <section id="catalogo" className="py-20 lg:py-28 border-b border-white/[0.06] overflow-hidden">
        <style>{`
          @keyframes biovipMarqueeAnim {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .biovip-marquee-track {
            display: flex;
            width: max-content;
            animation: biovipMarqueeAnim ${Math.max(28, filteredModels.length * 6)}s linear infinite;
            will-change: transform;
          }
          .biovip-marquee-wrapper:hover .biovip-marquee-track,
          .biovip-marquee-track.is-paused {
            animation-play-state: paused !important;
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400/90 block font-mono">
              VITRINE DE MICROSITES QUE VENDEM TODOS OS DIAS
            </span>
            <h2
              className="font-sans font-extrabold text-white tracking-tight"
              style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
            >
              Passe o mouse e teste a experiência que transforma visitantes em clientes pagantes.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Cada modelo abaixo foi projetado com gatilhos visuais de retenção, catálogo com valores e funil direto para o WhatsApp. Escolha o estilo ideal para a sua profissão:
            </p>
          </div>

          {/* Filtros de Categorias */}
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-white/[0.06]">
            {catalogCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-neutral-950 font-bold'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.07]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Faixa Contínua de Celulares */}
        <div
          className="relative w-full overflow-hidden biovip-marquee-wrapper py-4"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          <div className={`biovip-marquee-track ${isCarouselPaused ? 'is-paused' : ''}`}>
            {[...filteredModels, ...filteredModels].map((m, idx) => (
              <div key={`${m.id}-${idx}`} className="px-3 shrink-0">
                <div className="w-[280px] rounded-[32px] p-2 bg-[#141418] border border-white/[0.12] shadow-xl hover:border-amber-400/50 transition-all duration-300">
                  <div className="px-3 py-2 bg-[#0c0c0f] rounded-t-[24px] border-b border-white/[0.06] flex items-center justify-between text-[10px] text-neutral-300 font-mono">
                    <span className="truncate">{m.personaName}</span>
                    <button
                      type="button"
                      onClick={() => setPreviewModalModelId(m.id)}
                      className="text-amber-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Ver</span>
                    </button>
                  </div>
                  <div className="w-full h-[460px] bg-black rounded-b-[24px] overflow-hidden relative">
                    <iframe
                      title={m.personaName}
                      srcDoc={(m as any).carouselHtml || m.realHtml}
                      className="w-full h-full border-0 pointer-events-none"
                    />
                  </div>
                  <div className="p-2 pt-2.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openRealMicrositeInNewTab(m.realSiteData, m.subdomain)}
                      className="flex-1 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-[11px] font-semibold border border-white/[0.08] transition text-center cursor-pointer flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3 text-amber-400" />
                      <span>Testar Ao Vivo</span>
                    </button>
                    <a
                      href="#investimento"
                      onClick={() => {
                        setLandingOrderForm((p: any) => ({
                          ...p,
                          selectedModel: `${m.title} (${m.personaName})`,
                        }));
                      }}
                      className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-[11px] font-bold transition text-center cursor-pointer"
                    >
                      Quero Este
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BENTO GRID DE VANTAGENS EXCLUSIVAS (POR QUE VENDE MAIS)                 */}
      {/* ========================================================================= */}
      <section id="vantagens" className="py-20 lg:py-28 border-b border-white/[0.06] bg-neutral-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
              ENGENHARIA DE VENDAS COMPROVADA
            </span>
            <h2
              className="font-serif font-bold text-white tracking-tight"
              style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
            >
              6 Vantagens Exclusivas que fazem seu microsite se pagar logo na primeira semana:
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Cada detalhe do BioVip foi desenhado para eliminar objeções, reter o visitante e conduzi-lo para o fechamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-amber-400/40 transition space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Triagem Anti-Curiosos no WhatsApp</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Filtra as pessoas antes de chegarem na sua conversa. Você não perde tempo com quem só quer especular preço e atende apenas quem tem orçamento e interesse real.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-amber-400/40 transition space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Design de Luxo que Valoriza seu Preço</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Cores sóbrias, tipografia editorial e monograma sofisticado. Quem entra no seu link percebe que está diante de um profissional de primeira linha e não questiona seu preço.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-amber-400/40 transition space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Catálogo Interativo de Procedimentos</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Fotos em alta resolução dos seus serviços, descrições claras e estimativas de tempo e valores. O cliente já chega no WhatsApp sabendo exatamente o que deseja contratar.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-amber-400/40 transition space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Velocidade Instantânea Ultra-Leve</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Código nativo sem plataformas pesadas. Seu microsite abre em menos de 1 segundo mesmo em conexões 4G lentas, garantindo que nenhum visitante desista antes de carregar.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-amber-400/40 transition space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Endereço Próprio ou Subdomínio VIP</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Escolha seu link exclusivo BioVip (ex: biovip.com.br/seunome) ou conecte seu domínio próprio registrado. Sem marcas estranhas de plataformas gratuitas no seu perfil.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] hover:border-amber-400/40 transition space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Zero Trabalho Técnico (Equipe Dedicada)</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Você não precisa aprender ferramentas complexas nem perder fins de semana tentando montar página. Nossa equipe experiente entrega tudo pronto para você usar em 24h.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. COMO FUNCIONA EM 3 PASSOS SIMPLES                                      */}
      {/* ========================================================================= */}
      <section id="processo" className="py-20 lg:py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3 text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
              PROCESSO 100% DESCOMPLICADO
            </span>
            <h2
              className="font-serif font-bold text-white tracking-tight"
              style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
            >
              Como funciona para ter seu microsite pronto em 24 horas:
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Você não precisa se preocupar com nada técnico. Cuidamos de todo o processo do início ao fim:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Passo 1 */}
            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/[0.08] space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold font-mono text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Você Envia Seus Dados Básicos</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Você nos envia suas fotos, WhatsApp, redes sociais e a lista de serviços que oferece. Esse envio leva menos de 2 minutos pelo formulário ou WhatsApp.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/[0.08] space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold font-mono text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Nossa Equipe Cria Tudo para Você</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Nossos designers e especialistas em conversão montam o layout exclusivo, refinam as fotos, escrevem os textos persuasivos e configuram seu link oficial.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-amber-500/40 space-y-4 relative shadow-xl shadow-amber-500/10">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-neutral-950 font-black font-mono text-lg flex items-center justify-center">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Você Aprova e Começa a Vender</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Em até 24h entregamos seu microsite pronto. Você revisa, coloca na bio do seu Instagram e já começa a receber contatos qualificados no seu WhatsApp!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. PLANOS E OFERTA IRRESISTÍVEL DE LANÇAMENTO                              */}
      {/* ========================================================================= */}
      <section id="investimento" className="py-20 lg:py-28 border-b border-white/[0.06] bg-neutral-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
              VALORES TRANSPARENTES & RETORNO RÁPIDO
            </span>
            <h2
              className="font-serif font-bold text-white tracking-tight"
              style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
            >
              Invista menos que um cafezinho por dia para transformar seu Instagram em uma máquina de clientes:
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Oferta especial de lançamento para os 10 primeiros clientes. Criação com preço promocional único e <strong className="text-emerald-400">1º mês totalmente sem mensalidade</strong>.
            </p>
          </div>

          {/* Cards de Preços */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Plano 1: Básico */}
            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/[0.08] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">PLANO BÁSICO</span>
                <h3 className="text-xl font-bold text-white">Ideal para quem está começando</h3>
                <div className="space-y-1">
                  <div className="text-xs text-neutral-500 line-through font-mono">De R$ 197,00</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono flex items-baseline gap-1">
                    <span>{creationBasicStr}</span>
                    <span className="text-xs font-normal text-neutral-400">taxa única</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold font-mono">
                    ★ 1º mês grátis (depois R$ 29,90/mês)
                  </div>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-white/[0.06] text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Microsite personalizado em 24h</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Hospedagem ultra-rápida 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Certificado de segurança SSL gratuito</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>1 alteração mensal incluída</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Suporte via WhatsApp</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onSelectPlanForPayment('basic')}
                className="w-full py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs tracking-wide transition border border-white/[0.1] cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Garantir Plano Básico no WhatsApp</span>
              </button>
            </div>

            {/* Plano 2: Pro (Mais Escolhido) */}
            <div className="p-8 rounded-3xl bg-neutral-900/95 border-2 border-amber-400 space-y-6 flex flex-col justify-between shadow-2xl shadow-amber-500/15 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-amber-300 text-neutral-950 font-black text-[10px] uppercase tracking-wider rounded-full shadow-lg">
                MAIS ESCOLHIDO PELOS PROFISSIONAIS
              </div>
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block font-bold">PLANO PRO</span>
                <h3 className="text-xl font-bold text-white">Para clínicas, médicos e negócios</h3>
                <div className="space-y-1">
                  <div className="text-xs text-neutral-500 line-through font-mono">De R$ 347,00</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono flex items-baseline gap-1">
                    <span>{creationProStr}</span>
                    <span className="text-xs font-normal text-neutral-400">taxa única</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold font-mono">
                    ★ 1º mês grátis (depois R$ 49,90/mês)
                  </div>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-white/[0.08] text-xs text-neutral-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>Tudo do Plano Básico</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>4 alterações mensais incluídas</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Funil anti-curiosos completo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Métricas de acessos e cliques no WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Prioridade no atendimento e suporte</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onSelectPlanForPayment('pro')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-neutral-950 font-black text-xs tracking-wide transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-neutral-950 text-neutral-950" />
                <span>Garantir Plano Pro no WhatsApp (R$ 79,90)</span>
              </button>
            </div>

            {/* Plano 3: VIP Ilimitado */}
            <div className="p-8 rounded-3xl bg-neutral-900/50 border border-white/[0.08] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">PLANO VIP ILIMITADO</span>
                <h3 className="text-xl font-bold text-white">Para clínicas de alta demanda</h3>
                <div className="space-y-1">
                  <div className="text-xs text-neutral-500 line-through font-mono">De R$ 497,00</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono flex items-baseline gap-1">
                    <span>{creationVipStr}</span>
                    <span className="text-xs font-normal text-neutral-400">taxa única</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold font-mono">
                    ★ 1º mês grátis (depois R$ 79,90/mês)
                  </div>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-white/[0.06] text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>Alterações mensais ILIMITADAS</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Suporte prioritário VIP direto no WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Domínio personalizado grátis configurado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Relatório mensal de desempenho em PDF</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => onSelectPlanForPayment('vip')}
                className="w-full py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs tracking-wide transition border border-white/[0.1] cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-amber-400" />
                <span>Garantir Plano VIP no WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Garantia de 7 Dias */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-amber-500/30 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <span>Garantia Blindada de 7 Dias — Risco Zero</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% REEMBOLSÁVEL
                </span>
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
                Nós confiamos tanto na qualidade e no retorno do BioVip que você pode testar o seu microsite por 7 dias inteiros. Se você achar que ele não valorizou sua marca ou não gerou contatos, basta nos mandar uma mensagem no WhatsApp que devolvemos 100% do seu dinheiro, sem perguntas.{' '}
                <button
                  type="button"
                  onClick={() => openTermsTab('guarantee')}
                  className="text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer inline-flex items-center gap-1"
                >
                  Ver termos da garantia →
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FORMULÁRIO DE PEDIDO DIRETO (ATENDIMENTO VIP NO WHATSAPP)              */}
      {/* ========================================================================= */}
      <section id="encomendar" className="py-20 lg:py-28 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/90 border border-white/[0.1] shadow-2xl space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
                GARANTA SUA VAGA COM ENTREGA PRIORITÁRIA
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Encomende seu Microsite Pronto e comece a faturar mais hoje mesmo.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Preencha os campos abaixo para iniciar seu atendimento VIP diretamente no nosso WhatsApp oficial.
              </p>
            </div>

            {landingOrderSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Pedido Iniciado com Sucesso!</h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto">
                  Estamos abrindo seu WhatsApp agora mesmo com todos os detalhes da sua encomenda para darmos início à montagem do seu microsite em 24h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLandingOrderSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Seu Nome / Nome do Negócio *
                    </label>
                    <input
                      type="text"
                      value={landingOrderForm.clientName}
                      onChange={(e) => setLandingOrderForm((p: any) => ({ ...p, clientName: e.target.value }))}
                      placeholder="Ex: Dra. Camila Mendes"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Seu WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      value={landingOrderForm.clientWhatsapp}
                      onChange={(e) => setLandingOrderForm((p: any) => ({ ...p, clientWhatsapp: e.target.value }))}
                      placeholder="Ex: (31) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Modelo Desejado
                    </label>
                    <select
                      value={landingOrderForm.selectedModel}
                      onChange={(e) => setLandingOrderForm((p: any) => ({ ...p, selectedModel: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-amber-400 focus:outline-none"
                    >
                      {readyMadeModels.map((m: any) => (
                        <option key={m.id} value={`${m.title} (${m.personaName})`}>
                          {m.title} ({m.personaName})
                        </option>
                      ))}
                      <option value="Outro Nicho (Personalizado sob medida)">
                        Outro Nicho (Personalizado sob medida)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                      Pacote Escolhido
                    </label>
                    <select
                      value={landingOrderForm.selectedPlan}
                      onChange={(e) => setLandingOrderForm((p: any) => ({ ...p, selectedPlan: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Plano Pro (R$ 79,90 criação • Mais Escolhido)">
                        Plano Pro (R$ 79,90 criação • Mais Escolhido)
                      </option>
                      <option value="Plano Básico (R$ 79,90 criação)">
                        Plano Básico (R$ 79,90 criação)
                      </option>
                      <option value="Plano VIP (R$ 79,90 criação • Ilimitado)">
                        Plano VIP (R$ 79,90 criação • Ilimitado)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1.5">
                    Observações ou Links das suas Redes (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={landingOrderForm.customNotes}
                    onChange={(e) => setLandingOrderForm((p: any) => ({ ...p, customNotes: e.target.value }))}
                    placeholder="Ex: Instagram @dracamila, atendo estética facial e botox..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                {landingOrderError && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs">
                    {landingOrderError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 hover:brightness-110 text-neutral-950 font-black text-sm tracking-wide transition shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-neutral-950" />
                  <span>Enviar Pedido e Receber no WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-neutral-400 pt-1">
                  Ao solicitar seu microsite, você concorda com nossos{' '}
                  <button
                    type="button"
                    onClick={() => openTermsTab('terms')}
                    className="text-amber-400 hover:underline cursor-pointer font-medium"
                  >
                    Termos de Uso
                  </button>
                  ,{' '}
                  <button
                    type="button"
                    onClick={() => openTermsTab('privacy')}
                    className="text-amber-400 hover:underline cursor-pointer font-medium"
                  >
                    Política de Privacidade (LGPD)
                  </button>{' '}
                  e{' '}
                  <button
                    type="button"
                    onClick={() => openTermsTab('guarantee')}
                    className="text-emerald-400 hover:underline cursor-pointer font-medium"
                  >
                    Garantia de 7 Dias
                  </button>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FAQ — DÚVIDAS FREQUENTES COM ACORDEÃO INTERATIVO                      */}
      {/* ========================================================================= */}
      <section id="faq" className="py-20 lg:py-28 border-b border-white/[0.06] bg-neutral-950/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 block font-mono">
              PERGUNTAS FREQUENTES
            </span>
            <h2
              className="font-serif font-bold text-white tracking-tight"
              style={{ fontSize: 'clamp(1.85rem, 3vw + 0.5rem, 2.75rem)' }}
            >
              Tudo o que você precisa saber antes de começar:
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-neutral-900/60 border border-white/[0.08] overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:text-amber-300 transition"
                  >
                    <span className="font-bold text-sm sm:text-base text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FOOTER PROFISSIONAL E INSTITUCIONAL                                   */}
      {/* ========================================================================= */}
      <footer className="py-12 bg-[#060608] text-xs text-neutral-400 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-9 rounded-xl bg-[#1c1c1e] border border-amber-400/40 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/aistudio/1793152702953_02858b21.jpg"
                  alt="BioVip Logo"
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              <div>
                <span className="font-serif font-black tracking-widest text-sm text-white block">BIOVIP</span>
                <span className="text-[10px] text-neutral-400">Estúdio de Microsites de Luxo & Alta Conversão</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-neutral-400">
              <button
                type="button"
                onClick={() => openTermsTab('terms')}
                className="hover:text-amber-300 transition cursor-pointer"
              >
                Termos de Uso
              </button>
              <button
                type="button"
                onClick={() => openTermsTab('privacy')}
                className="hover:text-amber-300 transition cursor-pointer"
              >
                Política de Privacidade
              </button>
              <button
                type="button"
                onClick={() => openTermsTab('guarantee')}
                className="hover:text-emerald-300 transition cursor-pointer"
              >
                Garantia de 7 Dias
              </button>
              <a href="#investimento" className="hover:text-amber-300 transition">Planos</a>
              <a href="#faq" className="hover:text-amber-300 transition">Dúvidas</a>
              <button
                type="button"
                onClick={openCreatorSubdomain}
                className="hover:text-amber-300 transition cursor-pointer"
              >
                Acesso do Criador
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
            <p>© {new Date().getFullYear()} BioVip Studio. Todos os direitos reservados. CNPJ ativo.</p>
            <p className="flex items-center gap-1.5 text-neutral-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ambiente 100% Seguro com Criptografia SSL 256-bit</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 12. BARRA DE CONVERSÃO FLUTUANTE STICKY (MOBILE ONLY)                     */}
      {/* ========================================================================= */}
      {showStickyBar && (
        <div className="lg:hidden fixed bottom-3 left-4 right-4 z-40 p-2.5 rounded-2xl bg-neutral-900/95 border border-amber-400/50 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="pl-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">OFERTA 10 PRIMEIROS</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">1º MÊS GRÁTIS</span>
            </div>
            <div className="text-sm font-extrabold text-white font-mono">{creationProStr}</div>
          </div>
          <button
            type="button"
            onClick={() => onSelectPlanForPayment('pro')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-300 text-neutral-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-neutral-950" />
            <span>Pedir no WhatsApp</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 13. MODAL DE PRÉVIA EM TELA CHEIA DO MICROSITE                            */}
      {/* ========================================================================= */}
      {previewModalModel && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div className="w-full max-w-sm h-[90vh] bg-neutral-900 border border-amber-500/40 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="px-4 py-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">{previewModalModel.personaName}</span>
                <span className="text-[10px] text-amber-400 font-mono">biovip.com.br/{previewModalModel.subdomain}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalModelId(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 w-full bg-black">
              <iframe
                title={previewModalModel.personaName}
                srcDoc={(previewModalModel as any).carouselHtml || previewModalModel.realHtml}
                className="w-full h-full border-0"
              />
            </div>
            <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewModalModelId(null)}
                className="flex-1 py-2 rounded-xl bg-neutral-800 text-neutral-300 font-semibold text-xs text-center cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  setLandingOrderForm((p: any) => ({
                    ...p,
                    selectedModel: `${previewModalModel.title} (${previewModalModel.personaName})`,
                  }));
                  setPreviewModalModelId(null);
                  onSelectPlanForPayment('pro');
                }}
                className="flex-1 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-neutral-950" />
                <span>Quero no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {renderSubdomainConfigModal && renderSubdomainConfigModal()}
      {renderPaymentSuccessModal && renderPaymentSuccessModal()}
      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        initialTab={termsModalTab}
      />
    </div>
  );
};

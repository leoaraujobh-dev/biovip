import React from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, Clock, ExternalLink } from 'lucide-react';

export const HeroLuxuryResponsive = () => {
  return (
    <section className="relative min-h-[92vh] bg-[#09090B] bg-radial-luxury overflow-hidden flex items-center pt-20 pb-16 px-5 sm:px-8 lg:px-12">
      {/* Luz ambiente de fundo (Glow Dourado) */}
      <div className="absolute top-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2B857]/15 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none pulse-glow" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* ========================================================= */}
        {/* LADO TEXTO / CALL TO ACTION (Full width mobile, 5 cols lg) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 z-10 flex flex-col items-center lg:items-start text-center lg:text-left pt-4 lg:pt-0">
          
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] text-xs font-semibold tracking-wider uppercase mb-5">
            <span className="w-2 h-2 rounded-full bg-[#E2B857] animate-pulse" />
            Microsites de Luxo em 24h
          </div>

          {/* Título Principal H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif text-zinc-100 font-normal tracking-tight leading-[1.18] mb-5">
            Seu Link na Bio <br className="hidden sm:inline" />
            <span className="italic font-light text-[#E2B857]">Não Precisa</span> Ser Comum.
          </h1>

          {/* Subtítulo Curto e Direto */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-sans leading-relaxed mb-7 max-w-lg">
            Crie um microsite de alto padrão para o seu negócio de beleza em minutos, com catálogo visual e agendamento direto no WhatsApp. Nós entregamos pronto para você.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <a
              href="https://wa.me/5531991390202?text=Ol%C3%A1!%20Quero%20meu%20BioVip%20pronto%20em%2024h."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#22C55E] hover:bg-[#1eb054] text-white transition-all shadow-[0_0_25px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Criar Meu BioVip Pronto
            </a>

            <a
              href="#modelos"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#E2B857]/40 bg-white/5 backdrop-blur-sm transition-all text-center cursor-pointer"
            >
              Ver Exemplos ➔
            </a>
          </div>

          {/* Prova Social Integrada */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-zinc-800/80">
            <div className="flex -space-x-2">
              <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#09090B] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Isabela Fontes" />
              <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#09090B] object-cover" src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=100&auto=format&fit=crop&q=80" alt="Dom Pedro" />
              <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#09090B] object-cover" src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=100&auto=format&fit=crop&q=80" alt="Dra. Ana Freire" />
            </div>
            <p className="text-xs text-zinc-400">
              <span className="text-[#E2B857] font-bold">★ 4.9</span> • Usado por mais de 500 profissionais
            </p>
          </div>

        </div>

        {/* ========================================================= */}
        {/* LADO VISUAL 3D COM BIOSITES REAIS DE DEMONSTRAÇÃO */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 relative h-[450px] sm:h-[520px] lg:h-[600px] w-full flex items-center justify-center perspective-1000 mt-2 lg:mt-0">
          
          {/* MOCKUP 1: BioSite Real Isabela Fontes (Lash & Olhar VIP) */}
          <Link
            href="/isabela-lash-studio"
            target="_blank"
            title="Abrir BioSite Real: Isabela Fontes"
            className="group/phone1 hidden lg:block absolute left-[3%] xl:left-[6%] top-[10%] w-[235px] xl:w-[252px] aspect-[9/19] rounded-[40px] p-2 bg-[#141418] border border-zinc-700/70 hover:border-[#E2B857]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] phone-float-left z-10 overflow-hidden transition-all duration-300 cursor-pointer"
          >
            <div className="w-full h-full rounded-[32px] overflow-hidden bg-[#09090B] flex flex-col p-3 border border-white/5 relative">
              
              {/* Barra de Status iPhone Real */}
              <div className="flex items-center justify-between px-1 text-[8px] text-zinc-400 font-mono mb-2 shrink-0">
                <span>9:41</span>
                <div className="w-14 h-3 bg-zinc-900 rounded-full mx-auto" />
                <span>5G 100%</span>
              </div>

              {/* Tag Superior Discreta */}
              <div className="text-[7.5px] uppercase tracking-wider text-[#E2B857] text-center font-mono font-semibold mb-1">
                ✦ BioSite Real • Toque p/ Abrir ↗
              </div>

              {/* Perfil Real: Isabela Fontes */}
              <div className="text-center mb-2.5 shrink-0">
                <div className="relative w-12 h-12 mx-auto rounded-full p-0.5 bg-gradient-to-tr from-[#E2B857] to-[#f3d489] mb-1.5 shadow">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    className="w-full h-full object-cover rounded-full"
                    alt="Isabela Fontes"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-[#09090B] flex items-center justify-center text-[7px] text-white font-bold">
                    ✓
                  </div>
                </div>
                <h4 className="text-[11px] font-serif font-bold text-zinc-100 leading-tight">
                  Isabela Fontes
                </h4>
                <p className="text-[8px] text-[#E2B857] font-sans">
                  Lash Designer & Olhar VIP
                </p>
                <div className="flex items-center justify-center gap-1 text-[7.5px] text-zinc-400 mt-0.5">
                  <span className="text-[#E2B857] font-bold">★ 5.0</span>
                  <span>• 428 clientes</span>
                </div>
              </div>

              {/* Catálogo Real de Cílios */}
              <div className="space-y-1.5 my-auto">
                <div className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[8px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&auto=format&fit=crop&q=80"
                      className="w-5 h-5 rounded object-cover shrink-0"
                      alt="Volume Russo"
                    />
                    <div className="truncate">
                      <span className="text-zinc-200 font-medium block truncate">Volume Russo</span>
                      <span className="text-[7px] text-zinc-500">2h • Retenção 30d</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#E2B857] shrink-0 font-mono">R$ 190</span>
                </div>

                <div className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[8px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=100&auto=format&fit=crop&q=80"
                      className="w-5 h-5 rounded object-cover shrink-0"
                      alt="Fio a Fio"
                    />
                    <div className="truncate">
                      <span className="text-zinc-200 font-medium block truncate">Fio a Fio Clássico</span>
                      <span className="text-[7px] text-zinc-500">1h45 • Efeito Soft</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#E2B857] shrink-0 font-mono">R$ 160</span>
                </div>
              </div>

              {/* Botão de Agendamento Real */}
              <div className="mt-auto pt-1">
                <div className="py-1.5 rounded-lg bg-[#22C55E] text-[8.5px] font-bold text-center text-white flex items-center justify-center gap-1 shadow-md group-hover/phone1:bg-[#1eb054] transition">
                  <span>Agendar no WhatsApp</span>
                </div>
              </div>

            </div>
          </Link>

          {/* MOCKUP 2 (CENTRAL): BioSite Real Dom Pedro Barbearia */}
          <Link
            href="/dom-pedro-barbearia"
            target="_blank"
            title="Abrir BioSite Real: Dom Pedro Barbearia"
            className="group/phone2 relative lg:absolute lg:left-[31%] xl:left-[34%] lg:top-[0%] w-[235px] sm:w-[270px] xl:w-[285px] aspect-[9/19] rounded-[42px] sm:rounded-[46px] p-2.5 bg-[#18181D] border-2 border-[#E2B857]/70 shadow-[0_25px_65px_rgba(226,184,87,0.22)] phone-float-center z-20 overflow-hidden transition-all duration-300 hover:border-[#E2B857] cursor-pointer"
          >
            <div className="w-full h-full rounded-[34px] sm:rounded-[38px] overflow-hidden bg-[#09090B] flex flex-col p-3.5 border border-white/5 relative">
              
              {/* Barra de Status iPhone Real */}
              <div className="flex items-center justify-between px-1.5 text-[8.5px] sm:text-[9px] text-zinc-400 font-mono mb-2 shrink-0">
                <span>9:41</span>
                <div className="w-16 h-3 bg-zinc-900 rounded-full mx-auto" />
                <span className="text-emerald-400">● 100%</span>
              </div>

              {/* Badge Modelo Real */}
              <div className="text-[8px] sm:text-[8.5px] uppercase tracking-wider text-[#E2B857] text-center font-mono font-bold mb-1 flex items-center justify-center gap-1">
                <span>✦ BioSite Real ao Vivo</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </div>

              {/* Perfil Real: Dom Pedro Barbearia */}
              <div className="text-center mb-3 shrink-0">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full p-0.5 bg-gradient-to-tr from-[#E2B857] via-[#f5deb3] to-[#E2B857] mb-1.5 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80"
                    className="w-full h-full object-cover rounded-full"
                    alt="Dom Pedro Barbearia"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E2B857] border-2 border-[#09090B] flex items-center justify-center text-[8px] text-black font-extrabold">
                    ★
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-zinc-100 leading-tight">
                  Dom Pedro Barbearia
                </h4>
                <p className="text-[8.5px] sm:text-[9.5px] text-[#E2B857] font-sans font-medium">
                  Barbearia Nobre & Visagismo
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[8px] text-zinc-400 mt-1">
                  <span className="text-[#E2B857] font-bold">★ 4.9</span>
                  <span>• 562 avaliações no Maps</span>
                </div>
              </div>

              {/* Serviços Reais da Barbearia */}
              <div className="space-y-2 my-auto">
                <div className="p-2 rounded-xl bg-zinc-900/95 border border-[#E2B857]/40 text-[9px] sm:text-[9.5px] flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=100&auto=format&fit=crop&q=80"
                      className="w-7 h-7 rounded-lg object-cover shrink-0 border border-zinc-800"
                      alt="Combo Corte + Barba"
                    />
                    <div className="truncate">
                      <span className="text-zinc-100 font-semibold block truncate">Corte + Barba Terapia</span>
                      <span className="text-[7.5px] text-zinc-400">1h15 • Toalha quente & ozônio</span>
                    </div>
                  </div>
                  <span className="font-bold font-mono text-[#E2B857] shrink-0 text-[10px] sm:text-[11px]">R$ 95</span>
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/95 border border-zinc-800 text-[9px] sm:text-[9.5px] flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=100&auto=format&fit=crop&q=80"
                      className="w-7 h-7 rounded-lg object-cover shrink-0 border border-zinc-800"
                      alt="Corte Visagista"
                    />
                    <div className="truncate">
                      <span className="text-zinc-200 font-medium block truncate">Corte Visagista VIP</span>
                      <span className="text-[7.5px] text-zinc-400">45m • Finalização pomada</span>
                    </div>
                  </div>
                  <span className="font-bold font-mono text-[#E2B857] shrink-0 text-[10px] sm:text-[11px]">R$ 65</span>
                </div>
              </div>

              {/* Botão Verde de Agendamento */}
              <div className="mt-auto pt-2">
                <div className="py-2 sm:py-2.5 rounded-xl bg-[#22C55E] text-[10px] sm:text-[11px] font-bold text-center text-white flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover/phone2:bg-[#1eb054] transition">
                  <span>Agendar Cadeira no WhatsApp</span>
                </div>
                <p className="text-[7px] text-center text-zinc-500 mt-1">
                  Toque para navegar no biosite real
                </p>
              </div>

            </div>
          </Link>

          {/* MOCKUP 3: BioSite Real Dra. Ana Freire (Odontologia & Harmonização) */}
          <Link
            href="/dra-ana-freire"
            target="_blank"
            title="Abrir BioSite Real: Dra. Ana Freire"
            className="group/phone3 hidden lg:block absolute right-[3%] xl:right-[5%] top-[13%] w-[225px] xl:w-[242px] aspect-[9/19] rounded-[40px] p-2 bg-[#141418] border border-zinc-700/70 hover:border-[#E2B857]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] phone-float-right z-10 overflow-hidden transition-all duration-300 cursor-pointer"
          >
            <div className="w-full h-full rounded-[32px] overflow-hidden bg-[#09090B] flex flex-col p-3 border border-white/5 relative">
              
              {/* Barra de Status iPhone Real */}
              <div className="flex items-center justify-between px-1 text-[8px] text-zinc-400 font-mono mb-2 shrink-0">
                <span>9:41</span>
                <div className="w-14 h-3 bg-zinc-900 rounded-full mx-auto" />
                <span>5G 100%</span>
              </div>

              {/* Tag Superior Discreta */}
              <div className="text-[7.5px] uppercase tracking-wider text-[#E2B857] text-center font-mono font-semibold mb-1">
                ✦ BioSite Real • Toque p/ Abrir ↗
              </div>

              {/* Perfil Real: Dra. Ana Freire */}
              <div className="text-center mb-2.5 shrink-0">
                <div className="relative w-12 h-12 mx-auto rounded-full p-0.5 bg-gradient-to-tr from-[#E2B857] to-[#f3d489] mb-1.5 shadow">
                  <img
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80"
                    className="w-full h-full object-cover rounded-full"
                    alt="Dra. Ana Freire"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-[#09090B] flex items-center justify-center text-[7px] text-white font-bold">
                    ✓
                  </div>
                </div>
                <h4 className="text-[11px] font-serif font-bold text-zinc-100 leading-tight">
                  Dra. Ana Freire
                </h4>
                <p className="text-[8px] text-[#E2B857] font-sans">
                  Odonto Estética • CRO 22.675
                </p>
                <div className="flex items-center justify-center gap-1 text-[7.5px] text-zinc-400 mt-0.5">
                  <span className="text-[#E2B857] font-bold">★ 5.0</span>
                  <span>• 310 pacientes</span>
                </div>
              </div>

              {/* Catálogo Real de Tratamentos */}
              <div className="space-y-1.5 my-auto">
                <div className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[8px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=100&auto=format&fit=crop&q=80"
                      className="w-5 h-5 rounded object-cover shrink-0"
                      alt="Lentes de Contato"
                    />
                    <div className="truncate">
                      <span className="text-zinc-200 font-medium block truncate">Lentes em Resina</span>
                      <span className="text-[7px] text-zinc-500">Planejamento 3D</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#E2B857] shrink-0 font-mono text-[7.5px]">Sob Consulta</span>
                </div>

                <div className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[8px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&auto=format&fit=crop&q=80"
                      className="w-5 h-5 rounded object-cover shrink-0"
                      alt="Harmonização & Botox"
                    />
                    <div className="truncate">
                      <span className="text-zinc-200 font-medium block truncate">Botox & Harmonização</span>
                      <span className="text-[7px] text-zinc-500">Full Face Rejuvenesc.</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#E2B857] shrink-0 font-mono text-[7.5px]">R$ 1.200</span>
                </div>
              </div>

              {/* Botão de Agendamento Real */}
              <div className="mt-auto pt-1">
                <div className="py-1.5 rounded-lg bg-[#22C55E] text-[8.5px] font-bold text-center text-white flex items-center justify-center gap-1 shadow-md group-hover/phone3:bg-[#1eb054] transition">
                  <span>Consulta no WhatsApp</span>
                </div>
              </div>

            </div>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default HeroLuxuryResponsive;

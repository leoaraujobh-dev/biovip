import React from 'react';

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

          {/* Subtítulo Curto e Direto (máximo 2 linhas) */}
          <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-sans leading-relaxed mb-7 max-w-lg">
            Microsite de alto padrão com catálogo e agendamento no WhatsApp. Entregamos 100% pronto em até 24 horas.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <a
              href="https://wa.me/5531991390202?text=Ol%C3%A1!%20Quero%20meu%20BioVip%20pronto%20em%2024h."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#22C55E] hover:bg-[#1eb054] text-white transition-all shadow-[0_0_25px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Quero Meu BioVip Pronto em 24h
            </a>

            <a
              href="#modelos"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm text-zinc-300 hover:text-white border border-zinc-800 hover:border-[#E2B857]/40 bg-white/5 backdrop-blur-sm transition-all text-center cursor-pointer"
            >
              Ver Modelos ao Vivo ➔
            </a>
          </div>

          {/* Prova Social Integrada */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-zinc-800/80">
            <div className="flex -space-x-2">
              <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#09090B] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Profissional" />
              <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#09090B] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Profissional" />
              <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#09090B] object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Profissional" />
            </div>
            <p className="text-xs text-zinc-400">
              <span className="text-[#E2B857] font-bold">★ 4.9</span> • Usado por mais de 500 profissionais
            </p>
          </div>

        </div>

        {/* ========================================================= */}
        {/* LADO VISUAL 3D (1 Celular no Mobile, 3 Celulares no Desktop) */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-[580px] w-full flex items-center justify-center perspective-1000 mt-2 lg:mt-0">
          
          {/* MOCKUP 1: Lash Studio (Oculto em mobile, visível em lg) */}
          <div className="hidden lg:block absolute left-[5%] xl:left-[8%] top-[10%] w-[230px] xl:w-[250px] aspect-[9/19] rounded-[38px] p-2 bg-[#141418] border border-zinc-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] phone-float-left z-10 overflow-hidden pointer-events-none">
            <div className="w-full h-full rounded-[30px] overflow-hidden bg-black flex flex-col p-3">
              <div className="w-16 h-3 bg-zinc-800 rounded-full mx-auto mb-2.5" />
              <div className="w-12 h-12 rounded-full border border-[#E2B857] mx-auto mb-2 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Estúdio de Cílios" />
              </div>
              <p className="text-[11px] font-serif text-center text-zinc-100">Beauty Studio VIP</p>
              <span className="text-[8px] text-[#E2B857] text-center mb-3">Lash & Sobrancelhas</span>
              <div className="space-y-1.5 mt-auto">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[8px] text-zinc-300">✦ Volume Russo • R$ 190</div>
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[8px] text-zinc-300">✦ Lash Lifting • R$ 120</div>
                <div className="py-1.5 rounded-lg bg-[#22C55E] text-[9px] font-bold text-center text-black">Agendar Horário</div>
              </div>
            </div>
          </div>

          {/* MOCKUP 2 (CENTRAL): Barbearia VIP (Visível em Mobile e Desktop) */}
          <div className="relative lg:absolute lg:left-[32%] xl:left-[35%] lg:top-[0%] w-[220px] sm:w-[260px] xl:w-[275px] aspect-[9/19] rounded-[38px] sm:rounded-[42px] p-2.5 bg-[#18181D] border-2 border-[#E2B857]/60 shadow-[0_25px_65px_rgba(226,184,87,0.18)] phone-float-center z-20 overflow-hidden">
            <div className="w-full h-full rounded-[30px] sm:rounded-[32px] overflow-hidden bg-[#09090B] flex flex-col p-3.5">
              <div className="w-20 h-3.5 bg-zinc-800 rounded-full mx-auto mb-3" />
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#E2B857] mx-auto mb-2 overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Barbearia" />
              </div>
              <p className="text-xs sm:text-sm font-serif font-bold text-center text-zinc-100">Barber Club VIP</p>
              <span className="text-[9px] text-[#E2B857] text-center mb-3">Corte & Barboterapia</span>
              <div className="space-y-2 mt-auto">
                <div className="p-2 rounded-xl bg-zinc-900/90 border border-[#E2B857]/30 text-[9px] flex justify-between text-zinc-200">
                  <span>Combo Corte + Barba</span>
                  <span className="font-bold text-[#E2B857]">R$ 95</span>
                </div>
                <div className="py-2 rounded-xl bg-[#22C55E] text-[10px] sm:text-[11px] font-bold text-center text-black shadow-lg">
                  Agendar no WhatsApp
                </div>
              </div>
            </div>
          </div>

          {/* MOCKUP 3: Estética / Clínica (Oculto em mobile, visível em lg) */}
          <div className="hidden lg:block absolute right-[4%] xl:right-[6%] top-[14%] w-[215px] xl:w-[235px] aspect-[9/19] rounded-[38px] p-2 bg-[#141418] border border-zinc-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] phone-float-right z-10 overflow-hidden pointer-events-none">
            <div className="w-full h-full rounded-[30px] overflow-hidden bg-black flex flex-col p-3">
              <div className="w-16 h-3 bg-zinc-800 rounded-full mx-auto mb-2.5" />
              <div className="w-12 h-12 rounded-full border border-zinc-700 mx-auto mb-2 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1594824813583-39d73cb292a8?w=200&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Clínica" />
              </div>
              <p className="text-[11px] font-serif text-center text-zinc-100">Dra. Estética Facial</p>
              <span className="text-[8px] text-zinc-400 text-center mb-3">Harmonização & Skin</span>
              <div className="space-y-1.5 mt-auto">
                <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[8px] text-zinc-300">✦ Antes & Depois (Ver)</div>
                <div className="py-1.5 rounded-lg bg-[#E2B857] text-[9px] font-bold text-center text-black">Consultar Vagas</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroLuxuryResponsive;


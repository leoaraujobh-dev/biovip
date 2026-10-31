/**
 * Gerador de Propostas Comerciais Personalizadas para Prospecção no WhatsApp (BioVip Studio)
 * Personaliza dinamicamente a mensagem com base no perfil do cliente, nicho, link temporário,
 * situação atual do Instagram (link direto wa.me, sem link, linktree) e benefícios do serviço.
 */

export type ProspectSituation = 'wa_direto' | 'sem_link' | 'linktree' | 'primeiro_contato';

export interface ProspectProposalOptions {
  clientName: string;
  niche?: string;
  instagram?: string;
  subdomain: string;
  demoDurationDays?: number;
  proposalValue?: string | number;
  situation: ProspectSituation;
  baseDomain?: string;
  agencyPhone?: string;
}

export function formatCleanInstagram(raw?: string): string {
  if (!raw) return '';
  const clean = raw.trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/[@\/]/g, '');
  return clean;
}

export function generateProspectProposalMessage(opts: ProspectProposalOptions): string {
  const name = (opts.clientName || 'Cliente').trim();
  const rawSub = (opts.subdomain || 'demo').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
  const baseDomain = (opts.baseDomain || 'biovip.com.br').toLowerCase();
  const demoUrl = `https://${baseDomain}/${rawSub}`;
  const days = opts.demoDurationDays || 7;
  const value = opts.proposalValue || '197,00';
  const insta = formatCleanInstagram(opts.instagram);
  const instaMention = insta ? `@${insta}` : 'seu perfil';
  const nicheLabel = (opts.niche || 'sua área').trim();

  if (opts.situation === 'wa_direto') {
    return [
      `Olá, ${name}! Tudo bem? 🌟`,
      ``,
      `Estive acompanhando seu trabalho no Instagram (${instaMention}) e achei impecável a qualidade dos seus atendimentos!`,
      ``,
      `Notei um detalhe importante: no link da sua bio está apenas o *link direto do WhatsApp* (wa.me).`,
      ``,
      `Hoje em dia, usar apenas o link direto do WhatsApp faz você perder muitos clientes e pacientes qualificados todos os dias:`,
      `❌ As pessoas não conseguem ver seus procedimentos com fotos profissionais, valores de referência ou diferenciais antes de te chamar;`,
      `❌ Você acaba perdendo horas respondendo curiosos que só entram para perguntar "qual o valor?" e somem;`,
      `❌ Não transmite toda a autoridade e o luxo que o seu trabalho realmente merece.`,
      ``,
      `Pensando nisso, tomei a liberdade de preparar um presente exclusivo para você: montei uma versão demonstrativa do seu novo *Microsite BioVip de Alta Conversão*, 100% personalizada para o seu negócio:`,
      ``,
      `👉 *Toque aqui para ver a sua prévia VIP:*`,
      `${demoUrl}`,
      ``,
      `Veja os benefícios que já deixei prontos para você:`,
      `💎 *Posicionamento de Alto Padrão:* Design premium exclusivo que valoriza o seu serviço e justifica cobrar mais caro.`,
      `📸 *Catálogo Interativo de Procedimentos:* Apresenta seus serviços com fotos em alta definição, descrições claras e estimativas, para o cliente já chegar decidido.`,
      `🛡️ *Filtro Anti-Curiosos Inteligente:* Triagem antes do WhatsApp — elimina quem só quer especular preço e economiza seu tempo de atendimento.`,
      `📍 *Localização com 1 Toque:* Botão direto para rota no Waze e Google Maps até seu consultório/estúdio.`,
      `⚡ *Velocidade Ultrarrápida no Celular:* Carregamento instantâneo que não perde visitantes com conexões 4G.`,
      ``,
      `Deixei esse link ativo por *${days} dias* para você testar, navegar e ver como funciona na prática.`,
      ``,
      `Se você gostar e quiser oficializar como seu link principal na bio, a ativação completa com personalização final sai por apenas *R$ ${value}* (com o 1º mês de manutenção e suporte 100% grátis).`,
      ``,
      `Dá uma olhada no link acima e me conta o que achou! Ficou maravilhoso ✨`,
    ].join('\n');
  }

  if (opts.situation === 'sem_link') {
    return [
      `Olá, ${name}! Tudo bem? 🌟`,
      ``,
      `Estive visitando o seu perfil no Instagram (${instaMention}) e fiquei muito impressionado(a) com a excelência do seu trabalho em ${nicheLabel}!`,
      ``,
      `Percebi que você ainda *não tem um link oficial na sua bio* para direcionar os seguidores para agendamentos.`,
      ``,
      `Sem um link profissional, você acaba perdendo dezenas de clientes todos os meses que entram no seu perfil querendo agendar, mas não encontram um caminho fácil e profissional para falar com você.`,
      ``,
      `Para te ajudar a profissionalizar de vez a sua presença digital e multiplicar seus agendamentos, preparei uma versão demonstrativa do seu *Microsite BioVip de Luxo*:`,
      ``,
      `👉 *Veja como ficou a sua página exclusiva:*`,
      `${demoUrl}`,
      ``,
      `Principais benefícios para o seu negócio:`,
      `💎 *Autoridade Imediata:* Transforma visitantes comuns do Instagram em clientes particulares de alto padrão.`,
      `📸 *Catálogo Visual dos Serviços:* Seus procedimentos explicados com fotos reais e clareza.`,
      `🛡️ *Triagem Anti-Curiosos:* Filtra especuladores e economiza horas do seu atendimento diário.`,
      `📍 *Rota no GPS (Waze & Maps):* Leva clientes direto para o seu espaço físico com 1 clique.`,
      `⚡ *Pronto em 24h:* Sem nenhuma dor de cabeça com tecnologia ou códigos.`,
      ``,
      `Deixei a sua demonstração ativa por *${days} dias* para você navegar à vontade.`,
      ``,
      `Para ativar em definitivo e colocar na sua bio, o investimento promocional é de apenas *R$ ${value}* no primeiro mês.`,
      ``,
      `Acesse o link acima e me diga o que achou da sua nova vitrine! ✨`,
    ].join('\n');
  }

  if (opts.situation === 'linktree') {
    return [
      `Olá, ${name}! Tudo bem? 🌟`,
      ``,
      `Estive acompanhando seu perfil no Instagram (${instaMention}) e parabéns pela qualidade e pelo excelente trabalho em ${nicheLabel}!`,
      ``,
      `Notei que no link da sua bio você ainda utiliza um *agregador genérico gratuito* (tipo Linktree).`,
      ``,
      `O problema desse tipo de link é que ele passa uma imagem amadora, demora para carregar no 4G, exibe menus cinzas sem autoridade e muitas vezes confunde o cliente em vez de fechar o agendamento.`,
      ``,
      `Para elevar a percepção de valor dos seus serviços ao nível de luxo que você merece, montei para você uma demonstração do *Microsite BioVip de Alta Conversão*:`,
      ``,
      `👉 *Acesse sua demonstração exclusiva aqui:*`,
      `${demoUrl}`,
      ``,
      `Vantagens imediatas em relação a links genéricos:`,
      `💎 *Design Sofisticado e Exclusivo:* Nada de botões cinzas; seu cliente sente que está entrando em um consultório ou boutique VIP.`,
      `📸 *Catálogo de Serviços Integrado:* Mostra seus procedimentos com fotos em alta definição e valores de referência.`,
      `🛡️ *Funil Anti-Curiosos:* Qualifica o contato antes dele mandar mensagem no seu WhatsApp.`,
      `📍 *Integração GPS (Waze & Maps):* Rota rápida para o seu endereço comercial.`,
      `⚡ *Taxa de Conversão até 3x Maior:* Menos cliques perdidos e muito mais agendamentos confirmados.`,
      ``,
      `Esse link exclusivo fica disponível por *${days} dias* para você avaliar com calma.`,
      ``,
      `Para mantermos no ar como seu link oficial, a taxa de ativação é de apenas *R$ ${value}* (com o 1º mês de manutenção e suporte 100% grátis).`,
      ``,
      `Me avise o que achou ao navegar pelo link! ✨`,
    ].join('\n');
  }

  // primeiro_contato / geral
  return [
    `Olá, ${name}! Tudo bem? 🌟`,
    ``,
    `Acompanhei seu trabalho em ${nicheLabel} através do Instagram (${instaMention}) e vi que você tem um potencial gigante para atrair mais clientes pagantes todos os dias.`,
    ``,
    `Preparei para você uma demonstração exclusiva de um *Microsite BioVip de Alta Conversão*, desenhado para transformar visitantes do seu perfil em agendamentos no WhatsApp:`,
    ``,
    `👉 *Veja a sua demonstração VIP pronta aqui:*`,
    `${demoUrl}`,
    ``,
    `Diferenciais inclusos na sua página:`,
    `💎 *Posicionamento de Luxo e Autoridade Máxima*`,
    `📸 *Catálogo Interativo de Procedimentos com Fotos*`,
    `🛡️ *Filtro Anti-Curiosos para poupar seu tempo no WhatsApp*`,
    `📍 *Botão direto de Rota GPS no Waze e Google Maps*`,
    `⚡ *Velocidade Ultrarrápida e Otimização para Celular*`,
    ``,
    `Seu link de teste fica ativo por *${days} dias*. Para oficializar na sua bio, o investimento promocional de lançamento é de apenas *R$ ${value}*.`,
    ``,
    `Dá uma navegada no link acima e me conta o que achou! ✨`,
  ].join('\n');
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  content: string
  result?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'carolina-freitas',
    name: 'Carolina Freitas',
    role: 'Médica Nutróloga',
    avatar: '/images/partners/carolina-freitas.webp',
    content: 'A gente usava o link do WhatsApp direto na bio, os clientes ficavam perguntando muito sobre localização e tratamentos. Hoje com o BioVip, tudo ficou cristalino e os pacientes já chegam decididos a agendar.',
    result: '+32% agendamentos no primeiro mês',
  },
  {
    id: 'ana-freire',
    name: 'Dra. Ana Freire',
    role: 'Odontologia Estética',
    avatar: '/images/partners/ana-freire.webp',
    content: 'O BioVip trouxe um nível de sofisticação que nenhuma outra ferramenta entrega. Os pacientes elogiam o design, veem os casos de lentes e o WhatsApp toca com pessoas qualificadas prontas para o plano de tratamento.',
    result: '33.8% taxa de conversão em pacientes',
  },
  {
    id: 'iris-makeup',
    name: 'Íris Makeup',
    role: 'Makeup Artist & Hair',
    avatar: '/images/partners/iris-makeup.webp',
    content: 'Antes eu perdia noivas porque o link não mostrava meu portfólio direito. No BioVip, elas veem a página de antes e depois com slider e a tabela de produções. Fechei 4 contratos no primeiro mês.',
    result: '4 noivas fechadas no mês 1',
  },
  {
    id: 'x5-veiculos',
    name: 'X5 Veículos Premium',
    role: 'Concessionária Boutique',
    avatar: '/images/partners/x5-veiculos.webp',
    content: 'Apresentar nosso estoque pelo BioVip mudou o jogo. O cliente já chega sabendo o modelo e as condições. Aumentamos em 40% o contato direto com nossos consultores.',
    result: '+40% conversão de compradores',
  },
  {
    id: 'daniela-mendes',
    name: 'Daniela Mendes',
    role: 'Consultoria Empresarial',
    avatar: '/images/partners/daniela-mendes.webp',
    content: 'Vender consultorias pelo Instagram era cansativo. O BioVip organizou minha autoridade: credenciais, cases de sucesso e agenda online. Minha conversão de reuniões qualificadas subiu para 41%.',
    result: '41% conversão lead → reunião',
  },
  {
    id: 'yngrid-santos',
    name: 'Yngrid Santos',
    role: 'Influenciadora & Criadora',
    avatar: '/images/partners/yngrid-santos.webp',
    content: 'Marcas pediam mídia kit e números e eu mandava PDF pesado. Agora mando meu link BioVip com tudo integrado. Fechei campanhas de alto valor pela seriedade e beleza da página.',
    result: '3 contratos premium fechados',
  },
]

export interface Partner {
  id: string
  name: string
  avatar: string
  role: string
}

export const partners: Partner[] = [
  { id: 'ana-freire', name: 'Dra. Ana Freire', avatar: '/images/partners/ana-freire.webp', role: 'Odontologia Estética' },
  { id: 'carolina-freitas', name: 'Dra. Carolina Freitas', avatar: '/images/partners/carolina-freitas.webp', role: 'Médica Nutróloga' },
  { id: 'iris-makeup', name: 'Íris Makeup', avatar: '/images/partners/iris-makeup.webp', role: 'Makeup Artist' },
  { id: 'sarah-cakes', name: 'Sarah Cakes', avatar: '/images/partners/sarah-cakes.webp', role: 'Doces e Bolos' },
  { id: 'x5-veiculos', name: 'X5 Veículos', avatar: '/images/partners/x5-veiculos.webp', role: 'Concessionária' },
  { id: 'evs-minis', name: 'EVS Minis', avatar: '/images/partners/evs-minis.webp', role: 'Miniaturas e Colecionáveis' },
  { id: 'quintal-do-caldinho', name: 'Quintal do Caldinho', avatar: '/images/partners/quintal-do-caldinho.webp', role: 'Bar e Delivery' },
  { id: 'noticias-maromba', name: 'Notícias Maromba', avatar: '/images/partners/noticias-maromba.webp', role: 'Canal de Conteúdo' },
  { id: 'yngrid-santos', name: 'Yngrid Santos', avatar: '/images/partners/yngrid-santos.webp', role: 'Modelo & Influenciadora' },
  { id: 'daniela-mendes', name: 'Daniela Mendes', avatar: '/images/partners/daniela-mendes.webp', role: 'Consultoria & Mentoria' },
  { id: 'renato-andrade', name: 'Renato Andrade', avatar: '/images/partners/renato-andrade.webp', role: 'Advocacia' },
  { id: 'fisio-pelvica', name: 'Fisioterapia Pélvica', avatar: '/images/partners/fisio-pelvica.webp', role: 'Saúde Íntima' },
  { id: 'yngrid-esteta', name: 'Yngrid Santos · Clínica', avatar: '/images/partners/yngrid-esteta.webp', role: 'Farmacêutica Esteta' },
  { id: 'manu-carneiro', name: 'Manu Carneiro', avatar: '/images/partners/manu-carneiro.webp', role: 'Modelo & Influenciadora' },
]
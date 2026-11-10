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
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    content: 'A gente usava o link do WhatsApp direto na bio, os clientes ficavam perguntando muito sobre localização e tratamentos. Hoje com o BioVip, tudo ficou cristalino e os pacientes já chegam decididos a agendar.',
    result: '+32% agendamentos no primeiro mês',
  },
  {
    id: 'ana-freire',
    name: 'Dra. Ana Freire',
    role: 'Odontologia Estética',
    avatar: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
    content: 'O BioVip trouxe um nível de sofisticação que nenhuma outra ferramenta entrega. Os pacientes elogiam o design, veem os casos de lentes e o WhatsApp toca com pessoas qualificadas prontas para o plano de tratamento.',
    result: '33.8% taxa de conversão em pacientes',
  },
  {
    id: 'iris-makeup',
    name: 'Íris Makeup',
    role: 'Makeup Artist & Hair',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    content: 'Antes eu perdia noivas porque o link não mostrava meu portfólio direito. No BioVip, elas veem a página de antes e depois com slider e a tabela de produções. Fechei 4 contratos no primeiro mês.',
    result: '4 noivas fechadas no mês 1',
  },
  {
    id: 'x5-veiculos',
    name: 'X5 Veículos Premium',
    role: 'Concessionária Boutique',
    avatar: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
    content: 'Apresentar nosso estoque pelo BioVip mudou o jogo. O cliente já chega sabendo o modelo e as condições. Aumentamos em 40% o contato direto com nossos consultores.',
    result: '+40% conversão de compradores',
  },
  {
    id: 'daniela-mendes',
    name: 'Daniela Mendes',
    role: 'Consultoria Empresarial',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    content: 'Vender consultorias pelo Instagram era cansativo. O BioVip organizou minha autoridade: credenciais, cases de sucesso e agenda online. Minha conversão de reuniões qualificadas subiu para 41%.',
    result: '41% conversão lead → reunião',
  },
  {
    id: 'yngrid-santos',
    name: 'Yngrid Santos',
    role: 'Influenciadora & Criadora',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
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
  { id: 'ana-freire', name: 'Dra. Ana Freire', avatar: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80', role: 'Odontologia Estética' },
  { id: 'carolina-freitas', name: 'Dra. Carolina Freitas', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80', role: 'Médica Nutróloga' },
  { id: 'iris-makeup', name: 'Íris Makeup', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', role: 'Makeup Artist' },
  { id: 'sarah-cakes', name: 'Sarah Cakes', avatar: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80', role: 'Doces e Bolos' },
  { id: 'x5-veiculos', name: 'X5 Veículos', avatar: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', role: 'Concessionária' },
  { id: 'evs-minis', name: 'EVS Minis', avatar: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=400&q=80', role: 'Miniaturas e Colecionáveis' },
  { id: 'quintal-do-caldinho', name: 'Quintal do Caldinho', avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80', role: 'Bar e Delivery' },
  { id: 'noticias-maromba', name: 'Notícias Maromba', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80', role: 'Canal de Conteúdo' },
  { id: 'yngrid-santos', name: 'Yngrid Santos', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', role: 'Modelo & Influenciadora' },
  { id: 'daniela-mendes', name: 'Daniela Mendes', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', role: 'Consultoria & Mentoria' },
  { id: 'renato-andrade', name: 'Renato Andrade', avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80', role: 'Advocacia' },
  { id: 'fisio-pelvica', name: 'Fisioterapia Pélvica', avatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80', role: 'Saúde Íntima' },
  { id: 'yngrid-esteta', name: 'Yngrid Santos · Clínica', avatar: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80', role: 'Farmacêutica Esteta' },
  { id: 'manu-carneiro', name: 'Manu Carneiro', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', role: 'Modelo & Influenciadora' },
]

export interface PageTemplate {
  id: string
  title: string
  category: 'para_voce' | 'fotos' | 'videos' | 'cardapio' | 'catalogo' | 'vender' | 'sobre'
  categories: string[]
  description: string
  idealFor: string
  features: string[]
  defaultSlug: string
  previewType: 'services' | 'before_after' | 'booking' | 'reviews' | 'editorial_gallery' | 'photo_album' | 'cinema_gallery' | 'video_showcase' | 'video_gallery' | 'video_featured' | 'menu_digital' | 'delivery' | 'catalog_products' | 'plans_packages'
}

export const CATEGORY_TABS = [
  { id: 'para_voce', label: 'Para você', count: 5, note: 'Os modelos que mais combinam com o seu segmento e público.' },
  { id: 'fotos', label: 'Fotos e portfólio', count: 4, note: 'Para mostrar fotos: galerias, álbuns, portfólio e antes e depois.' },
  { id: 'videos', label: 'Vídeos', count: 3, note: 'Para mostrar o que só o vídeo mostra: aula, depoimento, bastidor, Reels.' },
  { id: 'cardapio', label: 'Cardápio', count: 2, note: 'Para quem vende comida e recebe pedidos pelo WhatsApp.' },
  { id: 'catalogo', label: 'Catálogo e serviços', count: 4, note: 'Para produtos e serviços com preço, foto e contato.' },
  { id: 'vender', label: 'Vender e converter', count: 7, note: 'Focado em conversão: página de venda, checkout, ofertas e captação.' },
  { id: 'sobre', label: 'Sobre você', count: 3, note: 'Sua história, formação, equipe, clínica e espaço de atendimento.' }
]

export const PAGE_TEMPLATES: PageTemplate[] = [
  // 1. SERVIÇOS E PREÇOS
  {
    id: 'servicos-precos',
    title: 'Serviços e Preços',
    category: 'para_voce',
    categories: ['para_voce', 'catalogo', 'vender'],
    description: 'Tabela de preços, com agendamento opcional: o cliente compara os valores, escolhe os serviços e marca o horário.',
    idealFor: 'quem publica preço: barbearia, salão, estética, tatuagem e estúdio.',
    features: [
      'Agenda com horários livres',
      'Escolha do profissional, com folga por pessoa',
      'Preço alinhado para comparar',
      '"A partir de" quando o valor varia',
      'Pedido pronto no WhatsApp'
    ],
    defaultSlug: 'servicos',
    previewType: 'services'
  },

  // 2. ANTES E DEPOIS
  {
    id: 'antes-e-depois',
    title: 'Antes e Depois',
    category: 'para_voce',
    categories: ['para_voce', 'fotos'],
    description: 'Arrastador lado a lado, com uma alça que a pessoa arrasta para comparar o resultado e o argumento.',
    idealFor: 'estética, odontologia, harmonização, micropigmentação e arquitetura.',
    features: [
      'Comparativo arrastável',
      'Antes/depois lado a lado',
      'Explicação do resultado',
      'Botão no rodapé para agendar'
    ],
    defaultSlug: 'resultados',
    previewType: 'before_after'
  },

  // 3. AGENDA
  {
    id: 'agenda',
    title: 'Agenda',
    category: 'para_voce',
    categories: ['para_voce', 'catalogo'],
    description: 'Só a agenda, sem tabela de preços: o cliente vê os horários livres, escolhe e marca — e o horário sai da lista na hora.',
    idealFor: 'quem não publica valor: psicólogo, advogado, fisioterapeuta, nutricionista, personal e professor particular.',
    features: [
      'Horários livres calculados no servidor',
      'Confirmação opcional: você aceita ou recusa',
      'Escolha do profissional, com folga por pessoa',
      'Bloqueio de almoço e folga pelo painel',
      'Preço opcional, para quem não quer publicar valor'
    ],
    defaultSlug: 'agendamento',
    previewType: 'booking'
  },

  // 4. AVALIAÇÕES
  {
    id: 'avaliacoes',
    title: 'Avaliações',
    category: 'para_voce',
    categories: ['para_voce', 'vender', 'sobre'],
    description: 'Depoimentos com estrelas, nome e foto — e seu botão para quem quiser deixar a sua no Google.',
    idealFor: 'qualquer negócio que já tem cliente satisfeito e quer conversão com prova social.',
    features: [
      'Métricas por avaliação',
      'Nota média em destaque',
      'Foto e detalhes de quem avaliou',
      'Botão para avaliar no Google ou no Instagram',
      'Notificação automática a cada depoimento'
    ],
    defaultSlug: 'depoimentos',
    previewType: 'reviews'
  },

  // 5. GALERIA EDITORIAL
  {
    id: 'galeria-editorial',
    title: 'Galeria Editorial',
    category: 'para_voce',
    categories: ['para_voce', 'fotos'],
    description: 'Mosaico de alturas variadas, como portfólio de revista: fotos de destaque ocupam a largura inteira.',
    idealFor: 'fotografia, arquitetura, moda/vestuário e criativos que vendem pelo olhar.',
    features: [
      'Mosaico editorial de alta resolução',
      'Filtro por categoria',
      'Foto de destaque com título',
      'Não distorce proporção das fotos'
    ],
    defaultSlug: 'galeria',
    previewType: 'editorial_gallery'
  },

  // 6. ÁLBUM FOTOGRÁFICO
  {
    id: 'album-fotografico',
    title: 'Álbum Fotográfico',
    category: 'fotos',
    categories: ['fotos'],
    description: 'Galeria organizada por categorias, com legenda em cada foto. O trabalho aparece antes do texto.',
    idealFor: 'fotógrafo, maquiadora, cerimonial e quem vive pelo que já fez.',
    features: [
      'Categorias em abas',
      'Legendas detalhadas',
      'Zoom e lightbox em alta resolução',
      'Botão de orçamento abaixo da foto'
    ],
    defaultSlug: 'portfolio',
    previewType: 'photo_album'
  },

  // 7. GALERIA CINEMA
  {
    id: 'galeria-cinema',
    title: 'Galeria Cinema',
    category: 'fotos',
    categories: ['fotos'],
    description: 'Uma foto por vez, grande, com miniaturas embaixo. Quem entra assiste em vez de navegar.',
    idealFor: 'quem tem poucas fotos excelentes: fotografia autoral, cinema, projeto de arquitetura.',
    features: [
      'Foto em destaque panorâmica',
      'Miniaturas com navegação rápida',
      'Animação de transição suave',
      'Filtro por categoria'
    ],
    defaultSlug: 'cinema',
    previewType: 'cinema_gallery'
  },

  // 8. VITRINE DE VÍDEOS
  {
    id: 'vitrine-videos',
    title: 'Vitrine de Vídeos',
    category: 'videos',
    categories: ['videos'],
    description: 'Um vídeo por vez, largura inteira, passando sozinho. Para poucos vídeos que precisam ser vistos.',
    idealFor: 'depoimento de cliente, apresentação do espaço e antes e depois em movimento.',
    features: [
      'Passa sozinho ou pausado',
      'Link do YouTube ou arquivo direto',
      'GIF também suportado',
      'Fácil de passar no toque do dedo'
    ],
    defaultSlug: 'videos',
    previewType: 'video_showcase'
  },

  // 9. GALERIA DE VÍDEOS
  {
    id: 'galeria-videos',
    title: 'Galeria de Vídeos',
    category: 'videos',
    categories: ['videos'],
    description: 'Grade de duas colunas com miniatura e título. Para quem tem muitos vídeos e quer deixar escolher.',
    idealFor: 'aulas, receitas, cortes de podcast e acervo de depoimentos.',
    features: [
      'Duas colunas responsivas',
      'Seções com filtro no topo',
      'Link do YouTube ou arquivo',
      'Só carrega ao tocar (super leve)'
    ],
    defaultSlug: 'aulas',
    previewType: 'video_gallery'
  },

  // 10. VÍDEOS EM DESTAQUE
  {
    id: 'videos-destaque',
    title: 'Vídeos em Destaque',
    category: 'videos',
    categories: ['videos'],
    description: 'Um embaixo do outro, em pé, do tamanho da tela. Para quem grava para o Reels e o TikTok.',
    idealFor: 'quem já produz vídeo vertical e quer reunir os melhores num link só.',
    features: [
      'Formato 9:16 vertical de celular',
      'Rola suave como no Instagram Reels',
      'Etiqueta com "comece por aqui"',
      'Link ou player direto'
    ],
    defaultSlug: 'reels',
    previewType: 'video_featured'
  },

  // 11. CARDÁPIO DIGITAL
  {
    id: 'cardapio-digital',
    title: 'Cardápio Digital',
    category: 'cardapio',
    categories: ['cardapio', 'catalogo'],
    description: 'A vitrine: fotos, preços e seções. Só mostra — quem fecha pedido é o Delivery.',
    idealFor: 'quem atende no balcão ou na mesa e só quer apresentar o cardápio plastificado.',
    features: [
      'Seções por categoria (entradas, pratos, bebidas)',
      'Fotos e preços organizados',
      'Preço promocional destacado',
      'Horário de funcionamento em tempo real'
    ],
    defaultSlug: 'cardapio',
    previewType: 'menu_digital'
  },

  // 12. DELIVERY
  {
    id: 'delivery',
    title: 'Delivery',
    category: 'cardapio',
    categories: ['cardapio', 'vender'],
    description: 'O cardápio que fecha pedido: o cliente monta, o sistema soma e a nota chega pronta no seu WhatsApp.',
    idealFor: 'quem entrega: caldinhos, lanches, marmitas, doces sob encomenda.',
    features: [
      'Carrinho com cálculo total automático',
      'Sabores e acompanhamentos opcionais',
      'Entrega ou retirada no balcão',
      'Nota pronta formatada enviada ao WhatsApp'
    ],
    defaultSlug: 'pedidos',
    previewType: 'delivery'
  },

  // 13. CATÁLOGO DE PRODUTOS
  {
    id: 'catalogo-produtos',
    title: 'Catálogo de Produtos',
    category: 'catalogo',
    categories: ['catalogo', 'vender'],
    description: 'Grade de duas colunas com foto, preço e etiqueta. Tocar na peça abre o WhatsApp com o nome dela escrito.',
    idealFor: 'semijoias, roupas, artesanato, móveis, brechó e encomendas.',
    features: [
      'Grade com foto grande e nítida',
      'Etiqueta de novidade e destaque',
      'Preço promocional "de / por"',
      'Toque abre o WhatsApp com o produto especificado'
    ],
    defaultSlug: 'catalogo',
    previewType: 'catalog_products'
  },

  // 14. PLANOS E PACOTES
  {
    id: 'planos-pacotes',
    title: 'Planos e Pacotes',
    category: 'catalogo',
    categories: ['catalogo', 'vender'],
    description: 'Cartões com preço, o que cada plano inclui e um botão por plano — com selo de destaque em um deles.',
    idealFor: 'mensalidade, assinatura, pacote de sessões, consultoria e serviço vendido por escopo.',
    features: [
      'Um cartão por plano, com o que inclui',
      'Selo e destaque em um deles (Mais Escolhido)',
      'Preço mensal e economia no anual',
      'Link direto para fechar ou agendar'
    ],
    defaultSlug: 'planos',
    previewType: 'plans_packages'
  }
]


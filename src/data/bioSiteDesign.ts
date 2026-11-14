export const DEMO_PHOTOS = {
  mulher: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
  homem: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85'
}

export const PHOTO_LAYOUTS = [
  { id: 'retrato_redondo', name: 'Retrato redondo', desc: 'Foto no círculo, acima do nome. Pede rosto centralizado.' },
  { id: 'retrato_quadrado', name: 'Retrato quadrado', desc: 'Canto suave em vez de círculo. Mais firme, menos clássico.' },
  { id: 'faixa', name: 'Faixa', desc: 'Foto larga atravessando o topo, como capa. Bom para ambiente.' },
  { id: 'foto_inteira', name: 'Foto inteira', desc: 'Ocupa o topo e dissolve no fundo. Melhor com PNG sem fundo.' },
  { id: 'logo_transparente', name: 'Logo transparente', desc: 'Para PNG recortado ou SVG: a logo flutua direto sobre o fundo.' },
  { id: 'logo_circulo', name: 'Logo no círculo', desc: 'Para logo com fundo próprio: entra num círculo, como o retrato.' },
  { id: 'so_tipografia', name: 'Só tipografia', desc: 'Sem foto nem logo. Resolve quando não existe imagem boa.' }
]

export const PALETTES = [
  {
    id: 'luxo_nude',
    name: 'Luxo nude',
    desc: 'Preto quente com dourado suave. Estética, beleza, odontologia.',
    bg: '#141210',
    card: '#221e1a',
    button: '#d4b996',
    buttonText: '#141210',
    text: '#ffffff',
    accent: '#d4b996',
    swatches: ['#141210', '#d4b996', '#f5eee6']
  },
  {
    id: 'editorial_claro',
    name: 'Editorial claro',
    desc: 'Marfim e grafite. Arquitetura, consultoria, advocacia.',
    bg: '#f7f4ee',
    card: '#ffffff',
    button: '#e8dfd1',
    buttonText: '#262422',
    text: '#262422',
    accent: '#826548',
    swatches: ['#f7f4ee', '#826548', '#262422']
  },
  {
    id: 'clinico_sereno',
    name: 'Clínico sereno',
    desc: 'Branco com verde-sálvia. Saúde, nutrição, fisioterapia.',
    bg: '#f8faf9',
    card: '#ffffff',
    button: '#5b8271',
    buttonText: '#ffffff',
    text: '#1a2e26',
    accent: '#5b8271',
    swatches: ['#ffffff', '#5b8271', '#1a2e26']
  },
  {
    id: 'noturno_vibrante',
    name: 'Noturno vibrante',
    desc: 'Grafite com acento saturado. Performance, tecnologia, música.',
    bg: '#0f1115',
    card: '#1b1e26',
    button: '#34d399',
    buttonText: '#0f1115',
    text: '#ffffff',
    accent: '#34d399',
    swatches: ['#0f1115', '#34d399', '#f3f4f6']
  },
  {
    id: 'terroso_artesanal',
    name: 'Terroso artesanal',
    desc: 'Areia, ocre e oliva. Gastronomia, artesanato, turismo.',
    bg: '#1c1815',
    card: '#2a241f',
    button: '#c29b68',
    buttonText: '#1c1815',
    text: '#ffffff',
    accent: '#c29b68',
    swatches: ['#1c1815', '#c29b68', '#f2eadf']
  },
  {
    id: 'alto_contraste',
    name: 'Alto contraste',
    desc: 'Preto e branco puros, um acento só. Moda, veículos, esporte.',
    bg: '#0a0a0a',
    card: '#171717',
    button: '#eab308',
    buttonText: '#0a0a0a',
    text: '#ffffff',
    accent: '#eab308',
    swatches: ['#0a0a0a', '#eab308', '#ffffff']
  },
  {
    id: 'esmeralda_nobre',
    name: 'Esmeralda Nobre',
    desc: 'Verde esmeralda profundo com ouro real. Saúde integrativa e clínicas VIP.',
    bg: '#071811',
    card: '#0f291e',
    button: '#d4af37',
    buttonText: '#071811',
    text: '#ffffff',
    accent: '#d4af37',
    swatches: ['#071811', '#d4af37', '#22c55e']
  },
  {
    id: 'bordeaux_imperial',
    name: 'Bordeaux Imperial',
    desc: 'Vinho bordeaux requintado com champanhe. Estética facial e dermatologia.',
    bg: '#18090f',
    card: '#29111b',
    button: '#e2ba86',
    buttonText: '#18090f',
    text: '#ffffff',
    accent: '#e2ba86',
    swatches: ['#18090f', '#e2ba86', '#fb7185']
  },
  {
    id: 'safira_noir',
    name: 'Safira Abissal',
    desc: 'Azul marinho noturno com ciano refinado. Tecnologia e consultoria.',
    bg: '#070d19',
    card: '#0f172a',
    button: '#38bdf8',
    buttonText: '#070d19',
    text: '#ffffff',
    accent: '#38bdf8',
    swatches: ['#070d19', '#38bdf8', '#e2e8f0']
  },
  {
    id: 'champagne_gold',
    name: 'Champagne & Gold',
    desc: 'Marfim aquecido com detalhes em bronze ouro. Joalheria e moda noiva.',
    bg: '#fcfaf6',
    card: '#ffffff',
    button: '#c59b6d',
    buttonText: '#ffffff',
    text: '#221e1a',
    accent: '#c59b6d',
    swatches: ['#fcfaf6', '#c59b6d', '#221e1a']
  },
  {
    id: 'terracota_mediterraneo',
    name: 'Terracota & Argila',
    desc: 'Tom terroso nobre e acolhedor. Gastronomia autoral e bem-estar.',
    bg: '#1c100e',
    card: '#2e1b17',
    button: '#e07a5f',
    buttonText: '#ffffff',
    text: '#ffffff',
    accent: '#e07a5f',
    swatches: ['#1c100e', '#e07a5f', '#f4f1de']
  },
  {
    id: 'monocromo_grafite',
    name: 'Titânio Minimalista',
    desc: 'Grafite acetinado e titânio puro. Arquitetura moderna e design.',
    bg: '#121214',
    card: '#1e1e24',
    button: '#e4e4e7',
    buttonText: '#121214',
    text: '#ffffff',
    accent: '#a1a1aa',
    swatches: ['#121214', '#e4e4e7', '#71717a']
  },
  // 10 TEMAS OFICIAIS BIOVIP STUDIO PRO
  {
    id: 'roseGoldQuartz',
    name: 'Rosé Gold, Nude & Quartzo',
    desc: 'Tons refinados de rosé gold e quartzo. Beleza, cílios, unhas e estética.',
    bg: '#181216',
    card: '#241a22',
    button: '#f472b6',
    buttonText: '#181216',
    text: '#fdf2f8',
    accent: '#f472b6',
    swatches: ['#181216', '#f472b6', '#fbcfe8']
  },
  {
    id: 'royalAmethyst',
    name: 'Ametista Imperial, Púrpura & Ouro',
    desc: 'Púrpura imperial com detalhes em ouro. Harmonização orofacial e estética avançada.',
    bg: '#140c1b',
    card: '#22142e',
    button: '#c084fc',
    buttonText: '#140c1b',
    text: '#faf5ff',
    accent: '#d4af37',
    swatches: ['#140c1b', '#c084fc', '#d4af37']
  },
  {
    id: 'tiffanyDiamond',
    name: 'Verde Tiffany & Diamante',
    desc: 'Verde tiffany e toques de diamante. Odontologia estética, joalherias e luxo contemporâneo.',
    bg: '#081716',
    card: '#0e2624',
    button: '#2dd4bf',
    buttonText: '#081716',
    text: '#f0fdfa',
    accent: '#2dd4bf',
    swatches: ['#081716', '#2dd4bf', '#ccfbf1']
  },
  {
    id: 'nobleOlive',
    name: 'Oliva Nobre & Ouro Escovado',
    desc: 'Verde oliva clássico com ouro escovado. Spas botânicos, cafés e gastronomia orgânica.',
    bg: '#12160f',
    card: '#1c2217',
    button: '#a3b18a',
    buttonText: '#12160f',
    text: '#f4f6f0',
    accent: '#d4af37',
    swatches: ['#12160f', '#a3b18a', '#d4af37']
  },
  {
    id: 'blackCherryGold',
    name: 'Black Cherry & Ouro',
    desc: 'Cereja escura misteriosa com dourado. Nail designers high-ticket e salões de luxo.',
    bg: '#18070d',
    card: '#290c17',
    button: '#fb7185',
    buttonText: '#18070d',
    text: '#fff1f2',
    accent: '#f59e0b',
    swatches: ['#18070d', '#fb7185', '#f59e0b']
  },
  {
    id: 'darkGold',
    name: 'Dark Luxury & Ouro Imperial',
    desc: 'Preto nobre com ouro 18k. Clínicas médicas, studios VIP, mentorias e advocacia.',
    bg: '#0d0d0e',
    card: '#18181b',
    button: '#eab308',
    buttonText: '#0d0d0e',
    text: '#ffffff',
    accent: '#eab308',
    swatches: ['#0d0d0e', '#eab308', '#fef08a']
  },
  {
    id: 'navyLaw',
    name: 'Azul Marinho Real & Dourado',
    desc: 'Azul marinho corporativo com detalhes em ouro. Advocacia, contabilidade e consultoria.',
    bg: '#090f1d',
    card: '#111b33',
    button: '#d4af37',
    buttonText: '#090f1d',
    text: '#f8fafc',
    accent: '#38bdf8',
    swatches: ['#090f1d', '#d4af37', '#38bdf8']
  },
  {
    id: 'barberVintage',
    name: 'Dark Barbearia & Âmbar',
    desc: 'Madeira escura e âmbar quente. Barbearias tradicionais e visagismo masculino.',
    bg: '#16110c',
    card: '#241a12',
    button: '#f59e0b',
    buttonText: '#16110c',
    text: '#fef3c7',
    accent: '#f59e0b',
    swatches: ['#16110c', '#f59e0b', '#d97706']
  },
  {
    id: 'stealthTitanium',
    name: 'Stealth Titanium & P&B Puro',
    desc: 'Monocromático de alto contraste. Arquitetura, estúdios de tattoo, fotografia e moda.',
    bg: '#09090b',
    card: '#18181b',
    button: '#ffffff',
    buttonText: '#09090b',
    text: '#ffffff',
    accent: '#a1a1aa',
    swatches: ['#09090b', '#ffffff', '#71717a']
  },
  {
    id: 'pearlChampagne',
    name: 'Pérola, Champanhe & Ouro Clean',
    desc: 'Marfim refinado e champanhe luminoso. Dermatologia clean, odonto e moda noiva.',
    bg: '#faf8f5',
    card: '#ffffff',
    button: '#c59b6d',
    buttonText: '#ffffff',
    text: '#1c1917',
    accent: '#b45309',
    swatches: ['#faf8f5', '#c59b6d', '#1c1917']
  },
  {
    id: 'minha_paleta',
    name: 'Personalizada',
    desc: 'Fundo, cartões, botões, texto e destaques escolhidos por você.',
    bg: '#12151b',
    card: '#1e222b',
    button: '#3b82f6',
    buttonText: '#ffffff',
    text: '#ffffff',
    accent: '#3b82f6',
    swatches: ['#12151b', '#3b82f6', '#f3f4f6']
  }
]

export const BACKGROUND_STYLES = [
  { id: 'solido', name: 'Sólido', desc: 'A cor pura, sem interferência. O mais silencioso.' },
  { id: 'degrade', name: 'Degradê', desc: 'Clareia no topo e fecha embaixo, onde ficam os botões.' },
  { id: 'aura', name: 'Aura', desc: 'Um halo de luz atrás do nome. Bom com foto redonda.' },
  { id: 'textura', name: 'Textura', desc: 'Grão finíssimo e cantos fechados. Sensação de papel.' },
  { id: 'vinheta', name: 'Vinheta', desc: 'Escurece nas bordas e abre no centro. Foco no conteúdo.' },
  { id: 'listras', name: 'Listras', desc: 'Faixas largas e quase invisíveis. Alfaiataria, barbearia.' },
  { id: 'malha', name: 'Malha', desc: 'Grade fina de arquiteto. Ordem sem chamar atenção.' }
]

export interface TypographyItem {
  id: string
  name: string
  desc: string
  cssFont: string
  fontFamily: string
  category: 'serif' | 'sans-serif' | 'cursive'
  uppercase?: boolean
}

export const TYPOGRAPHIES: TypographyItem[] = [
  {
    id: 'instrument',
    name: 'Instrument Serif',
    desc: 'Editorial contemporâneo. O padrão nobre da casa.',
    cssFont: "'Instrument Serif', Georgia, serif",
    fontFamily: "'Instrument Serif', Georgia, serif",
    category: 'serif'
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    desc: 'Clássica e sofisticada. Beleza, estética e alta sociedade.',
    cssFont: "'Playfair Display', Georgia, serif",
    fontFamily: "'Playfair Display', Georgia, serif",
    category: 'serif'
  },
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    desc: 'Delicada e fina. Joalheria, alta costura e moda noiva.',
    cssFont: "'Cormorant Garamond', Garamond, serif",
    fontFamily: "'Cormorant Garamond', Garamond, serif",
    category: 'serif'
  },
  {
    id: 'dm_serif',
    name: 'DM Serif Display',
    desc: 'Serifa firme com alto contraste. Autoridade médica e jurídica.',
    cssFont: "'DM Serif Display', Georgia, serif",
    fontFamily: "'DM Serif Display', Georgia, serif",
    category: 'serif'
  },
  {
    id: 'bodoni',
    name: 'Bodoni Moda',
    desc: 'Luxo de revista internacional. Traço fino e encorpado Vogue.',
    cssFont: "'Bodoni Moda', 'Bodoni MT', Didot, serif",
    fontFamily: "'Bodoni Moda', 'Bodoni MT', Didot, serif",
    category: 'serif'
  },
  {
    id: 'fraunces',
    name: 'Fraunces',
    desc: 'Serifa macia e expressiva. Marcas autorais com personalidade.',
    cssFont: "'Fraunces', serif",
    fontFamily: "'Fraunces', serif",
    category: 'serif'
  },
  {
    id: 'lora',
    name: 'Lora',
    desc: 'Serifada calorosa e acolhedora. Terapias, psicologia e saúde mental.',
    cssFont: "'Lora', Georgia, serif",
    fontFamily: "'Lora', Georgia, serif",
    category: 'serif'
  },
  {
    id: 'marcellus',
    name: 'Marcellus',
    desc: 'Lapidar romana nobre. Advocacia, arquitetura e medicina de elite.',
    cssFont: "'Marcellus', Georgia, serif",
    fontFamily: "'Marcellus', Georgia, serif",
    category: 'serif'
  },
  {
    id: 'italiana',
    name: 'Italiana',
    desc: 'Altíssima e esbelta, estética de atelier milanês.',
    cssFont: "'Italiana', Georgia, serif",
    fontFamily: "'Italiana', Georgia, serif",
    category: 'serif'
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    desc: 'Inscrição monumental clássica. Tradição, patrimônio e direito.',
    cssFont: "'Cinzel', Georgia, serif",
    fontFamily: "'Cinzel', Georgia, serif",
    category: 'serif'
  },
  {
    id: 'jost',
    name: 'Jost',
    desc: 'Geométrica limpa e técnica. Inovação, design e tecnologia.',
    cssFont: "'Jost', system-ui, sans-serif",
    fontFamily: "'Jost', system-ui, sans-serif",
    category: 'sans-serif'
  },
  {
    id: 'outfit',
    name: 'Outfit',
    desc: 'Sem serifa moderna e envolvente. Clínicas e estética jovem.',
    cssFont: "'Outfit', system-ui, sans-serif",
    fontFamily: "'Outfit', system-ui, sans-serif",
    category: 'sans-serif'
  },
  {
    id: 'space_grotesk',
    name: 'Space Grotesk',
    desc: 'Sem serifa técnica de vanguarda. Estúdios criativos e startups.',
    cssFont: "'Space Grotesk', system-ui, sans-serif",
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    category: 'sans-serif'
  },
  {
    id: 'manrope',
    name: 'Manrope',
    desc: 'Sem serifa pura e refinada. Versatilidade para qualquer segmento.',
    cssFont: "'Manrope', system-ui, sans-serif",
    fontFamily: "'Manrope', system-ui, sans-serif",
    category: 'sans-serif'
  },
  {
    id: 'bebas',
    name: 'Bebas Neue',
    desc: 'Condensada de impacto visual máximo. Barbearias, esporte e eventos.',
    cssFont: "'Bebas Neue', sans-serif",
    fontFamily: "'Bebas Neue', sans-serif",
    category: 'sans-serif',
    uppercase: true
  },
  {
    id: 'pinyon',
    name: 'Pinyon Script',
    desc: 'Assinatura caligráfica autoral. Extrema exclusividade.',
    cssFont: "'Pinyon Script', cursive",
    fontFamily: "'Pinyon Script', cursive",
    category: 'cursive'
  }
]

export const BUTTON_STYLES = [
  {
    id: 'cartao_nobre',
    name: 'Cartão Nobre VIP (Assinatura)',
    desc: 'Ícone em caixa nobre, título em caixa alta, subtítulo explicativo e seta de conversão →.',
    badge: '👑 Campeão de Vendas'
  },
  {
    id: 'vidro_glamour',
    name: 'Vidro Translúcido (Glassmorphism)',
    desc: 'Fundo esfumado translúcido com desfoque de fundo (backdrop-blur-md) e borda de cristal.',
    badge: '✨ Alta Tendência'
  },
  {
    id: 'aurora_glow',
    name: 'Aurora Dourada (Borda Iluminada)',
    desc: 'Borda com iluminação contínua nobre e aura radiante pulsante.',
    badge: '🔥 Hipnótico'
  },
  {
    id: 'neomorfico_dark',
    name: 'Neomórfico Luxo (Profundidade 3D)',
    desc: 'Efeito tridimensional entalhado com sombras suaves internas e externas.',
    badge: '💎 Esculpido'
  },
  {
    id: 'shimmer_ouro',
    name: 'Ouro Metálico (Shimmer Contínuo)',
    desc: 'Reflexo de luz líquida contínua cruzando o cartão de ponta a ponta sem parar.',
    badge: '⚡ Máxima Atenção'
  },
  {
    id: 'bicolor_luxo',
    name: 'Bicolor Imperial (Gradiente Nobre)',
    desc: 'Gradiente suave entre tons nobres da paleta com acabamento acetinado.',
    badge: '🍷 Sofisticado'
  },
  {
    id: 'flutuante_elevado',
    name: 'Flutuante 3D (Elevated Soft)',
    desc: 'Elevação pronunciada com sombra profunda e luz superior chanfrada.',
    badge: '📐 Arquitetônico'
  },
  {
    id: 'solido_glam',
    name: 'Sólido Glamour (Alto Contraste)',
    desc: 'Preenchimento cheio na cor de destaque com alto contraste visual.',
    badge: '🎯 Direto ao Ponto'
  },
  {
    id: 'pill_couture',
    name: 'Pill Couture (Cápsula Nobre)',
    desc: 'Formato 100% arredondado em cápsula com ícone destacado e micro-borda.',
    badge: '💊 Clássico Moderno'
  },
  {
    id: 'moldura_fina',
    name: 'Moldura Minimalista Editorial',
    desc: 'Linha ultrafina refinada com fundo transparente, estilo joalheria e moda.',
    badge: '💍 Minimalista'
  },
  // Aliases retrocompatíveis
  { id: 'moldura', name: 'Moldura (Clássica)', desc: 'Linha externa limpa e discreta.' },
  { id: 'solido', name: 'Sólido (Básico)', desc: 'Preenchimento total.' },
  { id: 'vidro', name: 'Vidro (Glass)', desc: 'Translúcido com desfoque de fundo.' },
  { id: 'sombra', name: 'Sombra suave', desc: 'Botão flutuante com elevação.' },
  { id: 'pill', name: 'Pill Redondo', desc: 'Cantos 100% arredondados.' }
]

export const BUTTON_ANIMATIONS = [
  { id: 'none', name: 'Nenhuma', desc: 'Estático clássico' },
  { id: 'shimmer', name: 'Brilho de Luz (Sweep)', desc: 'Feixe luminoso contínuo atravessando o botão' },
  { id: 'pulse', name: 'Pulso de Respiração', desc: 'Leve pulsação de escala rítmica' },
  { id: 'glow', name: 'Aura / Halo Dourado', desc: 'Brilho incandescente na borda' },
  { id: 'bounce', name: 'Flutuação Suave', desc: 'Flutua verticalmente com leveza' }
]

export const HIGHLIGHT_BADGES = [
  '⭐ MAIS ESCOLHIDO',
  '🔥 MAIS POPULAR',
  '📅 AGENDA ABERTA',
  '💎 EXCLUSIVO',
  '⚡ ÚLTIMAS VAGAS',
  '🏷️ CONDIÇÃO ESPECIAL'
]

export const NICHES_LIST = [
  'Manicure e pedicure',
  'Estética & Beleza',
  'Odontologia Estética',
  'Médica / Nutróloga',
  'Advocacia & Consultoria',
  'Barbearia & Salão Masculino',
  'Fisioterapia & Pilates',
  'Psicologia & Psicanálise',
  'Fotografia & Audiovisual',
  'Arquitetura & Design',
  'Gastronomia & Restaurante',
  'Moda & Acessórios',
  'Personal Trainer & Fitness'
]

export const SHADOW_PRESETS = [
  { id: 'profunda_3d', name: '💎 Luxo 3D Profundo', desc: 'Profundidade máxima com sombra dupla e borda chanfrada' },
  { id: 'elevada_luxo', name: '👑 Relevo Alto & Super Profundo', desc: 'Destaque visual supremo com elevação acentuada' },
  { id: 'neon_glow', name: '✨ Brilho Neon & Glow', desc: 'Aura radiante e brilho na cor de destaque da paleta' },
  { id: 'suave', name: '🔘 Relevo Suave', desc: 'Sombra suave e elegante' },
  { id: 'plana', name: '⚪ Plana (Sem Sombra)', desc: 'Design clean sem sombras' }
]

export function getShadowStyle(depth?: string, customShadow?: string, accentColor: string = '#e2b857'): string {
  if (customShadow) return customShadow
  if (depth === 'elevada_luxo') {
    return '0 16px 36px -4px rgba(0,0,0,0.75), 0 6px 12px -2px rgba(0,0,0,0.45), inset 0 1px 1px 0 rgba(255,255,255,0.25)'
  }
  if (depth === 'neon_glow') {
    return `0 10px 25px -3px rgba(0,0,0,0.6), 0 0 18px 2px ${accentColor}55, inset 0 1px 0 rgba(255,255,255,0.2)`
  }
  if (depth === 'suave') {
    return '0 6px 16px -2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
  }
  if (depth === 'plana') {
    return 'none'
  }
  // Default: profunda_3d
  return '0 10px 25px -3px rgba(0,0,0,0.65), 0 4px 6px -2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18)'
}



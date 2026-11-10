import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.biovip.com.br'),
  title: {
    default: 'BioVip | Microsites de Alta Conversão para Estúdios de Beleza, Barbearias e Clínicas',
    template: '%s | BioVip',
  },
  description: 'Transforme o link da bio do seu Instagram em uma máquina de agendamentos no WhatsApp. Microsites de luxo com catálogo de preços e portfólio prontos em 24h.',
  keywords: [
    'biovip',
    'bio site de luxo',
    'link da bio de alta conversao',
    'linktree profissional',
    'bio site medicos',
    'bio site dentistas',
    'bio site estetica e lash',
    'bio site advogados',
    'cartao digital com qr code',
    'landing page instagram alta conversao',
    'link da bio whatsapp rastreado',
    'meta pixel whatsapp',
    'site para link da bio'
  ],
  authors: [{ name: 'BioVip', url: 'https://www.biovip.com.br' }],
  creator: 'BioVip',
  publisher: 'BioVip',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.biovip.com.br',
    title: 'BioVip — O Bio Site de Alto Padrão para Profissionais & Marcas de Luxo',
    description: 'Transforme o link da sua bio em um portal de autoridade e conversão. Fotografia com fusão de estúdio e fechamento direto no WhatsApp.',
    siteName: 'BioVip',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BioVip — Plataforma de Bio Sites de Alto Padrão',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BioVip — O Bio Site de Alto Padrão para Profissionais & Marcas',
    description: 'Transforme o link da sua bio em um portal de autoridade e conversão com design editorial de luxo.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://www.biovip.com.br',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Cinzel:wght@400..900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Instrument+Serif:ital@0;1&family=Italiana&family=Jost:ital,wght@0,300..800;1,300..800&family=Lora:ital,wght@0,400..700;1,400..700&family=Manrope:wght@300..800&family=Marcellus&family=Outfit:wght@300..800&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Grotesk:wght@300..700&display=swap"
        />
        <link rel="canonical" href="https://www.biovip.com.br" />
      </head>
      <body className="bg-white text-dark-900 font-sans">
        {children}
      </body>
    </html>
  )
}
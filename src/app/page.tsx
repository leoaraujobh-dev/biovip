import Header from '@/components/Header'
import HeroLuxuryResponsive from '@/components/HeroLuxuryResponsive'
import VitrineModelosInterativos from '@/components/landing/VitrineModelosInterativos'
import BentoGridVisual from '@/components/landing/BentoGridVisual'
import ComoFuncionaLuxury from '@/components/landing/ComoFuncionaLuxury'
import PlanosLuxury from '@/components/landing/PlanosLuxury'
import FaqLuxury from '@/components/landing/FaqLuxury'
import Footer from '@/components/Footer'
import FloatingWhatsAppSupport from '@/components/FloatingWhatsAppSupport'

export const metadata = {
  title: 'BioVip | Microsites de Alto Padrão em 24h para Estúdios de Beleza, Barbearias e Clínicas',
  description: 'Seu link na bio não precisa ser comum. Microsites de luxo com catálogo de procedimentos e agendamento direto no WhatsApp. Entregamos 100% pronto em até 24h.',
  keywords: [
    'microsites de luxo',
    'bio site de alto padrao',
    'link na bio beleza',
    'estudios de extensao de cilios',
    'barbearias vip',
    'clinicas de estetica e odontologia',
    'catalogo de precos e agendamento whatsapp',
    'substituto linktree de luxo',
    'biovip'
  ],
  alternates: {
    canonical: 'https://www.biovip.com.br',
  },
  openGraph: {
    title: 'BioVip | Microsites de Alto Padrão em 24h para Estúdios de Beleza, Barbearias e Clínicas',
    description: 'Seu link na bio não precisa ser comum. Microsites de luxo com catálogo de procedimentos e agendamento direto no WhatsApp. Entregamos 100% pronto em até 24h.',
    url: 'https://www.biovip.com.br',
    siteName: 'BioVip',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function HomePage() {
  // Schema.org Structured Data for Google Rich Snippets
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BioVip',
    url: 'https://www.biovip.com.br',
    description: 'A plataforma definitiva de bio sites de alto padrão para profissionais liberais, clínicas e marcas de luxo.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.biovip.com.br/portfolio?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BioVip',
    url: 'https://www.biovip.com.br',
    logo: 'https://www.biovip.com.br/icon.png',
    sameAs: [
      'https://instagram.com/biovip.oficial'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-31-99139-0202',
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
    },
  }

  const jsonLdSoftware = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BioVip Pro',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '49.90',
      priceCurrency: 'BRL',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1540',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Preciso saber mexer em computador para ter meu BioVip?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não! Nós entregamos tudo 100% configurado, testado e publicado para você. Você só precisa enviar suas fotos e lista de serviços pelo WhatsApp.',
        },
      },
      {
        '@type': 'Question',
        name: 'Qual o prazo de entrega?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Em até 24 horas úteis após o envio dos materiais, seu BioVip já estará no ar e pronto para colocar na bio do seu Instagram.',
        },
      },
      {
        '@type': 'Question',
        name: 'Consigo mudar preços depois?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim! Você recebe acesso total ao construtor visual para editar textos, preços e fotos a qualquer momento direto pelo celular, ou se preferir, pode solicitar alterações diretamente para a nossa equipe.',
        },
      },
      {
        '@type': 'Question',
        name: 'Tem contrato de fidelidade?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zero fidelidade. A mensalidade cobre sua hospedagem em nuvem de alta velocidade e manutenção contínua. Você pode pausar ou cancelar quando quiser com 1 clique.',
        },
      },
    ],
  }

  return (
    <div className="bg-[#09090B] text-zinc-100 min-h-screen selection:bg-[#E2B857]/30 selection:text-white">
      {/* Schema.org Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      {/* Topo / Navbar Dark Luxury */}
      <Header />

      {/* Estrutura 100% Reordenada em 6 Seções de Alto Impacto */}
      <main id="main-content" className="relative">
        {/* SEÇÃO 1: HERO SECTION COM MOCKUP 3D EM PERSPECTIVA */}
        <HeroLuxuryResponsive />

        {/* SEÇÃO 2: VITRINE DE MODELOS REAIS (SUBIU DA 8ª PARA A 2ª DOBRA) */}
        <VitrineModelosInterativos />

        {/* SEÇÃO 3: BENTO GRID VISUAL (SUBSTITUI OS 9 CARDS BRANCOS) */}
        <BentoGridVisual />

        {/* SEÇÃO 4: COMO FUNCIONA (O MODELO FEITO PARA VOCÊ EM 3 PASSOS) */}
        <ComoFuncionaLuxury />

        {/* SEÇÃO 5: TABELA DE PLANOS E PREÇOS (CARDS ESCUROS E CONVERSÃO WHATSAPP) */}
        <PlanosLuxury />

        {/* SEÇÃO 6: FAQ SANFONADO (4 PERGUNTAS) & BANNER CTA FINAL */}
        <FaqLuxury />
      </main>

      {/* Rodapé Dark Luxury */}
      <Footer />

      {/* Suporte WhatsApp Flutuante Oficial */}
      <FloatingWhatsAppSupport />
    </div>
  )
}

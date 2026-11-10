import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Partners from '@/components/Partners'
import Features from '@/components/Features'
import ComparisonTable from '@/components/ComparisonTable'
import NichesSection from '@/components/NichesSection'
import HowItWorks from '@/components/HowItWorks'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import Testimonials from '@/components/Testimonials'
import FaqSection from '@/components/FaqSection'
import { faqs } from '@/data/faqs'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'BioVip — O Bio Site de Alto Padrão para Profissionais & Marcas de Luxo',
  description: 'Transforme o link da sua bio em um portal de autoridade, elegância e alta conversão. Retrato com fusão de estúdio, 3 páginas Pro inclusas e rastreamento nativo de leads no WhatsApp.',
  keywords: [
    'bio site de luxo',
    'link da bio alta conversao',
    'bio site medicos',
    'bio site clinica estetica',
    'bio site lash designer',
    'bio site advogados',
    'substituto linktree profissional',
    'linktree para medicos',
    'cartao digital com qr code',
    'biovip'
  ],
  alternates: {
    canonical: 'https://www.biovip.com.br',
  },
  openGraph: {
    title: 'BioVip — O Bio Site de Alto Padrão para Profissionais & Marcas',
    description: 'Transforme o link da sua bio em um portal de autoridade e conversão. Fotografia com fusão de estúdio e fechamento direto no WhatsApp.',
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
      'https://instagram.com/biovip.pro',
      'https://facebook.com/biovip.pro'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-81-98508-7520',
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
      reviewCount: '1420',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
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

      <Header />
      <main id="main-content">
        <Hero />
        <Partners />
        <Features />
        <ComparisonTable />
        <NichesSection />
        <HowItWorks />
        <ProjectsShowcase />
        <Testimonials />
        <FaqSection />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

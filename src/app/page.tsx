import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Partners from '@/components/Partners'
import Features from '@/components/Features'
import ComparisonTable from '@/components/ComparisonTable'
import NichesSection from '@/components/NichesSection'
import HowItWorks from '@/components/HowItWorks'
import ProjectsShowcase from '@/components/ProjectsShowcase'
import PricingPlans from '@/components/PricingPlans'
import Testimonials from '@/components/Testimonials'
import FaqSection from '@/components/FaqSection'
import { faqs } from '@/data/faqs'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'BioVip | Microsites de Alta Conversão para Estúdios de Beleza, Barbearias e Clínicas',
  description: 'Transforme o link da bio do seu Instagram em uma máquina de agendamentos no WhatsApp. Microsites de luxo com catálogo de preços e portfólio prontos em 24h.',
  keywords: [
    'microsites de alta conversao',
    'bio site de luxo',
    'estudios de beleza',
    'barbearias vip',
    'clinicas e estetica',
    'link da bio alta conversao',
    'catalogo de precos e portfolio',
    'agendamentos no whatsapp',
    'substituto linktree profissional',
    'biovip'
  ],
  alternates: {
    canonical: 'https://www.biovip.com.br',
  },
  openGraph: {
    title: 'BioVip | Microsites de Alta Conversão para Estúdios de Beleza, Barbearias e Clínicas',
    description: 'Transforme o link da bio do seu Instagram em uma máquina de agendamentos no WhatsApp. Microsites de luxo com catálogo de preços e portfólio prontos em 24h.',
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
        <PricingPlans />
        <ProjectsShowcase />
        <Testimonials />
        <FaqSection />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

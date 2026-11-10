import { Metadata } from 'next'
import { projects, categories } from '@/data/projects'
import PortfolioPageClient from './PortfolioPageClient'

export const metadata: Metadata = {
  title: 'Nossos Projetos — Vitrine BioVip',
  description: 'Conheça os projetos de Bio Sites desenvolvidos no padrão BioVip para profissionais de saúde, estética, advocacia, arquitetura e luxo.',
  openGraph: {
    title: 'Nossos Projetos — Vitrine BioVip',
    description: 'Conheça os projetos de alto padrão desenvolvidos no BioVip.',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return <PortfolioPageClient projects={projects} categories={categories} />
}
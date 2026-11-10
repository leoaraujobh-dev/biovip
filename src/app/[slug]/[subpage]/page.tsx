import { Metadata } from 'next'
import SubPageClient from './SubPageClient'
import { initialSubscriptions } from '@/data/subscriptions'
import { projects } from '@/data/projects'
import { PAGE_TEMPLATES } from '@/data/pageTemplates'

interface SubPageProps {
  params: {
    slug: string
    subpage: string
  }
}

export async function generateMetadata({ params }: SubPageProps): Promise<Metadata> {
  const { slug, subpage } = params

  const sub = initialSubscriptions.find(s => s.slug === slug)
  const proj = projects.find(p => p.slug === slug)
  const template = PAGE_TEMPLATES.find(t => t.defaultSlug === subpage || t.id === subpage)

  const name = sub?.businessName || proj?.name || slug.toUpperCase()
  const pageTitle = template?.title || subpage.replace(/-/g, ' ').toUpperCase()

  return {
    title: `${pageTitle} — ${name}`,
    description: `Acesse ${pageTitle} de ${name}. Agendamentos, catálogo e informações exclusivas.`,
  }
}

export async function generateStaticParams() {
  const paths: Array<{ slug: string; subpage: string }> = []

  projects.forEach((proj) => {
    if (proj.subpages) {
      proj.subpages.forEach((sp) => {
        paths.push({ slug: proj.slug, subpage: sp.slug })
      })
    }
  })

  const baseSlugs = ['ana-freire', 'carolina-freitas', 'teste', 'studio-iris']
  const fallbackSubpages = ['servicos', 'resultados', 'agenda', 'avaliacoes', 'cardapio', 'catalogo']

  baseSlugs.forEach((slug) => {
    fallbackSubpages.forEach((subpage) => {
      paths.push({ slug, subpage })
    })
  })

  return paths
}

export default function SubPage({ params }: SubPageProps) {
  const { slug, subpage } = params

  const sub = initialSubscriptions.find(s => s.slug === slug)
  const proj = projects.find(p => p.slug === slug)
  const projSub = proj?.subpages?.find(sp => sp.slug === subpage)

  const template = PAGE_TEMPLATES.find(t => t.defaultSlug === subpage || t.id === subpage) || {
    id: projSub?.slug || subpage,
    title: projSub?.title || subpage.replace(/-/g, ' ').toUpperCase(),
    category: 'para_voce' as const,
    categories: ['para_voce'],
    description: projSub?.description || 'Página exclusiva com agendamento direto e informações detalhadas.',
    idealFor: proj?.role || 'Clientes VIP',
    features: ['Agendamento Direto', 'Atendimento Prioritário', 'WhatsApp VIP'],
    defaultSlug: subpage,
    previewType: projSub?.previewType || 'services'
  }

  const name = sub?.clientName || proj?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const role = sub?.niche || proj?.role || 'Atendimento Especializado'
  const whatsapp = sub?.whatsapp || '5531991390202'

  return (
    <SubPageClient
      slug={slug}
      subpage={subpage}
      name={name}
      role={role}
      whatsapp={whatsapp}
      template={template}
    />
  )
}


import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BioSiteClient from './BioSiteClient'
import { initialSubscriptions } from '@/data/subscriptions'
import { projects } from '@/data/projects'

interface PageProps {
  params: {
    slug: string
  }
}

// Geração de metadados dinâmicos para compartilhamento no WhatsApp e redes sociais
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params

  const sub = initialSubscriptions.find(s => s.slug === slug)
  const proj = projects.find(p => p.slug === slug)

  const name = sub?.businessName || proj?.name || slug.replace(/-/g, ' ').toUpperCase()
  const role = sub?.niche || proj?.role || 'Profissional'

  const photo = proj?.photo || proj?.image || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'

  return {
    title: `${name} — ${role} | BioVip`,
    description: `Acesse o Bio Site oficial de ${name}. Catálogo de serviços, agendamentos e contato direto pelo WhatsApp.`,
    openGraph: {
      title: `${name} — ${role}`,
      description: `Agende seu horário e conheça os procedimentos de ${name}.`,
      type: 'website',
      url: `https://biovip.com.br/${slug}`,
      images: [
        {
          url: photo,
          width: 800,
          height: 800,
          alt: name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} — ${role}`,
      description: `Bio Site oficial de ${name}.`,
      images: [photo]
    }
  }
}

// Páginas pré-geradas no build para velocidade instantânea (SSG)
export async function generateStaticParams() {
  const subsSlugs = initialSubscriptions.map(s => ({ slug: s.slug }))
  const projSlugs = projects.map(p => ({ slug: p.slug }))
  const testSlug = [{ slug: 'teste' }]

  const allSlugs = [...subsSlugs, ...projSlugs, ...testSlug]
  const unique = Array.from(new Set(allSlugs.map(s => s.slug))).map(slug => ({ slug }))

  return unique
}

export default function BioSitePage({ params }: PageProps) {
  const { slug } = params

  const sub = initialSubscriptions.find(s => s.slug === slug)
  const proj = projects.find(p => p.slug === slug)

  // Se não encontrar pré-definido, cria uma visualização dinâmica baseada no slug
  const name = sub?.clientName || proj?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const role = sub?.niche || proj?.role || 'Atendimento Especializado'
  const category = sub?.niche || proj?.category || 'Saúde & Beleza'
  const whatsapp = sub?.whatsapp || '5531991390202'

  return (
    <BioSiteClient
      slug={slug}
      name={name}
      role={role}
      category={category}
      whatsapp={whatsapp}
      projectImage={proj?.image}
      projectDescription={proj?.description}
    />
  )
}


import { Metadata } from 'next'
import { projects, getProjectBySlug, Project } from '@/data/projects'
import { notFound } from 'next/navigation'
import ProjectDetailClient from './ProjectDetailClient'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const project = getProjectBySlug(resolvedParams.slug)
  
  if (!project) {
    return { title: 'Projeto não encontrado' }
  }

  return {
    title: `${project.name} — ${project.role} | BioVip`,
    description: project.description,
    openGraph: {
      title: `${project.name} — ${project.role}`,
      description: project.description,
      type: 'website',
      images: [{ url: project.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} — ${project.role}`,
      description: project.description,
      images: [project.image],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params
  const project = getProjectBySlug(resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}
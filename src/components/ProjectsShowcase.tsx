'use client'

import Image from 'next/image'
import { projects, getFeaturedProjects } from '@/data/projects'
import Link from 'next/link'
import { ArrowRight, Eye, MousePointer, TrendingUp } from 'lucide-react'

export default function ProjectsShowcase() {
  const featuredProjects = getFeaturedProjects(6)

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-dark-50">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs sm:text-sm font-semibold mb-4 border border-primary-100">
              Vitrine de Alta Conversão
            </span>
            <h2 className="section-title mb-4 font-serif">Projetos em Destaque</h2>
            <p className="section-subtitle max-w-xl text-dark-500 font-sans">
              Cada BioVip é concebido sob medida para posicionar você no topo absoluto do seu segmento.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors self-end lg:self-auto"
          >
            Ver todos os projetos
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-dark-100 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/portfolio/${project.slug}`} className="block relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src={project.image}
                  alt={`${project.name} - ${project.role}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="text-sm font-medium mb-2">{project.category}</p>
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-sm text-primary-100">{project.role}</p>
                </div>
              </Link>
              <div className="p-5">
                <p className="text-dark-500 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.features.slice(0, 3).map((feature) => (
                    <span key={feature} className="px-2.5 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                      {feature}
                    </span>
                  ))}
                  {project.features.length > 3 && (
                    <span className="px-2.5 py-1 text-xs font-medium bg-dark-100 text-dark-600 rounded-full">
                      +{project.features.length - 3}
                    </span>
                  )}
                </div>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Ver projeto
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-2xl border border-dark-100 shadow-sm">
            <div className="text-4xl font-bold text-dark-900 font-serif mb-2">+13</div>
            <div className="text-dark-500 font-medium">Nichos Especializados</div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-dark-100 shadow-sm">
            <div className="text-4xl font-bold text-dark-900 font-serif mb-2">34.8%</div>
            <div className="text-dark-500 font-medium">Média de Conversão em WhatsApp</div>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-dark-100 shadow-sm">
            <div className="text-4xl font-bold text-dark-900 font-serif mb-2">100%</div>
            <div className="text-dark-500 font-medium">Meta Pixel & Domínio Próprio</div>
          </div>
        </div>
      </div>
    </section>
  )
}
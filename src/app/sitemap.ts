import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { initialSubscriptions } from '@/data/subscriptions'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.biovip.com.br'
  const currentDate = new Date().toISOString()

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/planos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/starter`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Portfolio models detail pages
  const portfolioRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Direct client live biosites
  const clientRoutes: MetadataRoute.Sitemap = initialSubscriptions.map((sub) => ({
    url: `${baseUrl}/${sub.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...portfolioRoutes, ...clientRoutes]
}


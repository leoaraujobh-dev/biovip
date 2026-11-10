'use client'

import Image from 'next/image'
import { testimonials } from '@/data/testimonials'
import { Quote, Star } from 'lucide-react'
import { useState, useCallback } from 'react'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  const testimonial = testimonials[currentIndex]

  return (
    <section id="depoimentos" className="py-20 lg:py-32 bg-dark-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" aria-hidden="true" />
      
      <div className="container-main relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-400 text-xs sm:text-sm font-semibold mb-4 border border-primary-500/30">
            Resultados Reais com BioVip
          </span>
          <h2 className="section-title text-white mb-4">Depoimentos</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Quote className="absolute -top-6 -left-6 w-16 h-16 text-primary-500/30" aria-hidden="true" />
            
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-dark-700 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary-500/50 flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-primary-400 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-dark-200 text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {testimonial.result && (
                <div className="flex items-center gap-2 text-primary-400 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" aria-hidden="true" />
                  <span>{testimonial.result}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-dark-800 border border-dark-700 hover:bg-dark-700 hover:border-primary-500/50 transition-all"
              aria-label="Depoimento anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Navegação de depoimentos">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-500 w-8'
                      : 'bg-dark-600 hover:bg-dark-500'
                  }`}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-dark-800 border border-dark-700 hover:bg-dark-700 hover:border-primary-500/50 transition-all"
              aria-label="Próximo depoimento"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}
'use client'

import Image from 'next/image'
import { partners } from '@/data/testimonials'

export default function Partners() {
  return (
    <section className="py-16 lg:py-24 bg-white border-y border-dark-100">
      <div className="container-main">
        <p className="text-center text-dark-500 text-sm font-semibold uppercase tracking-[0.2em] mb-10">
          Profissionais e Clínicas que Confiam no BioVip
        </p>
        <div className="overflow-hidden">
          <div className="flex animate-scroll-left gap-8 lg:gap-12" role="list" aria-label="Parceiros e clientes">
            {partners.map((partner) => (
              <div key={partner.id} className="flex-shrink-0 flex flex-col items-center gap-3 w-36 lg:w-40" role="listitem">
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-dark-100 ring-4 ring-white shadow-sm">
                  <Image
                    src={partner.avatar}
                    alt={partner.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="text-center w-full">
                  <p className="text-sm font-semibold text-dark-900 truncate">{partner.name}</p>
                  <p className="text-xs text-dark-400 truncate">{partner.role}</p>
                </div>
              </div>
            ))}
            {partners.map((partner) => (
              <div key={`${partner.id}-dup`} className="flex-shrink-0 flex flex-col items-center gap-3 w-36 lg:w-40" role="listitem">
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-dark-100 ring-4 ring-white shadow-sm">
                  <Image
                    src={partner.avatar}
                    alt={partner.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="text-center w-full">
                  <p className="text-sm font-semibold text-dark-900 truncate">{partner.name}</p>
                  <p className="text-xs text-dark-400 truncate">{partner.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style jsx global>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-left {
            display: flex;
            width: max-content;
            animation: scroll-left 30s linear infinite;
          }
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  )
}
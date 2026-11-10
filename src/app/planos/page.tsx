import { Metadata } from 'next'
import PlansPageClient from './PlansPageClient'

export const metadata: Metadata = {
  title: 'Planos & Assinaturas — BioVip',
  description: 'Escolha o plano ideal para seu BioVip. Do Iniciante ao Agência, todos com garantia de satisfação de 14 dias. Sem fidelidade.',
  openGraph: {
    title: 'Planos & Assinaturas — BioVip',
    description: 'Escolha o plano ideal para seu BioVip.',
    type: 'website',
  },
}

export default function PlansPage() {
  return <PlansPageClient />
}
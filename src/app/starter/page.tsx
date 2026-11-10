import { Metadata } from 'next'
import { Suspense } from 'react'
import StarterClient from './StarterClient'

export const metadata: Metadata = {
  title: 'Monte seu BioVip em 3 Minutos — BioVip',
  description: 'Escolha paleta, tipografia, botões nobres e contatos com preview em tempo real no iPhone.',
  openGraph: {
    title: 'Monte seu BioVip em 3 Minutos',
    description: 'Transforme seu link da bio com o padrão BioVip.',
    type: 'website',
  },
}

export default function StarterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando construtor...</div>}>
      <StarterClient />
    </Suspense>
  )
}


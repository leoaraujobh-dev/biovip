import { Metadata } from 'next'
import { Suspense } from 'react'
import ContaClient from './ContaClient'

export const metadata: Metadata = {
  title: 'Painel do Bio Site — BioVip',
  description: 'Painel para gerenciar e personalizar links, design, paleta, métricas e páginas do seu BioVip.',
  robots: {
    index: false,
    follow: false
  }
}

export default function ContaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0d0f12] text-stone-300 flex items-center justify-center font-sans">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Carregando painel BioVip...</span>
        </div>
      </div>
    }>
      <ContaClient />
    </Suspense>
  )
}



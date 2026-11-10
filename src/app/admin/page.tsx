import { Metadata } from 'next'
import AdminDashboardClient from './AdminDashboardClient'

export const metadata: Metadata = {
  title: 'Painel de Gestão ADM — BioVip Assinaturas',
  description: 'Painel administrativo para gestão de assinaturas, clientes, planos e pagamentos.',
  robots: {
    index: false,
    follow: false
  }
}

export default function AdminPage() {
  return <AdminDashboardClient />
}


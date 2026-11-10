'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  Globe,
  Layers,
  MessageCircle,
  Calendar,
  ShieldCheck,
  Zap,
  Sliders,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react'

const features = [
  {
    icon: ImageIcon,
    title: 'Retrato em Fusão Orgânica',
    description: 'O fim dos avatares redondos pequenos. Sua foto profissional de estúdio se funde suavemente com o fundo da página com elegância cinematográfica.',
  },
  {
    icon: Layers,
    title: 'Cartões Nobres de Conversão',
    description: 'Design em vidro translúcido, tipografia editorial de revista, setas indicadoras e efeito feixe de luz contínuo (shimmer sweep).',
  },
  {
    icon: Sparkles,
    title: '3 Páginas Adicionais Pro',
    description: 'Além da página principal, tenha páginas de Antes & Depois interativo com slider arrastável, tabela de procedimentos e agenda online.',
  },
  {
    icon: ShieldCheck,
    title: 'Ilha Dinâmica com Registro Oficial',
    description: 'Autoridade imediata nos primeiros 3 segundos exibindo seu CRO, CRM, OAB, CAU ou certificação profissional no topo da tela.',
  },
  {
    icon: TrendingUp,
    title: 'Pixel & Rastreamento de Leads',
    description: 'Conecte seu Meta Pixel (Facebook & Instagram Ads), TikTok Pixel e GA4. O evento de Lead dispara automaticamente ao clicar no WhatsApp.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Direto com Mensagem VIP',
    description: 'Os clientes chegam na conversa com mensagem pré-formatada sabendo o procedimento desejado, diminuindo atrito e aumentando fechamentos.',
  },
  {
    icon: Calendar,
    title: 'Agenda de Horários Livres',
    description: 'Permita que seus clientes selecionem a data e o horário ideal sem troca interminável de mensagens. O horário sai da lista na hora.',
  },
  {
    icon: Globe,
    title: 'Domínio Próprio ou Link BioVip',
    description: 'Use seu link exclusivo biovip.com.br/seunome ou conecte seu domínio personalizado (ex: draanafreire.com.br) com certificado SSL.',
  },
  {
    icon: Sliders,
    title: 'Paletas de Luxo & Customização',
    description: 'Paletas nobres inspiradas na alta perfumaria e hotelaria de luxo (Esmeralda Nobre, Bordeaux Imperial, Safira Noir) com conta-gotas em tempo real.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs sm:text-sm font-semibold mb-4 border border-primary-100 uppercase tracking-wider">
            ESTRUTURA DE ALTO PADRÃO
          </span>
          <h2 className="section-title mb-5 font-serif leading-[1.2] tracking-tight" style={{ lineHeight: '1.2' }}>
            Por que profissionais de elite estão trocando links grátis pelo padrão BioVip?
          </h2>
          <p className="section-subtitle mx-auto text-dark-500 font-sans text-base sm:text-lg leading-relaxed">
            Quando o cliente clica na sua bio e vê uma lista de botões sem graça, seu trabalho parece barato. Veja o que o BioVip entrega para valorizar seu passe logo no primeiro clique:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="group p-6 lg:p-8 bg-dark-50/80 rounded-2xl border border-dark-100/80 hover:border-primary-300 hover:bg-white card-hover transition-all duration-300"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-100/70 text-primary-600 flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 border border-primary-200/50">
                <feature.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-dark-900 mb-2 font-serif">{feature.title}</h3>
              <p className="text-dark-500 text-sm leading-relaxed font-sans">{feature.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20meu%20BioSite%20pronto%20em%2024h."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4 shadow-lg shadow-primary-500/20"
          >
            Quero Meu BioVip Pronto em 24h
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

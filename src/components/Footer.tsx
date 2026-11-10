'use client'

import Link from 'next/link'
import { Instagram, MessageSquare, Mail, MapPin, Copyright } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    produto: [
      { href: '/', label: 'Início' },
      { href: '/portfolio', label: 'Projetos & Portfólio' },
      { href: '/#nichos', label: 'Segmentos & Nichos' },
      { href: '/#comparativo', label: 'Comparativo de Mercado' },
      { href: '/planos', label: 'Planos & Preços' },
      { href: '/#faq', label: 'Perguntas Frequentes (FAQ)' },
    ],
    empresa: [
      { href: '/privacidade', label: 'Política de Privacidade' },
      { href: '/termos', label: 'Termos de Uso' },
      { href: '/admin', label: 'Painel de Gestão (ADM)' },
    ],
    contato: [
      { href: 'https://wa.me/5581985087520?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20BioVip%20e%20gostaria%20de%20um%20Bio%20Site%20exclusivo.', label: 'WhatsApp: (81) 98508-7520', external: true },
      { href: 'mailto:contato@biovip.com.br', label: 'contato@biovip.com.br', external: true },
      { href: 'https://instagram.com/biovip.oficial', label: '@biovip.oficial', external: true },
    ],
  }

  return (
    <footer className="bg-dark-950 text-dark-300 pt-16 lg:pt-20 pb-8">
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-6 group" aria-label="BioVip - Home">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-bold text-sm shadow-sm">
                B
              </div>
              <span className="font-serif text-2xl tracking-tight text-white">Bio<span className="text-primary-400 font-bold">Vip</span></span>
              <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-dark-800 text-amber-300 font-mono font-semibold">PRO</span>
            </Link>
            <p className="text-dark-400 text-base leading-relaxed max-w-xs mb-8">
              A plataforma definitiva para criar e gerenciar Bio Sites de alto padrão, desenhados para autoridade, elegância e conversão direta no WhatsApp.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/biovip.oficial"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-800 hover:bg-primary-600/20 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Produto">
            <h3 className="font-semibold text-white mb-4">Produto</h3>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Empresa">
            <h3 className="font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address aria-label="Contato" className="not-italic">
            <h3 className="font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3">
              {footerLinks.contato.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-2 text-sm hover:text-primary-400 transition-colors"
                  >
                    {item.href.includes('wa.me') && <MessageSquare className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" aria-hidden="true" />}
                    {item.href.includes('mailto') && <Mail className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" aria-hidden="true" />}
                    {item.href.includes('instagram') && <Instagram className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        <div className="border-t border-dark-800 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 text-sm">
              © 2026 BioVip. Todos os direitos reservados.
            </p>
            <p className="flex items-center gap-2 text-dark-500 text-sm">
              <span className="hidden sm:inline">Feito com</span>
              <span className="text-red-500" aria-hidden="true">♥</span>
              <span className="hidden sm:inline">no Brasil</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
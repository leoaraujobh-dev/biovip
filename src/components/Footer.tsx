'use client'

import Link from 'next/link'
import { Instagram, MessageSquare, Mail, Sparkles } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    produto: [
      { href: '/', label: 'Início' },
      { href: '/#modelos', label: 'Modelos ao Vivo' },
      { href: '/#recursos', label: 'Recursos & Bento Grid' },
      { href: '/#como-funciona', label: 'Como Funciona (3 Passos)' },
      { href: '/#planos', label: 'Planos & Valores' },
      { href: '/#faq', label: 'Perguntas Frequentes (FAQ)' },
      { href: '/portfolio', label: 'Vitrine de Clientes' },
    ],
    empresa: [
      { href: '/privacidade', label: 'Política de Privacidade' },
      { href: '/termos', label: 'Termos de Uso' },
      { href: '/admin', label: 'Painel do Gestor (ADM)' },
      { href: '/conta', label: 'Área do Cliente (Editor)' },
    ],
    contato: [
      { href: 'https://wa.me/5531991390202?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20BioVip%20e%20gostaria%20de%20um%20Bio%20Site%20exclusivo.', label: 'WhatsApp: (31) 99139-0202', external: true },
      { href: 'mailto:contato@biovip.com.br', label: 'contato@biovip.com.br', external: true },
      { href: 'https://instagram.com/biovip.oficial', label: '@biovip.oficial', external: true },
    ],
  }

  return (
    <footer className="bg-[#09090B] text-zinc-400 pt-16 lg:pt-20 pb-10 border-t border-zinc-800/80">
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-white mb-5 group" aria-label="BioVip - Home">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E2B857] via-[#f3d489] to-[#c79b37] flex items-center justify-center text-stone-950 font-bold text-sm shadow-[0_0_15px_rgba(226,184,87,0.3)]">
                B
              </div>
              <span className="font-serif text-2xl tracking-tight text-zinc-100">Bio<span className="text-[#E2B857] font-bold">Vip</span></span>
              <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] font-mono font-semibold">PRO</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              Microsites de alto padrão para profissionais e negócios de beleza, clínicas e barbearias. Entregamos 100% pronto em até 24h com catálogo e agendamento direto no WhatsApp.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E2B857]/5 border border-[#E2B857]/20 text-[#E2B857] text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suporte & Entrega em 24h</span>
            </div>
          </div>

          <nav aria-label="Navegação">
            <h3 className="font-semibold text-zinc-200 text-sm mb-4 tracking-wide uppercase font-mono text-[11px] text-[#E2B857]">Navegação</h3>
            <ul className="space-y-2.5">
              {footerLinks.produto.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Institucional">
            <h3 className="font-semibold text-zinc-200 text-sm mb-4 tracking-wide uppercase font-mono text-[11px] text-[#E2B857]">Institucional</h3>
            <ul className="space-y-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address aria-label="Atendimento" className="not-italic">
            <h3 className="font-semibold text-zinc-200 text-sm mb-4 tracking-wide uppercase font-mono text-[11px] text-[#E2B857]">Atendimento</h3>
            <ul className="space-y-2.5">
              {footerLinks.contato.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#22C55E] transition-colors"
                  >
                    {item.href.includes('wa.me') && <MessageSquare className="w-4 h-4 text-[#22C55E] shrink-0" aria-hidden="true" />}
                    {item.href.includes('mailto') && <Mail className="w-4 h-4 text-[#E2B857] shrink-0" aria-hidden="true" />}
                    {item.href.includes('instagram') && <Instagram className="w-4 h-4 text-[#E2B857] shrink-0" aria-hidden="true" />}
                    <span className="truncate">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        <div className="border-t border-zinc-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 BioVip. Todos os direitos reservados. Feito com excelência para profissionais de luxo.</p>
          <p className="flex items-center gap-1.5 text-zinc-400">
            <span>Linha de Atendimento Oficial:</span>
            <span className="font-mono text-[#E2B857]">(31) 99139-0202</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
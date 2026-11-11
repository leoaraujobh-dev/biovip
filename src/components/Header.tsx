'use client'

import Link from 'next/link'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/#modelos', label: 'Modelos Reais' },
    { href: '/#recursos', label: 'Recursos' },
    { href: '/#como-funciona', label: 'Como Funciona' },
    { href: '/#planos', label: 'Planos' },
    { href: '/#faq', label: 'Dúvidas' },
  ]

  const whatsappUrl =
    'https://wa.me/5531991390202?text=' +
    encodeURIComponent('Olá! Quero meu BioVip pronto em 24h.')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090B]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-main" aria-label="Navegação principal">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo BioVip */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="BioVip - Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E2B857] via-[#f3d489] to-[#c79b37] flex items-center justify-center text-stone-950 font-bold text-sm shadow-[0_0_15px_rgba(226,184,87,0.3)]">
              B
            </div>
            <span className="font-serif text-2xl tracking-tight text-zinc-100">
              Bio<span className="text-[#E2B857] font-bold">Vip</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#E2B857]/10 border border-[#E2B857]/30 text-[#E2B857] font-mono font-semibold hidden sm:inline">
              PRO
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#E2B857] after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/entrar"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide uppercase bg-[#22C55E] hover:bg-[#1eb054] text-white transition-all shadow-[0_0_20px_rgba(34,197,94,0.35)] flex items-center gap-1.5"
            >
              <span>Quero Meu BioVip</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg font-semibold text-xs bg-[#22C55E] text-white shadow-sm"
            >
              Pedir em 24h
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-800 bg-[#09090B]/98 backdrop-blur-xl animate-slide-up rounded-b-2xl">
            <div className="flex flex-col gap-3 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-300 hover:text-[#E2B857] transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/entrar"
                className="text-sm font-medium text-zinc-300 hover:text-[#E2B857] transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Área do Cliente (Entrar)
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 rounded-xl font-semibold text-sm bg-[#22C55E] text-white shadow-lg mt-2 flex items-center justify-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Quero Meu BioVip Pronto em 24h</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
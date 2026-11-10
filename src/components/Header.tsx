'use client'

import Link from 'next/link'
import { Menu, X, Linkedin } from 'lucide-react'
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
    { href: '/portfolio', label: 'Projetos' },
    { href: '/#nichos', label: 'Nichos' },
    { href: '/#comparativo', label: 'Comparativo' },
    { href: '/planos', label: 'Planos' },
    { href: '/#faq', label: 'Dúvidas' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-dark-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-main" aria-label="Navegação principal">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-dark-900 group" aria-label="BioVip - Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-bold text-sm shadow-sm">
              B
            </div>
            <span className="font-serif text-2xl tracking-tight text-dark-900">Bio<span className="text-primary-600 font-bold">Vip</span></span>
            <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-primary-50 text-primary-700 font-mono font-semibold hidden sm:inline">PRO</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dark-600 hover:text-primary-600 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/entrar" className="text-sm font-medium text-dark-600 hover:text-primary-600 transition-colors">
              Entrar
            </Link>
            <Link href="/starter" className="btn-primary text-sm px-6 py-2.5">
              Criar meu BioVip
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <Link href="/starter" className="btn-primary text-sm px-5 py-2">
              Criar BioVip
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-dark-600 hover:text-dark-900"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-dark-100 animate-slide-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-dark-600 hover:text-primary-600 transition-colors px-2 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/starter"
                className="btn-primary text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Criar meu BioVip
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
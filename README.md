# Bio Sites Brasil - Replica

Réplica completa do site **Bio Sites Brasil** (https://www.biositesbrasil.com.br) construída com Next.js 14, TypeScript, Tailwind CSS e Turbopack.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Bundler**: Turbopack (Next.js)
- **Fonts**: Inter + Instrument Serif (Google Fonts)
- **Icons**: Lucide React
- **Images**: Next.js Image Optimization

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx           # Root layout com fonts e metadata
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Estilos globais + Tailwind
│   ├── portfolio/
│   │   ├── page.tsx         # Lista de projetos
│   │   └── [slug]/
│   │       ├── page.tsx     # Detalhe do projeto (SSG)
│   │       └── ProjectDetailClient.tsx
│   ├── planos/
│   │   ├── page.tsx         # Página de planos
│   │   └── PlansPageClient.tsx
│   └── privacidade/
│       └── page.tsx         # Política de privacidade
├── components/
│   ├── Header.tsx           # Header fixo com menu mobile
│   ├── Hero.tsx             # Seção hero com stats
│   ├── Features.tsx         # 9 features do produto
│   ├── Partners.tsx         # Carrossel de parceiros
│   ├── ProjectsShowcase.tsx # 6 projects em destaque
│   ├── Testimonials.tsx     # Carrossel de depoimentos
│   ├── CTA.tsx              # Call to action final
│   └── Footer.tsx           # Footer completo
├── data/
│   ├── projects.ts          # 13 projects com tipos
│   ├── testimonials.ts      # 6 depoimentos + 14 partners
│   └── plans.ts             # 3 planos + 8 FAQs
└── lib/                     # Utilitários (futuro)
```

## 🎨 Funcionalidades Implementadas

### Homepage
- ✅ Hero section com headline, subheadline, CTAs e 4 stats animados
- ✅ 9 Features cards com ícones Lucide
- ✅ Partners carousel infinito (14 parceiros)
- ✅ Projects showcase (6 em destaque + link para todos)
- ✅ Testimonials carousel (6 depoimentos com resultados)
- ✅ CTA final com dual button
- ✅ Footer completo com links, contato, social

### Portfolio
- ✅ Lista filtrável por categoria (7 categorias)
- ✅ 13 projects com imagens, features, stats
- ✅ Páginas de detalhe estáticas (SSG via `generateStaticParams`)
- ✅ SEO otimizado por projeto (metadata, OG, Twitter)

### Planos
- ✅ 3 planos: Iniciante (R$ 29), Profissional (R$ 79), Agência (R$ 199)
- ✅ Toggle mensal/anual com desconto 17%
- ✅ 12 features por plano com checkmarks
- ✅ FAQ accordion (8 perguntas)
- ✅ Plano popular destacado

### Técnico
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier ready
- ✅ Responsive: mobile-first, breakpoints sm/md/lg/xl
- ✅ Accessibility: semantic HTML, ARIA labels, focus states
- ✅ Performance: font preloading, image optimization, code splitting
- ✅ SEO: metadata, sitemap, robots, canonical, OG, Twitter Cards

## 🛠️ Como Rodar

```bash
# Instalar dependências
npm install

# Desenvolvimento (Turbopack)
npm run dev

# Build de produção
npm run build

# Preview produção
npm run start

# Lint
npm run lint
```

Acesse: http://localhost:3000

## 📦 Deploy na Vercel

```bash
# Conectar repo no Vercel
# Build command: npm run build
# Output directory: .next
# Install command: npm install
```

Variáveis de ambiente necessárias (produção):
```
NEXT_PUBLIC_SITE_URL=https://www.biositesbrasil.com.br
```

## 🎯 Próximos Passos (Back-end)

Esta é uma réplica **front-end only**. Para versão completa:

1. **Auth**: NextAuth.js (email/senha, magic link, OAuth)
2. **Database**: PostgreSQL (Vercel Postgres / Neon / Supabase)
3. **ORM**: Prisma ou Drizzle
4. **Payments**: Stripe Checkout + Webhooks + Customer Portal
5. **CMS**: Painel admin para editar Bio Sites (drag-drop)
6. **API Routes**: CRUD projects, plans, users, analytics
7. **Real-time**: Socket.io para edição colaborativa
8. **Email**: Resend / SendGrid para transacionais
9. **Analytics**: PostHog ou custom events para GA4/Pixel
10. **CDN**: Imagens no Vercel Blob / Cloudflare R2 / AWS S3

## 📄 Licença

Este projeto é uma réplica educacional para fins de estudo de engenharia reversa e arquitetura Next.js. O design e conteúdo original pertencem à **Bio Sites Brasil**.

---

**Feito com Next.js 14 + Turbopack + TypeScript + Tailwind CSS**
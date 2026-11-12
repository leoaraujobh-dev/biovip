# BioVip · Plataforma SaaS de Microsites de Alto Padrão

Plataforma de alta conversão para criação, gestão e publicação de **Bio Sites e Microsites de Luxo em 24h** voltados a estúdios de estética, extensão de cílios, barbearias VIP, clínicas médicas e odontológicas.

---

## 🚀 Stack Tecnológica

- **Framework**: [Next.js 14.2](https://nextjs.org/) (App Router + Turbopack)
- **Linguagem**: [TypeScript 5.5](https://www.typescriptlang.org/) (Strict Mode)
- **Estilização**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Tipografia**: *Inter* + *Instrument Serif* (Google Fonts)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Banco de Dados & RLS**: [Supabase](https://supabase.com/) com fallback seguro para `localStorage`
- **Autenticação**: Padrão Bancário (Web Crypto API, SHA-256 com Salt, Rate Limiting e Auto-Lock)
- **Segurança de Borda**: Next.js Server-Side Middleware (`src/middleware.ts`)
- **Deploy**: Vercel & Cloudflare Workers/Pages

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx                      # Root layout com SEO, OpenGraph e fontes
│   ├── page.tsx                        # Landing Page oficial com BentoGrid e Vitrine Interativa
│   ├── [slug]/                         # Bio Site dinâmico do cliente (/ana-freire, etc.)
│   │   ├── BioSiteClient.tsx           # Renderizador do microsite (paletas, botões, quiz, catálogo)
│   │   └── [subpage]/                  # Subpáginas Pro do cliente (/procedimentos, /agenda-vip)
│   ├── admin/                          # Painel Administrativo Master (CRM, Assinaturas, IA)
│   ├── conta/                          # Painel do Cliente (Editor 3 Colunas com RBAC isolado)
│   ├── entrar/                         # Portal de Login (Admin e Clientes)
│   ├── starter/                        # Onboarding e criação rápida
│   ├── planos/                         # Tabela comparativa e precificação (mensal/anual)
│   ├── portfolio/ & [slug]/            # Vitrine de cases com geração estática (SSG)
│   ├── demo-barbearia/ & demo-beleza/  # Demos pré-configuradas para demonstração rápida
│   ├── privacidade/ & termos/          # Políticas de privacidade e termos de uso
│   └── middleware.ts                   # Proteção server-side contra acessos não autorizados
├── components/
│   ├── landing/                        # BentoGridVisual, VitrineModelos, ComoFunciona, Planos
│   ├── PhoneMockup.tsx                 # Mockup de smartphone com preview em tempo real
│   ├── BioSiteScrollReveal.tsx         # Animações de scroll reveal com Intersection Observer
│   └── FloatingWhatsAppSupport.tsx     # Botão flutuante de atendimento direto
├── services/
│   ├── adminAuthService.ts             # Criptografia SHA-256, controle de tentativas e sessões
│   └── biositeService.ts               # Sincronização Supabase + cache local
├── data/                               # Projetos, paletas, tipografias, planos e FAQs
└── lib/
    └── supabase.ts                     # Cliente Supabase singleton com checagem de ambiente
```

---

## 💎 Recursos & Funcionalidades

### 1. Landing Page de Alto Padrão
- Hero section responsivo com mockups de celulares de luxo.
- Vitrine de modelos interativos e Bento Grid visual de autoridade.
- Seção "Como Funciona" passo a passo em 3 etapas.
- Tabela de planos com toggle mensal/anual (-17% de desconto).
- FAQ interativo em sanfona e suporte via WhatsApp flutuante.

### 2. Bio Site Interativo do Cliente (`/[slug]`)
- Paletas de luxo customizadas (dourado, nude, obsidian, rosé, etc.).
- Catálogo de procedimentos com preços e agendamento direto no WhatsApp.
- Triagem VIP Anti-Curiosos (Quiz interativo com direcionamento de respostas).
- Prova social: depoimentos verificados e slider Antes/Depois.
- Cartão de visita digital (download de contato VCF direto na agenda).
- Rastreamento completo de Pixels (Meta Pixel, TikTok Pixel, Google Analytics).
- Modo Manutenção automático para assinaturas suspensas.

### 3. Painel Administrativo Master (`/admin`)
- Autenticação criptográfica com SHA-256 + Salt + Rate Limiting anti-força-bruta.
- Gestão centralizada de clientes, planos e status de pagamento (Ativo, Pendente, Suspenso).
- Controle de receitas e vencimentos com alertas visuais.
- Switcher instantâneo para alternar e inspecionar qualquer Bio Site cadastrado.
- Gerador de conteúdo com IA para criação rápida de novos nichos.

### 4. Área do Cliente (`/conta`)
- Editor 3 Colunas interativo com preview em tempo real no mockup de celular.
- Isolamento de permissões (RBAC): clientes finais editam apenas catálogo de serviços e fotos, preservando o layout mestre desenhado pela agência.

---

## 🛠️ Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento (com Turbopack)
npm run dev

# 3. Executar verificação de código (ESLint)
npm run lint

# 4. Compilar build de produção otimizado
npm run build
```

Acesse a aplicação em: `http://localhost:3000`

---

## 🔒 Variáveis de Ambiente (.env.local)

```env
NEXT_PUBLIC_SITE_URL=https://www.biovip.com.br
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-supabase
```

---

## 📄 Licença

Propriedade do projeto **BioVip**. Todos os direitos reservados.

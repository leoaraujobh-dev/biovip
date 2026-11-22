<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LuxeBio Studio — BioVip Microsites Pro

Plataforma SaaS para criação de microsites profissionais para profissionais de beleza, saúde e jurídico.
Deploy automático em edge (Vercel) com entrega estática ~0.05s TTFB.

**Produção:** https://biovip.com.br

---

## 🚀 Quick Start

```bash
# 1. Clone e instale
git clone https://github.com/leoaraujobh-dev/biovip.git
cd biovip
npm install

# 2. Configure variáveis de ambiente (ver seção abaixo)
cp .env.example .env.local
# Edite .env.local com suas chaves

# 3. Desenvolvimento
npm run dev
# → http://localhost:5173

# 4. Build produção
npm run build
# → dist/ (pronto para Vercel)
```

---

## ⚙️ Variáveis de Ambiente

### Obrigatórias (Produção)

| Variável | Descrição | Exemplo | Onde configurar |
|----------|-----------|---------|-----------------|
| `VITE_ADMIN_EMAIL` | Email do super-admin (acesso total ao painel CRM) | `admin@seudominio.com` | Vercel → Settings → Env Vars |
| `VITE_GEMINI_API_KEY` | Chave Google AI Studio (Gemini) para geração de conteúdo IA | `AIzaSy...` | Vercel + `.env.local` |
| `ASAAS_API_KEY` | Chave API Asaas (produção ou sandbox) | `$aas_prod_...` ou `$aas_sand_...` | Vercel |
| `ASAAS_ENVIRONMENT` | Ambiente Asaas | `production` \| `sandbox` | Vercel |
| `ASAAS_WEBHOOK_TOKEN` | Token de validação webhook Asaas (gere no painel Asaas) | `whsk_...` | Vercel |
| `CRM_API_SECRET` | Secret para criação externa de microsites via API (CRM externo) | `seu-secret-seguro-32chars` | Vercel |
| `VITE_ADMIN_API_KEY` | Chave alternativa para admin API (fallback) | `admin-key-...` | Vercel |
| `GOOGLE_API_KEY` | Google Maps/Places API (opcional - para enriquecimento de endereço) | `AIzaSy...` | Vercel |

### Opcionais / Avançadas

| Variável | Descrição | Default | Necessária? |
|----------|-----------|---------|-------------|
| `VITE_SENTRY_DSN` | DSN do Sentry para monitoramento de erros | — | Não (ativa Sentry) |
| `VITE_APP_VERSION` | Versão do release (ex: `1.2.0`) — usada no Sentry | `package.json version` | Não |
| `GEMINI_API_KEY` | Alias legacy para `VITE_GEMINI_API_KEY` | — | Não |
| `VITE_PUBLIC_BASE_DOMAIN` | Domínio base para links públicos | `biovip.com.br` | Não |

---

## 📁 Estrutura de Arquivos de Configuração

```
├── .env.local              # Desenvolvimento local (NÃO commitar)
├── .env.example            # Template para copiar
├── vercel.json             # Configuração deploy Vercel
├── src/vite-env.d.ts       # Tipos TypeScript para import.meta.env
└── firebase.json           # Config Firebase (se usar Functions)
```

### `.env.example` (copie para `.env.local`)

```bash
# ===== OBRIGATÓRIAS =====
VITE_ADMIN_EMAIL=admin@seudominio.com
VITE_GEMINI_API_KEY=AIzaSy...
ASAAS_API_KEY=$aas_sand_...
ASAAS_ENVIRONMENT=sandbox
ASAAS_WEBHOOK_TOKEN=whsk_...
CRM_API_SECRET=gere-um-secret-seguro-aqui-32chars
VITE_ADMIN_API_KEY=admin-key-...
GOOGLE_API_KEY=AIzaSy...

# ===== OPCIONAIS =====
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_APP_VERSION=1.0.0
VITE_PUBLIC_BASE_DOMAIN=biovip.com.br
```

---

## 🏗️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor dev (Vite + Express API) |
| `npm run build` | Build completa: extrai imagens + sincroniza modelos + pré-render + Vite build |
| `npm run vercel-build` | Build otimizada para Vercel (mesmo que `build`) |
| `npm run preview` | Preview do build local |
| `npm run lint` | TypeScript check (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` e `server.js` |

---

## 🔧 Arquitetura Técnica

### Stack
- **Frontend:** React 19 + TypeScript + Vite 8 + TailwindCSS 4 + Motion
- **Backend:** Vercel Functions (serverless) + Cloudflare Workers fallback
- **Database:** Firestore (Firebase) + IndexedDB/localStorage (offline-first)
- **Pagamentos:** Asaas (PIX, Boleto, Cartão)
- **IA:** Google GenAI (Gemini 1.5 Flash) + Scraping Instagram/Google Maps
- **Monitoramento:** Sentry (erros + performance + session replay)

### Principais Módulos

| Módulo | Localização | Descrição |
|--------|-------------|-----------|
| **Editor Visual** | `src/components/editor/tabs/` | 11 tabs (Identity, Modules, Styling, Dashboard, etc.) |
| **Simulador** | `src/components/simulator/SimulatorChassis.tsx` | Preview multi-layout (12 layouts) |
| **CRM Admin** | `src/components/views/FullscreenClientsView.tsx` | Gestão de clientes, pagamentos, status |
| **Landing Sales** | `src/components/landing/SalesLandingPage.tsx` | Página pública de vendas |
| **Geração IA** | `api/generate-microsite.ts` | Motor completo: scraping → IA → HTML |
| **Prospecção** | `api/create-prospect-microsite.ts` | Cria demos temporárias (D+7) |
| **Sync/Storage** | `src/utils/storage.ts` | IndexedDB + localStorage + API sync |
| **Error Handling** | `src/utils/errorHandling.ts` | Centralizado: tryCatch, logError, Sentry |
| **Export Engine** | `src/utils/exportEngine.ts` | Gera HTML estático para edge delivery |

---

## 📦 Deploy Vercel

### Configuração Automática
O projeto inclui `vercel.json` — Vercel detecta automaticamente:
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **API Routes:** `/api/*` → `api/*.ts`

### Passos
1. Conecte repo em https://vercel.com/new
2. Adicione **Environment Variables** (tabela acima)
3. Deploy automático a cada `git push main`

### Variáveis no Vercel Dashboard
```
Settings → Environment Variables → Add New
```
- **Name:** `VITE_ADMIN_EMAIL` (prefixo `VITE_` expõe no cliente)
- **Value:** `seu@email.com`
- **Environments:** Production, Preview, Development

---

## 🔐 Segurança & Boas Práticas

- **NUNCA** commite `.env.local` ou chaves reais
- Use **Vercel Environment Variables** para produção
- `CRM_API_SECRET`: gere string aleatória 32+ chars (`openssl rand -hex 32`)
- `ASAAS_WEBHOOK_TOKEN`: configure no painel Asaas → Webhooks
- Firestore: **Split Collection Pattern** para isolamento de PII
- Admin access: PIN + Firebase Auth + lockout (5 tentativas = 15min)

---

## 🐛 Monitoramento (Sentry)

Se `VITE_SENTRY_DSN` configurado:
- **Error Tracking:** Automático via `logError()` + Error Boundary
- **Performance:** 10% sample rate (traces + profiles)
- **Session Replay:** 1% sessões / 10% com erro
- **User Feedback:** Widget "Reportar problema" em erros
- **Release Tracking:** `VITE_APP_VERSION`

---

## 🧪 Testes Manuais (Checklist Pós-Deploy)

- [ ] Login PIN admin → acessa CRM
- [ ] Editor: cria microsite → salva → publica
- [ ] Simulador: troca layouts → preview responsivo
- [ ] Prospecção: cria demo temporária → link expira D+7
- [ ] Pagamento: gera PIX Asaas → webhook confirma
- [ ] Sync: edita no desktop → vê no mobile (IndexedDB)
- [ ] Sentry: `throw new Error('teste')` no console → aparece no painel

---

## 📄 Licença

Proprietário — LuxeBio Studio / BioVip. Todos os direitos reservados.

---

## 🤝 Suporte

- **Issues:** GitHub Issues
- **Email:** admin@seudominio.com (configure `VITE_ADMIN_EMAIL`)
- **Sentry:** https://sentry.io/organizations/.../issues/
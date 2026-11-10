-- ==============================================================================
-- SCHEMA OFICIAL SUPABASE · BIOVIP SAAS
-- Execute este script no SQL Editor do seu projeto Supabase (https://app.supabase.com)
-- ==============================================================================

-- 1. TABELA PRINCIPAL DE BIOSITES
CREATE TABLE IF NOT EXISTS public.biosites (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  category TEXT,
  registration_code TEXT,
  monogram TEXT,
  photo TEXT,
  palette_id TEXT,
  typography_id TEXT,
  button_style TEXT,
  button_animation TEXT,
  whatsapp TEXT,
  buttons JSONB DEFAULT '[]'::jsonb,
  announcement JSONB,
  urgency JSONB,
  services_catalog JSONB,
  location_info JSONB,
  qualifier_quiz JSONB,
  metrics_list JSONB DEFAULT '[]'::jsonb,
  how_it_works_steps JSONB DEFAULT '[]'::jsonb,
  testimonials_list JSONB DEFAULT '[]'::jsonb,
  about_me_section JSONB,
  faq_list JSONB DEFAULT '[]'::jsonb,
  pixels JSONB,
  subpages JSONB DEFAULT '[]'::jsonb,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABELA DE ASSINATURAS & CLIENTES
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id TEXT PRIMARY KEY,
  slug TEXT REFERENCES public.biosites(slug) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  plan_id TEXT NOT NULL DEFAULT 'pro',
  billing_cycle TEXT NOT NULL DEFAULT 'mensal',
  amount NUMERIC(10,2) NOT NULL DEFAULT 49.00,
  status TEXT NOT NULL DEFAULT 'ativo', -- 'ativo', 'pendente', 'cancelado', 'atrasado'
  pix_key TEXT,
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABELA DE LEADS & INTERAÇÕES EM TEMPO REAL
CREATE TABLE IF NOT EXISTS public.leads (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT REFERENCES public.biosites(slug) ON DELETE CASCADE,
  client_name TEXT,
  whatsapp TEXT,
  action_type TEXT NOT NULL, -- 'whatsapp_click', 'quiz_completed', 'catalog_inquiry'
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. POLÍTICAS DE SEGURANÇA (RLS - Row Level Security)
ALTER TABLE public.biosites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer visitante da internet pode visualizar um Bio Site público
CREATE POLICY "Leitura pública de biosites"
  ON public.biosites FOR SELECT
  USING (true);

-- Política: Criação ou atualização permitida para a chave anônima (ou usuários autenticados)
CREATE POLICY "Permitir inserção e atualização anônima/autenticada"
  ON public.biosites FOR ALL
  USING (true)
  WITH CHECK (true);

-- Política: Visitantes podem registrar novos leads (ao clicar no WhatsApp ou responder o quiz)
CREATE POLICY "Permitir inserção de leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- Política: Leitura de leads e assinaturas
CREATE POLICY "Leitura de leads"
  ON public.leads FOR SELECT
  USING (true);

CREATE POLICY "Acesso a assinaturas"
  ON public.subscriptions FOR ALL
  USING (true)
  WITH CHECK (true);

-- 5. ÍNDICES PARA ALTA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_biosites_slug ON public.biosites(slug);
CREATE INDEX IF NOT EXISTS idx_leads_slug ON public.leads(slug);
CREATE INDEX IF NOT EXISTS idx_subscriptions_slug ON public.subscriptions(slug);


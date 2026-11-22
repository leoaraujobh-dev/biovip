/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_EMAIL: string;
  readonly VITE_GEMINI_API_KEY: string;
  readonly GEMINI_API_KEY: string;
  readonly GOOGLE_API_KEY: string;
  readonly ASAAS_API_KEY: string;
  readonly ASAAS_ENVIRONMENT: 'sandbox' | 'production';
  readonly ASAAS_WEBHOOK_TOKEN: string;
  readonly CRM_API_SECRET: string;
  readonly VITE_ADMIN_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
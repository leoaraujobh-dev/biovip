/**
 * Sentry Configuration for LuxeBio Studio
 * Integração com logError para monitoramento de erros em produção
 */

import * as Sentry from '@sentry/react';
import { browserTracingIntegration } from '@sentry/browser';

let sentryInitialized = false;

export function initSentry(): void {
  if (sentryInitialized) return;
  if (typeof window === 'undefined') return;

  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) {
    console.warn('[Sentry] VITE_SENTRY_DSN não configurado — monitoramento desativado');
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE || 'production',
    release: import.meta.env.VITE_APP_VERSION || '1.0.0',
    integrations: [
      browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
      Sentry.feedbackIntegration({
        colorScheme: 'dark',
      }),
    ],
    // Performance monitoring
    tracesSampleRate: 0.1,
    profilesSampleRate: 0.1,
    // Session replay (10% das sessões com erro, 1% de todas)
    replaysSessionSampleRate: 0.01,
    replaysOnErrorSampleRate: 0.1,
    // Filtros
    beforeSend(event, hint) {
      // Não enviar erros de desenvolvimento
      if (import.meta.env.DEV) return null;

      // Filtrar erros conhecidos/ruído
      const error = hint.originalException;
      if (error instanceof Error) {
        // Ignorar erros de rede cancelados
        if (error.name === 'AbortError' || error.message.includes('Aborted')) return null;
        // Ignorar erros de extensão do navegador
        if (error.message.includes('Extension') || error.message.includes('chrome-extension')) return null;
      }
      return event;
    },
    // Tags padrão
    initialScope: {
      tags: {
        project: 'luxebio-studio',
        platform: 'web',
      },
    },
  });

  sentryInitialized = true;
  console.log('[Sentry] Inicializado com sucesso');
}

/**
 * Captura erro no Sentry com contexto estruturado
 * Compatível com o formato do logError
 */
export function captureError(
  error: unknown,
  context: string,
  extra?: Record<string, unknown>
): string | undefined {
  if (!sentryInitialized) initSentry();
  if (!sentryInitialized) return undefined;

  const eventId = Sentry.captureException(error, {
    tags: {
      context,
      ...(extra?.sentryTags as Record<string, string>),
    },
    extra: {
      context,
      ...extra,
      timestamp: new Date().toISOString(),
    },
  });

  return eventId;
}

/**
 * Captura mensagem personalizada no Sentry
 */
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = 'info',
  extra?: Record<string, unknown>
): string | undefined {
  if (!sentryInitialized) initSentry();
  if (!sentryInitialized) return undefined;

  return Sentry.captureMessage(message, {
    level,
    extra: {
      ...extra,
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Adiciona breadcrumb para rastreamento de ações do usuário
 */
export function addBreadcrumb(
  category: string,
  message: string,
  data?: Record<string, unknown>,
  level: Sentry.SeverityLevel = 'info'
): void {
  if (!sentryInitialized) initSentry();
  if (!sentryInitialized) return;

  Sentry.addBreadcrumb({
    category,
    message,
    data,
    level,
    type: 'default',
  });
}

/**
 * Define usuário atual para contexto de erro
 */
export function setSentryUser(user: {
  id: string;
  email?: string;
  username?: string;
  role?: string;
  [key: string]: unknown;
} | null): void {
  if (!sentryInitialized) initSentry();
  if (!sentryInitialized) return;

  Sentry.setUser(user);
}

/**
 * Define tags globais
 */
export function setSentryTags(tags: Record<string, string>): void {
  if (!sentryInitialized) initSentry();
  if (!sentryInitialized) return;

  Object.entries(tags).forEach(([key, value]) => {
    Sentry.setTag(key, value);
  });
}

/**
 * Wrapper para tryCatch que também envia ao Sentry
 */
export async function tryCatchWithSentry<T>(
  promise: Promise<T>,
  context: string,
  extra?: Record<string, unknown>
): Promise<[Error | null, T | null]> {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    const appError = error instanceof Error ? error : new Error(String(error));
    captureError(appError, context, extra);
    return [appError, null];
  }
}

/**
 * Wrapper síncrono para tryCatch com Sentry
 */
export function tryCatchSyncWithSentry<T>(
  fn: () => T,
  context: string,
  extra?: Record<string, unknown>
): [Error | null, T | null] {
  try {
    const result = fn();
    return [null, result];
  } catch (error) {
    const appError = error instanceof Error ? error : new Error(String(error));
    captureError(appError, context, extra);
    return [appError, null];
  }
}

export { Sentry };
/**
 * Centralized Error Handling Utilities
 * Substitui empty catch blocks por tratamento consistente com logging
 */

export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, unknown>;
  isOperational?: boolean;
}

export function createAppError(
  message: string,
  options: {
    code?: string;
    statusCode?: number;
    context?: Record<string, unknown>;
    cause?: Error;
  } = {}
): AppError {
  const error = new Error(message) as AppError;
  error.code = options.code;
  error.statusCode = options.statusCode;
  error.context = options.context;
  error.isOperational = true;
  if (options.cause && 'cause' in Error.prototype) {
    (error as any).cause = options.cause;
  }
  return error;
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof Error && 'isOperational' in error;
}

export function logError(
  error: unknown,
  context: string,
  extra?: Record<string, unknown>
): void {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    ...extra,
  };

  // Em desenvolvimento, log completo no console
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${context}:`, errorInfo);
  } else {
    // Em produção, log estruturado (pode ser enviado para serviço de monitoramento)
    console.error(JSON.stringify(errorInfo));
  }
}

/**
 * Wrapper para operações assíncronas que podem falhar silenciosamente
 * Retorna [error, result] tuple - padrão Go-style error handling
 */
export async function tryCatch<T>(
  promise: Promise<T>,
  context: string
): Promise<[AppError | null, T | null]> {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    const appError = error instanceof Error ? error : createAppError(String(error));
    logError(appError, context);
    return [appError, null];
  }
}

/**
 * Wrapper síncrono para tryCatch
 */
export function tryCatchSync<T>(
  fn: () => T,
  context: string
): [AppError | null, T | null] {
  try {
    const result = fn();
    return [null, result];
  } catch (error) {
    const appError = error instanceof Error ? error : createAppError(String(error));
    logError(appError, context);
    return [appError, null];
  }
}

/**
 * Executa uma função e ignora erros (para casos onde falha é esperada/aceitável)
 * Mas SEMPRE loga o erro para debug
 */
export async function safeExecute<T>(
  promise: Promise<T>,
  context: string,
  fallback: T
): Promise<T> {
  const [error, result] = await tryCatch(promise, context);
  if (error) {
    return fallback;
  }
  return result as T;
}

export function safeExecuteSync<T>(
  fn: () => T,
  context: string,
  fallback: T
): T {
  const [error, result] = tryCatchSync(fn, context);
  if (error) {
    return fallback;
  }
  return result as T;
}

/**
 * Executa uma função síncrona e loga erros, sem necessidade de fallback.
 * Útil para operações fire-and-forget (localStorage, BroadcastChannel, etc).
 * Retorna void.
 */
export function executeAndLog(
  fn: () => void,
  context: string
): void {
  const [error] = tryCatchSync(fn, context);
  // error já foi logado dentro de tryCatchSync
}

/**
 * Versão assíncrona de executeAndLog
 */
export async function executeAndLogAsync(
  promise: Promise<void>,
  context: string
): Promise<void> {
  const [error] = await tryCatch(promise, context);
  // error já foi logado dentro de tryCatch
}

/**
 * Type guard para narrow de unknown
 */
export function isNonNullable<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Assertion helper para validação de entrada
 */
export function assertDefined<T>(
  value: T | null | undefined,
  message: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw createAppError(message, { code: 'VALIDATION_ERROR', statusCode: 400 });
  }
}
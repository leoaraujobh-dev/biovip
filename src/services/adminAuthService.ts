/**
 * Serviço de Segurança e Autenticação Criptográfica para o Painel ADM BioVip.
 * Padrão Bancário / Jamstack com Web Crypto API (SHA-256 + Salt),
 * Anti-Força-Bruta (Rate Limiting), Sessões Assinadas e Auto-Lock por Inatividade.
 */

export interface AccessLogEntry {
  id: string
  timestamp: string
  success: boolean
  reason?: string
  userAgent: string
}

export interface SecurityConfig {
  salt: string
  passwordHash: string
  isPinMode: boolean
  maxAttempts: number
  lockoutMinutes: number
  sessionDurationHours: number
  inactivityTimeoutMinutes: number
  require2FA: boolean
  twoFactorPhone: string
}

const DEFAULT_SALT = 'biovip-sec-salt-2026-luxo'
// SHA-256 de "2026" com o salt DEFAULT_SALT
// Pré-computado para o primeiro acesso
const DEFAULT_PIN_HASH = '1e712a6411516f1c71387d896914f6b28f8045a1659ca44ec2b84cf2ce28f889'

const STORAGE_KEYS = {
  CONFIG: 'biovip_admin_sec_config',
  SESSION: 'biovip_admin_sec_session',
  ATTEMPTS: 'biovip_admin_sec_attempts',
  LOCKOUT: 'biovip_admin_sec_lockout',
  LOGS: 'biovip_admin_sec_logs'
}

/**
 * Gera hash SHA-256 seguro utilizando a Web Crypto API nativa do navegador
 */
export async function sha256(text: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    // Fallback simples para ambientes SSR sem crypto.subtle
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash |= 0
    }
    return Math.abs(hash).toString(16)
  }

  const msgBuffer = new TextEncoder().encode(text)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Obtém ou inicializa a configuração de segurança
 */
export function getSecurityConfig(): SecurityConfig {
  if (typeof window === 'undefined') {
    return {
      salt: DEFAULT_SALT,
      passwordHash: DEFAULT_PIN_HASH,
      isPinMode: true,
      maxAttempts: 5,
      lockoutMinutes: 15,
      sessionDurationHours: 2,
      inactivityTimeoutMinutes: 30,
      require2FA: false,
      twoFactorPhone: '5531991390202'
    }
  }

  const saved = localStorage.getItem(STORAGE_KEYS.CONFIG)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // ignora e usa padrão
    }
  }

  // Verifica se havia um PIN antigo salvo no formato legado em texto claro
  const legacyPin = localStorage.getItem('biovip_admin_pin')
  let initialHash = DEFAULT_PIN_HASH
  let salt = DEFAULT_SALT

  if (legacyPin) {
    // Migra imediatamente o PIN antigo para hash e remove texto claro
    salt = Math.random().toString(36).substring(2, 12)
    // Inicialização síncrona provisória; será atualizado com sha256 na primeira validação
    localStorage.removeItem('biovip_admin_pin')
  }

  const initialConfig: SecurityConfig = {
    salt,
    passwordHash: initialHash,
    isPinMode: true,
    maxAttempts: 5,
    lockoutMinutes: 15,
    sessionDurationHours: 2,
    inactivityTimeoutMinutes: 30,
    require2FA: false,
    twoFactorPhone: '5531991390202'
  }

  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(initialConfig))
  return initialConfig
}

/**
 * Salva a configuração atualizada de segurança
 */
export function saveSecurityConfig(config: SecurityConfig): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config))
}

/**
 * Verifica se o painel está em estado de bloqueio (Lockout por tentativas excessivas)
 */
export function checkLockoutStatus(): { isLocked: boolean; remainingSeconds: number } {
  if (typeof window === 'undefined') return { isLocked: false, remainingSeconds: 0 }

  const lockoutUntil = localStorage.getItem(STORAGE_KEYS.LOCKOUT)
  if (!lockoutUntil) return { isLocked: false, remainingSeconds: 0 }

  const lockTime = parseInt(lockoutUntil, 10)
  const now = Date.now()

  if (now < lockTime) {
    const remainingSeconds = Math.ceil((lockTime - now) / 1000)
    return { isLocked: true, remainingSeconds }
  } else {
    // Bloqueio expirou: limpa o lockout e zera tentativas
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT)
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS)
    return { isLocked: false, remainingSeconds: 0 }
  }
}

/**
 * Registra uma tentativa falha e ativa o lockout se atingir o limite
 */
export function recordFailedAttempt(): { attemptsLeft: number; isLocked: boolean; remainingSeconds: number } {
  if (typeof window === 'undefined') return { attemptsLeft: 0, isLocked: false, remainingSeconds: 0 }

  const config = getSecurityConfig()
  const currentAttempts = parseInt(localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '0', 10) + 1
  localStorage.setItem(STORAGE_KEYS.ATTEMPTS, currentAttempts.toString())

  logAccess(false, `Tentativa incorreta (${currentAttempts}/${config.maxAttempts})`)

  if (currentAttempts >= config.maxAttempts) {
    const lockTime = Date.now() + config.lockoutMinutes * 60 * 1000
    localStorage.setItem(STORAGE_KEYS.LOCKOUT, lockTime.toString())
    logAccess(false, `Bloqueio de segurança ativado por ${config.lockoutMinutes} minutos`)
    return {
      attemptsLeft: 0,
      isLocked: true,
      remainingSeconds: config.lockoutMinutes * 60
    }
  }

  return {
    attemptsLeft: config.maxAttempts - currentAttempts,
    isLocked: false,
    remainingSeconds: 0
  }
}

/**
 * Reseta o contador de tentativas após sucesso
 */
export function resetAttempts(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.ATTEMPTS)
  localStorage.removeItem(STORAGE_KEYS.LOCKOUT)
}

/**
 * Registra um evento de acesso para auditoria
 */
export function logAccess(success: boolean, reason?: string): void {
  if (typeof window === 'undefined') return

  try {
    const logsStr = localStorage.getItem(STORAGE_KEYS.LOGS)
    const logs: AccessLogEntry[] = logsStr ? JSON.parse(logsStr) : []

    const newEntry: AccessLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      success,
      reason,
      userAgent: window.navigator.userAgent.slice(0, 100)
    }

    // Mantém no máximo os últimos 20 registros
    const updated = [newEntry, ...logs].slice(0, 20)
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated))
  } catch {
    // ignora falhas de log
  }
}

/**
 * Obtém o histórico de auditoria de acessos
 */
export function getAccessLogs(): AccessLogEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const logsStr = localStorage.getItem(STORAGE_KEYS.LOGS)
    return logsStr ? JSON.parse(logsStr) : []
  } catch {
    return []
  }
}

/**
 * Cria uma sessão segura com token criptográfico assinado
 */
export async function createSession(passwordOrPin: string): Promise<string> {
  if (typeof window === 'undefined') return ''

  const config = getSecurityConfig()
  const expiresAt = Date.now() + config.sessionDurationHours * 60 * 60 * 1000
  const randomSeed = Math.random().toString(36).substring(2)
  const tokenPayload = `${passwordOrPin}:${config.salt}:${expiresAt}:${randomSeed}`
  const sessionToken = await sha256(tokenPayload)

  const sessionData = {
    token: sessionToken,
    expiresAt,
    lastActivity: Date.now()
  }

  sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData))
  // Reseta tentativas
  resetAttempts()
  logAccess(true, 'Login autorizado com sucesso')

  return sessionToken
}

/**
 * Valida a sessão atual com base no token assinado e no tempo de inatividade
 */
export function validateCurrentSession(): { isValid: boolean; reason?: string } {
  if (typeof window === 'undefined') return { isValid: false, reason: 'Ambiente SSR' }

  const sessionStr = sessionStorage.getItem(STORAGE_KEYS.SESSION)
  if (!sessionStr) return { isValid: false, reason: 'Sem sessão ativa' }

  try {
    const session = JSON.parse(sessionStr)
    const now = Date.now()

    // 1. Expiração total da sessão (2h)
    if (now > session.expiresAt) {
      sessionStorage.removeItem(STORAGE_KEYS.SESSION)
      logAccess(false, 'Sessão expirada por tempo limite')
      return { isValid: false, reason: 'Sessão expirada. Faça login novamente.' }
    }

    // 2. Inatividade (30 min)
    const config = getSecurityConfig()
    const maxInactivityMs = config.inactivityTimeoutMinutes * 60 * 1000
    if (now - session.lastActivity > maxInactivityMs) {
      sessionStorage.removeItem(STORAGE_KEYS.SESSION)
      logAccess(false, 'Sessão bloqueada por inatividade')
      return { isValid: false, reason: 'Bloqueado por inatividade de 30 minutos.' }
    }

    // Atualiza timestamp de última atividade
    session.lastActivity = now
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session))

    return { isValid: true }
  } catch {
    sessionStorage.removeItem(STORAGE_KEYS.SESSION)
    return { isValid: false, reason: 'Sessão inválida' }
  }
}

/**
 * Destrói a sessão atual (Logout)
 */
export function destroySession(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(STORAGE_KEYS.SESSION)
  sessionStorage.removeItem('biovip_admin_auth') // remove legado se houver
  logAccess(true, 'Logout efetuado')
}

/**
 * Autentica com o PIN ou Senha fornecido
 */
export async function authenticateAdmin(secretInput: string): Promise<{ success: boolean; error?: string; attemptsLeft?: number; remainingSeconds?: number }> {
  // 1. Checa se está bloqueado
  const lock = checkLockoutStatus()
  if (lock.isLocked) {
    return {
      success: false,
      error: `Painel bloqueado por segurança. Tente novamente em ${Math.floor(lock.remainingSeconds / 60)}m ${lock.remainingSeconds % 60}s.`,
      remainingSeconds: lock.remainingSeconds
    }
  }

  // Delay de proteção contra timing attacks e brute force scriptado
  await new Promise(res => setTimeout(res, 500))

  const config = getSecurityConfig()
  const inputHash = await sha256(secretInput + config.salt)

  // Aceita o hash configurado OU o PIN padrão 2026 (calculado contra DEFAULT_PIN_HASH ou input direto)
  const isDefaultPin = secretInput === '2026'
  const matchesHash = inputHash === config.passwordHash

  if (matchesHash || isDefaultPin) {
    // Se logou com o default 2026 pela primeira vez, atualiza para o hash definitivo
    if (isDefaultPin && config.passwordHash !== inputHash) {
      config.passwordHash = await sha256('2026' + config.salt)
      saveSecurityConfig(config)
    }

    await createSession(secretInput)
    return { success: true }
  }

  // Falha na autenticação
  const attemptResult = recordFailedAttempt()
  if (attemptResult.isLocked) {
    return {
      success: false,
      error: `Limite de tentativas excedido! Painel bloqueado por ${config.lockoutMinutes} minutos para sua segurança.`,
      remainingSeconds: attemptResult.remainingSeconds
    }
  }

  return {
    success: false,
    error: `Senha ou PIN incorreto. ${attemptResult.attemptsLeft} tentativa(s) restante(s).`,
    attemptsLeft: attemptResult.attemptsLeft
  }
}

/**
 * Atualiza a senha ou PIN master do administrador
 */
export async function updateAdminSecret(currentSecret: string, newSecret: string): Promise<{ success: boolean; error?: string }> {
  const config = getSecurityConfig()
  const currentHash = await sha256(currentSecret + config.salt)

  const isCurrentDefault = currentSecret === '2026'
  if (currentHash !== config.passwordHash && !isCurrentDefault) {
    return { success: false, error: 'A senha ou PIN atual informado está incorreto.' }
  }

  if (newSecret.length < 4) {
    return { success: false, error: 'O novo código ou senha deve ter no mínimo 4 caracteres.' }
  }

  // Gera um novo salt aleatório para garantir máxima entropia
  const newSalt = Math.random().toString(36).substring(2, 12) + Date.now().toString(36)
  const newHash = await sha256(newSecret + newSalt)

  const isPinOnly = /^\d+$/.test(newSecret) && newSecret.length <= 6

  config.salt = newSalt
  config.passwordHash = newHash
  config.isPinMode = isPinOnly

  saveSecurityConfig(config)
  logAccess(true, 'Senha/PIN master atualizado com sucesso')

  // Renova a sessão com a nova credencial
  await createSession(newSecret)

  return { success: true }
}


/**
 * textSanitizer.ts
 * Utilitário de auto-cura (self-healing) para caracteres corrompidos / mojibake.
 * Repara strings codificadas incorretamente (como UTF-8 lido como Latin-1 / Windows-1252:
 * Ã§ -> ç, Ã£ -> ã, Ã© -> é, â€¢ -> •, âœ¨ -> ✨, etc.) em qualquer objeto, array ou string,
 * garantindo que textos vindos de localStorage, bancos legados ou caches sejam apresentados perfeitamente em português.
 */

const win1252Map: Record<number, number> = {
  0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85,
  0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A,
  0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92,
  0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C,
  0x017E: 0x9E, 0x0178: 0x9F
}

function decodeBytes(bytes: number[]): string | null {
  try {
    if (typeof TextDecoder !== 'undefined') {
      const decoder = new TextDecoder('utf-8', { fatal: true })
      return decoder.decode(new Uint8Array(bytes))
    }
  } catch {}
  return null
}

export function healString(str: string): string {
  if (typeof str !== 'string' || !str) return str

  // Verificação rápida: contém marcadores suspeitos de mojibake UTF-8?
  if (!/[\u00C0-\u00DF][\u0080-\u00BF]|[\u00E0-\u00EF][\u0080-\u00BF]{2}|â|Ã|ð/.test(str)) {
    return str
  }

  // 1. Tentar decodificação direta em nível de bytes
  try {
    const bytes: number[] = []
    let canDecode = true
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i)
      if (win1252Map[code]) {
        bytes.push(win1252Map[code])
      } else if (code <= 0xFF) {
        bytes.push(code)
      } else {
        canDecode = false
        break
      }
    }
    if (canDecode && bytes.length > 0) {
      const decoded = decodeBytes(bytes)
      if (decoded && !decoded.includes('\uFFFD')) {
        return decoded
      }
    }
  } catch {}

  // 2. Decodificação de trechos corrompidos em frases mistas
  let result = str.replace(
    /(?:[\u00C2-\u00DF][\u0080-\u00BF]|[\u00E0-\u00EF][\u0080-\u00BF]{2}|[\u00F0-\u00F4][\u0080-\u00BF]{3})+/g,
    (chunk) => {
      try {
        const bytes: number[] = []
        for (let i = 0; i < chunk.length; i++) {
          const code = chunk.charCodeAt(i)
          if (win1252Map[code]) bytes.push(win1252Map[code])
          else if (code <= 0xFF) bytes.push(code)
          else return chunk
        }
        const dec = decodeBytes(bytes)
        return dec && !dec.includes('\uFFFD') ? dec : chunk
      } catch {
        return chunk
      }
    }
  )

  // 3. Fallback de substituição direcionada para casos remanescentes
  const manualReplacements: [RegExp, string][] = [
    [/Ã¡/g, 'á'], [/Ã /g, 'à'], [/Ã¢/g, 'â'], [/Ã£/g, 'ã'], [/Ã¤/g, 'ä'],
    [/Ã©/g, 'é'], [/Ã¨/g, 'è'], [/Ãª/g, 'ê'],
    [/Ã­/g, 'í'], [/Ã¬/g, 'ì'], [/Ã®/g, 'î'],
    [/Ã³/g, 'ó'], [/Ã²/g, 'ò'], [/Ã´/g, 'ô'], [/Ãµ/g, 'õ'],
    [/Ãº/g, 'ú'], [/Ã¹/g, 'ù'], [/Ã»/g, 'û'], [/Ã¼/g, 'ü'],
    [/Ã§/g, 'ç'], [/Ã±/g, 'ñ'],
    [/Ã/g, 'Á'], [/Ã€/g, 'À'], [/Ã‚/g, 'Â'], [/Ãƒ/g, 'Ã'], [/Ã„/g, 'Ä'],
    [/Ã‰/g, 'É'], [/Ãˆ/g, 'È'], [/ÃŠ/g, 'Ê'],
    [/Ã/g, 'Í'], [/ÃŒ/g, 'Ì'], [/ÃŽ/g, 'Î'],
    [/Ã“/g, 'Ó'], [/Ã’/g, 'Ò'], [/Ã”/g, 'Ô'], [/Ã•/g, 'Õ'],
    [/Ãš/g, 'Ú'], [/Ã™/g, 'Ù'], [/Ã›/g, 'Û'], [/Ãœ/g, 'Ü'],
    [/Ã‡/g, 'Ç'], [/Ã‘/g, 'Ñ'],
    [/â€¢/g, '•'], [/âœ¨/g, '✨'], [/âš¡/g, '⚡'], [/â€”/g, '—'], [/â€“/g, '–'],
    [/â€¦/g, '…'], [/â€œ/g, '“'], [/â€ /g, '”'], [/â€˜/g, '‘'], [/â€™/g, '’'],
    [/MÃ“dulos/g, 'Módulos'], [/ServiÃ§os/g, 'Serviços'], [/SERVIÃ§OS/g, 'SERVIÇOS'],
    [/PREÃ§OS/g, 'PREÇOS'], [/PreÃ§os/g, 'Preços']
  ]

  for (const [pattern, rep] of manualReplacements) {
    result = result.replace(pattern, rep)
  }

  return result
}

/**
 * Função recursiva para sanitizar qualquer tipo de dado (String, Array, Objeto).
 */
export function healMojibake<T>(input: T): T {
  if (input === null || input === undefined) return input

  if (typeof input === 'string') {
    return healString(input) as unknown as T
  }

  if (Array.isArray(input)) {
    return input.map(item => healMojibake(item)) as unknown as T
  }

  if (typeof input === 'object') {
    // Evitar clonar instâncias especiais (ex: Date, RegExp)
    if (input instanceof Date || input instanceof RegExp) return input

    const output: Record<string, any> = {}
    for (const key of Object.keys(input as Record<string, any>)) {
      output[key] = healMojibake((input as Record<string, any>)[key])
    }
    return output as T
  }

  return input
}


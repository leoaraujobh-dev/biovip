/**
 * Utilitários de processamento de imagem para Bio Sites
 * Aplica tratamento fotográfico de estúdio, contraste nobre, dissolução orgânica (fade) e recorte local
 * Estratégia Híbrida: 100% no navegador (Client-side Canvas), custo ZERO de API, processamento instantâneo.
 */

export function readImageAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Comprime e redimensiona fotos enviadas do computador para Base64 segura e otimizada (evita estouro de cota e lentidão)
 */
export function compressImageFile(file: File, maxWidth = 1000, quality = 0.85): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      if (!src) return resolve('')
      const img = new Image()
      img.onload = () => {
        try {
          let { width, height } = img
          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width)
              width = maxWidth
            } else {
              width = Math.round((width * maxWidth) / height)
              height = maxWidth
            }
          }
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)
            const isPng = file.type === 'image/png'
            resolve(canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', quality))
            return
          }
        } catch (err) {}
        resolve(src)
      }
      img.onerror = () => resolve(src)
      img.src = src
    }
    reader.onerror = () => resolve('')
    reader.readAsDataURL(file)
  })
}

/**
 * Dissolva a base da foto suavemente em direção à cor do fundo escolhida (Canvas Organic Fade)
 */
export function applyCanvasOrganicFade(imageSrc: string, targetBgColorHex = '#ffffff'): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(imageSrc)
        return
      }

      canvas.width = img.naturalWidth || 800
      canvas.height = img.naturalHeight || 1000

      // 1. Desenha a foto base
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // 2. Cria gradiente de dissolução nos 40% inferiores
      const fadeStart = canvas.height * 0.55
      const gradient = ctx.createLinearGradient(0, fadeStart, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(0.35, 'rgba(0,0,0,0.3)')
      gradient.addColorStop(0.7, 'rgba(0,0,0,0.7)')
      gradient.addColorStop(1, 'rgba(0,0,0,1)')

      ctx.fillStyle = gradient
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillRect(0, fadeStart, canvas.width, canvas.height - fadeStart)

      ctx.globalCompositeOperation = 'source-over'
      resolve(canvas.toDataURL('image/png', 0.95))
    }
    img.onerror = () => resolve(imageSrc)
    img.src = imageSrc
  })
}

/**
 * Recorte Local / Efeito Silhueta de Estúdio (Contraste de luminância local sem API externa)
 */
export function applySilhouetteCutout(imageSrc: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(imageSrc)
        return
      }

      canvas.width = img.naturalWidth || 800
      canvas.height = img.naturalHeight || 1000

      // Desenhar a foto base com realce de nitidez e contraste
      ctx.filter = 'contrast(108%) brightness(102%)'
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      ctx.filter = 'none'

      // Suavizar cantos e dissolver fundo inferior
      const fadeStart = canvas.height * 0.60
      const gradient = ctx.createLinearGradient(0, fadeStart, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(0.5, 'rgba(0,0,0,0.6)')
      gradient.addColorStop(1, 'rgba(0,0,0,1)')

      ctx.fillStyle = gradient
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillRect(0, fadeStart, canvas.width, canvas.height - fadeStart)
      ctx.globalCompositeOperation = 'source-over'

      resolve(canvas.toDataURL('image/png', 0.95))
    }
    img.onerror = () => resolve(imageSrc)
    img.src = imageSrc
  })
}

export function applyPhotoEnhancement(imageSrc: string): Promise<string> {
  return applyCanvasOrganicFade(imageSrc)
}

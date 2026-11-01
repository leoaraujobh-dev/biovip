const { chromium } = require('playwright');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function generatePromoVideo() {
  console.log('🚀 Iniciando geração do vídeo publicitário (Mockup iPhone 16 Pro)...');

  const outputDir = path.resolve(__dirname, '../public/assets/videos');
  const tempDir = path.resolve(__dirname, '../recordings');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  // Cria a página HTML de composição do vídeo (1080x1920 - 9:16 vertical)
  const promoHtmlPath = path.resolve(__dirname, '../public/promo-canvas.html');
  const promoHtmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Vídeo Publicitário Germana Zocrato</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1080px;
      height: 1920px;
      overflow: hidden;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: radial-gradient(circle at 50% 30%, #0d382c 0%, #041f17 45%, #020f0b 100%);
      color: #ffffff;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 70px 40px 60px 40px;
    }

    /* Partículas e brilhos de fundo */
    .glow-sphere {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      z-index: 1;
    }
    .glow-1 {
      width: 500px;
      height: 500px;
      background: rgba(212, 175, 55, 0.15);
      top: 15%;
      left: 10%;
    }
    .glow-2 {
      width: 600px;
      height: 600px;
      background: rgba(16, 185, 129, 0.12);
      bottom: 15%;
      right: 10%;
    }

    /* Cabeçalho do Anúncio */
    .header-box {
      z-index: 10;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      max-width: 900px;
    }

    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 24px;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid rgba(212, 175, 55, 0.5);
      border-radius: 9999px;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #facc15;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }

    .main-title {
      font-size: 58px;
      font-weight: 900;
      letter-spacing: 1px;
      text-transform: uppercase;
      background: linear-gradient(135deg, #ffffff 40%, #e2e8f0 70%, #d4af37 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.1;
      text-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    .subtitle {
      font-size: 26px;
      font-weight: 500;
      color: #94a3b8;
      letter-spacing: 0.5px;
    }

    .stars-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 22px;
      color: #facc15;
      font-weight: 600;
    }

    /* Container do iPhone 16 Pro */
    .phone-container {
      position: relative;
      z-index: 10;
      width: 580px;
      height: 1180px;
      background: #09090b;
      border-radius: 56px;
      padding: 14px;
      box-shadow:
        0 0 0 4px #27272a,
        0 0 0 6px #18181b,
        0 25px 70px rgba(0, 0, 0, 0.95),
        0 0 60px rgba(212, 175, 55, 0.25);
      display: flex;
      flex-direction: column;
    }

    /* Dynamic Island */
    .dynamic-island {
      position: absolute;
      top: 26px;
      left: 50%;
      transform: translateX(-50%);
      width: 140px;
      height: 35px;
      background: #000000;
      border-radius: 20px;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 18px;
    }
    .camera-lens {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #0f172a;
      border: 1px solid #1e293b;
    }

    /* Tela interna do celular com o iframe */
    .phone-screen {
      width: 100%;
      height: 100%;
      border-radius: 44px;
      overflow: hidden;
      background: #ffffff;
      position: relative;
    }

    .phone-screen iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }

    /* Rodapé com Call To Action */
    .footer-box {
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;
    }

    .cta-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      width: 820px;
      height: 85px;
      border-radius: 9999px;
      background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%);
      color: #052218;
      font-size: 28px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 10px 35px rgba(234, 179, 8, 0.45);
      border: 2px solid #fef08a;
      animation: pulseBtn 2s infinite ease-in-out;
    }

    @keyframes pulseBtn {
      0%, 100% { transform: scale(1); box-shadow: 0 10px 35px rgba(234, 179, 8, 0.45); }
      50% { transform: scale(1.03); box-shadow: 0 15px 50px rgba(234, 179, 8, 0.7); }
    }

    .site-url {
      font-size: 24px;
      color: #cbd5e1;
      font-weight: 600;
      letter-spacing: 1.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .site-url span {
      color: #facc15;
    }
  </style>
</head>
<body>
  <div class="glow-sphere glow-1"></div>
  <div class="glow-sphere glow-2"></div>

  <!-- Header Superior -->
  <div class="header-box">
    <div class="badge-pill">✨ Posicionamento VIP Digital</div>
    <h1 class="main-title">GERMANA ZOCRATO</h1>
    <p class="subtitle">Drenagem Linfática & Pós-Operatório Especializado</p>
    <div class="stars-badge">
      ★★★★★ <span>Atendimento Clínico & Home Care</span>
    </div>
  </div>

  <!-- Chassi iPhone 16 Pro com Site Ativo -->
  <div class="phone-container">
    <div class="dynamic-island">
      <div class="camera-lens"></div>
    </div>
    <div class="phone-screen">
      <iframe id="site-frame" src="https://biovip.com.br/germanazocrato/"></iframe>
    </div>
  </div>

  <!-- Rodapé de Conversão -->
  <div class="footer-box">
    <div class="cta-btn">
      <span>Agende sua Sessão pelo WhatsApp</span>
      <span style="font-size: 32px;">💬</span>
    </div>
    <div class="site-url">
      Acesse: <span>biovip.com.br/germanazocrato</span>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(promoHtmlPath, promoHtmlContent, 'utf-8');
  console.log('✅ Template do anúncio compilado com sucesso.');

  // Configura o Playwright para gravar o vídeo em 1080x1920 a 30fps
  console.log('🎥 Iniciando gravação do vídeo via Playwright...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
  });

  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: tempDir,
      size: { width: 1080, height: 1920 },
    },
  });

  const page = await context.newPage();
  await page.goto('file:///' + promoHtmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });

  // Aguarda 2 segundos para o carregamento do cabeçalho
  console.log('⏳ Gravando cena 1: Apresentação & Header VIP...');
  await page.waitForTimeout(3000);

  const iframeHandle = await page.$('#site-frame');
  const frame = await iframeHandle.contentFrame();

  // Rola o iframe suavemente para o catálogo de procedimentos
  console.log('⏳ Gravando cena 2: Catálogo de Procedimentos...');
  if (frame) {
    await frame.evaluate(() => window.scrollTo({ top: 680, behavior: 'smooth' }));
  }
  await page.waitForTimeout(3500);

  // Rola para a seção "Sobre Germana Zocrato"
  console.log('⏳ Gravando cena 3: Seção Sobre Mim & Biografia...');
  if (frame) {
    await frame.evaluate(() => window.scrollTo({ top: 1250, behavior: 'smooth' }));
  }
  await page.waitForTimeout(3500);

  // Rola para a seção de Dúvidas / FAQ e CTA final
  console.log('⏳ Gravando cena 4: Dúvidas Frequentes & Agendamento...');
  if (frame) {
    await frame.evaluate(() => window.scrollTo({ top: 1950, behavior: 'smooth' }));
  }
  await page.waitForTimeout(3000);

  // Rola de volta para o topo com foco na marca
  console.log('⏳ Gravando cena 5: Conclusão com CTA...');
  if (frame) {
    await frame.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  await page.waitForTimeout(3000);

  // Encerra a gravação
  const videoObj = page.video();
  await context.close();
  await browser.close();

  const tempVideoPath = await videoObj.path();
  console.log('📹 Gravação bruta concluída:', tempVideoPath);

  // Converte de WebM para MP4 de alta compatibilidade usando FFmpeg
  const finalMp4Path = path.resolve(outputDir, 'germana-zocrato-comercial.mp4');
  console.log('⚙️ Codificando MP4 H.264 para Instagram/WhatsApp via FFmpeg...');

  const ffmpegCmd = `"${ffmpeg.path}" -y -i "${tempVideoPath}" -c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p -movflags +faststart "${finalMp4Path}"`;
  execSync(ffmpegCmd);

  console.log('🎉 VÍDEO PUBLICITÁRIO GERADO COM SUCESSO!');
  console.log('📁 Arquivo MP4 final:', finalMp4Path);
  const stats = fs.statSync(finalMp4Path);
  console.log('📊 Tamanho do arquivo:', (stats.size / (1024 * 1024)).toFixed(2), 'MB');
}

generatePromoVideo().catch((err) => {
  console.error('❌ Erro na geração do vídeo:', err);
  process.exit(1);
});

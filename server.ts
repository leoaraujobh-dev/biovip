import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Express API route for AI Microsite Generation
app.post('/api/generate-microsite', async (req, res) => {
  try {
    const { instagram, googleMaps, businessName, businessNiche, additionalInfo } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'Chave GEMINI_API_KEY não configurada no ambiente do servidor.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `
Você é um especialista mundial em Copywriting, UX/UI Design e Estratégia de Vendas para Microsites de Alta Conversão em dispositivos móveis (Instagram Bio, WhatsApp e Google Meu Negócio).

DADOS FORNECIDOS PELO CLIENTE:
- Instagram: @${instagram ? instagram.replace('@', '').trim() : 'Não informado'}
- Link Google Meu Negócio / Maps: ${googleMaps || 'Não informado'}
- Nome da Empresa / Profissional: ${businessName || 'Não informado'}
- Nicho de Atuação: ${businessNiche || 'Identificar pelo Instagram/Negócio'}
- Informações Adicionais / Serviços / Diferenciais: ${additionalInfo || 'Nenhuma informação adicional'}

OBJETIVO:
Gere a estrutura completa do microsite de alta conversão para este cliente. Escolha o melhor tema visual dentre os disponíveis e redija copys persuasivas com gatilhos mentais (autoridade, escassez, prova social).

RETORNE ESTRITAMENTE UM OBJETO JSON VÁLIDO (sem markdown no início ou no fim, sem explicações em texto) com a estrutura abaixo:

{
  "theme": "navyLaw", // Escolha um entre: navyLaw, darkGold, warmMentorship, rubyImperial, terracottaWarm, pinkGlam, champagneNude, barberVintage, barberRoyal, barberUrban, barberEmerald, roseGoldQuartz, emeraldNails, orchidGlow, pearlChampagne, bordeauxExecutive, charcoalLaw, electricCyanMentorship, terracottaMentor, sageMind, lavenderCalm, blackContrastFashion, sunsetPeach, carraraGold, bronzeGlowEstetica
  "styling": {
    "fontFamily": "Cinzel", // Escolha entre: Cinzel, Playfair Display, Cormorant Garamond, Montserrat, Plus Jakarta Sans
    "borderRadius": 20,
    "glassmorphism": true,
    "metallicBorders": true,
    "spotlightGlow": true,
    "photoHeight": 390,
    "photoScale": 100,
    "photoPosY": 25,
    "vignetteIntensity": 85,
    "photoFilter": "none" // Escolha entre: none, warm, editorial, noir, muted
  },
  "announcement": {
    "enabled": true,
    "badge": "CONSULTORIA VIP",
    "text": "Agenda aberta para novos atendimentos e consultorias.",
    "link": "#booking"
  },
  "profile": {
    "name": "NOME DO CLIENTE EM MAIÚSCULAS",
    "title": "SLOGAN OU CARGO PRINCIPAL EM MAIÚSCULAS",
    "tagline": "Frase persuasiva focada na dor ou desejo do cliente principal",
    "cursivePhrase": "Frase em caligrafia com elegância e tom humano",
    "avatarUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600", // Escolha uma foto Unsplash adequada ao nicho
    "aboutPhotoUrl": "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=600",
    "whatsapp": "5511999999999",
    "instagram": "${instagram ? instagram.replace('@', '').trim() : 'instagram'}",
    "location": "Endereço profissional do cliente ou cidade principal",
    "mapsUrl": "${googleMaps || 'https://maps.google.com'}"
  },
  "metrics": {
    "enabled": true,
    "stat1Value": "+500",
    "stat1Label": "CLIENTES",
    "stat2Value": "8 anos",
    "stat2Label": "DE EXPERIÊNCIA",
    "stat3Value": "98%",
    "stat3Label": "SATISFAÇÃO"
  },
  "actionCards": [
    {
      "id": "cta-1",
      "title": "TÍTULO EM MAIÚSCULAS DA AÇÃO PRINCIPAL VIP",
      "subtitle": "Subtítulo explicativo e convincente.",
      "icon": "Calendar",
      "linkType": "booking",
      "url": "#booking",
      "whatsappMessage": "Olá! Gostaria de informações sobre o agendamento.",
      "openInNewTab": true,
      "animation": "pulse-glow",
      "variant": "accent",
      "badgeText": "MAIS PROCURADO",
      "customBg": "#e2b857",
      "customText": "#0f172a",
      "bgImage": "",
      "imagePosition": "right",
      "cardImage": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      "imageFitStyle": "popout",
      "imageSize": 92,
      "ctaActionText": "AGENDAR AGORA"
    },
    {
      "id": "cta-2",
      "title": "CONFIRA NOSSOS SERVIÇOS & PACOTES",
      "subtitle": "Conheça o catálogo completo com valores e detalhes.",
      "icon": "Sparkles",
      "linkType": "catalogo",
      "url": "#catalogo",
      "whatsappMessage": "Olá! Gostaria de consultar a tabela de serviços.",
      "openInNewTab": false,
      "animation": "shimmer",
      "variant": "default",
      "badgeText": "",
      "customBg": "#ffffff",
      "customText": "#0f172a",
      "bgImage": "",
      "imagePosition": "left",
      "cardImage": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
      "imageFitStyle": "framed",
      "imageSize": 84,
      "ctaActionText": "VER MAIS"
    },
    {
      "id": "cta-3",
      "title": "FALE DIRETAMENTE NO WHATSAPP",
      "subtitle": "Tire suas dúvidas imediatamente com nossa equipe.",
      "icon": "MessageCircle",
      "linkType": "whatsapp",
      "url": "https://wa.me/...",
      "whatsappMessage": "Olá! Vi o link e gostaria de atendimento personalizado.",
      "openInNewTab": true,
      "animation": "pulse-glow",
      "variant": "default",
      "badgeText": "ONLINE",
      "customBg": "#25D366",
      "customText": "#000000",
      "bgImage": "",
      "imagePosition": "none",
      "cardImage": "",
      "imageFitStyle": "framed",
      "imageSize": 84,
      "ctaActionText": "CONVERSAR AGORA"
    }
  ],
  "processSteps": {
    "enabled": true,
    "headline": "Como funciona o atendimento?",
    "subtitle": "Simples, rápido e transparente em 3 passos",
    "steps": [
      {
        "id": "step-1",
        "number": "01",
        "title": "Primeiro Contato",
        "description": "Você nos envia uma mensagem ou faz a triagem inicial."
      },
      {
        "id": "step-2",
        "number": "02",
        "title": "Avaliação & Alinhamento",
        "description": "Entendemos seu cenário e definimos a melhor solução."
      },
      {
        "id": "step-3",
        "number": "03",
        "title": "Execução & Resultados",
        "description": "Realização do serviço com máxima qualidade e suporte."
      }
    ]
  },
  "studentGrid": {
    "enabled": true,
    "headline": "Resultados & Galeria do Trabalho",
    "subtitle": "Confira transformações reais dos nossos clientes",
    "photos": [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"
    ]
  },
  "locationCard": {
    "enabled": true,
    "headline": "Nossa Localização",
    "address": "Endereço ou Cidade informado",
    "buttonLabel": "Abrir no Google Maps",
    "mapsUrl": "${googleMaps || 'https://maps.google.com'}"
  },
  "services": {
    "enabled": true,
    "headline": "Principais Serviços & Tabela",
    "items": [
      {
        "id": "srv-1",
        "name": "Atendimento VIP / Consultoria Individual",
        "description": "Sessão dedicada com plano de ação exclusivo.",
        "price": "R$ 350",
        "duration": "1h00",
        "imageUrl": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=300"
      },
      {
        "id": "srv-2",
        "name": "Pacote Completo / Procedimento Especial",
        "description": "Acompanhamento integral com máxima garantia.",
        "price": "R$ 780",
        "duration": "1h30",
        "imageUrl": "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=300"
      }
    ]
  },
  "testimonials": {
    "enabled": true,
    "headline": "Depoimentos de Clientes",
    "items": [
      {
        "id": "t-1",
        "clientName": "Camila Oliveira",
        "city": "São Paulo - SP",
        "text": "Atendimento sensacional! Superou todas as minhas expectativas.",
        "rating": 5
      },
      {
        "id": "t-2",
        "clientName": "Rodrigo Santos",
        "city": "Campinas - SP",
        "text": "Excelente profissionalismo e rapidez. Recomendo fortemente!",
        "rating": 5
      }
    ]
  },
  "qualifierFunnel": {
    "enabled": true,
    "animation": "shimmer",
    "triggerButtonLabel": "TRIAGEM VIP / AVALIAÇÃO RÁPIDA",
    "triggerButtonSubtitle": "Descubra a melhor solução em 3 perguntas rápidas",
    "headline": "Triagem de Atendimento VIP",
    "subtitle": "Responda para receber um orçamento sob medida no WhatsApp",
    "questions": [
      {
        "id": "q1",
        "title": "Qual é o seu objetivo principal hoje?",
        "options": [
          "Agendar uma consulta ou procedimento",
          "Orçamento ou consultoria personalizada",
          "Tirar dúvidas sobre os pacotes"
        ]
      },
      {
        "id": "q2",
        "title": "Qual é a sua urgência de atendimento?",
        "options": [
          "Urgente para esta semana",
          "Próximas 2 semanas",
          "Apenas pesquisando prazos"
        ]
      },
      {
        "id": "q3",
        "title": "Qual é o seu melhor turno para contato?",
        "options": [
          "Período da Manhã",
          "Período da Tarde",
          "Horário Comercial Flexível"
        ]
      }
    ]
  },
  "aboutMe": {
    "enabled": true,
    "headline": "Sobre Nós",
    "paragraph": "Texto persuasivo destacando os diferenciais do negócio e o compromisso com a satisfação de cada cliente.",
    "closingPhrase": "Sua confiança, nosso maior compromisso."
  },
  "faq": {
    "enabled": true,
    "headline": "Dúvidas Frequentes",
    "items": [
      {
        "id": "faq-1",
        "question": "Como funciona a primeira consulta ou agendamento?",
        "answer": "Basta clicar nos botões do WhatsApp ou preencher a triagem VIP para receber o direcionamento."
      },
      {
        "id": "faq-2",
        "question": "É possível atendimento online ou presencial?",
        "answer": "Oferecemos modalidades presenciais em nosso espaço e atendimentos online com total comodidade."
      }
    ]
  },
  "conversion": {
    "metaPixelId": "",
    "googleAnalyticsId": "",
    "defaultWhatsappMsg": "Olá! Gostaria de informações sobre os serviços."
  }
}
`;

    // Using gemini-3.8-flash for generation tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const rawText = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Não foi possível interpretar a resposta estruturada da IA.');
      }
    }

    return res.json({
      success: true,
      data: parsedData,
    });
  } catch (err: any) {
    console.error('Erro na rota /api/generate-microsite:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Erro ao processar solicitação com a IA Gemini.',
    });
  }
});

// Express API route for AI Copywriting Optimization
app.post('/api/optimize-copy', async (req, res) => {
  try {
    const { originalText, fieldType, niche, tone } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'Chave GEMINI_API_KEY não configurada no servidor.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' }
      }
    });

    const prompt = `
Você é um Copywriter de nível mundial especializado em alta conversão para páginas mobile (Instagram Bio, WhatsApp e Tráfego Pago).
Refine o seguinte texto original para o campo "${fieldType || 'Texto do Microsite'}" no nicho "${niche || 'Geral'}".
Tom desejado: ${tone || 'Elegante, Persuasivo e de Alta Autoridade'}.

TEXTO ORIGINAL:
"${originalText || ''}"

Gere 3 variações extremamente atraentes e otimizadas em Português do Brasil:
1. "Alta Conversão & Urgência" (Foco em ação imediata e escassez)
2. "Elegante & Premium" (Foco em exclusividade, sofisticação e status)
3. "Direto ao Ponto & Claro" (Foco em benefícios claros e solução sem rodeios)

RETORNE ESTRITAMENTE UM OBJETO JSON VÁLIDO:
{
  "variations": [
    { "type": "Alta Conversão", "text": "Texto opção 1" },
    { "type": "Elegante & Premium", "text": "Texto opção 2" },
    { "type": "Direto & Claro", "text": "Texto opção 3" }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.8,
      },
    });

    const rawText = response.text || '';
    let parsedData = JSON.parse(rawText);

    return res.json({
      success: true,
      variations: parsedData.variations || [],
    });
  } catch (err: any) {
    console.error('Erro na rota /api/optimize-copy:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Erro ao otimizar copy com a IA Gemini.',
    });
  }
});

// Vite Dev Server middleware or production static server
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const fs = await import('fs');
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Express dev server running on port ${PORT}`);
});


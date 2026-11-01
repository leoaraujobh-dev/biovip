import { GoogleGenAI } from '@google/genai';

const GEMINI_MODELS = ['gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { originalText, fieldType, niche, tone } = req.body || {};

  const buildFallbackVariations = () => [
    {
      type: 'Alta Conversão',
      text: originalText
        ? `${originalText} — Garanta seu horário exclusivo hoje mesmo!`
        : 'Atendimento VIP com vagas limitadas nesta semana. Reserve seu horário agora!',
    },
    {
      type: 'Elegante & Premium',
      text: originalText
        ? `Experiência exclusiva: ${originalText}`
        : 'Excelência, sofisticação e cuidado personalizado em cada detalhe.',
    },
    {
      type: 'Direto & Claro',
      text: originalText || 'Agende seu atendimento de forma rápida e prática pelo WhatsApp.',
    },
  ];

  try {
    const apiKey =
      (process.env.GEMINI_API_KEY || '').trim() ||
      (process.env.GOOGLE_API_KEY || '').trim() ||
      (process.env.GOOGLE_GENAI_API_KEY || '').trim() ||
      (process.env.VITE_GEMINI_API_KEY || '').trim() ||
      (req.body?.geminiApiKey || '').trim();

    if (!apiKey) {
      return res.status(200).json({
        success: true,
        variations: buildFallbackVariations(),
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' },
      },
    });

    const isTaglineField = /slogan|tagline|posicionamento|bio curta/i.test(String(fieldType || ''));

    const prompt = `
Você é um Copywriter de nível mundial especializado em alta conversão para páginas mobile (Instagram Bio, WhatsApp e Tráfego Pago).
Refine o seguinte texto original para o campo "${fieldType || 'Texto do Microsite'}" no nicho "${niche || 'Geral'}".
Tom desejado: ${tone || 'Elegante, Persuasivo e de Alta Autoridade'}.

${isTaglineField ? 'REGRA CRÍTICA DE TAMANHO: Como este campo é o Slogan de Posicionamento do cabeçalho mobile, cada variação DEVE ter NO MÁXIMO 55 a 70 caracteres para caber com elegância em até 2 linhas sem truncar ou usar reticências.' : ''}

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

    for (const modelName of GEMINI_MODELS) {
      try {
        const response = await Promise.race([
          ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.8,
            },
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout calling ${modelName}`)), 12000)
          ),
        ]);

        const rawText = response.text || '';
        const parsedData = JSON.parse(rawText);
        if (Array.isArray(parsedData?.variations) && parsedData.variations.length > 0) {
          return res.status(200).json({
            success: true,
            variations: parsedData.variations,
          });
        }
      } catch (err: any) {
        console.warn(`Modelo ${modelName} falhou em optimize-copy:`, err?.message);
      }
    }

    return res.status(200).json({
      success: true,
      variations: buildFallbackVariations(),
    });
  } catch (err: any) {
    console.error('Erro na rota /api/optimize-copy:', err);
    return res.status(200).json({
      success: true,
      variations: buildFallbackVariations(),
    });
  }
}

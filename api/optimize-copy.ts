import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { originalText, fieldType, niche, tone } = req.body || {};

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'Chave GEMINI_API_KEY não configurada nas variáveis de ambiente da Vercel.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' },
      },
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
    const parsedData = JSON.parse(rawText);

    return res.status(200).json({
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
}

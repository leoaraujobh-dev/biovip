import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { instagram, googleMaps, businessName, businessNiche, additionalInfo } = req.body || {};

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
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `
Você é um especialista mundial em Copywriting, UX/UI Design e Estratégia de Vendas para Microsites de Alta Conversão em dispositivos móveis (Instagram Bio, WhatsApp e Google Meu Negócio).

DADOS FORNECIDOS PELO CLIENTE:
- Instagram: @${instagram ? String(instagram).replace('@', '').trim() : 'Não informado'}
- Link Google Meu Negócio / Maps: ${googleMaps || 'Não informado'}
- Nome da Empresa / Profissional: ${businessName || 'Não informado'}
- Nicho de Atuação: ${businessNiche || 'Identificar pelo Instagram/Negócio'}
- Informações Adicionais / Serviços / Diferenciais: ${additionalInfo || 'Nenhuma informação adicional'}

OBJETIVO:
Gere a estrutura completa do microsite de alta conversão para este cliente. Escolha o melhor tema visual dentre os disponíveis e redija copys persuasivas com gatilhos mentais (autoridade, escassez, prova social).

RETORNE ESTRITAMENTE UM OBJETO JSON VÁLIDO (sem markdown no início ou no fim, sem explicações em texto) com a estrutura abaixo:

{
  "theme": "navyLaw",
  "styling": {
    "fontFamily": "Cinzel",
    "borderRadius": 20,
    "glassmorphism": true,
    "metallicBorders": true,
    "spotlightGlow": true,
    "photoHeight": 390,
    "photoScale": 100,
    "photoPosY": 25,
    "vignetteIntensity": 85,
    "photoFilter": "none"
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
    "avatarUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    "aboutPhotoUrl": "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=600",
    "whatsapp": "5511999999999",
    "instagram": "${instagram ? String(instagram).replace('@', '').trim() : 'instagram'}",
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

    return res.status(200).json({
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
}

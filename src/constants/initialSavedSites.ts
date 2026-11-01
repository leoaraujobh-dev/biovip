import type { SavedMicrosite } from '../types/microsite';

export const INITIAL_SAVED_SITES: SavedMicrosite[] = [
  {
    "id": "site-1",
    "clientName": "Don Corleone Barber Club",
    "clientPhone": "5511988887777",
    "clientEmail": "contato@doncorleone.com.br",
    "nicheCategory": "Barbearia & Grooming",
    "createdAt": "2026-09-15",
    "dueDate": "2026-11-15",
    "monthlyFee": 49.9,
    "maintenancePlan": "pro_4",
    "creationFee": 197,
    "isFirstMonth": false,
    "status": "pago",
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "updatesThisMonth": 2,
    "lastUpdated": "2026-10-21",
    "domainType": "subdomain",
    "subdomain": "doncorleone",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 52,
    "pageViews": 240,
    "trafficSources": {
      "instagram": 110,
      "tiktok": 45,
      "googleMaps": 60,
      "paidAds": 15,
      "direct": 10
    },
    "isLandingModel": false,
    "data": {
      "theme": "barberVintage",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {
        "announcement": {
          "bgColor": "#d97706",
          "textColor": "#0c0a09",
          "titleColor": "#0c0a09"
        },
        "hero": {
          "headlineColor": "#fbbf24",
          "titleColor": "#f5efe6",
          "textColor": "#c4b5a2",
          "accentColor": "#d97706"
        },
        "urgencyTimer": {
          "bgColor": "rgba(217, 119, 6, 0.14)",
          "headlineColor": "#fbbf24",
          "titleColor": "#fbbf24",
          "textColor": "#c4b5a2",
          "accentColor": "#d97706"
        },
        "qualifierFunnel": {
          "bgColor": "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
          "titleColor": "#0c0a09",
          "textColor": "#261b14"
        },
        "actionCards": {
          "bgColor": "linear-gradient(145deg, #211c18 0%, #161310 100%)",
          "titleColor": "#f5efe6",
          "textColor": "#b8a996",
          "accentColor": "#d97706"
        },
        "metrics": {
          "bgColor": "rgba(217, 119, 6, 0.14)",
          "titleColor": "#fbbf24",
          "textColor": "#c4b5a2",
          "accentColor": "#d97706"
        },
        "processSteps": {
          "bgColor": "rgba(217, 119, 6, 0.14)",
          "headlineColor": "#fbbf24",
          "titleColor": "#f5efe6",
          "textColor": "#c4b5a2",
          "accentColor": "#d97706"
        },
        "services": {
          "bgColor": "rgba(33, 28, 24, 0.7)",
          "headlineColor": "#fbbf24",
          "titleColor": "#f5efe6",
          "textColor": "#c4b5a2",
          "accentColor": "#d97706"
        },
        "studentGrid": {
          "headlineColor": "#fbbf24",
          "titleColor": "#fbbf24",
          "textColor": "#c4b5a2",
          "accentColor": "#d97706"
        },
        "locationCard": {
          "bgColor": "rgba(217, 119, 6, 0.14)",
          "headlineColor": "#fbbf24",
          "titleColor": "#f5efe6",
          "textColor": "#c4b5a2",
          "accentColor": "#fbbf24"
        },
        "aboutMe": {
          "headlineColor": "#fbbf24",
          "titleColor": "#fbbf24",
          "textColor": "#f5efe6"
        },
        "testimonials": {
          "bgColor": "rgba(217, 119, 6, 0.14)",
          "headlineColor": "#fbbf24",
          "titleColor": "#f5efe6",
          "textColor": "#c4b5a2",
          "accentColor": "#fbbf24"
        },
        "faq": {
          "bgColor": "rgba(217, 119, 6, 0.12)",
          "headlineColor": "#fbbf24",
          "titleColor": "#f5efe6",
          "textColor": "#c4b5a2"
        },
        "footer": {
          "textColor": "#a89984",
          "accentColor": "#fbbf24"
        }
      },
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
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "CONSULTORIA VIP",
        "text": "Agenda de consultorias e atendimentos aberta.",
        "link": "#agendar"
      },
      "profile": {
        "name": "DON CORLEONE BARBER",
        "title": "BARBEARIA CLÁSSICA & VISAGISMO MASCULINO",
        "tagline": "Cerveja artesanal gelada, toalha quente e precisão na navalha.",
        "cursivePhrase": "Tradição, excelência e estilo em cada detalhe.",
        "avatarUrl": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5511999999999",
        "instagram": "dramarinaalmeida",
        "location": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "mapsUrl": "https://maps.google.com"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+500",
        "stat1Label": "CLIENTES",
        "stat2Value": "8 anos",
        "stat2Label": "DE EXPERIÊNCIA",
        "stat3Value": "95%",
        "stat3Label": "DE SATISFAÇÃO"
      },
      "actionCards": [
        {
          "id": "barber-s1-cta1",
          "title": "AGENDAR MEU HORÁRIO AGORA",
          "subtitle": "Escolha seu barbeiro, serviço e horário em 30 segundos.",
          "icon": "Scissors",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá! Gostaria de agendar uma consulta.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "default",
          "badgeText": "SEM FILA",
          "customBg": "#d97706",
          "customText": "#000000",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 96,
          "ctaActionText": "AGENDAR AGORA"
        },
        {
          "id": "barber-s1-cta2",
          "title": "CLUBE DE ASSINATURA VIP",
          "subtitle": "Corte e barba ilimitados o mês inteiro a partir de R$ 149,90.",
          "icon": "Star",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "Olá! Gostaria de informações sobre o Guia Estratégico.",
          "openInNewTab": false,
          "animation": "none",
          "variant": "default",
          "badgeText": "MAIS ASSINADO",
          "customBg": "#211c18",
          "customText": "#f5efe6",
          "bgImage": "",
          "imagePosition": "left",
          "cardImage": "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "BAIXE AGORA"
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o processo?",
        "subtitle": "Simples, seguro e totalmente transparente em 3 etapas",
        "steps": [
          {
            "id": "step-1",
            "number": "01",
            "title": "Primeiro Contato & Triagem",
            "description": "Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade."
          },
          {
            "id": "step-2",
            "number": "02",
            "title": "Consulta Estratégica",
            "description": "Análise aprofundada da sua situação com plano de ação sob medida."
          },
          {
            "id": "step-3",
            "number": "03",
            "title": "Execução & Acompanhamento",
            "description": "Defesa contínua e comunicação clara em todas as etapas."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e excelência jurídica",
        "badge": "ESTRUTURA VIP",
        "layout": "smart_masonry",
        "aspectRatio": "auto",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Nossa Localização",
        "address": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "buttonLabel": "Abrir no Google Maps",
        "mapsUrl": "https://maps.google.com",
        "hours": "Seg a Sáb · 08:30 às 19:30",
        "openStatus": "ABERTO AGORA · HORA MARCADA",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Menu de Serviços & Grooming",
        "subtitle": "Procedimentos, consultorias e soluções sob medida para o seu objetivo",
        "badge": "CATÁLOGO VIP",
        "layout": "list",
        "items": [
          {
            "id": "srv-dc-1",
            "name": "Combo Gentleman (Corte + Barboterapia)",
            "description": "Toalha quente, massagem facial com ozônio e bebida cortesia.",
            "price": "R$ 110",
            "duration": "1h15",
            "featured": true,
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp",
            "imageUrl": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=500"
          },
          {
            "id": "srv-dc-2",
            "name": "Corte Degradê / Fade Navalhado",
            "description": "Acabamento de alta precisão, lavagem especial e pomada matte.",
            "price": "R$ 70",
            "duration": "45min",
            "featured": false,
            "badge": "CLÁSSICO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp",
            "imageUrl": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=500"
          }
        ]
      },
      "trustBadges": {
        "enabled": true,
        "items": [
          {
            "id": "tb-1",
            "icon": "credit-card",
            "title": "Cartão até 12x",
            "subtitle": "Crédito e Débito",
            "color": "emerald"
          },
          {
            "id": "tb-2",
            "icon": "zap",
            "title": "Pix Instantâneo",
            "subtitle": "Confirmação na hora",
            "color": "amber"
          },
          {
            "id": "tb-3",
            "icon": "car",
            "title": "Fácil Acesso",
            "subtitle": "Local seguro",
            "color": "sky"
          },
          {
            "id": "tb-4",
            "icon": "shield",
            "title": "Espaço VIP",
            "subtitle": "Climatizado & Café",
            "color": "purple"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre mim",
        "photoUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700",
        "paragraph": "Com mais de 8 anos de atuação, acredito que a prestação de serviços deve unir excelência técnica e acolhimento humano. Cada pessoa traz uma história única que merece atenção dedicada e soluções assertivas.",
        "closingPhrase": "Sua segurança jurídica, meu compromisso."
      },
      "faq": {
        "enabled": true,
        "headline": "Dúvidas Frequentes",
        "items": [
          {
            "id": "faq-1",
            "question": "Como funciona a primeira consulta?",
            "answer": "Realizamos um atendimento inicial para entender seu caso a fundo e traçar a melhor estratégia."
          },
          {
            "id": "faq-2",
            "question": "O atendimento pode ser 100% online?",
            "answer": "Sim, atendemos clientes do Brasil e do exterior por videoconferência com total sigilo e comodidade."
          },
          {
            "id": "faq-3",
            "question": "Quais áreas você atende?",
            "answer": "Atuação especializada em consultoria jurídica, contratos, planejamento familiar e previdenciário."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "DON CORLEONE BARBERSHOP — Barbearia Tradicional & Visagismo VIP",
        "metaDescription": "Corte artesanal de precisão, barboterapia e ambiente clássico executivo. Agende seu horário com exclusividade.",
        "ogImageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
        "keywords": "advogada, consultoria, direito, atendimento vip, advocacia"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "isCustomized": true,
    "isTemporaryDemo": false,
    "demoDurationDays": 7,
    "crmStage": "demonstracao",
    "proposalValue": 197,
    "prospectNotes": "",
    "prospectInstagram": "dramarinaalmeida",
    "prospectSituation": "wa_direto"
  },
  {
    "id": "site-2",
    "clientName": "Dra. Marina Almeida Advocacia",
    "clientPhone": "5511999999999",
    "clientEmail": "marina@almeidaadv.com.br",
    "nicheCategory": "Jurídico & Executivo",
    "createdAt": "2026-08-10",
    "dueDate": "2026-10-20",
    "monthlyFee": 79.9,
    "maintenancePlan": "vip_unlimited",
    "creationFee": 297,
    "isFirstMonth": false,
    "status": "disabled",
    "updatesThisMonth": 5,
    "lastUpdated": "2026-10-18",
    "domainType": "subdomain",
    "subdomain": "almeidaadv",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 68,
    "pageViews": 380,
    "trafficSources": {
      "instagram": 190,
      "tiktok": 30,
      "googleMaps": 90,
      "paidAds": 50,
      "direct": 20
    },
    "data": {
      "theme": "navyLaw",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {
        "announcement": {
          "bgColor": "#e2b857",
          "textColor": "#0f172a",
          "titleColor": "#0f172a"
        },
        "hero": {
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "urgencyTimer": {
          "bgColor": "rgba(226, 184, 87, 0.12)",
          "headlineColor": "#e2b857",
          "titleColor": "#e2b857",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "qualifierFunnel": {
          "bgColor": "linear-gradient(135deg, #e2b857 0%, #c99c3a 100%)",
          "titleColor": "#0f172a",
          "textColor": "#1e293b"
        },
        "actionCards": {
          "bgColor": "#ffffff",
          "titleColor": "#0f172a",
          "textColor": "#475569",
          "accentColor": "#e2b857"
        },
        "metrics": {
          "bgColor": "rgba(226, 184, 87, 0.12)",
          "titleColor": "#e2b857",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "processSteps": {
          "bgColor": "rgba(226, 184, 87, 0.12)",
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "services": {
          "bgColor": "rgba(255, 255, 255, 0.05)",
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "studentGrid": {
          "headlineColor": "#e2b857",
          "titleColor": "#e2b857",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "locationCard": {
          "bgColor": "rgba(226, 184, 87, 0.12)",
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "aboutMe": {
          "headlineColor": "#e2b857",
          "titleColor": "#e2b857",
          "textColor": "#e2e8f0"
        },
        "testimonials": {
          "bgColor": "rgba(226, 184, 87, 0.12)",
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1",
          "accentColor": "#fbbf24"
        },
        "faq": {
          "bgColor": "rgba(226, 184, 87, 0.1)",
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1"
        },
        "footer": {
          "textColor": "#94a3b8",
          "accentColor": "#e2b857"
        }
      },
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
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "CONSULTORIA VIP",
        "text": "Agenda de consultorias e atendimentos aberta.",
        "link": "#agendar"
      },
      "profile": {
        "name": "DRA. MARINA ALMEIDA",
        "title": "ADVOCACIA ESTRATÉGICA",
        "tagline": "Defesa de direitos com atendimento personalizado e humanizado.",
        "cursivePhrase": "Compromisso, ética e segurança para você.",
        "avatarUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5511999999999",
        "instagram": "dramarinaalmeida",
        "location": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "mapsUrl": "https://maps.google.com"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+500",
        "stat1Label": "CLIENTES",
        "stat2Value": "8 anos",
        "stat2Label": "DE EXPERIÊNCIA",
        "stat3Value": "95%",
        "stat3Label": "DE SATISFAÇÃO"
      },
      "actionCards": [
        {
          "id": "cta-1",
          "title": "MENTORIA & CONSULTORIA VIP",
          "subtitle": "Atendimento presencial ou online com acompanhamento estratégico.",
          "icon": "Calendar",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá! Gostaria de agendar uma consulta.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "default",
          "badgeText": "AGENDA ABERTA",
          "customBg": "#e2b857",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 96,
          "ctaActionText": "AGENDAR AGORA"
        },
        {
          "id": "cta-2",
          "title": "GUIA ESTRATÉGICO & PLANEJAMENTO",
          "subtitle": "Soluções completas e materiais exclusivos passo a passo.",
          "icon": "Scale",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "Olá! Gostaria de informações sobre o Guia Estratégico.",
          "openInNewTab": false,
          "animation": "none",
          "variant": "default",
          "badgeText": "",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "left",
          "cardImage": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "BAIXE AGORA"
        },
        {
          "id": "cta-3",
          "title": "DIREITO PREVIDENCIÁRIO",
          "subtitle": "Aposentadorias, benefícios e planejamento previdenciário.",
          "icon": "Briefcase",
          "linkType": "custom",
          "url": "https://",
          "whatsappMessage": "Olá! Gostaria de informações sobre Direito Previdenciário.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": ""
        },
        {
          "id": "cta-4",
          "title": "FALE COMIGO NO WHATSAPP",
          "subtitle": "Tire dúvidas e receba atendimento personalizado.",
          "icon": "MessageCircle",
          "linkType": "whatsapp",
          "url": "https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20atendimento.",
          "whatsappMessage": "Olá! Vi seu link na bio e gostaria de atendimento personalizado.",
          "openInNewTab": true,
          "animation": "shimmer",
          "variant": "default",
          "badgeText": "ONLINE",
          "customBg": "#25D366",
          "customText": "#000000",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "CLIQUE AQUI"
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o processo?",
        "subtitle": "Simples, seguro e totalmente transparente em 3 etapas",
        "steps": [
          {
            "id": "step-1",
            "number": "01",
            "title": "Primeiro Contato & Triagem",
            "description": "Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade."
          },
          {
            "id": "step-2",
            "number": "02",
            "title": "Consulta Estratégica",
            "description": "Análise aprofundada da sua situação com plano de ação sob medida."
          },
          {
            "id": "step-3",
            "number": "03",
            "title": "Execução & Acompanhamento",
            "description": "Defesa contínua e comunicação clara em todas as etapas."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e excelência jurídica",
        "badge": "ESTRUTURA VIP",
        "layout": "smart_masonry",
        "aspectRatio": "auto",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Nossa Localização",
        "address": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "buttonLabel": "Abrir no Google Maps",
        "mapsUrl": "https://maps.google.com",
        "hours": "Seg a Sáb · 08:30 às 19:30",
        "openStatus": "ABERTO AGORA · HORA MARCADA",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Como posso te ajudar",
        "subtitle": "Procedimentos, consultorias e soluções sob medida para o seu objetivo",
        "badge": "CATÁLOGO VIP",
        "layout": "list",
        "items": [
          {
            "id": "srv-1",
            "name": "Consultoria Estratégica Individual",
            "description": "Análise completa do seu cenário com orientações práticas imediatas.",
            "price": "R$ 350",
            "oldPrice": "R$ 490",
            "duration": "1h30",
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar",
            "actionType": "booking",
            "customUrl": "",
            "featured": true,
            "imageUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500"
          },
          {
            "id": "srv-2",
            "name": "Planejamento e Parecer Técnico",
            "description": "Documento fundamentado com plano de ação preventivo ou contencioso.",
            "price": "R$ 780",
            "oldPrice": "",
            "duration": "3 dias",
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar",
            "actionType": "booking",
            "customUrl": "",
            "featured": false,
            "imageUrl": "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=500"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre mim",
        "paragraph": "Com mais de 8 anos de atuação, acredito que a prestação de serviços deve unir excelência técnica e acolhimento humano. Cada pessoa traz uma história única que merece atenção dedicada e soluções assertivas.",
        "closingPhrase": "Sua segurança jurídica, meu compromisso."
      },
      "faq": {
        "enabled": true,
        "headline": "Dúvidas Frequentes",
        "items": [
          {
            "id": "faq-1",
            "question": "Como funciona a primeira consulta?",
            "answer": "Realizamos um atendimento inicial para entender seu caso a fundo e traçar a melhor estratégia."
          },
          {
            "id": "faq-2",
            "question": "O atendimento pode ser 100% online?",
            "answer": "Sim, atendemos clientes do Brasil e do exterior por videoconferência com total sigilo e comodidade."
          },
          {
            "id": "faq-3",
            "question": "Quais áreas você atende?",
            "answer": "Atuação especializada em consultoria jurídica, contratos, planejamento familiar e previdenciário."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "DRA. MARINA ALMEIDA — Advocacia Estratégica & Consultoria VIP",
        "metaDescription": "Atendimento jurídico humanizado e focado em resultados. Agende sua consultoria presencial ou online.",
        "ogImageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
        "keywords": "advogada, consultoria, direito, atendimento vip, advocacia"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": true
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 12,
    "edicoesBloqueadas": true,
    "linkStatus": "manutencao",
    "autoDisabledByOverdue": true,
    "isLandingModel": false,
    "isUnderConstruction": false,
    "underConstruction": false,
    "isCustomized": true,
    "manualOverrideUntil": "2026-10-28"
  },
  {
    "id": "real-niche-law",
    "clientName": "DRA. MARINA ALMEIDA",
    "clientPhone": "5531991390202",
    "clientEmail": "contato@dramarina.com.br",
    "nicheCategory": "Advocacia & Consultoria",
    "createdAt": "2026-11-01",
    "dueDate": "2026-12-01",
    "monthlyFee": 197,
    "status": "active",
    "updatesThisMonth": 1,
    "lastUpdated": "2026-11-01",
    "domainType": "subdomain",
    "subdomain": "dramarina",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 42,
    "pageViews": 180,
    "trafficSources": {
      "instagram": 110,
      "tiktok": 25,
      "googleMaps": 30,
      "paidAds": 15,
      "direct": 10
    },
    "isLandingModel": true,
    "data": {
      "theme": "navyLaw",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {
        "announcement": {
          "bgColor": "#e2b857",
          "textColor": "#0f172a",
          "titleColor": "#0f172a"
        },
        "hero": {
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "urgencyTimer": {
          "bgColor": "rgba(226, 184, 87, 0.12)",
          "headlineColor": "#e2b857",
          "titleColor": "#e2b857",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "qualifierFunnel": {
          "bgColor": "linear-gradient(135deg, #e2b857 0%, #c99c3a 100%)",
          "titleColor": "#0f172a",
          "textColor": "#1e293b"
        },
        "actionCards": {
          "bgColor": "#ffffff",
          "titleColor": "#0f172a",
          "textColor": "#475569",
          "accentColor": "#e2b857"
        },
        "metrics": {
          "bgColor": "rgba(226, 184, 87, 0.12)",
          "titleColor": "#e2b857",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "processSteps": {
          "bgColor": "rgba(226, 184, 87, 0.12)",
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "services": {
          "bgColor": "rgba(255, 255, 255, 0.05)",
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "studentGrid": {
          "headlineColor": "#e2b857",
          "titleColor": "#e2b857",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "locationCard": {
          "bgColor": "rgba(226, 184, 87, 0.12)",
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1",
          "accentColor": "#e2b857"
        },
        "aboutMe": {
          "headlineColor": "#e2b857",
          "titleColor": "#e2b857",
          "textColor": "#e2e8f0"
        },
        "testimonials": {
          "bgColor": "rgba(226, 184, 87, 0.12)",
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1",
          "accentColor": "#fbbf24"
        },
        "faq": {
          "bgColor": "rgba(226, 184, 87, 0.1)",
          "headlineColor": "#e2b857",
          "titleColor": "#ffffff",
          "textColor": "#cbd5e1"
        },
        "footer": {
          "textColor": "#94a3b8",
          "accentColor": "#e2b857"
        }
      },
      "styling": {
        "fontFamily": "Cinzel",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 22,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "CONSULTORIA JURÍDICA VIP",
        "text": "Atendimento presencial e digital com sigilo absoluto em todo o Brasil.",
        "link": "#catalogo"
      },
      "profile": {
        "name": "DRA. MARINA ALMEIDA",
        "title": "ADVOCACIA ESTRATÉGICA & PATRIMONIAL",
        "tagline": "Defesa técnica de excelência em Direito Empresarial, Família, Sucessões e Planejamento Previdenciário.",
        "cursivePhrase": "Compromisso, ética e segurança jurídica para você.",
        "avatarUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5531991390202",
        "instagram": "dramarinaalmeida.adv",
        "location": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Av.%20Paulista%2C%201200%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+650",
        "stat1Label": "CASOS & PARECERES",
        "stat2Value": "12 Anos",
        "stat2Label": "DE EXPERIÊNCIA",
        "stat3Value": "100%",
        "stat3Label": "SIGILO & RIGOR"
      },
      "actionCards": [
        {
          "id": "law-cta-1",
          "title": "AGENDAR CONSULTA JURÍDICA VIP",
          "subtitle": "Atendimento presencial ou por videoconferência com análise prévia.",
          "icon": "Scale",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá Dra. Marina! Gostaria de agendar uma consulta jurídica.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "AGENDA ABERTA",
          "customBg": "#e2b857",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 92,
          "ctaActionText": "SOLICITAR HORÁRIO"
        },
        {
          "id": "law-cta-2",
          "title": "GUIA ESTRATÉGICO & PLANEJAMENTO",
          "subtitle": "Materiais exclusivos sobre blindagem patrimonial e previdência.",
          "icon": "Briefcase",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "",
          "openInNewTab": false,
          "animation": "none",
          "variant": "default",
          "badgeText": "",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "left",
          "cardImage": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "CONSULTAR ÁREAS"
        },
        {
          "id": "law-cta-3",
          "title": "FALAR COM O ESCRITÓRIO NO WHATSAPP",
          "subtitle": "Envie sua demanda para triagem rápida com nossa equipe jurídica.",
          "icon": "MessageCircle",
          "linkType": "whatsapp",
          "url": "",
          "whatsappMessage": "Olá! Gostaria de atendimento jurídico personalizado.",
          "openInNewTab": true,
          "animation": "shimmer",
          "variant": "default",
          "badgeText": "PLANTÃO",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "INICIAR ATENDIMENTO"
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o atendimento?",
        "subtitle": "Jornada simples, ágil e transparente em 3 etapas",
        "steps": [
          {
            "id": "law-s1",
            "number": "01",
            "title": "Triagem Sigilosa no WhatsApp",
            "description": "Relate sua demanda para análise preliminar da equipe jurídica."
          },
          {
            "id": "law-s2",
            "number": "02",
            "title": "Consulta & Parecer Técnico",
            "description": "Reunião presencial na Av. Paulista ou por videoconferência."
          },
          {
            "id": "law-s3",
            "number": "03",
            "title": "Defesa & Blindagem Patrimonial",
            "description": "Atuação estratégica com relatórios periódicos de andamento."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e resultados",
        "badge": "GALERIA VIP",
        "layout": "grid3",
        "aspectRatio": "square",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Localização & Horários",
        "address": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "buttonLabel": "Abrir Rota no Google Maps",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Av.%20Paulista%2C%201200%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP",
        "hours": "Seg a Sex · 09:00 às 19:00",
        "openStatus": "PLANTÃO JURÍDICO ATIVO",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Áreas de Atuação & Consultoria",
        "subtitle": "Atendimento personalizado com excelência técnica e agendamento prioritário",
        "badge": "CATÁLOGO OFICIAL",
        "layout": "featured",
        "items": [
          {
            "id": "srv-j1",
            "name": "Consultoria Jurídica Estratégica Individual",
            "description": "Diagnóstico completo do caso com plano de ação preventivo ou contencioso.",
            "price": "R$ 450",
            "duration": "1h30",
            "imageUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500",
            "featured": true,
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-j2",
            "name": "Planejamento Patrimonial & Sucessório",
            "description": "Estruturação de Holding Familiar, testamentos e proteção de ativos.",
            "price": "Sob Consulta",
            "duration": "Personalizado",
            "imageUrl": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-j3",
            "name": "Planejamento Previdenciário Completo",
            "description": "Cálculo e projeção do melhor benefício de aposentadoria com parecer técnico.",
            "price": "R$ 890",
            "duration": "5 dias",
            "imageUrl": "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          }
        ]
      },
      "trustBadges": {
        "enabled": true,
        "items": [
          {
            "id": "tb-1",
            "icon": "credit-card",
            "title": "Cartão até 12x",
            "subtitle": "Crédito e Débito",
            "color": "emerald"
          },
          {
            "id": "tb-2",
            "icon": "zap",
            "title": "Pix Instantâneo",
            "subtitle": "Confirmação na hora",
            "color": "amber"
          },
          {
            "id": "tb-3",
            "icon": "car",
            "title": "Fácil Acesso",
            "subtitle": "Local seguro",
            "color": "sky"
          },
          {
            "id": "tb-4",
            "icon": "shield",
            "title": "Espaço VIP",
            "subtitle": "Climatizado & Café",
            "color": "purple"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre DRA. MARINA ALMEIDA",
        "photoUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700",
        "paragraph": "Com mais de 12 anos de atuação em Direito Empresarial, Sucessório e Planejamento Previdenciário, nosso escritório combina rigor técnico, sigilo absoluto e atendimento direto para proteger seu patrimônio.",
        "closingPhrase": "Compromisso ético e segurança jurídica em cada decisão."
      },
      "faq": {
        "enabled": true,
        "headline": "Perguntas Frequentes",
        "items": [
          {
            "id": "lf-1",
            "question": "Realizam consultas por videoconferência para outros estados?",
            "answer": "Sim. Atendemos clientes em todo o Brasil e no exterior com validade jurídica digital."
          },
          {
            "id": "lf-2",
            "question": "Como funciona a análise de contratos e holdings?",
            "answer": "Na consulta estratégica realizamos o diagnóstico patrimonial completo e apresentamos o plano de estruturação."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "DRA. MARINA ALMEIDA — ADVOCACIA ESTRATÉGICA & PATRIMONIAL",
        "metaDescription": "Defesa técnica de excelência em Direito Empresarial, Família, Sucessões e Planejamento Previdenciário.",
        "ogImageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900",
        "keywords": "Jurídico, microsite, agendamento vip, dra. marina almeida"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false,
    "isCustomized": true
  },
  {
    "id": "real-niche-nails",
    "clientName": "LARISSA ALMEIDA",
    "clientPhone": "5531991390202",
    "clientEmail": "contato@larissanails.com.br",
    "nicheCategory": "Beleza & Estética",
    "createdAt": "2026-11-01",
    "dueDate": "2026-12-01",
    "monthlyFee": 197,
    "status": "active",
    "updatesThisMonth": 1,
    "lastUpdated": "2026-11-01",
    "domainType": "subdomain",
    "subdomain": "larissanails",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 53,
    "pageViews": 215,
    "trafficSources": {
      "instagram": 125,
      "tiktok": 30,
      "googleMaps": 38,
      "paidAds": 22,
      "direct": 10
    },
    "isLandingModel": true,
    "data": {
      "theme": "darkGold",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {
        "announcement": {
          "bgColor": "#d4af37",
          "textColor": "#0c0b0b",
          "titleColor": "#0c0b0b"
        },
        "hero": {
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "urgencyTimer": {
          "bgColor": "rgba(212, 175, 55, 0.12)",
          "headlineColor": "#d4af37",
          "titleColor": "#d4af37",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "qualifierFunnel": {
          "bgColor": "linear-gradient(135deg, #d4af37 0%, #b89726 100%)",
          "titleColor": "#0c0b0b",
          "textColor": "#26221c"
        },
        "actionCards": {
          "bgColor": "linear-gradient(145deg, #f5ede4 0%, #dfd3c3 100%)",
          "titleColor": "#2a241e",
          "textColor": "#574c40",
          "accentColor": "#d4af37"
        },
        "metrics": {
          "bgColor": "rgba(212, 175, 55, 0.12)",
          "titleColor": "#d4af37",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "processSteps": {
          "bgColor": "rgba(212, 175, 55, 0.12)",
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "services": {
          "bgColor": "rgba(255, 255, 255, 0.05)",
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "studentGrid": {
          "headlineColor": "#d4af37",
          "titleColor": "#d4af37",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "locationCard": {
          "bgColor": "rgba(212, 175, 55, 0.12)",
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "aboutMe": {
          "headlineColor": "#d4af37",
          "titleColor": "#d4af37",
          "textColor": "#f5ede4"
        },
        "testimonials": {
          "bgColor": "rgba(212, 175, 55, 0.12)",
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3",
          "accentColor": "#fbbf24"
        },
        "faq": {
          "bgColor": "rgba(212, 175, 55, 0.1)",
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3"
        },
        "footer": {
          "textColor": "#c5b49f",
          "accentColor": "#d4af37"
        }
      },
      "styling": {
        "fontFamily": "Playfair Display",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 22,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "AGENDA DA SEMANA ABERTA",
        "text": "Últimos horários disponíveis para Alongamento & Manutenção VIP.",
        "link": "#catalogo"
      },
      "profile": {
        "name": "LARISSA ALMEIDA",
        "title": "NAIL DESIGNER & ALONGAMENTO DE LUXO",
        "tagline": "Especialista em Fibra de Vidro Slim, Gel Moldado e Naturalidade Europeia com durabilidade impecável.",
        "cursivePhrase": "Elegância e sofisticação na ponta dos seus dedos.",
        "avatarUrl": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5531991390202",
        "instagram": "larissaalmeida.nails",
        "location": "Studio Privé · Jardins, São Paulo - SP",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Studio%20Priv%C3%A9%20%C2%B7%20Jardins%2C%20S%C3%A3o%20Paulo%20-%20SP"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+3.200",
        "stat1Label": "ATENDIMENTOS",
        "stat2Value": "35 Dias",
        "stat2Label": "DURABILIDADE",
        "stat3Value": "100%",
        "stat3Label": "BIOSSEGURANÇA"
      },
      "actionCards": [
        {
          "id": "nails-cta-1",
          "title": "AGENDAR MEU HORÁRIO NO STUDIO",
          "subtitle": "Alongamento em Fibra, Banho de Gel e Esmaltação Premium.",
          "icon": "Calendar",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá Larissa! Gostaria de agendar um horário para fazer as unhas.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "VAGAS LIMITADAS",
          "customBg": "#d4af37",
          "customText": "#000000",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 92,
          "ctaActionText": "GARANTIR HORÁRIO"
        },
        {
          "id": "nails-cta-2",
          "title": "CURSO VIP DE FIBRA DE VIDRO",
          "subtitle": "Do zero à naturalidade europeia com certificado internacional.",
          "icon": "GraduationCap",
          "linkType": "whatsapp",
          "url": "",
          "whatsappMessage": "Olá! Quero receber todas as informações sobre o Curso VIP de Nail Designer.",
          "openInNewTab": true,
          "animation": "shimmer",
          "variant": "default",
          "badgeText": "INSCRIÇÕES ABERTAS",
          "customBg": "#f5ede4",
          "customText": "#2a241e",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "QUERO SER ALUNA"
        },
        {
          "id": "nails-cta-3",
          "title": "TABELA DE PROCEDIMENTOS & VALORES",
          "subtitle": "Consulte as opções de aplicação, blindagem e manutenção.",
          "icon": "Sparkles",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "",
          "openInNewTab": false,
          "animation": "none",
          "variant": "default",
          "badgeText": "",
          "customBg": "#f5ede4",
          "customText": "#2a241e",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": ""
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o atendimento?",
        "subtitle": "Jornada simples, ágil e transparente em 3 etapas",
        "steps": [
          {
            "id": "nl-s1",
            "number": "01",
            "title": "Escolha do Procedimento",
            "description": "Selecione Fibra de Vidro Slim, Banho de Gel ou Manutenção."
          },
          {
            "id": "nl-s2",
            "number": "02",
            "title": "Confirmação no WhatsApp",
            "description": "Garanta seu horário preferido sem fila de espera."
          },
          {
            "id": "nl-s3",
            "number": "03",
            "title": "Experiência Studio Privé",
            "description": "Atendimento individualizado com materiais 100% esterilizados em autoclave."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e resultados",
        "badge": "GALERIA VIP",
        "layout": "grid3",
        "aspectRatio": "square",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Localização & Horários",
        "address": "Studio Privé · Jardins, São Paulo - SP",
        "buttonLabel": "Abrir Rota no Google Maps",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Studio%20Priv%C3%A9%20%C2%B7%20Jardins%2C%20S%C3%A3o%20Paulo%20-%20SP",
        "hours": "Ter a Sáb · 09:00 às 20:00",
        "openStatus": "AGENDA DA SEMANA ABERTA",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Menu de Alongamentos & Nail Care",
        "subtitle": "Atendimento personalizado com excelência técnica e agendamento prioritário",
        "badge": "CATÁLOGO OFICIAL",
        "layout": "featured",
        "items": [
          {
            "id": "srv-n1",
            "name": "Alongamento em Fibra de Vidro Slim",
            "description": "Curvatura natural, resistência extrema e acabamento ultrafino.",
            "price": "R$ 240",
            "duration": "2h00",
            "imageUrl": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=500",
            "featured": true,
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-n2",
            "name": "Banho de Gel & Blindagem Diamante",
            "description": "Proteção estrutural para o crescimento saudável das unhas naturais.",
            "price": "R$ 160",
            "duration": "1h30",
            "imageUrl": "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-n3",
            "name": "Manutenção + Cutilagem Russa & Gel",
            "description": "Nivelamento perfeito do crescimento com esmaltação em gel de alto brilho.",
            "price": "R$ 150",
            "duration": "1h30",
            "imageUrl": "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          }
        ]
      },
      "trustBadges": {
        "enabled": true,
        "items": [
          {
            "id": "tb-1",
            "icon": "credit-card",
            "title": "Cartão até 12x",
            "subtitle": "Crédito e Débito",
            "color": "emerald"
          },
          {
            "id": "tb-2",
            "icon": "zap",
            "title": "Pix Instantâneo",
            "subtitle": "Confirmação na hora",
            "color": "amber"
          },
          {
            "id": "tb-3",
            "icon": "car",
            "title": "Fácil Acesso",
            "subtitle": "Local seguro",
            "color": "sky"
          },
          {
            "id": "tb-4",
            "icon": "shield",
            "title": "Espaço VIP",
            "subtitle": "Climatizado & Café",
            "color": "purple"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre LARISSA ALMEIDA",
        "photoUrl": "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=700",
        "paragraph": "Referência em naturalidade europeia e resistência superior, já transformei o olhar sobre alongamento de unhas em mais de 3.200 atendimentos e formei centenas de alunas no método Fibra Slim.",
        "closingPhrase": "Elegância e sofisticação na ponta dos seus dedos."
      },
      "faq": {
        "enabled": true,
        "headline": "Perguntas Frequentes",
        "items": [
          {
            "id": "nf-1",
            "question": "Qual a durabilidade do alongamento em Fibra de Vidro?",
            "answer": "Com os cuidados indicados, a estrutura mantém brilho e resistência intactos por até 30 a 35 dias até a manutenção."
          },
          {
            "id": "nf-2",
            "question": "O Curso VIP Presencial inclui certificado e material?",
            "answer": "Sim! Apostila completa, prática em modelo real e certificado internacional incluso."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "LARISSA ALMEIDA — NAIL DESIGNER & ALONGAMENTO DE LUXO",
        "metaDescription": "Especialista em Fibra de Vidro Slim, Gel Moldado e Naturalidade Europeia com durabilidade impecável.",
        "ogImageUrl": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=900",
        "keywords": "Beleza & Unhas, microsite, agendamento vip, larissa almeida"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false,
    "isCustomized": true
  },
  {
    "id": "real-niche-lash",
    "clientName": "JANNE CAMPELO",
    "clientPhone": "5531991390202",
    "clientEmail": "contato@jannecampelo.com.br",
    "nicheCategory": "Beleza & Estética",
    "createdAt": "2026-11-01",
    "dueDate": "2026-12-01",
    "monthlyFee": 197,
    "status": "active",
    "updatesThisMonth": 1,
    "lastUpdated": "2026-11-01",
    "domainType": "subdomain",
    "subdomain": "jannecampelo",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 64,
    "pageViews": 250,
    "trafficSources": {
      "instagram": 140,
      "tiktok": 35,
      "googleMaps": 46,
      "paidAds": 29,
      "direct": 10
    },
    "isLandingModel": true,
    "data": {
      "theme": "rubyImperial",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {
        "announcement": {
          "bgColor": "#e11d48",
          "textColor": "#ffffff",
          "titleColor": "#ffffff"
        },
        "hero": {
          "headlineColor": "#fda4af",
          "titleColor": "#ffffff",
          "textColor": "#fecdd3",
          "accentColor": "#fb7185"
        },
        "urgencyTimer": {
          "bgColor": "rgba(225, 29, 72, 0.18)",
          "headlineColor": "#fb7185",
          "titleColor": "#fb7185",
          "textColor": "#fecdd3",
          "accentColor": "#fb7185"
        },
        "qualifierFunnel": {
          "bgColor": "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
          "titleColor": "#ffffff",
          "textColor": "#ffe4e6"
        },
        "actionCards": {
          "bgColor": "linear-gradient(135deg, #881337 0%, #4c0519 100%)",
          "titleColor": "#ffffff",
          "textColor": "#fecdd3",
          "accentColor": "#e11d48"
        },
        "metrics": {
          "bgColor": "rgba(225, 29, 72, 0.18)",
          "titleColor": "#fb7185",
          "textColor": "#fecdd3",
          "accentColor": "#fb7185"
        },
        "processSteps": {
          "bgColor": "rgba(225, 29, 72, 0.18)",
          "headlineColor": "#fb7185",
          "titleColor": "#ffffff",
          "textColor": "#fecdd3",
          "accentColor": "#fb7185"
        },
        "services": {
          "bgColor": "rgba(136, 19, 55, 0.25)",
          "headlineColor": "#fb7185",
          "titleColor": "#ffffff",
          "textColor": "#fecdd3",
          "accentColor": "#e11d48"
        },
        "studentGrid": {
          "headlineColor": "#fb7185",
          "titleColor": "#fb7185",
          "textColor": "#fecdd3",
          "accentColor": "#fb7185"
        },
        "locationCard": {
          "bgColor": "rgba(225, 29, 72, 0.18)",
          "headlineColor": "#fb7185",
          "titleColor": "#ffffff",
          "textColor": "#fecdd3",
          "accentColor": "#fb7185"
        },
        "aboutMe": {
          "headlineColor": "#fb7185",
          "titleColor": "#fb7185",
          "textColor": "#ffe4e6"
        },
        "testimonials": {
          "bgColor": "rgba(225, 29, 72, 0.18)",
          "headlineColor": "#fb7185",
          "titleColor": "#ffffff",
          "textColor": "#fecdd3",
          "accentColor": "#fbbf24"
        },
        "faq": {
          "bgColor": "rgba(225, 29, 72, 0.18)",
          "headlineColor": "#fb7185",
          "titleColor": "#ffffff",
          "textColor": "#fecdd3"
        },
        "footer": {
          "textColor": "#fda4af",
          "accentColor": "#fb7185"
        }
      },
      "styling": {
        "fontFamily": "Playfair Display",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 22,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "STUDIO DE OLHARES",
        "text": "Atendimento exclusivo com visagismo facial personalizado.",
        "link": "#catalogo"
      },
      "profile": {
        "name": "JANNE CAMPELO",
        "title": "ESPECIALISTA EM SOBRANCELHAS & LASH DESIGN",
        "tagline": "Realçando a força do seu olhar com Nanoblading Realista, Brow Lamination e Extensão de Cílios de alta retenção.",
        "cursivePhrase": "Seu olhar transmite o seu verdadeiro poder.",
        "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5531991390202",
        "instagram": "jannecampelo.beauty",
        "location": "Edifício Prime Beauty · Sala 804",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Edif%C3%ADcio%20Prime%20Beauty%20%C2%B7%20Sala%20804"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+4.500",
        "stat1Label": "OLHARES REALÇADOS",
        "stat2Value": "98%",
        "stat2Label": "FIDELIDADE",
        "stat3Value": "7 Anos",
        "stat3Label": "EXPERIÊNCIA"
      },
      "actionCards": [
        {
          "id": "lash-cta-1",
          "title": "AGENDAR DESIGN, LASH OU NANOBLADING",
          "subtitle": "Avaliação de visagismo inclusa em todos os procedimentos.",
          "icon": "Sparkles",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá Janne! Quero agendar um procedimento para realçar meu olhar.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "AGENDA VIP",
          "customBg": "#e11d48",
          "customText": "#ffffff",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 92,
          "ctaActionText": "AGENDAR AGORA"
        },
        {
          "id": "lash-cta-2",
          "title": "CATÁLOGO DE PROCEDIMENTOS DO OLHAR",
          "subtitle": "Conheça nossas técnicas de Fio a Fio, Brow Lamination e Fox Eyes.",
          "icon": "Heart",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "",
          "openInNewTab": false,
          "animation": "none",
          "variant": "default",
          "badgeText": "",
          "customBg": "#881337",
          "customText": "#ffffff",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": ""
        },
        {
          "id": "lash-cta-3",
          "title": "FALAR COM A RECEPÇÃO NO WHATSAPP",
          "subtitle": "Tire dúvidas sobre cicatrização, durabilidade e valores.",
          "icon": "MessageCircle",
          "linkType": "whatsapp",
          "url": "",
          "whatsappMessage": "Olá! Gostaria de tirar uma dúvida sobre os procedimentos.",
          "openInNewTab": true,
          "animation": "shimmer",
          "variant": "default",
          "badgeText": "ONLINE",
          "customBg": "#881337",
          "customText": "#ffffff",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "CHAMAR NO WHATSAPP"
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o atendimento?",
        "subtitle": "Jornada simples, ágil e transparente em 3 etapas",
        "steps": [
          {
            "id": "ls-s1",
            "number": "01",
            "title": "Mapeamento Facial & Visagismo",
            "description": "Analisamos a simetria do seu rosto antes de qualquer procedimento."
          },
          {
            "id": "ls-s2",
            "number": "02",
            "title": "Aplicação Indolor & Precisa",
            "description": "Fios hiper-realistas ou extensão de cílios com isolamento perfeito."
          },
          {
            "id": "ls-s3",
            "number": "03",
            "title": "Kit Pós-Procedimento VIP",
            "description": "Orientações completas para máxima retenção e durabilidade."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e resultados",
        "badge": "GALERIA VIP",
        "layout": "grid3",
        "aspectRatio": "square",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Localização & Horários",
        "address": "Edifício Prime Beauty · Sala 804",
        "buttonLabel": "Abrir Rota no Google Maps",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Edif%C3%ADcio%20Prime%20Beauty%20%C2%B7%20Sala%20804",
        "hours": "Seg a Sáb · 09:00 às 19:30",
        "openStatus": "HORÁRIOS VIP DISPONÍVEIS",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Protocolos Exclusivos para o Olhar",
        "subtitle": "Atendimento personalizado com excelência técnica e agendamento prioritário",
        "badge": "CATÁLOGO OFICIAL",
        "layout": "featured",
        "items": [
          {
            "id": "srv-l1",
            "name": "Nanoblading Fio a Fio Hiper-Realista",
            "description": "Preenchimento artístico que imita o caimento natural dos fios.",
            "price": "R$ 690",
            "duration": "2h00",
            "imageUrl": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=500",
            "featured": true,
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-l2",
            "name": "Extensão de Cílios Volume Fox Eyes / Brasileiro",
            "description": "Efeito delineado marcante com leveza e retenção de até 35 dias.",
            "price": "R$ 230",
            "duration": "1h45",
            "imageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-l3",
            "name": "Brow Lamination + Design com Tintura",
            "description": "Alinhamento e nutrição dos fios para sobrancelhas encorpadas e modernas.",
            "price": "R$ 180",
            "duration": "1h00",
            "imageUrl": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          }
        ]
      },
      "trustBadges": {
        "enabled": true,
        "items": [
          {
            "id": "tb-1",
            "icon": "credit-card",
            "title": "Cartão até 12x",
            "subtitle": "Crédito e Débito",
            "color": "emerald"
          },
          {
            "id": "tb-2",
            "icon": "zap",
            "title": "Pix Instantâneo",
            "subtitle": "Confirmação na hora",
            "color": "amber"
          },
          {
            "id": "tb-3",
            "icon": "car",
            "title": "Fácil Acesso",
            "subtitle": "Local seguro",
            "color": "sky"
          },
          {
            "id": "tb-4",
            "icon": "shield",
            "title": "Espaço VIP",
            "subtitle": "Climatizado & Café",
            "color": "purple"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre JANNE CAMPELO",
        "photoUrl": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=700",
        "paragraph": "Com mais de 4.500 olhares transformados em 7 anos de experiência, desenvolvi protocolos exclusivos que realçam sua beleza natural sem pesar na expressão.",
        "closingPhrase": "Seu olhar transmite o seu verdadeiro poder."
      },
      "faq": {
        "enabled": true,
        "headline": "Perguntas Frequentes",
        "items": [
          {
            "id": "lsf-1",
            "question": "Quanto tempo dura a extensão de cílios Fox Eyes?",
            "answer": "A retenção média é de 30 a 35 dias, sem danificar os fios naturais."
          },
          {
            "id": "lsf-2",
            "question": "O Nanoblading fica com aspecto natural?",
            "answer": "Sim, desenhamos fio a fio seguindo o caimento natural da sua sobrancelha com pigmentos importados."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "JANNE CAMPELO — ESPECIALISTA EM SOBRANCELHAS & LASH DESIGN",
        "metaDescription": "Realçando a força do seu olhar com Nanoblading Realista, Brow Lamination e Extensão de Cílios de alta retenção.",
        "ogImageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=900",
        "keywords": "Sobrancelhas & Lash, microsite, agendamento vip, janne campelo"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false,
    "isCustomized": true
  },
  {
    "id": "real-niche-esthetics",
    "clientName": "DRA. FERNANDA MARCOLIN",
    "clientPhone": "5531991390202",
    "clientEmail": "contato@drafernanda.com.br",
    "nicheCategory": "Beleza & Estética",
    "createdAt": "2026-11-01",
    "dueDate": "2026-12-01",
    "monthlyFee": 197,
    "status": "active",
    "updatesThisMonth": 1,
    "lastUpdated": "2026-11-01",
    "domainType": "subdomain",
    "subdomain": "drafernanda",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 75,
    "pageViews": 285,
    "trafficSources": {
      "instagram": 155,
      "tiktok": 40,
      "googleMaps": 54,
      "paidAds": 36,
      "direct": 10
    },
    "isLandingModel": true,
    "data": {
      "theme": "champagneNude",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {
        "announcement": {
          "bgColor": "#786045",
          "textColor": "#ffffff",
          "titleColor": "#ffffff"
        },
        "hero": {
          "headlineColor": "#786045",
          "titleColor": "#1c1917",
          "textColor": "#44403c",
          "accentColor": "#786045"
        },
        "urgencyTimer": {
          "bgColor": "#ffffff",
          "headlineColor": "#786045",
          "titleColor": "#786045",
          "textColor": "#57534e",
          "accentColor": "#786045"
        },
        "qualifierFunnel": {
          "bgColor": "linear-gradient(135deg, #786045 0%, #634f37 100%)",
          "titleColor": "#ffffff",
          "textColor": "#f5ede4"
        },
        "actionCards": {
          "bgColor": "#ffffff",
          "titleColor": "#1c1917",
          "textColor": "#57534e",
          "accentColor": "#786045"
        },
        "metrics": {
          "bgColor": "#ffffff",
          "titleColor": "#786045",
          "textColor": "#57534e",
          "accentColor": "#786045"
        },
        "processSteps": {
          "bgColor": "#ffffff",
          "headlineColor": "#786045",
          "titleColor": "#1c1917",
          "textColor": "#57534e",
          "accentColor": "#786045"
        },
        "services": {
          "bgColor": "#ffffff",
          "headlineColor": "#786045",
          "titleColor": "#1c1917",
          "textColor": "#57534e",
          "accentColor": "#786045"
        },
        "studentGrid": {
          "headlineColor": "#786045",
          "titleColor": "#786045",
          "textColor": "#57534e",
          "accentColor": "#786045"
        },
        "locationCard": {
          "bgColor": "#ffffff",
          "headlineColor": "#786045",
          "titleColor": "#1c1917",
          "textColor": "#57534e",
          "accentColor": "#786045"
        },
        "aboutMe": {
          "headlineColor": "#786045",
          "titleColor": "#786045",
          "textColor": "#292524"
        },
        "testimonials": {
          "bgColor": "#ffffff",
          "headlineColor": "#786045",
          "titleColor": "#1c1917",
          "textColor": "#57534e",
          "accentColor": "#b45309"
        },
        "faq": {
          "bgColor": "#ffffff",
          "headlineColor": "#786045",
          "titleColor": "#1c1917",
          "textColor": "#57534e"
        },
        "footer": {
          "textColor": "#78716c",
          "accentColor": "#786045"
        }
      },
      "styling": {
        "fontFamily": "Cormorant Garamond",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 22,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "CLÍNICA BOUTIQUE",
        "text": "Agende sua Consulta de Avaliação Facial & Corporal Personalizada.",
        "link": "#catalogo"
      },
      "profile": {
        "name": "DRA. FERNANDA MARCOLIN",
        "title": "HARMONIZAÇÃO FACIAL & ESTÉTICA AVANÇADA",
        "tagline": "Protocolos médicos e estéticos de Bioestimuladores, Toxina Botulínica e Rejuvenescimento com foco na naturalidade.",
        "cursivePhrase": "Realçando sua beleza única com ciência, arte e sutileza.",
        "avatarUrl": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5531991390202",
        "instagram": "drafernandamarcolin",
        "location": "Clínica Concept · Itaim Bibi, São Paulo - SP",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica%20Concept%20%C2%B7%20Itaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+3.800",
        "stat1Label": "PROCEDIMENTOS",
        "stat2Value": "11 Anos",
        "stat2Label": "EXPERIÊNCIA CLÍNICA",
        "stat3Value": "99.4%",
        "stat3Label": "NATURALIDADE"
      },
      "actionCards": [
        {
          "id": "est-cta-1",
          "title": "AGENDAR AVALIAÇÃO FACIAL PERSONALIZADA",
          "subtitle": "Planejamento individualizado de rejuvenescimento e gerenciamento da pele.",
          "icon": "Calendar",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá! Gostaria de agendar uma Consulta de Avaliação com a Dra. Fernanda.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "AGENDA ABERTA",
          "customBg": "#a8947a",
          "customText": "#ffffff",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 92,
          "ctaActionText": "AGENDAR CONSULTA"
        },
        {
          "id": "est-cta-2",
          "title": "PROTOCOLOS FACIAIS & BIOESTIMULADORES",
          "subtitle": "Conheça nossos tratamentos de colágeno, lábios, botox e tecnologias.",
          "icon": "Sparkles",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "",
          "openInNewTab": false,
          "animation": "none",
          "variant": "default",
          "badgeText": "",
          "customBg": "#ffffff",
          "customText": "#26221c",
          "bgImage": "",
          "imagePosition": "left",
          "cardImage": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "VER PROTOCOLOS"
        },
        {
          "id": "est-cta-3",
          "title": "FALAR COM A CONCIERGE DA CLÍNICA",
          "subtitle": "Atendimento exclusivo via WhatsApp para dúvidas e pré-agendamento.",
          "icon": "MessageCircle",
          "linkType": "whatsapp",
          "url": "",
          "whatsappMessage": "Olá! Gostaria de falar com a Concierge da Clínica sobre os procedimentos.",
          "openInNewTab": true,
          "animation": "shimmer",
          "variant": "default",
          "badgeText": "CONCIERGE VIP",
          "customBg": "#ffffff",
          "customText": "#26221c",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "ATENDIMENTO VIP"
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o atendimento?",
        "subtitle": "Jornada simples, ágil e transparente em 3 etapas",
        "steps": [
          {
            "id": "es-s1",
            "number": "01",
            "title": "Consulta de Avaliação 3D",
            "description": "Diagnóstico anatômico da pele, pontos de sustentação e colágeno."
          },
          {
            "id": "es-s2",
            "number": "02",
            "title": "Planejamento Full Face Personalizado",
            "description": "Protocolo médico focado em rejuvenescimento elegante e natural."
          },
          {
            "id": "es-s3",
            "number": "03",
            "title": "Acompanhamento Pós-Clínico",
            "description": "Suporte direto com nossa Concierge durante toda a evolução."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e resultados",
        "badge": "GALERIA VIP",
        "layout": "grid3",
        "aspectRatio": "square",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Localização & Horários",
        "address": "Clínica Concept · Itaim Bibi, São Paulo - SP",
        "buttonLabel": "Abrir Rota no Google Maps",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica%20Concept%20%C2%B7%20Itaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP",
        "hours": "Seg a Sex · 08:30 às 19:30",
        "openStatus": "CLÍNICA ABERTA · HORA MARCADA",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Protocolos de Estética & Rejuvenescimento",
        "subtitle": "Atendimento personalizado com excelência técnica e agendamento prioritário",
        "badge": "CATÁLOGO OFICIAL",
        "layout": "featured",
        "items": [
          {
            "id": "srv-e1",
            "name": "Protocolo Colágeno Gold (Bioestimulador + Tecnologias)",
            "description": "Estímulo profundo de firmeza, efeito lifting natural e melhora da textura da pele.",
            "price": "Sob Avaliação",
            "duration": "1h00",
            "imageUrl": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=500",
            "featured": true,
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-e2",
            "name": "Toxina Botulínica Preventiva & Full Face",
            "description": "Suavização elegante de linhas de expressão preservando a naturalidade do rosto.",
            "price": "R$ 1.290",
            "duration": "45min",
            "imageUrl": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-e3",
            "name": "Escultura & Hidratação Labial com Ácido Hialurônico",
            "description": "Definição de contorno, volume sutil e revitalização profunda dos lábios.",
            "price": "R$ 1.450",
            "duration": "50min",
            "imageUrl": "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          }
        ]
      },
      "trustBadges": {
        "enabled": true,
        "items": [
          {
            "id": "tb-1",
            "icon": "credit-card",
            "title": "Cartão até 12x",
            "subtitle": "Crédito e Débito",
            "color": "emerald"
          },
          {
            "id": "tb-2",
            "icon": "zap",
            "title": "Pix Instantâneo",
            "subtitle": "Confirmação na hora",
            "color": "amber"
          },
          {
            "id": "tb-3",
            "icon": "car",
            "title": "Fácil Acesso",
            "subtitle": "Local seguro",
            "color": "sky"
          },
          {
            "id": "tb-4",
            "icon": "shield",
            "title": "Espaço VIP",
            "subtitle": "Climatizado & Café",
            "color": "purple"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre DRA. FERNANDA MARCOLIN",
        "photoUrl": "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=700",
        "paragraph": "Acredito na medicina estética que respeita a individualidade de cada rosto. Mais de 3.800 procedimentos realizados com foco em gerenciamento de colágeno e naturalidade.",
        "closingPhrase": "Realçando sua beleza única com ciência, arte e sutileza."
      },
      "faq": {
        "enabled": true,
        "headline": "Perguntas Frequentes",
        "items": [
          {
            "id": "ef-1",
            "question": "Os procedimentos deixam o rosto artificial?",
            "answer": "Nosso método prioriza a reestruturação sutil e estímulo de colágeno, preservando 100% dos seus traços naturais."
          },
          {
            "id": "ef-2",
            "question": "Como agendar a primeira avaliação?",
            "answer": "Basta clicar no botão de Agendamento ou chamar nossa Concierge pelo WhatsApp."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "DRA. FERNANDA MARCOLIN — HARMONIZAÇÃO FACIAL & ESTÉTICA AVANÇADA",
        "metaDescription": "Protocolos médicos e estéticos de Bioestimuladores, Toxina Botulínica e Rejuvenescimento com foco na naturalidade.",
        "ogImageUrl": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=900",
        "keywords": "Estética & Clínica, microsite, agendamento vip, dra. fernanda marcolin"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false,
    "isCustomized": true
  },
  {
    "id": "real-niche-barber",
    "clientName": "DOM BARBER CLUB",
    "clientPhone": "5511999999999",
    "clientEmail": "contato@dombarber.com.br",
    "nicheCategory": "Barbearia & Negócios",
    "createdAt": "2026-10-27",
    "dueDate": "2026-11-26",
    "monthlyFee": 197,
    "status": "pago",
    "updatesThisMonth": 1,
    "lastUpdated": "2026-10-27",
    "domainType": "subdomain",
    "subdomain": "dombarber",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 86,
    "pageViews": 320,
    "trafficSources": {
      "instagram": 170,
      "tiktok": 45,
      "googleMaps": 62,
      "paidAds": 43,
      "direct": 10
    },
    "isLandingModel": true,
    "data": {
      "theme": "barberVintage",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {},
      "styling": {
        "fontFamily": "Cinzel",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 22,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "HORÁRIOS DISPONÍVEIS HOJE",
        "text": "Agende seu corte ou barboterapia em 30 segundos sem fila de espera.",
        "link": "#catalogo"
      },
      "profile": {
        "name": "DON CORLEONE BARBER",
        "title": "BARBEARIA CLÁSSICA & VISAGISMO MASCULINO",
        "tagline": "Cerveja artesanal gelada, toalha quente e precisão na navalha. O ponto de encontro do homem de respeito.",
        "cursivePhrase": "Tradição, excelência e estilo em cada detalhe.",
        "avatarUrl": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5511999999999",
        "instagram": "dombarberclub.sp",
        "location": "Av. Paulista, 1450 · Estacionamento VIP no Local",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Av.%20Paulista%2C%201450%20%C2%B7%20Estacionamento%20VIP%20no%20Local"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+8.500",
        "stat1Label": "CORTES & BARBAS",
        "stat2Value": "4.9 ★",
        "stat2Label": "AVALIAÇÃO GOOGLE",
        "stat3Value": "10 Anos",
        "stat3Label": "TRADIÇÃO & ESTILO"
      },
      "actionCards": [
        {
          "id": "barber-cta-1",
          "title": "AGENDAR MEU HORÁRIO AGORA",
          "subtitle": "Escolha seu barbeiro, serviço e horário em 30 segundos.",
          "icon": "Scissors",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá! Gostaria de agendar um horário na barbearia.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "SEM FILA",
          "customBg": "#d97706",
          "customText": "#000000",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 92,
          "ctaActionText": "RESERVAR HORÁRIO"
        },
        {
          "id": "barber-cta-2",
          "title": "CLUBE DE ASSINATURA VIP",
          "subtitle": "Corte e barba ilimitados o mês inteiro a partir de R$ 149,90.",
          "icon": "Star",
          "linkType": "whatsapp",
          "url": "",
          "whatsappMessage": "Olá! Quero conhecer os planos do Clube de Assinatura VIP da Barbearia.",
          "openInNewTab": true,
          "animation": "shimmer",
          "variant": "default",
          "badgeText": "MAIS ASSINADO",
          "customBg": "#211c18",
          "customText": "#f5efe6",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "CONHECER PLANOS"
        },
        {
          "id": "barber-cta-3",
          "title": "MENU DE CORTES, BARBA & COMBOS",
          "subtitle": "Confira todos os serviços, pigmentação e selagem masculina.",
          "icon": "Scissors",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "",
          "openInNewTab": false,
          "animation": "none",
          "variant": "default",
          "badgeText": "",
          "customBg": "#211c18",
          "customText": "#f5efe6",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": ""
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o atendimento?",
        "subtitle": "Jornada simples, ágil e transparente em 3 etapas",
        "steps": [
          {
            "id": "bb-s1",
            "number": "01",
            "title": "Escolha seu Combo ou Corte",
            "description": "Selecione Corte Navalhado, Barboterapia com Ozônio ou Combo Gentleman."
          },
          {
            "id": "bb-s2",
            "number": "02",
            "title": "Confirmação Instantânea no WhatsApp",
            "description": "Chegue no horário marcado e seja atendido sem espera."
          },
          {
            "id": "bb-s3",
            "number": "03",
            "title": "Toalha Quente & Chopp Cortesia",
            "description": "Primeira cerveja artesanal ou café espresso por nossa conta."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e resultados",
        "badge": "GALERIA VIP",
        "layout": "grid3",
        "aspectRatio": "square",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Localização & Horários",
        "address": "Av. Paulista, 1450 · Estacionamento VIP no Local",
        "buttonLabel": "Abrir Rota no Google Maps",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Av.%20Paulista%2C%201450%20%C2%B7%20Estacionamento%20VIP%20no%20Local",
        "hours": "Ter a Sáb · 09:00 às 21:00",
        "openStatus": "SEM FILA · AGENDE ONLINE",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Menu de Serviços & Grooming",
        "subtitle": "Atendimento personalizado com excelência técnica e agendamento prioritário",
        "badge": "CATÁLOGO OFICIAL",
        "layout": "featured",
        "items": [
          {
            "id": "srv-b1",
            "name": "Combo Gentleman (Corte + Barboterapia)",
            "description": "Toalha quente, massagem facial com ozônio e bebida cortesia.",
            "price": "R$ 110",
            "duration": "1h15",
            "imageUrl": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=500",
            "featured": true,
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-b2",
            "name": "Corte Degradê / Fade Navalhado",
            "description": "Acabamento de alta precisão, lavagem especial e pomada matte.",
            "price": "R$ 70",
            "duration": "45min",
            "imageUrl": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-b3",
            "name": "Barboterapia Real com Óleos Essenciais",
            "description": "Alinhamento geométrico, esfoliação e hidratação profunda.",
            "price": "R$ 60",
            "duration": "40min",
            "imageUrl": "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre DON CORLEONE BARBER",
        "paragraph": "Mais que um corte, o Dom Barber Club entrega visagismo masculino, barboterapia clássica com toalha quente e um ambiente pensado para homens de negócios.",
        "closingPhrase": "Tradição, navalha afiada e respeito ao seu tempo."
      },
      "faq": {
        "enabled": true,
        "headline": "Perguntas Frequentes",
        "items": [
          {
            "id": "bf-1",
            "question": "Como funciona o Clube de Assinatura Mensal?",
            "answer": "Por um valor fixo mensal você corta o cabelo e alinha a barba quantas vezes quiser no mês, com prioridade na agenda."
          },
          {
            "id": "bf-2",
            "question": "Possuem estacionamento no local?",
            "answer": "Sim, manobrista conveniado em frente à barbearia."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "DON CORLEONE BARBER — BARBEARIA CLÁSSICA & VISAGISMO MASCULINO",
        "metaDescription": "Cerveja artesanal gelada, toalha quente e precisão na navalha. O ponto de encontro do homem de respeito.",
        "ogImageUrl": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=900",
        "keywords": "Barbearia, microsite, agendamento vip, don corleone barber"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": true
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false,
    "isCustomized": false
  },
  {
    "id": "real-niche-mentor",
    "clientName": "MARIANA CARVALHO",
    "clientPhone": "5531991390202",
    "clientEmail": "contato@marianacarvalho.com.br",
    "nicheCategory": "Mentoria & Infoprodutos",
    "createdAt": "2026-11-01",
    "dueDate": "2026-12-01",
    "monthlyFee": 197,
    "status": "active",
    "updatesThisMonth": 1,
    "lastUpdated": "2026-11-01",
    "domainType": "subdomain",
    "subdomain": "marianacarvalho",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 97,
    "pageViews": 355,
    "trafficSources": {
      "instagram": 185,
      "tiktok": 50,
      "googleMaps": 70,
      "paidAds": 50,
      "direct": 10
    },
    "isLandingModel": true,
    "data": {
      "theme": "warmMentorship",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {
        "announcement": {
          "bgColor": "#d99f69",
          "textColor": "#1c1613",
          "titleColor": "#1c1613"
        },
        "hero": {
          "headlineColor": "#d99f69",
          "titleColor": "#faf6f0",
          "textColor": "#d6c4b8",
          "accentColor": "#d99f69"
        },
        "urgencyTimer": {
          "bgColor": "rgba(217, 159, 105, 0.14)",
          "headlineColor": "#d99f69",
          "titleColor": "#d99f69",
          "textColor": "#d6c4b8",
          "accentColor": "#d99f69"
        },
        "qualifierFunnel": {
          "bgColor": "linear-gradient(135deg, #d99f69 0%, #b87f4c 100%)",
          "titleColor": "#1c1613",
          "textColor": "#2c1e15"
        },
        "actionCards": {
          "bgColor": "linear-gradient(135deg, #f7efe6 0%, #e8d7c3 100%)",
          "titleColor": "#261b14",
          "textColor": "#574438",
          "accentColor": "#d99f69"
        },
        "metrics": {
          "bgColor": "rgba(217, 159, 105, 0.14)",
          "titleColor": "#d99f69",
          "textColor": "#d6c4b8",
          "accentColor": "#d99f69"
        },
        "processSteps": {
          "bgColor": "rgba(217, 159, 105, 0.14)",
          "headlineColor": "#d99f69",
          "titleColor": "#faf6f0",
          "textColor": "#d6c4b8",
          "accentColor": "#d99f69"
        },
        "services": {
          "bgColor": "rgba(255, 255, 255, 0.05)",
          "headlineColor": "#d99f69",
          "titleColor": "#faf6f0",
          "textColor": "#d6c4b8",
          "accentColor": "#d99f69"
        },
        "studentGrid": {
          "headlineColor": "#d99f69",
          "titleColor": "#d99f69",
          "textColor": "#d6c4b8",
          "accentColor": "#d99f69"
        },
        "locationCard": {
          "bgColor": "rgba(217, 159, 105, 0.14)",
          "headlineColor": "#d99f69",
          "titleColor": "#faf6f0",
          "textColor": "#d6c4b8",
          "accentColor": "#d99f69"
        },
        "aboutMe": {
          "headlineColor": "#d99f69",
          "titleColor": "#d99f69",
          "textColor": "#faf6f0"
        },
        "testimonials": {
          "bgColor": "rgba(217, 159, 105, 0.14)",
          "headlineColor": "#d99f69",
          "titleColor": "#faf6f0",
          "textColor": "#d6c4b8",
          "accentColor": "#fbbf24"
        },
        "faq": {
          "bgColor": "rgba(217, 159, 105, 0.12)",
          "headlineColor": "#d99f69",
          "titleColor": "#faf6f0",
          "textColor": "#d6c4b8"
        },
        "footer": {
          "textColor": "#bda89b",
          "accentColor": "#d99f69"
        }
      },
      "styling": {
        "fontFamily": "Playfair Display",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 22,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "APLICAÇÕES ABERTAS",
        "text": "Nova turma da Mentoria Executiva High-Ticket — Vagas limitadas.",
        "link": "#catalogo"
      },
      "profile": {
        "name": "MARIANA CARVALHO",
        "title": "MENTORA DE NEGÓCIOS & POSICIONAMENTO",
        "tagline": "Ajudo especialistas e empresárias a multiplicarem seu faturamento com posicionamento de alto valor no digital.",
        "cursivePhrase": "Posicionamento de elite atrai clientes de elite.",
        "avatarUrl": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5531991390202",
        "instagram": "marianacarvalho.mentora",
        "location": "Atendimento Global Online & Imersões em São Paulo",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Atendimento%20Global%20Online%20%26%20Imers%C3%B5es%20em%20S%C3%A3o%20Paulo"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+1.800",
        "stat1Label": "ALUNAS FORMADAS",
        "stat2Value": "R$ 15M+",
        "stat2Label": "GERADOS NO MÉTODO",
        "stat3Value": "4.9 ★",
        "stat3Label": "SATISFAÇÃO"
      },
      "actionCards": [
        {
          "id": "ment-cta-1",
          "title": "APLICAR PARA A MENTORIA HIGH-TICKET",
          "subtitle": "Acompanhamento individual e em grupo para escalar seu negócio.",
          "icon": "GraduationCap",
          "linkType": "quiz",
          "url": "#quiz",
          "whatsappMessage": "Olá Mariana! Quero aplicar para uma vaga na Mentoria High-Ticket.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "VAGAS LIMITADAS",
          "customBg": "#d99f69",
          "customText": "#261b14",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 92,
          "ctaActionText": "FAZER APLICAÇÃO"
        },
        {
          "id": "ment-cta-2",
          "title": "E-BOOK: O CÓDIGO DA AUTORIDADE",
          "subtitle": "O passo a passo para transformar seguidores em clientes de alto ticket.",
          "icon": "Sparkles",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "",
          "openInNewTab": false,
          "animation": "shimmer",
          "variant": "default",
          "badgeText": "BEST-SELLER",
          "customBg": "#f7efe6",
          "customText": "#261b14",
          "bgImage": "",
          "imagePosition": "left",
          "cardImage": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "BAIXE AGORA"
        },
        {
          "id": "ment-cta-3",
          "title": "CONTRATAR PALESTRAS & TREINAMENTOS",
          "subtitle": "Fale diretamente com minha assessoria executiva pelo WhatsApp.",
          "icon": "Briefcase",
          "linkType": "whatsapp",
          "url": "",
          "whatsappMessage": "Olá! Gostaria de consultar agenda de palestras e mentorias da Mariana.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "",
          "customBg": "#f7efe6",
          "customText": "#261b14",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": ""
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o atendimento?",
        "subtitle": "Jornada simples, ágil e transparente em 3 etapas",
        "steps": [
          {
            "id": "mt-s1",
            "number": "01",
            "title": "Preenchimento da Aplicação",
            "description": "Avaliamos seu momento atual de faturamento e estrutura comercial."
          },
          {
            "id": "mt-s2",
            "number": "02",
            "title": "Sessão Estratégica de Diagnóstico",
            "description": "Alinhamento individual com nosso time de estrategistas."
          },
          {
            "id": "mt-s3",
            "number": "03",
            "title": "Plano de Escala High-Ticket",
            "description": "Implementação acompanhada por 90 dias para multiplicar sua margem."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e resultados",
        "badge": "GALERIA VIP",
        "layout": "grid3",
        "aspectRatio": "square",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Localização & Horários",
        "address": "Atendimento Global Online & Imersões em São Paulo",
        "buttonLabel": "Abrir Rota no Google Maps",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Atendimento%20Global%20Online%20%26%20Imers%C3%B5es%20em%20S%C3%A3o%20Paulo",
        "hours": "Atendimento Global Online · Seg a Sex",
        "openStatus": "APLICAÇÕES ABERTAS · TURMA VIP",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Programas de Mentoria & Formações",
        "subtitle": "Atendimento personalizado com excelência técnica e agendamento prioritário",
        "badge": "CATÁLOGO OFICIAL",
        "layout": "featured",
        "items": [
          {
            "id": "srv-m1",
            "name": "Mentoria Individual VIP (90 Dias)",
            "description": "Reestruturação completa de oferta, funil de vendas e posicionamento premium.",
            "price": "R$ 5.000",
            "duration": "3 Meses",
            "imageUrl": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=500",
            "featured": true,
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-m2",
            "name": "Curso Posicionamento Magnético 2.0",
            "description": "+60 aulas práticas com scripts de vendas, narrativa de stories e estética.",
            "price": "R$ 997",
            "duration": "Acesso 1 Ano",
            "imageUrl": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-m3",
            "name": "Consultoria Express de Diagnóstico (2h)",
            "description": "Encontro intensivo individual com entrega de plano de ação imediato.",
            "price": "R$ 890",
            "duration": "2h00",
            "imageUrl": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          }
        ]
      },
      "trustBadges": {
        "enabled": true,
        "items": [
          {
            "id": "tb-1",
            "icon": "credit-card",
            "title": "Cartão até 12x",
            "subtitle": "Crédito e Débito",
            "color": "emerald"
          },
          {
            "id": "tb-2",
            "icon": "zap",
            "title": "Pix Instantâneo",
            "subtitle": "Confirmação na hora",
            "color": "amber"
          },
          {
            "id": "tb-3",
            "icon": "car",
            "title": "Fácil Acesso",
            "subtitle": "Local seguro",
            "color": "sky"
          },
          {
            "id": "tb-4",
            "icon": "shield",
            "title": "Espaço VIP",
            "subtitle": "Climatizado & Café",
            "color": "purple"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre MARIANA CARVALHO",
        "photoUrl": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=700",
        "paragraph": "Especialista em posicionamento de alto valor e estruturação comercial, já formei mais de 1.800 alunas e ajudei negócios digitais a ultrapassarem R$ 15 milhões em vendas.",
        "closingPhrase": "Posicionamento de elite atrai clientes de elite."
      },
      "faq": {
        "enabled": true,
        "headline": "Perguntas Frequentes",
        "items": [
          {
            "id": "mf-1",
            "question": "Para quem é indicada a Mentoria Individual VIP?",
            "answer": "Para profissionais liberais, especialistas e empresárias que já faturam e desejam escalar ofertas de alto ticket."
          },
          {
            "id": "mf-2",
            "question": "Como contratar palestras in-company?",
            "answer": "Clique no botão de Palestras & Treinamentos para falar direto com nossa assessoria executiva."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "MARIANA CARVALHO — MENTORA DE NEGÓCIOS & POSICIONAMENTO",
        "metaDescription": "Ajudo especialistas e empresárias a multiplicarem seu faturamento com posicionamento de alto valor no digital.",
        "ogImageUrl": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=900",
        "keywords": "Mentoria & Cursos, microsite, agendamento vip, mariana carvalho"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false,
    "isCustomized": true
  },
  {
    "id": "real-niche-health",
    "clientName": "PSI. MARTINA BIANCHI",
    "clientPhone": "5531991390202",
    "clientEmail": "contato@psimartina.com.br",
    "nicheCategory": "Saúde & Clínicas",
    "createdAt": "2026-11-01",
    "dueDate": "2026-12-01",
    "monthlyFee": 197,
    "status": "active",
    "updatesThisMonth": 1,
    "lastUpdated": "2026-11-01",
    "domainType": "subdomain",
    "subdomain": "psimartina",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 108,
    "pageViews": 390,
    "trafficSources": {
      "instagram": 200,
      "tiktok": 55,
      "googleMaps": 78,
      "paidAds": 57,
      "direct": 10
    },
    "isLandingModel": true,
    "data": {
      "theme": "terracottaWarm",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {
        "announcement": {
          "bgColor": "#7a3b22",
          "textColor": "#ffffff",
          "titleColor": "#ffffff"
        },
        "hero": {
          "headlineColor": "#7a3b22",
          "titleColor": "#1c1511",
          "textColor": "#4a3b34",
          "accentColor": "#7a3b22"
        },
        "urgencyTimer": {
          "bgColor": "#ffffff",
          "headlineColor": "#7a3b22",
          "titleColor": "#7a3b22",
          "textColor": "#5c4b42",
          "accentColor": "#7a3b22"
        },
        "qualifierFunnel": {
          "bgColor": "linear-gradient(135deg, #7a3b22 0%, #632d18 100%)",
          "titleColor": "#ffffff",
          "textColor": "#f5ded4"
        },
        "actionCards": {
          "bgColor": "#ffffff",
          "titleColor": "#1c1511",
          "textColor": "#5c4b42",
          "accentColor": "#7a3b22"
        },
        "metrics": {
          "bgColor": "#ffffff",
          "titleColor": "#7a3b22",
          "textColor": "#5c4b42",
          "accentColor": "#7a3b22"
        },
        "processSteps": {
          "bgColor": "#ffffff",
          "headlineColor": "#7a3b22",
          "titleColor": "#1c1511",
          "textColor": "#5c4b42",
          "accentColor": "#7a3b22"
        },
        "services": {
          "bgColor": "#ffffff",
          "headlineColor": "#7a3b22",
          "titleColor": "#1c1511",
          "textColor": "#5c4b42",
          "accentColor": "#7a3b22"
        },
        "studentGrid": {
          "headlineColor": "#7a3b22",
          "titleColor": "#7a3b22",
          "textColor": "#5c4b42",
          "accentColor": "#7a3b22"
        },
        "locationCard": {
          "bgColor": "#ffffff",
          "headlineColor": "#7a3b22",
          "titleColor": "#1c1511",
          "textColor": "#5c4b42",
          "accentColor": "#7a3b22"
        },
        "aboutMe": {
          "headlineColor": "#7a3b22",
          "titleColor": "#7a3b22",
          "textColor": "#291d17"
        },
        "testimonials": {
          "bgColor": "#ffffff",
          "headlineColor": "#7a3b22",
          "titleColor": "#1c1511",
          "textColor": "#5c4b42",
          "accentColor": "#b45309"
        },
        "faq": {
          "bgColor": "#ffffff",
          "headlineColor": "#7a3b22",
          "titleColor": "#1c1511",
          "textColor": "#5c4b42"
        },
        "footer": {
          "textColor": "#78645a",
          "accentColor": "#7a3b22"
        }
      },
      "styling": {
        "fontFamily": "Cormorant Garamond",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 22,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "ACOLHIMENTO ONLINE & PRESENCIAL",
        "text": "Atendimento psicológico humanizado para adultos no Brasil e exterior.",
        "link": "#catalogo"
      },
      "profile": {
        "name": "PSI. MARTINA BIANCHI",
        "title": "PSICÓLOGA CLÍNICA · CRP 06/12345",
        "tagline": "Psicoterapia individual focada em ansiedade, autoestima, esgotamento profissional e relacionamentos saudáveis.",
        "cursivePhrase": "Cuidar da sua saúde emocional é um ato de coragem.",
        "avatarUrl": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5531991390202",
        "instagram": "psimartinabianchi",
        "location": "Consultório em Pinheiros - SP & Atendimento Online Global",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Consult%C3%B3rio%20em%20Pinheiros%20-%20SP%20%26%20Atendimento%20Online%20Global"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+2.400",
        "stat1Label": "SESSÕES REALIZADAS",
        "stat2Value": "9 Anos",
        "stat2Label": "PRÁTICA CLÍNICA",
        "stat3Value": "100%",
        "stat3Label": "SIGILO & ÉTICA"
      },
      "actionCards": [
        {
          "id": "psi-cta-1",
          "title": "AGENDAR PRIMEIRA SESSÃO",
          "subtitle": "Consulte a disponibilidade de horários para terapia online ou presencial.",
          "icon": "Calendar",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá Martina! Gostaria de verificar horários disponíveis para iniciar a psicoterapia.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "AGENDA ABERTA",
          "customBg": "#a0583b",
          "customText": "#ffffff",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 92,
          "ctaActionText": "VER HORÁRIOS"
        },
        {
          "id": "psi-cta-2",
          "title": "COMO FUNCIONA A PSICOTERAPIA",
          "subtitle": "Entenda a abordagem clínica, frequência das sessões e recibos para reembolso.",
          "icon": "Heart",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "",
          "openInNewTab": false,
          "animation": "none",
          "variant": "default",
          "badgeText": "",
          "customBg": "#8c4528",
          "customText": "#ffffff",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": ""
        },
        {
          "id": "psi-cta-3",
          "title": "TIRAR DÚVIDAS PELO WHATSAPP",
          "subtitle": "Converse diretamente comigo para alinhar sua necessidade inicial.",
          "icon": "MessageCircle",
          "linkType": "whatsapp",
          "url": "",
          "whatsappMessage": "Olá Martina! Vi seu link na bio e gostaria de tirar uma dúvida sobre as sessões.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "ACOLHIMENTO",
          "customBg": "#8c4528",
          "customText": "#ffffff",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "ENVIAR MENSAGEM"
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o atendimento?",
        "subtitle": "Jornada simples, ágil e transparente em 3 etapas",
        "steps": [
          {
            "id": "ps-s1",
            "number": "01",
            "title": "Primeiro Contato no WhatsApp",
            "description": "Alinhamos sua disponibilidade de horário e modalidade (online ou presencial)."
          },
          {
            "id": "ps-s2",
            "number": "02",
            "title": "Sessão Inicial de Acolhimento",
            "description": "Espaço ético, sigiloso e livre de julgamentos para compreender sua demanda."
          },
          {
            "id": "ps-s3",
            "number": "03",
            "title": "Acompanhamento Semanal",
            "description": "Processo terapêutico estruturado no seu ritmo e objetivos emocionais."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e resultados",
        "badge": "GALERIA VIP",
        "layout": "grid3",
        "aspectRatio": "square",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Localização & Horários",
        "address": "Consultório em Pinheiros - SP & Atendimento Online Global",
        "buttonLabel": "Abrir Rota no Google Maps",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Consult%C3%B3rio%20em%20Pinheiros%20-%20SP%20%26%20Atendimento%20Online%20Global",
        "hours": "Seg a Sex · 08:00 às 20:00 (Com Hora Marcada)",
        "openStatus": "ONLINE GLOBAL & PRESENCIAL SP",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Modalidades de Atendimento Clínico",
        "subtitle": "Atendimento personalizado com excelência técnica e agendamento prioritário",
        "badge": "CATÁLOGO OFICIAL",
        "layout": "featured",
        "items": [
          {
            "id": "srv-p1",
            "name": "Psicoterapia Individual Online ou Presencial",
            "description": "Sessões semanais com escuta qualificada e espaço seguro de acolhimento.",
            "price": "R$ 250",
            "duration": "50min",
            "imageUrl": "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=500",
            "featured": true,
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-p2",
            "name": "Processo de Autoconhecimento & Transição de Carreira",
            "description": "Acompanhamento focado em tomada de decisões, burnout e metas de vida.",
            "price": "R$ 280",
            "duration": "50min",
            "imageUrl": "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-p3",
            "name": "Palestras & Rodas de Conversa em Saúde Mental",
            "description": "Encontros para empresas e equipes sobre prevenção de ansiedade e equilíbrio.",
            "price": "Sob Consulta",
            "duration": "1h30",
            "imageUrl": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          }
        ]
      },
      "trustBadges": {
        "enabled": true,
        "items": [
          {
            "id": "tb-1",
            "icon": "credit-card",
            "title": "Cartão até 12x",
            "subtitle": "Crédito e Débito",
            "color": "emerald"
          },
          {
            "id": "tb-2",
            "icon": "zap",
            "title": "Pix Instantâneo",
            "subtitle": "Confirmação na hora",
            "color": "amber"
          },
          {
            "id": "tb-3",
            "icon": "car",
            "title": "Fácil Acesso",
            "subtitle": "Local seguro",
            "color": "sky"
          },
          {
            "id": "tb-4",
            "icon": "shield",
            "title": "Espaço VIP",
            "subtitle": "Climatizado & Café",
            "color": "purple"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre PSI. MARTINA BIANCHI",
        "photoUrl": "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=700",
        "paragraph": "Com 9 anos de prática clínica e mais de 2.400 sessões realizadas, ofereço psicoterapia individual para brasileiros no Brasil e no exterior com foco em ansiedade, burnout e relacionamentos.",
        "closingPhrase": "Cuidar da sua saúde emocional é um ato de coragem."
      },
      "faq": {
        "enabled": true,
        "headline": "Perguntas Frequentes",
        "items": [
          {
            "id": "pf-1",
            "question": "Emite recibo para reembolso no plano de saúde?",
            "answer": "Sim, emitimos documentação fiscal completa para solicitação de reembolso em todos os convênios médicos."
          },
          {
            "id": "pf-2",
            "question": "Como funcionam as sessões online?",
            "answer": "Realizadas por sala de vídeo criptografada com duração de 50 minutos e total privacidade."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "PSI. MARTINA BIANCHI — PSICÓLOGA CLÍNICA · CRP 06/12345",
        "metaDescription": "Psicoterapia individual focada em ansiedade, autoestima, esgotamento profissional e relacionamentos saudáveis.",
        "ogImageUrl": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=900",
        "keywords": "Saúde & Psicologia, microsite, agendamento vip, psi. martina bianchi"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false,
    "isCustomized": true
  },
  {
    "id": "real-niche-fashion",
    "clientName": "HELLEN MARQUES",
    "clientPhone": "5531991390202",
    "clientEmail": "contato@hellenmarques.com.br",
    "nicheCategory": "Moda & E-commerce",
    "createdAt": "2026-11-01",
    "dueDate": "2026-12-01",
    "monthlyFee": 197,
    "status": "active",
    "updatesThisMonth": 1,
    "lastUpdated": "2026-11-01",
    "domainType": "subdomain",
    "subdomain": "hellenmarques",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 119,
    "pageViews": 425,
    "trafficSources": {
      "instagram": 215,
      "tiktok": 60,
      "googleMaps": 86,
      "paidAds": 64,
      "direct": 10
    },
    "isLandingModel": true,
    "data": {
      "theme": "pinkGlam",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {
        "announcement": {
          "bgColor": "#9d174d",
          "textColor": "#ffffff",
          "titleColor": "#ffffff"
        },
        "hero": {
          "headlineColor": "#9d174d",
          "titleColor": "#2b0914",
          "textColor": "#4a1d29",
          "accentColor": "#be185d"
        },
        "urgencyTimer": {
          "bgColor": "#ffffff",
          "headlineColor": "#be185d",
          "titleColor": "#be185d",
          "textColor": "#5c2d3a",
          "accentColor": "#be185d"
        },
        "qualifierFunnel": {
          "bgColor": "linear-gradient(135deg, #be185d 0%, #9d174d 100%)",
          "titleColor": "#ffffff",
          "textColor": "#fce7ee"
        },
        "actionCards": {
          "bgColor": "#ffffff",
          "titleColor": "#2b0914",
          "textColor": "#5c2d3a",
          "accentColor": "#be185d"
        },
        "metrics": {
          "bgColor": "#ffffff",
          "titleColor": "#be185d",
          "textColor": "#5c2d3a",
          "accentColor": "#be185d"
        },
        "processSteps": {
          "bgColor": "#ffffff",
          "headlineColor": "#be185d",
          "titleColor": "#2b0914",
          "textColor": "#5c2d3a",
          "accentColor": "#be185d"
        },
        "services": {
          "bgColor": "#ffffff",
          "headlineColor": "#be185d",
          "titleColor": "#2b0914",
          "textColor": "#5c2d3a",
          "accentColor": "#be185d"
        },
        "studentGrid": {
          "headlineColor": "#be185d",
          "titleColor": "#be185d",
          "textColor": "#5c2d3a",
          "accentColor": "#be185d"
        },
        "locationCard": {
          "bgColor": "#ffffff",
          "headlineColor": "#be185d",
          "titleColor": "#2b0914",
          "textColor": "#5c2d3a",
          "accentColor": "#be185d"
        },
        "aboutMe": {
          "headlineColor": "#be185d",
          "titleColor": "#be185d",
          "textColor": "#3f111d"
        },
        "testimonials": {
          "bgColor": "#ffffff",
          "headlineColor": "#be185d",
          "titleColor": "#2b0914",
          "textColor": "#5c2d3a",
          "accentColor": "#b45309"
        },
        "faq": {
          "bgColor": "#ffffff",
          "headlineColor": "#be185d",
          "titleColor": "#2b0914",
          "textColor": "#5c2d3a"
        },
        "footer": {
          "textColor": "#8b4b5a",
          "accentColor": "#be185d"
        }
      },
      "styling": {
        "fontFamily": "Playfair Display",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 22,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "NOVA COLEÇÃO DISPONÍVEL",
        "text": "Envio expresso para todo o Brasil e motoboy no mesmo dia em SP.",
        "link": "#catalogo"
      },
      "profile": {
        "name": "HELLEN MARQUES",
        "title": "MODA FEMININA, BOUTIQUE & PERSONAL STYLING",
        "tagline": "Peças selecionadas de alfaiataria moderna e looks versáteis para mulheres que amam se vestir com poder.",
        "cursivePhrase": "Vista-se da sua melhor versão todos os dias.",
        "avatarUrl": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5531991390202",
        "instagram": "hellenmarques.store",
        "location": "Showroom Moema - SP · Enviamos para todo o Brasil",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Showroom%20Moema%20-%20SP%20%C2%B7%20Enviamos%20para%20todo%20o%20Brasil"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+12 mil",
        "stat1Label": "CLIENTES NO BRASIL",
        "stat2Value": "24h",
        "stat2Label": "ENVIO EXPRESSO",
        "stat3Value": "5.0 ★",
        "stat3Label": "AVALIAÇÃO VIP"
      },
      "actionCards": [
        {
          "id": "mod-cta-1",
          "title": "VER LANÇAMENTOS & NOVA COLEÇÃO",
          "subtitle": "Confira os looks disponíveis a pronta-entrega com numeração completa.",
          "icon": "Sparkles",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "",
          "openInNewTab": false,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "COLEÇÃO NOVA",
          "customBg": "#e11d74",
          "customText": "#ffffff",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 92,
          "ctaActionText": "VER CATÁLOGO"
        },
        {
          "id": "mod-cta-2",
          "title": "COMPRAR COM CONSULTORA NO WHATSAPP",
          "subtitle": "Atendimento personalizado com vídeos reais das peças e medidas.",
          "icon": "MessageCircle",
          "linkType": "whatsapp",
          "url": "",
          "whatsappMessage": "Olá! Quero atendimento personalizado para ver os lançamentos da loja.",
          "openInNewTab": true,
          "animation": "shimmer",
          "variant": "default",
          "badgeText": "PROVADOR VIP",
          "customBg": "#ffffff",
          "customText": "#4c1d29",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "CHAMAR CONSULTORA"
        },
        {
          "id": "mod-cta-3",
          "title": "AGENDAR MALINHA DELIVERY / SHOWROOM",
          "subtitle": "Receba nossa curadoria de looks na sua casa sem compromisso.",
          "icon": "Calendar",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá! Quero solicitar a Malinha Delivery / Visita ao Showroom.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "",
          "customBg": "#ffffff",
          "customText": "#4c1d29",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": ""
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o atendimento?",
        "subtitle": "Jornada simples, ágil e transparente em 3 etapas",
        "steps": [
          {
            "id": "md-s1",
            "number": "01",
            "title": "Escolha seus Looks no Catálogo",
            "description": "Veja caimento, tamanhos disponíveis e valores da nova coleção."
          },
          {
            "id": "md-s2",
            "number": "02",
            "title": "Atendimento com Consultora de Estilo",
            "description": "Receba vídeos reais das peças e tabela de medidas pelo WhatsApp."
          },
          {
            "id": "md-s3",
            "number": "03",
            "title": "Entrega Expressa ou Malinha VIP",
            "description": "Motoboy no mesmo dia em SP ou envio imediato para todo o Brasil."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e resultados",
        "badge": "GALERIA VIP",
        "layout": "grid3",
        "aspectRatio": "square",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Localização & Horários",
        "address": "Showroom Moema - SP · Enviamos para todo o Brasil",
        "buttonLabel": "Abrir Rota no Google Maps",
        "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Showroom%20Moema%20-%20SP%20%C2%B7%20Enviamos%20para%20todo%20o%20Brasil",
        "hours": "Seg a Sáb · 10:00 às 20:00 · Envio Expresso 24h",
        "openStatus": "COLEÇÃO NOVA NO AR",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Destaques da Nova Coleção & Serviços",
        "subtitle": "Atendimento personalizado com excelência técnica e agendamento prioritário",
        "badge": "CATÁLOGO OFICIAL",
        "layout": "featured",
        "items": [
          {
            "id": "srv-f1",
            "name": "Conjunto Alfaiataria Milanese Premium",
            "description": "Blazer estruturado com corte italiano + calça pantalona de caimento impecável.",
            "price": "R$ 489",
            "duration": "P, M e G",
            "imageUrl": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500",
            "featured": true,
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-f2",
            "name": "Vestido Midi Satin Glam",
            "description": "Tecido acetinado de toque macio, ideal para eventos, jantares e celebrações.",
            "price": "R$ 359",
            "duration": "Pronta-Entrega",
            "imageUrl": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          },
          {
            "id": "srv-f3",
            "name": "Consultoria de Imagem & Coloração Pessoal",
            "description": "Descubra sua cartela de cores e monte um guarda-roupa inteligente.",
            "price": "R$ 590",
            "duration": "2h30",
            "imageUrl": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=500",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp"
          }
        ]
      },
      "trustBadges": {
        "enabled": true,
        "items": [
          {
            "id": "tb-1",
            "icon": "credit-card",
            "title": "Cartão até 12x",
            "subtitle": "Crédito e Débito",
            "color": "emerald"
          },
          {
            "id": "tb-2",
            "icon": "zap",
            "title": "Pix Instantâneo",
            "subtitle": "Confirmação na hora",
            "color": "amber"
          },
          {
            "id": "tb-3",
            "icon": "car",
            "title": "Fácil Acesso",
            "subtitle": "Local seguro",
            "color": "sky"
          },
          {
            "id": "tb-4",
            "icon": "shield",
            "title": "Espaço VIP",
            "subtitle": "Climatizado & Café",
            "color": "purple"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre HELLEN MARQUES",
        "photoUrl": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=700",
        "paragraph": "Mais de 12 mil clientes vestidas em todo o Brasil com nossa curadoria de alfaiataria italiana, vestidos acetinados e consultoria de imagem personalizada.",
        "closingPhrase": "Vista-se da sua melhor versão todos os dias."
      },
      "faq": {
        "enabled": true,
        "headline": "Perguntas Frequentes",
        "items": [
          {
            "id": "mdf-1",
            "question": "Como funciona a Malinha Delivery em São Paulo?",
            "answer": "Enviamos os looks selecionados no seu tamanho até sua casa para você provar com conforto e pagar apenas o que ficar."
          },
          {
            "id": "mdf-2",
            "question": "A primeira troca é gratuita?",
            "answer": "Sim! Garantimos troca fácil e rápida em até 7 dias após o recebimento."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "HELLEN MARQUES — MODA FEMININA, BOUTIQUE & PERSONAL STYLING",
        "metaDescription": "Peças selecionadas de alfaiataria moderna e looks versáteis para mulheres que amam se vestir com poder.",
        "ogImageUrl": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900",
        "keywords": "Moda & Loja, microsite, agendamento vip, hellen marques"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false,
    "isCustomized": true
  },
  {
    "id": "site-1793497400605",
    "clientName": "Ana Luiza Nail Studio",
    "clientPhone": "5531987554321",
    "clientEmail": "contato@analuizanailstudio.com.br",
    "nicheCategory": "Nail Designer & Alongamentos de Luxo",
    "createdAt": "2026-11-01",
    "dueDate": "2026-12-01",
    "monthlyFee": 49.9,
    "maintenancePlan": "pro_4",
    "creationFee": 79.9,
    "isFirstMonth": true,
    "status": "pago",
    "updatesThisMonth": 0,
    "lastUpdated": "2026-11-01",
    "domainType": "subdomain",
    "subdomain": "analuizanailstudio",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 0,
    "pageViews": 120,
    "isLandingModel": false,
    "isTemporaryDemo": true,
    "demoDurationDays": 7,
    "proposalValue": 197,
    "crmStage": "demonstracao",
    "prospectNotes": "",
    "isCustomized": true,
    "data": {
      "theme": "darkGold",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {},
      "styling": {
        "fontFamily": "Playfair Display",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 25,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": false,
        "badge": "AGENDA VIP ABERTA",
        "text": "Últimos horários disponíveis nesta semana. Reserve seu atendimento exclusivo!",
        "link": "#booking"
      },
      "profile": {
        "name": "ANA LUIZA NAIL STUDIO",
        "title": "ESPECIALIDADE PRINCIPAL EM NAIL DESIGNER & ALONGAMENTOS DE LUXO",
        "tagline": "Alongamentos de alta resistência, curvatura C slim e acabamento ultra fino com biossegurança hospitalar.",
        "cursivePhrase": "Excelência, sofisticação e cuidado em cada detalhe.",
        "avatarUrl": "/assets/models/analuizanailstudio/avatar.jpg",
        "aboutPhotoUrl": "/assets/models/analuizanailstudio/about.jpg",
        "whatsapp": "5531987554321",
        "instagram": "analuizanailstudio",
        "location": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "mapsUrl": "https://maps.google.com/?q=Ana+Luiza+Nail+Studio+Belo+Horizonte+-+MG"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+500",
        "stat1Label": "CLIENTES",
        "stat2Value": "8 anos",
        "stat2Label": "DE EXPERIÊNCIA",
        "stat3Value": "95%",
        "stat3Label": "DE SATISFAÇÃO",
        "items": [
          {
            "value": "5.0★",
            "label": "Avaliação no Google"
          },
          {
            "value": "+92",
            "label": "Clientes Atendidas"
          },
          {
            "value": "100%",
            "label": "Atendimento VIP"
          }
        ]
      },
      "actionCards": [
        {
          "id": "cta-1",
          "title": "AGENDAR MEU HORÁRIO NO WHATSAPP",
          "subtitle": "Atendimento rápido e personalizado com hora marcada",
          "icon": "Calendar",
          "linkType": "whatsapp",
          "url": "https://wa.me/5531987554321",
          "whatsappMessage": "Olá! Vi seu microsite e gostaria de agendar um horário.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "MAIS PROCURADO",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 88,
          "ctaActionText": "AGENDAR AGORA"
        },
        {
          "id": "cta-2",
          "title": "CONHECER CATÁLOGO DE SERVIÇOS",
          "subtitle": "Confira todos os procedimentos e protocolos exclusivos",
          "icon": "Sparkles",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "Olá! Gostaria de agendar um horário.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "PROCEDIMENTOS",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 88,
          "ctaActionText": "VER SERVIÇOS"
        },
        {
          "id": "cta-3",
          "title": "COMO CHEGAR · LOCALIZAÇÃO NO MAPS",
          "subtitle": "Rua Tomé de Souza, 800 - Savassi, Belo Horizonte - MG",
          "icon": "MapPin",
          "linkType": "maps",
          "url": "https://maps.google.com",
          "whatsappMessage": "Olá! Gostaria de agendar um horário.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "ROTAS GPS",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 88,
          "ctaActionText": "ABRIR MAPA"
        }
      ],
      "processSteps": {
        "enabled": false,
        "headline": "Como funciona o processo?",
        "subtitle": "Simples, seguro e totalmente transparente em 3 etapas",
        "steps": [
          {
            "id": "step-1",
            "number": "01",
            "title": "Primeiro Contato & Triagem",
            "description": "Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade."
          },
          {
            "id": "step-2",
            "number": "02",
            "title": "Consulta Estratégica",
            "description": "Análise aprofundada da sua situação com plano de ação sob medida."
          },
          {
            "id": "step-3",
            "number": "03",
            "title": "Execução & Acompanhamento",
            "description": "Defesa contínua e comunicação clara em todas as etapas."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Resultados Reais & Portfólio em Destaque",
        "subtitle": "Procedimentos e resultados reais do nosso espaço",
        "badge": "ESTRUTURA VIP",
        "layout": "smart_masonry",
        "aspectRatio": "auto",
        "enableLightbox": true,
        "photos": [
          "/assets/models/analuizanailstudio/portfolio-1.jpg",
          "/assets/models/analuizanailstudio/portfolio-2.jpg",
          "/assets/models/analuizanailstudio/portfolio-3.jpg",
          "/assets/models/analuizanailstudio/portfolio-4.jpg",
          "/assets/models/analuizanailstudio/portfolio-5.jpg",
          "/assets/models/analuizanailstudio/portfolio-6.jpg"
        ],
        "captions": [
          "🤎\n\n#naildesignerbh  #alongamentodeunha #esmaltaçaoemgel #belohorizontemg",
          "🤎\n\n#naildesignerbh  #alongamentodeunha #esmaltaçaoemgel #belohorizontemg",
          "A estampa de poá voltou com tudo! Delicada, clássica e super em alta. ✨\n\n#nailart #esmaltacaoemgel #belohorizonte #estampapoa",
          "❤️\n\n#naildesigner #belohorizontemg #esmaltacaoemgel❤️",
          "A estampa de poá voltou com tudo! Delicada, clássica e super em alta. ✨\n\n#nailart #esmaltacaoemgel #belohorizonte #estampapoa",
          "❤️🔥 \n\n #esmaltemagnético #nails #belohorizonte"
        ],
        "badgeText": "PORTFÓLIO OFICIAL"
      },
      "locationCard": {
        "enabled": true,
        "headline": "Nossa Localização",
        "address": "Rua Tomé de Souza, 800 - Savassi, Belo Horizonte - MG",
        "buttonLabel": "Traçar Rota no Google Maps",
        "mapsUrl": "https://maps.google.com",
        "hours": "Seg a Sáb · 08:30 às 19:30",
        "openStatus": "Atendimento com Hora Marcada",
        "showHours": true,
        "title": "Localização & Espaço Exclusivo"
      },
      "services": {
        "enabled": true,
        "headline": "Procedimentos & Serviços Exclusivos",
        "subtitle": "Protocolos personalizados baseados nas técnicas do nosso espaço",
        "badge": "CATÁLOGO VIP",
        "layout": "list",
        "items": [
          {
            "id": "srv-1",
            "name": "Alongamento em Fibra de Vidro Slim",
            "category": "Principal",
            "description": "Estrutura ultrafina, natural e resistente com curvatura C milimétrica e acabamento imperceptível.",
            "price": "R$ 190,00",
            "oldPrice": "",
            "duration": "2h00",
            "badge": "MAIS PEDIDO",
            "ctaLabel": "Agendar Horário",
            "actionType": "booking",
            "customUrl": "",
            "whatsappMessage": "Olá! Gostaria de agendar o procedimento de Alongamento em Fibra de Vidro Slim com vocês.",
            "featured": true,
            "imageUrl": "/assets/models/analuizanailstudio/service-1.jpg"
          },
          {
            "id": "srv-2",
            "name": "Blindagem Diamante com Banho de Gel",
            "category": "Principal",
            "description": "Fortalecimento das unhas naturais para prevenir quebras com brilho espelhado de alta durabilidade.",
            "price": "R$ 130,00",
            "oldPrice": "",
            "duration": "1h15",
            "badge": "NATURAL",
            "ctaLabel": "Agendar Horário",
            "actionType": "booking",
            "customUrl": "",
            "whatsappMessage": "Olá! Gostaria de agendar o procedimento de Blindagem Diamante com Banho de Gel com vocês.",
            "featured": true,
            "imageUrl": "/assets/models/analuizanailstudio/service-2.jpg"
          },
          {
            "id": "srv-3",
            "name": "Esmaltação em Gel de Longa Duração",
            "category": "Especialidades",
            "description": "Secagem instantânea em cabine LED com durabilidade de até 25 dias sem lascar nem perder o brilho.",
            "price": "R$ 95,00",
            "oldPrice": "",
            "duration": "1h00",
            "badge": "SEM LASCAR",
            "ctaLabel": "Agendar Horário",
            "actionType": "booking",
            "customUrl": "",
            "whatsappMessage": "Olá! Gostaria de agendar o procedimento de Esmaltação em Gel de Longa Duração com vocês.",
            "featured": false,
            "imageUrl": "/assets/models/analuizanailstudio/service-3.jpg"
          },
          {
            "id": "srv-4",
            "name": "Spa dos Pés com Imersão & Velas Aquecidas",
            "category": "Especialidades",
            "description": "Esfoliação refinada, hidratação profunda e massagem terapêutica com óleos essenciais.",
            "price": "R$ 120,00",
            "oldPrice": "",
            "duration": "1h00",
            "badge": "RELAXANTE",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "whatsappMessage": "Olá! Gostaria de agendar o procedimento de Spa dos Pés com Imersão & Velas Aquecidas com vocês.",
            "featured": false,
            "imageUrl": "/assets/models/analuizanailstudio/service-4.jpg"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "O Que Dizem No Google Meu Negócio",
        "items": [
          {
            "id": "t-1",
            "clientName": "Bruna Vasconcelos",
            "city": "Belo Horizonte - MG",
            "text": "A melhor nail designer de BH! Minha fibra dura mais de 30 dias sem quebrar nem descolar. Super fina e natural.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Tatiana Rezende",
            "city": "Belo Horizonte - MG",
            "text": "Espaço maravilhoso, pontualidade britânica e materiais totalmente esterilizados em autoclave. Recomendo de olhos fechados!",
            "rating": 5
          },
          {
            "id": "t-3",
            "clientName": "Lorena Castro",
            "city": "Belo Horizonte - MG",
            "text": "Atendimento VIP com cafezinho e poltrona super confortável. O banho de gel salvou minhas unhas.",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": false,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Atendimento Personalizado",
        "subtitle": "Responda 3 perguntas rápidas para agilizar seu atendimento no WhatsApp:",
        "questions": [
          {
            "id": "q-1",
            "question": "Qual procedimento você tem mais interesse hoje?",
            "options": [
              "Alongamento em Fibra de Vidro Slim",
              "Blindagem Diamante com Banho de Gel",
              "Esmaltação em Gel de Longa Duração",
              "Avaliação Personalizada"
            ]
          },
          {
            "id": "q-2",
            "question": "Qual o melhor período para o seu horário?",
            "options": [
              "Manhã",
              "Tarde",
              "Final do dia / Sábado",
              "Qualquer horário disponível"
            ]
          },
          {
            "id": "q-3",
            "question": "Qual o seu objetivo principal?",
            "options": [
              "Primeiro atendimento",
              "Manutenção",
              "Ocasião especial",
              "Quero tirar dúvidas"
            ]
          }
        ],
        "buttonLabel": "✨ Descobrir Procedimento Ideal (Triagem VIP)"
      },
      "aboutMe": {
        "enabled": true,
        "headline": "SOBRE A ESPECIALISTA & NOSSO ESPAÇO",
        "photoUrl": "",
        "paragraph": "Com anos de dedicação e constante aperfeiçoamento técnico, o Ana Luiza Nail Studio consolidou-se como referência em Nail Designer & Alongamentos de Luxo em Savassi. Cada protocolo é conduzido de forma individualizada, respeitando a anatomia e a preferência de cada cliente em um ambiente de alto padrão, conforto e biossegurança rigorosa.",
        "closingPhrase": "Sua beleza e bem-estar, nosso maior compromisso."
      },
      "faq": {
        "enabled": true,
        "headline": "Dúvidas Frequentes",
        "items": [
          {
            "id": "faq-1",
            "question": "Como faço para agendar meu horário?",
            "answer": "Basta clicar no botão de WhatsApp ou no catálogo de serviços para escolher seu melhor dia e horário."
          },
          {
            "id": "faq-2",
            "question": "Onde o espaço está localizado?",
            "answer": "Estamos localizados no endereço Rua Tomé de Souza, 800 - Savassi, Belo Horizonte - MG, com fácil acesso e ambiente climatizado."
          },
          {
            "id": "faq-3",
            "question": "Quais são as formas de pagamento aceitas?",
            "answer": "Aceitamos Pix, cartões de crédito e débito com parcelamento disponível."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá {nome}! Acessei seu link oficial e gostaria de agendar um horário para {servico}."
      },
      "seo": {
        "metaTitle": "ANA LUIZA NAIL STUDIO — ESPECIALIDADE PRINCIPAL EM NAIL DESIGNER & ALONGAMENTOS DE LUXO",
        "metaDescription": "Alongamentos de alta resistência, curvatura C slim e acabamento ultra fino com biossegurança hospitalar.",
        "ogImageUrl": "",
        "keywords": "advogada, consultoria, direito, atendimento vip, advocacia"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      },
      "trustBadges": {
        "enabled": true,
        "items": [
          {
            "id": "tb-1",
            "icon": "credit-card",
            "title": "Pague no cartão",
            "subtitle": "Crédito e Débito",
            "color": "emerald"
          },
          {
            "id": "tb-2",
            "icon": "zap",
            "title": "Pix Instantâneo",
            "subtitle": "Confirmação na hora",
            "color": "amber"
          },
          {
            "id": "tb-3",
            "icon": "car",
            "title": "Fácil Acesso",
            "subtitle": "Local seguro",
            "color": "sky"
          },
          {
            "id": "tb-4",
            "icon": "shield",
            "title": "Espaço VIP",
            "subtitle": "Climatizado & Café",
            "color": "purple"
          }
        ]
      }
    },
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false,
    "prospectInstagram": "analuizanailstudio",
    "prospectSituation": "wa_direto",
    "demoExpiresAt": "2026-11-08T02:10:50.489Z"
  },
  {
    "id": "site-3",
    "clientName": "Larissa Almeida Nail Designer",
    "clientPhone": "5511977776666",
    "clientEmail": "larissa.nails@gmail.com",
    "nicheCategory": "Beleza & Unhas",
    "createdAt": "2026-07-01",
    "dueDate": "2026-10-10",
    "monthlyFee": 29.9,
    "maintenancePlan": "basic_1",
    "creationFee": 149.9,
    "isFirstMonth": false,
    "status": "disabled",
    "updatesThisMonth": 2,
    "lastUpdated": "2026-09-28",
    "domainType": "subdomain",
    "subdomain": "larissaalmeida",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 18,
    "pageViews": 190,
    "trafficSources": {
      "instagram": 120,
      "tiktok": 40,
      "googleMaps": 15,
      "paidAds": 0,
      "direct": 15
    },
    "data": {
      "theme": "darkGold",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {
        "announcement": {
          "bgColor": "#d4af37",
          "textColor": "#0c0b0b",
          "titleColor": "#0c0b0b"
        },
        "hero": {
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "urgencyTimer": {
          "bgColor": "rgba(212, 175, 55, 0.12)",
          "headlineColor": "#d4af37",
          "titleColor": "#d4af37",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "qualifierFunnel": {
          "bgColor": "linear-gradient(135deg, #d4af37 0%, #b89726 100%)",
          "titleColor": "#0c0b0b",
          "textColor": "#26221c"
        },
        "actionCards": {
          "bgColor": "linear-gradient(145deg, #f5ede4 0%, #dfd3c3 100%)",
          "titleColor": "#2a241e",
          "textColor": "#574c40",
          "accentColor": "#d4af37"
        },
        "metrics": {
          "bgColor": "rgba(212, 175, 55, 0.12)",
          "titleColor": "#d4af37",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "processSteps": {
          "bgColor": "rgba(212, 175, 55, 0.12)",
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "services": {
          "bgColor": "rgba(255, 255, 255, 0.05)",
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "studentGrid": {
          "headlineColor": "#d4af37",
          "titleColor": "#d4af37",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "locationCard": {
          "bgColor": "rgba(212, 175, 55, 0.12)",
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3",
          "accentColor": "#d4af37"
        },
        "aboutMe": {
          "headlineColor": "#d4af37",
          "titleColor": "#d4af37",
          "textColor": "#f5ede4"
        },
        "testimonials": {
          "bgColor": "rgba(212, 175, 55, 0.12)",
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3",
          "accentColor": "#fbbf24"
        },
        "faq": {
          "bgColor": "rgba(212, 175, 55, 0.1)",
          "headlineColor": "#d4af37",
          "titleColor": "#ffffff",
          "textColor": "#dfd3c3"
        },
        "footer": {
          "textColor": "#c5b49f",
          "accentColor": "#d4af37"
        }
      },
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
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "CONSULTORIA VIP",
        "text": "Agenda de consultorias e atendimentos aberta.",
        "link": "#agendar"
      },
      "profile": {
        "name": "LARISSA ALMEIDA NAILS",
        "title": "NAIL DESIGNER & ALONGAMENTO DE LUXO",
        "tagline": "Especialista em Fibra de Vidro Slim, Gel Moldado e Naturalidade Europeia.",
        "cursivePhrase": "Elegância e sofisticação na ponta dos seus dedos.",
        "avatarUrl": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5511999999999",
        "instagram": "dramarinaalmeida",
        "location": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "mapsUrl": "https://maps.google.com"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+500",
        "stat1Label": "CLIENTES",
        "stat2Value": "8 anos",
        "stat2Label": "DE EXPERIÊNCIA",
        "stat3Value": "95%",
        "stat3Label": "DE SATISFAÇÃO"
      },
      "actionCards": [
        {
          "id": "nails-s3-cta1",
          "title": "AGENDAR MEU HORÁRIO NO STUDIO",
          "subtitle": "Alongamento em Fibra, Banho de Gel e Esmaltação Premium.",
          "icon": "Calendar",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá! Gostaria de agendar uma consulta.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "default",
          "badgeText": "VAGAS LIMITADAS",
          "customBg": "#d4af37",
          "customText": "#000000",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=500",
          "imageFitStyle": "popout",
          "imageSize": 96,
          "ctaActionText": "AGENDAR AGORA"
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o processo?",
        "subtitle": "Simples, seguro e totalmente transparente em 3 etapas",
        "steps": [
          {
            "id": "step-1",
            "number": "01",
            "title": "Primeiro Contato & Triagem",
            "description": "Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade."
          },
          {
            "id": "step-2",
            "number": "02",
            "title": "Consulta Estratégica",
            "description": "Análise aprofundada da sua situação com plano de ação sob medida."
          },
          {
            "id": "step-3",
            "number": "03",
            "title": "Execução & Acompanhamento",
            "description": "Defesa contínua e comunicação clara em todas as etapas."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e excelência jurídica",
        "badge": "ESTRUTURA VIP",
        "layout": "smart_masonry",
        "aspectRatio": "auto",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": []
      },
      "locationCard": {
        "enabled": true,
        "headline": "Nossa Localização",
        "address": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "buttonLabel": "Abrir no Google Maps",
        "mapsUrl": "https://maps.google.com",
        "hours": "Seg a Sáb · 08:30 às 19:30",
        "openStatus": "ABERTO AGORA · HORA MARCADA",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Menu de Alongamentos & Nail Care",
        "subtitle": "Procedimentos, consultorias e soluções sob medida para o seu objetivo",
        "badge": "CATÁLOGO VIP",
        "layout": "list",
        "items": [
          {
            "id": "srv-la-1",
            "name": "Alongamento em Fibra de Vidro Slim",
            "description": "Curvatura natural, resistência extrema e acabamento ultrafino.",
            "price": "R$ 240",
            "duration": "2h00",
            "featured": true,
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp",
            "imageUrl": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=500"
          },
          {
            "id": "srv-la-2",
            "name": "Banho de Gel & Blindagem Diamante",
            "description": "Proteção estrutural para o crescimento saudável das unhas naturais.",
            "price": "R$ 160",
            "duration": "1h30",
            "featured": false,
            "badge": "EXCLUSIVO",
            "ctaLabel": "Reservar no WhatsApp",
            "actionType": "whatsapp",
            "imageUrl": "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=500"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre mim",
        "paragraph": "Com mais de 8 anos de atuação, acredito que a prestação de serviços deve unir excelência técnica e acolhimento humano. Cada pessoa traz uma história única que merece atenção dedicada e soluções assertivas.",
        "closingPhrase": "Sua segurança jurídica, meu compromisso."
      },
      "faq": {
        "enabled": true,
        "headline": "Dúvidas Frequentes",
        "items": [
          {
            "id": "faq-1",
            "question": "Como funciona a primeira consulta?",
            "answer": "Realizamos um atendimento inicial para entender seu caso a fundo e traçar a melhor estratégia."
          },
          {
            "id": "faq-2",
            "question": "O atendimento pode ser 100% online?",
            "answer": "Sim, atendemos clientes do Brasil e do exterior por videoconferência com total sigilo e comodidade."
          },
          {
            "id": "faq-3",
            "question": "Quais áreas você atende?",
            "answer": "Atuação especializada em consultoria jurídica, contratos, planejamento familiar e previdenciário."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "DRA. MARINA ALMEIDA — Advocacia Estratégica & Consultoria VIP",
        "metaDescription": "Atendimento jurídico humanizado e focado em resultados. Agende sua consultoria presencial ou online.",
        "ogImageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
        "keywords": "advogada, consultoria, direito, atendimento vip, advocacia"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": true
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 22,
    "edicoesBloqueadas": true,
    "linkStatus": "manutencao",
    "autoDisabledByOverdue": true,
    "isLandingModel": false,
    "manualOverrideUntil": "2026-10-28",
    "isCustomized": true,
    "isUnderConstruction": false,
    "underConstruction": false
  },
  {
    "id": "site-1793226491846",
    "clientName": "Katherine Nail Designer",
    "clientPhone": "5531992742464",
    "clientEmail": "contato.katherinenails@gmail.com",
    "nicheCategory": "Beleza & Estética",
    "createdAt": "2026-10-28",
    "dueDate": "2026-11-27",
    "monthlyFee": 49.9,
    "maintenancePlan": "pro_4",
    "creationFee": 79.9,
    "isFirstMonth": true,
    "status": "pago",
    "updatesThisMonth": 0,
    "lastUpdated": "2026-10-28",
    "domainType": "subdomain",
    "subdomain": "katherinenails",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 0,
    "pageViews": 100,
    "isLandingModel": false,
    "data": {
      "theme": "roseGoldQuartz",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {},
      "styling": {
        "fontFamily": "Playfair Display",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 25,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "AGENDA EXCLUSIVA",
        "text": "Horários limitados para esta semana. Garanta seu atendimento VIP!",
        "link": "#whatsapp"
      },
      "profile": {
        "name": "KATHERINE NAIL DESIGNER",
        "title": "ESPECIALISTA EM UNHAS NATURAIS & ALONGAMENTOS",
        "tagline": "Realçando a beleza e a saúde das suas unhas com acabamento natural, cutilagem perfeita e cuidado de alto padrão.",
        "cursivePhrase": "Elegância, precisão e bem-estar em cada detalhe.",
        "avatarUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900",
        "aboutPhotoUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700",
        "whatsapp": "5531992742464",
        "instagram": "_katherinenails_",
        "location": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "mapsUrl": "https://maps.app.goo.gl/f5NQvMSZD6K5bHTK7"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+500",
        "stat1Label": "CLIENTES",
        "stat2Value": "8 anos",
        "stat2Label": "DE EXPERIÊNCIA",
        "stat3Value": "95%",
        "stat3Label": "DE SATISFAÇÃO",
        "items": [
          {
            "value": "5.0★",
            "label": "Google Avaliações"
          },
          {
            "value": "+800",
            "label": "Unhas Transformadas"
          },
          {
            "value": "100%",
            "label": "Biossegurança & Conforto"
          }
        ]
      },
      "actionCards": [
        {
          "id": "cta-1",
          "title": "AGENDAR HORÁRIO NO WHATSAPP",
          "subtitle": "Atendimento com hora marcada e consulta de disponibilidade",
          "icon": "Calendar",
          "linkType": "whatsapp",
          "url": "#whatsapp",
          "whatsappMessage": "Olá Katherine! Vi seu microsite VIP e gostaria de consultar horários disponíveis para agendamento.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "MAIS PROCURADO",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 88,
          "ctaActionText": "AGENDAR AGORA"
        },
        {
          "id": "cta-2",
          "title": "CONHECER PROCEDIMENTOS",
          "subtitle": "Alongamentos, blindagem, cutilagem e plástica dos pés",
          "icon": "Sparkles",
          "linkType": "catalogo",
          "url": "#services",
          "whatsappMessage": "Olá! Gostaria de agendar um horário.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "CATÁLOGO",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 88,
          "ctaActionText": "VER PROCEDIMENTOS"
        },
        {
          "id": "cta-3",
          "title": "COMO CHEGAR · LOCALIZAÇÃO",
          "subtitle": "Rua Maurício de Nassau, 226 D - Glória, Belo Horizonte - MG",
          "icon": "MapPin",
          "linkType": "maps",
          "url": "https://maps.app.goo.gl/f5NQvMSZD6K5bHTK7",
          "whatsappMessage": "Olá! Gostaria de agendar um horário.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "ROTA GPS",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 88,
          "ctaActionText": "ABRIR NO MAPS"
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o processo?",
        "subtitle": "Simples, seguro e totalmente transparente em 3 etapas",
        "steps": [
          {
            "id": "step-1",
            "number": "01",
            "title": "Primeiro Contato & Triagem",
            "description": "Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade."
          },
          {
            "id": "step-2",
            "number": "02",
            "title": "Consulta Estratégica",
            "description": "Análise aprofundada da sua situação com plano de ação sob medida."
          },
          {
            "id": "step-3",
            "number": "03",
            "title": "Execução & Acompanhamento",
            "description": "Defesa contínua e comunicação clara em todas as etapas."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Resultados Reais & Procedimentos",
        "subtitle": "Confira alguns dos trabalhos mais admirados do nosso espaço",
        "badge": "ESTRUTURA VIP",
        "layout": "smart_masonry",
        "aspectRatio": "auto",
        "enableLightbox": true,
        "photos": [
          "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=700",
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=700"
        ],
        "captions": [
          "Alongamento estruturado com curvatura elegante e acabamento fino",
          "Alinhamento e blindagem para fortalecimento de unhas naturais",
          "Cutilagem russa/combinada limpa, uniforme e sem agressões",
          "Plástica dos pés com renovação e maciez profunda desde a primeira sessão",
          "Manutenção em dia garantindo saúde, brilho e máxima retenção",
          "Ambiente aconchegante com materiais esterilizados e biossegurança rigorosa"
        ],
        "badgeText": "PORTFÓLIO VIP"
      },
      "locationCard": {
        "enabled": true,
        "headline": "Nossa Localização",
        "address": "R. Maurício de Nassau, 226 D - Glória, Belo Horizonte - MG, 30880-030",
        "buttonLabel": "Traçar Rota no Google Maps",
        "mapsUrl": "https://maps.app.goo.gl/f5NQvMSZD6K5bHTK7",
        "hours": "Terça a Sábado · 09:00 às 19:00",
        "openStatus": "Atendimento com Hora Marcada",
        "showHours": true,
        "title": "Localização & Atendimento Exclusivo"
      },
      "services": {
        "enabled": true,
        "headline": "Procedimentos & Protocolos Exclusivos",
        "subtitle": "Técnicas modernas focadas em durabilidade, saúde e naturalidade",
        "badge": "CATÁLOGO VIP",
        "layout": "list",
        "items": [
          {
            "id": "srv-1",
            "name": "Alongamento de Unhas (Gel / Fibra)",
            "description": "Estrutura personalizada com curvatura perfeita, espessura natural e alta durabilidade para valorizar suas mãos.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "2h00",
            "badge": "MAIS PEDIDO",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "featured": true,
            "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300"
          },
          {
            "id": "srv-2",
            "name": "Tratamento & Fortalecimento de Unhas Naturais",
            "description": "Protocolo de blindagem ou banho de gel para quem busca proteger, dar resistência e manter o comprimento natural.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "1h15",
            "badge": "NATURALIDADE",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "featured": true,
            "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300"
          },
          {
            "id": "srv-3",
            "name": "Cutilagem Perfeita & Esmaltação em Gel",
            "description": "Remoção precisa e delicada das cutículas sem corte excessivo, com acabamento impecável e brilho prolongado.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "1h00",
            "badge": "IMPECÁVEL",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "featured": false,
            "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300"
          },
          {
            "id": "srv-4",
            "name": "Plástica dos Pés (Spa & Renovação)",
            "description": "Remoção de calosidades, asperezas e células mortas, devolvendo maciez extrema, hidratação profunda e bem-estar aos pés.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "1h00",
            "badge": "SPA & CUIDADO",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "featured": true,
            "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300"
          },
          {
            "id": "srv-5",
            "name": "Manutenção Estrutural de Alongamento",
            "description": "Reposição de produto, rebalanceamento de ápice e higienização completa para manter suas unhas saudáveis e lindas.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "1h30",
            "badge": "ESSENCIAL",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "featured": false,
            "imageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=300"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Quem Confia",
        "items": [
          {
            "id": "t-1",
            "clientName": "Camila Rezende",
            "city": "Belo Horizonte - MG",
            "text": "A Katherine tem mãos de fada! O alongamento fica super natural, fininho e dura muito sem descolar. Não troco por nada.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Jéssica Moreira",
            "city": "Belo Horizonte - MG",
            "text": "A plástica dos pés é simplesmente transformadora, saí pisando em nuvens. Atendimento impecável e espaço super higienizado.",
            "rating": 5
          },
          {
            "id": "t-3",
            "clientName": "Fernanda Alvarenga",
            "city": "Belo Horizonte - MG",
            "text": "Cutilagem impecável e acabamento que dura semanas intacto. Pontualidade e atenção aos detalhes que fazem toda a diferença.",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Rápida & Personalizada",
        "subtitle": "Responda a 3 perguntas para direcionarmos seu agendamento direto no WhatsApp:",
        "questions": [
          {
            "id": "q-1",
            "question": "Qual procedimento você deseja realizar?",
            "options": [
              "Alongamento de Unhas",
              "Cuidados com Unhas Naturais",
              "Cutilagem & Esmaltação",
              "Plástica dos Pés"
            ]
          },
          {
            "id": "q-2",
            "question": "Você já possui algum produto nas unhas atualmente?",
            "options": [
              "Não, unhas naturais limpas",
              "Sim, alongamento para manutenção",
              "Sim, esmaltação em gel/blindagem",
              "Sim, preciso fazer remoção"
            ]
          },
          {
            "id": "q-3",
            "question": "Qual é a sua preferência de dia/horário?",
            "options": [
              "Dias de semana pela manhã",
              "Dias de semana à tarde",
              "Sábado",
              "Primeiro horário disponível"
            ]
          }
        ],
        "buttonLabel": "✨ Descobrir Meu Atendimento Ideal"
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre Katherine & Nosso Espaço",
        "paragraph": "Com mais de 8 anos de atuação, acredito que a prestação de serviços deve unir excelência técnica e acolhimento humano. Cada pessoa traz uma história única que merece atenção dedicada e soluções assertivas.",
        "closingPhrase": "Sua segurança jurídica, meu compromisso.",
        "bioText": "Com foco na valorização da autoestima e saúde das unhas, nosso espaço une técnicas avançadas, instrumentos esterilizados e atendimento personalizado no bairro Glória. Cada procedimento é realizado com calma, precisão e respeito à anatomia da sua unha, entregando um acabamento sofisticado e duradouro.",
        "badges": [
          "Acabamento Natural",
          "Biossegurança Total",
          "Atendimento VIP",
          "Hora Marcada"
        ]
      },
      "faq": {
        "enabled": true,
        "headline": "Dúvidas Frequentes",
        "items": [
          {
            "id": "faq-1",
            "question": "Quanto tempo dura um alongamento de unhas?",
            "answer": "Com os cuidados corretos e manutenção a cada 20 a 25 dias, a estrutura se mantém firme, saudável e impecável indefinidamente."
          },
          {
            "id": "faq-2",
            "question": "A plástica dos pés dói ou agride a pele?",
            "answer": "Não! O procedimento é suave, seguro e indolor. Ele atua amolecendo as camadas queratinizadas e devolvendo a emoliência e a maciez da pele dos pés."
          },
          {
            "id": "faq-3",
            "question": "Como funciona o agendamento de horários?",
            "answer": "Trabalhamos exclusivamente com horário marcado para dedicar atenção exclusiva a cada cliente. Basta clicar no botão de WhatsApp para reservar seu horário."
          },
          {
            "id": "faq-4",
            "question": "Quais são as formas de pagamento aceitas?",
            "answer": "Aceitamos pagamentos via Pix, cartões de débito e crédito."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "KATHERINE NAIL DESIGNER — ESPECIALISTA EM UNHAS NATURAIS & ALONGAMENTOS",
        "metaDescription": "Realçando a beleza e a saúde das suas unhas com acabamento natural, cutilagem perfeita e cuidado de alto padrão.",
        "ogImageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900",
        "keywords": "advogada, consultoria, direito, atendimento vip, advocacia"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      }
    },
    "isCustomized": false,
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false
  },
  {
    "id": "site-1793479877298",
    "clientName": "STUDIO BELLA LASH & ESTÉTICA",
    "clientPhone": "31998765432",
    "clientEmail": "bellalash-oficial@biovip.com.br",
    "nicheCategory": "Dark & Luxo",
    "createdAt": "2026-10-31",
    "dueDate": "2026-11-30",
    "monthlyFee": 49.9,
    "maintenancePlan": "pro_4",
    "creationFee": 79.9,
    "isFirstMonth": true,
    "status": "pago",
    "updatesThisMonth": 0,
    "lastUpdated": "2026-10-31",
    "domainType": "subdomain",
    "subdomain": "bellalash-oficial",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 0,
    "pageViews": 120,
    "isLandingModel": false,
    "isTemporaryDemo": false,
    "demoDurationDays": 7,
    "proposalValue": 197,
    "crmStage": "demonstracao",
    "prospectNotes": "",
    "isCustomized": true,
    "data": {
      "theme": "roseGoldQuartz",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {},
      "styling": {
        "fontFamily": "Playfair Display",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 390,
        "photoScale": 100,
        "photoPosY": 25,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start"
      },
      "announcement": {
        "enabled": true,
        "badge": "AGENDA VIP ABERTA",
        "text": "Últimos horários disponíveis para esta semana.",
        "link": "#booking"
      },
      "profile": {
        "name": "STUDIO BELLA LASH · LUXURY VIP",
        "title": "ESPECIALISTA EM EXTENSÃO DE CÍLIOS & NANOBLADING",
        "tagline": "O olhar mais desejado de Belo Horizonte com atendimento exclusivo e biossegurança hospitalar.",
        "cursivePhrase": "Realçando a sua beleza natural com amor e precisão",
        "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
        "aboutPhotoUrl": "/assets/models/bellalash-oficial/about.jpg",
        "whatsapp": "31998765432",
        "instagram": "bellalash.oficial",
        "location": "Atendimento com Hora Marcada · Rio de Janeiro - RJ",
        "mapsUrl": "https://maps.google.com"
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "291",
        "stat1Label": "SEGUIDORES NO INSTA",
        "stat2Value": "100%",
        "stat2Label": "QUALIDADE VIP",
        "stat3Value": "5.0★",
        "stat3Label": "GOOGLE MEU NEGÓCIO"
      },
      "actionCards": [
        {
          "id": "cta-1",
          "title": "GARANTA SEU AGENDAMENTO VIP NO WHATSAPP",
          "subtitle": "Atendimento exclusivo com hora marcada para cuidar do seu olhar e lábios.",
          "icon": "Calendar",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá! Gostaria de agendar um horário no Studio Bella Lash & Estética.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "MAIS PROCURADO",
          "customBg": "#e2b857",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "right",
          "cardImage": "data:image/jpeg;base64,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",
          "imageFitStyle": "popout",
          "imageSize": 92,
          "ctaActionText": "AGENDAR AGORA"
        },
        {
          "id": "cta-2",
          "title": "CONFIRA NOSSOS PROCEDIMENTOS & SERVIÇOS",
          "subtitle": "Conheça as técnicas de extensão de cílios e Hydra Gloss disponíveis.",
          "icon": "Sparkles",
          "linkType": "catalogo",
          "url": "#catalogo",
          "whatsappMessage": "Olá! Gostaria de consultar a tabela de procedimentos.",
          "openInNewTab": false,
          "animation": "shimmer",
          "variant": "default",
          "badgeText": "CATÁLOGO VIP",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "left",
          "cardImage": "data:image/jpeg;base64,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",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "VER MAIS"
        },
        {
          "id": "cta-3",
          "title": "COMO CHEGAR (LOCALIZAÇÃO GOOGLE MAPS)",
          "subtitle": "Abra a rota direta no Google Maps para vir até o nosso espaço.",
          "icon": "MapPin",
          "linkType": "custom",
          "url": "https://maps.google.com",
          "whatsappMessage": "Olá! Gostaria de confirmar a localização do estúdio.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "GOOGLE MAPS",
          "customBg": "#ffffff",
          "customText": "#0f172a",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 84,
          "ctaActionText": "ABRIR ROTA"
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
            "title": "Escolha do Procedimento",
            "description": "Você seleciona a técnica ideal para o seu perfil através do nosso WhatsApp ou triagem."
          },
          {
            "id": "step-2",
            "number": "02",
            "title": "Agendamento Prático",
            "description": "Definimos juntos o melhor dia e horário para o seu atendimento exclusivo."
          },
          {
            "id": "step-3",
            "number": "03",
            "title": "Olhar Impecável",
            "description": "Desfrute de um ambiente acolhedor e saia pronta para arrasar todos os dias."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Resultados & Galeria de Procedimentos",
        "subtitle": "Confira os registros de procedimentos e trabalhos no nosso Instagram",
        "badge": "PORTFÓLIO & RESULTADOS",
        "layout": "smart_masonry",
        "aspectRatio": "auto",
        "enableLightbox": true,
        "photos": [
          "/assets/models/bellalash-oficial/portfolio-1.jpg",
          "/assets/models/bellalash-oficial/portfolio-2.jpg",
          "/assets/models/bellalash-oficial/portfolio-3.jpg",
          "/assets/models/bellalash-oficial/portfolio-4.jpg",
          "/assets/models/bellalash-oficial/portfolio-5.jpg",
          "/assets/models/bellalash-oficial/portfolio-6.jpg"
        ],
        "captions": [
          "O único compromisso sério da nossa semana: manter esses cílios impecáveis e entregar ess...",
          "O único compromisso sério da nossa semana: manter esses cílios impecáveis e entregar ess...",
          "👀 Tem uma surpresa esperando pelas 5 primeiras que chegarem no Direct… E não, não vou c...",
          "Se reconstrua quantas vezes forem necessárias, crie novos hábitos, novos recomeços e se...",
          "💋✨ LIP GLOSS — aquele cuidado que os lábios estavam pedindo! Não é só brilho, viu? 👀 É...",
          "💋✨ Você já conhece o Lip Gloss e todos os benefícios que ele pode trazer para os seus l..."
        ]
      },
      "locationCard": {
        "enabled": true,
        "headline": "Localização — Studio Bella Lash & Estética",
        "address": "Rio de Janeiro • RJ (Atendimento com Hora Marcada)",
        "buttonLabel": "Abrir no Google Maps",
        "mapsUrl": "https://maps.google.com",
        "hours": "Seg a Sáb · 08:30 às 19:30",
        "openStatus": "ABERTO AGORA · HORA MARCADA",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Procedimentos & Serviços Exclusivos",
        "subtitle": "Procedimentos, consultorias e soluções sob medida para o seu objetivo",
        "badge": "CATÁLOGO VIP",
        "layout": "list",
        "items": [
          {
            "id": "srv-1",
            "name": "Volume Russo Glamour VIP",
            "description": "Fios tecnológicos em formato Y que proporcionam excelente preenchimento, leveza e altíssima retenção.",
            "price": "R$ 189,90",
            "oldPrice": "",
            "duration": "1h45",
            "badge": "EXCLUSIVO & BEST SELLER",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "featured": true,
            "imageUrl": "https://images.unsplash.com/photo-1583001800475-430c7c72dbbb?auto=format&fit=crop&q=80&w=600"
          },
          {
            "id": "srv-2",
            "name": "Extensão de Cílios — Clássico Fio a Fio",
            "description": "Aplicação individual precisa para alongar e definir o olhar com máxima naturalidade e conforto.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "1h30",
            "badge": "NATURALIDADE",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "featured": true,
            "imageUrl": "/assets/models/bellalash-oficial/service-2.jpg"
          },
          {
            "id": "srv-3",
            "name": "Aplicação Personalizada de Extensão de Cílios",
            "description": "Trabalho alinhado, sem excesso de cola, confortável e duradouro para você acordar pronta todos os dias.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "1h45",
            "badge": "OLHAR IMPECÁVEL",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "featured": false,
            "imageUrl": "/assets/models/bellalash-oficial/service-3.jpg"
          },
          {
            "id": "srv-4",
            "name": "Manutenção de Extensão de Cílios & Higienização",
            "description": "Higienização profunda, remoção de fios crescidos e reposição completa para manter seu olhar sempre perfeito.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "1h15",
            "badge": "RETORNO VIP",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "featured": false,
            "imageUrl": "/assets/models/bellalash-oficial/service-4.jpg"
          },
          {
            "id": "srv-5",
            "name": "Consulta Nutricional & Plano Alimentar Individualizado",
            "description": "Avaliação completa de composição corporal e plano alimentar prático adaptado à sua rotina e objetivos.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "1h00",
            "badge": "NUTRIÇÃO",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "featured": false,
            "imageUrl": "/assets/models/bellalash-oficial/service-5.jpg"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Avaliações no Google Meu Negócio & Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Camila Oliveira",
            "city": "Avaliação 5★ no Google",
            "text": "Atendimento sensacional! Meus cílios duraram muito e o espaço é maravilhoso.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Juliana Mendes",
            "city": "Avaliação 5★ no Google",
            "text": "Excelente profissionalismo, ambiente impecável e resultado perfeito!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "TRIAGEM VIP / AVALIAÇÃO RÁPIDA",
        "triggerButtonSubtitle": "Descubra a melhor opção em 3 perguntas rápidas",
        "headline": "Triagem de Atendimento VIP",
        "subtitle": "Responda para receber atendimento prioritário no WhatsApp",
        "questions": [
          {
            "id": "q1",
            "title": "Qual procedimento você procura hoje?",
            "options": [
              "Extensão de Cílios — Volume Brasileiro",
              "Extensão de Cílios — Clássico Fio a Fio",
              "Aplicação Personalizada de Extensão de Cílios",
              "Avaliação / Outro atendimento personalizado"
            ]
          },
          {
            "id": "q2",
            "title": "Qual é a sua urgência de horário?",
            "options": [
              "Ainda esta semana",
              "Próxima semana",
              "Apenas consultando valores"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é o seu melhor turno?",
            "options": [
              "Manhã",
              "Tarde",
              "Horário flexível"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre Studio Bella Lash & Estética",
        "photoUrl": "data:image/jpeg;base64,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",
        "paragraph": "No Studio Bella Lash & Estética, cada detalhe é pensado para proporcionar uma experiência única de valorização da sua autoestima. Especialistas em extensão de cílios e cuidados estéticos no Rio de Janeiro, unimos técnica refinada, produtos de alta qualidade e muito carinho para entregar um resultado impecável, seguro e duradouro.",
        "closingPhrase": "Sua confiança e elegância são o nosso maior compromisso."
      },
      "faq": {
        "enabled": true,
        "headline": "Dúvidas Frequentes",
        "items": [
          {
            "id": "faq-1",
            "question": "Como funciona o agendamento?",
            "answer": "Basta clicar em um dos nossos botões de agendamento para ser direcionada diretamente ao nosso WhatsApp com atendimento personalizado."
          },
          {
            "id": "faq-2",
            "question": "Quais formas de pagamento são aceitas?",
            "answer": "Aceitamos PIX, cartões de débito e crédito para maior comodidade durante o seu atendimento."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá! Vi o microsite do Studio Bella Lash & Estética e gostaria de agendar um horário."
      },
      "seo": {
        "metaTitle": "STUDIO BELLA LASH & ESTÉTICA — EXTENSÃO DE CÍLIOS/HYDRA GLOSS",
        "metaDescription": "Extensão de cílios com elegância e precisão para um olhar impecável todos os dias.",
        "ogImageUrl": "data:image/jpeg;base64,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",
        "keywords": "advogada, consultoria, direito, atendimento vip, advocacia"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "autoDisabledByOverdue": false,
    "prospectInstagram": "bellalash.oficial",
    "prospectSituation": "wa_direto"
  },
  {
    "id": "site-1793555626356",
    "clientName": "Germana Zocrato",
    "clientPhone": "5531991390202",
    "clientEmail": "germanazocrato@biovip.com.br",
    "nicheCategory": "Saúde & Estética",
    "createdAt": "2026-11-01",
    "dueDate": "2026-12-01",
    "monthlyFee": 49.9,
    "maintenancePlan": "pro_4",
    "creationFee": 79.9,
    "isFirstMonth": true,
    "status": "pago",
    "daysOverdue": 0,
    "edicoesBloqueadas": false,
    "linkStatus": "ativo",
    "updatesThisMonth": 2,
    "lastUpdated": "2026-11-01",
    "domainType": "subdomain",
    "subdomain": "germanazocrato",
    "customDomain": "",
    "dnsConfigured": true,
    "sslActive": true,
    "whatsappClicks": 14,
    "pageViews": 86,
    "trafficSources": {
      "instagram": 65,
      "tiktok": 0,
      "googleMaps": 15,
      "paidAds": 0,
      "direct": 6
    },
    "isLandingModel": false,
    "isCustomized": true,
    "data": {
      "theme": "sageMind",
      "customColors": {
        "enabled": false,
        "bg": "#0f172a",
        "textMain": "#ffffff",
        "textMuted": "#94a3b8",
        "accent": "#e2b857",
        "cardBg": "#ffffff",
        "cardText": "#0f172a",
        "cardBorder": "#e2b857",
        "socialBg": "#1e293b",
        "glowColor": "#e2b857"
      },
      "moduleColors": {},
      "styling": {
        "fontFamily": "Cormorant Garamond",
        "borderRadius": 20,
        "glassmorphism": true,
        "metallicBorders": true,
        "spotlightGlow": true,
        "photoHeight": 280,
        "photoScale": 100,
        "photoPosY": 20,
        "photoPosX": 50,
        "vignetteIntensity": 85,
        "photoFilter": "none",
        "wrapperAlignment": "flex-start",
        "cardBorderRadius": 18,
        "buttonStyle": "gradient",
        "buttonRounding": "full",
        "photoRadius": "xl",
        "cardBorderWidth": 1,
        "headerAlignment": "center",
        "headerGlassmorphism": true
      },
      "announcement": {
        "enabled": true,
        "badge": "CONSULTORIA VIP",
        "text": "✨ Atendimento Clínico & Home Care Especializado em Pós-Operatório",
        "link": "#booking"
      },
      "profile": {
        "name": "GERMANA ZOCRATO",
        "title": "DRENAGEM LINFÁTICA & PÓS-OPERATÓRIO",
        "tagline": "Técnica de enfermagem por formação, ofereço protocolos avançados em drenagem linfática e pós-operatório com biossegurança rigorosa e acolhimento.",
        "cursivePhrase": "Realçando sua beleza única com ciência, arte e sutileza.",
        "avatarUrl": "/assets/models/germanazocrato/avatar.jpg",
        "aboutPhotoUrl": "/assets/models/germanazocrato/about.jpg",
        "whatsapp": "5531991390202",
        "instagram": "germanazocrato",
        "location": "Belo Horizonte - MG & Atendimento Home Care",
        "mapsUrl": "",
        "verifiedBadge": true
      },
      "metrics": {
        "enabled": true,
        "stat1Value": "+500",
        "stat1Label": "CLIENTES",
        "stat2Value": "8 anos",
        "stat2Label": "DE EXPERIÊNCIA",
        "stat3Value": "95%",
        "stat3Label": "DE SATISFAÇÃO",
        "items": [
          {
            "id": "m-1",
            "value": "100%",
            "label": "Biossegurança",
            "icon": "ShieldCheck"
          },
          {
            "id": "m-2",
            "value": "Enfermagem",
            "label": "Formação Técnica",
            "icon": "Award"
          },
          {
            "id": "m-3",
            "value": "Home Care",
            "label": "Atendimento Domiciliar",
            "icon": "HeartPulse"
          }
        ]
      },
      "actionCards": [
        {
          "id": "cta-1",
          "title": "DRENAGEM PÓS-OPERATÓRIO",
          "subtitle": "Acelere sua recuperação com protocolos clínicos seguros",
          "icon": "HeartPulse",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá Germana! Gostaria de agendar minha drenagem linfática de pós-operatório.",
          "openInNewTab": true,
          "animation": "pulse-glow",
          "variant": "accent",
          "badgeText": "ESPECIALIDADE",
          "customBg": "#ffffff",
          "customText": "#1c2d24",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 88,
          "ctaActionText": "AGENDAR"
        },
        {
          "id": "cta-2",
          "title": "MÉTODO REDUX & BEM-ESTAR",
          "subtitle": "Redução imediata de retenção e sensação de leveza corporal",
          "icon": "Sparkles",
          "linkType": "booking",
          "url": "#booking",
          "whatsappMessage": "Olá Germana! Gostaria de saber mais sobre o método de drenagem Redux.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "ALTA RETENÇÃO",
          "customBg": "#ffffff",
          "customText": "#1c2d24",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 88,
          "ctaActionText": "CONSULTAR"
        },
        {
          "id": "cta-3",
          "title": "FALAR COM GERMANA NO WHATSAPP",
          "subtitle": "Tire suas dúvidas diretamente pelo WhatsApp",
          "icon": "MessageCircle",
          "linkType": "whatsapp",
          "url": "https://wa.me/5531991390202?text=Ol%C3%A1%20Germana!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20seus%20atendimentos.",
          "whatsappMessage": "Olá Germana! Gostaria de informações sobre seus atendimentos.",
          "openInNewTab": true,
          "animation": "none",
          "variant": "default",
          "badgeText": "DIRETO",
          "customBg": "#ffffff",
          "customText": "#1c2d24",
          "bgImage": "",
          "imagePosition": "none",
          "cardImage": "",
          "imageFitStyle": "framed",
          "imageSize": 88,
          "ctaActionText": "ENVIAR MENSAGEM"
        }
      ],
      "processSteps": {
        "enabled": true,
        "headline": "Como funciona o processo?",
        "subtitle": "Simples, seguro e totalmente transparente em 3 etapas",
        "steps": [
          {
            "id": "step-1",
            "number": "01",
            "title": "Primeiro Contato & Triagem",
            "description": "Você relata sua necessidade pelo WhatsApp ou formulário e alinhamos a prioridade."
          },
          {
            "id": "step-2",
            "number": "02",
            "title": "Consulta Estratégica",
            "description": "Análise aprofundada da sua situação com plano de ação sob medida."
          },
          {
            "id": "step-3",
            "number": "03",
            "title": "Execução & Acompanhamento",
            "description": "Defesa contínua e comunicação clara em todas as etapas."
          }
        ]
      },
      "studentGrid": {
        "enabled": true,
        "headline": "Portfólio & Estrutura de Atendimento",
        "subtitle": "Registros reais do nosso padrão de entrega e excelência jurídica",
        "badge": "ESTRUTURA VIP",
        "layout": "mosaic",
        "aspectRatio": "square",
        "enableLightbox": true,
        "photos": [
          "/assets/models/germanazocrato/portfolio-1.jpg",
          "/assets/models/germanazocrato/portfolio-2.jpg",
          "/assets/models/germanazocrato/portfolio-3.jpg",
          "/assets/models/germanazocrato/portfolio-4.jpg",
          "/assets/models/germanazocrato/portfolio-5.jpg"
        ],
        "captions": [
          "",
          "",
          "",
          "",
          ""
        ]
      },
      "locationCard": {
        "enabled": true,
        "headline": "Nossa Localização",
        "address": "Av. Paulista, 1200 - Bela Vista, São Paulo - SP",
        "buttonLabel": "Abrir no Google Maps",
        "mapsUrl": "https://maps.google.com",
        "hours": "Seg a Sáb · 08:30 às 19:30",
        "openStatus": "ABERTO AGORA · HORA MARCADA",
        "showHours": true
      },
      "services": {
        "enabled": true,
        "headline": "Procedimentos & Tratamentos",
        "subtitle": "Protocolos individualizados com foco em biossegurança e conforto",
        "badge": "CATÁLOGO VIP",
        "layout": "featured",
        "items": [
          {
            "id": "srv-1",
            "name": "Drenagem Linfática Pós-Operatório",
            "category": "Pós-Cirúrgico",
            "description": "Protocolo clínico individualizado para cirurgias plásticas, reparadoras e cesáreas. Reduz o inchaço e previne fibroses.",
            "price": "Sob Consulta",
            "oldPrice": "R$ 220,00",
            "duration": "1h00",
            "badge": "MAIS PROCURADO",
            "ctaLabel": "Agendar Sessão",
            "actionType": "booking",
            "customUrl": "",
            "whatsappMessage": "Olá Germana! Gostaria de agendar a Drenagem Pós-Operatório.",
            "featured": true,
            "imageUrl": "/assets/models/germanazocrato/service-1.jpg"
          },
          {
            "id": "srv-2",
            "name": "Drenagem Linfática Corporal & Facial",
            "category": "Estética Clínica",
            "description": "Manobras suaves e precisas para alívio de retenção de líquidos, desintoxicação tecidual e melhora circulatória.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "1h00",
            "badge": "LEVEZA IMEDIATA",
            "ctaLabel": "Agendar",
            "actionType": "booking",
            "customUrl": "",
            "whatsappMessage": "Olá Germana! Gostaria de agendar a Drenagem Linfática Corporal & Facial.",
            "featured": false,
            "imageUrl": "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=600"
          },
          {
            "id": "srv-3",
            "name": "Taping Terapêutico Pós-Cirúrgico",
            "category": "Recuperação Rápida",
            "description": "Aplicação especializada de bandagens compressivas para alívio da dor, contenção de edemas e aceleração cicatricial.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "45min",
            "badge": "",
            "ctaLabel": "Consultar Taping",
            "actionType": "booking",
            "customUrl": "",
            "whatsappMessage": "Olá Germana! Gostaria de saber mais sobre o Taping Terapêutico.",
            "featured": false,
            "imageUrl": "/assets/models/germanazocrato/service-3.jpg"
          },
          {
            "id": "srv-4",
            "name": "Avaliação & Plano de Tratamento",
            "category": "Consulta",
            "description": "Triagem completa para analisar sua fase cirúrgica, indicação médica e traçar o melhor cronograma de sessões.",
            "price": "Sob Consulta",
            "oldPrice": "",
            "duration": "30min",
            "badge": "PRIMEIRO PASSO",
            "ctaLabel": "Agendar Avaliação",
            "actionType": "booking",
            "customUrl": "",
            "whatsappMessage": "Olá Germana! Gostaria de agendar uma avaliação inicial.",
            "featured": false,
            "imageUrl": "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600"
          }
        ]
      },
      "trustBadges": {
        "enabled": true,
        "items": [
          {
            "id": "tb-1",
            "icon": "ShieldCheck",
            "title": "Formação em Enfermagem",
            "subtitle": "Conhecimento clínico e biossegurança rigorosa"
          },
          {
            "id": "tb-2",
            "icon": "Heart",
            "title": "Atendimento Acolhedor",
            "subtitle": "Cuidado humanizado e escuta ativa"
          },
          {
            "id": "tb-3",
            "icon": "Sparkles",
            "title": "Resultados Comprovados",
            "subtitle": "Alívio perceptível desde a 1ª sessão"
          }
        ]
      },
      "beforeAfter": {
        "enabled": false,
        "headline": "Transformação Real",
        "subtitle": "Arraste para comparar o antes e o depois",
        "beforeUrl": "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=500",
        "afterUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500",
        "beforeImage": "",
        "afterImage": ""
      },
      "testimonials": {
        "enabled": true,
        "headline": "Depoimentos de Clientes",
        "items": [
          {
            "id": "t-1",
            "clientName": "Dra. Vanessa Mendes",
            "city": "São Paulo - SP",
            "text": "A segurança técnica e clareza da Marina me deram tranquilidade no momento mais decisivo.",
            "rating": 5
          },
          {
            "id": "t-2",
            "clientName": "Renato Silveira",
            "city": "Campinas - SP",
            "text": "Atendimento impecável, ágil e extremamente humanizado. Recomendo de olhos fechados!",
            "rating": 5
          }
        ]
      },
      "qualifierFunnel": {
        "enabled": true,
        "animation": "shimmer",
        "triggerButtonLabel": "AVALIAÇÃO DE CASO / TRIAGEM VIP",
        "triggerButtonSubtitle": "Descubra a melhor solução para você em 3 perguntas rápidas.",
        "headline": "Triagem Estratégica & Agendamento",
        "subtitle": "Responda para receber um atendimento sob medida e prioritário.",
        "questions": [
          {
            "id": "q1",
            "title": "Qual é o seu objetivo principal hoje?",
            "options": [
              "Agendar Consulta / Atendimento Individual",
              "Consultoria Estratégica ou Parecer",
              "Mentoria ou Cursos Profissionais",
              "Outra dúvida específica"
            ]
          },
          {
            "id": "q2",
            "title": "Você já realizou este tipo de procedimento ou consultoria antes?",
            "options": [
              "Sim, busco um atendimento de padrão superior",
              "Não, é a minha primeira experiência",
              "Ainda estou em fase de pesquisa e planejamento"
            ]
          },
          {
            "id": "q3",
            "title": "Qual é a sua urgência e melhor turno para retorno?",
            "options": [
              "Urgente (esta semana) - Período da Manhã",
              "Urgente (esta semana) - Período da Tarde",
              "Próximas semanas com flexibilidade"
            ]
          }
        ]
      },
      "aboutMe": {
        "enabled": true,
        "headline": "Sobre GERMANA ZOCRATO",
        "photoUrl": "/assets/models/germanazocrato/about.jpg",
        "photoHeight": 220,
        "photoPosY": 25,
        "photoPosX": 50,
        "paragraph": "Técnica de enfermagem por formação, ofereço protocolos avançados em DRENAGEM LINFÁTICA & PÓS-OPERATÓRIO, unindo conhecimento clínico, biossegurança rigorosa e atendimento acolhedor para reduzir edemas, acelerar a recuperação e valorizar sua leveza e bem-estar.",
        "closingPhrase": "Realçando sua beleza única com ciência, arte e sutileza.",
        "photoScale": 100
      },
      "faq": {
        "enabled": true,
        "headline": "Dúvidas Frequentes",
        "items": [
          {
            "id": "faq-1",
            "question": "Quando posso iniciar a drenagem no pós-operatório?",
            "answer": "Geralmente entre o 3º e o 7º dia após a cirurgia, sempre mediante a liberação expressa do seu cirurgião plástico."
          },
          {
            "id": "faq-2",
            "question": "A drenagem no pós-operatório causa dor?",
            "answer": "Não. A técnica correta é extremamente suave, lenta e indolor, respeitando a sensibilidade dos tecidos recém-operados."
          },
          {
            "id": "faq-3",
            "question": "Você atende em domicílio (Home Care)?",
            "answer": "Sim! Para seu maior conforto e segurança nos primeiros dias após o procedimento, realizo atendimento domiciliar com todo material estéril."
          }
        ]
      },
      "conversion": {
        "metaPixelId": "",
        "googleAnalyticsId": "",
        "defaultWhatsappMsg": "Olá Dra. {nome}, vi sua página e gostaria de informações sobre {servico} para a data de {data}."
      },
      "seo": {
        "metaTitle": "GERMANA ZOCRATO · Drenagem Linfática & Pós-Operatório",
        "metaDescription": "Protocolos avançados em drenagem linfática pós-operatório e estética clínica por Germana Zocrato, técnica de enfermagem. Agende no WhatsApp.",
        "ogImageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
        "keywords": "advogada, consultoria, direito, atendimento vip, advocacia"
      },
      "highConversion": {
        "enabled": true,
        "socialProof": {
          "enabled": true,
          "notifications": [
            {
              "id": "sp-1",
              "clientName": "Juliana M.",
              "action": "agendou Atendimento VIP",
              "timeAgo": "há 4 min"
            },
            {
              "id": "sp-2",
              "clientName": "Roberto S.",
              "action": "solicitou orçamento no WhatsApp",
              "timeAgo": "há 12 min"
            },
            {
              "id": "sp-3",
              "clientName": "Camila K.",
              "action": "garantiu uma vaga da semana",
              "timeAgo": "há 28 min"
            }
          ]
        },
        "urgencyTimer": {
          "enabled": true,
          "headline": "🔥 CONDIÇÃO ESPECIAL DE HOJE",
          "subheadline": "Garanta sua vaga com atendimento prioritário antes que expire:",
          "minutes": 14,
          "seconds": 52
        },
        "embeddedBooking": {
          "enabled": false,
          "title": "📅 Agendamento Direto na Agenda",
          "type": "cal",
          "iframeUrl": "https://cal.com/demo"
        }
      },
      "saasSettings": {
        "pixKey": "contato@biovip.com.br",
        "pixName": "BioVip Studio SaaS",
        "pixCity": "São Paulo - SP",
        "autoReminderMsg": "Olá {cliente}! Lembrete da mensalidade do seu microsite no valor de R$ {valor}. Vencimento: {vencimento}.\n\n🔑 Chave PIX: {pix}\nFavorecido: {nome_pix}",
        "defaultMonthlyFee": 149.9,
        "asaas": {
          "apiKey": "",
          "environment": "sandbox",
          "preferredMethod": "PIX",
          "enabled": false
        }
      },
      "customCode": {
        "enabled": false,
        "customCss": "",
        "customHtmlBanner": "",
        "customJs": "",
        "isolatedIframePreview": false
      }
    },
    "isTemporaryDemo": false,
    "demoDurationDays": 7,
    "crmStage": "demonstracao",
    "proposalValue": 197,
    "prospectNotes": "",
    "prospectInstagram": "germanazocrato",
    "prospectSituation": "wa_direto"
  }
];

'use client'

import React from 'react'
import {
  X,
  Bot,
  Sparkles,
  Copy,
  Camera,
  Upload,
  AlertTriangle
} from 'lucide-react'

interface AdminGeminiModalProps {
  isOpen: boolean
  onClose: () => void
  customAvatarPreview: string | null
  setCustomAvatarPreview: (val: string | null) => void
  geminiJsonInput: string
  setGeminiJsonInput: (val: string) => void
  geminiError: string | null
  setGeminiError: (val: string | null) => void
  onCopyPromptSuccess: (msg: string | null) => void
  handleImportGemini: () => void
}

export default function AdminGeminiModal({
  isOpen,
  onClose,
  customAvatarPreview,
  setCustomAvatarPreview,
  geminiJsonInput,
  setGeminiJsonInput,
  geminiError,
  setGeminiError,
  onCopyPromptSuccess,
  handleImportGemini
}: AdminGeminiModalProps) {
  if (!isOpen) return null

  return (
      
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14181f] border border-purple-500/30 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => {
                onClose()
                setGeminiError(null)
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-4 border-b border-stone-800">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block mb-1">
                AUTOMAÇÃO DE MICROSITES BIOVIP · PROMPT GEMINI OFICIAL
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                Importar Microsite Gerado por IA
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Cole o JSON gerado no Gemini com os dados de <code className="text-purple-300">adminClient</code> e <code className="text-purple-300">microsite</code>. Nosso motor irá instanciar automaticamente todas as 12 seções modulares (triagem, catálogo de serviços, rota GPS com Waze/Uber, métricas, escassez e vCard).
              </p>
            </div>

            {/* Banner de cópia do Prompt Oficial Interativo */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#161226] to-indigo-950/30 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <p className="font-bold text-purple-200 flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Fluxo Inteligente em 2 Etapas (Zero Páginas Genéricas)
                </p>
                <p className="text-stone-300 text-xs leading-relaxed max-w-xl">
                  Ao colar este prompt no Gemini, ele <strong>não criará uma página genérica</strong>. Ele irá te pedir o <strong>Instagram</strong>, o <strong>Google Maps</strong> e o <strong>nicho</strong> do seu cliente. Ao enviar, o Gemini investigará a internet, extrairá depoimentos reais do Maps, fotos e serviços do Instagram, validará os dados e devolverá o JSON 100% autêntico.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const prompt = `Você agora é o **Arquiteto Oficial de Microsites do BioVip Studio Pro**.
Sua missão é coletar os dados de um cliente, pesquisar profundamente na internet (Instagram, Google Maps / Google Meu Negócio e buscas do Google) todas as informações reais desse negócio e entregar um **ÚNICO BLOCO DE CÓDIGO JSON** pronto para ser colado na aba de criação do BioVip Studio Pro (que montará automaticamente a página completa + a Área de Administração do cliente).

### PASSO 1: ENTREVISTA SEQUENCIAL (FAÇA UMA PERGUNTA POR VEZ)
Cumprimente-me de forma rápida e faça as seguintes solicitações **SEQUENCIALMENTE (uma pergunta por vez, aguardando minha resposta antes de fazer a próxima)**. *Observação: se eu já enviar vários dados de uma só vez, avance diretamente para o que faltar ou para a geração do código.*

1️⃣ **Solicitação 1 (Nome, Nicho e WhatsApp):**
"Para começarmos, qual é o **Nome do Cliente / Empresa**, o **Nicho de Atuação** (ex: Extensão de Cílios, Nail Designer, Barbearia, Clínica de Estética, Advocacia, Odontologia, etc.) e o **WhatsApp** de atendimento?"

2️⃣ **Solicitação 2 (Instagram do Cliente):**
"Qual é o **@usuario ou link do Instagram** desse cliente? (Se desejar, você também pode colar aqui o texto da Bio ou os principais serviços que ele posta)."

3️⃣ **Solicitação 3 (Endereço e Google Maps):**
"Qual é o **Link do Google Maps / Google Meu Negócio** ou o **Endereço completo (Rua, Bairro, Cidade/UF)** do cliente?"

4️⃣ **Solicitação 4 (Estilo Visual e Plano de Manutenção):**
"Qual **Tema Visual** combina mais com esse cliente?
- \`roseGoldQuartz\` (Rosé Gold, Nude & Quartzo — Beleza, Cílios, Unhas, Estética)
- \`obsidianGold\` (Dark Luxury & Ouro Imperial — Studios VIP, Clínicas, Advocacia, Mentorias)
- \`barberVintage\` (Dark Barbearia & Âmbar — Barbearias e Grooming)
- \`clinicalClean\` (Clean Minimalista & Pérola — Saúde, Odonto, Psicologia, Medicina)
- \`velvetGlamour\` (Glamour Vibrante & Orquídea — Moda, Salões, Maquiagem)
- \`navyLaw\` (Azul Marinho & Dourado — Jurídico, Contabilidade, Consultoria)
E há algum serviço, pacote ou preço específico que deseja destacar?"

---

### PASSO 2: PESQUISA PROFUNDA NA INTERNET (QUANDO EU RESPONDER)
Assim que tiver os dados do cliente, pesquise na internet e no Google Maps tudo sobre esse negócio:
- Nome comercial exato, especialidade principal e posicionamento de autoridade.
- Biografia real do Instagram, número de seguidores, telefone/WhatsApp e links da bio.
- Os **4 a 6 serviços/procedimentos reais** trabalhados pelo cliente (baseados nas informações coletadas do perfil, legendas e nicho), criando descrições persuasivas e elegantes.
- Seção **Sobre a Especialista & Nosso Espaço (aboutMe)**: Redija uma apresentação profunda, acolhedora e comovente sobre a trajetória, anos de experiência, especialização técnica, padrão de atendimento e amor pelo ofício para preencher \`paragraph\` e a frase marcante \`closingPhrase\`.
- Endereço completo, bairro, cidade/UF, horário de atendimento, nota no Google Meu Negócio (ex: 5.0★) e 3 depoimentos baseados nos elogios reais do negócio no Google Maps.
- 6 legendas curtas e impactantes baseadas nos posts de procedimentos, resultados de antes/depois e serviços reais do Instagram para a galeria (priorizando afinidade técnica com o catálogo de serviços ao invés de meras curtidas).
- **ATENÇÃO CRÍTICA PARA IMAGENS:** Todas as chaves de imagem (avatarUrl, aboutPhotoUrl, photoUrl, cardImage, imageUrl, photos) DEVEM ser SEMPRE STRINGS com URLs VÁLIDAS e diretas da web (ex: https://images.unsplash.com/photo-...). NUNCA envie objetos nem chaves aninhadas para as imagens.

---

### PASSO 3: ENTREGA DO CÓDIGO FINAL (FORMATO JSON OBRIGATÓRIO)
Entregue **EXATAMENTE UM BLOCO DE CÓDIGO JSON** (\`\`\`json ... \`\`\`) seguindo rigorosamente esta estrutura abaixo, sem omitir nenhuma chave, para que eu copie e cole direto no espaço de importação do BioVip Studio Pro:

\`\`\`json
{
  "adminClient": {
    "clientName": "Nome do Cliente ou Empresa",
    "clientPhone": "5531999999999",
    "clientEmail": "contato@cliente.com.br",
    "subdomain": "slug-do-cliente-sem-espacos",
    "nicheCategory": "Beleza & Estética",
    "maintenancePlan": "pro_4",
    "monthlyFee": 49.90,
    "creationFee": 79.90,
    "isLandingModel": false
  },
  "microsite": {
    "theme": "roseGoldQuartz",
    "styling": {
      "fontFamily": "Playfair Display",
      "borderRadius": 20,
      "glassmorphism": true,
      "metallicBorders": true,
      "spotlightGlow": true
    },
    "announcement": {
      "enabled": true,
      "badge": "AGENDA VIP ABERTA",
      "text": "Últimos horários disponíveis nesta semana. Reserve seu atendimento exclusivo!",
      "link": "#booking"
    },
    "profile": {
      "name": "NOME DO NEGÓCIO EM MAIÚSCULO",
      "title": "ESPECIALIDADE PRINCIPAL DE ALTO PADRÃO",
      "tagline": "Bio persuasiva baseada nas informações reais do Instagram e diferenciais do cliente.",
      "cursivePhrase": "Excelência, sofisticação e cuidado em cada detalhe.",
      "avatarUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=900",
      "aboutPhotoUrl": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=700",
      "instagram": "usuario_sem_arroba",
      "whatsapp": "5531999999999",
      "mapsUrl": "https://maps.google.com/?q=Endereco+do+Cliente"
    },
    "metrics": {
      "enabled": true,
      "items": [
        { "value": "5.0★", "label": "Avaliação no Google" },
        { "value": "+1.000", "label": "Clientes Atendidas" },
        { "value": "100%", "label": "Atendimento VIP" }
      ]
    },
    "actionCards": [
      {
        "id": "cta-1",
        "title": "AGENDAR MEU HORÁRIO NO WHATSAPP",
        "subtitle": "Atendimento rápido e personalizado com hora marcada",
        "icon": "Calendar",
        "linkType": "whatsapp",
        "url": "#whatsapp",
        "whatsappMessage": "Olá! Vi seu microsite e gostaria de agendar um horário.",
        "variant": "accent",
        "animation": "pulse-glow",
        "badgeText": "MAIS PROCURADO",
        "ctaActionText": "AGENDAR AGORA",
        "cardImage": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400",
        "imagePosition": "right",
        "imageFitStyle": "popout"
      },
      {
        "id": "cta-2",
        "title": "CONHECER CATÁLOGO DE SERVIÇOS",
        "subtitle": "Confira todos os procedimentos e protocolos exclusivos",
        "icon": "Sparkles",
        "linkType": "catalogo",
        "url": "#catalogo",
        "variant": "default",
        "animation": "none",
        "badgeText": "PROCEDIMENTOS",
        "ctaActionText": "VER SERVIÇOS"
      },
      {
        "id": "cta-3",
        "title": "COMO CHEGAR · LOCALIZAÇÃO NO MAPS",
        "subtitle": "Endereço completo do cliente extraído do Google Maps",
        "icon": "MapPin",
        "linkType": "maps",
        "url": "https://maps.google.com",
        "variant": "default",
        "animation": "none",
        "badgeText": "ROTAS GPS",
        "ctaActionText": "ABRIR MAPA"
      }
    ],
    "studentGrid": {
      "enabled": true,
      "headline": "Resultados Reais & Portfólio em Destaque",
      "subtitle": "Registros mais curtidos no nosso Instagram oficial",
      "badgeText": "PORTFÓLIO OFICIAL",
      "layout": "smart_masonry",
      "captions": [
        "Legenda curta do destaque 1 baseada no serviço principal",
        "Legenda curta do destaque 2 baseada na técnica exclusiva",
        "Legenda curta do destaque 3 com foco em acabamento natural",
        "Legenda curta do destaque 4 de resultado real",
        "Legenda curta do destaque 5 de atendimento personalizado",
        "Legenda curta do destaque 6 do espaço e biossegurança"
      ]
    },
    "locationCard": {
      "enabled": true,
      "title": "Localização & Espaço Exclusivo",
      "address": "Rua Exemplo, 123 - Bairro, Cidade - UF",
      "hours": "Seg a Sáb · 08:30 às 19:30",
      "openStatus": "Atendimento com Hora Marcada",
      "mapsUrl": "https://maps.google.com",
      "buttonLabel": "Traçar Rota no Google Maps",
      "showHours": true
    },
    "services": {
      "enabled": true,
      "headline": "Procedimentos & Serviços Exclusivos",
      "subtitle": "Protocolos personalizados baseados nas técnicas do nosso espaço",
      "layout": "list",
      "items": [
        {
          "id": "srv-1",
          "name": "Nome Real do Serviço 1",
          "description": "Descrição detalhada e persuasiva do serviço oferecido pelo cliente.",
          "price": "Sob Consulta",
          "duration": "1h30",
          "badge": "DESTAQUE VIP",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": true,
          "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600",
          "imageLayout": "cover"
        },
        {
          "id": "srv-2",
          "name": "Nome Real do Serviço 2",
          "description": "Descrição detalhada do segundo procedimento mais procurado.",
          "price": "Sob Consulta",
          "duration": "1h30",
          "badge": "MUITO PROCURADO",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": true,
          "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400",
          "imageLayout": "thumb"
        },
        {
          "id": "srv-3",
          "name": "Nome Real do Serviço 3",
          "description": "Descrição detalhada do terceiro procedimento do cliente.",
          "price": "Sob Consulta",
          "duration": "1h00",
          "badge": "",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": false
        },
        {
          "id": "srv-4",
          "name": "Manutenção / Atendimento Personalizado",
          "description": "Acompanhamento completo para manter seu resultado impecável por mais tempo.",
          "price": "Sob Consulta",
          "duration": "1h00",
          "badge": "",
          "ctaLabel": "Agendar",
          "actionType": "booking",
          "featured": false
        }
      ]
    },
    "testimonials": {
      "enabled": true,
      "headline": "O Que Dizem No Google Meu Negócio",
      "items": [
        {
          "id": "t-1",
          "clientName": "Nome da Cliente 1",
          "city": "Cidade - UF",
          "text": "Avaliação 5 estrelas baseada nos elogios reais do negócio.",
          "rating": 5
        },
        {
          "id": "t-2",
          "clientName": "Nome da Cliente 2",
          "city": "Cidade - UF",
          "text": "Segunda avaliação destacando o atendimento impecável e o ambiente.",
          "rating": 5
        },
        {
          "id": "t-3",
          "clientName": "Nome da Cliente 3",
          "city": "Cidade - UF",
          "text": "Terceira avaliação elogiando a durabilidade e o profissionalismo.",
          "rating": 5
        }
      ]
    },
    "qualifierFunnel": {
      "enabled": true,
      "buttonLabel": "✨ Descobrir Procedimento Ideal (Triagem VIP)",
      "headline": "Atendimento Personalizado",
      "subtitle": "Responda 3 perguntas rápidas para agilizar seu atendimento no WhatsApp:",
      "questions": [
        {
          "id": "q-1",
          "question": "Qual procedimento você tem mais interesse hoje?",
          "options": ["Serviço 1", "Serviço 2", "Serviço 3", "Avaliação Personalizada"]
        },
        {
          "id": "q-2",
          "question": "Qual o melhor período para o seu horário?",
          "options": ["Manhã", "Tarde", "Final do dia / Sábado", "Qualquer horário disponível"]
        },
        {
          "id": "q-3",
          "question": "Qual o seu objetivo principal?",
          "options": ["Primeiro atendimento", "Manutenção", "Ocasião especial", "Quero tirar dúvidas"]
        }
      ]
    },
    "aboutMe": {
      "enabled": true,
      "headline": "SOBRE A ESPECIALISTA & NOSSO ESPAÇO",
      "photoUrl": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=700",
      "paragraph": "Texto persuasivo e acolhedor (2 a 3 parágrafos) apresentando a trajetória da especialista ou fundadora, anos de experiência, propósito de atendimento humanizado, excelência técnica e diferenciais que tornam o espaço e os procedimentos únicos.",
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
          "answer": "Estamos localizados no endereço indicado no mapa acima, com fácil acesso e ambiente climatizado."
        },
        {
          "id": "faq-3",
          "question": "Quais são as formas de pagamento aceitas?",
          "answer": "Aceitamos Pix, cartões de crédito e débito."
        }
      ]
    }
  }
}
\`\`\`

Inicie agora fazendo a **Solicitação 1**!\``
                  navigator.clipboard.writeText(prompt)
                  onCopyPromptSuccess('Prompt Mestre Interativo copiado! Cole no Gemini: ele pedirá o Instagram e Maps do cliente antes de gerar.')
                  setTimeout(() => onCopyPromptSuccess(null), 5000)
                }}
                className="shrink-0 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-purple-900/40"
              >
                <Copy className="w-4 h-4" />
                Copiar Prompt Mestre Interativo
              </button>
            </div>

            {/* Assistente de Fotos Reais do Instagram & Upload Direto */}
            <div className="p-4 rounded-2xl bg-[#0f131c] border border-stone-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-purple-400" />
                  Foto Oficial do Cliente (Avatar)
                </span>
                <label className="text-[11px] font-semibold text-purple-300 hover:text-white cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 transition shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  Carregar Foto do Cliente (PC / WhatsApp)
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (ev) => {
                          const base64 = ev.target?.result as string
                          if (base64) {
                            setCustomAvatarPreview(base64)
                          }
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                </label>
              </div>

              {customAvatarPreview ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-600/50">
                  <img
                    src={customAvatarPreview}
                    alt="Foto Carregada"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Foto Real Carregada com Sucesso
                    </p>
                    <p className="text-[10px] text-stone-400 truncate">
                      Esta foto substituirá qualquer link e será usada no perfil oficial do BioSite.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCustomAvatarPreview(null)}
                    className="text-stone-400 hover:text-rose-400 text-xs px-2 py-1 transition cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-[11px] text-stone-300 leading-relaxed space-y-1">
                  <p className="font-semibold text-amber-300 flex items-center gap-1">
                    <span>💡</span> Por que o Instagram não entrega fotos automáticas e como resolver:
                  </p>
                  <p className="text-stone-400">
                    A Meta/Instagram bloqueia robôs de busca com tela de login obrigatória. Para ter a foto real do cliente no BioSite:
                  </p>
                  <ul className="list-disc list-inside text-stone-300 space-y-0.5 ml-1">
                    <li><strong>No Gemini:</strong> Tire 1 print do Instagram do cliente e cole com <kbd className="px-1 py-0.5 bg-stone-800 rounded text-purple-300 font-mono text-[10px]">Ctrl+V</kbd> no chat do Gemini (ele lê a imagem com IA).</li>
                    <li><strong>Upload Direto:</strong> Ou clique em <em>&quot;Carregar Foto do Cliente&quot;</em> acima e anexe a foto ou logo que você recebeu no WhatsApp.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Textarea do JSON */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center justify-between">
                <span>Cole o JSON do Gemini abaixo:</span>
                <span className="text-[10px] text-stone-500 font-mono">Formato JSON válido</span>
              </label>
              <textarea
                rows={12}
                value={geminiJsonInput}
                onChange={(e) => {
                  setGeminiJsonInput(e.target.value)
                  setGeminiError(null)
                }}
                placeholder={`{\n  "adminClient": { ... },\n  "microsite": { ... }\n}`}
                className="w-full p-4 bg-[#0a0c0e] border border-stone-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 rounded-2xl text-xs font-mono text-stone-200 placeholder-stone-600 focus:outline-none resize-none leading-relaxed"
              />
              {geminiError && (
                <div className="mt-2 p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{geminiError}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  setGeminiError(null)
                }}
                className="px-4 py-2.5 text-xs font-semibold text-stone-400 hover:text-white transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleImportGemini}
                disabled={!geminiJsonInput.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-purple-900/30 flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                Importar e Criar BioSite Instantaneamente
              </button>
            </div>
          </div>
        </div>
  )
}

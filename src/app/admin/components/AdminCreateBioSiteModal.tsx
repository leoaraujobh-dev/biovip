'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  X,
  Sparkles,
  Bot,
  ListOrdered,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  MessageCircle,
  Wand2
} from 'lucide-react'
import { Subscription } from '@/data/subscriptions'
import {
  PALETTES,
  TYPOGRAPHIES,
  DEMO_PHOTOS,
  BUTTON_STYLES,
  BUTTON_ANIMATIONS,
  NICHES_LIST
} from '@/data/bioSiteDesign'
import { generateNicheContent } from '@/utils/aiNicheGenerator'
import { saveClientConfig, DEFAULT_CLIENT_PERMISSIONS, DEFAULT_MODULE_TOGGLES } from '@/data/clientPermissions'
import { saveBioSite } from '@/services/biositeService'
import {
  Sliders,
  ChevronLeft,
  RefreshCw,
  Check,
  Key,
  Dices
} from 'lucide-react'

const slugifyText = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-/g, '-')
}

interface AdminCreateBioSiteModalProps {
  isOpen: boolean
  onClose: () => void
  subscriptions: Subscription[]
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>
  onBioSiteCreated: (name: string) => void
  generateRandomPasswordValue: () => string
}

export default function AdminCreateBioSiteModal({
  isOpen,
  onClose,
  subscriptions,
  setSubscriptions,
  onBioSiteCreated,
  generateRandomPasswordValue
}: AdminCreateBioSiteModalProps) {
  
  const [createBioSiteStep, setCreateBioSiteStep] = useState<'method' | 'gemini' | 'manual' | 'credentials' | 'success'>('method')
  const [manualCurrentStep, setManualCurrentStep] = useState<number>(1)
  const [geminiBioPrompt, setGeminiBioPrompt] = useState<string>('')
  const [geminiIsThinking, setGeminiIsThinking] = useState<boolean>(false)
  const [geminiGeneratedData, setGeminiGeneratedData] = useState<any>(null)

  // Estados dos 9 Passos Manuais
  const [manualBrandName, setManualBrandName] = useState<string>('')
  const [manualBusinessTitle, setManualBusinessTitle] = useState<string>('')
  const [manualNiche, setManualNiche] = useState<string>('')
  const [manualBio, setManualBio] = useState<string>('')
  const [manualPhotoUrl, setManualPhotoUrl] = useState<string>('')
  const [manualGender, setManualGender] = useState<'mulher' | 'homem'>('mulher')
  const [manualTreatment, setManualTreatment] = useState<'organico' | 'original' | 'silhueta'>('organico')
  const [manualPalette, setManualPalette] = useState<any>(PALETTES[0])
  const [manualBackgroundStyle, setManualBackgroundStyle] = useState<string>('aura')
  const [manualTypography, setManualTypography] = useState<any>(TYPOGRAPHIES[0])
  const [manualButtonStyle, setManualButtonStyle] = useState<string>('cartao_nobre')
  const [manualButtonAnimation, setManualButtonAnimation] = useState<string>('pulse-glow')
  const [manualWhatsapp, setManualWhatsapp] = useState<string>('')
  const [manualInstagram, setManualInstagram] = useState<string>('')
  const [manualBookingLabel, setManualBookingLabel] = useState<string>('Agendar Consulta VIP')
  const [manualRating, setManualRating] = useState<string>('5.0')
  const [manualReviewsCount, setManualReviewsCount] = useState<string>('184 avaliações')
  const [manualClientsServed, setManualClientsServed] = useState<string>('2.800+')
  const [manualSlug, setManualSlug] = useState<string>('')

  // Credenciais para novo cliente
  const [clientAccessEmail, setClientAccessEmail] = useState<string>('')
  const [clientAccessPassword, setClientAccessPassword] = useState<string>('')
  const [clientAccessPhone, setClientAccessPhone] = useState<string>('')
  const [showClientAccessPassword, setShowClientAccessPassword] = useState<boolean>(false)
  const [passwordCopiedToast, setPasswordCopiedToast] = useState<boolean>(false)
  const [credentialsCopiedToast, setCredentialsCopiedToast] = useState<boolean>(false)
  const [createdBioSiteInfo, setCreatedBioSiteInfo] = useState<{
    slug: string
    name: string
    email: string
    password: string
    phone: string
  } | null>(null)


  const handleGenerateRandomPassword = () => {
    const pwd = generateRandomPasswordValue()
    setClientAccessPassword(pwd)
    return pwd
  }

    const handleGenerateWithGemini = async () => {
    if (!geminiBioPrompt.trim()) return
    setGeminiIsThinking(true)
    try {
      await new Promise(r => setTimeout(r, 600))
      const aiContent = generateNicheContent(geminiBioPrompt)
      setGeminiGeneratedData(aiContent)
      
      const suggestedSlug = slugifyText(aiContent.brandName || geminiBioPrompt.split(' ')[0] || 'meu-biosite')
      setManualSlug(suggestedSlug)
      setManualBrandName(aiContent.brandName || 'Studio VIP')
      setManualBusinessTitle(aiContent.niche || 'Especialista VIP')
      setManualNiche(aiContent.niche || 'Beleza & Estética')
      setManualBio(aiContent.tagline || 'Atendimento de alto padrão com hora marcada.')
      if (aiContent.paletteId) {
        const foundPal = PALETTES.find(p => p.id === aiContent.paletteId)
        if (foundPal) setManualPalette(foundPal)
      }
      if (aiContent.typographyId) {
        const foundTypo = TYPOGRAPHIES.find(t => t.id === aiContent.typographyId)
        if (foundTypo) setManualTypography(foundTypo)
      }
      if (aiContent.buttons && aiContent.buttons[0]?.value) {
        setManualWhatsapp(aiContent.buttons[0].value)
        setClientAccessPhone(aiContent.buttons[0].value)
      }
      setClientAccessEmail(`${suggestedSlug}@biovip.com.br`)
      setCreateBioSiteStep('credentials')
    } catch (err) {
      console.error('Erro na geração Gemini:', err)
    } finally {
      setGeminiIsThinking(false)
    }
  }


    const handleFinalizeBioSite = async () => {
    const finalSlug = slugifyText(manualSlug.trim() || manualBrandName.trim() || `cliente-${Date.now()}`)
    const finalEmail = clientAccessEmail.trim().toLowerCase() || `${finalSlug}@biovip.com.br`
    const finalPassword = clientAccessPassword.trim() || 'BioVip2026!'
    const finalPhone = clientAccessPhone.trim() || manualWhatsapp.trim() || '5531991390202'
    const finalName = manualBrandName.trim() || 'Cliente BioVip'

    let baseSiteData: any = {}
    if (geminiGeneratedData) {
      baseSiteData = {
        ...geminiGeneratedData,
        slug: finalSlug,
        name: finalName,
        businessTitle: manualBusinessTitle || geminiGeneratedData.niche,
        role: manualBusinessTitle || geminiGeneratedData.niche,
        category: manualNiche || geminiGeneratedData.niche,
        bio: manualBio || geminiGeneratedData.tagline,
        photo: manualPhotoUrl || (manualGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem),
        paletteId: manualPalette.id,
        typographyId: manualTypography.id,
        buttonStyle: manualButtonStyle,
        buttonAnimation: manualButtonAnimation,
        whatsapp: finalPhone.replace(/\D/g, ''),
        rating: manualRating,
        reviewsCount: manualReviewsCount,
        buttons: geminiGeneratedData.buttons || [
          {
            id: 'btn-1',
            label: manualBookingLabel,
            subtitle: 'Atendimento prioritário e exclusivo',
            icon: 'calendar',
            url: `https://wa.me/${finalPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário com ${finalName}.`)}`,
            targetType: 'whatsapp',
            isHighlighted: true,
            highlightBadge: 'VIP'
          }
        ]
      }
    } else {
      const generatedTemplate = generateNicheContent(manualNiche || finalName)
      baseSiteData = {
        ...generatedTemplate,
        slug: finalSlug,
        name: finalName,
        businessTitle: manualBusinessTitle || manualNiche,
        role: manualBusinessTitle || manualNiche,
        category: manualNiche,
        bio: manualBio,
        photo: manualPhotoUrl || (manualGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem),
        paletteId: manualPalette.id,
        typographyId: manualTypography.id,
        buttonStyle: manualButtonStyle,
        buttonAnimation: manualButtonAnimation,
        backgroundStyle: manualBackgroundStyle,
        whatsapp: finalPhone.replace(/\D/g, ''),
        rating: manualRating,
        reviewsCount: manualReviewsCount,
        buttons: [
          {
            id: 'btn-1',
            label: manualBookingLabel,
            subtitle: 'Atendimento prioritário e exclusivo',
            icon: 'calendar',
            url: `https://wa.me/${finalPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá! Gostaria de agendar um horário com ${finalName}.`)}`,
            targetType: 'whatsapp',
            isHighlighted: true,
            highlightBadge: 'VIP'
          },
          ...(manualInstagram ? [{
            id: 'btn-2',
            label: 'Acompanhe no Instagram',
            subtitle: manualInstagram.startsWith('@') ? manualInstagram : `@${manualInstagram}`,
            icon: 'instagram',
            url: `https://instagram.com/${manualInstagram.replace('@', '')}`,
            targetType: 'link'
          }] : [])
        ]
      }
    }

    // 1. Salvar biosite localmente
    localStorage.setItem('biovip_site_' + finalSlug, JSON.stringify(baseSiteData))

    // 2. Cadastrar usuário em biovip_users para login funcional em /entrar
    try {
      const rawUsers = localStorage.getItem('biovip_users')
      let userList = rawUsers ? JSON.parse(rawUsers) : []
      userList = userList.filter((u: any) => u.email?.toLowerCase() !== finalEmail && u.slug !== finalSlug)
      userList.unshift({
        email: finalEmail,
        password: finalPassword,
        slug: finalSlug,
        brandName: finalName,
        phone: finalPhone,
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('biovip_users', JSON.stringify(userList))
    } catch (e) {
      console.warn('Erro ao salvar biovip_users:', e)
    }

    // 3. Salvar na lista de assinaturas do ADM
    const newSubscription: Subscription = {
      id: `sub-${Date.now()}`,
      clientName: finalName,
      businessName: finalName,
      email: finalEmail,
      whatsapp: finalPhone,
      niche: manualNiche || 'Beleza & Estética',
      slug: finalSlug,
      planId: 'pro',
      planName: 'Profissional',
      cycle: 'mensal',
      amount: 49.90,
      status: 'ativa',
      paymentMethod: 'pix',
      startDate: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      bioSiteUrl: `https://biovip.com.br/${finalSlug}`,
      viewsCount: 0,
      clicksCount: 0,
      notes: `Bio Site criado pelo Administrador via ${createBioSiteStep === 'gemini' ? 'IA Gemini' : 'Wizard 9 Passos'}.`,
      payments: [
        {
          id: `pay-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString().split('T')[0],
          amount: 49.90,
          method: 'pix',
          status: 'pago'
        }
      ]
    }
    const updatedSubs = [newSubscription, ...subscriptions.filter(s => s.slug !== finalSlug)]
    setSubscriptions(updatedSubs)
    localStorage.setItem('biovip_subscriptions', JSON.stringify(updatedSubs))

    // 4. Adicionar ao portfólio
    try {
      const savedProjectsRaw = localStorage.getItem('biovip_portfolio_projects')
      let pList = savedProjectsRaw ? JSON.parse(savedProjectsRaw) : []
      pList = pList.filter((p: any) => p.slug !== finalSlug)
      pList.unshift({
        ...baseSiteData,
        inPortfolio: true,
        isPortfolioModel: false,
        stats: { views: '1', clicks: '0', conversion: '0%' }
      })
      localStorage.setItem('biovip_portfolio_projects', JSON.stringify(pList))
    } catch (e) {
      console.warn('Erro ao atualizar portfolio_projects:', e)
    }

    // 5. Configurar permissões padrão ativas
    saveClientConfig(finalSlug, {
      permissions: DEFAULT_CLIENT_PERMISSIONS,
      modules: DEFAULT_MODULE_TOGGLES
    })

    // 6. Sincronizar com Supabase se configurado
    saveBioSite(finalSlug, baseSiteData).catch(e => console.warn('Supabase sync:', e))

    // 7. Definir dados de sucesso
    setCreatedBioSiteInfo({
      slug: finalSlug,
      name: finalName,
      email: finalEmail,
      password: finalPassword,
      phone: finalPhone
    })
    setCreateBioSiteStep('success')
    onBioSiteCreated(finalName)
  }

  // Configurações do Gateway

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-[#12151c] border border-stone-800 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl flex flex-col justify-between my-auto relative animate-fade-in">
            {/* Botão Fechar */}
            <button
              type="button"
              onClick={() => onClose()}
              className="absolute top-5 right-5 p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ETAPA 1: ESCOLHA DO MÉTODO (IA GEMINI OU 9 PASSOS MANUAIS) */}
            {createBioSiteStep === 'method' && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    Novo BioSite BioVip
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-normal">
                    Como Deseja Criar o BioSite?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1">
                    Escolha entre a velocidade instantânea da IA Gemini ou o controle artesanal passo a passo.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Opção 1: IA Gemini */}
                  <div
                    onClick={() => setCreateBioSiteStep('gemini')}
                    className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/30 via-stone-900/80 to-stone-900 border border-purple-500/30 hover:border-purple-400 transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-purple-950/20"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center">
                          <Bot className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          ⚡ Instantâneo
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                          Gerar com IA Gemini
                        </h4>
                        <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                          A inteligência artificial cria os procedimentos com preços reais do nicho, bio de autoridade, paleta de luxo e botões em 3 segundos.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-bold text-purple-300 group-hover:translate-x-1 transition-transform">
                      <span>Iniciar com IA Gemini</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Opção 2: Criação Manual 9 Passos */}
                  <div
                    onClick={() => {
                      setManualCurrentStep(1)
                      setCreateBioSiteStep('manual')
                    }}
                    className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-400/50 transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-amber-950/20"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center">
                          <Sliders className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          🛠️ 9 Passos
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                          Criação Manual (9 Passos)
                        </h4>
                        <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                          Personalização artesanal: 1. Você, 2. Foto, 3. Paleta, 4. Fundo, 5. Tipografia, 6. Botões, 7. Links, 8. Prova Social e 9. Endereço.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                      <span>Iniciar Passo a Passo</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 2: PROMPT DA IA GEMINI */}
            {createBioSiteStep === 'gemini' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <button
                    type="button"
                    onClick={() => setCreateBioSiteStep('method')}
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </button>
                  <span className="text-[11px] font-mono text-purple-300 font-bold uppercase">
                    Modo IA Gemini
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-serif text-white font-normal">
                    Descreva o Negócio ou Profissional
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Informe o nome, nicho, cidade ou diferenciais. A IA formulará o BioSite completo pronto para conversão.
                  </p>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={4}
                    value={geminiBioPrompt}
                    onChange={(e) => setGeminiBioPrompt(e.target.value)}
                    placeholder="Ex: Studio de Lash e Sobrancelhas de luxo da Helena em Moema - SP. Atendimento exclusivo com hora marcada, fotos sofisticadas e agendamento direto no WhatsApp."
                    className="w-full p-3.5 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 focus:border-purple-400 text-xs leading-relaxed focus:outline-none"
                  />

                  {/* Sugestões Rápidas de Nicho */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase text-stone-500 py-1 mr-1">
                      Inspirações rápidas:
                    </span>
                    {[
                      '💅 Nails & Manicure Russa',
                      '👁️ Extensão de Cílios & Lash',
                      '✂️ Barbearia VIP & Grooming',
                      '🩺 Odontologia & Lentes',
                      '💉 Harmonização Facial & Botox',
                      '🎂 Confeitaria Artesanal Fina',
                      '💇 Salão de Beleza & Mechas'
                    ].map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => setGeminiBioPrompt(`Studio de ${sug.slice(3)} de alto padrão com atendimento VIP e hora marcada.`)}
                        className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-purple-950/40 text-stone-300 hover:text-purple-300 text-[10.5px] border border-stone-800 hover:border-purple-500/40 transition cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateBioSiteStep('method')}
                    className="px-4 py-2 text-stone-400 hover:text-white transition text-xs cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    disabled={!geminiBioPrompt.trim() || geminiIsThinking}
                    onClick={handleGenerateWithGemini}
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-amber-400 hover:brightness-110 disabled:opacity-50 text-stone-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    {geminiIsThinking ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Gerando BioSite com IA Gemini...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Gerar BioSite e Avançar para Credenciais ➔</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3: CRIAÇÃO MANUAL EM 9 PASSOS */}
            {createBioSiteStep === 'manual' && (
              <div className="space-y-5">
                {/* Header de Navegação dos Passos */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <button
                    type="button"
                    onClick={() => {
                      if (manualCurrentStep > 1) {
                        setManualCurrentStep(prev => prev - 1)
                      } else {
                        setCreateBioSiteStep('method')
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {manualCurrentStep > 1 ? 'Passo Anterior' : 'Voltar ao Início'}
                  </button>

                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-mono font-bold text-amber-300 uppercase">
                      Passo {manualCurrentStep} de 9
                    </span>
                  </div>
                </div>

                {/* Stepper Visual (9 Bolinhas / Indicadores) */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    '1. Você',
                    '2. Foto',
                    '3. Paleta',
                    '4. Fundo',
                    '5. Tipografia',
                    '6. Botões',
                    '7. Links',
                    '8. Prova',
                    '9. Endereço'
                  ].map((label, idx) => {
                    const stepNum = idx + 1
                    const isDone = stepNum < manualCurrentStep
                    const isCurrent = stepNum === manualCurrentStep
                    return (
                      <button
                        key={stepNum}
                        type="button"
                        onClick={() => setManualCurrentStep(stepNum)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-mono uppercase whitespace-nowrap transition cursor-pointer border ${
                          isCurrent
                            ? 'bg-amber-400 text-stone-950 font-bold border-amber-300'
                            : isDone
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-stone-900 text-stone-500 border-stone-800'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>

                {/* Conteúdo Dinâmico de Cada Passo (1 a 9) */}
                <div className="min-h-[280px]">
                  {/* Passo 1: Você */}
                  {manualCurrentStep === 1 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 1: Identidade da Marca</h4>
                        <p className="text-xs text-stone-400">Nome do profissional, título e bio de autoridade.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Nome da Marca / Especialista</label>
                          <input
                            type="text"
                            value={manualBrandName}
                            onChange={(e) => {
                              setManualBrandName(e.target.value)
                              if (!manualSlug) setManualSlug(slugifyText(e.target.value))
                            }}
                            placeholder="Ex: Dra. Helena Vasconcelos"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Título de Exibição / Cargo</label>
                          <input
                            type="text"
                            value={manualBusinessTitle}
                            onChange={(e) => setManualBusinessTitle(e.target.value)}
                            placeholder="Ex: Lash Designer & Visagista"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Nicho / Categoria Principal</label>
                        <select
                          value={manualNiche}
                          onChange={(e) => setManualNiche(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs"
                        >
                          {NICHES_LIST.map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Frase de Assinatura / Bio</label>
                        <textarea
                          rows={2}
                          value={manualBio}
                          onChange={(e) => setManualBio(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  )}

                  {/* Passo 2: Foto */}
                  {manualCurrentStep === 2 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 2: Foto de Estúdio</h4>
                        <p className="text-xs text-stone-400">Retrato principal com fusão orgânica ou recorte.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-stone-700 bg-stone-900 shrink-0">
                          <img
                            src={manualPhotoUrl || (manualGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)}
                            alt="Foto"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={manualPhotoUrl}
                            onChange={(e) => setManualPhotoUrl(e.target.value)}
                            placeholder="URL da Foto do Cliente (https://...)"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setManualGender('mulher')
                                setManualPhotoUrl('')
                              }}
                              className={`px-3 py-1 text-xs rounded-lg border font-mono ${
                                manualGender === 'mulher' && !manualPhotoUrl ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-stone-900 text-stone-400 border-stone-800'
                              }`}
                            >
                              Modelo Feminino
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setManualGender('homem')
                                setManualPhotoUrl('')
                              }}
                              className={`px-3 py-1 text-xs rounded-lg border font-mono ${
                                manualGender === 'homem' && !manualPhotoUrl ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-stone-900 text-stone-400 border-stone-800'
                              }`}
                            >
                              Modelo Masculino
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1.5">Efeito de Fusão</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'organico', label: 'Fusão Orgânica' },
                            { id: 'original', label: 'Foto Pura' },
                            { id: 'silhueta', label: 'Silhueta VIP' }
                          ].map(t => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setManualTreatment(t.id as any)}
                              className={`p-2 rounded-xl text-center text-xs font-mono border transition ${
                                manualTreatment === t.id ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 font-bold' : 'bg-stone-900 text-stone-400 border-stone-800'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Passo 3: Paleta */}
                  {manualCurrentStep === 3 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 3: Paleta de Cores de Luxo</h4>
                        <p className="text-xs text-stone-400">Escolha a atmosfera cromática editorial do BioSite.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                        {PALETTES.map(p => {
                          const isSel = manualPalette.id === p.id
                          return (
                            <div
                              key={p.id}
                              onClick={() => setManualPalette(p)}
                              className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                                isSel ? 'border-amber-400 bg-amber-500/15' : 'border-stone-800 bg-stone-900 hover:border-stone-700'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: p.bg }} />
                                <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: p.card }} />
                                <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: p.accent }} />
                              </div>
                              <span className={`text-[11px] font-bold block truncate ${isSel ? 'text-amber-300' : 'text-stone-300'}`}>
                                {p.name}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Passo 4: Fundo */}
                  {manualCurrentStep === 4 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 4: Estilo de Fundo</h4>
                        <p className="text-xs text-stone-400">Iluminação ambiente e gradientes de profundidade.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { id: 'aura', name: 'Aura Dourada Suave', desc: 'Luz difusa no centro simulando estúdio fotográfico.' },
                          { id: 'radial', name: 'Radial Obsidiana', desc: 'Preto profundo com glow suave champagne.' },
                          { id: 'minimal', name: 'Minimalista Neutro', desc: 'Sem distrações, foco total no catálogo.' },
                          { id: 'solid', name: 'Preto Absoluto (#09090B)', desc: 'Máximo contraste para telas OLED.' }
                        ].map(bg => (
                          <div
                            key={bg.id}
                            onClick={() => setManualBackgroundStyle(bg.id)}
                            className={`p-3 rounded-xl border cursor-pointer transition ${
                              manualBackgroundStyle === bg.id ? 'border-amber-400 bg-amber-500/15 text-amber-200' : 'border-stone-800 bg-stone-900 text-stone-300'
                            }`}
                          >
                            <span className="text-xs font-bold block mb-1">{bg.name}</span>
                            <span className="text-[10px] text-stone-400 leading-snug block">{bg.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Passo 5: Tipografia */}
                  {manualCurrentStep === 5 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 5: Tipografia Editorial</h4>
                        <p className="text-xs text-stone-400">Selecione a fonte que expressa autoridade e elegância.</p>
                      </div>
                      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                        {TYPOGRAPHIES.map(t => {
                          const isSel = manualTypography.id === t.id
                          return (
                            <div
                              key={t.id}
                              onClick={() => setManualTypography(t)}
                              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                                isSel ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold' : 'border-stone-800 bg-stone-900 text-stone-300 hover:border-stone-700'
                              }`}
                            >
                              <div>
                                <span className="text-sm block" style={{ fontFamily: t.cssFont }}>{t.name}</span>
                                <span className="text-[9px] font-mono text-stone-500">{t.desc || t.category}</span>
                              </div>
                              {isSel && <Check className="w-4 h-4 text-amber-400" />}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Passo 6: Botões */}
                  {manualCurrentStep === 6 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 6: Formato & Estilo dos Botões</h4>
                        <p className="text-xs text-stone-400">Design dos cartões de ação e animações de conversão.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Estilo do Botão</label>
                          <select
                            value={manualButtonStyle}
                            onChange={(e) => setManualButtonStyle(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs font-mono"
                          >
                            {BUTTON_STYLES.map(bs => (
                              <option key={bs.id} value={bs.id}>{bs.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Efeito / Animação</label>
                          <select
                            value={manualButtonAnimation}
                            onChange={(e) => setManualButtonAnimation(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 text-xs font-mono"
                          >
                            {BUTTON_ANIMATIONS.map(ba => (
                              <option key={ba.id} value={ba.id}>{ba.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Passo 7: Links */}
                  {manualCurrentStep === 7 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 7: Seus Links Principais</h4>
                        <p className="text-xs text-stone-400">Canais de contato direto para agendamento.</p>
                      </div>
                      <div className="space-y-2.5">
                        <div>
                          <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">WhatsApp Comercial (com DDD)</label>
                          <input
                            type="text"
                            value={manualWhatsapp}
                            onChange={(e) => setManualWhatsapp(e.target.value)}
                            placeholder="5531991390202"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Instagram (@usuario)</label>
                          <input
                            type="text"
                            value={manualInstagram}
                            onChange={(e) => setManualInstagram(e.target.value)}
                            placeholder="@studiohelena"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Texto do Botão de Agendamento</label>
                          <input
                            type="text"
                            value={manualBookingLabel}
                            onChange={(e) => setManualBookingLabel(e.target.value)}
                            placeholder="AGENDAR HORÁRIO VIP"
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Passo 8: Prova Social */}
                  {manualCurrentStep === 8 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 8: Prova Social & Google</h4>
                        <p className="text-xs text-stone-400">Métricas de autoridade para gerar confiança imediata.</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2.5">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Nota Google</label>
                          <input
                            type="text"
                            value={manualRating}
                            onChange={(e) => setManualRating(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-bold font-mono text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Reviews</label>
                          <input
                            type="text"
                            value={manualReviewsCount}
                            onChange={(e) => setManualReviewsCount(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Atendimentos</label>
                          <input
                            type="text"
                            value={manualClientsServed}
                            onChange={(e) => setManualClientsServed(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-bold font-mono text-center text-amber-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Passo 9: Endereço / Slug */}
                  {manualCurrentStep === 9 && (
                    <div className="space-y-3.5 animate-fade-in">
                      <div>
                        <h4 className="text-sm font-bold text-white">Passo 9: Link & Endereço Único</h4>
                        <p className="text-xs text-stone-400">O link exclusivo que o cliente colocará na bio do Instagram.</p>
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">Endereço do BioSite</label>
                        <div className="flex items-center rounded-xl bg-stone-900 border border-stone-800 overflow-hidden focus-within:border-amber-400">
                          <span className="px-3 text-xs font-mono text-stone-500 bg-stone-950/60 border-r border-stone-800 py-2.5">
                            biovip.com.br/
                          </span>
                          <input
                            type="text"
                            value={manualSlug}
                            onChange={(e) => setManualSlug(slugifyText(e.target.value))}
                            placeholder="helena-lash"
                            className="flex-1 p-2.5 bg-transparent text-amber-300 font-mono text-xs focus:outline-none"
                          />
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1 font-mono">
                          ✓ Link limpo e indexável no Google
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Rodapé do Stepper Manual */}
                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (manualCurrentStep > 1) {
                        setManualCurrentStep(prev => prev - 1)
                      } else {
                        setCreateBioSiteStep('method')
                      }
                    }}
                    className="px-4 py-2 text-stone-400 hover:text-white transition text-xs cursor-pointer"
                  >
                    {manualCurrentStep > 1 ? '← Anterior' : 'Cancelar'}
                  </button>

                  {manualCurrentStep < 9 ? (
                    <button
                      type="button"
                      onClick={() => setManualCurrentStep(prev => prev + 1)}
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                      <span>Próximo Passo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setClientAccessEmail(clientAccessEmail || `${manualSlug || 'cliente'}@biovip.com.br`)
                        setClientAccessPhone(manualWhatsapp)
                        setCreateBioSiteStep('credentials')
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-lg"
                    >
                      <span>Avançar para Credenciais do Cliente</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ETAPA 4: CADASTRO DE CREDENCIAIS DO CLIENTE (E-MAIL E SENHA) */}
            {createBioSiteStep === 'credentials' && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <button
                    type="button"
                    onClick={() => {
                      if (geminiGeneratedData) {
                        setCreateBioSiteStep('gemini')
                      } else {
                        setCreateBioSiteStep('manual')
                        setManualCurrentStep(9)
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar aos Dados
                  </button>
                  <span className="text-[11px] font-mono text-amber-300 font-bold uppercase flex items-center gap-1">
                    <Key className="w-3.5 h-3.5" /> Acesso do Cliente
                  </span>
                </div>

                {/* Resumo do BioSite */}
                <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/40 bg-stone-950 shrink-0">
                      <img
                        src={manualPhotoUrl || (manualGender === 'mulher' ? DEMO_PHOTOS.mulher : DEMO_PHOTOS.homem)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{manualBrandName || 'Cliente BioVip'}</h4>
                      <p className="text-[10px] text-amber-400 font-mono">biovip.com.br/{manualSlug || 'slug'}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Pronto para Criação
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    Cadastrar Login do Cliente no Painel
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    O cliente usará este e-mail e senha para acessar <code className="text-amber-300">biovip.com.br/entrar</code> e gerenciar o BioSite no <code className="text-amber-300">/conta</code>.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">E-mail do Cliente (Login)</label>
                    <input
                      type="email"
                      value={clientAccessEmail}
                      onChange={(e) => setClientAccessEmail(e.target.value)}
                      placeholder="cliente@email.com"
                      className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10.5px] font-mono uppercase text-stone-400">Senha de Acesso</label>
                      <button
                        type="button"
                        onClick={handleGenerateRandomPassword}
                        className="text-[10px] font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition"
                      >
                        <Dices className="w-3.5 h-3.5" />
                        <span>Gerar Senha Aleatória</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type={showClientAccessPassword ? 'text' : 'password'}
                          value={clientAccessPassword}
                          onChange={(e) => setClientAccessPassword(e.target.value)}
                          placeholder="Digite ou gere uma senha segura"
                          className="w-full p-2.5 pr-9 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => setShowClientAccessPassword(prev => !prev)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 cursor-pointer"
                        >
                          {showClientAccessPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(clientAccessPassword)
                          setPasswordCopiedToast(true)
                          setTimeout(() => setPasswordCopiedToast(false), 2000)
                        }}
                        className="px-3 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-mono flex items-center gap-1 cursor-pointer shrink-0"
                        title="Copiar senha"
                      >
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>{passwordCopiedToast ? 'Copiada!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-mono uppercase text-stone-400 mb-1">WhatsApp de Contato do Cliente</label>
                    <input
                      type="text"
                      value={clientAccessPhone}
                      onChange={(e) => setClientAccessPhone(e.target.value)}
                      placeholder="5531991390202"
                      className="w-full p-2.5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (geminiGeneratedData) setCreateBioSiteStep('gemini')
                      else setCreateBioSiteStep('manual')
                    }}
                    className="px-4 py-2 text-stone-400 hover:text-white transition text-xs cursor-pointer"
                  >
                    Voltar
                  </button>

                  <button
                    type="button"
                    onClick={handleFinalizeBioSite}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-[#E2B857] hover:brightness-110 text-stone-950 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Concluir e Publicar BioSite</span>
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 5: SUCESSO E ENTREGA DO BIOSITE */}
            {createBioSiteStep === 'success' && createdBioSiteInfo && (
              <div className="space-y-5 animate-fade-in text-center py-2">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white">
                    BioSite Criado e Publicado com Sucesso!
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    O microsite já está ativo na web e o cliente já pode acessar o painel de edição.
                  </p>
                </div>

                {/* Cartão de Credenciais do Cliente */}
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-left space-y-2.5 max-w-lg mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800/80">
                    <span className="text-xs font-bold text-white">{createdBioSiteInfo.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      ✓ No Ar
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Link Público:</span>
                      <a
                        href={`/${createdBioSiteInfo.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1"
                      >
                        biovip.com.br/{createdBioSiteInfo.slug}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Página de Login:</span>
                      <span className="text-stone-200">biovip.com.br/entrar</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">E-mail:</span>
                      <span className="text-stone-200">{createdBioSiteInfo.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Senha:</span>
                      <span className="text-amber-300 font-bold bg-black/60 px-2 py-0.5 rounded border border-white/10">
                        {createdBioSiteInfo.password}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const msg = `🎉 Olá, ${createdBioSiteInfo.name}! O seu BioSite exclusivo já está 100% no ar:\n\n🌐 Link Público:\nhttps://biovip.com.br/${createdBioSiteInfo.slug}\n\n🔑 Acesso ao Painel de Edição:\nhttps://biovip.com.br/entrar\n• Login: ${createdBioSiteInfo.email}\n• Senha: ${createdBioSiteInfo.password}\n\nQualquer dúvida, estamos à disposição!`
                      navigator.clipboard.writeText(msg)
                      setCredentialsCopiedToast(true)
                      setTimeout(() => setCredentialsCopiedToast(false), 3000)
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{credentialsCopiedToast ? 'Mensagem Copiada!' : 'Copiar Acesso para WhatsApp'}</span>
                  </button>

                  <a
                    href={`https://wa.me/${createdBioSiteInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `🎉 Olá, ${createdBioSiteInfo.name}! O seu BioSite exclusivo já está 100% no ar:\n\n🌐 Link Público:\nhttps://biovip.com.br/${createdBioSiteInfo.slug}\n\n🔑 Acesso ao Painel de Edição:\nhttps://biovip.com.br/entrar\n• Login: ${createdBioSiteInfo.email}\n• Senha: ${createdBioSiteInfo.password}\n\nQualquer dúvida, estamos à disposição!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enviar no WhatsApp</span>
                  </a>

                  <Link
                    href={`/${createdBioSiteInfo.slug}`}
                    target="_blank"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver ao Vivo</span>
                  </Link>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onClose()}
                    className="text-xs text-stone-400 hover:text-white transition cursor-pointer"
                  >
                    Fechar Janela
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
  )
}
'use client'

import React from 'react'
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Check,
  QrCode,
  CreditCard,
  Copy,
  MessageCircle,
  Lock,
  Sparkles,
  Users
} from 'lucide-react'

interface ClientPaymentTabProps {
  paymentStatus: 'pendente' | 'ativa' | 'suspensa' | string
  slug: string
  brandName?: string
  activePaymentMethod: 'pix' | 'cartao'
  setActivePaymentMethod: (method: 'pix' | 'cartao') => void
  pixCopied: boolean
  setPixCopied: (val: boolean) => void
  cardHolder: string
  setCardHolder: (val: string) => void
  cardNumber: string
  setCardNumber: (val: string) => void
  cardExpiry: string
  setCardExpiry: (val: string) => void
  cardCvv: string
  setCardCvv: (val: string) => void
  cardInstallments: string
  setCardInstallments: (val: string) => void
  isProcessingPayment: boolean
  paymentSuccessFeedback: boolean
  remainingHours: number
  handleConfirmPayment: () => void
}

export default function ClientPaymentTab({
  paymentStatus,
  slug,
  brandName,
  activePaymentMethod,
  setActivePaymentMethod,
  pixCopied,
  setPixCopied,
  cardHolder,
  setCardHolder,
  cardNumber,
  setCardNumber,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv,
  cardInstallments,
  setCardInstallments,
  isProcessingPayment,
  paymentSuccessFeedback,
  remainingHours,
  handleConfirmPayment
}: ClientPaymentTabProps) {
  const isPendente = paymentStatus === 'pendente'
  const pixCopyCode = `00020126580014br.gov.bcb.pix0136biovip-${slug}-2026520400005303986540555.925802BR5925BIOVIP TECNOLOGIA LTDA6009SAO PAULO62070503***6304ABCD`

  return (
      <div className="space-y-6 animate-fade-in pt-2">
        {/* CABEÃ‡ALHO DA SEÃ‡ÃƒO */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold">
              FINANCEIRO & ASSINATURA
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
              isPendente
                ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              {isPendente ? 'PAGAMENTO PENDENTE (48H)' : 'PAGAMENTO CONFIRMADO Â· ATIVO'}
            </span>
          </div>
          <h3 className="text-xl font-serif font-bold text-stone-900">
            Aba de Pagamento & RegularizaÃ§Ã£o do Bio Site
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Gerencie sua assinatura, consulte faturas e regularize seu plano para manter seu link oficial online.
          </p>
        </div>

        {/* FEEDBACK DE SUCESSO DE CONFIRMAÃ‡ÃƒO */}
        {paymentSuccessFeedback && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-medium flex items-start gap-3 animate-fade-in shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-bold text-emerald-900">
                ðŸŽ‰ Pagamento Confirmado com Sucesso!
              </strong>
              Seu Bio Site <code className="font-mono font-bold">biovip.com.br/{slug}</code> estÃ¡ com assinatura 100% ativa, hospedagem protegida e livre de qualquer risco de suspensÃ£o.
            </div>
          </div>
        )}

        {/* CARD PRINCIPAL DE STATUS COM AVISO EXIGIDO PELO USUÃRIO */}
        <div className={`p-6 rounded-3xl border transition-all ${
          isPendente
            ? 'bg-gradient-to-br from-amber-50/80 via-white to-amber-50/50 border-amber-300/80 shadow-sm'
            : 'bg-stone-50 border-stone-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-2xl ${
                isPendente ? 'bg-amber-500 text-stone-950' : 'bg-emerald-600 text-white'
              }`}>
                {isPendente ? <Clock className="w-6 h-6 animate-pulse" /> : <ShieldCheck className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold block">
                  STATUS ATUAL DA ASSINATURA
                </span>
                <h4 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  {isPendente ? 'Pagamento Pendente' : 'Assinatura Ativa & Regularizada'}
                </h4>
                <p className="text-xs text-stone-500">
                  Plano BioVip Pro Anual Â· DomÃ­nio <span className="font-mono font-semibold text-stone-800">biovip.com.br/{slug}</span>
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-2xl font-bold font-mono text-stone-900">
                R$ 55,92 <span className="text-xs font-normal text-stone-500 font-sans">/mÃªs no anual</span>
              </div>
              <div className="text-[11px] text-stone-500 font-mono">
                Total R$ 671,04/ano ou R$ 79,00 avulso
              </div>
            </div>
          </div>

          {/* ALERTA DE TOLERÃ‚NCIA DE 48 HORAS */}
          {isPendente ? (
            <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 uppercase tracking-wide">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Aviso de TolerÃ¢ncia de 48 Horas:</span>
              </div>
              <p className="font-medium text-stone-800">
                Seu Bio Site foi criado e se encontra com pagamento pendente. <strong>Se apÃ³s 48 horas o pagamento nÃ£o for confirmado, o Bio Site serÃ¡ suspenso.</strong>
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-amber-800">
                <Clock className="w-3.5 h-3.5" />
                <span>Tempo restante estimado: <strong>{remainingHours} horas</strong> para confirmaÃ§Ã£o.</span>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Assinatura regularizada. PrÃ³xima renovaÃ§Ã£o automÃ¡tica programada para daqui a 1 ano.</span>
            </div>
          )}
        </div>

        {/* FORMAS DE PAGAMENTO COM LIBERAÃ‡ÃƒO */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-xs">
          <div>
            <h4 className="text-base font-serif font-bold text-stone-900">
              Escolha a Forma de Pagamento
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Pague com seguranÃ§a criptografada e liberaÃ§Ã£o imediata da sua conta.
            </p>
          </div>

          {/* SELETOR PIX OU CARTÃƒO */}
          <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-stone-100">
            <button
              type="button"
              onClick={() => setActivePaymentMethod('pix')}
              className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
                activePaymentMethod === 'pix'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>PIX InstantÃ¢neo</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold hidden sm:inline">
                LIBERAÃ‡ÃƒO IMEDIATA
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActivePaymentMethod('cartao')}
              className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
                activePaymentMethod === 'cartao'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>CartÃ£o de CrÃ©dito</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-mono font-bold hidden sm:inline">
                ATÃ‰ 12X
              </span>
            </button>
          </div>

          {/* CONTEÃšDO DO PIX */}
          {activePaymentMethod === 'pix' && (
            <div className="space-y-6 pt-2 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-stone-50 border border-stone-200">
                {/* QR CODE VISUAL */}
                <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs shrink-0 flex flex-col items-center">
                  <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="25" height="25" fill="#1c1917" />
                    <rect x="14" y="14" width="17" height="17" fill="white" />
                    <rect x="18" y="18" width="9" height="9" fill="#1c1917" />
                    <rect x="65" y="10" width="25" height="25" fill="#1c1917" />
                    <rect x="69" y="14" width="17" height="17" fill="white" />
                    <rect x="73" y="18" width="9" height="9" fill="#1c1917" />
                    <rect x="10" y="65" width="25" height="25" fill="#1c1917" />
                    <rect x="14" y="69" width="17" height="17" fill="white" />
                    <rect x="18" y="73" width="9" height="9" fill="#1c1917" />
                    <rect x="42" y="10" width="6" height="6" fill="#1c1917" />
                    <rect x="52" y="10" width="6" height="6" fill="#1c1917" />
                    <rect x="42" y="20" width="6" height="6" fill="#1c1917" />
                    <rect x="42" y="30" width="6" height="6" fill="#1c1917" />
                    <rect x="52" y="30" width="6" height="6" fill="#1c1917" />
                    <rect x="10" y="42" width="6" height="6" fill="#1c1917" />
                    <rect x="20" y="42" width="6" height="6" fill="#1c1917" />
                    <rect x="30" y="42" width="6" height="6" fill="#1c1917" />
                    <rect x="42" y="42" width="16" height="16" fill="#059669" rx="2" />
                    <text x="50" y="53" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BV</text>
                    <rect x="65" y="42" width="6" height="6" fill="#1c1917" />
                    <rect x="75" y="42" width="6" height="6" fill="#1c1917" />
                    <rect x="84" y="42" width="6" height="6" fill="#1c1917" />
                    <rect x="42" y="65" width="6" height="6" fill="#1c1917" />
                    <rect x="52" y="65" width="6" height="6" fill="#1c1917" />
                    <rect x="42" y="75" width="6" height="6" fill="#1c1917" />
                    <rect x="65" y="65" width="6" height="6" fill="#1c1917" />
                    <rect x="75" y="75" width="6" height="6" fill="#1c1917" />
                    <rect x="84" y="65" width="6" height="6" fill="#1c1917" />
                    <rect x="84" y="84" width="6" height="6" fill="#1c1917" />
                  </svg>
                  <span className="text-[9px] font-mono text-stone-400 mt-1 uppercase">Aponte a cÃ¢mera</span>
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold block">
                      CHAVE PIX OFICIAL (CELULAR)
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white font-mono text-xs font-bold text-stone-800">
                        31991390202
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('31991390202')
                          setPixCopied(true)
                          setTimeout(() => setPixCopied(false), 2000)
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white text-[11px] font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                      >
                        {pixCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{pixCopied ? 'Copiada!' : 'Copiar Chave Celular'}</span>
                      </button>
                      <a
                        href={`https://wa.me/5531991390202?text=${encodeURIComponent(`OlÃ¡! Realizei o pagamento via Pix da anuidade do BioSite ${slug} e gostaria de enviar o comprovante para liberaÃ§Ã£o imediata.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold uppercase transition flex items-center gap-1 cursor-pointer ml-auto"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Enviar Comprovante</span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold block">
                      CÃ“DIGO PIX COPIA E COLA
                    </span>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Ou abra o app do seu banco, escolha <strong>Pix Copia e Cola</strong> e cole o cÃ³digo abaixo:
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={pixCopyCode}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-mono text-[11px] text-stone-600 select-all focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(pixCopyCode)
                        setPixCopied(true)
                        setTimeout(() => setPixCopied(false), 3000)
                      }}
                      className="shrink-0 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {pixCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-stone-500 font-medium">
                    <span>BeneficiÃ¡rio: <strong>BioVip Tecnologia / Suporte Oficial</strong></span>
                    <span>â€¢</span>
                    <span>WhatsApp: <strong>(31) 99139-0202</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/5531991390202?text=Ol%C3%A1%20equipe%20BioVip!%20Acabei%20de%20criar%20meu%20BioSite%20biovip.com.br/${slug}%20e%20gostaria%20de%20enviar%20o%20comprovante%20do%20Pix.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 hover:border-stone-900 bg-white text-stone-800 text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Enviar Comprovante via WhatsApp</span>
                </a>

                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handleConfirmPayment}
                  className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <span>Verificando pagamento...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isPendente ? 'CONFIRMAR PAGAMENTO (ATIVAR IMEDIATAMENTE)' : 'PAGAMENTO JÃ CONFIRMADO'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* CONTEÃšDO DO CARTÃƒO */}
          {activePaymentMethod === 'cartao' && (
            <div className="space-y-4 pt-2 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-stone-500 font-bold mb-1">
                    NOME IMPRESSO NO CARTÃƒO *
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Ex: MARCOS S SILVA"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-stone-500 font-bold mb-1">
                    NÃšMERO DO CARTÃƒO *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-900 pl-10"
                    />
                    <CreditCard className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-500 font-bold mb-1">
                    VALIDADE (MM/AA) *
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/AA"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-stone-500 font-bold mb-1">
                    CÃ“DIGO CVV *
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="123"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-stone-500 font-bold mb-1">
                    PARCELAMENTO
                  </label>
                  <select
                    value={cardInstallments}
                    onChange={(e) => setCardInstallments(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                  >
                    <option value="1">1x de R$ 671,04 Ã  vista (com desconto anual)</option>
                    <option value="3">3x de R$ 223,68 sem juros</option>
                    <option value="6">6x de R$ 111,84 sem juros</option>
                    <option value="12">12x de R$ 55,92 sem juros (Recomendado)</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleConfirmPayment}
                className="w-full py-4 rounded-xl bg-stone-950 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                {isProcessingPayment ? (
                  <span>Processando transaÃ§Ã£o segura...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>PAGAR COM CARTÃƒO & ATIVAR BIOSITE</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400 font-mono">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>PAGAMENTO SEGURO CRIPTOGRAFADO SSL 256-BIT</span>
              </div>
            </div>
          )}
        </div>

        {/* BENEFÃCIOS GARANTIDOS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
            <h5 className="text-xs font-bold text-stone-900">Garantia Incondicional</h5>
            <p className="text-[11px] text-stone-500">7 dias para testar ou seu dinheiro de volta sem burocracia.</p>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1">
            <Sparkles className="w-5 h-5 text-amber-600 mx-auto" />
            <h5 className="text-xs font-bold text-stone-900">12 MÃ³dulos VIP Liberados</h5>
            <p className="text-[11px] text-stone-500">Todos os mÃ³dulos de conversÃ£o, catÃ¡logo e quiz ativos.</p>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1">
            <Users className="w-5 h-5 text-indigo-600 mx-auto" />
            <h5 className="text-xs font-bold text-stone-900">Suporte Dedicado VIP</h5>
            <p className="text-[11px] text-stone-500">Atendimento prioritÃ¡rio via WhatsApp direto da equipe.</p>
          </div>
        </div>
      </div>
  )
}

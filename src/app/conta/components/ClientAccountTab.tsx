'use client'

import React from 'react'

interface ClientAccountTabProps {
  userEmail: string
  slug: string
  brandName: string
  setBrandName: (name: string) => void
  userPhone: string
  setUserPhone: (phone: string) => void
  savedSuccess: boolean
  setSavedSuccess: (val: boolean) => void
  setHasUnsavedChanges: (val: boolean) => void
  handleSavePage: () => void
}

export default function ClientAccountTab({
  userEmail,
  slug,
  brandName,
  setBrandName,
  userPhone,
  setUserPhone,
  savedSuccess,
  setSavedSuccess,
  setHasUnsavedChanges,
  handleSavePage
}: ClientAccountTabProps) {
  return (
                <div className="space-y-10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block font-bold mb-1">
                      SEUS DADOS DE ACESSO
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-stone-900">
                      Minha Conta
                    </h2>
                  </div>

                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        E-MAIL
                      </label>
                      <input
                        type="text"
                        disabled
                        value={userEmail}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-100 text-xs font-mono text-stone-600"
                      />
                      <p className="text-[10px] text-stone-400 mt-1 font-mono">
                        É com ele que você entra na sua área, em qualquer aparelho. Para trocar o e-mail, fale com a gente.
                      </p>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        SEU NOME
                      </label>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 bg-white"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        SEU WHATSAPP
                      </label>
                      <input
                        type="text"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono text-stone-900 bg-white"
                        placeholder="(31) 99999-9999"
                      />
                      <p className="text-[10px] text-stone-400 mt-1 font-mono">
                        É por onde a gente fala com você sobre a sua página. Não aparece para quem visita o seu Bio Site.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSavedSuccess(true)
                        setTimeout(() => setSavedSuccess(false), 2500)
                      }}
                      className="px-6 py-2.5 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider"
                    >
                      SALVAR DADOS
                    </button>
                  </div>

                  {/* TROCAR SENHA */}
                  <div className="pt-8 border-t border-stone-100 max-w-md space-y-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        SENHA
                      </span>
                      <h3 className="font-bold text-sm text-stone-900">Trocar a senha</h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Depois de salvar, é a nova senha que vale para entrar. Esta sessão continua aberta.
                      </p>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        SENHA ATUAL
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-stone-400 block font-bold mb-1">
                        NOVA SENHA
                      </label>
                      <input
                        type="password"
                        placeholder="Pelo menos 8 caracteres"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-white"
                      />
                      <p className="text-[10px] text-stone-400 mt-1 font-mono">
                        Pelo menos 8 caracteres, misturando letras e números.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSavedSuccess(true)
                        setTimeout(() => setSavedSuccess(false), 2500)
                      }}
                      className="px-6 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs font-bold uppercase tracking-wider"
                    >
                      SALVAR NOVA SENHA
                    </button>
                  </div>
                </div>
              
  )
}

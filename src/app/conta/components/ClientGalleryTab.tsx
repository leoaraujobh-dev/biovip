'use client'

import React, { useRef } from 'react'
import { ExternalLink, Save, Camera, Plus, Trash2, Upload } from 'lucide-react'
import { compressImageFile } from '@/utils/imageProcessors'

interface ClientGalleryTabProps {
  slug: string
  galleryConfig: any
  setGalleryConfig: React.Dispatch<React.SetStateAction<any>>
  galleryPhotos: string[]
  setGalleryPhotos: React.Dispatch<React.SetStateAction<string[]>>
  setHasUnsavedChanges: (val: boolean) => void
  handleSavePage: () => void
}

export default function ClientGalleryTab({
  slug,
  galleryConfig,
  setGalleryConfig,
  galleryPhotos,
  setGalleryPhotos,
  setHasUnsavedChanges,
  handleSavePage
}: ClientGalleryTabProps) {
  return (
                <div className="space-y-8 animate-fade-in">
                  {/* Cabeçalho da Seção */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          EDIÃ‡ÃƒO DO CLIENTE
                        </span>
                        <span className="text-xs text-stone-400 font-mono">/{slug}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                        Fotos da Galeria & Portfólio de Trabalhos
                      </h2>
                      <p className="text-xs text-stone-500 max-w-xl">
                        Atualize os registros dos seus melhores procedimentos para transmitir autoridade e encantar suas visitantes no primeiro olhar.
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <a
                        href={`/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl border border-stone-300 hover:border-stone-900 text-stone-700 text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver no Ar</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleSavePage}
                        className="px-6 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5 text-[#E2B857]" />
                        <span>Salvar Galeria</span>
                      </button>
                    </div>
                  </div>

                  {/* Configurações da Galeria */}
                  <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-stone-700" />
                        <h3 className="font-bold text-sm text-stone-900">Configuração da Seção de Galeria</h3>
                      </div>
                      <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={galleryConfig.enabled}
                          onChange={(e) => {
                            setGalleryConfig((prev: any) => ({ ...prev, enabled: e.target.checked }))
                            setHasUnsavedChanges(true)
                          }}
                          className="w-4 h-4 accent-stone-950 rounded cursor-pointer"
                        />
                        <span>{galleryConfig.enabled ? 'Galeria Visível no Bio Site' : 'Galeria Oculta'}</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-stone-600 font-semibold mb-1">
                          Selo Superior
                        </label>
                        <input
                          type="text"
                          value={galleryConfig.badge || ''}
                          onChange={(e) => {
                            setGalleryConfig((prev: any) => ({ ...prev, badge: e.target.value }))
                            setHasUnsavedChanges(true)
                          }}
                          placeholder="Ex: RESULTADOS REAIS"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-stone-600 font-semibold mb-1">
                          Título Principal
                        </label>
                        <input
                          type="text"
                          value={galleryConfig.headline || ''}
                          onChange={(e) => {
                            setGalleryConfig((prev: any) => ({ ...prev, headline: e.target.value }))
                            setHasUnsavedChanges(true)
                          }}
                          placeholder="Ex: Portfólio de Procedimentos"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-stone-600 font-semibold mb-1">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={galleryConfig.subtitle || ''}
                          onChange={(e) => {
                            setGalleryConfig((prev: any) => ({ ...prev, subtitle: e.target.value }))
                            setHasUnsavedChanges(true)
                          }}
                          placeholder="Ex: Veja transformações de clientes reais"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Grade de Fotos */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-stone-900">Fotos no Portfólio</h3>
                        <p className="text-xs text-stone-500">
                          {(galleryConfig.photos || galleryPhotos).length} fotos cadastradas. Cole a URL da imagem ou adicione fotos dos seus atendimentos.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Botão Enviar Foto do Computador */}
                        <label className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer">
                          <Upload className="w-4 h-4 text-stone-950" />
                          <span>Enviar do Computador</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (!file) return
                              try {
                                const base64 = await compressImageFile(file, 1200, 0.88)
                                if (base64) {
                                  const currentPhotos = galleryConfig.photos || galleryPhotos
                                  const currentCaptions = galleryConfig.captions || []
                                  const updatedPhotos = [...currentPhotos, base64]
                                  const updatedCaptions = [...currentCaptions, 'Registro de atendimento']
                                  setGalleryPhotos(updatedPhotos)
                                  setGalleryConfig((prev: any) => ({ ...prev, photos: updatedPhotos, captions: updatedCaptions }))
                                  setHasUnsavedChanges(true)
                                }
                              } catch (err) {
                                console.error('Erro ao processar imagem:', err)
                              }
                              e.target.value = ''
                            }}
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            const currentPhotos = galleryConfig.photos || galleryPhotos
                            const currentCaptions = galleryConfig.captions || []
                            const newUrl = 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=800&q=80'
                            const newCaption = 'Procedimento exclusivo com acabamento de luxo'
                            const updatedPhotos = [...currentPhotos, newUrl]
                            const updatedCaptions = [...currentCaptions, newCaption]
                            setGalleryPhotos(updatedPhotos)
                            setGalleryConfig((prev: any) => ({ ...prev, photos: updatedPhotos, captions: updatedCaptions }))
                            setHasUnsavedChanges(true)
                          }}
                          className="px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                        >
                          <Plus className="w-4 h-4 text-amber-400" />
                          <span>Adicionar Link</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(galleryConfig.photos || galleryPhotos).map((photoUrl: any, idx: number) => {
                        const caption = (galleryConfig.captions && galleryConfig.captions[idx]) || ''
                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-3xl bg-white border border-stone-200/90 hover:border-stone-400 transition shadow-xs space-y-3 flex flex-col justify-between"
                          >
                            <div className="space-y-2.5">
                              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                                <img
                                  src={photoUrl}
                                  alt={`Foto ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'
                                  }}
                                />
                                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-mono text-white font-bold">
                                  #{idx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentPhotos = galleryConfig.photos || galleryPhotos
                                    const currentCaptions = galleryConfig.captions || []
                                    const updatedPhotos = currentPhotos.filter((_: any, i: number) => i !== idx)
                                    const updatedCaptions = currentCaptions.filter((_: any, i: number) => i !== idx)
                                    setGalleryPhotos(updatedPhotos)
                                    setGalleryConfig((prev: any) => ({ ...prev, photos: updatedPhotos, captions: updatedCaptions }))
                                    setHasUnsavedChanges(true)
                                  }}
                                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition cursor-pointer"
                                  title="Remover foto"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                                <label
                                  className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-amber-500 text-white hover:text-black transition cursor-pointer"
                                  title="Substituir por foto do computador"
                                >
                                  <Camera className="w-3.5 h-3.5" />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0]
                                      if (!file) return
                                      try {
                                        const base64 = await compressImageFile(file, 1200, 0.88)
                                        if (base64) {
                                          const currentPhotos = [...(galleryConfig.photos || galleryPhotos)]
                                          currentPhotos[idx] = base64
                                          setGalleryPhotos(currentPhotos)
                                          setGalleryConfig((prev: any) => ({ ...prev, photos: currentPhotos }))
                                          setHasUnsavedChanges(true)
                                        }
                                      } catch (err) {
                                        console.error('Erro ao substituir foto:', err)
                                      }
                                      e.target.value = ''
                                    }}
                                  />
                                </label>
                              </div>

                              <div>
                                <label className="block text-[10px] font-mono uppercase text-stone-500 font-semibold mb-1">
                                  URL da Imagem
                                </label>
                                <input
                                  type="text"
                                  value={photoUrl}
                                  onChange={(e) => {
                                    const currentPhotos = [...(galleryConfig.photos || galleryPhotos)]
                                    currentPhotos[idx] = e.target.value
                                    setGalleryPhotos(currentPhotos)
                                    setGalleryConfig((prev: any) => ({ ...prev, photos: currentPhotos }))
                                    setHasUnsavedChanges(true)
                                  }}
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-[11px] font-mono text-stone-800 bg-stone-50 focus:bg-white focus:outline-none focus:border-stone-900"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-mono uppercase text-stone-500 font-semibold mb-1">
                                  Legenda do Procedimento
                                </label>
                                <input
                                  type="text"
                                  value={caption}
                                  onChange={(e) => {
                                    const currentCaptions = [...(galleryConfig.captions || [])]
                                    currentCaptions[idx] = e.target.value
                                    setGalleryConfig((prev: any) => ({ ...prev, captions: currentCaptions }))
                                    setHasUnsavedChanges(true)
                                  }}
                                  placeholder="Ex: Volume Russo com curvatura D e retenção de 30 dias"
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-800 bg-stone-50 focus:bg-white focus:outline-none focus:border-stone-900"
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                      <span className="text-xs text-stone-500">
                        Suas fotos são salvas e publicadas em tempo real com zoom e lightbox interativo.
                      </span>
                      <button
                        type="button"
                        onClick={handleSavePage}
                        className="px-8 py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-[#E2B857]" />
                        <span>Salvar Galeria no Bio Site</span>
                      </button>
                    </div>
                  </div>
                </div>
              
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import {
  Edit2,
  X,
  Sparkles,
  Wand2
} from 'lucide-react'
import { Project } from '@/data/projects'
import { PALETTES } from '@/data/bioSiteDesign'

interface AdminProjectModalProps {
  isOpen: boolean
  project: Project | null
  onClose: () => void
  onSave: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function AdminProjectModal({
  isOpen,
  project,
  onClose,
  onSave
}: AdminProjectModalProps) {
  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#14181f] border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-amber-400" />
            Editar Case de Estudo: {project.name}
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-amber-300">Prefere editar no Construtor Visual?</div>
              <div className="text-[11px] text-stone-300">
                Ajuste fotos, 16 fontes, 10 estilos de botões e páginas com <strong>iPhone Mockup ao vivo</strong>.
              </div>
            </div>
          </div>
          <Link
            href={`/conta?edit=${project.slug}`}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0 shadow-md"
          >
            <Wand2 className="w-3.5 h-3.5" /> Abrir no Construtor Visual
          </Link>
        </div>

        <form onSubmit={onSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-400 mb-1">Nome do Profissional / Empresa</label>
              <input
                type="text"
                name="name"
                defaultValue={project.name}
                required
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Especialidade / Título do Case</label>
              <input
                type="text"
                name="role"
                defaultValue={project.role}
                required
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-400 mb-1">Categoria de Mercado</label>
              <input
                type="text"
                name="category"
                defaultValue={project.category}
                required
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Paleta Visual de Cores</label>
              <select
                name="paletteId"
                defaultValue={project.paletteId || 'luxo_nude'}
                className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                {PALETTES.map((pal) => (
                  <option key={pal.id} value={pal.id}>
                    {pal.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-stone-400 mb-1">URL da Imagem de Capa do Case</label>
            <input
              type="url"
              name="image"
              defaultValue={project.image}
              required
              className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-400 mb-1">Descrição Comercial do Case</label>
            <textarea
              name="description"
              rows={2}
              defaultValue={project.description}
              required
              className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-stone-400 mb-1">Diferenciais do Case (separados por vírgula)</label>
            <input
              type="text"
              name="features"
              defaultValue={project.features.join(', ')}
              className="w-full px-3 py-2 bg-[#0d0f12] border border-stone-700 rounded-xl text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="p-4 bg-[#0d0f12] rounded-2xl border border-stone-800 space-y-3">
            <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Métricas de Conversão do Case
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-stone-400 mb-1">Visualizações</label>
                <input
                  type="text"
                  name="views"
                  defaultValue={project.stats.views}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-white font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-400 mb-1">Cliques no WhatsApp</label>
                <input
                  type="text"
                  name="clicks"
                  defaultValue={project.stats.clicks}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-white font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-400 mb-1">Taxa de Conversão</label>
                <input
                  type="text"
                  name="conversion"
                  defaultValue={project.stats.conversion}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-white font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-400 hover:text-white transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-stone-950 font-bold rounded-xl transition cursor-pointer shadow-md"
            >
              Salvar Case de Estudo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

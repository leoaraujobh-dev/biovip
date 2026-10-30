import React from 'react';
import {
  FolderArchive,
  Folder,
  Server,
  Code,
  Check,
  Copy,
  Download,
} from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { SavedMicrosite } from '../../../types/microsite';

export interface ExportTabProps {
  data: typeof INITIAL_DATA;
  currentEditingSite?: SavedMicrosite | null;
  savedSites: SavedMicrosite[];
  downloadMicrositeDirectoryZip: () => void;
  downloadAllSitesDirectoryZip: () => void;
  copyExportCode: () => void;
  copiedCode: boolean;
  downloadHtmlFile: () => void;
  generateExportCode: () => string;
}

export function ExportTab({
  data,
  currentEditingSite,
  savedSites,
  downloadMicrositeDirectoryZip,
  downloadAllSitesDirectoryZip,
  copyExportCode,
  copiedCode,
  downloadHtmlFile,
  generateExportCode,
}: ExportTabProps) {
  const currentSubdomain =
    currentEditingSite?.subdomain || data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'microsite';

  return (
    <div className="space-y-5">
      {/* Card Destaque: Estrutura de Hospedagem em Pasta Independente */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-900 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <FolderArchive className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-1.5">
                Estrutura de Hospedagem em Pastas Independentes
              </h3>
              <p className="text-[11px] text-neutral-400">
                Cada cliente tem sua pasta isolada no servidor com arquivos, PWA, SEO e regras de servidor.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
            Pastas Isoladas
          </span>
        </div>

        {/* Diagrama Visual da Árvore de Pastas */}
        <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-amber-400" />
              Estrutura no Servidor de Hospedagem:
            </span>
            <span className="font-mono text-emerald-400 text-[10px]">
              /public_html/{currentSubdomain}/
            </span>
          </div>

          <pre className="p-3 rounded bg-neutral-950 border border-neutral-855 font-mono text-[10.5px] text-neutral-300 leading-relaxed overflow-x-auto">
{`public_html/
└── ${currentSubdomain}/             <-- Pasta 100% independente do cliente
    ├── index.html                 <-- Microsite completo (HTML5 + CSS3 + Meta Tags + Scripts)
    ├── manifest.json              <-- PWA Manifest (Instalável no celular como aplicativo)
    ├── robots.txt                 <-- Indexação SEO para Google e buscadores
    ├── .htaccess                  <-- Regras Apache / cPanel (Rewrite URL + Gzip + Cache)
    ├── nginx.conf                 <-- Bloco de configuração para servidores Nginx
    ├── README-HOSPEDAGEM.txt      <-- Instruções passo a passo de publicação
    └── assets/
        └── site-info.json         <-- Metadados estruturados (Cliente, Contatos, Mensalidade)`}
          </pre>
        </div>

        {/* Botões de Download do Pacote ZIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => downloadMicrositeDirectoryZip()}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer transition"
            title="Baixar pacote ZIP pronto para extrair na public_html do seu servidor"
          >
            <FolderArchive className="w-4 h-4 text-neutral-950" />
            <span>Baixar Pasta Deste Microsite (ZIP)</span>
          </button>

          <button
            type="button"
            onClick={downloadAllSitesDirectoryZip}
            className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition shadow"
            title="Baixar todas as pastas dos clientes salvos organizadas em um único ZIP"
          >
            <Server className="w-4 h-4 text-amber-400" />
            <span>Baixar Todas as Pastas ({savedSites.length} Clientes)</span>
          </button>
        </div>

        {/* Guias Rápidos de Publicação */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-[11px]">
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="font-bold text-amber-400 block">cPanel / Hostinger</span>
            <p className="text-[10px] text-neutral-400 leading-normal">
              Abra o Gerenciador de Arquivos em <code className="text-neutral-300">public_html</code> e envie o ZIP. Extraia lá dentro para criar a pasta independente.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="font-bold text-emerald-400 block">Subdomínio Próprio</span>
            <p className="text-[10px] text-neutral-400 leading-normal">
              Crie o subdomínio apontando a raiz para <code className="text-neutral-300">public_html/{currentSubdomain}</code>.
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="font-bold text-sky-400 block">Vercel / Netlify</span>
            <p className="text-[10px] text-neutral-400 leading-normal">
              Arraste a pasta descompactada para o painel de deploy estático. Funciona sem backend.
            </p>
          </div>
        </div>
      </div>

      {/* Opções de Exportação de Código Avulso */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-amber-400" /> Código HTML Standalone (Arquivo Único)
          </h4>
          <span className="text-[10px] text-neutral-500">Auto-suficiente</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={copyExportCode}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow cursor-pointer transition ${
              copiedCode
                ? 'bg-emerald-500 text-neutral-950 ring-2 ring-emerald-400'
                : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
            }`}
          >
            {copiedCode ? <Check className="w-4 h-4 text-neutral-950" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode ? 'Código Copiado com Sucesso!' : 'Copiar Código HTML'}</span>
          </button>
          <button
            onClick={downloadHtmlFile}
            className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 cursor-pointer transition"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Baixar Apenas index.html</span>
          </button>
        </div>

        <pre className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400 max-h-[260px] overflow-auto select-all">
          {generateExportCode()}
        </pre>
      </div>
    </div>
  );
}

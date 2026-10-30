import React from 'react';
import {
  FileText,
  X,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Eye,
  Percent,
  Printer,
  Share2,
  Check,
  Copy,
  Download,
} from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';
import { isModelMicrosite } from '../../utils/htmlGenerators';
import { formatDueDateBr } from '../../utils/formatters';

export interface PdfReportModalProps {
  pdfReportModalOpen: boolean;
  setPdfReportModalOpen: (open: boolean) => void;
  singlePdfSiteId: string | null;
  setSinglePdfSiteId: (id: string | null) => void;
  savedSites: SavedMicrosite[];
  copiedPdfSummary: boolean;
  setCopiedPdfSummary: (copied: boolean) => void;
  copiedSinglePdfSummary: boolean;
  printPdfReport: () => void;
  printSinglePdfReport: (site: SavedMicrosite) => void;
  copyWhatsappExecutiveSummary: () => void;
  downloadPdfReportHtml: () => void;
  copySingleWhatsappSummary: (site: SavedMicrosite) => void;
  downloadSinglePdfReportHtml: (site: SavedMicrosite) => void;
}

export const PdfReportModal: React.FC<PdfReportModalProps> = ({
  pdfReportModalOpen,
  setPdfReportModalOpen,
  singlePdfSiteId,
  setSinglePdfSiteId,
  savedSites,
  copiedPdfSummary,
  setCopiedPdfSummary,
  copiedSinglePdfSummary,
  printPdfReport,
  printSinglePdfReport,
  copyWhatsappExecutiveSummary,
  downloadPdfReportHtml,
  copySingleWhatsappSummary,
  downloadSinglePdfReportHtml,
}) => {
  return (
    <>
      {/* Executive PDF Performance & Financial Summary Modal */}
      {pdfReportModalOpen && (() => {
        const todayStr = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
        const billableSites = savedSites.filter(s => !isModelMicrosite(s));
        const totalMrr = billableSites.reduce((acc, s) => acc + (s.status !== 'disabled' ? s.monthlyFee : 0), 0);
        const totalClicks = savedSites.reduce((acc, s) => acc + (s.whatsappClicks || 0), 0);
        const totalViews = savedSites.reduce((acc, s) => acc + (s.pageViews || 100), 0);
        const avgConversion = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';
        const totalUpdates = savedSites.reduce((acc, s) => acc + s.updatesThisMonth, 0);

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 text-neutral-100 shadow-2xl my-8 max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-neutral-800 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-neutral-100">
                        RelatÃ³rio Executivo Mensal â€” Performance & Financeiro
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                        PDF READY
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Resumo consolidado para prestaÃ§Ã£o de contas mensal e envio aos clientes Â· Emitido em {todayStr}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPdfReportModalOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable Document Preview Container */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {/* Summary Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Microsites</span>
                    <div className="text-lg font-black text-amber-400">{savedSites.length} pÃ¡ginas</div>
                    <span className="text-[9px] text-neutral-500">{billableSites.length} faturÃ¡veis Â· {savedSites.length - billableSites.length} modelos</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Receita MRR</span>
                    <div className="text-lg font-black text-emerald-400">
                      R$ {totalMrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-[9px] text-neutral-500">Recorrente mensal (s/ modelos)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">ConversÃ£o MÃ©dia</span>
                    <div className="text-lg font-black text-emerald-300 font-mono">{avgConversion}%</div>
                    <span className="text-[9px] text-neutral-500">{totalClicks} cliques / {totalViews} views</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">EdiÃ§Ãµes Este MÃªs</span>
                    <div className="text-lg font-black text-amber-300">{totalUpdates} ediÃ§Ãµes</div>
                    <span className="text-[9px] text-neutral-500">AlteraÃ§Ãµes no perÃ­odo</span>
                  </div>
                </div>

                {/* Table Preview */}
                <div className="rounded-xl border border-neutral-800 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px] border-b border-neutral-800">
                      <tr>
                        <th className="p-3">Cliente / Empresa</th>
                        <th className="p-3">DomÃ­nio Ativo</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-center">Vencimento</th>
                        <th className="p-3 text-center">ConversÃ£o WA</th>
                        <th className="p-3 text-right">Mensalidade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80 bg-neutral-900/50">
                      {savedSites.map(s => {
                        const clicks = s.whatsappClicks || 0;
                        const views = s.pageViews || 100;
                        const rate = ((clicks / views) * 100).toFixed(1);
                        const domain = s.customDomain || `biovip.com.br/${s.subdomain}`;
                        const isModel = isModelMicrosite(s);

                        return (
                          <tr key={s.id} className="hover:bg-neutral-800/50 transition">
                            <td className="p-3">
                              <div className="font-bold text-neutral-100">{s.clientName}</div>
                              <div className="text-[10px] text-neutral-400">{s.nicheCategory}</div>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-amber-400/90">
                              https://{domain}
                            </td>
                            <td className="p-3 text-center">
                              {isModel ? (
                                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                  Modelo (Isento)
                                </span>
                              ) : s.status === 'disabled' ? (
                                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-red-500/15 text-red-400 border border-red-500/30">
                                  Desativado
                                </span>
                              ) : s.status === 'overdue' ? (
                                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                  Vencido
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                  Em Dia
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-center font-mono text-neutral-300">{isModel ? 'â€”' : s.dueDate}</td>
                            <td className="p-3 text-center font-mono font-bold text-emerald-300">
                              {rate}% <span className="text-[10px] font-normal text-neutral-400">({clicks}/{views})</span>
                            </td>
                            <td className="p-3 text-right font-bold text-emerald-300">
                              {isModel ? (
                                <span className="text-amber-300 text-[11px]">Isento (Modelo)</span>
                              ) : (
                                `R$ ${s.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={copyWhatsappExecutiveSummary}
                  className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                >
                  {copiedPdfSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                  <span>{copiedPdfSummary ? 'Resumo Copiado!' : 'Copiar Resumo para WhatsApp'}</span>
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={downloadPdfReportHtml}
                    className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Baixar RelatÃ³rio HTML</span>
                  </button>

                  <button
                    type="button"
                    onClick={printPdfReport}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir / Salvar em PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Individual Client Executive PDF Performance & Financial Modal */}
      {singlePdfSiteId && (() => {
        const site = savedSites.find(s => s.id === singlePdfSiteId);
        if (!site) return null;

        const todayStr = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
        const clicks = site.whatsappClicks || 0;
        const views = site.pageViews || 100;
        const rate = Number(((clicks / views) * 100).toFixed(1));
        const domain = site.customDomain || `biovip.com.br/${site.subdomain}`;

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5 text-neutral-100 shadow-2xl my-8 max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-neutral-800 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-neutral-100">
                        RelatÃ³rio Individual â€” {site.clientName}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                        PDF CLIENTE
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Resumo individual de performance e cobranÃ§a mensal Â· Emitido em {todayStr}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSinglePdfSiteId(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable Document Preview Container */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {/* Summary Metrics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">ConversÃ£o WA</span>
                    <div className="text-lg font-black text-emerald-400 font-mono">{rate}%</div>
                    <span className="text-[9px] text-neutral-500">{clicks} cliques / {views} views</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Mensalidade</span>
                    <div className="text-lg font-black text-amber-300">
                      R$ {site.monthlyFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-[9px] text-neutral-500">Recorrente mensal</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Vencimento</span>
                    <div className="text-base font-black text-neutral-200 font-mono">{site.dueDate}</div>
                    <span className="text-[9px] text-neutral-500">
                      {site.status === 'disabled' ? 'Desativado' : site.status === 'overdue' ? 'Vencido' : 'Em Dia'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">EdiÃ§Ãµes no MÃªs</span>
                    <div className="text-lg font-black text-amber-400">{site.updatesThisMonth} ediÃ§Ãµes</div>
                    <span className="text-[9px] text-neutral-500">Ãšltima: {site.lastUpdated}</span>
                  </div>
                </div>

                {/* Details Card */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                  <span className="font-bold text-amber-400 uppercase text-[11px] block border-b border-neutral-800 pb-2">
                    Ficha TÃ©cnica do Cliente & Microsite
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-neutral-300">
                    <div>
                      <span className="text-[10px] text-neutral-500 block">RazÃ£o Social / Cliente:</span>
                      <span className="font-bold text-neutral-100">{site.clientName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block">Nicho de Mercado:</span>
                      <span className="text-neutral-200">{site.nicheCategory}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-neutral-500 block">EndereÃ§o do Site (URL):</span>
                      <span className="font-mono text-amber-400">https://{domain}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block">WhatsApp de Contato:</span>
                      <span>{site.clientPhone || 'NÃ£o informado'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 block">E-mail Cadastrado:</span>
                      <span>{site.clientEmail || 'NÃ£o informado'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => copySingleWhatsappSummary(site)}
                  className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                >
                  {copiedSinglePdfSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                  <span>{copiedSinglePdfSummary ? 'Resumo Copiado!' : 'Copiar Resumo para WhatsApp'}</span>
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => downloadSinglePdfReportHtml(site)}
                    className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-neutral-700 transition"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Baixar HTML Individual</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => printSinglePdfReport(site)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir / Salvar em PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

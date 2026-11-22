import React from 'react';
import {
  Globe,
  X,
  Server,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Check,
  Copy,
  RefreshCw,
  FolderArchive,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';
import { safeCopyText } from '../../utils/formatters';
import { executeAndLog } from '../../utils/errorHandling';

export interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPublishSiteId: string | null;
  savedSites: SavedMicrosite[];
  setSavedSites: React.Dispatch<React.SetStateAction<SavedMicrosite[]>>;
  data: any;
  landingConfig: any;
  dnsProviderTab: 'registrobr' | 'godaddy' | 'hostinger' | 'cloudflare';
  setDnsProviderTab: (tab: 'registrobr' | 'godaddy' | 'hostinger' | 'cloudflare') => void;
  copiedDnsField: string | null;
  setCopiedDnsField: (field: string | null) => void;
  dnsTesting: boolean;
  setDnsTesting: (testing: boolean) => void;
  dnsCheckStatus: any;
  setDnsCheckStatus: React.Dispatch<React.SetStateAction<any>>;
  copyDnsValue: (value: string, fieldId: string, label: string) => Promise<void> | void;
  validateCustomDomain: (rawInput: string) => any;
  verifyDomainDnsRecords: (options?: { silent?: boolean; forceMode?: 'subdomain' | 'custom' }) => Promise<void> | void;
  syncSiteToFirestore: (site: SavedMicrosite) => Promise<void> | void;
  downloadMicrositeDirectoryZip: (site: SavedMicrosite) => void;
  showToast: (msg: string) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  selectedPublishSiteId,
  savedSites,
  setSavedSites,
  data,
  landingConfig,
  dnsProviderTab,
  setDnsProviderTab,
  copiedDnsField,
  setCopiedDnsField,
  dnsTesting,
  setDnsTesting,
  dnsCheckStatus,
  setDnsCheckStatus,
  copyDnsValue,
  validateCustomDomain,
  verifyDomainDnsRecords,
  syncSiteToFirestore,
  downloadMicrositeDirectoryZip,
  showToast,
}) => {
  if (!isOpen) return null;

  const targetSite =
    savedSites.find((s) => s.id === selectedPublishSiteId) ||
    savedSites.find((s) => s.clientName?.toLowerCase() === data.profile.name?.toLowerCase()) ||
    savedSites.find((s) => s.subdomain && data.profile.name?.toLowerCase().includes(s.subdomain.toLowerCase())) ||
    savedSites[0] || {
      id: 'temp',
      subdomain: data.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'meusite',
      customDomain: '',
      clientName: data.profile.name,
      dnsConfigured: false,
      sslActive: true,
      domainType: 'subdomain' as const,
    };

        const rawCustomDomain = targetSite.customDomain || '';
        const domainValidation = validateCustomDomain(rawCustomDomain);
        const effectiveRootDomain = domainValidation.isValid
          ? domainValidation.rootDomain
          : `${(targetSite.subdomain || 'seucliente').replace(/[^a-z0-9-]/g, '')}.com.br`;
        const effectiveCnameHost = domainValidation.isValid ? domainValidation.cnameHost : 'www';
        const aRecordIp = '76.76.21.21';
        const cnameTargetValue = 'cname.biovip.com.br';
        const cleanSlugSuggestion = (targetSite.subdomain || data.profile.name || 'cliente')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '')
          .slice(0, 24) || 'meucliente';

        const updateTargetCustomDomain = (newVal: string) => {
          setDnsCheckStatus(null);
          if (savedSites.some(s => s.id === targetSite.id)) {
            const valCheck = validateCustomDomain(newVal);
            const updated = savedSites.map(s =>
              s.id === targetSite.id
                ? {
                    ...s,
                    customDomain: newVal,
                    domainType: newVal.trim() ? ('custom' as const) : ('subdomain' as const),
                    dnsConfigured: valCheck.isValid ? s.dnsConfigured : false,
                  }
                : s
            );
            setSavedSites(updated);
          }
        };

        const copyFullDnsInstructionsForClient = async () => {
          const domDisplay = domainValidation.isValid ? domainValidation.sanitizedDomain : effectiveRootDomain;
          const instructionsText = [
            `🌐 *INSTRUÇÕES DE APONTAMENTO DNS — ${targetSite.clientName.toUpperCase()}*`,
            `Domínio configurado: *${domDisplay}*`,
            ``,
            `Para ativar seu microsite no seu próprio domínio com certificado de segurança SSL (HTTPS), acesse o painel onde comprou seu domínio (*Registro.br*, *GoDaddy*, *Hostinger* ou *Cloudflare*) e adicione estas 2 entradas na Zona de DNS:`,
            ``,
            `1️⃣ *REGISTRO TIPO A (Domínio Raiz / Sem www):*`,
            `• Tipo: *A*`,
            `• Nome / Host: *@* (ou deixe em branco no Registro.br)`,
            `• Valor / Destino (IPv4): *${aRecordIp}*`,
            `• TTL: *3600* (ou Automático / 1 hora)`,
            ``,
            `2️⃣ *REGISTRO TIPO CNAME (Subdomínio com ${effectiveCnameHost}):*`,
            `• Tipo: *CNAME*`,
            `• Nome / Host: *${effectiveCnameHost}*`,
            `• Valor / Aponta para: *${cnameTargetValue}*`,
            `• TTL: *3600* (ou Automático / 1 hora)`,
            ``,
            `✅ *Importante:* Caso já exista algum registro antigo do tipo *A* (Nome @) ou *CNAME* (Nome ${effectiveCnameHost}) apontando para outra página de estacionamento, edite ou remova o antigo para evitar conflito.`,
          ].join('\n');

          await copyDnsValue(instructionsText, 'full-whatsapp-dns', 'Instruções completas de DNS');
        };

        return (
          <div id="publishModalOpen" className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-5 text-neutral-100 shadow-2xl my-auto max-h-[92vh] flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-neutral-800 pb-3.5 shrink-0">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm sm:text-base text-neutral-100 flex items-center gap-2">
                      <Globe className="w-4.5 h-4.5 text-amber-400" />
                      Publicação, Validador de Domínio & Configuração DNS
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> SSL / HTTPS Automático
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Configure o subdomínio gratuito ou valide um domínio próprio com guia passo a passo para <strong className="text-neutral-200">{targetSite.clientName}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 tab-scrollbar">
                {/* Opção 1: Endereço Oficial BioVip */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Opção 1: Domínio Oficial BioVip (Ativação Imediata)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={dnsTesting}
                        onClick={() => verifyDomainDnsRecords({ forceMode: 'subdomain' })}
                        className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1 cursor-pointer transition disabled:opacity-50"
                        title="Consultar API DNS da Cloudflare para verificar se o domínio está apontando para o servidor"
                      >
                        <RefreshCw className={`w-2.5 h-2.5 ${dnsTesting ? 'animate-spin' : ''}`} />
                        <span>Verificar DNS BioVip</span>
                      </button>
                      <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                        ● PRONTO PARA USO
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center rounded-xl bg-neutral-900 border border-neutral-800 focus-within:border-amber-500/60 overflow-hidden">
                    <span className="pl-3 pr-1 text-xs text-neutral-400 font-mono select-none bg-neutral-950/60 py-2 border-r border-neutral-800">
                      https://{(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/
                    </span>
                    <input
                      type="text"
                      value={targetSite.subdomain || 'meusite'}
                      onChange={(e) => {
                        const cleanSubInput = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                        const updated = savedSites.map(s => s.id === targetSite.id ? { ...s, subdomain: cleanSubInput } : s);
                        setSavedSites(updated);
                      }}
                      className="flex-1 px-2.5 py-2 bg-transparent text-amber-300 font-mono text-xs font-bold focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        copyDnsValue(
                          `https://${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/${targetSite.subdomain || 'meusite'}`,
                          'subdomain-url',
                          'Link do BioSite'
                        )
                      }
                      className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition border-l border-neutral-700"
                      title="Copiar URL do BioSite"
                    >
                      {copiedDnsField === 'subdomain-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{copiedDnsField === 'subdomain-url' ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                    <a
                      href={`https://${(landingConfig.baseDomain || 'biovip.com.br').toLowerCase()}/${targetSite.subdomain || 'meusite'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition border-l border-neutral-700 no-underline"
                      title="Abrir página do BioSite em nova guia"
                    >
                      <Globe className="w-3.5 h-3.5 text-amber-400" />
                      <span>Abrir</span>
                    </a>
                  </div>
                </div>

                {/* Opção 2: Domínio Personalizado com Validador & Guia DNS (Registro A + CNAME) */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-bold text-neutral-100 flex items-center gap-1.5">
                      <Server className="w-4 h-4 text-amber-400" />
                      Opção 2: Domínio Próprio Personalizado (.com.br / .com / .med.br / .adv.br)
                    </span>
                    {domainValidation.status === 'valid' ? (
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Domínio Válido
                      </span>
                    ) : domainValidation.status === 'invalid' ? (
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-red-500/15 text-red-300 border border-red-500/30 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-400" /> Formato Inválido
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono bg-neutral-900 text-neutral-400 border border-neutral-800">
                        Aguardando domínio
                      </span>
                    )}
                  </div>

                  {/* Input do Domínio + Botão de Limpeza / Formatação */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10.5px] font-semibold text-neutral-300">
                        Digite o domínio registrado pelo cliente para validar e gerar os registros DNS:
                      </label>
                      {rawCustomDomain && (
                        <button
                          type="button"
                          onClick={() => updateTargetCustomDomain('')}
                          className="text-[10px] text-neutral-500 hover:text-red-400 cursor-pointer transition"
                        >
                          Limpar campo
                        </button>
                      )}
                    </div>

                    <div
                      className={`flex items-center rounded-xl bg-neutral-900 border transition overflow-hidden ${
                        domainValidation.status === 'valid'
                          ? 'border-emerald-500/60 focus-within:border-emerald-400'
                          : domainValidation.status === 'invalid'
                          ? 'border-red-500/60 focus-within:border-red-400'
                          : 'border-neutral-800 focus-within:border-amber-400'
                      }`}
                    >
                      <div className="pl-3 pr-1.5 flex items-center">
                        {domainValidation.status === 'valid' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : domainValidation.status === 'invalid' ? (
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        ) : (
                          <Globe className="w-4 h-4 text-neutral-500 shrink-0" />
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Ex: www.clinicaestetica.com.br ou dracamilamendes.adv.br"
                        value={rawCustomDomain}
                        onChange={(e) => updateTargetCustomDomain(e.target.value)}
                        onBlur={() => {
                          if (domainValidation.isValid && domainValidation.needsSanitization) {
                            updateTargetCustomDomain(domainValidation.sanitizedDomain);
                          }
                        }}
                        className="flex-1 px-2 py-2.5 text-xs bg-transparent text-neutral-100 font-mono focus:outline-none"
                      />
                      {domainValidation.needsSanitization && domainValidation.sanitizedDomain && (
                        <button
                          type="button"
                          onClick={() => updateTargetCustomDomain(domainValidation.sanitizedDomain)}
                          className="mr-1.5 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-[10px] cursor-pointer transition shrink-0"
                          title="Remover http://, barras ou espaços e aplicar formato de domínio válido"
                        >
                          Corrigir para {domainValidation.sanitizedDomain}
                        </button>
                      )}
                    </div>

                    {/* Sugestões rápidas de preenchimento para teste/cliente */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      <span className="text-[9.5px] text-neutral-500">Exemplos rápidos:</span>
                      {[
                        `www.${cleanSlugSuggestion}.com.br`,
                        `${cleanSlugSuggestion}.com.br`,
                        `bio.${cleanSlugSuggestion}.com.br`,
                      ].map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => updateTargetCustomDomain(sug)}
                          className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-[9.5px] font-mono text-neutral-400 hover:text-amber-300 border border-neutral-800 cursor-pointer transition"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>

                    {/* Feedback de Validação em Tempo Real */}
                    {domainValidation.status === 'invalid' && (
                      <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2 text-[11px] text-red-300">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div className="space-y-1 flex-1">
                          <div className="font-bold text-red-200">Domínio com formato inválido:</div>
                          <p className="text-[10.5px] leading-relaxed">{domainValidation.errorMessage}</p>
                        </div>
                      </div>
                    )}

                    {domainValidation.status === 'valid' && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Domínio validado e pronto para apontamento DNS!
                          </span>
                          <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-neutral-950/80 text-amber-300 border border-amber-500/30">
                            {domainValidation.isSubdomain ? `Subdomínio (${domainValidation.cnameHost})` : 'Domínio Raiz + www'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-mono bg-neutral-950/80 p-2 rounded-lg border border-neutral-800/80">
                          <div>
                            <span className="text-neutral-500 block font-sans text-[9px]">Domínio Raiz (Apex):</span>
                            <span className="text-neutral-100 font-bold">{domainValidation.rootDomain}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block font-sans text-[9px]">Subdomínio CNAME:</span>
                            <span className="text-amber-300 font-bold">{domainValidation.cnameHost}.{domainValidation.rootDomain}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block font-sans text-[9px]">Redirecionamento SSL:</span>
                            <span className="text-emerald-400 font-bold">Automático (301 HTTPS)</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* TABELA EXATA DE REGISTROS DNS (REGISTRO A + REGISTRO CNAME) */}
                  <div className="space-y-2.5 pt-2 border-t border-neutral-900">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div>
                        <span className="text-xs font-bold text-amber-400 block">
                          1. Tabela Exata de Registros DNS (CNAME e Registro A)
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          Configure estas 2 entradas na Zona DNS do domínio <strong className="text-neutral-200 font-mono">{effectiveRootDomain}</strong>:
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={copyFullDnsInstructionsForClient}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1.5 cursor-pointer transition"
                        title="Copiar todas as instruções formatadas para enviar ao cliente ou técnico no WhatsApp"
                      >
                        {copiedDnsField === 'full-whatsapp-dns' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-300">Instruções Copiadas!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-amber-400" />
                            <span>Copiar Tudo p/ WhatsApp</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Card Registro Tipo A */}
                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-black text-[10px]">
                            REGISTRO A
                          </span>
                          <span className="text-[11px] font-semibold text-neutral-200">
                            Domínio Principal / Raiz (Sem www)
                          </span>
                        </div>
                        <span className="text-[9.5px] font-mono text-neutral-400">
                          {effectiveRootDomain}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 font-mono text-[10.5px] bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/90 items-center">
                        <div className="sm:col-span-2">
                          <span className="text-[9px] text-neutral-500 block font-sans">Tipo</span>
                          <span className="font-bold text-amber-400">A</span>
                        </div>

                        <div className="sm:col-span-4 flex items-center justify-between gap-1 bg-neutral-900/90 px-2 py-1 rounded border border-neutral-800">
                          <div>
                            <span className="text-[8.5px] text-neutral-500 block font-sans">Nome / Host</span>
                            <span className="font-bold text-neutral-100">@</span>
                            <span className="text-[9px] text-neutral-500 ml-1">(ou vazio)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyDnsValue('@', 'a-host', 'Host do Registro A')}
                            className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-amber-300 cursor-pointer"
                            title="Copiar Nome @"
                          >
                            {copiedDnsField === 'a-host' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>

                        <div className="sm:col-span-4 flex items-center justify-between gap-1 bg-neutral-900/90 px-2 py-1 rounded border border-neutral-800">
                          <div>
                            <span className="text-[8.5px] text-neutral-500 block font-sans">Valor / Destino (IPv4)</span>
                            <span className="font-bold text-emerald-400">{aRecordIp}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyDnsValue(aRecordIp, 'a-val', 'IP do Registro A')}
                            className="px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-[9px] text-amber-300 font-sans font-bold flex items-center gap-1 cursor-pointer"
                            title="Copiar IP 76.76.21.21"
                          >
                            {copiedDnsField === 'a-val' ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                            <span>{copiedDnsField === 'a-val' ? 'Copiado' : 'Copiar'}</span>
                          </button>
                        </div>

                        <div className="sm:col-span-2 text-right sm:text-center">
                          <span className="text-[9px] text-neutral-500 block font-sans">TTL</span>
                          <span className="text-neutral-300">3600 / Auto</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Registro Tipo CNAME */}
                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-black text-[10px]">
                            CNAME
                          </span>
                          <span className="text-[11px] font-semibold text-neutral-200">
                            {effectiveCnameHost === 'www'
                              ? 'Subdomínio Padrão (Com www)'
                              : `Subdomínio Personalizado (${effectiveCnameHost})`}
                          </span>
                        </div>
                        <span className="text-[9.5px] font-mono text-amber-300">
                          {effectiveCnameHost}.{effectiveRootDomain}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 font-mono text-[10.5px] bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/90 items-center">
                        <div className="sm:col-span-2">
                          <span className="text-[9px] text-neutral-500 block font-sans">Tipo</span>
                          <span className="font-bold text-emerald-400">CNAME</span>
                        </div>

                        <div className="sm:col-span-4 flex items-center justify-between gap-1 bg-neutral-900/90 px-2 py-1 rounded border border-neutral-800">
                          <div>
                            <span className="text-[8.5px] text-neutral-500 block font-sans">Nome / Host</span>
                            <span className="font-bold text-amber-300">{effectiveCnameHost}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyDnsValue(effectiveCnameHost, 'cname-host', 'Host do CNAME')}
                            className="px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-[9px] text-amber-300 font-sans font-bold flex items-center gap-1 cursor-pointer"
                            title={`Copiar Host ${effectiveCnameHost}`}
                          >
                            {copiedDnsField === 'cname-host' ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                            <span>{copiedDnsField === 'cname-host' ? 'Copiado' : 'Copiar'}</span>
                          </button>
                        </div>

                        <div className="sm:col-span-4 flex items-center justify-between gap-1 bg-neutral-900/90 px-2 py-1 rounded border border-neutral-800">
                          <div className="truncate">
                            <span className="text-[8.5px] text-neutral-500 block font-sans">Valor / Aponta para</span>
                            <span className="font-bold text-emerald-400">{cnameTargetValue}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyDnsValue(cnameTargetValue, 'cname-val', 'Destino do CNAME')}
                            className="px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-[9px] text-amber-300 font-sans font-bold flex items-center gap-1 cursor-pointer shrink-0"
                            title={`Copiar ${cnameTargetValue}`}
                          >
                            {copiedDnsField === 'cname-val' ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                            <span>{copiedDnsField === 'cname-val' ? 'Copiado' : 'Copiar'}</span>
                          </button>
                        </div>

                        <div className="sm:col-span-2 text-right sm:text-center">
                          <span className="text-[9px] text-neutral-500 block font-sans">TTL</span>
                          <span className="text-neutral-300">3600 / Auto</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PASSO A PASSO POR PROVEDOR (REGISTRO.BR, GODADDY, HOSTINGER, CLOUDFLARE) */}
                  <div className="space-y-2.5 pt-2 border-t border-neutral-900">
                    <span className="text-xs font-bold text-amber-400 block">
                      2. Instruções Passo a Passo no Provedor de Hospedagem:
                    </span>

                    {/* Abas dos Provedores */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                      {[
                        { id: 'registrobr' as const, label: '🇧🇷 Registro.br' },
                        { id: 'godaddy' as const, label: '🌐 GoDaddy' },
                        { id: 'hostinger' as const, label: '🚀 Hostinger / cPanel' },
                        { id: 'cloudflare' as const, label: '☁️ Cloudflare' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setDnsProviderTab(tab.id)}
                          className={`py-1.5 px-2 rounded-lg text-[10.5px] font-bold transition cursor-pointer ${
                            dnsProviderTab === tab.id
                              ? 'bg-amber-400 text-neutral-950 shadow'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Conteúdo dinâmico do provedor selecionado */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-[11px] text-neutral-300 space-y-2 leading-relaxed">
                      {dnsProviderTab === 'registrobr' && (
                        <>
                          <div className="font-bold text-amber-300 flex items-center justify-between">
                            <span>Como configurar no Registro.br ({effectiveRootDomain}):</span>
                            <span className="text-[9.5px] font-mono text-neutral-400">Propagação: 15 min a 2h</span>
                          </div>
                          <ol className="list-decimal list-inside space-y-1.5 text-[10.5px] text-neutral-300">
                            <li>
                              Acesse sua conta em <strong className="text-white">registro.br</strong> e clique sobre o domínio <code className="text-amber-300 font-mono">{effectiveRootDomain}</code>.
                            </li>
                            <li>
                              Role até a seção <strong>DNS</strong> e clique em <strong className="text-amber-300">"Configurar Zona DNS"</strong> (se aparecer apenas servidores DNS, clique primeiro em <strong>"Modo Avançado"</strong> e confirme).
                            </li>
                            <li>
                              Clique em <strong className="text-emerald-400">"+ Nova Entrada"</strong>: selecione o tipo <strong className="text-amber-300">A</strong>, deixe o campo Nome <strong>em branco (vazio)</strong> e em <strong>Endereço IPv4</strong> cole <code className="text-emerald-400 font-mono">{aRecordIp}</code>. Clique em Adicionar.
                            </li>
                            <li>
                              Clique novamente em <strong className="text-emerald-400">"+ Nova Entrada"</strong>: selecione o tipo <strong className="text-amber-300">CNAME</strong>, no campo Nome digite <code className="text-amber-300 font-mono">{effectiveCnameHost}</code> e em <strong>Nome do Servidor / Destino</strong> cole <code className="text-emerald-400 font-mono">{cnameTargetValue}</code>.
                            </li>
                            <li>
                              Clique no botão verde <strong className="text-emerald-400">"Salvar Configurações"</strong> no final da página.
                            </li>
                          </ol>
                        </>
                      )}

                      {dnsProviderTab === 'godaddy' && (
                        <>
                          <div className="font-bold text-amber-300 flex items-center justify-between">
                            <span>Como configurar na GoDaddy ({effectiveRootDomain}):</span>
                            <span className="text-[9.5px] font-mono text-neutral-400">Propagação: 10 a 45 min</span>
                          </div>
                          <ol className="list-decimal list-inside space-y-1.5 text-[10.5px] text-neutral-300">
                            <li>
                              Faça login na <strong className="text-white">GoDaddy</strong>, acesse <strong>"Meus Produtos"</strong> → <strong>"Domínios"</strong> e clique em <strong className="text-amber-300">"Gerenciar DNS"</strong> ao lado de <code className="text-amber-300 font-mono">{effectiveRootDomain}</code>.
                            </li>
                            <li>
                              Na lista de <strong>Registros DNS</strong>, localize o registro Tipo <strong className="text-amber-300">A</strong> com Nome <code className="text-amber-300 font-mono">@</code>. Clique em <strong>Editar (ícone de lápis)</strong> e troque o <strong>Valor</strong> para <code className="text-emerald-400 font-mono">{aRecordIp}</code> (TTL: 1 Hora ou 600s).
                            </li>
                            <li>
                              Localize o registro Tipo <strong className="text-amber-300">CNAME</strong> com Nome <code className="text-amber-300 font-mono">{effectiveCnameHost}</code> (ou clique em <strong className="text-emerald-400">"Adicionar Novo Registro"</strong> se não existir).
                            </li>
                            <li>
                              Escolha Tipo <strong className="text-amber-300">CNAME</strong>, em <strong>Nome</strong> digite <code className="text-amber-300 font-mono">{effectiveCnameHost}</code> e em <strong>Valor (Aponta para)</strong> cole <code className="text-emerald-400 font-mono">{cnameTargetValue}</code>.
                            </li>
                            <li>
                              Clique em <strong className="text-emerald-400">"Salvar"</strong>. <em>Dica:</em> Remova qualquer outro registro <code className="text-amber-300">A</code> antigo com Nome <code className="text-amber-300">@</code> que diga "Parked".
                            </li>
                          </ol>
                        </>
                      )}

                      {dnsProviderTab === 'hostinger' && (
                        <>
                          <div className="font-bold text-amber-300 flex items-center justify-between">
                            <span>Como configurar na Hostinger / HostGator / cPanel:</span>
                            <span className="text-[9.5px] font-mono text-neutral-400">Propagação: 15 a 60 min</span>
                          </div>
                          <ol className="list-decimal list-inside space-y-1.5 text-[10.5px] text-neutral-300">
                            <li>
                              Acesse o painel <strong>hPanel / cPanel</strong>, clique em <strong>Domínios</strong> → <strong className="text-amber-300">"Editor de Zona DNS"</strong> do domínio <code className="text-amber-300 font-mono">{effectiveRootDomain}</code>.
                            </li>
                            <li>
                              Em <strong>Gerenciar Registros DNS</strong>, adicione ou edite o registro Tipo <strong className="text-amber-300">A</strong>: Nome <code className="text-amber-300 font-mono">@</code>, Aponta para <code className="text-emerald-400 font-mono">{aRecordIp}</code>, TTL <code className="font-mono">3600</code>.
                            </li>
                            <li>
                              Adicione ou edite o registro Tipo <strong className="text-amber-300">CNAME</strong>: Nome <code className="text-amber-300 font-mono">{effectiveCnameHost}</code>, Destino <code className="text-emerald-400 font-mono">{cnameTargetValue}</code>, TTL <code className="font-mono">3600</code>.
                            </li>
                            <li>
                              Se houver registros <strong>AAAA (IPv6)</strong> antigos apontando a raiz <code className="text-amber-300">@</code> para outra hospedagem, exclua-os para não interferir na emissão do SSL.
                            </li>
                          </ol>
                        </>
                      )}

                      {dnsProviderTab === 'cloudflare' && (
                        <>
                          <div className="font-bold text-amber-300 flex items-center justify-between">
                            <span>Como configurar na Cloudflare ({effectiveRootDomain}):</span>
                            <span className="text-[9.5px] font-mono text-neutral-400">Propagação: 2 a 5 min</span>
                          </div>
                          <ol className="list-decimal list-inside space-y-1.5 text-[10.5px] text-neutral-300">
                            <li>
                              No painel da <strong>Cloudflare</strong>, selecione <code className="text-amber-300 font-mono">{effectiveRootDomain}</code> e acesse <strong>DNS</strong> → <strong>Records</strong>.
                            </li>
                            <li>
                              Clique em <strong className="text-emerald-400">"Add record"</strong>: Type <strong className="text-amber-300">A</strong>, Name <code className="text-amber-300 font-mono">@</code>, IPv4 address <code className="text-emerald-400 font-mono">{aRecordIp}</code> e deixe o <strong>Proxy status</strong> em <strong className="text-neutral-200">DNS Only (Nuvem Cinza)</strong>.
                            </li>
                            <li>
                              Clique em <strong className="text-emerald-400">"Add record"</strong>: Type <strong className="text-amber-300">CNAME</strong>, Name <code className="text-amber-300 font-mono">{effectiveCnameHost}</code>, Target <code className="text-emerald-400 font-mono">{cnameTargetValue}</code>, também com <strong>DNS Only (Nuvem Cinza)</strong> e salve.
                            </li>
                            <li>
                              Em <strong>SSL/TLS → Overview</strong>, mantenha o modo criptográfico em <strong>Full</strong>.
                            </li>
                          </ol>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Resultado do Diagnóstico de Propagação DNS (Consulta Real via API Cloudflare 1.1.1.1 / Google DoH) */}
                  <div
                    className={`p-3.5 rounded-xl border space-y-3 transition ${
                      dnsTesting
                        ? 'bg-amber-500/10 border-amber-500/40'
                        : !dnsCheckStatus
                        ? 'bg-neutral-900/80 border-neutral-800'
                        : dnsCheckStatus.overallStatus === 'verified'
                        ? 'bg-emerald-500/10 border-emerald-500/40'
                        : dnsCheckStatus.overallStatus === 'partial'
                        ? 'bg-amber-500/10 border-amber-500/40'
                        : 'bg-red-500/10 border-red-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-neutral-100 flex items-center gap-1.5">
                            {dnsTesting ? (
                              <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                            ) : dnsCheckStatus?.overallStatus === 'verified' ? (
                              <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            ) : dnsCheckStatus?.overallStatus === 'partial' ? (
                              <AlertTriangle className="w-4 h-4 text-amber-400" />
                            ) : dnsCheckStatus ? (
                              <AlertCircle className="w-4 h-4 text-red-400" />
                            ) : (
                              <Globe className="w-4 h-4 text-amber-400" />
                            )}
                            <span>
                              3. Status de Verificação DNS em Tempo Real ({dnsCheckStatus?.providerSource || 'Cloudflare DNS 1.1.1.1'})
                            </span>
                          </span>
                          {dnsTesting ? (
                            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              CONSULTANDO REGISTROS A & CNAME...
                            </span>
                          ) : dnsCheckStatus?.overallStatus === 'verified' ? (
                            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              ● VERIFICADO (A + CNAME ATIVOS)
                            </span>
                          ) : dnsCheckStatus?.overallStatus === 'partial' ? (
                            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              ● PROPAGAÇÃO PARCIAL
                            </span>
                          ) : dnsCheckStatus ? (
                            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                              ● PENDENTE / NÃO APONTADO
                            </span>
                          ) : null}
                        </div>
                        <p className="text-[10.5px] text-neutral-300 leading-relaxed">
                          {dnsTesting
                            ? 'Consultando servidores autoritativos via Cloudflare DNS-over-HTTPS para validar os registros A e CNAME...'
                            : dnsCheckStatus
                            ? dnsCheckStatus.statusSummary
                            : 'Clique em Verificar Agora para consultar automaticamente os registros A e CNAME na API pública de DNS.'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {dnsCheckStatus && !dnsTesting && (
                          <span className="text-[9.5px] font-mono text-neutral-400">
                            Às {dnsCheckStatus.checkedAt}
                          </span>
                        )}
                        <button
                          type="button"
                          disabled={dnsTesting}
                          onClick={() => verifyDomainDnsRecords()}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3 h-3 ${dnsTesting ? 'animate-spin' : ''}`} />
                          <span>{dnsTesting ? 'Consultando...' : 'Verificar Agora'}</span>
                        </button>
                      </div>
                    </div>

                    {dnsCheckStatus && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[10px] font-mono">
                        {/* Status Registro A */}
                        <div
                          className={`p-2.5 rounded-xl bg-neutral-950/90 border space-y-1.5 ${
                            dnsCheckStatus.aRecordPointingCorrectly
                              ? 'border-emerald-500/40'
                              : dnsCheckStatus.aRecordOk
                              ? 'border-amber-500/40'
                              : 'border-red-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-neutral-200 flex items-center gap-1">
                              {dnsCheckStatus.aRecordPointingCorrectly ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : dnsCheckStatus.aRecordOk ? (
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              ) : (
                                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                              )}
                              <span>REGISTRO A</span>
                            </span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold ${
                                dnsCheckStatus.aRecordPointingCorrectly
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : dnsCheckStatus.aRecordOk
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-red-500/20 text-red-300'
                              }`}
                            >
                              {dnsCheckStatus.aRecordPointingCorrectly
                                ? 'APONTADO'
                                : dnsCheckStatus.aRecordOk
                                ? 'OUTRO IP'
                                : 'PENDENTE'}
                            </span>
                          </div>
                          <div className="text-[9.5px] text-neutral-400 font-sans">
                            Host: <strong className="text-neutral-200 font-mono">{dnsCheckStatus.rootDomainChecked}</strong>
                          </div>
                          <div className="text-[9.5px] text-neutral-300 font-sans leading-snug">
                            {dnsCheckStatus.aRecordStatusText}
                          </div>
                          {dnsCheckStatus.aRecordValues.length > 0 && (
                            <div className="pt-1 border-t border-neutral-800/80 text-[9px] text-emerald-400 truncate">
                              IP(s): {dnsCheckStatus.aRecordValues.join(', ')}
                              {dnsCheckStatus.aRecordTtl ? ` (TTL ${dnsCheckStatus.aRecordTtl}s)` : ''}
                            </div>
                          )}
                        </div>

                        {/* Status Registro CNAME */}
                        <div
                          className={`p-2.5 rounded-xl bg-neutral-950/90 border space-y-1.5 ${
                            dnsCheckStatus.cnameRecordPointingCorrectly
                              ? 'border-emerald-500/40'
                              : dnsCheckStatus.cnameRecordOk
                              ? 'border-amber-500/40'
                              : 'border-red-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-neutral-200 flex items-center gap-1">
                              {dnsCheckStatus.cnameRecordPointingCorrectly ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : dnsCheckStatus.cnameRecordOk ? (
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              ) : (
                                <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                              )}
                              <span>CNAME ({dnsCheckStatus.cnameHostChecked})</span>
                            </span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold ${
                                dnsCheckStatus.cnameRecordPointingCorrectly
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : dnsCheckStatus.cnameRecordOk
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-red-500/20 text-red-300'
                              }`}
                            >
                              {dnsCheckStatus.cnameRecordPointingCorrectly
                                ? 'APONTADO'
                                : dnsCheckStatus.cnameRecordOk
                                ? 'ATIVO'
                                : 'NÃO ENCONTRADO'}
                            </span>
                          </div>
                          <div className="text-[9.5px] text-neutral-400 font-sans truncate">
                            Host: <strong className="text-amber-300 font-mono">{dnsCheckStatus.cnameFullDomainChecked}</strong>
                          </div>
                          <div className="text-[9.5px] text-neutral-300 font-sans leading-snug">
                            {dnsCheckStatus.cnameRecordStatusText}
                          </div>
                          {dnsCheckStatus.cnameRecordValues.length > 0 && (
                            <div className="pt-1 border-t border-neutral-800/80 text-[9px] text-emerald-400 truncate">
                              Alvo: {dnsCheckStatus.cnameRecordValues.join(', ')}
                            </div>
                          )}
                        </div>

                        {/* Status Certificado SSL / HTTPS */}
                        <div
                          className={`p-2.5 rounded-xl bg-neutral-950/90 border space-y-1.5 ${
                            dnsCheckStatus.sslOk ? 'border-emerald-500/40' : 'border-neutral-800'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-neutral-200 flex items-center gap-1">
                              <Lock
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  dnsCheckStatus.sslOk ? 'text-emerald-400' : 'text-neutral-500'
                                }`}
                              />
                              <span>SSL / HTTPS</span>
                            </span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold ${
                                dnsCheckStatus.sslOk
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-neutral-800 text-neutral-400'
                              }`}
                            >
                              {dnsCheckStatus.sslOk ? 'ATIVO (TLS 1.3)' : 'AGUARDANDO DNS'}
                            </span>
                          </div>
                          <div className="text-[9.5px] text-neutral-400 font-sans">
                            Domínio: <strong className="text-neutral-200 font-mono">{dnsCheckStatus.checkedDomain}</strong>
                          </div>
                          <div className="text-[9.5px] text-neutral-300 font-sans leading-snug">
                            {dnsCheckStatus.sslOk
                              ? 'Certificado SSL/HTTPS ativo na borda (Cloudflare / Let’s Encrypt).'
                              : 'O certificado SSL será emitido automaticamente assim que os registros A e CNAME propagarem.'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Opção 3: Pacote ZIP para Hospedagem Própria / Vercel */}
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <FolderArchive className="w-4 h-4 text-emerald-400" />
                      Opção 3: Baixar Pacote ZIP (Vercel / cPanel / Pasta Independente)
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      VERCEL & CPANEL READY
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    Exporte o microsite completo com <code className="text-emerald-300">index.html</code>, <code className="text-emerald-300">vercel.json</code>, <code className="text-emerald-300">manifest.json</code>, <code className="text-emerald-300">.htaccess</code> e <code className="text-emerald-300">nginx.conf</code> prontos para subir em qualquer servidor.
                  </p>
                  <button
                    type="button"
                    onClick={() => downloadMicrositeDirectoryZip(targetSite as SavedMicrosite)}
                    className="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-500/40 hover:border-emerald-400 transition cursor-pointer"
                  >
                    <FolderArchive className="w-4 h-4 text-emerald-400" />
                    <span>Baixar Pacote ZIP Completo '/{targetSite.subdomain || 'meusite'}/'</span>
                  </button>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800 shrink-0">
                <button
                  type="button"
                  disabled={dnsTesting}
                  onClick={() => {
                    if (rawCustomDomain.trim() && !domainValidation.isValid) {
                      showToast(`⚠️ Corrija o formato do domínio personalizado antes de testar o DNS!`);
                      return;
                    }
                    const cleanDomToSave = domainValidation.isValid ? domainValidation.sanitizedDomain : '';
                    if (cleanDomToSave && cleanDomToSave !== rawCustomDomain) {
                      updateTargetCustomDomain(cleanDomToSave);
                    }
                    verifyDomainDnsRecords();
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer border border-amber-500/30 transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${dnsTesting ? 'animate-spin text-amber-400' : 'text-amber-400'}`} />
                  <span>{dnsTesting ? 'Consultando API DNS Cloudflare...' : 'Testar & Validar Apontamento DNS (Cloudflare)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (rawCustomDomain.trim() && !domainValidation.isValid) {
                      showToast(`⚠️ O domínio digitado possui formato inválido. Corrija-o ou limpe o campo para usar o subdomínio gratuito.`);
                      return;
                    }
                    const finalCustomDom = domainValidation.isValid ? domainValidation.sanitizedDomain : '';
                    const updated = savedSites.map(s =>
                      s.id === targetSite.id
                        ? {
                            ...s,
                            subdomain: targetSite.subdomain || s.subdomain,
                            customDomain: finalCustomDom,
                            domainType: finalCustomDom ? ('custom' as const) : ('subdomain' as const),
                            dnsConfigured: Boolean(finalCustomDom) || s.dnsConfigured,
                            sslActive: true,
                            isLandingModel: true,
                            status: 'active' as const,
                            data: JSON.parse(JSON.stringify(data)),
                          }
                        : s
                    );
                    setSavedSites(updated);
                    executeAndLog(() => {
                      localStorage.setItem('luxebio_saved_sites_v1', JSON.stringify(updated));
                    }, 'savePublishedSite');
                    const targetSiteObj = updated.find(s => s.id === targetSite.id);
                    if (targetSiteObj) {
                      syncSiteToFirestore(targetSiteObj);
                    }
                    showToast(
                      finalCustomDom
                        ? `🚀 Domínio personalizado ${finalCustomDom} vinculado e publicado com sucesso!`
                        : `🚀 Microsite publicado em https://biovip.com.br/${targetSite.subdomain || 'meusite'}!`
                    );
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer transition"
                >
                  <Check className="w-4 h-4" />
                  <span>Salvar Domínio & Publicar</span>
                </button>
              </div>
            </div>
          </div>
  );
};

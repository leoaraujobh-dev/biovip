import React from 'react';
import { BellRing, Upload, Sparkles } from 'lucide-react';
import { INITIAL_DATA } from '../../../constants/initialData';
import { formatWhatsAppPhone } from '../../../utils/formatters';
import { ModuleColorControls } from '../ModuleColorControls';

export interface IdentityTabProps {
  data: typeof INITIAL_DATA;
  setData: React.Dispatch<React.SetStateAction<typeof INITIAL_DATA>>;
  theme: any;
  landingConfig: {
    agencyBrandName: string;
    agencyWhatsapp: string;
    creatorFooterLabel?: string;
    creatorFooterUrl?: string;
    [key: string]: any;
  };
  updateLandingConfig: (key: string, val: any) => void;
  updateProfile: (key: string, val: any) => void;
  updateAnnounce: (key: string, val: any) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => void;
  openCopyOptimizer: (fieldLabel: string, currentText: string, onApply: (newText: string) => void) => void;
  showToast: (msg: string) => void;
}

export function IdentityTab({
  data,
  setData,
  theme,
  landingConfig,
  updateLandingConfig,
  updateProfile,
  updateAnnounce,
  handleFileUpload,
  openCopyOptimizer,
  showToast,
}: IdentityTabProps) {
  return (
    <div className="space-y-5">
      {/* Barra de Aviso */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">Barra de Alerta / Escassez (Topo)</span>
          </div>
          <input
            type="checkbox"
            checked={data.announcement.enabled}
            onChange={(e) => updateAnnounce('enabled', e.target.checked)}
            className="accent-amber-500"
          />
        </div>

        {data.announcement.enabled && (
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-neutral-400">Badge</label>
                <input
                  type="text"
                  value={data.announcement.badge}
                  onChange={(e) => updateAnnounce('badge', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] text-neutral-400">Mensagem</label>
                <input
                  type="text"
                  value={data.announcement.text}
                  onChange={(e) => updateAnnounce('text', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
                />
              </div>
            </div>
            <ModuleColorControls
              moduleKey="announcement"
              moduleLabel="Barra de Alerta"
              fields={[
                { field: 'titleColor', label: 'Cor do Texto', fallback: '#000000' },
                { field: 'bgColor', label: 'Cor do Fundo', fallback: theme.accent },
              ]}
              data={data}
              setData={setData}
            />
          </div>
        )}
      </div>

      {/* Upload Foto Principal */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
            <Upload className="w-4 h-4 text-amber-400" /> Foto Principal do Cabeçalho (Upload Direto ou URL)
          </label>
          <label className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-medium cursor-pointer flex items-center gap-1.5 transition">
            <Upload className="w-3.5 h-3.5" />
            <span>Carregar Arquivo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, (base64) => updateProfile('avatarUrl', base64))}
            />
          </label>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-black border border-neutral-800 shrink-0">
            {data.profile.avatarUrl && (
              <img
                src={data.profile.avatarUrl}
                alt="Miniatura do Cabeçalho"
                className="w-full h-full object-cover block"
              />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <input
              type="text"
              placeholder="Ou cole aqui a URL direta da foto (https://...)"
              value={data.profile.avatarUrl?.startsWith('data:') ? '' : data.profile.avatarUrl}
              onChange={(e) => updateProfile('avatarUrl', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
            />
            {data.profile.avatarUrl?.startsWith('data:') && (
              <p className="text-[10px] text-emerald-400 font-medium">
                ✓ Imagem carregada do seu dispositivo e exibida no cabeçalho do simulador.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Upload Foto da Seção Sobre Mim */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
            <Upload className="w-4 h-4 text-amber-400" /> Foto da Seção Sobre Mim & Biografia
          </label>
          <label className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-medium cursor-pointer flex items-center gap-1.5 transition">
            <Upload className="w-3.5 h-3.5" />
            <span>Carregar Arquivo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, (base64) => updateProfile('aboutPhotoUrl', base64))}
            />
          </label>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-black border border-neutral-800 shrink-0">
            {data.profile.aboutPhotoUrl ? (
              <img
                src={data.profile.aboutPhotoUrl}
                alt="Miniatura Sobre Mim"
                className="w-full h-full object-cover block"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-600 text-[10px] text-center p-1">
                Sem foto
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <input
              type="text"
              placeholder="Ou cole aqui a URL direta da foto de Sobre (https://...)"
              value={data.profile.aboutPhotoUrl?.startsWith('data:') ? '' : (data.profile.aboutPhotoUrl || '')}
              onChange={(e) => updateProfile('aboutPhotoUrl', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
            />
            {data.profile.aboutPhotoUrl?.startsWith('data:') && (
              <p className="text-[10px] text-emerald-400 font-medium">
                ✓ Imagem carregada do seu dispositivo e exibida na seção Sobre do simulador.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Nome & Título */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300">Nome do Profissional</label>
          <input
            type="text"
            value={data.profile.name}
            onChange={(e) => updateProfile('name', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 uppercase tracking-wider"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300">Cargo / Especialidade</label>
          <input
            type="text"
            value={data.profile.title}
            onChange={(e) => updateProfile('title', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-amber-400 uppercase tracking-widest"
          />
        </div>
      </div>

      {/* Slogan */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-neutral-300">Slogan de Posicionamento</label>
          <button
            type="button"
            onClick={() => openCopyOptimizer('Slogan de Posicionamento', data.profile.tagline, (newText) => updateProfile('tagline', newText))}
            className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 fill-amber-400" />
            <span>Otimizar Copy com IA</span>
          </button>
        </div>
        <textarea
          rows={2}
          value={data.profile.tagline}
          onChange={(e) => updateProfile('tagline', e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 resize-none"
        />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-neutral-300">Frase em Caligrafia / Cursiva</label>
          <button
            type="button"
            onClick={() => openCopyOptimizer('Frase Cursiva', data.profile.cursivePhrase, (newText) => updateProfile('cursivePhrase', newText))}
            className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 fill-amber-400" />
            <span>Otimizar com IA</span>
          </button>
        </div>
        <input
          type="text"
          value={data.profile.cursivePhrase}
          onChange={(e) => updateProfile('cursivePhrase', e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 italic"
        />
      </div>

      <ModuleColorControls
        moduleKey="hero"
        moduleLabel="Cabeçalho / Hero & Bio"
        fields={[
          { field: 'headlineColor', label: 'Cargo / Especialidade', fallback: theme.accent },
          { field: 'titleColor', label: 'Nome Principal', fallback: theme.textMain },
          { field: 'textColor', label: 'Slogan / Bio', fallback: theme.textMuted },
          { field: 'accentColor', label: 'Frase Cursiva', fallback: theme.textMuted },
        ]}
        data={data}
        setData={setData}
      />

      {/* Contatos */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[11px] text-neutral-400">WhatsApp</label>
          <input
            type="text"
            value={data.profile.whatsapp}
            onChange={(e) => updateProfile('whatsapp', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[11px] text-neutral-400">Instagram (@)</label>
          <input
            type="text"
            value={data.profile.instagram}
            onChange={(e) => updateProfile('instagram', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200"
          />
        </div>
      </div>

      {/* Assinatura / Link do Criador no Rodapé do Microsite */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Link do Criador no Rodapé do Microsite
          </span>
          <button
            type="button"
            onClick={() => {
              const targetPhone = formatWhatsAppPhone(landingConfig.agencyWhatsapp || data.profile.whatsapp || '5511999999999');
              const msg = encodeURIComponent(`Olá! Vi um microsite criado por ${landingConfig.agencyBrandName || 'BioVip Digital'} e quero encomendar o meu!`);
              updateLandingConfig('creatorFooterUrl', `https://wa.me/${targetPhone}?text=${msg}`);
              showToast('✅ Link do rodapé configurado para o seu WhatsApp comercial!');
            }}
            className="text-[10px] font-semibold text-amber-300 hover:text-amber-200 underline cursor-pointer"
          >
            Usar meu WhatsApp
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="text-[10px] text-neutral-400 block mb-1">Nome do Criador / Agência</label>
            <input
              type="text"
              value={landingConfig.agencyBrandName}
              onChange={(e) => updateLandingConfig('agencyBrandName', e.target.value)}
              placeholder="BioVip Digital"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100"
            />
          </div>
          <div>
            <label className="text-[10px] text-neutral-400 block mb-1">Chamada do Link (CTA)</label>
            <input
              type="text"
              value={landingConfig.creatorFooterLabel ?? 'Quero um microsite assim'}
              onChange={(e) => updateLandingConfig('creatorFooterLabel', e.target.value)}
              placeholder="Quero um microsite assim"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-100"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-neutral-400 block mb-1">
            URL de Destino ao Clicar no Rodapé (Sua Landing Page ou WhatsApp)
          </label>
          <input
            type="text"
            value={landingConfig.creatorFooterUrl || ''}
            onChange={(e) => updateLandingConfig('creatorFooterUrl', e.target.value)}
            placeholder={typeof window !== 'undefined' ? window.location.origin : 'https://biovip.com.br'}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-amber-300 font-mono"
          />
        </div>
        <ModuleColorControls
          moduleKey="footer"
          moduleLabel="Rodapé do Microsite"
          fields={[
            { field: 'textColor', label: 'Texto Direitos Autorais', fallback: theme.textMuted },
            { field: 'accentColor', label: 'Cor do Link do Criador', fallback: theme.accent },
            { field: 'bgColor', label: 'Fundo do Selo Criador', fallback: '#000000' },
          ]}
          data={data}
          setData={setData}
        />
      </div>
    </div>
  );
}

import React from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import type { SavedMicrosite } from '../../types/microsite';

export interface PaymentSuccessModalProps {
  paymentSuccessSite: SavedMicrosite | null;
  onClose: () => void;
  landingConfig: any;
  profileWhatsapp?: string;
  onViewSite: (slug: string) => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  paymentSuccessSite,
  onClose,
  landingConfig,
  profileWhatsapp = '5511999999999',
  onViewSite,
}) => {
  if (!paymentSuccessSite) return null;

  const cleanSub = paymentSuccessSite.subdomain;
  const agencyWa = (landingConfig?.agencyWhatsapp || profileWhatsapp).replace(/\D/g, '');
  const briefingMsg = encodeURIComponent(
    `Olá! Meu pagamento foi aprovado pelo Asaas para o microsite BioVip: biovip.com.br/${cleanSub}.\n\nMeus dados:\n- Nome: ${paymentSuccessSite.clientName}\n- Telefone: ${paymentSuccessSite.clientPhone}\n- E-mail: ${paymentSuccessSite.clientEmail}\n\nVou enviar agora as fotos e informações para a montagem!`
  );

  return (
    <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#121215] border-2 border-amber-400/70 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl shadow-amber-500/20 text-neutral-100 relative overflow-hidden my-8">
        <div
          className="pointer-events-none absolute -top-20 -right-20 w-52 h-52 rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
          }}
        />

        {/* Header */}
        <div className="text-center relative z-10">
          <div className="w-36 h-22 rounded-2xl bg-[#1c1c1e] border border-amber-400/50 mx-auto mb-3.5 shadow-xl shadow-amber-500/20 flex items-center justify-center overflow-hidden">
            <img src="/assets/aistudio/1793152702953_02858b21.jpg" alt="BioVip" className="w-full h-full object-cover scale-125" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Pagamento Confirmado no Asaas
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mt-3">
            Cliente Cadastrado com Sucesso!
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Microsite reservado para <strong className="text-amber-300">{paymentSuccessSite.clientName}</strong>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-left bg-neutral-950/90 border border-white/[0.08] rounded-2xl p-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">Pago no Asaas (Criação)</span>
              <span className="text-sm font-mono font-bold text-amber-400">
                R$ {(paymentSuccessSite.creationFee || 79.9).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">Recorrência (Plano Escolhido)</span>
              <span className="text-sm font-mono font-bold text-emerald-400">
                R$ {(paymentSuccessSite.monthlyFee || 49.9).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
              </span>
            </div>
          </div>
        </div>

        {/* Under construction alert box */}
        <div className="mt-5 rounded-2xl bg-neutral-950/90 border border-amber-400/40 p-4 sm:p-5 space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚧</span>
            <h3 className="text-sm font-bold text-amber-300">
              Página em Construção Ativada
            </h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            O seu endereço oficial <strong className="text-amber-400 font-mono">biovip.com.br/{cleanSub}</strong> foi criado no sistema!
          </p>
          <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-xs text-amber-100/90 leading-relaxed">
            Ao acessar o link, é exibida a nossa <strong className="text-white">Página em Construção</strong> oficial. A página final ainda não é exibida porque seus dados, fotos e serviços precisam ser enviados para a equipe BioVip finalizar a personalização de luxo.
          </div>
        </div>

        {/* Checklist reminder */}
        <div className="mt-4 rounded-xl bg-white/[0.03] border border-white/[0.08] p-3.5 text-xs text-neutral-300 space-y-2 relative z-10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 block font-bold">
            Envio Obrigatório de Informações:
          </span>
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span>Fotos profissionais de alta qualidade ou fotos de atendimento</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span>Logotipo ou foto de perfil profissional</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span>Lista de serviços com valores e link do WhatsApp</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 space-y-2.5 relative z-10">
          <a
            href={`https://wa.me/${agencyWa}?text=${briefingMsg}`}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
          >
            <span>📲 Enviar Fotos & Informações via WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => onViewSite(cleanSub)}
            className="w-full py-3 px-4 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Ver Link do Site (Página em Construção)</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-center text-xs text-neutral-400 hover:text-white transition cursor-pointer"
          >
            Fechar e Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

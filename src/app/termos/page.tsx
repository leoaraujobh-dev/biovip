import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ShieldCheck, Clock, CheckCircle2, ArrowLeft, MessageCircle } from 'lucide-react'

export const metadata = {
  title: 'Termos de Uso & Garantia VIP | BioVip',
  description: 'Conheça nossos termos de uso, política de garantia incondicional de 7 dias, entrega em até 24h e suporte oficial do BioVip.'
}

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-stone-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para a Página Inicial</span>
          </Link>
        </div>

        {/* Header da Página */}
        <div className="space-y-4 mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DOCUMENTO OFICIAL BIOVIP · ATUALIZADO 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Termos de Uso & Garantia VIP
          </h1>
          <p className="text-sm sm:text-base text-stone-400 leading-relaxed max-w-2xl">
            Transparência absoluta, entrega rápida e garantia incondicional. Ao assinar ou contratar qualquer serviço do BioVip, você conta com proteção total e suporte prioritário.
          </p>
        </div>

        {/* 3 Pilares em Destaque */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-2xl border border-white/10 bg-stone-900/40 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold">
              7D
            </div>
            <h3 className="text-sm font-bold text-white">Garantia Incondicional</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              7 dias de teste completo garantidos pelo Código de Defesa do Consumidor (Art. 49). Se não amar, 100% de reembolso sem perguntas.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-stone-900/40 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Entrega em até 24 Horas</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Nos planos com Personalização Feita por Especialista (Pro e VIP Concierge), sua primeira versão fica no ar em no máximo 24h úteis.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-stone-900/40 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <MessageCircle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Suporte Direto WhatsApp</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Atendimento humano via WhatsApp oficial (31 99139-0202) para alterações, dúvidas técnicas e integrações de domínio.
            </p>
          </div>
        </div>

        {/* Conteúdo dos Termos */}
        <div className="space-y-8 text-xs sm:text-sm text-stone-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              1. Objeto e Serviços Oferecidos
            </h2>
            <p>
              O BioVip é uma plataforma SaaS e estúdio de design digital especializado no desenvolvimento, hospedagem de altíssima velocidade e manutenção de BioSites de alta conversão para profissionais liberais, consultórios, barbearias, clínicas, advogados e marcas de excelência.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              2. Planos, Prazos de Entrega e Suporte
            </h2>
            <p>
              Os planos disponíveis (Starter, Profissional Pro e Agência VIP Concierge) conferem direito de uso da plataforma, hospedagem global com certificado SSL (HTTPS) incluso, editor visual 3 colunas e suporte técnico contínuo.
            </p>
            <p>
              Para clientes dos planos com personalização assistida, o prazo de entrega da versão inicial é de 24 horas úteis após o envio dos dados básicos (Instagram, WhatsApp e fotos de portfólio).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              3. Garantia Incondicional de Reembolso
            </h2>
            <p>
              Conforme o Artigo 49 do Código de Defesa do Consumidor (Lei 8.078/90), o contratante tem até 7 (sete) dias corridos após a contratação para solicitar o cancelamento e estorno total de qualquer quantia paga, bastando acionar o suporte pelo WhatsApp oficial <strong>(31) 99139-0202</strong> ou e-mail de contato.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              4. Propriedade Intelectual e Dados do Cliente
            </h2>
            <p>
              O cliente mantém integralmente todos os direitos autorais, marcas, logotipos e fotos fornecidos. A plataforma BioVip mantém os direitos sobre o código-fonte, arquitetura de software, componentes e designs originais disponibilizados.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              5. Contato & Suporte Oficial
            </h2>
            <p>
              Em caso de dúvidas, solicitações de personalização ou suporte técnico:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-400">
              <li>WhatsApp Oficial: <strong>(31) 99139-0202</strong></li>
              <li>Site Oficial: <strong>https://biovip.com.br</strong></li>
              <li>Horário de Atendimento: Segunda a Sábado, das 08h às 20h (Horário de Brasília)</li>
            </ul>
          </section>
        </div>

        {/* CTA Final */}
        <div className="mt-12 p-6 rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-400/10 to-amber-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">Deseja falar diretamente com nosso especialista?</h3>
            <p className="text-xs text-stone-400">Tire suas dúvidas ou solicite a montagem do seu BioSite agora mesmo.</p>
          </div>
          <a
            href="https://wa.me/5531991390202?text=Ol%C3%A1!%20Li%20os%20termos%20do%20BioVip%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs hover:brightness-110 transition shadow-lg shrink-0"
          >
            Chamar no WhatsApp VIP
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}

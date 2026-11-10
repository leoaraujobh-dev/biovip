import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Política de Privacidade — BioVip',
  description: 'Política de privacidade da BioVip. Saiba como coletamos, usamos e protegemos seus dados pessoais.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16 lg:pt-20 pb-20">
        <section className="py-12 lg:py-16 bg-white">
          <div className="container-main max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-dark-500 hover:text-primary-600 text-sm font-medium mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              Voltar ao site
            </Link>

            <h1 className="section-title mb-4">Política de Privacidade</h1>
            <p className="text-dark-500 mb-8">Última atualização: 8 de novembro de 2026</p>

            <div className="prose prose-dark max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">1. Introdução</h2>
                <p className="text-dark-600 leading-relaxed">
                  A BioVip ("nós", "nosso", "nossa") valoriza sua privacidade. Esta política explica como coletamos, usamos, divulgamos e protegemos suas informações quando você usa nosso site e serviços.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">2. Informações que Coletamos</h2>
                <h3 className="text-lg font-medium text-dark-900 mb-2">2.1 Informações que você nos fornece</h3>
                <ul className="list-disc list-inside space-y-2 text-dark-600 ml-4">
                  <li>Dados de cadastro: nome, e-mail, telefone, senha</li>
                  <li>Dados do Bio Site: conteúdo, imagens, links, configurações</li>
                  <li>Dados de pagamento: processados pelo Stripe (não armazenamos dados sensíveis)</li>
                  <li>Comunicações: mensagens enviadas via formulários, WhatsApp, e-mail</li>
                </ul>
                <h3 className="text-lg font-medium text-dark-900 mb-2 mt-4">2.2 Informações coletadas automaticamente</h3>
                <ul className="list-disc list-inside space-y-2 text-dark-600 ml-4">
                  <li>Dados de navegação: IP, navegador, dispositivo, páginas visitadas</li>
                  <li>Cookies e tecnologias similares (ver seção 7)</li>
                  <li>Analytics: Google Analytics 4, Meta Pixel (se habilitado no plano)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">3. Como Usamos suas Informações</h2>
                <ul className="list-disc list-inside space-y-2 text-dark-600 ml-4">
                  <li>Fornecer, manter e melhorar nossos serviços</li>
                  <li>Processar pagamentos e gerenciar assinaturas</li>
                  <li>Enviar comunicações transacionais (confirmações, faturas, avisos)</li>
                  <li>Enviar comunicações de marketing (com seu consentimento)</li>
                  <li>Analisar uso para melhorar a experiência</li>
                  <li>Cumprir obrigações legais</li>
                  <li>Proteger direitos, propriedade e segurança</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">4. Compartilhamento de Informações</h2>
                <p className="text-dark-600 leading-relaxed mb-3">Não vendemos seus dados. Podemos compartilhar com:</p>
                <ul className="list-disc list-inside space-y-2 text-dark-600 ml-4">
                  <li>Processadores de pagamento (Stripe)</li>
                  <li>Provedores de hospedagem e infraestrutura (Vercel, AWS)</li>
                  <li>Ferramentas de analytics e marketing (Google, Meta) — apenas se você habilitar</li>
                  <li>Autoridades legais quando exigido por lei</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">5. Seus Direitos (LGPD)</h2>
                <p className="text-dark-600 leading-relaxed mb-3">Você tem direito a:</p>
                <ul className="list-disc list-inside space-y-2 text-dark-600 ml-4">
                  <li>Confirmação da existência de tratamento</li>
                  <li>Acesso aos dados</li>
                  <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                  <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                  <li>Portabilidade dos dados a outro fornecedor</li>
                  <li>Eliminação dos dados tratados com consentimento</li>
                  <li>Informação sobre compartilhamento</li>
                  <li>Revogação do consentimento</li>
                </ul>
                <p className="text-dark-600 leading-relaxed mt-3">
                  Para exercer seus direitos, entre em contato: <a href="mailto:privacidade@biovip.com.br" className="text-primary-600 hover:underline">privacidade@biovip.com.br</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">6. Retenção de Dados</h2>
                <p className="text-dark-600 leading-relaxed">
                  Mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para cumprir obrigações legais. Após cancelamento, dados são mantidos por 90 dias para possível reativação, depois eliminados ou anonimizados.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">7. Cookies</h2>
                <p className="text-dark-600 leading-relaxed mb-3">Usamos cookies para:</p>
                <ul className="list-disc list-inside space-y-2 text-dark-600 ml-4">
                  <li>Essenciais: autenticação, segurança, preferências</li>
                  <li>Analytics: Google Analytics (anonimizado)</li>
                  <li>Marketing: Meta Pixel, TikTok Pixel (apenas se você configurar no seu Bio Site)</li>
                </ul>
                <p className="text-dark-600 leading-relaxed mt-3">
                  Você pode gerenciar cookies nas configurações do seu navegador. Desativar cookies essenciais pode impedir o funcionamento do site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">8. Segurança</h2>
                <p className="text-dark-600 leading-relaxed">
                  Implementamos medidas técnicas e organizacionais adequadas: criptografia TLS 1.3, hashing de senhas (bcrypt), autenticação de dois fatores opcional, monitoramento de acessos suspeitos, backups criptografados.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">9. Transferência Internacional</h2>
                <p className="text-dark-600 leading-relaxed">
                  Seus dados podem ser processados em servidores no Brasil e EUA (Vercel, AWS, Stripe). Garantimos proteção adequada via cláusulas contratuais padrão e decisões de adequação.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">10. Alterações nesta Política</h2>
                <p className="text-dark-600 leading-relaxed">
                  Podemos atualizar esta política. Notificaremos por e-mail ou aviso no site sobre mudanças significativas. O uso contínuo após alterações constitui aceitação.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-dark-900 mb-3">11. Contato</h2>
                <p className="text-dark-600 leading-relaxed">
                  Dúvidas sobre esta política ou seus dados:<br />
                  <strong>BioVip Brasil</strong><br />
                  E-mail: <a href="mailto:privacidade@biovip.com.br" className="text-primary-600 hover:underline">privacidade@biovip.com.br</a><br />
                  WhatsApp: <a href="https://wa.me/5531991390202" className="text-primary-600 hover:underline">(31) 99139-0202</a><br />
                  Encarregado de Dados (DPO): <a href="mailto:dpo@biovip.com.br" className="text-primary-600 hover:underline">dpo@biovip.com.br</a>
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
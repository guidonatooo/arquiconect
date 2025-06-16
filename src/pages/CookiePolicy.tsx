
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary text-center">
              Política de Cookies
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">1. O que são Cookies</h2>
              <p className="mb-6 text-gray-700">
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou celular) quando você visita um site. Eles permitem que o site reconheça seu dispositivo e armazene algumas informações sobre suas preferências ou ações passadas.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">2. Como Utilizamos Cookies</h2>
              <p className="mb-4 text-gray-700">O ArquiConnect utiliza cookies para:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Manter você conectado à sua conta durante a sessão</li>
                <li>Lembrar suas preferências e configurações</li>
                <li>Analisar como nosso site é usado para melhorar a experiência</li>
                <li>Personalizar conteúdo e recomendações</li>
                <li>Fornecer recursos de segurança e prevenção a fraudes</li>
                <li>Exibir anúncios relevantes (quando aplicável)</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">3. Tipos de Cookies que Utilizamos</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-primary">3.1 Cookies Essenciais</h3>
              <p className="mb-4 text-gray-700">
                Estes cookies são necessários para o funcionamento básico do site e não podem ser desabilitados:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Autenticação:</strong> mantêm você logado durante a sessão</li>
                <li><strong>Segurança:</strong> protegem contra ataques maliciosos</li>
                <li><strong>Funcionalidade:</strong> lembram configurações essenciais</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-primary">3.2 Cookies de Performance</h3>
              <p className="mb-4 text-gray-700">
                Coletam informações sobre como o site é usado para melhorar a performance:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Google Analytics:</strong> analisa tráfego e comportamento dos usuários</li>
                <li><strong>Hotjar:</strong> mapas de calor e gravações de sessão (anonimizadas)</li>
                <li><strong>Métricas internas:</strong> monitoramento de performance do sistema</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-primary">3.3 Cookies de Funcionalidade</h3>
              <p className="mb-4 text-gray-700">
                Melhoram a experiência do usuário lembrando escolhas e preferências:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Preferências de idioma:</strong> lembram idioma escolhido</li>
                <li><strong>Layout:</strong> mantêm configurações de exibição</li>
                <li><strong>Filtros:</strong> salvam filtros aplicados em pesquisas</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-primary">3.4 Cookies de Marketing</h3>
              <p className="mb-4 text-gray-700">
                Utilizados para fornecer anúncios mais relevantes (com seu consentimento):
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Google Ads:</strong> personalização de anúncios</li>
                <li><strong>Facebook Pixel:</strong> remarketing em redes sociais</li>
                <li><strong>LinkedIn Insight:</strong> anúncios profissionais direcionados</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">4. Cookies de Terceiros</h2>
              <p className="mb-4 text-gray-700">
                Alguns cookies são definidos por serviços terceirizados que utilizamos:
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Serviço</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Finalidade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                      <td className="border border-gray-300 px-4 py-2">Análise de uso do site</td>
                      <td className="border border-gray-300 px-4 py-2">24 meses</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Stripe</td>
                      <td className="border border-gray-300 px-4 py-2">Processamento de pagamentos</td>
                      <td className="border border-gray-300 px-4 py-2">Sessão</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Intercom</td>
                      <td className="border border-gray-300 px-4 py-2">Chat de suporte</td>
                      <td className="border border-gray-300 px-4 py-2">12 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">5. Gerenciamento de Cookies</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-primary">5.1 Configurações do Navegador</h3>
              <p className="mb-4 text-gray-700">
                Você pode controlar cookies através das configurações do seu navegador:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Chrome:</strong> Configurações > Privacidade e segurança > Cookies</li>
                <li><strong>Firefox:</strong> Configurações > Privacidade e segurança</li>
                <li><strong>Safari:</strong> Preferências > Privacidade</li>
                <li><strong>Edge:</strong> Configurações > Cookies e permissões de site</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-primary">5.2 Centro de Preferências</h3>
              <p className="mb-6 text-gray-700">
                Oferecemos um centro de preferências onde você pode:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Ativar/desativar categorias específicas de cookies</li>
                <li>Ver detalhes sobre cada tipo de cookie</li>
                <li>Alterar suas preferências a qualquer momento</li>
                <li>Revogar consentimentos previamente dados</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">6. Impacto da Desabilitação</h2>
              <p className="mb-4 text-gray-700">
                Desabilitar cookies pode afetar a funcionalidade do site:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Cookies essenciais:</strong> site pode não funcionar corretamente</li>
                <li><strong>Cookies de performance:</strong> não poderemos melhorar o site baseado no uso</li>
                <li><strong>Cookies de funcionalidade:</strong> preferências não serão lembradas</li>
                <li><strong>Cookies de marketing:</strong> anúncios podem ser menos relevantes</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">7. Armazenamento Local</h2>
              <p className="mb-6 text-gray-700">
                Além de cookies, também utilizamos tecnologias de armazenamento local (localStorage, sessionStorage) para melhorar a performance e experiência do usuário. Estes dados ficam apenas no seu dispositivo e não são transmitidos para nossos servidores.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">8. Atualizações desta Política</h2>
              <p className="mb-6 text-gray-700">
                Esta política de cookies pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou por outros motivos operacionais, legais ou regulatórios. Recomendamos que verifique esta página regularmente.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">9. Contato</h2>
              <p className="mb-6 text-gray-700">
                Se você tiver dúvidas sobre nossa política de cookies:
                <br />Email: privacy@arquiconnect.com.br
                <br />Telefone: (19) 99184-8687
              </p>

              <div className="bg-primary/5 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold mb-4 text-primary">💡 Dica Importante</h3>
                <p className="text-gray-700">
                  Para uma melhor experiência na plataforma ArquiConnect, recomendamos manter os cookies essenciais e de funcionalidade habilitados. Isso garantirá que você tenha acesso a todos os recursos e que suas preferências sejam mantidas.
                </p>
              </div>
              
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;

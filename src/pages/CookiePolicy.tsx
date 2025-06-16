
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-montserrat font-bold mb-8 text-primary">
            Política de Cookies
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Última atualização:</strong> 16 de junho de 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-semibold mb-4 text-primary">
                O que são Cookies?
              </h2>
              <p>
                Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita nosso site. 
                Eles nos ajudam a melhorar sua experiência, lembrar suas preferências e fornecer funcionalidades essenciais.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-semibold mb-4 text-primary">
                Como Utilizamos os Cookies
              </h2>
              
              <h3 className="text-xl font-semibold mb-3">Cookies Essenciais</h3>
              <ul className="mb-4">
                <li>Manter você logado durante sua sessão</li>
                <li>Lembrar suas preferências de idioma</li>
                <li>Garantir a segurança do site</li>
                <li>Permitir navegação adequada</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Cookies de Performance</h3>
              <ul className="mb-4">
                <li>Coletar informações sobre como você usa nosso site</li>
                <li>Ajudar-nos a melhorar a funcionalidade</li>
                <li>Identificar páginas mais populares</li>
                <li>Detectar problemas técnicos</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Cookies de Marketing</h3>
              <ul className="mb-4">
                <li>Personalizar anúncios relevantes</li>
                <li>Medir a eficácia de nossas campanhas</li>
                <li>Limitar o número de vezes que você vê um anúncio</li>
                <li>Compartilhar dados com parceiros publicitários</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-semibold mb-4 text-primary">
                Tipos de Cookies que Utilizamos
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Cookie</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Finalidade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duração</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_session</td>
                      <td className="border border-gray-300 px-4 py-2">Manter login do usuário</td>
                      <td className="border border-gray-300 px-4 py-2">Sessão</td>
                      <td className="border border-gray-300 px-4 py-2">Essencial</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_preferences</td>
                      <td className="border border-gray-300 px-4 py-2">Salvar preferências do usuário</td>
                      <td className="border border-gray-300 px-4 py-2">1 ano</td>
                      <td className="border border-gray-300 px-4 py-2">Funcional</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_analytics</td>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                      <td className="border border-gray-300 px-4 py-2">2 anos</td>
                      <td className="border border-gray-300 px-4 py-2">Performance</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_marketing</td>
                      <td className="border border-gray-300 px-4 py-2">Publicidade personalizada</td>
                      <td className="border border-gray-300 px-4 py-2">30 dias</td>
                      <td className="border border-gray-300 px-4 py-2">Marketing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-semibold mb-4 text-primary">
                Cookies de Terceiros
              </h2>
              <p className="mb-4">
                Utilizamos serviços de terceiros que podem definir cookies em nosso site:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> Para análise de tráfego e comportamento</li>
                <li><strong>Google Ads:</strong> Para publicidade direcionada</li>
                <li><strong>Facebook Pixel:</strong> Para rastreamento de conversões</li>
                <li><strong>Hotjar:</strong> Para análise de experiência do usuário</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-semibold mb-4 text-primary">
                Gerenciamento de Cookies
              </h2>
              <p className="mb-4">
                Você pode controlar e gerenciar cookies de várias maneiras:
              </p>
              
              <h3 className="text-xl font-semibold mb-3">Configurações do Navegador</h3>
              <p className="mb-4">
                A maioria dos navegadores permite que você:
              </p>
              <ul className="mb-4">
                <li>Veja quais cookies estão armazenados</li>
                <li>Delete cookies individualmente ou todos</li>
                <li>Bloqueie cookies de sites específicos</li>
                <li>Bloqueie cookies de terceiros</li>
                <li>Delete todos os cookies ao fechar o navegador</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Configurações por Navegador</h3>
              <ul>
                <li><strong>Chrome:</strong> Configurações {">"} Privacidade e segurança {">"} Cookies</li>
                <li><strong>Firefox:</strong> Preferências {">"} Privacidade e Segurança</li>
                <li><strong>Safari:</strong> Preferências {">"} Privacidade</li>
                <li><strong>Edge:</strong> Configurações {">"} Privacidade e serviços</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-semibold mb-4 text-primary">
                Impacto da Desabilitação de Cookies
              </h2>
              <p className="mb-4">
                Desabilitar cookies pode afetar sua experiência no site:
              </p>
              <ul>
                <li>Você pode precisar fazer login a cada visita</li>
                <li>Algumas funcionalidades podem não funcionar corretamente</li>
                <li>Suas preferências não serão salvas</li>
                <li>O conteúdo pode não ser personalizado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-semibold mb-4 text-primary">
                Atualizações desta Política
              </h2>
              <p>
                Podemos atualizar esta Política de Cookies periodicamente. Quando fizermos alterações, 
                atualizaremos a data na parte superior desta página e notificaremos você através do site 
                ou por email, quando apropriado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-montserrat font-semibold mb-4 text-primary">
                Contato
              </h2>
              <p>
                Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco:
              </p>
              <ul className="mt-4">
                <li><strong>Email:</strong> privacidade@arquiconnect.com.br</li>
                <li><strong>Telefone:</strong> (11) 3000-0000</li>
                <li><strong>Endereço:</strong> Rua da Inovação, 123 - São Paulo, SP</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/termos" 
                className="text-primary hover:text-accent font-medium"
              >
                Termos de Serviço
              </Link>
              <Link 
                to="/privacidade" 
                className="text-primary hover:text-accent font-medium"
              >
                Política de Privacidade
              </Link>
              <Link 
                to="/copyright" 
                className="text-primary hover:text-accent font-medium"
              >
                Copyright
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;

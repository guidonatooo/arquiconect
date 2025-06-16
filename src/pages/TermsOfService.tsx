
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary text-center">
              Termos de Uso
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">1. Aceitação dos Termos</h2>
              <p className="mb-6 text-gray-700">
                Ao acessar e usar a plataforma ArquiConnect, você concorda em estar vinculado a estes Termos de Uso e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">2. Definições</h2>
              <p className="mb-4 text-gray-700">Para os fins destes Termos:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Plataforma:</strong> refere-se ao ArquiConnect, incluindo website, aplicações e serviços relacionados</li>
                <li><strong>Usuário:</strong> qualquer pessoa que acesse ou use a Plataforma</li>
                <li><strong>Arquiteto:</strong> profissional registrado no CAU que utiliza nossos serviços</li>
                <li><strong>Fornecedor:</strong> empresa ou pessoa física que fornece materiais de construção</li>
                <li><strong>Conteúdo:</strong> textos, imagens, documentos e outros materiais compartilhados na Plataforma</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">3. Registro e Conta</h2>
              <p className="mb-4 text-gray-700">
                Para usar determinados recursos da Plataforma, você deve criar uma conta fornecendo informações precisas e completas. Você é responsável por:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Manter a confidencialidade de suas credenciais de login</li>
                <li>Todas as atividades que ocorrem sob sua conta</li>
                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                <li>Fornecer documentação válida que comprove sua qualificação profissional</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">4. Uso Permitido</h2>
              <p className="mb-4 text-gray-700">Você concorda em usar a Plataforma apenas para:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Fins comerciais legítimos relacionados à arquitetura e construção</li>
                <li>Comunicação profissional entre arquitetos e fornecedores</li>
                <li>Compartilhamento de projetos e especificações técnicas</li>
                <li>Atividades que estejam em conformidade com todas as leis aplicáveis</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">5. Condutas Proibidas</h2>
              <p className="mb-4 text-gray-700">É expressamente proibido:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Usar a Plataforma para atividades ilegais ou não autorizadas</li>
                <li>Compartilhar conteúdo ofensivo, difamatório ou inadequado</li>
                <li>Tentar acessar sistemas ou dados não autorizados</li>
                <li>Interferir no funcionamento da Plataforma</li>
                <li>Criar contas falsas ou fornecer informações incorretas</li>
                <li>Fazer engenharia reversa ou copiar nossos serviços</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">6. Propriedade Intelectual</h2>
              <p className="mb-6 text-gray-700">
                O ArquiConnect e todo seu conteúdo, recursos e funcionalidades são de propriedade exclusiva da empresa e são protegidos por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual. Os usuários mantêm os direitos sobre o conteúdo que criam e compartilham na Plataforma.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">7. Privacidade e Proteção de Dados</h2>
              <p className="mb-6 text-gray-700">
                Nossa coleta e uso de informações pessoais está sujeita à nossa Política de Privacidade, que está incorporada a estes Termos por referência. Estamos em conformidade com a Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">8. Pagamentos e Assinaturas</h2>
              <p className="mb-4 text-gray-700">
                Para planos pagos, aplicam-se as seguintes condições:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Pagamentos são processados mensalmente ou anualmente conforme escolhido</li>
                <li>Renovação automática, cancelável a qualquer momento</li>
                <li>Reembolsos conforme nossa política de garantia de 30 dias</li>
                <li>Preços sujeitos a alteração com aviso prévio de 30 dias</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">9. Limitação de Responsabilidade</h2>
              <p className="mb-6 text-gray-700">
                O ArquiConnect não será responsável por danos indiretos, incidentais, especiais ou consequenciais resultantes do uso da Plataforma. Nossa responsabilidade máxima não excederá o valor pago pelos serviços nos 12 meses anteriores ao evento que deu origem à reclamação.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">10. Suspensão e Encerramento</h2>
              <p className="mb-6 text-gray-700">
                Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos. Os usuários podem encerrar suas contas a qualquer momento através das configurações da conta ou entrando em contato conosco.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">11. Modificações dos Termos</h2>
              <p className="mb-6 text-gray-700">
                Podemos modificar estes Termos a qualquer momento. Alterações significativas serão notificadas com pelo menos 30 dias de antecedência. O uso continuado da Plataforma após as alterações constitui aceitação dos novos termos.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">12. Lei Aplicável e Jurisdição</h2>
              <p className="mb-6 text-gray-700">
                Estes Termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida preferencialmente por mediação, ou se necessário, nos tribunais competentes da comarca de Campinas/SP.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">13. Contato</h2>
              <p className="mb-6 text-gray-700">
                Para questões sobre estes Termos, entre em contato conosco através de:
                <br />Email: legal@arquiconnect.com.br
                <br />Telefone: (19) 99184-8687
              </p>
              
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;

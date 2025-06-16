
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary text-center">
              Política de Privacidade
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">1. Introdução</h2>
              <p className="mb-6 text-gray-700">
                A ArquiConnect está comprometida em proteger sua privacidade e dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações em conformidade com a Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018 e demais legislações aplicáveis.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">2. Dados Coletados</h2>
              <p className="mb-4 text-gray-700">Coletamos os seguintes tipos de dados:</p>
              
              <h3 className="text-xl font-semibold mb-4 text-primary">2.1 Dados Fornecidos Diretamente</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Nome completo e dados de identificação</li>
                <li>E-mail e número de telefone</li>
                <li>Endereço comercial</li>
                <li>Registro profissional (CAU para arquitetos, CNPJ para fornecedores)</li>
                <li>Informações de pagamento (processadas por terceiros seguros)</li>
                <li>Projetos, especificações e documentos técnicos</li>
                <li>Mensagens e comunicações na plataforma</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-primary">2.2 Dados Coletados Automaticamente</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Endereço IP e localização geográfica</li>
                <li>Informações do dispositivo e navegador</li>
                <li>Dados de uso da plataforma (páginas visitadas, tempo de permanência)</li>
                <li>Cookies e tecnologias similares</li>
                <li>Logs de sistema e segurança</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">3. Finalidades do Tratamento</h2>
              <p className="mb-4 text-gray-700">Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Criar e gerenciar sua conta na plataforma</li>
                <li>Conectar arquitetos e fornecedores de forma eficiente</li>
                <li>Processar pagamentos e gerenciar assinaturas</li>
                <li>Fornecer suporte técnico e atendimento ao cliente</li>
                <li>Enviar comunicações importantes sobre o serviço</li>
                <li>Melhorar nossos serviços através de análises de uso</li>
                <li>Garantir a segurança e prevenir fraudes</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">4. Base Legal</h2>
              <p className="mb-4 text-gray-700">O tratamento de dados é baseado em:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Consentimento:</strong> para marketing e comunicações promocionais</li>
                <li><strong>Execução de contrato:</strong> para prestação dos serviços contratados</li>
                <li><strong>Interesse legítimo:</strong> para segurança, melhorias do serviço e análises</li>
                <li><strong>Cumprimento de obrigação legal:</strong> para atender exigências regulatórias</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">5. Compartilhamento de Dados</h2>
              <p className="mb-4 text-gray-700">Compartilhamos dados limitados apenas quando necessário:</p>
              
              <h3 className="text-xl font-semibold mb-4 text-primary">5.1 Com Outros Usuários</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Informações de perfil profissional (nome, especialidade, portfólio)</li>
                <li>Dados de contato para comunicação comercial</li>
                <li>Projetos e especificações quando compartilhados voluntariamente</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-primary">5.2 Com Prestadores de Serviços</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Processadores de pagamento (sob rigorosos contratos de confidencialidade)</li>
                <li>Provedores de infraestrutura e hospedagem</li>
                <li>Serviços de análise e monitoramento</li>
                <li>Suporte técnico e atendimento</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">6. Segurança dos Dados</h2>
              <p className="mb-4 text-gray-700">Implementamos medidas técnicas e organizacionais robustas:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso baseados em funções</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e planos de recuperação</li>
                <li>Treinamento regular da equipe em segurança de dados</li>
                <li>Auditorias de segurança periódicas</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">7. Retenção de Dados</h2>
              <p className="mb-4 text-gray-700">Mantemos seus dados pelos seguintes períodos:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Dados da conta:</strong> durante a vigência da conta + 5 anos</li>
                <li><strong>Dados de comunicação:</strong> 3 anos após o último contato</li>
                <li><strong>Dados financeiros:</strong> conforme exigências fiscais (5-10 anos)</li>
                <li><strong>Logs de sistema:</strong> 12 meses para segurança e análise</li>
                <li><strong>Dados de marketing:</strong> até a retirada do consentimento</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">8. Seus Direitos</h2>
              <p className="mb-4 text-gray-700">Conforme a LGPD, você tem direito a:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Confirmação:</strong> saber se tratamos seus dados</li>
                <li><strong>Acesso:</strong> obter cópia dos dados que mantemos</li>
                <li><strong>Correção:</strong> corrigir dados incompletos ou incorretos</li>
                <li><strong>Anonimização ou eliminação:</strong> quando desnecessários</li>
                <li><strong>Portabilidade:</strong> transferir dados para outro fornecedor</li>
                <li><strong>Informação:</strong> sobre compartilhamento e finalidades</li>
                <li><strong>Revogação do consentimento:</strong> quando aplicável</li>
                <li><strong>Oposição:</strong> ao tratamento baseado em interesse legítimo</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">9. Cookies e Tecnologias Similares</h2>
              <p className="mb-4 text-gray-700">Utilizamos cookies para:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Manter você conectado à sua conta</li>
                <li>Lembrar suas preferências</li>
                <li>Analisar o uso da plataforma</li>
                <li>Personalizar conteúdo e anúncios</li>
                <li>Garantir segurança contra fraudes</li>
              </ul>
              <p className="mb-6 text-gray-700">
                Você pode gerenciar cookies através das configurações do seu navegador.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">10. Transferência Internacional</h2>
              <p className="mb-6 text-gray-700">
                Alguns de nossos prestadores de serviços podem estar localizados fora do Brasil. Nestes casos, garantimos que existam salvaguardas adequadas para proteger seus dados conforme os padrões brasileiros.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">11. Menores de Idade</h2>
              <p className="mb-6 text-gray-700">
                Nossos serviços não se destinam a menores de 18 anos. Não coletamos conscientemente dados de menores sem consentimento parental adequado.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">12. Alterações na Política</h2>
              <p className="mb-6 text-gray-700">
                Esta política pode ser atualizada periodicamente. Alterações significativas serão comunicadas com pelo menos 30 dias de antecedência através da plataforma ou e-mail.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">13. Contato e Encarregado de Dados</h2>
              <p className="mb-6 text-gray-700">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
                <br /><strong>Encarregado de Dados:</strong> privacy@arquiconnect.com.br
                <br /><strong>Contato Geral:</strong> contato@arquiconnect.com.br
                <br /><strong>Telefone:</strong> (19) 99184-8687
                <br /><strong>Endereço:</strong> [Endereço da sede da empresa]
              </p>
              
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

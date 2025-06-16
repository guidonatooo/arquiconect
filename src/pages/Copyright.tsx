
import Header from '../components/Header';
import Footer from '../components/Footer';

const Copyright = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary text-center">
              Direitos Autorais e Propriedade Intelectual
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">1. Propriedade da Plataforma</h2>
              <p className="mb-6 text-gray-700">
                Todo o conteúdo da plataforma ArquiConnect, incluindo mas não limitado a textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software, é propriedade da ArquiConnect ou de seus fornecedores de conteúdo e está protegido pelas leis brasileiras e internacionais de direitos autorais.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">2. Direitos dos Usuários</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-primary">2.1 Conteúdo Criado por Usuários</h3>
              <p className="mb-4 text-gray-700">
                Os usuários mantêm todos os direitos autorais sobre o conteúdo que criam e compartilham na plataforma, incluindo:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Projetos arquitetônicos e desenhos técnicos</li>
                <li>Especificações e documentação técnica</li>
                <li>Fotografias e imagens de obras</li>
                <li>Textos descritivos e materiais promocionais</li>
                <li>Portfólios e apresentações</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-primary">2.2 Licença Concedida à Plataforma</h3>
              <p className="mb-4 text-gray-700">
                Ao compartilhar conteúdo na plataforma, você concede à ArquiConnect uma licença limitada, não exclusiva e revogável para:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Exibir seu conteúdo na plataforma</li>
                <li>Facilitar a comunicação entre usuários</li>
                <li>Criar backups para segurança dos dados</li>
                <li>Realizar manutenção técnica da plataforma</li>
                <li>Usar em materiais promocionais (com sua autorização expressa)</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">3. Marcas Registradas</h2>
              <p className="mb-4 text-gray-700">
                As seguintes marcas são propriedade da ArquiConnect:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>ArquiConnect® (nome e logotipo)</li>
                <li>Slogans e frases publicitárias relacionadas</li>
                <li>Design visual e identidade da marca</li>
                <li>Nomes de produtos e serviços específicos</li>
              </ul>
              <p className="mb-6 text-gray-700">
                O uso não autorizado dessas marcas é estritamente proibido sem permissão prévia por escrito.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">4. Proteção de Projetos Arquitetônicos</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-primary">4.1 Lei de Direitos Autorais</h3>
              <p className="mb-6 text-gray-700">
                Projetos arquitetônicos são protegidos pela Lei 9.610/98 (Lei de Direitos Autorais) como obras intelectuais. Esta proteção inclui plantas, desenhos técnicos, especificações e a obra construída.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-primary">4.2 Medidas de Proteção</h3>
              <p className="mb-4 text-gray-700">
                Para proteger seus projetos na plataforma:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Adicione marcas d'água em imagens sensíveis</li>
                <li>Compartilhe apenas informações necessárias para orçamentos</li>
                <li>Use nosso sistema de visualização controlada</li>
                <li>Mantenha registro de todas as comunicações</li>
                <li>Utilize contratos de confidencialidade quando apropriado</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">5. Política de Uso Justo</h2>
              <p className="mb-4 text-gray-700">
                O uso de conteúdo protegido por direitos autorais pode ser permitido sob as seguintes condições:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Uso para fins educacionais e de pesquisa</li>
                <li>Citação com atribuição adequada ao autor</li>
                <li>Uso em críticas e análises construtivas</li>
                <li>Transformação substancial que crie nova obra</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">6. Violações de Direitos Autorais</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-primary">6.1 Notificação de Violação</h3>
              <p className="mb-4 text-gray-700">
                Se você acredita que seu trabalho foi copiado de forma que constitua violação de direitos autorais, forneça:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Identificação do trabalho protegido por direitos autorais</li>
                <li>Localização do material infrator na plataforma</li>
                <li>Suas informações de contato</li>
                <li>Declaração de boa-fé sobre a violação</li>
                <li>Declaração de veracidade sob pena de perjúrio</li>
                <li>Assinatura física ou eletrônica</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-primary">6.2 Processo de Remoção</h3>
              <p className="mb-6 text-gray-700">
                Ao receber uma notificação válida, seguiremos este processo:
              </p>
              <ol className="list-decimal pl-6 mb-6 text-gray-700">
                <li>Análise da notificação dentro de 48 horas</li>
                <li>Remoção do conteúdo se a violação for confirmada</li>
                <li>Notificação ao usuário responsável pelo conteúdo</li>
                <li>Oportunidade de contra-notificação</li>
                <li>Possível suspensão da conta em casos reincidentes</li>
              </ol>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">7. Licenças de Software</h2>
              <p className="mb-4 text-gray-700">
                A plataforma utiliza diversos softwares de terceiros sob diferentes licenças:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>React - Licença MIT</li>
                <li>Tailwind CSS - Licença MIT</li>
                <li>Lucide Icons - Licença ISC</li>
                <li>Outras bibliotecas conforme especificado na documentação técnica</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">8. Conteúdo de Terceiros</h2>
              <p className="mb-6 text-gray-700">
                A plataforma pode incluir links ou integrar conteúdo de terceiros. Não reivindicamos propriedade sobre tal conteúdo e respeitamos os direitos autorais dos proprietários originais.
              </p>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">9. Registro e Proteção Legal</h2>
              <p className="mb-4 text-gray-700">
                Recomendamos aos arquitetos:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Registrar projetos significativos na Biblioteca Nacional</li>
                <li>Manter documentação completa do processo criativo</li>
                <li>Usar ART (Anotação de Responsabilidade Técnica) do CAU</li>
                <li>Considerar registro internacional para projetos relevantes</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">10. Responsabilidades dos Usuários</h2>
              <p className="mb-4 text-gray-700">
                Os usuários são responsáveis por:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Verificar se possuem direitos sobre o conteúdo compartilhado</li>
                <li>Obter permissões necessárias de colaboradores</li>
                <li>Respeitar direitos autorais de terceiros</li>
                <li>Reportar violações que observarem na plataforma</li>
                <li>Usar a plataforma de forma ética e profissional</li>
              </ul>

              <h2 className="text-2xl font-montserrat font-bold mb-6 text-primary">11. Contato para Questões de Direitos Autorais</h2>
              <p className="mb-6 text-gray-700">
                Para questões relacionadas a direitos autorais:
                <br /><strong>Email:</strong> copyright@arquiconnect.com.br
                <br /><strong>Telefone:</strong> (19) 99184-8687
                <br /><strong>Endereço:</strong> [Endereço da sede da empresa]
                <br /><strong>Agente de Direitos Autorais:</strong> [Nome do responsável legal]
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
                <h3 className="text-lg font-semibold mb-4 text-yellow-800">⚖️ Aviso Legal</h3>
                <p className="text-yellow-700">
                  Esta política não constitui aconselhamento jurídico. Para questões específicas sobre direitos autorais e propriedade intelectual, consulte um advogado especializado. A ArquiConnect se reserva o direito de alterar esta política conforme necessário para cumprimento da legislação aplicável.
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

export default Copyright;


import Header from '../components/Header';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';

const ForArchitects = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">
              Para Arquitetos
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-700">
              Otimize seu fluxo de trabalho, economize tempo e encontre os melhores fornecedores para seus projetos
            </p>
          </div>
        </section>
        
        {/* Conteúdo básico para ForArchitects */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Economize Tempo em Seus Projetos
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Com a ArquiConnect, você foca no design enquanto encontramos os melhores fornecedores para seus projetos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Publique Projetos</h3>
                <p className="text-gray-600">
                  Cadastre seus projetos com desenhos, especificações técnicas e necessidades de materiais.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Receba Propostas</h3>
                <p className="text-gray-600">
                  Fornecedores qualificados enviam propostas personalizadas para seus projetos específicos.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Compare e Escolha</h3>
                <p className="text-gray-600">
                  Analise diferentes propostas, compare preços e condições, e selecione a melhor opção.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <CallToAction 
          title="Pronto para transformar sua forma de trabalhar?" 
          subtitle="Cadastre-se gratuitamente e comece a conectar seus projetos com os melhores fornecedores."
          buttonText="Cadastrar Gratuitamente"
          buttonLink="/cadastro"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ForArchitects;

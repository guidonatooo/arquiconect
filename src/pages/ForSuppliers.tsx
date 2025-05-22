
import Header from '../components/Header';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';

const ForSuppliers = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">
              Para Fornecedores
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-700">
              Amplie seu alcance, conecte-se com arquitetos e designers e aumente suas vendas
            </p>
          </div>
        </section>
        
        {/* Conteúdo básico para ForSuppliers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Amplie Sua Carteira de Clientes
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A ArquiConnect conecta você diretamente com arquitetos que precisam exatamente dos produtos que você oferece.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Acesso a Projetos</h3>
                <p className="text-gray-600">
                  Acesse projetos compatíveis com seu portfólio de produtos e serviços.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Envie Propostas</h3>
                <p className="text-gray-600">
                  Ofereça seus produtos e serviços diretamente aos arquitetos interessados.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Aumente Vendas</h3>
                <p className="text-gray-600">
                  Estabeleça relacionamentos de longo prazo com profissionais da arquitetura.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <CallToAction 
          title="Pronto para expandir seus negócios?" 
          subtitle="Escolha o plano ideal e comece a receber solicitações de arquitetos hoje mesmo."
          buttonText="Ver Planos"
          buttonLink="/precos"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ForSuppliers;


import Header from '../components/Header';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import { ArrowRightCircle, CheckCircle, HelpCircle, Lightbulb, Send, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HowItWorks = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">Como Funciona o ArquiConnect</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-700">
              Entenda como nossa plataforma conecta arquitetos e fornecedores para transformar projetos em parcerias reais
            </p>
          </div>
        </section>

        {/* Process Flow Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-montserrat font-bold text-center mb-12 text-primary">O Processo Simplificado</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold text-primary">Cadastro de Projetos</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Arquitetos cadastram seus projetos com desenhos, especificações, medidas e detalhes técnicos na plataforma.
                </p>
                <div className="flex items-center text-primary">
                  <ArrowRightCircle size={20} className="mr-2" />
                  <span className="font-medium">Projetos ficam visíveis para fornecedores</span>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold text-primary">Propostas de Fornecimento</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Fornecedores acessam projetos compatíveis com seu perfil e enviam propostas comerciais detalhadas.
                </p>
                <div className="flex items-center text-primary">
                  <ArrowRightCircle size={20} className="mr-2" />
                  <span className="font-medium">Arquitetos recebem ofertas personalizadas</span>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold text-primary">Aprovação e Execução</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Arquitetos avaliam propostas, aprovam as melhores e repassam diretamente ao cliente final.
                </p>
                <div className="flex items-center text-primary">
                  <ArrowRightCircle size={20} className="mr-2" />
                  <span className="font-medium">Parcerias se concretizam</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional content for the HowItWorks page can be added here */}
        
        <CallToAction 
          title="Pronto para otimizar seu fluxo de trabalho?" 
          subtitle="Junte-se a centenas de arquitetos e fornecedores que já estão transformando projetos em parcerias de sucesso."
          buttonText="Cadastre-se Gratuitamente"
          buttonLink="/cadastro"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;

import Header from '../components/Header';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import { Check, HelpCircle, X } from 'lucide-react';
import PricingCard from '@/components/PricingCard';

const Pricing = () => {
  const plans = [
    {
      name: "Básico",
      price: "199",
      period: "mês",
      description: "Ideal para pequenos fornecedores",
      features: [
        { text: "10 propostas por mês", included: true },
        { text: "Dashboard básico", included: true },
        { text: "Perfil verificado", included: true },
        { text: "Suporte por e-mail", included: true },
        { text: "Análises avançadas", included: false },
        { text: "Projetos prioritários", included: false },
        { text: "API de integração", included: false },
      ],
      popular: false,
      buttonText: "Assinar Plano",
      planType: "basic"
    },
    {
      name: "Profissional",
      price: "399",
      period: "mês",
      description: "Para fornecedores em crescimento",
      features: [
        { text: "30 propostas por mês", included: true },
        { text: "Dashboard completo", included: true },
        { text: "Perfil verificado e destacado", included: true },
        { text: "Suporte prioritário", included: true },
        { text: "Análises avançadas", included: true },
        { text: "Projetos prioritários", included: false },
        { text: "API de integração", included: false },
      ],
      popular: true,
      buttonText: "Assinar Plano",
      planType: "professional"
    },
    {
      name: "Premium",
      price: "799",
      period: "mês",
      description: "Para grandes fornecedores",
      features: [
        { text: "Propostas ilimitadas", included: true },
        { text: "Dashboard avançado", included: true },
        { text: "Perfil premium destacado", included: true },
        { text: "Suporte VIP 24h", included: true },
        { text: "Análises avançadas", included: true },
        { text: "Acesso prioritário a projetos", included: true },
        { text: "API de integração", included: true },
      ],
      popular: false,
      buttonText: "Assinar Plano",
      planType: "premium"
    }
  ];

  const faqs = [
    {
      question: "Posso trocar de plano a qualquer momento?",
      answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano quando desejar. Upgrades são aplicados imediatamente, enquanto downgrades são efetivados no próximo ciclo de cobrança."
    },
    {
      question: "O que acontece quando utilizo todas as minhas propostas do mês?",
      answer: "Uma vez que todas as propostas do seu plano mensal forem utilizadas, você precisará aguardar o próximo ciclo ou fazer upgrade para um plano superior para enviar mais propostas."
    },
    {
      question: "Existe algum desconto para pagamento anual?",
      answer: "Sim! Oferecemos 15% de desconto para pagamentos anuais em qualquer um dos nossos planos. Esta opção estará disponível durante o processo de checkout."
    },
    {
      question: "Como funciona a garantia de satisfação?",
      answer: "Oferecemos uma garantia de satisfação de 30 dias. Se você não estiver completamente satisfeito com nossos serviços dentro deste período, entre em contato com nosso suporte para solicitar um reembolso."
    },
    {
      question: "Preciso fornecer dados de cartão de crédito para o teste gratuito?",
      answer: "Sim, solicitamos seus dados de pagamento para registrar o teste gratuito, mas você não será cobrado até o final do período de teste de 14 dias, e poderá cancelar a qualquer momento."
    },
    {
      question: "Existe alguma taxa de cancelamento?",
      answer: "Não, não cobramos nenhuma taxa ou multa por cancelamento. Você pode cancelar sua assinatura a qualquer momento a partir do seu painel de controle."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">
              Planos e Preços Transparentes
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-700">
              Escolha o plano ideal para o seu negócio e comece a conectar-se com os melhores projetos de arquitetura
            </p>
            <div className="inline-flex items-center justify-center bg-white rounded-full p-1 border shadow-sm mb-8">
              <button className="px-4 py-2 rounded-full bg-primary text-white">Mensal</button>
              <button className="px-4 py-2 rounded-full text-gray-600">Anual (15% off)</button>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <PricingCard
                  key={index}
                  title={plan.name}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features.map(f => f.text)}
                  isPopular={plan.popular}
                  buttonText={plan.buttonText}
                  planType={plan.planType}
                />
              ))}
            </div>
            
            <div className="text-center max-w-xl mx-auto mt-12">
              <p className="text-gray-600 mb-6">
                Todos os planos incluem período de teste de 14 dias. Não é necessário compromisso, você pode cancelar quando quiser.
                Precisando de mais? Entre em contato para planos personalizados.
              </p>
              <a href="/contato" className="inline-flex items-center text-primary hover:underline">
                <span>Fale conosco para um plano personalizado</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-montserrat font-bold text-center mb-12 text-primary">Comparativo Detalhado</h2>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 text-left text-gray-600 font-semibold">Recursos</th>
                    <th className="py-4 px-6 text-center text-primary font-semibold">Básico</th>
                    <th className="py-4 px-6 text-center text-primary font-semibold">Profissional</th>
                    <th className="py-4 px-6 text-center text-primary font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 text-gray-800">Propostas mensais</td>
                    <td className="py-4 px-6 text-center">10</td>
                    <td className="py-4 px-6 text-center">30</td>
                    <td className="py-4 px-6 text-center">Ilimitadas</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 text-gray-800">Dashboard</td>
                    <td className="py-4 px-6 text-center">Básico</td>
                    <td className="py-4 px-6 text-center">Completo</td>
                    <td className="py-4 px-6 text-center">Avançado</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 text-gray-800">Verificação de perfil</td>
                    <td className="py-4 px-6 text-center">
                      <Check size={16} className="mx-auto text-accent" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check size={16} className="mx-auto text-accent" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check size={16} className="mx-auto text-accent" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 text-gray-800">Perfil destacado</td>
                    <td className="py-4 px-6 text-center">
                      <X size={16} className="mx-auto text-gray-400" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check size={16} className="mx-auto text-accent" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check size={16} className="mx-auto text-accent" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 text-gray-800">Suporte</td>
                    <td className="py-4 px-6 text-center">E-mail</td>
                    <td className="py-4 px-6 text-center">Prioritário</td>
                    <td className="py-4 px-6 text-center">VIP 24h</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 text-gray-800">Análises avançadas</td>
                    <td className="py-4 px-6 text-center">
                      <X size={16} className="mx-auto text-gray-400" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check size={16} className="mx-auto text-accent" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check size={16} className="mx-auto text-accent" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 text-gray-800">Acesso prioritário</td>
                    <td className="py-4 px-6 text-center">
                      <X size={16} className="mx-auto text-gray-400" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <X size={16} className="mx-auto text-gray-400" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check size={16} className="mx-auto text-accent" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-6 text-gray-800">API de integração</td>
                    <td className="py-4 px-6 text-center">
                      <X size={16} className="mx-auto text-gray-400" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <X size={16} className="mx-auto text-gray-400" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check size={16} className="mx-auto text-accent" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-montserrat font-bold text-center mb-12 text-primary">Perguntas Frequentes</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <HelpCircle size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-2">{faq.question}</h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <CallToAction 
          title="Pronto para começar sua jornada?" 
          subtitle="Escolha o plano perfeito para seu negócio e conecte-se com os melhores projetos arquitetônicos."
          buttonText="Cadastre-se Agora"
          buttonLink="/cadastro"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;

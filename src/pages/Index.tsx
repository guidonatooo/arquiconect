import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import FaqItem from '../components/FaqItem';
import PricingCard from '../components/PricingCard';
import BlogPostCard from '../components/BlogPostCard';
import CallToAction from '../components/CallToAction';

const Index = () => {
  // Exemplo de features
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      title: "Cadastro de Projetos",
      description: "Cadastre seus projetos arquitetônicos com desenhos técnicos, materiais necessários e medidas precisas.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
      ),
      title: "Visualização Seletiva",
      description: "Fornecedores visualizam e selecionam projetos compatíveis com sua área de atuação e capacidade.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Propostas Comerciais",
      description: "Receba propostas detalhadas com custos, prazos de entrega e especificações técnicas dos materiais.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      ),
      title: "Chat com IA",
      description: "Assistente virtual 24h para tirar dúvidas sobre a plataforma e encaminhar questões técnicas.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
        </svg>
      ),
      title: "Sistema de Avaliação",
      description: "Avalie e seja avaliado para construir uma reputação sólida dentro da plataforma.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      ),
      title: "Gestão de Propostas",
      description: "Acompanhe todas as propostas, aprove as melhores e repasse diretamente aos seus clientes.",
    },
  ];

  // Exemplo de testimonials
  const testimonials = [
    {
      content: "A ArquiConnect revolucionou minha forma de trabalhar. Economizo horas procurando fornecedores e consigo apresentar opções de materiais muito mais rapidamente aos meus clientes.",
      author: "Ana Carolina",
      role: "Arquiteta",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      content: "Nossa empresa de mármores e granitos aumentou em 40% o fechamento de novos projetos depois que começamos a utilizar a plataforma. Um investimento que se paga rapidamente.",
      author: "Marcelo Santos",
      role: "Fornecedor de Mármores",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVzaW5lc3MlMjBtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      content: "A inteligência artificial da plataforma me recomendou fornecedores que eu nem conhecia, mas que tinham exatamente o tipo de material que eu estava procurando para um projeto especial.",
      author: "Patrícia Mello",
      role: "Designer de Interiores",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  // Exemplo de FAQ
  const faqs = [
    {
      question: "Como funciona a plataforma para arquitetos?",
      answer: "Os arquitetos podem cadastrar seus projetos com desenhos, medidas e especificações. Fornecedores qualificados visualizam esses projetos e enviam propostas detalhadas. O arquiteto pode então comparar, negociar e escolher as melhores ofertas para seus projetos.",
    },
    {
      question: "Quanto custa usar a ArquiConnect?",
      answer: "Para arquitetos, o uso da plataforma é gratuito. Para fornecedores, oferecemos planos mensais com diferentes níveis de acesso e recursos, começando com um plano gratuito limitado até planos premium com recursos avançados.",
    },
    {
      question: "Como a plataforma garante a qualidade dos fornecedores?",
      answer: "Todos os fornecedores passam por uma verificação inicial. Além disso, contamos com um sistema de avaliação onde arquitetos classificam os fornecedores após cada projeto, criando um histórico de qualidade e confiabilidade.",
    },
    {
      question: "Posso utilizar a plataforma em projetos de qualquer tamanho?",
      answer: "Sim! A ArquiConnect é adequada para projetos de qualquer escala, desde pequenas reformas residenciais até grandes empreendimentos comerciais ou institucionais.",
    },
    {
      question: "Como funciona o suporte de IA da plataforma?",
      answer: "Nossa IA analisa padrões de projetos e fornecedores para fazer recomendações inteligentes, além de oferecer um chatbot disponível 24h para ajudar com dúvidas sobre o uso da plataforma e questões técnicas básicas.",
    },
  ];

  // Exemplo de preços
  const plans = [
    {
      title: "Básico",
      price: "R$199",
      description: "Ideal para fornecedores iniciando na plataforma",
      features: [
        "3 propostas por mês",
        "Perfil básico da empresa",
        "Chat com arquitetos",
        "Notificações de novos projetos",
      ],
      buttonText: "Começar Agora",
      buttonLink: "/cadastro",
      isPopular: false,
    },
    {
      title: "Profissional",
      price: "R$399",
      description: "Perfeito para fornecedores em crescimento",
      features: [
        "15 propostas por mês",
        "Perfil destacado da empresa",
        "Chat com arquitetos",
        "Notificações em tempo real",
        "Acesso a análise de concorrência",
        "Relatórios mensais de desempenho",
      ],
      buttonText: "Assinar Agora",
      buttonLink: "/cadastro",
      isPopular: true,
    },
    {
      title: "Empresa",
      price: "R$799",
      description: "Para fornecedores estabelecidos que buscam expansão",
      features: [
        "Propostas ilimitadas",
        "Perfil premium da empresa",
        "Prioridade nos resultados de busca",
        "Relatórios avançados de análise",
        "Suporte prioritário",
        "Acesso a clientes premium",
        "API para integração com sistemas",
      ],
      buttonText: "Contato Comercial",
      buttonLink: "/contato",
      isPopular: false,
    },
  ];

  // Exemplo de posts do blog
  const blogPosts = [
    {
      title: "5 Tendências de Materiais Sustentáveis para 2023",
      excerpt: "Descubra os materiais que estão revolucionando projetos arquitetônicos com foco em sustentabilidade e eficiência energética.",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      category: "Materiais",
      date: "12 Jun 2023",
      slug: "tendencias-materiais-sustentaveis-2023",
    },
    {
      title: "Como Otimizar a Comunicação com Fornecedores",
      excerpt: "Dicas práticas para melhorar o diálogo entre arquitetos e fornecedores, evitando atrasos e mal-entendidos em seus projetos.",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Dicas",
      date: "5 Jun 2023",
      slug: "otimizar-comunicacao-fornecedores",
    },
    {
      title: "Inteligência Artificial Transformando Arquitetura",
      excerpt: "Como as novas tecnologias de IA estão ajudando arquitetos a projetar espaços mais eficientes e personalizados.",
      image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "Tecnologia",
      date: "28 Mai 2023",
      slug: "ia-transformando-arquitetura",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-white animate-slide-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6">
                  Conectando Arquitetura e Fornecimento com Inteligência.
                </h1>
                <p className="text-xl mb-8 text-white/80">
                  Arquitetos publicam. Fornecedores ofertam. Projetos saem do papel com mais eficiência.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/cadastro" className="btn-accent">
                    Cadastre-se Gratuitamente
                  </Link>
                  <Link to="/como-funciona" className="btn-secondary">
                    Saiba Como Funciona
                  </Link>
                </div>
              </div>
              
              <div className="order-first md:order-last">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full"></div>
                  <div className="relative bg-white p-4 rounded-xl shadow-xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="overflow-hidden rounded-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                          alt="Projeto arquitetônico" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                          alt="Material de construção" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
                          alt="Design de interiores" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                          alt="Construção em andamento" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-4 bg-primary text-white p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Propostas Recebidas</span>
                        <span className="bg-accent text-white px-2 py-1 rounded text-xs">+12 Hoje</span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="bg-white/10 p-2 rounded">
                          <span className="text-xs opacity-70">Projeto Residencial</span>
                          <p className="text-sm font-medium">4 Propostas</p>
                        </div>
                        <div className="bg-white/10 p-2 rounded">
                          <span className="text-xs opacity-70">Projeto Comercial</span>
                          <p className="text-sm font-medium">8 Propostas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-8 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold text-primary">1,200+</p>
                <p className="text-gray-600">Arquitetos Cadastrados</p>
              </div>
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold text-primary">350+</p>
                <p className="text-gray-600">Fornecedores Ativos</p>
              </div>
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold text-primary">4,500+</p>
                <p className="text-gray-600">Projetos Publicados</p>
              </div>
              <div className="p-4">
                <p className="text-3xl md:text-4xl font-bold text-primary">15k+</p>
                <p className="text-gray-600">Propostas Enviadas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="section-title architectural-border">Como Funciona</h2>
            <p className="section-subtitle">
              Uma plataforma intuitiva que simplifica a conexão entre arquitetos e fornecedores de materiais de construção
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16">
              {/* Para arquitetos */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-primary rounded-full text-white mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-4 text-primary">Para Arquitetos</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-6 h-6 bg-accent text-white rounded-full mr-3 shrink-0">1</div>
                    <p className="text-left text-gray-600">Cadastre seu projeto com desenhos, medidas e especificações</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-6 h-6 bg-accent text-white rounded-full mr-3 shrink-0">2</div>
                    <p className="text-left text-gray-600">Receba propostas personalizadas de fornecedores qualificados</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-6 h-6 bg-accent text-white rounded-full mr-3 shrink-0">3</div>
                    <p className="text-left text-gray-600">Compare ofertas, negocie e selecione as melhores opções</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/para-arquitetos" className="text-primary font-medium hover:text-accent flex items-center">
                    Saiba mais
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Representação Gráfica Central */}
              <div className="flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-primary/5 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-24 h-24 bg-primary rounded-md transform rotate-45 flex items-center justify-center">
                        <div className="transform -rotate-45 text-white font-bold">
                          ArquiConnect
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full text-sm">
                    Conexão Inteligente
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-2 rounded-full text-sm">
                    IA e Automatização
                  </div>
                </div>
              </div>
              
              {/* Para fornecedores */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-primary rounded-full text-white mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-montserrat font-semibold mb-4 text-primary">Para Fornecedores</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-6 h-6 bg-accent text-white rounded-full mr-3 shrink-0">1</div>
                    <p className="text-left text-gray-600">Acesse projetos compatíveis com seu portfólio de produtos</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-6 h-6 bg-accent text-white rounded-full mr-3 shrink-0">2</div>
                    <p className="text-left text-gray-600">Envie propostas personalizadas diretamente aos arquitetos</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center justify-center w-6 h-6 bg-accent text-white rounded-full mr-3 shrink-0">3</div>
                    <p className="text-left text-gray-600">Aumente sua carteira de clientes e feche negócios recorrentes</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/para-fornecedores" className="text-primary font-medium hover:text-accent flex items-center">
                    Saiba mais
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="section-title architectural-border">Funcionalidades Essenciais</h2>
            <p className="section-subtitle">
              Nossa plataforma oferece tudo que você precisa para conectar arquitetos e fornecedores de forma eficiente e profissional
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Plataforma Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-primary">
                  Conectamos Profissionais e Materiais de Qualidade
                </h2>
                <p className="text-gray-600 mb-8">
                  A ArquiConnect facilita a descoberta e contratação de fornecedores confiáveis para seus projetos arquitetônicos. Nossa plataforma elimina a busca tradicional e cria um ambiente onde seu projeto encontra os fornecedores ideais.
                </p>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-primary">Economize Tempo e Recursos</h3>
                      <p className="text-gray-600">Elimine horas de pesquisa e negociação direta com múltiplos fornecedores.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-primary">Amplie sua Rede Profissional</h3>
                      <p className="text-gray-600">Conecte-se com uma rede crescente de profissionais qualificados e fornecedores confiáveis.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-primary">Decisões Inteligentes com IA</h3>
                      <p className="text-gray-600">Nossa tecnologia de IA combina projetos e fornecedores com base em histórico, localização e necessidades específicas.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full"></div>
                <div className="relative z-10 bg-white p-4 rounded-xl shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                    alt="Plataforma em ação" 
                    className="rounded-lg"
                  />
                  <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                      <span className="text-sm font-medium">Análise de IA</span>
                    </div>
                    <p className="text-xs text-gray-600">Nossa IA identificou 8 fornecedores compatíveis com este projeto baseado em histórico e localização.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              O Que Nossos Usuários Dizem
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              Veja como a ArquiConnect está transformando a forma como arquitetos e fornecedores trabalham juntos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  content={testimonial.content}
                  author={testimonial.author}
                  role={testimonial.role}
                  image={testimonial.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="section-title architectural-border">Planos e Preços</h2>
            <p className="section-subtitle">
              Escolha o plano ideal para o seu negócio. Arquitetos sempre têm acesso gratuito.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {plans.map((plan, index) => (
                <PricingCard
                  key={index}
                  title={plan.title}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  isPopular={plan.isPopular}
                  buttonText={plan.buttonText}
                  buttonLink={plan.buttonLink}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="section-title architectural-border">Blog</h2>
            <p className="section-subtitle">
              Fique por dentro das últimas tendências, dicas e novidades do mundo da arquitetura e construção.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {blogPosts.map((post, index) => (
                <BlogPostCard
                  key={index}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  category={post.category}
                  date={post.date}
                  slug={post.slug}
                />
              ))}
            </div>
            
            <div className="mt-12">
              <Link 
                to="/blog" 
                className="btn-primary inline-flex items-center"
              >
                Ver Todos os Artigos
                <svg 
                  className="ml-2 w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="section-title architectural-border">Perguntas Frequentes</h2>
              <p className="section-subtitle">
                Encontre respostas para as dúvidas mais comuns sobre a nossa plataforma.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mt-12">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Ainda tem dúvidas? Entre em contato com nossa equipe.</p>
              <Link 
                to="/contato" 
                className="btn-primary"
              >
                Fale Conosco
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Final */}
        <CallToAction 
          title="Está pronto para transformar sua forma de trabalhar com arquitetura e construção?"
          subtitle="Junte-se agora a centenas de arquitetos e fornecedores inteligentes. Cadastre-se gratuitamente!"
          buttonText="Cadastre-se Gratuitamente"
          buttonLink="/cadastro"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

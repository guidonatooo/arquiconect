
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import BlogPostCard from '../components/BlogPostCard';
import { Search } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const blogPosts = [
    {
      title: "Como a tecnologia está revolucionando o setor de arquitetura e construção",
      excerpt: "Descubra como as novas tecnologias estão transformando a forma como arquitetos projetam e fornecedores entregam materiais de construção.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Tecnologia",
      date: "10 Jun 2023",
      slug: "tecnologia-revolucionando-arquitetura"
    },
    {
      title: "5 dicas para arquitetos encontrarem os melhores fornecedores",
      excerpt: "Aprenda estratégias eficientes para identificar e estabelecer parcerias duradouras com fornecedores de qualidade para seus projetos.",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Dicas",
      date: "22 Mai 2023",
      slug: "dicas-arquitetos-melhores-fornecedores"
    },
    {
      title: "Sustentabilidade na construção: tendências para 2024",
      excerpt: "Conheça as principais tendências em materiais e práticas sustentáveis que estão moldando o futuro da arquitetura e construção.",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      category: "Sustentabilidade",
      date: "05 Mai 2023",
      slug: "sustentabilidade-construcao-tendencias"
    },
    {
      title: "Como criar propostas comerciais irresistíveis para projetos arquitetônicos",
      excerpt: "Guia completo para fornecedores criarem propostas que se destacam e aumentam significativamente as chances de aprovação.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Marketing",
      date: "18 Abr 2023",
      slug: "propostas-comerciais-irresistiveis"
    },
    {
      title: "A importância da comunicação clara entre arquitetos e fornecedores",
      excerpt: "Entenda como uma comunicação efetiva pode prevenir problemas e fortalecer parcerias no setor de arquitetura e construção.",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Comunicação",
      date: "03 Abr 2023",
      slug: "comunicacao-clara-arquitetos-fornecedores"
    },
    {
      title: "Novos materiais que estão transformando projetos arquitetônicos",
      excerpt: "Conheça os materiais inovadores que estão permitindo designs mais ousados e sustentáveis em projetos modernos.",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      category: "Inovação",
      date: "25 Mar 2023",
      slug: "novos-materiais-projetos-arquitetonicos"
    },
    {
      title: "Como precificar corretamente serviços de arquitetura",
      excerpt: "Aprenda metodologias e estratégias para definir preços justos e competitivos para seus serviços de arquitetura e design.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Finanças",
      date: "10 Mar 2023",
      slug: "precificacao-servicos-arquitetura"
    },
    {
      title: "Inteligência Artificial na arquitetura: oportunidades e desafios",
      excerpt: "Descubra como a IA está revolucionando processos criativos e técnicos na arquitetura e quais os principais desafios dessa transformação.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Tecnologia",
      date: "28 Fev 2023",
      slug: "ia-arquitetura-oportunidades-desafios"
    },
    {
      title: "Estratégias de marketing digital para escritórios de arquitetura",
      excerpt: "Guia prático para arquitetos ampliarem sua presença digital e atraírem mais clientes através de estratégias de marketing eficientes.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Marketing",
      date: "15 Fev 2023",
      slug: "marketing-digital-escritorios-arquitetura"
    }
  ];

  const categories = [
    "Todos", "Tecnologia", "Dicas", "Sustentabilidade", "Marketing", 
    "Comunicação", "Inovação", "Finanças"
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary">
              Blog ArquiConnect
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-700">
              Tendências, dicas e insights sobre arquitetura, construção e parcerias estratégicas
            </p>
            
            <div className="max-w-xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar artigos..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === "Todos" 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
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
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-4">Nenhum artigo encontrado</h3>
                <p className="text-gray-600 mb-6">
                  Não encontramos artigos correspondentes à sua pesquisa. Tente termos diferentes.
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Ver todos os artigos
                </button>
              </div>
            )}
            
            {filteredPosts.length > 0 && (
              <div className="flex justify-center mt-12">
                <button className="border border-primary text-primary hover:bg-primary hover:text-white transition-colors px-6 py-3 rounded-md font-medium">
                  Carregar mais artigos
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-montserrat font-bold mb-6 text-primary">
                Receba nossos conteúdos exclusivos
              </h2>
              <p className="text-gray-600 mb-8">
                Assine nossa newsletter e receba artigos, dicas e novidades sobre arquitetura, construção e fornecimento diretamente no seu email.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Assinar
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Ao assinar, você concorda com nossa Política de Privacidade. Não enviaremos spam.
              </p>
            </div>
          </div>
        </section>
        
        <CallToAction 
          title="Vamos transformar projetos em parcerias?" 
          subtitle="Cadastre-se gratuitamente e comece a conectar-se com os melhores profissionais do mercado."
          buttonText="Criar Conta Gratuita"
          buttonLink="/cadastro"
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;

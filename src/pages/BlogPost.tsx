
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock data baseado nos posts do blog
  const blogPosts = {
    "tecnologia-revolucionando-arquitetura": {
      title: "Como a tecnologia está revolucionando o setor de arquitetura e construção",
      content: `
        <p>A transformação digital está remodelando praticamente todos os setores da economia, e a arquitetura e construção não são exceção. Novas tecnologias estão emergindo constantemente, oferecendo soluções inovadoras para desafios antigos e criando oportunidades sem precedentes para profissionais do setor.</p>

        <h2>Building Information Modeling (BIM): A Nova Era dos Projetos</h2>
        <p>O BIM representa uma das maiores revoluções na arquitetura moderna. Esta tecnologia permite criar modelos digitais tridimensionais ricos em informações, que vão muito além de simples desenhos técnicos. Com o BIM, arquitetos podem:</p>
        <ul>
          <li>Visualizar projetos em 3D com detalhes precisos</li>
          <li>Detectar conflitos antes da construção</li>
          <li>Colaborar em tempo real com equipes multidisciplinares</li>
          <li>Estimar custos com maior precisão</li>
          <li>Acompanhar todo o ciclo de vida da edificação</li>
        </ul>

        <h2>Realidade Virtual e Aumentada: Experiências Imersivas</h2>
        <p>A VR e AR estão transformando a forma como clientes visualizam projetos arquitetônicos. Através de óculos de realidade virtual, é possível "caminhar" por uma construção antes mesmo dela existir fisicamente. Isso permite:</p>
        <ul>
          <li>Maior engajamento do cliente no processo de design</li>
          <li>Identificação precoce de problemas de layout</li>
          <li>Apresentações mais impactantes e convincentes</li>
          <li>Redução de alterações custosas durante a obra</li>
        </ul>

        <h2>Inteligência Artificial e Machine Learning</h2>
        <p>A IA está sendo aplicada em diversas áreas da arquitetura:</p>
        <ul>
          <li><strong>Design generativo:</strong> algoritmos que criam milhares de opções de design baseadas em parâmetros específicos</li>
          <li><strong>Análise preditiva:</strong> previsão de performance energética e estrutural</li>
          <li><strong>Automação de tarefas:</strong> geração automática de documentação técnica</li>
          <li><strong>Otimização de recursos:</strong> distribuição inteligente de materiais e mão de obra</li>
        </ul>

        <h2>Sustentabilidade e Tecnologia Verde</h2>
        <p>A tecnologia está impulsionando práticas mais sustentáveis na construção:</p>
        <ul>
          <li>Materiais inteligentes que se adaptam ao ambiente</li>
          <li>Sistemas de energia renovável integrados</li>
          <li>Monitoramento em tempo real do consumo energético</li>
          <li>Reciclagem avançada de materiais de construção</li>
        </ul>

        <h2>O Futuro já Chegou</h2>
        <p>Estas tecnologias não são mais ficção científica - elas estão disponíveis hoje e sendo adotadas por escritórios de arquitetura ao redor do mundo. O segredo está em escolher as ferramentas certas para cada projeto e investir na capacitação da equipe.</p>

        <p>Na ArquiConnect, acreditamos que a tecnologia deve facilitar a conexão entre profissionais, não complicá-la. Nossa plataforma foi desenvolvida pensando nas necessidades reais de arquitetos e fornecedores, oferecendo uma interface intuitiva que aproveita o melhor da tecnologia moderna.</p>
      `,
      category: "Tecnologia",
      date: "10 Jun 2023",
      author: "Equipe ArquiConnect",
      image: "/placeholder.svg"
    },
    "dicas-arquitetos-melhores-fornecedores": {
      title: "5 dicas para arquitetos encontrarem os melhores fornecedores",
      content: `
        <p>Encontrar fornecedores confiáveis e de qualidade é um dos maiores desafios enfrentados pelos arquitetos. A escolha certa pode fazer a diferença entre um projeto bem-sucedido e problemas que se estendem por meses. Aqui estão nossas cinco dicas essenciais:</p>

        <h2>1. Faça uma Pesquisa Detalhada</h2>
        <p>Antes de escolher um fornecedor, invista tempo em pesquisa. Considere:</p>
        <ul>
          <li><strong>Reputação no mercado:</strong> consulte outros arquitetos e verifique avaliações online</li>
          <li><strong>Tempo de atuação:</strong> empresas estabelecidas tendem a ser mais confiáveis</li>
          <li><strong>Certificações:</strong> verifique se possuem certificações de qualidade relevantes</li>
          <li><strong>Portfolio:</strong> analise projetos anteriores similares ao seu</li>
        </ul>

        <h2>2. Avalie a Qualidade dos Materiais</h2>
        <p>A qualidade dos materiais é fundamental para o sucesso do projeto:</p>
        <ul>
          <li>Solicite amostras antes de fechar negócio</li>
          <li>Verifique certificações técnicas e de qualidade</li>
          <li>Teste a durabilidade e resistência quando possível</li>
          <li>Compare especificações técnicas detalhadamente</li>
        </ul>

        <h2>3. Considere a Logística e Prazos</h2>
        <p>Problemas logísticos podem atrasar todo o cronograma da obra:</p>
        <ul>
          <li><strong>Localização:</strong> fornecedores próximos reduzem custos e riscos</li>
          <li><strong>Capacidade de entrega:</strong> verifique se conseguem atender seu volume</li>
          <li><strong>Flexibilidade:</strong> capacidade de adaptação a mudanças de cronograma</li>
          <li><strong>Estoque:</strong> disponibilidade consistente dos materiais necessários</li>
        </ul>

        <h2>4. Analise o Suporte Técnico</h2>
        <p>Um bom fornecedor oferece muito mais que apenas produtos:</p>
        <ul>
          <li>Suporte técnico especializado</li>
          <li>Orientação sobre aplicação dos materiais</li>
          <li>Solução rápida de problemas</li>
          <li>Treinamento para equipes de instalação</li>
        </ul>

        <h2>5. Estabeleça Relacionamentos Duradouros</h2>
        <p>Parcerias sólidas trazem benefícios mútuos:</p>
        <ul>
          <li><strong>Comunicação clara:</strong> estabeleça canais diretos de comunicação</li>
          <li><strong>Contratos bem definidos:</strong> deixe responsabilidades claras</li>
          <li><strong>Feedback constante:</strong> mantenha diálogo sobre performance</li>
          <li><strong>Crescimento conjunto:</strong> explore oportunidades de parceria estratégica</li>
        </ul>

        <h2>A ArquiConnect Como Solução</h2>
        <p>Nossa plataforma foi criada justamente para facilitar esse processo de encontrar fornecedores qualificados. Com filtros avançados, avaliações de outros arquitetos e verificação de credenciais, conectamos você aos melhores profissionais do mercado.</p>

        <p>Não perca mais tempo com pesquisas demoradas e fornecedores não confiáveis. Experimente a ArquiConnect e descubra como é fácil encontrar parceiros ideais para seus projetos.</p>
      `,
      category: "Dicas",
      date: "22 Mai 2023",
      author: "Maria Santos",
      image: "/placeholder.svg"
    },
    // Adicione outros posts aqui...
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
            <Link to="/blog" className="text-primary hover:underline">
              Voltar ao Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <article className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-primary hover:text-accent mb-8 font-medium"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar ao Blog
            </Link>

            <header className="mb-12">
              <div className="mb-6">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-primary leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center text-gray-600 text-sm space-x-6">
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {post.date}
                </div>
              </div>
            </header>

            <div className="mb-12">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call to Action */}
            <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-montserrat font-bold mb-4 text-primary">
                Pronto para conectar-se com os melhores fornecedores?
              </h3>
              <p className="text-gray-600 mb-6">
                Junte-se à ArquiConnect e transforme a forma como você encontra parceiros para seus projetos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/cadastro" 
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  Criar Conta Gratuita
                </Link>
                <Link 
                  to="/precos" 
                  className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
                >
                  Ver Planos
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;

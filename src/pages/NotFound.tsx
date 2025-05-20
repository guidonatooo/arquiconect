
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="inline-block relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-xl flex items-center justify-center transform rotate-12">
                <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-white rounded-lg transform -rotate-12"></div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6 text-primary">404</h1>
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold mb-4 text-primary">Página não encontrada</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            A página que você está procurando não existe ou foi removida. Volte para a página inicial para continuar navegando.
          </p>
          
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center"
          >
            <svg 
              className="mr-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar para a Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;

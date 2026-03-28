
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
    setIsMenuOpen(false);
  };

  const getUserTypeLabel = () => {
    return user?.accountType === "architect" ? "Arquiteto(a)" : "Fornecedor(a)";
  };

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center mr-2">
                <div className="w-6 h-6 border-2 border-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-primary font-montserrat font-bold text-xl">ArquiConnect</span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary font-medium">
            Home
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium">
              Dashboard
            </Link>
          )}
          <Link to="/como-funciona" className="text-gray-700 hover:text-primary font-medium">
            Como Funciona
          </Link>
          <Link to="/para-arquitetos" className="text-gray-700 hover:text-primary font-medium">
            Para Arquitetos
          </Link>
          <Link to="/para-fornecedores" className="text-gray-700 hover:text-primary font-medium">
            Para Fornecedores
          </Link>
          <Link to="/precos" className="text-gray-700 hover:text-primary font-medium">
            Planos e Preços
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-primary font-medium">
            Blog
          </Link>
          <Link to="/contato" className="text-gray-700 hover:text-primary font-medium">
            Contato
          </Link>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User size={18} />
                <span className="text-sm">
                  {user.name} • {getUserTypeLabel()}
                </span>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Sair</span>
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-primary font-medium hover:text-primary-dark">
                Login
              </Link>
              <Link to="/cadastro" className="btn-accent">
                Cadastre-se
              </Link>
            </>
          )}
        </div>
        
        <button 
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link 
              to="/como-funciona" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link 
              to="/para-arquitetos" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Para Arquitetos
            </Link>
            <Link 
              to="/para-fornecedores" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Para Fornecedores
            </Link>
            <Link 
              to="/precos" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos e Preços
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/contato" 
              className="text-gray-700 hover:text-primary font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            
            {isAuthenticated && user ? (
              <div className="flex flex-col space-y-3 pt-4 border-t">
                <div className="flex items-center space-x-2 text-gray-700 py-2">
                  <User size={18} />
                  <span className="text-sm">
                    {user.name} • {getUserTypeLabel()}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 w-full"
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-4 border-t">
                <Link 
                  to="/login" 
                  className="text-primary font-medium hover:text-primary-dark py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/cadastro" 
                  className="btn-accent text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadastre-se
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

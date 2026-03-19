
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/como-funciona", label: "Como Funciona" },
  { to: "/para-arquitetos", label: "Para Arquitetos" },
  { to: "/para-fornecedores", label: "Para Fornecedores" },
  { to: "/precos", label: "Planos e Preços" },
  { to: "/blog", label: "Blog" },
  { to: "/contato", label: "Contato" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
    closeMenu();
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const linkClass = (path: string, mobile = false) => {
    const base = mobile
      ? "font-medium py-2 block"
      : "font-medium text-sm";
    const active = isActive(path)
      ? "text-primary font-semibold"
      : "text-gray-700 hover:text-primary";
    return `${base} ${active} transition-colors`;
  };

  const getUserTypeLabel = () =>
    user?.accountType === "architect" ? "Arquiteto(a)" : "Fornecedor(a)";

  const dashboardRoute = user?.accountType === "supplier" ? "/suppliers" : "/projects";

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center mr-2">
            <div className="w-6 h-6 border-2 border-white rounded-sm transform rotate-45" />
          </div>
          <span className="text-primary font-montserrat font-bold text-xl">ArquiConnect</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={linkClass(to)}>
              {label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link to="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center space-x-4 shrink-0">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-gray-700">
                <User size={16} />
                <span className="text-sm">
                  {user.name} · {getUserTypeLabel()}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(dashboardRoute)}
                className="text-primary"
              >
                <LayoutDashboard size={15} className="mr-1.5" />
                Painel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-1.5"
              >
                <LogOut size={15} />
                <span>Sair</span>
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-primary font-medium hover:text-primary-dark text-sm">
                Login
              </Link>
              <Button asChild size="sm">
                <Link to="/cadastro">Cadastre-se</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-gray-700 focus:outline-none p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={linkClass(to, true)}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={linkClass("/dashboard", true)}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}

            <div className="pt-4 mt-2 border-t space-y-3">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-700 py-1">
                    <User size={16} />
                    <span className="text-sm">
                      {user.name} · {getUserTypeLabel()}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => { navigate(dashboardRoute); closeMenu(); }}
                  >
                    <LayoutDashboard size={15} className="mr-2" />
                    Meu Painel
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full justify-start"
                  >
                    <LogOut size={15} className="mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-primary font-medium py-2"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Button asChild className="w-full">
                    <Link to="/cadastro" onClick={closeMenu}>
                      Cadastre-se
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

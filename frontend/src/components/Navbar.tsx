import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Settings, Heart, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import logoSiteImg from '../assets/images/logoSite.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full py-2 px-4 md:px-8 flex justify-between items-center bg-primary">
      {/* Logo + Nome do Site como link */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <img
          src={logoSiteImg}
          alt="Logo"
          className="w-15 h-14"
        />
        <span className="font-bold text-[25px] text-primary-text">Abrigo Cisco</span>
      </Link>

      {/* Botão do menu mobile */}
      <button 
        className="lg:hidden text-primary-text"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navegação para desktop */}
      <div className="hidden lg:flex items-center gap-6">
        <Link to="/" className="text-primary-text text-[20px] hover:opacity-80 transition">Início</Link>
        <Link to="/pets" className="text-primary-text text-[20px] hover:opacity-80 transition">Procurar</Link>
        <Link to="/sobre-nos" className="text-primary-text text-[20px] hover:opacity-80 transition">Sobre Nós</Link>
        <Link to="/contribuir" className="text-primary-text text-[20px] hover:opacity-80 transition">Contribuir</Link>
        {isAuthenticated ? (
          <>
            {user?.isEmployee && (
              <Link 
                to="/funcionario" 
                className="flex items-center gap-2 text-primary-text hover:opacity-80 transition"
              >
                <Settings size={20} />
                Área do Funcionário
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-primary-text hover:opacity-80 transition">
                <User size={20} />
                <span>{user?.name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {!user?.isEmployee && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/perfil" className="flex items-center gap-2">
                        <FileText size={16} />
                        Meu Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/solicitacoes" className="flex items-center gap-2">
                        <Heart size={16} />
                        Minhas Solicitações
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link to="/cadastro" className="text-primary-text text-[20px] hover:opacity-80 transition">Criar Conta</Link>
            <Link to="/login" className="btn-primary text-[20px] py-2 px-4 rounded">Entrar</Link>
          </>
        )}
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-primary shadow-lg border-t z-50 md:hidden">
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" className="text-primary-text hover:opacity-80 transition py-2">Início</Link>
            <Link to="/pets" className="text-primary-text hover:opacity-80 transition py-2">Procurar</Link>
            {isAuthenticated && !user?.isEmployee && (
              <Link to="/solicitacoes" className="text-primary-text hover:opacity-80 transition py-2">Solicitações</Link>
            )}
            <Link to="/sobre-nos" className="text-primary-text hover:opacity-80 transition py-2">Sobre Nós</Link>
            <Link to="/contribuir" className="text-primary-text hover:opacity-80 transition py-2">Contribuir</Link>
            {isAuthenticated ? (
              <>
                {user?.isEmployee && (
                  <Link 
                    to="/funcionario" 
                    className="flex items-center gap-2 text-primary-text hover:opacity-80 transition py-2"
                  >
                    <Settings size={20} />
                    Área do Funcionário
                  </Link>
                )}
                {!user?.isEmployee && (
                  <>
                    <Link to="/perfil" className="flex items-center gap-2 text-primary-text hover:opacity-80 transition py-2">
                      <FileText size={16} />
                      Meu Perfil
                    </Link>
                    <Link to="/solicitacoes" className="flex items-center gap-2 text-primary-text hover:opacity-80 transition py-2">
                      <Heart size={16} />
                      Minhas Solicitações
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-2 py-2 text-primary-text">
                  <User size={20} />
                  <span>{user?.name}</span>
                </div>
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="block text-left text-primary-text hover:opacity-80 transition py-2"
                >
                  Sair
                </Link>
              </>
            ) : (
              <>
                <Link to="/cadastro" className="text-primary-text hover:opacity-80 transition py-2">Criar Conta</Link>
                <Link to="/login" className="btn-primary text-[20px] py-2 px-4 rounded">Entrar</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

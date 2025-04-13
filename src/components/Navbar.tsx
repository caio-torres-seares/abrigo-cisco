
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
    <nav className="w-full py-4 px-4 md:px-8 flex justify-between items-center bg-amber-100 shadow-sm">
      {/* Logo + Nome do Site como link */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <img
          src="/lovable-uploads/1650603a-590c-4d0a-86e0-f7221c057dc5.png"
          alt="Logo"
          className="w-6 h-6"
        />
        <span className="font-medium text-lg text-amber-800">Abrigo Cisco</span>
      </Link>

      {/* Botão do menu mobile */}
      <button 
        className="md:hidden text-amber-800"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navegação para desktop */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-amber-800 hover:text-amber-600 transition-colors">Início</Link>
        <Link to="/pets" className="text-amber-800 hover:text-amber-600 transition-colors">Procurar</Link>
        <Link to="/sobre-nos" className="text-amber-800 hover:text-amber-600 transition-colors">Sobre Nós</Link>
        <Link to="/contribuir" className="text-amber-800 hover:text-amber-600 transition-colors">Contribuir</Link>
        {isAuthenticated ? (
          <>
            {user?.isEmployee && (
              <Link 
                to="/funcionario" 
                className="flex items-center gap-2 text-amber-800 hover:text-amber-600 transition-colors"
              >
                <Settings size={20} />
                Área do Funcionário
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-amber-800 hover:text-amber-600 transition-colors">
                <User size={20} />
                <span>{user?.name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-amber-200">
                <DropdownMenuItem onClick={handleLogout} className="text-amber-800 hover:bg-amber-50 cursor-pointer">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link to="/cadastro" className="text-amber-800 hover:text-amber-600 transition-colors">Criar Conta</Link>
            <Link to="/login" className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-full transition-colors">Entrar</Link>
          </>
        )}
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-amber-100 shadow-lg border-t border-amber-200 z-50 md:hidden">
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" className="text-amber-800 hover:text-amber-600 transition-colors py-2">Início</Link>
            <Link to="/pets" className="text-amber-800 hover:text-amber-600 transition-colors py-2">Procurar</Link>
            <Link to="/sobre-nos" className="text-amber-800 hover:text-amber-600 transition-colors py-2">Sobre Nós</Link>
            <Link to="/contribuir" className="text-amber-800 hover:text-amber-600 transition-colors py-2">Contribuir</Link>
            {isAuthenticated ? (
              <>
                {user?.isEmployee && (
                  <Link 
                    to="/funcionario" 
                    className="flex items-center gap-2 text-amber-800 hover:text-amber-600 transition-colors py-2"
                  >
                    <Settings size={20} />
                    Área do Funcionário
                  </Link>
                )}
                <div className="flex items-center gap-2 py-2 text-amber-800">
                  <User size={20} />
                  <span>{user?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-left text-amber-800 hover:text-amber-600 transition-colors py-2"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/cadastro" className="text-amber-800 hover:text-amber-600 transition-colors py-2">Criar Conta</Link>
                <Link to="/login" className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-full text-center transition-colors">Entrar</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

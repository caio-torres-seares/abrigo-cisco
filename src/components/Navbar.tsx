import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="w-full py-4 px-4 md:px-8 flex justify-between items-center">
      {/* Logo + Nome do Site como link */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <img
          src="/lovable-uploads/1650603a-590c-4d0a-86e0-f7221c057dc5.png"
          alt="Logo"
          className="w-6 h-6"
        />
        <span className="font-medium text-lg">Abrigo Cisco</span>
      </Link>

      {/* Botão do menu mobile */}
      <button 
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navegação para desktop */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="hover:text-accent transition-colors">Início</Link>
        <Link to="/pets" className="hover:text-accent transition-colors">Procurar</Link>
        <Link to="/sobre-nos" className="hover:text-accent transition-colors">Sobre Nós</Link>
        <Link to="/contribuir" className="hover:text-accent transition-colors">Contribuir</Link>
        <Link to="/cadastro" className="hover:text-accent transition-colors">Criar Conta</Link>
        <Link to="/login" className="btn-secondary py-2 px-4">Entrar</Link>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background shadow-lg border-t z-50 md:hidden">
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" className="hover:text-accent transition-colors py-2">Início</Link>
            <Link to="/pets" className="hover:text-accent transition-colors py-2">Procurar</Link>
            <Link to="/sobre-nos" className="hover:text-accent transition-colors py-2">Sobre Nós</Link>
            <Link to="/contribuir" className="hover:text-accent transition-colors py-2">Contribuir</Link>
            <Link to="/cadastro" className="hover:text-accent transition-colors py-2">Criar Conta</Link>
            <Link to="/login" className="btn-secondary text-center">Entrar</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

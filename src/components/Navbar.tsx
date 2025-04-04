
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="w-full py-4 px-4 md:px-8 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/lovable-uploads/1650603a-590c-4d0a-86e0-f7221c057dc5.png" alt="Logo" className="w-6 h-6" />
        <span className="font-medium text-lg">Abrigo Cisco</span>
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="hover:text-accent transition-colors">Início</Link>
        <Link to="/pets" className="hover:text-accent transition-colors">Pets</Link>
        <Link to="/sobre-nos" className="hover:text-accent transition-colors">Sobre Nós</Link>
        <Link to="/contribuir" className="hover:text-accent transition-colors">Contribuir</Link>
        <Link to="/criar-conta" className="hover:text-accent transition-colors">Criar Conta</Link>
        <Link to="/entrar" className="btn-secondary py-2 px-4">Entrar</Link>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background shadow-lg border-t z-50 md:hidden">
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" className="hover:text-accent transition-colors py-2">Início</Link>
            <Link to="/pets" className="hover:text-accent transition-colors py-2">Pets</Link>
            <Link to="/sobre-nos" className="hover:text-accent transition-colors py-2">Sobre Nós</Link>
            <Link to="/contribuir" className="hover:text-accent transition-colors py-2">Contribuir</Link>
            <Link to="/criar-conta" className="hover:text-accent transition-colors py-2">Criar Conta</Link>
            <Link to="/entrar" className="btn-secondary text-center">Entrar</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

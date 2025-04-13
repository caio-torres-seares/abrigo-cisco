
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface EmployeeLayoutProps {
  children: React.ReactNode;
}

const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex bg-amber-50">
      {/* Sidebar */}
      <div className="w-64 bg-amber-100 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <img
            src="/lovable-uploads/1650603a-590c-4d0a-86e0-f7221c057dc5.png"
            alt="Logo"
            className="w-6 h-6"
          />
          <span className="font-medium text-amber-800">Abrigo Cisco</span>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2">
          <Link 
            to="/funcionario/cadastrar-pet" 
            className={`p-3 rounded-md ${location.pathname === '/funcionario/cadastrar-pet' ? 'bg-amber-200' : 'hover:bg-amber-200'}`}
          >
            Cadastrar Novo Pet
          </Link>
          <Link 
            to="/funcionario/solicitacoes" 
            className={`p-3 rounded-md ${location.pathname === '/funcionario/solicitacoes' ? 'bg-amber-200' : 'hover:bg-amber-200'}`}
          >
            Analisar Solicitações de Adoção
          </Link>
          <Link 
            to="/funcionario" 
            className={`p-3 rounded-md ${location.pathname === '/funcionario' ? 'bg-amber-200' : 'hover:bg-amber-200'}`}
          >
            Ver Pets
          </Link>
          <Link 
            to="/funcionario/configuracoes" 
            className={`p-3 rounded-md ${location.pathname === '/funcionario/configuracoes' ? 'bg-amber-200' : 'hover:bg-amber-200'}`}
          >
            Configurações
          </Link>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-amber-200">
          <Link 
            to="/" 
            className="flex items-center gap-2 p-3 text-amber-800 hover:bg-amber-200 rounded-md"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-amber-100 p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <h1 className="text-amber-800 font-medium">Funcionário Joe</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-amber-200 rounded-full">
              <span className="sr-only">Notificações</span>
              🔔
            </button>
            <button className="p-2 hover:bg-amber-200 rounded-full">
              <span className="sr-only">Buscar</span>
              🔍
            </button>
            <div className="h-8 w-8 rounded-full bg-amber-300 flex items-center justify-center">
              👤
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;

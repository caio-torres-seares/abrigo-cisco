
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, FileText, Settings } from 'lucide-react';

const Funcionario = () => {
  return (
    <div className="min-h-screen bg-primary-light">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Área do Funcionário</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card de Cadastro de Pet */}
          <Link 
            to="/funcionario/cadastrar-pet" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary-light p-3 rounded-full">
                <Plus className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Cadastrar Pet</h2>
                <p className="text-gray-600">Adicione um novo pet ao sistema</p>
              </div>
            </div>
          </Link>

          {/* Card de Gerenciar Pets */}
          <Link 
            to="/funcionario/gerenciar-pets" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary-light p-3 rounded-full">
                <Users className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Gerenciar Pets</h2>
                <p className="text-gray-600">Visualize e edite pets cadastrados</p>
              </div>
            </div>
          </Link>

          {/* Card de Relatórios */}
          <Link 
            to="/funcionario/relatorios" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary-light p-3 rounded-full">
                <FileText className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Relatórios</h2>
                <p className="text-gray-600">Acesse relatórios e estatísticas</p>
              </div>
            </div>
          </Link>

          {/* Card de Configurações */}
          <Link 
            to="/funcionario/configuracoes" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary-light p-3 rounded-full">
                <Settings className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Configurações</h2>
                <p className="text-gray-600">Configure as preferências do sistema</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Funcionario;

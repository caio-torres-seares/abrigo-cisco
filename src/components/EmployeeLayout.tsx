import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, PlusCircle, FileText, Eye, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface EmployeeLayoutProps {
  children: React.ReactNode;
}

const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-amber-50">
      {/* Sidebar de desktop */}
      <div className="hidden md:flex w-64 bg-amber-100 flex-col">
        <div className="p-4 flex items-center gap-2 border-b border-amber-200">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <img
              src="/lovable-uploads/1650603a-590c-4d0a-86e0-f7221c057dc5.png"
              alt="Logo"
              className="w-6 h-6"
            />
            <span className="font-medium text-lg text-primary-text">
              Abrigo Cisco
            </span>
          </Link>
        </div>

        <nav className="flex-1 flex flex-col p-4 gap-1">
          <Link
            to="/funcionario/cadastrar-pet"
            className={`flex items-center gap-2 p-3 rounded-lg text-amber-800 ${
              location.pathname === "/funcionario/cadastrar-pet"
                ? "bg-amber-200"
                : "hover:bg-amber-200"
            }`}
          >
            <PlusCircle size={18} />
            <span>Cadastrar Novo Pet</span>
          </Link>
          <Link
            to="/funcionario/solicitacoes"
            className={`flex items-center gap-2 p-3 rounded-lg text-amber-800 ${
              location.pathname === "/funcionario/solicitacoes"
                ? "bg-amber-200"
                : "hover:bg-amber-200"
            }`}
          >
            <FileText size={18} />
            <span>Analisar Solicitações de Adoção</span>
          </Link>
          <Link
            to="/funcionario"
            className={`flex items-center gap-2 p-3 rounded-lg text-amber-800 ${
              location.pathname === "/funcionario"
                ? "bg-amber-200"
                : "hover:bg-amber-200"
            }`}
          >
            <Eye size={18} />
            <span>Ver Pets</span>
          </Link>
          <Link
            to="/funcionario/configuracoes"
            className={`flex items-center gap-2 p-3 rounded-lg text-amber-800 ${
              location.pathname === "/funcionario/configuracoes"
                ? "bg-amber-200"
                : "hover:bg-amber-200"
            }`}
          >
            <Settings size={18} />
            <span>Configurações</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-amber-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-3 rounded-lg text-amber-800 hover:bg-amber-200"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-auto">
        <header className="bg-amber-100 p-4 flex justify-between items-center shadow-sm">
          {/* Sidebar mobile */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-amber-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-800"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-amber-100 p-0">
              <div className="p-4 flex items-center gap-2 border-b border-amber-200">
                <img
                  src="/lovable-uploads/1650603a-590c-4d0a-86e0-f7221c057dc5.png"
                  alt="Logo"
                  className="w-5 h-5"
                />
                <span className="font-medium text-amber-800">Abrigo Cisco</span>
              </div>

              <nav className="flex-1 flex flex-col p-4 gap-1">
                <Link
                  to="/funcionario/cadastrar-pet"
                  className={`flex items-center gap-2 p-3 rounded-lg text-amber-800 ${
                    location.pathname === "/funcionario/cadastrar-pet"
                      ? "bg-amber-200"
                      : "hover:bg-amber-200"
                  }`}
                >
                  <PlusCircle size={18} />
                  <span>Cadastrar Novo Pet</span>
                </Link>
                <Link
                  to="/funcionario/solicitacoes"
                  className={`flex items-center gap-2 p-3 rounded-lg text-amber-800 ${
                    location.pathname === "/funcionario/solicitacoes"
                      ? "bg-amber-200"
                      : "hover:bg-amber-200"
                  }`}
                >
                  <FileText size={18} />
                  <span>Analisar Solicitações de Adoção</span>
                </Link>
                <Link
                  to="/funcionario"
                  className={`flex items-center gap-2 p-3 rounded-lg text-amber-800 ${
                    location.pathname === "/funcionario"
                      ? "bg-amber-200"
                      : "hover:bg-amber-200"
                  }`}
                >
                  <Eye size={18} />
                  <span>Ver Pets</span>
                </Link>
                <Link
                  to="/funcionario/configuracoes"
                  className={`flex items-center gap-2 p-3 rounded-lg text-amber-800 ${
                    location.pathname === "/funcionario/configuracoes"
                      ? "bg-amber-200"
                      : "hover:bg-amber-200"
                  }`}
                >
                  <Settings size={18} />
                  <span>Configurações</span>
                </Link>
              </nav>

              <div className="p-4 border-t border-amber-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full p-3 rounded-lg text-amber-800 hover:bg-amber-200"
                >
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2 md:ml-4">
            <h1 className="text-amber-800 font-medium">
              {user?.name || "Funcionário"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-amber-200 rounded-full">
              <span className="sr-only">Notificações</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-800"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="p-2 hover:bg-amber-200 rounded-full">
              <span className="sr-only">Buscar</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-800"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-amber-300 flex items-center justify-center text-amber-800">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default EmployeeLayout;

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, PlusCircle, FileText, Eye, Settings, Home, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoSite from '../assets/images/logoSite.png';

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

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-primary-light">
      {/* Sidebar de desktop */}
      <div className="hidden md:flex w-64 bg-primary flex-col">
        <div className="p-4 flex items-center gap-2 border-b border-primary-dark">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <img
              src={logoSite}
              alt="Logo"
              className="w-10 h-8"
            />
            <span className="font-medium text-lg text-primary-text">
              Abrigo Cisco
            </span>
          </Link>
        </div>

        <nav className="flex-1 flex flex-col p-4 gap-1">
          <Link
            to="/funcionario/cadastrar-pet"
            className={`flex items-center gap-2 p-3 rounded-lg text-primary-text ${
              location.pathname === "/funcionario/cadastrar-pet"
                ? "bg-primary-dark"
                : "hover:bg-primary-dark"
            }`}
          >
            <PlusCircle size={18} />
            <span>Cadastrar Novo Pet</span>
          </Link>
          <Link
            to="/funcionario/solicitacoes"
            className={`flex items-center gap-2 p-3 rounded-lg text-primary-text ${
              location.pathname === "/funcionario/solicitacoes"
                ? "bg-primary-dark"
                : "hover:bg-primary-dark"
            }`}
          >
            <FileText size={18} />
            <span>Analisar Solicitações de Adoção</span>
          </Link>
          <Link
            to="/funcionario"
            className={`flex items-center gap-2 p-3 rounded-lg text-primary-text ${
              location.pathname === "/funcionario"
                ? "bg-primary-dark"
                : "hover:bg-primary-dark"
            }`}
          >
            <Eye size={18} />
            <span>Ver Pets</span>
          </Link>
          <Link
            to="/funcionario/configuracoes"
            className={`flex items-center gap-2 p-3 rounded-lg text-primary-text ${
              location.pathname === "/funcionario/configuracoes"
                ? "bg-primary-dark"
                : "hover:bg-primary-dark"
            }`}
          >
            <Settings size={18} />
            <span>Configurações</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-primary-dark">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-3 rounded-lg text-primary-text hover:bg-primary-dark"
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-auto">
        <header className="bg-primary p-4 flex justify-between items-center shadow-sm">
          {/* Sidebar mobile */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary-dark"
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
                  className="text-primary-text"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-primary p-0">
              <div className="p-4 flex items-center gap-2 border-b border-primary-dark">
                <img
                  src="/lovable-uploads/1650603a-590c-4d0a-86e0-f7221c057dc5.png"
                  alt="Logo"
                  className="w-5 h-5"
                />
                <span className="font-medium text-primary-text">Abrigo Cisco</span>
              </div>

              <nav className="flex-1 flex flex-col p-4 gap-1">
                <Link
                  to="/funcionario/cadastrar-pet"
                  className={`flex items-center gap-2 p-3 rounded-lg text-primary-text ${
                    location.pathname === "/funcionario/cadastrar-pet"
                      ? "bg-primary-dark"
                      : "hover:bg-primary-dark"
                  }`}
                >
                  <PlusCircle size={18} />
                  <span>Cadastrar Novo Pet</span>
                </Link>
                <Link
                  to="/funcionario/solicitacoes"
                  className={`flex items-center gap-2 p-3 rounded-lg text-primary-text ${
                    location.pathname === "/funcionario/solicitacoes"
                      ? "bg-primary-dark"
                      : "hover:bg-primary-dark"
                  }`}
                >
                  <FileText size={18} />
                  <span>Analisar Solicitações de Adoção</span>
                </Link>
                <Link
                  to="/funcionario"
                  className={`flex items-center gap-2 p-3 rounded-lg text-primary-text ${
                    location.pathname === "/funcionario"
                      ? "bg-primary-dark"
                      : "hover:bg-primary-dark"
                  }`}
                >
                  <Eye size={18} />
                  <span>Ver Pets</span>
                </Link>
                <Link
                  to="/funcionario/configuracoes"
                  className={`flex items-center gap-2 p-3 rounded-lg text-primary-text ${
                    location.pathname === "/funcionario/configuracoes"
                      ? "bg-primary-dark"
                      : "hover:bg-primary-dark"
                  }`}
                >
                  <Settings size={18} />
                  <span>Configurações</span>
                </Link>
              </nav>

              <div className="p-4 border-t border-primary-dark">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full p-3 rounded-lg text-primary-text hover:bg-primary-dark"
                >
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2 md:ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoHome}
              className="hover:bg-primary-dark"
            >
              <Home className="h-5 w-5 text-primary-text" />
            </Button>
            <h1 className="text-primary-text font-medium">
              {user?.name || "Funcionário"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-primary-dark rounded-full">
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
                className="text-primary-text"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="p-2 hover:bg-primary-dark rounded-full">
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
                className="text-primary-text"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full p-0 border-0">
                <div className="h-8 w-8 rounded-full bg-primary-dark flex items-center justify-center text-primary-text text-lg font-medium leading-none">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default EmployeeLayout;

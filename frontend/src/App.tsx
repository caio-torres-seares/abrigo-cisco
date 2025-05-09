import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProfileProvider } from "@/contexts/ProfileContext";

import UserLayout from "@/layouts/UserLayout";

import Index from "@/pages/Index";
import { Login } from "@/pages/Login";
import Cadastro from "@/pages/Cadastro";
import Pets from "@/pages/Pets";
import Contribute from "@/pages/Contribute";
import Funcionario from "@/pages/Funcionario";
import SobreNos from "@/pages/SobreNos";
import ProfileForm from "@/pages/ProfileForm";
import AdoptionRequests from "./pages/employee/AdoptionRequests";
import EditPet from "./pages/employee/EditPet";
import RegisterPet from "./pages/employee/RegisterPet";
import NotFound from "./pages/NotFound";
import Settings from "./pages/employee/Settings";
import EmployeePets from "./pages/employee/EmployeePets";
import PetDetails from "./pages/PetDetails";
import UserRequests from "./pages/UserRequests";

// Componente para rotas protegidas
function ProtectedRoute({
  children,
  requireEmployee = false,
}: {
  children: React.ReactNode;
  requireEmployee?: boolean;
}) {
  const { isAuthenticated, isEmployee, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireEmployee && !isEmployee) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

// Rotas da aplicação
function AppRoutes() {
  return (
    <Routes>
      {/* Rotas com layout de usuário */}
      <Route element={<UserLayout><Outlet /></UserLayout>}>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/contribuir" element={<Contribute />} />
        <Route path="/registro" element={<Cadastro />} />
        <Route path="/perfil" element={<ProfileForm />} />
        <Route path="/solicitacoes" element={<UserRequests />} />
      </Route>

      {/* Rotas de funcionário (sem layout de usuário) */}
      <Route
        path="/funcionario"
        element={
          <ProtectedRoute requireEmployee>
            <EmployeePets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funcionario/editar-pet/:id"
        element={
          <ProtectedRoute requireEmployee>
            <EditPet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funcionario/cadastrar-pet"
        element={
          <ProtectedRoute requireEmployee>
            <RegisterPet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funcionario/solicitacoes"
        element={
          <ProtectedRoute requireEmployee>
            <AdoptionRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funcionario/configuracoes"
        element={
          <ProtectedRoute requireEmployee>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funcionario/pets"
        element={
          <ProtectedRoute requireEmployee>
            <EmployeePets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/funcionarios/adocoes"
        element={
          <ProtectedRoute requireEmployee>
            <AdoptionRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<div className="text-center py-10">Página não encontrada</div>}
      />
    </Routes>
  );
}

// Instância do React Query
const queryClient = new QueryClient();

// App principal
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
              <AppRoutes />
            </Router>
          </TooltipProvider>
        </ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import SobreNos from "./pages/SobreNos";
import ProfileForm from "./pages/ProfileForm";
import UserRequests from "./pages/UserRequests";

// Employee pages
import EmployeePets from "./pages/employee/EmployeePets";
import EditPet from "./pages/employee/EditPet";
import RegisterPet from "./pages/employee/RegisterPet";
import AdoptionRequests from "./pages/employee/AdoptionRequests";
import Settings from "./pages/employee/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProfileProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/pets/:id" element={<PetDetails />} />
              <Route path="/sobre-nos" element={<SobreNos />} />
              
              {/* Protected user routes */}
              <Route path="/perfil" element={
                <ProtectedRoute>
                  <ProfileForm />
                </ProtectedRoute>
              } />
              <Route path="/solicitacoes" element={
                <ProtectedRoute>
                  <UserRequests />
                </ProtectedRoute>
              } />
              
              {/* Protected employee routes */}
              <Route path="/funcionario" element={
                <ProtectedRoute requireEmployee>
                  <EmployeePets />
                </ProtectedRoute>
              } />
              <Route path="/funcionario/editar-pet/:id" element={
                <ProtectedRoute requireEmployee>
                  <EditPet />
                </ProtectedRoute>
              } />
              <Route path="/funcionario/cadastrar-pet" element={
                <ProtectedRoute requireEmployee>
                  <RegisterPet />
                </ProtectedRoute>
              } />
              <Route path="/funcionario/solicitacoes" element={
                <ProtectedRoute requireEmployee>
                  <AdoptionRequests />
                </ProtectedRoute>
              } />
              <Route path="/funcionario/configuracoes" element={
                <ProtectedRoute requireEmployee>
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProfileProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import SobreNos from "./pages/SobreNos";

// Employee pages
import EmployeePets from "./pages/employee/EmployeePets";
import EditPet from "./pages/employee/EditPet";
import RegisterPet from "./pages/employee/RegisterPet";
import AdoptionRequests from "./pages/employee/AdoptionRequests";
import Settings from "./pages/employee/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          
          {/* Employee routes */}
          <Route path="/funcionario" element={<EmployeePets />} />
          <Route path="/funcionario/editar-pet/:id" element={<EditPet />} />
          <Route path="/funcionario/cadastrar-pet" element={<RegisterPet />} />
          <Route path="/funcionario/solicitacoes" element={<AdoptionRequests />} />
          <Route path="/funcionario/configuracoes" element={<Settings />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

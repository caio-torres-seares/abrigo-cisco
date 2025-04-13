import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Pets from '@/pages/Pets';
import About from '@/pages/About';
import Contribute from '@/pages/Contribute';
import Funcionario from '@/pages/Funcionario';

// Componente para rotas protegidas
function ProtectedRoute({ children, requireEmployee = false }: { children: React.ReactNode; requireEmployee?: boolean }) {
  const { isAuthenticated, isEmployee, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireEmployee && !isEmployee) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pets" element={<Pets />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/contribuir" element={<Contribute />} />
      <Route
        path="/funcionario"
        element={
          <ProtectedRoute requireEmployee>
            <Funcionario />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

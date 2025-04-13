import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar a lógica real de autenticação
    // Por enquanto, vamos simular um login
    const isEmployee = email.includes('@abrigocisco.com');
    
    if (isEmployee) {
      navigate('/funcionario');
    } else {
      navigate('/pets');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado esquerdo - Imagem e texto */}
      <div className="bg-secondary/60 w-full md:w-1/2 p-10 flex flex-col justify-center items-center relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2">
          <img src="/lovable-uploads/1650603a-590c-4d0a-86e0-f7221c057dc5.png" alt="Logo" className="w-6 h-6" />
          <span className="font-medium">Abrigo Cisco</span>
        </Link>
        
        <div className="max-w-md mx-auto text-center md:text-left mt-16 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            A Felicidade<br />Começa Aqui
          </h1>
          
          <img 
            src="/lovable-uploads/e39766e2-7f83-4a57-b415-37b0aa632e36.png" 
            alt="Pessoa com animais" 
            className="max-w-xs mx-auto"
          />
        </div>
      </div>
      
      {/* Lado direito - Formulário */}
      <div className="bg-card w-full md:w-1/2 p-10 flex flex-col justify-center items-center relative">
        <Link to="/" className="absolute top-8 left-8 text-muted-foreground hover:text-foreground transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/1650603a-590c-4d0a-86e0-f7221c057dc5.png" 
              alt="Pata" 
              className="w-12 h-12" 
            />
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-8">Fazer Login</h2>
          
          {/* Google Login Button */}
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md p-2 mb-6 hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.8055 10.2238C19.8055 9.47066 19.7414 8.94108 19.6029 8.39188H10.2002V12.0647H15.6889C15.5812 12.9173 15.0055 14.1917 13.7515 15.0444L13.7339 15.1582L16.7082 17.4814L16.9082 17.5005C18.7998 15.7697 19.8055 13.2238 19.8055 10.2238Z" fill="#4285F4"/>
              <path d="M10.2002 19.9999C12.8975 19.9999 15.1539 19.1111 16.9082 17.5005L13.7515 15.0444C12.9105 15.6223 11.7642 16.0222 10.2002 16.0222C7.53456 16.0222 5.27596 14.329 4.50782 11.9999L4.40001 12.0092L1.30309 14.4275L1.26123 14.5314C2.99729 17.7499 6.34599 19.9999 10.2002 19.9999Z" fill="#34A853"/>
              <path d="M4.50785 11.9999C4.30005 11.4507 4.17825 10.8535 4.17825 10.2311C4.17825 9.60862 4.30005 9.01145 4.4975 8.46223L4.49217 8.34076L1.36349 5.88245L1.26127 5.93081C0.70372 7.26756 0.386414 8.72074 0.386414 10.2311C0.386414 11.7414 0.70372 13.1946 1.26127 14.5314L4.50785 11.9999Z" fill="#FBBC05"/>
              <path d="M10.2002 4.44008C12.0918 4.44008 13.3662 5.24947 14.0919 5.92393L16.9082 3.19947C15.1436 1.57134 12.8975 0.5978 10.2002 0.5978C6.34599 0.5978 2.99729 2.84778 1.26123 6.06621L4.49745 8.46227C5.27596 6.13322 7.53456 4.44008 10.2002 4.44008Z" fill="#EB4335"/>
            </svg>
            <span>Entre com o Google</span>
          </button>
          
          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gray-300 flex-grow"></div>
            <span className="text-sm text-muted-foreground">OU</span>
            <div className="h-px bg-gray-300 flex-grow"></div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Endereço de E-mail
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full py-6 rounded-full bg-[#C8A687] hover:bg-[#B89574] text-white">
              Entrar
            </Button>
          </form>
          
          <p className="text-center mt-6 text-sm">
            Não tem uma conta? <Link to="/cadastro" className="text-primary hover:underline">Inscreva-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

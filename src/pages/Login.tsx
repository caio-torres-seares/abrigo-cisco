import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import EntrarImg from '../assets/images/EntrarSemFundo.png';
import PataImg from '../assets/images/pataSemFundo.png';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado esquerdo */}
      <div className="bg-secondary/60 w-full md:w-1/2 p-10 flex flex-col justify-center items-center relative">

        <div className="max-w-md mx-auto text-center md:text-left mt-16 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            A Felicidade<br />Começa Aqui
          </h1>
          <img
            src={EntrarImg}
            alt="Pessoa com animais"
            className="max-w-xs mx-auto"
          />
        </div>
      </div>

      {/* Lado direito */}
      <div className="bg-card w-full md:w-1/2 p-10 flex flex-col justify-center items-center relative">
        <Link to="/" className="absolute top-8 left-8 text-muted-foreground hover:text-foreground transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              src={PataImg}
              alt="Pata"
              className="w-12 h-12"
            />
          </div>

          <h2 className="text-2xl font-bold text-center mb-8">Fazer Login</h2>

          {/* Botão Google */}
          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md p-2 mb-6 hover:bg-gray-50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.8055 10.2238..." fill="#4285F4" />
              <path d="..." fill="#34A853" />
              <path d="..." fill="#FBBC05" />
              <path d="..." fill="#EB4335" />
            </svg>
            <span>Entre com o Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gray-300 flex-grow"></div>
            <span className="text-sm text-muted-foreground">OU</span>
            <div className="h-px bg-gray-300 flex-grow"></div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  type={showPassword ? 'text' : 'password'}
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

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}

          <p className="text-center mt-6 text-sm">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-primary hover:underline">
              Inscreva-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

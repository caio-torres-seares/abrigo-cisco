import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Facebook, Github, ArrowRight } from "lucide-react";
import GatoImg from '../assets/images/GatoSemFundo.png'
import PataImg from '../assets/images/pataSemFundo.png'


const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-white/80 pt-12 pb-4">
      <div className="container mx-auto px-4">
        {/* Pata como fundo */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center flex flex-col items-center">
            <div className="relative mb-0 max-w-md mx-auto w-full h-[140px] md:h-[180px]">
              <img
                src={PataImg}
                alt=""
                className="absolute top-1/2 left-1/2 w-[140px] h-[140px] md:w-[180px] md:h-[180px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />
              <h2 className="relative z-10 text-2xl md:text-3xl font-bold text-primary-text flex items-center justify-center h-full text-center">
                Seu melhor amigo está a uma busca de distância!
              </h2>
            </div>
            
            <button
              onClick={() => {
                navigate("/pets");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="btn-primary inline-flex items-center gap-3 px-6 py-3 text-lg md:text-xl w-fit" // Alteração aqui
            >
              Procurar! <ArrowRight size={24} />
            </button>
          </div>

          <div className="bg-primary/90 rounded-xl p-8 max-w-md flex gap-6 items-start min-h-[220px] relative">
            <div className="flex-1">
              <h3 className="text-primary-text font-bold mb-4 text-lg md:text-xl lg:text-2xl">
                Nos ajude a manter nosso Abrigo de Animais!
              </h3>
              <button
                onClick={() => {
                  navigate("/contribuir");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn-primary px-6 py-3 text-base"
              >
                Contribuir
              </button>
            </div>
            
            <img
              src={GatoImg}
              alt="Gato"
              className="absolute right-0 bottom-0 w-40 h-40 object-contain translate-y-2"
            />
          </div>
        </div>

        {/* Social media */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://github.com/caio-torres-seares/abrigo-cisco"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Abrigo Cisco. Todos os direitos
            reservados.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/termos" className="hover:underline">
              Termos de Serviço
            </Link>
            <Link to="/privacidade" className="hover:underline">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

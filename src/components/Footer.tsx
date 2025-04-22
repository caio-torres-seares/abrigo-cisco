import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instagram, Facebook, Github, ArrowRight } from "lucide-react";
import GatoImg from '../assets/images/GatoSemFundo.png'

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-white/80 pt-12 pb-4">
      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para encontrar seu amigo?
            </h2>
          
            <button
              onClick={() => {
                navigate("/pets");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="btn-primary inline-flex items-center gap-3 px-6 py-3 text-lg md:text-xl"
            >
              Vamos começar! <ArrowRight size={24} />
            </button>

          </div>

          <div className="bg-primary /90 rounded-xl p-6 max-w-sm flex gap-4 items-start">
            <div className="flex-1">
              <h3 className="font-bold mb-2">
                Nos ajude a manter nosso Abrigo de Animais!
              </h3>
              <button
                onClick={() => {
                  navigate("/contribuir");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn-primary text-sm px-4 py-2 inline-flex items-center justify-center"
              >
                Contribuir
              </button>
            </div>
            <img
              src={GatoImg}
              alt="Gato"
              className="w-20 h-20"
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
            href="https://github.com/caio-torres-seares/pet-finder-amigo-project"
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

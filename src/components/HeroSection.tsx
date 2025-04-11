
import React from 'react';
import { ArrowRight } from 'lucide-react';
import familyImg from '../assets/images/family.jpeg'; // ajuste o caminho se estiver em subpastas
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="w-full px-4 md:px-8 pt-6 pb-12 flex flex-col md:flex-row items-center gap-8">
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <img
          src={familyImg}
          alt="Family with pets"
          className="w-full max-w-md rounded-xl animate-fade-in"
        />
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left animate-float-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-foreground">Procure.</span>
          <span className="text-primary"> Adote.</span>
          <span className="text-foreground"> Ame.</span>
        </h1>

        <Link to="/pets"
          className="btn-primary inline-flex items-center gap-2 px-4 py-2">
          Vamos começar! <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

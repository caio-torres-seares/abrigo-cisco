import React from 'react';
import { ArrowRight } from 'lucide-react';
import familyImg from '../assets/images/familySemFundo.png';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="w-full px-4 md:px-8 pt-6 pb-12 flex flex-col md:flex-row items-center gap-4 md:gap-8">
      <div className="w-full md:w-1/2 flex justify-center md:justify-center">
        <img
          src={familyImg}
          alt="Family with pets"
          className="w-full max-w-md rounded-xl animate-fade-in"
        />
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left animate-float-up">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Procure.</span>
          <span className="text-primary-text"> Adote.</span>
          <span className="text-foreground"> Ame.</span>
        </h1>

        <Link
          to="/pets"
          className="btn-primary inline-flex items-center gap-3 px-6 py-3 text-lg md:text-xl"
        >
          Vamos começar! <ArrowRight size={24} />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

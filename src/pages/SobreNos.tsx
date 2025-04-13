import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SobreNos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-background/90 backdrop-blur-md z-50 shadow-sm">
        <Navbar />
      </header>
      
      <main className="flex-grow bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Sobre o Abrigo Cisco</h1>
            <p className="text-xl text-muted-foreground">Nossa missão é dar uma segunda chance aos animais que precisam de amor</p>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Nossa História</h2>
            <p className="text-muted-foreground mb-4">
              O Abrigo Cisco nasceu do sonho de criar um lugar seguro e acolhedor para animais abandonados. 
              Fundado em 2015, começamos como um pequeno abrigo e hoje atendemos mais de 200 animais por ano.
            </p>
            <p className="text-muted-foreground mb-4">
              Nosso nome é uma homenagem ao primeiro cão que resgatamos, o Cisco, que nos ensinou sobre 
              resiliência e amor incondicional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-card rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Nossa Missão</h2>
              <p className="text-muted-foreground">
                Proporcionar um lar temporário seguro e amoroso para animais abandonados, 
                promovendo sua saúde e bem-estar até encontrarem uma família definitiva.
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Nossos Valores</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Amor e respeito por todos os animais</li>
                <li>Transparência em nossas ações</li>
                <li>Compromisso com o bem-estar animal</li>
                <li>Educação para a posse responsável</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link to="/pets">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Conheça nossos pets
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SobreNos; 
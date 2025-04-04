
import React from 'react';
import { Search, PawPrint, User, Heart } from 'lucide-react';

const SearchSection = () => {
  return (
    <section className="w-full px-4 md:px-8 py-16 flex flex-col items-center relative">
      {/* Background paw print */}
      <div className="absolute opacity-10 right-0 top-1/2 transform -translate-y-1/2">
        <PawPrint size={180} />
      </div>
      
      {/* Heading */}
      <div className="text-center mb-12 max-w-md mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Seu melhor amigo está a uma busca de distância!
        </h2>
      </div>
      
      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="pet-card">
          <div className="bg-secondary/50 p-4 rounded-full mb-2">
            <PawPrint size={32} className="text-primary" />
          </div>
          <h3 className="font-bold text-lg">Venha conhecer nosso Abrigo de Animais!</h3>
          <p className="text-muted-foreground">Encontre o animal perfeito para sua família.</p>
        </div>
        
        <div className="pet-card">
          <div className="bg-secondary/50 p-4 rounded-full mb-2">
            <User size={32} className="text-primary" />
          </div>
          <h3 className="font-bold text-lg">Confira as lindas histórias construídas através do Abrigo Cisco!</h3>
          <p className="text-muted-foreground">Leia sobre nossos casos de sucesso.</p>
        </div>
        
        <div className="pet-card">
          <div className="bg-secondary/50 p-4 rounded-full mb-2">
            <Search size={32} className="text-primary" />
          </div>
          <h3 className="font-bold text-lg">Procure por espécie, raça, nome e até personalidade!</h3>
          <p className="text-muted-foreground">Filtre sua busca para encontrar o companheiro ideal.</p>
        </div>
      </div>
      
      {/* Hand-drawn illustration */}
      <div className="absolute right-0 bottom-0 opacity-40 md:opacity-70 pointer-events-none">
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/lovable-assets.appspot.com/o/hand-drawn-pet.png?alt=media" 
          alt="Hand drawn pet illustration" 
          className="w-32 md:w-48"
        />
      </div>
    </section>
  );
};

export default SearchSection;

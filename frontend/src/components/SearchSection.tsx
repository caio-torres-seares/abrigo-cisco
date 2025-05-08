
import React from 'react';
import { Search, PawPrint, User, Heart } from 'lucide-react';

const SearchSection = () => {
  return (
    <section className="w-full px-4 md:px-8 py-16 flex flex-col items-center relative">
      
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
      
      
    </section>
  );
};

export default SearchSection;

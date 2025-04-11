
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import PetModal from './PetModal';
import dogImage from '../assets/images/family.jpeg'; // ajuste o caminho se estiver em subpastas


interface PetCardProps {
  id: number;
  name: string;
  age: string;
  breed: string;
  image: string;
  type: string;
  personality?: string[];
  gender?: string;
  weight?: string;
}


const PetCard = ({ id, name, age, breed, image, type, personality, gender, weight }: PetCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define a cor de fundo baseada no tipo de animal
  const getBgColor = () => {
    const colors = [
      'bg-amber-200', // amarelo
      'bg-red-200',   // vermelho
      'bg-lime-200',  // verde
      'bg-cyan-200',  // azul
      'bg-orange-300', // laranja
    ];
    
    // Usar o nome do pet para determinar a cor de forma consistente
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleCardClick = () => {
    console.log('Card clicked, opening modal');
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="relative rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
        onClick={handleCardClick}
      >
        <div className={`relative ${getBgColor()} pb-[100%]`}>
          <img 
            src={dogImage} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button 
            className="absolute top-2 right-2 bg-white/30 backdrop-blur-sm rounded-full p-1"
            aria-label="Fechar"
            onClick={(e) => {
              e.stopPropagation();
              // Adicione qualquer ação para o botão X aqui se necessário
            }}
          >
            <X className="h-4 w-4 text-gray-700" />
          </button>
        </div>
        
        <div className="p-4 bg-white">
          <h3 className="font-medium text-lg">{name}</h3>
          <div className="flex flex-col text-sm text-gray-600">
            <span>{breed}</span>
            <span>{age}</span>
          </div>
        </div>
      </div>

      <PetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pet={{ 
          id, 
          name, 
          age, 
          breed, 
          type, 
          image,
          personality,
          gender,
          weight
        }} 
      />
    </>
  );
};

export default PetCard;

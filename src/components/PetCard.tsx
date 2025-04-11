
import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
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
  const [imageError, setImageError] = useState(false);

  // Seleciona uma cor de fundo baseada no nome do pet
  const getBgColor = () => {
    const colors = [
      'bg-amber-200',
      'bg-red-200',
      'bg-lime-200',
      'bg-cyan-200',
      'bg-orange-300',
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleCardClick = () => {
    console.log('Card clicked, opening modal for', name);
    setIsModalOpen(true);
  };

  const handleImageError = () => {
    console.log('Image failed to load for', name);
    setImageError(true);
  };

  return (
    <>
      <div 
        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
        onClick={handleCardClick}
      >
        {/* Área da imagem */}
        <div className={`relative ${getBgColor()} pb-[100%]`}>
          {!imageError ? (
            <img 
              src={image} 
              alt={`Foto de ${name}`}
              className="absolute inset-0 w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <ImageOff className="h-12 w-12 text-gray-500" />
            </div>
          )}
        </div>
        
        {/* Informações do pet */}
        <div className="p-4 bg-white">
          <h3 className="font-medium text-lg">{name}</h3>
          <div className="flex flex-col text-sm text-gray-600">
            <span>{breed}</span>
            <span>{age}</span>
          </div>
        </div>
      </div>

      {/* Modal com detalhes do pet */}
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

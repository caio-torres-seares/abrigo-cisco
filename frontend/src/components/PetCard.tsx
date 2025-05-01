import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pet } from '@/services/petService';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para formatar a URL da imagem
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `http://localhost:3000${imagePath}`;
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-square relative">
          {pet.photos && pet.photos.length > 0 ? (
            <img 
              src={getImageUrl(pet.photos[0])} 
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Sem foto</span>
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="text-primary-text font-bold text-lg md:text-xl lg:text-2xl mb-2">{pet.name}</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-accent/50 text-accent-foreground px-3 py-1 rounded-full inline-block">
              {pet.species}
            </span>
            <span className={`px-3 py-1 rounded-full inline-block ${pet.gender === 'macho' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
              {pet.gender}
            </span>
            {pet.breed && (
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full inline-block">
                {pet.breed}
              </span>
            )}
            {pet.age !== undefined && ( // Check if age is defined
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full inline-block">
                {pet.age} {pet.age === 1 ? 'ano' : 'anos'}
              </span>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-0 max-h-[90vh] overflow-y-auto">
  <div className="flex flex-col md:flex-row">
    {/* Seção da imagem */}
    {pet.photos && pet.photos.length > 0 && (
      <div className="md:w-1/2 aspect-square relative rounded-t-lg md:rounded-l-lg md:rounded-t-none overflow-hidden">
        <img
          src={getImageUrl(pet.photos[0])}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>
    )}

    {/* Seção de conteúdo */}
    <div className="md:w-1/2 p-4 md:p-6 flex flex-col space-y-4 flex-1">
              <h2 className="font-bold text-2xl lg:text-3xl text-primary-text">{pet.name}</h2>

              {pet.description && (
                <p className="text-sm text-gray-600">{pet.description}</p>
              )}

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Raça</p>
                  {pet.breed && (
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                      {pet.breed}
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Porte</p>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    {pet.size}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    {pet.status}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Sexo</p>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold inline-block ${pet.gender === 'macho' ? 'bg-blue-200 text-blue-900' : 'bg-pink-200 text-pink-900'}`}>
                    {pet.gender}
                  </span>
                </div>
                {pet.age !== undefined && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Idade</p>
                    <span className="bg-orange-200 text-orange-900 px-4 py-1.5 rounded-full text-sm font-semibold inline-block">
                      {pet.age} {pet.age === 1 ? 'Ano' : 'Anos'}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-grow"></div>

              <DialogFooter className="grid grid-cols-2 gap-2 w-full mt-4">
        <Button 
          variant="outline" 
          onClick={() => setIsModalOpen(false)}
          className="w-full"
        >
          Fechar
        </Button>
        <Link to={`/pets/${pet._id}`} className="w-full">
          <Button className="w-full bg-[#a58a72] hover:bg-[#947a64]">
            Ver mais
          </Button>
        </Link>
      </DialogFooter>
    </div>
  </div>
</DialogContent>
      </Dialog>
    </>
  );
};

export default PetCard;

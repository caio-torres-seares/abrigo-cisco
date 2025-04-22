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
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{pet.name}</h3>
          <p className="text-sm text-gray-600 mb-1">
            {pet.species} • {pet.gender}
          </p>
          {pet.breed && (
            <p className="text-sm text-gray-600 mb-1">{pet.breed}</p>
          )}
          {pet.age && (
            <p className="text-sm text-gray-600">{pet.age} anos</p>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{pet.name}</DialogTitle>
            <DialogDescription>
              {pet.species} • {pet.gender} • {pet.age} anos
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {pet.photos && pet.photos.length > 0 && (
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <img
                  src={getImageUrl(pet.photos[0])}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-2">
              {pet.breed && (
                <p className="text-sm">
                  <span className="font-medium">Raça:</span> {pet.breed}
                </p>
              )}
              <p className="text-sm">
                <span className="font-medium">Porte:</span> {pet.size}
              </p>
              <p className="text-sm">
                <span className="font-medium">Status:</span> {pet.status}
              </p>
              {pet.description && (
                <p className="text-sm text-gray-600 mt-2">{pet.description}</p>
              )}
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Fechar
            </Button>
            <Link to={`/pets/${pet._id}`}>
              <Button>
                Ver mais detalhes
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PetCard;

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PetModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: {
    id: number;
    name: string;
    age: string;
    breed: string;
    type: string;
    image: string;
    gender?: string;
    weight?: string;
    personality?: string[];
  };
}

const PetModal = ({ isOpen, onClose, pet }: PetModalProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log('Erro ao carregar imagem de', pet.name);
    setImageError(true);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-3xl p-0 overflow-hidden border border-yellow-300 shadow-xl bg-white rounded-2xl">
        {/* Fechar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 bg-white/60 backdrop-blur-md rounded-full p-1 hover:bg-white transition"
          aria-label="Fechar"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        <div className="grid md:grid-cols-2 grid-cols-1">
          {/* Imagem */}
          <div className="bg-yellow-100 flex justify-center items-center p-6">
            {!imageError ? (
              <img
                src={pet.image}
                alt={`Foto de ${pet.name}`}
                className="w-full h-80 object-cover rounded-lg shadow-inner"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center text-gray-500">
                <ImageOff className="h-16 w-16" />
              </div>
            )}
          </div>

          {/* Conteúdo */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="mb-2">
                <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
                <p className="text-xs text-gray-500">Última atualização: 11 de Abril de 2025</p>
              </div>

              <div className="flex flex-wrap gap-2 my-3">
                {(pet.personality && pet.personality.length > 0 ? pet.personality : ['Amigável', 'Brincalhão']).map((trait, index) => (
                  <Badge key={index} className="bg-yellow-200 text-yellow-900 hover:bg-yellow-300 transition">{trait}</Badge>
                ))}
              </div>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {pet.name} é um {pet.type === 'cachorro' ? 'cachorro' : 'gato'} {pet.breed} {pet.gender === 'Macho' ? 'carinhoso' : 'carinhosa'} e sociável. {pet.gender === 'Macho' ? 'Ele' : 'Ela'} está pronto(a) para encontrar um novo lar cheio de amor e cuidado.
              </p>

              <div className="flex flex-wrap gap-3 mb-4">
                <Badge className="rounded-full px-4 py-1 bg-red-500 text-white">{pet.gender || 'Macho'}</Badge>
                <Badge className="rounded-full px-4 py-1 bg-orange-300 text-white">{pet.age}</Badge>
                <Badge className="rounded-full px-4 py-1 bg-purple-500 text-white">{pet.weight || '7kg'}</Badge>
              </div>
            </div>

            <AlertDialogFooter className="mt-4 justify-between p-0">
              <Button
                variant="ghost"
                className="text-yellow-800 hover:bg-yellow-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                Fechar
              </Button>
              <Link to={`/pets/${pet.id}`}>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  Ver mais
                </Button>
              </Link>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PetModal;

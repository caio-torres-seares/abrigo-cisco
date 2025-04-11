
import React, { useState } from 'react';
import { 
  AlertDialog, 
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription
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
    console.log('Modal image failed to load for', pet.name);
    setImageError(true);
  };
  
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="p-0 max-w-xl overflow-hidden border border-amber-200 relative">
        <AlertDialogTitle className="sr-only">Informações do Pet: {pet.name}</AlertDialogTitle>
        <AlertDialogDescription className="sr-only">
          Detalhes completos sobre {pet.name}, incluindo idade, raça e características.
        </AlertDialogDescription>
        
        {/* Botão de fechar no canto superior direito */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2 right-2 bg-white/30 backdrop-blur-sm rounded-full p-1 z-10"
          aria-label="Fechar"
        >
          <X className="h-4 w-4 text-gray-700" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Imagem (lado esquerdo) */}
          <div className="bg-amber-200 flex justify-center items-center p-6">
            {!imageError ? (
              <img 
                src={pet.image} 
                alt={`Foto de ${pet.name}`}
                className="w-full object-cover rounded-md max-h-80"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center">
                <ImageOff className="h-16 w-16 text-gray-500" />
              </div>
            )}
          </div>
          
          {/* Informações (lado direito) */}
          <div className="p-6 flex flex-col">
            <div className="mb-3">
              <h2 className="text-2xl font-bold">{pet.name}</h2>
              <p className="text-sm text-gray-500">Último Atualização: 11 de Abril de 2025</p>
            </div>
            
            {/* Badges de personalidade */}
            <div className="flex flex-wrap gap-1 mb-3">
              {pet.personality && pet.personality.length > 0 ? (
                pet.personality.map((trait, index) => (
                  <Badge key={index} className="bg-amber-100 text-amber-800 hover:bg-amber-200">{trait}</Badge>
                ))
              ) : (
                <>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Amigável</Badge>
                  <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">Brincalhão</Badge>
                </>
              )}
            </div>
            
            {/* Descrição */}
            <p className="text-sm mb-4">
              {pet.name} é um {pet.type === 'cachorro' ? 'cachorro' : 'gato'} {pet.breed} {pet.gender === 'Macho' ? 'carinhoso' : 'carinhosa'} e 
              sociável. {pet.gender === 'Macho' ? 'Ele' : 'Ela'} está pronto para encontrar um novo lar cheio de amor e carinho!
            </p>
            
            {/* Características em badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="rounded-full px-4 py-1 bg-red-500 text-white">{pet.gender || 'Macho'}</Badge>
              <Badge className="rounded-full px-4 py-1 bg-orange-300 text-white">{pet.age}</Badge>
              <Badge className="rounded-full px-4 py-1 bg-purple-400 text-white">{pet.weight || '7kg'}</Badge>
            </div>
            
            {/* Botões de ação */}
            <AlertDialogFooter className="sm:justify-between p-0">
              <Button 
                variant="secondary" 
                className="bg-amber-100 hover:bg-amber-200 text-amber-800"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                Fechar
              </Button>
              <Link to={`/pets/${pet.id}`}>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
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

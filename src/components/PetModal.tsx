
import React from 'react';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
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

const imageUrl = "data:image/jpeg;base64,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"

const PetModal = ({ isOpen, onClose, pet }: PetModalProps) => {
  if (!isOpen) return null;
  
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="p-0 max-w-xl overflow-hidden border border-amber-200 relative">
        <AlertDialogTitle className="sr-only">Informações do Pet: {pet.name}</AlertDialogTitle>
        <AlertDialogDescription className="sr-only">
          Informações básicas sobre {pet.name}, incluindo idade, raça e características.
        </AlertDialogDescription>
        
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 bg-white/30 backdrop-blur-sm rounded-full p-1 z-10"
          aria-label="Fechar"
        >
          <X className="h-4 w-4 text-gray-700" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Imagem (lado esquerdo) */}
          <div className="bg-amber-200 flex justify-center items-center p-6">
            <img 
              src={imageUrl} 
              alt={pet.name} 
              className="w-full object-cover rounded-md max-h-80"
            />
          </div>
          
          {/* Informações (lado direito) */}
          <div className="p-6 flex flex-col">
            <div className="mb-3">
              <h2 className="text-2xl font-bold">{pet.name}</h2>
              <p className="text-sm text-gray-500">Último Atualizacao: 8 de Abril de 2023</p>
            </div>
            
            {/* Badges de personalidade */}
            <div className="flex flex-wrap gap-1 mb-3">
              {pet.personality ? (
                pet.personality.map((trait, index) => (
                  <Badge key={index} className="bg-amber-100 text-amber-800 hover:bg-amber-200">{trait}</Badge>
                ))
              ) : (
                <>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Amigável</Badge>
                  <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">Brincalhão</Badge>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Calmo</Badge>
                </>
              )}
            </div>
            
            {/* Descrição */}
            <p className="text-sm mb-4">
              {pet.name} é um cachorrinho lindo, carinhoso, mas também muito curioso. Ele está pronto para encher um lar com muita alegria, ternura e amor!
            </p>
            
            {/* Características */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="rounded-full px-4 py-1 bg-red-500 text-white">{pet.gender || 'Macho'}</Badge>
              <Badge className="rounded-full px-4 py-1 bg-orange-300 text-white">{pet.age}</Badge>
              <Badge className="rounded-full px-4 py-1 bg-purple-400 text-white">{pet.weight || '7kg'}</Badge>
            </div>
            
            <AlertDialogFooter className="sm:justify-between p-0">
              <Button 
                variant="secondary" 
                className="bg-amber-100 hover:bg-amber-200 text-amber-800"
                onClick={onClose}
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


import React, { useState } from 'react';
import { ImageOff, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface EmployeePetCardProps {
  id: number;
  name: string;
  breed: string;
  age: string;
  image: string;
  onEditClick: () => void;
}

const EmployeePetCard: React.FC<EmployeePetCardProps> = ({
  id,
  name,
  breed,
  age,
  image,
  onEditClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log('Image failed to load for', name);
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden h-full">
      <div className="relative bg-primary-light aspect-square">
        {!imageError ? (
          <img
            src={image}
            alt={`Foto de ${name}`}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-light">
            <ImageOff className="h-10 w-10 text-primary" />
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-600">{breed}</p>
        <p className="text-sm text-gray-600">{age}</p>
      </div>
      
      <div className="flex border-t border-gray-100">
        <button 
          onClick={onEditClick}
          className="flex-1 p-2 hover:bg-primary-light flex items-center justify-center gap-1 text-sm"
        >
          <Edit size={16} />
          <span>Editar</span>
        </button>
        <button 
          className="flex-1 p-2 hover:bg-red-50 flex items-center justify-center gap-1 text-sm text-red-600"
        >
          <Trash2 size={16} />
          <span>Excluir</span>
        </button>
      </div>
    </Card>
  );
};

export default EmployeePetCard;

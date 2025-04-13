
import React, { useState } from 'react';
import { Search, Dog, Cat } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import EmployeeLayout from '@/components/EmployeeLayout';
import EmployeePetCard from '@/components/employee/EmployeePetCard';

const EmployeePets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animalType, setAnimalType] = useState<string>('todos');
  const navigate = useNavigate();
  
  // Dados simulados dos pets
  const pets = [
    { 
      id: 1, 
      name: 'Jujuba', 
      age: '3 anos', 
      breed: 'Yorkshire Terrier', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
    },
    { 
      id: 2, 
      name: 'Laranjinha', 
      age: '1 ano', 
      breed: 'Half-breed', 
      type: 'gato', 
      image: '/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png',
    },
    { 
      id: 3, 
      name: 'Clebin', 
      age: '2 anos', 
      breed: 'Vira-lata', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
    },
    { 
      id: 4, 
      name: 'Juninho', 
      age: '2 meses', 
      breed: 'British Longhair', 
      type: 'gato', 
      image: '/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png',
    },
    { 
      id: 5, 
      name: 'Costellinha', 
      age: '1 ano', 
      breed: 'Jack Russell Terrier', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
    },
    { 
      id: 6, 
      name: 'Mingau', 
      age: '4 anos', 
      breed: 'Maine Coon', 
      type: 'gato', 
      image: '/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png',
    },
    { 
      id: 7, 
      name: 'Chavina', 
      age: '2 anos', 
      breed: 'Welsh Corgi', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
    },
    { 
      id: 8, 
      name: 'Kiwi', 
      age: '1 ano', 
      breed: 'Yorkshire Terrier', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
    },
    { 
      id: 9, 
      name: 'Juca', 
      age: '3 anos', 
      breed: 'Samoyed', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
    },
    { 
      id: 10, 
      name: 'Stitch', 
      age: '2 anos', 
      breed: 'European cat', 
      type: 'gato', 
      image: '/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png',
    },
  ];

  // Filtrando os pets
  const filteredPets = pets.filter(pet => {
    const matchesSearch = searchTerm === '' || 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = animalType === 'todos' || pet.type === animalType;
    
    return matchesSearch && matchesType;
  });

  return (
    <EmployeeLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-6">Ver Pets</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Input
              placeholder="Pesquise por nome, raça..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-full"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={animalType === 'todos' ? "default" : "outline"} 
              onClick={() => setAnimalType('todos')}
              className="rounded-full"
            >
              Todos
            </Button>
            <Button 
              variant={animalType === 'cachorro' ? "default" : "outline"} 
              onClick={() => setAnimalType('cachorro')}
              className="rounded-full flex items-center gap-1"
            >
              <Dog size={16} />
              Cães
            </Button>
            <Button 
              variant={animalType === 'gato' ? "default" : "outline"} 
              onClick={() => setAnimalType('gato')}
              className="rounded-full flex items-center gap-1"
            >
              <Cat size={16} />
              Gatos
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredPets.map(pet => (
          <EmployeePetCard 
            key={pet.id}
            id={pet.id}
            name={pet.name}
            breed={pet.breed}
            age={pet.age}
            image={pet.image}
            onEditClick={() => navigate(`/funcionario/editar-pet/${pet.id}`)}
          />
        ))}
      </div>
    </EmployeeLayout>
  );
};

export default EmployeePets;

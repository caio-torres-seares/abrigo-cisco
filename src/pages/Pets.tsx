
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PetCard from '@/components/PetCard';

const Pets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animalType, setAnimalType] = useState<string | undefined>('todos');
  
  // Dados simulados dos pets com mais informações
  const pets = [
    { 
      id: 1, 
      name: 'Jujuba', 
      age: '3 anos', 
      breed: 'Yorkshire Terrier', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
      personality: ['Amigável', 'Brincalhão', 'Calmo'],
      gender: 'Fêmea',
      weight: '3kg'
    },
    { 
      id: 2, 
      name: 'Laranjinha', 
      age: '1 ano', 
      breed: 'Half-breed', 
      type: 'gato', 
      image: '/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png',
      personality: ['Independente', 'Curioso', 'Tranquilo'],
      gender: 'Macho',
      weight: '4kg'
    },
    { 
      id: 3, 
      name: 'Clebin', 
      age: '2 anos', 
      breed: 'Vira-lata', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
      personality: ['Amigável', 'Brincalhão', 'Calmo'],
      gender: 'Macho',
      weight: '7kg'
    },
    { 
      id: 4, 
      name: 'Juninho', 
      age: '2 meses', 
      breed: 'British Longhair', 
      type: 'gato', 
      image: '/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png',
      personality: ['Brincalhão', 'Enérgico', 'Social'],
      gender: 'Macho',
      weight: '1kg'
    },
    { 
      id: 5, 
      name: 'Costellinha', 
      age: '1 ano', 
      breed: 'Jack Russell Terrier', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
      personality: ['Ativo', 'Inteligente', 'Leal'],
      gender: 'Macho',
      weight: '6kg'
    },
    { 
      id: 6, 
      name: 'Mingau', 
      age: '4 anos', 
      breed: 'Maine Coon', 
      type: 'gato', 
      image: '/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png',
      personality: ['Gentil', 'Tranquilo', 'Carinhoso'],
      gender: 'Fêmea',
      weight: '5kg'
    },
    { 
      id: 7, 
      name: 'Chavina', 
      age: '2 anos', 
      breed: 'Welsh Corgi', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
      personality: ['Esperto', 'Brincalhão', 'Sociável'],
      gender: 'Fêmea',
      weight: '8kg'
    },
    { 
      id: 8, 
      name: 'Kiwi', 
      age: '1 ano', 
      breed: 'Yorkshire Terrier', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
      personality: ['Doce', 'Afetuoso', 'Tímido'],
      gender: 'Fêmea',
      weight: '2kg'
    },
    { 
      id: 9, 
      name: 'Juca', 
      age: '3 anos', 
      breed: 'Samoyed', 
      type: 'cachorro', 
      image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
      personality: ['Feliz', 'Amigável', 'Sociável'],
      gender: 'Macho',
      weight: '10kg'
    },
    { 
      id: 10, 
      name: 'Stitch', 
      age: '2 anos', 
      breed: 'European cat', 
      type: 'gato', 
      image: '/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png',
      personality: ['Independente', 'Carinhoso', 'Calmo'],
      gender: 'Macho',
      weight: '4kg'
    },
  ];

  // Filtrando os pets com base no termo de busca e tipo de animal
  const filteredPets = pets.filter(pet => {
    const matchesSearch = searchTerm === '' || 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = animalType === 'todos' || 
      (animalType === 'cachorro' && pet.type === 'cachorro') || 
      (animalType === 'gato' && pet.type === 'gato');
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Procurar <br />um Amigo</h1>
          
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                placeholder="Pesquise por nome, raça, espécie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 rounded-full"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
            
            <div className="flex gap-2 items-center">
              <ToggleGroup type="single" value={animalType} onValueChange={setAnimalType}>
                <ToggleGroupItem value="todos" className="px-4 py-2 rounded-full bg-secondary">
                  Todos
                </ToggleGroupItem>
                <ToggleGroupItem value="gato" className="px-4 py-2 rounded-full bg-secondary">
                  Gato
                </ToggleGroupItem>
                <ToggleGroupItem value="cachorro" className="px-4 py-2 rounded-full bg-secondary">
                  Cão
                </ToggleGroupItem>
              </ToggleGroup>
              <Button variant="outline" className="ml-2 whitespace-nowrap">
                Outros filtros
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {filteredPets.map((pet) => (
            <PetCard 
              key={pet.id} 
              id={pet.id}
              name={pet.name} 
              age={pet.age} 
              breed={pet.breed} 
              image={pet.image}
              type={pet.type}
              personality={pet.personality}
              gender={pet.gender}
              weight={pet.weight}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8 mb-4">
          <Button className="px-8 py-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80">
            Ver mais
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pets;

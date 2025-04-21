import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { petService, Pet } from '@/services/petService';
import PetCard from '@/components/PetCard';

const Pets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animalType, setAnimalType] = useState<string | undefined>('todos');
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const data = await petService.getAllPets();
        setPets(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar os pets. Por favor, tente novamente.');
        console.error('Erro ao buscar pets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Filtrando os pets com base no termo de busca e tipo de animal
  const filteredPets = pets.filter(pet => {
    const matchesSearch = searchTerm === '' || 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (pet.breed && pet.breed.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = animalType === 'todos' || 
      (animalType === 'cachorro' && pet.species.toLowerCase() === 'cachorro') || 
      (animalType === 'gato' && pet.species.toLowerCase() === 'gato');
    
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Carregando pets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {filteredPets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum pet encontrado com os filtros selecionados.</p>
          </div>
        )}

        <div className="flex justify-center mt-8 mb-4">
          <Button className="px-8 py-2 rounded-full bg-secondary text-foreground hover:bg-secondary/80">
            Ver mais
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Pets;

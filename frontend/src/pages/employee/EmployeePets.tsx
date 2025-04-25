import React, { useState, useEffect } from 'react';
import { Search, Dog, Cat, Trash2, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import EmployeeLayout from '@/components/EmployeeLayout';
import { useToast } from "@/hooks/use-toast";
import { petService, Pet } from '@/services/petService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const EmployeePets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animalType, setAnimalType] = useState<string>('todos');
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const data = await petService.getAllPets();
      setPets(data);
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os pets.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePet = async () => {
    if (!selectedPet) return;

    try {
      await petService.deletePet(selectedPet._id);
      toast({
        title: "Sucesso",
        description: "Pet excluído com sucesso.",
      });
      setShowDeleteDialog(false);
      fetchPets();
    } catch (error) {
      console.error('Erro ao excluir pet:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o pet.",
        variant: "destructive",
      });
    }
  };

  // Filtrando os pets
  const filteredPets = pets.filter(pet => {
    const matchesSearch = searchTerm === '' || 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (pet.breed && pet.breed.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = animalType === 'todos' || 
      (animalType === 'cachorro' && pet.species.toLowerCase().includes('cachorro')) ||
      (animalType === 'gato' && pet.species.toLowerCase().includes('gato'));
    
    return matchesSearch && matchesType;
  });

  return (
    <EmployeeLayout>
      <div className="w-full bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-amber-800">Ver Pets</h1>
          <Button 
            onClick={() => navigate('/funcionario/cadastrar-pet')}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Cadastrar Novo Pet
          </Button>
        </div>
        
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map(pet => (
            <div key={pet._id} className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden">
              <div className="relative h-48">
                <img
                  src={pet.photos[0] ? `http://localhost:3000${pet.photos[0]}` : '/placeholder-pet.jpg'}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => navigate(`/funcionario/editar-pet/${pet._id}`)}
                  >
                    <Pencil size={16} className="text-amber-600" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => {
                      setSelectedPet(pet);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-amber-800">{pet.name}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{pet.breed || 'Sem raça definida'}</p>
                  <p>{pet.age ? `${pet.age} anos` : 'Idade não informada'}</p>
                  <p className="capitalize">{pet.gender}</p>
                  <p className="capitalize">{pet.size}</p>
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pet.status === 'disponível' ? 'bg-green-100 text-green-800' :
                    pet.status === 'em processo de adoção' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {pet.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Excluir Pet</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir o pet {selectedPet?.name}? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeletePet}
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeePets;

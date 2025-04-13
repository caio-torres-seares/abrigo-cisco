import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageOff, Pencil } from 'lucide-react';
import EmployeeLayout from '@/components/EmployeeLayout';

const EditPet = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mainImageError, setMainImageError] = React.useState(false);
  const [personalityImageError, setPersonalityImageError] = React.useState(false);
  const [caretakerImageError, setCaretakerImageError] = React.useState(false);

  // Simular busca de dados do pet
  const pet = {
    id: Number(id),
    name: 'Clebin',
    image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
    age: '2',
    breed: 'Vira-lata',
    type: 'cachorro',
    weight: '7',
    gender: 'Macho',
    personality: 'Alegre, brincalhão e muito carinhoso',
    temperament: 'Alegre, brincalhão e muito carinhoso',
    goodWith: 'Crianças, outros cães e gatos',
    color: 'Amarelo',
    size: 'Médio',
    training: 'Já faz as necessidades no lugar certo',
    health: 'Vacinado, vermifugado e castrado',
    description: 'Clebin é um cachorrinho lindo, carinhoso, mas também muito curioso. Ele está pronto para encher um lar com muita alegria, ternura e amor!'
  };
  
  // Dados do responsável
  const caretaker = {
    name: 'Lara Silva',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    description: 'Cuida do cachorrinho há mais de 3 anos desde novembro de 2023, quando o encontrou em uma situação de muita fome. Aqui no abrigo recebeu atenção, carinho e hoje está pronto para encontrar e conhecer um lar cheio de amor.'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Salvar as alterações
    console.log('Salvando alterações do pet', id);
    navigate('/funcionario');
  };
  
  const handleCancel = () => {
    navigate('/funcionario');
  };

  return (
    <EmployeeLayout>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Edição dos Dados do Pet</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna da esquerda - Dados básicos */}
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Perfil do Pet</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Pet *</Label>
                  <Input id="name" defaultValue={pet.name} required />
                </div>
                
                <div>
                  <Label>Foto do Pet *</Label>
                  <div className="mt-2 relative">
                    {!mainImageError ? (
                      <img
                        src={pet.image}
                        alt={`Foto de ${pet.name}`}
                        className="w-32 h-32 object-cover rounded-lg border"
                        onError={() => setMainImageError(true)}
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-lg border">
                        <ImageOff className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    
                    <button
                      type="button"
                      className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <Pencil size={16} className="text-amber-500" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <Label>Personalidade do Pet *</Label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-primary-light w-12 h-12"></div>
                    <div className="rounded-lg bg-red-100 w-12 h-12"></div>
                  </div>
                  <button
                    type="button"
                    className="mt-2 text-xs text-amber-600 flex items-center gap-1"
                  >
                    <Pencil size={12} />
                    <span>Editar cores de personalidade</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Informações do Pet</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Espécie *</Label>
                  <Input id="type" defaultValue={pet.type} required />
                </div>
                
                <div>
                  <Label htmlFor="temperament">Temperamento *</Label>
                  <Input id="temperament" defaultValue={pet.temperament} required />
                </div>
                
                <div>
                  <Label htmlFor="breed">Raça *</Label>
                  <Input id="breed" defaultValue={pet.breed} required />
                </div>
                
                <div>
                  <Label htmlFor="goodWith">Convive bem com *</Label>
                  <Input id="goodWith" defaultValue={pet.goodWith} required />
                </div>
                
                <div>
                  <Label htmlFor="age">Idade *</Label>
                  <Input id="age" defaultValue={pet.age} required />
                </div>
                
                <div>
                  <Label htmlFor="training">Treinamento *</Label>
                  <Input id="training" defaultValue={pet.training} required />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gênero *</Label>
                  <Input id="gender" defaultValue={pet.gender} required />
                </div>
                
                <div>
                  <Label htmlFor="health">Saúde *</Label>
                  <Input id="health" defaultValue={pet.health} required />
                </div>
                
                <div>
                  <Label htmlFor="weight">Peso *</Label>
                  <Input id="weight" defaultValue={pet.weight} required />
                </div>
                
                <div>
                  <Label htmlFor="color">Cor *</Label>
                  <Input id="color" defaultValue={pet.color} required />
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna da direita - Informações adicionais e responsável */}
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Informações do Responsável</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="caretakerName">Nome Completo do Responsável *</Label>
                  <Input id="caretakerName" defaultValue={caretaker.name} required />
                </div>
                
                <div>
                  <Label>Foto do Responsável *</Label>
                  <div className="mt-2 relative">
                    {!caretakerImageError ? (
                      <img
                        src={caretaker.image}
                        alt="Foto do responsável"
                        className="w-20 h-20 object-cover rounded-full border"
                        onError={() => setCaretakerImageError(true)}
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-full border">
                        <ImageOff className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md"
                    >
                      <Pencil size={16} className="text-amber-500" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="caretakerDescription">Breve Descrição do Responsável sobre o Pet *</Label>
                  <Textarea
                    id="caretakerDescription"
                    defaultValue={caretaker.description}
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-8">
              <Button 
                type="button" 
                variant="outline" 
                className="rounded-full px-6"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-green-500 hover:bg-green-600 rounded-full px-6"
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </EmployeeLayout>
  );
};

export default EditPet;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import ProfileRequiredModal from '@/components/ProfileRequiredModal';
import { createAdoptionRequest } from '@/services/adoptionService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { petService, Pet } from '@/services/petService';

const PetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { isProfileComplete } = useProfile();
  const { toast } = useToast();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) {
        setError('ID do pet não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await petService.getPetById(id);
        setPet(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar os detalhes do pet. Por favor, tente novamente.');
        console.error('Erro ao buscar pet:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Carregando detalhes do pet...</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || 'Pet não encontrado'}</p>
          <Button onClick={() => navigate('/pets')}>
            Voltar para lista de pets
          </Button>
        </div>
      </div>
    );
  }

  // Responsável pelo pet
  const caretaker = {
    name: 'Lara Croft',
    since: 'novembro de 2023',
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  };

  // Imagens adicionais do pet
  const additionalImages = [
    "/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png",
    "/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png",
    "/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png",
    "/lovable-uploads/5e66b35f-0ce9-4475-96fb-b631be5935f9.png"
  ];

  // Função para formatar a URL da imagem
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `http://localhost:3000${imagePath}`;
  };

  const handleAdoptionRequest = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para solicitar uma adoção.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (!isProfileComplete) {
      setShowProfileModal(true);
      return;
    }
    
    if (user) {
      try {
        // Criar uma solicitação de adoção
        await createAdoptionRequest(pet._id);
        setShowSuccessDialog(true);
      } catch (error) {
        console.error('Erro ao criar solicitação de adoção:', error);
        
        if (error.response?.data?.code === 'PROFILE_REQUIRED') {
          setShowProfileModal(true);
        } else {
          toast({
            title: "Erro",
            description: error.response?.data?.message || "Não foi possível criar a solicitação de adoção. Tente novamente.",
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      
      <main className="flex-grow py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          <span>Voltar</span>
        </button>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Coluna da Esquerda (LG) */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Imagem Principal */}
              <div className="bg-yellow-100 rounded-lg p-2">
                {pet.photos && pet.photos.length > 0 ? (
                  <img 
                    src={getImageUrl(pet.photos[0])} 
                    alt={pet.name} 
                    className="w-full rounded-md aspect-square object-cover"
                  />
                ) : (
                  <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-400">Sem foto</span>
                  </div>
                )}
              </div>

              {/* Informações do Responsável (Moved here for LG) */}
              <div className="bg-white rounded-lg shadow border border-gray-100 p-4">
                 <h2 className="text-lg font-semibold mb-3 text-gray-700">Responsável</h2>
                 <div className="flex items-center gap-4 mb-3">
                   <img 
                     src={caretaker.image} 
                     alt={caretaker.name} 
                     className="w-12 h-12 rounded-full object-cover"
                   />
                   <div>
                     <h3 className="font-medium text-gray-800">{caretaker.name}</h3>
                     {/* Simplified caretaker description */}
                     <p className="text-sm text-gray-600">
                       Cuida de {pet.name.toLowerCase()} desde {caretaker.since}.
                     </p>
                   </div>
                 </div>
                 <p className="text-sm text-gray-600">
                   {pet.name} foi resgatado das ruas e após cuidados, hoje ele está cheio de energia e espera por um lar cheio de amor.
                 </p>
               </div>
            </div>
            
            {/* Coluna da Direita (LG) */}
            <div className="lg:col-span-1 flex flex-col gap-6">
               {/* Nome, Tags e Descrição */}
               <div>
                 <div className="flex justify-between items-start mb-2">
                   <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{pet.name}</h1>
                   {/* Tags (Example - adapt with real data if available) */}
                   <div className="flex flex-wrap gap-2 flex-shrink-0 ml-4">
                     <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">{pet.species}</Badge>
                     {pet.breed && <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">{pet.breed}</Badge>}
                     {/* Add more tags if needed */}
                   </div>
                 </div>
                 <p className="text-xs text-gray-500 mb-3">Última Atualização: {new Date(pet.updatedAt).toLocaleDateString('pt-BR')}</p>
                 
                 {pet.description && <p className="text-gray-600 mb-4">{pet.description}</p>}
               </div>

               {/* Caixas de Atributos Grandes */}
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-red-100 text-red-800 p-3 rounded-lg text-center">
                      <p className="font-bold text-xl">{pet.gender === 'macho' ? 'Macho' : 'Fêmea'}</p>
                      <p className="text-xs uppercase tracking-wide">Sexo</p>
                  </div>
                  {pet.age !== undefined && (
                    <div className="bg-orange-100 text-orange-800 p-3 rounded-lg text-center">
                      <p className="font-bold text-xl">{pet.age} {pet.age === 1 ? 'Ano' : 'Anos'}</p>
                      <p className="text-xs uppercase tracking-wide">Idade</p>
                    </div>
                  )}
                  {/* Placeholder for Weight - Add back if data becomes available */}
                  {/* <div className="bg-purple-100 text-purple-800 p-3 rounded-lg text-center">
                      <p className="font-bold text-xl">{pet.weight}kg</p> 
                      <p className="text-xs uppercase tracking-wide">Peso</p>
                  </div> */}
               </div>

               {/* Botão de Adoção */}
               <div className="mt-4">
                 <Button 
                   size="lg" 
                   onClick={handleAdoptionRequest}
                   className="w-full bg-[#a58a72] hover:bg-[#947a64] text-white font-medium px-8 py-3 rounded-full text-lg"
                 >
                   Solicitar Adoção
                 </Button>
               </div>
               
               {/* Imagens Adicionais */}
               <div>
                  <h2 className="text-lg font-semibold mb-3 text-gray-700">Imagens</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {/* Assuming pet.photos contains all images including the main one */}
                    {pet.photos.slice(1).map((img, index) => ( // Start from index 1 if photos[0] is main
                      <div key={index} className="aspect-square overflow-hidden rounded-md border">
                        <img 
                          src={getImageUrl(img)}
                          alt={`${pet.name} ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {/* Fallback if only one photo */}
                    {pet.photos.length <= 1 && additionalImages.slice(0, 4).map((img, index) => (
                       <div key={`placeholder-${index}`} className="aspect-square overflow-hidden rounded-md border bg-gray-100">
                        <img 
                          src={getImageUrl(img)} // Use placeholder images
                          alt={`Placeholder ${index + 1}`}
                          className="w-full h-full object-cover opacity-50" // Style placeholder
                        />
                       </div>
                    ))}
                  </div>
               </div>

               {/* Informações Detalhadas */}
               <div className="border-t pt-4">
                 <h2 className="text-lg font-semibold mb-3 text-gray-700">Informações Detalhadas</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                   <div><strong className="font-medium text-gray-600">Nome:</strong> {pet.name}</div>
                   <div><strong className="font-medium text-gray-600">Espécie:</strong> {pet.species}</div>
                   {pet.breed && <div><strong className="font-medium text-gray-600">Raça:</strong> {pet.breed}</div>}
                   {pet.age !== undefined && <div><strong className="font-medium text-gray-600">Idade:</strong> {pet.age} {pet.age === 1 ? 'ano' : 'anos'}</div>}
                   {/* Removed Weight */}
                   {/* Removed Color */}
                   <div><strong className="font-medium text-gray-600">Porte:</strong> {pet.size}</div>
                   <div><strong className="font-medium text-gray-600">Sexo:</strong> {pet.gender}</div>
                   <div className="sm:col-span-2"><strong className="font-medium text-gray-600">Status:</strong> {pet.status}</div>
                   {/* Add other relevant fields like Health, Temperament if available in Pet type */}
                   {/* Example: */}
                   {/* <div className="sm:col-span-2"><strong className="font-medium text-gray-600">Saúde:</strong> Vacinado, vermifugado</div> */}
                   {/* <div className="sm:col-span-2"><strong className="font-medium text-gray-600">Temperamento:</strong> Alegre, brincalhão</div> */}
                 </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Modal para preenchimento de perfil */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <ProfileRequiredModal petName={pet.name} />
          </div>
        )}
        
        {/* Diálogo de confirmação de solicitação */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Solicitação Enviada!</DialogTitle>
              <DialogDescription>
                Sua solicitação para adoção de {pet.name} foi enviada com sucesso.
                Você será notificado quando houver uma atualização.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                onClick={() => {
                  setShowSuccessDialog(false);
                  navigate('/solicitacoes');
                }}
              >
                Ver minhas solicitações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      
    </div>
  );
};

export default PetDetails;

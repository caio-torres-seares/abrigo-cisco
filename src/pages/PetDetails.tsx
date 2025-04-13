
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

const PetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { isProfileComplete } = useProfile();
  const { toast } = useToast();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Simula a busca de detalhes do pet pelo ID
  // Em um aplicativo real, isso seria obtido de uma API
  const pet = {
    id: Number(id),
    name: 'Clebin',
    age: '2 anos',
    breed: 'SRD (Sem Raça Definida)',
    type: 'cachorro',
    image: '/lovable-uploads/037a58c8-aba7-450c-806c-511e7c709526.png',
    personality: ['Amigável', 'Brincalhão', 'Calmo'],
    gender: 'Macho',
    weight: '7kg',
    color: 'Amarelo',
    size: 'Médio',
    health: 'Vacinado, vermifugado e castrado',
    temperament: 'Alegre, brincalhão e muito carinhoso',
    goodWith: 'Crianças, outros cães e gatos',
    training: 'Já faz as necessidades no lugar certo e está desenvolvendo comandos básicos',
    history: 'Clebin foi resgatado das ruas e agora está esperando uma família amorosa para dar a melhor vida animal!'
  };

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

  const handleAdoptionRequest = () => {
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
      // Criar uma solicitação de adoção
      createAdoptionRequest(
        pet.id,
        user.id,
        pet.name,
        pet.image
      );
      
      setShowSuccessDialog(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          <span>Voltar</span>
        </button>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna da esquerda - Foto principal e informações básicas */}
            <div className="md:col-span-1 bg-amber-200 p-4 flex flex-col">
              <div className="flex justify-center mb-4">
                <img 
                  src={pet.image} 
                  alt={pet.name} 
                  className="w-full rounded-lg aspect-square object-cover"
                />
              </div>
              
              <div className="bg-white rounded-lg p-4 mt-auto">
                <h1 className="text-2xl font-bold mb-1">{pet.name}</h1>
                <p className="text-sm text-gray-500 mb-4">Último Atualizacao: 8 de Abril de 2023</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {pet.personality.map((trait, index) => (
                    <Badge 
                      key={index} 
                      className={`
                        ${index === 0 ? 'bg-primary-light text-primary hover:bg-primary' : ''}
                        ${index === 1 ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' : ''}
                        ${index === 2 ? 'bg-pink-100 text-pink-800 hover:bg-pink-200' : ''}
                      `}
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm mb-4">
                  {pet.name} é um cachorrinho lindo, carinhoso, mas também muito curioso. 
                  Ele está pronto para encher um lar com muita alegria, ternura e amor!
                </p>
                
                <div className="flex justify-center gap-2 mt-4">
                  <Badge className="rounded-full px-4 py-1 bg-red-500 text-white">{pet.gender}</Badge>
                  <Badge className="rounded-full px-4 py-1 bg-orange-300 text-white">{pet.age}</Badge>
                  <Badge className="rounded-full px-4 py-1 bg-purple-400 text-white">{pet.weight}</Badge>
                </div>
              </div>
            </div>
            
            {/* Coluna da direita - Detalhes e botão de adoção */}
            <div className="md:col-span-2 p-6">
              <h2 className="text-xl font-semibold mb-4">Informações</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-6">
                <div>
                  <p className="text-sm font-medium">Nome:</p>
                  <p>{pet.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Raça:</p>
                  <p>{pet.breed}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Idade:</p>
                  <p>{pet.age}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Peso:</p>
                  <p>{pet.weight}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Cor:</p>
                  <p>{pet.color}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Porte:</p>
                  <p>{pet.size}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium">Saúde:</p>
                  <p>{pet.health}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium">Temperamento:</p>
                  <p>{pet.temperament}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium">Convive bem com:</p>
                  <p>{pet.goodWith}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium">Treinamento:</p>
                  <p>{pet.training}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium">História:</p>
                  <p>{pet.history}</p>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-4">Imagens</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {additionalImages.map((img, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-md">
                    <img 
                      src={img}
                      alt={`${pet.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h2 className="text-xl font-semibold mb-4">Responsável</h2>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={caretaker.image} 
                    alt={caretaker.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{caretaker.name}</h3>
                    <p className="text-sm text-gray-600">
                      Cuida {pet.name.toLowerCase()} desde {caretaker.since}
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  Cuida do {pet.name.toLowerCase()} desde {caretaker.since}, durante uma situação de muita fome. Aqui no abrigo recebeu atenção, carinho e hoje está pronto para encontrar e conhecer um lar cheio de amor.
                </p>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleAdoptionRequest}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-8 py-6 rounded-full"
                >
                  Solicitar Adoção
                </Button>
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
      
      <Footer />
    </div>
  );
};

export default PetDetails;

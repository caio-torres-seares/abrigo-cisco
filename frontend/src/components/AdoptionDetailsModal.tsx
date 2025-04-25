import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Adoption } from '@/types/adoption';

interface AdoptionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  adoption: Adoption | null;
}

const AdoptionDetailsModal: React.FC<AdoptionDetailsModalProps> = ({
  isOpen,
  onClose,
  adoption
}) => {
  if (!adoption) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-800">
            Detalhes da Solicitação de Adoção
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="pet" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pet">Pet</TabsTrigger>
            <TabsTrigger value="user">Solicitante</TabsTrigger>
            <TabsTrigger value="profile">Perfil do Solicitante</TabsTrigger>
          </TabsList>

          <TabsContent value="pet" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Informações Básicas</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Nome:</span> {adoption.pet.name}</p>
                  <p><span className="font-medium">Espécie:</span> {adoption.pet.species}</p>
                  <p><span className="font-medium">Raça:</span> {adoption.pet.breed}</p>
                  <p><span className="font-medium">Idade:</span> {adoption.pet.age}</p>
                  <p><span className="font-medium">Gênero:</span> {adoption.pet.gender}</p>
                  <p><span className="font-medium">Tamanho:</span> {adoption.pet.size}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Status</h3>
                <div className="space-y-2">
                  <Badge className={`
                    ${adoption.pet.status === 'disponível' ? 'bg-green-100 text-green-800' :
                      adoption.pet.status === 'em processo de adoção' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'}
                  `}>
                    {adoption.pet.status}
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="user" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Informações Pessoais</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Nome:</span> {adoption.user.name}</p>
                  <p><span className="font-medium">Email:</span> {adoption.user.email}</p>
                  <p><span className="font-medium">Telefone:</span> {adoption.user.phone || 'Não informado'}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Solicitação</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Data:</span> {formatDate(adoption.createdAt)}</p>
                  <p><span className="font-medium">Status:</span> {adoption.status}</p>
                  {adoption.notes && (
                    <p><span className="font-medium">Observações:</span> {adoption.notes}</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            {adoption.user.profile ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Informações de Moradia</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Renda Mensal:</span> {adoption.user.profile.monthlyIncome}</p>
                    <p><span className="font-medium">Tipo de Moradia:</span> {adoption.user.profile.housingType}</p>
                    <p><span className="font-medium">Número de Cômodos:</span> {adoption.user.profile.roomsCount}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Experiência com Pets</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Possui Pets:</span> {adoption.user.profile.hasPets ? 'Sim' : 'Não'}</p>
                    {adoption.user.profile.hasPets && (
                      <p><span className="font-medium">Descrição:</span> {adoption.user.profile.petsDescription}</p>
                    )}
                    <p><span className="font-medium">Possui Crianças:</span> {adoption.user.profile.hasChildren ? 'Sim' : 'Não'}</p>
                    {adoption.user.profile.hasChildren && (
                      <p><span className="font-medium">Número de Crianças:</span> {adoption.user.profile.childrenCount}</p>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <h3 className="font-semibold text-lg mb-2">Disponibilidade</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Horas Disponíveis:</span> {adoption.user.profile.hoursAvailable}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">Perfil não encontrado</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdoptionDetailsModal; 
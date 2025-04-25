import React, { useState, useEffect } from 'react';
import EmployeeLayout from '@/components/EmployeeLayout';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Adoption } from '@/types/adoption';
import { adoptionService } from '@/services/adoptionService';
import AdoptionDetailsModal from '@/components/AdoptionDetailsModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdoptionRequests = () => {
  const [activeTab, setActiveTab] = useState<string>("pendente");
  const [requests, setRequests] = useState<Adoption[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Adoption | null>(null);
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, [activeTab]);

  const fetchRequests = async () => {
    try {
      const data = await adoptionService.listAllAdoptions();
      setRequests(data);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as solicitações.",
        variant: "destructive",
      });
    }
  };

  const handleAnalyzeRequest = (request: Adoption) => {
    setSelectedRequest(request);
    setShowAnalysisDialog(true);
  };

  const handleViewDetails = (request: Adoption) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = async (status: 'aprovada' | 'rejeitada') => {
    if (!selectedRequest) return;

    try {
      await adoptionService.updateAdoptionStatus(selectedRequest._id, { status });
      toast({
        title: "Sucesso",
        description: `Solicitação ${status === 'aprovada' ? 'aprovada' : 'rejeitada'} com sucesso.`,
      });
      setShowAnalysisDialog(false);
      fetchRequests();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status da solicitação.",
        variant: "destructive",
      });
    }
  };

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

  const filteredRequests = requests.filter(request => 
    activeTab === 'pendente' ? request.status === 'pendente' : request.status !== 'pendente'
  );

  return (
    <EmployeeLayout>
      <div className="w-full bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-amber-800">Analisar Solicitações de Adoção</h1>
        
        <Tabs defaultValue="pendente" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="pendente" className="px-6">Solicitações Pendentes</TabsTrigger>
            <TabsTrigger value="analisadas" className="px-6">Solicitações Analisadas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pendente">
            <Table>
              <TableHeader>
                <TableRow className="text-xs text-amber-800 bg-amber-50">
                  <TableHead>Nome do Pet</TableHead>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Data da Solicitação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request._id} className="text-amber-800 border-b border-amber-100">
                    <TableCell className="font-medium">{request.pet.name}</TableCell>
                    <TableCell>{request.user.name}</TableCell>
                    <TableCell>{formatDate(request.createdAt)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(request)}
                      >
                        Ver Detalhes
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleAnalyzeRequest(request)}
                      >
                        Analisar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="analisadas">
            <Table>
              <TableHeader>
                <TableRow className="text-xs text-amber-800 bg-amber-50">
                  <TableHead>Nome do Pet</TableHead>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data da Solicitação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request._id} className="text-amber-800 border-b border-amber-100">
                    <TableCell className="font-medium">{request.pet.name}</TableCell>
                    <TableCell>{request.user.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'aprovada' ? 'bg-green-100 text-green-800' :
                        request.status === 'rejeitada' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(request.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(request)}
                      >
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        <Dialog open={showAnalysisDialog} onOpenChange={setShowAnalysisDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Análise de Solicitação</DialogTitle>
              <DialogDescription>
                {selectedRequest && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Pet</h3>
                      <p>{selectedRequest.pet.name}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Solicitante</h3>
                      <p>{selectedRequest.user.name}</p>
                      <p className="text-sm text-gray-600">{selectedRequest.user.email}</p>
                    </div>
                    {selectedRequest.notes && (
                      <div>
                        <h3 className="font-medium">Observações</h3>
                        <p>{selectedRequest.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {selectedRequest?.status === 'pendente' && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => handleUpdateStatus('rejeitada')}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Rejeitar
                  </Button>
                  <Button 
                    onClick={() => handleUpdateStatus('aprovada')}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Aprovar
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AdoptionDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          adoption={selectedRequest}
        />
      </div>
    </EmployeeLayout>
  );
};

export default AdoptionRequests;

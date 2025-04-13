
import React, { useState } from 'react';
import EmployeeLayout from '@/components/EmployeeLayout';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AdoptionRequest = {
  id: string;
  petName: string;
  petId: string;
  requesterName: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'analyzed';
};

const AdoptionRequests = () => {
  const [activeTab, setActiveTab] = useState<string>("pending");
  
  // Mock data para demonstração
  const pendingRequests: AdoptionRequest[] = [
    { id: '#2354', petName: 'Fiofó', petId: '#12345', requesterName: 'Fernando Teixeira', date: '01/04/2025 13:23:36', status: 'pending' },
    { id: '#2355', petName: 'Stitch', petId: '#23554', requesterName: 'Suélen Almeida', date: '28/03/2025 15:30:56', status: 'pending' },
  ];
  
  const analyzedRequests: AdoptionRequest[] = [
    { id: '#2253', petName: 'Juca', petId: '#27344', requesterName: 'Caio Santos', date: '12/03/2025 16:30:40', status: 'analyzed' },
    { id: '#2252', petName: 'Mingau', petId: '#5535', requesterName: 'Augusto Mendes', date: '05/03/2025 09:15:08', status: 'analyzed' },
    { id: '#2251', petName: 'Cotelinha', petId: '#3281', requesterName: 'Fernando Freitas', date: '03/03/2025 14:12:29', status: 'analyzed' },
    { id: '#2250', petName: 'Clebin', petId: '#5599', requesterName: 'Thaís Swift', date: '01/03/2025 10:50:12', status: 'analyzed' },
  ];

  return (
    <EmployeeLayout>
      <div className="w-full bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-amber-800">Analisar Solicitações de Adoção</h1>
        
        <Tabs defaultValue="pending" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="pending" className="px-6">Solicitações Pendentes</TabsTrigger>
            <TabsTrigger value="analyzed" className="px-6">Solicitações Analisadas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <Table>
              <TableHeader>
                <TableRow className="text-xs text-amber-800 bg-amber-50">
                  <TableHead className="w-[120px]">Número da Solicitação</TableHead>
                  <TableHead>Nome do Pet</TableHead>
                  <TableHead>ID do Pet</TableHead>
                  <TableHead className="w-[180px]">Data e Hora da Solicitação</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((request) => (
                  <TableRow key={request.id} className="text-amber-800 border-b border-amber-100">
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.requesterName}</TableCell>
                    <TableCell>{request.petId}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                        Analisar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="analyzed">
            <Table>
              <TableHeader>
                <TableRow className="text-xs text-amber-800 bg-amber-50">
                  <TableHead className="w-[120px]">Número da Solicitação</TableHead>
                  <TableHead>Nome do Pet</TableHead>
                  <TableHead>ID do Pet</TableHead>
                  <TableHead className="w-[180px]">Data e Hora da Solicitação</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyzedRequests.map((request) => (
                  <TableRow key={request.id} className="text-amber-800 border-b border-amber-100">
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.requesterName}</TableCell>
                    <TableCell>{request.petId}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                        Visualizar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="text-amber-800 border-amber-300 hover:bg-amber-50">Ver mais</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeLayout>
  );
};

export default AdoptionRequests;

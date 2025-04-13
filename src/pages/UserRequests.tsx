
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { getUserRequests } from '@/services/adoptionService';
import { AdoptionRequest } from '@/types/adoption';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const UserRequests = () => {
  const { user } = useAuth();
  const { isProfileComplete } = useProfile();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  
  useEffect(() => {
    if (user) {
      const userRequests = getUserRequests(user.id);
      setRequests(userRequests);
    }
  }, [user]);
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'approved':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'rejected':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Em análise';
      case 'approved':
        return 'Aprovada';
      case 'rejected':
        return 'Recusada';
      default:
        return 'Desconhecido';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Minhas Solicitações</h1>
            <p className="text-gray-600">Acompanhe o status das suas solicitações de adoção</p>
          </div>
          
          {!isProfileComplete && (
            <Button 
              onClick={() => navigate('/perfil')}
              className="mt-4 md:mt-0 flex items-center gap-2"
            >
              <FileText size={16} />
              <span>Completar Perfil</span>
            </Button>
          )}
        </div>
        
        {requests.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <h2 className="text-xl font-semibold mb-4">Você ainda não tem solicitações</h2>
            <p className="text-gray-600 mb-6">
              Procure um pet para adotar e faça sua primeira solicitação!
            </p>
            <Button onClick={() => navigate('/pets')}>
              Procurar Pets
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={request.petImage} 
                    alt={request.petName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{request.petName}</h3>
                    <span 
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(request.status)}`}
                    >
                      {getStatusIcon(request.status)}
                      {getStatusText(request.status)}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>Solicitado em: {formatDate(request.createdAt)}</p>
                    {request.updatedAt !== request.createdAt && (
                      <p>Atualizado em: {formatDate(request.updatedAt)}</p>
                    )}
                  </div>
                  
                  {request.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm font-medium">Observações:</p>
                      <p className="text-sm">{request.notes}</p>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/pets/${request.petId}`)}
                    >
                      Ver detalhes do pet
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default UserRequests;


import { AdoptionRequest } from '@/types/adoption';

// Função para simular o armazenamento local das solicitações de adoção
const getStoredRequests = (): AdoptionRequest[] => {
  const storedRequests = localStorage.getItem('adoptionRequests');
  return storedRequests ? JSON.parse(storedRequests) : [];
};

// Função para salvar as solicitações no localStorage
const saveRequests = (requests: AdoptionRequest[]) => {
  localStorage.setItem('adoptionRequests', JSON.stringify(requests));
};

// Obter todas as solicitações
export const getAllRequests = (): AdoptionRequest[] => {
  return getStoredRequests();
};

// Obter solicitações de um usuário específico
export const getUserRequests = (userId: string): AdoptionRequest[] => {
  const requests = getStoredRequests();
  return requests.filter(request => request.userId === userId);
};

// Criar uma nova solicitação
export const createAdoptionRequest = (
  petId: number,
  userId: string,
  petName: string,
  petImage: string
): AdoptionRequest => {
  const requests = getStoredRequests();
  
  // Verificar se já existe uma solicitação pendente para este pet e usuário
  const existingRequest = requests.find(
    req => req.petId === petId && req.userId === userId && req.status === 'pending'
  );
  
  if (existingRequest) {
    return existingRequest;
  }
  
  const newRequest: AdoptionRequest = {
    id: Math.random().toString(36).substring(2, 11),
    petId,
    userId,
    petName,
    petImage,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  saveRequests([...requests, newRequest]);
  return newRequest;
};

// Atualizar o status de uma solicitação
export const updateRequestStatus = (
  requestId: string,
  status: 'approved' | 'rejected',
  notes?: string
): AdoptionRequest | null => {
  const requests = getStoredRequests();
  const requestIndex = requests.findIndex(req => req.id === requestId);
  
  if (requestIndex === -1) {
    return null;
  }
  
  const updatedRequest = {
    ...requests[requestIndex],
    status,
    notes,
    updatedAt: new Date().toISOString()
  };
  
  requests[requestIndex] = updatedRequest;
  saveRequests(requests);
  
  return updatedRequest;
};

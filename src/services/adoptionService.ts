import api from './api';
import { Pet } from './petService';

export interface Adoption {
  id: string;
  pet: Pet;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'cancelada';
  adoptionDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdoptionData {
  pet: string;
  notes?: string;
}

export interface UpdateAdoptionStatusData {
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'cancelada';
}

export interface AdoptionRequest {
  _id: string;
  petId: string;
  userId: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  createdAt: Date;
  updatedAt: Date;
}

export const adoptionService = {
  async listAdoptions(): Promise<Adoption[]> {
    const response = await api.get<Adoption[]>('/adoptions');
    return response.data;
  },

  async listAllAdoptions(): Promise<Adoption[]> {
    const response = await api.get<Adoption[]>('/adoptions/all');
    return response.data;
  },

  async requestAdoption(data: CreateAdoptionData): Promise<Adoption> {
    const response = await api.post<Adoption>('/adoptions', data);
    return response.data;
  },

  async updateAdoptionStatus(id: string, data: UpdateAdoptionStatusData): Promise<Adoption> {
    const response = await api.put<Adoption>(`/adoptions/${id}/status`, data);
    return response.data;
  },

  async cancelAdoption(id: string): Promise<Adoption> {
    const response = await api.put<Adoption>(`/adoptions/${id}/cancel`);
    return response.data;
  },

  async createAdoptionRequest(petId: string, userId: string, petName: string, petPhoto: string): Promise<AdoptionRequest> {
    const response = await api.post<AdoptionRequest>('/adoptions', {
      petId,
      userId,
      petName,
      petPhoto
    });
    return response.data;
  },

  async getAdoptionRequests(): Promise<AdoptionRequest[]> {
    const response = await api.get<AdoptionRequest[]>('/adoptions');
    return response.data;
  },

  async updateAdoptionStatusRequest(id: string, status: 'aprovado' | 'rejeitado'): Promise<AdoptionRequest> {
    const response = await api.put<AdoptionRequest>(`/adoptions/${id}`, { status });
    return response.data;
  }
};

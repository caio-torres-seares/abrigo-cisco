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
  }
};

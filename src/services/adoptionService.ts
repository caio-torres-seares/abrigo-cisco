import api from './api';
import { Adoption } from '@/types/adoption';

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

export const getUserRequests = async (userId: string): Promise<Adoption[]> => {
  const response = await api.get<Adoption[]>('/adoptions');
  return response.data;
};

export const createAdoptionRequest = async (petId: string, notes?: string): Promise<Adoption> => {
  const response = await api.post<Adoption>('/adoptions', { pet: petId, notes });
  return response.data;
};

export const updateAdoptionStatus = async (id: string, status: 'pendente' | 'aprovada' | 'rejeitada' | 'cancelada'): Promise<Adoption> => {
  const response = await api.put<Adoption>(`/adoptions/${id}/status`, { status });
  return response.data;
};

export const cancelAdoption = async (id: string): Promise<Adoption> => {
  const response = await api.put<Adoption>(`/adoptions/${id}/cancel`);
  return response.data;
};

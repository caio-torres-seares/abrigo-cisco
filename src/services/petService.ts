import api from './api';

export interface Pet {
  id: string;
  name: string;
  species: 'cachorro' | 'gato' | 'outro';
  breed?: string;
  age?: number;
  gender: 'macho' | 'fêmea';
  size?: 'pequeno' | 'médio' | 'grande';
  description?: string;
  photos?: string[];
  status: 'disponível' | 'em processo de adoção' | 'adotado';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePetData {
  name: string;
  species: 'cachorro' | 'gato' | 'outro';
  breed?: string;
  age?: number;
  gender: 'macho' | 'fêmea';
  size?: 'pequeno' | 'médio' | 'grande';
  description?: string;
  photos?: string[];
}

export interface UpdatePetData {
  name?: string;
  species?: 'cachorro' | 'gato' | 'outro';
  breed?: string;
  age?: number;
  gender?: 'macho' | 'fêmea';
  size?: 'pequeno' | 'médio' | 'grande';
  description?: string;
  photos?: string[];
  status?: 'disponível' | 'em processo de adoção' | 'adotado';
}

export const petService = {
  async listPets(): Promise<Pet[]> {
    const response = await api.get<Pet[]>('/pets');
    return response.data;
  },

  async getPetById(id: string): Promise<Pet> {
    const response = await api.get<Pet>(`/pets/${id}`);
    return response.data;
  },

  async createPet(data: CreatePetData): Promise<Pet> {
    const response = await api.post<Pet>('/pets', data);
    return response.data;
  },

  async updatePet(id: string, data: UpdatePetData): Promise<Pet> {
    const response = await api.put<Pet>(`/pets/${id}`, data);
    return response.data;
  },

  async deletePet(id: string): Promise<void> {
    await api.delete(`/pets/${id}`);
  }
}; 
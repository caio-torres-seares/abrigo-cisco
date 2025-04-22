import api from './api';

export interface Pet {
  _id: string;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  gender: 'macho' | 'fêmea';
  size: 'pequeno' | 'médio' | 'grande';
  description?: string;
  photos: string[];
  status: 'disponível' | 'em processo de adoção' | 'adotado';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePetData {
  name: string;
  species: string;
  breed?: string;
  age?: number;
  gender: 'macho' | 'fêmea';
  size: 'pequeno' | 'médio' | 'grande';
  description?: string;
  photos: string[];
  status: 'disponível' | 'em processo de adoção' | 'adotado';
}

export interface UpdatePetData {
  name?: string;
  species?: string;
  breed?: string;
  age?: number;
  gender?: 'macho' | 'fêmea';
  size?: 'pequeno' | 'médio' | 'grande';
  description?: string;
  photos?: string[];
  status?: 'disponível' | 'em processo de adoção' | 'adotado';
}

export const petService = {
  async getAllPets(): Promise<Pet[]> {
    const response = await api.get<Pet[]>('/pets');
    return response.data;
  },

  async getPetById(id: string): Promise<Pet> {
    const response = await api.get<Pet>(`/pets/${id}`);
    return response.data;
  },

  async createPet(data: FormData): Promise<Pet> {
    const response = await api.post<Pet>('/pets', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updatePet(id: string, data: UpdatePetData): Promise<Pet> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'photos') {
          (value as string[]).forEach(file => {
            formData.append('photos', file);
          });
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    const response = await api.put<Pet>(`/pets/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deletePet(id: string): Promise<void> {
    await api.delete(`/pets/${id}`);
  }
}; 
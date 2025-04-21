export interface AdoptionRequest {
  id: string;
  petId: number;
  userId: string;
  petName: string;
  petImage: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  notes?: string;
}

export interface Adoption {
  _id: string;
  pet: {
    _id: string;
    name: string;
    species: string;
    breed?: string;
    age?: number;
    gender: string;
    size?: string;
    photos: string[];
    status: string;
  };
  user: {
    _id: string;
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

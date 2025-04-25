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

export interface UserProfile {
  monthlyIncome: string;
  housingType: string;
  roomsCount: number;
  hasPets: boolean;
  petsDescription?: string;
  hasChildren: boolean;
  childrenCount?: number;
  hoursAvailable: string;
  isComplete: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profile?: UserProfile;
}

export interface Pet {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  status: string;
  photos?: string[];
}

export interface Adoption {
  _id: string;
  pet: Pet;
  user: User;
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'cancelada';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  adoptionDate?: string;
}

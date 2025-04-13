
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

import api from './api';

interface ProfileFormData {
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

export const profileService = {
  async createProfileAnalysis(data: ProfileFormData) {
    const response = await api.post('/profile-analysis', data);
    return response.data;
  },

  async getProfileAnalysis() {
    const response = await api.get('/profile-analysis/me');
    return response.data;
  },

  async updateProfileAnalysis(id: string, data: Partial<ProfileFormData>) {
    const response = await api.put(`/profile-analysis/${id}`, data);
    return response.data;
  }
}; 
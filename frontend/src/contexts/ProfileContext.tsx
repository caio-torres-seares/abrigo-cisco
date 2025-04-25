import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { profileService } from '@/services/profileService';

interface ProfileFormData {
  id?: string;
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

interface ProfileContextType {
  profile: ProfileFormData | null;
  isProfileComplete: boolean;
  updateProfile: (data: Partial<ProfileFormData> & { isComplete: boolean }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const initialProfile: ProfileFormData = {
  monthlyIncome: '',
  housingType: '',
  roomsCount: 0,
  hasPets: false,
  petsDescription: '',
  hasChildren: false,
  childrenCount: 0,
  hoursAvailable: '',
  isComplete: false
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<ProfileFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user && !authLoading) {
        try {
          setLoading(true);
          const response = await profileService.getProfileAnalysis();
          if (response.success) {
            setProfile(response.data);
          } else {
            setProfile(initialProfile);
          }
        } catch (err) {
          console.error('Erro ao carregar perfil:', err);
          setProfile(initialProfile);
        } finally {
          setLoading(false);
        }
      } else if (!user && !authLoading) {
        setProfile(null);
      }
    };

    loadProfile();
  }, [user, authLoading]);

  const updateProfile = async (data: Partial<ProfileFormData> & { isComplete: boolean }) => {
    if (!user) {
      setError('Usuário não autenticado');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const updatedProfile = { ...profile, ...data };
      
      if (profile?.id) {
        // Se já existe um perfil, atualiza
        await profileService.updateProfileAnalysis(profile.id, updatedProfile);
      } else {
        // Se não existe, cria um novo
        const response = await profileService.createProfileAnalysis(updatedProfile);
        updatedProfile.id = response.data.id;
      }

      setProfile(updatedProfile);
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError('Erro ao salvar perfil. Tente novamente.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isProfileComplete = profile?.isComplete || false;

  return (
    <ProfileContext.Provider value={{ profile, isProfileComplete, updateProfile, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile deve ser usado dentro de um ProfileProvider');
  }
  return context;
};

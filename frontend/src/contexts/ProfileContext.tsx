import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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

interface ProfileContextType {
  profile: ProfileFormData | null;
  isProfileComplete: boolean;
  updateProfile: (data: Partial<ProfileFormData> & { isComplete: boolean }) => void;
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
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileFormData | null>(null);

  useEffect(() => {
    // Carregar o perfil do localStorage quando o usuário fizer login
    if (user) {
      const storedProfile = localStorage.getItem(`profile_${user.email}`);
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      } else {
        setProfile(initialProfile);
      }
    } else {
      setProfile(null);
    }
  }, [user]);

  const updateProfile = (data: Partial<ProfileFormData> & { isComplete: boolean }) => {
    if (user) {
      const updatedProfile = { ...profile, ...data };
      setProfile(updatedProfile);
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(updatedProfile));
    }
  };

  const isProfileComplete = profile?.isComplete || false;

  return (
    <ProfileContext.Provider value={{ profile, isProfileComplete, updateProfile }}>
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

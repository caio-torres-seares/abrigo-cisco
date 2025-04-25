
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ProfileRequiredModalProps {
  petName: string;
}

const ProfileRequiredModal: React.FC<ProfileRequiredModalProps> = ({ petName }) => {
  const navigate = useNavigate();
  
  const handleFillProfile = () => {
    navigate('/perfil');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Opa!</h2>
      <p className="mb-6 text-center">
        Notamos que você ainda não preencheu o formulário de análise de perfil. 
        Para realizar a solicitação de adoção do(a) {petName}, pedimos que você 
        responda o formulário, clicando no botão abaixo:
      </p>
      <div className="flex justify-center">
        <Button
          onClick={handleFillProfile}
          className="bg-primary hover:bg-primary-dark text-primary-text font-medium px-4 py-2 rounded-md"
        >
          Análise de Perfil
        </Button>
      </div>
    </div>
  );
};

export default ProfileRequiredModal;

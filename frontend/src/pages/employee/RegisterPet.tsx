import React, { useState } from 'react';
import EmployeeLayout from '@/components/EmployeeLayout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { petService, CreatePetData } from '@/services/petService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterPet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<CreatePetData>({
    name: '',
    species: '',
    gender: 'macho',
    size: 'médio',
    photos: [],
    status: 'disponível'
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('species', formData.species);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('status', formData.status);
      
      if (formData.breed) formDataToSend.append('breed', formData.breed);
      if (formData.age) formDataToSend.append('age', formData.age.toString());
      if (formData.description) formDataToSend.append('description', formData.description);
      if (imageFile) formDataToSend.append('photos', imageFile);

      await petService.createPet(formDataToSend as any);
      toast({
        title: "Sucesso",
        description: "Pet cadastrado com sucesso.",
      });
      navigate('/funcionario/pets');
    } catch (error) {
      console.error('Erro ao cadastrar pet:', error);
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar o pet.",
        variant: "destructive",
      });
    }
  };

  return (
    <EmployeeLayout>
      <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-amber-800">Cadastrar Novo Pet</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium mb-4 text-center text-amber-800">Perfil do Pet</h2>
            
            <div className="flex flex-col items-center mb-6">
              <Label htmlFor="pet-image" className="cursor-pointer flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center overflow-hidden mb-2">
                  {selectedImage ? (
                    <img src={selectedImage} alt="Imagem do pet" className="w-full h-full object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-amber-600 hover:text-amber-800">Foto do Pet *</span>
                <Input id="pet-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </Label>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-name" className="text-sm text-amber-800">Nome do Pet *</Label>
                <Input 
                  id="pet-name" 
                  placeholder="Digite o nome do pet" 
                  className="border-amber-200 focus:border-amber-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-species" className="text-sm text-amber-800">Espécie *</Label>
                <Input 
                  id="pet-species" 
                  placeholder="Ex: Cachorro, Gato" 
                  className="border-amber-200"
                  value={formData.species}
                  onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-breed" className="text-sm text-amber-800">Raça</Label>
                <Input 
                  id="pet-breed" 
                  placeholder="Ex: Vira-lata, Siamês" 
                  className="border-amber-200"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-4 text-center text-amber-800">Informações do Pet</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-age" className="text-sm text-amber-800">Idade</Label>
                <Input 
                  id="pet-age" 
                  type="number"
                  placeholder="Ex: 2" 
                  className="border-amber-200"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-gender" className="text-sm text-amber-800">Gênero *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value: 'macho' | 'fêmea') => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="macho">Macho</SelectItem>
                    <SelectItem value="fêmea">Fêmea</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-size" className="text-sm text-amber-800">Porte *</Label>
                <Select
                  value={formData.size}
                  onValueChange={(value: 'pequeno' | 'médio' | 'grande') => setFormData({ ...formData, size: value })}
                >
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="Selecione o porte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pequeno">Pequeno</SelectItem>
                    <SelectItem value="médio">Médio</SelectItem>
                    <SelectItem value="grande">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-2">
              <Label htmlFor="pet-description" className="text-sm text-amber-800">Descrição</Label>
              <Textarea 
                id="pet-description" 
                placeholder="Descreva o pet" 
                className="border-amber-200 resize-none h-32"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-8">
          <Button 
            type="button"
            variant="outline" 
            className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => navigate('/funcionario/pets')}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Salvar
          </Button>
        </div>
      </form>
    </EmployeeLayout>
  );
};

export default RegisterPet;

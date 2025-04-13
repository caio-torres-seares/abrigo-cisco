
import React, { useState } from 'react';
import EmployeeLayout from '@/components/EmployeeLayout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RegisterPet = () => {
  const [petImage, setPetImage] = useState<string | null>(null);

  // Handler para upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <EmployeeLayout>
      <div className="w-full bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-amber-800">Edição dos Dados do Pet</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-medium mb-4 text-center text-amber-800">Perfil do Pet</h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center overflow-hidden mb-2">
                {petImage ? (
                  <img src={petImage} alt="Imagem do pet" className="w-full h-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
              </div>
              
              <Label htmlFor="pet-image" className="cursor-pointer text-sm text-amber-600 hover:text-amber-800">
                Foto do Pet *
                <Input id="pet-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </Label>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-name" className="text-sm text-amber-800">Nome do Pet *</Label>
                <Input id="pet-name" placeholder="Digite o nome do pet" className="border-amber-200 focus:border-amber-500" />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-type" className="text-sm text-amber-800">Tipo de Animal *</Label>
                <Select>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat">Gato</SelectItem>
                    <SelectItem value="dog">Cachorro</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-category" className="text-sm text-amber-800">Categoria do Pet *</Label>
                <Select>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adult">Adulto</SelectItem>
                    <SelectItem value="puppy">Filhote</SelectItem>
                    <SelectItem value="senior">Idoso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-4 text-center text-amber-800">Informações do Pet</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-species" className="text-sm text-amber-800">Espécie *</Label>
                <Input id="pet-species" placeholder="Ex: Siamês, Vira-lata" className="border-amber-200" />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-temperament" className="text-sm text-amber-800">Temperamento *</Label>
                <Input id="pet-temperament" placeholder="Ex: Dócil, Agitado" className="border-amber-200" />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-size" className="text-sm text-amber-800">Porte *</Label>
                <Select>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-age" className="text-sm text-amber-800">Idade *</Label>
                <Input id="pet-age" placeholder="Ex: 2 anos" className="border-amber-200" />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-weight" className="text-sm text-amber-800">Peso *</Label>
                <Input id="pet-weight" placeholder="Ex: 5kg" className="border-amber-200" />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-castrated" className="text-sm text-amber-800">Castrado? *</Label>
                <Select>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Sim</SelectItem>
                    <SelectItem value="no">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-color" className="text-sm text-amber-800">Cor *</Label>
                <Input id="pet-color" placeholder="Ex: Laranja e branco" className="border-amber-200" />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="pet-vaccination" className="text-sm text-amber-800">Vacinação *</Label>
                <Select>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="complete">Completa</SelectItem>
                    <SelectItem value="partial">Parcial</SelectItem>
                    <SelectItem value="none">Nenhuma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-2">
              <Label htmlFor="pet-history" className="text-sm text-amber-800">Saúde *</Label>
              <Textarea 
                id="pet-history" 
                placeholder="Descreva a condição de saúde do pet" 
                className="border-amber-200 resize-none h-20" 
              />
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-2">
              <Label htmlFor="pet-history" className="text-sm text-amber-800">História *</Label>
              <Textarea 
                id="pet-history" 
                placeholder="Conte um pouco sobre a história do pet" 
                className="border-amber-200 resize-none h-20" 
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4 text-center text-amber-800">Informações do Responsável</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="responsible-name" className="text-sm text-amber-800">Nome Completo do Responsável *</Label>
              <Input id="responsible-name" placeholder="Digite o nome completo" className="border-amber-200" />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="responsible-role" className="text-sm text-amber-800">Papel do Responsável *</Label>
              <Select>
                <SelectTrigger className="border-amber-200">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vet">Veterinário</SelectItem>
                  <SelectItem value="caretaker">Cuidador</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 gap-2">
            <Label htmlFor="responsible-description" className="text-sm text-amber-800">Breve descrição do Responsável sobre o Pet *</Label>
            <Textarea 
              id="responsible-description" 
              placeholder="Descreva sua experiência com o pet" 
              className="border-amber-200 resize-none h-24" 
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline" className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600">
            Cancelar
          </Button>
          <Button className="bg-green-500 text-white hover:bg-green-600">
            Salvar
          </Button>
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default RegisterPet;

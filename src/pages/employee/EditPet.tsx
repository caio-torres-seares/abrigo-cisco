import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageOff, Pencil } from 'lucide-react';
import EmployeeLayout from '@/components/EmployeeLayout';
import { useToast } from "@/hooks/use-toast";
import { petService, Pet, UpdatePetData } from '@/services/petService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from '@/services/api';

const EditPet = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<UpdatePetData>({});
  const [mainImageError, setMainImageError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPet();
    }
  }, [id]);

  const fetchPet = async () => {
    try {
      const data = await petService.getPetById(id!);
      setPet(data);
      setFormData({
        name: data.name,
        species: data.species.toLowerCase(),
        breed: data.breed,
        age: data.age,
        gender: data.gender,
        size: data.size,
        description: data.description,
        status: data.status
      });
      if (data.photos && data.photos.length > 0) {
        setPreviewImage(`http://localhost:3000${data.photos[0]}`);
      }
    } catch (error) {
      console.error('Erro ao buscar pet:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados do pet.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Adiciona os campos do formulário ao FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          formDataToSend.append(key, value.toString());
        }
      });

      // Adiciona a nova foto se houver
      if (selectedImage) {
        formDataToSend.append('photos', selectedImage);
      }

      // Envia o FormData diretamente para o endpoint
      await api.put(`/pets/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast({
        title: "Sucesso",
        description: "Pet atualizado com sucesso.",
        variant: "default"
      });
      navigate('/funcionario/pets');
    } catch (error) {
      console.error('Erro ao atualizar pet:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o pet. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    navigate('/funcionario/pets');
  };

  if (loading) {
    return (
      <EmployeeLayout>
        <div className="w-full bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-center mb-6">Carregando...</h1>
        </div>
      </EmployeeLayout>
    );
  }

  if (!pet) {
    return (
      <EmployeeLayout>
        <div className="w-full bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-center mb-6">Pet não encontrado</h1>
        </div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Edição dos Dados do Pet</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coluna da esquerda - Dados básicos */}
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Perfil do Pet</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Pet *</Label>
                  <Input 
                    id="name" 
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="pet-image">Foto do Pet</Label>
                  <div className="mt-2 relative">
                    <Label htmlFor="pet-image" className="cursor-pointer">
                      <div className="w-32 h-32 rounded-lg border flex items-center justify-center overflow-hidden">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt={`Foto de ${pet.name}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <ImageOff className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <Input 
                        id="pet-image" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Informações do Pet</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="species">Espécie *</Label>
                  <Input 
                    id="species" 
                    value={formData.species || ''}
                    onChange={(e) => setFormData({ ...formData, species: e.target.value.toLowerCase() })}
                    required 
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.species ? formData.species.charAt(0).toUpperCase() + formData.species.slice(1) : ''}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="breed">Raça</Label>
                  <Input 
                    id="breed" 
                    value={formData.breed || ''}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="age">Idade</Label>
                  <Input 
                    id="age" 
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gênero *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value: 'macho' | 'fêmea') => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="macho">Macho</SelectItem>
                      <SelectItem value="fêmea">Fêmea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="size">Porte *</Label>
                  <Select
                    value={formData.size}
                    onValueChange={(value: 'pequeno' | 'médio' | 'grande') => setFormData({ ...formData, size: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o porte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pequeno">Pequeno</SelectItem>
                      <SelectItem value="médio">Médio</SelectItem>
                      <SelectItem value="grande">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'disponível' | 'em processo de adoção' | 'adotado') => 
                      setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disponível">Disponível</SelectItem>
                      <SelectItem value="em processo de adoção">Em processo de adoção</SelectItem>
                      <SelectItem value="adotado">Adotado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coluna da direita - Descrição */}
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Descrição</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Descrição do Pet</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-8">
              <Button 
                type="button" 
                variant="outline" 
                className="rounded-full px-6"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-green-500 hover:bg-green-600 rounded-full px-6"
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </EmployeeLayout>
  );
};

export default EditPet;
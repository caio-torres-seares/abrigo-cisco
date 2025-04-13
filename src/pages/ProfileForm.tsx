
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useProfile } from '@/contexts/ProfileContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProfileForm = () => {
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm({
    defaultValues: {
      monthlyIncome: profile?.monthlyIncome || '',
      housingType: profile?.housingType || '',
      roomsCount: profile?.roomsCount || 1,
      hasPets: profile?.hasPets || false,
      petsDescription: profile?.petsDescription || '',
      hasChildren: profile?.hasChildren || false,
      childrenCount: profile?.childrenCount || 0,
      hoursAvailable: profile?.hoursAvailable || '',
    },
  });
  
  const { watch, setValue } = form;
  const hasPets = watch('hasPets');
  const hasChildren = watch('hasChildren');

  const onSubmit = (data: any) => {
    updateProfile({
      ...data,
      isComplete: true
    });
    
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
    
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 px-4 md:px-8 max-w-3xl mx-auto w-full">
        <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">Formulário de Análise de Perfil</h1>
          <p className="text-center text-gray-600 mb-8">
            Faremos algumas perguntas para analisar seu perfil como adotante.
            Por favor, responda com honestidade e responsabilidade!
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual sua renda mensal?*</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: R$ 3.000,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="housingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual seu tipo de moradia?*</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Apartamento, Casa, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="roomsCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantos cômodos existem na sua moradia?*</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} onChange={e => setValue('roomsCount', parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hasPets"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Possui experiência com pets?*</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={value => setValue('hasPets', value === 'true')}
                        defaultValue={field.value ? 'true' : 'false'}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {hasPets && (
                <FormField
                  control={form.control}
                  name="petsDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Se sim, descreva:</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva sua experiência com animais de estimação" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="hasChildren"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tem criança(s) em casa?*</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={value => setValue('hasChildren', value === 'true')}
                        defaultValue={field.value ? 'true' : 'false'}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {hasChildren && (
                <FormField
                  control={form.control}
                  name="childrenCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Se sim, quantas?</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0} 
                          {...field} 
                          onChange={e => setValue('childrenCount', parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="hoursAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantas horas por dia serão disponibilizadas para seu pet?*</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 4 horas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 border-none"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfileForm;

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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  monthlyIncome: z.string()
    .min(1, 'Renda mensal é obrigatória')
    .refine((val) => {
      const numericValue = parseFloat(val.replace(/[^\d,]/g, '').replace(',', '.'));
      return !isNaN(numericValue) && numericValue > 0;
    }, 'Renda mensal deve ser um valor válido'),
  housingType: z.string().min(1, 'Tipo de moradia é obrigatório'),
  roomsCount: z.number().min(1, 'Número de cômodos deve ser maior que 0'),
  hasPets: z.boolean().refine((val) => val !== undefined, 'Selecione uma opção'),
  petsDescription: z.string().optional(),
  hasChildren: z.boolean().refine((val) => val !== undefined, 'Selecione uma opção'),
  childrenCount: z.number().min(0, 'Número de crianças não pode ser negativo'),
  hoursAvailable: z.string().min(1, 'Horas disponíveis é obrigatório'),
});

type ProfileFormData = z.infer<typeof formSchema>;

const ProfileForm = () => {
  const { profile, updateProfile, loading, error } = useProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyIncome: profile?.monthlyIncome || '',
      housingType: profile?.housingType ? profile.housingType.charAt(0).toUpperCase() + profile.housingType.slice(1) : '',
      roomsCount: profile?.roomsCount || 1,
      hasPets: profile?.hasPets,
      petsDescription: profile?.petsDescription || '',
      hasChildren: profile?.hasChildren,
      childrenCount: profile?.childrenCount || 0,
      hoursAvailable: profile?.hoursAvailable || '',
    },
  });
  
  const { watch, setValue } = form;
  const hasPets = watch('hasPets');
  const hasChildren = watch('hasChildren');

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (!numericValue) return '';
    return `R$ ${(parseInt(numericValue) / 100).toFixed(2).replace('.', ',')}`;
  };

  const handleMonthlyIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCurrency(value);
    setValue('monthlyIncome', formattedValue);
  };

  const handleHousingTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setValue('housingType', capitalizedValue);
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        ...data,
        isComplete: true
      } as ProfileFormData & { isComplete: boolean });
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
      
      navigate(-1);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar suas informações. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-6 px-4 md:px-8 max-w-3xl mx-auto w-full">
        <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">Formulário de Análise de Perfil</h1>
          <p className="text-center text-gray-600 mb-8">
            Faremos algumas perguntas para analisar seu perfil como adotante.
            Por favor, responda com honestidade e responsabilidade!
          </p>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual sua renda mensal?*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: R$ 3.000,00" 
                        {...field}
                        onChange={handleMonthlyIncomeChange}
                        onBlur={() => {
                          if (field.value && !field.value.startsWith('R$')) {
                            setValue('monthlyIncome', `R$ ${field.value}`);
                          }
                        }}
                        disabled={loading}
                      />
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
                      <Input 
                        placeholder="Ex: Apartamento, Casa, etc." 
                        {...field}
                        onChange={handleHousingTypeChange}
                        disabled={loading}
                      />
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
                      <Input 
                        type="number" 
                        min={1} 
                        {...field} 
                        onChange={e => setValue('roomsCount', parseInt(e.target.value))}
                        disabled={loading}
                      />
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
                        value={field.value?.toString()}
                        className="flex flex-col space-y-1"
                        disabled={loading}
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
                          disabled={loading}
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
                        value={field.value?.toString()}
                        className="flex flex-col space-y-1"
                        disabled={loading}
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
                          disabled={loading}
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
                      <Input 
                        placeholder="Ex: 4 horas" 
                        {...field}
                        disabled={loading}
                      />
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
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white"
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default ProfileForm;

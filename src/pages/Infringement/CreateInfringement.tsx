// pages/Infringement/CreateInfringement.tsx
import { useRouter } from 'next/router';
import { InfringementForm } from '../../components/Infringement/InfringementForm';
import { InfringementService } from '../../services/InfringementService';
import { Infringement } from '../../models/Infringement';

export default function CreateInfringement() {
  const router = useRouter();

  const handleSubmit = async (data: Omit<Infringement, 'id'>) => {
    try {
      await InfringementService.create(data);
      router.push('/Infringement');
    } catch (error) {
      console.error('Error creating infringement:', error);
      alert('Error al crear la infracción');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Crear Tipo de Infracción</h1>
      <InfringementForm onSubmit={handleSubmit} />
    </div>
  );
}
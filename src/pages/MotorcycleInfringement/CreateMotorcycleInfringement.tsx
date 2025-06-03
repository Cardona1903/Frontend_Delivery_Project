// pages/MotorcycleInfringement/CreateMotorcycleInfringement.tsx
import { useRouter } from 'next/router';
import { MotorcycleInfringementForm } from '../../components/MotorcycleInfringement/MotorcycleInfringementForm';
import { MotorcycleInfringementService } from '../../services/MotorcycleInfringementService';
import { MotorcycleInfringement } from '../../models/MotorcycleInfringement';

export default function CreateMotorcycleInfringement() {
  const router = useRouter();

  const handleSubmit = async (data: Omit<MotorcycleInfringement, 'id'>) => {
    try {
      await MotorcycleInfringementService.create(data);
      router.push('/MotorcycleInfringement');
    } catch (error) {
      console.error('Error creating infringement:', error);
      alert('Error al crear la infracción');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Crear Infracción de Moto</h1>
      <MotorcycleInfringementForm onSubmit={handleSubmit} />
    </div>
  );
}
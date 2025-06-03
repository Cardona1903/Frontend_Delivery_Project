// components/MotorcycleInfringement/MotorcycleInfringementForm.tsx
import { useState, useEffect } from 'react';
import { MotorcycleInfringement } from '../../models/MotorcycleInfringement';
import { InfringementService } from '../../services/InfringementService';
import { Infringement } from '../../models/Infringement';

interface MotorcycleInfringementFormProps {
  initialData?: Partial<MotorcycleInfringement>;
  onSubmit: (data: Omit<MotorcycleInfringement, 'id'>) => Promise<void>;
}

export const MotorcycleInfringementForm = ({ initialData, onSubmit }: MotorcycleInfringementFormProps) => {
  const [formData, setFormData] = useState<Omit<MotorcycleInfringement, 'id'>>({
    infringementId: initialData?.infringementId || 0,
    motorcycleId: initialData?.motorcycleId || 0,
    date: initialData?.date || new Date().toISOString().split('T')[0],
  });
  const [infringements, setInfringements] = useState<Infringement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInfringements = async () => {
      try {
        const data = await InfringementService.getAll();
        setInfringements(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading infringements:', error);
        setIsLoading(false);
      }
    };
    loadInfringements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  if (isLoading) return <div>Cargando tipos de infracción...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Tipo de Infracción</label>
        <select
          value={formData.infringementId}
          onChange={(e) => setFormData({ ...formData, infringementId: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccione una infracción</option>
          {infringements.map((inf) => (
            <option key={inf.id} value={inf.id}>
              {inf.type} - {inf.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Placa de la Moto</label>
        <input
          type="text"
          value={formData.motorcycleId} // Esto debería ser un select en una implementación real
          onChange={(e) => setFormData({ ...formData, motorcycleId: parseInt(e.target.value) || 0 })}
          placeholder="ID de la moto"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Fecha</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {initialData?.id ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};
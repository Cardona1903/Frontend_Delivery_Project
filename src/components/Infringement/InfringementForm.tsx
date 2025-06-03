// components/Infringement/InfringementForm.tsx
import { useState } from 'react';
import { Infringement } from '../../models/Infringement';

interface InfringementFormProps {
  initialData?: Partial<Infringement>;
  onSubmit: (data: Omit<Infringement, 'id'>) => Promise<void>;
}

export const InfringementForm = ({ initialData, onSubmit }: InfringementFormProps) => {
  const [formData, setFormData] = useState<Omit<Infringement, 'id'>>({
    name: initialData?.name || '',
    type: initialData?.type || 'VELOCIDAD',
    description: initialData?.description || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Tipo</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="VELOCIDAD">Velocidad</option>
          <option value="LLANTAS">Llantas</option>
          <option value="PAPELES">Papeles</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Descripción</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
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
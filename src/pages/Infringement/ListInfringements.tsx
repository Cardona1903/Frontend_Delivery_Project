// pages/Infringement/ListInfringements.tsx
import { useState, useEffect } from 'react';
import { InfringementTable } from '../../components/Infringement/InfringementTable';
import { InfringementService } from '../../services/InfringementService';
import Link from 'next/link';
import { Infringement } from '../../models/Infringement';

export default function ListInfringements() {
  const [data, setData] = useState<Infringement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const infringements = await InfringementService.getAll();
        setData(infringements);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) return <div>Cargando infracciones...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tipos de Infracciones</h1>
        <Link
          href="/Infringement/CreateInfringement"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Crear Nueva Infracción
        </Link>
      </div>
      <InfringementTable data={data} />
    </div>
  );
}
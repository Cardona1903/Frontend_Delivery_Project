// pages/MotorcycleInfringement/ListMotorcycleInfringements.tsx
import { useState, useEffect } from 'react';
import { MotorcycleInfringementTable } from '../../components/MotorcycleInfringement/MotorcycleInfringementTable';
import { MotorcycleInfringementService } from '../../services/MotorcycleInfringementService';
import { Link } from "react-router-dom";
import { MotorcycleInfringement } from '../../models/MotorcycleInfringement';

export default function ListMotorcycleInfringements() {
  const [data, setData] = useState<MotorcycleInfringement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const infringements = await MotorcycleInfringementService.getAll();
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
        <h1 className="text-2xl font-bold">Infracciones de Motos</h1>
        <Link
                  ref="/MotorcycleInfringement/CreateMotorcycleInfringement"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" to={''}        >
          Crear Nueva Infracción
        </Link>
      </div>
      <MotorcycleInfringementTable data={data} />
    </div>
  );
}
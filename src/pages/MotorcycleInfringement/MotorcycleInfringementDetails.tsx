// pages/MotorcycleInfringement/MotorcycleInfringementDetails.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MotorcycleInfringementService } from '../../services/MotorcycleInfringementService';
import { MotorcycleInfringement } from '../../models/MotorcycleInfringement';
import Link from 'next/link';

export default function MotorcycleInfringementDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<MotorcycleInfringement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const infringement = await MotorcycleInfringementService.getById(Number(id));
        setData(infringement);
      } catch (error) {
        console.error('Error loading infringement:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (isLoading) return <div>Cargando...</div>;
  if (!data) return <div>Infracción no encontrada</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalles de Infracción</h1>
        <Link
          href="/MotorcycleInfringement"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Volver
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Información de la Infracción</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Tipo:</span> {data.infringement?.type}</p>
              <p><span className="font-medium">Nombre:</span> {data.infringement?.name}</p>
              <p><span className="font-medium">Descripción:</span> {data.infringement?.description || 'N/A'}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Información de la Moto</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Placa:</span> {data.motorcycle?.licensePlate}</p>
              <p><span className="font-medium">Marca:</span> {data.motorcycle?.brand}</p>
              <p><span className="font-medium">Modelo:</span> {data.motorcycle?.model}</p>
              <p><span className="font-medium">Año:</span> {data.motorcycle?.year}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">Detalles Adicionales</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Fecha:</span> {new Date(data.date).toLocaleString()}</p>
              <p><span className="font-medium">Estado:</span> {data.motorcycle?.status || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
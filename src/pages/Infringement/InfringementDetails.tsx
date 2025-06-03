// pages/Infringement/InfringementDetails.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InfringementService } from '../../services/InfringementService';
import { Infringement } from '../../models/Infringement';
import Link from 'next/link';

export default function InfringementDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Infringement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const infringement = await InfringementService.getById(Number(id));
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
          href="/Infringement"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Volver
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Información Básica</h2>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Nombre:</p>
                <p>{data.name}</p>
              </div>
              <div>
                <p className="font-medium">Tipo:</p>
                <p>{data.type}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Descripción</h2>
            <p className="mt-2 whitespace-pre-line">{data.description || 'No hay descripción'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Creado:</p>
              <p>{data.createdAt ? new Date(data.createdAt).toLocaleString() : 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium">Actualizado:</p>
              <p>{data.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
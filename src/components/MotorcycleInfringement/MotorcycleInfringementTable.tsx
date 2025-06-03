// components/MotorcycleInfringement/MotorcycleInfringementTable.tsx
import { MotorcycleInfringement } from '../../models/MotorcycleInfringement';
import { Link } from "react-router-dom";

interface MotorcycleInfringementTableProps {
  data: MotorcycleInfringement[];
}

export const MotorcycleInfringementTable = ({ data }: MotorcycleInfringementTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Infracción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Moto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {item.infringement?.type || 'No especificado'}
                </div>
                <div className="text-sm text-gray-500">
                  {item.infringement?.name || 'Sin descripción'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {item.motorcycle?.licensePlate || 'No especificado'}
                </div>
                <div className="text-sm text-gray-500">
                  {item.motorcycle?.brand} - {item.motorcycle?.model}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                          ref={`/MotorcycleInfringement/${item.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4" to={''}                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
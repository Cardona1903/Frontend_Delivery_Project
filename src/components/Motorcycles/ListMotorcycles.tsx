import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getMotorcycles, deleteMotorcycle } from "../../services/MotorcycleService";
import Swal from "sweetalert2";
import { Motorcycle } from "../../models/Motorcycle";

const ListMotorcycles = () => {
    const [data, setData] = useState<Motorcycle[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const motorcycles = await getMotorcycles();
        setData(motorcycles);
    };

    const handleView = (id: number) => {
        console.log(`Ver motocicleta con ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        console.log(`Editar motocicleta con ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar esta motocicleta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteMotorcycle(id);
                if (success) {
                    Swal.fire("Eliminada", "La motocicleta ha sido eliminada", "success");
                }
                fetchData();
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado de Motocicletas
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Placa</th>
                                        <th scope="col" className="px-6 py-3">Marca</th>
                                        <th scope="col" className="px-6 py-3">Año</th>
                                        <th scope="col" className="px-6 py-3">Estado</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((motorcycle) => (
                                        <tr key={motorcycle.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{motorcycle.license_plate}</td>
                                            <td className="px-6 py-4">{motorcycle.brand}</td>
                                            <td className="px-6 py-4">{motorcycle.year}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full ${motorcycle.status === 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {motorcycle.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(motorcycle.id!)} className="text-blue-600 dark:text-blue-500">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(motorcycle.id!)} className="text-yellow-600 dark:text-yellow-500">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(motorcycle.id!)} className="text-red-600 dark:text-red-500">
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListMotorcycles;
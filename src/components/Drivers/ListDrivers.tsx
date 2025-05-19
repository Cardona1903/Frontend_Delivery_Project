import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { deleteDriver, getDrivers } from "../../services/driverService"; // <-- Corregido
import Swal from "sweetalert2";
import { Driver } from "../../models/Driver";

const ListDrivers = () => {
    const [data, setData] = useState<Driver[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const drivers = await getDrivers();
        setData(drivers);
    };

    const handleView = (id: number) => {
        console.log(`Ver conductor con ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        console.log(`Editar conductor con ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar este conductor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteDriver(id);
                if (success) {
                    Swal.fire("Eliminado", "El conductor ha sido eliminado", "success");
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
                            Listado de Conductores
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nombre</th>
                                        <th scope="col" className="px-6 py-3">Correo</th>
                                        <th scope="col" className="px-6 py-3">Teléfono</th>
                                        <th scope="col" className="px-6 py-3">Licencia</th>
                                        <th scope="col" className="px-6 py-3">Estado</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((driver) => (
                                        <tr key={driver.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{driver.name}</td>
                                            <td className="px-6 py-4">{driver.email}</td>
                                            <td className="px-6 py-4">{driver.phone}</td>
                                            <td className="px-6 py-4">{driver.license_number}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full ${driver.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {driver.is_active ? "Activo" : "Inactivo"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(driver.id!)} className="text-blue-600 dark:text-blue-500">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(driver.id!)} className="text-yellow-600 dark:text-yellow-500">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(driver.id!)} className="text-red-600 dark:text-red-500">
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

export default ListDrivers;
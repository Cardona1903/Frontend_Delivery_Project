import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getShifts, deleteShift } from "../../services/ShiftService";
import Swal from "sweetalert2";
import { Shift } from "../../models/Shift";

const ListShifts = () => {
    const [data, setData] = useState<Shift[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const shifts = await getShifts();
        setData(shifts);
    };

    const handleView = (id: number) => {
        console.log(`Ver turno con ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        console.log(`Editar turno con ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar este turno?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteShift(id);
                if (success) {
                    Swal.fire("Eliminado", "El turno ha sido eliminado", "success");
                }
                fetchData();
            }
        });
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado de Turnos
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">ID</th>
                                        <th scope="col" className="px-6 py-3">Horario</th>
                                        <th scope="col" className="px-6 py-3">Estado</th>
                                        <th scope="col" className="px-6 py-3">Conductor</th>
                                        <th scope="col" className="px-6 py-3">Motocicleta</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((shift) => (
                                        <tr key={shift.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{shift.id}</td>
                                            <td className="px-6 py-4">
                                                {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full ${
                                                    shift.status === 'Completado' ? 'bg-green-100 text-green-800' : 
                                                    shift.status === 'En curso' ? 'bg-blue-100 text-blue-800' : 
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {shift.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{shift.driver_id}</td>
                                            <td className="px-6 py-4">{shift.motorcycle_id}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(shift.id!)} className="text-blue-600 dark:text-blue-500">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(shift.id!)} className="text-yellow-600 dark:text-yellow-500">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(shift.id!)} className="text-red-600 dark:text-red-500">
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

export default ListShifts;
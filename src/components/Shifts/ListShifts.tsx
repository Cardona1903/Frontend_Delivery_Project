import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getShifts, deleteShift, updateShift } from "../../services/ShiftService";
import Swal from "sweetalert2";
import { Shift } from "../../models/Shift";

const ListShifts = () => {
    const [data, setData] = useState<Shift[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentShift, setCurrentShift] = useState<Shift | null>(null);
    const [formData, setFormData] = useState({
        start_time: "",
        end_time: "",
        status: "",
        driver_id: "",
        motorcycle_id: ""
    });

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
        const shiftToEdit = data.find(shift => shift.id === id);
        if (shiftToEdit) {
            setCurrentShift(shiftToEdit);
            
            // Formatear las fechas para el input datetime-local
            const formatDateForInput = (date: Date) => {
                return new Date(date).toISOString().slice(0, 16);
            };
            
            setFormData({
                start_time: formatDateForInput(shiftToEdit.start_time),
                end_time: formatDateForInput(shiftToEdit.end_time),
                status: shiftToEdit.status,
                driver_id: shiftToEdit.driver_id.toString(),
                motorcycle_id: shiftToEdit.motorcycle_id.toString()
            });
            
            setIsEditModalOpen(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentShift) return;

        try {
            const updatedShift = {
                ...currentShift,
                start_time: new Date(formData.start_time),
                end_time: new Date(formData.end_time),
                status: formData.status,
                driver_id: parseInt(formData.driver_id),
                motorcycle_id: parseInt(formData.motorcycle_id)
            };
            
            const success = await updateShift(currentShift.id!, updatedShift);
            
            if (success) {
                Swal.fire({
                    title: "Actualizado",
                    text: "El turno ha sido actualizado correctamente",
                    icon: "success"
                });
                setIsEditModalOpen(false);
                fetchData();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar el turno",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error al actualizar el turno:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar el turno",
                icon: "error"
            });
        }
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

    // Opciones para el estado del turno
    const statusOptions = ["Programado", "En curso", "Completado", "Cancelado"];

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
                                                    shift.status === 'Cancelado' ? 'bg-red-100 text-red-800' :
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

            {/* Modal de Edición */}
            {isEditModalOpen && currentShift && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Editar Turno</h2>
                        <form onSubmit={handleSubmitEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Hora de Inicio
                                </label>
                                <input
                                    type="datetime-local"
                                    name="start_time"
                                    value={formData.start_time}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Hora de Fin
                                </label>
                                <input
                                    type="datetime-local"
                                    name="end_time"
                                    value={formData.end_time}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Estado
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                >
                                    {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    ID del Conductor
                                </label>
                                <input
                                    type="number"
                                    name="driver_id"
                                    value={formData.driver_id}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    ID de la Motocicleta
                                </label>
                                <input
                                    type="number"
                                    name="motorcycle_id"
                                    value={formData.motorcycle_id}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4.5">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray-100 hover:bg-opacity-90"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListShifts;
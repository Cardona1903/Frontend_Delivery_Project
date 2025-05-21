import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  getMotorcycleInfringements, 
  deleteMotorcycleInfringement, 
  updateMotorcycleInfringement 
} from "../../services/MotorcycleInfringementService";
import Swal from "sweetalert2";
import { MotorcycleInfringement } from "../../models/MotorcycleInfringement";

const ListMotorcycleInfringements = () => {
    const [data, setData] = useState<MotorcycleInfringement[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<MotorcycleInfringement | null>(null);
    const [formData, setFormData] = useState({
        date: "",
        motorcycle_id: 0,
        infringement_id: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const items = await getMotorcycleInfringements();
        setData(items);
    };

    const handleView = (id: number) => {
        console.log(`Ver registro con ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        const itemToEdit = data.find(item => item.id === id);
        if (itemToEdit) {
            setCurrentItem(itemToEdit);
            setFormData({
                date: itemToEdit.date.split('T')[0], // Formatea la fecha para el input
                motorcycle_id: itemToEdit.motorcycle_id,
                infringement_id: itemToEdit.infringement_id
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
        if (!currentItem) return;

        try {
            const updatedItem = {
                ...currentItem,
                date: new Date(formData.date).toISOString(),
                motorcycle_id: Number(formData.motorcycle_id),
                infringement_id: Number(formData.infringement_id)
            };
            
            const success = await updateMotorcycleInfringement(currentItem.id!, updatedItem);
            
            if (success) {
                Swal.fire({
                    title: "Actualizado",
                    text: "El registro ha sido actualizado correctamente",
                    icon: "success"
                });
                setIsEditModalOpen(false);
                fetchData();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar el registro",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error al actualizar:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar el registro",
                icon: "error"
            });
        }
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar este registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteMotorcycleInfringement(id);
                if (success) {
                    Swal.fire("Eliminado", "El registro ha sido eliminado", "success");
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
                            Registro de Infracciones de Motocicletas
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">ID</th>
                                        <th scope="col" className="px-6 py-3">Fecha</th>
                                        <th scope="col" className="px-6 py-3">Motocicleta</th>
                                        <th scope="col" className="px-6 py-3">Infracción</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.id}</td>
                                            <td className="px-6 py-4">{new Date(item.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">{item.motorcycle?.license_plate || 'N/A'}</td>
                                            <td className="px-6 py-4">{item.infringement?.name || 'N/A'}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(item.id!)} className="text-blue-600 dark:text-blue-500">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(item.id!)} className="text-yellow-600 dark:text-yellow-500">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(item.id!)} className="text-red-600 dark:text-red-500">
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
            {isEditModalOpen && currentItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Editar Registro</h2>
                        <form onSubmit={handleSubmitEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Motocicleta
                                </label>
                                <select
                                    name="motorcycle_id"
                                    value={formData.motorcycle_id}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    {/* Aquí deberías cargar las opciones de motocicletas desde tu API */}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Infracción
                                </label>
                                <select
                                    name="infringement_id"
                                    value={formData.infringement_id}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    {/* Aquí deberías cargar las opciones de infracciones desde tu API */}
                                </select>
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

export default ListMotorcycleInfringements;
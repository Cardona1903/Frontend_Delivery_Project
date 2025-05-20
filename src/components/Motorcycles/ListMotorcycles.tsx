import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getMotorcycles, deleteMotorcycle, updateMotorcycle } from "../../services/MotorcycleService";
import Swal from "sweetalert2";
import { Motorcycle } from "../../models/Motorcycle";

const ListMotorcycles = () => {
    const [data, setData] = useState<Motorcycle[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentMotorcycle, setCurrentMotorcycle] = useState<Motorcycle | null>(null);
    const [formData, setFormData] = useState({
        license_plate: "",
        brand: "",
        model: "",
        year: "",
        status: ""
    });

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
        const motorcycleToEdit = data.find(motorcycle => motorcycle.id === id);
        if (motorcycleToEdit) {
            setCurrentMotorcycle(motorcycleToEdit);
            setFormData({
                license_plate: motorcycleToEdit.license_plate,
                brand: motorcycleToEdit.brand,
                model: motorcycleToEdit.model || "",
                year: motorcycleToEdit.year.toString(),
                status: motorcycleToEdit.status
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
        if (!currentMotorcycle) return;

        try {
            const updatedMotorcycle = {
                ...currentMotorcycle,
                license_plate: formData.license_plate,
                brand: formData.brand,
                model: formData.model,
                year: parseInt(formData.year),
                status: formData.status
            };
            
            const success = await updateMotorcycle(currentMotorcycle.id!, updatedMotorcycle);
            
            if (success) {
                Swal.fire({
                    title: "Actualizada",
                    text: "La motocicleta ha sido actualizada correctamente",
                    icon: "success"
                });
                setIsEditModalOpen(false);
                fetchData();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar la motocicleta",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error al actualizar la motocicleta:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar la motocicleta",
                icon: "error"
            });
        }
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

            {/* Modal de Edición */}
            {isEditModalOpen && currentMotorcycle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Editar Motocicleta</h2>
                        <form onSubmit={handleSubmitEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Placa
                                </label>
                                <input
                                    type="text"
                                    name="license_plate"
                                    value={formData.license_plate}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Marca
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Modelo
                                </label>
                                <input
                                    type="text"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Año
                                </label>
                                <input
                                    type="number"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
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
                                    <option value="Disponible">Disponible</option>
                                    <option value="En uso">En uso</option>
                                    <option value="En mantenimiento">En mantenimiento</option>
                                    <option value="Fuera de servicio">Fuera de servicio</option>
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

export default ListMotorcycles;
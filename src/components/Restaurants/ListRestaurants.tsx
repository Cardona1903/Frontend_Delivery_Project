import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getRestaurants, deleteRestaurant, updateRestaurant } from "../../services/RestaurantService";
import Swal from "sweetalert2";
import { Restaurant } from "../../models/Restaurant";

const ListRestaurants = () => {
    const [data, setData] = useState<Restaurant[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const restaurants = await getRestaurants();
        setData(restaurants);
    };

    const handleEdit = (id: number) => {
        const restaurantToEdit = data.find(restaurant => restaurant.id === id);
        if (restaurantToEdit) {
            setCurrentRestaurant(restaurantToEdit);
            setFormData({
                name: restaurantToEdit.name,
                address: restaurantToEdit.address,
                phone: restaurantToEdit.phone || "",
                email: restaurantToEdit.email || ""
            });
            setIsEditModalOpen(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentRestaurant) return;

        try {
            const updatedRestaurant = {
                ...currentRestaurant,
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email
            };
            
            const success = await updateRestaurant(currentRestaurant.id!, updatedRestaurant);
            
            if (success) {
                Swal.fire({
                    title: "Actualizado",
                    text: "El restaurante ha sido actualizado correctamente",
                    icon: "success"
                });
                setIsEditModalOpen(false);
                fetchData();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar el restaurante",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error al actualizar el restaurante:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar el restaurante",
                icon: "error"
            });
        }
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminar Restaurante",
            text: "¿Está seguro de eliminar este restaurante?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteRestaurant(id);
                if (success) {
                    Swal.fire("Eliminado", "El restaurante ha sido eliminado", "success");
                    fetchData();
                }
            }
        });
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado de Restaurantes
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Nombre</th>
                                        <th className="px-6 py-3">Dirección</th>
                                        <th className="px-6 py-3">Teléfono</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((restaurant) => (
                                        <tr key={restaurant.id} className="border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {restaurant.name}
                                            </td>
                                            <td className="px-6 py-4">{restaurant.address}</td>
                                            <td className="px-6 py-4">{restaurant.phone}</td>
                                            <td className="px-6 py-4">{restaurant.email}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => console.log(`Ver ${restaurant.id}`)} className="text-blue-600">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(restaurant.id!)} className="text-yellow-600">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(restaurant.id!)} className="text-red-600">
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
            {isEditModalOpen && currentRestaurant && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Editar Restaurante</h2>
                        <form onSubmit={handleSubmitEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Dirección
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
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

export default ListRestaurants;
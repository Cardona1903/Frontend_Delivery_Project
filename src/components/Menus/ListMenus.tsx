import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getMenus, deleteMenu, updateMenu } from "../../services/MenuService";
import Swal from "sweetalert2";
import { Menu } from "../../models/Menu";

const ListMenus = () => {
    const [data, setData] = useState<Menu[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);
    const [formData, setFormData] = useState({
        restaurant_id: "",
        product_id: "",
        price: "",
        availability: true
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const menus = await getMenus();
        setData(menus);
    };

    const handleEdit = (id: number) => {
        const menuToEdit = data.find(menu => menu.id === id);
        if (menuToEdit) {
            setCurrentMenu(menuToEdit);
            setFormData({
                restaurant_id: menuToEdit.restaurant_id.toString(),
                product_id: menuToEdit.product_id.toString(),
                price: menuToEdit.price.toString(),
                availability: menuToEdit.availability
            });
            setIsEditModalOpen(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMenu) return;

        try {
            const updatedMenu = {
                ...currentMenu,
                restaurant_id: parseInt(formData.restaurant_id),
                product_id: parseInt(formData.product_id),
                price: parseFloat(formData.price),
                availability: formData.availability
            };
            
            const success = await updateMenu(currentMenu.id!, updatedMenu);
            
            if (success) {
                Swal.fire({
                    title: "Actualizado",
                    text: "El menú ha sido actualizado correctamente",
                    icon: "success"
                });
                setIsEditModalOpen(false);
                fetchData();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar el menú",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error al actualizar el menú:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar el menú",
                icon: "error"
            });
        }
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminar Menú",
            text: "¿Está seguro de eliminar este menú?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteMenu(id);
                if (success) {
                    Swal.fire("Eliminado", "El menú ha sido eliminado", "success");
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
                            Listado de Menús
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3">Restaurante</th>
                                        <th className="px-6 py-3">Producto</th>
                                        <th className="px-6 py-3">Precio</th>
                                        <th className="px-6 py-3">Disponibilidad</th>
                                        <th className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((menu) => (
                                        <tr key={menu.id} className="border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {menu.id}
                                            </td>
                                            <td className="px-6 py-4">{menu.restaurant_id}</td>
                                            <td className="px-6 py-4">{menu.product_id}</td>
                                            <td className="px-6 py-4">${menu.price.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full ${
                                                    menu.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {menu.availability ? "Disponible" : "No disponible"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => console.log(`Ver ${menu.id}`)} className="text-blue-600">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(menu.id!)} className="text-yellow-600">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(menu.id!)} className="text-red-600">
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
            {isEditModalOpen && currentMenu && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Editar Menú</h2>
                        <form onSubmit={handleSubmitEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    ID Restaurante
                                </label>
                                <input
                                    type="number"
                                    name="restaurant_id"
                                    value={formData.restaurant_id}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    ID Producto
                                </label>
                                <input
                                    type="number"
                                    name="product_id"
                                    value={formData.product_id}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="availability"
                                        checked={formData.availability}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Disponible
                                    </label>
                                </div>
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

export default ListMenus;
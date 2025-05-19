import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getMenus, deleteMenu } from "../../services/MenuService";
import Swal from "sweetalert2";
import { Menu } from "../../models/Menu";

const ListMenus = () => {
    const [data, setData] = useState<Menu[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const menus = await getMenus();
        setData(menus);
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
                                                <button onClick={() => console.log(`Editar ${menu.id}`)} className="text-yellow-600">
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
        </div>
    );
};

export default ListMenus;
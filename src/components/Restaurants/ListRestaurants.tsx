import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getRestaurants, deleteRestaurant } from "../../services/RestaurantService";
import Swal from "sweetalert2";
import { Restaurant } from "../../models/Restaurant";

const ListRestaurants = () => {
    const [data, setData] = useState<Restaurant[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const restaurants = await getRestaurants();
        setData(restaurants);
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
                                                <button onClick={() => console.log(`Editar ${restaurant.id}`)} className="text-yellow-600">
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
        </div>
    );
};

export default ListRestaurants;
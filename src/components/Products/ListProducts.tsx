import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../services/ProductService";
import Swal from "sweetalert2";
import { Product } from "../../models/Product";

const ListProducts = () => {
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const products = await getProducts();
        setData(products);
    };

    const handleView = (id: number) => {
        console.log(`Ver producto con ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        console.log(`Editar producto con ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteProduct(id);
                if (success) {
                    Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
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
                            Listado de Productos
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nombre</th>
                                        <th scope="col" className="px-6 py-3">Descripción</th>
                                        <th scope="col" className="px-6 py-3">Precio</th>
                                        <th scope="col" className="px-6 py-3">Categoría</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((product) => (
                                        <tr key={product.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{product.name}</td>
                                            <td className="px-6 py-4">{product.description.substring(0, 50)}...</td>
                                            <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                                            <td className="px-6 py-4">{product.category}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(product.id!)} className="text-blue-600 dark:text-blue-500">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(product.id!)} className="text-yellow-600 dark:text-yellow-500">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(product.id!)} className="text-red-600 dark:text-red-500">
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

export default ListProducts;
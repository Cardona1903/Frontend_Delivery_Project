import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getProducts, deleteProduct, updateProduct } from "../../services/ProductService";
import Swal from "sweetalert2";
import { Product } from "../../models/Product";

const ListProducts = () => {
    const [data, setData] = useState<Product[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    });

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
        const productToEdit = data.find(product => product.id === id);
        if (productToEdit) {
            setCurrentProduct(productToEdit);
            setFormData({
                name: productToEdit.name,
                description: productToEdit.description,
                price: productToEdit.price.toString(),
                category: productToEdit.category
            });
            setIsEditModalOpen(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentProduct) return;

        try {
            const updatedProduct = {
                ...currentProduct,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category
            };
            
            const success = await updateProduct(currentProduct.id!, updatedProduct);
            
            if (success) {
                Swal.fire({
                    title: "Actualizado",
                    text: "El producto ha sido actualizado correctamente",
                    icon: "success"
                });
                setIsEditModalOpen(false);
                fetchData();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar el producto",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar el producto",
                icon: "error"
            });
        }
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

    // Lista de categorías comunes (puedes ajustar según tus necesidades)
    const categories = [
        "Comida",
        "Bebida",
        "Postre",
        "Entrada",
        "Plato principal",
        "Acompañamiento",
        "Especial"
    ];

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

            {/* Modal de Edición */}
            {isEditModalOpen && currentProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Editar Producto</h2>
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
                                    Descripción
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    rows={4}
                                    required
                                ></textarea>
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Categoría
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                    {/* Si la categoría actual no está en la lista, la añadimos */}
                                    {formData.category && !categories.includes(formData.category) && (
                                        <option value={formData.category}>{formData.category}</option>
                                    )}
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

export default ListProducts;
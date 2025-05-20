import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getCustomers, deleteCustomer, updateCustomer } from "../../services/CustomerService";
import Swal from "sweetalert2";
import { Customer } from "../../models/Customer";

const ListCustomers = () => {
    const [data, setData] = useState<Customer[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        motorcycle_id: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const customers = await getCustomers();
        setData(customers);
    };

    const handleView = (id: number) => {
        console.log(`Ver cliente con ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        const customerToEdit = data.find(customer => customer.id === id);
        if (customerToEdit) {
            setCurrentCustomer(customerToEdit);
            setFormData({
                name: customerToEdit.name,
                email: customerToEdit.email,
                phone: customerToEdit.phone || "",
                motorcycle_id: customerToEdit.motorcycle_id ? customerToEdit.motorcycle_id.toString() : ""
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
    if (!currentCustomer) return;

    try {
        const updatedCustomer = {
            ...currentCustomer,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            motorcycle_id: formData.motorcycle_id ? parseInt(formData.motorcycle_id) : null
        };
        
        const success = await updateCustomer(currentCustomer.id!, updatedCustomer);
        
        if (success) {
            Swal.fire({
                title: "Actualizado",
                text: "El cliente ha sido actualizado correctamente",
                icon: "success"
            });
            setIsEditModalOpen(false);
            fetchData();
        } else {
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el cliente",
                icon: "error"
            });
        }
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        Swal.fire({
            title: "Error",
            text: "Ocurrió un error al actualizar el cliente",
            icon: "error"
        });
    }
};

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar este cliente?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteCustomer(id);
                if (success) {
                    Swal.fire("Eliminado", "El cliente ha sido eliminado", "success");
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
                            Listado de Clientes
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Nombre</th>
                                        <th scope="col" className="px-6 py-3">Correo</th>
                                        <th scope="col" className="px-6 py-3">Teléfono</th>
                                        <th scope="col" className="px-6 py-3">Motocicleta</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((customer) => (
                                        <tr key={customer.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{customer.name}</td>
                                            <td className="px-6 py-4">{customer.email}</td>
                                            <td className="px-6 py-4">{customer.phone}</td>
                                            <td className="px-6 py-4">{customer.motorcycle_id || 'N/A'}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(customer.id!)} className="text-blue-600 dark:text-blue-500">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(customer.id!)} className="text-yellow-600 dark:text-yellow-500">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(customer.id!)} className="text-red-600 dark:text-red-500">
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
            {isEditModalOpen && currentCustomer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Editar Cliente</h2>
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
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
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
                                    ID Motocicleta
                                </label>
                                <input
                                    type="number"
                                    name="motorcycle_id"
                                    value={formData.motorcycle_id}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    placeholder="Dejar vacío si no tiene motocicleta asignada"
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

export default ListCustomers;
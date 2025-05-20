import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getAddresses, deleteAddress, updateAddress } from "../../services/AddressService";
import Swal from "sweetalert2";
import { Address } from "../../models/Address";

const ListAddresses = () => {
    const [data, setData] = useState<Address[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
    const [formData, setFormData] = useState({
        street: "",
        city: "",
        state: "",
        postal_code: "",
        additional_info: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const addresses = await getAddresses();
        setData(addresses);
    };

    const handleEdit = (id: number) => {
        const addressToEdit = data.find(address => address.id === id);
        if (addressToEdit) {
            setCurrentAddress(addressToEdit);
            setFormData({
                street: addressToEdit.street,
                city: addressToEdit.city,
                state: addressToEdit.state,
                postal_code: addressToEdit.postal_code,
                additional_info: addressToEdit.additional_info || ""
            });
            setIsEditModalOpen(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentAddress) return;

        try {
            const updatedAddress = {
                ...currentAddress,
                ...formData
            };
            
            const success = await updateAddress(currentAddress.id!, updatedAddress);
            
            if (success) {
                Swal.fire({
                    title: "Actualizada",
                    text: "La dirección ha sido actualizada correctamente",
                    icon: "success"
                });
                setIsEditModalOpen(false);
                fetchData();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo actualizar la dirección",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error al actualizar la dirección:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar la dirección",
                icon: "error"
            });
        }
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminar Dirección",
            text: "¿Está seguro de eliminar esta dirección?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteAddress(id);
                if (success) {
                    Swal.fire("Eliminada", "La dirección ha sido eliminada", "success");
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
                            Listado de Direcciones
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Calle</th>
                                        <th className="px-6 py-3">Ciudad</th>
                                        <th className="px-6 py-3">Estado</th>
                                        <th className="px-6 py-3">Código Postal</th>
                                        <th className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((address) => (
                                        <tr key={address.id} className="border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {address.street}
                                            </td>
                                            <td className="px-6 py-4">{address.city}</td>
                                            <td className="px-6 py-4">{address.state}</td>
                                            <td className="px-6 py-4">{address.postal_code}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => console.log(`Ver ${address.id}`)} className="text-blue-600">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(address.id!)} className="text-yellow-600">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(address.id!)} className="text-red-600">
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
            {isEditModalOpen && currentAddress && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-boxdark p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Editar Dirección</h2>
                        <form onSubmit={handleSubmitEdit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Calle
                                </label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Ciudad
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Código Postal
                                </label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    value={formData.postal_code}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Información Adicional
                                </label>
                                <textarea
                                    name="additional_info"
                                    value={formData.additional_info}
                                    onChange={handleInputChange}
                                    className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black dark:text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input"
                                    rows={3}
                                ></textarea>
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

export default ListAddresses;
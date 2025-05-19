import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getAddresses, deleteAddress } from "../../services/AddressService";
import Swal from "sweetalert2";
import { Address } from "../../models/Address";

const ListAddresses = () => {
    const [data, setData] = useState<Address[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const addresses = await getAddresses();
        setData(addresses);
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
                                                <button onClick={() => console.log(`Editar ${address.id}`)} className="text-yellow-600">
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
        </div>
    );
};

export default ListAddresses;
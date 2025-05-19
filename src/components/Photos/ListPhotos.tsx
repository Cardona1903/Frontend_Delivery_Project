import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getPhotos, deletePhoto } from "../../services/PhotoService";
import Swal from "sweetalert2";
import { Photo } from "../../models/Photo";

const ListPhotos = () => {
    const [data, setData] = useState<Photo[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const photos = await getPhotos();
        setData(photos);
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminar Foto",
            text: "¿Está seguro de eliminar esta foto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deletePhoto(id);
                if (success) {
                    Swal.fire("Eliminada", "La foto ha sido eliminada", "success");
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
                            Listado de Fotos
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">ID Incidencia</th>
                                        <th className="px-6 py-3">Miniatura</th>
                                        <th className="px-6 py-3">Descripción</th>
                                        <th className="px-6 py-3">Fecha</th>
                                        <th className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((photo) => (
                                        <tr key={photo.id} className="border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {photo.issue_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img 
                                                    src={photo.image_url} 
                                                    alt={photo.caption || "Foto"} 
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4">{photo.caption || 'Sin descripción'}</td>
                                            <td className="px-6 py-4">{(new Date(photo.taken_at), 'dd/MM/yyyy HH:mm')}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => window.open(photo.image_url, '_blank')} className="text-blue-600">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => console.log(`Editar ${photo.id}`)} className="text-yellow-600">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(photo.id!)} className="text-red-600">
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

export default ListPhotos;
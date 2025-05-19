import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getIssues, deleteIssue } from "../../services/IssueService";
import Swal from "sweetalert2";
import { Issue } from "../../models/Issue";

const ListIssues = () => {
    const [data, setData] = useState<Issue[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const issues = await getIssues();
        setData(issues);
    };

    const handleView = (id: number) => {
        console.log(`Ver incidencia con ID: ${id}`);
    };

    const handleEdit = (id: number) => {
        console.log(`Editar incidencia con ID: ${id}`);
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Eliminación",
            text: "¿Está seguro de querer eliminar esta incidencia?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const success = await deleteIssue(id);
                if (success) {
                    Swal.fire("Eliminada", "La incidencia ha sido eliminada", "success");
                }
                fetchData();
            }
        });
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="grid grid-cols-1 gap-9">
            <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Listado de Incidencias
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Tipo</th>
                                        <th scope="col" className="px-6 py-3">Descripción</th>
                                        <th scope="col" className="px-6 py-3">Fecha</th>
                                        <th scope="col" className="px-6 py-3">Motocicleta</th>
                                        <th scope="col" className="px-6 py-3">Estado</th>
                                        <th scope="col" className="px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((issue) => (
                                        <tr key={issue.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{issue.issue_type}</td>
                                            <td className="px-6 py-4">{issue.description.substring(0, 50)}...</td>
                                            <td className="px-6 py-4">{formatDate(issue.date_reported)}</td>
                                            <td className="px-6 py-4">{issue.motorcycle_id}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full ${
                                                    issue.status === 'Resuelta' ? 'bg-green-100 text-green-800' : 
                                                    issue.status === 'En revisión' ? 'bg-yellow-100 text-yellow-800' : 
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {issue.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 space-x-2">
                                                <button onClick={() => handleView(issue.id!)} className="text-blue-600 dark:text-blue-500">
                                                    <Eye size={20} />
                                                </button>
                                                <button onClick={() => handleEdit(issue.id!)} className="text-yellow-600 dark:text-yellow-500">
                                                    <Edit size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(issue.id!)} className="text-red-600 dark:text-red-500">
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

export default ListIssues;
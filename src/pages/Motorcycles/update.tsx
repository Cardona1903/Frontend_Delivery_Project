import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateMotorcycle, getMotorcycleById } from "../../services/MotorcycleService";
import Swal from "sweetalert2";

import { Motorcycle } from '../../models/Motorcycle';
import MotorcycleFormValidator from '../../components/Motorcycles/MotorcycleFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateMotorcyclePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null);

    useEffect(() => {
        const fetchMotorcycle = async () => {
            if (!id) return;
            const data = await getMotorcycleById(parseInt(id));
            setMotorcycle(data);
        };
        fetchMotorcycle();
    }, [id]);

    const handleUpdateMotorcycle = async (theMotorcycle: Motorcycle) => {
        try {
            const updated = await updateMotorcycle(theMotorcycle.id || 0, theMotorcycle);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/motorcycles/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!motorcycle) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Motocicleta" />
            <MotorcycleFormValidator
                handleUpdate={handleUpdateMotorcycle}
                mode={2}
                motorcycle={motorcycle}
            />
        </>
    );
};

export default UpdateMotorcyclePage;
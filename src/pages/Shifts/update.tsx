import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateShift, getShiftById } from "../../services/ShiftService";
import Swal from "sweetalert2";

import { Shift } from '../../models/Shift';
import ShiftFormValidator from '../../components/Shifts/ShiftFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateShiftPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [shift, setShift] = useState<Shift | null>(null);

    useEffect(() => {
        const fetchShift = async () => {
            if (!id) return;
            const data = await getShiftById(parseInt(id));
            setShift(data);
        };
        fetchShift();
    }, [id]);

    const handleUpdateShift = async (theShift: Shift) => {
        try {
            const updated = await updateShift(theShift.id || 0, theShift);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/shifts/list");
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

    if (!shift) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Turno" />
            <ShiftFormValidator
                handleUpdate={handleUpdateShift}
                mode={2}
                shift={shift}
            />
        </>
    );
};

export default UpdateShiftPage;
import React from 'react';
import { Shift } from '../../models/Shift';
import ShiftFormValidator from '../../components/Shifts/ShiftFormValidator';

import Swal from 'sweetalert2';
import { createShift } from "../../services/ShiftService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateShift = async (shift: Shift) => {
        try {
            const createdShift = await createShift(shift);
            if (createdShift) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/ListShifts");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    return (
        <div>
            <h2>Create Shift</h2>
            <Breadcrumb pageName="Crear Turno" />
            <ShiftFormValidator
                handleCreate={handleCreateShift}
                mode={1}
            />
        </div>
    );
};

export default App;
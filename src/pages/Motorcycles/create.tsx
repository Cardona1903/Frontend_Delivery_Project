import React from 'react';
import { Motorcycle } from '../../models/Motorcycle';
import MotorcycleFormValidator from '../../components/Motorcycles/MotorcycleFormValidator';

import Swal from 'sweetalert2';
import { createMotorcycle } from "../../services/MotorcycleService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateMotorcycle = async (motorcycle: Motorcycle) => {
        try {
            const createdMotorcycle = await createMotorcycle(motorcycle);
            if (createdMotorcycle) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/motorcycles/list");
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
            <h2>Create Motorcycle</h2>
            <Breadcrumb pageName="Crear Motocicleta" />
            <MotorcycleFormValidator
                handleCreate={handleCreateMotorcycle}
                mode={1}
            />
        </div>
    );
};

export default App;
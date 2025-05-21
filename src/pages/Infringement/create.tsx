import React from 'react';
import { Infringement } from '../../models/Infringement';
import InfringementFormValidator from '../../components/Infringement/InfringementFormValidator';

import Swal from 'sweetalert2';
import { createInfringement } from "../../services/InfringementService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateInfringement = async (infringement: Infringement) => {
        try {
            const createdInfringement = await createInfringement(infringement);
            if (createdInfringement) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/ListInfringements");
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
            <h2>Create Infringement</h2>
            <Breadcrumb pageName="Crear Infracción" />
            <InfringementFormValidator
                handleCreate={handleCreateInfringement}
                mode={1}
            />
        </div>
    );
};

export default App;

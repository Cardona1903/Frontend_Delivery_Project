import React from 'react';
import { Infringement } from '../../models/Infringement';
import InfringementFormValidator from '../../components/Infringement/InfringementFormValidator';

import Swal from 'sweetalert2';
import { createInfringement } from "../../services/InfringementService.ts";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateInfringement = async (Infringement: Infringement) => {
        try {
            const createdInfringement = await createInfringement(Infringement);
            if (createdInfringement) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/ListInfringementes");
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
            <Breadcrumb pageName="Crear Infraccion" />
            <InfringementFormValidator
                handleCreate={handleCreateInfringement}
                mode={1}
            />
        </div>
    );
};

export default App;
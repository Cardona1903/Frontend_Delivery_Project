import React from 'react';
import { Driver } from '../../models/Driver';
import DriverFormValidator from '../../components/Drivers/DriverFormValidator';

import Swal from 'sweetalert2';
import { createDriver } from "../../services/driverService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateDriver = async (driver: Driver) => {
        try {
            const createdDriver = await createDriver(driver);
            if (createdDriver) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/drivers/list");
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
            <h2>Create Driver</h2>
            <Breadcrumb pageName="Crear Conductor" />
            <DriverFormValidator
                handleCreate={handleCreateDriver}
                mode={1}
            />
        </div>
    );
};

export default App;
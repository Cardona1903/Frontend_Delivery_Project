import React from 'react';
import { MotorcycleInfringement } from '../../models/MotorcycleInfringement';
import {MotorcycleInfringementFormValidator} from '../../components/MotorcycleInfringement/MotorcycleInfringementFormValidator';
import Swal from 'sweetalert2';
import { createMotorcycleInfringement } from "../../services/MotorcycleInfringementService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const CreateMotorcycleInfringement = () => {
    const navigate = useNavigate();

    const handleCreateMotorcycleInfringement = async (motorcycleInfringement: MotorcycleInfringement) => {
        try {
            // Asegurar que la fecha esté en formato correcto
            const formattedData = {
                ...motorcycleInfringement,
                date: new Date(motorcycleInfringement.date).toISOString()
            };

            const createdItem = await createMotorcycleInfringement(formattedData);
            
            if (createdItem) {
                await Swal.fire({
                    title: "¡Registro creado!",
                    text: "La infracción de motocicleta se ha registrado correctamente",
                    icon: "success",
                    timer: 3000
                });
                navigate("/ListMotorcycleInfringements");
            } else {
                throw new Error("No se recibió respuesta del servidor");
            }
        } catch (error) {
            console.error("Error al crear:", error);
            await Swal.fire({
                title: "Error",
                text: "Ocurrió un problema al crear el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    return (
        <div className="mx-auto max-w-7xl">
            <Breadcrumb pageName="Registrar Infracción de Motocicleta" />
            
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Nuevo Registro de Infracción
                    </h3>
                </div>
                <div className="p-6.5">
                    <MotorcycleInfringementFormValidator
                        onSubmit={handleCreateMotorcycleInfringement}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateMotorcycleInfringement;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateDriver, getDriverById } from "../../services/driverService";
import Swal from "sweetalert2";

import { Driver } from '../../models/Driver';
import DriverFormValidator from '../../components/Drivers/DriverFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateDriverPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [driver, setDriver] = useState<Driver | null>(null);

    useEffect(() => {
        const fetchDriver = async () => {
            if (!id) return;
            const data = await getDriverById(parseInt(id));
            setDriver(data);
        };
        fetchDriver();
    }, [id]);

    const handleUpdateDriver = async (theDriver: Driver) => {
        try {
            const updated = await updateDriver(theDriver.id || 0, theDriver);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/drivers/list");
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

    if (!driver) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Conductor" />
            <DriverFormValidator
                handleUpdate={handleUpdateDriver}
                mode={2}
                driver={driver}
            />
        </>
    );
};

export default UpdateDriverPage;
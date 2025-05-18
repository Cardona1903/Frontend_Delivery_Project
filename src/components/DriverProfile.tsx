import React from "react";
import { Driver } from "../models/Driver";

interface DriverProfileProps {
    driver: Driver;
}

const DriverProfile: React.FC<DriverProfileProps> = ({ driver }) => {
    return (
        <div className="driver-profile">
            <h2>{driver.name}</h2>
            <p>Email: {driver.email}</p>
            <p>Teléfono: {driver.phone}</p>
            <p>Licencia: {driver.license_number}</p>
            <p>Estado: {driver.is_active ? 'Activo' : 'Inactivo'}</p>
        </div>
    );
};

export default DriverProfile;
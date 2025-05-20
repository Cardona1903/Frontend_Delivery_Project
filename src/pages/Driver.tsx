import React from "react";
import DriverProfile from "../components/DriverProfile";
import { Driver } from "../models/Driver";

const DriverPage: React.FC = () => {
    const driver: Driver = {
        id: 1,
        name: "Rambo López",
        email: "carlos.lopez@example.com",
        phone: "+1234567890",
        license_number: "DRV123456",
        is_active: true
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Perfil del Conductor</h1>
            <DriverProfile driver={driver} />
        </div>
    );
};

export default DriverPage;
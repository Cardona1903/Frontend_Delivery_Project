import React from "react";
import MotorcycleDetails from "../components/MotorcycleDetails";
import { Motorcycle } from "../models/Motorcycle";

const MotorcyclePage: React.FC = () => {
    const motorcycle: Motorcycle = {
        id: 1,
        license_plate: "ABC123",
        brand: "Yamaha",
        year: 2022,
        status: "Disponible"
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalles de la Motocicleta</h1>
            <MotorcycleDetails motorcycle={motorcycle} />
        </div>
    );
};

export default MotorcyclePage;
import React from "react";
import { Motorcycle } from "../models/Motorcycle";

interface MotorcycleDetailsProps {
    motorcycle: Motorcycle;
}

const MotorcycleDetails: React.FC<MotorcycleDetailsProps> = ({ motorcycle }) => {
    return (
        <div className="motorcycle-details">
            <h2>{motorcycle.brand}</h2>
            <p>Placa: {motorcycle.license_plate}</p>
            <p>Año: {motorcycle.year}</p>
            <p>Estado: {motorcycle.status}</p>
        </div>
    );
};

export default MotorcycleDetails;
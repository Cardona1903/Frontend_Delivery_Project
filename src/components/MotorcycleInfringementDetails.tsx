import React from "react";
import { MotorcycleInfringement } from "../models/MotorcycleInfringement";

interface Props {
    motorcycleInfringement: MotorcycleInfringement;
}

const MotorcycleInfringementDetails: React.FC<Props> = ({ motorcycleInfringement }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-2">
                <span className="font-semibold">ID:</span> {motorcycleInfringement.id}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha:</span> {new Date(motorcycleInfringement.date).toLocaleString()}
            </div>
        </div>
    );
};

export default MotorcycleInfringementDetails;

import React from "react";
import InfringementDetails from "../components/InfringementDetails";
import { Infringement } from "../models/Infringement";

const InfringementPage: React.FC = () => {
    const infringement: Infringement = {
        id: 1,
        name: "Exceso de velocidad"
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalles de la Infracción</h1>
            <InfringementDetails infringement={infringement} />
        </div>
    );
};

export default InfringementPage;
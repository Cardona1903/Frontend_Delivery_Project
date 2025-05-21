import React from "react";
import { Infringement } from "../models/Infringement";

interface Props {
    infringement: Infringement;
}

const InfringementDetails: React.FC<Props> = ({ infringement }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-2">
                <span className="font-semibold">ID:</span> {infringement.id}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Nombre:</span> {infringement.name}
            </div>
        </div>
    );
};

export default InfringementDetails;
import React from "react";
import ShiftCard from "../components/ShiftCard";
import { Shift } from "../models/Shift";

const ShiftsPage: React.FC = () => {
    const shift: Shift = {
        id: 1,
        start_time: new Date("2023-06-15T08:00:00"),
        end_time: new Date("2023-06-15T16:00:00"),
        status: "Completado",
        driver_id: 1,
        motorcycle_id: 1
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalles del Turno</h1>
            <ShiftCard shift={shift} />
        </div>
    );
};

export default ShiftsPage;
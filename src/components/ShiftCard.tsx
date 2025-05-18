import React from "react";
import { Shift } from "../models/Shift";

interface ShiftCardProps {
    shift: Shift;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ shift }) => {
    return (
        <div className="shift-card">
            <h3>Turno #{shift.id}</h3>
            <p>Inicio: {shift.start_time.toLocaleString()}</p>
            <p>Fin: {shift.end_time.toLocaleString()}</p>
            <p>Estado: {shift.status}</p>
            <p>ID Conductor: {shift.driver_id}</p>
            <p>ID Motocicleta: {shift.motorcycle_id}</p>
        </div>
    );
};

export default ShiftCard;
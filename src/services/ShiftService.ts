import { Shift } from "../models/Shift";

const API_URL = import.meta.env.VITE_API_URL + "/shifts" || "";

export const getShifts = async (): Promise<Shift[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener turnos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getShiftById = async (id: number): Promise<Shift | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Turno no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createShift = async (shift: Omit<Shift, "id">): Promise<Shift | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shift),
        });
        if (!response.ok) throw new Error("Error al crear turno");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateShift = async (id: number, shift: Partial<Shift>): Promise<Shift | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(shift),
        });
        if (!response.ok) throw new Error("Error al actualizar turno");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteShift = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar turno");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
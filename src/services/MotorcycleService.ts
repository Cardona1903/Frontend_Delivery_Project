import { Motorcycle } from "../models/Motorcycle";

const API_URL = import.meta.env.VITE_API_URL + "/motorcycles" || "";

export const getMotorcycles = async (): Promise<Motorcycle[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener motocicletas");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getMotorcycleById = async (id: number): Promise<Motorcycle | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Motocicleta no encontrada");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createMotorcycle = async (motorcycle: Omit<Motorcycle, "id">): Promise<Motorcycle | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(motorcycle),
        });
        if (!response.ok) throw new Error("Error al crear motocicleta");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateMotorcycle = async (id: number, motorcycle: Partial<Motorcycle>): Promise<Motorcycle | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(motorcycle),
        });
        if (!response.ok) throw new Error("Error al actualizar motocicleta");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteMotorcycle = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar motocicleta");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
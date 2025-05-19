import { Driver } from "../models/Driver";

const API_URL = import.meta.env.VITE_API_URL + "/drivers" || "";

// Obtener todos los conductores
export const getDrivers = async (): Promise<Driver[]> => {
    console.log("Fetching drivers from: " + API_URL);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener conductores");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener un conductor por ID
export const getDriverById = async (id: number): Promise<Driver | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Conductor no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear un nuevo conductor
export const createDriver = async (driver: Omit<Driver, "id">): Promise<Driver | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(driver),
        });
        if (!response.ok) throw new Error("Error al crear conductor");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar conductor
export const updateDriver = async (id: number, driver: Partial<Driver>): Promise<Driver | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(driver),
        });
        if (!response.ok) throw new Error("Error al actualizar conductor");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar conductor
export const deleteDriver = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar conductor");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
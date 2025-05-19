import { Address } from "../models/Address";

const API_URL = import.meta.env.VITE_API_URL + "/addresses" || "";

export const getAddresses = async (): Promise<Address[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener direcciones");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getAddressById = async (id: number): Promise<Address | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Dirección no encontrada");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createAddress = async (address: Omit<Address, "id">): Promise<Address | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(address),
        });
        if (!response.ok) throw new Error("Error al crear dirección");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateAddress = async (id: number, address: Partial<Address>): Promise<Address | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(address),
        });
        if (!response.ok) throw new Error("Error al actualizar dirección");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteAddress = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar dirección");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
import { Address } from "../models/Address";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/addresses";

// Obtener todas las direcciones
export const getAddresses = async (): Promise<Address[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todas las direcciones:", error);
        return [];
    }
};

// Obtener una dirección por ID
export const getAddressById = async (id: number): Promise<Address | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la dirección por ID:", error);
        return null;
    }
};

// Crear una nueva dirección
export const createAddress = async (address: Omit<Address, "id">): Promise<Address | null> => {
    try {
        const response = await api.post(API_URL, address);
        return response.data;
    } catch (error) {
        console.error("Error al crear la dirección:", error);
        return null;
    }
};

// Actualizar una dirección
export const updateAddress = async (id: number, address: Partial<Omit<Address, "id">>): Promise<Address | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, address);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la dirección:", error);
        return null;
    }
};

// Eliminar una dirección
export const deleteAddress = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar la dirección:", error);
        return false;
    }
};
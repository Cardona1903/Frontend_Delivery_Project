import { Driver } from "../models/Driver";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/drivers";

export const getDrivers = async (): Promise<Driver[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener conductores:", error);
        return [];
    }
};

export const getDriverById = async (id: number): Promise<Driver | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener conductor por ID:", error);
        return null;
    }
};

export const createDriver = async (driver: Omit<Driver, "id">): Promise<Driver | null> => {
    try {
        const response = await api.post(API_URL, driver);
        return response.data;
    } catch (error) {
        console.error("Error al crear conductor:", error);
        return null;
    }
};

export const updateDriver = async (id: number, driver: Partial<Omit<Driver, "id">>): Promise<Driver | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, driver);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar conductor:", error);
        return null;
    }
};

export const deleteDriver = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar conductor:", error);
        return false;
    }
};
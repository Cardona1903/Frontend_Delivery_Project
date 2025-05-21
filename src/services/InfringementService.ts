import { Infringement } from "../models/Infringement";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/infringements";

export const getInfringements = async (): Promise<Infringement[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener infracciones:", error);
        return [];
    }
};

export const getInfringementById = async (id: number): Promise<Infringement | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener infracción por ID:", error);
        return null;
    }
};

export const createInfringement = async (infringement: Omit<Infringement, "id">): Promise<Infringement | null> => {
    try {
        const response = await api.post(API_URL, infringement);
        return response.data;
    } catch (error) {
        console.error("Error al crear infracción:", error);
        return null;
    }
};

export const updateInfringement = async (id: number, infrigement: Partial<Omit<Infringement, "id">>): Promise<Infringement | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, infrigement);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar infracción:", error);
        return null;
    }
};

export const deleteInfringement = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar infracción:", error);
        return false;
    }
};
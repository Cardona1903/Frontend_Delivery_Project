import { Shift } from "../models/Shift";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/shifts";

export const getShifts = async (): Promise<Shift[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener turnos:", error);
        return [];
    }
};

export const getShiftById = async (id: number): Promise<Shift | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener turno por ID:", error);
        return null;
    }
};

export const createShift = async (shift: Omit<Shift, "id">): Promise<Shift | null> => {
    try {
        const response = await api.post(API_URL, shift);
        return response.data;
    } catch (error) {
        console.error("Error al crear turno:", error);
        return null;
    }
};

export const updateShift = async (id: number, shift: Partial<Omit<Shift, "id">>): Promise<Shift | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, shift);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar turno:", error);
        return null;
    }
};

export const deleteShift = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar turno:", error);
        return false;
    }
};
import axios from "axios";
import { Shift } from "../models/Shift";

const API_URL = import.meta.env.VITE_API_URL + "/shifts" || "";

class ShiftService {
    async getShifts(): Promise<Shift[]> {
        try {
            const response = await axios.get<Shift[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener turnos:", error);
            return [];
        }
    }

    async getShiftById(id: number): Promise<Shift | null> {
        try {
            const response = await axios.get<Shift>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Turno no encontrado:", error);
            return null;
        }
    }

    async createShift(shift: Omit<Shift, "id">): Promise<Shift | null> {
        try {
            const response = await axios.post<Shift>(API_URL, shift);
            return response.data;
        } catch (error) {
            console.error("Error al crear turno:", error);
            return null;
        }
    }

    async updateShift(id: number, shift: Partial<Shift>): Promise<Shift | null> {
        try {
            const response = await axios.put<Shift>(`${API_URL}/${id}`, shift);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar turno:", error);
            return null;
        }
    }

    async deleteShift(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar turno:", error);
            return false;
        }
    }
}

export const shiftService = new ShiftService();
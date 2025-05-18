import axios from "axios";
import { Motorcycle } from "../models/Motorcycle";

const API_URL = import.meta.env.VITE_API_URL + "/motorcycles" || "";

class MotorcycleService {
    async getMotorcycles(): Promise<Motorcycle[]> {
        try {
            const response = await axios.get<Motorcycle[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener motocicletas:", error);
            return [];
        }
    }

    async getMotorcycleById(id: number): Promise<Motorcycle | null> {
        try {
            const response = await axios.get<Motorcycle>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Motocicleta no encontrada:", error);
            return null;
        }
    }

    async createMotorcycle(motorcycle: Omit<Motorcycle, "id">): Promise<Motorcycle | null> {
        try {
            const response = await axios.post<Motorcycle>(API_URL, motorcycle);
            return response.data;
        } catch (error) {
            console.error("Error al crear motocicleta:", error);
            return null;
        }
    }

    async updateMotorcycle(id: number, motorcycle: Partial<Motorcycle>): Promise<Motorcycle | null> {
        try {
            const response = await axios.put<Motorcycle>(`${API_URL}/${id}`, motorcycle);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar motocicleta:", error);
            return null;
        }
    }

    async deleteMotorcycle(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar motocicleta:", error);
            return false;
        }
    }
}

export const motorcycleService = new MotorcycleService();
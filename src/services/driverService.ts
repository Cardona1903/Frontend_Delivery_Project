import axios from "axios";
import { Driver } from "../models/Driver";

const API_URL = import.meta.env.VITE_API_URL + "/drivers" || "";

class DriverService {
    async getDrivers(): Promise<Driver[]> {
        try {
            const response = await axios.get<Driver[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener conductores:", error);
            return [];
        }
    }

    async getDriverById(id: number): Promise<Driver | null> {
        try {
            const response = await axios.get<Driver>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Conductor no encontrado:", error);
            return null;
        }
    }

    async createDriver(driver: Omit<Driver, "id">): Promise<Driver | null> {
        try {
            const response = await axios.post<Driver>(API_URL, driver);
            return response.data;
        } catch (error) {
            console.error("Error al crear conductor:", error);
            return null;
        }
    }

    async updateDriver(id: number, driver: Partial<Driver>): Promise<Driver | null> {
        try {
            const response = await axios.put<Driver>(`${API_URL}/${id}`, driver);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar conductor:", error);
            return null;
        }
    }

    async deleteDriver(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar conductor:", error);
            return false;
        }
    }
}

export const driverService = new DriverService();
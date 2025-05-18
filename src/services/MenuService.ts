import axios from "axios";
import { Menu } from "../models/Menu";

const API_URL = import.meta.env.VITE_API_URL + "/menus" || "";

class MenuService {
    async getMenus(): Promise<Menu[]> {
        try {
            const response = await axios.get<Menu[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener menús:", error);
            return [];
        }
    }

    async getMenuById(id: number): Promise<Menu | null> {
        try {
            const response = await axios.get<Menu>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Menú no encontrado:", error);
            return null;
        }
    }

    async createMenu(menu: Omit<Menu, "id">): Promise<Menu | null> {
        try {
            const response = await axios.post<Menu>(API_URL, menu);
            return response.data;
        } catch (error) {
            console.error("Error al crear menú:", error);
            return null;
        }
    }

    async updateMenu(id: number, menu: Partial<Menu>): Promise<Menu | null> {
        try {
            const response = await axios.put<Menu>(`${API_URL}/${id}`, menu);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar menú:", error);
            return null;
        }
    }

    async deleteMenu(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar menú:", error);
            return false;
        }
    }
}

export const menuService = new MenuService();
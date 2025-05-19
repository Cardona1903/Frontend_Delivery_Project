import { Menu } from "../models/Menu";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/menus";

export const getMenus = async (): Promise<Menu[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener menús:", error);
        return [];
    }
};

export const getMenuById = async (id: number): Promise<Menu | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener menú por ID:", error);
        return null;
    }
};

export const createMenu = async (menu: Omit<Menu, "id">): Promise<Menu | null> => {
    try {
        const response = await api.post(API_URL, menu);
        return response.data;
    } catch (error) {
        console.error("Error al crear menú:", error);
        return null;
    }
};

export const updateMenu = async (id: number, menu: Partial<Omit<Menu, "id">>): Promise<Menu | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, menu);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar menú:", error);
        return null;
    }
};

export const deleteMenu = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar menú:", error);
        return false;
    }
};
import { Menu } from "../models/Menu";

const API_URL = import.meta.env.VITE_API_URL + "/menus" || "";

export const getMenus = async (): Promise<Menu[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener menús");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getMenuById = async (id: number): Promise<Menu | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Menú no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createMenu = async (menu: Omit<Menu, "id">): Promise<Menu | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menu),
        });
        if (!response.ok) throw new Error("Error al crear menú");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateMenu = async (id: number, menu: Partial<Menu>): Promise<Menu | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menu),
        });
        if (!response.ok) throw new Error("Error al actualizar menú");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteMenu = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar menú");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
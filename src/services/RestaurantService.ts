import { Restaurant } from "../models/Restaurant";

const API_URL = import.meta.env.VITE_API_URL + "/restaurants" || "";

export const getRestaurants = async (): Promise<Restaurant[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener restaurantes");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getRestaurantById = async (id: number): Promise<Restaurant | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Restaurante no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createRestaurant = async (restaurant: Omit<Restaurant, "id">): Promise<Restaurant | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(restaurant),
        });
        if (!response.ok) throw new Error("Error al crear restaurante");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateRestaurant = async (id: number, restaurant: Partial<Restaurant>): Promise<Restaurant | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(restaurant),
        });
        if (!response.ok) throw new Error("Error al actualizar restaurante");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteRestaurant = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar restaurante");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
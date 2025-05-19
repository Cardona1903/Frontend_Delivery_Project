import { Restaurant } from "../models/Restaurant";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/restaurants";

export const getRestaurants = async (): Promise<Restaurant[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener restaurantes:", error);
        return [];
    }
};

export const getRestaurantById = async (id: number): Promise<Restaurant | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener restaurante por ID:", error);
        return null;
    }
};

export const createRestaurant = async (restaurant: Omit<Restaurant, "id">): Promise<Restaurant | null> => {
    try {
        const response = await api.post(API_URL, restaurant);
        return response.data;
    } catch (error) {
        console.error("Error al crear restaurante:", error);
        return null;
    }
};

export const updateRestaurant = async (id: number, restaurant: Partial<Omit<Restaurant, "id">>): Promise<Restaurant | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, restaurant);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar restaurante:", error);
        return null;
    }
};

export const deleteRestaurant = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar restaurante:", error);
        return false;
    }
};
import axios from "axios";
import { Restaurant } from "../models/Restaurant";

const API_URL = import.meta.env.VITE_API_URL + "/restaurants" || "";

class RestaurantService {
    async getRestaurants(): Promise<Restaurant[]> {
        try {
            const response = await axios.get<Restaurant[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener restaurantes:", error);
            return [];
        }
    }

    async getRestaurantById(id: number): Promise<Restaurant | null> {
        try {
            const response = await axios.get<Restaurant>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Restaurante no encontrado:", error);
            return null;
        }
    }

    async createRestaurant(restaurant: Omit<Restaurant, "id">): Promise<Restaurant | null> {
        try {
            const response = await axios.post<Restaurant>(API_URL, restaurant);
            return response.data;
        } catch (error) {
            console.error("Error al crear restaurante:", error);
            return null;
        }
    }

    async updateRestaurant(id: number, restaurant: Partial<Restaurant>): Promise<Restaurant | null> {
        try {
            const response = await axios.put<Restaurant>(`${API_URL}/${id}`, restaurant);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar restaurante:", error);
            return null;
        }
    }

    async deleteRestaurant(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar restaurante:", error);
            return false;
        }
    }
}

export const restaurantService = new RestaurantService();
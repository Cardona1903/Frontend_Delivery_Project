import axios from "axios";
import { Order } from "../models/Order";

const API_URL = import.meta.env.VITE_API_URL + "/orders" || "";

class OrderService {
    async getOrders(): Promise<Order[]> {
        try {
            const response = await axios.get<Order[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pedidos:", error);
            return [];
        }
    }

    async getOrderById(id: number): Promise<Order | null> {
        try {
            const response = await axios.get<Order>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Pedido no encontrado:", error);
            return null;
        }
    }

    async createOrder(order: Omit<Order, "id">): Promise<Order | null> {
        try {
            const response = await axios.post<Order>(API_URL, order);
            return response.data;
        } catch (error) {
            console.error("Error al crear pedido:", error);
            return null;
        }
    }

    async updateOrder(id: number, order: Partial<Order>): Promise<Order | null> {
        try {
            const response = await axios.put<Order>(`${API_URL}/${id}`, order);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar pedido:", error);
            return null;
        }
    }

    async deleteOrder(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar pedido:", error);
            return false;
        }
    }
}

export const orderService = new OrderService();
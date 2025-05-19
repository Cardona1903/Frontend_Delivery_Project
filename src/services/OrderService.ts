import { Order } from "../models/Order";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/orders";

export const getOrders = async (): Promise<Order[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
        return [];
    }
};

export const getOrderById = async (id: number): Promise<Order | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener pedido por ID:", error);
        return null;
    }
};

export const createOrder = async (order: Omit<Order, "id">): Promise<Order | null> => {
    try {
        const response = await api.post(API_URL, order);
        return response.data;
    } catch (error) {
        console.error("Error al crear pedido:", error);
        return null;
    }
};

export const updateOrder = async (id: number, order: Partial<Omit<Order, "id">>): Promise<Order | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, order);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar pedido:", error);
        return null;
    }
};

export const deleteOrder = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar pedido:", error);
        return false;
    }
};
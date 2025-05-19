import { Product } from "../models/Product";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/products";

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
};

export const getProductById = async (id: number): Promise<Product | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        return null;
    }
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product | null> => {
    try {
        const response = await api.post(API_URL, product);
        return response.data;
    } catch (error) {
        console.error("Error al crear producto:", error);
        return null;
    }
};

export const updateProduct = async (id: number, product: Partial<Omit<Product, "id">>): Promise<Product | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, product);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return null;
    }
};

export const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return false;
    }
};
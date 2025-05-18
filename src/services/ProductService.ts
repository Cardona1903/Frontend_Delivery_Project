import axios from "axios";
import { Product } from "../models/Product";

const API_URL = import.meta.env.VITE_API_URL + "/products" || "";

class ProductService {
    async getProducts(): Promise<Product[]> {
        try {
            const response = await axios.get<Product[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener productos:", error);
            return [];
        }
    }

    async getProductById(id: number): Promise<Product | null> {
        try {
            const response = await axios.get<Product>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Producto no encontrado:", error);
            return null;
        }
    }

    async createProduct(product: Omit<Product, "id">): Promise<Product | null> {
        try {
            const response = await axios.post<Product>(API_URL, product);
            return response.data;
        } catch (error) {
            console.error("Error al crear producto:", error);
            return null;
        }
    }

    async updateProduct(id: number, product: Partial<Product>): Promise<Product | null> {
        try {
            const response = await axios.put<Product>(`${API_URL}/${id}`, product);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            return null;
        }
    }

    async deleteProduct(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            return false;
        }
    }
}

export const productService = new ProductService();
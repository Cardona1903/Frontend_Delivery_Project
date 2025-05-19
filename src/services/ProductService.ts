import { Product } from "../models/Product";

const API_URL = import.meta.env.VITE_API_URL + "/products" || "";

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener productos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProductById = async (id: number): Promise<Product | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        if (!response.ok) throw new Error("Error al crear producto");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        if (!response.ok) throw new Error("Error al actualizar producto");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar producto");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
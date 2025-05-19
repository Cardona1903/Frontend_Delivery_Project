import { Customer } from "../models/Customer";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/customers";

export const getCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        return [];
    }
};

export const getCustomerById = async (id: number): Promise<Customer | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener cliente por ID:", error);
        return null;
    }
};

export const createCustomer = async (customer: Omit<Customer, "id">): Promise<Customer | null> => {
    try {
        const response = await api.post(API_URL, customer);
        return response.data;
    } catch (error) {
        console.error("Error al crear cliente:", error);
        return null;
    }
};

export const updateCustomer = async (id: number, customer: Partial<Omit<Customer, "id">>): Promise<Customer | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, customer);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        return null;
    }
};

export const deleteCustomer = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        return false;
    }
};
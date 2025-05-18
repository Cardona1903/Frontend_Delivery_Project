import axios from "axios";
import { Customer } from "../models/Customer";

const API_URL = import.meta.env.VITE_API_URL + "/customers" || "";

class CustomerService {
    async getCustomers(): Promise<Customer[]> {
        try {
            const response = await axios.get<Customer[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            return [];
        }
    }

    async getCustomerById(id: number): Promise<Customer | null> {
        try {
            const response = await axios.get<Customer>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Cliente no encontrado:", error);
            return null;
        }
    }

    async createCustomer(customer: Omit<Customer, "id">): Promise<Customer | null> {
        try {
            const response = await axios.post<Customer>(API_URL, customer);
            return response.data;
        } catch (error) {
            console.error("Error al crear cliente:", error);
            return null;
        }
    }

    async updateCustomer(id: number, customer: Partial<Customer>): Promise<Customer | null> {
        try {
            const response = await axios.put<Customer>(`${API_URL}/${id}`, customer);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar cliente:", error);
            return null;
        }
    }

    async deleteCustomer(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            return false;
        }
    }
}

export const customerService = new CustomerService();
import { User } from "../models/user";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/users";

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
};  

export const getUserById = async (id: number): Promise<User | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        return null;
    }
};

export const createUser = async (user: Omit<User, "id">): Promise<User | null> => {
    try {
        const response = await api.post(API_URL, user);
        return response.data;
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return null;
    }
};

export const updateUser = async (id: number, user: Partial<Omit<User, "id">>): Promise<User | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, user);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return null;
    }
};

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return false;
    }
};
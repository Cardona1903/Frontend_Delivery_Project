import { Issue } from "../models/Issue";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/issues";

export const getIssues = async (): Promise<Issue[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener incidencias:", error);
        return [];
    }
};

export const getIssueById = async (id: number): Promise<Issue | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener incidencia por ID:", error);
        return null;
    }
};

export const createIssue = async (issue: Omit<Issue, "id">): Promise<Issue | null> => {
    try {
        const response = await api.post(API_URL, issue);
        return response.data;
    } catch (error) {
        console.error("Error al crear incidencia:", error);
        return null;
    }
};

export const updateIssue = async (id: number, issue: Partial<Omit<Issue, "id">>): Promise<Issue | null> => {
    try {
        const response = await api.put(`${API_URL}/${id}`, issue);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar incidencia:", error);
        return null;
    }
};

export const deleteIssue = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar incidencia:", error);
        return false;
    }
};
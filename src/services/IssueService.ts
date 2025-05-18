import axios from "axios";
import { Issue } from "../models/Issue";

const API_URL = import.meta.env.VITE_API_URL + "/issues" || "";

class IssueService {
    async getIssues(): Promise<Issue[]> {
        try {
            const response = await axios.get<Issue[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener incidencias:", error);
            return [];
        }
    }

    async getIssueById(id: number): Promise<Issue | null> {
        try {
            const response = await axios.get<Issue>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Incidencia no encontrada:", error);
            return null;
        }
    }

    async createIssue(issue: Omit<Issue, "id">): Promise<Issue | null> {
        try {
            const response = await axios.post<Issue>(API_URL, issue);
            return response.data;
        } catch (error) {
            console.error("Error al crear incidencia:", error);
            return null;
        }
    }

    async updateIssue(id: number, issue: Partial<Issue>): Promise<Issue | null> {
        try {
            const response = await axios.put<Issue>(`${API_URL}/${id}`, issue);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar incidencia:", error);
            return null;
        }
    }

    async deleteIssue(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar incidencia:", error);
            return false;
        }
    }
}

export const issueService = new IssueService();
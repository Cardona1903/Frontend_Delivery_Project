import { Issue } from "../models/Issue";

const API_URL = import.meta.env.VITE_API_URL + "/issues" || "";

export const getIssues = async (): Promise<Issue[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener incidencias");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getIssueById = async (id: number): Promise<Issue | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Incidencia no encontrada");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createIssue = async (issue: Omit<Issue, "id">): Promise<Issue | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(issue),
        });
        if (!response.ok) throw new Error("Error al crear incidencia");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateIssue = async (id: number, issue: Partial<Issue>): Promise<Issue | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(issue),
        });
        if (!response.ok) throw new Error("Error al actualizar incidencia");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteIssue = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar incidencia");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
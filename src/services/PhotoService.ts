import { Photo } from "../models/Photo";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/photos";

export const getPhotos = async (): Promise<Photo[]> => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener fotos:", error);
        return [];
    }
};

export const getPhotosByIssueId = async (issueId: number): Promise<Photo[]> => {
    try {
        const response = await api.get(`${API_URL}?issue_id=${issueId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener fotos por incidencia:", error);
        return [];
    }
};

export const getPhotoById = async (id: number): Promise<Photo | null> => {
    try {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener foto por ID:", error);
        return null;
    }
};

export const createPhoto = async (photo: Omit<Photo, "id">): Promise<Photo | null> => {
    try {
        const response = await api.post(API_URL, photo);
        return response.data;
    } catch (error) {
        console.error("Error al crear foto:", error);
        return null;
    }
};

export const deletePhoto = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar foto:", error);
        return false;
    }
};
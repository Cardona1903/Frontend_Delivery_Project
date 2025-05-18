import axios from "axios";
import { Photo } from "../models/Photo";

const API_URL = import.meta.env.VITE_API_URL + "/photos" || "";

class PhotoService {
    async getPhotos(): Promise<Photo[]> {
        try {
            const response = await axios.get<Photo[]>(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener fotos:", error);
            return [];
        }
    }

    async getPhotosByIssueId(issueId: number): Promise<Photo[]> {
        try {
            const response = await axios.get<Photo[]>(`${API_URL}?issue_id=${issueId}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener fotos por incidencia:", error);
            return [];
        }
    }

    async getPhotoById(id: number): Promise<Photo | null> {
        try {
            const response = await axios.get<Photo>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Foto no encontrada:", error);
            return null;
        }
    }

    async createPhoto(photo: Omit<Photo, "id">): Promise<Photo | null> {
        try {
            const response = await axios.post<Photo>(API_URL, photo);
            return response.data;
        } catch (error) {
            console.error("Error al crear foto:", error);
            return null;
        }
    }

    async deletePhoto(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar foto:", error);
            return false;
        }
    }
}

export const photoService = new PhotoService();
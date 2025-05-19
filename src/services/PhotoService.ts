import { Photo } from "../models/Photo";

const API_URL = import.meta.env.VITE_API_URL + "/photos" || "";

export const getPhotos = async (): Promise<Photo[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener fotos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getPhotoById = async (id: number): Promise<Photo | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Foto no encontrada");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createPhoto = async (photo: Omit<Photo, "id">): Promise<Photo | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photo),
        });
        if (!response.ok) throw new Error("Error al crear foto");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updatePhoto = async (id: number, photo: Partial<Photo>): Promise<Photo | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photo),
        });
        if (!response.ok) throw new Error("Error al actualizar foto");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deletePhoto = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar foto");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
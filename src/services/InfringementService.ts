import { Infringement } from "../models/Infringement";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.SUST_API_URL + "/infringements";

// Obtener todas las infracciones
export const getInfringements = async (): Promise<Infringement[]> => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las infracciones:", error);
    return [];
  }
};

// Obtener una infracción por ID
export const getInfringementById = async (id: number): Promise<Infringement | null> => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la infracción por ID:", error);
    return null;
  }
};

// Crear una nueva infracción
export const createInfringement = async (infringement: Omit<Infringement, "id">): Promise<Infringement | null> => {
  try {
    const response = await api.post(API_URL, infringement);
    return response.data;
  } catch (error) {
    console.error("Error al crear la infracción:", error);
    return null;
  }
};

// Actualizar una infracción
export const updateInfringement = async (
  id: number,
  infringement: Partial<Omit<Infringement, "id">>
): Promise<Infringement | null> => {
  try {
    const response = await api.put(`${API_URL}/${id}`, infringement);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la infracción:", error);
    return null;
  }
};

// Eliminar una infracción
export const deleteInfringement = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar la infracción:", error);
    return false;
  }
};
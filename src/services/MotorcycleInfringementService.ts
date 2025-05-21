import { MotorcycleInfringement } from "../models/MotorcycleInfringement";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/motorcycle-infringements";

// Obtener todas las infracciones de motocicleta (idealmente con datos relacionados)
export const getMotorcycleInfringements = async (): Promise<MotorcycleInfringement[]> => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las infracciones de motocicleta:", error);
    return [];
  }
};

// Obtener una infracción de motocicleta por ID
export const getMotorcycleInfringementById = async (id: number): Promise<MotorcycleInfringement | null> => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la infracción de motocicleta por ID:", error);
    return null;
  }
};

// Crear una nueva infracción de motocicleta
export const createMotorcycleInfringement = async (
  motorcycleInfringement: Omit<MotorcycleInfringement, "id">
): Promise<MotorcycleInfringement | null> => {
  try {
    const response = await api.post(API_URL, motorcycleInfringement);
    return response.data;
  } catch (error) {
    console.error("Error al crear la infracción de motocicleta:", error);
    return null;
  }
};

// Actualizar una infracción de motocicleta
export const updateMotorcycleInfringement = async (
  id: number,
  motorcycleInfringement: Partial<Omit<MotorcycleInfringement, "id">>
): Promise<MotorcycleInfringement | null> => {
  try {
    const response = await api.put(`${API_URL}/${id}`, motorcycleInfringement);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la infracción de motocicleta:", error);
    return null;
  }
};

// Eliminar una infracción de motocicleta
export const deleteMotorcycleInfringement = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar la infracción de motocicleta:", error);
    return false;
  }
};
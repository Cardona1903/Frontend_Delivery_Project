// services/MotorcycleInfringementService.ts
import api from "../interceptors/axiosInterceptor";
import { MotorcycleInfringement } from "../models/MotorcycleInfringement";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/motorcycle-infringement";

export const createMotorcycleInfringement = async (data: Omit<MotorcycleInfringement, "id">) => {
    const response = await api.post(API_URL, data);
    return response.data;
};

export const updateMotorcycleInfringement = async (id: number, data: Partial<MotorcycleInfringement>) => {
    const response = await api.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const getMotorcycleInfringements = async (): Promise<MotorcycleInfringement[]> => {
    const response = await api.get(API_URL);
    return response.data;
};

export const deleteMotorcycleInfringement = async (id: number): Promise<boolean> => {
    await api.delete(`${API_URL}/${id}`);
    return true;
};
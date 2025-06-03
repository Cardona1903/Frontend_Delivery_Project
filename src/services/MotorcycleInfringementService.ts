// services/MotorcycleInfringementService.ts
import { MotorcycleInfringement } from "../models/MotorcycleInfringement";

const API_URL = 'https://e1897de6-5263-40d5-be3c-6ad562ea491d.mock.pstmn.io';

export class MotorcycleInfringementService {
  static async create(data: Omit<MotorcycleInfringement, 'id'>): Promise<MotorcycleInfringement> {
    const response = await fetch(`${API_URL}/motorcycle-infringement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error creating motorcycle infringement');
    }
    return await response.json();
  }

  static async update(id: number, data: Partial<MotorcycleInfringement>): Promise<MotorcycleInfringement> {
    const response = await fetch(`${API_URL}/motorcycle-infringement/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error updating motorcycle infringement');
    }
    return await response.json();
  }

  static async getAll(): Promise<MotorcycleInfringement[]> {
    // Asumiendo que tu mock API tiene este endpoint
    const response = await fetch(`${API_URL}/motorcycle-infringements`);
    if (!response.ok) {
      throw new Error('Error fetching motorcycle infringements');
    }
    return await response.json();
  }

  static async getById(id: number): Promise<MotorcycleInfringement> {
    const response = await fetch(`${API_URL}/motorcycle-infringement/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching motorcycle infringement');
    }
    return await response.json();
  }
}
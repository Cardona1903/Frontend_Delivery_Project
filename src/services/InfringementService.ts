// services/InfringementService.ts
import { Infringement } from "../models/Infringement";

const API_URL = 'https://e1897de6-5263-40d5-be3c-6ad562ea491d.mock.pstmn.io';

export class InfringementService {
  static async getAll(): Promise<Infringement[]> {
    const response = await fetch(`${API_URL}/infringements`);
    if (!response.ok) {
      throw new Error('Error fetching infringements');
    }
    return await response.json();
  }

  static async getById(id: number): Promise<Infringement> {
    const response = await fetch(`${API_URL}/infringements/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching infringement');
    }
    return await response.json();
  }

  static async create(data: Omit<Infringement, 'id'>): Promise<Infringement> {
    const response = await fetch(`${API_URL}/infringements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error creating infringement');
    }
    return await response.json();
  }

  static async update(id: number, data: Partial<Infringement>): Promise<Infringement> {
    const response = await fetch(`${API_URL}/infringements/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error updating infringement');
    }
    return await response.json();
  }
}
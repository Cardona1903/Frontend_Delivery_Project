// models/Infringement.ts
export interface Infringement {
  id: number;
  name: string;
  type: 'VELOCIDAD' | 'LLANTAS' | 'PAPELES' | string; // Permitimos string para tipos adicionales
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
// models/MotorcycleInfringement.ts
export interface MotorcycleInfringement {
    id?: number;
    date: string; // O usar Date si manejas objetos directamente
    motorcycle_id: number;
    infringement_id: number;
    
    // Opcional: datos relacionados para mostrar en UI
    motorcycle?: {
        license_plate: string;
    };
    infringement?: {
        name: string;
    };
}
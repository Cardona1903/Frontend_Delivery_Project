export interface Driver {
    id?: number;
    name: string;
    email: string;
    phone: string;
    is_active?: boolean;     // Esto es similar a como tiene el pr. felipe en user.ts
    license_number?: string; 
    status?: string; 
}
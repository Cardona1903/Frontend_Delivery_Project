import { Order } from "./Order";

export interface Customer {
    id?: number;
    name: string;
    email: string;
    phone: string;
    motorcycle_id?: number;
    orders?: Order[];      
    is_active?: boolean;    // Relación inversa (opcional)
}
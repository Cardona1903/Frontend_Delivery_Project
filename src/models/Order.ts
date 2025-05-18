import { Customer } from "./Customer";
import { Menu } from "./Menu";

export interface Order {
    id?: number;
    customer_id: number;        // Llave foránea a Customer
    menu_id: number;            // Llave foránea a Menu
    quantity: number;
    total_price: number;
    status: string;
    created_at?: Date;          // Campo útil para auditoría
    // Opcionalmente puedes incluir los objetos completos:
    customer?: Customer;        // Relación poblada (opcional)
    menu?: Menu;               // Relación poblada (opcional)
}
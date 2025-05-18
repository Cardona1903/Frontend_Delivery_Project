import { Product } from "./Product";
import { Restaurant } from "./Restaurant";

export interface Menu {
    id?: number;
    restaurant_id: number;       // Llave foránea a Restaurant
    product_id: number;         // Llave foránea a Product
    price: number;
    availability: boolean;
    // Opcionalmente puedes incluir los objetos completos:
    restaurant?: Restaurant;     // Relación poblada (opcional)
    product?: Product;          // Relación poblada (opcional)
}
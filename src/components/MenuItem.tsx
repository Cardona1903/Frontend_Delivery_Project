import React from "react";
import { Menu } from "../models/Menu";

interface MenuItemProps {
    menu: Menu;
}

const MenuItem: React.FC<MenuItemProps> = ({ menu }) => {
    return (
        <div className="menu-item">
            <h3>Menú #{menu.id}</h3>
            <p>Precio: ${menu.price.toFixed(2)}</p>
            <p>Disponibilidad: {menu.availability ? 'Disponible' : 'No disponible'}</p>
            <p>ID Restaurante: {menu.restaurant_id}</p>
            <p>ID Producto: {menu.product_id}</p>
        </div>
    );
};

export default MenuItem;
import React from "react";
import MenuItem from "../components/MenuItem";
import { Menu } from "../models/Menu";

const MenuPage: React.FC = () => {
    const menu: Menu = {
        id: 1,
        restaurant_id: 1,
        product_id: 1,
        price: 8.99,
        availability: true
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalles del Menú</h1>
            <MenuItem menu={menu} />
        </div>
    );
};

export default MenuPage;
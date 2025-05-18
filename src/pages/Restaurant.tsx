import React from "react";
import RestaurantInfo from "../components/RestaurantInfo";
import { Restaurant } from "../models/Restaurant";

const RestaurantsPage: React.FC = () => {
    const restaurant: Restaurant = {
        id: 1,
        name: "Burger Palace",
        address: "Calle Principal 123",
        phone: "+1122334455",
        email: "contacto@burgerpalace.com"
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Información del Restaurante</h1>
            <RestaurantInfo restaurant={restaurant} />
        </div>
    );
};

export default RestaurantsPage;
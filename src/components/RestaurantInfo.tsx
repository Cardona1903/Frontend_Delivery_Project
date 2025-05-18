import React from "react";
import { Restaurant } from "../models/Restaurant";

interface RestaurantInfoProps {
    restaurant: Restaurant;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurant }) => {
    return (
        <div className="restaurant-info">
            <h2>{restaurant.name}</h2>
            <p>Dirección: {restaurant.address}</p>
            <p>Teléfono: {restaurant.phone}</p>
            <p>Email: {restaurant.email}</p>
        </div>
    );
};

export default RestaurantInfo;
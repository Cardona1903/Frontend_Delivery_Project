import React from 'react';
import { Restaurant } from '../../models/Restaurant';
import RestaurantFormValidator from '../../components/Restaurants/RestaurantFormValidator';

import Swal from 'sweetalert2';
import { createRestaurant } from "../../services/RestaurantService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateRestaurant = async (restaurant: Restaurant) => {
        try {
            const createdRestaurant = await createRestaurant(restaurant);
            if (createdRestaurant) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/ListRestaurants");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de crear el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de crear el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    return (
        <div>
            <h2>Create Restaurant</h2>
            <Breadcrumb pageName="Crear Restaurante" />
            <RestaurantFormValidator
                handleCreate={handleCreateRestaurant}
                mode={1}
            />
        </div>
    );
};

export default App;
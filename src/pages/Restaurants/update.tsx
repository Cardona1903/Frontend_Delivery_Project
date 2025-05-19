import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateRestaurant, getRestaurantById } from "../../services/RestaurantService";
import Swal from "sweetalert2";

import { Restaurant } from '../../models/Restaurant';
import RestaurantFormValidator from '../../components/Restaurants/RestaurantFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateRestaurantPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            if (!id) return;
            const data = await getRestaurantById(parseInt(id));
            setRestaurant(data);
        };
        fetchRestaurant();
    }, [id]);

    const handleUpdateRestaurant = async (theRestaurant: Restaurant) => {
        try {
            const updated = await updateRestaurant(theRestaurant.id || 0, theRestaurant);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/restaurants/list");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Existe un problema al momento de actualizar el registro",
                    icon: "error",
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Existe un problema al momento de actualizar el registro",
                icon: "error",
                timer: 3000
            });
        }
    };

    if (!restaurant) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Restaurante" />
            <RestaurantFormValidator
                handleUpdate={handleUpdateRestaurant}
                mode={2}
                restaurant={restaurant}
            />
        </>
    );
};

export default UpdateRestaurantPage;
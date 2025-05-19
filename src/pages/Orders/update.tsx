import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateOrder, getOrderById } from "../../services/OrderService";
import Swal from "sweetalert2";

import { Order } from '../../models/Order';
import OrderFormValidator from '../../components/Orders/OrderFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateOrderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;
            const data = await getOrderById(parseInt(id));
            setOrder(data);
        };
        fetchOrder();
    }, [id]);

    const handleUpdateOrder = async (theOrder: Order) => {
        try {
            const updated = await updateOrder(theOrder.id || 0, theOrder);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/orders/list");
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

    if (!order) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Orden" />
            <OrderFormValidator
                handleUpdate={handleUpdateOrder}
                mode={2}
                order={order}
            />
        </>
    );
};

export default UpdateOrderPage;
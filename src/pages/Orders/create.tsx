import React from 'react';
import { Order } from '../../models/Order';
import OrderFormValidator from '../../components/Orders/OrderFormValidator';

import Swal from 'sweetalert2';
import { createOrder } from "../../services/OrderService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateOrder = async (order: Order) => {
        try {
            const createdOrder = await createOrder(order);
            if (createdOrder) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/ListOrders");
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
            <h2>Create Order</h2>
            <Breadcrumb pageName="Crear Orden" />
            <OrderFormValidator
                handleCreate={handleCreateOrder}
                mode={1}
            />
        </div>
    );
};

export default App;
import React from "react";
import OrderSummary from "../components/OrderSummary";
import { Order } from "../models/Order";

const OrdersPage: React.FC = () => {
    const order: Order = {
        id: 1,
        customer_id: 1,
        menu_id: 1,
        quantity: 2,
        total_price: 17.98,
        status: "En camino"
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalles del Pedido</h1>
            <OrderSummary order={order} />
        </div>
    );
};

export default OrdersPage;
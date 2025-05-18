import React from "react";
import { Order } from "../models/Order";

interface OrderSummaryProps {
    order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
    return (
        <div className="order-summary">
            <h3>Pedido #{order.id}</h3>
            <p>Cantidad: {order.quantity}</p>
            <p>Total: ${order.total_price.toFixed(2)}</p>
            <p>Estado: {order.status}</p>
            <p>ID Cliente: {order.customer_id}</p>
            <p>ID Menú: {order.menu_id}</p>
        </div>
    );
};

export default OrderSummary;
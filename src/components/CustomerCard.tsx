import React from "react";
import { Customer } from "../models/Customer";

interface CustomerCardProps {
    customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
    return (
        <div className="customer-card">
            <h2>{customer.name}</h2>
            <p>Email: {customer.email}</p>
            <p>Teléfono: {customer.phone}</p>
            {customer.motorcycle_id && <p>ID Motocicleta: {customer.motorcycle_id}</p>}
        </div>
    );
};

export default CustomerCard;
import React from "react";
import CustomerCard from "../components/CustomerCard";
import { Customer } from "../models/Customer";

const CustomersPage: React.FC = () => {
    const customer: Customer = {
        id: 1,
        name: "María García",
        email: "maria.garcia@example.com",
        phone: "+1987654321",
        motorcycle_id: 1
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Perfil del Cliente</h1>
            <CustomerCard customer={customer} />
        </div>
    );
};

export default CustomersPage;
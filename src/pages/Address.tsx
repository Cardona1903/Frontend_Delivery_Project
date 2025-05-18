import React from "react";
import AddressCard from "../components/AddressCard";
import { Address } from "../models/Address";

const AddressPage: React.FC = () => {
    const address: Address = {
        id: 1,
        street: "Avenida Siempre Viva 742",
        city: "Springfield",
        state: "Estado",
        postal_code: "12345",
        additional_info: "Casa amarilla con garaje"
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalles de la Dirección</h1>
            <AddressCard address={address} />
        </div>
    );
};

export default AddressPage;
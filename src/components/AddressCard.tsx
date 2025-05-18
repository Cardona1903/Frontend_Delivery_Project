import React from "react";
import { Address } from "../models/Address";

interface AddressCardProps {
    address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
    return (
        <div className="address-card">
            <h3>Dirección #{address.id}</h3>
            <p>Calle: {address.street}</p>
            <p>Ciudad: {address.city}</p>
            <p>Estado/Provincia: {address.state}</p>
            <p>Código Postal: {address.postal_code}</p>
            {address.additional_info && (
                <p>Información adicional: {address.additional_info}</p>
            )}
        </div>
    );
};

export default AddressCard;
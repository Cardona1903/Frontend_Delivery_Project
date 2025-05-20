import React from 'react';
import { Address } from '../../models/Address';
import AddressFormValidator from '../../components/Addresses/AddressFormValidator';

import Swal from 'sweetalert2';
import { createAddress } from "../../services/AddressService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateAddress = async (address: Address) => {
        try {
            const createdAddress = await createAddress(address);
            if (createdAddress) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/ListAddresses");
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
            <h2>Create Address</h2>
            <Breadcrumb pageName="Crear Dirección" />
            <AddressFormValidator
                handleCreate={handleCreateAddress}
                mode={1}
            />
        </div>
    );
};

export default App;
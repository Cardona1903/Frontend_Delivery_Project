import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateAddress, getAddressById } from "../../services/AddressService";
import Swal from "sweetalert2";

import { Address } from '../../models/Address';
import AddressFormValidator from '../../components/Addresses/AddressFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateAddressPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [address, setAddress] = useState<Address | null>(null);

    useEffect(() => {
        const fetchAddress = async () => {
            if (!id) return;
            const data = await getAddressById(parseInt(id));
            setAddress(data);
        };
        fetchAddress();
    }, [id]);

    const handleUpdateAddress = async (theAddress: Address) => {
        try {
            const updated = await updateAddress(theAddress.id || 0, theAddress);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/addresses/list");
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

    if (!address) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Dirección" />
            <AddressFormValidator
                handleUpdate={handleUpdateAddress}
                mode={2}
                address={address}
            />
        </>
    );
};

export default UpdateAddressPage;
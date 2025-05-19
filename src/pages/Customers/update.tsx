import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateCustomer, getCustomerById } from "../../services/CustomerService";
import Swal from "sweetalert2";

import { Customer } from '../../models/Customer';
import CustomerFormValidator from '../../components/Customers/CustomerFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateCustomerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!id) return;
            const data = await getCustomerById(parseInt(id));
            setCustomer(data);
        };
        fetchCustomer();
    }, [id]);

    const handleUpdateCustomer = async (theCustomer: Customer) => {
        try {
            const updated = await updateCustomer(theCustomer.id || 0, theCustomer);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/customers/list");
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

    if (!customer) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Cliente" />
            <CustomerFormValidator
                handleUpdate={handleUpdateCustomer}
                mode={2}
                customer={customer}
            />
        </>
    );
};

export default UpdateCustomerPage;
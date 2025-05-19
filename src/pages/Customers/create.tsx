import React from 'react';
import { Customer } from '../../models/Customer';
import CustomerFormValidator from '../../components/Customers/CustomerFormValidator';

import Swal from 'sweetalert2';
import { createCustomer } from "../../services/CustomerService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateCustomer = async (customer: Customer) => {
        try {
            const createdCustomer = await createCustomer(customer);
            if (createdCustomer) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/customers/list");
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
            <h2>Create Customer</h2>
            <Breadcrumb pageName="Crear Cliente" />
            <CustomerFormValidator
                handleCreate={handleCreateCustomer}
                mode={1}
            />
        </div>
    );
};

export default App;
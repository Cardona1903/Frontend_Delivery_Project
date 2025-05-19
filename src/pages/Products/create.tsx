import React from 'react';
import { Product } from '../../models/Product';
import ProductFormValidator from '../../components/Products/ProductFormValidator';

import Swal from 'sweetalert2';
import { createProduct } from "../../services/ProductService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
    const navigate = useNavigate();

    const handleCreateProduct = async (product: Product) => {
        try {
            const createdProduct = await createProduct(product);
            if (createdProduct) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha creado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/products/list");
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
            <h2>Create Product</h2>
            <Breadcrumb pageName="Crear Producto" />
            <ProductFormValidator
                handleCreate={handleCreateProduct}
                mode={1}
            />
        </div>
    );
};

export default App;
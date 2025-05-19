import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { updateProduct, getProductById } from "../../services/ProductService";
import Swal from "sweetalert2";

import { Product } from '../../models/Product';
import ProductFormValidator from '../../components/Products/ProductFormValidator';
import Breadcrumb from "../../components/Breadcrumb";

const UpdateProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            const data = await getProductById(parseInt(id));
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    const handleUpdateProduct = async (theProduct: Product) => {
        try {
            const updated = await updateProduct(theProduct.id || 0, theProduct);
            if (updated) {
                Swal.fire({
                    title: "Completado",
                    text: "Se ha actualizado correctamente el registro",
                    icon: "success",
                    timer: 3000
                });
                navigate("/products/list");
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

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Breadcrumb pageName="Actualizar Producto" />
            <ProductFormValidator
                handleUpdate={handleUpdateProduct}
                mode={2}
                product={product}
            />
        </>
    );
};

export default UpdateProductPage;
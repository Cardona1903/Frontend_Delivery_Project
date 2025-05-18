import React from "react";
import ProductItem from "../components/ProductItem";
import { Product } from "../models/Product";

const ProductsPage: React.FC = () => {
    const product: Product = {
        id: 1,
        name: "Hamburguesa Especial",
        description: "Hamburguesa con queso, tocino y salsa secreta",
        price: 8.99,
        category: "Comida rápida"
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalles del Producto</h1>
            <ProductItem product={product} />
        </div>
    );
};

export default ProductsPage;
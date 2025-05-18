import React from "react";
import { Product } from "../models/Product";

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <div className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: ${product.price.toFixed(2)}</p>
            <p>Categoría: {product.category}</p>
        </div>
    );
};

export default ProductItem;
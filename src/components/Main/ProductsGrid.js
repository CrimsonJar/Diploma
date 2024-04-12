// ProductsGrid.js
import React from "react";
import ProductCard from "./ProductCard";

const ProductsGrid = ({ products }) => {
  return (
    <div className='row'>
      {products.map((product) => (
        <div className='col-4' key={product.id}>
          <ProductCard
            title={product.title}
            price={product.price}
            img={product.images?.[0]}
            id={product.id}
            className='catalog-item-card'
          />
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;

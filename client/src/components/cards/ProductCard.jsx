import React from "react";

const ProductCard = ({ product }) => (
  <div className="title fw-bold fs-20">
    <h4>{product.title}</h4>
  </div>
);

export default ProductCard;

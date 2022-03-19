import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../../services/product";

const ProductDetail = ({match}) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getSingleProduct(slug)
      .then((res) => setProduct(res.data))
      .catch();

  return <>{JSON.stringify(product)}</>;
};

export default ProductDetail;

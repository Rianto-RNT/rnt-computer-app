import React, { useEffect, useState } from "react";
import { getProductByCount } from "../services/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProduct();
  }, []);

  const loadAllProduct = () => {
    getProductByCount(3)
      .then((res) => {
        setProducts(res.data);
      })
      .catch();
  };

  return (
    <div>
      <h3>Home | Rnt Computer App</h3>
      {JSON.stringify(products)}
    </div>
  );
};

export default Home;

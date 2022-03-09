import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getProductByCount } from "../../services/product";
import AdminProductCard from "../../components/cards/AdminProductCard";
import { Spin } from "antd";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
        {loading ? <Spin size="large" tip="Loading..." /> : <h4>All Product</h4>}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <AdminProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

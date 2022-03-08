import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getProductByCount } from "../../services/product";
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
        {loading ? <Spin size="large" tip="Loading..." /> : <h4>All Product</h4>}
        <div className="col">{JSON.stringify(products)}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;

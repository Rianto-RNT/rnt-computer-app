import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Spin } from "antd";
import { getProductByCount } from "../../../services/product";
import { removeProduct } from "../../../services/product";
import AdminNav from "../../../components/nav/AdminNav";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import LocalSearch from "../../../components/search/LocalSearch";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");

  // redux
  const { user } = useSelector((state) => ({ ...state }));

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
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((product) => {
      if (product.isConfirmed) {
        removeProduct(slug, user.token).then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          loadAllProducts();
        });
      } else {
        Swal.fire("Cancelled", "Your product data is safe :)", "error");
      }
    });
  };

  const searched = (keyword) => (p) => p.title.toLowerCase().includes(keyword);

  return (
    <div className="main-container container-fluid">
      <div className="row row-cards">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="page-header pt-7">
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">Product List</h1>}
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Product List
                </li>
              </ol>
            </div>
          </div>

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <div className="card">
            <div className="card-header border-bottom-0 p-4">
              <h2 className="card-title">1 - 30 of 546 Products</h2>
              <div className="page-options ms-auto">
                <select className="form-control select2 w-100">
                  <option value="asc">Latest</option>
                  <option value="desc">Oldest</option>
                </select>
              </div>
            </div>

            <div className="e-table px-5 pb-5">
              <div className="table-responsive table-lg">
                <table className="table border-top table-bordered mb-0">
                  <thead>
                    <tr>
                      <th className="text-center">Photo</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Date</th>
                      <th className="text-center">QTY</th>
                      <th className="text-center">Sold</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.filter(searched(keyword)).map((product) => (
                      <tr key={product._id}>
                        <AdminProductCard product={product} handleRemove={handleRemove} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <ul className="pagination float-end">
              <li className="page-item page-prev disabled">
                <a className="page-link" href="#!" tabIndex="-1">
                  Prev
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#!">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#!">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#!">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#!">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#!">
                  5
                </a>
              </li>
              <li className="page-item page-next">
                <a className="page-link" href="#!">
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

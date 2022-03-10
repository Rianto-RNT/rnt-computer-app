import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../../services/product";
import AdminNav from "../../../components/nav/AdminNav";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcategory: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["yellow", "red", "black", "silver", "blue", "white", "space gray"],
  brands: ["apple", "lenovo", "hp", "acer", "microsoft", "asus", "msi"],
  color: "",
  brand: "",
};

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState(initialState);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getSingleProduct(slug).then((product) => {
      setValues({ ...values, ...product.data });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Update Product</h4>
          <hr />

          <ProductUpdateForm handleSubmit={handleSubmit} handleChange={handleChange} setValues={setValues} values={values} />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct } from "../../../services/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcategory: "",
  shipping: "",
  quantity: "",
  images: [],
  colors: ["yellow", "red", "black", "silver", "blue", "white"],
  brands: ["apple", "lenovo", "hp", "acer", "microsoft", "asus"],
  color: "",
  brand: "",
};

const CreateProduct = () => {
  const [values, setValues] = useState(initialState);

  // Redux
  const { user } = useSelector((state) => ({ ...state }));

  

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
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
          <h4>Create Product</h4>
          <hr />

          <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

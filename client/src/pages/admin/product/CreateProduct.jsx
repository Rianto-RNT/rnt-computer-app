import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct } from "../../../services/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getAllCategory, getAllSubcategoryForProduct } from "../../../services/category";

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
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  // Redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCategory();
  }, []);

  const loadAllCategory = () => getAllCategory().then((c) => setValues({ ...values, categories: c.data }));

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

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);
    setValues({ ...values, category: e.target.value });
    getAllSubcategoryForProduct(e.target.value).then((res) => {
      console.log("Subcategory Options on click", res);
      setSubcategoryOptions(res.data);
    });
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

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

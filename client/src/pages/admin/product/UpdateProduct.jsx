import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../../services/product";
import { getAllCategory, getAllSubcategoryForProduct } from "../../../services/category";
import AdminNav from "../../../components/nav/AdminNav";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
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
  const [categories, setCategories] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [arrayOfSubcategory, setArrayOfSubcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadAllCategory();
  }, []);

  const loadProduct = () => {
    getSingleProduct(slug).then((p) => {
      // 1) Load single Product
      setValues({ ...values, ...p.data });
      // 2) Load single product category subcategory
      getAllSubcategoryForProduct(p.data.category._id).then((res) => {
        setSubcategoryOptions(res.data); // on first load, show default subcategory
      });
      // 3) prepare array of subcategory ID to show default sub values in form
      let arr = [];
      p.data.subcategory.map((s) => {
        arr.push(s._id);
      });
      console.log("Array of subcategory", arr);
      setArrayOfSubcategory((prev) => arr); // require for ant design Select
    });
  };

  const loadAllCategory = () =>
    getAllCategory().then((c) => {
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);
    setValues({ ...values, subcategory: [] });

    setSelectedCategory(e.target.value);

    getAllSubcategoryForProduct(e.target.value).then((res) => {
      console.log("Subcategory Options on click", res);
      setSubcategoryOptions(res.data);
    });

    console.log("Exiting Category", values.category);

    // if user click back to the original category
    // show is subcategory of all category in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }

    // the clear old category ID
    setArrayOfSubcategory([]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Update Product</h4>
          {JSON.stringify(values)}
          <hr />

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subcategoryOptions={subcategoryOptions}
            arrayOfSubcategory={arrayOfSubcategory}
            setArrayOfSubcategory={setArrayOfSubcategory}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

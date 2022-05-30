import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { getSingleProduct } from "../../../services/product";
import { getAllCategory, getAllSubcategoryForProduct } from "../../../services/category";
import { updateProduct } from "../../../services/product";
import AdminNav from "../../../components/nav/AdminNav";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import FileUploadForm from "../../../components/forms/FileUploadForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subcategory: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Yellow", "Green", "Red", "Black", "Silver", "Blue", "White", "Grey", "Space Grey", "Mate Black", "Mate Grey"],
  brands: ["Apple", "Lenovo", "HP", "Acer", "Microsoft", "Asus", "MSi", "Alienware", "Razer", "Huawei", "Dell", "Axioo", "Avita"],
  color: "",
  brand: "",
};

const UpdateProduct = ({ match, history }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [arrayOfSubcategory, setArrayOfSubcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadAllCategory();
    // eslint-disable-next-line
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
      // eslint-disable-next-line
      let arr = [];
      // eslint-disable-next-line
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
    setLoading(true);

    values.subcategory = arrayOfSubcategory;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);

        Swal.fire({
          title: `${res.data.title} is updated`,
          timer: 5000,
          text: "Thank for updating me :)",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          history.push("/admin/products");
        });
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
    <div className="main-container container-fluid">
      <div className="row row-cards">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="page-header pt-7">
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">Update Product</h1>}
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Update Product
                </li>
              </ol>
            </div>
          </div>

          <FileUploadForm values={values} setValues={setValues} setLoading={setLoading} />

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Product Form</h3>
            </div>
            <div className="card-body">
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
      </div>
    </div>
  );
};

export default UpdateProduct;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import FileUploadForm from "../../../components/forms/FileUploadForm";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { createProduct } from "../../../services/product";
import { getAllCategory, getAllSubcategoryForProduct } from "../../../services/category";

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
  colors: ["Yellow", "Green", "Red", "Black", "Silver", "Blue", "White", "Grey", "Space Grey", "Mate Black", "Mate Grey"],
  brands: ["Apple", "Lenovo", "HP", "Acer", "Microsoft", "Asus", "MSi", "Alienware", "Razer", "Huawei", "Dell", "Axioo", "Avita"],
  color: "",
  brand: "",
};

const CreateProduct = () => {
  const [values, setValues] = useState(initialState);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [loading, setLoading] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // Redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCategory();
    // eslint-disable-next-line
  }, []);

  const loadAllCategory = () => getAllCategory().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);

        Swal.fire({
          title: `${res.data.title} is created`,
          timer: 5000,
          text: "Please check your product list :)",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          window.location.reload();
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
    setValues({ ...values, subcategory: [], category: e.target.value });
    getAllSubcategoryForProduct(e.target.value).then((res) => {
      console.log("Subcategory Options on click", res);
      setSubcategoryOptions(res.data);
    });
    setShowSubcategory(true);
  };

  return (
    <div className="main-container container-fluid">
      <div className="row row-cards">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="page-header pt-7">
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">Add Product</h1>}
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Add Product
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
              <ProductCreateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setValues={setValues}
                values={values}
                handleCategoryChange={handleCategoryChange}
                subcategoryOptions={subcategoryOptions}
                showSubcategory={showSubcategory}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct } from "../../../services/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getAllCategory, getAllSubcategoryForProduct } from "../../../services/category";
import FileUploadForm from "../../../components/forms/FileUploadForm";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const UpdateProduct = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // Redux
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Update Product</h4>
          {/* {loading ? <Spin indicator={antIcon} /> : <h4>Create Product</h4>} */}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

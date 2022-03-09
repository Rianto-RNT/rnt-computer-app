import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import { useParams } from "react-router-dom";

const UpdateProduct = ({ match }) => {
  // Redux
  const { user } = useSelector((state) => ({ ...state }));

  // Router
  const { slug } = match.params;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Update Product</h4>

          {JSON.stringify(slug)}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

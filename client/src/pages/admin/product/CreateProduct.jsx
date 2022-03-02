import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { createProduct } from "../../../services/product";

const CreateProduct = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">Create Product</div>
        
      </div>
    </div>
  );
};

export default CreateProduct;

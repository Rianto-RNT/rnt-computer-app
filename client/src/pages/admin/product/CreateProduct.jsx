import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";

import { createProduct } from "../../../services/product";

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

  // Destructure
  const { title, description, price, categories, category, subcategory, shipping, quantity, images, colors, brands, color, brand } = values;

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
        toast.error(error.response.data.error)
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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" className="form-control" value={title} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input type="text" name="description" className="form-control" value={description} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input type="number" name="price" className="form-control" value={price} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Shipping</label>
              <select defaultValue={"please-select"} name="shipping" className="form-control" onChange={handleChange}>
                <option value="please-select" disabled>--Please select--</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Color</label>
              <select defaultValue={"please-select"} name="color" className="form-control" onChange={handleChange}>
                <option value="please-select" disabled>--Please select--</option>

                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select defaultValue={"please-select"} name="brand" className="form-control" onChange={handleChange}>
                <option value="please-select" disabled>--Please select--</option>

                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <br />

            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

import React from "react";
import { Select } from "antd";

// Ant Design
const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  setValues,
  handleCategoryChange,
  categories,
  subcategoryOptions,
  arrayOfSubcategory,
  setArrayOfSubcategory,
  selectedCategory,
}) => {
  const { title, description, price, category, subcategory, shipping, quantity, images, colors, brands, color, brand } = values;

  return (
    <form onSubmit={handleSubmit}>
      {/* <!-- ROW-1 OPEN --> */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-4">
                <label className="col-md-3 form-label">Product Name :</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Product Name"
                    value={title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* <!-- Row --> */}
              <div className="row mb-4">
                <label className="col-md-3 form-label">Product Description :</label>
                <div className="col-md-9">
                  <div className="form-group">
                    <textarea
                      type="textarea"
                      name="description"
                      className="form-control mb-4"
                      placeholder="Maximum 2000 character"
                      rows="4"
                      value={description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              {/* <!--End Row--> */}

              <div className="row mb-4">
                <label className="col-md-3 form-label">Price :</label>
                <div className="col-md-9">
                  <input type="number" name="price" className="form-control" value={price} onChange={handleChange} />
                </div>
              </div>

              <div className="row mb-4">
                <label className="col-md-3 form-label">Shipping :</label>
                <div className="col-md-9">
                  <select
                    value={shipping === "yes" ? "yes" : "no"}
                    name="shipping"
                    className="form-control form-select select2"
                    onChange={handleChange}
                  >
                    <option value="please-select" disabled>
                      --Select--
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="row mb-4">
                <label className="col-md-3 form-label">Quantity :</label>
                <div className="col-md-9">
                  <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange} />
                </div>
              </div>

              <div className="row mb-4">
                <label className="col-md-3 form-label">Color :</label>
                <div className="col-md-9">
                  <select value={color} name="color" className="form-control form-select select2" onChange={handleChange}>
                    <option value="please-select" disabled>
                      --Select--
                    </option>

                    {colors.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-4">
                <label className="col-md-3 form-label">Brand :</label>
                <div className="col-md-9">
                  <select value={brand} name="brand" className="form-control form-select select2" onChange={handleChange}>
                    <option value="please-select" disabled>
                      --Select--
                    </option>

                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-4">
                <label className="col-md-3 form-label">Category :</label>
                <div className="col-md-9">
                  <select
                    value={selectedCategory ? selectedCategory : category._id}
                    name="category"
                    className="form-control form-select select2"
                    onChange={handleCategoryChange}
                  >
                    <option disabled>--Select--</option>

                    {categories.length > 0 &&
                      categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="row mb-4">
                <label className="col-md-3 form-label">Subcategory :</label>
                <div className="col-md-9">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    value={arrayOfSubcategory}
                    onChange={(value) => setArrayOfSubcategory(value)}
                  >
                    {subcategoryOptions.length &&
                      subcategoryOptions.map((s) => (
                        <Option key={s._id} value={s._id}>
                          {s.name}
                        </Option>
                      ))}
                  </Select>
                </div>
              </div>

              
            </div>

            <div className="card-footer">
              {/* <!--Row--> */}
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-9">
                  <button className="btn btn-primary">Update</button>

                  <button className="btn btn-default float-end">Discard</button>
                </div>
              </div>
              {/* <!--End Row--> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /ROW-1 CLOSED --> */}
    </form>
  );
};

export default ProductUpdateForm;

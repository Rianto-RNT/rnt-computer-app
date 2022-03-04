import React from "react";
import { Select, Input } from "antd";

// Ant Design
const { TextArea } = Input;
const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  setValues,
  handleCategoryChange,
  subcategoryOptions,
  showSubcategory,
}) => {
  const { title, description, price, categories, category, subcategory, shipping, quantity, images, colors, brands, color, brand } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" className="form-control" value={title} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Description</label>
        <TextArea
          rows={4}
          placeholder="Maximum 2000 character"
          maxLength={2000}
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input type="number" name="price" className="form-control" value={price} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select defaultValue={"please-select"} name="shipping" className="form-control" onChange={handleChange}>
          <option value="please-select" disabled>
            --Please select--
          </option>
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
          <option value="please-select" disabled>
            --Please select--
          </option>

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
          <option value="please-select" disabled>
            --Please select--
          </option>

          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select defaultValue={"please-select"} name="category" className="form-control" onChange={handleCategoryChange}>
          <option value="please-select" disabled>
            --Please select--
          </option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {showSubcategory && (
        <div>
          <label>Subcategory</label>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subcategory}
            onChange={(value) => setValues({ ...values, subcategory: value })}
          >
            {subcategoryOptions.length &&
              subcategoryOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

      <br />

      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductCreateForm;

import React from "react";
import { Select, Input, Divider } from "antd";

// Ant Design
const { TextArea } = Input;
const { Option } = Select;
const dividerStyle = {
  marginBottom: 2,
  float: 'right'
};

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
      <div className="form-group">
        <Divider orientation="left" style={dividerStyle}>
          Title
        </Divider>
        <input type="text" name="title" className="form-control" value={title} onChange={handleChange} />
      </div>

      <div className="form-group">
        <Divider orientation="left" style={dividerStyle}>
          Description
        </Divider>
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
        <Divider orientation="left" style={dividerStyle}>
          Price
        </Divider>
        <input type="number" name="price" className="form-control" value={price} onChange={handleChange} />
      </div>

      <div className="form-group">
        <Divider orientation="left" style={dividerStyle}>
          Shipping
        </Divider>
        <select value={shipping === "yes" ? "yes" : "no"} name="shipping" className="form-control" onChange={handleChange}>
          <option value="please-select" disabled>
            --Please select--
          </option>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <Divider orientation="left" style={dividerStyle}>
          Quantity
        </Divider>
        <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange} />
      </div>

      <div className="form-group">
        <Divider orientation="left" style={dividerStyle}>
          Color
        </Divider>
        <select value={color} name="color" className="form-control" onChange={handleChange}>
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
        <Divider orientation="left" style={dividerStyle}>
          Brand
        </Divider>
        <select value={brand} name="brand" className="form-control" onChange={handleChange}>
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
        <Divider orientation="left" style={dividerStyle}>
          Category
        </Divider>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
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

      <div>
        <Divider orientation="left" style={dividerStyle}>
          Subcategory
        </Divider>
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

      <br />

      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;

import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form method="post" onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="form-label">Category Name</label>
      <input type="text" className="form-control " onChange={(e) => setName(e.target.value)} value={name || ""} autoFocus required></input>
    </div>
    <button className="btn btn-primary btn-sm ">Save</button>
  </form>
);

export default CategoryForm;

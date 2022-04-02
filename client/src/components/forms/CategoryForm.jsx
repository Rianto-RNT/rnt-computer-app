import React from "react";
//  <form className="mt-7" onSubmit={handleSubmit}>
//   <div className="form-group">
//     <label>Name</label>
//     <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} autoFocus required />
//     <br />
//     <button className="btn btn-outline-primary">Save</button>
//   </div>
// </form>

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form method="post" onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="form-label">Add Category</label>
      <input type="text" className="form-control " onChange={(e) => setName(e.target.value)} value={name} autoFocus required></input>
    </div>
    <button className="btn btn-primary btn-sm ">Save</button>
  </form>
);

export default CategoryForm;

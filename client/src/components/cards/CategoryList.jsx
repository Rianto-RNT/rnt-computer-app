import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategory } from "../../services/category";

const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllCategory().then((c) => {
      setCategory(c.data);
      setLoading(false);
    });
  }, []);

  const showAllCategory = () =>
    category.map((c) => (
      <ul key={c._id} className="list-group">
        <li className="list-group-item border-0 p-0">
          <Link to={`/category/${c.slug}`} className="btn btn-light btn-sm">
            <i className="fe fe-chevron-right"></i> {c.name}
          </Link>
          <span className="product-label">{c.slug.length}</span>
        </li>
      </ul>

      //   <li className="list-group-item border-0 p-0">
      //         <a href="#!">
      //           <i className="fe fe-chevron-right"></i> Mens
      //         </a>
      //         <span className="product-label">22</span>
      //       </li>
    ));

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Categories</div>
      </div>
      <div className="card-body">{loading ? <div> Loading... </div> : showAllCategory()}</div>
    </div>
  );
};

export default CategoryList;

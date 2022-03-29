import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSingleSubcategory, getAllSubcategory } from "../../services/subcategory";


const SubcategoryList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllSubcategory().then((res) => {
        setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <ul key={s._id} className="list-group">
        <li className="list-group-item border-0 p-0">
          <Link to={`/subcategory/${s.slug}`} className="btn btn-light btn-sm">
            <i className="fe fe-chevron-right"></i> {s.name}
          </Link>
          <span className="product-label">{s.slug.length}</span>
        </li>
      </ul>
    ));

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Subcategory</div>
      </div>
      <div className="card-body">{loading ? <div> Loading... </div> : showSubs()}</div>
    </div>
  );
};

export default SubcategoryList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Spin } from "antd";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { getSingleSubcategory, updateSubcategory } from "../../../services/subcategory";
import { getAllCategory } from "../../../services/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const UpdateSubcategory = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  // request from backend
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadAllCategory();
    loadSingleCategory();
  }, []);

  const loadAllCategory = () => getAllCategory().then((c) => setCategory(c.data));

  const loadSingleCategory = () =>
    getSingleSubcategory(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSubcategory(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        Swal.fire({
          title: `${res.data.name} is updated`,
          timer: 5000,
          text: "Please check your subcategory list :)",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          history.push("/admin/subcategory");
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="main-container container-fluid">
      <div className="row row-cards">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="page-header pt-7">
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">Subcategory</h1>}
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Update Subcategory
                </li>
              </ol>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  className="form-control"
                  onChange={(e) => setParent(e.target.value)}
                  defaultValue={"Please-Choose"}
                >
                  <option value="Please-Choose" disabled>
                    -Please Choose-
                  </option>
                  {category.length > 0 &&
                    category.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubcategory;

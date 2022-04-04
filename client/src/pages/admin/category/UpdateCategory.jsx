import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { updateCategory, getSingleCategory } from "../../../services/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const UpdateCategory = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => getSingleCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");

        Swal.fire({
          title: `${res.data.name} is updated`,
          timer: 5000,
          text: "Please check your category list :)",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          history.push("/admin/category");
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
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">Category</h1>}

            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Update Category
                </li>
              </ol>
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

    // <div className="container-fluid">
    //   <div className="row">
    //     <div className="col-md-2">
    //       <AdminNav />
    //     </div>
    //     <div className="col">
    //       {loading ? <Spin size="large" tip="Loading..." /> : <h4>Update Category</h4>}

    //       <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default UpdateCategory;

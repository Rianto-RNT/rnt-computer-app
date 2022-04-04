import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Spin } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import { createCategory, getAllCategory, removeCategory } from "../../../services/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/search/LocalSearch";

const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  // Search Category in Create Forms **Steps 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadAllCategory();
  }, []);

  const loadAllCategory = () => getAllCategory().then((c) => setCategory(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        Swal.fire({
          title: `${res.data.name} is created`,
          timer: 5000,
          text: "Please check your category list :)",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          loadAllCategory();
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((category) => {
      if (category.isConfirmed) {
        removeCategory(slug, user.token).then(() => {
          Swal.fire("Deleted!", "Your category has been deleted.", "success");
          loadAllCategory();
        });
      } else {
        Swal.fire("Cancelled", "Your category data is safe :)", "error");
      }
    });
  };

  // step 3

  // Step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="main-container container-fluid">
      <div className="row row-cards">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="page-header pt-7">
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">Category</h1>}{" "}
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Category
                </li>
              </ol>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
            </div>
          </div>

          {/* // STEP 2 and step 3 have been moved here */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* STEP 5  List of category in admin dashboard*/}
          <div className="card">
            <div className="card-body">
              <div className="card-header border-bottom-0 p-4">
                <h2 className="card-title">1 - 30 of 100 categories</h2>
                <div className="page-options ms-auto">
                  <select className="form-control select2 w-100">
                    <option value="asc">Latest</option>
                    <option value="desc">Oldest</option>
                  </select>
                </div>
              </div>

              <div className="e-table px-5 pb-5">
                <div className="table-responsive table-lg">
                  <table className="table border-top table-bordered mb-0">
                    <thead>
                      <tr>
                        <th className="text-center">Category Name</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    {category.filter(searched(keyword)).map((c) => (
                      <tbody key={c._id}>
                        <tr>
                          <td>{c.name}</td>
                          <td className="text-center">{c.createdAt}</td>

                          <td className="text-center align-middle">
                            <div className="btn-group align-top ">
                              <Link to={`/admin/category/${c.slug}`} className="btn btn-sm btn-warning badge" type="button">
                                <i className="fe fe-edit"></i>
                              </Link>
                              <button onClick={() => handleRemove(c.slug)} className="btn btn-sm btn-danger badge" type="button">
                                <i className="fe fe-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;

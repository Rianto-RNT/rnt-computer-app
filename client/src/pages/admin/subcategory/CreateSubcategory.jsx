import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { createSubcategory, removeSubcategory, getAllSubcategory } from "../../../services/subcategory";
import { getAllCategory } from "../../../services/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/search/LocalSearch";

const rightStyleEdit = { position: "absolute", top: 0, right: 15 };
const rightStyleDelete = {
  display: "flex-end",
  justifyContent: "space-between",
  position: "absolute",
  top: 0,
  right: 60,
};

const CreateSubcategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);

  // request from backend
  const [parents, setParents] = useState("");

  // Search Category in Create Foms **Steps 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadAllCategory();
    loadAllSubcategory();
  }, []);

  const loadAllCategory = () => getAllCategory().then((c) => setCategory(c.data));
  const loadAllSubcategory = () => getAllSubcategory().then((s) => setSubcategory(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSubcategory({ name, category: parents }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadAllSubcategory();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Remove Category?")) {
      setLoading(true);
      removeSubcategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadAllSubcategory();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setLoading(false);
            toast.error(error.response.data);
          }
        });
    }
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
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">Subcategory</h1>}
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Subcategory
                </li>
              </ol>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Category</label>
                <select defaultValue={"please-select"} name="parents" className="form-control" onChange={(e) => setParents(e.target.value)}>
                  <option value="please-select" disabled>
                    --Please select--
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

          {/* // STEP 2 and step 3 have been moved here */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* STEP 5 */}
          <div className="card">
            <div className="card-body">
              <div className="card-header border-bottom-0 p-4">
                <h2 className="card-title">1 - 25 of 256 subcategories</h2>
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
                        <th className="text-center">Subcategory Name</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    {subcategory.filter(searched(keyword)).map((s) => (
                      <tbody key={s._id}>
                        <tr>
                          <td>{s.name}</td>
                          <td className="text-center">{s.createdAt}</td>

                          <td className="text-center align-middle">
                            <div className="btn-group align-top ">
                              <Link to={`/admin/subcategory/${s.slug}`} className="btn btn-sm btn-warning badge" type="button">
                                <i className="fe fe-edit"></i>
                              </Link>
                              <button onClick={() => handleRemove(s.slug)} className="btn btn-sm btn-danger badge" type="button">
                                <i className="fe fe-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      // <div key={s._id} className="alert alert-secondary">
                      //   {s.name}
                      //   <span onClick={() => handleRemove(s.slug)} className="btn btn-md" style={rightStyleDelete}>
                      //     <DeleteOutlined className="text-danger" />
                      //   </span>
                      //   <span className="btn btn-md" style={rightStyleEdit}>
                      //     <Link to={`/admin/subcategory/${s.slug}`}>
                      //       <EditOutlined className="text-warning" />
                      //     </Link>
                      //   </span>
                      // </div>
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

export default CreateSubcategory;

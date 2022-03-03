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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? <Spin size="large" tip="Loading..." /> : <h4>Create Subcategory</h4>}

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

          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

          {/* // STEP 2 and step 3 have been moved here */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* STEP 5 */}
          {subcategory.filter(searched(keyword)).map((s) => (
            <div key={s._id} className="alert alert-secondary">
              {s.name}
              <span onClick={() => handleRemove(s.slug)} className="btn btn-md" style={rightStyleDelete}>
                <DeleteOutlined className="text-danger" />
              </span>
              <span className="btn btn-md" style={rightStyleEdit}>
                <Link to={`/admin/subcategory/${s.slug}`}>
                  <EditOutlined className="text-warning" />
                </Link>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateSubcategory;

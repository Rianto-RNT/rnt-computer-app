import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { createCategory, getAllCategory, removeCategory } from "../../../services/category";
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

const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  // Search Category in Create Foms **Steps 1
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
        toast.success(`"${res.data.name}" is created`);
        loadAllCategory();
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
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadAllCategory();
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
        <div className="col mt-8">
          {loading ? <Spin size="large" tip="Loading..." /> : <h4>Create Category</h4>}

          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

          {/* // STEP 2 and step 3 have been moved here */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />


          {/* STEP 5 */}
          {category.filter(searched(keyword)).map((c) => (
            <div key={c._id} className="alert alert-secondary">
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-md"
                style={rightStyleDelete}
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <span className="btn btn-md" style={rightStyleEdit}>
                <Link to={`/admin/category/${c.slug}`}>
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

export default CreateCategory;

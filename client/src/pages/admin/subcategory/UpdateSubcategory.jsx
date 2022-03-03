import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { getSingleSubcategory, updateSubcategory } from "../../../services/subcategory";
import { getAllCategory } from "../../../services/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const UpdateSubcategory = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  // request from backend
  const [parents, setParents] = useState("");

  useEffect(() => {
    loadAllCategory();
    loadSingleCategory();
  }, []);

  const loadAllCategory = () => getAllCategory().then((c) => setCategory(c.data));

  const loadSingleCategory = () =>
    getSingleSubcategory(match.params.slug).then((s) => {
      setName(s.data.name);
      setParents(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSubcategory(match.params.slug, { name, category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/subcategory");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <Spin size="large" tip="Loading..." /> : <h4>Update Subcategory</h4>}

          <div className="form-group">
            <label>Category</label>
            <select name="category" className="form-control" onChange={(e) => setParents(e.target.value)} defaultValue={"Please-Choose"}>
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

          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
        </div>
      </div>
    </div>
  );
};

export default UpdateSubcategory;

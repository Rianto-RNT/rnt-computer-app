import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import { auth } from "../../../firebase";

const AdminPassChange = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const changePasswordForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        {/* <label> Your Password</label> */}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Type your new password here..."
          disabled={loading}
          value={password}
        />
      </div>
      <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>
        Submit
      </button>
    </form>
  );

  return (
    <div className="main-container container-fluid">
      <div className="row row-cards">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="page-header pt-7">
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">Change Password</h1>}{" "}
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Change Password
                </li>
              </ol>
            </div>
          </div>

          <div className="card">
            <div className="card-header">New Password</div>
            <div className="card-body">{changePasswordForm()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPassChange;

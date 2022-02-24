import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Spin } from "antd";

const ChangePassword = () => {
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
        <label> Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Add a new password"
          disabled={loading}
          value={password}
        />
        <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? <Spin size="large" tip="Please wait..." /> : <h4>Change password</h4>}
          {changePasswordForm()}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

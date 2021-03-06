import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Form, Input, Button, Spin } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { Item } = Form;

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Please check your email to get the link for reset password");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("Error response from forgot password:", error);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <Spin size="large" tip="Please wait..." /> : <h4>Forgot Password</h4>}
          <Form
            name="forgot-pasword"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
          >
            <Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email for reset password",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoFocus
              />
            </Item>

            <Item>
              <Button
                onClick={handleSubmit}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                shape="round"
                size="middle"
              >
                Reset Password
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

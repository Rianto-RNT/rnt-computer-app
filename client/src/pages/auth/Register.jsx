import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Form, Input, Checkbox, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import rntLogo from "../../assets/images/rntLogo.png";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const { Item } = Form;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <Form
      name="Register"
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
            message: "Please input your email for registration",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </Item>
      <Item>
        <Item name="checkbox" valuePropName="checked" noStyle class="custom-control custom-checkbox mt-4">
          <Checkbox className="ps-checkbox">
            <span class="custom-control-label">
              Agree the <a href="terms.js">terms and policy</a>
            </span>
          </Checkbox>
        </Item>
      </Item>

      <Item>
        <Button
          onClick={handleSubmit}
          type="primary"
          htmlType="submit"
          className="login100-form-btn btn-primary"
          block
          shape="round"
          size="middle"
        >
          Register
        </Button>
      </Item>
    </Form>
  );

  return (
    <div className="login-img">
      <div className="page">
        <div className="">
          <div className="col col-login mx-auto mt-7">
            <div className="text-center">
              <img src={rntLogo} className="header-brand-img" alt="logo" />
            </div>
          </div>

          <div className="container-login100">
            <div className="wrap-login100 p-4 col-md-4">
              <span className="login100-form-title pb-4">Register</span>
              <span className="login100-form validate-form">{registerForm()}</span>

              <label className="login-social-icon">
                <span>Find Me On Social Media</span>
              </label>
              <div className="d-flex justify-content-center">
                <a href="https://web.facebook.com/ryanmorrisonsay/">
                  <div className="social-login me-4 text-center">
                    <i className="fe fe-facebook"></i>
                  </div>
                </a>
                <a href="https://twitter.com/ryanmorrisonsay">
                  <div className="social-login text-center">
                    <i className="fe fe-twitter"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

import { Form, Input, Button } from "antd";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const { Item } = Form;

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);
        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <Form
      name="password"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
    >
      <Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please add a Password to complete your registration!",
             
          },
          {
            min: 5, 
            message: 'Password must be minimum 6 characters.'
          }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Complete Registration
        </Button>
      </Item>
    </Form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;

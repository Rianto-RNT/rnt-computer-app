import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import {
  GoogleOutlined,
  MailOutlined,
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../services/auth";

const { Item } = Form;

const rightStyleForgotPassword = { position: "absolute", top: 0, right: 0 };

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  let dispatch = useDispatch();

  const roleBaseRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/my-account/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBaseRedirect(res);
        })
        .catch((error) => console.log(error));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBaseRedirect(res);
          })
          .catch((error) => console.log(error));

        // history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <Form
      name="normal_login"
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
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </Item>

      <Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          {
            min: 6,
            message: "Password must be minimum 6 characters.",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Item>

      <Item>
        <Item name="checkbox" valuePropName="checked" noStyle>
          <Checkbox className="ps-checkbox">Remember me</Checkbox>
        </Item>

        <Link to="/forgotpassword" style={rightStyleForgotPassword} className="login-form-forgot">
          Forgot password
        </Link>
      </Item>

      <Item>
        <Button
          onClick={handleSubmit}
          type="primary"
          htmlType="submit"
          className="login-form-button"
          block
          shape="round"
          icon={<MailOutlined />}
          size="middle"
          disabled={!email || password.length < 6}
        >
          Login with Email
        </Button>
      </Item>
    </Form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <Spin size="large" tip="Loading..." /> : <h4>Login</h4>}
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="middle"
          >
            Login with Google
          </Button>

          <Item className="text-center">
            <p>
              Not have an account ?
              <Link to="/register" variant="body2" type="link">
                &nbsp; Register
              </Link>
            </p>
          </Item>
        </div>
      </div>
    </div>
  );
};

export default Login;

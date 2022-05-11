import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { GoogleOutlined, MailOutlined, UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { auth, googleAuthProvider } from "../../firebase";
import { createOrUpdateUser } from "../../services/auth";
import rntLogo from "../../assets/images/rntLogo.png";

const { Item } = Form;

const rightStyleForgotPassword = { position: "absolute", top: 0, right: 0 };

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBaseRedirect = (res) => {
    // check if intended
    let intended = history.location.state;

    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/my-account/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

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
        <div className="text-end pt-4">
          <p className="mb-0">
            <Link to="/forgot-password" style={rightStyleForgotPassword} className="text-primary ms-1">
              Forgot Password?
            </Link>
          </p>
        </div>
      </Item>

      <Item>
        <Button
          onClick={handleSubmit}
          type="primary"
          htmlType="submit"
          className="login100-form-btn btn-primary"
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
    <div className="login-img">
      <div className="page">
        <div className="">
          <div className="col col-login mx-auto mt-7">
            <div className="text-center">
              <img src={rntLogo} className="header-brand-img" alt="logo" />
            </div>
          </div>

          <div className="container-login100">
            <div className="wrap-login100 p-6">
              {loading ? (
                <Spin size="middle" tip="Please Wait.." style={{ fontSize: 18 }} className="login100-form-title pb-5" />
              ) : (
                <span className="login100-form-title pb-5">Login</span>
              )}
              <form className="login100-form validate-form">{loginForm()}</form>
              <Button
                onClick={googleLogin}
                type="danger"
                className="login100-form-btn btn-danger"
                block
                shape="round"
                icon={<GoogleOutlined />}
                size="middle"
              >
                Login with Google
              </Button>

              <Item className="text-center pt-3">
                <p className="text-dark mb-0">
                  Not a member?
                  <Link to="/register" variant="body2" type="link" className="text-primary ms-1">
                    &nbsp; Sign Up
                  </Link>
                </p>
              </Item>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

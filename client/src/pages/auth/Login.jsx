import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Form, Input, Button, Checkbox, Spin} from "antd";
import {
  GoogleOutlined,
  MailOutlined,
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const { Item } = Form;
const rightStyleForgotPassword = { position: "absolute", top: 0, right: 0 };

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name: user.email,
          token: idTokenResult.token,
        },
      });

      history.push("/");
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

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: user.email,
            token: idTokenResult.token,
          },
        });

        history.push("/");
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
        <Item name="remember" history="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Item>

        <a style={rightStyleForgotPassword} className="login-form-forgot" href="">
          Forgot password
        </a>
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
            <p>Not have an account ?
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

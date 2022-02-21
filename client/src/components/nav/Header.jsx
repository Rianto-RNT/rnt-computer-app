import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

const centerStyle = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
};

const rightStyleRegister = { position: "absolute", top: 0, right: 0 };
const rightStyleLogin = {
  display: "flex-end",
  justifyContent: "space-between",
  position: "absolute",
  top: 0,
  right: 120,
};

const Header = () => {
  const [current, setCurrent] = useState("home");

  let distpatch = useDispatch();
  let history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key)
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    distpatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="register" icon={<UserAddOutlined />} style={rightStyleRegister}>
        <Link to="/register">Register</Link>
      </Item>

      <Item key="login" icon={<LoginOutlined />} style={rightStyleLogin}>
        <Link to="/login">Login</Link>
      </Item>

      <SubMenu style={centerStyle} key="username" icon={<UserOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;

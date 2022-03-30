import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, UserAddOutlined, UserOutlined, LoginOutlined, LogoutOutlined, ShopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const rightStyleRegister = { position: "absolute", top: 0, right: 0 };
const rightStyleLogin = {
  display: "flex-end",
  justifyContent: "space-between",
  position: "absolute",
  top: 0,
  right: 120,
};

const rightStyleSearch = {
  display: "flex-end",
  justifyContent: "space-between",
  position: "absolute",
  top: 0,
  right: 300,
};

const leftStyleShop = {
  display: "flex-end",
  justifyContent: "space-between",
  position: "absolute",
  top: 0,
  right: 800,
};

const Header = () => {
  const [current, setCurrent] = useState("home");

  let distpatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
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
    <Menu className="app-header sticky" key="header" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} style={rightStyleRegister}>
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<LoginOutlined />} style={rightStyleLogin}>
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu key="sub-menu" style={rightStyleRegister} icon={<UserOutlined />} title={user.email && user.email.match(/^([^@]*)@/)[1]}>
          {user && user.role === "subscriber" && (
            <Item key="dashboard">
              <Link to="/my-account/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item key="dashboard">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      <Search />
    </Menu>
  );
};

export default Header;

import React, { useState } from "react";
import { Menu, Dropdown, Avatar, Skeleton } from "antd";
import {
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { Item } = Menu;

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

  const avatarDropdown = (
    <Menu key="avatar-dropdown">
      <Item key="option 1">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Option 1
        </a>
      </Item>
      <Item key="option 2">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Option 2
        </a>
      </Item>
      <Item danger key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Item>
    </Menu>
  );

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
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
        <Dropdown
          key="username"
          overlay={avatarDropdown}
          title={user.email && user.email.match(/^.+(?=@)/)[0]}
        >
          <div onClick={(e) => e.preventDefault()} style={rightStyleLogin}>
            <Avatar
              style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              size="middle"
              icon={<UserOutlined />}
            />
          </div>
        </Dropdown>
      )}

    </Menu>
  );
};

export default Header;

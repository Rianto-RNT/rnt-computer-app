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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu;

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
        <SubMenu
          key="sub-menu"
          style={rightStyleRegister}
          icon={<UserOutlined />}
          title={user.email && user.email.match(/^([^@]*)@/)[1]}
        >
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

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>

        // <Dropdown
        //   key="username"
        //   overlay={avatarDropdown}
        //   title={user.email && user.email.split("@")[0]} // email.match(/^.+(?=@)/)[0] OR email.split("@")[0]
        // >
        //   <div onClick={(e) => e.preventDefault()} style={rightStyleLogin}>
        //     {/* <Avatar
        //       style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        //       size="middle"
        //       icon={<UserOutlined />}
        //     /> */}
        //   </div>
        // </Dropdown>
      )}
    </Menu>
  );
};

export default Header;

import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    // console.log(e.key)
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        Home
      </Item>

      <Item key="login" icon={<LoginOutlined />} className="float-sm-right">
        Login
      </Item>

      <Item key="register" icon={<UserAddOutlined />} className="float-sm-right">
        Register
      </Item>

      <SubMenu icon={<UserOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;

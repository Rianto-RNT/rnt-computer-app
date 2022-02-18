import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined,  UserAddOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('');

  const handleClick = (e) => {
    // 
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<AppstoreOutlined />}>
        Home
      </Menu.Item>

      <SubMenu key="SubMenu" icon={<UserAddOutlined />} title="Register">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
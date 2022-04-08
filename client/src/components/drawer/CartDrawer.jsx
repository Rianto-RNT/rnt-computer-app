import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Link from "react-router-dom";
import noImages from "../../assets/images/noImages.png";

const CartDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  return <Drawer visible={true}>{JSON.stringify(cart)}</Drawer>;
};

export default CartDrawer;

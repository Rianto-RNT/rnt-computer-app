import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Spin size="large" tip="Loading..." />
  );
};

export default UserRoute;

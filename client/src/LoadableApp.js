import React, { Component } from "react";
import Loadable from "react-loadable";
import { Spin } from "antd";

const styles = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 280,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
};

const LoadApp = Loadable({
  loader: () => import("./App"),
  loading() {
    return (
      <div className="container">
        <Spin size="large" style={styles} />
      </div>
    );
  },
  timeout: 10000, // 10 seconds
});
export default class LoadableApp extends Component {
  render() {
    return <LoadApp />;
  }
}

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect one count is equal to 0
    count === 0 && history.push("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container p-5 text-center">
      <Spin size="large" tip="Please wait, we redirect you in moment..." />
      <br />
      <p> {count} </p>
    </div>
  );
};

export default LoadingToRedirect;

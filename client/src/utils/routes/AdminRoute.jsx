import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../services/auth";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [good, setGood] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("Current Admin Response", res);
          setGood(true);
        })
        .catch((error) => {
          console.log("Admin Route Error", error);
          setGood(false);
        });
    }
  }, [user]);

  return good ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;

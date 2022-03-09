import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Header from "./components/nav/Header";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";

import UserRoute from "./utils/routes/UserRoute";
import History from "./pages/myAccounts/History";
import ChangePassword from "./pages/myAccounts/ChangePassword";
import Wishlist from "./pages/myAccounts/Wishlist";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./utils/routes/AdminRoute";
import CreateCategory from "./pages/admin/category/CreateCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";

import CreateSubcategory from "./pages/admin/subcategory/CreateSubcategory";
import UpdateSubcategory from "./pages/admin/subcategory/UpdateSubcategory";

import CreateProduct from "./pages/admin/product/CreateProduct";
import AllProducts from "./pages/admin/product/AllProducts";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./services/auth";

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => console.log(error));
      }
    });

    //Cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/complete-registration" component={RegisterComplete} />
        <Route exact path="/forgot-password" component={ForgotPassword} />

        <UserRoute exact path="/my-account/history" component={History} />
        <UserRoute exact path="/my-account/change-password" component={ChangePassword} />
        <UserRoute exact path="/my-account/wishlist" component={Wishlist} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CreateCategory} />
        <AdminRoute exact path="/admin/category/:slug" component={UpdateCategory} />

        <AdminRoute exact path="/admin/subcategory" component={CreateSubcategory} />
        <AdminRoute exact path="/admin/subcategory/:slug" component={UpdateSubcategory} />
       
        <AdminRoute exact path="/admin/product" component={CreateProduct} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
      </Switch>
    </>
  );
};

export default App;

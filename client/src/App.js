import React, { useEffect } from "react";

import { hot } from "react-hot-loader";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./assets/css/style.css";
import "./assets/css/style.css.map";
import "./assets/css/dark-style.css";
import "./assets/css/skin-modes.css";
import "./assets/css/transparent-style.css";

import "react-datepicker/dist/react-datepicker.css";

import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CategoryHome from "./pages/category/CategoryHome";
import SubcategoryHome from "./pages/category/SubcategoryHome";
import Header from "./components/nav/Header";
import Footer from "./components/nav/Footer";

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

import CreateCoupon from "./pages/admin/coupon/CreateCoupon";

import CreateProduct from "./pages/admin/product/CreateProduct";
import AllProducts from "./pages/admin/product/AllProducts";
import UpdateProduct from "./pages/admin/product/UpdateProduct";

import ProductDetail from "./pages/product/ProductDetail";
import CartDrawer from "./components/drawer/CartDrawer";

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
      <CartDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/subcategory/:slug" component={SubcategoryHome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/complete-registration" component={RegisterComplete} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/product/:slug" component={ProductDetail} />

        <UserRoute exact path="/my-account/history" component={History} />
        <UserRoute exact path="/my-account/change-password" component={ChangePassword} />
        <UserRoute exact path="/my-account/wishlist" component={Wishlist} />
        <UserRoute exact path="/checkout" component={Checkout} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CreateCategory} />
        <AdminRoute exact path="/admin/category/:slug" component={UpdateCategory} />

        <AdminRoute exact path="/admin/subcategory" component={CreateSubcategory} />
        <AdminRoute exact path="/admin/subcategory/:slug" component={UpdateSubcategory} />

        <AdminRoute exact path="/admin/coupon" component={CreateCoupon} />

        <AdminRoute exact path="/admin/product" component={CreateProduct} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={UpdateProduct} />
      </Switch>
      <Footer />
    </>
  );
};

export default hot(module)(App);

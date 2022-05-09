import React, { useEffect, lazy, Suspense } from "react";

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
import { Spin } from "antd";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./services/auth";

// import Home from "./pages/Home";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Payment from "./pages/Payment";
// import CategoryHome from "./pages/category/CategoryHome";
// import SubcategoryHome from "./pages/category/SubcategoryHome";
// import Header from "./components/nav/Header";
// import Footer from "./components/nav/Footer";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import ForgotPassword from "./pages/auth/ForgotPassword";

// import UserRoute from "./utils/routes/UserRoute";
// import History from "./pages/myAccounts/History";
// import ChangePassword from "./pages/myAccounts/ChangePassword";
// import Wishlist from "./pages/myAccounts/Wishlist";

// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminRoute from "./utils/routes/AdminRoute";
// import CreateCategory from "./pages/admin/category/CreateCategory";
// import UpdateCategory from "./pages/admin/category/UpdateCategory";

// import CreateSubcategory from "./pages/admin/subcategory/CreateSubcategory";
// import UpdateSubcategory from "./pages/admin/subcategory/UpdateSubcategory";

// import CreateCoupon from "./pages/admin/coupon/CreateCoupon";

// import CreateProduct from "./pages/admin/product/CreateProduct";
// import AllProducts from "./pages/admin/product/AllProducts";
// import UpdateProduct from "./pages/admin/product/UpdateProduct";

// import ProductDetail from "./pages/product/ProductDetail";
// import CartDrawer from "./components/drawer/CartDrawer";

// USING LAZY
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubcategoryHome = lazy(() => import("./pages/category/SubcategoryHome"));
const Header = lazy(() => import("./components/nav/Header"));
const Footer = lazy(() => import("./components/nav/Footer"));

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));

const UserRoute = lazy(() => import("./utils/routes/UserRoute"));
const History = lazy(() => import("./pages/myAccounts/History"));
const ChangePassword = lazy(() => import("./pages/myAccounts/ChangePassword"));
const Wishlist = lazy(() => import("./pages/myAccounts/Wishlist"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminRoute = lazy(() => import("./utils/routes/AdminRoute"));
const CreateCategory = lazy(() => import("./pages/admin/category/CreateCategory"));
const UpdateCategory = lazy(() => import("./pages/admin/category/UpdateCategory"));

const CreateSubcategory = lazy(() => import("./pages/admin/subcategory/CreateSubcategory"));
const UpdateSubcategory = lazy(() => import("./pages/admin/subcategory/UpdateSubcategory"));

const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));

const CreateProduct = lazy(() => import("./pages/admin/product/CreateProduct"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const UpdateProduct = lazy(() => import("./pages/admin/product/UpdateProduct"));

const ProductDetail = lazy(() => import("./pages/product/ProductDetail"));
const CartDrawer = lazy(() => import("./components/drawer/CartDrawer"));

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

  const styles = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 280,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Suspense
      fallback={
        <>
          <div className="container-fluid pt-8">
            <Spin size="large" style={styles} />
          </div>
        </>
      }
    >
      <Header />
      <CartDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />

        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />

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
    </Suspense>
  );
};

export default hot(module)(App);

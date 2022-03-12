import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <div className="sticky">
    <div className="main-sidemenu">
      <ul className="side-menu">
        <li className="sub-category">
          <h3>Main</h3>
        </li>

        <li className="slide">
          <Link to="/admin/dashboard" className="side-menu__item" data-bs-toggle="slide">
            <i className="side-menu__icon fe fe-cpu"></i>
            <span className="side-menu__label">Dashboard</span>
            <i className="angle fe fe-chevron-right"></i>
          </Link>
        </li>

        <li className="sub-category">
          <h3>Product</h3>
        </li>
        <li className="slide">
          <Link to="/admin/product" className="side-menu__item" data-bs-toggle="slide">
            <i className="side-menu__icon fe fe-cpu"></i>
            <span className="side-menu__label">Add Product</span>
            <i className="angle fe fe-chevron-right"></i>
          </Link>
        </li>
        <li className="slide">
          <Link to="/admin/products" className="side-menu__item" data-bs-toggle="slide">
            <i className="side-menu__icon fe fe-cpu"></i>
            <span className="side-menu__label">Products List</span>
            <i className="angle fe fe-chevron-right"></i>
          </Link>
        </li>

        <li className="sub-category">
          <h3>Category and Sub</h3>
        </li>
        <li className="slide">
          <Link to="/admin/category" className="side-menu__item" data-bs-toggle="slide">
            <i className="side-menu__icon fe fe-cpu"></i>
            <span className="side-menu__label">Category</span>
            <i className="angle fe fe-chevron-right"></i>
          </Link>
        </li>
        <li className="slide">
          <Link to="/admin/subcategory" className="side-menu__item" data-bs-toggle="slide">
            <i className="side-menu__icon fe fe-cpu"></i>
            <span className="side-menu__label">Subcategory</span>
            <i className="angle fe fe-chevron-right"></i>
          </Link>
        </li>

        <li className="sub-category">
          <h3>Other</h3>
        </li>
        <li className="slide">
          <Link to="/admin/coupon" className="side-menu__item" data-bs-toggle="slide">
            <i className="side-menu__icon fe fe-cpu"></i>
            <span className="side-menu__label">Redeem Coupons</span>
            <i className="angle fe fe-chevron-right"></i>
          </Link>
        </li>

        <li className="sub-category">
          <h3>Settings</h3>
        </li>
        <li className="slide">
          <Link to="/admin/password" className="side-menu__item" data-bs-toggle="slide">
            <i className="side-menu__icon fe fe-cpu"></i>
            <span className="side-menu__label">Password</span>
            <i className="angle fe fe-chevron-right"></i>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default AdminNav;

import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link">Product</Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link">All Products</Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link">Category</Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub-category" className="nav-link">Sub Category</Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link">Coupons</Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/password" className="nav-link">Password</Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;

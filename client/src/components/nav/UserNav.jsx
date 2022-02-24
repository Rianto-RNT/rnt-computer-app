import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/my-account/history" className="nav-link">History</Link>
      </li>

      <li className="nav-item">
        <Link to="/my-account/change-password" className="nav-link">Password</Link>
      </li>

      <li className="nav-item">
        <Link to="/my-account/wishlist" className="nav-link">Wishlist</Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;

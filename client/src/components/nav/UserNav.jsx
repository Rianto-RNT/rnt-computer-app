import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <div className="sticky mt-8">
    <div className="main-sidemenu">
      <div className="card">
        <ul className="side-menu">
          <li className="sub-category">
            <h3>Main</h3>
          </li>

          <li className="slide">
            <Link to="/my-account/history" className="side-menu__item" data-bs-toggle="slide">
              <i className="side-menu__icon fe fe-grid"></i>
              <span className="side-menu__label">History</span>
              <i className="angle fe fe-chevron-right"></i>
            </Link>
          </li>

          <li className="sub-category">
            <h3>Other</h3>
          </li>
          <li className="slide">
            <Link to="/my-account/wishlist" className="side-menu__item" data-bs-toggle="slide">
              <i className="side-menu__icon fe fe-shopping-bag"></i>
              <span className="side-menu__label">Wishlist</span>
              <i className="angle fe fe-chevron-right"></i>
            </Link>
          </li>

          <li className="sub-category">
            <h3>Settings</h3>
          </li>
          <li className="slide">
            <Link to="/my-account/change-password" className="side-menu__item" data-bs-toggle="slide">
              <i className="side-menu__icon fe fe-lock"></i>
              <span className="side-menu__label">Password</span>
              <i className="angle fe fe-chevron-right"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  // <nav>
  //   <ul className="nav flex-column">
  //     <li className="nav-item">
  //       <Link to="/my-account/history" className="nav-link">History</Link>
  //     </li>

  //     <li className="nav-item">
  //       <Link to="/my-account/change-password" className="nav-link">Password</Link>
  //     </li>

  //     <li className="nav-item">
  //       <Link to="/my-account/wishlist" className="nav-link">Wishlist</Link>
  //     </li>
  //   </ul>
  // </nav>
);

export default UserNav;

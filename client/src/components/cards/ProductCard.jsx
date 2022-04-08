import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import noImages from "../../assets/images/noImages.png";
import productAverageRatings from "../../services/rating";

const ProductCard = ({ product }) => {
  const { title, price, images, slug } = product;

  const [tooltip, setTooltip] = useState("Click to add");

  // Redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Create Cart Array
    let cart = [];
    if (typeof window !== undefined) {
      // if cart is in localstorate then GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      //console.log('unique ===>>' unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      // Show cart item in drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <div className="card">
      <div className="product-grid6">
        <div className="product-image6 p-5">
          <ul className="icons">
            <li>
              <Link to={`/product/${slug}`} className="bg-primary text-white border-primary border">
                <i className="fe fe-eye"> </i>
              </Link>
            </li>
          </ul>

          <Link to={`/product/${slug}`} className="bg-light">
            <img
              className="img-fluid br-7 w-100"
              src={images && images.length ? images[0].url : noImages}
              style={{ height: "333px", objectFit: "cover" }}
              alt="img"
            />
          </Link>
        </div>

        <div className="product-content text-center">
          <div className="title">
            <h6 className="title fw-bold fs-14" numberofline={2}>
              {title.length < 35 ? `${title}` : `${title.substring(0, 50)}...`}
            </h6>
          </div>

          <div className="mb-3 text-danger">
            <span className="h-100 d-flex justify-content-center align-items-center">
              {product && product.ratings && product.ratings.length > 0 ? productAverageRatings(product) : "No Ratings Found"}
            </span>
          </div>

          <div className="price pt-3">
            <h5 className="display-8 text-danger">
              <p>Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </h5>
          </div>
        </div>

        <div className="card-footer text-center">
          <button
            onClick={handleAddToCart}
            data-bs-placement="left"
            data-bs-toggle="tooltip-primary"
            title={tooltip}
            className="btn btn-primary mb-1"
          >
            <i className="fe fe-shopping-cart me-2"></i>Add to cart
          </button>

          <a href="wishlist.html" className="btn btn-outline-primary mb-1">
            <i className="fe fe-heart me-2 wishlist-icon"></i>Add to wishlist
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React from "react";
import noImages from "../../assets/images/noImages.png";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { title, price, images, slug } = product;

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
            <li>
              <a href="add-product.html" className="bg-success text-white border-success border">
                <i className="fe fe-edit"></i>
              </a>
            </li>
            <li>
              <a href="#!" className="bg-danger text-white border-danger border">
                <i className="fe fe-x"></i>
              </a>
            </li>
          </ul>

          <a href="shop-description.html" className="bg-light">
            <img
              className="img-fluid br-7 w-100"
              src={images && images.length ? images[0].url : noImages}
              style={{ height: "333px", objectFit: "cover" }}
              alt="img"
            />
          </a>
        </div>

        <div className="product-content text-center">
          <div className="title">
            <h6 className="title fw-bold fs-14" numberofline={2}>
              {title.length < 35 ? `${title}` : `${title.substring(0, 50)}...`}
            </h6>
          </div>

          <div className="mb-2 text-warning">
            <i className="fa fa-star text-warning" />
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star text-warning"></i>
            <i className="fa fa-star-half-o text-warning"></i>
            <i className="fa fa-star-o text-warning"></i>
          </div>
          <div className="price">
            <h5 className="display-8 text-danger">
              <p>Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </h5>
          </div>
        </div>

        <div className="card-footer text-center">
          <Link to={"/cart/item"} className="btn btn-primary mb-1">
            <i className="fe fe-shopping-cart me-2"></i>Add to cart
          </Link>
          <a href="wishlist.html" className="btn btn-outline-primary mb-1">
            <i className="fe fe-heart me-2 wishlist-icon"></i>Add to wishlist
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

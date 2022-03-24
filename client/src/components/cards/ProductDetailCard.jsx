import React, { useState } from "react";
import noImages from "../../assets/images/noImages.png";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import StarRatings from "react-star-ratings";

const ProductDetailCard = ({ product }) => {
  const { title, price, description, images, quantity, slug, _id } = product;

  return (
    <div className="card">
      <div className="card-body">
        <div className="row row-sm">
          <div className="col-xl-5 col-lg-12 col-md-12">
            <div className="row">
              <div className="col-xl-12">
                <div className="product-carousel">
                  <div className="carousel slide border">
                    <div className="carousel-inner">
                      {images && images.length ? (
                        <Carousel showArrows={true} infiniteLoop={true}>
                          {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                        </Carousel>
                      ) : (
                        <img src={noImages} alt="img" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="details col-xl-7 col-lg-12 col-md-12 mt-4 mt-xl-0">
            <div className="mt-2 mb-4">
              <h3 className="mb-3 fw-semibold">{title}</h3>

              <div className="text-muted float-start me-3">
                <StarRatings
                  name={_id}
                  numberOfStars={5}
                  rating={2}
                  changeRating={(newRating, name) => console.log("newRating", newRating, "name", name)}
                  isSelectable={true}
                  starRatedColor="orange"
                />
              </div>
                        <br />
              <p className="text-muted mb-4">( 40 Customers Reviews) </p>
                        
              <div className="row mt-6">
                <h3 className="mb-4">
                  <span className="me-2 fw-bold fs-25">
                    <p>Rp. {price}</p>
                    {/* .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") */}
                  </span>
                  <span>
                    <del className="fs-18 text-muted">Todo diskon price</del>
                  </span>
                </h3>
              </div>

              <div>
                <h4 className="mt-4">
                  <b> Description</b>
                </h4>
                <p>{description}</p>
              </div>

              <div className=" mt-4 mb-5">
                <span className="fw-bold me-2">Offer :</span>
                <span className="fw-bold text-primary">15% Cashback </span>by using icici bank credit card.
                <small className="text-muted">Terms and Conditions Applies!</small>
              </div>
              <div className=" mt-4 mb-5">
                <span className="fw-bold me-2">Availability :</span>
                <span className="fw-bold text-success">In-stock</span>
              </div>
              <div className="colors d-flex me-3 mt-4 mb-5">
                <span className="mt-2 fw-bold">Colors:</span>
                <div className="row gutters-xs ms-4">
                  <div className="col-3">
                    <label className="colorinput">
                      <input name="color" type="radio" defaultValue="azure" className="colorinput-input" />
                      <span className="colorinput-color bg-danger rounded-10"></span>
                    </label>
                  </div>
                  <div className="col-3">
                    <label className="colorinput">
                      <input name="color" type="radio" defaultValue="indigo" className="colorinput-input" />
                      <span className="colorinput-color bg-dark rounded-10"></span>
                    </label>
                  </div>
                  <div className="col-3">
                    <label className="colorinput">
                      <input name="color" type="radio" defaultValue="purple" className="colorinput-input" />
                      <span className="colorinput-color bg-info rounded-10"></span>
                    </label>
                  </div>
                  <div className="col-3">
                    <label className="colorinput">
                      <input name="color" type="radio" defaultValue="pink" className="colorinput-input" />
                      <span className="colorinput-color bg-success rounded-10"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row row-sm">
                <div className="col">
                  <div className="mb-2 me-2 sizes">
                    <span className="fw-bold me-4">Quantity:</span>
                    <div className="input-group input-indec input-indec1 w-30 w-sm-50 mt-3">
                      <span className="input-group-btn">
                        <button type="button" className="minus btn btn-white btn-number btn-icon br-7 ">
                          <i className="fa fa-minus text-muted"></i>
                        </button>
                      </span>
                      <input type="text" name="quantity" className="form-control text-center qty" defaultValue="1" />
                      <span className="input-group-btn">
                        <button type="button" className="quantity-right-plus btn btn-white btn-number btn-icon br-7 add">
                          <i className="fa fa-plus text-muted"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="btn-list mt-4">
                <a href="cart.html" className="btn ripple btn-primary me-2">
                  <i className="fe fe-shopping-cart"> </i> Add to cart
                </a>
                <a href="checkout.html" className="btn ripple btn-secondary">
                  <i className="fe fe-credit-card"> </i> Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;

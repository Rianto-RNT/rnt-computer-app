import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../../services/product";
import ProductDetailCard from "../../components/cards/ProductDetailCard";
import ProductSpecificationCard from "../../components/cards/ProductSpesificationCard";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () => getSingleProduct(slug).then((res) => setProduct(res.data));
  return (
    <div className="row">
      <div className="col-xl-12">
        <ProductDetailCard product={product} />
      </div>

      <div className="col-xl-12 col-md-12">
        <ProductSpecificationCard product={product}/>
      </div>

      <h3 className="p-3 mb-5">Related Products</h3>
      <div className="col-md-6 col-xl-3">
        <div className="card">
          <div className="product-grid6">
            <div className="product-image6 p-5">
              <ul className="icons">
                <li>
                  <a href="shop-description.html" className="bg-primary text-white border-primary border">
                    <i className="fe fe-eye "> </i>
                  </a>
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
                <img className="img-fluid br-7 w-100" src="../assets/images/pngs/4.jpg" alt="img" />
              </a>
            </div>
            <div className="card-body pt-0">
              <div className="product-content text-center">
                <h1 className="title fw-bold fs-20">
                  <a href="shop-description.html">Flower Pot for Home Decor</a>
                </h1>
                <div className="mb-2 text-warning">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star-half-o text-warning"></i>
                  <i className="fa fa-star-o text-warning"></i>
                </div>
                <div className="price">
                  $16,599<span className="ms-4">$18,299</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <a href="cart.html">
                <button type="button" className="btn btn-primary mb-1">
                  <i className="fe fe-shopping-cart me-2"></i>Add to cart
                </button>
              </a>
              <a href="wishlist.html">
                <button type="button" className="btn btn-outline-primary mb-1">
                  <i className="fe fe-heart me-2"></i>Add to wishlist
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-3">
        <div className="card">
          <div className="product-grid6">
            <div className="product-image6 p-5">
              <ul className="icons">
                <li>
                  <a href="shop-description.html" className="bg-primary text-white border-primary border">
                    <i className="fe fe-eye "> </i>
                  </a>
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
                <img className="img-fluid br-7 w-100" src="../assets/images/pngs/6.jpg" alt="img" />
              </a>
            </div>
            <div className="card-body pt-0">
              <div className="product-content text-center">
                <h1 className="title fw-bold fs-20">
                  <a href="shop-description.html">Black Digital Camera</a>
                </h1>
                <div className="mb-2 text-warning">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star-half-o text-warning"></i>
                  <i className="fa fa-star-o text-warning"></i>
                </div>
                <div className="price">
                  $16,599<span className="ms-4">$56,599</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <a href="cart.html">
                <button type="button" className="btn btn-primary mb-1">
                  <i className="fe fe-shopping-cart me-2"></i>Add to cart
                </button>
              </a>
              <a href="wishlist.html">
                <button type="button" className="btn btn-outline-primary mb-1">
                  <i className="fe fe-heart me-2"></i>Add to wishlist
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-3">
        <div className="card">
          <div className="product-grid6">
            <div className="product-image6 p-5">
              <ul className="icons">
                <li>
                  <a href="shop-description.html" className="bg-primary text-white border-primary border">
                    <i className="fe fe-eye "> </i>
                  </a>
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
                <img className="img-fluid br-7 w-100" src="../assets/images/pngs/9.jpg" alt="img" />
              </a>
            </div>
            <div className="card-body pt-0">
              <div className="product-content text-center">
                <h1 className="title fw-bold fs-20">
                  <a href="shop-description.html">Candy Pure Rose Water</a>
                </h1>
                <div className="mb-2 text-warning">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star-half-o text-warning"></i>
                  <i className="fa fa-star-o text-warning"></i>
                </div>
                <div className="price">
                  $16,599<span className="ms-4">$25,599</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <a href="cart.html">
                <button type="button" className="btn btn-primary mb-1">
                  <i className="fe fe-shopping-cart me-2"></i>Add to cart
                </button>
              </a>
              <a href="wishlist.html">
                <button type="button" className="btn btn-outline-primary mb-1">
                  <i className="fe fe-heart me-2"></i>Add to wishlist
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-xl-3">
        <div className="card">
          <div className="product-grid6">
            <div className="product-image6 p-5">
              <ul className="icons">
                <li>
                  <a href="shop-description.html" className="bg-primary text-white border-primary border">
                    <i className="fe fe-eye "> </i>
                  </a>
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
                <img className="img-fluid br-7 w-100" src="../assets/images/pngs/10.jpg" alt="img" />
              </a>
            </div>
            <div className="card-body pt-0">
              <div className="product-content text-center">
                <h1 className="title fw-bold fs-20">
                  <a href="shop-description.html">White Tshirt for Men</a>
                </h1>
                <div className="mb-2 text-warning">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star-half-o text-warning"></i>
                  <i className="fa fa-star-o text-warning"></i>
                </div>
                <div className="price">
                  $16,599<span className="ms-4">$18,399</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <a href="cart.html">
                <button type="button" className="btn btn-primary mb-1">
                  <i className="fe fe-shopping-cart me-2"></i>Add to cart
                </button>
              </a>
              <a href="wishlist.html">
                <button type="button" className="btn btn-outline-primary mb-1">
                  <i className="fe fe-heart me-2"></i>Add to wishlist
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

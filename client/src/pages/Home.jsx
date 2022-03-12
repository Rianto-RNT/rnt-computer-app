import React, { useEffect, useState } from "react";
import { getProductByCount } from "../services/product";
import ProductCard from "../components/cards/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProduct();
  }, []);

  const loadAllProduct = () => {
    setLoading(true);
    getProductByCount(3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    // <div className="main-content app-content mt-0">
    <div className="side-app">
      {/* <!-- CONTAINER --> */}
      <div className="main-container container-fluid">
        {/* <!-- PAGE-HEADER --> */}
        <div className="page-header">
          <h1 className="page-title">Shop</h1>
          <div>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#!">E-Commerce</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Shop
              </li>
            </ol>
          </div>
        </div>
        {/* <!-- PAGE-HEADER END --> */}

        {/* <!-- ROW-1 OPEN --> */}
        <div className="row row-cards">
          <div className="col-xl-3 col-lg-4">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Categories</div>
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item border-0 p-0">
                        <a href="#!">
                          <i className="fe fe-chevron-right"></i> Mens
                        </a>
                        <span className="product-label">22</span>
                      </li>
                      <li className="list-group-item border-0 p-0">
                        <a href="#!">
                          <i className="fe fe-chevron-right"></i> Womens
                        </a>
                        <span className="product-label">15</span>
                      </li>
                      <li className="list-group-item border-0 p-0">
                        <a href="#!">
                          <i className="fe fe-chevron-right"></i> Kids
                        </a>
                        <span className="product-label">10</span>
                      </li>
                      <li className="list-group-item border-0 p-0">
                        <a href="#!">
                          <i className="fe fe-chevron-right"></i> Others
                        </a>
                        <span className="product-label">88</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Price Range</div>
                  </div>
                  <div className="card-body">
                    <label className="custom-control custom-radio mb-0 mt-1">
                      <input type="radio" className="custom-control-input" name="example-radios" value="option1" />
                      <span className="custom-control-label">Upto $500</span>
                    </label>
                    <label className="custom-control custom-radio mb-0 mt-1">
                      <input type="radio" className="custom-control-input" name="example-radios" value="option1" />
                      <span className="custom-control-label">$500 - $1000</span>
                    </label>
                    <label className="custom-control custom-radio mb-0 mt-1">
                      <input type="radio" className="custom-control-input" name="example-radios" value="option1" />
                      <span className="custom-control-label">$1000 - $1500</span>
                    </label>
                    <label className="custom-control custom-radio mb-0 mt-1">
                      <input type="radio" className="custom-control-input" name="example-radios" value="option1" />
                      <span className="custom-control-label">Over $2000</span>
                    </label>
                    <div className="d-flex">
                      <div className="card-body px-0">
                        <div id="mySlider"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Colors</h3>
                  </div>
                  <div className="card-body">
                    <form className="shop__filter">
                      <div className="row gutters-xs">
                        <div className="col-auto">
                          <label className="colorinput">
                            <input name="color" type="radio" value="azure" className="colorinput-input" />
                            <span className="colorinput-color bg-azure"></span>
                          </label>
                        </div>
                        <div className="col-auto">
                          <label className="colorinput">
                            <input name="color" type="radio" value="indigo" className="colorinput-input" />
                            <span className="colorinput-color bg-indigo"></span>
                          </label>
                        </div>
                        <div className="col-auto">
                          <label className="colorinput">
                            <input name="color" type="radio" value="purple" className="colorinput-input" />
                            <span className="colorinput-color bg-purple"></span>
                          </label>
                        </div>
                        <div className="col-auto">
                          <label className="colorinput">
                            <input name="color" type="radio" value="pink" className="colorinput-input" />
                            <span className="colorinput-color bg-pink"></span>
                          </label>
                        </div>
                        <div className="col-auto">
                          <label className="colorinput">
                            <input name="color" type="radio" value="red" className="colorinput-input" />
                            <span className="colorinput-color bg-red"></span>
                          </label>
                        </div>
                        <div className="col-auto">
                          <label className="colorinput">
                            <input name="color" type="radio" value="orange" className="colorinput-input" />
                            <span className="colorinput-color bg-orange"></span>
                          </label>
                        </div>
                        <div className="col-auto">
                          <label className="colorinput">
                            <input name="color" type="radio" value="yellow" className="colorinput-input" />
                            <span className="colorinput-color bg-yellow"></span>
                          </label>
                        </div>
                        <div className="col-auto">
                          <label className="colorinput">
                            <input name="color" type="radio" value="lime" className="colorinput-input" />
                            <span className="colorinput-color bg-lime"></span>
                          </label>
                        </div>
                        <div className="col-auto">
                          <label className="colorinput">
                            <input name="color" type="radio" value="green" className="colorinput-input" />
                            <span className="colorinput-color bg-green"></span>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select name="beast" id="select-beast" className="form-control form-select select2">
                        <option value="0">--Select--</option>
                        <option value="1">Dress</option>
                        <option value="2">Bags &amp; Purses</option>
                        <option value="3">Coat &amp; Jacket</option>
                        <option value="4">Beauty</option>
                        <option value="5">Jeans</option>
                        <option value="5">Jewellery</option>
                        <option value="5">Electronics</option>
                        <option value="5">Sports</option>
                        <option value="5">Technology</option>
                        <option value="5">Watches</option>
                        <option value="5">Accessories</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Brand</label>
                      <select name="beast" id="select-beast1" className="form-control form-select select2">
                        <option value="0">--Select--</option>
                        <option value="1">White</option>
                        <option value="2">Black</option>
                        <option value="3">Red</option>
                        <option value="4">Green</option>
                        <option value="5">Blue</option>
                        <option value="6">Yellow</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Type</label>
                      <select name="beast" id="select-beast2" className="form-control form-select select2">
                        <option value="0">--Select--</option>
                        <option value="1">Extra Small</option>
                        <option value="2">Small</option>
                        <option value="3">Medium</option>
                        <option value="4">Large</option>
                        <option value="5">Extra Large</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Color</label>
                      <select name="beast" id="select-beast3" className="form-control form-select select2">
                        <option value="0">--Select--</option>
                        <option value="1">White</option>
                        <option value="2">Black</option>
                        <option value="3">Red</option>
                        <option value="4">Green</option>
                        <option value="5">Blue</option>
                        <option value="6">Yellow</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Top Products</div>
                  </div>
                  <div className="card-body">
                    <div className="">
                      <div className="d-flex overflow-visible">
                        <img
                          className="avatar bradius avatar-xl me-4 p-2 bg-white border"
                          src="../src/assets/images/pngs/8.png"
                          alt="avatar-img"
                        />
                        <div className="media-body valign-middle">
                          <a href="" className="fw-semibold text-dark">
                            Hand Bag
                          </a>
                          <div className="mb-1 text-warning">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                            <i className="fa fa-star-o"></i>
                          </div>
                          <h5 className="fw-bold">$345</h5>
                        </div>
                      </div>
                      <div className="d-flex overflow-visible mt-5">
                        <img
                          className="avatar bradius avatar-xl me-4 p-2 bg-white border"
                          src="../src/assets/images/pngs/5.png"
                          alt="avatar-img"
                        />
                        <div className="media-body valign-middle">
                          <a href="" className="fw-semibold text-dark">
                            Chair
                          </a>
                          <div className="mb-1 text-warning">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                            <i className="fa fa-star-o"></i>
                          </div>
                          <h5 className="fw-bold">$345</h5>
                        </div>
                      </div>
                      <div className="d-flex overflow-visible mt-5">
                        <img
                          className="avatar bradius avatar-xl me-4 p-2 bg-white border"
                          src="../src/assets/images/pngs/1.png"
                          alt="avatar-img"
                        />
                        <div className="media-body valign-middle">
                          <a href="" className="fw-semibold text-dark">
                            Laptop Bag
                          </a>
                          <div className="mb-1 text-warning">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                            <i className="fa fa-star-o"></i>
                          </div>
                          <h5 className="fw-bold">$345</h5>
                        </div>
                      </div>
                      <div className="d-flex overflow-visible mt-5">
                        <img
                          className="avatar bradius avatar-xl me-4 p-2 bg-white border"
                          src="../src/assets/images/pngs/6.png"
                          alt="avatar-img"
                        />
                        <div className="media-body valign-middle">
                          <a href="" className="fw-semibold text-dark">
                            Watch
                          </a>
                          <div className="mb-1 text-warning">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                            <i className="fa fa-star-o"></i>
                          </div>
                          <h5 className="fw-bold">$345</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- COL-END --> */}
          <div className="col-xl-9 col-lg-8">
            <div className="row">
              <div className="col-xl-12">
                <div className="card p-0">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-xl-5 col-lg-8 col-md-8 col-sm-8">
                        <div className="input-group d-flex w-100 float-start">
                          <input type="text" className="form-control border-end-0 my-2" placeholder="Search ..." />
                          <button className="btn input-group-text bg-transparent border-start-0 text-muted my-2">
                            <i className="fe fe-search text-muted" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                        <ul className="nav item2-gl-menu float-end my-2">
                          <li className="border-end">
                            <a href="#tab-11" className="show active" data-bs-toggle="tab" title="List style">
                              <i className="fa fa-th"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#tab-12" data-bs-toggle="tab" className="" title="Grid">
                              <i className="fa fa-list"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-xl-3 col-lg-12">
                        <a href="add-product.html" className="btn btn-primary btn-block float-end my-2">
                          <i className="fa fa-plus-square me-2"></i>New Product
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-content">
              <div className="tab-pane active" id="tab-11">
                <div className="row">
                  {/* Product Card START */}
                  <div className="col-md-6 col-xl-4 col-sm-6">
                    {products.map((product) => (
                      <div className="card" key={product.id}> 
                        
                         

                        <div className="product-grid6">
                          <div className="product-image6 p-5">
                            <ul className="icons">
                              <li>
                                <a href="shop-description.html" className="bg-primary text-white border-primary border">
                                  <i className="fe fe-eye"> </i>
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
                              <img className="img-fluid br-7 w-100" src="../src/assets/images/noImages.png" alt="img" />
                            </a>
                          </div>

                          <div className="card-body pt-0">
                            <div className="product-content text-center">
                            <ProductCard product={product} />
                              
                              <div className="mb-2 text-warning">
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star-half-o text-warning"></i>
                                <i className="fa fa-star-o text-warning"></i>
                              </div>
                              <div className="price">
                                $599<span className="ms-4">$799</span>
                              </div>
                            </div>
                          </div>

                          <div className="card-footer text-center">
                            <a href="cart.html" className="btn btn-primary mb-1">
                              <i className="fe fe-shopping-cart me-2"></i>Add to cart
                            </a>
                            <a href="wishlist.html" className="btn btn-outline-primary mb-1">
                              <i className="fe fe-heart me-2 wishlist-icon"></i>Add to wishlist
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Product Card END */}

                  <div className="mb-5">
                    <div className="float-end">
                      <ul className="pagination ">
                        <li className="page-item page-prev disabled">
                          <a className="page-link" href="#!" tabIndex="-1">
                            Prev
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#!">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#!">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#!">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#!">
                            4
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#!">
                            5
                          </a>
                        </li>
                        <li className="page-item page-next">
                          <a className="page-link" href="#!">
                            Next
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="tab-12">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card overflow-hidden">
                      <div className="card-body">
                        <div className="row g-0">
                          <div className="col-xl-3 col-lg-12 col-md-12">
                            <div className="product-list">
                              <div className="product-image">
                                <ul className="icons">
                                  <li>
                                    <a href="shop-description.html" className="bg-primary border-primary border">
                                      <i className="fe fe-eye text-white "></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="add-product.html" className="bg-success border-success border">
                                      <i className="fe fe-edit text-white "></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="wishlist.html" className="bg-danger border-danger border">
                                      <i className="fe fe-x text-white"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="br-be-0 br-te-0">
                                <a href="shop-description.html" className=""></a>
                                <img src="../src/assets/images/pngs/9.jpg" alt="img" className="cover-image br-7 w-100" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 border-end my-auto">
                            <div className="card-body">
                              <div className="mb-3">
                                <a href="shop-description.html" className="">
                                  <h3 className="fw-bold fs-30 mb-3">Candy Pure Rose Water</h3>
                                  <div className="mb-2 text-warning">
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star-half-o fs-18 text-warning"></i>
                                    <i className="fa fa-star-o fs-18 text-warning"></i>
                                  </div>
                                </a>
                                <p className="fs-16">
                                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat,quis
                                  nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat
                                </p>
                                <form className="shop__filter">
                                  <div className="row gutters-xs">
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="azure" className="colorinput-input" />
                                        <span className="colorinput-color bg-azure"></span>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="indigo" className="colorinput-input" />
                                        <span className="colorinput-color bg-indigo"></span>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="purple" className="colorinput-input" />
                                        <span className="colorinput-color bg-purple"></span>
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-12 col-md-12 my-auto">
                            <div className="card-body p-0">
                              <div className="price h3 text-center mb-5 fw-bold">$599</div>
                              <a href="cart.html" className="btn btn-primary btn-block">
                                <i className="fe fe-shopping-cart me-2"></i>Add to cart
                              </a>
                              <a href="wishlist.html" className="btn btn-outline-primary btn-block mt-2">
                                <i className="fe fe-heart me-2 wishlist-icon"></i>Add to wishlist
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card overflow-hidden">
                      <div className="card-body">
                        <div className="row g-0">
                          <div className="col-xl-3 col-lg-12 col-md-12">
                            <div className="product-list">
                              <div className="product-image">
                                <ul className="icons">
                                  <li>
                                    <a href="shop-description.html" className="bg-primary border-primary border">
                                      <i className="fe fe-eye text-white "></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="add-product.html" className="bg-success border-success border">
                                      <i className="fe fe-edit text-white "></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="wishlist.html" className="bg-danger border-danger border">
                                      <i className="fe fe-x text-white"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="br-be-0 br-te-0">
                                <a href="shop-description.html" className=""></a>
                                <img src="../src/assets/images/pngs/10.jpg" alt="img" className="cover-image br-7 w-100" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 border-end my-auto">
                            <div className="card-body">
                              <div className="mb-3">
                                <a href="shop-description.html" className="">
                                  <h3 className="fw-bold fs-30 mb-3">White Tshirt for Men</h3>
                                  <div className="mb-2 text-warning">
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star-half-o fs-18 text-warning"></i>
                                    <i className="fa fa-star-o fs-18 text-warning"></i>
                                  </div>
                                </a>
                                <p className="fs-16">
                                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat,quis
                                  nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat
                                </p>
                                <form className="shop__filter">
                                  <div className="row gutters-xs">
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="azure" className="colorinput-input" />
                                        <span className="colorinput-color bg-azure"></span>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="indigo" className="colorinput-input" />
                                        <span className="colorinput-color bg-indigo"></span>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="purple" className="colorinput-input" />
                                        <span className="colorinput-color bg-purple"></span>
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-12 col-md-12 my-auto">
                            <div className="card-body p-0">
                              <div className="price h3 text-center mb-5 fw-bold">$1,399</div>
                              <a href="cart.html" className="btn btn-primary btn-block">
                                <i className="fe fe-shopping-cart me-2"></i>Add to cart
                              </a>
                              <a href="wishlist.html" className="btn btn-outline-primary btn-block mt-2">
                                <i className="fe fe-heart me-2 wishlist-icon"></i>Add to wishlist
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card overflow-hidden">
                      <div className="card-body">
                        <div className="row g-0">
                          <div className="col-xl-3 col-lg-12 col-md-12">
                            <div className="product-list">
                              <div className="product-image">
                                <ul className="icons">
                                  <li>
                                    <a href="shop-description.html" className="bg-primary border-primary border">
                                      <i className="fe fe-eye text-white "></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="add-product.html" className="bg-success border-success border">
                                      <i className="fe fe-edit text-white "></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="wishlist.html" className="bg-danger border-danger border">
                                      <i className="fe fe-x text-white"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="br-be-0 br-te-0">
                                <a href="shop-description.html" className=""></a>
                                <img src="../src/assets/images/pngs/8.jpg" alt="img" className="cover-image br-7 w-100" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 border-end my-auto">
                            <div className="card-body">
                              <div className="mb-3">
                                <a href="shop-description.html" className="">
                                  <h3 className="fw-bold fs-30 mb-3">Stylish Rockerz 255 Ear Pods</h3>
                                  <div className="mb-2 text-warning">
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star-half-o fs-18 text-warning"></i>
                                    <i className="fa fa-star-o fs-18 text-warning"></i>
                                  </div>
                                </a>
                                <p className="fs-16">
                                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat,quis
                                  nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat
                                </p>
                                <form className="shop__filter">
                                  <div className="row gutters-xs">
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="azure" className="colorinput-input" />
                                        <span className="colorinput-color bg-azure"></span>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="indigo" className="colorinput-input" />
                                        <span className="colorinput-color bg-indigo"></span>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="purple" className="colorinput-input" />
                                        <span className="colorinput-color bg-purple"></span>
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-12 col-md-12 my-auto">
                            <div className="card-body p-0">
                              <div className="price h3 text-center mb-5 fw-bold">$16,599</div>
                              <a href="cart.html">
                                <span className="btn btn-primary btn-block">
                                  <i className="fe fe-shopping-cart me-2"></i>Add to cart
                                </span>
                              </a>
                              <a href="wishlist.html">
                                <span className="btn btn-outline-primary btn-block mt-2">
                                  <i className="fe fe-heart me-2 wishlist-icon"></i>Add to wishlist
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card overflow-hidden">
                      <div className="card-body">
                        <div className="row g-0">
                          <div className="col-xl-3 col-lg-12 col-md-12">
                            <div className="product-list">
                              <div className="product-image">
                                <ul className="icons">
                                  <li>
                                    <a href="shop-description.html" className="bg-primary border-primary border">
                                      <i className="fe fe-eye text-white "></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="add-product.html" className="bg-success border-success border">
                                      <i className="fe fe-edit text-white "></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="wishlist.html" className="bg-danger border-danger border">
                                      <i className="fe fe-x text-white"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="br-be-0 br-te-0">
                                <a href="shop-description.html" className=""></a>
                                <img src="../src/assets/images/pngs/4.jpg" alt="img" className="cover-image br-7 w-100" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 border-end my-auto">
                            <div className="card-body">
                              <div className="mb-3">
                                <a href="shop-description.html" className="">
                                  <h3 className="fw-bold fs-30 mb-3">Flower Pot for Home Decor</h3>
                                  <div className="mb-2 text-warning">
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star-half-o fs-18 text-warning"></i>
                                    <i className="fa fa-star-o fs-18 text-warning"></i>
                                  </div>
                                </a>
                                <p className="fs-16">
                                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat,quis
                                  nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat
                                </p>
                                <form className="shop__filter">
                                  <div className="row gutters-xs">
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="azure" className="colorinput-input" />
                                        <span className="colorinput-color bg-azure"></span>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="indigo" className="colorinput-input" />
                                        <span className="colorinput-color bg-indigo"></span>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="purple" className="colorinput-input" />
                                        <span className="colorinput-color bg-purple"></span>
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-12 col-md-12 my-auto">
                            <div className="card-body p-0">
                              <div className="price h3 text-center mb-5 fw-bold">$1,299</div>
                              <a href="cart.html">
                                <span className="btn btn-primary btn-block">
                                  <i className="fe fe-shopping-cart me-2"></i>Add to cart
                                </span>
                              </a>
                              <a href="wishlist.html">
                                <span className="btn btn-outline-primary btn-block mt-2">
                                  <i className="fe fe-heart me-2 wishlist-icon"></i>Add to wishlist
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card overflow-hidden">
                      <div className="card-body">
                        <div className="row g-0">
                          <div className="col-xl-3 col-lg-12 col-md-12">
                            <div className="product-list">
                              <div className="product-image">
                                <ul className="icons">
                                  <li>
                                    <a href="shop-description.html" className="bg-primary border-primary border">
                                      <i className="fe fe-eye text-white "></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="add-product.html" className="bg-success border-success border">
                                      <i className="fe fe-edit text-white "></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="wishlist.html" className="bg-danger border-danger border">
                                      <i className="fe fe-x text-white"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="br-be-0 br-te-0">
                                <a href="shop-description.html" className=""></a>
                                <img src="../src/assets/images/pngs/3.jpg" alt="img" className="cover-image br-7 w-100" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-12 col-md-12 border-end my-auto">
                            <div className="card-body">
                              <div className="mb-3">
                                <a href="shop-description.html" className="">
                                  <h3 className="fw-bold fs-30 mb-3">Running Shoes for men</h3>
                                  <div className="mb-2 text-warning">
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star fs-18 text-warning"></i>
                                    <i className="fa fa-star-half-o fs-18 text-warning"></i>
                                    <i className="fa fa-star-o fs-18 text-warning"></i>
                                  </div>
                                </a>
                                <p className="fs-16">
                                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat,quis
                                  nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat
                                </p>
                                <form className="shop__filter">
                                  <div className="row gutters-xs">
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="azure" className="colorinput-input" />
                                        <span className="colorinput-color bg-azure"></span>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="indigo" className="colorinput-input" />
                                        <span className="colorinput-color bg-indigo"></span>
                                      </label>
                                    </div>
                                    <div className="col-auto">
                                      <label className="colorinput">
                                        <input type="checkbox" name="color" value="purple" className="colorinput-input" />
                                        <span className="colorinput-color bg-purple"></span>
                                      </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-12 col-md-12 my-auto">
                            <div className="card-body p-0">
                              <div className="price h3 text-center mb-5 fw-bold">$6,599</div>
                              <a href="cart.html">
                                <span className="btn btn-primary btn-block">
                                  <i className="fe fe-shopping-cart me-2"></i>Add to cart
                                </span>
                              </a>
                              <a href="wishlist.html">
                                <span className="btn btn-outline-primary btn-block mt-2">
                                  <i className="fe fe-heart me-2 wishlist-icon"></i>Add to wishlist
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="float-end">
                      <ul className="pagination ">
                        <li className="page-item page-prev disabled">
                          <a className="page-link" href="#!" tabIndex="-1">
                            Prev
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#!">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#!">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#!">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#!">
                            4
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#!">
                            5
                          </a>
                        </li>
                        <li className="page-item page-next">
                          <a className="page-link" href="#!">
                            Next
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- COL-END --> */}
          </div>
          {/* <!-- ROW-1 CLOSED --> */}
        </div>
        {/* <!-- ROW-1 END --> */}
      </div>
      {/* <!-- CONTAINER CLOSED --> */}
    </div>
    // </div>
  );
};

export default Home;

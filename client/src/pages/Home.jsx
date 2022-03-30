import React, { useEffect, useState } from "react";
import { getProductByCount } from "../services/product";
import ProductCard from "../components/cards/ProductCard";
import LoaderCard from "../components/cards/LoaderCard";
import HomeBanner from "../components/carousel/HomeBanner";
import NewArrivalCard from "../components/cards/NewArrivalCard";
import BestSellerCard from "../components/cards/BestSellerCard";
import CategoryList from "../components/cards/CategoryList";
import SubcategoryList from "../components/cards/SubcategoryList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProduct();
  }, []);

  const loadAllProduct = () => {
    setLoading(true);
    getProductByCount(9).then((res) => {
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
        <div className="page-header pt-5">
          <div className="col-xl-12">
            

            {/* CAROUSEL */}
            <HomeBanner HomeBanner={HomeBanner} />
            {/* END OF CROUSEL */}

            {/* BEST SELLER */}
            <BestSellerCard />
            {/* ENDBEST SELLER */}

            {/* END OF CROUSEL */}
            <NewArrivalCard />
            {/* END OF CROUSEL */}
          </div>
        </div>

        {/* <!-- PAGE-HEADER END --> */}

        {/* <!-- ROW-1 OPEN --> */}
        <div className="row row-cards">
          <div className="col-xl-3 col-lg-4">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                
                <CategoryList />

                <SubcategoryList />

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
                    <div className="card-title">Top Product</div>
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
                          <a className="fw-semibold text-dark" href="#!">
                            Hand Bag
                          </a>
                          <div className="mb-1 text-warning">
                            <i className="fe fe-star"></i>
                            <i className="fe fe-star"></i>
                            <i className="fe fe-star"></i>
                            <i className="fe fe-star-half-o"></i>
                            <i className="fe fe-star-o"></i>
                          </div>
                          <h5 className="fw-bold">$345</h5>
                        </div>
                      </div>
                    </div>
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
                          <a className="fw-semibold text-dark" href="#!">
                            Hand Bag
                          </a>
                          <div className="mb-1 text-warning">
                            <i className="fe fe-star"></i>
                            <i className="fe fe-star"></i>
                            <i className="fe fe-star"></i>
                            <i className="fe fe-star-half-o"></i>
                            <i className="fe fe-star-o"></i>
                          </div>
                          <h5 className="fw-bold">$345</h5>
                        </div>
                      </div>
                    </div>
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
                          <a className="fw-semibold text-dark" href="#!">
                            Hand Bag
                          </a>
                          <div className="mb-1 text-warning">
                            <i className="fe fe-star"></i>
                            <i className="fe fe-star"></i>
                            <i className="fe fe-star"></i>
                            <i className="fe fe-star-half-o"></i>
                            <i className="fe fe-star-o"></i>
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
            <div className="tab-content">
              <div className="tab-pane active" id="tab-11">
                {loading ? (
                  <LoaderCard count={15} />
                ) : (
                  <div className="row">
                    {products.map((product) => (
                      <div key={product._id} className="col-md-6 col-xl-4 col-sm-6">
                        <ProductCard product={product} />
                      </div>
                    ))}

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
                )}
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

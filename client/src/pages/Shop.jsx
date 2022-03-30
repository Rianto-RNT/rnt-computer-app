import React, { useState, useEffect } from "react";
import { getProductByCount } from "../services/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { fetchProductByFilter } from "../services/product";
import { Slider, Switch } from "antd";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 35000000]);
  const [ok, setOk] = useState(false);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  const fetchProducts = (arg) => {
    fetchProductByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1) load products by default on page load
  const loadAllProducts = () => {
    getProductByCount(15).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2) load product on user search text input
  useEffect(() => {
    const searchDelayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(searchDelayed);
  }, [text]);

  // 3) load product by price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    // <div className="main-content app-content mt-0">
    <div className="side-app">
      {/* <!-- CONTAINER --> */}
      <div className="main-container container-fluid">
        {/* <!-- PAGE-HEADER --> */}
        <div className="page-header pt-8">
          <div className="col-xl-12">{loading ? <h4>Loading...</h4> : <h4>Shop</h4>}</div>
        </div>
        {/* <!-- PAGE-HEADER END --> */}

        {/* <!-- ROW-1 OPEN --> */}
        <div className="row row-cards">
          <div className="col-xl-3 col-lg-4">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Price Range</div>
                  </div>

                  <div className="card-body">
                    <div className="d-flex">
                      <div className="card-body px-0">
                        <Slider
                          tipFormatter={(v) => `Rp. ${v}`}
                          range={true}
                          value={price}
                          formatter={(value) => `$ ${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ",")}
                          parser={(value) => value.replace(new RegExp(/\$\s?|(,*)/g), "")}
                          defaultValue={1000}
                          onChange={handleSlider}
                          max="50000000"
                          tooltipVisible
                        />
                      </div>
                    </div>
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
                <span>{products.length < 1 && <p>No Products Found</p>}</span>

                <div className="row">
                  {products.map((p) => (
                    <div key={p._id} className="col-md-6 col-xl-4 col-sm-6">
                      <ProductCard product={p} />
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
              </div>

              {/* <!-- COL-END --> */}
            </div>
            {/* <!-- ROW-1 CLOSED --> */}
          </div>
          {/* <!-- ROW-1 END --> */}
        </div>
        {/* <!-- CONTAINER CLOSED --> */}
      </div>
    </div>
  );
};

export default Shop;

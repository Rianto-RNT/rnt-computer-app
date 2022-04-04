import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Slider, Checkbox, Button, Radio } from "antd";
import { getProductByCount } from "../services/product";
import { getAllCategory } from "../services/category";
import { getAllSubcategory } from "../services/subcategory";
import { fetchProductByFilter } from "../services/product";
import ProductCard from "../components/cards/ProductCard";
import Star from "../components/forms/Star";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 35000000]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setbrands] = useState([
    "Apple",
    "Lenovo",
    "HP",
    "Acer",
    "Microsoft",
    "Asus",
    "MSi",
    "Alienware",
    "Razer",
    "Huawei",
    "Dell",
    "Axioo",
    "Avita",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Yellow",
    "Green",
    "Red",
    "Black",
    "Silver",
    "Blue",
    "White",
    "Grey",
    "Space Grey",
    "Mate Black",
    "Mate Grey",
  ]);
  const [color, setColor] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    window.scrollTo(0, 0);
    loadAllProducts();

    //Fetch Category
    getAllCategory().then((res) => setCategories(res.data));

    // Fetch Subcategory
    getAllSubcategory().then((res) => setSubs(res.data));
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
    setCategoryId([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4) Load products by category (list all category with checkbox)
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");

    let inTheState = [...categoryId];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index of -1

    // indexOf method?? if not found returns -1 else return index
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryId(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox checked={categoryId.includes(c._id)} onChange={handleCheck} value={c._id}>
          {c.name}
        </Checkbox>
      </div>
    ));

  // 5) Load Product by Star Ratings
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryId([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <>
      <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
        <div type="button" className="mb-1 text-danger btn-info-light btn-sm btn-pill">
          <Star starClick={handleStarClick} numberOfStars={5} />
        </div>
        <div type="button" className="mb-1 text-danger  btn-info-light btn-sm btn-pill">
          <Star starClick={handleStarClick} numberOfStars={4} />
        </div>
        <div type="button" className="mb-1 text-danger  btn-info-light btn-sm btn-pill">
          <Star starClick={handleStarClick} numberOfStars={3} />
        </div>
        <div type="button" className="mb-1 text-danger btn-info-light btn-sm btn-pill">
          <Star starClick={handleStarClick} numberOfStars={2} />
        </div>
        <div type="button" className="mb-1 text-danger  btn-info-light btn-sm btn-pill">
          <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
      </div>
    </>
  );

  // 6) Load Product By Subcategory
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        type="Button"
        className="btn btn-default-light btn-sm mb-1 pl-4 pr-4"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("Subcategory ==>", s);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryId([]);
    setStar("");
    setBrand("");
    setColor("");
    fetchProducts({ sub });
  };

  // 7) Load Product by Brands
  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryId([]);
    setStar("");
    setColor("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () =>
    brands.map((b) => (
      <div >
        <Radio value={b} name={b} checked={b === brand} onChange={handleBrand}>
          {b}
        </Radio>
      </div>
    ));

  // 8) Load Products by Color
  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryId([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const ShowColors = () =>
    colors.map((c) => (
      <div className="btn-group">
        <label className="colorinput">
          <input name={c} type="radio" value={c} checked={c === color} onChange={handleColor} className="colorinput-input" />
          <span className="colorinput-color bg-gray"></span>
          <span className="col-md-10">{c}</span>
        </label>
      </div>
    ));

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
                      {showCategories()}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Shipping</label>
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
                      <label className="form-label">Brand</label>
                      {showBrands()}
                    </div>

                    <div className="text-wrap">
                      <div className="form-group">
                        <label className="form-label">Subcategory</label>
                        {showSubs()}
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
                        {ShowColors()}

                        {/* <div className="col-auto">
                          <label className="colorinput">
                            <input name="color" type="radio" value="azure" className="colorinput-input" />
                            <span className="colorinput-color bg-azure"></span>
                          </label>
                        </div> */}
                        {/* <div className="col-auto">
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
                        </div> */}
                      </div>
                    </form>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Ratings</div>
                  </div>
                  <div className="card-body">
                    <div className="">
                      <div className="media-body valign-middle">{showStars()}</div>
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

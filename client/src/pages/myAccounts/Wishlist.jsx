import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../services/user";
import LocalSearch from "../../components/search/LocalSearch";
import productAverageRatings from "../../services/rating";
import noImages from "../../assets/images/noImages.png";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      // console.log(res);
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  const searched = (keyword) => (p) => p.title.toLowerCase().includes(keyword);

  return (
    <div className="main-container container-fluid">
      <div className="row row-cards">
        <div className="col-md-2">
          <UserNav />
        </div>

        <div className="col-md-10">
          <div className="page-header pt-7">
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">Wishlist</h1>}
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/my-account/wishlist"}>User History</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Wishlist
                </li>
              </ol>
            </div>
          </div>

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <div className="row">
            {wishlist.filter(searched(keyword)).map((p) => (
              <div className="col-md-6 col-xl-4 col-sm-6" key={p._id}>
                <div className="card">
                  <div className="product-grid6">
                    <div className="product-image6 p-5">
                      <ul className="icons-wishlist">
                        <li>
                          <a
                            onClick={() => handleRemove(p.id)}
                            className="bg-danger text-white border-danger border"
                            data-bs-dismiss="alert"
                            aria-hidden="true"
                          >
                            <i className="fe fe-x-circle"></i>
                          </a>
                        </li>
                      </ul>
                      <Link to={`/product/${p.slug}`} className="bg-light">
                        <img
                          alt="image"
                          className="img-fluid br-7 w-100"
                          src={p.images && p.images.length ? p.images[0].url : noImages}
                          style={{ height: "333px", objectFit: "cover" }}
                        />
                      </Link>
                    </div>
                    <div className="card-body pt-0">
                      <div className="product-content text-center">
                        <h1 className="title fw-bold fs-18">
                          <Link to={`/product/${p.slug}`}>{p.title}</Link>
                        </h1>
                        <div className="mb-2 text-warning">
                          {p && p.ratings && p.ratings.length > 0 ? productAverageRatings(p) : "No Ratings Found"}
                        </div>
                        <div className="price">Rp. {p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        <span className="text-danger fs-18 fw-semibold">
                          {p.quantity < 1 ? (
                            <h6 className="text-danger pt-2">Out of stock</h6>
                          ) : (
                            <h6 className="text-success pt-2">In Stock</h6>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="card-footer text-center">
                      <a href="#!" className="btn btn-light mx-2 mb-1">
                        <i className="fe fe-share-2 me-2 text-dark"></i>Share
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

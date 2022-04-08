import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Drawer, Button, Space } from "antd";
import noImages from "../../assets/images/noImages.png";
import productAverageRatings from "../../services/rating";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  return (
    <Drawer
      className="text-center"
      title={`Cart / Product: ${cart.length} items`}
      bordered="true"
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
      placement="right"
      closable={false}
      extra={
        <Space>
          <Link to="/cart">
            <Button
            type="primary"
              onClick={() =>
                dispatch({
                  type: "SET_VISIBLE",
                  payload: false,
                })
              }
            >
              <i className="fe fe-shopping-cart me-2"></i>Go to Cart<i className="fe fe-arrow-right ms-1"></i>
            </Button>
          </Link>
        </Space>
      }
    >
      <div className="card">
        {cart.map((p) => (
          <div key={p._id} className="card-body">
            <div className="d-flex overflow-visible">
              {p.images[0] ? (
                <img className="avatar bradius avatar-xl me-4 p-2 bg-white border" src={p.images[0].url} alt="avatar-img" />
              ) : (
                <img className="avatar bradius avatar-xl me-4 p-2 bg-white border" src={noImages} alt="avatar-img" />
              )}
              <div className="media-body valign-middle">
                <Link to={`/product/${p.slug}`} className="fw-semibold text-dark">
                  {p.title}
                </Link>
                <div className="mb-1 text-warning">
                  {p && p.ratings && p.ratings.length > 0 ? productAverageRatings(p) : "No Ratings Found"}
                </div>
                <h5 className="fw-bold">
                  <p>Rp. {p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default CartDrawer;

import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import noImages from "../../assets/images/noImages.png";

const ProductCartCard = ({ p, cart }) => {
  let dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = e.target.value;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div className="text-center">
            <Link to={`/product/${p.slug}`}>
              <img
                src={p.images && p.images.length ? p.images[0].url : noImages}
                style={{ objectFit: "cover" }}
                alt="image"
                className="cart-img text-center"
              />
            </Link>
          </div>
        </td>
        <td>{p.title}</td>
        <td className="fw-bold">{p.price}</td>

        {/* Quantity */}
        <td>
          <div className="handle-counter" id="handleCounter4">
            <button type="button" className="counter-minus btn btn-white lh-2 shadow-none">
              <i className="fe fe-minus text-muted"></i>
            </button>
            <input type="text" value={p.count} onChange={handleQuantityChange} className="qty" />
            <button type="button" className="counter-plus btn btn-white lh-2 shadow-none">
              <i className="fe fe-plus text-muted"></i>
            </button>
          </div>
        </td>

        <td>Rp. {p.price * p.count}</td>
        <td>
          <div className=" d-flex g-2">
            <a
              className="btn text-secondary bg-secondary-transparent btn-icon py-1 me-2"
              data-bs-toggle="tooltip"
              data-bs-original-title="Edit"
            >
              <span className="fe fe-heart fs-16"></span>
            </a>
            <a className="btn text-danger bg-danger-transparent btn-icon py-1" data-bs-toggle="tooltip" data-bs-original-title="Delete">
              <span className="fe fe-trash fs-16"></span>
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCartCard;

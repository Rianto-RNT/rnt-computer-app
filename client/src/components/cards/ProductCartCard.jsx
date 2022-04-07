import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import noImages from "../../assets/images/noImages.png";

const ProductCartCard = ({ p }) => {
  let dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    // console.log("Quantity Available", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Maximum Quantity: " ${p.quantity} "`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove")
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // [1,2,3(hereAray),4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1)
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
        <td className="fw-bold">{p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>

        {/* Quantity */}
        <td>
          <div className="handle-counter" id="handleCounter4">
            {/* <button type="button" className="counter-minus btn btn-white btn-sm lh-2 shadow-none">
              <i className="fe fe-minus text-muted"></i>
            </button> */}
            <input type="number" value={p.count} onChange={handleQuantityChange} className="form-control col-md-12" />
            {/* <button type="button" className="counter-plus btn btn-white btn-sm lh-2 shadow-none">
              <i className="fe fe-plus text-muted"></i>
            </button> */}
          </div>
        </td>

        <td>{(p.price * p.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td>
          <div className="text-center">
            {p.shipping === "Yes" ? (
              <span className="text-success bg-success-transparent rounded btn-icon py-1 me-2 fe fe-check-circle fs-16"></span>
            ) : (
              <span className="text-danger bg-danger-transparent rounded btn-icon py-1 me-2 fe fe-x-circle fs-16"></span>
            )}
          </div>
        </td>
        <td>
          <div className=" d-flex g-2">
            <a
              className="btn text-secondary bg-secondary-transparent btn-icon py-1 me-2"
              data-bs-toggle="tooltip"
              data-bs-original-title="Edit"
            >
              <span className="fe fe-heart fs-16"></span>
            </a>
            <a className="btn text-danger bg-danger-transparent btn-icon py-1" onClick={handleRemove}>
              <span className="fe fe-trash fs-16"></span>
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCartCard;

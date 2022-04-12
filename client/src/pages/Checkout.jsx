import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUserCart, emptyUserCart, saveUserAddress } from "../services/user";
import noImages from "../assets/images/noImages.png";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    // 1) Remove from local storage
    if (typeof window !== "undefined") localStorage.removeItem("cart");
    // 2) Remove from Redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // 3) Remove from Backend
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Empty My Cart!",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((cart) => {
      if (cart.isConfirmed) {
        emptyUserCart(user.token).then(() => {
          Swal.fire("Empty!", "Your cart has been deleted.", "success");
          setProducts([]);
          setTotal(0);
        });
      } else {
        Swal.fire("Cancelled", "Your Cart data is safe :)", "info");
      }
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        Swal.fire({
          title: "Your Delivery Address Saved",
          timer: 5000,
          text: "You have been able to place an order",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          // window.location.reload();
        });
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
  };

  const showBillingInformation = () => (
    <div className="form-group">
      <label className="form-label">
        Delivery Address <span className="text-danger">*</span>
      </label>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <p className="h6 pt-1 fs-12 text-danger"> *Delivery address must have: Name, Full Address, Building, and Phone Number.</p>
    </div>
  );

  const showYourOrder = () => (
    <>
      {products.map((p, i) => (
        <div className="card pt-2" key={p._id}>
          <div className="d-flex ">
            <img
              className="avatar-xxl br-7"
              src={p.images && p.images.length ? p.images[0].url : noImages}
              style={{ objectFit: "cover" }}
              alt="image"
            />
            <div className="ms-3">
              <h4 className="mb-1 fw-semibold fs-14">
                <p>{p.product.title}</p>
              </h4>
              <div className="fs-14">
                <p>( {p.color} )</p>
              </div>
              <p>{p.count} Items</p>
              <p>Rp. {(p.product.price * p.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  const showApplyCoupon = () => (
    <>
      <div className="input-group mb-1">
        <input
          onChange={(e) => setCoupon(e.target.value)}
          value={coupon}
          type="text"
          className="form-control"
          placeholder="Insert Your Coupon Here ..."
        />
        <span onClick={applyDiscountCoupon} className="input-group-text btn btn-primary">
          Apply Coupon
        </span>
      </div>
    </>
  );

  return (
    <div className="main-container container-fluid pt-8">
      {/* <!-- PAGE-HEADER --> */}
      <div className="page-header">
        <h1 className="page-title">Checkout</h1>
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#!">E-Commerce</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Checkout
            </li>
          </ol>
        </div>
      </div>
      {/* <!-- PAGE-HEADER END --> */}

      <div className="row">
        <div className="col-xl-8 col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Billing Information</h3>
            </div>
            <div className="card-body">
              <div className="row">{showBillingInformation()}</div>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
                Save
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="row">{showApplyCoupon()}</div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-14">
          <div className="card cart">
            <div className="card-header">
              <h3 className="card-title">Your Order</h3>
            </div>

            <div className="card-body">
              {showYourOrder()}
              <ul className="list-group border br-7 mt-5">
                <li className="list-group-item border-0">
                  Products Total
                  <span className="h6  mb-0 float-end">( {products.length} Items )</span>
                </li>
                <li className="list-group-item border-0">
                  <span className="h4 fw-bold"> Total Price </span>
                  <span className="h4 fw-bold mb-0 float-end">Rp. {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </li>
              </ul>
            </div>

            <div className="card-footer text-center">
              <div className="btn-list">
                <button disabled={!products.length} onClick={emptyCart} className="btn btn-danger-light float-sm-start">
                  Empty Cart
                </button>

                <button disabled={!addressSaved || !products.length} className="btn btn-primary float-sm-end col-md-5">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ROW-1 CLOSED --> */}
    </div>
  );
};

export default Checkout;

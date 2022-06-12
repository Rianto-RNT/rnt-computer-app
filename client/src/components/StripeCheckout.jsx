import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../services/stripe";
import { createOrder, emptyUserCart } from "../services/user";
import noImages from "../assets/images/noImages.png";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);
      // Additional response recieved in successfull payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from localStorage
          if (typeof window !== "undefined") localStorage.removeItem("Cart");
          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          // empty cart from database
          emptyUserCart(user.token);
        }
      });
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <div className="main-container container-fluid">
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

        {/* <!-- ROW-1 OPEN --> */}
        <div className="row">
          <div className="col-xl-8 col-md-12">
            <div className="card cart">
              <div className="card-header">
                <h3 className="card-title">Your Order</h3>
              </div>
              <div className="card-body">
                <div className="">
                  <div className="d-flex">
                    <img className="avatar-xxl br-7" src={noImages} alt="img" />
                    <div className="ms-3">
                      <h4 className="mb-1 fw-semibold fs-14">
                        <a href="shop-description.html">Flower Pot for Home Decor</a>
                      </h4>
                      <div className="text-warning fs-14">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                        <i className="fa fa-star-o"></i>
                      </div>
                      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>
                    </div>
                    <div className="ms-auto">
                      <span className="fs-16 fw-semibold">$438</span>
                    </div>
                  </div>
                </div>

                <ul className="list-group border br-7 mt-5">
                  <li className="list-group-item border-0">
                    Total
                    <span className="h6 fw-bold mb-0 float-end">${cartTotal}</span>
                  </li>
                  <li className="list-group-item border-0">
                    Discount
                    <span className="h6 fw-bold mb-0 float-end">%</span>
                  </li>
                  <li className="list-group-item border-0">
                    Shipping
                    <span className="h6 fw-bold mb-0 float-end">Free</span>
                  </li>
                  <li className="list-group-item border-0">
                    Total Payable
                    <span className="h4 fw-bold mb-0 float-end">${(payable / 100).toFixed(2)}</span>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                <div className="card-pay">
                  <h3 className="card-title">Payment Information</h3>
                  <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                    <CardElement id="card-element" options={cartStyle} onChange={handleChange} />

                    {error && (
                      <div className="card-error" role="alert">
                        {error}
                      </div>
                    )}

                    <div className="card-body">
                      <div className="btn-list">
                        <button className="stripe-button" disabled={processing || disabled || succeeded}>
                          <span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : "Pay Now"}</span>
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="text-wrap">
                        <span className={succeeded ? "result-message" : "result-message hidden"}>
                          <div class="alert alert-success alert-dismissible fade show " role="alert">
                            <span class="alert-inner--icon">
                              <i class="fe fe-thumbs-up"></i>
                            </span>
                            <span class="alert-inner--text">
                              <strong>Payment Successful.</strong> <Link to="/my-account/history">See it in your purchase history.</Link>
                            </span>
                          </div>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-12">
            <div className="card cart">
              <div className="card-header">
                <h3 className="card-title">Coupon Applied</h3>
              </div>
              <div className="card-body">
                <div className="">
                  <h4 className="fw-semibold">
                    {!succeeded && (
                      <div>
                        {coupon && totalAfterDiscount !== undefined ? (
                          <div className="alert alert-success" role="alert">
                            <i className="fe fe-thumbs-up me-2" aria-hidden="true"></i> Well done! Your coupon applied successfully. <hr />
                            <br />
                            {`Total after coupon applied: ${totalAfterDiscount}`}
                          </div>
                        ) : (
                          <div className="alert alert-danger" role="alert">
                            <i className="fe fe-tag me-2" aria-hidden="true"></i>Oh snap! No coupon applied. <br />
                            <i className="fe fe-thumbs-up me-2" aria-hidden="true"></i> Anyway... let's continue your payment
                          </div>
                        )}
                      </div>
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StripeCheckout;

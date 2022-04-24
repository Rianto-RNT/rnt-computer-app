import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../services/stripe";
import { Link } from "react-router-dom";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import noImages from "../assets/images/noImages.png";
import { Card } from "antd";

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
    <div className="main-container container-fluid pt-8">
      <div className="">
        <div className="col-xl-12 col-md-10">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12 col-lg-12">
                <div className="card">
                  {!succeeded && (
                    <div>
                      {coupon && totalAfterDiscount !== undefined ? (
                        <div className="card-alert alert alert-success mb-0"> {`Total after discount: ${totalAfterDiscount}`} </div>
                      ) : (
                        <div className="card-alert alert alert-danger mb-0">No Coupon applied</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* <!-- ROW-5 OPEN --> */}
            <div class="row">
              <div class="col-xl-4 col-md-12">
                <div class="card">
                  <img src={noImages} class="card-img-top" alt="img" />
                  {/* <div class="card-body border-bottom">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div> */}
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <span class="card-link">Total: ${cartTotal}</span>
                    </li>
                    {/* <li class="list-group-item">
                      <span href="javascript:void(0)" class="card-link">
                        Total payable: ${(payable / 100).toFixed(2)}
                      </span>
                    </li> */}
                  </ul>
                  <div class="card-body border-top">
                    {/* <span class="card-link">Total: ${cartTotal}</span> */}
                    <span href="javascript:void(0)" class="card-link">
                      Total payable: ${(payable / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- ROW-5 CLOSED --> */}

            <Card
              cover={
                <img
                  src={noImages}
                  style={{
                    height: "100",
                    objectFit: "cover",
                    marginBottom: "-50px",
                  }}
                />
              }
              actions={[
                <>
                  <DollarOutlined className="text-info" /> <br /> Total: ${cartTotal}
                </>,
                <>
                  <CheckOutlined className="text-info" /> <br /> Total payable: ${(payable / 100).toFixed(2)}
                </>,
              ]}
            />
          </div>

          <div className="card">
            <div className="card-body">
              <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                <CardElement id="card-element" options={cartStyle} onChange={handleChange} />
                <button className="stripe-button" disabled={processing || disabled || succeeded}>
                  <span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : "Pay"}</span>
                </button>
                <br />
                {error && (
                  <div className="card-error" role="alert">
                    {error}
                  </div>
                )}

                <div class="card text-white bg-success">
                  <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment Successful. <Link to="/user/history">See it in your purchase history.</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout;

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// load stripe outside component render to
// avoid rendiring stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container-fluid p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offser-md-2">
          <h1 className="pt-8">Complete Your Payment</h1>
          <p>stripe checkout component</p>
        </div>
      </Elements>
    </div>
  );
};

export default Payment;

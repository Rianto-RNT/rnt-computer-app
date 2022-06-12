import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";

// load stripe outside component render to
// avoid rendiring stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <Elements stripe={promise}>
      <StripeCheckout />
    </Elements>
  );
};

export default Payment;

import React from "react";
import rntLogo from "../../assets/images/rntLogo.png"

const ShowPaymentInfo = ({ order }) => (
  <>
    <div class="row">
      <div class="col-lg-6">
        <a class="header-brand" href="index.html">
          <img src={rntLogo} class="header-brand-img logo-3" alt="RNT logo" />
        </a>
        <div>
          <address class="pt-3">
            Lenangguar, Sumbawa, West Nusa Tenggara, Indonesia, 84372
            <br />
            rianto.projects@rnt.com
          </address>
        </div>
      </div>

      <div class="col-lg-6 text-end border-bottom border-lg-0">
        <h4>#INV-{order.paymentIntent.id}</h4>
        <h5>Orderd On: {new Date(order.paymentIntent.created * 1000).toLocaleString()}</h5>
        <h5 type="button" className="btn btn-secondary btn-sm mb-1" disabled >Status: {order.orderStatus}</h5>
      </div>
    </div>

    <div class="row pt-5">
      <div class="col-lg-6">
        <p class="h3">Invoice To:</p>
        <p class="fs-18 fw-semibold mb-0">Rianto-RNT</p>
        <address>
          Lenangguar-Sumbawa, West Nusa Tenggara
          <br />
          NTB, Indonesia
          <br />
          ID, 84372
          <br />
          rianto.rnt@gmail.com
        </address>
      </div>

      <div class="col-lg-6 text-end">
        <p class="h4 fw-semibold">Payment Details:</p>
        <p class="mb-1">
          Total Due:
          {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p class="mb-1">Currency: {order.paymentIntent.currency.toUpperCase()}</p>
        <p class="mb-1">Method: {order.paymentIntent.payment_method_types[0]}</p>
        <p class="mb-1">Payment: {order.paymentIntent.status.toUpperCase()}</p>
        <p class="mb-1">Bank Name: APAMO Bank</p>
        <p class="mb-1">Mayung: 543218769</p>
        <p>Country: Indonesia</p>
      </div>
    </div>
  </>
);

export default ShowPaymentInfo;

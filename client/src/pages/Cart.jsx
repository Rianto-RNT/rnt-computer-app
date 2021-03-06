import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCartCard from "../components/cards/ProductCartCard";
import { userCart } from "../services/user";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  //   const getSubTotal = () => {
  //       return cart.reduce((currentValue, nextValue) => {
  //         return currentValue + nextValue.count * nextValue.price
  //       }, 0)
  //   }

  // save online payment to database
  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RESPONSE", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("Cart Save ERROR ", err));
  };

  // Save Cash On Delivery order to database
  const saveCodOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });

    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RESPONSE", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("Cart Save ERROR ", err));
  };

  // window.scrollTo(0, 0);

  const showCartItem = () => (
    <div className="table-responsive">
      <table className="table table-bordered table-vcenter">
        <thead>
          <tr className="border-top">
            <th className="align-middle text-center">Product</th>
            <th className="align-middle text-center">Title</th>
            <th className="align-middle text-center">
              Price <p className="h6 card-title fs-12">( IDR )</p>
            </th>
            <th className="align-middle text-center">Quantity</th>
            <th className="align-middle text-center">
              Subtotal <p className="h6 card-title fs-12">( IDR )</p>
            </th>
            <th className="align-middle text-center">Shipping</th>
            <th className="align-middle text-center">Action</th>
          </tr>
        </thead>

        {cart.map((p) => (
          <ProductCartCard key={p._id} p={p} />
        ))}
      </table>
    </div>
  );

  return (
    <div className="main-container container-fluid">
      {/* <!-- PAGE-HEADER --> */}
      <div className="page-header">
        <h1 className="page-title">Cart</h1>
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#!">E-Commerce</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cart
            </li>
          </ol>
        </div>
      </div>
      {/* <!-- PAGE-HEADER END --> */}

      {/* <div className="pt-10">{JSON.stringify(cart)}</div> */}

      {/* <!-- ROW-1 OPEN --> */}
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xl-8">
          <div className="card cart">
            <div className="card-header">
              <h3 className="card-title">Shopping Cart</h3>
            </div>
            <div className="card-body">
              {cart.length ? (
                showCartItem()
              ) : (
                <h5 className="cart-title">
                  <span>Upss... Your cart is empty.</span>
                  <Link to={"/shop"} className="btn btn-primary btn-sm mr-3">
                    <span>Shop Now</span>
                  </Link>
                </h5>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-12 col-xl-4 col-sm-12 col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Cart Totals</div>
            </div>
            <div className="card-body py-2">
              <div className="table-responsive">
                <table className="table table-borderless text-nowrap mb-0">
                  <tbody>
                    <tr>
                      <td className="text-start">Sub Total</td>
                      <td className="text-end">
                        <span className="fw-bold  ms-auto">
                          Rp.{" "}
                          {getTotal()
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          <p className="h6 card-title text-success">( {`Product Total: ${cart.length} items`} )</p>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Additional Discount <p className="h6 card-title text-danger">(Not applying yet)</p>
                      </td>
                      <td className="text-end">
                        <span className="fw-bold text-success">- $55</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Delivery Charges <p className="h6 card-title text-danger">(Not applying yet)</p>
                      </td>
                      <td className="text-end">
                        <span className="fw-bold text-green">0 (Free)</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Tax <p className="h6 card-title text-danger">(Not applying yet)</p>
                      </td>
                      <td className="text-end">
                        <span className="fw-bold text-danger">+ $39</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Coupon Discount <p className="h6 card-title text-danger">(Not applying yet)</p>
                      </td>
                      <td className="text-end">
                        <span className="fw-bold text-success">- $15%</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Vat Tax <p className="h6 card-title text-danger">(Not applying yet)</p>
                      </td>
                      <td className="text-end">
                        <span className="fw-bold">+ $9</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start fs-18">Total Bill</td>

                      <td className="text-end">
                        <span className="ms-2 fw-bold fs-23">
                          Rp.{" "}
                          {getTotal()
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer">
              {user ? (
                <>
                  <div className="btn-list">
                    <Link to={"/shop"} className="btn btn-primary">
                      <i className="fe fe-arrow-left me-1"></i>Continue Shopping
                    </Link>
                    <button onClick={saveOrderToDb} disabled={!cart.length} className="btn btn-success float-sm-end col-md-5">
                      Check out<i className="fe fe-arrow-right ms-1"></i>
                    </button>
                  </div>
                  <button onClick={saveCodOrderToDb} disabled={!cart.length} className="btn btn-secondary col">
                    Cash On Delivery ( COD ) <i className="fe fe-arrow-right ms-1"></i>
                  </button>
                </>
              ) : (
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: "cart" },
                  }}
                  className="btn btn-danger float-sm-start col"
                >
                  Login to check out
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ROW-1 CLOSED --> */}
    </div>
    //   {/* <!-- CONTAINER CLOSED --> */}
  );
};

export default Cart;

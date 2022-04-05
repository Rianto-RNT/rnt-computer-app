import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  return (
    <div class="main-container container-fluid">
      {/* <!-- PAGE-HEADER --> */}
      <div class="page-header">
        <h1 class="page-title">Cart</h1>
        <div>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="javascript:void(0)">E-Commerce</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Cart
            </li>
          </ol>
        </div>
      </div>
      {/* <!-- PAGE-HEADER END --> */}
      <div className="pt-10">{JSON.stringify(cart)}</div>
      {/* <!-- ROW-1 OPEN --> */}
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xl-8">
          <div class="card cart">
            <div class="card-header">
              <h3 class="card-title">Shopping Cart</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-vcenter">
                  <thead>
                    <tr class="border-top">
                      <th>Product</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="text-center">
                          <img src="../assets/images/pngs/4.jpg" alt="" class="cart-img text-center" />
                        </div>
                      </td>
                      <td>laborum et dolorum fuga</td>
                      <td class="fw-bold">$568</td>
                      <td>
                        <div class="handle-counter" id="handleCounter4">
                          <button type="button" class="counter-minus btn btn-white lh-2 shadow-none">
                            <i class="fa fa-minus text-muted"></i>
                          </button>
                          <input type="text" value="2" class="qty" />
                          <button type="button" class="counter-plus btn btn-white lh-2 shadow-none">
                            <i class="fa fa-plus text-muted"></i>
                          </button>
                        </div>
                      </td>
                      <td>$568</td>
                      <td>
                        <div class=" d-flex g-2">
                          <a
                            class="btn text-secondary bg-secondary-transparent btn-icon py-1 me-2"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Edit"
                          >
                            <span class="bi bi-heart fs-16"></span>
                          </a>
                          <a
                            class="btn text-danger bg-danger-transparent btn-icon py-1"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Delete"
                          >
                            <span class="bi bi-trash fs-16"></span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="text-center">
                          <img src="../assets/images/pngs/8.jpg" alt="" class="cart-img" />
                        </div>
                      </td>
                      <td>laborum et dolorum fuga</td>
                      <td class="fw-bold">$1,027</td>
                      <td>
                        <div class="handle-counter" id="handleCounter4">
                          <button type="button" class="counter-minus btn btn-white lh-2 shadow-none">
                            <i class="fa fa-minus text-muted"></i>
                          </button>
                          <input type="text" value="2" class="qty" />
                          <button type="button" class="counter-plus btn btn-white lh-2 shadow-none">
                            <i class="fa fa-plus text-muted"></i>
                          </button>
                        </div>
                      </td>
                      <td>$3,082</td>
                      <td>
                        <div class=" d-flex g-2">
                          <a
                            class="btn text-secondary bg-secondary-transparent btn-icon py-1 me-2"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Edit"
                          >
                            <span class="bi bi-heart fs-16"></span>
                          </a>
                          <a
                            class="btn text-danger bg-danger-transparent btn-icon py-1"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Delete"
                          >
                            <span class="bi bi-trash fs-16"></span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="text-center">
                          <img src="../assets/images/pngs/10.jpg" alt="" class="cart-img" />
                        </div>
                      </td>
                      <td>laborum et dolorum fuga</td>
                      <td class="fw-bold">$1,589</td>
                      <td>
                        <div class="handle-counter" id="handleCounter4">
                          <button type="button" class="counter-minus btn btn-white lh-2 shadow-none">
                            <i class="fa fa-minus text-muted"></i>
                          </button>
                          <input type="text" value="2" class="qty" />
                          <button type="button" class="counter-plus btn btn-white lh-2 shadow-none">
                            <i class="fa fa-plus text-muted"></i>
                          </button>
                        </div>
                      </td>
                      <td>$7,945</td>
                      <td>
                        <div class=" d-flex g-2">
                          <a
                            class="btn text-secondary bg-secondary-transparent btn-icon py-1 me-2"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Edit"
                          >
                            <span class="bi bi-heart fs-16"></span>
                          </a>
                          <a
                            class="btn text-danger bg-danger-transparent btn-icon py-1"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Delete"
                          >
                            <span class="bi bi-trash fs-16"></span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="text-center">
                          <img src="../assets/images/pngs/9.jpg" alt="" class="cart-img" />
                        </div>
                      </td>
                      <td>laborum et dolorum fuga</td>
                      <td class="fw-bold">$1,027</td>
                      <td>
                        <div class="handle-counter" id="handleCounter4">
                          <button type="button" class="counter-minus btn btn-white lh-2 shadow-none">
                            <i class="fa fa-minus text-muted"></i>
                          </button>
                          <input type="text" value="2" class="qty" />
                          <button type="button" class="counter-plus btn btn-white lh-2 shadow-none">
                            <i class="fa fa-plus text-muted"></i>
                          </button>
                        </div>
                      </td>
                      <td>$3,082</td>
                      <td>
                        <div class=" d-flex g-2">
                          <a
                            class="btn text-secondary bg-secondary-transparent btn-icon py-1 me-2"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Edit"
                          >
                            <span class="bi bi-heart fs-16"></span>
                          </a>
                          <a
                            class="btn text-danger bg-danger-transparent btn-icon py-1"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Delete"
                          >
                            <span class="bi bi-trash fs-16"></span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="text-center">
                          <img src="../assets/images/pngs/6.jpg" alt="" class="cart-img" />
                        </div>
                      </td>
                      <td>laborum et dolorum fuga</td>
                      <td class="fw-bold">$1,589</td>
                      <td>
                        <div class="handle-counter" id="handleCounter4">
                          <button type="button" class="counter-minus btn btn-white lh-2 shadow-none">
                            <i class="fa fa-minus text-muted"></i>
                          </button>
                          <input type="text" value="2" class="qty" />
                          <button type="button" class="counter-plus btn btn-white lh-2 shadow-none">
                            <i class="fa fa-plus text-muted"></i>
                          </button>
                        </div>
                      </td>
                      <td>$7,945</td>
                      <td>
                        <div class=" d-flex g-2">
                          <a
                            class="btn text-secondary bg-secondary-transparent btn-icon py-1 me-2"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Edit"
                          >
                            <span class="bi bi-heart fs-16"></span>
                          </a>
                          <a
                            class="btn text-danger bg-danger-transparent btn-icon py-1"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Delete"
                          >
                            <span class="bi bi-trash fs-16"></span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-6 col-sm-6">
                  <div class="input-group mb-1">
                    <input type="text" class="form-control" placeholder="Search ..." />
                    <span class="input-group-text btn btn-primary">Apply Coupon</span>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6 text-end">
                  <a href="javascript:void(0)" class="btn btn-default disabled btn-md">
                    Update Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 col-xl-4 col-sm-12 col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Cart Totals</div>
            </div>
            <div class="card-body py-2">
              <div class="table-responsive">
                <table class="table table-borderless text-nowrap mb-0">
                  <tbody>
                    <tr>
                      <td class="text-start">Sub Total</td>
                      <td class="text-end">
                        <span class="fw-bold  ms-auto">$568</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start">Additional Discount</td>
                      <td class="text-end">
                        <span class="fw-bold text-success">- $55</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start">Delivery Charges</td>
                      <td class="text-end">
                        <span class="fw-bold text-green">0 (Free)</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start">Tax</td>
                      <td class="text-end">
                        <span class="fw-bold text-danger">+ $39</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start">Coupon Discount</td>
                      <td class="text-end">
                        <span class="fw-bold text-success">- $15%</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start">Vat Tax</td>
                      <td class="text-end">
                        <span class="fw-bold">+ $9</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start fs-18">Total Bill</td>
                      <td class="text-end">
                        <span class="ms-2 fw-bold fs-23">$568</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card-footer">
              <div class="btn-list">
                <a href="shop.html" class="btn btn-primary">
                  <i class="fa fa-arrow-left me-1"></i>Continue Shopping
                </a>
                <a href="checkout.html" class="btn btn-success float-sm-end">
                  Check out<i class="fa fa-arrow-right ms-1"></i>
                </a>
              </div>
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

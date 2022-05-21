import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <>
      <div className="e-table px-5 pb-5">
        <div className="table-responsive table-lg">
          <table className="table border-top table-bordered mb-0">
            <thead className="thead-light">
              <tr>
                <th className="text-center">Title</th>
                <th className="text-center">Price</th>
                <th className="text-center">Brand</th>
                <th className="text-center">Color</th>
                <th className="text-center">Count</th>
                <th className="text-center">Shipping</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((p, i) => (
                <tr key={i}>
                  <td>
                    <b>{p.product.title}</b>
                  </td>
                  <td className="text-end">Rp. {p.product.price}</td>
                  <td className="text-center">{p.product.brand}</td>
                  <td className="text-center">{p.color}</td>
                  <td className="text-center">{p.count}</td>
                  <td className="text-center">
                    {p.product.shipping === "Yes" ? (
                      <i className="fe fe-check-circle text-success"></i>
                    ) : (
                      <i className="fe fe-x-circle text-danger"></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <>
      {orders.map((order) => (
        <div className="card" key={order._id}>
          <div className="card-body" >
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="col-xl-6 col-lg-12 float-end">
              <div className="form-group select2-sm float-end">
                <label className="form-label text-info float-end">Delivery Status</label>
                <select
                  className="form-control form-select form-select-sm select2 col-md-14"
                  defaultValue={order.orderStatus}
                  name="Status"
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Not Processed">Not Proccessed</option>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Not Proccessed</option>
                  <option value="Not Processed">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            {showOrderInTable(order)}
            <div className="card-footer">
              <div className="row">
                <span className="text-center">*** - Thank You - ***</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;

import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <div className="card">
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
                  <td>{p.product.price}</td>
                  <td>{p.product.brand}</td>
                  <td>{p.color}</td>
                  <td>{p.count}</td>
                  <td>
                    {p.product.shipping === "Yes" ? (
                      <CheckCircleOutlined style={{ color: "green" }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: "red" }} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card">
      {orders.map((order) => (
        <div className="card-body">
          <div className="row pb-5">
            <ShowPaymentInfo key={orders._id} order={order} showStatus={false} />

            <div className="row">
              <div className="col-md-4">Delivery Status</div>
              <div className="col-md-6">
                <select
                  className="form-control"
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

            <div className="card pt-6">{showOrderInTable(order)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;

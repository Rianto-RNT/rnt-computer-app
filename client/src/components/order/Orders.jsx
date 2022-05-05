import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => (
  <div className="card">
    {orders.map((order) => (
      <div className="card-body">
        <div className="row pb-5">
          <ShowPaymentInfo key={orders._id}  order={order} showStatus={false} />

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
                <option value="Processing">Processing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Cancelled">Not Proccessed</option>
                <option value="Not Processed">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Orders;

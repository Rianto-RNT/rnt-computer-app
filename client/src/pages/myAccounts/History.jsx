import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../services/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

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

  const showDownloadLink = (order) => (
    <>
      <div className="card-footer text-end">
        <button type="button" className="btn btn-primary mb-1">
          {" "}
          {/*onClick="javascript:window.print();"*/}
          <i className="fe fe-credit-card"></i> Pay Invoice
        </button>
        <button type="button" className="btn btn-secondary mb-1">
          <i className="fe fe-send"></i> Send Invoice
        </button>
        <button type="button" className="btn btn-danger mb-1">
          <i className="fe fe-printer"></i> Print Invoice
        </button>
      </div>

      <PDFDownloadLink document={<Invoice ordr={order} />} fileName="invoice.pdf" className="btn btn-sm btn-primary">
        Dowbload PDF
      </PDFDownloadLink>
    </>
  );

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink()}</div>
        </div>
      </div>
    ));

  return (
    <div className="main-container container-fluid">
      <div className="row row-cards">
        <div className="col-md-2">
          <UserNav />
        </div>

        <div className="col-md-10">
          <div className="page-header pt-7">
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">History</h1>}
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/my-account/history"}>Invoice</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  History
                </li>
              </ol>
            </div>
          </div>

          <div className="col text-center h4"> {orders.length > 0 ? <h4> User Purchase orders</h4> : <h4> No Purchase Orders</h4>} </div>

          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;

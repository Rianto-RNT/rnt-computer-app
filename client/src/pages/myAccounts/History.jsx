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
  );

  const showDownloadLink = (order) => (
    <>
      <div className="card-footer text-end btn-list">
        <button type="button" className="btn btn-primary mb-1">
          {/*onClick="javascript:window.print();"*/}
          <i className="fe fe-credit-card"></i> Pay Invoice
        </button>
        <button type="button" className="btn btn-success mb-1">
          <i className="fe fe-send"></i> Send Invoice
        </button>
        <button type="button" className="btn btn-danger mb-1">
          <i className="fe fe-printer"></i> Print Invoice
        </button>
        <PDFDownloadLink document={<Invoice ordr={order} />} fileName="invoice.pdf" type="button" className="btn btn-warning mb-1">
          <i className="fe fe-download"></i> Dowbload PDF
        </PDFDownloadLink>
      </div>
    </>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="card-body">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}

        {showDownloadLink()}
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

          <div className="card">
            <div className="card-header"> {orders.length > 0 ? <h4>User Purchase orders</h4> : <h4>User Purchase orders</h4>} </div>

            <span>{showEachOrders()}</span>

            <div className="card-footer">
              <div className="row">
                <span className="text-center">*** - Happy Shopping - ***</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

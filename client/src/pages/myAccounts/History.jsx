import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../services/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={
        <Document>
          <Page size={"A4"}>
            <View>
              <Text>Section #1</Text>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      }
      fileName="invoice.pdf"
      className="btn btn-sm btn-primary"
    >
      Dowbload PDF
    </PDFDownloadLink>
  );

  const showOrderInTable = (order) => (
    <table className="table table-border">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
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
    <div className="container-fluid pt-8">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center h4"> {orders.length > 0 ? "User Purchase orders" : "No Purchase Orders"} </div>

        {showEachOrders()}
      </div>
    </div>
  );
};

export default History;

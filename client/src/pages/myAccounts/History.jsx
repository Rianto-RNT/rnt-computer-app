import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../services/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCicleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

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

  const showOrderInTable = (order) => <p>Each Order and it's Products</p>;

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <p>show payment info</p>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            <p>PDF download</p>
          </div>
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

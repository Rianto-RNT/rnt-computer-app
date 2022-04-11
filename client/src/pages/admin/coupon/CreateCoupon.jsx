import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Spin } from "antd";
import DatePicker from "react-datepicker";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { getCoupons, createCoupon, removeCoupon } from "../../../services/coupon";

const CreateCoupon = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="main-container container-fluid">
      <div className="row row-cards">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="page-header pt-7">
            {loading ? <Spin size="large" tip="Loading..." /> : <h1 className="page-title">Redeem Coupons</h1>}{" "}
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                Redeem Coupons
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;

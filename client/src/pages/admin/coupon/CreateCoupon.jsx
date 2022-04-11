import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Spin } from "antd";
import DatePicker from "react-datepicker";
import { DeleteOutlined, FieldTimeOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { getCoupons, createCoupon, removeCoupon } from "../../../services/coupon";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expired, setExpired] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);

  // Redux
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expired, discount);
    createCoupon({ name, expired, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setDiscount("");
        setExpired("");
        toast.success(`${res.data.name} is Created`);
      })
      .catch((err) => console.log("ERROR Create Coupon", err));
  };

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

          <div className="card">
            <div className="card-header">
              <div className="card-title">Create Coupon</div>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="row mb-4">
                    <label className="col-md-3 form-label">Coupon Name :</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Coupon Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        autoFocus
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <label className="col-md-3 form-label">Discount :</label>
                    <div className="col-md-9">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Discount %"
                        onChange={(e) => setDiscount(e.target.value)}
                        value={discount}
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <label className="col-md-3 form-label">Expired Date :</label>
                    <div className="col-md-9">
                      <div className="input-group">
                        {/* <div className="input-group-text">
                          <i className="fe fe-calendar "></i>
                        </div> */}
                        <DatePicker
                          className="form-control fc-datepicker col-md-3 text-auto"
                          placeholder="DD/MM/YYYY"
                          type="text"
                          selected={new Date()}
                          value={expired}
                          onChange={(date) => setExpired(date)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                {/* <!--Row--> */}
                <div className="row pt-4">
                  <div className="col-md-3"></div>
                  <div className="col-md-9">
                    <button className="btn btn-primary">Save Coupon</button>
                    <a href="#!" className="btn btn-default float-end">
                      Discard
                    </a>
                  </div>
                </div>
                {/* <!--End Row--> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;

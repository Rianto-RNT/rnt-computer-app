import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Spin } from "antd";
import DatePicker from "react-datepicker";

import AdminNav from "../../../components/nav/AdminNav";
import LocalSearch from "../../../components/search/LocalSearch";
import { getCoupons, createCoupon, removeCoupon } from "../../../services/coupon";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expired, setExpired] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  // Redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expired, discount);
    createCoupon({ name, expired, discount }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons();
        setName("");
        setDiscount("");
        setExpired("");
        toast.success(`${res.data.name} is Created`);
      })
      .catch((err) => console.log("ERROR Create Coupon", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons();
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
        })
        .catch((err) => console.log(err));
    }
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

          <div className="card">
            <div className="card-header border-bottom-0 p-4">
              <h2 className="card-title">1 - 30 of 546 Products</h2>
              <div className="page-options ms-auto">
                <select className="form-control select2 w-100">
                  <option value="asc">Latest</option>
                  <option value="desc">Oldest</option>
                </select>
              </div>
            </div>

            <div className="e-table px-5 pb-5">
              <div className="table-responsive table-lg">
                <table className="table border-top table-bordered mb-0">
                  <thead>
                    <tr>
                      <td className="text-center">Name</td>
                      <td className="text-center">Discount ( % )</td>
                      <td className="text-center">Expired</td>
                      <td className="text-center">Date</td>
                      <td className="text-center">Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((c) => (
                      <tr key={c._id}>
                        <td className="text-nowrap align-middle">{c.name}</td>
                        <td className="text-center align-middle">{c.discount} %</td>
                        <td className="text-center align-middle">{new Date(c.expired).toLocaleDateString()}</td>
                        <td className="text-center align-middle">
                          <span>{new Date(c.createdAt).toLocaleString()}</span>
                        </td>
                        <td className="text-center align-middle">
                          <div className="btn-group align-top">
                            {/* <Link to={`/admin/product/${slug}`} className="btn btn-sm btn-warning badge" type="button">
                              <i className="fe fe-edit"></i>
                            </Link> */}
                            <button onClick={() => handleRemove(c._id)} className="btn btn-sm btn-danger badge" type="button">
                              <i className="fe fe-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;

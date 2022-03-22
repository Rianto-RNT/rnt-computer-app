import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  let { user } = useSelector((state) => ({ ...state }));

  return (
    <>
      {user && user.role === "admin" ? (
        <div className="col-md-12">
          <div className="card">
            <div className="footer border-top-0 footer-1">
              <div className="container">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-12 col-sm-12 mt-3 mt-lg-0 text-center">
                    Copyright © 2022 <a href="#!">RNT Computer Admin </a>. Designed with
                    <span className="fe fe-heart text-danger"></span> by <a href="#!"> Rianto. </a> All rights reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="main-container container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="top-footer">
                    <div className="row">
                      <div className="col-lg-4 col-sm-12 col-md-12">
                        <h6>About</h6>
                        <p>
                          Fullstack Web Development Build one of The Biggest Real World MERN Stack E-commerce Project using React Redux Node
                          MongoDB and Ant Design
                        </p>
                        <p className="mb-5 mb-lg-2">
                          Feel free to email me at rianto.rnt@gmail.com if you run into any issues or have questions, ideas or concerns.
                          Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you!
                        </p>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-md-4">
                        <h6>Pages</h6>
                        <ul className="list-unstyled mb-5 mb-lg-0">
                          <li>
                            <a href="#!">Dashboard</a>
                          </li>
                          <li>
                            <a href="#!">Elements</a>
                          </li>
                          <li>
                            <a href="#!">Forms</a>
                          </li>
                          <li>
                            <a href="#!">Charts</a>
                          </li>
                          <li>
                            <a href="#!">Tables</a>
                          </li>
                          <li>
                            <a href="#!">Other Pages</a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-md-4">
                        <h6>Information</h6>
                        <ul className="list-unstyled mb-5 mb-lg-0">
                          <li>
                            <a href="#!">Our Team</a>
                          </li>
                          <li>
                            <a href="#!">Contact US</a>
                          </li>
                          <li>
                            <a href="#!">About</a>
                          </li>
                          <li>
                            <a href="#!">Services</a>
                          </li>
                          <li>
                            <a href="#!">Blog</a>
                          </li>
                          <li>
                            <a href="#!">Terms and Services</a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4 col-sm-12 col-md-4">
                        <h6>Send with</h6>
                        <img src={require("../../assets/images/indo-payments/pos.svg")} alt="send-with-pos" />
                        <img src={require("../../assets/images/indo-payments/jnt.svg")} alt="send-with-jnt" />
                        <img src={require("../../assets/images/indo-payments/jne.svg")} alt="send-with-jne" />
                        <img src={require("../../assets/images/indo-payments/sicepat.svg")} alt="send-with-sicepat" />
                        <hr />

                        <h6 className="mb-0 m-t-30">Payments</h6>
                        <br />
                        <img src={require("../../assets/images/indo-payments/ntb-syariah.svg")} alt="payment-ntb-syariah" />
                        <img src={require("../../assets/images/indo-payments/bni.svg")} alt="payment-bni" />
                        <img src={require("../../assets/images/indo-payments/bri.svg")} alt="payment-bri" />
                        <br />
                        <img src={require("../../assets/images/indo-payments/gopay.svg")} alt="payment-gopay" />
                        <img src={require("../../assets/images/indo-payments/dana.svg")} alt="payment-dana" />
                        <img src={require("../../assets/images/indo-payments/alfa.svg")} alt="payment-alfa" />
                        <img src={require("../../assets/images/indo-payments/indomaret.svg")} alt="payment-indomaret" />
                      </div>
                    </div>
                  </div>
                  <footer className="main-footer ps-0 pe-0">
                    <div className="row ">
                      <div className="col-xl-8 col-lg-12 col-md-12 mt-3 footer1">
                        Copyright © 2022 <a href="#!">RNT Computer App</a>. Designed with <span className="fe fe-heart text-danger"></span>{" "}
                        by <a href="#!"> Rianto </a>
                      </div>
                      <div className="col-xl-4 col-lg-12 col-md-12 ms-auto text-end">
                        <ul className="footer-social-list ">
                          <li>
                            <a href="https://web.facebook.com/ryanmorrisonsay/">
                              <i className="side-menu__icon fe fe-facebook"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://www.google.com/">
                              <i className="fe fe-mail"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://twitter.com/ryanmorrisonsay">
                              <i className="side-menu__icon fe fe-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://www.linkedin.com/in/rianto-rnt/">
                              <i className="fe fe-linkedin"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;

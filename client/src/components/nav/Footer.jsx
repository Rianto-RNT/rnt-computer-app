import React from "react";
import noImages from "../../assets/images/noImages.png";

const Footer = () => {
  return (
    <>
      <div className="main-container container-fluid">
        <div className="row">
          {/* <div className="col-md-12"> */}
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
                      Feel free to email me at rianto.rnt@gmail.com if you run into any issues or have questions, ideas or concerns. Please
                      enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you!
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
                    <h6>Posts</h6>
                    <img src={noImages} />
                    <img src={noImages} />
                    <img src={noImages} />
                    <img src={noImages} />
                    <hr />
                    <h6 className="mb-0 m-t-30">Payments</h6>
                    <ul className="footer-payments">
                      <li>
                        <a href="#!">
                          <i className="fa fa-cc-paypal text-muted" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-cc-visa text-muted" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-credit-card-alt text-muted" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-cc-mastercard text-muted" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-cc-paypal text-muted" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <footer className="main-footer ps-0 pe-0">
                <div className="row ">
                  <div className="col-xl-8 col-lg-12 col-md-12 footer1">
                    Copyright © 2022 <a href="#!">RNT Computer App</a>. Designed with <span className="fa fa-heart text-danger"></span>
                    by <a href="#!"> Rianto </a>
                  </div>
                  <div className="col-xl-4 col-lg-12 col-md-12 ms-auto text-end">
                    <ul className="footer-social-list ">
                      <li>
                        <a href="#!">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-google"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-linkedin"></i>
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
    </>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const ProductSpecificationCard = ({ product }) => {
  const { title, price, description, category, subcategory, name, images, quantity, shipping, color, brand, sold, slug } = product;

  return (
    <div className="card productdesc">
      <div className="card-body">
        <div className="panel panel-primary">
          <div className=" tab-menu-heading">
            <div className="tabs-menu1">
              <Tabs>
                <TabPane key="1" tab="Descriptions">
                  <p className="mb-3 fs-15"> {description && description}</p>
                </TabPane>
                
                <TabPane key="2" tab="Specifications">
                  {product && (
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td className="fw-bold">Price</td>
                            <td>Rp. {price}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Brand</td>
                            <td>{brand}</td>
                          </tr>
                          {category && (
                            <tr>
                              <td className="fw-bold">Category Name</td>
                              <td>
                                <Link to={`/category/${slug}`}>{category.name}</Link>
                              </td>
                            </tr>
                          )}

                          {subcategory && (
                            <tr>
                              <td className="fw-bold">Subcategory</td>
                              <td>
                                {subcategory.map((s) => (
                                  <Link key={s._id} to={`/subcategory/${s.slug}`}>
                                    {s.name}
                                  </Link>
                                ))}
                              </td>
                            </tr>
                          )}

                          <tr>
                            <td className="fw-bold">Shipping</td>
                            <td>{shipping}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Color</td>
                            <td>{color}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Quantity</td>
                            <td>{quantity}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Sold</td>
                            <td>{sold}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Package Dimensions</td>
                            <td> 33 x 22 x 3 cm; 450 Grams</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Manufacturer</td>
                            <td>Chokka Production</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Item part number </td>
                            <td>BNVRDMRHENFULL-Z14</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Best Sellers Rank</td>
                            <td> #141 in Clothing & Accessories (See Top 100 in Clothing & Accessories)</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Customer Reviews</td>
                            <td>
                              <p className="text-muted float-start me-3">
                                <span className="fe fe-star text-warning"></span>
                                <span className="fe fe-star text-warning"></span>
                                <span className="fe fe-star text-warning"></span>
                                <span className="fe fe-star-half-o text-warning"></span>
                                <span className="fe fe-star-o text-warning"></span>
                                <span className="text-success fw-semibold">(2,076 ratings)</span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div className="panel-body tabs-menu-body">
            <div className="tab-content">
              <div className="tab-pane active" id="tab5"></div>
              <div className="tab-pane pt-5" id="tab6">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tr>
                      <td className="fw-bold">Width</td>
                      <td> 6.1 inch</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Height</td>
                      <td>24 inch</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Depth</td>
                      <td>6.1 inch</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Other Dimensions</td>
                      <td>15.5*15.5*24CM</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="tab-pane" id="tab7">
                <ul className="p-5">
                  <li>
                    <i className="fa fa-check me-3 text-success mb-5"></i>Asthetic Product - more lively movies and music
                  </li>
                  <li>
                    <i className="fa fa-check me-3 text-success mb-5"></i>Long lasting 7,040 mAH battery with fast adaptive charging
                  </li>
                  <li>
                    <i className="fa fa-check me-3 text-success mb-5"></i>8 MP Primary Camera, 5 MP Front Facing Camera
                  </li>
                  <li>
                    <i className="fa fa-check me-3 text-success mb-5"></i>Seamless apps and gaming experience with Qualcomm Snapdragon 662
                    processor (4X2.0 GHz+4X1.8 GHz)
                  </li>
                  <li>
                    <i className="fa fa-check me-3 text-success mb-5"></i>1 year manufacturer warranty for device and 6 months manufacturer
                    warranty for in-box accessories
                  </li>
                  <li>
                    <i className="fa fa-check me-3 text-success"></i>Customer care :1234 567 678
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecificationCard;

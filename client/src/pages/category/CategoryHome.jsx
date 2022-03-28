import React, { useState, useEffect } from "react";
import { getSingleCategory } from "../../services/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
  const [singleCategory, setSingleCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getSingleCategory(slug).then((res) => {
      setSingleCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="main-container container-fluid">
      <div className="page-header pt-6">
        <div className="col-xl-12">
          <div className="card text-info bg-info-transparent card-transparent">
            <div className="card-body p-4">
              {loading ? (
                <h4>Loading...</h4>
              ) : (
                <h4>
                  Hi, we got {products.length} product with category name of "{singleCategory.name}"
                </h4>
              )}
            </div>
          </div>

          {products.map((p) => (
            <div className="row" key={p._id}>
              <div className="col-sm-2 col-xl-3">
                <div className="card">
                  <div className="card-body h-100">
                    <div className="product-grid6">
                      <ProductCard product={p} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryHome;

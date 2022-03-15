import React, { useState, useEffect } from "react";
import { reuseableProduct } from "../../services/product";
import ProductCard from "./ProductCard";
import LoaderCard from "./LoaderCard";

const BestSellerCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProduct();
  }, []);

  const loadAllProduct = () => {
    setLoading(true);

    // Sort, order, limit
    reuseableProduct("sold", "desc", 4).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="row">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Best Seller</h3>
        </div>

        <div className="card-body h-100">
          <div id="carousel-controls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                {/* NEW ARRIVAL */}
                <div className="tab-pane active" id="tab-11">
                  {loading ? (
                    <LoaderCard count={3} />
                  ) : (
                    <div className="row">
                      {products.map((product) => (
                        <div key={product._id} className="col-sm-2 col-xl-3">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* END NEW ARRIVAL */}
              </div>
            </div>

            <a className="carousel-control-prev" role="button" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;

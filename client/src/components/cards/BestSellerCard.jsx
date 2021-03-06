import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
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
    reuseableProduct("sold", "desc", 7).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="row">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Best Seller</h3>
          </div>

          <div className="tab-pane active" id="tab-11">
            {products.length > 0 ? (
              <Swiper
                slidesPerView={4}
                spaceBetween={5}
                centeredSlides={true}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {products
                  .filter((product) => product._id)
                  .map((product) => (
                    <SwiperSlide className="col-sm-2 col-xl-3" key={product._id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            ) : (
              <LoaderCard count={3} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellerCard;

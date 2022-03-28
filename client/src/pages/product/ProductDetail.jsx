import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSingleProduct, productStarRating, getRelatedProduct } from "../../services/product";
import ProductDetailCard from "../../components/cards/ProductDetailCard";
import ProductSpecificationCard from "../../components/cards/ProductSpesificationCard";
import ProductCard from "../../components/cards/ProductCard";

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  // Redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString());

      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getSingleProduct(slug).then((res) => {
      setProduct(res.data);

      getRelatedProduct(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStarRating(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct();
    });
  };

  return (
    <div className="main-container container-fluid">
      <div className="page-header  mt-7">
        <div className="row">
          <div className="col-xl-12">
            <ProductDetailCard product={product} onStarClick={onStarClick} star={star} />
          </div>

          <div className="col-xl-12 col-md-12">
            <ProductSpecificationCard product={product} />
          </div>

          <h3 className="p-3 mb-5">Related Products</h3>
          {related.length
            ? related.map((r) => (
                <div className="col-md-6 col-xl-3" key={r._id}>
                  <ProductCard product={r}></ProductCard>
                </div>
              ))
            : "No Products Found"}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

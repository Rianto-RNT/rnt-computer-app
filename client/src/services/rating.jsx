import React from "react";
import StarRatings from "react-star-ratings";

export const productAverageRatings = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    // console.log('length', length)
    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log('totalReduced', totalReduced)
    let higest = length * 5;
    // console.log('higest', higest)
    let result = (totalReduced * 5) / higest;
    // console.log("result", result);
    return (
      <>
        <StarRatings rating={result} starRatedColor="red" starDimension="20px" starSpacing="20" editing={false} />
        {/* <span className="col-3 text-align-center text-danger"> ( {p.ratings.length} Customer Review )</span> */}
      </>
    );
  }
};

export default productAverageRatings;

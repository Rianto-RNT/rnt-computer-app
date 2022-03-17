import React from "react";
import Slider from "react-slick";

const HomeBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <Slider {...settings}>
            <img src={require("../../assets/images/rnt-creative-banner-one.jpg")} alt="home-banner-one" />
            <img src={require("../../assets/images/rnt-creative-banner-two.jpg")} alt="home-banner-two" />
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

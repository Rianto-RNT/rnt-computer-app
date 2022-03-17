import React from "react";
import Slider from "react-slick";

const HomeBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <Slider {...settings}>
            <img src={require("../../assets/images/rnt-creative-banner-one.jpg")} />
            <img src={require("../../assets/images/rnt-creative-banner-two.jpg")} />
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

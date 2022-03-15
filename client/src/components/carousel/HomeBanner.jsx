import React, { useState } from "react";
import HomeBannerImagesSlider from "./HomeBannerImage";
import { Carousel } from "antd";

const HomeBanner = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <div id="carousel-controls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                {HomeBannerImagesSlider.map((slide, index) => {
                  return (
                    <div className={index === current ? "slide active" : "slide"} key={index}>
                      {index === current && <img src={slide.image} alt="banner" className="image" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <a className="carousel-control-prev" onClick={prevSlide} role="button" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" onClick={nextSlide} role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

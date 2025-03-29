import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import image1 from "/assets/img/slider-2-bg.jpg";
import image2 from "/assets/img/slider-cap-1.png";
import image3 from "/assets/img/slider-cap-2.png";
import image4 from "/assets/img/slider-cap-3.png";
import image5 from "/assets/img/slider-shape-1.jpg";
import image6 from "/assets/img/slider-shape-2.jpg";
import image7 from "/assets/img/segen-1 1.png";
import Slider from "react-slick";
const Hero = ({ pageData }) => {
  return (
    <section
      className="slider__height-1 include-bg d-flex align-items-center "
      data-background={image1}
      // style={{ marginTop: "-9rem" }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xxl-6 col-lg-6 fadeIn">
            <div className="slider__content-2 mt-30">
              <span>The Leader in Online Learning</span>
              <h3 className="slider__title-2">{pageData?.title}</h3>
              <p>{pageData?.subtitle}</p>
              <NavLink to="/courses" className="tp-btn-green">
                Explore Coureses
              </NavLink>
            </div>
          </div>

          <div className="col-xxl-6 col-lg-6 d-none d-lg-block">
            <div className="p-relative">
              <div className="slider__shape">
                <img className="slider__shape-1" src={image2} alt="" />
                <img className="slider__shape-2" src={image3} alt="" />
                <img className="slider__shape-3" src={image4} alt="" />
                <img className="slider__shape-4" src={image5} alt="" />
                <img className="slider__shape-5" src={image6} alt="" />
              </div>
              <span className="slider__thumb-mask">
                <img src={pageData?.imageUrl} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

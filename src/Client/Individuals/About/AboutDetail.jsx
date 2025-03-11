import { Component, Fragment } from "react";

import image1 from "/assets/img/breadcrumb_bg4.png";
import image2 from "/assets/img/cta_bg1.png";
import image3 from "/assets/img/title_shape.svg";
import image4 from "/assets/img/btn-arrow.svg";
import image6 from "/assets/img/about_img06.png";
import image5 from "/assets/img/about_img07.png";
import image7 from "/assets/img/about_img08.png";
import image8 from "/assets/img/cta_shape001.svg";
import image9 from "/assets/img/cta_shape002.png";
import image10 from "/assets/img/cta_shape003.svg";
import PopularCourses from "../Landing/PopularCourses";
import { RiArrowRightSLine } from "react-icons/ri";

class AboutDetail extends Component {
  render() {
    const divStyle = {
      backgroundImage: `url(${image1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
    const divStyle1 = {
      backgroundImage: `url(${image2})`,
    };
    return (
      <Fragment>
        <section className="breadcrumb-area breadcrumb-bg" style={divStyle}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-content">
                  <h3 className="title">About Us</h3>
                  <nav className="breadcrumb">
                    <span property="itemListElement" typeof="ListItem">
                      <a href="/">Home</a>
                    </span>
                    <span className="breadcrumb-separator">
                      <RiArrowRightSLine />
                    </span>
                    <span property="itemListElement" typeof="ListItem">
                      About Us
                    </span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-area-two">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-6">
                <div className="about__title-wrap">
                  <div className="section__title">
                    <span className="sub-title">Who we are</span>
                    <h2 className="title tg-svg">
                      The Leading{" "}
                      <span className="position-relative">
                        <span
                          className="svg-icon"
                          id="about-svg"
                          data-svg-icon={image3}
                        />
                        Global
                      </span>{" "}
                      Place for Learning and Instruction
                    </h2>
                  </div>
                  <p className="fw-medium">
                    Through our innovative platform, we provide a diverse range
                    of courses taught by expert instructors
                  </p>
                  <p>
                    Whether you're looking to expand your knowledge, advance
                    your career, or explore new passions, Fancy Catering Academy
                    offers the tools and resources you need to succeed.
                  </p>
                  <div className="tg-button-wrap">
                    <a href="/courses" className="btn tg-svg">
                      <span className="text">Explore Courses</span>{" "}
                      <span
                        className="svg-icon"
                        id="about-btn"
                        data-svg-icon={image4}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-6 col-md-11">
                <div className="about__images-wrap">
                  <div className="column">
                    <img src={image5} alt="img" />
                  </div>
                  <div className="column">
                    <img src={image6} alt="img" />
                    <img src={image7} alt="img" />
                  </div>
                  <div className="about__shapes"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <PopularCourses />

        {/* cta-area */}
        <section className="cta-area-two position-relative">
          <div className="cta__bg" style={divStyle1} />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10">
                <div className="cta__content">
                  <p>Expand Your Horizons with Fancy Catering Academy</p>
                  <h2 className="title">Unleash limitless learning now!</h2>
                  <h5 className="sub-title">Join the e-learning revolution today</h5>
                  <div className="tg-button-wrap justify-content-center">
                    <a href="/courses" className="btn tg-svg">
                      <span className="text">Become a Student</span>{" "}
                      <span
                        className="svg-icon"
                        id="cta-btn-2"
                        data-svg-icon={image4}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cta__shapes">
            <img
              src={image8}
              alt="img"
              className="position-absolute"
              data-aos="fade-down-right"
              data-aos-delay={300}
            />
            <img src={image9} alt="img" className="position-absolute" />
            <img
              src={image10}
              alt="img"
              className="position-absolute"
              data-aos="fade-up-left"
              data-aos-delay={300}
            />
          </div>
        </section>
      </Fragment>
    );
  }
}

export default AboutDetail;

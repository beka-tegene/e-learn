import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <div className="herobannerarea herobannerarea__2">
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: "80vh" }}>
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div
              className="herobannerarea__content__wraper"
              style={{ textAlign: "justify" }}
            >
              <div className="herobannerarea__title">
                <div className="herobannerarea__title__heading__2 herobannerarea__title__heading__3">
                  <h2>Empower Your Team's Growth with Fancy Catering Academy</h2>
                </div>
              </div>
              <div className="herobannerarea__text herobannerarea__text__2">
                <ul>
                  <li>
                    <strong>Streamlined Training:</strong> Enhance employee
                    skills efficiently through our intuitive learning platform.
                  </li>
                  <li>
                    <strong>Customizable Courses: </strong> Tailor learning
                    paths to fit your company's unique needs and goals.
                  </li>
                  <li>
                    <strong>Engaging Content:</strong> Keep your team motivated
                    with interactive and multimedia-rich learning materials.
                  </li>
                  <li>
                    <strong>Performance Tracking:</strong> Monitor progress and
                    assess learning outcomes effortlessly.
                  </li>
                  <li>
                    <strong>Scalable Solutions:</strong> Whether you have a team
                    of 10 or 10,000, our platform scales with your business.
                  </li>
                  <li>
                    <strong>24/7 Support:</strong> Our dedicated support team is
                    here to assist you at every step of the way.
                  </li>
                </ul>
              </div>
              <div className="hreobannerarea__button__2 mt-2">
                <p
                  style={{
                    // background: "#22B04A",
                    width: "fit-content",
                    color: "#22B04A",
                    padding: "0 10px",
                    borderRadius: "5px",
                  }}
                >
                  Ready to Transform Your Team's Learning Experience? Contact Us
                  Today!
                </p>
                <button
                  className="default__button"
                  style={{
                    background: isHovered ? "#272727" : "#D7A022",
                    color: "#FFF",
                    padding: "10px 25px",
                    borderRadius: "5px",
                    fontWeight: 500,
                    fontSize: "16px",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => navigate("/business/contact")}
                >
                  Contact us
                </button>
              </div>
            </div>
          </div>
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div className="aboutarea__img__2" data-tilt="">
              <img
                loading="lazy"
                className="aboutimg__1"
                src="/assets/img/about_10.png"
                alt="aboutimg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

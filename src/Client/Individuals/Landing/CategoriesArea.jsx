import React from "react";
import image1 from "/assets/img/title_shape.svg";
import {
  FaBusinessTime,
  FaSchool,
  FaUniversity,
  FaUserGraduate,
} from "react-icons/fa";
import { RiGovernmentFill } from "react-icons/ri";
import Cookies from "js-cookie";
class CategoriesArea extends React.Component {
  render() {
    const token = Cookies.get("token");
    return (
      <section className="categories-area section-py-130">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-5 col-lg-8 col-md-10">
              <div className="categories__title-wrap text-center text-xl-start">
                <div className="section__title">
                  <span className="sub-title">
                    Fancy Catering Academy online courses
                  </span>
                  <h2 className="title tg-svg">
                    Browse By{" "}
                    <span className="position-relative">
                      <span
                        className="svg-icon"
                        id="svg-5"
                        data-svg-icon={image1}
                      ></span>
                      <span className="skill-text" style={{ color: "#d7a022" }}>
                        Services
                      </span>
                    </span>
                  </h2>
                </div>
                <p>
                  Fancy Catering Academy offers a diverse range of online courses
                  tailored to meet the needs of learners worldwide. Our courses
                  are designed and delivered by experts in their respective
                  fields, ensuring high-quality education accessible to all.
                  Whether you're looking to enhance your skills, pursue a new
                  career path, or simply indulge your curiosity, Kegeberew
                  University's online courses provide flexible learning options
                  to suit your schedule and goals. Explore our offerings today
                  and embark on a journey of knowledge and discovery.
                </p>
              </div>
            </div>
            <div className="col-xl-7 col-lg-9">
              <div className="categories__wrap">
                <div className="row justify-content-center row-cols-2 row-cols-md-3">
                  <div className="col">
                    <div className="categories__item">
                      <a
                        href="/"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                          }}
                        >
                          <FaUserGraduate style={{ fontSize: "30px" }} />
                        </div>
                        <span className="name">For Individuals</span>
                      </a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="categories__item">
                      <a
                        href="/business"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                          }}
                        >
                          <FaBusinessTime style={{ fontSize: "30px" }} />
                        </div>
                        <span className="name">For Businesses</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center row-cols-2 row-cols-sm-3">
                  <div className="col">
                    <div className="categories__item">
                      <a
                        href="/government"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                          }}
                        >
                          <RiGovernmentFill style={{ fontSize: "30px" }} />
                        </div>
                        <span className="name">For Government</span>
                      </a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="categories__item">
                      <a
                        href="/university"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                          }}
                        >
                          <FaUniversity style={{ fontSize: "30px" }} />
                        </div>
                        <span className="name">For Universities</span>
                      </a>
                    </div>
                  </div>
                  <div className="col">
                    <div className="categories__item">
                      <a
                        href="/school"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                          }}
                        >
                          <FaSchool style={{ fontSize: "30px" }} />
                        </div>
                        <span className="name">For School</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CategoriesArea;

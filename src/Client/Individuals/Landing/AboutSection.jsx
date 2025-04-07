import { Fragment } from "react";
// import image1 from "/assets/img/about_img01-2.png";
import image3 from "/assets/img/title_shape.svg";
import image4 from "/assets/img/btn-arrow.svg";

const AboutSection = ({ pageData }) => {
  return (
    <Fragment>
      <section className="about-area tg-motion-effects section-py-120">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="about__images">
                {/* <img
                  className="small-img tg-motion-effects3"
                  src={image1}
                  alt="img"
                /> */}

                {/* ✅ Dynamically loaded image from API */}
                <img
                  className="big-img"
                  src={pageData?.about?.[0]?.imageUrl}
                  alt="about"
                />

                <div className="about__exp">
                  <svg
                    width={126}
                    height={108}
                    viewBox="0 0 126 108"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10C0 4.47715 4.47715 0 10 0H110.996C116.321 0 120.713 4.17312 120.983 9.4914L125.429 96.7793C125.733 102.754 120.758 107.657 114.789 107.267L9.34719 100.369C4.08901 100.025 0 95.6593 0 90.3899V10Z"
                      fill="currentcolor"
                    />
                  </svg>
                  <h4 className="year">
                    {pageData?.about?.[0]?.yearsExperience} +
                  </h4>
                  <p>Years of Experiences</p>
                </div>

                <svg
                  className="circle tg-motion-effects1"
                  width={344}
                  height={344}
                  viewBox="0 0 344 344"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x={20}
                    y={20}
                    width={304}
                    height={304}
                    rx={152}
                    stroke="currentcolor"
                    strokeWidth={40}
                  />
                </svg>
              </div>
            </div>

            <div className="col-xl-6 col-lg-7">
              <div className="about__content">
                <div className="section__title">
                  <span className="sub-title">Get To Know About Us</span>
                  <h2 className="title tg-svg">
                    {pageData?.about?.[0]?.name}
                  </h2>
                </div>
                <p className="desc">{pageData?.about?.[0]?.description}</p>

                <div className="tg-button-wrap">
                  <a href="/aboutus" className="btn tg-svg">
                    <span className="text">Discover More</span>{" "}
                    <span
                      className="svg-icon"
                      id="about-btn"
                      data-svg-icon={image4}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutSection;

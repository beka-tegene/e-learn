import React from "react";

const Companies = () => {
  return (
    <div className="container ">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-5 col-md-10 col-sm-10 col-10">
            <div className="aboutarea__img__2" data-tilt="">
              <img
                loading="lazy"
                className="aboutimg__1"
                src="/assets/img/company.png"
                alt="aboutimg"
              />
            </div>
          </div>
          <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2"></div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: "1.4em",
                  textAlign: "justify",
                }}
              >
                Over 1000+ companies trust Fancy Catering Academy to nurture their
                leadership talent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;

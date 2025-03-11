import React from "react";

const Content = () => {
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
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
            style={{ textAlign: "justify" }}
          >
            <div>
              <span>Content Creator</span>
              <h3>Learn from Industry Leaders</h3>
              <p>
                Reduce training expenses with sought-after content and reputable
                certifications from over <strong>43</strong> leading companies
                and universities
              </p>
              <ul>
                <li>
                  These are professionals who create content independently,
                  often sharing their expertise through blogs, videos, podcasts,
                  or social media platforms.
                </li>
                <li>
                  Universities, colleges, and schools create educational content
                  ranging from lectures and tutorials to entire courses.
                </li>
                <li>
                  Many businesses produce content related to their industry or
                  products, including whitepapers, case studies, webinars, and
                  training materials.
                </li>
                <li>
                  Creative agencies, production studios, and media companies
                  create various types of content, such as videos, animations,
                  graphics, and interactive experiences.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;

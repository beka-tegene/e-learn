import image1 from "/assets/img/btn-arrow.svg";
import image2 from "/assets/img/cta_shape01.svg";
import image3 from "/assets/img/cta_shape02.svg";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
const LetUsHelpOne = () => {
  const token = Cookies.get("token");
  let name;
  let role;
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      name = decodedToken?.fullname;
      role = decodedToken?.role;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  return (
    <section className="cta-area" style={{ margin: "-4rem 0 5rem 0" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="cta__wrapper">
              <div className="section__title white-title">
                <h2 className="title tg-svg">Become Instructor</h2>
              </div>
              <div className="cta__desc">
                <h3 style={{ color: "#fff" }}>
                  Teach best cources to the world
                </h3>
              </div>
              <div className="tg-button-wrap justify-content-center justify-content-md-end">
                <a
                  href={token ? "/comingsoon" : "/accounts/login"}
                  className="btn white-btn tg-svg"
                >
                  <span className="text">
                    {token ? "Find Instructor" : "Register/Log In"}
                  </span>{" "}
                  <span
                    className="svg-icon"
                    id="cta-btn"
                    data-svg-icon={image1}
                  />
                </a>
              </div>
              <img
                className="object"
                src={image2}
                style={{ left: 25, top: "-35px" }}
                alt="Object"
                data-aos="fade-down"
                data-aos-delay={400}
              />
              <img
                className="object"
                src={image3}
                style={{ right: "-20px", bottom: "-80px" }}
                alt="Object"
                data-aos="fade-up"
                data-aos-delay={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetUsHelpOne;

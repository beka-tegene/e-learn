import React from "react";
import image1 from "/assets/img/logo1.jpg";
import { MdFacebook, MdWhatsapp } from "react-icons/md";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaWhatsappSquare, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
class Footer extends React.Component {
  render() {
    const token = Cookies.get("token");
    return (
      <footer className="footer-bg" style={{ backgroundColor: "#061E43" }}>
        <div className="footer__top-wrap">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-sm-6">
                <div className="footer-widget">
                  <div className="footer__about">
                    <div className="footer__logo logo">
                      <a href="/">
                        <img src={image1} alt="img" />
                      </a>
                    </div>
                    <p>
                      Welcome to Fancy Catering Academy, your premier destination
                      for eLearning excellence!
                    </p>
                    <ul className="list-wrap m-0 p-0">
                      <li className="address">
                        Addis Ababa, Ethiopia, 
                      </li>
                      <li className="number">(+251) 965-363-434</li>
                      <li className="socials">
                        <NavLink to="#">
                          <MdFacebook style={{ fontSize: "25px" }} />
                        </NavLink>
                        <NavLink to="#">
                          <BsTwitterX style={{ fontSize: "20px" }} />
                        </NavLink>
                        <NavLink to="#">
                          <FaWhatsappSquare style={{ fontSize: "23px" }} />
                        </NavLink>
                        <NavLink to="#">
                          <BsLinkedin style={{ fontSize: "20px" }} />
                        </NavLink>
                        <NavLink to="#">
                          <FaYoutube style={{ fontSize: "25px" }} />
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-sm-6">
                <div className="footer-widget widget_nav_menu">
                  <h4 className="fw-title">Resources</h4>
                  <ul className="list-wrap">
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/AboutUs">About</NavLink>
                    </li>
                    <li>
                      <NavLink to="/ContactPage">Contact</NavLink>
                    </li>
                    <li>
                      <NavLink to="/courses">Courses</NavLink>
                    </li>
                    <li>
                      <NavLink to="/find/instructor">Instructors</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-sm-6">
                <div className="footer-widget widget_nav_menu">
                  <h4 className="fw-title">Services</h4>
                  <ul className="list-wrap">
                    <li>
                      <NavLink to="/">For Individuals</NavLink>
                    </li>
                    {!token && (
                      <>
                        <li>
                          <NavLink to="/business">For Businesses</NavLink>
                        </li>
                        <li>
                          <NavLink to="/university">For Universities</NavLink>
                        </li>
                        <li>
                          <NavLink to="/government">For Government</NavLink>
                        </li>
                        <li>
                          <NavLink to="/school">For School</NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p style={{color:"#AFAFAF"}}>
                Copyright&copy; 2024 Fancy Catering Academy S.C. | All
                Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

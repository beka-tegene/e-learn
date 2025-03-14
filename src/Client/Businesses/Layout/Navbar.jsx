import { Box, Modal } from "@mui/material";
import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import logo from "/assets/img/logo1.png";
import { MdArrowDropDown } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const Navbar = () => {
  const business = useMatch("/business");
  return (
    <header>
      <div className="header__area">
        <div className="header__top header__border d-none d-md-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-6 col-xl-8 col-lg-8 col-md-8">
                <div className="header__info">
                  <ul className="py-2">
                    <li>
                      <NavLink to={"/"}>For Individuals</NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/business"}
                        style={{
                          borderBottom: business ? "2px solid black" : "",
                        }}
                        className="py-1"
                      >
                        For Businesses
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/university"}>For Universities</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/government"}>For Government</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/school"}>For School</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-md-none">
              <div className="container-fluid">
                <NavLink className="navbar-brand" to="/" style={{ width: 150 }}>
                  <img src={logo} alt="logo" />
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target=""
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span
                    className="navbar-toggler-icon"
                    onClick={() => setOpen(false)}
                  />
                </button>
                <div className=" navbar-collapse" id="">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/courses">
                        Courses
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/comingsoon">
                        Instructors
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/aboutus">
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/contactpage">
                        Contact
                      </NavLink>
                    </li>
                    <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-4">
                      {!token ? (
                        <div className="header__top-right d-flex justify-content-start align-items-center my-2 gap-2">
                          <div className="header__login ">
                            <NavLink to={"/accounts/login"}>
                              <svg
                                viewBox="0 0 12 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.99995 6.83333C7.61078 6.83333 8.91662 5.5275 8.91662 3.91667C8.91662 2.30584 7.61078 1 5.99995 1C4.38912 1 3.08328 2.30584 3.08328 3.91667C3.08328 5.5275 4.38912 6.83333 5.99995 6.83333Z"
                                  stroke="#031220"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M11.0108 12.6667C11.0108 10.4092 8.76497 8.58333 5.99997 8.58333C3.23497 8.58333 0.989136 10.4092 0.989136 12.6667"
                                  stroke="#031220"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>{" "}
                              Login
                            </NavLink>
                          </div>
                          <div className="header__signup header__btn ">
                            <NavLink
                              to={""}
                              className="header-btn"
                              onClick={handleOpen3}
                            >
                              Sign up
                            </NavLink>
                          </div>
                        </div>
                      ) : (
                        <div className="header__top-right d-flex justify-content-end align-items-center">
                          <div
                            style={{
                              cursor: "pointer",
                              textTransform: "capitalize",
                            }}
                            id="basic-button2"
                            aria-controls={open ? "basic-menu2" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick2}
                          >
                            <MdAccountCircle className="fs-4 m-2" />
                            {name}
                            <MdArrowDropDown className="fs-4 m-2" />
                          </div>
                        </div>
                      )}
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl2}
                        open={openMenu2}
                        onClose={handleClose2}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            handleNavigate();
                            handleClose2();
                          }}
                        >
                          My account
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose2();
                            LogoutHandler();
                          }}
                        >
                          Logout
                        </MenuItem>
                      </Menu>
                    </div>
                    <div className="tg-button-wrap">
                      <a className="btn tg-svg" href="/comingsoon">
                        <span className="text">Find a Tutors</span>
                      </a>
                    </div>
                  </ul>
                </div>
              </div>
            </nav>
          </Drawer> */}
        </div>
        <div className="header__bottom" id="header-sticky">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-6">
                <div className="logo d-flex align-items-center gap-2" >
                  <NavLink to="/business">
                    <img src={logo} alt="logo" style={{ width: "50px" }} />
                  </NavLink>
                  <h4 style={{fontWeight:100}}>For Businesses</h4>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-7 d-none d-lg-block"/>
              {/* <div className="col-xxl-6 col-xl-6 col-lg-7 d-none d-lg-block">
                <div className="main-menu">
                  <nav id="mobile-menu">
                    <ul>
                      <li>
                        <NavLink
                          to="/"
                          style={{
                            color: "#589516",
                            fontWeight: "bold",
                          }}
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/courses"
                          style={{
                            color: "",
                            fontWeight: "",
                          }}
                        >
                          All Courses
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="#">
                          Instructors <MdArrowDropDown />
                        </NavLink>
                        <ul className="submenu">
                          <li>
                            <NavLink to="/find/instructor">
                              All Instructor
                            </NavLink>
                          </li>

                          <li className="drop">
                            <NavLink to={"/accounts/instructor"}>
                              Become Instructor
                            </NavLink>
                          </li>

                          <li className="drop">
                            <NavLink to={"/accounts/tutor"}>
                              Become a tutor
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <NavLink
                          to="/aboutus"
                          style={{
                            color: "",
                            fontWeight: "",
                          }}
                        >
                          About
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/contactpage"
                          style={{
                            color: "",
                            fontWeight: "",
                          }}
                        >
                          Contact
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div> */}
              <div className="col-xxl-2 col-xl-2 col-lg-1 col-md-6 col-6">
                <div className="header__bottom-right d-flex justify-content-end align-items-center pl-30">
                  <div className="header__search w-fit d-none d-xl-block">
                    <NavLink
                      className="tg-button-wrap btn tg-svg"
                      to={"/business/contact"}
                    >
                      <span className="text">Talk to us</span>
                    </NavLink>
                  </div>
                  <div className="header__hamburger ml-50 d-xl-none">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#offcanvasmodal"
                      className="hamurger-btn"
                      //   onClick={toggleDrawer(true)}
                    >
                      <span />
                      <span />
                      <span />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

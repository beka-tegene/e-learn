import { Drawer, Menu, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import logo from "/assets/img/logo1.jpg";
import { MdAccountCircle, MdArrowDropDown } from "react-icons/md";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import {
  FaBook,
  FaChalkboardTeacher,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

const Navbar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const individualsAll =
    useMatch("/find/instructor") ||
    useMatch("/find/tutor") ||
    useMatch("/find/instructor/:id") ||
    useMatch("/find/tutor/:id");
  const individuals = useMatch("/");
  const courses = useMatch("/courses") || useMatch("/CourseDetail/:slug");
  const instructor = useMatch("/instructor");
  const aboutus = useMatch("/aboutus");
  const contactpage = useMatch("/contactpage");
  const profile = useMatch("/account/profile");

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
  const navigate = useNavigate();

  const LogoutHandler = async () => {
    Cookies.remove("token");
    window.location.href = "/accounts/login";
  };
  const handleNavigate = () => {
    if (role === "user") {
      navigate("/account/profile");
    } else {
      navigate("/comingsoon");
    }
  };
  return (
    <header>
      <div className="header__area">
        <div className="header__top header__border d-none d-md-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-6 col-xl-8 col-lg-8 col-md-8">
                <div className="header__info ">
                  <ul>
                    <li
                      style={{
                        borderBottom:
                          individualsAll ||
                          individuals ||
                          courses ||
                          instructor ||
                          aboutus ||
                          contactpage ||
                          profile
                            ? "2px solid black"
                            : "",
                      }}
                    >
                      <NavLink to={"/"} style={{fontSize:"11px"}}>For Individuals</NavLink>
                    </li>
                    {!token && (
                      <>
                        <li>
                          <NavLink to={"/business"} style={{fontSize:"11px"}}>For Businesses</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/university"} style={{fontSize:"11px"}}>For Universities</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/government"} style={{fontSize:"11px"}}>For Government</NavLink>
                        </li>
                        <li>
                          <NavLink to={"/school"} style={{fontSize:"11px"}}>For School</NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-4 col-lg-4 col-md-4">
                {!token ? (
                  <div className="header__top-right d-flex justify-content-end align-items-center gap-2">
                    <div className="header__login">
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
                        </svg>
                        Login
                      </NavLink>
                    </div>
                    <div className="header__signup header__btn ml-20">
                      <NavLink to={"/accounts/student"} className="header-btn">
                        Sign up
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div className="header__top-right d-flex justify-content-end align-items-center">
                    <div
                      style={{ cursor: "pointer", textTransform: "capitalize" }}
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <MdAccountCircle className="fs-4 m-2" />
                      {name}
                      <MdArrowDropDown className="fs-4 m-2" />
                    </div>
                  </div>
                )}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleNavigate();
                      handleClose();
                    }}
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      LogoutHandler();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <div className="" id="header-sticky">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-6">
                <div className="logo">
                  <NavLink to="/">
                    <img
                      src={logo}
                      alt="logo"
                      className=" d-block d-lg-none"
                      style={{ width: "80px" }}
                    />
                    <img src={logo} alt="logo" className="d-none d-lg-block " style={{ width: "80px" }} />
                  </NavLink>
                </div>
              </div>
              <div className="col-xxl-7 col-xl-7 col-lg-8 d-none d-lg-block">
                <div className="main-menu">
                  <nav id="mobile-menu">
                    <ul>
                      <li>
                        <NavLink
                          to="/"
                          style={{
                            color: individuals ? "#589516" : "",
                            fontWeight: individuals ? "bold" : "",
                          }}
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/courses"
                          style={{
                            color: courses ? "#589516" : "",
                            fontWeight: courses ? "bold" : "",
                          }}
                        >
                          All Courses
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/find/instructor">
                          Instructors 
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/aboutus"
                          style={{
                            color: aboutus ? "#589516" : "",
                            fontWeight: aboutus ? "bold" : "",
                          }}
                        >
                          About
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          to="/contactpage"
                          style={{
                            color: contactpage ? "#589516" : "",
                            fontWeight: contactpage ? "bold" : "",
                          }}
                        >
                          Contact
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-2 col-md-6 col-6">
                <div className="header__bottom-right d-flex justify-content-end align-items-center pl-30">
                  {!token && (
                    <div className="header__search w-fit d-none d-xl-block">
                      <NavLink
                        className="tg-button-wrap btn tg-svg"
                        to={"/courses"}
                      >
                        <span className="text">Courses</span>
                      </NavLink>
                    </div>
                  )}
                  <div className="header__hamburger ml-50 d-none">
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav style={navStyle} className="d-lg-none">
        <NavLink
          to="/"
          style={{ ...linkStyle, color: individuals ? "#589516" : "" }}
        >
          <FaHome size={18} />
          <span>HOME</span>
        </NavLink>
        <NavLink
          to="/find/tutor"
          style={{ ...linkStyle, color: individualsAll ? "#589516" : "" }}
        >
          <FaChalkboardTeacher size={18} />
          <span>TUTOR</span>
        </NavLink>
        <NavLink
          to="/courses"
          style={{ ...linkStyle, color: courses ? "#589516" : "" }}
        >
          <FaBook size={18} />
          <span>COURSE</span>
        </NavLink>

        {!token ? (
          <>
            <NavLink
              to="/aboutus"
              style={{ ...linkStyle, color: aboutus ? "#589516" : "" }}
            >
              <FaInfoCircle size={18} />
              ABOUT
            </NavLink>
            <NavLink
              to="/contactpage"
              style={{ ...linkStyle, color: contactpage ? "#589516" : "" }}
            >
              <FaPhone size={18} />
              CONTACT
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/account/profile"
              style={{ ...linkStyle, color: profile ? "#589516" : "" }}
            >
              <FaUser size={18} />
              <span>ACCOUNT</span>
            </NavLink>
            <NavLink
              to="/logout"
              style={{ ...linkStyle, color: individuals ? "#589516" : "" }}
            >
              <FaSignOutAlt size={18} />
              <span>LOGOUT</span>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
const navStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: "#FFFFFF", // bg-gray-800
  color: "#1F2937",
  display: "flex",
  justifyContent: "space-around",
  padding: "0.2rem",
  zIndex: 1000,
  boxShadow: "0 -2px 4px rgba(0,0,0,0.2)", // Adding shadow for a more elevated look
};

const linkStyle = {
  flex: 1,
  textAlign: "center",
  padding: "0.2rem",
  borderRadius: "0.25rem",
  color: "#1F2937",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: "10px",
};

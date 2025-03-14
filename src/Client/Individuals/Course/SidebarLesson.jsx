import React, { useEffect, useState } from "react";
import { FaBook, FaChalkboardTeacher, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { PiBookOpenTextFill } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "/assets/img/logo1.png";
import axios from "axios";
import { back_base_url } from "../../../util/config";
import { toast } from "react-toastify";
const SidebarLesson = () => {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const LogoutHandler = async () => {
    Cookies.remove("token");
    window.location.href =("/accounts/login");
  };
  return (
    <div>
      {!isMobile && (
        <div
          style={{
            background: "#E7E7E7",
            height: "100vh",
            position: "sticky",
            top: 0,
            padding: "1rem 0 ",
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
          }}
        >
          <NavLink to={"/"}>
            <img src={logo} alt="logo" style={{ width: "50px" }} />
          </NavLink>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink to={"/"}>
                <abbr title="Home" style={{ pointerEvents: "none" }}>
                  <FaHome style={{ fontSize: "26px", color: "#524C42" }} />
                </abbr>
              </NavLink>
            </div>
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink to={"/courses"}>
                <abbr title="Courses" style={{ pointerEvents: "none" }}>
                  <PiBookOpenTextFill
                    style={{ fontSize: "26px", color: "#524C42" }}
                  />
                </abbr>
              </NavLink>
            </div>
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink to={"/account/profile"}>
                <abbr title="Profile" style={{ pointerEvents: "none" }}>
                  <FaCircleUser
                    style={{ fontSize: "26px", color: "#524C42" }}
                  />
                </abbr>
              </NavLink>
            </div>
            <div className="nav-link-wrapper" style={{ position: "relative" }}>
              <NavLink onClick={LogoutHandler}>
                <abbr title="Logout" style={{ pointerEvents: "none" }}>
                  <MdLogout style={{ fontSize: "26px", color: "#524C42" }} />
                </abbr>
              </NavLink>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <nav style={navStyle} className="d-lg-none">
        <NavLink
          to="/"
          style={linkStyle}
          activeStyle={{ backgroundColor: linkHoverStyle.backgroundColor }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              linkHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = navStyle.backgroundColor)
          }
        >
          <FaHome size={20} />
          <span>HOME</span>
        </NavLink>
        <NavLink
          to="/courses"
          style={linkStyle}
          activeStyle={{ backgroundColor: linkHoverStyle.backgroundColor }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              linkHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = navStyle.backgroundColor)
          }
        >
          <FaBook size={20} />
          <span>COURSE</span>
        </NavLink>
        {/* <NavLink
          to="/find/tutor"
          style={linkStyle}
          activeStyle={{ backgroundColor: linkHoverStyle.backgroundColor }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              linkHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = navStyle.backgroundColor)
          }
        >
          <FaChalkboardTeacher size={20} />
          <span>TUTOR</span>
        </NavLink> */}
          <>
            <NavLink
              to="/account/profile"
              style={linkStyle}
              activeStyle={{ backgroundColor: linkHoverStyle.backgroundColor }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  linkHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  navStyle.backgroundColor)
              }
            >
              <FaUser size={20} />
              <span>ACCOUNT</span>
            </NavLink>
            <NavLink
              to="/logout"
              style={linkStyle}
              activeStyle={{ backgroundColor: linkHoverStyle.backgroundColor }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  linkHoverStyle.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  navStyle.backgroundColor)
              }
            >
              <FaSignOutAlt size={20} />
              <span>LOGOUT</span>
            </NavLink>
          </>
        
      </nav>
      )}
    </div>
  );
};

export default SidebarLesson;
const navStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: "#FFFFFF",
  color: "#1F2937",
  display: "flex",
  justifyContent: "space-around",
  padding: "0.2rem",
  zIndex: 1000,
  boxShadow: "0 -2px 4px rgba(0,0,0,0.2)", 
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
  fontSize:"11px"
};

const linkHoverStyle = {
  backgroundColor: "#4B5563", 
};

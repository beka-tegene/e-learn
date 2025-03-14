import React, { useEffect, useState } from "react";
import { FaCashRegister, FaRegUserCircle } from "react-icons/fa";
import { MdBook, MdCreate, MdOutlineExplore } from "react-icons/md";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import logo from "/assets/img/logo1.png";
import { Drawer } from "@mui/material";
import axios from "axios";
import { back_base_url } from "../../../util/config";
import { toast } from "react-toastify";
const Sidebar = ({ drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const decodedName = decodedToken?.fullname;
        setName(decodedName);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);
  const explore =
    useMatch("/lms-business/course-browser") ||
    useMatch("/lms-business/course-detail/:id") ||
    useMatch("/lms-business/course-detail/:id/enroll-employee");
  const enrolled = useMatch("/lms-business/course-enrolled");
  const create =
    useMatch("/lms-business/course-create") ||
    useMatch("/lms-business/add_course") ||
    useMatch("/lms-business/detail_courses/:id") ||
    useMatch("/lms-business/add_detail/:id");
  const register = useMatch("/lms-business/employee-register");
  const profile = useMatch("/lms-business/company-profile");
  const LogoutHandler = async () => {
    Cookies.remove("token");
    window.location.href =("/accounts/login");
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div>
      {isMobile ? (
        <>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <div style={{ width: "100px" }}>
                <img src={logo} alt="logo" style={{ width: "100%" }} />
              </div>
              <span>{name}</span>
            </div>
            <div
              style={{
                width: 250,
                background: "#FFFFFF",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 0 0",
              }}
            >
              <ul
                style={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  listStyle: "none",
                }}
              >
                <NavLink
                  style={{
                    background: explore ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                  to={"/lms-business/course-browser"}
                >
                  <li
                    style={{
                      padding: "12px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <MdOutlineExplore /> Explore Course
                  </li>
                </NavLink>
                {/* <NavLink
          style={{
            background: enrolled ? "#F1F5F9" : "",
            borderRadius: "10px",
          }}
          to={"/lms-business/course-enrolled"}
        >
          <li
            style={{
              padding: "12px 15px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <MdBook /> Course Enrolled
          </li>
        </NavLink> */}
                <NavLink
                  style={{
                    background: create ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                  to={"/lms-business/course-create"}
                >
                  <li
                    style={{
                      padding: "12px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <MdCreate /> Create Course
                  </li>
                </NavLink>
                <NavLink
                  to={"/lms-business/employee-register"}
                  style={{
                    background: register ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                >
                  <li
                    style={{
                      padding: "12px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <FaCashRegister /> Register Employee
                  </li>
                </NavLink>
                <NavLink
                  to={"/lms-business/company-profile"}
                  style={{
                    background: profile ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                >
                  <li
                    style={{
                      padding: "12px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <FaRegUserCircle /> My Profile
                  </li>
                </NavLink>
                <NavLink onClick={LogoutHandler}>
                  <li
                    style={{
                      padding: "12px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <FiLogOut /> Logout
                  </li>
                </NavLink>
              </ul>
            </div>
          </Drawer>
        </>
      ) : (
        <div
          style={{
            background: "#FFFFFF",
            height: "87vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 0 0",
          }}
        >
          <ul
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              listStyle: "none",
            }}
          >
            <NavLink
              style={{
                background: explore ? "#F1F5F9" : "",
                borderRadius: "10px",
              }}
              to={"/lms-business/course-browser"}
            >
              <li
                style={{
                  padding: "12px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <MdOutlineExplore /> Explore Course
              </li>
            </NavLink>
            {/* <NavLink
          style={{
            background: enrolled ? "#F1F5F9" : "",
            borderRadius: "10px",
          }}
          to={"/lms-business/course-enrolled"}
        >
          <li
            style={{
              padding: "12px 15px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <MdBook /> Course Enrolled
          </li>
        </NavLink> */}
            <NavLink
              style={{
                background: create ? "#F1F5F9" : "",
                borderRadius: "10px",
              }}
              to={"/lms-business/course-create"}
            >
              <li
                style={{
                  padding: "12px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <MdCreate /> Create Course
              </li>
            </NavLink>
            <NavLink
              to={"/lms-business/employee-register"}
              style={{
                background: register ? "#F1F5F9" : "",
                borderRadius: "10px",
              }}
            >
              <li
                style={{
                  padding: "12px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <FaCashRegister /> Register Employee
              </li>
            </NavLink>
            <NavLink
              to={"/lms-business/company-profile"}
              style={{
                background: profile ? "#F1F5F9" : "",
                borderRadius: "10px",
              }}
            >
              <li
                style={{
                  padding: "12px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <FaRegUserCircle /> My Profile
              </li>
            </NavLink>
            <NavLink onClick={LogoutHandler}>
              <li
                style={{
                  padding: "12px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <FiLogOut /> Logout
              </li>
            </NavLink>
          </ul>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

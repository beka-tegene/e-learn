import React, { useEffect, useState } from "react";
import {
  MdDashboard,
  MdExpandMore,
  MdExpandLess,
  MdContactMail,
} from "react-icons/md";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { FaBook, FaUsers } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { Drawer } from "@mui/material";
import logo from "/assets/img/logo1.png";
const SideBar = ({ drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate();
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [userDropdown, setUserDropdown] = useState(false);

  const dashboard = useMatch("/admin/dashboard");
  const student = useMatch("/admin/student_list");
  const teacher = useMatch("/admin/teacher_list");
  const tutor = useMatch("/admin/tutor_list");
  const review = useMatch("/admin/transaction_list");
  const contact = useMatch("/admin/contact_list");
  const course = useMatch("/admin/course_list");

  const LogoutHandler = async () => {
    Cookies.remove("token");
    window.location.href = "/accounts/login";
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
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
                backgroundColor: "#272727",
                color: "#FFF",
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
                backgroundColor: "#272727",
                color: "#FFF",
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
                    background: dashboard ? "#F1F5F9" : "",
                    color: dashboard ? "#DFA035" : "",
                    borderRadius: "10px",
                  }}
                  to={"/admin/dashboard"}
                >
                  <li
                    style={{
                      padding: "8px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <MdDashboard /> Dashboard
                  </li>
                </NavLink>

                <li
                  style={{
                    padding: "8px 15px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    borderRadius: "10px",
                    background:
                      userDropdown || student || teacher || tutor
                        ? "#F1F5F9"
                        : "",
                    color:
                      userDropdown || student || teacher || tutor
                        ? "#DFA035"
                        : "",
                  }}
                  onClick={toggleUserDropdown}
                >
                  <span
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <FiUsers /> User
                  </span>{" "}
                  {userDropdown ? <MdExpandLess /> : <MdExpandMore />}
                </li>
                {userDropdown && (
                  <ul
                    style={{
                      listStyle: "none",
                      paddingLeft: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <NavLink
                      style={{
                        // background: student ? "#F1F5F9" : "",
                        color: student ? "#DFA035" : "",
                        borderRadius: "10px",
                      }}
                      to={"/admin/student_list"}
                    >
                      <li
                        style={{
                          padding: "8px 15px",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <FaUsers /> Student
                      </li>
                    </NavLink>
                    <NavLink
                      style={{
                        // background: teacher ? "#F1F5F9" : "",
                        color: teacher ? "#DFA035" : "",
                        borderRadius: "10px",
                      }}
                      to={"/admin/teacher_list"}
                    >
                      <li
                        style={{
                          padding: "8px 15px",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <FaUsers /> Teacher
                      </li>
                    </NavLink>
                    
                  </ul>
                )}

                <NavLink
                  to={"/admin/course_list"}
                  style={{
                    color: course ? "#DFA035" : "",
                    background: course ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                >
                  <li
                    style={{
                      padding: "8px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <FaBook /> Course
                  </li>
                </NavLink>
                <NavLink
                  to={"/admin/transaction_list"}
                  style={{
                    color: review ? "#DFA035" : "",
                    background: review ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                >
                  <li
                    style={{
                      padding: "8px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <GrTransaction /> Transaction
                  </li>
                </NavLink>
                <NavLink
                  to={"/admin/contact_list"}
                  style={{
                    color: contact ? "#DFA035" : "",
                    background: contact ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                >
                  <li
                    style={{
                      padding: "8px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <MdContactMail /> Contact
                  </li>
                </NavLink>
                <NavLink>
                  <li
                    style={{
                      padding: "8px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={LogoutHandler}
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
            backgroundColor: "#272727",
            color: "#FFF",
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
                background: dashboard ? "#F1F5F9" : "",
                color: dashboard ? "#DFA035" : "",
                borderRadius: "10px",
              }}
              to={"/admin/dashboard"}
            >
              <li
                style={{
                  padding: "8px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <MdDashboard /> Dashboard
              </li>
            </NavLink>

            <li
              style={{
                padding: "8px 15px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                borderRadius: "10px",
                background:
                  userDropdown || student || teacher || tutor ? "#F1F5F9" : "",
                color:
                  userDropdown || student || teacher || tutor ? "#DFA035" : "",
              }}
              onClick={toggleUserDropdown}
            >
              <span
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <FiUsers /> User
              </span>{" "}
              {userDropdown ? <MdExpandLess /> : <MdExpandMore />}
            </li>
            {userDropdown && (
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <NavLink
                  style={{
                    // background: student ? "#F1F5F9" : "",
                    color: student ? "#DFA035" : "",
                    borderRadius: "10px",
                  }}
                  to={"/admin/student_list"}
                >
                  <li
                    style={{
                      padding: "8px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <FaUsers /> Student
                  </li>
                </NavLink>
                <NavLink
                  style={{
                    // background: teacher ? "#F1F5F9" : "",
                    color: teacher ? "#DFA035" : "",
                    borderRadius: "10px",
                  }}
                  to={"/admin/teacher_list"}
                >
                  <li
                    style={{
                      padding: "8px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <FaUsers /> Teacher
                  </li>
                </NavLink>
               
              </ul>
            )}

            <NavLink
              to={"/admin/course_list"}
              style={{
                color: course ? "#DFA035" : "",
                background: course ? "#F1F5F9" : "",
                borderRadius: "10px",
              }}
            >
              <li
                style={{
                  padding: "8px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <FaBook /> Course
              </li>
            </NavLink>
            <NavLink
              to={"/admin/enroll"}
              style={{
                color: course ? "#DFA035" : "",
                background: course ? "#F1F5F9" : "",
                borderRadius: "10px",
              }}
            >
              <li
                style={{
                  padding: "8px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <FaBook /> Enroll
              </li>
            </NavLink>
            <NavLink
              to={"/admin/transaction_list"}
              style={{
                color: review ? "#DFA035" : "",
                background: review ? "#F1F5F9" : "",
                borderRadius: "10px",
              }}
            >
              <li
                style={{
                  padding: "8px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <GrTransaction /> Transaction
              </li>
            </NavLink>
            <NavLink
              to={"/admin/contact_list"}
              style={{
                color: contact ? "#DFA035" : "",
                background: contact ? "#F1F5F9" : "",
                borderRadius: "10px",
              }}
            >
              <li
                style={{
                  padding: "8px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <MdContactMail /> Contact
              </li>
            </NavLink>
            <NavLink>
              <li
                style={{
                  padding: "8px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={LogoutHandler}
              >
                <FiLogOut /> Logout
              </li>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;

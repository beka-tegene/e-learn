import React, { useEffect, useState } from "react";
import {
  MdAccountCircle,
  MdDashboard,
  MdList,
  MdQuestionAnswer,
} from "react-icons/md";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { Drawer, IconButton } from "@mui/material";
import logo from "/assets/img/logo1.jpg";
import axios from "axios";
import { back_base_url } from "../util/config";
import { toast } from "react-toastify";
const SideBar = ({ drawerOpen, setDrawerOpen }) => {
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

  const dashboard = useMatch("/instructor/dashboard");
  const account = useMatch("/instructor/account");
  const room = useMatch("/instructor/room");
  const list =
    useMatch("/instructor/list_course") ||
    useMatch("/instructor/add_course") ||
    useMatch("/instructor/detail_courses/:id") ||
    useMatch("/instructor/add_detail/:id") ||
    useMatch("/instructor/detail_quiz/:id/:slug") ||
    useMatch("/instructor/detail_quiz/:id/:slug/:type");

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
                    background: dashboard ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                  to={"/instructor/dashboard"}
                  onClick={toggleDrawer}
                >
                  <li
                    style={{
                      padding: "12px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <MdDashboard /> {"Dashboard"}
                  </li>
                </NavLink>

                <NavLink
                  style={{
                    background: list ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                  to={"/instructor/list_course"}
                  onClick={toggleDrawer}
                >
                  <li
                    style={{
                      padding: "12px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <MdList /> {"List Course"}
                  </li>
                </NavLink>
                {/* 
                <NavLink
                  to={"/instructor/room"}
                  style={{
                    background: room ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                  onClick={toggleDrawer}
                >
                  <li
                    style={{
                      padding: "12px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <MdQuestionAnswer /> {"Meeting Room"}
                  </li>
                </NavLink> */}
                <NavLink
                  to={"/instructor/account"}
                  style={{
                    background: account ? "#F1F5F9" : "",
                    borderRadius: "10px",
                  }}
                  onClick={toggleDrawer}
                >
                  <li
                    style={{
                      padding: "12px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <MdAccountCircle /> {"My Account"}
                  </li>
                </NavLink>
                <NavLink>
                  <li
                    style={{
                      padding: "12px 15px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      LogoutHandler();
                      toggleDrawer();
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
                background: dashboard ? "#F1F5F9" : "",
                borderRadius: "10px",
              }}
              to={"/instructor/dashboard"}
            >
              <li
                style={{
                  padding: "12px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <MdDashboard /> {"Dashboard"}
              </li>
            </NavLink>

            <NavLink
              style={{
                background: list ? "#F1F5F9" : "",
                borderRadius: "10px",
              }}
              to={"/instructor/list_course"}
            >
              <li
                style={{
                  padding: "12px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <MdList /> {"List Course"}
              </li>
            </NavLink>
            {/* 
            <NavLink
              to={"/instructor/room"}
              style={{
                background: room ? "#F1F5F9" : "",
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
                <MdQuestionAnswer /> {"Meeting Room"}
              </li>
            </NavLink> */}
            <NavLink
              to={"/instructor/account"}
              style={{
                background: account ? "#F1F5F9" : "",
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
                <MdAccountCircle /> {"My Account"}
              </li>
            </NavLink>
            <NavLink>
              <li
                style={{
                  padding: "12px 15px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
                onClick={LogoutHandler}
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

export default SideBar;

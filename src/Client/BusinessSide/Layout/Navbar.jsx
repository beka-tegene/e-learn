import React, { useEffect, useState } from "react";
import logo from "/assets/img/logo1.jpg";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { MdArrowDropDown, MdLogout, MdMenu, MdSettings } from "react-icons/md";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { back_base_url } from "../../../util/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Navbar = ({ setDrawerOpen, drawerOpen }) => {
  const navigate = useNavigate()
  const [Profiles, setProfiles] = useState("");
  const token = Cookies.get("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const decodedToken = jwt_decode(token);
          const decodedUserId = decodedToken?.userId;
          const res = await axios.get(
            `${back_base_url}api/v1/users/getuserById/${decodedUserId}`
          );
          setProfiles(res.data);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };
    fetchData();
  }, [token]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
  return (
    <div style={{ height: "13vh", background: "#FFFFFF" }}>
      <div
        style={{ display: "flex", alignItems: "center", padding: "0 1rem " }}
      >
        <div
          style={{
            height: "13vh",
            padding: "10px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          {!isMobile && (
            <div
              style={{
                height: "13vh",
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="logo" style={{ width: "50px" }} />
            </div>
          )}
          {!isMobile && <div style={{ flexGrow: 1 }}></div>}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
              <MdMenu style={{ fontSize: "28px", cursor: "pointer" }} />
            </IconButton>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "15px" }}>Transform Your Workforce </span>
            <span style={{ fontSize: "9px" }}> with Fancy Catering Academy</span>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div
          onClick={handleClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5px",
            cursor: "pointer",
          }}
        >
          <Avatar
            src={Profiles?.idCard?.length > 0 ? Profiles?.idCard?.[0] : ""}
          />
          <MdArrowDropDown />
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/lms-business/company-profile");
            handleClose();
          }}
        >
          <Avatar
            src={Profiles?.idCard?.length > 0 ? Profiles?.idCard?.[0] : ""}
          />{" "}
          My account
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() =>
            navigate( "/lms-business/company-setting")
          }
        >
          <ListItemIcon>
            <MdSettings />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={LogoutHandler}>
          <ListItemIcon>
            <MdLogout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Divider sx={{ background: "#E2E8F0", height: "2px" }} />
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import logo from "/assets/img/logo1.png";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { MdArrowDropDown, MdLogout, MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate()
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
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
          <img src={logo} alt="logo" style={{ width: "50px" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "15px" }}>Transform Your Workforce </span>
            <span style={{ fontSize: "9px" }}> with Fancy Catering Academy</span>
          </div>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <IconButton size="small" sx={{ ml: 2 }}>
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={decodedToken?.images?.[0]}
            ></Avatar>
          </IconButton>
          <MdArrowDropDown style={{ fontSize: "24px", cursor: "pointer" }} />
        </div>
      </div>
      <Divider sx={{ background: "#E2E8F0", height: "2px" }} />
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
            handleClose();
            window.open("/tutor/profile", "_self");
          }}
        >
          <Avatar src={decodedToken?.images?.[0]} /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
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
    </div>
  );
};

export default Navbar;

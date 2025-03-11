import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  MdArrowDropDown,
  MdLogout,
  MdMenu,
  MdNotifications,
  MdSettings,
} from "react-icons/md";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Store/Hooks/UserHook";
import logo from "/assets/img/logo1.jpg";
import { useNavigate } from "react-router-dom";
const Navbar = ({ setDrawerOpen, drawerOpen }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserHook.OutputUsers);

  const [name, setName] = useState("");

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const decodedName = decodedToken?.fullname;
        const decodedUserId = decodedToken?.userId;
        setName(decodedName);
        dispatch(getUserData({ data: { userId: decodedUserId } }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token, dispatch]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const LogoutHandler = async () => {
    Cookies.remove("token");
    window.location.href = "/accounts/login";
  };
  return (
    <div
      style={{
        padding: "10px 1.3rem",
        backgroundColor: "#272727",
        color: "#FFF",
        display: "grid",
        gridTemplateColumns: ".7fr 1.5fr .5fr 1fr",
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: "13vh",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", padding: "0 1rem " }}
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
            <img src={logo} alt="logo" style={{ width: "100px" }} />
          </div>
        )}
        {!isMobile && <div style={{ flexGrow: 1 }}></div>}
        {isMobile && (
          <IconButton
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ color: "#FFFFFF", "&:hover": { background: "#F7F7F780" } }}
          >
            <MdMenu style={{ fontSize: "28px", cursor: "pointer" }} />
          </IconButton>
        )}
      </div>
      {isMobile && <div></div>}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 style={{ color: "#FFFFFF" }}>
            welcome back{" "}
            <span
              style={{
                color: "#dfa035",
                textTransform: "capitalize",
                fontSize: "24px",
              }}
            >
              {name}
            </span>
          </h4>
        </div>
      )}
      <div></div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr .5fr 1fr",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div></div>
        <IconButton onClick={handleClick1}>
          <MdNotifications style={{ cursor: "pointer", color: "#FFF" }} />
        </IconButton>
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
              src={user?.idCard?.[0]}
            ></Avatar>
          </IconButton>
          <MdArrowDropDown style={{ fontSize: "24px", cursor: "pointer" }} />
        </div>
      </div>
      <Menu
        anchorEl={anchorEl1}
        id="account-menu"
        open={open1}
        onClose={handleClose1}
        onClick={handleClose1}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: 300,
            maxWidth: 300,
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
        {Array.from({ length: 5 }).map((_, index) => (
          <div>
            <MenuItem onClick={handleClose1} sx={{ width: "100%" }}>
              <Stack direction={"column"} sx={{ width: "100%" }}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography variant="subtitle2">Beka Tegene</Typography>
                  <Typography variant="subtitle2" sx={{ color: "gray" }}>
                    2 hour
                  </Typography>
                </Stack>
                <Typography variant="subtitle2" fontWeight={100}>
                  Lorem ipsum dolor sit amet consectetur 40
                </Typography>
              </Stack>
            </MenuItem>
            <Divider />
          </div>
        ))}
      </Menu>

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
        <MenuItem onClick={handleClose}>
          <Avatar src={user?.idCard?.[0]} /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
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

import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { back_base_url } from "../../util/config";

const Header = ({ setActiveData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [totalCourses, setTotalCourses] = useState(1);
  useEffect(() => {
    fetchCourse();
  }, []);
  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course`, {
        params: {
          limit: 9
        },
      });
      setTotalCourses(response.data.totalCourses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding:"10px 0"
        }}

      >
        <div>
          We have {totalCourses} Course 
        </div>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          <MdFilterList style={{ marginRight: "10px", color: "#888" }} />{" "}
          CATEGORY FILTER{" "}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => setActiveData("")}>All</MenuItem>
          <MenuItem onClick={() => setActiveData("Approved")}>
            Approved
          </MenuItem>
          <MenuItem onClick={() => setActiveData("Pending")}>Pending</MenuItem>
          <MenuItem onClick={() => setActiveData("Rejected")}>Reject</MenuItem>
        </Menu>
      </div>
      <div style={{ borderBottom: "1px solid #AFAFAF", width: "100%" }}></div>
    </div>
  );
};

export default Header;

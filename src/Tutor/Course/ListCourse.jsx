import { useTheme } from "@mui/material/styles";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { back_base_url } from "../../util/config";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";

const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 30; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "Monday",
  "Tuesday",
  "wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ListCourse = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [AllClassName, setAllClassName] = useState();
  const [className, setClassName] = useState("");
  const [availableTime, setAvailableTime] = useState({ from: "", to: "" });
  const [grade, setGrade] = useState("");
  const [howManyStudents, setHowManyStudents] = useState("");
  const [price, setprice] = useState("");
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    fetchAllClass();
  }, []);
  const fetchAllClass = async () => {
    try {
      const response = await axios.get(
        `${back_base_url}api/v1/class/getClassesByTutorInstructorId/${decodedToken?.userId}`
      );
      setAllClassName(response.data.classes);
    } catch (error) {
      console.log(error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${back_base_url}api/v1/class/createClass`,
        {
          className,
          availableTime: {
            day: personName,
            timeSlots: [`${availableTime.from} - ${availableTime.to}`],
          },
          grade,
          howManyStudents: Number(howManyStudents),
          price: Number(price),
          createUser: decodedToken?.userId,
          roomId: `Room-${generatePassword()}`,
        }
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        setInterval(() => {
          navigate(0);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#F7F7F7",
        padding: "10px 20px",
        height: "87vh",
        overflowY: "scroll",
      }}
    >
      <ToastContainer />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={handleClick}
          style={{
            padding: "5px 25px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          <IoAdd /> Create Class
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
          padding: "2rem 1rem ",
          alignItems: "start",
          width: "100%",
        }}
      >
        {AllClassName?.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              background: "#FFFFFF",
              cursor: "pointer",
              borderRadius: "5px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
            onClick={() => navigate(`/tutor/class-detail/${item._id}`)}
          >
            <h4>{item.className}</h4>
            <span>{item.availableTime[0].timeSlots[0]}</span>
            <span>Grade {item.grade}</span>
            <span>Capacity {item.howManyStudents} Students</span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {item?.availableTime[0]?.day?.map((name) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      background: "#F87F98",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span>{name.slice(0, 3)}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {item.price} <span style={{ fontSize: "11px" }}>ETB</span>
              </span>
              <span>{item?.userWhoHasEnrolled?.length} Student</span>
            </div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            width: "400px",
          }}
        >
          <h3>Create Class</h3>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
            }}
            onSubmit={submitHandler}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label htmlFor="class_name">Class Name</label>
              <input
                type="text"
                name="class_name"
                id="class_name"
                style={{
                  padding: "10px 15px",
                  fontSize: "16px",
                  border: "2px solid #EFEFEF",
                  borderRadius: "4px",
                }}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label htmlFor="available">Available Time</label>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  width: "100%",
                  padding: "10px 15px",
                  fontSize: "16px",
                  border: "2px solid #EFEFEF",
                  borderRadius: "4px",
                }}
              >
                <input
                  type="time"
                  name="available"
                  id="from"
                  style={{ width: "100%", border: "none" }}
                  onChange={(e) =>
                    setAvailableTime((prev) => ({
                      ...prev,
                      from: e.target.value,
                    }))
                  }
                  required
                />
                <input
                  type="time"
                  name="available"
                  id="to"
                  style={{ width: "100%", border: "none" }}
                  onChange={(e) =>
                    setAvailableTime((prev) => ({
                      ...prev,
                      to: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">
                Available day
              </InputLabel>
              <Select
                required
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Available day"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div
              style={{
                display: "grid",
                gap: "10px", // Increased gap for better spacing
                gridTemplateColumns: "1fr 1fr",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <label htmlFor="grade">Grade</label>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  style={{
                    padding: "10px 15px",
                    fontSize: "16px",
                    border: "2px solid #EFEFEF",
                    borderRadius: "4px",
                    width: "100%", // Ensure full-width input
                  }}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <label htmlFor="capacity">How many Students</label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  style={{
                    padding: "10px 15px",
                    fontSize: "16px",
                    border: "2px solid #EFEFEF",
                    borderRadius: "4px",
                    width: "100%", // Ensure full-width input
                  }}
                  onChange={(e) => setHowManyStudents(e.target.value)}
                  required
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label htmlFor="Price">Price per Student</label>
              <input
                type="text"
                name="Price"
                id="Price"
                style={{
                  padding: "10px 15px",
                  fontSize: "16px",
                  border: "2px solid #EFEFEF",
                  borderRadius: "4px",
                }}
                onChange={(e) => setprice(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                width: "100%",
              }}
            >
              <button
                style={{
                  padding: "5px 25px",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  color: "#007bff",
                  cursor: "pointer",
                  width: "100%",
                }}
                type="reset"
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "5px 25px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                  width: "100%",
                }}
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ListCourse;

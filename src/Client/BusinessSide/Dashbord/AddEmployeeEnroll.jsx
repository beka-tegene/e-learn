import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { back_base_url } from "../../../util/config";
import { toast, ToastContainer } from "react-toastify";

const AddEmployeeEnroll = () => {
  const navigate = useNavigate()
  const token = Cookies.get("token");
  let userId;
  if (token) {
    const decodedToken = jwt_decode(token);
    userId = decodedToken?.userId;
  }

  const [registerUser, setRegisterUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedInDialog, setSelectedInDialog] = useState([]);
  const { id } = useParams();
  const [filterCourse, setFilterCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${back_base_url}api/v1/course/${id}`);
      setFilterCourse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRegisterUser();
    }
  }, [userId]);

  const fetchRegisterUser = async () => {
    try {
      const res = await axios.get(
        `${back_base_url}api/v1/auth/users/${userId}`
      );
      setRegisterUser(res.data.users);
      setFilteredEmployees(res.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setSearchTerm("");
    setFilteredEmployees(registerUser);
    setSelectedInDialog([]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = registerUser.filter(
      (employee) =>
        employee.fullname
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        employee.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleToggleInDialog = (employee) => {
    const currentIndex = selectedInDialog.findIndex(
      (selected) => selected.email === employee.email
    );
    const newSelected = [...selectedInDialog];

    if (currentIndex === -1) {
      newSelected.push(employee);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedInDialog(newSelected);
  };

  const handleSelectAllInDialog = () => {
    if (selectedInDialog.length === filteredEmployees.length) {
      setSelectedInDialog([]);
    } else {
      setSelectedInDialog(filteredEmployees);
    }
  };

  const handleAddSelectedEmployees = () => {
    const newSelected = [...selectedEmployees];

    selectedInDialog.forEach((employee) => {
      const isAlreadySelected = newSelected.some(
        (selected) => selected.email === employee.email
      );
      if (!isAlreadySelected) {
        newSelected.push(employee);
      }
    });

    setSelectedEmployees(newSelected);
    handleClose();
  };

  const handleRemoveEmployee = (email) => {
    setSelectedEmployees(
      selectedEmployees.filter((employee) => employee.email !== email)
    );
  };

  const enrollUserEmployee = async () => {
    const emails = selectedEmployees.map((employee) => employee.email);
    try {
      if (filterCourse?.paymentType !== "free") {
        const res = await axios.post(
          `${back_base_url}api/v1/orders/orderascompany`,
          {
            userId,
            emails,
            items: [
              {
                product: id,
                amount: selectedEmployees.length,
              },
            ],
          }
        );
        if (res.status === 201) {
          navigate(`/lms-business/course-detail/${id}/enroll-employee/${res.data.order._id}`);
        }
      } else {
        const res = await axios.post(
          `${back_base_url}api/v1/users/enroll/multiple`,
          {
            emails,
            courseId: id,
          }
        );
        if (res.status === 200) {
          toast.success("Enrollment successful!");
          setInterval(() => {
            navigate(`/lms-business/course-create`);
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "87vh",
        overflowY: "scroll",
        background: "#F9FAFB",
        padding: "1.5rem",
      }}
    >
      <ToastContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#FFF",
            width: "90%",
            height: "35vh",
            borderRadius: "7px",
            padding: "10px 20px",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          <h4>Enroll Course For Your Employee</h4>
          <p style={{ width: "70%" }}>
            Strengthen Your Company by Investing in Advanced Employee Education.
            Foster a Culture of Continuous Growth and Innovation through
            Specialized Training.
          </p>
          <Button
            variant="contained"
            style={{
              background: "#22B04A",
              color: "#F9FAFB",
              padding: "6px 20px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={handleClickOpen}
          >
            Add People
          </Button>
        </div>
        <div
          style={{
            background: "#FFF",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            gap: ".2rem",
          }}
        >
          {selectedEmployees.map((employee, index) => (
            <React.Fragment key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "6px 20px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Avatar />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      {employee.fullname}
                    </span>
                    <span style={{ fontSize: "12px" }}>{employee.email}</span>
                  </div>
                </div>
                <IconButton
                  onClick={() => handleRemoveEmployee(employee.email)}
                >
                  <MdDelete />
                </IconButton>
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </div>
        {selectedEmployees.length >= 1 && (
          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              style={{
                background: "#D9A128",
                color: "#F9FAFB",
                padding: "6px 20px",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
              onClick={enrollUserEmployee}
            >
              Enroll Now
            </button>
          </div>
        )}
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Find and Add Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search Employee"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
          />
          <List>
            <ListItem button onClick={handleSelectAllInDialog}>
              <Checkbox
                checked={selectedInDialog.length === filteredEmployees.length}
              />
              <ListItemText primary="Select All" />
            </ListItem>
            {filteredEmployees.map((employee, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleToggleInDialog(employee)}
              >
                <Checkbox
                  checked={selectedInDialog.some(
                    (selected) => selected.email === employee.email
                  )}
                />
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={employee.fullname}
                  secondary={employee.email}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddSelectedEmployees} color="primary">
            Add Selected
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEmployeeEnroll;

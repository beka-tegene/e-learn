import React, { useState } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { back_base_url } from "../../util/config";

const AddStudentForm = ({ open, onClose, onSubmit }) => {
  const [newStudent, setNewStudent] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${back_base_url}api/v1/auth/register`,
        newStudent,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        onSubmit();  // Notify parent component to refresh the student list
        onClose();
      } else {
        console.error("Failed to add student:", response.data);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="fullname"
          label="Full Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newStudent.fullname}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={newStudent.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phoneNumber"
          label="Phone Number"
          type="text"
          fullWidth
          variant="outlined"
          value={newStudent.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={newStudent.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentForm;

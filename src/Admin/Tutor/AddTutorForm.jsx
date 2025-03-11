import React, { useState } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const AddTeacherForm = ({ open, onClose, onSubmit }) => {
  const [newTeacher, setNewTeacher] = useState({
    fullname: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    experience: "",
    address: "",
    profilePhoto: "",
    idCard: "",
    instructorLicense: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(newTeacher);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Teacher</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="fullname"
          label="Full Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newTeacher.fullname}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={newTeacher.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={newTeacher.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phoneNumber"
          label="Phone Number"
          type="text"
          fullWidth
          variant="outlined"
          value={newTeacher.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="gender"
          label="Gender"
          type="text"
          fullWidth
          variant="outlined"
          value={newTeacher.gender}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="experience"
          label="Experience"
          type="text"
          fullWidth
          variant="outlined"
          value={newTeacher.experience}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          variant="outlined"
          value={newTeacher.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="profilePhoto"
          label="Profile Photo"
          type="text"
          fullWidth
          variant="outlined"
          value={newTeacher.profilePhoto}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="idCard"
          label="ID Card"
          type="text"
          fullWidth
          variant="outlined"
          value={newTeacher.idCard}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="instructorLicense"
          label="Instructor License"
          type="text"
          fullWidth
          variant="outlined"
          value={newTeacher.instructorLicense}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={newTeacher.password}
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

export default AddTeacherForm;

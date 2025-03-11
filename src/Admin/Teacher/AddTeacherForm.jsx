import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setInstructorRegister } from "../../Store/Hooks/AuthHook";
import { toast } from "react-toastify";

const AddTeacherForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [newTeacher, setNewTeacher] = useState({
    fullname: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    experience: "",
    address: "",
    idCard: null,
    instructorLicense: [],
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewTeacher((prev) => ({
        ...prev,
        [name]: Array.from(files),
      }));
    } else {
      setNewTeacher((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!newTeacher.fullname.trim()) {
      errors.fullname = "Full Name is required";
    }
    if (!newTeacher.username.trim()) {
      errors.username = "Username is required";
    }
    if (!newTeacher.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newTeacher.email)) {
      errors.email = "Email address is invalid";
    }
    if (!newTeacher.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    }
    if (!newTeacher.gender.trim()) {
      errors.gender = "Gender is required";
    }
    if (!newTeacher.experience.trim()) {
      errors.experience = "Experience is required";
    }
    if (!newTeacher.address.trim()) {
      errors.address = "Address is required";
    }
    if (!newTeacher.idCard) {
      errors.idCard = "ID Card is required";
    }
    if (!newTeacher.instructorLicense.length) {
      errors.instructorLicense = "Instructor License is required";
    }
    if (!newTeacher.password.trim()) {
      errors.password = "Password is required";
    } else if (newTeacher.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/\d/.test(newTeacher.password)) {
      errors.password = "Password must contain at least one digit";
    } else if (!/[a-zA-Z]/.test(newTeacher.password)) {
      errors.password = "Password must contain at least one letter";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      Object.keys(newTeacher).forEach((key) => {
        if (key === "instructorLicense") {
          newTeacher.instructorLicense.forEach((file) => {
            formData.append("instructorLicense", file);
          });
        } else if (key === "idCard") {
          newTeacher.idCard.forEach((file) => {
            formData.append("idCard", file);
          });
        }
      });
      formData.append("userName", newTeacher.username);
      formData.append("fullname", newTeacher.fullname);
      formData.append("phoneNumber", newTeacher.phoneNumber);
      formData.append("email", newTeacher.email);
      formData.append("password", newTeacher.password);
      formData.append("Location", newTeacher.address);
      formData.append("Exprience", newTeacher.experience);
      formData.append("Gender", newTeacher.gender);

      setLoading(true);
      dispatch(setInstructorRegister({ data: formData }))
        .then((res) => {
          setLoading(false);
          onClose();
        })
        .catch((error) => {
          console.error("Registration error:", error);
          setLoading(false);
        });
    } else {
      toast.error("Form has errors, please correct them");
    }
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
          error={!!errors.fullname}
          helperText={errors.fullname}
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
          error={!!errors.username}
          helperText={errors.username}
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
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="dense"
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          fullWidth
          variant="outlined"
          value={newTeacher.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <FormControl fullWidth margin="dense" error={!!errors.gender}>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={newTeacher.gender}
            onChange={handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
          {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>
        <TextField
          margin="dense"
          name="experience"
          label="Experience"
          type="text"
          fullWidth
          variant="outlined"
          value={newTeacher.experience}
          onChange={handleChange}
          error={!!errors.experience}
          helperText={errors.experience}
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
          error={!!errors.address}
          helperText={errors.address}
        />

        <TextField
          margin="dense"
          name="idCard"
          label="Profile Photo"
          type="file"
          fullWidth
          variant="outlined"
          onChange={handleChange}
          error={!!errors.idCard}
          helperText={errors.idCard}
        />
        <TextField
          margin="dense"
          name="instructorLicense"
          label="Instructor License"
          type="file"
          inputProps={{ multiple: true }}
          fullWidth
          variant="outlined"
          onChange={handleChange}
          error={!!errors.instructorLicense}
          helperText={errors.instructorLicense}
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
          error={!!errors.password}
          helperText={errors.password}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTeacherForm;

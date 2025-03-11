import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FcEditImage } from "react-icons/fc";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { back_base_url } from "../util/config";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const decodedUserId = decodedToken?.userId;

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await axios.get(
          `${back_base_url}api/v1/auth/instructors`
        );
        const instructors = res.data.instructors;
        const filteredInstructor = instructors.find(
          (instructor) => instructor._id === decodedUserId
        );
        setInstructor(filteredInstructor);
      } catch (error) {
        toast.error("something went wrong");
      }
    };
    fetchInstructor();
  }, [decodedUserId]);

  if (!instructor) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", decodedUserId);
    formData.append("fullname", instructor.fullname);
    formData.append("email", instructor.email);
    formData.append("phoneNumber", instructor.phoneNumber);
    formData.append("Location", instructor.Location);
    formData.append("Exprience", instructor.Exprience);
    formData.append("Gender", instructor.Gender);
    if (profileImage) {
      formData.append("idCard", profileImage);
    }

    try {
      const res = await axios.put(
        `${back_base_url}api/v1/auth/instructors/${decodedUserId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success === true) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  return (
    <Box sx={{ padding: "1rem", backgroundColor: "#F7F7F7" }}>
      <ToastContainer />
      <Typography variant="h4">My Account</Typography>
      <Grid container spacing={2} alignItems="start">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#F2F2F2",
              padding: "1rem",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Avatar
                sx={{ width: 200, height: 200 }}
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : instructor?.idCard
                }
              />
              <label htmlFor="profile">
                <FcEditImage
                  style={{
                    fontSize: "30px",
                    position: "absolute",
                    bottom: 0,
                    right: "25%",
                  }}
                />
              </label>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                {instructor.fullname}
              </Typography>
              <Typography variant="body2">{instructor.email}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <form onSubmit={submitHandler}>
            <input
              type="file"
              name="profile"
              id="profile"
              hidden
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullname"
                  value={instructor.fullname}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{ style: { backgroundColor: "#F1EDF7" } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={instructor.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{ style: { backgroundColor: "#F1EDF7" } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={instructor.phoneNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{ style: { backgroundColor: "#F1EDF7" } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="Location"
                  value={instructor.Location}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{ style: { backgroundColor: "#F1EDF7" } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Experience</InputLabel>
                  <Select
                    label="Experience"
                    name="Exprience"
                    value={instructor.Exprience}
                    onChange={handleInputChange}
                    sx={{ backgroundColor: "#F1EDF7" }}
                  >
                    <MenuItem value="0">0 Year</MenuItem>
                    <MenuItem value="1+">1+ Year</MenuItem>
                    <MenuItem value="2+">2+ Year</MenuItem>
                    <MenuItem value="3+">3+ Year</MenuItem>
                    <MenuItem value="4+">4+ Year</MenuItem>
                    <MenuItem value="5+">5+ Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    name="Gender"
                    value={instructor.Gender}
                    onChange={handleInputChange}
                    sx={{ backgroundColor: "#F1EDF7" }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setInstructor(null)}
                  sx={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;

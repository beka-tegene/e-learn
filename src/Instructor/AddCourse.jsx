import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourse } from "../Store/Hooks/CourseHook";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Container,
  Paper,
  Typography,
  InputLabel,
  FormControl,
  Input,
  CircularProgress,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import { MdArrowBack } from "react-icons/md";
const names = ["Individual", "Government", "Business"];

const AddCourse = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [priceType, setPriceType] = useState("");
  const [payment, setPayment] = useState(0);
  const [aboutCourse, setAboutCourse] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.userId);
      setRole(decodedToken.role);
    }
  }, []);

  const handleChangeCoverPhoto = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleChangeCourseTitle = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleChangeCourseDescription = (e) => {
    setCourseDescription(e.target.value);
  };

  const handleChangeCourseCategory = (e) => {
    setCourseCategory(e.target.value);
  };

  const handleChangeCourseDuration = (e) => {
    setCourseDuration(e.target.value);
  };

  const handleChangePriceType = (e) => {
    setPriceType(e.target.value);
  };

  const handleChangePayment = (e) => {
    setPayment(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    const formData = new FormData();
    formData.append("coverPage", coverPhoto);
    formData.append("courseName", courseTitle);
    formData.append("courseDescription", courseDescription);
    formData.append("categories[0]", courseCategory);
    formData.append("courseDuration", courseDuration);
    formData.append("paymentType", priceType);
    formData.append("price", payment);
    formData.append("aboutCourse", aboutCourse);
    formData.append("userId", userId);
    formData.append("createCourseas", "individual");
    formData.append("role", role);
    try {
      dispatch(setCourse(formData));
    } catch (error) {
      toast.error("something went wrong");
    } finally{
      setInterval(()=>{
        setLoadingLogin(false);
      },2000)
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        padding: "1rem",
        height: "87vh",
        overflowY: "scroll",
        width: "100%",
      }}
    >
      <button onClick={() => window.history.back()}>
        <MdArrowBack size={16} /> Back
      </button>
      <Container
        maxWidth="lg"
        sx={{
          padding: "1rem 10px",
        }}
      >
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper style={{ padding: "20px", background: "#F7F7F7" }}>
              <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Add Course
              </Typography>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel htmlFor="cover-photo">Cover Photo</InputLabel>
                  <Input
                    type="file"
                    id="cover-photo"
                    onChange={handleChangeCoverPhoto}
                    inputProps={{ accept: "image/*" }}
                    style={{ display: "none" }}
                  />
                  <div
                    style={{
                      height: "40vh",
                      width: "100%",
                      background: "#FFFFFF",
                      padding: "15px",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      border: `2px dotted ${
                        coverPhoto ? "#90CDF4" : "#E2E8F0"
                      }`,
                    }}
                  >
                    {coverPhoto ? (
                      <img
                        src={URL.createObjectURL(coverPhoto)}
                        alt="Cover Photo Preview"
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          borderRadius: "6px",
                        }}
                      />
                    ) : (
                      <label
                        htmlFor="cover-photo"
                        style={{
                          background: "#90CDF4",
                          padding: "6px 25px",
                          borderRadius: "4px",
                          color: "#FFFFFF",
                          fontWeight: "bold",
                          fontSize: "14px",
                          cursor: "pointer",
                        }}
                      >
                        Upload Cover Photo
                      </label>
                    )}
                  </div>
                </FormControl>
                <TextField
                  label="Course Title"
                  fullWidth
                  value={courseTitle}
                  onChange={handleChangeCourseTitle}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Course Description"
                  fullWidth
                  value={courseDescription}
                  onChange={handleChangeCourseDescription}
                  sx={{ marginBottom: 2 }}
                />
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <InputLabel id="course-category-label">
                    Course Category
                  </InputLabel>
                  <Select
                    labelId="course-category-label"
                    id="course-category"
                    value={courseCategory}
                    onChange={handleChangeCourseCategory}
                  >
                    <MenuItem value="">
                      <em>Select category</em>
                    </MenuItem>
                    <MenuItem value="Accounting & Finance">
                      Accounting & Finance
                    </MenuItem>
                    <MenuItem value="Arts & Crafts">Arts & Crafts</MenuItem>
                    <MenuItem value="Beauty & Makeup">Beauty & Makeup</MenuItem>
                    <MenuItem value="Business & Marketing">
                      Business & Marketing
                    </MenuItem>
                    <MenuItem value="Creatives & Design">
                      Creatives & Design
                    </MenuItem>
                    <MenuItem value="Food & Beverage">Food & Beverage</MenuItem>
                    <MenuItem value="Health & Fitness">
                      Health & Fitness
                    </MenuItem>
                    <MenuItem value="IT & Development">
                      IT & Development
                    </MenuItem>
                    <MenuItem value="Language & Literature">
                      Language & Literature
                    </MenuItem>
                    <MenuItem value="Music & Theatre">Music & Theatre</MenuItem>
                    <MenuItem value="Office Productivity">
                      Office Productivity
                    </MenuItem>
                    <MenuItem value="Personal Development">
                      Personal Development
                    </MenuItem>
                    <MenuItem value="Photography & Videography">
                      Photography & Videography
                    </MenuItem>
                    <MenuItem value="Academy Course">
                      Academy Course
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Course Duration"
                  fullWidth
                  value={courseDuration}
                  onChange={handleChangeCourseDuration}
                  sx={{ marginBottom: 2 }}
                />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                      <InputLabel id="price-type-label">Price Type</InputLabel>
                      <Select
                        labelId="price-type-label"
                        id="price-type"
                        value={priceType}
                        onChange={handleChangePriceType}
                      >
                        <MenuItem value="">
                          <em>Select price type</em>
                        </MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="free">Free</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Payment"
                      type="number"
                      fullWidth
                      value={payment}
                      onChange={handleChangePayment}
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                </Grid>
                <div style={{ marginBottom: "20px" }}>
                  <Typography variant="subtitle1">
                    Requirement, Objectives, and Target Audience
                  </Typography>
                  <ReactQuill
                    theme="snow"
                    style={{ height: "30vh", marginBottom: "2.5rem" }}
                    value={aboutCourse}
                    onChange={setAboutCourse}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: "20px",
                  }}
                >
                  <Button variant="outlined" sx={{ marginRight: 2 }}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loadingLogin}
                  >
                    {loadingLogin ? (
                      <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
                    ) : (
                      "Next"
                    )}
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: "20px", position: "sticky", top: "20px" }}>
              <Typography
                variant="h5"
                style={{ marginBottom: "20px", color: "#DFA035" }}
              >
                Course Upload Tips
              </Typography>
              <Typography variant="body1" fontSize={12}>
                Set the Course Price option to make it free.
              </Typography>
              <Typography variant="body1" fontSize={12}>
                Standard size for the course thumbnail.
              </Typography>
              <Typography variant="body1" fontSize={12}>
                Video section controls the course overview video.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddCourse;

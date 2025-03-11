import { useState } from "react";
import logo from "/assets/img/logo1.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setInstructorRegister } from "../Store/Hooks/AuthHook";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CircularProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Instructor_Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [fullname, setfullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Location, setLocation] = useState("");
  const [Experience, setExperience] = useState("");
  const [Gender, setGender] = useState("");
  const [idCard, setIdCard] = useState([]);
  const [instructorLicense, setInstructorLicense] = useState([]);
  const [confirm_password, setConfirm_password] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setInstructorLicense(files);
  };
  const validateForm = () => {
    let errors = {};
    if (!fullname.trim()) {
      errors.fullname = "First Name is required";
    }
    if (!Location.trim()) {
      errors.Location = "Location is required";
    }
    if (!Experience.trim()) {
      errors.Experience = "Experience is required";
    }
    if (!Gender.trim()) {
      errors.Gender = "Gender is required";
    }
    if (!userName.trim()) {
      errors.userName = "user Name is required";
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "phone Number is required";
    }

    if (!instructorLicense.length) {
      errors.instructorLicense = "instructor License is required";
    }
    if (!selectedAgreement.trim()) {
      errors.selectedAgreement = "Agreement is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/\d/.test(password)) {
      errors.password = "Password must contain at least one digit";
    } else if (!/[a-zA-Z]/.test(password)) {
      errors.password = "Password must contain at least one letter";
    }

    if (!confirm_password.trim()) {
      errors.confirm_password = "Confirm Password is required";
    } else if (password !== confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("fullname", fullname);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("Location", Location);
    formData.append("Exprience", Experience);
    formData.append("Gender", Gender);
    formData.append("productionstudio", selectedAgreement);
    formData.append("idCard", idCard);
    instructorLicense.forEach((file) => {
      formData.append("instructorLicense", file);
    });

    if (validateForm()) {
      dispatch(setInstructorRegister({ data: formData }));
      setLoading(false);
    } else {
      toast.error("Form has errors, please correct them");
      setLoading(false);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const [isHovered1, setIsHovered1] = useState(false);

  const handleMouseEnter1 = () => setIsHovered1(true);
  const handleMouseLeave1 = () => setIsHovered1(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter2 = () => setIsHovered2(true);
  const handleMouseLeave2 = () => setIsHovered2(false);
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ background: "#F1F1F1", padding: "1rem" }}
    >
      <ToastContainer />
      <div
        className="d-flex flex-column align-items-center justify-content-start gap-2"
        style={{ width: "500px" }}
      >
        <NavLink className="col" style={{ cursor: "pointer" }} to={"/"}>
          <img src={logo} alt="logo" style={{ width: "50px" }} />
        </NavLink>
        <div
          className="col bg-white p-3 rounded d-flex flex-column align-items-center gap-2"
          style={{ width: "100%" }}
        >
          <div style={{ width: "100%",padding:"7px",borderRadius:"4px"  }}>
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Register as
            </h3>
            <div style={{ width: "100%", display: "flex",gap:"5px" }}>
              <button
                style={{
                  width: "100%",
                  background: isHovered ? "#E7E7E7" : "#F7F7F7",
                  color: isHovered ? "#272727" : "#272727",
                  borderRadius: "4px",
                  padding: "4px 0",
                  fontSize: "18px",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => navigate("/accounts/student")}
              >
                Student
              </button>
              <button
                style={{
                  width: "100%",
                  borderRadius: "4px",
                  padding: "4px 0",
                  fontSize: "18px",
                  background: isHovered1 ? "#E7E7E7" : "#D7A022",
                  color: isHovered1 ? "#272727" : "#FFFFFF",
                }}
                onMouseEnter={handleMouseEnter1}
                onMouseLeave={handleMouseLeave1}
                onClick={() => navigate("/accounts/instructor")}
              >
                Instructor
              </button>
              {/* <button
                style={{
                  width: "100%",
                  borderRadius: "4px",
                  padding: "4px 0",
                  fontSize: "18px",
                  background: isHovered2 ? "#E7E7E7" : "#F7F7F7",
                  color: isHovered2 ? "#272727" : "#272727",
                }}
                onMouseEnter={handleMouseEnter2}
                onMouseLeave={handleMouseLeave2}
                onClick={() => navigate("/accounts/tutor")}
              >
                Tutors
              </button> */}
            </div>
          </div>
          {/* <h3 className="text-3xl font-bold">SIGN UP</h3> */}
          <p>Great to have you back! this is instructor registration form</p>
          <form
            className="d-flex flex-column gap-2 w-100"
            onSubmit={submitHandler}
          >
            <div className="d-flex flex-column gap-1" style={{ width: "100%" }}>
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                className="form-control"
                style={{
                  border: `${errors.fullname && "1px solid red"}`,
                  borderRadius: `${errors.fullname && "4px"}`,
                  background: `${errors.fullname && "#FA807250"}`,
                }}
                onChange={(e) => setfullname(e.target.value)}
              />
            </div>

            <div className="d-flex gap-2" style={{ width: "100%" }}>
              <div
                className="d-flex flex-column gap-1"
                style={{ width: "100%" }}
              >
                <label htmlFor="fullName">Username</label>
                <input
                  type="text"
                  id="fullName"
                  className="form-control"
                  style={{
                    border: `${errors.userName && "1px solid red"}`,
                    borderRadius: `${errors.userName && "4px"}`,
                    background: `${errors.userName && "#FA807250"}`,
                  }}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div
                className="d-flex flex-column gap-1"
                style={{ width: "100%" }}
              >
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  style={{
                    border: `${errors.email && "1px solid red"}`,
                    borderRadius: `${errors.email && "4px"}`,
                    background: `${errors.email && "#FA807250"}`,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                style={{
                  border: `${errors.phoneNumber && "1px solid red"}`,
                  borderRadius: `${errors.phoneNumber && "4px"}`,
                  background: `${errors.phoneNumber && "#FA807250"}`,
                }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="phone">Gender</label>
              <select
                name=""
                id=""
                className="form-control"
                onChange={(e) => setGender(e.target.value)}
                style={{
                  border: `${errors.Gender && "1px solid red"}`,
                  borderRadius: `${errors.Gender && "4px"}`,
                  background: `${errors.Gender && "#FA807250"}`,
                }}
              >
                <option selected disabled></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="phone">Experience</label>
              <select
                id="phone"
                className="form-control"
                style={{
                  border: `${errors.Experience && "1px solid red"}`,
                  borderRadius: `${errors.Experience && "4px"}`,
                  background: `${errors.Experience && "#FA807250"}`,
                }}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option selected disabled></option>
                <option value="0">0 Year</option>
                <option value="1">1+ Year</option>
                <option value="2">2+ Year</option>
                <option value="3">3+ Year</option>
                <option value="4">4+ Year</option>
                <option value="5">5+ Year</option>
              </select>
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                style={{
                  border: `${errors.Location && "1px solid red"}`,
                  borderRadius: `${errors.Location && "4px"}`,
                  background: `${errors.Location && "#FA807250"}`,
                }}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="number">Instructor Payment Agreement</label>
              <div>
                <div className="d-flex gap-2 align-items-center ">
                  <input
                    type="radio"
                    name="payment"
                    id="50-60"
                    value="Indiviual"
                    checked={selectedAgreement === "Indiviual"}
                    onChange={(e) => setSelectedAgreement(e.target.value)}
                    style={{
                      border: `${errors.selectedAgreement && "1px solid red"}`,
                      borderRadius: `${errors.selectedAgreement && "4px"}`,
                      background: `${errors.selectedAgreement && "#FA807250"}`,
                    }}
                  />
                  <label htmlFor="50-60">50-60% for the instructor</label>
                </div>
                {selectedAgreement === "Indiviual" && (
                  <p style={{ padding: "10px 1rem", fontSize: "14px" }}>
                    This deal will be applied if the instructor is able to do
                    the video recording and all other course contents. The range
                    will grow from 50% to 60% based on the number of students
                    that enrolled on the course:
                    <ul style={{ padding: "5px 1rem", fontSize: "12px" }}>
                      <li>
                        If students less than 50 enroll, the instructor will get
                        50% of the income.
                      </li>
                      <li>
                        If 100-500 students enroll, the instructor will get 55%
                        of the income.
                      </li>
                      <li>
                        If more than 1000 students enroll, the instructor will
                        get 60% of the income.
                      </li>
                    </ul>
                  </p>
                )}
              </div>
              <div>
                <div className="d-flex gap-2 align-items-center ">
                  <input
                    type="radio"
                    name="payment"
                    id="40"
                    value="kegebrew University"
                    checked={selectedAgreement === "kegebrew University"}
                    onChange={(e) => setSelectedAgreement(e.target.value)}
                    style={{
                      border: `${errors.selectedAgreement && "1px solid red"}`,
                      borderRadius: `${errors.selectedAgreement && "4px"}`,
                      background: `${errors.selectedAgreement && "#FA807250"}`,
                    }}
                  />
                  <label htmlFor="40">40% for Instructor</label>
                </div>
                {selectedAgreement === "kegebrew University" && (
                  <p style={{ padding: "10px 1rem", fontSize: "14px" }}>
                    This deal will be applied if the instructor requires
                    course-making equipment from the provider, for example,
                    video recording devices. The range will be 40%.
                  </p>
                )}
              </div>
            </div>
            <div className="d-flex gap-2" style={{ width: "100%" }}>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="profile">Profile Photo</label>
                <input
                  type="file"
                  id="profile"
                  className="form-control"
                  style={{
                    border: `${errors.idCard && "1px solid red"}`,
                    borderRadius: `${errors.idCard && "4px"}`,
                    background: `${errors.idCard && "#FA807250"}`,
                  }}
                  onChange={(e) => setIdCard(e.target.files[0])}
                  accept="image/*"
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="instructorLicense">
                  Id card and Instructor license
                </label>
                <input
                  type="file"
                  id="instructorLicense"
                  className="form-control"
                  style={{
                    border: `${errors.instructorLicense && "1px solid red"}`,
                    borderRadius: `${errors.instructorLicense && "4px"}`,
                    background: `${errors.instructorLicense && "#FA807250"}`,
                  }}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                />
              </div>
            </div>
            <div className="d-flex gap-2" style={{ width: "100%" }}>
              <div
                className="d-flex flex-column gap-2"
                style={{ width: "100%" }}
              >
                <label htmlFor="password">Password</label>
                <div
                  className="password-input-container form-control"
                  style={{
                    border: `${errors.password && "1px solid red"}`,
                    borderRadius: `${errors.password && "4px"}`,
                    background: `${errors.password && "#FA807250"}`,
                    display: "flex",
                  }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    style={{
                      width: "95%",
                      border: "none",
                      background: "transparent",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-btn"
                  >
                    {showPassword ? (
                      <MdVisibilityOff /> // Icon for hiding password
                    ) : (
                      <MdVisibility /> // Icon for showing password
                    )}
                  </button>
                </div>
                <p style={{ color: "#FA8072", fontSize: "11px" }}>
                  {errors.password}
                </p>
              </div>

              <div
                className="d-flex flex-column gap-2"
                style={{ width: "100%" }}
              >
                <label htmlFor="Confirm">Confirm Password</label>
                <div
                  className="password-input-container form-control"
                  style={{
                    border: `${errors.confirm_password && "1px solid red"}`,
                    borderRadius: `${errors.confirm_password && "4px"}`,
                    background: `${errors.confirm_password && "#FA807250"}`,
                    display: "flex",
                  }}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="Confirm"
                    style={{
                      width: "95%",
                      border: "none",
                      background: "transparent",
                    }}
                    onChange={(e) => setConfirm_password(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle-btn"
                  >
                    {showConfirmPassword ? (
                      <MdVisibilityOff /> // Icon for hiding password
                    ) : (
                      <MdVisibility /> // Icon for showing password
                    )}
                  </button>
                </div>
                <p style={{ color: "#FA8072", fontSize: "11px" }}>
                  {errors.confirm_password}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-warning btn-lg"
              disabled={loading ? true : false}
            >
              {loading ? (
                <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p>
            Already have An Account ? <a href="/accounts/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instructor_Register;

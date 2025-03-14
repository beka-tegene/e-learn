import { useEffect, useState } from "react";
import axios from "axios";
import logo from "/assets/img/logo1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setRegister } from "../Store/Hooks/AuthHook";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import jwt_decode from "jwt-decode";
import { CircularProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
const Student_Register = () => {
  const navigate = useNavigate();
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [fullname, setFullName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("s");
    if (token) {
      const decodedToken = jwt_decode(token);
      setEmailDisabled(true);
      setEmail(decodedToken.email);
      setUserId(decodedToken.userId[0]);
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let errors = {};
    if (!fullname.trim()) {
      errors.fullname = "Full Name is required";
    }
    if (!phonenumber.trim()) {
      errors.phonenumber = "Phone Number is required";
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
    if (validateForm()) {
      dispatch(
        setRegister({
          data: { fullname, phoneNumber: phonenumber, email, password, userId },
        })
      );
      // toast.success("Registration successful!");
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
      style={{ background: "#F1F1F1", minHeight: "100vh", padding: "1rem" }}
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
          <div style={{ width: "100%",padding:"7px",borderRadius:"4px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Register as
            </h3>
            <div style={{ width: "100%", display: "flex",gap:"5px" }}>
              <button
                style={{
                  width: "100%",
                  background: isHovered ? "#E7E7E7" : "#D7A022",
                  color: isHovered ? "#272727" : "#FFFFFF",
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
                  color: isHovered1 ? "#272727" : "#272727",
                  padding: "4px 0",
                  fontSize: "18px",
                  background: isHovered1 ? "#E7E7E7" : "#F7F7F7",
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
                  color: isHovered2 ? "#272727" : "#272727",
                  fontSize: "18px",
                  background: isHovered2 ? "#E7E7E7" : "#F7F7F7",
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
          <p>Great to have you back! this is student registration form</p>

          <form
            className="d-flex flex-column gap-2 w-100"
            onSubmit={submitHandler}
          >
            <div className="d-flex gap-2" style={{ width: "100%" }}>
              <div
                className="d-flex flex-column gap-1"
                style={{ width: "100%" }}
              >
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className="form-control"
                  style={{
                    border: errors.fullname ? "1px solid red" : "",
                    borderRadius: errors.fullname ? "4px" : "",
                    background: errors.fullname ? "#FA807250" : "",
                  }}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullname && (
                  <p style={{ color: "#FA8072", fontSize: "11px" }}>
                    {errors.fullname}
                  </p>
                )}
              </div>
              <div
                className="d-flex flex-column gap-1"
                style={{ width: "100%" }}
              >
                <label htmlFor="email">Email</label>
                <input
                  disabled={emailDisabled}
                  type="text"
                  id="email"
                  className="form-control"
                  style={{
                    border: errors.email ? "1px solid red" : "",
                    borderRadius: errors.email ? "4px" : "",
                    background: errors.email ? "#FA807250" : "",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {errors.email && (
                  <p style={{ color: "#FA8072", fontSize: "11px" }}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                style={{
                  border: errors.phonenumber ? "1px solid red" : "",
                  borderRadius: errors.phonenumber ? "4px" : "",
                  background: errors.phonenumber ? "#FA807250" : "",
                }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phonenumber && (
                <p style={{ color: "#FA8072", fontSize: "11px" }}>
                  {errors.phonenumber}
                </p>
              )}
            </div>

            <div className="d-flex flex-column gap-2" style={{ width: "100%" }}>
              <label htmlFor="password">Password</label>
              <div
                className="password-input-container form-control"
                style={{
                  border: errors.password ? "1px solid red" : "",
                  borderRadius: errors.password ? "4px" : "",
                  background: errors.password ? "#FA807250" : "",
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
              {errors.password && (
                <p
                  style={{
                    color: "#FA8072",
                    fontSize: "11px",
                    margin: "-1px 0",
                  }}
                >
                  {errors.password}
                </p>
              )}
            </div>
            <div className="d-flex flex-column gap-2" style={{ width: "100%" }}>
              <label htmlFor="Confirm">Confirm Password</label>
              <div
                className="password-input-container form-control"
                style={{
                  border: errors.confirm_password ? "1px solid red" : "",
                  borderRadius: errors.confirm_password ? "4px" : "",
                  background: errors.confirm_password ? "#FA807250" : "",
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
            Already have an account?{" "}
            <NavLink to="/accounts/login">Sign in</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Student_Register;

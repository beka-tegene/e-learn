import React, { useState } from "react";
import logo from "/assets/img/logo1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../Store/Hooks/AuthHook";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState({});
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateLoginForm = () => {
    let errors = {};

    if (!email.trim()) {
      errors.email = "email is required";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    setErrorLogin(errors);
    return Object.keys(errors).length === 0;
  };

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    if (validateLoginForm()) {
      dispatch(setLogin({ data: { emailOrPhoneNumber: email, password } }));
      setLoadingLogin(false);
    } else {
      toast.error("Form has errors, please correct them");
      setLoadingLogin(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ background: "#F1F1F1", minHeight: "100vh", padding: "1rem" }}
    >
      <ToastContainer />
      <div
        className="d-flex flex-column align-items-center justify-content-start gap-1"
        style={{ width: "500px" }}
      >
        <NavLink className="col" style={{ cursor: "pointer" }} to={"/"}>
          <img src={logo} alt="logo" style={{ width: "50px" }} />
        </NavLink>
        <div
          className="col bg-white p-4 rounded d-flex flex-column align-items-center gap-2"
          style={{ width: "100%" }}
        >
          <h3 className="text-3xl font-bold">SIGN IN</h3>
          <p>Great to have you back!</p>
          <form
            action=""
            className="d-flex flex-column gap-2 w-100"
            onSubmit={submitHandler}
          >
            <div className="d-flex flex-column gap-1">
              <label htmlFor="email">Email or Phone Number</label>
              <input
                type="text"
                id="text"
                className="form-control"
                style={{
                  border: `${errorLogin.email && "1px solid red"}`,
                  borderRadius: `${errorLogin.email && "4px"}`,
                  background: `${errorLogin.email && "#FA807250"}`,
                }}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column gap-2">
              <label htmlFor="password">Password</label>
              <div
                className="password-input-container form-control"
                style={{
                  border: `${errorLogin.password && "1px solid red"}`,
                  borderRadius: `${errorLogin.password && "4px"}`,
                  background: `${errorLogin.password && "#FA807250"}`,
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
            </div>
            <a href="#" className="text-right " style={{ cursor: "pointer" }}>
              Forgot Password
            </a>
            <button
              type="submit"
              className="btn btn-warning btn-lg "
              disabled={loadingLogin ? true : false}
            >
              {loadingLogin ? (
                <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p>
            Don't have an Account?{" "}
            <NavLink to={"/accounts/student"} style={{ cursor: "pointer" }}>
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

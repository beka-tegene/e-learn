import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { back_base_url } from "../util/config";

const Settings = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const token = Cookies.get("token");
  const decodedToken = jwt_decode(token);
  const decodedUserId = decodedToken?.userId;

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(
        `${back_base_url}api/v1/users/deleteUser/${decodedUserId}`
      );
      Cookies.remove("token");
      navigate("/login");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = e.target.elements;
    try {
      await axios.patch(`${back_base_url}api/v1/users/updateUserPassword`, {
        userId: decodedUserId,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      });
      alert("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleNotificationsToggle = async () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleHelp = () => {
    alert("This would open the Help section.");
  };

  const handlePrivacySettings = () => {
    alert("This would display Privacy Settings details.");
  };

  const handleThemeChange = (e) => {
    alert("Theme changed to: " + e.target.value);
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#F7F7F7",
        height: "87vh",
        overflowY: "scroll",
      }}
    >
      <h2>Settings</h2>
      <div style={{ margin: "1rem 0" }}>
        <form onSubmit={handleChangePassword}>
          <h4>Change Password</h4>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              style={inputStyle}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              style={inputStyle}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Change Password
          </button>
        </form>
      </div>
      <div style={{ margin: "1rem 0" }}>
        <h4>Notifications</h4>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleNotificationsToggle}
          />
          <span style={{ marginLeft: "10px" }}>Enable Notifications</span>
        </label>
      </div>
      <div style={{ margin: "1rem 0" }}>
        <h4>Privacy Settings</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          pellentesque mi non arcu iaculis, id venenatis quam eleifend. Sed
          tempus ipsum sit amet nisl volutpat, at ultrices lorem accumsan.
          Phasellus et aliquam turpis. Sed in risus quis risus consectetur
          volutpat nec ut libero. Nullam porttitor fringilla magna, non
          vestibulum urna faucibus a. In in felis vel urna volutpat lacinia
          vitae id purus. Ut porta libero vitae arcu posuere, in suscipit velit
          varius. Suspendisse potenti. Fusce dapibus lorem at neque ornare, sed
          bibendum magna laoreet.
        </p>
        <button style={settingsButtonStyle} onClick={handlePrivacySettings}>
          Privacy Settings Details
        </button>
      </div>
      <div style={{ margin: "1rem 0" }}>
        <h4>Theme Preferences</h4>
        <select style={inputStyle} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ margin: "1rem 0" }}>
        <h4>Help</h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            Need assistance? Check out our Help Center for answers to common
            questions or contact our support team.
          </span>
          <button
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              color: "#333",
              cursor: "pointer",
              textAlign: "left",
              marginBottom: "10px",
            }}
            onClick={handleHelp}
          >
            Help Center
          </button>
        </div>
      </div>
      <div style={{ margin: "1rem 0" }}>
        <h4>Delete Profile</h4>
        <button style={{...settingsButtonStyle,background:"#AA0009",color:"white",width:"fit-content"}} onClick={handleDeleteProfile} >
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default Settings;

const settingsButtonStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  color: "#333",
  cursor: "pointer",
  textAlign: "left",
  width: "100%",
  marginBottom: "10px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "100%",
};

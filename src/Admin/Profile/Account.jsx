import { Avatar } from "@mui/material";
import React, { useState } from "react";
import img1 from "/assets/img/3d-avatar-profession-as-writer-3d-model-867496ad17.jpg";
import { FcEditImage } from "react-icons/fc";
const Account = () => {
  const [profiles, setProfiles] = useState();
  return (
    <div style={{ padding: "1rem", height: "87vh", overflowY: "scroll" }}>
      <h4>My Account</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 3fr",
          gap: "20px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            backgroundColor: "#F2F2F2",
            padding: "1rem",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Avatar
              sx={{ width: 200, height: 200 }}
              src={profiles ? URL.createObjectURL(profiles) : img1}
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
            <input
              type="file"
              name="profile"
              id="profile"
              hidden
              onChange={(e) => setProfiles(e.target.files[0])}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontWeight: "600", fontSize: "18px" }}>
              Beka Tegene
            </span>
            <p style={{ fontSize: "12px" }}>bekategene177@gmail.com</p>
          </div>
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "0 2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
              }}
            >
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                style={{
                  ...inputStyle,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
              }}
            >
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                style={{
                  ...inputStyle,
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              style={{
                ...inputStyle,
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              style={{
                ...inputStyle,
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              style={{
                ...inputStyle,
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              style={{
                ...inputStyle,
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              style={{
                ...inputStyle,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "4px",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <button
              style={{
                width: "25%",
                padding: "8px 12px",
                border: "1px solid #007bff",
                borderRadius: "5px",
                backgroundColor: "transparent",
                color: "#007bff",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              cancel
            </button>
            <button
              style={{
                width: "25%",
                padding: "8px 12px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;

const inputStyle = {
  padding: "3px 10px",
  borderRadius: "5px",
  border: "1px solid ",
  background: "#F1EDF7",
};

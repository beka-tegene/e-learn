import React from "react";
import { useNavigate } from "react-router-dom";

const Process = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ width: "50%", textAlign: "center" }}>
        <h1>Verified Account</h1>
        <p>Your account has processed to verified please wait up to approve</p>
        <button
          style={{
            padding: "10px 20px",
            background: "#D7A022",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          onClick={() => navigate( "/")}
        >
          Back Home
        </button>
      </div>
    </div>
  );
};

export default Process;

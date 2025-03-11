import React, { useState } from "react";
import images from "/assets/img/virtual-confrence.webp";
const RoomLink = () => {
  const [inputValue, setInputValue] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleGenerateLink = () => {
    const randomString = generateRandomString(8);
    const newLink = `/kts/room/${inputValue}-${randomString}`;
    setGeneratedLink(newLink);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopySuccess("Copied!");
    setTimeout(() => {
      setCopySuccess("");
    }, 1500);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        height: "87vh",
        overflowY:"scroll",
        alignItems: "center",
        padding: "0 30px",
        background:"#F7F7F7"
      }}
    >
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <h1 style={{ marginBottom: "10px", color: "#007bff" }}>
          Video calls and meetings for everyone
        </h1>
        <p style={{ marginBottom: "20px", fontSize: "18px" }}>
          With Fancy Catering Academy
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter Room Code"
            style={{
              width: "300px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
          <button
            onClick={handleGenerateLink}
            style={{
              padding: "10px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Generate Link
          </button>
        </div>
        {generatedLink && inputValue && (
          <div
            style={{
              marginTop: "20px",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              width:"fit-content",
              border: "1px solid #007bff",
              padding: "15px",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <a
              href={generatedLink}
              style={{
                color: "#007bff",
                textDecoration: "none",
                marginRight: "10px",
                fontSize: "16px",
              }}
            >
              {generatedLink}
            </a>
            <span
              onClick={handleCopyLink}
              style={{ cursor: "pointer", color: "#007bff" }}
              title="Copy to clipboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-clipboard"
                viewBox="0 0 16 16"
              >
                <path d="M4.5 1a.5.5 0 0 1 .5.5V2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h.5V1.5a.5.5 0 0 1 .5-.5zM5 3v-.5a.5.5 0 0 0-.5-.5H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-1.5a.5.5 0 0 0-.5.5V3H5z" />
                <path d="M6.5 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V3.5zM5 6v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6H5z" />
              </svg>
            </span>
            {copySuccess && (
              <span
                style={{
                  marginLeft: "5px",
                  color: "green",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  fontWeight: "bold",
                }}
              >
                {copySuccess}
              </span>
            )}
          </div>
        )}
      </div>
      <div>
        <img src={images} alt="room create images" />
      </div>
    </div>
  );
};

export default RoomLink;

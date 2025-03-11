import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <p style={{ fontSize: "2rem" }}>Coming Soon</p>
        <button
          style={{
            backgroundColor: "#378423",
            color: "#FFFFFF",
            padding: "7px 15px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
          onClick={() => navigate( "/")}
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;

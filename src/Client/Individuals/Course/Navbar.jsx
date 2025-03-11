import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";

const Navbar = ({ usersById, setDrawerOpen, drawerOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="d-flex p-2 align-items-center gap-1">
      {isMobile && (
        <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
          <MdMenu style={{ fontSize: "28px", cursor: "pointer" }} />
        </IconButton>
      )}
      <div style={{ maxWidth: "50%" }}>
        <h5 style={{ textTransfer: "capitalize" }}>
          {usersById?.course?.courseName}
          <h6 style={{ fontSize: "11px", fontWeight: 100 }}>
            Your Progress : {`${Math.round(usersById?.progress)}%`}
          </h6>
        </h5>
      </div>
      <div className="flex-grow-1"></div>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={usersById?.progress}
          sx={{ color: "#D9A128" }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(usersById?.progress)}%`}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;

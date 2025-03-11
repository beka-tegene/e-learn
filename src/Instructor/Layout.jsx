import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import SideBar from "./SideBar";

const Layout = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [drawerOpen, setDrawerOpen] = useState(false); 
  return (
    <div>
      <Nav setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen}/>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "0 6fr" : "1.5fr 6fr",
        }}
      >
        <SideBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
